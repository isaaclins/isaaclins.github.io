#!/usr/bin/env bash
# Render both cuts and encode every deliverable into tools/film/out/.
#   ./build.sh            masters + web files + poster
#   ./build.sh encode     only re-encode from existing masters
#   ./build.sh masters    only render the masters
# Needs node + playwright (chromium) + ffmpeg on PATH. Heavy: run it on a
# strong machine, not a laptop on battery (1080 frames per cut).
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p out
if [ "${1:-}" != "encode" ]; then
  node render.mjs --w 1920 --h 1080 --out out/master-16x9.mp4
  node render.mjs --w 1080 --h 1350 --out out/master-4x5.mp4
fi
[ "${1:-}" = "masters" ] && exit 0
X264='-c:v libx264 -preset veryslow -tune animation -profile:v high -pix_fmt yuv420p -movflags +faststart -an'
VP9='-c:v libvpx-vp9 -b:v 0 -row-mt 1 -deadline good -cpu-used 1 -pix_fmt yuv420p -an'
# 16:9, the homepage and anywhere else
ffmpeg -v error -y -i out/master-16x9.mp4 $X264 -crf 27 out/intro-16x9.mp4
ffmpeg -v error -y -i out/master-16x9.mp4 $VP9 -crf 40 out/intro-16x9.webm
# 4:5, phones on the homepage (720 wide) and LinkedIn (full 1080x1350, silent for now)
ffmpeg -v error -y -i out/master-4x5.mp4 -vf scale=720:900:flags=lanczos $X264 -crf 27 out/intro-4x5-720.mp4
ffmpeg -v error -y -i out/master-4x5.mp4 -vf scale=720:900:flags=lanczos $VP9 -crf 40 out/intro-4x5-720.webm
ffmpeg -v error -y -i out/master-4x5.mp4 $X264 -crf 18 out/intro-4x5-linkedin.mp4
ffmpeg -v error -y -i out/master-16x9.mp4 $X264 -crf 18 out/intro-16x9-hq.mp4
# posters: the finished git log (6.8 s)
ffmpeg -v error -y -ss 6.8 -i out/master-16x9.mp4 -frames:v 1 -c:v libwebp -quality 82 out/intro-16x9-poster.webp
ffmpeg -v error -y -ss 6.8 -i out/master-4x5.mp4 -frames:v 1 -vf scale=720:900:flags=lanczos -c:v libwebp -quality 82 out/intro-4x5-poster.webp
ls -la out
