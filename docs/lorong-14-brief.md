# Lorong 14 Geylang

Research and implementation from **17 October 2026**, under open question 51. This brief covers `src/lorong-14-layout.mjs`.

## Scope and method

- **Stretch:** Lorong 14 from Geylang Road south, past Talma Road's east end, to the south edge of the retained extract (about 1.3108 N), with the corners at both ends of both sides and at Talma Road. Talma Road's east mouth is kept as road surface. The Talma Road row and the far side of Geylang Road wait for a later pass.
- **Beyond the extract:** the lane runs on about 100 m to Guillemard Road. The walk stops at the last buildings the extract holds, No. 37 on the east side and Wing Fong Mansions on the west. Extending the extract is [open question 52](open-questions.md).
- **Block faces:** the Geylang Road faces back to Lorong 12 are already in the map. To balance the work of the three lanes mapped at the same time (Lorong 14, 16 and 18), the Geylang Road row is taken east to Lorong 16 instead: Nos. 292–308, between the east corner block (Nos. 284–290) and Lorong 16's west corner. No. 310 belongs to the Lorong 16 walk.
- **The west corner on Geylang Road:** a lawn under large trees, with a litter bin, parked bicycles and steps down to the back lane, as the June 2024 drives and the satellite agree. There is no building to model, and no source outline is missing.
- **Map:** `scripts/prepare-map.mjs` takes the lane's buildings and its thirteen road ways by id, with Talma Road's east mouth. The study rectangle is unchanged.
  - The lane is a walkable corridor (`corridors` in `map.json`). Its mouth shares Lorong 17's node on the Geylang Road centreline, inside the Geylang Road corridors.
  - The fronts of Nos. 284–300 stand inside the Geylang Road corridors. Nos. 302–308 stand about 7 m further back, beyond them, so their forecourt is a corridor of its own, 3 m in front of their faces.
- **Order:** south down the west side from Geylang Road, then north up the east side back to Geylang Road, then east along Geylang Road from No. 292 to No. 308. Each stop is one photographed building, measured and modelled before the next.
- **Imagery:** the June 2024 Lorong 14 drive, southbound, from `3MIt…` at the Geylang Road end to `15hk…` at the extract's edge, about 10 m apart, with the Geylang Road and Talma Road drives at the corners. It is the latest drive along the lane.
- **Naming:** unchanged. A business is named only when Google Maps lists it at that address and its sign shows in the photograph. Other buildings are labelled by address, with their signboards drawn and their lettering blank.
- **Code:** each place is a measured elevation on one edge of its footprint, built with the lane-house helpers shared with Lorong 17, Lorong 19 and Lorong 21 (`src/lane-house-layout.mjs`, `src/lane-house.ts`).

## The lane

- **West side:** the lawn at the Geylang Road corner; Wing Fong Court, an eight-storey block behind a fenced garden of palms; Talma Road; and Wing Fong Mansions, another eight-storey block, running on past the extract's edge.
- **East side:** the corner block of shophouses on Geylang Road; a back lane; The Amazing Inn; Central Imperial, a condominium of curved balconies; the ibis budget hotel; and a row of two- and three-storey houses from No. 25 to No. 37.
- **Geylang Road, east to Lorong 16:** two-storey shophouses from No. 292 to No. 300, then a four-storey block set back behind a forecourt, from No. 302 to No. 308.

## The walk

| Stop | Side | Source way | Building | Status |
| --- | --- | --- | --- | --- |
| 1 | West | 121872892 | No. 10, Wing Fong Court | Done; named (address conflict recorded) |
| 2 | West | 764372595 | No. 12, Wing Fong Mansions, south of Talma Road | Done; named; runs on past the extract (question 52) |
| 3 | East | 454274618 | No. 37 | Done; unnamed |
| 4 | East | 454274615 | No. 35 | Done; unnamed |
| 5 | East | 454274614 | No. 33 (no number in the source) | Done; unnamed; question 53 |
| 6 | East | 454274611 | No. 31, 樂緣 (HAPPY 31) | Done; named (address conflict recorded); question 53 |
| 7 | East | 454274608 | No. 29 | Done; unnamed; question 53 |
| 8 | East | 764372579 | No. 27 | Done; unnamed; question 53 |
| 9 | East | 764372578 | No. 25 | Done; unnamed; question 53 |
| 10 | East | 454274677 | No. 21, ibis budget Singapore Pearl | Done; named (a dated exterior; question 54) |
| 11 | East | 764372577 | No. 3, Central Imperial | Done; named |
| 12 | East | 476141643 | No. 1, The Amazing Inn | Done; named |
| 13–16 | East | 454254175 to 454254172 | Nos. 284–290 Geylang Road, the east corner block | |
| 17–25 | Geylang Road | 454254171 to 764372573 | Nos. 292–308, east to Lorong 16 | |

