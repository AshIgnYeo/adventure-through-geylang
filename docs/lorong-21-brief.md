# Lorong 21 Geylang

Research and implementation from **13 October 2026**, under open question 47. This brief covers `src/lorong-21-layout.mjs`.

## Scope and method

- **Stretch:** Lorong 21 from Geylang Road to Sims Avenue, with the corner buildings at both ends of both sides and the Lorong Bachok corner on the west side. The part north of Sims Avenue, the Lorong Bachok row and the far sides of Geylang Road and Sims Avenue wait for a later pass.
- **Block faces:** as question 43 settled for Lorong 19, the faces back to Lorong 19 are taken in. On Geylang Road the corner block (way 454254167) runs back to Lorong 19's east corner; on Sims Avenue the eight houses from No. 150 to No. 176 join the map.
- **Map:** `scripts/prepare-map.mjs` takes the lane's buildings and its twenty road ways by id, with Lorong Bachok's east mouth and the Geylang Road and Sims Avenue links from Lorong 19's junctions. The study rectangle is unchanged. The lane and both links are walkable corridors (`corridors` in `map.json`), carried about 17–18 m past Lorong 21's junctions to take in the east corners.
- **Order:** north up the west side from Geylang Road, then south down the east side from Sims Avenue, then west along Sims Avenue to Lorong 19. Each stop is one photographed building, measured and modelled before the next.
- **Imagery:** the April 2024 Lorong 21 drive, northbound, from `RG105…` at the Geylang Road end to `BWwB…` at Sims Avenue, about 10 m apart, with the Geylang Road and Sims Avenue drives at the corners. It is the latest drive along the lane.
- **Naming:** unchanged. A business is named only when Google Maps lists it at that address and its sign shows in the photograph. Other buildings are labelled by address, with their signboards drawn and their lettering blank.
- **Code:** each place is a measured elevation on one edge of its footprint, built with the lane-house helpers shared with Lorong 17 and Lorong 19 (`src/lane-house-layout.mjs`, `src/lane-house.ts`).

## The lane

- **West side:** the Geylang Road corner block; a row of houses from No. 5 to No. 19; an open car park up to Lorong Bachok; the Bachok corner coffeeshop; a back lane; and the Sims Avenue corner house.
- **East side:** the HCSA Community Services compound, behind fences and hedges: single-storey and two-storey buildings under tiled and zinc roofs, with a garden at the Geylang Road corner.

## The walk

| Stop | Side | Source way | Building | Status |
| --- | --- | --- | --- | --- |
| 1 | West | 454254167 | Nos. 335–351 Geylang Road, the west corner: Cheng Yi Coffee Shop and a glass block | Done; named; question 48 |
| 2 | West | 1223524387 | No. 5 | Done; unnamed; question 49 |
| 3 | West | 1223524388 | No. 7 | Done; unnamed; question 49 |
| 4 | West | 1223524384 | No. 9, Nyingma Kathok Buddhist Centre | Done; named; question 49 |
| 5 | West | 1223524383 | No. 11 | Done; unnamed; question 49 |
| 6 | West | 1223524382 | No. 15 | Done; unnamed; question 49 |
| 7 | West | 1223524385 | No. 17 | Done; unnamed; question 49 |
| 8 | West | 1223524386 | No. 19, Bei Chen Gong Association | Done; named; question 49 |
| 9 | West | 454254329 | 29 Lorong Bachok, the Bachok corner: Tan Ser Seng Herbal Soup | Done; named; question 49 |
| 10 | West | 454254330 | No. 178 Sims Avenue, the west corner | |
| 11 | East | 454254164 | The Sims Avenue east corner, HCSA Community Services | |
| 12 | East | 454254165 | HCSA Community Services | |
| 13 | East | 454254160 | HCSA Community Services | |
| 14 | East | 454254144 | HCSA Community Services, by Geylang Road | |
| 15–22 | Sims Avenue | 454254331 to 454254338 | Nos. 150–176, west from the corner | |

The names in the table are those Google Maps gives for each address, or the source map's house numbers where no listing gives one. Whether a building is named in the model is decided at its stop.

## West side

### 1. Way 454254167: Nos. 335–351 Geylang Road, Cheng Yi Coffee Shop

One source outline over two buildings at the Lorong 21 west corner of Geylang Road.

