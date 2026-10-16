import { useState } from "react";
import { ArrowDown, ArrowUpRight, Github, Minus, Plus } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import ScrollReveal from "@/components/ScrollReveal";

const descriptions: Record<string, { name: string; category: string; description: string }> = {
  "1": { name: "Kernel attestation", category: "SYSTEMS / SECURITY", description: "Trust, verified. A distributed system that checks Linux kernel integrity in real time." },
  "4": { name: "Formethica", category: "AI / FULL STACK", description: "From an idea to a form. AI-assisted creation with submissions, analytics, and export." },
  "7": { name: "Nexterm", category: "DEVELOPER TOOLS / RUST", description: "A terminal with a second brain. Bringing context-aware AI into the command line." },
};
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const display = descriptions[project.id];
  return <ScrollReveal delay={index * 60}>
    <article className={`work-card work-card-${project.id}`}>
      <a className={`work-image ${project.id === "7" ? "work-image-terminal" : ""}`} href={project.liveUrl || project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`}>
        <div className="work-image-top"><span>{String(index + 1).padStart(2, "0")} / SELECTED PROJECT</span><ArrowUpRight size={17} /></div>
        <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
        <span className="work-image-tag">{project.liveUrl ? "VIEW LIVE PROJECT" : "EXPLORE THE CODE"} <ArrowUpRight size={12} /></span>
      </a>
      <div className="work-info"><p className="folio-mono work-category">{display?.category || project.techStack.slice(0, 2).join(" / ").toUpperCase()}</p><h3>{display?.name || project.title}</h3><p className="work-description">{display?.description || project.problem}</p><div className="work-stack">{project.techStack.slice(0, 3).map(tech => <span key={tech}>{tech}</span>)}</div>
        <div className="work-links"><a href={project.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={14} /> Source</a><button onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls={`project-${project.id}`}>The details {expanded ? <Minus size={14} /> : <Plus size={14} />}</button></div>
        {expanded && <div id={`project-${project.id}`} className="work-details"><p>{project.role}</p><ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>{project.reportUrl && <a href={project.reportUrl} target="_blank" rel="noopener noreferrer">Read project report <ArrowUpRight size={13} /></a>}</div>}
      </div>
    </article>
  </ScrollReveal>;
};
const Projects = () => {
  const [all, setAll] = useState(false);
  const featured = ["4", "1", "7"].map(id => projects.find(project => project.id === id)!);
  const visible = all ? [...featured, ...projects.filter(project => !["4", "1", "7"].includes(project.id))] : featured;
  return <section id="projects" className="folio-section folio-shell">
    <ScrollReveal><div className="section-heading"><div><p className="folio-kicker"><span>01 /</span> OUT OF MY HEAD, INTO THE WORLD</p><h2>A few things<br /><span className="serif-italic">I’ve made.</span></h2></div><p>Some practical. Some a little ambitious.<br />All built because I wanted to figure something out.</p></div></ScrollReveal>
    <div className="work-grid">{visible.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
    <button className="all-work-button" onClick={() => setAll(!all)} aria-expanded={all}>{all ? "Back to selected work" : `There’s more in the workshop (${projects.length - featured.length})`}{all ? <Minus size={15} /> : <ArrowDown size={15} />}</button>
  </section>;
};
export default Projects;
