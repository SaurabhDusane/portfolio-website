"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(name: string, email: string, message: string): FieldErrors {
  const errs: FieldErrors = {};
  if (!name.trim()) errs.name = "Please add your name.";
  if (!email.trim()) errs.email = "Please add your email.";
  else if (!emailRe.test(email)) errs.email = "That email doesn’t look right.";
  if (!message.trim()) errs.message = "Please write a message.";
  return errs;
}

function FieldError({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p id={id} className="mt-1.5 text-[14px]" style={{ color: "var(--accent)" }}>
      {text}
    </p>
  );
}

export default function ContactForm({ formspreeId }: { formspreeId: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const errs = validate(String(fd.get("name") ?? ""), String(fd.get("email") ?? ""), String(fd.get("message") ?? ""));
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: fd,
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

  const clear = (key: keyof FieldErrors) => () => errors[key] && setErrors((p) => ({ ...p, [key]: undefined }));

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-[14px] font-medium mb-1.5">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            className="field"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            onChange={clear("name")}
          />
          <FieldError id="contact-name-error" text={errors.name} />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-[14px] font-medium mb-1.5">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            className="field"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            onChange={clear("email")}
          />
          <FieldError id="contact-email-error" text={errors.email} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-[14px] font-medium mb-1.5">
          Subject <span style={{ color: "var(--text-hint)", fontWeight: 400 }}>(optional)</span>
        </label>
        <input id="contact-subject" name="subject" type="text" className="field" />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-[14px] font-medium mb-1.5">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          className="field resize-y"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          onChange={clear("message")}
        />
        <FieldError id="contact-message-error" text={errors.message} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
          {status === "sending" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send size={16} /> Send message
            </>
          )}
        </button>
        <p className="text-[14px]" aria-live="polite">
          {status === "sent" && <span style={{ color: "var(--success)" }}>Thanks, your message is on its way.</span>}
          {status === "error" && (
            <span style={{ color: "var(--accent)" }}>Something went wrong. Please try again or email me directly.</span>
          )}
        </p>
      </div>
    </form>
  );
}
