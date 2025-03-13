
import { useState, useEffect, useRef } from "react";
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
  const messageListRef = useRef<HTMLDivElement>(null);

  const isLocked = uploadedFiles.length === 0;

  useEffect(() => {
    setSessionId(crypto.randomUUID());
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

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

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('sessionId', sessionId);

    try {
      const { data, error } = await supabase.functions.invoke('process-document', {
        body: formData,
      });

      if (error) throw error;

      setUploadedFiles(prev => [...prev, { name: file.name, path: data.filePath }]);
      
      // Add a welcome message from the assistant
      setMessages([{
        role: 'assistant',
        content: `## Document Uploaded Successfully\n\nI've analyzed your document **${file.name}**.\n\n${data.analysis || 'Ask me any questions about the content!'}`
      }]);

      toast({
        title: "Success",
        description: "File uploaded and processed successfully. You can now start chatting!",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to process file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isLocked) return;

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

  const handleFileRemove = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    if (uploadedFiles.length <= 1) {
      // Reset messages if removing the last file
      setMessages([]);
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
            onFileRemove={handleFileRemove}
          />
          <div className="h-[400px] sm:h-[600px] flex flex-col bg-white/5 rounded-lg">
            <MessageList messages={messages} isLocked={isLocked} ref={messageListRef} />
            <MessageInput
              input={input}
              isLoading={isLoading}
              isLocked={isLocked}
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
