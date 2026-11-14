# Loading and streaming plan

Recorded 11 October 2026. The project is meant to grow from the Lorong 11 study to the whole of Geylang. This note records how the scene loads today, the quick pass already made, and the plan for streaming the map in tiles, including what other projects need to build on the map.

## Why the current approach will not scale

Every building is built in the browser when the page opens. That works for the current study area of about 230 × 250 m and 160 buildings. It will not work for Lorong 1 to Lorong 42, which covers roughly 30 times the area. At today's density that means about 4,500 buildings and 650,000 scene objects, or several minutes of building time on a phone.

Some costs also grow faster than the map does:

- `canWalk` tests every footprint three times a frame.
- `nearest` scans every road segment for every building it places.
- Merging objects for drawing slowed down with the square of the object count, until the quick pass below.

## How loading was measured

Production builds were run in headless Chrome on an Apple M1, unminified so profiles keep function names. The phone figures emulate a mid-range phone on 4G, with the CPU slowed four times and the network limited to 9 Mbit/s with 60 ms of latency. They are emulations, not readings from a real device. "Ready" is the time until the first frame is drawn, because the page cannot respond until that frame has finished.

Measured at commit `5cf0d24`: about 29,000 scene objects. Before and after runs were alternated, three of each:

| Phase | M1 before | M1 after | Phone before | Phone after |
|---|---|---|---|---|
| Code and map data | 0.2 s | 0.2 s | 1.0 s | 1.0 s |
| Texture atlases | 0.1 s | 0.1 s | 4.7–5.1 s | 0.7 s |
| Building the scene | 1.6–1.7 s | 1.5–1.6 s | 6.0–7.4 s | 5.6–6.3 s |
| Merging objects for drawing | 1.4–1.7 s | 0.3 s | 7.2–8.4 s | 0.9–1.1 s |
| First frame | 2.1 s | 0.2 s | 10–15 s | under 1 s |
| **Ready** | **5.3–6.0 s** | **2.3–2.6 s** | **31–36 s** | **9.2–10.3 s** |

Renders from the spawn point and four review views match the previous build. The only difference is faint compression noise on the heritage atlas façades.

Draw calls rose from 2,881 to 3,260, because merged batches now stop at tile edges. 96 m and 128 m tiles saved only 3–6% of draw calls but slowed phone merging by 18–57%, so the tile stays at 64 m. Cutting the number of materials (step 6 below) is the real fix for draw calls.

The largest remaining cost is building the scene. Streaming (steps 4 and 5) addresses that.

## Quick pass (done)

1. **WebP atlases, loaded in parallel.** The two texture atlases were 4.9 MB of PNG, downloaded one after the other. They are now 0.53 MB of WebP (`cwebp -q 85 -m 6 -sharp_yuv`, about 38 dB PSNR against the masters), downloaded at the same time. The lossless masters moved to `assets/`, so they are kept but not deployed.
2. **One merge pass per 64 m tile.** Static geometry used to go into a single PlayCanvas batch group, which merged the whole scene three times:
   - once in `World.build`;
   - again on the first frame, because the engine regenerates every batch group before the first render (`_firstBatch`);
   - a third time, because `BatchManager.generate()` with no arguments compares group IDs as strings against numbers. It never clears the group's dirty flag, so `updateAll` regenerates it.

   Each pass was also quadratic in the group size. Objects created during `build()` now go under a tile entity, outside the render layers. At the end of `build()`, `World.mergeTiles` merges each tile once with the public `BatchManager.prepare` and `create` calls.

For builders, nothing changes. Keep calling `world.box`, `panel`, `mesh` and `cylinder`. Geometry created during `build()` is merged when `build()` ends, so changing a returned entity after that has no visible effect, as before. Passing a `parent` to `box` keeps that object separate and unmerged.

## Streaming plan

| # | Step | Why | Effort | Status |
|---|---|---|---|---|
| 1 | WebP atlases, loaded in parallel. Later, one atlas per district, loaded with its tiles | Cut texture download time by about 90% | Small | Done |
| 2 | Builder registry: replace the `if (buildX(...)) continue` chain in `world.ts` with a lookup from building ID to builder, loaded with dynamic `import()` | Each layout module already owns its building IDs. The chain grows with every building and blocks code splitting | Small–medium | Done (see below) |
| 3 | Spatial grid for `canWalk` and `nearest` | Keeps collision and road lookups flat as the map grows | Small | Done (see below) |
| 4 | `scripts/prepare-map.mjs` writes tiled map data, plus plain massing for every building | Foundation for streaming. Massing keeps the skyline and avoids pop-in | Medium | Proposed |
| 5 | Tile loader: build detail within about 150 m, one ring ahead and a few buildings per frame. Unload tiles behind the player. Massing out to the fog distance | The core of streaming. At walking speed (3.3–6 m/s) a 100 m tile takes 17–30 s to cross, enough to build the next ring in the background | Large | Proposed |
| 6 | Fewer materials: let colours share materials, and put the canvas sign textures into a shared atlas | The scene draws about 3,200 materials in about 3,700 draw calls. Every tile pays this cost | Medium | Proposed, alongside 5 (measured below) |
| 7 | Bake tiles at build time into compressed geometry files | Fastest loading, but every model change needs a bake step | Large | Not yet. Keep the tile format compatible |

### Builder registry (step 2, done 12 November 2026)

`src/builder-owners.mjs` lists each builder module, the function it exports and the building IDs it accepts, read from its layouts. `npm run registry` turns that list into `src/builder-registry.ts`: a map from building ID to module, and a dynamic `import()` for each module. `world.ts` loads only the modules the map's buildings need, alongside the atlases, then looks each building up by ID instead of trying 62 builders in turn.

