import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "fade";
  delay?: number;
  duration?: number;
}

const ScrollReveal = ({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 600,
}: ScrollRevealProps) => {
  const reduceMotion = useReducedMotion();

  const hiddenState = {
    up: { opacity: 0, y: 48 },
    down: { opacity: 0, y: -48 },
    left: { opacity: 0, x: 48 },
    right: { opacity: 0, x: -48 },
    fade: { opacity: 0 },
  };

  return (
    <motion.div
      className={cn(
        "will-change-transform",
        className
      )}
      initial={reduceMotion ? false : hiddenState[direction]}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: duration / 1000,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
