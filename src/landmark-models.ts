import * as pc from 'playcanvas';
import type { World, Point } from './world';
import { landmarkFor } from './landmarks.mjs';
import { buildLeongKeeSide, leongKeeTable } from './leong-kee-exterior';
import { leongKeeExterior } from './leong-kee-layout.mjs';

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

  if (place.kind === 'leong-kee') {
    // June 2024 operating frontage. The three signed bays are visually
    // supported, while their legal and internal extent remains unverified.
    const unit = place.buildingIds.indexOf(id);
    const plaster = ['#c5ae85', '#c5ae85', '#d8d1bc'][unit];
    const trim = ['#b39869', '#b39869', '#c3bca4'][unit];
    panel(0, w, 3.12, place.height, .02, world.mat(plaster));
    // Shallow public dining edge, closed at the back without a private interior.
    const backingStart = unit === 0 ? leongKeeExterior.recess : 0;
    panel(backingStart, w - backingStart, .15, 3.12, -leongKeeExterior.recess, world.mat('#777b70'));
    box('leong kee front portico floor', w / 2, .13, -.65, w, .16, 2.3, '#a6a89b');
    box('leong kee front portico ceiling', w / 2, 3.08, -.75, w, .12, 1.9, '#c3c2af');
    for (const u of [.035, .965]) {
      box('leong kee shop pier', w * u, 1.58, .19, .31, 2.86, .42, '#d7d2b9');
      box('leong kee pier plinth', w * u, .35, .20, .43, .45, .49, '#c1c4b7');
      box('leong kee pier capital', w * u, 2.59, .20, .49, .20, .50, '#c9c7b2');
    }
    // The corner table sits clear of the side furniture.
    leongKeeTable(world, pt, w * .58, -.65, angle);

    // The original canvas lettering follows the broad observed yellow/red fascia.
    const fascia = document.createElement('canvas'); fascia.width = 1536; fascia.height = 330;
    const c = fascia.getContext('2d')!; c.fillStyle = '#f2e574'; c.fillRect(0, 0, fascia.width, fascia.height);
    c.strokeStyle = '#dfcf56'; c.lineWidth = 15; c.strokeRect(8, 8, fascia.width - 16, fascia.height - 16);
    c.fillStyle = '#bd3e35'; c.textAlign = 'center'; c.textBaseline = 'middle';
    if (unit !== 1) {
      c.font = '600 142px serif'; c.fillText('梁記（巴生）肉骨茶', fascia.width / 2, 117, fascia.width * .92);
      c.font = '600 62px sans-serif'; c.fillText('LEONG KEE (KLANG) BAK KUT TEH', fascia.width / 2, 250, fascia.width * .92);
    }
    const fasciaMat = new pc.StandardMaterial(); fasciaMat.diffuseMap = world.texture(fascia); fasciaMat.update();
    panel(.04, w - .08, 2.72, 3.63, .25, fasciaMat);
    box('leong kee fascia backing', w / 2, 3.175, .16, w - .08, .91, .15, '#e4d363');

    const arch = (u: number, span: number, base: number, rise: number, d: number, colour: string) => {
      const p = pt(u, d), positions = [p[0], base, p[1]], indices: number[] = [];
      for (let i = 0; i <= 16; i++) {
        const t = Math.PI * i / 16, q = pt(u + Math.cos(t) * span / 2, d);
        positions.push(q[0], base + Math.sin(t) * rise, q[1]);
        if (i) indices.push(0, i, i + 1);
      }
      const mat = world.mat(colour); mat.cull = pc.CULLFACE_NONE; mat.update();
      world.mesh('leong kee arched fanlight', positions, Array(positions.length / 3 * 2).fill(0), indices, mat);
    };
    // Geometric tile fields stand in for fine historic floral artwork.
    const tileField = (centre: number, span: number, base: number, height: number, cols: number, rows: number) => {
      panel(centre - span / 2, span, base, base + height, .13, world.mat('#6c9e90'));
      for (let col = 0; col < cols; col++) for (let row = 0; row < rows; row++) {
        const u = centre - span / 2 + span * (col + .5) / cols, y = base + height * (row + .5) / rows;
        box('leong kee tile motif', u, y, .17, .075, .075, .025, '#eee3bb').rotateLocal(0, 0, 45);
      }
    };
    for (const centre of unit < 2 ? [.27, .73] : [.20, .50, .80]) {
      const span = w * (unit < 2 ? .29 : .20), u = w * centre;
      panel(u - span / 2 - .10, span + .20, 4.08, 5.93, .08, world.mat(trim));
      panel(u - span / 2, span, 4.15, 5.92, .14, world.mat('#303835'));
      for (let row = 0; row < 16; row++) box('leong kee shutter louvre', u, 4.23 + row * .105, .19, span - .10, .027, .035, '#4d5046');
      box('leong kee shutter stile', u, 5.035, .22, .055, 1.77, .055, '#726952');
      arch(u, span + .26, 5.91, .36, .15, trim);
      arch(u, span, 5.91, .24, .18, '#333c36');
      for (const offset of [-.25, 0, .25]) box('leong kee fanlight vent', u + offset * span, 6.0, .21, .045, .08, .03, '#b3a077');
      box('leong kee window sill', u, 4.10, .20, span + .22, .10, .34, trim);
      tileField(u, span, 3.72, .29, Math.round(span / .21), 2);
    }
    for (const centre of unit < 2 ? [.06, .50, .94] : [.045, .35, .65, .955]) {
      box('leong kee pilaster', w * centre, 5.20, .08, w * .055, 2.9, .16, trim);
      tileField(w * centre, w * .04, 4.42, 1.10, 1, 5);
      box('leong kee capital', w * centre, 6.37, .18, w * .09, .20, .30, trim);
    }
    if (unit < 2) {
      box('leong kee ornate cornice', w / 2, 6.65, .22, w, .22, .48, '#a28b63');
      for (let u = .12; u < w; u += .24) box('leong kee cornice dentil', u, 6.83, .28, .10, .14, .34, '#b9a47c');
      box('leong kee tiled eave', w / 2, 7.07, .37, w + .12, .13, .83, '#744b3d');
    } else {
      box('leong kee plain cornice', w / 2, 6.65, .17, w, .17, .35, '#eee8d7');
      box('leong kee plain eave', w / 2, 7.07, .25, w, .14, .60, '#6f4c40');
    }

    // Original roof planes over the source massing, not a flat painted fascia.
    if (unit !== 1) {
      const roofWidth = unit === 0 ? w * 2 : w, depth = 11.80;
      const corners: [number, number, number][] = [[-.48, 7.14, .48], [roofWidth + .16, 7.14, .48], [roofWidth + .16, 7.14, -depth], [-.48, 7.14, -depth]];
      const ridge = [[roofWidth / 2, leongKeeExterior.ridge, -roofWidth / 2], [roofWidth / 2, leongKeeExterior.ridge, -depth + roofWidth / 2]];
      const slopes = [[corners[0], corners[1], ridge[0]], [corners[1], corners[2], ridge[1], ridge[0]], [corners[2], corners[3], ridge[1]], [corners[3], corners[0], ridge[0], ridge[1]]];
      for (const [index, vertices] of slopes.entries()) {
        const positions = vertices.flatMap(([u, y, d]) => {const p = pt(u, d); return [p[0], y, p[1]];});
        const mat = world.mat(index % 2 ? '#805444' : '#93604a'); mat.cull = pc.CULLFACE_NONE; mat.update();
        world.mesh('leong kee hip roof', positions, Array(vertices.length * 2).fill(0), vertices.length === 3 ? [0, 1, 2] : [0, 1, 2, 0, 2, 3], mat);
      }
      box('leong kee roof ridge', roofWidth / 2, leongKeeExterior.ridge, -depth / 2, .16, .10, depth - roofWidth, '#aa7960');
    }

    // The corner bay also presents a long conserved side elevation to Lorong 11.
    if (id === '454254214') {
      for (const { id, position, target: focus } of leongKeeExterior.reviews) {
        const p = pt(position[0], position[1]), target = pt(focus[0], focus[1]);
        world.reviewSpawns.set(id, { p, yaw: Math.atan2(p[0] - target[0], p[1] - target[1]) * 180 / Math.PI });
      }
      buildLeongKeeSide(world);
    }
    return true;
  }

  if (place.kind === 'hainan-goh') {
    // April 2024 No. 20B/20C: upper association premises and right entrance.
    // Separate ground-floor use is neutral; all openings remain opaque.
    const plaster = '#b4a9bc', pink = '#c9828c', metal = '#acaea4';
    panel(0, w, .15, place.height, .015, world.mat(plaster));
    box('goh parapet coping', w / 2, place.height, .08, w, .12, .26, '#a79faa');
    box('goh upper shade', w / 2, 7.13, .36, w, .14, .78, plaster);
    for (const [start, span, panes] of [[.085, .36, 4], [.62, .275, 3]]) {
      panel(w * start, w * span, 4.78, 6.89, .06, world.mat('#46515c'));
      for (let i = 0; i <= panes; i++) box('goh window upright', w * (start + span * i / panes), 5.835, .12, .04, 2.11, .065, '#555754');
      box('goh window transom', w * (start + span / 2), 6.43, .13, w * span, .045, .06, '#555754');
      for (const u of [start - .012, start + span + .012]) box('goh pink window jamb', w * u, 5.81, .17, .10, 2.22, .23, pink);
      box('goh pink window sill', w * (start + span / 2), 4.73, .19, w * span + .24, .11, .30, pink);
    }
    // Original lettering reproduces the visible name, not the source pixels.
    const canvas = document.createElement('canvas'); canvas.width = 1536; canvas.height = 192;
    const c = canvas.getContext('2d')!;
    c.fillStyle = '#d6c28c'; c.font = '600 145px serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
    [...'海南吳氏公會'].forEach((letter, i) => c.fillText(letter, 128 + i * 256, 100));
    const lettering = new pc.StandardMaterial(); lettering.diffuseMap = world.texture(canvas);
    lettering.opacityMap = lettering.diffuseMap; lettering.opacityMapChannel = 'a'; lettering.blendType = pc.BLEND_NORMAL; lettering.depthWrite = false; lettering.update();
    panel(w * .15, w * .70, 3.91, 4.51, .06, lettering);

    panel(w * .055, w * .58, .16, 3.08, .06, world.mat('#484d49'));
    panel(w * .055, w * .58, 3.10, 3.44, .06, world.mat('#b9b8ad'));
    for (const u of [.055, .405, .635]) box('goh shop frame', w * u, 1.62, .12, .06, 2.96, .09, metal);
    // Simplified grille spacing, with temporary shop signs and contents omitted.
    for (let i = 0; i <= 9; i++) box('goh shop grille', w * (.405 + .23 * i / 9), 1.61, .15, .023, 2.90, .035, metal);
    panel(w * .70, w * .245, .16, 2.90, .06, world.mat('#57483f'));
    for (let i = 0; i <= 8; i++) box('goh entrance grille', w * (.70 + .245 * i / 8), 1.48, .15, .025, 2.64, .04, metal);
    for (const y of [1.02, 2.13]) box('goh entrance rail', w * .8225, y, .16, w * .245, .03, .045, metal);
    for (const u of [.025, .665, .975]) box('goh ground pier', w * u, 1.78, .12, .14, 3.26, .22, plaster);
    const awning = box('goh grey awning', w / 2, 3.66, .69, w, .08, 1.42, '#686b68');
    awning.rotateLocal(10, 0, 0);
    box('goh awning valance', w / 2, 3.49, 1.37, w, .15, .04, '#777a73');
    box('goh entrance nameboard', w * .775, 3.05, .19, w * .23, .63, .10, '#6e3335');
    sign('海南吳氏公會', w * .663, w * .224, 3.06, .25, '#292f31', '#d6c28c', .25);
    sign('HAINAN GOH CLAN ASSOCIATION', w * .663, w * .224, 2.82, .24, '#292f31', '#d6c28c', .25);
    return true;
  }

  if (place.kind === 'canton-wong') {
    // April 2024 No. 31/31A. The association signs belong to the upper
    // premises and stair entrance; the separate shop stays unbranded.
    const plaster = '#e1e1d8', trim = '#d4d7d0', metal = '#797c76';
    panel(0, w, .15, place.height, .015, world.mat(plaster));
    box('wong upper shade', w / 2, 7.48, .30, w, .11, .65, plaster);
    box('wong lower beam', w / 2, 3.66, .17, w, .20, .38, trim);
    box('wong roof edge', w / 2, place.height, .12, w, .12, .34, plaster);
    // Five observed window panes, opaque so no private rooms are depicted.
    panel(w * .19, w * .66, 4.84, 6.50, .06, world.mat('#38444d'));
    for (let i = 0; i <= 5; i++) box('wong window mullion', w * (.19 + .66 * i / 5), 5.67, .12, .045, 1.72, .07, metal);
    for (const y of [4.81, 6.52]) box('wong window rail', w * .52, y, .12, w * .68, .065, .10, trim);
    box('wong window sill', w * .52, 4.76, .17, w * .70, .09, .28, plaster);
    box('wong condenser bracket', w * .42, 3.91, .33, 1.03, .07, .61, metal);
    box('wong condenser casing', w * .42, 4.30, .35, 1.02, .73, .46, '#d2d1c1');
    // Original simplified grille; no product badge or precise equipment model.
    panel(w * .42 - .42, .65, 4.03, 4.56, .59, world.mat('#717970'));
    for (let i = 0; i <= 8; i++) box('wong condenser grille', w * .42 - .095, 4.03 + .53 * i / 8, .615, .65, .018, .025, '#c2c7b8');
    for (const y of [4.20, 4.57]) panel(w * .53, .17, y, y + .17, .05, world.mat('#83887c'));

    // Narrow left stair entrance and separate opaque shopfront to its right.
    panel(w * .085, w * .17, .15, 2.63, .06, world.mat('#434a45'));
    for (const u of [.078, .262]) box('wong entrance jamb', w * u, 1.39, .13, .075, 2.50, .14, trim);
    panel(w * .30, w * .64, .15, 3.04, .06, world.mat('#535b59'));
    panel(w * .30, w * .64, 3.06, 3.54, .05, world.mat('#b9bdb5'));
    for (const u of [.30, .51, .73, .94]) box('wong shop frame', w * u, 1.60, .13, .045, 2.88, .06, metal);
    box('wong shop transom', w * .62, 2.67, .14, w * .64, .045, .07, metal);
    for (const start of [.30, .90]) for (let i = 0; i < 5; i++) box('wong folded grille', w * start + i * .045, 1.62, .20, .023, 2.90, .10, trim);
    for (const u of [.025, .975]) box('wong ground pier', w * u, 1.82, .19, .24, 3.34, .37, plaster);

    // Original two-/three-line lettering in the observed sign positions.
    // Fonts and proportions are estimates; small dedications are omitted.
    const nameboard = (entrance: boolean) => {
      const canvas = document.createElement('canvas'); canvas.width = entrance ? 768 : 1536; canvas.height = 300;
      const c = canvas.getContext('2d')!, cw = canvas.width;
      c.fillStyle = entrance ? '#8e3636' : '#292d2e'; c.fillRect(0, 0, cw, 300);
      c.strokeStyle = entrance ? '#d3c8aa' : '#5b5546'; c.lineWidth = 9; c.strokeRect(5, 5, cw - 10, 290);
      c.fillStyle = '#d4be76'; c.textAlign = 'center'; c.textBaseline = 'middle';
      if (entrance) { c.font = '48px serif'; c.fillText('新加坡', cw / 2, 60); }
      c.font = `600 ${entrance ? 68 : 153}px serif`;
      c.fillText('廣東黃氏宗親會', cw / 2, entrance ? 147 : 117, cw * .91);
      c.font = `600 ${entrance ? 29 : 46}px sans-serif`;
      c.fillText(entrance ? 'SINGAPORE CANTONESE WONG CLAN ASSN' : 'CANTONESE WONG CLAN ASSN.', cw / 2, entrance ? 244 : 245, cw * .92);
      const mat = new pc.StandardMaterial(); mat.diffuseMap = world.texture(canvas); mat.update();
      const start = entrance ? .067 : .15, span = entrance ? .21 : .74;
      const base = entrance ? 2.66 : 6.54, height = entrance ? .72 : .86;
      box('wong nameboard backing', w * (start + span / 2), base + height / 2, .17, w * span, height, .12, entrance ? '#8e3636' : '#292d2e');
      panel(w * start, w * span, base, base + height, .235, mat);
    };
    nameboard(false); nameboard(true);
    return true;
  }

  if (place.kind === 'khek-leow') {
    // April 2024 No. 4 frontage. Relief and tile motifs are simplified original
    // geometry, not a measured conservation elevation or copied photograph.
    const green = '#9daf70', cream = '#dedec3', frame = '#c8ceb1';
    panel(0, w, .15, place.height, .015, world.mat(green));
    panel(0, w, .15, 4.60, .03, world.mat(cream));
    panel(w * .055, w * .18, .15, 2.92, .055, world.mat('#626760'));
    panel(w * .085, w * .075, .44, 2.57, .085, world.mat('#644147'));
    for (let i = 0; i <= 3; i++) box('leow entrance bar', w * (.085 + .075 * i / 3), 1.51, .12, .022, 2.13, .035, frame);
    panel(w * .25, w * .70, .15, 2.94, .06, world.mat('#d5ccb0'));
    for (let i = 0; i <= 8; i++) box('leow folding door stile', w * (.25 + .70 * i / 8), 1.55, .095, .025, 2.79, .035, '#b2ad94');
    for (const y of [.93, 1.83, 2.72]) box('leow folding door rail', w * .60, y, .10, w * .70, .025, .04, '#b2ad94');
    for (const u of [.03, .97]) {
      box('leow arcade pier', w * u, 1.61, .23, .25, 2.92, .46, cream);
      box('leow pier plinth', w * u, .38, .25, .32, .46, .50, frame);
      box('leow bracket capital', w * u, 2.91, .24, .43, .17, .51, cream);
    }
    for (const y of [3.03, 3.72, 3.88]) box('leow string course', w / 2, y, .15, w, .09, .31, frame);
    // The observed fascia is read right-to-left. Preserve its visual order.
    sign('會 公 氏 廖 屬 客 馬 星', .18, w - .36, 3.14, .47, '#e1dacc', '#a67e83', .18);
    for (const centre of [.20, .50, .80]) {
      const span = w * .24;
      panel(w * centre - span / 2, span, 4.76, 6.47, .09, world.mat('#526567'));
      for (const u of [centre - .125, centre, centre + .125]) box('leow upper window upright', w * u, 5.615, .16, .045, 1.78, .075, cream);
      for (let i = 0; i <= 8; i++) box('leow window horizontal bar', w * centre, 4.76 + 1.71 * i / 8, .17, span, .035, .045, frame);
      box('leow window sill', w * centre, 4.73, .16, span + .14, .10, .25, frame);
      // Shallow cream arched head, faceted conservatively in the façade plane.
      const base = pt(w * centre, .10), positions = [base[0], 6.90, base[1]], indices: number[] = [];
      for (let i = 0; i <= 12; i++) {
        const t = Math.PI * i / 12, p = pt(w * centre + Math.cos(t) * span / 2, .10);
        positions.push(p[0], 6.90 + Math.sin(t) * .18, p[1]);
        if (i) indices.push(0, i, i + 1);
      }
      panel(w * centre - span / 2, span, 6.47, 6.90, .10, world.mat(cream));
      world.mesh('leow arched window head', positions, Array(positions.length / 3 * 2).fill(0), indices, world.mat(cream));
      for (const offset of [-.27, .27]) for (const y of [6.60, 6.76]) box('leow transom vent', w * centre + offset, y, .13, .35, .045, .025, '#757e65');
    }
    // Abstract blue/ivory tile fields preserve placement, not historic motifs.
    for (const centre of [.20, .80]) {
      panel(w * centre - w * .12, w * .24, 4.07, 4.58, .08, world.mat('#608e88'));
      for (let row = 0; row < 2; row++) for (let col = 0; col < 5; col++) {
        box('leow tile motif', w * (centre - .096 + col * .048), 4.19 + row * .23, .105, .10, .10, .025, '#e1d8b4').rotateLocal(0, 0, 45);
      }
    }
    for (const u of [.05, .35, .65, .95]) box('leow upper pilaster', w * u, 5.58, .12, w * .045, 3.08, .17, cream);
    box('leow green frieze', w / 2, 7.28, .11, w, .21, .23, green);
    for (let u = .12; u < w; u += .25) box('leow cornice dentil', u, 7.48, .21, .10, .18, .24, green);
    box('leow eaves', w / 2, 7.71, .25, w, .15, .58, frame);
    return true;
  }

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
