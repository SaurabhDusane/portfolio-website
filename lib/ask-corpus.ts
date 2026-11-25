import {
  personalInfo,
  education,
  skillCategories,
  alsoFamiliar,
  experiences,
  awards,
  aboutLine,
  community,
  now,
  projects,
  articlesByDate,
  recommendations,
} from "@/data";
import { contactInfo } from "@/data/contact";
import { repoUrl } from "@/data/projects";

/**
 * The only material the "Ask about my work" assistant may answer from: one
 * document per page, project and piece of writing, built from the data files.
 * Each document keeps the URL it came from, so answers can link their sources.
 */

export interface AskDocument {
  title: string;
  url: string;
  text: string;
}

const lines = (...parts: (string | number | false | undefined | null)[]) => parts.filter((p) => typeof p === "string" && p).join("\n");
const bioText = personalInfo.bio.map((p) => p.map((x) => (typeof x === "string" ? x : x.text)).join("")).join("\n\n");

export function askDocuments(): AskDocument[] {
  const about: AskDocument = {
    title: "About",
    url: "/about",
    text: lines(
      `${personalInfo.name}, ${personalInfo.role}.`,
      aboutLine,
      bioText,
      "Experience:",
      ...experiences.map((e) => `- ${e.title}, ${e.company} (${e.duration}, ${e.location}): ${e.bullets.join(" ")}`),
      "Education:",
      ...education.map(
        (e) =>
          `- ${e.degree}, ${e.school} (${e.period})${e.gpa ? `, GPA ${e.gpa}` : ""}. Coursework: ${e.coursework.join(", ")}.`
      ),
      "Skills:",
      ...skillCategories.map((c) => `- ${c.title}: ${c.skills.join(", ")}`),
      alsoFamiliar.length > 0 && `- Also familiar: ${alsoFamiliar.join(", ")}`,
      "Awards:",
      ...awards.map((a) => `- ${a.title} (${a.year}): ${a.detail}`),
      "Community:",
      ...community.map((c) => `- ${c.role}, ${c.org} (${c.period}): ${c.description}`),
      "Currently into:",
      ...now.map((n) => `- ${n}`),
      ...recommendations.map((r) => `Recommendation from ${r.name} (${r.role}): "${r.quote}"`)
    ),
  };

  const contact: AskDocument = {
    title: "Contact",
    url: "/contact",
    text: lines(
      `${contactInfo.roles}. ${contactInfo.roleTypes}.`,
      contactInfo.degree,
      `Email: ${personalInfo.email}. ${contactInfo.replyTime} There is also a contact form on this page.`,
      `LinkedIn: ${personalInfo.linkedin}. GitHub: ${personalInfo.github}.`
    ),
  };

  const projectDocs: AskDocument[] = projects.map((p) => {
    const cs = p.caseStudy;
    const repo = repoUrl(p);
    return {
      title: `Project: ${p.title}`,
      url: p.earlier ? `/projects#earlier-${p.slug}` : `/projects/${p.slug}`,
      text: lines(
        `${p.title} (${p.year ?? "undated"}). ${p.description}`,
        p.stat && `Key result: ${p.stat}.`,
        `Tech: ${p.techStack.join(", ")}.`,
        repo && `Code: ${repo}`,
        p.highlights?.length && `Highlights: ${p.highlights.join(" ")}`,
        cs?.problem && `Problem: ${cs.problem}`,
        cs?.context?.length && `Context: ${cs.context.join(" ")}`,
        cs?.approach && `Approach: ${cs.approach}`,
        cs?.decisions?.length && `Decisions: ${cs.decisions.map((d) => `${d.title}: ${d.detail}`).join(" ")}`,
        cs?.results?.length && `Results: ${cs.results.join(" ")}`,
        cs?.futureWork?.length && `Next: ${cs.futureWork.join(" ")}`
      ),
    };
  });

  const writingDocs: AskDocument[] = articlesByDate.map((a) => ({
    title: `${a.body ? "Technical note" : "Essay"}: ${a.title}`,
    url: `/writing/${a.slug}`,
    text: a.body
      ? lines(a.excerpt, ...a.body.map((b) => ("text" in b ? b.text : b.items.join(" "))))
      : lines(`Published ${a.date} on Medium. ${a.excerpt}`, a.summary, a.points?.join(" ")),
  }));

  return [about, contact, ...projectDocs, ...writingDocs];
}
