import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Loader2, MapPin, Terminal, Calendar, ChevronRight, Trophy } from "lucide-react";
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

const Experience = () => {
  const { t } = useTranslation();
  const [careerExperiences, setCareerExperiences] = useState<Experience[]>([]);
  const [flattenedCompetitions, setFlattenedCompetitions] = useState<FlattenedCompetition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCareerIndex, setActiveCareerIndex] = useState<number>(0);
  const [activeCompIndex, setActiveCompIndex] = useState<number>(0);

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

        {/* === KARIER HEADING === */}
        <AnimatedSection>
          <div className="mb-10 pb-6 border-b border-border/60 relative">
            <h2 className="font-heading text-2xl md:text-3xl font-bold flex items-center gap-3 mb-3 text-foreground">
              <Briefcase size={28} className="text-blue-500" />
              {t("Experience")}
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl">
              {t("Experience Subtitle")}
            </p>

            {/* Coura Peace mascot - celebrating near title */}
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
        {!loading && !error && (careerExperiences.length > 0 || flattenedCompetitions.length > 0) && (
          <>
            {/* === INTERACTIVE TIMELINE WORKSPACE === */}
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch mb-12 lg:mb-24">
              
              <div className="lg:col-span-5 flex flex-col gap-3.5 pr-1">
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                  CAREER_NODE_DIRECTORY
                </h3>

                <div className="flex flex-col gap-3 relative pl-4 border-l-2 border-border/50">
                  {careerExperiences.map((exp, idx) => {
                    const isActive = activeCareerIndex === idx;
                    
                    return (
                      <AnimatedSection key={exp.id} delay={idx * 0.05} className="w-full">
                        <div
                          onClick={() => setActiveCareerIndex(idx)}
                          className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col group ${
                            isActive
                              ? "bg-slate-50 dark:bg-slate-900 border-blue-500/30 shadow-[0_4px_20px_rgba(37,99,235,0.03)]"
                              : "bg-card border-border/60 hover:border-blue-500/20"
                          }`}
                        >
                          <div 
                            className={`absolute -left-[23px] top-[26px] w-3 h-3 rounded-full border-2 transition-all ${
                              isActive ? "bg-blue-600 border-background scale-110 shadow-md shadow-blue-500/50" : "bg-card border-border/60 group-hover:border-blue-500/30"
                            }`} 
                          />
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center p-1.5 border border-border shadow-sm overflow-hidden">
                              {exp.logo ? <img src={exp.logo} alt={exp.company} className="object-contain w-full h-full" /> : <Briefcase className="text-slate-400 dark:text-slate-600 w-5 h-5" />}
                            </div>
                            <div className="min-w-0 flex-1 text-left">
                              <h4 className="font-heading font-bold text-sm text-foreground group-hover:text-blue-500 transition-colors truncate leading-snug">
                                {exp.role}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-0.5 truncate font-semibold">
                                {exp.company}
                              </p>
                            </div>
                            <ChevronRight size={14} className={`text-slate-400 shrink-0 transition-transform duration-300 ${isActive ? "translate-x-0 text-blue-500" : "-translate-x-1 opacity-0 group-hover:opacity-100"}`} />
                          </div>
                        </div>

                        {/* Mobile detail panel — shown inline below active card */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              key={`career-detail-${idx}`}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="lg:hidden overflow-hidden mt-2"
                            >
                              <div className="rounded-xl border border-border bg-slate-50/80 dark:bg-slate-900/30 p-4 relative overflow-hidden">
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

              <div className="hidden lg:block lg:col-span-7 h-full">
                <div className="h-full rounded-2xl border border-border bg-slate-50/50 dark:bg-slate-900/10 backdrop-blur-sm p-6 relative overflow-hidden shadow-inner flex flex-col justify-between">
                  <div className="absolute inset-0 bg-grid opacity-[0.08] pointer-events-none" />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCareerIndex}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="flex-grow flex flex-col justify-between h-full relative z-10"
                    >
                      <MissionDebrief exp={careerExperiences[activeCareerIndex]} t={t} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* === COMPETITIVE EXPERIENCE HEADING === */}
            {flattenedCompetitions.length > 0 && (
              <>
                <AnimatedSection>
                  <div className="mb-10 pt-6 border-t border-border/40 relative">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold flex items-center gap-3 mb-3 text-foreground">
                      <Trophy size={28} className="text-blue-500" />
                      {t("Competitive Experience") || "Competitive Experience"}
                    </h2>
                    <p className="text-muted-foreground text-sm max-w-2xl">
                      {t("Competitive Experience Subtitle") || "Inovasi dan pencapaian melalui kompetisi tingkat nasional."}
                    </p>

                    {/* Coura Peace mascot - near competitive experience */}
                    <motion.img
                      src="/Coura - Peace.png"
                      alt="Coura mascot celebrating"
                      className="absolute -right-2 sm:right-0 -top-4 w-16 sm:w-20 h-auto drop-shadow-md select-none hidden md:block pointer-events-none"
                      animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                      draggable={false}
                    />
                  </div>
                </AnimatedSection>

                  {/* === INTERACTIVE TIMELINE WORKSPACE FOR COMPETITIONS === */}
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch mb-12 lg:mb-24">
                  <div className="lg:col-span-5 flex flex-col gap-3.5 lg:pr-1 w-full min-w-0">
                    <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                      COMPETITION_NODE_DIRECTORY
                    </h3>
                    <div className="flex flex-col gap-3 relative pl-4 border-l-2 border-border/50 overflow-hidden">
                      {flattenedCompetitions.map((comp, idx) => {
                        const isActive = activeCompIndex === idx;
                        const theme = COMPETITION_THEMES[idx % COMPETITION_THEMES.length];
                        return (
                          <AnimatedSection key={comp.id} delay={idx * 0.05} className="w-full min-w-0">
                            <div
                              onClick={() => setActiveCompIndex(idx)}
                              className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col group w-full min-w-0 overflow-hidden ${
                                isActive
                                  ? "bg-slate-50 dark:bg-slate-900 border-blue-500/30 shadow-[0_4px_20px_rgba(37,99,235,0.03)]"
                                  : "bg-card border-border/60 hover:border-blue-500/20"
                              }`}
                            >
                              <div className={`absolute -left-[23px] top-[26px] w-3 h-3 rounded-full border-2 transition-all ${isActive ? "bg-blue-600 border-background scale-110 shadow-md shadow-blue-500/50" : "bg-card border-border/60 group-hover:border-blue-500/30"}`} />
                              <div className="flex items-center gap-3">
                                <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center border border-border shadow-sm overflow-hidden ${comp.logo ? 'p-0' : `p-1.5 ${theme.bg} ${theme.border}`}`}>
                                  {comp.logo ? (
                                    <img src={comp.logo} alt={comp.title} className="object-cover w-full h-full" />
                                  ) : (
                                    <Trophy className={`${theme.primary} w-5 h-5`} />
                                  )}
                                </div>
                                <div className="min-w-0 flex-1 text-left">
                                  <span className="font-mono text-[9px] text-slate-400 block mb-0.5">{comp.period}</span>
                                  <h4 className="font-heading font-bold text-sm text-foreground group-hover:text-blue-500 transition-colors truncate leading-snug">
                                    {comp.role}
                                  </h4>
                                  <p className="text-xs text-muted-foreground mt-0.5 truncate font-semibold">
                                    {comp.title}
                                  </p>
                                </div>
                                <ChevronRight size={14} className={`text-slate-400 shrink-0 transition-transform duration-300 ${isActive ? "translate-x-0 text-blue-500" : "-translate-x-1 opacity-0 group-hover:opacity-100"}`} />
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2.5">
                                <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold tracking-wide flex items-center gap-0.5 ${theme.pill}`}>
                                  🏆 {comp.award}
                                </span>
                              </div>
                            </div>

                            {/* Mobile detail panel — shown inline below active card */}
                            <AnimatePresence>
                              {isActive && (
                                <motion.div
                                  key={`comp-detail-${idx}`}
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="lg:hidden overflow-hidden mt-2 w-full max-w-full"
                                >
                                  <div className="rounded-xl border border-border bg-slate-50/80 dark:bg-slate-900/30 p-3 w-full max-w-full overflow-hidden">
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

                  <div className="hidden lg:block lg:col-span-7 h-full">
                    <div className="h-full rounded-2xl border border-border bg-slate-50/50 dark:bg-slate-900/10 backdrop-blur-sm p-6 relative overflow-hidden shadow-inner flex flex-col justify-between">
                      <div className="absolute inset-0 bg-grid opacity-[0.08] pointer-events-none" />
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeCompIndex}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.25 }}
                          className="flex-grow flex flex-col justify-between h-full relative z-10"
                        >
                          <CompetitionDebrief comp={flattenedCompetitions[activeCompIndex]} theme={COMPETITION_THEMES[activeCompIndex % COMPETITION_THEMES.length]} />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </>
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
    <div className="flex flex-col space-y-4 text-left">

      {/* Debrief Header */}
      <div className="flex flex-row gap-3 pb-4 border-b border-border/50 items-center">
        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white flex items-center justify-center p-2 border border-border shadow-sm">
          {exp.logo ? (
            <img src={exp.logo} alt={exp.company} className="object-contain w-full h-full" />
          ) : (
            <Briefcase className="text-muted-foreground/45 w-5 h-5" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <span className="font-mono text-[10px] text-blue-500 font-bold uppercase tracking-wider block leading-none mb-1">MISSION_DEBRIEF</span>
          <h3 className="text-base sm:text-lg font-heading font-extrabold text-foreground leading-snug tracking-tight break-words">
            {exp.role}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5 line-clamp-1">
            {exp.company}
          </p>
        </div>
      </div>

      {/* Description Logs */}
      <div className="space-y-3">
        <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
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

      {/* Debrief Header */}
      <div className="flex flex-row gap-3 pb-4 border-b border-border/50 items-center min-w-0">
        <div className={`flex-shrink-0 w-9 h-9 rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center border border-border shadow-sm overflow-hidden ${comp.logo ? 'p-0' : `p-1.5 ${theme.bg} ${theme.border}`}`}>
          {comp.logo ? (
            <img src={comp.logo} alt={comp.title} className="object-cover w-full h-full" />
          ) : (
            <Trophy className={`${theme.primary} w-4 h-4`} />
          )}
        </div>
        <div className="min-w-0 flex-1 overflow-hidden">
          <span className="font-mono text-[10px] text-blue-500 font-bold uppercase tracking-wider block leading-none mb-1">COMPETITION_DEBRIEF</span>
          <h3 className="text-sm font-heading font-extrabold text-foreground leading-snug tracking-tight break-words">
            {comp.role}
          </h3>
          <p className="text-xs font-semibold text-slate-500 mt-0.5 break-words">
            {comp.title}
          </p>
        </div>
      </div>

      {/* Award & Project Metadata */}
      <div className="flex flex-wrap gap-1.5 min-w-0">
        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 max-w-full truncate ${theme.pill}`}>
          🏆 {comp.award}
        </span>
        {comp.project && (
          <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded border border-border bg-slate-50 dark:bg-slate-900 text-foreground/80 flex items-center gap-1 max-w-full truncate">
            <span className={theme.text}>⚡</span> {comp.project}
          </span>
        )}
      </div>

      {/* What was built */}
      {comp.what_was_built && (
        <div className="space-y-1.5 min-w-0">
          <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" x2="18" y1="12" y2="12"/><line x1="6" x2="2" y1="12" y2="12"/><line x1="12" x2="12" y1="6" y2="2"/><line x1="12" x2="12" y1="22" y2="18"/></svg>
            WHAT_WAS_BUILT
          </h4>
          <div className={`p-2.5 rounded-lg border text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 font-medium break-words overflow-hidden ${theme.boxBg}`}>
            {comp.what_was_built}
          </div>
        </div>
      )}

      {/* Impact & Achievements */}
      {comp.impact_achievements && comp.impact_achievements.length > 0 && (
        <div className="space-y-1.5 min-w-0">
          <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
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

export default Experience;
