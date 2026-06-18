# CLAUDE.md

This is the source for **isaaclins.com**, a personal blog built with **Hugo**.
Posts live in `content/blog/<slug>.md` with `+++` (TOML) front matter; images in
`images/` (SVGs in `images/svg/`).

## Writing blog posts

When asked to write, draft, or edit a blog post, follow the house style guide —
loaded here so it's always in context:

@AGENTS.md

The two posts that define the voice are
`content/blog/why-spacex-paid-60-billion-for-a-vscode-fork.md` and
`content/blog/git-wasnt-built-for-agents.md`. Match them.

## Hosting note

Served via GitHub Pages behind a Cloudflare proxy. `static/_headers` is inert —
header/redirect changes must go through Cloudflare Rules, not files in the repo.
