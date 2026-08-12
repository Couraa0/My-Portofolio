import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  LayoutGrid,
  RefreshCw,
  Layers,
  Cpu,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Search,
} from "lucide-react";

/* ── Icon Utilities ────────────────────────────────── */
const getIconUrl = (slug: string, hex: string) => {
  if (slug === "css3") return "/css3.png";
  if (slug === "java") return "/java.png";
  if (slug === "visualstudiocode") return "/vs-code.png";
  if (slug === "microsoftazure") return "/azure.svg";
  return `https://cdn.simpleicons.org/${slug}/${hex.toLowerCase()}`;
};

interface TechItem {
  name: string;
  slug: string;
  hex: string;
  level: string;
  desc: string;
  tag?: string;
}

const programmingIcons: TechItem[] = [
  { name: "TypeScript", slug: "typescript", hex: "3178c6", level: "90%", desc: "Type-safe robust web apps", tag: "Frontend" },
  { name: "React", slug: "react", hex: "61dafb", level: "95%", desc: "Component architecture & SPA", tag: "Frontend" },
  { name: "Next.js", slug: "nextdotjs", hex: "000000", level: "85%", desc: "Full-stack React frameworks", tag: "Frontend" },
  { name: "Laravel", slug: "laravel", hex: "ff2d20", level: "85%", desc: "MVC backend systems", tag: "Backend" },
  { name: "PHP", slug: "php", hex: "777bb4", level: "85%", desc: "Server scripting & REST APIs", tag: "Backend" },
  { name: "Express.js", slug: "express", hex: "000000", level: "85%", desc: "Node.js minimalist web framework", tag: "Backend" },
  { name: "NestJS", slug: "nestjs", hex: "ea2845", level: "80%", desc: "Progressive Node.js framework", tag: "Backend" },
  { name: "MySQL", slug: "mysql", hex: "00618a", level: "85%", desc: "Relational database design", tag: "Database" },
  { name: "PostgreSQL", slug: "postgresql", hex: "4169e1", level: "85%", desc: "Relational database management", tag: "Database" },
  { name: "Supabase", slug: "supabase", hex: "3ecf8e", level: "85%", desc: "Backend-as-a-service & Auth", tag: "Database" },
  { name: "MongoDB", slug: "mongodb", hex: "47a248", level: "80%", desc: "Document database storage", tag: "Database" },
  { name: "JavaScript", slug: "javascript", hex: "f7df1e", level: "90%", desc: "DOM logic & ES6 features", tag: "Frontend" },
  { name: "CSS3", slug: "css3", hex: "1572b6", level: "90%", desc: "Flexbox, Grid & Animations", tag: "Frontend" },
  { name: "HTML5", slug: "html5", hex: "e34f26", level: "95%", desc: "Semantic markup & SEO", tag: "Frontend" },
  { name: "Tailwind CSS", slug: "tailwindcss", hex: "06b6d4", level: "90%", desc: "Utility-first rapid design", tag: "Frontend" },
  { name: "Bootstrap", slug: "bootstrap", hex: "7952b3", level: "85%", desc: "Responsive utility framework", tag: "Frontend" },
  { name: "Python", slug: "python", hex: "3776ab", level: "75%", desc: "Data processing & scripting", tag: "Languages" },
  { name: "Java", slug: "java", hex: "f8981d", level: "70%", desc: "Object-oriented programming", tag: "Languages" },
  { name: "C++", slug: "cplusplus", hex: "0052cc", level: "70%", desc: "System code & structures", tag: "Languages" },
  { name: "Vite", slug: "vite", hex: "646cff", level: "90%", desc: "HMR development workflow", tag: "Frontend" },
];

