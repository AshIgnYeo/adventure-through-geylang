# Lorong 16 Geylang

Research and implementation from **17 October 2026**, under open question 61. This brief covers `src/lorong-16-layout.mjs`.

## Scope and method

- **Stretch:** Lorong 16 from Geylang Road south to the edge of the retained extract (1.3110 N), about 190 m, with the corner buildings at both ends of both sides. The lane runs on about 95 m beyond the extract's edge to Guillemard Road; extending the extract is [open question 62](open-questions.md).
- **Block faces:** shared out between the three lanes walked on 17 October 2026. On Geylang Road this lane takes the west corner, Nos. 310–314. The row back to Lorong 14 (Nos. 292–308) is walked with Lorong 14, and the Geylang Road block east of the lane (way 541941365), with its Lorong 16 face, with Lorong 18. At the south end, the three houses at the head of Westerhout Road are taken in.
- **Map:** `scripts/prepare-map.mjs` takes the lane's 32 buildings and its five road ways by id. The study rectangle is unchanged. The lane is a walkable corridor (`corridors` in `map.json`) from the Geylang Road centreline to the end of its last way in the extract. Its junction lies on the Geylang Road corridor from Lorong 19 to Lorong 21, about 52 m west of Lorong 21's junction, so the corners are reached from it and no new Geylang Road link is needed.
- **Order:** south down the west side from Geylang Road, then north up the east side from the head of Westerhout Road back to Geylang Road. Each stop is one photographed building, measured and modelled before the next.
- **Imagery:** the June 2024 Lorong 16 drive, northbound, from `5TUz…` at the extract's edge to `GUcb…` at Geylang Road, about 10 m apart, with the June 2024 Geylang Road drive at the corner. It is the latest drive along the lane.
- **Naming:** unchanged. A business is named only when Google Maps lists it at that address and its sign shows in the photograph. Other buildings are labelled by address, with their signboards drawn and their lettering blank.
- **Code:** each place is a measured elevation on one edge of its footprint, built with the lane-house helpers shared with Lorong 17, Lorong 19 and Lorong 21 (`src/lane-house-layout.mjs`, `src/lane-house.ts`).

## The lane

- **West side:** the Geylang Road corner row of three-storey shophouses; a back lane; an open car park in front of a pink five-storey walk-up; Hotel 81 Geylang; Then Shen Temple behind its red boundary wall; Crystal Lodge; a hoarded site; and No. 50 and No. 54 on the car park aisle at the extract's edge.
- **East side:** the five-storey walk-ups of Nos. 1–7 on the back lane behind Geylang Road; a row of two-storey houses from No. 9 to No. 19; a hoarded site; Hotel 81 Palace; another hoarded site; a row of two- to five-storey houses; a grassed verge; and the west gable of the terrace that fronts Westerhout Road (Nos. 15–45), just beyond the extract's edge.

## The walk

| Stop | Side | Source way | Building | Status |
| --- | --- | --- | --- | --- |
| 1–3 | West | 764372569, 764372571, 764372570 | Nos. 314, 312 and 310 Geylang Road, the west corner: Chang Jiang G1 Claypot Frog Porridge (314), B & S Mini Mart (310) | Done; two named; question 63 |
| 4 | West | 763764689 | Nos. 6–18, the pink walk-up behind the car park | Done; unnamed; question 64 |
| 5 | West | 763764687 | No. 20, Hotel 81 Geylang | Done; named; question 65 |
| 6 | West | 763764688 | No. 24, Then Shen Temple | Done; named; question 65 |
| 7 | West | 763764676 | No. 30, Crystal Lodge | Done; named |
| 8 | West | 764372580 | No. 50, a timber house behind hoarding | Done; unnamed; question 65 |
| 9 | West | 763764654 | Nos. 54–58, a walk-up on the extract's edge | Done; unnamed; question 65 |
| 10 | East | 763764668 | No. 15 Westerhout Road, the south-east corner: the terrace's west gable | Done; unnamed; question 66 |
| 11 | East | 763764667 | No. 17 Westerhout Road | Done; unnamed; question 66 |
| 12 | East | 763764666 | No. 19 Westerhout Road | Done; unnamed; question 66 |
| 13–14 | East | 763764665, 763764664 | Nos. 43 and 45 Westerhout Road, a pink pair | Done; unnamed |
| 15 | East | 454274647 | No. 51 | Done; unnamed |
| 16 | East | 763764669 | No. 49 | Done; unnamed |
| 17 | East | 763764670 | No. 47, a narrow tower | Done; unnamed |
| 18 | East | 763764671 | No. 45, Singapore Poh Clan Association | Done; named |
| 19 | East | 763764672 | No. 43, Singapore Soon Clan Association | Done; named; question 67 |
| 20 | East | 763764673 | No. 41, Lodge 41 | Done; named; question 67 |
| 21 | East | 763764674 | No. 39 | Done; unnamed |
| 22 | East | 763764675 | No. 37 | Done; unnamed |
| 23 | East | 121872890 | No. 25, Hotel 81 Palace | |
| 24–28 | East | 763764678, 763764679, 763764680, 763764681, 763764682 | Nos. 19, 17, 15, 11 and 9 | |
| 29–32 | East | 763764686, 763764685, 763764684, 763764683 | Nos. 7, 5, 3 and 1, on the back lane | |

