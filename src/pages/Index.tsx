import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import ParallaxSection from "@/components/ParallaxSection";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO />
      <Navigation />
      <main>
        <Hero />
        <ParallaxSection
          speed={0.15}
          backgroundElement={
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          }
        >
          <About />
        </ParallaxSection>
        <ParallaxSection
          speed={0.2}
          backgroundElement={
            <div className="absolute inset-0">
              <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
            </div>
          }
        >
          <Skills />
        </ParallaxSection>
        <Projects />
        <ParallaxSection
          speed={0.15}
          backgroundElement={
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
          }
        >
          <Experience />
        </ParallaxSection>
        <ParallaxSection
          speed={0.1}
          backgroundElement={
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
            </div>
          }
        >
          <Education />
        </ParallaxSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
