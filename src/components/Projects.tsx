import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Star, FileText, X, Maximize2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { projects, type Project } from "@/data/projects";

type Filter = "All" | "Professional" | "Personal";

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
  const [filter, setFilter] = useState<Filter>("Professional");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const openModal = useCallback((img: string) => setSelectedImage(img), []);
  const closeModal = useCallback(() => setSelectedImage(null), []);

  return (
    <section id="projects" className="py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.3] bg-grid pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold mb-4"
              style={{ background: "hsl(344 85% 60% / 0.08)", border: "1px solid hsl(344 85% 60% / 0.2)", color: "hsl(344 85% 50%)" }}>
              My Work
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              Featured <span className="text-gradient-rose">Projects</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* Filter tabs */}
        <AnimatedSection delay={0.1}>
          <div className="flex justify-center gap-2 mb-14">
            {(["Professional", "Personal", "All"] as Filter[]).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className="rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={filter === f ? {
                  background: "linear-gradient(135deg, hsl(250 84% 60%), hsl(196 100% 47%))",
                  color: "white",
                  boxShadow: "0 4px 16px hsl(250 84% 60% / 0.3)"
                } : {
                  background: "hsl(220 20% 96%)",
                  border: "1px solid hsl(220 20% 90%)",
                  color: "hsl(215 16% 48%)"
                }}>
                {f}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          <motion.div key={filter}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => {
              const palette = project.color ? paletteMap[project.color] : cardPalette[i % cardPalette.length];
              return <ProjectCard key={project.id} project={project} index={i} palette={palette} onImageClick={openModal} />;
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Image Modal Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full backdrop-blur-md"
              >
                <X size={24} />
              </button>
              <img
                src={selectedImage}
                alt="Project detail"
                className="w-full h-full object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ProjectCard = ({ project, index, palette, onImageClick }: {
  project: Project;
  index: number;
  palette: typeof cardPalette[0];
  onImageClick: (img: string) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.07 }}
    whileHover={{ y: -6 }}
    className="rounded-2xl bg-white overflow-hidden group border"
    style={{ borderColor: palette.border, boxShadow: `0 2px 12px hsl(220 20% 70% / 0.12)`, transition: "box-shadow 0.3s, border-color 0.3s" }}
    onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${palette.from}20`}
    onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 12px hsl(220 20% 70% / 0.12)`}>

    {/* Header (Image or Gradient) */}
    <div className="aspect-video relative overflow-hidden"
      style={{ background: project.image ? "none" : `linear-gradient(135deg, ${palette.fromLight}, hsl(220 20% 97%))` }}>

      {project.image ? (
        <div className="relative w-full h-full cursor-zoom-in" onClick={() => onImageClick(project.image!)}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            style={{ imageRendering: "auto", transform: "perspective(1px) translateZ(0)", backfaceVisibility: "hidden" }}
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 text-white scale-75 group-hover:scale-100 transition-transform">
              <Maximize2 size={20} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full relative">
          <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full opacity-40"
            style={{ background: `radial-gradient(circle, ${palette.from}, transparent 70%)` }} />
          <span className="font-heading text-3xl font-black" style={{ color: `${palette.from}`, opacity: 0.2 }}>
            {project.title.split(" ").map(w => w[0]).join("").slice(0, 3)}
          </span>
        </div>
      )}

      {project.featured && (
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold text-white z-10"
          style={{ background: `linear-gradient(135deg, ${palette.from}, ${palette.to})` }}>
          <Star size={9} fill="currentColor" /> Featured
        </span>
      )}
    </div>

    <div className="p-5 space-y-3">
      <div className="flex items-center gap-2">
        <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
          style={{ background: palette.fromLight, color: palette.tag }}>
          {project.category}
        </span>
        {project.role && <span className="text-[10px] text-muted-foreground">· {project.role}</span>}
      </div>

      <h3 className="font-heading font-bold text-foreground">{project.title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{project.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground border border-border">
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-3 pt-1 items-center">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] font-semibold transition-opacity hover:opacity-70"
            style={{ color: palette.tag }}>
            {project.liveUrlLabel?.includes("Document") ? <FileText size={13} /> : <ExternalLink size={13} />}
            {project.liveUrlLabel || "Live Demo"}
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors">
            <Github size={13} /> Code
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

export default Projects;
