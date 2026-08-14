import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { useTranslation } from "react-i18next";
import { GitBranch, GitCommit, Code2, ShieldCheck, AlertTriangle } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useState, useEffect } from "react";

export default function GithubStats() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const isIndonesian = i18n.language?.startsWith("id");
  const username = "Couraa0";

  // State to track actual theme class on document element (resolving 'system' theme)
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [streakError, setStreakError] = useState(false);
  const [langsError, setLangsError] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = root.classList.contains("dark");
    setResolvedTheme(isDark ? "dark" : "light");

    const observer = new MutationObserver(() => {
      const isDarkNow = root.classList.contains("dark");
      setResolvedTheme(isDarkNow ? "dark" : "light");
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [theme]);

  // Blue theme configuration for the calendar cells to match the website's primary color
  const calendarTheme = {
    light: ["#ebedf0", "#dbeafe", "#60a5fa", "#2563eb", "#1d4ed8"],
    dark: ["#161b22", "#1e3a8a", "#3b82f6", "#60a5fa", "#93c5fd"],
  };

  // Custom colors for GitHub Readme Stats cards to blend natively with the app theme
  const cardParams = resolvedTheme === "dark"
    ? `bg_color=090d16&title_color=3b82f6&text_color=94a3b8&icon_color=3b82f6&hide_border=true`
    : `bg_color=ffffff&title_color=2563eb&text_color=475569&icon_color=2563eb&hide_border=true`;

  const streakParams = resolvedTheme === "dark"
    ? `theme=dark&background=090d16&title=3b82f6&ring=3b82f6&fire=3b82f6&currStreakNum=94a3b8&sideNums=94a3b8&sideLabels=94a3b8&hide_border=true`
    : `theme=default&background=ffffff&title=2563eb&ring=2563eb&fire=2563eb&currStreakNum=475569&sideNums=475569&sideLabels=475569&hide_border=true`;

  const langParams = resolvedTheme === "dark"
    ? `bg_color=090d16&title_color=3b82f6&text_color=94a3b8&hide_border=true`
    : `bg_color=ffffff&title_color=2563eb&text_color=475569&hide_border=true`;

  return (
    <div className="w-full mt-16 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Header */}
      <AnimatedSection>
        <div className="text-center mb-10 relative">
          <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold mb-3 border border-border bg-muted/30 text-primary">
            <GitBranch size={13} className="text-blue-500 animate-pulse" />
            GitHub Analytics
          </span>
          <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            {isIndonesian ? "Aktivitas & Kontribusi" : "Activity & Contribution"} <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">GitHub</span>
          </h3>

          {/* Coura Hmm mascot - GitHub Analytics title */}
          <motion.img
            src="/Coura - Hmm.png"
            alt="Coura mascot thinking"
            className="absolute -right-2 sm:right-4 lg:right-16 -top-4 w-16 sm:w-20 h-auto drop-shadow-md select-none hidden md:block pointer-events-none"
            loading="lazy"
            animate={{ y: [0, -5, 0], rotate: [0, -4, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            draggable={false}
          />
        </div>
      </AnimatedSection>

      {/* Main Container */}
      <div className="space-y-8">
        
        {/* Calendar Card */}
        <AnimatedSection delay={0.05}>
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm relative overflow-hidden group">
            
            {/* HUD Corner Tech Brackets */}
            <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-blue-500/30 rounded-tl" />
            <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-blue-500/30 rounded-tr" />
            <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-blue-500/30 rounded-bl" />
            <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-blue-500/30 rounded-br" />

            <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/60">
              <span className="font-mono text-[9px] font-bold text-slate-500 flex items-center gap-1.5">
                <GitCommit size={12} className="text-blue-500" />
                REPOSITORY_CONTRIBUTIONS_GRID
              </span>
              <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-[8px] font-mono font-bold">
                <ShieldCheck size={10} />
                <span>LIVE_SYNC [ACTIVE]</span>
              </div>
            </div>

            {/* Calendar Embed */}
            <div className="flex justify-center items-center overflow-x-auto w-full py-2 scrollbar-none">
              <div className="min-w-[750px] md:min-w-0 md:w-full flex justify-center">
                <GitHubCalendar 
                  username={username}
                  labels={{
                    totalCount: isIndonesian 
                      ? '{{count}} kontribusi dalam setahun terakhir'
                      : '{{count}} contributions in the last year',
                  }}
                  theme={{
                    light: calendarTheme.light,
                    dark: calendarTheme.dark
                  }}
                  colorScheme={resolvedTheme}
                  errorMessage={
                    <div className="flex flex-col items-center justify-center p-6 text-center rounded-xl bg-slate-50/50 dark:bg-slate-900/10 border border-dashed border-border/60 w-full min-h-[120px]">
                      <AlertTriangle size={20} className="text-amber-500 mb-2 animate-bounce" />
                      <p className="text-[10px] font-bold text-foreground">GitHub contribution calendar could not be fetched.</p>
                      <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="text-[9px] text-blue-500 hover:underline mt-1 font-mono">
                        View profile directly at github.com/{username} ↗
                      </a>
                    </div>
                  }
                />
              </div>
            </div>

          </div>
        </AnimatedSection>

        {/* Stats Cards Grid */}
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Streak */}
            <div className="p-4 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-center items-center relative overflow-hidden group min-h-[195px]">
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-blue-500/20" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-blue-500/20" />
              {streakError ? (
                <div className="w-full h-full flex flex-col justify-center items-center p-4 text-center font-mono bg-slate-50/50 dark:bg-slate-950/20 rounded-xl min-h-[160px]">
                  <GitCommit size={20} className="text-blue-500 mb-2 animate-pulse" />
                  <span className="text-[9px] font-bold text-foreground uppercase tracking-widest">CONTRIBUTION_STREAK</span>
                  <span className="text-[8px] text-muted-foreground mt-1 max-w-[200px] leading-relaxed">
                    Streak statistics currently unreachable due to rate limits or connection restrictions.
                  </span>
                  <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="mt-3.5 text-[9px] font-bold text-blue-500 hover:underline">
                    View on GitHub ↗
                  </a>
                </div>
              ) : (
                <img 
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&${streakParams}`} 
                  alt="GitHub Contribution Streak" 
                  className="w-full h-auto object-contain max-h-[195px] select-none"
                  loading="lazy"
                  onError={() => setStreakError(true)}
                />
              )}
            </div>

            {/* Card 2: Top Languages */}
            <div className="p-4 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-center items-center relative overflow-hidden group min-h-[195px]">
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-blue-500/20" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-blue-500/20" />
              {langsError ? (
                <div className="w-full h-full flex flex-col justify-center items-center p-4 text-center font-mono bg-slate-50/50 dark:bg-slate-950/20 rounded-xl min-h-[160px]">
                  <Code2 size={20} className="text-indigo-500 mb-2 animate-pulse" />
                  <span className="text-[9px] font-bold text-foreground uppercase tracking-widest">LANGUAGE_METRICS</span>
                  <span className="text-[8px] text-muted-foreground mt-1 max-w-[200px] leading-relaxed">
                    Language metrics currently unreachable due to rate limits or connection restrictions.
                  </span>
                  <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="mt-3.5 text-[9px] font-bold text-blue-500 hover:underline">
                    View on GitHub ↗
                  </a>
                </div>
              ) : (
                <img 
                  src={`https://github-stats-extended.vercel.app/api/top-langs/?username=${username}&layout=compact&${langParams}`} 
                  alt="GitHub Top Languages" 
                  className="w-full h-auto object-contain max-h-[195px] select-none"
                  loading="lazy"
                  onError={() => setLangsError(true)}
                />
              )}
            </div>

          </div>
        </AnimatedSection>

      </div>

    </div>
  );
}
