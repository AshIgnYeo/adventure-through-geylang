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
| 1–3 | West | 764372569, 764372571, 764372570 | Nos. 314, 312 and 310 Geylang Road, the west corner: Chang Jiang G1 Claypot Frog Porridge (314), B & S Mini Mart (310) | |
| 4 | West | 763764689 | The pink walk-up behind the car park | |
| 5 | West | 763764687 | No. 20, Hotel 81 Geylang | |
| 6 | West | 763764688 | No. 24, Then Shen Temple | |
| 7 | West | 763764676 | No. 30, Crystal Lodge | |
| 8 | West | 764372580 | No. 50 | |
| 9 | West | 763764654 | No. 54 | |
| 10–12 | East | 763764664, 763764665, 763764666 | The terrace at the head of Westerhout Road | |
| 13–14 | East | 763764667, 763764668 | The terrace's west end, on the grassed verge | |
| 15–22 | East | 454274647, 763764669, 763764670, 763764671, 763764672, 763764673, 763764674, 763764675 | The row south of Hotel 81 Palace: Lodge 41 (41), Soon Clan Association (43) | |
| 23 | East | 121872890 | No. 25, Hotel 81 Palace | |
| 24–28 | East | 763764678, 763764679, 763764680, 763764681, 763764682 | Nos. 19, 17, 15, 11 and 9 | |
| 29–32 | East | 763764686, 763764685, 763764684, 763764683 | Nos. 7, 5, 3 and 1, on the back lane | |

The names in the table are those Google Maps gives for each address, or the source map's house numbers where no listing gives one. Whether a building is named in the model is decided at its stop.
