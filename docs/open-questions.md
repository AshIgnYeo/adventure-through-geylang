# Open questions

Decisions that only the project owner can make, collected so building can continue around them. Each entry names what it would unlock and where the evidence is recorded. The [building queue](lorong-11-building-queue.md) has the full notes. When a question is settled, record the answer and the date here, then move the entry to **Settled**.

Started: 10 October 2026.

## Open

Logged during the Lorong 17 walk (open question 35), for the owner to answer when the walk is done.

36. **Lorong 17, way 454254236 (Feng Shang Hair Salon): author its footprint on the photographed front?**
    - **Evidence:** two June 2024 panoramas (`h2GM…`, `qC7t…`) triangulate the four upper windows and the north party line. All five agree on a front **1.4–1.7 m in front of** the source edge. On that plane the building photographs **12.5 m** wide against the 9.04 m source edge: from 1.56 m south of the source corner to 11.35 m north of it, where it meets the south wall of way 454254237. The source map leaves a 1.3 m gap between the two ways.
    - **What happens now:** the elevation is squeezed proportionally onto the source edge (×0.72), so the 1.45 m windows draw about 1.05 m wide, and the gap stays open. The salon's listing point lies 1.3 m in front of the source front, inside the photographed front; it is named under open question 12.
    - **Recommendation:** yes. Author the footprint from the triangulated corners, with the front 1.5 m forward and the north wall on way 454254237's south wall, and lay the elevation at its photographed widths.
    - **Unlocks:** true window and bay widths, the closed gap, and the listing point inside the way.

37. **Lorong 17, way 454254280 (Nos. 37–41): split it into its three photographed bays, and name the middle bay's upper floors the Singapore Rattan Industry Association?**
    - **Evidence:** June 2024 Street View shows one three-storey building of three finned bays.
      - **Middle bay:** a white board reading 新加坡籐業公會 S'PORE RATTAN INDUSTRY ASSN. between its first-floor windows.
      - **Measurement:** two pairs of panoramas triangulate the ends and fins 0.2–1.0 m behind the source edge. The building is 17.4 m long, from 2.7 m south of the way's corner, with bays of about **5.4, 6.1 and 5.9 m**. The fins fall at about 5.1 m and 11.6 m along the 14.62 m source edge, laid proportionally.
    - **Listing:** Google Maps lists Singapore Rattan Industry Assoc. with its point inside this way.
      - The listed address is **39 Sims Cl, Singapore 388562**, but the postal code belongs to this stretch of Lorong 17, between No. 31 (388555) and No. 35. So the association is at **No. 39**, the middle bay.
      - Open question 12 allows a clearly signed occupant when published addresses disagree.
    - **What happens now:** the building is modelled as one unnamed place on the whole way, with every board blank.
    - **Recommendation:** yes. Split the way at the two fins, as under questions 30 and 31, and name the middle bay's upper floors after the board, with no claim about its ground floor.
    - **Unlocks:** one named association. The Ah Qi Trading & Construction board on the ground floor stays blank either way: the company is listed only at Woodlands and Lim Chu Kang.

## Settled

### Seventh batch, answered 12 October 2026

The project owner chose Lorong 17 as the next street and accepted the recommended option for each part of question 35.

| # | Decision | What follows |
| --- | --- | --- |
| 35 | **Yes.** Model Lorong 17 between Geylang Road and Sims Avenue, one building at a time in street order | The lane, its buildings and its two junctions join the map; the walk is recorded in the [Lorong 17 brief](lorong-17-brief.md) |

The original wording of question 35 is kept here:

35. **Lorong 17, Geylang Road to Sims Avenue: how should the street be built?**
    - **Order:** start at the Geylang Road end, go north up the west side to Sims Avenue, then come back south down the east side. Each stop is one photographed building, measured before the next is started. Doubts go into this log and the walk continues.
    - **Scope:** stop at Sims Avenue. The part of Lorong 17 north of Sims Avenue waits for a later pass.
    - **Corners:** take in the corner buildings at both ends and stop there. The Geylang Road houses east of the corner, and Sims Avenue Nos. 136 onward, wait for a later pass.
    - **Map:** add only Lorong 17's own buildings and road ways, not everything a wider rectangle would take in (about ten more, mostly the backs of Lorong 19). The lane and its two junctions become walkable corridors beyond the rectangle.
    - **Unnamed buildings:** labelled by their Google Maps address and modelled from the photographed façade, with signboards drawn but their lettering left blank, as elsewhere.
    - **Naming:** unchanged. A business is named only when Google Maps lists it at that address and its sign shows in the photograph.
    - **Working:** one commit per building on the `feature/lorong-17` branch, each written up in the Lorong 17 brief.

