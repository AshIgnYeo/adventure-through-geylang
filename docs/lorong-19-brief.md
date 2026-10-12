# Lorong 19 Geylang

Research and implementation from **12 October 2026**, under open question 42. This brief covers `src/lorong-19-layout.mjs`.

## Scope and method

- **Stretch:** Lorong 19 from Geylang Road to Sims Avenue, with the corner buildings at both ends of both sides. The part north of Sims Avenue, the Lorong Bachok row and the far sides of Geylang Road and Sims Avenue wait for a later pass.
- **Block faces:** the Geylang Road houses between Lorong 17 and Lorong 19 are taken in, because the Geylang Road link runs past them. Sims Avenue Nos. 136–144 wait for measurement. Both are [open question 43](open-questions.md).
- **Map:** `scripts/prepare-map.mjs` takes the lane's buildings and its seven road ways by id, with Lorong Bachok's mouth and the Geylang Road and Sims Avenue links from Lorong 17's junctions. The study rectangle is unchanged. The lane and both links are walkable corridors (`corridors` in `map.json`), carried about 16–21 m past Lorong 19's junctions to take in the east corners' faces.
- **Order:** north up the west side from Geylang Road, then south down the east side from Sims Avenue, then the Geylang Road houses west from the corner. Each stop is one photographed building, measured and modelled before the next.
- **Imagery:** the June 2024 Lorong 19 drive, southbound, from `7HvC…` at the Sims Avenue end to `_V35…` at Geylang Road, about 10 m apart, with the Geylang Road and Sims Avenue drives at the corners.
- **Naming:** unchanged. A business is named only when Google Maps lists it at that address and its sign shows in the photograph. Other buildings are labelled by address, with their signboards drawn and their lettering blank.
- **Code:** each place is a measured elevation on one edge of its footprint, built with the lane-house helpers shared with Lorong 17 (`src/lane-house-layout.mjs`, `src/lane-house.ts`).

## The walk

| Stop | Side | Source way | Building | Status |
| --- | --- | --- | --- | --- |
| 1 | West | 454254263 | No. 323 Geylang Road, the west corner: Eminent Frog Porridge & Seafood | Done; named; footprint with the Geylang Road row |
| 2 | West | 454254248 | No. 1, The Primero | |
| 3 | West | 476113985 | No. 3 | |
| 4 | West | 454254241 | No. 21, Nanyang Chee Clan Association | |
| 5 | West | 476113983 | No. 23 | |
| 6 | West | 476113984 | No. 25, Chee Hoe Hong | |
| 7 | West | 454254239 | No. 29, Lei Zang Si | |
| 8 | West | 454254309 | No. 33, Treasures @ G19 | |
| 9 | West | 454254310 | No. 146 Sims Avenue, the west corner | |
| 10 | East | 454254339 | No. 148 Sims Avenue, the east corner | |
| 11 | East | 454254314 | Kang Ha Pheng Sim Kok, 1 Lorong Bachok | |
| 12 | East | 454254247 | Bougainvilla Apartments | |
| 13 | East | 1223524381 | No. 6 | |
| 14 | East | 454254246 | Sims Point | |
| 15 | East | 454254168 | Nos. 325–333 Geylang Road, the east corner | |
| 16–20 | Geylang Road | 454254262 to 454254254 | Nos. 321 to 313, west from the corner | |

The names in the table are those Google Maps gives for each address. Whether a building is named in the model is decided at its stop.

## West side

### 1. Way 454254263: No. 323 Geylang Road, Eminent Frog Porridge & Seafood

A cream two-storey corner shophouse at Geylang Road and Lorong 19. It has salmon pilasters, maroon louvred shutters under louvred vents, a chamfered corner and a deep-eaved hipped roof.

- **Geylang Road front:**
  - a dark board reading **明輝田雞粥海鮮煮炒店 EMINENT FROG PORRIDGE & SEAFOOD (LOR 19)**, over a yellow frog lightbox;
  - a larger frog board and red $18 promotion boards at the corner.
- **Lorong 19 face:** six bays of windows over an arcaded five-foot way under blue Tiger awnings.
  - **Stall boards between the floors:** Changi Village Nasi Lemak, Heng Wang Seafood, **Eminent Frog Porridge**, Sin Kee Hainan Chicken Rice and B.B.Q Express.
  - A green **Lor 19 Geylang** street sign on the first bay.
  - At the north end, a vertical lightbox reading 明輝田雞粥 EMINENT FROG PORRIDGE 323.
- **Extension:** north of the two-storey block, a lower zinc-roofed shop with red promotion boards.

**Measurement:**
- **Lane face:** three June 2024 lane panoramas (`_V35…`, `PDfr…`, `ukZW…`) agree on it **3.5 m in front of** the source edge. The depth score between `_V35…` and `PDfr…` peaks sharply there.
  - On that plane the two-storey block runs from the corner, 0.4 m along the source edge, to its north end, 22.4 m along: about **22 m**, against the 28.71 m source edge.
  - The extension carries on to about 27 m.
- **Geylang Road front:** read square-on from `u07Y…` and `H9pO…`, about 0.4 m behind the source front.
  - It is about **7 m** wide, plus the chamfer.
  - Its party wall with No. 321 stands about 1.4 m east of the source line.
- **Result:** the building stands about 3.5 m east of its source outline, and is wider than mapped on Geylang Road.
- **Heights** (above the five-foot-way floor, the mean of the lane and Geylang Road readings):
  - five-foot way: 3.75 m;
  - first-floor ledge: 3.75–3.95 m;
  - stall boards: 4.05–4.7 m;
  - windows: 4.6–5.95 m;
  - vents: 6.15–6.55 m;
  - eaves: 7.5–7.7 m;
  - ridge: about 9.4 m.

**Layout:**
- The elevation is laid at its photographed scale from the corner on the source edges, with no stretching.
- The two-storey block is a raised volume with a hipped roof over the first 22 m (`upper` in the layout; the shared builder gained hipped upper roofs for it). The extension is the low shell.
- The Geylang Road front is a side face, laid from the corner (u = s − 3.5), so the westmost 2 m of the photographed front, a plain pilaster, falls off the source edge.
- The source front stands 0.1 m inside Geylang Road's estimated carriageway, so its street-level pieces are held within 0.25 m of the wall (`heldFlat` on the side).
- Authoring the footprint on its photographed position waits for the Geylang Road row (stops 16–20), whose party lines are also off their source lines, so the row goes to the owner as one question.

**Naming:** Google Maps lists **Eminent Frog Porridge & Seafood**, a porridge restaurant open until 4 am, at 323 Geylang Road, Singapore 389359. Its point lies inside this way.
- The listing and the photographed boards agree, so the shop board, both frog boards, the vertical lightbox and Eminent's own stall board are redrawn in original type.
- The other stall boards are not listed, and stay blank.
- This is the restaurant that left the Lorong 17 east corner (Lorong 17 stop 24).

Use `?review=eminent-frog-porridge`.
