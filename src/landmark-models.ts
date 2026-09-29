import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { landmarkFor } from './landmarks.mjs';

export type FacadeFrame = { a: Point; dx: number; dz: number; nx: number; nz: number; width: number };

/** Small bespoke models share the existing metre-scale geographic frame. */
export function buildLandmark(world: World, id: string, f: FacadeFrame, atlas: pc.Material) {
  const place = landmarkFor(id);
  if (!place) return false;
  const { a, dx, dz, nx, nz, width: w } = f;
  const angle = Math.atan2(nx, nz) * 180 / Math.PI;
  const pt = (u: number, d = 0): Point => [a[0] + dx * u + nx * d, a[1] + dz * u + nz * d];
  const box = (name: string, u: number, y: number, d: number, width: number, h: number, depth: number, colour: string, glow = 0) => {
    const p = pt(u, d);
    return world.box(name, p[0], y, p[1], width, h, depth, world.mat(colour, glow), undefined, angle);
  };
  const panel = (u: number, width: number, base: number, top: number, d: number, mat: pc.Material, uv?: number[]) => world.panel(pt(u, d), pt(u + width, d), base, top, mat, uv);
  const sign = (text: string, u: number, width: number, base: number, h: number, bg: string, fg: string, d = .12) => panel(u, width, base, base + h, d, world.textMaterial(text, bg, fg, .08, width / h));
  const window = (u: number, y: number, width: number, height: number) => {
    box('window surround', u, y, .055, width + .12, height + .12, .12, '#dfe5e0');
    box('recessed glass', u, y, .125, width, height, .035, '#587783');
    box('window mullion', u, y, .15, .045, height, .025, '#dde5e1');
    box('window sill', u, y - height / 2, .19, width + .18, .075, .32, '#ced8d6');
  };

  if (place.kind === 'shg') {
    // No. 36 in April 2024 Street View. Historical exterior only; present
    // occupancy is unresolved. Proportions and obscured openings are estimates.
    const plaster = '#c2d0c4', trim = '#d3d9cc', dark = '#303b37';
    panel(0, w, .15, place.height, .015, world.mat(plaster));
    box('shg parapet coping', w / 2, place.height, .06, w, .12, .25, '#6c7770');
    box('shg upper sill course', w / 2, 3.96, .12, w, .12, .25, trim);
    for (const [start, span] of [[.055, .515], [.665, .29]]) {
      panel(w * start, w * span, 4.98, 6.58, .08, world.mat('#303b3b'));
      for (const u of [start, start + span]) box('shg window jamb', w * u, 5.78, .14, .065, 1.69, .09, trim);
      box('shg window sill', w * (start + span / 2), 4.96, .18, w * span + .12, .09, .28, trim);
    }
    // Simplified grille and frame spacing, not a measured bar count.
    for (let i = 0; i <= 12; i++) box('shg upper grille upright', w * (.055 + .515 * i / 12), 5.78, .19, .023, 1.6, .035, '#555b50');
    for (let i = 1; i <= 7; i++) box('shg upper grille rail', w * .3125, 4.98 + 1.6 * i / 8, .20, w * .515, .022, .04, '#555b50');
    for (let i = 1; i < 4; i++) box('shg right window mullion', w * (.665 + .29 * i / 4), 5.78, .18, .04, 1.6, .06, '#727d76');
    box('shg right window transom', w * .81, 6.19, .18, w * .29, .05, .06, '#727d76');
    const shade = box('shg upper shade', w / 2, 6.72, .40, w, .08, .88, '#aebfaf');
    shade.rotateLocal(7, 0, 0);
    for (const u of [.16, .90]) {
      box('shg condenser bracket', w * u, 4.02, .38, .95, .06, .68, '#777d73');
      box('shg condenser casing', w * u, 4.39, .39, .91, .64, .44, '#d4d1bb');
      for (let i = 0; i < 7; i++) box('shg condenser grille', w * u - .08, 4.16 + i * .065, .62, .57, .025, .035, '#92998c');
    }
    panel(w * .07, w * .58, .16, 2.87, .055, world.mat(dark));
    panel(w * .74, w * .18, .16, 2.87, .055, world.mat('#403b32'));
    for (const u of [.045, .69, .965]) box('shg ground pier', w * u, 1.59, .17, .18, 2.88, .31, trim);
    for (const start of [.07, .59]) for (let i = 0; i < 4; i++) box('shg folded frontage grille', w * start + i * .065, 1.48, .13, .025, 2.61, .08, '#667e77');
    for (let i = 0; i <= 5; i++) box('shg doorway grille', w * (.74 + .18 * i / 5), 1.47, .14, .026, 2.6, .045, '#7e8170');
    for (const y of [.70, 1.38, 2.10]) box('shg doorway rail', w * .83, y, .15, w * .18, .035, .05, '#7e8170');
    box('shg lower lintel', w / 2, 3.03, .12, w, .26, .23, plaster);
    sign('36', w * .746, .29, 2.50, .21, '#403b32', '#e4ded1', .18);
    const awning = box('shg dark awning', w / 2, 3.58, .87, w, .085, 1.8, '#4b4c45');
    awning.rotateLocal(13, 0, 0);
    box('shg awning valance', w / 2, 3.32, 1.74, w, .17, .045, '#55554a');
    // The observed blade is retained, but indistinct lettering and small
    // product signs are omitted instead of inventing a modern SHG shop sign.
    box('shg pale blade sign', .09, 4.91, .50, .11, 2.03, .57, '#d8d6be');
    return true;
  }

  if (place.kind === 'ho-san') {
    // April 2024 Street View: one white shophouse, two dark window groups,
    // blue-grey upper shade, red awning and projecting association sign.
    // Dimensions and obscured lower openings are conservative estimates.
    const plaster = '#deded4', blue = '#82a8bd', red = '#8b3942';
    panel(0, w, .15, place.height, .015, world.mat(plaster));
    panel(0, w, .15, 3.35, .04, world.mat(blue));
    // Retain opaque exterior surfaces; no private interior or temporary displays.
    panel(w * .055, w * .40, .16, 2.9, .07, world.mat('#303a3b'));
    for (const u of [.06, .27, .45]) box('ho san entrance frame', w * u, 1.53, .10, .06, 2.76, .06, '#777d78');
    box('ho san entrance transom', w * .255, 2.57, .11, w * .40, .065, .07, '#777d78');
    panel(w * .53, w * .435, .16, 3.16, .07, world.mat('#b5b8b0'));
    for (let y = .24; y < 3.16; y += .13) box('ho san shutter seam', w * .7475, y, .095, w * .435, .017, .025, '#909991');
    for (const u of [.025, .495, .98]) box('ho san blue pier', w * u, 1.64, .15, .17, 3.04, .26, blue);

    for (const centre of [.255, .745]) {
      const span = w * .34;
      box('ho san upper window reveal', w * centre, 5.3, .06, span + .12, 1.94, .12, '#c6c9be');
      panel(w * centre - span / 2, span, 4.38, 6.22, .13, world.mat('#2c343c'));
      for (let i = 0; i <= 3; i++) box('ho san window mullion', w * centre - span / 2 + span * i / 3, 5.3, .16, .035, 1.84, .04, '#44494b');
      box('ho san window sill', w * centre, 4.35, .18, span + .2, .10, .27, '#c6c9be');
    }
    box('ho san upper sill course', w / 2, 4.28, .09, w, .09, .19, plaster);
    const shade = box('ho san upper shade', w / 2, 6.55, .40, w, .07, .85, '#617e87');
    shade.rotateLocal(7, 0, 0);
    // Reconstructed rib spacing, not a surveyed count.
    for (let u = .10; u < w; u += .14) box('ho san shade rib', u, 6.56, .4, .023, .04, .85, '#81979b').rotateLocal(7, 0, 0);
    for (const u of [.08, .49, .92]) box('ho san shade bracket', w * u, 6.33, .37, .04, .045, .70, '#526969');
    const awning = box('ho san red awning', w / 2, 3.28, .79, w, .085, 1.65, red);
    awning.rotateLocal(16, 0, 0);
    box('ho san awning valance', w / 2, 3.01, 1.56, w, .18, .045, red);
    box('ho san awning front rail', w / 2, 3.11, 1.57, w, .035, .04, '#c7c1b1');

    // Original lettering on both sides of a perpendicular blade sign.
    // Fine typography and the physical sign dimensions are estimates.
    const canvas = document.createElement('canvas'); canvas.width = 192; canvas.height = 768;
    const c = canvas.getContext('2d')!;
    c.fillStyle = '#e5ddc5'; c.fillRect(0, 0, 192, 768);
    c.strokeStyle = '#455b59'; c.lineWidth = 12; c.strokeRect(6, 6, 180, 756);
    c.fillStyle = '#ae4540'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = '600 125px sans-serif';
    [...'禾山公會'].forEach((letter, i) => c.fillText(letter, 96, 110 + i * 155));
    c.font = '26px sans-serif'; c.fillText('Ho San', 96, 685); c.fillText('Kong Hoey', 96, 721);
    const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas); mat.update();
    box('ho san projecting sign', .11, 4.86, .70, .10, 2.72, .72, '#455b59');
    world.panel(pt(.168, 1.06), pt(.168, .34), 3.5, 6.22, mat);
    world.panel(pt(.052, .34), pt(.052, 1.06), 3.5, 6.22, mat);
    return true;
  }

  if (place.kind === 'faith-mission') {
    // Operator photograph: two-storey white frontage, dark vertical screen,
    // four upper window groups and a central blue display. All dimensions estimated.
    const plaster = '#dddcd3', screen = '#303936';
    panel(0, w, .15, place.height, .015, world.mat(plaster));
    // Opaque glazing represents only the exterior, without reconstructing rooms.
    panel(w * .06, w * .88, .18, 3.05, .035, world.mat('#53605b'));
    for (const u of [.025, .265, .445, .575, .77, .975]) {
      box('faith frontage pier', w * u, 1.62, .11, w * .025, 3, .22, plaster);
    }
    for (const [start, span] of [[.095, .16], [.835, .105]]) {
      panel(w * start, w * span, .18, 3.03, .15, world.mat('#29332f'));
      for (let i = 0; i <= 8; i++) box('faith entrance grille', w * (start + span * i / 8), 1.6, .2, .035, 2.85, .06, '#747b70');
    }
    panel(w * .46, w * .10, .2, 2.95, .17, world.mat('#394642'));
    box('faith door transom', w * .51, 2.46, .21, w * .10, .045, .06, '#b6bbb0');
    box('faith door meeting stile', w * .51, 1.2, .21, .035, 2, .06, '#b6bbb0');
    panel(w * .775, w * .06, .18, 3.05, .23, world.mat(plaster));

    panel(w * .035, w * .93, 3.18, 6.55, .07, world.mat(screen));
    for (const [u, span] of [[.15, .15], [.365, .10], [.655, .105], [.865, .145]]) {
      panel(w * (u - span / 2), w * span, 5.04, 6.15, .09, world.mat('#bec7ba'));
    }
    // Fine screen spacing is reconstructed, not an asserted measured slat count.
    const slats = Math.max(2, Math.round(w * .93 / .095));
    for (let i = 0; i <= slats; i++) {
      const u = w * (.035 + .93 * i / slats);
      if (u > w * .448 && u < w * .565) continue;
      box('faith upper screen slat', u, 4.88, .19, .027, 3.46, .1, screen);
    }
    for (const y of [3.25, 4.87, 6.47]) box('faith screen rail', w * .5, y, .16, w * .93, .055, .08, screen);
    box('faith central display frame', w * .506, 4.84, .28, w * .117, 3.42, .12, '#222c2d');
    // Only the three large, legible words are reconstructed; fine text is omitted.
    panel(w * .454, w * .104, 3.2, 6.47, .35, world.mat('#368eae'));
    for (const [word, y] of [['Grace', 5.6], ['Glory', 4.6], ['Love', 3.6]] as const) {
      sign(word, w * .459, w * .094, y, .5, '#368eae', '#e6ece4', .36);
    }
    sign('FAITH MISSION HOME', w * .10, w * .8, 6.65, .8, plaster, '#202724', .04);
    box('faith stepped parapet', w * .50, place.height + .12, .04, w * .49, .24, .15, plaster);
    return true;
  }

  if (place.kind === 'hotel') {
    // The source footprint is set back from the street; preserve that courtyard.
    const blue = '#a9c9df', trim = '#dae3e7';
    panel(0, w, 3.25, place.height, .015, world.mat(blue));
    box('lift and stair tower', w * .22, place.height / 2, -.2, w * .34, place.height, .32, blue);
    for (let floor = 0; floor < 7; floor++) {
      const y = 4.75 + floor * 2.8;
      window(w * .13, y, w * .105, 1.7);
      window(w * .28, y, w * .105, 1.7);
      for (const u of [.55, .77]) window(w * u, y, w * .105, 1.35);
      for (const u of [.44, .92]) window(w * u, y + .42, .48, .48);
      box('projecting horizontal band', w * .69, y - 1.1, .3, w * .61, .38, .65, blue);
    }
    for (const u of [.055, .205, .37]) box('vertical stair fin', w * u, 13.8, .32, .16, 21.4, .62, trim);
    box('hotel parapet', w / 2, place.height + .17, .1, w + .2, .36, .7, trim);
    box('entrance pier', w - .23, 1.6, .05, .46, 3.2, .8, blue);
    box('covered driveway ceiling', w * .69, 3.15, 1.7, w * .61, .22, 4, blue);
    panel(w * .4, w * .58, .15, 3.05, -.2, world.mat('#263c45'));
    box('courtyard paving', w / 2, .08, 3.3, w, .12, 6.5, '#929e9f');
    box('low entrance wall', w * .17, .72, 5.5, w * .34, 1.45, .28, blue);
    sign('HOTEL 81', .12, w * .32, 1.43, .64, '#288799', '#ffffff', 5.67);
    sign('JOY · 11', .12, w * .32, 1.1, .27, '#dbe6e9', '#34566e', 5.67);
    for (const u of [.035, .965]) box('courtyard boundary wall', w * u, 1.05, 3.2, .16, 2.1, 6.3, blue);
    box('driveway yellow edge', w * .72, .151, 3.2, .08, .014, 6.2, '#bda150');
    return true;
  }

  if (place.kind === 'agape' || place.kind === 'association') {
    const pink = place.kind === 'association';
    const tile = pink ? 0 : 1;
    const plaster = pink ? '#e3bdba' : '#c9d9b6';
    const moulding = pink ? '#ecd5cc' : '#b7ceba';
    // One full elevation per mapped unit, with real projecting architectural details.
    panel(0, w, .15, place.height, .025, atlas, [tile / 2 + .004, .006, (tile + 1) / 2 - .004, .994]);
    for (const u of [.12, w - .12]) {
      box('arcade pier', u, 1.65, .25, .25, 3.2, .54, plaster);
      box('pier plinth', u, .35, .32, .38, .5, .65, moulding);
      box('pier capital', u, 3.1, .3, .43, .27, .65, moulding);
    }
    for (const y of [3.45, 3.6, 7.34]) box('stucco string course', w / 2, y, .09, w, .12, .3, moulding);
    box('eaves overhang', w / 2, 7.73, .28, w + .12, .14, .74, '#cac4af');
    box('rainwater downpipe', w - .07, 3.8, .35, .055, 7.45, .055, '#a2aaa2');
    if (pink) {
      sign('福 德 祠 綠 野 亭 公 會', .32, w - .64, 3.03, .47, '#ebd9d0', '#383d37');
    } else if (id === '1223250216') {
      sign('愛 加 倍 中 心', .32, w - .64, 3.03, .47, '#d5e0bd', '#67583d');
      sign('AGAPE CENTRE', w * .37, w * .32, 2.65, .23, '#eee3d1', '#815e4d', .07);
    }
    for (const u of [.65, w - .7]) { const p = pt(u, .7); world.planter(p[0], p[1]); }
    return true;
  }

  // Address-confirmed eating house. Its detailed exterior remains explicitly provisional.
  panel(0, w, 3.2, place.height, .015, world.mat('#d4d1bd'));
  for (const u of [.2, .5, .8]) window(w * u, 5.3, w * .2, 1.55);
  panel(0, w, .15, 3.2, -.12, world.mat('#2b3431'));
  box('eating-house fascia', w / 2, 3.04, 2.3, w, .74, .28, '#e0d6b6');
  sign('六福啦啦煲', .15, w - .3, 2.94, .47, '#d7c59a', '#423d32', 2.45);
  sign('LOK FU LALA POT', .25, w - .5, 2.7, .23, '#d7c59a', '#423d32', 2.45);
  box('eating-house canopy', w / 2, 2.62, 1.25, w, .14, 2.5, '#798875');
  for (const u of [.1, w - .1]) box('canopy support', u, 1.3, 2.3, .085, 2.6, .085, '#b5beb3');
  box('fluorescent strip', w / 2, 2.46, .7, w * .7, .055, .09, '#e4e1c9', 1);
  for (const u of [w * .28, w * .72]) {
    box('table top', u, .76, 1.05, .8, .065, .75, '#c5c3b6');
    box('table pedestal', u, .4, 1.05, .09, .7, .09, '#5e6560');
    for (const offset of [-.55, .55]) {
      box('plastic stool', u + offset, .45, 1.07, .34, .09, .34, '#9e3d32');
      for (const leg of [-.12, .12]) box('stool legs', u + offset + leg, .22, 1.07, .055, .44, .25, '#8c3930');
    }
  }
  return true;
}
