/**
 * Home page "Currently building" strip. Keep statuses honest: say "no results
 * yet" until there are results to link to.
 *
 * Items with a `repo` update themselves at build time (see resolveBuilding in
 * app/page.tsx): the card shows the date of the latest commit, and after
 * PAUSED_AFTER_DAYS without one its status becomes "Paused".
 */

export const PAUSED_AFTER_DAYS = 42;

export interface BuildingItem {
  title: string;
  href: string;
  /** Short status label. */
  status: string;
  /** "active" shows a green dot; "pending" a hollow one. */
  tone: "active" | "pending";
  /** GitHub "owner/name"; when set, the card's date and Paused status come from its latest commit. */
  repo?: string;
  detail: string;
}

export const currentlyBuilding: BuildingItem[] = [
  {
    title: "Guardian",
    href: "/projects/guardian",
    repo: "SaurabhDusane/guardian",
    status: "Active",
    tone: "active",
    detail: "Evaluating the diagnosis agent on a labelled case for every stage and fault type.",
  },
  {
    title: "fp8-kvcache",
    href: "/projects/fp8-kvcache",
    repo: "SaurabhDusane/fp8-kvcache",
    status: "No results yet",
    tone: "pending",
    detail: "A Triton decode kernel that reads an FP8 KV-cache, to be benchmarked against FlashInfer and vLLM.",
  },
  {
    title: "agent-compare",
    href: "/projects/agent-compare",
    status: "In progress",
    tone: "pending",
    detail: "miniagent rebuilt in LangGraph, with one harness running both on the same tasks.",
  },
];
