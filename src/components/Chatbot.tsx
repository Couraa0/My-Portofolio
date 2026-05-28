import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Sparkles, GraduationCap, Briefcase, Code2, Trophy } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { SYSTEM_PROMPT } from "@/lib/chatbot-knowledge";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

const QUICK_QUESTIONS = [
  { icon: Code2, label: "Projects", question: "Apa saja project yang pernah dibuat Rakha?" },
  { icon: Briefcase, label: "Experience", question: "Ceritakan pengalaman kerja Rakha!" },
  { icon: Trophy, label: "Achievements", question: "Apa saja pencapaian Rakha?" },
  { icon: GraduationCap, label: "Education", question: "Di mana Rakha kuliah dan berapa IPK-nya?" },
];

export default function Chatbot() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendToGroq = async (chatHistory: ChatMessage[]): Promise<string> => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) throw new Error("Groq API key not configured.");

    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...chatHistory.map(m => ({ role: m.role, content: m.content }))
    ];

    const res = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 600,
        top_p: 0.9,
      })
    });

    if (!res.ok) {
      const errorBody = await res.text().catch(() => "");
      console.error(`Groq API error ${res.status}: ${errorBody}`);
      throw new Error(`Groq API returned ${res.status}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? "Maaf, saya tidak bisa menjawab saat ini.";
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const botReply = await sendToGroq(updatedMessages);
      setMessages(prev => [...prev, { role: "assistant", content: botReply }]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "Maaf, terjadi gangguan koneksi. Silakan coba lagi nanti! 🙏" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickQuestion = (question: string) => {
    sendMessage(question);
  };

  const showWelcome = messages.length === 0 && !loading;

  return (
    <>
      {/* ── Floating Action Button ── */}
      <motion.button
        onClick={() => setOpen(prev => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full text-white shadow-xl shadow-blue-500/25 transition-shadow hover:shadow-blue-500/40"
        style={{ background: "linear-gradient(135deg, hsl(215 100% 55%), hsl(196 100% 47%))" }}
        aria-label="Open AI Chatbot"
      >
        <Bot size={24} />
      </motion.button>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] bg-background border border-blue-500/15 rounded-2xl shadow-2xl shadow-blue-500/10 z-50 overflow-hidden flex flex-col h-[540px] max-h-[75vh]"
          >
            {/* ── Header ── */}
            <div
              className="px-4 py-3.5 border-b border-blue-500/10 flex items-center justify-between shrink-0"
              style={{ background: "linear-gradient(135deg, hsl(215 100% 55% / 0.06), hsl(196 100% 47% / 0.06))" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md shadow-blue-500/20"
                  style={{ background: "linear-gradient(135deg, hsl(215 100% 55%), hsl(196 100% 47%))" }}
                >
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-foreground">Coura ✨</h3>
                  <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Online • Rakha's AI
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-full hover:bg-blue-500/10 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close chatbot"
              >
                <X size={16} />
              </button>
            </div>

            {/* ── Messages Area ── */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/10">

              {/* Welcome Screen */}
              {showWelcome && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center text-center pt-4 pb-2"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/20 mb-4"
                    style={{ background: "linear-gradient(135deg, hsl(215 100% 55%), hsl(196 100% 47%))" }}
                  >
                    <Bot size={28} />
                  </div>
                  <h4 className="font-heading font-bold text-base text-foreground mb-1">
                    Halo! Saya Coura 👋
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-[280px] mb-5">
                    AI assistant Rakha yang siap menjawab pertanyaan seputar skill, project, pengalaman, dan lainnya!
                  </p>

                  {/* Quick Question Chips */}
                  <div className="w-full grid grid-cols-2 gap-2">
                    {QUICK_QUESTIONS.map((q, idx) => {
                      const Icon = q.icon;
                      return (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleQuickQuestion(q.question)}
                          className="flex items-center gap-2 p-2.5 rounded-xl border border-blue-500/15 bg-card hover:bg-blue-500/5 hover:border-blue-500/30 text-left transition-all group"
                        >
                          <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                            <Icon size={14} className="text-blue-500" />
                          </div>
                          <span className="text-[11px] font-semibold text-foreground/80 leading-tight">{q.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Chat Bubbles */}
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0 mr-2 mt-1 shadow-sm"
                      style={{ background: "linear-gradient(135deg, hsl(215 100% 55%), hsl(196 100% 47%))" }}
                    >
                      <Bot size={12} />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed break-words ${m.role === "user"
                        ? "bg-blue-600 text-white rounded-br-sm shadow-md shadow-blue-600/15"
                        : "bg-card border border-border text-foreground rounded-bl-sm shadow-sm"
                      }`}
                  >
                    {m.role === "user" ? (
                      m.content
                    ) : (
                      <ReactMarkdown
                        components={{
                          a: ({ node, ...props }) => {
                            const isInternal = props.href?.startsWith("/");
                            if (isInternal) {
                              return (
                                <Link 
                                  to={props.href!} 
                                  className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-semibold underline underline-offset-2 transition-colors"
                                >
                                  {props.children}
                                </Link>
                              );
                            }
                            return (
                              <a 
                                {...props} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-semibold underline underline-offset-2 transition-colors"
                              />
                            );
                          },
                          p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                          strong: ({ node, ...props }) => <strong className="font-bold text-blue-600 dark:text-blue-400" {...props} />,
                          ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                        }}
                      >
                        {m.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0 mr-2 mt-1"
                    style={{ background: "linear-gradient(135deg, hsl(215 100% 55%), hsl(196 100% 47%))" }}
                  >
                    <Bot size={12} />
                  </div>
                  <div className="rounded-2xl px-4 py-3 bg-card border border-border rounded-bl-sm flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 animate-bounce [animation-delay:300ms]" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Input Bar ── */}
            <div className="p-3 border-t border-blue-500/10 bg-background shrink-0">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Tanya seputar Rakha..."
                  className="flex-1 bg-muted/50 border border-border rounded-full py-2.5 px-4 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-muted-foreground/50"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="p-2.5 rounded-full text-white disabled:opacity-40 transition-all shadow-md shadow-blue-500/15 hover:shadow-blue-500/30 active:scale-95"
                  style={{ background: "linear-gradient(135deg, hsl(215 100% 55%), hsl(196 100% 47%))" }}
                  aria-label="Send message"
                >
                  <Send size={16} className="-ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
