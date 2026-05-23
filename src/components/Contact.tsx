import { useState } from "react";
import { Mail, Instagram, Linkedin, Github, ExternalLink, Terminal, ShieldAlert, Cpu, Loader2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG, getRateLimitSecondsLeft, markSent } from "@/lib/emailjs";
import { toast } from "sonner";

const Contact = () => {
  const { t } = useTranslation();

  const socialLinks = [
    {
      id: "linkedin",
      title: t("LinkedIn Title"),
      desc: t("LinkedIn Desc"),
      url: "https://www.linkedin.com/in/rakha05/",
      btnText: t("LinkedIn Btn"),
      icon: Linkedin,
      bgColor: "bg-card border-blue-500/20 hover:border-blue-500/50 shadow-lg shadow-blue-500/5",
      textColor: "text-foreground",
      iconColor: "text-blue-500",
      btnBg: "bg-blue-600 hover:bg-blue-700 text-white font-bold",
      port: "PORT_443",
      ping: "28ms",
      uptime: "99.98%",
      colSpan: "col-span-1 md:col-span-2",
    },
    {
      id: "github",
      title: t("Github Title"),
      desc: t("Github Desc"),
      url: "https://github.com/Couraa0",
      btnText: t("Github Btn"),
      icon: Github,
      bgColor: "bg-card border-slate-500/20 hover:border-slate-500/50 shadow-lg shadow-slate-500/5",
      textColor: "text-foreground",
      iconColor: "text-slate-600 dark:text-slate-300",
      btnBg: "bg-slate-800 dark:bg-slate-200 hover:bg-slate-900 text-white dark:text-black font-bold",
      port: "PORT_22",
      ping: "41ms",
      uptime: "100.00%",
      colSpan: "col-span-1",
    },
    {
      id: "instagram",
      title: t("Instagram Title"),
      desc: t("Instagram Desc"),
      url: "https://www.instagram.com/couraa0",
      btnText: t("Instagram Btn"),
      icon: Instagram,
      bgColor: "bg-card border-purple-500/20 hover:border-purple-500/50 shadow-lg shadow-purple-500/5",
      textColor: "text-foreground",
      iconColor: "text-purple-500",
      btnBg: "bg-indigo-600 hover:bg-indigo-700 text-white font-bold",
      port: "PORT_8080",
      ping: "56ms",
      uptime: "99.85%",
      colSpan: "col-span-1",
    },
    {
      id: "gmail",
      title: t("Email Title"),
      desc: t("Email Desc"),
      url: "mailto:muhammadrakhasyamputra@gmail.com",
      btnText: t("Email Btn"),
      icon: Mail,
      bgColor: "bg-card border-sky-500/20 hover:border-sky-500/50 shadow-lg shadow-sky-500/5",
      textColor: "text-foreground",
      iconColor: "text-sky-500",
      btnBg: "bg-sky-600 hover:bg-sky-700 text-white font-bold",
      port: "PORT_25",
      ping: "19ms",
      uptime: "99.99%",
      colSpan: "col-span-1 md:col-span-2",
    },
  ];

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const waitSeconds = getRateLimitSecondsLeft();
    if (waitSeconds > 0) {
      toast.warning(t("Wait") || "Mohon tunggu sebentar", {
        description: t("Wait cooldown", { time: waitSeconds }),
      });
      return;
    }

    setStatus("sending");
    const loadingToast = toast.loading(t("Sending...") || "Mengirim pesan Anda...");

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: form.name,
          to_name: "Muhammad Rakha Syamputra",
          user_name: form.name,
          name: form.name,
          from_email: form.email,
          user_email: form.email,
          email: form.email,
          reply_to: form.email,
          message: form.message,
        },
        {
          publicKey: EMAILJS_CONFIG.publicKey,
        }
      );

      markSent();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      toast.dismiss(loadingToast);
      toast.success(t("Success!") || "Terkirim!", {
        description: t("Success Desc") || "Pesan Anda telah berhasil dikirim ke email saya.",
      });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.dismiss(loadingToast);
      toast.error(t("Form fail") || "Gagal mengirim", {
        description: t("Database connection error") || "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
      });
      setStatus("idle");
    }
  };

  return (
    <section id="contact" className="py-24 bg-background relative z-10 text-left">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* Header */}
        <AnimatedSection>
          <div className="mb-10 pb-6 border-b border-border/60">
            <h2 className="font-heading text-2xl md:text-3xl font-bold flex items-center gap-3 mb-3 text-foreground">
              <Mail size={28} className="text-blue-500" />
              {t("Contact")}
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl">
              {t("Contact Subtitle")}
            </p>
          </div>
        </AnimatedSection>

        {/* Console split view */}
        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* LEFT SIDE: Port sockets (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
              SOCIAL_PORT_CONNECTIONS
            </h3>
            
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit my ${link.title}`}
                  className={`${link.colSpan} ${link.bgColor} p-5 rounded-2xl border ${link.textColor} relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
                  style={{ minHeight: "150px" }}
                >
                  <div className="relative z-10 w-full">
                    {/* Socket Port Code Header */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-mono text-[9px] text-slate-400 font-bold bg-muted/60 p-1 px-1.5 border border-border/40 rounded">
                        {link.port}
                      </span>
                      
                      {/* Live port stats */}
                      <div className="flex items-center gap-2 font-mono text-[8px] text-slate-500 font-bold">
                        <span>LATENCY: {link.ping}</span>
                        <span>UPTIME: {link.uptime}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                      <Icon className={`w-5 h-5 ${link.iconColor} shrink-0`} aria-hidden="true" />
                      <h4 className="font-bold text-base leading-none">{link.title}</h4>
                    </div>
                    
                    <p className="text-muted-foreground text-xs mb-5 line-clamp-2 leading-relaxed">
                      {link.desc}
                    </p>
                  </div>

                  <div className="relative z-10">
                    <span className={`${link.btnBg} text-[10px] font-bold py-1.5 px-3 rounded-lg transition-colors duration-200 inline-flex items-center gap-1.5`}>
                      {link.btnText}
                      <ExternalLink size={12} aria-hidden="true" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* RIGHT SIDE: Transceiver shell (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="h-full rounded-2xl border border-border bg-slate-50/50 dark:bg-slate-900/10 backdrop-blur-sm p-6 relative overflow-hidden flex flex-col justify-between">
              
              {/* Grid backdrop */}
              <div className="absolute inset-0 bg-grid opacity-[0.08] pointer-events-none" />

              <div className="relative z-10 w-full space-y-4 text-left flex-grow flex flex-col">
                {/* Transceiver Header */}
                <div className="flex items-center justify-between font-mono text-[9px] text-slate-500 pb-3.5 border-b border-border/50 shrink-0">
                  <span className="flex items-center gap-1.5"><Terminal size={12} className="text-blue-500" /> SECURE_COMMS_TRANSCEIVER</span>
                  <div className="flex items-center gap-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 p-1 px-2 border border-blue-500/10 rounded font-bold">
                    <Cpu size={10} />
                    <span>ENCRYPTED_SSL</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="pt-3 flex-grow flex flex-col justify-between space-y-6">
                  
                  <div className="space-y-5">
                    {/* Name field as coding variable */}
                    <div className="space-y-1.5">
                      <label htmlFor="user_name" className="font-mono text-[10px] text-slate-500 dark:text-slate-400 font-bold block">
                        const senderName = 
                      </label>
                      <div className="relative group/input">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-blue-500/60 font-semibold group-focus-within/input:text-blue-500">"</span>
                        <Input
                          required
                          id="user_name"
                          name="user_name"
                          aria-label={t("Name placeholder") || "Name"}
                          placeholder={t("Name placeholder") || "Name"}
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="bg-card pl-6 border-border/60 focus:border-blue-500/40 focus-visible:ring-2 focus-visible:ring-blue-500/10 focus-visible:ring-offset-0 h-11 rounded-xl transition-all font-mono text-xs text-foreground placeholder:text-muted-foreground/50"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-blue-500/60 font-semibold group-focus-within/input:text-blue-500">";</span>
                      </div>
                    </div>

                    {/* Email field as coding variable */}
                    <div className="space-y-1.5">
                      <label htmlFor="user_email" className="font-mono text-[10px] text-slate-500 dark:text-slate-400 font-bold block">
                        const senderEmail = 
                      </label>
                      <div className="relative group/input">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-blue-500/60 font-semibold group-focus-within/input:text-blue-500">"</span>
                        <Input
                          required
                          id="user_email"
                          name="user_email"
                          type="email"
                          aria-label={t("Email placeholder") || "Email"}
                          placeholder={t("Email placeholder") || "Email"}
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="bg-card pl-6 border-border/60 focus:border-blue-500/40 focus-visible:ring-2 focus-visible:ring-blue-500/10 focus-visible:ring-offset-0 h-11 rounded-xl transition-all font-mono text-xs text-foreground placeholder:text-muted-foreground/50"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-blue-500/60 font-semibold group-focus-within/input:text-blue-500">";</span>
                      </div>
                    </div>

                    {/* Message field as coding variable */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="font-mono text-[10px] text-slate-500 dark:text-slate-400 font-bold block">
                        const messagePayload = `
                      </label>
                      <div className="relative group/input">
                        <Textarea
                          required
                          id="message"
                          name="message"
                          aria-label={t("Message placeholder") || "Message"}
                          placeholder={t("Message placeholder") || "Message"}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="bg-card pl-4 pr-4 border-border/60 focus:border-blue-500/40 focus-visible:ring-2 focus-visible:ring-blue-500/10 focus-visible:ring-offset-0 min-h-[120px] sm:min-h-[150px] rounded-xl resize-none transition-all font-mono text-xs text-foreground placeholder:text-muted-foreground/50 leading-relaxed flex-grow"
                        />
                        <span className="absolute bottom-2.5 right-3 font-mono text-xs text-blue-500/60 font-semibold group-focus-within/input:text-blue-500">`;</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Command */}
                  <div className="pt-2 mt-auto w-full">
                    <button
                      type="submit"
                      disabled={status === "sending" || status === "success"}
                      className={`w-full h-11 rounded-xl text-white font-mono text-xs font-bold transition-all shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.99] disabled:opacity-75 disabled:pointer-events-none relative overflow-hidden flex items-center justify-center gap-2 ${
                        status === "success" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {/* Transmit scanner effect */}
                      {status === "sending" && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-white/20 to-blue-500/0 -translate-x-full animate-[shimmer_1.5s_infinite]" />
                      )}
                      
                      {status === "sending" ? (
                        <>
                          <Loader2 size={13} className="animate-spin" />
                          <span>TRANSMITTING_COMM...</span>
                        </>
                      ) : status === "success" ? (
                        <span>TRANSMIT_SUCCESSFUL [200_OK]</span>
                      ) : (
                        <>
                          <Terminal size={13} />
                          <span>AUTHORIZE_AND_TRANSMIT()</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
