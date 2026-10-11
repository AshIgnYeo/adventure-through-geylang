# AiSecurityReady CCTV shop, No. 2 Lorong 11 Geylang

Research and implementation: **10 October 2026**. Q41, added in this session under the user's request to keep sourcing and building identifiable, confirmed buildings.

## Evidence and assignment

- **Operator address:** the [operator website](https://aisecurityready.com/) (Ai Trading And Marketing, trading as AiSecurityReady), read on 10 October 2026, gives its CCTV shop at **2 Lor 11 Geylang, Singapore 388694**.
- **Listing:** Google Maps lists AiSecurityReady at the same address, open.
- **Footprint:** [way 1223250214](https://www.openstreetmap.org/way/1223250214) is tagged **No. 2**. It lies between S.M. Khek Leow (No. 4, already modelled) and the Leong Kee corner on Geylang Road.
- **Street View, April 2024:** panoramas `ifUFTPmGn1-kOv6waVHktw`, `Kh1ZpAnWZ1uShZfVr533yQ` and `DuD94mwPz0YzH7qI81rjmA` show an ornate charcoal-grey conserved shophouse:
  - three arched upper openings, with louvred timber shutters either side of a full-height pair, under fretwork fanlights;
  - Peranakan tile panels and strips, carved pilaster panels and capitals;
  - a modillion cornice and a fretwork eave board under a tiled roof.

  The ground floor carries lit **SUPPLY / INSTALL / WHOLESALE / CCTV** lettering and CCTV posters, under a board left by **Wina Salon**. Wina Salon is listed as permanently closed.
- **Identity caveat:** the operator's name itself is not displayed in the frames examined. The identity rests on the operator's own address, the listing and the matching CCTV signage, and the model's name records that.

Only this way is assigned. All source coordinates are unchanged.

## How it was measured

- **Frontage:** three panoramas were rectified onto the source front. All three put the No. 4 party line at the same place, to within about 0.15 m, so the façade lies on the source front. The photographed frontage is **5.26 m**, matching the source edge.
- **Pose offset:** the whole frontage appears 0.64 m further north than the source. These are same-drive panoramas, so this is a shared along-street position error. With it removed, renders of this model and of the existing Khek Leow model overlay both a square-on and an oblique frame.
- **Heights:** read from the five-foot-way floor in the near-square-on frame (`ifUF…`), and checked against the frame from the south.

| Element | Position from the No. 4 line (m) | Height (m) |
| --- | --- | --- |
| Fretwork eave board | full width | 7.4–7.95 |
| Modillion cornice | full width | 7.0–7.4 |
| Capitals | on each pilaster and column | 6.27–6.9 |
| Arched heads, fanlights | over each opening | 6.55; 6.0–6.36 |
| Side shutters | 0.76–1.72 and 3.4–4.35 | 4.65–6.0 |
| Centre full-height pair | 2.04–3.08 | 3.95–6.0 |
| Tile panels under the side shutters | as above | 4.05–4.45 |
| Pilasters / columns | 0–0.63, 4.45–5.26 / 1.72–2.04, 3.08–3.4 | — |
| Floor band, fascia | full width | 3.55–3.95, 3.09–3.55 |
| White canopy band with scroll brackets | 0.73–4.86 | 2.95–3.09 |
| Wina Salon board | 1.17–4.08 | 2.14–2.93 |
| Glazed door with CCTV lettering | 2.08–3.08 | 0.4–2.05 |

## What is modelled

- **Massing:** the source outline walled to 8.0 m, under a tiled roof estimated with the shared gable-roof module.
- **Upper storey:**
  - pilasters with carved panels, and columns with tile strips;
  - arched openings with timber shutters and fanlights;
  - tile panels under the side shutters;
  - the modillion cornice and the fretwork eave board.
- **Ground floor:**
  - the floor band, the fascia, and the white canopy band with scroll brackets;
  - a 1.8 m five-foot way;
  - a cream back wall with a louvred window, a timber door, the glazed door with lit lettering, and a display window;
  - the Wina Salon board, redrawn with its portrait panel left blank;
  - the tall blank-faced freestanding signbox at the south end.

## What is omitted or estimated

- **Not modelled:** the CCTV cameras, the solar panels, the vending machine, the posters, the fine carving, people and the interior.
- **Simplified:** the tile pattern is an original dot motif, not a copy of the historic tiles.
- **Estimates:** the roof, the five-foot way's depth and the shopfront layout.

## Review and validation

Use `?review=aisecurityready` for the front and `?review=aisecurityready-shop` for the ground floor.

All **121 tests**, the type check and the build passed. New checks cover:

- the No. 2 assignment south of Khek Leow;
- the elevation order, and the frontage tiled in order by pilasters, openings and columns;
- fittings inside the outline;
- the eaves and signbox clear of the carriageway;
- walkable starts.

Day and night renders of both review starts showed no console errors.
