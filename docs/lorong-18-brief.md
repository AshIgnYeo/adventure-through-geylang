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
| 2 | West | 454274650 | No. 10, OYO 102 Budgetone Hotel | |
| 3 | West | 454274632 | No. 14, Cygon | |
| 4 | West | 764372568 | No. 16 | |
| 5 | West | 764372567 | No. 18 | |
| 6 | West | 764372566 | No. 20, Club 20 | |
| 7 | West | 454274634 | No. 22 | |
| 8 | West | 764372565 | No. 24 | |
| 9 | West | 454274635 | No. 26 | |
| 10 | West | 454274637 | No. 28 | |
| 11 | West | 454274639 | No. 30 | |
| 12 | West | 454274640 | No. 32 | |
| 13 | West | 764372564 | No. 34 | |
| 14 | West | 764372563 | No. 36 | |
| 15 | West | 454274642 | No. 38 | |
| 16 | West | 764372562 | No. 40, 浯乡陈氏公会 | |
| 17 | West | 454274643 | No. 42 | |
| 18 | West | 764372561 | No. 44 | |
| 19 | West | 454274645 | No. 44B, the Westerhout Road west corner | |
| 20 | East | 764372540 | No. 55, the Westerhout Road east corner | |
| 21 | East | 121872891 | No. 31, Hotel 81 Star | |
| 22 | East | 764372541 | Nos. 21 and 25, Diamond Hotel | |
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
