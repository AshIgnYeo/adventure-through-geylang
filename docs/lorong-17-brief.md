# Lorong 17 Geylang

Research and implementation from **12 October 2026**, under the owner's answer to open question 35. This brief covers `src/lorong-17-layout.mjs` and the Lorong 17 faces of the corner buildings modelled elsewhere.

## Scope and method

- **Stretch:** Lorong 17 from Geylang Road to Sims Avenue, with the corner buildings at both ends. The part north of Sims Avenue, the Geylang Road houses east of the corner and Sims Avenue Nos. 136 onward wait for a later pass.
- **Map:** `scripts/prepare-map.mjs` takes the lane's eleven new source ways and its seven road ways by id, with the Geylang Road and Sims Avenue links to its junctions. The study rectangle is unchanged. The lane and its junctions are walkable corridors (`corridors` in `map.json`, `studyArea()` in `src/geo.mjs`): within 10 m of the lane's centreline, and of the two links.
- **Order:** north up the west side from Geylang Road, then south down the east side from Sims Avenue. Each stop is one photographed building, measured and modelled before the next.
- **Imagery:** the June 2024 Lorong 17 drive (`h2GM…` at the Geylang Road end to `Zwx6…` at Sims Avenue, about 10 m apart, heading north), with the Geylang Road and Sims Avenue drives at the corners.
- **Naming:** unchanged. A business is named only when Google Maps lists it at that address and its sign shows in the photograph. Other buildings are labelled by address, with their signboards drawn and their lettering blank.

## Status, 12 October 2026

**Complete.** All 24 stops are modelled. Every building on Lorong 17 between Geylang Road and Sims Avenue now has its photographed front, including the corner buildings at both ends.

- **Coverage:** the eleven walk-ups that were massing in the widened ring now have their fronts, and No. 134 is rebuilt.
- **Named places:** eight are added, bringing the study to 115:
  - Sheng Siong Supermarket and Anytime Fitness Geylang Central at No. 301;
  - Feng Shang Hair Salon;
  - the General Board of True Jesus Mission;
  - the Yang Clan General Association;
  - the Gyaltsap Tashi Ling Buddhist Society;
  - Bright Star Hotel;
  - the Singapore Chinaware Merchants Association;
  - the Singapore Rattan Industry Association (after open question 37).
- **Open questions:** six for the owner, 36–41, all footprint or row-position questions. In each case the model keeps the source footprints until they are answered:
  - Feng Shang's footprint;
  - splitting Nos. 37–41 and naming the rattan association;
  - the west row's offset and map gaps;
  - No. 134's position;
  - the temple's full footprint;
  - the white row's two missing houses.

## The walk

| Stop | Side | Source way | Building | Status |
| --- | --- | --- | --- | --- |
| 1 | West | 454254264 | No. 301 Geylang Road, the corner block: its Lorong 17 faces | Done; named Sheng Siong Supermarket and Anytime Fitness Geylang Central |
| 2 | West | 454254236 | Feng Shang Hair Salon and the north bay | Done; named; footprint question 36 |
| 3 | West | 454254237 | Nos. 9–15, a row of four shophouses | Done; unnamed |
| 4 | West | 454254272 | No. 17, General Board of True Jesus Mission | Done; named |
| 5 | West | 454254273 | No. 19, the Yang Clan General Association | Done; upper floors named |
| 6 | West | 454254274 | No. 21, a temple on the ground floor | Done; unnamed |
| 7 | West | 454254270, 454254271 | Nos. 23 and 25, one white building of two bays (Wee Ghee Athletic Association) | Done; unnamed |
| 8 | West | 454254275 | No. 27, with the 慕德同鄉會 board | Done; unnamed |
| 9 | West | 454254276 | No. 29, the first peach walk-up | Done; unnamed |
| 10 | West | 454254277 | No. 31, a pipe shop | Done; unnamed |
| 11 | West | 454254278 | No. 33, a temple front | Done; unnamed |
| 12 | West | 454254279 | No. 35, Gyaltsap Tashi Ling Buddhist Society | Done; named |
| 13 | West | 454254280 | Nos. 37–41, three bays with the Singapore Rattan Industry Association | Done; unnamed; split and naming question 37; west row question 38 |
| 14 | West | 682928766 | No. 130 Sims Avenue, the corner: its Lorong 17 face and splay | Done; unnamed |
| 15 | East | 682928733 | No. 134 Sims Avenue, the corner | Done; unnamed; footprint question 39 |
| 16 | East | 454254307 | Nos. 42–44, a white block with a stair tower | Done; unnamed |
| 17 | East | 454254308 | Nos. 38–40, a cream block with a stair tower | Done; unnamed |
| 18 | East | 454254240 | No. 20, Bright Star Hotel | Done; named |
| 19 | East | 454254238 | A temple by No. 14 (和友社, 華德善室) | Done (a slice); unnamed; footprint question 40 |
| 20 | East | 454254249 | No. 6, Singapore Chinaware Merchants Association | Done; named; row question 41 |
| 21 | East | 454254250 | No. 4 | Done; unnamed |
| 22 | East | 454254252 | No. 2, its stair and upper floors (2A, 2B) | Done; unnamed |
| 23 | East | 454254251 | No. 2, its ground-floor shop (02) | Done; unnamed |
| 24 | East | 454254253 | The Geylang Road corner house (former Eminent Frog Porridge) | Done; unnamed |

