import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2 } from "lucide-react";

const contactInfo = [
  { icon: <Mail size={18} />, label: "muhammadrakhasyamputra@gmail.com", href: "mailto:muhammadrakhasyamputra@gmail.com", color: "hsl(250 84% 50%)", bg: "hsl(250 84% 60% / 0.08)", border: "hsl(250 84% 60% / 0.2)" },
  { icon: <Phone size={18} />, label: "087871310560", href: "https://wa.me/6287871310560", color: "hsl(158 80% 35%)", bg: "hsl(158 80% 42% / 0.08)", border: "hsl(158 80% 42% / 0.2)" },
  { icon: <MapPin size={18} />, label: "Jawa Barat, Indonesia", color: "hsl(344 85% 50%)", bg: "hsl(344 85% 60% / 0.08)", border: "hsl(344 85% 60% / 0.2)" },
  { icon: <Github size={18} />, label: "github.com/Couraa0", href: "https://github.com/Couraa0", color: "hsl(37 100% 38%)", bg: "hsl(37 100% 50% / 0.08)", border: "hsl(37 100% 50% / 0.2)" },
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
    <section id="contact" className="py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(250 84% 60% / 0.2), transparent)" }} />

      <div className="container mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold mb-4"
              style={{ background: "hsl(250 84% 60% / 0.08)", border: "1px solid hsl(250 84% 60% / 0.2)", color: "hsl(250 84% 50%)" }}>
              Get In Touch
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              Let's Work <span className="text-gradient">Together</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md mx-auto">
              Tertarik berkolaborasi? Jangan ragu untuk menghubungi saya.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-14 max-w-5xl mx-auto">
          {/* Info */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-3">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border transition-all duration-300 cursor-default"
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
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: item.bg, color: item.color }}>
                    {item.icon}
                  </div>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors truncate">
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                  )}
                </div>
              ))}

              <div className="rounded-2xl p-5 mt-4"
                style={{ background: "linear-gradient(135deg, hsl(250 84% 60% / 0.07), hsl(196 100% 47% / 0.05))", border: "1px solid hsl(250 84% 60% / 0.18)" }}>
                <p className="text-sm font-semibold text-foreground mb-1">Open to:</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  IT Project Manager, Product Manager, Fullstack Developer roles
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-4">
              {(["name", "email", "subject"] as const).map((field, i) => (
                <input key={field}
                  type={field === "email" ? "email" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  required value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full rounded-xl border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200 bg-white"
                  style={{ borderColor: "hsl(220 20% 90%)" }}
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
                placeholder="Message" required rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-all duration-200 resize-none bg-white"
                style={{ borderColor: "hsl(220 20% 90%)" }}
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
                className="w-full rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 hover:scale-[1.02] active:scale-100"
                style={{ background: "linear-gradient(135deg, hsl(250 84% 60%), hsl(196 100% 47%))", boxShadow: "0 4px 20px hsl(250 84% 60% / 0.3)" }}>
                {sent ? <><CheckCircle2 size={16} /> Sent!</>
                  : sending ? "Sending..."
                    : <><Send size={16} /> Send Message</>}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