- **Adding a building to an existing module:** add it to the layout as before. `npm run dev` and `npm run build` regenerate the registry first, and `npm test` fails if the committed registry is stale.
- **Adding a builder module:** add one line to `src/builder-owners.mjs`. The registry test fails for a module with a per-building builder that is not listed, for a building claimed by two modules, and for a claimed ID missing from the map.
- **Still in `world.ts`:** the Mongkok corner split, the temple lane's low neighbour, the coffeeshop's rear neighbour and the generic landmark path. They are part of the Lorong 11 core.

Each builder is now its own chunk, with its layout. The viewer reads landmarks only from `src/core-landmarks.mjs`: the 13 Lorong 11 core landmarks on the 17 buildings that reach the shared path, because every other landmark's building has a builder module of its own. `src/landmarks.mjs` keeps the full list, in the same order, for the tests and the documentation, and a test checks that both lists give the same landmark for every building without a builder module. The main chunk fell from 2,343 kB (682 kB gzipped) to 1,257 kB (351 kB); most of what remains is PlayCanvas.

All the chunks still load when the page opens, because every building is built then. The split pays off once the tile loader (step 5) loads only nearby builders.

### Spatial grid (step 3, done 12 November 2026)

`src/spatial-grid.mjs` files footprints in 16 m cells and road segments in 32 m cells. `canWalk` tests only the footprints filed in the walker's cell, and `nearest` searches outward ring by ring until no unsearched cell can hold a closer segment. Both return exactly what the full scans did, including the first segment in order among equal distances: `tests/spatial-grid.test.mjs` compares them with full scans over the map, and a check in the browser over 30,225 points found no difference in either. A batch of 30,225 `canWalk` calls fell from 1,062 ms to 102 ms in software WebGL Chrome. The map is still small, so the gain matters as it grows.

### Materials, measured 12 November 2026 (for step 6)

At the spawn the scene draws 3,211 materials in 3,683 draw calls. No two materials are identical: about 2,750 are plain colours from `world.mat`, each a different colour, and 463 carry textures, 461 of them canvas signs with 402 distinct images. So removing exact duplicates would save almost nothing. Letting different colours share one material, through vertex colours or a small palette texture, is what would cut draw calls, followed by the sign atlas.

### Where `build()` spends its time, profiled 12 November 2026

A CPU profile of the page load in software WebGL Chrome (no GPU) gave `build()` 13.6 s, of which 9.6 s fell in Shan Yuan Tang's last `world.mesh` calls, inside `gl.bufferData`. That is mostly Chrome waiting for the software GPU to work through everything queued before it, so it does not represent a real device. The rest spreads across the shared house builders (about 2.7 s), sign canvases (0.6 s), texture uploads (0.6 s) and tile merging (0.7 s), with no single cheap fix that keeps the output identical.

What it did show is that Shan Yuan Tang's tiled roofs hold 371,463 vertices, 21% of the scene's 1,735,768, in a single 317,139-vertex mesh and 14 smaller ones. Lighter tile tubes would halve that ([open question 82](open-questions.md)).

These assume the whole map exists at once and will need rework:

- `buildAlleyGround`, `buildShanYuanTang` and `buildAlleyExteriors` run once for the whole map rather than per building.
- `?review=` spawn points are only known after every building is built.
- Some builders read neighbouring buildings from `world.data`. Audited on 12 November 2026, four do, each to lay one elevation across the ways of its own place: `foo-hui` and `sims-north` (two-bay pairs), `lorong-9` (the grey building over two ways) and `lorong-13` (places over several ways). They read only their own place's ways, so a tile holding the place can hold all of them. The temple lane (`temple-alley`) and the coffeeshop side (`leong-kee-exterior`) read the map's roads and paths, and with Shan Yuan Tang they add footprints of their own.

## Building on top of the map

The README describes the repository as a base for visualisations, documentaries, education, games and other work. Streaming changes how such projects attach content, because areas now load and unload. So the plan includes:

| # | Addition | Effort | Status |
|---|---|---|---|
| A | Separate the map (data, layouts, builders, streaming, collision, lighting) from the experience (viewer UI, controls, game or campaign logic), starting with separate folders | Small–medium | Proposed, during steps 2–5 |
| B | Public map interface: tile and building load/unload events, plus queries that work for unloaded areas (walkability, nearest road, building at a point, landmark positions) | Medium | Proposed, with the tile loader |
| C | Refer to places by landmark ID or coordinates, not OSM way ID. OSM IDs change when the source data is refreshed | Small | Proposed |
| D | Content overlays: data files keyed to landmarks and attached when their tile loads (markers, information cards, billboards) | Medium | Proposed, when a second use exists |
| E | Signage modes: real, placeholder (the existing `fictional` set) and campaign slots | Medium | Proposed |
| F | Keep buildings identifiable after merging: a footprint-to-building lookup per tile, with doors and signs kept as separate objects | Medium | Proposed, with the tile loader |
| G | Publish the map as its own package | Medium | Later, when a second app exists |
| H | Legal review before commercial use | — | Proposed |

A short campaign can clone the repository, because it rarely needs map updates once it ships. A long-lived game should depend on the map package instead, because the map will keep changing for a long time.

Notes for item H, not legal advice:

- The code is MIT.
- The map data is ODbL. It needs attribution, and modified map data that is published must use the same licence. Keeping game or campaign data in separate files, not merged into the map data, generally keeps it outside that requirement.
- The textures are AI reconstructions of reference photographs, some from Street View, so commercial rights are uncertain.
- Named businesses, temples and a mosque appear in the model. Using them in marketing or games can imply endorsement, which is sensitive in Geylang. Placeholder signage is the safer default for commercial use.
