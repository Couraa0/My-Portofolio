import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, FolderKanban, Star, ChevronLeft, Loader2, Cpu, Terminal, Sparkles, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import { getProjects, type Project as DBProject } from "@/lib/supabase";
import { ProjectCard, adaptProject, type Project } from "./Projects";

export const FeaturedProjects = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <section id="featured-projects" className="py-24 bg-background relative z-10 overflow-hidden text-left border-t border-border/30">
      {/* Glow Orbs in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] aspect-square bg-blue-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <AnimatedSection>
          <div className="text-center mb-16">
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
          </div>
        </AnimatedSection>

        {/* Loading */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-card border border-border/60 overflow-hidden animate-pulse">
                <div className="h-48 bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              </div>
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
        {!loading && !error && projects.length > 0 && (
          <div className="space-y-12">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.slice(0, 4).map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} onClick={() => setSelectedProject(project)} />
              ))}
            </div>

            <div className="flex justify-center">
              <Link
                to="/projects"
                className="group relative flex items-center justify-center gap-2 py-3 px-8 rounded-full overflow-hidden transition-all duration-350 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 bg-card border border-border hover:border-blue-500/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-500/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="tracking-widest uppercase text-[10px] font-bold font-mono text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                  {t("View All Projects") || "View All Projects"}
                </span>
                <ArrowRight size={13} className="text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Project Detail Modal Diagnostic Overlap Overlay */}
      {createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 z-[120] bg-background overflow-y-auto"
              onScroll={(e) => {
                window.dispatchEvent(new CustomEvent("modalState", { detail: e.currentTarget.scrollTop > 20 }));
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
                      <span className="font-mono text-[9px] text-blue-500 font-bold uppercase tracking-wider block">DIAGNOSTIC_REPORT</span>
                      <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground mt-0.5">
                        {selectedProject.title}
                      </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-slate-400">
                      <span className="p-1 px-2 bg-muted rounded border border-border/40">ROLE: {selectedProject.role || "Developer"}</span>
                      <span className="p-1 px-2 bg-muted rounded border border-border/40">CAT: {selectedProject.category.map(cat => t(cat)).join(", ")}</span>
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

                      {selectedProject.projectOutput && selectedProject.projectOutput.length > 0 && (
                        <section className="space-y-2">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                            <Sparkles size={14} className="text-purple-500" />
                            {t("Key Features")}
                          </h3>
                          <ul className="grid gap-2.5 font-mono text-xs text-slate-500 dark:text-slate-400">
                            {selectedProject.projectOutput.map((output, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-blue-500 font-bold mr-2.5">&gt;</span>
                                <span className="leading-relaxed">{output}</span>
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}
                    </div>

                    <div className="md:col-span-4 space-y-6">
                      <section className="space-y-3">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">COMPILED_TECH</h3>
                        <ul className="flex flex-wrap gap-1.5">
                          {selectedProject.tech.map((tech) => (
                            <li key={tech} className="px-2.5 py-1 text-[10px] font-bold font-mono bg-blue-500/5 text-blue-600 dark:text-blue-400 border border-blue-500/10 rounded-md">
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </section>

                      <section className="space-y-3">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">TRANSCEIVER_LINKS</h3>
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
                          {!selectedProject.liveUrl && !selectedProject.githubUrl && (
                            <p className="text-[10px] font-mono text-muted-foreground italic">{t("Private / Internal")}</p>
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
                      <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
                      <span className="tracking-widest uppercase text-[10px] font-bold font-mono">{t("Back to Projects")}</span>
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
