# Lorong 13 Geylang street module

Research and implementation from **10 October 2026**, when the project owner asked to finish Lorong 13 first (open question 19). This brief covers every Lorong 13 place in `src/lorong-13-layout.mjs`. Places modelled earlier in their own modules (Bar @ Lorong 13, K Group, Hong Ye Chen, Mister Contracts, Foo Hui, Siaw Lim, Chong Min, Muhammadiyah, Hainan Lim, Plus Mobile, Sui Yuan Ju and Gems Ville) keep their own briefs.

Each place is a measured elevation on the shared simple-house module: u runs along the frontage, out towards the street, and heights are above the five-foot-way floor. Named places meet the listing-plus-signage bar. Unnamed places (open question 18) carry no business name and leave their boards blank.

## Method

- **Panoramas:** the April 2024 drive covers Lorong 13 every 10 m. Older captures at the same spots go back to 2008 and are used where 2024 is obscured.
- **Rectification:** frames are rectified onto the façade plane with a 1 m grid. Widths come from party lines triangulated in two or three panoramas; heights come from the most square-on frame.
- **Depth:** the recorded panorama positions can be 1.5–3 m off on this street. Depth is therefore taken from triangulation, two-panorama agreement and the façade base in level frames, never from the recorded position alone. Offsets under about 2 m are kept on the source front. Gradient correlation between panoramas drifts to the edge of its search range here, as it did in open question 16, and is not used.
- **Check:** render-and-compare from each solved pose.

## West row north of Hainan Lim: depth and party lines

Nos. 21–29, the five source ways between Hainan Lim and Sims Avenue, share one straight source front line. The April 2024 frames place the photographed façades about **2.6 m in front of** it:

- **Triangulation:** Thirteen BBQ's party lines, from three panoramas, give 2.2–2.9 m.
- **Ground line:** the façade base in level frames from `TkVx…` and `I_hh…` gives 2.7–2.8 m.
- **Side return:** the four-storey Nos. 21/23 block shows a lit side return beyond Hainan Lim's façade.
- **Sims Avenue:** a June 2024 Sims Avenue frame, from a separate drive, fits Thirteen BBQ's corner better at the forward position.

The same April panorama `I_hh…` also gives a façade-to-façade street width of about 14.8 m, against 13.8 m between the two source fronts. A second level pair at `8k_B…` gives about 2 m less than the source, so this check is noisy. Even so, a panorama position error of about 2.7 m, as earlier sessions found at Bar @ Lorong 13 and the mosque, explains the forward reading as well as a real offset does. Under that reading, Hainan Lim's set-back face and Muhammadiyah's 4 m drop-off account for the side return.

The models keep the source front. Measurements are taken on frames rectified at the photographed depth, which is equivalent to moving the camera onto the source front. Widths and heights therefore do not depend on which explanation is right. Render-and-compare frames are taken with the camera moved 2.6 m towards the façade.

