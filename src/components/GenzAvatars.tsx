/*  */import React from "react";

export interface AvatarProps {
  size?: number;
  className?: string;
}

// 1. Cyberpunk Hacker
export const CyberpunkHacker: React.FC<AvatarProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="cyber-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e1b4b" />
        <stop offset="100%" stopColor="#311042" />
      </linearGradient>
      <linearGradient id="cyber-visor" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00ffff" />
        <stop offset="50%" stopColor="#ff00ff" />
        <stop offset="100%" stopColor="#ffff00" />
      </linearGradient>
      <radialGradient id="cyber-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ff00ff" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#ff00ff" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Base Background Circle */}
    <circle cx="50" cy="50" r="48" fill="url(#cyber-bg)" stroke="#ff00ff" strokeWidth="2.5" />
    
    {/* Glow Behind Visor */}
    <circle cx="50" cy="45" r="25" fill="url(#cyber-glow)" />

    {/* Hood */}
    <path d="M22 80 C 22 45, 30 22, 50 22 C 70 22, 78 45, 78 80 C 78 85, 22 85, 22 80 Z" fill="#0f0f1b" stroke="#00ffff" strokeWidth="1.5" />
    
    {/* Inner shadow/face base */}
    <path d="M35 50 C 35 38, 65 38, 65 50 C 65 65, 35 65, 35 50 Z" fill="#1e1e2f" />
    
    {/* Cyber Visor */}
    <path d="M28 43 L72 43 C74 43, 75 45, 74 47 L68 59 C67 61, 65 62, 63 62 L37 62 C35 62, 33 61, 32 59 L26 47 C25 45, 26 43, 28 43 Z" fill="url(#cyber-visor)" />
    
    {/* Visor Reflection details */}
    <path d="M31 46 L69 46" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
    <path d="M35 50 L50 50" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6" />
    <circle cx="63" cy="53" r="2" fill="#ffffff" />
    
    {/* Headphones */}
    <path d="M20 52 C 20 48, 24 48, 24 52 L 24 64 C 24 68, 20 68, 20 64 Z" fill="#ff00ff" />
    <path d="M76 52 C 76 48, 80 48, 80 52 L 80 64 C 80 68, 76 68, 76 64 Z" fill="#ff00ff" />
    <path d="M22 52 C 22 30, 78 30, 78 52" stroke="#ff00ff" strokeWidth="3" fill="none" />
    
    {/* Cyber Neon Accents */}
    <circle cx="50" cy="15" r="2" fill="#00ffff" className="animate-pulse" />
    <line x1="50" y1="17" x2="50" y2="21" stroke="#00ffff" strokeWidth="1" />
  </svg>
);

// 2. Tech Geek / Coder
export const TechGeek: React.FC<AvatarProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="geek-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#022c22" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="matrix-lines" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Base Background Circle */}
    <circle cx="50" cy="50" r="48" fill="url(#geek-bg)" stroke="#10b981" strokeWidth="2.5" />
    
    {/* Matrix Rain effect */}
    <path d="M15 15 L15 65 M30 10 L30 50 M50 8 L50 45 M70 12 L70 55 M85 15 L85 70" stroke="url(#matrix-lines)" strokeWidth="1.5" strokeDasharray="4 4" />
    
    {/* Hoodie Jacket */}
    <path d="M20 85 C 20 50, 32 30, 50 30 C 68 30, 80 50, 80 85" fill="#1e293b" />
    
    {/* Face */}
    <path d="M38 52 C 38 42, 62 42, 62 52 C 62 65, 38 65, 38 52 Z" fill="#fcd34d" />
    
    {/* Coding Glasses */}
    <rect x="34" y="47" width="14" height="10" rx="3" fill="#000000" stroke="#10b981" strokeWidth="2" />
    <rect x="52" y="47" width="14" height="10" rx="3" fill="#000000" stroke="#10b981" strokeWidth="2" />
    <line x1="48" y1="52" x2="52" y2="52" stroke="#10b981" strokeWidth="2" />
    
    {/* Glowing terminal screens in glasses */}
    <path d="M36 50 L40 50 M36 53 L44 53" stroke="#10b981" strokeWidth="1.5" />
    <path d="M54 50 L58 50 M54 53 L62 53" stroke="#10b981" strokeWidth="1.5" />
    
    {/* Beanie / Cap */}
    <path d="M33 42 C 33 28, 67 28, 67 42 Z" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
    <rect x="31" y="38" width="38" height="6" rx="2" fill="#1e293b" />
  </svg>
);