The names in the table are those Google Maps gives for each address, or the source map's house numbers where no listing gives one. Whether a building is named in the model is decided at its stop.

## West side

The west side opens at Geylang Road with the lawn under rain trees at the corner, which has no building. A back lane runs west from the lane behind it, along Wing Fong Court's north wall.

### 1. Way 121872892: No. 10, Wing Fong Court

An eight-storey block from the back lane to Talma Road, behind a garden of palms and a white boundary wall with teal posts, teal planters and black railings.

- **The lane face:** a run of six projecting bays.
  - Each bay rises under a teal cornice to a pair of gabled dormers over teal bay windows (one dormer on the north end bay).
  - Rounded teal balconies on the fifth and sixth floors; teal hoods over the second-floor windows.
  - A grey base of three storeys, with arches drawn in relief.
- **Between the bays:** recessed white walls with pairs of Greek-key strips under teal half-round lattices, and small porches of teal lattice under tiled gables at their feet. A drive-through portal opens into the courtyard.
- **The ends:** grey service doors and glass-block vents on the back lane; a curved boundary wall at the Talma Road corner with a granite panel lettered **永豐閣 Wing Fong Court**. A teal canopy on Talma Road reads Wing Fong Court.

**Measurement:**
- **Depth:** the depth scores between neighbouring lane panoramas peak 1.5–2.25 m in front of the source edge on the dormers, and at 4–6 m on the lower floors, where the palms stand. Neither held up:
  - Rectified on a plane **0.75 m in front of** the source edge, the dormer apexes line up between `0W5F…`, `BMFJ…` and `Y-F5…` (and `iXFF…`, whose pose runs about 1.5 m off). At 2.0 m they drift 3 m across the same panoramas.
  - So the bays stand about 0.75 m in front of the source edge and the main wall about on it. The face is on its source line.
- **Extent:** on that plane the face runs the source edge's whole 85.6 m, from the rounded Talma Road corner to the north end.
- **Bays** (u north from the Talma Road end): 5.0–16.0, 19.8–30.6, 34.8–46.0, 49.8–59.4, 64.6–75.4 and 79.6–85.4, with the portal under the third at 37.0–44.5.
- **Heights:** floors every 3.0 m; the grey base to 10.1 m; the main wall to 24.8 m under a teal cornice to 25.9 m; dormer apexes at 27.1–27.3 m.
- **The boundary wall:** from the elevation of its foot in three panoramas, about **5 m in front of** the source edge. The corner panel triangulates from `QGGj…` and `jrMz…` at about (189.2, 190.3), 3.6 m south of the Talma Road wall.
- **Check:** a render from `x44k…` at the Geylang Road end, blended with the photograph, puts the north-east corner and the north wall on their photographed lines.

**Layout:**
- **Faces:** the elevation is laid at its own scale on the source edge, the bays projecting half a metre. The Talma Road end (edge 1) and the north wall (edge 21) are side faces with windows, hoods and the grey base.
- **The boundary wall** is drawn 5 m in front of the face, with its posts, planters, railings and the black gate at the portal. On Talma Road it runs 3.6 m in front of the end wall, and the curved corner with its panel stands where it triangulates.
- **Roof:** the satellite shows tiled hips over each bay; it is drawn flat in tile colour.
- **Not modelled:** the palms, the garden and the arches in relief on the grey base.

**Naming:** the source map names this way **Wing Fong Court**, No. 10, eight storeys, and its lettering is photographed on the corner wall.
- Google Maps lists Wing Fong Court, an apartment complex, at **12** Lor 14 Geylang, Singapore 398924, with its point inside Wing Fong Mansions south of Talma Road. Meanwhile 10 Lor 14 Geylang geocodes inside this outline.
- The lettering and the source agree on this building, so it is named under [open question 12](open-questions.md) (a clearly signed occupant may be modelled when published addresses disagree, with the conflict recorded). The panel is redrawn in original type.
- Reliable Paint SG and General Heating & Cooling, listed at No. 10, have no photographed signs.

