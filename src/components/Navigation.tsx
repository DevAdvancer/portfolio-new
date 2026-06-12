import { useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, FileText, Command } from "lucide-react";
import { hoverLift, pressDown, springTransition } from "@/lib/motion";

const links = [
  { name: "Why me", href: "/#why" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Experience", href: "/#experience" },
  { name: "Education", href: "/#education" },
  { name: "Achievements", href: "/achievements" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Track scroll progress for the top progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Listen for ⌘K / Ctrl+K to open the command palette via a global event
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        window.dispatchEvent(new CustomEvent("abhirup:open-command"));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false;
    return location.pathname === href;
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-primary via-accent to-chart-3 origin-left"
          style={{ scaleX }}
        />

        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <motion.div whileHover={{ y: -2 }} whileTap={pressDown}>
              <Link
                to="/"
                className="font-serif text-lg tracking-tight text-foreground hover:text-primary transition-colors"
              >
                <span className="text-gradient">Abhirup Kumar</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-5">
              {links.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ y: -2 }}
                  whileTap={pressDown}
                  transition={springTransition}
                >
                  <Link
                    to={link.href}
                    onClick={() => handleClick(link.href)}
                    className={`relative text-sm transition-colors duration-200 ${
                      isActive(link.href)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute -bottom-2 left-0 h-px w-full bg-primary"
                      />
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* Command palette trigger */}
              <motion.button
                onClick={() => window.dispatchEvent(new CustomEvent("abhirup:open-command"))}
                className="inline-flex items-center gap-2 px-2.5 py-1.5 border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all"
                whileHover={{ y: -2 }}
                whileTap={pressDown}
                aria-label="Open command palette"
              >
                <Command size={12} />
                <span className="hidden xl:inline">Search</span>
                <kbd className="hidden xl:inline-flex items-center gap-0.5 ml-1 px-1.5 py-0.5 bg-secondary/60 border border-border text-[10px] font-mono">
                  ⌘K
                </kbd>
              </motion.button>

              <motion.a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
                whileHover={hoverLift}
                whileTap={pressDown}
              >
                <FileText size={14} />
                Resume
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground z-[60] relative"
              aria-label="Toggle menu"
              whileTap={pressDown}
            >
              <Menu size={24} className={`transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile slide-in navigation (right panel) */}
      <AnimatePresence>
        {isOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <motion.button
            type="button"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* Panel */}
          <motion.aside
            className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-background border-l border-border shadow-xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <motion.button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Close menu"
              whileTap={pressDown}
            >
              <X size={24} />
            </motion.button>

            <div className="h-full flex flex-col px-6 pt-20 pb-10">
              <nav className="flex-1 overflow-y-auto">
                <ul className="flex flex-col gap-5">
                  {links.map((link, index) => (
                    <li key={link.name}>
                      <motion.div
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.28 }}
                        whileHover={{ x: 6 }}
                        whileTap={pressDown}
                      >
                        <Link
                          to={link.href}
                          onClick={() => handleClick(link.href)}
                          className={`block text-lg font-medium transition-colors ${
                            isActive(link.href)
                              ? "text-primary"
                              : "text-foreground hover:text-primary"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="space-y-3">
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    window.dispatchEvent(new CustomEvent("abhirup:open-command"));
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-base font-medium hover:border-primary transition-all"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: links.length * 0.05, duration: 0.28 }}
                  whileTap={pressDown}
                >
                  <Command size={18} />
                  Quick Search
                </motion.button>
                <motion.a
                  href="/Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-base font-medium hover:bg-primary/90 transition-all w-full"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: links.length * 0.05 + 0.05, duration: 0.28 }}
                  whileHover={hoverLift}
                  whileTap={pressDown}
                >
                  <FileText size={18} />
                  Download Resume
                </motion.a>
              </div>
            </div>
          </motion.aside>
        </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
