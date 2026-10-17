# Lorong 18 Geylang

Research and implementation from **17 October 2026**, under open question 71. This brief covers `src/lorong-18-layout.mjs`.

## Scope and method

- **Stretch:** Lorong 18 from Geylang Road to Westerhout Road, with the corner buildings at both ends of both sides. Westerhout Road's mouth is kept as road surface. The stub of Lorong 18 south of Westerhout Road, the Westerhout Road row and Geylang Road east of No. 350 wait for a later pass ([open question 72](open-questions.md)).
- **Block faces:** on Geylang Road the west corner block (way 541941365) is the only source outline on the face back to Lorong 16, and it is also Lorong 16's east corner. All of its faces are modelled with this lane, including the one on Lorong 16; the Lorong 16 walk leaves it alone.
- **Map:** `scripts/prepare-map.mjs` takes the lane's buildings and its eight road ways by id, with Westerhout Road's mouth on both sides of the lane and two more Geylang Road ways. The study rectangle is unchanged. The lane is a walkable corridor (`corridors` in `map.json`) from the Geylang Road centreline to the Westerhout Road centreline. A Geylang Road link carries the Lorong 21 link on from 17 m east of Lorong 21's junction to about 18 m past Lorong 18's, to take in the east corner. The north side of Geylang Road east of Lorong 21 is in nobody's walk yet, so that pavement has no buildings beside it.
- **Order:** the Geylang Road block first, then south down the west side to Westerhout Road, then north up the east side back to Geylang Road. Each stop is one photographed building, measured and modelled before the next.
- **Imagery:** the June 2024 Lorong 18 drive, southbound, from `oew0…` at the Geylang Road end to `Sen0…` at Westerhout Road, about 10 m apart. It is the latest drive along the lane. The June 2024 Geylang Road and Lorong 16 drives and the 2022 Westerhout Road drives cover the corners.
- **Naming:** unchanged. A business is named only when Google Maps lists it at that address and its sign shows in the photograph. Other buildings are labelled by address, with their signboards drawn and their lettering blank.
- **Code:** each place is a measured elevation on one edge of its footprint, built with the lane-house helpers shared with Lorong 17, Lorong 19 and Lorong 21 (`src/lane-house-layout.mjs`, `src/lane-house.ts`).

## The lane

- **West side:** Le Regal, a condominium over a shopping arcade, filling the Geylang Road block back to Lorong 16; a back lane; a hotel at No. 10; then a run of two-storey terraces under tiled roofs, broken by taller blocks, down to the Westerhout Road corner.
- **East side:** the corner block of Nos. 346–350 Geylang Road over a coffeeshop; a back lane; the Dabu Hakka Building, wrapped in scaffolding for its rebuilding in June 2024; the Diamond Hotel; Hotel 81 Star; a service road; and No. 55 at the Westerhout Road corner.

## The walk

| Stop | Side | Source way | Building | Status |
| --- | --- | --- | --- | --- |
| 1 | Geylang Road | 541941365 | Le Regal, 340 Geylang Road: the west corner, back to Lorong 16 | Done; named |
| 2 | West | 454274650 | No. 10, OYO 102 Budgetone Hotel | Done; named |
| 3 | West | 454274632 | No. 14, Cygon | Done; named; west row question 73 |
| 4 | West | 764372568 | No. 16 | Done; unnamed; question 73 |
| 5 | West | 764372567 | No. 18 | Done; unnamed; question 73 |
| 6 | West | 764372566 | No. 20, Club 20 | Done; named; question 73 |
| 7–8 | West | 764372565, 454274634 | Nos. 24 and 22, GoFit X Gym Geylang | Done; named; question 73 |
| 9 | West | 454274635 | No. 26 | Done; unnamed; question 73 |
| 10 | West | 454274637 | No. 28 | Done; unnamed; question 73 |
| 11 | West | 454274639 | No. 30 | Done; unnamed; question 73 |
| 12 | West | 454274640 | No. 32 | Done; unnamed; question 73 |
| 13 | West | 764372564 | No. 34, lettered 浯鄉陳氏公會 | Done; unnamed; questions 73 and 74 |
| 14 | West | 764372563 | No. 36 | Done; unnamed; question 73 |
| 15 | West | 454274642 | No. 38 | Done; unnamed; question 73 |
| 16 | West | 764372562 | No. 40 | Done; unnamed; question 73 |
| 17 | West | 454274643 | No. 42 | Done; unnamed; question 73 |
| 18 | West | 764372561 | No. 44 | Done; unnamed; question 73 |
| 19 | West | 454274645 | No. 44B, the Westerhout Road west corner | Done; unnamed; question 73 |
| 20 | East | 764372540 | No. 55, the Westerhout Road east corner | Done; unnamed |
| 21 | East | 121872891 | No. 31, Hotel 81 (Premier) Star | Done; named |
| 22 | East | 764372541 | Nos. 21 and 25, Diamond Hotel | Done; named |
| 23 | East | 1470917582 | No. 1, Dabu Hakka Building | |
| 24–26 | East | 764372559, 764372560, 454438314 | Nos. 350, 348 and 346 Geylang Road, the east corner | |

