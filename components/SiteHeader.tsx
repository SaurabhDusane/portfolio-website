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

  // Sections in nav order. Moving right along the nav slides the next page in
  // from the right ("nav-forward"); moving left slides it in from the left.
  const order = ["/", ...navItems.map((n) => n.href)];
  const sectionIndex = (path: string) =>
    order.reduce((found, href, i) => (href !== "/" && (path === href || path.startsWith(`${href}/`)) ? i : found), 0);
  const slide = (href: string) => {
    const from = sectionIndex(pathname);
    const to = sectionIndex(href);
    return to === from ? undefined : [to > from ? "nav-forward" : "nav-back"];
  };
  // Let the background graph drift the same way the page slides.
  const nudge = (href: string) => {
    const types = slide(href);
    if (types) window.dispatchEvent(new CustomEvent("bg-nudge", { detail: { dir: types[0] === "nav-forward" ? 1 : -1 } }));
  };

  return (
    // Named so it stays put while page content slides beneath it.
    <header className="site-header" data-scrolled={scrolled || menuOpen} style={{ viewTransitionName: "site-header" }}>
      <div className="page flex items-center justify-between gap-4 h-16">
        <Link
          href="/"
          transitionTypes={slide("/")}
          onNavigate={() => nudge("/")}
          className="text-[16px] font-semibold tracking-[-0.01em] shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          {personalInfo.shortName}
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden sm:flex items-center gap-5">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              transitionTypes={slide(href)}
              onNavigate={() => nudge(href)}
              className="nav-link"
              aria-current={isActive(href) ? "page" : undefined}
            >
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
                  transitionTypes={slide(href)}
                  onNavigate={() => nudge(href)}
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