Stops 7 (Nos. 23 and 25) and 13 (Nos. 37–41) each took in a whole photographed building, so the stops after them are numbered one and two lower than first planned. A stop is a building as photographed, not a source way. Where the two disagree, the difference is recorded below and, if it needs the owner, logged in [open questions](open-questions.md).

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

### 5. Way 454254273: No. 19, the Yang Clan General Association

A weathered cream three-storey house between dark-stained party pilasters:

- **Upper floors:** two windows under louvred vents on each floor, with air-conditioners on the ledges.
- **Balcony:** a red board with a round emblem reading 楊氏總會 YANG CLAN GENERAL ASSOCIATION, under the second-floor balcony.
- **Top floor:** a white lightbox hangs from an open window, under a dark roof frame.
- **Ground floor:** a five-foot way with a grilled gate, a small window and an open altar front.

**Measurement:** four June 2024 panoramas triangulate the two party pilasters **2.0–2.3 m in front of** the source edge.

- The south pilaster sits about 0.8 m south of the source party line.
- On a plane 2.2 m forward, the front measures **5.55 m** to the middle of the wide north pilaster.
- Heights:
  - first-floor ledge: 3.3–3.7 m;
  - first-floor windows: 4.34–5.4 m;
  - board: 6.0–6.6 m;
  - top-floor windows: 7.3–8.34 m;
  - roof frame to **10.0 m**, against the massing's 14 m.

**Layout:** laid on the 5.69 m source edge.

**Naming:** Google Maps lists **Yang Clan General Assn** at **19A Lorong 17** Geylang, Singapore 388549: the upper floors of the house after No. 17.

- Its point lies about 1 m south of this way, inside No. 17's way, where the row's 2 m registration error would put it.
- The address and the board agree, so the upper floors are named after the board, which is redrawn in original type. This follows the Bamboo Lounge precedent (open question 33).
- No claim is made about the ground floor.

**Row offset:** No. 17 and No. 19 both stand about 2 m in front of their source edges. If the rest of the row does too, it goes to the owner as one question at the end of the west side.

Use `?review=yang-clan`.

- **Correction, from stop 6:** No. 19's ground floor carries a black board reading 昆仲联… KUNTIONG A… under a red valance. It belongs to the **Kun Tiong Association**, which Google Maps lists at 19 Lorong 17 #01-19 but marks permanently closed. The board is drawn blank. The listing also confirms way 273 as No. 19.

### 6. Way 454254274: No. 21

A three-storey house north of No. 19:

- **First floor:** panelled in peach inside a brownish-pink frame, with two windows under a lattice band.
- **Top floor:** a cream balcony storey with two windows under vents and air-conditioners, under a roof slab at about **10.5 m**.
- **Ground floor:** a glazed temple front under a dark maroon scalloped awning hung with paper charms, with lotus lamps and a red banner inside.

**Measurement:** on the row's plane 2.2 m forward, `zA0h…`, `FeWy…` and `qKWw…` (June 2024) agree on the front to within 0.5 m. It runs from 0.8 m south of the source corner and is **5.4 m** long. It is laid on the 5.70 m source edge.

**Naming:** none. Google Maps lists **Bai Yun Kong Shang Fo Tang (百雲宮善佛堂)**, a Buddhist temple on floor 1, at 21 Lorong 17 Geylang, with the address point inside the way. No sign bearing its name could be read from the street, and the banner inside the glass is illegible, so it is recorded but not named.

Use `?review=l17-21`.

### 7. Ways 454254270 and 454254271: Nos. 23 and 25

One white three-storey building of two bays. Every window on the upper floors is under a corrugated metal hood, and the flat roof is at about **10.3 m**.

- **No. 23**, the south bay (letterbox 23, with a hall-rental notice):
  - a roller shutter, a wooden door and a louvred panel;
  - the maroon awning carried on from No. 21.
- **No. 25**, the north bay (door plate 25), is the **Wee Ghee Athletic Association**:
  - a yellow board reading WEE GHEE ATHLETIC ASSOCIATION between its first-floor windows, with 威義 on their glass;
  - red lettering reading 威義體育會 under them;
  - a cream folding grille gate under a red-and-white striped awning hung with Buddhist prayer flags.
