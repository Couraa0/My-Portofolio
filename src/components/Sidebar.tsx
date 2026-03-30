import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CopyCheck, Home, Briefcase, FolderCode, User, Phone, Award } from "lucide-react";
import { Toolbar } from "./Toolbar";
import { LayoutMode } from "./Layout";

interface SidebarProps {
  layoutMode: LayoutMode;
  toggleLayout: () => void;
  isPlaying: boolean;
  toggleAudio: () => void;
}

const navLinks = [
  { label: "Home", to: "/", icon: Home },
  { label: "About", to: "/about", icon: User },
  { label: "Experience", to: "/experience", icon: Briefcase },
  { label: "Projects", to: "/projects", icon: FolderCode },
  { label: "Achievements", to: "/achievements", icon: Award },
  { label: "Contact", to: "/contact", icon: Phone },
];

export const Sidebar = ({ toggleLayout, layoutMode, isPlaying, toggleAudio }: SidebarProps) => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (to: string) => {
    if (to.startsWith("/#") && location.pathname === "/") {
      return location.hash === to.replace("/", "");
    }
    return location.pathname === to && !to.startsWith("/#");
  };

  const handleNavClick = (to: string) => {
    if (to.startsWith("/#") && location.pathname === "/") {
      const id = to.replace("/#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <aside className="w-[300px] xl:w-[320px] shrink-0 h-screen sticky top-0 border-r border-border bg-card/80 backdrop-blur-xl hidden md:flex flex-col overflow-y-auto">
      <div className="py-8 px-6 pb-24">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-card shadow-lg mb-4 ring-2 ring-border">
            <img src="/Rakha-Formal-NoBg.png" className="w-full h-full object-cover bg-amber-500/10" alt="Rakha" />
          </div>
          <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
            Rakha <CopyCheck size={16} className="text-blue-500" />
          </h2>
          <Link
            to="/contact" 
            className="mt-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 text-amber-600 dark:text-amber-500 rounded-full px-4 py-1.5 text-xs font-semibold shadow-sm hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors"
          >
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              {t("Rekrut Saya")}
            </div>
          </Link>
        </div>

        {/* Toolbar Controls */}
        <div className="flex justify-center mb-8 px-2">
          <Toolbar toggleLayout={toggleLayout} layoutMode={layoutMode} className="justify-center" isPlaying={isPlaying} toggleAudio={toggleAudio} />
        </div>

        <div className="h-px bg-border/50 w-full mb-6" />

        {/* Navigation */}
        <nav className="flex flex-col gap-1.5">
          {navLinks.map((link) => {
            const active = isActive(link.to);
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => handleNavClick(link.to)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm border border-transparent ${
                  active 
                    ? "bg-muted shadow-sm border-border text-foreground" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <Icon size={18} className={active ? "text-primary" : "text-muted-foreground opacity-70"} />
                {t(link.label)}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  );
};
