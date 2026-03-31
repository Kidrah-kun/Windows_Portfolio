import { motion } from "framer-motion";
import { Download, Eye, FileText, Award, Briefcase, GraduationCap, Code } from "lucide-react";

const ResumeContent = () => {
  return (
    <div className="p-4 space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-1 rounded-sm" style={{ background: "hsl(210, 15%, 88%)", border: "1px solid hsl(210, 15%, 78%)" }}>
        <div className="flex gap-1">
          <button className="xp-btn text-[11px] flex items-center gap-1">
            <Download className="w-3 h-3" /> Download PDF
          </button>
          <button className="xp-btn text-[11px] flex items-center gap-1">
            <Eye className="w-3 h-3" /> Preview
          </button>
        </div>
        <span className="text-[11px] text-muted-foreground">Last updated: March 2026</span>
      </div>

      {/* Resume Preview Card */}
      <div className="p-6 rounded-sm space-y-6" style={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(210, 15%, 85%)", boxShadow: "2px 2px 8px hsl(0, 0%, 0%, 0.08)" }}>
        {/* Header */}
        <div className="text-center border-b pb-4" style={{ borderColor: "hsl(210, 15%, 85%)" }}>
          <motion.h2
            className="text-xl font-bold text-foreground"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            HARDIK HATHWAL
          </motion.h2>
          <p className="text-sm text-muted-foreground mt-1">AI-Focused Full-Stack Developer</p>
          <p className="text-xs text-muted-foreground mt-1">
            hardik.hathwal2024@nst.rishihood.edu.in | +91 8909656869 | github.com/HardikHathwal
          </p>
        </div>

        {/* Professional Summary */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold text-primary mb-2">
            <Code className="w-4 h-4" /> PROFESSIONAL SUMMARY
          </h3>
          <div className="ml-6 text-xs text-foreground leading-relaxed">
            <p>
              AI-focused full-stack developer building scalable, production-ready applications integrating LLMs and real-time systems.
              Experienced in designing end-to-end architectures using React, Node.js, and MongoDB with AI-driven features.
              Strong in algorithmic problem solving (100+ DSA problems) and building immersive, user-centric platforms combining
              software engineering with generative AI.
            </p>
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold text-primary mb-2">
            <GraduationCap className="w-4 h-4" /> EDUCATION
          </h3>
          <div className="ml-6 space-y-3">
            <div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-foreground">B.Tech in Artificial Intelligence</p>
                <p className="text-xs text-muted-foreground">2024 - 2028</p>
              </div>
              <p className="text-xs text-muted-foreground">Newton School of Technology, Rishihood University • Grade: 7.2/10.0</p>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-foreground">Intermediate (Class XII)</p>
                <p className="text-xs text-muted-foreground">2023 - 2024</p>
              </div>
              <p className="text-xs text-muted-foreground">St Joseph's College, Nainital • Grade: 75.0%</p>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-foreground">Matriculation (Class X)</p>
                <p className="text-xs text-muted-foreground">2021 - 2022</p>
              </div>
              <p className="text-xs text-muted-foreground">St Joseph's College, Nainital • Grade: 89.0%</p>
            </div>
          </div>
        </div>

        {/* Projects (brief) */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold text-primary mb-2">
            <Briefcase className="w-4 h-4" /> KEY PROJECTS
          </h3>
          <div className="ml-6 space-y-2">
            <div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-foreground">Anime Style Interview App</p>
                <p className="text-xs text-muted-foreground">Jan 2026</p>
              </div>
              <p className="text-xs text-foreground">• Gamified AI interview platform using React, Node.js, MongoDB, Groq (Llama 3.3)</p>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-foreground">Library Management System</p>
                <p className="text-xs text-muted-foreground">Nov 2025</p>
              </div>
              <p className="text-xs text-foreground">• Full-stack library system with React, Node.js, MongoDB, JWT auth</p>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-foreground">Finance Management App</p>
                <p className="text-xs text-muted-foreground">May 2025</p>
              </div>
              <p className="text-xs text-foreground">• Personal finance dashboard with React, Recharts, local storage</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold text-primary mb-2">
            <FileText className="w-4 h-4" /> TECHNICAL SKILLS
          </h3>
          <div className="ml-6 text-xs text-foreground space-y-1">
            <p><strong>Languages:</strong> Python, TypeScript, HTML, CSS, JavaScript, Java</p>
            <p><strong>Frontend:</strong> React, Recharts</p>
            <p><strong>Backend:</strong> Node.js, Express JS, MongoDB, MySQL, Prisma ORM</p>
            <p><strong>Data Tools:</strong> NumPy, Pandas, Excel</p>
            <p><strong>Others:</strong> Git & GitHub, GenAI, Data Structures</p>
          </div>
        </div>

        {/* Extra-Curricular */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold text-primary mb-2">
            <Award className="w-4 h-4" /> EXTRA-CURRICULAR ACTIVITIES
          </h3>
          <div className="ml-6 text-xs text-foreground space-y-1">
            <p>• <strong>Painting:</strong> District 2nd place winner; multiple zonal-level achievements</p>
            <p>• <strong>Music:</strong> Guitarist (electric & acoustic) and vocalist; zonal-level performances in band competitions</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <motion.div
        className="flex items-center justify-center gap-4 p-4 rounded-sm"
        style={{
          background: "linear-gradient(135deg, hsl(216, 80%, 95%), hsl(216, 60%, 90%))",
          border: "1px solid hsl(216, 60%, 80%)",
        }}
        whileHover={{ scale: 1.01 }}
      >
        <FileText className="w-8 h-8 text-primary" />
        <div>
          <p className="text-sm font-bold text-foreground">Want the full resume?</p>
          <p className="text-xs text-muted-foreground">Download the PDF version with complete details</p>
        </div>
        <button className="xp-btn px-4 py-2 font-bold flex items-center gap-2">
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </motion.div>
    </div>
  );
};

export default ResumeContent;
