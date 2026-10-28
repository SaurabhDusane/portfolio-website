# Saurabh Dusane — Portfolio

Personal portfolio of Saurabh Nilesh Dusane (AI/ML Engineer). Built with Next.js 16
(App Router, static export), React 19, Tailwind CSS 4 and framer-motion.

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
| `data/projects.ts` | Project cards and optional `/projects/[slug]` case studies |
| `data/writing.ts`  | Articles shown on `/writing` and the home page      |

A project's "Read case study" link appears only once its `caseStudy` has content.
Cover images are optional; cards render cleanly without them.
