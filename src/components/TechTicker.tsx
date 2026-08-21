import TechMarquee from "./TechMarquee";

const rowOne = [
  "React", "TypeScript", "Next.js", "Node.js", "Express", "Python", "Tailwind CSS", "Vite", "shadcn/ui", "Supabase", "MySQL", "MongoDB",
];

const rowTwo = [
  "JavaScript", "Java", "Git", "Docker", "Vercel", "Linux", "VS Code", "Cursor", "REST APIs", "Framer Motion", "Rust", "Zustand",
];

/**
 * Two-row infinite marquee of the technologies Abhirup works with.
 * Lives as a high-visibility band between sections — readers' eyes naturally
 * drift over it, and it signals the depth of his stack at a glance.
 */
const TechTicker = () => {
  return (
    <section
      aria-label="Technologies Abhirup works with"
      className="relative py-12 sm:py-16 bg-background border-y border-border overflow-hidden"
    >
      {/* Side gradient fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Subtle background pulse */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.05),transparent_60%)]" />

      <div className="space-y-6">
        <TechMarquee items={rowOne} duration={32} />
        <TechMarquee items={rowTwo} reverse duration={42} />
      </div>
    </section>
  );
};

export default TechTicker;
