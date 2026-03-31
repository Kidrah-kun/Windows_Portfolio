import { motion, AnimatePresence } from "framer-motion";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onAction: (action: string) => void;
}

const menuItems = [
  { label: "Refresh", icon: "🔄", action: "refresh" },
  { label: "Open Terminal", icon: "⌨️", action: "terminal" },
  { type: "separator" as const },
  { label: "Arrange Icons", icon: "📐", action: "arrange" },
  { label: "View ▸", icon: "👁️", action: "view", disabled: true },
  { type: "separator" as const },
  { label: "New Folder", icon: "📁", action: "newfolder", disabled: true },
  { label: "Properties", icon: "⚙️", action: "properties" },
];

const ContextMenu = ({ x, y, onClose, onAction }: ContextMenuProps) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed z-[99999] py-1 min-w-[180px]"
        style={{
          top: y,
          left: x,
          background: "hsl(220, 20%, 95%)",
          border: "1px solid hsl(210, 15%, 75%)",
          boxShadow: "2px 2px 8px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.8)",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.1 }}
        onClick={e => e.stopPropagation()}
      >
        {menuItems.map((item, i) =>
          "type" in item && item.type === "separator" ? (
            <div key={i} className="my-1 mx-2 h-px" style={{ background: "hsl(210, 15%, 80%)" }} />
          ) : (
            <button
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-1 text-xs text-left transition-colors ${
                "disabled" in item && item.disabled
                  ? "text-muted-foreground cursor-default"
                  : "text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
              onClick={() => {
                if (!("disabled" in item && item.disabled)) {
                  onAction("action" in item ? item.action : "");
                  onClose();
                }
              }}
              disabled={"disabled" in item ? item.disabled : false}
            >
              <span className="w-4 text-center">{"icon" in item ? item.icon : ""}</span>
              <span>{"label" in item ? item.label : ""}</span>
            </button>
          )
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ContextMenu;
