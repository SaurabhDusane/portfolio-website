#!/usr/bin/env node
/**
 * Layout QA for the static export in ./out (run `npm run build` first).
 *
 * Serves ./out locally, then opens every route from sitemap.xml (plus the 404
 * page) at phone, tablet and desktop widths in both themes, and fails if it
 * finds any of:
 *   - horizontal page scroll
 *   - visible elements extending past the right edge of the viewport
 *   - text clipped by its own box (overflow hidden without an ellipsis)
 *   - broken images
 *   - Mermaid diagrams that never render
 *   - console errors / uncaught exceptions
 *   - internal links that don't resolve to an exported file
 *
 * Usage: npm run check:layout
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const OUT = path.resolve("out");
const VIEWPORTS = {
  phone: { width: 375, height: 812 },
  tablet: { width: 820, height: 1100 },
  desktop: { width: 1440, height: 900 },
};
const THEMES = ["light", "dark"];
const TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".json": "application/json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".pdf": "application/pdf",
};

if (!fs.existsSync(path.join(OUT, "index.html"))) {
  console.error("No ./out/index.html — run `npm run build` first.");
  process.exit(1);
}

/** Resolve a URL path to an exported file the way Netlify does (pretty URLs). */
function resolveFile(urlPath) {
  const p = path.join(OUT, decodeURIComponent(urlPath));
  if (!p.startsWith(OUT)) return null;
  for (const c of [p, `${p}.html`, path.join(p, "index.html")]) {
    try {
      if (fs.statSync(c).isFile()) return c;
    } catch {}
  }
  return null;
}

const server = http
  .createServer((req, res) => {
    const urlPath = req.url.split("?")[0];
    const file = resolveFile(urlPath);
    if (!file) {
      res.writeHead(404, { "content-type": "text/html" });
      return fs.createReadStream(path.join(OUT, "404.html")).pipe(res);
    }
    // Extensionless generated images (opengraph-image, icon) are PNGs.
    const type = TYPES[path.extname(file)] ?? (path.extname(file) ? "application/octet-stream" : "image/png");
    res.writeHead(200, { "content-type": type });
    fs.createReadStream(file).pipe(res);
  })
  .listen(0);
const base = `http://localhost:${server.address().port}`;

const sitemap = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname || "/");
routes.push("/this-page-does-not-exist");

const problems = [];
const report = (where, msg) => problems.push(`${where}: ${msg}`);
const linkTargets = new Set();

const browser = await chromium.launch();
for (const [vpName, viewport] of Object.entries(VIEWPORTS)) {
  for (const theme of THEMES) {
    const context = await browser.newContext({ viewport, colorScheme: theme, reducedMotion: "reduce" });
    const page = await context.newPage();
    let current = "";
    page.on("console", (m) => m.type() === "error" && !/404/.test(m.text()) && report(current, `console error: ${m.text()}`));
    page.on("pageerror", (e) => report(current, `uncaught: ${e.message}`));

    for (const route of routes) {
      current = `${route} [${vpName}, ${theme}]`;
      await page.goto(base + route, { waitUntil: "networkidle" });
      // Scroll through so lazy content and reveal animations settle.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 300) {
          window.scrollTo({ top: y, behavior: "instant" });
          await new Promise((r) => setTimeout(r, 30));
        }
        window.scrollTo({ top: 0, behavior: "instant" });
      });
      await page.waitForTimeout(300);
      // Diagrams load lazily once scrolled near; give them time to finish.
      if (await page.locator("[data-diagram]").count()) {
        await page.waitForSelector("[data-diagram='rendered']", { timeout: 10000 }).catch(() => {});
      }

      const found = await page.evaluate(() => {
        const out = [];
        const vw = document.documentElement.clientWidth;
        const label = (el) =>
          `<${el.tagName.toLowerCase()}> "${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 50)}"`;
        // Visually hidden (sr-only) content is clipped on purpose.
        const isSrOnly = (el) => {
          for (let n = el; n && n !== document.body; n = n.parentElement) {
            const cs = getComputedStyle(n);
            if (cs.position === "absolute" && (cs.clip === "rect(0px, 0px, 0px, 0px)" || cs.clipPath === "inset(50%)")) return true;
            if (n.classList.contains("sr-only")) return true;
          }
          return false;
        };

        if (document.documentElement.scrollWidth > vw) out.push(`horizontal scroll: page is ${document.documentElement.scrollWidth}px wide in a ${vw}px viewport`);

        for (const el of document.querySelectorAll("body *")) {
          const cs = getComputedStyle(el);
          if (cs.display === "none" || cs.visibility === "hidden" || isSrOnly(el)) continue;
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height) continue;
          if (r.right > vw + 1 && !el.closest("[class*='overflow-x-auto']")) out.push(`past right edge (${Math.round(r.right)}px): ${label(el)}`);
          const textLeaf = el.children.length === 0 && el.textContent.trim();
          if (textLeaf && cs.overflow !== "visible" && cs.textOverflow !== "ellipsis" && (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 2) && !cs.webkitLineClamp?.match(/\d/)) {
            out.push(`clipped text: ${label(el)}`);
          }
        }

        for (const d of document.querySelectorAll("[data-diagram]")) {
          if (d.getAttribute("data-diagram") !== "rendered") out.push("diagram did not render");
        }

        for (const img of document.images) {
          if (img.complete && img.naturalWidth === 0) out.push(`broken image: ${img.currentSrc || img.src}`);
        }

        const links = [...document.querySelectorAll("a[href^='/']")].map((a) => a.getAttribute("href"));
        return { issues: out, links };
      });
      found.issues.forEach((msg) => report(current, msg));
      found.links.forEach((l) => linkTargets.add(l.split("#")[0].split("?")[0]));
    }
    await context.close();
  }
}
await browser.close();
server.close();

for (const href of linkTargets) {
  if (href && !resolveFile(href)) report("links", `internal link has no exported page: ${href}`);
}

const unique = [...new Set(problems)];
if (unique.length) {
  console.error(`✗ ${unique.length} layout problem(s):\n  ${unique.join("\n  ")}`);
  process.exit(1);
}
console.log(`✓ ${routes.length} routes × ${Object.keys(VIEWPORTS).length} widths × ${THEMES.length} themes: no overflow, clipping, broken images, console errors or dead internal links`);
