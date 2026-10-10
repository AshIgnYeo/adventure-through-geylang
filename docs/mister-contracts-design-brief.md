# Mister Contracts / MC Multi Skills, the northern No. 9 Lorong 13 house

Research and implementation: **10 October 2026**. Q42, built under the owner's 10 October 2026 decision, open question 12: a clearly signed occupant may be modelled when published addresses disagree, with the conflict recorded.

## Evidence and assignment

- **Signage:** April 2024 Street View (`HaY-y7EfW3SXOm-83rKMAw`, `uh9Y_1rGJSeI8vjJVZDDHg`) shows a navy **MISTER CONTRACTS PTE. LTD. / MC MULTI SKILLS TRAINING CONSULTANCY** signboard on this conserved two-storey house.
- **Footprint:** [way 1223773757](https://www.openstreetmap.org/way/1223773757) is the northern of the two source ways tagged **No. 9**, beside No. 11. An MC Multi Skills banner and a vending machine stand at the southern No. 9 house (way 1223773756), which is not assigned.
- **Address conflict, recorded rather than resolved:**
  - the signboard's own address line reads **5 Lorong 13 Geylang, Singapore 388643**, the K Group house;
  - Google Maps lists Mister Contracts at **No. 7**, the Hong Ye Chen house;
  - the source tags this house **No. 9**.

  The model is a dated exterior of the signed house. It makes no claim about the company's registered address.

## How it was measured

- **Elevation:** the house shares the row elevation measured at No. 7 (`row13-layout.mjs`): five-foot-way ceiling, upper floor line, fretwork eaves and roof.
- **Positions:** windows, pilasters and the signboard were read from a square-on rectification at the source front. They were centred on the frontage by aligning the south party pilaster with the row's 0.3 m pilaster.
- **Heights:** the side windows here sit about 0.25 m lower than at No. 7 (5.15–7.48 m), and the central French window runs from 4.2 m. The signboard spans 3.24–4.06 m.
- **Render-and-compare:** from the square-on pose, the model's windows, tile panels, signboard and grille lie within about 0.3 m of the photograph.

## What is modelled

- **Upper storey:** two side windows and a central French window between pilasters, with floral tile panels under the side windows.
- **Shared with the row:** the fretwork eaves and the tiled roof.
- **Signboard:** redrawn originally, with the yellow MC panel, the three trade labels and the telephone numbers.
- **Five-foot way:** a full-height white grille closes it, in front of a lattice screen, with a vending machine behind.

## What is omitted or estimated

- **Not modelled:** the signboard's small Tamil and Bengali lines, the Dry Riser Breeching Inlet sign, plants and the interior.
- **Simplified:** the grille pattern.
- **Estimates:** the five-foot-way depth.

## Review and validation

Use `?review=mister-contracts`.

All **124 tests**, the type check and the build passed. New checks cover:

- the assignment between the two No. 9 houses, with the address conflict recorded in the evidence;
- the row constants;
- the elevation order;
- fittings inside the outline;
- the walkable start.

Day and night renders showed no console errors.
