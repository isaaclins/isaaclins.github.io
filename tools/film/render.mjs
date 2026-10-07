// Renders the film frame by frame with Playwright and pipes the frames into ffmpeg.
//   node render.mjs --w 1920 --h 1080 --out out/master-16x9.mp4 [--jobs 4]   whole film -> near-lossless master
//   node render.mjs --w 1920 --h 1080 --stills 0,300,600 --outdir out  single frames as PNG
// Needs: node, playwright (chromium), ffmpeg. The time is driven: frame n is
// always the same picture, however slow the machine is.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith('--') ? a.concat([[v.slice(2), all[i + 1]]]) : a), []));
const W = +(args.w || 1920), H = +(args.h || 1080);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

const types = { '.html': 'text/html', '.js': 'text/javascript', '.woff2': 'font/woff2' };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!p.startsWith(root) || !fs.existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': types[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
}).listen(0, '127.0.0.1');
await new Promise(r => server.once('listening', r));
const url = `http://127.0.0.1:${server.address().port}/tools/film/film.html?w=${W}&h=${H}`;

const JOBS = +(args.jobs || 4);
const browser = await chromium.launch();
async function openPage() {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  page.on('pageerror', e => { console.error(e); process.exit(1); });
  page.on('console', m => { if (m.type() === 'error') console.error('page:', m.text()); });
  page.on('requestfailed', r => console.error('request failed:', r.url(), r.failure()?.errorText));
  await page.goto(url);
  // plain polling: waitForFunction never resolves in headless shell under WSL
  for (let i = 0; !(await page.evaluate(() => document.body.dataset.ready || document.body.dataset.error)); i++) {
    if (i > 300) { console.error('film page never got ready'); process.exit(1); }
    await new Promise(r => setTimeout(r, 100));
  }
  const err = await page.evaluate(() => document.body.dataset.error);
  if (err) { console.error(err); process.exit(1); }
  return page;
}
const shoot = async (page, f) => { await page.evaluate(f => FILM.render(f), f); return page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: W, height: H } }); };

if (args.stills) {
  const page = await openPage();
  fs.mkdirSync(args.outdir || 'out', { recursive: true });
  for (const f of args.stills.split(',').map(Number)) fs.writeFileSync(path.join(args.outdir || 'out', `f${String(f).padStart(4, '0')}.png`), await shoot(page, f));
} else {
  const out = args.out || `out/master-${W}x${H}.mp4`;
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const pages = await Promise.all(Array.from({ length: JOBS }, openPage));
  const FRAMES = await pages[0].evaluate(() => FILM.FRAMES);
  // near-lossless 4:4:4 master; the web files are encoded from it (encode step in build.sh)
  const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', '60', '-c:v', 'png', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '4', '-pix_fmt', 'yuv444p', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  // JOBS pages render ahead in parallel; frames go to ffmpeg strictly in order
  const pending = new Map(); let next = 0, written = 0;
  const work = async (page, k) => { for (let f = k; f < FRAMES; f += JOBS) { while (f - written > JOBS * 4) await new Promise(r => setTimeout(r, 5)); pending.set(f, await shoot(page, f)); } };
  const writer = (async () => {
    while (next < FRAMES) {
      if (!pending.has(next)) { await new Promise(r => setTimeout(r, 2)); continue; }
      const buf = pending.get(next); pending.delete(next);
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      written = ++next;
      if (next % 120 === 0) console.log(`frame ${next}/${FRAMES}  ${((Date.now() - t0) / 1000).toFixed(0)} s`);
    }
  })();
  await Promise.all([...pages.map(work), writer]);
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  console.log(`done: ${out} in ${((Date.now() - t0) / 1000).toFixed(0)} s`);
}
await browser.close();
server.close();
