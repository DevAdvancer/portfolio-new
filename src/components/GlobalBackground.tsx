import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

const GlobalBackground = () => {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.4);

  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 22, mass: 0.45 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 22, mass: 0.45 });

  const gridTranslateX = useTransform(smoothX, [0, 1], [-28, 28]);
  const gridTranslateY = useTransform(smoothY, [0, 1], [-22, 22]);
  const gridRotateX = useTransform(smoothY, [0, 1], [8, -8]);
  const gridRotateY = useTransform(smoothX, [0, 1], [-10, 10]);
  const gridScale = useTransform(smoothY, [0, 1], [1.02, 1.08]);

  const cursorX = useTransform(smoothX, [0, 1], ["10%", "90%"]);
  const cursorY = useTransform(smoothY, [0, 1], ["12%", "88%"]);

  const spotlight = useMotionTemplate`radial-gradient(circle at ${cursorX} ${cursorY}, hsl(var(--primary) / 0.16), transparent 18%), radial-gradient(circle at calc(${cursorX} + 10%) calc(${cursorY} - 8%), hsl(var(--accent) / 0.10), transparent 20%)`;
  const glowTrail = useMotionTemplate`radial-gradient(circle at ${cursorX} ${cursorY}, hsl(var(--foreground) / 0.08), transparent 8%)`;

  useEffect(() => {
    if (reduceMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX / window.innerWidth);
      pointerY.set(event.clientY / window.innerHeight);
    };

    const handlePointerLeave = () => {
      pointerX.set(0.5);
      pointerY.set(0.4);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-background"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.1),transparent_32%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--background)))]" />

      <motion.div
        className="absolute inset-0 opacity-90"
        style={reduceMotion ? undefined : { background: spotlight }}
      />

      <motion.div
        className="absolute inset-0 opacity-60 mix-blend-screen"
        style={reduceMotion ? undefined : { background: glowTrail }}
      />

      <div className="absolute inset-0 [perspective:1200px]">
        <motion.div
          className="absolute left-[-12%] top-[-12%] h-[124%] w-[124%] origin-center"
          style={
            reduceMotion
              ? undefined
              : {
                  x: gridTranslateX,
                  y: gridTranslateY,
                  rotateX: gridRotateX,
                  rotateY: gridRotateY,
                  scale: gridScale,
                }
          }
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.06)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.06)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.08),transparent_54%)]" />
        </motion.div>
      </div>

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </div>
  );
};

export default GlobalBackground;
