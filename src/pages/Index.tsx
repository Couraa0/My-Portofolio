import { motion, Variants } from "framer-motion";
import { Link, useOutletContext } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Github,
  Linkedin,
  Briefcase,
  Code2,
  Layers,
  BarChart3,
  CheckCircle2,
  Terminal,
  Activity,
  User,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { useState, useEffect, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useCVLink } from "@/hooks/useCVLink";
import { HeroBanner } from "@/components/HeroBanner";
import LazyViewportSection from "@/components/LazyViewportSection";

const FeaturedProjects = lazy(() => import("@/components/FeaturedProjects"));
const Skills = lazy(() => import("@/components/Skills"));
const HomeAchievements = lazy(() => import("@/components/HomeAchievements"));
const SocialFeed = lazy(() => import("@/components/SocialFeed"));
const DecryptionGame = lazy(() => import("@/components/DecryptionGame"));

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const typingRoles = [
  "IT Project Manager",
  "Product Manager",
  "Software Developer",
  "Tech Leader",
];

const TypingRoles = ({ roles }: { roles: string[] }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => setCharIndex(charIndex + 1), 70);
    } else if (!isDeleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(charIndex - 1), 35);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((roleIndex + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex, roles]);

  return (
    <>
      {roles[roleIndex].substring(0, charIndex)}
      <span
        className="inline-block w-[2px] h-[14px] bg-current ml-0.5 align-middle"
        style={{
          animation: "blink 1s step-end infinite",
        }}
      />
    </>
  );
};

