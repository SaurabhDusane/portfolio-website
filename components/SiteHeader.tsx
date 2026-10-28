"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { personalInfo } from "@/data";

const navItems = [
  { href: "/projects", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hairline border only once the page has scrolled under the header.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header" data-scrolled={scrolled || menuOpen}>
      <div className="page flex items-center justify-between gap-4 h-16">
        <Link href="/" className="text-[16px] font-semibold tracking-[-0.01em] shrink-0" onClick={() => setMenuOpen(false)}>
          {personalInfo.shortName}
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden sm:flex items-center gap-5">
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} className="nav-link" aria-current={isActive(href) ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href={personalInfo.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm hidden sm:inline-flex ml-2"
          >
            Resume
          </a>
          <button
            type="button"
            className="icon-btn sm:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav id="mobile-nav" aria-label="Main" className="sm:hidden page pb-4">
          <ul className="flex flex-col border-t border-border pt-2">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(href) ? "page" : undefined}
                  className="block py-3 text-[16px]"
                  style={{ color: isActive(href) ? "var(--text)" : "var(--text-muted)" }}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={personalInfo.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-3 text-[16px]"
                style={{ color: "var(--text-muted)" }}
              >
                Resume
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
