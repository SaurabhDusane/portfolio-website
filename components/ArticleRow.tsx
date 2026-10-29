import { ViewTransition } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/data/writing";
import { formatArticleDate } from "@/data/writing";

interface ArticleRowProps {
  article: Article;
  showExcerpt?: boolean;
  /** Heading level for the title, so it follows the page outline (h2 on /writing, h3 under a section). */
  headingLevel?: "h2" | "h3";
  /** Drop the year from the date when the list is already grouped by year. */
  withYear?: boolean;
}

/**
 * One piece of writing in a list. Links to its page on this site; the title
 * shares a view transition name with that page's heading, so it morphs on
 * navigation.
 */
export default function ArticleRow({
  article,
  showExcerpt = true,
  headingLevel: Heading = "h3",
  withYear = true,
}: ArticleRowProps) {
  return (
    <Link
      href={`/writing/${article.slug}`}
      className="row group"
      data-cursor={article.body ? "Read note →" : "Read summary →"}
    >
      <div className="flex items-baseline justify-between gap-4">
        <Heading className="t-h3 row-title flex items-center gap-2 min-w-0">
          <ViewTransition name={`essay-${article.slug}`} share="morph">
            <span className="min-w-0">{article.title}</span>
          </ViewTransition>
          <ArrowRight size={16} className="row-arrow" aria-hidden="true" />
        </Heading>
        <span className="t-small shrink-0 tabular-nums">{formatArticleDate(article, { withYear })}</span>
      </div>
      {showExcerpt && <p className="t-body mt-1">{article.excerpt}</p>}
      <p className="t-small mt-1">
        {article.category} · {article.readTime} min read
        {article.series && (
          <>
            {" · "}
            <span style={{ color: "var(--accent)" }}>Part {article.series.part} of a series</span>
          </>
        )}
      </p>
    </Link>
  );
}
