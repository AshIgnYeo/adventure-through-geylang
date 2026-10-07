# Fok Wai Kee Hardware, 104 Sims Avenue

Research and implementation: **7 October 2026**. Q29, added in this session and built at the user's direct request.

## Evidence and assignment

- **Current listing:** Google Maps, read on 7 October 2026, lists **Fok Wai Kee Hardware, 104 Sims Ave, Singapore 387428**, with current opening hours. Its place point lies inside [way 682928754](https://www.openstreetmap.org/way/682928754), which is tagged **No. 104**, Sims Avenue, three levels.
- **Street View:** June 2024 panorama `-vjbkWOXAP_tX2wp_eg-4w` shows the white three-storey Art Deco frontage between the pink Nos. 106–112 (which include the modelled Amrise Hotel) and No. 102. It carries a cream signboard reading **霍惠記銅鐵 FOK WAI KEE HARDWARE № 104**.

Only this way is assigned. The irregular source outline, about 18.7 m deep, is walled and roofed as massing.

## How dimensions were measured

**Heights** come from one square-on frame at heading 161.5° (fov 100, tilted 15° upwards):

- the 6.29 m frontage at one row gives a camera distance of **7.67 m**;
- the five-foot way base puts the camera **2.44 m** above it.

As a check, the resulting shoulder height of 11.0 m sits within 0.5 m of the neighbouring Amrise model's stepped parapet (10.75–11.25 m).

| Feature | Height (m) |
| --- | --- |
| Canopy | 3.12 at the front to 3.48 at the wall |
| First-floor windows | 3.9–5.9 (hoods to 6.43) |
| Second-floor windows | 6.6–8.38 (hoods to 8.99) |
| Main parapet | 9.9 |
| Scrolled shoulders | 11.0 |
| Crown | 12.0 |

**Horizontal positions** came from a second frame (heading 150°, fov 85), as fractions of the frontage between its two edges:

| Element | Position (m from the No. 106 side) |
| --- | --- |
| Narrow side windows | about 0.85–1.5 and 5.35–5.95 |
| Wide central window | 2.5–4.56 |
| Crown | 2.42–4.58 |
| Shoulders | 1.64–5.22 |
| Collapsible gates | 1.08–3.30 |
| Shop opening and sign | 3.51–5.83 |

The composition is centred about 0.3 m east of the source frontage centre; the source outline is kept.

**Method note:** during this build, tests showed that thumbnails taken at different fields of view can be offset by several degrees, even at the same requested heading and pitch. The pinhole scale *within* one frame holds to about 3%. Heights here therefore come from a single frame. Horizontal positions are fractions within the second frame. Absolute angles are never mixed across frames.

## What is modelled

- **Upper storeys:** a white three-storey frontage with two upper floors, each with narrow side windows and a wide central window under projecting hoods, and dark frames and glazing.
- **Parapet:** stepped, with scrolled shoulders and a scrolled crown.
- **Ground floor:** a dark sloping canopy, a canopy beam, end piers and two slim front columns. In a 1.9 m five-foot way (estimated): a grilled side window, two blue collapsible gates, the shop opening and the signboard, redrawn originally.
- **Roof:** flat, behind the parapet.

## What is omitted or estimated

- **Not modelled:** stock, brooms and pipes on display, people, parked vehicles, wiring and the interior.
- **Estimates:** the five-foot way depth, roof form, scroll profiles and front-column positions, the last read from a third frame.

## Review and validation

Use `?review=fok-wai-kee` for the elevation and `?review=fok-wai-kee-shop` for the signboard and gates.

All **83 tests** and the type check passed. New checks cover:

- the addressed three-level No. 104 outline containing its mapped point;
- generic neighbours;
- the elevation order, with the parapet near the Amrise parapet;
- fittings inside the frontage, and the canopy clear of the carriageway;
- walkable starts.
