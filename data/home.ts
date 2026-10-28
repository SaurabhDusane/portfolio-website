/**
 * Home page "Currently building" strip. Keep statuses honest: say "no results
 * yet" until there are results to link to.
 */

export interface BuildingItem {
  title: string;
  href: string;
  /** Short status label. */
  status: string;
  /** "active" shows a green dot; "pending" a hollow one. */
  tone: "active" | "pending";
  detail: string;
}

export const currentlyBuilding: BuildingItem[] = [
  {
    title: "Guardian",
    href: "/projects/guardian",
    status: "Active",
    tone: "active",
    detail: "Evaluating the diagnosis agent on a labelled case for every stage and fault type.",
  },
  {
    title: "fp8-kvcache",
    href: "/projects/fp8-kvcache",
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
