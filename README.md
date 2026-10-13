# Adventure Through Geylang

An evolving, browser-based 3D reconstruction of Geylang, Singapore.

The project documents the character of the neighbourhood through a walkable streetscape: its shophouses, places of worship, clan associations, eating houses, back lanes and the small architectural details that make each stretch recognisable. The current study centres on Lorong 11 and its connections to Geylang Road, Sims Avenue, Lorong 9, Lorong 13, Lorong 15, Lorong 17 and Lorong 19.

This is now primarily an environment and rendering project. The walking controls are an inspection tool for exploring the model at street level. The repository is intended to be a useful base for visualisations, interactive documentaries, education, architectural studies, installations, games and other creative work.

## What is included

- A metre-scale street layout derived from retained OpenStreetMap data.
- A first-person desktop and mobile viewer built with PlayCanvas, TypeScript and Vite.
- Daylight, blue-hour and night lighting modes.
- Reference-led models of 132 named buildings and landmarks, and photograph-led unnamed exteriors across the study area.
- A mapped pedestrian back lane between Lorong 9 and Lorong 11.
- Source notes, modelling decisions and uncertainty records for reviewed places.
- Automated checks for map scale, footprint assignment, walkable clearance and selected model geometry.

The current named places include Shan Yuan Tang, Masjid Haji Mohd Salleh, Leong Kee (Klang) Bak Kut Teh, Mongkok Dim Sum, Nanyang Dentist and Shaxian Eatery (dated exteriors), Rozel Furniture, JH Hotel, the Nanyang Fan Clan General Association, Ya Ju Hotel, Sheng Siong Supermarket and Anytime Fitness Geylang Central at No. 301 Geylang Road, on Lorong 17 Feng Shang Hair Salon, the General Board of True Jesus Mission, the Yang Clan General Association, the Gyaltsap Tashi Ling Buddhist Society, Bright Star Hotel, the Singapore Chinaware Merchants Association and the Singapore Rattan Industry Association, on Lorong 19 Eminent Frog Porridge & Seafood, The Primero, the Nanyang Chee Clan Association, Chee Hoe Hong, Lei Zang Si, Starlon and Tektron Pacific, He Ping Claypot Rice Restaurant, Kang Ha Pheng Sim Kok, Bougainvilla Apartments, Sims Point and, at its Geylang Road corner, Straits Laundry, Nanyang Hardware and Romance Adult Shop, between Lorong 17 and Lorong 19 Mary Hair Salon and Scarlett Supermarket @ Geylang on Geylang Road and Lefon Sewing Machine & Machinery, the Guangxi and Gaozhou Association with Bali Nasi Lemak, Bikemart SG and Vietsea II on Sims Avenue, Fok Wai Kee Hardware, QianJing Crystal, Golden Jade Restaurant, 277 KTV, Eros, RR Motor, the Buddhist Art Centre, Eat First, the Sik Wai Sin frontage, K Hotel 1515, the Lam Clan Association, the Hainan Lim Clan Association building, the Sui Yuan Ju Buddhist Society, the Singapore Chong Min Association, Foo Hui Ging Xiu Centre, Hong Ye Chen Interior Design, K Group, Plus Mobile, Lanna Thai Traditional Massage, JiangSu Jiu Jia, Liu Da Ma BBQ, the Muhammadiyah Islamic College, FSL EW LED Lighting, Bar @ Lorong 13, Chen Hing Trading, the AiSecurityReady shop at No. 2 Lorong 11, Mister Contracts, Eng Lee Huat Hardware, Goodwood Garments, the Tibetan Buddhist Studies Society, Zheng Li Hearty Kitchen, Ting Yu Xuan, Ke Lai Shun Restaurant, Mobile Time, Shi Hao Hotpot BBQ, Geylang Lor 9 Beef Kway Teow, Wat Dhammasatis, Red Dot Running Company, the Guan Keat coffeeshop at No. 38 Lorong 11, Ming Li's Eating House, Lian Seng Weighing Scale Co., Tian Tian Minimart, TakeToys, ChongQingXiaoMian, Monster Ink, Shadow Tattoo (a dated exterior), the Nanyang Lian Clan Association building, Sin Chew Tan's Clan Association, the Teck Keow Association, Hong Sheng Koon, the Singapore Ship-Chandlers Association, the AhlulBayt Educational & Cultural Centre, Hotel 81 Spring, ibis budget Singapore Gold, Red Flag Store (Davco), the Yi Xiu Factory Building, Shi Cheng Temple, the Public Free Clinic Society headquarters, YWAM Singapore, Kim Court, The Diamond, Cico Flooring, Gems Ville, Thirteen BBQ Bar, BUILDERSmart, Teck Hoe Airconditioning Parts, Wunderfolks, Instyle Hair Salon and Yap Sun Hardware (dated exteriors), Hotel 81 Joy and several Lorong 11 associations and community premises. The [reference notes](docs/lorong-11-references.md) and [building queue](docs/lorong-11-building-queue.md) record the full set.

