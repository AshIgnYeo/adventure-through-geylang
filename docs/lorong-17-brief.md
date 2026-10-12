# Lorong 17 Geylang

Research and implementation from **12 October 2026**, under the owner's answer to open question 35. This brief covers `src/lorong-17-layout.mjs` and the Lorong 17 faces of the corner buildings modelled elsewhere.

## Scope and method

- **Stretch:** Lorong 17 from Geylang Road to Sims Avenue, with the corner buildings at both ends. The part north of Sims Avenue, the Geylang Road houses east of the corner and Sims Avenue Nos. 136 onward wait for a later pass.
- **Map:** `scripts/prepare-map.mjs` takes the lane's eleven new source ways and its seven road ways by id, with the Geylang Road and Sims Avenue links to its junctions. The study rectangle is unchanged. The lane and its junctions are walkable corridors (`corridors` in `map.json`, `studyArea()` in `src/geo.mjs`): within 10 m of the lane's centreline, and of the two links.
- **Order:** north up the west side from Geylang Road, then south down the east side from Sims Avenue. Each stop is one photographed building, measured and modelled before the next.
- **Imagery:** the June 2024 Lorong 17 drive (`h2GM…` at the Geylang Road end to `Zwx6…` at Sims Avenue, about 10 m apart, heading north), with the Geylang Road and Sims Avenue drives at the corners.
- **Naming:** unchanged. A business is named only when Google Maps lists it at that address and its sign shows in the photograph. Other buildings are labelled by address, with their signboards drawn and their lettering blank.

## The walk

| Stop | Side | Source way | Building | Status |
| --- | --- | --- | --- | --- |
| 1 | West | 454254264 | No. 301 Geylang Road, the corner block: its Lorong 17 faces | Done; named Sheng Siong Supermarket and Anytime Fitness Geylang Central |
| 2 | West | 454254236 | Feng Shang Hair Salon and the north bay | Done; named; footprint question 36 |
| 3 | West | 454254237 | Nos. 9–15, a row of four shophouses | Done; unnamed |
| 4 | West | 454254272 | No. 17, General Board of True Jesus Mission | Done; named |
| 5–14 | West | 454254273 … 454254280 | The rest of the west row, from the Yang Clan General Association | Massing, to rebuild |
| 15 | West | 682928766 | No. 130 Sims Avenue, the corner: its Lorong 17 face | To check |
| 16 | East | 682928733 | No. 134 Sims Avenue, the corner | Massing, to rebuild |
| 17–18 | East | 454254307, 454254308 | South of No. 134 | To do |
| 19 | East | 454254240 | The long building | To do |
| 20 | East | 454254238 | | To do |
| 21–24 | East | 454254249 … 454254251 | Four narrow units | To do |
| 25 | East | 454254253 | The Geylang Road corner house | To do |

A stop is a building as photographed, not a source way. Where the two disagree, the difference is recorded below and, if it needs the owner, logged in [open questions](open-questions.md).

## West side

### 1. No. 301 Geylang Road: Sheng Siong Supermarket and Anytime Fitness Geylang Central

The four-storey corner block runs from Lorong 15 to Lorong 17. Its Geylang Road, Lorong 15 and Lorong 15 corner faces were modelled in the widened ring (`src/ring-a-layout.mjs`). Its two Lorong 17 faces, source edges 2 and 1, were plain walls.

- **Lorong 17 splayed corner (edge 2):** three floors of seven-pane, orange-framed windows under blue sunshade bands, as on the other faces. The supermarket's 昇菘超市 lettering and mark are on the first-floor glazing. The ground floor is a Bee Cheng Hiang shop: red awning, three yellow boards and yellow vertical signs at both ends.
  - **Measurement:** `xZa1…` (April 2024) and `R0li…` (June 2024), seen from opposite sides of the corner, agree on its two ends on the source plane: the splay photographs **8.8 m** wide against the 7.32 m source edge.
- **Lorong 17 face (edge 1):** from the corner going north:
  - one bay of six-pane windows on three floors under the sunshade bands;
  - a blue glass curtain-wall stair tower, rising about 0.35 m above the parapet;
  - a plain wall to the north end.
  - **Ground floor:** a glazed shopfront, food-photo boards, a shuttered unit under a dark awning, the stair tower's lobby door and glass panel, and a grilled gate.
  - **Measurement:** read on a frame rectified from `BUPe…` (April 2024), which looks square at the face from 8 m. On a plane **0.9 m in front of** the source edge, the band spacing matches the other faces. The face photographs about **13.5 m** against the 14.9 m source edge. A street tree hides most of the face from the June 2024 drive.
- **Layout:** both faces are laid proportionally on their source edges. Storey and band heights are the block's existing ones.
- **Naming:** Google Maps lists two tenants at 301 Geylang Road in October 2026, sharing a point inside the way:
  - **Sheng Siong Supermarket**, #01-02, open 24 hours;
  - **Anytime Fitness Geylang Central**, #04-01, open 24 hours.

  Both signs are photographed: the supermarket's lettering on the window banners and awning valances, and the gym's black blade on the Geylang Road face. So the block is named after them, and those signs are redrawn in original type, with no claim about the other floors. Bee Cheng Hiang (301 Geylang Road) is listed as permanently closed, so its boards stay blank, and the BCH@301 rooftop sign stays blank with it.
- **Change of identity:** the place id changes from `gr-301` to `sheng-siong-301`.

Use `?review=sheng-siong-301`.

### 2. Way 454254236: Feng Shang Hair Salon

