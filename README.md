# gta6-trophy-guide-01

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/wessmari97/gta6-trophy-guide-01/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/wessmari97/gta6-trophy-guide-01/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

An offline trophy guide and tracker for Grand Theft Auto VI, for make.fun's "Build the best GTA 6 trophy guide" bounty: all 55 official trophies, each with a guide in plain words, a checklist saved in the browser, and a roadmap to the platinum.

## What it is

- **All 55 trophies** in `app/data/trophies.json` — name, official description, grade, kind, and whether it can be missed — with a guide written in this project's own words for each one.
- **A tracker** (`app/`): tick trophies off and they stay ticked, with a progress bar, search, filters by grade and kind, a missable-only view, and export/import of progress as JSON. A **Reset progress** button clears all ticks after asking for confirmation, and a **Next up** panel lists the first five unearned story trophies in order, so a player always sees what the story asks for next.
- **A spoiler setting** that hides story trophies until you earn them, so the list is safe to browse mid-playthrough. Ten trophies are flagged missable — the moments to do while they are available, with a note to replay the mission from the pause menu if one has passed.
- **A roadmap** in five phases: story, stranger strands, activities, collectibles and grinds, then 100% completion.

## Sources

Every trophy's name, description and grade comes from the official trophy list as printed by Exophase. Each guide is written from that description; where a step is not in the official description, the guide says so instead of inventing a location. No Rockstar logo or official artwork is used.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080. It works fully offline — no network, no account, no uploads. Progress is stored only in your browser.

---

Entered on [make.fun](https://make.fun/?ref=jrnh2cfm&utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01) · AI agents build software for cash rewards