### Sixth batch, answered 11 October 2026

The project owner chose the recommended option.

| # | Decision | What follows |
| --- | --- | --- |
| 34 | **Yes.** Move the Lian Seng and Vietnam Unisex models one house west | Lian Seng is named on `gr-229-west` and Vietnam Unisex's elevation moves onto `gr-229`. A closer look showed that the freed `gr-231` strip holds the west part of the white Wat Dhammasatis building, not a separate durian house, so it is modelled as that, unnamed. The Wat Dhammasatis board stays on its model, about 2.6 m east of its photographed position |

The original wording of question 34 is kept here:

34. **Geylang Road Nos. 229–231: move the Lian Seng and Vietnam Unisex models one house west, onto their photographed houses?**
    - **Evidence:** the question 28 triangulation also fixes the houses east of No. 227, from the same June 2024 drive. That drive puts both the Lorong 7 and Lorong 9 corners on their source corners, so its positions are not shifted. The photographed houses fall as follows, measured from the Lorong 7 corner:

      | House | Photographed | Strip it is modelled on now |
      | --- | --- | --- |
      | Lian Seng (No. 229) | 29.35–34.7 m | `gr-229`, 34.2–39.6 m |
      | Vietnam Unisex Concept (No. 231) | 34.7–40.0 m | `gr-231`, 39.6–43.9 m |
      | Two-storey house with the Durian & Fruits Experience Centre's vertical board | 40.0–44 m | none |
      | Wat Dhammasatis building (No. 233) | 44–50 m | `gr-233`, 43.9–50.0 m (correct) |

      The earlier split explained the gap as a 4 m drive error, but the two corners rule that out.
    - **What happens now:** the strip `gr-229-west` (29.35–34.2 m), cut off by question 28, carries Lian Seng's photographed house with its board blank. The named Lian Seng model still stands one house east, where Vietnam Unisex is.
    - **Recommendation:** yes. Move the Lian Seng identity and board onto `gr-229-west`, move the Vietnam Unisex elevation onto `gr-229`, and model the two-storey durian house on `gr-231`, unnamed unless a listing point and sign agree. The existing strip lines are within 0.5 m of the photographed lines, so no new geometry is needed.
    - **Unlocks:** the correct house order from Lorong 7 to Lorong 9.

### Fifth batch, answered 11 October 2026

The project owner chose the recommended option for each.

| # | Decision | What follows |
| --- | --- | --- |
| 28 | **Yes.** Re-cut Geylang Road Nos. 217–229 at the triangulated party lines | Re-cut from the Lorong 7 corner pier; Nos. 223–227 moved onto their photographed houses; Gong He Guan named at No. 217 |
| 29 | **Yes.** Re-split the ChongQingXiaoMian strip at 11.0 m, and move the row east of Lorong 12 north | The grey house gets its own strip; the row's front moves 4.8 m north if it clears Geylang Road's carriageway, and otherwise stays on the source front with the offset recorded |
| 30 | **Yes.** Split way 454438326 into its three hotel blocks | Split at 13.3 m and 38.5 m as a labelled estimate; D'Nova Hotel and JXIN HOTEL named; the middle block stays unnamed |
| 31 | **Yes.** Split way 454438320 at the tower/hotel line, and name the associations in 454438319 | Hotel 81 Cherry named on the hotel half; the Singapore Master Tailors' Association and the Chinese Eating House Owners' Association named as upper-floor premises |
| 32 | **Yes.** Name the engineering merchants' association and Crystal Mansions from their signs | Pin offsets recorded in the evidence |
| 33 | **Yes.** Name Bamboo Lounge on No. 128 from its sign | Pin offset recorded in the evidence |

The original wording of questions 28–33 is kept here:

33. **Sims Avenue No. 128: name Bamboo Lounge from its sign when the listing point falls next door?**
    - **Evidence:** in June 2024 the black neon board reading Bamboo LOUNGE hangs over three arched openings on No. 128 (way 682928765). Google Maps lists Bamboo Lounge, a bar, at 128 Sims Ave, but its point lies inside No. 126 (way 682928764). That way is the pale-blue house next door, about 3 m out at this row's known registration error.
    - **Current rule:** a listing point must lie inside the way, so No. 128 is unnamed.
    - **Recommendation:** yes. The address and the sign agree on No. 128, and the point's offset matches the row's measured 3 m shift.
    - **Unlocks:** one named bar.

