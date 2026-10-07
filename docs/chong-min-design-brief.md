# Singapore Chong Min Association and Yun Teck Sian Tng, 15C Lorong 13 Geylang

Research and implementation: **7 October 2026**. Q26, added in this session and built at the user's direct request.

## Evidence and assignment

- **Current listings:** Google Maps, read on 7 October 2026, lists the **Singapore Chong Min Association, 15C Lor 13 Geylang, Singapore 388656**. It also lists **Yun Teck Sian Tng Thong Sin Sia** as a Buddhist temple with a telephone number. Its place point lies inside source way 1223773762. Neither is in the SFCCA directory.
- **Street View:** April 2024 panorama `8k_BeNJ16snqOq6gubtsYw` shows one white two-storey frontage carrying:
  - **新加坡眾民聯誼會 SINGAPORE CHONG MIN ASSOCIATION** on the upper storey;
  - **運德善堂同心社 YUN TECK SIAN TNG THONG SIN SIA** over the ground floor;
  - a door plate reading **15-C**, with a "members only" notice.

### Identifying the footprint

The source tag and the door plate disagree, so the assignment rests on the order of frontages. Facing west from Lorong 13, from south to north:

1. A wide two-bay white building plated **13/13A** (Foo Hui Ging Xiu Centre). Panorama `J1TCFhzakKX2wiHsdsUgGQ` places it over source ways **No. 13** and **No. 15**.
2. The **15-C** frontage.
3. A cream building with **15D/15E** shutters.
4. The green-latticed **No. 17** tower.

The source ways between Nos. 13 and 17 are tagged 15, 15B and unnumbered. The 15-C frontage therefore matches [way 1223773762](https://www.openstreetmap.org/way/1223773762), which is **tagged 15B**: one letter behind the plate. The temple point inside that way, and the camera geometry, agree. The tag is recorded and left unchanged. Only this way is assigned.

The model carries both signed names. Whole-building occupation by either organisation, and their relationship, are not asserted.

## How dimensions were measured

The square-on April 2024 frames look along heading 251.3°. In a frame tilted 30° upwards, the 6.10 m frontage spans about 430 px, giving a camera distance of about **5.5 m** (the GPS gives 6.7 m). The camera height above the five-foot way is taken as about **1.95 m**, close to the 1.85 m measured on nearby panoramas.

| Feature | Height (m) |
| --- | --- |
| Awning top | 2.6 (at the wall) |
| Yun Teck board | 2.76–3.38 |
| Upper windows | 4.2–5.26 |
| Chong Min board | 5.26–5.9 |
| Slab eave | 6.12–6.46 |

Horizontal positions came from the same frames. The windows span u = 1.05–2.52 and 3.95–5.33 m from the south party line.

## What is modelled

- **Upper storey:** a white two-storey frontage with two dark-framed grey windows, a projecting slab eave and parapet line, and an upper-floor band.
- **Boards:** both boards, redrawn with original typography (red Chinese over blue English) and simplified crests.
- **Ground floor:** a 0.5 m recess (estimated) holding:
  - a wide, opaque shrine opening with a red backdrop;
  - the brown grilled **15-C** door with its number plate;
  - a brown lattice gate.
- **Awning:** maroon, with a white roller and red ribbon bows at both ends.
- **Roof:** an estimated low tiled gable behind the eave. Satellite tiles show tile there.

## What is omitted or estimated

- **Not modelled:** the altar, statues, offerings and lanterns inside the shrine opening, the people seated in front, plants, chairs, the parked van, wiring and the interior. The crest designs are simplified, and the small notices on the door are omitted.
- **Estimates:** the recess depth, roof form and height, and the camera height.

## Review and validation

Use `?review=chong-min` for the front and `?review=chong-min-ground` for the boards and doors.

All **73 tests** and the type check passed. New checks cover:

- the 15B source tag being recorded and the temple point lying inside the way;
- unchanged coordinates;
- the shared corner with No. 15;
- neighbouring ways staying generic;
- fittings inside the frontage, with boards ordered above the awning;
- the awning clear of the Lorong 13 carriageway;
- walkable starts.

Renders led to one correction: window frames that hid the glass.
