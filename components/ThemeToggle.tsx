"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  // null until mounted: the inline script in layout.tsx has already applied the
  // right theme to <html>, so we only read it back after hydration.
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync from the DOM once after hydration
    setTheme(current);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme";

  return (
    <button
      type="button"
      onClick={toggle}
      className="icon-btn"
      aria-label={label}
      title={label}
      // Keep the slot reserved before mount so the header doesn't shift.
      style={{ visibility: theme ? "visible" : "hidden" }}
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