- **Measurement:** on the row's plane 2.2 m forward, `FeWy…`, `zA0h…` and `gBz2…` (June 2024) agree on the building:
  - It runs from **1.0 m south to 11.1 m north** of No. 21's source corner, about 12.1 m in two bays of about 6 m.
  - It fills the 3 m gap the map leaves after No. 21.
  - Heights:
    - first-floor ledge: 3.3–3.6 m;
    - first-floor windows: 4.43–5.72 m;
    - top-floor windows: 7.72–8.86 m.
- **Layout:** each bay is laid on its own source way, 4.38 m and 4.01 m wide, so the gap stays open in the model.
- **Naming:** none. No listing for the Wee Ghee Athletic Association was found at Lorong 17; the only match is a Yiwei Athletic Association elsewhere. Its boards are blank. Google's address point for No. 25 falls in way 270, the south bay, but the door plates are clear.

Use `?review=l17-23` and `?review=l17-25`.

### 8. Way 454254275: No. 27

A white three-storey house:

- **Top floor:** recessed about 1.2 m behind a balcony, under an overhanging roof slab with plants growing on it.
- **First floor:** two windows under a vent band, with a black board reading **慕德同鄉會** in gold between them and a FOR SALE board below.
- **North side:** a dark-stained fin.
- **Ground floor:** open under a blue striped awning, with an arched window, a wooden door plated **27**, and a stair doorway under a yellow board reading 27-A.

**Measurement:** on the row's plane 2.2 m forward, `gBz2…` and `FeWy…` (June 2024) agree on its ends **5.6 m** apart, from 2.33 m south of the source corner. So it fills the 2.5 m gap the map leaves after way 271.
- Heights:
  - first-floor ledge: 3.2–3.44 m;
  - first-floor windows: 4.33–5.38 m;
  - board: 5.33–6.0 m;
  - balcony slab: 6.55–7.0 m;
  - roof slab: to **10.1 m**.

**Layout:** laid on the 5.81 m source edge. The walls stop at the balcony slab, and the set-back top floor and the roof slab are drawn as blocks.

**Naming:** none.
- The yellow board over the stair reads **番禺慕德同鄉會 27-A 二樓**, placing the association on the floor above, at 27-A.
- Neither the association nor a No. 27 Lorong 17 is listed on Google Maps. The only Panyu listing is the Poon Yue Association 番禹會館 at New Bridge Road. So the boards are blank.

**Map gaps so far:** the photographed fronts of Nos. 5–27 run continuously. The source map leaves gaps after Nos. 7 (1.3 m), 21 (3 m) and 25 (2.5 m), and the photographed buildings fill them. These go to the owner with the row offset at the end of the west side.

Use `?review=l17-27`.

### 9. Way 454254276: No. 29

The first of the pale peach three-storey walk-ups with projecting side fins:

- **Upper floors:** two windows on each, with a vent band over the first-floor windows.
- **Slabs:** a balcony slab, and a deep roof slab at about **10.9 m**.
- **Ground floor:** a dark fascia over a wooden door and an open front, with a chest freezer by the north pier.

**Measurement:** `gBz2…` and `INbo…` (June 2024) triangulate its fins on a plane **2.3 m forward**. They are 5.3 m apart, from 2.64 m south of the source corner, so No. 29 meets No. 27's photographed north end. Other heights:
- first-floor ledge: 3.4–3.75 m;
- windows: 4.75–5.75 m and 8.15–9.25 m;
- balcony slab: 7.0–7.35 m.

**Layout:** laid on the 5.80 m source edge. The east-ring massing had given it 14 m.

**Naming:** none. Google Maps lists **Kaki Co @ 17 Geylang**, an apartment building, at 29 Lorong 17. Its point lies about 2.6 m south of the way, where the photographed house stands, but no sign for it was photographed.

Use `?review=l17-29`.

### 10. Way 454254277: No. 31

A pale peach walk-up like No. 29, with side fins, a balcony slab and a deep roof slab at about 10.6 m.

- **Upper floors:** two wide, brown-framed three-pane windows on each floor, under red-brown louvred hoods.
- **Ground floor:** a glazed shop stacked with pipes and fittings, with a tiled column and **letterbox 31** at its south end.
- **Measurement:** `INbo…` and `8zSh…` (June 2024) triangulate its window edges on a plane about **1.95 m forward**.
  - With its fins, it reads about **6.4 m** wide, from 2.4 m south of the source corner.
  - Windows: 4.6–5.9 m and 7.6–8.75 m.
  - Hoods: 6.0–6.4 m and 9.1–9.5 m.
- **Layout:** laid on the 5.81 m source edge.
- **Naming:** none. Google Maps lists **Visual Gallery Singapore** (artistic handicrafts) at 31 Lorong 17, but no sign for it was photographed, and the shop holds plumbing stock.

