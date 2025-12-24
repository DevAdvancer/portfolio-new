import { Mail, Linkedin, Github, FileText, Send, MapPin } from "lucide-react";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:theabhirupkumar@gmail.com?subject=${encodeURIComponent(formData.subject || `Portfolio Contact from ${formData.name}`)}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${encodeURIComponent(formData.email)}`;
    window.location.href = mailtoLink;
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "theabhirupkumar@gmail.com",
      href: "mailto:theabhirupkumar@gmail.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/abhirupkumar",
      href: "https://linkedin.com/in/abhirupkumar",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/devadvancer",
      href: "https://github.com/devadvancer",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Tarakeswar, Kolkata, India",
      href: "https://maps.app.goo.gl/bJJFRYMnrTgvAhgt7",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-10 sm:mb-16">
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3 sm:mb-4">
                  Get In Touch
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 sm:mb-4">
                  Let's Connect
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-2">
                  I'm currently looking for opportunities. Whether you have a question or just want to say hi, feel free to reach out!
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
              {/* Contact Information */}
              <div className="space-y-6 sm:space-y-8">
                <ScrollReveal delay={100}>
                  <h2 className="text-xs sm:text-sm uppercase tracking-widest text-primary mb-4 sm:mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-3 sm:space-y-4">
                    {contactInfo.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-card/50 border border-border hover:border-primary/50 transition-all group"
                      >
                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-secondary/50 flex items-center justify-center flex-shrink-0">
                          <item.icon size={16} className="text-primary sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                          <p className="text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors truncate">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </ScrollReveal>

                {/* Resume Download */}
                <ScrollReveal delay={200}>
                  <div className="p-4 sm:p-6 bg-card/50 border border-border">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <FileText size={18} className="text-primary sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground mb-1">Download Resume</p>
                        <p className="text-xs text-muted-foreground">PDF format, updated Dec 2024</p>
                      </div>
                      <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 sm:px-4 py-2 bg-primary text-primary-foreground text-xs sm:text-sm hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 flex-shrink-0"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Contact Form */}
              <ScrollReveal delay={150}>
                <div>
                  <h2 className="text-xs sm:text-sm uppercase tracking-widest text-primary mb-4 sm:mb-6">
                    Send a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-xs text-muted-foreground mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-card/50 border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs text-muted-foreground mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-card/50 border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs text-muted-foreground mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-card/50 border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                        placeholder="Job Opportunity"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs text-muted-foreground mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-card/50 border border-border text-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground"
                        placeholder="Your message..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
                    >
                      <Send size={16} />
                      Send Message
                    </button>
                  </form>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
