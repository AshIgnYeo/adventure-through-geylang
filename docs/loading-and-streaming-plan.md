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

For builders, little changes. Keep calling `world.box`, `panel`, `mesh` and `cylinder`. Since streaming (below), merged parts are a transform and a mesh instance rather than an entity, so these return a `pc.GraphNode`: moving or rotating it works until its tile merges, which happens when the tile's last building is built. Passing a `parent` to `box` keeps that object separate and unmerged, as an entity. A builder that draws an outline the map lacks calls `world.addFootprint` for its collision.

## Streaming plan

| # | Step | Why | Effort | Status |
|---|---|---|---|---|
| 1 | WebP atlases, loaded in parallel. Later, one atlas per district, loaded with its tiles | Cut texture download time by about 90% | Small | Done |
| 2 | Builder registry: replace the `if (buildX(...)) continue` chain in `world.ts` with a lookup from building ID to builder, loaded with dynamic `import()` | Each layout module already owns its building IDs. The chain grows with every building and blocks code splitting | Small–medium | Done (see below) |
| 3 | Spatial grid for `canWalk` and `nearest` | Keeps collision and road lookups flat as the map grows | Small | Done (see below) |
| 4 | A tile index, plus plain massing for every building | Foundation for streaming. Massing keeps the skyline and avoids pop-in | Medium | Done (see below). Written by `scripts/build-tiles.mjs` rather than `prepare-map.mjs`, because it is measured from the builders |
| 5 | Tile loader: build detail within about 150 m, one ring ahead and a few buildings per frame. Unload tiles behind the player. Massing out to the fog distance | The core of streaming. At walking speed (3.3–6 m/s) a 100 m tile takes 17–30 s to cross, enough to build the next ring in the background | Large | Done (see below), at 180 m |
| 6 | Fewer materials: let colours share materials, and put the canvas sign textures into a shared atlas | The scene draws about 3,200 materials in about 3,700 draw calls. Every tile pays this cost | Medium | Proposed, alongside 5 (measured below) |
| 7 | Bake tiles at build time into compressed geometry files | Fastest loading, but every model change needs a bake step | Large | Not yet. Keep the tile format compatible |

### Builder registry (step 2, done 12 November 2026)

`src/builder-owners.mjs` lists each builder module, the function it exports and the building IDs it accepts, read from its layouts. `npm run registry` turns that list into `src/builder-registry.ts`: a map from building ID to module, and a dynamic `import()` for each module. `world.ts` loads only the modules the map's buildings need, alongside the atlases, then looks each building up by ID instead of trying 62 builders in turn.

- **Adding a building to an existing module:** add it to the layout as before. `npm run dev` and `npm run build` regenerate the registry first, and `npm test` fails if the committed registry is stale.
- **Adding a builder module:** add one line to `src/builder-owners.mjs`. The registry test fails for a module with a per-building builder that is not listed, for a building claimed by two modules, and for a claimed ID missing from the map.
- **Still in `world.ts`:** the Mongkok corner split, the temple lane's low neighbour, the coffeeshop's rear neighbour and the generic landmark path. They are part of the Lorong 11 core.

Each builder is now its own chunk, with its layout. The viewer reads landmarks only from `src/core-landmarks.mjs`: the 13 Lorong 11 core landmarks on the 17 buildings that reach the shared path, because every other landmark's building has a builder module of its own. `src/landmarks.mjs` keeps the full list, in the same order, for the tests and the documentation, and a test checks that both lists give the same landmark for every building without a builder module. The main chunk fell from 2,343 kB (682 kB gzipped) to 1,257 kB (351 kB); most of what remains is PlayCanvas.

Since streaming, the page loads only the chunks of buildings near the walker when it opens, and the rest as their tiles come into reach.

### Spatial grid (step 3, done 12 November 2026)