Use `?review=l17-31`.

### 11. Way 454254278: No. 33

A pale peach finned walk-up like No. 31: two brown-framed windows under red-brown louvred hoods on each upper floor, a balcony slab, and a deep roof slab at about **11 m**.

**Ground floor:** a temple front:
- a black board with gold characters reading **覺寺** under red silk rosettes;
- a glass door between vertical couplets;
- painted lanterns and potted plants.

**Measurement:** read on a plane **2.0 m forward** from `8zSh…`, `INbo…` and `ghWQ…` (June 2024).
- Fin centres: about **7.0 m** apart, from 3.0 m south of the source corner.
- Windows: 4.75–6.05 m and 8.0–9.05 m.
- Hoods: 6.1–6.5 m and 9.4–9.8 m.

**Layout:** laid on the 5.80 m source edge.

**Naming:** none. Google Maps lists **Maha Mantra Buddhist Centre**, a Buddhist temple on floor 1, at 33 Lorong 17, with its point on the photographed house. But the board's visible characters, 覺寺, don't give that name, and part of the board is hidden by a lantern. So the board is blank.

Use `?review=l17-33`.

### 12. Way 454254279: No. 35, Gyaltsap Tashi Ling Buddhist Society

An off-white three-storey finned walk-up, taller than its peach neighbours, with a pink-stained fin to the north.

- **Upper floors:** two windows on each; white louvred vents over the first-floor windows; corrugated metal awnings over the top windows.
- **Roof and balcony:** a balcony slab, and a roof slab at about **11.4 m**.
- **Ground floor:** two gold lotus emblems on the fascia, over a long brown board with:
  - an orange disc emblem and gold lotuses;
  - lettering reading **Gyaltsap Tashi Ling Buddhist Society**;
  - a Chinese line (…察吉…林佛…會) partly hidden by hanging plants.

  Below the board: a tiled wall plated **35** and a pair of wooden doors.
- **Measurement:** `8zSh…` and `ghWQ…` (June 2024) triangulate its window edges and north fin **2.2–2.6 m forward**. Its fins are about **6.7 m** apart, from 1.5 m south of the source corner. Heights, read on that plane:
  - first-floor ledge: 3.83–4.16 m;
  - first-floor windows: 5.11–6.25 m;
  - top windows: 7.96–9.25 m.
- **Layout:** laid on the 5.81 m source edge.
- **Naming:** Google Maps lists **Gyaltsab Tashi Ling Centre**, a Buddhist temple, at **17 Lor 35 Geylang**, which looks like a transposition of 35 Lorong 17.
  - Its point lies on the photographed house, about 1 m in front of the source way to the south.
  - The board and the listing agree on the name, so the house is named after its board. Open question 12 allows a clearly signed occupant when published addresses disagree.
  - The English lettering and the emblem are redrawn in original type. The partly hidden Chinese line is not drawn.

Use `?review=gyaltsap-tashi-ling`.

### 13. Way 454254280: Nos. 37–41

One pale yellow three-storey building of three bays between projecting fins, with its roof slab at about **10.4 m**:

- **South bay (No. 37):** two windows on each upper floor, a vent band, and an open five-foot way.
- **Middle bay (No. 39):** a white board reading 新加坡籐業公會 S'PORE RATTAN INDUSTRY ASSN. between its first-floor windows.
- **North bay (No. 41):** a louvred vent band and a grilled top-floor window.
- **Ground floor of the middle and north bays:** a long yellow board reading Ah Qi Trading & Construction Pte Ltd, Islandwide Roofing & Decking Specialists, over a green awning and a builder's store.

**Measurement:** two pairs of June 2024 panoramas (`ghWQ…` with `9Tds…`, and `8zSh…` with `qR4q…`) triangulate the ends and the two fins **0.2–1.0 m behind** the source edge.
- The building is **17.4 m** long, from 2.7 m south of the source corner, with bays of about 5.4, 6.1 and 5.9 m.
- It fills most of the 4 m gap after No. 35's way.

**Layout:**
- Laid on the 14.62 m source edge. This way's front is about 3 m nearer the lane than the walk-ups' source fronts, so it already stands close to the photographed line.
- The fins and the awning are kept shallow, because the front is 4.2 m from the lane's centreline.
- The east-ring massing for the west side is now empty: every one of its eleven ways has its front.

**Naming:** none for now.
- Google Maps lists **Singapore Rattan Industry Assoc.** with its point inside this way, at "39 Sims Cl, Singapore 388562". The postal code belongs to this stretch of Lorong 17, so the association is at No. 39, the middle bay.
- Naming one bay of a three-bay way needs the way split: [open question 37](open-questions.md).
- Ah Qi Trading & Construction is listed only at Woodlands and Lim Chu Kang, so its board stays blank.
- Google's address point for No. 41 also falls in this way.

