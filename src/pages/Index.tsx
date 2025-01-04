import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Hero />
      <Services />
      <About />
      <Contact />
    </div>
  );
};

export default Index;