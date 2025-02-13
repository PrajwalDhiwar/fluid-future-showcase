
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Upload, FileText, Trash2 } from "lucide-react";

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
    // Generate a unique session ID when the component mounts
    setSessionId(crypto.randomUUID());
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Error",
        description: "Only PDF, DOCX, and TXT files are allowed.",
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
        description: "File uploaded successfully",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

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

  return (
    <div className="min-h-screen bg-brand-dark py-8 sm:py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 animate-fade-up">
          AI Chat Assistant
        </h1>
        <Card className="p-4 sm:p-6 bg-white/5 backdrop-blur-lg border-white/10">
          <div className="mb-4">
            <div className="flex items-center gap-4 mb-4">
              <Input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center gap-2 px-4 py-2 bg-brand-purple rounded-md text-white cursor-pointer hover:bg-brand-purple/90 transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload Document
              </label>
            </div>
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-white text-sm font-medium">Uploaded Files:</h3>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                    <FileText className="w-4 h-4" />
                    <span>{file.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto h-6 w-6"
                      onClick={() => {
                        setUploadedFiles(prev => prev.filter((_, i) => i !== index));
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="h-[400px] sm:h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-brand-purple text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
              <div className="flex gap-4">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/5 border-white/10 text-white"
                  rows={1}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-brand-purple hover:bg-brand-purple/90"
                >
                  {isLoading ? "Sending..." : "Send"}
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};
