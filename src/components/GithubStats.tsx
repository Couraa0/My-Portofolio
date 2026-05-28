import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { useTranslation } from "react-i18next";
import { GitBranch, GitCommit, Star, Code2, ShieldCheck } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function GithubStats() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const isIndonesian = i18n.language?.startsWith("id");
  const username = "Couraa0";

  // Blue theme configuration for the calendar cells to match the website's primary color
  const calendarTheme = {
    light: ["#ebedf0", "#dbeafe", "#60a5fa", "#2563eb", "#1d4ed8"],
    dark: ["#161b22", "#1e3a8a", "#3b82f6", "#60a5fa", "#93c5fd"],
  };

  const activeThemeColors = theme === "dark" ? calendarTheme.dark : calendarTheme.light;

  // Custom colors for GitHub Readme Stats cards to blend natively with the app theme
  const cardParams = theme === "dark"
    ? `bg_color=090d16&title_color=3b82f6&text_color=94a3b8&icon_color=3b82f6&hide_border=true`
    : `bg_color=ffffff&title_color=2563eb&text_color=475569&icon_color=2563eb&hide_border=true`;

  const streakParams = theme === "dark"
    ? `theme=dark&background=090d16&title=3b82f6&ring=3b82f6&fire=3b82f6&currStreakNum=94a3b8&sideNums=94a3b8&sideLabels=94a3b8&hide_border=true`
    : `theme=default&background=ffffff&title=2563eb&ring=2563eb&fire=2563eb&currStreakNum=475569&sideNums=475569&sideLabels=475569&hide_border=true`;

  const langParams = theme === "dark"
    ? `bg_color=090d16&title_color=3b82f6&text_color=94a3b8&hide_border=true`
    : `bg_color=ffffff&title_color=2563eb&text_color=475569&hide_border=true`;

  return (
    <div className="w-full mt-16 max-w-6xl mx-auto px-4 sm:px-6">
      
      {/* Header */}
      <AnimatedSection>
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold mb-3 border border-border bg-muted/30 text-primary">
            <GitBranch size={13} className="text-blue-500 animate-pulse" />
            GitHub Analytics
          </span>
          <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            {isIndonesian ? "Aktivitas & Kontribusi" : "Activity & Contribution"} <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">GitHub</span>
          </h3>
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
                  colorScheme={theme === "dark" ? "dark" : "light"}
                />
              </div>
            </div>

          </div>
        </AnimatedSection>

        {/* Stats Cards Grid */}
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Streak */}
            <div className="p-4 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-center items-center relative overflow-hidden group">
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-blue-500/20" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-blue-500/20" />
              <img 
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&${streakParams}`} 
                alt="GitHub Contribution Streak" 
                className="w-full h-auto object-contain max-h-[195px] select-none"
                loading="lazy"
              />
            </div>

            {/* Card 2: Top Languages */}
            <div className="p-4 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-center items-center relative overflow-hidden group">
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-blue-500/20" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-blue-500/20" />
              <img 
                src={`https://github-stats-extended.vercel.app/api/top-langs/?username=${username}&layout=compact&${langParams}`} 
                alt="GitHub Top Languages" 
                className="w-full h-auto object-contain max-h-[195px] select-none"
                loading="lazy"
              />
            </div>

          </div>
        </AnimatedSection>

      </div>

    </div>
  );
}
