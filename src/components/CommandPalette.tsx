import { useState, useEffect } from "react";
import { Command } from "cmdk";
import { Search, Home, User, Briefcase, FileCode, Mail, MessageSquare } from "lucide-react";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex justify-center pt-[20vh] bg-black/50 backdrop-blur-sm" 
      onClick={() => setOpen(false)}
    >
      <Command 
        className="w-full max-w-xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden mx-4" 
        onClick={(e) => e.stopPropagation()}
        loop
      >
        <div className="flex items-center px-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground mr-2 shrink-0" />
          <Command.Input 
            className="w-full h-14 bg-transparent outline-none text-base text-foreground placeholder:text-muted-foreground" 
            placeholder="Type a command or search section..." 
            autoFocus 
          />
        </div>
        
        <Command.List className="max-h-[300px] overflow-y-auto p-2 pb-4 cmdk-custom-scrollbar">
          <Command.Empty className="p-6 text-sm text-center text-muted-foreground">
            No results found.
          </Command.Empty>
          
          <Command.Group heading="Navigation" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground mt-2">
            {[
              { id: "hero", icon: <Home size={16}/>, label: "Home" },
              { id: "about", icon: <User size={16}/>, label: "About Me" },
              { id: "experience", icon: <Briefcase size={16}/>, label: "Experience" },
              { id: "projects", icon: <FileCode size={16}/>, label: "Projects" },
              { id: "guestbook", icon: <MessageSquare size={16}/>, label: "Guestbook" },
              { id: "contact", icon: <Mail size={16}/>, label: "Contact" },
            ].map((item) => (
              <Command.Item 
                key={item.id}
                onSelect={() => { 
                  document.getElementById(item.id)?.scrollIntoView({behavior: "smooth"}); 
                  setOpen(false); 
                }}
                className="flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer text-sm text-foreground aria-selected:bg-accent aria-selected:text-accent-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground transition-colors"
                value={item.label}
              >
                <div className="text-muted-foreground">{item.icon}</div>
                {item.label}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
      <style>{`
        .cmdk-custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .cmdk-custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .cmdk-custom-scrollbar::-webkit-scrollbar-thumb { background: hsl(var(--border)); border-radius: 6px; }
      `}</style>
    </div>
  );
}
