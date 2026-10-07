/* Home page only: the name decrypt, the Zurich clock, scroll reveals, the
   git-log rail, j/k, Stewie's chat and dream countdown, the pi-vault loop,
   the demo video and the click-to-copy address. */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* name: decrypts once on load, like reading a hash back into a name */
  var chs = document.querySelectorAll('#name .ch');
  if (chs.length && !reduce) {
    var letters = [].map.call(chs, function (el) { return el.textContent; });
    var glyphs = '01abcdef#$%&/\\<>{}=+*', start = performance.now();
    (function step(now) {
      var done = 0;
      chs.forEach(function (el, i) {
        if (now - start > 180 + i * 70) { el.textContent = letters[i]; el.classList.remove('scr'); done++; }
        else { el.textContent = glyphs[(Math.random() * glyphs.length) | 0]; el.classList.add('scr'); }
      });
      if (done < chs.length) requestAnimationFrame(step);
    })(start);
  }

  /* live local time in Switzerland */
  var clock = document.getElementById('clock'), tz = document.getElementById('tz');
  if (clock) {
    var fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Zurich', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    var zone = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Zurich', timeZoneName: 'short' }).formatToParts(new Date())
      .find(function (p) { return p.type === 'timeZoneName'; });
    if (tz) tz.textContent = 'Zurich' + (zone ? ', ' + zone.value.replace('GMT+2', 'CEST').replace('GMT+1', 'CET') : '');
    var tick = function () { clock.textContent = fmt.format(new Date()); };
    tick(); setInterval(tick, 1000);
  }

  /* reveal on scroll */
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });

  /* work: rail fills to the middle of the screen; the commit crossing it lights up */
  var log = document.getElementById('log'), fill = document.getElementById('fill');
  var commits = log ? [].slice.call(log.querySelectorAll('.commit')) : [];
  if (log) {
    var seenIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('seen'); seenIO.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -15% 0px' });
    commits.forEach(function (c) { seenIO.observe(c); });
    var current = -2, ticking = false;
    var update = function () {
      ticking = false;
      var r = log.getBoundingClientRect(), mid = innerHeight * 0.5;
      var h = Math.max(0, Math.min(r.height, mid - r.top));
      fill.style.height = h + 'px';
      fill.classList.toggle('lit', h > 2);
      var idx = -1;
      commits.forEach(function (c, i) {
        var on = c.getBoundingClientRect().top + 10 < mid;
        c.classList.toggle('on', on);
        if (on) idx = i;
      });
      if (idx !== current) {
        current = idx;
        log.style.setProperty('--accent', getComputedStyle(commits[Math.max(idx, 0)]).getPropertyValue('--c'));
      }
    };
    addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener('resize', update);
    update();

    /* j / k jump between projects */
    addEventListener('keydown', function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey || /^(input|textarea|select)$/i.test(e.target.tagName)) return;
      if (e.key !== 'j' && e.key !== 'k') return;
      var y = scrollY + 100, tops = commits.map(function (c) { return c.getBoundingClientRect().top + scrollY; });
      var next = e.key === 'j' ? tops.find(function (t) { return t > y + 8; }) : tops.slice().reverse().find(function (t) { return t < y - 8; });
      if (next === undefined) next = e.key === 'j' ? null : document.getElementById('work').getBoundingClientRect().top + scrollY - 90;
      if (next !== null) scrollTo({ top: next - 100, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* Stewie: replay the real requests from the first week */
  var chatEl = document.getElementById('stewchat');
  if (chatEl && !reduce) {
    var convo = [].map.call(chatEl.children, function (m) { return [m.classList.contains('me') ? 'me' : 'st', m.textContent]; });
    chatEl.innerHTML = '';
    var add = function (cls, text) {
      var d = document.createElement('div'); d.className = 'msg ' + cls;
      if (text) d.textContent = text; else d.innerHTML = '<i></i><i></i><i></i>';
      chatEl.appendChild(d);
      while (chatEl.children.length > 6) chatEl.removeChild(chatEl.firstChild);
      return d;
    };
    var runChat = function () {
      var i = 0;
      (function step() {
        if (i >= convo.length) { setTimeout(function () { chatEl.innerHTML = ''; i = 0; step(); }, 4000); return; }
        var m = convo[i++];
        if (m[0] === 'st') {
          var t = add('st typing');
          setTimeout(function () { chatEl.removeChild(t); add('st', m[1]); setTimeout(step, 1500); }, 1100);
        } else { add('me', m[1]); setTimeout(step, 700); }
      })();
    };
    var cio = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { cio.disconnect(); runChat(); } }, { threshold: .35 });
    cio.observe(chatEl);
  }

  /* countdown to tonight's dream at 02:30 Zurich */
  var dreamEl = document.getElementById('dreamin');
  if (dreamEl) {
    var partsFmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Zurich', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var dreamTick = function () {
      var p = partsFmt.format(new Date()).split(':').map(Number);
      var left = (2 * 3600 + 30 * 60 - (p[0] * 3600 + p[1] * 60 + p[2]) + 86400) % 86400;
      dreamEl.textContent = pad(Math.floor(left / 3600)) + ':' + pad(Math.floor(left % 3600 / 60)) + ':' + pad(left % 60);
    };
    dreamTick(); setInterval(dreamTick, 1000);
  }

  /* pi-vault: ask, approve, run, redacted */
  var vault = document.getElementById('vault');
  if (vault && !reduce) {
    var runVault = function () {
      var seq = [['s1', 900], ['s2', 1700], ['s3', 450], ['s4', 4200], ['', 500]], k = 0;
      (function next() { var st = seq[k++ % seq.length]; vault.className = 'term vault ' + st[0]; setTimeout(next, st[1]); })();
    };
    var vio = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { vio.disconnect(); runVault(); } }, { threshold: .35 });
    vio.observe(vault);
  }

  /* two-screenshot stages crossfade every few seconds while on screen */
  document.querySelectorAll('.shot.swap').forEach(function (shot) {
    if (reduce) return;
    var t = null;
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !t) t = setInterval(function () { shot.classList.toggle('flip'); }, 3600);
        else if (!e.isIntersecting && t) { clearInterval(t); t = null; }
      });
    }, { threshold: .3 }).observe(shot);
  });

  /* demo video plays only while on screen; reduced motion gets controls instead */
  document.querySelectorAll('.shot.video video').forEach(function (vid) {
    if (reduce) { vid.controls = true; return; }
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { vid.preload = 'auto'; vid.play().catch(function () {}); } else vid.pause(); });
    }, { threshold: .3 }).observe(vid);
  });

  /* intro film: plays once while on screen, pauses off screen. Reduced motion
     and Save-Data / slow connections keep the poster until someone presses play. */
  var film = document.getElementById('film');
  if (film) {
    var fv = film.querySelector('video'), fb = film.querySelector('.film-btn');
    var conn = navigator.connection || {};
    var auto = !reduce && !conn.saveData && !/(^|-)2g|3g/.test(conn.effectiveType || '');
    var wanted = false;
    var setBtn = function (s, label) { fb.dataset.state = s; fb.setAttribute('aria-label', label); };
    var play = function () {
      fv.preload = 'auto';
      fv.play().then(function () { film.classList.add('on'); setBtn('pause', 'Pause the intro film'); }, function () {});
    };
    fv.addEventListener('ended', function () { wanted = false; setBtn('replay', 'Play the intro film again'); });
    fv.addEventListener('pause', function () { if (!fv.ended) setBtn('play', 'Play the intro film'); });
    fb.addEventListener('click', function () {
      if (fv.paused) { wanted = true; if (fv.ended) fv.currentTime = 0; play(); }
      else { wanted = false; auto = false; fv.pause(); }
    });
    new IntersectionObserver(function (es) {
      var vis = es[0].isIntersecting;
      if (vis && (auto || wanted) && fv.paused && !fv.ended) { wanted = true; play(); }
      else if (!vis && !fv.paused) fv.pause();
    }, { threshold: .5 }).observe(film);
  }

  /* contact: click copies the address */
  var mail = document.getElementById('mail'), hint = document.getElementById('copyhint');
  if (mail && hint) {
    var hintHTML = hint.innerHTML, ht;
    mail.addEventListener('click', function () {
      var done = function () {
        hint.innerHTML = '<b>Copied.</b> Paste it into any mail app.';
        clearTimeout(ht); ht = setTimeout(function () { hint.innerHTML = hintHTML; }, 2600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(mail.dataset.mail).then(done, function () { location.href = 'mailto:' + mail.dataset.mail; });
      else location.href = 'mailto:' + mail.dataset.mail;
    });
  }
})();
