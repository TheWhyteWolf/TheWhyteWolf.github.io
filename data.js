/* ─────────────────────────────────────────────────────────────
   maykstuff — SINGLE SOURCE OF TRUTH for every landing-page design.
   Edit an item's `desc` (or name / url / badge) here once and all
   designs update. `file` is an optional filesystem-style name used
   only by the Directory design (v4).
   badge is one of: "live" | "src" | "wip".
   `sub: true` marks an item as a constituent part of the entry
   above it — each design indents or nests it.
   ───────────────────────────────────────────────────────────── */
window.MAYK = {
  brand: "maykstuff",
  tagline: "the archive of Whyte Erminae",
  categories: [
    { name: "WebApps", items: [
      { name: "Oblique Strategies", file: "oblique-strategies",
        url: "https://thewhytewolf.github.io/Oblique/", badge: "live",
        desc: "Eno & Schmidt's deck (plus 43 of my own) for when you're stuck." },
      { name: "MiNERVA FM", file: "minerva-fm",
        url: "https://thewhytewolf.github.io/MiNERVA-FM-Local/", badge: "live",
        desc: "Audio-reactive CRT chiptune player — bring your own SID/SPC/VGM files." },
      { name: "Divine Geometry", file: "divine-geometry",
        url: "https://thewhytewolf.github.io/divine-geometry/", badge: "live",
        desc: "Compass-and-straightedge sacred geometry — every circle centred on a solved intersection (Rust + WebGPU)." }
    ]},
    { name: "TTRPG Help", items: [
      { name: "PF2e Toolbox", file: "pf2etoolbox",
        url: "https://github.com/TheWhyteWolf/pf2etoolbox", badge: "src",
        desc: "All four Pathfinder 2e tools on one origin, behind one name — submodule-pinned, stdlib Node, no build step." },
      { name: "PF2e Primer", file: "pf2eprimer", sub: true,
        url: "https://thewhytewolf.github.io/pf2eprimer/", badge: "live",
        desc: "An interactive introduction to PF2e for people who already know tabletop RPGs — the three pillars of play, with live demos." },
      { name: "PF2e Spellbook", file: "pf2espellcards", sub: true,
        url: "https://thewhytewolf.github.io/pf2espellcards/", badge: "live",
        desc: "Free, offline-capable Pathfinder 2e spell tracker." },
      { name: "PF2e Party Tracker", file: "pf2epartytracker", sub: true,
        url: "https://thewhytewolf.github.io/pf2epartytracker/", badge: "live",
        desc: "A GM's party dashboard — passive stats, secret checks & exploration activities." },
      { name: "PF2e Subsystems", file: "pf2esubsystems", sub: true,
        url: "https://thewhytewolf.github.io/pf2esubsystems/", badge: "live",
        desc: "Victory Point subsystems at the table — chases, infiltrations, influence encounters and research." }
    ]},
    { name: "LifeBranch", items: [
      { name: "LifeBranch", file: "LifeBranch",
        url: "https://github.com/TheWhyteWolf/LifeBranch", badge: "src",
        desc: "A niri desktop for Arch Linux built around Conway's Game of Life — wallpaper, lock screen and login screen are all the same automaton, re-themed from one config file." },
      { name: "lifeconf", file: "lifeconf", sub: true,
        url: "https://github.com/TheWhyteWolf/LifeBranch/tree/main/lifeconf", badge: "src",
        desc: "The theming front-end — one theme.toml regenerates every consumer's config." },
      { name: "lifewall", file: "lifewall", sub: true,
        url: "https://github.com/TheWhyteWolf/LifeBranch/tree/main/lifewall", badge: "src",
        desc: "The Game of Life wallpaper, riding inside kitty's background panel." },
      { name: "lifelock", file: "lifelock", sub: true,
        url: "https://github.com/TheWhyteWolf/LifeBranch/tree/main/lifelock", badge: "src",
        desc: "The screen locker, PAM-backed." },
      { name: "lifenote", file: "lifenote", sub: true,
        url: "https://github.com/TheWhyteWolf/LifeBranch/tree/main/lifenote", badge: "src",
        desc: "The notification daemon — box-drawing frames, no glyph icons." },
      { name: "lifegreet", file: "lifegreet", sub: true,
        url: "https://github.com/TheWhyteWolf/LifeBranch/tree/main/lifegreet", badge: "src",
        desc: "The login screen — the locker's twin, one isometric cube between them." },
      { name: "lifeshot", file: "lifeshot", sub: true,
        url: "https://github.com/TheWhyteWolf/lifeshot", badge: "src",
        desc: "Flameshot-style screenshot and annotation overlay for niri (Rust)." },
      { name: "lifefiles", file: "lifefiles", sub: true,
        url: "https://github.com/TheWhyteWolf/lifefiles", badge: "src",
        desc: "Mouse-driven terminal file browser in yazi's layout, and the LifeBranch Open/Save dialog (Rust)." }
    ]},
    { name: "Ascii Art", items: [
      { name: "ascii_fluid · PC", file: "ascii_fluid_pc",
        url: "https://thewhytewolf.github.io/ascii_fluid_pc/", badge: "live",
        desc: "Swirly browser fluid simulator, drawn in ASCII." },
      { name: "ascii_fluid · Mobile", file: "ascii_fluid_mobile",
        url: "https://thewhytewolf.github.io/ascii_fluid_mobile/", badge: "live",
        desc: "The fluid sim, tuned for touch screens." },
      { name: "ascii_fluid · Rust", file: "ascii_fluid_rust",
        url: "https://github.com/TheWhyteWolf/ASCII_Fluid_Rust", badge: "src",
        desc: "Native desktop port — 42 palettes, 9 brushes, vorticity confinement & autopilot (Rust)." },
      { name: "ascii-cam",
        url: "https://thewhytewolf.github.io/ascii-cam/", badge: "live",
        desc: "Your webcam feed, rendered live as ASCII." },
      { name: "ascii_tube",
        url: "https://github.com/TheWhyteWolf/ascii_tube", badge: "src",
        desc: "Terminal YouTube in 240p ASCII (Python + FFmpeg)." },
      { name: "ASCII",
        url: "https://github.com/TheWhyteWolf/ASCII", badge: "src",
        desc: "ASCII art experiments & tooling." }
    ]},
    { name: "Audio & Sound", items: [
      { name: "furnace-chipruns", file: "furnace-chipruns",
        url: "https://github.com/TheWhyteWolf/furnace-chipruns", badge: "src",
        desc: "Free WAV samples of 80+ emulated sound chips & 1,280+ presets, rendered with Furnace." },
      { name: "Sleeve-Note", file: "sleeve-note",
        url: "https://github.com/TheWhyteWolf/Sleeve-Note", badge: "src",
        desc: "A vinyl collection: what you own, what condition it is in, and what people are asking for it (Python)." },
      { name: "MiNERVA-FM-Radio", file: "minerva-fm-radio",
        url: "https://github.com/minerva-archive/MiNERVA-FM", badge: "src",
        desc: "The broadcast edition — a self-hosted chiptune radio: indexes the collection, serves one shared HLS stream and a CRT web player with a live spectrum." },
      { name: "MiNERVA-FM-Term", file: "minerva-fm-term",
        url: "https://github.com/TheWhyteWolf/MiNERVA-FM-Term", badge: "src",
        desc: "Terminal music player for every video-game audio format (Rust)." },
      { name: "hootrip",
        url: "https://github.com/TheWhyteWolf/hootrip", badge: "src",
        desc: "Batch-converts hoot emulator music sets to S98/VGM register logs — re-hosts the game's own sound driver on an emulated PC-88 or PC-98 (Rust)." }
    ]},
    { name: "Crawls / Userscripts", items: [
      { name: "KHinsider-crawl",
        url: "https://github.com/TheWhyteWolf/KHinsider-crawl", badge: "src",
        desc: "Grabs game soundtracks from KHInsider." }
    ]},
    { name: "Standalone Software", items: [
      { name: "IA-Chunkup", file: "ia-chunkup",
        url: "https://github.com/TheWhyteWolf/IA-Chunkup", badge: "src",
        desc: "Resilient bulk uploader for archive.org — chunks around the 120s read timeout in the internetarchive library (Python)." },
      { name: "4kListnConvert", file: "4klistnconvert",
        url: "https://github.com/TheWhyteWolf/4kListnConvert", badge: "src",
        desc: "Scans a video library, groups it, converts 4K to 1080p — and deletes the original only once the new file verifies. CLI with an optional TUI." },
      { name: "noiteyes", file: "noiteyes",
        url: "https://github.com/TheWhyteWolf/noiteyes", badge: "src",
        desc: "Cryptanalysis workspace and solvers for Noita's unsolved Eye Messages cipher (Python & C)." },
      { name: "Moshit",
        url: "https://github.com/TheWhyteWolf/Moshit", badge: "wip",
        desc: "Cross-platform datamoshing — just FFmpeg & Python, no Adobe." },
      { name: "PsyBGGen",
        url: "https://github.com/TheWhyteWolf/PsyBGGen", badge: "wip",
        desc: "Random psychedelic background generator." }
    ]}
  ]
};

/* helpers */
MAYK.esc  = function(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); };
MAYK.slug = function(s){ return String(s).toLowerCase().replace(/\s*\/\s*/g,'-').replace(/\s+/g,'-'); };
MAYK.pad2 = function(n){ return (n<10?'0':'')+n; };

/* Menu keys for the designs that letter their entries: A-Z then 0-9,
   so a listing longer than 26 items keeps giving back real characters. */
MAYK.KEYS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
MAYK.key  = function(i){ return MAYK.KEYS.charAt(i % MAYK.KEYS.length); };

/* Live totals, so no design has to hardcode a number that goes stale. */
MAYK.counts = function(){
  var items = 0;
  MAYK.categories.forEach(function(c){ items += c.items.length; });
  return { categories: MAYK.categories.length, items: items };
};

/* Today, as the print-out designs want it. */
MAYK.today = function(){
  var d = new Date();
  return d.getFullYear()+'-'+MAYK.pad2(d.getMonth()+1)+'-'+MAYK.pad2(d.getDate());
};

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
