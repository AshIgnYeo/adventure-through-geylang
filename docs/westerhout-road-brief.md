# Westerhout Road

Research and implementation from **22 November 2026**, under open questions 72 and 84. This brief covers `src/westerhout-road-layout.mjs`.

## Scope and method

- **Stretch:** Westerhout Road from Lorong 16 to Lorong 20. Its north side between Lorongs 16 and 18 was already modelled with those lanes; this pass takes in the south side's terrace row between Lorongs 16 and 18, the two houses either side of Lorong 18's stub, and the north side between Lorong 18 and the Lorong 20 corner.
- **Source:** the dated extension `public/osm-extension.osm` (question 81). The road's two ways not yet in the map (644902168 and 784675505 west of Lorong 18, 666020390 east of it) come in by id, with a corridor along the whole road.
- **Imagery:** KartaView's drive of 19 May 2023 (sequence 8344969, frames 724-744), which turns into the road from Lorong 16 and runs along it to Lorong 20.
- **Modelling:** photographed massing on the source outlines. The terrace houses' outlines step out at a porch bay; each is laid on the main segment of its front, with the bay as a side face carrying its canopy.
- **Naming:** every building is unnamed for now (question 84). House numbers are the source ways' tags, and agree with the plates photographed on Nos. 2, 56 and 61.
- **Correction to Lorong 20:** the frames along the road show the Lorong 20 corner outline (way 764372538, tagged No. 71) holding two buildings. A white three-storey block on red columns stands at the corner, and the turquoise single-storey house modelled with Lorong 20 stands north of it. The Lorong 20 model now carries the corner block as an upper volume and names the outline No. 71 Westerhout Road.
- **Left for later:** Lorong 18's stub south of the road, whose west side now has outlines in the extension (No. 50, way 454274629).

## Status, 22 November 2026

**Complete.** All eleven plots are modelled as massing.

## The plots

| Plot | Way | As photographed | Height |
| --- | --- | --- | --- |
| No. 2, the Lorong 16 corner | 121873029 | White, two storeys, maroon-framed windows, a red tiled porch roof and a black gate with a red plate 2. | Eaves about 7 m |
| No. 4 | 764372536 | Pink, a gable over its top floor, an orange tiled canopy. | About 10.2 m |
| No. 6 | 764372535 | White under orange tiled canopies, a balcony garden. | About 10.2 m |
| No. 8 | 764372533 | White under blue tiled roofs, arched windows framed in blue. | About 10.2 m |
| No. 10 | 764372534 | Pink with red tiled canopies. | About 10.2 m |
| No. 12 | 764372531 | Grey-blue with a red tiled canopy and orange-framed windows. | About 10.2 m |
| No. 14 | 764372532 | White, arched windows under a red tiled roof, a small turret over its porch bay. | About 10.2 m |
| No. 54, at Lorong 18's stub | 764372527 | Single-storey under an orange tiled hipped roof. | Eaves about 3.4 m |
| No. 56 | 454274544 | White, single-storey under an orange tiled hipped roof, behind a tiled forecourt, with a red plate 56 and a painted landscape board (drawn blank). | Eaves about 3.4 m |
| No. 61 | 454438307 | A cream hotel of five storeys with rust-red bands and window hoods, a grey ground floor striped in red, red lettering reading RedDoorz (not drawn) and the plate 61. | About 16.5 m |
| No. 69 | 764372539 | A single-storey kiosk under a corrugated roof, drink fridges and a red vending machine. | About 3.2 m |

Use `?review=wh-2`, `?review=wh-4`, `?review=wh-6`, `?review=wh-8`, `?review=wh-10`, `?review=wh-12`, `?review=wh-14`, `?review=wh-54`, `?review=wh-56`, `?review=wh-61` and `?review=wh-69`.
