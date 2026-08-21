import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/devadvancer", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/abhirupkumar", label: "LinkedIn" },
    { icon: Mail, href: "mailto:theabhirupkumar@gmail.com", label: "Email" },
  ];

  const quickLinks = [
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Blog", href: "/blog" },
    { name: "Achievements", href: "/achievements" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border bg-card/30">
      {/* Giant ghost wordmark — bleeds off both edges, clipped by overflow-hidden */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute inset-x-0 -bottom-2 sm:-bottom-6 text-center font-serif font-semibold leading-none whitespace-nowrap text-[19vw] text-foreground/[0.035]"
      >
        Abhirup Kumar
      </span>

      <div className="relative container mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Closing CTA moment */}
          <div className="flex flex-col items-center text-center gap-5 mb-14">
            <span className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 text-emerald-400 live-ping" />
              Available for new opportunities
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight">
              Let's build something{" "}
              <span className="text-gradient">worth shipping.</span>
            </h2>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Let's talk
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* Gradient hairline */}
          <div className="section-divider mb-10" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            {/* Logo/Name */}
            <Link
              to="/"
              className="font-serif text-xl text-foreground hover:text-primary transition-colors"
            >
              Abhirup Kumar
            </Link>

            {/* Quick Links */}
            <nav className="flex flex-wrap items-center justify-center gap-6">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground">
              © {currentYear} Abhirup Kumar. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with passion & <span className="text-primary">purpose</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
