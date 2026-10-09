# Plus Mobile, 22 Lorong 13 Geylang

Research and implementation: **9 October 2026**. Q33, added in this session and built at the user's direct request.

## Evidence and assignment

- **Current listing:** Google Maps, read on 9 October 2026, lists **Plus Mobile, 22 Lor 13 Geylang, Singapore 388665**, a cell phone store, open. Its place point lies inside [way 1223454587](https://www.openstreetmap.org/way/1223454587), tagged **No. 22**.
- **Street View:** April 2024 panoramas `0lzllny6dnDfGwAbWWI8_Q` and `yo_MuatdX6WE9xNVY4PqBg`, on either side of the unit, show a **door plate reading 22** between two roller shutters. Above them is a white signboard reading **Plus Mobile & Accessories** and **No.22**. A tall blue Plus Mobile service board stands beside the plate. A **March 2022** capture, `XRsK3ZOFCVXavNp5PPCSmQ`, stands square on and shows the same frontage vacant, with the 22 plate.
- **Neighbours:** No. 20 to the south is plated 20. The house to the north carries a Plus Mobile shop counter with an OPPO sign, but it is not assigned: the listing and the signboard's own number both give No. 22.

Only this way is assigned. All source coordinates are unchanged.

## How it was measured

- **Unit widths:** this row is a run of single-storey shophouses under tiled roofs. A salmon party-wall coping marks every second party line. Triangulating three coping peaks from the April 2024 panoramas spaced about 10 m apart gives party lines **5.93 m** and **10.90 m** either side of the No. 22/24 line. That agrees with the source's 5.81 m frontages to about 5%, unlike the Lorong 11 west row. The fitted façade line runs parallel to the source front.
- **Square-on frame (March 2022):** the 5.81 m frontage spans 622 px at fov 100, putting the camera **6.48 m** from the wall. Solving camera height and pitch from the walkway line and the eaves gives **2.41 m** and 6.7°. Heights and positions come from this frame, with the shutters and plate checked against the 2024 views.
- **Roof:** rays to the No. 22/24 coping intersected with that party-wall plane give the eaves at about **3.9 m** at the wall and the coping peak about **3.4 m** behind it at about **6.3 m** (±0.2 m). That is a tiled front slope of about 31°. Satellite imagery shows a dark, low roof behind the tiled slope, so the rear slope is modelled in dark grey.
- **Render-and-compare:** the scene rendered from the solved March 2022 pose and blended with the photograph puts the shutters, signboard, plate, service board and tile line on their photographed positions.

| Element | Position from the No. 24 party wall (m) | Height (m) |
| --- | --- | --- |
| Left roller shutter | 0.12–2.83 | to 2.49 |
| Signboard | 0.10–2.85 | 2.52–2.90 |
| Blue service board | 2.92–3.30 | 0.90–2.22 |
| Door plate 22 | 2.97–3.13 | 2.28–2.40 |
| Right roller shutter, two leaves | 3.42–5.27 | to 2.45 |
| Red and white advert | 3.47–5.22 | 2.74–3.34 |
| Canopy, at the wall and at the front | 0–2.0 out | 3.50, rising to 3.58 |
| Eaves at the wall | — | about 4.3 |
| Coping peak, 3.35 m back | — | about 6.3 |

## What is modelled

- **Massing:** a single storey with white walls under a short tiled front slope and a dark low rear roof, using the untouched source outline.
- **Roof:** clay tiles with courses, white gable walls, a dark eaves board and the salmon coping on the No. 24 side. The coping on the No. 20 side belongs to the next pair and is not drawn here.
- **Shopfront:** two aluminium roller shutters with hoods and guides; the right one has two leaves under a beige header.
- **Signs:**
  - the white signboard, redrawn with original typography reading `Plus Mobile & Accessories` and `No.22`, with a green and yellow roundel;
  - the blue service board, with the Plus mark and its four services in Chinese;
  - the door plate `22`.
- **Canopy:** a corrugated steel sheet over the walkway, on a front beam and diagonal brackets, with the white downpipe on the No. 24 party wall. The walkway is tiled.

## What is omitted or estimated

- **Third-party adverts:** the SIM advert over the right shutter is a blank red and white panel; its brand, prices and flags are not reproduced. The OPPO sign belongs to the house to the north and is omitted.
- **Not modelled:** the Plus Mobile email address on the signboard, the English text on the service board, plants, chairs, the cooling fan, cables, the canopy's lattice trusses (simplified to brackets) and the interior.
- **Estimates:** the canopy depth (about 2.0 m), the rear roof form and height, the eaves board and colours. The canopy is continuous along the real row; only this unit's share is modelled.
- **Neighbours:** Nos. 20 and 24 remain generic two-storey placeholders, although the real row is single-storey.

## Review and validation

Use `?review=plus-mobile` for the front and roof, and `?review=plus-mobile-walkway` for the signs under the canopy.

All **96 tests**, the type check and the build passed. New checks cover:

- the addressed No. 22 outline containing its mapped point, with neighbours generic;
- a frame facing the lane;
- the single storey and the triangulated front slope;
- the measured order of shutters, service board and plate;
- the canopy clear of the carriageway;
- walkable starts.

Day and night renders of both review starts showed no console errors.
