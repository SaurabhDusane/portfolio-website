"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Article, WritingCategory } from "@/data/writing";
import { articleYear, formatArticleDate, writingCategories } from "@/data/writing";
import ArticleRow from "@/components/ArticleRow";

const ALL = "All";

/**
 * Category filter, the featured piece (on "All" only), then the list grouped
 * by year. Filters are plain text buttons, not tabs.
 */
export default function WritingList({ articles }: { articles: Article[] }) {
  const [active, setActive] = useState<typeof ALL | WritingCategory>(ALL);

  const categories = useMemo(
    (): { id: typeof ALL | WritingCategory; count: number }[] => [
      { id: ALL, count: articles.length },
      ...writingCategories
        .map((id) => ({ id, count: articles.filter((a) => a.category === id).length }))
        .filter((c) => c.count > 0),
    ],
    [articles]
  );

  const featured = active === ALL ? articles.find((a) => a.featured) : undefined;
  const visible = articles.filter((a) => a !== featured && (active === ALL || a.category === active));

  const years: { year: number; items: Article[] }[] = [];
  for (const a of visible) {
    const y = articleYear(a);
    if (years.at(-1)?.year !== y) years.push({ year: y, items: [] });
    years.at(-1)!.items.push(a);
  }

  return (
    <>
      <div role="group" aria-label="Filter by category" className="mt-10 flex flex-wrap gap-2">
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

      {featured && (
        <Link href={`/writing/${featured.slug}`} className="featured-essay group mt-8">
          <p className="t-small">
            <span style={{ color: "var(--accent)" }}>Featured</span> · {featured.category} ·{" "}
            {formatArticleDate(featured)} · {featured.readTime} min read
          </p>
          <h2 className="featured-essay-title mt-2">{featured.title}</h2>
          {featured.subtitle && <p className="t-small mt-1">{featured.subtitle}</p>}
          <p className="t-body mt-3">{featured.excerpt}</p>
          {featured.quote && <blockquote className="featured-essay-quote mt-4">“{featured.quote}”</blockquote>}
          <span className="more-link mt-4">
            Read the summary <ArrowRight size={14} />
          </span>
        </Link>
      )}

      {years.map(({ year, items }) => (
        <section key={year} className="mt-10" aria-labelledby={`year-${year}`}>
          <h2 id={`year-${year}`} className="writing-year">
            <span>{year}</span>
          </h2>
          <div className="row-list mt-2">
            {items.map((article) => (
              <ArticleRow key={article.slug} article={article} headingLevel="h3" withYear={false} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
