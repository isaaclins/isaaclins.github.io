#!/usr/bin/env bash
# Regenerates static/resume.pdf from the print view of /resume/ (the same
# CSS a visitor gets with "Print > Save as PDF"). Run it after every change to
# content/resume/_index.md and commit the PDF with it.
# Needs hugo and Chrome or Chromium; CHROME=/path/to/chrome overrides the lookup.
set -euo pipefail
cd "$(dirname "$0")/.."

CHROME="${CHROME:-$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)}"
[ -n "$CHROME" ] || CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT="${PORT:-1319}"
OUT="$(mktemp -d)"
trap 'kill "${SERVER:-}" 2>/dev/null || true; rm -rf "$OUT"' EXIT

# Absolute links in the PDF must point at the real site, not localhost.
hugo --quiet -d "$OUT" --baseURL https://isaaclins.com/
python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$OUT" >/dev/null 2>&1 &
SERVER=$!
for _ in $(seq 50); do curl -fs "http://127.0.0.1:$PORT/resume/" >/dev/null && break; sleep 0.2; done

"$CHROME" --headless --disable-gpu --no-sandbox --no-pdf-header-footer \
  --print-to-pdf=static/resume.pdf "http://127.0.0.1:$PORT/resume/" 2>/dev/null

if command -v pdfinfo >/dev/null; then
  pages="$(pdfinfo static/resume.pdf | awk '/^Pages:/ {print $2}')"
  echo "static/resume.pdf: $pages page(s)"
  [ "$pages" = 1 ] || echo "warning: the resume no longer fits on one A4 page" >&2
fi
