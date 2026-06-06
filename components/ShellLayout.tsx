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
      <LeftSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Centered 3-column container */}
      <div className="pt-12" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div className="layout-grid">
          {/* Left spacer — matches sidebar width so feed centers */}
          <div className="hidden md:block" />

          {/* Feed */}
          <main className="min-w-0 py-5">
            {children}
          </main>

          {/* Right sidebar — inline in grid on xl */}
          <div className="hidden lg:block">
            <RightSidebar />
          </div>
        </div>
      </div>

      <ShortcutsModal />
    </>
  );
}
