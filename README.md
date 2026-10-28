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

## Design system

Defined in `app/globals.css`:

- **One reading column**, 760px max (`.page`), 24px gutters (16px on phones).
- **Type scale:** 14 / 16 / 20 / 28 / 40px (`.t-small`, `.t-body`, `.t-h2`, `.t-h1`, `.t-display`).
- **Color:** warm neutrals plus one accent, as CSS variables for light and dark themes.
  All text tokens meet WCAG AA contrast on both the page and hover backgrounds.
- **Components:** `.btn` / `.btn-primary` / `.btn-secondary`, `.row` (list items with
  hover), `.timeline-item` (date | content), `.bullets`, `.field` (form inputs).
