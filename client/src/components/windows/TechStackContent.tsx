import { motion } from "framer-motion";
import { useState } from "react";

interface TechItem {
  name: string;
  icon: string;
  level: number;
  category: string;
  color: string;
}

const techStack: TechItem[] = [
  // Languages
  { name: "JavaScript", icon: "🟡", level: 90, category: "Languages", color: "#F7DF1E" },
  { name: "TypeScript", icon: "🔷", level: 85, category: "Languages", color: "#3178C6" },
  { name: "Python", icon: "🐍", level: 85, category: "Languages", color: "#3776AB" },
  { name: "Java", icon: "☕", level: 70, category: "Languages", color: "#ED8B00" },
  { name: "HTML/CSS", icon: "🌐", level: 92, category: "Languages", color: "#E34F26" },
  // Frontend
  { name: "React", icon: "⚛️", level: 92, category: "Frontend", color: "#61DAFB" },
  { name: "Recharts", icon: "📊", level: 80, category: "Frontend", color: "#8884d8" },
  // Backend
  { name: "Node.js", icon: "🟢", level: 85, category: "Backend", color: "#339933" },
  { name: "Express JS", icon: "🚂", level: 82, category: "Backend", color: "#000000" },
  { name: "MongoDB", icon: "🍃", level: 80, category: "Backend", color: "#47A248" },
  { name: "MySQL", icon: "🐬", level: 72, category: "Backend", color: "#4479A1" },
  { name: "Prisma ORM", icon: "💎", level: 70, category: "Backend", color: "#2D3748" },
  // Tools & Others
  { name: "Git & GitHub", icon: "📦", level: 88, category: "Tools", color: "#F05032" },
  { name: "GenAI / LLMs", icon: "🤖", level: 82, category: "Tools", color: "#8B5CF6" },
  { name: "NumPy", icon: "🔢", level: 70, category: "Tools", color: "#013243" },
  { name: "Pandas", icon: "🐼", level: 68, category: "Tools", color: "#150458" },
  { name: "Data Structures", icon: "🧱", level: 78, category: "Tools", color: "#E44D26" },
];

const categories = ["All", "Languages", "Frontend", "Backend", "Tools"];

const TechStackContent = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const filtered = activeCategory === "All" ? techStack : techStack.filter(t => t.category === activeCategory);

  return (
    <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
      {/* Address Bar */}
      <div className="flex items-center gap-2 p-1 rounded-sm" style={{ background: "hsl(210, 15%, 88%)", border: "1px solid hsl(210, 15%, 78%)" }}>
        <span className="text-xs text-muted-foreground px-2">📁 Address:</span>
        <div className="flex-1 px-2 py-1 text-xs rounded-sm" style={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(210, 15%, 75%)" }}>
          C:\Portfolio\TechStack\{activeCategory}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-0.5">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs font-medium transition-all ${
              activeCategory === cat
                ? "text-foreground rounded-t-sm"
                : "text-muted-foreground xp-btn"
            }`}
            style={
              activeCategory === cat
                ? {
                    background: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(210, 15%, 75%)",
                    borderBottom: "1px solid hsl(0, 0%, 100%)",
                    position: "relative",
                    zIndex: 1,
                  }
                : {}
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {filtered.map((tech, i) => (
          <motion.div
            key={tech.name}
            className="p-3 rounded-sm cursor-pointer transition-all"
            style={{
              background: hoveredTech === tech.name
                ? `linear-gradient(135deg, ${tech.color}15, ${tech.color}08)`
                : "hsl(0, 0%, 100%)",
              border: hoveredTech === tech.name
                ? `1px solid ${tech.color}40`
                : "1px solid hsl(210, 15%, 85%)",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            onMouseEnter={() => setHoveredTech(tech.name)}
            onMouseLeave={() => setHoveredTech(null)}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{tech.icon}</span>
              <span className="text-sm font-semibold text-foreground">{tech.name}</span>
            </div>

            {/* Skill Bar */}
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "hsl(210, 15%, 90%)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${tech.color}, ${tech.color}AA)` }}
                initial={{ width: 0 }}
                animate={{ width: `${tech.level}%` }}
                transition={{ delay: i * 0.03 + 0.2, duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-muted-foreground">{tech.category}</span>
              <span className="text-[10px] font-bold font-pixel" style={{ color: tech.color }}>
                {tech.level}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Status */}
      <div className="flex items-center gap-4 p-2 text-xs text-muted-foreground" style={{ background: "hsl(210, 15%, 90%)", border: "1px solid hsl(210, 15%, 82%)" }}>
        <span>{filtered.length} items</span>
        <span>|</span>
        <span>100+ DSA problems solved 🚀</span>
      </div>
    </div>
  );
};

export default TechStackContent;
