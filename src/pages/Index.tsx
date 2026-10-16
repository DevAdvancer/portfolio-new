import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";

const Index = () => <div className="folio-home">
  <SEO title="Abhirup Kumar — Software Developer & Curious Mind" description="Software, systems, and the little details in between. Explore Abhirup Kumar’s selected projects, experience, and experiments." keywords="Abhirup Kumar, software engineer, full stack developer, React, TypeScript, Kolkata" type="profile" />
  <StructuredData /><Navigation />
  <main id="main-content" tabIndex={-1}><Hero /><Projects /><About /><Journey /><Achievements /></main>
  <Footer />
</div>;
export default Index;
