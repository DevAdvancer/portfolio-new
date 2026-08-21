import { Briefcase, GraduationCap, Award, Code, TrendingUp, Building2, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";
import { hoverLift, smoothTransition } from "@/lib/motion";

interface Experience {
  type: "internship" | "training" | "hackathon" | "research" | "full-time";
  title: string;
  organization: string;
  duration: string;
  startDate: string;
  endDate?: string;
  employmentType?: "Internship" | "Full Time";
  description: string;
  technologies?: string[];
  highlights?: string[];
  metrics?: { value: string; label: string }[];
  impact?: string;
  location?: string;
}

const experiences: Experience[] = [
  {
    type: "full-time",
    title: "Software Developer",
    organization: "Vizva Consultancy Services",
    duration: "JAN 2026 - PRESENT",
    startDate: "2026-01-01",
    employmentType: "Full Time",
    location: "Hybrid",
    description: "Building scalable internal tools and web platforms that integrate with and support the company's flagship products, enabling efficient monitoring, management, and continuous improvement across teams.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn-ui", "Supabase", "Vercel", "MongoDB", "Next.js", "Node.js", "Express.js", "CI/CD"],
    highlights: [
      "Built internal dashboards and workflow tools used by multiple teams for daily operations.",
      "Developed production-ready frontend features with React, TypeScript, and Tailwind while keeping the UI responsive and maintainable.",
      "Integrated backend services and data flows to support monitoring, reporting, and product-side operations.",
      "Contributed to deployment and iteration workflows so features could ship faster with fewer regressions.",
    ],
    metrics: [
      { value: "10+", label: "Features shipped" },
      { value: "3", label: "Internal tools" },
      { value: "100%", label: "On-time delivery" },
    ],
    impact: "Reduced internal team operations time by automating manual workflows.",
  },
  {
    type: "internship",
    title: "Lead Software Developer",
    organization: "HERMEiAS",
    duration: "MAY 2025 - DECEMBER 2025",
    startDate: "2025-05-01",
    endDate: "2025-12-01",
    employmentType: "Internship",
    location: "Remote",
    description: "Led frontend development of scalable internal tools and web platforms that integrate with and support the company's flagship products, enabling efficient monitoring, management, and continuous improvement across teams.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn-ui", "Supabase", "Vercel"],
    highlights: [
      "Led implementation of frontend modules and helped shape the structure of reusable UI components.",
      "Worked on internal web platforms focused on usability, performance, and cleaner operational workflows.",
      "Collaborated on feature delivery from UI development through integration and testing.",
      "Improved product polish with responsive layouts, better interaction design, and smoother user flows.",
    ],
    metrics: [
      { value: "8 mo", label: "Leadership" },
      { value: "Lead", label: "Frontend role" },
      { value: "5+", label: "Modules built" },
    ],
    impact: "Promoted to Lead Developer within first quarter for ownership and delivery quality.",
  }
];

const typeIcons = {
  internship: Briefcase,
  training: GraduationCap,
  hackathon: Award,
  research: Code,
  "full-time": Building2,
};

const getMonthCount = (startDate: string, endDate?: string) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;

  return Math.max(months, 1);
};

const formatMonthCount = (months: number) =>
  `${months} month${months === 1 ? "" : "s"}`;

const Experience = () => {
  return (
    <section id="experience" className="accent-pink py-16 sm:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            index={4}
            kicker="Professional Journey"
            title="Experience & Impact"
            intro="A timeline of the roles where I've shipped real work, led teams, and grown as an engineer."
            className="mb-12"
          />

          <div className="relative">
            {/* Static gradient timeline line — no per-frame scroll work, looks just as good */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-chart-3 hidden md:block" />

            <div className="space-y-10">
              {experiences.map((exp, index) => {
                const Icon = typeIcons[exp.type];
                return (
                  <ScrollReveal key={index} delay={index * 150}>
                    <div className="relative grid md:grid-cols-[40px_1fr] gap-6">
                      {/* Icon with glow */}
                      <div className="hidden md:flex items-start justify-center relative">
                        <motion.div
                          className="w-10 h-10 bg-card border-2 border-section flex items-center justify-center shadow-lg shadow-section/30 relative z-10"
                          whileHover={hoverLift}
                          transition={smoothTransition}
                        >
                          <Icon size={18} className="text-section" />
                        </motion.div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-section/20 blur-xl rounded-full" />
                      </div>

                      <motion.article
                        className="group relative bg-card/50 border border-border hover:border-section/50 transition-all overflow-hidden"
                        whileHover={hoverLift}
                        transition={smoothTransition}
                      >
                        {/* Top accent bar */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary via-accent to-chart-3 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="p-6">
                          {/* Header */}
                          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h3 className="font-serif text-xl text-foreground">
                                  {exp.title}
                                </h3>
                                {exp.employmentType && (
                                  <span className={`text-xs px-2 py-0.5 border rounded ${
                                    exp.employmentType === "Full Time"
                                      ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/30"
                                      : "text-primary bg-primary/10 border-primary/30"
                                  }`}>
                                    {exp.employmentType}
                                  </span>
                                )}
                                {exp.location && (
                                  <span className="text-xs text-muted-foreground">
                                    · {exp.location}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-section font-medium">
                                {exp.organization}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <span className="text-xs text-muted-foreground bg-secondary/50 px-3 py-1 border border-border flex items-center gap-1.5">
                                <Calendar size={12} />
                                {exp.duration}
                              </span>
                              <span className="text-xs text-accent">
                                {formatMonthCount(getMonthCount(exp.startDate, exp.endDate))}
                              </span>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                            {exp.description}
                          </p>

                          {/* Metrics - the unique edge */}
                          {exp.metrics && (
                            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 p-3 sm:p-4 bg-secondary/20 border border-border">
                              {exp.metrics.map((metric) => (
                                <div key={metric.label} className="text-center sm:text-left">
                                  <div className="font-serif text-xl sm:text-2xl text-gradient">
                                    {metric.value}
                                  </div>
                                  <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
                                    {metric.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {exp.highlights && (
                            <div className="mb-4">
                              <p className="text-xs uppercase tracking-widest text-section mb-2 flex items-center gap-1.5">
                                <TrendingUp size={12} />
                                Key Contributions
                              </p>
                              <ul className="space-y-2">
                                {exp.highlights.map((highlight) => (
                                  <li
                                    key={highlight}
                                    className="text-sm text-muted-foreground flex items-start gap-2 leading-relaxed"
                                  >
                                    <span className="mt-2 h-1 w-1 rounded-full bg-section flex-shrink-0" />
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Impact callout */}
                          {exp.impact && (
                            <div className="mb-4 p-3 border-l-2 border-section bg-section/5">
                              <p className="text-xs uppercase tracking-widest text-section mb-1">
                                Impact
                              </p>
                              <p className="text-sm text-foreground">
                                {exp.impact}
                              </p>
                            </div>
                          )}

                          {exp.technologies && (
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs px-2 py-1 bg-secondary/30 text-muted-foreground border border-border"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.article>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
