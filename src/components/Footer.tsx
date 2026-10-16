import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useExploration } from "@/hooks/use-exploration";
import BrandMark from "@/components/BrandMark";

const Footer = () => {
  const { discover, step } = useExploration();
  return <footer className="folio-footer"><div className="folio-shell">
    <div className="footer-invitation"><div><p className="folio-kicker"><span>05 /</span> GOOD THINGS START WITH A CONVERSATION</p><h2>Your idea.<br /><span className="serif-italic">My open tabs.</span></h2><p>Something to build, a question, or just a hello. I’m all ears.</p></div><Link to="/contact" className="footer-cta" aria-label="Let’s talk about your idea"><ArrowUpRight strokeWidth={1} /></Link></div>
    <div className="footer-links-row"><Link to="/" className="footer-brand" aria-label="Abhirup Kumar home"><BrandMark /><span>Abhirup Kumar<small>Curious by default.</small></span></Link><div className="footer-socials"><a href="mailto:theabhirupkumar@gmail.com">Email <ArrowUpRight size={13} /></a><a href="https://github.com/devadvancer" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={13} /></a><a href="https://linkedin.com/in/abhirupkumar" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={13} /></a><Link to="/blog">Journal <ArrowUpRight size={13} /></Link></div></div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Abhirup Kumar</p><p>Made with intent. Still a work in progress.</p><button className={`footer-footnote ${step >= 2 ? "has-signal" : ""}`} onClick={() => discover(2)} aria-label="Inspect the final footnote" title="There is usually more to a story.">[{step >= 3 ? "~" : "·"}]</button><a href="#top" onClick={event => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>BACK TO TOP ↑</a></div>
  </div></footer>;
};
export default Footer;
