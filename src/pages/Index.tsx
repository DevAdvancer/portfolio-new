import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import Achievements from "@/components/Achievements";
import Footer from "@/components/Footer";

const Index = () => <div className="folio-home">
  <Navigation />
  <main id="main-content" tabIndex={-1}><Hero /><Projects /><About /><Journey /><Achievements /></main>
  <Footer />
</div>;
export default Index;
