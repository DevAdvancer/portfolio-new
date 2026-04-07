import { FileText, Mail, FolderOpen, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroScene from "./HeroScene";
import TypingAnimation from "./TypingAnimation";
import {
  fadeIn,
  fadeUp,
  hoverLift,
  pressDown,
  staggerContainer,
} from "@/lib/motion";

const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const roles = [
    "Software Developer",
    "Full Stack Developer",
    "Problem Solver",
    "Tech Enthusiast",
    "Software Engineer",
  ];

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

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center pt-20 sm:pt-0">
        <motion.div
          className="max-w-3xl mx-auto"
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-4 sm:mb-6"
            variants={fadeIn()}
          >
            Welcome to my portfolio
          </motion.p>

          <motion.h1
            className="font-serif text-3xl sm:text-5xl md:text-7xl font-medium text-foreground mb-3 sm:mb-4"
            variants={fadeUp()}
          >
            Abhirup Kumar
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
            className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-8 sm:mb-12 px-2"
            variants={fadeUp(0.16)}
          >
            Building clean, efficient, and impactful digital solutions. Passionate about transforming ideas into reality through code.
          </motion.p>

          {/* CTA Buttons - Stack on mobile */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            variants={fadeUp(0.24)}
          >
            <motion.a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 hover:scale-105 w-full sm:w-auto justify-center"
              whileHover={hoverLift}
              whileTap={pressDown}
            >
              <FileText size={16} className="group-hover:rotate-12 transition-transform" />
              View Resume
            </motion.a>
            <motion.div whileHover={hoverLift} whileTap={pressDown}>
              <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105 w-full sm:w-auto justify-center"
              >
                <Mail size={16} className="group-hover:rotate-12 transition-transform" />
                Contact Me
              </Link>
            </motion.div>
            <motion.button
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-border text-muted-foreground text-sm font-medium hover:border-primary hover:text-primary transition-all hover:scale-105 w-full sm:w-auto justify-center"
              whileHover={hoverLift}
              whileTap={pressDown}
            >
              <FolderOpen size={16} className="group-hover:rotate-12 transition-transform" />
              View Projects
            </motion.button>
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
