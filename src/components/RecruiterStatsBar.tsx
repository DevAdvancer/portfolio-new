import { motion, useReducedMotion } from "framer-motion";
import CountUp from "./CountUp";

interface Stat {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  formatThousands?: boolean;
  hint: string;
}

const stats: Stat[] = [
  {
    value: 18,
    suffix: "+",
    label: "Months shipping",
    hint: "Production experience",
  },
  {
    value: 10,
    suffix: "+",
    label: "Projects shipped",
    hint: "Across full stack & tooling",
  },
  {
    value: 20,
    suffix: "+",
    label: "Technologies",
    hint: "Languages, frameworks, infra",
  },
  {
    value: 8.68,
    label: "CGPA",
    hint: "/ 10 — B.Tech CSE",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// Reduced-motion variant: no blur (blur repaints) and no translate — just present.
const itemReduced = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

/**
 * A horizontal stats bar that lives at the bottom of the hero.
 * Recruiters see it in the first 3 seconds — it telegraphs the candidate's
 * numbers without making them read paragraphs of bio.
 */
const RecruiterStatsBar = () => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      className="relative mt-12 sm:mt-16 mx-auto max-w-4xl"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Glow behind the bar */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-accent/10 to-chart-3/10 blur-2xl" />

      <div className="grid grid-cols-2 md:grid-cols-4 border border-border bg-card/40 backdrop-blur-sm">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={prefersReducedMotion ? itemReduced : item}
            className={`group relative px-4 sm:px-6 py-5 sm:py-6 text-left transition-colors hover:bg-secondary/30 ${
              index < stats.length - 1 ? "md:border-r border-border" : ""
            } ${index % 2 === 0 ? "border-r md:border-r" : ""} ${
              index < 2 ? "border-b md:border-b-0 border-border" : ""
            }`}
          >
            <div className="flex items-baseline gap-1">
              <CountUp
                end={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
                formatThousands={stat.formatThousands}
                className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground"
              />
            </div>
            <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-primary font-medium">
              {stat.label}
            </p>
            <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground leading-snug">
              {stat.hint}
            </p>

            {/* Top accent on hover */}
            <span className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-full" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecruiterStatsBar;
