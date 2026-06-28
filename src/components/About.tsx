import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { GraduationCap, Briefcase, Rocket, Download, Terminal, Settings, ShieldCheck, Loader2, MapPin, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCVLink } from "@/hooks/useCVLink";
import { useEffect, useState } from "react";
import { getEducation, type Education as DBEdu } from "@/lib/supabase";

interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  period: string;
  gpa: string;
  logo?: string;
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

const cards = [
  {
    icon: <GraduationCap size={18} />,
    title: "S1 Sistem Informasi Title",
    sub: "S1 Sistem Informasi Sub",
    nodeId: "EDU_01",
    iconBg: "hsl(215 100% 55% / 0.08)", iconColor: "hsl(215 100% 50%)", border: "border-blue-500/20 hover:border-blue-500/50 shadow-blue-500/5",
  },
  {
    icon: <Rocket size={18} />,
    title: "Co-Founder Tixchain Title",
    sub: "Co-Founder Tixchain Sub",
    nodeId: "FOUNDER_02",
    iconBg: "hsl(158 80% 42% / 0.08)", iconColor: "hsl(158 80% 40%)", border: "border-emerald-500/20 hover:border-emerald-500/50 shadow-emerald-500/5",
  },
  {
    icon: <Briefcase size={18} />,
    title: "IT PM Intern Title",
    sub: "IT PM Intern Sub",
    nodeId: "PM_03",
    iconBg: "hsl(220 90% 56% / 0.08)", iconColor: "hsl(220 90% 50%)", border: "border-indigo-500/20 hover:border-indigo-500/50 shadow-indigo-500/5",
  },
];

const bars = [
  { label: "Project + Product Management", pct: 90, color: "hsl(215 100% 55%)", trail: "hsl(215 100% 55% / 0.12)" },
  { label: "Web Development", pct: 85, color: "hsl(196 100% 47%)", trail: "hsl(196 100% 47% / 0.12)" },
  { label: "Team Leadership", pct: 92, color: "hsl(220 90% 56%)", trail: "hsl(220 90% 56% / 0.12)" },
];

