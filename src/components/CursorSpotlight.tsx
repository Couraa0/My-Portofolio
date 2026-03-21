import { useEffect, useRef } from "react";

/**
 * CursorSpotlight — adds a subtle radial glow that follows the cursor.
 * Only active on desktop (pointer: fine).
 */
const CursorSpotlight = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;              // skip for touch devices

    const el = ref.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      el.style.setProperty("--cx", `${e.clientX}px`);
      el.style.setProperty("--cy", `${e.clientY}px`);
      el.style.opacity = "1";
    };

    const leave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-500"
      style={{
        opacity: 0,
        background:
          "radial-gradient(600px circle at var(--cx, 50%) var(--cy, 50%), hsl(250 84% 60% / 0.04), transparent 60%)",
      }}
    />
  );
};

export default CursorSpotlight;
