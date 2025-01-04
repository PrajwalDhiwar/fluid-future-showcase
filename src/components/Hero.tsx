import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-brand-dark to-brand-purple">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,hsla(221,45%,73%,1)0%,hsla(220,78%,29%,1)100%)] opacity-10 animate-pulse"></div>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] animate-[pulse_4s_ease-in-out_infinite]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-up [animation-delay:200ms] hover:scale-105 transition-transform duration-300">
            Empowering Business with AI Solutions
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-up [animation-delay:400ms] hover:text-white transition-colors duration-300">
            We build boutique AI solutions that transform businesses across Real Estate, Marketing, E-commerce, and Manufacturing.
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