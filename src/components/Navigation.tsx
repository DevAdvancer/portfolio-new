import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, FileText } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" },
    { name: "Experience", href: "/#experience" },
    { name: "Education", href: "/#education" },
    { name: "Achievements", href: "/achievements" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="font-serif text-lg tracking-tight text-foreground hover:text-primary transition-colors"
            >
              DevAdvancer
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => handleClick(link.href)}
                  className={`text-sm transition-colors duration-200 ${
                    isActive(link.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                <FileText size={14} />
                Resume
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground z-[60] relative"
              aria-label="Toggle menu"
            >
              <Menu size={24} className={`transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-in navigation (right panel) */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu backdrop"
          />

          {/* Panel */}
          <aside className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-background border-l border-border shadow-xl animate-slide-in-right">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <div className="h-full flex flex-col px-6 pt-20 pb-10">
              <nav className="flex-1">
                <ul className="flex flex-col gap-5">
                  {links.map((link, index) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        onClick={() => handleClick(link.href)}
                        className={`block text-lg font-medium transition-colors ${
                          isActive(link.href)
                            ? "text-primary"
                            : "text-foreground hover:text-primary"
                        } animate-fade-in-up`}
                        style={{
                          animationDelay: `${index * 60}ms`,
                          animationFillMode: "both",
                        }}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-base font-medium hover:bg-primary/90 transition-all animate-fade-in-up"
                style={{
                  animationDelay: `${links.length * 60}ms`,
                  animationFillMode: "both",
                }}
              >
                <FileText size={18} />
                Download Resume
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Navigation;
