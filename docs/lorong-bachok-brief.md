# Lorong Bachok

Research and implementation from **14 November 2026**, under open questions 84 and 93. This brief covers `src/lorong-bachok-layout.mjs`.

## Scope and method

- **Stretch:** the north side of Lorong Bachok between Kang Ha Pheng Sim Kok (No. 1, the Lorong 19 corner, already modelled with Lorong 19) and Tan Ser Seng (No. 29, the Lorong 21 corner, already modelled with Lorong 21). The source has twelve outlines between them, ways 454254315 to 454254328, each 5.84 m wide.
- **Map:** `scripts/prepare-map.mjs` takes the twelve outlines and the lane's two middle ways (666807846 and 762269508), which join the mouths already taken with Lorongs 19 and 21. A corridor runs the length of the lane.
- **Imagery:** KartaView's drive of 16 May 2023 along the lane (sequence 8344809, frames 3162-3171). Four frames (3164, 3166, 3168 and 3170) have poses solved from the row's party walls, to within about 1°, and give a rectified elevation of the whole row 8-10 m away.
- **What the frames show:** eleven houses between the two corners, against twelve outlines. Counting from both corners in overlapping frames gives the same eleven, and it squares with the Lorong 21 work, which found Tan Ser Seng's face 3.25 m beyond its outline. The real houses are about 6.4 m wide.
- **Modelling:** the row is one elevation of eleven equal houses of 6.37 m laid over the outlines' 70.06 m front, and each outline takes its slice of it (`sliceSpec`). Each outline's shell takes the height of the house covering most of it; where a taller house runs onto a lower outline, an upper volume carries it (house 6 onto way 454254323, house 10 onto way 454254326). The five-foot way's returns stand at the photographed party walls, so the shared layout gained a `returns: false` switch. Windows cut by an outline's edge keep a 6 cm mullion there.
- **Street fittings:** the fronts stand about 4 m from the lane's centreline, so awnings and boards are held flat to the front.
- **Naming:** every house is unnamed for now (open question 84) and every board is drawn blank; legible boards are recorded below.

## Status, 14 November 2026

**Complete** for the row. The two blocks south of the lane (ways 454254245 and 454254242) stand 35-75 m back behind a car park and trees, too far to measure from this drive, and are left out (open question 93).

## The houses

Numbered from the west. Heights are from the rectified frames and carry about ±0.5 m.

| House | On outlines | As photographed | Height |
| --- | --- | --- | --- |
| 1 | 454254315, 454254316 | White Late-style, louvred shutters, blue-grey relief; a dark board in the five-foot way reading 仁和聯誼社. | Eaves about 10.4 m |
| 2 | 454254316, 454254318 | Grey-green Late-style, louvred shutters. | Eaves about 10.4 m |
| 3 | 454254318, 454254320 | Cream Late-style, arched glazed windows over pink and blue tile panels, behind a grille gate. | Eaves about 10.4 m |
| 4 | 454254320, 454254321 | Cream Late-style; a pale yellow board on the upper floor reading DHAMMA DUTA BUDDHIST CENTRE, red boards in the five-foot way. | Eaves about 10.4 m |
| 5 | 454254321, 454254322 | Cream Late-style under a red awning. | Eaves about 10.4 m |
| 6 | 454254322, 454254323 | Cream Late-style with green tiles; a red board and valance reading GANG TIAN DA DI ASSOCIATION, stone lions at the piers. | Eaves about 10.4 m |
| 7 | 454254323, 454254324 | White Modern, three brown-framed casements, a small white board over a red awning. | Roof slab 7.9 m |
| 8 | 454254324, 454254325 | White Modern; a beige board reading POH LENG JIE KWAN INN BUDDHIST ASSOCIATION over a red awning. | Roof slab 7.9 m |
| 9 | 454254325, 454254326 | White Modern; a cream board reading BUDDHIST LIFE MISSION. | Roof slab 7.9 m |
| 10 | 454254326, 454254327 | Grey stucco under a deep eave and parapet, casements under louvred vents, a red door in a white shopfront wall. | Parapet 9.3 m |
| 11 | 454254327, 454254328 | Grey stucco; a yellow board reading TEO (JOO LIM) ASSOCIATION, a cream board reading Land of Compassion Buddha (Singapore), a red awning, a roller shutter and the plate 27. | Parapet 9.3 m |

The corner house at Lorong 19 carried a board reading 東張鎮同鄉會 in May 2023, where the June 2024 panoramas used for its model show Kang Ha Pheng Sim Kok's.

Use `?review=bachok-west`, `?review=bachok-middle`, `?review=bachok-white` and `?review=bachok-east`.
