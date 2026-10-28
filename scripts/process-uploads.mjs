/**
 * Process files dropped into uploads/ (npm run process:uploads; run by the
 * "Process uploads" GitHub Action). Each file is routed by its name, resized,
 * re-encoded without metadata (EXIF/GPS is dropped), moved under /public at its
 * fixed path, and removed from uploads/.
 *
 *   *.pdf                      → public/resume.pdf
 *   avatar|photo|profile.*     → public/images/profile/avatar.webp   (square, 512px)
 *   project-<slug>.*           → public/images/projects/<slug>.webp  (1200×675)
 *   logo-<id>.svg              → public/logos/<id>.svg               (copied as is)
 *   logo-<id>.(jpg|png|webp)   → public/logos/<id>.webp              (96px, transparent)
 *
 * Writes a Markdown summary to $UPLOAD_SUMMARY (if set) and "changed=true" to
 * $GITHUB_OUTPUT when something was processed. Exits 1 if any file couldn't be
 * handled, leaving that file in uploads/ with the reason in the summary.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const UPLOADS = path.join(ROOT, "uploads");
const PUBLIC = path.join(ROOT, "public");
const KEEP = new Set(["README.md", ".gitkeep"]);
const RASTER = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff"]);

const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const projectSlugs = [...read("data/projects.ts").matchAll(/^\s+slug: "([^"]+)"/gm)].map((m) => m[1]);
const communityIds = [...read("data/about.ts").matchAll(/^\s+id: "([^"]+)"/gm)].map((m) => m[1]);

const done = [];
const failed = [];
const kb = (n) => `${Math.max(1, Math.round(n / 1024))} KB`;

/** Remove other formats of the same asset, so only one version is ever picked up. */
function removeSiblings(dir, base, keepExt) {
  for (const ext of [".svg", ".webp", ".jpg", ".jpeg", ".png"]) {
    if (ext === keepExt) continue;
    const p = path.join(dir, base + ext);
    if (fs.existsSync(p)) fs.rmSync(p);
  }
}

async function writeImage(src, outFile, resize) {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  // sharp drops EXIF/XMP/GPS unless asked to keep it; rotate() first applies the camera's orientation.
  const info = await sharp(src).rotate().resize(resize).webp({ quality: 82, effort: 5 }).toFile(outFile);
  return `${info.width}×${info.height}, ${kb(info.size)}`;
}

async function handle(name) {
  const src = path.join(UPLOADS, name);
  const ext = path.extname(name).toLowerCase();
  const base = path.basename(name, path.extname(name)).toLowerCase().trim();

  if (ext === ".heic" || ext === ".heif") {
    throw new Error("HEIC photos (the iPhone default) can't be read here. Export it as JPEG and upload again.");
  }

  if (ext === ".pdf") {
    const buf = fs.readFileSync(src);
    if (buf.subarray(0, 5).toString("latin1") !== "%PDF-") throw new Error("this isn't a valid PDF.");
    if (buf.length > 1024 * 1024) throw new Error(`the PDF is ${kb(buf.length)}; keep the resume under 1 MB.`);
    fs.copyFileSync(src, path.join(PUBLIC, "resume.pdf"));
    return `resume → \`public/resume.pdf\` (${kb(buf.length)})`;
  }

  if (/^(avatar|photo|profile|headshot)$/.test(base)) {
    if (!RASTER.has(ext)) throw new Error("profile photos must be JPEG, PNG or WebP.");
    const out = path.join(PUBLIC, "images/profile/avatar.webp");
    const desc = await writeImage(src, out, { width: 512, height: 512, fit: "cover", position: sharp.strategy.attention });
    return `profile photo → \`public/images/profile/avatar.webp\` (${desc})`;
  }

  let m = base.match(/^project-(.+)$/);
  if (m) {
    const slug = m[1];
    if (!projectSlugs.includes(slug)) {
      throw new Error(`there's no project "${slug}". Use one of: ${projectSlugs.join(", ")}.`);
    }
    if (!RASTER.has(ext)) throw new Error("project covers must be JPEG, PNG or WebP.");
    const dir = path.join(PUBLIC, "images/projects");
    const desc = await writeImage(src, path.join(dir, `${slug}.webp`), { width: 1200, height: 675, fit: "cover" });
    removeSiblings(dir, slug, ".webp");
    return `cover for ${slug} → \`public/images/projects/${slug}.webp\` (${desc})`;
  }

  m = base.match(/^logo-(.+)$/);
  if (m) {
    const id = m[1];
    if (!communityIds.includes(id)) {
      throw new Error(`there's no community entry "${id}". Use one of: ${communityIds.join(", ")}.`);
    }
    const dir = path.join(PUBLIC, "logos");
    fs.mkdirSync(dir, { recursive: true });
    if (ext === ".svg") {
      const svg = fs.readFileSync(src, "utf8");
      if (!/<svg[\s>]/i.test(svg)) throw new Error("this isn't a valid SVG.");
      if (/<script\b|\son\w+\s*=|javascript:/i.test(svg)) throw new Error("the SVG contains scripts; re-export it as a plain image.");
      fs.copyFileSync(src, path.join(dir, `${id}.svg`));
      removeSiblings(dir, id, ".svg");
      return `logo for ${id} → \`public/logos/${id}.svg\` (${kb(svg.length)})`;
    }
    if (!RASTER.has(ext)) throw new Error("logos must be SVG, PNG, JPEG or WebP.");
    const desc = await writeImage(src, path.join(dir, `${id}.webp`), {
      width: 96,
      height: 96,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });
    removeSiblings(dir, id, ".webp");
    return `logo for ${id} → \`public/logos/${id}.webp\` (${desc})`;
  }

  throw new Error(
    "the name doesn't match a slot. Name it resume.pdf, avatar.jpg, project-<slug>.jpg or logo-<id>.png (see ASSETS.md)."
  );
}

const names = fs.existsSync(UPLOADS)
  ? fs.readdirSync(UPLOADS).filter((n) => !KEEP.has(n) && fs.statSync(path.join(UPLOADS, n)).isFile())
  : [];

for (const name of names) {
  try {
    done.push(`- \`${name}\`: ${await handle(name)}`);
    fs.rmSync(path.join(UPLOADS, name));
  } catch (err) {
    failed.push(`- \`${name}\`: ${err.message}`);
  }
}

const summary = [
  done.length ? `### Processed\n\n${done.join("\n")}` : "",
  failed.length ? `### Couldn't process (left in uploads/)\n\n${failed.join("\n")}` : "",
  !names.length ? "Nothing to process: uploads/ is empty." : "",
  done.length ? "\nPhotos were resized and re-saved as WebP with their camera metadata (including any location) removed." : "",
]
  .filter(Boolean)
  .join("\n\n");

console.log(summary);
if (process.env.UPLOAD_SUMMARY) fs.writeFileSync(process.env.UPLOAD_SUMMARY, summary + "\n");
if (process.env.GITHUB_OUTPUT && done.length) fs.appendFileSync(process.env.GITHUB_OUTPUT, "changed=true\n");
if (failed.length) process.exit(1);
