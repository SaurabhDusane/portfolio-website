"use client";

import { useState, useRef } from "react";
import { Mail, Send, ExternalLink, BookOpen, Loader2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { personalInfo } from "@/data";

/* ─── Contact links ───────────────────────────────────────────────────────── */
interface ContactLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  disabled?: boolean;
  tooltip?: string;
}

const contactLinks: ContactLink[] = [
  { label: "Email", href: `mailto:${personalInfo.email}`, icon: <Mail size={15} /> },
  { label: "LinkedIn", href: personalInfo.linkedin, icon: <FaLinkedin size={15} /> },
  { label: "GitHub", href: personalInfo.github, icon: <FaGithub size={15} /> },
  { label: "Medium", href: personalInfo.medium, icon: <BookOpen size={15} /> },
  ...(personalInfo.instagram
    ? [{ label: "Instagram", href: personalInfo.instagram, icon: <FaInstagram size={15} /> }]
    : [{ label: "Instagram", href: "#", icon: <FaInstagram size={15} />, disabled: true, tooltip: "Coming soon" }]),
];

/* ─── Validation ──────────────────────────────────────────────────────────── */
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(name: string, email: string, message: string): FieldErrors {
  const errs: FieldErrors = {};
  if (!name.trim()) errs.name = "Name is required.";
  if (!email.trim()) errs.email = "Email is required.";
  else if (!emailRe.test(email)) errs.email = "Enter a valid email.";
  if (!message.trim()) errs.message = "Message is required.";
  return errs;
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = (fd.get("name") as string) ?? "";
    const email = (fd.get("email") as string) ?? "";
    const message = (fd.get("message") as string) ?? "";

    const errs = validate(name, email, message);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${personalInfo.formspreeId}`, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg text-[12px] transition-colors focus:outline-none focus:ring-1";

  return (
    <div style={{ maxWidth: 720 }}>
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <Mail size={18} style={{ color: "var(--accent)" }} />
        <h1 className="text-[16px] font-medium" style={{ color: "var(--text)" }}>r/contact</h1>
      </div>

      {/* ── Composer card ──────────────────────────────────────────────── */}
      <div className="reddit-card overflow-hidden mb-5">
        <div className="px-5 py-3" style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
          <h2 className="text-[13px] font-medium" style={{ color: "var(--text)" }}>Send me a message</h2>
          <p className="text-[11px]" style={{ color: "var(--text-hint)" }}>
            I&apos;ll get back to you as soon as I can.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-5 space-y-4" noValidate>
          {/* Name */}
          <div>
            <label htmlFor="contact-name" className="block text-[11px] font-medium mb-1" style={{ color: "var(--text-muted)" }}>
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Your name"
              aria-invalid={!!errors.name}
              className={inputClass}
              style={{
                background: "var(--surface)",
                border: `1px solid ${errors.name ? "var(--accent)" : "var(--border)"}`,
                color: "var(--text)",
              }}
              onChange={() => errors.name && setErrors((p) => ({ ...p, name: undefined }))}
            />
            {errors.name && <p className="text-[10px] mt-0.5" style={{ color: "var(--accent)" }}>{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="contact-email" className="block text-[11px] font-medium mb-1" style={{ color: "var(--text-muted)" }}>
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              className={inputClass}
              style={{
                background: "var(--surface)",
                border: `1px solid ${errors.email ? "var(--accent)" : "var(--border)"}`,
                color: "var(--text)",
              }}
              onChange={() => errors.email && setErrors((p) => ({ ...p, email: undefined }))}
            />
            {errors.email && <p className="text-[10px] mt-0.5" style={{ color: "var(--accent)" }}>{errors.email}</p>}
          </div>

          {/* Subject (optional) */}
          <div>
            <label htmlFor="contact-subject" className="block text-[11px] font-medium mb-1" style={{ color: "var(--text-muted)" }}>
              Subject <span style={{ color: "var(--text-hint)" }}>(optional)</span>
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              placeholder="What's this about?"
              className={inputClass}
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="contact-message" className="block text-[11px] font-medium mb-1" style={{ color: "var(--text-muted)" }}>
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              placeholder="What's on your mind?"
              aria-invalid={!!errors.message}
              className={`${inputClass} resize-y`}
              style={{
                background: "var(--surface)",
                border: `1px solid ${errors.message ? "var(--accent)" : "var(--border)"}`,
                color: "var(--text)",
              }}
              onChange={() => errors.message && setErrors((p) => ({ ...p, message: undefined }))}
            />
            {errors.message && <p className="text-[10px] mt-0.5" style={{ color: "var(--accent)" }}>{errors.message}</p>}
          </div>

          {/* Submit row */}
          <div className="flex items-center justify-between pt-1">
            <div className="text-[11px]" aria-live="polite">
              {status === "sent" && (
                <span style={{ color: "var(--success)" }}>Thanks — I&apos;ll get back to you.</span>
              )}
              {status === "error" && (
                <span style={{ color: "var(--accent)" }}>Something went wrong. Please try again.</span>
              )}
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full text-white text-[12px] font-medium transition-colors disabled:opacity-50"
              style={{ background: "var(--accent)" }}
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  Sending&hellip;
                </>
              ) : (
                <>
                  <Send size={13} />
                  Send message
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ── Reach me here ──────────────────────────────────────────────── */}
      <section>
        <h2 className="text-[13px] font-medium mb-3 px-1" style={{ color: "var(--text)" }}>
          You can also reach me here
        </h2>
        <div className="contact-links-grid">
          {contactLinks.map((link) =>
            link.disabled ? (
              <span
                key={link.label}
                title={link.tooltip}
                className="reddit-card flex items-center gap-2.5 px-4 py-3 rounded-lg text-[12px] font-medium cursor-default opacity-50"
                style={{ color: "var(--text-hint)" }}
              >
                {link.icon}
                {link.label}
              </span>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="reddit-card card-lift flex items-center gap-2.5 px-4 py-3 rounded-lg text-[12px] font-medium transition-all"
                style={{ color: "var(--text-muted)" }}
              >
                {link.icon}
                <span className="flex-1">{link.label}</span>
                <ExternalLink size={11} style={{ color: "var(--text-hint)" }} />
              </a>
            )
          )}
        </div>
      </section>
    </div>
  );
}
