# K Hotel 1515, 15 Lorong 15 Geylang

Research and implementation: **7 October 2026**. Q17 only, following the Eat First commit. Built at the user's direct request in this session.

## Evidence and assignment

The [Hotels Licensing Board notice](https://www.hlb.gov.sg/notices/2021-q1/) records the change to K Hotel 1515 at **15 Lorong 15 Geylang, Singapore 388607**. A web search on 7 October 2026 found current listings with the same name and address, including [Hotels.com](https://hotels.com/ho2062187072/k-hotel-1515-singapore-singapore), Expedia and Trip.com. The listings give 80 rooms and a 2021 opening under this name. They establish a published hotel address, not surveyed boundaries.

Retained [OSM node 4302905933](https://www.openstreetmap.org/node/4302905933) still carries the stale name **Chang Ziang Hotel**, with No. 15 and the postcode. It lies inside [way 1223539238](https://www.openstreetmap.org/way/1223539238), which is tagged No. 15 Lorong 15 Geylang, about **11.55 m** wide and **20.18 m** deep. The stale name is not used anywhere in the model. All original coordinates and the whole-footprint collision polygon remain unchanged.

Google Street View from **April 2024** is the latest capture on this stretch, with history back to 2008. Five panoramas were inspected:

- `sk190g6HmylnIEWoWujUmA` and `mFm6Pl0Vtj8E29n4qWL8ig`, in front of the south and north ends;
- `CmAFX4qNXE-oR382np4z9w` and `p-KKH3__2aUcyvl6hLhBZQ`, oblique views along Lorong 15;
- `4VkQxUB4x9mQmQdqDyRARQ`, about 47 m north, showing the whole tower, its deep blank north wall and the rooftop plant room.

Satellite tiles at about 7.5 cm per pixel, with the OSM outlines overlaid, confirm the tower over the footprint, a paved forecourt to the east and the lower neighbours.

**Correction to the earlier research note:** the 6 October queue entry described a "five-storey" block. The building has **eight levels**:

- a three-storey podium;
- four storeys of bay windows;
- a top level with a turret and pediment.

## How dimensions were measured

The method is the same as for [Eat First](eat-first-design-brief.md): pinhole Street View views, square to the façade at heading 261.5°.

- **Setback:** window lines in the north half of the frontage sit consistently lower than in the south half. Treating the same floors as level gives a **1.27 m** setback for the north half.
- **Scale:** fitting the 11.55 m frontage under that setback gives a camera distance of **13.04 m** to the south half. The panorama's own position puts the footprint edge **12.86 m** away. The two agree within 1.4%, so the south half sits on the source edge.
- **Heights:** the camera height above the driveway is about **1.9 m**. Heights from square-on frames tilted 0°, 28°, 52° and 68° upwards agree to within about 0.25 m up to the fourth tower storey. They agree less well near the top.
- **Discarded frame:** a frame turned 23° off square read about 0.9 m high throughout. The panorama's recorded tilt and roll are under 1°, so it was set aside rather than explained.

The measured heights are listed below.

| Feature | Height (m) |
| --- | --- |
| Driveway beam | ~2.5 |
| K HOTEL 1515 lightbox | 3.33–4.34 |
| Podium windows | 4.4–5.6 and 7.47–8.70 |
| Grey band | 8.9–9.83 |
| Tower window bottoms | 10.5, 13.5, 16.5 and 19.5 (3.0 m storeys) |
| Grey top beam | 22.0–22.6 |
| Pediment apex | ~26 |
| Turret apex | 26.2–28.1 |

## What is modelled

- **Plan and massing:** the full footprint rises to a flat roof at 22.6 m with a low parapet. The south half of the frontage stands on the source edge and the north half 1.27 m back.
- **Side walls:** blank and white, as seen above the low neighbours.
- **Rooftop plant room:** a box with two antennas, set back. Its size and position are estimates from the north view.
- **Ground floor, south half:** a covered driveway between a grey pier and the grey "15" column. It runs to opaque lobby glazing about 9 m in, so no lobby interior is shown. Above it are a grey beam, the grey sign frame and the **K HOTEL 1515** lightbox.
- **Ground floor, north half:** a grey beam over a roller shutter, a red door and a red fire inlet.
- **Podium:** two storeys of blue windows in white frames, over aqua spandrels with X-pattern grilles, with grey fins between. The north half has white grille panels below its first-floor windows. A grey projecting band caps the podium.
- **Tower:** four storeys, each with four canted bay windows, two per half. Each bay has an aqua panel and X grille below a three-pane window, and a white ledge above. Three round grey columns rise from the band to the grey top beam.
- **Roof features:** a glazed square turret with a white cornice and a brown pyramidal roof at the south front corner, and a broad aqua pediment with white cornices over the north part.
- **Forecourt:** a concrete apron with yellow parking-bay lines, an orange boom-gate post and a round red-and-white K HOTEL sign on a post.

## What is omitted or estimated

- **Lorong 15 itself:** this road is not rendered. The derived map deliberately keeps four roads, and its east boundary runs along Lorong 15. The forecourt therefore ends at bare ground. Adding Lorong 15 would change the map scope and is left for a separate decision.
- **Not modelled:** the lobby and rooms, people, vehicles, bins, plants, the boom-gate arm, notices, overhead wiring and the satellite dishes.
- **Rear and sides:** the rear elevation and the west part of the roof are simple massing. The satellite view suggests a lower rear section, which is not resolved.
- **Estimates:** turret and pediment dimensions are taken from steep views with ±1 m uncertainty, and the turret apex uses 27.3 m within the measured range. Bay projection, window divisions, grille size, colours, parking-line layout and forecourt depth are also estimates. The K mark and lettering are original redrawings.
- **Neighbours:** Nos. 11 and 17 remain generic, so their heights do not match the real three-storey buildings.

## Review and validation

Use these review starts:

- `?review=k-hotel-1515`: the front.
- `?review=k-hotel-1515-oblique`: from the south-east.
- `?review=k-hotel-1515-forecourt`: the driveway and sign.
- `?review=k-hotel-1515-top`: a steep look up at the bays and pediment. The turret roof is nearly edge-on from the 12 m forecourt, as it is in reality, and reads best from further along Lorong 15.

All **49 tests** and the type check passed. New checks cover:

- containment of the No. 15 point;
- exclusion of the stale name;
- that Lorong 15 is present in the source but not in the rendered road set, and that the frontage faces it;
- unchanged coordinates;
- fittings inside the footprint, and the north half respecting its setback;
- forecourt items clear of every other footprint and inside the study bounds;
- the 3 m storey rhythm and the turret apex within its measured range;
- walkable, correctly aimed review starts.

Headless renders covered all starts by day and the front by night. Physical-phone performance is unverified.
