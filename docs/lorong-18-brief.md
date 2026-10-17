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
| 1 | Geylang Road | 541941365 | Le Regal, 340 Geylang Road: the west corner, back to Lorong 16 | |
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
