import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Star, FileText, X, Maximize2, Briefcase, ChevronRight, Layers, Layout, Target } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { projects, type Project } from "@/data/projects";
import { useTranslation } from "react-i18next";

type Filter = "All" | "Professional" | "Personal" | "IOT";

const cardPalette = [
  { from: "hsl(250 84% 60%)", to: "hsl(196 100% 47%)", fromLight: "hsl(250 84% 60% / 0.08)", border: "hsl(250 84% 60% / 0.2)", tag: "hsl(250 84% 50%)" },
  { from: "hsl(344 85% 60%)", to: "hsl(37 100% 50%)", fromLight: "hsl(344 85% 60% / 0.08)", border: "hsl(344 85% 60% / 0.2)", tag: "hsl(344 85% 50%)" },
  { from: "hsl(158 80% 42%)", to: "hsl(196 100% 47%)", fromLight: "hsl(158 80% 42% / 0.08)", border: "hsl(158 80% 42% / 0.2)", tag: "hsl(158 80% 35%)" },
  { from: "hsl(37 100% 50%)", to: "hsl(250 84% 60%)", fromLight: "hsl(37 100% 50% / 0.08)", border: "hsl(37 100% 50% / 0.2)", tag: "hsl(37 100% 38%)" },
  { from: "hsl(196 100% 47%)", to: "hsl(344 85% 60%)", fromLight: "hsl(196 100% 47% / 0.08)", border: "hsl(196 100% 47% / 0.2)", tag: "hsl(196 100% 36%)" },
  { from: "hsl(237 80% 62%)", to: "hsl(250 84% 60%)", fromLight: "hsl(237 80% 62% / 0.08)", border: "hsl(237 80% 62% / 0.2)", tag: "hsl(237 80% 52%)" },
];

const paletteMap = {
  violet: cardPalette[0],
  rose: cardPalette[1],
  emerald: cardPalette[2],
  amber: cardPalette[3],
  cyan: cardPalette[4],
  indigo: cardPalette[5],
};

