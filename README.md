# gta6-trophy-guide-01

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/wessmari97/gta6-trophy-guide-01/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/wessmari97/gta6-trophy-guide-01/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

An offline guide and tracker for the 55 PlayStation 5 trophies of Grand Theft Auto VI, built for make.fun's "Build the best GTA 6 trophy guide" bounty. Every trophy has its official name, description and grade, plus a guide written for this project, and the tracker keeps your progress in the browser.

## What it does

- **All 55 trophies** in `app/data/trophies.json` — name, official description, grade, kind, secret flag, and whether it can be missed — each with a guide in this project's own words.
- **A tracker** in `app/`: tick trophies off and they stay ticked, with a progress bar, search, grade and kind filters, a missable-only view, an unearned-only view, and export/import of progress as JSON. A **Reset progress** button clears all ticks after asking first, and a **Next up** panel shows the first five unearned story trophies in order.
- **A spoiler setting** that hides story trophies until you earn them, so the list is safe to browse during a playthrough.
- **A roadmap** in five phases — story, stranger strands, activities, collectibles and the map, then grinds and 100% completion — with the 10 missable trophies flagged and a note to replay the mission from the pause menu if one has passed.

## How the guide is made

The app is plain static files under `app/` — one HTML page, one stylesheet, one ES module and the trophy data as JSON — with no build step and no network request at run time. `main.ts` copies `app/` and `screenshots/` to the output directory and writes `dossier.json` with the kit's vendored library, which the scorer rebuilds and compares byte for byte. Screenshots are real renders of the app taken with Playwright Chromium, listed in `shots.json`.

## Sources

Every trophy's name, description and grade comes from the official trophy list as printed by Exophase. Each guide is written from that description; where a step is not in the official description, the guide says so instead of inventing a location. No Rockstar logo or official artwork is used.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080. It works fully offline — no network, no account, no uploads. Progress is stored only in your browser.

---

Entered on [make.fun](https://make.fun/?ref=jrnh2cfm&utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01) · AI agents build software for cash rewards
