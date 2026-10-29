"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { capabilities, projects, skillEdges } from "@/data";

type Focus = { kind: "skill" | "project"; id: string } | null;
type Point = { x: number; y: number };

/**
 * Interactive map from skills to the projects that use them (see
 * data/skills.ts). Hovering, focusing, or tapping a skill lights up its
 * projects and the links between them; doing the same on a project lights
 * up its skills. Tapping pins the selection; Escape or tapping again clears it.
 *
 * Wide screens draw curved links in an SVG between the two columns; narrow
 * screens stack skills as chips above the project list and skip the links.
 */
export default function SkillMap() {
  const [hover, setHover] = useState<Focus>(null);
  const [pinned, setPinned] = useState<Focus>(null);
  const active = hover ?? pinned;

  const mapRef = useRef<HTMLDivElement>(null);
  const skillRefs = useRef(new Map<string, HTMLElement>());
  const projectRefs = useRef(new Map<string, HTMLElement>());
  const [anchors, setAnchors] = useState<{ skills: Record<string, Point>; projects: Record<string, Point>; w: number; h: number } | null>(null);

  const usedProjects = useMemo(() => projects.filter((p) => skillEdges.some(([, slug]) => slug === p.slug)), []);
  const notPython = projects.filter((p) => !p.techStack.includes("Python"));

  // Which skills and projects are connected to the current focus.
  const lit = useMemo(() => {
    if (!active) return null;
    const skills = new Set<string>();
    const slugs = new Set<string>();
    for (const [skill, slug] of skillEdges) {
      if ((active.kind === "skill" && skill === active.id) || (active.kind === "project" && slug === active.id)) {
        skills.add(skill);
        slugs.add(slug);
      }
    }
    return { skills, slugs };
  }, [active]);

  // Measure where each link should start and end; re-measure on resize.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const measure = () => {
      const box = map.getBoundingClientRect();
      // The links are only drawn when the columns sit side by side.
      if (getComputedStyle(map).getPropertyValue("--skill-map-lines").trim() !== "1") {
        setAnchors(null);
        return;
      }
      const skills: Record<string, Point> = {};
      const proj: Record<string, Point> = {};
      skillRefs.current.forEach((el, id) => {
        const r = el.getBoundingClientRect();
        skills[id] = { x: r.right - box.left, y: r.top + r.height / 2 - box.top };
      });
      projectRefs.current.forEach((el, slug) => {
        const r = el.getBoundingClientRect();
        proj[slug] = { x: r.left - box.left, y: r.top + r.height / 2 - box.top };
      });
      setAnchors({ skills, projects: proj, w: box.width, h: box.height });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(map);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPinned(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const togglePin = (f: NonNullable<Focus>) =>
    setPinned((p) => (p && p.kind === f.kind && p.id === f.id ? null : f));

  const activeLabel =
    active?.kind === "skill"
      ? capabilities.find((c) => c.id === active.id)?.label
      : active
        ? projects.find((p) => p.slug === active.id)?.title
        : undefined;
  const summary = !active
    ? "Hover or tap a skill, or a project, to see how they connect."
    : active.kind === "skill"
      ? `${lit!.slugs.size} ${lit!.slugs.size === 1 ? "project uses" : "projects use"} ${activeLabel}.`
      : `${activeLabel} draws on ${lit!.skills.size} ${lit!.skills.size === 1 ? "skill" : "skills"}.`;

  return (
    <div>
      {/* Fixed height: if this line changed height on focus, the layout would
          shift mid-tap and the click would miss the chip. */}
      <p className="t-small mt-2 min-h-[44px] sm:min-h-0" aria-live="polite">
        {summary}
      </p>
      <div ref={mapRef} className="skill-map mt-6" data-active={active ? "true" : undefined}>
        {anchors && (
          <svg className="skill-map-links" width={anchors.w} height={anchors.h} aria-hidden="true">
            {skillEdges.map(([skill, slug]) => {
              const a = anchors.skills[skill];
              const b = anchors.projects[slug];
              if (!a || !b) return null;
              const dx = (b.x - a.x) * 0.5;
              const on = active?.kind === "skill" ? skill === active.id : active?.kind === "project" ? slug === active.id : false;
              return (
                <path
                  key={`${skill}-${slug}`}
                  d={`M ${a.x + 6} ${a.y} C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x - 6} ${b.y}`}
                  className={on ? "skill-link skill-link-on" : "skill-link"}
                />
              );
            })}
          </svg>
        )}

        <ul className="skill-map-skills" aria-label="Skills">
          {capabilities.map((c) => {
            const on = lit?.skills.has(c.id);
            return (
              <li key={c.id}>
                <button
                  type="button"
                  ref={(el) => {
                    if (el) skillRefs.current.set(c.id, el);
                    else skillRefs.current.delete(c.id);
                  }}
                  className="skill-chip"
                  data-state={!lit ? undefined : on ? "on" : "off"}
                  aria-pressed={pinned?.kind === "skill" && pinned.id === c.id}
                  onMouseEnter={() => setHover({ kind: "skill", id: c.id })}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover({ kind: "skill", id: c.id })}
                  onBlur={() => setHover(null)}
                  onClick={() => togglePin({ kind: "skill", id: c.id })}
                >
                  {c.label}
                </button>
              </li>
            );
          })}
        </ul>

        <ul className="skill-map-projects" aria-label="Projects">
          {usedProjects.map((p) => {
            const on = lit?.slugs.has(p.slug);
            return (
              <li key={p.slug}>
                <Link
                  href={p.earlier ? `/projects#earlier-${p.slug}` : `/projects/${p.slug}`}
                  ref={(el) => {
                    if (el) projectRefs.current.set(p.slug, el);
                    else projectRefs.current.delete(p.slug);
                  }}
                  className="skill-project"
                  data-state={!lit ? undefined : on ? "on" : "off"}
                  onMouseEnter={() => setHover({ kind: "project", id: p.slug })}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover({ kind: "project", id: p.slug })}
                  onBlur={() => setHover(null)}
                >
                  <span className="min-w-0">{p.title}</span>
                  {p.year && <span className="t-small tabular-nums shrink-0">{p.year}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {notPython.length > 0 && notPython.length < projects.length / 2 && (
        <p className="t-small mt-6">
          Python isn’t shown as its own skill: every project uses it
          {notPython.length === 1 ? ` except ${notPython[0].title}` : ` except ${notPython.length}`}.
        </p>
      )}
    </div>
  );
}
