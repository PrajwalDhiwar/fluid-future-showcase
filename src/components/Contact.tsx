import { Button } from "@/components/ui/button";

export const Contact = () => {
  return (
    <section className="py-20 bg-brand-dark">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-6 animate-fade-up">
          Ready to Transform Your Business?
        </h2>
        <p className="text-xl text-gray-300 mb-8 animate-fade-up [animation-delay:200ms]">
          Let's discuss how AI can revolutionize your operations.
        </p>
        <Button
          size="lg"
          className="animate-fade-up [animation-delay:400ms] bg-brand-purple hover:bg-brand-purple/90"
        >
          Get in Touch
        </Button>
      </div>
    </section>
  );
};