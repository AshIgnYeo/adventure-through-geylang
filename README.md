# Adventure Through Geylang

An evolving, browser-based 3D reconstruction of Geylang, Singapore.

The project documents the character of the neighbourhood through a walkable streetscape: its shophouses, places of worship, clan associations, eating houses, back lanes and the small architectural details that make each stretch recognisable. The current study centres on Lorong 11 and its connections to Geylang Road, Lorong 9 and Lorong 13.

This is now primarily an environment and rendering project. The walking controls are an inspection tool for exploring the model at street level. The repository is intended to be a useful base for visualisations, interactive documentaries, education, architectural studies, installations, games and other creative work.

## What is included

- A metre-scale street layout derived from retained OpenStreetMap data.
- A first-person desktop and mobile viewer built with PlayCanvas, TypeScript and Vite.
- Daylight, blue-hour and night lighting modes.
- Reference-led models of 26 named buildings and landmarks.
- A mapped pedestrian back lane between Lorong 9 and Lorong 11.
- Source notes, modelling decisions and uncertainty records for reviewed places.
- Automated checks for map scale, footprint assignment, walkable clearance and selected model geometry.

The current named places include Shan Yuan Tang, Masjid Haji Mohd Salleh, Leong Kee (Klang) Bak Kut Teh, Mongkok Dim Sum, Golden Jade Restaurant, 277 KTV, RR Motor, the Buddhist Art Centre, Eat First, the Sik Wai Sin frontage, K Hotel 1515, the Lam Clan Association, the Hainan Lim Clan Association building, Hotel 81 Joy and several Lorong 11 associations and community premises. The [reference notes](docs/lorong-11-references.md) and [building queue](docs/lorong-11-building-queue.md) record the full set.

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
/?review=lor-9-frog-porridge
/?review=amrise-hotel
/?review=thye-seng
/?review=golden-jade
/?review=ktv-277
/?review=rr-motor
/?review=buddhist-art-centre
/?review=eat-first
/?review=sik-wai-sin
/?review=k-hotel-1515
/?review=lam-clan
/?review=hainan-lim
/?review=temple-back-alley-east
```

These are inspection starts, rather than navigation or tracking features.

## Geographic and visual fidelity

The original OpenStreetMap extract is retained at `public/osm-source.osm`. The preparation script produces `public/map.json`, preserving geographic coordinates, way identifiers, one-way tags and source building footprints. Projection and rendering use metres, without compressing the streets. The metre conversion is tested against an independent haversine calculation.

The source extract covers `103.8758,1.3110,103.8812,1.3155` and was retrieved on 28 September 2026. It contains 34 main road ways, 154 building outlines, two alley or footway ways and one Lorong 9 access-context way.

This is a researched reconstruction, rather than a survey-grade digital twin. Footprints usually come from the map data, while heights, road widths, pavements, awnings, furniture and obscured architectural details may be estimated. Shan Yuan Tang uses an explicitly documented authored footprint because it is absent from the retained source map. Mongkok Dim Sum occupies an estimated corner portion of a larger mapped block. Private interiors are not reconstructed.

Named landmarks are matched deliberately to addresses, mapped features and visual references. The documentation distinguishes current sources from historical photographs, estimates from observations, and whole-building identities from upper-floor or partial-block premises. Unverified buildings remain generic and are not assigned real names.

Detailed provenance is available in:

- [Lorong 11 reference notes](docs/lorong-11-references.md)
- [Building research queue](docs/lorong-11-building-queue.md)
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
- [Lam Clan Association design brief](docs/lam-clan-design-brief.md)
- [Hainan Lim Clan Association building design brief](docs/hainan-lim-design-brief.md)

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
