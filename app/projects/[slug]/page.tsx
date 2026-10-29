import type { Metadata } from "next";
import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projectPages } from "@/data";
import type { Project } from "@/data/projects";
import { hasCaseStudyContent, repoUrl } from "@/data/projects";
import MermaidDiagram from "@/components/MermaidDiagram";
import ProjectCover from "@/components/ProjectCover";
import CaseStudyNav from "@/components/CaseStudyNav";
import ReadingProgress from "@/components/ReadingProgress";
import { projectCover } from "@/lib/assets";

// Static export: prerender every project slug at build time.
export function generateStaticParams() {
  return projectPages.map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

function findProject(slug: string): Project | undefined {
  return projectPages.find((p) => p.slug === slug);
}

/** An explicit coverImage, else public/images/projects/<slug>.* if it exists. */
function coverOf(project: Project): string | undefined {
  return project.coverImage || projectCover(project.slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return { title: "Project not found" };

  const description = project.caseStudy?.problem?.trim() || project.summary;

  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description,
      type: "article",
      // Without a cover, the site-wide generated image is used.
      ...(coverOf(project) ? { images: [{ url: coverOf(project)! }] } : {}),
    },
  };
}

/** Render approach text: split on blank lines into paragraphs. */
function renderApproach(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p, i) => (
      <p key={i} className="t-body">
        {p}
      </p>
    ));
}

/** Section ids used by both the headings and the "On this page" nav. */
const SECTION_IDS: Record<string, string> = {
  "The problem": "problem",
  "Context and constraints": "context",
  Approach: "approach",
  Architecture: "architecture",
  "Key decisions": "decisions",
  Results: "results",
  "What’s next": "next",
  Highlights: "highlights",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 id={SECTION_IDS[title]} className="t-h2 mb-4">
        {title}
      </h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="bullets t-body">
      {items.map((s, i) => (
        <li key={i}>{s}</li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const cs = project.caseStudy;
  const hasContent = hasCaseStudyContent(cs);
  const repo = repoUrl(project);
  const cover = coverOf(project);

  // "On this page" entries, in the same order and under the same conditions as the sections below.
  const toc =
    hasContent && cs
      ? [
          cs.problem?.trim() && "The problem",
          cs.context?.length && "Context and constraints",
          cs.approach?.trim() && "Approach",
          cs.architecture && (cs.architecture.image || cs.architecture.mermaid?.trim()) && "Architecture",
          cs.decisions?.length && "Key decisions",
          cs.results?.length && "Results",
          cs.futureWork?.length && "What’s next",
        ]
          .filter((t): t is string => typeof t === "string")
          .map((title) => ({ id: SECTION_IDS[title], title }))
      : [];

  // Prev / next across the projects list
  const idx = projectPages.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? projectPages[idx - 1] : null;
  const next = idx >= 0 && idx < projectPages.length - 1 ? projectPages[idx + 1] : null;

  return (
    <article id="project" className="page relative">
      {toc.length > 2 && (
        <>
          <ReadingProgress targetId="project" />
          <CaseStudyNav items={toc} />
        </>
      )}
      <Link href="/projects" className="more-link">
        <ArrowLeft size={14} /> All projects
      </Link>

      <header className="mt-8">
        <h1 className="t-h1">
          <ViewTransition name={`title-${project.slug}`} share="morph">
            <span>{project.title}</span>
          </ViewTransition>
        </h1>
        <p className="t-small mt-2">
          {project.year && <span className="tabular-nums">{project.year} · </span>}
          {project.techStack.join(", ")}
        </p>
        {project.keyNumbers?.length ? (
          <dl className="key-numbers mt-8">
            {project.keyNumbers.map((k) => (
              <div key={k.label} className="key-number">
                <dt className="t-small">{k.label}</dt>
                <dd className="key-number-value">{k.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          project.stat && (
            <p className="mt-6 text-[20px] font-medium leading-snug" style={{ color: "var(--accent)" }}>
              {project.stat}
            </p>
          )
        )}
        {(repo || project.demoLink) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {repo && (
              <a href={repo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" data-cursor="Opens GitHub ↗">
                <FaGithub size={16} /> View code
              </a>
            )}
            {project.demoLink && (
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <ExternalLink size={16} /> Live demo
              </a>
            )}
          </div>
        )}
      </header>

      {/* Cover: a real image when one is set, otherwise the generated graph. Morphs from the list thumbnail. */}
      <ViewTransition name={`cover-${project.slug}`} share="morph">
        <div className="relative w-full mt-10 rounded-xl overflow-hidden" style={{ aspectRatio: "16/9", border: "1px solid var(--border)" }}>
          {cover ? (
            <Image src={cover} alt={project.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 712px" priority />
          ) : (
            <ProjectCover slug={project.slug} />
          )}
        </div>
      </ViewTransition>

      {hasContent && cs ? (
        <>
          {cs.problem?.trim() && (
            <Section title="The problem">
              <p className="t-body">{cs.problem}</p>
            </Section>
          )}

          {cs.context && cs.context.length > 0 && (
            <Section title="Context and constraints">
              <Bullets items={cs.context} />
            </Section>
          )}

          {cs.approach?.trim() && <Section title="Approach">{renderApproach(cs.approach)}</Section>}

          {cs.architecture && (cs.architecture.image || cs.architecture.mermaid?.trim()) && (
            <Section title="Architecture">
              {cs.architecture.image ? (
                <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: "16/9", border: "1px solid var(--border)" }}>
                  <Image
                    src={cs.architecture.image}
                    alt={`${project.title} architecture diagram`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 712px"
                  />
                </div>
              ) : cs.architecture.mermaid?.trim() ? (
                <MermaidDiagram chart={cs.architecture.mermaid} />
              ) : null}
              {cs.architecture.description?.trim() && <p className="t-small">{cs.architecture.description}</p>}
            </Section>
          )}

          {cs.decisions && cs.decisions.length > 0 && (
            <Section title="Key decisions">
              <dl className="flex flex-col gap-5">
                {cs.decisions.map((d, i) => (
                  <div key={i}>
                    <dt className="t-h3">{d.title}</dt>
                    <dd className="t-body mt-1">{d.detail}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          )}

          {cs.results && cs.results.length > 0 && (
            <Section title="Results">
              <Bullets items={cs.results} />
            </Section>
          )}

          {cs.futureWork && cs.futureWork.length > 0 && (
            <Section title="What’s next">
              <Bullets items={cs.futureWork} />
            </Section>
          )}
        </>
      ) : (
        <>
          <section className="mt-10">
            <p className="t-body" style={{ color: "var(--text)" }}>
              {project.description}
            </p>
          </section>
          {project.highlights && project.highlights.length > 0 && (
            <Section title="Highlights">
              <Bullets items={project.highlights} />
            </Section>
          )}
        </>
      )}

      {/* Prev / next */}
      <nav aria-label="More projects" className="mt-16 pt-8 grid grid-cols-2 gap-4 border-t border-border">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="row group min-w-0 !m-0">
            <span className="t-small inline-flex items-center gap-1">
              <ArrowLeft size={14} /> Previous
            </span>
            <span className="t-h3 row-title block mt-1">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/projects/${next.slug}`} className="row group min-w-0 text-right !m-0">
            <span className="t-small inline-flex items-center gap-1">
              Next <ArrowRight size={14} />
            </span>
            <span className="t-h3 row-title block mt-1">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
