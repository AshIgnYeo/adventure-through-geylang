# Eros Adult Shop, 279 Geylang Road

Research and implementation: **9 October 2026**. Q32, added in this session and built at the user's direct request.

## Evidence and assignment

- **Current listing:** Google Maps, read on 9 October 2026, lists **Eros Adult Shop, 279 Geylang Rd, Singapore 389328**, as an adult entertainment store, open. Its place point (1.3127085, 103.8781466) lies behind the row, outside every frontage, so it is not used.
- **Street View:** June 2024 remains the latest capture. Panoramas `1udsor6p2plZzO-0C3V8yg` (across the road) and `70E8HnCOcGqPcYcFVA6kZw` (east, on the near kerb) show the **EROS** signboard and an oval **EROS ADULT SHOP** blade sign. A **May 2023** capture, `l9a4ddU563R0eUYBWOE4Wg`, stands square in front of the unit and shows the same signboard.
- **Assignment:** unnumbered [way 454254224](https://www.openstreetmap.org/way/454254224) lies between the 277 KTV pair and RR Motor, whose west door is plated **281**. It is therefore No. 279. Only this way is assigned. The 2017 Eros point in No. 281's way is already recorded as stale in the [RR Motor brief](rr-motor-design-brief.md).

## How it was measured

No June 2024 panorama stands square on to No. 279, so three frames were combined.

- **Square-on frame (May 2023):** the four upper pilaster centres agree with the shared row elevation and give **66.2 px/m**. That puts the camera **11.05 m** from the façade, against 11.1 m from the panorama's GPS. The back edge of the white return wall shows the GPS is about 3 m off along the street and the view is square. Solving camera height and pitch from the five-foot-way floor and the arch crowns gives a camera **2.04 m** high. As an independent check, the sill course then reads **5.00–5.05 m**, matching the row model.
- **Two calibrated June 2024 frames:** each camera was fitted to the four signboard corners. Rays from both were then intersected. The oval blade sign triangulates to within 0.1 m between the two views. Back-wall fittings were projected onto the back-wall plane from the west camera, then checked against the east view.
- **Render-and-compare:** the scene was rendered from each fitted pose and blended with its photograph. The signboard, lit board, doors, display and blade sign all land on their photographed positions.

| Element | Position along the frontage (m) | Height (m) |
| --- | --- | --- |
| Signboard, 0.27 m proud of the façade | 0.40–4.96 | 3.42–4.19 |
| EROS letters on the signboard | about 1.9–3.6 | about 3.6–4.1 |
| Blade sign, on the party line with No. 277 | 0.06 (projects 0.07–1.0 out) | 4.28–6.82 |
| Lit board on the back wall | 0.30–3.0 | 2.52–3.38 |
| Glass display windows | 0.30–3.18 | to about 2.4 |
| Glass door | 3.22–3.62 | to about 2.4 |
| Timber-framed dark door | 3.66–4.98 | head at about 2.4 |

Heights carry about ±0.1 m.

## What is modelled

- **Upper storey and roof:** the shared row elevation, measured at [Eat First](eat-first-design-brief.md), in the jalousie finish used by RR Motor and Golden Jade. It has white jalousies, brown arch heads, sill course, plinth blocks and eaves board, relief cartouches and frieze, under weathered brown-red tiles.
- **Signboard:** a dark dot-matrix board mounted proud of the cornice. The raised white **EROS** letters sit 4 cm in front, with small **EROTIC HOUSE** lettering. All lettering is redrawn originally.
- **Blade sign:** a black oval with a ring of white LEDs, reading **EROS** downwards and **ADULT SHOP** in pink. It is double-sided, perpendicular to the façade and hung from the party pilaster on two short arms.
- **Five-foot way:**
  - a dark grey half pier on the west, matching 277 KTV's half, and a white half pier on the east;
  - a black diamond-quilted return wall at the west end and a white return at the east end;
  - a dark lining on the back wall and ceiling;
  - on the back wall, glass display windows lit dimly red from inside, a glass door with a light strip on its edge, and a timber-framed dark door;
  - a red LED board with white **EROS** letters above the display.

## What is omitted or estimated

- **Not modelled:** merchandise, mannequins, the winged-heart window graphics, the scrolling LED message, the "EROS EROTIC HOUSE" panel inside, the leaning ladder, the cable from the blade sign, parked motorcycles and the interior.
- **Estimates:** the roof form, the five-foot way depth (taken from No. 287) and the colours. The back-wall layout is from the May 2023 frame and was confirmed in both June 2024 views. The lit board's red dots are one state of a changing display; they were blue-white in May 2023.
- **Carriageway:** the estimated Geylang Road carriageway edge runs only about 0.33 m in front of the façade here. The photographed pavement is about 2 m deep. The blade sign keeps its measured 1.0 m projection; it is more than 4 m above the pavement.

## Follow-up for the shared row

In the square-on frame, the row model's arch crowns render about 0.3 m lower than photographed once the camera is solved from the floor. The same offset shows on the neighbouring 277 KTV upper storey. The shared elevation was measured at No. 287 and is unchanged here; a check of its upper-storey heights along the row is recorded for later. A rooftop structure with a row of windows is visible behind No. 277. Its owner and position are unresolved, so it is not modelled.

## Review and validation

Use `?review=eros` for the front and `?review=eros-five-foot-way` for the signs and back wall.

All **92 tests** and the type check passed. New checks cover:

- the No. 279 assignment between the KTV pair and No. 281, with the displaced Maps point unused;
- elevation values shared with No. 287;
- fittings inside the frontage, and the measured order of display, glass door and timber door;
- the lit board between the door heads and the ceiling, and the quilted return behind the pier;
- the blade sign on the party pilaster, above 4 m, with the carriageway estimate recorded;
- walkable starts.

The 277 KTV and RR Motor tests now expect No. 279 to carry this identity.

Day and night renders of both review starts showed no console errors. Renders found z-fighting between the dark lining and the back wall, and the far face of the blade sign reading in mirror image. Both were corrected.