## Run locally

You need a current Node.js installation.

```sh
git clone https://github.com/AshIgnYeo/adventure-through-geylang.git
cd adventure-through-geylang
npm install
npm run dev
```

Open the local address printed by Vite. To view it on a phone, use the printed network address while the phone and computer are connected to the same local network.

For a production build and the geometry checks:

```sh
npm run build
npm test
```

No account, location access or microphone permission is required. The completed build makes no live mapping requests.

## Explore the render

- **Desktop:** click the scene to capture the mouse, look around as in a first-person game, and use WASD to walk. Press Escape to release the mouse and open the menu.
- **Keyboard look:** choose keyboard controls in the menu, then use the arrow keys to look and WASD to walk.
- **Phone or tablet:** landscape orientation is recommended. Use the left joystick to walk and drag on the right to look.
- **Menu:** choose the time of day, control mode, touch controls and walking speed, or return to the starting position.

Review URLs can open directly opposite a model. For example:

```text
/?review=shan-yuan-tang
/?review=leong-kee
/?review=haji-mohd-salleh-mosque
/?review=mongkok-dim-sum
/?review=nanyang-dentist
/?review=shaxian-eatery
/?review=rozel-furniture
/?review=gong-he-guan
/?review=jh-hotel
/?review=nanyang-fan-clan
/?review=dnova-hotel
/?review=jxin-hotel
/?review=yaju-hotel
/?review=lex-hotel
/?review=summer-view
/?review=vintage-and-vine
/?review=bengal-kitchen
/?review=bamboo-lounge
/?review=engineering-merchants
/?review=crystal-mansions
/?review=hotel-81-cherry
/?review=master-tailors
/?review=chinese-eating-house-owners
/?review=lor-9-frog-porridge
/?review=amrise-hotel
/?review=thye-seng
/?review=sims-131-133-pair
/?review=fok-wai-kee
/?review=golden-jade
/?review=gr-273
/?review=ktv-277
/?review=eros
/?review=rr-motor
/?review=buddhist-art-centre
/?review=eat-first
/?review=sik-wai-sin
/?review=k-hotel-1515
/?review=lam-clan
/?review=hainan-lim
/?review=sui-yuan-ju
/?review=chong-min
/?review=foo-hui-siaw-lim-pair
/?review=hong-ye-chen
/?review=lorong-13-row
/?review=plus-mobile
/?review=lanna-thai
/?review=jiangsu
/?review=liu-da-ma
/?review=muhammadiyah-college
/?review=fsl-led-lighting
/?review=bar-lorong-13
/?review=chen-hing
/?review=aisecurityready
/?review=mister-contracts
/?review=eng-lee-huat
/?review=goodwood
/?review=tbss
/?review=zheng-li
/?review=ting-yu-xuan
/?review=ke-lai-shun
/?review=gr-257
/?review=instyle
/?review=mobile-time
/?review=shi-hao
/?review=shi-hao-corner
/?review=lor-9-beef-kway-teow
/?review=wat-dhammasatis
/?review=lian-seng
/?review=gr-231
/?review=gr-233-west
/?review=gr-227
/?review=gr-237-annex
/?review=tian-tian
/?review=taketoys
/?review=gr-224
/?review=gr-236
/?review=monster-ink
/?review=shadow-tattoo
/?review=nanyang-lian
/?review=red-dot-running
/?review=sa-106
/?review=yap-sun
/?review=sims-116
/?review=buildersmart-sims
/?review=sa-98
/?review=ibis-budget-gold
/?review=red-flag-davco
/?review=sims-north-pair
/?review=yi-xiu-factory-building
/?review=shi-cheng-temple
/?review=sa-77
/?review=guan-keat
/?review=ming-li
/?review=hotel-81-spring
/?review=sin-chew-tan
/?review=teck-keow
/?review=hong-sheng-koon
/?review=ship-chandlers
/?review=l15-cream
/?review=aecc-jmas
/?review=l15-33
/?review=l15-7
/?review=l15-1
/?review=public-free-clinic-society
/?review=ywam-singapore
/?review=l9-12
/?review=kim-court
/?review=the-diamond
/?review=cico-flooring
/?review=gems-ville
/?review=thirteen-bbq
/?review=buildersmart
/?review=teck-hoe
/?review=l13-15de
/?review=l13-9s
/?review=l13-3
/?review=l13-25
/?review=l13-21-23
/?review=wunderfolks
/?review=l13-28
/?review=l13-24
/?review=l13-20
/?review=l13-18
/?review=l13-16
/?review=l13-12a
/?review=sims-96
/?review=gr-269-corner
/?review=l13-269-north
/?review=l13-shi-hao-north
/?review=temple-back-alley-east
/?review=l11-15
/?review=l11-23
/?review=l11-25
/?review=l11-27
/?review=l11-29a
/?review=l11-33
/?review=l11-16
/?review=l11-18
/?review=l11-22
/?review=l11-28
/?review=l11-30-32
/?review=eminent-frog-porridge
/?review=the-primero
/?review=nanyang-chee
/?review=chee-hoe-hong
/?review=lei-zang-si
/?review=starlon-tektron
/?review=he-ping
/?review=kang-ha-pheng
/?review=bougainvilla
/?review=sims-point
/?review=straits-laundry-331
/?review=mary-hair-salon
/?review=scarlett-supermarket
/?review=lefon-sewing
/?review=guangxi-gaozhou
/?review=bike-mart
/?review=vietsea-ii
```