const Index = () => {
  const { t, i18n } = useTranslation();
  const { cvLink } = useCVLink();
  const context = useOutletContext<{ layoutMode: string }>();
  const layoutMode = context?.layoutMode || "navbar";

  return (
    <>
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className={`relative min-h-screen flex items-center overflow-hidden ${layoutMode === "sidebar" ? "pt-10" : "pt-24 sm:pt-28"} pb-12 sm:pb-16 lg:pb-0 bg-background`}>
        {/* Mesh gradient overlay in blue theme */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(circle at 10% 20%, hsl(215 100% 55% / 0.04) 0%, transparent 40%), radial-gradient(circle at 90% 80%, hsl(196 100% 47% / 0.03) 0%, transparent 45%)"
        }} />

        {/* Background grid paper */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.6] bg-graph-paper pointer-events-none"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            }}
          />

          {/* Animated Glow Orbs (Sky Blue & Blue) */}
          <div className="absolute top-1/4 right-[10%] w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] rounded-full opacity-[0.25] blur-[120px] pointer-events-none animate-float-slow"
            style={{
              background: "radial-gradient(circle, hsl(215 100% 55%) 0%, transparent 70%)"
            }}
          />
          <div className="absolute bottom-1/4 left-[5%] w-[220px] sm:w-[400px] h-[220px] sm:h-[400px] rounded-full opacity-[0.15] blur-[100px] pointer-events-none animate-float"
            style={{
              background: "radial-gradient(circle, hsl(196 100% 47%) 0%, transparent 70%)"
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full">
          
          {/* Mobile-only Headline (visible on mobile, hidden on desktop) */}
          <div className="lg:hidden text-center space-y-4 mb-6">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold border"
                style={{
                  background: "hsl(var(--primary) / 0.08)",
                  borderColor: "hsl(var(--primary) / 0.25)",
                  color: "hsl(var(--primary))",
                  boxShadow: "0 0 15px hsl(var(--primary) / 0.08)",
                }}
              >
                <Sparkles size={12} className="animate-pulse text-sky-400" />
                {t("Available for Work")}
              </span>
            </div>
            
            <h1 className="font-heading text-3xl sm:text-[2.2rem] font-extrabold leading-[1.15] tracking-tight text-foreground">
              {t("Hii👋🏻,")}{" "}
              <span className="block mt-1 bg-gradient-to-r from-primary via-blue-800 to-indigo-900 bg-clip-text text-transparent pb-1 break-words text-2xl sm:text-4xl">
                I'm Muhammad Rakha Syamputra
              </span>
            </h1>

            {/* Typing Roles Container (mobile version) */}
            <div className="flex justify-center mt-3">
              <div
                className="rounded-full px-4 py-2 text-xs font-semibold inline-flex items-center gap-2.5 backdrop-blur-sm border"
                style={{
                  background: "hsl(var(--primary) / 0.1)",
                  borderColor: "hsl(var(--primary) / 0.22)",
                  color: "hsl(var(--primary))",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                <span className="min-w-[150px] text-left">
                  <TypingRoles roles={typingRoles} />
                </span>
              </div>
            </div>
          </div>

          <div className={`grid ${layoutMode === "navbar" ? "lg:grid-cols-12" : "grid-cols-1 md:-mt-10"} gap-8 lg:gap-8 items-center`}>

            {/* ═════ LEFT: TYPOGRAPHY & HERO CONTENT ═════ */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className={`space-y-5 sm:space-y-6 text-center order-2 lg:order-1 ${layoutMode === "navbar" ? "lg:text-left lg:col-span-6 xl:col-span-5" : "mx-auto w-full max-w-4xl"}`}
            >
              {/* Hiring Badge (hidden on mobile, visible on desktop) */}
              <motion.div variants={fadeUp} className="hidden lg:block">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold border transition-all duration-300 hover:scale-105"
                  style={{
                    background: "hsl(var(--primary) / 0.08)",
                    borderColor: "hsl(var(--primary) / 0.25)",
                    color: "hsl(var(--primary))",
                    boxShadow: "0 0 15px hsl(var(--primary) / 0.08)",
                  }}
                >
                  <Sparkles size={12} className="animate-pulse text-sky-400" />
                  {t("Available for Work")}
                </span>
              </motion.div>

              {/* Main Headline (hidden on mobile, visible on desktop) */}
              <motion.div variants={fadeUp} className="hidden lg:block">
                <h1 className="font-heading text-3xl sm:text-[3.2rem] lg:text-[4rem] font-extrabold leading-[1.15] tracking-tight text-foreground transition-all">
                  {t("Hii👋🏻,")}{" "}
                  <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-primary via-blue-800 to-indigo-900 bg-clip-text text-transparent pb-1 break-words">
                    I'm Muhammad Rakha Syamputra
                  </span>
                </h1>
              </motion.div>

              {/* Typing Roles Container (hidden on mobile, visible on desktop) */}
              <motion.div variants={fadeUp} className={`hidden lg:flex justify-center ${layoutMode === "navbar" ? "lg:justify-start" : ""}`}>
                <div
                  className="rounded-full px-4 py-2 text-xs font-semibold inline-flex items-center gap-2.5 backdrop-blur-sm border"
                  style={{
                    background: "hsl(var(--primary) / 0.1)",
                    borderColor: "hsl(var(--primary) / 0.22)",
                    color: "hsl(var(--primary))",
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                  <span className="min-w-[150px] text-left">
                    <TypingRoles roles={typingRoles} />
                  </span>
                </div>
              </motion.div>

              {/* Bio Paragraph */}
              <motion.p
                variants={fadeUp}
                className={`text-xs sm:text-base md:text-lg text-muted-foreground leading-relaxed transition-all ${layoutMode === "navbar" ? "max-w-xl mx-auto lg:mx-0" : "max-w-3xl mx-auto"}`}
              >
                {t("Hero Description")}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={fadeUp}
                className={`flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 justify-center ${layoutMode === "navbar" ? "lg:justify-start" : ""}`}
              >
                <Link
                  to="/projects"
                  className="group rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] shadow-lg inline-flex items-center justify-center gap-2 hover:shadow-primary/25 w-full sm:w-auto"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--cyan)))"
                  }}
                >
                  {t("View My Projects")}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={cvLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] bg-background/50 backdrop-blur-md border-border text-foreground hover:text-blue-500 hover:border-blue-500 hover:bg-blue-500/10 flex items-center justify-center gap-2 flex-1 sm:flex-initial"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                    {t("Resume")}
                  </a>

                  <Link
                    to="/contact"
                    className="rounded-full border px-6 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.03] bg-background/50 backdrop-blur-md border-border text-foreground hover:text-sky-500 hover:border-sky-500 hover:bg-sky-500/10 flex-1 sm:flex-initial text-center"
                  >
                    {t("Contact Me")}
                  </Link>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                variants={fadeUp}
                className={`flex items-center gap-4 pt-4 justify-center ${layoutMode === "navbar" ? "lg:justify-start" : ""}`}
              >
                {[
                  {
                    href: "https://github.com/Couraa0",
                    icon: <Github size={18} />,
                    label: "GitHub",
                    color: "hsl(215 100% 55%)",
                  },
                  {
                    href: "https://www.linkedin.com/in/rakha05/",
                    icon: <Linkedin size={18} />,
                    label: "LinkedIn",
                    color: "hsl(196 100% 47%)",
                  },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-all duration-300 hover:scale-110 hover:bg-background/80"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = s.color;
                      (e.currentTarget as HTMLElement).style.borderColor = s.color;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px ${s.color}25`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "";
                      (e.currentTarget as HTMLElement).style.borderColor = "";
                      (e.currentTarget as HTMLElement).style.boxShadow = "";
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* ═════ RIGHT: HERO SLIDE BANNER (PROJECT & ACHIEVEMENT HIGHLIGHTS) ═════ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
              className={`flex relative flex-col items-center justify-center mt-6 lg:mt-0 lg:-translate-y-8 order-1 lg:order-2 ${
                layoutMode === "navbar"
                  ? "lg:col-span-6 xl:col-span-7"
                  : "w-full max-w-2xl mx-auto mt-12"
              }`}
            >
              <HeroBanner />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator with blue accent */}
        <div className="absolute bottom-10 left-0 right-0 hidden sm:flex justify-center pointer-events-none">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-1.5 text-muted-foreground"
          >
            <span className="text-[9px] font-bold tracking-widest uppercase text-slate-500">
              Scroll
            </span>
            <ArrowRight
              size={14}
              className="rotate-90 text-blue-500"
            />
          </motion.div>
        </div>

        {/* Coura Mascot - Floating wave decoration */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute top-28 right-6 sm:right-12 hidden lg:block pointer-events-none z-20"
        >
          <motion.img
            src="/Coura - Halo.png"
            alt="Coura mascot waving hello"
            className="w-20 lg:w-24 h-auto drop-shadow-lg select-none"
            loading="lazy"
            animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            draggable={false}
          />
        </motion.div>
      </section>

      {/* ═══════════════ SKILLS (inline) ═══════════════ */}
      <LazyViewportSection
        fallback={
          <div className="py-24 border-t border-border/30 min-h-[300px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500/50" />
              <span className="text-xs text-muted-foreground/60 font-mono">Loading Skills System...</span>
            </div>
          </div>
        }
      >
        <Suspense fallback={null}>
          <Skills />
        </Suspense>
      </LazyViewportSection>

      {/* ═══════════════ FEATURED PROJECTS ═══════════════ */}
      <LazyViewportSection
        fallback={
          <div className="py-24 border-t border-border/30 min-h-[650px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500/50" />
              <span className="text-xs text-muted-foreground/60 font-mono">Loading Projects Core...</span>
            </div>
          </div>
        }
      >
        <Suspense fallback={null}>
          <FeaturedProjects />
        </Suspense>
      </LazyViewportSection>

      {/* ═══════════════ ACHIEVEMENTS (Professional & Award) ═══════════════ */}
      <LazyViewportSection
        fallback={
          <div className="py-24 border-t border-border/30 min-h-[550px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500/50" />
              <span className="text-xs text-muted-foreground/60 font-mono">Loading Achievements Dossier...</span>
            </div>
          </div>
        }
      >
        <Suspense fallback={null}>
          <HomeAchievements />
        </Suspense>
      </LazyViewportSection>

      {/* ═══════════════ SOCIAL FEED ═══════════════ */}
      <LazyViewportSection
        fallback={
          <div className="py-24 border-t border-border/30 min-h-[600px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500/50" />
              <span className="text-xs text-muted-foreground/60 font-mono">Loading Social Feeds...</span>
            </div>
          </div>
        }
      >
        <Suspense fallback={null}>
          <SocialFeed />
        </Suspense>
      </LazyViewportSection>

      {/* ═══════════════ CYBER DECRYPTOR GAME ═══════════════ */}
      <LazyViewportSection
        fallback={
          <div className="py-24 border-t border-border/30 min-h-[700px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-emerald-500/30" />
              <span className="text-xs text-emerald-500/40 font-mono">INITIALIZING TERMINAL UPLINK...</span>
            </div>
          </div>
        }
      >
        <Suspense fallback={null}>
          <DecryptionGame />
        </Suspense>
      </LazyViewportSection>
    </>
  );
};

export default Index;
