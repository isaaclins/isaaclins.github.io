# How to write a blog post for isaaclins.com

This is the house style. It's reverse-engineered from the two posts that nailed
the voice — [`why-spacex-paid-60-billion-for-a-vscode-fork.md`](content/blog/why-spacex-paid-60-billion-for-a-vscode-fork.md)
and [`git-wasnt-built-for-agents.md`](content/blog/git-wasnt-built-for-agents.md).
When in doubt, open those two and match them. Everything below is just naming
what they already do.

The site runs on **Hugo**. Posts live in `content/blog/<slug>.md` with `+++`
(TOML) front matter. Images go in `images/` (SVGs in `images/svg/`).

---

## The one-sentence version

Take one piece of tech news, find the part everyone is getting wrong, and
explain the *real* story to a smart friend who isn't a specialist — in plain
words, with every claim linked to a source, and a strong opinion at the end.

---

## Voice

Write like you're talking to one curious person, not an audience.

- **Second person, present tense.** "You throw away the most valuable thing you
  made." Address the reader directly: *"Read that again."* *"Sit with it for a
  second."*
- **Show up as a person.** First-person opinions are welcome and expected:
  *"I think they're right."* *"My favorite detail:"* *"let me explain why it's
  the smartest thing Mr. Musk has done all year."* Have a take. Don't hedge into
  mush.
- **Vary the rhythm. Use fragments for punch.** Long explanatory sentence, then
  a short one that lands. *"A rocket company bought a code editor."* *"For that."*
  *"That's the plan."* *"That's not noise."*
- **Plain words over jargon, always.** If a normal person wouldn't know a term,
  define it inline in parentheses the first time — casually, not like a textbook:
  *"every time you save a version of your code (what programmers call a `git
  commit`)"*, *"(A "forge" is just the website where code lives and gets
  reviewed — GitHub is the famous one.)"*, *"(`git blame` is the tool that tells
  you who last touched a line and when.)"*
- **Concrete over abstract.** Real numbers, real dates, real names — and **bold
  the ones that matter**: *"**$60 billion**"*, *"**Four billion a year by June
  2026**"*. Turn abstractions into images: *"The editor is just the bucket the
  data drips into."*
- **Reframe, don't just report.** The signature move is the pivot from the
  obvious read to the real one: *"They didn't buy the editor. They bought you."*
  *"The pull request was a workaround all along."* Set up what everyone assumes,
  then flip it.

**Avoid:** corporate filler ("In today's fast-paced world…"), throat-clearing
intros, hype words with nothing behind them, and walls of text. No emoji. Don't
explain that you're about to explain something — just do it.

---

## Shape of a post

1. **Front matter** (see reference below).
2. **The hook** — 2–3 short paragraphs, no heading. Open on a concrete fact or
   scene, then immediately reframe it into the question the post answers. End the
   hook by telling the reader what you're about to argue.
   - SpaceX post: states the $60B fact → "A rocket company bought a code editor"
     → "let me explain why it's the smartest thing Mr. Musk has done all year."
   - Git post: "every time you save your code, you throw away the most valuable
     thing you made" → sets up that the *conversation* is what's lost → "Two
     companies decided that's the problem worth fixing this month. I think
     they're right."
3. **3–6 body sections**, each under an `##` heading that is *an argument, not a
   label* (see below).
4. **A "so what does this mean for you" like section** near the end — bring it back to
   the reader's actual day. ("If you pay them $20 a month", "So what does this
   actually feel like, day to day?")
5. **An honest caveat** when the topic is a prediction or unshipped thing — say
   plainly what's uncertain. ("The honest caveat" / "nothing's been announced
   yet".) Credibility comes from admitting the limits of the take.
6. **A closing line that zooms out** — one resonant sentence, often a callback to
   the opening image. *"That's the save button starting to lose its grip."*
7. **An FAQ block** (shortcode — see below). Every post ends with one.

Keep posts in the ~900–1,600 word range. Tight beats long.

---

## Headings are arguments

Each `##` should make a claim or tell a mini-story, so the page is readable by
headings alone. Steal the cadence:

- "The number doesn't make sense until you watch it grow"
- "They didn't buy the editor. They bought you."
- "The irony nobody at SpaceX will say out loud"
- "What Git actually is, and why it's the wrong shape"
- "The clever part: conflicts stop being your problem"
- "The pull request was a workaround all along"

