import React, { useState, useEffect, useRef } from "react";

interface LazyViewportSectionProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
  rootMargin?: string;
}

export default function LazyViewportSection({
  children,
  fallback,
  rootMargin = "200px", // triggers loading 200px before the element is in the viewport
}: LazyViewportSectionProps) {
  const [hasEntered, setHasEntered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback if IntersectionObserver is not supported
    if (!("IntersectionObserver" in window)) {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return <div ref={ref}>{hasEntered ? children : fallback}</div>;
}
