import { type Transition, type Variants } from "framer-motion";

export const smoothTransition: Transition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1],
};

export const springTransition: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 24,
};

export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const fadeUp = (delay = 0, distance = 28): Variants => ({
  hidden: {
    opacity: 0,
    y: distance,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...smoothTransition,
      delay,
    },
  },
});

export const fadeIn = (delay = 0): Variants => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ...smoothTransition,
      delay,
    },
  },
});

export const hoverLift = {
  y: -6,
  scale: 1.015,
  transition: springTransition,
};

export const pressDown = {
  scale: 0.97,
  transition: springTransition,
};
