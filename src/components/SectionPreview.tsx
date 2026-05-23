import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Briefcase,
  FolderKanban,
  Mail,
  ArrowRight,
  ChevronRight,
  Trophy,
  MapPin,
  Sparkles,
  Github,
  Linkedin,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";

/* ── SUB-PREVIEW COMPONENTS FOR DRY COMPLIANCE ── */

const ExperiencePreview = ({ t }: { t: any }) => (
  <div className="flex-1 flex flex-col justify-between relative z-10 text-left h-full space-y-4">
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest font-bold">Live Career Timeline</span>
        <span className="text-xs font-semibold text-slate-500">3+ Roles</span>
      </div>

      {/* Timeline tree */}
      <div className="space-y-4 pt-2">
        <div className="flex gap-4 relative pl-3 border-l border-blue-500/20">
          <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 border border-background shadow shadow-blue-500/50" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-foreground">IT Project Manager Intern</h4>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1.5 flex-wrap">
              <MapPin size={10} className="flex-shrink-0" /> <span className="truncate">Citiasia International • 2025</span>
            </p>
          </div>
        </div>

        <div className="flex gap-4 relative pl-3 border-l border-blue-500/20">
          <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-sky-500 border border-background" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-foreground">Co-Founder & Lead Developer</h4>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1.5 flex-wrap">
              <MapPin size={10} className="flex-shrink-0" /> <span className="truncate">Tixchain.id • 2023 – Present</span>
            </p>
          </div>
        </div>

        <div className="flex gap-4 relative pl-3 border-l border-transparent">
          <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-400 border border-background" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-foreground">Ketua Divisi Edukasi</h4>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1.5 flex-wrap">
              <MapPin size={10} className="flex-shrink-0" /> <span className="truncate">HIMSIKA UNSIKA • 2024</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <Link
      to="/experience"
      className="mt-6 flex items-center justify-center gap-2 py-2.5 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/10 transition-all hover:scale-[1.01]"
    >
      {t("View Details")}
      <ArrowRight size={13} />
    </Link>
  </div>
);