The names in the table are those Google Maps gives for each address, or the source map's house numbers where no listing gives one. Whether a building is named in the model is decided at its stop.

## Geylang Road

### 1. Way 541941365: Le Regal, 340 Geylang Road

The whole Geylang Road block from Lorong 16 to Lorong 18 is one building: a white five-storey condominium over a shopping arcade, one source outline that is also Lorong 16's east corner.

- **Upper floors:** bands of grey slab edges and glass balcony rails over sliding doors, with bamboo blinds and aluminium louvres in some bays and white piers between them.
- **Three screens** of perforated grey panel, striped in pink and yellow, stand proud of the balconies:
  - over the top two floors near the lane corner;
  - full height, a third of the way along;
  - from the overhead bridge's stair, which lands in front of the block, to the roof.
- **Ground floor:** a five-foot way of mobile-phone shops, salons and a print shop under grey awnings, behind white columns, with the residential lobby by the bridge stair. Its wall is lettered **LE REGAL** under a leaf mark.
- **At the lane corner:** the number 340 over a car-park rate board, and a pitched roof over the corner.
- **On the lane:** shops under the first floor, and the car-park entrance at the back lane.
- **On Lorong 16:** a beauty spa's board and an adult toy store's.

**Measurement:**
- **Geylang Road front (edge 9):** the screens' edges line up between `J2Pm…`, `J9oC…`, `Cb5e…` and `vE6Q…` (June 2024) on a plane **0.75–1.0 m behind** the source edge. A cloth hung over one balcony rail lines up about 1.1 m behind. The depth scores were no help: street trees and buses stand in front.
  - On that plane the building runs the source edge's length, its roof slab overhanging about 1.5 m at each end.
  - The screens stand at 2.25–10.25 m, 23.0–27.25 m and 40.1–50.25 m along the front from the lane corner, and the lobby lettering at about 46–48.5 m.
- **Heights,** read on that plane:
  - five-foot way to 3.5 m;
  - slab edges at 3.5–4.4, 7.1–7.8, 10.5–11.1, 14.0–14.6 and 17.3–17.9 m;
  - parapet to about 19.0 m, screens to 19.3 m.
- **The lane and Lorong 16 faces** stand behind street trees, where neither the depth scores nor rectification read them. Above the trees the lane panoramas show the same floors, and a pitched roof over the corner to about 20.7 m.
- **Satellite:** it shows the tower as two wings, one along Geylang Road and one down the lane, round a pool deck on the podium. The block leans about 7 m in that image, so it is no tie-breaker here; the wings' depth (about 14 m) is an estimate.

