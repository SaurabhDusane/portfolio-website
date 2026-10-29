import { track as vercelTrack } from "@vercel/analytics";

/**
 * Custom analytics events (Vercel Web Analytics). The script is only added on
 * Vercel builds (see app/layout.tsx); elsewhere these calls queue and go nowhere.
 *
 * Events:
 *   Resume download   { page }
 *   Outbound click    { site, page }        GitHub, Medium, LinkedIn, X, other hosts
 *   Contact sent      { intent }            Hiring / Collaborating on something / Just saying hi / none
 *   Track toggle      { track, on }         Selected work on the home page
 */
export function track(name: string, props: Record<string, string | boolean>) {
  try {
    vercelTrack(name, props);
  } catch {
    // Analytics must never break the page.
  }
}
