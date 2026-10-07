# Intro film

The 18-second intro film on the home page, made entirely in code: one canvas,
a fixed timeline, rendered frame by frame. No stock footage, no AI video.

| File | What |
|---|---|
| `film.html` | Loads the two scripts. Open `film.html?w=1920&h=1080&f=500` (via any static server from the repo root) to see frame 500. |
| `film.js` | The film. `T` at the top is the timeline (seconds); one `shotN(t)` function per shot. |
| `icons.js` | The cast: one 16×16 pixel icon per project on the home page, drawn as grids or shape functions. |
| `render.mjs` | Playwright drives the page frame by frame (`FILM.render(n)`), pipes PNGs into ffmpeg. |
| `build.sh` | Renders both cuts and encodes everything into `out/` (git-ignored). |

## Script

| Time | Shot |
|---|---|
| 0.0 | black: "I build applications." |
| 2.2 | paper: "and ship AI tools.", the seven projects print in around it |
| 4.8 | the ring folds into a `git log --graph` with the real commit hashes; `HEAD -> main` lands on Stewie |
| 9.3 | black: "from a prompt", a prompt types a real request from Stewie's post |
| 11.6 | paper: "to production.", the prompt becomes `minecraft.isaaclins.com · live` |
| 14.3 | black: the live dot pulls the cast in and types `////////// isaaclins.com` |

Palette, font and the `//////////` mark come from the site (`assets/css/main.scss`,
`static/fonts/`). Time is driven, never read from a clock, so frame n is
always the same picture.

## Render

```sh
cd tools/film
npm i playwright && npx playwright install chromium-headless-shell   # once
./build.sh            # masters + every web file
./build.sh encode     # only re-encode from the masters
```

About 1,080 frames per cut. Run it on a strong machine. Outputs in `out/`:

| File | Use |
|---|---|
| `intro-16x9.mp4` / `.webm` | home page, wide screens → `static/video/` |
| `intro-4x5-720.mp4` / `.webm` | home page, phones → `static/video/intro-4x5.*` |
| `intro-16x9-poster.webp`, `intro-4x5-poster.webp` | posters → `images/home/intro-16x9.webp`, `intro-4x5.webp` |
| `intro-4x5-linkedin.mp4` | 1080×1350, silent, for LinkedIn |
| `intro-16x9-hq.mp4` | 1080p high quality, for sharing |

The film block on the home page is `layouts/shortcodes/film.html` (+ `.film` in
`assets/css/_home.scss`, the play/pause logic in `assets/js/home.js`).
