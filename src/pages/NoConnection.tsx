import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { WifiOff, RefreshCw } from "lucide-react";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
    }),
};

const NoConnection = () => {
    const [isRetrying, setIsRetrying] = useState(false);

    const handleRetry = () => {
        setIsRetrying(true);
        setTimeout(() => {
            if (navigator.onLine) {
                window.location.reload();
            } else {
                setIsRetrying(false);
            }
        }, 2000);
    };

    // Auto-reload when connection is back
    useEffect(() => {
        const handleOnline = () => window.location.reload();
        window.addEventListener("online", handleOnline);
        return () => window.removeEventListener("online", handleOnline);
    }, []);

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
            {/* ── Background decorations ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.5] bg-graph-paper"
                    style={{
                        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
                        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
                    }}
                />

                {/* Gradient blobs */}
                <div
                    className="absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full opacity-[0.12] blur-[100px]"
                    style={{ background: "radial-gradient(circle, hsl(37 100% 50%), transparent 70%)" }}
                />
                <div
                    className="absolute -bottom-48 -right-48 w-[500px] h-[500px] rounded-full opacity-[0.1] blur-[100px]"
                    style={{ background: "radial-gradient(circle, hsl(344 85% 60%), transparent 70%)" }}
                />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-[0.08] blur-[90px]"
                    style={{ background: "radial-gradient(circle, hsl(250 84% 60%), transparent 70%)" }}
                />

                {/* Signal waves animation */}
                {[1, 2, 3].map((ring) => (
                    <motion.div
                        key={ring}
                        animate={{ scale: [1, 2.5], opacity: [0.15, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: ring * 0.8,
                            ease: "easeOut",
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        style={{
                            width: 80,
                            height: 80,
                            border: "2px solid hsl(37 100% 50% / 0.3)",
                        }}
                    />
                ))}

                {/* Floating disconnected icons */}
                <motion.div
                    animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] right-[18%] opacity-25"
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(37 100% 50%)" strokeWidth="1.5">
                        <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.div>
                <motion.div
                    animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[22%] left-[15%] opacity-20"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="hsl(344 85% 60%)" strokeWidth="1.5">
                        <path d="M23 4v6h-6M1 20v-6h6" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.div>
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
                {/* Giant icon */}
                <motion.div
                    custom={0}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="relative mb-6 flex justify-center"
                >
                    {/* Glow behind icon */}
                    <div
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div
                            className="w-32 h-32 rounded-full blur-3xl opacity-20"
                            style={{ background: "hsl(37 100% 50%)" }}
                        />
                    </div>

                    {/* Icon container */}
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-28 h-28 rounded-[2rem] flex items-center justify-center"
                        style={{
                            background: "linear-gradient(135deg, hsl(37 100% 50% / 0.1), hsl(344 85% 60% / 0.08))",
                            border: "1px solid hsl(37 100% 50% / 0.2)",
                            boxShadow: "0 16px 48px hsl(37 100% 50% / 0.12)",
                        }}
                    >
                        <WifiOff size={48} style={{ color: "hsl(37 100% 45%)" }} />

                        {/* Pulsing dot */}
                        <span
                            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                            style={{ background: "hsl(344 85% 60%)" }}
                        >
                            <span
                                className="w-2 h-2 rounded-full bg-background"
                                style={{ animation: "pulse 2s infinite" }}
                            />
                        </span>
                    </motion.div>
                </motion.div>

                {/* Badge */}
                <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
                    <div
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold mb-5"
                        style={{
                            background: "hsl(37 100% 50% / 0.08)",
                            border: "1px solid hsl(37 100% 50% / 0.25)",
                            color: "hsl(37 100% 38%)",
                        }}
                    >
                        <WifiOff size={12} />
                        Tidak Ada Koneksi Internet
                    </div>
                </motion.div>

                <motion.h2
                    custom={2}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3"
                >
                    Kamu sedang{" "}
                    <span className="text-gradient-rose">offline</span>
                </motion.h2>

                <motion.p
                    custom={3}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-2"
                >
                    Periksa koneksi internet kamu dan coba lagi. Halaman akan otomatis dimuat ulang saat koneksi tersedia kembali.
                </motion.p>

                <motion.p
                    custom={4}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="text-xs text-muted-foreground/60 mb-8"
                >
                    Pastikan Wi-Fi atau data seluler kamu aktif.
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
                        onClick={handleRetry}
                        disabled={isRetrying}
                        className="group rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 flex items-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
                        style={{
                            background: "linear-gradient(135deg, hsl(37 100% 50%), hsl(344 85% 60%))",
                            boxShadow: "0 8px 30px hsl(37 100% 50% / 0.25)",
                        }}
                    >
                        <RefreshCw size={16} className={isRetrying ? "animate-spin" : ""} />
                        {isRetrying ? "Mencoba..." : "Coba Lagi"}
                    </button>
                </motion.div>

                {/* Connection status indicator */}
                <motion.div
                    custom={6}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="mt-10 flex items-center justify-center gap-2"
                >
                    <span
                        className="w-2 h-2 rounded-full"
                        style={{
                            background: "hsl(344 85% 60%)",
                            animation: "pulse 2s infinite",
                        }}
                    />
                    <span className="text-xs text-muted-foreground/60">
                        Menunggu koneksi internet...
                    </span>
                </motion.div>

                {/* Footer brand */}
                <motion.div
                    custom={7}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="mt-10"
                >
                    <span className="font-heading text-lg font-bold tracking-tight">
                        <span className="text-gradient">Rakha</span>
                        <span className="text-muted-foreground/50">.</span>
                    </span>
                    <p className="text-[10px] text-muted-foreground/50 mt-1">
                        © {new Date().getFullYear()} Muhammad Rakha Syamputra
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default NoConnection;
