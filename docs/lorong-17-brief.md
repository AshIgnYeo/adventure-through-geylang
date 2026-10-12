# Lorong 17 Geylang

Research and implementation from **12 October 2026**, under the owner's answer to open question 35. This brief covers `src/lorong-17-layout.mjs` and the Lorong 17 faces of the corner buildings modelled elsewhere.

## Scope and method

- **Stretch:** Lorong 17 from Geylang Road to Sims Avenue, with the corner buildings at both ends. The part north of Sims Avenue, the Geylang Road houses east of the corner and Sims Avenue Nos. 136 onward wait for a later pass.
- **Map:** `scripts/prepare-map.mjs` takes the lane's eleven new source ways and its seven road ways by id, with the Geylang Road and Sims Avenue links to its junctions. The study rectangle is unchanged. The lane and its junctions are walkable corridors (`corridors` in `map.json`, `studyArea()` in `src/geo.mjs`): within 10 m of the lane's centreline, and of the two links.
- **Order:** north up the west side from Geylang Road, then south down the east side from Sims Avenue. Each stop is one photographed building, measured and modelled before the next.
- **Imagery:** the June 2024 Lorong 17 drive (`h2GM…` at the Geylang Road end to `Zwx6…` at Sims Avenue, about 10 m apart, heading north), with the Geylang Road and Sims Avenue drives at the corners.
- **Naming:** unchanged. A business is named only when Google Maps lists it at that address and its sign shows in the photograph. Other buildings are labelled by address, with their signboards drawn and their lettering blank.

## The walk

| Stop | Side | Source way | Building | Status |
| --- | --- | --- | --- | --- |
| 1 | West | 454254264 | No. 301 Geylang Road, the corner block: its Lorong 17 face | To do |
| 2 | West | 454254236 | North of the corner block | To do |
| 3 | West | 454254237 | North of No. 2 | To do |
| 4–14 | West | 454254272 … 454254280 | The eleven walk-ups | Massing, to rebuild |
| 15 | West | 682928766 | No. 130 Sims Avenue, the corner: its Lorong 17 face | To check |
| 16 | East | 682928733 | No. 134 Sims Avenue, the corner | Massing, to rebuild |
| 17–18 | East | 454254307, 454254308 | South of No. 134 | To do |
| 19 | East | 454254240 | The long building | To do |
| 20 | East | 454254238 | | To do |
| 21–24 | East | 454254249 … 454254251 | Four narrow units | To do |
| 25 | East | 454254253 | The Geylang Road corner house | To do |

A stop is a building as photographed, not a source way. Where the two disagree, the difference is recorded below and, if it needs the owner, logged in [open questions](open-questions.md).
