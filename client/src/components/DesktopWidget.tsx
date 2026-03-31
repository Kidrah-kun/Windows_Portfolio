import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DesktopWidget = () => {
  const [time, setTime] = useState(new Date());
  const [quote, setQuote] = useState(0);

  const quotes = [
    "Code is poetry. ✨",
    "Ship it! 🚀",
    "Always be learning. 📚",
    "Hello, World! 👋",
    "Think → Build → Ship 💡",
    "Ctrl+S is my best friend 💾",
  ];

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    const q = setInterval(() => setQuote(prev => (prev + 1) % quotes.length), 5000);
    return () => { clearInterval(t); clearInterval(q); };
  }, []);

  const hours = time.getHours() % 12 || 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return (
    <motion.div
      className="absolute top-4 right-4 w-56 z-10"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      {/* Clock */}
      <div
        className="p-4 rounded-lg mb-3"
        style={{
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <div className="text-center">
          <p className="text-3xl font-pixel text-primary-foreground drop-shadow-lg">
            {String(hours).padStart(2, "0")}
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}>:</motion.span>
            {String(minutes).padStart(2, "0")}
            <span className="text-lg ml-1">{String(seconds).padStart(2, "0")}</span>
          </p>
          <p className="text-[10px] text-primary-foreground/70 mt-1">
            {time.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Analog Clock */}
        <div className="flex justify-center mt-3">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="38" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              return (
                <circle
                  key={i}
                  cx={40 + 32 * Math.cos(angle)}
                  cy={40 + 32 * Math.sin(angle)}
                  r={i % 3 === 0 ? 2 : 1}
                  fill="rgba(255,255,255,0.5)"
                />
              );
            })}
            {/* Hour hand */}
            <motion.line
              x1="40" y1="40"
              x2={40 + 18 * Math.cos(((hours + minutes / 60) * 30 - 90) * (Math.PI / 180))}
              y2={40 + 18 * Math.sin(((hours + minutes / 60) * 30 - 90) * (Math.PI / 180))}
              stroke="white" strokeWidth="2.5" strokeLinecap="round"
            />
            {/* Minute hand */}
            <motion.line
              x1="40" y1="40"
              x2={40 + 26 * Math.cos((minutes * 6 - 90) * (Math.PI / 180))}
              y2={40 + 26 * Math.sin((minutes * 6 - 90) * (Math.PI / 180))}
              stroke="white" strokeWidth="1.5" strokeLinecap="round"
            />
            {/* Second hand */}
            <motion.line
              x1="40" y1="40"
              x2={40 + 28 * Math.cos((seconds * 6 - 90) * (Math.PI / 180))}
              y2={40 + 28 * Math.sin((seconds * 6 - 90) * (Math.PI / 180))}
              stroke="#FF6B35" strokeWidth="1" strokeLinecap="round"
            />
            <circle cx="40" cy="40" r="2" fill="white" />
          </svg>
        </div>
      </div>

      {/* Quote Widget */}
      <motion.div
        className="p-3 rounded-lg"
        style={{
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        key={quote}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-[10px] text-primary-foreground/50 font-pixel mb-1">💬 Dev Quote</p>
        <p className="text-xs text-primary-foreground/90 italic">{quotes[quote]}</p>
      </motion.div>
    </motion.div>
  );
};

export default DesktopWidget;
