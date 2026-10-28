# Saurabh Dusane — Portfolio

Personal portfolio of Saurabh Nilesh Dusane (AI/ML Engineer). Built with Next.js 16
(App Router, static export), React 19 and Tailwind CSS 4.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

The site is exported as static HTML to `out/` (`output: "export"` in `next.config.ts`)
and deployed via Netlify (`netlify.toml`).

## Checks

```bash
npm run lint
npm run typecheck
npm run build
npm run check:layout   # needs a build in ./out
```

`check:layout` serves the static export and opens every page in `sitemap.xml` (plus the
404 page) at phone, tablet and desktop widths in light and dark mode. It fails on
horizontal scroll, content past the viewport edge, clipped text, broken images,
diagrams that never render, console errors and dead internal links. CI
(`.github/workflows/ci.yml`) runs all four on every push to `main` and every pull request.

## Editing content

All content lives in `data/`, so most updates don't touch components:

| File               | What it controls                                    |
|--------------------|-----------------------------------------------------|
| `data/personal.ts` | Name, links, bio, education, experience, skills     |
| `data/projects.ts` | Projects on `/projects` and each `/projects/[slug]` page |
| `data/writing.ts`  | Articles shown on `/writing` and the home page      |

- Projects with `featured: true` appear under "Selected work" on the home page.
- `summary` is the one-liner in lists; `stat` is the single fact shown in accent color.
- A project page shows `description` + `highlights` until its `caseStudy` has content,
  then switches to the full case-study sections.
- GitHub links that point at the bare profile (not a repo) are hidden on purpose.
- Projects with a filled-in `caseStudy` get a "Case study" badge in lists. Every section
  is optional; `architecture.mermaid` takes a Mermaid flowchart, which is loaded only when
  scrolled into view and stacks vertically when a left-to-right layout would get too small.

## SEO and sharing

- `app/sitemap.ts` and `app/robots.ts` generate `sitemap.xml` and `robots.txt`.
- Every page sets a canonical URL; the home page includes schema.org `Person` data.
- Social preview images are generated at build time: `app/opengraph-image.tsx` for the
  site and `app/projects/[slug]/opengraph-image.tsx` per project (layout in `lib/og.tsx`).
- Set `NEXT_PUBLIC_SITE_URL` in the deploy environment if the domain isn't
  `https://saurabhdusane.com` (see `lib/site.ts`).
- `public/images/profile/avatar.webp` is a 256px crop of `public/headshot.png` (~6 KB
  instead of 1.5 MB); regenerate it if the photo changes.

## Design system

Defined in `app/globals.css`:

- **One reading column**, 760px max (`.page`), 24px gutters (16px on phones).
- **Type scale:** 14 / 16 / 20 / 28 / 40px (`.t-small`, `.t-body`, `.t-h2`, `.t-h1`, `.t-display`).
- **Color:** warm neutrals plus one accent, as CSS variables for light and dark themes.
  All text tokens meet WCAG AA contrast on both the page and hover backgrounds.
- **Home background:** `components/HeroBackground.tsx` draws an interactive network graph
  behind the intro (canvas). The cursor links into the graph; clicking empty space sends a
  signal hop by hop along the links. It starts when the browser is idle, pauses off-screen,
  follows the theme, and is static under `prefers-reduced-motion`.
- **Components:** `.btn` / `.btn-primary` / `.btn-secondary`, `.row` (list items with
  hover), `.timeline-item` (date | content), `.bullets`, `.field` (form inputs).
