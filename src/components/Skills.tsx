import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { LayoutGrid, RefreshCw, Layers, Cpu, Award } from "lucide-react";

/* ── Icon Utilities ────────────────────────────────── */
const getIconUrl = (slug: string, hex: string) => {
  if (slug === "css3") return "/css3.png";
  if (slug === "java") return "/java.png";
  if (slug === "visualstudiocode") return "/vs-code.png";
  return `https://cdn.simpleicons.org/${slug}/${hex.toLowerCase()}`;
};

const programmingIcons = [
  { name: "TypeScript", slug: "typescript", hex: "3178c6", level: "90%", desc: "Type-safe robust web apps" },
  { name: "React", slug: "react", hex: "61dafb", level: "95%", desc: "Component architecture & SPA" },
  { name: "Next.js", slug: "nextdotjs", hex: "000000", level: "85%", desc: "Full-stack React frameworks" },
  { name: "Laravel", slug: "laravel", hex: "ff2d20", level: "85%", desc: "MVC backend systems" },
  { name: "PHP", slug: "php", hex: "777bb4", level: "85%", desc: "Server scripting & REST APIs" },
  { name: "Express.js", slug: "express", hex: "000000", level: "85%", desc: "Node.js minimalist web framework" },
  { name: "NestJS", slug: "nestjs", hex: "ea2845", level: "80%", desc: "Progressive Node.js framework" },
  { name: "MySQL", slug: "mysql", hex: "00618a", level: "85%", desc: "Relational database design" },
  { name: "PostgreSQL", slug: "postgresql", hex: "4169e1", level: "85%", desc: "Relational database management" },
  { name: "Supabase", slug: "supabase", hex: "3ecf8e", level: "85%", desc: "Backend-as-a-service & Auth" },
  { name: "MongoDB", slug: "mongodb", hex: "47a248", level: "80%", desc: "Document database storage" },
  { name: "JavaScript", slug: "javascript", hex: "f7df1e", level: "90%", desc: "DOM logic & ES6 features" },
  { name: "CSS3", slug: "css3", hex: "1572b6", level: "90%", desc: "Flexbox, Grid & Animations" },
  { name: "HTML5", slug: "html5", hex: "e34f26", level: "95%", desc: "Semantic markup & SEO" },
  { name: "Tailwind CSS", slug: "tailwindcss", hex: "06b6d4", level: "90%", desc: "Utility-first rapid design" },
  { name: "Bootstrap", slug: "bootstrap", hex: "7952b3", level: "85%", desc: "Responsive utility framework" },
  { name: "Python", slug: "python", hex: "3776ab", level: "75%", desc: "Data processing & scripting" },
  { name: "Java", slug: "java", hex: "f8981d", level: "70%", desc: "Object-oriented programming" },
  { name: "C++", slug: "cplusplus", hex: "0052cc", level: "70%", desc: "System code & structures" },
  { name: "Vite", slug: "vite", hex: "646cff", level: "90%", desc: "HMR development workflow" },
];

const toolIcons = [
  { name: "Jira", slug: "jira", hex: "0052cc", level: "90%", desc: "Agile project ticket management" },
  { name: "Trello", slug: "trello", hex: "0052cc", level: "90%", desc: "Visual task board tracking" },
  { name: "Notion", slug: "notion", hex: "000000", level: "95%", desc: "Documentation & wikis" },
  { name: "GitHub", slug: "github", hex: "181717", level: "90%", desc: "Version control & workflows" },
  { name: "Docker", slug: "docker", hex: "2496ed", level: "70%", desc: "Containerized app runtime" },
  { name: "VS Code", slug: "visualstudiocode", hex: "007acc", level: "95%", desc: "Primary IDE & dev setup" },
  { name: "Git", slug: "git", hex: "f05032", level: "90%", desc: "Branching, merging & VCS" },
  { name: "Laragon", slug: "laragon", hex: "066666", level: "85%", desc: "Local database & web hosting" },
  { name: "Google Colab", slug: "googlecolab", hex: "f9ab00", level: "75%", desc: "Cloud Jupyter notebooks" },
  { name: "Ollama", slug: "ollama", hex: "000000", level: "80%", desc: "On-premise LLM executions" },
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
const MarqueeItem = ({ item }: { item: typeof programmingIcons[0] }) => (
  <div className="flex flex-col items-center justify-center gap-3 mx-4 px-6 py-5 rounded-2xl bg-background border border-border group transition-all duration-300 w-28 h-28 flex-shrink-0"
    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.boxShadow = `0 12px 24px #2563eb15`;
      e.currentTarget.style.borderColor = `#2563eb40`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.03)";
      e.currentTarget.style.borderColor = "hsl(var(--border))";
    }}>
    <img
      src={getIconUrl(item.slug, item.hex || "000000")}
      alt={item.name}
      className="w-10 h-10 object-contain grayscale-[0.5] group-hover:grayscale-0 transition-all duration-300"
      onError={(e) => {
        const img = e.currentTarget;
        img.style.display = 'none';
        const parent = img.parentElement;
        if (parent && !parent.querySelector('.fallback-icon')) {
          const fallback = document.createElement('div');
          fallback.className = 'fallback-icon w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground';
          fallback.innerText = item.name.substring(0, 2).toUpperCase();
          parent.insertBefore(fallback, img);
        }
      }}
    />
    <span className="text-[11px] font-bold text-muted-foreground group-hover:text-foreground transition-colors text-center">
      {item.name}
    </span>
  </div>
);

