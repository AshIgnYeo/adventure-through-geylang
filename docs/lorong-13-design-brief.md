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

The party line between No. 25 and Nos. 21/23 falls about 1.8 m south of the source line. No. 25 measures about 8.0 m against the source's 6.1 m, and Nos. 21/23 together measure about 12.4 m against 14.1 m. Those three ways wait for open question 20.

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

## Omitted and estimated

- **Omitted:** stock, pallets, vehicles, menus, furniture, posters, banners, vending machines, plants and interiors.
- **Estimated:** five-foot-way depths, awning depths, the loft depth and the roof forms.

## Review

Use `?review=thirteen-bbq`, `?review=buildersmart`, `?review=teck-hoe`, `?review=l13-15de`, `?review=l13-9s` and `?review=l13-3`.
