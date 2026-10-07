// The intro film for isaaclins.com, drawn on one canvas.
// Time is driven from outside: render(frame) draws exactly that frame, so the
// same frame always gives the same pixels (no clocks, no Math.random).
// ?w=1920&h=1080 is the 16:9 film, ?w=1080&h=1350 the 4:5 cut. Layout reads
// TALL to pick line breaks and sizes; the timeline is the same for both.

(async function () {
  const Q = new URLSearchParams(location.search);
  const W = +Q.get('w') || 1920, H = +Q.get('h') || 1080;
  const FPS = 60;
  const TALL = H > W;
  const S = TALL ? W / 1080 : H / 1080;

  const cv = document.getElementById('c');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');

  // ---------- timeline (seconds) ----------
  const T = {
    w1: .20,            // black: "I build applications."
    s2: 2.00,           // cut to paper: "and ship AI tools."
    ringIn: 2.40,       // the cast prints in around it and orbits
    textOut: 4.55,
    morph: 4.90,        // the ring folds into a git log
    header: 5.15,
    head: 6.55,         // HEAD -> main
    s3: 7.95,           // cut to black: "from a prompt"
    send: 9.95,
    s4: 10.35,          // cut to paper: "to production."
    push: 12.65,        // push into the live dot
    s5: 12.95,          // match cut to black on the dot
    end: 16.80,
  };
  const DUR = T.end;
  const FRAMES = Math.round(DUR * FPS);

  // ---------- palette (the site's own tokens, assets/css/main.scss) ----------
  const DARK = { bg: '#09090a', fg: '#ecebe7', fg2: '#a6a5a0', fg3: '#82817c', line: '#2c2c30', blue: '#6f95ff', card: '#1b1c20', rim: 'rgba(255,255,255,.14)' };
  const PAPER = { bg: '#f5f4ef', fg: '#121212', fg2: '#55544f', fg3: '#6f6e69', line: '#d2d0c8', blue: '#2c55f0', card: '#fbfaf6', rim: '#d9d7cf' };

  // ---------- easing ----------
  const clamp01 = x => x < 0 ? 0 : x > 1 ? 1 : x;
  const prog = (t, a, d) => clamp01((t - a) / d);
  const lerp = (a, b, p) => a + (b - a) * p;
  function bez(x1, y1, x2, y2) {
    const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
    const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    const sx = u => ((ax * u + bx) * u + cx) * u, sy = u => ((ay * u + by) * u + cy) * u;
    return x => {
      if (x <= 0) return 0; if (x >= 1) return 1;
      let lo = 0, hi = 1;
      for (let i = 0; i < 26; i++) { const m = (lo + hi) / 2; if (sx(m) < x) lo = m; else hi = m; }
      return sy((lo + hi) / 2);
    };
  }
  const E = {
    out: bez(.16, 1, .3, 1),     // arrivals
    in: bez(.7, 0, .84, 0),      // exits
    snap: bez(.7, 0, .2, 1),     // morphs: slow out, fast across, soft landing
    site: bez(.2, .8, .2, 1),    // --ease on the site
    quart: x => x * x * x * x,
    inExpo: x => x <= 0 ? 0 : Math.pow(2, 10 * x - 10),
  };
  const back = (x, s = 1.70158) => x >= 1 ? 1 : 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2);

  function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  // ---------- font ----------
  const face = new FontFace('JetBrains Mono', 'url(../../static/fonts/jetbrains-mono.woff2)', { weight: '100 800' });
  await face.load(); document.fonts.add(face);

  // set the font; returns the advance of one character (mono, 0.6 em + tracking)
  function font(size, weight, ls = -.04) {
    ctx.font = `${weight} ${size}px "JetBrains Mono"`;
    ctx.letterSpacing = (size * ls) + 'px';
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
    return size * .6 + size * ls;
  }

  // ---------- grain ----------
  // Fine, static, neutral grain: overlay of mid-grey noise (128 = no change),
  // so the paper keeps the site's #f5f4ef and the black stays black.
  function texture(seed, amp) {
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const g = c.getContext('2d'), img = g.createImageData(W, H), d = img.data, r = rng(seed);
    for (let i = 0; i < d.length; i += 4) { const v = 128 + (r() - .5) * 2 * amp; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
    g.putImageData(img, 0, 0); return c;
  }
  const GRAIN = { paper: texture(7, 34), dark: texture(11, 60) };

  function background(th) {
    ctx.fillStyle = th.bg; ctx.fillRect(0, 0, W, H);
    const R = Math.hypot(W, H) / 2;
    const g = ctx.createRadialGradient(W / 2, H * .48, R * .3, W / 2, H / 2, R);
    if (th === PAPER) { g.addColorStop(0, 'rgba(60,50,30,0)'); g.addColorStop(1, 'rgba(60,50,30,.05)'); }
    else { g.addColorStop(0, 'rgba(111,149,255,.03)'); g.addColorStop(1, 'rgba(0,0,0,0)'); }
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }
  function grain(th) {
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = th === PAPER ? .22 : .5;
    ctx.drawImage(th === PAPER ? GRAIN.paper : GRAIN.dark, 0, 0);
    ctx.restore();
  }
  // a slow push-in per shot, so nothing ever sits dead still
  function camera(t, a, b, amt = .03, cx = W / 2, cy = H / 2) {
    const k = 1 + amt * E.site(prog(t, a, b - a));
    ctx.translate(cx, cy); ctx.scale(k, k); ctx.translate(-cx, -cy);
  }

  // ---------- type ----------
  function line(segs) {
    const chars = [];
    segs.forEach(([txt, col]) => { for (const c of txt) chars.push({ c, col }); });
    const ws = []; let s = null;
    chars.forEach((ch, i) => { if (ch.c === ' ') { if (s !== null) { ws.push({ s, e: i }); s = null; } } else if (s === null) s = i; });
    if (s !== null) ws.push({ s, e: chars.length });
    return { chars, ws, n: chars.length };
  }
  function runs(L, from, to, x, y, cw) {
    let i = from;
    while (i < to) {
      const col = L.chars[i].col; let j = i, str = '';
      while (j < to && L.chars[j].col === col) { str += L.chars[j].c; j++; }
      ctx.fillStyle = col; ctx.fillText(str, x + i * cw, y); i = j;
    }
  }
  const textW = (n, size, cw, ls) => n * cw - size * ls;   // no trailing tracking
  // baseline y of line i in a block of n lines centred on cy
  const lineY = (i, n, size, cy, lh = 1.12) => cy - (n - 1) * size * lh / 2 + i * size * lh + size * .36;

  // Move 1, word mask reveal: each word rises out of its own slot.
  function reveal(lines, size, weight, t, tin, cy, o = {}) {
    const ls = -.04, cw = font(size, weight, ls);
    const wmax = Math.max(...lines.map(l => textW(l.n, size, cw, ls)));
    const x = W / 2 - wmax / 2;
    const st = o.stagger ?? .085, du = o.dur ?? .62;
    let k = 0;
    lines.forEach((L, li) => {
      const y = lineY(li, lines.length, size, cy);
      L.ws.forEach(w => {
        const p = E.out(prog(t, tin + k++ * st, du)); if (p <= 0) return;
        const dy = (1 - p) * size * 1.15;
        ctx.save(); ctx.beginPath();
        ctx.rect(x + w.s * cw - size * .12, y - size * 1.02, (w.e - w.s) * cw + size * .24, size * 1.32); ctx.clip();
        runs(L, w.s, w.e, x, y + dy, cw); ctx.restore();
      });
    });
  }
  // Move 2, tracking settle: wide letter-spacing and a touch large, settling in.
  function settle(lines, size, weight, t, tin, tout, cy) {
    const p = E.out(prog(t, tin, .7)); if (p <= 0) return;
    const q = tout == null ? 0 : E.in(prog(t, tout, .32)); if (q >= 1) return;
    const ls = lerp(.28, -.04, p) - q * .06, k = lerp(1.07, 1, p) * (1 - .04 * q);
    ctx.save(); ctx.globalAlpha = Math.min(1, p * 1.6) * (1 - q);
    ctx.translate(W / 2, cy); ctx.scale(k, k); ctx.translate(-W / 2, -cy);
    const cw = font(size, weight, ls);
    lines.forEach((L, i) => runs(L, 0, L.n, W / 2 - textW(L.n, size, cw, ls) / 2, lineY(i, lines.length, size, cy), cw));
    ctx.restore();
  }
  function caretBox(x, y, size, col) { ctx.fillStyle = col; ctx.fillRect(x + size * .1, y - size * .76, size * .44, size * .9); }
  const blinkOn = (t, from) => t < from || ((t - from) % 1.06) < .53;

  // ---------- pixel icons ----------
  // Printed in row by row (2 rows a frame, the row being printed in the accent),
  // popped in with a little overshoot, soft shadow on paper. On black the
  // outline is lifted to a dark grey rim so dark icons keep their edge.
  const ICON_Q = 12, oc = document.createElement('canvas'); oc.width = oc.height = 16 * ICON_Q;
  const ox = oc.getContext('2d');
  function drawIcon(id, t, cx, cy, size, o = {}) {
    const { rows, pal } = ICONS.icon(id, t);
    const th = o.th || PAPER, build = o.build ?? 1;
    const nrows = build >= 1 ? 16 : Math.floor(build * 16);
    if (nrows <= 0 || size <= .5) return;
    ox.clearRect(0, 0, oc.width, oc.height);
    for (let y = 0; y < nrows; y++) for (let x = 0; x < 16; x++) {
      const ch = rows[y][x]; if (ch === '.') continue;
      ox.fillStyle = build < 1 && y >= nrows - 2 ? th.blue : th === DARK && ch === 'k' ? '#3d3e47' : pal[ch];
      ox.fillRect(x * ICON_Q, y * ICON_Q, ICON_Q, ICON_Q);
    }
    ctx.save(); ctx.translate(cx, cy); if (o.rot) ctx.rotate(o.rot);
    ctx.globalAlpha *= (o.alpha ?? 1);
    if (th === PAPER && o.shadow !== false) {
      const k = size / (180 * S);
      ctx.shadowColor = 'rgba(40,32,20,.2)'; ctx.shadowBlur = 28 * S * k; ctx.shadowOffsetY = 16 * S * k;
    }
    ctx.imageSmoothingEnabled = !!o.rot; ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(oc, -size / 2, -size / 2, size, size);
    ctx.restore();
  }
  const pop = (t, tin) => .6 + .4 * back(prog(t, tin, .35), 2.6);   // .6 -> ~1.08 -> 1

  const CAST = ICONS.CAST;

  // the cast on a tilted, turning ellipse; depth = sin(angle), front = bottom
  function ring(i, t, o) {
    const th = -Math.PI / 2 + i * 2 * Math.PI / CAST.length + (t - o.t0) * o.speed;
    const ex = o.rx * Math.cos(th), ey = o.ry * Math.sin(th), c = Math.cos(o.tilt), s = Math.sin(o.tilt);
    const depth = Math.sin(th);
    return { x: o.cx + ex * c - ey * s, y: o.cy + ex * s + ey * c, depth, s: 1 + .22 * depth, rot: .12 * Math.sin(th * 2 + i * 1.7) };
  }

  // ---------- layout ----------
  const L1 = TALL ? [line([['I build', DARK.fg]]), line([['applications.', DARK.fg]])] : [line([['I build applications.', DARK.fg]])];
  const L2 = TALL ? [line([['and ship', PAPER.fg]]), line([['AI tools.', PAPER.blue]])] : [line([['and ship ', PAPER.fg], ['AI tools.', PAPER.blue]])];
  const SZ1 = (TALL ? 132 : 106) * S, SZ2 = (TALL ? 120 : 110) * S;
  const RING = TALL
    ? { rx: 410 * S, ry: 530 * S, tilt: .14, size: 150 * S, speed: .52 }
    : { rx: 800 * S, ry: 330 * S, tilt: -.21, size: 180 * S, speed: .52 };

  // git log
  const LOG = TALL
    ? { rowH: 140 * S, icon: 84 * S, name: 50 * S, hash: 38 * S, head: 30 * S, hdr: 38 * S }
    : { rowH: 112 * S, icon: 86 * S, name: 60 * S, hash: 32 * S, head: 30 * S, hdr: 34 * S };
  {
    const cwN = LOG.name * .57, cwH = LOG.hash * .6;
    LOG.hashW = 7 * cwH; LOG.gap = 40 * S; LOG.iconX = 34 * S + LOG.icon / 2; LOG.nameX = 34 * S + LOG.icon + 34 * S;
    const total = LOG.hashW + LOG.gap + LOG.nameX + 20 * cwN;
    LOG.railX = W / 2 - total / 2 + LOG.hashW + LOG.gap;
    LOG.y0 = H / 2 - (CAST.length - 1) * LOG.rowH / 2 + (TALL ? 46 : 38) * S;
    LOG.hdrY = LOG.y0 - (TALL ? 124 : 100) * S;
  }
  const rowPos = i => ({ x: LOG.railX + LOG.iconX, y: LOG.y0 + i * LOG.rowH });
  const landAt = i => T.morph + i * .075 + .78;

  // the prompt (black) and the live chip (paper)
  const SZ3 = (TALL ? 118 : 120) * S;
  const TXT_CY = H * (TALL ? .30 : .34);
  const PROMPT = TALL ? ['my friends want', 'to play Minecraft'] : ['my friends want to play Minecraft'];
  const PROMPT_N = PROMPT.join(' ').length;
  const PILL = TALL ? { w: 900 * S, h: 220 * S, r: 56 * S, txt: 50 * S } : { w: 1300 * S, h: 140 * S, r: 70 * S, txt: 50 * S };
  PILL.cx = W / 2; PILL.cy = H * (TALL ? .57 : .62);
  const BTN = 56 * S;     // send button radius
  // seeded human typing: ~30 ms a key, a little longer after a space
  const keyT = (() => { const r = rng(42), a = [], s = PROMPT.join(' '); let t = T.s3 + .85; for (let i = 0; i < s.length; i++) { a.push(t); t += .019 + r() * .017 + (s[i] === ' ' ? .028 : 0); } return a; })();
  const keysAt = t => { let n = 0; while (n < keyT.length && keyT[n] <= t) n++; return n; };

  const CHIP = (() => {
    const url = 'minecraft.isaaclins.com', pad = 32 * S, ic = 66 * S;
    const txt = (TALL ? 50 : 46) * S, small = (TALL ? 38 : 34) * S;
    const cw = txt * .58, urlW = url.length * cw - txt * -.02;
    const c = { url, pad, ic, txt, small, cw };
    if (TALL) { c.w = pad + ic + 22 * S + urlW + pad; c.h = 200 * S; c.r = 48 * S; }
    else { c.w = pad + ic + 22 * S + urlW + 26 * S + 2 * S + 22 * S + 14 * S + 12 * S + 4 * small * .6 + pad; c.h = 120 * S; c.r = 60 * S; }
    c.x = W / 2 - c.w / 2; c.y = PILL.cy - c.h / 2;
    const row1 = TALL ? c.y + pad + ic / 2 : PILL.cy;
    c.icX = c.x + pad + ic / 2; c.icY = row1; c.urlX = c.x + pad + ic + 22 * S; c.urlY = row1 + txt * .36;
    if (TALL) { c.dotX = c.urlX + 7 * S; c.dotY = c.y + c.h - pad - 22 * S; c.liveX = c.dotX + 7 * S + 14 * S; c.liveY = c.dotY + small * .36; }
    else { c.divX = c.urlX + urlW + 26 * S; c.dotX = c.divX + 2 * S + 22 * S + 7 * S; c.dotY = PILL.cy; c.liveX = c.dotX + 7 * S + 12 * S; c.liveY = PILL.cy + small * .36; }
    return c;
  })();

  function rr(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, Math.min(r, h / 2, w / 2)); }

  // ---------- shots ----------
  function shot1(t) {             // black: "I build applications."
    background(DARK);
    ctx.save(); camera(t, 0, T.s2, .03);
    reveal(L1, SZ1, 700, t, T.w1, H / 2, { stagger: .11 });
    ctx.restore();
    grain(DARK);
  }

  function shot2(t) {             // paper: "and ship AI tools." -> ring -> git log
    background(PAPER);
    ctx.save(); camera(t, T.s2, T.s3, .028);
    const ro = { ...RING, cx: W / 2, cy: H / 2, t0: T.s2 };
    const icons = CAST.map((c, i) => {
      const tin = T.ringIn + i * .09;
      if (t < tin) return null;
      const r = ring(i, t, ro);
      const mt = T.morph + i * .075, pm = E.snap(prog(t, mt, .78));
      const to = rowPos(i);
      const arc = Math.sin(Math.PI * pm) * (i % 2 ? -1 : 1) * 70 * S;
      return {
        c, i, pm, depth: r.depth,
        x: lerp(r.x, to.x, pm) + arc, y: lerp(r.y, to.y, pm),
        size: lerp(RING.size * r.s * pop(t, tin), LOG.icon, pm), rot: lerp(r.rot, 0, pm), build: prog(t, tin, .14),
      };
    }).filter(Boolean);
    const draw = ic => drawIcon(ic.c.id, t, ic.x, ic.y, ic.size, { build: ic.build, rot: ic.rot, th: PAPER });
    // depth: icons behind the line, the line, icons in front of it
    icons.filter(ic => ic.pm === 0 && ic.depth < 0).sort((a, b) => a.depth - b.depth).forEach(draw);
    settle(L2, SZ2, 700, t, T.s2 + .05, T.textOut, H / 2);

    // header, typed
    const hx = LOG.railX - LOG.hashW - LOG.gap;
    const hdr = line([['$ ', PAPER.blue], ['git log --graph', PAPER.fg2]]);
    const nh = (t - T.header) / .02;
    if (nh > 0) { const cw = font(LOG.hdr, 500, 0); runs(hdr, 0, Math.min(hdr.n, Math.floor(nh)), hx, LOG.hdrY, cw); }

    // the graph: a blue line that grows down as the commits land
    const railTop = LOG.y0 - 34 * S, lastY = LOG.y0 + (CAST.length - 1) * LOG.rowH;
    const rp = E.site(prog(t, landAt(0) - .2, landAt(CAST.length - 1) - landAt(0) + .35));
    if (rp > 0) { ctx.fillStyle = PAPER.blue; ctx.fillRect(LOG.railX - 1.5 * S, railTop, 3 * S, (lastY + 34 * S - railTop) * rp); }

    CAST.forEach((c, i) => {
      const la = landAt(i), y = LOG.y0 + i * LOG.rowH;
      if (t < la - .04) return;
      const pn = back(prog(t, la - .04, .3), 2.2);
      ctx.save(); ctx.translate(LOG.railX, y); ctx.scale(pn, pn);
      ctx.beginPath(); ctx.arc(0, 0, 10 * S, 0, Math.PI * 2);
      if (i === 0 && t >= T.head) { ctx.fillStyle = PAPER.blue; ctx.fill(); }
      else { ctx.fillStyle = PAPER.bg; ctx.fill(); ctx.lineWidth = 3 * S; ctx.strokeStyle = PAPER.blue; ctx.stroke(); }
      ctx.restore();
      if (i === 0 && t >= T.head) {                  // HEAD lands: one pulse on the node
        const q = prog(t, T.head, .7);
        if (q < 1) { ctx.beginPath(); ctx.arc(LOG.railX, y, 10 * S + E.out(q) * 26 * S, 0, Math.PI * 2); ctx.lineWidth = 2 * S; ctx.strokeStyle = PAPER.blue; ctx.globalAlpha = .45 * (1 - q); ctx.stroke(); ctx.globalAlpha = 1; }
      }
      const pt = E.out(prog(t, la, .3));
      ctx.fillStyle = PAPER.blue; ctx.fillRect(LOG.railX + 12 * S, y - 1.5 * S, (LOG.iconX - LOG.icon / 2 - 18 * S) * pt, 3 * S);
      font(LOG.hash, 500, 0); ctx.textAlign = 'right';
      const nhh = Math.floor((t - la) * 60 / 1.2);
      if (nhh > 0) { ctx.fillStyle = PAPER.fg2; ctx.fillText(c.hash.slice(0, nhh), LOG.railX - LOG.gap, y + LOG.hash * .36); }
      ctx.textAlign = 'left';
      const cwn = font(LOG.name, 650, -.03);
      const nn = (t - la - .05) * 60;
      if (nn > 0) { ctx.fillStyle = PAPER.fg; ctx.fillText(c.name.slice(0, Math.floor(nn)), LOG.railX + LOG.nameX, y + LOG.name * .36); }
      if (i === 0 && t >= T.head) {                  // HEAD -> main slides in from the right
        const ph = prog(t, T.head, .28), e = back(ph, 2);
        const tx = LOG.railX + LOG.nameX + textW(c.name.length, LOG.name, cwn, -.03) + 28 * S + (1 - e) * 40 * S;
        const cwt = font(LOG.head, 600, 0), label = 'HEAD -> main';
        const tw = label.length * cwt + 30 * S, thh = LOG.head * 1.7;
        ctx.save(); ctx.globalAlpha = Math.min(1, ph * 2.5);
        rr(tx, y - thh / 2, tw, thh, 7 * S); ctx.lineWidth = 2.5 * S; ctx.strokeStyle = PAPER.blue; ctx.stroke();
        ctx.fillStyle = PAPER.blue; ctx.fillText(label, tx + 15 * S, y + LOG.head * .36);
        ctx.restore();
      }
    });
    icons.filter(ic => !(ic.pm === 0 && ic.depth < 0)).sort((a, b) => (a.pm > 0) - (b.pm > 0) || a.depth - b.depth).forEach(draw);
    ctx.restore();
    grain(PAPER);
  }

  // the prompt text, typed over one or two lines; returns the caret position
  function promptText(n, x, y0, cw, lh, col) {
    // the space between two lines is the line break
    let left = n, at = null;
    PROMPT.forEach((s, i) => {
      const k = Math.max(0, Math.min(s.length, left)), y = y0 + i * lh;
      if (k > 0) { ctx.fillStyle = col; ctx.fillText(s.slice(0, k), x, y); }
      if (!at && left <= s.length) at = { cx: x + k * cw, cy: y };
      left -= s.length + 1;
    });
    return at || { cx: x + PROMPT[PROMPT.length - 1].length * cw, cy: y0 + (PROMPT.length - 1) * lh };
  }

  function shot3(t) {             // black: "from a prompt" + the prompt pill
    background(DARK);
    ctx.save(); camera(t, T.s3, T.s4, .022);
    reveal([line([['from a prompt', DARK.fg]])], SZ3, 700, t, T.s3 + .03, TXT_CY);
    // a dot, then a pill (spring), then contents; after send it collapses to a circle
    const appear = back(prog(t, T.s3 + .18, .3), 2);
    const grow = E.out(prog(t, T.s3 + .3, .6));
    const col = E.snap(prog(t, T.send + .05, .35));
    let w = lerp(PILL.h, PILL.w, grow), h = PILL.h;
    if (grow <= 0) { w *= appear; h *= appear; }
    w = lerp(w, 112 * S, col); h = lerp(h, 112 * S, col);
    const r = lerp(Math.min(PILL.r, h / 2), h / 2, col);
    if (appear > 0) {
      rr(PILL.cx - w / 2, PILL.cy - h / 2, w, h, r); ctx.fillStyle = DARK.card; ctx.fill();
      ctx.lineWidth = 1.5 * S; ctx.strokeStyle = DARK.rim; ctx.stroke();
    }
    const alpha = prog(t, T.s3 + .7, .2) * (1 - prog(t, T.send + .03, .12));
    if (alpha > 0) {
      ctx.save(); ctx.globalAlpha = alpha;
      const x0 = PILL.cx - PILL.w / 2, lh = PILL.txt * 1.3;
      const y0 = PILL.cy - (PROMPT.length - 1) * lh / 2 + PILL.txt * .36;
      const cwp = font(PILL.txt, 700, 0);
      ctx.fillStyle = DARK.blue; ctx.fillText('>', x0 + 46 * S, y0);
      const cwt = font(PILL.txt, 450, -.02);
      const tx = x0 + 46 * S + cwp + 24 * S;
      const n = keysAt(t), c = promptText(n, tx, y0, cwt, lh, DARK.fg);
      if (blinkOn(t, keyT[keyT.length - 1] + .1) && t < T.send) caretBox(c.cx, c.cy, PILL.txt, DARK.blue);
      // send button: dim until there is text, lights up, gets pressed
      const bx = x0 + PILL.w - 14 * S - BTN, by = PILL.cy + (TALL ? PILL.h / 2 - 14 * S - BTN : 0);
      const lit = prog(t, keyT[0], .15);
      const bp = t >= T.send ? 1 - .12 * Math.sin(Math.PI * prog(t, T.send, .18)) : 1;
      ctx.save(); ctx.translate(bx, by); ctx.scale(bp, bp);
      ctx.beginPath(); ctx.arc(0, 0, BTN - 8 * S, 0, Math.PI * 2);
      ctx.fillStyle = lit > 0 ? `rgba(111,149,255,${.2 + .8 * lit})` : 'rgba(236,235,231,.08)'; ctx.fill();
      ctx.strokeStyle = lit > .5 ? DARK.bg : DARK.fg3; ctx.lineWidth = 4.5 * S; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(0, 14 * S); ctx.lineTo(0, -14 * S); ctx.moveTo(-12 * S, -2 * S); ctx.lineTo(0, -14 * S); ctx.lineTo(12 * S, -2 * S); ctx.stroke();
      ctx.restore();
      ctx.restore();
    }
    const fl = prog(t, T.send, .4);            // send: a ring flashes out of the pill
    if (fl > 0 && fl < 1) {
      rr(PILL.cx - w / 2 - E.out(fl) * 20 * S, PILL.cy - h / 2 - E.out(fl) * 20 * S, w + E.out(fl) * 40 * S, h + E.out(fl) * 40 * S, r + E.out(fl) * 20 * S);
      ctx.lineWidth = 2 * S; ctx.strokeStyle = DARK.blue; ctx.globalAlpha = .5 * (1 - fl); ctx.stroke(); ctx.globalAlpha = 1;
    }
    ctx.restore();
    grain(DARK);
  }

  function liveDot(t, t0, x, y, th) {
    if (t < t0) return;
    const p = back(prog(t, t0, .3), 2.4);
    for (let pt = t0 + .15; pt < t; pt += 1.2) {             // pulse every 1.2 s
      const q = prog(t, pt, 1.2); if (q >= 1) continue;
      ctx.beginPath(); ctx.arc(x, y, 7 * S + E.out(q) * 15 * S, 0, Math.PI * 2);
      ctx.lineWidth = 2 * S; ctx.strokeStyle = th.blue; ctx.globalAlpha = .35 * (1 - q); ctx.stroke(); ctx.globalAlpha = 1;
    }
    ctx.beginPath(); ctx.arc(x, y, 7 * S * p, 0, Math.PI * 2); ctx.fillStyle = th.blue; ctx.fill();
  }

  function shot4(t) {             // paper: "to production." circle -> spinner -> check -> live chip
    background(PAPER);
    ctx.save();
    camera(t, T.s4, T.push, .02);
    if (t > T.push) {           // push into the live dot for the match cut
      const k = 1 + 5 * E.inExpo(prog(t, T.push, T.s5 - T.push));
      ctx.translate(CHIP.dotX, CHIP.dotY); ctx.scale(k, k); ctx.translate(-CHIP.dotX, -CHIP.dotY);
    }
    settle([line([['to production.', PAPER.fg]])], SZ3, 700, t, T.s4 + .03, null, TXT_CY);
    const t1 = T.s4 + .45, t2 = t1 + .22, t3 = t2 + .06;  // spinner until t1, check until t3, then expand
    const ex = back(prog(t, t3, .42), 1.1);
    const w = lerp(112 * S, CHIP.w, ex), h = lerp(112 * S, CHIP.h, ex), r = lerp(56 * S, CHIP.r, ex);
    ctx.save(); ctx.shadowColor = 'rgba(40,32,20,.12)'; ctx.shadowBlur = 40 * S; ctx.shadowOffsetY = 14 * S;
    rr(W / 2 - w / 2, PILL.cy - h / 2, w, h, r); ctx.fillStyle = PAPER.card; ctx.fill(); ctx.restore();
    rr(W / 2 - w / 2, PILL.cy - h / 2, w, h, r); ctx.lineWidth = 1.5 * S; ctx.strokeStyle = PAPER.rim; ctx.stroke();
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = PAPER.blue; ctx.lineWidth = 6 * S;
    if (t < t1) {                // spinner
      const a = (t - T.s4) * 9, len = 1.1 + .6 * Math.sin((t - T.s4) * 7);
      ctx.beginPath(); ctx.arc(W / 2, PILL.cy, 24 * S, a, a + len * Math.PI); ctx.stroke();
    } else if (ex < .25) {       // check, drawn, then fading as the chip opens
      const p = E.out(prog(t, t1, .22));
      ctx.save(); ctx.globalAlpha = 1 - ex * 4; ctx.translate(W / 2, PILL.cy);
      const pts = [[-15, 1], [-4, 12], [17, -11]].map(([a, b]) => [a * S, b * S]);
      const l1 = Math.hypot(11, 11), l2 = Math.hypot(21, 23), d = p * (l1 + l2);
      ctx.beginPath(); ctx.moveTo(...pts[0]);
      if (d <= l1) ctx.lineTo(lerp(pts[0][0], pts[1][0], d / l1), lerp(pts[0][1], pts[1][1], d / l1));
      else { ctx.lineTo(...pts[1]); const q = (d - l1) / l2; ctx.lineTo(lerp(pts[1][0], pts[2][0], q), lerp(pts[1][1], pts[2][1], q)); }
      ctx.stroke(); ctx.restore();
    }
    const ci = t3 + .22;          // chip contents: the block prints in, the address types, the dot goes live
    if (t >= ci) {
      drawIcon('minecraft', t, CHIP.icX, CHIP.icY, CHIP.ic, { build: prog(t, ci, .14), th: PAPER, shadow: false });
      font(CHIP.txt, 550, -.02);
      const n = Math.floor((t - ci - .08) * 60);
      if (n > 0) { ctx.fillStyle = PAPER.fg; ctx.fillText(CHIP.url.slice(0, n), CHIP.urlX, CHIP.urlY); }
      const live = ci + .08 + CHIP.url.length / 60 + .08;
      if (!TALL && t >= live) { ctx.fillStyle = PAPER.rim; ctx.fillRect(CHIP.divX, PILL.cy - 22 * S * E.out(prog(t, live, .3)), 2 * S, 44 * S * E.out(prog(t, live, .3))); }
      liveDot(t, live + .05, CHIP.dotX, CHIP.dotY, PAPER);
      if (t >= live + .1) {
        const pl = E.out(prog(t, live + .1, .4));
        ctx.save(); ctx.globalAlpha = pl; font(CHIP.small, 600, 0); ctx.fillStyle = PAPER.blue;
        ctx.fillText('live', CHIP.liveX + (1 - pl) * 12 * S, CHIP.liveY); ctx.restore();
      }
    }
    ctx.restore();
    grain(PAPER);
  }

  // the end line, mono, centred: "////////// isaaclins.com" + caret
  const ENDS = (TALL ? 62 : 88) * S;
  const ENDL = line([['//////////', DARK.blue], [' isaaclins.com', DARK.fg]]);
  function shot5(t) {             // black: the dot pulls the cast in and types the address
    background(DARK);
    ctx.save(); camera(t, T.s5, T.end, .03);
    const ls = -.02, cw = font(ENDS, 600, ls);
    const ex = W / 2 - textW(ENDL.n, ENDS, cw, ls) / 2 - ENDS * .27, ey = H / 2 + ENDS * .36;
    // the dot arrives big (the push-in), shrinks and glides to the centre
    const pg = E.snap(prog(t, T.s5, .45));
    const dx = lerp(CHIP.dotX, W / 2, pg), dy = lerp(CHIP.dotY, H / 2, pg);
    let rDot = lerp(42 * S, 11 * S, pg);
    // the ring comes back once, then falls into the dot
    const ringT = T.s5 + .25, suck = T.s5 + .62, ro = { rx: (TALL ? 340 : 540) * S, ry: (TALL ? 420 : 240) * S, tilt: TALL ? .14 : -.21, speed: .7, t0: T.s5 - 1.5 };
    let bump = 0;
    CAST.forEach((c, i) => {
      const tin = ringT + i * .045; if (t < tin) return;
      const ts = suck + i * .06, ps = E.quart(prog(t, ts, .45));
      if (ps >= 1) { bump = Math.max(bump, 1 - prog(t, ts + .45, .22)); return; }
      const r = ring(i, t, { ...ro, rx: ro.rx * (1 - ps), ry: ro.ry * (1 - ps), cx: dx, cy: dy });
      drawIcon(c.id, t, r.x, r.y, 120 * S * r.s * pop(t, tin) * (1 - ps * .8), { build: prog(t, tin, .14), rot: r.rot + ps * 1.6, th: DARK });
    });
    rDot *= 1 + .25 * bump;
    // dot -> caret, then the caret types the line
    const pc = E.snap(prog(t, T.s5 + 1.2, .25));
    const ty = T.s5 + 1.5;
    const k = (t - ty) * 30, shown = t < ty ? 0 : Math.max(0, Math.min(ENDL.n, Math.floor(k <= 10 ? k : Math.max(10, k - 4))));
    if (pc <= 0) { ctx.beginPath(); ctx.arc(dx, dy, rDot, 0, Math.PI * 2); ctx.fillStyle = DARK.blue; ctx.fill(); }
    else {
      font(ENDS, 600, ls); runs(ENDL, 0, shown, ex, ey, cw);
      const cxT = ex + shown * cw + ENDS * .1, cyT = ey - ENDS * .76;
      const x = lerp(W / 2 - rDot, cxT, pc), y = lerp(H / 2 - rDot, cyT, pc);
      const w = lerp(rDot * 2, ENDS * .44, pc), h = lerp(rDot * 2, ENDS * .9, pc);
      const done = ty + (ENDL.n + 4) / 30 + .35;
      if (blinkOn(t, done)) { rr(x, y, w, h, lerp(rDot, 0, pc)); ctx.fillStyle = DARK.blue; ctx.fill(); }
    }
    ctx.restore();
    grain(DARK);
  }

  function render(f) {
    const t = f / FPS;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    if (t < T.s2) shot1(t);
    else if (t < T.s3) shot2(t);
    else if (t < T.s4) shot3(t);
    else if (t < T.s5) shot4(t);
    else shot5(t);
  }

  window.FILM = { W, H, FPS, FRAMES, T, render };
  render(+Q.get('f') || 0);
  document.body.dataset.ready = '1';
})().catch(e => { document.body.dataset.error = String(e && e.stack || e); throw e; });
