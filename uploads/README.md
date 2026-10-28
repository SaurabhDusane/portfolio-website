# Uploads

Drop new files here (on GitHub: **Add file → Upload files**, then commit to `main`).
A GitHub Action resizes them, strips photo metadata, moves them to the right place,
and opens a pull request for you to merge. Name each file for its slot:

| Name | Becomes |
| --- | --- |
| any `.pdf` (one at a time) | the resume, at `/resume.pdf` |
| `avatar.jpg` (or `photo` / `profile` / `headshot`) | the profile photo |
| `project-<slug>.jpg`, e.g. `project-guardian.jpg` | that project's cover |
| `logo-<id>.svg` or `.png`, e.g. `logo-cis.svg` | a community logo |

Full guide, slugs and ids: [ASSETS.md](../ASSETS.md).
