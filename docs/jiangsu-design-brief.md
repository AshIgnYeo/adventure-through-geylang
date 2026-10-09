# JiangSu Jiu Jia 江苏酒家, 20 Lorong 11 Geylang

Research and implementation: **9 October 2026**. Q35, added in this session and built at the user's direct request.

## Evidence and assignment

- **Current listing:** Google Maps, read on 9 October 2026, lists **JiangSu Jiu Jia 江苏酒家, 20 Lor 11 Geylang, Singapore 388712**, a Chinese restaurant, open. Its place point (1.3129901, 103.8770385) is displaced into the lane about 8 m south of the house, outside every outline, so it is not used. The listed number matches [way 1223250201](https://www.openstreetmap.org/way/1223250201), tagged **No. 20**.
- **Second listing:** the same address also lists **Kim Chai Hin**, a supermarket. Its frontage was not identified, so it is not assigned.
- **Street View:** April 2024 panoramas `73intX-f7jQoMaTMSJ_4Mg`, `64XRklcWkCBOa9KyrvJ_PA` and `H9_pLycpI51HF8H7LV6YxA` show the white two-storey shophouse immediately south of the lavender Hainan Goh frontage (No. 20B, already modelled). It carries:
  - a blue **江苏酒家** board above a shallow dark awning;
  - a glazed restaurant front lit by a second 江苏酒家 sign;
  - a vertical neon 江苏酒家 blade sign on the party line with No. 20B.
- **Hainan Goh's entrance:** the timber door under the small 海南吳氏公會 board sits at the south end of No. 20B's five-foot way, not in No. 20's. This matches the existing Hainan Goh model's signed right entrance.

Only this way is assigned. All source coordinates are unchanged.

## How it was measured

- **Frontage:** the party downpipes were triangulated from the three panoramas. The No. 20B/20 line lands **0.25 m** and the No. 20/18 line **0.17 m** from the source corners, a width of **6.11–6.14 m** against 6.10 m. On this side of Lorong 11, the source is accurate, unlike the west side's Nos. 15–23.
- **Heights:** a frame square to the measured façade (heading 71.6°, fov 120) was taken from panorama `73intX…`, 5.9 m from the wall. The camera height is 2.4 m, measured for the same panorama at No. 19. The five-foot-way front edge confirms a 2.5° downward tilt, and door bottoms on the back wall give a five-foot way about **1.9 m** deep.
- **Blade sign:** its inner and outer edges were triangulated in plan from two panoramas. It sits on the party line and projects from about **0.2 m to 0.9 m**. Its heights are read from the square-on frame (±0.3 m).
- **Render-and-compare:** the scene rendered from the solved pose and blended with the photograph puts the board, both windows and the louvres, the small opening and exhaust vent, the lit sign, grille gate, shopfront and parapet moulding on their photographed positions.

| Element | Position from the No. 20B party line (m) | Height (m) |
| --- | --- | --- |
| Parapet coping | — | 7.55–7.67 |
| Parapet moulding | — | 7.15–7.27 |
| Left window: louvred transom over casements | 0.82–2.26 | 4.58–6.42 |
| Wide window (transom 5.90) | 3.12–5.92 | 4.64–6.47 |
| Small opening | 0.86–1.39 | 3.88–4.30 |
| Exhaust grille | 3.37–3.86 | 4.21–4.38 |
| 江苏酒家 board | 2.07–5.15 | 3.54–4.21 |
| Awning, at the wall and at its front edge | 0–0.45 out | 3.35, falling to 3.05 |
| Grille gate, on the back wall | 0.25–1.35 | to 2.11 |
| Glazed shopfront, on the back wall | 1.51–5.63 | to 3.07 |
| Lit sign inside the glazing | 2.36–5.10 | 2.52–3.07 |
| Blade sign, on the party line | 0.2–0.9 out | 3.7–6.7 |

## What is modelled

- **Massing:** a white two-storey shophouse with a parapet, and an estimated flat roof behind it, which satellite imagery shows as grey.
- **Upper storey:**
  - the left window: a raised white surround, a louvred transom and white-barred casements over a projecting sill;
  - the wide dark aluminium window, with top-hung lights over sliding panes;
  - the small opening, the exhaust grille and the white downpipe on the No. 18 party line.
- **Signs:** the blue 江苏酒家 lightbox board, the lit sign at the head of the glazing and the vertical neon blade sign. All three are redrawn with original typography.
- **Ground floor:**
  - the shallow dark awning with a pale valance;
  - piers, the 1.9 m five-foot way and its ceiling;
  - the grille gate and the aluminium-framed glazed shopfront, kept dark.

## What is omitted or estimated

- **Not modelled:** the red paper couplets, the stacked round table tops, the bin and plants, the wall fan, cables and the dining room.
- **Estimates:** the awning's projection (the photographs show it only from the front), the roof height and the five-foot way depth. The blade sign's heights are less certain than its plan position.
- **Neighbours:** No. 18 remains generic; its signage was not checked in this pass.

## Review and validation

Use `?review=jiangsu` for the front and `?review=jiangsu-five-foot-way` for the shopfront and signs.

All **102 tests**, the type check and the build passed. New checks cover:

- the No. 20 assignment next to Hainan Goh, with the displaced listing point unused and Kim Chai Hin recorded;
- the triangulated party corners within 0.35 m of the source;
- the elevation order;
- fittings inside the frontage;
- the blade sign and awning clear of the carriageway;
- walkable starts.

Day and night renders of both review starts showed no console errors. The first render-and-compare sat about 13 px low, which matched the camera's measured downward tilt; once that was applied, the blend aligned.
