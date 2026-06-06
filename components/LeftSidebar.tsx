"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderGit2, PenLine, User, Mail } from "lucide-react";

const navItems = [
  { href: "/", label: "r/home", icon: Home, desc: "Welcome & overview" },
  { href: "/projects", label: "r/projects", icon: FolderGit2, desc: "My work & impact" },
  { href: "/writing", label: "r/writing", icon: PenLine, desc: "Essays & articles" },
  { href: "/about", label: "r/about", icon: User, desc: "Profile & experience" },
  { href: "/contact", label: "r/contact", icon: Mail, desc: "Send a message" },
];

interface LeftSidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export default function LeftSidebar({ open, onClose }: LeftSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-12 left-0 bottom-0 w-56 bg-surface border-r border-border z-40 flex flex-col p-3 gap-1 overflow-y-auto transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-0.5" aria-label="Main navigation">
          {navItems.map(({ href, label, icon: Icon, desc }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-text-muted hover:bg-card hover:text-text"
                }`}
              >
                <Icon size={18} className={active ? "text-accent" : "text-text-muted group-hover:text-text"} />
                <div className="min-w-0">
                  <div className="truncate">{label}</div>
                  <div className="text-[10px] text-text-muted truncate opacity-0 group-hover:opacity-100 transition-opacity">{desc}</div>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full bg-accent text-white text-sm font-bold hover:bg-accent-2 transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </aside>
    </>
  );
}
