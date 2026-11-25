import { personalInfo, experiences, education, skillCategories, awards, projects, aboutLine } from "@/data";
import { contactInfo } from "@/data/contact";
import { repoUrl } from "@/data/projects";
import { SITE_URL } from "@/lib/site";

/**
 * The resume as data, assembled from the same files as the rest of the site,
 * so /resume can never disagree with the pages. Used by the page and by its
 * "copy as plain text" button.
 */

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/+$/, "");

export function resumeData() {
  return {
    name: personalInfo.name,
    role: personalInfo.role,
    summary: aboutLine,
    looking: `${contactInfo.roles} · ${contactInfo.roleTypes}`,
    contact: [
      { label: personalInfo.email, href: `mailto:${personalInfo.email}` },
      { label: host(SITE_URL), href: SITE_URL },
      { label: host(personalInfo.linkedin), href: personalInfo.linkedin },
      { label: host(personalInfo.github), href: personalInfo.github },
    ],
    experience: experiences.map((e) => ({
      title: e.title,
      org: e.company,
      period: e.duration,
      location: e.location,
      bullets: e.bullets,
    })),
    projects: projects
      .filter((p) => p.featured)
      .map((p) => ({
        title: p.title,
        year: p.year,
        summary: p.summary,
        stat: p.stat,
        stack: p.techStack.slice(0, 5).join(", "),
        url: repoUrl(p),
      })),
    education: education.map((e) => ({
      degree: e.degree,
      school: e.school,
      period: e.period,
      gpa: e.gpa,
      coursework: e.coursework,
    })),
    skills: skillCategories.map((c) => ({ title: c.title, skills: c.skills.join(", ") })),
    awards: awards.map((a) => ({ title: a.title, detail: a.detail, year: a.year })),
  };
}

export type ResumeData = ReturnType<typeof resumeData>;

/** Plain text for pasting into application forms. */
export function resumeText(r: ResumeData): string {
  const out: string[] = [];
  out.push(r.name.toUpperCase(), r.role, r.contact.map((c) => c.label).join(" | "), "", r.summary, r.looking, "");
  out.push("EXPERIENCE");
  for (const e of r.experience) {
    out.push(`${e.title}, ${e.org} (${e.period}, ${e.location})`);
    for (const b of e.bullets) out.push(`- ${b}`);
    out.push("");
  }
  out.push("PROJECTS");
  for (const p of r.projects) {
    out.push(`${p.title} (${p.year})${p.stat ? `: ${p.stat}` : ""}`, `  ${p.summary}`);
    if (p.url) out.push(`  ${p.url}`);
  }
  out.push("", "EDUCATION");
  for (const e of r.education) {
    out.push(`${e.degree}, ${e.school} (${e.period})${e.gpa ? `, GPA ${e.gpa}` : ""}`);
    if (e.coursework.length) out.push(`  Coursework: ${e.coursework.join(", ")}`);
  }
  out.push("", "SKILLS");
  for (const s of r.skills) out.push(`${s.title}: ${s.skills}`);
  out.push("", "AWARDS");
  for (const a of r.awards) out.push(`${a.title} (${a.year}): ${a.detail}`);
  return out.join("\n");
}
