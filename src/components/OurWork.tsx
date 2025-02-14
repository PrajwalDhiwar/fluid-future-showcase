
import { Card } from "@/components/ui/card";
import { MessageSquare, Bot, Network, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

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
    color: "text-blue-400",
    action: {
      label: "Try me",
      link: "/chat"
    }
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

const clients = [
  { name: "Prestige", logo: "/prestige.png" },
  { name: "Groq", logo: "/groq.png" },
  { name: "Crew AI", logo: "/crewai.png" },
  { name:"Supabase", logo: "/Supabase.webp"},
  { name:"Discord", logo: "/Discord.png"},
  { name:"Zapier", logo:"/Zapier.png"}
];

export const OurWork = () => {
  return (
    <div className="min-h-screen bg-brand-dark py-8 sm:py-12 md:py-20 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8 animate-fade-up">Our Work</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="p-4 sm:p-6 bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <project.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${project.color}`} />
                <h3 className="text-lg sm:text-xl font-semibold text-white">{project.title}</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-4">{project.description}</p>
              {project.action && (
                <div className="mt-2">
                  <Link to={project.action.link}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-blue-400 border-blue-400 hover:bg-blue-400/10"
                    >
                      {project.action.label}
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Client Logo Carousel */}
        <div className="mt-8 sm:mt-12 lg:mt-20 animate-fade-up">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Our Partners</h2>
          <div className="mx-auto max-w-5xl relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 sm:-ml-4">
                {clients.map((client, index) => (
                  <CarouselItem key={index} className="pl-2 sm:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div className="p-2 sm:p-4">
                      <Card className="p-3 sm:p-6 bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300">
                        <div className="aspect-square relative flex items-center justify-center">
                          <img
                            src={client.logo}
                            alt={`${client.name} logo`}
                            className="object-contain w-16 h-16 sm:w-24 sm:h-24 opacity-70 hover:opacity-100 transition-opacity"
                          />
                        </div>
                        <p className="text-center text-xs sm:text-sm text-gray-400 mt-2">{client.name}</p>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex absolute -left-12 top-1/2 transform -translate-y-1/2" />
              <CarouselNext className="hidden md:flex absolute -right-12 top-1/2 transform -translate-y-1/2" />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};
