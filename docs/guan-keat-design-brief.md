# Guan Keat coffeeshop, No. 38 Lorong 11 at Sims Avenue

Research and implementation: **10 October 2026**. This is the owner-approved re-identification and footprint correction of C4 (open question 8). It replaces the provisional *Lok Fu Lala Pot* model.

## Why the identity changed

- **The Lok Fu model:** it was built from a restaurant listing alone, and its exterior was explicitly illustrative.
- **April 2024:** a banner inside the coffeeshop at No. 38 announced **六福 LOK FU LALA POT … Newly Open, 38 Geylang Rd 11**. Lok Fu was therefore a stall in the coffeeshop. It is now listed at Blk 1015 Geylang East Ave 3.
- **The awning:** the coffeeshop's long awning reads **GUAN KEAT PTE LTD**, with telephone numbers. A May 2024 OSM point names Guan Keat in this way.
- **What the name records:** Guan Keat is an LPG distributor whose branded awnings appear on coffeeshops; the No. 291 Geylang Road corner carries one reading GUAN KEAT PTE LTD … Esso LPG. The model's name therefore records the awning and the 2024 stall, without asserting who operates the coffeeshop.

## The footprint

- **Length:** four June 2024 Sims Avenue panoramas (`FVyD…`, `YZf1…`, `qzPH…` and `49OM…`) show one mint-green three-storey block along the whole Sims face. The registered satellite roof agrees with the 23.17 m source side. An earlier 18.6 m triangulation is not confirmed, so the source length is kept.
- **Corner:** the authored footprint `l11-38` adds a 3 m chamfer for the rounded Lorong 11 corner. It replaces source way [1223250209](https://www.openstreetmap.org/way/1223250209) and leaves a 21.05 m Sims face and a 4 m Lorong 11 face.

## Elevation

Positions were read on a rectified frame and scaled to the source face (factor 0.914), so they are approximate.

- **Windows:** on each upper floor, three wide windows nearest the corner (0.12–9.99 m from the chamfer) and three narrow ones to the east (12.37–19.77 m). Breeze-block vent strips sit above each window.
- **Heights:**
  - floor slab band 7.47–7.74 m;
  - second-floor windows 5.51–7.38 m;
  - third-floor windows 9.31–11.15 m;
  - parapet 12.07 m.
- **Ground floor:** a terracotta awning, 3.67 m at the wall and 2.29 m at the front, with the GUAN KEAT valance, over an open coffeeshop with columns, tables and yellow chairs.

Render-and-compare from the `qzPH…` pose overlays the windows, vents, awning and valance lettering on the photograph.

## Code changes

- **Lok Fu removed:** the provisional `lok-fu` registry entry and the eating-house fallback in `landmark-models.ts` have been removed. That fallback would otherwise have drawn Lok Fu signage for any unmatched model kind.
- **Tests:** the SHG Engineering and landmark tests now refer to `l11-38`.

Use `?review=guan-keat` and `?review=guan-keat-corner`. All **156 tests**, the type check and the build passed, with day and night renders and no console errors.
