import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const stats = [
  { value: 10, suffix: "+", label: "Projects Completed", from: "hsl(250 84% 60%)", to: "hsl(196 100% 47%)", shadow: "hsl(250 84% 60% / 0.2)", border: "hsl(250 84% 60% / 0.18)", bg: "hsl(250 84% 60% / 0.05)" },
  { value: 15, suffix: "+", label: "Tech Stack used", from: "hsl(344 85% 60%)", to: "hsl(37 100% 50%)", shadow: "hsl(344 85% 60% / 0.2)", border: "hsl(344 85% 60% / 0.18)", bg: "hsl(344 85% 60% / 0.05)" },
  { value: 3.97, suffix: "", label: "GPA", decimals: 2, from: "hsl(158 80% 42%)", to: "hsl(196 100% 47%)", shadow: "hsl(158 80% 42% / 0.2)", border: "hsl(158 80% 42% / 0.18)", bg: "hsl(158 80% 42% / 0.05)" },
  { value: 3, suffix: "+", label: "Years Experience", from: "hsl(37 100% 50%)", to: "hsl(250 84% 60%)", shadow: "hsl(37 100% 50% / 0.2)", border: "hsl(37 100% 50% / 0.18)", bg: "hsl(37 100% 50% / 0.05)" },
];

const Counter = ({ target, suffix, decimals = 0, from, to }: {
  target: number; suffix: string; decimals?: number; from: string; to: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(eased * target);
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-heading text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent"
      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}>
      {decimals ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}{suffix}
    </span>
  );
};

const Stats = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 relative overflow-hidden bg-muted">
      <div className="absolute inset-0 opacity-[0.3] bg-grid pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border)), transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--border)), transparent)" }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map((s) => (
            <motion.div key={s.label}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="text-center space-y-2 p-6 rounded-2xl bg-background cursor-default"
              style={{ border: `1px solid ${s.border}`, boxShadow: `0 4px 16px hsl(var(--foreground) / 0.1)` }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px ${s.shadow}`}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px hsl(var(--foreground) / 0.1)`}>
              <Counter target={s.value} suffix={s.suffix} decimals={s.decimals} from={s.from} to={s.to} />
              <p className="text-sm text-muted-foreground">{t(s.label)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
