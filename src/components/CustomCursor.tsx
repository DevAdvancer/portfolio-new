import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * A custom cursor with two layers:
 *  - A small filled dot that follows the pointer 1:1
 *  - A larger ring that lags behind with a spring, and grows on interactive hover
 *
 * The system cursor is hidden via `html.has-custom-cursor` (see index.css) on devices
 * with a fine pointer. Touch devices keep the native cursor.
 */
const CustomCursor = () => {
  const reduceMotion = useReducedMotion();
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 200, damping: 24, mass: 0.5 });
  const ringY = useSpring(dotY, { stiffness: 200, damping: 24, mass: 0.5 });

  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    // Only enable on fine-pointer devices (mouse / trackpad)
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!supportsFinePointer) return;

    document.documentElement.classList.add("has-custom-cursor");

    const handleMove = (event: PointerEvent) => {
      dotX.set(event.clientX);
      dotY.set(event.clientY);
      if (!visible) setVisible(true);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);
    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='hover']"
      );
      setHovering(Boolean(interactive));
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);
    window.addEventListener("pointerenter", handleEnter);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointerover", handlePointerOver);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("pointerenter", handleEnter);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointerover", handlePointerOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [dotX, dotY, reduceMotion, visible]);

  if (reduceMotion) return null;

  return (
    <>
      {/* Outer ring (lags slightly behind the dot) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] hidden md:flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-primary"
          animate={{
            width: hovering ? 56 : 36,
            height: hovering ? 56 : 36,
            borderColor: hovering ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.55)",
            backgroundColor: hovering ? "hsl(var(--primary) / 0.10)" : "hsl(var(--primary) / 0)",
            scale: pressed ? 0.85 : 1,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        />
      </motion.div>

      {/* Inner dot — sits exactly at the pointer, perfectly centered inside the ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:flex items-center justify-center"
        style={{
          x: dotX,
          y: dotY,
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
          animate={{
            width: pressed ? 5 : 7,
            height: pressed ? 5 : 7,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
