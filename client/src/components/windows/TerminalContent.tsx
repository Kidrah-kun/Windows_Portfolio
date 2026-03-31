import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const commands: Record<string, string | ((args: string[]) => string)> = {
  help: `Available commands:
  help          - Show this help message
  about         - About me
  skills        - List my skills  
  projects      - Show my projects
  contact       - Contact info
  education     - My education
  whoami        - Who am I?
  date          - Current date
  clear         - Clear terminal
  echo [text]   - Echo text back
  neofetch      - System info
  cat resume    - View resume summary
  cd, ls, pwd   - Filesystem navigation (simulated)`,
  
  about: `
╔═══════════════════════════════════════════════╗
║  👨‍💻  HARDIK HATHWAL                          ║
║  B.Tech AI — Newton School of Technology      ║
║  Rishihood University (2024 - 2028)           ║
║                                               ║
║  AI-focused full-stack developer building     ║
║  scalable apps with LLMs & real-time systems  ║
╚═══════════════════════════════════════════════╝
`,

  skills: `
┌──────────────────── SKILLS ────────────────────┐
│ Languages : Python, TS, JS, HTML, CSS, Java    │
│ Frontend  : React, Recharts                    │
│ Backend   : Node.js, Express, MongoDB, MySQL   │
│ ORM       : Prisma ORM                         │
│ Data      : NumPy, Pandas, Excel               │
│ AI/ML     : GenAI, LLMs (Groq, Llama 3.3)     │
│ Tools     : Git & GitHub, Data Structures      │
│ DSA       : 100+ problems solved               │
└────────────────────────────────────────────────┘
`,

  projects: `
📁 Projects Directory:
├── 🎌 Anime Style Interview App  [React, Node.js, MongoDB, Groq]  Jan 2026
├── 📚 Library Management System  [React, Node.js, MongoDB, JWT]   Nov 2025
├── 💰 Finance Management App     [React, Recharts]                May 2025
└── 💻 Portfolio OS                [React, TypeScript, Tailwind]    Mar 2026

Type 'open <project>' for details.
`,

  education: `
🎓 Education:
───────────────────────────────────────────────
  B.Tech in Artificial Intelligence       2024-2028
  Newton School of Technology             GPA: 7.2/10.0
  Rishihood University
  
  Intermediate (Class XII)                2023-2024
  St Joseph's College, Nainital           75.0%
  
  Matriculation (Class X)                 2021-2022
  St Joseph's College, Nainital           89.0%
`,

  contact: `
📬 Contact Information:
─────────────────────────
📧 Email:    hardik.hathwal2024@nst.rishihood.edu.in
📱 Phone:    +91 8909656869
🐙 GitHub:   github.com/Kidrah-kun
💼 LinkedIn: linkedin.com/in/hardik-hathwal-5098b2316
💻 LeetCode: leetcode.com/u/RNAksMnYN6
`,

  whoami: "hardik@portfolio-xp ~ $ You are viewing Hardik Hathwal's portfolio! 🎉",

  neofetch: `
        .--.          hardik@portfolio-xp
       |o_o |         ─────────────────────
       |:_/ |         OS: Portfolio XP Professional
      //   \\ \\        Host: React 18 + Vite 5
     (|     | )       Kernel: TypeScript 5
    /'\\_   _/\`\\       Shell: Framer Motion
    \\___)=(___/       DE: Tailwind CSS 3
                      Theme: Windows XP [Retro]
                      Icons: Lucide React
                      Terminal: HardikTerm v1.0
                      CPU: Hardik's Brain @ ∞ GHz
                      Memory: 100+ DSA Problems
                      AI: GenAI + LLMs powered
`,

  pwd: "/home/hardik/portfolio",
  ls: "about.txt  projects/  resume.pdf  skills.md  contact.vcf  education.txt  .secret",
  "cat resume": `
═══════════════ RESUME ═══════════════
Name: Hardik Hathwal
Role: AI-Focused Full-Stack Developer
Education: B.Tech AI, Newton School of Technology
           Rishihood University (2024-2028)
GPA: 7.2/10.0

Projects:
• Anime Style Interview App (Jan 2026)
  - AI interview platform with Groq/Llama 3.3
  - Improved system efficiency by 35%

• Library Management System (Nov 2025)
  - Full-stack with JWT auth
  - Reduced manual errors by 30%

• Finance Management App (May 2025)
  - React + Recharts dashboard
  - Reduced load time by 25%

Skills: React, Node.js, MongoDB, Python, TypeScript
        GenAI, LLMs, Git, Prisma ORM
════════════════════════════════════════
Type 'open resume' in desktop to see full version
`,
};

