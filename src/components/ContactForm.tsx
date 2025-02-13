
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export const ContactForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Replace this URL with your Zapier webhook URL
      const webhookUrl = "YOUR_ZAPIER_WEBHOOK_URL";
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Required for Zapier webhooks
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      // Clear form
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      // Show success message
      toast({
        title: "Thanks for reaching out!",
        description: "We'll get back to you soon. Check your email for confirmation.",
      });

      // Open Calendly in a new tab
      window.open("https://calendly.com/prajwal-ally", "_blank");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was a problem submitting your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-brand-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12 animate-fade-up">
          Get in Touch
        </h2>
        <div className="max-w-lg mx-auto bg-white/5 backdrop-blur-lg rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-brand-purple hover:bg-brand-purple/90"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Schedule a Meeting"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
