"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type TimelineKind = "work" | "education" | "award";

export interface TimelineEntry {
  id: string;
  kind: TimelineKind;
  period: string;
  title: string;
  org: string;
  /** One line shown before the entry is expanded. */
  headline: string;
  details: string[];
}

const FILTERS: { id: "all" | TimelineKind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
  { id: "award", label: "Awards" },
];

/**
 * One vertical timeline for work, education, and awards (newest first).
 * Each entry shows a one-line result; "Details" expands the full bullets.
 * Filter chips narrow it by kind. Node style encodes the kind.
 */
export default function AboutTimeline({ entries }: { entries: TimelineEntry[] }) {
  const [filter, setFilter] = useState<"all" | TimelineKind>("all");
  const [open, setOpen] = useState<Set<string>>(() => new Set(entries[0] ? [entries[0].id] : []));

  const visible = filter === "all" ? entries : entries.filter((e) => e.kind === filter);
  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div>
      <div role="group" aria-label="Filter timeline" className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const on = f.id === filter;
          const count = f.id === "all" ? entries.length : entries.filter((e) => e.kind === f.id).length;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f.id)}
              className="btn btn-sm"
              style={{
                background: on ? "var(--surface)" : "transparent",
                border: `1px solid ${on ? "var(--border-strong)" : "var(--border)"}`,
                color: on ? "var(--text)" : "var(--text-muted)",
              }}
            >
              {f.label}
              <span className="tabular-nums" style={{ color: "var(--text-hint)" }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <ol className="tl mt-8">
        {visible.map((e) => {
          const isOpen = open.has(e.id);
          const panelId = `tl-${e.id}`;
          return (
            <li key={e.id} className="tl-item" data-kind={e.kind}>
              <span className="tl-node" aria-hidden="true" />
              <div className="tl-head">
                <p className="t-small tabular-nums">{e.period}</p>
                <h3 className="t-h3 mt-1">{e.title}</h3>
                {e.org && (
                  <p className="t-small" style={{ color: "var(--text-muted)" }}>
                    {e.org}
                  </p>
                )}
                <p className="tl-headline mt-2">{e.headline}</p>
                {e.details.length > 0 && (
                  <button
                    type="button"
                    className="tl-toggle mt-2"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(e.id)}
                  >
                    {isOpen ? "Hide details" : "Details"}
                    <ChevronDown size={14} className="tl-chevron" />
                  </button>
                )}
              </div>
              {e.details.length > 0 && (
                <div id={panelId} className="tl-body" data-open={isOpen ? "true" : undefined} hidden={!isOpen}>
                  <ul className="bullets t-body pt-3">
                    {e.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
