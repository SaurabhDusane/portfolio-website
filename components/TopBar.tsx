"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";

interface TopBarProps {
  onMenuToggle?: () => void;
  menuOpen?: boolean;
}

export default function TopBar({ onMenuToggle, menuOpen }: TopBarProps) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-12 flex items-center px-4 gap-4"
      style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}
    >
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-1.5 rounded-md transition-colors"
        style={{ color: "var(--text-muted)" }}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <Link href="/" className="flex items-center gap-1.5 shrink-0">
        <span className="text-lg font-medium" style={{ color: "var(--accent)" }}>SD</span>
        <span className="text-sm" style={{ color: "var(--text-hint)" }}>/ portfolio</span>
      </Link>

      <div className="hidden md:flex flex-1 justify-center">
        <SearchBar />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative w-8 h-8 rounded-full overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          <Image src="/headshot.png" alt="Saurabh Dusane" fill className="object-cover" sizes="32px" />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 online-dot" style={{ background: "var(--success)", borderColor: "var(--surface)" }} />
        </div>
      </div>
    </header>
  );
}
