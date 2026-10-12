# Lorong 11 building research queue

Created: 29 September 2026 (Asia/Singapore). First clean automation run, based on commit `2460bdd`. This is a queue of named premises supported by sources, not a survey of every building or a claim that each organisation occupies an entire footprint.

## How to use this queue

Read the README, [reference notes](lorong-11-references.md), landmark registry, models and tests before each run. Inspect the full staged/unstaged diff, untracked files and recent commits. Resume pre-existing changes only when evidence clearly identifies one unfinished Lorong 11 queue item from an earlier run. Preserve and finish that item before selecting another. Stop without editing or committing conflicting paths if changes are unrelated, mix items, appear user-authored or have uncertain intent. Work in the main checkout; never push. This reconciliation rule supersedes the clean-checkout guard mentioned in historical run records below.

Decisions that need the project owner, such as re-spaced or authored footprints, are logged in [open questions](open-questions.md); add new ones there and continue with other candidates.

The four existing reference-led models below count as completed. Their documented limitations remain. New entries are ordered for research, with address-supported candidates distinguished from model-ready candidates. Before modelling, make a small fresh source check and record access dates, changed addresses, conflicting evidence and remaining blockers here. An address match alone does not establish a visible façade, a property boundary or current occupancy of the whole building.

The original bounded queue of ten entries and manually added Shan Yuan Tang (Q7) are complete. On 30 September 2026 the user approved relative placement accuracy for Q7 and requested implementation after switching to Astra. Its authored site is explicitly estimated and separate from retained map data. The hourly schedule remains paused and is ready to be retargeted. For any later retargeted run, reconcile unfinished work first, then investigate the first pending entry in queue order. Promote an entry to **pending, model-ready** only after evidence supports its footprint assignment (or the user explicitly approves a labelled estimate) and enough exterior features for a conservative reconstruction. Do not model an unresolved entry simply to fill a run. If research remains insufficient, preserve the evidence and report the blocker for manual follow-up without a model commit. Research-blocked entries are unfinished, not completed models. When no supported pending or resumable item remains after review, make no modelling changes, pause the scheduled task and report readiness to retarget.

Each later successful run models exactly one place. Preserve the original footprint coordinates and metre scale. Use code-native geometry, original or appropriately licensed/generated assets, and explicitly document estimated dimensions and reconstructed details. Do not ship reference photographs or infer private interiors, activities, affiliations, signage or precise ornament. Keep the commit to that place, its provenance/queue updates, related assets and tests. Require `npm test`, `npm run build` and the narrowest useful visual check when possible before committing.

The user subsequently added the coffeeshop at 251 Geylang Road as Q8. It is now completed within its documented provisional three-bay visual assignment, bringing the scene to twelve named places. No schedule resumption was requested.

The user subsequently selected Masjid Haji Mohd Salleh at 245 Geylang Road as Q9. It is completed within its documented source-footprint and exterior-reference limits, bringing the scene to thirteen named places. The hourly schedule remains paused.

The user subsequently requested a back-alley streetscape behind either Shan Yuan Tang or Leong Kee. Q10 below records the supported temple-side option. It is completed with a sourced pedestrian connection to Lorong 11. GPT-6 Astra was verified before implementation. The standing instruction to verify GPT-6 Astra before later building work was retired by the project owner on 10 October 2026 (open question 14).

## Mapping evidence

