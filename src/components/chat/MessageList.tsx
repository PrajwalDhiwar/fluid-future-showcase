
import { Lock } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { forwardRef } from "react";

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type MessageListProps = {
  messages: Message[];
  isLocked: boolean;
};

export const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  ({ messages, isLocked }, ref) => {
    if (isLocked && messages.length === 0) {
      return (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <Lock className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Chat is locked</p>
            <p className="text-sm">Upload a TXT file to start chatting</p>
          </div>
        </div>
      );
    }

    return (
      <div 
        ref={ref}
        className="flex-1 overflow-y-auto space-y-4 p-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
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
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white/10 text-gray-100'
              } shadow-lg`}
            >
              {message.role === 'assistant' ? (
                <div className="prose prose-invert prose-sm max-w-none markdown-content">
                  <ReactMarkdown>
                    {message.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{message.content}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

MessageList.displayName = "MessageList";
