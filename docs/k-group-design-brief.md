# K Group, 5 Lorong 13 Geylang

Research and implementation: **7 October 2026**. Q31, added in this session and built at the user's direct request.

## Evidence and assignment

- **Current listing:** Google Maps, read on 7 October 2026, lists **K Group Pte Ltd, 5 Lor 13 Geylang, Singapore 388643**. Its place point falls in the street rather than inside a footprint, so it is not used for the assignment.
- **Street View:** April 2024 shows a black board with a mirrored-K logo and **K Group Pte Ltd** over the door of the conserved house between two photographed door plates. Panorama `f-IHSXdP88-BA3LwDO6R0Q` shows **3** on the house to the south; panorama `uh9Y_1rGJSeI8vjJVZDDHg` shows **7** on [Hong Ye Chen](hong-ye-chen-design-brief.md) to the north.
- **Assignment:** the house is therefore source [way 1223773754](https://www.openstreetmap.org/way/1223773754), tagged **No. 5**. Only this way is assigned; No. 3 remains generic.

## How it was built

Nos. 5 and 7 share one elevation. The common geometry now lives in a shared row module (`row13-layout.mjs` and `row13.ts`): wall heights, fretwork eaves, pilaster capitals, tile panels, plaster reliefs and roof, with heights measured at No. 7. No. 7 renders unchanged after the refactor.

No. 5's window positions were measured from an oblique frame (heading 275°, fov 80), with perspective correction, as fractions between the party pilasters. The windows sit at 0.61–1.59, 2.06–3.03 and 3.56–4.55 m from the south edge.

Ground-floor positions are back-projected to an estimated 1.5 m five-foot way using the panorama's offset. They are approximate.

## What is modelled

- **Upper storey:** three tall black-framed windows between pilasters, pink-red floral tile panels under the outer windows, a plaster lotus relief under the middle one, and the shared fretwork eaves.
- **Ground floor:** an orange-red five-foot way floor, two dark windows over pink tile dados, a dark door, a wall-mounted condenser, and the K Group board, redrawn originally.

## What is omitted or estimated

- **Not modelled:** the statue and planters at the door, red couplets, wiring and the interior.
- **Estimates:** ground-floor positions, the five-foot way depth, roof form and relief pattern.

## Review and validation

Use `?review=k-group` for No. 5, and `?review=lorong-13-row` for Nos. 5 and 7 together.

All **89 tests** and the type check passed. New checks cover:

- the addressed No. 5 outline between generic No. 3 and No. 7, with the unused listing point;
- elevation values shared with No. 7;
- fittings inside the frontage;
- walkable starts.
