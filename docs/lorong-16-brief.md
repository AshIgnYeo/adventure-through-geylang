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
- **East side:** the five-storey walk-ups of Nos. 1–7 on the back lane behind Geylang Road; a row of two-storey houses from No. 9 to No. 19; a hoarded site; Hotel 81 Palace; another hoarded site; a row of two- to five-storey houses; a grassed verge; and the terrace at the head of Westerhout Road.

## The walk

| Stop | Side | Source way | Building | Status |
| --- | --- | --- | --- | --- |
| 1–3 | West | 764372569, 764372571, 764372570 | Nos. 314, 312 and 310 Geylang Road, the west corner: Chang Jiang G1 Claypot Frog Porridge (314), B & S Mini Mart (310) | Done; two named; question 63 |
| 4 | West | 763764689 | Nos. 6–18, the pink walk-up behind the car park | Done; unnamed; question 64 |
| 5 | West | 763764687 | No. 20, Hotel 81 Geylang | Done; named; question 65 |
| 6 | West | 763764688 | No. 24, Then Shen Temple | Done; named; question 65 |
| 7 | West | 763764676 | No. 30, Crystal Lodge | Done; named |
| 8 | West | 764372580 | No. 50 | |
| 9 | West | 763764654 | No. 54 | |
| 10–12 | East | 763764664, 763764665, 763764666 | The terrace at the head of Westerhout Road | |
| 13–14 | East | 763764667, 763764668 | The terrace's west end, on the grassed verge | |
| 15–22 | East | 454274647, 763764669, 763764670, 763764671, 763764672, 763764673, 763764674, 763764675 | The row south of Hotel 81 Palace: Lodge 41 (41), Soon Clan Association (43) | |
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
