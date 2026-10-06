# Buddhist Art Centre, 285 Geylang Road

Research and implementation: **6 October 2026**. Q15 only, following clean commit `f55f90b`. The user waived the queue's named-model check for this build.

## Evidence and assignment

A web search on 6 October 2026 returned the [operator store page](https://www.buddhistartcentre.com/store/) with **Buddhist Art Centre, 285 Geylang Road, Singapore 389332**. The page itself reset the connection when fetched directly, so its current catalogue was not re-read. This establishes a published business address, not surveyed boundaries or whole-building occupation.

Retained [OSM node 4689499461](https://www.openstreetmap.org/node/4689499461) at 103.8781907, 1.3125512 is named Buddhist Art Centre (Kaart ground survey, 2017) and lies inside [way 454254227](https://www.openstreetmap.org/way/454254227). The way carries no address tags. Its street edge is approximately **5.13 m** wide and the outline is about **14.72 m** deep. The neighbouring Sik Wai Sin node 4689499460 lies inside way 454254228 to the east, which helps fix the unit order. All original coordinates and the whole-building collision polygon remain unchanged.

Google Street View from **June 2024** was visually inspected in three panoramas. [Panorama `70E8HnCOcGqPcYcFVA6kZw`](https://www.google.com/maps/@?api=1&map_action=pano&pano=70E8HnCOcGqPcYcFVA6kZw&heading=10&pitch=8&fov=80) gives an oblique view from the No. 281 pavement. [Panorama `LiyhSflRbRfon_vCcaecGQ`](https://www.google.com/maps/@?api=1&map_action=pano&pano=LiyhSflRbRfon_vCcaecGQ&heading=8&pitch=14&fov=55) is a close view of the signboard, piers and five-foot way. [Panorama `_w5yHraTw78BWJJ4wn1RSQ`](https://www.google.com/maps/@?api=1&map_action=pano&pano=_w5yHraTw78BWJJ4wn1RSQ&heading=27&pitch=6&fov=22), from across Geylang Road, shows the full elevation and roof. The signboard displays **NO:285**, and the unit sits between the brown-and-white No. 283 and the white Eat First frontage at No. 287.

Only way 454254227 is assigned. Nos. 283 and 287 remain generic.

## What is modelled

- **Massing:** two storeys under an asymmetric tiled gable roof, its ridge parallel to Geylang Road, with raised party-wall copings and a green eaves fascia.
- **Upper storey:** three arched casement windows with white frames, blue arch bands, orange linings and green fanlights. Between them sit four fluted pilasters with blue flutes, yellow bases and green and red capitals. Above is a frieze of red scrolls on white, drawn as an original pattern.
- **Signs:** the teal bilingual signboard, redrawn with original typography reading `BUDDHIST ART CENTRE`, `世界佛教文物流通中心` and `NO:285`, with red, green, blue and yellow painted bands beneath it.
- **Vertical signs:** the orange-framed vertical sign on the left and the teal projecting sign on the right, in their observed colours only.
- **Five-foot way:** ochre piers, a capital of painted bands and a small bracket on the east pier, a lintel, a faded red awning, a tiled floor, soffit downlights and a shared green downpipe.
- **Chandeliers:** two tiered gilt chandeliers with crystal drops. They hang from the five-foot way soffit, outside the shopfront glass, and are part of the visible street exterior. They glow at night, as they appear lit in the reference.
- **Shopfront:** opaque glazing in gilded frames, a side door and a red LED board without its digits.

## What is omitted or estimated

- **Lettering:** the wording on both vertical signs is not reproduced, because it could not be read reliably. The small line left of the Chinese name on the main signboard is also omitted. The LED board's number and telephone digits are left out.
- **Not modelled:** stock, displays, religious objects, the potted plant, people, vehicles, wiring, the speaker box and any private interior.
- **Attic:** a raised attic structure behind the roofline appears in the cross-road view, but perspective does not establish whether it belongs to No. 283 or No. 285, so it is omitted.
- **Estimates:** the **7.7 m eaves**, **10.2 m ridge** set **32%** of the depth back (a front pitch of about 27°), **1.8 m five-foot way**, **0.45 m eaves overhang**, window, pilaster and sign dimensions, colours and the chandelier form are visual estimates from proportions in the panoramas. The rear slope, side walls and rear wall are simple massing, not a survey.
- **Five-foot way ends:** these are closed by thin ochre returns, because the neighbouring footprints are generic. The real five-foot way is continuous.
- **Neighbours:** the surrounding generic shophouses keep their existing flat roofs and lower eaves, so No. 285 reads slightly taller than its real neighbours.

## Review and validation

Use `?review=buddhist-art-centre` for the front from the far kerb, `?review=buddhist-art-centre-oblique` for the cross-road view that matches the reference angle and shows the roof, and `?review=buddhist-art-centre-five-foot-way` for the signboard and chandeliers. The roof is hidden from the near pavement, as it is in reality at this pitch.

All **40 tests** and the production build passed. New checks verify exact source-coordinate retention, named-point containment, exclusion of the Sik Wai Sin point and both neighbours, fittings and chandeliers inside the frontage and five-foot way, clearance of the Geylang Road carriageway, roof coverage with a ridge on both party walls, upward roof normals and walkable, correctly aimed review starts. Daylight and night browser renders covered the front, oblique and five-foot way starts. The only console message was a 404 for a resource the page itself does not request, most likely the browser's automatic favicon request. The existing bundle-size advisory remains. Physical-phone performance is unverified.
