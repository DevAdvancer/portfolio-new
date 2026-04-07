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
              Who I Am
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ScrollReveal className="md:col-span-2" delay={100}>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  I'm a final-year Computer Science student at <span className="text-primary font-medium">Adamas University</span>, passionate about building elegant solutions to complex problems. My journey in tech started with curiosity and has evolved into a deep commitment to continuous learning.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  My core interests span <span className="text-primary font-medium">Web Development</span>, <span className="text-primary font-medium">System Design</span>, and <span className="text-primary font-medium">Cybersecurity</span>. I believe in writing clean, maintainable code and approaching challenges with a problem-solving mindset.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Currently seeking opportunities to apply my skills in a professional environment where I can contribute meaningfully while continuing to grow as a developer.
                </p>
              </div>
            </ScrollReveal>
            
            <div className="space-y-6">
              <ScrollReveal delay={200}>
                <motion.div
                  className="p-6 bg-secondary/30 border border-border hover:border-primary/50 transition-colors"
                  whileHover={hoverLift}
                  transition={smoothTransition}
                >
                  <p className="text-sm uppercase tracking-widest text-primary mb-2">Focus Areas</p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• Full-Stack Development</li>
                    <li>• Problem Solving & DSA</li>
                    <li>• System Design</li>
                    <li>• Security Fundamentals</li>
                  </ul>
                </motion.div>
              </ScrollReveal>
              
              <ScrollReveal delay={300}>
                <motion.div
                  className="p-6 bg-secondary/30 border border-border hover:border-primary/50 transition-colors"
                  whileHover={hoverLift}
                  transition={smoothTransition}
                >
                  <p className="text-sm uppercase tracking-widest text-primary mb-2">Strengths</p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• Analytical Thinking</li>
                    <li>• Self-Motivated Learner</li>
                    <li>• Team Collaboration</li>
                    <li>• Attention to Detail</li>
                  </ul>
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