Use `?review=wing-fong-court`.

Talma Road's east mouth opens south of Wing Fong Court. Its row waits for a later pass.

### 2. Way 764372595: No. 12, Wing Fong Mansions

Wing Fong Court's twin south of Talma Road: an eight-storey block in cream over a terracotta-red ground floor, behind a garden of trees and a cream boundary wall with salmon-capped posts and grey railings. A four-storey annex closes its south end, beyond the extract's edge.

- **The lane face:** eight projecting bays under red cornices, single and paired gabled dormers alternating over cream bay windows.
  - Rounded cream balconies with teal lattice panels on the fifth and sixth floors.
  - Cream arches over the red ground floor, with pyramid studs.
- **Between the bays:** Greek-key strips in the recesses, and porches of teal lattice under tiled gables. A drive-through portal opens under the sixth bay.
- **At the Talma Road corner:** a granite panel on the boundary wall lettered **永豐樓 Wing Fong Mansions**.

**Measurement:**
- **Depth:** trees hide most of the face from the lane. Where the dormers show, they line up on planes 0.4–1.5 m **behind** the source edge (`odvH…` with `15hk…`, and `odvH…` with `7Umz…`), while drifting at 1.5 m forward. So the face stands on its source line, its bays about half a metre proud.
- **Extent:** the whole 122.4 m source edge, from the annex at the south end (to u ≈ 10.5) to Talma Road.
- **Bays** (u north from the south end): 10.6–16.0, 19.6–30.9, 34.5–45.8, 49.4–60.6, 64.2–75.5, 79.1–90.4, 94.0–105.3 and 108.9–122.3. The recesses' Greek-key strips repeat every 14.9 m. The portal runs from 80.0 to 87.5.
- **Heights:** as at Wing Fong Court: floors every 3.0 m, the main wall to 24.8 m under a red cornice to 25.9 m, dormer apexes at about 27.5 m. The red ground floor rises to 3.9 m and the annex to 14.3 m.
- **The boundary wall:** from the elevation of its foot in three panoramas, about **6 m in front of** the source edge. The corner panel triangulates from `jrMz…`, `bPco…` and `Pm_y…` at about (194.5, 212.4), 5 m north of the block's north-east corner.
- **Check:** renders from `2NQa…`, `jrMz…` and `odvH…`, blended with the photographs, put the red ground floor, the cornice and the north corner on their photographed lines.

**Layout:**
- **Volumes:** the outline is built to the annex's 14.3 m. The eight-storey block is a raised volume from 14.3 m to 24.8 m, from the annex to the north end and back to the shallowest of its rear notches, 14.5 m deep.
- **Faces:** the elevation is laid at its own scale on the source edge. The Talma Road end (edge 73) and the short splay at the corner (edge 74) are side faces; the boundary wall runs 5 m in front of the Talma Road end, and the curved corner with its panel stands where it triangulates.
- **Review start:** the face runs about 85 m past the lane's last way, outside the corridor, so its review start stands opposite its north end (`review.at` in the layout) instead of its middle.
- **Not modelled:** the trees and garden, and the pyramid studs.

**Naming:** Google Maps lists **Wing Fong Mansions**, a condominium complex, at 12 Lor 14 Geylang, Singapore 398924, with its point inside this way. The source map names it Wing Fong Mansions, No. 12, eight storeys, of 1997.
- The listing, the source and the lettering agree, so it is named and its panel is redrawn in original type.
- Wing Fong Court is also listed at No. 12 with its point inside this way, but its lettering stands on No. 10 (stop 1).

Use `?review=wing-fong-mansions`.

**West side complete** within the extract. Every building from the Geylang Road corner to the extract's edge has its Lorong 14 face; Wing Fong Mansions runs on past the edge, where the lane continues to Guillemard Road ([open question 52](open-questions.md)).

## East side

The east side within the extract ends at No. 37. South of it a narrow alley separates it from a corrugated hoarding plated 43, with single-storey houses under tiled roofs and a temple compound beyond, outside the extract ([open question 52](open-questions.md)). The walk turns north there.

### 3. Way 454274618: No. 37

A mint-green three-storey house set back behind No. 35's front.

- **Ground floor:** a porch of folding grilles behind a timber post, under a mint balcony slab.
- **First floor:** two windows.
- **Second floor:** glazed from end to end under a zinc eave, with television aerials on the roof.
- **At the pavement:** brick gate pillars with white globe lamps, a low brick wall, and beige arched railings and gates.

