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
npm run check:assets   # missing files, resume and image sizes, photo metadata
npm run check:layout   # needs a build in ./out
npm run check:links    # outside links (Medium, GitHub, ...); needs a build
npm run check:lighthouse  # Lighthouse on the main pages; needs a build
```

`check:layout` serves the static export and opens every page in `sitemap.xml` (plus the
404 page) at phone, tablet and desktop widths in light and dark mode. It fails on
horizontal scroll, content past the viewport edge, clipped text, broken images,
diagrams that never render, console errors and dead internal links. CI
(`.github/workflows/ci.yml`) runs all five on every push to `main` and every pull request.
`.github/workflows/weekly-check.yml` runs the link and Lighthouse checks every Monday and
opens (or updates) a GitHub issue labelled `site-health` when something needs a look.

## Images and resume

See [ASSETS.md](ASSETS.md). In short: upload files to `uploads/` on GitHub with names like
`resume.pdf`, `avatar.jpg`, `project-guardian.jpg` or `logo-cis.svg`, and a GitHub Action
resizes them, strips photo metadata and opens a pull request.

## Editing content

All content lives in `data/`, so most updates don't touch components:

| File               | What it controls                                    |
|--------------------|-----------------------------------------------------|
| `data/personal.ts` | Name, links, bio, education, experience, skills     |
| `data/projects.ts` | Projects on `/projects` and each `/projects/[slug]` page |
| `data/writing.ts`  | Articles shown on `/writing` and the home page      |
| `data/about.ts`    | About page: opening line, quick facts, impact numbers, "Outside work" |

- Projects with `featured: true` appear under "Selected work" on the home page.
- `summary` is the one-liner in lists; `stat` is the single fact shown in accent color.
- A project page shows `description` + `highlights` until its `caseStudy` has content,
  then switches to the full case-study sections.
- GitHub links that point at the bare profile (not a repo) are hidden on purpose.
- `keyNumbers` (optional) fills the strip of headline numbers at the top of a project page.
- Every project gets a generated cover (`components/ProjectCover.tsx`): a small graph seeded
  from its slug, styled per theme. A real image at `public/images/projects/<slug>.webp`
  replaces it on the project page (see ASSETS.md).
- The About page's timeline uses each job's `headline` (in `data/personal.ts`) as its
  one-line summary. "Outside work" shows `community` and `now` from `data/about.ts`.
- The "How I work" demos live in `components/HowIWork.tsx`; they're simplified
  simulations of real incidents from the SEC pipeline and miniagent.
- The "Skills in practice" map on /about is defined in `data/skills.ts`: each capability
  lists tech tags, and projects are linked to it through their `techStack`.
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
- **Background:** `components/SiteBackground.tsx` draws an interactive network graph fixed
  behind every page (canvas, in the root layout, so it persists across navigation). Dark mode
  renders it as a twinkling night sky; light mode as an ink sketch on a drafting grid. The
  cursor links into the graph, clicking empty space sends a signal hop by hop along the links,
  toggling the theme sends a wave from the toggle, small ambient signals fire on their own,
  and points move at different depths as you scroll. CSS dims it behind the reading column.
  It starts when the browser is idle, caps at ~40 fps, pauses in background tabs, and is
  static under `prefers-reduced-motion`.
- **Page transitions:** `experimental.viewTransition` plus React's `<ViewTransition>`
  (`app/template.tsx`). Project thumbnails and titles share names with the project page, so
  they morph into its cover and heading. Header links slide the page in the direction of
  travel along the nav (Home → Work → Writing → About → Contact), with the header held still
  and the background graph drifting the same way. Browsers without View Transitions just
  navigate.
- **Components:** `.btn` / `.btn-primary` / `.btn-secondary`, `.row` (list items with
  hover), `.timeline-item` (date | content), `.bullets`, `.field` (form inputs).
