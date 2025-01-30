import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col">
      <Hero />
      <div className="flex-grow" />
      <Footer />
    </div>
  );
};

export default Index;