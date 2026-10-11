# Public Free Clinic Society 大眾醫院 headquarters, 10 Lorong 9 Geylang

Research and implementation: **10 October 2026**. This resolves the 9 October lock, under the owner's answer to open question 11 (partial-block estimates).

## Evidence and assignment

- **Listing:** Google Maps lists **Public Free Clinic Society Headquarters (Geylang HQ)**, a free clinic, at **10 Lor 9 Geylang, Singapore 388758**. Its point lies inside [way 1223603460](https://www.openstreetmap.org/way/1223603460), which is tagged No. 10. The Institute of Chinese Medical Studies is also listed there.
- **Street View, June 2024:** panoramas `N-T1…` (square-on), `CCVS…` and `hv2-…` show:
  - the green glass curtain-wall tower, with **大眾醫院** in red on its white top band;
  - **大眾醫院 / Public Free Clinic Society** lettering over the ground-floor entrance;
  - a granite gate sign reading **大眾醫院 中醫學研究院 PUBLIC FREE CLINIC SOCIETY**;
  - a forecourt where the society's vans park.

## What resolved the lock

- **The lock:** a rectification at the source front showed the tower only about half as wide as the 13.1 m frontage. A calibration render also seemed to place the row too far out.
- **Re-measurement:** rectifying the three panoramas on planes parallel to the front shows that they agree only on a plane about **8 m behind** it. There the tower spans the full frontage, to within about 0.5 m in all three.
- **Explanation:** the tower is set back behind an 8 m forecourt. At the wrong depth, perspective compressed it to half width.
- **Satellite:** the registered satellite roof shows the tower set back by a similar amount.

## The footprint

The authored footprint `l9-10` keeps the source rear and sides behind a cut 8 m inside the front. The forecourt is left open and paved, with the gate sign at its front.

## Elevation

Read on the 8 m plane:

- ground storey to **4.3 m**, with the entrance lettering at 3.3–4.0 m;
- curtain wall from 4.6 m to **24.4 m**, with transoms every 2.65 m and ten mullion bays;
- lettered top band to **26.2 m**.

Render-and-compare from the square-on pose overlays the tower edges, curtain-wall grid and top lettering on the photograph.

## Omitted

The vans, flagpole, neighbouring stair core and the interior. The mullion pattern is simplified, and a few opening windows are suggested. The neighbouring Nos. 8 and 12 stay generic. Use `?review=public-free-clinic-society`. All **166 tests**, the type check and the build passed, with day and night renders and no console errors.
