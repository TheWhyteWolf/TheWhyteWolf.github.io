/* ─────────────────────────────────────────────────────────────
   maykstuff — load-in intro engine
   Handles session gating, stagger index calculation, click/key
   skipping, reduced motion detection, and failsafe termination.
   Pass ?intro=1 in the URL to force-replay the intro at any time.
   ───────────────────────────────────────────────────────────── */
window.MAYK = window.MAYK || {};

MAYK.shouldIntro = function(id){
  try {
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if(/(?:^\?|&)demo=1(?:&|$)/.test(location.search)) return false;
    if(/(?:^\?|&)intro=1(?:&|$)/.test(location.search)) return true;
    var key = 'mayk-intro:' + (id || location.pathname);
    return !sessionStorage.getItem(key);
  } catch(e){
    return false;
  }
};

MAYK.intro = function(opts){
  opts = opts || {};
  var root = document.documentElement;
  var done = false;

  // If ?demo=1 is requested, skip boot intro immediately so demo reel takes the stage
  if(/(?:^\?|&)demo=1(?:&|$)/.test(location.search)){
    root.classList.remove('intro', 'intro-run');
    return;
  }

  // If head pre-check didn't activate intro (reduced motion / already seen), do nothing
  if(!root.classList.contains('intro')) return;

  var key = 'mayk-intro:' + (opts.id || location.pathname);
  try {
    sessionStorage.setItem(key, '1');
  } catch(e){}

  function finish(){
    if(done) return;
    done = true;
    root.classList.remove('intro', 'intro-run');
    if(opts.cleanup) {
      try { opts.cleanup(); } catch(err){ console.error(err); }
    }
    window.removeEventListener('keydown', finish);
    window.removeEventListener('pointerdown', finish);
  }

  // Set --i CSS variables on requested element groups for calc(var(--i) * Xms)
  if(Array.isArray(opts.stagger)){
    opts.stagger.forEach(function(sel){
      var els = document.querySelectorAll(sel);
      for(var i = 0; i < els.length; i++){
        els[i].style.setProperty('--i', i);
      }
    });
  }

  // Run optional JS animation logic (typing, decode, tuner roll...)
  if(typeof opts.run === 'function'){
    try { opts.run(); } catch(err){ console.error(err); }
  }

  // Trigger CSS animations on next frame
  requestAnimationFrame(function(){
    if(!done) root.classList.add('intro-run');
  });

  // Timed end + safety failsafe
  var duration = typeof opts.duration === 'number' ? opts.duration : 600;
  setTimeout(finish, duration);
  setTimeout(finish, 700); // failsafe guarantee

  // Instant skip on any user input
  window.addEventListener('keydown', finish);
  window.addEventListener('pointerdown', finish);
};

// Ensure demo.js is loaded on every view that includes intro.js
(function(){
  if (!window.MAYK.demo && !document.querySelector('script[src*="demo.js"]')) {
    var s = document.createElement('script');
    s.src = 'demo.js';
    document.head.appendChild(s);
  }
})();

