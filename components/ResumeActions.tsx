"use client";

import { useState } from "react";
import { CalendarDays, Check, Copy, FileText, Printer } from "lucide-react";
import { copyText } from "@/lib/clipboard";

/** Screen-only actions on /resume: print it, copy it as text, or get the official PDF. */
export default function ResumeActions({
  text,
  pdf,
  updated,
  bookingUrl,
}: {
  text: string;
  pdf: string;
  updated?: string;
  bookingUrl?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="resume-actions flex flex-wrap items-center gap-3">
      <button type="button" className="btn btn-secondary btn-sm" onClick={() => window.print()}>
        <Printer size={14} aria-hidden="true" /> Print or save as PDF
      </button>
      <button
        type="button"
        className="btn btn-secondary btn-sm"
        onClick={async () => {
          await copyText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        }}
      >
        {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
        {copied ? "Copied" : "Copy as plain text"}
      </button>
      <a href={pdf} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
        <FileText size={14} aria-hidden="true" /> Official PDF
      </a>
      {bookingUrl && (
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
          <CalendarDays size={14} aria-hidden="true" /> Book a 20-minute call
        </a>
      )}
      {updated && <span className="t-small">PDF updated {updated}</span>}
    </div>
  );
}
