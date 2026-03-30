import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, FolderKanban, Star, ChevronLeft, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import AnimatedSection from "./AnimatedSection";
import { getProjects, type Project as DBProject } from "@/lib/supabase";

type Filter = "All" | "Professional" | "Personal" | "IOT";

// Adapter: map DB snake_case fields → component camelCase
interface Project {
  id: string;
  title: string;
  category: "Professional" | "Personal" | "IOT";
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

function adaptProject(p: DBProject): Project {
  return {
    id: p.id!,
    title: p.title,
    category: p.category,
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

const colorMap: Record<string, { bg: string; text: string; border: string; hoverBorder: string }> = {
  emerald: { bg: "bg-emerald/10", text: "text-emerald", border: "border-emerald/20", hoverBorder: "hover:border-emerald/50" },
  cyan:    { bg: "bg-cyan/10",    text: "text-cyan",    border: "border-cyan/20",    hoverBorder: "hover:border-cyan/50" },
  violet:  { bg: "bg-violet/10",  text: "text-violet",  border: "border-violet/20",  hoverBorder: "hover:border-violet/50" },
  rose:    { bg: "bg-rose/10",    text: "text-rose",    border: "border-rose/20",    hoverBorder: "hover:border-rose/50" },
  amber:   { bg: "bg-amber/10",   text: "text-amber",   border: "border-amber/20",   hoverBorder: "hover:border-amber/50" },
  indigo:  { bg: "bg-indigo/10",  text: "text-indigo",  border: "border-indigo/20",  hoverBorder: "hover:border-indigo/50" },
  default: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20", hoverBorder: "hover:border-primary/50" },
};

const Projects = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProjects()
      .then((data) => {
        const mapped = data.map(adaptProject);
        // Sort: featured projects come first
        mapped.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0; // maintain database original order for ties
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

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-background relative z-10 min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <AnimatedSection>
          <div className="mb-10 pb-6 border-b border-border/60">
            <h2 className="font-heading text-2xl md:text-3xl font-bold flex items-center gap-3 mb-3 text-foreground">
              <FolderKanban size={28} className="text-primary" />
              {t("Projects")}
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl">
              {t("Projects Header Desc")}
            </p>
          </div>
        </AnimatedSection>

        {/* Filter */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="text-sm font-semibold text-muted-foreground mr-2">{t("CATEGORY")}</span>
            {(["All", "Professional", "Personal", "IOT"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                  filter === f
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {t(f)}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Loading */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-card border border-border overflow-hidden animate-pulse">
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
            <Loader2 size={20} className="animate-spin" />
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

      {/* Project Detail Modal / Page */}
      {createPortal(
        <AnimatePresence>
          {selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-40 bg-background overflow-y-auto"
            onScroll={(e) => {
              window.dispatchEvent(new CustomEvent("modalState", { detail: e.currentTarget.scrollTop > 20 }));
            }}
          >
            <div className="container mx-auto px-6 pt-28 pb-12 max-w-4xl min-h-screen flex flex-col">
              {/* Title Header */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-foreground">
                  {selectedProject.title}
                </h1>
                <div className="flex items-center gap-4 pt-6 border-t border-border/60">
                  <span className="text-sm text-muted-foreground">{t("Role:")} <strong className="text-foreground">{selectedProject.role || "Developer"}</strong></span>
                  <span className="text-sm text-muted-foreground">{t("Category:")} <strong className="text-foreground">{t(selectedProject.category)}</strong></span>
                </div>
              </div>

              {/* Big Image */}
              <div 
                className="w-full relative rounded-2xl overflow-hidden bg-muted/30 aspect-video mb-10 border border-border/50"
              >
                {selectedProject.image ? (
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/50">
                    <FolderKanban size={64} className="mb-4" />
                    <span>{t("No preview image")}</span>
                  </div>
                )}
              </div>

              {/* Content Grid */}
              <div className="grid md:grid-cols-3 gap-10 pb-20">
                <div className="md:col-span-2 space-y-8">
                  <section>
                    <h3 className="text-xl font-bold mb-4">Overview</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-wrap">
                      {selectedProject.description}
                    </p>
                  </section>
                  
                  {selectedProject.additionalDesc && (
                    <section>
                      <h3 className="text-xl font-bold mb-4">Approach & Solution</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-wrap">
                        {selectedProject.additionalDesc}
                      </p>
                    </section>
                  )}

                  {selectedProject.projectOutput && selectedProject.projectOutput.length > 0 && (
                    <section>
                      <h3 className="text-xl font-bold mb-4">{t("Key Features")}</h3>
                      <ul className="grid gap-3">
                        {selectedProject.projectOutput.map((output, idx) => (
                          <li key={idx} className="flex items-start text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-3 flex-shrink-0" />
                            <span className="leading-relaxed">{output}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </div>
                
                <div className="space-y-8">
                  <section>
                    <h3 className="text-lg font-bold mb-4">Tech Stack</h3>
                    <ul className="flex flex-col gap-2">
                      {selectedProject.tech.map((t) => (
                        <li key={t} className="flex items-center text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </section>
                  
                  <section>
                    <h3 className="text-lg font-bold mb-4">{t("Links")}</h3>
                    <div className="flex flex-col gap-3">
                      {selectedProject.liveUrl && (
                        <a 
                          href={selectedProject.liveUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors"
                        >
                          {selectedProject.liveUrlLabel || t("Live Demo")}
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {selectedProject.githubUrl && (
                        <a 
                          href={selectedProject.githubUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg bg-muted text-foreground font-semibold hover:bg-muted/80 transition-colors"
                        >
                          {t("Source Code")}
                          <Github size={16} />
                        </a>
                      )}
                      {!selectedProject.liveUrl && !selectedProject.githubUrl && (
                        <p className="text-sm text-muted-foreground italic">{t("Private / Internal")}</p>
                      )}
                    </div>
                  </section>
                </div>
              </div>

              {/* Bottom Back Button */}
              <div className="mt-8 pt-8 border-t border-border/50 flex justify-center pb-12">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center justify-center gap-2 bg-muted text-foreground hover:bg-muted/80 font-semibold py-3 px-8 rounded-xl transition-colors"
                >
                  <ChevronLeft size={20} />
                  {t("Back to Projects")}
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

const ProjectCard = ({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) => {
  const theme = colorMap[project.color || "default"] || colorMap["default"];
  
  return (
    <AnimatedSection delay={index * 0.05}>
      <motion.div
        whileHover={{ y: -4 }}
        onClick={onClick}
        className={`group flex flex-col h-full rounded-2xl bg-card border border-border overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${theme.hoverBorder}`}
      >
        {/* Cover Image */}
        <div className="relative h-48 sm:h-52 overflow-hidden bg-muted flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent pointer-events-none z-10" />
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <FolderKanban size={48} className="text-muted-foreground/30" />
          )}
          {project.featured && (
            <div className="absolute top-0 right-0 bg-[#ffcc00] text-black text-[10px] uppercase tracking-wider font-extrabold px-3 py-1.5 rounded-bl-xl shadow flex items-center gap-1 z-20">
              <Star size={12} fill="currentColor" strokeWidth={0} />
              FEATURED
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className={`font-heading font-bold text-lg mb-1.5 text-card-foreground group-hover:${theme.text} transition-colors line-clamp-1`}>
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex-1" />

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/40">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className={`px-2.5 py-1 ${theme.bg} ${theme.text} text-[10px] font-semibold rounded-md`}
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className={`px-2.5 py-1 ${theme.bg} ${theme.text} text-[10px] font-semibold rounded-md`}>
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Links Row */}
          <div className="flex items-center gap-3 mt-4 pt-3">
            {project.githubUrl && (
              <div className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors" title="Source Code">
                <Github size={16} />
              </div>
            )}
            {project.liveUrl && (
              <div className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors ml-auto flex items-center gap-1.5 text-[11px] font-semibold">
                {project.liveUrlLabel || "Live Demo"}
                <ExternalLink size={12} />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
};

export default Projects;
