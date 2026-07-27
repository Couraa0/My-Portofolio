import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  FolderKanban,
  Star,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Cpu,
  Terminal,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import AnimatedSection from "./AnimatedSection";
import { getProjects, type Project as DBProject } from "@/lib/supabase";
import { adaptProject, type Project, colorMap } from "./Projects";

const AUTOPLAY_DELAY = 5000;

interface FeaturedProjectsProps {
  hideHeader?: boolean;
  className?: string;
}

export const FeaturedProjects = ({ hideHeader = false, className = "" }: FeaturedProjectsProps) => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressKey = useRef(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });

  useEffect(() => {
    getProjects()
      .then((projectsData) => {
        const mapped = projectsData.map(adaptProject);
        const featured = mapped.filter((p) => p.featured);
        setProjects(featured);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // Track active slide
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
    progressKey.current += 1;
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  // Auto-play logic
  const startAutoplay = useCallback(() => {
    if (autoplayTimer.current) clearTimeout(autoplayTimer.current);
    autoplayTimer.current = setTimeout(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, AUTOPLAY_DELAY);
  }, [emblaApi]);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimer.current) {
      clearTimeout(autoplayTimer.current);
      autoplayTimer.current = null;
    }
  }, []);

  useEffect(() => {
    if (!emblaApi || isHovered) return;
    startAutoplay();
    emblaApi.on("select", startAutoplay);
    return () => {
      stopAutoplay();
      emblaApi.off("select", startAutoplay);
    };
  }, [emblaApi, isHovered, startAutoplay, stopAutoplay]);

  useEffect(() => {
    if (isHovered) stopAutoplay();
    else if (emblaApi) startAutoplay();
  }, [isHovered, emblaApi, startAutoplay, stopAutoplay]);

  // Modal body scroll lock
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.dispatchEvent(new CustomEvent("modalState", { detail: false }));
    } else {
      document.body.style.overflow = "unset";
      window.dispatchEvent(new CustomEvent("modalState", { detail: false }));
    }
    return () => {
      document.body.style.overflow = "unset";
      window.dispatchEvent(new CustomEvent("modalState", { detail: false }));
    };
  }, [selectedProject]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <section
      id="featured-projects"
      className={hideHeader ? `relative z-10 text-left ${className}` : `py-24 bg-background relative z-10 overflow-hidden text-left border-t border-border/30 ${className}`}
    >
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] aspect-square bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className={hideHeader ? "w-full" : "container mx-auto px-4 sm:px-6 max-w-6xl"}>
        {/* Section Header */}
        {!hideHeader && (
          <AnimatedSection>
            <div className="text-center mb-12 relative">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold mb-4 border"
                style={{
                  background: "hsl(215 100% 55% / 0.08)",
                  borderColor: "hsl(215 100% 55% / 0.25)",
                  color: "hsl(215 100% 50%)",
                }}
              >
                <Sparkles size={13} className="text-sky-500" />
                {t("FEATURED") || "FEATURED"}
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                {t("Featured Projects")}
              </h2>
              <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
                {t("Featured Projects Subtitle")}
              </p>

              {/* Coura Peak mascot */}
              <motion.img
                src="/Coura - Peak.png"
                alt="Coura mascot peeking"
                className="absolute -right-2 sm:right-4 lg:right-16 -top-4 w-16 sm:w-20 h-auto drop-shadow-md select-none hidden md:block pointer-events-none"
                animate={{ y: [0, -3, 0], x: [0, 4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                draggable={false}
              />
            </div>
          </AnimatedSection>
        )}

        {/* Loading */}
        {loading && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-card border border-border/60 overflow-hidden animate-pulse h-[420px]" />
            <div className="flex justify-center gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-8 h-2 bg-muted rounded-full" />
              ))}
            </div>
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

        {/* ═══ CAROUSEL ═══ */}
        {!loading && !error && projects.length > 0 && (
          <AnimatedSection delay={0.1}>
            <div className="space-y-8">
              {/* Carousel Viewport */}
              <div
                className="relative group/carousel"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Embla container */}
                <div ref={emblaRef} className="overflow-hidden rounded-2xl">
                  <div className="flex">
                    {projects.map((project, i) => {
                      const theme =
                        colorMap[project.color || "default"] ||
                        colorMap["default"];
                      return (
                        <div
                          key={project.id}
                          className="flex-[0_0_100%] min-w-0"
                        >
                          {/* Slide Card */}
                          <div
                            className="relative rounded-2xl overflow-hidden bg-card border border-border/60 cursor-pointer perspective-container entry-shimmer"
                            onClick={() => setSelectedProject(project)}
                          >
                            {/* Image Side */}
                            <div className="relative h-[280px] sm:h-[340px] md:h-[420px] overflow-hidden">
                              {project.image ? (
                                <motion.img
                                  src={project.image}
                                  alt={project.title}
                                  className="w-full h-full object-cover"
                                  initial={false}
                                  whileHover={{ scale: 1.03 }}
                                  transition={{ duration: 0.6 }}
                                />
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/30 bg-muted">
                                  <FolderKanban size={64} className="mb-4" />
                                  <span>{t("No preview image")}</span>
                                </div>
                              )}

                              {/* Gradient overlay on image bottom */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                              {/* Slide Counter */}
                              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20">
                                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold font-mono text-white/80 bg-white/10 backdrop-blur-md border border-white/10">
                                  <Star
                                    size={10}
                                    fill="currentColor"
                                    strokeWidth={0}
                                    className="text-yellow-400"
                                  />
                                  {String(i + 1).padStart(2, "0")} /{" "}
                                  {String(projects.length).padStart(2, "0")}
                                </span>
                              </div>

                              {/* Featured badge */}
                              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20">
                                <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white bg-blue-600/90 backdrop-blur-sm shadow-lg">
                                  <Star
                                    size={10}
                                    fill="currentColor"
                                    strokeWidth={0}
                                  />
                                  FEATURED
                                </span>
                              </div>

                              {/* Content overlay at bottom of image */}
                              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 z-10">
                                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                                  {/* Info */}
                                  <div className="flex-1 min-w-0">
                                    {/* Category tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                      {project.category.map((cat) => (
                                        <span
                                          key={cat}
                                          className="px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white/90 bg-white/10 backdrop-blur-sm rounded-full border border-white/10"
                                        >
                                          {t(cat)}
                                        </span>
                                      ))}
                                    </div>

                                    <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight">
                                      {project.title}
                                    </h3>
                                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed line-clamp-2 max-w-2xl">
                                      {project.description}
                                    </p>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-1.5 mt-3">
                                      {project.tech.slice(0, 5).map((tech) => (
                                        <span
                                          key={tech}
                                          className="px-2 py-0.5 text-[10px] font-bold font-mono text-blue-300 bg-blue-500/15 backdrop-blur-sm rounded-md border border-blue-400/15"
                                        >
                                          {tech}
                                        </span>
                                      ))}
                                      {project.tech.length > 5 && (
                                        <span className="px-2 py-0.5 text-[10px] font-bold font-mono text-white/60 bg-white/5 rounded-md border border-white/10">
                                          +{project.tech.length - 5}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Quick Actions */}
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    {project.liveUrl && (
                                      <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-bold font-mono text-white bg-blue-600/80 backdrop-blur-sm border border-blue-500/30 hover:bg-blue-600 transition-all duration-300 hover:scale-105 shadow-lg"
                                      >
                                        {project.liveUrlLabel ||
                                          t("Live Demo")}
                                        <ExternalLink size={11} />
                                      </a>
                                    )}
                                    {project.githubUrl && (
                                      <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex items-center justify-center w-9 h-9 rounded-full text-white/80 bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                                        title={t("Source Code")}
                                      >
                                        <Github size={15} />
                                      </a>
                                    )}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedProject(project);
                                      }}
                                      className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-bold font-mono text-white/90 bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                                    >
                                      {t("Details")}
                                      <ArrowRight size={11} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Prev / Next Buttons */}
                <button
                  onClick={() => emblaApi?.scrollPrev()}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-black/60 transition-all duration-300 opacity-80 sm:opacity-0 sm:group-hover/carousel:opacity-100 hover:scale-110"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => emblaApi?.scrollNext()}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-black/60 transition-all duration-300 opacity-80 sm:opacity-0 sm:group-hover/carousel:opacity-100 hover:scale-110"
                  aria-label="Next slide"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Dots + Progress Bar */}
              <div className="flex flex-col items-center gap-4">
                {/* Dot Indicators */}
                <div className="flex items-center gap-2">
                  {projects.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollTo(i)}
                      className={`carousel-dot ${activeIndex === i ? "active" : ""}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Auto-play Progress */}
                <div className="w-full max-w-xs carousel-progress-bar">
                  <div
                    key={progressKey.current}
                    className="carousel-progress-fill carousel-autoplay-animate"
                    style={{
                      "--autoplay-duration": `${AUTOPLAY_DELAY}ms`,
                      animationPlayState: isHovered ? "paused" : "running",
                    } as React.CSSProperties}
                  />
                </div>
              </div>

              {/* View All Projects CTA */}
              <div className="flex justify-center">
                <Link
                  to="/projects"
                  className="group relative flex items-center justify-center gap-2 py-3 px-8 rounded-full overflow-hidden transition-all duration-350 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 bg-card border border-border hover:border-blue-500/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-500/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="tracking-widest uppercase text-[10px] font-bold font-mono text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                    {t("View All Projects") || "View All Projects"}
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

      {/* Project Detail Modal (preserved from original) */}
      {createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 z-[120] bg-background overflow-y-auto"
              onScroll={(e) => {
                window.dispatchEvent(
                  new CustomEvent("modalState", {
                    detail: e.currentTarget.scrollTop > 20,
                  })
                );
              }}
            >
              <div className="container mx-auto px-4 sm:px-6 pt-28 pb-12 max-w-4xl min-h-screen flex flex-col">
                <div className="relative p-6 border border-border/80 rounded-2xl bg-card/30 shadow-inner overflow-hidden mb-12">
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-blue-500/50" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-blue-500/50" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-blue-500/50" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-blue-500/50" />

                  {/* Title Header */}
                  <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left">
                    <div>
                      <span className="font-mono text-[9px] text-blue-500 font-bold uppercase tracking-wider block">
                        DIAGNOSTIC_REPORT
                      </span>
                      <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground mt-0.5">
                        {selectedProject.title}
                      </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-slate-400">
                      <span className="p-1 px-2 bg-muted rounded border border-border/40">
                        ROLE: {selectedProject.role || "Developer"}
                      </span>
                      <span className="p-1 px-2 bg-muted rounded border border-border/40">
                        CAT:{" "}
                        {selectedProject.category
                          .map((cat) => t(cat))
                          .join(", ")}
                      </span>
                    </div>
                  </div>

                  {/* Image Scanner */}
                  <div className="w-full relative rounded-xl overflow-hidden bg-muted/40 aspect-video mb-8 border border-border/60">
                    {selectedProject.image ? (
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/45">
                        <FolderKanban size={64} className="mb-4" />
                        <span>{t("No preview image")}</span>
                      </div>
                    )}
                  </div>

                  {/* Content Matrix Grid */}
                  <div className="grid md:grid-cols-12 gap-8 text-left">
                    <div className="md:col-span-8 space-y-6">
                      <section className="space-y-2">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                          <Terminal size={14} className="text-blue-500" />
                          SYSTEM_OVERVIEW
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-wrap font-sans">
                          {selectedProject.description}
                        </p>
                      </section>

                      {selectedProject.additionalDesc && (
                        <section className="space-y-2">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                            <Cpu size={14} className="text-sky-500" />
                            APPROACH_AND_SOLUTION
                          </h3>
                          <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-wrap font-sans">
                            {selectedProject.additionalDesc}
                          </p>
                        </section>
                      )}

                      {selectedProject.projectOutput &&
                        selectedProject.projectOutput.length > 0 && (
                          <section className="space-y-2">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                              <Sparkles
                                size={14}
                                className="text-purple-500"
                              />
                              {t("Key Features")}
                            </h3>
                            <ul className="grid gap-2.5 font-mono text-xs text-slate-500 dark:text-slate-400">
                              {selectedProject.projectOutput.map(
                                (output, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <span className="text-blue-500 font-bold mr-2.5">
                                      &gt;
                                    </span>
                                    <span className="leading-relaxed">
                                      {output}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </section>
                        )}
                    </div>

                    <div className="md:col-span-4 space-y-6">
                      <section className="space-y-3">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                          COMPILED_TECH
                        </h3>
                        <ul className="flex flex-wrap gap-1.5">
                          {selectedProject.tech.map((tech) => (
                            <li
                              key={tech}
                              className="px-2.5 py-1 text-[10px] font-bold font-mono bg-blue-500/5 text-blue-600 dark:text-blue-400 border border-blue-500/10 rounded-md"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </section>

                      <section className="space-y-3">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                          TRANSCEIVER_LINKS
                        </h3>
                        <div className="flex flex-col gap-2.5">
                          {selectedProject.liveUrl && (
                            <a
                              href={selectedProject.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10 text-blue-600 border border-blue-500/10 font-bold font-mono text-xs hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all shadow-sm"
                            >
                              {selectedProject.liveUrlLabel || t("Live Demo")}
                              <ExternalLink size={14} />
                            </a>
                          )}
                          {selectedProject.githubUrl && (
                            <a
                              href={selectedProject.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-between p-3 rounded-xl bg-muted text-foreground font-bold font-mono text-xs border border-border hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                            >
                              {t("Source Code")}
                              <Github size={14} />
                            </a>
                          )}
                          {!selectedProject.liveUrl &&
                            !selectedProject.githubUrl && (
                              <p className="text-[10px] font-mono text-muted-foreground italic">
                                {t("Private / Internal")}
                              </p>
                            )}
                        </div>
                      </section>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-center relative group/back">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-16 bg-blue-500/10 blur-[30px] rounded-full pointer-events-none opacity-0 group-hover/back:opacity-100 transition-opacity duration-500" />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="group relative flex items-center justify-center gap-2 py-3 px-8 rounded-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 bg-card border border-border hover:border-blue-500/50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-500/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex items-center gap-2 text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                      <ChevronLeft
                        size={16}
                        className="group-hover:-translate-x-1 transition-transform duration-300"
                      />
                      <span className="tracking-widest uppercase text-[10px] font-bold font-mono">
                        {t("Back to Projects")}
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};
