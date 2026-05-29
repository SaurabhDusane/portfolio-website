/**
 * Button — reusable gradient or ghost button with hover micro-interaction.
 * Supports link mode (renders <a>) or button mode (renders <button>).
 */
"use client";

import Link from "next/link";
import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  /** "primary" = gradient fill, "ghost" = transparent outline */
  variant?: "primary" | "ghost";
  href?: string;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  href,
  external = false,
  type = "button",
  disabled = false,
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e] disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/25 active:translate-y-0",
    ghost:
      "border border-white/10 text-white/70 hover:bg-white/[0.06] hover:text-white hover:border-white/20 hover:-translate-y-0.5 active:translate-y-0",
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  /* External link */
  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  /* Internal link */
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  /* Button */
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
