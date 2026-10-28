import fs from "node:fs";
import path from "node:path";

/**
 * Build-time lookups for files dropped into /public under fixed names (see
 * ASSETS.md). Server-only: these read the filesystem during the static build.
 */

const PUBLIC = path.join(process.cwd(), "public");

/** The first of `base.<ext>` that exists, as a public URL path. */
function firstExisting(base: string, exts: string[]): string | undefined {
  for (const ext of exts) {
    const rel = `${base}.${ext}`;
    if (fs.existsSync(path.join(PUBLIC, rel))) return `/${rel}`;
  }
  return undefined;
}

/** Project cover at public/images/projects/<slug>.webp (or .jpg/.png). */
export function projectCover(slug: string): string | undefined {
  return firstExisting(`images/projects/${slug}`, ["webp", "jpg", "png"]);
}

/** Community logo at public/logos/<id>.svg (or .webp/.png). */
export function communityLogo(id: string): string | undefined {
  return firstExisting(`logos/${id}`, ["svg", "webp", "png"]);
}

/**
 * "Jan 2026": when the resume PDF was last edited, read from the PDF's own
 * ModDate (or CreationDate). Undefined if the file has neither, so the label
 * simply doesn't show.
 */
export function resumeUpdated(resumePath: string): string | undefined {
  try {
    const head = fs.readFileSync(path.join(PUBLIC, resumePath)).toString("latin1");
    const m = head.match(/\/ModDate\s*\(D:(\d{4})(\d{2})/) ?? head.match(/\/CreationDate\s*\(D:(\d{4})(\d{2})/);
    if (!m) return undefined;
    const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, 1));
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
  } catch {
    return undefined;
  }
}
