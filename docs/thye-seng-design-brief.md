# Thye Seng Hardware Enterprise, 122 Sims Avenue

Research and implementation: **6 October 2026**. Active `gpt-6-astra` verified in current turn metadata before model edits. Q14 only, following clean main commit `7b85696`.

## Evidence and assignment

The [operator shop page](https://thyeseng.com/shop/) and [Makita dealer directory](https://makita.com.sg/find-a-dealer/), freshly checked on 6 October 2026, both list **Thye Seng Hardware Enterprise Pte Ltd, 122 Sims Avenue, Singapore 387445**. This establishes a current published business address, not surveyed boundaries or whole-building occupation.

Retained [OSM node 6396561545](https://www.openstreetmap.org/node/6396561545) at 103.8782669, 1.3141139 lies inside [way 682928762](https://www.openstreetmap.org/way/682928762). The footprint carries No. 122, Sims Avenue and three levels. Its street edge is approximately **6.70 m** wide. All original coordinates, the stepped rear outline and whole-building collision polygon remain unchanged. An explicit four-triangle roof closure preserves the concave rear notch.

[Google Street View, June 2024](https://www.google.com/maps/@?api=1&map_action=pano&pano=2Ajok7bnMLxnkcW7PuS2sQ&heading=135.73&pitch=15&fov=75) was visually re-inspected during implementation. Panorama `2Ajok7bnMLxnkcW7PuS2sQ` shows the three-storey cream elevation, two window groups per upper floor, ochre surrounds, ventilation slots, two condensers above the lower pair, red sloping awning and cream shop fascia with red Chinese and blue English lettering. Its UI label, 120 Sims Avenue, describes the camera context. The adjacent Yap Sun shop on the right helps distinguish the target frontage.

Thye Seng signage also extends onto the neighbouring frontage on the left. The available evidence does not establish the extent or unit boundary of that additional occupancy, so **No. 124 is not assigned**. No. 120 is also excluded. Lettering and an emblem on the target's upper wall appear to refer to separate premises; these are omitted because this build does not establish their identity or tenancy. The upper architecture is modelled without assigning it to the hardware business.

## Reconstruction limits

Original code-native geometry represents the windows, surrounds, vents, condensers, cornice, red awning, tiled piers and shallow sheltered shop entrance. Original canvas typography reproduces the large bilingual business name on the fascia. Product advertising on the awning is omitted; it retains the observed red colour. Window glazing and the shop backing are opaque. No stock, movable displays, people, private rooms, equipment branding or copied reference images are distributed.

The **10.25 m main wall**, **10.44 m roof-edge top**, window dimensions and divisions, **0.87 m awning projection**, **1.5 m shop recess**, colours and fittings are conservative visual estimates. The roof closure and unseen side/rear walls are simple massing, not a roof or rear-elevation survey. The surrounding generic shophouses remain illustrative and do not reproduce the continuous real three-storey row. Current façade condition and legal extent remain unverified.

## Review and validation

Use `?review=thye-seng` for the front and `?review=thye-seng-oblique` for the full elevation and shop recess. Both starts stay within the existing study boundary. Their upward camera angle is explicit because this building sits close to the northern map edge; other review starts retain their existing angles.

All **36 tests**, the production build and the whitespace check passed. New checks verify exact source-coordinate retention, named-point containment, adjacent-unit exclusion, roof area and notch coverage, fittings within the frontage, carriageway clearance and collision-free review starts within the walkable margins. Daylight front and oblique browser inspections covered the roof edge, upper windows/vents, condensers, bilingual fascia, awning and opaque shop recess. Browser console capture was unavailable in this inspection interface. The existing build bundle-size advisory remains; physical-phone performance is unverified.
