import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { useExploration } from "@/hooks/use-exploration";
import { profile } from "@/data/profile";

const About = () => {
  const { discover, step } = useExploration();
  return <section id="about" className="about-section"><div className="folio-section folio-shell">
    <ScrollReveal><p className="folio-kicker"><span>02 /</span> THE PERSON BEHIND THE PIXELS</p></ScrollReveal>
    <div className="about-layout">
      <ScrollReveal><h2>Small-town roots.<br /><span className="serif-italic">Wide-open tabs.</span><button className={`story-mark ${step >= 2 ? "is-found" : ""}`} aria-label="Read the story footnote" onClick={() => discover(1)}>✳</button></h2><p className="about-side-note folio-mono">TARAKESWAR ROOTS.<br />{profile.city.toUpperCase()} CHAPTER.</p></ScrollReveal>
      <ScrollReveal delay={100}><div className="about-prose"><p>I’m Abhirup, a software developer based in {profile.city}. I grew up in Tarakeswar, near Kolkata. I started by taking things apart to understand them. These days, I build things to understand what’s possible.</p><p>I’m also a <span>gamer</span>, and I take my <span>coffee</span> very seriously. This little website has a few side quests of its own.</p><p>My work moves between web applications, AI tools, and the systems underneath. I care about clean architecture and the person on the other side of the screen.</p><p>I build internal tools and web platforms at <span>Vizva Consultancy Services</span>. I graduated from <span>{profile.university}</span> with a {profile.degree}.</p></div><div className="about-links"><a href="https://github.com/DevAdvancer" target="_blank" rel="noopener noreferrer">Around the internet <ArrowUpRight size={14} /></a><Link to="/achievements">A few milestones <ArrowUpRight size={14} /></Link></div></ScrollReveal>
    </div>
    <div id="skills" className="toolbox"><p className="folio-mono">TOOLS I REACH FOR</p><div>{profile.skills.map(tool => <span key={tool}>{tool}</span>)}</div></div>
  </div></section>;
};
export default About;
