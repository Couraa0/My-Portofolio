import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Loader2, MapPin, Terminal, Calendar, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import AnimatedSection from "./AnimatedSection";
import { useEffect, useState } from "react";
import {
  getExperiences,
  getEducation,
  type Experience as DBExp,
  type Education as DBEdu,
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
}

interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  period: string;
  gpa: string;
  logo?: string;
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
  };
}

function adaptEdu(e: DBEdu): Education {
  return {
    id: e.id!,
    degree: e.degree,
    school: e.school,
    location: e.location,
    period: e.period,
    gpa: e.gpa,
    logo: e.logo_url,
  };
}


const Experience = () => {
  const { t } = useTranslation();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    Promise.all([getExperiences(), getEducation()])
      .then(([expData, eduData]) => {
        const expMapped = expData.map(adaptExp);
        setExperiences(expMapped);
        setEducation(eduData.map(adaptEdu));
        if (expMapped.length > 0) {
          setActiveIndex(0);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="experience" className="py-24 bg-background relative z-10 overflow-hidden text-left">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">

        {/* === KARIER HEADING === */}
        <AnimatedSection>
          <div className="mb-10 pb-6 border-b border-border/60">
            <h2 className="font-heading text-2xl md:text-3xl font-bold flex items-center gap-3 mb-3 text-foreground">
              <Briefcase size={28} className="text-blue-500" />
              {t("Experience")}
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl">
              {t("Experience Subtitle")}
            </p>
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
        {!loading && !error && experiences.length > 0 && (
          <>
            {/* === INTERACTIVE TIMELINE WORKSPACE === */}
            <div className="grid lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch mb-24">
              
              {/* LEFT TIMELINE PIPELINE: Directory / Node indicators (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-3.5 pr-1">
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                  CAREER_NODE_DIRECTORY
                </h3>

                <div className="flex flex-col gap-3 relative pl-4 border-l-2 border-border/50">
                  {experiences.map((exp, idx) => {
                    const isActive = activeIndex === idx;
                    
                    return (
                      <AnimatedSection key={exp.id} delay={idx * 0.05} className="w-full">
                        <div
                          onClick={() => setActiveIndex(idx)}
                          className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col group ${
                            isActive
                              ? "bg-slate-50 dark:bg-slate-900 border-blue-500/30 shadow-[0_4px_20px_rgba(37,99,235,0.03)]"
                              : "bg-card border-border/60 hover:border-blue-500/20"
                          }`}
                        >
                          {/* Active Circle node on the border-l line */}
                          <div 
                            className={`absolute -left-[23px] top-[26px] w-3 h-3 rounded-full border-2 transition-all ${
                              isActive ? "bg-blue-600 border-background scale-110 shadow-md shadow-blue-500/50" : "bg-card border-border/60 group-hover:border-blue-500/30"
                            }`} 
                          />

                          <div className="flex items-center gap-3">
                            {/* Company Logo Thumbnail */}
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center p-1.5 border border-border shadow-sm overflow-hidden">
                              {exp.logo ? (
                                <img 
                                  src={exp.logo} 
                                  alt={exp.company} 
                                  className="object-contain w-full h-full"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    const parent = e.currentTarget.parentElement;
                                    const fallback = parent?.querySelector('.fallback-icon');
                                    if (fallback) {
                                      (fallback as HTMLElement).classList.remove('hidden');
                                      (fallback as HTMLElement).classList.add('flex');
                                    }
                                  }}
                                />
                              ) : null}
                              <Briefcase 
                                className={`text-slate-400 dark:text-slate-600 w-5 h-5 fallback-icon ${exp.logo ? 'hidden' : 'flex'}`} 
                              />
                            </div>

                            <div className="min-w-0 flex-1 text-left">
                              <h4 className="font-heading font-bold text-sm text-foreground group-hover:text-blue-500 transition-colors truncate leading-snug">
                                {exp.role}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-0.5 truncate font-semibold">
                                {exp.company}
                              </p>
                            </div>
                            <ChevronRight 
                              size={14} 
                              className={`text-slate-400 shrink-0 transition-transform duration-300 ${isActive ? "translate-x-0 text-blue-500" : "-translate-x-1 opacity-0 group-hover:opacity-100"}`} 
                            />
                          </div>

                          {/* Expandable description panel inside the card (ONLY visible on mobile/tablets) */}
                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1, marginTop: "12px" }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="lg:hidden w-full overflow-hidden border-t border-border/50 pt-4"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MissionDebrief exp={exp} t={t} />
                              </motion.div>
                            )}
                          </AnimatePresence>

                        </div>
                      </AnimatedSection>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT CAREER SHEETS: Mission Debrief (7 cols) - Hidden on Mobile */}
              <div className="hidden lg:block lg:col-span-7 h-full">
                <div className="h-full rounded-2xl border border-border bg-slate-50/50 dark:bg-slate-900/10 backdrop-blur-sm p-6 relative overflow-hidden shadow-inner flex flex-col justify-between">
                  <div className="absolute inset-0 bg-grid opacity-[0.08] pointer-events-none" />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="flex-grow flex flex-col justify-between h-full relative z-10"
                    >
                      <MissionDebrief exp={experiences[activeIndex]} t={t} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>

            {/* === PENDIDIKAN === */}
            <AnimatedSection>
              <div className="mb-10 pt-6 border-t border-border/40">
                <h2 className="font-heading text-2xl md:text-3xl font-bold flex items-center gap-3 mb-3 text-foreground">
                  <GraduationCap size={28} className="text-blue-500" />
                  {t("Education")}
                </h2>
                <p className="text-muted-foreground text-sm max-w-2xl">
                  {t("Education Subtitle")}
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {education.map((edu, index) => (
                <AnimatedSection key={edu.id} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="group p-5 rounded-2xl bg-card border border-border/60 shadow-sm flex items-start gap-4 h-full transition-all hover:border-blue-500/20 hover:shadow-md hover:shadow-blue-500/5"
                  >
                    {/* School Logo */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white dark:bg-slate-950 flex items-center justify-center p-2 border border-border shadow-sm">
                      {edu.logo ? (
                        <img 
                          src={edu.logo} 
                          alt={edu.school} 
                          className="object-contain w-full h-full"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const parent = e.currentTarget.parentElement;
                            const fallback = parent?.querySelector('.fallback-icon');
                            if (fallback) {
                              (fallback as HTMLElement).classList.remove('hidden');
                              (fallback as HTMLElement).classList.add('flex');
                            }
                          }}
                        />
                      ) : null}
                      <GraduationCap 
                        className={`text-slate-400 dark:text-slate-600 w-6 h-6 fallback-icon ${edu.logo ? 'hidden' : 'flex'}`} 
                      />
                    </div>

                    <div className="flex-1 flex flex-col min-w-0 text-left">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 className="font-heading font-bold text-base text-foreground group-hover:text-blue-500 transition-colors line-clamp-2 leading-snug">
                          {edu.school}
                        </h3>
                        {edu.gpa && (
                          <span className="font-mono text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-500/5 px-2 py-0.5 border border-blue-500/10 rounded shrink-0">
                            {parseFloat(edu.gpa) > 4.0 ? `Grade: ${edu.gpa}` : `GPA: ${edu.gpa}`}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {edu.degree}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono mt-auto pt-2 border-t border-border/30 w-full">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {edu.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {edu.period}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
};

/* ── MISSION DEBRIEF CARD COMPONENT ── */

const MissionDebrief = ({ exp, t }: { exp: Experience; t: any }) => {
  return (
    <div className="flex flex-col h-full justify-between space-y-6 text-left">
      
      {/* Debrief Header */}
      <div className="flex flex-col md:flex-row gap-5 pb-5 border-b border-border/50 items-start md:items-center">
        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white flex items-center justify-center p-2.5 border border-border shadow-sm">
          {exp.logo ? (
            <img src={exp.logo} alt={exp.company} className="object-contain w-full h-full" />
          ) : (
            <Briefcase className="text-muted-foreground/45 w-6 h-6" />
          )}
        </div>
        
        <div className="min-w-0 flex-1">
          <span className="font-mono text-[11px] text-blue-500 font-bold uppercase tracking-wider block">MISSION_DEBRIEF</span>
          <h3 className="text-lg sm:text-xl font-heading font-extrabold text-foreground leading-snug tracking-tight break-words">
            {exp.role}
          </h3>
          <p className="text-base font-semibold text-slate-500 truncate mt-0.5">
            {exp.company}
          </p>
        </div>
      </div>

      {/* Description Logs */}
      <div className="space-y-4 flex-1">
        <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">
          LOG_REPORTS
        </h4>
        <ul className="space-y-3 font-mono text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {exp.description?.map((desc, i) => (
            <li key={i} className="flex gap-2.5 items-start">
              <span className="text-blue-500 font-bold select-none">&gt;</span>
              <span>{desc}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Skills badging */}
      {exp.tools && exp.tools.length > 0 && (
        <div className="pt-4 border-t border-border/50 shrink-0">
          <h4 className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">COMPILED_SKILLS</h4>
          <div className="flex flex-wrap gap-1.5">
            {exp.tools.map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-1.5 text-xs font-bold font-mono bg-blue-500/5 text-blue-600 dark:text-blue-400 border border-blue-500/10 rounded-md"
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

export default Experience;
