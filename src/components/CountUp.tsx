import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

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
  const value = useMotionValue(0);
  const spring = useSpring(value, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (latest) => {
    const hasDecimals = end % 1 !== 0;
    if (hasDecimals) {
      return latest.toFixed(2);
    }
    const rounded = Math.round(latest);
    if (formatThousands) {
      return rounded.toLocaleString("en-US");
    }
    return rounded.toString();
  });
  const [text, setText] = useState("0");

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setText(v));
    return () => unsubscribe();
  }, [display]);

  useEffect(() => {
    if (inView) {
      value.set(end);
    }
  }, [inView, end, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
};

export default CountUp;
