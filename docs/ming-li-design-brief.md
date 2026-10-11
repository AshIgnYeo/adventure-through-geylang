# Ming Li's Eating House 明利美食阁, 114 Sims Avenue

Research and implementation: **10 October 2026**. Q54. Open question 4 allowed an authored corner outline. The evidence supports the source outline instead, so it is kept.

## Evidence and assignment

- **Listing:** Google Maps lists **Ming Li's Eating House**, a coffee shop open 24 hours, at **114 Sims Ave, Singapore 387438**.
- **Footprint:** [way 682928749](https://www.openstreetmap.org/way/682928749) is tagged No. 114, three levels, with its own 4.41 m chamfer at the Lorong 15 corner.
- **Street View, June 2024:** panoramas `h2kK…` (the Sims face), `GAGu…` (the corner) and `GSi0…` show the white three-storey Art Deco corner block. It carries:
  - a white **明利美食阁 MING LI'S EATING HOUSE** board with a blue roundel on the chamfer;
  - a long board of food photographs over the Sims Avenue bay;
  - blue awnings, and a SingGas awning along Lorong 15.

## Why the source outline is kept

- **Earlier reading:** a square-on reading had placed the photographed Sims face about 2.6 m west of the source and 1 m wider.
- **Satellite:** the registered satellite roof, the new mosaic tool with its 4.5 m west and 2 m south offset applied, agrees with the source corner outline within about 1.5 m on each face. It does not show the westward shift.
- **Amrise:** a 2.6 m westward shift would also overlap the unchanged Amrise model.
- **Conclusion:** the earlier offset is the panorama pose error seen elsewhere on this drive, and the source outline is kept.

## Elevation

Positions and heights were read on square-on frames and scaled to the source faces (factor 0.885 on the Sims face).

- **Upper floors:** windows at 5.3–7.0 m and 8.9–10.7 m in three columns on the Sims face: narrow, a central casement pair, and a small window by Amrise. Vent blocks sit at 8.3–8.6 m.
- **Bands:** projecting hoods at 7.15–7.3 m and 11.0–11.12 m; parapet 11.4 m.
- **Signs:** the food-photograph board at 3.9–4.93 m over a blue awning; the corner board at 3.8–5.0 m.
- **Lorong 15 face:** five window bays and the SingGas awning, laid out from oblique views.

From the corner panorama, render-and-compare overlays the corner board, chamfer windows and storey heights on the photograph.

## Omitted

The food photographs (shown as coloured panels), the Singapore flag, furniture and the interior. Use `?review=ming-li` and `?review=ming-li-corner`. All **159 tests**, the type check and the build passed, with day and night renders and no console errors.
