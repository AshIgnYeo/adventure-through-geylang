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
