/**
 * Contact page — social links + Formspree contact form.
 */
"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  MapPin,
  Laptop,
  Rocket,
  MessageSquare,
  User,
  AtSign,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { personalInfo } from "@/data";
import Button from "@/components/Button";
import PageTransition from "@/components/PageTransition";

/* ── Social links ──────────────────────────────────────────────────────────── */
const socials = [
  { icon: FaGithub, label: "GitHub", sub: "SaurabhDusane", href: personalInfo.github },
  { icon: FaLinkedin, label: "LinkedIn", sub: "saurabh-dusane", href: personalInfo.linkedin },
  { icon: FaMedium, label: "Medium", sub: "@saurndusane13", href: personalInfo.medium },
  { icon: FaXTwitter, label: "X / Twitter", sub: "@SaurabhDusane", href: personalInfo.twitter },
  { icon: Mail, label: "Email", sub: personalInfo.email, href: `mailto:${personalInfo.email}` },
];

/* ── Shared input classes ──────────────────────────────────────────────────── */
const inputCls =
  "w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white/90 text-sm placeholder:text-white/30 outline-none transition-all duration-200 focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/10 hover:border-white/20";

/* ══════════════════════════════════════════════════════════════════════════════ */

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;

    try {
      const res = await fetch(`https://formspree.io/f/${personalInfo.formspreeId}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <PageTransition className="max-w-4xl mx-auto px-6 pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-5"
      >
        <h1
          className="text-2xl font-bold text-white/90 inline-flex items-center gap-3"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <Mail size={24} className="text-violet-400" aria-hidden="true" /> Get In Touch
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ── Social links ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="glass p-6 h-full hover:shadow-lg hover:shadow-violet-500/[0.06]">
            <h2
              className="text-lg font-bold text-white/90 mb-2 flex items-center gap-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <MessageSquare size={18} className="text-violet-400" aria-hidden="true" /> Let&apos;s Connect
            </h2>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Whether you have a project in mind, want to discuss AI/ML, or just want to say hello — I&apos;d love to hear from you.
            </p>

            <div className="space-y-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-all duration-200 hover:bg-white/[0.06] hover:border-violet-500/20 hover:-translate-y-0.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/50 group-hover:text-white transition-colors">
                    <s.icon size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white/80 group-hover:text-violet-300 transition-colors">
                      {s.label}
                    </div>
                    <div className="text-xs text-white/40">{s.sub}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Contact form ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="glass p-6 h-full hover:shadow-lg hover:shadow-violet-500/[0.06]">
            <h2
              className="text-lg font-bold text-white/90 mb-5 flex items-center gap-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <Send size={18} className="text-fuchsia-400" aria-hidden="true" /> Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="flex items-center gap-2 text-sm text-white/70 font-semibold mb-2">
                  <User size={14} aria-hidden="true" /> Your Name
                </label>
                <input id="name" type="text" name="name" required className={inputCls} placeholder="John Doe" />
              </div>
              <div>
                <label htmlFor="email" className="flex items-center gap-2 text-sm text-white/70 font-semibold mb-2">
                  <AtSign size={14} aria-hidden="true" /> Your Email
                </label>
                <input id="email" type="email" name="email" required className={inputCls} placeholder="john@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="flex items-center gap-2 text-sm text-white/70 font-semibold mb-2">
                  <MessageSquare size={14} aria-hidden="true" /> Message
                </label>
                <textarea id="message" name="message" required rows={5} className={`${inputCls} resize-none`} placeholder="Tell me about your project or idea..." />
              </div>

              <Button type="submit" disabled={status === "sending"} className="w-full">
                <Send size={16} />
                {status === "sending" ? "Sending..." : "Send Message"}
              </Button>

              {status === "success" && (
                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-emerald-400 text-sm font-semibold text-center">
                  Message sent successfully! I&apos;ll get back to you soon.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm font-semibold text-center">
                  Failed to send. Please try again or email me directly.
                </motion.p>
              )}
            </form>
          </div>
        </motion.div>
      </div>

      {/* Opportunities */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass p-6 text-center mt-8"
      >
        <h3 className="text-lg font-bold text-white/90 mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          <Rocket size={18} className="inline text-amber-400 mr-2" aria-hidden="true" />
          Actively Seeking Opportunities
        </h3>
        <p className="text-sm text-white/60 leading-relaxed mb-2 max-w-2xl mx-auto">
          I&apos;m looking for <strong className="text-violet-300">full-time, internship, and contract roles</strong> in AI/ML Engineering, Data Science, and Applied Research.
        </p>
        <p className="text-xs text-white/40">
          <MapPin size={12} className="inline text-violet-400 mr-1" aria-hidden="true" /> Open to relocation &nbsp;|&nbsp;
          <Laptop size={12} className="inline text-violet-400 mr-1" aria-hidden="true" /> Remote-friendly
        </p>
      </motion.div>
    </PageTransition>
  );
}
