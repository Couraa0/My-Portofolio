import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Award, Trophy, Medal, Star, ExternalLink, X, ChevronRight, GraduationCap, ShieldCheck, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

type Achievement = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  category: "award" | "certificate" | "honor";
  description: string;
  credentialUrl?: string;
  image?: string;
  icon: "trophy" | "award" | "medal" | "star" | "shield" | "zap" | "grad";
  color: string;
};

const achievements: Achievement[] = [
  {
    id: 1,
    title: "Achievement EDUFAIR Title",
    issuer: "HIMASI UNSIKA",
    date: "2024",
    category: "award",
    description: "Achievement EDUFAIR Desc",
    icon: "trophy",
    color: "hsl(37 100% 50%)",
  },
  {
    id: 2,
    title: "Achievement PM Cert Title",
    issuer: "Dicoding Academy",
    date: "2024",
    category: "certificate",
    description: "Achievement PM Cert Desc",
    credentialUrl: "#",
    icon: "award",
    color: "hsl(250 84% 60%)",
  },
  {
    id: 3,
    title: "Achievement GPA Honor Title",
    issuer: "Universitas Singaperbangsa Karawang",
    date: "2023 – Present",
    category: "honor",
    description: "Achievement GPA Honor Desc",
    icon: "grad",
    color: "hsl(158 80% 42%)",
  },
  {
    id: 4,
    title: "Achievement Agile Cert Title",
    issuer: "Coursera / Google",
    date: "2024",
    category: "certificate",
    description: "Achievement Agile Cert Desc",
    credentialUrl: "#",
    icon: "shield",
    color: "hsl(196 100% 47%)",
  },
  {
    id: 5,
    title: "Achievement Tixchain Title",
    issuer: "Tixchain.id",
    date: "2023",
    category: "award",
    description: "Achievement Tixchain Desc",
    icon: "zap",
    color: "hsl(344 85% 60%)",
  },
  {
    id: 6,
    title: "Achievement Web Dev Cert Title",
    issuer: "Dicoding Academy",
    date: "2024",
    category: "certificate",
    description: "Achievement Web Dev Cert Desc",
    credentialUrl: "#",
    icon: "star",
    color: "hsl(37 100% 50%)",
  },
];

const iconMap = {
  trophy: Trophy,
  award: Award,
  medal: Medal,
  star: Star,
  shield: ShieldCheck,
  zap: Zap,
  grad: GraduationCap,
};

const categoryStyles: Record<Achievement["category"], { label: string; bg: string; border: string; color: string }> = {
  award: { label: "Award", bg: "hsl(37 100% 50% / 0.08)", border: "hsl(37 100% 50% / 0.2)", color: "hsl(37 100% 40%)" },
  certificate: { label: "Certificate", bg: "hsl(250 84% 60% / 0.08)", border: "hsl(250 84% 60% / 0.2)", color: "hsl(250 84% 50%)" },
  honor: { label: "Honor", bg: "hsl(158 80% 42% / 0.08)", border: "hsl(158 80% 42% / 0.2)", color: "hsl(158 80% 35%)" },
};

type Filter = "all" | "award" | "certificate" | "honor";

