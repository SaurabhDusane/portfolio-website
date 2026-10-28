import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/data/writing";

interface ArticleRowProps {
  article: Article;
  showExcerpt?: boolean;
  /** Heading level for the title, so it follows the page outline (h2 on /writing, h3 under a section). */
  headingLevel?: "h2" | "h3";
}

/** One essay in a list. Links out to Medium. */
export default function ArticleRow({ article, showExcerpt = true, headingLevel: Heading = "h3" }: ArticleRowProps) {
  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer" className="row group">
      <div className="flex items-baseline justify-between gap-4">
        <Heading className="t-h3 row-title flex items-center gap-2 min-w-0">
          <span className="min-w-0">{article.title}</span>
          <ArrowUpRight size={16} className="row-arrow" aria-hidden="true" />
        </Heading>
        <span className="t-small shrink-0 tabular-nums">{article.date}</span>
      </div>
      {showExcerpt && <p className="t-body mt-1">{article.excerpt}</p>}
      <p className="t-small mt-1">
        {article.category} · {article.readTime} min read
        <span className="sr-only"> (opens Medium in a new tab)</span>
      </p>
    </a>
  );
}
