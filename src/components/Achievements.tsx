import { useState, useMemo, useEffect, Fragment } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import AnimatedSection from "./AnimatedSection";
import { Search, ExternalLink, QrCode, X, Loader2, ChevronLeft, ChevronRight, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAchievements, type Achievement as DBAchievement } from "@/lib/supabase";

// Local type that matches the Supabase DB fields mapped to camelCase
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
  };
}

export default function Achievements() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [achievementsData, setAchievementsData] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAchievements()
      .then((data) => setAchievementsData(data.map(adaptAchievement)))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredData = useMemo(() => {
    return achievementsData.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase()) || 
             item.issuer.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, achievementsData]);


  return (
    <section className="py-24 bg-background relative z-10 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <AnimatedSection>
          <div className="mb-10 pb-6 border-b border-border/60">
            <h2 className="font-heading text-2xl md:text-3xl font-bold flex items-center gap-3 mb-3 text-foreground">
              <Award size={28} className="text-primary" />
              {t("Achievements Title Part2") || "Achievements"}
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl">
              {t("Achievements Subtitle")}
            </p>
          </div>
        </AnimatedSection>

        {/* Search */}
        <AnimatedSection delay={0.1}>
          <div className="mb-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search achievements..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-card border border-border/50 rounded-lg outline-none focus:ring-2 focus:ring-primary/50 text-sm h-11"
              />
            </div>
          </div>
          <div className="mb-8 text-sm text-muted-foreground font-medium">
            Total: {filteredData.length}
          </div>
        </AnimatedSection>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-card border border-border/50 rounded-2xl overflow-hidden animate-pulse flex flex-col">
                <div className="aspect-[4/3] bg-muted" />
                <div className="p-5 space-y-2">
                  <div className="h-3 bg-muted rounded w-1/2" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="flex items-center justify-center gap-3 py-16 text-muted-foreground">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm">{t("Failed to load data") || "Failed to load data"}: {error}</span>
          </div>
        )}

        {/* Grid */}
        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.map((item) => (
               <div 
                  key={item.id}
                  className="bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col h-full hover:-translate-y-1"
                  onClick={() => {
                    setSelectedAchievement(item);
                    setCurrentImageIndex(0);
                  }}
               >
                  <div className="aspect-[4/3] relative overflow-hidden bg-white/5 border-b border-border/50 shrink-0">
                    {item.images && item.images.length > 0 ? (
                      <img 
                        src={item.images[0]} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <span className="text-xs text-muted-foreground">{t("No Image") || "No Image"}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col grow">
                    <p className="text-[10px] font-mono text-muted-foreground mb-2 truncate bg-muted/40 w-fit px-2 py-0.5 rounded">
                      {item.credentialId || "CREDENTIAL ID HIDDEN"}
                    </p>
                    <h3 className="font-heading font-bold text-lg mb-1.5 text-foreground group-hover:text-amber-500 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
                      {item.issuer}
                    </p>
                    <div className="flex gap-2 mb-4 flex-wrap mt-auto pt-2">
                      <span className="text-[10px] items-center flex uppercase font-bold tracking-wider px-2 py-1 rounded-full bg-secondary text-secondary-foreground border border-border/50">
                        {item.type}
                      </span>
                      <span className="text-[10px] items-center flex uppercase font-bold tracking-wider px-2 py-1 rounded-full bg-secondary text-secondary-foreground border border-border/50">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-muted-foreground uppercase tracking-wide border-t border-border/40 pt-3">
                      <span>{t("Issued on") || "Issued on"} {item.issueDate}</span>
                      <ExternalLink size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
               </div>
            ))}
          </div>
          {filteredData.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">
              <p>{t("No results found") || "No achievements found matching your search."}</p>
            </div>
          )}
        </AnimatedSection>
      </div>

      {/* Detail Modal */}
      {createPortal(
        <AnimatePresence>
          {selectedAchievement && (
           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 xl:p-8">
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedAchievement(null)}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
             />

             <motion.div
               initial={{ scale: 0.95, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.95, opacity: 0, y: 20 }}
               className="relative w-full max-w-5xl bg-background rounded-2xl overflow-hidden shadow-2xl border border-border flex flex-col md:flex-row h-auto max-h-[90vh]"
             >
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors backdrop-blur-md"
                >
                  <X size={18} />
                </button>

                {/* Left Side: Cert Images Carousel */}
                <div className="md:w-[60%] bg-muted/30 p-4 shrink-0 md:p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-border/40 min-h-[220px] md:min-h-[300px] relative group">
                   {selectedAchievement.images && selectedAchievement.images.length > 0 ? (
                     <div className="relative w-full h-full flex flex-col items-center justify-center">
                       <img 
                         src={selectedAchievement.images[currentImageIndex]} 
                         alt={`${selectedAchievement.title} - Image ${currentImageIndex + 1}`} 
                         className="max-w-full max-h-[40vh] md:max-h-[70vh] object-contain rounded shadow-lg border border-border/20 bg-white transition-opacity duration-300" 
                       />
                       
                       {/* Carousel Controls */}
                       {selectedAchievement.images.length > 1 && (
                         <>
                           <button 
                             onClick={(e) => {
                               e.stopPropagation();
                               setCurrentImageIndex((prev) => prev === 0 ? selectedAchievement.images.length - 1 : prev - 1);
                             }}
                             className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                           >
                             <ChevronLeft size={24} />
                           </button>
                           
                           <button 
                             onClick={(e) => {
                               e.stopPropagation();
                               setCurrentImageIndex((prev) => (prev + 1) % selectedAchievement.images.length);
                             }}
                             className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                           >
                             <ChevronRight size={24} />
                           </button>

                           {/* Dots indicators */}
                           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                             {selectedAchievement.images.map((_, idx) => (
                               <button
                                 key={idx}
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   setCurrentImageIndex(idx);
                                 }}
                                 className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === idx ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"}`}
                               />
                             ))}
                           </div>
                         </>
                       )}
                     </div>
                   ) : (
                     <div className="w-full h-full flex flex-col items-center justify-center opacity-50">
                       <span>{t("No image found.") || "No image found."}</span>
                     </div>
                   )}
                </div>
                
                {/* Right Side: details */}
                <div className="md:w-[40%] p-6 md:p-8 flex flex-col bg-card overflow-y-auto flex-1">
                   <h3 className="text-xl md:text-2xl font-bold leading-snug mb-2 text-foreground pr-8">
                     {selectedAchievement.title}
                   </h3>
                   <p className="text-sm font-medium text-muted-foreground mb-8">
                     {selectedAchievement.issuer}
                   </p>
                   
                   <div className="space-y-6 flex-1">
                      {selectedAchievement.credentialId && (
                        <div>
                           <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-semibold">Credential ID</p>
                           <p className="text-sm font-mono bg-muted w-fit max-w-full break-all px-2 py-1 rounded border border-border/50 text-foreground">
                             {selectedAchievement.credentialId}
                           </p>
                        </div>
                      )}

                      <div>
                         <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-semibold">Type</p>
                         <p className="text-sm font-medium text-foreground">{selectedAchievement.type}</p>
                      </div>
                      
                      <div>
                         <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-semibold">Category</p>
                         <p className="text-sm font-medium text-foreground">{selectedAchievement.category}</p>
                      </div>

                      <div>
                         <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-semibold">Issue Date</p>
                         <p className="text-sm font-medium text-foreground">{selectedAchievement.issueDate}</p>
                      </div>
                   </div>

                   <div className="pt-8 mt-4 border-t border-border/40">
                      <a 
                        href={selectedAchievement.credentialUrl !== "#" ? selectedAchievement.credentialUrl : undefined}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-bold transition-all
                          ${selectedAchievement.credentialUrl !== "#" ? "bg-amber-400 hover:bg-amber-500 text-amber-950 shadow hover:shadow-md" : "bg-muted text-muted-foreground cursor-not-allowed"}
                        `}
                      >
                        {selectedAchievement.credentialUrl !== "#" ? (
                           <>
                               <QrCode size={16} /> {t("View Credential") || "View Credential"}
                           </>
                        ) : (
                          t("Credential URL Unavailable") || "Credential URL Unavailable"
                        )}
                      </a>
                   </div>
                </div>
             </motion.div>
           </div>
         )}
       </AnimatePresence>,
       document.body
     )}
    </section>
  );
}
