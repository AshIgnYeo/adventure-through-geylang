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
| 6 | East | 454274611 | No. 31 | |
| 7 | East | 454274608 | No. 29 | |
| 8 | East | 764372579 | No. 27 | |
| 9 | East | 764372578 | No. 25 | |
| 10 | East | 454274677 | No. 21, the ibis budget hotel | |
| 11 | East | 764372577 | No. 3, Central Imperial | |
| 12 | East | 476141643 | No. 1, The Amazing Inn | |
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
