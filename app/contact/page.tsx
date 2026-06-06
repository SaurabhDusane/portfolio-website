"use client";

import { useState } from "react";
import { Mail, Send, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";
import { personalInfo } from "@/data";

const quickLinks = [
  { label: "Email", href: `mailto:${personalInfo.email}`, icon: <Mail size={14} />, color: "var(--accent)" },
  { label: "LinkedIn", href: personalInfo.linkedin, icon: <FaLinkedin size={14} />, color: "var(--link)" },
  { label: "GitHub", href: personalInfo.github, icon: <FaGithub size={14} />, color: "var(--text)" },
  { label: "Medium", href: personalInfo.medium, icon: <FaMedium size={14} />, color: "var(--success)" },
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      // TODO: add your Formspree or form handler endpoint
      const res = await fetch("https://formspree.io/f/xblgpjrp", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Mail size={22} className="text-accent" />
        <h1 className="text-xl font-bold text-text">r/contact</h1>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap gap-2 mb-4">
        {quickLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full reddit-card text-xs font-medium text-text-muted hover:text-text transition-colors"
          >
            {link.icon}
            {link.label}
            <ExternalLink size={10} />
          </a>
        ))}
      </div>

      {/* Composer card */}
      <div className="reddit-card overflow-hidden">
        <div className="px-4 py-2.5 border-b border-border bg-surface/50">
          <h2 className="text-sm font-semibold text-text">Create a message</h2>
          <p className="text-xs text-text-muted">Send me a direct message — I'll get back to you soon.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-text-muted mb-1">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm text-text placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-text-muted mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm text-text placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-xs font-medium text-text-muted mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="What's on your mind?"
              className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm text-text placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors resize-y"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-text-muted">
              {status === "sent" && <span className="text-success">Message sent! I'll reply soon.</span>}
              {status === "error" && <span className="text-accent">Something went wrong. Try again.</span>}
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-white text-sm font-bold hover:bg-accent-2 transition-colors disabled:opacity-50"
            >
              <Send size={14} />
              {status === "sending" ? "Sending..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
