import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Home, Search, Sparkles } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* ── Background decorations ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Graph Paper Grid */}
        <div
          className="absolute inset-0 opacity-[0.6] bg-graph-paper"
          style={{
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          }}
        />

        {/* Gradient blobs */}
        <motion.div
          animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
          transition={{ type: "spring", stiffness: 50 }}
          className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full opacity-[0.15] blur-[100px]"
          style={{ background: "radial-gradient(circle, hsl(250 84% 60%), transparent 70%)" }}
        />
        <motion.div
          animate={{ x: mousePos.x * -0.3, y: mousePos.y * -0.3 }}
          transition={{ type: "spring", stiffness: 50 }}
          className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full opacity-[0.12] blur-[100px]"
          style={{ background: "radial-gradient(circle, hsl(196 100% 47%), transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full opacity-[0.08] blur-[80px]"
          style={{ background: "radial-gradient(circle, hsl(344 85% 60%), transparent 70%)" }}
        />

        {/* Floating doodles */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] left-[12%] opacity-40"
        >
          <Search size={28} className="text-violet-400" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[22%] right-[15%] opacity-30"
        >
          <Sparkles size={24} className="text-sky-400" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[20%] opacity-30"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="hsl(344 85% 60%)" strokeWidth="1.5" opacity="0.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 15h8M9.5 9h.01M14.5 9h.01" strokeLinecap="round" />
          </svg>
        </motion.div>
        <motion.div
          animate={{ y: [0, 12, 0], rotate: [-5, 10, -5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[25%] left-[18%] opacity-25"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(37 100% 50%)" strokeWidth="1.5" opacity="0.5">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </motion.div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        {/* Giant 404 */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="relative mb-2"
        >
          <h1
            className="font-heading font-extrabold leading-none select-none"
            style={{
              fontSize: "clamp(8rem, 20vw, 14rem)",
              background: "linear-gradient(135deg, hsl(250 84% 60%), hsl(196 100% 47%))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              opacity: 0.12,
            }}
          >
            404
          </h1>
          {/* Overlapping text */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span
              className="font-heading font-extrabold"
              style={{
                fontSize: "clamp(4rem, 10vw, 7rem)",
                background: "linear-gradient(135deg, hsl(250 84% 60%), hsl(196 100% 47%))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              404
            </span>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold mb-5"
            style={{
              background: "hsl(250 84% 60% / 0.08)",
              border: "1px solid hsl(250 84% 60% / 0.25)",
              color: "hsl(250 84% 50%)",
            }}
          >
            <Search size={12} />
            Halaman Tidak Ditemukan
          </div>
        </motion.div>

        <motion.h2
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3"
        >
          Oops! Halaman yang kamu cari{" "}
          <span className="text-gradient">tidak ada</span>
        </motion.h2>

        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3"
        >
          Sepertinya halaman <code className="px-1.5 py-0.5 rounded-md text-xs font-mono" style={{ background: "hsl(250 84% 60% / 0.08)", color: "hsl(250 84% 50%)" }}>{location.pathname}</code> tidak tersedia atau sudah dipindahkan.
        </motion.p>

        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-xs text-muted-foreground/70 mb-8"
        >
          Jangan khawatir, kamu bisa kembali ke halaman utama.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate("/")}
            className="group rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg, hsl(250 84% 60%), hsl(196 100% 47%))",
              boxShadow: "0 8px 30px hsl(250 84% 60% / 0.25)",
            }}
          >
            <Home size={16} />
            Kembali ke Beranda
          </button>
        </motion.div>

        {/* Footer brand */}
        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-14"
        >
          <button
            onClick={() => navigate("/")}
            className="font-heading text-lg font-bold tracking-tight"
          >
            <span className="text-gradient">Rakha</span>
            <span className="text-muted-foreground/50">.</span>
          </button>
          <p className="text-[10px] text-muted-foreground/50 mt-1">
            © {new Date().getFullYear()} Muhammad Rakha Syamputra
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