const toolIcons: TechItem[] = [
  { name: "Jira", slug: "jira", hex: "0052cc", level: "90%", desc: "Agile project ticket management", tag: "Management" },
  { name: "Trello", slug: "trello", hex: "0052cc", level: "90%", desc: "Visual task board tracking", tag: "Management" },
  { name: "Notion", slug: "notion", hex: "000000", level: "95%", desc: "Documentation & wikis", tag: "Management" },
  { name: "GitHub", slug: "github", hex: "181717", level: "90%", desc: "Version control & workflows", tag: "DevOps & Cloud" },
  { name: "Docker", slug: "docker", hex: "2496ed", level: "70%", desc: "Containerized app runtime", tag: "DevOps & Cloud" },
  { name: "Microsoft Azure", slug: "microsoftazure", hex: "0089d6", level: "80%", desc: "App Services & Azure SQL Database hosting", tag: "DevOps & Cloud" },
  { name: "VS Code", slug: "visualstudiocode", hex: "007acc", level: "95%", desc: "Primary IDE & dev setup", tag: "Tools & IDE" },
  { name: "Git", slug: "git", hex: "f05032", level: "90%", desc: "Branching, merging & VCS", tag: "DevOps & Cloud" },
  { name: "XAMPP", slug: "xampp", hex: "fb7a24", level: "85%", desc: "Local database & web server management", tag: "Tools & IDE" },
  { name: "Laragon", slug: "laragon", hex: "066666", level: "85%", desc: "Local database & web hosting", tag: "Tools & IDE" },
  { name: "Google Colab", slug: "googlecolab", hex: "f9ab00", level: "75%", desc: "Cloud Jupyter notebooks", tag: "Tools & IDE" },
  { name: "Ollama", slug: "ollama", hex: "000000", level: "80%", desc: "On-premise LLM executions", tag: "Tools & IDE" },
];

const softSkillsData = [
  { icon: "🎯", name: "Project & Stakeholder Management", desc: "Leading sprints, managing expectations, and defining scope metrics." },
  { icon: "⚠️", name: "Risk Management", desc: "Identifying bottlenecks, scheduling slack, and mitigation planning." },
  { icon: "📊", name: "Strategic Planning", desc: "Aligning software roadmaps with business goals and KPI tracking." },
  { icon: "👥", name: "Leadership", desc: "Mentoring engineers, fostering delegation, and encouraging collaboration." },
  { icon: "🔗", name: "Cross-functional Team Collaboration", desc: "Bridging UI/UX designers, developers, and analysts." },
  { icon: "💬", name: "Communication", desc: "Active listening, clear standups, and documentation excellence." },
  { icon: "🧠", name: "Problem-solving", desc: "Diagnosing complex bugs, optimizing performance, and architecting scalable solutions." },
  { icon: "💡", name: "Innovation & Prototyping", desc: "Rapidly building MVPs, experimenting with new technologies, and driving feature development." },
  { icon: "🛡️", name: "Security", desc: "Implementing robust authentication, data protection, and secure coding practices." },
];

/* ── Sub-components ───────────────────────────────── */
const MarqueeItem = ({ item }: { item: TechItem }) => (
  <div
    className="flex flex-col items-center justify-center gap-3 mx-3 px-5 py-4 rounded-2xl bg-background border border-border group transition-all duration-300 w-28 h-28 flex-shrink-0 cursor-pointer"
    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.boxShadow = `0 12px 24px #${item.hex}30`;
      e.currentTarget.style.borderColor = `#${item.hex}60`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.03)";
      e.currentTarget.style.borderColor = "hsl(var(--border))";
    }}
  >
    <img
      src={getIconUrl(item.slug, item.hex || "000000")}
      alt={item.name}
      className="w-10 h-10 object-contain grayscale-[0.4] group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
      onError={(e) => {
        const img = e.currentTarget;
        img.style.display = "none";
        const parent = img.parentElement;
        if (parent && !parent.querySelector(".fallback-icon")) {
          const fallback = document.createElement("div");
          fallback.className =
            "fallback-icon w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground";
          fallback.innerText = item.name.substring(0, 2).toUpperCase();
          parent.insertBefore(fallback, img);
        }
      }}
    />
    <span className="text-[11px] font-bold text-muted-foreground group-hover:text-foreground transition-colors text-center truncate w-full">
      {item.name}
    </span>
  </div>
);

