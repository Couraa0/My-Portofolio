import { Sun, Moon, VolumeX, Volume2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "./theme-provider";

interface ToolbarProps {
  className?: string;
  isPlaying: boolean;
  toggleAudio: () => void;
}

export const Toolbar = ({ className = "", isPlaying, toggleAudio }: ToolbarProps) => {
  const { i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <div className="flex p-0.5 rounded-full border border-border bg-card shadow-sm h-10 w-[84px] shrink-0">
        <button
          onClick={() => i18n.changeLanguage('en')}
          className={`h-full flex-1 flex items-center justify-center rounded-full transition-all text-xs font-bold ${
            i18n.language?.startsWith('en') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          US
        </button>
        <button
          onClick={() => i18n.changeLanguage('id')}
          className={`h-full flex-1 flex items-center justify-center rounded-full transition-all text-xs font-bold ${
            i18n.language?.startsWith('id') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          ID
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
