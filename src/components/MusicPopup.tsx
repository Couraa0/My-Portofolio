import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X, Music2 } from "lucide-react";
import { useEffect, useState } from "react";

interface MusicPopupProps {
  isPlaying: boolean;
  toggleAudio: () => void;
}

export default function MusicPopup({ isPlaying, toggleAudio }: MusicPopupProps) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (isPlaying) setShowPopup(true);
  }, [isPlaying]);

  return (
    <AnimatePresence>
      {isPlaying && showPopup && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="fixed top-20 right-4 md:right-6 z-50 select-none pointer-events-auto"
          style={{ width: 220 }}
        >
          {/* Card */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            style={{ background: "linear-gradient(135deg, #121212 0%, #1a1a2e 60%, #16213e 100%)" }}>

            {/* Subtle top glow */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(29,185,84,0.6), transparent)" }} />

            {/* Close */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 z-20 w-5 h-5 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 transition-all"
              aria-label="Close"
            >
              <X size={10} strokeWidth={2.5} />
            </button>

            {/* Now Playing label */}
            <div className="px-3 pt-3 pb-1 flex items-center gap-1.5">
              <Music2 size={9} className="text-emerald-400" />
              <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-emerald-400 font-mono">
                Now Playing
              </span>
            </div>

            {/* Main content */}
            <div className="px-3 pb-3 flex items-center gap-3">

              {/* Vinyl disc */}
              <div className="relative flex-shrink-0" style={{ width: 56, height: 56 }}>
                {/* Outer ring */}
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, #1a1a1a, #2d2d2d, #111, #2d2d2d, #1a1a1a)",
                    boxShadow: isPlaying
                      ? "0 0 0 1px rgba(255,255,255,0.08), 0 4px 16px rgba(0,0,0,0.6), 0 0 12px rgba(29,185,84,0.2)"
                      : "0 0 0 1px rgba(255,255,255,0.06), 0 4px 12px rgba(0,0,0,0.5)",
                  }}
                >
                  {/* Album art inset */}
                  <div className="absolute inset-[6px] rounded-full overflow-hidden">
                    <img
                      src="/Amazing.jpg"
                      alt="Amazing"
                      className="w-full h-full object-cover"
                      style={{ filter: "brightness(0.9) saturate(1.1)" }}
                    />
                  </div>
                  {/* Groove rings */}
                  <div className="absolute inset-0 rounded-full"
                    style={{
                      background: "repeating-radial-gradient(circle at 50% 50%, transparent 0px, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 3px)",
                      mixBlendMode: "overlay",
                    }} />
                </motion.div>

                {/* Center spindle hole */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <div className="w-2.5 h-2.5 rounded-full border border-white/20"
                    style={{ background: "radial-gradient(circle, #333, #111)" }} />
                </div>

                {/* Playing glow pulse */}
                {isPlaying && (
                  <motion.div
                    animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(29,185,84,0.25), transparent 70%)" }}
                  />
                )}
              </div>

              {/* Track info + controls */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[12px] text-white leading-tight truncate tracking-wide">
                  Amazing
                </p>
                <p className="text-[9px] text-white/50 truncate mt-0.5 font-medium">
                  Rex Orange County
                </p>

                {/* Equalizer bars */}
                <div className="flex items-end gap-[2px] mt-2 h-3">
                  {[0.8, 0.6, 1, 0.7, 0.9].map((h, i) => (
                    <motion.div
                      key={i}
                      className="w-[2px] rounded-full"
                      style={{ background: "#1DB954" }}
                      animate={isPlaying
                        ? { scaleY: [h * 0.4, h, h * 0.5, h * 0.8, h * 0.4] }
                        : { scaleY: 0.2 }}
                      transition={{
                        duration: 0.6 + i * 0.1,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.08,
                      }}
                      initial={{ height: 12, originY: 1 }}
                    />
                  ))}
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={toggleAudio}
                    className="flex items-center justify-center w-7 h-7 rounded-full transition-all active:scale-95"
                    style={{
                      background: "#1DB954",
                      boxShadow: "0 2px 8px rgba(29,185,84,0.4)",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#1ed760")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#1DB954")}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying
                      ? <Pause size={10} fill="white" className="text-white" />
                      : <Play size={10} fill="white" className="text-white ml-0.5" />}
                  </button>
                  <span className="text-[8px] font-bold text-emerald-400 font-mono tracking-wider">
                    {isPlaying ? "PLAYING" : "PAUSED"}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom progress bar — animated */}
            <div className="mx-3 mb-3 h-[2px] rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "#1DB954" }}
                animate={isPlaying ? { width: ["0%", "100%"] } : {}}
                transition={{ duration: 213, ease: "linear", repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
