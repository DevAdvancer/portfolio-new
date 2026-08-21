import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, ExternalLink, Search, X, Info, FileText } from "lucide-react";
import { projects } from "@/data/projects";
import ScrollReveal from "./ScrollReveal";
import SectionHeader from "./SectionHeader";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { fadeUp, hoverLift, pressDown, smoothTransition } from "@/lib/motion";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Get all unique tech stack items
  const allTechStack = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      project.techStack.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesTech =
        selectedTech === null || project.techStack.includes(selectedTech);

      return matchesSearch && matchesTech;
    });
  }, [searchQuery, selectedTech]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTech(null);
  };

  return (
    <section id="projects" className="accent-violet py-16 sm:py-24 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            index={3}
            kicker="Featured Work"
            title="Projects"
            intro="A selection of projects that demonstrate my technical abilities and problem-solving approach."
            className="mb-8"
          />

          <ScrollReveal>
            {/* Search and Filter */}
            <div className="mb-12 space-y-4">
              {/* Search Input */}
              <div className="relative max-w-md">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-section transition-colors"
                />
                {searchQuery && (
                  <motion.button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    whileTap={pressDown}
                  >
                    <X size={16} />
                  </motion.button>
                )}
              </div>

              {/* Tech Filter */}
              <div className="flex flex-wrap gap-2">
                <motion.button
                  onClick={() => setSelectedTech(null)}
                  className={`text-xs px-3 py-1.5 border transition-all duration-300 ${
                    selectedTech === null
                      ? "bg-section text-background border-section"
                      : "bg-transparent border-border text-muted-foreground hover:border-section hover:text-section"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={pressDown}
                >
                  All
                </motion.button>
                {allTechStack.map((tech) => (
                  <motion.button
                    key={tech}
                    onClick={() => setSelectedTech(tech === selectedTech ? null : tech)}
                    className={`text-xs px-3 py-1.5 border transition-all duration-300 ${
                      selectedTech === tech
                        ? "bg-section text-background border-section"
                        : "bg-transparent border-border text-muted-foreground hover:border-section hover:text-section"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={pressDown}
                  >
                    {tech}
                  </motion.button>
                ))}
              </div>

              {/* Active filters indicator */}
              {(searchQuery || selectedTech) && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>
                    Showing {filteredProjects.length} of {projects.length} projects
                  </span>
                  <motion.button
                    onClick={clearFilters}
                    className="text-section hover:underline"
                    whileTap={pressDown}
                  >
                    Clear filters
                  </motion.button>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Projects Grid */}
          <div className="space-y-20">
            {filteredProjects.length > 0 ? (
              <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={fadeUp(index * 0.05)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  exit={{ opacity: 0, y: 24, transition: smoothTransition }}
                >
                  <motion.article
                    className={`grid md:grid-cols-2 gap-8 items-center ${
                      index % 2 === 1 ? "md:flex-row-reverse" : ""
                    }`}
                    whileHover={{ y: -4 }}
                    transition={smoothTransition}
                  >
                      <div className={index % 2 === 1 ? "md:order-2" : ""}>
                        <motion.div
                          className="aspect-video overflow-hidden bg-secondary/30 border border-border group"
                          whileHover={{ scale: 1.015 }}
                          transition={smoothTransition}
                        >
                          <motion.img
                            src={project.image}
                            alt={project.title}
                            width={1600}
                            height={900}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            whileHover={{ scale: 1.07 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </motion.div>
                      </div>

                      <div className={index % 2 === 1 ? "md:order-1" : ""}>
                        <HoverCard openDelay={200} closeDelay={100}>
                          <HoverCardTrigger asChild>
                            <motion.h3
                              className="font-serif text-xl sm:text-2xl text-foreground mb-3 cursor-pointer inline-flex items-center gap-2 hover:text-section transition-colors"
                              whileHover={{ x: 4 }}
                            >
                              {project.title}
                              <motion.span whileHover={{ rotate: 18, scale: 1.12 }}>
                                <Info size={16} className="text-muted-foreground" />
                              </motion.span>
                            </motion.h3>
                          </HoverCardTrigger>
                          <HoverCardContent 
                            className="w-80 bg-card border-border shadow-xl animate-scale-in"
                            side="top"
                            align="start"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  className="w-16 h-12 object-cover rounded border border-border"
                                />
                                <div>
                                  <h4 className="font-semibold text-foreground">{project.title}</h4>
                                  <p className="text-xs text-muted-foreground">{project.techStack.length} technologies</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-xs uppercase tracking-widest text-section mb-1">All Features</p>
                                <ul className="text-xs text-muted-foreground space-y-0.5">
                                  {project.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-1">
                                      <span className="text-section mt-0.5">•</span>
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-xs uppercase tracking-widest text-section mb-1">My Role</p>
                                <p className="text-xs text-muted-foreground">{project.role}</p>
                              </div>
                              <div className="pt-2 border-t border-border flex gap-3">
                                <motion.a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-foreground hover:text-section transition-colors flex items-center gap-1"
                                  whileHover={{ x: 3 }}
                                  whileTap={pressDown}
                                >
                                  <Github size={12} />
                                  GitHub
                                </motion.a>
                                {project.liveUrl && (
                                  <motion.a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-foreground hover:text-section transition-colors flex items-center gap-1"
                                    whileHover={{ x: 3 }}
                                    whileTap={pressDown}
                                  >
                                    <ExternalLink size={12} />
                                    Live Demo
                                  </motion.a>
                                )}
                                {project.reportUrl && (
                                  <motion.a
                                    href={project.reportUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-foreground hover:text-section transition-colors flex items-center gap-1"
                                    whileHover={{ x: 3 }}
                                    whileTap={pressDown}
                                  >
                                    <FileText size={12} />
                                    View Report
                                  </motion.a>
                                )}
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                        <p className="text-sm text-muted-foreground mb-4">
                          {project.problem}
                        </p>

                        <div className="mb-4">
                          <p className="text-xs uppercase tracking-widest text-section mb-2">
                            Tech Stack
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                              <motion.button
                                key={tech}
                                onClick={() => setSelectedTech(tech)}
                                className={`text-xs px-2 py-1 border cursor-pointer transition-all ${
                                  selectedTech === tech
                                    ? "bg-section text-background border-section"
                                    : "bg-secondary/50 border-border text-foreground hover:border-section"
                                }`}
                                whileHover={{ y: -2 }}
                                whileTap={pressDown}
                              >
                                {tech}
                              </motion.button>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs uppercase tracking-widest text-section mb-2">
                            Key Features
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {project.features.slice(0, 3).map((feature) => (
                              <li key={feature}>• {feature}</li>
                            ))}
                          </ul>
                          {project.features.length > 3 && (
                            <details className="mt-2">
                              <summary className="text-xs text-section cursor-pointer hover:underline list-none [&::-webkit-details-marker]:hidden">
                                + {project.features.length - 3} more
                              </summary>
                              <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                                {project.features.slice(3).map((feature) => (
                                  <li key={feature}>• {feature}</li>
                                ))}
                              </ul>
                            </details>
                          )}
                        </div>

                        <p className="text-xs text-muted-foreground mb-6 italic">
                          {project.role}
                        </p>

                        <div className="flex flex-wrap gap-3 sm:gap-4">
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-foreground hover:text-section transition-colors group"
                            whileHover={hoverLift}
                            whileTap={pressDown}
                          >
                            <Github size={16} className="group-hover:rotate-12 transition-transform" />
                            View Code
                          </motion.a>
                          {project.liveUrl && (
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-section transition-colors group"
                              whileHover={hoverLift}
                              whileTap={pressDown}
                            >
                              <ExternalLink size={16} className="group-hover:rotate-12 transition-transform" />
                              Live Demo
                            </motion.a>
                          )}
                          {project.reportUrl && (
                            <motion.a
                              href={project.reportUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-section transition-colors group"
                              whileHover={hoverLift}
                              whileTap={pressDown}
                            >
                              <FileText size={16} className="group-hover:rotate-12 transition-transform" />
                              View Report
                            </motion.a>
                          )}
                        </div>
                      </div>
                  </motion.article>
                </motion.div>
              ))}
              </AnimatePresence>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No projects found matching your criteria.</p>
                <motion.button
                  onClick={clearFilters}
                  className="text-section hover:underline"
                  whileTap={pressDown}
                >
                  Clear filters
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
