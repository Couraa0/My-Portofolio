import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import AnimatedSection from "./AnimatedSection";
import { Search, ExternalLink, QrCode, Loader2, ChevronLeft, ChevronRight, Award, ShieldAlert, CheckCircle2, X, Trophy, Medal, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAchievements, type Achievement as DBAchievement } from "@/lib/supabase";

interface Achievement {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  images: string[];
  type: string;
  category: string;
  createdAt?: string;
}

function adaptAchievement(a: DBAchievement): Achievement {
  return {
    id: a.id!,
    title: a.title,
    issuer: a.issuer,
    issueDate: a.issue_date,
    credentialId: a.credential_id,
    credentialUrl: a.credential_url,
    images: a.images || [],
    type: a.type,
    category: a.category,
    createdAt: a.created_at,
  };
}

export default function Achievements() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [activeItem, setActiveItem] = useState<Achievement | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [achievementsData, setAchievementsData] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>("All");

  useEffect(() => {
    getAchievements()
      .then((data) => {
        const mapped = data.map(adaptAchievement);
        setAchievementsData(mapped);
        if (mapped.length > 0) {
          setActiveItem(mapped[0]);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const types = useMemo(() => {
    const allTypes = achievementsData.map((item) => item.type);
    const uniqueTypes = Array.from(new Set(allTypes));
    
    const typeOrder: Record<string, number> = {
      "award": 1,
      "professional": 2,
      "profesional": 2,
      "certification": 3,
      "course": 4
    };
    
    uniqueTypes.sort((a, b) => {
      const orderA = typeOrder[a.toLowerCase()] || 99;
      const orderB = typeOrder[b.toLowerCase()] || 99;
      if (orderA === orderB) {
        return a.localeCompare(b);
      }
      return orderA - orderB;
    });

    return ["All", ...uniqueTypes];
  }, [achievementsData]);

  const filteredData = useMemo(() => {
    return achievementsData.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                           item.issuer.toLowerCase().includes(search.toLowerCase());
      const matchesType = selectedType === "All" || item.type === selectedType;
      return matchesSearch && matchesType;
    }).sort((a, b) => {
      const customOrder: Record<string, number> = {
        "award": 1,
        "professional": 2,
        "profesional": 2,
        "certification": 3,
        "course": 4
      };
      
      const getOrder = (item: typeof a) => {
        const typeOrder = customOrder[item.type?.toLowerCase() || ""];
        if (typeOrder) return typeOrder;
        const catOrder = customOrder[item.category?.toLowerCase() || ""];
        if (catOrder) return catOrder;
        return 99;
      };

      const orderA = getOrder(a);
      const orderB = getOrder(b);

      if (orderA !== orderB) {
        return orderA - orderB;
      }
      
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : new Date(a.issueDate).getTime();
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : new Date(b.issueDate).getTime();
      return timeB - timeA;
    });
  }, [search, achievementsData, selectedType]);

  // Sync active item when filtering changes
  useEffect(() => {
    if (filteredData.length > 0) {
      // Keep active item if still in filtered list, else select first
      const matches = filteredData.find(item => item.id === activeItem?.id);
      if (!matches) {
        setActiveItem(filteredData[0]);
        setCurrentImageIndex(0);
      }
    } else {
      setActiveItem(null);
    }
  }, [filteredData]);

  return (
    <section className="py-24 bg-background relative z-10 min-h-screen text-left">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Title */}
        <AnimatedSection>
          <div className="mb-10 pb-6 border-b border-border/60 relative">
            <h2 className="font-heading text-2xl md:text-3xl font-bold flex items-center gap-3 mb-3 text-foreground">
              <Award size={28} className="text-blue-500" />
              {t("Achievements Title Part2") || "Achievements"}
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl">
              {t("Achievements Subtitle")}
            </p>

            {/* Coura mascot - standing proud near achievements */}
            <motion.img
              src="/Coura.png"
              alt="Coura mascot"
              className="absolute -right-2 sm:right-0 -top-6 w-16 sm:w-20 h-auto drop-shadow-md select-none hidden md:block pointer-events-none"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              draggable={false}
            />
          </div>
        </AnimatedSection>

        {/* Dynamic Stats Counter Bar for All Categories */}
        {!loading && !error && achievementsData.length > 0 && (
          <AnimatedSection delay={0.03}>
            <div className="flex overflow-x-auto no-scrollbar scroll-smooth items-center gap-2.5 sm:gap-4 mb-8 py-1 flex-nowrap sm:flex-wrap justify-start sm:justify-start shrink-0">
              {Array.from(
                achievementsData.reduce((map, item) => {
                  const key = item.type || "Certification";
                  map.set(key, (map.get(key) || 0) + 1);
                  return map;
                }, new Map<string, number>())
              ).map(([type, count]) => {
                const lower = type.toLowerCase();
                let emoji = "🏅";
                if (lower.includes("award")) emoji = "🏆";
                else if (lower.includes("certif")) emoji = "📜";
                else if (lower.includes("course")) emoji = "🎓";
                else if (lower.includes("pro")) emoji = "⭐";

                return (
                  <div
                    key={type}
                    className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-card border border-border/60 shadow-sm transition-transform hover:scale-105 shrink-0 whitespace-nowrap"
                  >
                    <span className="text-base">{emoji}</span>
                    <div className="text-left">
                      <span className="text-sm sm:text-base font-extrabold text-foreground leading-none">
                        {count}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-muted-foreground ml-1 font-mono">
                        {type}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        )}

        {/* Search & Redesigned Type Filters */}
        <AnimatedSection delay={0.05}>
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
            {/* Search Input */}
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-blue-500 transition-colors" size={16} />
              <input
                type="text"
                placeholder="Search credentials directory..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-card border border-border/60 rounded-2xl outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 text-xs font-medium h-11 transition-all shadow-sm"
              />
            </div>

            {/* Sliding Pill Type Filters — Horizontal swipe row on mobile */}
            <div className="relative flex overflow-x-auto no-scrollbar scroll-smooth items-center gap-1.5 p-1.5 rounded-2xl bg-secondary/50 border border-border/60 backdrop-blur-sm shadow-sm justify-start sm:justify-start flex-nowrap sm:flex-wrap shrink-0">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-colors duration-300 shrink-0 whitespace-nowrap ${
                    selectedType === type
                      ? "text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {selectedType === type && (
                    <motion.div
                      layoutId="achievementTypePill"
                      className="absolute inset-0 rounded-xl bg-blue-600 shadow-md shadow-blue-500/20 z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1">
                    {type.toLowerCase() === "award" ? <Trophy size={12} /> : <Medal size={12} />}
                    {type.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 text-xs text-muted-foreground font-mono font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
            Showing {filteredData.length} {t("achievements") || "achievements"}
          </div>
        </AnimatedSection>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-24 text-muted-foreground">
            <Loader2 size={24} className="animate-spin text-blue-500" />
            <span className="text-sm">Initializing credential deck...</span>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="flex items-center justify-center gap-3 py-16 text-muted-foreground">
            <ShieldAlert size={20} className="text-red-500" />
            <span className="text-sm">{t("Failed to load data") || "Failed to load data"}: {error}</span>
          </div>
        )}

        {/* Workspace Console Grid */}
        {!loading && !error && filteredData.length > 0 && (
          <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
            
            {/* LEFT COLUMN: LIST INDEX (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-3 max-h-[750px] overflow-y-auto pr-1">
              {filteredData.map((item, index) => {
                const isActive = activeItem?.id === item.id;
                const isAward = item.type?.toLowerCase() === "award";
                const iconEmoji = isAward ? "🏆" : "🏅";

                return (
                  <AnimatedSection key={item.id} delay={0.04 * (index % 6)}>
                    <div
                      onClick={() => {
                        if (activeItem?.id === item.id) {
                          setActiveItem(null);
                        } else {
                          setActiveItem(item);
                          setCurrentImageIndex(0);
                        }
                      }}
                      className={`group relative flex flex-col rounded-2xl glass-card-premium overflow-hidden cursor-pointer transition-all duration-300 entry-shimmer ${
                        isActive
                          ? "border-blue-500 ring-2 ring-blue-500/20 shadow-lg shadow-blue-500/10"
                          : "hover:border-blue-500/40 hover:shadow-md"
                      }`}
                    >
                      {/* HUD corners */}
                      <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />
                      <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />
                      <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />
                      <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-blue-500/0 group-hover:border-blue-500/50 transition-colors duration-300 z-10" />

                      {/* Active indicator indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 z-30" />
                      )}

                      {/* Cover Image Area */}
                      <div className="relative h-36 overflow-hidden bg-muted flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-10" />
                        {item.images && item.images.length > 0 ? (
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <Award size={40} className="text-slate-300 dark:text-slate-700" />
                        )}

                        {/* Type badge - glassmorphism */}
                        <div className="absolute top-2.5 right-2.5 z-20">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-extrabold text-white bg-blue-600/80 backdrop-blur-sm border border-blue-500/20 shadow-md">
                            {isAward ? <Trophy size={9} /> : <Medal size={9} />}
                            {item.type}
                          </span>
                        </div>

                        {/* Category badge bottom-left */}
                        <div className="absolute bottom-2.5 left-2.5 z-20">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold text-white/90 bg-white/10 backdrop-blur-sm border border-white/10">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col flex-grow text-left">
                        <div className="flex items-start gap-2.5 mb-2">
                          <span className="text-xl flex-shrink-0 mt-0.5">{iconEmoji}</span>
                          <div className="min-w-0">
                            <h4 className="font-heading font-extrabold text-sm text-card-foreground group-hover:text-blue-500 transition-colors line-clamp-2 leading-snug">
                              {item.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-0.5 font-medium truncate">
                              {item.issuer}
                            </p>
                          </div>
                        </div>

                        <div className="flex-1" />

                        {/* Footer Meta */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40 text-[10px]">
                          <span className="font-mono text-slate-400">
                            {item.issueDate}
                          </span>
                          {item.credentialUrl && item.credentialUrl !== "#" ? (
                            <a
                              href={item.credentialUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="font-bold text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Verify
                              <ArrowRight size={10} />
                            </a>
                          ) : (
                            <span className="font-bold text-blue-500 uppercase">
                              {item.type}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Expandable sub-diagnostics scanner (ONLY displayed on mobile/tablet screens) */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: "0px" }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="lg:hidden w-full overflow-hidden border-t border-border/50 p-4"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <DiagnosticPanel 
                              item={item} 
                              t={t} 
                              currentIdx={currentImageIndex} 
                              setCurrentIdx={setCurrentImageIndex}
                              setFullScreenImage={setFullScreenImage}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

            {/* RIGHT COLUMN: IMMERSIVE SCANNER VIEW (7 cols) - Hidden on Mobile */}
            <div className="hidden lg:block lg:col-span-7 h-full">
              <div className="h-full rounded-2xl border border-border bg-slate-50/50 dark:bg-slate-900/10 backdrop-blur-sm p-6 relative overflow-y-auto shadow-inner flex flex-col min-h-[600px]">
                
                {/* Cyber Grid Watermark */}
                <div className="absolute inset-0 bg-grid opacity-[0.1] pointer-events-none" />

                <AnimatePresence mode="wait">
                  {activeItem && (
                    <motion.div
                      key={activeItem.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 flex flex-col justify-between h-full"
                    >
                      <DiagnosticPanel 
                        item={activeItem} 
                        t={t} 
                        currentIdx={currentImageIndex} 
                        setCurrentIdx={setCurrentImageIndex}
                        setFullScreenImage={setFullScreenImage}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredData.length === 0 && (
          <AnimatedSection delay={0.1}>
            <div className="text-center py-24 text-muted-foreground border border-dashed border-border rounded-2xl bg-card/50 max-w-lg mx-auto">
              <p className="text-sm font-semibold">{t("No results found") || "No achievements found matching query."}</p>
            </div>
          </AnimatedSection>
        )}

      </div>

      {/* Full Screen Image Modal */}
      {createPortal(
        <AnimatePresence>
          {fullScreenImage && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4" onClick={() => setFullScreenImage(null)}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={fullScreenImage}
                alt="Fullscreen"
                className="relative z-10 max-w-[90vw] md:max-w-3xl max-h-[70vh] object-contain cursor-zoom-out rounded-xl shadow-2xl border border-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  setFullScreenImage(null);
                }}
              />
              <button 
                className="absolute top-4 right-4 z-[210] p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setFullScreenImage(null);
                }}
              >
                <X size={24} />
              </button>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </section>
  );
}

/* ── DRY DIAGNOSTIC PANEL FOR SINGLE/ACCORDION VIEWS ── */

const DiagnosticPanel = ({
  item, t, currentIdx, setCurrentIdx, setFullScreenImage
}: {
  item: Achievement; t: any; currentIdx: number; setCurrentIdx: any; setFullScreenImage: any;
}) => {
  return (
    <div className="flex flex-col h-full justify-between relative z-10 space-y-6">
      
      {/* Scanner Diagnostic Header */}
      <div className="flex justify-between items-center pb-3 border-b border-border/50">
        <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold text-slate-500">
          <span>SCAN_ID:</span>
          <span className="text-blue-500 font-bold truncate max-w-[120px]">{item.id.slice(0, 10).toUpperCase()}</span>
        </div>
        
        {/* Verification Badge */}
        <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-[8px] font-mono font-bold">
          <CheckCircle2 size={10} />
          <span>VERIFIED [SECURE]</span>
        </div>
      </div>

      {/* Stacked Layout */}
      <div className="flex flex-col gap-5 flex-grow">
        
        {/* Carousel Image Panel (Full Width) */}
        <div className="w-full bg-muted/40 p-3 rounded-xl border border-border/50 relative group min-h-[180px] flex items-center justify-center">
          
          {/* Diagnostic Corner brackets */}
          <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-blue-500/40" />
          <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-blue-500/40" />
          <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-blue-500/40" />
          <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-blue-500/40" />
 
          {item.images && item.images.length > 0 ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <img 
                src={item.images[currentIdx]} 
                alt={`${item.title}`} 
                className="max-w-full max-h-[300px] object-contain rounded shadow border border-border bg-white cursor-zoom-in hover:scale-[1.01] transition-transform" 
                onClick={(e) => {
                  e.stopPropagation();
                  setFullScreenImage(item.images[currentIdx]);
                }}
              />
              
              {/* Carousel Arrows */}
              {item.images.length > 1 && (
                <>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIdx((prev: number) => prev === 0 ? item.images.length - 1 : prev - 1);
                    }}
                    className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIdx((prev: number) => (prev + 1) % item.images.length);
                    }}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="text-[10px] text-muted-foreground/60 uppercase font-mono">NO DIAGNOSTIC PHOTO</div>
          )}
        </div>
 
        {/* Text Diagnostics Panel (Full Width Grid) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 text-left font-mono text-xs bg-slate-100/50 dark:bg-slate-900/60 p-4 rounded-xl border border-border/40">
          <div className="sm:col-span-2">
            <span className="text-slate-400 block font-bold mb-0.5">CREDENTIAL_TITLE</span>
            <span className="text-sm font-heading font-bold text-foreground leading-snug tracking-tight block">
              {item.title}
            </span>
          </div>
 
          <div>
            <span className="text-slate-400 block font-bold mb-0.5">ISSUER_OR_NODE</span>
            <span className="text-foreground font-semibold block text-xs">{item.issuer}</span>
          </div>
 
          <div>
            <span className="text-slate-400 block font-bold mb-0.5">TIMESTAMP</span>
            <span className="text-foreground font-semibold text-xs">{item.issueDate}</span>
          </div>
 
          {item.credentialId && (
            <div className="sm:col-span-2">
              <span className="text-slate-400 block font-bold mb-0.5">CREDENTIAL_ID</span>
              <span className="text-foreground font-mono bg-card p-1 px-1.5 border border-border/40 rounded block break-all text-[10px]">
                {item.credentialId}
              </span>
            </div>
          )}
 
          <div>
            <span className="text-slate-400 block font-bold mb-0.5">TYPE</span>
            <span className="text-foreground font-semibold uppercase text-xs">{item.type}</span>
          </div>
          
          <div>
            <span className="text-slate-400 block font-bold mb-0.5">CATEGORY</span>
            <span className="text-foreground font-semibold uppercase text-xs">{item.category}</span>
          </div>
        </div>
 
      </div>

      {/* Verification button */}
      <div className="pt-4 border-t border-border/40 w-full shrink-0">
        <a 
          href={item.credentialUrl !== "#" ? item.credentialUrl : undefined}
          target="_blank"
          rel="noreferrer"
          className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold transition-all
            ${item.credentialUrl !== "#" ? "bg-blue-600 hover:bg-blue-700 text-white shadow shadow-blue-500/10 hover:shadow-lg" : "bg-muted text-muted-foreground cursor-not-allowed"}
          `}
        >
          {item.credentialUrl !== "#" ? (
             <>
                 <QrCode size={14} /> {t("View Credential") || "View Credential"}
             </>
          ) : (
            t("Credential URL Unavailable") || "Credential URL Unavailable"
          )}
        </a>
      </div>

    </div>
  );
};
