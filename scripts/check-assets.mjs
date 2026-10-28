/**
 * Asset check (npm run check:assets), run in CI before the build.
 *
 * Fails with a plain-English message when:
 *   - a data file or page points at a file that isn't in /public
 *   - the resume is missing, isn't a PDF, or is over 1 MB
 *   - an image is over its folder's size budget, or can't be read
 *   - a photo still carries camera metadata (EXIF/XMP, which can include GPS location)
 *   - an SVG logo contains scripts or event handlers
 *
 * See ASSETS.md for where each file goes.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, "public");
const RESUME = "/resume.pdf";
const KB = 1024;

// Size budgets by folder (first match wins).
const BUDGETS = [
  { dir: "images/profile/", max: 200 * KB, what: "profile photos" },
  { dir: "images/projects/", max: 400 * KB, what: "project covers" },
  { dir: "logos/", max: 60 * KB, what: "logos" },
  { dir: "", max: 500 * KB, what: "images" },
];
const IMAGE_EXT = new Set([".webp", ".jpg", ".jpeg", ".png", ".avif", ".gif", ".svg"]);

const problems = [];
const fail = (msg) => problems.push(msg);
const rel = (p) => path.relative(ROOT, p);
const fmt = (bytes) => `${Math.round(bytes / KB)} KB`;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

// 1. Every local file path written in data files and pages must exist.
const sources = [...walk(path.join(ROOT, "data")), ...walk(path.join(ROOT, "app")), ...walk(path.join(ROOT, "components"))].filter(
  (f) => /\.(ts|tsx)$/.test(f)
);
const refRe = /["'`](\/(?:images|logos)\/[^"'`\s$<>]+|\/[\w.-]+\.(?:pdf|png|jpe?g|webp|svg|avif))["'`]/g;
for (const file of sources) {
  const text = fs.readFileSync(file, "utf8");
  for (const m of text.matchAll(refRe)) {
    const url = m[1];
    if (url === RESUME) continue; // checked on its own below
    if (!fs.existsSync(path.join(PUBLIC, url))) {
      fail(`${rel(file)} points at "${url}", but there is no public${url}. Add the file or fix the path.`);
    }
  }
}

// 2. The resume.
const resumeFile = path.join(PUBLIC, RESUME);
if (!fs.existsSync(resumeFile)) {
  fail(`The resume is missing. It must be at public${RESUME} (upload it to uploads/ or add it there directly).`);
} else {
  const buf = fs.readFileSync(resumeFile);
  if (buf.subarray(0, 5).toString("latin1") !== "%PDF-") fail(`public${RESUME} isn't a PDF. Export the resume as PDF.`);
  if (buf.length > 1024 * KB) {
    fail(`public${RESUME} is ${fmt(buf.length)}; keep it under 1 MB (export with "reduce file size" or fewer images).`);
  }
}

// 3. Images under /public: budget, readable, no camera metadata, safe SVGs.
for (const file of walk(PUBLIC)) {
  const ext = path.extname(file).toLowerCase();
  if (!IMAGE_EXT.has(ext)) continue;
  const relPublic = path.relative(PUBLIC, file).split(path.sep).join("/");
  const size = fs.statSync(file).size;
  const budget = BUDGETS.find((b) => relPublic.startsWith(b.dir));
  if (size > budget.max) {
    fail(`public/${relPublic} is ${fmt(size)}; ${budget.what} should be under ${fmt(budget.max)}. Upload it through uploads/ to shrink it automatically.`);
  }
  if (ext === ".svg") {
    const svg = fs.readFileSync(file, "utf8");
    if (/<script\b|\son\w+\s*=|javascript:/i.test(svg)) {
      fail(`public/${relPublic} contains scripts or event handlers. Re-export the SVG as a plain image.`);
    }
    continue;
  }
  try {
    const meta = await sharp(file).metadata();
    if (meta.exif || meta.xmp) {
      fail(`public/${relPublic} still has camera metadata (EXIF/XMP), which can include where the photo was taken. Upload it through uploads/ to strip it.`);
    }
  } catch {
    fail(`public/${relPublic} can't be read as an image. Re-export it as JPEG, PNG or WebP.`);
  }
}

if (problems.length) {
  console.error(`✗ ${problems.length} asset problem${problems.length === 1 ? "" : "s"}:\n`);
  for (const p of problems) console.error(`  • ${p}`);
  console.error("\nSee ASSETS.md for where each file goes and the size limits.");
  process.exit(1);
}
console.log("✓ assets: every referenced file exists, the resume is a PDF under 1 MB, images are within budget with no camera metadata");
