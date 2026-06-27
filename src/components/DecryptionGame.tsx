import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Terminal, ShieldAlert, CheckCircle, RefreshCw, Volume2, VolumeX, ShieldCheck, HelpCircle } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { toast } from "sonner";
import { useCVLink } from "@/hooks/useCVLink";

// Web Audio API Sound Synthesizer
class SoundSynth {
  private ctx: AudioContext | null = null;
  public muted: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playClick() {
    if (this.muted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (e) {
      console.warn("Audio error", e);
    }
  }

  playHover() {
    if (this.muted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(1500, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.005, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.01);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.01);
    } catch (e) {
      // Audio failed
    }
  }

  playDudRemoved() {
    if (this.muted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(600, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {
      // Audio failed
    }
  }

  playTriesReset() {
    if (this.muted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.setValueAtTime(900, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) {
      // Audio failed
    }
  }

  playError() {
    if (this.muted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(110, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (e) {
      // Audio failed
    }
  }

  playSuccess() {
    if (this.muted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 chord

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.04, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.3);
      });
    } catch (e) {
      // Audio failed
    }
  }
}

const synth = new SoundSynth();

// Word List for Game (length = 7)
const WORD_LIST = [
  "PROJECT", "CONSOLE", "REACTOR", "ROUTING", "COMPILE", "NETWORK",
  "STORAGE", "REPORTS", "RESTORE", "BACKUPS", "GATEWAY", "DOCKERS"
];

const SYMBOLS = "!@#$%&*()_+-=/?^~|;:.#";

interface GridChar {
  char: string;
  type: "noise" | "word" | "bracket";
  id: string; // Token ID
  value: string; // Full word or bracket string
}

export default function DecryptionGame() {
  const { t, i18n } = useTranslation();
  const { cvLink } = useCVLink();
  const isIndonesian = i18n.language?.startsWith('id');
  const [muted, setMuted] = useState(false);
  const [words, setWords] = useState<string[]>([]);
  const [secretWord, setSecretWord] = useState("");
  const [tries, setTries] = useState(4);
  const [logs, setLogs] = useState<string[]>([]);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const [gridChars, setGridChars] = useState<GridChar[]>([]);
  const [hoveredTokenId, setHoveredTokenId] = useState<string | null>(null);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const [usedBracketIds, setUsedBracketIds] = useState<Set<string>>(new Set());
  const [removedWordIds, setRemovedWordIds] = useState<Set<string>>(new Set());
  const [showHelp, setShowHelp] = useState(false);

  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    synth.muted = muted;
  }, [muted]);

