# Muhammadiyah Islamic College, 17 Lorong 13 Geylang

Research and implementation: **9 October 2026**. Q37, added in this session and built at the user's direct request.

## Evidence and assignment

- **Current listing:** Google Maps, read on 9 October 2026, lists **Kolej Islam Muhammadiyah (KIM), 17 Lor 13 Geylang, Singapore 388660**, a non-governmental organisation on Floor 1, with 35 reviews. A Muslimah Swim Club is listed on Floor 8 of the same address. The number matches [way 454254295](https://www.openstreetmap.org/way/454254295), tagged **No. 17**.
- **Street View:** April 2024 panorama `D4Uk9t7JuM7EbZHDIk3xog`, in front of the building, shows:
  - a green signboard reading **معهد المحمدية الإسلامي / MUHAMMADIYAH ISLAMIC COLLEGE**, with *17 Lorong 13 Geylang, Singapore 388660* and a website and telephone line;
  - a top band of teal glass reading **MUHAMMADIYAH** beside a rayed emblem;
  - a white gate pillar plated **17 LORONG 13 GEYLANG**.
- **Neighbours:** Hainan Lim (No. 19, already modelled) to the north and the generic No. 15D/E to the south.

Only this way is assigned. All source coordinates are unchanged.

## How it was measured

The screen's horizontal bars could be read either as storeys about 1.4 m apart or as storeys of 3 m on a face about 21 m away, so the face distance had to be fixed first. Three independent measurements agree:

1. **Triangulation:** the ends of the signboard were triangulated from two April 2024 panoramas of the same drive, about 10 m apart (`D4Uk…` and `0lzllny6dnDfGwAbWWI8_Q`). The board lies **10.7 m** from the front camera and parallel to the street, **1.37 m** behind the source front line. Its length is 3.0 m.
2. **Bar spacing:** in a level frame from `D4Uk…` (heading 251.5°, fov 120), the bars are evenly spaced at 44.5 px. A level camera maps heights linearly onto a parallel façade, so this spacing gives **28.0 px/m** and a face **10.56 m** away, within 1.5% of the triangulation.
3. **Calibration:** a render of the existing models from the same pose puts the source party line with No. 15D/E on its photographed position, which confirms the frame's heading.

The bars are therefore **1.59 m** apart: two screen cells to each 3.18 m storey. The south column's white slabs fall on every second bar.

- **Heights:** the five-foot-way floor next door fixes the level frame's horizon. A frame tilted 45° upwards, fitted to the same bars, recovers a tilt of 44.7° (requested 45°) with 4 px rms. It gives the top band and parapet heights, and a narrower frame gives their proportions.
- **Width:** at the face distance, the screened façade spans almost the whole 13.86 m source frontage.
- **Render-and-compare:** the level and tilted renders blended with their photographs put the bars, the lattice column, the side columns and slabs, the signboard and the top band within about 5–10 px.

| Element | Position from the No. 15D/E party line (m) | Height (m) |
| --- | --- | --- |
| South white column, grilled windows and white slabs | 0.13–2.03 (slabs 0.15–2.75, 0.8 m deep) | slabs every 3.18 m from 4.53 |
| Plain teal panel | 2.03–3.88 | — |
| Geometric lattice column | 3.88–4.88 | — |
| Six window columns, 0.92 m each | 4.88–10.42 | — |
| Plain teal panel | 10.42–12.03 | — |
| North white column, grilled windows | 12.03–13.86 | — |
| Dark green shelves | across the screen | every 1.59 m from 4.53 to 20.43 |
| Short window row | — | 3.6–4.3 |
| Signboard on the fascia | 5.70–8.56 | 2.78–3.42 |
| Top band, lettered | full width | 20.43–22.6 |
| Cream parapet | full width | 22.6–23.5 |
| South stair core | 0.13–2.03 | to about 24.7 |
| Roof railing, 1 m back | about 2.5–8.0 | 23.5–24.5 |

Heights carry about ±0.2 m below the top band and ±0.5 m above it.

## What is modelled

- **Massing:** the screened front stands 1.37 m behind the source front line; the sides and rear follow the untouched outline to a flat roof at 23.5 m. Plain side walls with grilled windows stand above the lower neighbours.
- **Screen:**
  - teal panels and six columns of glazed cells, with dark green shelves at every bar and fins between the columns;
  - one column of geometric lattice panels, an original eight-pointed star pattern over dark glass.
- **Side columns:** white, with grilled windows in each storey. The south column carries cantilevered white slabs at each storey with shelves between them, and rises as a stair core above the parapet.
- **Top:** the band of teal glass panels with a rayed emblem and MUHAMMADIYAH, redrawn originally, under a cream parapet, with the roof railing behind.
- **Ground floor:** an open, sheltered drop-off under the fascia, with teal columns and ceiling lights. The green signboard is redrawn with original typography: an emblem shield, the Arabic name and MUHAMMADIYAH ISLAMIC COLLEGE.
- **Forecourt:** paving, a white railing fence, the white sliding gate with scrollwork cresting, and the gate pillar with its letterbox and 17 LORONG 13 GEYLANG plate. They stand at the lane edge, outside the source outline but clear of the carriageway and every neighbour.

## What is omitted or estimated

- **Not modelled:**
  - the signboard's small contact line and the top band's smaller second line, which is unreadable;
  - the rooftop lattice structure and what looks like a pool, seen only on satellite imagery;
  - plants, bins, the parked vans and the interior.
- **Estimates:**
  - the side elevations, rear wall and roof;
  - the drop-off depth (4 m) and its columns;
  - the slab and shelf depths;
  - the lattice pattern;
  - the fence height and the gate's extent, taken from the oblique views.
- **Storeys:** the façade shows a tall ground floor and five storeys behind the screen, below the top band. The Floor 8 listing may count a roof level or a different scheme; no floor numbering is asserted.

## Review and validation

Use `?review=muhammadiyah-college` for a look up the screen, and `?review=muhammadiyah-college-gate` for the signboard, drop-off and gate.

All **109 tests**, the type check and the build passed. New checks cover:

- the No. 17 assignment, with Hainan Lim to the north and No. 15D/E generic;
- the measured bar rhythm, with storey slabs on every second bar;
- the column spans filling the frontage, and the face behind the source front;
- every fitting, including the forecourt fence, clear of the carriageway and the neighbours;
- walkable starts.

The Hainan Lim test now expects No. 17 to carry this identity. Day and night renders of both review starts showed no console errors.
