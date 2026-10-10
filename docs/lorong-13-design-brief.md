# Lorong 13 Geylang street module

Research and implementation from **10 October 2026**, when the project owner asked to finish Lorong 13 first (open question 19). This brief covers every Lorong 13 place in `src/lorong-13-layout.mjs`. Places modelled earlier in their own modules (Bar @ Lorong 13, K Group, Hong Ye Chen, Mister Contracts, Foo Hui, Siaw Lim, Chong Min, Muhammadiyah, Hainan Lim, Plus Mobile, Sui Yuan Ju and Gems Ville) keep their own briefs.

Each place is a measured elevation on the shared simple-house module: u runs along the frontage, out towards the street, and heights are above the five-foot-way floor. Named places meet the listing-plus-signage bar. Unnamed places (open question 18) carry no business name and leave their boards blank.

## Method

- **Panoramas:** the April 2024 drive covers Lorong 13 every 10 m. Older captures at the same spots go back to 2008 and are used where 2024 is obscured.
- **Rectification:** frames are rectified onto the façade plane with a 1 m grid. Widths come from party lines triangulated in two or three panoramas; heights come from the most square-on frame.
- **Depth:** the recorded panorama positions can be 1.5–3 m off on this street. Depth is therefore taken from triangulation and from the façade base in level frames, never from the recorded position alone. Gradient correlation between panoramas drifts to the edge of its search range here, as it did in open question 16, and is not used.
- **Check:** render-and-compare from each solved pose.

## West row north of Hainan Lim: a forward offset

Nos. 21–29, the five source ways between Hainan Lim and Sims Avenue, share one straight source front line. Three measurements put the photographed façades about **2.6 m in front of** it:

- **Triangulation:** Thirteen BBQ's party lines, from three panoramas, give 2.2–2.9 m.
- **Ground line:** the façade base in level frames from `TkVx…` and `I_hh…` gives 2.7–2.8 m. The same method agrees with the recorded positions at Hainan Lim, as its own brief found.
- **Side return:** the four-storey Nos. 21/23 block shows a lit side return beyond Hainan Lim's façade.

A June 2024 Sims Avenue panorama, from a separate drive, puts Thirteen BBQ's parapet at 11.5 m only with the façade at the forward position. The source line is therefore about 2.6 m behind the buildings, rather than the drive's positions being off.

The models keep the source front (open question 20). Heights and widths were read on frames rectified at the photographed depth. Render-and-compare frames are taken with the camera moved 2.6 m towards the façade.

The same measurements show that the party line between No. 25 and Nos. 21/23 falls about 1.8 m south of the source line. No. 25 measures about 8.0 m against the source's 6.1 m, and Nos. 21/23 together measure about 12.4 m against 14.1 m. Those three ways wait for open question 20.

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

## Omitted and estimated

- **Omitted:** stock, pallets, vehicles, menus, furniture, posters and interiors.
- **Estimated:** five-foot-way depths, awning depths, the loft depth and the roof forms.

## Review

Use `?review=thirteen-bbq` and `?review=buildersmart`.