The names in the table are those Google Maps gives for each address, or the source map's house numbers where no listing gives one. Whether a building is named in the model is decided at its stop.

## West side

### 1–3. Ways 764372569, 764372571 and 764372570: Nos. 314, 312 and 310 Geylang Road

A row of three-storey shophouses at the Lorong 16 west corner of Geylang Road, under deep hoods at the second floor and the roof.

- **No. 314, the corner:** cream, with a splayed corner.
  - **On Lorong 16:** windows under louvred vents on both upper floors and a narrow window by the corner, over an open coffeeshop of red tables under a maroon scalloped awning on square columns. A dark lit board in green and gold dots reads **CHANG JIANG FROG PORRIDGE**, FROG FARM FRANCHISE, **长江1号** beside a frog, and 宫保田鸡粥, with a special offer. A white stall board reads 建通蝦麵 KIAN THONG PRAWN NOODLE.
  - **On the splay:** a board reading **海鮮田鸡粥 SEAFOOD & FROG PORRIDGE** between two claypots.
  - **On Geylang Road:** two narrow windows on each floor, beside a vertical board of dishes signed **长江1号**.
  - **At the south end,** on the back lane: brown back doors, an LPG store and a ventilation duct.
- **No. 312:** cream; two wide windows on each upper floor and a mesh railing round its roof terrace, over a shop of ladders and goods under a maroon awning and a board reading CHANG JIANG FISHERIES FARM SUPERMARKET 长江牛蛙养鱼场 超市店 in English, Chinese and Vietnamese.
- **No. 310:** grey; windows of white glazing bars, green grilles on the lower pair, and a roof-terrace railing, over a minimart under a blue awning and a red board reading **B & S MINIMART PRIVATE LTD.** in English and Bengali, with its address.

**Measurement:**
- **Geylang Road fronts:** read on one plane along No. 312's front (u_g west from the source party point of Nos. 312 and 314).
  - The depth scores of three pairs of June 2024 Geylang Road panoramas peak 2.25–2.75 m in front (north) of the source front.
  - On a plane **2.5 m in front**, the party walls line up between `D065…`, `SGbX…`, `KMWZ…` and `rxHH…` within 0.1 m.
  - Party walls on that plane: u_g = −0.6, 5.0 and 10.6. No. 312 is about **5.6 m** wide against 5.67 m, No. 310 about **5.6 m** against 5.84 m; the walls stand within 1 m of the source ones.
  - No. 314's flat front runs from its splay, at u_g = −5.8, to its party wall: about **5.2 m**, against the 3.02 m source edge.
- **The corner's lane face (edge 2):** `Y8N4…`, `epU_…` and `t5yp…` (June 2024) agree on its windows within 0.3 m on a plane **1.75 m in front of** (east of) the source edge (depth scores 0.22–0.34 at 1.75 m).
  - On that plane it runs from the splay, 2.4 m north of the source edge's north end, about **27 m** south to the back lane, against the 16.18 m source edge. The south end was confirmed by its bearing from `t5yp…`.