const TerminalContent = () => {
  const [history, setHistory] = useState<{ input: string; output: string }[]>([
    { input: "", output: `Hardik's Terminal v1.0 [Version 10.0.2026]
(C) Portfolio XP Corp. All rights reserved.

Welcome, visitor! Type 'help' for available commands.
` },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [history]);

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(" ");
    const base = parts[0];

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    let output: string;

    if (trimmed === "cat resume") {
      output = commands["cat resume"] as string;
    } else if (base === "echo") {
      output = parts.slice(1).join(" ") || "";
    } else if (base === "date") {
      output = new Date().toString();
    } else if (base === "cd") {
      output = `Changed directory to ${parts[1] || "~"}`;
    } else if (base === "open") {
      output = `🚀 Opening ${parts[1] || "nothing"}... (use desktop icons instead!)`;
    } else if (trimmed === "sudo" || trimmed.startsWith("sudo ")) {
      output = "🚫 Nice try! You don't have admin privileges on this portfolio. 😄";
    } else if (trimmed === "rm -rf /") {
      output = "🛡️ I'm not falling for that one! This portfolio is indestructible. 💪";
    } else if (trimmed === "exit" || trimmed === "quit") {
      output = "👋 You can't exit the matrix! Close the window instead.";
    } else if (trimmed === "hire hardik" || trimmed === "hire") {
      output = "✅ Great choice! Send an email to hardik.hathwal2024@nst.rishihood.edu.in 🚀\nOr check out github.com/Kidrah-kun";
    } else if (commands[base]) {
      const result = commands[base];
      output = typeof result === "function" ? result(parts.slice(1)) : result;
    } else if (trimmed === "") {
      output = "";
    } else {
      output = `'${trimmed}' is not recognized as an internal or external command.\nType 'help' for available commands.`;
    }

    setHistory(prev => [...prev, { input: cmd, output }]);
    setCmdHistory(prev => [cmd, ...prev]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < cmdHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = Object.keys(commands).filter(c => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) setInput(matches[0]);
    }
  };

  return (
    <div
      className="h-full flex flex-col font-pixel"
      style={{ background: "#0C0C0C" }}
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-auto p-3 space-y-1">
        {history.map((entry, i) => (
          <div key={i}>
            {entry.input && (
              <div className="flex gap-1">
                <span style={{ color: "#4EC9B0" }}>hardik@portfolio</span>
                <span style={{ color: "#D4D4D4" }}>:</span>
                <span style={{ color: "#569CD6" }}>~</span>
                <span style={{ color: "#D4D4D4" }}>$ {entry.input}</span>
              </div>
            )}
            {entry.output && (
              <pre className="text-sm whitespace-pre-wrap" style={{ color: "#CCCCCC" }}>
                {entry.output}
              </pre>
            )}
          </div>
        ))}
        {/* Input Line */}
        <div className="flex gap-1 items-center">
          <span style={{ color: "#4EC9B0" }}>hardik@portfolio</span>
          <span style={{ color: "#D4D4D4" }}>:</span>
          <span style={{ color: "#569CD6" }}>~</span>
          <span style={{ color: "#D4D4D4" }}>$</span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none text-sm font-pixel caret-green-400"
              style={{ color: "#D4D4D4" }}
              autoFocus
              spellCheck={false}
            />
            {!input && (
              <motion.span
                className="absolute left-0 top-0 w-2 h-4"
                style={{ background: "#4EC9B0" }}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalContent;