**Layout:**
- **Faces:** the Geylang Road front is the front, laid on the source edge at its photographed positions. Its five-foot way is 2.6 m deep. The lane face (edge 7), the two splays (edges 8 and 10) and the Lorong 16 face (edge 11) are side faces.
- **Balconies:** on the front, the flats' walls stand 1.5 m behind the balcony fronts and screens, which stand on the source line.
- **Volumes:** the podium stands to the first-floor slab (4.4 m). The two wings are raised over it to the parapet as one upper volume, with a hipped roof over the corner.
- **Estimates:** the lane and Lorong 16 faces' fittings follow the front's floors and are placed by estimate where the trees hide them.
- **Not modelled:** the overhead bridge and its stair, the pool deck and the street trees.
- **Footprint:** the front stands about 1 m behind its source edge, which is recorded and not acted on.

**Naming:** Google Maps lists **Le Regal**, a condominium complex, at 340 Geylang Road, Singapore 389365, with its point inside this way, and its name is lettered on the lobby wall. So the block is named after it, and the lettering is redrawn in original type, with the number 340 at the corner.
- The screens' stripes are drawn after the photographs.
- No claim is made about the arcade's tenants, whose boards are blank. Many are listed at 340 Geylang Road, among them G Salon, SIA Money Exchange, Mobile X and Botanique Beauty Spa.

Use `?review=le-regal`.

## West side

### 2. Way 454274650: No. 10, OYO 102 Budgetone Hotel

A seven-storey hotel south of the back lane behind Le Regal.

- **South end:** a glazed stair strip of green glass beside a plain beige panel, crowned by a red board lettered **oyo**.
- **The rooms' front:** white, its windows in projecting white surrounds between grey panels, under a row of grey fins on the top floor and a slatted roof canopy.
- **Lettering:** **BudgetOne Hotel**, blue with an orange O and a pink Hotel, between the first two floors of rooms, over a band of painted waves above the lobby.
- **In front:** a low garden wall with potted plants, and a gate plated 10.
- **North wall,** on the back lane: plain white.

**Measurement:**
- **Depth:** the lettering lines up between `pKnB…`, `USMH…`, `ijKd…` and `m8yM…` (June 2024) on a plane **0.5 m behind** the source edge. The depth scores agree (−0.25 to −0.75 m).
- **Extent:** on that plane the front runs the source edge's 14.2 m: the stair strip and panel to 4.9 m from the party wall with No. 14, the rooms beyond.
- **Heights,** read on that plane from `ijKd…`:
  - lobby to 3.6 m, under the waves to 4.3 m;
  - windows at 4.7–6.4, 7.8–9.5, 11.2–12.8, 14.5–16.2 and 17.8–19.5 m;
  - lettering at 6.65–7.55 m;
  - fins to 21.3 m, and the stair strip to about 22 m.
  - `pKnB…`, 25 m north, reads about 1.3 m higher, so the nearest panoramas are used.

**Layout:** laid on the source edge at its photographed positions, with a 1 m lobby recess and the garden wall 1.6 m in front. The north wall is a side face, its few small windows placed by estimate.

**Naming:** Google Maps lists **OYO 102 Budgetone Hotel**, a hotel, at 10 Lor 18 Geylang, Singapore 398793, with its point inside this way. Its lettering and the OYO board are photographed, so it is named, and both are redrawn in original type.

Use `?review=budgetone-hotel`.

### 3–6. Ways 454274632, 764372568, 764372567 and 764372566: Nos. 14 to 20

A two-storey terrace under one red tiled roof, its houses painted grey, blue, orange and cream, each with a porch or car porch in front of its upper floor.

**Measurement:** the four fronts were read together on one plane along No. 30's front (s north from its south corner), which serves the whole west row.
- **Depth:** the blue house's edge and its window line up between `Z5Yk…`, `VqEM…`, `m8yM…` and `ijKd…` (June 2024) on a plane **7.5 m behind** that line. That is about 2 m behind the houses' recessed source edges and 4.5 m behind their projecting ones. The depth scores agree (−6.5 to −7 m, 0.35).
- **The porches:** their fronts, such as the CYGON canopy at No. 14, line up about **3 m behind** No. 30's line, on the houses' projecting source edges.
- **The source outlines:** each house's lane end is two parallel edges about 2 m apart, the projecting one about 3–4 m wide. They pair up, Nos. 14 and 16 meeting at their projecting edges, as Nos. 18 and 20 do.
- **Party walls on the upper façades' plane:** at s = 29.7, 38.1, 46.2, 55.9 and 62.5, against the source's 31.7, 38.9, 46.8, 54.5 and 62.5. No. 14's north wall meets No. 10's.
- **Heights:** porch roofs and canopies at 3.0–4.0 m, balcony rails to about 5.1 m, eaves at 7.1 m and the roof to about 8.7 m.