- **The splay:** about 3.6 m, against the source's 3.94 m.
- **Satellite:** it also puts the corner's roof about 3 m north of its source outline.
- **Heights:** read on the Geylang Road plane, where four panoramas agree:
  - a beam over the five-foot way at 3.2–3.4 m, awnings at 2.3–3.15 m;
  - windows at 4.85–6.05 m and 8.3–9.45 m, with vents over them on the corner house;
  - a deep hood at 7.0–7.2 m, a deep roof slab at 10.9–11.25 m, and parapets at about **11.6 m**;
  - the roof-terrace railings of Nos. 310 and 312 to about 12.6 m.

  The lane panoramas, taken from the lane about 0.75 m below the five-foot way (the coffeeshop is reached by steps), read about 0.75 m higher throughout, so the Geylang Road readings are used.

**Layout:**
- **No. 314:** the lane face is the front. It is laid **at its own scale from the splay** (u = u_ph − 2.42), so the source edge holds the corner's first 16.2 m; the southern 11 m, beyond the outline, is not drawn. The splay (edge 1) and the Geylang Road front (edge 0) are side faces: the splay's window and board are drawn on the source splay, and the front is laid proportionally (×0.58).
- **Nos. 312 and 310:** each front is laid proportionally on its own source edge (×1.01 and ×1.04). Their shells stand 0.2 m inside their east party walls, which run off square to the front.
- **Footprints:** moving the row onto its photographed line, and carrying No. 314 to the back lane, is [open question 63](open-questions.md).

**Naming:**
- **Chang Jiang G1 Claypot Frog Porridge 长江1号:** listed at 314 Geylang Road, Singapore 389353, a restaurant, operating, with its point just inside this way. Its name is on the lit board and the vertical board, so the corner is named, and its three boards are redrawn in original type: the dishes as plain plates, the lit board's smaller lines left out.
  - Kian Thong Prawn Mee is listed only at Sims Vista, so its stall board is blank. Ho Kian Thong, also listed at 314, is closed.
- **B & S Mini Mart Pte Ltd:** listed at 310 Geylang Road, Singapore 389349, a supermarket, operating, with its point just inside this way. Its board is redrawn in original type, its Bengali line drawn as a plain band. The awning's lettering advertises a product and is not drawn.
- **No. 312:** unnamed. Hwa Seng Furniture, operating, and four other businesses are listed there, but no sign for any of them was photographed. No Chang Jiang Fisheries Farm Supermarket is listed, so its board is blank.

Use `?review=chang-jiang-g1`, `?review=l16-geylang-312` and `?review=bs-mini-mart`.

South of No. 314 a back lane runs west, and beyond it the west side opens onto a car park, fenced along the pavement with grey hoarding. It has no footprint.

### 4. Way 763764689: Nos. 6–18

A salmon-pink four-storey walk-up behind the car park, under a low zinc roof with deep eaves.

- **Upper floors:** teal-framed windows in raised surrounds, eight columns on each floor, narrow and wide in turn, under transom vents. Two stair bays of grid glazing, whose panes step by half a floor.
- **Ground floor,** from the south:
  - covered parking in front of a shop hung with red lanterns;
  - a lounge under an orange tiled canopy, with a lit welcome sign, an OPEN sign and a plate numbered 10;
  - a blue-tiled car porch;
  - two timber pavilions over the entrance, plated **6A**, beside a rock garden;
  - a tiled lean-to.

**Measurement:**
- **The outline:** its east face steps back about 1 m four times, in segments of 2.2–7.0 m. The photographed façade is flat, under a straight eave.
- **Depth:** read on a plane along the longest segment (edge 22).
  - The four lane panoramas facing it (`o1zP…`, `o1jX…`, `GYT7…`, `3ZQq…`) stand 25–28 m away, where the depth scores are weak (under 0.13); they peak at 2.25–2.75 m in front.
  - Rectified at 0, 2.5, 2.75 and 3.5 m, the north stair bay's edges cross over between the widest pair (`o1zP…` and `3ZQq…`) at about **2.6 m in front of** (east of) the segment.
- **Extent:** on that plane the façade runs from 12.2 m south to 18.1 m north of the segment's south end: about **30.3 m**, against the 31.3 m of the source face.
- **Satellite:** it shows the walk-up's rusty pitched roof 4–6 m east of the outline's east face, including deep eaves, and about 14.5 m deep.
- **Heights:** canopies at 3.9–5.1 m; windows with their surrounds at 5.5–7.6, 8.9–11.0 and 12.3–14.4 m; eaves at about 15 m, the roof to about 16.4 m.

