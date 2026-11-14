# Sims Avenue, north side, No. 135 to No. 205

Research and implementation from **14 November 2026**, under open questions 83 and 84. This brief covers `src/sims-avenue-north-layout.mjs`.

## Scope and method

- **Stretch:** the north side of Sims Avenue from No. 135, next to the modelled pair at Nos. 131-133, to No. 205 at Lorong 21A's west corner: Nos. 135-145 west of Lorong 17, Nos. 147-159 between Lorong 17 and Lorong 19, Nos. 165-177 between Lorong 19 and Lorong 21, and Nos. 183-205 between Lorong 21 and Lorong 21A. The lanes north of the avenue and the Buddhist Congress Center at Lorong 23 wait for a later pass.
- **Map:** `scripts/prepare-map.mjs` takes the 29 buildings by id and keeps the mouths of Lorongs 17, 19, 21 and 21A as road. The Sims Avenue corridors already ran from Lorong 17 to past Lorong 21; they are carried west past No. 135 and east to Lorong 21A.
- **Order:** Lorong 21 to Lorong 21A first, where the drives were calibrated, then west from Lorong 21 to No. 135. Each stop is one photographed building, or a uniform row.
- **Imagery:** Google Street View cannot be opened from this environment (open question 84), so the walk uses KartaView's three eastbound drives along Sims Avenue, on 16, 24 and 25 May 2023: full panoramas of 13,000 × 6,500 pixels about 10 m apart. Sources link to the frames; no image is copied into the repository.
- **Naming:** unchanged in principle, but listings cannot be checked from here either, so every building is unnamed for now and its boards are drawn blank. Legible signs and house numbers are recorded below, so the names can follow once listings are checked.
- **Code:** each place is a measured elevation on one edge of its footprint, built with the lane-house helpers shared with the lane walks (`src/lane-house-layout.mjs`, `src/lane-house.ts`).

### Measuring from KartaView

The frames' GPS positions lag along the drive and their recorded headings drift by several degrees, so neither is used as it stands.

1. **Pose:** in each frame used, the party walls are read at the five-foot-way piers, or at the upper storey where vehicles hide the piers, and matched to the source footprint corners, with house numbers on signs anchoring the match. The frame's position and heading offset are then solved by least squares. On 24 May the positions sat 11.9-13.9 m east and 1.2-2.5 m south of their GPS fixes, and the heading offsets ranged from −0.7° to −5.9°; the fits leave residuals of 0.08-0.8°.
2. **Plane:** each façade is rectified onto its source front from two frames. With the poses solved, the frames agree on the source front within about 0.3 m along the row and 0.2 m in height, so the elevations are read there, as the Street View walks read theirs where the panoramas agreed.
3. **Heights:** the cameras ride about 2.9 m above the five-foot-way floor. Heights are read above that floor in each frame, which also takes out each frame's small tilt; they carry about ±0.4 m.
4. **Near-frontal reading:** each building is read in a mosaic that takes every column from the frame most nearly opposite it.

The street fronts stand 6.6-7.3 m from Sims Avenue's centreline, at its estimated carriageway's edge, so awnings, low blade signs and air-conditioners are held within 0.25 m of the walls (`heldFlat`), as on the Geylang Road row east of Lorong 17.

## Status, 14 November 2026

**In progress; six of 29 buildings modelled.** Nos. 183-193 are done. Nos. 195-205 come next, from the 25 May drive, since trucks parked on 24 May hide their five-foot ways.

## Lorong 21 to Lorong 21A

### Stop 1: No. 183, the Lorong 21 corner (way 454254353)

