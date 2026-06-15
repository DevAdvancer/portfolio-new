import { useEffect, useState } from "react";
import { FileText, Mail, FolderOpen, ArrowDown, Sparkles, MapPin, Radio } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroScene from "./HeroScene";
import TypingAnimation from "./TypingAnimation";
import MagneticButton from "./MagneticButton";
import RecruiterStatsBar from "./RecruiterStatsBar";
import ScrollReveal from "./ScrollReveal";
import {
  fadeIn,
  fadeUp,
  pressDown,
  staggerContainer,
} from "@/lib/motion";

const roles = [
  "Software Developer",
  "Full Stack Engineer",
  "Problem Solver",
  "Tech Enthusiast",
  "Software Engineer",
];

/**
 * Splits text into per-character spans for a staggered reveal.
 * Each character is a solid foreground-coloured span so the serif font
 * (Crimson Pro) renders crisply — the gradient effect is applied at the
 * h1 level via a subtle text-shadow glow rather than `background-clip: text`,
 * which can wash out thin serif strokes.
 */
const SplitName = ({ text, start, className = "" }: { text: string; start: boolean; className?: string }) => {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className={`char ${start ? "in" : ""}`}
          style={{ transitionDelay: `${index * 60}ms` }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
};

const Hero = () => {
  const [nameRevealed, setNameRevealed] = useState(false);
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const id = window.setTimeout(() => setNameRevealed(true), 280);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-0">
      {/* 3D Background */}
      <HeroScene />

      <motion.div
        className="absolute -top-16 right-[8%] h-48 w-48 rounded-full bg-primary/10 blur-3xl pointer-events-none"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-[10%] h-56 w-56 rounded-full bg-accent/10 blur-3xl pointer-events-none"
        animate={{
          y: [0, -18, 0],
          x: [0, 12, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center pt-20 sm:pt-0">
        <motion.div
          className="max-w-3xl mx-auto"
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="visible"
        >
          {/* Live status badge */}
          <motion.div
            variants={fadeIn()}
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 sm:mb-8 border border-emerald-400/30 bg-emerald-400/5 backdrop-blur-sm"
          >
            <span className="relative inline-flex h-2 w-2 text-emerald-400">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 live-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-emerald-300 font-medium">
              Open to opportunities
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 ml-2 pl-2 border-l border-emerald-400/20 text-[10px] text-emerald-300/70">
              <MapPin size={10} /> Kolkata · Bangalore, IN
            </span>
          </motion.div>

          <motion.p
            className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-4 sm:mb-6"
            variants={fadeIn()}
          >
            <Sparkles size={12} className="inline-block mr-2 -mt-0.5" />
            Hello, recruiter. Welcome to my portfolio.
          </motion.p>

          <motion.h1
            className="hero-name-glow font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold mb-3 sm:mb-4 leading-[1.05] tracking-tight"
            variants={fadeUp()}
          >
            <SplitName text="Abhirup Kumar" start={nameRevealed} />
          </motion.h1>

          <motion.div
            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-3 sm:mb-4 h-7 sm:h-8"
            variants={fadeUp(0.08)}
          >
            <span className="text-foreground">I'm a </span>
            <TypingAnimation
              words={roles}
              className="text-primary font-medium"
            />
          </motion.div>

          <motion.p
            className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-8 sm:mb-10 px-2"
            variants={fadeUp(0.16)}
          >
            I build reliable, fast, and beautifully crafted web applications — and I care about how every detail feels to the person using it.
          </motion.p>

          {/* CTA Buttons - magnetic on desktop */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            variants={fadeUp(0.24)}
          >
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

            <motion.div whileHover={{ y: -4 }} whileTap={pressDown}>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105 w-full sm:w-auto justify-center"
              >
                <Mail size={16} className="group-hover:rotate-12 transition-transform" />
                Hire Me
              </Link>
            </motion.div>
          </motion.div>

          {/* Recruiter stats bar */}
          <ScrollReveal delay={250}>
            <RecruiterStatsBar />
          </ScrollReveal>

          {/* Subtle inline trust signals */}
          <motion.div
            variants={fadeUp(0.4)}
            className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground/80"
          >
            <span className="inline-flex items-center gap-1.5">
              <Radio size={12} className="text-primary" /> Available immediately
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Remote / Hybrid / On-site</span>
            <span className="hidden sm:inline">•</span>
            <span>Full-time · Contract</span>
          </motion.div>
        </motion.div>
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
