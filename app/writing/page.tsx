import type { Metadata } from "next";
import { articlesByDate } from "@/data";
import WritingList from "./WritingList";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays by Saurabh Dusane on AI, technology, ethics, and culture.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  return (
    <div className="page">
      <h1 className="t-h1">Writing</h1>
      <p className="t-body mt-3 max-w-[600px]">
        Essays on technology, ethics, and culture, plus the occasional poem. All published on Medium.
      </p>
      <WritingList articles={articlesByDate} />
    </div>
  );
}