Use `##` for sections and `###` only for sub-points inside one. Never use `#`
(that's the title) and avoid `####`+ — the table of contents only shows `##`/`###`.

---

## Sourcing — link everything

This is non-negotiable and a big part of why these posts read as trustworthy.
**Every factual claim links to a primary source** inline, on the words that make
the claim:

> SpaceX [signed the papers to buy Cursor](https://techcrunch.com/...) for **$60 billion**

> Git, [born in 2005](https://en.wikipedia.org/wiki/Git#History), saves your project's history…

- Link on the meaningful phrase, never "click here".
- Prefer the original source (the company's own post, the filing, the news
  outlet that broke it) over aggregators.
- **Cross-link your own posts** generously with root-relative paths, woven into
  the sentence: `[Anthropic's Claude](/blog/claude-fable-5-mythos-5/)`,
  `[SpaceX buying Cursor for $60 billion](/blog/why-spacex-paid-60-billion-for-a-vscode-fork/)`.
  These two posts deliberately point at each other — related posts should form a
  little web.

---

## Signature elements (shortcodes)

These two live in `layouts/shortcodes/`. Reach for them — they're part of the look.

**FAQ** — every post ends with one. Doubles as SEO (emits FAQPage structured
data). One `Question || Answer` per line; the answer may contain Markdown/links:

```
{{</* faq */>}}
How much did SpaceX pay for Cursor? || **$60 billion**, paid in SpaceX shares instead of cash.
Why did SpaceX buy Cursor? || For the data — the recordings of people coding inside it.
{{</* /faq */>}}
```

**bar-chart** — minimal monospace bars for showing a number growing. One
`label | value | optional-sublabel` per line; it auto-computes the `×` multiplier
between rows:

```
{{</* bar-chart caption="Cursor / Anysphere valuation by round" prefix="$" suffix="B" */>}}
Series B | 2.6 | Dec 2024
Series C | 9 | May 2025
Series D | 29.3 | Late 2025
SpaceX buyout | 60 | Jun 2026
{{</* /bar-chart */>}}
```

Other shortcodes exist (`details`, `image`, `highlight`, `toc`, …) — see
`layouts/shortcodes/` and `content/blog/_TEMPLATE.md` for the full Markdown
toolbox. Don't overuse them; the two posts above use exactly one chart plus the
FAQ.

---

## Front matter reference

```toml
+++
title = "Why SpaceX paid $60 billion for a VSCode fork"
date = 2026-06-17
draft = false
tags = ["Dev", "AI", "Cursor", "SpaceX"]
complexity = "medium"
description = "SpaceX bought Cursor for $60 billion in shares, not cash. They didn't really want the code editor. They wanted the millions of people coding inside it, and the data they create."
+++
```

- **`title`** — a provocative question or bold claim, not a topic label.
  "Why SpaceX paid $60 billion for a VSCode fork" > "The SpaceX/Cursor deal".
- **`date`** — `YYYY-MM-DD`, **unquoted**. Use the real current date.
- **`draft`** — start `true` while writing; flip to `false` to publish.
- **`tags`** — title-case topic tags. The common buckets are `Dev`, `AI`,
  `Security`, `Ops`, `Productivity`, `Tech` — plus specific ones for the subject
  (`Cursor`, `Git`, `Version Control`). 2–4 tags is the norm.
- **`complexity`** — one of `easy`, `medium`, `hard`. (Posts sort by this.)
- **`description`** — the single most important SEO field; it's the search /
  social snippet. Make it a real, compelling teaser of the surprise — the same
  reframe as your hook. The template suggests ~160 chars; the recent posts run a
  bit longer (1–3 sentences) and that's fine.
- **`image`** — optional; social-card banner is auto-generated from metadata if
  omitted.

---

## Workflow

1. Create `content/blog/<kebab-case-slug>.md`. The slug becomes the URL
   (`/blog/<slug>/`), so make it readable and keyword-bearing.
2. Write the front matter with `draft = true` and today's date.
3. Draft the post against this guide.
4. Re-read the two reference posts side by side and close the gap.
5. Set `draft = false` when it's ready.
6. Cross-link any related existing posts both ways.

---

## Pre-publish checklist

- [ ] Title is a claim or question, not a label.
- [ ] Hook opens concrete, then reframes within the first 3 paragraphs.
- [ ] Every `##` heading reads as an argument on its own.
- [ ] Every factual claim has an inline source link on the meaningful words.
- [ ] Jargon is defined in plain words, inline, the first time it appears.
- [ ] Key numbers and pivots are **bolded**; sentence rhythm varies (some short).
- [ ] Related posts are cross-linked both directions.
- [ ] There's a "what this means for you" beat and, if it's a prediction, an
      honest caveat.
- [ ] Closing line zooms out / calls back to the opening.
- [ ] Post ends with an `{{</* faq */>}}` block.
- [ ] Front matter complete: `description`, `tags`, `complexity`, real `date`,
      `draft = false`.
