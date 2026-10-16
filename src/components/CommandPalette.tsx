import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Command as CommandIcon,
  FileText,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Hash,
  Sparkles,
} from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

interface Action {
  id: string;
  label: string;
  description?: string;
  icon: typeof Hash;
  shortcut?: string;
  perform: () => void;
  group: "Navigate" | "External" | "Actions";
}

const scrollToId = (id: string) => {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: "smooth" });
  else window.location.href = `/#${id}`;
};

const CommandPalette = ({ open, onClose }: CommandPaletteProps) => {
  return (
    <AnimatePresence>
      {open && <CommandPaletteContent key="command-palette" onClose={onClose} />}
    </AnimatePresence>
  );
};

const CommandPaletteContent = ({ onClose }: { onClose: () => void }) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const actions: Action[] = useMemo(
    () => [
      { id: "home", label: "Home", icon: Hash, perform: () => { if (window.location.pathname !== "/") window.location.href = "/"; else window.scrollTo({ top: 0, behavior: "smooth" }); onClose(); }, group: "Navigate" },
      { id: "about", label: "About", icon: Sparkles, perform: () => { scrollToId("about"); onClose(); }, group: "Navigate" },
      { id: "skills", label: "Skills", icon: Hash, perform: () => { scrollToId("skills"); onClose(); }, group: "Navigate" },
      { id: "projects", label: "Projects", icon: Hash, perform: () => { scrollToId("projects"); onClose(); }, group: "Navigate" },
      { id: "experience", label: "Experience", icon: Hash, perform: () => { scrollToId("experience"); onClose(); }, group: "Navigate" },
      { id: "education", label: "Education", icon: Hash, perform: () => { scrollToId("education"); onClose(); }, group: "Navigate" },
      { id: "blog", label: "Blog", icon: ArrowUpRight, perform: () => { window.location.href = "/blog"; onClose(); }, group: "Navigate" },
      { id: "achievements", label: "Achievements", icon: ArrowUpRight, perform: () => { window.location.href = "/achievements"; onClose(); }, group: "Navigate" },
      { id: "contact", label: "Contact", icon: ArrowUpRight, perform: () => { window.location.href = "/contact"; onClose(); }, group: "Navigate" },
      { id: "resume", label: "View resume", description: "Open my resume PDF in a new tab", icon: FileText, perform: () => { window.open("/Resume.pdf", "_blank"); onClose(); }, group: "Actions" },
      { id: "github", label: "GitHub", description: "github.com/devadvancer", icon: Github, perform: () => { window.open("https://github.com/devadvancer", "_blank"); onClose(); }, group: "External" },
      { id: "linkedin", label: "LinkedIn", description: "linkedin.com/in/abhirupkumar", icon: Linkedin, perform: () => { window.open("https://linkedin.com/in/abhirupkumar", "_blank"); onClose(); }, group: "External" },
      { id: "email", label: "Email me", description: "theabhirupkumar@gmail.com", icon: Mail, perform: () => { window.location.href = "mailto:theabhirupkumar@gmail.com"; onClose(); }, group: "External" },
    ],
    [onClose]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return actions;
    const q = query.toLowerCase();
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q) ||
        a.group.toLowerCase().includes(q)
    );
  }, [actions, query]);

  // Reset active index when filter changes — handled in the input change handler
  const handleQueryChange = (value: string) => {
    setQuery(value);
    setActiveIndex(0);
  };

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % Math.max(filtered.length, 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filtered.length) % Math.max(filtered.length, 1));
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (filtered[activeIndex]) {
          filtered[activeIndex].perform();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [filtered, activeIndex, onClose]);

  const grouped = useMemo(() => {
    const groups: Record<string, Action[]> = {};
    filtered.forEach((a) => {
      groups[a.group] = groups[a.group] || [];
      groups[a.group].push(a);
    });
    return groups;
  }, [filtered]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-24 sm:pt-32 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-background/70 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Dialog */}
      <motion.div
        role="dialog"
        aria-label="Command palette"
        className="relative w-full max-w-xl bg-card border border-border shadow-2xl shadow-primary/10 overflow-hidden"
        initial={{ opacity: 0, scale: 0.96, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 sm:px-5 py-4 border-b border-border">
          <CommandIcon size={18} className="text-primary" />
          <input
            autoFocus
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm sm:text-base"
          />
          <kbd className="px-1.5 py-0.5 bg-secondary/60 border border-border text-[10px] font-mono text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 sm:max-h-96 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-muted-foreground">
              No results for "{query}"
            </div>
          ) : (
            Object.entries(grouped).map(([groupName, items]) => (
              <div key={groupName} className="py-2">
                <p className="px-5 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                  {groupName}
                </p>
                {items.map((action) => {
                  const globalIndex = filtered.indexOf(action);
                  const isActive = globalIndex === activeIndex;
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => action.perform()}
                      onMouseEnter={() => setActiveIndex(globalIndex)}
                      className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                        isActive
                          ? "bg-primary/10 text-foreground"
                          : "text-muted-foreground hover:bg-secondary/40"
                      }`}
                    >
                      <Icon
                        size={16}
                        className={isActive ? "text-primary" : "text-muted-foreground"}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{action.label}</p>
                        {action.description && (
                          <p className="text-xs text-muted-foreground truncate">
                            {action.description}
                          </p>
                        )}
                      </div>
                      <ArrowUpRight size={14} className="text-muted-foreground" />
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hints */}
        <div className="flex items-center justify-between gap-4 px-4 sm:px-5 py-2.5 border-t border-border bg-secondary/30 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-background border border-border font-mono">↑↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-background border border-border font-mono">↵</kbd>
            open
          </span>
          <span className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-background border border-border font-mono">esc</kbd>
            close
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CommandPalette;
