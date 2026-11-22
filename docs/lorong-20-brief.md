# Lorong 20

Research and implementation from **22 November 2026**, under open questions 81 and 84. This brief covers `src/lorong-20-layout.mjs`.

## Scope and method

- **Stretch:** Lorong 20 from Geylang Road to Guillemard Road, about 285 m: the 23 outlines that face the lane, with the Geylang Road corner east of it and the last houses before Guillemard Road.
- **Source:** the dated extension `public/osm-extension.osm` (103.8758–103.8822 E, 1.3095–1.3155 N, retrieved 22 November 2026). Its ways are taken in by id; the retained extract keeps its versions where both hold an element. Two of the west side's outlines (121873024 and 454274591, the deep plots behind Lorong 18's east side) were already in the retained extract.
- **Map:** `scripts/prepare-map.mjs` takes the lane's thirteen ways, Geylang Road's way east of No. 364, Guillemard Road's two ways at the lane's mouth and Westerhout Road's east mouth, with corridors along the lane and the two main roads.
- **Imagery:** KartaView's drive of 19 May 2023 (sequence 8344969), which turns into the lane from Westerhout Road and from Guillemard Road and runs up it twice. Its fixes trail its true position by about 10 m along its path, so plots are matched to the frames by their order along the lane rather than by bearings alone. The storage host refused images on 22 November, so they were fetched from KartaView's own CDN, which serves the same files.
- **Modelling:** photographed massing on the source outlines, as on the lanes north of Sims Avenue, with heights from storey counts carrying about ±2 m (±4 m for blocks of seven storeys or more).
- **Naming:** every building is unnamed for now (open question 84); legible signs are recorded below.
- **Left for later:** the Westerhout Road row west of the lane (question 72), the block's Lorong 22 side, and Geylang Road's south side east of the corner.

## Status, 22 November 2026

**Complete.** All 23 plots are modelled as massing.

## East side, north to south

| Plot | Way | As photographed | Height |
| --- | --- | --- | --- |
| Geylang Road corner | 454438313 | Peach, three storeys, white below the first-floor sill, brown mosaic piers, a shop under a blue canopy with green boards reading HAO mart. | About 10.4 m |
| No. 1 | 763764650 | A modern block of about five storeys behind trees, screened by grey louvres with red and green braces, behind a grey wall painted with coloured stepped lines. | About 17 m |
| Behind No. 1 | 454274568 | A pale two-storey house with a white fretwork railing under a dark tiled roof. | Eaves about 6.8 m |
| The pale blue hotel | 454274563 | Five storeys, teal windows in strips, a driveway through the ground floor under a board reading HOTEL 81. | About 17.5 m |
| No. 31 | 454274565 | White, seven storeys, red-framed windows, a red bay and a red 31, over a car park. | About 23 m |
| No. 33 | 454274559 | Single-storey under orange tiles behind a red brick wall. | Eaves about 3.6 m |
| No. 35 | 454274557 | A white condominium of seven storeys with a dark brown clad band; its gate plaque reads Treasures @ 20, 35 Lorong 20 Geylang. | About 23 m |
| The block with curved balconies | 454274586 | White, five floors of curved balconies with grey glass rails over a car park. | About 19 m |
| The peach block | 454274554 | Six storeys, brown vertical bands, white-framed windows. | About 19.5 m |
| The pink houses | 454274551 | Two-storey houses, pink and white, with red tiled porch canopies behind gates. | Eaves about 6.8 m |
| The cream flats | 454274550 | Cream walk-up flats of four storeys with red-framed windows under blue awnings. | About 12.8 m |

## West side, north to south

| Plot | Way | As photographed | Height |
| --- | --- | --- | --- |
| The cream and grey hotel | 121873024 | Nine storeys, cream banded in grey across the middle floors, boards reading ibis budget HOTEL. | About 30 m |
| The blue-grey hotel | 454274591 | Nine storeys, a porch under a board reading HOTEL 81. | About 29 m |
| The single-storey row | 454274594 | Orange tiles, blue eaves, air-conditioning units and a garden of potted plants. | Eaves about 3.4 m |
| The white house with arched windows | 454274588 | Four storeys behind trees, arched windows and a dark gated car porch. | About 12.6 m |
| Nos. 38-40, the Westerhout Road corner | 764372538 | Single-storey, turquoise walls and gate piers with red plates 38 and 40, under a dark tiled roof with a red-edged eave. | Eaves about 3.4 m |
| No. 54, Westerhout Road's south corner | 764372525 | White, four storeys, a red column at the corner. | About 13 m |
| No. 56 | 454274547 | White, three storeys, a blue awning above and a red tiled porch roof below. | About 9.6 m |
| No. 58 | 764372526 | Weathered white walk-up flats of three storeys with small balconies. | About 9.8 m |
| Nos. 60 and 62 | 764372524, 764372523 | A pair of peach two-storey houses under orange tiled roofs. | Eaves about 6.4 m |
| Nos. 62A and 62C, at Guillemard Road | 764372522, 764372521 | A weathered white two-storey row under a corrugated roof edge, over shop fronts. | About 7 m |

Use `?review=l20-geylang-corner`, `?review=l20-1`, `?review=l20-fretwork`, `?review=l20-hotel-east`, `?review=l20-31`, `?review=l20-33`, `?review=l20-35`, `?review=l20-balconies`, `?review=l20-peach`, `?review=l20-pink-houses`, `?review=l20-flats`, `?review=l20-ibis`, `?review=l20-hotel-west`, `?review=l20-red-roofs`, `?review=l20-arched`, `?review=l20-38`, `?review=l20-54`, `?review=l20-56`, `?review=l20-58`, `?review=l20-60`, `?review=l20-62`, `?review=l20-62a` and `?review=l20-62c`.
