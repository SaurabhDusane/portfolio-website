import type { Metadata } from "next";
import Image from "next/image";
import SkillMap from "@/components/SkillMap";
import { personalInfo, education, skillCategories, alsoFamiliar, experiences, leadership, awards } from "@/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, experience, education and skills of Saurabh Dusane, an AI/ML engineer and recent M.S. graduate from Arizona State University.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="page">
      {/* ─── Bio ───────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <Image
          src={personalInfo.avatar ?? "/headshot.png"}
          alt="Portrait of Saurabh Dusane"
          width={56}
          height={56}
          className="rounded-full object-cover shrink-0"
          style={{ width: 56, height: 56, border: "1px solid var(--border)" }}
        />
        <h1 className="t-h1">About</h1>
      </div>
      <div className="mt-8 flex flex-col gap-5 max-w-[640px]">
        {personalInfo.bio.map((para, i) => (
          <p key={i} className="t-body" style={i === 0 ? { color: "var(--text)" } : undefined}>
            {para}
          </p>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={personalInfo.resumePath} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Download resume
        </a>
        <a href={`mailto:${personalInfo.email}`} className="btn btn-secondary">
          Email me
        </a>
      </div>

      {/* ─── Experience ────────────────────────────────────────────────── */}
      <section id="experience" className="section" aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="t-h2">Experience</h2>
        <ol className="mt-8 flex flex-col gap-12">
          {experiences.map((exp) => (
            <li key={exp.title + exp.duration} className="timeline-item">
              <div>
                <p className="t-small tabular-nums">{exp.duration}</p>
                <p className="t-small">{exp.location}</p>
              </div>
              <div className="min-w-0">
                <h3 className="t-h3">{exp.title}</h3>
                <p className="t-small mt-0.5" style={{ color: "var(--text-muted)" }}>{exp.company}</p>
                <ul className="bullets t-body mt-4">
                  {exp.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ─── Education ─────────────────────────────────────────────────── */}
      <section id="education" className="section" aria-labelledby="education-heading">
        <h2 id="education-heading" className="t-h2">Education</h2>
        <ol className="mt-8 flex flex-col gap-10">
          {education.map((edu) => (
            <li key={edu.degree} className="timeline-item">
              <p className="t-small tabular-nums">{edu.period}</p>
              <div className="min-w-0">
                <h3 className="t-h3">{edu.degree}</h3>
                <p className="t-small mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {edu.school}
                  {edu.gpa && <> · GPA {edu.gpa}</>}
                </p>
                {edu.coursework.length > 0 && (
                  <p className="t-body mt-3">
                    <span style={{ color: "var(--text)" }}>Relevant coursework:</span> {edu.coursework.join(", ")}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ─── Skills in practice (interactive map) ──────────────────────── */}
      <section id="skills-map" className="section" aria-labelledby="skills-map-heading">
        <h2 id="skills-map-heading" className="t-h2">Skills in practice</h2>
        <SkillMap />
      </section>

      {/* ─── Skills ────────────────────────────────────────────────────── */}
      <section id="skills" className="section" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="t-h2">Tools</h2>
        <dl className="mt-8 flex flex-col gap-5">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="timeline-item">
              <dt className="t-h3" style={{ fontWeight: 500 }}>{cat.title}</dt>
              <dd className="t-body">{cat.skills.join(", ")}</dd>
            </div>
          ))}
          {alsoFamiliar.length > 0 && (
            <div className="timeline-item">
              <dt className="t-h3" style={{ fontWeight: 500, color: "var(--text-muted)" }}>Also familiar</dt>
              <dd className="t-body">{alsoFamiliar.join(", ")}</dd>
            </div>
          )}
        </dl>
      </section>

      {/* ─── Recognition & leadership ──────────────────────────────────── */}
      <section id="recognition" className="section" aria-labelledby="recognition-heading">
        <h2 id="recognition-heading" className="t-h2">Recognition &amp; leadership</h2>
        <ul className="mt-8 flex flex-col gap-8">
          {awards.map((a) => (
            <li key={a.title} className="timeline-item">
              <p className="t-small tabular-nums">{a.year}</p>
              <div className="min-w-0">
                <h3 className="t-h3">{a.title}</h3>
                <p className="t-body mt-0.5">{a.detail}</p>
              </div>
            </li>
          ))}
          {leadership.map((l) => (
            <li key={l.title} className="timeline-item">
              <p className="t-small tabular-nums">{l.duration}</p>
              <div className="min-w-0">
                <h3 className="t-h3">{l.title}</h3>
                <p className="t-small mt-0.5" style={{ color: "var(--text-muted)" }}>{l.company}</p>
                <p className="t-body mt-2">{l.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