**Layout:**
- Each house's elevation is laid proportionally across its two source front edges. The longer edge, or at No. 14 the projecting one with the canopy, is the front; the other is a side face.
- Each house carries a tiled eaves line and a roof band in front of a hipped roof.
- The fronts stand 2–4.5 m in front of their photographed line: part of [open question 73](open-questions.md).

| Stop | Way | House | Photographed | Named |
| --- | --- | --- | --- | --- |
| 3 | 454274632 | **No. 14**: grey. A white-framed door onto a terrace with a white railing, over a canopy on two columns whose fascia is lettered **CYGON**; a grey concrete-textured front with a dark door and the number 14 under it, between low white walls | 6.6 m | **Cygon** |
| 4 | 764372568 | **No. 16**: blue. A small grilled window in a white frame over a balcony with a pink railing on pink posts; a blue front with a red banner, the number 16 in red, and potted plants | 9.7 m | No |
| 5 | 764372567 | **No. 18**: orange. Its upper floor faced with orange timber shutters behind a balcony with a dark railing, over an open shed between orange posts | 8.1 m | No |
| 6 | 764372566 | **No. 20**: cream. Two dark doors behind a balcony with a white railing, on the slab of a car porch across the whole front, hung with red lanterns; a lightbox lettered **20公館** on a post at its north side | 8.4 m | **Club 20** |

**Naming:**
- **Cygon:** listed, an adult entertainment club open 24 hours, at 14 Lor 18 Geylang, Singapore 398797, with its point inside this way. Its lettering is redrawn in original type.
- **Club 20:** listed, a night club, at 20 Lor 18 Geylang, Singapore 398803, with its point in No. 18 next door. The address and the lightbox, which gives the club's name, agree on this house, so it is named, as the Nyingma Kathok Buddhist Centre was on Lorong 21. The lightbox is redrawn in original type.
- **Not named:** Adult Secret, listed at No. 18, is permanently closed. SG山水庄园, listed at No. 20, has no photographed sign. Nothing is listed at No. 16.

Use `?review=cygon`, `?review=l18-16`, `?review=l18-18` and `?review=club-20`.

### 7–8. Ways 764372565 and 454274634: Nos. 22 and 24, GoFit X Gym Geylang

One six-storey building stands over both source ways.

- **Front:** white, with grilled openings in coloured frames (grey, pink, green and orange), four floors of them over a timber-slatted soffit and a drive-through car park.
- **South end:** a stair strip of small framed windows, and a banner listing the gym's floors (6 rooftop garden and chill zone, 5 my GoFit virtual PT, 4 cardio, 3 fitness machines and super circuit, 2 free weights, 1P car park).
- **Along the top:** the letters **GOFIT**.
- **On the wall:** a plate reading 22 Geylang Lor 18, with a GoFit A-board and a pink vending machine in front.

**Measurement:** read on No. 30's front line, s north from the building's south end.
- **Depth:** the frames line up between `FA-o…`, `zOAB…`, `D46t…` and `Z5Yk…` (June 2024) on a plane **1.25 m behind** that line. That is 2–2.5 m in front of the two ways' projecting source edges and about 5 m in front of their recessed ones. On planes 1–2 m further back the frames drift across the panoramas.
- **Extent:** on that plane the building runs from s = 18.3 to 31.8, about 13.5 m, against the source ways' 12.2 m.
- **Heights:**
  - car park to 3.6 m, under the soffit to 4.3 m;
  - four floors of frames to 15.8 m;
  - rooftop louvres to 16.5 m, and the lettering to about 17.6 m.

