# Open questions

Decisions that only the project owner can make, collected so building can continue around them. Each entry names what it would unlock and where the evidence is recorded. The [building queue](lorong-11-building-queue.md) has the full notes. When a question is settled, record the answer and the date here, then move the entry to **Settled**.

Started: 10 October 2026.

## Open

None at present.

## Settled

### Third batch, answered 10 October 2026

The project owner chose the recommended option for each.

| # | Decision | What follows |
| --- | --- | --- |
| 20 | **Yes.** Re-space Lorong 13 Nos. 21–25 at the measured No. 25 \| 21/23 party line | Author three footprints; build No. 25 and Nos. 21/23 as unnamed exteriors |
| 21 | **Yes.** Author a footprint for the No. 269 coffeeshop's continuation north along Lorong 13 | Labelled estimate, unnamed exterior |
| 22 | **Yes.** Author a footprint for the narrow four-storey building between the back lane and the Shi Hao corner | Labelled estimate, unnamed exterior |
| 23 | **Yes.** Re-space Sims Avenue Nos. 98–102 at the measured party lines | Author three footprints; BUILDERSmart's second frontage at No. 100, Nos. 98 and 102 unnamed |
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

