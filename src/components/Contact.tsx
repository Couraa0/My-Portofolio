import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <h2 className="font-heading text-3xl font-bold text-center mb-4">
            Let's Work <span className="text-accent">Together</span>
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-md mx-auto">
            Tertarik berkolaborasi? Jangan ragu untuk menghubungi saya.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-6">
              {[
                { icon: <Mail size={18} />, label: "muhammadrakhasyamputra@gmail.com", href: "mailto:muhammadrakhasyamputra@gmail.com" },
                { icon: <Phone size={18} />, label: "087871310560" },
                { icon: <MapPin size={18} />, label: "Jawa Barat, Indonesia" },
                { icon: <Github size={18} />, label: "github.com/Couraa0", href: "https://github.com/Couraa0" },
                { icon: <Linkedin size={18} />, label: "linkedin.com/in/rakha05", href: "https://www.linkedin.com/in/rakha05/" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                  )}
                </div>
              ))}

              <div className="rounded-2xl bg-accent/5 border border-accent/20 p-5 mt-6">
                <p className="text-sm font-medium text-foreground">Open to:</p>
                <p className="text-sm text-muted-foreground mt-1">
                  IT Project Manager, Product Manager, Fullstack Developer roles
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-4">
              {(["name", "email", "subject"] as const).map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  required
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition"
                />
              ))}
              <textarea
                placeholder="Message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 transition resize-none"
              />
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {sending ? "Sending..." : <><Send size={16} /> Send Message</>}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
