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
| 1 | West | 454254264 | No. 301 Geylang Road, the corner block: its Lorong 17 faces | Done; named Sheng Siong Supermarket and Anytime Fitness Geylang Central |
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

## West side

### 1. No. 301 Geylang Road: Sheng Siong Supermarket and Anytime Fitness Geylang Central

The four-storey corner block runs from Lorong 15 to Lorong 17. Its Geylang Road, Lorong 15 and Lorong 15 corner faces were modelled in the widened ring (`src/ring-a-layout.mjs`). Its two Lorong 17 faces, source edges 2 and 1, were plain walls.

- **Lorong 17 splayed corner (edge 2):** three floors of seven-pane, orange-framed windows under blue sunshade bands, as on the other faces. The supermarket's 昇菘超市 lettering and mark are on the first-floor glazing. The ground floor is a Bee Cheng Hiang shop: red awning, three yellow boards and yellow vertical signs at both ends.
  - **Measurement:** `xZa1…` (April 2024) and `R0li…` (June 2024), seen from opposite sides of the corner, agree on its two ends on the source plane: the splay photographs **8.8 m** wide against the 7.32 m source edge.
- **Lorong 17 face (edge 1):** from the corner going north:
  - one bay of six-pane windows on three floors under the sunshade bands;
  - a blue glass curtain-wall stair tower, rising about 0.35 m above the parapet;
  - a plain wall to the north end.
  - **Ground floor:** a glazed shopfront, food-photo boards, a shuttered unit under a dark awning, the stair tower's lobby door and glass panel, and a grilled gate.
  - **Measurement:** read on a frame rectified from `BUPe…` (April 2024), which looks square at the face from 8 m. On a plane **0.9 m in front of** the source edge, the band spacing matches the other faces. The face photographs about **13.5 m** against the 14.9 m source edge. A street tree hides most of the face from the June 2024 drive.
- **Layout:** both faces are laid proportionally on their source edges. Storey and band heights are the block's existing ones.
- **Naming:** Google Maps lists two tenants at 301 Geylang Road in October 2026, sharing a point inside the way:
  - **Sheng Siong Supermarket**, #01-02, open 24 hours;
  - **Anytime Fitness Geylang Central**, #04-01, open 24 hours.

  Both signs are photographed: the supermarket's lettering on the window banners and awning valances, and the gym's black blade on the Geylang Road face. So the block is named after them, and those signs are redrawn in original type, with no claim about the other floors. Bee Cheng Hiang (301 Geylang Road) is listed as permanently closed, so its boards stay blank, and the BCH@301 rooftop sign stays blank with it.
- **Change of identity:** the place id changes from `gr-301` to `sheng-siong-301`.

Use `?review=sheng-siong-301`.
