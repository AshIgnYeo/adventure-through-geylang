# Amrise Hotel, 112 Sims Avenue

Research prepared and implemented **4 October 2026**. The initial research pass ran on GPT-5.6 Sol. Before geometry edits, the continuation verified **gpt-6-astra** in the current turn metadata, as requested by the user. The two existing research documents were the only checkout changes and were preserved in this one-place implementation.

## Identity and current status

The [operator website](https://amrisehotel.com/) lists **Amrise Hotel (Sims Ave)** in its current portfolio and advertises stays through December 2026, rechecked during implementation. Its [older contact page](https://mail.amrisehotel.com/) gives **112 Sims Avenue, Singapore 387436**; the page also carries 2015 event material, so it is address corroboration rather than a recent update. A current [Booking.com listing](https://www.booking.com/hotel/sg/amrise-express-sims-avenue.en-gb.html) gives the same name and address. These sources support a current published hotel listing. They do not independently verify daily operation, ownership or occupation of neighbouring units.

The retained [OSM hotel node 4302905890](https://www.openstreetmap.org/node/4302905890), at **103.8778719, 1.3139641**, is tagged 112 Sims Avenue, #01-01 and lies inside [building way 682928750](https://www.openstreetmap.org/way/682928750). The way is independently tagged **112 Sims Avenue** and **three levels**. This supplies a strong single-footprint assignment.

## Exterior evidence

[Google Street View, June 2024](https://www.google.com/maps/@1.31413,103.87782,3a,80y,180h,90t/data=!3m7!1e1!3m5!1sYsOoBymJj446X2wJOG9R7w!2e0!7i16384!8i8192) was inspected directly on 4 October 2026. It shows the Sims Avenue frontage as part of a continuous three-storey pale-pink row, with shallow projecting window hoods, muted green-grey framed windows, a sheltered ground-floor frontage, square piers and glazed/opaque entrance elements. The large reopening-price banner is treated as temporary and should be omitted. Cars, people, bins, loose furniture and private interiors should also be omitted.

The broad row and elevated horizontal Amrise sign extend visually beyond the target frontage in perspective. They do not prove hotel occupation of Nos. 110 or 114. A [closer June 2024 view](https://www.google.com/maps/@?api=1&map_action=pano&pano=YsOoBymJj446X2wJOG9R7w&heading=160&pitch=15&fov=80), re-inspected directly during implementation, resolves the target entrance and a separate vertical oval blade sign beside it. The model reproduces only that vertical sign, with original simplified lettering, and omits the horizontal sign farther along the row. Adjacent façades remain independent generic source buildings. The elevated sign projects towards the street but stays within No. 112's frontage width.

## Geometry and implementation scope

- Preserve the six-edge source outline and metre projection. Its Sims Avenue front edge is source edge **0**, approximately **8.24 m** wide. The footprint is approximately **22.1 m** deep at its longest side.
- Retain the source **three-storey** count. The implemented wall height is **10.45 m**, with a stepped parapet reaching **11.30 m**. Both are labelled estimates, visually checked against neighbouring rooflines.
- One pale-pink three-storey frontage has paired central windows and narrow flanking windows on both upper floors, shallow horizontal hoods, restrained edge pilasters and a stepped parapet. The recessed ground floor has a brown left door and green-framed opaque glazing, square piers and terracotta lower bases. All geometry and lettering are original.
- Treat the side and rear as conservative massing. Do not invent rooms, balconies, amenities or interior circulation.
- No source photograph or temporary price promotion is copied. The **1.35 m** entrance recess, **1.57 m** window height, glazing subdivisions, hood projections, **2.75 × 0.83 m** blade sign, colours and trim profiles are estimates. Rounded parapet shoulders are simplified to small steps; minor fittings and notices are omitted. The original whole-footprint walking collision remains, so the recessed entrance is visual detail rather than an enterable lobby.

## Validation and completion

GPT-6 Astra was verified before implementation. The single registry entry covers way 682928750, with a focused model builder and three tests for source identity/levels, ground-detail containment and carriageway clearance, and safe inspection starts. Source coordinates, geographic scale, neighbouring assignments and raster assets are unchanged.

Review starts: `?review=amrise-hotel` and `?review=amrise-hotel-oblique`. Daylight browser inspection covered the full elevation, recessed doors, window hoods, parapet and blade sign, with no captured runtime warnings or errors. The oblique start was moved to make the blade visible and keep the full roofline in frame. Current façade condition, fine dimensional accuracy and physical-phone performance remain unverified. Automated results are recorded in Q13 of the building queue.
