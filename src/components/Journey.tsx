import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const Journey = () => <section id="experience" className="folio-section folio-shell journey-section">
  <ScrollReveal><div className="section-heading"><div><p className="folio-kicker"><span>03 /</span> ALONG THE WAY</p><h2>Always a <span className="serif-italic">student.</span></h2></div><a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="folio-text-link">The full résumé <ArrowUpRight size={14} /></a></div></ScrollReveal>
  <div className="journey-list">
    <ScrollReveal><article className="journey-row"><p className="folio-mono">2026 — PRESENT</p><div><h3>Software Developer <span className="journey-current">CURRENT</span></h3><p>Vizva Consultancy Services</p></div><p className="journey-description">Internal tools, web platforms, and workflows that make everyday work easier.</p></article></ScrollReveal>
    <ScrollReveal><article className="journey-row"><p className="folio-mono">MAY — DEC 2025</p><div><h3>Lead Software Developer</h3><p>HERMEiAS <span className="journey-type">/ Internship</span></p></div><p className="journey-description">Leading frontend development. Building reusable interfaces and bringing products together.</p></article></ScrollReveal>
    <ScrollReveal><article id="education" className="journey-row"><p className="folio-mono">2022 — 2026</p><div><h3>B.Tech, Computer Science</h3><p>Adamas University</p></div><p className="journey-description">A foundation in algorithms, operating systems, networks, and asking better questions.</p></article></ScrollReveal>
  </div>
</section>;
export default Journey;
