import { motion, type Variants } from "framer-motion";
import { AlertTriangle, RefreshCw, Bug } from "lucide-react";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
    }),
};

interface ServerErrorProps {
    error?: Error;
    resetErrorBoundary?: () => void;
}

const ServerError = ({ error, resetErrorBoundary }: ServerErrorProps) => {
    const handleReload = () => {
        if (resetErrorBoundary) {
            resetErrorBoundary();
        } else {
            window.location.reload();
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
            {/* ── Background decorations ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.5] bg-graph-paper"
                    style={{
                        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
                        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
                    }}
                />

                {/* Gradient blobs - rose/destructive theme */}
                <div
                    className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full opacity-[0.12] blur-[100px]"
                    style={{ background: "radial-gradient(circle, hsl(344 85% 60%), transparent 70%)" }}
                />
                <div
                    className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full opacity-[0.1] blur-[100px]"
                    style={{ background: "radial-gradient(circle, hsl(250 84% 60%), transparent 70%)" }}
                />

                {/* Floating code symbols */}
                <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[15%] left-[12%] opacity-20 font-mono text-2xl"
                    style={{ color: "hsl(344 85% 60%)" }}
                >
                    {"</>"}
                </motion.div>
                <motion.div
                    animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[25%] right-[15%] opacity-20"
                >
                    <Bug size={24} style={{ color: "hsl(250 84% 60%)" }} />
                </motion.div>
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[20%] right-[22%] opacity-15 font-mono text-xl"
                    style={{ color: "hsl(37 100% 50%)" }}
                >
                    {"{ ! }"}
                </motion.div>
                <motion.div
                    animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[25%] left-[18%] opacity-20"
                >
                    <AlertTriangle size={22} style={{ color: "hsl(344 85% 60%)" }} />
                </motion.div>
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
                {/* Giant 500 */}
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
                            fontSize: "clamp(7rem, 18vw, 12rem)",
                            background: "linear-gradient(135deg, hsl(344 85% 60%), hsl(37 100% 50%))",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            color: "transparent",
                            opacity: 0.1,
                        }}
                    >
                        500
                    </h1>
                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <span
                            className="font-heading font-extrabold"
                            style={{
                                fontSize: "clamp(3.5rem, 9vw, 6rem)",
                                background: "linear-gradient(135deg, hsl(344 85% 60%), hsl(37 100% 50%))",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                            }}
                        >
                            500
                        </span>
                    </motion.div>
                </motion.div>

                {/* Badge */}
                <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
                    <div
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold mb-5"
                        style={{
                            background: "hsl(344 85% 60% / 0.08)",
                            border: "1px solid hsl(344 85% 60% / 0.25)",
                            color: "hsl(344 85% 45%)",
                        }}
                    >
                        <AlertTriangle size={12} />
                        Terjadi Kesalahan
                    </div>
                </motion.div>

                <motion.h2
                    custom={2}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3"
                >
                    Sesuatu tidak berjalan{" "}
                    <span className="text-gradient-rose">semestinya</span>
                </motion.h2>

                <motion.p
                    custom={3}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-2"
                >
                    Terjadi kesalahan yang tidak terduga.
                </motion.p>

                {/* Error details (collapsible) */}
                {error && (
                    <motion.div
                        custom={4}
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className="mb-6"
                    >
                        <details className="text-left">
                            <summary
                                className="text-xs font-semibold cursor-pointer mb-2 text-center"
                                style={{ color: "hsl(344 85% 50%)" }}
                            >
                                Detail Error
                            </summary>
                            <div
                                className="rounded-xl p-4 text-xs font-mono leading-relaxed overflow-auto max-h-32"
                                style={{
                                    background: "hsl(344 85% 60% / 0.05)",
                                    border: "1px solid hsl(344 85% 60% / 0.15)",
                                    color: "hsl(344 85% 40%)",
                                }}
                            >
                                {error.message || "Unknown error occurred"}
                            </div>
                        </details>
                    </motion.div>
                )}

                <motion.p
                    custom={error ? 5 : 4}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="text-xs text-muted-foreground/60 mb-8"
                >
                    Silakan coba muat ulang halaman atau kembali lagi nanti.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    custom={error ? 6 : 5}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    <button
                        onClick={handleReload}
                        className="group rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 flex items-center gap-2"
                        style={{
                            background: "linear-gradient(135deg, hsl(344 85% 60%), hsl(37 100% 50%))",
                            boxShadow: "0 8px 30px hsl(344 85% 60% / 0.25)",
                        }}
                    >
                        <RefreshCw size={16} />
                        Muat Ulang
                    </button>
                </motion.div>

                {/* Footer brand */}
                <motion.div
                    custom={error ? 7 : 6}
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="mt-14"
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

export default ServerError;
