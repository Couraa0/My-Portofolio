import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Loader2, MapPin, Terminal, Calendar, ChevronRight, Trophy, Sparkles, Layers, Cpu, Building2, Wrench, ArrowRight, Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import AnimatedSection from "./AnimatedSection";
import { useEffect, useState } from "react";
import {
  getExperiences,
  getCompetitions,
  type Experience as DBExp,
  type Competition,
} from "@/lib/supabase";

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  logo?: string;
  description: string[];
  tools?: string[];
  competitions?: Competition[];
}

function adaptExp(e: DBExp): Experience {
  return {
    id: e.id!,
    company: e.company,
    role: e.role,
    period: e.period,
    location: e.location,
    logo: e.logo_url,
    description: e.description || [],
    tools: e.tools,
    competitions: e.competitions || [],
  };
}

interface FlattenedCompetition {
  id: string;
  parentExperienceId: string;
  title: string;
  role: string;
  award: string;
  project: string;
  skills: string[];
  what_was_built: string;
  impact_achievements: string[];
  period: string;
  logo?: string;
}

const COMPETITION_THEMES = [
  {
    primary: "text-sky-500",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    activeBorder: "border-sky-500",
    pill: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20",
    text: "text-sky-600 dark:text-sky-400",
    glow: "shadow-sky-500/10",
    dot: "bg-sky-500 border-sky-500/50 shadow-sky-500/50",
    boxBg: "bg-sky-500/5 border-sky-500/10"
  },
  {
    primary: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    activeBorder: "border-blue-500",
    pill: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20",
    text: "text-blue-600 dark:text-blue-400",
    glow: "shadow-blue-500/10",
    dot: "bg-blue-500 border-blue-500/50 shadow-blue-500/50",
    boxBg: "bg-blue-500/5 border-blue-500/10"
  },
  {
    primary: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    activeBorder: "border-emerald-500",
    pill: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20",
    text: "text-emerald-600 dark:text-emerald-400",
    glow: "shadow-emerald-500/10",
    dot: "bg-emerald-500 border-emerald-500/50 shadow-emerald-500/50",
    boxBg: "bg-emerald-500/5 border-emerald-500/10"
  }
];