A white two-storey building of two bays on the north side of the back lane behind No. 301. It has a thin cantilevered roof slab, four windows under louvred vents, and a five-foot way. The back-lane end is a cream gable.

- **South bay:** a hair salon, with:
  - a black board reading 峰尚造型 HAIR SALON on the front, and another on the gable;
  - a fascia reading 峰尚造型 Feng Shang Hair Salon over the glazed front;
  - a blue side door and two barber poles.
- **North bay:**
  - a narrow dark door with door-god posters under a black board reading **聖靈花炶聯誼会**;
  - a glass office lettered **Dr Handy** behind a folding gate.

  Neither is listed on Google Maps, so both boards stay blank.
- **Measurement:** `h2GM…` and `qC7t…` (June 2024) triangulate the four upper windows and the north party line. All five agree on a front **1.4–1.7 m in front of** the source edge. On that plane the building is **12.5 m** wide against the 9.04 m source edge: 1.56 m south of the source corner to 11.35 m north of it, meeting way 454254237. Heights were read on the same plane.
  - Five-foot way: 3.25 m.
  - First-floor ledge: 4.64–4.8 m.
  - Windows: 4.91–6.13 m.
  - Vents: 6.36–6.73 m.
  - Roof slab: 7.8–8.6 m.
- **Layout:** the elevation is laid proportionally on the source edge (×0.72), so the windows draw narrower than photographed. Authoring the footprint on the photographed front is [open question 36](open-questions.md).
- **Naming:** Google Maps lists **Feng Shang Hair Salon** (hair salon, operating in October 2026) at 5 Lorong 17 Geylang, floor 1.
  - Its point lies 1.3 m in front of the source front, inside the photographed front.
  - Google's address point for **7 Lorong 17** Geylang also falls in this way, and no door number is visible.
  - Open question 12 allows a clearly signed occupant when published addresses disagree, so the salon's boards and fascia are redrawn in original type and the conflict is recorded. No claim is made about the north bay or the upper floor.

- **House numbers, from stop 3:** the door plates **13** and the letterbox **11** on way 237 number its bays 9, 11, 13 and 15 from the south. That makes way 236's bays Nos. 5 (the salon, as listed) and 7 (the north bay, where Google's address point for No. 7 falls). So the two listings agree after all.

Use `?review=feng-shang`.

### 3. Way 454254237: Nos. 9–15

A row of four white two-storey shophouses under one pitched roof with a front gutter. Each bay has two windows under louvred vents and a five-foot way. From the south:

- **No. 9:** a shrine hall. Its white signboard carries two dragon reliefs, a round emblem and red lettering reading **友誼聯誼會**, over a 齊天大聖 altar and stone lions.
- **No. 11** (letterbox 11): a small altar, a window, a grilled door and a roller shutter.
- **No. 13** (door plates 13): the **Char Yang (Dabu) Lee Chee Association**, with a blue board reading 茶陽(大埔)勵志社 CHAR YANG (DABU) LEE CHEE ASSOCIATION.
- **No. 15:** the blue band carried on, two air-conditioners on brackets and a 福家 gate.

- **Measurement:** two pairs of June 2024 panoramas (`qC7t…` with `GX6R…`, and `M_9s…` with `GX6R…`) triangulate the four party lines.
  - The front stands on the source edge at its south end and about **1.2 m behind** it at its north end.
  - It is **26.6 m** long against the 26.16 m source edge, with bays of about 6.35, 6.6, 6.6 and 7.0 m.
  - Read on that line: five-foot way 2.8 m, ledge 4.5 m, windows 4.6–5.92 m, vents to 6.25 m, eaves at 7.0 m.
- **Layout:** laid proportionally on the source edge. Its south end meets the photographed north end of way 236, about 0.5 m apart, which supports open question 36.
- **Naming:** none.
  - Google Maps lists the Char Yang (Dabu) Lee Chee Association at 13 Lorong 17 Geylang but marks it **permanently closed**, so its board is blank, as at the 291 Eating House.
  - 友誼聯誼會 is not listed.

Use `?review=l17-9-15`.

### 4. Way 454254272: No. 17, General Board of True Jesus Mission

The source map leaves a 5.6 m gap between ways 237 and 272. It is a side passage with bollards, so No. 17's south wall is exposed. The building is white and three storeys high:

- **Ground floor:** behind a five-foot way, a board reading 眞耶穌教會總會 GENERAL BOARD OF TRUE JESUS MISSION over a grilled wooden door (door plate 17) and a stair.
- **First floor:** two windows under louvred vents, with air-conditioners below them and a vertical blade sign at the south corner.
- **Second floor:** a balcony parapet repeating the lettering (會總會教穌耶真, read right to left) under two windows and vents, inside a projecting roof frame.
- **Measurement:** `GX6R…` paired with `zA0h…`, and with `qKWw…` (June 2024), triangulate its two ends **5.9 m** apart, about 1.6 m south of the source corners and 1–2 m in front of the source edge. Heights read on a plane 1.5 m forward:
  - first-floor ledge at 3.73–4.0 m;
  - first-floor windows at 4.56–5.73 m;
  - balcony parapet at 7.38–8.44 m;
  - roof frame to **10.9 m**.

  The east-ring massing had given this way 14 m.
- **Layout:** laid on the 5.70 m source edge. The south wall on the passage carries five small windows.
- **Naming:** Google Maps lists **General Board of True Jesus Mission (TJM)**, a Christian church, at 17 Lorong 17 Geylang, Singapore 388547, with its point inside the way. So its boards, parapet and blade are redrawn in original type.

Use `?review=true-jesus-mission`.
