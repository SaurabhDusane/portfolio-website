"use client";

import { Share2 } from "lucide-react";

export default function ShareButton({ className = "" }: { className?: string }) {
  return (
    <button
      onClick={() => {
        if (typeof window !== "undefined" && navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
        }
      }}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] transition-colors ${className}`}
      style={{ color: "var(--text-hint)" }}
      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-hint)"; }}
    >
      <Share2 size={13} /> Share
    </button>
  );
}