const ExperienceComponent = () => {
  const { t } = useTranslation();
  const [careerExperiences, setCareerExperiences] = useState<Experience[]>([]);
  const [flattenedCompetitions, setFlattenedCompetitions] = useState<FlattenedCompetition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCareerIndex, setActiveCareerIndex] = useState<number | null>(0);
  const [activeCompIndex, setActiveCompIndex] = useState<number | null>(0);

  useEffect(() => {
    Promise.all([getExperiences(), getCompetitions()])
      .then(([expData, compData]) => {
        const expMapped = expData.map(adaptExp);
        setCareerExperiences(expMapped);

        const flatComps: FlattenedCompetition[] = compData.map((c) => ({
          id: c.id!,
          parentExperienceId: "",
          title: c.title,
          role: c.role,
          award: c.award,
          project: c.project,
          skills: c.skills || [],
          what_was_built: c.what_was_built || "",
          impact_achievements: c.impact_achievements || [],
          period: c.period,
          logo: c.logo_url,
        }));
        setFlattenedCompetitions(flatComps);

        if (expMapped.length > 0) setActiveCareerIndex(0);
        if (flatComps.length > 0) setActiveCompIndex(0);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="experience" className="py-24 bg-background relative z-10 overflow-x-hidden text-left pb-28 sm:pb-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">

        {/* === HEADING === */}
        <AnimatedSection>
          <div className="mb-8 pb-6 border-b border-border/60 relative">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold mb-3 border"
              style={{
                background: "hsl(215 100% 55% / 0.08)",
                borderColor: "hsl(215 100% 55% / 0.25)",
                color: "hsl(215 100% 50%)",
              }}
            >
              <Sparkles size={13} className="text-sky-500" />
              CAREER & COMPETITION TRACK
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold flex items-center gap-3 mb-3 text-foreground">
              <Briefcase size={28} className="text-blue-500" />
              {t("Experience")}
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl">
              {t("Experience Subtitle")}
            </p>

            {/* Mascot */}
            <motion.img
              src="/Coura - Peace.png"
              alt="Coura mascot celebrating"
              className="absolute -right-2 sm:right-0 -top-6 w-16 sm:w-20 h-auto drop-shadow-md select-none hidden md:block pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              draggable={false}
            />
          </div>
        </AnimatedSection>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-24 text-muted-foreground">
            <Loader2 size={24} className="animate-spin text-blue-500" />
            <span className="text-sm">{t("Loading data...")}</span>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <span className="text-sm">{t("Failed to load data")}: {error}</span>
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* === SECTION 1: PROFESSIONAL EXPERIENCE === */}
            {careerExperiences.length > 0 && (
              <div className="mb-20">
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
                  
                  {/* Left Column: Work Cards (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col gap-3.5 text-left max-h-[580px] overflow-y-auto px-2 py-1">
                    <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-1.5 sticky top-0 bg-background/95 backdrop-blur-sm py-1 z-20">
                      <Sparkles size={12} className="text-blue-500" />
                      CAREER_NODES ({careerExperiences.length})
                    </h3>

                    <div className="flex flex-col gap-3 relative pl-4 ml-3 border-l-2 border-border/50">
                      {careerExperiences.map((exp, idx) => {
                        const isActive = activeCareerIndex === idx;

                        return (
                          <AnimatedSection key={exp.id} delay={idx * 0.05} className="w-full">
                            <div
                              onClick={() => setActiveCareerIndex((prev) => (prev === idx ? null : idx))}
                              onDoubleClick={() => setActiveCareerIndex(null)}
                              className={`group relative p-4 rounded-2xl glass-card-premium transition-all duration-300 cursor-pointer flex flex-col ${isActive
                                ? "border-blue-500 ring-2 ring-blue-500/20 shadow-lg shadow-blue-500/10 scale-[1.01]"
                                : "hover:border-blue-500/40"
                                }`}
                            >
                              {/* HUD Corners */}
                              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />
                              <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />
                              <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />
                              <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />

                              <div
                                className={`absolute -left-[23px] top-[26px] w-3.5 h-3.5 rounded-full border-2 transition-all ${isActive ? "bg-blue-600 border-background scale-125 shadow-lg shadow-blue-500/60" : "bg-card border-border/60 group-hover:border-blue-500/40"
                                  }`}
                              />

                              <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center p-1.5 border border-border shadow-sm overflow-hidden group-hover:scale-105 transition-transform">
                                  {exp.logo ? <img src={exp.logo} alt={exp.company} className="object-contain w-full h-full" /> : <Briefcase className="text-slate-400 dark:text-slate-600 w-5 h-5" />}
                                </div>
                                <div className="min-w-0 flex-1 text-left space-y-1">
                                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-blue-500">
                                    <Calendar size={11} className="text-blue-500 shrink-0" />
                                    <span>{exp.period}</span>
                                  </div>
                                  <h4 className="font-heading font-extrabold text-sm sm:text-base text-foreground group-hover:text-blue-500 transition-colors leading-snug break-words">
                                    {exp.role}
                                  </h4>
                                  <div className="text-xs font-medium leading-relaxed break-words flex flex-wrap items-center gap-x-2 gap-y-0.5">
                                    <span className="font-semibold text-foreground/90 flex items-center gap-1">
                                      <Building2 size={12} className="text-blue-500/80 shrink-0" /> {exp.company}
                                    </span>
                                    {exp.location && (
                                      <>
                                        <span className="text-muted-foreground/60">•</span>
                                        <span className="flex items-center gap-1 text-muted-foreground">
                                          <MapPin size={11} className="shrink-0 text-slate-400" /> {exp.location}
                                        </span>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <ChevronRight size={14} className={`text-slate-400 shrink-0 transition-transform duration-300 ${isActive ? "rotate-90 text-blue-500" : "-translate-x-1 opacity-0 group-hover:opacity-100"}`} />
                              </div>
                            </div>

                            {/* Mobile detail panel */}
                            <AnimatePresence>
                              {isActive && activeCareerIndex !== null && careerExperiences[activeCareerIndex] && (
                                <motion.div
                                  key={`career-detail-${idx}`}
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="lg:hidden overflow-hidden mt-2"
                                >
                                  <div className="rounded-2xl border border-border bg-slate-50/80 dark:bg-slate-900/30 p-4 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-grid opacity-[0.06] pointer-events-none" />
                                    <div className="relative z-10">
                                      <MissionDebrief exp={careerExperiences[activeCareerIndex]} t={t} />
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </AnimatedSection>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Work Debrief Console (7 cols) */}
                  <div className="hidden lg:block lg:col-span-7 h-full">
                    <div className="sticky top-24 h-full min-h-[520px] rounded-3xl border border-border bg-slate-50/50 dark:bg-slate-900/10 backdrop-blur-md p-6 relative overflow-hidden shadow-inner flex flex-col justify-between">
                      <div className="absolute inset-0 bg-grid opacity-[0.08] pointer-events-none" />
                      <AnimatePresence mode="wait">
                        {activeCareerIndex !== null && careerExperiences[activeCareerIndex] ? (
                          <motion.div
                            key={`work-console-${activeCareerIndex}`}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.25 }}
                            className="flex-grow flex flex-col justify-between h-full relative z-10"
                          >
                            <MissionDebrief exp={careerExperiences[activeCareerIndex]} t={t} />
                          </motion.div>
                        ) : (
                          <div className="h-full min-h-[460px] flex flex-col items-center justify-center text-center p-8 text-muted-foreground font-mono text-xs z-10">
                            <Briefcase size={36} className="text-blue-500/40 mb-3 animate-pulse" />
                            <span className="font-bold text-foreground mb-1">SELECT_CAREER_NODE</span>
                            <span className="text-[11px] text-muted-foreground max-w-xs">Click or double-click any node to expand or collapse mission debrief logs.</span>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* === SECTION 2: COMPETITIVE EXPERIENCE === */}
            {flattenedCompetitions.length > 0 && (
              <div>
                <AnimatedSection>
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/50">
                    <h3 className="font-heading text-xl font-extrabold flex items-center gap-2.5 text-foreground">
                      <Trophy size={22} className="text-amber-500" />
                      {t("Competitive Experience") || "Competitive Experience"}
                    </h3>
                    <span className="text-xs font-mono font-bold text-muted-foreground bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full border border-amber-500/20">
                      {flattenedCompetitions.length} MILESTONES
                    </span>
                  </div>
                </AnimatedSection>

                {/* Competitive Experience Workspace */}
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
                  {/* Left Column: Competition Cards (5 cols) */}
                  <div className="lg:col-span-5 flex flex-col gap-3.5 text-left max-h-[580px] overflow-y-auto px-2 py-1">
                    <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-1.5 sticky top-0 bg-background/95 backdrop-blur-sm py-1 z-20">
                      <Sparkles size={12} className="text-amber-500" />
                      COMPETITION_NODES ({flattenedCompetitions.length})
                    </h3>

                    <div className="flex flex-col gap-3 relative pl-4 ml-3 border-l-2 border-border/50">
                      {flattenedCompetitions.map((comp, idx) => {
                        const isActive = activeCompIndex === idx;
                        const theme = COMPETITION_THEMES[idx % COMPETITION_THEMES.length];

                        return (
                          <AnimatedSection key={comp.id} delay={idx * 0.05} className="w-full">
                            <div
                              onClick={() => setActiveCompIndex((prev) => (prev === idx ? null : idx))}
                              onDoubleClick={() => setActiveCompIndex(null)}
                              className={`group relative p-4 rounded-2xl glass-card-premium transition-all duration-300 cursor-pointer flex flex-col w-full min-w-0 overflow-hidden ${isActive
                                ? "border-amber-500 ring-2 ring-amber-500/20 shadow-lg shadow-amber-500/10 scale-[1.01]"
                                : "hover:border-amber-500/40"
                                }`}
                            >
                              {/* HUD Corners */}
                              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-amber-500/0 group-hover:border-amber-500/50 transition-colors duration-300 z-10" />
                              <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-amber-500/0 group-hover:border-amber-500/50 transition-colors duration-300 z-10" />
                              <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-amber-500/0 group-hover:border-amber-500/50 transition-colors duration-300 z-10" />
                              <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-amber-500/0 group-hover:border-amber-500/50 transition-colors duration-300 z-10" />

                              <div className={`absolute -left-[23px] top-[26px] w-3.5 h-3.5 rounded-full border-2 transition-all ${isActive ? "bg-amber-500 border-background scale-125 shadow-lg shadow-amber-500/60" : "bg-card border-border/60 group-hover:border-amber-500/40"}`} />

                              <div className="flex items-center gap-3">
                                <div className={`flex-shrink-0 w-11 h-11 rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center border border-border shadow-sm overflow-hidden group-hover:scale-105 transition-transform ${comp.logo ? 'p-0' : `p-1.5 ${theme.bg} ${theme.border}`}`}>
                                  {comp.logo ? (
                                    <img src={comp.logo} alt={comp.title} className="object-cover w-full h-full" />
                                  ) : (
                                    <Trophy className={`${theme.primary} w-5 h-5`} />
                                  )}
                                </div>
                                <div className="min-w-0 flex-1 text-left">
                                  <span className="font-mono text-[9px] text-amber-500 font-bold block mb-0.5">{comp.period}</span>
                                  <h4 className="font-heading font-extrabold text-sm text-foreground group-hover:text-amber-500 transition-colors leading-snug break-words">
                                    {comp.role}
                                  </h4>
                                  <p className="text-xs text-muted-foreground mt-0.5 font-medium leading-relaxed break-words">
                                    {comp.title}
                                  </p>
                                </div>
                                <ChevronRight size={14} className={`text-slate-400 shrink-0 transition-transform duration-300 ${isActive ? "rotate-90 text-amber-500" : "-translate-x-1 opacity-0 group-hover:opacity-100"}`} />
                              </div>

                              <div className="flex flex-wrap gap-1 mt-2.5">
                                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold tracking-wide flex items-center gap-1 shadow-sm ${theme.pill}`}>
                                  🏆 {comp.award}
                                </span>
                              </div>
                            </div>

                            {/* Mobile detail panel */}
                            <AnimatePresence>
                              {isActive && activeCompIndex !== null && flattenedCompetitions[activeCompIndex] && (
                                <motion.div
                                  key={`comp-detail-${idx}`}
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="lg:hidden overflow-hidden mt-2 w-full max-w-full"
                                >
                                  <div className="rounded-2xl border border-border bg-slate-50/80 dark:bg-slate-900/30 p-4 w-full max-w-full overflow-hidden">
                                    <CompetitionDebrief comp={flattenedCompetitions[activeCompIndex]} theme={COMPETITION_THEMES[activeCompIndex % COMPETITION_THEMES.length]} />
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </AnimatedSection>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Competition Debrief Console (7 cols) */}
                  <div className="hidden lg:block lg:col-span-7 h-full">
                    <div className="sticky top-24 h-full min-h-[520px] rounded-3xl border border-border bg-slate-50/50 dark:bg-slate-900/10 backdrop-blur-md p-6 relative overflow-hidden shadow-inner flex flex-col justify-between">
                      <div className="absolute inset-0 bg-grid opacity-[0.08] pointer-events-none" />
                      <AnimatePresence mode="wait">
                        {activeCompIndex !== null && flattenedCompetitions[activeCompIndex] ? (
                          <motion.div
                            key={`comp-console-${activeCompIndex}`}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.25 }}
                            className="flex-grow flex flex-col justify-between h-full relative z-10"
                          >
                            <CompetitionDebrief comp={flattenedCompetitions[activeCompIndex]} theme={COMPETITION_THEMES[activeCompIndex % COMPETITION_THEMES.length]} />
                          </motion.div>
                        ) : (
                          <div className="h-full min-h-[460px] flex flex-col items-center justify-center text-center p-8 text-muted-foreground font-mono text-xs z-10">
                            <Trophy size={36} className="text-amber-500/40 mb-3 animate-pulse" />
                            <span className="font-bold text-foreground mb-1">SELECT_COMPETITION_NODE</span>
                            <span className="text-[11px] text-muted-foreground max-w-xs">Click or double-click any node to expand or collapse competition debrief logs.</span>
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
};

/* ── MISSION DEBRIEF CARD COMPONENT ── */

const MissionDebrief = ({ exp, t }: { exp: Experience; t: any }) => {
  return (
    <div className="flex flex-col space-y-4 text-left w-full min-w-0">

      {/* Clean Header Badge (WITHOUT redundant period date) */}
      <div className="flex items-center justify-between pb-2.5 border-b border-border/50">
        <span className="font-mono text-[10px] text-blue-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Terminal size={13} className="text-blue-500" />
          MISSION_DEBRIEF_LOGS
        </span>
      </div>

      {/* Description Logs */}
      <div className="space-y-2.5 pt-1">
        <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
          <Sparkles size={11} className="text-blue-500" />
          LOG_REPORTS
        </h4>
        <ul className="space-y-2 font-mono text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {exp.description?.map((desc, i) => (
            <li key={i} className="flex gap-2 items-start">
              <span className="text-blue-500 font-bold select-none mt-0.5">&gt;</span>
              <span>{desc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Skills badging */}
      {exp.tools && exp.tools.length > 0 && (
        <div className="pt-3 border-t border-border/50">
          <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">COMPILED_SKILLS</h4>
          <div className="flex flex-wrap gap-1.5">
            {exp.tools.map((tool) => (
              <span
                key={tool}
                className="px-2 py-1 text-[10px] font-bold font-mono bg-blue-500/5 text-blue-600 dark:text-blue-400 border border-blue-500/10 rounded-md"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

/* ── COMPETITION DEBRIEF CARD COMPONENT ── */

const CompetitionDebrief = ({ comp, theme }: { comp: FlattenedCompetition; theme: any }) => {
  return (
    <div className="flex flex-col space-y-4 text-left w-full min-w-0">

      {/* Clean Header Badge (WITHOUT redundant period date) */}
      <div className="flex items-center justify-between pb-2.5 border-b border-border/50 min-w-0">
        <span className="font-mono text-[10px] text-amber-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Trophy size={13} className="text-amber-500" />
          COMPETITION_DEBRIEF_LOGS
        </span>
      </div>

      {/* What was built */}
      {comp.what_was_built && (
        <div className="space-y-1.5 min-w-0">
          <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Sparkles size={11} className="text-amber-500" />
            WHAT_WAS_BUILT
          </h4>
          <div className={`p-3 rounded-xl border text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 font-medium break-words overflow-hidden ${theme.boxBg}`}>
            {comp.what_was_built}
          </div>
        </div>
      )}

      {/* Impact & Achievements */}
      {comp.impact_achievements && comp.impact_achievements.length > 0 && (
        <div className="space-y-1.5 min-w-0">
          <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <Award size={11} className="text-amber-500" />
            IMPACT_AND_ACHIEVEMENTS
          </h4>
          <ul className="space-y-2 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            {comp.impact_achievements.map((item, i) => (
              <li key={i} className="flex gap-2 items-start min-w-0">
                <span className={`${theme.text} font-bold select-none shrink-0 mt-0.5`}>&gt;</span>
                <span className="break-words min-w-0 flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Skills badging */}
      {comp.skills && comp.skills.length > 0 && (
        <div className="pt-3 border-t border-border/50 min-w-0">
          <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">COMPILED_SKILLS</h4>
          <div className="flex flex-wrap gap-1">
            {comp.skills.map((skill) => (
              <span
                key={skill}
                className={`px-1.5 py-0.5 text-[9px] font-bold font-mono border rounded ${theme.bg} ${theme.text} ${theme.border}`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ExperienceComponent;
