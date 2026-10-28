import { ViewTransition } from "react";

// Templates remount on every navigation. With experimental.viewTransition,
// Next.js runs navigations as view transitions: the old page crossfades into
// the new one, and elements with a shared name (project thumbnails and
// titles) morph between pages. The CSS fade still plays on first load and in
// browsers without View Transitions.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition>
      <div className="page-enter">{children}</div>
    </ViewTransition>
  );
}
