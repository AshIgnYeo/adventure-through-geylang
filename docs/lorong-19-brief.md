# Lorong 19 Geylang

Research and implementation from **12 October 2026**, under open question 42. This brief covers `src/lorong-19-layout.mjs`.

## Scope and method

- **Stretch:** Lorong 19 from Geylang Road to Sims Avenue, with the corner buildings at both ends of both sides. The part north of Sims Avenue, the Lorong Bachok row and the far sides of Geylang Road and Sims Avenue wait for a later pass.
- **Block faces:** the Geylang Road houses between Lorong 17 and Lorong 19 are taken in, because the Geylang Road link runs past them. Sims Avenue Nos. 136–144 wait for measurement. Both are [open question 43](open-questions.md).
- **Map:** `scripts/prepare-map.mjs` takes the lane's buildings and its seven road ways by id, with Lorong Bachok's mouth and the Geylang Road and Sims Avenue links from Lorong 17's junctions. The study rectangle is unchanged. The lane and both links are walkable corridors (`corridors` in `map.json`), carried about 16–21 m past Lorong 19's junctions to take in the east corners' faces.
- **Order:** north up the west side from Geylang Road, then south down the east side from Sims Avenue, then the Geylang Road houses west from the corner. Each stop is one photographed building, measured and modelled before the next.
- **Imagery:** the June 2024 Lorong 19 drive, southbound, from `7HvC…` at the Sims Avenue end to `_V35…` at Geylang Road, about 10 m apart, with the Geylang Road and Sims Avenue drives at the corners.
- **Naming:** unchanged. A business is named only when Google Maps lists it at that address and its sign shows in the photograph. Other buildings are labelled by address, with their signboards drawn and their lettering blank.
- **Code:** each place is a measured elevation on one edge of its footprint, built with the lane-house helpers shared with Lorong 17 (`src/lane-house-layout.mjs`, `src/lane-house.ts`).

## The walk

