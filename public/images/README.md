# Image folders

Drop image files into the matching folder, then set the path on the corresponding data field.
**Paths are written from the `/public` root** (e.g. `/images/projects/urban-flood-risk.jpg`).
All cover fields are **optional**: if empty/undefined, the page renders a clean fallback (icon-on-tint
for cards, flat orange for hero/profile banners). No broken images.

```
public/images/
  profile/   — avatar, hero cover, profile card banner
  projects/  — one image per project (r/home's "Hot from r/projects" reuses these)
  writing/   — one cover per essay (optional)
  about/     — any about-page-only images (optional)
```

Adding/changing an image later = drop file into folder + set one path in the data file. Same project
image drives both `/projects` (grid) and `/` (home feed) — single source of truth via `Project.coverImage`.

---

## Recommended specs

| Use                   | Aspect | Suggested size | Format     | Target weight |
| --------------------- | ------ | -------------- | ---------- | ------------- |
| Project / essay cards | 16:9   | 1200 × 675     | jpg / webp | < 300 KB      |
| Hero cover (home)     | 4:1    | 1600 × 400     | jpg / webp | < 350 KB      |
| Profile banner strip  | 4:1    | 1200 × 300     | jpg / webp | < 200 KB      |
| Avatar                | 1:1    | 400 × 400      | jpg / png  | < 150 KB      |

`next/image` resizes and optimizes automatically — provide one high-quality source per slot.

---

## profile/   (set fields on `personalInfo` in `data/personal.ts`)

| File              | Field                       | Example path                              |
| ----------------- | --------------------------- | ----------------------------------------- |
| avatar.jpg        | `personalInfo.avatar`       | `/images/profile/avatar.jpg`              |
| hero-cover.jpg    | `personalInfo.heroCover`    | `/images/profile/hero-cover.jpg`          |
| profile-banner.jpg| `personalInfo.profileCover` | `/images/profile/profile-banner.jpg`      |

`avatar` falls back to `/headshot.png` (current default). `heroCover` falls back to the orange
gradient. `profileCover` falls back to flat orange.

---

## projects/   (set `Project.coverImage` in `data/projects.ts`)

| id | Suggested file                    | Example field value                                     |
| -- | --------------------------------- | ------------------------------------------------------- |
| 0  | production-predictive-analytics.jpg | `/images/projects/production-predictive-analytics.jpg` |
| 1  | urban-flood-risk.jpg              | `/images/projects/urban-flood-risk.jpg`                 |
| 2  | smart-agriculture.jpg             | `/images/projects/smart-agriculture.jpg`                |
| 3  | lstm-election-forecasting.jpg     | `/images/projects/lstm-election-forecasting.jpg`        |
| 4  | fake-news-video-detection.jpg     | `/images/projects/fake-news-video-detection.jpg`        |
| 5  | ai-traffic-optimization.jpg       | `/images/projects/ai-traffic-optimization.jpg`          |

Setting `coverImage` on a project updates **both** the `/projects` grid card AND the "Hot from
r/projects" feed on the home page.

---

## writing/   (set `Article.coverImage` in `data/writing.ts`, optional)

| id | Suggested file                | Example field value                                  |
| -- | ----------------------------- | ---------------------------------------------------- |
| 1  | ai-business-decisions.jpg     | `/images/writing/ai-business-decisions.jpg`          |
| 2  | request-through-fear.jpg      | `/images/writing/request-through-fear.jpg`           |
| 3  | spectrum-of-morality.jpg      | `/images/writing/spectrum-of-morality.jpg`           |
| 4  | conscience-moral-compass.jpg  | `/images/writing/conscience-moral-compass.jpg`       |
| 5  | rationality-paradox.jpg       | `/images/writing/rationality-paradox.jpg`            |
| 6  | religion-culture-us-india.jpg | `/images/writing/religion-culture-us-india.jpg`      |
| 7  | deepfakes-pandemic.jpg        | `/images/writing/deepfakes-pandemic.jpg`             |
| 8  | rationality-vs-practicality.jpg | `/images/writing/rationality-vs-practicality.jpg`  |
| 9  | evolution-of-history.jpg      | `/images/writing/evolution-of-history.jpg`           |

Empty `coverImage` → category icon over orange tint. Filenames are suggestions; use whatever you want
as long as the path matches the field value.

---

## about/

Currently unused. Reserved for any about-page-only imagery you may add later (e.g. a campus photo,
project diagrams). Wire by importing the path directly in `app/about/page.tsx` if/when needed.

---

## Don't

- **Don't duplicate images.** Projects own their images in `projects/`; home borrows them via the
  same `Project.coverImage` field.
- **Don't create a `home/` folder.** Home reuses project + profile images.
- **Don't hardcode paths in components.** All image paths live in `data/personal.ts`,
  `data/projects.ts`, and `data/writing.ts`. The components read from there.

---

## Deployment notes (Vercel)

### OG image

The site references `/og-image.png` for social link previews (LinkedIn, Twitter, iMessage). It is
**not** included in the repo — drop a `1200x630` PNG at `public/og-image.png` and it will be picked
up automatically.

Suggested content: dark background (`#1A1A1B`), "Saurabh Nilesh Dusane" + "AI/ML Engineer · Data
Scientist", the **SD** monogram in orange (`#FF4500`). Keep one font weight for the name and a
lighter weight for the role line. No clutter.

### Custom domain + canonical URL

Once the custom domain is live (e.g. `saurabhdusane.com`), set this Vercel environment variable so
OG/canonical URLs resolve to the production host:

```
NEXT_PUBLIC_SITE_URL=https://saurabhdusane.com
```

Read by `app/layout.tsx` to populate `metadataBase`, `openGraph.url`, etc. Falls back to
`https://saurabhdusane.com` if unset.

### Analytics

Enable **Vercel Analytics** from the project dashboard (Analytics tab → Enable). No code changes
required; Vercel injects the script automatically on the deployed build.

### Favicon / app icons

`app/icon.tsx` and `app/apple-icon.tsx` generate the favicon and Apple touch icon at build time
using the `SD` monogram. No static files to maintain. Edit those files to change the mark.
