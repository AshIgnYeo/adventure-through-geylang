# Lorong 17 north of Sims Avenue

Research and implementation from **14 November 2026**, under open questions 84 and 87. This brief covers `src/lorong-17-north-layout.mjs`.

## Scope and method

- **Stretch:** Lorong 17 from Sims Avenue north to the extract's north edge (1.3155 N). Four plots stand along it inside the extract, all set back 15-23 m from the lane's centreline behind car parks, fences and trees.
- **Map:** `scripts/prepare-map.mjs` takes the four buildings and the lane's four ways by id; the lane is a walkable corridor from the extract's north edge to Sims Avenue's centreline, joining the avenue's corridors.
- **Imagery:** KartaView's southbound drive of 16 May 2023 down the lane (sequence 8344809, frames 280-302), with the solved Sims Avenue frames 8348649/2743 and 2746 for the towers' south faces. No frame on the lane shows party walls, so positions are taken from the GPS fix moved about 10 m along the drive (the lag measured on the avenue), and checked against building corners: No. 50's south-west corner and the Enterprise tower's south-west corner agree within about 2°.
- **Modelling:** photographed massing on the source outlines, as for Sims Avenue Nos. 165-177: colours, storeys and roofs as photographed, with window rows placed by estimate. Heights come from rooflines in frames at known distances. Because the panoramas hold no image above about 45°, the towers' heights are read from frames 75-114 m away, and carry about ±3-4 m.
- **Naming:** every building is unnamed for now, since listings cannot be checked from here (open question 84). Legible signs are recorded below.

## Status, 14 November 2026

**Complete.** All four plots are modelled as massing.

## The plots

| Stop | Plot | Way | As photographed | Height |
| --- | --- | --- | --- | --- |
| 1 | No. 43, west side | 439168851 | Three storeys of red brick under a dark grey hipped roof, with cream floor bands and a red canopy over its entrance, behind a fence and tall trees. A board at its gate reads 新加坡佛教居士林 彌陀村 活動中心. | About 10.5 m to the eaves, 13.5 m to the ridge |
| 2 | No. 51, west side | 439168795 | About ten storeys, white with vertical yellow bands, recessed yellow balconies and beige floor bands, behind palms and a gated car park. The source way is named Superior Industrial Building; no sign could be read. | About 37 m |
| 3 | No. 46, east side | 454254369 | A tower of about eleven storeys of green glass bands in a grey tiled frame over a tall dark lobby with a curved canopy, behind a guardhouse and barrier; antennas on the roof. A low sign at the gate reads ENTERPRISE INDUSTRIAL BUILDING 46 LORONG 17 GEYLANG, and a board high on the south face reads PRIMAC. The tower fills the outline, as the frames from the west and the south show. | About 42 m to the parapet |
| 4 | No. 50, east side | 454254368 | A plain grey industrial block of three tall levels behind a brick gate pier with the plate 50: roller shutters below, a long band of louvred windows near the top, red lettering ending (PTE) LTD high on the lane face (not drawn). | About 15.7 m |

Use `?review=l17-43`, `?review=l17-51`, `?review=l17-46` and `?review=l17-50`.
