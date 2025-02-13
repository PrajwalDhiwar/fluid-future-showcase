
import { Card } from "@/components/ui/card";
import { MessageSquare, Bot, Network, Cpu } from "lucide-react";

const projects = [
  {
    title: "AI Agent Orchestration",
    description: "Orchestrating multiple AI agents to work together seamlessly in chat-based environments, enabling complex task completion through agent collaboration.",
    icon: Network,
    color: "text-purple-400"
  },
  {
    title: "Autonomous Chat Assistants",
    description: "Building intelligent chat assistants that can understand context, maintain conversation flow, and provide accurate responses autonomously.",
    icon: MessageSquare,
    color: "text-blue-400"
  },
  {
    title: "Multi-Agent Systems",
    description: "Developing systems where multiple AI agents collaborate to solve complex problems, each specializing in specific tasks and working together efficiently.",
    icon: Bot,
    color: "text-green-400"
  },
  {
    title: "AI Integration Solutions",
    description: "Creating seamless integrations between various AI models and existing systems, ensuring optimal performance and reliability.",
    icon: Cpu,
    color: "text-orange-400"
  }
];

export const OurWork = () => {
  return (
    <div className="min-h-screen bg-brand-dark py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8 animate-fade-up">Our Work</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="p-6 bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <project.icon className={`h-8 w-8 ${project.color}`} />
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              </div>
              <p className="text-gray-300">{project.description}</p>
            </Card>
          ))}
        </div>

        {/* Chat Assistant Preview Section */}
        <div className="mt-16 animate-fade-up">
          <h2 className="text-3xl font-bold text-white mb-8">Try Our Chat Assistant</h2>
          <Card className="p-6 bg-white/5 backdrop-blur-lg border-white/10">
            <div className="h-[400px] flex items-center justify-center text-gray-400">
              Chat Assistant Coming Soon...
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
