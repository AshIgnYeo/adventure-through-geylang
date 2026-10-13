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
| 2 | West | 1223524387 | No. 5 | |
| 3 | West | 1223524388 | No. 7 | |
| 4 | West | 1223524384 | No. 9, Nyingma Kathok Buddhist Centre | |
| 5 | West | 1223524383 | No. 11 | |
| 6 | West | 1223524382 | No. 15 | |
| 7 | West | 1223524385 | No. 17 | |
| 8 | West | 1223524386 | No. 19, Bei Chen Gong Association | |
| 9 | West | 454254329 | 29 Lorong Bachok, the Bachok corner: Tan Ser Seng Herbal Soup | |
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
