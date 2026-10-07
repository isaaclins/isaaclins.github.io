// The cast: one 16x16 pixel icon per project on the home page, drawn here
// in code. Each icon is either a hand-placed grid (one char per pixel) or a
// shape function; shape icons get a 1 px dark outline added automatically.
// icon(name, t) returns { rows: string[16], pal: {char: color} } for time t,
// so an icon can move by itself (Stewie blinks, the record spins).

(function () {
  const K = '#0b0c10'; // outline
  const N = 16;

  function check(rows, name) {
    if (rows.length !== N || rows.some(r => r.length !== N)) throw new Error('bad grid: ' + name);
    return rows;
  }

  // shape(x, y) -> palette char or '.', sampled at pixel centres; then outline.
  function fromShape(shape) {
    const g = [];
    for (let y = 0; y < N; y++) { let r = ''; for (let x = 0; x < N; x++) r += shape(x + .5, y + .5, x, y) || '.'; g.push(r); }
    const out = g.map(r => r.split(''));
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      if (g[y][x] !== '.') continue;
      const n = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => {
        const v = g[y + dy] && g[y + dy][x + dx];
        return v && v !== '.';
      });
      if (n) out[y][x] = 'k';
    }
    return out.map(r => r.join(''));
  }

  // Seeded hash, so speckles are the same in every frame and every render.
  const h2 = (x, y) => { let s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };

  // Stewie: an agent with its own computer. A monitor with a face.
  const STEWIE = check([
    '......kkkk......',
    '......kbbk......',
    '......kkkk......',
    '.......kk.......',
    '..kkkkkkkkkkkk..',
    '.kbbbbbbbbbbbbk.',
    '.kbssssssssssBk.',
    '.kbssssssssssBk.',
    '.kbsswwsswwssBk.',
    '.kbsswwsswwssBk.',
    '.kbssssssssssBk.',
    '.kbsssbbbbsssBk.',
    '.kbssssssssssBk.',
    '.kBBBBBBBBBBBBk.',
    '..kkkkkkkkkkkk..',
    '.....kkkkkk.....',
  ], 'stewie');

  // Rental Law Navigator: a house, windows lit.
  const HOUSE = check([
    '................',
    '.......kk.......',
    '......kLLk......',
    '.....kLLLLk.....',
    '....kLLLLLLk....',
    '...kLLLLLLLLk...',
    '..kLLLLLLLLLLk..',
    '.kLLLLLLLLLLLLk.',
    '.kkkkkkkkkkkkkk.',
    '..kwwwwwwwwwwk..',
    '..kwccwwwwccwk..',
    '..kwccwwwwccwk..',
    '..kwwwkkkkwwwk..',
    '..kwwwkddkwwwk..',
    '..kwwwkddkwwwk..',
    '.kkkkkkkkkkkkkk.',
  ], 'house');

  // demo-video-skill: a clapperboard with a play button.
  const CLAP = check([
    '................',
    '.kkkkkkkkkkkkkk.',
    '.kwwkkwwkkwwkkk.',
    '.kkwwkkwwkkwwkk.',
    '.kkkkkkkkkkkkkk.',
    '.kyyyyyyyyyyyyk.',
    '.kyyyyyyyyyyyyk.',
    '.kyyyykyyyyyyyk.',
    '.kyyyykkyyyyyyk.',
    '.kyyyykkkyyyyyk.',
    '.kyyyykkkkyyyyk.',
    '.kyyyykkkyyyyyk.',
    '.kyyyykkyyyyyyk.',
    '.kyyyykyyyyyyyk.',
    '.kYYYYYYYYYYYYk.',
    '.kkkkkkkkkkkkkk.',
  ], 'clap');

  // Challenge Server: a grass block, isometric, computed face by face.
  const GRASS = fromShape((px, py, x, y) => {
    const top = Math.abs(px - 8) / 7 + Math.abs(py - 4.5) / 3.5 <= 1;
    if (top) return h2(x, y) > .72 ? 'G' : 'g';
    if (px >= 1 && px <= 8 && py >= 4.5 + .5 * (px - 1) && py <= 11.5 + .5 * (px - 1)) {
      const d = py - (4.5 + .5 * (px - 1));
      if (d < 1.6 || (d < 2.8 && h2(x, 3) > .45)) return 'G';
      return h2(x, y) > .7 ? 'D' : 'd';
    }
    if (px >= 8 && px <= 15 && py >= 8 - .5 * (px - 8) && py <= 15 - .5 * (px - 8)) {
      const d = py - (8 - .5 * (px - 8));
      if (d < 1.6 || (d < 2.8 && h2(x, 5) > .45)) return 'H';
      return h2(x, y) > .7 ? 'E' : 'D';
    }
    return '';
  });

  // FreeSnitch: a shield with a check.
  const CHECK = new Set(['4,8', '4,9', '5,9', '5,10', '6,10', '6,11', '7,10', '7,9', '8,9', '8,8', '9,8', '9,7', '10,7', '10,6', '11,6', '11,5']);
  const SHIELD = fromShape((px, py, x, y) => {
    if (py < 1.2 || py > 15) return '';
    const hw = py <= 8.5 ? 6.2 : 6.2 * Math.pow(Math.max(0, 1 - (py - 8.5) / 6.6), .75);
    if (Math.abs(px - 8) > hw) return '';
    if (CHECK.has(x + ',' + y)) return 'w';
    return px < 8 ? 'm' : 'M';
  });

  // pi-vault: a padlock.
  const KEYHOLE = new Set(['7,9', '8,9', '6,10', '7,10', '8,10', '9,10', '7,11', '8,11', '7,12', '8,12']);
  const LOCK = fromShape((px, py, x, y) => {
    if (px > 2.5 && px < 13.5 && py > 7.5 && py < 14.8) {
      if (KEYHOLE.has(x + ',' + y)) return 'k';
      return py > 13.2 || px > 12.2 ? 'C' : 'c';
    }
    const d = Math.hypot(px - 8, py - 6.6);
    if (py < 7.6 && d >= 2.6 && d <= 4.7) return px > 8.6 ? 'S' : 's';
    if (py >= 6.6 && py <= 7.6 && ((px > 3.2 && px < 5.4) || (px > 10.6 && px < 12.8))) return px > 8 ? 'S' : 's';
    return '';
  });

  // Spotiglass: a vinyl record. The sheen turns with t, so it spins.
  function vinyl(t) {
    const phi = t * 2.6;
    return fromShape((px, py) => {
      const d = Math.hypot(px - 8, py - 8);
      if (d > 7.1) return '';
      if (d < .8) return 'k';
      if (d < 2.9) return d < 2.0 ? 'p' : 'P';
      const a = Math.atan2(py - 8, px - 8);
      const sheen = Math.cos(2 * (a - phi));
      if (sheen > .86 && d > 3.4 && d < 6.6) return 'h';
      return (d > 4.4 && d < 5.1) || d > 6.4 ? 'V' : 'v';
    });
  }

  const PAL = {
    stewie: { k: K, b: '#6f95ff', B: '#3e63d8', s: '#141a33', w: '#ecebe7' },
    navigator: { k: K, L: '#8fb1ff', w: '#ecebe7', c: '#ffd36b', d: '#4a6fe0' },
    'demo-video': { k: K, w: '#ecebe7', y: '#f5b83d', Y: '#c98a17' },
    minecraft: { k: K, g: '#79c94a', G: '#559c33', H: '#467f2a', d: '#916038', D: '#6f4727', E: '#55361d' },
    freesnitch: { k: K, m: '#34d399', M: '#1ea372', w: '#f5f4ef' },
    'pi-vault': { k: K, c: '#3fd0ff', C: '#1f9ccb', s: '#d4d3cd', S: '#8f8e88' },
    spotiglass: { k: K, v: '#1c1c22', V: '#2b2b34', h: '#6a6a78', p: '#ff5a72', P: '#d83a55' },
  };

  // Stewie blinks twice in the film (times in seconds); one blink = 0.12 s.
  const BLINKS = [3.9, 8.1, 13.2, 17.4];

  function icon(name, t) {
    let rows;
    switch (name) {
      case 'stewie':
        rows = STEWIE;
        if (BLINKS.some(b => t >= b && t < b + .12)) rows = rows.map((r, i) => i === 8 ? r.replace(/w/g, 's') : i === 9 ? r.replace(/w/g, 'b') : r);
        break;
      case 'navigator': rows = HOUSE; break;
      case 'demo-video': rows = CLAP; break;
      case 'minecraft': rows = GRASS; break;
      case 'freesnitch': rows = SHIELD; break;
      case 'pi-vault': rows = LOCK; break;
      case 'spotiglass': rows = vinyl(t); break;
      default: throw new Error('no icon ' + name);
    }
    return { rows, pal: PAL[name] };
  }

  // The order of the git log on the home page, newest first (data/projects.toml).
  const CAST = [
    { id: 'stewie', name: 'Stewie', hash: 'a4d82da' },
    { id: 'navigator', name: 'Rental Law Navigator', hash: '417d035' },
    { id: 'demo-video', name: 'demo-video-skill', hash: '1b623a3' },
    { id: 'minecraft', name: 'Challenge Server', hash: '851cf10' },
    { id: 'freesnitch', name: 'FreeSnitch', hash: 'cc88217' },
    { id: 'pi-vault', name: 'pi-vault', hash: '977842a' },
    { id: 'spotiglass', name: 'Spotiglass', hash: '3e34eb7' },
  ];

  window.ICONS = { icon, CAST, N };
})();
