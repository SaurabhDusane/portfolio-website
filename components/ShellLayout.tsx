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

      {/* Flex shell: nav + feed + profile */}
      <div className="app-shell">
        {/* Left spacer — matches the fixed sidebar width on md+ */}
        <div className="hidden md:block" style={{ flex: "0 0 240px" }} />

        {/* Feed — grows to fill, capped for readability */}
        <main className="feed-col">
          {children}
        </main>

        {/* Right sidebar */}
        <div className="hidden lg:block" style={{ flex: "0 0 300px", position: "sticky", top: 64, alignSelf: "flex-start" }}>
          <RightSidebar />
        </div>
      </div>

      <ShortcutsModal />
    </>
  );
}