**Layout:**
- **One place over two ways:** the elevation is laid proportionally across the four source front edges, No. 24's and then No. 22's. Each way's longer edge is its front and the other a side face; No. 24 carries the review start.
- **The banner** is drawn in two halves, either side of the step between No. 24's front edges. The lettering goes letter by letter to the edge under each.
- The front stands 2–5 m behind its photographed line: part of [open question 73](open-questions.md).

**Naming:** Google Maps lists **GoFit X Gym Geylang**, a gym open 24 hours, at 22 Lor 18 Geylang, Singapore 398804, with its point inside the building (in way 764372565). Its marks are photographed, so the building is named after it, and its lettering, banner and plate are redrawn in original type.
- The Foochow Building (Geylang), listed at the same address, is marked permanently closed.
- Alpha Omega Wellness & Recovery, listed on the fifth floor, and the Singapore Hock Chew Kong Kien Phor Tor have no photographed signs.

Use `?review=gofit`.

### 9–10. Ways 454274635 and 454274637: Nos. 26 and 28

A single-storey pair of cream houses under red tiled hipped roofs.

- **In front:** a long tiled porch roof on slim posts across both houses.
- **Forecourt:** a dark timber gate lettered **28 26**.
- **No. 28** (south): a dark timber door beside its number.
- **No. 26** (north): a frosted glass front beside its number, against GoFit's south wall.

**Measurement:** read on No. 30's front line.
- **Depth:** the gate's lettering lines up between `anNq…`, `FA-o…` and `zOAB…` (June 2024) about **1 m behind** that line. The porch roof's eaves stand between the lettering and the line, on the houses' projecting source edges. The depth scores peak on the porch roof (+0.5 m).
- **Party walls:** No. 28's south wall meets No. 30 on the source party wall. The pair ends at GoFit's south wall, about 1 m inside No. 26's source outline. No sign of the line between the two houses was found, so it is taken at the source party line: No. 28 about 5.8 m, No. 26 about 4.5 m.
- **Heights:** porch eaves at 3.3 m rising to 4.4 m; hipped roofs to about 6.0 m.

**Layout:**
- Each elevation is laid proportionally across its house's two source front edges, which step about 2.5 m.
- The porch roof is drawn as a tiled slab 1.2 m deep along the front.
- The porch and gate stand at their photographed depth, near the source line: part of [open question 73](open-questions.md).

**Naming:** none. Nothing is listed at either address, and no sign was photographed.

Use `?review=l18-26` and `?review=l18-28`.

### 11–14. Ways 454274639, 454274640, 764372564 and 764372563: Nos. 30 to 36

A two-storey terrace, pale blue at No. 30 and pink beyond. Each house has a porch roof or awning over its forecourt.

**Measurement:** the four fronts were read together on No. 30's front line.
- **Depth:** the upper façades line up between `FA-o…`, `anNq…` and `qTnZ…` (June 2024), with `OGxs…` at No. 36, on a plane **3.25 m behind** that line. The depth scores also peak there (0.33–0.39).
  - That is 3.25 m behind the source edges of Nos. 30–34, whose lines follow the fronts of their porch roofs.
  - It is 0.85 m behind No. 36's source edge, which steps back 2.4 m.
- **Party walls on that plane:** at s = 6.95, −0.8, −8.7, −17.0 and −23.0, against the source's 7.97, 0, −7.83, −14.88 and −22.15. No. 34 photographs about 8.3 m wide against its 7.0 m way, and No. 36 about 6.0 m against 7.2 m.
- **Heights:** porch roofs and awnings at 3.0–4.0 m, windows at about 4.4–6.2 m, parapets at 7.6 m.

**Layout:** each elevation is laid proportionally on its own source edge, with the porch roofs and awnings drawn on the front. The upper façades stand up to 3.25 m in front of their photographed line: part of [open question 73](open-questions.md).

