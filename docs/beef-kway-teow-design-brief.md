# Geylang Lor 9 Beef Kway Teow 芽龍九巷牛肉河粉, 237 Geylang Road

Research and implementation: **10 October 2026**. Q51, on an owner-approved authored footprint (open question 3).

## Evidence and assignment

- **Listing:** Google Maps lists **Lor 9 Beef Kway Teow**, a hawker stall, at **237 Geylang Rd, Singapore 389296**, open.
- **Street View, June 2024:** panoramas `6WnI…` (at the Lorong 9 junction), `BPsx…`, `CRxD…` and `kbMa…` show the pink three-storey corner building at Lorong 9 and Geylang Road. It carries:
  - a red **芽龍九巷牛肉河粉 GEYLANG LOR 9 BEEF KWAY TEOW** board on the Geylang Road front;
  - raised **勝捷** lettering over a **九巷牛河 LOR 9 BEEF KWAY TEOW** board on the chamfered corner;
  - a red **牛河大王** blade sign.

  The building has green-shuttered windows under louvred vents and projecting hoods, over a red ground storey with a five-foot way. Its long Lorong 9 face has about eight bays.

## The footprint

Source way [454274485](https://www.openstreetmap.org/way/454274485) holds two buildings.

- **Corner building:** the pink building's Geylang Road front ends where the source outline steps back, about 10.2 m from the Lorong 9 corner. Three pieces of evidence support this:
  - the photographed proportions;
  - a projection check of the source corners into the `BPsx…` frame;
  - the satellite roof, a brown roof about 10 m wide.
- **Annex:** east of the step, a separate annex under a grey skylit roof comes forward flush with Chen Hing.
- **Satellite registration:** a new satellite mosaic tool registers the imagery to the source frame. The imagery sits about 4.5 m west and 2 m south of it.
- **Authored footprints:** the way is split from the step, parallel to the Lorong 9 face:
  - `gr-237`, the corner building, with an estimated 2.6 m chamfer;
  - `gr-237-annex`, generic, its front filled forward to Chen Hing's corner.
- **Back lane:** the reviewed back-lane rear elevation still finds the replaced source way.

## Measurement limits

The Geylang Road panoramas here carry about 2 m of along-street pose error, even after the Chen Hing calibration. The heights below are therefore approximate:

- red ground storey to 4.75 m, five-foot way ceiling 3.2 m;
- lower windows 5.0–6.9 m and upper windows 9.4–11.35 m, each under louvred vents and hoods;
- parapet 13.0 m.

The Lorong 9 face is laid out from oblique views.

## What is modelled and omitted

- **Modelled:**
  - the Geylang Road front with three bays, the chamfer with its boards and lettering, and the Lorong 9 face with eight bays;
  - the red ground storey;
  - the boards and blade sign, redrawn originally.
- **Not modelled:** the stalls, furniture, umbrellas and the interior.
- **Annex:** stays generic.

Use `?review=lor-9-beef-kway-teow` and `?review=lor-9-beef-kway-teow-corner`. All **145 tests**, the type check and the build passed, with day and night renders and no console errors.