On a single rectified frame, the party line between No. 25 and Nos. 21/23 appeared about 1.8–2.0 m south of the source line. Two-panorama triangulation later put it only **0.6 m** south (s 18.6–19.1 against the source's 18.3), and the March 2022 frame agrees with the source to within about 0.5 m. The source split is therefore kept (open question 20), as at Foo Hui.

## Thirteen BBQ Bar 十三烤吧, 27 Lorong 13

- **Identity:** Google Maps lists Thirteen BBQ Bar at 27 Lor 13 Geylang, Singapore 388670, open until 2 am in October 2026. Its point lies in unnumbered way [1223454595](https://www.openstreetmap.org/way/1223454595). [Seth Lui](https://sethlui.com/?p=190671) reported its opening on 3 August 2023. In March 2022 the frontage carried a black THIR13EN BISTRO & BAR board.
- **Width:** both party lines, triangulated from `TkVx…`, `ChoF…` and `io0F…`, give a **6.1 m** frontage on the source way, shifted no more than 0.4 m. This resolves the 9 October width lock, which came from a single panorama with an unknown camera distance.
- **Elevation:** three storeys, read on `TkVx…` rectified at the photographed depth:
  - a cream middle storey with a stained hood at about 7 m;
  - a blue top storey under a deep hood at about 10.5 m;
  - each storey with two windows under louvred vents;
  - a parapet stepping down northwards from 11.74 to 11.23 m.
- **Ground floor:** the red board (3.42–4.57 m), the black BISTRO & BAR awning and the red blade sign at the north end.
- **Roof:** from Sims Avenue, the blue north gable rises above BUILDERSmart and peaks about **15.9 m** up, some 7 m behind the front. It is modelled as a gable roof with its ridge parallel to the street.
- **Check:** render-and-compare from the corrected `TkVx…` pose puts the windows within a few pixels of the photograph. The awning depth was reduced from 1.9 m to 1.5 m after the first render.

## BUILDERSmart 魯班行, 29 Lorong 13 (the Sims Avenue corner)

- **Identity:** Google Maps lists BUILDERSmart, a hardware store, at 29 Lor 13 Geylang, Singapore 388672 (buildersmart.com.sg), with current hours. Its point lies in unnumbered way [1223454594](https://www.openstreetmap.org/way/1223454594).
- **Signage:** June 2024 Sims Avenue frames show a cream BUILDERSmart board, a white tool-icon panel and three small windows on a green corrugated loft. Below are green awnings lettered 魯班行 BUILDERSmart and www.buildersmart.com.sg. The Lorong 13 awning repeats the web address.
- **Earlier lock:** this settles the 10 October BUILDERSmart lock. The boards at No. 100 Sims Avenue are a second frontage. The listed number matches this corner, next to Thirteen BBQ at No. 27.
- **Massing:** a single-storey shed with walls to about 3.6 m and a low hipped corrugated roof. The loft box sits over it:
  - **Setback and length:** parallax between `m3nF…` and `6iJp…` puts it about 1.2–1.8 m behind the Sims face, running about 15 m from the Lorong 13 face.
  - **Height:** parallax gives 7.7–8.2 m; a render from the June 2024 `6rAI…` pose matches about 7 m. It is modelled at **7.3 m**.
- **Front:** the 19.4 m Sims Avenue face is the modelled front. The 6.1 m Lorong 13 face has its own opening and awning.

## Teck Hoe Airconditioning Parts, 11 Lorong 13 (dated exterior)

- **Signage and conflict:** April 2024 shows TECK HOE AIRCONDITIONING PARTS PTE LTD lettered on the front wall and door plate 11, on source way [1223773759](https://www.openstreetmap.org/way/1223773759), which is tagged No. 11. Google Maps now lists the company at 8 Lor 15 Geylang, with a branch at 54 Dunlop Street.
- **Decision:** under open question 12, the signed house is modelled as a dated exterior. The conflict is recorded, and no current occupancy is claimed.
- **Depth:** rectifications from `J1TC…`, `8U4Z…` and `HaY-…` cross over with the front wall about 1.4 m in front of the source front. The source front is kept.
- **Plan lock resolved:** the main two-storey block (about 4 m) and a lower south wing (about 2.3 m) share one front line. An open yard takes the south end, and a metal canopy covers the north passage.
- **Roof:** from the street, the hipped roof's apex shows above the eaves. That puts the ridge at about **7.8 m**, against eaves at about 5.2 m. The ventilated gablet is simplified away.
- **Yard:** the ground line in a level frame puts the yard wall about 2.2 m in front of the house, about 1.75 m high under a mesh fence to about 2.7 m. The gate is teal.

## No. 15D/E Lorong 13 (unnamed)

- **Identity:** unnumbered way [1223773761](https://www.openstreetmap.org/way/1223773761) lies between Muhammadiyah (No. 17) and the Chong Min house (plate 15-C, way tagged 15B). Its door plates read 15E and 15D. Hiap Lian Friendly Association is listed at 15D, but no association sign was seen, so the house is unnamed.
- **Depth:** the two panoramas either side (`D4Uk…` and `8k_B…`) cross over about 0.9 m in front of the source front.
- **Elevation:** two storeys under a deep hood (about 7.1 m) and a plain parapet (8.2 m). Upstairs, a small window sits in a moulded surround under a louvred vent, beside a wide four-pane window with a transom. Below are a timber door, the grilled 15E door and two roller shutters.

## No. 9 Lorong 13, southern house (unnamed)

- **Identity:** the southern of the two ways tagged No. 9 ([1223773756](https://www.openstreetmap.org/way/1223773756)). Its five-foot way holds a free-standing MC Multi Skills banner and a vending machine, but no fixed sign, so the house is unnamed.
- **Elevation:** the row elevation measured at No. 7, with the bays read on a square-on `uh9Y…` frame at the row's 0.5 m forward depth: shuttered windows either side of a full-height French window, and tile panels under the outer windows. A white grille closes the five-foot way, as at the Mister Contracts house.

## No. 3 Lorong 13 (unnamed)

- **Identity:** way [1223773753](https://www.openstreetmap.org/way/1223773753), tagged No. 3, with plate 3 over its glass door. River Ash Bakery is listed at No. 3, but no bakery sign appears in any capture from 2018 to April 2024 (the 10 October lock stands), so the house is unnamed.
- **Elevation:** the row elevation, with three tall windows with fretwork transoms (the middle one full height) and tile panels under the outer two. The bays were read on a square-on `f-IH…` frame.
- **Ground floor:** a maroon awning over a roller shutter, the glass door and a timber door, with two condensers.
- **Check:** render-and-compare moved the awning's south end in and made it shallower.

## The single-storey east row, Nos. 20–28

- **Shared form:** Plus Mobile (No. 22) measured the row's form, and its walls, canopy and roof now live in a shared single-row module, with unchanged output:
  - a short tiled front slope over a dark rear roof;
  - a steel lattice canopy over a tiled walkway;
  - salmon party-wall copings on every second party line, at 28|26, 24|22 (drawn by Plus Mobile) and the south end of No. 20.
- **Depth and spacing:** frames rectified about **1 m behind** the source front, where three April 2024 panoramas agree, put every party line within about 0.3 m of the source subdivision.
- **Gap:** the source's gap between Nos. 20 and 18 is an open yard with umbrellas, with no building.
- **Walkway:** render-and-compare shows the real walkway raised about 0.6 m above the road. The shared base keeps it at road level, so fronts sit about 0.6 m low throughout the row, Plus Mobile included.

### Wunderfolks, 26 Lorong 13 (dated exterior)

- **Identity:** [Time Out (27 September 2023)](https://www.timeout.com/singapore/restaurants/wunderfolks) gives Wunderfolks, a handmade-tart bakery, at 26 Lor 13 Geylang, Singapore 388669, open daily for collection. April 2024 shows its blue WUNDERFOLKS board over the blue-framed door on the way tagged No. 26.
- **Current use:** Google Maps now lists Wunderfolks only at 1 Kaki Bukit View, so the model claims nothing about current use. This settles the 9 October WUNDERFOLKS lock in the same way as Sik Wai Sin.

### Nos. 28, 24 and 20 (unnamed)

- **No. 28:** plate 28 between a blue-framed door and a display window. The Wunderfolks posters in its glazing are blank panels: the bakery published No. 26, and Ganh Xua (listed at No. 28, temporarily closed) has no sign.
- **No. 24:** a roller shutter and a key-cutting booth with a generic 配锁匙 / DUPLICATING sign. Bookland Library Services is listed here, but has no sign.
- **No. 20:** two roller shutters, with plate 20 and a louvred panel.

## Nos. 18 and 16 (unnamed)

- **Building:** one two-storey house over both ways. Its upper storey stands about **1.2 m behind** the ground-floor front, where three panoramas agree, under one continuous weathered tiled roof with eaves at about 6.3 m.
- **Front strip:** a tiled lean-to covers No. 16's ground floor and the south end of No. 18. A white steel canopy shelters the rest of No. 18's front, over a dark recessed ground floor.
- **No. 16:** a glass sliding door, a dark doorway and a yellow barber shopfront under grey-blue and pink awnings. The listed barber has no trading name, so the house is unnamed.
- **Modelling:** a new set-back option builds the upper block on the source outline with its front moved back, and the strip in front on the source frame. The roof ridge, about 4 m back, is estimated.
- **Gap to the north:** the yard between No. 20 and No. 18, a gap in the source, has no building.

## No. 12A (unnamed)

- **Building:** a five-storey apartment block whose flat roof fills the source outline on satellite imagery.
- **Front:** a white wall with a slatted brown gate and a planted bed stands on the source front, with a car porch behind it.
- **Upper storeys:** they stand about **2 m behind** the front wall, where `J1TC…` and `8U4Z…` agree. Grilled first-floor windows sit under a tiled eave band, then two storeys of balconies with white railings under striped awnings. A deep parapet tops out at about 14.4 m, with a rooftop railing above.
- **Identity:** Brilliant Electronics is listed at 14A, but has no sign, so the block is unnamed. Heights carry several per cent of uncertainty.

## No. 96 Sims Avenue, the east corner of Lorong 13 (unnamed)

- **Building:** way [454254303](https://www.openstreetmap.org/way/454254303), tagged 96 Sims Avenue, three levels. It is a white two-storey Art Deco corner block. Its long face is on Lorong 13: a five-bay arcade of fluted piers with stained bases, closed roller shutters, and seven windows under thin concrete hoods and louvred vents.
- **Dates:**
  - **November 2022:** the corner traded as Gu Thai House under Union Energy Group awnings.
  - **April 2024:** the Lorong 13 face is shuttered.
  - **June 2024:** Sims Avenue frames show the whole block wrapped in hoarding and sound barriers.
- **Identity:** the April 2024 state is modelled, with no name.
- **Depth:** triangulating the south pier from `TkVx…` and `I_hh…` puts the arcade about **2 m in front of** the source Lorong 13 face. Three panoramas agree at that depth. The source outline is kept, and positions are scaled from the photographed 19.6 m face onto the source's 20.98 m.
- **Heights:** read on the square-on `TkVx…` frame, with the raised walkway (about 0.7 m) taken off. They carry about ±0.3 m.
- **Sims Avenue face:** the short face follows the November 2022 capture, with its signs omitted.

## No. 269 Geylang Road, the west corner of Lorong 13 (unnamed)

- **Identity:** unnumbered way [454254219](https://www.openstreetmap.org/way/454254219) counts as No. 269. Hong Wah Coffee Shop and Geylang Food Corner are listed there, but the 2024 frontage carries Khim Seng gas awnings, a 麻辣空间 board and the closed BN Food Palace's board. With listings and signs in conflict, it is unnamed, its boards are blank and its supplier awnings plain.
- **Building:** a conserved two-storey corner shophouse with:
  - arched windows with fanlights and green louvred shutters, in pairs between Corinthian pilasters;
  - a moulded frieze;
  - a hipped tiled roof with a corner gablet;
  - a coffeeshop under five-foot ways on both faces, behind columns with red-and-white striped bases.
- **Measurement:** heights come from the square-on `KZ8g…` frame. Three panoramas and the satellite put the face 2–4 m in front of the source line, so the frame was scaled about the camera until the eaves sit at about 8.4 m. Positions are measured from the corner and carry about ±0.5 m.
- **Continuation:** the photographed building continues about 13.5 m north beyond the source way, as a two-storey bay and then a single-storey wing. That needs an authored footprint, so it is open question 21.

## No. 25 (unnamed)

- **Footprint:** source way 1223454596.
- **Dating:** in April 2024 the house was wrapped in scaffolding and netting, so its **March 2022** exterior (`Pux6…`) is modelled.
- **Elevation:** a cream three-storey house with two windows on each upper floor under deep concrete hoods, small relief panels, louvred vents and a stepped parapet. Below are a green 乐王子 歌舞厅 board and a Le Prince lounge with an arched doorway.
- **Identity:** Le Prince is listed at 27 Lor 13, not here, and the 2024 use is unknown, so it is unnamed and the boards are blank.
- **Heights:** the 2022 frame was scaled so that its parapet matches Thirteen BBQ's measured 11.5 m, which it equals in the photograph. The same scale gives the Nos. 21/23 block about 13.9 m, matching the 2024 reading of about 14 m.

## Nos. 21 and 23 (unnamed)

- **Footprints:** source ways 1223454598 and 1223454597. One elevation is laid out across both from Hainan Lim's line and sliced into each way. The last 1.7 m of No. 23's way, where the photographed block ends sooner, is plain wall.
- **Elevation:** two four-storey white houses sharing a blue stair tower with stacked hopper windows. Each upper floor has two windows under blue concrete hoods and louvred vents, and the north house's floors sit about 0.4 m above the south house's.
- **Identity:** the south house has a Chinese hall signed 仁濟堂, and a door placard reads 21/23 GEYLANG LORONG 13. No listing for 仁濟堂 was found, and Yong Li Electrical Services (listed at 21B) has no sign, so the block is unnamed.

## Still open on Lorong 13

- **No. 269 continuation:** the coffeeshop's two-storey bay and single-storey wing north of its source way (open question 21).
- **Narrow building by Shi Hao:** the four-storey building between the back lane and the Shi Hao corner (open question 22).

Every other footprint on both sides of Lorong 13 is now modelled.

## Omitted and estimated

- **Omitted:** stock, pallets, vehicles, menus, furniture, posters, banners, vending machines, plants and interiors.
- **Estimated:** five-foot-way depths, awning depths, the loft depth and the roof forms.

## Review

Use `?review=thirteen-bbq`, `?review=buildersmart`, `?review=teck-hoe`, `?review=l13-15de`, `?review=l13-9s`, `?review=l13-3`, `?review=wunderfolks`, `?review=l13-28`, `?review=l13-24`, `?review=l13-20`, `?review=l13-18`, `?review=l13-16`, `?review=l13-12a`, `?review=sims-96` and `?review=gr-269-corner`.
