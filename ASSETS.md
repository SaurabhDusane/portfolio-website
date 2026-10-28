# Images and resume

Every file the site uses has a **fixed name**. Replace the file and the site picks it up;
no code or data changes. There are two ways to do it.

## The easy way: upload to `uploads/`

1. On GitHub, open the [`uploads/`](uploads/) folder → **Add file → Upload files**.
2. Drop in your files, named as in the table below (case doesn't matter), and
   **commit directly to `main`**.
3. Wait about two minutes. The **Process uploads** action (under the Actions tab):
   - resizes each image and saves it as WebP,
   - removes camera metadata, including the location where a phone photo was taken,
   - moves each file to its fixed path,
   - checks and builds the site,
   - opens a pull request called **Add uploaded assets**.
4. Look at the Vercel preview on that pull request, then merge it.

| Name the file | What it becomes | Saved as |
| --- | --- | --- |
| anything ending in `.pdf` | The resume (upload one at a time) | `public/resume.pdf` |
| `avatar.jpg` (or `photo`, `profile`, `headshot`) | Profile photo on Home and About | `public/images/profile/avatar.webp`, 512×512 |
| `project-<slug>.jpg` | Cover at the top of that project's page | `public/images/projects/<slug>.webp`, 1200×675 |
| `logo-<id>.svg` or `logo-<id>.png` | Logo in the community list on About | `public/logos/<id>.svg` or `.webp`, 96×96 |

JPEG, PNG and WebP work for photos. iPhone **HEIC** photos don't; export them as JPEG first.
A file whose name doesn't match a slot stays in `uploads/`, and the action's run summary
says why.

Uploading to a branch other than `main` works too. The result is committed to that branch
instead of a new pull request.

**Project slugs:** `guardian`, `fp8-kvcache`, `miniagent`, `agent-compare`, `judge-ai`,
`urban-flood-risk`, `sec-litigation-scraper`, `indiakanoon-scraper`, `video-to-3d-mesh`,
`predictive-analytics-platform`, `smart-agriculture`, `lstm-election-forecasting`,
`fake-news-video-detection`, `ai-traffic-optimization` (the `slug` field in `data/projects.ts`).

**Community ids:** `issc`, `cis`, `phoenix-ai` (the `id` field in `data/about.ts`). Use each
organisation's own logo, never an official Arizona State University logo.

### One-time setup

The action needs permission to open pull requests. In the repository on GitHub, open
**Settings → Actions → General → Workflow permissions**. Choose **Read and write permissions**
and tick **Allow GitHub Actions to create and approve pull requests**. Without the tick, the
action still pushes its branch and leaves a link in the run summary for opening the pull
request yourself.

A pull request opened by the action doesn't start the usual CI run, which is how GitHub
treats its own bot. The action already runs the asset check and a full build before opening
it, and CI runs again on `main` after you merge.

## By hand

Put the file at its fixed path under `public/` and commit. Keep to these sizes, or CI will
stop the change with a message saying what to fix:

| File | Size limit | Notes |
| --- | --- | --- |
| `public/resume.pdf` | 1 MB | Must be a PDF. The "updated" date shown next to the download button comes from the PDF itself. |
| `public/images/profile/avatar.webp` | 200 KB | Square. |
| `public/images/projects/<slug>.webp` | 400 KB | 16:9. A `.jpg` or `.png` with the same name works too. |
| `public/logos/<id>.svg` | 60 KB | No scripts. A `.webp` or `.png` works too. |
| any other image in `public/` | 500 KB | |

Photos must have no camera metadata. Uploading through `uploads/` removes it for you.

## What CI checks

`npm run check:assets` runs on every push and pull request. It fails when:

- a data file or page points at a file that isn't in `public/`,
- the resume is missing, isn't a PDF, or is over 1 MB,
- an image is over its size limit or can't be read,
- a photo still carries EXIF or XMP metadata, which can include GPS location,
- an SVG contains scripts or event handlers.

## Notes

- The resume used to live at `/Resume_Saurabh_Nilesh_Dusane.pdf`. That address now
  redirects to `/resume.pdf` (in `vercel.json` and `netlify.toml`), so links you've
  already shared keep working.
- Projects without a cover show a generated graph instead, so a missing cover never
  looks broken. The same goes for community entries without a logo, which show a monogram.
- The share images for links (LinkedIn, X, Slack) are generated from the page content, so
  there's nothing to upload for them.