- **Building:** a Late-style corner house with a weathered cream front: three arched glazed windows between ornate pilasters, the middle one glazed down to the ledge and an air-conditioner under the east one; a moulded frieze under pink-faced tiled eaves; a green awning over a fruit stall in the five-foot way.
- **Signs:** a red double-sided blade at the corner reads 美罗鲜果有限公司, 183 Sims Ave, Singapore 387495, with a METRO mark. Drawn blank.
- **Lorong 21 face:** blank but for one small high window about 5 m from the front. Two overlapping green awnings run along it over the stall, and its top steps down about 10.5 m back. This face was read from the frame west of the lane, whose pose is the drive's offset rather than its own solve, so its heights are scaled to the front view's reading at the corner (about 6% lower).
- **Heights:** eaves 8.2-8.5 m, frieze 7.36-8.14 m, upper windows 5.5-6.74 m (the middle one from 4.53 m), ledge 4.21-4.64 m, awning 3.3-4.07 m.
- **Frames:** 8348649/2755 and 2756 for the front, 8348649/2754 and 8350297/5487 for the corner.

### Stop 2: No. 185 (way 454254354)

- **Building:** cream Late-style: three red-framed windows with blue-grey louvred shutters under arched grilles, the middle one opened over white panels; green-tiled pilasters and panels; a moulded frieze under tiled eaves.
- **Five-foot way:** a short green canopy above a dark blue board over a stainless-steel workshop.
- **Signs:** the board reads 185, 大華白鋼工程, TAI WAH STAINLESS STEEL WORKS, with telephone numbers. Drawn blank.
- **Heights:** eaves 8.31-8.5 m, frieze 6.93-8.07 m, shutters 5.29-6.6 m, ledge 4.0-4.36 m, board 2.86-3.64 m.

### Stop 3: No. 187 (way 454254355)

- **Building:** cream Late-style: three windows with closed brown louvred shutters under arched grilles, the middle one shuttered down to the ledge; green-tiled pilasters and panels.
- **Signs:** a yellow board reads 永豐白鋼雪櫃工程, ENG FONG STEEL REFRIGERATION WORKS, No. 187, buy, rent and sale of new and used kitchen equipment. Drawn blank.
- **Heights:** eaves 8.21-8.4 m, shutters 5.29-6.64 m, board 3.03-4.0 m.

### Stop 4: No. 189 (way 454254356)

- **Building:** white Late-style: dark windows in red arched frames either side of an orange-panelled middle window, an air-conditioner on the west one's sill, white pilasters. The west pier is clad in stainless steel.
- **Five-foot way:** the fascia carries the date 1930 in relief over a black board, with a blade sign at the east pier, over a glass spa front with painted panels.
- **Signs:** the board reads Ni flora Wellness; the blade reads SPA. Both drawn blank.
- **Heights:** eaves 8.21-8.36 m, windows 5.29-6.5 m, the dated fascia 3.71-4.03 m, board 3.07-3.5 m, blade 3.0-4.86 m.

### Stop 5: No. 191 (way 454254357)

- **Building:** turquoise Late-style, picked out in white: three dark arched windows, the middle one over turquoise panels and an air-conditioner in the east one; white-patterned pilasters and tile panels; a turquoise frieze with white ornament.
- **Five-foot way:** an ornamented beam on piers faced with pink tiles; behind it, turquoise French windows either side of a grilled door.
- **Signs:** none photographed, so no name would be given in any case.
- **Heights:** eaves 8.43-8.64 m, windows 5.57-6.86 m, beam 3.71-4.29 m.

### Stop 6: No. 193 (way 454254358)

- **Building:** mint-green Late-style, picked out in white: three dark arched windows, the middle one glazed down to the ledge; a room on the roof behind the eaves, with air-conditioners. Its depth is estimated.
- **Signs:** a pale blue board reads POLAR ICE 永晟白钢厨具, One stop commercial kitchen equipment supplies, with a narrower dark blue board below; a tall POLAR ICE blade at the east pier is numbered 193. All drawn blank.
- **Heights:** eaves 8.43-8.57 m, windows 5.5-6.79 m, boards 2.71-4.21 m, blade 4.57-8.0 m.

Use `?review=sa-183`, `?review=sa-185`, `?review=sa-187`, `?review=sa-189`, `?review=sa-191` and `?review=sa-193`.