| Stop | Side | Source way | Building | Status |
| --- | --- | --- | --- | --- |
| 1 | West | 454254263 | No. 323 Geylang Road, the west corner: Eminent Frog Porridge & Seafood | Done; named; footprint with the Geylang Road row |
| 2 | West | 454254248 | No. 1, The Primero | Done; named (the building, and B&S's board) |
| 3 | West | 476113985 | No. 3, a dark brown modern house | Done; unnamed |
| 4 | West | 454254241 | No. 21, Nanyang Chee Clan Association | Done; named |
| 5 | West | 476113983 | No. 23 | Done; unnamed |
| 6 | West | 476113984 | No. 25, Chee Hoe Hong | Done; named |
| 7 | West | 454254239 | No. 29, Lei Zang Si | Done; named |
| 8 | West | 454254309 | No. 33, Treasures @ G19: Starlon and Tektron Pacific | Done; named after two tenants |
| 9 | West | 454254310 | No. 146 Sims Avenue, the west corner | |
| 10 | East | 454254339 | No. 148 Sims Avenue, the east corner | |
| 11 | East | 454254314 | Kang Ha Pheng Sim Kok, 1 Lorong Bachok | |
| 12 | East | 454254247 | Bougainvilla Apartments | |
| 13 | East | 1223524381 | No. 6 | |
| 14 | East | 454254246 | Sims Point | |
| 15 | East | 454254168 | Nos. 325–333 Geylang Road, the east corner | |
| 16–20 | Geylang Road | 454254262 to 454254254 | Nos. 321 to 313, west from the corner | |

The names in the table are those Google Maps gives for each address. Whether a building is named in the model is decided at its stop.

## West side

### 1. Way 454254263: No. 323 Geylang Road, Eminent Frog Porridge & Seafood

A cream two-storey corner shophouse at Geylang Road and Lorong 19. It has salmon pilasters, maroon louvred shutters under louvred vents, a chamfered corner and a deep-eaved hipped roof.

- **Geylang Road front:**
  - a dark board reading **明輝田雞粥海鮮煮炒店 EMINENT FROG PORRIDGE & SEAFOOD (LOR 19)**, over a yellow frog lightbox;
  - a larger frog board and red $18 promotion boards at the corner.
- **Lorong 19 face:** six bays of windows over an arcaded five-foot way under blue Tiger awnings.
  - **Stall boards between the floors:** Changi Village Nasi Lemak, Heng Wang Seafood, **Eminent Frog Porridge**, Sin Kee Hainan Chicken Rice and B.B.Q Express.
  - A green **Lor 19 Geylang** street sign on the first bay.
  - At the north end, a vertical lightbox reading 明輝田雞粥 EMINENT FROG PORRIDGE 323.
- **Extension:** north of the two-storey block, a lower zinc-roofed shop with red promotion boards.

**Measurement:**
- **Lane face:** three June 2024 lane panoramas (`_V35…`, `PDfr…`, `ukZW…`) agree on it **3.5 m in front of** the source edge. The depth score between `_V35…` and `PDfr…` peaks sharply there.
  - On that plane the two-storey block runs from the corner, 0.4 m along the source edge, to its north end, 22.4 m along: about **22 m**, against the 28.71 m source edge.
  - The extension carries on to about 27 m.
- **Geylang Road front:** read square-on from `u07Y…` and `H9pO…`, about 0.4 m behind the source front.
  - It is about **7 m** wide, plus the chamfer.
  - Its party wall with No. 321 stands about 1.4 m east of the source line.
- **Result:** the building stands about 3.5 m east of its source outline, and is wider than mapped on Geylang Road.
- **Heights** (above the five-foot-way floor, the mean of the lane and Geylang Road readings):
  - five-foot way: 3.75 m;
  - first-floor ledge: 3.75–3.95 m;
  - stall boards: 4.05–4.7 m;
  - windows: 4.6–5.95 m;
  - vents: 6.15–6.55 m;
  - eaves: 7.5–7.7 m;
  - ridge: about 9.4 m.

**Layout:**
- The elevation is laid at its photographed scale from the corner on the source edges, with no stretching.
- The two-storey block is a raised volume with a hipped roof over the first 22 m (`upper` in the layout; the shared builder gained hipped upper roofs for it). The extension is the low shell.
- The Geylang Road front is a side face, laid from the corner (u = s − 3.5), so the westmost 2 m of the photographed front, a plain pilaster, falls off the source edge.
- The source front stands 0.1 m inside Geylang Road's estimated carriageway, so its street-level pieces are held within 0.25 m of the wall (`heldFlat` on the side).
- Authoring the footprint on its photographed position waits for the Geylang Road row (stops 16–20), whose party lines are also off their source lines, so the row goes to the owner as one question.

**Naming:** Google Maps lists **Eminent Frog Porridge & Seafood**, a porridge restaurant open until 4 am, at 323 Geylang Road, Singapore 389359. Its point lies inside this way.
- The listing and the photographed boards agree, so the shop board, both frog boards, the vertical lightbox and Eminent's own stall board are redrawn in original type.
- The other stall boards are not listed, and stay blank.
- This is the restaurant that left the Lorong 17 east corner (Lorong 17 stop 24).

Use `?review=eminent-frog-porridge`.

### 2. Way 454254248: No. 1, The Primero

A side lane about 5 m wide separates No. 323's rear building from this weathered grey four-storey block of five bays.

- **Upper floors:** ribbon windows between full-height piers, deep concrete hoods over the first-floor windows, ribbed balcony panels, a thick fascia under the top floor, and a raised central tower under a pyramidal roof.
- **Five-foot way, from the south:**
  - a paint shop under an orange awning and a long orange board reading **NIPPON PAINT B&S (2017) PTE LTD #01-01**;
  - a shop under a yellow board reading 显密度母林佛学会 XIAN MI DU MU LIN BUDDHIST ASSOCIATION;
  - the lobby, under raised lettering reading **THE PRIMERO**;
  - a glazed shop;
  - a red temple front under a banner reading 南北斗母宫, with gold couplets and an incense urn.
- **North wall:** three bays of windows on each upper floor along the side lane, added as a side face.

**Measurement:**
- The lane panoramas pass only about 3 m from the source face, so plane depth scores were ambiguous. Bearings were used instead.
  - **South-east corner:** `ukZW…` with `gWQb…`, **2.2 m behind** the source edge and 0.8 m south of the source corner.
  - **North-east corner:** `NZfk…` with `ZqOX…`, **2.6 m behind**, 27.7 m along.
- The face is about **28.6 m** long, against the 26.81 m source edge.
- On a plane 2.4 m behind, four panoramas agree on the elevation. The heights:
  - five-foot way: 3.1 m;
  - beam: 3.1–4.6 m;
  - windows: 4.7–6.2, 8.0–9.45 and 11.3–13.0 m;
  - hoods: about 6.6–7.0 m;
  - fascia under the top floor: 9.9–10.9 m;
  - parapet: 13.9 m;
  - tower: to about 17.6 m.

**Layout:**
- Laid proportionally on the 26.81 m source edge (×0.94), with the tower as a raised volume.
- The source face's south end stands 2.7 m from the lane's centreline, inside the estimated carriageway, so the place is flagged `heldFlat`. The awning and boards are held within 0.25 m of the wall.
- On its photographed line, the face would stand about 6 m from the centreline. The offset joins the west row's question at the end of the west side.

**Naming:**
- Google Maps lists **The Primero**, an apartment building, at 1 Lorong 19 Geylang, Singapore 388487. It also lists **B&S hardware lorong 19**, a paint store, at 1 Lor 19 Geylang #01-01.
- So the building is named after its raised lettering, and the B&S board is redrawn in original type without the paint brand's mark. No claim is made about the other premises.
- **Listing points:** The Primero's lies about 20 m west, in way 454254249 on Lorong 17. B&S's lies south of Geylang Road. But the addresses and the signs agree on this building (as at Crystal Mansions, open question 32).
- **Blank boards:**
  - the Xian Mi Du Mu Lin Buddhist Association is now listed at Lorong 21A;
  - the temple is not listed.

Use `?review=the-primero`.

### 3. Way 476113985: No. 3

A second side lane separates The Primero from a dark brown modern house of four storeys.

- **Ground floor:** open between dark columns. On its back wall: a wooden door, a window over a bank of letterboxes, and a wooden slatted gate.
- **Upper floors:** three, with four windows each, set in raised cream frames.
- **Trim:** a white strip with a tall louvred slot at the south edge, and a low gable over the parapet.
- **South wall** (on the side lane): panelled in white, beige and brown, with windows. Added as a side face.
- **North wall:** white, showing above the single-storey Nanyang Chee Clan Association. Added as a side face.

**Measurement:**
- Bearings to the two front corners disagreed in depth by 1.7 m. So the depth was read instead where three panoramas (`0tJ_…`, `ZqOX…`, `C6Wg…`) agree on the cream frames: between 1.5 m and 2.5 m behind the source edge the frames' shift between panoramas changes sign. They agree at about **2.3 m behind**.
- On that plane the front is about **9.2 m** wide, from 0.9 m south of the source corner, against the 9.45 m source edge.
- So it stands about **1.2 m** in front of the Nanyang Chee Clan Association, not the 3.5 m the source map gives.
- Heights:
  - ground floor: to 2.9 m;
  - frames: 4.7–6.8, 8.0–10.0 and 11.0–12.5 m;
  - parapet: 13.7 m;
  - gable: to about 14.8 m.

**Layout:** laid proportionally on the source edge (×1.03).

**Naming:** none. Google Maps gives an address point for 3 Lorong 19 Geylang inside this way, but lists no business there, and no sign was photographed.

Use `?review=l19-3`.

### 4–6. Ways 454254241, 476113983 and 476113984: Nos. 21, 23 and 25

Three single-storey houses under red roofs, between No. 3 and the Lei Zang Si temple.

**Measurement:** the three fronts were read together on one plane along way 476113983's front, measured from its south corner.
- **Depth:** `C6Wg…` with `NzRD…`, and `NzRD…` with `DRAX…` (June 2024), both agree on the plane **1.25 m behind** the source line.
- **Positions on that plane:**
  - No. 21: from −8.1 m to 0;
  - No. 23: from 0 to 9.9 m;
  - No. 25: from 10.1 m to 17.6 m.
- So the row drifts about 1 m north of its source ways by No. 25.
- **Layout:** each elevation is laid proportionally on its own source edge.
- **Roofs:** the ridges are set at 5.6–6.1 m. Read on the front plane they had looked about 4.7 m, because the ridges stand several metres back.

### 4. Way 454254241: No. 21, the Nanyang Chee Clan Association

- **Roof:** red corrugated, its deep fascia overhanging the front.
- **Board:** white, along the front, reading **NANYANG CHEE CLAN ASSOCIATION 南洋徐氏總會** in red.
- **Below the board:**
  - blue glazed doors;
  - a white panel with a red **徐** and XU 21;
  - a wide glazed front, with two steps and potted plants.
- **Measurement:** it photographs about 8.1 m wide, against the 7.6 m source edge.
- **Naming:** Google Maps lists **Nanyang Chee Clan Assn** at 21 Lor 19 Geylang, Singapore 388496, with its point inside this way. So the board and the panel are redrawn in original type.

Use `?review=nanyang-chee`.

### 5. Way 476113983: No. 23

- **Roof:** red tiled and hipped, over a cream house plated **23**.
- **Front:**
  - a grilled door under a dark canopy at its south end, with a red letterbox;
  - two wide barred windows behind potted plants and trees;
  - a cream beam under the eaves.
- **Measurement:** it photographs about 9.9 m wide, against the 9.13 m source edge.
- **Naming:** none.
  - Google Maps lists Commercial Industrial Supplies & Services Pte Ltd at 23 Lor 19 Geylang, with its point inside this way.
  - It also lists the Singapore PickleBall Association at the same address.
  - No sign for either was photographed.

Use `?review=l19-23`.

### 6. Way 476113984: No. 25, Chee Hoe Hong

- **Roof:** red tiled and hipped, with a deep orange fascia.
- **Front:**
  - a wide mesh-grilled window over a low wall of grey tiles;
  - a grilled doorway up two steps, under a blue board reading **志和行(私人)有限公司 CHEE HOE HONG (PTE) LTD**.
- **Measurement:** it photographs about 7.5 m wide, on its 7.49 m source edge but about 1 m north of it.
- **Naming:** Google Maps lists **Chee Hoe Hong Pte Ltd** at 25 Lor 19 Geylang, Singapore 388498, with its point inside this way. So the board is redrawn in original type.
  - Zhejiang Shenghua Steel is also listed at No. 25. Its point lies 1.7 m outside the way, and no sign for it was photographed.

Use `?review=chee-hoe-hong`.

### 7. Way 454254239: No. 29, Lei Zang Si

A white five-storey temple set back behind a garden, hung with strings of Tibetan prayer flags.

- **Windows:** blue-framed, under striped red, yellow and green lintels, in four rows either side.
- **Central bay:** blue balconies with yellow lattice balustrades, over which tall windows carry the large characters **雷藏寺**, between gold emblems and columns of black script.
- **Eaves:** blue.
- **Ground floor**, under maroon awnings: a yellow lattice gate, a glazed front and a red door with gold.
- **Garden:** shrubs, and an incense burner chimney.

**Measurement:**
- `DRAX…` with `jTV3…`, and `jTV3…` with `MXq6…` (June 2024), agree on the front about **1.5 m behind** the source edge.
- On that plane it is about **14.4 m** wide, from 1.8 m south of the source corner, against the 13.87 m source edge.
- **Heights** (the top floor allowed for the eaves' overhang):
  - window rows: about 5.0–6.7, 8.3–9.9, 11.6–13.1 and 15.2–16.8 m;
  - eaves: about 18.5 m;
  - a stair house on the roof: to about 20.6 m.

**Layout:**
- Laid proportionally on the source edge (×0.96).
- The prayer flags are not modelled.

**Naming:** Google Maps lists **Lei Zang Si (Singapore) 雷藏寺 (新加坡)** at 29 Lor 19 Geylang, Singapore 388500, with its point inside this way. So the characters are redrawn in original type.
- The emblems and the black script are drawn as plain shapes.
- Hock Hin Plastic Fabricator, listed at No. 31 with its point in this way, is marked permanently closed.

Use `?review=lei-zang-si`.

### 8. Way 454254309: No. 33, Starlon and Tektron Pacific

Across a side lane from Lei Zang Si: a white three-storey streamline block (Treasures @ G19).

- **Form:** five bays either side of two stair towers lit by tall strips of windows.
- **Bays:** paired windows on each upper floor under curved concrete hoods, with triple pink speed stripes above and below them.
- **Parapet:** stepped, with small fins over the towers.
- **South wall** (on the side lane): mauve. Added as a side face.
- **Shops in the five-foot way, from the south:**
  - a hair salon with barber poles, under a black board reading **Starlon & Spa, 33 Lorong 19 Geylang #01-05**;
  - an empty unit;
  - **Tektron Pacific**, under two boards reading *tektron pacific, the sticker & signage workshop*;
  - a florist under a board reading MISS BECCA FLORAL;
  - a green board reading QUAN AN VIETNAM;
  - two boards reading 康记冰糖葫芦, over stalls with tiled canopies.

**Measurement:**
- `BwN…` with `XLi…` (June 2024) agree strongly on the front **1.5 m behind** the source edge (depth score 0.34).
- On that plane it is about **24.4 m** long, against the 25.17 m source edge.
- **Heights:**
  - five-foot way: 3.3 m;
  - windows: 5.1–6.3 and 8.7–9.8 m;
  - hoods: 7.2–7.9 and 10.8–11.6 m;
  - parapet: about 12 m.

**Layout:**
- Laid proportionally on the source edge (×1.03).
- The source face's north end stands 2.7 m from the lane's centreline, inside the estimated carriageway. So the place is flagged `heldFlat`.

**Naming:** Google Maps lists two operating tenants with their points inside this way:
- **Starlon** (hair salon, 33 Lor 19 Geylang #01-05, Treasures @ G19);
- **Tektron Pacific** (print shop, #01-06).

Both boards are photographed and legible. So the block is named after them, as No. 301 Geylang Road was on Lorong 17, and their boards are redrawn in original type, with no claim about the other units.

**Blank boards:**
- the florist is listed as Orae Fleur, not Miss Becca Floral;
- Quan An Viet Nam is marked permanently closed;
- the candied-fruit stall is not listed.

Use `?review=starlon-tektron`.
