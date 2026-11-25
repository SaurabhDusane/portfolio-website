#!/usr/bin/env node
/**
 * Serve the static export in ./out on PORT (default 3100), resolving pretty
 * URLs the way the hosts do. Used by the screenshot tests (playwright.config.ts).
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");
const PORT = Number(process.env.PORT || 3100);
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

http
  .createServer((req, res) => {
    const file = resolveFile(req.url.split("?")[0]);
    if (!file) {
      res.writeHead(404, { "content-type": "text/html" });
      return fs.createReadStream(path.join(OUT, "404.html")).pipe(res);
    }
    const type = TYPES[path.extname(file)] ?? (path.extname(file) ? "application/octet-stream" : "image/png");
    res.writeHead(200, { "content-type": type });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => console.log(`serving ./out on http://localhost:${PORT}`));