const MarqueeSection = ({ title, items, direction = "left", speed = "25s" }: { title: string, items: typeof programmingIcons, direction?: "left" | "right", speed?: string }) => {
  const list = [...items, ...items];
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-2">
        <div className="w-2 h-2 rounded-full bg-blue-600" />
        <h3 className="font-heading font-bold text-foreground text-sm uppercase tracking-wider">{title}</h3>
      </div>
      <div className="marquee-track-container marquee-wrapper">
        <div className="marquee-track px-4" style={{
          animation: `marquee-scroll ${speed} linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal"
        }}>
          {list.map((item, i) => (
            <MarqueeItem key={`${item.slug}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<"programming" | "tools" | "soft">("programming");
  const [viewMode, setViewMode] = useState<"grid" | "marquee">("grid");

  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">

      {/* Decorative top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-px z-20"
        style={{ background: "linear-gradient(90deg, transparent, hsl(215 100% 55% / 0.2), transparent)" }} />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-70">
        <div className="absolute top-10 left-[10%] w-[350px] h-[350px] rounded-full bg-blue-500/5 blur-[90px]" />
        <div className="absolute bottom-10 right-[10%] w-[300px] h-[300px] rounded-full bg-sky-500/5 blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">

        {/* Title Lockup */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold mb-4 border"
              style={{ background: "hsl(215 100% 55% / 0.08)", borderColor: "hsl(215 100% 55% / 0.25)", color: "hsl(215 100% 50%)" }}>
              <Award size={13} className="text-sky-500" />
              {t("Expertise")}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              {t("Skills & Tech Stack").split(" & ")[0]} & <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">{t("Skills & Tech Stack").split(" & ")[1]}</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* Interactive Control Dashboard */}
        <AnimatedSection delay={0.08}>
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-border shadow-sm mb-10">

            {/* Left side: Category Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto justify-center sm:justify-start">
              {[
                { id: "programming", label: t("Programming & Frameworks").split(" & ")[0], icon: <Cpu size={14} /> },
                { id: "tools", label: t("Tools & Environment").split(" & ")[0], icon: <Layers size={14} /> },
                { id: "soft", label: t("Soft Skills").split(" & ")[0] || "Soft Skills", icon: <Award size={14} /> },
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeCategory === category.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                >
                  {category.icon}
                  {category.label}
                </button>
              ))}
            </div>

            {/* Right side: View Layout Toggle (Grid vs Marquee) */}
            {activeCategory !== "soft" && (
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-200/50 dark:bg-slate-800/80 border border-border">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-all ${viewMode === "grid"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                  title="Grid Dashboard"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  onClick={() => setViewMode("marquee")}
                  className={`p-1.5 rounded-lg transition-all ${viewMode === "marquee"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                  title="Scrolling Marquee"
                >
                  <RefreshCw size={15} />
                </button>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Content Render Panel with Framer Motion */}
        <div className="max-w-5xl mx-auto">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {programmingIcons.map((item, idx) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.04 }}
                        whileHover={{ y: -4, scale: 1.01 }}
                        className="flex flex-col gap-3 p-5 rounded-2xl bg-background border border-border transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:border-blue-500/20"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-secondary/80 flex items-center justify-center p-2 flex-shrink-0">
                            <img
                              src={getIconUrl(item.slug, item.hex)}
                              alt={item.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                const img = e.currentTarget;
                                img.style.display = 'none';
                                const parent = img.parentElement;
                                if (parent && !parent.querySelector('.fallback-icon')) {
                                  const fallback = document.createElement('div');
                                  fallback.className = 'fallback-icon w-full h-full rounded-lg bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground';
                                  fallback.innerText = item.name.substring(0, 2).toUpperCase();
                                  parent.appendChild(fallback);
                                }
                              }}
                            />
                          </div>
                          <div>
                            <h4 className="font-heading font-bold text-foreground text-sm">{item.name}</h4>
                            <span className="text-[10px] text-blue-500 font-bold">{item.level} • Proficient</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                        <div className="w-full h-1 bg-secondary rounded-full overflow-hidden mt-1">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: item.level }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.1 }}
                            className="h-full bg-blue-600 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <MarqueeSection
                    title={t("Programming & Frameworks")}
                    items={programmingIcons}
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {toolIcons.map((item, idx) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.04 }}
                        whileHover={{ y: -4, scale: 1.01 }}
                        className="flex flex-col gap-3 p-5 rounded-2xl bg-background border border-border transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/5 hover:border-sky-500/20"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-secondary/80 flex items-center justify-center p-2 flex-shrink-0">
                            <img
                              src={getIconUrl(item.slug, item.hex || "000000")}
                              alt={item.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                const img = e.currentTarget;
                                img.style.display = 'none';
                                const parent = img.parentElement;
                                if (parent && !parent.querySelector('.fallback-icon')) {
                                  const fallback = document.createElement('div');
                                  fallback.className = 'fallback-icon w-full h-full rounded-lg bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground';
                                  fallback.innerText = item.name.substring(0, 2).toUpperCase();
                                  parent.appendChild(fallback);
                                }
                              }}
                            />
                          </div>
                          <div>
                            <h4 className="font-heading font-bold text-foreground text-sm">{item.name}</h4>
                            <span className="text-[10px] text-sky-600 font-bold">{item.level} • Tools</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
                        <div className="w-full h-1 bg-secondary rounded-full overflow-hidden mt-1">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: item.level }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.1 }}
                            className="h-full bg-sky-500 rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <MarqueeSection
                    title={t("Tools & Environment")}
                    items={toolIcons}
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
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {softSkillsData.map((s, i) => (
                    <motion.div
                      key={s.name}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="flex flex-col gap-3.5 p-6 rounded-2xl bg-background border border-border transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-500/30"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm shadow-blue-500/5 animate-float-slow"
                          style={{ animationDelay: `${i * -1.5}s` }}>
                          {s.icon}
                        </div>
                        <h4 className="text-sm font-bold text-foreground leading-snug">{t(s.name)}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed pl-1">{s.desc}</p>
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
