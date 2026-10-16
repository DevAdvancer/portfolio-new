import { ArrowUpRight, Award, ShieldCheck, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { achievements } from "@/data/achievements";

const symbols = { certification: ShieldCheck, award: Award, competition: Trophy };
const labels = { certification: "Certificate", award: "Recognition", competition: "Challenge" };

const Achievements = () => <section id="achievements" className="folio-section folio-shell milestones-section">
  <ScrollReveal><div className="section-heading"><div><p className="folio-kicker"><span>04 /</span> A FEW CHECKPOINTS</p><h2>Still learning.<br /><span className="serif-italic">Here’s the proof.</span></h2></div><p>Certificates, challenges, and a little recognition<br />picked up along the way.</p></div></ScrollReveal>
  <div className="milestones-grid">{achievements.map((achievement, index) => {
    const Icon = symbols[achievement.type];
    return <ScrollReveal key={`${achievement.issuer}-${achievement.title}`} delay={(index % 2) * 70}>
      <article className={`milestone-entry milestone-${achievement.type}`}>
        <span className="milestone-symbol"><Icon size={23} strokeWidth={1.5} /></span>
        <div><p className="milestone-meta">{achievement.issuer} <span>· {achievement.date} / {labels[achievement.type]}</span></p><h3>{achievement.title}</h3>{achievement.description && <p className="milestone-description">{achievement.description}</p>}{achievement.link && <a className="milestone-credential" href={achievement.link} target="_blank" rel="noopener noreferrer" aria-label={`View credential: ${achievement.title}`}>View credential <ArrowUpRight size={13} /></a>}</div>
      </article>
    </ScrollReveal>;
  })}</div>
  <Link to="/achievements" className="all-work-button">All achievements & credentials <ArrowUpRight size={16} /></Link>
</section>;

export default Achievements;
