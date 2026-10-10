# Geylang Road north side: Lian Seng and No. 231

Research and implementation: **10 October 2026**. The two Peranakan shophouses west of Wat Dhammasatis stand on the strips `gr-229` and `gr-231`, which were split from block 475158360 under open question 11. Both were read on panorama `2Y21…` rectified on the source front. There the photographed frontages measure 5.25 m and 4.17 m, against strips of 5.33 m and 4.30 m. Heights are read on the same road datum as the Wat Dhammasatis model.

## Lian Seng Weighing Scale Co., 229 Geylang Road

- **Identity:** Google Maps lists Lian Seng Weighing Scale Co. at 229 Geylang Rd, Singapore 389289. June 2024 shows its black board over the five-foot way.
- **Elevation:** two arched French windows with pale green louvred shutters, between pilasters with blue-and-white tiled panels. Above them are a frieze of green plaster ornament with round vents, a moulded cornice at about 6.9 m and a tiled roof, whose ridge is estimated.
- **Modelling:** the west party wall is about 2.5% off square, so the five-foot-way shell stands 10 cm inside it. The shared simple-house module gains a `shellInset` option for this; its default output is unchanged.

## No. 231 (unnamed)

- **Identity:** a VIETNAM UNISEX CONCEPT SPA & SALON board, but no listing was found, so it is unnamed and its board is blank.
- **Elevation:** the same elevation as No. 229, with teal shutters and pink tiled panels.

Use `?review=lian-seng` and `?review=gr-231`.

## The annex east of No. 237 (unnamed)

- **Footprint:** `gr-237-annex`, the annex half of source way 454274485 (open question 3), between the Lorong 9 corner building and Chen Hing.
- **What it looks like:** satellite imagery shows it under its own grey skylit roof. June 2024 Street View, though, shows the pink four-storey front continuing unbroken to Chen Hing, with one more bay of green-shuttered windows under hoods and the red ground storey carrying the coffeeshop on.
- **Modelling:** the corner building's storeys and colours continue across the annex. Before this, it rendered as a generic yellow shophouse with an invented sign.
- **Uncertainty:** the panoramas here carry large position errors (calibrated at Chen Hing), so the bay position is an estimate within about ±1 m. The east party wall slants back, so the five-foot way is kept 1.2 m deep. The simple-house module gains an `upperInset` option for this; its default output is unchanged.
