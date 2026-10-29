import type { MetadataRoute } from "next";
import { projectPages, articles } from "@/data";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/writing", "/about", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const projectUrls = projectPages.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    changeFrequency: "yearly" as const,
    priority: p.featured ? 0.7 : 0.5,
  }));
  const writingPages = articles.map((a) => ({
    url: `${SITE_URL}/writing/${a.slug}`,
    lastModified: a.date,
    changeFrequency: "yearly" as const,
    priority: a.featured || a.body ? 0.6 : 0.4,
  }));
  return [...pages, ...projectUrls, ...writingPages];
}
