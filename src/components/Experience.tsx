import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { experiences } from "@/data/experience";
import { ChevronDown, MapPin, Calendar, Briefcase, Users, Award } from "lucide-react";

const palette = [
  { dot: "hsl(250 84% 60%)", shadow: "hsl(250 84% 60% / 0.25)", tag: "hsl(250 84% 50%)", tagBg: "hsl(250 84% 60% / 0.09)", border: "hsl(250 84% 60% / 0.18)", glow: "hsl(250 84% 60% / 0.12)", icon: "hsl(250 84% 55%)" },
  { dot: "hsl(196 100% 42%)", shadow: "hsl(196 100% 42% / 0.25)", tag: "hsl(196 100% 30%)", tagBg: "hsl(196 100% 42% / 0.09)", border: "hsl(196 100% 42% / 0.18)", glow: "hsl(196 100% 42% / 0.12)", icon: "hsl(196 100% 36%)" },
  { dot: "hsl(344 85% 58%)", shadow: "hsl(344 85% 58% / 0.25)", tag: "hsl(344 85% 48%)", tagBg: "hsl(344 85% 58% / 0.09)", border: "hsl(344 85% 58% / 0.18)", glow: "hsl(344 85% 58% / 0.12)", icon: "hsl(344 85% 53%)" },
  { dot: "hsl(158 72% 38%)", shadow: "hsl(158 72% 38% / 0.25)", tag: "hsl(158 72% 30%)", tagBg: "hsl(158 72% 38% / 0.09)", border: "hsl(158 72% 38% / 0.18)", glow: "hsl(158 72% 38% / 0.12)", icon: "hsl(158 72% 35%)" },
  { dot: "hsl(37 100% 50%)",  shadow: "hsl(37 100% 50% / 0.25)",  tag: "hsl(37 100% 36%)",  tagBg: "hsl(37 100% 50% / 0.09)",  border: "hsl(37 100% 50% / 0.18)",  glow: "hsl(37 100% 50% / 0.12)",  icon: "hsl(37 100% 40%)"  },
];

const roleIcons = [Briefcase, Award, Users, Award, Users];

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
              Work <span className="text-gradient-emerald">Experience</span>
            </h2>
            <p className="text-muted-foreground mt-3 text-sm">Klik kartu untuk melihat detail.</p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8 max-w-5xl mx-auto">
          {/* ── Sidebar nav ── */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-2">
              {experiences.map((exp, i) => {
                const cp = palette[i % palette.length];
                const Icon = roleIcons[i % roleIcons.length];
                const isActive = activeId === exp.id;
                return (
                  <button key={exp.id} onClick={() => setActiveId(exp.id)}
                    className="w-full text-left rounded-2xl p-4 transition-all duration-300 group relative overflow-hidden"
                    style={{
                      background: isActive ? "white" : "transparent",
                      border: `1px solid ${isActive ? cp.border : "hsl(220 20% 90%)"}`,
                      boxShadow: isActive ? `0 4px 24px ${cp.glow}` : "none",
                    }}>
                    {/* Active bar on left */}
                    {isActive && (
                      <motion.div layoutId="activeSidebar"
                        className="absolute left-0 top-3 bottom-3 w-1 rounded-full"
                        style={{ background: cp.dot }} />
                    )}

                    <div className="flex items-start gap-3 pl-2">
                      <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
                        style={{ background: isActive ? cp.tagBg : "hsl(220 20% 93%)" }}>
                        <Icon size={16} style={{ color: isActive ? cp.icon : "hsl(215 16% 55%)" }} />
                      </div>
                      <div className="min-w-0">
                        <p className={`font-heading font-semibold text-sm truncate ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                          {exp.company}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{exp.role}</p>
                        <div className="flex items-center gap-1 mt-1.5">
                          <Calendar size={10} className="text-muted-foreground flex-shrink-0" />
                          <span className="text-[10px] text-muted-foreground">{exp.period}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </AnimatedSection>

          {/* ── Detail panel ── */}
          <AnimatedSection delay={0.2}>
            <AnimatePresence mode="wait">
              <motion.div key={activeId}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="rounded-3xl bg-white p-8"
                style={{ border: `1px solid ${c.border}`, boxShadow: `0 8px 40px ${c.glow}` }}>

                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ background: c.tagBg, color: c.tag }}>
                        {active.period}
                      </span>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground">{active.company}</h3>
                    <p className="text-sm font-medium mt-1 flex items-center gap-1.5"
                      style={{ color: c.tag }}>
                      <Briefcase size={13} /> {active.role}
                    </p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: c.tagBg }}>
                    <span className="font-heading font-extrabold text-lg" style={{ color: c.dot }}>
                      {active.company.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${c.dot}30, transparent)` }} />

                {/* Description */}
                <div className="space-y-3 mb-6">
                  {active.description.map((d, j) => (
                    <motion.div key={j}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: j * 0.08 }}
                      className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full" style={{ background: c.dot }} />
                      {d}
                    </motion.div>
                  ))}
                </div>

                {/* Tools */}
                {active.tools && (
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Tools Used</p>
                    <div className="flex flex-wrap gap-2">
                      {active.tools.map((t, j) => (
                        <motion.span key={t}
                          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: j * 0.06 }}
                          className="rounded-full px-3 py-1.5 text-[11px] font-semibold"
                          style={{ background: c.tagBg, color: c.tag, border: `1px solid ${c.border}` }}>
                          {t}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Progress indicator */}
                <div className="mt-8">
                  <div className="flex gap-2">
                    {experiences.map((_, i) => (
                      <button key={i} onClick={() => setActiveId(experiences[i].id)}
                        className="h-1 rounded-full transition-all duration-500"
                        style={{
                          background: experiences[i].id === activeId ? c.dot : "hsl(220 20% 88%)",
                          width: experiences[i].id === activeId ? 24 : 8,
                        }} />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </AnimatedSection>
        </div>

        {/* ── Mobile accordion (hidden on lg+) ── */}
        <div className="lg:hidden mt-8 space-y-3 max-w-2xl mx-auto">
          {experiences.map((exp, i) => {
            const cp = palette[i % palette.length];
            const isOpen = expandedId === exp.id;
            return (
              <div key={exp.id} className="rounded-2xl bg-white overflow-hidden"
                style={{ border: `1px solid ${isOpen ? cp.border : "hsl(220 20% 90%)"}`, boxShadow: isOpen ? `0 4px 20px ${cp.glow}` : "none" }}>
                <button className="w-full flex items-center justify-between p-4 text-left"
                  onClick={() => setExpandedId(isOpen ? null : exp.id)}>
                  <div>
                    <p className="font-heading font-semibold text-sm text-foreground">{exp.company}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{exp.role} · {exp.period}</p>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown size={18} className="text-muted-foreground" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                      className="overflow-hidden border-t" style={{ borderColor: cp.border }}>
                      <div className="p-4 space-y-2">
                        {exp.description.map((d, j) => (
                          <p key={j} className="text-sm text-muted-foreground flex gap-2">
                            <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: cp.dot }} />
                            {d}
                          </p>
                        ))}
                        {exp.tools && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {exp.tools.map((t) => (
                              <span key={t} className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
                                style={{ background: cp.tagBg, color: cp.tag }}>
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
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
