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
    w1: .15,            // black: "I build applications."
    s2: 1.70,           // cut to paper: "and ship AI tools."
    ringIn: 1.95,       // the cast prints in around it, in depth, turning
    textOut: 4.05,
    morph: 4.30,        // the ring folds into a git log (the hero move)
    header: 4.55,
    head: 6.00,         // HEAD -> main
    s3: 7.05,           // cut to black: "from a prompt"
    send: 9.05,
    s4: 9.85,           // cut to paper: "to production."
    push: 12.17,        // push into the live dot
    s5: 12.67,          // match cut to black on the dot
    end: 16.20,
  };
  const DUR = T.end;
  const FRAMES = Math.round(DUR * FPS);

  // ---------- palette (the site's own tokens, assets/css/main.scss) ----------
  const DARK = { bg: '#09090a', fg: '#ecebe7', fg2: '#a6a5a0', fg3: '#82817c', line: '#2c2c30', blue: '#6f95ff', card: '#1d1f26', rim: 'rgba(255,255,255,.14)' };
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
    out: bez(.16, 1, .3, 1),     // arrivals (expo-ish out)
    in: bez(.7, 0, .84, 0),      // exits
    snap: bez(.7, 0, .2, 1),     // morphs: slow out, fast across, soft landing
    site: bez(.2, .8, .2, 1),    // --ease on the site
    inOut: x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
    outCubic: x => 1 - Math.pow(1 - x, 3),
    quart: x => x * x * x * x,
    inExpo: x => x <= 0 ? 0 : Math.pow(2, 10 * x - 10),
    outExpo: x => x >= 1 ? 1 : 1 - Math.pow(2, -10 * x),
  };
  const back = (x, s = 1.70158) => x >= 1 ? 1 : 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2);
  // a spring pop: 0 -> ~1.08 -> 1 in about 0.35 s
  const pop = (t, tin) => t <= tin ? 0 : 1 - Math.exp(-7.5 * (t - tin)) * Math.cos(11 * (t - tin));
  // time at which an eased sweep reaches fraction f (inverse by bisection)
  const reach = (ease, f) => { let lo = 0, hi = 1; for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; if (ease(m) < f) lo = m; else hi = m; } return (lo + hi) / 2; };

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
  function camera(t, a, b, amt = .03) {
    const k = 1 + amt * E.site(prog(t, a, b - a));
    ctx.translate(W / 2, H / 2); ctx.scale(k, k); ctx.translate(-W / 2, -H / 2);
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
  // one word in its own slot, shifted by dy (the mask)
  function slot(L, w, x, y, size, cw, dy) {
    ctx.save(); ctx.beginPath();
    ctx.rect(x + w.s * cw - size * .12, y - size * 1.02, (w.e - w.s) * cw + size * .24, size * 1.36); ctx.clip();
    runs(L, w.s, w.e, x, y + dy, cw); ctx.restore();
  }

  // Move 1, word mask reveal: each word rises out of its own slot.
  // With tout, the words drop back out of their slots, one after another.
  function reveal(lines, size, weight, t, tin, cy, o = {}) {
    const ls = -.04, cw = font(size, weight, ls);
    const wmax = Math.max(...lines.map(l => textW(l.n, size, cw, ls)));
    const x = W / 2 - wmax / 2;
    const st = o.stagger ?? .085, du = o.dur ?? .62;
    let k = 0;
    lines.forEach((L, li) => {
      const y = lineY(li, lines.length, size, cy);
      L.ws.forEach(w => {
        const p = E.out(prog(t, tin + k * st, du));
        const q = o.tout == null ? 0 : E.in(prog(t, o.tout + k * .04, .36));
        k++;
        if (p <= 0 || q >= 1) return;
        slot(L, w, x, y, size, cw, (1 - p) * size * 1.15 + q * size * 1.15);
      });
    });
  }
  // Move 2, tracking settle: wide letter-spacing and a touch large, settling in.
  // Exits by dropping word by word through the mask, like reveal().
  function settle(lines, size, weight, t, tin, tout, cy) {
    const p = E.out(prog(t, tin, .7)); if (p <= 0) return;
    if (tout != null && t >= tout) {
      const ls = -.04, cw = font(size, weight, ls); let k = 0;
      lines.forEach((L, i) => {
        const x = W / 2 - textW(L.n, size, cw, ls) / 2, y = lineY(i, lines.length, size, cy);
        L.ws.forEach(w => { const q = E.in(prog(t, tout + k++ * .045, .34)); if (q < 1) slot(L, w, x, y, size, cw, q * size * 1.15); });
      });
      return;
    }
    const ls = lerp(.28, -.04, p), k = lerp(1.07, 1, p);
    ctx.save(); ctx.globalAlpha = .6 + .4 * Math.min(1, p * 1.6);
    ctx.translate(W / 2, cy); ctx.scale(k, k); ctx.translate(-W / 2, -cy);
    const cw = font(size, weight, ls);
    lines.forEach((L, i) => runs(L, 0, L.n, W / 2 - textW(L.n, size, cw, ls) / 2, lineY(i, lines.length, size, cy), cw));
    ctx.restore();
  }
  function caretBox(x, y, size, col) { ctx.fillStyle = col; ctx.fillRect(x + size * .1, y - size * .76, size * .44, size * .9); }
  const blinkOn = (t, from) => t < from || ((t - from) % 1.06) < .53;
  // fade + rise, for small lines (git log rows, header)
  function rise(t, t0, draw, d = 12 * S) {
    const p = E.outCubic(prog(t, t0, .35)); if (p <= 0) return;
    ctx.save(); ctx.globalAlpha *= p; ctx.translate(0, (1 - p) * d); draw(); ctx.restore();
  }

  // ---------- pixel icons ----------
  // Resolved row by row in under 0.18 s and popped in. On paper: a soft
  // shadow that grows with depth; behind the text: smaller, softer, blurred.
  // On black the outline is lifted to a dark grey rim so dark icons keep their edge.
  const ICON_Q = 12, oc = document.createElement('canvas'); oc.width = oc.height = 16 * ICON_Q;
  const ox = oc.getContext('2d');
  function drawIcon(id, t, cx, cy, size, o = {}) {
    const { rows, pal } = ICONS.icon(id, t);
    const th = o.th || PAPER, build = o.build ?? 1;
    const nrows = build >= 1 ? 16 : Math.ceil(build * 16);
    if (nrows <= 0 || size <= .5) return;
    ox.clearRect(0, 0, oc.width, oc.height);
    for (let y = 0; y < nrows; y++) for (let x = 0; x < 16; x++) {
      const ch = rows[y][x]; if (ch === '.') continue;
      ox.fillStyle = th === DARK && ch === 'k' ? '#3d3e47' : pal[ch];
      ox.fillRect(x * ICON_Q, y * ICON_Q, ICON_Q, ICON_Q);
    }
    ctx.save(); ctx.translate(cx, cy); if (o.rot) ctx.rotate(o.rot);
    ctx.globalAlpha *= (o.alpha ?? 1);
    const f = [];
    if (o.blur > .05) f.push(`blur(${o.blur.toFixed(2)}px)`);
    if (th === DARK) f.push(`drop-shadow(0 0 ${(1.5 * S).toFixed(2)}px rgba(236,235,231,.55))`);   // light rim on black
    if (f.length) ctx.filter = f.join(' ');
    if (th === PAPER && o.shadow !== false) {
      const k = size / (180 * S), z = o.z ?? 1;          // z: 0 = far back, 1 = front
      ctx.shadowColor = `rgba(40,32,20,${lerp(.08, .17, z).toFixed(3)})`;
      ctx.shadowBlur = lerp(10, 32, z) * S * k; ctx.shadowOffsetY = lerp(6, 22, z) * S * k;
    }
    ctx.imageSmoothingEnabled = !!o.rot; ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(oc, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  const CAST = ICONS.CAST;

  // the cast on a tilted, turning ellipse; depth = sin(angle), front = bottom
  function ring(i, t, o) {
    const th = -Math.PI / 2 + i * 2 * Math.PI / CAST.length + (o.spin ? o.spin(t - o.t0) : (t - o.t0) * o.speed);
    const ex = o.rx * Math.cos(th), ey = o.ry * Math.sin(th), c = Math.cos(o.tilt), s = Math.sin(o.tilt);
    const depth = Math.sin(th);
    const z = (depth + 1) / 2;
    return { x: o.cx + ex * c - ey * s, y: o.cy + ex * s + ey * c, depth, z, s: lerp(o.sMin ?? .55, o.sMax ?? 1.15, z), rot: .14 * Math.sin(th * 2 + i * 1.7) };
  }

  // ---------- layout ----------
  const L1 = TALL ? [line([['I build', DARK.fg]]), line([['applications.', DARK.fg]])] : [line([['I build applications.', DARK.fg]])];
  const L2 = TALL ? [line([['and ship', PAPER.fg]]), line([['AI tools.', PAPER.blue]])] : [line([['and ship ', PAPER.fg], ['AI tools.', PAPER.blue]])];
  const SZ1 = (TALL ? 132 : 106) * S, SZ2 = (TALL ? 116 : 100) * S;
  const RING = TALL
    ? { rx: 360 * S, ry: 330 * S, tilt: .14, size: 160 * S, dy: 40 * S }
    : { rx: 620 * S, ry: 190 * S, tilt: -.21, size: 180 * S, dy: 60 * S };
  // spins in at 220 deg/s and settles to 80 deg/s
  const SPIN = dt => dt <= 0 ? 0 : 1.4 * dt + (3.84 - 1.4) / 2 * (1 - Math.exp(-2 * dt));

  // git log (the 4:5 cut drops the hashes so the names can be big)
  const LOG = TALL
    ? { rowH: 140 * S, icon: 88 * S, name: 58 * S, hash: 0, head: 34 * S, hdr: 44 * S }
    : { rowH: 112 * S, icon: 86 * S, name: 60 * S, hash: 32 * S, head: 30 * S, hdr: 34 * S };
  {
    const cwN = LOG.name * .57;
    LOG.hashW = 7 * LOG.hash * .6; LOG.gap = LOG.hash ? 40 * S : 0;
    LOG.iconX = 34 * S + LOG.icon / 2; LOG.nameX = 34 * S + LOG.icon + 34 * S;
    const total = LOG.hashW + LOG.gap + LOG.nameX + (TALL ? 16 : 20) * cwN;   // 4:5: centre on the typical name, not the longest
    LOG.railX = W / 2 - total / 2 + LOG.hashW + LOG.gap;
    LOG.y0 = H / 2 - (CAST.length - 1) * LOG.rowH / 2 + (TALL ? 50 : 38) * S;
    LOG.hdrY = LOG.y0 - (TALL ? 128 : 100) * S;
    LOG.hdrX = TALL ? LOG.railX - 10 * S : LOG.railX - LOG.hashW - LOG.gap;
  }
  const rowPos = i => ({ x: LOG.railX + LOG.iconX, y: LOG.y0 + i * LOG.rowH });
  const FOLD = .9, FOLD_ST = .06;
  const landAt = i => T.morph + i * FOLD_ST + FOLD;

  // the prompt (black) and the live chip (paper)
  const SZ3 = (TALL ? 96 : 92) * S;
  const TXT_CY = H * (TALL ? .30 : .34);
  const PROMPT = TALL ? ['my friends want', 'to play Minecraft'] : ['my friends want to play Minecraft'];
  const PILL = TALL ? { w: 900 * S, h: 220 * S, r: 56 * S, txt: 50 * S } : { w: 1300 * S, h: 140 * S, r: 70 * S, txt: 50 * S };
  PILL.cx = W / 2; PILL.cy = H * (TALL ? .57 : .62);
  const BTN = 56 * S;     // send button radius
  const DOT0 = 18 * S;    // the blue dot the pill grows from
  // seeded human typing: ~30 ms a key, a little longer after a space
  const keyT = (() => { const r = rng(42), a = [], s = PROMPT.join(' '); let t = T.s3 + .85; for (let i = 0; i < s.length; i++) { a.push(t); t += .019 + r() * .017 + (s[i] === ' ' ? .028 : 0); } return a; })();
  const keysAt = t => { let n = 0; while (n < keyT.length && keyT[n] <= t) n++; return n; };
  const CIRC = (TALL ? 180 : 140) * S;   // the loader circle between prompt and chip

  const CHIP = (() => {
    const url = 'minecraft.isaaclins.com', pad = 34 * S, ic = 66 * S;
    const txt = 46 * S, small = (TALL ? 44 : 36) * S;
    const cw = txt * .6 - txt * .02, urlW = url.length * cw + txt * .02;
    const c = { url, pad, ic, txt, small, cw, h: (TALL ? 124 : 120) * S };
    c.w = pad + ic + 22 * S + urlW + 28 * S + 2 * S + 28 * S + 14 * S + 34 * S + 4 * small * .6 + pad;
    c.r = c.h / 2; c.x = W / 2 - c.w / 2; c.y = PILL.cy - c.h / 2;
    c.icX = c.x + pad + ic / 2; c.urlX = c.x + pad + ic + 22 * S; c.urlY = PILL.cy + txt * .36;
    c.divX = c.urlX + urlW + 28 * S; c.dotX = c.divX + 2 * S + 28 * S + 7 * S; c.dotY = PILL.cy;
    c.liveX = c.dotX + 34 * S; c.liveY = PILL.cy + small * .36;   // 12 px clear of the pulse ring
    return c;
  })();

  function rr(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, Math.min(r, h / 2, w / 2)); }

  // ---------- shots ----------
  function shot1(t) {             // black: "I build applications."
    background(DARK);
    ctx.save(); camera(t, 0, T.s2, .04);
    reveal(L1, SZ1, 700, t, T.w1, H / 2, { stagger: .11 });
    ctx.restore();
    grain(DARK);
  }

  function shot2(t) {             // paper: "and ship AI tools." -> ring -> git log
    background(PAPER);
    ctx.save(); camera(t, T.s2, T.s3, .028);
    const ro = { ...RING, cx: W / 2, cy: H / 2 + RING.dy, t0: T.ringIn, spin: SPIN, sMin: .4, sMax: 1 };
    const icons = CAST.map((c, i) => {
      const tin = T.ringIn + i * .07;
      if (t < tin) return null;
      const r = ring(i, t, ro);
      const pm = E.inOut(prog(t, T.morph + i * FOLD_ST, FOLD));
      const to = rowPos(i);
      // an arc that bows away from the text, so the paths do not pile up
      const ax = Math.sin(Math.PI * pm) * -60 * S, ay = 0;
      return {
        c, i, pm, depth: r.depth,
        x: lerp(r.x, to.x, pm) + ax, y: lerp(r.y, to.y, pm) + ay,
        size: lerp(RING.size * r.s * pop(t, tin), LOG.icon, pm), rot: lerp(r.rot, 0, pm),
        build: 1, z: lerp(r.z, 1, pm),
        alpha: lerp(lerp(.55, 1, r.z), 1, pm), blur: lerp(3 * S * (1 - r.z), 0, pm),
      };
    }).filter(Boolean);
    const draw = ic => {
      if (ic.pm === 0 && ic.z > .6) [[2, .15], [4, .08], [6, .04]].forEach(([k, a]) => {   // a short trail on the front pass
        const r = ring(ic.i, t - k / FPS, ro);
        drawIcon(ic.c.id, t, r.x, r.y, ic.size, { rot: r.rot, th: PAPER, alpha: a, shadow: false });
      });
      drawIcon(ic.c.id, t, ic.x, ic.y, ic.size, { build: ic.build, rot: ic.rot, th: PAPER, z: ic.z, alpha: ic.alpha, blur: ic.blur });
    };
    const behind = ic => ic.pm === 0 && ic.depth < 0;
    icons.filter(behind).sort((a, b) => a.depth - b.depth).forEach(draw);
    settle(L2, SZ2, 700, t, T.s2 - 1 / FPS, T.textOut, H / 2);

    // header
    const hdr = line([['$ ', PAPER.blue], ['git log --graph', PAPER.fg2]]);
    rise(t, T.header, () => { const cw = font(LOG.hdr, 500, 0); runs(hdr, 0, hdr.n, LOG.hdrX, LOG.hdrY, cw); });

    // the graph: a blue line that grows down with the commits
    const railTop = LOG.y0 - 34 * S, lastY = LOG.y0 + (CAST.length - 1) * LOG.rowH;
    const rp = E.site(prog(t, landAt(0) - .25, landAt(CAST.length - 1) - landAt(0) + .4));
    if (rp > 0) { ctx.fillStyle = PAPER.blue; ctx.fillRect(LOG.railX - 1.5 * S, railTop, 3 * S, (lastY + 34 * S - railTop) * rp); }

    CAST.forEach((c, i) => {
      const la = landAt(i), y = LOG.y0 + i * LOG.rowH;
      if (t < la - .1) return;
      const pn = back(prog(t, la - .1, .3), 2.2);
      ctx.save(); ctx.translate(LOG.railX, y); ctx.scale(pn, pn);
      ctx.beginPath(); ctx.arc(0, 0, 10 * S, 0, Math.PI * 2);
      if (i === 0 && t >= T.head) { ctx.fillStyle = PAPER.blue; ctx.fill(); }
      else { ctx.fillStyle = PAPER.bg; ctx.fill(); ctx.lineWidth = 3 * S; ctx.strokeStyle = PAPER.blue; ctx.stroke(); }
      ctx.restore();
      if (i === 0) [T.head, T.head + .45].forEach(p0 => {      // HEAD lands: two pulses on the node
        const q = prog(t, p0, .6); if (q <= 0 || q >= 1) return;
        ctx.beginPath(); ctx.arc(LOG.railX, y, lerp(14, 48, E.out(q)) * S, 0, Math.PI * 2);
        ctx.lineWidth = 2 * S; ctx.strokeStyle = PAPER.blue; ctx.globalAlpha = .5 * (1 - q); ctx.stroke(); ctx.globalAlpha = 1;
      });
      const pt = E.out(prog(t, la - .05, .3));
      ctx.fillStyle = PAPER.blue; ctx.fillRect(LOG.railX + 12 * S, y - 1.5 * S, (LOG.iconX - LOG.icon / 2 - 18 * S) * pt, 3 * S);
      rise(t, la - .02 + .03, () => {
        if (LOG.hash) { font(LOG.hash, 500, 0); ctx.textAlign = 'right'; ctx.fillStyle = PAPER.fg2; ctx.fillText(c.hash, LOG.railX - LOG.gap, y + LOG.hash * .36); ctx.textAlign = 'left'; }
        font(LOG.name, 650, -.03); ctx.fillStyle = PAPER.fg; ctx.fillText(c.name, LOG.railX + LOG.nameX, y + LOG.name * .36);
      });
      if (i === 0 && t >= T.head) {                  // HEAD -> main slides in from the right
        const ph = prog(t, T.head, .35), e = back(ph, 2);
        const cwn = font(LOG.name, 650, -.03);
        const tx = LOG.railX + LOG.nameX + textW(c.name.length, LOG.name, cwn, -.03) + 28 * S + (1 - e) * 60 * S;
        const cwt = font(LOG.head, 600, 0), label = 'HEAD -> main';
        const tw = label.length * cwt + 30 * S, thh = LOG.head * 1.7;
        ctx.save(); ctx.globalAlpha = Math.min(1, ph * 3);
        rr(tx, y - thh / 2, tw, thh, 7 * S); ctx.lineWidth = 2.5 * S; ctx.strokeStyle = PAPER.blue; ctx.stroke();
        ctx.fillStyle = PAPER.blue; ctx.fillText(label, tx + 15 * S, y + LOG.head * .36);
        ctx.restore();
      }
    });
    icons.filter(ic => !behind(ic)).sort((a, b) => (a.pm > 0) - (b.pm > 0) || a.z - b.z).forEach(draw);
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

  // the send button: the blue dot lands here, becomes the button, and the pill grows out of it
  const BTNX = PILL.cx + PILL.w / 2 - 14 * S - BTN, BTNY = PILL.cy + (TALL ? PILL.h / 2 - 14 * S - BTN : 0);
  const BR = BTN - 8 * S;
  const collapse = bez(.65, 0, .35, 1);
  const inOutQuart = x => x < .5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
  const lerpRect = (a, b, p) => a.map((v, i) => lerp(v, b[i], p));
  // colour tween between two #rrggbb
  const mix = (a, b, p) => '#' + [1, 3, 5].map(i => Math.round(lerp(parseInt(a.substr(i, 2), 16), parseInt(b.substr(i, 2), 16), clamp01(p))).toString(16).padStart(2, '0')).join('');

  function shot3(t) {             // black: "from a prompt" + the prompt pill
    background(DARK);
    ctx.save(); camera(t, T.s3, T.s4, .022);
    reveal([line([['from a prompt', DARK.fg2]])], SZ3, 500, t, T.s3 + .03, TXT_CY);
    const dot = back(prog(t, T.s3 + .14, .26), 2.2);                       // the dot pops in
    const toBtn = E.out(prog(t, T.s3 + .3, .3));                           // and swells into the button
    const gp = E.out(prog(t, T.s3 + .42, .62));                            // the pill grows out of it
    const cp = inOutQuart(prog(t, T.send + .15, .32));                     // send: the pill closes back into the button
    const land = T.send + .47;
    const gl = E.snap(prog(t, land + .08, .25));                           // then the button glides to the centre and grows
    const btnRect = [BTNX - BR, BTNY - BR, BR * 2, BR * 2], pillRect = [PILL.cx - PILL.w / 2, PILL.cy - PILL.h / 2, PILL.w, PILL.h];
    const [x, y, w, h] = lerpRect(lerpRect(btnRect, pillRect, gp), btnRect, cp);
    const r = lerp(lerp(BR, PILL.r, gp), BR, cp);
    if (gp > 0 && cp < 1) {
      rr(x, y, w, h, r); ctx.fillStyle = DARK.card; ctx.fill();
      ctx.lineWidth = 1.5 * S; ctx.strokeStyle = 'rgba(111,149,255,.34)'; ctx.stroke();
      const alpha = prog(t, T.s3 + .75, .2);
      if (alpha > 0) {
        ctx.save(); ctx.globalAlpha = alpha;
        rr(x, y, w, h, r); ctx.clip();                                     // contents only ever clipped, never faded out
        const x0 = PILL.cx - PILL.w / 2, lh = PILL.txt * 1.3;
        const y0 = PILL.cy - (PROMPT.length - 1) * lh / 2 + PILL.txt * .36;
        const cwp = font(PILL.txt, 700, 0);
        ctx.fillStyle = DARK.blue; ctx.fillText('>', x0 + 46 * S, y0);
        const cwt = font(PILL.txt, 450, -.02);
        const tx = x0 + 46 * S + cwp + 24 * S;
        const c = promptText(keysAt(t), tx, y0, cwt, lh, DARK.fg);
        if (blinkOn(t, keyT[keyT.length - 1] + .1) && t < T.send) caretBox(c.cx, c.cy, PILL.txt, DARK.blue);
        ctx.restore();
      }
    }
    // send: one ring around the button, done before the pill closes
    const fl = prog(t, T.send, .2);
    if (fl > 0 && fl < 1) {
      ctx.beginPath(); ctx.arc(BTNX, BTNY, lerp(48, 100, E.outCubic(fl)) * S, 0, Math.PI * 2);
      ctx.lineWidth = 2.5 * S; ctx.strokeStyle = DARK.blue; ctx.globalAlpha = .5 * (1 - fl); ctx.stroke(); ctx.globalAlpha = 1;
    }
    // the button: the dot, always solid blue and on top. Pressed, squashed as the pill lands in it, then it becomes the loader circle.
    if (dot > 0) {
      const bp = t < T.send ? 1 : t < T.send + .08 ? lerp(1, .88, prog(t, T.send, .08)) : lerp(.88, 1, back(prog(t, T.send + .08, .16), 2));
      const sq = Math.sin(Math.PI * prog(t, land, .08));
      const bx = lerp(BTNX, W / 2, gl), by = lerp(BTNY, PILL.cy, gl), br = lerp(lerp(DOT0, BR, toBtn) * dot, CIRC / 2, gl);
      ctx.save(); ctx.translate(bx, by); ctx.scale(bp * (1 + .12 * sq), bp * (1 - .1 * sq));
      ctx.beginPath(); ctx.arc(0, 0, br, 0, Math.PI * 2); ctx.fillStyle = DARK.blue; ctx.fill();
      const ia = prog(t, T.s3 + .45, .2) * (1 - prog(t, land + .05, .1));
      if (ia > 0) {
        ctx.globalAlpha = ia; ctx.strokeStyle = DARK.bg; ctx.lineWidth = 4.5 * S; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        ctx.beginPath(); ctx.moveTo(0, 14 * S); ctx.lineTo(0, -14 * S); ctx.moveTo(-12 * S, -2 * S); ctx.lineTo(0, -14 * S); ctx.lineTo(12 * S, -2 * S); ctx.stroke();
      }
      ctx.restore();
    }
    ctx.restore();
    grain(DARK);
  }

  function liveDot(t, t0, x, y, th, ringA = 1) {
    if (t < t0) return;
    const pp = prog(t, t0, .2), p = pp < .6 ? lerp(0, 1.2, E.outCubic(pp / .6)) : lerp(1.2, 1, E.outCubic((pp - .6) / .4));   // 0 -> 1.2 -> 1
    for (let pt = t0 + .05; pt < t; pt += 1.2) {             // pulse every 1.2 s, max radius 22 px
      const q = prog(t, pt, 1.2); if (q >= 1) continue;
      ctx.beginPath(); ctx.arc(x, y, 7 * S + E.out(q) * 15 * S, 0, Math.PI * 2);
      ctx.lineWidth = 2 * S; ctx.strokeStyle = th.blue; ctx.globalAlpha = .35 * (1 - q) * ringA; ctx.stroke(); ctx.globalAlpha = 1;
    }
    ctx.beginPath(); ctx.arc(x, y, 7 * S * p, 0, Math.PI * 2); ctx.fillStyle = th.blue; ctx.fill();
  }

  // Move 3, letter cascade: each letter rises out of its own slot, 22 ms apart.
  function cascade(L, size, weight, t, tin, cy) {
    const ls = -.04, cw = font(size, weight, ls);
    const x = W / 2 - textW(L.n, size, cw, ls) / 2, y = lineY(0, 1, size, cy);
    L.chars.forEach((ch, i) => {
      if (ch.c === ' ') return;
      const p = E.out(prog(t, tin + i * .022, .55)); if (p <= 0) return;
      ctx.save(); ctx.beginPath(); ctx.rect(x + i * cw - size * .1, y - size * 1.02, cw + size * .2, size * 1.36); ctx.clip();
      ctx.fillStyle = ch.col; ctx.fillText(ch.c, x + i * cw, y + (1 - p) * size * 1.15); ctx.restore();
    });
  }

  // The push: one camera move on the whole scene. The scale grows exponentially
  // (k = 64^e, accelerating into the cut) around the live dot, which slides to
  // the centre; on the last paper frame the dot is 7 px * 64 ~ 900 px wide.
  const PUSHK = 64, pushIn = bez(.7, 0, .84, 0);
  const SZ4 = (TALL ? 116 : 150) * S;
  function shot4(t) {             // paper: "to production." blue circle -> spinner -> check -> live chip
    background(PAPER);
    ctx.save();
    camera(t, T.s4, T.push, .02);
    let k = 1, e = 0;
    if (t > T.push) {
      e = pushIn(prog(t, T.push, T.s5 - T.push - 1 / FPS)); k = Math.pow(PUSHK, e);
      ctx.translate(lerp(CHIP.dotX, W / 2, e), lerp(CHIP.dotY, H / 2, e)); ctx.scale(k, k); ctx.translate(-CHIP.dotX, -CHIP.dotY);
    }
    const textA = 1 - prog(k, 5, 7);       // the type is long out of frame by then; never draw glyphs hundreds of px tall
    if (textA > 0) { ctx.save(); ctx.globalAlpha = textA; cascade(line([['to production.', PAPER.fg]]), SZ4, 800, t, T.s4 + .03, TXT_CY); ctx.restore(); }
    // spinner until t1, check drawn, colour change t2..t3 (blue -> white, check shrinks away), then the width opens
    const t1 = T.s4 + .45, t2 = t1 + .26, t3 = t2 + .12;
    const ex = 1 - Math.pow(1 - prog(t, t3, .38), 5);   // easeOutQuint
    const w = lerp(CIRC, CHIP.w, ex), h = lerp(CIRC, CHIP.h, ex), r = lerp(CIRC / 2, CHIP.r, ex);
    const bx = W / 2 - w / 2, by = PILL.cy - h / 2;
    const fillP = E.outCubic(prog(t, t2, .12));   // colour first, width second
    if (k < 8) { ctx.save(); ctx.shadowColor = `rgba(40,32,20,${(.12 * fillP).toFixed(3)})`; ctx.shadowBlur = 40 * S; ctx.shadowOffsetY = 14 * S; }
    else ctx.save();
    rr(bx, by, w, h, r); ctx.fillStyle = mix(PAPER.blue, PAPER.card, fillP); ctx.fill(); ctx.restore();
    if (fillP > 0) { ctx.save(); ctx.globalAlpha = fillP; rr(bx, by, w, h, r); ctx.lineWidth = 1.5 * S; ctx.strokeStyle = PAPER.rim; ctx.stroke(); ctx.restore(); }
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 8 * S;
    const sr = CIRC * .24;
    if (t < t1) {                // spinner, white on the blue circle
      const a = (t - T.s4) * 9, len = 1.1 + .6 * Math.sin((t - T.s4) * 7);
      ctx.beginPath(); ctx.arc(W / 2, PILL.cy, sr, a, a + len * Math.PI); ctx.stroke();
    } else if (t < t3) {         // check, drawn, then scaled away while the circle turns white
      const p = E.out(prog(t, t1, .22)), kk = sr / 24 * (1 - fillP);
      ctx.save(); ctx.translate(W / 2, PILL.cy); ctx.scale(Math.max(kk, .001), Math.max(kk, .001));
      const pts = [[-15, 1], [-4, 12], [17, -11]];
      const l1 = Math.hypot(11, 11), l2 = Math.hypot(21, 23), d = p * (l1 + l2);
      ctx.lineWidth = 8 * S / (sr / 24); ctx.beginPath(); ctx.moveTo(...pts[0]);
      if (d <= l1) ctx.lineTo(lerp(pts[0][0], pts[1][0], d / l1), lerp(pts[0][1], pts[1][1], d / l1));
      else { ctx.lineTo(...pts[1]); const q = (d - l1) / l2; ctx.lineTo(lerp(pts[1][0], pts[2][0], q), lerp(pts[1][1], pts[2][1], q)); }
      ctx.stroke(); ctx.restore();
    }
    if (t >= t3) {               // chip contents at full contrast, revealed only by the chip's own width
      ctx.save(); rr(bx, by, w, h, r); ctx.clip();
      if (textA > 0) {
        ctx.globalAlpha = textA;
        if (k < 6) drawIcon('minecraft', t, CHIP.icX, PILL.cy, CHIP.ic, { th: PAPER, shadow: false });
        font(CHIP.txt, 550, -.02); ctx.fillStyle = PAPER.fg; ctx.fillText(CHIP.url, CHIP.urlX, CHIP.urlY);
        font(CHIP.small, 600, 0); ctx.fillStyle = PAPER.blue; ctx.fillText('live', CHIP.liveX, CHIP.liveY);
        ctx.globalAlpha = 1;
      }
      ctx.fillStyle = PAPER.rim; ctx.fillRect(CHIP.divX, PILL.cy - 26 * S, 2 * S, 52 * S);
      ctx.restore();
      liveDot(t, t3 + .38, CHIP.dotX, CHIP.dotY, PAPER, 1 - prog(t, T.push + .35, .08));
    }
    ctx.restore();
    grain(PAPER);
  }

  // the end line, mono, centred: "////////// isaaclins.com" + caret
  const ENDS = (TALL ? 62 : 88) * S;
  const ENDL = line([['//////////', DARK.blue], [' isaaclins.com', DARK.fg]]);
  const SWEEP = .6;
  const passAt = Array.from({ length: ENDL.n }, (_, i) => reach(E.inOut, (i + .5) / ENDL.n) * SWEEP);
  function shot5(t) {             // black: the dot pulls the cast in, becomes the caret and draws the address
    background(DARK);
    ctx.save(); camera(t, T.s5, T.end, .03);
    const ls = -.02, cw = font(ENDS, 600, ls);
    const lw = textW(ENDL.n, ENDS, cw, ls), ex = W / 2 - lw / 2 - ENDS * .27, ey = H / 2 + ENDS * .36;
    // the same disc as the last paper frame (same size, same place, same blue for 4 frames), shrinking to a 24 px dot
    let rDot = lerp(7 * S * PUSHK, 12 * S, E.inOut(prog(t, T.s5, .45)));
    const dotCol = mix(PAPER.blue, DARK.blue, prog(t, T.s5 + 4 / FPS, .2));
    // the cast spirals back in on a smaller orbit (depth blur like the first one), then falls into the dot one by one
    const ro = { rx: (TALL ? 330 : 380) * S, ry: (TALL ? 260 : 170) * S, tilt: TALL ? .14 : -.21, speed: 1.1, t0: T.s5 - 1.5, cx: W / 2, cy: H / 2, sMin: .6, sMax: 1.1 };
    let bump = 0;
    CAST.forEach((c, i) => {
      const tin = T.s5 + .1 + i * .04; if (t < tin) return;
      const ts = T.s5 + .6 + i * .04, ps = E.quart(prog(t, ts, .38));
      if (ps >= 1) { const q = prog(t, ts + .38, .08); if (q < 1) bump = Math.max(bump, Math.sin(Math.PI * q)); return; }   // each arrival feeds the dot
      const sp = E.outCubic(prog(t, tin, .5)), grow = 1 + .9 * (1 - sp);
      const r = ring(i, t + (1 - sp) * 1.4, { ...ro, rx: ro.rx * grow * (1 - ps), ry: ro.ry * grow * (1 - ps) });
      drawIcon(c.id, t, r.x, r.y, 100 * S * r.s * (1 - ps * .8), { rot: r.rot + ps * 3.2, th: DARK, alpha: Math.min(1, sp * 2), blur: ps > 0 ? 0 : 3 * S * (1 - r.z) });
    });
    rDot *= 1 + .15 * bump;
    // dot -> caret where it is, glide to the start, then sweep: the line appears behind it
    const tq = T.s5 + .6 + 6 * .04 + .38 + .04, tg = tq + .12, tsw = tg + .25;
    const sq = E.outCubic(prog(t, tq, .12));
    const cwB = ENDS * .44, chB = ENDS * .9;
    const bw = lerp(rDot * 2, cwB, sq), bh = lerp(rDot * 2, chB, sq);
    const startX = ex + ENDS * .1, endX = ex + ENDL.n * cw + ENDS * .1, top = ey - ENDS * .76;
    const g = inOutQuart(prog(t, tg, .25)), s = E.inOut(prog(t, tsw, SWEEP));
    const bx = t < tsw ? lerp(W / 2 - bw / 2, startX, g) : lerp(startX, endX, s);
    const by = lerp(H / 2 - bh / 2, top, g);
    // the line: slashes grow up from the baseline, the address rises out of its slot
    font(ENDS, 600, ls);
    ENDL.chars.forEach((ch, i) => {
      const pt = tsw + passAt[i]; if (t < pt) return;
      const x = ex + i * cw;
      if (i < 10) {
        const kk = back(prog(t, pt, .28), 2.2);
        ctx.save(); ctx.translate(x, ey); ctx.scale(1, kk); ctx.fillStyle = ch.col; ctx.fillText(ch.c, 0, 0); ctx.restore();
      } else {
        const p = E.out(prog(t, pt, .36));
        ctx.save(); ctx.beginPath(); ctx.rect(x - 2 * S, ey - ENDS * 1.02, cw + 4 * S, ENDS * 1.32); ctx.clip();
        ctx.fillStyle = ch.col; ctx.fillText(ch.c, x, ey + (1 - p) * ENDS * 1.1); ctx.restore();
      }
    });
    const done = tsw + SWEEP + .4;
    if (blinkOn(t, done)) { rr(bx, by, bw, bh, lerp(rDot, 0, sq)); ctx.fillStyle = dotCol; ctx.fill(); }
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
