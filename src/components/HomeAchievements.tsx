import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  Award,
  ArrowRight,
  Trophy,
  Sparkles,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Medal,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import AnimatedSection from "./AnimatedSection";
import {
  getAchievements,
  type Achievement as DBAchievement,
} from "@/lib/supabase";

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

const AUTO_SCROLL_DELAY = 4000;

export const HomeAchievements = () => {
  const { t } = useTranslation();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
    containScroll: false,
    breakpoints: {
      "(min-width: 640px)": { slidesToScroll: 1 },
      "(min-width: 1024px)": { slidesToScroll: 1 },
    },
  });

  useEffect(() => {
    getAchievements()
      .then((data) => {
        const mapped = data.map(adaptAchievement);
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

  // Track active slide
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-scroll
  const startAutoScroll = useCallback(() => {
    if (autoScrollTimer.current) clearTimeout(autoScrollTimer.current);
    autoScrollTimer.current = setTimeout(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, AUTO_SCROLL_DELAY);
  }, [emblaApi]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollTimer.current) {
      clearTimeout(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }
  }, []);

  useEffect(() => {
    if (!emblaApi || isHovered) return;
    startAutoScroll();
    emblaApi.on("select", startAutoScroll);
    return () => {
      stopAutoScroll();
      emblaApi.off("select", startAutoScroll);
    };
  }, [emblaApi, isHovered, startAutoScroll, stopAutoScroll]);

  useEffect(() => {
    if (isHovered) stopAutoScroll();
    else if (emblaApi) startAutoScroll();
  }, [isHovered, emblaApi, startAutoScroll, stopAutoScroll]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  // Stats count
  const awardCount = achievements.filter(
    (a) => a.type?.toLowerCase() === "award"
  ).length;
  const certCount = achievements.filter(
    (a) =>
      a.type?.toLowerCase() === "professional" ||
      a.type?.toLowerCase() === "profesional"
  ).length;

  return (
    <section
      id="home-achievements"
      className="py-24 bg-background relative z-10 overflow-hidden text-left border-t border-border/30"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] aspect-square bg-indigo-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-6 relative">
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

            {/* Coura mascot */}
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

        {/* Dynamic Stats Bar for All Categories */}
        {!loading && !error && achievements.length > 0 && (
          <AnimatedSection delay={0.05}>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
              {Array.from(
                achievements.reduce((map, item) => {
                  const key = item.type || "Certification";
                  map.set(key, (map.get(key) || 0) + 1);
                  return map;
                }, new Map<string, number>())
              ).map(([type, count]) => {
                const lower = type.toLowerCase();
                let emoji = "🏅";
                if (lower.includes("award")) emoji = "🏆";
                else if (lower.includes("certif")) emoji = "📜";
                else if (lower.includes("course")) emoji = "🎓";
                else if (lower.includes("pro")) emoji = "⭐";

                return (
                  <div
                    key={type}
                    className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-card border border-border/60 shadow-sm transition-transform hover:scale-105"
                  >
                    <span className="text-lg">{emoji}</span>
                    <div className="text-left">
                      <span className="text-base font-extrabold text-foreground leading-none">
                        {count}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1.5 font-mono">
                        {type}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[320px] rounded-2xl bg-card border border-border/60 overflow-hidden animate-pulse h-[340px]"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="flex items-center justify-center gap-3 py-16 text-muted-foreground">
            <Loader2 size={20} className="animate-spin text-blue-500" />
            <span className="text-sm">
              {t("Failed to load data")}: {error}
            </span>
          </div>
        )}

        {/* ═══ HORIZONTAL CAROUSEL ═══ */}
        {!loading && !error && achievements.length > 0 && (
          <AnimatedSection delay={0.1}>
            <div className="space-y-8">
              {/* Carousel */}
              <div
                className="relative group/achv"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div ref={emblaRef} className="overflow-hidden">
                  <div className="flex gap-5">
                    {achievements.map((item, i) => {
                      const isAward = item.type?.toLowerCase() === "award";
                      const isActive = activeIndex === i;
                      // Lazy-render carousel images (wider range since up to 3 are visible at once)
                      const isLoaded = 
                        Math.abs(activeIndex - i) <= 2 || 
                        (activeIndex <= 1 && i >= achievements.length - 2) || 
                        (activeIndex >= achievements.length - 2 && i <= 1);

                      return (
                        <div
                          key={item.id}
                          onClick={() => emblaApi?.scrollTo(i)}
                          className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_31%] min-w-0 cursor-pointer"
                        >
                          <motion.div
                            animate={{
                              scale: isActive ? 1 : 0.97,
                              opacity: isActive ? 1 : 0.75,
                            }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="group relative flex flex-col h-full rounded-2xl glass-card-premium overflow-hidden cursor-pointer entry-shimmer"
                          >
                            {/* HUD corners */}
                            <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />
                            <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />
                            <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />
                            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />

                            {/* Image */}
                            <div className="relative h-44 overflow-hidden bg-muted flex items-center justify-center">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />
                              {item.images && item.images.length > 0 && isLoaded ? (
                                <img
                                  src={item.images[0]}
                                  alt={item.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  loading="lazy"
                                />
                              ) : (
                                <Award
                                  size={44}
                                  className="text-slate-300 dark:text-slate-700"
                                />
                              )}

                              {/* Type badge - glassmorphism */}
                              <div className="absolute top-3 right-3 z-20">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-extrabold text-white bg-blue-600/80 backdrop-blur-sm border border-blue-500/20 shadow-lg">
                                  {isAward ? (
                                    <Trophy size={9} />
                                  ) : (
                                    <Medal size={9} />
                                  )}
                                  {item.type}
                                </span>
                              </div>

                              {/* Category badge bottom-left */}
                              <div className="absolute bottom-3 left-3 z-20">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white/90 bg-white/10 backdrop-blur-sm border border-white/10">
                                  {item.category}
                                </span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-grow text-left">
                              <div className="flex items-start gap-3 mb-2">
                                <span className="text-2xl flex-shrink-0 mt-0.5">
                                  {isAward ? "🏆" : "🏅"}
                                </span>
                                <div className="min-w-0">
                                  <h3 className="font-heading font-extrabold text-sm text-card-foreground group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                    {item.title}
                                  </h3>
                                  <p className="text-xs text-muted-foreground mt-1 font-medium">
                                    {item.issuer}
                                  </p>
                                </div>
                              </div>

                              <div className="flex-1" />

                              {/* Footer */}
                              <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-border/40">
                                <span className="text-[10px] font-mono text-slate-400">
                                  {item.issueDate}
                                </span>
                                {item.credentialUrl &&
                                  item.credentialUrl !== "#" && (
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
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Prev / Next */}
                <button
                  onClick={() => emblaApi?.scrollPrev()}
                  className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card border border-border shadow-lg text-foreground flex items-center justify-center hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300 opacity-80 sm:opacity-0 sm:group-hover/achv:opacity-100 hover:scale-110"
                  aria-label="Previous achievement"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => emblaApi?.scrollNext()}
                  className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card border border-border shadow-lg text-foreground flex items-center justify-center hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300 opacity-80 sm:opacity-0 sm:group-hover/achv:opacity-100 hover:scale-110"
                  aria-label="Next achievement"
                >
                  <ChevronRight size={18} />
                </button>

                {/* Fade edges */}
                <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
                <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
              </div>

              {/* Dot indicators */}
              <div className="flex items-center justify-center gap-1.5">
                {achievements.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    className={`carousel-dot ${activeIndex === i ? "active" : ""}`}
                    aria-label={`Go to achievement ${i + 1}`}
                  />
                ))}
              </div>

              {/* View All CTA */}
              <div className="flex justify-center">
                <Link
                  to="/achievements"
                  className="group relative flex items-center justify-center gap-2 py-3 px-8 rounded-full overflow-hidden transition-all duration-350 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 bg-card border border-border hover:border-blue-500/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-500/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="tracking-widest uppercase text-[10px] font-bold font-mono text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                    {t("View All Achievements") || "View All Achievements"}
                  </span>
                  <ArrowRight
                    size={13}
                    className="text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300"
                  />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
};

export default HomeAchievements;