// 3. Lo-fi Chill
export const LofiChill: React.FC<AvatarProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="lofi-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="100%" stopColor="#f472b6" />
      </linearGradient>
    </defs>
    {/* Base Background Circle */}
    <circle cx="50" cy="50" r="48" fill="url(#lofi-bg)" stroke="#db2777" strokeWidth="2" />
    
    {/* Cozy Scarf/Jacket */}
    <path d="M22 80 C 22 55, 30 45, 50 45 C 70 45, 78 55, 78 80" fill="#475569" />
    <path d="M26 78 C 35 70, 65 70, 74 78" stroke="#f43f5e" strokeWidth="8" strokeLinecap="round" />
    
    {/* Face */}
    <path d="M35 50 C 35 35, 65 35, 65 50 C 65 68, 35 68, 35 50 Z" fill="#ffedd5" />
    
    {/* Beanie Hat */}
    <path d="M32 38 C 32 20, 68 20, 68 38 Z" fill="#ea580c" />
    <rect x="28" y="34" width="44" height="7" rx="3" fill="#d97706" />
    <circle cx="50" cy="18" r="4" fill="#ffffff" />
    
    {/* Cute Glasses */}
    <circle cx="41" cy="48" r="8" stroke="#1e293b" strokeWidth="2" fill="none" />
    <circle cx="59" cy="48" r="8" stroke="#1e293b" strokeWidth="2" fill="none" />
    <line x1="49" y1="48" x2="51" y2="48" stroke="#1e293b" strokeWidth="2" />
    
    {/* Blush & Smile */}
    <circle cx="36" cy="54" r="2.5" fill="#f43f5e" opacity="0.5" />
    <circle cx="64" cy="54" r="2.5" fill="#f43f5e" opacity="0.5" />
    <path d="M47 56 Q50 59 53 56" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
  </svg>
);

// 4. Vaporwave Dreamer
export const VaporwaveDreamer: React.FC<AvatarProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="vapor-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="50%" stopColor="#d946ef" />
        <stop offset="100%" stopColor="#ff007f" />
      </linearGradient>
      <linearGradient id="sunset-visor" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="50%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    {/* Base Background Circle */}
    <circle cx="50" cy="50" r="48" fill="url(#vapor-bg)" stroke="#06b6d4" strokeWidth="2.5" />
    
    {/* Sun Grid Lines in background */}
    <line x1="10" y1="50" x2="90" y2="50" stroke="#000000" strokeWidth="0.5" opacity="0.3" />
    <line x1="10" y1="62" x2="90" y2="62" stroke="#000000" strokeWidth="0.8" opacity="0.3" />
    <line x1="10" y1="74" x2="90" y2="74" stroke="#000000" strokeWidth="1.2" opacity="0.3" />
    <line x1="10" y1="86" x2="90" y2="86" stroke="#000000" strokeWidth="1.5" opacity="0.3" />
    
    {/* Synth Sunset (Half Circle) */}
    <path d="M30 50 A 20 20 0 0 1 70 50 Z" fill="#f59e0b" opacity="0.8" />
    <line x1="30" y1="46" x2="70" y2="46" stroke="#d946ef" strokeWidth="2" />
    <line x1="34" y1="42" x2="66" y2="42" stroke="#d946ef" strokeWidth="2" />
    
    {/* Palm tree silhouette on side */}
    <path d="M18 80 Q 22 62, 28 50" stroke="#000000" strokeWidth="2" fill="none" opacity="0.4" />
    <path d="M28 50 Q 20 48, 16 52 M28 50 Q 22 43, 20 40 M28 50 Q 32 42, 36 40 M28 50 Q 36 48, 38 54" stroke="#000000" strokeWidth="1.5" fill="none" opacity="0.4" />

    {/* Cool Retro Visor Glasses */}
    <path d="M24 45 L76 45 L70 59 L30 59 Z" fill="url(#sunset-visor)" stroke="#ffffff" strokeWidth="1.5" />
    <path d="M28 48 L68 48" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.7" />

    {/* Hair & Bandana */}
    <path d="M20 40 Q 50 18, 80 40" stroke="#f472b6" strokeWidth="4" fill="none" />
    <path d="M22 36 L78 36" stroke="#06b6d4" strokeWidth="3" />
  </svg>
);