Use `?review=l17-37-41`.

- **North wall, from stop 14:** seen from the Sims Avenue end, the plain white north wall of Nos. 37–41 on the back lane carries small windows under concrete hoods near its west end. They are added as a side face.

### 14. Way 682928766: No. 130 Sims Avenue, the Lorong 17 corner

The cream three-storey corner house was modelled with its Sims Avenue front in the widened ring (`src/ring-a-layout.mjs`). Its splay and Lorong 17 face were plain walls. A back lane separates it from Nos. 37–41.

- **Lorong 17 face (edge 6):**
  - three windows on each upper floor in tan surrounds;
  - louvred vents over the first-floor windows;
  - red-and-white striped awnings over the top-floor windows, and air-conditioners;
  - the eating house's long blue awning at street level.
- **Splayed corner (edge 5):** a projecting first-floor bay with circular-motif grilles under a glazed top storey, over the yellow 福满香 FULL HOUSE F&B board.
- **Annex:** south of the face, an annex set back about 3 m carries a metal exhaust duct and a grilled verandah. Its source edge faces the notch in the outline, so the shared frame points into the building, and it is left plain.
- **Measurement:** `qR4q…` with `9Tds…`, and `Zwx6…` with `qR4q…` (June 2024), triangulate the Lorong 17 face **1.3–2.4 m west of** its source edge and about **12 m** long.
  - Its corner falls **3–4 m north** of the source corner. This is the same disagreement already recorded for this corner and for No. 134 opposite.
  - Floor heights are the house's existing Sims Avenue ones.
- **Layout:** laid proportionally on the 10.19 m source edge, with the splay on its own edge.
  - The source edge lies only 3.0 m from the lane's centreline, inside the estimated carriageway. So, as at Bengal Kitchen, the face's street-level pieces are held within 0.25 m of the wall.
  - The north end of the splay is handled the same way.
- **Naming:** none, as before. Full House F&B is listed at 128 Sims Ave with its point outside every way, so its board is drawn blank.

**West side complete.** Every building from No. 301 to No. 130 Sims Avenue now has its Lorong 17 front. The row offset and the map gaps are [open question 38](open-questions.md).

Use `?review=sims-130` for the Sims Avenue front.

## East side

### 15. Way 682928733: No. 134 Sims Avenue, the Lorong 17 east corner

This was drawn as massing in the widened ring, because the drives disagreed on its position.

- **Corner block:** cream, of three tall storeys, with a parapet at about **15.1 m** (16 m over the splay).
  - Curved concrete hoods over each upper floor, louvred vents, brown-edged ledges and windows in pairs.
- **Wing:** a lower two-storey wing to the south, with a balcony hung with flowers and string lights under a blue awning, and a roof at about 10 m.
- **Ground floor:** a corner coffeeshop:
  - red SingGas LPG awnings;
  - green beer-sponsor boards for its stalls (K.L Hokkien Mee, Signature Intestines, Claypot Frog Porridge, Hongkong Steam Shark Head);
  - a white board reading 驰名猪什汤大王 over the splayed corner.

**Measurement:**
- Straight-run panoramas triangulate the corner (`qR4q…` with `9Tds…`, and `qR4q…` with `Zwx6…`) and the south end of the corner block.
  - The Lorong 17 face is about **10.6 m** long, against the 10.92 m source edge.
  - It stands **5–6 m east and 2–3 m south** of the source edge.
- Rectified on that line, `Zwx6…` and `qR4q…` agree on the elevation. The heights are:
  - five-foot way: 4.5 m;
  - sponsor boards: 4.6–6.0 m;
  - first-floor windows: 6.25–7.5 m;
  - first hood: 9.0–9.6 m;
  - second-floor windows: 10.25–11.6 m;
  - top hood: 13.2–14.3 m;
  - parapet: 15.1 m.
- The splay and the Sims Avenue face were read from `F6D3…` and `xH65…`.

**Layout:** the source outline is the photographed outline displaced: it reaches into the lane, 0.9 m from its centreline.
- The elevation is laid on the source edges.
  - The corner block's Lorong 17 face is the front.
  - The splay, the Sims Avenue face and the wing's face are side faces.
  - The corner block above the wing's roof is a raised volume (`upper` in the layout).
- Every street-level piece is held within 0.25 m of the walls, which stand in the estimated carriageways.
- Authoring the footprint is [open question 39](open-questions.md).

**Naming:** none. Google Maps lists 134 Sims Ave only as an address. The stalls' boards and the coffeeshop's soup-king board are not listed, so they are blank.

Use `?review=sims-134`.

### 16. Way 454254307: Nos. 42–44

A gap of about 12 m in the source map separates No. 134's wing from this block: a service lane with bins.

