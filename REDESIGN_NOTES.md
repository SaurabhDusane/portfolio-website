# Redesign Notes — Dark-Mode Modern Reddit Portfolio

## What Changed

The portfolio was redesigned from a dark purple glassmorphism theme into a
**dark-mode, modern-Reddit-inspired** experience. The Reddit metaphor (subreddit
navigation, post cards with vote rails, flair pills, community stats) is the
delight layer; the content remains 100% professional.

## Route Map

| Route      | Description                    | Notes                     |
|------------|--------------------------------|---------------------------|
| `/`        | Home feed (pinned welcome + hot posts) |                    |
| `/projects`| All 6 projects as post cards   | Sort: Hot / New / Top     |
| `/writing` | All 9 articles with category tabs |                        |
| `/about`   | Reddit-style user profile      |                           |
| `/contact` | Message composer + quick links |                           |
| `/bio`     | Redirects to `/about`          | Backward-compat redirect  |

## Component Map

| Component          | File                            | Purpose                               |
|--------------------|---------------------------------|---------------------------------------|
| `ShellLayout`      | `components/ShellLayout.tsx`    | 3-column layout orchestrator          |
| `TopBar`           | `components/TopBar.tsx`         | Logo, search, profile chip            |
| `LeftSidebar`      | `components/LeftSidebar.tsx`    | Subreddit-style nav + CTA             |
| `RightSidebar`     | `components/RightSidebar.tsx`   | Profile card (avatar, karma, trophies)|
| `PostCard`         | `components/PostCard.tsx`       | Reddit post anatomy w/ vote rail      |
| `VoteRail`         | `components/VoteRail.tsx`       | Up/down arrows, local-state bounce    |
| `FlairPill`        | `components/FlairPill.tsx`      | Colored tag chip                      |
| `FeedTabs`         | `components/FeedTabs.tsx`       | Hot / New / Top / category filter     |
| `AwardBadge`       | `components/AwardBadge.tsx`     | Trophy with hover popover             |
| `SearchBar`        | `components/SearchBar.tsx`      | Reddit-style search input             |
| `ShortcutsModal`   | `components/ShortcutsModal.tsx` | ? key shows keyboard shortcuts        |

## CSS Variable Theme

```css
--bg: #0B0B0C          --accent: #FF4500
--surface: #1A1A1B     --accent-2: #FF6A33
--card: #272729        --upvote: #FF4500
--card-hover: #2E2E30  --downvote: #7193FF
--border: #343536      --link: #4FBCFF
--text: #D7DADC        --success: #46D160
--text-muted: #818384
```

## Content Decisions

- **Vote counts**: Real per-project metrics (50K records, 86% accuracy, etc.)
- **Karma**: 1,500+ community reach (from Phoenix AI Club)
- **GPA**: Separate badge, not karma
- **Trophies**: AVEVA EcoTech 3rd, Smart India Hackathon 2nd, Phoenix AI Club Co-founder
- **All 6 projects** rendered from `data/projects.ts`
- **All 9 articles** rendered from `data/writing.ts` with working category filter
- **Experience order**: Current (ASU Research) > Internship > Teaching

## TODO Placeholders

- Form endpoint: currently using Formspree (`xblgpjrp`). Update if needed.
- Search: wired to state but does not yet filter content across pages.

## Accessibility

- Semantic landmarks, ARIA labels on vote buttons
- Focus-visible ring on all interactive elements
- `prefers-reduced-motion` disables animations
- Keyboard shortcuts: `?` for help, `g+h/p/w/a/c` for navigation