- **At the corner:** a white four-storey walk-up.
  - **On Lorong 21:** a recessed panel of windows and louvred vents on each upper floor, a breeze-block screen at the north end and a projecting window bay beyond it, over a coffeeshop under maroon awnings.
  - **On Geylang Road:** balconies, grilled windows and breeze-block columns over a single-storey extension of shops under a zinc lean-to. Its boards: a white **I-TEC SUPERMART** board and a red 5G board. An overhead bridge lands in front of it.
  - **At the corner:** six vertical dish boards (煮炒, 炖汤, 杂菜饭, 田鸡粥, 肉骨茶, 海鲜烧烤 BBQ) over yellow lettering reading **CHENG YI COFFEE SHOP**.
  - **On the side lane to the north:** a breeze-block panel, a projecting glazed bay and a drinks stall hung with yellow lanterns.
- **To its west,** standing forward on Geylang Road: a five-storey glass block of grey glass and coloured fins, over a five-foot way on white columns. No sign names it.

**Measurement:**
- **Lane face (edge 8):** `RG105…`, `BBKt…` and `hWp4…` (April 2024) agree on it **3.25 m behind** the source edge, on the windows and the screen (depth scores 0.15–0.25).
  - On that plane it runs from **2.67 m north of** the source corner to the edge's north end: about **18.6 m**, against the 21.86 m source edge.
- **Walk-up's Geylang Road front (edge 9):** `vE6Q…` with `Cb5e…` (June 2024) agree on it **3.0 m behind** the source edge. It runs from 4.1 m west of the source step to the corner: about **27.6 m**, against 26.34 m.
- **Glass front (edge 11):** three June 2024 pairs agree on it **3.6 m behind** the source edge.
  - Its repeating fins first gave a false peak 5 m in front. On the source plane the panoramas' views of it drift further east from each camera eastward, which puts it behind.
  - It runs from **8.2 m west of** the source corner, where it meets the block of Nos. 325–333, to 21.3 m along: about **29.5 m**, against 26.41 m.
- **Satellite:** it agrees on both Geylang Road fronts standing about 3 m north of their source edges.
- **The strip between the walk-up and the source lines** holds the coffeeshop's awnings on the lane and the single-storey extension on Geylang Road. The source outline seems to follow those.
- **Heights:** the two drives disagree by about 11%: the lane gives the walk-up's parapet at 15.1 m, Geylang Road at 13.5 m. Both depths and both drives' camera heights check out. As at No. 323 on Lorong 19, the mean is used (lane readings ×0.947, Geylang Road readings ×1.059):
  - walk-up: five-foot way 3.9 m; window rows 5.3–6.7, 8.6–9.9 and 11.9–13.3 m; parapet **14.3 m**;
  - glass block: fascia 2.5–3.8 m; floor lines at 6.9, 10.5 and 14.2 m; top **18.6 m**.

**Layout:**
- **Faces:** the lane face is the front. The walk-up's Geylang Road front (edge 9), the glass front (edge 11), the step between them (edge 10), the glass block's west wall (edge 0) and the north wall on the side lane (edge 7) are side faces.
- **Proportions:** each is laid proportionally on its source edge: the lane face ×1.17, the walk-up's Geylang Road front ×0.95, the glass front ×0.90.
- **Volumes:** the glass block is a raised volume, from the walk-up's 14.3 m parapet to 18.6 m, over its part of the outline.
- **Estimates:** the north wall was read only obliquely, so its fittings are placed by estimate.
- **Not modelled:** the overhead bridge and its stair.
- **Footprint:** moving the outline onto the photographed walls is [open question 48](open-questions.md).

**Naming:** Google Maps lists **Cheng Yi Coffee Shop**, a seafood restaurant open until 1 am, at 351 Geylang Road, Singapore 389372, with its point inside this way. Its board is photographed.
- So the block is named after it, as Nos. 325–333 were after their tenants. Its name board and dish boards are redrawn in original type. The Chinese characters on the name board could not be read, so they are left out.
- No claim is made about the other premises or the glass block.

**Blank boards:**
- I-Tec Supermart (347) and the Geylang coffee shop (345) are listed as closed;
- 狮城百汇, a 24-hour supermarket listed at 349, has no photographed sign;
- the 5G board and a Bengali stall banner name no listed business.

Use `?review=cheng-yi`.

### 2–3. Ways 1223524387 and 1223524388: Nos. 5 and 7

North of the side lane, behind a grey boundary wall: a weathered cream three-storey walk-up pair under a hipped roof with deep eaves, sharing a stair lit by a breeze-block screen, brown over white.

