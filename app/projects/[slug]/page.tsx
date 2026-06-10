import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as LucideIcons from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Target,
  Layers,
  Cog,
  Workflow,
  GitBranch,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "@/data";
import type { Project } from "@/data/projects";
import FlairPill from "@/components/FlairPill";
import VoteRail from "@/components/VoteRail";
import ShareButton from "@/components/ShareButton";
import MermaidDiagram from "@/components/MermaidDiagram";

// Static export: prerender every project slug at build time.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

function findProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

function getIcon(name: string) {
  const key = name.charAt(0).toUpperCase() + name.slice(1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as Record<string, any>)[key];
  return Icon ?? LucideIcons.Folder;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return { title: "Project not found" };

  const description = project.caseStudy?.problem ?? project.description;
  const ogImage = project.coverImage ?? "/og-image.png";

  return {
    title: `${project.title} \u2014 Case Study`,
    description,
    openGraph: {
      title: `${project.title} \u2014 Case Study`,
      description,
      type: "article",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} \u2014 Case Study`,
      description,
      images: [ogImage],
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
      <p key={i} className="text-[13px] leading-[1.7]" style={{ color: "var(--text-muted)" }}>
        {p}
      </p>
    ));
}

interface SectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  title: string;
  children: React.ReactNode;
}

function Section({ icon: Icon, title, children }: SectionProps) {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Icon size={16} style={{ color: "var(--accent)" }} />
        <h2 className="text-[15px] font-medium" style={{ color: "var(--text)" }}>
          {title}
        </h2>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((s, i) => (
        <li key={i} className="flex gap-2 text-[13px] leading-[1.6]" style={{ color: "var(--text-muted)" }}>
          <span className="shrink-0 mt-0.5" style={{ color: "var(--accent)" }}>&bull;</span>
          <span>{s}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const cs = project.caseStudy;
  const Icon = getIcon(project.icon);

  // Prev / next nav across the projects list
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? projects[idx - 1] : null;
  const next = idx >= 0 && idx < projects.length - 1 ? projects[idx + 1] : null;

  return (
    <article style={{ maxWidth: 760, margin: "0 auto" }}>
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-[12px] mb-4 transition-colors"
        style={{ color: "var(--text-hint)" }}
      >
        <ArrowLeft size={13} /> r/projects
      </Link>

      {/* Post-style header — reuses VoteRail for continuity with the feed */}
      <div className="reddit-card flex overflow-hidden mb-5">
        <VoteRail metric={project.metric ?? "\u2014"} label={project.metricLabel} tooltip={project.metricTooltip} />
        <div className="flex-1 min-w-0 p-4">
          <div className="flex items-center gap-1.5 text-[11px] mb-1.5 flex-wrap" style={{ color: "var(--text-hint)" }}>
            <span>u/saurabh</span>
            <span>&middot;</span>
            <span>Case study</span>
            {project.year && (
              <>
                <span>&middot;</span>
                <span>{project.year}</span>
              </>
            )}
          </div>
          <h1 className="text-[18px] font-medium leading-snug mb-2" style={{ color: "var(--text)" }}>
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-1 mb-3">
            {project.techStack.map((t) => (
              <FlairPill key={t} label={t} />
            ))}
          </div>
          <div className="flex items-center gap-0.5 -ml-1.5 flex-wrap">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] transition-colors"
                style={{ color: "var(--text-hint)" }}
              >
                <FaGithub size={13} /> GitHub
              </a>
            )}
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] transition-colors"
                style={{ color: "var(--text-hint)" }}
              >
                <ExternalLink size={13} /> Live &uarr;
              </a>
            )}
            <ShareButton />
          </div>
        </div>
      </div>

      {/* Cover image (or fallback) */}
      <div className="relative w-full mb-6 rounded-lg overflow-hidden" style={{ aspectRatio: "16/9", border: "1px solid var(--border)" }}>
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 760px"
            priority
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, var(--accent) 0%, #CC3700 100%)" }}
          >
            <Icon size={64} strokeWidth={1.4} style={{ color: "rgba(255,255,255,0.7)" }} />
          </div>
        )}
      </div>

      {cs ? (
        <>
          {/* Problem */}
          <Section icon={Target} title="The problem">
            <p className="text-[13px] leading-[1.7]" style={{ color: "var(--text-muted)" }}>{cs.problem}</p>
          </Section>

          {/* Context */}
          {cs.context && cs.context.length > 0 && (
            <Section icon={Layers} title="Context & constraints">
              <Bullets items={cs.context} />
            </Section>
          )}

          {/* Approach */}
          <Section icon={Cog} title="Approach">
            {renderApproach(cs.approach)}
          </Section>

          {/* Architecture */}
          {cs.architecture && (cs.architecture.image || cs.architecture.mermaid) && (
            <Section icon={Workflow} title="Architecture">
              {cs.architecture.image ? (
                <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: "16/9", border: "1px solid var(--border)" }}>
                  <Image
                    src={cs.architecture.image}
                    alt={`${project.title} architecture diagram`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 760px"
                  />
                </div>
              ) : cs.architecture.mermaid ? (
                <MermaidDiagram chart={cs.architecture.mermaid} />
              ) : null}
              {cs.architecture.description && (
                <p className="text-[12px] leading-[1.6]" style={{ color: "var(--text-hint)" }}>
                  {cs.architecture.description}
                </p>
              )}
            </Section>
          )}

          {/* Decisions */}
          {cs.decisions && cs.decisions.length > 0 && (
            <Section icon={GitBranch} title="Key decisions & tradeoffs">
              <ul className="space-y-3">
                {cs.decisions.map((d, i) => (
                  <li key={i} className="rounded-lg p-3" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                    <div className="text-[13px] font-medium mb-1" style={{ color: "var(--text)" }}>{d.title}</div>
                    <div className="text-[12px] leading-[1.6]" style={{ color: "var(--text-muted)" }}>{d.detail}</div>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Results */}
          {cs.results && cs.results.length > 0 && (
            <Section icon={CheckCircle2} title="Results">
              <Bullets items={cs.results} />
            </Section>
          )}

          {/* Future work */}
          {cs.futureWork && cs.futureWork.length > 0 && (
            <Section icon={Sparkles} title="What's next">
              <Bullets items={cs.futureWork} />
            </Section>
          )}
        </>
      ) : (
        /* Minimal page when no caseStudy is written yet */
        <Section icon={Target} title="About this project">
          <p className="text-[13px] leading-[1.7]" style={{ color: "var(--text-muted)" }}>{project.description}</p>
          {project.highlights && project.highlights.length > 0 && (
            <div className="pt-2">
              <Bullets items={project.highlights} />
            </div>
          )}
          <p className="text-[12px] italic" style={{ color: "var(--text-hint)" }}>
            Detailed case study coming soon.
          </p>
        </Section>
      )}

      {/* Footer — links + prev/next */}
      <div className="mt-10 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] transition-colors"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
            >
              <FaGithub size={13} /> View on GitHub
            </a>
          )}
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] transition-colors"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
            >
              <ExternalLink size={13} /> Live demo
            </a>
          )}
          <Link
            href="/writing"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] transition-colors"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
          >
            Related writing &rarr;
          </Link>
        </div>

        <div className="flex items-stretch justify-between gap-3">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="flex-1 reddit-card p-3 card-lift min-w-0"
              style={{ textDecoration: "none" }}
            >
              <div className="flex items-center gap-1 text-[10px] uppercase tracking-wide mb-1" style={{ color: "var(--text-hint)" }}>
                <ArrowLeft size={11} /> Previous
              </div>
              <div className="text-[12px] font-medium truncate" style={{ color: "var(--text)" }}>{prev.title}</div>
            </Link>
          ) : (
            <span className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="flex-1 reddit-card p-3 card-lift min-w-0 text-right"
              style={{ textDecoration: "none" }}
            >
              <div className="flex items-center justify-end gap-1 text-[10px] uppercase tracking-wide mb-1" style={{ color: "var(--text-hint)" }}>
                Next <ArrowRight size={11} />
              </div>
              <div className="text-[12px] font-medium truncate" style={{ color: "var(--text)" }}>{next.title}</div>
            </Link>
          ) : (
            <span className="flex-1" />
          )}
        </div>
      </div>
    </article>
  );
}
