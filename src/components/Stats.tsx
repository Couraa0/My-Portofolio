import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 8, suffix: "+", label: "Projects Completed" },
  { value: 3500, suffix: "+", label: "Event Participants" },
  { value: 3.97, suffix: "", label: "GPA", decimals: 2 },
  { value: 3, suffix: "+", label: "Years Leadership" },
];

const Counter = ({ target, suffix, decimals = 0 }: { target: number; suffix: string; decimals?: number }) => {
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
    <span ref={ref} className="font-heading text-4xl md:text-5xl font-extrabold text-accent-foreground">
      {decimals ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}{suffix}
    </span>
  );
};

const Stats = () => (
  <section className="py-20 bg-foreground">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
      >
        {stats.map((s) => (
          <div key={s.label} className="space-y-2">
            <Counter target={s.value} suffix={s.suffix} decimals={s.decimals} />
            <p className="text-sm text-accent-foreground/60">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Stats;
