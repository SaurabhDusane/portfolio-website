/**
 * Content for the About page that doesn't belong anywhere else.
 * Everything here is drawn from facts already stated on the site.
 */

/** The opening line under the name: one sentence, first person. */
export const aboutLine =
  "I work across data engineering, ML, and AI, and I like the problems that sit between them: messy data, pipelines that break, and models that have to keep working anyway.";

/** Quick facts shown next to the photo. The availability line comes from personalInfo. */
export const aboutFacts: { label: string; detail?: string }[] = [
  { label: "M.S. Computer Engineering", detail: "Arizona State University" },
  { label: "4.0 GPA" },
];

/** Numbers that count up on the About page. `value` animates; `text` is shown as-is. */
export const impactNumbers: { value?: number; text?: string; suffix?: string; label: string }[] = [
  { value: 10000, suffix: "+", label: "SEC filings made queryable" },
  { value: 100, suffix: "GB+", label: "of retail data cleaned" },
  { value: 1500, suffix: "+", label: "club members in three months" },
  { value: 200, suffix: "+", label: "students supported as a TA" },
  { text: "3rd", label: "globally, AVEVA EcoTech Emerge" },
];

// ─── Outside work ────────────────────────────────────────────────────────────

export interface CommunityEntry {
  id: string;
  role: string;
  org: string;
  period: string;
  description: string;
  /** Shown in the round badge when there's no logo file. */
  monogram: string;
  /**
   * Optional logo under /public (e.g. "/logos/cis.svg"). Used only if the file
   * exists at build time; otherwise the monogram is shown.
   */
  logo?: string;
}

/** Community roles, newest first. */
export const community: CommunityEntry[] = [
  {
    id: "issc",
    role: "Grad Initiatives Team Volunteer (Lead Volunteer)",
    org: "International Students and Scholars Center (ISSC), Arizona State University",
    period: "Oct 2024 – Present",
    description:
      "Help run community programs for 500+ international graduate students, including pitching new formats like co-hosted Coffee & Conversation sessions with cultural student orgs.",
    monogram: "ISSC",
  },
  {
    id: "cis",
    role: "Treasurer Associate",
    org: "Coalition of International Students (CIS), Arizona State University",
    period: "Oct 2024 – May 2025",
    description: "Handled budgeting for campus-wide programming that reached 200+ international students.",
    monogram: "CIS",
    logo: "/logos/cis.svg",
  },
  {
    id: "phoenix-ai",
    role: "Co-Founder & President",
    org: "Phoenix AI Club (undergrad, India)",
    period: "Mar 2023 – Jan 2024",
    description:
      "Started the club, grew it to 1,500+ members in three months, and ran 13+ hands-on workshops on ML and deep learning.",
    monogram: "PAI",
    logo: "/logos/phoenix-ai.svg",
  },
];

/** "Now" card: two or three plain lines about what you're into right now. */
export const now: string[] = [
  "Digging into LLM inference efficiency (KV-cache quantization, Triton kernels)",
  "Strategy and management games, which are how I got into AI in the first place",
  "Reading about psychology",
];
