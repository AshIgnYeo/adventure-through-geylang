# Lam Clan Association, 3 Lorong 15 Geylang

Research and implementation: **7 October 2026**. Q23, added in this session and built at the user's direct request.

## Evidence and assignment

- **Directory:** the [SFCCA member directory](https://sfcca.sg/en/our-members/), read on 7 October 2026, lists the **Lam Clan Association, No 3 Lorong 15 Geylang, Singapore 388597**. This is the same federation source used for the Lorong 11 associations.
- **Footprint:** retained [way 1223539233](https://www.openstreetmap.org/way/1223539233) is tagged **No. 3 Lorong 15 Geylang**. It is about 5.80 m wide and 24 m deep, and faces east onto Lorong 15.
- **Street View, December 2017:** panorama `AHXvHnyePVPqdoUy9lRZ7w` shows **LAM CLAN ASSOCIATION** lettered on this frontage, a cream building at the time.
- **Street View, April 2024:** panorama `j0nZRLW-MxVya_i7dxzbqQ`, the latest capture, shows the same frontage repainted pale blue. It carries the large raised characters **藍氏総會** (the association's Chinese name, read right to left) and a black board with the same name over the doors.
- **Neighbours:** No. 1 is a rebuilt modern house to the south, and No. 5 is the white pedimented three-storey building to the north.

Only this footprint is assigned. Nos. 1 and 5 remain generic. The association's occupation of the whole building is consistent with the signage but is not separately verified.

## How dimensions were measured

The April 2024 camera looks square to the frontage at heading 261.5°. At a 90° field of view the frontage spans about 222 px, giving a camera distance of **13.4 m**; the panorama's GPS gives 16 m. The frontage centre lies 16° off axis, which matches an offset of about 3.8 m along the street. Heights were measured from a frame tilted 14° upwards. The base of the frontage places the camera about 1.95 m above the forecourt.

| Feature | Height (m) |
| --- | --- |
| Parapet top | 8.83 |
| Large characters | 7.2–8.5 |
| Window band | 4.60–6.34 |
| Small characters | 3.7–4.1 |
| Ground-floor opening | up to 3.05 |
| Black board | 2.36–3.00 |

The window band spans u = 1.10–4.88 m from the No. 1 side.

## What is modelled

- **Front:** the pale blue frontage rising to an 8.83 m parapet, with flat pilaster strips at both party lines and a thin coping.
- **Lettering:** the large raised characters 會総氏藍, in the observed left-to-right order, redrawn originally with a cast shadow.
- **Window band:** eight casements. The three southern ones are plain glass and the five northern ones carry a white square grille.
- **Ground floor:** a 0.6 m recess (estimated) under a lintel. It holds the black board with gilt 藍氏総會, green-tinted glazed double doors, side glazing, a dark glazed panel and two stacked wall-mounted condensers.
- **Forecourt:** grey stone paving out 6.4 m towards Lorong 15, inside the study bounds.
- **Roof:** walls to 7.3 m under a low red-tile gable hidden behind the parapet. The red tile is seen on satellite imagery; the form is estimated.

## What is omitted or estimated

- **Small characters:** the three characters below the window band, read tentatively as 如是樓, are **omitted** because the middle glyph is not certain.
- **Not modelled:** festive red lanterns and couplets, the decorative panel left of the board, chairs, wiring, the side boundary wall and gate, and the interior.
- **Estimates:** the recess depth, roof form and height, forecourt extent, door layout and condenser sizes.
- **Lorong 15:** the road is not rendered, so the forecourt ends at bare ground, as at K Hotel 1515.

## Review and validation

The study's east boundary leaves under 8 m in front of the frontage. The review starts therefore look up steeply:

- `?review=lam-clan`: the full frontage.
- `?review=lam-clan-ground`: the doors and board.
- `?review=lam-clan-oblique`: along the forecourts from the south.

All **64 tests** and the type check passed. New checks cover:

- the addressed No. 3 assignment, unchanged coordinates and the east-facing frontage;
- generic neighbours at Nos. 1 and 5;
- fittings inside the footprint, and lettering and board heights in order;
- the forecourt clear of other footprints and inside the study;
- walkable starts.

Renders led to one correction: a blue that read too green under daylight.
