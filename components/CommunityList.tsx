"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { CommunityEntry } from "@/data/about";

export type CommunityItem = CommunityEntry & {
  /** Resolved on the server: set only when the logo file exists. */
  logoSrc?: string;
};

/** Hover effects only for a real mouse, and never under reduced motion. */
function canHoverAnimate() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function anchor(el: HTMLElement | null) {
  window.dispatchEvent(new CustomEvent("bg-anchor", { detail: { el } }));
}

/**
 * Community roles as expandable entries. Each shows a round badge styled like
 * a node in the background graph, plus role, org, and dates; clicking,
 * tapping, Enter, or Space expands the description. On desktop hover the
 * badge glows and the background graph draws thin lines from it to its
 * nearest points (see "bg-anchor" in SiteBackground).
 */
export default function CommunityList({ entries }: { entries: CommunityItem[] }) {
  const [open, setOpen] = useState<Set<string>>(() => new Set());

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <ul className="cm-list">
      {entries.map((e) => {
        const isOpen = open.has(e.id);
        const bodyId = `cm-${e.id}`;
        return (
          <li key={e.id} className="cm-item" data-open={isOpen ? "true" : undefined}>
            <button
              type="button"
              className="cm-head"
              aria-expanded={isOpen}
              aria-controls={bodyId}
              onClick={() => toggle(e.id)}
              onMouseEnter={(ev) => {
                if (canHoverAnimate()) anchor(ev.currentTarget.querySelector<HTMLElement>(".cm-badge"));
              }}
              onMouseLeave={() => anchor(null)}
            >
              <span className="cm-badge" aria-hidden="true">
                {e.logoSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element -- small static SVG, no optimisation needed
                  <img src={e.logoSrc} alt="" width={24} height={24} />
                ) : (
                  <span className="cm-monogram" data-len={e.monogram.length}>
                    {e.monogram}
                  </span>
                )}
              </span>
              <span className="cm-text">
                <span className="cm-role">{e.role}</span>
                <span className="cm-org">{e.org}</span>
                <span className="cm-period tabular-nums">{e.period}</span>
              </span>
              <ChevronDown size={16} className="cm-chevron" aria-hidden="true" />
            </button>
            <div id={bodyId} className="cm-body" inert={!isOpen}>
              <div className="cm-body-inner">
                <p className="t-body">{e.description}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
