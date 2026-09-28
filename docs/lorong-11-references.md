# Lorong 11 reference-led pass

Research and visual inspection: 28 September 2026. Source retrieval dates do not establish the dates photographs were taken. No source photograph establishes all current conditions.

## What is in the scene

| Place | Evidence | Reconstruction limits |
| --- | --- | --- |
| Hotel 81 Joy, No. 11 | [Operator](https://www.wwhotels.com/hotel-81/joy/), inspected façade and entrance photographs; OSM way 454274491 | Pale-blue tower, stair fins, window rows and recessed entrance modelled individually. Height and details estimated. |
| Agape Centre, No. 8 | [Official address](https://agapesingapore.com/contact/?lang=en), [three-unit history](https://agapesingapore.com/agape-full-history/?lang=en), [URA historic No. 8](https://www.ura.gov.sg/conservation/find-a-building/conservation-portal/gylg-00316/), [URA historic No. 6](https://www.ura.gov.sg/conservation/find-a-building/conservation-portal/gylg-00495/) | Inspected photographs show mint/cream, floral tiles and shuttered windows. OSM and URA current/historic numbering conflict, so the assignment across three adjacent footprints is provisional. Do not treat it as a surveyed property boundary. |
| Hok Tek Chi Loke Yah Teng Association, No. 17 | [URA photograph](https://www.ura.gov.sg/conservation/find-a-building/conservation-portal/gylg-00334/), [2026 reporting](https://www.zaobao.com.sg/news/singapore/story20260125-8151043), OSM way 1223407885 | Pink two-storey shophouse, cream glass-pane windows and Chinese name. The texture reconstructs occluded areas and differs in some ground-floor details. No invented freestanding temple or religious interior. |
| Lok Fu Lala Pot, No. 38 | [Restaurant listing](https://www.quandoo.sg/place/lok-fu-lala-pot-106960/about), OSM way 1223250209 | Address and outdoor seating supported. Detailed exterior, canopy, colours, sign typography and table positions are illustrative. Needs current exterior photographs before a fidelity claim. |

The unreviewed surrounding buildings are still approximations. A registered address alone was not treated as proof of a visible shopfront. No real organisation is assigned NPC harassment, criminal conduct or affiliation with the game.

## Texture production

Built-in image generation, single two-panel atlas, saved to `public/lorong-11-heritage-atlas.png`. Inputs were two browser-visible URA façade images, No. 17 and historic No. 8. These sources are references for a new game texture; source photographs are not shipped unchanged in the project.

Direct references:

- https://isomer-user-content.by.gov.sg/467/f58fb231-2a00-4d6a-a3c2-207993d1fd2b/gylg-00334-facade.webp
- https://isomer-user-content.by.gov.sg/467/6b35d952-c9a1-4cf2-9899-d27aa2f5cf7f/gylg-00316-facade.webp

The generated atlas preserves broad palette and upper-storey identity, but introduces inferred ground-floor symmetry and ornamental details. It is not evidence of the actual façade. Signs are separate code-rendered layers; dimensions are estimates. Reference photo reuse and branding should be reviewed before any public release.

### Full generation prompt

Use case: photorealistic-natural. Asset type: reference-led diffuse texture atlas for a mobile 3D reconstruction of Lorong 11 Geylang. The TWO most recent images are architectural references, not output layouts. Image 1 is the pink association shophouse at 17 Lorong 11. Image 2 is the mint-and-cream Agape Centre frontage. Create ONE landscape texture atlas with exactly TWO equally wide panels side by side, each panel a complete front-on rectified elevation of a SINGLE shophouse unit, from pavement threshold at the very bottom to the top of its cornice at the very top. Left half: pink No17 façade. Right half: central mint Agape façade. Both façades must fill their half edge-to-edge, zero background, zero sky, zero pavement, zero gutters between the two panels, zero black margins. Photorealistic painted plaster, fine ornamental relief, glazed floral tiles, cream window frames. Preserve the reference-specific architecture: left three upper window openings with glass panes, yellow central panel under middle window, pink pilasters; right three upper shuttered openings, cream shutters, mint pilasters and blue-green patterned tile panels. Retain their actual two-storey proportions and reference colours. Remove cars, people, street lamps, drainpipes in front of windows, bins, projecting signage and plants so the entire building front is unobstructed; reconstruct occluded small areas conservatively. Ground floor is behind the covered walkway; keep doors and windows. Leave the horizontal ground floor fascia sign area blank in its original light plaster colour, all text and logos will be added as separate 3D layers. No invented pagoda roofs, no new businesses, no extra windows, no grunge exaggeration. Lighting flat diffuse daylight, very mild architectural self-occlusion only, no strong cast shadows. Output landscape 1536x1024 if possible. This is a reconstructed texture for a game, not documentary evidence.

## Validation

- Footprint IDs and source links are checked by automated tests.
- Metre projection and original one-way geometry are unchanged.
- Visual browser checks cover each landmark. Actual phone performance is still unmeasured.
- Next fidelity pass needs current street-level photographs and resolution of the Agape historic/current numbering before further detail is asserted as accurate.
