import { useState } from "react";
import { Mail, Instagram, Linkedin, Github, ExternalLink, icons } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
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
      bgColor: "bg-card border-blue-500/20 hover:border-blue-500/60 shadow-lg shadow-blue-500/5",
      textColor: "text-foreground",
      iconColor: "text-blue-500",
      btnBg: "bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white",
      watermark: "text-blue-500/10",
      colSpan: "col-span-1 md:col-span-2",
    },
    {
      id: "github",
      title: t("Github Title"),
      desc: t("Github Desc"),
      url: "https://github.com/Couraa0",
      btnText: t("Github Btn"),
      icon: Github,
      bgColor: "bg-card border-indigo-500/20 hover:border-indigo-500/60 shadow-lg shadow-indigo-500/5",
      textColor: "text-foreground",
      iconColor: "text-indigo-500 z-10",
      btnBg: "bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500 hover:text-white",
      watermark: "text-indigo-500/10 z-0",
      colSpan: "col-span-1",
    },
    {
      id: "instagram",
      title: t("Instagram Title"),
      desc: t("Instagram Desc"),
      url: "https://www.instagram.com/couraa0",
      btnText: t("Instagram Btn"),
      icon: Instagram,
      bgColor: "bg-card border-fuchsia-500/20 hover:border-fuchsia-500/60 shadow-lg shadow-fuchsia-500/5",
      textColor: "text-foreground",
      iconColor: "text-fuchsia-500",
      btnBg: "bg-fuchsia-500/10 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white",
      watermark: "text-fuchsia-500/10",
      colSpan: "col-span-1",
    },
    {
      id: "gmail",
      title: t("Email Title"),
      desc: t("Email Desc"),
      url: "mailto:muhammadrakhasyamputra@gmail.com",
      btnText: t("Email Btn"),
      icon: Mail,
      bgColor: "bg-card border-red-500/20 hover:border-red-500/60 shadow-lg shadow-red-500/5",
      textColor: "text-foreground",
      iconColor: "text-red-500",
      btnBg: "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white",
      watermark: "text-red-500/10",
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
    <section id="contact" className="py-24 bg-background relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Header */}
        <AnimatedSection>
          <div className="mb-10 pb-6 border-b border-border/60">
            <h2 className="font-heading text-2xl md:text-3xl font-bold flex items-center gap-3 mb-3 text-foreground">
              <Mail size={28} className="text-primary" />
              {t("Contact")}
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl">
              {t("Contact Subtitle")}
            </p>
          </div>
        </AnimatedSection>

        {/* Social Link Cards */}
        <AnimatedSection delay={0.1}>
          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-4">{t("Social Title")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit my ${link.title}`}
                    className={`${link.colSpan} ${link.bgColor} p-6 rounded-2xl border ${link.textColor} relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
                    style={{ minHeight: "160px" }}
                  >
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className={`w-6 h-6 ${link.iconColor} z-10`} aria-hidden="true" />
                        <h4 className="font-bold text-lg">{link.title}</h4>
                      </div>
                      <p className="text-muted-foreground text-sm mb-6 max-w-[85%] line-clamp-2">
                        {link.desc}
                      </p>
                      <span className={`${link.btnBg} text-xs font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center gap-1.5 w-fit z-10 relative`}>
                        {link.btnText}
                        <ExternalLink size={14} aria-hidden="true" />
                      </span>
                    </div>

                    {/* Background Icon Watermark */}
                    <div className={`absolute -bottom-6 -right-6 ${link.watermark} group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 z-0`}>
                      <Icon size={140} strokeWidth={1.5} />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Form */}
        <AnimatedSection delay={0.2}>
          <div className="mt-12">
            <h3 className="font-semibold text-sm mb-4">{t("Send Message Header")}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  required
                  id="user_name"
                  name="user_name"
                  aria-label={t("Name placeholder") || "Name"}
                  placeholder={t("Name placeholder") || "Name"}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-card border-border/50 focus-visible:ring-1 focus-visible:ring-border h-12 rounded-xl"
                />
                <Input
                  required
                  id="user_email"
                  name="user_email"
                  type="email"
                  aria-label={t("Email placeholder") || "Email"}
                  placeholder={t("Email placeholder") || "Email"}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-card border-border/50 focus-visible:ring-1 focus-visible:ring-border h-12 rounded-xl"
                />
              </div>
              <Textarea
                required
                id="message"
                name="message"
                aria-label={t("Message placeholder") || "Message"}
                placeholder={t("Message placeholder") || "Message"}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="bg-card border-border/50 focus-visible:ring-1 focus-visible:ring-border min-h-[120px] rounded-xl resize-none"
              />
              <Button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className={`w-full h-12 rounded-xl text-white font-semibold transition-colors disabled:opacity-70 ${status === "success" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-primary hover:bg-primary/90"
                  }`}
              >
                {status === "sending" ? t("Sending...") : status === "success" ? t("Message sent!") : t("Send Message")}
              </Button>
            </form>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
};

export default Contact;
