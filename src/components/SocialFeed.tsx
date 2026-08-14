import { useState, useEffect, useCallback, useRef } from "react";
import {
  Linkedin,
  Instagram,
  Sparkles,
  Loader2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import AnimatedSection from "./AnimatedSection";

// Declare global instgrm for Instagram embed script
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

// LinkedIn posts data
const linkedInPosts = [
  {
    id: "li1",
    label: "LinkedIn Update #1",
    embedId: "7412766318019637248",
    url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7412766318019637248?collapsed=1",
  },
  {
    id: "li2",
    label: "LinkedIn Update #2",
    embedId: "7412761993625034752",
    url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7412761993625034752?collapsed=1",
  },
  {
    id: "li3",
    label: "LinkedIn Update #3",
    embedId: "7454536085126180866",
    url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7454536085126180866?collapsed=1",
  },
];

// Instagram posts data
const instagramPosts = [
  {
    id: "ig1",
    label: "Instagram Post #1",
    permalink: "https://www.instagram.com/p/Dasn4-8z_Gr/",
    embedHtml: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/Dasn4-8z_Gr/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:8px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin:1px; max-width:540px; min-width:326px; padding:0; width:100%;"><div style="padding:16px; text-align:center;"><a href="https://www.instagram.com/p/Dasn4-8z_Gr/?utm_source=ig_embed&amp;utm_campaign=loading" target="_blank" style="text-decoration:none; color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px;">Loading Instagram Post...</a></div></blockquote>`,
  },
  {
    id: "ig2",
    label: "Instagram Post #2",
    permalink: "https://www.instagram.com/p/DBl83zez2FI/",
    embedHtml: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DBl83zez2FI/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:8px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin:1px; max-width:540px; min-width:326px; padding:0; width:100%;"><div style="padding:16px; text-align:center;"><a href="https://www.instagram.com/p/DBl83zez2FI/?utm_source=ig_embed&amp;utm_campaign=loading" target="_blank" style="text-decoration:none; color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px;">Loading Instagram Post...</a></div></blockquote>`,
  },
  {
    id: "ig3",
    label: "Instagram Post #3",
    permalink: "https://www.instagram.com/p/DY9_YuvyGcj/",
    embedHtml: `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/DY9_YuvyGcj/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:8px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin:1px; max-width:540px; min-width:326px; padding:0; width:100%;"><div style="padding:16px; text-align:center;"><a href="https://www.instagram.com/p/DY9_YuvyGcj/?utm_source=ig_embed&amp;utm_campaign=loading" target="_blank" style="text-decoration:none; color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px;">Loading Instagram Post...</a></div></blockquote>`,
  },
];

export default function SocialFeed() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"linkedin" | "instagram">(
    "linkedin"
  );
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({
    li1: true,
    li2: true,
    li3: true,
  });
  const [igScriptBlocked, setIgScriptBlocked] = useState(false);

  // Monitor if Instagram script fails to load (e.g. blocked by adblocker)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!window.instgrm) {
        setIgScriptBlocked(true);
      }
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  // LinkedIn carousel
  const [liActiveIndex, setLiActiveIndex] = useState(1);
  const [liEmblaRef, liEmblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
    startIndex: 1,
  });

  // Instagram carousel
  const [igActiveIndex, setIgActiveIndex] = useState(1);
  const [igEmblaRef, igEmblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
    startIndex: 1,
  });

  const handleIframeLoad = (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: false }));
  };

  // LinkedIn carousel tracking
  const onLiSelect = useCallback(() => {
    if (!liEmblaApi) return;
    setLiActiveIndex(liEmblaApi.selectedScrollSnap());
  }, [liEmblaApi]);

  useEffect(() => {
    if (!liEmblaApi) return;
    onLiSelect();
    liEmblaApi.on("select", onLiSelect);
    return () => {
      liEmblaApi.off("select", onLiSelect);
    };
  }, [liEmblaApi, onLiSelect]);

  // Instagram carousel tracking
  const onIgSelect = useCallback(() => {
    if (!igEmblaApi) return;
    setIgActiveIndex(igEmblaApi.selectedScrollSnap());
  }, [igEmblaApi]);

  useEffect(() => {
    if (!igEmblaApi) return;
    onIgSelect();
    igEmblaApi.on("select", onIgSelect);
    return () => {
      igEmblaApi.off("select", onIgSelect);
    };
  }, [igEmblaApi, onIgSelect]);

  // Error Suppression for navigator.getInstalledRelatedApps() in cross-origin iframes
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (
        event.reason &&
        (event.reason.message?.includes("getInstalledRelatedApps") ||
          event.reason.toString().includes("getInstalledRelatedApps") ||
          event.reason.name === "InvalidStateError")
      ) {
        event.preventDefault();
      }
    };

    const handleError = (event: ErrorEvent) => {
      if (
        event.message?.includes("getInstalledRelatedApps") ||
        event.error?.message?.includes("getInstalledRelatedApps")
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
      window.removeEventListener("error", handleError);
    };
  }, []);

  // Pre-load Instagram embed script
  useEffect(() => {
    const loadIGScript = () => {
      const processIG = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };

      if (!window.instgrm) {
        const existingScript = document.querySelector(
          'script[src*="instagram.com/embed.js"]'
        );
        if (!existingScript) {
          const script = document.createElement("script");
          script.async = true;
          script.src = "https://www.instagram.com/embed.js";
          document.body.appendChild(script);
          script.onload = () => {
            setTimeout(processIG, 100);
          };
        } else {
          const checkExist = setInterval(() => {
            if (window.instgrm) {
              processIG();
              clearInterval(checkExist);
            }
          }, 100);
          setTimeout(() => clearInterval(checkExist), 5000);
        }
      } else {
        processIG();
      }
    };

    loadIGScript();

    const fallbackTimer = setTimeout(() => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }, 1500);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // Process Instagram embeds whenever the Instagram tab is selected
  useEffect(() => {
    if (activeTab === "instagram") {
      const processIG = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };

      // Run multiple times with delay to account for React lifecycle rendering
      processIG();
      const timer1 = setTimeout(processIG, 50);
      const timer2 = setTimeout(processIG, 250);
      const timer3 = setTimeout(processIG, 750);
      const timer4 = setTimeout(processIG, 1500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [activeTab]);

  return (
    <section
      id="social-feed"
      className="py-24 bg-background relative z-10 overflow-hidden text-left border-t border-border/30"
    >
      {/* Background glow orbs */}
      <div
        className="absolute top-1/4 right-[10%] w-[300px] h-[300px] rounded-full opacity-[0.03] dark:opacity-[0.05] blur-[100px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(215 100% 55%) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 left-[10%] w-[300px] h-[300px] rounded-full opacity-[0.03] dark:opacity-[0.05] blur-[100px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsl(196 100% 47%) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-12 relative">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold mb-4 border"
              style={{
                background: "hsl(215 100% 55% / 0.08)",
                borderColor: "hsl(215 100% 55% / 0.25)",
                color: "hsl(215 100% 50%)",
              }}
            >
              <Sparkles size={13} className="text-sky-500 animate-pulse" />
              {t("Recent Activity")}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
              {t("Social Feed")}
            </h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-lg mx-auto">
              {t("Social Feed Subtitle")}
            </p>

            {/* Coura mascot */}
            <motion.img
              src="/Coura - Peace.png"
              alt="Coura mascot celebrating"
              className="absolute -right-2 sm:right-4 lg:right-16 -top-4 w-16 sm:w-20 h-auto drop-shadow-md select-none hidden md:block pointer-events-none"
              animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              draggable={false}
            />
          </div>
        </AnimatedSection>

        {/* Tab Switcher with animated pill */}
        <AnimatedSection delay={0.05}>
          <div className="flex justify-center mb-10">
            <div className="relative flex items-center gap-1.5 bg-secondary/50 border border-border/50 p-1.5 rounded-2xl backdrop-blur-sm">
              <button
                onClick={() => setActiveTab("linkedin")}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors duration-300 ${
                  activeTab === "linkedin"
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === "linkedin" && (
                  <motion.div
                    layoutId="socialActiveTabPill"
                    className="absolute inset-0 rounded-xl bg-blue-600 shadow-md shadow-blue-500/20 z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Linkedin size={14} />
                  {t("LinkedIn Updates")}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("instagram")}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors duration-300 ${
                  activeTab === "instagram"
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === "instagram" && (
                  <motion.div
                    layoutId="socialActiveTabPill"
                    className="absolute inset-0 rounded-xl z-0"
                    style={{
                      background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                      boxShadow: "0 4px 12px rgba(253, 29, 29, 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Instagram size={14} />
                  {t("Instagram Posts")}
                </span>
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Feed Panels */}
        <div className="min-h-[450px] relative w-full">
          <AnimatePresence mode="wait">
            {/* ═══ LinkedIn Carousel ═══ */}
            {activeTab === "linkedin" && (
              <motion.div
                key="linkedin"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div className="relative group/social">
                  <div ref={liEmblaRef} className="overflow-hidden">
                    <div className="flex gap-5">
                      {linkedInPosts.map((post, i) => {
                        const isActive = liActiveIndex === i;
                        return (
                          <div
                            key={post.id}
                            className="flex-[0_0_88%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
                          >
                            <motion.div
                              animate={{
                                scale: isActive ? 1 : 0.95,
                                opacity: isActive ? 1 : 0.6,
                              }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="relative rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm flex flex-col h-full w-full transition-all duration-300 hover:border-blue-500/30"
                            >
                              {/* Profile redirect overlay */}
                              <a
                                href="https://www.linkedin.com/in/rakha05"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 z-30 cursor-pointer"
                                aria-label="Visit LinkedIn Profile"
                              />
                              {/* Header */}
                              <div className="px-4 py-3 h-12 border-b border-border/50 bg-secondary/20 flex items-center gap-2.5 text-xs font-semibold text-muted-foreground shrink-0 z-10">
                                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                                  <Linkedin
                                    size={12}
                                    className="text-white"
                                  />
                                </div>
                                <span>{post.label}</span>
                                <div className="ml-auto flex items-center gap-1 font-normal text-[10px] text-slate-400 font-mono">
                                  <Calendar size={10} />
                                  <span>
                                    ugcPost:{post.embedId.slice(0, 10)}...
                                  </span>
                                </div>
                              </div>

                              {/* Iframe */}
                              <div className="flex-1 w-full relative bg-slate-50/50 dark:bg-slate-900/10">
                                {loadingStates[post.id] && (
                                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground bg-card">
                                    <Loader2
                                      className="animate-spin text-blue-500"
                                      size={24}
                                    />
                                    <span className="text-[10px] font-mono">
                                      Connecting to LinkedIn...
                                    </span>
                                  </div>
                                )}
                                <iframe
                                  src={post.url}
                                  height="400"
                                  width="100%"
                                  frameBorder="0"
                                  allowFullScreen={true}
                                  title={post.label}
                                  onLoad={() => handleIframeLoad(post.id)}
                                  className={`w-full transition-opacity duration-500 ${
                                    loadingStates[post.id]
                                      ? "opacity-0"
                                      : "opacity-100"
                                  }`}
                                />
                              </div>
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Nav Buttons */}
                  <button
                    onClick={() => liEmblaApi?.scrollPrev()}
                    className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card border border-border shadow-lg text-foreground flex items-center justify-center hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300 opacity-80 sm:opacity-0 sm:group-hover/social:opacity-100 hover:scale-110"
                    aria-label="Previous post"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => liEmblaApi?.scrollNext()}
                    className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card border border-border shadow-lg text-foreground flex items-center justify-center hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300 opacity-80 sm:opacity-0 sm:group-hover/social:opacity-100 hover:scale-110"
                    aria-label="Next post"
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Fade edges */}
                  <div className="absolute top-0 left-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
                  <div className="absolute top-0 right-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
                </div>

                {/* Dots */}
                <div className="flex items-center justify-center gap-2">
                  {linkedInPosts.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => liEmblaApi?.scrollTo(i)}
                      className={`carousel-dot ${liActiveIndex === i ? "active" : ""}`}
                      aria-label={`Go to LinkedIn post ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Follow CTA */}
                <div className="flex justify-center">
                  <a
                    href="https://www.linkedin.com/in/rakha05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center gap-2 py-3 px-6 rounded-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 bg-card border border-border hover:border-blue-500/50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-500/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Linkedin
                      size={14}
                      className="text-blue-500 group-hover:text-blue-600 transition-colors"
                    />
                    <span className="tracking-widest uppercase text-[10px] font-bold font-mono text-muted-foreground group-hover:text-blue-500 transition-colors duration-300">
                      Follow on LinkedIn
                    </span>
                    <ExternalLink
                      size={11}
                      className="text-muted-foreground group-hover:text-blue-500 transition-colors"
                    />
                  </a>
                </div>
              </motion.div>
            )}

            {/* ═══ Instagram Carousel ═══ */}
            {activeTab === "instagram" && (
              <motion.div
                key="instagram"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div className="relative group/social">
                  <div ref={igEmblaRef} className="overflow-hidden">
                    <div className="flex gap-5">
                      {instagramPosts.map((post, i) => {
                        const isActive = igActiveIndex === i;
                        return (
                          <div
                            key={post.id}
                            className="flex-[0_0_88%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0"
                          >
                            <motion.div
                              animate={{
                                scale: isActive ? 1 : 0.95,
                                opacity: isActive ? 1 : 0.6,
                              }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className="relative rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm flex flex-col h-full w-full transition-all duration-300 hover:border-pink-500/30"
                            >
                              {/* Profile redirect overlay */}
                              <a
                                href="https://www.instagram.com/couraa0"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 z-30 cursor-pointer"
                                aria-label="Visit Instagram Profile"
                              />
                              {/* Header */}
                              <div className="px-4 py-3 h-12 border-b border-border/50 bg-secondary/20 flex items-center gap-2.5 text-xs font-semibold text-muted-foreground shrink-0 z-10">
                                <div
                                  className="w-6 h-6 rounded-full flex items-center justify-center"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                                  }}
                                >
                                  <Instagram
                                    size={12}
                                    className="text-white"
                                  />
                                </div>
                                <span>{post.label}</span>
                              </div>

                              {/* Instagram Embed or Fallback */}
                              <div className="flex-1 w-full p-4 flex justify-center items-start bg-slate-50/50 dark:bg-slate-900/10 min-h-[350px] relative">
                                {igScriptBlocked ? (
                                  /* Beautiful Mock Instagram Post */
                                  <div className="w-full flex flex-col bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-white/5 overflow-hidden p-3 shadow-inner">
                                    {/* Header */}
                                    <div className="flex items-center gap-2 mb-3">
                                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[1.5px]">
                                        <div className="w-full h-full rounded-full bg-white dark:bg-slate-950 p-[1px]">
                                          <img 
                                            src="/Coura - Peace.png" 
                                            alt="Coura"
                                            className="w-full h-full rounded-full object-cover" 
                                            onError={(e) => { e.currentTarget.src = "/Coura - Peace.png" }}
                                          />
                                        </div>
                                      </div>
                                      <div className="flex flex-col text-left">
                                        <span className="text-[10px] font-bold text-foreground">couraa0</span>
                                        <span className="text-[8px] text-muted-foreground">Instagram Post</span>
                                      </div>
                                    </div>

                                    {/* Post Body (Gradient & Mascot Icon) */}
                                    <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-br from-pink-500/10 via-purple-600/10 to-indigo-500/10 flex items-center justify-center border border-slate-100 dark:border-white/5 relative group/ig-mock">
                                      <Instagram size={36} className="text-pink-500/30 group-hover/ig-mock:scale-110 transition-transform duration-300" />
                                      <span className="absolute bottom-2 right-2 text-[9px] font-mono text-muted-foreground/80 bg-background/60 backdrop-blur-md px-1.5 py-0.5 rounded">
                                        Click to view
                                      </span>
                                    </div>

                                    {/* Actions mockup */}
                                    <div className="flex items-center gap-3 my-2.5 text-muted-foreground">
                                      <span className="text-[10px] flex items-center gap-0.5">❤️ Like</span>
                                      <span className="text-[10px] flex items-center gap-0.5">💬 Comment</span>
                                    </div>

                                    {/* Text */}
                                    <p className="text-[10px] text-muted-foreground text-left line-clamp-2 leading-relaxed">
                                      Check out my latest post and updates on Instagram! Click this card to open in a new tab.
                                    </p>
                                  </div>
                                ) : (
                                  <div
                                    className="w-full flex justify-center"
                                    dangerouslySetInnerHTML={{
                                      __html: post.embedHtml,
                                    }}
                                  />
                                )}
                              </div>
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Nav Buttons */}
                  <button
                    onClick={() => igEmblaApi?.scrollPrev()}
                    className="absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card border border-border shadow-lg text-foreground flex items-center justify-center hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all duration-300 opacity-80 sm:opacity-0 sm:group-hover/social:opacity-100 hover:scale-110"
                    aria-label="Previous post"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => igEmblaApi?.scrollNext()}
                    className="absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card border border-border shadow-lg text-foreground flex items-center justify-center hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all duration-300 opacity-80 sm:opacity-0 sm:group-hover/social:opacity-100 hover:scale-110"
                    aria-label="Next post"
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Fade edges */}
                  <div className="absolute top-0 left-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
                  <div className="absolute top-0 right-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
                </div>

                {/* Dots */}
                <div className="flex items-center justify-center gap-2">
                  {instagramPosts.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => igEmblaApi?.scrollTo(i)}
                      className={`carousel-dot ${igActiveIndex === i ? "active" : ""}`}
                      aria-label={`Go to Instagram post ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Follow CTA */}
                <div className="flex justify-center">
                  <a
                    href="https://www.instagram.com/couraa0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center justify-center gap-2 py-3 px-6 rounded-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/10 bg-card border border-border hover:border-pink-500/50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-pink-500/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Instagram
                      size={14}
                      className="text-pink-500 group-hover:text-pink-600 transition-colors"
                    />
                    <span className="tracking-widest uppercase text-[10px] font-bold font-mono text-muted-foreground group-hover:text-pink-500 transition-colors duration-300">
                      Follow on Instagram
                    </span>
                    <ExternalLink
                      size={11}
                      className="text-muted-foreground group-hover:text-pink-500 transition-colors"
                    />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
