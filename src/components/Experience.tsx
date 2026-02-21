import AnimatedSection from "./AnimatedSection";
import { experiences } from "@/data/experience";

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <h2 className="font-heading text-3xl font-bold text-center mb-16">
            Work <span className="text-accent">Experience</span>
          </h2>
        </AnimatedSection>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {experiences.map((exp, i) => (
            <AnimatedSection key={exp.id} delay={i * 0.1}>
              <div className={`relative flex md:items-center mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent border-2 border-background -translate-x-1.5 md:-translate-x-1.5 top-6 md:top-auto z-10" />

                {/* Card */}
                <div className={`ml-12 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="rounded-2xl bg-background border border-border p-6 card-hover">
                    <span className="text-xs text-accent font-medium">{exp.period}</span>
                    <h3 className="font-heading font-bold text-foreground mt-1">{exp.company}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{exp.role}</p>
                    <ul className="space-y-1.5">
                      {exp.description.map((d, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-accent mt-1.5 flex-shrink-0">•</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                    {exp.tools && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {exp.tools.map((t) => (
                          <span key={t} className="rounded-full bg-accent/10 px-3 py-1 text-[10px] font-medium text-accent">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
