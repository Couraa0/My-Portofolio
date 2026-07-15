import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, X } from "lucide-react";
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
          drag
          dragMomentum={false}
          whileDrag={{ scale: 1.03, cursor: "grabbing" }}
          initial={{ opacity: 0, y: -16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="fixed top-24 right-4 md:right-6 z-50 select-none pointer-events-auto cursor-grab active:cursor-grabbing"
          style={{ width: 280 }}
        >
          {/* Card - Frosted Glass Capsule */}
          <div className="relative rounded-full overflow-hidden shadow-2xl border border-white/10 flex items-center justify-between px-3 py-2.5 gap-2"
            style={{ 
              background: "rgba(15, 15, 25, 0.75)", 
              backdropFilter: "blur(16px)", 
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
            }}>
            
            {/* Subtle top glow */}
            <div className="absolute top-0 left-4 right-4 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(29,185,84,0.6), transparent)" }} />

            {/* Vinyl disc */}
            <div className="relative flex-shrink-0" style={{ width: 34, height: 34 }}>
              {/* Outer ring */}
              <motion.div
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #1a1a1a, #2d2d2d, #111, #2d2d2d, #1a1a1a)",
                  boxShadow: isPlaying
                    ? "0 0 0 1px rgba(255,255,255,0.08), 0 2px 8px rgba(0,0,0,0.6), 0 0 6px rgba(29,185,84,0.2)"
                    : "0 0 0 1px rgba(255,255,255,0.06), 0 2px 6px rgba(0,0,0,0.5)",
                }}
              >
                {/* Album art inset */}
                <div className="absolute inset-[4px] rounded-full overflow-hidden">
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
                    background: "repeating-radial-gradient(circle at 50% 50%, transparent 0px, transparent 1.5px, rgba(0,0,0,0.25) 1.5px, rgba(0,0,0,0.25) 2.5px)",
                    mixBlendMode: "overlay",
                  }} />
              </motion.div>

              {/* Center spindle hole */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="w-1.5 h-1.5 rounded-full border border-white/20"
                  style={{ background: "radial-gradient(circle, #333, #111)" }} />
              </div>
            </div>

            {/* Track info */}
            <div className="flex-1 min-w-0 flex flex-col justify-center text-left pointer-events-none">
              <p className="font-bold text-[11px] text-white leading-tight truncate tracking-wide">
                Amazing
              </p>
              <p className="text-[9px] text-white/50 truncate font-medium leading-tight mt-0.5">
                Rex Orange County
              </p>
            </div>

            {/* Equalizer bars */}
            <div className="flex items-end gap-[1.5px] h-2.5 flex-shrink-0 pointer-events-none mr-1">
              {[0.8, 0.6, 1, 0.7, 0.9].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-[1.5px] rounded-full"
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
                  initial={{ height: 10, originY: 1 }}
                />
              ))}
            </div>

            {/* Play/Pause Control Button */}
            <button
              onClick={toggleAudio}
              className="flex items-center justify-center w-6 h-6 rounded-full transition-all active:scale-95 flex-shrink-0 cursor-pointer"
              style={{
                background: "#1DB954",
                boxShadow: "0 2px 6px rgba(29,185,84,0.3)",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#1ed760")}
              onMouseLeave={e => (e.currentTarget.style.background = "#1DB954")}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying
                ? <Pause size={8} fill="white" className="text-white" />
                : <Play size={8} fill="white" className="text-white ml-0.5" />}
            </button>

            {/* Close button */}
            <button
              onClick={() => setShowPopup(false)}
              className="w-5 h-5 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 transition-all flex-shrink-0 cursor-pointer"
              aria-label="Close"
            >
              <X size={10} strokeWidth={2.5} />
            </button>

            {/* Bottom progress bar — absolute thin bar */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden">
              <motion.div
                className="h-full"
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
