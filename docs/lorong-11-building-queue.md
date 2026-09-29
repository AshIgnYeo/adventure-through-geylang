# Lorong 11 building research queue

Created: 29 September 2026 (Asia/Singapore). First clean automation run, based on commit `2460bdd`. This is a queue of named premises supported by sources, not a survey of every building or a claim that each organisation occupies an entire footprint.

## How to use this queue

Read the README, [reference notes](lorong-11-references.md), landmark registry, models and tests before each run. Inspect the full staged/unstaged diff, untracked files and recent commits. Resume pre-existing changes only when evidence clearly identifies one unfinished Lorong 11 queue item from an earlier run. Preserve and finish that item before selecting another. Stop without editing or committing conflicting paths if changes are unrelated, mix items, appear user-authored or have uncertain intent. Work in the main checkout; never push. This reconciliation rule supersedes the clean-checkout guard mentioned in historical run records below.

The four existing reference-led models below count as completed. Their documented limitations remain. New entries are ordered for research, with address-supported candidates distinguished from model-ready candidates. Before modelling, make a small fresh source check and record access dates, changed addresses, conflicting evidence and remaining blockers here. An address match alone does not establish a visible façade, a property boundary or current occupancy of the whole building.

For the next run, reconcile unfinished work first, then investigate the first pending entry in queue order (currently Q5). Promote an entry to **pending, model-ready** only after evidence supports its footprint assignment and enough exterior features for a conservative reconstruction. Do not model an unresolved entry simply to fill a run. If research remains insufficient, preserve the evidence and report the blocker for manual follow-up without a model commit. Research-blocked entries are unfinished, not completed models. When no supported pending or resumable item remains after review, make no modelling changes, pause the scheduled task and report readiness to retarget.

Each later successful run models exactly one place. Preserve the original footprint coordinates and metre scale. Use code-native geometry, original or appropriately licensed/generated assets, and explicitly document estimated dimensions and reconstructed details. Do not ship reference photographs or infer private interiors, activities, affiliations, signage or precise ornament. Keep the commit to that place, its provenance/queue updates, related assets and tests. Require `npm test`, `npm run build` and the narrowest useful visual check when possible before committing.

## Mapping evidence

All way IDs below were checked against the retained `public/osm-source.osm` extract and `public/map.json`, retrieved **28 September 2026** and inspected **29 September 2026**. Source: [OpenStreetMap extract](https://api.openstreetmap.org/api/0.6/map?bbox=103.8758,1.3110,103.8812,1.3155), [ODbL attribution and licence](https://www.openstreetmap.org/copyright). These are source footprint IDs, not cadastral identifiers. New candidate matches use the stored street/house-number tags and remain provisional until exterior/location evidence corroborates them. No new map data or geometry was introduced in this run.

## Completed models

### C1. Hotel 81 Joy

- **Address / footprint:** 11 Lorong 11 Geylang, Singapore 388703; [way 454274491](https://www.openstreetmap.org/way/454274491).
- **Sources / access:** [official operator](https://www.wwhotels.com/hotel-81/joy/), accessed 29 September 2026; existing photograph inspection recorded 28 September 2026.
- **Confidence / uncertainty:** High for name and street address; mapped number agrees. Existing height, fins, windows and entrance dimensions are estimates from photographs, not measured elevations.
- **Status / blocker:** Completed (`hotel-81-joy` in registry and model code). No blocker to counting it as completed; current façade accuracy remains limited by reference dates.

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

Q1–Q4 are **completed**. Q2 and Q4 represent dated April 2024 exteriors. Q5–Q6 remain **pending, research-blocked**, with no bespoke model or registry assignment. Source access date for each is **29 September 2026**. Confidence refers separately to the address evidence and the model assignment; no remaining candidate is currently model-ready. Named organisations are included only as candidates for their externally evidenced premises.

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

Source for each: [Singapore Federation of Chinese Clan Associations member directory](https://sfcca.sg/en/our-members/), accessed 29 September 2026. This federation publication supports the listed names and addresses, but is not a façade survey. Q4 is completed following exterior corroboration; Q5–Q6 remain pending and research-blocked.

| ID / name | Listed address (Lorong 11 Geylang) | Footprint candidate | Confidence, uncertainty and blocker |
| --- | --- | --- | --- |
| Q4. S.M. Khek Leow Clan Association, completed | 4, Singapore 388696 | Assigned [1223250215](https://www.openstreetmap.org/way/1223250215), tagged 4 | High for the name/address link, medium for broad dated appearance and single-frontage assignment. April 2024 Street View shows the Chinese name; the association point falls within No. 4. Current condition and legal extent unverified. Completed as `sm-khek-leow`, with automated and daylight visual validation; [provenance](lorong-11-references.md#sm-khek-leow-clan-association-no-4). |
| Q5. Canton Wong Clan Association | 31A, Singapore 388723 | [1223407878](https://www.openstreetmap.org/way/1223407878), tagged 31; provisional parent building only | Moderate address confidence. Resolve suffix/unit and exterior; do not assign the whole building. |
| Q6. Hainan Goh Clan Association | 20C, second storey, Singapore 388712 | Unresolved; no 20C tag in retained map | Moderate address confidence, low mapping confidence. Resolve unit/footprint and exterior; do not substitute mapped 20 or 20B. |

## Research boundaries and run record

Broad searches covered Lorong 11 named premises, operator contact pages, URA conservation records and federation listings. Generic address-only shophouses, nearby streets and business-registration-only leads were not promoted to candidates. Search results using an older hotel name at No. 11 do not create a second building entry. This is a bounded initial research queue, not an exhaustive tenant inventory.

29 September 2026: checked the clean main checkout, README, reference/asset notes, registry, model implementation, geographic source pipeline and existing tests. Recorded four completed models and six supported research candidates. The initial queue adds no model, asset or geometry. All future façade claims require actual visual source inspection; retrieving page text or a photo caption alone does not satisfy that requirement.

Validation: `npm test` passed all five tests; `npm run build` passed, with Vite's existing large-chunk advisory. An additional read-only check confirmed all 11 referenced way IDs exist in both retained map files and have Lorong 11 street tags in `map.json`. No scene visual check was needed for this documentation-only change.

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
