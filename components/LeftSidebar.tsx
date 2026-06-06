"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderGit2, PenLine, User, Mail } from "lucide-react";

const navItems = [
  { href: "/", label: "r/home", icon: Home },
  { href: "/projects", label: "r/projects", icon: FolderGit2 },
  { href: "/writing", label: "r/writing", icon: PenLine },
  { href: "/about", label: "r/about", icon: User },
  { href: "/contact", label: "r/contact", icon: Mail },
];

interface LeftSidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export default function LeftSidebar({ open, onClose }: LeftSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-12 left-0 bottom-0 z-40 flex flex-col py-3 px-2 gap-0.5 overflow-y-auto transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: 180, background: "var(--surface)", borderRight: "1px solid var(--border)" }}
      >
        <nav className="flex flex-col gap-0.5" aria-label="Main navigation">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
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
