
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type MessageListProps = {
  messages: Message[];
};

export const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 p-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
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
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};
