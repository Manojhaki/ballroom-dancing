# CLAUDE.md — Ballroom Dancing resource site

This file briefs you (Claude Code) on the project. Read it at the start of every
session. It is the source of truth for *intent, structure, voice, and rules*.

## FIRST TASK EVERY SESSION: reconcile with reality

This brief describes the **intended** architecture (Astro, content collections).
The actual repo may differ. Before acting on anything below:

1. Inventory the real repo — file tree, framework, config, existing content.
2. If the stack is NOT Astro (e.g. plain HTML, Jekyll, Next, Hugo), do NOT force
   Astro on it. Adapt the *ideas* here — the content model, copyright lanes,
   beginners-first structure, and voice — to whatever framework is actually present.
3. Tell the user, in one short summary, where the repo matches this brief and
   where it diverges, before writing code.

---

## What this project is

A static, **first-person** guide to ballroom dancing, written for **complete
beginners first**. The author danced ~4 years — started cold at an Arthur Murray
chain studio, moved through independent studios across several states, danced
American Smooth showcases, then competed **Open Latin** (Cha Cha, Samba, Rumba,
Jive). The site is that hard-won map, given away free.

**Emotional thesis (this drives the homepage):** a friend once asked the author,
"I wonder what it's like to be inside music?" That question is the hook. The site
leads with *the feeling* of dancing, not the taxonomy. Homepage opens on the
question and the walk-in-cold origin story — never a dry "ballroom has two styles."

**The author is currently on a break from dancing** and is fine with that being
visible on the site ("dancers step away and come back"). Keep that note honest and
warm, not apologetic.

## Audience priority (affects structure and tone)

1. Total beginners  ← most weight; homepage + Start Here carry the site
2. New competitors
3. Collegiate dancers
4. Social dancers

Syllabus depth and competition detail live *deeper* in the site, reachable when
someone is ready — never front-loaded over the beginner on-ramp.

## Voice

- First person throughout. "When I walked into my first class..." not "One might..."
- Feeling before taxonomy. Warm, honest, specific. No hype, no jargon walls.
- Sentence case in headings and UI. Plain verbs. Short paragraphs.
- The author's real story is the differentiator — lean on it, especially the
  studio-hopping and "finding your people" angle that generic sites never cover.

---

## Intended architecture (Astro — adapt if repo differs)

```
src/
  pages/            URL routes (index, /start, /american, /international, /compete, /resources, rss.xml)
  layouts/          Base.astro (shell + SEO + nav + footer), Guide.astro (prose page)
  content/
    guides/         first-person writing (markdown), frontmatter: section, order, description
    dances/         one file per dance — factual, links out to syllabi
    config.ts       content-collection schemas + validation
  styles/global.css design tokens (color, type, spacing), dark-mode aware
public/             served as-is (_headers, favicons, Library of Congress scans)
```

