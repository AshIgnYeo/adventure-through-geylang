# Liu Da Ma BBQ 刘大妈烧烤吧, 26 Lorong 11 Geylang

Research and implementation: **9 October 2026**. Q36, added in this session and built at the user's direct request.

## Evidence and assignment

- **Current listing:** Google Maps, read on 9 October 2026, lists **Liu Da Ma BBQ, 26 Lor 11 Geylang, Singapore 388718**, a Chinese restaurant on Floor 1, open, with about 790 reviews. The listed number matches [way 1223250204](https://www.openstreetmap.org/way/1223250204), tagged **No. 26**.
- **Second listing:** **天府渔香 Tianfuyuxiang** is listed on Floor 2 of the same address and is not assigned.
- **Street View, April 2024:** panoramas `H3-9KS_v_QrrAnpO7y28LQ` and `8kEpH_Q3jNSaUef89yiXtQ` show the salmon two-storey shophouse between Ho San Kong Hoey (No. 24, already modelled) and No. 28. It has:
  - a tall dark blade sign of bulb-studded characters reading **刘大妈烧烤吧** on the party line with No. 28;
  - a red retractable awning;
  - a restaurant front with roast-lamb posters, two kiosk screens and a doorway, and a small blue board beginning 刘大 over the door.
- **Square-on capture:** a **March 2022** capture, `Iep_Wq_YcEGEcE0_R-ecew`, stands square in front of the unit and shows the same frontage, blade sign and restaurant.
- **The other blade sign:** the vertical sign on the No. 24 party line reads 禾山公會 Ho San Kong Hoey and belongs to the No. 24 model.

Only this way is assigned. All source coordinates are unchanged.

## How it was measured

- **Frontage check:** a first two-panorama triangulation disagreed with the source by up to 1.5 m. Rendering the existing models from each panorama's pose showed that one frame's absolute yaw was 8°–13° off. From the reliable poses, Ho San Kong Hoey's modelled frontage lands on the photographed No. 24, and the generic No. 26 on the salmon house. The 6.10 m source frontage is used.
- **Scale and camera:** in the square-on March 2022 frame (heading 72.6°, fov 120), the party lines are 335 px apart, giving **55.0 px/m** and a camera **5.37 m** from the façade.
- **Level camera, shifted centre:** the frame's verticals are plumb at both edges (about 3 px of lean over 290 px). The horizon's 16.7 px offset above centre is therefore a shift of the image centre, not a tilt, and heights are read linearly.
- **Camera height:** the five-foot-way floor at the façade and at the back wall give a camera **2.41 m** above the five-foot way and a five-foot way about 2.0 m deep.
- **Awning:** its front bar spans the frontage at a perspective scale that puts it **1.3 m** out, at about 2.43 m.
- **Render-and-compare:** a level render, cropped to the same horizon, blended with the photograph, puts the parapet, canopy edge, louvres, windows, condensers, awning and blade sign on their photographed positions.

| Element | Position from the No. 28 party line (m) | Height (m) |
| --- | --- | --- |
| Parapet top | — | 7.23 |
| Corrugated canopy, 0.6 m deep | full width | 6.33 at the wall, 6.18 at the front |
| White louvred transoms | 0.58–2.36 and 3.64–5.42 | 5.38–5.65 |
| Windows | 0.58–2.36 and 3.64–5.42 | 4.21–5.38 |
| Sill ledge | — | 4.14–4.21 |
| Condensers on brackets | 0.45–1.36 (two), 3.67–4.67, 4.85–5.93 (two) | from 3.68 |
| Beam and awning box | — | 3.52–3.65 |
| Red awning, 1.3 m deep | 0.02–6.08 | 3.42 at the wall, 2.43 at the bar, valance to about 2.2 |
| Blade sign, 0.25–0.95 m out | 0.08 | 3.56–7.2 |

## What is modelled

- **Massing:** a salmon two-storey shophouse with a parapet and an estimated dark low roof behind it, as satellite imagery shows.
- **Upper storey:**
  - a corrugated canopy on brackets;
  - two windows with white louvred transoms over pale panes, on a sill ledge;
  - five air-conditioning condensers on brackets.
- **Ground floor:**
  - the red retractable awning with its white bar and scalloped valance;
  - red-painted piers and a 2.0 m five-foot way;
  - on the back wall, a blank poster panel, a red panel with two dark kiosk screens, and a dark doorway under a brass head.
- **Blade sign:** a dark navy board with bulb-studded 刘大妈烧烤吧, redrawn originally and shown on both faces.

## What is omitted or estimated

- **Not modelled:** the posters' photographs and offers, the TikTok marks, the robot waiter, red couplets and 福 decorations, the small 刘大… board (its last character is hidden), the wall fans, cables, furniture and the dining room.
- **Estimates:**
  - the back-wall layout comes from the April 2024 oblique views and is approximate;
  - the five-foot way depth, the canopy depth, the roof height and the colours are estimated;
  - the blade sign's projection is less certain than its height.
- **Neighbours:** No. 28 remains generic. It carries an English Abrasives notice upstairs and a blue-and-white striped awning, with no listing found.

## Review and validation

Use `?review=liu-da-ma` for the front and `?review=liu-da-ma-blade` for an oblique look at the blade sign.

All **105 tests**, the type check and the build passed. New checks cover:

- the No. 26 assignment between Ho San Kong Hoey and No. 28, with 天府渔香 recorded;
- the elevation order;
- fittings inside the frontage;
- the awning and blade sign clear of the carriageway;
- walkable starts.

Day and night renders of both review starts showed no console errors. The first render-and-compare used a pitched render camera and placed the parapet 18 px high. The plumb verticals showed that the photograph's offset is a shifted image centre. A level render cropped to the same horizon then aligned, and JiangSu Jiu Jia was re-checked the same way.
