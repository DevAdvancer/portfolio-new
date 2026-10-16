import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";
import { hoverLift, smoothTransition } from "@/lib/motion";

interface EducationItem {
  degree: string;
  specialization: string;
  institution: string;
  duration: string;
  cgpa?: string;
  percentage?: string;
  highlights?: string[];
}

const education: EducationItem[] = [
  {
    degree: "Bachelor of Technology",
    specialization: "Computer Science & Engineering",
    institution: "Adamas University",
    duration: "2022 - 2026 (Graduated)",
    cgpa: "8.68 / 10",
    highlights: [
      "Relevant Coursework: Data Structures, Algorithms, DBMS, OS, Computer Networks",
      "Member of Coding Club & Technical Society",
    ],
  },
  {
    degree: "Higher Secondary (12th)",
    specialization: "Science - PCM with Computer Science",
    institution: "Kendriya Vidyalaya Tarakeswar",
    duration: "2020 - 2022",
    percentage: "59%",
  },
  {
    degree: "Secondary (10th)",
    specialization: "General",
    institution: "Kendriya Vidyalaya Tarakeswar",
    duration: "2018 - 2020",
    percentage: "74%",
  },
];

const Education = () => {
  return (
    <section id="education" className="accent-amber py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            index={5}
            kicker="Academic Background"
            title="Education"
            className="mb-12"
          />

          <div className="space-y-8">
            {education.map((edu, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <motion.div
                  className="card-premium p-8 flex gap-6"
                  whileHover={hoverLift}
                  transition={smoothTransition}
                >
                  <div className="flex-shrink-0 hidden sm:block">
                    <div className="w-12 h-12 bg-secondary/50 border border-section/30 flex items-center justify-center">
                      <GraduationCap size={24} className="text-section" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-serif text-xl text-foreground">
                          {edu.degree}
                        </h3>
                        <p className="text-sm text-section">{edu.specialization}</p>
                      </div>
                      {(edu.cgpa || edu.percentage) && (
                        <div className="text-right">
                          <p className="text-lg font-medium text-section">
                            {edu.cgpa || edu.percentage}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {edu.cgpa ? "CGPA" : "Percentage"}
                          </p>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-foreground mb-1">{edu.institution}</p>
                    <p className="text-xs text-muted-foreground mb-4">{edu.duration}</p>

                    {edu.highlights && (
                      <ul className="space-y-1">
                        {edu.highlights.map((highlight, i) => (
                          <li key={i} className="text-sm text-muted-foreground">
                            • {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