const ProjectsPreview = ({ t }: { t: any }) => (
  <div className="flex-1 flex flex-col justify-between relative z-10 text-left h-full space-y-4">
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <span className="text-[10px] font-mono text-sky-600 uppercase tracking-widest font-bold">Featured Projects Deck</span>
        <span className="text-xs font-semibold text-slate-500">15+ Built</span>
      </div>

      {/* Mini cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div className="p-3 rounded-xl bg-background border border-border shadow-sm space-y-1.5">
          <span className="text-[8px] bg-sky-100 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 px-1.5 py-0.5 rounded font-bold">PM & Web</span>
          <h4 className="text-xs font-bold text-foreground">Smart Village Platform</h4>
          <p className="text-[10px] text-muted-foreground line-clamp-2 leading-normal">Digital village profile ecosystem & community services.</p>
        </div>

        <div className="p-3 rounded-xl bg-background border border-border shadow-sm space-y-1.5">
          <span className="text-[8px] bg-blue-100 dark:bg-blue-950 text-blue-600 px-1.5 py-0.5 rounded font-bold">Blockchain</span>
          <h4 className="text-xs font-bold text-foreground">Tixchain.id NFT Tickets</h4>
          <p className="text-[10px] text-muted-foreground line-clamp-2 leading-normal">Secure event ticketing utilizing NFT assets.</p>
        </div>
      </div>
    </div>

    <Link
      to="/projects"
      className="mt-6 flex items-center justify-center gap-2 py-2.5 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/10 transition-all hover:scale-[1.01]"
    >
      {t("View Details")}
      <ArrowRight size={13} />
    </Link>
  </div>
);

const AchievementsPreview = ({ t }: { t: any }) => (
  <div className="flex-1 flex flex-col justify-between relative z-10 text-left h-full space-y-4">
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest font-bold">Key Certifications & Awards</span>
        <span className="text-xs font-semibold text-slate-500">Dean's List</span>
      </div>

      {/* Certification stats details */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-background border border-border shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-base">🏆</span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Dean's List GPA Honor</span>
          </div>
          <span className="text-[10px] text-blue-500 font-bold">3.97 GPA</span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-background border border-border shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-base">📋</span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Project Management Certification</span>
          </div>
          <span className="text-[10px] text-blue-500 font-bold">Scrum/Agile</span>
        </div>
      </div>
    </div>

    <Link
      to="/achievements"
      className="mt-6 flex items-center justify-center gap-2 py-2.5 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/10 transition-all hover:scale-[1.01]"
    >
      {t("View Details")}
      <ArrowRight size={13} />
    </Link>
  </div>
);

const ContactPreview = ({ t }: { t: any }) => (
  <div className="flex-1 flex flex-col justify-between relative z-10 text-left h-full space-y-4">
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <span className="text-[10px] font-mono text-sky-600 uppercase tracking-widest font-bold">Get in Touch Directly</span>
        <span className="text-xs font-semibold text-slate-500">24h Response</span>
      </div>

      {/* Contact mini social nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <a
          href="https://www.linkedin.com/in/rakha05/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 p-3 rounded-xl bg-background border border-border hover:border-blue-500 hover:text-blue-500 transition-colors shadow-sm"
        >
          <Linkedin size={16} className="text-blue-500" />
          <div className="min-w-0">
            <h4 className="text-[10px] font-bold text-foreground leading-none mb-1">LinkedIn</h4>
            <span className="text-[9px] text-slate-400 block truncate">rakha05</span>
          </div>
        </a>

        <a
          href="https://github.com/Couraa0"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 p-3 rounded-xl bg-background border border-border hover:border-foreground transition-colors shadow-sm"
        >
          <Github size={16} className="text-foreground" />
          <div className="min-w-0">
            <h4 className="text-[10px] font-bold text-foreground leading-none mb-1">GitHub</h4>
            <span className="text-[9px] text-slate-400 block truncate">Couraa0</span>
          </div>
        </a>
      </div>
    </div>

    <Link
      to="/contact"
      className="mt-6 flex items-center justify-center gap-2 py-2.5 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all hover:scale-[1.01]"
    >
      {t("Contact Me")}
      <ArrowRight size={13} />
    </Link>
  </div>
);

const renderPreview = (id: string, t: any) => {
  switch (id) {
    case "experience":
      return <ExperiencePreview t={t} />;
    case "projects":
      return <ProjectsPreview t={t} />;
    case "achievements":
      return <AchievementsPreview t={t} />;
    case "contact":
      return <ContactPreview t={t} />;
    default:
      return null;
  }
};

/* ── MAIN COMPONENT ── */

export const SectionPreview = () => {
  const { t } = useTranslation();
  const [activeCard, setActiveCard] = useState<"experience" | "projects" | "achievements" | "contact">("experience");

  const cards = [
    {
      id: "experience",
      icon: Briefcase,
      title: "Experience",
      descKey: "Experience Card Desc",
      to: "/experience",
      color: "hsl(215 100% 55%)",
      glowColor: "rgba(37, 99, 235, 0.15)",
    },
    {
      id: "projects",
      icon: FolderKanban,
      title: "Projects",
      descKey: "Projects Card Desc",
      to: "/projects",
      color: "hsl(196 100% 47%)",
      glowColor: "rgba(6, 182, 212, 0.15)",
    },
    {
      id: "achievements",
      icon: Trophy,
      title: "Achievements",
      descKey: "Achievements Card Desc",
      to: "/achievements",
      color: "hsl(220 90% 56%)",
      glowColor: "rgba(99, 102, 241, 0.15)",
    },
    {
      id: "contact",
      icon: Mail,
      title: "Contact",
      descKey: "Contact Subtitle",
      to: "/contact",
      color: "hsl(196 100% 40%)",
      glowColor: "rgba(14, 116, 144, 0.15)",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-background relative overflow-x-hidden overflow-y-visible">
      
      {/* Decorative top line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-px z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(215 100% 55% / 0.2), transparent)",
        }}
      />

      {/* Glow Orbs in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] aspect-square bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-full overflow-hidden">
        
        {/* Title Lockup */}
        <AnimatedSection>
          <div className="text-center mb-10 sm:mb-16">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold mb-4 border"
              style={{
                background: "hsl(215 100% 55% / 0.08)",
                borderColor: "hsl(215 100% 55% / 0.25)",
                color: "hsl(215 100% 50%)",
              }}
            >
              <Sparkles size={13} className="text-sky-500" />
              {t("Explore")}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              {t("What I")}{" "}
              <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                {t("Offer")}
              </span>
            </h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
              {t("Section Preview Subtitle")}
            </p>
          </div>
        </AnimatedSection>

        {/* Double-Pane Dashboard Console */}
        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* LEFT COLUMN: NAVIGATION CARDS (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-4 min-w-0 w-full">
            {cards.map((card, i) => {
              const Icon = card.icon;
              const isActive = activeCard === card.id;
              
              return (
                <AnimatedSection key={card.id} delay={i * 0.08} className="w-full min-w-0">
                  <div
                    onMouseEnter={() => setActiveCard(card.id as any)}
                    onClick={() => setActiveCard(card.id as any)}
                    className={`relative p-3.5 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col group w-full min-w-0 overflow-hidden ${
                      isActive
                        ? "bg-slate-50 dark:bg-slate-900 border-blue-500/30 shadow-[0_4px_25px_rgba(37,99,235,0.06)]"
                        : "bg-background border-border hover:border-slate-300 dark:hover:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 w-full min-w-0">
                      {/* Left vertical accent line */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-3 bottom-3 w-1 rounded-r"
                          style={{ backgroundColor: card.color }}
                        />
                      )}

                      {/* Icon container */}
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${
                          isActive ? "text-white" : "text-muted-foreground bg-secondary"
                        }`}
                        style={{
                          backgroundColor: isActive ? card.color : undefined,
                        }}
                      >
                        <Icon size={18} />
                      </div>

                      {/* Title & Description */}
                      <div className="flex-1 text-left min-w-0 overflow-hidden">
                        <h3 className="font-heading font-bold text-foreground text-sm sm:text-base mb-1 flex items-center gap-2">
                          {t(card.title)}
                          <ChevronRight
                            size={14}
                            className={`flex-shrink-0 transition-transform duration-300 ${
                              isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                            }`}
                            style={{ color: card.color }}
                          />
                        </h3>
                        <p className="text-[11px] sm:text-xs text-muted-foreground truncate leading-relaxed">
                          {t(card.descKey)}
                        </p>
                      </div>

                      {/* Arrow CTA */}
                      <Link
                        to={card.to}
                        className="p-2 rounded-lg bg-secondary hover:bg-slate-200 dark:hover:bg-slate-800 text-muted-foreground hover:text-foreground transition-all flex-shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ArrowRight size={14} />
                      </Link>
                    </div>

                    {/* Responsive Expandable sub-pane on mobile/tablet */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: "16px" }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="lg:hidden w-full overflow-hidden border-t border-border/50 pt-4"
                        >
                          {renderPreview(card.id, t)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* RIGHT COLUMN: LIVE INTERACTIVE PREVIEW DECK (7 cols) - Hidden on mobile, visible on lg screens */}
          <div className="hidden lg:block lg:col-span-7">
            <div className="h-full rounded-2xl border border-border bg-slate-50/50 dark:bg-slate-900/20 backdrop-blur-sm p-6 flex flex-col justify-between min-h-[380px] relative overflow-hidden shadow-inner">
              
              {/* Abstract cyber grid watermark */}
              <div className="absolute inset-0 bg-grid opacity-[0.2] pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="flex-1 flex flex-col justify-between h-full"
                >
                  {renderPreview(activeCard, t)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SectionPreview;
