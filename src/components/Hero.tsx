import { motion, Variants } from "framer-motion";
import { Github, Linkedin, ArrowDown, Sparkles, Briefcase, Instagram, MessageCircle } from "lucide-react";

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const } },
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-white">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(circle, hsl(250 84% 60%), transparent 70%)" }} />
        <div className="absolute -bottom-32 -left-32 w-[450px] h-[450px] rounded-full opacity-[0.1]"
          style={{ background: "radial-gradient(circle, hsl(196 100% 47%), transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/3 w-[250px] h-[250px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, hsl(344 85% 60%), transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.4] bg-grid pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* ── Left — text ── */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">

          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold border"
              style={{ background: "hsl(250 84% 60% / 0.08)", borderColor: "hsl(250 84% 60% / 0.25)", color: "hsl(250 84% 50%)" }}>
              <Sparkles size={12} />
              Available for Work
            </span>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.8rem] font-extrabold leading-[1.2] tracking-tight text-foreground">
              Hi, I'm{" "}
              <span className="block mt-2">Muhammad Rakha</span>
              <span className="block text-gradient mt-2 pb-2">Syamputra</span>
            </h1>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div className="flex flex-wrap items-center gap-3">
              {[
                { label: "IT Project + Product Manager", bg: "hsl(250 84% 60% / 0.08)", border: "hsl(250 84% 60% / 0.25)", color: "hsl(250 84% 45%)" },
                { label: "Software Developer Enthusiast", bg: "hsl(196 100% 47% / 0.08)", border: "hsl(196 100% 47% / 0.25)", color: "hsl(196 100% 36%)" },
              ].map((r, i) => (
                <span key={i} className="rounded-full px-3 py-1.5 text-xs font-semibold"
                  style={{ background: r.bg, border: `1px solid ${r.border}`, color: r.color }}>
                  {r.label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.p variants={fadeUp} className="text-base text-muted-foreground max-w-lg leading-relaxed">
            Mahasiswa Sistem Informasi dengan IPK{" "}
            <span className="font-semibold" style={{ color: "hsl(37 100% 45%)" }}>3,97</span>{" "}yang passionate dalam memimpin proyek teknologi — dari{" "}
            <span className="font-medium" style={{ color: "hsl(196 100% 36%)" }}>AI solutions</span> hingga{" "}
            <span className="font-medium" style={{ color: "hsl(250 84% 50%)" }}>Smart City ecosystem</span>.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 shadow-violet"
              style={{ background: "linear-gradient(135deg, hsl(250 84% 60%), hsl(196 100% 47%))" }}>
              View My Projects
            </button>
            <a href="#contact"
              className="rounded-full border px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{ borderColor: "hsl(220 20% 88%)", color: "hsl(222 47% 20%)" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "hsl(250 84% 60% / 0.4)";
                (e.currentTarget as HTMLElement).style.color = "hsl(250 84% 50%)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "hsl(220 20% 88%)";
                (e.currentTarget as HTMLElement).style.color = "hsl(222 47% 20%)";
              }}>
              Contact Me
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-4 pt-2">
            {[
              { href: "https://github.com/Couraa0", icon: <Github size={16} />, color: "hsl(250 84% 55%)", bg: "hsl(250 84% 60% / 0.08)", border: "hsl(250 84% 60% / 0.2)" },
              { href: "https://www.linkedin.com/in/rakha05/", icon: <Linkedin size={18} />, color: "hsl(196 100% 36%)" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border flex items-center justify-center text-muted-foreground transition-all duration-300 hover:scale-110"
                style={{ borderColor: "hsl(220 20% 88%)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = s.color;
                  (e.currentTarget as HTMLElement).style.borderColor = `${s.color}55`;
                  (e.currentTarget as HTMLElement).style.background = `${s.color}12`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "";
                  (e.currentTarget as HTMLElement).style.borderColor = "hsl(220 20% 88%)";
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

            {/*
             * THE CARD — background of the photo.
             * overflow: visible allows img to break out at the top.
             * position: relative so the photo's absolute positioning is relative to this card.
             */}
            <div
              className="relative rounded-[2.5rem]"
              style={{
                background: "linear-gradient(160deg, hsl(220 30% 98%) 0%, white 60%)",
                border: "1px solid hsl(220 20% 90%)",
                boxShadow: "0 24px 72px hsl(250 84% 60% / 0.13), 0 6px 24px hsl(220 20% 70% / 0.18)",
                overflow: "visible",   /* KEY: lets photo overflow at top */
                /* card height for the "base" area */
                minHeight: 420,
              }}>

              {/* Rainbow accent bar (centered at top) */}
              <div className="absolute top-0 left-12 right-12 h-1 rounded-b-full z-0"
                style={{ background: "linear-gradient(90deg, hsl(250 84% 60%), hsl(196 100% 47%), hsl(344 85% 60%), hsl(37 100% 50%))" }} />

              {/* ── Photo ── overflows top, bottom anchored inside card */}
              {/*
               * Photo is 500px tall, card is ~420px.
               * bottom: 90 → photo bottom 90px from card bottom (where name sits)
               * top of photo: 90 - 500 = -410px from card bottom  →  = extends 420-90-500 = -170px ABOVE card top
               * So ~170px of head/shoulder sticks above the card.
               */}
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
                  style={{ background: "linear-gradient(to top, white 70%, transparent)" }} />
                <div className="relative z-10">
                  <p className="font-heading font-bold text-foreground text-lg leading-tight">Muhammad Rakha S.</p>
                  <p className="text-xs text-muted-foreground mt-1">IT Project + Product Manager · Software Developer Enthusiast</p>
                  <div className="flex items-center justify-center gap-2 mt-3 rounded-full px-4 py-1.5 mx-auto w-fit"
                    style={{ background: "hsl(158 80% 42% / 0.09)", border: "1px solid hsl(158 80% 42% / 0.22)" }}>
                    <span className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: "hsl(158 80% 42%)", animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }} />
                    <span className="text-[11px] font-semibold" style={{ color: "hsl(158 80% 30%)" }}>Open to work</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Floating badges (z-30 → above photo) ── */}

            {/* GPA Badge */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-30 rounded-2xl px-4 py-2.5 flex items-center gap-3 bg-white/90 backdrop-blur-md border border-violet-500/20 shadow-lg shadow-violet-500/10"
              style={{ top: 20, right: -24 }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-violet-500/10 text-violet-600">
                <Sparkles size={18} />
              </div>
              <div className="text-left">
                <p className="font-heading text-lg font-bold leading-none text-foreground">3.97</p>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">GPA</p>
              </div>
            </motion.div>

            {/* Projects Badge */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-30 rounded-2xl px-4 py-2.5 flex items-center gap-3 bg-white/90 backdrop-blur-md border border-rose-500/20 shadow-lg shadow-rose-500/10"
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
              className="absolute z-30 rounded-2xl px-4 py-2.5 flex items-center gap-3 bg-white/90 backdrop-blur-md border border-emerald-500/20 shadow-lg shadow-emerald-500/10"
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
      </div>

      {/* Scroll indicator */}
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground">
        <span className="text-[10px] font-medium tracking-widest uppercase">Scroll</span>
        <ArrowDown size={14} color="hsla(250, 87%, 66%, 1.00)" />
      </motion.div>
    </section>
  );
};

export default Hero;