All way IDs below were checked against the retained `public/osm-source.osm` extract and `public/map.json`, retrieved **28 September 2026** and inspected **29 September 2026**. Source: [OpenStreetMap extract](https://api.openstreetmap.org/api/0.6/map?bbox=103.8758,1.3110,103.8812,1.3155), [ODbL attribution and licence](https://www.openstreetmap.org/copyright). These are source footprint IDs, not cadastral identifiers. New candidate matches use the stored street/house-number tags and remain provisional until exterior/location evidence corroborates them. No new map data or geometry was introduced in this run.

## Completed models

### C1. Hotel 81 Joy

- **Address / footprint:** 11 Lorong 11 Geylang, Singapore 388703; [way 454274491](https://www.openstreetmap.org/way/454274491).
- **Sources / access:** [official operator](https://www.wwhotels.com/hotel-81/joy/), accessed 29 September 2026; existing photograph inspection recorded 28 September 2026.
- **Confidence / uncertainty:** High for name and street address; mapped number agrees. Existing height, fins, windows and entrance dimensions are estimates from photographs, not measured elevations.
- **Status / blocker:** Completed (`hotel-81-joy` in registry and model code). No blocker to counting it as completed; current façade accuracy remains limited by reference dates.

- **Re-measured, 10 October 2026 (open question 13):** April 2024 Lorong 11 panoramas rectified on the tower front give seven window storeys at about 3.53 m centres from 5.8 m above the car porch, and a roof edge at about 31 m. The height rises from 24.5 m to 31.0 m, the stair fins run full height, and the forecourt HOTEL 81 sign moves onto its photographed pier, about 2 m up. Render-and-compare now aligns the storeys and the roofline.

### C2. Agape Centre

- **Address / footprints:** Operator gives 8 Lorong 11 Geylang, Singapore 388700. Existing model uses ways [1223250213](https://www.openstreetmap.org/way/1223250213), [1223250216](https://www.openstreetmap.org/way/1223250216), [1223250217](https://www.openstreetmap.org/way/1223250217), provisionally.
- **Sources / access:** [operator contact](https://agapesingapore.com/contact/?lang=en), [operator history](https://agapesingapore.com/agape-full-history/?lang=en), [URA historic No. 6 record](https://www.ura.gov.sg/conservation/find-a-building/conservation-portal/gylg-00495/), accessed 29 September 2026. [URA historic No. 8 record](https://www.ura.gov.sg/conservation/find-a-building/conservation-portal/gylg-00316/) was inspected in the prior pass on 28 September; search text was available on 29 September, but direct retrieval returned an error.
- **Confidence / uncertainty:** High for the operator's address, provisional for three-unit extent. Both URA records surfaced with a current No. 10 title, while the operator and stored OSM numbering differ. This run does not resolve that discrepancy. Existing generated façades include reconstructed details.
- **Status / blocker:** Completed (`agape-centre`). Boundary/numbering reconciliation is required before asserting a precise extent or refining the façade.

### C3. Hok Tek Chi Loke Yah Teng Association

- **Address / footprint:** 17 Lorong 11 Geylang, Singapore 388709; [way 1223407885](https://www.openstreetmap.org/way/1223407885).
- **Sources / access:** [URA building record](https://www.ura.gov.sg/conservation/find-a-building/conservation-portal/gylg-00334/), [Lianhe Zaobao, 25 January 2026](https://www.zaobao.com.sg/news/singapore/story20260125-8151043), accessed 29 September 2026; photograph inspection recorded 28 September 2026.
- **Confidence / uncertainty:** High for the existing identity/address match. The pink shophouse texture reconstructs occlusions; ground-floor details and dimensions are approximate. The reference photograph's capture date is unverified.
- **Status / blocker:** Completed (`hok-tek-chi`). No completion blocker; no religious interior is reconstructed.

### C4. Lok Fu Lala Pot

- **Address / footprint:** 38 Lorong 11 Geylang, Singapore 388730; [way 1223250209](https://www.openstreetmap.org/way/1223250209).
- **Sources / access:** [Quandoo restaurant listing](https://www.quandoo.sg/place/lok-fu-lala-pot-106960/about), accessed 29 September 2026, still lists this name/address and outdoor seating.
- **Confidence / uncertainty:** Moderate for listed identity/address, low for detailed appearance. This commercial listing is weaker than operator or government evidence and does not verify present operation. Existing canopy, colours, sign design and furniture are illustrative.
- **Status / blocker:** Completed (`lok-fu`), as instructed for the existing four models. Current exterior references and stronger operator corroboration are needed before any fidelity upgrade.

## Research queue

Q1–Q6 are **completed**. Q2, Q4, Q5 and Q6 represent dated April 2024 exteriors. The original bounded queue is complete; manually added Q7 is recorded separately below. Source access date for Q1–Q6 is **29 September 2026**. Confidence refers separately to the address evidence and the model assignment. Named organisations are included only as candidates for their externally evidenced premises.

- **Superseded, 10 October 2026:** re-identified as the Guan Keat coffeeshop (Lok Fu stall, 2024) and rebuilt on an authored chamfered footprint, `l11-38` (open question 8). See the [design brief](guan-keat-design-brief.md).

### Q1. Ho San Kong Hoey premises, completed

- **Address / footprint:** 24/24A Lorong 11 Geylang, Singapore 388716; assigned [way 1223250200](https://www.openstreetmap.org/way/1223250200), tagged No. 24. The single No. 24 street frontage is assigned; 24A is not treated as another footprint or a separate legal parcel.
- **Sources:** [federation member directory](https://sfcca.sg/en/our-members/) and [Singapore Hokkien Huay Kuan's 2023 heritage hunt](https://www.shhk.com.sg/newsroom/shhk-family-day-2023-hokkien-clans-heritage-hunt/), which identifies a visit location at No. 24.
- **New exterior / mapping evidence:** [Google Street View, April 2024](https://www.google.com/maps/@?api=1&map_action=pano&pano=64XRklcWkCBOa9KyrvJ_PA&heading=15.18&pitch=4.91&fov=37.5), inspected 29 September 2026, shows the association blade sign on the white shophouse between the salmon-coloured No. 26 and the balcony-fronted No. 22. The [mapped association point](https://www.google.com/maps/search/?api=1&query=Ho+San+Kong+Hoey+24+Lorong+11+Geylang) at 1.3132484, 103.8769864 falls within way 1223250200. Supporting user photographs from July 2019 and October 2022 were inspected cautiously; the older close-up shows both 24 and 24A labels within one frontage.
- **Confidence / uncertainty:** High for the corroborated name/address, medium for the single-frontage assignment and broad 2024 exterior. Current September 2026 condition, legal extent and detailed lower openings remain unverified. The photograph dates are distinct from access date.
- **Status / blocker:** Completed as `ho-san-kong-hoey`. The conservative frontage follows the 2024 survey, with estimated dimensions, simplified obscured lower openings and original code-native geometry. No private interior, additional unit footprint or current tenancy claim. See [detailed provenance](lorong-11-references.md#ho-san-kong-hoey-no-24).

### Q2. SHG Engineering / Seng Hup Guan premises, completed

- **Address / footprint:** 36 Lorong 11 Geylang, Singapore 388728; assigned [way 1223250208](https://www.openstreetmap.org/way/1223250208), tagged No. 36.
- **Sources:** [operator contact page](https://www.pump.com.sg/index_files/contact.htm).
- **Confidence / uncertainty:** High for the historical operator/address link; medium for the corroborated frontage and broad April 2024 appearance. The undated operator page and later directory address differ. Present tenancy, exact dimensions and legal extent remain unverified.
- **New evidence, accessed 29 September 2026:** [April 2024 Street View](https://www.google.com/maps/@?api=1&map_action=pano&pano=hHdVXQD79Suo5Y4VlonoNg&heading=76.07&pitch=15&fov=75) and the Seng Hup Guan mapped point inside No. 36 support a dated single-frontage reconstruction. The operator explicitly confirms that former name. [RecordOwl](https://recordowl.com/company/shg-engineering-pte-ltd) reports a later Ubi address, with timing that differs from another directory; current occupancy remains unresolved.
- **Status / blocker:** Completed as `shg-engineering`, representing the April 2024 exterior only. Code-native façade, containment regression test and validation completed; no claim of current tenancy or private interior. See [detailed provenance](lorong-11-references.md#shg-engineering--seng-hup-guan-no-36).

### Q3. Faith Mission Home premises, completed

- **Address / footprint:** Operator gives 12 Lorong 11 Geylang Road, Singapore 388704; assigned [way 1223250210](https://www.openstreetmap.org/way/1223250210), tagged No. 12. The retained [named OSM node 11346722109](https://www.openstreetmap.org/node/11346722109) is inside that polygon and also gives No. 12. No neighbouring unit is assigned.
- **Sources / access:** [operator contact](https://faithmissionhome.sg/contact/), [operator exterior photograph](https://faithmissionhome.sg/wp-content/uploads/2025/07/FaithMissionHomeNight.jpg.webp), both visually inspected in the browser on 29 September 2026. OSM node inspected in the retained 28 September extract. The image URL contains July 2025, but its capture date is unknown. [Third-party registration listing](https://www.sgpbusiness.com/company/Faith-Mission-Home-Ltd) gives 14A and remains weaker, conflicting evidence.
- **Confidence / uncertainty:** High for the operator-published No. 12 street frontage; medium for extent, supported by the matching named point and footprint. No claim about legal boundaries, whole-building occupancy or the reason for No. 14A. The direct operator exterior and independent mapped point support modelling No. 12 despite that unresolved listing.
- **Status / blocker:** Completed as `faith-mission-home`, following source inspection. No blocker to this conservative frontage; exact rear massing, current photograph date and No. 14A relationship remain unresolved. See [detailed provenance](lorong-11-references.md#faith-mission-home-no-12) for omitted and estimated features.

### Q4–Q6. Federation-supported premises

Source for each: [Singapore Federation of Chinese Clan Associations member directory](https://sfcca.sg/en/our-members/), accessed 29 September 2026. This federation publication supports the listed names and addresses, but is not a façade survey. Q4–Q6 are completed following exterior corroboration.

| ID / name | Listed address (Lorong 11 Geylang) | Footprint candidate | Confidence, uncertainty and blocker |
| --- | --- | --- | --- |
| Q4. S.M. Khek Leow Clan Association, completed | 4, Singapore 388696 | Assigned [1223250215](https://www.openstreetmap.org/way/1223250215), tagged 4 | High for the name/address link, medium for broad dated appearance and single-frontage assignment. April 2024 Street View shows the Chinese name; the association point falls within No. 4. Current condition and legal extent unverified. Completed as `sm-khek-leow`, with automated and daylight visual validation; [provenance](lorong-11-references.md#sm-khek-leow-clan-association-no-4). |
| Q5. Canton Wong Clan Association, completed | 31A, Singapore 388723 | Assigned [1223407878](https://www.openstreetmap.org/way/1223407878), tagged 31, for source massing; association-specific treatment is limited to the upper storey and signed stair entrance | High for the federation name/address match; medium for the dated exterior and single-footprint assignment. April 2024 Street View shows association signs immediately north of visible No. 29. The Maps listing pin is displaced and rejected. The ground-floor commercial frontage is neutral; current condition and legal extent are unverified. Completed as `canton-wong`; [provenance and corrections](lorong-11-references.md#canton-wong-clan-association-no-31a). |
| Q6. Hainan Goh Clan Association, completed | 20C, second storey, Singapore 388712 | Assigned [1223250202](https://www.openstreetmap.org/way/1223250202), tagged 20B, after visual number/sign corroboration | High for federation address, medium for dated exterior and footprint assignment. April 2024 Street View shows association names and a separate shop sign numbered No. 20B. Displaced Maps pin excluded. Upper premises and signed entrance only; separate shop neutral. Current condition/legal extent unverified. Completed as `hainan-goh`; [provenance](lorong-11-references.md#hainan-goh-clan-association-no-20c). |

### Q7. Shan Yuan Tang, completed manual addition

- **Name / address:** Shan Yuan Tang / 善緣堂 (also Siang Yen Tong Temple), 249 Geylang Road, corner of Lorong 11.
- **Sources / access:** [June 2024 front/corner Street View](https://www.google.com/maps/@?api=1&map_action=pano&pano=7-UfHDndnVbmRSMy3AWU9w&heading=329.41&pitch=8&fov=50), [April 2024 side Street View](https://www.google.com/maps/@?api=1&map_action=pano&pano=Cyb90czsWHg-VlCqIznp5Q&heading=265&pitch=8&fov=75), [SBFC 2025 annual report](https://www.sbfc.org.sg/resources/ck/files/SBFC%20AGM%202025%20%28Book%29.pdf), accessed 30 September 2026. Street views were visually inspected; No. 249 and temple name are visible at the gate.
- **Footprint / confidence:** No matching temple building polygon in retained OSM/map data. High confidence for visual identity/address; medium for broad dated appearance; precise footprint unresolved. Way 454254204 is the neighbouring mosque and must not be reassigned. Way 1171884241 is broader religious land use, not a temple outline.
- **Status / blocker:** Completed as `shan-yuan-tang` in the separate authored-site registry after explicit user approval of relative placement accuracy. Original red gateway, green tiled roofs/walls, cream upper mass and red framed shutters/panes; opaque openings and neutral mural fields. Approximate 10.4 × 25.5 m site, no OSM way assignment. See [design and provenance brief](shan-yuan-tang-design-brief.md). No remaining implementation blocker within this agreed scope. Current condition, precise footprint and legal extent remain unverified. Automation remains paused.

### 30 September 2026: Shan Yuan Tang implemented and validated

Resumed the two attributable Q7 research documents at `1da036d`, with no staged or unrelated changes. Re-read project context, registry, model conventions, source geometry and tests. Re-inspected the dated corner reference and retained the source limitations above. The user explicitly approved estimated relative placement and requested implementation. Added only this temple as a separate authored exterior; preserved all source coordinates and excluded the mosque. The estimated width was reduced from 11.8 m to 10.4 m after a placement check detected intrusion into the estimated Lorong 11 carriageway. Final tests cover clearance from every retained building and carriageway, metre projection, separate identity and both review starts.

**Validation / completion:** `npm test` passed 15/15; `npm run build` passed with the existing bundle-size advisory. Daylight corner and side browser checks verified the gate/name, green roof layers, blank framed mural fields, shutters and grouped side panes, with no captured runtime warnings or errors. The visual check caught and corrected reversed side-window panel faces. No raster assets or private interiors were added. Q7 is complete within the documented estimates; no second item started. The queue is complete and the hourly schedule remains paused, ready to retarget. No push.

### Q8. Leong Kee (Klang) Bak Kut Teh, completed manual addition

- **Name / address:** Leong Kee (Klang) Bak Kut Teh, 251 Geylang Road, Singapore 389309, across Lorong 11 from Shan Yuan Tang. User requested this coffeeshop next.
- **Sources / access:** [operator website](https://leongkee.com.sg/), [June 2024 corner Street View](https://www.google.com/maps/@?api=1&map_action=pano&pano=x9pb4XARIUjp2Lxgfw5uyg&heading=355&pitch=8&fov=65), [April 2024 side Street View](https://www.google.com/maps/@?api=1&map_action=pano&pano=Cyb90czsWHg-VlCqIznp5Q&heading=90&pitch=8&fov=80), [27 April 2021 Eatbook report and storefront photograph](https://eatbook.sg/leong-kee-klang-bak-kut-teh/), accessed and visually inspected where applicable on **30 September 2026**.
- **Footprints / confidence:** Provisional visible three-bay assignment: **454254214**, **454254213**, **454254212**. Google Maps point 103.877248, 1.3124409 is in the middle source way. High confidence for operator name/address; medium for dated exterior and three-bay visual correspondence. The source ways have no address tags; this does not establish that all three are No. 251 or that Leong Kee occupies the upper premises. The next eastern bay, 454254211, is excluded. Source geometry and metre scale preserved.
- **Status / blocker:** Completed as `leong-kee`, then refined after user review. Lower estimated roofline, corrected long side window sequence, shallow public dining recesses with tables/stools/railings, and a stepped rear context replace the first pass's overly regular side and solid ground-floor frontage. Four review starts cover front, corner, side seating and rear side. Middle board left neutral because its wording belongs to a different stall. [Full provenance and estimates](lorong-11-references.md#leong-kee-klang-bak-kut-teh-251-geylang-road). No implementation blocker; legal extent, the visual join across the source gap, exact heights, furniture layout and current condition remain uncertain.

### 30 September 2026: Leong Kee resumed, corrected and validated

Resumed four uncommitted files at `9d46af4`: registry, models, world and landmark tests. The preceding interrupted turn establishes their assistant-authored Leong Kee scope; there were no staged, untracked or unrelated changes. Preserved and refined that implementation. Directly re-inspected the June front and April side panoramas, corrected the middle fascia and side canopy, added real arched heads and retained all source footprints. The initial review camera had selected the closer side road; it now starts on the named front road with a regression test for the actual geometry.

**Validation / completion:** `npm test` passed **17/17**; `npm run build` passed with the existing bundle-size advisory. Daylight front/corner and lower/upper side browser checks passed with no captured warnings/errors. Separate point checks confirm that the corner and side review starts clear every source building and the authored temple. No copied photographs, private interiors or map-coordinate changes. One focused coffeeshop item only. The bounded queue, including Q8, is complete; the existing hourly schedule remains paused and ready to retarget. No push.

## Research boundaries and run record

### 30 September 2026: Q8 temple-facing side refinement completed

User identified incorrect height and missing coffeeshop seating, requested a research handover, then enabled Astra and authorised implementation. Started clean at `3c4b6b7`; no unrelated work. Re-inspected April 2024 side views at headings 74/70 degrees and the June corner view. The preliminary handover's 7.1 m height is a visual estimate, not a measurement.

**Completed work:** Lower two-storey corner envelope (7.05 m walls, approximately 7.14 m roof eaves, 8.10 m ridge), two paired ornate side bays, rear three-shutter and vent bays, shallow open dining recesses with tables/stools/railings, and the observed four-storey rear context. Source way `454254215` supplies that adjacent context without being added to the Leong Kee identity. Its upper setback and the shallow visual join across the approximately 2.93 m source gap are explicitly estimated; map data and source collision outlines are unchanged. All new side seating and its floor/railings stay inside the source frontage because the estimated road edge approaches the corner wall.

**Validation / completion:** `npm test` passed **20/20** and `npm run build` passed with the existing bundle-size advisory. Daylight browser checks covered the final corner/front, side seating, upper ornate windows, rear triple-shutter/vent bays and stepped upper storeys, with no captured runtime warnings/errors. Inspection also corrected a backing panel that would have intersected the first side table. Tests cover seating/carriageway clearance, unchanged source geometry, separate context identity and all review starts. `git diff --check` passed. Q8 is complete within the documented estimates and ready for one focused correction commit. No new queue item, push or schedule change.

### Q9. Masjid Haji Mohd Salleh, completed manual addition

- **Name / address / footprint:** Masjid Haji Mohd Salleh (Geylang), 245 Geylang Road, Singapore 389304; assigned [way 454254204](https://www.openstreetmap.org/way/454254204), which carries the same name, number, road, postcode and mosque use.
- **Sources / access:** [MUIS mosque directory](https://www.muis.gov.sg/community/mosque/mosque-directory/haji-mohd-salleh--g/), [LearnIslam profile and exterior](https://learnislam.sg/mosque/haji-mohd-salleh-mosque-geylang/), and [December 2020 CC BY-SA 4.0 photograph by Dekoelie](https://commons.wikimedia.org/wiki/File:Masjid_Haji_Mohd_Salleh.jpg), accessed and visually inspected **1 October 2026**.
- **Confidence / uncertainty:** High for identity, address and footprint assignment. MUIS describes a four-storey building, while the retained map tags three levels; the model follows the visible street elevation without asserting an exact internal division. Current condition, exact heights, fine ornament and unseen elevations remain unverified.
- **Status / blocker:** Completed as `haji-mohd-salleh-mosque`. Original code-native cream-and-green frontage, central opaque arch, four upper window bays, side screens, twin towers and central gable. The 22.46 m source frontage is preserved; main wall height and skyline are estimated. No source photograph, private interior, worshipper, activity or temporary decoration is shipped. See [full provenance](lorong-11-references.md#masjid-haji-mohd-salleh-245-geylang-road). Review with `?review=haji-mohd-salleh-mosque`.

**Validation / completion:** `npm test` passed **21/21**, `npm run build` passed with the existing bundle-size advisory, and `git diff --check` passed. Daylight browser inspection verified the full Geylang Road elevation, readable name, central arch, four upper bays, screens, medallions, twin towers and gable. The review start was moved across the road so the skyline fits the view. Browser diagnostics contained no warnings or errors. Q9 is complete within the documented estimates; no second item was started.

### Q10. Temple-side back alley, completed manual addition

- **Mapped route:** [Service way 695010162](https://www.openstreetmap.org/way/695010162), **53.24 m**, plus [footway 1223458240](https://www.openstreetmap.org/way/1223458240), **16.25 m**, connecting Lorong 9 to Lorong 11 behind the mosque block and beside Shan Yuan Tang. Minimal access context uses source Lorong 9 way `633797717`.
- **Sources / access:** Retained OSM extract; [June 2024 western entrance](https://www.google.com/maps/@?api=1&map_action=pano&pano=042IB1VbBlDYdmxD8K1idg&heading=70&pitch=0&fov=85); [April 2024 eastern passage](https://www.google.com/maps/@?api=1&map_action=pano&pano=ifUFTPmGn1-kOv6waVHktw&heading=252&pitch=0&fov=75), accessed and directly inspected **1 October 2026**. Full evidence in the [design and provenance brief](temple-back-alley-design-brief.md).
- **Research correction:** The preliminary brief missed a footway sharing the service way's eastern node, and its Street View query snapped south of the actual entrance. Fresh inspection confirms a visible narrow pedestrian passage. The proposed closing wall was rejected. Vehicle dead-end signage does not imply a pedestrian dead end. Missing coffeeshop mapping does not establish private access.
- **Implementation:** Original code-native 3.5 m service paving and 1.4 m footway (estimated), drainage, restrained rear walls and service details, one remaining collision-aware bin, a low neutral northern neighbour and cream/red temple rear treatment. All original footprint coordinates and metre scale retained. No business identity added, interiors or photographs shipped. Three review starts supplied.
- **Confidence / uncertainty:** High for retained source topology, medium for dated entrance appearance, low for fine details. Widths, hardstanding, rear openings/equipment, roof heights and colours are reconstructed estimates. Source setbacks look wider than photographed ones; they are preserved. Current conditions and access rights remain unverified.
- **Model gate / status:** GPT-6 Astra verified before geometry work. Completed and verified: `npm test` **24/24**, `npm run build` and `git diff --check` passed. Daylight browser checks covered west, middle and east starts, with no captured runtime warnings/errors. The existing bundle-size advisory remains. No other queue item started, schedule remains paused.

**Q10 entrance correction, 1 October 2026:** User-supplied overhead map and April 2024 Street View exposed the first pass's 6–7 m wall spacing despite its narrow paving strip. GPT-6 Astra re-verified before editing. Added a separately documented estimated northern side enclosure, bringing the gap opposite the temple to approximately 1.9–2.6 m. Preserved raw footprints/centrelines; added enclosure collision, tapered the service paving, removed the broad eastern apron and spare bin, and replaced repeated side shutters with a plain service wall and one street-facing shutter. Validated with `npm test` **25/25**, `npm run build` and `git diff --check`. East-entrance and middle-alley browser checks passed, with no captured runtime errors at the entrance. Existing bundle-size advisory only. This remains Q10 only.

Broad searches covered Lorong 11 named premises, operator contact pages, URA conservation records and federation listings. Generic address-only shophouses, nearby streets and business-registration-only leads were not promoted to candidates. Search results using an older hotel name at No. 11 do not create a second building entry. This is a bounded initial research queue, not an exhaustive tenant inventory.

29 September 2026: checked the clean main checkout, README, reference/asset notes, registry, model implementation, geographic source pipeline and existing tests. Recorded four completed models and six supported research candidates. The initial queue adds no model, asset or geometry. All future façade claims require actual visual source inspection; retrieving page text or a photo caption alone does not satisfy that requirement.

Validation: `npm test` passed all five tests; `npm run build` passed, with Vite's existing large-chunk advisory. An additional read-only check confirmed all 11 referenced way IDs exist in both retained map files and have Lorong 11 street tags in `map.json`. No scene visual check was needed for this documentation-only change.

### Q11. Mongkok Dim Sum, 214 Geylang Road, completed manual addition

Manually selected on 2 October 2026 after the user requested another place and rejected HAO Mart. Source access date: **2 October 2026**. HAO's operator store list omits the Lorong 11 branch; no HAO geometry or closure-date claim was added. The hourly schedule remains paused.

- **Address / footprint:** 214 Geylang Road, Singapore 389274; named [OSM node 4345449693](https://www.openstreetmap.org/node/4345449693) within larger [way 454254202](https://www.openstreetmap.org/way/454254202). Only an estimated corner portion is modelled, not the whole block's identity.
- **Sources:** [current Maps listing](https://www.google.com/maps/search/?api=1&query=Mongkok+Dim+Sum+214+Geylang+Road), [Time Out address, 2019](https://www.timeout.com/singapore/restaurants/mongkok-dim-sum), and the attributed October 2016 contributor exterior linked in the [design brief](mongkok-dim-sum-design-brief.md). Direct URA PDF retrieval failed; indexed mentions are not used as visual evidence.
- **Confidence / uncertainty:** High for address, moderate for historical exterior and corner match. Height, internal rendering division, canopy and furniture dimensions are estimates; legal extent and present façade condition remain unverified.
- **Completed work:** Original corner geometry and lettering, dining edge, source-preserving render partition, review starts, provenance and geometry tests. GPT-6 Astra confirmed before implementation.
- **Validation / completion:** All 27 tests, production build and whitespace check passed. Daylight browser inspection covered the chamfer, upper lettering/windows, balcony return, dining edge and road clearance; no captured runtime warnings or errors. Existing build bundle-size advisory remains. Source geometry and raster assets are unchanged. Completed within the documented historical-reference limits, with no pending blocker. One focused local commit; no push.

### Q12. Geylang Lor 9 Fresh Frog Porridge, 235 Geylang Road, completed manual addition

Selected on **4 October 2026**, extending the manual study to the Lorong 9 corner. Source access date: **4 October 2026**. The checkout was clean at `da87187`; the user continued after the requested model switch. The hourly schedule remains paused.

- **Address / footprint:** 235 Geylang Road; [OSM node 4689524152](https://www.openstreetmap.org/node/4689524152) lies inside [way 453797927](https://www.openstreetmap.org/way/453797927). The source way has no house number. The single shell is modelled without asserting whole-building tenancy.
- **Sources:** [operator site](https://geylanglor9.com/), [current Maps listing](https://www.google.com/maps/search/?api=1&query=Geylang+Lor+9+Fresh+Frog+Porridge+235+Geylang+Road), and two directly inspected Backdated_delight photographs with June 2026 capture metadata and August 2026 contributor dates. Exact image links and distinctions are in the [design brief](lor-9-frog-porridge-design-brief.md).
- **Confidence / uncertainty:** High for the address/name match, moderate for exterior and source assignment. Operator and Maps postcodes disagree. Dimensions, repeated side bays, hidden roof profile and seating layout are estimates. The existing estimated Lorong 9 road width overlaps the retained source shell; new furniture stays within it. No present-condition survey, upper-floor use or legal-boundary claim.
- **Completed work:** Code-native two-storey corner, low tiled roof, dark pilasters and windows, red lettering, shallow verandah and sparse seating; two review starts, provenance and three geometry tests. Source maps and existing raster assets are unchanged.
- **Validation / completion:** All **30 tests**, production build and whitespace check passed. Daylight corner and side browser inspections passed with no captured runtime warnings or errors. The signboard occlusion and overlapping pier surfaces found during review were corrected. Furniture and pier bounds stay inside the original outline; the concave roof and both review starts pass geometry checks. Existing bundle-size advisory remains. Completed within the documented source/width limitations, with one focused local commit and no push. The named-place total is now fifteen; the schedule remains paused.

### Q13. Amrise Hotel, 112 Sims Avenue, completed manual addition

Selected for research on **4 October 2026** after the user requested the next building. Iglesia Ni Cristo at 237A Geylang Road was considered first, but current rental advertising makes its continued occupation uncertain. Yi Xiu Factory Building was also checked; its mapped name point is a bus stop outside the large building footprint, making it a weaker next assignment. No geometry was started on GPT-5.6 Sol.

- **Address / footprint:** 112 Sims Avenue, Singapore 387436; [OSM node 4302905890](https://www.openstreetmap.org/node/4302905890) lies inside [way 682928750](https://www.openstreetmap.org/way/682928750). Both carry the same address, and the way records three levels.
- **Sources:** [current operator portfolio](https://amrisehotel.com/), [operator contact page](https://mail.amrisehotel.com/), [current Booking.com listing](https://www.booking.com/hotel/sg/amrise-express-sims-avenue.en-gb.html) and [June 2024 Street View](https://www.google.com/maps/@1.31413,103.87782,3a,80y,180h,90t/data=!3m7!1e1!3m5!1sYsOoBymJj446X2wJOG9R7w!2e0!7i16384!8i8192), accessed and visually inspected where applicable on 4 October 2026.
- **Confidence / uncertainty:** High for the published name/address and the single-footprint assignment; moderate for the dated exterior. The continuous pink row and elevated horizontal hotel sign do not establish occupation of Nos. 110 or 114. Closer inspection resolves a separate vertical Amrise sign beside No. 112's entrance. Height, opening proportions, sign dimensions, cornice and ground-floor division are conservative estimates. Temporary promotion graphics, vehicles, people and interiors are excluded. The older operator contact page does not independently establish current operation.
- **Completed work:** Verified **gpt-6-astra** in current turn metadata before geometry edits. Resumed the two attributable research documents at `8d0d7c1`. Modelled exactly way 682928750 as a three-storey pale-pink frontage with paired/narrow windows, hoods, stepped parapet, recessed entrance and vertical oval blade sign. Preserved its approximately 8.24 m street edge, full outline and whole-footprint collision; neighbouring units remain independent. Added two review starts, source/clearance tests and updated the [design brief](amrise-hotel-design-brief.md).
- **Validation / completion:** All **33 tests**, production build and whitespace check passed. Daylight front and oblique browser inspections verified the exterior with no captured runtime warnings or errors. The existing bundle-size advisory remains. No copied reference image or source-coordinate change. Completed within the documented dated-reference limits; one focused local commit, no push. The named-place total is now sixteen; the hourly schedule remains paused.

## Next five building targets, researched 6 October 2026

This extension was first recorded in a research-only pass requested by the user, without geometry changes. Q14 was subsequently built after GPT-6 Astra verification. Q15 to Q17 were built at the user's direct request in Claude sessions; Q18 remains pending. The targets are ordered to extend the existing scene coherently, starting beside the latest Sims Avenue work and then continuing east along Geylang Road and Lorong 15.

### Q14. Thye Seng Hardware Enterprise, 122 Sims Avenue, completed

- **Address / footprint:** 122 Sims Avenue, Singapore 387445; [OSM node 6396561545](https://www.openstreetmap.org/node/6396561545) lies inside the addressed three-level [way 682928762](https://www.openstreetmap.org/way/682928762). The source outline has an approximately 6.70 m street edge and a stepped rear; preserve the full polygon.
- **Sources / exterior:** [operator shop page](https://thyeseng.com/shop/) and [Makita dealer directory](https://makita.com.sg/find-a-dealer/) both publish the name and address. [June 2024 Street View](https://www.google.com/maps/@1.3142249,103.8781813,3a,75y,135.73h,90t/data=!3m7!1e1!3m5!1s2Ajok7bnMLxnkcW7PuS2sQ!2e0!7i16384!8i8192) and a September 2024 contributor frontage photograph were visually inspected through the current Maps listing.
- **Confidence / scope:** High for current identity, address and single-footprint assignment; moderate for the dated exterior. Model the three-storey cream shophouse, shallow shop awning, blue/red bilingual fascia, upper windows and visible conditioners conservatively. Omit merchandise, people, movable displays and interior depth. Dimensions beyond the retained footprint are estimates.
- **Completed, 6 October 2026:** Verified `gpt-6-astra` before editing, rechecked the operator/Makita addresses and inspected the full June 2024 elevation. Modelled only No. 122 with paired upper windows, vents, two condensers, cream/ochre walls, red awning, original bilingual fascia and opaque recessed shopfront. Neighbouring Thye Seng signage does not establish another unit assignment; upper organisation lettering remains unverified and is omitted. Preserved the full source outline and rear roof notch. See the [design brief](thye-seng-design-brief.md) for estimates and exclusions.
- **Validation / completion:** All **36 tests**, production build and whitespace check passed; existing bundle-size advisory only. Daylight front and oblique visual checks passed. Review positions stay within the original walkable boundary and use an explicit upward angle. Browser console capture was unavailable. Q14 is complete within the dated-reference limits; named-place total is seventeen. Q15–Q18 remain pending. One focused local model commit, no push; schedule remains paused.

### Q15. Buddhist Art Centre, 285 Geylang Road, completed

- **Address / footprint:** 285 Geylang Road, Singapore 389332; retained [OSM node 4689499461](https://www.openstreetmap.org/node/4689499461) lies inside [way 454254227](https://www.openstreetmap.org/way/454254227). The source shophouse is approximately 5.13 m wide and 14.72 m deep.
- **Sources / exterior:** The [operator store page](https://www.buddhistartcentre.com/store/) publishes the name, full address and current catalogue. [June 2024 Street View](https://www.google.com/maps/@1.3124624,103.8781467,3a,80y,10h,100t/data=!3m7!1e1!3m5!1s70E8HnCOcGqPcYcFVA6kZw!2e0!7i16384!8i8192) was visually inspected and shows the signed, highly ornamented green-and-ochre two-storey frontage between Nos. 283 and 287.
- **Confidence / scope:** High for identity/address and point-to-footprint assignment; moderate for fine ornament and current condition. Reconstruct the two-storey conserved frontage, pilasters, arched upper openings, green roof edge and projecting signs with simplified original lettering. Do not reproduce religious objects, stock or private interior details.
- **Status / blocker:** Second build target. No research blocker; ornament must stay simplified where the reference does not resolve it.
- **Completed, 6 October 2026:** Built at the user's request. The user waived the named-model check for this build only. A fresh search confirmed the operator address. Three June 2024 panoramas were inspected directly, including a cross-road view of the full elevation and roof. Modelled only way 454254227: two storeys under an estimated tiled gable roof, three arched windows between fluted pilasters, a red scroll frieze, the teal bilingual signboard with original typography, both vertical signs in colour only, ochre five-foot way piers, a faded red awning and two gilt chandeliers. At the user's request, the chandeliers are kept as part of the exterior because they hang in the five-foot way outside the glass. Vertical sign wording, the LED board digits, stock, religious objects and an attic of uncertain ownership are omitted. See the [design brief](buddhist-art-centre-design-brief.md).
- **Validation / completion:** All **40 tests** and the production build passed; existing bundle-size advisory only. Daylight and night renders covered the front, cross-road oblique and five-foot way starts. Q15 is complete within the dated-reference limits; the named-place total is eighteen. Q16–Q18 remain pending.
- **Upper storey refinement, 6 October 2026:** After user review against a closer June 2024 frame, the upper storey now has six fluted pilasters with leaf-and-star capitals, banded segmental arches with coloured fanlights, white casements with pale glazing, a fuller red scroll frieze, eaves bands and a gutter. The left vertical sign was corrected to a black frame with a yellow-to-orange face. Telephone numbers and unreadable sign wording stay omitted at the user's request. A fourth review start, `buddhist-art-centre-upper`, was added.

### Q16. Eat First, 287 Geylang Road, completed

- **Address / footprint:** 287 Geylang Road, Singapore 389334; the retained 2017 [Sik Wai Sin node 4689499460](https://www.openstreetmap.org/node/4689499460) lies inside [way 454254228](https://www.openstreetmap.org/way/454254228), immediately east of No. 285. The source shophouse is approximately 5.13 m wide and 14.72 m deep.
- **Sources / exterior:** [ieatishootipost's August 2023 update](https://ieatishootipost.sg/eat-first-tale-two-brothers/) records Eat First's July 2023 return to the original Sik Wai Sin premises at No. 287. The June 2024 Street View linked under Q15 was visually inspected and shows the adjacent white two-storey frontage with red fascia. A current business record lists Eat First at 287A, while a separate Sik Wai Sin registration lists 289; this discrepancy does not justify assigning No. 289 or another footprint.
- **Confidence / scope:** High for the published No. 287 restaurant location and mapped-point containment; moderate for the current trading name and upper-unit extent. Model only way 454254228 as the dated June 2024 exterior, using `Eat First / Sik Wai Sin` in documentation until a fresh pre-build check resolves the displayed name. Omit menu claims, diners, food and interior activity.
- **Status / blocker:** Third build target. Model-ready as a dated exterior. The pre-build check must record whether the frontage still displays Eat First, Sik Wai Sin or both.
- **6 October 2026 sign check:** In the June 2024 panoramas inspected for Q15, the fascia on No. 287 reads **食之為鮮 EAT FIRST** with the number 287, and the next fascia east reads **食為先 SIK WAI SIN**, consistent with No. 289. Both names were displayed, on separate frontages. This resolves the displayed name for the dated exterior: model No. 287 as Eat First, and do not assign No. 289 without a separate check.
- **Completed, 7 October 2026:** Built at the user's direct request in a Claude Opus 5.5 session; the user asked this session to build the next buildings, so the queue's GPT-6 Astra gate was not applied. Fresh Eatbook and Burpple listings retain No. 287. June 2024 remains the latest Street View capture. Dimensions were measured photogrammetrically from three June 2024 panoramas: straight-on views for the elevation, two-view triangulation for the five-foot way, and a calibrated cross-road camera for the roof. Modelled only way 454254228: three segmental-arched casements between Corinthian pilasters, relief cartouches and frieze, the red fascia and maroon board in original typography, a 2.0 m five-foot way with an opaque glass shopfront and grille gate, and an orange tiled roof whose ridge sits about 8 m back. The dark door in the five-foot way was triangulated onto No. 289's side of the party line and excluded. The Buddhist Art Centre roof code was moved into a shared gable-roof module without changing its output. See the [design brief](eat-first-design-brief.md).
- **Validation / completion:** All **45 tests**, the type check and the production build passed. Headless browser renders covered all four review starts by day and the five-foot way by night, and led to one correction at the eaves. Q16 is complete within the dated-reference limits; the named-place total is nineteen. **Follow-up for No. 285:** the triangulated No. 287 ridge is about 2 m higher and 3 m deeper than the Buddhist Art Centre's estimated ridge, and the attic seen behind No. 285 sits at about the same height. This suggests the attic belongs to No. 285, but the earlier model is unchanged pending review.

### Q17. K Hotel 1515, 15 Lorong 15 Geylang, completed

- **Address / footprint:** 15 Lorong 15 Geylang, Singapore 388607; [OSM node 4302905933](https://www.openstreetmap.org/node/4302905933) lies inside addressed [way 1223539238](https://www.openstreetmap.org/way/1223539238), approximately 20.18 m by 11.55 m.
- **Sources / exterior:** The [Hotels Licensing Board notice](https://www.hlb.gov.sg/notices/2021-q1/) records the change to K Hotel 1515 at this address. The [current Google Maps listing](https://www.google.com/maps/search/?api=1&query=K+Hotel+1515+15+Lorong+15+Geylang) links `khotel.co`, shows current reviews and supplies August 2024 exterior photographs; [Booking.com](https://www.booking.com/hotel/sg/k-1515.en-gb.html) continues to list the same name and address in 2026.
- **Confidence / scope:** High for current name/address and footprint containment; moderate for exterior detail. The retained OSM point still says `Chang Ziang Hotel`, so that stale name must not be used. Model the five-storey pale-blue and white block, regular window bays, central covered driveway and restrained K Hotel fascia. Omit rooms and lobby details.
- **Status / blocker:** Fourth build target. No research blocker. A fresh street-level view should confirm colours and any post-August 2024 sign changes.
- **Completed, 7 October 2026:** Built at the user's direct request in a Claude Opus 5.5 session. Fresh listings keep the name and address, and April 2024 remains the latest Street View capture. **Correction:** the building is an eight-level hotel, not the five-storey block described above. It has a three-storey podium with a covered driveway under the K HOTEL 1515 lightbox, four storeys of canted bay windows over aqua X-grille panels between three round grey columns, and a glazed turret and aqua pediment on top. Square-on photogrammetry found the north half of the frontage set back 1.27 m. Fitting that setback to the 11.55 m frontage gives a camera distance within 1.4% of the panorama's own position, and storeys of 3.0 m. Satellite tiles with OSM overlays confirmed the plan and the paved forecourt. Modelled only way 1223539238, plus a forecourt apron in front of it that clears every other footprint. See the [design brief](k-hotel-design-brief.md).
- **Logged context gap:** Lorong 15 is not in the derived map's four-road set, and the study's east boundary runs along it. The hotel's frontage therefore faces bare ground beyond its forecourt. Q18 faces the same road from the other side and lies partly outside the study bounds. Adding Lorong 15 is a map-scope decision for the user.
- **Validation / completion:** All **49 tests**, the type check and the production build passed. Headless renders covered four review starts by day and the front by night, and led to a steeper turret roof (within the measured range) and a raised pediment. The named-place total is twenty.

### Q18. Hotel 81 Spring, 22 Lorong 15 Geylang, research-blocked (resolved 10 October 2026, see below)

- **Address / footprint:** 22 Lorong 15 Geylang, Singapore 388619; [OSM node 4302906050](https://www.openstreetmap.org/node/4302906050) lies inside [way 454254281](https://www.openstreetmap.org/way/454254281), an approximately 15.39 m by 43.72 m source outline.
- **Sources / exterior:** A current ACRA-derived [business profile](https://www.sgpbusiness.com/company/Hotel-81---Spring) reports the Hotel 81 Spring entity live at No. 22. [April 2024 Street View](https://www.google.com/maps/@1.313669,103.878108,3a,80y,90h,98t/data=!3m7!1e1!3m5!1sMgS1CqglRPN1fG9C_TToMA!2e0!7i16384!8i8192) was visually inspected and clearly shows the blue Hotel 81 elevation and address context.
- **Confidence / scope:** High for published identity/address and point containment; moderate for current operation and dated appearance. Model the visible pale-blue front mass, white vertical bands, mixed rectangular/arched windows, shallow fascia and recessed entrance. Preserve the long source footprint, but avoid inventing rear openings or facilities unseen from public views.
- **Status / blocker:** Fifth build target. No research blocker. Confirm the Hotel 81 branding remains displayed before implementation.
- **7 October 2026 pre-build check, blocked:** The required branding confirmation could not be made, and two further problems emerged. No model was started.
  - **Current identity uncertain.** The [operator's site](https://www.wwhotels.com/), fetched on 7 October 2026, lists 24 Hotel 81 properties and omits Spring. The Google Maps place still gives Hotel 81 Spring at 22 Lor 15 Geylang, 388619, not marked closed but with no live rates. Retained OSM node 4302906050 (Kaart 2017) names Hotel 81 (Spring). April 2024 is the latest Street View capture. Panorama `MgS1CqglRPN1fG9C_TToMA` shows the pale-blue four-storey frontage, two palms and a HOTEL 81 sign with SPRING beneath. Whether the hotel still trades after April 2024 is unresolved.
  - **Source footprint is a merged block.** Satellite tiles at about 7.5 cm per pixel, with OSM outlines overlaid, show way 454254281 (a 2016 trace, 15.4 × 43.7 m) spanning four or five separate roofs between Lorong 15 and the rear lane. The hotel's white roof, with three tanks, occupies only the middle part, and its street frontage is about 12–16 m. A model would need an estimated partial split of the outline, as Mongkok had, plus a check of the hotel's boundaries.
  - **Outside the rendered study.** The footprint extends past the study's east boundary. Its frontage faces Lorong 15, which is not in the derived road set.
- **To unblock:** confirm current operation, and decide whether to extend the map to Lorong 15. An estimated partial-block split along the visible roof edges would then be modelling-ready.

**Rejected lead:** `Da Bao Lorong 15` remains in the retained 2017 map data at 116 Sims Avenue, but the June 2024 Street View frontage displays **ABC Bistro Restaurant Pte Ltd** and a lighting shop instead. It is excluded from this five-building plan because the old place name would misrepresent the dated exterior. No closure date is asserted.

### Q19. Sik Wai Sin frontage, 289 Geylang Road, completed

Added on 7 October 2026 after the queue's targets were done or blocked. It is the separate check that Q16 said No. 289 needed.

- **Address / footprint:** unnumbered [way 454254229](https://www.openstreetmap.org/way/454254229), the next 5.13 m frontage east of Eat First, sharing its corners.
- **Sources:** ACRA-derived records list Sik Wai Sin Eating House at 289 Geylang Road #01-289, with an address change on 6 September 2024. Google Maps now gives the business at No. 287, with Eat First's telephone number. June 2024 Street View shows the signed 食為先 SIK WAI SIN fascia numbered 289, a small eating-house board and a closed shutter.
- **Confidence / scope:** high for the June 2024 signage and the frontage assignment. Current use after June 2024 is unresolved, so the model is a dated exterior that claims nothing about current use.
- **Completed:** shares the measured No. 287 elevation through a new paired-shophouse module. It adds its own fascia and board, brick-faced piers, a dark timber door and a roller shutter. See the [design brief](sik-wai-sin-design-brief.md).
- **Validation / completion:** all **52 tests**, the type check and the build passed, and daylight renders covered both review starts. The named-place total is twenty-one.

### Q20. RR Motor, 281–283 Geylang Road, completed

Added on 7 October 2026, continuing the row west of the Buddhist Art Centre.

- **Address / footprints:** unnumbered ways [454254225](https://www.openstreetmap.org/way/454254225) (No. 281) and [454254226](https://www.openstreetmap.org/way/454254226) (No. 283), directly west of No. 285.
- **Sources:** ACRA-derived records give R R Motor Pte Ltd at 281 Geylang Road, with an activity change in July 2025. June 2024 Street View shows one RR MOTOR 专卖店 signboard across both frontages and a 281 door plate.
- **Confidence / scope:** high for the June 2024 signage and the two-unit order. Medium for occupation of No. 283, which is supported only by the shared signboard. The 2017 Eros point in No. 281 is stale; Eros was one unit west in June 2024.
- **Completed:** the shared row elevation in a new jalousie finish, two different roofs, the shared signboard behind the central pier, shutters and doors. See the [design brief](rr-motor-design-brief.md).
- **Validation / completion:** all **55 tests**, the type check and the build passed. Renders led to two corrections. The named-place total is twenty-two.

### Q21. Golden Jade Restaurant, 271 Geylang Road, completed

Added on 7 October 2026, at the west end of the same row.

- **Address / footprint:** unnumbered [way 454254220](https://www.openstreetmap.org/way/454254220). It is identified as No. 271 by counting from the closed BN Food Palace at No. 269 (the Lorong 13 corner) and from No. 285.
- **Sources:** Google Maps (open, 271 Geylang Rd, 389324), Wanderlog, and the June 2024 Street View signboard, numbered 271. The 2017 Golden Jade point lies one unit west and is stale.
- **Completed:** the shared row elevation in the jalousie finish, with the black marquee signboard mounted proud of the cornice. See the [design brief](golden-jade-design-brief.md).
- **Validation / completion:** all **58 tests**, the type check and the build passed. The named-place total is twenty-three.
- **Next in this row:** Zui Xiang (醉香楼) at No. 273 has no corroborating listing found yet, so it is not modelled.

### Q22. 277 KTV, 275–277 Geylang Road, completed

- **Address / footprints:** unnumbered ways [454254222](https://www.openstreetmap.org/way/454254222) (No. 275) and [454254223](https://www.openstreetmap.org/way/454254223) (No. 277). They lie between the #273 Zui Xiang frontage and the Eros unit at No. 279.
- **Sources:** Google Maps (open, 277 Geylang Rd, 389327) and the June 2024 signboard 芽笼 277 KTV spanning both frontages.
- **Completed:** the shared row elevation in a new fretwork finish (dusty pink, white fretwork fanlights, mauve-grey casements). Also the proud black signboard and lower board, and a quilted wall closing the five-foot way. Brand panels and cartoon characters are omitted. See the [design brief](ktv-277-design-brief.md).
- **Validation / completion:** all **61 tests**, the type check and the build passed, with day and night renders. The named-place total is twenty-four.

### Q23. Lam Clan Association, 3 Lorong 15 Geylang, completed

Found through the SFCCA member directory while looking for more clan associations in the study area.

- **Address / footprint:** SFCCA gives No 3 Lorong 15 Geylang, 388597. Retained way [1223539233](https://www.openstreetmap.org/way/1223539233) is tagged No. 3 Lorong 15 Geylang.
- **Exterior:** December 2017 Street View shows LAM CLAN ASSOCIATION on this frontage. April 2024 shows it repainted pale blue with 藍氏総會 on the parapet and on a board over the doors.
- **Completed:** a photogrammetric elevation with an estimated hidden roof and a paved forecourt. Three small characters are omitted because one glyph is uncertain. See the [design brief](lam-clan-design-brief.md).
- **Validation / completion:** all **64 tests**, the type check and the build passed. The named-place total is twenty-five.

### Q24. Hainan Lim Clan Association building, 19 Lorong 13 Geylang, completed

- **Address / footprint:** SFCCA gives 19 Lorong 13 Geylang #04-01, 388662. No way carries No. 19. Unnumbered way [1223773760](https://www.openstreetmap.org/way/1223773760) is the next footprint north of No. 17 (way 454254295), and satellite imagery confirms the stepped front.
- **Exterior:** April 2024 Street View shows the building numbered 19. The top band carries 新加坡海南林氏公會 HAINAN LIM CLAN ASSOCIATION (SINGAPORE) and 1970, and the band below 瓊崖沙港同鄉會 KHENG JAI SAR KANG ASSOCIATION. RAVE AUTO S.C is in the windows.
- **Completed:** a four-storey tiled elevation from square-on photogrammetry, with the top band ±0.5 m. The association is modelled as one signed tenant. See the [design brief](hainan-lim-design-brief.md).
- **Validation / completion:** all **67 tests**, the type check and the build passed. The named-place total is twenty-six.

### Q25. Sui Yuan Ju Buddhist Society, 2–4 Lorong 13 Geylang, completed

- **Address / footprints:** Google Maps gives 4 Lor 13 Geylang, 388642, and the business is operating. Addressed ways [1223454593](https://www.openstreetmap.org/way/1223454593) (No. 4) and [1223454592](https://www.openstreetmap.org/way/1223454592) (No. 2).
- **Exterior:** April 2024 Street View shows the yellow Sui Yuan Ju signboard on No. 4, with a continuous red awning and a tiled shrine canopy across No. 2.
- **Completed:** a provisional two-unit visual assignment; No. 2's tenancy is not asserted. Dimensions come from two-panorama triangulation, which confirmed the 5.81 m source split. See the [design brief](sui-yuan-ju-design-brief.md).
- **Validation / completion:** all **70 tests**, the type check and the build passed, with day and night renders. The named-place total is twenty-seven.

### Q26. Singapore Chong Min Association and Yun Teck Sian Tng, 15C Lorong 13 Geylang, completed

- **Address / footprint:** Google Maps gives Chong Min at 15C Lor 13 Geylang, 388656. The Yun Teck temple point lies inside [way 1223773762](https://www.openstreetmap.org/way/1223773762), tagged 15B.
- **Exterior:** April 2024 Street View shows both boards on one white two-storey frontage with a 15-C door plate. The frontage sequence (13/13A, 15-C, 15D/E, 17) puts it on the way tagged 15B. The tag is recorded, not changed.
- **Completed:** see the [design brief](chong-min-design-brief.md).
- **Validation / completion:** all **73 tests**, the type check and the build passed. The named-place total is twenty-eight.

### Q27. Foo Hui Ging Xiu Centre and Siaw Lim Hood Sun Thong, 13–15 Lorong 13 Geylang, completed

- **Footprints:** [1223773764](https://www.openstreetmap.org/way/1223773764) (No. 13) and [1223773763](https://www.openstreetmap.org/way/1223773763) (No. 15). Each contains its Google Maps point.
- **Evidence:** Google Maps lists Foo Hui at 13 Lor 13 Geylang, and April 2024 Street View shows its lettering and a 13/13A plate. The 少林佛山堂 board and door number 15 are on the north bay. Siaw Lim's Maps text gives 6B, a conflict that is recorded and not used.
- **Completed:** one white two-bay building with an identity per way. The measured bay pier is about 0.6 m south of the source party line; the source split is preserved. See the [design brief](foo-hui-design-brief.md).
- **Validation / completion:** all **76 tests**, the type check and the build passed. The named-place total is thirty.

### Q28. Normal Stainless Steel and QianJing Crystal, 131–133 Sims Avenue, completed

- **Footprints:** tagged ways [439168811](https://www.openstreetmap.org/way/439168811) (No. 131) and [439168787](https://www.openstreetmap.org/way/439168787) (No. 133), on the north side of Sims Avenue, straddling the study boundary.
- **Evidence:** Google Maps lists both at these numbers. QianJing's point is inside No. 133. Normal Stainless's point is displaced into No. 127 and rejected. June 2024 Street View shows both signs.
- **Completed:** measured frontages of 6.36 m and 4.66 m against the equal source split; each volume follows its measured span and the source outlines are preserved. See the [design brief](sims-north-design-brief.md).
- **Validation / completion:** all **79 tests**, the type check and the build passed. The named-place total is thirty-two.

### Q29. Fok Wai Kee Hardware, 104 Sims Avenue, completed

- **Address / footprint:** Google Maps gives 104 Sims Ave, 387428 (open), and its point lies in [way 682928754](https://www.openstreetmap.org/way/682928754), tagged No. 104 with three levels.
- **Exterior:** June 2024 Street View shows the white Art Deco frontage with a stepped parapet and the 霍惠記銅鐵 FOK WAI KEE HARDWARE № 104 signboard.
- **Completed:** heights from a single square-on frame, with the parapet checked against Amrise; horizontal positions from a second frame. See the [design brief](fok-wai-kee-design-brief.md), which also records the field-of-view offset finding.
- **Validation / completion:** all **83 tests**, the type check and the build passed. The named-place total is thirty-three.
- **Other Sims Avenue / Lorong 11 leads seen:**
  - Artison Engineering Construction and OICO Flooring share the low tiled building beside Hotel 81 Joy. Maps lists them at Nos. 7 and 1 Lor 11 respectively, which conflicts with the frontage's apparent extent across the source ways for Nos. 5 and 7. Locked pending a plan check.
  - Goodwood (良木林), next to Hok Tek Chi, has no listing found. Not modelled.

### Q30. Hong Ye Chen Interior Design, 7 Lorong 13 Geylang, completed

- **Address / footprint:** Google Maps gives 7 Lor 13 Geylang, 388645, and its point lies in [way 1223773755](https://www.openstreetmap.org/way/1223773755), tagged No. 7. April 2024 Street View shows door number 7 and the 浤業成 HONG YE CHEN INTERIOR DESIGN signboard.
- **Completed:** single-frame photogrammetry of the conserved two-storey frontage with its fretwork eaves. Mister Contracts shares the Maps point, but its signs are on the houses to the north, so it is not assigned. See the [design brief](hong-ye-chen-design-brief.md).
- **Validation / completion:** all **86 tests**, the type check and the build passed. The named-place total is thirty-four.

### Q31. K Group, 5 Lorong 13 Geylang, completed

- **Address / footprint:** Google Maps gives 5 Lor 13 Geylang, 388643; its point is in the street and not used. April 2024 Street View shows the K Group board on the house between door plates 3 and 7, matching [way 1223773754](https://www.openstreetmap.org/way/1223773754), tagged No. 5.
- **Completed:** the shared row elevation via the new row module, with No. 7 unchanged. See the [design brief](k-group-design-brief.md).
- **Validation / completion:** all **89 tests**, the type check and the build passed. The named-place total is thirty-five.
- **Remaining in this row:** No. 3 (plate 3, red awning) has no identity found. The two northern houses carry Mister Contracts / MC Multi Skills signage, but Maps places Mister Contracts at No. 7. The source also tags two ways as No. 9. These remain locked.

### Q32. Eros Adult Shop, 279 Geylang Road, completed

Added on 9 October 2026, filling the gap between 277 KTV and RR Motor.

- **Address / footprint:** Google Maps lists Eros Adult Shop at 279 Geylang Rd, 389328 (open); its point is displaced behind the row. Unnumbered [way 454254224](https://www.openstreetmap.org/way/454254224) lies between the KTV pair and RR Motor's door plated 281.
- **Exterior:** June 2024 shows the EROS signboard and an oval EROS ADULT SHOP blade sign; a square-on May 2023 capture shows the same signboard.
- **Method:** square-on scaling from the row's pilasters, camera height solved from floor and arch crowns, two-view triangulation of the blade sign, and render-and-compare from each fitted pose. See the [design brief](eros-design-brief.md).
- **Validation / completion:** all **92 tests**, the type check and the build passed, with day and night renders. The named-place total is thirty-six.
- **Row follow-up:** the shared row elevation's upper storey renders about 0.3 m lower than photographed at Nos. 277–279. It is recorded, not changed.

### Q33. Plus Mobile, 22 Lorong 13 Geylang, completed

- **Address / footprint:** Google Maps lists Plus Mobile at 22 Lor 13 Geylang, 388665 (open); its point lies in [way 1223454587](https://www.openstreetmap.org/way/1223454587), tagged No. 22. April 2024 Street View shows door plate 22 under the Plus Mobile & Accessories signboard numbered No.22.
- **Method:** party-wall copings triangulated from three panoramas confirm the source's 5.81 m frontages on this row to about 5%. Heights come from a square-on March 2022 frame and were checked by rendering from that pose. See the [design brief](plus-mobile-design-brief.md).
- **Validation / completion:** all **96 tests**, the type check and the build passed, with day and night renders. The named-place total is thirty-seven.
- **Rest of this row:** No. 28 (signed 28) carries WUNDERFOLKS handmade-tart branding in April 2024, but the bakery's listings are at Kaki Bukit, so its use there is unresolved. No. 20 is plated 20 with no identity found. Both stay generic.

### Q34. Lanna Thai Traditional Massage, 34 Lorong 11 Geylang, completed

- **Address / footprint:** Google Maps lists Lanna Thai Traditional Massage at 34 Lor 11 Geylang, 388726, Floor 1 (open); its point is displaced into No. 36. The April 2024 board ends in 34. Assigned [way 1223250206](https://www.openstreetmap.org/way/1223250206), tagged No. 34.
- **Building lettering:** 1995 and 南洋丁氏總會 on the parapet; no listing for the association was found, so no current-use claim is made. The band ?揚體育會 is omitted because its first glyph (威 or 咸) is uncertain.
- **Method:** three-panorama triangulation puts the façade corners within about 0.4 m of the source front, with a skewed source rear preserved. Heights come from a square-on frame and were checked by rendering from the solved pose. See the [design brief](lanna-thai-design-brief.md).
- **Validation / completion:** all **99 tests**, the type check and the build passed, with day and night renders. The named-place total is thirty-eight.

### Q35. JiangSu Jiu Jia 江苏酒家, 20 Lorong 11 Geylang, completed

- **Address / footprint:** Google Maps lists JiangSu Jiu Jia at 20 Lor 11 Geylang, 388712 (open), matching [way 1223250201](https://www.openstreetmap.org/way/1223250201), tagged No. 20; its point is displaced into the lane. Kim Chai Hin (supermarket) is also listed at No. 20 and is not assigned.
- **Method:** triangulated party lines agree with the source to within 0.25 m, so the east side of Lorong 11 is accurate here. Heights come from a square-on frame and were checked by rendering from the solved pose; the blade sign was triangulated in plan. See the [design brief](jiangsu-design-brief.md).
- **Validation / completion:** all **102 tests**, the type check and the build passed, with day and night renders. The named-place total is thirty-nine.

### Q36. Liu Da Ma BBQ 刘大妈烧烤吧, 26 Lorong 11 Geylang, completed

- **Address / footprint:** Google Maps lists Liu Da Ma BBQ at 26 Lor 11 Geylang, 388718, Floor 1 (open), matching [way 1223250204](https://www.openstreetmap.org/way/1223250204), tagged No. 26. 天府渔香 (Floor 2) is not assigned. April 2024 shows the 刘大妈烧烤吧 blade sign; a square-on March 2022 capture shows the same frontage.
- **Method:** render-and-compare against the existing No. 24 model confirmed the source frontage after one panorama's yaw proved 8°–13° off. Heights come from the square-on frame, read linearly because its verticals are plumb. See the [design brief](liu-da-ma-design-brief.md).
- **Validation / completion:** all **105 tests**, the type check and the build passed, with day and night renders. The named-place total is forty.

### Q37. Muhammadiyah Islamic College, 17 Lorong 13 Geylang, completed

- **Address / footprint:** Google Maps lists Kolej Islam Muhammadiyah at 17 Lor 13 Geylang, 388660, matching [way 454254295](https://www.openstreetmap.org/way/454254295), tagged No. 17. The April 2024 signboard reads MUHAMMADIYAH ISLAMIC COLLEGE with this address.
- **Lock resolved:** the signboard triangulated from two same-drive panoramas (10.7 m) and the bar spacing in a level frame (10.56 m) agree on the face distance. The 1.59 m bars are half-storey cells, and the parapet is at about 23.5 m. See the [design brief](muhammadiyah-design-brief.md).
- **Validation / completion:** all **109 tests**, the type check and the build passed, with day and night renders. The named-place total is forty-one.

### Q38. FSL EW LED Lighting, 118 Sims Avenue, completed

Added on 10 October 2026, when the user asked for sourcing and building to continue on a new branch.

- **Address / footprint:** Google Maps lists FSL EW LED Lighting at 118 Sims Ave (open), matching [way 682928760](https://www.openstreetmap.org/way/682928760), tagged No. 118. June 2024 Street View shows the FSL blade lightbox, disc sign and signboard on the stained three-storey frontage between Yap Sun Hardware (No. 120) and the ABC Bistro corner (No. 116).
- **Method:** three panoramas rectified onto the façade agree only with the wall about 3.25 m in front of the source front. At that depth the photographed frontage lies wholly inside the 6.77 m source edge, from 0.49 m inside the No. 120 line to the No. 116 line. The signboard was triangulated on the shop front, 2.3 m behind the piers. See the [design brief](fsl-design-brief.md).
- **Validation / completion:** all **112 tests**, the type check and the build passed, with day and night renders. The named-place total is forty-two.

### Q39. Bar @ Lorong 13, No. 1 Lorong 13 Geylang, completed

- **Address / footprint:** Google Maps lists Bar @ Lorong 13 at 1A Lor 13 Geylang, 388674 (open). [Way 1223773758](https://www.openstreetmap.org/way/1223773758), tagged No. 1, is the white three-storey Art Deco block plated 1, with the BAR@LORONG13 sign over its north wing and a stair tower lettered 協華大厦. Koh Hwee Cheng (No. 1) and the River Ash Bakery point are not assigned.
- **Method:** two-panorama rectification did not converge. Measurements therefore come from one level, square-on frame scaled by the 12.36 m source frontage, which the photograph matches to within about 2%. A 2.0 m (depth) and 1.0 m (along-street) panorama position error was corrected for render-and-compare, which then aligns square-on and oblique frames. See the [design brief](bar-lorong-13-design-brief.md).
- **Validation / completion:** all **115 tests**, the type check and the build passed, with day and night renders. The named-place total is forty-three.

### Q40. Chen Hing Trading 增興貿易, 241 Geylang Road, completed

- **Address / footprint:** Google Maps lists CHEN HING TRADING PTE. LTD. at 241 Geylang Rd, 389296 (open). Its point lies inside unnumbered [way 475158359](https://www.openstreetmap.org/way/475158359), directly west of the mosque (No. 245). June 2024 Street View shows its lettering on the grey three-storey block between the mosque and Geylang Lor 9 Beef Kway Teow (No. 237).
- **Method:** the panoramas' recorded positions were calibrated against the existing mosque model, giving 2.8 m in depth and 1.5 m along the street. After that correction, the photographed frontage matches the 10.08 m source edge, and renders overlay the photograph. The rear wing keeps the 6.7 m back-lane elevation height. The awning is shortened to stay clear of the carriageway. See the [design brief](chen-hing-design-brief.md).
- **Validation / completion:** all **118 tests**, the type check and the build passed, with day and night renders. The named-place total is forty-four.

### Q41. AiSecurityReady CCTV shop, No. 2 Lorong 11 Geylang, completed

- **Address / footprint:** the operator website and Google Maps give AiSecurityReady at 2 Lor 11 Geylang, 388694, matching [way 1223250214](https://www.openstreetmap.org/way/1223250214), tagged No. 2. April 2024 Street View shows SUPPLY / INSTALL / WHOLESALE / CCTV lettering under the closed Wina Salon's board. The operator name is not displayed, and the model's name records that.
- **Method:** three rectified panoramas agree on the No. 4 party line. The photographed frontage matches the 5.26 m source edge, after removing a 0.64 m along-street pose offset shared by the panoramas. Renders of this model and of Khek Leow then overlay the photographs. See the [design brief](aisecurity-design-brief.md).
- **Validation / completion:** all **121 tests**, the type check and the build passed, with day and night renders. The named-place total is forty-five.

### Q42. Mister Contracts / MC Multi Skills, northern No. 9 Lorong 13, completed

- **Decision:** built under the owner's answer to open question 12. The signed occupant is modelled, and the address conflict (signboard No. 5, Maps No. 7, source No. 9) is recorded in the evidence.
- **Footprint:** [way 1223773757](https://www.openstreetmap.org/way/1223773757), the northern No. 9 house. The southern No. 9 house stays generic.
- **Validation / completion:** all **124 tests**, the type check and the build passed, with day and night renders. The named-place total is forty-six. See the [design brief](mister-contracts-design-brief.md).

### Q43. Eng Lee Huat Hardware, 29 Lorong 11 Geylang, completed

- **Address / footprint:** Google Maps lists Eng Lee Huat Hardware at 29 Lor 11 Geylang, 388721. April 2024 shows its signboard and door plate 29. The model stands on the re-spaced footprint `l11w-29` (4.0 m) under open question 1.
- **Method:** square-on rectification at the solved 0.6 m depth, then render-and-compare. All **131 tests**, the type check and the build passed, with day and night renders.
- **Validation / completion:** the named-place total is 47. See the [design brief](eng-lee-huat-design-brief.md).

### Q44. Goodwood Garments Services & Trading, 19 Lorong 11 Geylang, completed

- **Address / footprint:** listed at 19 Lor 11 Geylang, 388711, with its signed board. The model stands on the re-spaced footprint `l11w-19` (5.3 m) under open question 1, and resolves the 9 October lock.
- **Method:** square-on rectification at the solved 0.6 m depth, with back-wall openings corrected for the 1.8 m five-foot way. It uses the shared `peranakan-layout.mjs` elevation with No. 21. All **134 tests**, the type check and the build passed.
- **Validation / completion:** the named-place total is 48. See the [design brief](goodwood-design-brief.md).

### Q45. Tibetan Buddhist Studies Society, 21 Lorong 11 Geylang, completed

- **Address / footprint:** signed 藏密佛学研究会 / Tibetan Buddhist Studies Society (TBSS.ORG) at No. 21. The model stands on the re-spaced footprint `l11w-21` (5.2 m) under open question 1, and resolves the 9 October lock.
- **Method:** shared Peranakan elevation with No. 19, with the board and ornaments read at full resolution. All **134 tests**, the type check and the build passed.
- **Validation / completion:** the named-place total is 49. See the [design brief](tbss-design-brief.md).

### Q46. Zheng Li Hearty Kitchen 正利心厨, 35 Lorong 11 Geylang, completed

- **Address / footprint:** listed at 35 Lor 11 Geylang, with its blade sign. The model stands on the re-spaced footprint `l11w-35` (6.9 m) under open question 1. The row end moved to the measured end pier, 0.66 m past the source end.
- **Method:** square-on rectification at the 0.6 m depth, with the projecting bay corrected for its 0.45 m projection. All **137 tests**, the type check and the build passed.
- **Validation / completion:** the named-place total is 50. See the [design brief](zheng-li-design-brief.md).

### Q47. Ting Yu Xuan 听雨轩, 255 Geylang Road, completed

- **Address / footprint:** listed at 255 Geylang Rd as a foot massage parlour, with its board numbered 255. The model stands on its re-spaced footprint under open question 2.
- **Method:** square-on far-side rectification on the street front, using the shared `simple-house` module. All **141 tests**, the type check and the build passed.
- **Validation / completion:** the named-place total is 51. See the [design brief](geylang-row-design-brief.md).

### Q48. Ke Lai Shun Restaurant 客来顺饭店, 259 Geylang Road, completed

- **Address / footprint:** listed at 259 Geylang Rd, with its red board and blade numbered 259. The model stands on its re-spaced footprint under open question 2.
- **Method:** square-on far-side rectification on the street front, using the shared `simple-house` module. All **141 tests**, the type check and the build passed.
- **Validation / completion:** the named-place total is 52. See the [design brief](geylang-row-design-brief.md).

### Q49. Mobile Time (Lor 13), 263 Geylang Road, completed

- **Address / footprint:** listed at 263 Geylang Rd, with its board numbered 263. The model stands on its re-spaced footprint under open question 2.
- **Method:** square-on far-side rectification on the street front, using the shared `simple-house` module. All **141 tests**, the type check and the build passed.
- **Validation / completion:** the named-place total is 53. See the [design brief](geylang-row-design-brief.md).

### Q50. Shi Hao Hotpot BBQ 食好火锅烧烤, 267 Geylang Road, completed

- **Address / footprint:** listed at 267 Geylang Rd #01-01, with its board on both faces of the corner block. The model stands on its re-spaced footprint under open question 2.
- **Method:** square-on far-side rectification on the street front, using the shared `simple-house` module. All **141 tests**, the type check and the build passed.
- **Validation / completion:** the named-place total is 54. See the [design brief](geylang-row-design-brief.md).

### Q51. Geylang Lor 9 Beef Kway Teow, 237 Geylang Road, completed

- **Address / footprint:** listed at 237 Geylang Rd, with its boards and blade sign on the Lorong 9 corner building. Source way 454274485 is split into `gr-237` and `gr-237-annex` under open question 3.
- **Method:** junction and Geylang Road views, a projection check of the source corners, and a satellite mosaic registered about 4.5 m west and 2 m south of the source frame. All **145 tests**, the type check and the build passed.
- **Validation / completion:** the named-place total is 55. See the [design brief](beef-kway-teow-design-brief.md).

### Q52. Wat Dhammasatis, No. 233 Geylang Road, completed

- **Address / footprint:** listed at 233B Geylang Rd #03-233, with its board and a Buddha image upstairs. Block 475158360 is split into `gr-233`, `gr-231` and `gr-229` under open question 11.
- **Method:** widths measured across three panoramas and scaled to the source front, with strips cut square to it. All **149 tests**, the type check and the build passed.
- **Validation / completion:** the named-place total is 56. See the [design brief](wat-dhammasatis-design-brief.md).

### Q53. Red Dot Running Company, 108 Sims Avenue, completed

- **Address / footprint:** listed at 108 Sims Ave, with its shopfront under the 108 pier. Under open question 8a the footprint joins the former 108 and 110 east of the measured 106/108 pier (`sa-108`).
- **Correction:** the earlier uniform-bay reading is superseded by ground-floor piers matching the source at 20.76 m and 27.17 m. All **153 tests**, the type check and the build passed.
- **Validation / completion:** the named-place total is 57. See the [design brief](red-dot-design-brief.md).

### Q54. Ming Li's Eating House 明利美食阁, 114 Sims Avenue, completed

- **Address / footprint:** listed at 114 Sims Ave, matching the source way tagged No. 114. The source corner outline is kept: under open question 4 the satellite was checked and supports it, and the earlier 2.6 m offset is a pose error.
- **Method:** square-on frames scaled to the source faces, with corner render-and-compare. All **159 tests**, the type check and the build passed.
- **Validation / completion:** the named-place total is 58. See the [design brief](ming-li-design-brief.md).

### Q18 resolved. Hotel 81 Spring, 22 Lorong 15 Geylang, completed

- **Unblocked by:** the owner's answers to open questions 10 (Lorong 15 added to the road set) and 11 (partial-block splits). Block 454254281 is split into `l15-north`, `l15-22` and `l15-south` by parallax measurement of the hotel frontage.
- **Identity:** a dated exterior. The listing and the April 2024 signage agree; current operation is uncertain. All **163 tests**, the type check and the build passed.
- **Validation / completion:** the named-place total is 59. See the [design brief](hotel-81-spring-design-brief.md).

### PFCS. Public Free Clinic Society headquarters, 10 Lorong 9 Geylang, completed

- **Address / footprint:** listed at 10 Lor 9 Geylang, with its point in the No. 10 source way. The tower is set back 8 m behind a forecourt, so it stands on the authored footprint `l9-10` under open question 11.
- **Method:** depth found by agreement of three rectified panoramas, then render-and-compare. All **166 tests**, the type check and the build passed.
- **Validation / completion:** the named-place total is 60. See the [design brief](pfcs-design-brief.md).

### Q7 resolved. Cico Flooring, Nos. 1–7 Lorong 11, completed

- **Address / footprint:** Cico Flooring (7) and Cico Holdings (1) are listed, with the CICO FLOORING logo on the frontage. Nos. 1–7 are merged into `l11-1-7` behind a 5 m forecourt under open question 7.
- **Method:** depth from the agreement of three rectified panoramas, then render-and-compare. All **170 tests**, the type check and the build passed.
- **Validation / completion:** the named-place total is 61. See the [design brief](cico-design-brief.md).

### Q6 resolved. Gems Ville, 8 Lorong 13, completed

- **Address / footprint:** listed at 8 Lor 13. Listing records give 7 storeys, 24 units and a 731 m² lot. The authored footprint `l13-8` replaces the 6A way under open question 6.
- **Method:** frontage from the parallax of four April 2024 panoramas, depth from the lot area. All **174 tests**, the type check and the build passed.
- **Validation / completion:** the named-place total is 62. See the [design brief](gems-ville-design-brief.md).

### Q55. Thirteen BBQ Bar 十三烤吧, 27 Lorong 13 Geylang, completed

- **Address / footprint:** listed at 27 Lor 13 Geylang, 388670 (open), with its point in unnumbered way [1223454595](https://www.openstreetmap.org/way/1223454595). April 2024 shows its board, blade and awning.
- **Lock resolved:** three-panorama triangulation gives a 6.1 m frontage on the source way, settling the 9 October width lock. The row photographs about 2.6 m in front of its source line, which a panorama position error explains as well; the model keeps the source front.
- **Validation / completion:** all **178 tests**, the type check and the build passed. The named-place total is 63. See the [Lorong 13 brief](lorong-13-design-brief.md).

### Q56. BUILDERSmart 魯班行, 29 Lorong 13 Geylang (Sims Avenue corner), completed

- **Address / footprint:** listed at 29 Lor 13 Geylang, 388672 (open), with its point in unnumbered corner way [1223454594](https://www.openstreetmap.org/way/1223454594). June 2024 Sims Avenue frames show its boards, loft and awnings.
- **Lock resolved:** the BUILDERSmart boards at No. 100 Sims Avenue are a second frontage; listing and signage agree at this corner.
- **Validation / completion:** as Q55. The named-place total is 64. See the [Lorong 13 brief](lorong-13-design-brief.md).

### Q57. Teck Hoe Airconditioning Parts, 11 Lorong 13 Geylang, completed (dated exterior)

- **Lock resolved:** the 9 October lock (current use, plan) is settled. Under open question 12 the signed and plated house is a dated exterior, recording that Teck Hoe now lists 8 Lor 15 Geylang. Three panoramas resolve the main block, the lower south wing, the yard and the canopy on source way 1223773759.
- **Validation / completion:** tests, type check and build passed. The named-place total is 65. See the [Lorong 13 brief](lorong-13-design-brief.md).

### Q58. Wunderfolks, 26 Lorong 13 Geylang, completed (dated exterior)

- **Lock resolved:** the 9 October WUNDERFOLKS lock. Time Out (27 September 2023) published 26 Lor 13 Geylang, which matches the April 2024 board on the way tagged No. 26. Maps now lists Kaki Bukit only, so this is a dated exterior.
- **Validation / completion:** tests, type check and build passed. The named-place total is 66. See the [Lorong 13 brief](lorong-13-design-brief.md).

### Q59. Instyle Hair Salon, 261 Geylang Road, completed (dated exterior)

- **Decision:** under open question 12, the clearly signed salon on the re-spaced No. 261 footprint is modelled, recording that its only listing is on Crawford Lane. No. 257 next door, whose 新福興 listing is permanently closed, is an unnamed exterior, as is No. 273 (Zui Xiang, closed) beside Golden Jade.
- **Validation / completion:** tests, type check and build passed. The named-place total is 67. See the [Geylang row brief](geylang-row-design-brief.md).

### Q60. Yap Sun Hardware, 120 Sims Avenue, completed (dated exterior)

- **Lock resolved:** the 10 October Yap Sun lock. Under open question 12, the signed awning on No. 120 is modelled, recording the Chancerlodge Complex listing. No. 106, beside Red Dot, followed as an unnamed exterior.
- **Validation / completion:** tests, type check and build passed. The named-place total is 68. See the [Sims Avenue south brief](sims-south-brief.md). Nos. 116 (the conflicting ABC Bistro corner) and 124 followed later as unnamed exteriors.

### Q61. Lian Seng Weighing Scale Co., 229 Geylang Road, completed

- **Address / footprint:** listed at 229 Geylang Rd, 389289, with its board on the `gr-229` strip west of Wat Dhammasatis (open question 11). No. 231 next door (Vietnam Unisex Concept, no listing) is an unnamed exterior.
- **Validation / completion:** tests, type check and build passed. The named-place total is 69. See the [Geylang Road north brief](geylang-north-brief.md). The three in-bounds houses west of Lian Seng followed later as unnamed exteriors on a split of block 453797929.

### Q62–Q64. Monster Ink (240), Shadow Tattoo (244) and the Nanyang Lian Clan Association building (248), Geylang Road south side, completed

- **Unblocked by:** the owner's answer to open question 16. Block 454438330 is split on its source front into eight strips at measured party lines. Triangulation puts the façades 2.4 m forward, which is this drive's position error, so the earlier 6 m correlation reading was spurious.
- **Named:** Monster Ink (listed and signed at 240); Shadow Tattoo (signed, now listed at Pavilion Square; a dated exterior, open question 12); the Nanyang Lian Clan Association (listed at 248, signed), with BKK Forex at street level.
- **Unnamed:** Nos. 236, 238, 242, 246 and 250.
- **Validation / completion:** tests, type check and build passed. The named-place total is 72. See the [Geylang Road south brief](geylang-south-brief.md).

### Q65–Q66. Sin Chew Tan's Clan Association (28A) and the Teck Keow Association (26A), Lorong 15, completed

- **Unblocked by:** the owner's answer to open question 15. Both houses stand on the source front of the northern strip of block 454254281, split in the ratio of their photographed widths. They were measured at the photographed depth, about 4.8 m forward.
- **Validation / completion:** tests, type check and build passed. The named-place total is 74. See the [Lorong 15 brief](lorong-15-brief.md).

### Q67–Q68. Hong Sheng Koon (20E) and the Singapore Ship-Chandlers Association (20), Lorong 15, completed

- **Address / footprints:** both listed and signed. The southern strip of block 454254281 was split at measured party lines, photographed 4.4 m forward and treated like open question 15. The lean-to beside them and the cream building on way 454254268 are unnamed.
- **Validation / completion:** tests, type check and build passed. The named-place total is 76. See the [Lorong 15 brief](lorong-15-brief.md).

### Q69–Q70. Tian Tian Minimart and TakeToys, Geylang Road south side between Lorong 8 and Lorong 10, completed

- **Address / footprints:** block 454438340 is split at measured party lines, read where triangulation puts the street piers 0.9 m forward (open question 11). Both are listed and signed. The corner, the blue building, the cream house and the white block are unnamed.
- **Validation / completion:** tests, type check and build passed. The named-place total is 78. See the [Geylang Road south brief](geylang-south-brief.md).

### Q71. ibis budget Singapore Gold, 121–127 Sims Avenue, completed

- **Lock resolved:** the 7 October plan lock. The yellow conserved block is assigned provisionally across its four source ways, scaled from its measured 20.5 m frontage. The "one bay west" satellite reading is the imagery registration offset.
- **Validation / completion:** tests, type check and build passed. The named-place total is 79. See the [ibis budget Gold brief](ibis-gold-brief.md).

### Q72. Red Flag Store (Davco), 111 Sims Avenue, completed

- **Address / footprint:** listed at 111 Sims Ave, Floor 1, and signed with a Davco roundel and a Sika awning. It is the east unit of the tiled row on way 439168694, which is clipped 6.5 m behind its front (where three panoramas agree) and split at measured party lines (open question 11). Its two neighbours and the white pair on way 439168818 are unnamed.
- **Validation / completion:** tests, type check and build passed. The named-place total is 80. See the [Sims Avenue north brief](sims-north-row-brief.md).

### Q73. YWAM Singapore, 4 Lorong 9 Geylang, completed

- **Address / footprint:** Youth With A Mission is listed at 8 Lor 9, but its plaque reads 4 LORONG 9 GEYLANG on the yellow building of way 453797939, which is tagged No. 4. The signed occupant is modelled under open question 12. No. 12 and the grey building across Nos. 8 and 6 are unnamed.
- **Validation / completion:** tests, type check and build passed. The named-place total is 81. See the [Lorong 9 brief](lorong-9-brief.md).

### Q74. AhlulBayt Educational & Cultural Centre and Jaafari Muslim Association, 17 & 17C Lorong 15, completed

- **Lock resolved:** the 9 October Lorong 15 west-side lock. Their joint board names both numbers. The rest of the west side (Nos. 1–33) followed as unnamed walk-up exteriors.
- **Validation / completion:** tests, type check and build passed. The named-place total is 82. See the [Lorong 15 brief](lorong-15-brief.md).

### Q75. Yi Xiu Factory Building, 65 Sims Avenue, completed

- **Address / footprint:** listed at 65 Sims Ave and signed FACTORY BUILDING. The salmon ten-storey flatted factory fills way 439168856, with its roof at about 36 m from the roofline elevation. The fruit-stall buildings at No. 77 in front of it are unnamed.
- **Validation / completion:** tests, type check and build passed. The named-place total is 83. See the [Sims Avenue north brief](sims-north-row-brief.md).

### Q76. Shi Cheng Temple 真佛宗狮城雷藏寺, 117 Sims Avenue, completed

- **Address / footprint:** listed at 117 Sims Ave, with its point 1 m beyond way 475915911, whose building shows the temple's architecture above the temporary tent. This settles the 10 October "pagoda-style building" note.
- **Validation / completion:** tests, type check and build passed. The named-place total is 84. See the [Sims Avenue north brief](sims-north-row-brief.md).

### Q77–Q78. Kim Court (11) and The Diamond (17), Lorong 9 west side, completed

- **Lock resolved:** the 10 October Kim Court lock. The KIM COURT / 11 pillar triangulates inside the way tagged 11, and The Diamond's lettering is on the way tagged 17; listings, plates and tags agree. No. 7A is unnamed, and the No. 3 and No. 5 construction sites are shown hoarded.
- **Validation / completion:** tests, type check and build passed. The named-place total is 86. See the [Lorong 9 brief](lorong-9-brief.md).

### Q79. ChongQingXiaoMian 重庆小面, 258 Geylang Road (the Lorong 12 corner), completed

- **Address / footprint:** listed at No. 258 with its point in the corner. Block 454438318 is split at the corner building's satellite roof edge (open question 11). This settles the 10 October lead.
- **Validation / completion:** tests, type check and build passed. The named-place total is 87. See the [Geylang Road south brief](geylang-south-brief.md).

### Q80. BUILDERSmart 魯班行, Sims Avenue frontage at No. 100, completed

- **Address / footprint:** the re-spaced No. 100 (open question 23), signed with BUILDERSmart's board, awning and blade. It is a second frontage of the business listed at 29 Lor 13 (open question 12). This settles the 10 October BUILDERSmart lock. Nos. 98 and 102 are unnamed.
- **Validation / completion:** tests, type check and build passed. The named-place total is 88. See the [Sims Avenue south brief](sims-south-brief.md).

### Lorong 13 unnamed exteriors, from 10 October 2026 (open question 18)

- **No. 15D/E** (way 1223773761), **No. 9, southern house** (way 1223773756) and **No. 3** (way 1223773753) are modelled from April 2024 as unnamed exteriors. Hiap Lian (listed at 15D) and River Ash Bakery (listed at 3) have no visible signs, and the No. 9 banner is free-standing. Nos. **28**, **24** and **20** on the single-storey east row followed on the shared form measured at Plus Mobile, then Nos. **18**, **16** and **12A** on a new set-back option, Nos. **25** and **21/23** on their source ways after open question 20, the **No. 269 wing** and the **narrow building north of Shi Hao** on authored footprints (open questions 21 and 22), and **No. 96 Sims Avenue** at the east corner (shuttered in April 2024, hoarded for works by June 2024). The 10 October note on No. 96 is superseded. The **No. 269** Geylang Road corner is built unnamed on its source way, settling the 10 October conflict note; its continuation north is open question 21. They are not counted as named places. See the [Lorong 13 brief](lorong-13-design-brief.md).

### Lorong 11 unnamed exteriors, from 10 October 2026 (open question 18)

- **No. 15** (`l11w-15`) is modelled from April 2024 as an unnamed exterior on the shared Peranakan elevation, which now takes per-house bays. **Nos. 23, 25, 27, 29A and 33** follow on the simple-house elevation, completing the west row, and **Nos. 16, 18, 22, 28 and 30–32** complete the east side. See the [Lorong 11 street brief](lorong-11-street-brief.md).

### Authored footprints, from 10 October 2026

The owner's answers to the open questions allow re-spaced and authored footprints. `src/authored-footprints.mjs` holds each approved group. A group lists the source ways it replaces, the measured evidence, the question number and the approval date. `withAuthoredFootprints()` applies the groups when the scene loads, and `map.json` and the source coordinates are unchanged. Replaced ways are kept as `replacedBuildings`, and authored buildings carry `geometrySource: 'authored-estimate'`.

- **Geylang Road Nos. 255–267 (open question 2), applied:** six houses replace the seven source bays (ways 454254205–211) between Leong Kee and Lorong 13: 255 (听雨轩), 257 (新福興), 259 (客来顺), 261 (Instyle), 263 (Mobile Time) and the 267 Shi Hao corner.
  - **Measurement:** party lines were read from six June 2024 far-side panoramas on the street front, where they agree with the façade 0.5 m behind it. The table is in the group's evidence.
  - **Leong Kee:** it keeps its three source bays. Its measured end, 14.1 m, is within 0.4 m of the source line, so No. 253 stays part of the corner building, consistent with 新福興's board reading #257.
  - **Shi Hao corner:** its Lorong 13 face is 2.1 m east of the source edge, with an estimated 1.4 m chamfer.
- **No. 237 Geylang Road (open question 3), applied:** source way 454274485 is split at the step in its outline into the Lorong 9 corner building (`gr-237`) and a generic annex flush with Chen Hing (`gr-237-annex`). The temple-alley rear elevation now finds replaced source ways.
- **Satellite imagery:** the scratchpad mosaic tool registers Google satellite tiles to the source frame, with the imagery about 4.5 m west and 2 m south of it. Earlier notes that roofs sit "one bay west" are explained by this offset.
- **Geylang Road Nos. 229–233 (open question 11), applied:** block 475158360 is split by measured widths into `gr-233` (Wat Dhammasatis), `gr-231` and `gr-229`, using a new strip-clipping helper.
- **Sims Avenue Nos. 106–110 (open question 8a), applied:** the ground-floor piers confirm the source lines at 20.76 m and 27.17 m, so only the 106/108 line moves (to about 15.0 m). Former Nos. 108 and 110 merge into Red Dot Running's unit `sa-108`, and No. 106 becomes `sa-106`. The earlier four-bay upper-storey reading is superseded.
- **Lorongs 9, 10 and 12 (open question 24), applied:** `scripts/prepare-map.mjs` now derives the eleven Lorong 9, 10 and 12 ways that touch the study bounds, bringing the road set to 52 ways, and `public/map.json` was regenerated. Building footprints are unchanged. The temple alley's Lorong 9 access way is now drawn as part of the road set rather than as context.
- **Lorong 15 (open question 10), applied:** `scripts/prepare-map.mjs` now derives the seven Lorong 15 road ways that touch the study bounds, and `public/map.json` was regenerated. Building footprints are unchanged (154). Generic buildings along Lorong 15 now face it. Earlier notes that call Lorong 15 "outside the derived road set" are historical.
- **Older estimated models (open question 13), checked:**
  - Hotel 81 Joy was re-measured.
  - The Agape Centre and Hok Tek Chi models overlay their April 2024 photographs to within about 0.4 m, Hok Tek Chi after its re-spacing, so they are kept.
  - The Lok Fu model was replaced by Guan Keat.
  - Hainan Goh, Ho San Kong Hoey, SHG Engineering and Faith Mission Home were checked by render-and-compare from the April 2024 Lorong 11 panoramas, alongside the new east-side neighbours. They overlay their photographs closely enough to be kept. The same check lowered the new No. 22's canopy and parapet by about 0.4 m.
  - **Masjid Haji Mohd Salleh**, re-measured from three June 2024 panoramas and rebuilt:
    - The 2020-based model showed a cream three-storey front with an 11.35 m wall. The building was repainted in 2021 and has four storeys to a parapet at about 15.8 m.
    - The photographed front is about 20.3 m wide and runs parallel to Geylang Road, 8° off the source front. Under open question 25, it now stands on authored footprint `gr-245`, with an open yard of about 2 m at the east.
    - The same geometry explains the 2.8 m "pose error" recorded at Chen Hing: the façade simply stands behind much of the source front.
    - See the [references](lorong-11-references.md).
  - **Mongkok Dim Sum (214 Geylang Road)** was rebuilt as a June 2024 exterior:
    - The corner was repainted after the 2016 panorama. It is now taupe, with a red ground floor and a red 24 HRS board.
    - The parapet is raised from 10.1 m to 11.6 m.
    - The Lorong 8 face gains its windows and awning.
    - See the [brief](mongkok-dim-sum-design-brief.md).
  - **Nanyang Dentist (212) and Shaxian Eatery (210)**, modelled on 10 October 2026 under open question 11 (estimated partial-block splits):
    - They are two further units of the Mongkok block, on measured frontages of 7.05 m and 6.7 m.
    - Both are listed and signed in June 2024.
    - The Mongkok return is corrected to 5.8 m.
    - See the [Mongkok brief](mongkok-dim-sum-design-brief.md).
  - **Leong Kee (251 Geylang Road)** was checked from June 2024 panoramas and kept:
    - Its front plane agrees to within about 0.2 m along the frontage.
    - The eave is about 6.8 m, against the model's 7.05 m.
    - Recorded, not corrected: the ochre corner building ends about 8.9 m from the Lorong 11 corner, against the source party line at 9.70 m.
  - S.M. Khek Leow (No. 4) was re-measured by two-panorama triangulation. Its upper storey was rebuilt: the windows are about 1.0 m tall rather than 1.7 m, the arch crowns sit near 6.6 m rather than 7.1 m, and the eave is at about 7.55 m. See the [references](lorong-11-references.md).
- **Lorong 11 west row (open question 1), applied:** twelve houses, Nos. 15–35 including 29A, replace the eleven source ways along the same front and rear lines. The measured party lines are in the table below.
  - **Retargeted models:** Hok Tek Chi moves to `l11w-17` (5.2 m) and Canton Wong to `l11w-31` (3.7 m).
  - **Check:** render-and-compare from two April 2024 panoramas puts both models on their photographed frontages.
  - **Unlocked:** Goodwood (19), the Tibetan Buddhist Studies Society (21), Eng Lee Huat (29) and Zheng Li (35).

### 10 October 2026: leads checked and locked

- **Sims Avenue south row, Nos. 116–124: source front about 3.25 m behind the real façades.** Rectified panoramas agree on this depth over both No. 118 and Thye Seng (No. 122). A render of the Thye Seng model draws it about 1.35 times smaller than photographed from the same pose, while the kerb aligns. Fok Wai Kee's measured 7.67 m camera distance fits the same offset. Recorded, not corrected: the modelled neighbours all keep the source front.
- **Eng Lee Huat Hardware 永利... ENG LEE HUAT HARDWARE PTE. LTD., 29 Lorong 11 (west side):**
  - **Identity:** Google Maps lists it at 29 Lor 11 Geylang, 388721. April 2024 Street View (`H3-9KS_v_QrrAnpO7y28LQ`, `QQNp4tBAf9BWzHrMOUczcw`, `8kEpH_Q3jNSaUef89yiXtQ`) shows its signboard and door plate **29**.
  - **Measurements:** three panoramas rectified onto the façade agree with it 0.6 m in front of the source front, to within 0.3 m over three features. Measured from No. 27's south front corner, the party lines fall at about 6.0, 9.8, 15.8 and 20.1 m, against the source's 6.4, 12.8 and 19.2 m. Eng Lee Huat's frontage is therefore about 3.8 m wide, against the source's 6.41 m.
  - **Neighbours:** the next house carries plate **29A** on its door (LG Renov Services is listed at 29A) and the Canton Wong red stair sign. It spans about 9.8–15.8 m, straddling source Nos. 29 and 31. The Canton Wong gold board and five-pane window lie at about 16.0–20.0 m.
  - **Status:** locked. The west row of Lorong 11 is mis-subdivided at Nos. 27–33 as well as at Nos. 15–23, so this awaits the same user-approved re-spacing. That re-spacing would also correct the Canton Wong model. A 27A stair door stands south of No. 27, where Hwa Kwang Temple 華光神壇 is listed; No. 25 was hoarded in April 2024.
- **Hakka Association (Singapore), 22 Lorong 11:** listed at No. 22 (way 1223250203, between Hainan Goh and Ho San Kong Hoey). April 2024 shows a plain white two-storey house with a corrugated canopy and a red awning, and no association signage. Not modelled.
- **Nai Ghee Hardware & Trading, 28 Lorong 11:** listed at No. 28. April 2024 shows only an English Abrasives notice upstairs and closed shutters. Not modelled.
- **No. 116 Sims Avenue, the Lorong 15 corner:** June 2024 boards read ABC BISTRO RESTAURANT PTE LTD, whose listing is marked permanently closed. Tai Say (coffee shop), Da Bao Lorong 15 and Prata Hub are listed open at No. 116. This conflicts, following the ABC Bistro precedent. Not modelled.
- **Yap Sun Hardware, 120 Sims Avenue:** its name is on the blue awning in June 2024, but Google Maps lists Yap Sun Hardware Mfy at 105 Sims Ave, #04-09 Chancerlodge Complex. As with WUNDERFOLKS at 28 Lor 13, its use at No. 120 is unresolved. Not modelled.
- **AiSecurityReady, 2 Lorong 11 (the grey conserved shophouse beside S.M. Khek Leow):** listed open at 2 Lor 11. April 2024 shows a CCTV supply-and-install shop under a WINA SALON board; Wina Salon is listed as permanently closed. The AiSecurityReady name itself was not seen. This is a candidate for a dated exterior, pending a frame that shows the name.
- **Ming Li's Eating House 明利美食阁, 114 Sims Avenue (the Lorong 15 corner):** listed open 24 hours at 114 Sims Ave, with its signboard on the corner building in June 2024. A candidate, needing the corner and Lorong 15 elevations.
- **Panorama position errors:** on Geylang Road (Nos. 237–245) and Lorong 13 (No. 1), the recorded panorama positions are 2–3 m off the source frame. Recorded camera positions alone should not be trusted for depth; calibrate against an existing model or the source frontage width.
- **Sin Chew Tan's Clan Association 星洲陳氏公會 (corrected):** its signboard was seen in June 2024 on a three-storey building on **Lorong 15**, above Ganh Xua by Homely Vietnam (listed at 28 Lor 15). It is not on Lorong 13 as first noted. That listing's point lies in Hotel 81 Spring's merged block, way 454254281. No address for the association was found. Locked with the Lorong 15 scope and partial-block questions.
- **Geylang Road south side (Nos. 204–258):** Shaxian Eatery 沙县小吃 (210), ChongQingXiaoMian (258, at the Lorong 12 corner), Chang Beer (218), the TakeToys adult store and others are listed and signed in June 2024. Most of their source ways are coarse blocks (for example 454438330) that span several frontages, so they need partial-block splits first.
- **Geylang Lor 9 Beef Kway Teow 芽龍九巷牛肉河粉, 237 Geylang Road:**
  - **Identity:** listed open as a hawker stall at No. 237. Its fascia and a 牛河大王 blade sign are on the pink four-storey block west of Chen Hing (green shutters, 藤樓 on the chamfered west corner).
  - **Mismatch:** source way 454274485 steps back 4.5 m over its eastern 7.3 m, but the photographed block runs flush to Chen Hing. With the Chen Hing pose correction, its frontage is about 10.2 m and ends about 2.4 m east of the source step.
  - **Status:** locked pending an authored footprint.
- **Zheng Li Hearty Kitchen 正利心厨, 35 Lorong 11:**
  - **Identity:** listed open at 35 Lor 11, 388728. Blade signs 正利心厨 ZHENG LI HEARTY KITCHEN are on the last house of the west row, before the open corner at Sims Avenue.
  - **Mismatch:** three April 2024 panoramas rectified at the 0.6 m depth that fits Nos. 27–31 disagree by up to 3 m along the street here, so the 33|35 party line can't be checked against source No. 35.
  - **Status:** locked with the west-row re-spacing.
- **Ming Li's Eating House 明利美食阁, 114 Sims Avenue:**
  - **Identity:** listed open 24 hours at No. 114. Way 682928749 is tagged No. 114, three levels. The white Art Deco corner block has its signboard on a chamfered corner face, a food-photo board over the Sims bay and a SingGas awning along Lorong 15.
  - **Mismatch:** square-on rectifications put the photographed Sims face about 2.6 m west of the source party line with Amrise, and about 1 m wider than the source edge. This matches the ~3.25 m façade offset found at No. 118. Each of the three faces (Sims 6.64 m, chamfer 4.41 m, Lorong 15 18.28 m) would need its own offset.
  - **Status:** locked pending an authored corner outline.
- **Kim Court, Lorong 9:** listed at 11 Lor 9 Geylang (with Star Glass), but the KIM COURT lettering in June 2024 is on the yellow apartment block tagged No. 17, beside The Diamond. Both ways lie on the study's west boundary. Locked pending the address conflict.
- **Key duplicating, 24 Lorong 13:** a key-cutting booth signed 配锁匙 / DUPLICATING matches the listing at No. 24, which Bookland Library Services shares. It is a generic trade sign rather than a name, so it is not modelled.
- **No. 269 Geylang Road, the Lorong 13 corner:** Hong Wah Coffee Shop and Geylang Food Corner are listed open there, but the frontage shows a Khim Seng gas awning, a 麻辣空间 board and the closed BN Food Palace's 24-hour board. These conflict. Not modelled.
- **Mister Contracts, the northern No. 9 house on Lorong 13 (way 1223773757):**
  - **What the signboard says:** a full-resolution April 2024 frame reads its address line as **5 LORONG 13 GEYANG [sic], SINGAPORE 388643**, which is K Group's address. Google Maps gives No. 7.
  - **Where it hangs:** on the house the source tags No. 9. Its southern neighbour (also tagged No. 9) has the MC Multi Skills banner and a vending machine.
  - **Status:** with three different numbers for one signboard, the lock stands. See open question 12.
- **Wat Dhammasatis วัดธรรมสาทิส, 233B Geylang Road #03-233:**
  - **Identity:** listed open as a Buddhist temple. June 2024 shows its WAT DHAMMASATIS BUDDHIST CENTRE board and a Buddha image in the upper windows of the white four-storey building directly west of the Lorong 9 corner. A Durian & Fruits Experience Centre 榴莲鲜果体验馆 occupies the ground floor, where Fuyuan restaurant is also listed (No. 233).
  - **Footprint:** source way 475158360 is a 15.8 m frontage block covering this building and two Peranakan shophouses to its west (Vietnam Unisex Concept, Lian Seng Weighing Scale).
  - **Status:** locked pending a partial-block split (open question 11).
- **Nos. 21/23 Lorong 13 (ways 1223454598 and 1223454597), the four-storey blue-and-white block:**
  - **Signs:** a door placard reads 21/23 GEYLANG LORONG 13, and door plate 21 is visible. A Chinese hall signed 仁濟堂 occupies the south bay, with couplets and product posters. Yong Li Electrical Services is listed at 21B.
  - **Gap:** no listing or published address for 仁濟堂 was found.
  - **Status:** locked pending an identity source for the signed tenant.
- **Other associations from the SFCCA directory:**
  - **Ji Yang Cai Clan Association, 3 Lorong 9:** the site was under hoarding in June 2024, with "No 3" painted on it.
  - **Teck Keow Association, 26A Lorong 15:** in the merged Lorong 15 block.
  - **Hakka Chong's Association, 212A Geylang Road:** in the Mongkok block.
  - **Status:** none can be modelled yet.
- **No. 96 Sims Avenue:** a plain white two-storey block with shutters and no signage. Not modelled.
- **The pagoda-style building north of Sims Avenue, behind the Brandsbridge tent (way 475915911):** it stands beyond the study's north boundary. Not modelled.
- **Lorong 11 west row, measured party lines (for open question 1):**
  - **Method:** April 2024 panoramas `s5xU…`, `H9_p…`, `73in…`, `64XR…`, `8kEp…`, `H3-9…`, `QQNp…` and `aHF7…` stand about 10 m apart along the lane. They were rectified at the 0.6 m façade depth solved for Nos. 27–33. Each party line is read from the most square-on panorama and checked against its neighbours.
  - **Position datum:** s is measured from No. 15's south front corner (-38.26, 19.94) towards No. 35's north corner (-59.42, -47.25), along the source front.

  | Party line | Measured s (m) | Source s (m) | Evidence |
  | --- | --- | --- | --- |
  | Row start (No. 15) | 0.3 | 0 | building edge beside Hotel 81 Joy's yard |
  | 15 / 17 | 9.3 | 6.40 | downpipe; No. 15 is a two-bay house (earlier triangulation 8.86 m) |
  | 17 / 19 | 14.5 | 12.81 | downpipe beside Hok Tek Chi's blue windows |
  | 19 / 21 | 19.8 | 19.22 | pilaster beside the Goodwood house |
  | 21 / 23 | 25.0 | 25.62 | end of the Tibetan Buddhist Studies Society façade; plate 23 hangs there |
  | 23 / 25 | about 31.0 | 32.03 | end of the plain three-storey No. 23 |
  | 25 / 27 | 37.1 | 38.43 | pilaster; plate 27 beside it; No. 25 hoarded below a corrugated canopy |
  | 27 / 29 | 44.3 | 44.83 | three-panorama parallax, spread under 0.3 m |
  | 29 / 29A | 48.3 | — | roofline vents; Eng Lee Huat is about 4.0 m wide |
  | 29A / 31 | about 54.2 | 51.24 | start of the Canton Wong board |
  | 31 / 33 | about 57.9 | 57.65 | ground-floor pier after the Canton Wong window, re-read square-on from `aHF7…` |
  | 33 / 35 | 64.2 | 64.04 | ground-floor pier and upper-storey setback, read square-on from `aHF7…` |
  | Row end (No. 35) | 71.1 | 70.44 | end pier, re-read square-on from `aHF7…`; Zheng Li's restaurant fills 64.2–71.1, extending 0.66 m past the source end onto open ground |

  - **Uncertainty:** about ±0.3–0.5 m up to the 31 / 33 line, and more beyond it, where a 1 m disagreement between panoramas remains.
- **Red Dot Running / Amrise row, 106–112 Sims Avenue, re-checked:**
  - **Depth:** the 108 pier aligns across three June 2024 panoramas when the façade is about 1.5 m in front of the source front, not 3.25 m as east of Lorong 15.
  - **Bays:** at that depth the upper storeys show four uniform bays of about 7.1 m, with party lines at about 7.0, 14.1, 21.2, 28.3 and 35.4 m from Fok Wai Kee's west corner. The source widths are 6.16, 8.31, 6.41 and 8.24 m, and the 108 pier stands on the third party line.
  - **Status:** locked pending re-spacing (open question 8a).
- **River Ash Bakery, 3 Lorong 13, historical check:** Street View captures from February 2018, September 2020, September 2021 and March 2022 show the house plated 3 with a red awning, shutters and a timber door, and no bakery signage in any of them. The lock stands.
- **Durian Culture, 77 Sims Avenue, re-checked:** June 2024 ground-level frames show the tiled fruit stall but no Durian Culture name. The lock stands.
- **Pu Guang Tang Buddhist Society (5 Lorong 9) and Ji Yang Cai Clan Association (3 Lorong 9):** both are listed, but both sites (unnumbered ways 453797936 and 453797937) were behind construction hoarding in June 2024. Not modelled.
- **Teck Keow Association (26A Lorong 15) and Sin Chew Tan's Clan Association (28A), 10 October 2026:**
  - **Identity:** both are signed on the buildings north of Hotel 81 Spring, in the `l15-north` strip, with Ganh Xua at street level.
  - **Measurement:** two-panorama solutions place the façades about 4.8 m in front of the source block, near the modelled Lorong 15 carriageway, which the neighbouring hotel measurement does not share.
  - **Status:** locked as open question 15.
- **Geylang Road south block (way 454438330), 10 October 2026:** the façade depth is ambiguous between correlation (about 6 m forward) and corner triangulation (on the source line). Locked as open question 16.
- **No. 291 Geylang Road (open question 5), 10 October 2026:** outside the study's walkable bounds. Logged as open question 17.
- **BUILDERSmart lock, re-checked:** the BUILDERSmart boards hang on the house tagged No. 100 Sims Avenue, two doors west of Fok Wai Kee. Maps lists KBC Bargain Centre at No. 100 and BUILDERSmart at 29 Lor 13. The lock stands.

### 9 October 2026: leads checked and locked

- **Nos. 253–267 Geylang Road (ways 454254205–211), between Leong Kee and Lorong 13:**
  - **Signed tenants, June 2024:** 新福興, 客来顺 KE LAI SHUN RESTAURANT, INSTYLE HAIR SALON, SAMSUNG Mobile Time (its board is numbered **263**) and the Shi Hao corner.
  - **Listings:** Google Maps lists Mobile Time (Lor 13) at 263 Geylang Rd (open), with its point in way 454254207. Instyle's listing found is a different branch on Crawford Lane. Ke Lai Shun had no listing found.
  - **Footprint mismatch:** measured from the June 2024 far-side panoramas, Mobile Time spans about x 26–31 m and Instyle about x 20–26 m. Both straddle source party lines. Satellite imagery shows the row running about 3–4 m further east at the Lorong 13 corner than the source ways, while the Lorong 11 end roughly matches. The source bays (4.84 m) are therefore about 7% too narrow, and the misalignment grows eastward to about 2 m at No. 263.
  - **Status:** locked pending a re-spaced authored footprint for the row, approved by the user. This also covers the earlier Shi Hao lock.
- **Zui Xiang Lou (醉香楼), No. 273:** now listed on Google Maps at 273 Geylang Rd, 389326, **permanently closed**. It stays generic, following the ABC Bistro precedent.
- **Guan Keat (C4 correction lead):** the No. 291 corner coffeeshop carries an awning reading **GUAN KEAT PTE LTD … Esso LPG**, so Guan Keat is an LPG distributor whose branded awnings appear on coffeeshops. The GUAN KEAT valance at No. 38 Lorong 11 therefore does not by itself name that coffeeshop. Recorded against the C4 correction lead.
- **No. 291 Geylang Road, the Lorong 15 corner coffeeshop (way 454254230):**
  - **Signs:** June 2024 shows a blade sign reading 291 茶室 291 EATING HOUSE and a 333 砂煲田鸡粥 board on the side elevation.
  - **Listings:** ACRA-derived records give 291 Geylang Eating House Pte Ltd at this address (live, registered 2020, operating 333 Kitchen). Google Maps marks the "291 Eating House" listing permanently closed, but lists other stalls at No. 291 as open.
  - **Footprint:** satellite imagery shows the corner building about 3 m wider than the 5.13 m source way and running much further back along Lorong 15. Lorong 15 is also outside the derived road set.
  - **Status:** locked pending an authored corner footprint.
- **BUILDERSmart (魯班行), Sims Avenue:** June 2024 shows its signboard on the south-side row two doors west of Fok Wai Kee. Google Maps lists BUILDERSmart at **29 Lor 13 Geylang**, not on Sims Avenue, so the frontage's number and extent are unresolved. Locked.
- **Lorong 11 west side, Nos. 15–23: source unit widths are wrong.**
  - **New identities:** Google Maps lists **Goodwood Garments Services & Trading, 19 Lor 11 Geylang, 388711** (operating). Its 良木林 Goodwood board on the house north of Hok Tek Chi carries the number 19, which resolves the earlier "no listing" lock on identity. No. 21 is signed **藏密佛学研究会 Tibetan Buddhist Studies Society** (TBSS.ORG). No. 23 was signed aestmod auto in April 2024 with a 23 plate; that firm now lists an Ang Mo Kio address.
  - **Measured widths:** triangulating the party downpipes from three April 2024 panoramas about 10 m apart gives No. 15 **8.86 m** (two bays), No. 17 **5.13 m**, No. 19 **5.19 m** and No. 21 **5.38 m**. The source draws each at about 6.4 m. The fitted façade line runs parallel to the source front (342.8° against 342.7°).
  - **Checks:** the result puts the camera 4.9 m from the façade and 2.4 m above the pier bases, and makes the bollards about 1 m tall. A 6.4 m width would need a 3.05 m camera and 1.3 m bollards.
  - **Consequence:** the run's total length roughly agrees with the source, but its subdivision does not. Party lines drift by up to about 2.5 m against the source ways. The existing Hok Tek Chi model (No. 17) uses the 6.42 m source width.
  - **Status:** Goodwood (No. 19) and the Tibetan Buddhist Studies Society (No. 21) are locked pending a user-approved re-spacing of the Lorong 11 west row, which would also correct Hok Tek Chi.
- **Lorong 11 east side, other signs seen in April 2024:** HAO mart (single storey) at Nos. 30–32 was rejected by the user earlier. A L L Furniture is listed at 32 Lor 11. Kum Huat Shoe Merchant is listed at No. 16 (not yet checked against the frontage). 江苏酒家 at No. 20 is Q35 and Liu Da Ma at No. 26 is Q36.
- **Thirteen BBQ Bar 十三烤吧, 27 Lorong 13 (west side, near Sims Avenue):** Google Maps lists it at 27 Lor 13 Geylang, 388670 (open). April 2024 Street View shows a narrow three-storey building: a red 十三烤吧 board and BISTRO & BAR awning on the ground floor, a cream floor with louvred windows, and a blue top floor. The source ways here (1223454594–1223454598) have no numbers.
  - **Measurements:** render-and-compare from panorama `TkVxod6FJdS-GoG9rWW7YQ` puts its south party line on the source line between ways 1223454596 and 1223454595. Its north party line falls 1–2.4 m inside way 1223454594, depending on the camera distance. Triangulation with a second panorama puts the façade about 1.6 m in front of the source line.
  - **Neighbours:** the corner way 1223454594 holds a low tiled hardware shed, consistent with BUILDERSmart's listing at **29 Lor 13** (which also explains the BUILDERSmart lock below). The scaffolded building to the south appears to span two source ways.
  - **Status:** locked pending a resolved frontage width, for example from a square-on historical capture or a plan survey.
- **River Ash Bakery, 3 Lorong 13:** Google Maps lists it at 3 Lor 13 Geylang, First floor, 388641 (235 reviews). Its point falls in way 1223773758 (No. 1, Bar @ Lorong 13), and ACRA-derived records give a Jalan Pelikat address. April 2024 Street View of the house plated **3** (way 1223773753, between Bar @ Lorong 13 and K Group) shows a red awning, a closed shutter, a glass door and a timber door, but no bakery signage. Locked pending a photographed shopfront; this house completes the conserved row if confirmed.
- **Muhammadiyah Islamic College, 17 Lorong 13:** resolved and built as Q37.
- **Public Free Clinic Society HQ (大眾醫院), 10 Lorong 9, and Youth With A Mission, 8 Lorong 9 (east side, facing Lorong 9):** Google Maps lists both, and the PFCS point lies inside way 1223603460 (No. 10). June 2024 Street View shows the PFCS green curtain-wall tower, about 10 storeys, with 大眾醫院 / Public Free Clinic Society lettering at the base and 大眾醫院 at the top. A grey modern building with stepped balconies stands to its south.
  - **Blocker:** from the square-on panorama 7 m in front of the source front, the green tower spans only about half of No. 10's 13.05 m frontage. The grey building straddles the source line between Nos. 10 and 8. A calibration render from this pose also draws the generic row about 13 m out instead of 7 m, which needs explaining before any scale is trusted.
  - **Status:** locked pending a resolved split of No. 10's frontage and a checked pose.
- **Lorong 11 Nos. 1–7 (beside Hotel 81 Joy), further observation:** April 2024 square-on frames show one single-storey building with two orange-tiled hipped roofs and herringbone timber cladding, set back about 5 m behind a paved forecourt, across all four source ways. It needs an authored footprint; the existing lock stands.
- **Lorong 15 west side, Nos. 17–33:** Google Maps lists the AhlulBayt Educational & Cultural Centre and the Jaafari Muslim Association at **17**, Fu Shan Tan at **29** and Myths KTV & Disco Pub at **31**. April 2024 Street View shows three-storey breezeblock walk-ups (JAYTECH DEVICES and JF signs, temple flags) set back behind gated yards.
  - **Blocker:** satellite imagery shows these buildings behind open yards that the source ways (17, 17C, 17F, 17J, 25–33) cover as built footprints, and their front lines disagree by several metres. No AECC signage was identified in the frames examined.
  - **Status:** locked pending a frontage-to-number check; Lorong 15 is also outside the derived road set.
- **Durian Culture, 77 Sims Avenue (north side):** Google Maps lists Durian Culture (SG) Pte Ltd at 77 Sims Ave, 387419 (open 24 hours), with its point in way 439168813, tagged No. 77. June 2024 Street View shows a single-storey tiled fruit-stall building there, with no Durian Culture signage in the frames examined. Locked pending a photographed sign.
- **Mister Contracts, the two source ways tagged No. 9 Lorong 13 (re-check):** an April 2024 square-on frame shows the MISTER CONTRACTS PTE. LTD. / MC MULTI SKILLS TRAINING CONSULTANCY board on the northern house, next to Teck Hoe (No. 11), and an MC Multi Skills banner beside a vending machine on the southern house. No door plates are legible. Maps still gives Mister Contracts at No. 7. The lock stands.
- **Tongli Trading, 111 Sims Avenue:** its listed point falls on the study's north boundary, outside the irregular source ways nearby. Not pursued.
- **Lorong 11 No. 16:** Kum Huat Shoe Merchant is listed at 16 Lor 11 (no reviews), but no matching signage is visible in 2021, 2022 or April 2024 views. Not modelled.
- **Red Dot Running Company, 108 Sims Avenue:** Google Maps (213 reviews) and Time Out give 108 Sims Avenue, 387432. June 2024 Street View shows a large **108** on a white pier, with running-wear mannequins, mountain decals and a red-dot logo in the glass of the unit directly west of Amrise's recessed entrance.
  - **Measurements:** a square-on frame from panorama `YsOoBymJj446X2wJOG9R7w` places Amrise's photographed bay within 0.3–0.6 m of source No. 112. The next bay west, which holds the shop, measures about 7.9 m against source No. 110's 6.41 m. The 108 pier stands at its west end.
  - **Uncertainty:** that matches neither the source numbering (the shop would be in No. 110) nor a clean one-unit shift. A second panorama's frame disagrees by about 1.5 m along the street.
  - **Status:** locked pending a resolved unit-to-number mapping for Nos. 106–112. Ming Li's Eating House (114, the white Lorong 15 corner building) and FSL EW LED Lighting (118, across Lorong 15) are noted for the same row.
- **Amrise Hotel row, 106–114 Sims Avenue:** June 2024 Street View shows the pale-pink three-storey frontage continuing across Nos. 106–110, with a second oval Amrise sign above No. 106/108. That suggests the hotel occupies more than No. 112. The existing model assigns only No. 112; extending it needs an operator or listing confirmation of the hotel's extent.

### 7 October 2026: other leads checked and locked

- **Nanyang Lian Clan Association and Foochow Dionglok Association:** their signs were seen in June 2024 on a four-storey building on the south side of Geylang Road, opposite No. 277. Neither is in the SFCCA directory. The building lies inside the coarse 57 m source block 454438330, which spans several separate roofs. Locked pending an address and an estimated partial-block split.
- **ABC Bistro, 116 Sims Avenue:** Google Maps marks it permanently closed. Not modelled.
- **Zui Xiang (醉香楼), No. 273:** no corroborating listing found. Not modelled.
- **Ornate row at Nos. 3–9 Lorong 13 (west side), partly resolved:** No. 7 is now modelled as Hong Ye Chen (door number 7). The remaining houses are as follows. five conserved two-storey shophouses. Mister Contracts' Maps address is No. 7, and its point lies in way 1223773755, but its signboard hangs on the fifth house next to No. 11. The source also tags two ways as No. 9. The other tenants (an interior design firm, "HK") are unclear. Locked pending door-plate readings for each house.
- **ibis budget Singapore Gold, 121–127 Sims Avenue:** listed at 123 Sims Ave, with 44 rooms on five levels, built in 2022. Its entrance is in the westernmost bay of the yellow conserved block. The satellite places the block's tiled roofs about one bay west of the source row, and the five-level rear block's footprint and height are unresolved. Locked pending a plan decision.
- **Gems Ville, 8 Lorong 13 (condominium, completed 2025):** the source way is tagged 6A, is 23.3 × 15.3 m and predates the redevelopment. The completed building covers about 27 × 28 m on satellite imagery. Locked pending an authored footprint approved by the user.
- **Shi Hao Hotpot BBQ, 267 Geylang Road #01-01 (open):** a two-bay corner building with four arched upper windows, its Maps point in the Lorong 13 corner way. Satellite and two-panorama triangulation show a chamfered corner and a roof extending about 3 m east of the source row. Locked pending an estimated corner footprint.
- **Guan Keat coffeeshop, 38 Lorong 11 (correction lead for C4):** in April 2024, a banner reading 六福 LOK FU LALA POT … Newly Open, 38 Geylang Rd 11 (S)388730 hung inside the Guan Keat coffeeshop. The coffeeshop's awning valance reads GUAN KEAT PTE LTD, and a May 2024 OSM point names Guan Keat in the No. 38 way. Lok Fu was therefore a stall there, and Google Maps now lists it at Blk 1015 Geylang East Ave 3.
  - **Building:** a three-storey mint-green corner block with a chamfered Lorong 11 corner. Each upper floor has three small and three wide windows facing Sims Avenue.
  - **Mismatch:** the triangulated Sims face measures about 18.6 m to the chamfer, against the 23.17 m source side. The satellite shows the block overlapping No. 36's outline.
  - **Status:** the C4 identity should become "Guan Keat coffeeshop (Lok Fu stall, 2024)" once the footprint is resolved. The existing illustrative model is left unchanged for now.
- **Qionghai Association (新加坡瓊海同鄉會), about 137–139 Sims Avenue:** signed upstairs over LUCENT & LOO in June 2024. Its source ways (Nos. 135–145) are outside the derived map. Locked pending a map-scope extension.
- **Teck Hoe Airconditioning Parts, No. 11 Lorong 13:** the building is signed and plated 11 and matches its source tag, but the company is now listed at 8 Lorong 15. The front-wing setback and side canopy are also not resolved against the 8.77 m source frontage. Locked pending a current-use check and a plan check.

### 29 September 2026, 01:04 SGT: research blocked, manual follow-up

Started on clean `main` at `7b708e5`. Re-read project documentation, registry, models, geographic pipeline and tests. All sources below were accessed on 29 September 2026. No candidate was promoted to model-ready, and no model, asset or map geometry changed.

- **Q1:** The [federation directory](https://sfcca.sg/en/our-members/) still lists 24/24A; the [2023 heritage hunt](https://www.shhk.com.sg/newsroom/shhk-family-day-2023-hokkien-clans-heritage-hunt/) lists No. 24. Targeted English/Chinese and URA searches did not establish an attributable exterior for modelling. The directory's linked image could not be retrieved by the research tool. No visual claim is made. Way `1223250200` remains a candidate only; the 24A extent, frontage and current signage remain unresolved.
- **Q2:** The [operator contact page](https://www.pump.com.sg/index_files/contact.htm) still gives No. 36. Its undated address does not resolve the exterior or current occupancy. No model-ready evidence found in this pass.
- **Q3:** The [operator contact page](https://faithmissionhome.sg/contact/) still gives No. 12. A [DivorceCare listing](https://find.divorcecare.org/ministries/201377) surfaced in search with 12–14, but direct retrieval failed; this is an unverified lead, not a resolution of the existing 14A discrepancy. The operator contact page's image link also failed retrieval. Do not expand the footprint assignment from these results.
- **Q4–Q5:** The federation directory still lists S.M. Khek Leow at No. 4 and Canton Wong at 31A. Follow-up name searches did not resolve either exterior or the 31A unit extent. Both remain research-blocked.
- **Q6, new corroboration:** A [federation event notice for 22 March 2026](https://sfcca.sg/en/events/kueh-making-session-2026/) identifies Hainan Goh's venue as the second floor of 20C Lorong 11. This strengthens the dated location evidence, but establishes neither a whole-building occupation nor façade details. The retained map has Nos. 20 and 20B and no exact 20C tag; do not substitute either footprint. Mapping confidence remains low.

**Decision:** Preserve this research update without a commit, as required when research is insufficient. Manual follow-up needs a reliably attributed exterior and unit-to-footprint confirmation for at least one candidate, starting with Q1. Six supported research candidates remain unfinished, so the queue is not complete and the schedule has not been paused. Subsequent automated runs must honour the clean-checkout guard while this update remains uncommitted.

**Validation:** `npm test` passed 5/5 and `npm run build` passed with the existing large-chunk advisory. No scene visual check was applicable because the render is unchanged. No commit or push was made.

29 September 2026, continuation: clean checkout at `7b708e5`. Q1 still lacked an attributed Lorong 11 exterior; [older association material](https://hosankonghoey.blogspot.com/p/blog-page.html) gives different Geylang Road premises and was not used as a façade reference. Q2's undated operator address remains published, but [a third-party record](https://recordowl.com/company/shg-engineering-pte-ltd) reports an Ubi address change; current No. 36 occupancy remains unverified. These blockers prevented promotion. Q3's official contact-page photograph and retained named map point enabled the single Faith Mission Home model. Five candidates remain unfinished. Validation: six tests and production build passed; daylight browser inspection covered the lower entrance, upper screen and name, with no captured runtime warnings/errors. Existing Vite large-chunk advisory remains.

### 29 September 2026, 02:03 SGT: remaining candidates research-blocked

Started with a clean main checkout at `5f0f93d`. Reviewed README, project instructions, reference/asset notes, registry, models, geographic pipeline and tests. Q3 remains completed. All source accesses below were on **29 September 2026**; no candidate was promoted to model-ready.

- **Source-date clarification:** The [federation directory](https://sfcca.sg/en/our-members/), inspected in the browser, explicitly says it was updated as of **December 2024**. Fresh retrieval does not make its addresses a September 2026 occupancy survey. It continues to list Q1 at 24/24A, Q4 at 4, Q5 at 31A and Q6 at 20C (second storey).
- **Q1:** A further [SHHK heritage hunt notice from 2021](https://www.shhk.com.sg/newsroom/shhk-family-day-2021/) supports No. 24 historically but does not establish a usable elevation. The federation's linked image again failed retrieval through the research tool; browser inspection did not establish a usable exterior. The 24/24A extent, current signage and façade remain unresolved. No appearance was inferred from these sources.
- **Q2:** The [operator contact page](https://www.pump.com.sg/index_files/contact.htm) still publishes No. 36 without a date. This does not resolve the previously recorded conflicting address or current exterior. Keep the candidate unassigned.
- **Q4–Q5:** Targeted name searches and the federation entries did not resolve exterior appearance or occupancy extent. No. 31A still cannot be treated as evidence of whole-building occupation.
- **Q6:** The [22 March 2026 federation event notice](https://sfcca.sg/en/events/kueh-making-session-2026/) continues to identify the second-floor 20C venue. It supplies no resolution of the missing exact footprint match or façade.

**Decision:** Five supported candidates remain pending and research-blocked. Manual follow-up requires an attributable exterior and footprint/unit confirmation for at least one candidate, starting with Q1. Preserve this run record uncommitted under the insufficient-research rule. No model, asset, geometry, commit or push in this run. The queue is incomplete, so the schedule is not paused as completed. Subsequent runs must stop at the clean-checkout guard while this note remains uncommitted.

**Validation:** `npm test` passed 6/6; `npm run build` passed with the existing large-chunk advisory. No scene visual check was applicable to the unchanged render.

### 29 September 2026: Ho San Kong Hoey exterior resolved

Started clean at `2803b0d` after the user requested the next building. Re-read the required project context. Fresh SHHK and federation checks retain the listed address. Direct browser inspection of Google Maps supplied previously missing exterior evidence: two Google-captured panoramas dated April 2024 and supporting, older contributor photographs. The mapped point is within No. 24 and outside Nos. 22/26. Q1 was promoted and modelled as exactly one frontage, preserving source geometry. The 2019 lower storefront differs from the later view, so it was used only for number corroboration. Current occupancy and cadastral boundaries remain unverified. Q2/Q4/Q5/Q6 remain research-blocked; the queue is incomplete.

### 29 September 2026: Ho San Kong Hoey resumed and verified

Resumed the seven uncommitted Q1 files at `2803b0d` under the updated reconciliation instructions. The earlier run's recorded file edits and usage-limit interruption establish their origin; no unrelated changes, staged changes or untracked files were present. Preserved the model and re-inspected its April 2024 Google Street View reference. Corrected the review-link punctuation and replaced the obsolete queue guard with the current reconciliation rule.

**Validation:** `npm test` passed 7/7 and `npm run build` passed with the existing large-chunk advisory. Daylight browser inspection covered the lower openings, upper windows, shade and projecting sign at `?review=ho-san-kong-hoey`; no captured runtime warnings or errors. Source map geometry and assets remain unchanged. Q1 is ready for the single focused model commit. Q2/Q4/Q5/Q6 still need exterior/unit evidence; no second item was started and the schedule remains active.

### 29 September 2026: SHG Engineering dated exterior completed

Started clean on main at `38eb410` after the user requested the next item. Read project context, full diffs, queue, registry, models and tests. Fresh operator/directory research retained the current-address discrepancy. Direct Google Maps inspection resolved the previously missing exterior: April 2024 panorama, visible No. 36, corroborating former name and a mapped place point inside the source footprint. Q2 alone was selected and implemented as a dated exterior. Current occupancy and precise relocation timing remain unresolved. No second item started.

**Validation:** `npm test` passed 8/8; `npm run build` passed with the existing large-chunk advisory. Daylight browser inspection covered lower openings/No. 36, upper windows/grille, condensers, shade and roof edge, with no captured runtime warnings or errors. Source map coordinates and assets remain unchanged. Q2 is ready for its focused commit; Q4–Q6 still need research, so the schedule remains active.

### 29 September 2026: S.M. Khek Leow frontage in progress

Started clean on main at `1eba1ea`. Read required project context and inspected status/diffs/recent commits. Fresh SFCCA lookup retained No. 4; direct Google Maps inspection resolved the façade and single-unit assignment. April 2024 panorama `ifUFTPmGn1-kOv6waVHktw` shows the green frontage and association name; the mapped point is contained by No. 4 and excluded from all existing Agape assignments. Implemented Q4 only with original code-native geometry, estimated proportions and simplified ornament. The user interrupted after the four code/test edits, then requested resumption; those exact edits were preserved and documentation completed.

**Remaining / validation:** Run tests, production build and daylight browser inspection; resolve any issues before committing. No commit yet. Current condition and legal extent remain unknown, with no claims about either. If interrupted, resume Q4 only. Q5/Q6 remain research-blocked.

### 29 September 2026: S.M. Khek Leow resumed and validated

Resumed the seven uncommitted Q4 files at `1eba1ea`. The queue, provenance, registry, model and regression test consistently identify one interrupted item; no staged, untracked or unrelated changes were present. Preserved the implementation and re-inspected the recorded April 2024 Street View panorama. No new item started.

**Validation / completion:** `npm test` passed 9/9; `npm run build` passed with the existing large-chunk advisory; `git diff --check` passed. Daylight browser inspection covered the lower doors, readable fascia, tile fields, three upper windows, shallow arched heads, vents and cornice, with no captured runtime warnings or errors. Source map geometry, geographic scale and raster assets are unchanged. Q4 is complete and ready for its focused commit. Current condition and legal extent remain unverified. Q5/Q6 remain research-blocked, so the schedule stays active; investigate Q5 next after reconciling any unfinished work.

### 29 September 2026: Canton Wong research resolved

Started clean on main at `8a94d6f` for a research-only pass requested before implementation. The current [SFCCA directory](https://sfcca.sg/%E4%BC%9A%E9%A6%86%E7%9B%AE%E5%BD%95/) and the [SFCCA 2024–2027 member handbook](https://www.szetoclan.sg/wp-content/uploads/2025/02/V14_SFCCA-%E4%BC%9A%E5%91%98%E6%89%8B%E5%86%8C-2024-2027.pdf) both list Canton Wong Clan Association at 31A Lorong 11 Geylang with telephone 6742 7811. The handbook also gives the matching Chinese name, 新加坡广东黄氏宗亲会. These sources support the identity and upper-unit address, but not whole-building occupation.

[Google Street View, April 2024](https://www.google.com/maps/@?api=1&map_action=pano&pano=QQNp4tBAf9BWzHrMOUczcw&heading=227.2&pitch=6.4&fov=50), panorama `QQNp4tBAf9BWzHrMOUczcw`, camera at 1.3134122, 103.8768547, shows the red-and-gold association sign above the narrow stair entrance and a larger black-and-gold association sign across the upper storey. Visible No. 29 immediately to the south fixes the next 6.44-metre source frontage as No. 31, way `1223407878`; the Street View UI also labels the target 31 Lorong 11. The white upper elevation has dark framed windows, one visible condenser, a shallow roof edge and small square vents. The ground-floor electronics frontage is a separate commercial use and supplies no evidence of association occupancy; its branding, products and interior must be omitted. A May 2026 contributor image attached to the Maps listing depicts a different Wong association at 14-A and is explicitly rejected as misattributed evidence.

**Decision / build scope:** Q5 is model-ready as a conservative, dated April 2024 reconstruction of source footprint No. 31, with association-specific detail limited to the upper storey and 31A stair entrance. Preserve the footprint and approximately 6.44-metre frontage; use neutral opaque geometry for the separate ground-floor shop. Estimate dimensions and colours, simplify lettering and fittings, and omit private interiors, people, plants, temporary objects, commercial branding and legal-boundary claims. No implementation, tests, build, commit or push occurred in this research-only pass. Resume Q5 alone when the build model is restored.

### 29 September 2026: Canton Wong built and validated

Resumed Q5 at `8a94d6f` after the user requested implementation. The only pre-existing change was the attributable Q5 research note above, retained in this focused change. Inspected repository context, full staged/unstaged diff, registry, models and tests. Implemented the white elevation, broad five-pane upper window, shade, condenser and two original association nameboards. The separate ground-floor shop and stair opening are opaque; no private interiors or commercial branding are added. Source map geometry and raster assets are unchanged.

**Reference corrections:** The full [255-degree April 2024 view](https://www.google.com/maps/@?api=1&map_action=pano&pano=QQNp4tBAf9BWzHrMOUczcw&heading=255&pitch=18&fov=60) shows that the row of square roofline vents noted above belongs to No. 29, so it is omitted. Only the two small openings beside No. 31's condenser are represented, with no function asserted. Small doorway numbering was not reliably transcribed during this pass, so the model has no number plaque; 31A is supported by the federation address and matched association signs. The Maps point at 103.8767557, 1.3134921 falls outside No. 31 and is excluded as assignment evidence. Street View's No. 31 UI label is camera context only. These qualifications supersede the stronger wording in the preliminary research note.

**Validation / completion:** `npm test` passed 10/10, including No. 31/No. 29 adjacency and displaced-pin exclusion; `npm run build` passed with the existing large-chunk advisory; `git diff --check` passed. Daylight browser inspection verified the entrance sign, neutral shopfront, upper lettering, five-pane window, condenser and roof shade, with no captured runtime warnings or errors. Q5 is complete and ready for its focused commit. Q6 remains research-blocked, so the schedule stays active. No second item started.

### 29 September 2026: Hainan Goh exterior resolved

Started clean on main at `bdf36ed`, with no staged, unstaged or untracked changes. Read required context, full diffs, models, tests and recent commits. Fresh SFCCA directory and [22 March 2026 event notice](https://sfcca.sg/en/events/kueh-making-session-2026/) retain second-storey 20C. All accesses were on 29 September 2026.

Direct inspection of [April 2024 Street View](https://www.google.com/maps/@?api=1&map_action=pano&pano=64XRklcWkCBOa9KyrvJ_PA&heading=80&pitch=12&fov=75) and its [lower close-up](https://www.google.com/maps/@?api=1&map_action=pano&pano=64XRklcWkCBOa9KyrvJ_PA&heading=83&pitch=0&fov=40) resolved the exterior and footprint blocker: large association lettering and a signed right entrance share the lavender frontage with a ground-floor sign visibly numbered NO.20B. Assign source way 1223250202, between Nos. 22 and 20, without treating the second-storey address as another parcel. The Maps listing displays No. 20 and a displaced pin at 103.8772003, 1.3129254; neither determines the assignment.

**Completed work:** Q6 alone implemented as a dated code-native upper elevation and signed entrance, with neutral opaque ground-floor shop. Dimensions estimated; no private interior, copied photograph, map-coordinate change or adjoining restaurant branding. Provenance and assignment regression test added.

**Research decision:** Q6 became model-ready for this conservative April 2024 reconstruction. Present condition and legal extent remain unverified. Validation and completion are recorded below.

### 29 September 2026: Hainan Goh validated, bounded queue complete

**Validation / completion:** `npm test` passed 11/11; `npm run build` passed with the existing bundle-size advisory; `git diff --check` passed. Daylight browser inspection covered the opaque shop/entrance, readable entrance name, upper windows, pink surrounds, upper lettering and roof shade, with no captured runtime warnings or errors. The lower awning partly obscures the upper name from the close pedestrian review position. Source footprints, metre scale and raster assets are unchanged. Q6 is complete and ready for its single focused commit; no second item was started.

All four original landmarks and Q1–Q6 are complete within their documented fidelity limits. No supported pending or resumable item remains. Pause this scheduled task after the commit; the project is ready to be retargeted to another lorong. This is completion of the named-building queue, not a claim that every Lorong 11 façade or current tenant has been surveyed.

### 11 October 2026: rebuilding the widened ring (open question 26)

The widened bounds brought 57 unmodelled buildings into the map: the original five boundary blocks and 52 more. About 33 front a modelled road within 27 m and showed stock shop signs. The rest front lanes outside the road set and render as plain volumes. They are being rebuilt from June 2024 photographs, unnamed unless a listing and signage agree.

- **No. 291 Geylang Road, the Lorong 15 corner (way 454254230), unnamed exterior:**
  - Triangulating the party pilaster and the corner pier from two June 2024 panoramas puts the front on the source front, about 4.0 m wide against the 5.13 m source way.
  - The authored corner footprint proposed under open question 5 was **not needed**. The earlier "3 m wider" reading came from satellite roofs, which register loosely here, and a deeper footprint along Lorong 15 could not be confirmed.
  - The 291 Eating House listing is marked closed while the company stays live, so the boards and blade are blank.
- **Row east of Lorong 12, south side (`gr-260-east`), unnamed exterior:**
  - It holds three two-storey shophouses (green, yellow and white) and part of the grey house signed 268.
  - The party lines were triangulated from two June 2024 panoramas. They lie 4.8 m in front of the source front and give bays of about 5.0, 4.6 and 5.2 m. The grey|green line falls at 16.7 m, against the earlier split's 16.8 m.
  - The HAPPY PLACE TATTOO banner hangs over a closed frontage, so it is blank.
  - **Corrected reading (open question 29):** a cross-drive triangulation shows the 4.8 m offset is real, not a pose error: the row's façades stand north of the source front. The grey shophouse with a red 串 board stands inside `gr-258`, at about 11.0–16.7 m.
- **West end (`src/ring-west-layout.mjs`), unnamed exteriors:**
  - `gr-221-west`: the Peranakan row east of the Lorong 7 corner. It holds Gong He Guan (No. 217, listed and signed), BBQ Home (No. 219, closed), a white house, and the house with the Lor 9 Fresh Frog Porridge board. The triangulated party lines show the earlier Nos. 223–227 split sits about 4.5 m east of its photographed houses. That is open question 28; until it is settled, the boards are blank.
  - Way 453797928: the white Art Deco block dated 1939 on the west corner of Lorong 7.
  - No. 198 (454254201): a grey four-storey office block with multiple tenants, plus a narrow cream house at its west end.
  - Way 454254200: cream Art Deco shophouses with a curved west corner.
  - **Method:** all four were triangulated from two June 2024 panoramas. Their depth offsets range from 0.9 m behind to 1.3 m in front of the source fronts, and heights were corrected for that. The two blocks that straddle the west edge use oblique review starts inside the walkable bounds.
- **North-west corner (also in `src/ring-west-layout.mjs`):**
  - **Rozel Furniture**, 51 Sims Avenue (439168683), **named**: listed open, with its Maps point inside the way and its maroon boards on the building in June 2024. Its columns were triangulated from two panoramas.
  - The block behind it (1223603464) is drawn as massing only, since it is hidden from Sims Avenue.
  - The neoclassical building at **56 Sims Avenue** (1223603461) is signed HI HOTEL in June 2024, but Google Maps now lists Amrise Hotel Geylang at its point. The operator conflicts, so it is unnamed.
  - **21 Lorong 9** (1223407892) is an eight-storey apartment block with a louvred core and glass-railed balconies, roof at about 26.8 m.
- **Lorong 10 group (`src/ring-c-layout.mjs`):** seven ways, rebuilt from the June 2024 Lorong 10 drive. Both sides read about 2.4–2.7 m east of their sources; the shift is nearly equal on both sides, so it is treated as the drive's position error.
  - **Named after a listing check:**
    - **JH Hotel 嘉華酒店:** listed, point inside way 1223401721, board photographed.
    - **Nanyang Fan Clan General Association 南洋范氏總會:** listed at 11 Lor 10, point inside way 454438323, raised lettering photographed.
  - **Left unnamed, signs conflict with listings:**
    - The sign reading ibis budget SAPPHIRE is on a building whose point is listed as ibis budget Singapore Tulip.
    - The sign reading ibis budget HOTEL AMETRINE is on a building whose point is listed as ibis budget Singapore Olive.
  - **Left unnamed, three hotels on one way:** D'Nova Hotel and JXIN HOTEL are listed, but both share way 454438326 with the ibis block. Naming them needs that way split (open question 30).
- **Lorong 15 east and Sims Avenue Nos. 126–130 (`src/ring-a-layout.mjs`), unnamed exteriors:**
  - The four-storey commercial block on the Geylang Road / Lorong 15 east corner (No. 301), with its corner and two side faces.
  - No. 2 Lorong 15.
  - The two- and three-storey row north of No. 2, set 3.2–3.4 m in front of its source front.
  - The yard with shrine sheds and an old single-storey house.
  - Sims Avenue Nos. 126, 128 and 130 (the Lorong 17 west corner).
  - **Capture dates:** Lorong 15 has no June 2024 drive, so its faces are dated April 2024.
  - **No. 134 (682928733), the Lorong 17 east corner:** drawn as massing with its red awnings, unnamed. Its outline lies almost entirely outside the bounds, and the two drives disagree on its position by 3–4 m.
- **Lorong 12 group (`src/ring-b-layout.mjs`), unnamed exteriors:**
  - Way 454438320: a white nine-storey apartment tower at the north end and a lavender-blue four-storey hotel signed HOTEL 81 CHERRY at the south end, sharing one way.
  - The cream three-storey pair with association boards. It photographs 15 m wide against the 9 m way.
  - The Summer View apartment block at No. 5.
  - The ten-storey condominium at No. 9. Its front stands 8–10 m in front of the source, so the way looks like an older trace.
  - The garden house on the west side, set back.
  - The four-storey block north of No. 12.
  - The hotel at No. 12, signed YA JU HOTEL 雅居酒店.
  - **Method:** windows, fins and corners were matched between June 2024 panoramas, and each building is kept on its source front.
  - **Agent run:** it stalled after writing its files. The files were complete, so they were reviewed, tested and wired in.
  - **Named after a listing check:** **Ya Ju Hotel 雅居酒店**, No. 12. YAJU HOTEL is listed, its point lies inside way 121873031, and its sign was photographed.
  - **Left unnamed until their ways are split (open question 31):** Hotel 81 - Cherry, whose point is in 454438320 alongside the apartment tower. Also the Singapore Master Tailors' Association (3C) and the Chinese Eating House Owners' Association (10C), whose points are both in 454438319.

- **Lorongs 6 and 8, south of Geylang Road (`src/ring-south-layout.mjs`, built by the west-ring builder):** the edge ways left as generic blocks after the ring rebuild, because neither lane is modelled. They are seen down the lanes from Geylang Road, and their review starts stand in the lanes.
  - **Lorong 8, east side:** **Lex Hotel 樂斯旅店** at No. 1 (named: the listing point lies inside way 454438339 and its sign was photographed); the cream four-storey block over a car park across Nos. 7A and 11A, cut from one elevation at its three ways' party walls; and the pink house at No. 17B across its two ways.
  - **Lorong 8, west side:** the eight-storey apartment block in way 454438335, where the Maps address point for 6 Lor 8 Geylang lies.
  - **Lorong 6:** the eight-storey block on the west side (way 454438334), and Crystal Mansions on the east side (way 454274483), drawn from a repeating 14 m bay pattern read through trees.
  - **Method:** building ends and edges were triangulated from two June 2024 panoramas of each lane. Each building is kept on its source front, with the photographed elevation laid along it where the widths differ.
  - **Left unnamed (open question 32):** the Singapore Engineering Merchants' Association, whose lettering is on the cream block but whose point lies in the lane, and Crystal Mansions, whose point lies 0.5 m outside its way.
- **The last generic blocks, at the east and west edges:** with these, every footprint in the map has a photographed exterior or photographed massing, and the generic fallback draws nothing.
  - **Lorong 17 west side (`src/ring-east-layout.mjs`):** eleven three-storey walk-ups whose fronts face Lorong 17 beyond the east edge. Only their backs and roofs are visible from the modelled streets, so they are massing in the colours of their June 2024 fronts, about 14 m to the roof slabs, with satellite roof colours. Their association boards (S'pore Rattan Industry Association, Wee Ghee Athletic Association, 慕德同鄉會, Yang Clan General Association) are recorded but not named.
  - **Lorong 7 (`src/ring-west-layout.mjs`):** the four-storey associations building south of No. 8, unnamed with blank boards because it has many occupants, and No. 8 itself, a nine-storey condominium beyond the west edge drawn as massing.
  - **North of Sims Avenue, west of Rozel Furniture:** the long block beside the railway, hidden from Sims Avenue, drawn as massing at an estimated 16 m.
- **Lorong 12 listing check, 11 October 2026:** two more Lorong 12 exteriors meet the naming bar. **Summer View** at No. 5 (SUMMERVIEW, an apartment complex listed at 5B Lor 12 Geylang, point inside way 121873028; the SUMMER VIEW letters over its porch are drawn), and **Vintage & Vine** in the four-storey block north of No. 12 (a fine wine and spirits wholesaler, open, listed at 10 Lor 12 Geylang, point inside way 1223129485; its board over the ground-floor shop is drawn, with no claim about the upper floors). The evidence for the two shared ways now records their listings under open question 31.
- **Lorong 15 and Sims Avenue listing check, 11 October 2026:** **Bengal Kitchen** at No. 2 Lorong 15 is named: a coffee shop listed open at 2 Lor 15 Geylang, its point inside way 454254234, and its green board photographed in April 2024. Bamboo Lounge (listed at 128 Sims Ave) has its point in No. 126's way although its board hangs on No. 128, so it waits on open question 33. Full House F&B's point lies outside every way. Teck Hoe Airconditioning Parts is now listed at 8 Lor 15 Geylang, which is the block lettered TECK HOE in the Lorong 15 east row. That way also holds a pair of two-storey houses, and the listing point lies in the lane, so it is not named.
- **Open questions 32 and 33 applied, 11 October 2026:** three places are named from their photographed signs, with each listing point's offset recorded in the evidence.
  - **Bamboo Lounge 竹屋**, No. 128 Sims Avenue. Its neon board is drawn; its listing point lies in No. 126 next door, matching the row's 3 m shift.
  - **Singapore Engineering Merchants' Association 新加坡機器廠商公會**, on the balcony section of the Lorong 8 cream block (way 454438338). Its balcony lettering is drawn; its listing point lies 3 m out in Lorong 8.
  - **Crystal Mansions**, No. 3 Lorong 6. Its listing point lies 0.5 m outside the way. Triangulating the wall lettering from two panoramas moved the boundary wall to about 8 m in front of the source front, at the lane edge, with the gate at 13.6–14.5 m; the script Crystal Mansions and 3 LOR 6 are drawn north of the gate.
- **Open question 31 applied, 11 October 2026 (`lorong-12-east-shared` in `src/authored-footprints.mjs`):**
  - **Way 454438320** is split 10.5 m from its back-lane end into the unnamed white apartment tower and **Hotel 81 Cherry**. The hotel's listing point lies in its half; its teal HOTEL 81 board, the HOTEL 81 Cherry plate on the marble and the HOTEL 81 CHERRY blade are drawn.
  - **Way 454438319** is split at the pair's party pier, 4.46 m from its north end on the proportional layout. Each upper floor is named after its board, on the Canton Wong precedent:
    - north: the **Singapore Master Tailors' Association 新加坡軒轅洋服商會** (listed at 3C);
    - south: the **Chinese Eating House Owner's Association 華人飯商公會** (listed at 10C, an even number that conflicts with the east side; recorded).
  - Both association points lie in the pair's way, south of the pier. The ground-floor PEK SUN CHEN LEAN TUAN board and the Teoann Sianluck Heo Yeo Clan Society board stay blank.
  - **Re-spacing not done:** the pair photographs 15.0 m wide, but the hotel and Summer View leave only 12.8 m between them at the source front, so the proportional layout on the source way is kept.
- **Open question 30 applied, 11 October 2026 (`lorong-10-hotels`):** way 454438326 is split at 12.80 m and 37.87 m from its north corner, the measured block lines scaled to the source front. Each block now has its own outline and roof height:
  - **D'Nova Hotel** (taupe, 20.4 m): its gold clover board on the green fascia is drawn.
  - The **middle block** (25.3 m, wings 26.3 m): unnamed, because its ibis budget SAPPHIRE sign conflicts with the listed ibis budget Singapore Tulip.
  - **JXIN Hotel 嘉鑫酒店** (white, 29.1 m): its blue board is drawn.
  - Both named hotels have listing points inside their strips.
- **Open question 28 applied, 11 October 2026 (`geylang-217-227`, replacing the question 11 split `geylang-223-227`):**
  - **Triangulation:** party lines from four June 2024 panoramas (i-vt, U23w, NR4z, 2Y21) put the row about 1–1.5 m behind the source front, at 6.2, 10.4, 15.2 and 20.2 m from the Lorong 7 corner.
  - **Hidden lines:** a street tree hides the next two lines in 2024. Panoramas from 2009, 2011, 2016 and 2019 show the whole row and give the ratio of the two houses east of 20.2 m. Lian Seng's west party line triangulates at 29.35 m, so those cuts fall at 24.9 and 29.35 m.
  - **Named:** **Gong He Guan** at No. 217. It is a dessert restaurant listed open, with its point inside the strip; its red board is drawn.
  - **Unnamed:** BBQ Home at No. 219 (permanently closed) and the white No. 221.
  - **Re-targeted:** the frog-board house, the karaoke-mural house and the Red Leaf house now stand on their photographed strips. The duplicate frog-board house in the old `gr-221-west` is gone.
  - **Left for open question 34:** the remainder `gr-229-west` carries the west part of Lian Seng's photographed house with its board blank. The same triangulation shows Lian Seng and Vietnam Unisex modelled one house east of their photographs.
- **Open question 29 applied, 11 October 2026 (`geylang-258` re-split):**
  - **Re-split:** block 454438318 is now cut at 11.0 and 16.8 m from the Lorong 12 corner. ChongQingXiaoMian keeps the corner strip on the source front; its Lorong 12 elevation is unchanged.
  - **Grey house:** gets its own strip (`gr-258-grey`), modelled unnamed from two June 2024 panoramas: three louvred windows, a dark west pier with a lightbox, and a cream board ending in 串.
  - **Moved front:** the grey house and the rest of the row (`gr-260-east`) have their fronts moved 4.8 m towards Geylang Road, where two drives and the satellite roofs place them. That leaves about 2.2 m to the modelled carriageway.
- **Open question 34 applied, 11 October 2026:**
  - **Lian Seng Weighing Scale Co.** moves onto `gr-229-west`, the house photographed with its board at 29.35–34.7 m from the Lorong 7 corner. Its elevation is scaled to the 4.87 m strip.
  - **The Vietnam Unisex house** moves onto `gr-229` and stays unnamed.
  - **The freed `gr-231` strip:** checked by triangulation, it holds the west part of the white No. 233 building rather than a separate durian house. The WAT DHAMMASATIS board is at 41.35–43.6 m, on a storey set back about 4 m, and the durian vertical board at about 42.3 m. The strip is modelled unnamed with those boards blank, and the named Wat Dhammasatis model keeps its strip and board.
  - **Result:** the house order from Lorong 7 to Lorong 9 now matches the June 2024 photographs.

### 12 October 2026: Lorong 17 (open question 35)

Lorong 17 between Geylang Road and Sims Avenue is being built one building at a time, north up the west side and south down the east side. The full notes are in the [Lorong 17 brief](lorong-17-brief.md); questions for the owner go to [open questions](open-questions.md).

- **Map:** the lane's eleven new source ways, its seven road ways and the Geylang Road and Sims Avenue links to its junctions are taken by id. The lane and its junctions are walkable corridors beside the unchanged study rectangle.
- **Stop 1, No. 301 Geylang Road:** the corner block's Lorong 17 splay and face are modelled. The block is now named **Sheng Siong Supermarket and Anytime Fitness Geylang Central**: both are listed open at 301 Geylang Road with their point inside the way, and both signs are photographed. The earlier note that No. 301's occupants were not matched is superseded.
