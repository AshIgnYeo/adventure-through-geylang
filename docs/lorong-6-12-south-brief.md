# Lorongs 6, 8, 10 and 12 south of the study rectangle

Research and implementation from **14 November 2026**, under open questions 84 and 92. This brief covers `src/lorong-6-12-south-layout.mjs`.

## Scope and method

- **Stretch:** Lorongs 6, 8, 10 and 12 from the study rectangle's south edge (1.3115 N) to the extract's (1.3110 N), and the service road between Lorongs 4 and 6. Twenty outlines stand along them inside the extract.
- **Map:** `scripts/prepare-map.mjs` takes the twenty buildings and the lanes' ways by id. Lorongs 6 and 8 were never in the derived road set, so their ways are taken in whole, from the back lane behind Geylang Road to the extract's edge, and the lanes gain road surface where the ring-south exteriors already stand; Lex Hotel's review view is unchanged by it. The service road's ways have no name in the source and are taken in as "Service road" (`prepare-map` now names unnamed ways so). Lorongs 6 and 12 run about 15 and 12 m past the extract's edge, to take in the fronts of the plots straddling it.
- **Imagery:** KartaView's drives of 16 and 19 May 2023 up all four lanes and the service road (sequences 8344969 and 8344809). The 16 May frames on Lorong 8 sit about 12 m west of the lane, so the 19 May drive is used there. Positions are the GPS fix moved about 10 m along the drive.
- **Modelling:** photographed massing on the source outlines, as on the lanes north of Sims Avenue, with heights from storey counts carrying about ±2 m, ±4 m for the blocks of six storeys or more.
- **Naming:** every building is unnamed for now (open question 84); legible signs and source names are recorded below.

## Status, 14 November 2026

**Complete.** All twenty plots are modelled as massing.

## The plots

| Plot | Way | As photographed | Height |
| --- | --- | --- | --- |
| No. 5 Lorong 6, east side | 454274481 | About eight storeys in pastel bands of pink, cream and green, behind a palm and a dark wall with a green mark reading five and HOTEL SPLENDOUR. | About 26 m |
| No. 20 Lorong 6, on the service road | 454254191 | Cream-yellow, about eight storeys, with grey vertical bands and small square windows. The source way is named ibis budget Singapore Emerald. | About 26 m |
| Service road, east side | 1223129486 | White, about eight storeys, grey glass balconies over an open car park. The source way is named Royce Residences. | About 25 m |
| No. 5, service road | 454254199 | Peach and cream apartments of about eight storeys with brown bays and balconies. The source way is named Wang Lodge. | About 25 m |
| No. 7, service road | 454254198 | Peach apartments of about six storeys. The source way is named Fern Lodge. | About 19 m |
| Service road, south end | 1236158086 | Cream, about four storeys, with grey bands. | About 13 m |
| Five houses on Lorong 8's west side | 454274470, 454274479, 454274473, 454274475, 454274477 | A row of single-storey houses under red tiled roofs, with blue gates, blue painted steps and railings. | About 3.6 m to the eaves |
| Temple on Lorong 8's west side | 454274466 | A small single-storey temple under a red tiled hipped roof, with red columns, behind an ochre wall capped in red. Its name board could not be read. | About 4.4 m to the eaves |
| Nos. 19 and 19A Lorong 8 | 1223401724, 454438336 | A four-storey row of white and grey townhouses with recessed balconies, a red tiled canopy and red 19 plates. | About 13 m |
| No. 19A Lorong 8, the hotel | 121873782 | Pale blue-grey, about five storeys, with dark window bands and a dark colonnade. The source way is named Hotel 81 Orchid. | About 17 m |
| Lorong 10, west side | 454438333 | White and cream, about five storeys, with stacked blue windows and a board reading K HOTEL 14 (drawn blank). | About 17 m |
| Lorong 10, east side | 454438325 | A white two-storey house with green-framed windows and a NOMADIO board. | About 7.5 m to the eaves |
| Lorong 10, east side | 454438324 | About seven storeys painted in triangles of blue, red, teal and cream; its gate wall reads La Mode Hotel 歌迪雅旅店. | About 24 m |
| Lorong 10, east side | 454438322 | A peach two-storey house under a brown gabled roof. | About 6.5 m to the eaves |
| No. 21 Lorong 12 | 454438317 | Slate blue, about four storeys, with gold bands, over a car park, with a NOW OPEN banner. | About 16 m |

Use `?review=l6-5`, `?review=l6-20`, `?review=sr-royce`, `?review=sr-5`, `?review=sr-7`, `?review=sr-block`, `?review=l8-terrace-1` to `?review=l8-terrace-5`, `?review=l8-temple`, `?review=l8-19`, `?review=l8-19a`, `?review=l8-19a-hotel`, `?review=l10-14`, `?review=l10-house`, `?review=l10-la-mode`, `?review=l10-peach` and `?review=l12-21`.
