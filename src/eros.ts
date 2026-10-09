import type { World, Point } from './world';
import { eros, erosFrame, erosLayout, erosReviews } from './eros-layout.mjs';
import { buildPairedShophouse } from './paired-shophouse';

/** June 2024 exterior of No. 279, using the untouched source outline. */
export function buildEros(world: World, id: string, poly: Point[]) {
  if (!eros.buildingIds.includes(id)) return false;
  const frame = erosFrame(poly), { width, angle } = frame;
  const layout = erosLayout(width);
  const { pt, textured } = buildPairedShophouse(world, 'Eros', frame, layout, eros, {
    tile: eros.roof.tile, course: eros.roof.course, coping: '#9a4f3c', gable: '#f1efe8', copingHeight: .25, copingWidth: .2, frontCap: { length: .45, height: .3 },
  });
  const cutout = (canvas: HTMLCanvasElement, glow = 0) => {
    const mat = textured(canvas, glow); mat.opacityMap = mat.diffuseMap; mat.opacityMapChannel = 'a'; mat.alphaTest = .5; mat.update(); return mat;
  };
  // A field of small LED dots over near-black, as on both Eros boards.
  const dots = (c: CanvasRenderingContext2D, w: number, h: number, step: number, colour: (x: number, y: number) => string) => {
    c.fillStyle = '#121214'; c.fillRect(0, 0, w, h);
    for (let x = step / 2; x < w; x += step) for (let y = step / 2; y < h; y += step) { c.fillStyle = colour(x, y); c.fillRect(x - step * .18, y - step * .18, step * .36, step * .36); }
  };
  const lettering = (c: CanvasRenderingContext2D, text: string, x: number, y: number, size: number, maxWidth?: number) => {
    c.font = `600 ${size}px Optima, Candara, "Gill Sans", sans-serif`; c.textBaseline = 'middle'; c.fillText(text, x, y, maxWidth);
  };

  // Signboard: dot-matrix field, then the raised white EROS letters a few centimetres proud of it.
  const sg = layout.sign, sw = sg.right - sg.left, sh = sg.top - sg.bottom;
  const field = document.createElement('canvas'); field.width = 2048; field.height = Math.round(2048 * sh / sw);
  const f = field.getContext('2d')!, FH = field.height;
  dots(f, 2048, FH, 14, (x, y) => ((x * 7 + y * 13) % 97 < 6 ? '#6c6f76' : '#2c2d31'));
  f.fillStyle = '#d8d8d4'; lettering(f, 'EROTIC HOUSE', 1800, FH * .8, 30);
  world.panel(pt(sg.left, sg.out), pt(sg.right, sg.out), sg.bottom, sg.top, textured(field, .05));
  const letters = document.createElement('canvas'); letters.width = 2048; letters.height = FH;
  const l = letters.getContext('2d')!;
  // Letters span about 1.47–3.18 m along the board and 0.55 m tall, as measured square on.
  l.fillStyle = '#f2f1ec'; lettering(l, 'EROS', (1.47 / sw) * 2048, FH * .48, FH * .78, (1.71 / sw) * 2048);
  world.panel(pt(sg.left, sg.out + .04), pt(sg.right, sg.out + .04), sg.bottom, sg.top, cutout(letters, .1));

  // Lit board on the back wall: red LED dots behind white EROS letters.
  const led = layout.led, lw = led.right - led.left, lh = led.top - led.bottom;
  const board = document.createElement('canvas'); board.width = 2048; board.height = Math.round(2048 * lh / lw);
  const b = board.getContext('2d')!, BH = board.height;
  dots(b, 2048, BH, 12, (x, y) => (y > BH * .12 && y < BH * .88 && (Math.floor(x / 60) + Math.floor(y / 40)) % 3 !== 0 ? '#d4242e' : '#3a1416'));
  b.fillStyle = '#f2f1ec'; lettering(b, 'EROS', 2048 * .22, BH * .5, BH * .62, 2048 * .62);
  world.panel(pt(led.left, led.out), pt(led.right, led.out), led.bottom, led.top, textured(board, .9));

  // Black diamond-quilted return wall at the west end of the five-foot way.
  const q = layout.quilt, qc = document.createElement('canvas'); qc.width = 1024; qc.height = Math.round(1024 * (q.top - q.bottom) / (q.to - q.from));
  const c = qc.getContext('2d')!, H = qc.height, cell = 1024 / ((q.to - q.from) / .3);
  c.fillStyle = '#17171a'; c.fillRect(0, 0, 1024, H);
  c.strokeStyle = '#3c3c40'; c.lineWidth = 4;
  for (let x = -H; x < 1024 + H; x += cell) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x + H, H); c.stroke(); c.beginPath(); c.moveTo(x, H); c.lineTo(x + H, 0); c.stroke(); }
  c.fillStyle = '#8c8471';
  for (let x = 0; x < 1024 + cell; x += cell / 2) for (let y = 0; y < H + cell; y += cell / 2) if ((Math.round(x / (cell / 2)) + Math.round(y / (cell / 2))) % 2 === 0) { c.beginPath(); c.arc(x, y, 4, 0, Math.PI * 2); c.fill(); }
  world.panel(pt(q.u, q.from), pt(q.u, q.to), q.bottom, q.top, textured(qc));

  // Oval blade sign on the party pilaster: black face, a ring of white LEDs, EROS reading
  // downwards and ADULT SHOP in pink. Drawn once and shown on both faces.
  const bl = layout.blade, bw = bl.to - bl.from, bh = bl.top - bl.bottom;
  const oval = document.createElement('canvas'); oval.width = 512; oval.height = Math.round(512 * bh / bw);
  const o = oval.getContext('2d')!, OW = 512, OH = oval.height;
  o.fillStyle = '#0d0d12'; o.beginPath(); o.ellipse(OW / 2, OH / 2, OW / 2 - 2, OH / 2 - 2, 0, 0, Math.PI * 2); o.fill();
  o.fillStyle = '#e8ecff';
  for (let i = 0; i < 64; i++) { const a = i / 64 * Math.PI * 2; o.beginPath(); o.arc(OW / 2 + Math.cos(a) * (OW / 2 - 16), OH / 2 + Math.sin(a) * (OH / 2 - 16), 5, 0, Math.PI * 2); o.fill(); }
  o.textAlign = 'center'; o.fillStyle = '#f4f4f0';
  [...'EROS'].forEach((ch, i) => lettering(o, ch, OW / 2, OH * (.17 + i * .125), 150));
  o.fillStyle = '#e8508e'; lettering(o, 'ADULT', OW / 2, OH * .7, 74); lettering(o, 'SHOP', OW / 2, OH * .77, 74);
  const ovalMat = cutout(oval, .5);
  // Each face runs its texture so the lettering reads correctly from its own side.
  world.panel(pt(bl.u - .015, bl.from), pt(bl.u - .015, bl.to), bl.bottom, bl.top, ovalMat);
  world.panel(pt(bl.u + .015, bl.to), pt(bl.u + .015, bl.from), bl.bottom, bl.top, ovalMat);
  // Short mounting arms from the pilaster into the oval's rim.
  for (const y of [5.30, 5.75]) {
    const p = pt(bl.u, .05);
    world.box('Eros blade sign arm', p[0], y, p[1], .04, .04, .12, world.mat('#1b1b1d'), undefined, angle);
  }

  for (const r of erosReviews(frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
