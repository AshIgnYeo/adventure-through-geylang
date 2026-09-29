# Adventure Through Geylang

A local browser exploration prototype focused on Lorong 11 Geylang, with Lorong 13 and the connecting main roads retained as background context. PlayCanvas + TypeScript + Vite.

## Lorong 11 reference-led pass

Six real places now have explicit source-linked footprint matches: Hotel 81 Joy, Agape Centre, Hok Tek Chi Loke Yah Teng Association, Lok Fu Lala Pot, Faith Mission Home, and Ho San Kong Hoey. See [reference notes](docs/lorong-11-references.md) and `src/landmarks.mjs` for evidence and uncertainty. The hotel has a bespoke pale-blue tower and recessed entrance; two heritage elevations use AI-generated reconstruction textures based on inspected URA photographs. These are recognisable approximations, not photogrammetric scans or a verified current streetscape. Faith Mission Home has a code-native street frontage based on its operator’s exterior photograph; its rear structure is not reconstructed. Ho San Kong Hoey has a code-native frontage based on April 2024 Street View, with estimated dimensions and simplified lower openings. The eating-house exterior is still illustrative. Agape's exact three-unit extent is provisional because source address numbering differs.

The initial view uses daylight for inspection. Blue hour and after dark remain available. Normal walking is 3.3 m/s on keyboard and touch; Shift is 5 m/s. Fictional signs are removed from unverified, Lorong-11-addressed buildings. Surrounding background streets still contain fictional signs.

Developer-only inspection links use `?review=hotel-81-joy`, `?review=agape-centre`, `?review=hok-tek-chi`, `?review=lok-fu`, `?review=faith-mission-home` or `?review=ho-san-kong-hoey` to start opposite a landmark. These are review camera starts, not an in-game map or tracking feature. Remove the query to return to ordinary exploration.

## Run

```sh
npm install
npm run dev
```

Open the localhost URL printed by Vite. For a phone on the same Wi-Fi, open the printed Network URL while the laptop and server remain running. No account, geolocation or microphone permission is needed. A network firewall or Wi-Fi client isolation can prevent phone access.

```sh
npm run build
npm test
```

## Explore

- Desktop: WASD or arrow keys to walk, drag to look. Double-click captures the mouse; Escape releases it. Shift walks faster.
- Phone: landscape recommended. Left joystick walks; drag on the right to look.
- Menu: daylight, blue hour or after dark; rendering detail; touch controls; return to start.
- No minimap, player tracking, navigation arrows or compass.

## Geographic fidelity

The downloaded OpenStreetMap extract is retained in `public/osm-source.osm`. `node scripts/prepare-map.mjs` produces the smaller `public/map.json`, retaining geographic coordinates, way IDs, one-way tags and source building footprints. All projection/rendering uses metres. Longitude is east/X; north is negative Z. No street compression is applied.

Source: https://api.openstreetmap.org/api/0.6/map?bbox=103.8758,1.3110,103.8812,1.3155, retrieved 28 September 2026. Map data © OpenStreetMap contributors, licensed under ODbL 1.0: https://www.openstreetmap.org/copyright. Derived map data retains that licence. The extract contains 34 relevant road ways and 154 building outlines. The source one-way tags indicate Lorong 11 southbound and Lorong 13 northbound. This is source-data fidelity, not an independently verified current traffic survey.

The metre projection is tested against an independent haversine distance, to within 0.6%. Source survey accuracy is separate from projection scale. Road widths are estimates (6.5 m on lorongs, 3.2 m per mapped lane on main roads). Pavements, awnings, street furniture, sign placement and road markings are illustrative. Building outlines are sourced; height uses mapped storeys where supplied, otherwise an estimate. No private interiors are reconstructed.

Heritage reference: https://www.ura.gov.sg/conservation/find-a-building/conservation-portal/gylg/ identifies early shophouses between Lorongs 11 and 13. The original generic atlas remains on unreviewed buildings. Real names occur only on explicitly matched landmarks, with estimated or reference-led sign designs. Address numbers are retained where present in source data, except where the landmark reconstruction supersedes them. No affiliation or endorsement is implied by depicting these organisations; fictional encounter behaviour must not be attributed to real operators.

## Current scope and limitations

This first deliverable is a walkable environment, not the multiplayer game. No lobbies, NPC encounters, group detection or deadline yet. Traffic is illustrative, follows source way direction and loops within road segments; it does not yet route through junctions, stop at signals or collide with the player. Building volumes block walking, while decorative props do not. The sampled area's outer boundary blocks walking. Surroundings outside the selected area are incomplete.

The browser build and geometry tests are checked locally. Desktop browser visual checks do not establish performance on an actual phone. Phone testing and facade/reference refinement are the next milestones. Google Fonts is optional, with local font fallbacks; no live mapping calls are needed during play.

## Generated asset

`public/shophouse-atlas.png` is the original generic texture, created with the built-in image-generation tool. Its prompt is saved in `docs/asset-prompt.md`. The newer `public/lorong-11-heritage-atlas.png` is a reference-led AI reconstruction, with source notes and the full prompt in `docs/lorong-11-references.md`. Neither asset is street-survey evidence. Public reference photographs are linked, not bundled as original game assets.

## Intended game

Private 2–6 player games lasting 5–15 minutes: fixed-address rendezvous and free-roam regrouping; solo mode eventually uses an escape objective. No minimap or other-player location tracking. People who meet can become subtly highlighted while visible. Deadline is the failure condition. Real scale is preserved; spawn selection controls walking distance.
