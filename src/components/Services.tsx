import { Building, ChartBar, ShoppingCart, Factory } from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: Building,
    title: "Real Estate",
    description: "AI-powered solutions for property management, market analysis, and customer service automation.",
  },
  {
    icon: ChartBar,
    title: "Marketing",
    description: "Intelligent marketing automation, predictive analytics, and personalized customer engagement.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Smart inventory management, customer service bots, and personalized shopping experiences.",
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Automated quality control, predictive maintenance, and supply chain optimization.",
  },
];

export const Services = () => {
  return (
    <section className="py-20 bg-brand-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12 animate-fade-up">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="p-6 bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-500 animate-fade-up group hover:transform hover:scale-105 hover:shadow-xl hover:shadow-brand-purple/20"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <service.icon className="h-12 w-12 text-brand-purple mb-4 group-hover:animate-bounce transition-transform duration-300" />
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-brand-purple transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};