"use client";

import { useState } from "react";
import { Mail, Send, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";
import { personalInfo } from "@/data";

const quickLinks = [
  { label: "Email", href: `mailto:${personalInfo.email}`, icon: <Mail size={13} /> },
  { label: "LinkedIn", href: personalInfo.linkedin, icon: <FaLinkedin size={13} /> },
  { label: "GitHub", href: personalInfo.github, icon: <FaGithub size={13} /> },
  { label: "Medium", href: personalInfo.medium, icon: <FaMedium size={13} /> },
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/xblgpjrp", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) { setStatus("sent"); form.reset(); }
      else { setStatus("error"); }
    } catch { setStatus("error"); }
  };

  return (
    <>
      <div className="flex items-center gap-2.5 mb-4">
        <Mail size={18} style={{ color: "var(--accent)" }} />
        <h1 className="text-[16px] font-medium" style={{ color: "var(--text)" }}>r/contact</h1>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {quickLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full reddit-card text-[11px] font-medium transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            {link.icon}
            {link.label}
            <ExternalLink size={9} />
          </a>
        ))}
      </div>

      <div className="reddit-card overflow-hidden">
        <div className="px-4 py-2.5" style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
          <h2 className="text-[13px] font-medium" style={{ color: "var(--text)" }}>Create a message</h2>
          <p className="text-[11px]" style={{ color: "var(--text-hint)" }}>Send me a direct message &mdash; I'll get back to you soon.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3.5">
          <div>
            <label htmlFor="name" className="block text-[11px] font-medium mb-1" style={{ color: "var(--text-muted)" }}>Name</label>
            <input
              id="name" name="name" type="text" required placeholder="Your name"
              className="w-full px-3 py-2 rounded-lg text-[12px] transition-colors focus:outline-none"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-[11px] font-medium mb-1" style={{ color: "var(--text-muted)" }}>Email</label>
            <input
              id="email" name="email" type="email" required placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-lg text-[12px] transition-colors focus:outline-none"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-[11px] font-medium mb-1" style={{ color: "var(--text-muted)" }}>Message</label>
            <textarea
              id="message" name="message" required rows={5} placeholder="What's on your mind?"
              className="w-full px-3 py-2 rounded-lg text-[12px] transition-colors focus:outline-none resize-y"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-[11px]">
              {status === "sent" && <span style={{ color: "var(--success)" }}>Message sent! I'll reply soon.</span>}
              {status === "error" && <span style={{ color: "var(--accent)" }}>Something went wrong. Try again.</span>}
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full text-white text-[12px] font-medium transition-colors disabled:opacity-50"
              style={{ background: "var(--accent)" }}
            >
              <Send size={13} />
              {status === "sending" ? "Sending..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
