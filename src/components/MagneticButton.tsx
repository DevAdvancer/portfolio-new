import { useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "link";
  href?: string;
  to?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
}

/**
 * Wraps interactive elements with a subtle magnetic pull — the button translates
 * towards the pointer as the user hovers near it. A spring-eased return keeps
 * the motion organic.
 */
const MagneticButton = ({
  children,
  className = "",
  strength = 18,
  href,
  target,
  rel,
  onClick,
  ariaLabel,
  type = "button",
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const [isHover, setIsHover] = useState(false);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * (strength / 100));
    y.set(offsetY * (strength / 100));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner = href ? (
    <a
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </a>
  ) : (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  );

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={() => setIsHover(true)}
      onPointerLeave={() => {
        setIsHover(false);
        reset();
      }}
      style={{ x: springX, y: springY }}
      className="inline-block will-change-transform"
    >
      <motion.span
        animate={{ scale: isHover ? 1.04 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="inline-block"
      >
        {inner}
      </motion.span>
    </motion.div>
  );
};

export default MagneticButton;
