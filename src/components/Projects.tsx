import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { projects, type Project } from "@/data/projects";

type Filter = "All" | "Professional" | "Personal";

const Projects = () => {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <h2 className="font-heading text-3xl font-bold text-center mb-4">
            Featured <span className="text-accent">Projects</span>
          </h2>
        </AnimatedSection>

        {/* Filters */}
        <AnimatedSection delay={0.1}>
          <div className="flex justify-center gap-2 mb-12">
            {(["All", "Professional", "Personal"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  filter === f
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </AnimatedSection>

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
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    whileHover={{ y: -4 }}
    className="rounded-2xl bg-card border border-border overflow-hidden group transition-shadow hover:shadow-lg"
  >
    {/* Gradient placeholder */}
    <div className="h-40 bg-gradient-to-br from-accent/10 via-secondary to-accent/5 flex items-center justify-center relative">
      {project.featured && (
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold text-accent-foreground">
          <Star size={10} /> Featured
        </span>
      )}
      <span className="font-heading text-2xl font-bold text-accent/30">
        {project.title.split(" ").map(w => w[0]).join("")}
      </span>
    </div>

    <div className="p-5 space-y-3">
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
          project.category === "Professional" ? "bg-accent/10 text-accent" : "bg-secondary text-muted-foreground"
        }`}>
          {project.category}
        </span>
        {project.role && <span className="text-[10px] text-muted-foreground">· {project.role}</span>}
      </div>

      <h3 className="font-heading font-bold text-foreground">{project.title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span key={t} className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-3 pt-1">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
            <ExternalLink size={16} />
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
            <Github size={16} />
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

export default Projects;
