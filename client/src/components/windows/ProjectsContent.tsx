import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { ExternalLink, Github, Star, GitFork, ArrowLeft, RefreshCw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getProjects, Project } from "@/lib/content";

const ProjectsContent = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const projects = useMemo(() => getProjects(), []);

  return (
    <div className="p-3 sm:p-4 space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-1 rounded-sm" style={{ background: "hsl(210, 15%, 88%)", border: "1px solid hsl(210, 15%, 78%)" }}>
        <div className="flex gap-1">
          <button className="xp-btn text-[11px] flex items-center gap-1" onClick={() => setSelectedProject(null)}>
            <ArrowLeft className="w-3 h-3" /> Back
          </button>
          <button className="xp-btn text-[11px] flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> Refresh
          </button>
        </div>
        <div className="flex gap-1">
          <button
            className={`xp-btn text-[11px] ${viewMode === "grid" ? "font-bold" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            ⊞ Grid
          </button>
          <button
            className={`xp-btn text-[11px] ${viewMode === "list" ? "font-bold" : ""}`}
            onClick={() => setViewMode("list")}
          >
            ☰ List
          </button>
        </div>
      </div>

      {/* Project Detail View */}
      {selectedProject ? (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {/* Screenshot Header */}
          {selectedProject.screenshot && (
            <div
              className="relative h-44 rounded-sm overflow-hidden"
              style={{
                border: "1px solid hsl(210, 15%, 75%)",
              }}
            >
              <img
                src={selectedProject.screenshot}
                alt={selectedProject.title}
                className="w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.7) 100%)",
                }}
              />
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white drop-shadow-lg">{selectedProject.title}</h3>
                  <p className="text-xs text-white/70">{selectedProject.date}</p>
                </div>
                <div className="flex gap-2">
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-xs font-bold rounded-sm flex items-center gap-1 transition-all hover:scale-105"
                      style={{
                        background: "linear-gradient(180deg, hsl(130, 55%, 45%) 0%, hsl(130, 50%, 35%) 100%)",
                        color: "white",
                        border: "1px solid hsl(130, 50%, 30%)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
                      }}
                    >
                      <ExternalLink className="w-3 h-3" /> Live Demo
                    </a>
                  )}
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-xs font-bold rounded-sm flex items-center gap-1 transition-all hover:scale-105"
                    style={{
                      background: "linear-gradient(180deg, hsl(0, 0%, 30%) 0%, hsl(0, 0%, 15%) 100%)",
                      color: "white",
                      border: "1px solid hsl(0, 0%, 10%)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
                    }}
                  >
                    <Github className="w-3 h-3" /> Source Code
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Detail Body */}
          <div className="p-4 rounded-sm" style={{ background: "hsl(0, 0%, 100%)", border: "1px solid hsl(210, 15%, 85%)" }}>
            <p className="text-sm text-muted-foreground">{selectedProject.description}</p>

            {/* Highlights */}
            <h4 className="text-xs font-bold text-foreground mt-4 mb-2">Key Highlights:</h4>
            <ul className="space-y-1.5">
              {selectedProject.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  className="text-xs text-foreground flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-primary mt-0.5 font-bold">▸</span> {h}
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {selectedProject.tech.map(t => (
                <span key={t} className="px-2 py-0.5 text-[10px] font-medium rounded-sm" style={{ background: "hsl(216, 80%, 92%)", color: "hsl(216, 80%, 40%)" }}>
                  {t}
                </span>
              ))}
            </div>

            {selectedProject.body && selectedProject.body.trim() !== "" && (
              <div className="mt-6 pt-4 border-t prose prose-sm prose-invert max-w-none text-foreground" style={{ borderColor: "hsl(210, 15%, 85%)" }}>
                <ReactMarkdown>{selectedProject.body}</ReactMarkdown>
              </div>
            )}
          </div>
        </motion.div>
      ) : (
        /* Grid/List View */
        <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-3" : "space-y-2"}>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="rounded-sm cursor-pointer transition-all group overflow-hidden"
              style={{
                border: "1px solid hsl(210, 15%, 85%)",
              }}
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{
                y: -4,
                boxShadow: "0 6px 20px hsl(0, 0%, 0%, 0.15)",
              }}
            >
              {/* Screenshot Thumbnail */}
              {project.screenshot ? (
                <div className="relative h-28 overflow-hidden">
                  <img
                    src={project.screenshot}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.65) 100%)",
                    }}
                  />
                  <div className="absolute bottom-2 left-2 right-2">
                    <h4 className="text-sm font-bold text-white drop-shadow-lg truncate">
                      {project.title}
                    </h4>
                    <p className="text-[10px] text-white/70">{project.date}</p>
                  </div>
                </div>
              ) : (
                <div
                  className="relative h-28 overflow-hidden flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, hsl(216, 80%, 92%), hsl(216, 60%, 85%))" }}
                >
                  <span className="text-4xl">{project.image}</span>
                  <div className="absolute bottom-2 left-2 right-2">
                    <h4 className="text-sm font-bold text-foreground truncate">
                      {project.title}
                    </h4>
                    <p className="text-[10px] text-muted-foreground">{project.date}</p>
                  </div>
                </div>
              )}

              {/* Card Footer */}
              <div className="p-2.5" style={{ background: "hsl(0, 0%, 100%)" }}>
                <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-0.5"><Star className="w-3 h-3" /> {project.stars}</span>
                    <span className="flex items-center gap-0.5"><GitFork className="w-3 h-3" /> {project.forks}</span>
                  </div>
                  <div className="flex gap-1">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-sm hover:bg-primary/10 transition-colors"
                        onClick={e => e.stopPropagation()}
                        title="Live Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-primary" />
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-sm hover:bg-primary/10 transition-colors"
                      onClick={e => e.stopPropagation()}
                      title="GitHub"
                    >
                      <Github className="w-3.5 h-3.5 text-foreground" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Status */}
      <div className="flex items-center gap-4 p-2 text-xs text-muted-foreground" style={{ background: "hsl(210, 15%, 90%)", border: "1px solid hsl(210, 15%, 82%)" }}>
        <span>{projects.length} projects</span>
        <span>|</span>
        <span>Click to view details</span>
      </div>
    </div>
  );
};

export default ProjectsContent;
