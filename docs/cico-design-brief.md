# Cico Flooring 志高地板, Nos. 1–7 Lorong 11 Geylang

Research and implementation: **10 October 2026**. This is open question 7, an authored footprint for the low building beside Hotel 81 Joy.

## Evidence and assignment

- **Listings:** Google Maps lists **Cico Flooring** at 7 Lor 11 Geylang, and **Cico Holdings (2008) Pte Ltd**, a flooring contractor, at 1 Lor 11 Geylang (open).
- **Street View, April 2024:** panoramas `ANSw…`, `DuD9…` and `ifUF…` show a **CICO FLOORING 志高地板** logo on the herringbone timber cladding of a single-storey building. The building runs across Nos. 1–7 under two orange-tiled hipped roofs and a long metal canopy, behind a paved forecourt.
- **Second firm:** another logo on the same frontage (an "A", …ENGINEERING CONSTRUCTION) belongs to a different firm and is not named.

## The footprint

- **Façade depth:** the three panoramas, rectified on planes parallel to the source front, agree on a façade about **5 m behind** it. The CICO logo agrees to within about 0.5 m, along the whole 21 m run.
- **Authored footprint:** `l11-1-7` merges the four source ways, 1223407887–890, with a new shared-edge merge helper, and leaves the front 5 m open as the forecourt.
- **Back lane:** the temple-side back-lane enclosure still builds from the replaced No. 1 way.

## What is modelled

- **Street wall:** herringbone timber cladding on the street wall, with these fittings read on the rectified frame at the 5 m depth, from north to south:
  - a roller shutter (17.8–21.0 m from the No. 7 end);
  - a glazed door (14.1–17.1 m);
  - the CICO logo (12.1 m) above circular grilles;
  - a timber door and a dark doorway (6.1–10.6 m);
  - a glazed window (2.8–5.8 m);
  - a vending machine at the north end.
- **Roofs and forecourt:** two hipped tiled roofs, with eaves at about 4.4 m and ridges about 6.0 m (estimated); the sloping metal canopy over the forecourt; and forecourt paving.

Render-and-compare from the `DuD9…` pose overlays the cladding, doors, shutter, logo, canopy and roofs on the photograph.

## Omitted

Stacked timber, the second firm's name, bins and the interior. The rear and the roof pitch are estimates. Use `?review=cico-flooring`. All **170 tests**, the type check and the build passed, with day and night renders and no console errors.
