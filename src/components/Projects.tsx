import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, FolderKanban, Star, ChevronLeft, Loader2, Cpu, Terminal, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import AnimatedSection from "./AnimatedSection";
import { getProjects, getProjectCategories, type Project as DBProject } from "@/lib/supabase";
import { FeaturedProjects } from "./FeaturedProjects";

export interface Project {
  id: string;
  title: string;
  category: string[];
  description: string;
  role?: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  color?: string;
  image?: string;
  liveUrlLabel?: string;
  additionalDesc?: string;
  projectOutput?: string[];
}

export function adaptProject(p: DBProject): Project {
  return {
    id: p.id!,
    title: p.title,
    category: Array.isArray(p.category) ? p.category : (typeof p.category === 'string' ? [p.category] : []),
    description: p.description,
    role: p.role,
    tech: p.tech || [],
    liveUrl: p.live_url,
    githubUrl: p.github_url,
    featured: p.featured,
    color: p.color,
    image: p.image_url,
    liveUrlLabel: p.live_url_label,
    additionalDesc: p.additional_desc,
    projectOutput: p.project_output,
  };
}

export const colorMap: Record<string, { bg: string; text: string; border: string; hoverBorder: string; glow: string }> = {
  emerald: { bg: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/10", text: "text-teal-600 dark:text-teal-400", border: "border-teal-500/10", hoverBorder: "hover:border-teal-500/40 hover:shadow-teal-500/5 hover:-translate-y-1", glow: "rgba(20, 184, 166, 0.2)" },
  cyan:    { bg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/10", text: "text-sky-600 dark:text-sky-400", border: "border-sky-500/10", hoverBorder: "hover:border-sky-500/40 hover:shadow-sky-500/5 hover:-translate-y-1", glow: "rgba(6, 182, 212, 0.2)" },
  violet:  { bg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/10", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-500/10", hoverBorder: "hover:border-indigo-500/40 hover:shadow-indigo-500/5 hover:-translate-y-1", glow: "rgba(99, 102, 241, 0.2)" },
  rose:    { bg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/10", hoverBorder: "hover:border-blue-500/40 hover:shadow-blue-500/5 hover:-translate-y-1", glow: "rgba(59, 130, 246, 0.2)" },
  amber:   { bg: "bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-600/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-600/10", hoverBorder: "hover:border-blue-600/40 hover:shadow-blue-600/5 hover:-translate-y-1", glow: "rgba(37, 99, 235, 0.2)" },
  indigo:  { bg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/10", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-500/10", hoverBorder: "hover:border-indigo-500/40 hover:shadow-indigo-500/5 hover:-translate-y-1", glow: "rgba(99, 102, 241, 0.2)" },
  default: { bg: "bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-600/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-600/10", hoverBorder: "hover:border-blue-600/40 hover:shadow-blue-600/5 hover:-translate-y-1", glow: "rgba(37, 99, 235, 0.2)" },
};

const Projects = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getProjects(), getProjectCategories()])
      .then(([projectsData, categoriesData]) => {
        const mapped = projectsData.map(adaptProject);
        
        const customOrder = ["Website", "Mobile", "Business", "IOT"];
        const catNames = categoriesData.map(c => c.name).sort((a, b) => {
          const aIdx = customOrder.findIndex(cat => cat.toLowerCase() === a.toLowerCase());
          const bIdx = customOrder.findIndex(cat => cat.toLowerCase() === b.toLowerCase());
          const aPriority = aIdx !== -1 ? aIdx : 99;
          const bPriority = bIdx !== -1 ? bIdx : 99;
          if (aPriority !== bPriority) return aPriority - bPriority;
          return a.localeCompare(b);
        });
        
        setCategories(["All", ...catNames]);

        const categoryPriority: Record<string, number> = {};
        catNames.forEach((cat, index) => {
          categoryPriority[cat] = index + 1;
        });

        mapped.sort((a, b) => {
          const aCat = a.category && a.category.length > 0 ? a.category[0] : '';
          const bCat = b.category && b.category.length > 0 ? b.category[0] : '';

          const aPriority = categoryPriority[aCat] || 99;
          const bPriority = categoryPriority[bCat] || 99;
          if (aPriority !== bPriority) return aPriority - bPriority;
          
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          
          return a.title.localeCompare(b.title);
        });
        setProjects(mapped);
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

  const filtered = filter === "All" ? projects : projects.filter((p) => (p.category || []).includes(filter));

  return (
    <section id="projects" className="py-24 bg-background relative z-10 min-h-screen text-left">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Main Projects Page Title Header */}
        <AnimatedSection>
          <div className="mb-8 pb-6 border-b border-border/60 relative">
            <h2 className="font-heading text-2xl md:text-3xl font-bold flex items-center gap-3 mb-3 text-foreground">
              <FolderKanban size={28} className="text-blue-500" />
              {t("Projects")}
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl">
              {t("Projects Header Desc")}
            </p>

            {/* Coura Peak mascot - peeking from the side */}
            <motion.img
              src="/Coura - Peak.png"
              alt="Coura mascot peeking"
              className="absolute -right-2 sm:right-0 -bottom-3 w-16 sm:w-20 h-auto drop-shadow-md select-none hidden md:block pointer-events-none"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              draggable={false}
            />
          </div>
        </AnimatedSection>

        {/* Featured Projects Slide Banner (Hidden on mobile) */}
        <div className="mb-12 hidden md:block">
          <FeaturedProjects hideHeader={true} />
        </div>

        {/* Redesigned Interactive Category Filter */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-2 rounded-2xl bg-secondary/50 border border-border/60 backdrop-blur-sm shadow-sm">
            {/* Category Filter Pills — Horizontal swipe row on mobile */}
            <div className="relative flex overflow-x-auto no-scrollbar scroll-smooth gap-1.5 w-full sm:w-auto justify-start items-center py-1 flex-nowrap sm:flex-wrap shrink-0">
              {categories.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`relative flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-bold transition-colors duration-300 shrink-0 whitespace-nowrap ${
                    filter === f
                      ? "text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {filter === f && (
                    <motion.div
                      layoutId="projectFilterPill"
                      className="absolute inset-0 rounded-xl bg-blue-600 shadow-md shadow-blue-500/20 z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {f === "All" ? <Sparkles size={13} /> : <FolderKanban size={13} />}
                    {t(f)}
                  </span>
                </button>
              ))}
            </div>

            {/* Results counter badge */}
            <div className="text-xs text-muted-foreground font-mono font-bold flex items-center gap-2 px-3.5 py-2 rounded-xl bg-background border border-border/60 shrink-0">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span>Showing {filtered.length} {t("projects") || "projects"}</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Loading */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
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
        {!loading && !error && (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} onClick={() => setSelectedProject(project)} />
              ))}
            </motion.div>
          </AnimatePresence>
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
              
              {/* Corner HUD markers on content body */}
              <div className="relative p-6 border border-border/80 rounded-2xl bg-card/30 shadow-inner overflow-hidden mb-12">
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-blue-500/50" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-blue-500/50" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-blue-500/50" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-blue-500/50" />

                {/* Title Header */}
                <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="text-left">
                    <span className="font-mono text-[9px] text-blue-500 font-bold uppercase tracking-wider block">DIAGNOSTIC_REPORT</span>
                    <h1 className="text-2xl md:text-4xl font-heading font-bold text-foreground mt-0.5">
                      {selectedProject.title}
                    </h1>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-slate-400">
                    <span className="p-1 px-2 bg-muted rounded border border-border/40">ROLE: {selectedProject.role || "Developer"}</span>
                    <span className="p-1 px-2 bg-muted rounded border border-border/40">CAT: {(Array.isArray(selectedProject.category) ? selectedProject.category : (typeof selectedProject.category === 'string' ? [selectedProject.category] : [])).map(cat => t(cat)).join(", ")}</span>
                  </div>
                </div>

                {/* Big Image Scanner */}
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
                  
                  {/* Left Specs (8 cols) */}
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
                  
                  {/* Right Specs (4 cols) */}
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

              {/* Bottom Back Button */}
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

export const ProjectCard = ({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) => {
  const theme = colorMap[project.color || "default"] || colorMap["default"];
  
  return (
    <AnimatedSection delay={index * 0.05}>
      <motion.div
        whileHover={{ y: -4 }}
        onClick={onClick}
        className={`group flex flex-col h-full rounded-2xl bg-card border border-border/60 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer relative ${theme.hoverBorder}`}
      >
        
        {/* HUD Absolute Corner Indicators on card hover */}
        <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />
        <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />
        <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />
        <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />

        {/* Cover Image */}
        <div className="relative h-44 sm:h-48 overflow-hidden bg-muted flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent pointer-events-none z-10" />
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
          ) : (
            <FolderKanban size={44} className="text-slate-300 dark:text-slate-700" />
          )}
          {project.featured && (
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-bl-lg shadow flex items-center gap-1 z-20">
              <Star size={11} fill="currentColor" strokeWidth={0} />
              FEATURED
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow text-left">
          
          <h3 className="font-heading font-extrabold text-base mb-1.5 text-card-foreground group-hover:text-blue-600 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex-1" />


          
          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-1 mt-4 pt-3.5 border-t border-border/40">
            {project.tech.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className={`px-2 py-0.5 ${theme.bg} text-[10px] font-bold font-mono rounded-md`}
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className={`px-2 py-0.5 ${theme.bg} text-[10px] font-bold font-mono rounded-md`}>
                +{project.tech.length - 3}
              </span>
            )}
          </div>

          {/* Links Row */}
          <div className="flex items-center gap-3 mt-3 pt-2.5">
            {project.githubUrl && (
              <div className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors" title="Source Code">
                <Github size={15} />
              </div>
            )}
            {project.liveUrl && (
              <div className="p-1 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded transition-colors ml-auto flex items-center gap-1 text-[10px] font-bold">
                {project.liveUrlLabel || "Live Demo"}
                <ExternalLink size={11} />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
};

export default Projects;