**Layout:**
- **One elevation,** laid proportionally along the source face (×1.03) and sliced across its nine east edges, the four recessed ones included, as the HCSA block's lane face was on Lorong 21. Windows cut at a step keep their surrounds within their edge.
- **The open ground floor:** the longest segment is the front, with its five-foot way. On the side faces it is drawn as a dark field with its fittings over it.
- **Roof:** a low hipped roof to 16.4 m.
- **Footprint:** moving the face onto its photographed line, without the steps, is [open question 64](open-questions.md).

**Naming:** none. Google Maps gives geocoded addresses for Nos. 6, 8, 10, 12, 14 and 18 Lorong 16 on this block and lists no business there, and no name board was photographed.

Use `?review=l16-6`.

### 5. Way 763764687: No. 20, Hotel 81 Geylang

A lavender hotel of four floors of rooms over a car park, south of the walk-up's car park. Its narrow east face on the lane is in three steps:

- **the main block:** a narrow window and two wide ones on each floor, between white ledges;
- **a middle bay**, standing slightly forward;
- **a stair tower** at the north corner, its windows at the landings, rising to about 20.6 m under a stepped crown and standing about 1 m forward.

A white board reading **HOTEL 81** in teal hangs over the car park beside a plate numbered 20, and a blade reading **HOTEL 81 GEYLANG** stands out between the middle bay and the tower. The long north and south walls are almost blank.

**Measurement:**
- **Depth:** read along the two collinear source edges of the east face (20 and 19). `2YRD…`, `fiAm…`, `DIeq…` and `3ZQq…` (June 2024) agree on the south corner **on the source line**, and on the stair tower's edges and windows on a plane **1 m in front**.
- **Extent:** the face runs from 0.4 m south of the source face to 2.3 m north of it: about **12.4 m**, against 10.06 m. The tower stands beyond the outline's north-east corner.
- **Heights:** the car park to 3.3 m; windows at 5.1–6.6, 8.15–9.7, 11.3–12.8 and 14.4–16.0 m; the main block's parapet at about 18 m, the middle bay's at 18.5 m and the tower's crown at 20.6–21 m.

**Layout:**
- **The face:** laid proportionally (×0.81) across its two source edges, edge 20 the front with the car park as its five-foot way and edge 19 a side face.
- **The tower:** a projecting volume 1 m deep, its windows on its face. The blade stands at its south side, on edge 19.
- **Footprint:** the face's true length, with the tower beyond the corner, is part of [open question 65](open-questions.md).

**Naming:** Google Maps lists **Hotel 81 Geylang** at 20 Lorong 16 Geylang, Singapore 398863, with its point inside this way, and the source map names it. Both signs are photographed, so it is named, and they are redrawn in original type.

Use `?review=hotel-81-geylang`.

### 6. Way 763764688: No. 24, Then Shen Temple

A single-storey temple south of the hotel, behind a red-brick boundary wall with a green glazed balustrade and coping.

- **June 2024:** the temple had been re-roofed in blue glazed tiles, and its roof and north half were wrapped in blue netting on scaffolding. The netting is temporary and is not modelled.
  - A zinc verandah on poles, hung with red lanterns, runs across its east front, over a black board lettered in gold **天善** and a grille door between two windows.
  - **The boundary wall:** a gold grille gate at the south end and a white one plated 24 at the north, their red pillars topped with green lions, and a red and yellow octagonal furnace inside the north gate.
- **December 2022:** the same temple stood unwrapped under red tiles, with dragons on its ridge: cream walls between white corner piers with red brackets, a frieze of chevrons in yellow, green and red, and a cream board reading **天善堂**.

**Measurement:**
- **The front (edge 3):** read from the December 2022 drive, when it was unwrapped. `Fwgu…`, `ckR5…` and `tDR0…` agree on its south corner pier about **1.5 m in front of** the source edge; the corner piers stand about **14.8 m** apart, against the 16.04 m edge. The verandah reaches about 3.5 m further.
- **The boundary wall:** the June 2024 panoramas' depth scores peak 6–7 m in front of the source edge (0.08–0.11), on the wall. Rectified there, its gate pillars still drift, so it is drawn at **7 m**. Its gates stand beyond both ends of the source edge.
- **Heights:** windows at 1.2–3.0 m, the frieze at 4.0–4.4 m, the verandah at about 4.6 m, the eaves at about 5 m and the ridge at about 7.6 m.

