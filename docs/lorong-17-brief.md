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
| 5 | West | 454254273 | No. 19, the Yang Clan General Association | Done; upper floors named |
| 6 | West | 454254274 | No. 21, a temple on the ground floor | Done; unnamed |
| 7 | West | 454254270, 454254271 | Nos. 23 and 25, one white building of two bays (Wee Ghee Athletic Association) | Done; unnamed |
| 8 | West | 454254275 | No. 27, with the 慕德同鄉會 board | Done; unnamed |
| 9 | West | 454254276 | No. 29, the first peach walk-up | Done; unnamed |
| 10 | West | 454254277 | No. 31, a pipe shop | Done; unnamed |
| 11 | West | 454254278 | No. 33, a temple front | Done; unnamed |
| 12 | West | 454254279 | No. 35, Gyaltsap Tashi Ling Buddhist Society | Done; named |
| 13–14 | West | 454254280 | The block before Sims Avenue | Massing, to rebuild |
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
