
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileUpload } from "./chat/FileUpload";
import { InfoBanner } from "./chat/InfoBanner";
import { MessageList } from "./chat/MessageList";
import { MessageInput } from "./chat/MessageInput";

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type UploadedFile = {
  name: string;
  path: string;
};

export const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setSessionId(crypto.randomUUID());
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['text/plain'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Error",
        description: "Only TXT files are allowed.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('sessionId', sessionId);

    try {
      const { data, error } = await supabase.functions.invoke('process-document', {
        body: formData,
      });

      if (error) throw error;

      setUploadedFiles(prev => [...prev, { name: file.name, path: data.filePath }]);
      
      toast({
        title: "Success",
        description: "File uploaded and processed successfully",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to process file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { 
          messages: [...messages, userMessage],
          files: uploadedFiles
        }
      });

      if (error) throw error;

      const assistantMessage = data.response;
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-dark to-[#1a1f3d] py-8 sm:py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 animate-fade-up bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          AI Chat Assistant
        </h1>
        
        <InfoBanner />

        <Card className="p-4 sm:p-6 bg-white/5 backdrop-blur-lg border-white/10 shadow-xl">
          <FileUpload
            onFileUpload={handleFileUpload}
            uploadedFiles={uploadedFiles}
            onFileRemove={(index) => {
              setUploadedFiles(prev => prev.filter((_, i) => i !== index));
            }}
          />
          <div className="h-[400px] sm:h-[600px] flex flex-col bg-white/5 rounded-lg">
            <MessageList messages={messages} />
            <MessageInput
              input={input}
              isLoading={isLoading}
              onInputChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              onSubmit={handleSubmit}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
