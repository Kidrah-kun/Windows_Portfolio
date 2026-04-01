import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import { Send, Mail, Github, Linkedin, Code2, MessageSquare, Phone } from "lucide-react";

const ContactContent = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all required fields.");
      return;
    }
    setSending(true);
    try {
      await emailjs.send(
        "service_aae8pk8",
        "template_gpnas2i",
        {
          name: formData.name,
          email: formData.email,
          title: formData.subject,
          message: formData.message,
          time: new Date().toLocaleString(),
        },
        "4bt6AfRgPSo9187UX"
      );
      setSent(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  const socials = [
    { icon: <Mail className="w-5 h-5" />, label: "Email", value: "hardikhathwal.work@gmail.com", href: "mailto:hardikhathwal.work@gmail.com" },
    { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+91 8909656869", href: "tel:+918909656869" },
    { icon: <Github className="w-5 h-5" />, label: "GitHub", value: "github.com/Kidrah-kun", href: "https://github.com/Kidrah-kun" },
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", value: "Hardik Hathwal", href: "https://www.linkedin.com/in/hardik-hathwal-5098b2316/" },
    { icon: <Code2 className="w-5 h-5" />, label: "LeetCode", value: "leetcode.com/u/RNAksMnYN6", href: "https://leetcode.com/u/RNAksMnYN6/" },
  ];

  return (
    <div className="p-3 sm:p-4 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Form */}
        <div className="flex-1">
          <div className="p-1 mb-3 rounded-sm" style={{ background: "hsl(210, 15%, 88%)", border: "1px solid hsl(210, 15%, 78%)" }}>
            <span className="text-[11px] px-2 text-muted-foreground">📧 New Message</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground w-16 text-right">To:</label>
              <div className="flex-1 px-2 py-1 text-xs rounded-sm xp-inset" style={{ background: "hsl(210, 15%, 95%)" }}>
                hardikhathwal.work@gmail.com
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground w-16 text-right">From:</label>
              <input
                type="text"
                placeholder="Your Name"
                className="flex-1 px-2 py-1 text-xs rounded-sm xp-inset focus:outline-none focus:ring-1 focus:ring-primary"
                style={{ background: "hsl(0, 0%, 100%)" }}
                value={formData.name}
                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground w-16 text-right">Email:</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-2 py-1 text-xs rounded-sm xp-inset focus:outline-none focus:ring-1 focus:ring-primary"
                style={{ background: "hsl(0, 0%, 100%)" }}
                value={formData.email}
                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs text-muted-foreground w-16 text-right">Subject:</label>
              <input
                type="text"
                placeholder="Let's work together!"
                className="flex-1 px-2 py-1 text-xs rounded-sm xp-inset focus:outline-none focus:ring-1 focus:ring-primary"
                style={{ background: "hsl(0, 0%, 100%)" }}
                value={formData.subject}
                onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
              />
            </div>

            <div className="flex items-start gap-2">
              <label className="text-xs text-muted-foreground w-16 text-right pt-1">Message:</label>
              <textarea
                rows={5}
                placeholder="Hi Hardik! I'd love to connect..."
                className="flex-1 px-2 py-1 text-xs rounded-sm xp-inset focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                style={{ background: "hsl(0, 0%, 100%)" }}
                value={formData.message}
                onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
              />
            </div>

            <div className="flex justify-end gap-2">
              <motion.button
                type="submit"
                className="xp-btn px-4 py-1.5 text-xs font-bold flex items-center gap-1.5"
                disabled={sending}
                whileTap={{ scale: 0.95 }}
              >
                {sending ? (
                  <>
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>⏳</motion.span>
                    Sending...
                  </>
                ) : sent ? (
                  <>✅ Sent!</>
                ) : (
                  <>
                    <Send className="w-3 h-3" /> Send Message
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>

        {/* Social Links */}
        <div className="w-full sm:w-48 space-y-2">
          <p className="text-xs font-bold text-foreground flex items-center gap-1 mb-3">
            <MessageSquare className="w-3 h-3" /> Connect
          </p>
          {socials.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded-sm text-xs transition-all group"
              style={{
                background: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(210, 15%, 85%)",
              }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 3, boxShadow: "0 2px 8px hsl(0, 0%, 0%, 0.1)" }}
            >
              <span className="text-primary">{social.icon}</span>
              <div>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{social.label}</p>
                <p className="text-[10px] text-muted-foreground truncate">{social.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactContent;
