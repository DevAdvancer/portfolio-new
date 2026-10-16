import { useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useExploration } from "@/hooks/use-exploration";

const thoughts = [
  { label: "interfaces", title: "Good software should feel simple.", text: "I like the part where a complicated idea becomes something anyone can use." },
  { label: "systems", title: "Then I look under the hood.", text: "From web applications to the Linux kernel. I want to know why it works." },
  { label: "experiments", title: "There’s usually a side project.", text: "AI tools, small experiments, and the occasional idea that refuses to stay in a notebook." },
  { label: "play", title: "Code saved. Coffee poured. Game on.", text: "I’m a coder and a gamer. Coffee is very much part of the setup. The rest of my off-duty story is still being written." },
];

const DeskDrawing = ({ active }: { active: number }) => (
  <svg key={active} viewBox="0 0 280 170" fill="none" aria-hidden="true" className="desk-drawing">
    <rect x="45" y="17" width="190" height="128" rx="7" fill="hsl(var(--paper))" stroke="currentColor" strokeWidth="2" />
    <path d="M45 39H235" stroke="currentColor" strokeWidth="2" />
    <circle cx="58" cy="29" r="3" fill="hsl(var(--orange))" /><circle cx="68" cy="29" r="3" fill="hsl(var(--yellow))" /><circle cx="78" cy="29" r="3" fill="hsl(var(--sage))" />
    {active === 0 && <><rect x="60" y="53" width="68" height="75" rx="3" fill="hsl(var(--orange))" /><path d="M76 71H111M76 80H101" stroke="hsl(var(--paper))" strokeWidth="3" /><rect x="143" y="55" width="76" height="24" rx="3" fill="hsl(var(--yellow))" /><path d="M145 95H211M145 106H201M145 118H185" stroke="currentColor" strokeWidth="3" /></>}
    {active === 1 && <><path d="M93 73L186 73L140 118Z" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" /><circle cx="93" cy="73" r="17" fill="hsl(var(--orange))" stroke="currentColor" strokeWidth="2" /><circle cx="186" cy="73" r="17" fill="hsl(var(--yellow))" stroke="currentColor" strokeWidth="2" /><circle cx="140" cy="118" r="17" fill="hsl(var(--sage))" stroke="currentColor" strokeWidth="2" /></>}
    {active === 2 && <><path d="M118 56V83L96 119Q91 130 104 130H176Q189 130 184 119L162 83V56M111 56H169" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /><path d="M111 105H169L179 123H102Z" fill="hsl(var(--orange))" /><circle cx="137" cy="103" r="5" fill="hsl(var(--yellow))" /><circle cx="150" cy="84" r="5" fill="hsl(var(--sage))" /></>}
    {active === 3 && <><path d="M91 79H148Q162 79 168 94L176 116Q179 128 169 128Q163 128 151 115H89Q77 128 71 128Q61 128 64 116L72 94Q78 79 91 79Z" fill="hsl(var(--sage))" stroke="currentColor" strokeWidth="2" /><path d="M88 91V109M79 100H97" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /><circle cx="145" cy="95" r="4" fill="hsl(var(--orange))" /><circle cx="155" cy="105" r="4" fill="hsl(var(--orange))" /><path d="M184 70H211V99Q211 111 198 111Q184 111 184 99ZM211 76H217Q228 87 211 94" fill="hsl(var(--yellow))" stroke="currentColor" strokeWidth="2" /><path d="M190 62Q196 56 190 50M201 62Q207 56 201 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>}
    <path d="M28 153Q138 163 252 152" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 66L28 69M25 51L32 60M253 105L266 101" stroke="hsl(var(--orange))" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const Hero = () => {
  const [active, setActive] = useState(0);
  const [aside, setAside] = useState(false);
  const { discover, step } = useExploration();
  return <section id="hero" className="folio-hero folio-shell">
    <div className="hero-eyebrow"><span>SOFTWARE DEVELOPER · GAMER · COFFEE PERSON</span><span>KOLKATA, INDIA ↗</span></div>
    <div className="hero-layout">
      <div className="hero-copy">
        <p className="hero-intro">Hello, internet. I’m</p>
        <h1><span className="name-first">Abhirup</span><span className="name-last">Kumar<button className="hero-period" aria-label="Read the fine print" aria-expanded={aside} onClick={() => setAside(!aside)}>.</button></span></h1>
        <p className="hero-role">Coder. Gamer.<br /><span>Powered by coffee.</span></p>
        {aside && <p className="hero-fine-print" role="status">Including: why is one little mark wandering off the paper?</p>}
      </div>
      <div className="desk-composition">
        <svg className="hero-flower" viewBox="0 0 120 120" fill="none" aria-hidden="true"><path d="M60 4C74 4 71 24 81 28C91 32 102 14 112 25C122 36 101 45 101 58C101 70 122 79 112 90C101 101 91 82 81 87C70 93 75 114 60 114C45 114 50 94 38 89C26 84 17 104 7 93C-3 82 19 71 19 59C19 47-2 38 8 27C18 16 28 34 39 28C50 22 46 4 60 4Z" fill="currentColor" /><circle cx="60" cy="59" r="16" fill="hsl(var(--paper))" /><circle cx="56" cy="57" r="2" fill="currentColor" /><circle cx="65" cy="57" r="2" fill="currentColor" /><path d="M55 63Q60 69 66 63" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        <p className="desk-handwriting">a few things on my mind <span>↙</span></p>
        <div className={`desk-paper desk-paper-${active}`}>
          <div className="desk-paper-top"><span>NOTES FROM MY DESK</span><span>0{active + 1} / 0{thoughts.length}</span></div>
          <DeskDrawing active={active} />
          <div className="desk-caption" aria-live="polite"><h2>{thoughts[active].title}</h2><p>{thoughts[active].text}</p></div>
          <div className="desk-controls">{thoughts.map((thought, index) => <button key={thought.label} onClick={() => setActive(index)} aria-pressed={active === index} aria-label={`Explore ${thought.label}`} className={active === index ? "is-active" : ""}>{thought.label}<span>↗</span></button>)}</div>
          <button className={`orbit-anomaly ${step > 0 ? "is-found" : ""}`} onClick={() => discover(0)} aria-label="Inspect the small anomaly" title="A small mark that wandered off the page.">✳</button>
        </div>
        <div className="desk-sticker"><span>COFFEE IN.</span><strong>code out.<br />game on.</strong><span>ONE MORE CUP. ONE MORE QUEST.</span></div>
      </div>
    </div>
    <div className="hero-bottom"><p>Code, coffee, and the occasional side quest.<br /><span>A little corner of the internet that feels like me.</span></p><a href="#projects" className="folio-button">Come see what I make <ArrowDown size={18} /></a><Link to="/contact" className="hero-contact">Or just say hello <ArrowUpRight size={17} /></Link></div>
    <div className="hero-page-note"><span>KEEP SCROLLING. STAY CURIOUS.</span><span>PERSONAL PORTFOLIO — 2026</span></div>
  </section>;
};
export default Hero;
