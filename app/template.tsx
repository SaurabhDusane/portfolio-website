import { ViewTransition } from "react";

// Templates remount on every navigation. With experimental.viewTransition,
// Next.js runs navigations as view transitions:
// - header links tag the navigation "nav-forward" or "nav-back" (see
//   SiteHeader), and the page slides in that direction
// - any other navigation crossfades, and elements with a shared name (project
//   thumbnails and titles) morph between pages
// The CSS fade still plays on first load and in browsers without View Transitions.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "auto" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "auto" }}
    >
      <div className="page-enter">{children}</div>
    </ViewTransition>
  );
}
