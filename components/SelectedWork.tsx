"use client";

import { startTransition, useState, ViewTransition } from "react";
import type { Project, Track } from "@/data/projects";
import { trackLabels } from "@/data/projects";
import { track as trackEvent } from "@/lib/analytics";
import ProjectRow from "./ProjectRow";
import Reveal from "./Reveal";

const TRACKS = Object.keys(trackLabels) as Track[];

/**
 * Selected work with track toggles. Picking a track moves its projects to the
 * top (nothing is hidden), and the rows slide to their new places as a view
 * transition; picking it again restores the original order.
 */
export default function SelectedWork({ projects }: { projects: Project[] }) {
  const [track, setTrack] = useState<Track | null>(null);

  const ordered = track
    ? [...projects.filter((p) => p.tracks?.includes(track)), ...projects.filter((p) => !p.tracks?.includes(track))]
    : projects;

  const pick = (t: Track) => {
    trackEvent("Track toggle", { track: trackLabels[t], on: track !== t });
    startTransition(() => setTrack((cur) => (cur === t ? null : t)));
  };

  return (
    <>
      <div role="group" aria-label="Show projects for" className="mt-4 flex flex-wrap gap-2">
        {TRACKS.map((t) => {
          const on = track === t;
          const count = projects.filter((p) => p.tracks?.includes(t)).length;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={on}
              onClick={() => pick(t)}
              className="btn btn-sm"
              style={{
                background: on ? "var(--surface)" : "transparent",
                border: `1px solid ${on ? "var(--accent)" : "var(--border)"}`,
                color: on ? "var(--text)" : "var(--text-muted)",
              }}
            >
              {trackLabels[t]}
              <span className="tabular-nums" style={{ color: "var(--text-hint)" }}>{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {track ? `${trackLabels[track]} projects first.` : "Showing projects in the default order."}
      </p>
      <div className="row-list mt-2">
        {ordered.map((project, i) => (
          <ViewTransition key={project.slug} name={`row-${project.slug}`}>
            <div>
              <Reveal delay={i * 60}>
                <ProjectRow project={project} />
              </Reveal>
            </div>
          </ViewTransition>
        ))}
      </div>
    </>
  );
}
