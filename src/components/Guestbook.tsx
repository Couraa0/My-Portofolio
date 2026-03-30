import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Calendar, MessageSquare, Heart, X, Check, BadgeCheck } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

// SUPABASE CONFIGURATION
// You need to set these in your .env or .env.local file:
// VITE_SUPABASE_URL=https://[your-project-id].supabase.co
// VITE_SUPABASE_ANON_KEY=[your-anon-key]
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

type Message = { id: string; name: string; text: string; created_at: string; reactions: number; reply?: string };

export default function GuestbookPopup() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [likedMsgs, setLikedMsgs] = useState<Set<string>>(new Set());

  // Use localStorage as fallback if Supabase is not yet configured
  const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

  const fetchMessages = async () => {
    if (isSupabaseConfigured) {
      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/guestbook?select=*&order=created_at.desc`, {
          headers: {
            "apikey": supabaseKey,
            "Authorization": `Bearer ${supabaseKey}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
          return;
        }
      } catch (err) {
        console.error("Supabase fetch failed", err);
      }
    } 
    // Fallback to localStorage
    const saved = localStorage.getItem("guestbook-messages");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  };

  useEffect(() => {
    if (open) fetchMessages();
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    
    setLoading(true);
    const newMsg = {
      name: name.trim(),
      text: text.trim(),
      reactions: 0
    };

    if (isSupabaseConfigured) {
      try {
        const res = await fetch(`${supabaseUrl}/rest/v1/guestbook`, {
          method: "POST",
          headers: {
            "apikey": supabaseKey,
            "Authorization": `Bearer ${supabaseKey}`,
            "Content-Type": "application/json",
            "Prefer": "return=representation"
          },
          body: JSON.stringify(newMsg)
        });
        if (res.ok) {
          await fetchMessages();
          setName("");
          setText("");
          toast.success(t("Hooray!"), { 
            description: t("Message sent!"),
            style: { 
              background: "linear-gradient(135deg, hsl(250 84% 60%), hsl(196 100% 47%))", 
              color: "#ffffff", 
              border: "none" 
            },
            descriptionClassName: "text-white opacity-100 font-medium"
          });
        } else {
          toast.error(t("Oops!"), { description: t("Failed to send") });
        }
      } catch (err) {
        console.error("Supabase insert failed", err);
        toast.error(t("Oops!"), { description: t("Database connection error") });
      }
    } else {
      // Fallback
      const msgLocal = { ...newMsg, id: Date.now().toString(), created_at: new Date().toISOString() };
      const newMessages = [msgLocal, ...messages];
      setMessages(newMessages);
      localStorage.setItem("guestbook-messages", JSON.stringify(newMessages));
      setName("");
      setText("");
      toast.success(t("Saved locally!"));
    }
    setLoading(false);
  };

  const handleReaction = async (id: string, currentReactions: number) => {
    if (likedMsgs.has(id)) return; // Prevent multiple likes

    const newLiked = new Set(likedMsgs).add(id);
    setLikedMsgs(newLiked);

    if (isSupabaseConfigured) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/guestbook?id=eq.${id}`, {
          method: "PATCH",
          headers: {
            "apikey": supabaseKey,
            "Authorization": `Bearer ${supabaseKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ reactions: currentReactions + 1 })
        });
        fetchMessages();
      } catch (err) {
        console.error(err);
      }
    } else {
      // Fallback update
      const updated = messages.map(m => m.id === id ? { ...m, reactions: m.reactions + 1 } : m);
      setMessages(updated);
      localStorage.setItem("guestbook-messages", JSON.stringify(updated));
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full text-white shadow-xl shadow-blue-500/20"
        style={{ background: "linear-gradient(135deg, hsl(250 84% 60%), hsl(196 100% 47%))" }}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Pop-up Modals */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] bg-background border rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[70vh]"
          >
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between" style={{ background: "linear-gradient(135deg, hsl(250 84% 60% / 0.1), hsl(196 100% 47% / 0.1))" }}>
              <div className="flex items-center gap-2">
                <MessageSquare className="text-blue-500" size={18} />
                <h3 className="font-heading font-bold">{t("Guestbook")}</h3>
              </div>
              <button 
                onClick={() => setOpen(false)} 
                className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
              {messages.length === 0 ? (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  {t("No messages yet")}
                </div>
              ) : (
                messages.map((m) => (
                  <motion.div 
                    key={m.id}
                    layout 
                    className="p-3.5 rounded-xl bg-card border shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[10px]"
                          style={{ background: "linear-gradient(135deg, hsl(196 100% 47%), hsl(250 84% 60%))" }}>
                          {m.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-sm">{m.name}</span>
                      </div>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        {new Date(m.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/90 ml-8 mb-2 whitespace-pre-wrap">{m.text}</p>
                    
                    {/* Admin Reply */}
                    {m.reply && (
                      <div className="ml-8 mt-2 p-3 rounded-xl bg-blue-500/5 border border-blue-500/20 text-xs shadow-inner shadow-blue-500/5">
                        <div className="flex items-center gap-1.5 mb-1.5 text-blue-500 font-bold">
                          <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center -ml-0.5">
                            <User size={10} strokeWidth={3} />
                          </div>
                          <span className="text-[11px] uppercase tracking-wider">Rakha</span>
                          <BadgeCheck size={14} className="fill-blue-500 text-white" />
                        </div>
                        <p className="text-muted-foreground leading-relaxed pl-1">
                          {m.reply}
                        </p>
                      </div>
                    )}
                    
                    {/* Reaction Button */}
                    <div className="flex justify-end mt-1">
                      <button 
                        onClick={() => handleReaction(m.id, m.reactions || 0)}
                        className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border transition-colors ${
                          likedMsgs.has(m.id) 
                            ? "bg-rose-500/10 border-rose-500/30 text-rose-500" 
                            : "bg-muted hover:bg-rose-500/5 hover:border-rose-500/30 text-muted-foreground hover:text-rose-500"
                        }`}
                      >
                        <Heart size={12} fill={likedMsgs.has(m.id) ? "currentColor" : "none"} /> 
                        {m.reactions || 0}
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Input Form */}
            <div className="p-4 border-t bg-background">
              <form onSubmit={handleSubmit} className="space-y-3">
                 <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                  <input 
                    type="text" 
                    value={name} onChange={e => setName(e.target.value)}
                    placeholder={t("Your Name")} 
                    className="w-full bg-muted/50 border rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required maxLength={30}
                  />
                </div>
                <div className="relative">
                  <textarea 
                    value={text} onChange={e => setText(e.target.value)}
                    placeholder={t("Leave a message placeholder")} 
                    className="w-full bg-muted/50 border rounded-lg py-2 pl-3 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none h-20"
                    required maxLength={200}
                  />
                </div>
                <div className="flex justify-center pt-1">
                  <button 
                    type="submit" 
                    disabled={loading || !name.trim() || !text.trim()}
                    className="w-full sm:w-1/2 flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 transition-all font-semibold text-sm shadow-md active:scale-95"
                  >
                    {loading ? (
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" 
                      />
                    ) : <Send size={14} />}
                    {loading ? t("Sending...") : t("Send Message")}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
