# isaaclins.com

Personal website and blog of Isaac Lins — application developer and
cybersecurity enthusiast. Built with [Hugo](https://gohugo.io/) (extended) and
deployed to GitHub Pages behind Cloudflare at <https://isaaclins.com>.

## Stack

- **Hugo extended** (CI builds with v0.140.2; `config.toml` requires the
  extended SCSS-capable build, min 0.41.0).
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
| `scripts/` | Python helpers run by pre-commit (frontmatter, image-path, and draft checks). |
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
  `html5validator`, and runs `cspell` on non-draft content.
- **pages-deploy** — builds and deploys to GitHub Pages on push to `main`.
- **optimize-images** — losslessly optimizes committed images and generates
  WebP versions.
- **Lighthouse CI** — runs Lighthouse against the live URLs after a deploy and
  writes the score table to `lighthousetest.md`.

## License / contact

Content © Isaac Lins. Reach me at <contact@isaaclins.com> or
[github.com/isaaclins](https://github.com/isaaclins).
