import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Minimal magnetic cursor — a single fixed dot that eases toward the pointer.
 *
 * Deliberately cheap and self-gating so it can never regress Lighthouse:
 *  - Desktop only: bails unless `(pointer: fine)` matches (no touch devices).
 *  - Respects `prefers-reduced-motion`: bails entirely, native cursor stays.
 *  - One passive `pointermove` writes to a ref; a single rAF loop drives all
 *    movement via `transform: translate3d` (compositor-only, TBT ≈ 0). We never
 *    touch top/left, and the dot is centred with a negative margin so the
 *    per-frame transform stays a pure translate.
 *  - Adds `has-custom-cursor` to <html> so the existing CSS hook hides the
 *    native cursor; removed on cleanup. Trivially removable (unmount = gone).
 */
const CustomCursor = () => {
  const prefersReducedMotion = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let visible = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
      }
    };
    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
    };
    const onDown = () => dot.classList.add("cursor-dot--down");
    const onUp = () => dot.classList.remove("cursor-dot--down");

    const tick = () => {
      // Ease toward the pointer for a subtle magnetic trail.
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      root.classList.remove("has-custom-cursor");
    };
  }, [prefersReducedMotion]);

  // Hidden on touch/small screens; transparent until the first pointer move.
  // pointer-events-none guarantees it never intercepts clicks.
  return (
    <div
      ref={dotRef}
      aria-hidden
      className="cursor-dot pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      style={{ opacity: 0 }}
    />
  );
};

export default CustomCursor;
