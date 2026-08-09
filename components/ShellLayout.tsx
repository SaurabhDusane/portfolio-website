"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import TopBar from "./TopBar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import ShortcutsModal from "./ShortcutsModal";
import PageTransition from "./PageTransition";

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isWide = pathname === "/projects" || pathname === "/writing" || pathname === "/about" || pathname === "/contact";

  return (
    <>
      <TopBar onMenuToggle={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
      <LeftSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Flex shell: nav + content */}
      <div className="app-shell">
        {/* Left spacer — matches the fixed sidebar width on md+ */}
        <div className="hidden md:block" style={{ flex: "0 0 240px" }} />

        {isHome ? (
          <main className="flex-1 min-w-0 py-2">
            <PageTransition key={pathname}>{children}</PageTransition>
          </main>
        ) : isWide ? (
          <main className="flex-1 min-w-0 py-4">
            <PageTransition key={pathname}>{children}</PageTransition>
          </main>
        ) : (
          <>
            <main className="feed-col">
              <PageTransition key={pathname}>{children}</PageTransition>
            </main>
            <div className="hidden lg:block" style={{ flex: "0 0 300px", position: "sticky", top: 64, alignSelf: "flex-start" }}>
              <RightSidebar />
            </div>
          </>
        )}
      </div>

      <ShortcutsModal />
    </>
  );
}
