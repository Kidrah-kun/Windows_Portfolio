import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WindowsLogo from "./WindowsLogo";

interface BootScreenProps {
  onBootComplete: () => void;
}

const BootScreen = ({ onBootComplete }: BootScreenProps) => {
  const [phase, setPhase] = useState<"bios" | "loading" | "welcome">("bios");
  const [progress, setProgress] = useState(0);
  const [biosLines, setBiosLines] = useState<string[]>([]);

  const biosText = [
    "PORTFOLIO BIOS v4.2.0",
    "Copyright (C) 2024, Dev Corp.",
    "",
    "Checking RAM.......... 16384 MB OK",
    "Detecting Hard Drive... 1TB SSD OK",
    "Loading Creative Modules... OK",
    "Initializing Portfolio OS...",
    "",
    "Press DEL to enter SETUP, F12 for Boot Menu",
    "",
    "Starting Portfolio XP..."
  ];

  useEffect(() => {
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < biosText.length) {
        setBiosLines(prev => [...prev, biosText[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setPhase("loading"), 400);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase === "loading") {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setPhase("welcome"), 300);
            return 100;
          }
          return prev + Math.random() * 8 + 2;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "welcome") {
      setTimeout(onBootComplete, 2200);
    }
  }, [phase, onBootComplete]);

  return (
    <AnimatePresence mode="wait">
      {/* ═══ BIOS PHASE ═══ */}
      {phase === "bios" && (
        <motion.div
          key="bios"
          className="fixed inset-0 z-50 flex flex-col p-4 sm:p-8 font-pixel"
          style={{ backgroundColor: "#000" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {biosLines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm sm:text-lg leading-relaxed"
              style={{ color: "#aaa" }}
            >
              {line || "\u00A0"}
            </motion.p>
          ))}
          <motion.span
            className="inline-block w-3 h-5 mt-1"
            style={{ backgroundColor: "#aaa" }}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </motion.div>
      )}

      {/* ═══ LOADING PHASE — Authentic XP Boot ═══ */}
      {phase === "loading" && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ backgroundColor: "#000" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Windows Flag Logo + Text */}
          <motion.div
            className="flex flex-col items-center mb-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* XP Flag */}
            <motion.div
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <WindowsLogo size={64} />
            </motion.div>

            {/* Retro text */}
            <div className="mt-4 text-center font-pixel">
              <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "#777" }}>
                Hardik Hathwal
              </p>
              <h1
                className="text-2xl sm:text-3xl font-bold tracking-wide"
                style={{ color: "#fff" }}
              >
                Windows<span style={{ color: "#FF6B35" }}>XP</span>
              </h1>
              <p className="text-[9px] tracking-[0.2em] uppercase mt-1" style={{ color: "#555" }}>
                Portfolio Edition
              </p>
            </div>
          </motion.div>

          {/* XP-style animated loading blocks (3 bouncing squares) */}
          <div className="flex items-center gap-1 mb-6">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-2.5 h-3 rounded-[1px]"
                style={{
                  background: "linear-gradient(180deg, #5B9BFF 0%, #0055E5 40%, #003CB3 100%)",
                  boxShadow: "0 0 4px rgba(0,85,229,0.6)",
                }}
                animate={{
                  x: [0, 60, 120, 180, 180],
                  opacity: [0, 1, 1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Copyright text */}
          <motion.p
            className="absolute bottom-8 text-[10px] text-center px-4 font-pixel"
            style={{ color: "#444" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Copyright © Dev Corp. 2024 — All rights reserved.
          </motion.p>
        </motion.div>
      )}

      {/* ═══ WELCOME PHASE — XP Welcome Screen ═══ */}
      {phase === "welcome" && (
        <motion.div
          key="welcome"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #0050D4 0%, #003399 50%, #002266 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
        >
          {/* Horizontal gradient band across the screen */}
          <motion.div
            className="absolute left-0 right-0 h-[2px]"
            style={{
              top: "50%",
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 80%, transparent 100%)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          />

          {/* Second thinner line */}
          <motion.div
            className="absolute left-0 right-0 h-[1px]"
            style={{
              top: "calc(50% + 4px)",
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 80%, transparent 100%)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          />

          {/* Welcome text */}
          <motion.h1
            className="text-3xl sm:text-4xl font-bold tracking-wide relative z-10 font-pixel"
            style={{
              color: "#fff",
              textShadow: "0 0 15px rgba(100,160,255,0.4)",
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Welcome
          </motion.h1>

          {/* Subtle glow behind welcome */}
          <motion.div
            className="absolute w-[400px] h-[200px] rounded-full"
            style={{
              background: "radial-gradient(ellipse, rgba(100,160,255,0.12) 0%, transparent 70%)",
              top: "40%",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          />

          {/* Loading dot animation */}
          <motion.div
            className="flex gap-1.5 mt-6 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-white/50"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootScreen;
