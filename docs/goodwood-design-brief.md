# Goodwood Garments Services & Trading, 19 Lorong 11 Geylang

Research and implementation: **10 October 2026**. Q44, on the owner-approved re-spaced Lorong 11 west row (open question 1).

## Evidence and assignment

- **Current listing:** Google Maps lists **Goodwood Garments Services & Trading**, a textile merchant, at **19 Lor 11 Geylang, Singapore 388711**.
- **Street View, April 2024:** panoramas `73intX-f7jQoMaTMSJ_4Mg` and `H9_pLycpI51HF8H7LV6YxA` show a black **良木林 Goodwood** board over a grilled door in the five-foot way of the pale grey-green conserved shophouse directly north of Hok Tek Chi. The queue's 9 October 2026 notes record door number 19 there.
- **Footprint:** the frontage measures about **5.3 m**. The house stands on the authored footprint `l11w-19`, which replaces source way [1223407886](https://www.openstreetmap.org/way/1223407886) (6.41 m).

## How it was measured

- **Façade depth and twin:** the frame was rectified at the solved 0.6 m façade depth. The upper storey is a twin of No. 21, and the shared measurements are in `peranakan-layout.mjs`: three arched shuttered windows, shutters at 5.2–6.46 m with fanlights to 6.96 m, tile panels at 4.53–4.96 m and the cornice at 7.03–8.03 m.
- **Back-wall correction:** the ground-floor openings sit on the five-foot way's back wall, about 1.8 m behind the façade, so their rectified positions were corrected for that depth. After correction the window, door and window are symmetric on the house, which supports the depth.
- **Render-and-compare:** with the render camera moved 0.6 m towards the façade, the board, ground windows, gate and upper windows overlay the photograph.

## What is modelled and omitted

- **Modelled:**
  - the tiled pilasters and capitals, arched shuttered windows with fretwork fanlights, floral tile panels, the pierced vent panel and the dentilled cornice;
  - the floor band, piers and five-foot way;
  - two barred windows, a collapsible gate and fretwork panels on the back wall;
  - the board, redrawn originally;
  - the tiled roof, estimated with the shared gable module.
- **Not modelled:** the fine stucco, the parked vehicles and the interior.
- **Simplified:** the tile pattern.

Use `?review=goodwood`. All **134 tests**, the type check and the build passed, with day and night renders and no console errors.
