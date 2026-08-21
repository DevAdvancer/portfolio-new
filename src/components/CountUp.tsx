import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  formatThousands?: boolean;
}

/**
 * Smoothly animates a numeric value from 0 to `end` once the element enters the viewport.
 * Uses framer-motion springs for an organic feel without overloading the main thread.
 * Under prefers-reduced-motion it renders the final value immediately (no spring).
 */
const CountUp = ({
  end,
  duration = 1.6,
  suffix = "",
  prefix = "",
  className = "",
  formatThousands = false,
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const value = useMotionValue(0);
  const spring = useSpring(value, { duration: duration * 1000, bounce: 0 });

  const formatValue = (latest: number) => {
    const hasDecimals = end % 1 !== 0;
    if (hasDecimals) {
      return latest.toFixed(2);
    }
    const rounded = Math.round(latest);
    if (formatThousands) {
      return rounded.toLocaleString("en-US");
    }
    return rounded.toString();
  };

  const display = useTransform(spring, (latest) => formatValue(latest));
  const [text, setText] = useState("0");

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setText(v));
    return () => unsubscribe();
  }, [display]);

  useEffect(() => {
    if (inView && !prefersReducedMotion) {
      value.set(end);
    }
  }, [inView, end, value, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <span ref={ref} className={className}>
        {prefix}
        {formatValue(end)}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
};

export default CountUp;
