import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { GraduationCap, Briefcase, Rocket, Download } from "lucide-react";
import { useTranslation } from "react-i18next";

const cards = [
  {
    icon: <GraduationCap size={20} />,
    title: "S1 Sistem Informasi, UNSIKA",
    sub: "2023 – Sekarang · IPK 3,97",
    iconBg: "hsl(250 84% 60% / 0.1)", iconColor: "hsl(250 84% 50%)", border: "hsl(250 84% 60% / 0.18)",
  },
  {
    icon: <Rocket size={20} />,
    title: "Co-Founder Tixchain.id",
    sub: "2023 – Sekarang",
    iconBg: "hsl(344 85% 60% / 0.1)", iconColor: "hsl(344 85% 50%)", border: "hsl(344 85% 60% / 0.18)",
  },
  {
    icon: <Briefcase size={20} />,
    title: "IT Project Manager Intern @ Citiasia Internasional",
    sub: "2025",
    iconBg: "hsl(158 80% 42% / 0.1)", iconColor: "hsl(158 80% 35%)", border: "hsl(158 80% 42% / 0.18)",
  },
];

const bars = [
  { label: "Project + Product Management", pct: 90, color: "hsl(250 84% 60%)", trail: "hsl(250 84% 60% / 0.12)" },
  { label: "Web Development", pct: 85, color: "hsl(196 100% 47%)", trail: "hsl(196 100% 47% / 0.12)" },
  { label: "Team Leadership", pct: 92, color: "hsl(158 80% 42%)", trail: "hsl(158 80% 42% / 0.12)" },
];

const About = () => {
  const { t } = useTranslation();
  
  const stats = [
    { value: "3.97", label: t("GPA"), from: "hsl(250 84% 60%)", to: "hsl(196 100% 47%)" },
    { value: "10+", label: t("Projects"), from: "hsl(344 85% 58%)", to: "hsl(37 100% 50%)" },
    { value: "3+", label: t("Yrs Exp"), from: "hsl(158 72% 38%)", to: "hsl(196 100% 47%)" },
  ];

  return (
  <section id="about" className="py-24 bg-background relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px"
      style={{ background: "linear-gradient(90deg, transparent, hsl(250 84% 60% / 0.2), transparent)" }} />
    {/* Floating Doodles - Positioned near Title */}
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="hidden md:block absolute top-28 left-[12%] opacity-[0.4] text-blue-500 z-0">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="hsl(196 100% 47%)" fillOpacity={0.15} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m14 2 8 8" />
        <path d="m6 10-4 4v4h4l4-4" />
        <path d="M9 7c1 0 2 1 3 3" />
      </svg>
    </motion.div>

    <motion.div
      animate={{ rotate: [-5, 5, -5] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="hidden md:block absolute top-28 right-[12%] opacity-[0.4] text-orange-500 z-0">
      <svg width="45" height="45" viewBox="0 0 24 24" fill="hsl(37 100% 50%)" fillOpacity={0.15} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    </motion.div>

    <div className="container mx-auto px-6">
      <AnimatedSection>
        <div className="text-center mb-20">
          <span className="inline-block rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold mb-4"
            style={{ background: "hsl(250 84% 60% / 0.08)", border: "1px solid hsl(250 84% 60% / 0.2)", color: "hsl(250 84% 50%)" }}>
            {t("Who I Am")}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            {t("About Me").split(" ")[0]} <span className="text-gradient">{t("About Me").split(" ")[1]}</span>
          </h2>
        </div>
      </AnimatedSection>

      {/* Main grid — 3 columns on lg: photo | text | cards */}
      <div className="grid lg:grid-cols-[280px_1fr_280px] gap-10 items-start">

        {/* ── Photo column ── */}
        <AnimatedSection delay={0.05}>
          <div className="flex flex-col items-center lg:sticky lg:top-32 gap-5">
            {/* Photo frame */}
            <div className="relative">
              {/* Gradient ring */}
              <div className="absolute -inset-1 rounded-[2rem] opacity-40 blur-sm"
                style={{ background: "linear-gradient(135deg, hsl(250 84% 60%), hsl(196 100% 47%), hsl(344 85% 60%))" }} />

              <div className="relative rounded-[1.75rem] overflow-hidden bg-background"
                style={{ width: 240, height: 300, boxShadow: "0 20px 48px hsl(250 84% 60% / 0.15), 0 4px 16px hsl(var(--foreground) / 0.15)" }}>
                {/* Colour accent bar top */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-[1.75rem] z-10"
                  style={{ background: "linear-gradient(90deg, hsl(250 84% 60%), hsl(196 100% 47%), hsl(344 85% 60%))" }} />

                {/* Photo */}
                <img
                  src="/Rakha-Formal-NoBg.png"
                  alt="Muhammad Rakha Syamputra"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[95%] object-contain object-bottom"
                  draggable={false}
                />
                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-16"
                  style={{ background: "linear-gradient(to top, hsl(var(--background)) 30%, transparent)" }} />
              </div>
            </div>

            {/* Mini stats */}
            <div className="flex gap-3 w-full justify-center">
              {stats.map((s) => (
                <div key={s.label} className="flex-1 rounded-2xl p-3 text-center bg-card border shadow-sm">
                  <p className="font-heading font-extrabold text-base bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${s.from}, ${s.to})` }}>
                    {s.value}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Download CV */}
            <motion.a
              href="https://drive.google.com/file/d/1JHdnHLOJfDU3Wf3jK1hrfgMrzbeGfQdT/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-white w-full justify-center"
              style={{ background: "linear-gradient(135deg, hsl(250 84% 60%), hsl(196 100% 47%))", boxShadow: "0 4px 16px hsl(250 84% 60% / 0.25)" }}>
              <Download size={13} /> {t("Download CV")}
            </motion.a>
          </div>
        </AnimatedSection>

        {/* ── Text + bars column ── */}
        <AnimatedSection delay={0.15}>
          <div className="space-y-5 text-muted-foreground leading-relaxed text-[15px]">
            <p>
              {t("About Paragraph 1")}
            </p>
            <p>
              {t("About Paragraph 2")}
            </p>
            <p>
              {t("About Paragraph 3")}
            </p>

            {/* Skill bars */}
            <div className="space-y-4 pt-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{t("Core Proficiencies")}</p>
              {bars.map((s) => (
                <div key={s.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-foreground">{s.label}</span>
                    <span className="font-semibold" style={{ color: s.color }}>{s.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: s.trail }}>
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

        {/* ── Card column ── */}
        <AnimatedSection delay={0.25}>
          <div className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-5">{t("Highlights")}</p>
            {cards.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ x: -4 }}
                className="flex gap-4 items-start rounded-2xl p-4 bg-background border transition-all duration-300"
                style={{ borderColor: item.border, boxShadow: `0 2px 12px ${item.iconBg}` }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${item.iconBg}`}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 12px ${item.iconBg}`}>
                <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: item.iconBg, color: item.iconColor }}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground text-[13px] leading-snug">{t(item.title)}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">{t(item.sub)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
  );
};

export default About;
