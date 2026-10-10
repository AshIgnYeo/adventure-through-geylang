# Geylang Road Nos. 255–267: Ting Yu Xuan, Ke Lai Shun, Mobile Time and Shi Hao Hotpot BBQ

Research and implementation: **10 October 2026**. Q47–Q50. The four places stand on the owner-approved re-spaced row between Leong Kee and Lorong 13 (open question 2). Nos. 257 and 261 stay generic.

## The re-spaced row

- **Measurement:** six June 2024 far-side panoramas (`x9pb…`, `EWi2…`, `-O10…`, `Euug…`, `qlix…`, `I1fs…`) were rectified on the source street front. They agree with the façade about 0.5 m behind it.
- **Party lines,** measured along the front from the Leong Kee corner:

  | Line | Measured (m) | Source (m) |
  | --- | --- | --- |
  | Leong Kee / 听雨轩 | 14.1 (14.52 kept) | 14.54 |
  | 听雨轩 / 新福興 | 19.7 | 19.39 |
  | 新福興 / 客来顺 | 24.9 | 24.23 |
  | 客来顺 / Instyle | 30.15 | 29.08 |
  | Instyle / Mobile Time | 36.0 | 33.93 |
  | Mobile Time / Shi Hao | 41.4 | 38.77 |
  | Shi Hao front face end | 49.75, then an estimated 0.8 m chamfer | 48.47 |

- **Shi Hao corner:** the Lorong 13 face was measured from three Lorong 13 panoramas (`pE_L…`, `KZ8g…`, `DHtc…`). They agree, using the blue side door, with the face about **2.1 m** east of the source edge.
- **Leong Kee:** it keeps its three source bays, which places No. 253 within the corner building. This is consistent with 新福興's board reading #257 and Ting Yu Xuan's listing at No. 255.

## The places

| No. | Place | Listing | Signage, June 2024 |
| --- | --- | --- | --- |
| 255 | Ting Yu Xuan 听雨轩, foot reflexology | Google Maps: Ting Yu Xuan Pte Ltd, 255 Geylang Rd, 389312 | cream 听雨轩 Ting Yu Xuan board numbered 255, 听雨轩 blade sign |
| 257 | (generic) | Sin Hock Heng Eating House, **permanently closed** | shuttered, 新福興 board #257 |
| 259 | Ke Lai Shun Restaurant 客来顺饭店 | Google Maps: 259 Geylang Rd, 389315, open | red 客来顺 KE LAI SHUN RESTAURANT board, red blade numbered 259 |
| 261 | (generic) | Instyle Hair is listed only at Crawford Lane | INSTYLE HAIR SALON board |
| 263 | Mobile Time (Lor 13) | Google Maps: 263 Geylang Rd, 389319 | black SAMSUNG / Mobile Time board numbered 263, purple SIMBA awning |
| 267 | Shi Hao Hotpot BBQ 食好火锅烧烤 | Google Maps: 267 Geylang Rd #01-01, 389688 | grey 食好火锅烧烤 SHI HAO Hot Pot BBQ board on both faces; RISING SUN TATTOOS and CHOK DEE blade signs |

## How each was measured

All four were read square-on on the street-front rectification, using the panorama nearest each house, at zoom 5.

- **No. 255:** photographed 5.6 m wide but modelled in the 5.18 m bay that keeps Leong Kee's line, with positions scaled by 0.925. It has two shuttered windows at 4.19–5.67 m, vents at 5.96–6.43 m, a parapet to 7.96 m and the board at 2.5–3.21 m.
- **No. 259:** 5.25 m. Two windows with open grey shutters at 4.1–5.64 m, vents at 5.9–6.36 m, a parapet to 7.93 m and the board at 2.33–3.6 m.
- **No. 263:** 5.4 m. Three arched white-shuttered windows at 3.93–5.71 m, under eaves at 6.6 m and a tiled roof, which is estimated as hipped. The board is at 2.96–3.86 m, over the SIMBA awning.
- **No. 267:** 8.35 m of front. Four arched windows between three pilasters at 4.14–5.71 m, eaves at 7.21 m under a hipped tiled roof, and the board at 2.39–3.74 m. The Lorong 13 face repeats the board and four windows, simplified from oblique views.

Render-and-compare from two far-side panoramas puts the boards, windows and party lines on their photographed positions. The estimated hipped roofs were lowered after the first render showed them above the photographed rooflines.

## Shared module

`simple-house-layout.mjs` and `simple-house.ts` provide a reusable measured elevation for plain shophouses:

- bands, windows (arched, surrounded or shuttered), vents, pilasters and piers;
- signboards, double-faced blade signs and an awning with a valance;
- back-wall fittings, rooftop sheds and flat or hipped roofs.

Each place supplies its measurements and sign drawings.

## Omitted or estimated

- **Not modelled:** photographs, posters, menus, phone displays, brand marks beyond plain lettering, and interiors.
- **Unread sign:** the teal blade sign on No. 255 could not be read and is left blank.
- **Estimates:** roofs, rooftop sheds, five-foot-way depths, and Shi Hao's possible rear annex, which is not drawn.

Use `?review=ting-yu-xuan`, `?review=ke-lai-shun`, `?review=mobile-time`, `?review=shi-hao` and `?review=shi-hao-corner`. All **141 tests**, the type check and the build passed, with day and night renders and no console errors.
