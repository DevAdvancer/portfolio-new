import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface SkillCategory {
  title: string;
  skills: { name: string; level: "Beginner" | "Intermediate" | "Advanced" }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", level: "Advanced" },
      { name: "JavaScript", level: "Advanced" },
      { name: "TypeScript", level: "Intermediate" },
      { name: "Java", level: "Intermediate" },
      { name: "C", level: "Intermediate" },
      { name: "C++", level: "Beginner" },
    ],
  },
  {
    title: "Web Technologies",
    skills: [
      { name: "React", level: "Advanced" },
      { name: "Node.js", level: "Advanced" },
      { name: "HTML/CSS", level: "Advanced" },
      { name: "Next.js", level: "Advanced" },
      { name: "Tailwind CSS", level: "Intermediate" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", level: "Advanced" },
      { name: "Supabase", level: "Advanced" },
      { name: "MongoDB", level: "Intermediate" },
      { name: "PostgreSQL", level: "Beginner" },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git & GitHub", level: "Advanced" },
      { name: "VS Code", level: "Advanced" },
      { name: "Cursor", level: "Advanced" },
      { name: "Kiro", level: "Intermediate" },
      { name: "Linux", level: "Advanced" },
      { name: "CLI Tools", level: "Intermediate" },
      { name: "Docker", level: "Beginner" },
    ],
  },
  {
    title: "Domains",
    skills: [
      { name: "Full Stack Development", level: "Advanced" },
      { name: "Data Structures & Algorithms", level: "Advanced" },
      { name: "REST APIs", level: "Advanced" },
      { name: "Flutter Development", level: "Intermediate" },
      { name: "Cybersecurity Basics", level: "Intermediate" },
      { name: "DevOps Fundamentals", level: "Intermediate" },
    ],
  },
];

const levelPercentage = {
  Beginner: 33,
  Intermediate: 66,
  Advanced: 100,
};

const levelColors = {
  Beginner: "bg-muted",
  Intermediate: "bg-accent",
  Advanced: "bg-primary",
};

const SkillBar = ({ name, level }: { name: string; level: "Beginner" | "Intermediate" | "Advanced" }) => {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setWidth(levelPercentage[level]);
            }, 100);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={barRef} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-foreground">{name}</span>
        <span className="text-muted-foreground">{level}</span>
      </div>
      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
        <div
          className={`h-full ${levelColors[level]} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
              Technical Proficiency
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12">
              Skills & Tech Stack
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <ScrollReveal key={category.title} delay={index * 100}>
                <div className="bg-card/50 border border-border p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 h-full">
                  <h3 className="text-sm uppercase tracking-widest text-primary mb-4">
                    {category.title}
                  </h3>
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
