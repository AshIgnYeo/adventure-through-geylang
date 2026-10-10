// Owner-approved re-spacings and authored outlines (open questions settled on 10 October 2026).
// Each group replaces the listed source ways in the rendered and walkable map. The source ways stay
// in map.json and are kept as `replacedBuildings`, so their provenance is never lost.
import { project, unproject } from './geo.mjs';

const ORIGIN = [103.8773, 1.3131];
const at = (a, d, s) => [a[0] + d[0] * s, a[1] + d[1] * s];
const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
const sourcePoint = (map, id, i) => project(map.buildings.find(b => b.id === id).coordinates[i], map.origin);

/** Sutherland–Hodgman clip of a polygon to the side of the line (p, d) where cross(d, x - p) >= 0. */
function clip(poly, p, d) {
  const side = q => d[0] * (q[1] - p[1]) - d[1] * (q[0] - p[0]), out = [];
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length], sa = side(a), sb = side(b);
    if (sa >= 0) out.push(a);
    if ((sa >= 0) !== (sb >= 0)) { const t = sa / (sa - sb); out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]); }
  }
  return out;
}
const neg = v => [-v[0], -v[1]];

/** Split a source outline into strips at measured distances along its front, with cut lines in a given direction. */
function strips(outline, frontStart, frontDir, cutDir, cuts) {
  const pieces = [];
  let rest = outline;
  for (const c of cuts) {
    const p = at(frontStart, frontDir, c);
    // Keep the part nearer frontStart, then continue with the remainder.
    const startSide = cutDir[0] * (frontStart[1] - p[1]) - cutDir[1] * (frontStart[0] - p[0]);
    const towards = startSide >= 0 ? cutDir : neg(cutDir);
    pieces.push(clip(rest, p, towards)); rest = clip(rest, p, neg(towards));
  }
  return [...pieces, rest];
}

const signedArea = o => o.reduce((s, p, i) => { const q = o[(i + 1) % o.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0) / 2;
const ccw = o => signedArea(o) < 0 ? [...o].reverse() : o;
const same = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]) < 1e-6;
/** Merge two outlines that share an edge (source ways sharing nodes), dropping the shared edge. */
function merge(A, B) {
  A = ccw(A); B = ccw(B);
  for (let i = 0; i < A.length; i++) for (let j = 0; j < B.length; j++) {
    const a0 = A[i], a1 = A[(i + 1) % A.length], b0 = B[j], b1 = B[(j + 1) % B.length];
    if (same(a0, b1) && same(a1, b0)) {
      const out = [];
      for (let k = 0; k <= i; k++) out.push(A[k]);
      for (let k = 2; k < B.length; k++) out.push(B[(j + k) % B.length]);
      for (let k = i + 1; k < A.length; k++) out.push(A[k]);
      const dedup = out.filter((p, k) => !same(p, out[(k + 1) % out.length]));
      // Drop vertices left within 8 cm of collinear by the merge, so a straight front stays one edge.
      return dedup.filter((p, k) => {
        const a = dedup[(k + dedup.length - 1) % dedup.length], c = dedup[(k + 1) % dedup.length];
        return Math.abs((p[0] - a[0]) * (c[1] - a[1]) - (p[1] - a[1]) * (c[0] - a[0])) > .08 * Math.hypot(c[0] - a[0], c[1] - a[1]);
      });
    }
  }
  throw new Error('outlines do not share an edge');
}

/**
 * A terrace re-spaced along an unchanged straight front line. `lines` are measured party-line
 * distances from the front start; the rear line keeps the source depth.
 */
function terrace(map, { frontStart, frontEnd, rear, lines, houses }) {
  const len = Math.hypot(frontEnd[0] - frontStart[0], frontEnd[1] - frontStart[1]);
  const e = [(frontEnd[0] - frontStart[0]) / len, (frontEnd[1] - frontStart[1]) / len];
  return houses.map((h, i) => {
    const f0 = at(frontStart, e, lines[i]), f1 = at(frontStart, e, lines[i + 1]);
    const outline = h.outline ? h.outline({ f0, f1, rear, e }) : [f0, f1, add(f1, rear), add(f0, rear)];
    return { ...h, outline };
  });
}

