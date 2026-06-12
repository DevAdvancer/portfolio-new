import { motion, useReducedMotion } from "framer-motion";

/**
 * A lightweight, mostly-static background:
 *  - a soft top-down radial gradient (no per-frame recompute)
 *  - a subtle grid that breathes slowly (CSS animation, not JS-driven)
 *  - gentle, slow-drifting aurora blobs (CSS animation only)
 *
 * Earlier this component reactively tracked the pointer and applied a 3D
 * perspective rotation to a large grid. That looked slick on a desktop but
 * felt "sticky" on trackpads and lower-end devices because the entire
 * viewport was re-painting on every pointer move. We dropped the pointer
 * reactivity in favor of a calmer, purely CSS-animated background.
 */
const GlobalBackground = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-background"
      aria-hidden="true"
    >
      {/* Soft ambient gradient at the top */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.08),transparent_38%)]" />

      {/* Drifting aurora blobs (CSS-driven, very slow) */}
      <div
        className={`absolute -top-32 -left-24 h-[480px] w-[480px] rounded-full bg-primary/15 blur-3xl ${
          reduceMotion ? "" : "aurora-drift-slow"
        }`}
      />
      <div
        className={`absolute top-1/3 -right-32 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl ${
          reduceMotion ? "" : "aurora-drift-slower"
        }`}
      />
      <div
        className={`absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-chart-3/8 blur-3xl ${
          reduceMotion ? "" : "aurora-drift"
        }`}
      />

      {/* Faint grid — static, no perspective tricks */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
          WebkitMaskImage:
            "radial-gradient(circle at center, black, transparent 78%)",
          maskImage:
            "radial-gradient(circle at center, black, transparent 78%)",
        }}
      />

      {/* Top and bottom fades to blend sections cleanly */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </div>
  );
};

export default GlobalBackground;
