/**
 * Shimmer skeleton matching the ProjectGridCard / WritingGridCard footprint.
 * Used during loading states (loading.tsx) and search-results pending.
 */
export default function SkeletonCard() {
  return (
    <div className="reddit-card overflow-hidden flex flex-col" aria-hidden="true">
      {/* Cover */}
      <div className="skeleton-block" style={{ aspectRatio: "16/9", borderRadius: 0 }} />
      <div className="p-3.5 flex flex-col gap-2">
        <div className="skeleton-block" style={{ height: 10, width: "40%" }} />
        <div className="skeleton-block" style={{ height: 14, width: "85%" }} />
        <div className="skeleton-block" style={{ height: 10, width: "100%" }} />
        <div className="skeleton-block" style={{ height: 10, width: "70%" }} />
        <div className="flex gap-1.5 mt-1">
          <div className="skeleton-block" style={{ height: 16, width: 50 }} />
          <div className="skeleton-block" style={{ height: 16, width: 60 }} />
          <div className="skeleton-block" style={{ height: 16, width: 45 }} />
        </div>
      </div>
    </div>
  );
}
