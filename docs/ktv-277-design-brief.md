# 277 KTV, 275–277 Geylang Road

Research and implementation: **7 October 2026**. Q22, added in this session and built at the user's direct request.

## Evidence and assignment

- **Current listing:** Google Maps, read on 7 October 2026, lists **277 KTV, 277 Geylang Rd, Singapore 389327**, open until 3 am. A general web search found no other corroborating listing.
- **Street View:** June 2024 panorama `1udsor6p2plZzO-0C3V8yg` shows one black signboard reading **芽笼 277 KTV** and **醉好** (芽笼 is "Geylang") across two frontages. Below it are boards with 醉好 and 277 KTV.
- **Neighbours:** to the west is the Zui Xiang frontage, whose sign shows **#273**. To the east is the unit signed EROS adult shop, then RR Motor at No. 281.
- **Assignment:** counting 5.13 m frontages identifies unnumbered [way 454254222](https://www.openstreetmap.org/way/454254222) as No. 275 and [way 454254223](https://www.openstreetmap.org/way/454254223) as No. 277. Both carry the 277 KTV identity because the signboard spans both. The listed address is No. 277. Use of No. 275 beyond the shared frontage is not asserted. Nos. 273 and 279 stay generic.

## What is modelled

**Upper storeys:** both share the row elevation measured at [Eat First](eat-first-design-brief.md), in a new **fretwork** finish:

- dusty pink walls, pilasters, relief cartouches and frieze;
- arched openings with **white fretwork fanlights**, drawn as an original sunburst of spokes, lattice rings and small rings, cut out over a dark ground;
- **mauve-grey casements** with four panes over louvres;
- a pale frame and a pink eaves board.

**Roofs:** newer terracotta tiles with rendered pink copings and front end blocks. The geometry is estimated and shared with the row.

**Ground floor:**

- dark grey piers, including one shared by the two units;
- the black signboard, mounted proud of the cornice and redrawn with original typography in gilt and white;
- a lower black board with 醉好, 277 KTV and 醉好;
- a **black diamond-quilted wall** with studs closing the five-foot way behind the piers, about 0.42 m back;
- an original gold star-and-microphone motif on the west unit.

The signs glow faintly at night.

## What is omitted or estimated

- **Omitted:** Carlsberg and Asahi brand panels, the cartoon pig on the signboard, the cartoon characters on the quilted wall, the no-parking sign, plants on the ledge, cables and any interior or activity.
- **Estimates:** the enclosure depth, board positions and heights, the roof form and tile colours. Heights follow the measured row.

## Review and validation

Use `?review=ktv-277` for the pair and `?review=ktv-277-five-foot-way` for the boards and quilted wall.

All **61 tests** and the type check passed. New checks cover:

- the paired assignment against Golden Jade (No. 271) and RR Motor (No. 281), with Nos. 273 and 279 generic;
- elevation values shared with No. 287;
- the fretwork fanlights;
- fittings and the enclosure inside each frontage;
- boards continuous across the shared party line, with matching texture coordinates;
- walkable starts.

Renders by day and night led to two corrections: a visible seam where the proud signboard met the central pier, and a pink that read too pale.
