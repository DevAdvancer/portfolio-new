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
import StructuredData from "@/components/StructuredData";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <SEO
        title="Abhirup Kumar — Software Engineer & Full Stack Developer"
        description="Abhirup Kumar is a Software Engineer, Full Stack Developer, and Computer Science student at Adamas University, Kolkata. He builds scalable web applications using React, TypeScript, and Node.js."
        keywords="Abhirup Kumar, software engineer, full stack developer, React, TypeScript, Kolkata, Adamas University"
        type="profile"
      />
      <StructuredData />
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        <Hero />

        <ValueProposition />
        <TechTicker />
        <About />

        <div className="container mx-auto px-4 sm:px-6">
          <div className="section-divider max-w-4xl mx-auto" />
        </div>

        <Skills />
        <Projects />
        <ManifestoBand />
        <Experience />

        <div className="container mx-auto px-4 sm:px-6">
          <div className="section-divider max-w-4xl mx-auto" />
        </div>

        <Education />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
