# Gorecraft design studies

Open `mockups/index.html` for the comparison gallery, or serve the repository with
`python3 -m http.server 8000` and visit `http://localhost:8000/mockups/`.

- **A — Crimson Codex:** Gorecraft title artwork, a red-and-black palette and a
  searchable three-column archive.
- **B — Ashen Index:** four-tone greyscale, a pixel-rendered isometric specimen
  and a searchable field-manual index.
- **C — The Keep:** a cyan isometric chamber map with a selectable project
  inventory and a searchable full archive.

All three read the existing `../data.js`. Search, category filters and chamber
navigation run locally without dependencies. These pages preserve the original
studies. Crimson Codex and The Keep are implemented in `../v16-crimson.html` and
`../v17-keep.html`, with independent production assets in `../gorecraft/`, and are
included in the landing page’s 30-minute rotation.

## References and assets

The layouts take their visual cues from the Gorecraft project at
`/home/whyte/git/Trpt`: `art/source/Gorecraft.jpeg`,
`docs/mockups/mono/mono_facets.png`, and the four-tone terrain studies in
`docs/mockups/terrain/`.

`assets/gorecraft.jpg` is the existing title illustration, copied from
`build/art-choices/images/title_art.jpg`. The room illustrations are native
canvas artwork with pixels quantized to four exact colours. The cyan palette
comes from the Architect facet.

The IBM BIOS and VGA fonts are from VileR’s [Ultimate Oldschool PC Font Pack](https://int10h.org/oldschool-pc-fonts/),
copied unchanged from Gorecraft. Their CC BY-SA 4.0 licence is included at
`assets/Px437-LICENSE.txt`. Screenshots in `previews/` show each concept’s initial
desktop view; the pages themselves are responsive.
