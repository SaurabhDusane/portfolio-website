"use client";

import { Search, FolderGit2, PenLine, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { projects, articles } from "@/data";

interface SearchBarProps {
  placeholder?: string;
}

interface SearchResult {
  id: string;
  type: "Project" | "Essay";
  title: string;
  snippet: string;
  href: string;
  external?: boolean;
}

export default function SearchBar({ placeholder = "Search posts\u2026" }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Debounce ~150ms
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 150);
    return () => clearTimeout(t);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const results = useMemo<SearchResult[]>(() => {
    const q = debounced.toLowerCase();
    if (!q) return [];
    const projectHits: SearchResult[] = projects
      .filter((p) => {
        const hay = [p.title, p.description, ...p.techStack].join(" ").toLowerCase();
        return hay.includes(q);
      })
      .slice(0, 5)
      .map((p) => ({
        id: `p-${p.id}`,
        type: "Project",
        title: p.title,
        snippet: p.techStack.slice(0, 4).join(" \u00b7 "),
        href: "/projects",
      }));
    const articleHits: SearchResult[] = articles
      .filter((a) => {
        const hay = [a.title, a.excerpt, a.category].join(" ").toLowerCase();
        return hay.includes(q);
      })
      .slice(0, 5)
      .map((a) => ({
        id: `a-${a.id}`,
        type: "Essay",
        title: a.title,
        snippet: a.category,
        href: a.url,
        external: true,
      }));
    return [...projectHits, ...articleHits];
  }, [debounced]);

  // Reset active index when results change
  useEffect(() => setActiveIdx(0), [debounced]);

  const goTo = (r: SearchResult) => {
    setOpen(false);
    setQuery("");
    if (r.external) {
      window.open(r.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(r.href);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setQuery("");
      setOpen(false);
      (e.target as HTMLInputElement).blur();
      return;
    }
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      goTo(results[activeIdx]);
    }
  };

  const showDropdown = open && debounced.length > 0;

  return (
    <div ref={wrapRef} className="relative w-full max-w-md">
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-hint)" }} />
      <input
        type="text"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        role="combobox"
        aria-expanded={showDropdown}
        aria-controls="search-results"
        aria-autocomplete="list"
        className="w-full pl-8 pr-8 py-1.5 rounded-full text-[12px] transition-colors focus:outline-none"
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          color: "var(--text)",
          transition: "background-color 0.2s, border-color 0.2s, color 0.2s",
        }}
      />
      {query && (
        <button
          type="button"
          onClick={() => { setQuery(""); setOpen(false); }}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded-full"
          style={{ color: "var(--text-hint)" }}
        >
          <X size={12} />
        </button>
      )}

      {showDropdown && (
        <div id="search-results" role="listbox" className="search-dropdown">
          {results.length === 0 ? (
            <div className="px-3 py-3 text-[12px]" style={{ color: "var(--text-hint)" }}>
              No posts match &ldquo;{debounced}&rdquo;.
            </div>
          ) : (
            results.map((r, i) => {
              const Icon = r.type === "Project" ? FolderGit2 : PenLine;
              return (
                <div
                  key={r.id}
                  role="option"
                  aria-selected={i === activeIdx}
                  data-active={i === activeIdx}
                  className="search-result"
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseDown={(e) => { e.preventDefault(); goTo(r); }}
                >
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wide" style={{ color: "var(--text-hint)" }}>
                    <Icon size={11} style={{ color: "var(--accent)" }} />
                    <span>{r.type}</span>
                  </div>
                  <div className="text-[12px] font-medium leading-snug" style={{ color: "var(--text)" }}>
                    {r.title}
                  </div>
                  {r.snippet && (
                    <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                      {r.snippet}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
