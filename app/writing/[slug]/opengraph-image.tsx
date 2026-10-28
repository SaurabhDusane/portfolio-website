import { articles } from "@/data";
import { findArticle, formatArticleDate } from "@/data/writing";
import { ogCard, ogSize } from "@/lib/og";

export const alt = "Writing by Saurabh Dusane";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticleOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = findArticle(slug);
  return ogCard({
    eyebrow: `Saurabh Dusane · ${article?.body ? "Technical note" : "Essay"}`,
    title: article?.title ?? "Writing",
    highlight: article ? `${article.category} · ${formatArticleDate(article)}` : undefined,
    body: article?.excerpt,
    footer: "saurabhdusane.com/writing",
  });
}
