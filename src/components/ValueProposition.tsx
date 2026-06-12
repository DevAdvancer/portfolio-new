import {
  Zap,
  ShieldCheck,
  GitBranch,
  MessageSquare,
  Target,
  Sparkles,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { hoverLift, smoothTransition } from "@/lib/motion";

interface Pillar {
  icon: typeof Zap;
  title: string;
  description: string;
  proof: string;
  color: "primary" | "accent" | "chart-3" | "chart-4";
}

const pillars: Pillar[] = [
  {
    icon: Zap,
    title: "I ship, not just write",
    description:
      "Code that lands in production. I've owned features end-to-end — from scope to deploy — inside real teams and real deadlines.",
    proof: "Multiple features in production at Vizva & HERMEiAS",
    color: "primary",
  },
  {
    icon: GitBranch,
    title: "I think in systems",
    description:
      "I design before I code. State management, data flow, and edge cases are considered up-front, not patched in afterwards.",
    proof: "Built reusable component libraries and internal tooling",
    color: "accent",
  },
  {
    icon: ShieldCheck,
    title: "I write safe, durable code",
    description:
      "Type-safe TypeScript, defensive UI, accessible patterns, and a security-first mindset. I treat the codebase as a place other humans have to live in.",
    proof: "Strict TS · Accessible UI · No silent failures",
    color: "chart-3",
  },
  {
    icon: MessageSquare,
    title: "I communicate clearly",
    description:
      "I write crisp PRs, document trade-offs, and surface blockers early. Async-friendly, calm under pressure, friendly in standups.",
    proof: "Led frontend efforts across cross-functional teams",
    color: "chart-4",
  },
  {
    icon: Target,
    title: "I optimise for outcomes",
    description:
      "I care about what the product is doing for the user — not just what the code is doing for the build. I measure, then I improve.",
    proof: "Focus on performance, UX, and real shipping value",
    color: "primary",
  },
  {
    icon: Sparkles,
    title: "I learn out loud",
    description:
      "I write blog posts, build side projects, and explore new tools. The space moves fast — staying current is part of the job.",
    proof: "Active blog · Open-source · Always shipping in public",
    color: "accent",
  },
];

const colorText: Record<Pillar["color"], string> = {
  primary: "text-primary",
  accent: "text-accent",
  "chart-3": "text-chart-3",
  "chart-4": "text-chart-4",
};

const colorBg: Record<Pillar["color"], string> = {
  primary: "bg-primary/10",
  accent: "bg-accent/10",
  "chart-3": "bg-chart-3/10",
  "chart-4": "bg-chart-4/10",
};

const ValueProposition = () => {
  return (
    <section id="why" className="relative py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-primary" />
              <p className="text-sm uppercase tracking-[0.3em] text-primary">
                For recruiters
              </p>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4 leading-tight">
              What I bring to your team
            </h2>
            <p className="text-muted-foreground max-w-2xl text-base sm:text-lg mb-12 sm:mb-16">
              Six things you get the moment I join — beyond just code. These are the habits, instincts, and
              commitments I bring to every team I've been part of.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <ScrollReveal key={pillar.title} delay={index * 80}>
                  <article
                    className="group relative h-full bg-card/60 backdrop-blur-sm border border-border p-6 sm:p-7 overflow-hidden shine-on-hover hover:border-primary/40 transition-all"
                    onMouseMove={(e) => {
                      const target = e.currentTarget;
                      const rect = target.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width) * 100;
                      const y = ((e.clientY - rect.top) / rect.height) * 100;
                      target.style.setProperty("--mouse-x", `${x}%`);
                      target.style.setProperty("--mouse-y", `${y}%`);
                    }}
                  >
                    {/* Spotlight gradient that follows the cursor (CSS only — no React state) */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary) / 0.10), transparent 40%)",
                      }}
                    />

                    {/* Icon */}
                    <div
                      className={`relative inline-flex h-12 w-12 items-center justify-center ${colorBg[pillar.color]} ${colorText[pillar.color]} mb-5`}
                    >
                      <Icon size={20} />
                    </div>

                    <h3 className="font-serif text-xl text-foreground mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {pillar.description}
                    </p>

                    <div
                      className={`pt-4 border-t border-border/60 flex items-start gap-2 text-xs ${colorText[pillar.color]}`}
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-current flex-shrink-0" />
                      <span className="leading-relaxed">{pillar.proof}</span>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