**Layout:**
- **The front:** laid proportionally on the source edge (×1.08), its hall behind a shallow recess. The roof is hipped, in the 2024 blue.
- **The verandah, the boundary wall and the furnace:** drawn at their measured depths. The white north gate falls beyond the outline and is not drawn.
- **Footprint:** part of [open question 65](open-questions.md).

**Naming:** Google Maps lists **Then Shen Temple**, a place of worship, at 24 Lorong 16 Geylang, Singapore 398866, with its point inside this way. Its board is photographed, so it is named. The board is redrawn in original type as photographed in 2024, gold on black; its third character, hidden by a lantern in June 2024, is taken from the 2022 board.

Use `?review=then-shen-temple`.

### 7. Way 763764676: No. 30, Crystal Lodge

An eight-storey block of flats over an open car park, banded in white and beige, south of the temple. Its lane face is in three bays:

- **the south bay:** flat, with narrow and wide windows;
- **the middle bay:** recessed, with balconies behind grey railings;
- **the north bay:** windows between projecting ledges.

On the top floor are open roof terraces under a deep parapet. A white boundary wall along the pavement, with white railings and gates, is lettered in raised grey capitals **CRYSTAL ODGE** (the L is lost) over 30 LORONG 16 GEYLANG.

**Measurement:**
- **Depth:** `gUrd…`, `978C…`, `rTwd…` and `YJ5N…` (June 2024) agree on the south and north bays **on the source edge** (depth scores peak between −0.75 and +0.5 m, 0.17–0.28). The middle bay is recessed about 1.5 m.
- **Extent:** from about 1 m north of the source corner to 31.6 m along, against the 32.6 m edge.
- **The boundary wall:** its lettering, read between `978C…` and `rTwd…`, triangulates **5.8 m in front**.
- **Heights:** the car park to about 4.6 m; windows at 6.2–7.5 m and every 3.2 m above to 22.1–23.4 m; the top floor's terraces at 24.9–26.4 m; the parapet at about **28.4 m**.

**Layout:** the face is laid on its source edge at its own scale, the open car park as its five-foot way. The recessed bay is drawn as a shaded field behind its railings; the south wall (edge 7) carries the window rows seen from the south. The boundary wall, its gates and the bin centre are drawn at their measured depths.

**Naming:** Google Maps lists **Crystal Lodge**, an apartment building, at 30 Lorong 16 Geylang, Singapore 398870, with its point inside this way, and the source map names it. Its lettering is photographed, so it is named, and the lettering is redrawn as photographed, without the lost L. The businesses listed in it (a shutter repairer, a landscape firm and a helper agency) have no photographed signs.

Use `?review=crystal-lodge`.

South of Crystal Lodge, rust-red corrugated hoarding runs along the pavement to the car park aisle.

### 8. Way 764372580: No. 50

An old timber house behind the hoarding, raised on low stilts under a hipped roof of dark corrugated sheets with a scalloped fascia.

- **Walls:** brown timber boards, a band of timber louvres under the eaves, and a row of wide windows of small panes.
- **Garden:** palms and shrubs between the house and the hoarding.
- **On the lane:** a brown metal gate plated **50** under a zinc-roofed gatehouse, its upper part a white grid of timber windows, with a CCTV notice.
- **On the aisle:** a grey wall.

**Measurement:**
- **Depth:** the June 2024 lane panoramas stand 19–23 m from its east face and see it only over the hoarding, through the garden, so no plane could be fixed. It is laid on its source edge.
- **Satellite:** it shows the dark roof reaching 3–5 m east of the source outline. That may be its eaves, or an extension.
- **The hoarding:** the gate's plate, followed from `PBc3…`, puts it about **12.5 m in front of** the source edge.
- **Heights,** read on the source plane from `5TUz…` and carried as estimates (about ±0.6 m): the floor about 1.4 m up; windows at 3.4–5.0 m; the louvre band at 5.1–5.8 m; eaves at about 6.0 m; the ridge at about 8.8 m.

**Layout:** the east face (edge 1) is the front, the south face (edge 0) a side face with its wall on the aisle. The hoarding and the gatehouse are drawn on the front at 12.5 m. The hoarding's northern stretch, from the outline's north end to Crystal Lodge, lies beyond the edge and is not drawn.

**Naming:** none. No sign names the house and no business is listed at the address.

