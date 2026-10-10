# Lanna Thai Traditional Massage, 34 Lorong 11 Geylang

Research and implementation: **9 October 2026**. Q34, added in this session and built at the user's direct request.

## Evidence and assignment

- **Current listing:** Google Maps, read on 9 October 2026, lists **Lanna Thai Traditional Massage, 34 Lor 11 Geylang, Singapore 388726, Floor 1**, a Thai massage business, open. Its place point (1.3136069, 103.8768262) is displaced into No. 36's outline, so it is not used.
- **Street View:** April 2024 panoramas `aHF7c6gZTF_nwgN7N0wTwg`, `hHdVXQD79Suo5Y4VlonoNg` and `QQNp4tBAf9BWzHrMOUczcw` show the yellow **LANNA THAI TRADITIONAL MASSAGE / 南娜泰式傳统按摩** board, ending in **34** in a red roundel. It hangs in the five-foot way of a cream two-storey building.
- **The building's lettering:** the parapet carries **1995** and **南洋丁氏總會** in raised white letters. No listing for that association was found in Google Maps or the SFCCA directory. The lettering is modelled as photographed, without a claim about the association's current use. A second band of grey metal letters reads ?揚體育會 above the ground-floor ledge. Its first glyph could be 威 or 咸 and no source confirms either, so the band is omitted, following the Lam Clan precedent.
- **Neighbours:** HAO mart, a single-storey shop, is to the south (No. 32), and SHG Engineering is to the north (No. 36). Only [way 1223250206](https://www.openstreetmap.org/way/1223250206), tagged **No. 34**, is assigned. All source coordinates are unchanged.

## How it was measured

- **Frontage:** the building's two party lines were triangulated from three April 2024 panoramas about 10 m apart. The façade corners land within **0.28 m** (north) and **0.42 m** (south) of the source way's front corners, with a width of **9.22 m** against the source 9.37 m. The fitted façade runs within 2° of the source front.
- **Source rear:** the source trace's south side runs at about 11° to the façade normal, so its rear edge is only 4.74 m. The outline is preserved, and the five-foot way's floor, ceiling and back wall follow both source sides.
- **Heights:** a frame square to the triangulated façade (heading 74.65°, fov 120) was taken from panorama `aHF7…`, 5.75 m from the wall. The camera height of 2.4 m comes from the same April 2024 drive at No. 19, and the five-foot-way floor confirms it to within 3 px, with a 0.57° downward tilt.
- **Five-foot way:** the north end of the Lanna board was triangulated from two panoramas, placing the back wall **2.1 m** behind the façade. Bag bottoms and the board heights on that wall agree.
- **Party walls:** the south party wall stands at parapet height above HAO mart for about **6.1 m** behind the façade, from a ray intersection.
- **Roof:** satellite imagery shows an orange tiled roof behind the parapet over about the front 10 m.
- **Render-and-compare:** the scene rendered from the solved pose and blended with the photograph puts the parapet, 1995, every character of the name, the windows, vents, ledges, piers and the board on their photographed positions.

| Element | Height (m) |
| --- | --- |
| Parapet coping | 7.95–8.14 |
| 1995 | 7.13–7.41 |
| 南洋丁氏總會 | 6.36–6.93 |
| Cornice ledge | 6.20–6.33 |
| Breeze-block vents | 5.67–5.96 |
| Small windows | 4.44–5.59 |
| Large window (transom 4.46) | 3.55–5.96 |
| Ground-floor ledge (downstand beam) | 2.79–2.98 |
| Lanna board, on the back wall | 2.32–2.96 |
| Framed poster, on the back wall | 1.31–2.13 |

Positions along the frontage, measured from the No. 32 corner: large window 0.20–3.51 m, small windows 3.97–5.82 m and 6.50–8.33 m, board 0.58–6.23 m, glass door 6.36–7.64 m and grille door 7.83–8.90 m. Heights carry about ±0.1 m.

## What is modelled

- **Massing:** a two-storey cream block with a parapet, its party walls raised to parapet height for 6.1 m. Behind the parapet is an estimated tiled roof falling back over 10 m, then a flat rear roof at an estimated 6.3 m.
- **Upper storey:**
  - two small dark-framed windows under breeze-block vents (an original quatrefoil pattern), and a large two-tier window;
  - projecting sills, the cornice ledge and the parapet coping;
  - the white downpipe on the south pier.
- **Lettering:** 南洋丁氏總會 in raised white letters, each placed at its measured centre, and 1995 above. Both are redrawn with original typography.
- **Floodlights:** black floodlight boxes on stands, three on the cornice ledge and two on the ground-floor ledge.
- **Five-foot way:** cream piers, a downstand beam, a 2.1 m deep floor and a higher ceiling. On the back wall:
  - dark slate tiles under the board, with a long framed poster left blank;
  - the yellow board, redrawn with original typography;
  - a dark glass door and a timber door behind a grille.

## What is omitted or estimated

- **Lettering:** the second band of grey letters is omitted because of the uncertain glyph.
- **Not modelled:** the poster's photographs and telephone number, the blade sign and HAO mart sign belonging to No. 32, plants, bags and pallets, the air conditioner, cables and the interior. The narrow timber panel at the far south end of the back wall lies across the skewed source side and is omitted.
- **Estimates:** the roof behind the parapet, the rear massing height, colours, and the window mullion spacing.
- **Neighbours:** No. 32 remains a generic two-storey placeholder, although HAO mart is single-storey.

## Review and validation

Use `?review=lanna-thai` for the front and lettering, and `?review=lanna-thai-five-foot-way` for the board and back wall.

All **99 tests**, the type check and the build passed. New checks cover:

- the No. 34 assignment, with the façade corners within 0.5 m of the triangulated ones and the displaced listing point unused;
- the elevation order and the board fitting under the raised ceiling;
- the character centres in order;
- fittings inside the source outline, including clipping at the skewed south side;
- clearance of the carriageway;
- walkable starts.

Day and night renders of both review starts showed no console errors. Renders found three problems, all corrected:

- the ceiling cut through the board, so the ledge became a downstand beam under a higher ceiling;
- old-style numerals made 1995 sit low;
- the generic neighbour's wall z-fought on the skewed south side.
