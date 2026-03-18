import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const navLinks = ["About", "Experience", "Projects", "Skills", "Contact"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ratioMap = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          ratioMap.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        });
        // Pick the section with the highest intersection ratio
        let best = "";
        let bestRatio = 0;
        ratioMap.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) setActiveSection(best);
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6], rootMargin: "-80px 0px -20% 0px" }
    );
    navLinks.forEach(link => {
      const el = document.getElementById(link.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }} animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/90 shadow-sm backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}>
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-heading text-xl font-bold tracking-tight">
          <span className="text-gradient">Rakha</span>
          <span className="text-muted-foreground/50">.</span>
        </button>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.toLowerCase();
            return (
              <li key={link}>
                <button onClick={() => scrollTo(link)}
                  className={`group px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg flex items-center justify-center ${isActive ? "text-[hsl(250_84%_50%)] dark:text-[hsl(250_84%_60%)]" : "text-muted-foreground hover:text-foreground"}`}>
                  <span className="relative">
                    {link}
                    {isActive ? (
                      <motion.div layoutId="navIndicator"
                        className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
                        style={{ background: "linear-gradient(90deg, hsl(250 84% 60%), hsl(196 100% 47%))" }}
                      />
                    ) : (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary/20 rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0 group-hover:translate-x-0" />
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* CTA & Theme */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleTheme} aria-label="Toggle Theme" className="p-2 rounded-full hover:bg-muted text-foreground transition-colors">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:opacity-90"
            style={{ background: "linear-gradient(135deg, hsl(250 84% 60%), hsl(196 100% 47%))", boxShadow: "0 4px 16px hsl(250 84% 60% / 0.25)" }}
            onClick={() => scrollTo("Contact")}>
            Hire Me
          </button>
        </div>

        {/* Mobile toggle & Theme */}
        <div className="flex md:hidden items-center gap-4">
          <button onClick={toggleTheme} aria-label="Toggle Theme" className="p-2 text-foreground">
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button className="text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden border-t border-border bg-background"
            style={{ position: "relative", zIndex: 50 }}>
            <div className="px-4 py-5">
              {/* 2-column grid for nav links */}
              <div className="grid grid-cols-2 gap-1 mb-4">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.toLowerCase();
                  return (
                    <button key={link}
                      onClick={() => scrollTo(link)}
                      className={`rounded-xl py-3 px-4 text-sm font-medium text-center transition-all duration-200 ${isActive ? "text-[hsl(250_84%_50%)] dark:text-[hsl(250_84%_60%)] bg-[hsl(250_84%_60%/0.07)] border-[hsl(250_84%_60%/0.18)]" : "text-muted-foreground hover:text-foreground bg-transparent border-transparent"
                        }`}
                      style={{
                        borderWidth: isActive ? "1px" : "1px",
                        borderStyle: "solid",
                      }}>
                      {link}
                    </button>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="h-px mb-4" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border)), transparent)" }} />

              {/* Hire Me CTA - centered full width */}
              <button onClick={() => scrollTo("Contact")}
                className="w-full rounded-full py-3 text-sm font-semibold text-white transition-all duration-200 active:scale-95"
                style={{ background: "linear-gradient(135deg, hsl(250 84% 60%), hsl(196 100% 47%))", boxShadow: "0 4px 16px hsl(250 84% 60% / 0.25)" }}>
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