// 5. Skater Kid
export const SkaterKid: React.FC<AvatarProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="skate-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
    </defs>
    {/* Base Background Circle */}
    <circle cx="50" cy="50" r="48" fill="url(#skate-bg)" stroke="#ffffff" strokeWidth="2" />
    
    {/* Body / Shirt */}
    <path d="M24 82 C 24 60, 32 50, 50 50 C 68 50, 76 60, 76 82" fill="#1e1e2f" />
    <circle cx="50" cy="60" r="8" fill="#ffffff" opacity="0.1" /> {/* Shirt design */}
    
    {/* Face */}
    <path d="M36 48 C 36 36, 64 36, 64 48 C 64 64, 36 64, 36 48 Z" fill="#ffedd5" />
    
    {/* Band-aid on cheek */}
    <line x1="38" y1="56" x2="44" y2="52" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
    
    {/* Cool eyes & expression */}
    <circle cx="43" cy="46" r="2.5" fill="#1e293b" />
    <circle cx="57" cy="46" r="2.5" fill="#1e293b" />
    <path d="M40 40 Q43 38 46 40" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M54 40 Q57 38 60 40" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    
    {/* Smirk */}
    <path d="M48 54 Q53 56 55 52" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* Sideways Skate Cap */}
    <path d="M30 38 C 30 22, 66 22, 68 38 Z" fill="#ef4444" />
    <path d="M68 32 C 72 32, 86 38, 84 42 C 82 45, 68 38, 68 32 Z" fill="#b91c1c" />
    <circle cx="49" cy="22" r="2" fill="#ffffff" />
  </svg>
);

// 6. Y2K Pop
export const Y2KPop: React.FC<AvatarProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="y2k-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#f43f5e" />
      </linearGradient>
    </defs>
    {/* Base Background Circle */}
    <circle cx="50" cy="50" r="48" fill="url(#y2k-bg)" stroke="#ec4899" strokeWidth="2.5" />
    
    {/* Floating Stars */}
    <path d="M22 24 L24 28 L28 28 L25 31 L26 35 L22 32 L18 35 L19 31 L16 28 L20 28 Z" fill="#ffffff" opacity="0.6" />
    <path d="M78 22 L80 25 L83 25 L81 27 L82 30 L78 28 L74 30 L75 27 L73 25 L76 25 Z" fill="#00ffff" opacity="0.6" />

    {/* Long Y2K Cyber Hair */}
    <path d="M25 80 Q 22 40, 30 28 Q 50 16, 70 28 Q 78 40, 75 80" fill="#2563eb" />
    
    {/* Face */}
    <path d="M36 50 C 36 38, 64 38, 64 50 C 64 64, 36 64, 36 50 Z" fill="#fed7aa" />
    
    {/* Futuristic Star clips in hair */}
    <path d="M30 32 L32 35 L35 35 L33 37 L34 40 L30 38 L26 40 L27 37 L25 35 L28 35 Z" fill="#facc15" />
    <path d="M70 32 L72 35 L75 35 L73 37 L74 40 L70 38 L66 40 L67 37 L65 35 L68 35 Z" fill="#facc15" />

    {/* Frameless futuristic pink sunglasses */}
    <path d="M28 46 Q 50 38, 72 46 C 74 54, 60 56, 50 51 C 40 56, 26 54, 28 46 Z" fill="#f43f5e" stroke="#ffffff" strokeWidth="1" opacity="0.9" />
    {/* Silver bridge */}
    <path d="M47 47 Q 50 45, 53 47" stroke="#ffffff" strokeWidth="1.5" fill="none" />

    {/* Smile */}
    <path d="M48 57 Q50 59 52 57" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 7. Retro Pixel