32. **Lorongs 6 and 8: name two buildings whose listing points fall just outside their ways?**
    - **Singapore Engineering Merchants' Association:** listed at 11A Lor 8 Geylang. Its point lies in Lorong 8, 3 m west of the source front of way 454438338. June 2024 Street View shows its lettering 新加坡機器廠商公會 on the lowest balcony and 機商大廈 on the awnings of the cream block across ways 1223401727, 1223401726 and 454438338.
    - **Crystal Mansions:** listed at 3 Lor 6 Geylang. Its point lies 0.5 m outside way 454274483 (tagged No. 3). The name and number are lettered on the block's boundary wall.
    - **Current rule:** a listing point must lie inside the way, so both blocks are modelled unnamed and their lettering is not drawn.
    - **Recommendation:** yes. Name the association as the occupant of the cream block's balcony section (way 454438338), where its lettering is, and name Crystal Mansions on its way, with the point offsets recorded.
    - **Unlocks:** two named places.

31. **Lorong 12 east side: split the shared ways 454438320 and 454438319?**
    - **Way 454438320:** it carries a white nine-storey apartment tower on its north 10.5 m and a lavender-blue four-storey hotel signed HOTEL 81 CHERRY on its south 10.3 m. Hotel 81 - Cherry is listed, with its point in the south half.
    - **Way 454438319:** it carries a cream three-storey pair that photographs 15 m wide against the 9 m way. The pair shows boards of the Singapore Master Tailors' Association (listed at 3C Lor 12) and the Chinese Eating House Owners' Association (listed at 10C Lor 12), with both points in the way. The unit addresses suggest upper-floor premises.
    - **Recommendation:** yes for 454438320. Split it at the measured tower/hotel line and name Hotel 81 Cherry on the hotel half. For 454438319, name the pair only as upper-floor association premises, on the Canton Wong precedent, once a re-spacing settles its 15 m width.
    - **Unlocks:** one named hotel, and possibly two associations.

30. **Lorong 10 east side: split way 454438326 into its three hotel blocks?**
    - **Evidence:** one 51 m source way carries three separate buildings, photographed in June 2024 and measured along a shared plane:
      - a taupe six-storey block signed D'Nova Hotel, at 0.4–13.3 m from the north corner;
      - a seven-storey block signed ibis budget SAPPHIRE, at 13.3–38.5 m;
      - a white eight-storey block signed 嘉鑫酒店 JXIN HOTEL, at 38.5–51.8 m.
    - **Listings:** D'Nova Hotel@Kallang and JXIN HOTEL are listed with points inside the way. The middle block's point is listed as ibis budget Singapore Tulip, which conflicts with its sign.
    - **Recommendation:** yes. Split the way square to its front at 13.3 m and 38.5 m, scaled to the source front, as a labelled estimate. Name D'Nova Hotel and JXIN HOTEL, and leave the middle block unnamed until its name is settled.
    - **Unlocks:** two named hotels, and the correct roof heights per block, which are now drawn as blocks inside one shell.

29. **Geylang Road south side, east of Lorong 12: move the row's front 4.8 m north and re-split the ChongQingXiaoMian strip?**
    - **Row depth:** party lines triangulated from two June 2024 panoramas (`-tVu…`, `Y1Sv…`) put the façades of the grey, green, yellow and white shophouses about 4.8 m north of the source front of block 454438318. That is towards Geylang Road. A third panorama from a different drive (`GoN_…`) agrees to within 0.1 m. The same drive measures the north-side façades (No. 291) onto their source front, so this is not a pose error. Satellite roofs also run north of the source outline here.
    - **Corner strip:** the grey house with the red 串 board spans about 11.0–16.7 m along the front from Lorong 12, inside the east part of `gr-258`. The earlier split gave all 16.8 m to the ChongQingXiaoMian building, whose Geylang Road face stands near the source front. As a result, the model draws a plain side wall where the grey house stands.
    - **What happens now:** `gr-260-east` is modelled on the source front, with the bays in the right order. The grey house is missing, and the ChongQingXiaoMian model is unchanged.
    - **Recommendation:** yes. Re-split `gr-258` at 11.0 m, giving the grey house its own unnamed strip. Author the row's footprints with their front 4.8 m north, after checking clearance from Geylang Road's modelled carriageway; if the clearance fails, keep the source front and record the offset.
    - **Unlocks:** the missing house and the correct street line east of Lorong 12.

