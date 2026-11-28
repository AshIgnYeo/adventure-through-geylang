# Lorong 24, Jalan Suka and Jalan Molek

Research and implementation from **28 November 2026**, under open questions 84 and 105. This brief covers `src/lorong-24-layout.mjs`.

## Scope and method

- **Stretch:** Lorong 24 from Geylang Road to Guillemard Road, both sides, with the terraces of Jalan Suka (both sides) and Jalan Molek (north side) off its west side: 38 outlines.
- **Source:** a narrow dated extract, `public/osm-extension-lorong-24.osm` (103.8826-103.8845 E, 1.3100-1.3133 N, retrieved 28 November 2026), read after the earlier extracts. The side streets' houses, the lane's west row and the hotel corner were already held by the east extension, which never took them in, and the two Geylang Road corners are also held by the Lorong 25 extract. The lane's ten ways, both side streets and the two carriageways of Guillemard Road at the lane's south end are taken by id, with the lane and both side streets as walkable corridors. A petrol station canopy (way 820421308) is left out, since an open canopy cannot be drawn as walls.
- **Imagery:** KartaView's drive of 19 May 2023 down the lane and into both side streets (sequence 8344969, frames 1165-1253).
- **Modelling:** photographed massing on the source outlines, with heights from storey counts carrying about ±2 m (±4 m for five storeys or more). In the rows of Jalan Suka and Jalan Molek, and Lorong 24's west row, the frames show each row's form but do not tie every house to its outline, so house colours are given by estimate along the row.
- **Naming:** every building is unnamed for now (question 84), its boards drawn blank.

## Status, 28 November 2026

**Complete,** with two stretches the source does not outline: a new grey and orange apartment block on the east side between Jalan Suka and the petrol station, and a building site behind hoardings on the west side south of Jalan Molek (open question 109).

## The plots

| Plot | Ways | As photographed | Height |
| --- | --- | --- | --- |
| No. 432 Geylang Road, the west corner | 395805491 | An old two-storey house under a red tiled roof, almost hidden by palms and trees (the source way is named Lai Ming Hotel). | About 7.2 m |
| Nos. 4-12 Lorong 24 | 394866855, 394866860, 394866865, 394866868, 394866857 | Ornate two-storey shophouses with louvred shutters; Nos. 6 and 10 under scaffolding. | About 8.6 m |
| Nos. 2-20 Jalan Suka | 820421343-820421351, 394866856 | Two-storey link houses under terracotta tiled roofs, behind gates and porch canopies. | About 6.8 m to the eaves |
| Nos. 1-19 Jalan Suka | 820421334-820421342, 394866874 | White three-storey walk-up houses with balconies; one framed in orange. | About 10.2 m |
| Nos. 2-16 Jalan Molek | 820421327-820421333, 394866863 | Two-storey link houses in pink and cream; one with a red gate for a house shrine. | About 6.8 m to the eaves |
| No. 440 Geylang Road, the east corner | 395026245 | A cream three-storey corner shophouse with a café under black fascias reading FELLASCUBE, Noodle FELLAS and CHILL CHOMP CONNECT. | About 10 m |
| The east side to Jalan Suka | 394866873 | An apartment block of about ten storeys at the north end, two-storey houses behind brick gate piers in the middle, and a block of about seven storeys lettered edenzloft at the south end. | About 32.4 m, 7 m and 22.8 m |
| The Buddhist society | 394866866 | A cream two-storey shophouse behind yellow gates under a yellow board. | About 7.8 m |
| The petrol station shop | 394858958 | A single-storey white shop banded in red, at an Esso station (the source way is named Cheers). | About 4 m |

Use `?review=l24-lai-ming`, `?review=l24-4` to `?review=l24-12`, `?review=suka-1` to `?review=suka-20`, `?review=molek-2` to `?review=molek-16`, `?review=l24-440`, `?review=l24-east-block`, `?review=l24-buddhist-society` and `?review=l24-station-shop`.
