import { Button } from "@/components/ui/button";

export const Contact = () => {
  return (
    <section className="py-20 bg-brand-dark">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-6 animate-fade-up hover:scale-105 transition-transform duration-300">
          Ready to Transform Your Business?
        </h2>
        <p className="text-xl text-gray-300 mb-8 animate-fade-up [animation-delay:200ms] hover:text-white transition-colors duration-300">
          Let's discuss how AI can revolutionize your operations.
        </p>
        <Button
          size="lg"
          className="animate-fade-up [animation-delay:400ms] bg-brand-purple hover:bg-brand-purple/90 transform hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-brand-purple/50"
        >
          Get in Touch
        </Button>
      </div>
    </section>
  );
};