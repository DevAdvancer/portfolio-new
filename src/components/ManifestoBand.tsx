import ScrollReveal from "./ScrollReveal";

/** Each line pairs a muted lead-in with the single word that carries the
 *  gradient — restraint reads as more intentional than gradient-on-everything. */
const lines: [string, string][] = [
  ["I don't just write ", "code."],
  ["I design ", "systems."],
  ["I ship ", "outcomes."],
  ["I care about the ", "user."],
  ["I make teams ", "faster."],
];

/**
 * Engineering philosophy band. A subtle noise overlay + two drifting aurora
 * blobs fill what was dead space; the gradient is reserved for the key word of
 * each line. All motion is transform-only CSS, neutralised under
 * prefers-reduced-motion by the global kill-switch.
 */
const ManifestoBand = () => {
  return (
    <section
      aria-label="Engineering philosophy"
      className="noise-overlay relative py-24 sm:py-36 overflow-hidden bg-secondary/10"
    >
      {/* Drifting aurora wash — multi-accent, purely ambient */}
      <div className="aurora-blob w-72 h-72 sm:w-[26rem] sm:h-[26rem] -top-16 left-[8%] bg-primary/40" aria-hidden />
      <div className="aurora-blob w-72 h-72 sm:w-[26rem] sm:h-[26rem] top-1/3 right-[6%] bg-accent/40" aria-hidden />
      <div className="aurora-blob w-64 h-64 sm:w-96 sm:h-96 bottom-0 left-1/3 bg-chart-3/30" aria-hidden />

      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-primary mb-12">
              Engineering Philosophy
            </p>
          </ScrollReveal>

          <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
            {lines.map(([lead, accent], index) => (
              <ScrollReveal key={accent} delay={index * 100}>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground transition-transform hover:scale-105 duration-300">
                  {lead}
                  <span className="text-gradient">{accent}</span>
                </h3>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={500}>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-16 text-lg">
              These are the things that show up in my work, in my commits, and in the way I collaborate.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ManifestoBand;
