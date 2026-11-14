# Sims Avenue, north side, No. 135 to No. 205

Research and implementation from **14 November 2026**, under open questions 83 and 84. This brief covers `src/sims-avenue-north-layout.mjs`.

## Scope and method

- **Stretch:** the north side of Sims Avenue from No. 135, next to the modelled pair at Nos. 131-133, to No. 205 at Lorong 21A's west corner: Nos. 135-145 west of Lorong 17, Nos. 147-159 between Lorong 17 and Lorong 19, Nos. 165-177 between Lorong 19 and Lorong 21, and Nos. 183-205 between Lorong 21 and Lorong 21A. The lanes north of the avenue and the Buddhist Congress Center at Lorong 23 wait for a later pass.
- **Map:** `scripts/prepare-map.mjs` takes the 29 buildings by id and keeps the mouths of Lorongs 17, 19, 21 and 21A as road. The Sims Avenue corridors already ran from Lorong 17 to past Lorong 21; they are carried west past No. 135 and east to Lorong 21A.
- **Order:** Lorong 21 to Lorong 21A first, where the drives were calibrated, then Lorong 17 to Lorong 19, then west of Lorong 17 to No. 135. Each stop is one photographed building, or a uniform row.
- **Imagery:** Google Street View cannot be opened from this environment (open question 84), so the walk uses KartaView's three eastbound drives along Sims Avenue, on 16, 24 and 25 May 2023: full panoramas of 13,000 × 6,500 pixels about 10 m apart. Sources link to the frames; no image is copied into the repository.
- **Naming:** unchanged in principle, but listings cannot be checked from here either, so every building is unnamed for now and its boards are drawn blank. Legible signs and house numbers are recorded below, so the names can follow once listings are checked.
- **Code:** each place is a measured elevation on one edge of its footprint, built with the lane-house helpers shared with the lane walks (`src/lane-house-layout.mjs`, `src/lane-house.ts`).

### Measuring from KartaView

The frames' GPS positions lag along the drive and their recorded headings drift by several degrees, so neither is used as it stands.

1. **Pose:** in each frame used, the party walls are read at the five-foot-way piers, or at the upper storey where vehicles hide the piers, and matched to the source footprint corners, with house numbers on signs anchoring the match. The frame's position and heading offset are then solved by least squares. On 24 May the positions sat 11.9-13.9 m east and 1.2-2.5 m south of their GPS fixes, and the heading offsets ranged from −0.7° to −5.9°; the fits leave residuals of 0.08-0.8°.
2. **Plane:** each façade is rectified onto its source front from two frames. With the poses solved, the frames agree on the source front within about 0.3 m along the row and 0.2 m in height, so the elevations are read there, as the Street View walks read theirs where the panoramas agreed.
3. **Heights:** the 24 May camera rides about 2.9 m above the five-foot-way floor, the 25 May one, nearer the kerb, about 2.3 m. Heights are read above that floor in each frame, which also takes out each frame's small tilt; they carry about ±0.4 m.
4. **Near-frontal reading:** each building is read in a mosaic that takes every column from the frame most nearly opposite it.

The street fronts stand 6.6-7.3 m from Sims Avenue's centreline, at its estimated carriageway's edge, so awnings, low blade signs and air-conditioners are held within 0.25 m of the walls (`heldFlat`), as on the Geylang Road row east of Lorong 17.

## Status, 14 November 2026

**Complete; one question waits for the owner besides 83 and 84.** All 29 buildings are modelled: 25 as measured elevations, and the four set-back buildings between Lorong 19 and Lorong 21 (Nos. 165-177) as photographed massing on their source outlines. The question on the walk itself is [85](open-questions.md), No. 145's corner.

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

### Stop 7: No. 195 (way 454254359)

- **Building:** yellow Late-style, a little lower than its neighbours: three dark windows under yellow arches between pilasters with green and white strips, the middle one over a small iron balcony grille, tile panels under the others, a yellow frieze under a grey gutter. A thick moulded beam on bulging yellow piers spans the five-foot way, behind which a brown door and a roller shutter.
- **Signs:** a blue blade at the east pier reads 天下. Drawn blank.
- **Heights:** eaves 7.73-7.94 m, frieze 6.94-7.6 m, windows 5.19-6.3 m, beam 3.9-4.3 m.
- **Frames:** 8348649/2758 (24 May), with 8350297/5492.

### Stop 8: No. 197 (way 454254360)

