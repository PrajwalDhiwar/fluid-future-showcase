import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark/95 to-brand-purple/30">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Neural Network Lines */}
          <path
            className="animate-[dash_3s_linear_infinite] stroke-current"
            d="M10,50 Q30,30 50,50 T90,50"
            fill="none"
            strokeWidth="1"
            strokeDasharray="10,5"
          />
          <path
            className="animate-[dash_4s_linear_infinite] stroke-current"
            d="M10,60 Q30,40 50,60 T90,60"
            fill="none"
            strokeWidth="1"
            strokeDasharray="10,5"
          />
          {/* AI Agent Nodes */}
          <circle cx="20" cy="50" r="3" className="fill-brand-purple animate-pulse" />
          <circle cx="50" cy="50" r="3" className="fill-brand-purple animate-pulse [animation-delay:500ms]" />
          <circle cx="80" cy="50" r="3" className="fill-brand-purple animate-pulse [animation-delay:1000ms]" />
        </svg>
      </div>
      
      {/* Glowing Orbs representing AI agents */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-40 h-40 bg-brand-purple/40 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite] top-1/4 left-1/4"></div>
        <div className="absolute w-40 h-40 bg-blue-500/40 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite] top-1/2 right-1/4 [animation-delay:1s]"></div>
        <div className="absolute w-40 h-40 bg-purple-500/40 rounded-full blur-3xl animate-[float_7s_ease-in-out_infinite] bottom-1/4 left-1/3 [animation-delay:2s]"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px] animate-[pulse_4s_ease-in-out_infinite]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-up [animation-delay:200ms] hover:scale-105 transition-transform duration-300">
            Smarter Solutions to supercharge your business!
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-up [animation-delay:400ms] hover:text-white transition-colors duration-300">
            We have a plethora of our custom built Autonomous Agents and a host of compatible services that we use to empower your business. We build for convenience and scale based on requirements. 
          </p>
          <Button
            size="lg"
            className="animate-fade-up [animation-delay:600ms] bg-brand-purple hover:bg-brand-purple/90 transform hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-brand-purple/50"
          >
            Explore Our Services <ArrowRight className="ml-2 h-4 w-4 animate-bounce" />
          </Button>
        </div>
      </div>
    </div>
  );
};