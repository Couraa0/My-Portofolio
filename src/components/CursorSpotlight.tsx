import { useEffect, useRef } from "react";

/**
 * CursorSpotlight — adds a subtle radial glow that follows the cursor,
 * replaces the default cursor with a custom blue shape,
 * and spawns theme-based emojis on click.
 * Only active on desktop (pointer: fine).
 */
const CursorSpotlight = () => {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return; // skip for touch devices

    // Hide default cursor globally but keep I-beam on inputs
    const style = document.createElement("style");
    style.innerHTML = `
      * { cursor: none !important; }
      input, textarea, [contenteditable="true"] { cursor: text !important; }
    `;
    document.head.appendChild(style);

    const spotlight = spotlightRef.current;
    const cursor = cursorRef.current;
    const svg = svgRef.current;
    if (!spotlight || !cursor || !svg) return;

    const move = (e: MouseEvent) => {
      const cx = e.clientX;
      const cy = e.clientY;
      
      // Spotlight
      spotlight.style.setProperty("--cx", `${cx}px`);
      spotlight.style.setProperty("--cy", `${cy}px`);
      spotlight.style.opacity = "1";
      
      // Cursor - offset by 4px so the tip (M4 4) aligns with the exact pointer position
      cursor.style.transform = `translate(${cx - 4}px, ${cy - 4}px)`;
      cursor.style.opacity = "1";
    };

    const leave = () => {
      spotlight.style.opacity = "0";
      cursor.style.opacity = "0";
    };

    const click = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tagName = target.tagName?.toLowerCase() || "";
      
      const isInteractive = 
        tagName === "a" || 
        tagName === "button" || 
        tagName === "input" ||
        tagName === "textarea" ||
        target.closest("a") || 
        target.closest("button") || 
        window.getComputedStyle(target).cursor === "pointer";

      if (isInteractive) return;

      const isDark = document.documentElement.classList.contains("dark");
      const emojisDark = ["🌙", "✨", "💫", "🌟", "🪐"];
      const emojisLight = ["☀️", "☁️", "🍃", "🌻", "🦋"];
      const emojis = isDark ? emojisDark : emojisLight;
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];

      const el = document.createElement("div");
      el.textContent = emoji;
      el.style.position = "fixed";
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      el.style.pointerEvents = "none";
      el.style.zIndex = "10000";
      el.style.fontSize = "28px";
      el.style.transition = "all 0.8s cubic-bezier(0.2, 1, 0.2, 1)";
      el.style.transform = "translate(-50%, -50%) scale(0.5)";
      el.style.opacity = "1";
      document.body.appendChild(el);

      // force reflow
      void el.offsetWidth;

      // randomize animation trajectory
      const angle = Math.random() * Math.PI * 2;
      const dist = 50 + Math.random() * 50;
      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist - 80;

      el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.5) rotate(${Math.random() * 60 - 30}deg)`;
      el.style.opacity = "0";

      setTimeout(() => el.remove(), 800);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tagName = target.tagName?.toLowerCase() || "";
      
      // Let native I-beam handle text inputs, hide our SVG cursor
      if (tagName === "input" || tagName === "textarea" || target.isContentEditable) {
        cursor.style.display = "none";
        return;
      } else {
        cursor.style.display = "block";
      }

      // Check if interactive to scale it up
      const isInteractive = 
        tagName === "a" || 
        tagName === "button" || 
        target.closest("a") || 
        target.closest("button") || 
        window.getComputedStyle(target).cursor === "pointer";
                            
      svg.style.transform = isInteractive ? `scale(1.2)` : `scale(1)`;
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", leave);
    window.addEventListener("mousedown", click);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", leave);
      window.removeEventListener("mousedown", click);
      style.remove();
    };
  }, []);

  return (
    <>
      <div
        ref={spotlightRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[9998] transition-opacity duration-500"
        style={{
          opacity: 0,
          background:
            "radial-gradient(600px circle at var(--cx, 50%) var(--cy, 50%), rgba(59, 130, 246, 0.05), transparent 60%)",
        }}
      />
      
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ opacity: 0, willChange: "transform" }}
      >
        <svg 
           ref={svgRef}
           className="transition-transform duration-200 origin-top-left"
           width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"
           style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
        >
          <path d="M4 4L20 10.5L13 13.5L10 21L4 4Z" fill="#3b82f6" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </div>
    </>
  );
};

export default CursorSpotlight;
