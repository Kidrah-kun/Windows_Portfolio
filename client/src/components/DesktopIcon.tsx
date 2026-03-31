import { ReactNode } from "react";
import { motion } from "framer-motion";

interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  delay?: number;
}

const DesktopIcon = ({ icon, label, onClick, delay = 0 }: DesktopIconProps) => {
  return (
    <motion.button
      className="flex flex-col items-center gap-1 p-2 rounded-sm w-20 group focus:outline-none"
      onClick={onClick}
      onDoubleClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-12 h-12 flex items-center justify-center text-primary-foreground drop-shadow-lg group-hover:animate-float group-focus:bg-primary/20 rounded-sm">
        {icon}
      </div>
      <span className="text-[11px] text-primary-foreground font-medium text-center leading-tight drop-shadow-md px-1 py-0.5 group-focus:bg-primary/40 rounded-sm">
        {label}
      </span>
    </motion.button>
  );
};

export default DesktopIcon;
