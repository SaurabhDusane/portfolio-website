"use client";

import { useMemo, useState } from "react";
import type { Article } from "@/data/writing";
import ArticleRow from "@/components/ArticleRow";

const ALL = "All";

/** Category filter + article list. Filters are plain text buttons, not tabs. */
export default function WritingList({ articles }: { articles: Article[] }) {
  const [active, setActive] = useState(ALL);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of articles) counts.set(a.category, (counts.get(a.category) ?? 0) + 1);
    return [{ id: ALL, count: articles.length }, ...[...counts].map(([id, count]) => ({ id, count }))];
  }, [articles]);

  const visible = active === ALL ? articles : articles.filter((a) => a.category === active);

  return (
    <>
      <div role="group" aria-label="Filter by category" className="mt-10 mb-4 flex flex-wrap gap-2">
        {categories.map(({ id, count }) => {
          const on = id === active;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              aria-pressed={on}
              className="btn btn-sm"
              style={{
                background: on ? "var(--surface)" : "transparent",
                border: `1px solid ${on ? "var(--border-strong)" : "var(--border)"}`,
                color: on ? "var(--text)" : "var(--text-muted)",
              }}
            >
              {id}
              <span className="tabular-nums" style={{ color: "var(--text-hint)" }}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="row-list">
        {visible.map((article) => (
          <ArticleRow key={article.id} article={article} headingLevel="h2" />
        ))}
      </div>
    </>
  );
}