- **No. 5** (the south half):
  - top floor: a window and a balcony with a railing;
  - first floor: a window and a balcony enclosed in a brick-red grille;
  - ground floor: grilled windows and a door under a zinc awning.
- **No. 7** (the north half): a balcony and a window on the top floor, and a balcony enclosed in a white grille on the first.
- **The wall:** letterboxes reading 5, 5A, 5B and 7, 7A, 7B, a black gate, and a car gate plated **7** in red. A white festival tent stands over No. 7's forecourt and is not modelled.

**Measurement:**
- **Depth:** the pairs' depth scores peaked 3–7 m in front, on the boundary wall and the tent. The stair screen was therefore followed between three April 2024 panoramas (`-BDV5…`, `8yiH…`, `O-hH…`). Its drift on a plane 4 m forward puts it **0.2 m behind** the source line, and on that plane the three views agree.
- **Extent:** read along No. 7's front from the party wall, the pair runs from **8.2 m south to 8.3 m north**: about **16.5 m**, against the 13.5 m of the two source ways. The party line is taken at the screen's centre, 0.4 m north of the source one.
- **The boundary wall:** followed between two panoramas by its letterbox panel, it stands **7.1 m in front of** the houses.
- **Heights:**
  - window rows: 0.5–2.1, 3.6–5.8 and 7.25–8.8 m;
  - floor ledge: 6.5 m;
  - eaves: 9.5–10.0 m;
  - hipped roof: to about 10.9 m.

**Layout:**
- Each house is laid proportionally on its own source edge (No. 5 ×0.78, No. 7 ×0.85). The stair screen is shared between them at the party wall.
- The boundary wall, its gates and the letterboxes are drawn at their triangulated line.
- The width is part of [open question 49](open-questions.md).

**Naming:** none.
- Google Maps lists New Century Realty & Trading at No. 5, and MP Express Services and the closed Di Zhong Hai Buffet Steamboat at No. 7. Their points lie in the corner block, and no sign for any of them was photographed.

Use `?review=l21-5` and `?review=l21-7`.

### 4–8. Ways 1223524384, 1223524383, 1223524382, 1223524385 and 1223524386: Nos. 9 to 19

A two-storey terrace over five-foot ways, cream at both ends and grey between. In April 2024 a festival at No. 19 had red-and-white tents, a yellow tarpaulin, an altar, flags and a paper furnace along its front and in the car park beyond; none of them is modelled.

**Measurement:** the five fronts were read together on one plane along No. 9's front (s north from its south corner).
- **Depth:** the lane panoramas' depth scores peak 3.5–4 m in front of the source line, on the festival tents. So the depth was read instead from:
  - **No. 9's gold emblem,** followed between `8yiH…`, `O-hH…`, `OXhE…` and `m4CG…`: 1.3–2.1 m in front;
  - **the strongest pair** (`OXhE…` with `m4CG…`, depth score 0.25): 1.25 m.

  On a plane **1.5 m in front of** the source line, rectified views at 0, 2 and 3.5 m bracket the agreement.
- **Party walls on that plane:** at s = 0, 7.0, 13.4, 19.7, 26.0 and 32.2, against the source's 0, 6.41, 12.82, 19.22, 25.62 and 32.02. They read from the windows' rhythm (about 1.95 m within a house, 2.4 m across a party wall) and the colour changes.
- **Heights:**
  - first-floor ledge: 3.1–3.4 m;
  - windows: 4.5–6.1 m, under louvred vents at 6.2–6.6 m;
  - dark parapet band: 7.0–7.75 m;
  - parapets: 7.8 m (grey) and 8.0 m (cream).

**Layout:**
- Each house is laid proportionally on its own source edge: No. 9 ×0.92, the others ×1.00–1.03.
- The five-foot ways are 1.6 m deep under a 3.1 m ceiling.
- The upper façades stand about 1.5 m in front of their source edges: part of [open question 49](open-questions.md).