- **Building:** a plainer cream house with a flat eave: three brown-framed windows with curtains under three round vents, an air-conditioner under the east one.
- **Signs:** a white board painted with parrots reads AIK GUAN PETT TRADING, EXPORTER & IMPORTRTER OF BIRDS, since 1978 (the board's spellings). Drawn blank.
- **Heights:** eave 7.94-8.16 m, windows 5.23-6.97 m, board 3.23-4.09 m.

### Stop 9: No. 199 (way 454254361)

- **Building:** pink, with a flat eave: three windows under round vents, the five-foot way entered through a wide arch (drawn as piers with haunches), and behind it a pink glass shopfront with a tiled counter.
- **Signs:** Temptations, with EST 1985, lettered on the wall, and the plate 199. Drawn as a blank panel.
- **Heights:** eave 7.94-8.23 m, windows 4.8-6.61 m, lettering 3.66-4.59 m, arch to 3.25 m.
- **Frames:** 8350297/5492 (25 May), with 8348649/2758.

### Stop 10: No. 201 (way 454254362)

- **Building:** white, with a flat eave: three large dark windows under round vents, a dark glass shopfront, the plate 201 on the east pier.
- **Signs:** a red board reads 新科昱 燕窩貿易私人有限公司, S.K.Y. Birdnest Trading Pte Ltd; a white blade at the east pier carries a black swift. Both drawn blank.
- **Heights:** eave 8.16-8.44 m, windows 4.9-6.83 m, board 3.23-4.13 m.

### Stop 11: No. 203 (way 454254363)

- **Building:** pale grey, under a deep flat eave: three windows under round vents, and a glass front stacked with bottled water and crates.
- **Signs:** a dark board reads DIVIN WINE. Drawn blank.
- **Heights:** eave 8.3-8.6 m, windows 5.19-7.04 m, board 3.7-4.41 m.
- **Frames:** 8350297/5494 (25 May), with 8348649/2759, whose camera was tilted.

### Stop 12: No. 205, the Lorong 21A corner (way 454254364)

- **Building:** the corner coffeeshop: white, two storeys, under a deep eave with a timber soffit; four windows, two under small metal hoods and one over an air-conditioner; square piers banded in brown, round columns at the splayed corner, maroon awnings over the five-foot way and the coffeeshop's tables behind.
- **Signs:** a yellow board over the east bay reads 阿顺(火炭)炒福建虾面 with its dishes; a red blade at the west pier reads 黃氏雲吞麵 WONG'S WAN TAN MEE; a red vertical board hangs at the corner and a green blade is marked KS 21. All drawn blank.
- **Lorong 21A face:** not covered by a usable frame, so it is left plain for now.
- **Heights:** eave 8.37-8.7 m, windows 4.8-7.09 m, first-floor slab 3.73-4.0 m, awnings 2.73-3.23 m.

Use `?review=sa-183`, `?review=sa-185`, `?review=sa-187`, `?review=sa-189`, `?review=sa-191`, `?review=sa-193`, `?review=sa-195`, `?review=sa-197`, `?review=sa-199`, `?review=sa-201`, `?review=sa-203` and `?review=sa-205`.

## Lorong 17 to Lorong 19

The outlines from No. 147 to No. 159 are skewed: each east party wall slants about 0.18 m inward for every metre back from the front. So the piers, the five-foot way's shell and the shopfronts at the east end of each house stand further in than elsewhere on the walk. Frame 8348649/2748 was tilted (its road lines curve), so Nos. 149-155 are read from 2747 and Nos. 157-159 from 2749.

### Stop 13: No. 147 (way 475918110)

- **Building:** a single-storey eating place set back about 13 m from the avenue's centreline, under a blue corrugated hipped roof. Broad dark canvas awnings slope forward over a forecourt of round tables, with plastic crates stacked at the east end and a white board on the roof.
- **Signs:** a red banner reading 旺德 hangs inside. No sign could be matched to a listing.
- **Modelling:** the front stands well clear of the carriageway, so the awnings are drawn sloping, 3.5 m deep, from 4.3 m at the wall to 2.75 m at their edge. The awnings' depth and the roof's ridge are estimated from oblique frames.

### Stop 14: No. 149 (way 475918111)

- **Building:** the west house of the row, cream under tiled eaves: three brown casement windows with small lights between plain pilasters, a plain frieze.
- **Signs:** a white board on the upper floor reads 謙利企業私人有限公司, KINDLY ENTERPRISES PTE. LTD., 149; a dark red board over the five-foot way repeats the name. Both drawn blank.
- **Heights:** eaves 7.86-8.0 m, windows 5.31-6.89 m, upper board 4.46-5.24 m, ledge 4.07-4.36 m.

### Stop 15: No. 151 (way 682928772)

- **Building:** white under tiled eaves with a room on the roof behind them: three aluminium windows over two air-conditioners, a grey glass shopfront with the plate 151.
- **Signs:** a small dark board reads 天禧 TIENXI. Drawn blank.
- **Heights:** eaves 7.79-7.93 m, windows 5.11-6.71 m.

### Stop 16: No. 153 (way 682928771)

- **Building:** grey-cream under tiled eaves: three aluminium windows between capped pilasters, brown steel grilles in the five-foot way.
- **Signs:** a white board reads 郭德明帆布私人有限公司, QUEK TECK BENG CANVAS PTE LTD, 153 Sims Avenue; a tall white blade of the same firm hangs at the east pier, and a smaller board over the five-foot way repeats the name. All drawn blank.
- **Heights:** eaves 7.5-7.86 m, windows 5.03-6.61 m, upper board 4.26-4.89 m.

### Stop 17: No. 155 (way 682928770)

- **Building:** pale, under tiled eaves: three small windows under panels of pierced vent blocks.
- **Signs:** a white board reads UNISTEEL 友联白钢; a tall UNISTEEL blade hangs at the east pier; a larger white and blue UNISTEEL board over the five-foot way offers new and used kitchen equipment; the plate 155 is on the west pier. All drawn blank.
- **Heights:** eaves 7.43-7.79 m, vent panels 6.21-6.5 m, windows 4.86-5.97 m.

### Stop 18: No. 157 (way 682928769)

- **Building:** white under a deep eave: three windows with a row of transoms above them, a glass shopfront, the plate 157 on the east pier.
- **Signs:** a black board across the upper floor reads FENG DESIGN PTE LTD, with a black FENG DESIGN blade at the east pier. Both drawn blank.
- **Heights:** eave 7.5-8.0 m, windows 5.07-6.26 m, transoms 6.54-6.83 m, board 3.57-5.0 m.

### Stop 19: No. 159, the Lorong 19 corner (way 682928768)

- **Building:** ochre picked out in teal under tiled eaves: two windows either side of an air-conditioner, teal capitals and fascia, a string of prayer flags over the five-foot way and a pink display board on a stand in front.
- **Signs:** a white board lettered SIMS LIGHTING CENTRE in red; a tall dark banner at the corner; the plate 159. Drawn blank.
- **Lorong 19 face:** plain, with the teal fascia carried round.
- **Heights:** eaves 7.86-8.14 m, teal fascia 7.14-7.43 m, windows 4.97-6.17 m, board 3.29-4.11 m.

Use `?review=sa-147`, `?review=sa-149`, `?review=sa-151`, `?review=sa-153`, `?review=sa-155`, `?review=sa-157` and `?review=sa-159`.

## West of Lorong 17

Frames 8348649/2742 and 2743 are solved from five party walls, from No. 135|137 to No. 143|145, with residuals under 0.8° and 0.05°. The road dips by Lorong 17's junction, so these cameras ride about 2.0 m above the five-foot-way floor. Nos. 141 and 143 are twins read in different frames, and No. 143's heights come out about 0.4 m lower than No. 141's; both are kept as read.

### Stop 20: No. 135 (way 439168677)

- **Building:** charcoal, with dark latticed and louvred windows across its upper floor and a large white board hung out from its east side.
- **Signs:** a black board over the five-foot way lettered INTERIOR TIMES in red, over a glass front and a timber panel door. Drawn blank.
- **Footprint:** its west party wall photographs about 1.3 m east of the source one ([open question 85](open-questions.md)). The elevation is laid from its east party wall, with a plain dark strip at the west end.
- **Heights:** eave 8.3-8.6 m, windows 5.1-7.65 m, board 3.0-3.75 m.

### Stop 21: No. 137 (way 439168816)

- **Building:** white trimmed in black: three windows with closed white louvred shutters under stained-glass fanlights, vent strips above, a black balustrade band below; a timber door, a black-framed window and white double doors in the five-foot way.
- **Signs:** none photographed.
- **Heights:** eave 7.83-8.1 m, shutters 5.0-6.55 m, fanlights 6.6-7.15 m, balustrade band 3.85-4.2 m.

### Stop 22: No. 139 (way 439168799)

- **Building:** pink: three windows with green louvred shutters under fanlights, vent strips, a pink dentil band, a glass shopfront hung with lamps and fans, and the plate 139.
- **Signs:** a black board with gold lettering reads 新加坡瓊海同鄉會 QIONGHAI ASSOCIATION (SINGAPORE); over the five-foot way a black board reads MLC MEDIA LIGHTING CONCEPT, Media Aire-con Engineering Pte Ltd; a dark board hangs at the east pier. All drawn blank.
- **Heights:** eave 8.25-8.6 m, shutters 5.0-6.5 m, association board 4.03-4.97 m, shop board 2.75-3.7 m.

### Stops 23 and 24: Nos. 141 and 143 (ways 439168674 and 439168825)

- **Buildings:** white twins: three dark windows under grilled (No. 141) or stained-glass (No. 143) transoms and vent strips, a ledge with a row of small brackets. No. 141 has a grey roller shutter and a green door, with a white board at its east pier (drawn blank); No. 143 a grille door and a roller shutter under a red banner hung with lanterns.
- **Heights:** No. 141 eave 7.75-8.3 m, windows 4.75-6.25 m; No. 143 eave 7.6-7.9 m, windows 4.42-5.75 m.

### Stop 25: No. 145, the Lorong 17 corner (way 439168849)

- **Building:** white framed in teal, with three faces: a short front, a broad splay and a face down the lane, each with a large teal-framed window under a teal vent strip, teal columns at each turn, a teal band over the five-foot way, and printed DCA power-tool boards over the ground floor.
- **Signs:** a red vertical board at the corner reads 南洋五金私人有限公司 NANYANG HARDWARE PTE LTD with #145; on the splay an orange board reads NIPPON PAINT 南洋 NANYANG HARDWARE PTE LTD. Drawn blank.
- **Footprint:** the photographed front runs about 3.3 m before the corner turns, against the source front's 7.26 m ([open question 85](open-questions.md)). For now the front's elevation is laid at its photographed positions and the splay's window and board are drawn flat on the rest of the source front.
- **Heights:** eave 7.25-7.6 m, windows 4.0-6.25 m, teal band 3.08-3.42 m.

Use `?review=sa-135`, `?review=sa-137`, `?review=sa-139`, `?review=sa-141`, `?review=sa-143` and `?review=sa-145`.

## Lorong 19 to Lorong 21

The four buildings here stand free of party walls, behind gardens, a forecourt and a car park. No frame's position could be solved from walls: the nearest walls are 40-65 m away and too oblique to tell apart. Triangulating their corners from frames 2755 and 2756, whose positions are solved, also failed, since they stand only 13 m apart and the same corner could not be matched with confidence in both. So the four are modelled as **photographed massing** on their source outlines, as the east ring's massing was: colours, storeys, roofs, the colonnade and the verandah as photographed, with details placed by estimate. Heights carry about ±1.5 m, and ±4 m for No. 165.

### Stop 26: No. 165 (way 682928722)

- **Building:** a tall block about 23 m back from the avenue, behind No. 167: grey lower storeys, a broad red band and white upper storeys, with balconies stacked at its east end. About nine storeys and 30 m high.
- **Naming:** the source way is named Harvest Care Centre, but no sign could be read and listings could not be checked, so no name is given.
- **Review start:** 18 m in front of it, on the avenue's pavement, looking up at 28°.

### Stop 27: No. 167 (way 682937224)

- **Building:** a single-storey ochre bungalow behind a garden fence: a red tiled hipped roof with a gable to the avenue, white louvred shutters, an arched window, white columns and a white balustrade along a verandah (modelled as a 2.2 m verandah).
- **Signs:** a white board at its gate could not be read.

### Stop 28: No. 169 (way 454254365)

- **Building:** a small white hut under a dark gabled roof, its lower walls faced in blue tiles, with glass doors under a white board reading 藤原 豆腐 炸店 and Japanese notices in its windows. A car park runs back behind it.
- **Footprint:** the hut is narrower than the source outline, which also takes in part of the car park. It is modelled over the whole outline.

### Stop 29: No. 177, the Lorong 21 corner (way 454254366)

- **Building:** four storeys behind a clipped garden: a white colonnade on the ground floor, beige-pink upper storeys with rows of small windows, a glazed blue stair tower near the west end, and a cream top storey lettered 日蓮正宗佛教會(新加坡) NICHIREN SHOSHU BUDDHIST ASSOCIATION (SINGAPORE), with a pergola on the roof and the plate 177 at the corner. The lettering is drawn as a blank band.
- **Footprint:** from frame 2755 its corner photographs about 7° west of the source corner, so the outline may run long at the corner. It is kept until the corner can be measured.
- **Heights:** about 16 m to the parapet, the colonnade to about 4.5 m.

Use `?review=sa-165`, `?review=sa-167`, `?review=sa-169` and `?review=sa-177`.
