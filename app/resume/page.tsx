import type { Metadata } from "next";
import { personalInfo } from "@/data";
import { resumeData, resumeText } from "@/lib/resume";
import { resumeUpdated } from "@/lib/assets";
import ResumeActions from "@/components/ResumeActions";
import { contactInfo } from "@/data/contact";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Saurabh Dusane, ML, AI and data engineer: experience, projects, education and skills.",
  alternates: { canonical: "/resume" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="resume-section">
      <h2 className="resume-h2">{title}</h2>
      {children}
    </section>
  );
}

/**
 * The resume as a page, built from the same data as the site. Prints to a
 * clean one-page document (see the print styles in globals.css); the
 * uploaded PDF stays the official download.
 */
export default function ResumePage() {
  const r = resumeData();
  return (
    <div className="page">
      <ResumeActions
        text={resumeText(r)}
        pdf={personalInfo.resumePath}
        updated={resumeUpdated(personalInfo.resumePath)}
        bookingUrl={contactInfo.bookingUrl}
      />

      <article className="resume mt-8">
        <header>
          <h1 className="resume-name">{r.name}</h1>
          <p className="resume-role">{r.role}</p>
          <p className="resume-contact">
            {r.contact.map((c, i) => (
              <span key={c.href}>
                {i > 0 && <span aria-hidden="true"> · </span>}
                <a href={c.href} className="link">
                  {c.label}
                </a>
              </span>
            ))}
          </p>
          <p className="resume-summary">{r.summary}</p>
          <p className="resume-looking">{r.looking}</p>
        </header>

        <Section title="Experience">
          {r.experience.map((e) => (
            <div key={e.title + e.period} className="resume-item">
              <div className="resume-item-head">
                <p>
                  <strong>{e.title}</strong>, {e.org}
                </p>
                <p className="resume-meta">
                  {e.period} · {e.location}
                </p>
              </div>
              <ul className="resume-bullets">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </Section>

        <Section title="Projects">
          {r.projects.map((p) => (
            <div key={p.title} className="resume-item">
              <div className="resume-item-head">
                <p>
                  <strong>{p.title}</strong>
                  {p.stat && <span>: {p.stat}</span>}
                </p>
                <p className="resume-meta">{p.year}</p>
              </div>
              <p className="resume-line">
                {p.summary} <span className="resume-meta">{p.stack}</span>
              </p>
            </div>
          ))}
        </Section>

        <Section title="Education">
          {r.education.map((e) => (
            <div key={e.degree} className="resume-item">
              <div className="resume-item-head">
                <p>
                  <strong>{e.degree}</strong>, {e.school}
                  {e.gpa && <span>, GPA {e.gpa}</span>}
                </p>
                <p className="resume-meta">{e.period}</p>
              </div>
              {e.coursework.length > 0 && <p className="resume-line resume-meta">Coursework: {e.coursework.join(", ")}</p>}
            </div>
          ))}
        </Section>

        <Section title="Skills">
          <dl className="resume-skills">
            {r.skills.map((s) => (
              <div key={s.title}>
                <dt>{s.title}</dt>
                <dd>{s.skills}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="Awards">
          {r.awards.map((a) => (
            <p key={a.title} className="resume-line">
              <strong>{a.title}</strong> ({a.year}): {a.detail}
            </p>
          ))}
        </Section>
      </article>
    </div>
  );
}
