import { useEffect, useState } from "react";
import { FileText, Mail, FolderOpen, ArrowDown, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import TypingAnimation from "./TypingAnimation";
import MagneticButton from "./MagneticButton";
import RecruiterStatsBar from "./RecruiterStatsBar";
import ScrollReveal from "./ScrollReveal";
import LiveTerminalPanel from "./LiveTerminalPanel";
import { pressDown } from "@/lib/motion";

const roles = [
  "Software Developer",
  "Full Stack Engineer",
  "Problem Solver",
  "Tech Enthusiast",
  "Software Engineer",
];

const FIRST = "Abhirup";
const LAST = "Kumar";

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, [prefersReducedMotion]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const renderWord = (word: string, startIndex: number) => (
    <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      {word.split("").map((ch, i) => (
        <span
          key={i}
          className={`char ${revealed ? "in" : ""}`}
          style={{ transitionDelay: `${(startIndex + i) * 40}ms` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );

  return (
    <section
      id="hero"
      className="accent-blue relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute -top-16 right-[8%] h-48 w-48 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
      <div className="absolute bottom-20 left-[10%] h-56 w-56 rounded-full bg-accent/10 blur-2xl pointer-events-none" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-24 pb-16 lg:py-0">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          {/* LEFT — editorial copy */}
          <div className="text-center lg:text-left">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-4 sm:mb-6">
              <Sparkles size={12} className="inline-block mr-2 -mt-0.5" />
              Welcome to my portfolio.
            </p>

            <h1 className="hero-name-glow font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold mb-3 sm:mb-4 leading-[1.05] tracking-tight">
              {prefersReducedMotion ? (
                "Abhirup Kumar"
              ) : (
                <>
                  {renderWord(FIRST, 0)} {renderWord(LAST, FIRST.length)}
                </>
              )}
            </h1>

            <div className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-5 h-7 sm:h-8">
              <span className="text-foreground">I'm a </span>
              <TypingAnimation words={roles} className="text-primary font-medium" />
            </div>

            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10">
              I build reliable, fast, and beautifully crafted web applications — and I care about how every detail feels to the person using it.
            </p>

            {/* CTA Buttons - magnetic on desktop */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-4">
              <MagneticButton
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                ariaLabel="View resume PDF"
                className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 w-full sm:w-auto justify-center"
              >
                <FileText size={16} className="group-hover:rotate-12 transition-transform" />
                View Resume
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollTo("projects")}
                ariaLabel="View projects"
                className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-border text-muted-foreground text-sm font-medium hover:border-primary hover:text-primary transition-all hover:scale-105 w-full sm:w-auto justify-center"
              >
                <FolderOpen size={16} className="group-hover:rotate-12 transition-transform" />
                View Projects
              </MagneticButton>

              <div>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105 w-full sm:w-auto justify-center"
                >
                  <Mail size={16} className="group-hover:rotate-12 transition-transform" />
                  Hire Me
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT — live terminal panel */}
          <ScrollReveal direction="left" delay={150} className="w-full">
            <LiveTerminalPanel />
          </ScrollReveal>
        </div>

        {/* Recruiter stats bar spans beneath both columns */}
        <ScrollReveal delay={250}>
          <RecruiterStatsBar />
        </ScrollReveal>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={() => scrollTo("about")}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors group z-20"
        aria-label="Scroll to about section"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.45 }}
        whileHover={{ y: 4 }}
        whileTap={pressDown}
      >
        <ArrowDown size={20} className="animate-bounce group-hover:scale-125 transition-transform" />
      </motion.button>
    </section>
  );
};

export default Hero;
