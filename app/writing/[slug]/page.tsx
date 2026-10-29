import type { Metadata } from "next";
import { ViewTransition } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { articles } from "@/data";
import type { Article, NoteBlock } from "@/data/writing";
import { findArticle, formatArticleDate, relatedArticles, seriesParts } from "@/data/writing";
import ArticleRow from "@/components/ArticleRow";

// Static export: prerender every piece at build time.
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return { title: "Not found" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/writing/${article.slug}` },
    openGraph: {
      type: "article",
      siteName: "Saurabh Dusane",
      url: `/writing/${article.slug}`,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      creator: "@SaurabhDusane",
    },
  };
}

function NoteBody({ blocks }: { blocks: NoteBlock[] }) {
  return (
    <div className="note-body mt-10">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} className="t-h2">
                {b.text}
              </h2>
            );
          case "list": {
            const List = b.ordered ? "ol" : "ul";
            return (
              <List key={i} className={b.ordered ? "note-steps t-body" : "bullets t-body"}>
                {b.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </List>
            );
          }
          case "code":
            return (
              <pre key={i} className="note-code overflow-x-auto" tabIndex={0} aria-label={b.lang ? `${b.lang} example` : "Example"}>
                <code>{b.text}</code>
              </pre>
            );
          default:
            return (
              <p key={i} className="t-body">
                {b.text}
              </p>
            );
        }
      })}
    </div>
  );
}

function SeriesBox({ article }: { article: Article }) {
  const parts = seriesParts(article);
  if (parts.length < 2) return null;
  return (
    <nav aria-label={`Series: ${article.series!.name}`} className="series-box mt-8">
      <p className="t-small">
        Part {article.series!.part} of {parts.length} · {article.series!.name}
      </p>
      <ol className="series-list mt-2">
        {parts.map((p) => (
          <li key={p.slug}>
            {p.slug === article.slug ? (
              <span aria-current="page" style={{ color: "var(--text)" }}>
                {p.title} <span className="t-small">(this one)</span>
              </span>
            ) : (
              <Link href={`/writing/${p.slug}`} className="link">
                {p.title}
              </Link>
            )}
            <span className="t-small"> · {formatArticleDate(p)}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const related = relatedArticles(article);

  return (
    <article className="page">
      <Link href="/writing" className="more-link">
        <ArrowLeft size={14} /> All writing
      </Link>

      <header className="mt-8">
        <p className="t-small">
          {article.category} · <time dateTime={article.date}>{formatArticleDate(article)}</time> ·{" "}
          {article.readTime} min read
        </p>
        <h1 className="t-h1 mt-3">
          <ViewTransition name={`essay-${article.slug}`} share="morph">
            <span>{article.title}</span>
          </ViewTransition>
        </h1>
        {article.subtitle && <p className="article-subtitle mt-3">{article.subtitle}</p>}
      </header>

      <SeriesBox article={article} />

      {article.body ? (
        <>
          <NoteBody blocks={article.body} />
          {article.repo && (
            <div className="mt-10">
              <a href={article.repo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" data-cursor="Opens GitHub ↗">
                <FaGithub size={16} /> View the code
              </a>
            </div>
          )}
        </>
      ) : (
        <>
          {article.summary && <p className="article-lede mt-8">{article.summary}</p>}
          {article.points && article.points.length > 0 && (
            <section className="mt-10" aria-labelledby="covers-heading">
              <h2 id="covers-heading" className="t-h3">
                What it covers
              </h2>
              <ul className="bullets t-body mt-3">
                {article.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </section>
          )}
          {article.quote && (
            <figure className="pull-quote mt-10">
              <blockquote>“{article.quote}”</blockquote>
              <figcaption className="t-small mt-2">From the essay</figcaption>
            </figure>
          )}
          {article.url && (
            <div className="mt-10">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-cursor="Opens Medium ↗">
                Read the full essay on Medium <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          )}
        </>
      )}

      {related.length > 0 && (
        <section className="mt-16 pt-8 border-t border-border" aria-labelledby="related-heading">
          <h2 id="related-heading" className="t-h3">
            Related
          </h2>
          <div className="row-list mt-2">
            {related.map((r) => (
              <ArticleRow key={r.slug} article={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
