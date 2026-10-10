# Chen Hing Trading 增興貿易, 241 Geylang Road

Research and implementation: **10 October 2026**. Q40, added in this session under the user's request to keep sourcing and building identifiable, confirmed buildings.

## Evidence and assignment

- **Current listing:** Google Maps, read on 10 October 2026, lists **CHEN HING TRADING PTE. LTD.**, a general store, at **241 Geylang Rd, Singapore 389296**, open. Its place point (103.8767864, 1.3122656) lies inside [way 475158359](https://www.openstreetmap.org/way/475158359). That way is tagged Geylang Road, has no number, and is the footprint directly west of Masjid Haji Mohd Salleh (No. 245).
- **Street View, June 2024:** panoramas `SE7V8xC8dISjOl-1xdIR9A`, `kbMaxdnGfSxxcW_ZWuryZw` and `ZvONx9MbvuKGcqhHe87DTQ` show the grey-tiled three-storey block between the mosque and the pink building of **Geylang Lor 9 Beef Kway Teow** (listed at No. 237). It has:
  - ribbon windows in three bronze-framed groups on each upper floor, under louvred hoods;
  - raised gold lettering reading **增興貿易私人有限公司 / CHEN HING TRADING PTE. LTD.** on a tiled fascia;
  - a red scalloped awning over an open stall of produce and sundries.

Only this way is assigned. All source coordinates are unchanged. The No. 237 side (way 454274485) stays generic.

## How it was measured

- **Pose problem:** the three panoramas disagree with the source frame. Rays to the shared mosque party line do not meet on the source front. Rendered from the recorded poses, the existing mosque model appears about 1.2 times too large and shifted along the street.
- **Correction:** moving the square-on panorama's camera **2.8 m** further from the façade and **1.5 m** east along the street fixes both. Renders of the mosque model, of the source frontage and of the finished model then sit on the photograph: party walls, windows, hoods, lettering and awning all match. At that pose the photographed frontage between the mosque and No. 237 spans the 10.08 m source edge. The correction is recorded as a panorama position error; no source geometry is changed.
- **Heights:** these were read on the corrected, rectified square-on frame, from the five-foot-way floor.

| Element | Position from the west line (m) | Height (m) |
| --- | --- | --- |
| Parapet | full width | 10.0 |
| Upper louvred hood | full width | 7.83–8.48 |
| Upper ribbon windows | 0.65–3.26, 3.7–6.48, 6.95–9.84 | 6.61–7.83 |
| Lower white ledge / louvred hood | full width | 5.5–5.72 / 5.06–5.5 |
| Lower ribbon windows | 0.56–3.15, 3.64–6.41, 6.89–9.78 | 3.89–5.06 |
| Fascia | full width | 2.56–3.89 |
| 增興貿易私人有限公司 | 1.4–8.13 | 3.1–3.67 |
| CHEN HING TRADING PTE. LTD. | 1.18–8.43 | 2.55–3.0 |
| Fascia ledge, five-foot way ceiling | full width | 2.44–2.56 |
| Red awning | 0.1–8.6 | 2.44 at the wall |

## What is modelled

- **Massing:** a three-storey front block, 10.0 m high and an estimated 6 m deep, ending on both slanted party walls. Behind it, the rest of the source outline is a 6.7 m rear wing, matching the reviewed back-lane elevation.
- **Upper storeys:** on each floor, the ribbon windows in three bronze-framed groups, under louvred hoods. The lower hood has a white ledge above it. The parapet band is tiled.
- **Ground floor:** the tiled fascia with redrawn gold lettering, its white ledge, and end piers. Behind the red scalloped awning are the dark five-foot way and approximate crates of goods along the frontage.

## What is omitted or estimated

- **Not modelled:** the stall's goods and prices, the umbrella, the hanging merchandise (only suggested by blocks), and the interior.
- **Estimates:**
  - the front block's depth and the roofs;
  - the five-foot way's depth.
- **Awning:** it keeps its photographed height at the wall, but is shortened to 0.7 m (the photographed slope reaches 1.61 m) because the source front lies close to the modelled carriageway of Geylang Road.
- **Neighbours:** No. 237 (Geylang Lor 9 Beef Kway Teow, pink three-storey building) is a lead for a later run.

## Review and validation

Use `?review=chen-hing` for the front and `?review=chen-hing-oblique` for a view along Geylang Road towards the mosque.

All **118 tests**, the type check and the build passed. New checks cover:

- the assignment west of the mosque, including its Maps point;
- the rear height shared with the back-lane elevation;
- the elevation order;
- fittings inside the outline and the front block's corners on its party walls;
- the awning clear of the carriageway;
- walkable starts.

Day and night renders of both review starts showed no console errors.
