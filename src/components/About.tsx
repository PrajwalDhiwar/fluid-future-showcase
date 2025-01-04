import { Card } from "@/components/ui/card";

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=300",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=300&h=300",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of AI Solutions",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&h=300",
  },
];

export const About = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-brand-dark to-brand-dark/95">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12 animate-fade-up">
          About Us
        </h2>
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-up [animation-delay:200ms]">
          <p className="text-xl text-gray-300 hover:text-white transition-colors duration-300">
            At Automation Ally, we're passionate about bringing cutting-edge AI solutions to businesses. Our team of experts combines deep technical knowledge with industry expertise to deliver transformative results.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <Card
              key={member.name}
              className="p-6 bg-white/5 backdrop-blur-lg border-white/10 text-center animate-fade-up group hover:transform hover:scale-105 transition-all duration-500"
              style={{ animationDelay: `${400 + index * 200}ms` }}
            >
              <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full group-hover:scale-110 transition-transform duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-brand-purple transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
                {member.role}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};