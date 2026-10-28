import type { Metadata } from "next";
import { articlesByDate } from "@/data";
import WritingList from "./WritingList";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Technical notes and essays by Saurabh Dusane on data pipelines, agents, AI, ethics, and culture.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  return (
    <div className="page">
      <h1 className="t-h1">Writing</h1>
      <p className="t-body mt-3 max-w-[600px]">
        Technical notes on what I’m building, and essays on technology, ethics, and culture. The essays are
        published on Medium; each one has a short summary here first.
      </p>
      <WritingList articles={articlesByDate} />
    </div>
  );
}
