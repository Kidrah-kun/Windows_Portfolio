import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Code, FolderOpen, FileText, Mail, Terminal,
  Wifi, Battery, Signal, ChevronLeft, Home, LayoutGrid,
  ChevronUp, Github, Linkedin, ExternalLink
} from "lucide-react";
import blissWallpaper from "@/assets/xp-bliss.jpg";
import AboutContent from "@/components/windows/AboutContent";
import TechStackContent from "@/components/windows/TechStackContent";
import ProjectsContent from "@/components/windows/ProjectsContent";
import ResumeContent from "@/components/windows/ResumeContent";
import ContactContent from "@/components/windows/ContactContent";
import TerminalContent from "@/components/windows/TerminalContent";

const apps = [
  { id: "about", label: "About Me", icon: <User className="w-7 h-7" />, color: "#2196F3" },
  { id: "techstack", label: "Tech Stack", icon: <Code className="w-7 h-7" />, color: "#4CAF50" },
  { id: "projects", label: "Projects", icon: <FolderOpen className="w-7 h-7" />, color: "#FF9800" },
  { id: "resume", label: "Resume", icon: <FileText className="w-7 h-7" />, color: "#9C27B0" },
  { id: "contact", label: "Contact", icon: <Mail className="w-7 h-7" />, color: "#F44336" },
  { id: "terminal", label: "Terminal", icon: <Terminal className="w-7 h-7" />, color: "#607D8B" },
];

const appContent: Record<string, React.ReactNode> = {
  about: <AboutContent />,
  techstack: <TechStackContent />,
  projects: <ProjectsContent />,
  resume: <ResumeContent />,
  contact: <ContactContent />,
  terminal: <TerminalContent />,
};

const appTitles: Record<string, string> = {
  about: "About Me",
  techstack: "Tech Stack",
  projects: "My Projects",
  resume: "Resume",
  contact: "Contact",
  terminal: "Terminal",
};

