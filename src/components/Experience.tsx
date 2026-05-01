import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import AnimatedSection from "./AnimatedSection";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  getExperiences,
  getEducation,
  type Experience as DBExp,
  type Education as DBEdu,
} from "@/lib/supabase";

/* ── Local camelCase types ──────────────────────────────── */
interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  logo?: string;
  description: string[];
  tools?: string[];
}

interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  period: string;
  gpa: string;
  logo?: string;
}

function adaptExp(e: DBExp): Experience {
  return {
    id: e.id!,
    company: e.company,
    role: e.role,
    period: e.period,
    location: e.location,
    logo: e.logo_url,
    description: e.description || [],
    tools: e.tools,
  };
}

function adaptEdu(e: DBEdu): Education {
  return {
    id: e.id!,
    degree: e.degree,
    school: e.school,
    location: e.location,
    period: e.period,
    gpa: e.gpa,
    logo: e.logo_url,
  };
}

/* ── Component ──────────────────────────────────────────── */
const Experience = () => {
  const { t } = useTranslation();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getExperiences(), getEducation()])
      .then(([expData, eduData]) => {
        setExperiences(expData.map(adaptExp));
        setEducation(eduData.map(adaptEdu));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="experience" className="py-24 bg-background relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">

        {/* === KARIER HEADING === */}
        <AnimatedSection>
          <div className="mb-10 pb-6 border-b border-border/60">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold flex items-center gap-3 mb-3 text-foreground">
                  <Briefcase size={28} className="text-primary" />
                  {t("Experience")}
                </h2>
                <p className="text-muted-foreground text-sm max-w-2xl">
                  {t("Experience Subtitle")}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-24 text-muted-foreground">
            <Loader2 size={24} className="animate-spin text-primary" />
            <span className="text-sm">{t("Loading data...")}</span>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <span className="text-sm">{t("Failed to load data")}: {error}</span>
          </div>
        )}

        {/* Content — only shown after load */}
        {!loading && !error && (
          <>
            {/* === CAROUSEL KARIER === */}
            <AnimatedSection>
              <Carousel
                className="w-full mb-16"
                opts={{ align: "start", loop: false }}
              >
                <CarouselContent>
                  {experiences.map((exp) => (
                    <CarouselItem key={exp.id}>
                      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm h-full flex flex-col mx-1">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row gap-6 mb-8 items-start md:items-center">
                          <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-white flex items-center justify-center p-3 border border-border shadow-sm">
                            {exp.logo ? (
                              <img src={exp.logo} alt={exp.company} className="object-contain w-full h-full" />
                            ) : (
                              <Briefcase className="text-muted-foreground/50 w-10 h-10" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-heading font-bold text-foreground mb-1">
                              {exp.role}
                            </h3>
                            <p className="text-lg font-semibold text-primary mb-3">
                              {exp.company}
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-xs font-semibold bg-muted px-3 py-1.5 rounded-full flex items-center gap-1.5 text-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {exp.period}
                              </span>
                              <span className="text-xs font-semibold bg-muted px-3 py-1.5 rounded-full flex items-center gap-1.5 text-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {exp.location}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Description & Tools */}
                        <div className="grid md:grid-cols-3 gap-8 pt-6 border-t border-border/50 flex-1">
                          <div className="md:col-span-2 space-y-4">
                            <h4 className="text-sm font-bold text-foreground">
                              {t("Experience Description Header")}
                            </h4>
                            <ul className="space-y-3">
                              {exp.description?.map((desc, i) => (
                                <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                  <span>{desc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {exp.tools && exp.tools.length > 0 && (
                            <div>
                              <h4 className="text-sm font-bold text-foreground mb-4">{t("Experience Skills Header")}</h4>
                              <div className="flex flex-wrap gap-2">
                                {exp.tools.map((tool) => (
                                  <span
                                    key={tool}
                                    className="px-3 py-1.5 text-xs font-medium bg-secondary/50 text-foreground border border-border/50 rounded-lg"
                                  >
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <div className="flex items-center justify-end gap-3 mt-6 mr-1">
                  <CarouselPrevious className="static translate-y-0 translate-x-0 h-12 w-12 bg-card border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm" />
                  <CarouselNext className="static translate-y-0 translate-x-0 h-12 w-12 bg-card border-border text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm" />
                </div>
              </Carousel>
            </AnimatedSection>

            {/* === PENDIDIKAN === */}
            <AnimatedSection>
              <div className="mb-10 pt-6">
                <h2 className="font-heading text-2xl md:text-3xl font-bold flex items-center gap-3 mb-3 text-foreground">
                  <GraduationCap size={28} className="text-primary" />
                  {t("Education")}
                </h2>
                <p className="text-muted-foreground text-sm max-w-2xl">
                  {t("Education Subtitle")}
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 gap-4">
              {education.map((edu, index) => (
                <AnimatedSection key={edu.id} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="group p-5 rounded-2xl bg-card border border-border shadow-sm flex gap-4 h-full transition-all"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center p-2 border border-border overflow-hidden">
                      {edu.logo ? (
                        <img src={edu.logo} alt={edu.school} className="object-contain w-full h-full" />
                      ) : (
                        <GraduationCap className="text-muted-foreground/50 w-6 h-6" />
                      )}
                    </div>

                    <div className="flex-1 flex flex-col min-w-0">
                      <h3 className="font-semibold text-sm text-card-foreground transition-colors line-clamp-2 md:truncate">
                        {edu.school}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 mb-2 line-clamp-2">
                        {edu.degree}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground/80 font-medium mb-3">
                        <span className="flex items-center gap-1.5 whitespace-nowrap">
                          <span className="w-1 h-1 rounded-full bg-border" />
                          {edu.period}
                        </span>
                        <span className="flex items-center gap-1.5 whitespace-nowrap">
                          <span className="w-1 h-1 rounded-full bg-border" />
                          {edu.location}
                        </span>
                        {edu.gpa !== "-" && (
                          <span className="flex items-center gap-1.5 whitespace-nowrap border-l border-border pl-2">
                            GPA: {edu.gpa}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </>
        )}

      </div>
    </section>
  );
};

export default Experience;
