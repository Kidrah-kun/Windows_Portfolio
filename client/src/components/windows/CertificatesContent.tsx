import { motion } from "framer-motion";
import { useMemo } from "react";
import { Award, Calendar, ExternalLink, ShieldCheck } from "lucide-react";
import { getCertifications } from "@/lib/content";

const CertificatesContent = () => {
  const certificates = useMemo(() => getCertifications(), []);

  return (
    <div className="p-4 sm:p-5 h-full overflow-y-auto" style={{ background: "hsl(210, 20%, 98%)" }}>
      {/* Header section */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            Certifications & Awards
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Professional certifications, achievements, and completed courses.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-sm bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          {certificates.length} Verified
        </div>
      </div>

      {/* Grid Layout for Certificates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.title + index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white rounded-md overflow-hidden flex flex-col h-full"
            style={{
              border: "1px solid hsl(210, 15%, 85%)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            {/* Top accent bar */}
            <div 
              className="h-1.5 w-full" 
              style={{ background: `linear-gradient(90deg, hsl(${(index * 45) % 360}, 70%, 50%), hsl(${(index * 45 + 30) % 360}, 70%, 40%))` }} 
            />

            <div className="p-4 flex-1 flex flex-col">
              {/* Card Header */}
              <div className="flex justify-between items-start mb-3 gap-2">
                <h3 className="font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `hsl(${(index * 45) % 360}, 70%, 95%)` }}
                >
                  <Award className="w-4 h-4" style={{ color: `hsl(${(index * 45) % 360}, 70%, 45%)` }} />
                </div>
              </div>

              {/* Meta Info */}
              <div className="space-y-1.5 mt-auto text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="font-medium text-foreground/80">{cert.issuer}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{cert.date}</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="px-4 py-2.5 bg-muted/30 border-t border-border flex items-center justify-end mt-auto">
              <a
                href={cert.url || (cert.driveId ? `https://drive.google.com/file/d/${cert.driveId}/view` : "#")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                onClick={(e) => {
                  if (!cert.url && !cert.driveId) e.preventDefault();
                }}
              >
                View Credential <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      
      {certificates.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-muted-foreground/20 rounded-md">
          <Award className="w-12 h-12 text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground text-sm">No certificates added yet.</p>
          <p className="text-xs text-muted-foreground/70 mt-1">Add .mdx files to src/contents/certifications/</p>
        </div>
      )}
    </div>
  );
};

export default CertificatesContent;
