import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
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
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  const isActive = (to: string) => {
    if (to.startsWith("/#")) return false;
    return location.pathname === to;
  };

  const handleNavClick = (to: string) => {
    setMobileOpen(false);
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
          : "bg-background/70 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3 lg:py-4">
        {/* Brand Logo */}
        <Link
          to="/"
          className="font-heading text-xl font-bold tracking-tight flex items-center gap-1.5 group/logo shrink-0"
        >
          <span className="text-gradient">Rakha</span>
          <span className="text-muted-foreground/50">.</span>
          <motion.img
            src="/Coura - Halo.png"
            alt="Coura mini mascot"
            className="w-7 h-7 object-contain drop-shadow-sm select-none opacity-80 group-hover/logo:opacity-100 transition-opacity"
            animate={{ rotate: [0, 8, -8, 0], y: [0, -2, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            draggable={false}
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-0.5 xl:gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            return (
              <li key={link.label}>
                <Link
                  to={link.to}
                  onClick={() => handleNavClick(link.to)}
                  className={`group px-3 xl:px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg flex items-center justify-center ${
                    active
                      ? "text-primary"
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
                            "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--cyan)))",
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
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <Toolbar isPlaying={isPlaying} toggleAudio={toggleAudio} />
        </div>

        {/* Mobile Header Right Controls: Menu Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            aria-label="Toggle Menu"
            className="p-2 rounded-xl bg-card border border-border text-foreground hover:bg-muted transition-colors flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-5 space-y-4">
              {/* Navigation Links Grid (2 columns) */}
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => {
                  const active = isActive(link.to);
                  return (
                    <Link
                      key={link.label}
                      to={link.to}
                      onClick={() => handleNavClick(link.to)}
                      className={`rounded-xl py-2.5 px-3 text-xs font-semibold text-center transition-all duration-200 border ${
                        active
                          ? "text-primary bg-primary/10 border-primary/30 font-bold shadow-sm"
                          : "text-muted-foreground hover:text-foreground bg-card/50 border-border/60"
                      }`}
                    >
                      {t(link.label)}
                    </Link>
                  );
                })}
              </div>

              {/* Toolbar controls in Mobile Drawer */}
              <div className="pt-2 flex justify-center">
                <Toolbar className="scale-90" isPlaying={isPlaying} toggleAudio={toggleAudio} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
