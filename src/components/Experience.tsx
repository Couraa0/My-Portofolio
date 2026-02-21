import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { experiences } from "@/data/experience";
import { ChevronDown, MapPin, Calendar, Briefcase, Award } from "lucide-react";

const palette = [
  { dot: "hsl(250 84% 60%)", shadow: "hsl(250 84% 60% / 0.25)", tag: "hsl(250 84% 50%)", tagBg: "hsl(250 84% 60% / 0.09)", border: "hsl(250 84% 60% / 0.18)", glow: "hsl(250 84% 60% / 0.12)", icon: "hsl(250 84% 55%)" },
  { dot: "hsl(196 100% 42%)", shadow: "hsl(196 100% 42% / 0.25)", tag: "hsl(196 100% 30%)", tagBg: "hsl(196 100% 42% / 0.09)", border: "hsl(196 100% 42% / 0.18)", glow: "hsl(196 100% 42% / 0.12)", icon: "hsl(196 100% 36%)" },
  { dot: "hsl(344 85% 58%)", shadow: "hsl(344 85% 58% / 0.25)", tag: "hsl(344 85% 48%)", tagBg: "hsl(344 85% 58% / 0.09)", border: "hsl(344 85% 58% / 0.18)", glow: "hsl(344 85% 58% / 0.12)", icon: "hsl(344 85% 53%)" },
  { dot: "hsl(158 72% 38%)", shadow: "hsl(158 72% 38% / 0.25)", tag: "hsl(158 72% 30%)", tagBg: "hsl(158 72% 38% / 0.09)", border: "hsl(158 72% 38% / 0.18)", glow: "hsl(158 72% 38% / 0.12)", icon: "hsl(158 72% 35%)" },
  { dot: "hsl(37 100% 50%)", shadow: "hsl(37 100% 50% / 0.25)", tag: "hsl(37 100% 36%)", tagBg: "hsl(37 100% 50% / 0.09)", border: "hsl(37 100% 50% / 0.18)", glow: "hsl(37 100% 50% / 0.12)", icon: "hsl(37 100% 40%)" },
];

const roleIcons = [Briefcase, Award, Award, Award, Award];

const Experience = () => {
  const [activeId, setActiveId] = useState<number>(1);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const active = experiences.find((e) => e.id === activeId)!;
  const c = palette[(activeId - 1) % palette.length];

  return (
    <section id="experience" className="py-28 relative overflow-hidden" style={{ background: "hsl(220 20% 97%)" }}>
      {/* Decorative top/bottom lines */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(220 20% 86%), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(220 20% 86%), transparent)" }} />

      <div className="absolute inset-0 opacity-[0.3] bg-grid" />

      {/* Subtle background blob */}
      <div className="absolute top-20 right-0 w-80 h-80 rounded-full pointer-events-none opacity-[0.06]"
        style={{ background: `radial-gradient(circle, ${c.dot}, transparent 70%)`, transition: "background 0.6s" }} />

      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold mb-4"
              style={{ background: "hsl(196 100% 42% / 0.09)", border: "1px solid hsl(196 100% 42% / 0.25)", color: "hsl(196 100% 30%)" }}>
              My Journey
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              My <span className="text-gradient-emerald">Experience</span>
            </h2>
            <p className="text-muted-foreground mt-3 text-sm">Klik kartu untuk melihat detail.</p>
          </div>
        </AnimatedSection>

        {/* ── Desktop Layout (Visible only on lg screens) ── */}
        <div className="hidden lg:grid lg:grid-cols-[300px_1fr] gap-8 max-w-6xl mx-auto">
          {/* Sidebar Navigation */}
          <div className="space-y-3">
            {experiences.map((exp, i) => {
              const cp = palette[i % palette.length];
              const Icon = roleIcons[i % roleIcons.length];
              const isActive = activeId === exp.id;
              return (
                <motion.button
                  key={exp.id}
                  onClick={() => setActiveId(exp.id)}
                  whileHover={{ x: 5 }}
                  className="w-full text-left rounded-2xl p-5 transition-all duration-300 relative group overflow-hidden border"
                  style={{
                    background: isActive ? "white" : "transparent",
                    borderColor: isActive ? cp.border : "hsl(220 20% 90%)",
                    boxShadow: isActive ? `0 10px 30px ${cp.glow}` : "none",
                  }}
                >
                  {isActive && (
                    <motion.div layoutId="activeInd" className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: cp.dot }} />
                  )}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: isActive ? cp.tagBg : "hsl(220 20% 93%)" }}>
                      <Icon size={18} style={{ color: isActive ? cp.icon : "hsl(215 16% 55%)" }} />
                    </div>
                    <div className="min-w-0">
                      <h4 className={`font-heading font-bold text-sm truncate ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                        {exp.company}
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{exp.role}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Details Content Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="rounded-[2.5rem] bg-white p-10 border border-border shadow-2xl shadow-violet-500/5"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: c.tagBg, color: c.tag, border: `1px solid ${c.border}` }}>
                    <Calendar size={12} /> {active.period}
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-foreground tracking-tight">{active.company}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground font-medium">
                    <MapPin size={14} className="text-violet-500" />
                    <span>Location TBD</span>
                    <span className="mx-1 opacity-30">•</span>
                    <Briefcase size={14} className="text-violet-500" />
                    <span>{active.role}</span>
                  </div>
                </div>
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-inner"
                  style={{ background: `linear-gradient(135deg, ${c.tagBg}, white)` }}>
                  <span className="font-heading font-black text-3xl" style={{ color: c.dot }}>
                    {active.company.slice(0, 1).toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {active.description.map((point, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-transform group-hover:scale-150" style={{ background: c.dot }} />
                    <p className="text-muted-foreground leading-relaxed text-base">{point}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {active.tools?.map((tool) => (
                  <span key={tool} className="px-4 py-2 rounded-xl text-xs font-bold border border-border bg-secondary/50 text-foreground/80 hover:bg-white hover:shadow-md transition-all cursor-default">
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Mobile Accordion Layout (Visible only below lg) ── */}
        <div className="lg:hidden space-y-4 max-w-2xl mx-auto px-2">
          {experiences.map((exp, i) => {
            const cp = palette[i % palette.length];
            const isOpen = expandedId === exp.id;
            return (
              <div key={exp.id} className="rounded-3xl bg-white border border-border shadow-sm overflow-hidden transition-all duration-300"
                style={{
                  borderColor: isOpen ? cp.border : "hsl(var(--border))",
                  boxShadow: isOpen ? `0 12px 30px ${cp.glow}` : "none"
                }}>
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setExpandedId(isOpen ? null : exp.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl font-bold"
                      style={{ background: cp.tagBg, color: cp.dot }}>
                      {exp.company.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-foreground text-lg">{exp.company}</h4>
                      <p className="text-xs font-semibold text-muted-foreground tracking-wide uppercase">{exp.role}</p>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-muted-foreground">
                    <ChevronDown size={22} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-border/50">
                        <div className="mb-4 inline-flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-secondary/50 px-2 py-1 rounded">
                          <Calendar size={10} /> {exp.period}
                        </div>
                        <div className="space-y-3 mb-6">
                          {exp.description.map((d, j) => (
                            <div key={j} className="flex gap-3">
                              <div className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cp.dot }} />
                              <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {exp.tools?.map((t) => (
                            <span key={t} className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold border border-border bg-secondary/30 text-muted-foreground">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
