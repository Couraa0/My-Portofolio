import { useEffect, useRef, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { technicalSkills, tools, softSkills } from "@/data/skills";
import { motion } from "framer-motion";

const SkillBar = ({ name, level }: { name: string; level: number }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-foreground font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full bg-accent"
        />
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <h2 className="font-heading text-3xl font-bold text-center mb-16">
            Skills & <span className="text-accent">Expertise</span>
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-8">
              {technicalSkills.map((cat) => (
                <div key={cat.title} className="space-y-4">
                  <h3 className="font-heading font-semibold text-foreground">{cat.title}</h3>
                  <div className="space-y-3">
                    {cat.skills.map((s) => (
                      <SkillBar key={s.name} name={s.name} level={s.level} />
                    ))}
                  </div>
                </div>
              ))}

              <div>
                <h3 className="font-heading font-semibold text-foreground mb-3">Tools & DevOps</h3>
                <div className="flex flex-wrap gap-2">
                  {tools.map((t) => (
                    <span key={t} className="rounded-full bg-secondary border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Soft Skills */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-4">
              <h3 className="font-heading font-semibold text-foreground mb-2">Soft Skills</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {softSkills.map((s) => (
                  <div key={s.name} className="rounded-2xl bg-card border border-border p-5 card-hover flex items-center gap-4">
                    <span className="text-2xl">{s.icon}</span>
                    <span className="text-sm font-medium text-foreground">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Skills;