**Measurement:**
- **Depth:** the house is seen square-on only from `7Umz…`; the lane panoramas further north look at it past No. 35 and a flowering tree, and the depth scores find nothing (under 0.06).
  - So it was checked by render-and-compare: rendered from `7Umz…`, the gate pillars' feet and lamps fall on the photographed ones with the gate on the **source edge**. The porch's back wall stands about 2.5 m behind it, and the glazed box over the gate line.
- **Heights:** the porch to about 3.0 m; the balcony slab at 5.8–6.3 m; the glazed box at 6.3–9.8 m; the eave to 10.3 m.

**Layout:** laid proportionally on its 7.53 m source edge, with the porch as a 2.5 m five-foot way behind the gate line, and the glazed box and balcony slab projecting over it.

**Naming:** none. Nothing is listed at No. 37 and no sign was photographed.

Use `?review=l14-37`.

### 4. Way 454274615: No. 35

A white three-storey house standing forward of its neighbours.

- **Ground floor:** a car porch under the first floor, behind a white pier, a black arched gate and a letterbox pier plated 35.
- **Upper floors:** a band of white-framed windows on each floor, one bay louvred on the second.
- **Between the first-floor windows:** four gold characters down the wall, reading **慈懷蓮社**.
- **Roof:** a zinc eave.

**Measurement:**
- **Depth:** the depth scores peak 6 m forward on the trees and gates (0.10–0.14). On the **source plane**, though, the characters line up at u 4.7–5.1 between `bPco…`, `2NQa…` and `6y54…`; at 1.5 m forward they drift 1.1 m apart. So the front stands on its source edge.
- **Extent:** from 0.5 m south of the source edge's north end to its south end, 7.7 m of the 8.22 m edge.
- **Heights:** the porch to 3.75 m under a slab to 4.0 m; first-floor windows at 5.1–6.65 m; second-floor windows at 8.3–9.85 m; the eave at 10.7–11.0 m.
- **Check:** renders from `2NQa…` and `bPco…`, blended with the photographs, put the window bands, the characters, the gate and the eave on their photographed lines.

**Layout:** laid at its own scale on the source edge, the porch as a 3 m five-foot way.

**Naming:** none. Nothing is listed at No. 35, and a search for 慈懷蓮社 finds no listing, so the characters are drawn as a blank gold strip.

Use `?review=l14-35`.

### 5. Way 454274614: No. 33

A three-storey house between No. 31's brown slatted front and No. 35, behind brown slatted gates. The source way has no number; Google Maps geocodes No. 33 beside it.

- **Second floor:** two windows between timber blinds, under a dark metal canopy.
- **First floor:** two windows between timber blinds and two air-conditioners, under a red tiled pent roof.
- **Ground floor:** a balcony screened in bamboo, running on across No. 31, over a maroon awning.
- **At the pavement:** brown slatted gates and a letterbox pier.

**Measurement:**
- **Depth:** the upper floors' depth scores peak **2.0–2.25 m in front of** the source edge (`bPco…` with `2NQa…`, 0.33), as do the whole house's between three pairs (0.24–0.33).
- **Party walls:** on a plane 2.25 m forward, read square-on from `2NQa…`, they stand at u 1.0 and 6.7 (u south from the source north end), against the source's 0 and 6.07. The house is about 5.7 m wide.
- **The gates:** from the elevation of their foot in `2NQa…`, about **6 m in front of** the source edge.
- **Heights:** the awning at 2.1–3.25 m; the bamboo screen at 3.95–4.45 m; first-floor windows at 4.6–6.0 m; the pent roof at 6.1–6.9 m; second-floor windows at 7.0–8.4 m under a canopy to 8.9 m; the parapet at 9.9 m.
- **Check:** renders from `2NQa…` and `bPco…`, blended with the photographs: from `2NQa…`, square-on, the windows, the pent roof and the gates fall on their photographed places; from `bPco…` the upper floors fall behind them, as their 2.25 m predicts.

**Layout:** laid proportionally on its source edge (×1.06). The gates and letterbox pier are drawn at their triangulated line, 6 m out. The front's photographed line is part of [open question 53](open-questions.md).

**Naming:** none. Nothing is listed at No. 33 and no sign was photographed.

Use `?review=l14-33`.

### 6. Way 454274611: No. 31, 樂緣

