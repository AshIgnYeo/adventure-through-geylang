# Wat Dhammasatis วัดธรรมสาทิส, No. 233 Geylang Road

Research and implementation: **10 October 2026**. Q52, on an owner-approved partial-block footprint (open question 11).

## Evidence and assignment

- **Listing:** Google Maps lists **Wat Dhammasatis**, a Buddhist temple, at **233B Geylang Rd, #03-233, Singapore 389293**, open.
- **Street View, June 2024:** panoramas `PYhl…`, `Xvnq…` and `2Y21…` show the white building directly west of the Frog Porridge corner. It has:
  - a maroon **WAT DHAMMASATIS BUDDHIST CENTRE วัดธรรมสาทิส** board on its second storey;
  - a gilded Buddha image in the recessed top-floor window;
  - a black and gold **Durian & Fruits Experience Centre 榴莲鲜果体验馆** board over a fruit stall on the ground floor. Fuyuan restaurant is also listed at No. 233.

## The partial-block split

- **The block:** source way [475158360](https://www.openstreetmap.org/way/475158360) is a 15.8 m frontage covering three buildings.
- **Measurement:** the three panoramas disagree on absolute positions but agree on widths along the front from the Frog Porridge party line:
  - No. 233, the white building, about 6.0 m;
  - No. 231, the teal-shuttered Peranakan shophouse (Vietnam Unisex Concept), about 4.2 m;
  - No. 229, the Lian Seng Peranakan shophouse, about 5.2 m.
- **Scaling:** the 15.4 m total was scaled to the 15.8 m source front.
- **Footprints:** the block is cut into three strips, square to the front: `gr-233` (6.15 m), `gr-231` (4.30 m) and `gr-229` (5.33 m). Together they tile the source outline exactly. No. 233 keeps the shared wall with Frog Porridge.
- **New helper:** the strips are cut with a half-plane clipping helper in `authored-footprints.mjs`, now available for other partial-block splits.

## Elevation (approximate)

These were read on a rectified frame at the source front:

- parapet 8.63 m;
- recessed top-floor glazing behind a balcony at 6.26–7.41 m, and an arched window;
- a second-storey window with the temple board at 5.37–5.73 m;
- first-floor dark glazing at 3.83–5.1 m;
- the durian board at 2.83–4.06 m;
- a gas-company awning with lights at 2.63 m.

The awning is kept to 0.35 m, because the source front lies within half a metre of the modelled carriageway. Render-and-compare from the raw poses shows every model on this stretch, Frog Porridge included, about 2–3 m east of the photographs: a shared panorama offset.

## What is modelled and omitted

- **Modelled:** the stepped white front, the temple and durian boards (redrawn originally), the Buddha image behind the top glazing, and the fruit stall.
- **Not modelled:** stall goods, lights beyond the valance pattern, the shrine and interior.
- **Neighbours:** Nos. 229 and 231 stay generic.

Use `?review=wat-dhammasatis`. All **149 tests**, the type check and the build passed, with day and night renders and no console errors.