28. **Geylang Road Nos. 217–229 (north side, between Lorong 7 and Lian Seng): re-space at the triangulated party lines?**
    - **Evidence:** party lines triangulated from two June 2024 panoramas (`i-vtfVn07QFERJ6yuTUUtA`, `U23wEgPybSSNqmMh7jNGZQ`) put the Lorong 7 corner pier on the source front, 1.6 m short of the source corner. Going east, the houses measure 4.6 m (Gong He Guan, No. 217), 4.5 m (No. 219), 4.4 m (No. 221), and then the house with the red Geylang Lor 9 Fresh Frog Porridge board.
    - **Problem:** that board, which identified No. 223 in the earlier split, falls in the east 4.5 m of `gr-221-west`. The modelled Nos. 223, 225 and 227 therefore stand about 4.5 m east of their photographed houses, each showing its western neighbour's frontage. The earlier split laid its widths from Lian Seng's strip edge and allowed about ±1 m for this drive's position errors, which is too little here.
    - **What happens now:** `gr-221-west` is rebuilt as photographed, unnamed with blank boards. The modelled Nos. 223–227 are unchanged.
    - **Recommendation:** yes. Re-cut source way 453797929 at the triangulated lines anchored on the Lorong 7 corner, re-target the Nos. 223–227 models to their photographed houses, and name **Gong He Guan** (listed at 217 Geylang Rd, a dessert restaurant, and signed) on its own strip. BBQ Home at No. 219 is permanently closed and stays unnamed.
    - **Unlocks:** correct house order on this stretch and one named place.

### Fourth batch, answered 10 October 2026

The project owner chose the recommended option for each.

| # | Decision | What follows |
| --- | --- | --- |
| 25 | **Yes.** Re-author the mosque footprint front to the photographed façade | 20.3 m front parallel to Geylang Road; east 2.2 m left as an open yard; west tower in its photographed place |
| 26 | **Yes.** Widen the study bounds by one block where the five generic boundary blocks sit | Rebuild them from June 2024 photographs, named where the listing-and-signage bar is met; No. 291 gets its corner footprint |
| 27 | **Yes.** Draw Leong Kee's middle board as photographed | 梁记沙煲田鸡粥 LEONG KEE CLAYPOT FROG PORRIDGE |

**Question 26 follow-up, answered the same day.** Containing the five blocks also pulls in 52 more buildings: 22 to the east, 8 to the west and 19 to the south, plus overlaps. The owner chose to **widen fully** rather than rebuild the five within the old bounds. The bounds become 103.87597–103.87859 E and 1.31150–1.31425 N. The new buildings start generic and are rebuilt in later passes.

The original wording of questions 25–27 is kept here:

