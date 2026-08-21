import { ReactNode } from "react";
import ScrollReveal from "./ScrollReveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Chapter numeral, rendered as a zero-padded "01 — 05". */
  index: number;
  /** Uppercase eyebrow label, rendered in the section accent. */
  kicker: string;
  /** Serif display title. Accepts nodes so callers can drop gradient spans in. */
  title: ReactNode;
  /** Optional muted intro paragraph below the title. */
  intro?: ReactNode;
  align?: "left" | "center";
  /** Applied to the ScrollReveal wrapper — use for the header's bottom spacing. */
  className?: string;
  titleClassName?: string;
  introClassName?: string;
}

/**
 * One editorial section header shared across sections. The accent hue comes from
 * the ancestor's `--section-accent` (set via an `.accent-*` helper on the section),
 * so the numeral, tick and kicker automatically match the section's colour.
 */
const SectionHeader = ({
  index,
  kicker,
  title,
  intro,
  align = "left",
  className,
  titleClassName,
  introClassName,
}: SectionHeaderProps) => {
  const isCenter = align === "center";

  return (
    <ScrollReveal className={className}>
      <div className={cn("flex flex-col", isCenter && "items-center text-center")}>
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-section tabular-nums">
            {String(index).padStart(2, "0")}
          </span>
          <span className="h-px w-8 bg-section" />
          <p className="text-sm uppercase tracking-[0.3em] text-section">{kicker}</p>
        </div>
        <h2
          className={cn(
            "font-serif text-3xl md:text-4xl text-foreground leading-tight",
            intro ? "mb-4" : "mb-0",
            titleClassName
          )}
        >
          {title}
        </h2>
        {intro && (
          <p
            className={cn(
              "text-muted-foreground max-w-2xl text-base sm:text-lg",
              isCenter && "mx-auto",
              introClassName
            )}
          >
            {intro}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
};

export default SectionHeader;
