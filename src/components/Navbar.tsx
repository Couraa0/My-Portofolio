import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Toolbar } from "./Toolbar";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Experience", to: "/experience" },
  { label: "Projects", to: "/projects" },
  { label: "Achievements", to: "/achievements" },
  { label: "Contact", to: "/contact" },
];

interface NavbarProps {
  isPlaying: boolean;
  toggleAudio: () => void;
}

const Navbar = ({ isPlaying, toggleAudio }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { i18n, t } = useTranslation();
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onModalState = (e: any) => setModalOpen(e.detail);
    
    window.addEventListener("scroll", onScroll);
    window.addEventListener("modalState", onModalState);
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("modalState", onModalState);
    };
  }, []);

  // Scroll to top when navigating to a new page
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Handle hash navigation like /#skills
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  const isActive = (to: string) => {
    if (to.startsWith("/#")) return false; // hash links are never "active"
    return location.pathname === to;
  };

  const handleNavClick = (to: string) => {
    setMobileOpen(false);
    // If it's a hash link on the home page and we're already on home, scroll to element
    if (to.startsWith("/#") && location.pathname === "/") {
      const id = to.replace("/#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || modalOpen
          ? "bg-background/90 shadow-sm backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="font-heading text-xl font-bold tracking-tight"
        >
          <span className="text-gradient">Rakha</span>
          <span className="text-muted-foreground/50">.</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <li key={link.label}>
                <Link
                  to={link.to}
                  onClick={() => handleNavClick(link.to)}
                  className={`group px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg flex items-center justify-center ${
                    active
                      ? "text-[hsl(250_84%_50%)] dark:text-[hsl(250_84%_60%)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="relative">
                    {t(link.label)}
                    {active ? (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, hsl(250 84% 60%), hsl(196 100% 47%))",
                        }}
                      />
                    ) : (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary/20 rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0 group-hover:translate-x-0" />
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-4">
          <Toolbar isPlaying={isPlaying} toggleAudio={toggleAudio} />
        </div>

        {/* Mobile toggle & Theme */}
        <div className="flex md:hidden items-center gap-2">
          <button
            className="text-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
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
            style={{ position: "relative", zIndex: 50 }}
          >
            <div className="px-4 py-5">
              {/* 2-column grid for nav links */}
              <div className="grid grid-cols-2 gap-1 mb-4">
                {navLinks.map((link) => {
                  const active = isActive(link.to);
                  return (
                    <Link
                      key={link.label}
                      to={link.to}
                      onClick={() => handleNavClick(link.to)}
                      className={`rounded-xl py-3 px-4 text-sm font-medium text-center transition-all duration-200 ${
                        active
                          ? "text-[hsl(250_84%_50%)] dark:text-[hsl(250_84%_60%)] bg-[hsl(250_84%_60%/0.07)] border-[hsl(250_84%_60%/0.18)]"
                          : "text-muted-foreground hover:text-foreground bg-transparent border-transparent"
                      }`}
                      style={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                      }}
                    >
                      {t(link.label)}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Toolbar within Menu */}
              <div className="flex justify-center mb-6">
                 <Toolbar className="justify-center scale-90" isPlaying={isPlaying} toggleAudio={toggleAudio} />
              </div>
              
              {/* Divider */}
              <div
                className="h-px mb-4"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, hsl(var(--border)), transparent)",
                }}
              />

              {/* Hire Me CTA - centered full width */}
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="w-full rounded-full py-3 text-sm font-semibold text-white transition-all duration-200 active:scale-95 block text-center"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(250 84% 60%), hsl(196 100% 47%))",
                  boxShadow: "0 4px 16px hsl(250 84% 60% / 0.25)",
                }}
              >
                {t("Hire Me")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