const Projects = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>("Professional");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-28 bg-background relative overflow-hidden">
      {/* Background Decorations */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute top-24 right-[12%] opacity-[0.4] text-orange-500 z-0">
        <div className="flex items-center justify-center p-2 rounded-xl bg-orange-500/5 border border-orange-500/10">
          <Star size={45} fill="currentColor" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute top-24 left-[15%] opacity-[0.4] text-red-500 z-0">
        <Briefcase size={40} />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold mb-4"
              style={{ background: "hsl(344 85% 60% / 0.08)", border: "1px solid hsl(344 85% 60% / 0.2)", color: "hsl(344 85% 50%)" }}>
              {t("My Work")}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              {t("Featured Projects").split(" ")[0]} <span className="text-gradient-rose">{t("Featured Projects").split(" ")[1]}</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* Filter tabs */}
        <AnimatedSection delay={0.1}>
          <div className="flex justify-center flex-wrap gap-1.5 sm:gap-2 mb-10 sm:mb-14">
            {(["Professional", "Personal", "IOT", "All"] as Filter[]).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className="rounded-full px-4 py-2 sm:px-6 sm:py-2.5 text-[11px] sm:text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={filter === f ? {
                  background: "linear-gradient(135deg, hsl(250 84% 60%), hsl(196 100% 47%))",
                  color: "white",
                  boxShadow: "0 4px 16px hsl(250 84% 60% / 0.3)"
                } : {
                  background: "hsl(var(--muted))",
                  border: "1px solid hsl(var(--border))",
                  color: "hsl(215 16% 48%)"
                }}>
                {t(f)}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          <motion.div key={filter}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            <p className="sr-only">List of {filter} projects</p>
            {filtered.map((project, i) => {
              const palette = project.color ? paletteMap[project.color as keyof typeof paletteMap] : cardPalette[i % cardPalette.length];
              return <ProjectCard key={project.id} project={project} index={i} palette={palette} onDetailClick={() => setSelectedProject(project)} />;
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <ProjectDetailModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

/* ── Project Card Component ─────────────────────────── */

const ProjectCard = ({ project, index, palette, onDetailClick }: {
  project: Project;
  index: number;
  palette: typeof cardPalette[0];
  onDetailClick: () => void;
}) => {
  const { t } = useTranslation();
  const [likes, setLikes] = useState(() => {
    const saved = localStorage.getItem(`project-likes-${project.id}`);
    return saved ? parseInt(saved) : 0;
  });
  const [hasLiked, setHasLiked] = useState(() => {
    return localStorage.getItem(`project-has-liked-${project.id}`) === "true";
  });

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLiked) return;
    const newLikes = likes + 1;
    setLikes(newLikes);
    setHasLiked(true);
    localStorage.setItem(`project-likes-${project.id}`, newLikes.toString());
    localStorage.setItem(`project-has-liked-${project.id}`, "true");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
      onClick={onDetailClick}
      className="rounded-2xl bg-background overflow-hidden group border cursor-pointer h-full flex flex-col"
      style={{ borderColor: palette.border, boxShadow: `0 2px 12px hsl(var(--foreground) / 0.08)`, transition: "box-shadow 0.3s, border-color 0.3s" }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${palette.from}15`}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 12px hsl(var(--foreground) / 0.08)`}>

      {/* Header (Image or Gradient) */}
      <div className="aspect-video relative overflow-hidden"
        style={{ background: project.image ? "none" : `linear-gradient(135deg, ${palette.fromLight}, hsl(var(--muted)))` }}>

        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full relative">
            <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full opacity-40"
              style={{ background: `radial-gradient(circle, ${palette.from}, transparent 70%)` }} />
            <span className="font-heading text-3xl font-black" style={{ color: `${palette.from}`, opacity: 0.2 }}>
              {project.title.split(" ").map(w => w[0]).join("").slice(0, 3)}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 text-white text-xs font-bold flex items-center gap-2 scale-90 group-hover:scale-100 transition-transform">
            <Maximize2 size={14} /> {t("Click card for details")}
          </div>
        </div>

        {project.featured && (
          <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold text-white z-20"
            style={{ background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` }}>
            <Star size={9} fill="currentColor" /> {t("Featured")}
          </span>
        )}
      </div>

      <div className="p-5 space-y-3 flex-1 flex flex-col text-left">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
              style={{ background: palette.fromLight, color: palette.tag }}>
              {t(project.category)}
            </span>
          </div>
          {/* Reaction Button */}
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border transition-all ${
              hasLiked ? "bg-rose-500/10 border-rose-500/30 text-rose-500" : "bg-muted text-muted-foreground hover:bg-rose-500/5 hover:text-rose-500 hover:border-rose-500/30"
            }`}
          >
            <Star size={10} fill={hasLiked ? "currentColor" : "none"} /> {likes > 0 ? likes : t("Like")}
          </button>
        </div>

        <h3 className="font-heading font-bold text-foreground text-sm flex items-center justify-between group-hover:text-primary transition-colors">
          {project.title}
          <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed flex-1">{t(project.description)}</p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tech.slice(0, 3).map((tech) => (
            <span key={tech} className="rounded-md bg-muted px-2 py-0.5 text-[9px] font-medium text-muted-foreground border border-border">
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
             <span className="text-[9px] text-muted-foreground font-medium pt-0.5">+{project.tech.length - 3}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ── Project Detail Modal ────────────────────────────── */

const ProjectDetailModal = ({ project, isOpen, onClose }: { project: Project | null, isOpen: boolean, onClose: () => void }) => {
  const { t } = useTranslation();
  if (!project) return null;

  const palette = project.color ? paletteMap[project.color as keyof typeof paletteMap] : cardPalette[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl bg-background rounded-3xl overflow-hidden shadow-2xl border border-border max-h-[90vh] flex flex-col"
          >
            {/* Close Button */}
            <button onClick={onClose} 
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/10 hover:bg-black/20 text-foreground transition-colors backdrop-blur-md">
              <X size={20} />
            </button>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="grid md:grid-cols-2">
                {/* Visual Left */}
                <div className="p-6 md:p-8 flex flex-col justify-center bg-muted/30">
                  <div className="rounded-2xl overflow-hidden border border-border shadow-xl aspect-video bg-background group relative">
                    {project.image ? (
                       <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-4xl font-black opacity-10" style={{ color: palette.from }}>
                        {project.title.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                       <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest">{t(project.category)}</span>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-background border border-border">
                      <div className="flex items-center gap-2 mb-2 text-primary">
                        <Target size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{t("Role")}</span>
                      </div>
                      <p className="text-xs font-semibold text-foreground">{t(project.role || "Developer")}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-background border border-border">
                      <div className="flex items-center gap-2 mb-2 text-primary">
                         <Layout size={14} />
                         <span className="text-[10px] font-bold uppercase tracking-wider">{t("Status")}</span>
                      </div>
                      <p className="text-xs font-semibold text-foreground">{project.featured ? t("Featured") : t("Completed")}</p>
                    </div>
                  </div>
                </div>

                {/* Content Right */}
                <div className="p-8 md:p-10 space-y-8 flex flex-col">
                  <div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {project.title}
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {t(project.description)}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-foreground font-bold text-sm">
                      <Layers size={16} />
                      {t("Expertise")}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1.5 rounded-xl bg-secondary text-[11px] font-bold text-muted-foreground border border-border shadow-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 flex flex-wrap gap-4 mt-auto">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
                        style={{ background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` }}>
                        <ExternalLink size={16} />
                        {t(project.liveUrlLabel || "Live Demo")}
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-muted border border-border text-foreground transition-all hover:bg-muted/80 hover:scale-105 active:scale-95">
                        <Github size={16} />
                        {t("Github")}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Projects;
