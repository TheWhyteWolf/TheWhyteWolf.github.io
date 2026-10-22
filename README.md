# allthemalware.github.io

The project archive of Whyte Erminae. Every view reads its projects from
`data.js`; the site runs directly on GitHub Pages without a build step.

The landing page cycles through 15 designs, advancing every 30 minutes at
`:00` and `:30` UTC. The complete cycle lasts 7½ hours. A view already open
stays in place; the current interval is selected when visiting or reloading
`index.html`.

- `?i=0` through `?i=14` preview a specific design.
- `?i=13` selects [Crimson Codex](v16-crimson.html).
- `?i=14` selects [The Keep](v17-keep.html).
- `?o=1` previews the next half-hour interval; `?o=-1` previews the previous one.
- `?intro=1` replays a design’s intro; `?demo=1` opens the demo reel.

Crimson and The Keep share their styles, renderer, artwork and licensed pixel
fonts in `gorecraft/`. Their original design studies remain in `mockups/`.

For a local preview, run `python3 -m http.server 8000` from this directory.
Run the rotation checks with `node --test tests/rotation.test.cjs`.
