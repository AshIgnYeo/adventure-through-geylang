import type { World, Point } from './world';
import { lorong15, lorong15Frame, lorong15Layout, lorong15Reviews } from './lorong-15-layout.mjs';
import { buildSimpleHouse, type Draw } from './simple-house';

const text = (c: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, colour: string, font = '"Helvetica Neue", Arial, sans-serif', weight = '700', maxWidth?: number) => {
  c.fillStyle = colour; c.font = `${weight} ${size}px ${font}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(s, x, y, maxWidth);
};
const brush = '"Kaiti SC", "STKaiti", "Songti SC", serif';

const draws: Record<string, { boards?: Draw[]; blades?: Draw[]; awning?: string; valance?: Draw }> = {
  'sin-chew-tan': {
    boards: [
      (c, w, h) => {
        c.fillStyle = '#222324'; c.fillRect(0, 0, w, h); c.strokeStyle = '#8a7a4a'; c.lineWidth = h * .04; c.strokeRect(0, 0, w, h);
        text(c, '星 洲 陳 氏 公 會', w / 2, h * .38, h * .48, '#d9bf72', brush, '900', w * .92);
        text(c, "SIN CHEW TAN'S CLAN ASSOCIATION", w / 2, h * .82, h * .17, '#d9bf72', '"Helvetica Neue", Arial, sans-serif', '700', w * .9);
      },
      (c, w, h) => { c.clearRect(0, 0, w, h); text(c, 'Ganh', w / 2, h * .3, h * .38, '#f4f1ea', 'Georgia, serif', '700'); text(c, 'Xua', w / 2, h * .75, h * .38, '#f4f1ea', 'Georgia, serif', '700'); },
    ],
    awning: '#b8423a', valance: (c, w, h) => { c.fillStyle = '#a63a33'; c.fillRect(0, 0, w, h); },
  },
  'hong-sheng-koon': {
    blades: [(c, w, h) => { c.fillStyle = '#e8b83a'; c.fillRect(0, 0, w, h); [...'鴻勝館'].forEach((ch, i) => text(c, ch, w / 2, h * (.2 + i * .3), w * .62, '#b0272a', brush, '900')); }],
  },
  'ship-chandlers': {
    boards: [(c, w, h) => {
      c.fillStyle = '#efece4'; c.fillRect(0, 0, w, h);
      c.fillStyle = '#244a8a'; c.fillRect(h * .1, h * .1, h * .8, h * .8); c.strokeStyle = '#f4f4ef'; c.lineWidth = h * .08;
      for (const dy of [-.15, .15]) { c.beginPath(); c.arc(h * .5, h * (.5 + dy), h * .2, 0, Math.PI * 2); c.stroke(); }
      text(c, '新 加 坡 船 務 供 應 商 公 會', w * .58, h * .3, h * .3, '#7a7466', '"Songti SC", serif', '700', w * .75);
      text(c, 'SINGAPORE SHIP-CHANDLERS ASSOCIATION', w * .58, h * .74, h * .26, '#244a8a', '"Helvetica Neue", Arial, sans-serif', '700', w * .78);
    }],
  },
  'teck-keow': {
    boards: [
      (c, w, h) => {
        c.fillStyle = '#f1ede6'; c.fillRect(0, 0, w, h);
        text(c, '新 加 坡 德 僑 社', w / 2, h * .42, h * .5, '#b0302c', brush, '900', w * .9);
        text(c, 'SINGAPORE TECK KEOW ASSOCIATION', w / 2, h * .85, h * .16, '#b0302c', '"Helvetica Neue", Arial, sans-serif', '600', w * .85);
      },
      (c, w, h) => { c.clearRect(0, 0, w, h); text(c, '王 氏 慈 善 福 樓', w / 2, h * .55, h * .75, '#f1ede6', brush, '900', w * .95); },
    ],
    awning: '#b8423a', valance: (c, w, h) => { c.fillStyle = '#a63a33'; c.fillRect(0, 0, w, h); },
  },
};

/** April 2024 exteriors on Lorong 15, north of Hotel 81 Spring. */
export function buildLorong15(world: World, id: string, poly: Point[]) {
  const place = lorong15.find(p => p.buildingIds.includes(id)) as any;
  if (!place) return false;
  const frame = lorong15Frame(poly, place), layout = lorong15Layout(place, frame.width) as any;
  buildSimpleHouse(world, `${place.name} ${id}`, frame, poly, place, layout, draws[place.id] ?? {});
  if (place.id === 'aecc-jmas' && id === place.reviewBuildingId) {
    // The joint board behind the fence of No. 17.
    const c = document.createElement('canvas'); c.width = 1024; c.height = 260; const g = c.getContext('2d')!;
    g.fillStyle = '#1c1c1d'; g.fillRect(0, 0, 1024, 260); g.fillStyle = '#e8e6df'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = '700 46px Arial, sans-serif'; g.fillText('AHLULBAYT EDUCATIONAL & CULTURAL CENTRE (AECC)', 512, 60, 980);
    g.font = '600 38px Arial, sans-serif'; g.fillText('JAAFARI MUSLIM ASSOCIATION SINGAPORE (JMAS)', 512, 140, 980);
    g.font = '500 32px Arial, sans-serif'; g.fillText('17 & 17C Lorong 15 Geylang', 512, 210, 980);
    const m = world.mat('#1c1c1d'); const t = new (m.constructor as any)(); t.diffuseMap = world.texture(c); t.update();
    const pa = frame.point(1.0, .1) as Point, pb = frame.point(6.4, .1) as Point; world.panel(pa, pb, 2.0, 2.9, t);
  }
  if (!place.reviewBuildingId || id === place.reviewBuildingId) for (const r of lorong15Reviews(place, frame)) world.reviewSpawns.set(r.id, { p: r.p as Point, yaw: r.yaw, pitch: r.pitch });
  return true;
}
