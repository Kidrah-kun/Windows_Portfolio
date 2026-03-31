import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { User, Code, FolderOpen, FileText, Mail, Terminal } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import blissWallpaper from "@/assets/xp-bliss.jpg";
import BootScreen from "@/components/BootScreen";
import XPWindow from "@/components/XPWindow";
import Taskbar from "@/components/Taskbar";
import StartMenu from "@/components/StartMenu";
import DesktopIcon from "@/components/DesktopIcon";
import ContextMenu from "@/components/ContextMenu";
import DesktopWidget from "@/components/DesktopWidget";
import MobileShell from "@/components/MobileShell";
import AboutContent from "@/components/windows/AboutContent";
import TechStackContent from "@/components/windows/TechStackContent";
import ProjectsContent from "@/components/windows/ProjectsContent";
import ResumeContent from "@/components/windows/ResumeContent";
import ContactContent from "@/components/windows/ContactContent";
import TerminalContent from "@/components/windows/TerminalContent";

interface WindowState {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
}

const defaultWindows: WindowState[] = [
  { id: "about", title: "About Me", icon: <User className="w-4 h-4 text-primary-foreground" />, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, defaultPosition: { x: 80, y: 40 }, defaultSize: { width: 650, height: 520 } },
  { id: "techstack", title: "Tech Stack", icon: <Code className="w-4 h-4 text-primary-foreground" />, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, defaultPosition: { x: 150, y: 60 }, defaultSize: { width: 680, height: 550 } },
  { id: "projects", title: "My Projects", icon: <FolderOpen className="w-4 h-4 text-primary-foreground" />, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, defaultPosition: { x: 200, y: 50 }, defaultSize: { width: 720, height: 530 } },
  { id: "resume", title: "Resume - Notepad", icon: <FileText className="w-4 h-4 text-primary-foreground" />, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, defaultPosition: { x: 120, y: 70 }, defaultSize: { width: 650, height: 560 } },
  { id: "contact", title: "Contact - Outlook Express", icon: <Mail className="w-4 h-4 text-primary-foreground" />, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, defaultPosition: { x: 180, y: 45 }, defaultSize: { width: 700, height: 480 } },
  { id: "terminal", title: "Command Prompt", icon: <Terminal className="w-4 h-4 text-primary-foreground" />, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, defaultPosition: { x: 100, y: 80 }, defaultSize: { width: 640, height: 420 } },
];

const desktopIcons = [
  { id: "about", label: "About Me", icon: <User className="w-8 h-8" /> },
  { id: "techstack", label: "Tech Stack", icon: <Code className="w-8 h-8" /> },
  { id: "projects", label: "My Projects", icon: <FolderOpen className="w-8 h-8" /> },
  { id: "resume", label: "Resume.pdf", icon: <FileText className="w-8 h-8" /> },
  { id: "contact", label: "Contact Me", icon: <Mail className="w-8 h-8" /> },
  { id: "terminal", label: "Terminal", icon: <Terminal className="w-8 h-8" /> },
];

const windowContent: Record<string, React.ReactNode> = {
  about: <AboutContent />,
  techstack: <TechStackContent />,
  projects: <ProjectsContent />,
  resume: <ResumeContent />,
  contact: <ContactContent />,
  terminal: <TerminalContent />,
};

const Index = () => {
  const isMobile = useIsMobile();
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>(defaultWindows);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [topZ, setTopZ] = useState(10);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const openWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w =>
        w.id === id
          ? { ...w, isOpen: true, isMinimized: false, zIndex: topZ + 1 }
          : w
      )
    );
    setTopZ(z => z + 1);
  }, [topZ]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false, isMinimized: false, isMaximized: false } : w));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: topZ + 1 } : w));
    setTopZ(z => z + 1);
    setStartMenuOpen(false);
  }, [topZ]);

  const handleTaskbarClick = useCallback((id: string) => {
    const win = windows.find(w => w.id === id);
    if (!win) return;
    if (win.isMinimized) {
      setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: topZ + 1 } : w));
      setTopZ(z => z + 1);
    } else {
      minimizeWindow(id);
    }
  }, [windows, topZ, minimizeWindow]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
    setStartMenuOpen(false);
  }, []);

  const handleContextAction = useCallback((action: string) => {
    switch (action) {
      case "refresh":
        window.location.reload();
        break;
      case "terminal":
        openWindow("terminal");
        break;
      case "properties":
        openWindow("about");
        break;
    }
  }, [openWindow]);

  const activeWindowId = [...windows].filter(w => w.isOpen && !w.isMinimized).sort((a, b) => b.zIndex - a.zIndex)[0]?.id;

  if (!booted) {
    return <BootScreen onBootComplete={() => setBooted(true)} />;
  }

  // ═══ MOBILE LAYOUT ═══
  if (isMobile) {
    return <MobileShell />;
  }

  // ═══ DESKTOP LAYOUT (unchanged) ═══
  return (
    <div
      className="h-screen w-screen overflow-hidden relative select-none scanlines"
      onClick={() => { setStartMenuOpen(false); setContextMenu(null); }}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Wallpaper */}
      <img
        src={blissWallpaper}
        alt="Desktop wallpaper"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />

      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-1 z-10" onClick={e => e.stopPropagation()}>
        {desktopIcons.map((icon, i) => (
          <DesktopIcon
            key={icon.id}
            icon={icon.icon}
            label={icon.label}
            onClick={() => openWindow(icon.id)}
            delay={i * 0.1 + 0.3}
          />
        ))}
      </div>

      {/* Desktop Widget */}
      <DesktopWidget />

      {/* Windows */}
      <AnimatePresence>
        {windows
          .filter(w => w.isOpen)
          .map(w => (
            <XPWindow
              key={w.id}
              title={w.title}
              icon={w.icon}
              isActive={activeWindowId === w.id}
              isMinimized={w.isMinimized}
              isMaximized={w.isMaximized}
              defaultPosition={w.defaultPosition}
              defaultSize={w.defaultSize}
              onClose={() => closeWindow(w.id)}
              onMinimize={() => minimizeWindow(w.id)}
              onMaximize={() => maximizeWindow(w.id)}
              onFocus={() => focusWindow(w.id)}
              zIndex={w.zIndex}
            >
              {windowContent[w.id]}
            </XPWindow>
          ))}
      </AnimatePresence>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onAction={handleContextAction}
        />
      )}

      {/* Start Menu */}
      <AnimatePresence>
        {startMenuOpen && (
          <div onClick={e => e.stopPropagation()}>
            <StartMenu
              onOpenWindow={openWindow}
              onClose={() => setStartMenuOpen(false)}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <div onClick={e => e.stopPropagation()}>
        <Taskbar
          windows={windows
            .filter(w => w.isOpen)
            .map(w => ({
              id: w.id,
              title: w.title,
              icon: w.icon,
              isMinimized: w.isMinimized,
              isActive: activeWindowId === w.id,
            }))}
          onWindowClick={handleTaskbarClick}
          onStartClick={() => setStartMenuOpen(prev => !prev)}
          startMenuOpen={startMenuOpen}
        />
      </div>
    </div>
  );
};

export default Index;
