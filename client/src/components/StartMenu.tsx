import { motion } from "framer-motion";
import { User, Code, FolderOpen, FileText, Mail, ExternalLink, Github, Linkedin, Terminal } from "lucide-react";

interface StartMenuProps {
  onOpenWindow: (id: string) => void;
  onClose: () => void;
}

const menuItems = [
  { id: "about", label: "About Me", icon: <User className="w-8 h-8" />, desc: "Learn about me" },
  { id: "techstack", label: "Tech Stack", icon: <Code className="w-8 h-8" />, desc: "Skills & technologies" },
  { id: "projects", label: "Projects", icon: <FolderOpen className="w-8 h-8" />, desc: "My portfolio work" },
  { id: "resume", label: "Resume", icon: <FileText className="w-8 h-8" />, desc: "Download my CV" },
  { id: "contact", label: "Contact", icon: <Mail className="w-8 h-8" />, desc: "Get in touch" },
  { id: "terminal", label: "Terminal", icon: <Terminal className="w-8 h-8" />, desc: "Command prompt" },
];

const StartMenu = ({ onOpenWindow, onClose }: StartMenuProps) => {
  return (
    <motion.div
      className="fixed bottom-10 left-0 w-[380px] z-[10000] overflow-hidden"
      style={{
        borderRadius: "8px 8px 0 0",
        boxShadow: "2px -2px 15px hsl(0, 0%, 0%, 0.4)",
        border: "2px solid hsl(216, 80%, 45%)",
      }}
      initial={{ y: 20, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 20, opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{
          background: "linear-gradient(180deg, hsl(216, 100%, 55%) 0%, hsl(216, 80%, 40%) 100%)",
        }}
      >
        <div className="w-12 h-12 rounded-sm overflow-hidden" style={{ border: "2px solid hsl(0, 0%, 100%, 0.5)" }}>
          <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}>
            <span className="text-2xl">👨‍💻</span>
          </div>
        </div>
        <div>
          <p className="font-bold text-sm text-primary-foreground">Hardik Hathwal</p>
          <p className="text-xs text-primary-foreground/70">B.Tech AI | Full-Stack Developer</p>
        </div>
      </div>

      {/* Body */}
      <div className="flex" style={{ background: "hsl(var(--xp-window-bg))" }}>
        {/* Left - Menu Items */}
        <div className="flex-1 py-2">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.id}
              className="w-full flex items-center gap-3 px-4 py-2 text-left transition-colors hover:bg-primary/10"
              onClick={() => { onOpenWindow(item.id); onClose(); }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <span className="text-primary">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Right - Links */}
        <div className="w-[140px] py-2 px-2" style={{ background: "hsl(216, 30%, 90%)" }}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 px-2">Links</p>
          {[
            { icon: <Github className="w-3.5 h-3.5" />, label: "GitHub", href: "https://github.com/Kidrah-kun" },
            { icon: <Linkedin className="w-3.5 h-3.5" />, label: "LinkedIn", href: "https://www.linkedin.com/in/hardik-hathwal-5098b2316/" },
            { icon: <ExternalLink className="w-3.5 h-3.5" />, label: "LeetCode", href: "https://leetcode.com/u/RNAksMnYN6/" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-2 py-1.5 text-xs text-foreground hover:bg-primary/10 rounded-sm transition-colors"
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-end px-4 py-2"
        style={{
          background: "linear-gradient(180deg, hsl(210, 15%, 85%) 0%, hsl(210, 15%, 78%) 100%)",
          borderTop: "1px solid hsl(210, 15%, 72%)",
        }}
      >
        <button
          className="xp-btn text-xs flex items-center gap-1"
          onClick={onClose}
        >
          <span>🔌</span> Close Menu
        </button>
      </div>
    </motion.div>
  );
};

export default StartMenu;