export const authoredFootprintGroups = [
  {
    id: 'lorong-11-west-row', question: 1, approved: '2026-10-10',
    evidence: 'Party lines measured on 10 October 2026 from eight April 2024 panoramas rectified at the 0.6 m façade depth solved for Nos. 27–33, each read from the most square-on panorama and checked against its neighbours (about ±0.3–0.5 m). The real row has twelve frontages, including No. 29A, where the source has eleven equal 6.4 m ways. The source front line, rear line and the No. 15 wrap behind Hotel 81 Joy are kept; the party lines move, and the row end moves 0.66 m north to the measured end pier of No. 35 on open ground.',
    replaces: ['1223407884', '1223407885', '1223407886', '1223407883', '1223407882', '1223407881', '1223407880', '1223407879', '1223407878', '1223407877', '1223407876'],
    build(map) {
      const frontStart = sourcePoint(map, '1223407884', 1), frontEnd = sourcePoint(map, '1223407876', 0);
      const rear = sub(sourcePoint(map, '1223407885', 2), sourcePoint(map, '1223407885', 1));
      // The row ends at its measured end pier, 0.66 m past the source end (70.44 m), on open ground.
      const lines = [0, 9.3, 14.5, 19.8, 25.0, 31.0, 37.1, 44.3, 48.3, 54.2, 57.9, 64.2, 71.1];
      const no15 = map.buildings.find(b => b.id === '1223407884').coordinates.map(c => project(c, map.origin));
      const houses = ['15', '17', '19', '21', '23', '25', '27', '29', '29A', '31', '33', '35'].map(number => ({
        id: `l11w-${number.toLowerCase()}`, street: 'Lorong 11 Geylang', number, levels: null,
        // No. 15 keeps its source wrap behind Hotel 81 Joy (source vertices 1–4).
        outline: number === '15' ? ({ f1, rear }) => [f1, no15[1], no15[2], no15[3], no15[4], add(f1, rear)] : undefined,
      }));
      return terrace(map, { frontStart, frontEnd, rear, lines, houses });
    },
  },
  {
    id: 'geylang-253-267', question: 2, approved: '2026-10-10',
    evidence: 'Party lines measured on 10 October 2026 from six June 2024 far-side panoramas rectified on the source street front, where they agree with the façade about 0.5 m behind it. Measured along the front from the Leong Kee corner: 听雨轩 / 新福興 19.7 m, 新福興 / 客来顺 24.9 m, 客来顺 / Instyle 30.15 m, Instyle / Mobile Time 36.0 m and Mobile Time / Shi Hao 41.4 m, against source bays every 4.85 m. The Leong Kee / 听雨轩 line measured 14.1 m and keeps the source 14.52 m, within the measurement spread, so the existing Leong Kee model is unchanged. The Shi Hao corner block was measured from both streets: its Lorong 13 face stands about 2.1 m east of the source east edge, consistent across three Lorong 13 panoramas, with an estimated 0.8 m chamfer at the corner (its front face ends about 49.8 m along, read square-on). It keeps the source rear line; a possible rear annex with a blue side door, about 2 m further north, is not drawn.',
    replaces: ['454254211', '454254210', '454254209', '454254208', '454254207', '454254206', '454254205'],
    build(map) {
      const frontStart = sourcePoint(map, '454254211', 3), frontEnd = sourcePoint(map, '454254205', 2);
      const rear = sub(sourcePoint(map, '454254205', 1), frontEnd);
      const lines = [0, 5.18, 10.38, 15.63, 21.48, 26.88, 36.03];
      const depth = Math.hypot(rear[0], rear[1]), back = [rear[0] / depth, rear[1] / depth], chamfer = .8;
      const houses = ['255', '257', '259', '261', '263', '267'].map(number => ({
        id: `gr-${number}`, street: 'Geylang Road', number, levels: null,
        outline: number === '267' ? ({ f0, f1, rear: r, e }) => [f0, at(f0, e, lines[6] - lines[5] - chamfer), at(f1, back, chamfer), add(f1, r), add(f0, r)] : undefined,
      }));
      return terrace(map, { frontStart, frontEnd, rear, lines, houses });
    },
  },
  {
    id: 'geylang-237', question: 3, approved: '2026-10-10',
    evidence: 'Source way 454274485 holds two buildings. June 2024 Street View from the Lorong 9 junction and from Geylang Road shows a pink three-storey corner building at Lorong 9: a three-bay Geylang Road front, a chamfered corner and a long Lorong 9 face. Its front ends where the source outline steps back (about 10.2 m from the Lorong 9 corner), which the photographed proportions and the registered satellite roof (a brown roof about 10 m wide) both support. East of the step, a separate annex under a grey skylit roof comes forward flush with Chen Hing, as the satellite roof and the continuous street front show. The split runs from the step parallel to the Lorong 9 face; the corner chamfer (about 2.6 m) is estimated from the junction views.',
    replaces: ['454274485'],
    build(map) {
      const P = i => sourcePoint(map, '454274485', i), P0 = P(0), P1 = P(1), P2 = P(2), P4 = P(4), P5 = P(5);
      const unit = v => { const l = Math.hypot(v[0], v[1]); return [v[0] / l, v[1] / l]; };
      const front = unit(sub(P5, P4)), side = unit(sub(P0, P5)), cut = 2.6 / Math.SQRT2;
      // Where a line from the step, parallel to the Lorong 9 face, meets the rear edge P0–P1.
      const r = sub(P1, P0), d = side, den = d[0] * r[1] - d[1] * r[0], w = sub(P0, P4);
      const t = (w[0] * r[1] - w[1] * r[0]) / den, R = at(P4, d, t);
      const CH = sourcePoint(map, '475158359', 3);
      return [
        { id: 'gr-237', street: 'Geylang Road', number: '237', levels: 3, outline: [P4, at(P5, front, -cut), at(P5, side, cut), P0, R] },
        { id: 'gr-237-annex', street: 'Geylang Road', number: null, levels: null, outline: [P4, R, P1, P2, CH] },
      ];
    },
  },
  {
    id: 'geylang-229-233', question: 11, approved: '2026-10-10',
    evidence: 'Partial-block split of the 15.8 m source block 475158360 west of the Frog Porridge corner. Three June 2024 panoramas agree on the widths along its front from the Frog Porridge party line, though not on absolute positions: the white No. 233 building (Wat Dhammasatis upstairs, a durian shop below) about 6.0 m, the teal-shuttered Peranakan No. 231 about 4.2 m and the Lian Seng Peranakan No. 229 about 5.2 m. Their 15.4 m total was scaled to the 15.8 m source front (factor 1.026). Cut lines run square to the front.',
    replaces: ['475158360'],
    build(map) {
      const src = map.buildings.find(b => b.id === '475158360').coordinates.slice(0, -1).map(c => project(c, map.origin));
      const P1 = src[1], P0 = src[0], len = Math.hypot(P0[0] - P1[0], P0[1] - P1[1]);
      const front = [(P0[0] - P1[0]) / len, (P0[1] - P1[1]) / len];
      // Cut lines run square to the front, 1.6° from the Frog Porridge side wall.
      const inward = [front[1], -front[0]], cut = (inward[0] * (src[4][0] - src[0][0]) + inward[1] * (src[4][1] - src[0][1])) > 0 ? inward : neg(inward);
      const k = len / 15.4, [p233, p231, p229] = strips(src, P1, front, cut, [6.0 * k, 10.2 * k]);
      return [
        { id: 'gr-233', street: 'Geylang Road', number: '233', levels: 3, outline: p233 },
        { id: 'gr-231', street: 'Geylang Road', number: '231', levels: 2, outline: p231 },
        { id: 'gr-229', street: 'Geylang Road', number: '229', levels: 2, outline: p229 },
      ];
    },
  },
  {
    id: 'geylang-236-250', question: 16, approved: '2026-10-10',
    evidence: 'Partial-block split of the 57 m source block 454438330 on the south side of Geylang Road, between Lorong 10 and the Mufiz corner, on the source front (open question 16). Triangulating the Shadow Tattoo board end and the salon party pilaster from two June 2024 panoramas puts the façades 2.4 m in front of the source front, the same offset as this drive\'s position errors elsewhere, so the source front is kept; the earlier 6 m correlation peak proves spurious when rectified. Party lines read at that depth from six panoramas, measured along the front from the Lorong 10 corner: 9.9 (the corner coffeeshop | No. 238), 16.6 (| Monster Ink, No. 240), 21.0 (| No. 242), 27.5 (| Shadow Tattoo, No. 244), 33.5 (| the glass-fronted No. 246), 40.6 (| the Nanyang Lian building, No. 248) and 51.7 m (| the Mufiz building, No. 250). Cut lines run square to the front.',
    replaces: ['454438330'],
    build(map) {
      const src = map.buildings.find(b => b.id === '454438330').coordinates.slice(0, -1).map(c => project(c, map.origin));
      const P1 = src[1], P2 = src[2], len = Math.hypot(P2[0] - P1[0], P2[1] - P1[1]);
      const front = [(P2[0] - P1[0]) / len, (P2[1] - P1[1]) / len];
      const inward = [-front[1], front[0]], cut = (inward[0] * (src[0][0] - P1[0]) + inward[1] * (src[0][1] - P1[1])) > 0 ? inward : neg(inward);
      const pieces = strips(src, P1, front, cut, [9.9, 16.6, 21.0, 27.5, 33.5, 40.6, 51.7]);
      return ['236', '238', '240', '242', '244', '246', '248', '250'].map((number, i) => ({ id: `gr-${number}`, street: 'Geylang Road', number, levels: null, outline: pieces[i] }));
    },
  },
  {
    id: 'sims-106-110', question: '8a', approved: '2026-10-10',
    evidence: 'Re-spacing of Sims Avenue Nos. 106–110, measured on 10 October 2026 from June 2024 ground-floor frames rectified 1.5 m in front of the source front, where the 108 pier aligns across three panoramas. The ground-floor piers confirm the source party lines at 20.76 m (the pier lettered 108) and 27.17 m (Amrise, No. 112, unchanged), measured along the front from the Fok Wai Kee corner. The 106/108 pier stands at about 15.0 m against the source 12.45 m. Red Dot Running Company\'s shopfront runs from that pier to Amrise, across the 108 pier, so the former Nos. 108 and 110 form one unit. An earlier reading of four uniform 7.1 m upper-storey bays was not borne out at ground level and is superseded.',
    replaces: ['682928753', '682928752', '682928751'],
    build(map) {
      const out = id => map.buildings.find(b => b.id === id).coordinates.slice(0, -1).map(c => project(c, map.origin));
      const A = project(map.buildings.find(b => b.id === '682928754').coordinates[0], map.origin);
      const B = project(map.buildings.find(b => b.id === '682928750').coordinates[1], map.origin);
      const len = Math.hypot(B[0] - A[0], B[1] - A[1]), front = [(B[0] - A[0]) / len, (B[1] - A[1]) / len];
      const no108 = out('682928752'), inward = [-front[1], front[0]];
      const into = (inward[0] * (no108[4][0] - no108[0][0]) + inward[1] * (no108[4][1] - no108[0][1])) > 0 ? inward : neg(inward);
      const [west, east] = strips(no108, A, front, into, [15.0]);
      return [
        { id: 'sa-106', street: 'Sims Avenue', number: '106', levels: 3, outline: merge(out('682928753'), west) },
        { id: 'sa-108', street: 'Sims Avenue', number: '108', levels: 3, outline: merge(east, out('682928751')) },
      ];
    },
  },
  {
    id: 'lorong-11-38', question: 8, approved: '2026-10-10',
    evidence: 'The Guan Keat coffeeshop corner block at No. 38 Lorong 11 and Sims Avenue. June 2024 Street View from four Sims Avenue panoramas shows one mint-green three-storey block along the whole Sims face, and the registered satellite roof agrees with the 23.17 m source side; an earlier 18.6 m triangulation is not confirmed, so the source length is kept. The rounded Lorong 11 corner is authored as a 3 m chamfer.',
    replaces: ['1223250209'],
    build(map) {
      const src = map.buildings.find(b => b.id === '1223250209').coordinates.slice(0, -1).map(c => project(c, map.origin));
      // Vertex 3 is the Lorong 11 / Sims Avenue corner; cut it 2.12 m along each side.
      const c = src[3], toL11 = [(src[2][0] - c[0]), (src[2][1] - c[1])], toSims = [(src[0][0] - c[0]), (src[0][1] - c[1])];
      const u = v => { const l = Math.hypot(v[0], v[1]); return [v[0] / l, v[1] / l]; }, cut = 3 / Math.SQRT2;
      return [{ id: 'l11-38', street: 'Lorong 11 Geylang', number: '38', levels: 3,
        outline: [src[0], src[1], src[2], at(c, u(toL11), cut), at(c, u(toSims), cut)] }];
    },
  },
  {
    id: 'lorong-15-22', question: 11, approved: '2026-10-10',
    evidence: 'Partial-block split of source block 454254281 on Lorong 15 (east side), which spans several roofs. Three April 2024 Lorong 15 panoramas (MgS1…, 4VkQ…, dwar…) agree, by parallax on the HOTEL 81 sign and the building edges, that the blue Hotel 81 Spring frontage runs from about 13.0 m to 29.2 m along the source front from its north end, about 0.55 m behind it. North of it stand the Teck Keow Association building (26A) and the Sin Chew Tan\'s Clan Association building (28A), split at 6.6 m in the ratio of their photographed widths (open question 15); south of it the Hong Sheng Koon house (20E), the Singapore Ship-Chandlers Association house (20) and a single-storey lean-to, photographed 4.4 m forward and split at their measured party lines shifted onto the hotel line. The registered satellite roof places the hotel about 3–4 m further north; the satellite registration is uncertain by a similar amount here, so the street measurement is used. Cut lines run square to the front.',
    replaces: ['454254281'],
    build(map) {
      const src = map.buildings.find(b => b.id === '454254281').coordinates.slice(0, -1).map(c => project(c, map.origin));
      const P0 = src[0], P3 = src[3], len = Math.hypot(P3[0] - P0[0], P3[1] - P0[1]), front = [(P3[0] - P0[0]) / len, (P3[1] - P0[1]) / len];
      const inward = [-front[1], front[0]], cut = (inward[0] * (src[1][0] - P0[0]) + inward[1] * (src[1][1] - P0[1])) > 0 ? inward : neg(inward);
      // The northern 13 m holds two houses (open question 15): Sin Chew Tan's (28A) and Teck Keow (26A),
      // photographed about 5.4 m and 5.1 m wide and split in that ratio.
      // South of the hotel, two houses and a lean-to photographed 4.4 m forward (the same treatment as
      // open question 15): Hong Sheng Koon (20E), the Ship-Chandlers (20) and a shed.
      const [n28, n26, hotel, s20e, s20, shed] = strips(src, P0, front, cut, [6.6, 13.0, 29.2, 35.6, 42.4]);
      return [
        { id: 'l15-28a', street: 'Lorong 15 Geylang', number: '28A', levels: 3, outline: n28 },
        { id: 'l15-26a', street: 'Lorong 15 Geylang', number: '26A', levels: 3, outline: n26 },
        { id: 'l15-22', street: 'Lorong 15 Geylang', number: '22', levels: 5, outline: hotel },
        { id: 'l15-20e', street: 'Lorong 15 Geylang', number: '20E', levels: 4, outline: s20e },
        { id: 'l15-20', street: 'Lorong 15 Geylang', number: '20', levels: 4, outline: s20 },
        { id: 'l15-shed', street: 'Lorong 15 Geylang', number: null, levels: 1, outline: shed },
      ];
    },
  },
  {
    id: 'lorong-9-10', question: 11, approved: '2026-10-10',
    evidence: 'Partial-block estimate for No. 10 Lorong 9 (source way 1223603460). Three June 2024 Lorong 9 panoramas rectified on planes parallel to the source front agree only on a plane about 8 m behind it: there the green Public Free Clinic Society tower spans the full 13.1 m frontage (to within about 0.5 m in all three), with its lettered top band at about 24.4–26 m. The front 8 m is an open forecourt where the clinic vans park, and the registered satellite roof shows the tower set back by a similar amount. This resolves the earlier blocker, in which a rectification at the source front showed the tower only half as wide. The footprint keeps the source rear and sides behind a cut 8 m inside the front.',
    replaces: ['1223603460'],
    build(map) {
      const src = map.buildings.find(b => b.id === '1223603460').coordinates.slice(0, -1).map(c => project(c, map.origin));
      const F0 = src[3], F1 = src[0], len = Math.hypot(F1[0] - F0[0], F1[1] - F0[1]), along = [(F1[0] - F0[0]) / len, (F1[1] - F0[1]) / len];
      let inward = [-along[1], along[0]];
      if (inward[0] * (src[1][0] - F1[0]) + inward[1] * (src[1][1] - F1[1]) < 0) inward = neg(inward);
      const P = at(F0, inward, 8), keepInward = (along[0] * inward[1] - along[1] * inward[0]) >= 0 ? along : neg(along);
      return [{ id: 'l9-10', street: 'Lorong 9 Geylang', number: '10', levels: 9, outline: clip(src, P, keepInward) }];
    },
  },
  {
    id: 'lorong-11-1-7', question: 7, approved: '2026-10-10',
    evidence: 'One single-storey building with two orange-tiled hipped roofs and herringbone timber cladding stands across the four source ways for Nos. 1–7 Lorong 11, set back behind a paved forecourt. Three April 2024 panoramas rectified on planes parallel to the source front agree (the CICO FLOORING logo to within about 0.5 m) on a façade about 5 m behind it, along the whole 21 m run. The four ways are merged and the front 5 m is left open as the forecourt.',
    replaces: ['1223407887', '1223407888', '1223407889', '1223407890'],
    build(map) {
      const out = id => map.buildings.find(b => b.id === id).coordinates.slice(0, -1).map(c => project(c, map.origin));
      let whole = out('1223407887');
      for (const id of ['1223407888', '1223407889', '1223407890']) whole = merge(whole, out(id));
      const F0 = project(map.buildings.find(b => b.id === '1223407887').coordinates[0], map.origin);
      const F1 = project(map.buildings.find(b => b.id === '1223407890').coordinates[1], map.origin);
      const len = Math.hypot(F1[0] - F0[0], F1[1] - F0[1]), along = [(F1[0] - F0[0]) / len, (F1[1] - F0[1]) / len];
      let inward = [-along[1], along[0]];
      const c = whole.reduce((s, p) => [s[0] + p[0] / whole.length, s[1] + p[1] / whole.length], [0, 0]);
      if (inward[0] * (c[0] - F0[0]) + inward[1] * (c[1] - F0[1]) < 0) inward = neg(inward);
      const P = at(F0, inward, 5), keep = (along[0] * inward[1] - along[1] * inward[0]) >= 0 ? along : neg(along);
      return [{ id: 'l11-1-7', street: 'Lorong 11 Geylang', number: '1–7', levels: 1, outline: clip(whole, P, keep) }];
    },
  },
  {
    id: 'gems-ville', question: 6, approved: '2026-10-10',
    evidence: 'Gems Ville, 8 Lorong 13, a seven-storey condominium completed in 2025 on a 731 m² lot (listing records), replaces the earlier 6A source way (23.3 × 15.3 m), which predates it. April 2024 Street View shows the nearly finished building from four Lorong 13 panoramas; rectified on the old source front, its left (north) edge drifts with the camera in a way that places the façade about 1 m behind that line, at about 2.2 m north of the old way. Its south edge meets the source line of No. 4 (Sui Yuan Ju). The depth, 26 m, follows from the 731 m² lot and the measured 27.4 m frontage; the registered satellite imagery predates completion.',
    replaces: ['452646018'],
    build(map) {
      const out = map.buildings.find(b => b.id === '452646018').coordinates.slice(0, -1).map(c => project(c, map.origin));
      const A = out[3], B = out[2], len = Math.hypot(B[0] - A[0], B[1] - A[1]), e = [(B[0] - A[0]) / len, (B[1] - A[1]) / len];
      let inward = [-e[1], e[0]];
      if (inward[0] * (out[0][0] - A[0]) + inward[1] * (out[0][1] - A[1]) < 0) inward = neg(inward);
      const P = (s, d) => at(at(A, e, s), inward, d);
      return [{ id: 'l13-8', street: 'Lorong 13 Geylang', number: '8', levels: 7, outline: [P(-2.2, 1), P(25.2, 1), P(25.2, 27), P(-2.2, 27)] }];
    },
  },
];

const ring = (outline, origin) => {
  const c = outline.map(p => unproject(p, origin));
  return [...c, c[0]];
};

/** The map with every approved group applied. Authored buildings carry `geometrySource` and `replaces`. */
export function withAuthoredFootprints(map) {
  const replaced = new Set(authoredFootprintGroups.flatMap(g => g.replaces));
  const authored = authoredFootprintGroups.flatMap(g => g.build(map).map(h => ({
    id: h.id, levels: h.levels, street: h.street, number: h.number, coordinates: ring(h.outline, map.origin ?? ORIGIN),
    geometrySource: 'authored-estimate', group: g.id, replaces: g.replaces,
  })));
  return {
    ...map,
    buildings: [...map.buildings.filter(b => !replaced.has(b.id)), ...authored],
    replacedBuildings: map.buildings.filter(b => replaced.has(b.id)),
  };
}
