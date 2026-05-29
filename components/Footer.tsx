/**
 * Footer — site-wide footer with social links and tech credits.
 */
"use client";

import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";
import { Mail, Heart } from "lucide-react";
import { personalInfo } from "@/data";

const socials = [
  { icon: FaGithub, href: personalInfo.github, label: "GitHub" },
  { icon: FaLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
  { icon: FaMedium, href: personalInfo.medium, label: "Medium" },
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] mt-12">
      <div className="max-w-6xl mx-auto px-6 py-6 text-center">
        <p className="text-sm text-white/50 mb-4">
          Crafted with{" "}
          <Heart size={14} className="inline text-fuchsia-400 fill-fuchsia-400" />{" "}
          using{" "}
          <span className="text-violet-400 font-semibold">Next.js</span>,{" "}
          <span className="text-fuchsia-400 font-semibold">Tailwind CSS</span> &{" "}
          <span className="text-pink-400 font-semibold">Framer Motion</span>
        </p>
        <div className="flex justify-center gap-3 mb-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/50 transition-all duration-300 hover:bg-violet-500/15 hover:border-violet-500/30 hover:text-violet-300 hover:-translate-y-1"
            >
              <s.icon size={18} />
            </a>
          ))}
        </div>
        <p className="text-xs text-white/30">
          &copy; {new Date().getFullYear()} Saurabh Dusane. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
