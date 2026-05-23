import { useState } from "react";
import { Github, Linkedin, Mail, ArrowUp, Instagram, MessageCircle, Heart, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const socials = [
  { href: "https://www.linkedin.com/in/rakha05/", icon: <Linkedin size={16} />, label: "LinkedIn", color: "hsl(196 100% 36%)", bg: "hsl(196 100% 47% / 0.08)", border: "hsl(196 100% 47% / 0.2)" },
  { href: "https://wa.me/6287871310560", icon: <MessageCircle size={16} />, label: "WhatsApp", color: "hsl(158 80% 40%)", bg: "hsl(158 80% 42% / 0.08)", border: "hsl(158 80% 42% / 0.2)" },
  { href: "https://www.instagram.com/couraa0", icon: <Instagram size={16} />, label: "Instagram", color: "hsl(344 85% 50%)", bg: "hsl(344 85% 60% / 0.08)", border: "hsl(344 85% 60% / 0.2)" },
  { href: "mailto:muhammadrakhasyamputra@gmail.com", icon: <Mail size={16} />, label: "Email", color: "hsl(344 85% 50%)", bg: "hsl(344 85% 60% / 0.08)", border: "hsl(344 85% 60% / 0.2)" },
  { href: "https://github.com/Couraa0", icon: <Github size={16} />, label: "GitHub", color: "hsl(250 84% 55%)", bg: "hsl(250 84% 60% / 0.08)", border: "hsl(250 84% 60% / 0.2)" },
];

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Experience", to: "/experience" },
  { label: "Projects", to: "/projects" },
  { label: "Achievements", to: "/achievements" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => {
  const { t } = useTranslation();
  const [clicks, setClicks] = useState(0);

  const handleBrandClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    if (newClicks === 5) {
      toast.success("🎉 You found the Easter Egg!", {
        description: "Thanks for checking out my portfolio closely!",
        style: { 
          background: "linear-gradient(135deg, hsl(250 84% 60%), hsl(196 100% 47%))", 
          color: "#ffffff", 
          border: "none" 
        },
        descriptionClassName: "text-white opacity-100 font-medium"
      });
      setClicks(0);
    }
  };

  return (
    <footer className="relative bg-background border-t border-border overflow-hidden">
      {/* Animated top gradient line */}
      <div className="h-px w-full" style={{
        background: "linear-gradient(90deg, transparent, hsl(250 84% 60% / 0.4), hsl(196 100% 47% / 0.4), hsl(344 85% 60% / 0.3), transparent)"
      }} />

      {/* Main footer content */}
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Brand / About */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link to="/">
              <span 
                onClick={handleBrandClick}
                className="font-heading font-bold text-2xl text-gradient cursor-pointer select-none"
                title="Click me!"
              >
                Rakha.
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs text-center md:text-left leading-relaxed">
              {t("Footer Description")}
            </p>
            {/* Status badge */}
            <div className="flex items-center gap-2 rounded-full px-3 py-1.5"
              style={{ background: "hsl(158 80% 42% / 0.09)", border: "1px solid hsl(158 80% 42% / 0.22)" }}>
              <span className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: "hsl(158 80% 42%)", animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }} />
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-500">{t("Available for Work")}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("Quick Links")}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="rounded-full px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-200 border border-transparent hover:border-border"
                >
                  {t(link.label)}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{t("Connect")}</p>
            <div className="flex items-center gap-2">
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border flex items-center justify-center text-muted-foreground transition-all duration-300 hover:scale-110"
                  style={{ borderColor: "hsl(var(--border))" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = s.color;
                    (e.currentTarget as HTMLElement).style.borderColor = s.border;
                    (e.currentTarget as HTMLElement).style.background = s.bg;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = "";
                    (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border))";
                    (e.currentTarget as HTMLElement).style.background = "";
                  }}>
                  {s.icon}
                </a>
              ))}
            </div>
            {/* Resume link */}
            <a
              href="https://drive.google.com/file/d/1JHdnHLOJfDU3Wf3jK1hrfgMrzbeGfQdT/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink size={12} /> {t("View Resume")}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid hsl(var(--border))" }}>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            © {new Date().getFullYear()} Muhammad Rakha Syamputra.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
