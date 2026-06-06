"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderGit2, PenLine, User, Mail, ChevronDown, GraduationCap, Briefcase } from "lucide-react";

const navItems = [
  { href: "/", label: "r/home", icon: Home },
  { href: "/projects", label: "r/projects", icon: FolderGit2 },
  { href: "/writing", label: "r/writing", icon: PenLine },
  { href: "/about", label: "r/about", icon: User },
  { href: "/contact", label: "r/contact", icon: Mail },
];

const aboutSubItems = [
  { hash: "#education", label: "Education", icon: GraduationCap },
  { hash: "#experience", label: "Experience", icon: Briefcase },
];

interface LeftSidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export default function LeftSidebar({ open, onClose }: LeftSidebarProps) {
  const pathname = usePathname();
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const subRef = useRef<HTMLDivElement>(null);
  const [subHeight, setSubHeight] = useState(0);

  useEffect(() => {
    if (subRef.current) {
      setSubHeight(aboutExpanded ? subRef.current.scrollHeight : 0);
    }
  }, [aboutExpanded]);

  const isAboutActive = pathname === "/about" || pathname.startsWith("/about");

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-12 bottom-0 z-40 flex flex-col py-3 px-2 gap-0.5 overflow-y-auto transition-transform duration-200 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          width: 240,
          left: 0,
          background: "var(--surface)",
          borderRight: "1px solid var(--border)",
        }}
      >
        <nav className="flex flex-col gap-0.5" aria-label="Main navigation">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));

            if (href === "/about") {
              return (
                <div key={href}>
                  <div className="flex items-center">
                    <Link
                      href="/about"
                      onClick={onClose}
                      className="flex-1 flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors"
                      style={{
                        background: isAboutActive ? "rgba(255,69,0,0.08)" : "transparent",
                        color: isAboutActive ? "var(--accent)" : "var(--text-muted)",
                      }}
                    >
                      <Icon size={16} />
                      {label}
                    </Link>
                    <button
                      onClick={() => setAboutExpanded(!aboutExpanded)}
                      aria-expanded={aboutExpanded}
                      aria-label="Toggle about sub-items"
                      className="p-1.5 rounded transition-transform"
                      style={{ color: "var(--text-hint)" }}
                    >
                      <ChevronDown
                        size={13}
                        className="nav-chevron"
                        style={{ transform: aboutExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
                      />
                    </button>
                  </div>
                  {/* Sub-items */}
                  <div
                    ref={subRef}
                    className="overflow-hidden nav-sub-expand"
                    style={{ maxHeight: aboutExpanded ? subHeight || 100 : 0 }}
                  >
                    <div className="flex flex-col gap-0.5 pl-7 pt-0.5 pb-0.5">
                      {aboutSubItems.map(({ hash, label: subLabel, icon: SubIcon }) => {
                        const subActive = isAboutActive && typeof window !== "undefined" && window.location.hash === hash;
                        return (
                          <Link
                            key={hash}
                            href={`/about${hash}`}
                            onClick={onClose}
                            className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[12px] transition-colors"
                            style={{
                              color: subActive ? "var(--accent)" : "var(--text-hint)",
                            }}
                          >
                            <SubIcon size={13} />
                            {subLabel}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors"
                style={{
                  background: active ? "rgba(255,69,0,0.08)" : "transparent",
                  color: active ? "var(--accent)" : "var(--text-muted)",
                }}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-3 px-1">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center w-full px-4 py-2 rounded-full text-white text-[13px] font-medium transition-colors"
            style={{ background: "var(--accent)" }}
          >
            Get in touch
          </Link>
        </div>
      </aside>
    </>
  );
}
