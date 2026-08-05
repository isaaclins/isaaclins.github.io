# isaaclins.com

Personal website and blog of Isaac Lins — application developer and
cybersecurity enthusiast. Built with [Hugo](https://gohugo.io/) (extended) and
deployed to GitHub Pages behind Cloudflare at <https://isaaclins.com>.

## Stack

- **Hugo extended** (the version is pinned in [`.hugo-version`](.hugo-version),
  currently v0.164.0; `config.toml` requires Hugo 0.158.0 or newer).
- **Dart Sass** for `assets/css/main.scss`.
- Content in `content/` as Markdown with **TOML frontmatter** (`+++`
  delimiters).

## Layout

| Path | What it is |
|------|------------|
| `content/` | Pages and posts. Blog posts live in `content/blog/`. `content/blog/_TEMPLATE.md` is the starting point for a new post. |
| `layouts/` | Hugo templates: `_default/`, `partials/`, and `shortcodes/`. |
| `assets/` | SCSS (`css/main.scss`), fonts, and social-card seed images. |
| `images/` | Post images (mounted to `/images/` at build time). |
| `static/` | Files copied verbatim to the site root (JS, manifest, icons). |
| `data/menu.toml` | Homepage menu entries. |
| `scripts/` | Python checks for frontmatter, image paths, draft status, and the installed Hugo version. |
| `.github/workflows/` | CI: build/validate, deploy, image optimization, and Lighthouse. |

## Local development

```bash
hugo server            # live-reload dev server at http://localhost:1313
hugo --gc --minify     # production build into ./public
```

## Writing a post

1. Copy `content/blog/_TEMPLATE.md` to `content/blog/<slug>.md`.
2. Fill in the TOML frontmatter (`title`, `date`, `tags`, `complexity`,
   `description`, optional `image`). `description` should be under 160
   characters for SEO.
3. Drop images in `images/` and reference them as `/images/<file>`.
4. Optionally install the local hooks: `pip install pre-commit && pre-commit install`.
   They run markdownlint, cspell, and the validators in `scripts/`.

## CI / deployment

- **build-test** — builds the site, validates the generated HTML with
  `html5validator`, and runs `cspell` on non-draft content for pushes to `main`
  and pull requests targeting `main`.
- **pages-deploy** — builds the production site and publishes it to the
  `gh-pages` branch on push to `main`.
- **PR previews** — builds each pull request targeting `main` and publishes it
  at `https://isaaclins.com/pr-preview/pr-<number>/`. The pull request preview
  workflow uses `rossjrw/pr-preview-action` and removes the preview when the
  pull request closes while its head branch is still available.
- **PR preview reaper** — `.github/workflows/pr-preview-reaper.yml` runs daily
  and can also be started with `workflow_dispatch`. It checks every
  `pr-preview/pr-<number>/` directory against the pull request API and removes
  previews for closed or missing pull requests. It checks out only `gh-pages`,
  never PR code, and makes one cleanup commit only when there is something to
  remove. The action documentation covers the normal `pull_request` close
  event, not `pull_request_target`, so the reaper is the safe fallback for a
  deleted head branch.
- GitHub Pages must be set to **Deploy from a branch**, using `gh-pages` and the
  repository root. The site must keep [`static/CNAME`](static/CNAME) with the
  exact contents `isaaclins.com`; Hugo copies it to `public/CNAME` so branch
  deployments keep the custom domain.
- Both Hugo workflows read the pinned version from [`.hugo-version`](.hugo-version)
  and enforce `config.toml`'s minimum with `scripts/check-hugo-version.py`;
  update the version file when upgrading Hugo.
- **optimize-images** — losslessly optimizes committed images and generates
  WebP versions.
- **Lighthouse CI** — runs Lighthouse against the live URLs after a deploy and
  writes the score table to `lighthousetest.md`.

## License / contact

Content © Isaac Lins. Reach me at <contact@isaaclins.com> or
[github.com/isaaclins](https://github.com/isaaclins).
