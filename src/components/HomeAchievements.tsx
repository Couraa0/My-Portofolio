import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, ArrowRight, Trophy, Sparkles, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import { getAchievements, type Achievement as DBAchievement } from "@/lib/supabase";

interface Achievement {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  images: string[];
  type: string;
  category: string;
}

function adaptAchievement(a: DBAchievement): Achievement {
  return {
    id: a.id!,
    title: a.title,
    issuer: a.issuer,
    issueDate: a.issue_date,
    credentialId: a.credential_id,
    credentialUrl: a.credential_url,
    images: a.images || [],
    type: a.type,
    category: a.category,
  };
}

export const HomeAchievements = () => {
  const { t } = useTranslation();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAchievements()
      .then((data) => {
        const mapped = data.map(adaptAchievement);
        // Filter for "professional" and "award" types only
        const filtered = mapped.filter(
          (a) =>
            a.type?.toLowerCase() === "professional" ||
            a.type?.toLowerCase() === "profesional" ||
            a.type?.toLowerCase() === "award"
        );
        setAchievements(filtered);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="home-achievements" className="py-24 bg-background relative z-10 overflow-hidden text-left border-t border-border/30">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] aspect-square bg-indigo-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16 relative">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold mb-4 border"
              style={{
                background: "hsl(215 100% 55% / 0.08)",
                borderColor: "hsl(215 100% 55% / 0.25)",
                color: "hsl(215 100% 50%)",
              }}
            >
              <Trophy size={13} className="text-sky-500" />
              {t("Recognition")}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              {t("Achievements")}
            </h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
              {t("Achievements Subtitle")}
            </p>

            {/* Coura mascot - near home achievements title */}
            <motion.img
              src="/Coura.png"
              alt="Coura mascot standing proud"
              className="absolute -right-2 sm:right-4 lg:right-16 -top-4 w-16 sm:w-20 h-auto drop-shadow-md select-none hidden md:block pointer-events-none"
              animate={{ y: [0, -6, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              draggable={false}
            />
          </div>
        </AnimatedSection>

        {/* Loading */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-card border border-border/60 overflow-hidden animate-pulse h-52" />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="flex items-center justify-center gap-3 py-16 text-muted-foreground">
            <Loader2 size={20} className="animate-spin text-blue-500" />
            <span className="text-sm">{t("Failed to load data")}: {error}</span>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && achievements.length > 0 && (
          <div className="space-y-12">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((item, i) => {
                const isAward = item.type?.toLowerCase() === "award";
                const iconEmoji = isAward ? "🏆" : "🏅";
                const accentColor = isAward ? "blue" : "sky";

                return (
                  <AnimatedSection key={item.id} delay={i * 0.06}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className={`group relative flex flex-col h-full rounded-2xl bg-card border border-border/60 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-${accentColor}-500/40`}
                    >
                      {/* HUD corners */}
                      <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />
                      <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />
                      <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />
                      <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />

                      {/* Image area */}
                      <div className="relative h-40 overflow-hidden bg-muted flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent pointer-events-none z-10" />
                        {item.images && item.images.length > 0 ? (
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                          />
                        ) : (
                          <Award size={44} className="text-slate-300 dark:text-slate-700" />
                        )}
                        {/* Type badge */}
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-bl-lg shadow flex items-center gap-1 z-20">
                          <Sparkles size={10} />
                          {item.type}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-grow text-left">
                        <div className="flex items-start gap-3 mb-2">
                          <span className="text-2xl flex-shrink-0 mt-0.5">{iconEmoji}</span>
                          <div className="min-w-0">
                            <h3 className="font-heading font-extrabold text-base text-card-foreground group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                              {item.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1 font-medium">
                              {item.issuer}
                            </p>
                          </div>
                        </div>

                        <div className="flex-1" />

                        {/* Footer meta */}
                        <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-border/40">
                          <span className="text-[10px] font-mono text-slate-400">
                            {item.issueDate}
                          </span>
                          {item.credentialUrl && item.credentialUrl !== "#" && (
                            <a
                              href={item.credentialUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] font-bold text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Verify
                              <ArrowRight size={10} />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                );
              })}
            </div>

            <div className="flex justify-center">
              <Link
                to="/achievements"
                className="group relative flex items-center justify-center gap-2 py-3 px-8 rounded-full overflow-hidden transition-all duration-350 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 bg-card border border-border hover:border-blue-500/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-500/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="tracking-widest uppercase text-[10px] font-bold font-mono text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                  {t("View All Achievements") || "View All Achievements"}
                </span>
                <ArrowRight size={13} className="text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
