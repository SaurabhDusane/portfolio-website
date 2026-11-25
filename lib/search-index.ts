import { projects, articlesByDate, skillCategories, personalInfo } from "@/data";
import { capabilities } from "@/data/skills";

/**
 * What quick search (components/SiteSearch.tsx) can find, built from the data
 * files at build time and shipped with the page. Small enough to search in
 * the browser with no server.
 */

export interface SearchItem {
  kind: "Page" | "Project" | "Note" | "Essay";
  title: string;
  /** One line under the title. */
  hint: string;
  href: string;
  /** Extra words that should match but aren't shown: tools, categories, skills. */
  keywords: string;
}

export function buildSearchIndex(): SearchItem[] {
  const pages: SearchItem[] = [
    { kind: "Page", title: "Home", hint: personalInfo.role, href: "/", keywords: "start currently building" },
    { kind: "Page", title: "Work", hint: "All projects", href: "/projects", keywords: "projects portfolio earlier work" },
    { kind: "Page", title: "Writing", hint: "Technical notes and essays", href: "/writing", keywords: "blog essays notes medium rss feed" },
    {
      kind: "Page",
      title: "About",
      hint: "Background, experience, skills",
      href: "/about",
      keywords: `experience education timeline skills tools community ${skillCategories.flatMap((c) => c.skills).join(" ")}`,
    },
    { kind: "Page", title: "Contact", hint: "Email, form, availability", href: "/contact", keywords: "email hire hiring message reach" },
    { kind: "Page", title: "Resume", hint: "The resume as a page", href: "/resume", keywords: "cv pdf print" },
  ];

  const projectItems: SearchItem[] = projects.map((p) => {
    const skills = capabilities.filter((c) => p.techStack.some((t) => c.tags.includes(t))).map((c) => c.label);
    return {
      kind: "Project",
      title: p.title,
      hint: p.summary,
      href: p.earlier ? `/projects#earlier-${p.slug}` : `/projects/${p.slug}`,
      keywords: [...p.techStack, ...skills, p.stat ?? "", String(p.year ?? "")].join(" "),
    };
  });

  const writing: SearchItem[] = articlesByDate.map((a) => ({
    kind: a.body ? "Note" : "Essay",
    title: a.title,
    hint: a.excerpt,
    href: `/writing/${a.slug}`,
    keywords: [a.subtitle ?? "", a.category, a.series?.name ?? ""].join(" "),
  }));

  return [...pages, ...projectItems, ...writing];
}
