"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar";

interface TopBarProps {
  onMenuToggle?: () => void;
  menuOpen?: boolean;
}

export default function TopBar({ onMenuToggle, menuOpen }: TopBarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-12 bg-surface border-b border-border flex items-center px-4 gap-4">
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-1.5 rounded-md hover:bg-card transition-colors text-text-muted"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-1.5 shrink-0">
        <span className="text-lg font-bold text-accent">SD</span>
        <span className="text-text-muted text-sm font-medium">/ portfolio</span>
      </Link>

      {/* Search — hidden on mobile */}
      <div className="hidden md:flex flex-1 justify-center">
        <SearchBar />
      </div>

      {/* Profile chip */}
      <div className="ml-auto flex items-center gap-2">
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border">
          <Image src="/headshot.png" alt="Saurabh Dusane" fill className="object-cover" sizes="32px" />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-surface online-dot" />
        </div>
      </div>
    </header>
  );
}
