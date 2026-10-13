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
| 1 | West | 454254167 | Nos. 335–351 Geylang Road, the west corner | |
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