export const RetroPixel: React.FC<AvatarProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="pixel-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
    </defs>
    {/* Base Background Circle */}
    <circle cx="50" cy="50" r="48" fill="url(#pixel-bg)" stroke="#facc15" strokeWidth="2.5" />
    
    {/* Pixel grid pattern in BG */}
    <rect x="25" y="25" width="6" height="6" fill="#facc15" opacity="0.15" />
    <rect x="65" y="15" width="8" height="8" fill="#facc15" opacity="0.1" />
    <rect x="15" y="55" width="8" height="8" fill="#facc15" opacity="0.1" />
    <rect x="70" y="65" width="6" height="6" fill="#facc15" opacity="0.15" />

    {/* Pixel Art Head/Face */}
    {/* Hair */}
    <path d="M30 26 H70 V34 H62 V38 H38 V34 H30 Z" fill="#9333ea" />
    <path d="M26 34 H30 V50 H26 Z M70 34 H74 V50 H70 Z" fill="#9333ea" />
    
    {/* Face */}
    <rect x="30" y="38" width="40" height="24" fill="#ffedd5" />
    
    {/* Retro 3D Glasses (Pixel Style) */}
    {/* Left Cyan Lens */}
    <rect x="34" y="44" width="12" height="8" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.5" />
    {/* Right Red Lens */}
    <rect x="54" y="44" width="12" height="8" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
    {/* Connection */}
    <rect x="46" y="46" width="8" height="3" fill="#ffffff" />

    {/* Pixel Smile */}
    <path d="M46 56 H54 V58 H46 Z" fill="#1e293b" />
  </svg>
);

// 8. Astro Explorer
export const AstroExplorer: React.FC<AvatarProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="astro-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e1e38" />
        <stop offset="100%" stopColor="#09090e" />
      </linearGradient>
      <linearGradient id="space-visor" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="30%" stopColor="#3b82f6" />
        <stop offset="70%" stopColor="#d946ef" />
        <stop offset="100%" stopColor="#ff007f" />
      </linearGradient>
    </defs>
    {/* Base Background Circle */}
    <circle cx="50" cy="50" r="48" fill="url(#astro-bg)" stroke="#3b82f6" strokeWidth="2.5" />
    
    {/* Stars */}
    <circle cx="28" cy="22" r="1" fill="#ffffff" opacity="0.8" />
    <circle cx="76" cy="26" r="1.5" fill="#ffffff" className="animate-pulse" />
    <circle cx="34" cy="74" r="1" fill="#ffffff" opacity="0.5" />
    <circle cx="68" cy="18" r="0.8" fill="#ffffff" opacity="0.6" />

    {/* Space Suit Collar */}
    <path d="M25 75 Q 50 65, 75 75 L 75 88 H 25 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
    <rect x="42" y="76" width="16" height="5" rx="1" fill="#ef4444" /> {/* Badge */}

    {/* Astronaut Helmet */}
    <circle cx="50" cy="46" r="28" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
    
    {/* Outer visor glow */}
    <circle cx="50" cy="46" r="22" fill="url(#space-visor)" />
    
    {/* Reflection Highlight */}
    <path d="M34 38 C 34 30, 48 28, 54 30" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />
    <circle cx="62" cy="54" r="2.5" fill="#ffffff" opacity="0.7" />
  </svg>
);

