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
} from "lucide-react";
import { useState, useEffect, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useCVLink } from "@/hooks/useCVLink";

const Skills = lazy(() => import("@/components/Skills"));
const SectionPreview = lazy(() => import("@/components/SectionPreview"));
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
  const [activeTab, setActiveTab] = useState<"code" | "roadmap" | "metrics">("code");

  return (
    <>
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className={`relative min-h-screen flex items-center overflow-hidden ${layoutMode === "sidebar" ? "pt-10" : "pt-24"} pb-16 lg:pb-0 bg-background`}>
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
          <div className={`grid ${layoutMode === "navbar" ? "lg:grid-cols-12" : "grid-cols-1 md:-mt-10"} gap-12 lg:gap-8 items-center`}>

            {/* ═════ LEFT: TYPOGRAPHY & HERO CONTENT ═════ */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className={`space-y-6 text-center ${layoutMode === "navbar" ? "lg:text-left lg:col-span-6 xl:col-span-5" : "mx-auto w-full max-w-4xl"}`}
            >
              {/* Hiring Badge */}
              <motion.div variants={fadeUp}>
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

              {/* Main Headline */}
              <motion.div variants={fadeUp}>
                <h1 className="font-heading text-3xl sm:text-[3.2rem] lg:text-[4rem] font-extrabold leading-[1.15] tracking-tight text-foreground transition-all">
                  {t("Hii👋🏻,")}{" "}
                  <span className="block mt-2 bg-gradient-to-r from-primary via-blue-800 to-indigo-900 bg-clip-text text-transparent pb-1 break-words">
                    I'm Muhammad Rakha Syamputra
                  </span>
                </h1>
              </motion.div>

              {/* Typing Roles Container */}
              <motion.div variants={fadeUp} className={`flex justify-center ${layoutMode === "navbar" ? "lg:justify-start" : ""}`}>
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
                className={`text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed transition-all ${layoutMode === "navbar" ? "max-w-xl mx-auto lg:mx-0" : "max-w-3xl mx-auto"}`}
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

            {/* ═════ RIGHT: HIGH-TECH DEVICE WORK BENCH ═════ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
              className={`hidden lg:flex relative flex-col items-center justify-center ${layoutMode === "navbar" ? "lg:col-span-6 xl:col-span-7" : "w-full max-w-2xl mx-auto mt-12"}`}
            >

              {/* Tab Selector Toolbar */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md backdrop-blur-md mb-4 relative z-20 w-fit">
                {[
                  { id: "code", label: "developer.tsx", icon: <Code2 size={13} /> },
                  { id: "roadmap", label: "roadmap.pm", icon: <Layers size={13} /> },
                  { id: "metrics", label: "analytics.svg", icon: <BarChart3 size={13} /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${activeTab === tab.id
                      ? "bg-primary text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                      }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Main Workspace Frame Container (Laptop + Phone) */}
              <div className="relative w-full max-w-[500px] xl:max-w-[550px] aspect-[16/10] px-3">

                {/* ── LAPTOP FRAME (CSS) ── */}
                <div className="relative w-full h-full rounded-t-2xl border-[6px] border-slate-800 bg-slate-950 shadow-2xl flex flex-col z-10 transition-all duration-300">
                  {/* Laptop Web Camera Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-slate-800 rounded-b-md z-30 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-700" />
                  </div>

                  {/* Glass Glossy Screen Reflection Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-60 z-20 pointer-events-none rounded-t-[10px]" />

                  {/* Laptop Screen Content Display Area */}
                  <div className="flex-1 bg-slate-900 overflow-hidden relative flex flex-col rounded-t-[10px] border-b border-slate-950">

                    {/* Screen Tabs Bar */}
                    <div className="h-7 bg-slate-950 border-b border-slate-900 flex items-center justify-between px-3 select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                        <Terminal size={10} />
                        <span>bash • localhost:5173</span>
                      </div>
                    </div>

                    {/* Active Mockup Screen Router */}
                    <div className="flex-1 w-full overflow-y-auto p-4 font-mono text-[10px] sm:text-xs text-slate-300">

                      {/* CASE 1: DEVELOPER CODE WINDOW */}
                      {activeTab === "code" && (
                        <div className="space-y-2 select-text">
                          <div className="text-slate-500">// Rakha's Developer Profile</div>
                          <div>
                            <span className="text-blue-400">import </span>
                            <span className="text-white">{"{ "}Developer{" }"} </span>
                            <span className="text-blue-400">from </span>
                            <span className="text-emerald-400">"rakha-syamputra"</span>
                            <span className="text-slate-400">;</span>
                          </div>

                          <div className="mt-2">
                            <span className="text-blue-400">const </span>
                            <span className="text-yellow-400">RakhaProfile </span>
                            <span className="text-slate-400">= </span>
                            <span className="text-white">{"{"}</span>
                          </div>

                          <div className="pl-4">
                            <span className="text-sky-400">name: </span>
                            <span className="text-emerald-400">"Muhammad Rakha Syamputra"</span>
                            <span className="text-slate-400">,</span>
                          </div>

                          <div className="pl-4">
                            <span className="text-sky-400">gpa: </span>
                            <span className="text-purple-400">3.97</span>
                            <span className="text-slate-400">,</span>
                          </div>

                          <div className="pl-4">
                            <span className="text-sky-400">skills: </span>
                            <span className="text-white">{"["}</span>
                            <span className="text-emerald-400">"React"</span>
                            <span className="text-slate-400">, </span>
                            <span className="text-emerald-400">"TypeScript"</span>
                            <span className="text-slate-400">, </span>
                            <span className="text-emerald-400">"Laravel"</span>
                            <span className="text-white">{"]"}</span>
                            <span className="text-slate-400">,</span>
                          </div>

                          <div className="pl-4">
                            <span className="text-sky-400">status: </span>
                            <span className="text-emerald-400">"Open to Code & Build"</span>
                          </div>

                          <div>
                            <span className="text-white">{"}"}</span>
                            <span className="text-slate-400">;</span>
                          </div>

                          <div className="mt-3 pt-3 border-t border-slate-800 text-[10px] text-slate-400">
                            <div className="text-blue-400 font-bold">$ npm run build</div>
                            <div className="text-green-400">✓ 15+ Projects compiled successfully.</div>
                            <div className="text-slate-500">Listening on port 5173...</div>
                          </div>
                        </div>
                      )}

                      {/* CASE 2: KANBAN ROADMAP PM */}
                      {activeTab === "roadmap" && (
                        <div className="space-y-4 font-sans h-full">
                          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                            <span className="text-xs font-bold text-slate-200">📋 Scrum Sprint - Q2 Board</span>
                            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[9px] font-bold">Sprint Active</span>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            {/* TO DO column */}
                            <div className="space-y-2">
                              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Backlog</div>
                              <div className="p-2 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors">
                                <p className="text-[10px] font-bold text-slate-300 leading-tight">Build Smart City App</p>
                                <span className="text-[8px] bg-slate-800 text-slate-400 px-1 py-0.5 rounded mt-1.5 inline-block">Plan</span>
                              </div>
                            </div>

                            {/* IN PROGRESS column */}
                            <div className="space-y-2">
                              <div className="text-[9px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                Progress
                              </div>
                              <div className="p-2 rounded bg-slate-950 border border-blue-900/30 hover:border-blue-700/50 transition-colors shadow-[0_0_8px_rgba(59,130,246,0.05)]">
                                <p className="text-[10px] font-bold text-slate-200 leading-tight">Build E Commerce Website</p>
                                <span className="text-[8px] bg-blue-900/30 text-blue-300 px-1 py-0.5 rounded mt-1.5 inline-block">Development</span>
                              </div>
                              <div className="p-2 rounded bg-slate-950 border border-blue-900/30 hover:border-blue-700/50 transition-colors shadow-[0_0_8px_rgba(59,130,246,0.05)]">
                                <p className="text-[10px] font-bold text-slate-200 leading-tight">Build Satu Tani App</p>
                                <span className="text-[8px] bg-blue-900/30 text-blue-300 px-1 py-0.5 rounded mt-1.5 inline-block">Development</span>
                              </div>
                              <div className="p-2 rounded bg-slate-950 border border-blue-900/30 hover:border-blue-700/50 transition-colors shadow-[0_0_8px_rgba(59,130,246,0.05)]">
                                <p className="text-[10px] font-bold text-slate-200 leading-tight">Build Educational AI Stock</p>
                                <span className="text-[8px] bg-blue-900/30 text-blue-300 px-1 py-0.5 rounded mt-1.5 inline-block">Development</span>
                              </div>
                            </div>

                            {/* COMPLETED column */}
                            <div className="space-y-2">
                              <div className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                                <CheckCircle2 size={10} className="text-emerald-400" />
                                Done
                              </div>

                              <div className="p-2 rounded bg-slate-950 border border-emerald-950 hover:border-emerald-900 transition-colors space-y-1.5">
                                <p className="text-[10px] font-bold text-slate-300 leading-tight line-through">Smart Village App</p>
                                <span className="text-[8px] bg-emerald-950 text-emerald-400 px-1 py-0.5 rounded inline-block">PM Lead</span>
                              </div>

                              <div className="p-2 rounded bg-slate-950 border border-emerald-950 hover:border-emerald-900 transition-colors space-y-1.5">
                                <p className="text-[10px] font-bold text-slate-300 leading-tight line-through">Tixchain.id Launch</p>
                                <span className="text-[8px] bg-purple-950 text-purple-400 px-1 py-0.5 rounded inline-block">Co-Founder</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CASE 3: ANALYTICS METRICS */}
                      {activeTab === "metrics" && (
                        <div className="space-y-3 font-sans h-full">
                          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                            <span className="text-xs font-bold text-slate-200">📊 Product Growth Metrics</span>
                            <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-semibold">
                              <Activity size={10} /> Live Stats
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
                              <div>
                                <span className="text-[9px] text-slate-500 uppercase font-medium">Cumulative GPA</span>
                                <p className="text-sm font-black text-slate-200 mt-0.5">3.97 / 4.00</p>
                              </div>
                              <div className="w-7 h-7 rounded-full border border-blue-500/20 flex items-center justify-center bg-blue-500/5 text-blue-400">
                                <span className="text-[9px] font-bold">99%</span>
                              </div>
                            </div>

                            <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-center justify-between">
                              <div>
                                <span className="text-[9px] text-slate-500 uppercase font-medium">Deployments</span>
                                <p className="text-sm font-black text-slate-200 mt-0.5">15+ Apps</p>
                              </div>
                              <span className="text-[8px] font-bold text-emerald-500 bg-emerald-500/10 px-1 py-0.5 rounded">+18% MoM</span>
                            </div>
                          </div>

                          {/* SVG Chart representation */}
                          <div className="p-2 rounded bg-slate-950 border border-slate-800 relative h-24 flex flex-col justify-end">
                            <div className="absolute top-2 left-2 text-[8px] font-mono text-slate-600">PROJECT COMPLETION TREND</div>
                            <svg className="w-full h-16 overflow-visible" viewBox="0 0 100 30">
                              <defs>
                                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                              {/* Grid lines */}
                              <line x1="0" y1="10" x2="100" y2="10" stroke="#1e293b" strokeWidth="0.2" />
                              <line x1="0" y1="20" x2="100" y2="20" stroke="#1e293b" strokeWidth="0.2" />

                              {/* Filled path */}
                              <path d="M 0 30 L 0 25 L 20 22 L 40 16 L 60 12 L 80 5 L 100 2 L 100 30 Z" fill="url(#gradient)" />

                              {/* Trend line */}
                              <path d="M 0 25 L 20 22 L 40 16 L 60 12 L 80 5 L 100 2" fill="none" stroke="#2563eb" strokeWidth="1" strokeLinecap="round" />

                              {/* Dots */}
                              <circle cx="20" cy="22" r="1.2" fill="#60a5fa" />
                              <circle cx="40" cy="16" r="1.2" fill="#60a5fa" />
                              <circle cx="60" cy="12" r="1.2" fill="#60a5fa" />
                              <circle cx="80" cy="5" r="1.2" fill="#60a5fa" />
                              <circle cx="100" cy="2" r="1.5" fill="#3b82f6 animate-pulse" />
                            </svg>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                </div>

                {/* Laptop Base (Keyboard Deck) */}
                <div className="w-[106%] -ml-[3%] h-[12px] bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-xl border-t border-slate-600 shadow-xl relative z-10 flex justify-center">
                  <div className="w-20 h-2 bg-slate-900 rounded-t-sm" />
                </div>

                {/* ── PHONE FRAME (iPhone style overlaying laptop) ── */}
                <div className="absolute -bottom-8 -right-6 w-[170px] h-[330px] bg-slate-950 border-[5px] border-slate-800 rounded-[2.5rem] shadow-2xl flex flex-col z-20 hidden md:flex hover:scale-[1.05] transition-transform duration-300 overflow-hidden">

                  {/* Speaker Notch */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-slate-950 rounded-full z-30 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-slate-900" />
                  </div>

                  {/* Phone Screen display */}
                  <div className="flex-1 bg-slate-900/90 relative overflow-hidden flex flex-col p-3 pt-8 font-sans">

                    {/* Render Phone Content based on Active Tab */}
                    {activeTab === "code" && (
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                            <span className="text-[8px] font-bold text-slate-400 font-mono">Tixchain App</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          </div>

                          <div className="rounded-lg bg-slate-950 p-2 border border-slate-800 space-y-1">
                            <div className="w-8 h-4 rounded bg-blue-600/20 text-[7px] font-extrabold text-blue-400 flex items-center justify-center">NFT Ticket</div>
                            <h4 className="text-[9px] font-bold text-slate-200">DevFest 2026</h4>
                            <p className="text-[7px] text-slate-500">Contract: 0x71C...a47B</p>
                          </div>

                          <div className="rounded-lg bg-slate-950 p-2 border border-slate-800 space-y-1">
                            <h4 className="text-[9px] font-bold text-slate-200">Blockchain Wallet</h4>
                            <p className="text-[8px] text-slate-400 font-mono">Balance: 12.45 ETH</p>
                          </div>
                        </div>

                        <button className="w-full py-1.5 rounded bg-blue-600 text-white font-bold text-[8px] tracking-wide flex items-center justify-center gap-1">
                          Buy DevFest Ticket <ExternalLink size={8} />
                        </button>
                      </div>
                    )}

                    {activeTab === "roadmap" && (
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                            <span className="text-[8px] font-bold text-slate-400 font-mono">Task Status</span>
                            <span className="text-[8px] font-bold text-blue-400">85% Done</span>
                          </div>

                          {/* Progress Circle representation */}
                          <div className="flex flex-col items-center justify-center py-2">
                            <div className="relative w-14 h-14 flex items-center justify-center">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="28" cy="28" r="24" stroke="#1e293b" strokeWidth="3" fill="transparent" />
                                <circle cx="28" cy="28" r="24" stroke="#2563eb" strokeWidth="3" fill="transparent"
                                  strokeDasharray="150" strokeDashoffset="22" />
                              </svg>
                              <span className="absolute text-[9px] font-black text-slate-200">85%</span>
                            </div>
                            <span className="text-[7px] text-slate-500 mt-1 uppercase font-bold">Sprint Velocity</span>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 p-1 rounded bg-slate-950/50 text-[8px] text-slate-300">
                              <CheckCircle2 size={8} className="text-green-500" />
                              <span>Sprint Backlog Groomed</span>
                            </div>
                            <div className="flex items-center gap-1.5 p-1 rounded bg-slate-950/50 text-[8px] text-slate-300">
                              <CheckCircle2 size={8} className="text-green-500" />
                              <span>Agile Standup Held</span>
                            </div>
                          </div>
                        </div>

                        <span className="text-[7px] text-center text-slate-500 font-mono block">Updated 2m ago</span>
                      </div>
                    )}

                    {activeTab === "metrics" && (
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                            <span className="text-[8px] font-bold text-slate-400 font-mono">Allocations</span>
                            <User size={8} className="text-slate-400" />
                          </div>

                          {/* Skill bar representation */}
                          <div className="space-y-1.5 pt-2">
                            <div>
                              <div className="flex justify-between text-[7px] text-slate-400 font-bold mb-0.5">
                                <span>Management (PM)</span>
                                <span>45%</span>
                              </div>
                              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: "45%" }} />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between text-[7px] text-slate-400 font-bold mb-0.5">
                                <span>Development (Dev)</span>
                                <span>35%</span>
                              </div>
                              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-sky-400 rounded-full" style={{ width: "35%" }} />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between text-[7px] text-slate-400 font-bold mb-0.5">
                                <span>Product Design (UI/UX)</span>
                                <span>20%</span>
                              </div>
                              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 rounded-full" style={{ width: "20%" }} />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg bg-slate-950 p-1.5 border border-slate-800 text-center">
                          <span className="text-[7px] text-slate-500 block">TOTAL HOURS WORKED</span>
                          <span className="text-[10px] font-black text-slate-200">1,250+ Hrs</span>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
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
      </section>

      {/* ═══════════════ SKILLS (inline) ═══════════════ */}
      <Suspense fallback={<div className="h-40" />}>
        <Skills />
      </Suspense>

      {/* ═══════════════ WHAT I OFFER ═══════════════ */}
      <Suspense fallback={<div className="h-40" />}>
        <SectionPreview />
      </Suspense>

      {/* ═══════════════ CYBER DECRYPTOR GAME ═══════════════ */}
      <Suspense fallback={<div className="h-40" />}>
        <DecryptionGame />
      </Suspense>
    </>
  );
};

export default Index;
