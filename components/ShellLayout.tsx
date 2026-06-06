"use client";

import { useState } from "react";
import TopBar from "./TopBar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import ShortcutsModal from "./ShortcutsModal";

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <TopBar onMenuToggle={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
      <div className="pt-12 max-w-[1100px] mx-auto" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>
        {/* Mobile: single column */}
        <LeftSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

        <div className="lg:grid lg:gap-0" style={{ gridTemplateColumns: "180px minmax(0, 640px) 240px" }}>
          {/* Left sidebar — desktop only, inside grid */}
          <div className="hidden lg:block" />

          {/* Feed */}
          <main className="px-4 py-5 min-w-0">
            {children}
          </main>

          {/* Right sidebar — desktop only */}
          <div className="hidden xl:block">
            <RightSidebar />
          </div>
        </div>
      </div>
      <ShortcutsModal />
    </>
  );
}
