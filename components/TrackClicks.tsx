"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

const SITES: [RegExp, string][] = [
  [/(^|\.)github\.com$/, "GitHub"],
  [/(^|\.)medium\.com$/, "Medium"],
  [/(^|\.)linkedin\.com$/, "LinkedIn"],
  [/(^|\.)(x|twitter)\.com$/, "X"],
];

/**
 * One listener for the whole site: records resume downloads and clicks out to
 * GitHub, Medium, LinkedIn and X, without touching every link component.
 */
export default function TrackClicks({ resumePath }: { resumePath: string }) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      const url = new URL(a.href, location.href);
      const page = location.pathname;
      if (url.origin === location.origin) {
        if (url.pathname === resumePath) track("Resume download", { page });
        return;
      }
      if (!/^https?:$/.test(url.protocol)) return;
      const site = SITES.find(([re]) => re.test(url.hostname))?.[1] ?? url.hostname;
      track("Outbound click", { site, page });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [resumePath]);

  return null;
}
