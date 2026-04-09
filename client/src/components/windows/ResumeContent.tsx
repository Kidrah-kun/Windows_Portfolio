import { motion } from "framer-motion";
import { Download, Eye, FileText, Award, Briefcase, GraduationCap, Code } from "lucide-react";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { getProjects, getEducation, getSkills, getCertifications } from "@/lib/content";

const ResumeContent = () => {
  const education = useMemo(() => getEducation(), []);
  const projects = useMemo(() => getProjects().slice(0, 3), []);
  const skills = useMemo(() => getSkills(), []);
  const certifications = useMemo(() => getCertifications(), []);
  return (
    <div className="p-4 space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-1 rounded-sm" style={{ background: "hsl(210, 15%, 88%)", border: "1px solid hsl(210, 15%, 78%)" }}>
        <div className="flex gap-1">
          <a 
            href="https://drive.google.com/file/d/1vfalasgy-l-nFxmIMBktlRpe2rhEQjJi/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="xp-btn text-[11px] flex items-center gap-1 no-underline text-foreground"
          >
            <Download className="w-3 h-3" /> Download PDF
          </a>
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
            {education.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-foreground">{edu.title}</p>
                  <p className="text-xs text-muted-foreground">{edu.date}</p>
                </div>
                <p className="text-xs text-muted-foreground">{edu.institution} • Grade: {edu.grade}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Projects (brief) */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold text-primary mb-2">
            <Briefcase className="w-4 h-4" /> KEY PROJECTS
          </h3>
          <div className="ml-6 space-y-2">
            {projects.map((proj, i) => (
              <div key={i}>
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-foreground">{proj.title}</p>
                  <p className="text-xs text-muted-foreground">{proj.date || ""}</p>
                </div>
                <p className="text-xs text-foreground">• {proj.tech.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold text-primary mb-2">
            <FileText className="w-4 h-4" /> TECHNICAL SKILLS
          </h3>
          <div className="ml-6 text-xs text-foreground prose prose-sm prose-p:my-1 prose-strong:text-foreground">
            {skills?.body ? (
              <ReactMarkdown>{skills.body}</ReactMarkdown>
            ) : (
              <p>Loading skills...</p>
            )}
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

        {/* Certifications */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold text-primary mb-2">
             <Award className="w-4 h-4" /> CERTIFICATIONS
          </h3>
          <div className="ml-6 space-y-2">
            {certifications.map((cert, i) => (
              <div key={i} className="flex justify-between items-start group">
                <div className="max-w-[80%]">
                  <a 
                    href={cert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-foreground hover:text-primary no-underline transition-colors block"
                  >
                    • {cert.title}
                  </a>
                  <p className="text-[10px] text-muted-foreground ml-2">{cert.issuer}</p>
                </div>
                <span className="text-[10px] text-muted-foreground">{cert.date}</span>
              </div>
            ))}
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
        <a 
          href="https://drive.google.com/file/d/1vfalasgy-l-nFxmIMBktlRpe2rhEQjJi/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="xp-btn px-4 py-2 font-bold flex items-center gap-2 no-underline text-foreground"
        >
          <Download className="w-4 h-4" /> Download PDF
        </a>
      </motion.div>
    </div>
  );
};

export default ResumeContent;
