import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Briefcase, MapPin, Calendar, ChevronRight, ArrowLeft, Building2, Layers, FileCode2, Globe } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getExperiences, Experience } from "@/lib/content";

const ExperienceContent = () => {
  const experiences = useMemo(() => getExperiences(), []);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  return (
    <div className="p-3 sm:p-4 space-y-3">
      {/* Toolbar */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 p-1 rounded-sm"
        style={{ background: "hsl(210, 15%, 88%)", border: "1px solid hsl(210, 15%, 78%)" }}
      >
        <div className="flex gap-1">
          <button
            className="xp-btn text-[11px] flex items-center gap-1"
            onClick={() => setSelectedExp(null)}
          >
            <ArrowLeft className="w-3 h-3" /> Back
          </button>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Briefcase className="w-3 h-3" />
          <span>{experiences.length} experience{experiences.length !== 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* ═══ DETAIL VIEW ═══ */}
      {selectedExp ? (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* Role Header Card */}
          <div
            className="rounded-sm overflow-hidden"
            style={{ border: "1px solid hsl(210, 15%, 75%)" }}
          >
            {/* Gradient Header */}
            <div
              className="p-4 relative"
              style={{
                background: "linear-gradient(135deg, hsl(216, 80%, 42%) 0%, hsl(216, 70%, 32%) 50%, hsl(220, 60%, 25%) 100%)",
              }}
            >
              {/* Decorative grid dots */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />
              <div className="relative z-10">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-11 h-11 rounded-sm flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      border: "1px solid rgba(255,255,255,0.25)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-white leading-tight">
                      {selectedExp.role}
                    </h3>
                    <p className="text-sm text-white/80 font-medium mt-0.5">
                      {selectedExp.company}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-white/70">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {selectedExp.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {selectedExp.location}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      background: "rgba(130, 200, 130, 0.25)",
                      color: "hsl(130, 80%, 80%)",
                      border: "1px solid rgba(130, 200, 130, 0.3)",
                    }}
                  >
                    {selectedExp.type}
                  </span>
                  {selectedExp.type === "Research Internship" && (
                    <span
                      className="px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"
                      style={{
                        background: "rgba(255, 215, 0, 0.2)",
                        color: "hsl(50, 100%, 80%)",
                        border: "1px solid rgba(255, 215, 0, 0.35)",
                      }}
                    >
                      🎓 Certified
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Company Description */}
            <div className="p-3" style={{ background: "hsl(216, 30%, 95%)" }}>
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                "{selectedExp.companyDescription}"
              </p>
            </div>
          </div>

          {/* Key Achievements */}
          <div
            className="rounded-sm p-4"
            style={{
              background: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(210, 15%, 85%)",
            }}
          >
            <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-primary" />
              Key Achievements & Responsibilities
            </h4>
            <ul className="space-y-2">
              {selectedExp.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2 text-xs text-foreground leading-relaxed"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <span
                    className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "hsl(216, 100%, 50%)" }}
                  />
                  {h}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Project Showcase */}
          {selectedExp.projects && selectedExp.projects.length > 0 && (
            <div
              className="rounded-sm p-4"
              style={{
                background: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(210, 15%, 85%)",
              }}
            >
              <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-accent" />
                Projects Delivered
              </h4>
              <div className="space-y-3">
                {selectedExp.projects.map((proj, i) => (
                  <motion.div
                    key={i}
                    className="p-3 rounded-sm"
                    style={{
                      background: "linear-gradient(135deg, hsl(216, 30%, 97%), hsl(216, 20%, 94%))",
                      border: "1px solid hsl(210, 15%, 88%)",
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                  >
                    <h5 className="text-sm font-semibold text-foreground mb-1">
                      {proj.title}
                    </h5>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">
                      {proj.description}
                    </p>
                    {selectedExp.type === "Research Internship" ? (
                      <div className="flex flex-wrap gap-2">
                        <span
                          className="px-2 py-0.5 text-[9px] font-bold rounded-sm uppercase tracking-wider"
                          style={{
                            background: "hsl(270, 60%, 93%)",
                            color: "hsl(270, 65%, 38%)",
                            border: "1px solid hsl(270, 50%, 85%)",
                          }}
                        >
                          🤖 AI / ML Project
                        </span>
                        <span
                          className="px-2 py-0.5 text-[9px] font-bold rounded-sm uppercase tracking-wider"
                          style={{
                            background: "hsl(200, 60%, 93%)",
                            color: "hsl(200, 65%, 38%)",
                            border: "1px solid hsl(200, 50%, 85%)",
                          }}
                        >
                          🔐 Cybersecurity
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-3 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Globe className="w-3 h-3 text-primary" />
                          {proj.pages} pages
                        </span>
                        <span className="flex items-center gap-1">
                          <Layers className="w-3 h-3 text-primary" />
                          {proj.components} components
                        </span>
                        <span className="flex items-center gap-1">
                          <FileCode2 className="w-3 h-3 text-primary" />
                          {proj.sourceFiles} source files
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div
            className="rounded-sm p-4"
            style={{
              background: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(210, 15%, 85%)",
            }}
          >
            <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-4 h-0.5" style={{ background: "hsl(280, 60%, 50%)" }} />
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedExp.tech.map((t, i) => (
                <motion.span
                  key={t}
                  className="px-2.5 py-1 text-[10px] font-semibold rounded-sm"
                  style={{
                    background: `hsl(${(i * 37) % 360}, 65%, 93%)`,
                    color: `hsl(${(i * 37) % 360}, 70%, 35%)`,
                    border: `1px solid hsl(${(i * 37) % 360}, 50%, 85%)`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 + 0.2 }}
                  whileHover={{ scale: 1.08, y: -1 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Markdown Body (detailed description) */}
          {selectedExp.body && selectedExp.body.trim() !== "" && (
            <div
              className="rounded-sm p-4"
              style={{
                background: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(210, 15%, 85%)",
              }}
            >
              <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-h2:text-sm prose-h2:font-bold prose-h3:text-xs prose-h3:font-bold prose-p:text-xs prose-p:leading-relaxed prose-li:text-xs prose-strong:text-foreground">
                <ReactMarkdown>{selectedExp.body}</ReactMarkdown>
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        /* ═══ TIMELINE LIST VIEW ═══ */
        <div className="space-y-0 relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-[19px] top-4 bottom-4 w-[2px]"
            style={{
              background: "linear-gradient(180deg, hsl(216, 100%, 50%), hsl(216, 60%, 75%), transparent)",
            }}
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="relative pl-12 pb-4 cursor-pointer group"
              onClick={() => setSelectedExp(exp)}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
            >
              {/* Timeline node */}
              <motion.div
                className="absolute left-[11px] top-3 w-[18px] h-[18px] rounded-full flex items-center justify-center z-10"
                style={{
                  background: "linear-gradient(135deg, hsl(216, 100%, 55%), hsl(216, 80%, 40%))",
                  border: "3px solid hsl(0, 0%, 100%)",
                  boxShadow: "0 0 0 2px hsl(216, 100%, 50%), 0 2px 8px rgba(0,0,0,0.15)",
                }}
                whileHover={{
                  scale: 1.3,
                  boxShadow: "0 0 0 3px hsl(216, 100%, 50%), 0 0 16px hsl(216, 100%, 50%, 0.4)",
                }}
              >
                <Briefcase className="w-2 h-2 text-white" />
              </motion.div>

              {/* Experience Card */}
              <motion.div
                className="rounded-sm overflow-hidden transition-all"
                style={{
                  border: "1px solid hsl(210, 15%, 85%)",
                  boxShadow: "1px 1px 4px hsl(0, 0%, 0%, 0.06)",
                }}
                whileHover={{
                  y: -3,
                  boxShadow: "0 6px 24px hsl(0, 0%, 0%, 0.12)",
                  borderColor: "hsl(216, 80%, 70%)",
                }}
              >
                {/* Card Header */}
                <div
                  className="px-4 py-3"
                  style={{
                    background: "linear-gradient(135deg, hsl(216, 60%, 96%), hsl(216, 40%, 93%))",
                    borderBottom: "1px solid hsl(210, 15%, 88%)",
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {exp.role}
                      </h4>
                      <p className="text-xs text-muted-foreground font-medium mt-0.5 flex items-center gap-1">
                        <Building2 className="w-3 h-3 flex-shrink-0" />
                        {exp.company}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-0.5 flex-shrink-0 mt-1" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-4 py-3" style={{ background: "hsl(0, 0%, 100%)" }}>
                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-3 mb-2.5 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider"
                      style={{
                        background: "hsl(130, 50%, 92%)",
                        color: "hsl(130, 60%, 32%)",
                        border: "1px solid hsl(130, 40%, 82%)",
                      }}
                    >
                      {exp.type}
                    </span>
                  </div>

                  {/* Top 3 highlights preview */}
                  <ul className="space-y-1 mb-3">
                    {exp.highlights.slice(0, 3).map((h, j) => (
                      <li key={j} className="text-[11px] text-foreground flex items-start gap-1.5 leading-snug">
                        <span className="text-primary mt-0.5 font-bold text-[9px]">▸</span>
                        <span className="line-clamp-1">{h}</span>
                      </li>
                    ))}
                    {exp.highlights.length > 3 && (
                      <li className="text-[10px] text-primary font-medium pl-3.5">
                        +{exp.highlights.length - 3} more achievements...
                      </li>
                    )}
                  </ul>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1">
                    {exp.tech.slice(0, 6).map(t => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 text-[9px] font-medium rounded-sm"
                        style={{
                          background: "hsl(216, 80%, 93%)",
                          color: "hsl(216, 80%, 40%)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                    {exp.tech.length > 6 && (
                      <span
                        className="px-1.5 py-0.5 text-[9px] font-medium rounded-sm"
                        style={{
                          background: "hsl(210, 15%, 90%)",
                          color: "hsl(210, 15%, 50%)",
                        }}
                      >
                        +{exp.tech.length - 6}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Status Bar */}
      <div
        className="flex items-center gap-4 p-2 text-xs text-muted-foreground"
        style={{ background: "hsl(210, 15%, 90%)", border: "1px solid hsl(210, 15%, 82%)" }}
      >
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span>
          {selectedExp
            ? `Viewing: ${selectedExp.company}`
            : `${experiences.length} experience${experiences.length !== 1 ? "s" : ""}`
          }
        </span>
        <span>|</span>
        <span>Click to view details</span>
      </div>
    </div>
  );
};

export default ExperienceContent;
