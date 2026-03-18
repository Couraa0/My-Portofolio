import { motion, Variants } from "framer-motion";
import { Github, Linkedin, ArrowDown, Sparkles, Briefcase, Instagram, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const } },
};

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-10 sm:pb-0 bg-background">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-background">
        {/* Graph Paper Grid */}
        <div className="absolute inset-0 opacity-[0.8] bg-graph-paper pointer-events-none"
          style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)" }} />

        {/* Soft Background Tint */}
        <div className="hidden md:block absolute inset-0"
          style={{ background: "radial-gradient(circle at center, transparent 30%, hsl(var(--hero-tint) / 0.7) 100%)" }} />

        {/* Decorative blobs */}
        <div className="hidden md:block absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.2] blur-[100px]"
          style={{ background: "radial-gradient(circle, hsl(196 100% 47%), transparent 70%)" }} />
        <div className="hidden md:block absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full opacity-[0.15] blur-[80px]"
          style={{ background: "radial-gradient(circle, hsl(215 100% 60%), transparent 70%)" }} />

        {/* ── Floating Doodles ── */}

        {/* Heart */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block absolute top-[15%] left-[40%] opacity-[0.4] text-rose-500 filter drop-shadow-sm z-0">
          <svg width="45" height="45" viewBox="0 0 24 24" fill="hsl(344 85% 60%)">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>

        {/* Rocket - Positioned between text and card */}
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, 10, 0], rotate: [20, 30, 20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute top-[45%] left-1/2 -translate-x-[280px] opacity-[0.4] text-blue-500 z-0">
          <svg width="65" height="65" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" />
            <path d="M12 15v5c1.97 1.45 5 2 5 2s-.8-3.38-3-5" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
        </motion.div>

      </div>

      <div className="container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">

        {/* ── Left — text ── */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 sm:space-y-8 text-center lg:text-left">

          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold border"
              style={{ background: "hsl(250 84% 60% / 0.08)", borderColor: "hsl(250 84% 60% / 0.25)", color: "hsl(250 84% 50%)" }}>
              <Sparkles size={12} />
              {t("Available for Work")}
            </span>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.8rem] font-extrabold leading-[1.2] tracking-tight text-foreground">
              {t("Hi, I'm")} {" "}
              <span className="block mt-2">Muhammad Rakha</span>
              <span className="block text-gradient mt-2 pb-2">Syamputra</span>
            </h1>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {[
                { label: "IT Project + Product Manager", bg: "hsl(250 84% 60% / 0.12)", border: "hsl(250 84% 60% / 0.25)", color: "hsl(250 84% 60%)" },
                { label: "Software Developer Enthusiast", bg: "hsl(196 100% 47% / 0.12)", border: "hsl(196 100% 47% / 0.25)", color: "hsl(196 100% 47%)" },
              ].map((r, i) => (
                <span key={i} className="rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-semibold"
                  style={{ background: r.bg, border: `1px solid ${r.border}`, color: r.color }}>
                  {r.label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.p variants={fadeUp} className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
            {t("Hero Description")}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2 relative">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group rounded-full px-5 py-3 sm:px-7 sm:py-3.5 text-[13px] sm:text-sm font-semibold text-white transition-all duration-300 hover:scale-105 shadow-violet"
              style={{ background: "linear-gradient(135deg, hsl(250 84% 60%), hsl(196 100% 47%))" }}>
              {t("View My Projects")}
            </button>
            <div className="relative inline-flex items-center gap-4">
              <a href="https://drive.google.com/file/d/1JHdnHLOJfDU3Wf3jK1hrfgMrzbeGfQdT/view?usp=drive_link"
                target="_blank" rel="noopener noreferrer"
                className="rounded-full border px-5 py-3 sm:px-7 sm:py-3.5 text-[13px] sm:text-sm font-semibold transition-all duration-300 hover:scale-105 border-border text-foreground hover:bg-secondary/80 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                {t("Resume")}
              </a>
              <a href="#contact"
                className="rounded-full border px-5 py-3 sm:px-7 sm:py-3.5 text-[13px] sm:text-sm font-semibold transition-all duration-300 hover:scale-105 border-border text-foreground hover:border-primary hover:text-primary"
              >
                {t("Contact Me")}
              </a>

              {/* Megaphone next to button */}
              <motion.div
                animate={{ x: [0, 5, 0], rotate: [-10, 5, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="hidden sm:block absolute -right-12 top-0 text-orange-500 opacity-[0.5]">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 11 18-5v12L3 14v-3z" />
                  <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center justify-center lg:justify-start gap-4 pt-2">
            {[
              { href: "https://github.com/Couraa0", icon: <Github size={16} />, label: "GitHub", color: "hsl(250 84% 55%)", bg: "hsl(250 84% 60% / 0.08)", border: "hsl(250 84% 60% / 0.2)" },
              { href: "https://www.linkedin.com/in/rakha05/", icon: <Linkedin size={18} />, label: "LinkedIn", color: "hsl(196 100% 36%)" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full border flex items-center justify-center text-muted-foreground transition-all duration-300 hover:scale-110"
                style={{ borderColor: "hsl(var(--border))" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = s.color;
                  (e.currentTarget as HTMLElement).style.borderColor = `${s.color}55`;
                  (e.currentTarget as HTMLElement).style.background = `${s.color}12`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "";
                  (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border))";
                  (e.currentTarget as HTMLElement).style.background = "";
                }}>
                {s.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right — card AS background, photo overflows TOP only ── */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.95, delay: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
          className="hidden lg:flex justify-center items-center">

          <div className="relative" style={{ width: 360, paddingTop: 80 }}>

            {/* ── Soft glow behind the card ── */}
            <div className="absolute inset-x-8 top-24 bottom-0 rounded-[2.5rem] pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 40%, hsl(250 84% 60% / 0.12), transparent 70%)", filter: "blur(24px)" }} />

            <div
              className="relative rounded-[2.5rem] bg-card border-border border shadow-lg"
              style={{
                overflow: "visible",   /* KEY: lets photo overflow at top */
                /* card height for the "base" area */
                minHeight: 420,
              }}>

              {/* Rainbow accent bar (centered at top) */}
              <div className="absolute top-0 left-12 right-12 h-1 rounded-b-full z-0"
                style={{ background: "linear-gradient(90deg, hsl(250 84% 60%), hsl(196 100% 47%), hsl(344 85% 60%), hsl(37 100% 50%))" }} />

              {/* ── Photo ── overflows top, bottom anchored inside card */}
              <div
                className="absolute left-1/2 -translate-x-1/2 z-10 pointer-events-none"
                style={{ bottom: 112, width: 320, height: 520 }}>
                {/* Glow under feet */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-52 h-6 rounded-full blur-2xl"
                  style={{ background: "hsl(250 84% 55% / 0.3)" }} />
                <img
                  src="/Rakha-Formal-NoBg.png"
                  alt="Muhammad Rakha Syamputra"
                  className="w-full h-full object-contain object-bottom select-none"
                  style={{
                    filter: "drop-shadow(0 20px 40px hsl(250 84% 60% / 0.18)) drop-shadow(0 4px 12px hsl(220 20% 50% / 0.1)) contrast(1.02)",
                    imageRendering: "auto",
                    WebkitFontSmoothing: "antialiased",
                    transform: "perspective(1px) translateZ(0)",
                    backfaceVisibility: "hidden",
                  }}
                  draggable={false}
                />
              </div>

              {/* ── Name / status — bottom of card ── */}
              <div className="relative z-20 pt-80 pb-6 px-6 text-center">
                {/* subtle gradient background behind text for legibility */}
                <div className="absolute bottom-0 left-0 right-0 h-36 rounded-b-[2.5rem]"
                  style={{ background: "linear-gradient(to top, hsl(var(--card)) 70%, transparent)" }} />
                <div className="relative z-10">
                  <p className="font-heading font-bold text-foreground text-lg leading-tight">Muhammad Rakha S.</p>
                  <p className="text-xs text-muted-foreground mt-1">IT Project + Product Manager · Software Developer Enthusiast</p>
                  <div className="flex items-center justify-center gap-2 mt-3 rounded-full px-4 py-1.5 mx-auto w-fit"
                    style={{ background: "hsl(158 80% 42% / 0.09)", border: "1px solid hsl(158 80% 42% / 0.22)" }}>
                    <span className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: "hsl(158 80% 42%)", animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }} />
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-500">Open to work</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Floating badges (z-30 → above photo) ── */}

            {/* GPA Badge */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-30 rounded-2xl px-4 py-2.5 flex items-center gap-3 bg-background/90 backdrop-blur-md border border-violet-500/20 shadow-lg shadow-violet-500/10"
              style={{ top: 20, right: -24 }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-violet-500/10 text-violet-600">
                <Sparkles size={18} />
              </div>
              <div className="text-left">
                <p className="font-heading text-lg font-bold leading-none text-foreground">3.97</p>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">{t("GPA")}</p>
              </div>
            </motion.div>

            {/* Projects Badge */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-30 rounded-2xl px-4 py-2.5 flex items-center gap-3 bg-background/90 backdrop-blur-md border border-rose-500/20 shadow-lg shadow-rose-500/10"
              style={{ bottom: 180, left: -32 }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-500/10 text-rose-600">
                <Github size={18} />
              </div>
              <div className="text-left">
                <p className="font-heading text-lg font-bold leading-none text-foreground">10+</p>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">Projects</p>
              </div>
            </motion.div>

            {/* Experience Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-30 rounded-2xl px-4 py-2.5 flex items-center gap-3 bg-background/90 backdrop-blur-md border border-emerald-500/20 shadow-lg shadow-emerald-500/10"
              style={{ top: 140, right: -40 }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-500/10 text-emerald-600">
                <Briefcase size={18} />
              </div>
              <div className="text-left">
                <p className="font-heading text-lg font-bold leading-none text-foreground">3+</p>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">Yrs Exp</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div >

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-0 right-0 hidden sm:flex justify-center pointer-events-none">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1.5 text-muted-foreground">
          <span className="text-[10px] font-medium tracking-widest uppercase">Scroll</span>
          <ArrowDown size={14} color="hsla(250, 87%, 66%, 1.00)" />
        </motion.div>
      </div>
    </section >
  );
};

export default Hero;
