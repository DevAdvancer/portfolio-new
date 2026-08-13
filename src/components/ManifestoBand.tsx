import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const lines = [
  "I don't just write code.",
  "I design systems.",
  "I ship outcomes.",
  "I care about the user.",
  "I make teams faster.",
];

/**
 * A clean, stacked list of engineering philosophy points.
 * Ensures all points are readable without relying on slow scroll-triggering.
 */
const ManifestoBand = () => {
  return (
    <section
      aria-label="Engineering philosophy"
      className="relative py-24 sm:py-36 overflow-hidden bg-secondary/10"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-primary mb-12">
              Engineering Philosophy
            </p>
          </ScrollReveal>

          <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
            {lines.map((line, index) => (
              <ScrollReveal key={line} delay={index * 100}>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground text-gradient transition-transform hover:scale-105 duration-300">
                  {line}
                </h3>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={500}>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-16 text-lg">
              These are the things that show up in my work, in my commits, and in the way I collaborate.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ManifestoBand;