| Stop | Way | House | Photographed | Named |
| --- | --- | --- | --- | --- |
| 4 | 1223524384 | **No. 9**: cream, three windows in raised surrounds under a deep cornice. A vertical board on its south pilaster reading 宁玛噶陀 NYINGMA KATHOK under an emblem; a gold dharma wheel between two gold deer on the ledge; a wooden door and a glazed front under a Tibetan valance, with a framed board reading 宁玛噶陀佛学会 NYINGMA KATHOK BUDDHIST CENTRE under a line of Tibetan script | 7.0 m | **Nyingma Kathok Buddhist Centre** |
| 5 | 1223524383 | **No. 11**: weathered grey, three windows under louvred vents and a dark parapet band, over an open five-foot way stacked with goods | 6.4 m | No |
| 6 | 1223524382 | **No. 15**: like No. 11, its five-foot way behind the yellow tarpaulin | 6.3 m | No |
| 7 | 1223524385 | **No. 17**: like No. 11, a grilled window and a grilled gate in its five-foot way | 6.3 m | No |
| 8 | 1223524386 | **No. 19**: cream, three windows under louvred vents. A temple doorway under a red banner reading 玄天上帝, hung with lanterns lettered 北辰宫. Its blank north wall faces the car park | 6.2 m | **Bei Chen Gong Association** |

**Naming:**
- **Nyingma Kathok Buddhist Centre:** listed at 9 Lor 21 Geylang, Singapore 388456. Its point lies in the walk-up pair next door, but the address and the signs agree on this house, so it is named (as at Crystal Mansions, open question 32).
  - Its boards are redrawn in original type, with the Tibetan script drawn as a plain gold band.
  - L E Fashion, also listed at No. 9, is closed.
- **Bei Chen Gong Association:** listed at 19 Lor 21 Geylang, Singapore 388462, with its point inside this way. It is named after its lanterns, which carry the temple's name; the banner names its deity, Xuan Tian Shang Di. The banner and a lantern are redrawn in original type.
- **The grey houses:** Leong Yew Textiles is listed at No. 11, but its point lies in the corner block and no sign was photographed. Nothing is listed at Nos. 15 and 17.

Use `?review=nyingma-kathok`, `?review=l21-11`, `?review=l21-15`, `?review=l21-17` and `?review=bei-chen-gong`.

North of No. 19 the west side opens onto a car park with a barrier gantry and street trees, up to Lorong Bachok. It has no footprint.

### 9. Way 454254329: 29 Lorong Bachok, Tan Ser Seng Herbal Soup

A grey stuccoed two-storey corner shophouse at Lorong 21 and Lorong Bachok, its long side on the lane.

- **The splayed corner:** under a curved parapet cap, a red-framed board reading **陳生成 TAN SER SENG HERBAL SOUP SINCE 1946**.
- **Along Lorong 21:**
  - upper floor: eight windows under louvred vents, two of them grilled, below a red moulding and a plain parapet;
  - ground floor: an open coffeeshop under red-and-green striped awnings on square columns, closed at the north end by a white wall and a door on the back lane.
- **On Lorong Bachok:** one window under a vent, over the coffeeshop. The Bachok row continues west and waits for a later pass.

**Measurement:**
- **Depth:** on the source plane, the two grilled windows near the north end disagree by 4–5 m between `02Jz…`, `CWWn…` and `rci6…` (April 2024). On a plane **3.25 m in front of** the source edge they agree within 0.5 m. The depth scores agree (3.0–3.5 m).
  - A first reading from one window's drift (2.45 m) had matched the wrong window between views.
- **Extent:** on that plane the face runs from the splay, 1.3 m from the Bachok corner, to the back lane, **26.1 m** along, against the 26.5 m source edge.
- **Heights:**
  - awnings: 2.6–3.75 m;
  - windows: 4.6–5.9 m, under vents at 6.0–6.5 m;
  - red moulding: 7.6–7.8 m;
  - parapet: 8.5 m;
  - corner cap: to about 9.2 m.

**Layout:**
- **Lane face:** laid proportionally on the source edge (×1.07). The splay and its board are drawn on the face's first 2.8 m, since the source outline is square-cornered.
- **The Lorong Bachok front:** a side face. It stands 0.75 m clear of Bachok's estimated carriageway, so its awning is held to 0.6 m.
- **Roof:** the tiled roof seen on the satellite is a hipped roof behind the parapet.
- **Footprint:** the face stands about 3.25 m in front of its source edge: part of [open question 49](open-questions.md).

**Naming:** Google Maps lists **Tan Ser Seng Herbal Soup 陳生成山瑞补品**, a soup shop, at 29 Lor Bachok, with its point in the house next door to the west. It also lists a herbal soup store at the same address, with its point inside this way.
- The address and the board agree on this house, so it is named, and its board is redrawn in original type.

Use `?review=tan-ser-seng`.
