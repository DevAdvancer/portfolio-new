import { Award, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

interface Achievement {
  title: string;
  issuer: string;
  date: string;
  type: "certification" | "award" | "competition";
  link?: string;
  description?: string;
}

const achievements: Achievement[] = [
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    type: "certification",
    link: "https://aws.amazon.com/certification/",
    description: "Foundational understanding of AWS Cloud services, architecture, and pricing models.",
  },
  {
    title: "Full Stack Web Development",
    issuer: "Coursera - Meta",
    date: "2024",
    type: "certification",
    link: "https://coursera.org",
    description: "Professional certificate covering React, Django, databases, and version control.",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "TryHackMe",
    date: "2023",
    type: "certification",
    link: "https://tryhackme.com",
    description: "Hands-on training in network security, web vulnerabilities, and ethical hacking.",
  },
  {
    title: "Smart India Hackathon - National Finalist",
    issuer: "Ministry of Education, India",
    date: "2023",
    type: "competition",
    description: "Led team to national finals among 50,000+ participants with AI healthcare solution.",
  },
  {
    title: "Dean's List - Academic Excellence",
    issuer: "Your University",
    date: "2022-2024",
    type: "award",
    description: "Recognized for maintaining top academic performance across multiple semesters.",
  },
  {
    title: "LeetCode 200+ Problems Solved",
    issuer: "LeetCode",
    date: "2024",
    type: "competition",
    link: "https://leetcode.com/yourusername",
    description: "Consistent problem-solving practice covering arrays, trees, graphs, and dynamic programming.",
  },
];

const typeStyles = {
  certification: "border-primary/50 bg-primary/10",
  award: "border-accent/50 bg-accent/10",
  competition: "border-chart-3/50 bg-chart-3/10",
};

const typeLabels = {
  certification: "Certification",
  award: "Award",
  competition: "Competition",
};

const AchievementsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-3 sm:mb-4">
                Recognition
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 sm:mb-4">
                Achievements & Certifications
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mb-8 sm:mb-12 max-w-2xl">
                A collection of certifications, awards, and accomplishments that showcase my commitment to continuous learning and excellence.
              </p>
            </ScrollReveal>

            <div className="grid gap-4 sm:gap-6">
              {achievements.map((achievement, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <div
                    className={`bg-card/50 border p-4 sm:p-6 hover:shadow-lg transition-all ${typeStyles[achievement.type]}`}
                  >
                    <div className="flex gap-3 sm:gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/50 flex items-center justify-center">
                          <Award size={18} className="text-primary sm:w-5 sm:h-5" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 sm:gap-4 mb-2">
                          <h3 className="font-serif text-lg sm:text-xl text-foreground">
                            {achievement.title}
                          </h3>
                          {achievement.link && (
                            <a
                              href={achievement.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
                              aria-label="View credential"
                            >
                              <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                            </a>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-primary mb-2">
                          {achievement.issuer}
                        </p>
                        {achievement.description && (
                          <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                            {achievement.description}
                          </p>
                        )}
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                          <span className="text-xs text-muted-foreground">
                            {achievement.date}
                          </span>
                          <span className="text-xs px-2 py-0.5 bg-secondary/50 text-muted-foreground border border-border">
                            {typeLabels[achievement.type]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AchievementsPage;
