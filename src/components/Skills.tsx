import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { softSkills } from "@/data/skills";

/* ── Icon Utilities ────────────────────────────────── */

const getIconUrl = (slug: string, hex: string) => {
  // Gunakan logo lokal dari folder public jika tersedia
  if (slug === "css3") return "/css3.png";
  if (slug === "java") return "/java.png";
  if (slug === "visualstudiocode") return "/vs-code.png";

  // Selain itu ambil dari Simple Icons CDN
  return `https://cdn.simpleicons.org/${slug}/${hex.toLowerCase()}`;
};

const programmingIcons = [
  { name: "HTML5", slug: "html5", hex: "e34f26" },
  { name: "CSS3", slug: "css3", hex: "1572b6" },
  { name: "JavaScript", slug: "javascript", hex: "f7df1e" },
  { name: "React", slug: "react", hex: "61dafb" },
  { name: "Tailwind CSS", slug: "tailwindcss", hex: "06b6d4" },
  { name: "Bootstrap", slug: "bootstrap", hex: "7952b3" },
  { name: "MySQL", slug: "mysql", hex: "4479a1" },
  { name: "PHP", slug: "php", hex: "777bb4" },
  { name: "Laravel", slug: "laravel", hex: "ff2d20" },
  { name: "Python", slug: "python", hex: "3776ab" },
  { name: "Java", slug: "java", hex: "f8981d" },
  { name: "C++", slug: "cplusplus", hex: "0052cc" },
  { name: "Vite", slug: "vite", hex: "646cff" },
  { name: "TypeScript", slug: "typescript", hex: "3178c6" },
];

const toolIcons = [
  { name: "Jira", slug: "jira", hex: "0052cc" },
  { name: "Trello", slug: "trello", hex: "0052cc" },
  { name: "Notion", slug: "notion", hex: "000000" },
  { name: "GitHub", slug: "github", hex: "181717" },
  { name: "Docker", slug: "docker", hex: "2496ed" },
  { name: "VS Code", slug: "visualstudiocode", hex: "007acc" },
  { name: "XAMPP", slug: "xampp", hex: "fb7a24" },
  { name: "Git", slug: "git", hex: "f05032" },
  { name: "Laragon", slug: "laragon", hex: "066666" },
  { name: "Google Colab", slug: "googlecolab", hex: "f9ab00" },
  { name: "Ollama", slug: "ollama", hex: "000000" },
];

/* ── Sub-components ───────────────────────────────── */

const MarqueeItem = ({ item }: { item: typeof programmingIcons[0] }) => (
  <div className="flex flex-col items-center justify-center gap-3 mx-4 px-6 py-5 rounded-2xl bg-white border border-border group transition-all duration-300 w-28 h-28 flex-shrink-0"
    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.boxShadow = `0 12px 24px #${item.hex}15`;
      e.currentTarget.style.borderColor = `#${item.hex}40`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.03)";
      e.currentTarget.style.borderColor = "hsl(var(--border))";
    }}>
    <img
      src={getIconUrl(item.slug, item.hex)}
      alt={item.name}
      className="w-10 h-10 object-contain grayscale-[0.5] group-hover:grayscale-0 transition-all duration-300"
      onError={(e) => {
        // Fallback jika gambar gagal dimuat
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
  // Double the items for seamless loop with translateX(-50%)
  const list = [...items, ...items];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-2">
        <div className="w-2 h-2 rounded-full" style={{ background: "hsl(var(--violet))" }} />
        <h3 className="font-heading font-bold text-foreground text-sm uppercase tracking-wider">{title}</h3>
      </div>

      <div className="marquee-wrapper">
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
  return (
    <section id="skills" className="py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px z-20"
        style={{ background: "linear-gradient(90deg, transparent, hsl(250 84% 60% / 0.2), transparent)" }} />
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, hsl(250 84% 60%), transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, hsl(196 100% 47%), transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.3] bg-grid" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-20">
            <span className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold mb-4 border"
              style={{ background: "hsl(var(--violet) / 0.08)", borderColor: "hsl(var(--violet) / 0.2)", color: "hsl(var(--violet))" }}>
              Expertise
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              Skills & <span className="text-gradient">Tech Stack</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* ── Soft Skills ── */}
        <AnimatedSection delay={0.1}>
          <div className="max-w-4xl mx-auto mb-20">
            <div className="flex items-center gap-2 mb-8 justify-center">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              <h3 className="font-heading font-bold text-foreground text-sm uppercase tracking-wider">Soft Skills</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {softSkills.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-border transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5 hover:border-violet-500/30"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl flex-shrink-0">
                    {s.icon}
                  </div>
                  <span className="text-sm md:text-base font-bold text-foreground leading-snug">{s.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ── Marquees ── */}
        <div className="space-y-16">
          <AnimatedSection delay={0.2}>
            <MarqueeSection
              title="Programming & Frameworks"
              items={programmingIcons}
              speed="30s"
            />
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <MarqueeSection
              title="Tools & Environment"
              items={toolIcons}
              direction="right"
              speed="35s"
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Skills;