const MobileShell = () => {
  const [time, setTime] = useState(new Date());
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [batteryLevel] = useState(87);
  const touchStartY = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBack = () => {
    if (activeApp) {
      setActiveApp(null);
    } else if (drawerOpen) {
      setDrawerOpen(false);
    }
  };

  const handleHome = () => {
    setActiveApp(null);
    setDrawerOpen(false);
  };

  const handleAppOpen = (id: string) => {
    setActiveApp(id);
    setDrawerOpen(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    if (deltaY > 80 && !activeApp && !drawerOpen) {
      setDrawerOpen(true);
    }
    if (deltaY < -80 && drawerOpen) {
      setDrawerOpen(false);
    }
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden relative select-none flex flex-col"
      style={{ background: "#000" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ─── Status Bar (Android-style) ─── */}
      <div
        className="flex items-center justify-between px-4 py-1.5 z-[100] relative"
        style={{
          background: activeApp
            ? "rgba(0, 40, 100, 0.95)"
            : "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(8px)",
        }}
      >
        <span className="text-[11px] font-medium text-white/90">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
        <div className="flex items-center gap-1.5">
          <Signal className="w-3 h-3 text-white/80" />
          <Wifi className="w-3 h-3 text-white/80" />
          <div className="flex items-center gap-0.5">
            <Battery className="w-3.5 h-3.5 text-white/80" />
            <span className="text-[10px] text-white/70">{batteryLevel}%</span>
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT AREA ─── */}
      <div className="flex-1 relative overflow-hidden">
        {/* Wallpaper */}
        <img
          src={blissWallpaper}
          alt="Wallpaper"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.1)" }} />

        {/* ═══ HOME SCREEN ═══ */}
        <AnimatePresence>
          {!activeApp && !drawerOpen && (
            <motion.div
              key="homescreen"
              className="absolute inset-0 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Clock Widget */}
              <div className="flex-1 flex flex-col items-center justify-center px-6">
                <motion.div
                  className="text-center mb-8"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-6xl font-light text-white drop-shadow-lg tracking-tight" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
                    {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                  <p className="text-sm text-white/80 mt-1 drop-shadow" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
                    {time.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                  </p>
                </motion.div>

                {/* Profile Card */}
                <motion.div
                  className="w-full max-w-xs rounded-2xl p-4 mb-6"
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", border: "2px solid rgba(255,255,255,0.3)" }}>
                      👨‍💻
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Hardik Hathwal</p>
                      <p className="text-white/60 text-xs">B.Tech AI | Full-Stack Dev</p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-3">
                    <a href="https://github.com/Kidrah-kun" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs text-white/90 font-medium" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <Github className="w-3.5 h-3.5" /> GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/hardik-hathwal-5098b2316/" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs text-white/90 font-medium" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                    </a>
                    <a href="https://leetcode.com/u/RNAksMnYN6/" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs text-white/90 font-medium" style={{ background: "rgba(255,255,255,0.1)" }}>
                      <ExternalLink className="w-3.5 h-3.5" /> LC
                    </a>
                  </div>
                </motion.div>

                {/* Quick-access app row */}
                <motion.div
                  className="flex gap-5"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {apps.slice(0, 4).map((app) => (
                    <button
                      key={app.id}
                      className="flex flex-col items-center gap-1.5"
                      onClick={() => handleAppOpen(app.id)}
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${app.color}, ${app.color}CC)` }}
                      >
                        {app.icon}
                      </div>
                      <span className="text-[10px] text-white/90 font-medium drop-shadow" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
                        {app.label}
                      </span>
                    </button>
                  ))}
                </motion.div>
              </div>

              {/* Swipe up indicator */}
              <motion.div
                className="flex flex-col items-center pb-4"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronUp className="w-5 h-5 text-white/50" />
                <span className="text-[9px] text-white/40">Swipe up for all apps</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ APP DRAWER ═══ */}
        <AnimatePresence>
          {drawerOpen && !activeApp && (
            <motion.div
              key="drawer"
              className="absolute inset-0 flex flex-col"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)" }} />
              <div className="relative z-10 flex-1 flex flex-col pt-6 pb-4">
                {/* Drag handle */}
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-1 rounded-full bg-white/30" />
                </div>
                <h2 className="text-base font-semibold text-white/90 text-center mb-6">All Apps</h2>
                <div className="grid grid-cols-3 gap-y-6 gap-x-4 px-8">
                  {apps.map((app, i) => (
                    <motion.button
                      key={app.id}
                      className="flex flex-col items-center gap-2"
                      onClick={() => handleAppOpen(app.id)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${app.color}, ${app.color}CC)` }}
                      >
                        {app.icon}
                      </div>
                      <span className="text-[11px] text-white/80 font-medium">{app.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ ACTIVE APP (Full Screen) ═══ */}
        <AnimatePresence>
          {activeApp && (
            <motion.div
              key={activeApp}
              className="absolute inset-0 flex flex-col z-50"
              initial={{ y: "100%", borderRadius: "20px" }}
              animate={{ y: 0, borderRadius: "0px" }}
              exit={{ y: "100%", borderRadius: "20px" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* App Title Bar */}
              <div
                className="flex items-center h-11 px-3 gap-2 shrink-0"
                style={{
                  background: "linear-gradient(180deg, #3A7AE0 0%, #2360B8 50%, #1B4D9E 100%)",
                  borderBottom: "1px solid #1845A0",
                }}
              >
                <button
                  onClick={handleBack}
                  className="w-7 h-7 flex items-center justify-center rounded-md active:bg-white/20"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <span className="flex-1 text-sm font-bold text-white truncate drop-shadow-sm">
                  {appTitles[activeApp] || activeApp}
                </span>
                <button
                  onClick={() => setActiveApp(null)}
                  className="text-[10px] text-white/80 px-2 py-1 rounded-md active:bg-white/20"
                >
                  ✕
                </button>
              </div>

              {/* App Content */}
              <div
                className="flex-1 overflow-auto"
                style={{ background: activeApp === "terminal" ? "#0C0C0C" : "#f0f0f0" }}
              >
                {appContent[activeApp]}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── Navigation Bar (Android-style) ─── */}
      <div
        className="flex items-center justify-around py-2 px-6 z-[100] relative"
        style={{
          background: activeApp
            ? "rgba(0, 40, 100, 0.95)"
            : "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(8px)",
        }}
      >
        <button
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center rounded-full active:bg-white/10"
        >
          <ChevronLeft className="w-5 h-5 text-white/70" />
        </button>
        <button
          onClick={handleHome}
          className="w-10 h-10 flex items-center justify-center rounded-full active:bg-white/10"
        >
          <Home className="w-5 h-5 text-white/70" />
        </button>
        <button
          onClick={() => { if (!activeApp) setDrawerOpen(prev => !prev); }}
          className="w-10 h-10 flex items-center justify-center rounded-full active:bg-white/10"
        >
          <LayoutGrid className="w-5 h-5 text-white/70" />
        </button>
      </div>
    </div>
  );
};

export default MobileShell;