const MarqueeSection = ({
  title,
  items,
  direction = "left",
  speed = "25s",
}: {
  title: string;
  items: TechItem[];
  direction?: "left" | "right";
  speed?: string;
}) => {
  const list = [...items, ...items];
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-2">
        <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
        <h3 className="font-heading font-bold text-foreground text-sm uppercase tracking-wider">
          {title}
        </h3>
      </div>
      <div className="marquee-track-container marquee-wrapper">
        <div
          className="marquee-track px-4"
          style={{
            animation: `marquee-scroll ${speed} linear infinite`,
            animationDirection: direction === "right" ? "reverse" : "normal",
          }}
        >
          {list.map((item, i) => (
            <MarqueeItem key={`${item.slug}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Interactive Tech Card ────────────────────────── */
const TechCard = ({ item, idx }: { item: TechItem; idx: number }) => {
  const brandColor = `#${item.hex}`;
  const isDarkHex = item.hex === "000000" || item.hex === "181717";
  const displayColor = isDarkHex ? "hsl(var(--primary))" : brandColor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.03, duration: 0.4 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative flex flex-col gap-3.5 p-5 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/70 transition-all duration-300 cursor-pointer overflow-hidden"
      onMouseEnter={(e) => {
        if (!isDarkHex) {
          e.currentTarget.style.borderColor = `${brandColor}50`;
          e.currentTarget.style.boxShadow = `0 10px 30px ${brandColor}18, 0 0 0 1px ${brandColor}20`;
        } else {
          e.currentTarget.style.borderColor = "hsl(215 100% 55% / 0.4)";
          e.currentTarget.style.boxShadow = "0 10px 30px hsl(215 100% 55% / 0.15)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      {/* Corner HUD indicator */}
      <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-transparent group-hover:border-blue-500/50 transition-colors duration-300" />

      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-xl bg-secondary/80 flex items-center justify-center p-2 flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-sm"
          style={{
            background: isDarkHex ? "hsl(var(--secondary))" : `${brandColor}12`,
          }}
        >
          <img
            src={getIconUrl(item.slug, item.hex)}
            alt={item.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = "none";
              const parent = img.parentElement;
              if (parent && !parent.querySelector(".fallback-icon")) {
                const fallback = document.createElement("div");
                fallback.className =
                  "fallback-icon w-full h-full rounded-lg bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground";
                fallback.innerText = item.name.substring(0, 2).toUpperCase();
                parent.appendChild(fallback);
              }
            }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <h4 className="font-heading font-bold text-foreground text-sm truncate">
              {item.name}
            </h4>
            {item.tag && (
              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono shrink-0">
                {item.tag}
              </span>
            )}
          </div>
          <span
            className="text-[10px] font-bold font-mono block mt-0.5"
            style={{ color: displayColor }}
          >
            {item.level} • Proficient
          </span>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
        {item.desc}
      </p>

      {/* Level bar */}
      <div className="w-full h-1.5 bg-secondary/80 rounded-full overflow-hidden mt-1">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: item.level }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: isDarkHex
              ? "linear-gradient(90deg, hsl(215 100% 55%), hsl(196 100% 47%))"
              : `linear-gradient(90deg, ${brandColor}, ${brandColor}dd)`,
            boxShadow: `0 0 8px ${displayColor}60`,
          }}
        />
      </div>
    </motion.div>
  );
};

/* ── Main Skills Component ────────────────────────── */
const Skills = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<
    "programming" | "tools" | "soft"
  >("programming");
  const [viewMode, setViewMode] = useState<"grid" | "marquee">("grid");
  const [showAll, setShowAll] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const GRID_ROW_LIMIT = 12;

  // Tags filtering
  const progTags = ["All", "Frontend", "Backend", "Database", "Languages"];
  const toolTags = ["All", "Management", "DevOps & Cloud", "Tools & IDE"];

  const filteredProgramming =
    selectedTag === "All"
      ? programmingIcons
      : programmingIcons.filter((item) => item.tag === selectedTag);

  const filteredTools =
    selectedTag === "All"
      ? toolIcons
      : toolIcons.filter((item) => item.tag === selectedTag);

  return (
    <section
      id="skills"
      className="py-24 bg-background relative overflow-hidden text-left border-t border-border/30"
    >
      {/* Top decorative line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-px z-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(215 100% 55% / 0.2), transparent)",
        }}
      />

      {/* Ambient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-70">
        <div className="absolute top-10 left-[10%] w-[350px] h-[350px] rounded-full bg-blue-500/5 blur-[90px]" />
        <div className="absolute bottom-10 right-[10%] w-[300px] h-[300px] rounded-full bg-sky-500/5 blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-14 relative">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold mb-4 border"
              style={{
                background: "hsl(215 100% 55% / 0.08)",
                borderColor: "hsl(215 100% 55% / 0.25)",
                color: "hsl(215 100% 50%)",
              }}
            >
              <Award size={13} className="text-sky-500" />
              {t("Expertise")}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              {t("Skills & Tech Stack").split(" & ")[0]} &{" "}
              <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
                {t("Skills & Tech Stack").split(" & ")[1] || "Tech Stack"}
              </span>
            </h2>
          </div>
        </AnimatedSection>

        {/* Dashboard Navigation */}
        <AnimatedSection delay={0.08}>
          <div className="max-w-6xl mx-auto space-y-4 mb-10">
            {/* Category Switcher bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-secondary/50 border border-border/60 backdrop-blur-sm shadow-sm">
              {/* Animated Tab Switcher */}
              {/* Animated Tab Switcher — Horizontal swipe row on mobile */}
              <div className="relative flex overflow-x-auto no-scrollbar scroll-smooth items-center gap-1.5 w-full sm:w-auto justify-start sm:justify-start flex-nowrap shrink-0">
                {[
                  {
                    id: "programming",
                    label: t("Programming & Frameworks").split(" & ")[0],
                    icon: <Cpu size={14} />,
                  },
                  {
                    id: "tools",
                    label: t("Tools & Environment").split(" & ")[0],
                    icon: <Layers size={14} />,
                  },
                  {
                    id: "soft",
                    label: t("Soft Skills").split(" & ")[0] || "Soft Skills",
                    icon: <Award size={14} />,
                  },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id as any);
                      setSelectedTag("All");
                    }}
                    className={`relative flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-bold transition-colors duration-300 shrink-0 whitespace-nowrap ${
                      activeCategory === cat.id
                        ? "text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {activeCategory === cat.id && (
                      <motion.div
                        layoutId="skillsActiveCategoryPill"
                        className="absolute inset-0 rounded-xl bg-blue-600 shadow-md shadow-blue-500/20 z-0"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {cat.icon}
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* View Layout Toggle (Grid vs Marquee) */}
              {activeCategory !== "soft" && (
                <div className="flex items-center gap-1 p-1 rounded-xl bg-background border border-border/60 shrink-0">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      viewMode === "grid"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="Grid Dashboard"
                  >
                    <LayoutGrid size={14} />
                    <span>Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode("marquee")}
                    className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      viewMode === "marquee"
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="Scrolling Marquee"
                  >
                    <RefreshCw size={14} />
                    <span>Marquee</span>
                  </button>
                </div>
              )}
            </div>

            {/* Sub-category tag filters (only in Grid mode) — Horizontal swipe row on mobile */}
            {viewMode === "grid" && activeCategory !== "soft" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex overflow-x-auto no-scrollbar scroll-smooth items-center justify-start gap-1.5 pt-1 flex-nowrap shrink-0 max-w-full min-w-0"
              >
                <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-muted-foreground mr-1 flex items-center gap-1 shrink-0">
                  <Search size={11} /> Filter:
                </span>
                {(activeCategory === "programming" ? progTags : toolTags).map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1 rounded-full text-[10.5px] font-bold font-mono transition-all duration-300 border shrink-0 whitespace-nowrap ${
                        selectedTag === tag
                          ? "bg-blue-500/15 text-blue-500 border-blue-500/40 shadow-sm"
                          : "bg-card text-muted-foreground border-border/60 hover:border-slate-300 dark:hover:border-slate-700 hover:text-foreground"
                      }`}
                    >
                      {tag}
                    </button>
                  )
                )}
              </motion.div>
            )}
          </div>
        </AnimatedSection>

        {/* Content Render Panel */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Category 1: PROGRAMMING */}
            {activeCategory === "programming" && (
              <motion.div
                key="programming"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {viewMode === "grid" ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                      {(showAll
                        ? filteredProgramming
                        : filteredProgramming.slice(0, GRID_ROW_LIMIT)
                      ).map((item, idx) => (
                        <TechCard key={item.name} item={item} idx={idx} />
                      ))}
                    </div>
                    {filteredProgramming.length > GRID_ROW_LIMIT && (
                      <div className="flex justify-center mt-8">
                        <button
                          onClick={() => setShowAll(!showAll)}
                          className="group flex items-center gap-2 px-6 py-2.5 rounded-full border border-border bg-card hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 text-xs font-bold text-muted-foreground hover:text-blue-500"
                        >
                          {showAll ? t("Show Less") : t("View All")}
                          {showAll ? (
                            <ChevronUp size={14} />
                          ) : (
                            <ChevronDown size={14} />
                          )}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <MarqueeSection
                    title={t("Programming & Frameworks")}
                    items={filteredProgramming}
                    speed="32s"
                  />
                )}
              </motion.div>
            )}

            {/* Category 2: TOOLS & DEV */}
            {activeCategory === "tools" && (
              <motion.div
                key="tools"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {viewMode === "grid" ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                      {(showAll
                        ? filteredTools
                        : filteredTools.slice(0, GRID_ROW_LIMIT)
                      ).map((item, idx) => (
                        <TechCard key={item.name} item={item} idx={idx} />
                      ))}
                    </div>
                    {filteredTools.length > GRID_ROW_LIMIT && (
                      <div className="flex justify-center mt-8">
                        <button
                          onClick={() => setShowAll(!showAll)}
                          className="group flex items-center gap-2 px-6 py-2.5 rounded-full border border-border bg-card hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 text-xs font-bold text-muted-foreground hover:text-blue-500"
                        >
                          {showAll ? t("Show Less") : t("View All")}
                          {showAll ? (
                            <ChevronUp size={14} />
                          ) : (
                            <ChevronDown size={14} />
                          )}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <MarqueeSection
                    title={t("Tools & Environment")}
                    items={filteredTools}
                    direction="right"
                    speed="35s"
                  />
                )}
              </motion.div>
            )}

            {/* Category 3: SOFT SKILLS & MANAGEMENT */}
            {activeCategory === "soft" && (
              <motion.div
                key="soft"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {softSkillsData.map((s, i) => (
                    <motion.div
                      key={s.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="group relative flex flex-col gap-3.5 p-6 rounded-2xl glass-card-premium overflow-hidden cursor-pointer"
                    >
                      {/* Corner HUD accent */}
                      <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />

                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm animate-float-slow group-hover:scale-110 transition-transform duration-300"
                          style={{ animationDelay: `${i * -1.5}s` }}
                        >
                          {s.icon}
                        </div>
                        <h4 className="text-sm font-bold text-foreground leading-snug group-hover:text-blue-500 transition-colors">
                          {t(s.name)}
                        </h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed pl-1">
                        {s.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Skills;
