# Hotel 81 Spring, 22 Lorong 15 Geylang

Research and implementation: **10 October 2026**. Q18, previously research-blocked. It is unblocked by the owner's answers to open questions 10 (Lorong 15) and 11 (partial-block splits).

## Evidence and identity

- **Google Maps:** lists **Hotel 81 Spring** at **22 Lor 15 Geylang, Singapore 388619**, with about 138 reviews, not marked closed. Hotel 22 Pte Ltd shares the address.
- **OSM:** retained node 4302906050 names Hotel 81 (Spring).
- **Operator:** the operator's property list no longer includes Spring, and its page returns 404 in October 2026.
- **Street View, April 2024:** panoramas `MgS1…`, `4VkQ…` and `dwar…` show a **HOTEL 81** sign and a small **SPRING** plate over the entrance of the pale-blue hotel.
- **Conclusion:** current operation is uncertain, so the model is a dated April 2024 exterior.

## The partial-block split

- **The block:** source way [454254281](https://www.openstreetmap.org/way/454254281) is a 2016 trace, 15.4 × 43.7 m, spanning several roofs.
- **Measurement:** parallax on the HOTEL 81 sign and the building edges across the three panoramas puts the hotel frontage at about **13.0–29.2 m** along the source front from its north end, with the façade about 0.55 m behind the front.
- **Footprints:** the block is cut square to the front into three strips:
  - `l15-north`: the Teck Keow Association building at 26A Lorong 15, with a 昱歡美食閣 eating house, generic;
  - `l15-22`: the hotel, 16.2 m;
  - `l15-south`: the beige Singapore Ship Chandlers Association building, generic.
- **Satellite disagreement:** the registered satellite roof places the hotel about 3–4 m further north. The satellite registration is uncertain by a similar amount here, so the street measurement is used.

## Elevation (approximate)

These were read on a rectified frame at the solved depth.

- **Windows:** three window storeys, at 4.3–6.1, 7.4–9.1 and 10.3–12.0 m, in four columns: a left window, a central double window, and two arched windows on the right.
- **Façade detail:** two vertical glass-block strips either side of the central bay (3.8–11.8 m), white pilasters and bands.
- **Top:** parapet at about 13.6 m, with a central stepped pediment to about 15.5 m around a round window.
- **Entrance:** the HOTEL 81 sign (2.76–3.44 m) on a white entrance canopy, and the SPRING plate below.
- **Ground floor:** windows, a service door and the lobby entrance.

Render-and-compare from the `4VkQ…` pose overlays the windows, glass blocks, pilasters and edges on the photograph.

## Omitted

The forecourt palm trees, cars and the interior. The top storey is partly estimated. Use `?review=hotel-81-spring`. All **163 tests**, the type check and the build passed, with day and night renders and no console errors.
