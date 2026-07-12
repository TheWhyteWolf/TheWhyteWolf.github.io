/* ─────────────────────────────────────────────────────────────
   maykstuff — SINGLE SOURCE OF TRUTH for every landing-page design.
   Edit an item's `desc` (or name / url / badge) here once and all
   designs update. `file` is an optional filesystem-style name used
   only by the Directory design (v4).
   badge is one of: "live" | "src" | "wip".
   ───────────────────────────────────────────────────────────── */
window.MAYK = {
  brand: "maykstuff",
  tagline: "the archive of Whyte Erminae",
  categories: [
    { name: "WebApps", items: [
      { name: "PF2E Spell Cards", file: "pf2e-spell-cards",
        url: "https://thewhytewolf.github.io/pf2espellcards/", badge: "live",
        desc: "Free, offline-capable Pathfinder 2E spell tracker." },
      { name: "PF2E Party Tracker", file: "pf2e-party-tracker",
        url: "https://thewhytewolf.github.io/pf2epartytracker/", badge: "live",
        desc: "A GM's PF2E party dashboard — passive stats, secret checks & exploration activities." },
      { name: "Oblique Strategies", file: "oblique-strategies",
        url: "https://thewhytewolf.github.io/Oblique/", badge: "live",
        desc: "Eno & Schmidt's deck (plus 43 of my own) for when you're stuck." }
    ]},
    { name: "Ascii Art", items: [
      { name: "ascii_fluid · PC", file: "ascii_fluid_pc",
        url: "https://thewhytewolf.github.io/ascii_fluid_pc/", badge: "live",
        desc: "Swirly browser fluid simulator, drawn in ASCII." },
      { name: "ascii_fluid · Mobile", file: "ascii_fluid_mobile",
        url: "https://thewhytewolf.github.io/ascii_fluid_mobile/", badge: "live",
        desc: "The fluid sim, tuned for touch screens." },
      { name: "ascii-cam",
        url: "https://thewhytewolf.github.io/ascii-cam/", badge: "live",
        desc: "Your webcam feed, rendered live as ASCII." },
      { name: "ascii_fluid_mobile",
        url: "https://github.com/TheWhyteWolf/ascii_fluid_mobile", badge: "src",
        desc: "Source for the ASCII fluid simulator." },
      { name: "ascii_tube",
        url: "https://github.com/TheWhyteWolf/ascii_tube", badge: "src",
        desc: "Terminal YouTube in 240p ASCII (Python + FFmpeg)." },
      { name: "ASCII",
        url: "https://github.com/TheWhyteWolf/ASCII", badge: "src",
        desc: "ASCII art experiments & tooling." }
    ]},
    { name: "Crawls / Userscripts", items: [
      { name: "KHinsider-crawl",
        url: "https://github.com/TheWhyteWolf/KHinsider-crawl", badge: "src",
        desc: "Grabs game soundtracks from KHInsider." }
    ]},
    { name: "CLAP Plugins", items: [
      { name: "Mangle",
        url: "https://github.com/TheWhyteWolf/Mangle", badge: "wip",
        desc: "Granular texture instrument — grains, stretch, cloud & spectral engines (Rust)." },
      { name: "Phase-Pyramid",
        url: "https://github.com/TheWhyteWolf/Phase-Pyramid", badge: "wip",
        desc: "A CLAP audio plugin. (under construction)" }
    ]},
    { name: "Standalone Software", items: [
      { name: "Moshit",
        url: "https://github.com/TheWhyteWolf/Moshit", badge: "wip",
        desc: "Cross-platform datamoshing — just FFmpeg & Python, no Adobe." },
      { name: "PsyBGGen",
        url: "https://github.com/TheWhyteWolf/PsyBGGen", badge: "wip",
        desc: "Random psychedelic background generator." }
    ]},
    { name: "niri", items: [
      { name: "niri-olivetree", file: "niri-olivetree",
        url: "https://github.com/TheWhyteWolf/niri-olivetree", badge: "src",
        desc: "Muted-olive niri desktop — Conway's Game of Life wallpaper, matching login screen, one quiet palette everywhere." },
      { name: "lifewall", file: "lifewall",
        url: "https://github.com/TheWhyteWolf/lifewall", badge: "src",
        desc: "Conway's Game of Life as a smooth terminal wallpaper — a tiny Rust binary in kitty's background panel." },
      { name: "lifegate", file: "lifegate",
        url: "https://github.com/TheWhyteWolf/lifegate", badge: "src",
        desc: "The niri Game of Life session screens — the lifelock locker and the lifegreet greeter, one isometric cube." }
    ]}
  ]
};

/* helpers */
MAYK.esc  = function(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); };
MAYK.slug = function(s){ return String(s).toLowerCase().replace(/\s*\/\s*/g,'-').replace(/\s+/g,'-'); };
MAYK.pad2 = function(n){ return (n<10?'0':'')+n; };

/* Generic renderer. Each design supplies:
     item(it, ctx)      -> HTML for one entry   (ctx: {ci, ii, last, gi})
     category(cat, ctx) -> HTML wrapping items  (ctx: {ci, itemsHTML, count})
   Result is injected into opts.mount. */
MAYK.render = function(opts){
  var mount = document.querySelector(opts.mount);
  if(!mount) return;
  var gi = 0, html = "";
  MAYK.categories.forEach(function(cat, ci){
    var items = "";
    cat.items.forEach(function(it, ii){
      items += opts.item(it, { ci:ci, ii:ii, last: ii === cat.items.length - 1, gi: gi });
      gi++;
    });
    html += opts.category(cat, { ci:ci, itemsHTML: items, count: cat.items.length });
  });
  mount.innerHTML = html;
};