A three-storey house faced from its first floor to its parapet in brown horizontal slats, over a forecourt.

- **The canopy:** over the forecourt, its front carrying a red board reading **HAPPY 31 乐缘**, with red awnings under it.
- **Behind:** a glazed shop front lettered Happy Men.
- **On the forecourt:** a red letterbox plated 31 and a welcome board.

**Measurement:**
- **The façade:** the slats' north edge and No. 29's windows put it **1.5 m in front of** the source edge (three pairs, 0.38–0.47). The slats themselves repeat vertically, so they were not relied on.
  - On that plane, read square-on from `bPco…`, the house runs from 1.2 m to 7.6 m along the source edge, against 0 to 6.86 m. Its south party wall agrees with No. 33's north one (stop 5).
- **The board:** at 1.5 m it reads 6 m apart between `jrMz…` and `2NQa…`, and still 6.6 m apart at 3 m. On a plane **about 6 m forward** it lines up between `jrMz…` and `bPco…` (`2NQa…` loses it under the canopy there), where No. 33's gates also triangulate. So it hangs on the canopy's front at the forecourt's edge.
- **Heights:** the board at 3.5–4.05 m (on its own plane); the canopy fascia at 4.4–4.75 m; the slats from 4.75 m to the parapet at 10.25 m.
- **Check:** renders from `bPco…` and `jrMz…`, blended with the photographs, put the slats and the board's height on their photographed places. The board falls about 0.8 m north of the photographed one, as the proportional layout predicts.

**Layout:** laid proportionally on its source edge (×1.07), with the canopy drawn from the wall to the board 6 m out. Everything on the front, including the board, follows the proportional layout. The front's photographed line is part of [open question 53](open-questions.md).

**Naming:** Google Maps lists **樂緣**, open until midnight, with no category, at Lor 14 Geylang, Singapore 398933, with its point inside this way.
- The board carries the same name, in simplified characters, with the house number 31. The listing gives no house number, and its postal code differs from No. 31's (398940).
- So the house is named under [open question 12](open-questions.md), with the conflict recorded, and its board is redrawn in original type.
- SBL Engineering, also listed at No. 31, is closed.

Use `?review=le-yuan`.

### 7–9. Ways 454274608, 764372579 and 764372578: Nos. 29, 27 and 25

Three white three-storey houses over car porches, between No. 31 and the ibis budget hotel, their gates at the pavement.

**Measurement:** the three fronts were read together on one plane along No. 25's front (s south from its north end).
- **Depth:** the upper floors of all three line up about **2.5 m behind** No. 25's source front, between `0W5F…`, `Pm_y3…`, `jrMz…` and `bPco…`. The depth scores of each front on its own source edge agree: 2.5–2.75 m behind (No. 25), 1.75–2.0 m (No. 27) and 1.5 m (No. 29), as the source fronts step back southward. The scores are weak (0.10–0.22) over the porches and gates, so the plane was confirmed by rectifying the windows on it.
- **Party walls on that plane:** at s = 0.67, 5.1, 11.45 and 20.6, against the source's 0, 6.12, 12.95 and 19.41. So No. 25 photographs 4.4 m wide on a 6.05 m way, No. 27 6.35 m on 6.68 m, and No. 29 about 9.2 m on 6.3 m.
  - The 27/29 wall was placed where No. 27's stair tower ends; a window at s 14.5–16.1 rules out the change of canopy at s 15.2.
  - The plate pillars agree: No. 27's at s 10.3, near its south end; No. 29's at about s 17.5, near the middle of its wide front.
- **The gates:** No. 27's plate pillar triangulates (`Pm_y3…` with `bPco…`) at (216.8, 198.7), about **5.2 m in front of** No. 25's line; No. 29's (`jrMz…` with `bPco…`) about **6.3 m in front of** its own source edge. No. 25's gate, from the elevation of its foot in `Pm_y3…`, stands about **3.4 m in front of** its own, to within about 1.5 m.
- **Heights:** porches to 3.25–3.95 m under their canopies; first-floor windows at about 4.7–6.4 m; second-floor windows at about 7.7–9.5 m; parapets at 9.9–10.05 m.
- **Check:** renders from `Pm_y3…`, `jrMz…` and `bPco…`, blended with the photographs, put the gates, the plate pillars, the canopies and the window rows on their photographed places. The upper floors fall about a metre south of their photographed places, as the proportional layout predicts.

