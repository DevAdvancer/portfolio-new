import { Briefcase, GraduationCap, Award, Code } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface Experience {
  type: "internship" | "training" | "hackathon" | "research";
  title: string;
  organization: string;
  duration: string;
  employmentType?: "Internship" | "Full Time";
  description: string;
  technologies?: string[];
}

const experiences: Experience[] = [
  {
    type: "internship",
    title: "Lead Software Developer",
    organization: "HERMEiAS",
    duration: "MAY 2025 - DECEMBER 2025",
    employmentType: "Internship",
    description: "I am responsible for developing scalable internal tools and web platforms that integrate with and support the company's flagship products, enabling efficient monitoring, management, and continuous improvement across teams.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn-ui", "Supabase", "Vercel"],
  }
];

const typeIcons = {
  internship: Briefcase,
  training: GraduationCap,
  hackathon: Award,
  research: Code,
};

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

                      <div className="bg-card/50 border border-border p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
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
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground bg-secondary/50 px-3 py-1 border border-border">
                            {exp.duration}
                          </span>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">
                          {exp.description}
                        </p>

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
