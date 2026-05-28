import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, User, MessageSquare, Heart, BadgeCheck, Terminal, Command, Cpu } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { supabase } from "@/lib/supabase";

type Message = { id: string; name: string; text: string; created_at: string; reactions: number; reply?: string };

export default function GuestbookPopup() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [likedMsgs, setLikedMsgs] = useState<Set<string>>(new Set());

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error("Supabase fetch failed", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    // Check cooldown (45 seconds)
    const lastSentStr = localStorage.getItem("gb_last_sent");
    if (lastSentStr) {
      const timeSinceLast = Date.now() - parseInt(lastSentStr, 10);
      if (timeSinceLast < 45000) {
        const totalSeconds = Math.ceil((45000 - timeSinceLast) / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const timeString = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
        
        toast.warning(t("Wait") || "Wait", {
          description: t("Wait cooldown", { time: timeString }),
        });
        return;
      }
    }

    setLoading(true);
    const newMsg = {
      name: name.trim(),
      text: text.trim(),
      reactions: 0
    };

    try {
      const { error } = await supabase
        .from('guestbook')
        .insert([newMsg]);

      if (error) throw error;

      await fetchMessages();
      setName("");
      setText("");
      localStorage.setItem("gb_last_sent", Date.now().toString());

      toast.success(t("Hooray!"), {
        description: t("Message sent!"),
        style: {
          background: "linear-gradient(135deg, hsl(250 84% 60%), hsl(196 100% 47%))",
          color: "#ffffff",
          border: "none"
        },
        descriptionClassName: "text-white opacity-100 font-medium"
      });
    } catch (err) {
      console.error("Supabase insert failed", err);
      toast.error(t("Oops!"), { description: t("Database connection error") });
    } finally {
      setLoading(false);
    }
  };

  const handleReaction = async (id: string, currentReactions: number) => {
    if (likedMsgs.has(id)) return;

    const newLiked = new Set(likedMsgs).add(id);
    setLikedMsgs(newLiked);

    setMessages(prev => prev.map(m => m.id === id ? { ...m, reactions: m.reactions + 1 } : m));

    try {
      const { error } = await supabase
        .from('guestbook')
        .update({ reactions: currentReactions + 1 })
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error("Supabase update reaction failed", err);
      setMessages(prev => prev.map(m => m.id === id ? { ...m, reactions: m.reactions - 1 } : m));
      const revertedLikes = new Set(likedMsgs);
      revertedLikes.delete(id);
      setLikedMsgs(revertedLikes);
    }
  };

  return (
    <div className="w-full h-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-border rounded-2xl shadow-xl overflow-hidden flex flex-col relative group/gb">

      {/* Background Matrix/Grid Effect */}
      <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />

      {/* Header */}
      <div className="p-4 border-b border-border bg-slate-50/50 dark:bg-slate-900/50 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Terminal className="text-blue-500 dark:text-blue-400" size={16} />
            <h3 className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase">
              {t("Public Guestbook")}
            </h3>
          </div>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500/80 animate-pulse"></span>
          </div>
        </div>
        <p className="text-[11px] font-mono text-blue-600/60 dark:text-blue-300/60 ml-6 border-l-2 border-blue-500/30 pl-2">
          // {t("Guestbook Subtitle")}
        </p>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950 relative z-10 scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="text-center py-10 font-mono text-xs text-slate-500 flex flex-col items-center gap-2">
            <Cpu className="text-slate-400 dark:text-slate-700 mb-2" size={32} />
            <span>[ SYSTEM_IDLE: {t("No messages yet")} ]</span>
          </div>
        ) : (
          messages.map((m) => (
            <motion.div
              key={m.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-lg bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 transition-colors group/msg shadow-sm dark:shadow-none"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                    <span className="text-blue-500/50 mr-1">@</span>{m.name}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 flex items-center gap-1">
                  [{new Date(m.created_at).toLocaleDateString()}]
                </span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 ml-3.5 pl-2 border-l border-slate-300 dark:border-slate-700/50 mb-2 whitespace-pre-wrap font-sans">
                {m.text}
              </p>

              {/* Admin Reply */}
              {m.reply && (
                <div className="ml-3.5 mt-2 p-3 rounded bg-blue-50 dark:bg-blue-950/30 border border-blue-500/10 text-xs">
                  <div className="flex items-center gap-1.5 mb-1 text-blue-600 dark:text-blue-400 font-mono">
                    <BadgeCheck size={12} className="text-blue-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Rakha_SYS_ADMIN</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-4 border-l border-blue-500/20 font-sans">
                    {m.reply}
                  </p>
                </div>
              )}

              {/* Reaction Button */}
              <div className="flex justify-end mt-2 opacity-60 group-hover/msg:opacity-100 transition-opacity">
                <button
                  onClick={() => handleReaction(m.id, m.reactions || 0)}
                  className={`flex items-center gap-1.5 text-[10px] font-mono px-2 py-1 rounded bg-slate-100 dark:bg-slate-900 border transition-colors ${likedMsgs.has(m.id)
                    ? "border-rose-500/50 text-rose-500 dark:text-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.2)]"
                    : "border-slate-200 dark:border-slate-800 text-slate-500 hover:border-rose-500/30 hover:text-rose-500 dark:hover:text-rose-400"
                    }`}
                >
                  <Heart size={10} fill={likedMsgs.has(m.id) ? "currentColor" : "none"} className={likedMsgs.has(m.id) ? "animate-pulse" : ""} />
                  {m.reactions || 0}
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-border bg-white dark:bg-slate-900/80 shrink-0 relative z-10">
        <form onSubmit={handleSubmit} className="space-y-3">

          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-blue-500/50">ID:</span>
              <input
                type="text"
                value={name} onChange={e => setName(e.target.value)}
                placeholder={t("Your Name")}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded py-2 pl-8 pr-3 text-xs font-mono text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                required maxLength={30}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !name.trim() || !text.trim()}
              className="flex items-center justify-center gap-2 px-4 bg-blue-500 hover:bg-blue-600 text-white border border-blue-400 rounded font-mono text-xs font-bold transition-all disabled:opacity-50 shadow-md shadow-blue-500/30"
            >
              {loading ? (
                <Cpu size={14} className="animate-spin" />
              ) : (
                <Command size={14} />
              )}
              <span className="hidden sm:inline">EXEC</span>
            </button>
          </div>

          <div className="relative">
            <span className="absolute left-3 top-2.5 font-mono text-xs text-blue-500/50">{">"}</span>
            <textarea
              value={text} onChange={e => setText(e.target.value)}
              placeholder={t("Leave a message placeholder")}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded py-2 pl-7 pr-3 text-xs font-sans text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 resize-none h-16 transition-all"
              required maxLength={200}
            />
          </div>

        </form>
      </div>
    </div>
  );
}