| Stop | Way | House | Photographed | Named |
| --- | --- | --- | --- | --- |
| 7 | 454274608 | **No. 29**: broad and white, three windows on each upper floor and an air-conditioner. Its porch is partly under No. 27's red tiled awning and a dark board, partly under a cream corrugated canopy. At the pavement a black railing gate and a white pillar with a lamp, plated 29 | 9.15 m | No |
| 8 | 764372579 | **No. 27**: white, two windows on each upper floor and a stair tower clad in maroon slats at its south end. A red tiled arched awning over its porch. At the pavement a black granite wall with a band of green glass, a black pillar plated 27 and a black railing gate | 6.35 m | No |
| 9 | 764372578 | **No. 25**: white, a window on each upper floor at its north end, and a dark timber-clad panel carrying six air-conditioners at its south end. A white corrugated canopy with a floodlight over a porch with a red and grey stone feature wall. At the pavement a grey railing gate between white pillars with red tiled caps, plated 25 | 4.43 m | No |

**Layout:**
- Each house is laid proportionally on its own source edge: No. 29 ×0.69, No. 27 ×1.05, No. 25 ×1.36.
- The gates are drawn at their triangulated lines: 6.3 m, 5.8 m and 3.4 m out from each source edge.
- The fronts' photographed line and the party walls are part of [open question 53](open-questions.md).

**Naming:** none.
- Google Maps lists RS Cycles, a bicycle shop, at 27 Lor 14 Geylang, with its point inside No. 27's way, but no sign for it was photographed.
- Nothing is listed at Nos. 25 and 29.

Use `?review=l14-29`, `?review=l14-27` and `?review=l14-25`.

### 10. Way 454274677: No. 21, ibis budget Singapore Pearl

An eight-storey hotel between Central Imperial and No. 25.

- **Upper floors:** seven floors of cream panels in a grey grid of piers and spandrels, a pair of windows in each panel.
- **Ground floor:** cream, with a car porch at the north end, a glazed lobby with a pier plated 21, and planters of trees behind grey wavy railings.
- **In front of the lobby:** a blue cushion-shaped sign reading **ibis budget HOTELS**, on a cream plinth lettered **PEARL** in blue.

**Measurement:**
- **Depth:** the face repeats too regularly for the depth scores, whose peaks wander from 1 m behind to 6 m in front. So the corners were triangulated instead, from three pairs of lane panoramas each:
  - the south corner: 0.5–1.5 m behind the source edge, within 0.7 m of the source end;
  - the north corner: 0.6–2.1 m behind, 1–2.5 m north of the source end, where it meets Central Imperial.
- **On a plane 1 m behind** the source edge the panoramas' views join cleanly in a mosaic. There the face runs from u 0.2 to 35.8, against the 35.45 m source edge.
- **Grid:** twelve piers about every 3.2 m, from u 0.4 to 35.6; window rows every 3.35 m from 6.2 m.
- **Heights:** the ground floor to 4.6 m under a grey band to 5.4 m; the parapet at 29.6 m.
- **The sign:** triangulates from `0W5F…` with `Pm_y3…`, and from `iXFF…` with `Pm_y3…`, at (214.5, 176.4): **2.9 m in front of** the source edge, at u 23.3.
- **Check:** renders from `BMFJ…`, `0W5F…` and `Y-F5…`, blended with the photographs, put the grid, the window rows, the base band and the sign on their photographed places.

**Layout:** laid at its own scale on the source edge (the 1 m is recorded but not acted on). The sign stands on its plinth where it triangulates, facing the lane.

**Naming:** Google Maps lists the hotel at 21 Lor 14 Geylang, Singapore 398961, with its point inside this way, now under the name **ibis budget Singapore Vanda**, a 2-star hotel. The source map names it Ibis budget Singapore Pearl.
- The brand on the photographed sign agrees with the listing at this address, so the hotel is named. It is named as a dated exterior, under the name its sign and the source carry in June 2024, and the sign is redrawn in original type.
- Whether to keep the photographed name or take the listing's is [open question 54](open-questions.md).

Use `?review=ibis-budget-pearl`.

### 11. Way 764372577: No. 3, Central Imperial

An eight-storey condominium between The Amazing Inn and the ibis budget hotel.

