"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const shortcuts = [
  { key: "?", desc: "Toggle this shortcuts panel" },
  { key: "g h", desc: "Go to r/home" },
  { key: "g p", desc: "Go to r/projects" },
  { key: "g w", desc: "Go to r/writing" },
  { key: "g a", desc: "Go to r/about" },
  { key: "g c", desc: "Go to r/contact" },
];

export default function ShortcutsModal() {
  const [open, setOpen] = useState(false);
  const [hintDismissed, setHintDismissed] = useState(false);

  useEffect(() => {
    let gPressed = false;
    let timer: ReturnType<typeof setTimeout>;

    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

      if (e.key === "?") {
        setOpen((prev) => !prev);
        setHintDismissed(true);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (e.key === "g") {
        gPressed = true;
        timer = setTimeout(() => { gPressed = false; }, 1000);
        return;
      }

      if (gPressed) {
        gPressed = false;
        clearTimeout(timer);
        const routes: Record<string, string> = { h: "/", p: "/projects", w: "/writing", a: "/about", c: "/contact" };
        const route = routes[e.key];
        if (route) window.location.href = route;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* Hint chip (first visit) */}
      {!hintDismissed && (
        <button
          onClick={() => { setOpen(true); setHintDismissed(true); }}
          className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs text-text-muted hover:text-text transition-colors shadow-lg"
        >
          Press <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] font-mono">?</kbd> for shortcuts
        </button>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setOpen(false)}>
          <div
            className="bg-card border border-border rounded-xl p-5 w-80 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-text">Keyboard Shortcuts</h2>
              <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-card-hover text-text-muted">
                <X size={16} />
              </button>
            </div>
            <div className="space-y-2">
              {shortcuts.map((s) => (
                <div key={s.key} className="flex items-center justify-between text-xs">
                  <span className="text-text-muted">{s.desc}</span>
                  <kbd className="px-2 py-0.5 rounded bg-surface border border-border text-text font-mono text-[11px]">{s.key}</kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
