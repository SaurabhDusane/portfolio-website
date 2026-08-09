import PostCardSkeleton from "@/components/PostCardSkeleton";

/**
 * Root loading fallback — shown during navigation to routes without their own
 * loading.tsx (home feed, about, contact). Shimmer placeholders keep the page
 * from flashing blank on slow loads.
 */
export default function Loading() {
  return (
    <div aria-hidden="true">
      {/* Pinned hero placeholder */}
      <div className="reddit-card overflow-hidden mb-5">
        <div className="skeleton-block" style={{ height: 108, borderRadius: 0 }} />
        <div className="p-6 flex flex-col gap-3">
          <div className="skeleton-block" style={{ height: 20, width: "45%" }} />
          <div className="flex gap-2">
            <div className="skeleton-block" style={{ height: 18, width: 96 }} />
            <div className="skeleton-block" style={{ height: 18, width: 96 }} />
            <div className="skeleton-block" style={{ height: 18, width: 96 }} />
          </div>
          <div className="skeleton-block" style={{ height: 12, width: "92%" }} />
          <div className="skeleton-block" style={{ height: 12, width: "72%" }} />
        </div>
      </div>

      {/* Feed placeholders */}
      <div className="skeleton-block mb-2.5" style={{ height: 12, width: 150 }} />
      <div className="flex flex-col gap-2.5">
        <PostCardSkeleton />
        <PostCardSkeleton />
        <PostCardSkeleton />
      </div>
    </div>
  );
}