| Stop | Way | House | Photographed | Named |
| --- | --- | --- | --- | --- |
| 11 | 454274639 | **No. 30**: pale blue. Two windows under roller-blind boxes, over a red tiled porch roof; red boards and festive paper under it, and the number 30 on a post | 7.75 m | No |
| 12 | 454274640 | **No. 32**: pink. Two arched white casements over a row of air-conditioners, under a curved red-striped awning; a brick-tiled ground floor round a glazed front lit purple, and the number 32 in red | 7.9 m | No |
| 13 | 764372564 | **No. 34**: pink. Two broad windows under louvred hoods, below raised black lettering reading **浯鄉陳氏公會** along the parapet, over a flat canopy on black posts. Under it a dark marble front lettered VIETNAM PARADISE in gold, the number 34, and a grille gate to a stair, where a yellow board with an emblem reads 浯鄉陳氏公會 CHEN'S ASSOCIATION | 8.3 m | No; [question 74](open-questions.md) |
| 14 | 764372563 | **No. 36**: pink. Two arched windows over a curved red-striped awning; a ground floor faced with brown mosaic, a woven X-shaped ornament, glass doors lit purple and the number 36 in red | 6.0 m | No |

**Naming:**
- **No. 34:** Google Maps lists 浯乡陈氏公会, an association, at **40** Lor 18 Geylang, Singapore 398819, with its point inside No. 34's way. The lettering and the yellow board name it, but the listed address is No. 40, so the house is left unnamed, its lettering blank, until [open question 74](open-questions.md) is answered. Vietnam Paradise is not listed.
- Nothing is listed at Nos. 30, 32 and 36.

Use `?review=l18-30`, `?review=l18-32`, `?review=l18-34` and `?review=l18-36`.

### 15–18. Ways 454274642, 764372562, 454274643 and 764372561: Nos. 38 to 44

A two-storey terrace behind one zinc porch roof on slim posts.

**Measurement:** the four fronts were read together on No. 30's front line.
- **Depth:** the party wall between Nos. 42 and 44, and No. 42's windows, line up between `Qxql…`, `Crjq…` and `RvUa…` (June 2024), with `GNek…`, on a plane **5.75 m behind** that line. That is 0.25 m in front of the four houses' source edges, which step 2.4 m back from No. 36's. On planes 1.25 m either side the panoramas split them by about 1 m.
- **Party walls on that plane:** at s = −23.0, −30.8, −37.4, −45.4 and −52.7, within 0.8 m of the source's −22.2, −30.1, −36.9, −44.8 and −51.9.
- **Heights:** porch roof at 3.1–3.6 m, air-conditioners at 4.0–4.6 m, windows at about 4.6–5.8 m, parapets at 7.4–7.6 m. No. 38's rooftop storey reaches about 8.8 m.

**Layout:** each elevation is laid proportionally on its own source edge, with the zinc porch roof 2 m deep along the front. These fronts stand close to their photographed line; they are listed in [open question 73](open-questions.md) with the rest of the row.

| Stop | Way | House | Photographed | Named |
| --- | --- | --- | --- | --- |
| 15 | 454274642 | **No. 38**: faced in cream tiles. Two small aluminium windows high on the upper floor, a white rooftop storey set back behind the parapet, and a glazed front with a stair lit purple, behind a street tree | 7.8 m | No |
| 16 | 764372562 | **No. 40**: faced in orange herringbone tiles under a lattice band. Two windows over air-conditioners; an open front in the same tiles with a gilt Thai-style ornament | 6.6 m | No |
| 17 | 454274643 | **No. 42**: white, with pink lines framing the upper floor. A window at each end; a car porch with a pink panel, a grilled door and a gilt ornament | 8.0 m | No |
| 18 | 764372561 | **No. 44**: lavender. Two windows inside a raised frame; a dark board lettered in script and wind chimes, behind a brown timber gate between low lavender walls, plated 44 | 7.3 m | No |