These are inspection starts, rather than navigation or tracking features.

## Geographic and visual fidelity

The original OpenStreetMap extract is retained at `public/osm-source.osm`. The preparation script produces `public/map.json`, preserving geographic coordinates, way identifiers, one-way tags and source building footprints. Projection and rendering use metres, without compressing the streets. The metre conversion is tested against an independent haversine calculation.

The source extract covers `103.8758,1.3110,103.8812,1.3155` and was retrieved on 28 September 2026. It contains 86 main road ways (Lorong 15, then Lorongs 9, 10 and 12, were added to the derived road set on 10 October 2026, Lorong 17 with its Geylang Road and Sims Avenue links on 12 October, and Lorong 19 with its links back to Lorong 17 and Lorong Bachok's mouth the same day), 242 building outlines, two alley or footway ways and one Lorong 9 access-context way. The study bounds were widened on 10 October (open question 26), to 103.87597–103.87859 E and 1.31150–1.31425 N, to take in the boundary blocks. Lorong 17 (open question 35) is taken by its own ways rather than by widening the rectangle again: its eleven new buildings and its road ways are listed by id, and the lane and its two junctions are walkable corridors (`corridors` in `map.json`). Lorong 19 (open question 42) is taken the same way: its fifteen buildings and the Geylang Road and Sims Avenue houses back to Lorong 17 (open question 43), with the lane and the Geylang Road and Sims Avenue links from Lorong 17's junctions as corridors. Under open questions 44–46 its buildings stand on authored footprints on their photographed positions.

This is a researched reconstruction, rather than a survey-grade digital twin. Footprints usually come from the map data, while heights, road widths, pavements, awnings, furniture and obscured architectural details may be estimated. Shan Yuan Tang uses an explicitly documented authored footprint because it is absent from the retained source map. Mongkok Dim Sum occupies an estimated corner portion of a larger mapped block. Private interiors are not reconstructed.

Named landmarks are matched deliberately to addresses, mapped features and visual references. The documentation distinguishes current sources from historical photographs, estimates from observations, and whole-building identities from upper-floor or partial-block premises. Unverified buildings are not assigned real names. Across the study area they are rebuilt from dated photographs as unnamed exteriors, with blank boards. Every footprint in the map now has a photographed exterior or photographed massing.

Detailed provenance is available in:

- [Lorong 11 reference notes](docs/lorong-11-references.md)
- [Building research queue](docs/lorong-11-building-queue.md)
- [Open questions](docs/open-questions.md)
- [Shan Yuan Tang design brief](docs/shan-yuan-tang-design-brief.md)
- [Temple-side back lane brief](docs/temple-back-alley-design-brief.md)
- [Mongkok Dim Sum design brief](docs/mongkok-dim-sum-design-brief.md)
- [Geylang Lor 9 Fresh Frog Porridge design brief](docs/lor-9-frog-porridge-design-brief.md)
- [Amrise Hotel design brief](docs/amrise-hotel-design-brief.md)
- [Thye Seng Hardware design brief](docs/thye-seng-design-brief.md)
- [Buddhist Art Centre design brief](docs/buddhist-art-centre-design-brief.md)
- [Eat First design brief](docs/eat-first-design-brief.md)
- [K Hotel 1515 design brief](docs/k-hotel-design-brief.md)
- [Sik Wai Sin frontage design brief](docs/sik-wai-sin-design-brief.md)
- [RR Motor design brief](docs/rr-motor-design-brief.md)
- [Golden Jade Restaurant design brief](docs/golden-jade-design-brief.md)
- [277 KTV design brief](docs/ktv-277-design-brief.md)
- [Eros Adult Shop design brief](docs/eros-design-brief.md)
- [Lam Clan Association design brief](docs/lam-clan-design-brief.md)
- [Hainan Lim Clan Association building design brief](docs/hainan-lim-design-brief.md)
- [Sui Yuan Ju Buddhist Society design brief](docs/sui-yuan-ju-design-brief.md)
- [Chong Min Association and Yun Teck Sian Tng design brief](docs/chong-min-design-brief.md)
- [Foo Hui Ging Xiu Centre and Siaw Lim Hood Sun Thong design brief](docs/foo-hui-design-brief.md)
- [Normal Stainless Steel and QianJing Crystal design brief](docs/sims-north-design-brief.md)
- [Fok Wai Kee Hardware design brief](docs/fok-wai-kee-design-brief.md)
- [Hong Ye Chen Interior Design design brief](docs/hong-ye-chen-design-brief.md)
- [K Group design brief](docs/k-group-design-brief.md)
- [Plus Mobile design brief](docs/plus-mobile-design-brief.md)
- [Lanna Thai Traditional Massage design brief](docs/lanna-thai-design-brief.md)
- [JiangSu Jiu Jia design brief](docs/jiangsu-design-brief.md)
- [Liu Da Ma BBQ design brief](docs/liu-da-ma-design-brief.md)
- [Muhammadiyah Islamic College design brief](docs/muhammadiyah-design-brief.md)
- [FSL EW LED Lighting design brief](docs/fsl-design-brief.md)
- [Bar @ Lorong 13 design brief](docs/bar-lorong-13-design-brief.md)
- [Chen Hing Trading design brief](docs/chen-hing-design-brief.md)
- [AiSecurityReady, No. 2 Lorong 11 design brief](docs/aisecurity-design-brief.md)
- [Mister Contracts design brief](docs/mister-contracts-design-brief.md)
- [Eng Lee Huat Hardware design brief](docs/eng-lee-huat-design-brief.md)
- [Goodwood Garments design brief](docs/goodwood-design-brief.md)
- [Tibetan Buddhist Studies Society design brief](docs/tbss-design-brief.md)
- [Zheng Li Hearty Kitchen design brief](docs/zheng-li-design-brief.md)
- [Geylang Road Nos. 255–267 design brief](docs/geylang-row-design-brief.md)
- [Geylang Lor 9 Beef Kway Teow design brief](docs/beef-kway-teow-design-brief.md)
- [Wat Dhammasatis design brief](docs/wat-dhammasatis-design-brief.md)
- [Red Dot Running Company design brief](docs/red-dot-design-brief.md)
- [Guan Keat coffeeshop design brief](docs/guan-keat-design-brief.md)
- [Ming Li's Eating House design brief](docs/ming-li-design-brief.md)
- [Hotel 81 Spring design brief](docs/hotel-81-spring-design-brief.md)
- [Public Free Clinic Society design brief](docs/pfcs-design-brief.md)
- [Cico Flooring design brief](docs/cico-design-brief.md)
- [Gems Ville design brief](docs/gems-ville-design-brief.md)
- [Lorong 13 street module design brief](docs/lorong-13-design-brief.md)
- [Lorong 11 street module brief](docs/lorong-11-street-brief.md)
- [Sims Avenue south row infill brief](docs/sims-south-brief.md)
- [ibis budget Singapore Gold design brief](docs/ibis-gold-brief.md)
- [Sims Avenue north side brief](docs/sims-north-row-brief.md)
- [Lorong 9 brief](docs/lorong-9-brief.md)
- [Geylang Road north side, west of the Lorong 9 corner](docs/geylang-north-brief.md)
- [Geylang Road south side, Nos. 218–250](docs/geylang-south-brief.md)
- [Lorong 15 brief](docs/lorong-15-brief.md)
- [Lorong 17 brief](docs/lorong-17-brief.md)
- [Lorong 19 brief](docs/lorong-19-brief.md)

## Project structure

```text
public/              retained map data, derived map data and texture atlases
scripts/             map preparation tools
src/                 viewer, world generation and landmark models
tests/               geographic and model-assignment checks
docs/                research, provenance and modelling limitations
```

Most landmark detail is built from code-native geometry so it can be adjusted without external modelling software. A small number of façades use original reconstruction texture atlases. Reference photographs are linked in the documentation and are not distributed as project assets.

## Extending the streetscape

A useful addition begins with evidence, rather than geometry. Confirm the place name and address, match it to a source footprint where possible, inspect dated exterior references, and record uncertainty before modelling. Preserve the geographic scale and source coordinates. Keep inferred details conservative, especially when a building contains several premises or the available photograph does not show the full elevation.

New work should include its provenance notes and the narrowest useful geometry checks. Run `npm test` and `npm run build`, then inspect the model from street level before committing it.

## Reuse and licensing

The project's original code and project-original assets are available under the [MIT Licence](LICENSE). They may be used, copied, modified and distributed, including for commercial work, subject to the licence terms.

The retained OpenStreetMap extract and derived map data are separately covered by the [Open Database Licence 1.0](LICENSE-DATA.md). Third-party packages retain their own licences. Linked reference photographs and external source material are not part of the distributed asset set.

## Status

The Lorong 11 study is usable as a walkable desktop render and remains under active refinement. Surrounding streets are context rather than a complete model of Geylang. Current priorities are expanding the mapped area, improving façade fidelity and documenting each addition carefully.

The earlier multiplayer game concept is on hold. Its absence from the current roadmap keeps the repository focused on the streetscape itself and leaves downstream uses open.