Use `?review=l16-50`.

The car park aisle (way 542172608) turns in from the lane south of No. 50, between grey walls.

### 9. Way 763764654: Nos. 54–58

A pale grey four-storey walk-up south of the aisle, its outline crossing the edge of the extract, half hidden by mango trees.

- **Upper floors:** windows in grey surrounds, louvred windows and air-conditioners, under a deep roof slab.
- **Ground floor:** open, on columns, where the households keep goods and potted plants.
- **On the lane:** a projecting bay plated 54-A, and a grilled balcony plated **58A** in red under a white striped awning, below a glazed floor plated 58-B.
- **The boundary wall:** white, with railings and piers, along the pavement. A plate by the aisle lists 56, 58A, 58B and 58C.

**Measurement:**
- **The north-east corner:** bearings from `PBc3…`, `gUrd…` and `5TUz…` (June 2024) meet within 1.2° about **1 m west and 1.8 m south** of the source corner.
- **The rest of the lane face** is hidden by the trees.
- **Satellite:** it shows the roof slab 3–4 m east of the outline instead, so the two disagree by about 5 m. The building is therefore laid on its source edges.
- **The boundary wall:** its north end, read from `5TUz…` by its foot's elevation, and its foot in `FATW…`, put it on a line about **x = 285**, 3–6 m in front of the stepped east face.
- **Heights,** on the north face's source plane: the ground floor to about 3.9 m; windows at 5.0–6.6, 8.1–9.6 and 11.0–12.5 m; the roof slab at 13.0–13.5 m.

**Layout:** the east face steps four times. Its northern segment (edge 21) is the front, with the open ground floor as its five-foot way. The bay (edge 23), the recess (edge 25), the balcony segment (edge 27) and the southern segment (edge 1) are side faces, as is the north face on the aisle (edge 20). The boundary wall is drawn on one line in front of all of them.

**Naming:** none. Fairus78 is listed at No. 54, and International Machine Tools Trading and Sun Electrical Plumbing Renovation Works at No. 58, but no sign for any of them was photographed.

Use `?review=l16-54`.

**West side complete.** Every building from No. 314 Geylang Road to the edge of the extract now has its Lorong 16 front.

## East side

### 10–14. The terrace on Westerhout Road: Nos. 15, 17, 19, 43 and 45

At the lane's south-east corner a tall blank beige gable stands on a grassed verge. It is the west end of a terrace of five houses that fronts **Westerhout Road**, just beyond the extract's edge (the extract holds the houses but not that end of the road). From the lane only the gable and the fronts' west ends are seen. The fronts were read from the **December 2022 Westerhout Road drive**, the latest along that road (`KsMA…`, `xJWU…`, `kfiA…`, `s1JD…`).

**Measurement, for the whole terrace:**
- **The plane:** one plane along No. 43's front (u_p east from its source corner). The four panoramas agree on the upper floors on it.
- **Party walls on that plane:** u_p = −21.5, −13.0, −6.8, −0.1, 7.6 and about 15.6. Each lies within about 1.5 m of the source line.
- **Nos. 15–19:** their outlines carry their porches 2–3 m in front of the upper floors, to the gate line (the porch edges stand 2.1–3.1 m in front of the plane, and the recessed edges 0.2–2.1 m behind it).
- **Nos. 43 and 45:** they stand on their source fronts.
- **Numbers:** plated 15, 17 and 19 on the gates and walls, and 43 and 45 on the pink pair. The geocoded points for 43 and 45 Westerhout Road fall inside their ways.
- **Layout:** each house's photographed span is laid proportionally on its source span and drawn on its south edges, the upper floors on the porch line. Moving the porch-line fronts back to the upper floors is [open question 66](open-questions.md).
- **Naming:** none of the five. No business is listed at any of their addresses, and no sign names them.

