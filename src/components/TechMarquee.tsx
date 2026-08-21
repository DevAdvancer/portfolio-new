import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface TechMarqueeProps {
  items: string[];
  reverse?: boolean;
  className?: string;
  duration?: number; // seconds for one full pass
}

/** Rotating multi-accent palette so the ticker reads as a colorful tech
 *  showcase rather than a flat gray word list. Static class strings keep
 *  Tailwind's JIT happy (no dynamically-built class names). */
const ACCENTS = [
  { dot: "bg-primary", hover: "hover:text-primary" },
  { dot: "bg-chart-3", hover: "hover:text-chart-3" },
  { dot: "bg-accent", hover: "hover:text-accent" },
  { dot: "bg-chart-4", hover: "hover:text-chart-4" },
  { dot: "bg-chart-5", hover: "hover:text-chart-5" },
];

/**
 * An infinite horizontally scrolling marquee used to make the tech stack
 * feel alive. The list is duplicated so the loop is seamless.
 */
const TechMarquee = ({ items, reverse = false, className = "", duration = 32 }: TechMarqueeProps) => {
  const reduceMotion = useReducedMotion();
  const animationClass = reverse ? "animate-marquee-reverse" : "animate-marquee";
  // The CSS animation duration is set via the inline style below for full control.
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0, black 8%, black 92%, transparent 100%)",
        maskImage:
          "linear-gradient(90deg, transparent 0, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        className={`flex w-max gap-10 sm:gap-14 ${
          reduceMotion ? "" : animationClass
        }`}
        style={reduceMotion ? undefined : { animationDuration: `${duration}s` }}
      >
        {[...items, ...items].map((item, index) => {
          const accent = ACCENTS[index % items.length % ACCENTS.length];
          return (
            <div
              key={`${item}-${index}`}
              className="flex items-center gap-3 text-sm sm:text-base font-mono uppercase tracking-[0.25em] text-muted-foreground whitespace-nowrap"
            >
              <span className={`${accent.hover} transition-colors cursor-default`}>
                {item}
              </span>
              <span className={`h-1 w-1 rounded-full ${accent.dot}`} aria-hidden />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TechMarquee;
