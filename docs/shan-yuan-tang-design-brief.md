# Shan Yuan Tang: reference and implementation brief

Prepared and implemented **30 September 2026**, following the user's request to add the iconic corner landmark. The user explicitly approved relative placement accuracy and requested implementation after switching to Astra. The model uses a separately labelled estimated site, with original exterior geometry. The completed hourly automation remains paused.

## Identity and sources

Target: **Shan Yuan Tang / 善緣堂**, **249 Geylang Road**, at the western corner of Lorong 11, beside Masjid Haji Mohd Salleh. Source access date: 30 September 2026. Distinguish source capture/publication dates from access date.

- [Google Maps place listing](https://www.google.com/maps/search/?api=1&query=Shan+Yuan+Tang+249+Geylang+Road) gives 249 Geylang Road and point **103.8770633, 1.3123882**. This is a location lead, not a surveyed footprint or parcel boundary.
- [Google Street View front/corner, June 2024](https://www.google.com/maps/@?api=1&map_action=pano&pano=7-UfHDndnVbmRSMy3AWU9w&heading=329.41&pitch=8&fov=50), directly inspected. Panorama `7-UfHDndnVbmRSMy3AWU9w`, camera **1.3122193, 103.8771527**. The gate visibly carries **249** and the Chinese temple name, read right-to-left across its black/gold board. This is the principal identity/address/exterior corroboration. The UI label, 222 Geylang Road, is camera context.
- [Google Street View Lorong 11 side, April 2024](https://www.google.com/maps/@?api=1&map_action=pano&pano=Cyb90czsWHg-VlCqIznp5Q&heading=265&pitch=8&fov=75), directly inspected. Panorama `Cyb90czsWHg-VlCqIznp5Q`, camera **1.3124687, 103.8771426**. Shows the side wall, roof changes, upper red shutters and cream wall. UI label No. 7 describes camera context.
- [Singapore Buddhist Free Clinic 2025 annual report](https://www.sbfc.org.sg/resources/ck/files/SBFC%20AGM%202025%20%28Book%29.pdf), member list as at 31 March 2025, p. 11, pairs **善缘堂** with **Siang Yen Tong Temple**. Primary corroboration of the Chinese name and alternate English name; it does not supply a footprint or façade survey.
- [Buddha.sg temple directory](https://www.buddha.sg/htm/general/temple.htm) lists **San Yuan Tang**, 249 Geylang Road, Singapore 389307. Undated secondary corroboration, with a telephone-number discrepancy against Maps; do not use it to assert current operation or affiliation.
- [SGPBusiness society listing](https://www.sgpbusiness.com/company/Siang-Yen-Tong-Temple) also gives No. 249 for Siang Yen Tong Temple. Secondary registration evidence only. Do not infer founding date, practices or ownership from it.

Confidence: high for the visually corroborated corner identity/address, medium for the broad dated exterior, unresolved for precise site/building geometry. No assertion of September 2026 condition, legal extent or private activities.

## Design direction supported by inspection

Build a recognisable corner composition with both street-facing sides, rather than applying a shophouse elevation to one edge:

- Red gate piers and a barred, opaque entrance, beneath a small green tiled hip roof. Black plaque with original gold lettering in the observed visual order, **堂 緣 善**. Retain the visible small 249 number; omit fine notices.
- Dark green boundary wall panels divided by red piers, with green tiled coping and a return along Lorong 11. Broad framed mural positions are visible on the Geylang Road wall; use neutral inset panels initially. The narrative artwork and figures are not established well enough to recreate or copy.
- Cream upper building with red window frames/shutters, red fascia and broad green roof planes at differing heights. Side reference shows three separated shuttered openings and a grouped opening at the right return; use the photographs to determine their alignment, without assuming symmetry.
- Original code-native meshes for sloping roof planes, simplified tile courses and rounded tile ends. Roof silhouette and the relation of gate, low wall and taller rear building carry the landmark's identity. Detailed ridge ornaments, small religious figures and fine decorative carving remain omitted unless separately resolved.

All dimensions, tile counts, colour samples, roof pitches and occluded surfaces must be explicitly labelled as estimates. Preserve the scene's metre scale. Keep openings opaque and exclude temple interiors, statues, people, activities, street clutter and the neighbouring mosque's branding or geometry from this item. Reference photographs remain links only, never runtime assets.

## Estimated placement approved by the user

The retained `public/map.json` has **no polygon containing the Maps place point**, and neither retained map file has a No. 249 or Shan Yuan Tang building entry. This prevents the existing identity-to-footprint workflow from being applied unchanged.

Relevant retained OSM features:

- **Way 454254204** is the neighbouring **Masjid Haji Mohd Salleh**, explicitly tagged No. 245 Geylang Road and `building=mosque`. Do not reassign, reshape or subsume this polygon.
- **Way 1171884241** is a broader `landuse=religious` polygon, without an individual temple identity or building tag. It covers a broader site including the mosque; it is not a temple building footprint. Do not convert it into one.

The user resolved this prerequisite on 30 September 2026: “just a relative accuracy is fine” and “proceed”. The authored site is therefore an explicitly estimated reconstruction. No OSM way ID is fabricated, and neither retained map file is changed. Its registry is exported separately as `authoredLandmarks`, preserving the existing footprint-match checks for the other ten landmarks.

## Implemented geometry and limits

`src/authored-sites.mjs` holds the estimated site and review positions. `src/shan-yuan-tang.ts` builds its exterior through the existing PlayCanvas world helpers. The local geographic frame uses metres, anchored at **103.877055, 1.312332**, with its front axis rotated **15.66 degrees** north of east. The enclosed site is **10.4 m wide and 25.5 m deep**, with a chamfered street corner. These are modelling choices, not surveyed measurements. The initial 11.8 m width was narrowed to clear the estimated Lorong 11 carriageway; drafted cross-street proportions are fitted to the final width. Source building polygons and road coordinates are unchanged.

The main upper roof reaches approximately **8.15 m**, including simplified ridge caps. The entrance roof reaches approximately **5.35 m**; boundary wall panels reach **2.30 m**, with tiled coping around **2.7 m**. Three stepped upper masses, front/side gallery roofs, shuttered openings, grouped side panes, red piers, opaque gate grille and original name/number boards form the reconstruction. Widths, heights, offsets, pitches, curvature, tile counts, grille spacing, window proportions, typography and colours are estimates. Hidden rear/left walls are plain closures. The whole site blocks walking; no private interior is constructed.

Framed mural positions use neutral panels. Narrative artwork, fine ridge figures, religious sculpture, small notices, temporary objects and unseen details are omitted. The mosque remains outside this model's scope. There are no copied reference images or new raster assets. Shared meshes combine the original roof surfaces and tile ridges by material for batching; phone performance remains unverified.

Review starts: `?review=shan-yuan-tang` (corner) and `?review=shan-yuan-tang-side` (Lorong 11). Automated regression checks cover separate identity, metre projection, non-overlap with every source building, clearance from estimated carriageways and safe review starts. Required final validation is recorded in the queue. Initial research began clean at `1da036d`; implementation resumed only this brief and its Q7 queue note, preserving both.
