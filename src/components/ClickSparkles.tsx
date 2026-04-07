import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
  hue: "primary" | "accent" | "chart";
}

const sparkleColors = {
  primary: "bg-primary",
  accent: "bg-accent",
  chart: "bg-chart-3",
};

const createSparkles = (x: number, y: number, baseId: number): Sparkle[] =>
  Array.from({ length: 10 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / 10;
    return {
      id: baseId + index,
      x,
      y,
      angle,
      distance: 24 + (index % 3) * 10,
      size: index % 2 === 0 ? 6 : 4,
      hue: index % 3 === 0 ? "primary" : index % 3 === 1 ? "accent" : "chart",
    };
  });

const ClickSparkles = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    let sparkleId = 0;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;

      if (target?.closest("input, textarea")) return;

      sparkleId += 100;
      const nextSparkles = createSparkles(event.clientX, event.clientY, sparkleId);
      setSparkles((current) => [...current, ...nextSparkles]);

      window.setTimeout(() => {
        setSparkles((current) =>
          current.filter((sparkle) => !nextSparkles.some((item) => item.id === sparkle.id))
        );
      }, 700);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]" aria-hidden="true">
      <AnimatePresence>
        {sparkles.map((sparkle) => (
          <motion.span
            key={sparkle.id}
            className={`absolute rounded-full ${sparkleColors[sparkle.hue]}`}
            style={{
              left: sparkle.x,
              top: sparkle.y,
              width: sparkle.size,
              height: sparkle.size,
            }}
            initial={{
              opacity: 0.95,
              scale: 0.4,
              x: 0,
              y: 0,
            }}
            animate={{
              opacity: 0,
              scale: [0.4, 1, 0.2],
              x: Math.cos(sparkle.angle) * sparkle.distance,
              y: Math.sin(sparkle.angle) * sparkle.distance,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ClickSparkles;
