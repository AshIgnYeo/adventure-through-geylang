# Zheng Li Hearty Kitchen 正利心厨, 35 Lorong 11 Geylang

Research and implementation: **10 October 2026**. Q46, on the owner-approved re-spaced Lorong 11 west row (open question 1).

## Evidence and assignment

- **Current listing:** Google Maps lists **Zheng Li Hearty Kitchen** at **35 Lor 11 Geylang**, open. The listing gives postcode 388728. ACRA-derived records place postcode 388727 at No. 35, and most companies registered there are eating houses.
- **Street View, April 2024:** panoramas `aHF7c6gZTF_nwgN7N0wTwg` (square-on) and `hHdVXQD79Suo5Y4VlonoNg` show the last house of the west row, before the open corner at Sims Avenue. A tall navy blade sign reading **正利心厨 ZHENG LI HEARTY KITCHEN 东海人家** hangs on its end pier, over an open restaurant under a blue lager awning, with red lanterns and long tables.
- **Footprint:** from the No. 33 pier to the end pier, the frontage measures about **6.9 m**. The house stands on the authored footprint `l11w-35`, which replaces source way [1223407876](https://www.openstreetmap.org/way/1223407876). The re-spaced row ends at this measured end pier, **0.66 m** past the source end, on open ground.

## How it was measured

- **Façade:** the frame was rectified at the solved 0.6 m façade depth.
- **Projecting bay:** the large window's bay projects 0.45 m, so its readings were scaled back to that depth (factor 0.915 about the camera). The first render put the bay 0.5 m high, and the corrected values align.
- **Blade sign:** its height and attachment were read from the oblique northern panorama.
- **Render-and-compare:** with the render camera moved 0.6 m towards the façade, the small and bay windows, vents, condensers, awning band and lanterns overlay the photograph.

| Element | Position from the No. 33 line (m) | Height (m) |
| --- | --- | --- |
| Roof slab | full width | 9.06–9.3 |
| Bay with hood, 0.45 m deep | 3.28–6.4 | 5.02–7.3 |
| Bay window | 3.51–6.17 | 5.66–6.75 |
| Four-pane window, vents above | 0.88–2.88 | 5.45–6.45, vents 6.9–7.1 |
| Fascia band | full width | 3.7–4.0 |
| Awning, 1.2 m deep | full width | 3.6 at the wall to 3.0 |
| Blade sign, 0.2–1.0 m out | 6.0 | 3.9–8.0 |
| Piers | 0.06–0.81 and 6.15–6.9 | to 3.0 |

## What is modelled and omitted

- **Modelled:**
  - the plain upper storeys, with the four-pane window under vent blocks, the bay window and two condensers;
  - the fascia, the blue awning with a pale lettering band and the red lanterns;
  - the side door, long tables and drink crates;
  - the blade sign, redrawn originally on both faces.
- **Not modelled:** the beer advertising itself, which is reduced to plain bands; the posters; the corner side sign; furniture detail; and the interior.

Use `?review=zheng-li` and `?review=zheng-li-blade`. All **137 tests**, the type check and the build passed, with day and night renders and no console errors.
