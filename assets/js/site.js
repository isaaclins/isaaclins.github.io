/* Every page: theme toggle (dark -> light is a flashbang), the top bar
   hairline, the toast, [data-copy] buttons and the five easter eggs.
   The theme itself is set before first paint by the inline script in
   layouts/partials/head.html. */
(function () {
  var root = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function typing(el) { return el && (/^(input|textarea|select)$/i.test(el.tagName) || el.isContentEditable); }

  /* toast */
  var toastEl = document.createElement('div'), toastT;
  toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); toastEl.setAttribute('aria-live', 'polite');
  document.body.appendChild(toastEl);
  function toast(html, ms) {
    toastEl.innerHTML = html; toastEl.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('show'); }, ms || 4200);
  }

  /* easter eggs: what they are, a hint while hidden, and which ones were found */
  var EGGS = [
    { id: 'flash', name: 'Think fast, chucklenuts', hint: 'Some people really want light mode.' },
    { id: 'sudo', name: 'Not in the sudoers file', hint: 'Ask for root. Just type it.' },
    { id: 'hello', name: 'No hello', hint: 'Say hi. Actually, don\'t.' },
    { id: 'konami', name: 'Arcoiris mode', hint: 'Old cheat codes still work.' },
    { id: 'console', name: 'Blue team sees you', hint: 'Developers look under the hood.' }
  ];
  var found = {};
  try { found = JSON.parse(load('eggs') || '{}') || {}; } catch (e) {}
  function count() { return EGGS.filter(function (e) { return found[e.id]; }).length; }

  var panel = document.createElement('div');
  panel.className = 'eggs'; panel.id = 'eggs';
  panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true'); panel.setAttribute('aria-labelledby', 'eggs-title');
  panel.innerHTML =
    '<div class="card">' +
      '<h2 id="eggs-title">easter eggs <b class="eggscore">0/5</b></h2>' +
      '<ul class="egglist"></ul>' +
      '<p class="keysrow">' + (document.getElementById('log') ? '<kbd>j</kbd> <kbd>k</kbd> projects &nbsp; ' : '') +
        '<kbd>?</kbd> this list &nbsp; <kbd>esc</kbd> close</p>' +
      '<button class="close" type="button">Close</button>' +
    '</div>';
  document.body.appendChild(panel);

  function renderEggs() {
    var n = count() + '/' + EGGS.length;
    document.querySelectorAll('.eggcount, .eggscore').forEach(function (el) { el.textContent = n; });
    panel.querySelector('.egglist').innerHTML = EGGS.map(function (e) {
      return found[e.id] ? '<li class="got"><span class="s">✓</span><span>' + e.name + '</span></li>'
                         : '<li><span class="s">?</span><span>' + e.hint + '</span></li>';
    }).join('');
  }
  function egg(id) {
    var first = !found[id];
    found[id] = 1; save('eggs', JSON.stringify(found)); renderEggs();
    return first;
  }
  function eggLine() { return '<span class="egg">easter egg ' + count() + '/' + EGGS.length + ' found</span>'; }
  renderEggs();

  var opener = null;
  function isOpen() { return panel.classList.contains('open'); }
  function openEggs() {
    opener = document.activeElement; renderEggs(); panel.classList.add('open');
    panel.querySelector('.close').focus();
  }
  function closeEggs() {
    if (!isOpen()) return;
    panel.classList.remove('open');
    if (opener && opener.focus) opener.focus();
  }
  document.querySelectorAll('[data-eggs]').forEach(function (b) { b.addEventListener('click', openEggs); });
  panel.querySelector('.close').addEventListener('click', closeEggs);
  panel.addEventListener('click', function (e) { if (e.target === panel) closeEggs(); });
  panel.addEventListener('keydown', function (e) { if (e.key === 'Tab') { e.preventDefault(); panel.querySelector('.close').focus(); } });

  /* typed words + konami code */
  var typed = '', kseq = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'], kpos = 0;
  addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey || typing(e.target)) return;
    var k = (e.key || '').toLowerCase();
    if (k === 'escape') { closeEggs(); return; }
    if (k === '?') { isOpen() ? closeEggs() : openEggs(); return; }
    kpos = (k === kseq[kpos]) ? kpos + 1 : (k === kseq[0] ? 1 : 0);
    if (kpos === kseq.length) {
      kpos = 0; egg('konami');
      if (!reduce) {
        root.classList.remove('arcoiris'); void root.offsetWidth; root.classList.add('arcoiris');
        setTimeout(function () { root.classList.remove('arcoiris'); }, 4100);
      }
      toast(eggLine() + '↑↑↓↓←→←→BA. Arcoiris mode, courtesy of pi-arcoiris-refined.');
      return;
    }
    if (k.length !== 1) return;
    typed = (typed + k).slice(-12);
    if (/sudo$/.test(typed)) {
      typed = ''; egg('sudo');
      toast(eggLine() + '<span class="err">isaac is not in the sudoers file. This incident will be reported.</span><br>Reported to: the blue team. That\'s me.', 5200);
    } else if (/(hello|hallo|hi there)$/.test(typed)) {
      typed = ''; egg('hello');
      toast(eggLine() + 'Don\'t say hello and wait. Just ask the question: <a href="https://nohello.net/en/">nohello.net</a><br>Or straight to <a href="mailto:contact@isaaclins.com">contact@isaaclins.com</a>.', 5600);
    }
  });

  /* for whoever opens devtools */
  window.claim = function () {
    var first = egg('console');
    return first ? 'Claimed. Blue team logged it. ' + count() + '/' + EGGS.length : 'Already claimed.';
  };
  console.log('%c _                          _ _\n(_)___  __ _  __ _  ___ | (_)_ __  ___\n| / __|/ _` |/ _` |/ __|| | | \'_ \\/ __|\n| \\__ \\ (_| | (_| | (__ | | | | | \\__ \\\n|_|___/\\__,_|\\__,_|\\___||_|_|_| |_|___/', 'color:#6f95ff;font-family:monospace');
  console.log('%cBlue team sees you. Looking at the source is the right instinct.\nRun claim() to log this easter egg, then say hi: contact@isaaclins.com', 'font-family:monospace');

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
      var first = egg('flash');
      if (first) setTimeout(function () { toast(eggLine() + 'Think fast, chucklenuts. Press <kbd>?</kbd> for the rest.'); }, 900);
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
