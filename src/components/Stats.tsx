import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Code2, FolderKanban, GraduationCap, Timer } from "lucide-react";

const stats = [
  { 
    value: 15, 
    suffix: "+", 
    label: "Projects Completed", 
    from: "hsl(215 100% 55%)", 
    to: "hsl(196 100% 47%)", 
    shadow: "hsl(215 100% 55% / 0.15)", 
    border: "border-blue-500/20", 
    bg: "hsl(215 100% 55% / 0.04)", 
    icon: FolderKanban,
    statusText: "TRANSMITTING",
    statusColor: "bg-blue-500",
    sparkline: "M0,20 Q15,5 30,25 T60,10 T90,30 T120,15",
  },
  { 
    value: 15, 
    suffix: "+", 
    label: "Tech Stack used", 
    from: "hsl(270 90% 60%)", 
    to: "hsl(220 90% 56%)", 
    shadow: "hsl(270 90% 60% / 0.15)", 
    border: "border-purple-500/20", 
    bg: "hsl(270 90% 60% / 0.04)", 
    icon: Code2,
    statusText: "NOMINAL",
    statusColor: "bg-emerald-500",
    sparkline: "M0,10 Q20,30 40,5 T80,25 T120,10",
  },
  { 
    value: 3.97, 
    suffix: "", 
    label: "GPA", 
    decimals: 2, 
    from: "hsl(158 80% 42%)", 
    to: "hsl(196 100% 47%)", 
    shadow: "hsl(158 80% 42% / 0.15)", 
    border: "border-emerald-500/20", 
    bg: "hsl(158 80% 42% / 0.04)", 
    icon: GraduationCap,
    statusText: "OPTIMAL",
    statusColor: "bg-emerald-500",
    sparkline: "M0,30 C30,10 60,10 90,5 T120,20",
  },
  { 
    value: 3, 
    suffix: "+", 
    label: "Years Experience", 
    from: "hsl(196 100% 40%)", 
    to: "hsl(270 90% 56%)", 
    shadow: "hsl(196 100% 40% / 0.15)", 
    border: "border-sky-500/20", 
    bg: "hsl(196 100% 40% / 0.04)", 
    icon: Timer,
    statusText: "ACTIVE",
    statusColor: "bg-blue-500",
    sparkline: "M0,25 Q15,30 40,10 T80,20 T120,5",
  },
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
    <span ref={ref} className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent"
      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}>
      {decimals ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}{suffix}
    </span>
  );
};

const Stats = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Mesh and Scanline effect */}
      <div className="absolute inset-0 mesh-gradient pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.08] bg-grid pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className={`relative text-left pt-5 px-5 pb-3 rounded-2xl bg-card border ${s.border} shadow-sm group transition-all duration-300`}
                style={{ boxShadow: `0 4px 16px hsl(var(--foreground) / 0.02)` }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `0 16px 35px ${s.shadow}`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = `0 4px 16px hsl(var(--foreground) / 0.02)`;
                }}>

                {/* Cyber Card Header: ID & Status Dot */}
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                    MODULE // 0{i + 1}
                  </span>
                  
                  {/* Status Indicator */}
                  <div className="flex items-center gap-1.5 font-mono text-[8px] text-slate-500 font-bold">
                    <span className={`w-1.5 h-1.5 rounded-full ${s.statusColor} animate-pulse`} />
                    <span>{s.statusText}</span>
                  </div>
                </div>

                {/* Card Icon & Counters */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shrink-0"
                    style={{ background: s.bg }}>
                    <Icon size={18} style={{ color: s.from }} />
                  </div>
                  
                  <div className="flex flex-col">
                    <Counter target={s.value} suffix={s.suffix} decimals={s.decimals} from={s.from} to={s.to} />
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider truncate max-w-[140px]">
                      {t(s.label)}
                    </span>
                  </div>
                </div>

                {/* Sparkling chart vector */}
                <div className="h-16 mt-2 relative w-full opacity-60 group-hover:opacity-100 transition-opacity">
                  <svg className="w-full h-full" viewBox="-2 -3 124 48" preserveAspectRatio="none">
                    {/* Shadow Area under the line */}
                    <defs>
                      <linearGradient id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={s.from} stopOpacity="0.15" />
                        <stop offset="100%" stopColor={s.from} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`${s.sparkline} L120,40 L0,40 Z`}
                      fill={`url(#grad-${i})`}
                    />
                    
                    {/* The sparkline itself */}
                    <motion.path
                      d={s.sparkline}
                      fill="none"
                      stroke={s.from}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: i * 0.1 }}
                    />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
