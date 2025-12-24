import { FileText, Mail, FolderOpen, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import HeroScene from "./HeroScene";
import TypingAnimation from "./TypingAnimation";

const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const roles = [
    "Software Engineer",
    "Full Stack Developer",
    "Problem Solver",
    "Tech Enthusiast",
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-0">
      {/* 3D Background */}
      <HeroScene />

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
        <div className="max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-4 sm:mb-6 animate-fade-in">
            Welcome to my portfolio
          </p>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl font-medium text-foreground mb-3 sm:mb-4 animate-fade-in-up">
            Abhirup Kumar
          </h1>

          <div className="text-base sm:text-lg md:text-xl text-muted-foreground mb-3 sm:mb-4 animate-fade-in-up h-7 sm:h-8">
            <span className="text-foreground">I'm a </span>
            <TypingAnimation
              words={roles}
              className="text-primary font-medium"
            />
          </div>

          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-8 sm:mb-12 animate-fade-in-up delay-200 px-2">
            Building clean, efficient, and impactful digital solutions. Passionate about transforming ideas into reality through code.
          </p>

          {/* CTA Buttons - Stack on mobile */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-fade-in-up delay-300">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 hover:scale-105 w-full sm:w-auto justify-center"
            >
              <FileText size={16} className="group-hover:rotate-12 transition-transform" />
              View Resume
            </a>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105 w-full sm:w-auto justify-center"
            >
              <Mail size={16} className="group-hover:rotate-12 transition-transform" />
              Contact Me
            </Link>
            <button
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-border text-muted-foreground text-sm font-medium hover:border-primary hover:text-primary transition-all hover:scale-105 w-full sm:w-auto justify-center"
            >
              <FolderOpen size={16} className="group-hover:rotate-12 transition-transform" />
              View Projects
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollTo("about")}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors group z-20"
        aria-label="Scroll to about section"
      >
        <ArrowDown size={20} className="animate-bounce group-hover:scale-125 transition-transform" />
      </button>
    </section>
  );
};

export default Hero;
