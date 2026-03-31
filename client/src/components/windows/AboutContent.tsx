import { motion } from "framer-motion";
import { MapPin, GraduationCap, Heart, Coffee, Gamepad2, Music, Palette, Guitar } from "lucide-react";

const AboutContent = () => {
  const interests = [
    { icon: <Palette className="w-4 h-4" />, label: "Painting (District 2nd)" },
    { icon: <Guitar className="w-4 h-4" />, label: "Guitarist & Vocalist" },
    { icon: <Coffee className="w-4 h-4" />, label: "Coffee & Code" },
    { icon: <Heart className="w-4 h-4" />, label: "Learning something new" },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-1 rounded-sm" style={{ background: "hsl(210, 15%, 88%)", border: "1px solid hsl(210, 15%, 78%)" }}>
        <button className="xp-btn text-[10px] sm:text-[11px]">Overview</button>
        <button className="xp-btn text-[10px] sm:text-[11px]">Goals</button>
        <button className="xp-btn text-[10px] sm:text-[11px]">Achievements</button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {/* Avatar */}
        <motion.div
          className="w-20 h-20 sm:w-32 sm:h-32 rounded-sm flex-shrink-0 overflow-hidden mx-auto sm:mx-0"
          style={{
            border: "3px solid hsl(216, 60%, 55%)",
            boxShadow: "3px 3px 0 hsl(0, 0%, 0%, 0.1)",
          }}
          whileHover={{ rotate: [0, -2, 2, 0] }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-full h-full flex items-center justify-center text-5xl" style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}>
            👨‍💻
          </div>
        </motion.div>

        {/* Info */}
        <div className="flex-1 space-y-3">
          <div>
            <motion.h2
              className="text-lg sm:text-2xl font-bold text-foreground font-pixel text-center sm:text-left"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              {">"} Hardik Hathwal {"<"}
            </motion.h2>
            <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 mt-1 justify-center sm:justify-start">
              <GraduationCap className="w-4 h-4 flex-shrink-0" /> <span>B.Tech in CS/AI — Newton School of Technology, Rishihood University</span>
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 justify-center sm:justify-start">
              <MapPin className="w-4 h-4 flex-shrink-0" /> Sonipat, Haryana, India
            </p>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="xp-inset rounded-sm p-4" style={{ background: "hsl(0, 0%, 100%)" }}>
        <p className="text-sm text-foreground leading-relaxed">
          AI-focused full-stack developer building scalable, production-ready applications integrating LLMs and real-time systems.
          Experienced in designing end-to-end architectures using React, Node.js, and MongoDB with AI-driven features.
          Strong in algorithmic problem solving (100+ DSA problems) and building immersive, user-centric platforms
          combining software engineering with generative AI.
        </p>
      </div>

      {/* Interests */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <span className="w-4 h-0.5 bg-primary" />
          Interests & Hobbies
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {interests.map((item, i) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-2 p-2 rounded-sm text-sm text-foreground xp-btn cursor-default"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <span className="text-primary">{item.icon}</span>
              {item.label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex flex-wrap items-center gap-2 p-2 text-[10px] sm:text-xs text-muted-foreground rounded-sm" style={{ background: "hsl(210, 15%, 90%)", border: "1px solid hsl(210, 15%, 82%)" }}>
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span>Status: Open to opportunities</span>
        <span className="mx-2">|</span>
        <span>🎓 Expected Graduation: 2028</span>
      </div>
    </div>
  );
};

export default AboutContent;