The block is white, three storeys, in two bays either side of a narrow stair tower lit by tall slit windows.

- **No. 44, the north bay:** taller. Two windows on each upper floor under louvred vents, a balcony slab, and a large sloping roof hood at about **12.6 m**.
- **No. 42, the south bay:** the same pattern lower down, with its hood at about **11 m**. Below is an open front with grilles, a door and a letterbox.
- **Stair tower:** a small stepped parapet at about 12 m.
- **Ground floor:** framed by deep piers, with a glazed office front and a bamboo blind.

**Measurement:**
- `9Tds…`, `ghWQ…` and `qR4q…` (June 2024), paired three ways, fix the north front corner **1.4 m behind** the source corner, to within 1 m.
- Rectified on a plane 1.4 m behind the source edge, `ghWQ…`, `8zSh…` and `9Tds…` agree on the north bay to about 0.3 m. The elevation was read there, between 0.6 m and 11.3 m along.
- **Correction, from stop 17:** two further pairs (`ghWQ…` and `9Tds…`, each with `8zSh…`) triangulate the south party line about **12.2 m** along, **2.0–2.5 m behind** the source front, and 1.3 m south of the source party line. So the block is about 12.2 m long, and its front deepens to the south.
- The east side here stands close to its source line, unlike No. 134.

**Layout:** laid on the 11.46 m source edge. The taller north bay above the south bay's roof is a raised volume.

**Naming:** none. Google Maps gives address points for 42 and 44 Lorong 17 inside this way but lists no business, and no sign was photographed.

Use `?review=l17-42-44`.

### 17. Way 454254308: Nos. 38–40

A weathered, mould-streaked cream three-storey block of two bays either side of a narrow stair tower with vertical windows.

- **No. 40, the north bay** (door plate 40 on a grilled door with red couplets): two windows on each upper floor under louvred vents, a balcony slab with air-conditioners, and a deep roof hood at about **10 m**.
- **No. 38, the south bay:** the same pattern, slightly lower.
- **Ground floor:** an open five-foot way with grilled doors, a barred window, a red letterbox, a ladder, and an altar on the stair-tower pier.

**Measurement:**
- Two pairs of June 2024 panoramas triangulate the block's north party line about 1.3 m south of the source party line and 2.0–2.5 m behind the source front.
- Its south end falls on the source end, 1.6–2.0 m behind the front. The block is about **10.1 m** long.
- The elevation was read square-on from `8zSh…`, which stands about 3.5 m in front of it, between 13.67 m and 22.33 m along the source line.

**Layout:** laid proportionally on the 11.45 m source edge.

**Naming:** none. Google Maps lists **CSL Engineering**, an engineering consultant on floor 1, at 40 Lorong 17 Geylang, but no sign for it was photographed.

Use `?review=l17-38-40`.

### 18. Way 454254240: No. 20, Bright Star Hotel

A service lane separates Nos. 38–40 from this six-storey block. It is set back about 10 m from the lane behind a lawn, palms and shrubs.

- **Ground floor:** open and clad in red granite, with a lobby, a drinks machine and parked motorcycles.
- **First floor:** white-framed windows in red granite, under a white cornice at about **9.5 m**.
- **Upper floors:** four cream floors of paired windows between white pilasters, with peach spandrel panels and hooded windows on the top floor.
- **Top:** a parapet at about **21.8 m**, and a curved pediment with an oval medallion at about 23 m.
- **Signs:** a door plate reads **20**. A red banner on the granite reads BRIGHT STAR HOTEL SPECIAL PROMOTION 特别促销, with room rates and a telephone number.

**Measurement:** `INbo…`, `gBz2…`, `FeWy…`, `zA0h…` and `qKWw…` (June 2024) agree on the façade on the source plane.
- The façade is about **45.3 m** long, from 2.3 m north of the source corner.
- Storey heights, read on that plane:
  - ground floor: 0–3.4 m;
  - first-floor windows: 5.0–7.4 m;
  - cornice: 9.3–9.8 m;
  - upper windows: 10.3–12.4, 13.4–15.5, 16.4–18.6 and 19.4–21.0 m.

**Layout:** laid on the 42.12 m source edge. The north end, on the service lane, carries its window columns as a side face.

**Naming:** Google Maps lists **Bright Star Hotel**, a 3-star hotel, at 20 Lorong 17 Geylang.
- Its point lies **0.28 m in front of** the source front, inside the photographed front.
- The listing, the door plate and the banner agree. The building is named under the Crystal Mansions precedent (open question 32), and the banner is redrawn in original type.

Use `?review=bright-star-hotel`.

### 19. Way 454254238: the temple by No. 14

A single-storey temple behind a tiled forecourt, between Bright Star Hotel and a white two-storey row.