`src/spatial-grid.mjs` files footprints in 16 m cells and road segments in 32 m cells. `canWalk` tests only the footprints filed in the walker's cell, and `nearest` searches outward ring by ring until no unsearched cell can hold a closer segment. Both return exactly what the full scans did, including the first segment in order among equal distances: `tests/spatial-grid.test.mjs` compares them with full scans over the map, and a check in the browser over 30,225 points found no difference in either. A batch of 30,225 `canWalk` calls fell from 1,062 ms to 102 ms in software WebGL Chrome. The map is still small, so the gain matters as it grows.

### Materials, measured 12 November 2026 (for step 6)

At the spawn the scene draws 3,211 materials in 3,683 draw calls. No two materials are identical: about 2,750 are plain colours from `world.mat`, each a different colour, and 463 carry textures, 461 of them canvas signs with 402 distinct images. So removing exact duplicates would save almost nothing. Letting different colours share one material, through vertex colours or a small palette texture, is what would cut draw calls, followed by the sign atlas.

### Scale after the extension walks, measured 22 November 2026

With the dated extension's lanes walked (questions 72, 81, 92 and 95-100), the map holds 543 source outlines and 268 road ways, built by 77 builder modules. At the spawn the scene draws 3,547 materials (3,211 on 12 November), 462 of them textured, across 10,091 drawn mesh instances; it holds about 90,000 entities, and `build()` takes about 16.6 s in software WebGL Chrome (no GPU), with the page ready in about 17.8 s. The main chunk is unchanged at 1.26 MB, since every new builder loads on demand. The new walks are photographed massing, so they add entities and materials but little geometry; steps 4-6 matter more with each walk.

### Scale after the south lanes, Aljunied Road and Lorong 22's east side, measured 28 November 2026

With questions 101, 102 and 104 walked, the map holds 608 source outlines (648 footprints with the authored ones) and 295 road ways, built by 80 builder modules. At the spawn the scene draws 3,598 materials across 11,116 drawn mesh instances and holds about 100,000 entities; `build()` takes about 15 s in software WebGL Chrome and the page is ready in about 17.7 s. The main chunk is unchanged. Question 105 recommends doing steps 4 and 5 before the next large extension east.

### Where `build()` spends its time, profiled 12 November 2026

A CPU profile of the page load in software WebGL Chrome (no GPU) gave `build()` 13.6 s, of which 9.6 s fell in Shan Yuan Tang's last `world.mesh` calls, inside `gl.bufferData`. That is mostly Chrome waiting for the software GPU to work through everything queued before it, so it does not represent a real device. The rest spreads across the shared house builders (about 2.7 s), sign canvases (0.6 s), texture uploads (0.6 s) and tile merging (0.7 s), with no single cheap fix that keeps the output identical.

What it did show is that Shan Yuan Tang's tiled roofs hold 371,463 vertices, 21% of the scene's 1,735,768, in a single 317,139-vertex mesh and 14 smaller ones. Lighter tile tubes would halve that ([open question 82](open-questions.md)).

These assumed the whole map exists at once. Streaming resolved them as described below: the lane passes became units of their own, review spawns come from the tile index, and the builders that read neighbours read only map data, which is always loaded.

- `buildAlleyGround`, `buildShanYuanTang` and `buildAlleyExteriors` run once for the whole map rather than per building.
- `?review=` spawn points are only known after every building is built.
- Some builders read neighbouring buildings from `world.data`. Audited on 12 November 2026, four do, each to lay one elevation across the ways of its own place: `foo-hui` and `sims-north` (two-bay pairs), `lorong-9` (the grey building over two ways) and `lorong-13` (places over several ways). They read only their own place's ways, so a tile holding the place can hold all of them. The temple lane (`temple-alley`) and the coffeeshop side (`leong-kee-exterior`) read the map's roads and paths, and with Shan Yuan Tang they add footprints of their own.

## Streaming (steps 4 and 5, done 28 November 2026)

### The tile index

`npm run tiles` (run first by `npm run dev` and `npm run build`, and skipped when its inputs are unchanged) writes `public/tiles.json`, about 85 kB. `scripts/build-tiles.mjs` bundles the real `World` and every builder with esbuild and builds the whole map in Node, on PlayCanvas's null graphics device, so the index is measured from exactly what the viewer builds. It records:

