import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Wifi, Monitor } from "lucide-react";
import WindowsLogo from "./WindowsLogo";

interface TaskbarWindow {
  id: string;
  title: string;
  icon: React.ReactNode;
  isMinimized: boolean;
  isActive: boolean;
}

interface TaskbarProps {
  windows: TaskbarWindow[];
  onWindowClick: (id: string) => void;
  onStartClick: () => void;
  startMenuOpen: boolean;
}

const Taskbar = ({ windows, onWindowClick, onStartClick }: TaskbarProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 xp-taskbar-gradient flex items-center z-[9999] select-none">
      {/* Start Button */}
      <motion.button
        className="xp-start-btn h-full px-3 flex items-center gap-1.5 font-bold text-sm text-primary-foreground"
        onClick={onStartClick}
        whileTap={{ scale: 0.97 }}
        style={{ minWidth: 100 }}
      >
        <WindowsLogo size={22} />
        <span className="drop-shadow-sm">Start</span>
      </motion.button>

      {/* Quick Launch Divider */}
      <div className="w-px h-6 mx-1 opacity-30" style={{ backgroundColor: "hsl(0, 0%, 80%)" }} />

      {/* Taskbar Windows */}
      <div className="flex-1 flex items-center gap-1 px-1 overflow-hidden">
        <AnimatePresence>
          {windows.map((win) => (
            <motion.button
              key={win.id}
              className={`h-7 px-3 flex items-center gap-1.5 rounded-sm text-xs max-w-[180px] truncate transition-all ${
                win.isActive
                  ? "text-primary-foreground"
                  : "text-primary-foreground/70"
              }`}
              style={{
                background: win.isActive
                  ? "linear-gradient(180deg, hsl(216, 70%, 55%) 0%, hsl(216, 60%, 42%) 100%)"
                  : "linear-gradient(180deg, hsl(216, 50%, 40%) 0%, hsl(216, 45%, 30%) 100%)",
                border: "1px solid hsl(216, 60%, 35%)",
                boxShadow: win.isActive
                  ? "inset 0 1px 0 hsl(216, 80%, 65%)"
                  : "inset 0 1px 0 hsl(216, 50%, 50%)",
              }}
              onClick={() => onWindowClick(win.id)}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              whileHover={{ opacity: 0.9 }}
            >
              <span className="w-4 h-4 flex-shrink-0">{win.icon}</span>
              <span className="truncate">{win.title}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* System Tray */}
      <div
        className="h-full flex items-center gap-2 px-3 text-primary-foreground/80"
        style={{
          background: "linear-gradient(180deg, hsl(216, 55%, 38%) 0%, hsl(216, 50%, 28%) 100%)",
          borderLeft: "1px solid hsl(216, 40%, 25%)",
        }}
      >
        <Volume2 className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <Monitor className="w-3.5 h-3.5" />
        <span className="text-xs font-medium ml-1">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
};

export default Taskbar;
