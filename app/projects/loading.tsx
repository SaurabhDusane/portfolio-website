import { FolderGit2 } from "lucide-react";
import SkeletonCard from "@/components/SkeletonCard";

export default function ProjectsLoading() {
  return (
    <>
      <div className="flex items-center gap-2.5 mb-4">
        <FolderGit2 size={18} style={{ color: "var(--accent)" }} />
        <h1 className="text-[16px] font-medium" style={{ color: "var(--text)" }}>r/projects</h1>
      </div>
      <div className="feed-grid">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </>
  );
}
