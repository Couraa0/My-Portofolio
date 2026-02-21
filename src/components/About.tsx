import AnimatedSection from "./AnimatedSection";
import { GraduationCap, Briefcase, Rocket } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <AnimatedSection>
          <h2 className="font-heading text-3xl font-bold text-center mb-16">
            About <span className="text-accent">Me</span>
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <AnimatedSection delay={0.1}>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Saya adalah seorang IT Project Manager dan pengembang web yang sedang menempuh studi S1 Sistem Informasi di Universitas Singaperbangsa Karawang dengan IPK 3,97.
              </p>
              <p>
                Dengan pengalaman memimpin proyek-proyek berskala besar seperti Smart Village Ecosystem, AI For All, dan City Super App, saya terbiasa mengelola tim lintas fungsi menggunakan metodologi Agile Scrum dan Waterfall.
              </p>
              <p>
                Selain manajemen proyek, saya juga aktif sebagai Co-Founder Tixchain.id — sebuah platform tiket digital yang saya bangun dari nol.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              {[
                {
                  icon: <GraduationCap size={20} />,
                  title: "S1 Sistem Informasi, UNSIKA",
                  sub: "2023 – Sekarang · IPK 3,97",
                },
                {
                  icon: <Rocket size={20} />,
                  title: "Co-Founder Tixchain.id",
                  sub: "2023 – Sekarang",
                },
                {
                  icon: <Briefcase size={20} />,
                  title: "IT Project Manager Intern @ Citiasia",
                  sub: "2025",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start rounded-2xl bg-card border border-border p-5 card-hover">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
