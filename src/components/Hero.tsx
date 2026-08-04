import { FileText, Mail, FolderOpen, ArrowDown, Sparkles, MapPin, Radio } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import TypingAnimation from "./TypingAnimation";
import MagneticButton from "./MagneticButton";
import RecruiterStatsBar from "./RecruiterStatsBar";
import ScrollReveal from "./ScrollReveal";
import {
  pressDown,
} from "@/lib/motion";

const roles = [
  "Software Developer",
  "Full Stack Engineer",
  "Problem Solver",
  "Tech Enthusiast",
  "Software Engineer",
];



const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-0">


      <div
        className="absolute -top-16 right-[8%] h-48 w-48 rounded-full bg-primary/10 blur-2xl pointer-events-none"
      />
      <div
        className="absolute bottom-20 left-[10%] h-56 w-56 rounded-full bg-accent/10 blur-2xl pointer-events-none"
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
        <div className="max-w-3xl mx-auto">


          <p
            className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-4 sm:mb-6"
          >
            <Sparkles size={12} className="inline-block mr-2 -mt-0.5" />
            Welcome to my portfolio.
          </p>

          <h1
            className="hero-name-glow font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold mb-3 sm:mb-4 leading-[1.05] tracking-tight"
          >
            Abhirup Kumar
          </h1>

          <div
            className="text-base sm:text-lg md:text-xl text-muted-foreground mb-3 sm:mb-4 h-7 sm:h-8"
          >
            <span className="text-foreground">I'm a </span>
            <TypingAnimation
              words={roles}
              className="text-primary font-medium"
            />
          </div>

          <p
            className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-8 sm:mb-10 px-2"
          >
            I build reliable, fast, and beautifully crafted web applications — and I care about how every detail feels to the person using it.
          </p>

          {/* CTA Buttons - magnetic on desktop */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
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

          {/* Recruiter stats bar */}
          <ScrollReveal delay={250}>
            <RecruiterStatsBar />
          </ScrollReveal>


        </div>
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
