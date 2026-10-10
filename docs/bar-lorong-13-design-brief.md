# Bar @ Lorong 13, No. 1 Lorong 13 Geylang

Research and implementation: **10 October 2026**. Q39, added in this session under the user's request to keep sourcing and building identifiable, confirmed buildings.

## Evidence and assignment

- **Current listing:** Google Maps, read on 10 October 2026, lists **Bar @ Lorong 13** at **1A Lor 13 Geylang, Singapore 388674**, a bar with about 170 reviews and current opening hours.
- **Footprint:** [way 1223773758](https://www.openstreetmap.org/way/1223773758), tagged **No. 1**, is the first house of the west row at the Geylang Road end, south of No. 3. No other way carries No. 1 or 1A.
- **Other listings:** Koh Hwee Cheng is listed at No. 1 and is not assigned. The River Ash Bakery point also falls in this way, but is excluded, as recorded under No. 3.
- **Street View, April 2024:** panoramas `FXTw5jMQr6bKoFFGgqyVkw` (square-on), `f-IHSXdP88-BA3LwDO6R0Q` and `pE_LD86BSAb8LSBZLrANuA` show the white three-storey Art Deco block plated **1**:
  - two wings with steel-framed windows under louvred vents and thin cantilevered eaves;
  - between them, a stair tower with paired slit windows, a scalloped bracket and a cap lettered **協華大厦**;
  - a yellow **BAR@ / LORONG13** sign in tube lettering across the north wing over the bar, with BAR @LORONG THIRTEEN painted inside;
  - a restaurant signed **忆滋味** in the south bay.

Only this way is assigned. All source coordinates are unchanged. The bar is named because its sign dominates the frontage, but the model is of the whole building's exterior. The restaurant and the middle bay are not otherwise identified.

## How it was measured

- **Scale:** the panoramas' recorded positions put the camera about 6.4 m from the source front. The photographed building, though, looks about 1.45 times larger than a render from that pose. Two-panorama rectification did not converge, which suggests a yaw error in at least one frame.
- **Method:** heights and positions therefore come from one level, square-on frame (`FXTw…`, heading 251.4°). It was rectified at the depth where the photographed frontage matches the **12.36 m** source edge. The two agree to within about 2%, placing the camera about 4.4 m from the wall.
- **Height datum:** heights are read from the five-foot-way floor at the piers.
- **Render-and-compare:** moving the render camera 2.0 m towards the façade and 1.0 m north brings the road markings and the neighbouring generic row into line. With that correction, the model overlays the square-on frame and an oblique frame from the south: lettering, windows, vents, tower slits, pilasters, eaves, bracket, door and sign all fall on their photographed positions. The offset is recorded as a panorama position error, not a footprint error.

| Element | Position from the south end (m) | Height (m) |
| --- | --- | --- |
| South wing / tower / north wing | 0–4.47 / 4.47–7.35 / 7.35–12.36 | wings 8.45, tower 9.14 |
| Tower cap, 0.5 m deep | 4.27–7.55 | 9.14–9.28 |
| 協華大厦 lettering | 5.0–6.81 | 8.08–8.67 |
| Eave slabs, 0.9 m deep | each wing | 8.45–8.6 |
| Upper windows | 0.81–2.27, 2.74–4.18, 7.76–9.31, 9.8–11.32 | 6.25–7.2 (vents 7.4–7.7) |
| Lower windows | 0.9–2.24, 2.8–4.16, 7.85–9.36, 9.91–11.4 | 3.75–4.65 (vents 4.8–5.15) |
| Tower slit windows | 5.51–5.85 and 6.08–6.41 | 3.8–4.6 and 6.25–7.05 |
| Floor ledges | each wing | 3.6–3.72, 5.3–5.42, 6.1–6.22 |
| BAR@LORONG13 sign | 7.76–11.65 | 2.67–3.73 |
| Five-foot way ceiling | full width | 2.5 |

## What is modelled

- **Massing:** the source outline walled to the wing height, with a flat roof. The stair tower rises to 9.14 m at the front, over an estimated depth of 3.2 m.
- **Wings:** on each floor, two steel-framed windows of three by four panes under louvred vents, with floor ledges and thin cantilevered eaves.
- **Tower:**
  - a raised frame with paired slit windows;
  - the scalloped bracket under its ledge;
  - the projecting cap and the 協華大厦 lettering, written right to left.
- **Five-foot way:** a 2.0 m five-foot way behind the beam, end pilasters and two piers. It has three bays:
  - the restaurant's glazed front and 忆滋味 board;
  - the door plated 1 and a glazed door with blinds;
  - the bar's timber-framed glazed front and painted lettering.
- **Signs:** the yellow tube-lettered sign is redrawn originally.

## What is omitted or estimated

- **Not modelled:**
  - the restaurant's posters and seating;
  - the bar's ceiling fans, shelves and the Guinness sign (a brand mark);
  - the opened casements of the south wing, which are modelled closed;
  - plants on the roof;
  - the interiors.
- **Estimates:**
  - the five-foot way depth and the tower's depth behind the street wall;
  - the roof;
  - the plain side and rear walls;
  - the shopfront layouts, which are approximate.
- **Neighbours:** No. 3 (plate 3, River Ash lead) remains generic.

## Review and validation

Use `?review=bar-lorong-13` for the front and `?review=bar-lorong-13-oblique` for a view along the frontage from the Geylang Road end.

All **115 tests**, the type check and the build passed. New checks cover:

- the No. 1 assignment south of No. 3;
- the wing, tower and storey order;
- the slit windows inside the tower frame;
- fittings inside the frontage;
- the eaves and cap clear of the carriageway;
- walkable starts.

Day and night renders of both review starts showed no console errors.
