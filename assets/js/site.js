/* Every page: theme toggle (dark -> light is a flashbang), the top bar
   hairline, the toast and [data-copy] buttons.
   The theme itself is set before first paint by the inline script in
   layouts/partials/head.html. */
(function () {
  var root = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  /* toast */
  var toastEl = document.createElement('div'), toastT;
  toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); toastEl.setAttribute('aria-live', 'polite');
  document.body.appendChild(toastEl);
  function toast(html, ms) {
    toastEl.innerHTML = html; toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('show'); }, ms || 4200);
  }

  /* theme toggle */
  function setTheme(t) { root.dataset.theme = t; save('theme', t); }
  var busy = false;
  document.querySelectorAll('.theme').forEach(function (b) {
    b.addEventListener('click', function () {
      if (root.dataset.theme === 'light') { setTheme('dark'); return; }
      if (busy) return;
      if (reduce) { setTheme('light'); return; }
      flashbang();
    });
  });

  /* Going from dark to light mode: think fast, chucklenuts. No sound. */
  function flashbang() {
    busy = true;
    var fb = document.createElement('div');
    fb.className = 'fb'; fb.setAttribute('aria-hidden', 'true');
    fb.innerHTML =
      '<div class="say">Think fast,<br>chucklenuts!</div>' +
      '<svg class="nade" viewBox="0 0 46 74" fill="none">' +
        '<rect x="9" y="20" width="28" height="50" rx="5" fill="#5d6b4f" stroke="#2b3324" stroke-width="2"/>' +
        '<path d="M9 33h28M9 57h28" stroke="#2b3324" stroke-width="2"/>' +
        '<rect x="15" y="10" width="16" height="11" rx="2" fill="#9aa0a6" stroke="#4a4f55" stroke-width="2"/>' +
        '<path d="M31 13c8 1 10 8 9 24" stroke="#9aa0a6" stroke-width="4" stroke-linecap="round"/>' +
        '<circle cx="12" cy="9" r="6" stroke="#c9ccd1" stroke-width="2.5"/>' +
      '</svg>' +
      '<div class="flash"></div>';
    document.body.appendChild(fb);
    setTimeout(function () {
      fb.classList.add('boom');
      setTheme('light');
      root.classList.add('dazed');
      setTimeout(function () { fb.remove(); root.classList.remove('dazed'); busy = false; }, 1100);
    }, 430);
  }

  /* top bar hairline after scrolling */
  var top = document.getElementById('top');
  if (top) {
    var hair = function () { top.classList.toggle('scrolled', scrollY > 8); };
    addEventListener('scroll', hair, { passive: true }); hair();
  }

  /* any [data-copy] button copies its value */
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var v = b.dataset.copy, msg = '<b>' + v + '</b><br>';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(v).then(function () { toast(msg + (b.dataset.copied || 'Copied.'), 3200); },
                                              function () { toast(msg + 'Copy it from here.', 5000); });
      } else toast(msg + 'Copy it from here.', 5000);
    });
  });
})();
