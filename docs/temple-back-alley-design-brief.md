# Temple-side back alley design and provenance

Research, implementation and direct visual inspection: **1 October 2026**. This is one requested streetscape addition, not a named premises or a claim about property ownership. GPT-6 Astra was verified from this turn's local model metadata before implementation.

## Route and corrected evidence

The retained OpenStreetMap [service alley, way 695010162](https://www.openstreetmap.org/way/695010162), runs **53.24 m** from Lorong 9 at **103.8765267, 1.3123998** to **103.8769756, 1.3125663**, behind the Geylang Road block containing Masjid Haji Mohd Salleh. A separate **16.25 m** [footway, way 1223458240](https://www.openstreetmap.org/way/1223458240), continues to Lorong 11 at **103.8771187, 1.3125954**, beside the estimated rear of Shan Yuan Tang.

**Correction to the preliminary research:** the earlier brief incorrectly treated the service way's endpoint as a sealed dead end and proposed a wall. Inspection of *all* ways sharing node `6528437058` revealed the footway. The first Street View position had snapped south to `1.3125519, 103.8771145`, showing the temple wall rather than the passage. Moving north revealed the open narrow connection. No closing wall was built. A vehicle dead-end sign at the western entrance does not establish a pedestrian dead end.

Sources accessed **1 October 2026**:

- Retained `public/osm-source.osm`, downloaded 28 September 2026: service way `695010162`, footway `1223458240`, and Lorong 9 context way `633797717`. Source coordinates, node order, footprint geometry and metre projection are preserved. Live OSM web pages could not be retrieved during this pass, so these are claims about the retained extract.
- [June 2024 entrance at Lorong 9](https://www.google.com/maps/@?api=1&map_action=pano&pano=042IB1VbBlDYdmxD8K1idg&heading=70&pitch=0&fov=85), directly inspected. Shows the pale yellow taller block, lighter two-storey side, shuttered service openings, windows, pipes, condensers, utility cabinets, bins and an external spiral stair. Its vehicle dead-end sign is consistent with the later narrowing.
- [April 2024 passage from Lorong 11](https://www.google.com/maps/@?api=1&map_action=pano&pano=ifUFTPmGn1-kOv6waVHktw&heading=252&pitch=0&fov=75), directly inspected. Shows the narrow paved opening between the temple's cream rear wall with small red-framed windows/green shade and the low neighbour with a terracotta roof. No gate crosses the visible entrance. This corroborates a mapped pedestrian connection, without establishing present access rights.
- [April 2024 temple-side wall](https://www.google.com/maps/@?api=1&map_action=pano&pano=Kh1ZpAnWZ1uShZfVr533yQ&heading=260&pitch=0&fov=80), directly inspected. Cream plaster, red frames, mesh fencing and rooftop services are visible. This view alone cannot establish the adjoining passage's topology.
- [Block aerial view](https://www.google.com/maps/@1.312500,103.876900,20z/data=!3m1!1e3), inspected during the research pass, supports broad alignment and roof relationships, not detailed boundaries.

The temple-side route remains better supported than the coffeeshop option. No equivalent mapped alley immediately behind Leong Kee was identified in the retained extract. This absence does not establish that its gaps are private or inaccessible.

## Implemented scope

`map.json` now retains the two path ways and one complete Lorong 9 context way separately from its original 34 roads. This prevents service-lane metadata from creating traffic lines or changing automatic frontage selection elsewhere. The original 154 building outlines and all previous road coordinates are unchanged. The source's two-lane/50 km/h service tags are unsuitable width evidence and are not used by the renderer.

- Estimated **3.5 m** service paving and **1.4 m** footway, with simple slab variation, shallow edge drains and sparse grates. No road centre markings, vehicles or invented signs. The narrow connection remains open to walking.
- Minimal Lorong 9 paving on source way `633797717`, with the project's existing **6.5 m** estimated lorong width. The southern source centreline passes close to a retained corner footprint; broad road-edge accuracy is unverified. No footprint is moved to widen it.
- Conservative opaque rear surfaces on source edges of `453797939`, `454274485`, `475158359`, `454254204` and `1223407890`. Entrance-side windows, shutters, drainpipes, two utility cabinets and simple unbranded equipment use the observed vocabulary. Deeper surfaces are deliberately sparse; no new upper windows are attributed to the mosque.
- Source way `1223407890`, the small northern neighbour, has a single-storey cream shell with an estimated **3.35 m** eave and **4.45 m** terracotta ridge, following the April 2024 view. It carries no new name or tenant attribution. Its complete source outline remains the collision boundary.
- The rear edge of the separately estimated temple site now has cream plaster, small opaque red-framed openings and a shallow green shade. The site origin, outline, geographic rotation and interior collision remain unchanged.
- Two illustrative bins by the northern rear walls have collisions and clear the walking route. No external stair is placed: the reference supports its existence, but the entrance footprint/clearance evidence is too limited for a reliable placement in this pass.

Original code-native geometry only. No reference images, new raster textures, private interiors, people, activities or affiliations are shipped.

## Accuracy and limits

Confidence is high for the retained source alignment and shared-node pedestrian connectivity, medium for the dated entrance vocabulary and low neighbour's broad roof form, and low for fine details farther into the lane. October 2026 physical condition is unverified.

All widths, elevations not supplied by source levels, paint colours, opening counts/positions, equipment positions, drain/grate patterns and roof seams are **estimated reconstructions**. Repeated opaque rear openings are illustrative context, not a measured elevation or claim of exact current doors. The yellow block follows its mapped five levels at the existing 3.35 m/storey scale; other rear shell heights match existing massing. The model does not resolve the mosque's separately documented storey discrepancy.

The retained setbacks are wider than parts of the photographs appear. Simple estimated hardstanding fills the space between the lane and adjacent rear edges; it does not establish boundaries, ownership, parking or a surveyed lane width. Narrow paving and the original metre scale are preserved instead of moving source buildings. Walls/roofs beyond this small corridor retain earlier reconstruction limits.

## Review and validation

Review starts: `?review=temple-back-alley` (west), `?review=temple-back-alley-middle`, and `?review=temple-back-alley-east` (Lorong 11).

Automated checks cover exact path/footprint coordinates against the retained XML, both route lengths, shared nodes with Lorongs 9 and 11, continuous walking clearance including the bend, paving outside building interiors, review starts and bins outside the route. Completion validation is recorded in Q10 of the building queue.

## Future model gate

Before any later building or geometry work, explicitly verify that the active model is **GPT-6 Astra**, as requested by the user. This requirement remains in effect after this item is complete.
