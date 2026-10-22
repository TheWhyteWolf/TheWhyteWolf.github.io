/* ─────────────────────────────────────────────────────────────
   allthemalware — SINGLE SOURCE OF TRUTH for every landing-page design.
   Edit an item's `desc` (or name / url / badge) here once and all
   designs update. `file` is an optional filesystem-style name used
   only by the Directory design (v4).
   badge is one of: "live" | "src" | "wip".
   `sub: true` marks an item as a constituent part of the entry
   above it — each design indents or nests it.
   ───────────────────────────────────────────────────────────── */
window.MAYK = {
  brand: "allthemalware",
  tagline: "Whyte Erminae — Systems, Graphics & Audio Engineering",
  categories: [
    { name: "Graphics & Visual Computing", items: [
      { name: "Divine Geometry", file: "divine-geometry",
        url: "https://allthemalware.github.io/divine-geometry/", badge: "live",
        desc: "Compass-and-straightedge sacred geometry — every circle centred on a solved intersection (Rust + WebGPU)." },
      { name: "MiNERVA FM", file: "minerva-fm",
        url: "https://allthemalware.github.io/MiNERVA-FM-Local/", badge: "live",
        desc: "Audio-reactive CRT chiptune player — bring your own SID/SPC/VGM files." },
      { name: "Oblique Strategies", file: "oblique-strategies",
        url: "https://allthemalware.github.io/Oblique/", badge: "live",
        desc: "Eno & Schmidt's deck (plus 102 original additions) as an offline-first web tool and CLI." }
    ]},
    { name: "LifeBranch (Desktop Ecosystem)", items: [
      { name: "LifeBranch", file: "LifeBranch",
        url: "https://github.com/allthemalware/LifeBranch", badge: "src",
        desc: "A cohesive niri desktop for Arch Linux built around Conway's Game of Life — wallpaper, locker, and login screen sharing one automaton." },
      { name: "lifeconf", file: "lifeconf", sub: true,
        url: "https://github.com/allthemalware/LifeBranch/tree/main/lifeconf", badge: "src",
        desc: "Central theming daemon — one theme.toml regenerates configs across the entire desktop." },
      { name: "lifewall", file: "lifewall", sub: true,
        url: "https://github.com/allthemalware/LifeBranch/tree/main/lifewall", badge: "src",
        desc: "GPU layer-shell wallpaper automaton with Kitty background panel integration." },
      { name: "lifelock", file: "lifelock", sub: true,
        url: "https://github.com/allthemalware/LifeBranch/tree/main/lifelock", badge: "src",
        desc: "PAM-backed ext-session-lock screen locker." },
      { name: "lifenote", file: "lifenote", sub: true,
        url: "https://github.com/allthemalware/LifeBranch/tree/main/lifenote", badge: "src",
        desc: "Lightweight freedesktop notification daemon with box-drawing frames." },
      { name: "lifegreet", file: "lifegreet", sub: true,
        url: "https://github.com/allthemalware/LifeBranch/tree/main/lifegreet", badge: "src",
        desc: "The greetd login screen sharing an isometric renderer with lifelock." },
      { name: "lifeshot", file: "lifeshot", sub: true,
        url: "https://github.com/allthemalware/lifeshot", badge: "src",
        desc: "Flameshot-style screenshot and annotation overlay for niri (Rust)." },
      { name: "lifefiles", file: "lifefiles", sub: true,
        url: "https://github.com/allthemalware/lifefiles", badge: "src",
        desc: "Mouse-driven terminal file browser and dialog provider (Rust)." }
    ]},
    { name: "Audio DSP & Sound Engineering", items: [
      { name: "MiNERVA-FM-Radio", file: "minerva-fm-radio",
        url: "https://github.com/allthemalware/MiNERVA-FM-Radio", badge: "src",
        desc: "Self-hosted broadcast chiptune radio with shared Icecast/HLS stream and CRT visualizer." },
      { name: "MiNERVA-FM-Term", file: "minerva-fm-term",
        url: "https://github.com/allthemalware/MiNERVA-FM-Term", badge: "src",
        desc: "Terminal music player for video game audio formats across platforms (Rust)." },
      { name: "furnace-chipruns", file: "furnace-chipruns",
        url: "https://github.com/allthemalware/furnace-chipruns", badge: "src",
        desc: "Curated open archive of 1,280+ sample runs across 80+ emulated sound chips rendered via Furnace." },
      { name: "hootrip", file: "hootrip",
        url: "https://github.com/allthemalware/hootrip", badge: "src",
        desc: "Batch-converts hoot emulator sets to S98/VGM register logs via emulated PC-88/98 sound drivers (Rust)." },
      { name: "Sleeve-Note", file: "sleeve-note",
        url: "https://github.com/allthemalware/Sleeve-Note", badge: "src",
        desc: "Self-hosted record collection manager with Discogs pricing integration and MusicBrainz ingestion (Python stdlib)." }
    ]},
    { name: "Simulation & Terminal Graphics", items: [
      { name: "ascii_fluid · Rust", file: "ascii_fluid_rust",
        url: "https://github.com/allthemalware/ASCII_Fluid_Rust", badge: "src",
        desc: "Native desktop port of Jos Stam fluid simulation with vorticity confinement and 42 custom palettes (Rust)." },
      { name: "ascii_fluid · PC", file: "ascii_fluid_pc",
        url: "https://allthemalware.github.io/ascii_fluid_pc/", badge: "live",
        desc: "Interactive Navier-Stokes fluid simulation solver running in real-time ASCII (JS/Canvas)." },
      { name: "ascii-cam", file: "ascii-cam",
        url: "https://allthemalware.github.io/ascii-cam/", badge: "live",
        desc: "Client-side real-time ASCII video processor for webcams and screen captures with CRT shaders." },
      { name: "ascii_tube", file: "ascii_tube",
        url: "https://github.com/allthemalware/ascii_tube", badge: "src",
        desc: "Terminal video viewer streaming YouTube and local video in 240p ASCII (Python + FFmpeg)." }
    ]},
    { name: "Systems Utilities & Solvers", items: [
      { name: "Moshit", file: "moshit",
        url: "https://github.com/allthemalware/Moshit", badge: "src",
        desc: "Cross-platform video datamoshing engine and desktop GUI; zero-dependency pure Python + FFmpeg pipeline." },
      { name: "noiteyes", file: "noiteyes",
        url: "https://github.com/allthemalware/noiteyes", badge: "src",
        desc: "Independent cryptanalysis suite, frequency tools, and rotor solvers for Noita's Eye Messages cipher." },
      { name: "IA-Chunkup", file: "ia-chunkup",
        url: "https://github.com/allthemalware/IA-Chunkup", badge: "src",
        desc: "Resilient bulk uploader for archive.org with chunking around the 120s timeout in standard libs." },
      { name: "4kListnConvert", file: "4klistnconvert",
        url: "https://github.com/allthemalware/4kListnConvert", badge: "src",
        desc: "Automated video library conversion CLI/TUI with verification before replacement." },
      { name: "PsyBGGen", file: "psybggen",
        url: "https://github.com/allthemalware/PsyBGGen", badge: "wip",
        desc: "Random psychedelic procedural background generator." }
    ]},
    { name: "Offline & Tabletop Tools", items: [
      { name: "PF2e Toolbox", file: "pf2etoolbox",
        url: "https://github.com/allthemalware/pf2etoolbox", badge: "src",
        desc: "Unified single-origin distribution of 4 Pathfinder 2e tools — submodule-pinned dist, stdlib Node server, zero build step." },
      { name: "PF2e Primer", file: "pf2eprimer", sub: true,
        url: "https://allthemalware.github.io/pf2eprimer/", badge: "live",
        desc: "Interactive introduction to PF2e mechanics with live demos — offline, single-file." },
      { name: "PF2e Spellbook", file: "pf2espellcards", sub: true,
        url: "https://allthemalware.github.io/pf2espellcards/", badge: "live",
        desc: "Instant search and filter offline spell catalog in a self-contained HTML bundle." },
      { name: "PF2e Party Tracker", file: "pf2epartytracker", sub: true,
        url: "https://allthemalware.github.io/pf2epartytracker/", badge: "live",
        desc: "GM party dashboard for passive stats, secret checks, and exploration turns." },
      { name: "PF2e Subsystems", file: "pf2esubsystems", sub: true,
        url: "https://allthemalware.github.io/pf2esubsystems/", badge: "live",
        desc: "Victory Point subsystem tracker for chases, infiltrations, and influence encounters." }
    ]},
    { name: "Contact & Source", items: [
      { name: "Direct Email", file: "contact",
        url: "mailto:viru5@allthemalware.link", badge: "live",
        desc: "Engineering roles, project inquiries, and collaboration: viru5@allthemalware.link" },
      { name: "GitHub Profile", file: "github",
        url: "https://github.com/allthemalware", badge: "src",
        desc: "Open-source repositories, Wayland tools, and project source code." }
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