- **Roof:** red tiles, hipped, with a dark ridge edge.
- **Front:**
  - a beige fascia under the eaves, over a beige canopy;
  - granite entrance columns carrying couplets, and stone lions;
  - an open altar front, with green railings to the north and a grille gate to the south.
- **Boards:** gold on brown, reading **和友社** and **華德善室** (right to left).

**Measurement:** `GX6R…` with `M_9s…`, and `GX6R…` with `qKWw…` (June 2024), triangulate the eaves about **10 m** long and 1–1.5 m in front of the source front.
- The eaves run from about 4 m north of the way to 1.2 m south of it.
- Heights, read on the triangulated plane: eaves at about **3.7 m**, ridge at about **5 m**.

**Layout:** the 4.84 m way holds only the middle of the temple. That slice is modelled at its photographed scale, without squeezing the whole front onto it. The rest is [open question 40](open-questions.md).

**Naming:** none.
- Neither 和友社 nor 華德善室 is listed.
- Google's address point for 14 Lorong 17 lies just in front of this way and carries no business.

Use `?review=l17-14-temple`.

### 20–23. The white row south of the temple

A side lane about 5 m wide separates the temple from a white two-storey row of six shophouses.

- **Shared elevation:**
  - pitched roofs behind a cornice at about **6.8 m**;
  - two windows on each upper floor, at 4.45–5.74 m;
  - a ledge at about 3.9 m, and a five-foot way;
  - a long maroon awning across the middle houses.
- **Measurement:** `M_9s…` and `qC7t…` (June 2024) agree, to about 0.5 m, on six houses on a line through the source fronts. From north to south they are about 5.4, 4.3, 3.8, 3.8, 3.6 and 3.5 m wide, about 24 m in all.
- **Fit to the map:** the map's four source ways (z 0.8–18.5) overlap the four southern houses, one each. The two northern houses stand in the gap the map leaves after the temple: [open question 41](open-questions.md).
- **Layout:** each house is laid proportionally on its own way.
  - The fronts are only 3.2–3.5 m from the lane's centreline, at or inside the edge of the modelled carriageway. The houses are flagged `heldFlat`, as No. 134 is, and the awning is held within 0.1 m of the walls.
  - The real awning projects about 1.5 m.

### 20. Way 454254249: No. 6, Singapore Chinaware Merchants Association

- **Front:** the third house of the row carries the left part of a long red board reading **新加坡瓷商公會 SINGAPORE CHINAWARE MERCHANTS ASSOCIATION**, which runs on over the fourth house.
- **Ground floor:** the stair door carries a letterbox lettered **6-B**, beside red-framed glazed doors with fretwork panels.
- **Naming:** Google Maps lists the **Singapore Chinaware Merchants Association** at 6 Lorong 17 Geylang, Singapore 388537. Its point lies about 8 m south, inside way 454254252.
  - The address, the letterbox and the board agree on this house, so it is named after the board, under the Bamboo Lounge precedent (open question 33).
  - The whole board is redrawn on this house in original type.
  - No claim is made about the ground floor.

Use `?review=chinaware-merchants`.

### 21. Way 454254250: No. 4

No plate was seen. The number follows from No. 6 to the north and No. 2 to the south (see stop 23).

- **Front:** it continues the Chinaware Merchants Association's red board (drawn whole on No. 6) and the red fretwork panels round an open doorway.
- **Ground floor:** a grey door with a red letterbox, a sink and a brass incense urn, under the maroon awning.
- **Position:** the ground-floor features were placed by bearing from `qC7t…`, where the front line meets each sightline.
- **Naming:** none. No listing or sign identifies it. Google's address points along the row (Nos. 2, 4 and 6) fall in the wrong order, so the numbers come from the plates instead.

Use `?review=l17-4`.

### 22–23. Ways 454254252 and 454254251: No. 2

The plates settle the row's numbering.

- **Fifth house:** its grey stair door at the north end is plated **2A** and **2B**. It has a wide barred window with blinds under a row of small louvred lights, and chairs on its five-foot way.
- **Sixth, southernmost house:** a glass shop door lettered **02**, under a red festive banner reading 横财就手, with red couplets, lanterns and potted plants, below a fascia of faded, mould-streaked lettering.
- **Numbering:** these two houses are No. 2, its upper floors and its shop. The fourth house is No. 4, and the third No. 6 (letterbox 6-B).
- **The awning:** the maroon awning stops at the fifth house's north party line. A view from the south shows this. In the square-on rectified view it seemed to run further south, but only because it projects about 1.5 m in front of the façade plane.
- **Naming:** none.
  - No listing for a business at 2 Lorong 17 was found. The faded fascia and the festive banner are blank.
  - The Singapore Chinaware Merchants Association's listing point lies inside way 252, but its board and letterbox are on No. 6.

Use `?review=l17-2` and `?review=l17-2-shop`.

