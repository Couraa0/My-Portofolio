import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Mail, Phone, MapPin, Instagram, Linkedin, Send, CheckCircle2 } from "lucide-react";

const contactInfo = [
  { icon: <Mail size={18} />, label: "muhammadrakhasyamputra@gmail.com", href: "mailto:muhammadrakhasyamputra@gmail.com", color: "hsl(250 84% 50%)", bg: "hsl(250 84% 60% / 0.08)", border: "hsl(250 84% 60% / 0.2)" },
  { icon: <Phone size={18} />, label: "087871310560", href: "https://wa.me/6287871310560", color: "hsl(158 80% 35%)", bg: "hsl(158 80% 42% / 0.08)", border: "hsl(158 80% 42% / 0.2)" },
  { icon: <MapPin size={18} />, label: "Jawa Barat, Indonesia", color: "hsl(37 100% 45%)", bg: "hsl(37 100% 50% / 0.08)", border: "hsl(37 100% 50% / 0.2)" },
  { icon: <Instagram size={18} />, label: "@couraa0", href: "https://www.instagram.com/couraa0", color: "hsl(344 85% 50%)", bg: "hsl(344 85% 60% / 0.08)", border: "hsl(344 85% 60% / 0.2)" },
  { icon: <Linkedin size={18} />, label: "linkedin.com/in/rakha05", href: "https://www.linkedin.com/in/rakha05/", color: "hsl(196 100% 36%)", bg: "hsl(196 100% 47% / 0.08)", border: "hsl(196 100% 47% / 0.2)" },
];

const inputFocusColors = ["hsl(250 84% 60%)", "hsl(196 100% 47%)", "hsl(344 85% 60%)", "hsl(158 80% 42%)"];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false); setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.3] bg-grid pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(250 84% 60% / 0.2), transparent)" }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-10 sm:mb-16">
            <span className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold mb-4"
              style={{ background: "hsl(250 84% 60% / 0.08)", border: "1px solid hsl(250 84% 60% / 0.2)", color: "hsl(250 84% 50%)" }}>
              Get In Touch
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Let's Work <span className="text-gradient">Together</span>
            </h2>
            <p className="text-muted-foreground mt-3 sm:mt-4 max-w-md mx-auto text-sm sm:text-base px-4">
              Tertarik berkolaborasi? Jangan ragu untuk menghubungi saya.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 max-w-5xl mx-auto">
          {/* Info */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-3">
              {contactInfo.map((item, i) => (
                <div key={i}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white border transition-all duration-300"
                  style={{ borderColor: "hsl(220 20% 90%)" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = item.border;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${item.bg}`;
                    (e.currentTarget as HTMLElement).style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "hsl(220 20% 90%)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                    (e.currentTarget as HTMLElement).style.transform = "";
                  }}>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: item.bg, color: item.color }}>
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer"
                        className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors block truncate">
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-xs sm:text-sm text-muted-foreground block truncate">{item.label}</span>
                    )}
                  </div>
                </div>
              ))}

              <div className="rounded-2xl p-4 sm:p-5 mt-2 sm:mt-4"
                style={{ background: "linear-gradient(135deg, hsl(250 84% 60% / 0.07), hsl(196 100% 47% / 0.05))", border: "1px solid hsl(250 84% 60% / 0.18)" }}>
                <p className="text-sm font-semibold text-foreground mb-1">Open to:</p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  IT Project Manager, Product Manager, Fullstack Developer roles
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {(["name", "email", "subject"] as const).map((field, i) => (
                <input key={field}
                  type={field === "email" ? "email" : "text"}
                  placeholder={field === "name" ? "Nama" : field === "email" ? "Email" : "Subjek"}
                  required value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full rounded-xl border px-4 py-3 sm:py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200 bg-white"
                  style={{ borderColor: "hsl(220 20% 90%)", fontSize: "16px" }}
                  onFocus={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = `${inputFocusColors[i]}50`;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 3px ${inputFocusColors[i]}12`;
                  }}
                  onBlur={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "hsl(220 20% 90%)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}
                />
              ))}
              <textarea
                placeholder="Pesan"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border px-4 py-3 sm:py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200 resize-none bg-white"
                style={{ borderColor: "hsl(220 20% 90%)", fontSize: "16px" }}
                onFocus={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "hsl(158 80% 42% / 0.5)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px hsl(158 80% 42% / 0.1)";
                }}
                onBlur={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "hsl(220 20% 90%)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              />
              <button type="submit" disabled={sending}
                className="w-full rounded-xl px-6 py-3.5 sm:py-4 text-sm font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 active:scale-95"
                style={{ background: "linear-gradient(135deg, hsl(250 84% 60%), hsl(196 100% 47%))", boxShadow: "0 4px 20px hsl(250 84% 60% / 0.3)" }}>
                {sent ? <><CheckCircle2 size={16} /> Terkirim!</>
                  : sending ? "Mengirim..."
                    : <><Send size={16} /> Kirim Pesan</>}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
