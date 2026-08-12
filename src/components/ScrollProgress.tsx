import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleBottomBar = (e: CustomEvent) => {
      setIsBottomBarVisible(e.detail?.visible ?? true);
    };
    window.addEventListener("bottomBarVisibilityChange" as any, handleBottomBar);
    return () => window.removeEventListener("bottomBarVisibilityChange" as any, handleBottomBar);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(pct);
      setScrolled(scrollTop > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Arrow is visible if scrolled > 400px AND (on desktop OR (on mobile AND bottom bar is hidden))
  const showArrow = scrolled && (!isMobile || !isBottomBarVisible);

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <AnimatePresence>
      {showArrow && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-50 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center group"
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 rounded-full blur-lg opacity-40 group-hover:opacity-70 transition-opacity"
            style={{ background: "linear-gradient(135deg, hsl(250 84% 60%), hsl(196 100% 47%))" }}
          />

          {/* SVG progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
            {/* Track */}
            <circle
              cx="24" cy="24" r={radius}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="2.5"
            />
            {/* Progress */}
            <circle
              cx="24" cy="24" r={radius}
              fill="none"
              stroke="url(#scrollGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 0.15s ease-out" }}
            />
            <defs>
              <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(250 84% 60%)" />
                <stop offset="100%" stopColor="hsl(196 100% 47%)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center bg */}
          <div className="absolute inset-[3px] rounded-full bg-background/95 backdrop-blur-sm" />

          {/* Arrow icon */}
          <ArrowUp
            size={16}
            className="relative z-10 text-foreground group-hover:text-[hsl(250_84%_60%)] transition-colors"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollProgress;
