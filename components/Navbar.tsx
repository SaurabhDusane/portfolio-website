/**
 * Navbar — persistent top navigation bar.
 * Features: animated active-route pill, mobile hamburger, Escape-to-close,
 * aria attributes for accessibility, glassmorphism backdrop.
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, FolderGit2, PenLine, Mail, Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/bio", label: "Bio", icon: User },
  { href: "/projects", label: "Projects", icon: FolderGit2 },
  { href: "/writing", label: "Writing", icon: PenLine },
  { href: "/contact", label: "Contact", icon: Mail },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  /* Close mobile menu on route change */
  useEffect(() => setOpen(false), [pathname]);

  /* Close on Escape */
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a0f1e]/70 border-b border-white/[0.06]"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-lg tracking-tight text-white/90 hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="gradient-text">SD</span>
            <span className="text-white/60 ml-1 font-normal text-sm hidden sm:inline">
              / portfolio
            </span>
          </Link>

          {/* Desktop nav — pill-style active indicator */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] rounded-full px-2 py-1.5">
            {links.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navPill"
                      className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <Icon size={16} className="relative z-10" aria-hidden="true" />
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0a0f1e]/90 backdrop-blur-2xl border-b border-white/10"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-violet-500/15 text-white border border-violet-500/20"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={18} aria-hidden="true" />
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