const About = () => {
  const { t } = useTranslation();
  const { cvLink } = useCVLink();
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEducation()
      .then((data) => {
        setEducation(data.map(adaptEdu));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { value: "3.97", label: t("GPA"), from: "hsl(215 100% 55%)", to: "hsl(196 100% 47%)" },
    { value: "15+", label: t("Projects"), from: "hsl(220 90% 56%)", to: "hsl(196 100% 40%)" },
    { value: "3+", label: t("Yrs Exp"), from: "hsl(215 100% 50%)", to: "hsl(220 90% 56%)" },
  ];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden text-left">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(215 100% 55% / 0.25), transparent)" }} />
      
      {/* Glow Orbs */}
      <div className="absolute top-1/3 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold mb-4 border"
              style={{ background: "hsl(215 100% 55% / 0.08)", borderColor: "hsl(215 100% 55% / 0.2)", color: "hsl(215 100% 50%)" }}>
              <Terminal size={12} className="text-sky-500" />
              {t("Who I Am")}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              {t("About Me").split(" ")[0]} <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">{t("About Me").split(" ")[1]}</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* Main grid — 3 columns on lg: photo | text | cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[290px_1fr_290px] gap-8 lg:gap-10 items-start max-w-6xl mx-auto">

          {/* ── Photo column (Simulated Diagnostic Card) ── */}
          <AnimatedSection delay={0.05} className="w-full">
            <div className="flex flex-col items-center lg:sticky lg:top-32 gap-6 w-full">
              
              {/* Photo frame */}
              <div className="relative p-3.5 rounded-3xl border border-border bg-card shadow-sm w-full">
                
                {/* Tech brackets for HUD look */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-blue-500 rounded-tl" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-blue-500 rounded-tr" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-blue-500 rounded-bl" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-blue-500 rounded-br" />

                <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[4/5] w-full"
                  style={{ boxShadow: "0 10px 30px hsl(215 100% 55% / 0.08)" }}>

                  {/* Photo */}
                  <img
                    src="/Rakha-Formal-NoBg.png"
                    alt="Muhammad Rakha Syamputra"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                    draggable={false}
                  />

                  {/* Bottom gradient fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 z-10"
                    style={{ background: "linear-gradient(to top, hsl(var(--background)) 15%, transparent)" }} />
                </div>

                {/* Cyber Diagnostic Data Overlay */}
                <div className="mt-4 pt-3.5 border-t border-border/60 text-left font-mono text-[9px] space-y-1.5 text-slate-500 dark:text-slate-400">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1"><ShieldCheck size={10} className="text-emerald-500" /> SYSTEM_STATUS:</span>
                    <span className="text-emerald-500 font-bold">ONLINE [NOMINAL]</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BIO_SECTOR:</span>
                    <span>WEST_JAVA_IDN</span>
                  </div>
                  <div className="flex justify-between">
                    <span>AUTHORIZED:</span>
                    <span>LVL_4_DEV_PM</span>
                  </div>
                </div>

              </div>

              {/* Mini stats */}
              <div className="flex gap-3.5 w-full justify-center">
                {stats.map((s) => (
                  <div key={s.label} className="flex-1 rounded-2xl p-3 text-center bg-card border border-border shadow-sm hover:border-blue-500/20 transition-all">
                    <p className="font-heading font-extrabold text-sm bg-clip-text text-transparent"
                      style={{ backgroundImage: `linear-gradient(135deg, ${s.from}, ${s.to})` }}>
                      {s.value}
                    </p>
                    <p className="text-[9px] font-mono text-muted-foreground mt-0.5 uppercase tracking-wide">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Download CV */}
              <motion.a
                href={cvLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-full px-5 py-3 text-xs font-bold text-white w-full justify-center shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                style={{ background: "linear-gradient(135deg, hsl(215 100% 55%), hsl(196 100% 47%))" }}>
                <Download size={13} /> {t("Download CV")}
              </motion.a>
            </div>
          </AnimatedSection>

          {/* ── Text + bars column (Simulated Terminal Terminal Console) ── */}
          <AnimatedSection delay={0.15} className="w-full">
            <div className="space-y-6">
              
              {/* Directory Bar */}
              <div className="flex items-center justify-between font-mono text-[10px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60 px-4 py-2.5 rounded-xl border border-border/50">
                <span className="flex items-center gap-2"><Terminal size={12} className="text-blue-500" /> ~/profile/biography</span>
                <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded text-[8px] font-bold">utf-8</span>
              </div>

              {/* Console Output */}
              <div className="font-mono text-xs bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-border/50 space-y-4 leading-relaxed text-slate-600 dark:text-slate-300">
                <p>
                  <span className="text-blue-500 font-bold mr-2">&gt; [LOG] bio_init.sh:</span> 
                  {t("About Paragraph 1")}
                </p>
                <p>
                  <span className="text-sky-500 font-bold mr-2">&gt; [LOG] load_competence.sh:</span> 
                  {t("About Paragraph 2")}
                </p>
                <p>
                  <span className="text-indigo-500 font-bold mr-2">&gt; [LOG] exec_vision.sh:</span> 
                  {t("About Paragraph 3")}
                </p>
              </div>

              {/* Skill bars */}
              <div className="space-y-4 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                  <Settings size={12} className="text-slate-400 animate-spin" style={{ animationDuration: '4s' }} />
                  {t("Core Proficiencies")}
                </p>
                
                {bars.map((s) => (
                  <div key={s.label} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-foreground">{s.label}</span>
                      <span className="font-bold text-blue-600">{s.pct}%</span>
                    </div>
                    <div className="h-2.5 rounded-full p-0.5 bg-slate-100 dark:bg-slate-900 shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: s.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* ── Card column (Node Indicators) ── */}
          <AnimatedSection delay={0.25} className="w-full">
            <div className="space-y-4 w-full">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-5">
                SYSTEM_NODES
              </p>
              
              {cards.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 15 }} 
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: -3 }}
                  className={`relative flex gap-4 items-start rounded-2xl p-4 bg-card border border-border transition-all duration-300 shadow-sm group overflow-hidden ${item.border}`}
                >
                  {/* Top-Right Node ID watermark */}
                  <span className="absolute top-2 right-2.5 font-mono text-[8px] text-slate-400 dark:text-slate-600 font-bold group-hover:text-blue-500/50 transition-colors">
                    {item.nodeId}
                  </span>

                  {/* Icon */}
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                    style={{ background: item.iconBg, color: item.iconColor }}>
                    {item.icon}
                  </div>

                  <div className="text-left min-w-0 pr-6">
                    <p className="font-heading font-bold text-foreground text-xs leading-snug truncate">
                      {t(item.title)}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                      {t(item.sub)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* === PENDIDIKAN (EDUCATION) === */}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-12 text-muted-foreground mt-10">
            <Loader2 size={20} className="animate-spin text-blue-500" />
            <span className="text-xs">{t("Loading data...")}</span>
          </div>
        )}

        {!loading && error && (
          <div className="flex items-center justify-center py-10 text-muted-foreground text-xs mt-10">
            {t("Failed to load data")}: {error}
          </div>
        )}

        {!loading && !error && education.length > 0 && (
          <div className="mt-20">
            <AnimatedSection>
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold mb-4 border"
                  style={{ background: "hsl(215 100% 55% / 0.08)", borderColor: "hsl(215 100% 55% / 0.2)", color: "hsl(215 100% 50%)" }}>
                  <GraduationCap size={12} className="text-sky-500" />
                  {t("Education")}
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                  {t("Education")}
                </h2>
                <p className="text-muted-foreground text-sm max-w-2xl mx-auto mt-3">
                  {t("Education Subtitle")}
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
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
          </div>
        )}

      </div>
    </section>
  );
};

export default About;
