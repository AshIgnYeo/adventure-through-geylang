# Foo Hui Ging Xiu Centre and Siaw Lim Hood Sun Thong, 13–15 Lorong 13 Geylang

Research and implementation: **7 October 2026**. Q27, added in this session and built at the user's direct request.

## Evidence and assignment

The white two-storey, two-bay building between Teck Hoe's compound and the 15-C frontage has a signed identity on each bay. April 2024 is the latest Street View capture.

- **No. 13, Foo Hui Ging Xiu Centre:**
  - Google Maps, read on 7 October 2026, lists **FOO HUI GING XIU CENTRE 福慧净修中心, 13 Lor 13 Geylang, Singapore 388651**. Its place point lies inside [way 1223773764](https://www.openstreetmap.org/way/1223773764), tagged **No. 13**.
  - Panorama `J1TCFhzakKX2wiHsdsUgGQ` shows the purple and blue lettering on the south bay, over a red awning, a perforated roller shutter and a **13/13A** plate.
- **No. 15, Siaw Lim Hood Sun Thong:**
  - The same panorama shows a black board reading **少林佛山堂 SIAW LIM HOOD SUN THONG** over the north bay's doorway, with a door number **15**. This matches [way 1223773763](https://www.openstreetmap.org/way/1223773763), tagged **No. 15**.
  - Google Maps places Siaw Lim Hood Sun Thong with a point inside the same way. Its listing text gives **6B Lor 13 Geylang**, which conflicts. The photographed number, the mapped point and the source tag agree on No. 15, so the 6B text is recorded as a conflict and not used.

Each way carries its own landmark. The street front is built once across both bays from the No. 13 call. Each unit closes its own outline under a shared flat roof, which satellite imagery shows as light grey.

## How dimensions were measured

The square-on frames look along heading 251.3°. In a frame tilted 20° upwards (fov 100), the eave line spans the 12.20 m two-bay frontage, giving a camera distance of **4.71 m**. The base of the frontage in a second frame puts the camera **1.83 m** above the five-foot way. That second frame used a different field of view. Later tests showed such frames can be offset by a few degrees, so these heights carry about ±0.3 m.

| Feature | Height (m) |
| --- | --- |
| Valance bottom | 2.14 |
| Awnings | 2.25–2.69 |
| Foo Hui lettering | 2.75–3.24 |
| Upper windows | about 3.6–4.5 |
| Large north window | 3.67–5.20 |
| Vent over the third window | up to 5.16 |
| Slab eave | 5.25–6.01 |
| Parapet | 6.18 |

Positions are measured from the south edge:

| Element | Position (m) |
| --- | --- |
| Upper windows | 1.56–2.62, 3.92–5.72, 7.02–8.32 and 8.82–11.11 |
| No. 13 shutter | to 4.06 |
| 13/13A plate | 4.34 |
| Ground-floor bay pier | 5.36–5.71 |
| No. 15 grilled door | 5.71–6.26 |
| Lattice gate | 6.41–7.06 |
| Doorway with board | 7.21–7.81 |
| Grilled window | 8.35–9.15 |

**Bay division:** the ground-floor pier dividing the bays measured about **5.5 m** from the south edge. The source party line is at **6.11 m**. The source split is preserved. Each identity's lettering sits wholly within its own source way, but the No. 15 doors begin about 0.4 m inside the No. 13 way, as photographed.

## What is modelled

- **Upper storey:** a white two-storey front with four white-framed upper windows, a louvred vent, a grille on the large north window, a deep slab eave, a parapet and a floor band.
- **No. 13 bay:** a red awning with a scalloped valance; the lettering 福慧净修中心 FOO HUI GING XIU CENTRE; the perforated roller shutter; the 13/13A plate and a letter box.
- **No. 15 bay:** a red awning with gold tassels; a shallow red-tiled porch with a grilled door, a lattice gate and a dark doorway under the black 少林佛山堂 board; a red couplet; a grilled window; and a red side door.
- **Roof:** flat.

## What is omitted or estimated

- **Not modelled:** the altar, statues, offerings and couplet wording, the people and furniture in the porch, the wall-mounted shrine niche, the bin, plants and the interior.
- **Estimates:** the porch depth, door details, awning projection and the glazing divisions.

## Review and validation

Use these review starts:

- `?review=foo-hui`: the No. 13 bay.
- `?review=siaw-lim`: the No. 15 bay.
- `?review=foo-hui-siaw-lim-pair`: the whole building.

All **76 tests** and the type check passed. New checks cover:

- each identity on its tagged way, containing its mapped point;
- the recorded 6B conflict;
- the shared party line;
- fittings inside the two outlines, with lettering and boards inside their own bays;
- awnings clear of Lorong 13;
- walkable starts.

Renders led to two corrections: a dark gap beside the No. 13 shutter, and lettering that was too light to read.
