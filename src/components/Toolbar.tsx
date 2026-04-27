import { Sun, Moon, VolumeX, Volume2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "./theme-provider";

interface ToolbarProps {
  className?: string;
  isPlaying: boolean;
  toggleAudio: () => void;
}

const USFlag = () => (
  <svg viewBox="0 0 512 512" className="w-5 h-5 rounded-full object-cover">
    <path fill="#bd3d44" d="M0 0h512v512H0z"/>
    <path stroke="#fff" strokeWidth="40" d="M0 59h512M0 138h512M0 217h512M0 296h512M0 375h512M0 454h512"/>
    <path fill="#192f5d" d="M0 0h256v256H0z"/>
    <circle cx="64" cy="64" r="20" fill="#fff"/>
    <circle cx="128" cy="64" r="20" fill="#fff"/>
    <circle cx="192" cy="64" r="20" fill="#fff"/>
    <circle cx="96" cy="128" r="20" fill="#fff"/>
    <circle cx="160" cy="128" r="20" fill="#fff"/>
    <circle cx="64" cy="192" r="20" fill="#fff"/>
    <circle cx="128" cy="192" r="20" fill="#fff"/>
    <circle cx="192" cy="192" r="20" fill="#fff"/>
  </svg>
);

const IDFlag = () => (
  <svg viewBox="0 0 512 512" className="w-5 h-5 rounded-full border border-border/20 object-cover">
    <path fill="#fff" d="M0 0h512v512H0z"/>
    <path fill="#e70011" d="M0 0h512v256H0z"/>
  </svg>
);

export const Toolbar = ({ className = "", isPlaying, toggleAudio }: ToolbarProps) => {
  const { i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <div className="flex p-0.5 rounded-full border border-border bg-card shadow-sm h-10 w-[96px] shrink-0">
        <button
          onClick={() => i18n.changeLanguage('en')}
          className={`h-full flex-1 flex items-center justify-center rounded-full transition-all ${
            i18n.language?.startsWith('en') ? 'bg-muted shadow-inner' : 'opacity-40 hover:opacity-100 hover:bg-muted/50'
          }`}
          title="English"
        >
          <USFlag />
        </button>
        <button
          onClick={() => i18n.changeLanguage('id')}
          className={`h-full flex-1 flex items-center justify-center rounded-full transition-all ${
            i18n.language?.startsWith('id') ? 'bg-muted shadow-inner' : 'opacity-40 hover:opacity-100 hover:bg-muted/50'
          }`}
          title="Bahasa Indonesia"
        >
          <IDFlag />
        </button>
      </div>

      {/* Audio Control */}
      <button 
        onClick={toggleAudio}
        className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full border border-border bg-card shadow-sm text-muted-foreground hover:bg-muted/50 transition-colors"
      >
        {isPlaying ? <Volume2 size={16} className="text-primary" /> : <VolumeX size={16} />}
      </button>

      {/* Theme Toggle (Simplified to Sun/Moon) */}
      <div className="flex p-0.5 rounded-full border border-border bg-card shadow-sm h-10 shrink-0">
        <button
          onClick={() => setTheme('light')}
          className={`h-full px-4 flex items-center justify-center rounded-full transition-all ${
            theme === 'light' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <Sun size={15} />
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`h-full px-4 flex items-center justify-center rounded-full transition-all ${
            theme === 'dark' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <Moon size={15} />
        </button>
      </div>

    </div>
  );
};
