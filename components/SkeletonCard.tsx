/**
 * Shimmer skeleton matching the ProjectGridCard footprint (slim header +
 * inline icon/title). Used during loading states (loading.tsx).
 */
export default function SkeletonCard() {
  return (
    <div className="reddit-card overflow-hidden flex flex-col" aria-hidden="true">
      {/* Slim header strip */}
      <div className="skeleton-block" style={{ height: 56, borderRadius: 0 }} />
      <div className="p-3.5 flex flex-col gap-2">
        {/* Vote metric row */}
        <div className="skeleton-block" style={{ height: 10, width: "30%" }} />
        {/* Title with inline icon */}
        <div className="flex items-center gap-1.5">
          <div className="skeleton-block" style={{ height: 20, width: 20 }} />
          <div className="skeleton-block" style={{ height: 14, width: "70%" }} />
        </div>
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