| Stop | Way | House | Photographed |
| --- | --- | --- | --- |
| 10 | 763764668 | **No. 15**, the corner | The blank beige west gable on the lane. On Westerhout Road: a cream upper floor with a grey balcony and louvres under a deep roof slab, over a red tiled porch, a white gate and a red number plate |
| 11 | 763764667 | **No. 17** | An orange upper floor of louvred grilles over a white band, under a deep roof slab, over a maroon tiled porch and a white gate of rings plated 17; about 6.2 m between its party walls, against the source span's 5.7 m |
| 12 | 763764666 | **No. 19** | A white upper floor with two small windows, and a weathered grey side wall where it rises above No. 43, over a dark flat canopy plated 19 and a black railing gate before a car porch; about 6.7 m against 6.9 m |
| 13 | 763764665 | **No. 43** | The west half of a pink two-storey pair under one hipped tiled roof: a glazed band of dark panes over a pink spandrel, a grey flat canopy on white posts, and under it a dark front with two purple light strips, a lit gold outline over the door and red raised numbers 43 |
| 14 | 763764664 | **No. 45** | The east half: the same front, a door in a mosaic surround with a round plate numbered 45, an air-conditioner, a white gate and a small red shrine |

**Stop 10, No. 15:** the gable (edge 3) is the front, facing the lane, and its two south edges are side faces. Two June 2024 lane panoramas (`5TUz…`, `PBc3…`) agree on the gable within about 1 m of its source edge. Its top is drawn at about 9.4 m, where the Westerhout Road panoramas read the roof slab. Use `?review=l16-westerhout-15`.

**Stops 11–14, Nos. 17–45:** they face Westerhout Road, beyond the corridor's end. Review starts there would fall outside the study area, so they have none; they are seen from the lane's south end. Each house is laid on its south edges: its porch-line edge is the front, and its recessed edge a side face. Their gates photograph about 11 m from the road's panoramas, against about 15 m in the model, so the porches may reach further forward than the outlines.

**Stops 13–14, Nos. 43 and 45:** the December 2022 panoramas agree on the pair's fronts on the source line, about 15.7 m wide against 15.5 m. Each half is laid on its source front, under a hipped tiled roof to about 8.6 m. Use the lane's south end to see them; they have no review start.

**East side, Westerhout Road corner complete.**

### 15–22. Ways 454274647 to 763764675: Nos. 51 to 37

North of the grassed verge, a row of narrow houses about 30 m deep, set back behind a strip of parking about 10 m wide, runs north to the hoarded site of No. 35. The June 2024 lane panoramas stand 15–19 m from their fronts. Each house is read on its own lane edge (u south) and laid on it. The numbers follow the row from No. 35's site: the eight outlines hold Nos. 37 to 51, and the plates photographed at 39, 41 (Lodge), 43 and 51 agree.

