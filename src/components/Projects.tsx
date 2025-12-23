import { useState, useMemo } from "react";
import { Github, ExternalLink, Search, X, Info } from "lucide-react";
import { projects } from "@/data/projects";
import ScrollReveal from "./ScrollReveal";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
    <section id="projects" className="py-16 sm:py-24 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4">
              Featured Work
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Projects
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              A selection of projects that demonstrate my technical abilities and problem-solving approach.
            </p>

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
                  className="w-full pl-10 pr-10 py-2.5 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Tech Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTech(null)}
                  className={`text-xs px-3 py-1.5 border transition-all duration-300 ${
                    selectedTech === null
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  All
                </button>
                {allTechStack.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setSelectedTech(tech === selectedTech ? null : tech)}
                    className={`text-xs px-3 py-1.5 border transition-all duration-300 ${
                      selectedTech === tech
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-transparent border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>

              {/* Active filters indicator */}
              {(searchQuery || selectedTech) && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>
                    Showing {filteredProjects.length} of {projects.length} projects
                  </span>
                  <button
                    onClick={clearFilters}
                    className="text-primary hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Projects Grid */}
          <div className="space-y-20">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="animate-fade-in"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <ScrollReveal delay={100}>
                    <article
                      className={`grid md:grid-cols-2 gap-8 items-center ${
                        index % 2 === 1 ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <div className={index % 2 === 1 ? "md:order-2" : ""}>
                        <div className="aspect-video overflow-hidden bg-secondary/30 border border-border group">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      </div>

                      <div className={index % 2 === 1 ? "md:order-1" : ""}>
                        <HoverCard openDelay={200} closeDelay={100}>
                          <HoverCardTrigger asChild>
                            <h3 className="font-serif text-2xl text-foreground mb-3 cursor-pointer inline-flex items-center gap-2 hover:text-primary transition-colors">
                              {project.title}
                              <Info size={16} className="text-muted-foreground" />
                            </h3>
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
                                <p className="text-xs uppercase tracking-widest text-primary mb-1">All Features</p>
                                <ul className="text-xs text-muted-foreground space-y-0.5">
                                  {project.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-1">
                                      <span className="text-primary mt-0.5">•</span>
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-xs uppercase tracking-widest text-primary mb-1">My Role</p>
                                <p className="text-xs text-muted-foreground">{project.role}</p>
                              </div>
                              <div className="pt-2 border-t border-border flex gap-3">
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-foreground hover:text-primary transition-colors flex items-center gap-1"
                                >
                                  <Github size={12} />
                                  GitHub
                                </a>
                                {project.liveUrl && (
                                  <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-foreground hover:text-primary transition-colors flex items-center gap-1"
                                  >
                                    <ExternalLink size={12} />
                                    Live Demo
                                  </a>
                                )}
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                        <p className="text-sm text-muted-foreground mb-4">
                          {project.problem}
                        </p>

                        <div className="mb-4">
                          <p className="text-xs uppercase tracking-widest text-primary mb-2">
                            Tech Stack
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                onClick={() => setSelectedTech(tech)}
                                className={`text-xs px-2 py-1 border cursor-pointer transition-all ${
                                  selectedTech === tech
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-secondary/50 border-border text-foreground hover:border-primary"
                                }`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs uppercase tracking-widest text-primary mb-2">
                            Key Features
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {project.features.slice(0, 3).map((feature) => (
                              <li key={feature}>• {feature}</li>
                            ))}
                          </ul>
                        </div>

                        <p className="text-xs text-muted-foreground mb-6 italic">
                          {project.role}
                        </p>

                        <div className="flex gap-4">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors group"
                          >
                            <Github size={16} className="group-hover:rotate-12 transition-transform" />
                            View Code
                          </a>
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors group"
                            >
                              <ExternalLink size={16} className="group-hover:rotate-12 transition-transform" />
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  </ScrollReveal>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No projects found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="text-primary hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