- **Units.** A unit is a building, or one of the two passes over the temple lane (Shan Yuan Tang and the lane's exteriors). Each unit's parts go to one 64 m tile, the tile under the middle of what it builds, so tiles load and unload whole.
- **Review spawns,** with the unit that sets each one, so a `?review=` link knows where to start before anything is built.
- **Extra footprints** that builders add for collision, so every outline blocks walking from the start.
- **Massing:** for each footprint, the tile it belongs to and the height of the tallest part standing on it or its walls.
- **Two-sided colours.** Builders set some shared colour materials to draw both sides. That used to depend on which building happened to run first; the index lists the final set, and the viewer applies it as each colour is made.

The browser and Node can differ in the last digit of trigonometry, which moves a spawn by about 10⁻¹⁴ degrees and nothing else. `tests/tiles.test.mjs` checks that the committed index matches a fresh run, and streams the map headlessly along a snake across it and back: every unit, including those rebuilt after unloading, builds the same parts with the same bounds and materials as in the full build, culling matches, and no builder writes a spawn the index does not hold.

### The loader

`World.start(focus)` loads the atlases and only the builder modules near the walker, builds the shared ground (roads, kerbs, lamps, the lane's paving and street plates), the massing for every tile, and detail for every tile within 90 m. Then Enter appears. `World.stream(focus, budget)` runs each frame: it builds the nearest unbuilt tile within 180 m one building at a time, 12 ms a frame while the welcome screen or menu is open and 4 ms while walking, merges a tile once its last building is done and hides its massing, and drops one tile a frame that is more than 260 m away back to massing. The radii are constants at the top of `src/world.ts` ([open question 106](open-questions.md)). Without `tiles.json` the viewer builds everything first, as before.

Merged parts are no longer entities. Each is a transform and a mesh instance, merged into its tile's batches and then freed. Creating and destroying 100,000 render components cost more than the geometry itself, because each one subscribes to engine events that are removed by a linear search; in Node the full build fell from 18.7 s to 3.5 s. The scene now holds 16 entities rather than about 100,000, so the engine walks far fewer nodes each frame.

If a builder changes after the index was written, the viewer warns in the console when a building sets a different spawn, and `npm test` fails until `npm run tiles` is run.

### Measured 28 November 2026

Software WebGL Chrome (no GPU) in the build container, from opening the page to Enter:

| | Before | Streaming | Everything at once, entity-free parts |
|---|---|---|---|
| Building the scene | 14.3 s | 2.8 s | 12.3 s |
| Ready | 16.9 s | 9.4 s | 12.6 s |
| Entities | 100,413 | 16 | 16 |
| Drawn mesh instances at the spawn | 11,115 | 4,194 | 10,299 |
| Materials drawn at the spawn | 3,598 | 1,793 | 3,598 |

Software WebGL exaggerates GPU waits: of the 9.4 s, about 4.5 s is the first frame compiling shadow shaders behind the queue of buffer uploads, which a real GPU clears far faster. Detail out to 180 m is complete about 16 s after Enter appears in software rendering. Renders at the review views match the previous build.

## Building on top of the map

The README describes the repository as a base for visualisations, documentaries, education, games and other work. Streaming changes how such projects attach content, because areas now load and unload. So the plan includes:

| # | Addition | Effort | Status |
|---|---|---|---|
| A | Separate the map (data, layouts, builders, streaming, collision, lighting) from the experience (viewer UI, controls, game or campaign logic), starting with separate folders | Small–medium | Proposed, during steps 2–5 |
| B | Public map interface: tile and building load/unload events, plus queries that work for unloaded areas (walkability, nearest road, building at a point, landmark positions) | Medium | Partly done: walkability, nearest road and review spawns work everywhere, built or not, and `world.settled` says when nearby detail is complete. Events and building lookups are still to do |
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
