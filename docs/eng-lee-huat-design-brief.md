# Eng Lee Huat Hardware, 29 Lorong 11 Geylang

Research and implementation: **10 October 2026**. Q43. This is the first model on the owner-approved re-spaced Lorong 11 west row (open question 1).

## Evidence and assignment

- **Current listing:** Google Maps lists **Eng Lee Huat Hardware**, a hardware store, at **29 Lor 11 Geylang, Singapore 388721**.
- **Street View, April 2024:** panoramas `H3-9KS_v_QrrAnpO7y28LQ` (square-on), `QQNp4tBAf9BWzHrMOUczcw` and `8kEpH_Q3jNSaUef89yiXtQ` show a black signboard reading **永利… ENG LEE HUAT HARDWARE PTE. LTD.**, partly covered by a red festival banner, beside door plate **29** on a white two-storey house.
- **Footprint:** the house is about **4.0 m** wide, between No. 27 and No. 29A. It stands on the authored footprint `l11w-29`, which replaces source way [1223407879](https://www.openstreetmap.org/way/1223407879) (6.41 m) under the approved re-spacing. The party-line table is in the building queue.

## How it was measured

- **Façade depth:** three panoramas rectified onto the authored front agree with the façade 0.6 m in front of it, as solved for Nos. 27–33.
- **Square-on reading:** heights and positions were read on the square-on frame from the five-foot-way floor. The signboard was read at full resolution.
- **Render-and-compare:** with the render camera moved 0.6 m towards the façade, the model's window, pediment, vents, hood, signboard, opening and lanterns overlay the photograph.

| Element | Position from the No. 27 line (m) | Height (m) |
| --- | --- | --- |
| Parapet | full width | 8.82 |
| Projecting hood, 0.45 m deep | full width | 7.1–7.22 |
| Grilled window | 0.4–3.55 | 4.95–6.72 |
| Lower grille over the condensers | 0.45–3.5 | 4.3–4.95 |
| Triangular pediment and vent blocks | 0.95–3.2 | 4.2–5.0 |
| Floor ledge | full width | 3.37–3.51 |
| Signboard | 1.51–3.29 | 2.93–3.31 |
| Door plate 29 | 3.42–3.52 | 3.18–3.33 |
| Shop opening | 0.66–3.75 | to 2.95 |

## What is modelled

- **Upper storey:** the white house with its flat roof and plain parapet, and the projecting hood. Below it, the large grilled window with net curtains, the lower grille over two condensers, and the stepped triangular pediment with two vent blocks.
- **Ground floor:** the floor ledge, piers and folded collapsible gates. The open shop shows shelves, a red letterbox and red lanterns.
- **Signs:** the signboard is redrawn originally, as are the plate.

## What is omitted or estimated

- **Not modelled:** the festival banner, potted plants, the parked car, stock and the interior.
- **Estimates:** the five-foot-way depth and the shelving.
- **Uncertain:** the third and later characters of the Chinese name are hidden by the banner. They are drawn as the common 永利發五金有限公司 form, which is an estimate.

## Review and validation

Use `?review=eng-lee-huat`.

All **131 tests**, the type check and the build passed. New checks cover:

- the re-spaced No. 29 footprint between Nos. 27 and 29A;
- the elevation order;
- fittings inside the outline;
- the walkable start.

The checks use a new shared helper module, `tests/helpers.mjs`, that tests against the rendered map with authored footprints applied. Day and night renders showed no console errors.
