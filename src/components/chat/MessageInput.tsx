
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Lock } from "lucide-react";

type MessageInputProps = {
  input: string;
  isLoading: boolean;
  isLocked: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export const MessageInput = ({
  input,
  isLoading,
  isLocked,
  onInputChange,
  onKeyDown,
  onSubmit
}: MessageInputProps) => {
  if (isLocked) {
    return (
      <div className="p-4 border-t border-white/10 bg-white/5">
        <div className="flex items-center justify-center gap-2 text-gray-400 py-2">
          <Lock className="w-4 h-4" />
          <span>Upload a TXT file to start chatting</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="p-4 border-t border-white/10 bg-white/5">
      <div className="flex gap-4">
        <Textarea
          value={input}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          placeholder="Ask a question about your documents... (Press Enter to send)"
          className="flex-1 bg-white/5 border-white/10 text-white resize-none"
          rows={1}
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition-all duration-300"
        >
          {isLoading ? "Sending..." : <Send className="w-4 h-4" />}
        </Button>
      </div>
    </form>
  );
};
