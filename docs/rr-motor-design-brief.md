# RR Motor, 281–283 Geylang Road

Research and implementation: **7 October 2026**. Q20, added in this session and built at the user's direct request.

## Evidence and assignment

- **Company records:** [RecordOwl](https://recordowl.com/company/r-r-motor-pte-ltd), drawing on ACRA, lists **R R Motor Pte Ltd, 281 Geylang Road, Singapore 389329**. The company was established in 1992. Its principal activity changed on **8 July 2025** from motorcycle and scooter retail to repair and hire purchase, which indicates the company was still active then.
- **Street View:** June 2024 panorama `70E8HnCOcGqPcYcFVA6kZw` shows one **RR MOTOR 专卖店** signboard hung across two frontages. It carries the **rrmotor.com.sg** address and an email address containing 281, and there is a **281** plate on the west door.
- **Assignment:** the two frontages are unnumbered [way 454254225](https://www.openstreetmap.org/way/454254225) and [way 454254226](https://www.openstreetmap.org/way/454254226), 5.13 m each. They lie directly west of the Buddhist Art Centre at No. 285, so they are Nos. 281 and 283. Both carry the RR Motor identity because the signboard spans both. The landmark address is No. 281, matching the company record. Whether the business occupies the whole of No. 283 is not asserted.
- **Stale source name:** a 2017 point named **Eros** lies inside way 454254225. In June 2024 the Eros sign was one unit further west, so the point is stale. That unit stays generic.

## How it was built

These frontages share the elevation measured for [Eat First](eat-first-design-brief.md) and the [Sik Wai Sin frontage](sik-wai-sin-design-brief.md). Square-on frames from the panorama above put the matching features within about 0.1 m of the No. 287 values:

| Feature | Height (m) |
| --- | --- |
| Eaves | 7.58 |
| Arch tops | 6.91 |
| Sill course | 5.02 |
| Cartouches | 4.34–4.81 |
| Cornice | from 3.96 |
| Brown fascia | 3.2–3.9 |
| Signboard | 2.55–3.21 |

Window centres fall at 0.21, 0.49 and 0.78 of each frontage, the same as No. 287. The shared module therefore gained a **jalousie** finish: white timber jalousies, brown-filled arch heads in brown frames, brown sill course, cornice, fascia and pilaster plinths, and a dark brown eaves board in place of the green gutter.

From across the road, a 281/283 party-wall coping divides an **orange corrugated roof on No. 281** from **weathered clay tiles on No. 283**. The panorama camera was calibrated for Eat First, but its rays meet these copings at grazing angles, so their height could not be triangulated reliably. The roof slopes span a similar angle to No. 287's, so both units use the No. 287 roof geometry as a documented estimate, in the observed finishes. The same view shows a second attic dormer, over about No. 279, which is outside this assignment.

## What is modelled

- **Upper storeys:** two matching upper storeys: three arched jalousie openings per unit between Corinthian pilasters, relief cartouches and frieze, a brown sill course and a brown eaves board.
- **Ground floor:** white piers, including a central pier shared by the two units, under a brown beam and fascia. The five-foot way has tiles and tube lights. Each unit has a closed aluminium roller shutter under its hood. No. 281 has a brown timber door at its west end; No. 283 has a dark door with a red diamond at its east end.
- **Signboard:** one redrawing with the RR mark, `rrmotor.com.sg`, `RR MOTOR PTE LTD` and `专卖店`. It runs across both units behind the central pier, as photographed.
- **Roofs:** gable roofs with raised copings and front end blocks.

## What is omitted or estimated

- **Sign details:** product pictures of bicycles and scooters, telephone and fax numbers, the email address, and the partly hidden red characters before 专卖店 are omitted.
- **Not modelled:** loose cables, the open green window and plant on No. 283, bins, bicycles and any interior.
- **Estimates:** roof heights and forms, the five-foot way depth (2.0 m, as at No. 287), and the door and shutter positions, which are read from one panorama.
- **Carriageway:** Geylang Road's estimated carriageway edge runs along this pair's pier line, about 8.0–8.2 m from the centreline. Cornices and eaves overhang it as they would overhang the kerb. Ground-level fittings stay clear.
- **Neighbouring roof:** the Buddhist Art Centre's estimated roof is lower than both neighbouring measured roofs. The [Eat First brief](eat-first-design-brief.md) records this as a follow-up.

## Review and validation

Use `?review=rr-motor` for the pair from the far kerb and `?review=rr-motor-five-foot-way` for the signboard and shutters.

All **55 tests**, the type check and the build passed. New checks cover:

- the paired assignment, its order against the Buddhist Art Centre and the excluded Eros unit;
- the stale Eros point being recorded as such;
- elevation values shared with No. 287;
- fittings inside both frontages, and ground-level fittings clear of the carriageway;
- the signboard's continuous texture across the central pier;
- walkable starts.

Renders found z-fighting between the brown beam and the wall, fixed by bringing the beam 1 cm proud, and a missing brown fascia band, now added. Eat First and Sik Wai Sin keep their casement finish unchanged.