  // Scroll logs internally to bottom
  useEffect(() => {
    const container = logContainerRef.current;
    if (container) {
      const scrollToBottom = () => {
        container.scrollTop = container.scrollHeight;
      };

      scrollToBottom();

      // Defer scrolling to handle layout shifts and framer-motion animations
      const timer1 = setTimeout(scrollToBottom, 50);
      const timer2 = setTimeout(scrollToBottom, 150);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [logs]);

  // Initial Game Setup
  const initGame = () => {
    // Select 8 random words
    const shuffled = [...WORD_LIST].sort(() => 0.5 - Math.random());
    const selectedWords = shuffled.slice(0, 8);
    const chosenSecret = selectedWords[Math.floor(Math.random() * selectedWords.length)];

    // Log for developer debugging / bypass cheat
    console.log("[DEBUG] Decryptor Secret Word:", chosenSecret);

    setWords(selectedWords);
    setSecretWord(chosenSecret);
    setTries(4);
    setGameState("playing");
    setUsedBracketIds(new Set());
    setRemovedWordIds(new Set());
    setLogs([
      "ROBCO INDUSTRIES (TM) TERMLINK SYSTEM V2.4",
      "SYSSTATUS: ONLINE [MUTED=OFF]",
      "SECUR_LEVEL: OMNI_BLACK_LOCK",
      "---------------------------------------------",
      "WARNING: ACCESS RESTRICTED TO KEY PERSONNEL.",
      "UPLINK REQUIRED. GUESS PASSWORD OR RETRIEVE KEY.",
      "---------------------------------------------"
    ]);

    // Construct the Grid (384 chars total = 32 lines of 12 chars each)
    const totalSize = 384;
    const grid: (GridChar | null)[] = Array(totalSize).fill(null);

    // Place words
    selectedWords.forEach((word) => {
      let placed = false;
      const wordId = `word-${word}`;

      while (!placed) {
        const startIdx = Math.floor(Math.random() * (totalSize - 10));

        // Check fit: no overlapping, no line-wrapping inside the word
        let fits = true;
        for (let j = 0; j < word.length; j++) {
          const idx = startIdx + j;
          // Check overlapping
          if (grid[idx] !== null) fits = false;
          // Avoid wrapping across columns (e.g. crossing index boundary multiples of 12)
          const curLine = Math.floor(idx / 12);
          const startLine = Math.floor(startIdx / 12);
          if (curLine !== startLine) fits = false;
        }

        if (fits) {
          for (let j = 0; j < word.length; j++) {
            grid[startIdx + j] = {
              char: word[j],
              type: "word",
              id: wordId,
              value: word
            };
          }
          placed = true;
        }
      }
    });

    // Place Brackets (e.g., [..], (..), <..>, {..} with length 2-5)
    const bracketTypes = [
      ["[", "]"],
      ["(", ")"],
      ["<", ">"],
      ["{", "}"]
    ];

    const bracketCount = 6;
    for (let b = 0; b < bracketCount; b++) {
      let placed = false;
      const bracketId = `bracket-${b}`;
      const brPair = bracketTypes[Math.floor(Math.random() * bracketTypes.length)];
      const bracketLen = Math.floor(Math.random() * 3) + 3; // Length 3, 4, or 5

      while (!placed) {
        const startIdx = Math.floor(Math.random() * (totalSize - 10));
        let fits = true;

        for (let j = 0; j < bracketLen; j++) {
          const idx = startIdx + j;
          if (grid[idx] !== null) fits = false;
          const curLine = Math.floor(idx / 12);
          const startLine = Math.floor(startIdx / 12);
          if (curLine !== startLine) fits = false;
        }

        if (fits) {
          // Construct bracket string
          let val = brPair[0];
          for (let j = 1; j < bracketLen - 1; j++) {
            val += SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
          }
          val += brPair[1];

          for (let j = 0; j < bracketLen; j++) {
            grid[startIdx + j] = {
              char: val[j],
              type: "bracket",
              id: bracketId,
              value: val
            };
          }
          placed = true;
        }
      }
    }

    // Fill remaining nulls with noise characters
    const finalGrid: GridChar[] = grid.map((cell, idx) => {
      if (cell !== null) return cell;
      const rSym = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      return {
        char: rSym,
        type: "noise",
        id: `noise-${idx}`,
        value: rSym
      };
    });

    setGridChars(finalGrid);
  };

  useEffect(() => {
    initGame();
  }, []);

  // Handle Token Click
  const handleTokenClick = (item: GridChar) => {
    if (gameState !== "playing") return;

    if (item.type === "word") {
      // If word is removed, ignore
      if (removedWordIds.has(item.id)) return;

      synth.playClick();
      const guessedWord = item.value;

      // Calculate Likeness
      let likeness = 0;
      for (let i = 0; i < guessedWord.length; i++) {
        if (guessedWord[i] === secretWord[i]) {
          likeness++;
        }
      }

      setLogs((prev) => [
        ...prev,
        `> Guess: ${guessedWord}`,
        `> Access Denied.`
      ]);

      if (guessedWord === secretWord) {
        synth.playSuccess();
        setGameState("won");
        toast.success(
          isIndonesian ? "Akses Diberikan!" : "Access Granted!",
          {
            description: isIndonesian
              ? "Uplink berhasil diamankan."
              : "Uplink successfully secured.",
          }
        );
        setLogs((prev) => [
          ...prev,
          `> Access Granted. Code: [RAKHA_SEC_1337]`,
          `> Uplink successfully established.`,
          `> Security nodes fully bypassed.`,
          `> SECRET DETECTED: Tap below to access the resume.`
        ]);
      } else {
        const remainingTries = tries - 1;
        setTries(remainingTries);
        synth.playError();

        toast.error(
          isIndonesian
            ? `Akses Ditolak! Kesamaan: ${likeness}/${secretWord.length}`
            : `Access Denied! Likeness: ${likeness}/${secretWord.length}`,
          {
            description: isIndonesian
              ? `Tersisa ${remainingTries} kesempatan menebak.`
              : `${remainingTries} attempts remaining.`,
          }
        );

        setLogs((prev) => [
          ...prev,
          `> Likeness Score: ${likeness}/${secretWord.length}`,
          `> Attempts remaining: ${remainingTries}`
        ]);

        if (remainingTries <= 0) {
          setGameState("lost");
          toast.error(
            isIndonesian ? "Sistem Terkunci!" : "Console Locked!",
            {
              description: isIndonesian
                ? "Reboot sistem diperlukan."
                : "System reboot required.",
            }
          );
          setLogs((prev) => [
            ...prev,
            `> ERROR: Lockout initiated.`,
            `> Terminal has locked due to suspicious activity.`,
            `> System reboot required.`
          ]);
        }
      }
    } else if (item.type === "bracket") {
      // If already used, ignore
      if (usedBracketIds.has(item.id)) return;

      // Mark bracket as used
      setUsedBracketIds((prev) => new Set([...prev, item.id]));

      // 50% chance to reset attempts, 50% to remove a dud
      const rand = Math.random();
      if (rand > 0.5 || tries === 4) {
        // Remove a dud (incorrect word)
        // Find duds that are not the secret word and have not been removed yet
        const remainingDuds = words.filter(
          (w) => w !== secretWord && !removedWordIds.has(`word-${w}`)
        );

        if (remainingDuds.length > 0) {
          synth.playDudRemoved();
          const targetDud = remainingDuds[Math.floor(Math.random() * remainingDuds.length)];
          const targetDudId = `word-${targetDud}`;

          setRemovedWordIds((prev) => new Set([...prev, targetDudId]));

          toast.success(
            isIndonesian ? "Script Dijalankan" : "Script Executed",
            {
              description: isIndonesian
                ? `Kata salah "${targetDud}" telah disingkirkan.`
                : `Incorrect option "${targetDud}" removed.`,
            }
          );

          setLogs((prev) => [
            ...prev,
            `> Executed bracket script: Dud removed.`,
            `> System flagged "${targetDud}" as incorrect.`
          ]);

          // Replace the dud in character grid with dots
          setGridChars((prevChars) =>
            prevChars.map((c) =>
              c.id === targetDudId ? { ...c, char: "." } : c
            )
          );
        } else {
          // Fallback to tries reset if no duds left
          synth.playTriesReset();
          setTries(4);
          toast.success(
            isIndonesian ? "Script Dijalankan" : "Script Executed",
            {
              description: isIndonesian
                ? "Sisa kesempatan menebak dipulihkan kembali ke 4."
                : "Attempts reset to maximum capacity.",
            }
          );
          setLogs((prev) => [
            ...prev,
            `> Executed bracket script.`,
            `> Attempts reset to maximum capacity.`
          ]);
        }
      } else {
        // Reset tries
        synth.playTriesReset();
        setTries(4);
        toast.success(
          isIndonesian ? "Script Dijalankan" : "Script Executed",
          {
            description: isIndonesian
              ? "Sisa kesempatan menebak dipulihkan kembali ke 4."
              : "Attempts reset to maximum capacity.",
          }
        );
        setLogs((prev) => [
          ...prev,
          `> Executed bracket script.`,
          `> Attempts reset to maximum capacity.`
        ]);
      }
    }
  };

  // Hover effect helpers
  const handleTokenHover = (item: GridChar | null) => {
    if (!item || item.type === "noise") {
      setHoveredTokenId(null);
      setHoveredValue(null);
      return;
    }

    // Ignore hovering on used/removed
    if (item.type === "bracket" && usedBracketIds.has(item.id)) return;
    if (item.type === "word" && removedWordIds.has(item.id)) return;

    synth.playHover();
    setHoveredTokenId(item.id);
    setHoveredValue(item.value);
  };

  // Convert flat grid array to address + row layout
  // Column 1: 16 rows of 12 chars = 192 chars
  // Column 2: 16 rows of 12 chars = 192 chars
  const renderRow = (colStartIdx: number, rowIdx: number) => {
    const start = colStartIdx + rowIdx * 12;
    const end = start + 12;
    const rowChars = gridChars.slice(start, end);
    const address = (0xf3a4 + colStartIdx + rowIdx * 12).toString(16).toUpperCase();

    return (
      <div className="flex items-center font-mono text-sm sm:text-xs tracking-wider leading-none select-none py-1 sm:py-0.5">
        <span className="text-emerald/40 mr-2 sm:mr-3 font-semibold">0x{address}</span>
        <div className="flex gap-1 sm:gap-0.5 md:gap-1">
          {rowChars.map((charObj, charIdx) => {
            const isHovered = hoveredTokenId === charObj.id;
            const isDudRemoved = charObj.type === "word" && removedWordIds.has(charObj.id);
            const isBracketUsed = charObj.type === "bracket" && usedBracketIds.has(charObj.id);

            let colorClass = "text-emerald";
            if (isHovered) {
              colorClass = "bg-emerald text-slate-950 font-bold";
            } else if (isDudRemoved) {
              colorClass = "text-emerald/20";
            } else if (isBracketUsed) {
              colorClass = "text-emerald/30";
            }

            return (
              <span
                key={charIdx}
                onClick={() => handleTokenClick(charObj)}
                onMouseEnter={() => handleTokenHover(charObj)}
                className={`cursor-pointer transition-colors duration-100 px-1 py-1.5 sm:px-0.5 sm:py-0.5 rounded ${colorClass}`}
              >
                {charObj.char}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-background relative z-10 text-left border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* Title Section */}
        <AnimatedSection>
          <div className="mb-10 pb-6 border-b border-border/60 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold flex items-center justify-center gap-3 mb-3 text-foreground">
              <Terminal size={28} className="text-emerald animate-pulse" />
              {t("Terminal Uplink") || "Cyber Decryptor"}
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto text-center">
              {t("Terminal Subtitle") || "A retro hacking puzzle. Bypass the mainframe firewall by guessing the correct passcode. Match letter positions to decrypt classified files and unlock restricted dossier clearance."}
            </p>
          </div>
        </AnimatedSection>

        {/* Terminal Case Screen */}
        <AnimatedSection delay={0.1}>
          <div className="terminal-theme w-full rounded-2xl border border-emerald/30 bg-slate-950 p-2.5 sm:p-6 shadow-[0_0_40px_rgba(16,185,129,0.04)] relative overflow-hidden group">

            {/* Phosphor Glowing overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06)_0%,transparent_80%)] pointer-events-none" />
            <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-[0.08]" />

            {/* Unified Terminal Top Status Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-emerald/20 pb-4 mb-6 text-[10px] sm:text-xs tracking-wider select-none relative z-10 text-emerald font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                <span>SYSTEM: SECURITY_OVERRIDE_UPLINK</span>
              </div>

              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-2">
                  <span>TRIES_REMAINING:</span>
                  <span className="font-bold text-xs sm:text-sm tracking-widest text-emerald">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <span key={i} className="mr-0.5 select-none text-[12px] sm:text-[13px]">
                        {i < tries ? "█" : "░"}
                      </span>
                    ))}
                  </span>
                </div>

                {/* Control buttons */}
                <div className="flex gap-1.5 border-l border-emerald/20 pl-4 ml-1">
                  <button
                    onClick={() => setShowHelp(!showHelp)}
                    className="p-1 text-emerald/40 hover:text-emerald/90 hover:bg-emerald/10 rounded transition-all cursor-pointer flex items-center justify-center"
                    title="How to Play / Cara Bermain"
                  >
                    <HelpCircle size={15} />
                  </button>
                  <button
                    onClick={() => setMuted(!muted)}
                    className="p-1 text-emerald/40 hover:text-emerald/90 hover:bg-emerald/10 rounded transition-all cursor-pointer flex items-center justify-center"
                    title={muted ? "Unmute sounds" : "Mute sounds"}
                  >
                    {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Help Overlay Manual Screen */}
            <AnimatePresence>
              {showHelp && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm z-30 p-4 sm:p-6 flex flex-col justify-between border border-emerald/30 rounded-2xl"
                >
                  <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                    <div className="flex justify-between items-center border-b border-emerald/20 pb-3">
                      <h3 className="font-mono text-sm sm:text-base font-bold flex items-center gap-2">
                        <Terminal size={18} className="animate-pulse" />
                        {isIndonesian ? "PANDUAN DEKRIPSI TERMINAL" : "TERMINAL DECRYPTION MANUAL"}
                      </h3>
                      <button
                        onClick={() => setShowHelp(false)}
                        className="p-1 text-rose hover:bg-rose/10 rounded font-bold text-xs"
                      >
                        [ X ]
                      </button>
                    </div>

                    <div className="font-mono text-xs leading-relaxed space-y-3">
                      <p className="text-emerald/90 font-bold">
                        {isIndonesian
                          ? "Sistem ini menggunakan perlindungan keamanan berbasis password. Tugas Anda adalah menebak kata sandi rahasia yang benar."
                          : "This system is protected by a password firewall. Your task is to decrypt the correct secret passcode."}
                      </p>

                      <div className="space-y-2 border border-emerald/10 p-3 rounded bg-emerald/5 text-left">
                        <span className="text-emerald font-extrabold block text-[11px] tracking-wider">
                          1. {isIndonesian ? "NADA KESAMAAN (LIKENESS SCORE)" : "LIKENESS SCORE MECHANICS"}
                        </span>
                        <p className="text-emerald/80 text-[11px]">
                          {isIndonesian
                            ? "Setiap kata tebakan Anda yang salah akan memicu analisa kesamaan. Skor kesamaan (contoh: 2/7) menunjukkan jumlah huruf yang berada pada posisi indeks yang tepat sama dengan kata sandi rahasia."
                            : "Each incorrect guess displays a Likeness Score (e.g., 2/7). This shows how many letters in your guess share both the exact character and position with the passcode."}
                        </p>
                      </div>

                      <div className="space-y-2 border border-emerald/10 p-3 rounded bg-emerald/5 text-left">
                        <span className="text-emerald font-extrabold block text-[11px] tracking-wider">
                          2. {isIndonesian ? "BYPASS SCRIPT (TANDA KURUNG)" : "BYPASS TRICKS (BRACKET GROUPS)"}
                        </span>
                        <p className="text-emerald/80 text-[11px]">
                          {isIndonesian
                            ? "Cari pasangan tanda kurung tertutup yang sebaris pada konsol simbol acak (seperti [...], <...>, {...}, atau (...)). Klik salah satunya untuk:"
                            : "Look for matching horizontal bracket groups in the symbol grid (such as [...], <...>, {...}, or (...)). Clicking them will:"}
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-emerald/80 text-[11px]">
                          <li>
                            {isIndonesian
                              ? "Menyingkirkan kata sandi salah (dud) dari layar secara permanen."
                              : "Remove an incorrect password option (dud) from the screen."}
                          </li>
                          <li>
                            {isIndonesian
                              ? "Mengisi kembali sisa kesempatan menebak (tries) menjadi 4 kali."
                              : "Refill your attempts back to the maximum of 4 tries."}
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-2 border border-emerald/10 p-3 rounded bg-emerald/5 text-left">
                        <span className="text-emerald font-extrabold block text-[11px] tracking-wider">
                          3. {isIndonesian ? "BATAS PERCOBAAN & REBOOT" : "ATTEMPTS & REBOOTS"}
                        </span>
                        <p className="text-emerald/80 text-[11px]">
                          {isIndonesian
                            ? "Anda memiliki 4 kesempatan menebak. Jika gagal 4 kali berturut-turut, terminal akan terkunci dan Anda harus melakukan Reboot Sistem untuk mencoba ulang (kata sandi baru akan di-acak)."
                            : "You have 4 attempts. If all 4 are expended, the console locks. You must initiate a System Reboot to retry, which generates a new randomized secret word."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowHelp(false)}
                    className="w-full mt-4 py-2 bg-emerald text-slate-950 font-mono font-bold text-xs uppercase hover:opacity-90 transition-all rounded cursor-pointer"
                  >
                    {isIndonesian ? "Mulai Dekripsi / Tutup" : "Start Decryption / Close"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ROBCO Terminal Grid */}
            <div className="grid lg:grid-cols-12 gap-8 relative z-10 text-emerald font-mono">

              {/* LEFT INTERACTIVE PANEL: MEMORY BLOCKS (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6 select-none">

                {/* Double column grid block */}
                {gridChars.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 bg-slate-950 border border-emerald/10 p-2.5 sm:p-4 rounded-xl shadow-inner shadow-black/80">

                    {/* Left Column Rows */}
                    <div className="flex flex-col gap-1.5">
                      {Array.from({ length: 16 }).map((_, idx) => (
                        <div key={idx}>{renderRow(0, idx)}</div>
                      ))}
                    </div>

                    {/* Right Column Rows */}
                    <div className="flex flex-col gap-1.5">
                      {Array.from({ length: 16 }).map((_, idx) => (
                        <div key={idx}>{renderRow(192, idx)}</div>
                      ))}
                    </div>

                  </div>
                )}

                {/* Live hover tracker */}
                <div className="h-6 flex items-center text-xs text-emerald/50 bg-emerald/5 px-3 rounded border border-emerald/10">
                  {hoveredValue ? (
                    <span className="animate-[blink_1s_infinite]">
                      &gt; SELECT VALUE: "{hoveredValue}"
                    </span>
                  ) : (
                    <span>&gt; IDLE_SCANNER_AWAITING_INPUT</span>
                  )}
                </div>

              </div>

              {/* RIGHT LOG SHEET: TRANSCEIVER SCRIPTS (5 cols) */}
              <div className="lg:col-span-5 flex flex-col h-full min-h-[300px] lg:min-h-[380px] border-t lg:border-t-0 lg:border-l border-emerald/20 pt-6 lg:pt-0 lg:pl-6">

                {/* Console text log */}
                <div ref={logContainerRef} className="h-[200px] lg:h-[260px] max-h-[200px] lg:max-h-[260px] flex flex-col gap-2 overflow-y-auto terminal-log-container bg-black/40 p-4 rounded-xl border border-emerald/10 shadow-inner pr-2">
                  <AnimatePresence>
                    {logs.map((log, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15 }}
                        className={`text-xs sm:text-[11px] leading-relaxed break-words text-left ${log.includes("Access Granted")
                            ? "text-emerald font-extrabold"
                            : log.includes("ERROR") || log.includes("Denied")
                              ? "text-rose font-bold"
                              : "text-emerald/80"
                          }`}
                      >
                        {log}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* State Screen overlays */}
                <div className="mt-auto pt-4 border-t border-emerald/20">
                  {gameState === "playing" && (
                    <div className="text-center py-4 bg-emerald/5 border border-emerald/10 rounded-xl flex items-center justify-center gap-3 font-mono">
                      <Terminal size={16} className="animate-pulse" />
                      <span className="text-xs uppercase font-bold tracking-widest text-emerald">
                        Firewall Active - Decrypt Key
                      </span>
                    </div>
                  )}

                  {gameState === "won" && (
                    <div className="space-y-3">
                      <div className="py-3 px-4 bg-emerald/10 border border-emerald/30 rounded-xl flex items-center justify-center gap-3 text-emerald font-mono">
                        <ShieldCheck size={20} className="animate-bounce" />
                        <span className="text-sm font-bold uppercase tracking-wider">
                          UPLINK SECURITY SECURED
                        </span>
                      </div>

                      {/* Reward button */}
                      <a
                        href={cvLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-mono font-bold bg-emerald/10 hover:bg-emerald/20 text-emerald border border-emerald/30 transition-all hover:scale-[1.01]"
                      >
                        <CheckCircle size={14} /> {t("Access Classified Dossier") || "Access Classified Dossier / CV"}
                      </a>
                    </div>
                  )}

                  {gameState === "lost" && (
                    <div className="space-y-3">
                      <div className="py-3 px-4 bg-rose/10 border border-rose/20 rounded-xl flex items-center justify-center gap-3 text-rose font-mono">
                        <ShieldAlert size={20} className="animate-pulse" />
                        <span className="text-sm font-bold uppercase tracking-wider">
                          HOSTILE SYSTEM LOCKOUT
                        </span>
                      </div>

                      <button
                        onClick={initGame}
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-mono font-bold bg-rose/10 hover:bg-rose/20 text-rose border border-rose/30 transition-all hover:scale-[1.01]"
                      >
                        <RefreshCw size={14} className="animate-spin-slow" /> Reboot System & Retry
                      </button>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
