# Lorongs 4, 6 and 8 south to Guillemard Road

Research and implementation from **28 November 2026**, under open questions 84 and 101. This brief covers `src/south-lanes-layout.mjs`.

## Scope and method

- **Stretch:** Lorong 4's east side from the service road to Guillemard Road, and both sides of Lorongs 6 and 8 south of question 92's stretch, with the lanes' ways and the service road from Lorong 4 to Lorong 6. Lorong 4's west side lies outside both extracts.
- **Source:** the dated extension `public/osm-extension.osm` (question 81), taken in by id.
- **Imagery:** KartaView's drive of 19 May 2023 (sequence 8344969), which runs along all three lanes and the service road. Its fixes trail its true position by about 10 m along its path, so plots are matched to the frames by their order along each lane.
- **Modelling:** photographed massing on the source outlines, 32 plots, with heights from storey counts carrying about ±2 m (±4 m for blocks of six storeys or more). Lorong 8's corridor is 13 m wide either side, as Lorongs 14 and 16 are, so the set-back blocks on its east side can be looked at from it.
- **Naming:** every building is unnamed for now (question 84); legible signs and source names are recorded below.

## Status, 28 November 2026

**Complete** for the plots facing the three lanes.

## Lorong 4, east side

| Plot | Way | As photographed | Height |
| --- | --- | --- | --- |
| The weathered white house | 454254196 | Three storeys, a red tiled canopy over a forecourt of potted plants, a dark board with gold characters. | About 10 m |
| The houses with the hanging garden | 454254194 | Three storeys under a red tiled roof, a hanging garden along the upper floor, car porches. | About 10 m |
| The peach and teal block | 454254190 | Five storeys, teal balcony fronts, red doors, a glass-block stair. | About 16.4 m |
| The cream walk-up flats | 454274447 | Four storeys, louvred vents, shops with red lanterns, the north end under scaffolding in May 2023. | About 13.2 m |
| The white house with red window frames | 454274444 | Three storeys, red-brown frames under louvred vents. | About 10 m |
| The house at the Guillemard Road end | 454274442 | Three storeys, seen at the frames' edge. | About 10 m |

## Lorong 6, west side

| Plot | Way | As photographed | Height |
| --- | --- | --- | --- |
| The semi-detached pair | 454254193 | Cream, three storeys under red tiled roofs, two small tiled porch gables, a white wall with arched niches. | About 10 m |
| No. 44, at the service road | 454254189 | A hotel of about seven storeys, white over a deep orange-red ground floor; its service road face reads KIM TIAN HOTEL 金田酒店 (the source way is named Oxley Hotel). | About 22.8 m |
| The salmon row | 454254188 | Three storeys, a five-foot way behind square piers. | About 10 m |
| The white modern house, the cream terrace house, the blue house | 454254187, 454254186, 454254185 | Three-storey houses; the blue one with a red tiled canopy. | About 10 m |

## Lorong 6, east side

| Plot | Way | As photographed | Height |
| --- | --- | --- | --- |
| The dark condominium | 454274464 | About eight storeys in dark grey and teal, glass balconies, a yellow-framed bay over the car park entrance; its plaque reads Treasures. | About 26 m |
| The house with the blue awning | 454274450 | Two storeys, a blue scalloped awning over a shop. | About 6.8 m |
| The house with the turquoise shop | 454274453 | Three storeys, a timber-railed balcony, a turquoise shop front reading FelinCity. | About 10 m |
| Torieville | 454254180 | Five storeys, cream over brown lower floors, behind a tiled wall. | About 16.4 m |
| No. 69, Canberlin Lodge | 454254179 | Six storeys, cream with pink bays and bay windows; its gate wall reads 69 CANBERLIN LODGE. | About 19.6 m |

## Lorong 8, west side

| Plot | Way | As photographed | Height |
| --- | --- | --- | --- |
| The white tower with green frames | 454274469 | About eight storeys, deep green window frames, boards reading 81 and PARIS. | About 26 m |
| No. 38 | 541941374 | Six storeys, yellow accents, glass balconies and grey fins. | About 19.6 m |
| The clan association block | 454274461 | Six storeys, red bands between green glass, its fascia reading TEO ANN HUAY KUAN. | About 19.6 m |
| The old row | 454274459 | Three storeys, a red tiled canopy, flags and an orange hoarding; a board reading 社志勵陽…. | About 10 m |
| The bungalow | 454274457 | Single-storey under a blue-green tiled roof, behind a corrugated hoarding. | Eaves about 3.4 m |
| The grey-blue apartments | 454274454 | Six storeys banded in grey tiles (the source way is named Aston Lodge). | About 19.6 m |
| The grey walk-up | 454254176 | Four storeys banded in blue. | About 13.2 m |
| The white terrace | 454254177 | Three storeys with louvred vents, an orange house at its south end. | About 10 m |
| Swann Court | 454254178 | Five storeys, white, behind a white wall with its name. | About 16.4 m |

## Lorong 8, east side

| Plot | Way | As photographed | Height |
| --- | --- | --- | --- |
| The white block with louvred windows | 454438341 | About six storeys, a blue canopy. | About 19.6 m |
| The cream, pink and orange houses | 454438342 | Three two-storey houses. | About 7.6 m |
| The house with the balcony | 454438343 | Two storeys, a covered balcony hung with laundry. | About 7.6 m |
| No. 61 | 121873724 | A pale grey-blue hotel of five storeys over a black stone wall lettered 61. | About 16.4 m |
| Familie Mans | 454438346 | Six storeys, pale pink, arched windows. | About 19.6 m |
| The clan association house | 454438345 | Four storeys with salmon piers; its board reads 清河張氏公會 CHIN HO TEO CLAN ASSOCIATION. | About 13.2 m |

Use `?review=l4-white-row`, `?review=l4-green-house`, `?review=l4-teal-block`, `?review=l4-walk-up`, `?review=l4-red-frames`, `?review=l4-south-house`, `?review=l6-gabled-pair`, `?review=l6-44`, `?review=l6-salmon-row`, `?review=l6-white-modern`, `?review=l6-cream-terrace`, `?review=l6-blue-house`, `?review=l6-condo`, `?review=l6-blue-awning`, `?review=l6-cat-cafe`, `?review=l6-torie-ville`, `?review=l6-69`, `?review=l8-green-frames`, `?review=l8-38`, `?review=l8-teo-ann`, `?review=l8-old-row`, `?review=l8-bungalow`, `?review=l8-aston`, `?review=l8-grey-walk-up`, `?review=l8-white-terrace`, `?review=l8-swann`, `?review=l8-louvred-block`, `?review=l8-pastel-houses`, `?review=l8-balcony-house`, `?review=l8-61`, `?review=l8-familie` and `?review=l8-clan-house`.
