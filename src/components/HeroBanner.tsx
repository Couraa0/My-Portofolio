import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Trophy,
  FolderKanban,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Loader2,
  Star,
  Award,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { getProjects, getAchievements } from "@/lib/supabase";

export interface HeroSlideItem {
  id: string;
  type: "project" | "achievement";
  title: string;
  subtitle: string;
  badge: string;
  image?: string;
  tags: string[];
  link?: string;
  isExternalLink?: boolean;
}

const AUTOPLAY_DELAY = 4500;

export const HeroBanner = () => {
  const { t } = useTranslation();
  const [slides, setSlides] = useState<HeroSlideItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });

  useEffect(() => {
    Promise.all([getProjects(), getAchievements()])
      .then(([projectsData, achievementsData]) => {
        const projectSlides: HeroSlideItem[] = projectsData
          .filter((p) => p.featured)
          .slice(0, 3)
          .map((p) => ({
            id: `proj-${p.id}`,
            type: "project",
            title: p.title,
            subtitle: p.description,
            badge: "Featured Project",
            image: p.image_url,
            tags: p.tech ? p.tech.slice(0, 4) : [],
            link: `/projects`,
            isExternalLink: false,
          }));

        const achievementSlides: HeroSlideItem[] = achievementsData
          .filter(
            (a) =>
              a.type?.toLowerCase() === "award" ||
              a.type?.toLowerCase() === "professional" ||
              a.type?.toLowerCase() === "profesional"
          )
          .slice(0, 3)
          .map((a) => ({
            id: `achv-${a.id}`,
            type: "achievement",
            title: a.title,
            subtitle: `${a.issuer} • ${a.issue_date}`,
            badge: a.type?.toLowerCase() === "award" ? "Award Highlight" : "Certification",
            image: a.images && a.images.length > 0 ? a.images[0] : undefined,
            tags: [a.category || a.type],
            link: a.credential_url && a.credential_url !== "#" ? a.credential_url : "/achievements",
            isExternalLink: Boolean(a.credential_url && a.credential_url !== "#"),
          }));

        // Interleave projects and achievements (e.g. P1, A1, P2, A2)
        const combined: HeroSlideItem[] = [];
        const maxLength = Math.max(projectSlides.length, achievementSlides.length);
        for (let i = 0; i < maxLength; i++) {
          if (projectSlides[i]) combined.push(projectSlides[i]);
          if (achievementSlides[i]) combined.push(achievementSlides[i]);
        }

        setSlides(combined);
      })
      .catch((e) => console.error("Error loading hero banner slides:", e))
      .finally(() => setLoading(false));
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const startAutoplay = useCallback(() => {
    if (autoplayTimer.current) clearTimeout(autoplayTimer.current);
    autoplayTimer.current = setTimeout(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, AUTOPLAY_DELAY);
  }, [emblaApi]);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimer.current) {
      clearTimeout(autoplayTimer.current);
      autoplayTimer.current = null;
    }
  }, []);

  useEffect(() => {
    if (!emblaApi || isHovered) return;
    startAutoplay();
    emblaApi.on("select", startAutoplay);
    return () => {
      stopAutoplay();
      emblaApi.off("select", startAutoplay);
    };
  }, [emblaApi, isHovered, startAutoplay, stopAutoplay]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  if (loading) {
    return (
      <div className="w-full h-[200px] sm:h-[260px] lg:h-[400px] rounded-3xl bg-card border border-border/60 animate-pulse flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={24} />
      </div>
    );
  }

  if (slides.length === 0) return null;

  return (
    <div
      className="relative w-full max-w-[550px] xl:max-w-[600px] mx-auto group/heroBanner"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* High-tech Glowing Frame Container */}
      <div className="relative rounded-3xl p-1 bg-gradient-to-b from-blue-500/20 via-border/50 to-sky-500/20 shadow-2xl shadow-blue-500/10">
        <div ref={emblaRef} className="overflow-hidden rounded-[22px]">
          <div className="flex">
            {slides.map((slide, i) => {
               const isProject = slide.type === "project";
               // Lazy-render carousel images
               const isLoaded = 
                 activeIndex === i || 
                 Math.abs(activeIndex - i) <= 1 || 
                 (activeIndex === 0 && i === slides.length - 1) || 
                 (activeIndex === slides.length - 1 && i === 0);

              return (
                <div key={slide.id} className="flex-[0_0_100%] min-w-0">
                  <div className="relative h-[190px] sm:h-[250px] lg:h-[390px] w-full rounded-[22px] overflow-hidden bg-card border border-border/40">
                    {/* Background Image */}
                    {slide.image && isLoaded ? (
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-muted/40 text-muted-foreground">
                        {isProject ? (
                          <FolderKanban size={48} />
                        ) : (
                          <Trophy size={48} />
                        )}
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

                    {/* Header Badges */}
                    <div className="absolute top-3 left-3 right-3 lg:top-4 lg:left-4 lg:right-4 flex items-center justify-between z-10">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 lg:gap-1.5 lg:px-3 lg:py-1 rounded-full text-[8px] lg:text-[10px] font-extrabold uppercase tracking-wider text-white bg-blue-600/90 backdrop-blur-md border border-blue-400/30 shadow-lg">
                        {isProject ? (
                          <Star size={10} fill="currentColor" strokeWidth={0} />
                        ) : (
                          <Award size={10} />
                        )}
                        {slide.badge}
                      </span>

                      <span className="px-1.5 py-0.5 lg:px-2.5 lg:py-1 rounded-full text-[8px] lg:text-[10px] font-mono font-bold text-white/80 bg-black/40 backdrop-blur-md border border-white/10">
                        {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3.5 lg:p-6 z-10 text-left space-y-1.5 lg:space-y-2.5">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {slide.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.5 lg:px-2.5 lg:py-0.5 text-[8px] lg:text-[9px] font-bold font-mono uppercase tracking-wider text-blue-300 bg-blue-500/20 backdrop-blur-md rounded-md border border-blue-400/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h3 className="font-heading text-sm lg:text-xl font-extrabold text-white line-clamp-1 leading-snug">
                          {slide.title}
                        </h3>
                        <p className="text-[10px] lg:text-xs text-white/70 line-clamp-1 lg:line-clamp-2 leading-relaxed mt-0.5">
                          {slide.subtitle}
                        </p>
                      </div>

                      {/* Action CTA */}
                      <div className="pt-1 flex items-center justify-between">
                        {slide.link && slide.isExternalLink ? (
                          <a
                            href={slide.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 lg:gap-1.5 lg:px-4 lg:py-2 rounded-full text-[8px] lg:text-[10px] font-bold font-mono text-white bg-blue-600 hover:bg-blue-500 transition-all duration-300 shadow-md shadow-blue-500/20"
                          >
                            <span>Verify Credential</span>
                            <ExternalLink size={11} />
                          </a>
                        ) : (
                          <Link
                            to={slide.link || "/projects"}
                            className="inline-flex items-center gap-1 px-3 py-1.5 lg:gap-1.5 lg:px-4 lg:py-2 rounded-full text-[8px] lg:text-[10px] font-bold font-mono text-white bg-blue-600 hover:bg-blue-500 transition-all duration-300 shadow-md shadow-blue-500/20"
                          >
                            <span>Explore {isProject ? "Project" : "Achievement"}</span>
                            <ArrowRight size={11} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Prev / Next Buttons */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-blue-600 transition-all duration-300 opacity-80 sm:opacity-0 sm:group-hover/heroBanner:opacity-100 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-blue-600 transition-all duration-300 opacity-80 sm:opacity-0 sm:group-hover/heroBanner:opacity-100 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`carousel-dot ${activeIndex === i ? "active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
