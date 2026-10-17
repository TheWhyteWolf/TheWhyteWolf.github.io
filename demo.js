/* ─────────────────────────────────────────────────────────────
   maykstuff — demoscene & arcade attract-mode portfolio reel
   Cycles through the portfolio's retro visual eras (v2..v15)
   while showcasing browser-ready software via hybrid live iframes
   + 60fps procedural canvas/ASCII simulations + a native/CLI
   demoscene scroller blitz.
   Visuals only (completely silent).
   Launch via:
     - "▶ DEMO" button injected into every view
     - ?demo=1 URL query parameter
     - 120s arcade idle attract timer
   ───────────────────────────────────────────────────────────── */
(function(){
  "use strict";
  window.MAYK = window.MAYK || {};
  if (window.MAYK.demo) return;

  var ACT_DURATION = 5400;      // ms per act during auto-scroll
  var IDLE_TIMEOUT = 120000;    // 120s inactivity triggers attract mode
  var IDLE_WARN_MS = 2500;      // 2.5s countdown toast before idle launch

  var ACTS = [
    {
      id: "oblique",
      num: "01",
      title: "Oblique Strategies",
      cat: "WebApps · Interactive Deck",
      badge: "live",
      url: "https://thewhytewolf.github.io/Oblique/",
      iframeUrl: "https://thewhytewolf.github.io/Oblique/",
      skin: "skin-v2",
      skinName: "v2 · SunVox ASCII Frames",
      skinCode: "TUI/BOX-DRAW",
      desc: "Brian Eno & Peter Schmidt's deck (plus 43 original strategies) in a SunVox TUI frame with Conway's Game of Life."
    },
    {
      id: "minerva",
      num: "02",
      title: "MiNERVA FM",
      cat: "WebApps · Audio & Sound",
      badge: "live",
      url: "https://thewhytewolf.github.io/MiNERVA-FM-Local/",
      skin: "skin-v8",
      skinName: "v8 · Phosphor CRT / VT100",
      skinCode: "CRT/9600-8N1",
      desc: "Audio-reactive CRT chiptune player & 24/7 radio — SID, SPC, VGM & MOD with 56-column ASCII spectrum visualiser."
    },
    {
      id: "divine",
      num: "03",
      title: "Divine Geometry",
      cat: "WebApps · Rust + WebGPU",
      badge: "live",
      url: "https://thewhytewolf.github.io/divine-geometry/",
      skin: "skin-v14",
      skinName: "v14 · Tektronix 4014 Vector",
      skinCode: "TEK4014/XY-VEC",
      desc: "Compass-and-straightedge sacred geometry — every circle centred on a solved f64 intersection."
    },
    {
      id: "pf2e",
      num: "04",
      title: "PF2e Toolbox Suite",
      cat: "TTRPG Help · 4 Live WebApps",
      badge: "live",
      url: "https://thewhytewolf.github.io/pf2eprimer/",
      iframeUrl: "https://thewhytewolf.github.io/pf2eprimer/",
      skin: "skin-v6",
      skinName: "v6 · Borland Turbo Vision",
      skinCode: "CP437/TUI-IDE",
      desc: "Four offline-capable Pathfinder 2e webapps: Interactive Primer, Spellbook, GM Party Tracker & Victory Point Subsystems."
    },
    {
      id: "fluid",
      num: "05",
      title: "ascii_fluid · PC / Mobile / Rust",
      cat: "Ascii Art · Fluid Dynamics",
      badge: "live",
      url: "https://thewhytewolf.github.io/ascii_fluid_pc/",
      skin: "skin-v10",
      skinName: "v10 · Ceefax Teletext P400",
      skinCode: "CEEFAX/LVL-1.5",
      desc: "Real-time Navier-Stokes & vortex curl fluid simulator rendered live in ASCII across 42 palettes."
    },
    {
      id: "asciicam",
      num: "06",
      title: "ascii-cam",
      cat: "Ascii Art · Real-Time Shader",
      badge: "live",
      url: "https://thewhytewolf.github.io/ascii-cam/",
      skin: "skin-v12",
      skinName: "v12 · Amiga Workbench 1.3",
      skinCode: "WB1.3/4-COLOUR",
      desc: "100% client-side webcam, screen & video to ASCII art with Bayer dithering, terminal presets and CRT post-processing."
    },
    {
      id: "blitz",
      num: "07",
      title: "Native & CLI Archive Blitz",
      cat: "LifeBranch · Audio · Solvers · CLI",
      badge: "src",
      url: "https://github.com/TheWhyteWolf",
      skin: "skin-v5",
      skinName: "v5/v15 · BBS & Punch-Card Cracktro",
      skinCode: "ANSI/2400-BAUD",
      desc: "Demoscene scroller showcase of native Rust, Python & C tools: LifeBranch desktop, furnace-chipruns, noiteyes, hootrip & more."
    }
  ];

  var PF2E_TOOLS = [
    {
      name: "PF2e Primer",
      tag: "PILLAR 01 · COMBAT & 3-ACTION ECONOMY",
      url: "https://thewhytewolf.github.io/pf2eprimer/",
      actions: ["◆ Stride (25ft → Flanking)", "◆ Strike: +14 vs AC 22 → 28 [CRIT ×2]", "◆ Raise a Shield (+2 Circumstance AC)"],
      dcText: "Degree of Success: Beat DC by +10 ⇒ CRITICAL SUCCESS"
    },
    {
      name: "PF2e Spellbook",
      tag: "PILLAR 02 · TRADITIONS & SPELL SLOTS",
      url: "https://thewhytewolf.github.io/pf2espellcards/",
      actions: ["Rank 1: [■][■][■][□] · Magic Missile, Fear", "Rank 3: [■][■][□]    · Fireball (6d6), Haste", "Rank 5: [■][□]       · ⚡ Chain Lightning (8d12)"],
      dcText: "Tradition: ARCANE · Spell DC 27 · Focus Pool [◈][◈][◇]"
    },
    {
      name: "PF2e Party Tracker",
      tag: "PILLAR 03 · GM DASHBOARD & SECRET CHECKS",
      url: "https://thewhytewolf.github.io/pf2epartytracker/",
      actions: ["Valeros (Ftr 7) · HP 98/98 · AC 27 · [Defend]", "Kyra (Clr 7)    · HP 82/82 · AC 25 · [Search +17]", "Merisiel (Rog 7)· HP 74/74 · AC 26 · [Avoid Notice +19]"],
      dcText: "[SECRET ROLL] Recall Knowledge (Occultism +16) vs DC 23 ⇒ 25 SUCCESS"
    },
    {
      name: "PF2e Subsystems",
      tag: "PILLAR 04 · VICTORY POINT ENCOUNTERS",
      url: "https://thewhytewolf.github.io/pf2esubsystems/",
      actions: ["Chase Obstacle 4/5: Collapsed Clocktower Gears", "Athletics DC 24 (2 pts) or Acrobatics DC 22 (1 pt)", "Party VP: [■■■■■■■■□□] 8 / 10 VP — Threshold Reached!"],
      dcText: "Active Subsystem: CHASE / INFILTRATION / RESEARCH"
    }
  ];

  var OBLIQUE_CARDS = [
    "Honor thy error as a hidden intention.",
    "Use an old idea.",
    "What would your closest friend do?",
    "Turn it upside down.",
    "Repetition is a form of change.",
    "Take away the elements in order of apparent non-importance.",
    "Don't be frightened of cliches.",
    "Work at a different speed.",
    "Look closely at the most embarrassing details and amplify them.",
    "Disconnect from desire.",
    "Emphasize differences.",
    "Only one element of each kind."
  ];

  var MINERVA_TRACKS = [
    { sys: "Commodore 64 · MOS 6581 SID", game: "Monty on the Run (1985)", track: "01 - Main Theme (Rob Hubbard)", scheme: "c64", ch: "#" },
    { sys: "NEC PC-9801 · YM2608 OPNA", game: "Touhou 04: Lotus Land Story", track: "06 - Bad Apple!! (ZUN)", scheme: "minerva", ch: "*" },
    { sys: "Super Famicom · Sony SPC700", game: "Chrono Trigger (1995)", track: "44 - Corridors of Time (Mitsuda)", scheme: "pico8", ch: ":" },
    { sys: "Nintendo Game Boy · DMG-CPU", game: "Links Awakening (1993)", track: "12 - Tal Tal Heights", scheme: "gameboy", ch: "|" }
  ];

  var VIS_SCHEMES = {
    minerva: ["#2a0a00", "#7a2a00", "#ff7a00", "#ffc24d", "#fff3c0"],
    pico8:   ["#1d2b53", "#7e2553", "#ff004d", "#ffa300", "#fff1e8"],
    c64:     ["#352879", "#6c5eb5", "#6abfc6", "#b8c76f", "#ffffff"],
    gameboy: ["#0f380f", "#306230", "#8bac0f", "#9bbc0f"]
  };

  var NATIVE_BLITZ = [
    { name: "LifeBranch", cat: "Arch / niri / Rust", badge: "src", url: "https://github.com/TheWhyteWolf/LifeBranch",
      desc: "Conway's Game of Life niri desktop: lifewall, lifelock, lifegreet, lifenote, lifeshot & lifefiles." },
    { name: "furnace-chipruns", cat: "Audio / Furnace", badge: "src", url: "https://github.com/TheWhyteWolf/furnace-chipruns",
      desc: "Free WAV sample archive of 80+ emulated sound chips & 1,280+ instrument presets." },
    { name: "noiteyes", cat: "Cryptanalysis / C & Py", badge: "src", url: "https://github.com/TheWhyteWolf/noiteyes",
      desc: "Cryptanalysis workspace and solvers for Noita's unsolved Eye Messages cipher." },
    { name: "Sleeve-Note", cat: "Audio / Python", badge: "src", url: "https://github.com/TheWhyteWolf/Sleeve-Note",
      desc: "Vinyl collection manager: condition grading, pressings, and live market valuation." },
    { name: "hootrip", cat: "Audio / Rust", badge: "src", url: "https://github.com/TheWhyteWolf/hootrip",
      desc: "Batch-converts hoot emulator sets to S98/VGM register logs via emulated PC-88/PC-98 drivers." },
    { name: "MiNERVA-FM-Term", cat: "Audio / Rust TUI", badge: "src", url: "https://github.com/TheWhyteWolf/MiNERVA-FM-Term",
      desc: "Terminal music player for every retro video-game audio format." },
    { name: "ascii_tube", cat: "Ascii Art / Python", badge: "src", url: "https://github.com/TheWhyteWolf/ascii_tube",
      desc: "Terminal YouTube streaming in 240p color ASCII via FFmpeg." },
    { name: "IA-Chunkup", cat: "Standalone / Python", badge: "src", url: "https://github.com/TheWhyteWolf/IA-Chunkup",
      desc: "Resilient bulk uploader for archive.org that chunks around 120s read timeouts." },
    { name: "4kListnConvert", cat: "Standalone / TUI", badge: "src", url: "https://github.com/TheWhyteWolf/4kListnConvert",
      desc: "Scans video libraries, converts 4K to verified 1080p, and safely reclaims storage." },
    { name: "Moshit & PsyBGGen", cat: "Standalone / WIP", badge: "wip", url: "https://github.com/TheWhyteWolf/Moshit",
      desc: "FFmpeg + Python datamoshing studio & psychedelic background generator." }
  ];

  // State
  var isOpen = false;
  var isPaused = false;
  var isIdleLaunched = false;
  var actIdx = 0;
  var actStartMs = 0;
  var pausedElapsedMs = 0;
  var rafId = 0;
  var overlayEl = null;
  var canvasEl = null;
  var ctx2d = null;
  var asciiEl = null;
  var domStageEl = null;
  var iframeWrapEl = null;
  var iframeCache = {};
  var wipeEl = null;
  var pf2eSubIdx = 0;
  var lastSubSwitch = 0;

  // Idle timer state
  var lastInputTime = performance.now();
  var idleDismissedInTab = false;
  var idleCheckInterval = 0;
  var idleToastEl = null;

  function injectStyles(){
    if (document.getElementById("mayk-demo-styles")) return;
    var st = document.createElement("style");
    st.id = "mayk-demo-styles";
    st.textContent = [
      "/* ── Trigger buttons in host views ── */",
      ".mayk-demo-inline{ display:inline-flex; align-items:center; gap:.4em; cursor:pointer;",
      "  font-family:inherit; font-size:.74rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase;",
      "  padding:.22rem .62rem; border:1px solid currentColor; background:transparent; color:var(--glow,#a4c94b);",
      "  text-decoration:none; vertical-align:middle; transition:transform .15s,box-shadow .2s,background .2s; }",
      ".mayk-demo-inline:hover,.mayk-demo-inline:focus-visible{ background:rgba(164,201,75,.15); box-shadow:0 0 12px rgba(164,201,75,.4); outline:none; }",
      ".mayk-demo-inline .dot{ display:inline-block; width:.55em; height:.55em; border-radius:50%; background:currentColor; animation:mayk-pulse 1.1s steps(2,end) infinite; }",
      "@keyframes mayk-pulse{ 50%{ opacity:.2 } }",
      "",
      ".mayk-demo-dock{ position:fixed; right:14px; bottom:14px; z-index:9000; display:flex; align-items:center; gap:.5rem;",
      "  font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:.74rem; font-weight:700;",
      "  letter-spacing:.14em; text-transform:uppercase; padding:.48rem .85rem;",
      "  background:#121412; color:#a4c94b; border:1px solid #a4c94b;",
      "  box-shadow:0 4px 20px rgba(0,0,0,.75), 0 0 14px rgba(164,201,75,.22); cursor:pointer;",
      "  transition:transform .15s,box-shadow .2s,background .2s; user-select:none; }",
      ".mayk-demo-dock:hover,.mayk-demo-dock:focus-visible{ transform:translateY(-2px); background:#1a2016; box-shadow:0 6px 24px rgba(0,0,0,.85), 0 0 20px rgba(164,201,75,.5); outline:none; }",
      ".mayk-demo-dock .k{ opacity:.65; font-weight:400; font-size:.66rem; }",
      "",
      ".mayk-idle-toast{ position:fixed; left:50%; bottom:56px; transform:translateX(-50%); z-index:9001;",
      "  font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; font-size:.76rem; letter-spacing:.15em;",
      "  text-transform:uppercase; padding:.5rem 1rem; background:#0d0f0d; color:#a4c94b; border:1px solid #a4c94b;",
      "  box-shadow:0 0 24px rgba(164,201,75,.35); pointer-events:none; opacity:0; transition:opacity .2s; }",
      ".mayk-idle-toast.vis{ opacity:1; }",
      "",
      "/* ── Fullscreen Demoscene Overlay ── */",
      "#mayk-demo-overlay{ position:fixed; inset:0; z-index:99999; display:flex; flex-direction:column;",
      "  font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,'Courier New',monospace;",
      "  background:var(--d-bg,#101210); color:var(--d-fg,#7b8c5a); overflow:hidden; select:none;",
      "  transition:background .18s ease, color .18s ease; }",
      "#mayk-demo-overlay *{ box-sizing:border-box; }",
      "",
      "/* Era Skins */",
      "#mayk-demo-overlay.skin-v2{ --d-bg:#121412; --d-panel:#171a14; --d-fg:#7b8c5a; --d-glow:#a4c94b; --d-dim:#39412b; --d-border:#7b8c5a; }",
      "#mayk-demo-overlay.skin-v8{ --d-bg:#0b0e0b; --d-panel:#111611; --d-fg:#7b8c5a; --d-glow:#b8e254; --d-dim:#334026; --d-border:#596b3d; }",
      "#mayk-demo-overlay.skin-v14{ --d-bg:#020b06; --d-panel:#04140b; --d-fg:#00b862; --d-glow:#00ff88; --d-dim:#004d29; --d-border:#00d472; }",
      "#mayk-demo-overlay.skin-v6{ --d-bg:#001b33; --d-panel:#002b52; --d-fg:#b8d4e8; --d-glow:#ffe14d; --d-dim:#245785; --d-border:#66a3d2; }",
      "#mayk-demo-overlay.skin-v10{ --d-bg:#000000; --d-panel:#06060c; --d-fg:#00ffff; --d-glow:#ffff00; --d-dim:#aa00aa; --d-border:#00ff00;",
      "  font-family:'Bedstead',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; }",
      "#mayk-demo-overlay.skin-v12{ --d-bg:#0055aa; --d-panel:#003d7a; --d-fg:#ffffff; --d-glow:#ff8800; --d-dim:#002244; --d-border:#ffffff; }",
      "#mayk-demo-overlay.skin-v5{ --d-bg:#0c0a12; --d-panel:#141020; --d-fg:#9a8c6a; --d-glow:#c9b44b; --d-dim:#4a3f2b; --d-border:#a4c94b; }",
      "",
      "/* Scanline & CRT FX layer */",
      ".d-fx{ position:absolute; inset:0; pointer-events:none; z-index:40;",
      "  background:repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0 2px, rgba(0,0,0,.18) 2px 3px); }",
      "#mayk-demo-overlay.skin-v14 .d-fx{",
      "  background:linear-gradient(rgba(0,255,136,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,.07) 1px, transparent 1px);",
      "  background-size:48px 48px; }",
      "",
      "/* Era Wipe Transition */",
      ".d-wipe{ position:absolute; inset:0; z-index:55; pointer-events:none; opacity:0;",
      "  background:repeating-linear-gradient(to bottom, var(--d-glow) 0 6px, transparent 6px 14px, var(--d-fg) 14px 18px, #000 18px 26px);",
      "  transform:translateY(-100%); }",
      ".d-wipe.run{ animation:mayk-wipe .24s steps(6) forwards; }",
      "@keyframes mayk-wipe{ 0%{ opacity:.9; transform:translateY(-60%); } 50%{ opacity:.95; transform:translateY(0%); } 100%{ opacity:0; transform:translateY(80%); } }",
      "",
      "/* Top Arcade HUD */",
      ".d-top{ position:relative; z-index:30; display:flex; flex-direction:column; gap:.45rem;",
      "  padding:.65rem clamp(.8rem,2.5vw,1.6rem); background:var(--d-panel); border-bottom:2px solid var(--d-border); }",
      ".d-top-row{ display:flex; align-items:center; justify-content:space-between; gap:.8rem; flex-wrap:wrap; }",
      ".d-attract{ display:inline-flex; align-items:center; gap:.5rem; font-size:.78rem; font-weight:700; letter-spacing:.2em; color:var(--d-glow); text-transform:uppercase; }",
      ".d-attract .led{ width:8px; height:8px; background:var(--d-glow); box-shadow:0 0 8px var(--d-glow); animation:mayk-pulse .9s steps(2,end) infinite; }",
      ".d-skin-pill{ font-size:.72rem; letter-spacing:.14em; text-transform:uppercase; padding:.18rem .55rem;",
      "  border:1px solid var(--d-border); color:var(--d-fg); background:rgba(0,0,0,.3); }",
      ".d-skin-pill b{ color:var(--d-glow); }",
      "",
      "/* Segmented Timeline Bar */",
      ".d-segs{ display:grid; grid-template-columns:repeat(7,1fr); gap:.35rem; width:100%; }",
      ".d-seg{ position:relative; height:18px; border:1px solid var(--d-dim); background:rgba(0,0,0,.45);",
      "  cursor:pointer; overflow:hidden; display:flex; align-items:center; padding:0 .4rem; font-size:.63rem; letter-spacing:.08em; color:var(--d-fg); }",
      ".d-seg:hover{ border-color:var(--d-glow); }",
      ".d-seg.active{ border-color:var(--d-glow); color:var(--d-glow); font-weight:700; }",
      ".d-seg-fill{ position:absolute; left:0; top:0; bottom:0; width:0%; background:var(--d-glow); opacity:.26; pointer-events:none; }",
      ".d-seg-lbl{ position:relative; z-index:2; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }",
      "",
      "/* Main Stage */",
      ".d-stage{ position:relative; flex:1 1 auto; display:grid; grid-template-columns:1.15fr .85fr; gap:1rem;",
      "  padding:clamp(.75rem,2vw,1.4rem) clamp(.8rem,2.5vw,1.6rem); overflow:hidden; min-height:0; }",
      ".d-stage.single-col{ grid-template-columns:1fr; }",
      "@media (max-width:860px){ .d-stage{ grid-template-columns:1fr; grid-template-rows:1.1fr .9fr; } .d-seg-lbl span{ display:none; } }",
      "",
      "/* Framed Viewport Box */",
      ".d-box{ position:relative; border:2px solid var(--d-border); background:rgba(0,0,0,.55); display:flex; flex-direction:column;",
      "  overflow:hidden; min-height:0; box-shadow:inset 0 0 30px rgba(0,0,0,.6); }",
      "#mayk-demo-overlay.skin-v6 .d-box{ box-shadow:8px 8px 0 rgba(0,0,0,.65); border-style:double; border-width:3px; }",
      "#mayk-demo-overlay.skin-v12 .d-box{ border-color:#ffffff; box-shadow:4px 4px 0 #001122; }",
      ".d-box-hdr{ display:flex; align-items:center; justify-content:space-between; gap:.5rem;",
      "  padding:.38rem .75rem; background:var(--d-panel); border-bottom:1px solid var(--d-border);",
      "  font-size:.72rem; letter-spacing:.16em; text-transform:uppercase; color:var(--d-glow); font-weight:700; }",
      "#mayk-demo-overlay.skin-v12 .d-box-hdr{ background:#ffffff; color:#0055aa; }",
      ".d-box-body{ position:relative; flex:1 1 auto; overflow:hidden; display:flex; flex-direction:column; min-height:0; }",
      "",
      ".d-canvas{ width:100%; height:100%; display:block; }",
      ".d-ascii{ margin:0; padding:.6rem; width:100%; height:100%; overflow:hidden; white-space:pre;",
      "  font-size:clamp(9px,1.15vw,13px); line-height:1.15; color:var(--d-glow); user-select:none; }",
      "",
      "/* Live Iframe Container */",
      ".d-iframe-host{ position:absolute; inset:0; width:100%; height:100%; background:#0e100e; }",
      ".d-iframe-host iframe{ width:100%; height:100%; border:0; display:block; background:#121412; }",
      ".d-iframe-shield{ position:absolute; inset:0; z-index:5; display:flex; align-items:flex-end; justify-content:flex-end;",
      "  padding:.5rem; pointer-events:auto; background:linear-gradient(to top, rgba(0,0,0,.55) 0%, transparent 35%); }",
      "#mayk-demo-overlay.paused .d-iframe-shield{ pointer-events:none; opacity:.25; }",
      ".d-iframe-tag{ font-size:.66rem; letter-spacing:.12em; padding:.2rem .5rem; background:rgba(0,0,0,.8);",
      "  border:1px solid var(--d-glow); color:var(--d-glow); text-transform:uppercase; }",
      "",
      "/* Right/Info Telemetry Deck */",
      ".d-info{ display:flex; flex-direction:column; justify-content:space-between; padding:clamp(.8rem,2vw,1.3rem);",
      "  gap:.8rem; overflow-y:auto; }",
      ".d-cat{ font-size:.68rem; letter-spacing:.2em; text-transform:uppercase; color:var(--d-fg); opacity:.85; }",
      ".d-title{ margin:.2rem 0 .4rem; font-size:clamp(1.2rem,2.4vw,1.85rem); color:var(--d-glow);",
      "  letter-spacing:.06em; text-transform:uppercase; text-shadow:0 0 12px rgba(164,201,75,.3); }",
      ".d-desc{ margin:0 0 .8rem; font-size:.83rem; line-height:1.55; color:var(--d-fg); }",
      ".d-telemetry{ flex:1 1 auto; border:1px solid var(--d-dim); background:rgba(0,0,0,.4); padding:.75rem;",
      "  font-size:.76rem; line-height:1.55; overflow:hidden; display:flex; flex-direction:column; justify-content:center; }",
      ".d-cta-row{ display:flex; flex-wrap:wrap; gap:.55rem; align-items:center; }",
      "",
      "/* Bottom Control Deck */",
      ".d-bot{ position:relative; z-index:30; display:flex; align-items:center; justify-content:space-between;",
      "  gap:.6rem; flex-wrap:wrap; padding:.55rem clamp(.8rem,2.5vw,1.6rem);",
      "  background:var(--d-panel); border-top:2px solid var(--d-border); font-size:.74rem; }",
      ".d-ctrls{ display:flex; flex-wrap:wrap; gap:.45rem; align-items:center; }",
      ".d-btn{ font-family:inherit; font-size:.72rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase;",
      "  padding:.36rem .72rem; border:1px solid var(--d-border); background:rgba(0,0,0,.4); color:var(--d-fg);",
      "  cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; gap:.35rem; transition:all .15s; }",
      ".d-btn:hover,.d-btn:focus-visible{ border-color:var(--d-glow); color:var(--d-glow); background:rgba(255,255,255,.06); outline:none; }",
      ".d-btn.pri{ border-color:var(--d-glow); color:var(--d-bg); background:var(--d-glow); }",
      ".d-btn.pri:hover{ filter:brightness(1.12); }",
      ".d-keys-hint{ font-size:.68rem; opacity:.7; letter-spacing:.08em; }",
      "@media (max-width:640px){ .d-keys-hint{ display:none; } }",
      "",
      "/* Blitz Grid inside Act 7 */",
      ".d-blitz-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:.42rem; padding:.5rem; overflow-y:auto; }",
      ".d-blitz-card{ display:block; text-decoration:none; border:1px solid var(--d-dim); background:rgba(12,10,18,.64);",
      "  backdrop-filter:blur(1px); padding:.4rem .58rem; color:var(--d-fg); transition:border-color .15s, transform .15s, background .15s; }",
      ".d-blitz-card.hi,.d-blitz-card:hover{ border-color:var(--d-glow); background:rgba(20,16,32,.86); transform:translateY(-1px); box-shadow:0 0 12px rgba(201,180,75,.25); }",
      ".d-blitz-card b{ color:var(--d-glow); display:flex; justify-content:space-between; font-size:.73rem; margin-bottom:.15rem; }",
      ".d-blitz-card span{ display:block; font-size:.65rem; opacity:.8; line-height:1.3; }"
    ].join("\n");
    document.head.appendChild(st);
  }

  /* ── Inject Trigger Button into Any Host View (v2..v15 + index) ── */
  function injectHostTriggers(){
    injectStyles();
    if (document.getElementById("mayk-demo-dock")) return;

    // 1. Floating arcade dock button in bottom-right
    var dock = document.createElement("button");
    dock.id = "mayk-demo-dock";
    dock.className = "mayk-demo-dock";
    dock.type = "button";
    dock.setAttribute("aria-label", "Launch interactive portfolio demo reel");
    dock.innerHTML = '<span style="color:#a4c94b">▶</span> DEMO REEL <span class="k">[ATTRACT]</span>';
    dock.addEventListener("click", function(e){
      e.preventDefault();
      e.stopPropagation();
      startDemo(false);
    });
    document.body.appendChild(dock);

    // 2. Era-specific inline header button so it feels built into each design
    var inlineBtn = document.createElement("button");
    inlineBtn.type = "button";
    inlineBtn.className = "mayk-demo-inline";
    inlineBtn.innerHTML = '<span class="dot"></span>▶ DEMO';
    inlineBtn.addEventListener("click", function(e){
      e.preventDefault();
      e.stopPropagation();
      startDemo(false);
    });

    var target =
      document.querySelector(".menubar") ||         // v6 Turbo Vision
      document.querySelector(".tt-hdr") ||          // v10 Teletext
      document.querySelector(".screenbar") ||       // v12 Workbench
      document.querySelector(".scope-bar") ||       // v14 Oscilloscope
      document.querySelector(".printhead") ||       // v7 Greenbar
      document.querySelector(".rh") ||              // v11 Manpage
      document.querySelector(".status") ||          // v13 Zork / v8 CRT
      document.querySelector(".interp") ||          // v15 Punchcard
      document.querySelector(".prompt") ||          // v4 Directory
      document.querySelector(".subhead") ||         // v9 Teletype
      document.querySelector("header");             // v2, v5, index

    if (target) {
      if (target.classList.contains("screenbar")) {
        inlineBtn.style.cssText = "background:#ff8800;color:#002244;border-color:#002244;padding:.1rem .45rem;margin-left:.5rem;";
        var depth = target.querySelector(".depth");
        if (depth) target.insertBefore(inlineBtn, depth);
        else target.appendChild(inlineBtn);
      } else if (target.classList.contains("menubar")) {
        inlineBtn.style.cssText = "margin-left:auto;color:#ffe14d;border-color:#ffe14d;padding:.05rem .45rem;";
        target.appendChild(inlineBtn);
      } else if (target.tagName === "HEADER" && target.querySelector(".sub, .sysop")) {
        var sub = target.querySelector(".sub, .sysop");
        var wrap = document.createElement("div");
        wrap.style.marginTop = ".65rem";
        wrap.appendChild(inlineBtn);
        sub.parentNode.insertBefore(wrap, sub.nextSibling);
      } else {
        inlineBtn.style.marginLeft = ".75rem";
        target.appendChild(inlineBtn);
      }
    }

    // 3. Idle toast element
    idleToastEl = document.createElement("div");
    idleToastEl.className = "mayk-idle-toast";
    idleToastEl.textContent = "▶ ATTRACT MODE STARTING — MOVE OR PRESS ANY KEY TO CANCEL";
    document.body.appendChild(idleToastEl);
  }

  /* ── Build Overlay DOM ── */
  function buildOverlay(){
    if (overlayEl) return;
    overlayEl = document.createElement("div");
    overlayEl.id = "mayk-demo-overlay";
    overlayEl.className = ACTS[0].skin;
    overlayEl.setAttribute("role", "dialog");
    overlayEl.setAttribute("aria-modal", "true");
    overlayEl.setAttribute("aria-label", "maykstuff Demoscene Portfolio Reel");

    var segsHtml = ACTS.map(function(a, idx){
      return '<div class="d-seg" data-idx="'+idx+'" title="Jump to Act '+a.num+': '+a.title+'">'
        + '<div class="d-seg-fill"></div>'
        + '<div class="d-seg-lbl">'+a.num+' <span>· '+a.title+'</span></div>'
        + '</div>';
    }).join("");

    overlayEl.innerHTML = [
      '<div class="d-fx" aria-hidden="true"></div>',
      '<div class="d-wipe" id="mayk-d-wipe" aria-hidden="true"></div>',
      '<header class="d-top">',
      '  <div class="d-top-row">',
      '    <div class="d-attract"><span class="led"></span><span id="mayk-d-mode-lbl">ATTRACT MODE · DEMOSCENE REEL</span></div>',
      '    <div class="d-skin-pill">ERA SKIN: <b id="mayk-d-skin-lbl">v2 · ASCII Frames</b> <span id="mayk-d-code-lbl">[TUI]</span></div>',
      '  </div>',
      '  <div class="d-segs" id="mayk-d-segs">' + segsHtml + '</div>',
      '</header>',
      '<div class="d-stage" id="mayk-d-stage">',
      '  <div class="d-box" id="mayk-d-left">',
      '    <div class="d-box-hdr"><span id="mayk-d-vp-title">┤ LIVE VIEWPORT ├</span><span id="mayk-d-vp-meta">60 FPS · SYNC</span></div>',
      '    <div class="d-box-body" id="mayk-d-vp-body">',
      '      <canvas class="d-canvas" id="mayk-d-canvas"></canvas>',
      '      <pre class="d-ascii" id="mayk-d-ascii" style="display:none"></pre>',
      '      <div class="d-iframe-host" id="mayk-d-iframe-wrap" style="display:none"></div>',
      '      <div id="mayk-d-custom-stage" style="display:none;position:absolute;inset:0;overflow:hidden;"></div>',
      '    </div>',
      '  </div>',
      '  <div class="d-box" id="mayk-d-right">',
      '    <div class="d-box-hdr"><span id="mayk-d-info-hdr">┤ PROJECT TELEMETRY ├</span><span id="mayk-d-badge">[LIVE]</span></div>',
      '    <div class="d-box-body d-info">',
      '      <div>',
      '        <div class="d-cat" id="mayk-d-cat"></div>',
      '        <h2 class="d-title" id="mayk-d-title"></h2>',
      '        <p class="d-desc" id="mayk-d-desc"></p>',
      '      </div>',
      '      <div class="d-telemetry" id="mayk-d-telemetry"></div>',
      '      <div class="d-cta-row">',
      '        <a class="d-btn pri" id="mayk-d-open" href="#" target="_blank" rel="noopener">↗ LAUNCH LIVE APP</a>',
      '        <button type="button" class="d-btn" id="mayk-d-interact">⏸ PAUSE &amp; INTERACT</button>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>',
      '<footer class="d-bot">',
      '  <div class="d-ctrls">',
      '    <button type="button" class="d-btn" id="mayk-d-prev">◀ PREV</button>',
      '    <button type="button" class="d-btn" id="mayk-d-pause">⏸ PAUSE</button>',
      '    <button type="button" class="d-btn" id="mayk-d-next">NEXT ▶</button>',
      '  </div>',
      '  <div class="d-keys-hint">[←/→] SCENE &nbsp;·&nbsp; [1-7] JUMP &nbsp;·&nbsp; [SPACE] PAUSE &nbsp;·&nbsp; [ENTER] OPEN &nbsp;·&nbsp; [ESC] EXIT</div>',
      '  <div class="d-ctrls">',
      '    <button type="button" class="d-btn" id="mayk-d-exit">✕ EXIT DEMO [ESC]</button>',
      '  </div>',
      '</footer>'
    ].join("\n");

    document.body.appendChild(overlayEl);

    canvasEl = document.getElementById("mayk-d-canvas");
    ctx2d = canvasEl.getContext("2d");
    asciiEl = document.getElementById("mayk-d-ascii");
    domStageEl = document.getElementById("mayk-d-custom-stage");
    iframeWrapEl = document.getElementById("mayk-d-iframe-wrap");
    wipeEl = document.getElementById("mayk-d-wipe");

    // Wire segment clicks
    var segs = overlayEl.querySelectorAll(".d-seg");
    for (var i = 0; i < segs.length; i++) {
      segs[i].addEventListener("click", function(){
        var idx = parseInt(this.getAttribute("data-idx"), 10);
        isIdleLaunched = false;
        goToAct(idx);
      });
    }

    document.getElementById("mayk-d-prev").addEventListener("click", function(){
      isIdleLaunched = false;
      goToAct((actIdx - 1 + ACTS.length) % ACTS.length);
    });
    document.getElementById("mayk-d-next").addEventListener("click", function(){
      isIdleLaunched = false;
      goToAct((actIdx + 1) % ACTS.length);
    });
    document.getElementById("mayk-d-pause").addEventListener("click", function(){
      isIdleLaunched = false;
      togglePause();
    });
    document.getElementById("mayk-d-interact").addEventListener("click", function(){
      isIdleLaunched = false;
      togglePause(true);
    });
    document.getElementById("mayk-d-exit").addEventListener("click", function(){
      stopDemo(true);
    });
  }

  function ensureIframe(url){
    if (!iframeWrapEl) return;
    iframeWrapEl.innerHTML = "";
    var ifr = iframeCache[url];
    if (!ifr) {
      ifr = document.createElement("iframe");
      ifr.src = url;
      ifr.setAttribute("loading", "eager");
      ifr.setAttribute("title", "Live Software Preview");
      iframeCache[url] = ifr;
    }
    var shield = document.createElement("div");
    shield.className = "d-iframe-shield";
    shield.innerHTML = '<span class="d-iframe-tag">LIVE IFRAME · CLICK "PAUSE & INTERACT" TO USE INLINE</span>';
    iframeWrapEl.appendChild(ifr);
    iframeWrapEl.appendChild(shield);
  }

  function triggerWipe(){
    if (!wipeEl) return;
    wipeEl.classList.remove("run");
    void wipeEl.offsetWidth;
    wipeEl.classList.add("run");
  }

  function goToAct(idx, skipWipe){
    actIdx = ((idx % ACTS.length) + ACTS.length) % ACTS.length;
    actStartMs = performance.now();
    pausedElapsedMs = 0;
    pf2eSubIdx = 0;
    lastSubSwitch = actStartMs;

    var act = ACTS[actIdx];
    if (!skipWipe) triggerWipe();

    overlayEl.className = act.skin + (isPaused ? " paused" : "");
    document.getElementById("mayk-d-skin-lbl").textContent = act.skinName;
    document.getElementById("mayk-d-code-lbl").textContent = "[" + act.skinCode + "]";
    document.getElementById("mayk-d-cat").textContent = "ACT " + act.num + " / 07 · " + act.cat;
    document.getElementById("mayk-d-title").textContent = act.title;
    document.getElementById("mayk-d-desc").textContent = act.desc;
    document.getElementById("mayk-d-badge").textContent = "[" + act.badge.toUpperCase() + "]";
    document.getElementById("mayk-d-open").href = act.url;
    document.getElementById("mayk-d-vp-title").textContent = "┤ " + act.title.toUpperCase() + " ├";
    document.getElementById("mayk-d-vp-meta").textContent = act.skinCode;

    // Reset viewport layers
    canvasEl.style.display = "none";
    asciiEl.style.display = "none";
    iframeWrapEl.style.display = "none";
    domStageEl.style.display = "none";
    domStageEl.innerHTML = "";

    if (act.id === "oblique") {
      iframeWrapEl.style.display = "block";
      ensureIframe(act.iframeUrl);
    } else if (act.id === "pf2e") {
      iframeWrapEl.style.display = "block";
      ensureIframe(PF2E_TOOLS[0].url);
    } else if (act.id === "minerva" || act.id === "divine" || act.id === "asciicam") {
      canvasEl.style.display = "block";
      resizeCanvas();
    } else if (act.id === "fluid") {
      asciiEl.style.display = "block";
    } else if (act.id === "blitz") {
      canvasEl.style.display = "block";
      domStageEl.style.display = "block";
      resizeCanvas();
      buildBlitzDOM();
    }

    updateSegments(0);
    renderActFrame(actStartMs, 0, true);
  }

  function buildBlitzDOM(){
    var html = '<div class="d-blitz-grid">';
    for (var i = 0; i < NATIVE_BLITZ.length; i++) {
      var b = NATIVE_BLITZ[i];
      html += '<a class="d-blitz-card" data-bidx="'+i+'" href="'+b.url+'" target="_blank" rel="noopener">'
        + '<b><span>▸ '+b.name+'</span><span>['+b.badge+']</span></b>'
        + '<span>'+b.desc+'</span></a>';
    }
    html += '</div>';
    domStageEl.innerHTML = html;
  }

  function resizeCanvas(){
    if (!canvasEl || !canvasEl.parentElement) return;
    var r = canvasEl.parentElement.getBoundingClientRect();
    canvasEl.width = Math.max(320, Math.floor(r.width));
    canvasEl.height = Math.max(220, Math.floor(r.height));
  }

  function updateSegments(progress){
    if (!overlayEl) return;
    var segs = overlayEl.querySelectorAll(".d-seg");
    for (var i = 0; i < segs.length; i++) {
      var fill = segs[i].querySelector(".d-seg-fill");
      segs[i].classList.toggle("active", i === actIdx);
      if (i < actIdx) fill.style.width = "100%";
      else if (i > actIdx) fill.style.width = "0%";
      else fill.style.width = Math.min(100, Math.max(0, progress * 100)).toFixed(1) + "%";
    }
  }

  function togglePause(forcePause){
    var nextState = typeof forcePause === "boolean" ? forcePause : !isPaused;
    if (nextState === isPaused) return;
    isPaused = nextState;
    if (isPaused) {
      pausedElapsedMs = performance.now() - actStartMs;
    } else {
      actStartMs = performance.now() - pausedElapsedMs;
    }
    overlayEl.classList.toggle("paused", isPaused);
    var btn = document.getElementById("mayk-d-pause");
    var ibtn = document.getElementById("mayk-d-interact");
    if (btn) btn.textContent = isPaused ? "▶ RESUME" : "⏸ PAUSE";
    if (ibtn) ibtn.textContent = isPaused ? "▶ RESUME AUTO-SCROLL" : "⏸ PAUSE & INTERACT";
  }

  /* ── 60fps Scene Renderers ── */
  var lastObliqueStr = "";
  var lastMinervaIdx = -1;
  var lastDivineCircles = -1;
  var lastPf2eRendered = -1;
  var lastCamPreset = "";
  var lastBlitzIdx = -1;

  // Act 1: Oblique Strategies telemetry card dealer + glyph decode
  function renderOblique(now, elapsed, force){
    var cardIdx = Math.floor(elapsed / 1350) % OBLIQUE_CARDS.length;
    var cardPhase = (elapsed % 1350);
    var raw = OBLIQUE_CARDS[cardIdx];
    var glyphs = "#+*=%@&!?/\\~^";
    var decoded = "";
    for (var i = 0; i < raw.length; i++) {
      if (raw[i] === " " || cardPhase > 260 + i * 7) decoded += raw[i];
      else decoded += glyphs[(Math.floor(now / 24) + i * 11) % glyphs.length];
    }
    if (!force && decoded === lastObliqueStr) return;
    lastObliqueStr = decoded;
    var tel = document.getElementById("mayk-d-telemetry");
    if (tel) {
      tel.innerHTML = [
        '<div style="color:var(--d-fg);font-size:.7rem;margin-bottom:.4rem;">whyte@erminae:~/oblique$ ./Oblique_Strategies.py --draw</div>',
        '<div style="border:1px solid var(--d-glow);padding:.85rem;background:#121412;">',
        '  <div style="opacity:.5;font-size:.66rem;letter-spacing:.18em;">┤ CARD #' + (cardIdx + 101) + ' OF 156 · ENO / WHYTE DECK ├</div>',
        '  <div style="color:var(--d-glow);font-weight:700;font-size:1.02rem;margin:.55rem 0;min-height:2.6em;">“' + decoded + '”</div>',
        '  <div style="opacity:.55;font-size:.66rem;">[SPACE / CLICK] DRAW ANOTHER STRATEGY &nbsp;·&nbsp; LIVE IFRAME ACTIVE</div>',
        '</div>'
      ].join("");
    }
  }

  // Act 2: MiNERVA FM 56-column ASCII CRT spectrum + track metadata
  function renderMinerva(now, elapsed, force){
    var w = canvasEl.width, h = canvasEl.height;
    var tIdx = Math.floor(elapsed / 1350) % MINERVA_TRACKS.length;
    var trk = MINERVA_TRACKS[tIdx];
    var pal = VIS_SCHEMES[trk.scheme] || VIS_SCHEMES.minerva;

    ctx2d.fillStyle = "#060806";
    ctx2d.fillRect(0, 0, w, h);

    var pad = 16;
    ctx2d.font = "bold 12px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    ctx2d.fillStyle = "#5b9bff";
    ctx2d.fillText("[ NOW PLAYING ]", pad, 24);
    ctx2d.fillStyle = "#ffd633";
    ctx2d.fillText("[ON AIR · 24/7 STREAM]", pad + 130, 24);

    ctx2d.fillStyle = "#54ff7a";
    ctx2d.fillText("System:", pad, 44);
    ctx2d.fillStyle = "#cfe8cf";
    ctx2d.fillText(trk.sys, pad + 64, 44);

    ctx2d.fillStyle = "#54ff7a";
    ctx2d.fillText("Game:", pad, 62);
    ctx2d.fillStyle = "#cfe8cf";
    ctx2d.fillText(trk.game, pad + 64, 62);

    ctx2d.fillStyle = "#54ff7a";
    ctx2d.fillText("Track:", pad, 80);
    ctx2d.fillStyle = "#ffd633";
    ctx2d.fillText(trk.track, pad + 64, 80);

    var cols = 48;
    var topY = 98;
    var botY = h - 28;
    var areaH = Math.max(60, botY - topY);
    var cellH = 11;
    var rows = Math.floor(areaH / cellH);
    var colW = (w - pad * 2) / cols;

    for (var c = 0; c < cols; c++) {
      var norm = c / cols;
      var wave =
        0.42 * Math.abs(Math.sin(c * 0.22 - now * 0.009)) +
        0.33 * Math.abs(Math.cos(c * 0.11 + now * 0.014)) +
        0.25 * Math.abs(Math.sin(c * 0.45 - now * 0.021));
      var env = Math.pow(1 - norm * 0.55, 0.7) * wave;
      var barRows = Math.max(1, Math.min(rows, Math.round(env * rows)));
      var x = Math.round(pad + c * colW);
      for (var r = 0; r < barRows; r++) {
        var frac = r / Math.max(1, rows - 1);
        ctx2d.fillStyle = pal[Math.min(pal.length - 1, Math.floor(frac * pal.length))];
        ctx2d.fillText(trk.ch, x, botY - r * cellH);
      }
    }

    // Bottom ticker
    ctx2d.fillStyle = "#162016";
    ctx2d.fillRect(0, h - 22, w, 22);
    ctx2d.fillStyle = "#5cf7ff";
    var tickerTxt = " *** [MiNERVA RADIO] STREAMING SID, SPC, VGM, MOD & S98 LIVE *** AUDIO-REACTIVE CRT VISUALISER *** ";
    var shift = Math.floor(now / 45) % tickerTxt.length;
    var rolled = (tickerTxt + tickerTxt).slice(shift, shift + 80);
    ctx2d.fillText(rolled, pad, h - 7);

    if (force || tIdx !== lastMinervaIdx) {
      lastMinervaIdx = tIdx;
      var tel = document.getElementById("mayk-d-telemetry");
      if (tel) {
        tel.innerHTML = [
          '<div><b style="color:var(--d-glow)">ENGINE:</b> WebGL CRT Post-Process + WebAudio FFT (512 bins)</div>',
          '<div><b style="color:var(--d-glow)">SCHEME:</b> ' + trk.scheme.toUpperCase() + ' &nbsp;·&nbsp; <b style="color:var(--d-glow)">GLYPH:</b> \'' + trk.ch + '\'</div>',
          '<div><b style="color:var(--d-glow)">FORMATS:</b> .sid · .spc · .vgm · .vgz · .mod · .xm · .s98</div>',
          '<div style="margin-top:.35rem;opacity:.75;">Also available as self-hosted broadcast radio (MiNERVA-FM-Radio) and Rust TUI (MiNERVA-FM-Term).</div>'
        ].join("");
      }
    }
  }

  // Act 3: Divine Geometry compass-and-straightedge vector solver
  function renderDivine(now, elapsed, force){
    var w = canvasEl.width, h = canvasEl.height;
    ctx2d.fillStyle = "#020b06";
    ctx2d.fillRect(0, 0, w, h);

    var cx = w * 0.5, cy = h * 0.5;
    var R = Math.min(w, h) * 0.21;
    var progress = Math.min(1, elapsed / 4400);

    // Subtle crosshair graticule
    ctx2d.strokeStyle = "rgba(0, 255, 136, 0.14)";
    ctx2d.lineWidth = 1;
    ctx2d.beginPath();
    ctx2d.moveTo(0, cy); ctx2d.lineTo(w, cy);
    ctx2d.moveTo(cx, 0); ctx2d.lineTo(cx, h);
    ctx2d.stroke();

    // Centres: origin + 6 surrounding Seed of Life points + 6 outer Flower points
    var pts = [{ x: cx, y: cy }];
    for (var i = 0; i < 6; i++) {
      var a = (i * Math.PI) / 3 + now * 0.00025;
      pts.push({ x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R });
    }
    for (var j = 0; j < 6; j++) {
      var a2 = (j * Math.PI) / 3 + Math.PI / 6 + now * 0.00025;
      pts.push({ x: cx + Math.cos(a2) * R * Math.sqrt(3), y: cy + Math.sin(a2) * R * Math.sqrt(3) });
    }

    var totalCircles = pts.length;
    var activeCircles = Math.max(2, Math.ceil(progress * totalCircles));

    // Metatron straightedge chords
    ctx2d.strokeStyle = "rgba(0, 212, 114, 0.25)";
    ctx2d.lineWidth = 1;
    ctx2d.beginPath();
    for (var m = 0; m < Math.min(7, activeCircles); m++) {
      for (var n = m + 1; n < Math.min(7, activeCircles); n++) {
        ctx2d.moveTo(pts[m].x, pts[m].y);
        ctx2d.lineTo(pts[n].x, pts[n].y);
      }
    }
    ctx2d.stroke();

    // Draw compass circles
    for (var k = 0; k < activeCircles; k++) {
      var isLatest = (k === activeCircles - 1 && progress < 0.96);
      var sweep = isLatest ? ((elapsed % 340) / 340) * Math.PI * 2 : Math.PI * 2;
      ctx2d.strokeStyle = isLatest ? "#ffffff" : "#00ff88";
      ctx2d.lineWidth = isLatest ? 2 : 1.35;
      ctx2d.beginPath();
      ctx2d.arc(pts[k].x, pts[k].y, R, 0, sweep);
      ctx2d.stroke();
    }

    // Highlight solved intersection nodes
    var solvedCount = activeCircles * 6;
    for (var p = 0; p < activeCircles; p++) {
      ctx2d.fillStyle = "#00ff88";
      ctx2d.beginPath();
      ctx2d.arc(pts[p].x, pts[p].y, 3.2, 0, Math.PI * 2);
      ctx2d.fill();
    }

    ctx2d.fillStyle = "#00ff88";
    ctx2d.font = "11px ui-monospace, monospace";
    ctx2d.fillText("TEK 4014 VECTOR SOLVER · CIRCLES: " + activeCircles + " · INTERSECTIONS: " + solvedCount, 14, h - 12);

    if (force || activeCircles !== lastDivineCircles) {
      lastDivineCircles = activeCircles;
      var tel = document.getElementById("mayk-d-telemetry");
      if (tel) {
        tel.innerHTML = [
          '<div><b style="color:var(--d-glow)">SOLVER:</b> Analytic Circle-Circle &amp; Line-Circle f64 Engine</div>',
          '<div><b style="color:var(--d-glow)">ACTIVE NODES:</b> ' + solvedCount + ' exact intersections &nbsp;·&nbsp; 0 float drift</div>',
          '<div><b style="color:var(--d-glow)">BACKEND:</b> Rust + WebGPU / Canvas2D Vector Pipeline</div>',
          '<div style="margin-top:.35rem;opacity:.8;">Every new compass arc snaps strictly to previously solved geometric intersections.</div>'
        ].join("");
      }
    }
  }

  // Act 4: PF2e Toolbox 4-app cycling IDE deck
  function renderPF2e(now, elapsed, force){
    var idx = Math.floor(elapsed / 1300) % PF2E_TOOLS.length;
    if (idx !== pf2eSubIdx && now - lastSubSwitch > 1100) {
      pf2eSubIdx = idx;
      lastSubSwitch = now;
    }
    if (!force && pf2eSubIdx === lastPf2eRendered) return;
    lastPf2eRendered = pf2eSubIdx;

    var tool = PF2E_TOOLS[pf2eSubIdx];
    var tel = document.getElementById("mayk-d-telemetry");
    if (!tel) return;

    var tabsHtml = PF2E_TOOLS.map(function(t, i){
      var hi = i === pf2eSubIdx;
      return '<button type="button" data-pfidx="'+i+'" style="cursor:pointer;font-family:inherit;font-size:.66rem;padding:.2rem .45rem;border:1px solid '+(hi?'#ffe14d':'#245785')+';background:'+(hi?'#ffe14d':'#001b33')+';color:'+(hi?'#001b33':'#b8d4e8')+';font-weight:700;">'+(i+1)+':'+t.name.replace('PF2e ','')+'</button>';
    }).join(" ");

    var rowsHtml = tool.actions.map(function(line){
      return '<div style="padding:.22rem .4rem;border-left:2px solid #ffe14d;margin:.24rem 0;background:rgba(0,0,0,.35);">' + line + '</div>';
    }).join("");

    tel.innerHTML = [
      '<div style="display:flex;gap:.3rem;flex-wrap:wrap;margin-bottom:.45rem;">' + tabsHtml + '</div>',
      '<div style="color:#ffe14d;font-weight:700;font-size:.73rem;letter-spacing:.08em;">' + tool.tag + '</div>',
      rowsHtml,
      '<div style="margin-top:.35rem;font-size:.7rem;color:#66ff99;">' + tool.dcText + '</div>'
    ].join("");

    var openBtn = document.getElementById("mayk-d-open");
    if (openBtn) openBtn.href = tool.url;

    var tabBtns = tel.querySelectorAll("button[data-pfidx]");
    for (var b = 0; b < tabBtns.length; b++) {
      tabBtns[b].onclick = function(e){
        e.stopPropagation();
        var chosen = parseInt(this.getAttribute("data-pfidx"), 10);
        pf2eSubIdx = chosen;
        lastSubSwitch = performance.now() + 5000;
        ensureIframe(PF2E_TOOLS[chosen].url);
        renderPF2e(performance.now(), 0, true);
      };
    }
  }

  // Act 5: ascii_fluid 60fps vortex advection simulator
  var fluidRamp = " .:-=+*#%@";
  function renderFluid(now, elapsed, force){
    var box = asciiEl.parentElement;
    var bw = box ? box.clientWidth : 640;
    var bh = box ? box.clientHeight : 420;
    var cols = Math.max(48, Math.min(115, Math.floor((bw - 20) / 7.6)));
    var rows = Math.max(18, Math.min(44, Math.floor((bh - 34) / 14.5)));
    var t = now * 0.0024;
    var c1x = 0.5 + 0.28 * Math.cos(t * 1.3), c1y = 0.5 + 0.25 * Math.sin(t * 1.7);
    var c2x = 0.5 - 0.28 * Math.cos(t * 1.1), c2y = 0.5 - 0.22 * Math.sin(t * 1.4);

    var out = "";
    for (var y = 0; y < rows; y++) {
      var ny = y / rows;
      var line = "";
      for (var x = 0; x < cols; x++) {
        var nx = x / cols;
        var dx1 = nx - c1x, dy1 = (ny - c1y) * 1.1;
        var dx2 = nx - c2x, dy2 = (ny - c2y) * 1.1;
        var d1 = Math.sqrt(dx1 * dx1 + dy1 * dy1) + 0.001;
        var d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2) + 0.001;
        var ang1 = Math.atan2(dy1, dx1) + 2.4 / (d1 + 0.18) - t * 2.2;
        var ang2 = Math.atan2(dy2, dx2) - 2.4 / (d2 + 0.18) + t * 1.9;
        var v =
          Math.sin(ang1 * 2 + d1 * 14) * Math.exp(-d1 * 2.2) +
          Math.cos(ang2 * 2 - d2 * 14) * Math.exp(-d2 * 2.2);
        var norm = Math.max(0, Math.min(0.999, (v + 1.1) / 2.2));
        var ci = Math.floor(norm * fluidRamp.length);
        line += fluidRamp.charAt(ci);
      }
      out += line + "\n";
    }
    var pals = ["#ffff00", "#00ffff", "#00ff00", "#ff77ff"];
    var pIdx = Math.floor(elapsed / 1300) % pals.length;
    asciiEl.style.color = pals[pIdx];
    asciiEl.textContent = "P400 MAYKFAX · ASCII_FLUID VORTEX SOLVER · PALETTE 0" + (pIdx + 1) + "/42\n" + out;

    if (force) {
      var tel = document.getElementById("mayk-d-telemetry");
      if (tel) {
        tel.innerHTML = [
          '<div><b style="color:var(--d-glow)">SOLVER:</b> Navier-Stokes Velocity Advection + Vorticity Curl</div>',
          '<div><b style="color:var(--d-glow)">EDITIONS:</b> Browser PC · Touch Mobile · Native Rust (42 Palettes)</div>',
          '<div><b style="color:var(--d-glow)">MODES:</b> 9 Brushes · Autopilot Emitters · Custom Glyph Ramps</div>'
        ].join("");
      }
    }
  }

  // Act 6: ascii-cam 3D rotating torus-knot ASCII dither shader
  var camRamp = " .,:;i1tfLCG08@";
  function renderAsciiCam(now, elapsed, force){
    var w = canvasEl.width, h = canvasEl.height;
    var presets = [
      { name: "VT220 PHOSPHOR", bg: "#061008", fg: "#4dff88", hi: "#c8ffda" },
      { name: "AMBER P3 CRT",   bg: "#120b02", fg: "#ff9d1a", hi: "#ffe49e" },
      { name: "WORKBENCH 1.3",  bg: "#002244", fg: "#ff8800", hi: "#ffffff" }
    ];
    var p = presets[Math.floor(elapsed / 1700) % presets.length];

    ctx2d.fillStyle = p.bg;
    ctx2d.fillRect(0, 0, w, h);

    var cellW = 9, cellH = 13;
    var cols = Math.floor(w / cellW), rows = Math.floor(h / cellH);
    var t = now * 0.0022;
    ctx2d.font = "bold 12px ui-monospace, monospace";

    for (var r = 1; r < rows - 1; r++) {
      var ny = (r / rows) * 2 - 1;
      for (var c = 1; c < cols - 1; c++) {
        var nx = ((c / cols) * 2 - 1) * (w / Math.max(1, h)) * 0.75;
        var rad = Math.sqrt(nx * nx + ny * ny);
        var ang = Math.atan2(ny, nx);
        // Synthetic 3D torus-knot + harmonic rings luminance field
        var ring1 = Math.exp(-Math.pow(rad - (0.48 + 0.14 * Math.sin(3 * ang + t * 2)), 2) * 38);
        var ring2 = Math.exp(-Math.pow(rad - (0.28 + 0.08 * Math.cos(2 * ang - t * 3)), 2) * 45);
        var bayer = ((c & 1) * 0.06 + (r & 1) * 0.06) - 0.06;
        var lum = Math.max(0, Math.min(0.999, ring1 + ring2 * 0.85 + bayer));
        if (lum > 0.12) {
          var gi = Math.floor(lum * camRamp.length);
          ctx2d.fillStyle = lum > 0.72 ? p.hi : p.fg;
          ctx2d.fillText(camRamp.charAt(gi), c * cellW, r * cellH);
        }
      }
    }

    // REC HUD
    ctx2d.fillStyle = "#ff3333";
    ctx2d.fillText("● REC", 14, 20);
    ctx2d.fillStyle = p.hi;
    ctx2d.fillText("PRESET: " + p.name + " · BAYER DITHER · 🔒 100% CLIENT-SIDE", 64, 20);

    if (force || p.name !== lastCamPreset) {
      lastCamPreset = p.name;
      var tel = document.getElementById("mayk-d-telemetry");
      if (tel) {
        tel.innerHTML = [
          '<div><b style="color:var(--d-glow)">SOURCES:</b> Live Webcam · Screen Share · Local Video File</div>',
          '<div><b style="color:var(--d-glow)">ACTIVE PRESET:</b> ' + p.name + ' (Bayer 4×4 Dither + CRT Glass)</div>',
          '<div><b style="color:var(--d-glow)">CAPTURE:</b> Instant PNG Snapshot · Raw ASCII Copy · WebM Recorder</div>'
        ].join("");
      }
    }
  }

  // Act 7: Demoscene Starfield + Heighway Dragon Curve Fractal + Sine Scroller + Native/CLI Blitz
  var stars = [];
  for (var s = 0; s < 70; s++) {
    stars.push({ x: (Math.random() * 2 - 1), y: (Math.random() * 2 - 1), z: Math.random() });
  }

  // Precompute Order-11 Heighway Dragon Curve (2048 segments) via bitwise paper-folding sequence
  var DRAGON_ORDER = 11;
  var DRAGON_PTS = (function(){
    var n = 1 << DRAGON_ORDER;
    var pts = [{ x: 0, y: 0 }];
    var x = 0, y = 0, dir = 0;
    var dx = [1, 0, -1, 0], dy = [0, 1, 0, -1];
    var minX = 0, maxX = 0, minY = 0, maxY = 0;
    for (var i = 1; i <= n; i++) {
      x += dx[dir];
      y += dy[dir];
      pts.push({ x: x, y: y });
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      var lowbit = i & -i;
      var turnLeft = (((i / lowbit) >> 1) & 1) === 0;
      dir = (dir + (turnLeft ? 1 : 3)) & 3;
    }
    var spanX = Math.max(1, maxX - minX);
    var spanY = Math.max(1, maxY - minY);
    for (var k = 0; k < pts.length; k++) {
      pts[k].nx = (pts[k].x - minX) / spanX;
      pts[k].ny = (pts[k].y - minY) / spanY;
    }
    return pts;
  })();

  var scrollerMsg = "   *** MAYKSTUFF · THE ARCHIVE OF WHYTE ERMINAE · LIFEBRANCH NIRI DESKTOP · FURNACE CHIPRUNS · NOITEYES CIPHER SOLVER · SLEEVE-NOTE · HOOTRIP · ASCII_TUBE ***   ";
  function renderBlitz(now, elapsed, force){
    var w = canvasEl.width, h = canvasEl.height;
    ctx2d.fillStyle = "#08060d";
    ctx2d.fillRect(0, 0, w, h);

    // 3D Starfield
    for (var i = 0; i < stars.length; i++) {
      var st = stars[i];
      st.z -= 0.008;
      if (st.z <= 0.05) st.z = 1;
      var sx = (st.x / st.z) * (w * 0.45) + w * 0.5;
      var sy = (st.y / st.z) * (h * 0.45) + h * 0.5;
      if (sx > 0 && sx < w && sy > 0 && sy < h) {
        ctx2d.fillStyle = st.z < 0.4 ? "#ffffff" : "#a4c94b";
        ctx2d.fillRect(sx, sy, st.z < 0.35 ? 3 : 2, st.z < 0.35 ? 3 : 2);
      }
    }

    // Mathematical Dragon Curve Fractal (L-System: FX -> FX+YF+, FY -> -FX-Y)
    var padX = w * 0.06;
    var drawW = w * 0.88;
    var topY = h * 0.14;
    var drawH = h * 0.70;

    // Subtle polar / Cartesian axis crosshairs for the fractal locus
    ctx2d.strokeStyle = "rgba(164, 201, 75, 0.11)";
    ctx2d.lineWidth = 1;
    ctx2d.beginPath();
    ctx2d.moveTo(0, topY + drawH * 0.62);
    ctx2d.lineTo(w, topY + drawH * 0.62);
    ctx2d.moveTo(w * 0.5, 0);
    ctx2d.lineTo(w * 0.5, h - 38);
    ctx2d.stroke();

    // Progressive generation cycle across the act (loops smoothly if paused/extended)
    var cycleProgress = ((elapsed + 450) % 4600) / 3800;
    if (cycleProgress > 1) cycleProgress = 1;
    var totalSegs = DRAGON_PTS.length - 1;
    var activeSegs = Math.max(32, Math.floor(cycleProgress * totalSegs));
    var currentOrder = Math.max(1, Math.min(DRAGON_ORDER, Math.ceil(Math.log2(activeSegs))));

    // Twin conjugate ghost dragon (180-degree rotated self-similar tiling partner in upper field)
    ctx2d.strokeStyle = "rgba(164, 201, 75, 0.28)";
    ctx2d.lineWidth = 1.1;
    ctx2d.beginPath();
    for (var g = 0; g <= activeSegs; g++) {
      var gp = DRAGON_PTS[g];
      var gx = padX + gp.nx * drawW;
      var gy = topY + gp.ny * drawH;
      if (g === 0) ctx2d.moveTo(gx, gy);
      else ctx2d.lineTo(gx, gy);
    }
    ctx2d.stroke();

    // Primary Dragon Curve rendered in color-ramped octaves across the open lower-center stage
    var palette = ["#596b3d", "#7b8c5a", "#a4c94b", "#c9b44b", "#ffd633", "#ff9d1a", "#5cf7ff"];
    var batchSize = Math.max(16, Math.floor(activeSegs / palette.length));
    for (var b = 0; b < palette.length; b++) {
      var sStart = b * batchSize;
      if (sStart >= activeSegs) break;
      var sEnd = (b === palette.length - 1) ? activeSegs : Math.min(activeSegs, (b + 1) * batchSize);
      ctx2d.strokeStyle = palette[b];
      ctx2d.lineWidth = (b >= palette.length - 2) ? 1.95 : 1.45;
      ctx2d.beginPath();
      for (var k = sStart; k <= sEnd; k++) {
        var pt = DRAGON_PTS[k];
        var px = padX + (1 - pt.nx) * drawW;
        var py = topY + (1 - pt.ny) * drawH;
        if (k === sStart) ctx2d.moveTo(px, py);
        else ctx2d.lineTo(px, py);
      }
      ctx2d.stroke();
    }

    // Glowing active plotter head & hot trailing vector segments
    var headPt = DRAGON_PTS[activeSegs];
    var hx = padX + (1 - headPt.nx) * drawW;
    var hy = topY + (1 - headPt.ny) * drawH;
    var trailStart = Math.max(0, activeSegs - 56);
    ctx2d.strokeStyle = "#ffffff";
    ctx2d.lineWidth = 2.2;
    ctx2d.beginPath();
    for (var t = trailStart; t <= activeSegs; t++) {
      var tp = DRAGON_PTS[t];
      var tx = padX + (1 - tp.nx) * drawW;
      var ty = topY + (1 - tp.ny) * drawH;
      if (t === trailStart) ctx2d.moveTo(tx, ty);
      else ctx2d.lineTo(tx, ty);
    }
    ctx2d.stroke();

    ctx2d.fillStyle = "#ffffff";
    ctx2d.beginPath();
    ctx2d.arc(hx, hy, 3.5, 0, Math.PI * 2);
    ctx2d.fill();

    // Mathematical HUD readout above the sine scroller
    ctx2d.fillStyle = "#c9b44b";
    ctx2d.font = "11px ui-monospace, monospace";
    ctx2d.fillText(
      "HEIGHWAY DRAGON L-SYSTEM [FX→FX+YF+ · FY→-FX-Y] · ORDER n=" + currentOrder + "/" + DRAGON_ORDER + " · VECTORS: " + activeSegs + "/" + totalSegs,
      14,
      h - 44
    );

    // Classic Demoscene Sine-Wave Character Scroller along the bottom
    ctx2d.font = "bold 15px ui-monospace, monospace";
    var charStep = 10;
    var scrollPx = now * 0.09;
    var startChar = Math.floor(scrollPx / charStep);
    var offsetPx = -(scrollPx % charStep);
    var visibleChars = Math.ceil(w / charStep) + 2;
    for (var sc = 0; sc < visibleChars; sc++) {
      var ch = scrollerMsg.charAt((startChar + sc) % scrollerMsg.length);
      var cx = offsetPx + sc * charStep;
      var cy = h - 20 + Math.sin(now * 0.006 + (startChar + sc) * 0.28) * 9;
      ctx2d.fillStyle = (startChar + sc) % 2 === 0 ? "#ffd633" : "#a4c94b";
      ctx2d.fillText(ch, cx, cy);
    }

    // Highlight active card in the Blitz DOM grid
    var hiIdx = Math.floor(elapsed / 520) % NATIVE_BLITZ.length;
    if (force || hiIdx !== lastBlitzIdx) {
      lastBlitzIdx = hiIdx;
      var cards = domStageEl.querySelectorAll(".d-blitz-card");
      for (var c = 0; c < cards.length; c++) {
        cards[c].classList.toggle("hi", c === hiIdx);
      }
      var cur = NATIVE_BLITZ[hiIdx];
      var tel = document.getElementById("mayk-d-telemetry");
      if (tel && cur) {
        tel.innerHTML = [
          '<div style="color:var(--d-glow);font-weight:700;">SPOTLIGHT [' + (hiIdx + 1) + '/' + NATIVE_BLITZ.length + ']: ' + cur.name + ' (' + cur.cat + ')</div>',
          '<div style="margin:.35rem 0;">' + cur.desc + '</div>',
          '<div style="opacity:.8;font-size:.68rem;border-top:1px solid var(--d-dim);padding-top:.35rem;margin-top:.25rem;"><b>STAGE FRACTAL:</b> Twin Heighway Dragon Curve (D₁₁ · 2¹¹ = 2,048 orthogonal folds · Hausdorff dim D = 2).</div>'
        ].join("");
      }
    }
  }

  function renderActFrame(now, elapsed, force){
    var act = ACTS[actIdx];
    if (act.id === "oblique") renderOblique(now, elapsed, force);
    else if (act.id === "minerva") renderMinerva(now, elapsed, force);
    else if (act.id === "divine") renderDivine(now, elapsed, force);
    else if (act.id === "pf2e") renderPF2e(now, elapsed, force);
    else if (act.id === "fluid") renderFluid(now, elapsed, force);
    else if (act.id === "asciicam") renderAsciiCam(now, elapsed, force);
    else if (act.id === "blitz") renderBlitz(now, elapsed, force);
  }

  /* ── Main Animation Loop ── */
  function loop(now){
    if (!isOpen) return;
    var elapsed = isPaused ? pausedElapsedMs : (now - actStartMs);

    if (!isPaused && elapsed >= ACT_DURATION) {
      goToAct((actIdx + 1) % ACTS.length);
      elapsed = 0;
    }

    updateSegments(elapsed / ACT_DURATION);
    renderActFrame(now, elapsed, false);

    rafId = requestAnimationFrame(loop);
  }

  /* ── Start / Stop Public API ── */
  function startDemo(fromIdle){
    injectStyles();
    buildOverlay();
    if (idleToastEl) idleToastEl.classList.remove("vis");
    isOpen = true;
    isPaused = false;
    isIdleLaunched = !!fromIdle;
    document.documentElement.style.overflow = "hidden";
    overlayEl.style.display = "flex";
    document.getElementById("mayk-d-mode-lbl").textContent =
      isIdleLaunched ? "ATTRACT MODE (IDLE AUTO-RUN · MOVE/ESC TO EXIT)" : "DEMOSCENE PORTFOLIO REEL · INTERACTIVE";

    goToAct(0, true);
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(loop);
  }

  function stopDemo(userDismissed){
    if (!isOpen) return;
    isOpen = false;
    cancelAnimationFrame(rafId);
    document.documentElement.style.overflow = "";
    if (overlayEl) overlayEl.style.display = "none";
    if (userDismissed) idleDismissedInTab = true;
    lastInputTime = performance.now();
  }

  /* ── Global Keyboard & Idle Attract Listeners ── */
  function onKeyDown(e){
    lastInputTime = performance.now();
    if (idleToastEl) idleToastEl.classList.remove("vis");

    if (!isOpen) return;
    if (e.key === "Escape") {
      e.preventDefault();
      stopDemo(true);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      isIdleLaunched = false;
      goToAct((actIdx + 1) % ACTS.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      isIdleLaunched = false;
      goToAct((actIdx - 1 + ACTS.length) % ACTS.length);
    } else if (e.key === " ") {
      e.preventDefault();
      isIdleLaunched = false;
      togglePause();
    } else if (e.key === "Enter") {
      var openLink = document.getElementById("mayk-d-open");
      if (openLink && openLink.href) window.open(openLink.href, "_blank", "noopener");
    } else if (e.key >= "1" && e.key <= "7") {
      isIdleLaunched = false;
      goToAct(parseInt(e.key, 10) - 1);
    }
  }

  function onUserActivity(){
    lastInputTime = performance.now();
    if (idleToastEl) idleToastEl.classList.remove("vis");
    // If attract mode auto-started from inactivity, any mouse move exits immediately like an arcade cabinet
    if (isOpen && isIdleLaunched) {
      stopDemo(false);
    }
  }

  function checkIdle(){
    if (isOpen || idleDismissedInTab || document.hidden) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var idleMs = performance.now() - lastInputTime;
    if (idleMs >= IDLE_TIMEOUT) {
      startDemo(true);
    } else if (idleMs >= IDLE_TIMEOUT - IDLE_WARN_MS) {
      if (idleToastEl) idleToastEl.classList.add("vis");
    }
  }

  function init(){
    injectHostTriggers();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", function(){ if (isOpen) resizeCanvas(); });
    ["mousemove", "mousedown", "touchstart", "wheel", "scroll"].forEach(function(ev){
      window.addEventListener(ev, onUserActivity, { passive: true });
    });
    if (!idleCheckInterval) {
      idleCheckInterval = setInterval(checkIdle, 500);
    }

    // Auto-start if ?demo=1 is present in URL
    if (/(?:^\?|&)demo=1(?:&|$)/.test(location.search)) {
      setTimeout(function(){ startDemo(false); }, 60);
    }
  }

  window.MAYK.demo = {
    start: function(){ startDemo(false); },
    stop: function(){ stopDemo(true); },
    next: function(){ if (!isOpen) startDemo(false); else goToAct((actIdx + 1) % ACTS.length); },
    prev: function(){ if (!isOpen) startDemo(false); else goToAct((actIdx - 1 + ACTS.length) % ACTS.length); },
    goTo: function(i){ if (!isOpen) startDemo(false); goToAct(i); },
    pause: function(){ if (isOpen) togglePause(true); },
    resume: function(){ if (isOpen) togglePause(false); },
    isOpen: function(){ return isOpen; }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
