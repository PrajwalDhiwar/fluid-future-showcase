
import { Card } from "@/components/ui/card";

export const ChatAssistant = () => {
  return (
    <div className="min-h-screen bg-brand-dark py-8 sm:py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 animate-fade-up">AI Chat Assistant</h1>
        <Card className="p-4 sm:p-6 bg-white/5 backdrop-blur-lg border-white/10">
          <div className="h-[400px] sm:h-[600px] flex items-center justify-center text-gray-400">
            Chat Assistant Coming Soon...
          </div>
        </Card>
      </div>
    </div>
  );
};
