import { PenLine } from "lucide-react";
import SkeletonCard from "@/components/SkeletonCard";

export default function WritingLoading() {
  return (
    <>
      <div className="flex items-center gap-2.5 mb-4">
        <PenLine size={18} style={{ color: "var(--accent)" }} />
        <h1 className="text-[16px] font-medium" style={{ color: "var(--text)" }}>r/writing</h1>
      </div>
      <div className="feed-grid">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </>
  );
}
