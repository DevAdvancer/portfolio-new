import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const lines = [
  "I don't just write code.",
  "I design systems.",
  "I ship outcomes.",
  "I care about the user.",
  "I make teams faster.",
];

const stepCount = lines.length;

interface ManifestoLineProps {
  line: string;
  index: number;
  scrollProgress: MotionValue<number>;
}

const ManifestoLine = ({ line, index, scrollProgress }: ManifestoLineProps) => {
  // Split the [0, 1] scroll progress into segments per line
  const start = index / stepCount;
  const mid = (index + 0.5) / stepCount;
  const end = (index + 1) / stepCount;
  const opacity = useTransform(
    scrollProgress,
    [Math.max(0, start - 0.05), start + 0.02, mid, end - 0.02, Math.min(1, end + 0.05)],
    [0, 1, 1, 1, 0]
  );
  const y = useTransform(scrollProgress, [start, mid, end], [40, 0, -40]);

  return (
    <motion.h3
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center justify-center font-serif text-3xl sm:text-5xl md:text-6xl text-foreground will-change-transform"
    >
      <span className="text-gradient">{line}</span>
    </motion.h3>
  );
};

/**
 * A scrollytelling band that shows a rotating manifesto as the user scrolls.
 * Each line crossfades in/out tied to the section's scroll progress.
 * The motion is driven by a single shared useScroll + transforms, so there's
 * no per-pointer reactivity to cause jank — the work happens during scroll only.
 */
const ManifestoBand = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      aria-label="Engineering philosophy"
      className="relative py-24 sm:py-36 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            className="text-xs sm:text-sm uppercase tracking-[0.3em] text-primary mb-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Engineering Philosophy
          </motion.p>

          <div className="relative h-[180px] sm:h-[200px] flex items-center justify-center">
            {lines.map((line, index) => (
              <ManifestoLine
                key={line}
                line={line}
                index={index}
                scrollProgress={scrollYProgress}
              />
            ))}
          </div>

          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto mt-8"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            These are the things that show up in my work, in my commits, and in the way I collaborate.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ManifestoBand;
