import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Briefcase,
  FolderKanban,
  Mail,
  ArrowRight,
  ChevronRight,
  Trophy,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import AnimatedSection from "@/components/AnimatedSection";

/* ── Section preview cards data ── */
const sectionCards = [
  {
    key: "experience",
    icon: Briefcase,
    title: "Experience",
    descKey: "Experience Card Desc",
    to: "/experience",
    from: "hsl(196 100% 47%)",
    to2: "hsl(158 80% 42%)",
    bg: "hsl(196 100% 47% / 0.06)",
    border: "hsl(196 100% 47% / 0.2)",
    iconBg: "hsl(196 100% 47% / 0.12)",
    iconColor: "hsl(196 100% 40%)",
    highlights: ["Citiasia Inc", "Tixchain.id", "HIMSIKA"],
  },
  {
    key: "projects",
    icon: FolderKanban,
    title: "Projects",
    descKey: "Projects Card Desc",
    to: "/projects",
    from: "hsl(344 85% 60%)",
    to2: "hsl(37 100% 50%)",
    bg: "hsl(344 85% 60% / 0.06)",
    border: "hsl(344 85% 60% / 0.2)",
    iconBg: "hsl(344 85% 60% / 0.12)",
    iconColor: "hsl(344 85% 55%)",
    highlights: ["Smart Village", "AI For All", "Tixchain"],
  },
  {
    key: "achievements",
    icon: Trophy,
    title: "Achievements",
    descKey: "Achievements Card Desc",
    to: "/achievements",
    from: "hsl(250 84% 60%)",
    to2: "hsl(196 100% 47%)",
    bg: "hsl(250 84% 60% / 0.06)",
    border: "hsl(250 84% 60% / 0.2)",
    iconBg: "hsl(250 84% 60% / 0.12)",
    iconColor: "hsl(250 84% 55%)",
    highlights: ["Awards", "Certificates", "Course"],
  },
  {
    key: "contact",
    icon: Mail,
    title: "Contact",
    descKey: "Contact Subtitle",
    to: "/contact",
    from: "hsl(158 80% 42%)",
    to2: "hsl(196 100% 47%)",
    bg: "hsl(158 80% 42% / 0.06)",
    border: "hsl(158 80% 42% / 0.2)",
    iconBg: "hsl(158 80% 42% / 0.12)",
    iconColor: "hsl(158 80% 38%)",
    highlights: ["Email", "LinkedIn", "Github"],
  },
];

const SectionPreview = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative top line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(250 84% 60% / 0.2), transparent)",
        }}
      />
      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span
              className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold mb-4"
              style={{
                background: "hsl(250 84% 60% / 0.08)",
                border: "1px solid hsl(250 84% 60% / 0.2)",
                color: "hsl(250 84% 50%)",
              }}
            >
              {t("Explore")}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              {t("What I")}{" "}
              <span className="text-gradient">
                {t("Offer")}
              </span>
            </h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
              {t("Section Preview Subtitle")}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {sectionCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <AnimatedSection key={card.key} delay={i * 0.1}>
                <Link to={card.to} className="block h-full">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative p-6 rounded-2xl bg-background border overflow-hidden group h-full flex flex-col cursor-pointer"
                    style={{
                      borderColor: card.border,
                      boxShadow: `0 4px 20px ${card.bg}`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px ${card.from}20`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${card.bg}`;
                    }}
                  >
                    {/* Gradient accent at top */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                      style={{
                        background: `linear-gradient(90deg, ${card.from}, ${card.to2})`,
                      }}
                    />

                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${card.bg}, transparent 70%)`,
                      }}
                    />

                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        background: card.iconBg,
                        color: card.iconColor,
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-bold text-foreground text-lg mb-2 flex items-center gap-2">
                      {t(card.title)}
                      <ChevronRight
                        size={16}
                        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                        style={{ color: card.iconColor }}
                      />
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                      {t(card.descKey)}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1.5">
                      {card.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-md px-2 py-0.5 text-[9px] font-medium border"
                          style={{
                            background: card.bg,
                            borderColor: card.border,
                            color: card.iconColor,
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Arrow CTA */}
                    <div
                      className="mt-4 flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all"
                      style={{ color: card.iconColor }}
                    >
                      {t("View Details")}
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </motion.div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionPreview;