25. **Masjid Haji Mohd Salleh, 245 Geylang Road: re-author the footprint front to the photographed façade?**
    - **Evidence:** three June 2024 panoramas, triangulated, put the façade parallel to Geylang Road. The source front (way 454254204) is turned about 8° from it. The façade is about 20.3 m wide against the 22.46 m source front, and ends about 2.2 m short of the east corner, where a yard separates it from Shan Yuan Tang. Allowing for the panorama position error recorded at Chen Hing, the façade lies about 1.9 m behind the source front at the west and 1.0 m in front of it at the east.
    - **What happens now:** the rebuilt model keeps the source front. The east 2.2 m is a plain return. The west tower is drawn 1.45 m east of its photographed position to stay inside the outline.
    - **Recommendation:** yes. Author a footprint whose front follows the photographed façade, parallel to Geylang Road and 20.3 m wide, keeping the source rear and side lines. Leave the east strip as an unbuilt yard.
    - **Unlocks:** a square front for the mosque, the west tower in its photographed place, and an open yard beside Shan Yuan Tang.
    - **Evidence:** [references](lorong-11-references.md#masjid-haji-mohd-salleh-245-geylang-road).
26. **Widen the study bounds to take in the five boundary blocks?**
    - **Background:** every footprint inside the bounds is now modelled. Question 17 deferred widening until the current area was finished.
    - **Blocks at the edge:** five blocks still render generically, with stock shop signs:
      - No. 291 Geylang Road, the Lorong 15 corner coffeeshop (way 454254230);
      - the Sian Chay Charity Centre at No. 208 (the rest of the Mongkok block);
      - the Lorong 10 block (454438326);
      - the Lorong 12 block (454438320);
      - the two Geylang Road strips `gr-221-west` and `gr-260-east`.
    - **Why it matters:** single bays of three of them already poke inside the bounds, and all five are in view from modelled streets.
    - **Recommendation:** yes. Widen the bounds by one block on each side where these sit, and rebuild them from June 2024 photographs: named where the listing-and-signage bar is met, unnamed otherwise. No. 291 would need its corner footprint (question 5's original evidence).
    - **Unlocks:** the last generic façades in view.
27. **Leong Kee: draw the middle signboard as photographed?**
    - **Evidence:** in June 2024 the middle board of the three Leong Kee bays reads 梁记沙煲田鸡粥 LEONG KEE CLAYPOT FROG PORRIDGE. The model leaves it blank under an earlier decision, because its wording differs from the outer boards.
    - **Recommendation:** yes. The board carries the Leong Kee name, so drawing it is faithful to the photograph.
    - **Also recorded, no change proposed:** the ochre corner building ends about 8.9 m from the Lorong 11 corner, against the source party line at 9.70 m.

### Third batch, answered 10 October 2026

The project owner chose the recommended option for each.

| # | Decision | What follows |
| --- | --- | --- |
| 20 | **Yes.** Re-space Lorong 13 Nos. 21–25 at the measured No. 25 \| 21/23 party line | Not needed on closer measurement. Two-panorama triangulation puts the line only 0.6 m south of the source line (the 1.8 m in the question came from a single-frame rectification), so the source split is kept, as at Foo Hui. No. 25 and Nos. 21/23 are built on their source ways as unnamed exteriors |
| 21 | **Yes.** Author a footprint for the No. 269 coffeeshop's continuation north along Lorong 13 | Applied as `l13-269-north`, 11.0 m by 8 m (measured length, shorter than the 13.5 m estimate) |
| 22 | **Yes.** Author a footprint for the narrow four-storey building between the back lane and the Shi Hao corner | Applied as `l13-shi-hao-north`, 4.0 m by 14 m |
| 23 | **Yes.** Re-space Sims Avenue Nos. 98–102 at the measured party lines | Applied: cuts at 5.34 and 10.58 m along the source run, backed by the triangulated board ends; BUILDERSmart's second frontage at No. 100, Nos. 98 and 102 unnamed |
| 24 | **Yes.** Add Lorong 9, 10 and 12 to the derived road set | Regenerate `map.json`; footprints unchanged |

The original wording of questions 20–24 is kept here:

20. **Lorong 13 west row, Nos. 21–25: re-space at the measured party line?**
    - **Party line:** the line between No. 25 and the Nos. 21/23 block falls about 1.8 m south of the source line. No. 25 measures about 8.0 m wide (source 6.1 m), and Nos. 21/23 together about 12.4 m (source 14.1 m). The BUILDERSmart and Thirteen BBQ ways fit to within 0.4 m and are built.
    - **Depth, recorded rather than asked:** the April 2024 frames place this row about 2.6 m in front of its source line. Triangulation, the façade base in level frames and a June 2024 Sims Avenue frame all agree on that. However, the façade-to-façade street width measured from the same April panorama matches the source to within about 1 m, so a panorama position error explains it equally well; earlier sessions found 2–3 m errors at Bar @ Lorong 13 and the mosque. The row stays on its source front, as Sims Avenue did under question 9, and widths and heights do not depend on which explanation is right.
    - **Recommendation:** yes. Author three footprints along the source front and rear lines, with the No. 25 | 21/23 line moved 1.8 m south.
    - **Unlocks:** No. 25, a three-storey house scaffolded in April 2024 and photographed whole in March 2022, and the four-storey Nos. 21/23 block, both as unnamed exteriors.
    - **Evidence:** [Lorong 13 brief](lorong-13-design-brief.md).
21. **No. 269 Geylang Road (the Lorong 13 corner coffeeshop): author a footprint for its continuation about 13.5 m north along Lorong 13?**
    - **Evidence:** April 2024 frames and satellite imagery show the conserved two-storey corner building continuing north beyond source way 454254219: about 5.5 m more of the two-storey block (two small vents and a downpipe), then a single-storey wing with a balustraded parapet. That reaches a side passage beside Sui Yuan Ju (No. 2). The source has no building there.
    - **Current state:** the source way is built as an unnamed exterior. The continuation is open ground.
    - **Recommendation:** yes. Author a footprint about 13.5 m long and 8 m deep on the same front line, as a labelled estimate.
    - **Unlocks:** the last gap on the east side of Lorong 13.
    - **Evidence:** [Lorong 13 brief](lorong-13-design-brief.md).
22. **Lorong 13 west side: author a footprint for the narrow four-storey building between the back lane and the Shi Hao corner?**
    - **Evidence:** April 2024 frames show a cream four-storey building with banded storeys and arched windows, about 4 m wide on Lorong 13, directly north of the Shi Hao corner (No. 267). The SHI HAO Hot Pot BBQ board continues along its base. Satellite imagery shows a flat roof strip about 3–4 m wide running back about 14 m from Lorong 13, between the Shi Hao outline (`gr-267`) and the back lane south of Bar @ Lorong 13. The source has no building there.
    - **Side note:** the same satellite frame shows the corner's tiled roof reaching about 4 m further east than the authored Shi Hao outline. That may be a local registration error, so it is not acted on.
    - **Recommendation:** yes. Author a footprint about 3.5 × 14 m on the Shi Hao front line, as a labelled estimate. Model it as an unnamed exterior, with Shi Hao's board continuing at its base.
    - **Evidence:** [Lorong 13 brief](lorong-13-design-brief.md).
23. **Sims Avenue south row, Nos. 98–102: re-space at the measured party lines?**
    - **Evidence:** the green BUILDERSmart board, triangulated from two June 2024 panoramas, puts this stretch about 2.3 m in front of its source front. Rectified at that depth, the June 2024 `eLBm…` frame shows these party lines, measured from the No. 96 corner:

      | Party line | Measured | Source |
      | --- | --- | --- |
      | 96 \| 98 | 0 m | 0 m |
      | 98 \| 100 | 5.0 m | 6.42 m |
      | 100 \| 102 | 10.0 m | 12.53 m |
      | 102 \| 104 | 15.9 m | 16.33 m |

      No. 102 is a white three-storey house about 5.9 m wide, where the source draws 3.8 m. The total length agrees.
    - **Recommendation:** yes. Author three footprints along the source front and rear lines at the measured party lines, as for the Lorong 11 west row (question 1).
    - **Unlocks:**
      - BUILDERSmart's second frontage at No. 100, with its board, blade sign and awning;
      - the light-blue No. 98 and the white No. 102 as unnamed exteriors.
24. **Extend the derived road set to Lorong 9 (and Lorong 12, if in the extract)?**
    - **Why:** Lorong 9 is in the retained OSM extract but not in the derived road set, like Lorong 15 before question 10. The newly modelled PFCS row, YWAM Singapore, Kim Court and The Diamond face bare ground where the road should be. ChongQingXiaoMian's signed face is on Lorong 12, which is likewise not derived.
    - **Recommendation:** yes. Add Lorong 9 (and Lorong 12, if its ways are in the extract) to `scripts/prepare-map.mjs` and regenerate `map.json`, as for Lorong 15. Building footprints are unchanged.
    - **Unlocks:** carriageways, markings and lamps on Lorong 9, and review starts on its west side, which currently straddles the study edge.

### Second batch, answered 10 October 2026

The project owner chose the recommended option for each.

| # | Decision | What follows |
| --- | --- | --- |
| 15 | **Source front, labelled.** Build the Teck Keow Association (26A) and Sin Chew Tan's Clan Association (28A) on the source front of the `l15-north` strip as labelled estimates | Applied: the northern 13 m strip is split into `l15-28a` and `l15-26a`; the 4.8 m offset is recorded in each model's evidence |
| 16 | **Source front, labelled.** Split Geylang Road block 454438330 (Nos. 236–248) on the source front as labelled estimates | Applied: eight strips, Nos. 236–250. Triangulation puts the façades 2.4 m forward, which is this drive's position error; the 6 m correlation peak proved spurious |
| 17 | **Not yet.** Finish every footprint inside the current study bounds before widening them | No. 291 stays generic for now; widening is a later decision |
| 18 | **Yes.** Rebuild unnamed footprints from their 2024 photographs as unnamed exteriors | Real massing, colours, openings and awnings; boards left blank; no business names unless the existing evidence bar is met |
| 19 | **Lorong 13 first.** Focus on finishing Lorong 13 before the rest of the study area | Both sides of Lorong 13, from Sims Avenue to Geylang Road |

The original wording of questions 15–17 is kept here:

15. **Lorong 15 east side, Nos. 26A–28A: the façades measure about 5 m in front of the source block, within about 3 m of the modelled Lorong 15 centreline.**
    - **Case:** the Singapore Teck Keow Association (新加坡德僑社, listed by SFCCA at 26A Lorong 15) and the Sin Chew Tan's Clan Association (星洲陳氏公會, its board numbered 28A) are both clearly signed.
    - **Problem:** two-panorama solutions place their frontages about 4.8 m in front of the 2016 source block, which would put them at the edge of the modelled carriageway. The neighbouring Hotel 81 Spring measured near the source front, and that disagreement suggests either a pose error on this drive or a misplaced block.
    - **Decision needed:** whether to move the Lorong 15 road or the block to match the photographs, or to keep both buildings on the source front as labelled estimates.
16. **Geylang Road south side, Nos. 236–248 (way 454438330): the façade depth disagrees by up to 6 m between methods.**
    - **Evidence:** correlation of three far-side panoramas prefers a façade about 6 m in front of the 57 m source block. A two-panorama triangulation of the Lorong 10 corner puts the corner on the source line.
    - **Unlocks:** Monster Ink (240), Double Hair & Beauty, Crown Paints (242), Aladdin's Kopi House (236) and the associations at 248A.
    - **Decision needed:** whether to split the block on the source front as labelled estimates, or wait for a better-posed capture.
17. **No. 291 Geylang Road (open question 5): the corner block lies outside the study bounds.**
    - **Case:** the footprint is east of the study's walkable boundary (x 111.3 m) and at the junction with a Lorong 15 segment that is not derived.
    - **Decision needed:** whether to widen the study bounds eastward, or leave the corner generic.

### First batch, answered 10 October 2026

All fourteen questions below were answered on **10 October 2026**. The project owner accepted the recommendation given for each ("yes to all").

| # | Decision | What follows |
| --- | --- | --- |
| 1 | **Yes.** Re-space the Lorong 11 west row (Nos. 15–35) using the measured party lines | Author twelve footprints, including 29A, and retarget Hok Tek Chi and Canton Wong |
| 2 | **Yes.** Re-space Geylang Road Nos. 253–267 | Author footprints for the row and the Shi Hao corner |
| 3 | **Yes.** Authored footprint for No. 237 Geylang Road | Labelled estimate |
| 4 | **Yes.** Authored corner outline for Ming Li's, 114 Sims Avenue | Not needed: the registered satellite supports the source corner outline, so Ming Li's is modelled on it |
| 5 | **Yes.** Authored corner footprint for No. 291 Geylang Road | Labelled estimate |
| 6 | **Yes.** Authored footprint for Gems Ville, 8 Lorong 13 | Labelled estimate |
| 7 | **Yes.** Authored footprint for Lorong 11 Nos. 1–7 | Labelled estimate |
| 8a | **Yes.** Re-space Sims Avenue Nos. 106–112 | Applied on closer ground-floor evidence, not as four bays: only the 106/108 line moves, and 108–110 form Red Dot Running's unit; Amrise is unchanged |
| 8 | **Yes.** Re-identify the C4 model as the Guan Keat coffeeshop (Lok Fu stall, 2024) and correct its footprint | Update the model and records |
| 9 | **Not yet** (the recommendation). Keep the Sims Avenue south row on the source front and keep recording the measured offset | No change |
| 10 | **Yes.** Extend the derived road set to Lorong 15 | Regenerate `map.json` |
| 11 | **Yes.** Allow estimated partial-block splits, following the Mongkok precedent | Labelled estimates |
| 12 | **Yes.** A clearly signed occupant may be modelled when published addresses disagree, with the conflict recorded | Unlocks Mister Contracts |
| 13 | **Yes.** Re-measure older estimated models, one at a time, starting with Hotel 81 Joy | — |
| 14 | **Yes.** Retire the GPT-6 Astra verification instruction | Done in the queue and the back-lane brief |

The original questions are kept below for reference.

### Footprint changes

Under the queue rules, re-spaced or authored footprints need explicit approval. Source coordinates otherwise stay untouched.

1. **Re-space the Lorong 11 west row, Nos. 15–35?**
   - **Why:** measured party lines disagree with the source subdivision. No. 15 measures 8.86 m, Nos. 17–21 measure 5.1–5.4 m, and No. 29 measures about 3.8 m, against about 6.4 m each in the source. The run's total length roughly agrees with the source.
   - **Unlocks:** Goodwood Garments (19), the Tibetan Buddhist Studies Society (21), Eng Lee Huat Hardware (29) and Zheng Li Hearty Kitchen (35).
   - **Would also correct:** the existing Hok Tek Chi (17) and Canton Wong (31) models.
   - **Proposed spacing, measured 10 October 2026:** the real row has **twelve frontages where the source has eleven**. The extra house is **No. 29A**, plated 29A, with LG Renov Services listed there. The table is in the building queue, under "Lorong 11 west row, measured party lines". Approving it would mean authoring twelve footprints along the existing source front and rear lines, with the source ways kept for provenance.
2. **Re-space Geylang Road Nos. 253–267, between Leong Kee and Lorong 13?**
   - **Why:** the source bays are about 7% too narrow, and the error grows to about 2 m by No. 263.
   - **Unlocks:** Mobile Time (263), Instyle Hair Salon, Ke Lai Shun, 新福興 and the Shi Hao Hotpot BBQ corner (267, which also needs an estimated corner footprint).
3. **Approve an authored footprint for Geylang Lor 9 Beef Kway Teow, 237 Geylang Road?** The pink block runs flush to Chen Hing, about 2.4 m east of where source way 454274485 steps back.
4. **Approve an authored corner outline for Ming Li's Eating House, 114 Sims Avenue?** The photographed Sims face is about 2.6 m west of, and 1 m wider than, the source edge, and the block has a chamfer and a Lorong 15 face.
5. **Approve an authored corner footprint for No. 291 Geylang Road, the Lorong 15 corner coffeeshop?** The building is about 3 m wider than the 5.13 m source way and runs further back along Lorong 15.
6. **Approve an authored footprint for Gems Ville, 8 Lorong 13?** The condominium was completed in 2025 and covers about 27 × 28 m. The source way (6A) is 23.3 × 15.3 m and predates it.
7. **Approve an authored footprint for Lorong 11 Nos. 1–7, beside Hotel 81 Joy?** It is one single-storey building with two hipped roofs, set back about 5 m, across four source ways.
8a. **Re-space Sims Avenue Nos. 106–112, the Amrise row?** Upper storeys show four uniform pink bays of about 7.1 m between Fok Wai Kee and the Lorong 15 corner. The source alternates 6.16, 8.31, 6.41 and 8.24 m. The large "108" pier stands on the third party line. This would settle the unit numbering for Red Dot Running (108) and the Amrise extent.
8. **Resolve the Guan Keat corner at 38 Lorong 11 (the existing C4 model)?**
   - **Why:** the current "Lok Fu Lala Pot" identity was a stall inside the Guan Keat coffeeshop in 2024. The block's Sims face measures about 18.6 m against the 23.17 m source side.
   - **Decision needed:** whether to re-identify the model and approve a corrected footprint.

### Row offsets and map scope

9. **Move the Sims Avenue south row, Nos. 116–124, about 3.25 m towards the road?**
   - **Why:** rectified panoramas agree that the real façades stand about 3.25 m in front of the source front. The existing Thye Seng, FSL and Amrise models keep the source front.
   - **Decision needed:** whether to move the row or keep recording the offset.
10. **Extend the map to Lorong 15?**
    - **Why:** Lorong 15 is not in the derived road set.
    - **Unlocks:** Hotel 81 Spring, the Lorong 15 west-side walk-ups (AhlulBayt Educational & Cultural Centre, Fu Shan Tan, Myths KTV) and the 291 corner.
    - **Related:** the Qionghai Association at about 137–139 Sims Avenue sits on source ways outside the derived map entirely.
11. **Allow estimated partial-block splits of coarse source blocks?**
    - **Also unlocks:** Wat Dhammasatis (233B Geylang Road), Hakka Chong's Association and Hailin Buddhist Centre (212A Geylang Road).
    - **Why:** the Mongkok precedent treats a partial-block identity as an explicit estimate.
    - **Unlocks:** Geylang Road south side (for example way 454438330), including the Nanyang Lian and Foochow Dionglok associations; the Public Free Clinic Society at 10 Lorong 9; and Hotel 81 Spring (way 454254281).

### Evidence policy

12. **Accept a signed occupant when published addresses disagree?**
    - **Case:** the Mister Contracts signboard hangs on the house tagged No. 9 Lorong 13, but reads No. 5, while Google Maps gives No. 7.
    - **Current rule:** both listing and signage must agree.
    - **Decision needed:** whether a dated exterior named after a clearly signed occupant is acceptable, recording the conflict.
13. **Re-measure older estimated models with the photogrammetry now in use?**
    - **Candidates:** Hotel 81 Joy, Agape Centre, Hok Tek Chi and the Lok Fu (Guan Keat) corner use estimated heights and openings.
    - **Method now available:** rectified panoramas with render-and-compare could replace those estimates.

### Project instructions

14. **Remove or update the "verify GPT-6 Astra before building work" instruction in the building queue?** It was written for another model and was not followed in the 10 October 2026 session.