// 9. King Rakha
export const KingRakha: React.FC<AvatarProps> = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      {/* Background deep dark */}
      <linearGradient id="kr-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a0808" />
        <stop offset="100%" stopColor="#0a0404" />
      </linearGradient>
      {/* Gold crown */}
      <linearGradient id="kr-gold" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFE566" />
        <stop offset="40%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#C8860A" />
      </linearGradient>
      <linearGradient id="kr-gold-shine" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFBE0" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
      </linearGradient>
      {/* Robe — merah keemasan */}
      <linearGradient id="kr-robe" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#B91010" />
        <stop offset="50%" stopColor="#8B0A0A" />
        <stop offset="100%" stopColor="#5a0606" />
      </linearGradient>
      {/* Robe shadow */}
      <linearGradient id="kr-robe-dark" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3a0404" />
        <stop offset="100%" stopColor="#7a0808" />
      </linearGradient>
      {/* Robe highlight gold sheen */}
      <linearGradient id="kr-robe-hi" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
      </linearGradient>
      {/* Sword blade */}
      <linearGradient id="kr-sword" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#B0B8C8" />
        <stop offset="35%" stopColor="#E8ECF4" />
        <stop offset="65%" stopColor="#C8D0DC" />
        <stop offset="100%" stopColor="#8090A0" />
      </linearGradient>
      {/* Sword handle */}
      <linearGradient id="kr-handle" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8B4500" />
        <stop offset="100%" stopColor="#5a2800" />
      </linearGradient>
      {/* Guard gold */}
      <linearGradient id="kr-guard" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFE566" />
        <stop offset="100%" stopColor="#C8860A" />
      </linearGradient>
      {/* Skin — fair */}
      <linearGradient id="kr-skin" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FDEEE0" />
        <stop offset="100%" stopColor="#F5D5BB" />
      </linearGradient>
      {/* Fur collar */}
      <linearGradient id="kr-fur" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E8E0D8" />
      </linearGradient>
      {/* Gems */}
      <radialGradient id="kr-ruby" cx="35%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#FF7070" />
        <stop offset="100%" stopColor="#9B0000" />
      </radialGradient>
      <radialGradient id="kr-sapphire" cx="35%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#90C8FF" />
        <stop offset="100%" stopColor="#0040B0" />
      </radialGradient>
      {/* Halo */}
      <radialGradient id="kr-halo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FF4400" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* ── Background ── */}
    <circle cx="50" cy="50" r="48" fill="url(#kr-bg)" stroke="#FFD700" strokeWidth="2" />
    <circle cx="50" cy="50" r="36" fill="url(#kr-halo)" />

    {/* ══════════════════════════════
        DUA PEDANG SILANG — di belakang badan
        Hanya ujung tajam yang muncul di atas bahu
    ══════════════════════════════ */}

    {/* PEDANG KIRI — ujung keluar pojok kiri atas */}
    {/* Blade body (sebagian besar tersembunyi di balik jubah) */}
    <line x1="12" y1="48" x2="52" y2="88" stroke="url(#kr-sword)" strokeWidth="3.5" strokeLinecap="butt" />
    <line x1="13" y1="49" x2="32" y2="68" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.45" strokeLinecap="butt" />
    {/* Ujung tajam kiri — segitiga lancip */}
    <polygon points="12,48 17,54 9,53" fill="#E8EEF8" />
    <polygon points="12,48 17,54 9,53" fill="url(#kr-sword)" opacity="0.6" />
    <line x1="12" y1="48" x2="13.5" y2="53.5" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.7" strokeLinecap="round" />

    {/* PEDANG KANAN — ujung keluar pojok kanan atas */}
    <line x1="88" y1="48" x2="48" y2="88" stroke="url(#kr-sword)" strokeWidth="3.5" strokeLinecap="butt" />
    <line x1="87" y1="49" x2="68" y2="68" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.45" strokeLinecap="butt" />
    {/* Ujung tajam kanan */}
    <polygon points="88,48 83,54 91,53" fill="#E8EEF8" />
    <polygon points="88,48 83,54 91,53" fill="url(#kr-sword)" opacity="0.6" />
    <line x1="88" y1="48" x2="86.5" y2="53.5" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.7" strokeLinecap="round" />

    {/* ══════════════════════════════
        BODY / JUBAH MERAH KEEMASAN (di atas pedang)
    ══════════════════════════════ */}
    {/* Main robe */}
    <path d="M15 100 C 15 72, 24 60, 36 56 L 50 52 L 64 56 C 76 60, 85 72, 85 100 Z" fill="url(#kr-robe)" />
    {/* Gold sheen overlay */}
    <path d="M15 100 C 15 72, 24 60, 36 56 L 50 52 L 64 56 C 76 60, 85 72, 85 100 Z" fill="url(#kr-robe-hi)" />
    {/* Shadow left panel */}
    <path d="M15 100 C 15 78, 22 64, 32 58 L 50 52 C 38 56, 26 70, 20 100 Z" fill="url(#kr-robe-dark)" opacity="0.5" />
    {/* Gold trim edges */}
    <path d="M15 100 C 15 72, 24 60, 36 56 L 50 52" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeOpacity="0.85" />
    <path d="M85 100 C 85 72, 76 60, 64 56 L 50 52" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeOpacity="0.85" />
    {/* Gold horizontal band */}
    <path d="M22 82 Q50 78 78 82" fill="none" stroke="#FFD700" strokeWidth="1" strokeOpacity="0.5" />
    {/* Center gold stripe */}
    <line x1="50" y1="55" x2="50" y2="100" stroke="#FFD700" strokeWidth="1.2" strokeOpacity="0.45" strokeDasharray="3 4" />
    {/* Gold diamond */}
    <path d="M42 72 L50 68 L58 72 L50 76 Z" fill="none" stroke="#FFD700" strokeWidth="0.8" strokeOpacity="0.5" />

    {/* Ermine fur collar */}
    <path d="M32 62 Q41 57, 50 56 Q59 57, 68 62 Q72 66, 70 70 Q60 66, 50 65 Q40 66, 30 70 Q28 66, 32 62 Z" fill="url(#kr-fur)" />
    <ellipse cx="37" cy="66" rx="1.5" ry="2" fill="#1a1a1a" opacity="0.7" />
    <ellipse cx="44" cy="64" rx="1.5" ry="2" fill="#1a1a1a" opacity="0.7" />
    <ellipse cx="50" cy="63.5" rx="1.5" ry="2" fill="#1a1a1a" opacity="0.7" />
    <ellipse cx="56" cy="64" rx="1.5" ry="2" fill="#1a1a1a" opacity="0.7" />
    <ellipse cx="63" cy="66" rx="1.5" ry="2" fill="#1a1a1a" opacity="0.7" />

    {/* Royal brooch */}
    <circle cx="50" cy="70" r="5.5" fill="url(#kr-gold)" stroke="#FFF5A0" strokeWidth="0.8" />
    <circle cx="50" cy="70" r="3" fill="url(#kr-ruby)" />
    <circle cx="49" cy="69" r="0.9" fill="#ffffff" opacity="0.7" />

    {/* ── Neck ── */}
    <rect x="44" y="56" width="12" height="9" rx="3" fill="url(#kr-skin)" />

    {/* ══════════════════════════════
        FACE
    ══════════════════════════════ */}
    <ellipse cx="50" cy="46" rx="17" ry="18" fill="url(#kr-skin)" />
    <ellipse cx="38" cy="51" rx="4" ry="2.5" fill="#F9C0A8" opacity="0.35" />
    <ellipse cx="62" cy="51" rx="4" ry="2.5" fill="#F9C0A8" opacity="0.35" />
    {/* Eyebrows */}
    <path d="M38 39 Q42 37.5 46 39" stroke="#6B4020" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M54 39 Q58 37.5 62 39" stroke="#6B4020" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    {/* Eyes */}
    <ellipse cx="42" cy="44" rx="3.8" ry="4" fill="#1A1A2E" />
    <ellipse cx="58" cy="44" rx="3.8" ry="4" fill="#1A1A2E" />
    <ellipse cx="42" cy="44.5" rx="2.2" ry="2.4" fill="#3B1F08" />
    <ellipse cx="58" cy="44.5" rx="2.2" ry="2.4" fill="#3B1F08" />
    <circle cx="42" cy="44.5" r="1.2" fill="#0a0a0a" />
    <circle cx="58" cy="44.5" r="1.2" fill="#0a0a0a" />
    <circle cx="43.2" cy="43.2" r="1" fill="#ffffff" opacity="0.95" />
    <circle cx="59.2" cy="43.2" r="1" fill="#ffffff" opacity="0.95" />
    <path d="M38.5 47 Q42 48.5 45.5 47" stroke="#C8987A" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    <path d="M54.5 47 Q58 48.5 61.5 47" stroke="#C8987A" strokeWidth="0.6" fill="none" strokeLinecap="round" />
    {/* Nose */}
    <path d="M48.5 49 Q50 51.5 51.5 49" stroke="#D0967A" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    <circle cx="47" cy="50" r="1" fill="#D8A882" opacity="0.5" />
    <circle cx="53" cy="50" r="1" fill="#D8A882" opacity="0.5" />
    {/* Smile */}
    <path d="M44 54.5 Q50 58.5 56 54.5" stroke="#C07050" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    <path d="M46.5 55.5 Q50 57.5 53.5 55.5" fill="#FFFFFF" opacity="0.75" />

    {/* ══════════════════════════════
        CROWN
    ══════════════════════════════ */}
    <rect x="30" y="28" width="40" height="9" rx="2.5" fill="url(#kr-gold)" />
    <rect x="30" y="28" width="40" height="3.5" rx="2.5" fill="url(#kr-gold-shine)" opacity="0.65" />
    {/* Spires */}
    <polygon points="30,28 34,15 38,28" fill="url(#kr-gold)" />
    <polygon points="30,28 34,15 38,28" fill="url(#kr-gold-shine)" opacity="0.45" />
    <polygon points="37,28 41,19 45,28" fill="url(#kr-gold)" />
    <polygon points="37,28 41,19 45,28" fill="url(#kr-gold-shine)" opacity="0.4" />
    <polygon points="44,28 50,8 56,28" fill="url(#kr-gold)" />
    <polygon points="44,28 50,8 56,28" fill="url(#kr-gold-shine)" opacity="0.5" />
    <polygon points="55,28 59,19 63,28" fill="url(#kr-gold)" />
    <polygon points="55,28 59,19 63,28" fill="url(#kr-gold-shine)" opacity="0.4" />
    <polygon points="62,28 66,15 70,28" fill="url(#kr-gold)" />
    <polygon points="62,28 66,15 70,28" fill="url(#kr-gold-shine)" opacity="0.45" />
    {/* Crown outline */}
    <path d="M30 28 L34 15 L38 28 L41 19 L45 28 L50 8 L56 28 L59 19 L63 28 L66 15 L70 28" fill="none" stroke="#C8860A" strokeWidth="0.8" strokeLinejoin="round" />
    {/* Gems */}
    <circle cx="50" cy="20" r="3.8" fill="url(#kr-ruby)" stroke="#FFD700" strokeWidth="0.8" />
    <circle cx="48.8" cy="18.8" r="1.1" fill="#ffffff" opacity="0.65" />
    <circle cx="34" cy="20" r="2.8" fill="url(#kr-sapphire)" stroke="#FFD700" strokeWidth="0.7" />
    <circle cx="33" cy="19" r="0.85" fill="#ffffff" opacity="0.65" />
    <circle cx="66" cy="20" r="2.8" fill="url(#kr-sapphire)" stroke="#FFD700" strokeWidth="0.7" />
    <circle cx="65" cy="19" r="0.85" fill="#ffffff" opacity="0.65" />
    <circle cx="41" cy="33" r="1.8" fill="url(#kr-ruby)" stroke="#FFD700" strokeWidth="0.5" />
    <circle cx="59" cy="33" r="1.8" fill="url(#kr-ruby)" stroke="#FFD700" strokeWidth="0.5" />
    <rect x="48.2" y="30.5" width="3.6" height="3.6" rx="0.4" fill="#D0EEFF" stroke="#FFD700" strokeWidth="0.5" transform="rotate(45 50 32.3)" />
    {/* Sparkle */}
    <circle cx="50" cy="5.5" r="1.4" fill="#FFFBE0" opacity="0.95" />
    <path d="M50 2.5 L50 4.5 M48 3.5 L52 3.5" stroke="#FFE566" strokeWidth="0.9" strokeLinecap="round" />
    <circle cx="34" cy="13" r="0.9" fill="#FFF5A0" opacity="0.8" />
    <circle cx="66" cy="13" r="0.9" fill="#FFF5A0" opacity="0.8" />
  </svg>
);

