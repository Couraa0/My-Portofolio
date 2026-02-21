import { Github, Linkedin, Mail, ArrowUp, Instagram, MessageCircle } from "lucide-react";

const socials = [
  
  { href: "https://www.linkedin.com/in/rakha05/", icon: <Linkedin size={16} />, color: "hsl(196 100% 36%)", bg: "hsl(196 100% 47% / 0.08)", border: "hsl(196 100% 47% / 0.2)" },
  { href: "https://wa.me/6287871310560", icon: <MessageCircle size={16} />, color: "hsl(158 80% 40%)", bg: "hsl(158 80% 42% / 0.08)", border: "hsl(158 80% 42% / 0.2)" },
  { href: "https://www.instagram.com/couraa0", icon: <Instagram size={16} />, color: "hsl(344 85% 50%)", bg: "hsl(344 85% 60% / 0.08)", border: "hsl(344 85% 60% / 0.2)" },
  { href: "mailto:muhammadrakhasyamputra@gmail.com", icon: <Mail size={16} />, color: "hsl(344 85% 50%)", bg: "hsl(344 85% 60% / 0.08)", border: "hsl(344 85% 60% / 0.2)" },
  { href: "https://github.com/Couraa0", icon: <Github size={16} />, color: "hsl(250 84% 55%)", bg: "hsl(250 84% 60% / 0.08)", border: "hsl(250 84% 60% / 0.2)" },
];

const Footer = () => (
  <footer className="relative py-10 bg-white overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-px"
      style={{ background: "linear-gradient(90deg, transparent, hsl(250 84% 60% / 0.3), hsl(196 100% 47% / 0.3), hsl(344 85% 60% / 0.25), transparent)" }} />

    <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
      {/* Brand */}
      <div className="flex flex-col items-center sm:items-start gap-1">
        <span className="font-heading font-bold text-lg text-gradient">Rakha.</span>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Muhammad Rakha Syamputra
        </p>
      </div>

      {/* Socials */}
      <div className="flex items-center gap-3">
        {socials.map((s, i) => (
          <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border flex items-center justify-center text-muted-foreground transition-all duration-300 hover:scale-110"
            style={{ borderColor: "hsl(220 20% 90%)" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = s.color;
              (e.currentTarget as HTMLElement).style.borderColor = s.border;
              (e.currentTarget as HTMLElement).style.background = s.bg;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "";
              (e.currentTarget as HTMLElement).style.borderColor = "hsl(220 20% 90%)";
              (e.currentTarget as HTMLElement).style.background = "";
            }}>
            {s.icon}
          </a>
        ))}
      </div>

      {/* Back to top */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-9 h-9 rounded-full border flex items-center justify-center text-muted-foreground transition-all duration-300 hover:scale-110 hover:text-white"
        style={{ borderColor: "hsl(220 20% 90%)" }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, hsl(250 84% 60%), hsl(196 100% 47%))";
          (e.currentTarget as HTMLElement).style.borderColor = "transparent";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.background = "";
          (e.currentTarget as HTMLElement).style.borderColor = "hsl(220 20% 90%)";
        }}>
        <ArrowUp size={16} />
      </button>
    </div>
  </footer>
);

export default Footer;