**Naming:** none.
- 浯乡陈氏公会 is listed at No. 40, but its point and its signs are at No. 34 ([question 74](open-questions.md)).
- 浴中屋, listed at No. 44 with its point by No. 42, is permanently closed.
- No. 44's script board names no listed business.
- Nothing else is listed at these addresses.

Use `?review=l18-38`, `?review=l18-40`, `?review=l18-42` and `?review=l18-44`.

### 19. Way 454274645: No. 44B, the Lorong 18 west corner at Westerhout Road

A two-storey corner house under a red tiled hipped roof with deep eaves, ochre in June 2024; it was lavender in December 2022.

- **On the lane:** a recessed balcony along the upper floor, with a yellow railing hung with Thai gilt ornaments and strings of beads, and a window under a red hood at its south end.
- **Ground floor:** a curved red awning wrapping the corner, over a massage parlour's neon signs: one reading SAW…, another OPEN within hearts, a red one with a welcome in Chinese. The number 44B, behind a brown timber gate and potted topiary.
- **On Westerhout Road:** two windows under hoods, over a car porch behind a brick boundary wall with grey panels.

**Measurement:**
- **Lane face (edges 3 and 1, which step 1.4 m):** `GNek…`, `RvUa…` and `Sen0…` (June 2024) agree on its south corner and balcony about **1 m behind** the source edges. The depth scores peak on the awning and gate, 5–6 m in front.
  - On that plane the face runs about **13 m**, from its corner, 1.4 m south of the source corner, to No. 44.
- **Westerhout Road front (edge 4):** only the December 2022 Westerhout Road drive sees it square-on. It reads about **1 m behind** its source edge, though its three panoramas agree less well than the lane's.
  - The source edge follows the boundary wall and stands about 0.6 m from Westerhout Road's estimated carriageway.
- **Heights,** on the lane face: awning at 3.5–4.4 m, balcony railing at 4.5–5.5 m, eaves at 6.8 m, roof to about 8.6 m.

**Layout:**
- **Lane face:** laid proportionally across the two source lane edges.
- **Westerhout Road front:** a side face, its street-level pieces held flat within 0.25 m, with the boundary wall drawn on it.
- Moving the lane face onto its photographed line is part of [open question 73](open-questions.md).

**Naming:** none. Nothing is listed at 44B, and the neon names no listed business. SaWaDee Spa is listed in Le Regal, not here.

Use `?review=l18-44b`.

**West side complete.** Every building from Le Regal on Geylang Road to No. 44B at Westerhout Road now has its Lorong 18 front.

## East side

### 20. Way 764372540: No. 55, the Lorong 18 east corner at Westerhout Road

A weathered blue three-storey block at the corner.

- **Walls:** roughcast between cream bands at each floor and under the parapet, with wide windows on the two upper floors. Some are broken, and one bay is patched with white plaster.
- **Corner:** splayed, carrying the Westerhout Rd street sign.
- **On Westerhout Road:** a stair tower faced with breeze blocks, rising above the roof.
- **Ground floor:** in June 2024 it stood empty behind blue corrugated hoarding and a blue gate screened in green. In February 2022 it was occupied, with air-conditioners on its walls.

**Measurement:**
- **Lane face (edge 3):** the plaster patch lines up between the two nearest lane panoramas, `Crjq…` and `RvUa…` (June 2024), on the **source plane**. The depth scores were weak (under 0.1).
- **Westerhout Road front (edge 0):** read on its source plane from the corner's June 2024 panorama, `Sen0…`. The February 2022 Westerhout Road panoramas disagree with it and with each other by 1–4 m on the stair tower, so they are used only for the front's arrangement.
- **Heights:** cream bands at 3.6–4.1, 7.1–7.6 and 10.3–10.75 m; windows at 4.8–6.6 and 8.4–10.1 m; parapet at about 12.2 m; stair tower to about 13.2 m.

**Layout:** the lane face is the front, with the splay (edge 2) and the Westerhout Road front as side faces. All are laid on their source edges, with the hoarding and gate in front.