// Map components for easy rendering
export const AVATAR_MAP: Record<string, React.FC<AvatarProps>> = {
  "avatar-1": CyberpunkHacker,
  "avatar-2": TechGeek,
  "avatar-3": LofiChill,
  "avatar-4": VaporwaveDreamer,
  "avatar-5": SkaterKid,
  "avatar-6": Y2KPop,
  "avatar-7": RetroPixel,
  "avatar-8": AstroExplorer,
  "avatar-rakha": KingRakha,
};

export const AVATAR_LIST = [
  { id: "avatar-1", name: "Cyber Hack" },
  { id: "avatar-2", name: "Tech Coder" },
  { id: "avatar-3", name: "Lo-Fi Cozy" },
  { id: "avatar-4", name: "Vapor Dream" },
  { id: "avatar-5", name: "Skate Kid" },
  { id: "avatar-6", name: "Y2K Pop" },
  { id: "avatar-7", name: "Pixel Retro" },
  { id: "avatar-8", name: "Astro Space" },
];

/**
 * Parses the raw name string that might contain avatar encoded tag.
 * E.g., "Fatur::avatar:avatar-2" -> { name: "Fatur", avatarId: "avatar-2" }
 */
export function parseNameAndAvatar(rawName: string, messageId?: string): { name: string; avatarId: string } {
  if (!rawName) return { name: "Anonymous", avatarId: "avatar-1" };
  
  const separator = "::avatar:";
  const index = rawName.indexOf(separator);
  
  if (index !== -1) {
    const name = rawName.substring(0, index);
    const avatarId = rawName.substring(index + separator.length);
    // Validate if the parsed avatarId exists in our list, fallback if invalid
    if (AVATAR_MAP[avatarId]) {
      return { name, avatarId };
    }
    return { name, avatarId: "avatar-1" };
  }
  
  // Fallback for previous guestbook messages: compute deterministic avatar based on messageId (if present) or name
  const avatarId = getDeterministicAvatarId(messageId || rawName);
  return { name: rawName, avatarId };
}

/**
 * Generates a deterministic avatar ID based on string hashing (for old messages).
 */
export function getDeterministicAvatarId(name: string): string {
  let hash = 0;
  const str = name || "Anonymous";
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_LIST.length;
  return AVATAR_LIST[index].id;
}

/**
 * Dynamic avatar renderer component.
 */
export const GenzAvatar: React.FC<{ avatarId: string; name?: string; size?: number; className?: string }> = ({
  avatarId,
  name,
  size = 48,
  className = "",
}) => {
  let id = avatarId;
  if (!id && name) {
    id = getDeterministicAvatarId(name);
  }
  
  const AvatarComponent = AVATAR_MAP[id] || CyberpunkHacker;
  return <AvatarComponent size={size} className={className} />;
};
