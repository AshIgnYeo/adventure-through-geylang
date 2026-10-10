# Hainan Lim Clan Association building, 19 Lorong 13 Geylang

Research and implementation: **7 October 2026**. Q24, added in this session and built at the user's direct request.

## Evidence and assignment

- **Directory:** the [SFCCA member directory](https://sfcca.sg/en/our-members/), read on 7 October 2026, lists the **Hainan Lim Clan Association, 19 Lorong 13 Geylang Road #04-01, Singapore 388662**.
- **Street View:** April 2024 panorama `yo_MuatdX6WE9xNVY4PqBg`, on Lorong 13, shows a beige mosaic-tiled four-storey building numbered **19** above a car-park entrance. It carries:
  - on the top band: **新加坡海南林氏公會 HAINAN LIM CLAN ASSOCIATION (SINGAPORE)** and the year **1970**;
  - on the band below: **瓊崖沙港同鄉會 KHENG JAI SAR KANG ASSOCIATION**;
  - in the second-storey windows: **RAVE AUTO S.C**.
- **Footprint:** no source way carries No. 19. The building's south neighbour is the green-latticed block on [way 454254295](https://www.openstreetmap.org/way/454254295), tagged **No. 17**. Unnumbered [way 1223773760](https://www.openstreetmap.org/way/1223773760) is the next footprint north, with no other building between. Satellite tiles at about 7.5 cm per pixel show its stepped tiled front and a flat roof. It is about 14.17 m wide and 19.47 m deep, facing Lorong 13.

Only this way is assigned. The model is named for the signed association at #04-01, the top floor. The Kheng Jai Sar Kang Association and Rave Auto are recorded as other signed occupants. Whole-building occupation by any one of them is not asserted.

## How dimensions were measured

The square-on April 2024 frames look along heading 252.1°. At a 110° field of view the frontage spans about 648 px, giving a camera distance of **7.84 m**, which agrees with the panorama's GPS (7.77 m). The base of the frontage places the camera about 2.56 m up.

Level frames and frames tilted 35° upwards agree to within 0.15 m up to 9.2 m. A 55° frame disagreed for the upper bands. A feature in it was probably misread, so it was set aside. The top band therefore rests on the 35° frame and the 3.36 m storey rhythm, with ±0.5 m uncertainty.

| Feature | Height (m) |
| --- | --- |
| Car-park opening | 0–2.67 |
| Tiled band with "19" | 2.67–4.31 |
| Second-storey windows | 4.31–5.99 |
| Tiled band | 5.99–7.67 |
| Third-storey windows | 7.67–9.16 |
| Kheng Jai Sar Kang band | 9.16–11.23 |
| Fourth-storey dark windows | 11.23–12.61 |
| Hainan Lim band | 12.61–15.3 |

## What is modelled

- **Tiled bands:** four beige mosaic-tiled bands with slab nosings. The two association bands carry raised bronze lettering, redrawn with original typefaces, and the lowest band carries "19".
- **Windows:** three window bands recessed 0.28 m behind the bands, each with aluminium mullions and transoms. The top storey has dark glazing. RAVE AUTO S.C appears in white letters on the second-storey glass.
- **Ground floor:** a car-park opening about 6 m deep with a yellow height gantry and a striped barrier arm. A closed tiled bay with a door sits to the north.
- **Roof:** a flat roof.

## What is omitted or estimated

- **Not modelled:** the faded characters on the third-storey band, plants on the top-storey ledge, rooftop structures, signage inside the car park, traffic signs, planters, vehicles and the interior.
- **Estimates:** the top-band height, recess depth, mullion count, car-park depth and roof form.

## Review and validation

Lorong 13 is a rendered road, so the review starts stand across the carriageway:

- `?review=hainan-lim`: the whole frontage.
- `?review=hainan-lim-signs`: the association bands.

All **67 tests** and the type check passed. New checks cover:

- the unnumbered assignment immediately north of the addressed No. 17, with nothing between;
- unchanged coordinates and the Lorong 13 frontage;
- a continuous band stack with the 3.36 m storey rhythm;
- fittings inside the footprint, and the barrier arm clear of the carriageway;
- walkable starts.

Renders led to two corrections: crowded lettering on the Kheng Jai band, and window glass that read too dark.
