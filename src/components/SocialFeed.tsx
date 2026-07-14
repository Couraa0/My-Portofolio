import { useState, useEffect } from "react";
import { Linkedin, Instagram, Sparkles, Loader2, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
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

export default function SocialFeed() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"linkedin" | "instagram">("linkedin");
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({
    li1: true,
    li2: true,
    li3: true,
  });

  const handleIframeLoad = (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: false }));
  };

  // 1. Error Suppression for navigator.getInstalledRelatedApps() in cross-origin iframes
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Suppress the getInstalledRelatedApps error thrown by third-party iframe scripts
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
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
      window.removeEventListener("error", handleError);
    };
  }, []);

  // 2. Pre-load Instagram embed script and process embeds on mount immediately
  useEffect(() => {
    const loadIGScript = () => {
      const processIG = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };

      if (!window.instgrm) {
        const existingScript = document.querySelector('script[src*="instagram.com/embed.js"]');
        if (!existingScript) {
          const script = document.createElement("script");
          script.async = true;
          script.src = "https://www.instagram.com/embed.js";
          document.body.appendChild(script);
          script.onload = () => {
            setTimeout(processIG, 100);
          };
        } else {
          // If script tag exists but window.instgrm is not initialized yet
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

    // Process again slightly later to handle slow rendering elements
    const fallbackTimer = setTimeout(() => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }, 1500);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // 3. Process Instagram embeds whenever the Instagram tab is selected (just in case)
  useEffect(() => {
    if (activeTab === "instagram" && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [activeTab]);

  return (
    <section id="social-feed" className="py-24 bg-background relative z-10 overflow-hidden text-left border-t border-border/30">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 right-[10%] w-[300px] h-[300px] rounded-full opacity-[0.03] dark:opacity-[0.05] blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(215 100% 55%) 0%, transparent 70%)" }}
      />
      <div className="absolute bottom-1/4 left-[10%] w-[300px] h-[300px] rounded-full opacity-[0.03] dark:opacity-[0.05] blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(196 100% 47%) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
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

            {/* Coura mascot waving hello near social feed title */}
            <motion.img
              src="/Coura - Peace.png"
              alt="Coura mascot celebrating"
              className="absolute -right-2 sm:right-4 lg:right-16 -top-4 w-16 sm:w-20 h-auto drop-shadow-md select-none hidden md:block pointer-events-none"
              animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              draggable={false}
            />
          </div>
        </AnimatedSection>

        {/* Tab Controls */}
        <AnimatedSection delay={0.05}>
          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-1.5 bg-secondary/50 border border-border/50 p-1.5 rounded-2xl backdrop-blur-sm">
              <button
                onClick={() => setActiveTab("linkedin")}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                  activeTab === "linkedin"
                    ? "text-white bg-blue-600 shadow-md shadow-blue-500/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                <Linkedin size={14} />
                {t("LinkedIn Updates")}
              </button>

              <button
                onClick={() => setActiveTab("instagram")}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                  activeTab === "instagram"
                    ? "text-white bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 shadow-md shadow-pink-500/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                <Instagram size={14} />
                {t("Instagram Posts")}
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Feeds Panel (Both are rendered in the DOM concurrently for early background loading) */}
        <div className="min-h-[450px] relative w-full">
          
          {/* LinkedIn Feed Panel */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch transition-all duration-500 ease-out ${
              activeTab === "linkedin"
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none absolute inset-x-0 top-0 h-0 overflow-hidden"
            }`}
          >
            {/* LinkedIn Card 1 */}
            <div className="relative rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm flex flex-col h-full w-full max-w-[420px] mx-auto hover:border-blue-500/30 transition-colors duration-300 group">
              {/* Profile redirect overlay */}
              <a
                href="https://www.linkedin.com/in/rakha05"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-30 cursor-pointer"
                aria-label="Visit LinkedIn Profile"
              />
              <div className="px-4 py-3 h-12 border-b border-border/50 bg-secondary/20 flex items-center gap-2.5 text-xs font-semibold text-muted-foreground shrink-0 z-10">
                <Linkedin size={13} className="text-blue-500" />
                <span>LinkedIn Update #1</span>
                <div className="ml-auto flex items-center gap-1 font-normal text-[10px] text-slate-400 font-mono">
                  <Calendar size={10} />
                  <span>ugcPost:74127663...</span>
                </div>
              </div>
              <div className="flex-1 w-full relative bg-slate-50/50 dark:bg-slate-900/10">
                {loadingStates.li1 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground bg-card">
                    <Loader2 className="animate-spin text-blue-500" size={24} />
                    <span className="text-[10px] font-mono">Connecting to LinkedIn...</span>
                  </div>
                )}
                <iframe
                  src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7412766318019637248?collapsed=1"
                  height="627"
                  width="100%"
                  frameBorder="0"
                  allowFullScreen={true}
                  title="LinkedIn Embed 1"
                  onLoad={() => handleIframeLoad("li1")}
                  className={`w-full transition-opacity duration-500 ${loadingStates.li1 ? "opacity-0" : "opacity-100"}`}
                />
              </div>
            </div>

            {/* LinkedIn Card 2 */}
            <div className="relative rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm flex flex-col h-full w-full max-w-[420px] mx-auto hover:border-blue-500/30 transition-colors duration-300 group">
              {/* Profile redirect overlay */}
              <a
                href="https://www.linkedin.com/in/rakha05"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-30 cursor-pointer"
                aria-label="Visit LinkedIn Profile"
              />
              <div className="px-4 py-3 h-12 border-b border-border/50 bg-secondary/20 flex items-center gap-2.5 text-xs font-semibold text-muted-foreground shrink-0 z-10">
                <Linkedin size={13} className="text-blue-500" />
                <span>LinkedIn Update #2</span>
                <div className="ml-auto flex items-center gap-1 font-normal text-[10px] text-slate-400 font-mono">
                  <Calendar size={10} />
                  <span>ugcPost:74127619...</span>
                </div>
              </div>
              <div className="flex-1 w-full relative bg-slate-50/50 dark:bg-slate-900/10">
                {loadingStates.li2 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground bg-card">
                    <Loader2 className="animate-spin text-blue-500" size={24} />
                    <span className="text-[10px] font-mono">Connecting to LinkedIn...</span>
                  </div>
                )}
                <iframe
                  src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7412761993625034752?collapsed=1"
                  height="627"
                  width="100%"
                  frameBorder="0"
                  allowFullScreen={true}
                  title="LinkedIn Embed 2"
                  onLoad={() => handleIframeLoad("li2")}
                  className={`w-full transition-opacity duration-500 ${loadingStates.li2 ? "opacity-0" : "opacity-100"}`}
                />
              </div>
            </div>

            {/* LinkedIn Card 3 */}
            <div className="relative rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm flex flex-col h-full w-full max-w-[420px] mx-auto hover:border-blue-500/30 transition-colors duration-300 group">
              {/* Profile redirect overlay */}
              <a
                href="https://www.linkedin.com/in/rakha05"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-30 cursor-pointer"
                aria-label="Visit LinkedIn Profile"
              />
              <div className="px-4 py-3 h-12 border-b border-border/50 bg-secondary/20 flex items-center gap-2.5 text-xs font-semibold text-muted-foreground shrink-0 z-10">
                <Linkedin size={13} className="text-blue-500" />
                <span>LinkedIn Update #3</span>
                <div className="ml-auto flex items-center gap-1 font-normal text-[10px] text-slate-400 font-mono">
                  <Calendar size={10} />
                  <span>ugcPost:74545360...</span>
                </div>
              </div>
              <div className="w-full relative bg-slate-50/50 dark:bg-slate-900/10">
                {loadingStates.li3 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground bg-card">
                    <Loader2 className="animate-spin text-blue-500" size={24} />
                    <span className="text-[10px] font-mono">Connecting to LinkedIn...</span>
                  </div>
                )}
                <iframe
                  src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7454536085126180866?collapsed=1"
                  height="627"
                  width="100%"
                  frameBorder="0"
                  allowFullScreen={true}
                  title="LinkedIn Embed 3"
                  onLoad={() => handleIframeLoad("li3")}
                  className={`w-full transition-opacity duration-500 ${loadingStates.li3 ? "opacity-0" : "opacity-100"}`}
                />
              </div>
            </div>
          </div>

          {/* Instagram Feed Panel */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch transition-all duration-500 ease-out ${
              activeTab === "instagram"
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none absolute inset-x-0 top-0 h-0 overflow-hidden"
            }`}
          >
            {/* Instagram Post 1 */}
            <div className="relative rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm flex flex-col h-full w-full max-w-[420px] mx-auto hover:border-pink-500/30 transition-colors duration-300 group">
              {/* Profile redirect overlay */}
              <a
                href="https://www.instagram.com/couraa0"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-30 cursor-pointer"
                aria-label="Visit Instagram Profile"
              />
              <div className="px-4 py-3 h-12 border-b border-border/50 bg-secondary/20 flex items-center gap-2.5 text-xs font-semibold text-muted-foreground shrink-0 z-10">
                <Instagram size={13} className="text-pink-500" />
                <span>Instagram Post #1</span>
              </div>
              <div className="flex-1 w-full p-4 flex justify-center items-start bg-slate-50/50 dark:bg-slate-900/10">
                <div 
                  className="w-full flex justify-center"
                  dangerouslySetInnerHTML={{ __html: `
                    <blockquote
                      class="instagram-media"
                      data-instgrm-permalink="https://www.instagram.com/p/Dasn4-8z_Gr/?utm_source=ig_embed&amp;utm_campaign=loading"
                      data-instgrm-version="14"
                      style="background:#FFF; border:0; border-radius:8px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin:1px; max-width:540px; min-width:326px; padding:0; width:100%;"
                    >
                      <div style="padding:16px; text-align:center;">
                        <a href="https://www.instagram.com/p/Dasn4-8z_Gr/?utm_source=ig_embed&amp;utm_campaign=loading" target="_blank" style="text-decoration:none; color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px;">
                          Loading Instagram Post...
                        </a>
                      </div>
                    </blockquote>
                  `}} 
                />
              </div>
            </div>

            {/* Instagram Post 2 */}
            <div className="relative rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm flex flex-col h-full w-full max-w-[420px] mx-auto hover:border-pink-500/30 transition-colors duration-300 group">
              {/* Profile redirect overlay */}
              <a
                href="https://www.instagram.com/couraa0"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-30 cursor-pointer"
                aria-label="Visit Instagram Profile"
              />
              <div className="px-4 py-3 h-12 border-b border-border/50 bg-secondary/20 flex items-center gap-2.5 text-xs font-semibold text-muted-foreground shrink-0 z-10">
                <Instagram size={13} className="text-pink-500" />
                <span>Instagram Post #2</span>
              </div>
              <div className="flex-1 w-full p-4 flex justify-center items-start bg-slate-50/50 dark:bg-slate-900/10">
                <div 
                  className="w-full flex justify-center"
                  dangerouslySetInnerHTML={{ __html: `
                    <blockquote
                      class="instagram-media"
                      data-instgrm-permalink="https://www.instagram.com/p/DBl83zez2FI/?utm_source=ig_embed&amp;utm_campaign=loading"
                      data-instgrm-version="14"
                      style="background:#FFF; border:0; border-radius:8px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin:1px; max-width:540px; min-width:326px; padding:0; width:100%;"
                    >
                      <div style="padding:16px; text-align:center;">
                        <a href="https://www.instagram.com/p/DBl83zez2FI/?utm_source=ig_embed&amp;utm_campaign=loading" target="_blank" style="text-decoration:none; color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px;">
                          Loading Instagram Post...
                        </a>
                      </div>
                    </blockquote>
                  `}} 
                />
              </div>
            </div>

            {/* Instagram Post 3 */}
            <div className="relative rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm flex flex-col h-full w-full max-w-[420px] mx-auto hover:border-pink-500/30 transition-colors duration-300 group">
              {/* Profile redirect overlay */}
              <a
                href="https://www.instagram.com/couraa0"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-30 cursor-pointer"
                aria-label="Visit Instagram Profile"
              />
              <div className="px-4 py-3 h-12 border-b border-border/50 bg-secondary/20 flex items-center gap-2.5 text-xs font-semibold text-muted-foreground shrink-0 z-10">
                <Instagram size={13} className="text-pink-500" />
                <span>Instagram Post #3</span>
              </div>
              <div className="flex-1 w-full p-4 flex justify-center items-start bg-slate-50/50 dark:bg-slate-900/10">
                <div 
                  className="w-full flex justify-center"
                  dangerouslySetInnerHTML={{ __html: `
                    <blockquote
                      class="instagram-media"
                      data-instgrm-permalink="https://www.instagram.com/p/DY9_YuvyGcj/?utm_source=ig_embed&amp;utm_campaign=loading"
                      data-instgrm-version="14"
                      style="background:#FFF; border:0; border-radius:8px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin:1px; max-width:540px; min-width:326px; padding:0; width:100%;"
                    >
                      <div style="padding:16px; text-align:center;">
                        <a href="https://www.instagram.com/p/DY9_YuvyGcj/?utm_source=ig_embed&amp;utm_campaign=loading" target="_blank" style="text-decoration:none; color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px;">
                          Loading Instagram Post...
                        </a>
                      </div>
                    </blockquote>
                  `}} 
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
