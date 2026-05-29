/**
 * AnimatedBackground — 3 slow-drifting blurred orbs.
 * GPU-composited via will-change: transform in CSS.
 * Automatically disabled via prefers-reduced-motion in globals.css.
 */
export default function AnimatedBackground() {
  return (
    <div className="orb-container" aria-hidden="true">
      <div className="orb orb--1" />
      <div className="orb orb--2" />
      <div className="orb orb--3" />
    </div>
  );
}
