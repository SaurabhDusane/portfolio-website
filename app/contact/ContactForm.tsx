"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, FileText, Loader2, Send } from "lucide-react";
import { contactIntents } from "@/data/contact";
import { copyText } from "@/lib/clipboard";
import { track } from "@/lib/analytics";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DRAFT_KEY = "contact-draft";
const FIELDS = ["intent", "name", "email", "subject", "message"] as const;
const DEFAULT_HINT = "What would you like to talk about?";

type Draft = Partial<Record<(typeof FIELDS)[number], string>>;

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

// Drafts live in this browser only; storage can be missing or blocked, so every access is guarded.
function readDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
}
function writeDraft(d: Draft) {
  try {
    if (Object.values(d).some((v) => v?.trim())) localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
    else localStorage.removeItem(DRAFT_KEY);
  } catch {}
}
function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {}
}

/** The email subject: the chosen intent as a tag, then the visitor's subject or a default. */
function finalSubject(intentId: string, subject: string) {
  const tag = contactIntents.find((i) => i.id === intentId)?.tag;
  const rest = subject.trim() || "Message from saurabhdusane.com";
  return tag ? `[${tag}] ${rest}` : rest;
}

interface Props {
  formspreeId: string;
  email: string;
  resumePath: string;
  replyTime: string;
}

/**
 * Contact form. A "what's this about?" choice tags the subject and changes the
 * message hint. The draft is kept in this browser until it sends, a hidden
 * field traps bots, and a failed send offers the message to copy instead.
 * On success the form is replaced by a summary, and a pulse runs across the
 * background graph from the send button.
 */
export default function ContactForm({ formspreeId, email, resumePath, replyTime }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const sentRef = useRef<HTMLDivElement>(null);
  const [intent, setIntent] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [restored, setRestored] = useState(false);
  const [sent, setSent] = useState<{ name: string; email: string; subject: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // Restore a saved draft once, after hydration. A link like /contact?intent=hiring
  // preselects that choice, and wins over the draft's.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("intent");
    const d = { ...readDraft() };
    if (fromUrl && contactIntents.some((i) => i.id === fromUrl)) d.intent = fromUrl;
    const form = formRef.current;
    if (!form || !Object.values(d).some((v) => v?.trim())) return;
    for (const key of FIELDS) {
      const value = d[key];
      if (!value || key === "intent") continue;
      const el = form.elements.namedItem(key);
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) el.value = value;
    }
    // Restoring from browser storage has to happen after mount, so these updates belong in the effect.
    /* eslint-disable react-hooks/set-state-in-effect */
    if (d.intent && contactIntents.some((i) => i.id === d.intent)) setIntent(d.intent);
    setRestored(FIELDS.some((k) => k !== "intent" && d[k]?.trim()));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (status === "sent") sentRef.current?.focus();
  }, [status]);

  const snapshot = (): Draft => {
    const fd = new FormData(formRef.current!);
    return Object.fromEntries(FIELDS.map((k) => [k, String(fd.get(k) ?? "")]));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const d = snapshot();
    const errs = validate(d.name!, d.email!, d.message!);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const subject = finalSubject(d.intent!, d.subject!);
    const button = (e.nativeEvent as SubmitEvent).submitter ?? form.querySelector("button[type=submit]");
    const finish = () => {
      track("Contact sent", { intent: contactIntents.find((i) => i.id === d.intent)?.label ?? "none" });
      setSent({ name: d.name!.trim(), email: d.email!.trim(), subject });
      setStatus("sent");
      clearDraft();
      form.reset();
      setIntent("");
      setRestored(false);
      const r = button?.getBoundingClientRect();
      if (r) {
        window.dispatchEvent(
          new CustomEvent("bg-signal", { detail: { x: r.left + r.width / 2, y: r.top + r.height / 2, hops: 16 } })
        );
      }
    };

    // Bots fill every field, including the hidden one. Pretend it worked and send nothing.
    if (String(fd.get("_gotcha") ?? "")) return finish();

    fd.set("_subject", subject);
    const intentLabel = contactIntents.find((i) => i.id === d.intent)?.label;
    if (intentLabel) fd.set("intent", intentLabel);
    else fd.delete("intent");

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      if (res.ok) finish();
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const copyMessage = async () => {
    const d = snapshot();
    await copyText(`Subject: ${finalSubject(d.intent!, d.subject!)}\n\n${d.message!.trim()}\n\n— ${d.name!.trim()} <${d.email!.trim()}>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const clear = (key: keyof FieldErrors) => () => errors[key] && setErrors((p) => ({ ...p, [key]: undefined }));
  const active = contactIntents.find((i) => i.id === intent);

  if (status === "sent" && sent) {
    return (
      <div ref={sentRef} tabIndex={-1} className="contact-sent" role="status">
        <p className="contact-sent-title">
          <Check size={18} aria-hidden="true" /> Message sent
        </p>
        <dl className="contact-sent-details mt-4">
          <div>
            <dt className="t-small">From</dt>
            <dd>
              {sent.name} &lt;{sent.email}&gt;
            </dd>
          </div>
          <div>
            <dt className="t-small">Subject</dt>
            <dd>{sent.subject}</dd>
          </div>
        </dl>
        <p className="t-body mt-4">{replyTime} I’ll write back to the address above.</p>
        <button
          type="button"
          className="btn btn-secondary mt-5"
          onClick={() => {
            setSent(null);
            setStatus("idle");
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onInput={() => writeDraft(snapshot())}
      noValidate
      className="flex flex-col gap-5"
    >
      <fieldset>
        <legend className="block text-[14px] font-medium mb-2">
          What’s this about? <span style={{ color: "var(--text-hint)", fontWeight: 400 }}>(optional)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {contactIntents.map((i) => (
            <label key={i.id} className="intent-chip">
              <input
                type="radio"
                name="intent"
                value={i.id}
                checked={intent === i.id}
                onChange={() => setIntent(i.id)}
                className="sr-only"
              />
              {i.label}
            </label>
          ))}
        </div>
        {active?.showResume && (
          <p className="t-small mt-3">
            My resume is here if it helps:{" "}
            <a href={resumePath} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
              <FileText size={14} aria-hidden="true" /> Download PDF
            </a>
          </p>
        )}
      </fieldset>

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
          placeholder={active?.hint ?? DEFAULT_HINT}
          className="field resize-y"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          onChange={clear("message")}
        />
        <FieldError id="contact-message-error" text={errors.message} />
      </div>

      {/* Spam trap: hidden from people and screen readers; Formspree drops submissions that fill it. */}
      <div className="contact-trap" aria-hidden="true">
        <label htmlFor="contact-gotcha">Leave this empty</label>
        <input id="contact-gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
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
        {restored && status === "idle" && (
          <p className="t-small">
            Your unsent draft is back.{" "}
            <button
              type="button"
              className="link"
              onClick={() => {
                formRef.current?.reset();
                setIntent("");
                setErrors({});
                clearDraft();
                setRestored(false);
              }}
            >
              Clear it
            </button>
          </p>
        )}
      </div>

      <div aria-live="polite">
        {status === "error" && (
          <div className="contact-error">
            <p className="text-[14px]" style={{ color: "var(--text)" }}>
              The message didn’t send. Your draft is saved in this browser, so you can try again, or copy it and
              email it to <a href={`mailto:${email}`} className="link break-words">{email}</a>.
            </p>
            <button type="button" className="btn btn-secondary btn-sm mt-3" onClick={copyMessage}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy your message"}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