- Zero JS ships by default. Interactive "islands" (syllabus filter, "which dance
  suits you" quiz) can be added later without re-architecting.
- Content is markdown in typed collections. Adding a page = drop a file in the
  right folder; it appears in its section index automatically.

## Sitemap (beginners-first)

- `/` — the music question, origin story, 3 entry paths (beginner / competitor / official stuff)
- `/start/` — what ballroom is, American-vs-International explainer, **chain-vs-independent studios**, glossary
- `/american/` — Smooth (Waltz, Tango, Foxtrot, VW) + Rhythm (Cha Cha, Rumba, ECS, Bolero, Mambo)
- `/international/` — Standard (Waltz, Tango, Foxtrot, Quickstep, VW) + Latin (Cha Cha, Samba, Rumba, Paso, Jive)
- `/compete/` — first comp, levels explained, collegiate, attire/etiquette. ("How I found a competitive partner" = later, stub for now.)
- `/resources/` — annotated links to official syllabi + free manuals
- `/history/` — Library of Congress public-domain manuals (hostable content)
- `/about/` — author story + `/credits`

---

## Competition structure (reference — get this right on /compete/ pages)

**The broad taxonomy (two styles, two families each):**
- **American** → Smooth + Rhythm
- **International** → Standard + Latin

**Proficiency ladder — CLOSED vs OPEN (the key distinction most beginner sites miss):**
- **Closed / syllabus levels:** Newcomer → Bronze → Silver → Gold. Couples may ONLY
  perform figures from the **allowed syllabus** for that level — a defined, restricted
  list. You cannot legally dance a Silver figure in a Bronze event.
- **Open levels:** Novice / Pre-Champ / Championship. The figure restriction lifts —
  couples choreograph **custom routines** with any figures and their own composition.
- Mental model to teach: **closed = follow the approved menu; open = write your own.**
- Levels are **cumulative**: Silver may use Bronze + Silver figures; Gold adds Gold on
  top — but never above your level.

**Terminology note to clarify for readers:** "syllabus" and "closed" mean the same idea
(restricted to an allowed figure list). Comps label events inconsistently — sometimes
"Syllabus" is an umbrella for all closed levels, sometimes it's its own named event
(e.g. a "Syllabus Paso Doble" listed separately from "Gold"). Say this plainly so
newcomers aren't confused.

**Single-dance vs. multi-dance events:** beginners dance single-dance events (e.g.
"Newcomer Cha Cha"); higher levels bundle dances ("Silver Samba Jive"), up to the full
four-dance set at Gold/Open (Latin = Cha Cha, Rumba, Samba, Paso Doble, Jive; the
"CRSJ" style abbreviations show up in event names).

**Scoring — the skating system (great plain-language explainer opportunity):**
- Each couple gets ordinal placements from judges/dances, shown as tuples e.g. (1,1).
- **Sum** = total; **lowest sum wins**. (1,1) Sum 2 beats (3,2) Sum 5.
- **"Rule 11"** = the skating-system tiebreak that resolves equal sums. Half-marks
  (e.g. 4.5) come from split judge decisions.
- The skating system is notoriously opaque to newcomers — a `/compete/how-scoring-works`
  page in plain language is high-value.

**Collegiate specifics:** couples compete under university affiliations (or
"Unaffiliated"); Newcomer often splits into I and II (first-timers vs. more experienced
newcomers); special formats exist like **Rookie-Vet** (pairs a first-year with an
experienced dancer). These belong on `/compete/collegiate`.

**Where competitions happen (three arenas — good newcomer mental map):**
- **Collegiate competitions** — hosted by university teams, many across the season,
  competitors dance under school affiliations (e.g. BAM Jam).
- **Studio / private competitions** — independent and chain studios host their own
  events, including pro-am and showcase formats.
- **Federation / organization events** — bodies like **NDCA** and **USA Dance** sanction
  comps and open membership registration for competitors to enter; the more formal,
  nationally-organized tier.

**Mandatory move-up ("pointing out") — teach the principle, not a fixed number:**
- Do well enough at a level and you're **required to move up** to the next one. Purpose:
  prevents experienced couples from camping at a level they've outgrown ("sandbagging")
  and keeps competition fair for genuine newcomers.
- Usually a **points system** — placing well accrues points; hitting a threshold "points
  you out" of that level.
- IMPORTANT: the exact mechanics (points needed, wins counted, per-partnership vs.
  per-dancer, reset rules) **VARY BY ORGANIZATION AND CIRCUIT** (collegiate vs. NDCA vs.
  USA Dance all differ). Do NOT state a specific threshold as universal. Frame it as:
  the principle is universal, the numbers depend on the organizing body — check that
  comp's rules.

**COPYRIGHT on results data:** competition *structure and terminology* (levels, skating
system, Rule 11, formats) are FACTS — free to use. But specific **results — real
dancers' names, schools, placements — are personal data; DO NOT republish them.** Learn
the format from results pages, then write about the format generically.

---

## COPYRIGHT — HARD RULES (do not violate, even if asked)

Three lanes. When creating or editing any content page, classify the material first.

**GREEN — host freely on the site:**
- The author's own writing. Facts about dance aren't copyrightable.
- Figure *names* and level lists (e.g. "Bronze Waltz: Box Step, Natural Turn").
  NAMES ONLY — never the step-by-step footwork charts, alignments, or descriptions
  as written in a syllabus book.
- Library of Congress public-domain manuals (scans, excerpts, images, downloads).
- The author's own photos and diagrams.

**YELLOW — link or embed only, never copy:**
- USA Dance / NDCA / Dance Vision PDFs → link to the official URL (also keeps the
  site current when syllabi update).
- Free third-party manuals (e.g. Buell) → link, don't rehost.
- YouTube videos → standard `<iframe>` embed; never download and rehost video.
- Short quotes (a sentence or two) with clear attribution are fine.

**RED — keep off the site entirely:**
- WDSF / ISTD / Laird / Alex Moore technique-book content (actively sold products).
- Proprietary Arthur Murray / Fred Astaire internal syllabus material.
- Unlicensed photos/video of identifiable dancers; pro dance photography.
- Hosted song audio or lyrics → link to Spotify/YouTube playlists instead.

Enforce this structurally: the `dances` collection has `bronzeFigures` (names) and
`officialSyllabus` (a link), so the "names yes, charts no, link the source" pattern
is built into the data model. Keep it that way.

Footer must carry attribution: original content under a chosen license (currently
CC BY-NC-SA 4.0); linked materials credited to their organizations; LoC manuals
noted as public domain. Maintain a `/credits` page listing external sources.

---

## Deploy

- Cloudflare Pages: build `npm run build`, output `dist`. (Preferred.)
- GitHub Pages: workflow in `.github/workflows/deploy.yml` builds and deploys on
  push to the default branch.
- Set the real domain in `astro.config.mjs` (`SITE_URL`) before first deploy — it
  drives canonical URLs and RSS.
- Note: `@astrojs/sitemap` had a version conflict in the starter and was removed;
  re-add on a matching version or generate a static sitemap.

## Working agreements

- Before multi-file changes, state a short plan and wait for a go-ahead.
- Show diffs; keep commits small with clear messages.
- Don't invent syllabus content to fill a page — if figures aren't known, leave a
  clearly marked stub and link the official syllabus.
- Placeholders to replace when identity is decided: site name ("Inside the Music"),
  `SITE_URL`, accent color in `global.css`.
- When unsure about architecture or scope, ask — the user plans the big moves in a
  separate Claude conversation and brings specs here to execute.