"use client";

import { useState, FormEvent } from "react";
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
import { personalInfo } from "@/lib/data";

const socials = [
  {
    icon: FaGithub,
    label: "GitHub",
    sub: "SaurabhDusane",
    href: personalInfo.github,
    color: "hover:border-white/20",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    sub: "saurabh-dusane",
    href: personalInfo.linkedin,
    color: "hover:border-blue-500/30",
  },
  {
    icon: FaMedium,
    label: "Medium",
    sub: "@saurndusane13",
    href: personalInfo.medium,
    color: "hover:border-green-500/30",
  },
  {
    icon: FaXTwitter,
    label: "X / Twitter",
    sub: "@SaurabhDusane",
    href: personalInfo.twitter,
    color: "hover:border-sky-500/30",
  },
  {
    icon: Mail,
    label: "Email",
    sub: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: "hover:border-purple-500/30",
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${personalInfo.formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1
          className="text-2xl font-bold text-white/90 inline-flex items-center gap-3"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <Mail size={24} className="text-indigo-400" /> Get In Touch
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Social links */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="glass p-8 h-full">
            <h2
              className="text-lg font-bold text-white/90 mb-2 flex items-center gap-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <MessageSquare size={18} className="text-indigo-400" /> Let&apos;s
              Connect
            </h2>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Whether you have a project in mind, want to discuss AI/ML, or just
              want to say hello — I&apos;d love to hear from you.
            </p>

            <div className="space-y-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-0.5 ${s.color}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center text-white/60 group-hover:text-white transition-colors">
                    <s.icon size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white/80 group-hover:text-purple-300 transition-colors">
                      {s.label}
                    </div>
                    <div className="text-xs text-white/40">{s.sub}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Contact form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="glass p-8 h-full">
            <h2
              className="text-lg font-bold text-white/90 mb-6 flex items-center gap-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              <Send size={18} className="text-purple-400" /> Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="flex items-center gap-2 text-sm text-white/70 font-semibold mb-2">
                  <User size={14} /> Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white/90 text-sm placeholder:text-white/30 outline-none transition-all duration-300 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 hover:border-white/20"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-white/70 font-semibold mb-2">
                  <AtSign size={14} /> Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white/90 text-sm placeholder:text-white/30 outline-none transition-all duration-300 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 hover:border-white/20"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm text-white/70 font-semibold mb-2">
                  <MessageSquare size={14} /> Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white/90 text-sm placeholder:text-white/30 outline-none transition-all duration-300 focus:border-purple-500/40 focus:ring-2 focus:ring-purple-500/10 hover:border-white/20 resize-none"
                  placeholder="Tell me about your project or idea..."
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={16} />
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-emerald-400 text-sm font-semibold text-center"
                >
                  Message sent successfully! I&apos;ll get back to you soon.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm font-semibold text-center"
                >
                  Failed to send. Please try again or email me directly.
                </motion.p>
              )}
            </form>
          </div>
        </motion.div>
      </div>

      {/* Opportunities Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass p-8 text-center mt-10"
      >
        <h3
          className="text-lg font-bold text-white/90 mb-3"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <Rocket size={18} className="inline text-amber-400 mr-2" />
          Actively Seeking Opportunities
        </h3>
        <p className="text-sm text-white/70 leading-relaxed mb-3 max-w-2xl mx-auto">
          I&apos;m looking for{" "}
          <strong className="text-purple-300">
            full-time, internship, and contract roles
          </strong>{" "}
          in AI/ML Engineering, Data Science, and Applied Research. I bring
          production ML experience, a 4.0 GPA, and a track record of shipping
          systems that move metrics.
        </p>
        <p className="text-xs text-white/50">
          <MapPin size={12} className="inline text-purple-400 mr-1" /> Open to
          relocation &nbsp;|&nbsp;{" "}
          <Laptop size={12} className="inline text-purple-400 mr-1" />{" "}
          Remote-friendly
        </p>
      </motion.div>
    </div>
  );
}