**Naming:** none.
- Google Maps lists Kip Inn, a hotel, at 61 Westerhout Road with its point inside this way, and the closed Golden Dragon Hotel and RedDoorz at the same address.
- None of their signs is on this block, which is tagged No. 55 and stood empty in 2024. No. 61 is the next outline east on Westerhout Road (way 454438307), which waits for a later pass ([question 72](open-questions.md)).

Use `?review=l18-55`.

### 21. Way 121872891: No. 31, Hotel 81 (Premier) Star

A pale blue nine-storey hotel in a neoclassical dress of white mouldings.

- **The two long wings:** on each upper floor, pairs of windows in recessed reveals and narrow single windows under hoods. A rosette over each pair, and ornate cartouches under the first-floor pairs.
- **Ground floor:** car-park openings under arches, behind a dark granite wall along the pavement.
- **The entrance bay:** grey, projecting 3.4 m between the wings, flanked by white pilasters rising the full height to a crest. An oval medallion and swags over a portico, where a board reads **HOTEL 81 PREMIER** over the glazed lobby and the number 31.
- **North corner:** a vertical lightbox, seen only edge-on.

**Measurement:**
- **Depth:** the wings' windows line up between `zOAB…`, `FA-o…`, `OGxs…` and `Qxql…` (June 2024) on the **source plane**; planes 1.5 m either side split them. The depth scores agree on the south wing (+0.25 to +0.75 m).
- **Bays:** about 5 m each, a pair and a single window to a bay.
- **Heights:** ground floor to 4.6 m under a cornice; window rows every 3.0 m from 5.9 m; top cornice at 28.4–29.0 m; the bay's crest to about 30.5 m. The render-and-compare from `zOAB…` puts the roofline on the photographed one.

**Layout:**
- **Faces:** the entrance bay (edge 4) is the front. The wings (edges 6 and 2), the bay's returns and the ends are side faces, all on their source edges.
- **The vertical lightbox** is drawn as a blank teal box, since its lettering could not be read.

**Naming:** Google Maps lists **Hotel 81 (Premier) Star**, a hotel, at 31 Lor 18 Geylang, Singapore 398828, with its point inside this way. Its board is photographed, so it is named, and the board is redrawn in original type. TMHK, also listed at No. 31, has no photographed sign.

Use `?review=hotel-81-star`.

### 22. Way 764372541: Nos. 21 and 25, Diamond Hotel

An eight-storey hotel, yellow on its lower floors and pink above, between the scaffolded Dabu Hakka Building and Hotel 81 Star.

- **Front:** three bays between orange pilasters, with white-framed windows on each floor.
- **Middle bay:** rises to a pediment with a diamond, over a tall glazed top floor above an orange cornice. The characters **鑽石大旅店** are set down its face in a zigzag.
- **Ground floor:** a teal board with gold letters reading **DIAMOND HOTEL**, over a maroon awning lettered with a gas supplier's name, 鑽石大旅店 and the hotel's telephone number.
- **Below it:** a drive-through to the car park, paved in brick, with a vending machine and palms at the north end.

**Measurement:**
- **Depth:** the vertical characters and the windows line up between `zOAB…`, `D46t…` and `FA-o…` (June 2024) on the **source plane**. The depth scores agree (0 to +0.75 m).
- **Heights:**
  - awning at 3.2–4.0 m, under the board at 4.2–5.1 m;
  - window rows from 6.0 m, every 3.1 m;
  - orange cornice at 20.6–21.2 m;
  - top floor to 26.8 m, parapet at 27.2 m, pediment to about 28.6 m.
- **Render-and-compare:** from `zOAB…` and `D46t…` the floors, pilasters and board fall on the photographed ones.

**Layout:** laid on its source edge (edge 3). The north wall above the Dabu Hakka Building is a side face.

**Naming:** Google Maps lists **Diamond Hotel** at 25 Lor 18 Geylang, Singapore 398806, with its point inside this way; the source map tags the way Nos. 21 and 25 and names it Diamond Hotel. Its board is photographed, so it is named, and the board and the vertical characters are redrawn in original type.

Use `?review=diamond-hotel`.
