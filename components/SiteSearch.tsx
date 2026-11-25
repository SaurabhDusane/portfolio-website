"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import type { SearchItem } from "@/lib/search-index";

/** Opens the search dialog from anywhere, e.g. the header's search button. */
export function openSearch() {
  window.dispatchEvent(new Event("open-search"));
}

const MAX = 8;

/** Lower-case, accent-free, so "R²" and "r2" or "Résumé" and "resume" still meet. */
function norm(s: string) {
  return s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/**
 * Every word of the query must appear somewhere; title hits rank above
 * keyword hits, and a title that starts with the query ranks first.
 */
function rank(items: SearchItem[], query: string) {
  const words = norm(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const scored: { item: SearchItem; score: number }[] = [];
  for (const item of items) {
    const title = norm(item.title);
    const rest = norm(`${item.hint} ${item.keywords} ${item.kind}`);
    let score = 0;
    let ok = true;
    for (const w of words) {
      if (title.startsWith(w)) score += 6;
      else if (title.includes(w)) score += 4;
      else if (rest.includes(w)) score += 1;
      else {
        ok = false;
        break;
      }
    }
    if (ok) scored.push({ item, score });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, MAX).map((s) => s.item);
}

/**
 * Quick search: "/" or ⌘K / Ctrl+K anywhere (not while typing in a field), or
 * the header's search button. Arrow keys move, Enter opens, Escape closes.
 */
export default function SiteSearch({ items }: { items: SearchItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const listId = useId();

  const results = useMemo(() => rank(items, query), [items, query]);

  useEffect(() => {
    const show = () => {
      restoreRef.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement | null)?.closest?.("input, textarea, select, [contenteditable='true']");
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        show();
      } else if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-search", show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-search", show);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setQuery("");
    setActive(0);
    restoreRef.current?.focus?.();
  };

  const go = (item: SearchItem) => {
    close();
    router.push(item.href);
  };

  if (!open) return null;

  return (
    <div className="search-backdrop" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="search-panel" role="dialog" aria-modal="true" aria-label="Search the site">
        <div className="search-field">
          <Search size={18} aria-hidden="true" />
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            value={query}
            placeholder="Search projects, notes, essays, skills…"
            autoComplete="off"
            spellCheck={false}
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls={listId}
            aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                close();
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((i) => Math.min(i + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              } else if (e.key === "Enter" && results[active]) {
                e.preventDefault();
                go(results[active]);
              }
            }}
          />
          <button type="button" className="search-esc" onClick={close}>
            Esc
          </button>
        </div>

        {query.trim() && (
          <ul id={listId} role="listbox" aria-label="Results" className="search-results">
            {results.length === 0 && (
              <li className="search-empty">
                Nothing matches “{query.trim()}”. Try a tool (Dagster, Triton) or a topic (agents, pipelines).
              </li>
            )}
            {results.map((r, i) => (
              <li
                key={r.href + r.title}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                className="search-item"
                data-active={i === active ? "true" : undefined}
                onMouseMove={() => setActive(i)}
                onClick={() => go(r)}
              >
                <span className="search-kind">{r.kind}</span>
                <span className="min-w-0">
                  <span className="search-title">{r.title}</span>
                  <span className="search-hint">{r.hint}</span>
                </span>
                <ArrowRight size={14} className="search-go" aria-hidden="true" />
              </li>
            ))}
          </ul>
        )}
        {!query.trim() && (
          <p className="search-tip">
            Try <kbd>Guardian</kbd>, <kbd>Dagster</kbd>, <kbd>LangGraph</kbd> or <kbd>resume</kbd>. Press <kbd>/</kbd> or{" "}
            <kbd>⌘K</kbd> to open this from anywhere.
          </p>
        )}
      </div>
    </div>
  );
}
