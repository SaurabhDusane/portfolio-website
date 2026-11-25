import { articlesByDate, personalInfo } from "@/data";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * RSS 2.0 feed of technical notes and essays, written to out/feed.xml at
 * build time. Each item links to its page on this site (essays then link on
 * to Medium), so readers land here first.
 */
export function GET() {
  const items = articlesByDate
    .map((a) => {
      const url = `${SITE_URL}/writing/${a.slug}`;
      return `    <item>
      <title>${esc(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${a.date}T12:00:00Z`).toUTCString()}</pubDate>
      <category>${esc(a.body ? "Technical note" : a.category)}</category>
      <description>${esc(a.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(personalInfo.shortName)}: writing</title>
    <link>${SITE_URL}/writing</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Technical notes on data pipelines, agents and LLM inference, and essays on technology, ethics and culture.</description>
    <language>en</language>
    <lastBuildDate>${new Date(`${articlesByDate[0].date}T12:00:00Z`).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
