import { motion } from "framer-motion";
import { Github, Linkedin, ArrowDown } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-medium text-foreground">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" />
              Available for Work
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Hi, I'm{" "}
            <span className="block">Muhammad Rakha</span>
            <span className="block text-accent">Syamputra</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg font-medium text-muted-foreground">
            IT Project Manager & Software Developer
          </motion.p>

          <motion.p variants={fadeUp} className="text-muted-foreground max-w-lg leading-relaxed">
            Mahasiswa Sistem Informasi dengan IPK 3,97 yang passionate dalam memimpin proyek teknologi — dari AI solutions hingga Smart City ecosystem.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
            >
              View My Projects
            </button>
            <a
              href="#contact"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
            >
              Contact Me
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-4 pt-2">
            <a href="https://github.com/Couraa0" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/rakha05/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* Right — floating stats card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:flex justify-center"
        >
          <div className="relative">
            {/* Main avatar card */}
            <div className="w-72 h-80 rounded-3xl bg-secondary border border-border flex items-center justify-center shadow-lg">
              <div className="text-center space-y-3">
                <div className="mx-auto w-28 h-28 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
                  <span className="font-heading text-4xl font-bold text-accent">RS</span>
                </div>
                <p className="font-heading font-semibold text-foreground">Muhammad Rakha S.</p>
                <p className="text-xs text-muted-foreground">IT Project Manager</p>
              </div>
            </div>

            {/* Floating stat badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 rounded-2xl bg-background border border-border shadow-md px-4 py-3 text-center"
            >
              <p className="font-heading text-xl font-bold text-foreground">3.97</p>
              <p className="text-[10px] text-muted-foreground">GPA</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 rounded-2xl bg-background border border-border shadow-md px-4 py-3 text-center"
            >
              <p className="font-heading text-xl font-bold text-accent">8+</p>
              <p className="text-[10px] text-muted-foreground">Projects</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -right-12 rounded-2xl bg-background border border-border shadow-md px-4 py-3 text-center"
            >
              <p className="font-heading text-xl font-bold text-foreground">2+</p>
              <p className="text-[10px] text-muted-foreground">Years Exp</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <ArrowDown size={20} />
      </motion.div>
    </section>
  );
};

export default Hero;
