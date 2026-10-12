# Lorong 19 Geylang

Research and implementation from **12 October 2026**, under open question 42. This brief covers `src/lorong-19-layout.mjs`.

## Scope and method

- **Stretch:** Lorong 19 from Geylang Road to Sims Avenue, with the corner buildings at both ends of both sides. The part north of Sims Avenue, the Lorong Bachok row and the far sides of Geylang Road and Sims Avenue wait for a later pass.
- **Block faces:** the Geylang Road houses between Lorong 17 and Lorong 19 are taken in, because the Geylang Road link runs past them. Sims Avenue Nos. 136–144 wait for measurement. Both are [open question 43](open-questions.md).
- **Map:** `scripts/prepare-map.mjs` takes the lane's buildings and its seven road ways by id, with Lorong Bachok's mouth and the Geylang Road and Sims Avenue links from Lorong 17's junctions. The study rectangle is unchanged. The lane and both links are walkable corridors (`corridors` in `map.json`), carried about 16–21 m past Lorong 19's junctions to take in the east corners' faces.
- **Order:** north up the west side from Geylang Road, then south down the east side from Sims Avenue, then the Geylang Road houses west from the corner. Each stop is one photographed building, measured and modelled before the next.
- **Imagery:** the June 2024 Lorong 19 drive, southbound, from `7HvC…` at the Sims Avenue end to `_V35…` at Geylang Road, about 10 m apart, with the Geylang Road and Sims Avenue drives at the corners.
- **Naming:** unchanged. A business is named only when Google Maps lists it at that address and its sign shows in the photograph. Other buildings are labelled by address, with their signboards drawn and their lettering blank.
- **Code:** each place is a measured elevation on one edge of its footprint, built with the lane-house helpers shared with Lorong 17 (`src/lane-house-layout.mjs`, `src/lane-house.ts`).

## The walk

| Stop | Side | Source way | Building | Status |
| --- | --- | --- | --- | --- |
| 1 | West | 454254263 | No. 323 Geylang Road, the west corner | |
| 2 | West | 454254248 | No. 1, The Primero | |
| 3 | West | 476113985 | No. 3 | |
| 4 | West | 454254241 | No. 21, Nanyang Chee Clan Association | |
| 5 | West | 476113983 | No. 23 | |
| 6 | West | 476113984 | No. 25, Chee Hoe Hong | |
| 7 | West | 454254239 | No. 29, Lei Zang Si | |
| 8 | West | 454254309 | No. 33, Treasures @ G19 | |
| 9 | West | 454254310 | No. 146 Sims Avenue, the west corner | |
| 10 | East | 454254339 | No. 148 Sims Avenue, the east corner | |
| 11 | East | 454254314 | Kang Ha Pheng Sim Kok, 1 Lorong Bachok | |
| 12 | East | 454254247 | Bougainvilla Apartments | |
| 13 | East | 1223524381 | No. 6 | |
| 14 | East | 454254246 | Sims Point | |
| 15 | East | 454254168 | Nos. 325–333 Geylang Road, the east corner | |
| 16–20 | Geylang Road | 454254262 to 454254254 | Nos. 321 to 313, west from the corner | |

The names in the table are those Google Maps gives for each address. Whether a building is named in the model is decided at its stop.