- **Upper floors:** seven floors of wavy balconies with glass railings in front of full-height glazing, between curved blue fins, under a wavy white roof canopy at the north end.
- **Ground floor:** white louvred service doors, letterboxes and the car park's gate under a black-and-yellow height bar.
- **At the pavement:** a fence of white angled slabs and grey railings. In front of the gate a grey name board on a plinth of white slabs reads **CENTRAL IMPERIAL** under a swoosh, over **3 LORONG 14 GEYLANG**.

**Measurement:**
- **Depth:** the balconies' depth scores climb all the way to the cameras, and say nothing. The ground floor's louvred doors line up between `owb1…`, `xIwN…` and `l2s1…` **0.25–0.5 m in front of** the source edge (0.18–0.27), at u 11.3–13.3 in all three. So the front stands on its source line; the balconies project up to 1.8 m.
- **Extent:** the whole 50.4 m source edge.
- **The name board:** triangulates from `xIwN…` (bearing 111.0°) and `l2s1…` (59.8°) at (200.7, 126.8): **3.65 m in front of** the source edge, at u 22.3, in line with the fence. Its foot's elevation in both views puts it 0.55 m up.
- **Heights:** the ground floor to 4.4 m; floors every 3.15 m from 4.6 m; the roof at 26.6 m, its canopy to about 27.6 m.
- **Check:** renders from `xIwN…`, `l2s1…` and `kLBG…`, blended with the photographs, put the balcony rows, the roofline, the gate, the fence and the board on their photographed places.

**Layout:**
- Laid at its own scale on the source edge. Each floor's balcony is drawn as a wave about 8.2 m long, slab and glass railing, 0.4–1.8 m deep.
- **Estimates:** the blue fins are drawn straight, at their photographed rhythm of about 4.1 m, not each at its own place, and the louvred doors are spaced by estimate beyond the three measured.
- The fence, the gate and the board on its plinth stand at their triangulated line, 3.65 m out.

**Naming:** Google Maps lists **Central Imperial**, a condominium complex, at 3 Lor 14 Geylang, Singapore 398915, with its point inside this way. The source map names it Central Imperial, No. 3, eight storeys.
- The listing, the source and the board agree, so it is named, and the board is redrawn in original type.
- KSP General Contractors and Catch Cheaters are listed at units inside it; they have no photographed signs.

Use `?review=central-imperial`.

### 12. Way 476141643: No. 1, The Amazing Inn

A three-storey hotel at the corner of the lane and the back lane behind the Geylang Road shophouses. (In August 2018 it was white.)

- **The lane face:** narrow, in pale grey panels between dark grey pilasters and a dark grey centre bay.
  - An arched window in each pale panel on both upper floors, and a pair of small arched windows in the centre.
  - Cornices at each floor, and a curved parapet over the centre.
  - Over the ground floor, copper lettering reading **The Amazing Inn** either side of an arch over the door carrying a **1**, over a glazed front.
- **The north wall on the back lane:** pale grey, with rows of small arched windows and tall arched stair windows.

**Measurement:**
- **The north-west corner:** triangulated from six pairs of `r047…`, `x44k…`, `kLBG…` and `owb1…`, it stands **within 0.5 m of the source corner** (u 0.0–0.6, 0.6 m behind to 0.2 m in front). So the lane face is on its source line. The depth scores (0.11–0.23) were not used; the tree in front and Central Imperial behind confuse them.
- **Extent:** read square-on from `kLBG…`, the face runs from 0.4 m to the source edge's south end.
- **Heights:** the ground floor to 4.25 m under a cornice to 4.55 m; arched windows at 4.9–6.25 m and 8.4–9.9 m; a cornice at 7.1–7.45 m; the parapet at 11.9 m, its centre to 12.6 m.
- **The north wall** is seen only obliquely from the lane. Its windows are placed from a rectification of `x44k…`, and are approximate.
- **Check:** renders from `kLBG…` and `x44k…`, blended with the photographs, put the bands, the windows, the lettering and the parapet on their photographed places.

**Layout:** the lane face is laid proportionally on its source edge (×1.08); the north wall (edge 1) is a side face.

**Naming:** Google Maps lists **Amazing Inn**, a 3-star hotel, at 1 Lor 14 Geylang, Singapore 398913, with its point inside this way. The source map names it The Amazing Inn, No. 1.
- The listing, the source and the lettering agree, so it is named and its lettering is redrawn in original type.
- De Yue Lou - Wanton Mee, listed at No. 1, is closed.

Use `?review=amazing-inn`.
