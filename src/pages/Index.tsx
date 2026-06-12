import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ValueProposition from "@/components/ValueProposition";
import TechTicker from "@/components/TechTicker";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import ManifestoBand from "@/components/ManifestoBand";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <SEO />
      <Navigation />
      <main>
        <Hero />

        {/* For recruiters — the "why me" differentiators */}
        <ValueProposition />

        {/* Tech stack ticker — recurs between sections for scrollytelling rhythm */}
        <TechTicker />

        <About />

        <Skills />

        <Projects />

        {/* Scrollytelling band — signature manifesto */}
        <ManifestoBand />

        <Experience />

        <Education />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
