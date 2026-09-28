# Lorong 11 building research queue

Created: 29 September 2026 (Asia/Singapore). First clean automation run, based on commit `2460bdd`. This is a queue of named premises supported by sources, not a survey of every building or a claim that each organisation occupies an entire footprint.

## How to use this queue

Read the README, [reference notes](lorong-11-references.md), landmark registry, models and tests before each run. Stop without repository edits or commits if the checkout has any pre-existing changes, including untracked files. Work in the main checkout; never push.

The four existing reference-led models below count as completed. Their documented limitations remain. New entries are ordered for research, with address-supported candidates distinguished from model-ready candidates. Before modelling, make a small fresh source check and record access dates, changed addresses, conflicting evidence and remaining blockers here. An address match alone does not establish a visible façade, a property boundary or current occupancy of the whole building.

For the next run, investigate Q1 first, then the next adequately supported entry if Q1 cannot be resolved. Promote an entry to **pending, model-ready** only after evidence supports its footprint assignment and enough exterior features for a conservative reconstruction. Do not model an unresolved entry simply to fill a run. If research remains insufficient, preserve the evidence and report the blocker for manual follow-up without a model commit. Research-blocked entries are unfinished, not completed models. When no supported pending item remains after review, make no modelling changes, pause the scheduled task and report readiness to retarget.

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

## Pending research

All six entries below are **pending, research-blocked**, with no bespoke model or registry assignment. Source access date for each is **29 September 2026**. Confidence refers separately to the address evidence and the model assignment; none is currently model-ready. Named organisations are included only as candidates for their externally evidenced premises.

### Q1. Ho San Kong Hoey premises

- **Address / footprint:** 24/24A Lorong 11 Geylang, Singapore 388716; candidate [way 1223250200](https://www.openstreetmap.org/way/1223250200), tagged No. 24. No separate 24A outline is established.
- **Sources:** [federation member directory](https://sfcca.sg/en/our-members/) and [Singapore Hokkien Huay Kuan's 2023 heritage hunt](https://www.shhk.com.sg/newsroom/shhk-family-day-2023-hokkien-clans-heritage-hunt/), which identifies a visit location at No. 24.
- **Confidence / uncertainty:** High for the listed address; medium for footprint assignment. A heritage visit location is stronger than a generic registration listing, but does not verify current appearance.
- **Blocker / next evidence:** Inspect a reliably attributed exterior, verify the 24/24A extent and current signage before modelling. No façade details approved yet.

### Q2. SHG Engineering premises

- **Address / footprint:** 36 Lorong 11 Geylang, Singapore 388728; candidate [way 1223250208](https://www.openstreetmap.org/way/1223250208), tagged No. 36.
- **Sources:** [operator contact page](https://www.pump.com.sg/index_files/contact.htm).
- **Confidence / uncertainty:** High for the address published by the operator; medium for footprint assignment. The page is undated and does not establish present tenancy, a visible shopfront or an industrial building form.
- **Blocker / next evidence:** Obtain current exterior/location corroboration. Do not infer equipment, workshop interiors, branding or street activity from the company name.

### Q3. Faith Mission Home premises

- **Address / footprint:** Operator gives 12 Lorong 11 Geylang Road, Singapore 388704; candidate [way 1223250210](https://www.openstreetmap.org/way/1223250210), tagged No. 12. The alternate No. 14A assignment is unresolved.
- **Sources:** [operator contact](https://faithmissionhome.sg/contact/), [operator home page](https://faithmissionhome.sg/). [Third-party registration listing](https://www.sgpbusiness.com/company/Faith-Mission-Home-Ltd) gives 14A Lorong 11 Geylang, Singapore 388706 and is recorded solely as conflicting evidence.
- **Confidence / uncertainty:** High that the operator publishes No. 12; low for an exact frontage/extent until the discrepancy is resolved. Do not assume a move or a historic renumbering.
- **Blocker / next evidence:** Reconcile No. 12 versus 14A using reliable location/exterior evidence; verify which entrance and unit belong to the named premises. No façade or signage approved yet.

### Q4–Q6. Federation-supported premises requiring exterior confirmation

Source for each: [Singapore Federation of Chinese Clan Associations member directory](https://sfcca.sg/en/our-members/), accessed 29 September 2026. This federation publication supports the listed names and addresses, but is not a façade survey. Each remains pending and research-blocked.

| ID / name | Listed address (Lorong 11 Geylang) | Footprint candidate | Confidence, uncertainty and blocker |
| --- | --- | --- | --- |
| Q4. S.M. Khek Leow Clan Association | 4, Singapore 388696 | [1223250215](https://www.openstreetmap.org/way/1223250215), tagged 4 | Moderate address confidence. Exterior, occupancy extent and signage unverified; corroborate before modelling. |
| Q5. Canton Wong Clan Association | 31A, Singapore 388723 | [1223407878](https://www.openstreetmap.org/way/1223407878), tagged 31; provisional parent building only | Moderate address confidence. Resolve suffix/unit and exterior; do not assign the whole building. |
| Q6. Hainan Goh Clan Association | 20C, second storey, Singapore 388712 | Unresolved; no 20C tag in retained map | Moderate address confidence, low mapping confidence. Resolve unit/footprint and exterior; do not substitute mapped 20 or 20B. |

## Research boundaries and run record

Broad searches covered Lorong 11 named premises, operator contact pages, URA conservation records and federation listings. Generic address-only shophouses, nearby streets and business-registration-only leads were not promoted to candidates. Search results using an older hotel name at No. 11 do not create a second building entry. This is a bounded initial research queue, not an exhaustive tenant inventory.

29 September 2026: checked the clean main checkout, README, reference/asset notes, registry, model implementation, geographic source pipeline and existing tests. Recorded four completed models and six supported research candidates. The initial queue adds no model, asset or geometry. All future façade claims require actual visual source inspection; retrieving page text or a photo caption alone does not satisfy that requirement.

Validation: `npm test` passed all five tests; `npm run build` passed, with Vite's existing large-chunk advisory. An additional read-only check confirmed all 11 referenced way IDs exist in both retained map files and have Lorong 11 street tags in `map.json`. No scene visual check was needed for this documentation-only change.
