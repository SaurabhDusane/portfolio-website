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
      <div className="pt-12 lg:pl-56 xl:pr-72 min-h-screen">
        <main className="max-w-2xl mx-auto px-4 py-6">
          {children}
        </main>
      </div>
      <RightSidebar />
      <ShortcutsModal />
    </>
  );
}
