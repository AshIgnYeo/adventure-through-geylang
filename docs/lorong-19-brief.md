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

## Status, 13 October 2026

**Complete.** All 20 stops are modelled. Every building on Lorong 19 between Geylang Road and Sims Avenue, with the corners at both ends and the Geylang Road row back to Lorong 17, now has its photographed front.

- **Coverage:** 20 source ways, all photographed exteriors; none is left as a generic block.
- **Named places:** eleven are added, bringing the study to 126:
  - Eminent Frog Porridge & Seafood at No. 323 Geylang Road;
  - The Primero, No. 1 (with B&S's paint-shop board);
  - the Nanyang Chee Clan Association, No. 21;
  - Chee Hoe Hong, No. 25;
  - Lei Zang Si, No. 29;
  - Starlon and Tektron Pacific, No. 33;
  - He Ping Claypot Rice Restaurant, No. 148 Sims Avenue;
  - Kang Ha Pheng Sim Kok, 1 Lorong Bachok;
  - Bougainvilla Apartments, No. 10;
  - Sims Point, No. 4;
  - Straits Laundry, Nanyang Hardware and Romance Adult Shop, Nos. 325–333 Geylang Road.
- **Open questions:** four for the owner, 43–46 in [open questions](open-questions.md):
  - **43:** taking in the block faces back to Lorong 17;
  - **44:** the east side's footprints;
  - **45:** re-cutting the Geylang Road row, and naming Scarlett Supermarket and Mary Hair Salon;
  - **46:** the west side's footprints.

## The walk

| Stop | Side | Source way | Building | Status |
| --- | --- | --- | --- | --- |
| 1 | West | 454254263 | No. 323 Geylang Road, the west corner: Eminent Frog Porridge & Seafood | Done; named; west row question 46 |
| 2 | West | 454254248 | No. 1, The Primero | Done; named (the building, and B&S's board); question 46 |
| 3 | West | 476113985 | No. 3, a dark brown modern house | Done; unnamed; question 46 |
| 4 | West | 454254241 | No. 21, Nanyang Chee Clan Association | Done; named |
| 5 | West | 476113983 | No. 23 | Done; unnamed |
| 6 | West | 476113984 | No. 25, Chee Hoe Hong | Done; named |
| 7 | West | 454254239 | No. 29, Lei Zang Si | Done; named |
| 8 | West | 454254309 | No. 33, Treasures @ G19: Starlon and Tektron Pacific | Done; named after two tenants |
| 9 | West | 454254310 | No. 146 Sims Avenue, the west corner | Done; unnamed |
| 10 | East | 454254339 | No. 148 Sims Avenue, the east corner: He Ping Claypot Rice Restaurant | Done; named; question 44 |
| 11 | East | 454254314 | Kang Ha Pheng Sim Kok, 1 Lorong Bachok | Done; named |
| 12 | East | 454254247 | No. 10, Bougainvilla Apartments | Done; named; footprint question 44 |
| 13 | East | 1223524381 | Nos. 6–8, a granite-clad block | Done; unnamed; footprint question 44 |
| 14 | East | 454254246 | No. 4, Sims Point | Done; named; footprint question 44 |
| 15 | East | 454254168 | Nos. 325–333 Geylang Road, the east corner: Straits Laundry, Nanyang Hardware and Romance Adult Shop | Done; named after three tenants; footprint question 44 |
| 16–20 | Geylang Road | 454254254 to 454254262 | Nos. 313–321, the row between Lorong 17 and Lorong 19 | Done; unnamed for now; row question 45 |

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
- Authoring the footprint on its photographed position is part of [open question 46](open-questions.md), with its party wall settled with the Geylang Road row ([open question 45](open-questions.md)).

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
- On its photographed line, the face would stand about 6 m from the centreline. The offset is part of [open question 46](open-questions.md).

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

### 9. Way 454254310: No. 146 Sims Avenue, the Lorong 19 west corner

A back lane separates No. 33 from a cream three-storey corner coffeeshop.

- **Upper floors:** windows in pairs under curved concrete hoods, with bathroom louvres at the south end and a stepped parapet.
- **Corner:** splayed.
- **Street level:** an open coffeeshop under a maroon awning of the gas supplier Union Energy Group. Its boards:
  - on the lane: a cream board reading 中国炒菜 杂菜饭;
  - on the splay: a yellow board reading 中国炒菜·杂菜饭;
  - on Sims Avenue: a yellow board reading **津程餐室 JING CHEN EATING HOUSE**, and stall boards (板面, LẨU GÀ CÔ BA).
- **Back lane:** a metal spiral stair and a tall exhaust duct. Both are added as side faces.

**Measurement:**
- The depth scores were weak, so the depth was read from the 中国炒菜 杂菜饭 board's position in three lane panoramas (`2Ytw…`, `FrRZ…`, `7HvC…`). They agree on a plane about **1.5 m in front of** the source edge.
- On that plane the lane face runs about **20.9 m**, from 2.0 m south of the source corner to the splay, against the 21.02 m source edge. The south end was read from `IzKm…` and `2Ytw…`.
- **Heights:**
  - five-foot way: 3.9 m;
  - windows: 5.1–6.4 and 8.6–9.9 m;
  - hoods: 7.1–7.8 and 10.75–11.6 m;
  - parapet: about 12 m.
- The splay and the Sims Avenue front were read from `EVsA…` on the Sims Avenue drive.

**Layout:**
- The lane face is laid on its source edge (×1.01).
- The splay (edge 1) and the Sims Avenue front (edge 0) are side faces. Their source edges stand 6.0 m and 4.3 m from Sims Avenue's centreline, inside the estimated carriageway, so their street-level pieces are held within 0.25 m (`heldFlat` on each side).

**Naming:** none.
- **Closed:** Google Maps lists Jing Chen Eating House at 146 Sims Ave but marks it permanently closed. Rong Cheng Fu Qing Restaurant, also at No. 146, is closed too.
- **Current tenants:** Monster Eating House, and Thai and Vietnamese stalls. Their signs were not photographed.
- The other boards name no business. Every board is blank.

Use `?review=sims-146`.

**West side complete.** Every building from No. 323 Geylang Road to No. 146 Sims Avenue now has its Lorong 19 front. Their photographed fronts stand off their source edges by between 3.5 m forward (No. 323) and 2.6 m back (The Primero): [open question 46](open-questions.md).

## East side

### 10. Way 454254339: No. 148 Sims Avenue, He Ping Claypot Rice Restaurant

A cream two-storey corner coffeeshop on the east corner of Lorong 19 and Sims Avenue.

- **Upper floor:** windows between pilasters with ornate red and green relief capitals, under a moulded frieze and deep eaves. A brown cornice runs at first-floor level, and a salmon-tiled bay stands at the south end.
- **Corner:** a dark wooden board with **和平** in white calligraphy.
- **Street level:** an open coffeeshop under grey awnings of the gas supplier TSH Gas, lettered Esso LPG.

**Measurement:**
- **Lane face:**
  - `7HvC…` with `FrRZ…`, and `FrRZ…` with `2Ytw…`, agree on it **0.5 m in front of** the source edge.
  - Its south end on the back lane triangulates 21.7 m from the source corner (`2Ytw…` with `IzKm…`). So the face is about **22.2 m** long, against the 19.64 m source edge.
- **Sims Avenue front:** bearings from `8peX…` and `X9ak…` put its party line with No. 150 **3.6 m inside** the source outline and 1.2 m behind its front. So the Sims front is only about **5.9 m** wide, against the 9.04 m source edge.
- **Heights:**
  - cornice: 4.45–4.9 m;
  - windows: 5.8–7.45 m;
  - eaves: about 8.8 m.

**Layout:**
- The lane face is laid proportionally on its source edge (×0.88).
- The Sims front is a side face, laid from the corner at its photographed scale.
- The source outline's east 3.5 m on Sims Avenue is drawn plain, in No. 150's pale green, since No. 150 itself is outside the study.
- The Sims front stands at the edge of Sims Avenue's estimated carriageway, so its awning is held flat.
- The source outline is too wide and too short. Authoring it is part of [open question 44](open-questions.md).

**Naming:** Google Maps lists **He Ping Claypot Rice Restaurant**, a Chinese restaurant, at 148 Sims Ave, Singapore 387470, with its point inside this way. So the 和平 board is redrawn in original type. The awnings name a gas supplier and stay blank.

Use `?review=he-ping`.

### 11. Way 454254314: 1 Lorong Bachok, Kang Ha Pheng Sim Kok

A back lane separates He Ping from an ornate cream two-storey Peranakan corner house of **1929**, on the corner of Lorong Bachok.

- **On Lorong 19,** behind a green railing:
  - a verandah of square columns with tall coloured relief panels of plants, figures and a soldier;
  - a frieze of animals in relief over it: tigers, a leopard, a hound, birds;
  - above a brown cornice, pairs of shuttered windows with arched fanlights, between pilasters carrying coloured relief and tile panels;
  - an ornate cornice and deep eaves, under a tiled hipped roof.
- **Back-lane end:** a lower white annex wall carrying a wire fence.
- **On Lorong Bachok:**
  - the entrance, a grille gate under a dark board reading **江夏平心阁 KANG HA PHENG SIM KOK**, between soldier piers;
  - a curved pediment above, reading **江夏 平心閣 1929**.

**Measurement:**
- **Depth:** the lane panoramas' depth score peaked 3–4 m in front of the source edge. That turned out to be the street trees in front of the railing.
  - Bearings to the corner pier from `BwN…` and `MXq6…` put the front within 0.7 m of the source line.
  - On the source plane, `IzKm…`, `XLi…` and `BwN…` agree on the elevation.
- **Extent:** the house runs from the annex wall, 2.8 m along the source edge, to the corner pier, 24.9 m along. The source edge is 26.5 m long.
- **Columns:** at about 5.85, 10.05, 14.25 and 18.9 m, with the corner pier at 23.35–24.9 m.
- **Heights:**
  - verandah: to 4.0 m;
  - animal frieze: 4.05–4.75 m;
  - cornice: 4.8–5.25 m;
  - upper windows: 5.95–7.45 m, with fanlights to 8.0 m;
  - ornate cornice: 8.6–9.1 m;
  - eaves: about 9.5 m.

**Layout:**
- **Placement:** the elevation is laid at its own scale, with its corner on the source corner (u = s + 1.6). So the outline's 4.4 m surplus falls at the back-lane end, where it is drawn as the annex wall.
- **Volumes:** the main house is a raised volume under a hipped roof. The shell below it is the annex's height.
- **Lorong Bachok face:** a side face carrying the entrance, its board and the pediment.

**Naming:** Google Maps lists **Kang Ha Pheng Sim Kok**, an association, at 1 Lorong Bachok, with its point inside this way. So the entrance board and the pediment's lettering are redrawn in original type.

Use `?review=kang-ha-pheng`.

### 12. Way 454254247: No. 10, Bougainvilla Apartments

South of No. 6, past an open car park at Lorong Bachok, a white apartment block stands behind a lawn and a white railing with beige posts. It has a ground-floor car porch and seven floors above.

- **Upper floors:**
  - angled corner bays of windows at both ends;
  - single windows in beige surrounds;
  - a beige central bay of paired windows with balconies, rising to an open gable.
- **Under the porch:**
  - a lobby with raised lettering reading **BOUGAINVILLA Apartments**;
  - a plate reading **10**;
  - a blue sign reading BOUGAINVILLA APT.

**Measurement:**
- The lane panoramas stand about 18 m from the source edge, and street trees hide the lower floors, so the depth scores failed. Bearings were used instead:
  - the No. 10 plate (`NzRD…` with `C6Wg…`) lies **4.5 m in front of** the source edge;
  - so does the north-west corner (`ZqOX…` with `C6Wg…`, 4.45 m).
- Only on that plane do the floors repeat at a believable 3.1 m. On the source plane they read 4.3 m.
- On that plane the front runs from 1.3 m south of the source corner to 23.1 m north of it: about **24.4 m**, against the 22.18 m source edge.
- **Heights:**
  - porch: to 4.4 m;
  - floors: every 3.1 m from 4.6 m;
  - parapet: 28.3 m;
  - gable: to about 31 m.

**Layout:**
- Laid proportionally on the source edge (×0.91), about 4.5 m behind its photographed line.
- The railing is drawn at its photographed position along the pavement.
- Authoring the footprint is [open question 44](open-questions.md).

**Naming:** Google Maps lists **Bougainvilla Apartments**, an apartment complex, at 10 Lor 19 Geylang, Singapore 388492.
- Its point lies in the block's rear way (454254245), outside the study.
- The address, the plate and the lettering agree on this building, so it is named, as at Crystal Mansions (open question 32). The lobby lettering is redrawn in original type.

Use `?review=bougainvilla`.

### 13. Way 1223524381: Nos. 6–8

A granite-clad block of four storeys between Bougainvilla Apartments and Sims Point, over a five-foot way on round white columns.

- **Upper floors:**
  - a deep granite band over the five-foot way;
  - a recessed frame of vertical granite fins, holding two rows of six windows;
  - single windows in the side bays;
  - a parapet at about 15.3 m.
- **Five-foot way, from the north:**
  - a green door lettered LOFT;
  - roller shutters with a plate reading **NO 8**;
  - a glazed front under a board reading 三福園地 San Fu Yuan Di Learning Center, No. 6;
  - an orange pier and a column plated **6**, with a red B&W (Bed & Workspace) blade sign above.

**Measurement:** the front stands far in front of the source edge.
- Bearings from `0tJ_…` and `ZqOX…` put the LOFT door, on the back wall of the five-foot way, **6.5 m forward**.
- On a plane 7.5 m forward, the granite face runs from 2.4 m north of the source corner to 13.0 m south of it: about **15.4 m**, against the 11.19 m source edge.
- Heights, read on that plane from `0tJ_…`, which stands square to it:
  - five-foot way: to 3.45 m;
  - granite band: to 5.9 m;
  - windows: 6.1–7.6 and 10.7–12.4 m;
  - frame: to 13.9 m;
  - parapet: 15.3 m.

**Layout:**
- Laid proportionally on the source edge (×0.73), about 7.5 m behind its photographed line.
- Authoring the footprint is [open question 44](open-questions.md).

**Naming:** none.
- Google Maps lists several firms at 6, 6A and 8 Lor 19 Geylang: Voice Add, Jill Leong Advertising & Design, the Real Estate Academy. None of their signs was photographed.
- San Fu Yuan Di Learning Center is listed at Lorong 29, and B&W is not listed.
- The businesses listed at Nos. 6 and 8 with signs (a massage parlour, JJ Recycling, Carefree Clearwater) are closed.

Use `?review=l19-6-8`.

### 14. Way 454254246: No. 4, Sims Point

A cream apartment block of eight storeys over a ground-floor car park.

- **Front:**
  - three stacks of curved bay windows, with beige spandrels and rounded crowns;
  - narrow columns of small windows between them;
  - a stair tower lit by a slot of windows, rising above the parapet.
- **Boundary wall:** past a driveway gate, a balustraded beige wall along the pavement, with a panel lettered **SIMS POINT**.

**Measurement:**
- Four June 2024 lane panoramas (`0tJ_…`, `NZfk…`, `gWQb…`, `ukZW…`) agree on the façade **3.2 m in front of** the source outline's northern lane edge (edge 9).
- On that plane it runs about **19.5 m** along the lane.
- The wall's panel triangulates 8.5 m in front of edge 9 (`NZfk…` with `gWQb…`).
- **Heights:**
  - windows: from 5.0 m, every 3.1–3.4 m;
  - parapet: about 25.7 m;
  - bay crowns: to 28 m;
  - stair tower: to 28.5 m.

**Layout:**
- The source lane face is stepped: edges 11, 9, 7, 5 and 3, within 1.6 m of one line, about 23.5 m in all.
- So the elevation is read as one, laid at its own scale, and sliced across the stepped edges: edge 9 is the front, the others side faces. Windows cut at a step are inset by their sills.
- The boundary wall is kept straight along its photographed line, with each edge's step taken out.
- The façade stands up to 3.2 m behind its photographed line. This is part of [open question 44](open-questions.md).

**Naming:** Google Maps lists **Sims Point**, an apartment complex, at 4 Lor 19 Geylang, Singapore 388489, and the source map names this way Sims Point.
- The listing point lies in Nos. 6–8's way next door.
- But the address, the map and the lettering agree on this building, so it is named (as at Crystal Mansions, open question 32). The panel is redrawn in original type.
- Poly Realty is listed at #01-01, but no sign for it was photographed.

Use `?review=sims-point`.

### 15. Way 454254168: Nos. 325–333 Geylang Road, the Lorong 19 east corner

A freshly painted white three-storey block on the east corner of Lorong 19 and Geylang Road.

- **Elevation:** green steel windows between louvred vent bands, under projecting grey sunshades, over a five-foot way on square columns.
- **Along Lorong 19,** behind a strip of nose-in parking: four window bays over meter boxes, a door, a parking sign and vacant glazed units.
- **On Geylang Road,** from the corner:
  - two vacant glazed units: the former OCBC Geylang, listed at 325/327 and permanently closed;
  - a shop under a lit board reading **ROMANCE ADULT SHOP 情趣商店**;
  - a paint shop under orange NIPPON PAINT boards, and a board reading **南洋 NANYANG HARDWARE PTE LTD**;
  - a launderette under a board reading **STRAITS LAUNDRY**.

**Measurement:** the block stands about **7 m east of** its source outline.
- **The lane drive:** it passes only 1–2 m from the source lane edge, which lies 2.4 m from the lane's centreline. But the façade stands well back.
- **Lane face:** on a plane 7 m behind the source edge, `ukZW…`, `PDfr…` and `_V35…` agree on its four window bays, about 6 m apart. On the source edge, and 3.7 m behind it, they disagree.
- **The parking sign:** it triangulates 3.7 m behind the edge. It stands on a pole at the parking strip, not on the façade.
- **Geylang Road front:** the drive (`sH6C…`, `YYHF…`, `rxHH…`, `KMWZ…`, `SGbX…`) puts it 1.5 m forward. It runs from the corner, **7.2 m east of** the source corner, to a glass building 34.5 m along: about **27.3 m**, against the 28.02 m source edge.
- **Size:** the lane face is about 23.4 m against 22.26 m, so the outline's size fits and only its position is off. This is like No. 134 Sims Avenue on Lorong 17 (open question 39).
- **Heights** (on the Geylang Road plane):
  - five-foot way: to 3.5 m;
  - windows: 5.5–6.8 and 9.3–10.7 m;
  - vents: above and below each window row;
  - sunshades: 7.65–7.95 and 12.0–12.3 m.

**Layout:**
- **Placement:** both faces are laid proportionally on their source edges: the lane face as the front, the Geylang Road front as a side face.
- **Held flat:** the lane face stands in the lane's estimated carriageway, so it is flagged `heldFlat`. Its pieces are held within 0.25 m of the wall.
- **Geylang Road front:** it stands clear of its carriageway, so it overrides the flag (`heldFlat: false` on the side). Its corner column and ledge start 0.8 m in, out of the lane's carriageway.
- **Known fault:** June 2024 camera poses on the lane stand inside the model. Moving the outline is [open question 44](open-questions.md).

**Naming:** Google Maps lists three tenants with their points inside this way, all photographed with their signs:
- **Romance Adult Shop** (331 Geylang Rd);
- **Nanyang Hardware Pte Ltd** (331 Geylang Rd);
- **Straits Laundry's Geylang Road** (333 Geylang Rd, open 24 hours).

So the block is named after them, as No. 301 was on Lorong 17. Their boards are redrawn in original type, without the paint brand. The closed bank's units stay plain.

Use `?review=straits-laundry-331`.

**East side complete.** Every building from No. 148 Sims Avenue to No. 325 Geylang Road now has its Lorong 19 front.

## Geylang Road, Lorong 17 to Lorong 19

### 16–20. Ways 454254254 to 454254262: the row of Nos. 313–321

A row of two-storey shophouses between the Lorong 17 corner house and No. 323. They are cream, with louvred-shuttered windows under vent bands and corrugated eaves, over five-foot ways.

**Six houses are photographed. From the west:**
1. A shop under a yellow board with a portrait.
2. A shop under a dark awning, with an agent's board upstairs reading DAVID and a telephone number.
3. A salon under a green board reading **马丽发廊 MARY HAIR SALON**, with a green vertical sign.
4. and 5. Two houses holding a supermarket under blue boards reading **思家客 SCARLETT**, with a striped awning.
6. A mart under a fruit-stall banner, plated **321**.

**Measurement:**
- `PcP8…`, `YBiU…`, `0XmL…` and `H9pO…` (June 2024) agree on the row on its **source front**: on that plane the seams between panoramas are cleanest, 1 m either way they double.
- **Extent:** the row runs **29 m**, from the corner house's party wall at s = −27.6 to No. 323's at +1.4 (s is measured along No. 323's front from its source west corner).
- **Party walls:** at −23.0, −18.0, −12.85, −8.65 and −2.85.
- **Six houses** of about 4.5, 5.0, 5.15, 4.2, 5.8 and 4.25 m. The map has **five ways** of 5.3 m for them (26.5 m).
- **Heights:**
  - five-foot way: 3.3 m;
  - ledge: 4.1–4.3 m;
  - windows: 5.0–6.2 m;
  - vents: 6.5–6.9 m;
  - eaves: 7.6–7.9 m.

**Layout:**
- **Elevation:** the whole elevation is laid proportionally (×0.91) on the five ways and shared out between them by slicing, as Nos. 37–41 Lorong 17 were before open question 37 split them (`geylangRow19` in the layout).
- **Held flat:** the source fronts stand about 6.3 m from Geylang Road's centreline, at its estimated carriageway's edge. So, as on No. 323's Geylang Road side, street-level pieces are held within 0.25 m of the walls.
- **Re-cutting the row** into its six houses is [open question 45](open-questions.md).

**Naming:** none for now. Two signs could be named once the row is re-cut:
- **Scarlett Supermarket @ Geylang:** listed at 317 Geylang Road, operating, with its point in way 454254260 (as is the steamed-bun stall Dough Magic @ Geylang Road Scarlett). But its two houses straddle three source ways.
- **Mary Hair Salon:** its board is photographed and its listing point lies on the salon's house. But the listing's address is 538 Geylang Road. Mery Salon, at 313, is closed.

**Blank boards:**
- Lee He Trading, 好鲜生 and Absolute Liquor are listed at 321, but the mart's banner names none of them;
- Good Bargain (319) is closed;
- the other boards name no listed business.

Use `?review=gr-l19-row-1` to `?review=gr-l19-row-5`.

## The owner's answers applied, 13 October 2026

All four questions from the walk were answered with the recommended option ([open questions](open-questions.md), tenth batch).

### Question 46: the west side on its photographed line

Group `lorong-19-west` in `src/authored-footprints.mjs` replaces nine source ways.

- **No. 323, Eminent (`l19w-323`):** each edge of the source outline is moved in parallel.
  - the lane face 3.5 m forward;
  - the Geylang Road front 0.4 m back;
  - the party wall with No. 321 1.4 m east;
  - the rear kept.

  The Geylang Road front is now 7.4 m, and carries its plain west pilaster.
- **The Primero (`l19w-1`):** its front is re-spaced from 0.8 m south of the source corner to 1.0 m north of the north corner. It stands 2.2 m back at its south end and 2.6 m at its north end. Its central tower now sits inside the rear step, which is 2.95 m behind the front.
- **Nos. 3–25 (`l19w-3`, `-21`, `-23`, `-25`):** one re-spacing along No. 23's source front, so No. 3 and No. 21 keep their shared wall.
  - No. 3's front 2.3 m back;
  - Nos. 21–25 1.25 m back;
  - party lines at −8.3, 0, 10.0 and 17.6 m. The No. 3/No. 21 wall is taken between the two houses' readings.
- **Lei Zang Si (`l19w-29`):** 1.5 m back, 14.4 m from 1.8 m south of the source corner.
- **No. 33 (`l19w-33`):** 1.5 m back, 24.4 m from 0.5 m north of the source corner.
- **No. 146 Sims Avenue (`sa-146`):** moved 1.8 m south, with its shape kept.
  - Before moving it, bearings from three Sims Avenue panoramas (`u2pt…`, `dBpl…`, `EVsA…`) were taken to its splay pier. They agree to within 2 cm, 1.8 m south of the source splay and on the source lane line.
  - The 1.5 m forward reading in stop 9 came from the boards, which stand proud of the wall.

**Effects:**
- **Widths:** each elevation is laid on its photographed width.
- **Held flat:** The Primero's and No. 33's fronts now stand clear of the lane's carriageway, so their awnings and boards are drawn at their photographed depth and the `heldFlat` flags are dropped.
- **Eminent's awning:** it is held to 0.9 m, because the lane face is now 4.3 m from the lane's centreline.
- **Shell insets:** the Primero's re-spaced front is 0.8° off its kept side walls, and No. 3's north wall steps back along No. 21's. So their five-foot-way shells are inset from the party walls (`shellInset`).
- **Code:** `warpRow` takes an optional `sourceFront`, and a `front` given as a function, for houses whose fronts lie off the row's line. `offsetEdges` moves the edges of an outline in parallel.
