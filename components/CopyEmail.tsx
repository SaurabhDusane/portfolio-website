"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { copyText } from "@/lib/clipboard";

/**
 * Copies an email address to the clipboard and confirms with a small
 * "Copied" bubble. mailto: links do nothing for many visitors (webmail,
 * locked-down work laptops), so this sits next to them as a reliable path.
 *
 * - variant "icon":   square icon button, for next to an "Email me" button
 * - variant "inline": small text button, for next to a written-out address
 */
export default function CopyEmail({ email, variant = "icon" }: { email: string; variant?: "icon" | "inline" }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    await copyText(email);
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  const label = copied ? "Email copied" : "Copy email address";

  return (
    <span className="copy-email">
      <button
        type="button"
        onClick={copy}
        className={variant === "icon" ? "icon-btn copy-email-icon" : "copy-email-inline"}
        aria-label={variant === "icon" ? label : undefined}
        title={label}
      >
        {copied ? <Check size={variant === "icon" ? 18 : 14} /> : <Copy size={variant === "icon" ? 18 : 14} />}
        {variant === "inline" && <span>{copied ? "Copied" : "Copy"}</span>}
      </button>
      <span className="copy-email-bubble" data-show={copied} role="status" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </span>
  );
}
