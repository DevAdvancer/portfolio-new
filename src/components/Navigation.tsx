import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import BrandMark from "@/components/BrandMark";

const links = [{ name: "Work", href: "/#projects" }, { name: "About", href: "/#about" }, { name: "Achievements", href: "/#achievements" }, { name: "Journal", href: "/blog" }];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (location.hash) {
      const frame = requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "smooth" }));
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault(); setOpen(false);
        window.dispatchEvent(new CustomEvent("abhirup:open-command"));
      }
      if (event.key === "Escape" && open) { setOpen(false); toggleRef.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node) && !toggleRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", handler); window.addEventListener("pointerdown", outside);
    return () => { window.removeEventListener("keydown", handler); window.removeEventListener("pointerdown", outside); };
  }, [open]);
  return (
    <header className="folio-navigation">
      <nav className="folio-shell nav-inner" aria-label="Main navigation">
        <Link to="/" className="folio-wordmark" aria-label="Abhirup Kumar home"><BrandMark /><span className="wordmark-name">Abhirup Kumar</span></Link>
        <div className="nav-desktop">
          {links.map(link => <Link key={link.name} to={link.href} className="nav-link">{link.name}</Link>)}
          <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="nav-link">Résumé <ArrowUpRight size={13} /></a>
          <Link to="/contact" className="nav-contact">Let’s talk <span className="status-dot" /></Link>
        </div>
        <button ref={toggleRef} className="nav-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
        {open && <div ref={menuRef} id="mobile-navigation" className="nav-mobile">{[...links, { name: "Experience", href: "/#experience" }, { name: "Contact", href: "/contact" }].map(link => <Link key={link.name} to={link.href} onClick={() => setOpen(false)}>{link.name}<ArrowUpRight size={16} /></Link>)}<a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Résumé <ArrowUpRight size={16} /></a></div>}
      </nav>
    </header>
  );
};
export default Navigation;
