import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Guestbook from "@/components/Guestbook";
import CommandPalette from "@/components/CommandPalette";

const Index = () => {
  return (
    <div className="min-h-screen bg-background bg-grid">
      <CommandPalette />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Stats />
      <Guestbook />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
