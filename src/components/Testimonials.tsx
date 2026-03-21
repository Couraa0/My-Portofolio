import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Quote, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const testimonials = [
  {
    name: "Citiasia International",
    role: "Company",
    quote: "Testimonial 1",
    avatar: "C",
    color: "hsl(250 84% 60%)",
    bg: "hsl(250 84% 60% / 0.08)",
    border: "hsl(250 84% 60% / 0.2)",
    rating: 5,
  },
  {
    name: "HIMASI UNSIKA",
    role: "Organization",
    quote: "Testimonial 2",
    avatar: "H",
    color: "hsl(196 100% 47%)",
    bg: "hsl(196 100% 47% / 0.08)",
    border: "hsl(196 100% 47% / 0.2)",
    rating: 5,
  },
  {
    name: "Tixchain.id Team",
    role: "Startup",
    quote: "Testimonial 3",
    avatar: "T",
    color: "hsl(344 85% 60%)",
    bg: "hsl(344 85% 60% / 0.08)",
    border: "hsl(344 85% 60% / 0.2)",
    rating: 5,
  },
];

const Testimonials = () => {
  const { t } = useTranslation();

  return (
    <section className="py-28 bg-background relative overflow-hidden">
      {/* Top decorative line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(196 100% 47% / 0.25), transparent)" }}
      />

      {/* Background blobs */}
      <div
        className="absolute top-1/2 left-0 w-96 h-96 rounded-full pointer-events-none opacity-[0.04] blur-[80px]"
        style={{ background: "radial-gradient(circle, hsl(250 84% 60%), transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-[0.04] blur-[80px]"
        style={{ background: "radial-gradient(circle, hsl(196 100% 47%), transparent 70%)" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span
              className="inline-block rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold mb-4"
              style={{
                background: "hsl(196 100% 47% / 0.08)",
                border: "1px solid hsl(196 100% 47% / 0.25)",
                color: "hsl(196 100% 36%)",
              }}
            >
              {t("Testimonials Badge")}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              {t("Testimonials Title Part1")}{" "}
              <span className="text-gradient">{t("Testimonials Title Part2")}</span>
            </h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
              {t("Testimonials Subtitle")}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative p-6 rounded-2xl bg-background border overflow-hidden group h-full"
                style={{
                  borderColor: item.border,
                  boxShadow: `0 4px 20px ${item.bg}`,
                }}
              >
                {/* Gradient accent at top */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                  style={{
                    background: `linear-gradient(90deg, ${item.color}, transparent)`,
                  }}
                />

                {/* Quote icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: item.bg, color: item.color }}
                >
                  <Quote size={18} />
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: item.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      fill="hsl(37 100% 50%)"
                      color="hsl(37 100% 50%)"
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">
                  "{t(item.quote)}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-auto">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}, ${item.color}cc)`,
                    }}
                  >
                    {item.avatar}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground text-sm">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{t(item.role)}</p>
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${item.bg}, transparent 70%)`,
                  }}
                />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