const Achievements = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Achievement | null>(null);

  const filtered = filter === "all" ? achievements : achievements.filter((a) => a.category === filter);

  const filters: { key: Filter; label: string; icon: React.ReactNode }[] = [
    { key: "all", label: t("All"), icon: <Star size={14} /> },
    { key: "award", label: t("Awards"), icon: <Trophy size={14} /> },
    { key: "certificate", label: t("Certificates"), icon: <Award size={14} /> },
    { key: "honor", label: t("Honors"), icon: <Medal size={14} /> },
  ];

  return (
    <section className="py-28 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(37 100% 50% / 0.25), transparent)" }}
      />

      {/* Background blobs */}
      <div
        className="absolute top-20 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.03] blur-[100px]"
        style={{ background: "radial-gradient(circle, hsl(37 100% 50%), transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.03] blur-[100px]"
        style={{ background: "radial-gradient(circle, hsl(250 84% 60%), transparent 70%)" }}
      />

      {/* Floating doodles */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute top-28 left-[12%] opacity-[0.35] text-amber-500 z-0"
      >
        <Trophy size={42} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="hidden md:block absolute top-28 right-[12%] opacity-[0.35] text-violet-500 z-0"
      >
        <Award size={40} />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span
              className="inline-block rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold mb-4"
              style={{
                background: "hsl(37 100% 50% / 0.08)",
                border: "1px solid hsl(37 100% 50% / 0.25)",
                color: "hsl(37 100% 40%)",
              }}
            >
              {t("Achievements Badge")}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              {t("Achievements Title Part1")}{" "}
              <span className="text-gradient-rose">{t("Achievements Title Part2")}</span>
            </h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
              {t("Achievements Subtitle")}
            </p>
          </div>
        </AnimatedSection>

        {/* Filter tabs */}
        <AnimatedSection delay={0.1}>
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-[11px] sm:text-xs font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
                style={
                  filter === f.key
                    ? {
                        background: "linear-gradient(135deg, hsl(37 100% 50%), hsl(344 85% 60%))",
                        color: "white",
                        boxShadow: "0 4px 16px hsl(37 100% 50% / 0.3)",
                      }
                    : {
                        background: "hsl(var(--muted))",
                        border: "1px solid hsl(var(--border))",
                        color: "hsl(215 16% 48%)",
                      }
                }
              >
                {f.icon} {f.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
          >
            {filtered.map((item, i) => {
              const Icon = iconMap[item.icon];
              const cat = categoryStyles[item.category];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => setSelected(item)}
                  className="group relative rounded-2xl bg-background border overflow-hidden cursor-pointer h-full flex flex-col"
                  style={{
                    borderColor: `${item.color}33`,
                    boxShadow: `0 2px 16px ${item.color}08`,
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px ${item.color}15`)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.boxShadow = `0 2px 16px ${item.color}08`)
                  }
                >
                  {/* Top accent bar */}
                  <div
                    className="h-1 w-full"
                    style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}44)` }}
                  />

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${item.color}08, transparent 70%)`,
                    }}
                  />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Top row: Icon + Category */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ background: `${item.color}12`, color: item.color }}
                      >
                        <Icon size={22} />
                      </div>
                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                        style={{ background: cat.bg, color: cat.color, border: `1px solid ${cat.border}` }}
                      >
                        {t(cat.label)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-bold text-foreground text-[15px] leading-snug mb-1.5 group-hover:text-[var(--hover-c)] transition-colors"
                      style={{ ["--hover-c" as string]: item.color }}>
                      {t(item.title)}
                    </h3>

                    {/* Issuer + Date */}
                    <p className="text-xs text-muted-foreground mb-3">
                      {item.issuer} · <span className="font-semibold">{item.date}</span>
                    </p>

                    {/* Description preview */}
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                      {t(item.description)}
                    </p>

                    {/* Bottom: View detail */}
                    <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: `1px solid hsl(var(--border))` }}>
                      <span className="text-[11px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-1">
                        {t("View Details")}
                        <ChevronRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </span>
                      {item.credentialUrl && (
                        <a
                          href={item.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[10px] font-semibold flex items-center gap-1 px-2 py-1 rounded-md hover:bg-muted transition-colors"
                          style={{ color: item.color }}
                        >
                          <ExternalLink size={10} /> {t("Credential")}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-background rounded-3xl overflow-hidden shadow-2xl border border-border"
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors"
              >
                <X size={18} />
              </button>

              {/* Header gradient */}
              <div
                className="h-2 w-full"
                style={{
                  background: `linear-gradient(90deg, ${selected.color}, ${selected.color}66, transparent)`,
                }}
              />

              <div className="p-8">
                {/* Icon + Category */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: `${selected.color}12`, color: selected.color }}
                  >
                    {(() => {
                      const IconComp = iconMap[selected.icon];
                      return <IconComp size={28} />;
                    })()}
                  </div>
                  <div>
                    <span
                      className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        background: categoryStyles[selected.category].bg,
                        color: categoryStyles[selected.category].color,
                        border: `1px solid ${categoryStyles[selected.category].border}`,
                      }}
                    >
                      {t(categoryStyles[selected.category].label)}
                    </span>
                    <p className="text-xs text-muted-foreground mt-2">
                      {selected.issuer} · {selected.date}
                    </p>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                  {t(selected.title)}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {t(selected.description)}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  {selected.credentialUrl && (
                    <a
                      href={selected.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 active:scale-95"
                      style={{
                        background: `linear-gradient(135deg, ${selected.color}, ${selected.color}bb)`,
                        boxShadow: `0 4px 16px ${selected.color}30`,
                      }}
                    >
                      <ExternalLink size={14} /> {t("View Credential")}
                    </a>
                  )}
                  <button
                    onClick={() => setSelected(null)}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-muted border border-border text-foreground hover:bg-muted/80 transition-all"
                  >
                    {t("Close")}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Achievements;
