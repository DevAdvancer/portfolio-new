import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { hoverLift, smoothTransition } from "@/lib/motion";

const About = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
              About Me
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
              The Journey
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ScrollReveal className="md:col-span-2" delay={100}>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  I'm a developer who genuinely cares about how things work under the hood. Growing up in a small town near Kolkata, I didn't have immediate access to a booming tech hub—so I made the internet my playground.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  My journey started with pure curiosity: taking things apart to understand them, fixing them, and eventually learning how to build them from scratch. I don't just write code to pass tests; I build products that solve real problems. Whether it's engineering a <span className="text-primary font-medium">Linux kernel security system</span> or shipping a snappy <span className="text-primary font-medium">AI-powered web app</span>, I dive deep.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Currently, I'm working as a Software Developer at Vizva Consultancy Services while finishing my CS degree at Adamas University. I believe that empathy for the user and clean, maintainable architecture go hand-in-hand.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="space-y-6">
              <ScrollReveal delay={200}>
                {/* Animated snake border wrapper */}
                <div className="relative rounded-xl overflow-hidden p-[1px] group">
                  <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,theme(colors.primary.DEFAULT)_50%,transparent_100%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <motion.div
                    className="relative p-6 bg-card rounded-xl h-full"
                    whileHover={hoverLift}
                    transition={smoothTransition}
                  >
                    <p className="text-sm uppercase tracking-widest text-primary mb-4 font-semibold">What I Do Best</p>
                    <ul className="space-y-3 text-sm text-muted-foreground font-medium">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Full-Stack Engineering
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Systems Architecture
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Cybersecurity & Infra
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Product Polish
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={300}>
                <motion.div
                  className="p-6 bg-secondary/30 border border-border rounded-xl hover:border-primary/50 transition-colors"
                  whileHover={hoverLift}
                  transition={smoothTransition}
                >
                  <p className="text-sm uppercase tracking-widest text-primary mb-3">Core Mindset</p>
                  <p className="text-sm text-foreground italic leading-relaxed">
                    "The best way to predict the future is to build it. I value pragmatism over hype, and shipping over over-engineering."
                  </p>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