| Stop | Way | House | Photographed | Named |
| --- | --- | --- | --- | --- |
| 15 | 454274647 | **No. 51** | Orange, two storeys under a red tiled roof: raised panels and a white casement window under three dark vent slots, over a dark corrugated carport canopy that runs on south over the verge, hung with a round plate numbered 51 and a gold board lettered 泰. Two panoramas (`978C…`, `PBc3…`) agree on its window on the source edge; about 4.7 m against 4.9 m. Canopy 3.0–3.5 m, window 5.4–6.6 m, eaves 7.0 m, roof to 8.3 m | No: nothing is listed at No. 51 and the board names no business |
| 16 | 763764669 | **No. 49** | Brown, two storeys under a weathered zinc roof with a pink gutter: a louvred timber window under a vent and two air-conditioners, over a pink tiled canopy and a red awning before a pink shopfront lit by purple strips. `978C…` and `gUrd…` agree on its upper floor on the source edge; about 4 m against 3.84 m. Awning 1.9–2.7 m, canopy 3.5–4.2 m, window 4.7–6.6 m, eaves 7.2 m | No: nothing is listed and no sign names it |
| 17 | 763764670 | **No. 47** | A narrow cream four-storey tower standing about 6 m in front of its neighbours: two tall strips of brown-framed windows between spandrel panels, under a deep cornice and a pointed parapet with a round medallion; a tree grows from its roof. Its ground floor was behind grey sheeting and tarpaulins, which are not modelled. Four panoramas line up on its front about 0.5 m in front of the source edge (depth scores 0.34–0.43); about 4.3 m against 5.05 m, laid ×1.17. Ledge 5.1 m, windows 5.5–7.2 and 8.7–10.2 m, cornice 11.1–11.7 m, point 12.7 m | No: nothing is listed and no sign was photographed |
| 18 | 763764671 | **No. 45** | White, two storeys under a green tiled roof with a red ridge: a red-and-yellow board reading 新加坡傅氏公會 Singapore Poh Clan Association (the Chinese read right to left) between two round emblems over a band of four windows; a green tiled canopy over a second board with the same lettering; three stacked air-conditioners; a white grille gate of scrolls plated 45. `rTwd…`, nearly square to it, and `978C…` agree on its boards on the source line; about 5.1 m against 4.64 m, laid ×0.91. Lower board 2.4–3.3 m, canopy 3.55–4.45 m, windows 4.9–5.9 m, upper board 5.95–6.55 m, roof 7.0–7.6 m | **Singapore Poh Clan Association**: listed at 45 Lorong 16 Geylang, Singapore 398879. Its point lies in the parking strip about 8 m in front of the house, but the address and the boards agree, so it is named (as at Crystal Mansions, question 32). Both boards are redrawn in original type |
| 19 | 763764672 | **No. 43** | Pale green above and yellow below, two storeys under a green tiled roof: a black board lettered in gold 孫氏公會 SINGAPORE SOON CLAN ASSOCIATION over four windows; a green tiled canopy on yellow columns over an altar hall hung with lanterns, behind red folding gates. On No. 45's plane its front runs about 3.7 m, from Lodge 41's front to No. 45, against 4.52 m; laid ×1.22. Canopy 3.55–4.45 m, windows 4.9–5.8 m, board 5.85–6.45 m, roof 7.0–7.6 m | **Singapore Soon Clan Association**: Soon Clan Assn is listed at 43 Lorong 16 Geylang. Its point lies deep inside No. 47's outline, but the address and the board agree on this house, so it is named. The board is redrawn in original type |
| 20 | 763764673 | **No. 41** | A narrow cream four-storey tower standing about 4.5 m in front of its neighbours, with blank side walls: two columns of three-pane windows either side of a projecting pier, air-conditioners, a deep parapet band and a gable glazed as a skylight; over its ground floor a fascia lettered LODGE over a yellow swoosh, white curved louvres and a glazed entrance; at its north corner a vertical sign reading LODGE over 41. `YJ5N…`, `rTwd…` and `978C…`, spread over 20 m of the lane, agree on its front within 0.3 m on a plane 4.5 m in front of No. 43's edge: about **8.5 m in front of its own source edge**, which stands 4 m behind its neighbours'; about 4.5 m against 4.71 m, laid ×1.05. Heights from elevation angles (±0.6 m): ground floor to 4.3 m, windows 5.4–6.8, 8.3–9.7 and 11.3–12.7 m, parapet 13.6–14.9 m, gable to 16 m | **Lodge 41**: listed at 41 Lorong 16 Geylang, Singapore 398877, a hotel. Its point lies in the forecourt about 2 m in front of the tower, and the address and signs agree, so it is named. Both signs are redrawn in original type. ZEN Hostel Aljunied, listed as located in it, has no sign; Chic Inn and RedDoorz Hostel, also listed at 41, are closed |
| 21 | 763764674 | **No. 39** | Pale pink, two storeys under a red tiled roof with a ventilator: white-framed windows and four air-conditioners, over an orange tiled canopy hung with a round neon sign numbered 39, and a dark timber front under a gold-lettered board reading THAILAND PARADISE behind a grey gate. `Z8Z…` and `YJ5N…`, 10 m apart, agree on its upper floor on its source line, about 1.1 m south of its source span; about 4.35 m against 4.54 m. Canopy 3.5–4.5 m, windows 5.3–6.3 m, eaves 7.0 m | No: nothing of that name, nor anything at No. 39, is listed |
| 22 | 763764675 | **No. 37** | Grey, two storeys under a zinc roof with a weathered parapet: two white-framed windows, damp-stained under the eaves, over a maroon tiled canopy and a red-and-white striped awning above a front crowded with potted plants. `Z8Z…` and `YJ5N…` agree on its upper floor on its source line, about 1.3 m south of its source span; about 4.75 m against 4.91 m. Awning 2.0–3.6 m, canopy 3.9–4.6 m, windows 5.4–6.4 m, eaves 7.1 m | No: nothing is listed and no sign was photographed |

The fronts of Nos. 37 and 39 and Lodge 41's tower all photograph about 1.1–1.4 m south of their source spans. That is within the drive's position error at this range, so it is recorded but not acted on.

North of No. 37, the hoarded site of No. 35 (an area the source map marks "no building here") is closed along the pavement by grey hoarding. It has no footprint.
