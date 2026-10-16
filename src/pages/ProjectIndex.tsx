import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ProjectCard } from "@/components/Projects";
import { projects } from "@/data/projects";

const ProjectIndex = () => <div>
  <Navigation />
  <main id="main-content" tabIndex={-1} className="folio-shell project-page">
    <nav aria-label="Breadcrumb" className="project-breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Projects</span></nav>
    <header className="project-page-heading"><p className="folio-kicker">THE FULL WORKSHOP</p><h1>Built from <span className="serif-italic">curiosity.</span></h1><p>Web apps, AI tools, and the systems underneath. Here’s what I made, what went into it, and where you can explore the code.</p></header>
    <div className="work-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
  </main>
  <Footer />
</div>;
export default ProjectIndex;
