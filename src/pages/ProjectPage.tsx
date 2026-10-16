import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, Github } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import { projects } from "@/data/projects";
import { getProjectPath } from "@/data/seoConfig";

const ProjectPage = () => {
  const { slug } = useParams();
  const project = projects.find(project => getProjectPath(project) === `/projects/${slug}`);
  if (!project) return <NotFound />;
  return <div>
    <Navigation />
    <main id="main-content" tabIndex={-1} className="folio-shell project-page">
      <nav aria-label="Breadcrumb" className="project-breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/projects">Projects</Link><span aria-hidden="true">/</span><span aria-current="page">{project.title}</span></nav>
      <article>
        <header className="project-page-heading"><p className="folio-kicker">PROJECT NOTES / BY ABHIRUP KUMAR</p><h1>{project.title}</h1><p>{project.problem}</p><div className="project-page-links"><a className="folio-button" href={project.githubUrl} target="_blank" rel="noopener noreferrer"><Github size={16} /> Explore the code <ArrowUpRight size={16} /></a>{project.liveUrl && <a className="folio-text-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Try the project <ArrowUpRight size={16} /></a>}{project.reportUrl && <a className="folio-text-link" href={project.reportUrl} target="_blank" rel="noopener noreferrer">Read the report <ArrowUpRight size={16} /></a>}</div></header>
        <img className={`project-page-image ${project.id === "7" ? "project-page-terminal" : ""}`} src={project.image} alt={`${project.title} interface preview`} width={1200} height={750} />
        <div className="project-page-body"><section><p className="folio-kicker">MY PART</p><h2>What I worked on.</h2><p>{project.role}</p></section><section><p className="folio-kicker">THE TOOLBOX</p><h2>Built with.</h2><ul className="project-tech-list">{project.techStack.map(tech => <li key={tech}>{tech}</li>)}</ul></section><section><p className="folio-kicker">IN THE DETAILS</p><h2>What it does.</h2><ul className="project-feature-list">{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul></section></div>
      </article>
      <div className="project-next"><Link to="/projects" className="folio-text-link">Back to the workshop <ArrowUpRight size={16} /></Link><Link to="/contact" className="folio-text-link">Have something in mind? Let’s talk <ArrowUpRight size={16} /></Link></div>
    </main>
    <Footer />
  </div>;
};
export default ProjectPage;
