/**
 * Contact page copy — reply expectations, time zone, recruiter facts, and the
 * "what's this about?" choices that shape the form.
 */

export const contactInfo = {
  replyTime: "I usually reply within two days.",
  /** IANA zone for the live clock on /contact. */
  timeZone: "America/Phoenix",
  timeZoneLabel: "Arizona time",
  roles: "Open to ML, AI, and data engineering roles",
  roleTypes: "Full-time, part-time, or contract",
  degree: "M.S. Computer Engineering, Arizona State University, 2026",
};

export interface ContactIntent {
  id: string;
  label: string;
  /** Prefix added to the email subject, so messages sort themselves in the inbox. */
  tag: string;
  /** Placeholder for the message box. */
  hint: string;
  /** Show the resume link under the choices. */
  showResume?: boolean;
}

export const contactIntents: ContactIntent[] = [
  {
    id: "hiring",
    label: "Hiring",
    tag: "Hiring",
    hint: "The role, the team, and anything I should know. A link to the job post helps.",
    showResume: true,
  },
  {
    id: "collaborating",
    label: "Collaborating on something",
    tag: "Collaboration",
    hint: "What you’re working on and where you think I could help.",
  },
  {
    id: "hello",
    label: "Just saying hi",
    tag: "Hello",
    hint: "Anything at all: a question about a project, an essay, or something else.",
  },
];
