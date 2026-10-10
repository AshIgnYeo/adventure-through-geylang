# FSL EW LED Lighting, 118 Sims Avenue

Research and implementation: **10 October 2026**. Q38, added in this session under the user's request to keep sourcing and building identifiable, confirmed buildings.

## Evidence and assignment

- **Current listing:** Google Maps, read on 10 October 2026, lists **FSL EW LED LIGHTING**, a lighting store, at **118 Sims Ave**, with current opening hours. The number matches [way 682928760](https://www.openstreetmap.org/way/682928760), tagged **No. 118**, Sims Avenue, three levels.
- **Other listings at the address:** Hua Bian Assn and the Singapore Paper Merchants Association are also listed at No. 118. No signage for either was seen, and neither is assigned.
- **Street View, June 2024:** panoramas `u8Gt4GPB01nNd4_FoWchUQ`, `2Ajok7bnMLxnkcW7PuS2sQ` and `GSi02rgoddx_BEQoQuw5bw` show the stained three-storey frontage between Yap Sun Hardware (No. 120, its name on a blue awning) and the ABC Bistro corner building at Lorong 15 (No. 116). It carries:
  - a red **FSL / LED / LIGHTING / LIGHT UP THE WORLD** blade lightbox in a silver frame, on the No. 120 party line;
  - an orange **FSL** disc sign on the No. 120 pier;
  - a red **FSL EW LED LIGHTING** signboard and backlit **LED LIGHTING** lettering on the shop front of an open lighting shop.

Only this way is assigned. All source coordinates are unchanged. Nos. 116 and 120 remain generic.

## How it was measured

- **Façade depth:** the three panoramas were rectified onto vertical planes parallel to the source front. They agree only when the plane stands **about 3.25 m in front of the source front**:
  - the third-floor windows correlate best at that depth, both here and over Thye Seng's frontage at No. 122;
  - the No. 118/120 party wall solves to the same depth from two panoramas on opposite sides of it;
  - a render of the existing Thye Seng model, set on the source front, draws its windows about 1.35 times smaller than photographed from the same pose, while the kerb lines up.

  So the real façades of this row stand about 3.25 m closer to the road than the source footprints. Fok Wai Kee's brief independently measured a 7.67 m camera distance on the same row. The model keeps the source front, like its modelled neighbours. The offset is recorded for the row, not corrected.
- **Frontage:** on the rectified façade the photographed frontage runs from about **0.49 m** inside the No. 120 line to the No. 116 line, at **6.72 m** along the 6.77 m source edge. It lies wholly inside the source footprint. The strip at the No. 120 end is plain wall.
- **Heights:** these are read on the rectified façade from the five-foot-way floor, which sits about 1.8 m below the camera. Both rectified panoramas agree to about 0.1 m on the upper storeys.
- **Shop front:** both ends of the signboard were triangulated from two panoramas. They lie on the shop front, about **2.3 m** behind the piers. The board, grille and lettering are placed there, and their façade-plane readings were reprojected to that depth.
- **Render-and-compare:** the render camera was moved 3.25 m towards the façade so the model's wall sits at the photographed distance. Blends with square-on and oblique frames then put the windows, vents, ledges, piers, signboard and lettering on their photographed positions. The disc and blade signs agree to within about 0.3 m.

| Element | Position from the No. 120 line (m) | Height (m) |
| --- | --- | --- |
| Parapet band | full width | 10.52–10.8 |
| Second-floor vents | 1.0–2.95 and 4.2–6.1 | 9.59–10.02 |
| Second-floor windows | 0.84–2.99 and 4.13–6.2 | 7.95–9.38 |
| Upper ledge | full width, 0.34 deep | 6.81–7.09 |
| First-floor vents | 1.06–2.99 and 4.2–6.09 | 6.24–6.59 |
| First-floor windows | 0.92–3.06 and 4.13–6.16 | 4.69–6.09 |
| Blade lightbox, 0.25–1.05 m out | 0.49 | 3.92–6.78 |
| First-floor ledge | full width | 3.59–3.88 |
| Beam | full width | 3.17–3.59 |
| Piers | 0.49–1.06 and 6.17–6.72 | to 3.17 |
| Orange disc, 0.5 m across | 0.75 | centred at 3.06 |
| Signboard, on the shop front | 1.74–4.54 | 2.85–3.12 |
| LED LIGHTING lettering, on the shop front | 1.66–4.93 | 2.36–2.81 |

## What is modelled

- **Massing:** the whole irregular source outline walled to a 10.8 m parapet, with a flat roof.
- **Upper storeys:** on each floor, two windows in grey concrete surrounds with two-pane sliding glazing, under louvred vents. Two projecting ledges have stained undersides, with a little weathering on the wall. A white downpipe runs on the No. 120 line.
- **Five-foot way:** a 2.3 m five-foot way behind the beam and two piers. The No. 116 pier is white-tiled.
- **Shop front:** a dark ornamental grille transom, the red signboard and the backlit lettering. Below them are approximate display boards of round fittings, a red display cabinet and a doorway.
- **Signs:** the blade lightbox and the orange disc are redrawn originally and lettered on both faces.

## What is omitted or estimated

- **Not modelled:** the blade sign's small logos, the shop's stock, trolleys, the fridge and other movable displays, wiring, people and the interior.
- **Estimates:**
  - the shop-front layout below the lettering is approximate;
  - the depth of the five-foot way comes from two triangulated points;
  - the blade sign's projection is less certain than its height;
  - the roof and the side and rear walls are simple massing.
- **Neighbours:** Yap Sun Hardware (No. 120) is a lead for a later run. The ABC Bistro boards on No. 116 belong to a listing marked permanently closed, while Tai Say coffee shop is listed there, so No. 116 stays generic.

## Review and validation

Use `?review=fsl-led-lighting` for the front and `?review=fsl-led-lighting-blade` for an oblique look along the frontage at the blade sign.

All **112 tests**, the type check and the build passed. New checks cover:

- the No. 118 assignment between Nos. 116 and 120;
- the elevation order, with the blade sign clear of both ledges;
- fittings inside the frontage;
- the disc and blade signs clear of the carriageway;
- walkable starts.

Day and night renders of both review starts showed no console errors.
