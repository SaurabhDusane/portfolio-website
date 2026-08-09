/**
 * Shimmer skeleton matching the PostCard footprint (vote rail + body).
 * Used in loading.tsx boundaries for the home feed and r/writing.
 */
export default function PostCardSkeleton() {
  return (
    <div className="reddit-card flex overflow-hidden" aria-hidden="true">
      {/* Vote rail */}
      <div
        className="shrink-0 flex flex-col items-center gap-2 py-3"
        style={{ width: 56, borderRight: "1px solid var(--border)", background: "var(--rail)" }}
      >
        <div className="skeleton-block" style={{ height: 14, width: 14 }} />
        <div className="skeleton-block" style={{ height: 12, width: 30 }} />
        <div className="skeleton-block" style={{ height: 14, width: 14 }} />
      </div>

      {/* Body */}
      <div className="flex-1 p-3.5 flex flex-col gap-2 min-w-0">
        <div className="skeleton-block" style={{ height: 10, width: "35%" }} />
        <div className="skeleton-block" style={{ height: 14, width: "80%" }} />
        <div className="skeleton-block" style={{ height: 10, width: "100%" }} />
        <div className="skeleton-block" style={{ height: 10, width: "65%" }} />
        <div className="flex gap-1.5 mt-1">
          <div className="skeleton-block" style={{ height: 16, width: 60 }} />
          <div className="skeleton-block" style={{ height: 16, width: 48 }} />
        </div>
      </div>
    </div>
  );
}
