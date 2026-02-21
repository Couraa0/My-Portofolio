import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Muhammad Rakha Syamputra © {new Date().getFullYear()}
        </p>

        <div className="flex items-center gap-4">
          <a href="https://github.com/Couraa0" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github size={16} />
          </a>
          <a href="https://www.linkedin.com/in/rakha05/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin size={16} />
          </a>
          <a href="mailto:muhammadrakhasyamputra@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
            <Mail size={16} />
          </a>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
