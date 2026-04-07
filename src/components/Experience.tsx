import { Briefcase, GraduationCap, Award, Code } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
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
}

const experiences: Experience[] = [
  {
    type: "full-time",
    title: "Software Developer",
    organization: "Vizva Consultancy Services",
    duration: "JAN 2026 - PRESENT",
    startDate: "2026-01-01",
    employmentType: "Full Time",
    description: "I am responsible for developing scalable internal tools and web platforms that integrate with and support the company's flagship products, enabling efficient monitoring, management, and continuous improvement across teams.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn-ui", "Supabase", "Vercel", "Mongo-db", "NEXT.js", "Node.js", "Express.js", "Scripting", "CI/CD pipeline", "Git"],
    highlights: [
      "Built internal dashboards and workflow tools used by multiple teams for daily operations.",
      "Developed production-ready frontend features with React, TypeScript, and Tailwind while keeping the UI responsive and maintainable.",
      "Integrated backend services and data flows to support monitoring, reporting, and product-side operations.",
      "Contributed to deployment and iteration workflows so features could ship faster with fewer regressions.",
    ],
  },
  {
    type: "internship",
    title: "Lead Software Developer",
    organization: "HERMEiAS",
    duration: "MAY 2025 - DECEMBER 2025",
    startDate: "2025-05-01",
    endDate: "2025-12-01",
    employmentType: "Internship",
    description: "I am responsible for developing scalable internal tools and web platforms that integrate with and support the company's flagship products, enabling efficient monitoring, management, and continuous improvement across teams.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn-ui", "Supabase", "Vercel"],
    highlights: [
      "Led implementation of frontend modules and helped shape the structure of reusable UI components.",
      "Worked on internal web platforms focused on usability, performance, and cleaner operational workflows.",
      "Collaborated on feature delivery from UI development through integration and testing.",
      "Improved product polish with responsive layouts, better interaction design, and smoother user flows.",
    ],
  }
];

const typeIcons = {
  internship: Briefcase,
  training: GraduationCap,
  hackathon: Award,
  research: Code,
  "full-time": Briefcase,
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
    <section id="experience" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
              Professional Journey
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12">
              Experience & Learning
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent hidden md:block" />

            <div className="space-y-12">
              {experiences.map((exp, index) => {
                const Icon = typeIcons[exp.type];
                return (
                  <ScrollReveal key={index} delay={index * 150}>
                    <div className="relative grid md:grid-cols-[40px_1fr] gap-6">
                      <div className="hidden md:flex items-start justify-center">
                        <div className="w-10 h-10 bg-card border border-primary/50 flex items-center justify-center shadow-lg shadow-primary/10">
                          <Icon size={18} className="text-primary" />
                        </div>
                      </div>

                      <motion.div
                        className="bg-card/50 border border-border p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5"
                        whileHover={hoverLift}
                        transition={smoothTransition}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div>
                            <h3 className="font-serif text-xl text-foreground">
                              {exp.title}
                            </h3>
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm text-primary">{exp.organization}</p>
                              {exp.employmentType && (
                                <span className="text-xs text-primary bg-primary/10 px-2 py-1 border border-primary/30 rounded">
                                  {exp.employmentType}
                                </span>
                              )}
                              <span className="text-xs text-accent bg-accent/10 px-2 py-1 border border-accent/30 rounded">
                                {formatMonthCount(getMonthCount(exp.startDate, exp.endDate))}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground bg-secondary/50 px-3 py-1 border border-border">
                            {exp.duration}
                          </span>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">
                          {exp.description}
                        </p>

                        {exp.highlights && (
                          <div className="mb-5">
                            <p className="text-xs uppercase tracking-widest text-primary mb-2">
                              What I Did
                            </p>
                            <ul className="space-y-2">
                              {exp.highlights.map((highlight) => (
                                <li
                                  key={highlight}
                                  className="text-sm text-muted-foreground flex items-start gap-2"
                                >
                                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
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
                      </motion.div>
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
