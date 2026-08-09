import { PenLine } from "lucide-react";
import PostCardSkeleton from "@/components/PostCardSkeleton";

export default function WritingLoading() {
  return (
    <>
      <div className="flex items-center gap-2.5 mb-4">
        <PenLine size={18} style={{ color: "var(--accent)" }} />
        <h1 className="text-[16px] font-medium" style={{ color: "var(--text)" }}>r/writing</h1>
      </div>
      <div className="feed-grid">
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
      </div>
    </>
  );
}
