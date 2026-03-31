import { useState, useRef, useCallback, ReactNode } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface XPWindowProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  isActive: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  zIndex: number;
}

const XPWindow = ({
  title,
  icon,
  children,
  isActive,
  isMinimized,
  isMaximized,
  defaultPosition = { x: 100, y: 60 },
  defaultSize = { width: 700, height: 500 },
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  zIndex,
}: XPWindowProps) => {
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isMaximized) return;
      onFocus();
      setIsDragging(true);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        origX: position.x,
        origY: position.y,
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!dragRef.current) return;
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        setPosition({
          x: dragRef.current.origX + dx,
          y: Math.max(0, dragRef.current.origY + dy),
        });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        dragRef.current = null;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [isMaximized, onFocus, position]
  );

  if (isMinimized) return null;

  const windowStyle = isMaximized
    ? { top: 0, left: 0, width: "100%", height: "calc(100vh - 40px)" }
    : { top: position.y, left: position.x, width: defaultSize.width, height: defaultSize.height };

  return (
    <motion.div
      className={`fixed flex flex-col ${isMaximized ? "" : "rounded-t-lg"} overflow-hidden ${
        isActive ? "xp-window-shadow-focused" : "xp-window-shadow"
      }`}
      style={{
        ...windowStyle,
        zIndex,
        cursor: isDragging ? "grabbing" : "auto",
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`flex items-center h-8 px-2 gap-2 select-none ${
          isActive ? "xp-title-gradient" : "xp-title-gradient-inactive"
        } ${isMaximized ? "" : "rounded-t-lg"}`}
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
      >
        {icon && <span className="w-4 h-4 flex-shrink-0 flex items-center">{icon}</span>}
        <span className="flex-1 text-xs font-bold truncate text-primary-foreground drop-shadow-sm">
          {title}
        </span>

        {/* Window Controls */}
        <div className="flex gap-[2px]">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-[22px] h-[22px] rounded-[2px] flex items-center justify-center transition-all relative group"
            style={{
              background: "linear-gradient(180deg, #3C7DED 0%, #2A5FC0 40%, #245AB5 60%, #1E4DA0 100%)",
              border: "1px solid #1845A0",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.1)",
            }}
          >
            <div className="w-[8px] h-[2px] rounded-sm mt-1" style={{ background: "#fff", boxShadow: "0 1px 1px rgba(0,0,0,0.3)" }} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="w-[22px] h-[22px] rounded-[2px] flex items-center justify-center transition-all relative group"
            style={{
              background: "linear-gradient(180deg, #3C7DED 0%, #2A5FC0 40%, #245AB5 60%, #1E4DA0 100%)",
              border: "1px solid #1845A0",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.1)",
            }}
          >
            <div className="w-[9px] h-[8px] rounded-[1px]" style={{ border: "2px solid #fff", boxShadow: "0 1px 1px rgba(0,0,0,0.3)" }} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-[22px] h-[22px] rounded-[2px] flex items-center justify-center transition-all relative group ml-[2px]"
            style={{
              background: "linear-gradient(180deg, #E08B6E 0%, #D1503E 40%, #C33B29 60%, #B52518 100%)",
              border: "1px solid #8C1A10",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.1)",
            }}
          >
            <X className="w-3 h-3" style={{ color: "#fff", filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.3))" }} />
          </button>
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 bg-xp-window overflow-auto border-x-2 border-b-2" style={{ borderColor: "hsl(216, 60%, 55%)" }}>
        {children}
      </div>
    </motion.div>
  );
};

export default XPWindow;
