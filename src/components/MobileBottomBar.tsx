import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Briefcase, Trophy, Mail, Sparkles, Bot } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const navItems = [
  { type: "link", to: "/", icon: Home, label: "Nav Home" },
  { type: "link", to: "/experience", icon: Briefcase, label: "Nav Exp" },
  { type: "action", id: "chatbot", label: "Nav AI" },
  { type: "link", to: "/achievements", icon: Trophy, label: "Nav Award" },
  { type: "link", to: "/contact", icon: Mail, label: "Nav Contact" },
];

const MobileBottomBar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("bottomBarVisibilityChange", { detail: { visible } }));
  }, [visible]);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        if (currentY < 40) {
          setVisible(true);
        } else if (delta > 10) {
          setVisible(false);
        } else if (delta < -10) {
          setVisible(true);
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  const handleChatbotClick = () => {
    window.dispatchEvent(new CustomEvent("toggleChatbot"));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="md:hidden fixed bottom-3 left-3 right-3 z-50 mx-auto max-w-[420px]"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        >
          {/* Floating Glass Island Dock */}
          <div className="relative rounded-full px-2 py-1.5 bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center justify-between">
            {/* Top ambient glow line */}
            <div className="absolute -top-[1px] left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60 dark:opacity-70 pointer-events-none" />

            {navItems.map((item, index) => {
              // ── PROMINENT CENTER CHATBOT BUTTON ──
              if (item.type === "action") {
                return (
                  <div key="chatbot-fab" className="relative flex-1 flex justify-center items-center min-w-0 select-none">
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.88 }}
                      onClick={handleChatbotClick}
                      aria-label="Open AI Assistant"
                      className="relative -top-4 w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 p-0.5 shadow-[0_8px_20px_rgba(37,99,235,0.5)] dark:shadow-[0_8px_25px_rgba(37,99,235,0.7)] border-2 border-white dark:border-slate-950 flex items-center justify-center transition-shadow"
                    >
                      {/* Inner mascot/bot icon */}
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden relative">
                        <video
                          src="/Coura-Gif.mp4"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover rounded-full"
                        />
                        <Sparkles size={10} className="absolute top-1 right-1 text-sky-300 animate-pulse" />
                      </div>
                    </motion.button>
                  </div>
                );
              }

              // ── STANDARD NAV LINKS (Home, Experience, Achievement, Contact) ──
              const active = isActive(item.to!);
              const Icon = item.icon!;

              return (
                <Link
                  key={item.to}
                  to={item.to!}
                  className="relative flex flex-col items-center justify-center py-1.5 px-1 rounded-full transition-all duration-300 flex-1 min-w-0 select-none"
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  {/* Active Gradient Pill */}
                  {active && (
                    <motion.div
                      layoutId="activeFloatingDockPill5"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 shadow-[0_0_18px_rgba(37,99,235,0.45)] dark:shadow-[0_0_18px_rgba(37,99,235,0.6)]"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Icon */}
                  <motion.div
                    whileTap={{ scale: 0.8 }}
                    animate={active ? { y: -1 } : { y: 0 }}
                    className="relative z-10"
                  >
                    <Icon
                      size={18}
                      strokeWidth={active ? 2.4 : 1.8}
                      className={`transition-colors duration-200 ${
                        active
                          ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    />
                  </motion.div>

                  {/* Label */}
                  <span
                    className={`relative z-10 text-[9px] font-bold tracking-tight transition-colors duration-200 mt-0.5 leading-none truncate max-w-full px-0.5 ${
                      active
                        ? "text-white font-extrabold drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {t(item.label)}
                  </span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileBottomBar;