### 24. Way 454254253: the Geylang Road corner house

A two-storey corner shophouse on the east corner of Lorong 17 and Geylang Road, cream with grey louvred shutters.

- **Lorong 17 side (the frame):** 28.7 m long.
  - Six bays of paired shuttered windows between pilasters, over pierced ventilation panels.
  - An arcaded five-foot way under a long green awning.
- **Geylang Road front:** 5.3 m wide, with two shuttered windows and a RENT/SALE banner over an arched opening.
- **Boards:** they read 明辉田鸡粥 EMINENT FROG PORRIDGE SEAFOOD RESTAURANT, CHÁO ẾCH MING HUI, with vertical boards at the corner.

**Measurement:** `BUPe…`, `L9oN…` (April 2024) and `R0li…` (June 2024) place the Lorong 17 side on the source plane, from about 2.2 m north of the source corner to 26 m south of it. Heights read on that plane:
- eaves: about 8.5 m;
- shuttered windows: 5.3–7.3 m;
- five-foot way: to 4.2 m.

From `PcP8…` the corner falls within about 0.75 m of its source position.

**Layout:** laid on the 28.71 m source edge, with the Geylang Road front as a side face.

**Naming:** none. Google Maps now lists **Eminent Frog Porridge & Seafood** at 323 Geylang Road, near Lorong 19, and the RENT/SALE banner marks this corner as vacant. So this is the restaurant's former site, and every board is blank.

Use `?review=gr-l17-east-corner`.

## The owner's answers applied, 12 October 2026

All six questions from the walk were answered with the recommended option. They are recorded in [open questions](open-questions.md), eighth batch.

### Questions 36 and 38: the west row on its photographed line

Group `lorong-17-west-row` in `src/authored-footprints.mjs`. It replaces eleven source ways with authored footprints: `l17w-5` for Nos. 5–7, and `l17w-17` to `l17w-35`.

- **Method:** one monotonic re-spacing along the row's own front line moves every vertex of every house. The source party lines go to the measured ones, and vertices on the source front move forward. So neighbours keep their shared walls, the rear lines and rear steps are kept, and each outline keeps its vertex order and edge numbers.
- **Party lines:** measured from No. 17's south corner along the walk-ups' source front, each taken midway between neighbouring measured ends:
  - −1.56 m (No. 17's south end, on the side passage);
  - 4.54, 10.45, 16.04, 22.09, 28.43, 34.23, 39.86, 46.03 and 52.58 m;
  - 59.43 m (No. 35's north end).
- **Fronts:** 1.5 m forward at No. 17, and 2.3 m forward from No. 19 to No. 35, the mean of the readings (2.1–2.5 m).
- **Nos. 5–7:** Feng Shang and its north bay, on their own edge. The front is 1.5 m forward and runs 12.9 m, to the north party line 11.35 m north of the source corner. The question gave 12.5 m, an arithmetic slip.
- **Unchanged:** the side passage between Nos. 15 and 17, and way 454254237 (Nos. 9–15).
- **Results:**
  - The map's gaps after Nos. 7 (now 0.6 m), 21 and 25 are closed.
  - Each elevation is laid on its true width, without the ×0.72–1.5 stretching.
  - The listing points of Feng Shang, the True Jesus Mission and the Yang Clan General Association now fall inside their houses. Gyaltsap Tashi Ling's point lies on its south party line, 0.3 m from its footprint.
  - No. 31 and No. 33's readings overlapped by 1.2 m, so their party line is taken midway.
  - Nos. 23–25 are slightly skewed, so their shells stand 0.12 m inside their side walls.
- **Re-check:** stop 9's fin triangulation was solved again with its readings on the correct plane. The fins stand about 2.2 m forward, and its positions are unchanged.

### Question 37: Nos. 37–41 split, and No. 39 named

Group `lorong-17-37-41` in `src/authored-footprints.mjs`.

- **The split:** way 454254280 is cut square to its front at the fin centres, **4.4 m** and **9.6 m** from its south corner. This gives `l17w-37` (4.4 m), `l17w-39` (5.2 m) and `l17w-41` (5.0 m). The fins photographed about 5.4 m and 11.5 m from the building's south end, scaled onto the 14.62 m source front.
- **The elevation:** the building's photographed elevation is shared out between the three bays by slicing (`sliceSpec`), so no piece is lost. The north wall's windows move to No. 41's edge 3.
- **Named:** **Singapore Rattan Industry Association** on No. 39's upper floors, after the white board between its first-floor windows, redrawn in original type.
  - The listing's postal code places it at No. 39.
  - Its point lies in No. 37 next door, about 1.6 m from the party line (the Bamboo Lounge precedent).
  - The Ah Qi Trading & Construction board below stays blank.

Use `?review=rattan-association`, `?review=l17-37` and `?review=l17-41`.
