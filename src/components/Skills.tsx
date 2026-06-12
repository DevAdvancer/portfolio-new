import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "Python", level: "Advanced" },
      { name: "JavaScript", level: "Advanced" },
      { name: "TypeScript", level: "Intermediate" },
      { name: "Java", level: "Intermediate" },
      { name: "C", level: "Intermediate" },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { name: "React", level: "Advanced" },
      { name: "Node.js", level: "Advanced" },
      { name: "Next.js", level: "Advanced" },
      { name: "Tailwind CSS", level: "Intermediate" },
    ],
  },
  {
    title: "Data",
    skills: [
      { name: "MySQL", level: "Advanced" },
      { name: "Supabase", level: "Advanced" },
      { name: "MongoDB", level: "Intermediate" },
      { name: "PostgreSQL", level: "Beginner" },
    ],
  },
  {
    title: "Tooling",
    skills: [
      { name: "Git & GitHub", level: "Advanced" },
      { name: "VS Code", level: "Advanced" },
      { name: "Cursor", level: "Advanced" },
      { name: "Docker", level: "Beginner" },
    ],
  },
  {
    title: "Platforms",
    skills: [
      { name: "Linux", level: "Advanced" },
      { name: "Vercel", level: "Advanced" },
    ],
  },
  {
    title: "Domains",
    skills: [
      { name: "Full Stack", level: "Advanced" },
      { name: "DSA", level: "Advanced" },
      { name: "REST APIs", level: "Advanced" },
      { name: "Cybersecurity", level: "Intermediate" },
      { name: "DevOps", level: "Intermediate" },
    ],
  },
];

const levelStyle: Record<Skill["level"], { text: string; bar: string; dot: string; label: string; pct: number }> = {
  Beginner: { text: "text-muted-foreground", bar: "bg-muted-foreground/40", dot: "bg-muted-foreground", label: "Learning", pct: 33 },
  Intermediate: { text: "text-accent", bar: "bg-accent", dot: "bg-accent", label: "Proficient", pct: 66 },
  Advanced: { text: "text-primary", bar: "bg-primary", dot: "bg-primary", label: "Expert", pct: 100 },
};

const SkillRow = ({ skill }: { skill: Skill }) => {
  const s = levelStyle[skill.level];
  return (
    <div className="group flex items-center justify-between gap-3 py-2.5 border-b border-border/50 last:border-b-0">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className={`h-1.5 w-1.5 rounded-full ${s.dot} flex-shrink-0`} />
        <span className="text-sm text-foreground truncate">{skill.name}</span>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="w-20 sm:w-28 h-1 bg-muted/30 overflow-hidden">
          <motion.div
            className={`h-full ${s.bar}`}
            initial={{ width: 0 }}
            whileInView={{ width: `${s.pct}%` }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <span className={`text-[10px] uppercase tracking-[0.18em] ${s.text} w-20 text-right hidden sm:inline`}>
          {s.label}
        </span>
      </div>
    </div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const visibleCategories = activeCategory
    ? skillCategories.filter((c) => c.title === activeCategory)
    : skillCategories;

  return (
    <section id="skills" className="py-16 sm:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-primary" />
              <p className="text-sm uppercase tracking-[0.3em] text-primary">
                Technical Proficiency
              </p>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Skills & Tech Stack
            </h2>
            <p className="text-muted-foreground max-w-2xl mb-8 sm:mb-10">
              A focused map of the technologies I work with daily — grouped by purpose, with honest proficiency levels.
            </p>
          </ScrollReveal>

          {/* Category filter pills */}
          <ScrollReveal delay={100}>
            <div className="flex flex-wrap gap-2 mb-10 sm:mb-12">
              <motion.button
                onClick={() => setActiveCategory(null)}
                className={`text-xs px-4 py-2 border transition-colors ${
                  activeCategory === null
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
                whileTap={{ scale: 0.97 }}
              >
                All
              </motion.button>
              {skillCategories.map((cat) => (
                <motion.button
                  key={cat.title}
                  onClick={() => setActiveCategory(cat.title === activeCategory ? null : cat.title)}
                  className={`text-xs px-4 py-2 border transition-colors ${
                    activeCategory === cat.title
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                  whileTap={{ scale: 0.97 }}
                >
                  {cat.title}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          {/* Skill rows by category */}
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
            {visibleCategories.map((category, catIndex) => (
              <ScrollReveal key={category.title} delay={catIndex * 80}>
                <div>
                  <h3 className="text-sm uppercase tracking-[0.18em] text-primary mb-3 flex items-center gap-2">
                    <span className="h-px w-4 bg-primary" />
                    {category.title}
                    <span className="text-muted-foreground/60 ml-auto text-xs">
                      {category.skills.length}
                    </span>
                  </h3>
                  <div>
                    {category.skills.map((skill) => (
                      <SkillRow key={skill.name} skill={skill} />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Legend */}
          <ScrollReveal delay={300}>
            <div className="mt-12 flex flex-wrap items-center justify-start gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                Learning
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Proficient
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Expert
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Skills;
