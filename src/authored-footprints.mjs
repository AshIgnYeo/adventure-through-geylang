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

/** Rotate an outline so that its edge 0 lies on the front line through `a` along `dir` (to within 5 cm). */
function frontFirst(outline, a, dir) {
  const on = q => Math.abs(dir[0] * (q[1] - a[1]) - dir[1] * (q[0] - a[0])) < .05;
  const i = outline.findIndex((q, k) => on(q) && on(outline[(k + 1) % outline.length]));
  if (i < 0) throw new Error('no edge on the front line');
  return [...outline.slice(i), ...outline.slice(0, i)];
}
/** Split one source way into strips along a front edge (from vertex `from` towards vertex `to`), each with its front as edge 0. */
function splitAlongFront(map, id, from, to, cuts) {
  const src = map.buildings.find(b => b.id === id).coordinates.slice(0, -1).map(c => project(c, map.origin));
  const P0 = src[from], P1 = src[to], len = Math.hypot(P1[0] - P0[0], P1[1] - P0[1]), front = [(P1[0] - P0[0]) / len, (P1[1] - P0[1]) / len];
  const c = src.reduce((s, p) => [s[0] + p[0] / src.length, s[1] + p[1] / src.length], [0, 0]);
  const inward = [-front[1], front[0]], cut = (inward[0] * (c[0] - P0[0]) + inward[1] * (c[1] - P0[1])) > 0 ? inward : neg(inward);
  return strips(src, P0, front, cut, cuts).map(o => frontFirst(o, P0, front));
}

/**
 * Re-space a row along its own front line. Points are read as (t, d): t along `dir` from `origin`, d towards the
 * street. One monotonic, piecewise-linear map of t takes the source party lines (`breaks`, [source, measured] pairs)
 * to the measured ones and is applied to every vertex of every house, so neighbours keep their shared walls and
 * interlocking rear parts stay apart; vertices on the source front (|d| < 0.5 m) move to the measured front `d`.
 * A house whose source front lies off the row's line gives it as `sourceFront` (d), within `band` (default 0.5 m) for
 * a stepped front, and `front` may be a function (d, new t) => new d. Each outline keeps its source vertex order, so its edge numbers are unchanged.
 */
function warpRow(map, origin, dir, breaks, houses) {
  const n = [-dir[1], dir[0]];
  const T = t => {
    if (t <= breaks[0][0]) return breaks[0][1] + t - breaks[0][0];
    for (let i = 1; i < breaks.length; i++) {
      const [a0, b0] = breaks[i - 1], [a1, b1] = breaks[i];
      if (t <= a1) return a1 === a0 ? b1 : b0 + (t - a0) * (b1 - b0) / (a1 - a0);
    }
    const [a, b] = breaks.at(-1); return b + t - a;
  };
  return houses.map(h => {
    const src = map.buildings.find(b => b.id === h.source).coordinates.slice(0, -1).map(c => project(c, map.origin));
    const outline = src.map(p => {
      const q = sub(p, origin), t = q[0] * dir[0] + q[1] * dir[1], d = q[0] * n[0] + q[1] * n[1];
      const onFront = Math.abs(d - (h.sourceFront ?? 0)) < (h.band ?? .5), d1 = !onFront ? d : typeof h.front === 'function' ? h.front(d, T(t)) : h.front;
      return add(add(origin, [dir[0] * T(t), dir[1] * T(t)]), [n[0] * d1, n[1] * d1]);
    });
    return { id: h.id, street: h.street, number: h.number, levels: h.levels, outline };
  });
}
const unit = (p, q) => { const l = Math.hypot(q[0] - p[0], q[1] - p[1]); return [(q[0] - p[0]) / l, (q[1] - p[1]) / l]; };
/** Move each edge of a convex outline along its outward normal by `offsets[i]` (negative is inward); vertex i is where
 * the moved edges i - 1 and i meet, so the vertex order and edge numbers are kept. */
function offsetEdges(o, offsets) {
  const c = o.reduce((s, p) => [s[0] + p[0] / o.length, s[1] + p[1] / o.length], [0, 0]);
  const lines = o.map((p, i) => {
    const q = o[(i + 1) % o.length], d = unit(p, q); let n = [-d[1], d[0]];
    if (n[0] * (p[0] - c[0]) + n[1] * (p[1] - c[1]) < 0) n = neg(n);
    return { p: add(p, [n[0] * offsets[i], n[1] * offsets[i]]), d };
  });
  return o.map((_, i) => {
    const A = lines[(i + o.length - 1) % o.length], B = lines[i], det = A.d[0] * -B.d[1] - A.d[1] * -B.d[0];
    const r = sub(B.p, A.p), k = (r[0] * -B.d[1] - r[1] * -B.d[0]) / det;
    return at(A.p, A.d, k);
  });
}
const outlineOf = (map, id) => map.buildings.find(b => b.id === id).coordinates.slice(0, -1).map(c => project(c, map.origin));

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
    id: 'geylang-218-234', question: 11, approved: '2026-10-10',
    evidence: 'Partial-block split of the 49.5 m source block 454438340 on the south side of Geylang Road, between Lorong 8 and Lorong 10. Triangulating the two party piers either side of the TakeToys shop from two June 2024 panoramas puts the street piers about 0.9 m in front of the source front, where three panoramas then agree; the source front is kept. Party lines read at that depth, measured along the front from the Lorong 8 end: 11.65 (the corner restaurant | Tian Tian Minimart), 17.9 (| TakeToys), 23.6 (| the blue building), 35.8 (| the cream house) and 41.2 m (| the tall white block). Cut lines run square to the front.',
    replaces: ['454438340'],
    build(map) {
      const src = map.buildings.find(b => b.id === '454438340').coordinates.slice(0, -1).map(c => project(c, map.origin));
      const P1 = src[1], P2 = src[2], len = Math.hypot(P2[0] - P1[0], P2[1] - P1[1]);
      const front = [(P2[0] - P1[0]) / len, (P2[1] - P1[1]) / len];
      const inward = [-front[1], front[0]], cut = (inward[0] * (src[0][0] - P1[0]) + inward[1] * (src[0][1] - P1[1])) > 0 ? inward : neg(inward);
      const pieces = strips(src, P1, front, cut, [11.65, 17.9, 23.6, 35.8, 41.2]);
      return ['218', '220', '222', '224', '228', '230'].map((key, i) => ({ id: `gr-${key}`, street: 'Geylang Road', number: key === '222' ? '222' : null, levels: null, outline: pieces[i] }));
    },
  },
  {
    id: 'sims-107-111', question: 11, approved: '2026-10-10',
    evidence: 'Source way 439168694 on the north side of Sims Avenue covers a forecourt of fruit stalls and tents as well as a tiled two-storey row behind it. Three June 2024 panoramas (_B2c, eLBm, -vjb) agree on the row\'s façade only about 6.5 m behind the way\'s Sims front, and there it shows three units, a red west unit to 4.8 m, the white Sài Gòn Mart unit to 8.8 m and the red Davco unit to 15.5 m, measured along the front line from its west node; the pagoda building\'s plaza lies east of the row. Following the PFCS precedent (open question 11), the way is clipped 6.5 m behind its front, split at the measured party lines, and the open ground east of 15.5 m is left unbuilt.',
    replaces: ['439168694'],
    build(map) {
      const src = map.buildings.find(b => b.id === '439168694').coordinates.slice(0, -1).map(c => project(c, map.origin));
      const F0 = src[6], F1 = src[5], len = Math.hypot(F1[0] - F0[0], F1[1] - F0[1]), along = [(F1[0] - F0[0]) / len, (F1[1] - F0[1]) / len];
      let inward = [-along[1], along[0]];
      if (inward[0] * (src[1][0] - F0[0]) + inward[1] * (src[1][1] - F0[1]) < 0) inward = neg(inward);
      const P = at(F0, inward, 6.5), keepInward = (along[0] * inward[1] - along[1] * inward[0]) >= 0 ? along : neg(along);
      const back = clip(src, P, keepInward);
      const [west, white, davco, open] = strips(back, F0, along, inward, [4.8, 8.8, 15.5]);
      return [
        { id: 'sa-107', street: 'Sims Avenue', number: null, levels: 2, outline: west },
        { id: 'sa-109', street: 'Sims Avenue', number: null, levels: 2, outline: white },
        { id: 'sa-111', street: 'Sims Avenue', number: '111', levels: 2, outline: davco },
      ];
    },
  },
  {
    id: 'geylang-217-227', question: 28, approved: '2026-10-11',
    evidence: 'Re-cut of the large source block 453797929 between the Lorong 7 corner and Lian Seng (open question 28; first split under open question 11). Party lines triangulated from June 2024 panoramas (i-vt and 2Y21, the widest pair, checked against NR4z) fall 6.2, 10.4, 15.2 and 20.2 m along the source front from the Lorong 7 corner, on a plane about 1-1.5 m behind it; the same drive puts the Lorong 7 and Lorong 9 corners on their source corners, so these positions are not shifted. A street tree hides the next two lines in 2024; panoramas from 2009-2019 show the row whole, with the two houses east of 20.2 m in the ratio 4.9 : 4.65 up to the house of Lian Seng, whose west party line triangulates at 29.35 m, so the cuts fall at 24.9 and 29.35 m. The east 4.87 m of the block is the west part of the house photographed with Lian Seng\'s board (open question 34). Cut lines run square to the front.',
    replaces: ['453797929'],
    build(map) {
      const [h217, h219, h221, h223, h225, h227, rest] = splitAlongFront(map, '453797929', 0, 11, [6.2, 10.4, 15.2, 20.2, 24.9, 29.35]);
      return [
        { id: 'gr-217', street: 'Geylang Road', number: '217', levels: 2, outline: h217 },
        { id: 'gr-219', street: 'Geylang Road', number: '219', levels: 2, outline: h219 },
        { id: 'gr-221', street: 'Geylang Road', number: '221', levels: 2, outline: h221 },
        { id: 'gr-223', street: 'Geylang Road', number: null, levels: 2, outline: h223 },
        { id: 'gr-225', street: 'Geylang Road', number: null, levels: 2, outline: h225 },
        { id: 'gr-227', street: 'Geylang Road', number: null, levels: 2, outline: h227 },
        { id: 'gr-229-west', street: 'Geylang Road', number: null, levels: 2, outline: rest },
      ];
    },
  },
  {
    id: 'geylang-258', question: 29, approved: '2026-10-11',
    evidence: 'Partial-block split of source block 454438318 east of Lorong 12, which runs past the study\'s east edge (first split under open question 11 at 16.8 m, re-split under open question 29). Party lines triangulated from two June 2024 panoramas, confirmed from a second drive, put the grey house with the red 串 board at 11.0-16.8 m along the Geylang Road front from the Lorong 12 corner, and the façades from there east about 4.8 m north of the source front, towards the road; the registered satellite roofs agree. The ChongQingXiaoMian corner building (0-11.0 m), whose Geylang Road face stands near the source front, keeps it. The grey house and the rest of the block have their fronts moved 4.8 m north, which leaves them about 2.2 m clear of the modelled carriageway; their rear lines are kept. Cut lines run square to the front.',
    replaces: ['454438318'],
    build(map) {
      const src = map.buildings.find(b => b.id === '454438318').coordinates.slice(0, -1).map(c => project(c, map.origin));
      const P0 = src[0], P1 = src[1], len = Math.hypot(P1[0] - P0[0], P1[1] - P0[1]);
      const front = [(P1[0] - P0[0]) / len, (P1[1] - P0[1]) / len];
      const inward = [-front[1], front[0]], cut = (inward[0] * (src[2][0] - P0[0]) + inward[1] * (src[2][1] - P0[1])) > 0 ? inward : neg(inward);
      const [corner, grey, rest] = strips(src, P0, front, cut, [11.0, 16.8]);
      // Vertices on the source front move 4.8 m towards Geylang Road.
      const onFront = q => Math.abs(front[0] * (q[1] - P0[1]) - front[1] * (q[0] - P0[0])) < .05;
      const forward = o => o.map(q => onFront(q) ? at(q, neg(cut), 4.8) : q);
      return [
        { id: 'gr-258', street: 'Geylang Road', number: '258', levels: 2, outline: corner },
        { id: 'gr-258-grey', street: 'Geylang Road', number: null, levels: 2, outline: forward(grey) },
        { id: 'gr-260-east', street: 'Geylang Road', number: null, levels: null, outline: forward(rest) },
      ];
    },
  },
  {
    id: 'sims-98-102', question: 23, approved: '2026-10-10',
    evidence: 'Re-spacing of Sims Avenue Nos. 98-102 between the No. 96 Lorong 13 corner and Fok Wai Kee. Triangulating both ends of the green BUILDERSmart board on No. 100 from two June 2024 panoramas puts the frontage about 2.3 m in front of the source front; read at that depth on panorama eLBm, the party lines fall at about -0.2, 5.0, 10.1 and 15.7 m along the front from the No. 96 line, against the source\'s 0, 6.42, 12.53 and 16.33 m. The total agrees, so the measured lines are scaled onto the source run (factor 1.027), giving cuts at 5.34 and 10.58 m. The three ways are merged along their shared party walls and cut square to the front; the stepped source rear is kept.',
    replaces: ['682928757', '682928756', '682928755'],
    build(map) {
      const out = id => map.buildings.find(b => b.id === id).coordinates.slice(0, -1).map(c => project(c, map.origin));
      const whole = merge(merge(out('682928757'), out('682928756')), out('682928755'));
      const F0 = out('682928757')[0], F1 = out('682928755')[1], len = Math.hypot(F1[0] - F0[0], F1[1] - F0[1]);
      const front = [(F1[0] - F0[0]) / len, (F1[1] - F0[1]) / len];
      const inward = [-front[1], front[0]], c = whole.reduce((s, p) => [s[0] + p[0] / whole.length, s[1] + p[1] / whole.length], [0, 0]);
      const cut = (inward[0] * (c[0] - F0[0]) + inward[1] * (c[1] - F0[1])) > 0 ? inward : neg(inward);
      const [p98, p100, p102] = strips(whole, F0, front, cut, [5.34, 10.58]);
      return [
        { id: 'sa-98', street: 'Sims Avenue', number: '98', levels: 2, outline: p98 },
        { id: 'sa-100', street: 'Sims Avenue', number: '100', levels: 2, outline: p100 },
        { id: 'sa-102', street: 'Sims Avenue', number: '102', levels: 2, outline: p102 },
      ];
    },
  },
  {
    id: 'lorong-13-269-north', question: 21, approved: '2026-10-10',
    evidence: 'The No. 269 corner coffeeshop continues north along Lorong 13 beyond source way 454254219, where the source has no building: a two-storey bay about 6 m long, then a tall single-storey wing with a balustraded parapet, about 11 m in all, read on the pE_L panorama rectified at the depth its vents triangulate (about 3.6 m in front of the source line, this drive\'s position error). The footprint continues the source way\'s Lorong 13 face 11.0 m north and runs 8 m deep, its south edge on the source rear line of the Geylang Road row.',
    replaces: [],
    build(map) {
      const src = map.buildings.find(b => b.id === '454254219').coordinates.slice(0, -1).map(c => project(c, map.origin));
      const A = src[2], B = src[1], len = Math.hypot(B[0] - A[0], B[1] - A[1]), north = [(A[0] - B[0]) / len, (A[1] - B[1]) / len];
      const east = [(src[3][0] - A[0]) / Math.hypot(src[3][0] - A[0], src[3][1] - A[1]), (src[3][1] - A[1]) / Math.hypot(src[3][0] - A[0], src[3][1] - A[1])];
      const P1 = at(A, north, 11.0);
      return [{ id: 'l13-269-north', street: 'Lorong 13 Geylang', number: null, levels: 2, outline: [A, P1, at(P1, east, 8), at(A, east, 8)] }];
    },
  },
  {
    id: 'lorong-13-shi-hao-north', question: 22, approved: '2026-10-10',
    evidence: 'A narrow four-storey building stands between the back lane and the Shi Hao corner (No. 267), where the source has no building. Rectified on the extension of Shi Hao\'s Lorong 13 face, its front measures about 4.0 m; satellite imagery shows a flat roof strip about 3-4 m wide running back about 14 m from Lorong 13 along the rear line of the Geylang Road row. The footprint continues Shi Hao\'s authored Lorong 13 face 4.0 m north and runs 14 m back along that rear line.',
    replaces: [],
    build() {
      const P0 = [38.32, 60.57], dirN = [-.170, -.985], west = [-.986, .168];
      const P1 = at(P0, dirN, 4.0);
      return [{ id: 'l13-shi-hao-north', street: 'Lorong 13 Geylang', number: null, levels: 4, outline: [P0, at(P0, west, 14), at(P1, west, 14), P1] }];
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
  {
    id: 'mosque-245', question: 25, approved: '2026-10-10',
    evidence: 'Masjid Haji Mohd Salleh, 245 Geylang Road. Three June 2024 panoramas, triangulated, put the façade on a line parallel to Geylang Road, about 8° off the source front of way 454254204, and 20.3 m wide against the 22.46 m source front. After the 2.8 m (depth) and 1.5 m (along-street) panorama position error recorded at Chen Hing, the line meets the source west wall (the Chen Hing party wall) about 1.2 m behind the source front corner. The front runs 20.3 m east from there; a new east wall runs square to it back to the source rear edge, leaving the source strip of about 2 m beside Shan Yuan Tang as an open yard. The source west and rear lines are kept.',
    replaces: ['454254204'],
    build(map) {
      const src = map.buildings.find(b => b.id === '454254204').coordinates.slice(0, -1).map(c => project(c, map.origin));
      const [rearWest, rearEast, , frontWest] = src;
      // The triangulated façade line (scene metres), corrected for the shared panorama position error.
      const W = [-52.21 + 2.28, 89.45 + 2.69], E = [-32.52 + 2.28, 83.72 + 2.69];
      const len = Math.hypot(E[0] - W[0], E[1] - W[1]), east = [(E[0] - W[0]) / len, (E[1] - W[1]) / len], back = [east[1], -east[0]];
      // Where a line from p along d meets the line through q and r.
      const meet = (p, d, q, r) => {
        const e = sub(r, q), det = d[0] * -e[1] + d[1] * e[0];
        const t = ((q[0] - p[0]) * -e[1] + (q[1] - p[1]) * e[0]) / det;
        return at(p, d, t);
      };
      const frontWestCorner = meet(W, east, frontWest, rearWest);
      const frontEastCorner = at(frontWestCorner, east, 20.3);
      const rearEastCorner = meet(frontEastCorner, back, rearEast, rearWest);
      return [{ id: 'gr-245', street: 'Geylang Road', number: '245', levels: 4, outline: [frontWestCorner, frontEastCorner, rearEastCorner, rearWest] }];
    },
  },
  {
    id: 'lorong-12-east-shared', question: 31, approved: '2026-10-11',
    evidence: 'Two source ways on the east side of Lorong 12 each hold two buildings in June 2024 Street View. Way 454438320 holds a white nine-storey apartment tower on its north 10.5 m and the lavender-blue Hotel 81 Cherry on its south 10.3 m; the line between them was placed by a sightline from a back-lane panorama and by matching the hotel\'s window pairs and the tower\'s windows between two panoramas. Way 454438319 holds a three-storey pair that photographs 15.0 m wide against the 9.05 m way; its elevation is laid out proportionally on the way, so the party pier, 7.4 m from the hotel on the photographed plane, falls 4.46 m from the north end. Both cuts run square to the source front.',
    replaces: ['454438320', '454438319'],
    build(map) {
      const [tower, hotel] = splitAlongFront(map, '454438320', 1, 0, [10.5]);
      const [north, south] = splitAlongFront(map, '454438319', 0, 3, [4.46]);
      return [
        { id: 'l12-tower', street: 'Lorong 12 Geylang', number: null, levels: 9, outline: tower },
        { id: 'l12-hotel', street: 'Lorong 12 Geylang', number: null, levels: 4, outline: hotel },
        { id: 'l12-pair-north', street: 'Lorong 12 Geylang', number: null, levels: 3, outline: north },
        { id: 'l12-pair-south', street: 'Lorong 12 Geylang', number: null, levels: 3, outline: south },
      ];
    },
  },
  {
    id: 'lorong-10-hotels', question: 30, approved: '2026-10-11',
    evidence: 'Source way 454438326 runs 51 m along the east side of Lorong 10 under three separate hotel blocks. Read on a shared plane from four June 2024 panoramas, the blocks run 0.4-13.3, 13.3-38.5 and 38.5-51.8 m from the source\'s north corner, 51.4 m in all against the 51.10 m source front; scaled to the source front, the cuts fall 12.80 m and 37.87 m from the north corner. They run square to the front, as a labelled estimate.',
    replaces: ['454438326'],
    build(map) {
      const [north, middle, south] = splitAlongFront(map, '454438326', 3, 2, [12.80, 37.87]);
      return [
        { id: 'l10-dnova', street: null, number: null, levels: 6, outline: north },
        { id: 'l10-ibis', street: null, number: null, levels: 7, outline: middle },
        { id: 'l10-jxin', street: null, number: null, levels: 8, outline: south },
      ];
    },
  },
  {
    id: 'lorong-17-white-row-north', question: 41, approved: '2026-10-12',
    evidence: 'The white two-storey row of six shophouses on the east side of Lorong 17, south of the temple. The map has ways for its four southern houses only; June 2024 panoramas (M_9s..., qC7t...) put the two northern houses, about 4.8 m and 4.25 m wide, in the gap between the temple and way 454254249 (No. 6). They are added north of that way on its front and rear lines, at their photographed widths, ending on its north wall; the photographed row starts about 1.15 m further south, the same shift as the southern houses on their stretched ways. Way 454254249 is carried through unchanged so the three houses are built together.',
    replaces: ['454254249'],
    build(map) {
      const o = map.buildings.find(b => b.id === '454254249').coordinates.slice(0, -1).map(c => project(c, map.origin));
      // Vertex 1 is the north front corner, vertex 2 the north rear corner; the front (edge 0) runs north from vertex 0.
      const north = unit(o[0], o[1]), depth = sub(o[2], o[1]);
      const house = (from, width) => { const f0 = at(o[1], north, from), f1 = at(o[1], north, from + width); return [f0, f1, add(f1, depth), add(f0, depth)]; };
      const street = 'Lorong 17 Geylang';
      return [
        { id: 'l17e-10', street, number: '10', levels: 2, outline: house(4.25, 4.8) },
        { id: 'l17e-8', street, number: '8', levels: 2, outline: house(0, 4.25) },
        { id: 'l17e-6', street, number: '6', levels: 2, outline: o },
      ];
    },
  },
  {
    id: 'lorong-17-temple', question: 40, approved: '2026-10-12',
    evidence: 'The single-storey temple by No. 14 Lorong 17. Three June 2024 panoramas (GX6R... with M_9s..., and GX6R... with qKWw...) triangulate its eaves about 10.3 m long, 1-1.5 m in front of the source front, from about 4 m north of way 454254238 to 1.5 m south of it; with eaves overhanging about 0.7 m, its walls run about 8.6 m along the front. The 4.84 m way is extended 2.9 m north, which leaves about 0.4 m to Bright Star Hotel at the rear, and 0.86 m south, square to its front, keeping its 13.2 m depth and vertex order.',
    replaces: ['454254238'],
    build(map) {
      const o = map.buildings.find(b => b.id === '454254238').coordinates.slice(0, -1).map(c => project(c, map.origin));
      // Vertices 0-1 are the north side and 2-3 the south side; the front (edge 3) runs north from vertex 3 to 0.
      const south = unit(o[0], o[3]);
      const outline = [at(o[0], south, -2.9), at(o[1], south, -2.9), at(o[2], south, .86), at(o[3], south, .86)];
      return [{ id: 'l17-temple', street: 'Lorong 17 Geylang', number: null, levels: 1, outline }];
    },
  },
  {
    id: 'sims-134', question: 39, approved: '2026-10-12',
    evidence: 'No. 134 Sims Avenue, the Lorong 17 east corner. Its source outline reaches into the lane, 0.9 m from its centreline, and into Sims Avenue\'s estimated carriageway. Straight-run June 2024 panoramas (qR4q... with 9Tds..., and qR4q... with Zwx6...) triangulate the corner block\'s Lorong 17 face 5-6 m east and 2-3 m south of the source edge, about 10.6 m long against the 10.92 m source edge, so the outline\'s size fits and only its position is off. The outline is moved 5.5 m east and 2.5 m south, with its shape and vertex order kept.',
    replaces: ['682928733'],
    build(map) {
      const outline = map.buildings.find(b => b.id === '682928733').coordinates.slice(0, -1).map(c => add(project(c, map.origin), [5.5, 2.5]));
      return [{ id: 'sa-134', street: 'Sims Avenue', number: '134', levels: 3, outline }];
    },
  },
  {
    id: 'lorong-17-37-41', question: 37, approved: '2026-10-12',
    evidence: 'Source way 454254280 holds one pale yellow three-storey building of three bays between projecting fins, Nos. 37, 39 and 41 Lorong 17. Two pairs of June 2024 panoramas triangulate the building 17.4 m long, 0.2-1.0 m behind the source edge, with fins about 5.4 m and 11.5 m from its south end; laid proportionally on the 14.62 m source front, the fin centres fall about 4.4 m and 9.6 m from the south corner. The way is cut there, square to its front; the source front and rear are kept.',
    replaces: ['454254280'],
    build(map) {
      const [s37, s39, s41] = splitAlongFront(map, '454254280', 2, 1, [4.4, 9.6]);
      const street = 'Lorong 17 Geylang';
      return [
        { id: 'l17w-37', street, number: '37', levels: 3, outline: s37 },
        { id: 'l17w-39', street, number: '39', levels: 3, outline: s39 },
        { id: 'l17w-41', street, number: '41', levels: 3, outline: s41 },
      ];
    },
  },
  {
    id: 'lorong-17-west-row', question: 38, approved: '2026-10-12',
    evidence: 'The west side of Lorong 17 from No. 5 to No. 35 on its photographed line (open questions 36 and 38). Each house was triangulated from June 2024 panoramas during the Lorong 17 walk (docs/lorong-17-brief.md): the fronts stand 1.4-2.6 m in front of their source edges, the photographed houses run continuously where the map leaves gaps after Nos. 7, 21 and 25, and from No. 21 north they drift up to 2.6 m south of their source ways. Measured along the walk-ups\' source front line from No. 17\'s south corner, the party lines are taken midway between neighbouring measured ends: -1.56 (No. 17 south end, on the side passage), 4.54, 10.45, 16.04, 22.09, 28.43, 34.23, 39.86, 46.03, 52.58 and 59.43 m (No. 35 north end), with the fronts 1.5 m forward at No. 17 and 2.3 m forward elsewhere, the mean of the readings (2.1-2.5 m). Nos. 5-7 (Feng Shang Hair Salon and its north bay) are measured on their own source edge: 1.5 m forward, from 1.56 m south of the source corner to the north party line triangulated 11.35 m north of it. Rear lines and rear steps are kept: one monotonic re-spacing along each front line moves every vertex, so neighbours keep their shared walls. The side passage between Nos. 15 and 17 and way 454254237 (Nos. 9-15, on its own measured line) are unchanged.',
    replaces: ['454254236', '454254272', '454254273', '454254274', '454254270', '454254271', '454254275', '454254276', '454254277', '454254278', '454254279'],
    build(map) {
      const street = 'Lorong 17 Geylang';
      const O = sourcePoint(map, '454254272', 1), row = unit(O, sourcePoint(map, '454254279', 0));
      const breaks = [[0, -1.56], [5.70, 4.54], [11.39, 10.45], [17.09, 16.04], [20.18, 16.04], [24.55, 22.09], [28.57, 28.43], [31.01, 28.43], [36.82, 34.23], [42.62, 39.86], [48.43, 46.03], [54.23, 52.58], [60.04, 59.43]];
      const walkUps = [['454254272', '17', 1.5], ['454254273', '19'], ['454254274', '21'], ['454254270', '23'], ['454254271', '25'], ['454254275', '27'], ['454254276', '29'], ['454254277', '31'], ['454254278', '33'], ['454254279', '35']]
        .map(([source, number, front = 2.3]) => ({ source, id: `l17w-${number}`, street, number, levels: 3, front }));
      const A = sourcePoint(map, '454254236', 2), nos5to7 = { source: '454254236', id: 'l17w-5', street, number: '5-7', levels: 2, front: 1.5 };
      return [...warpRow(map, A, unit(A, sourcePoint(map, '454254236', 1)), [[0, -1.56], [9.04, 11.35]], [nos5to7]), ...warpRow(map, O, row, breaks, walkUps)];
    },
  },
  {
    id: 'lorong-19-west', question: 46, approved: '2026-10-13',
    evidence: 'The west side of Lorong 19 from No. 323 Geylang Road to No. 146 Sims Avenue on its photographed line. Each building was measured from June 2024 panoramas during the Lorong 19 walk (docs/lorong-19-brief.md, stops 1-9). No. 323: the lane face 3.5 m in front of its source edge, the Geylang Road front 0.4 m behind its source front, and its party wall with No. 321 1.4 m east of the source line, each edge moved in parallel. The Primero (No. 1): front 2.2 m behind at its south end and 2.6 m at its north end, from 0.8 m south of the source corner to 1.0 m north of the source north corner. No. 3: front 2.3 m behind, from 0.9 m south of the source corner; Nos. 21, 23 and 25 on one plane 1.25 m behind, with party lines at -8.3, 0, 10.0 and 17.6 m along No. 23\'s source front (the No. 3/No. 21 wall taken between the two houses\' readings). Lei Zang Si (No. 29): front 1.5 m behind, from 1.8 m south of the source corner, 14.4 m. No. 33: front 1.5 m behind, from 0.5 m north of the source corner, 24.4 m. No. 146 Sims Avenue: bearings from three Sims Avenue panoramas put its splay pier 1.8 m south of the source splay, and its lane face starts 2.0 m south of its source corner, so the outline moves 1.8 m south with its shape kept. Each re-spacing moves the house\'s vertices along its own front line, so rear lines and steps are kept.',
    replaces: ['454254263', '454254248', '476113985', '454254241', '476113983', '476113984', '454254239', '454254309', '454254310'],
    build(map) {
      const lane = 'Lorong 19 Geylang';
      const o263 = outlineOf(map, '454254263');
      // Edges: 0 the Geylang Road front, 1 the party wall with No. 321, 2 the rear, 3 the lane face.
      const eminent = { id: 'l19w-323', street: 'Geylang Road', number: '323', levels: 2, outline: offsetEdges(o263, [-.4, -1.4, 0, 3.5]) };
      // A house re-spaced along its own source front, from `south` to `north` (vertex indices on that front).
      const reface = (id, south, north, breaks, front, house) => {
        const o = outlineOf(map, id), A = o[south];
        return warpRow(map, A, unit(A, o[north]), breaks, [{ source: id, street: lane, levels: null, front, ...house }])[0];
      };
      const w248 = Math.hypot(...sub(outlineOf(map, '454254248')[0], outlineOf(map, '454254248')[1]));
      const primero = reface('454254248', 1, 0, [[0, -.8], [w248, w248 + 1.0]], (d, t) => -2.2 - .4 * (t + .8) / (w248 + 1.8), { id: 'l19w-1', number: '1', levels: 4 });
      // Nos. 3-25 on one re-spacing along No. 23's source front, so No. 3 and No. 21 keep their shared wall.
      const O = outlineOf(map, '476113983')[0], north = unit(O, outlineOf(map, '476113983')[1]);
      const tOf = p => (p[0] - O[0]) * north[0] + (p[1] - O[1]) * north[1];
      const o985 = outlineOf(map, '476113985'), o241 = outlineOf(map, '454254241'), o984 = outlineOf(map, '476113984');
      const dFront3 = (o985[2][0] - O[0]) * -north[1] + (o985[2][1] - O[1]) * north[0];
      const breaks = [[tOf(o985[2]), tOf(o985[2]) - .9], [tOf(o241[1]), -8.3], [0, 0], [tOf(outlineOf(map, '476113983')[1]), 10.0], [tOf(o984[1]), 17.6]];
      const row = warpRow(map, O, north, breaks, [
        { source: '476113985', id: 'l19w-3', street: lane, number: '3', levels: 4, sourceFront: dFront3, front: d => d - 2.3 },
        { source: '454254241', id: 'l19w-21', street: lane, number: '21', levels: 1, front: -1.25 },
        { source: '476113983', id: 'l19w-23', street: lane, number: '23', levels: 1, front: -1.25 },
        { source: '476113984', id: 'l19w-25', street: lane, number: '25', levels: 1, front: -1.25 },
      ]);
      const leiZangSi = reface('454254239', 2, 1, [[0, -1.8], [13.873, 12.6]], -1.5, { id: 'l19w-29', number: '29', levels: 5 });
      const no33 = reface('454254309', 3, 2, [[0, .5], [25.166, 24.9]], -1.5, { id: 'l19w-33', number: '33', levels: 3 });
      const no146 = { id: 'sa-146', street: 'Sims Avenue', number: '146', levels: 3, outline: outlineOf(map, '454254310').map(p => add(p, [.15, 1.8])) };
      return [eminent, primero, ...row, leiZangSi, no33, no146];
    },
  },
  {
    id: 'lorong-19-east', question: 44, approved: '2026-10-13',
    evidence: 'The east side of Lorong 19 on its photographed positions, from June 2024 panoramas (docs/lorong-19-brief.md, stops 10 and 12-15). He Ping (No. 148 Sims Avenue): its lane face 0.5 m forward and 21.7 m long, the Sims Avenue front kept and cut at the party line with No. 150, triangulated 5.47 m from the lane corner; the cut-off strip is No. 150\'s west bay. Bougainvilla Apartments, Nos. 6-8 and Sims Point on one re-spacing along the lane, so neighbours keep their order: Bougainvilla\'s front 4.5 m forward, from 1.34 m north of its source corner to its south end, which a railing post triangulates 0.6 m north of Nos. 6-8; Nos. 6-8\'s columns 8.3 m forward (a column triangulated from one panorama at 8.4 m; the LOFT door on the five-foot way\'s back wall at 6.5 m), from 0.5 m north of the source corner to 12.3 m south of it; Sims Point\'s stepped lane face 3.2 m forward, from 3.3 m south of its source north end to 0.66 m north of its south end. Nos. 325-333 Geylang Road: the whole outline moved 7.2 m east and 0.6 m south, its shape kept, as the lane panoramas place its lane face about 7 m behind the source edge and the Geylang Road panoramas its corner 7.2 m east and 0.6 m south of the source corner.',
    replaces: ['454254339', '454254247', '1223524381', '454254246', '454254168'],
    build(map) {
      const lane = 'Lorong 19 Geylang';
      // He Ping: vertices 0 (lane corner), 1 (Sims Avenue east end), 2 and 3; the lane face is edge 3.
      const h = outlineOf(map, '454254339'), south = unit(h[0], h[3]), east = unit(h[0], h[1]);
      const A = at(h[0], east, -.5), P = at(h[0], east, 5.47);
      const hePing = { id: 'sa-148', street: 'Sims Avenue', number: '148', levels: 2, outline: [A, P, at(P, south, 21.7), at(A, south, 21.7)] };
      const no150 = { id: 'sa-150w', street: 'Sims Avenue', number: '150', levels: 2, outline: [P, h[1], h[2], add(P, sub(h[2], h[1]))] };
      // Bougainvilla, Nos. 6-8 and Sims Point along Nos. 6-8's source front (north to south), d towards the lane. Sims
      // Point's stepped lane face runs from vertex 0 to vertex 3; its edge 9 runs north from vertex 9 to vertex 10.
      const s68 = outlineOf(map, '1223524381'), O = s68[0], dir = unit(O, s68[3]);
      const tOf = p => (p[0] - O[0]) * dir[0] + (p[1] - O[1]) * dir[1], dOf = p => (p[0] - O[0]) * -dir[1] + (p[1] - O[1]) * dir[0];
      const b = outlineOf(map, '454254247'), sp = outlineOf(map, '454254246');
      const breaks = [[tOf(b[1]), tOf(b[1]) - 1.34], [tOf(b[0]), -.6], [0, -.5], [tOf(s68[3]), 12.3], [tOf(sp[0]), tOf(sp[10]) + 1.1], [tOf(sp[3]), tOf(sp[3]) - .66]];
      const row = warpRow(map, O, dir, breaks, [
        { source: '454254247', id: 'l19e-10', street: lane, number: '10', levels: 8, sourceFront: (dOf(b[0]) + dOf(b[1])) / 2, front: d => d + 4.5 },
        { source: '1223524381', id: 'l19e-6', street: lane, number: '6-8', levels: 4, front: 8.3 },
        { source: '454254246', id: 'l19e-4', street: lane, number: '4', levels: 8, sourceFront: (dOf(sp[0]) + dOf(sp[5])) / 2, band: 1.0, front: d => d + 3.2 },
      ]);
      const corner = { id: 'gr-325', street: 'Geylang Road', number: '325-333', levels: 3, outline: outlineOf(map, '454254168').map(p => add(p, [7.2, .6])) };
      return [hePing, no150, ...row, corner];
    },
  },
  {
    id: 'geylang-313-321', question: 45, approved: '2026-10-13',
    evidence: 'The two-storey row on the north side of Geylang Road between the Lorong 17 corner house and No. 323, re-cut into its six photographed houses. The June 2024 Geylang Road drive agrees on the row on its source front; measured along No. 323\'s source front from its west corner, the party walls stand at -23.0, -18.0, -12.85, -8.65 and -2.85 m, and the row ends at No. 323\'s photographed party wall, 1.4 m east of the source line (open question 46). It starts at the Lorong 17 corner house\'s source party wall (-26.49 m), which is kept, about 1.1 m east of where that wall photographs. The source front and the party walls\' direction are kept, and each house runs back to the source rear line.',
    replaces: ['454254254', '454254256', '454254258', '454254260', '454254262'],
    build(map) {
      const o = outlineOf(map, '454254263'), A = o[1], east = unit(o[1], o[0]), back = sub(o[2], o[1]);
      const F = s => at(A, east, s), cuts = [-26.487, -23.0, -18.0, -12.85, -8.65, -2.85, 1.4];
      return 'abcdef'.split('').map((k, i) => ({
        id: `gr-l19-${k}`, street: 'Geylang Road', number: k === 'f' ? '321' : null, levels: 2,
        outline: [F(cuts[i]), F(cuts[i + 1]), add(F(cuts[i + 1]), back), add(F(cuts[i]), back)],
      }));
    },
  },
  {
    id: 'sims-136-144', question: 43, approved: '2026-10-13',
    evidence: 'Sims Avenue Nos. 136-144, the south side between No. 134 (moved under open question 39) and No. 146 (moved under open question 46). Two pairs of June 2024 Sims Avenue panoramas agree on the fronts 2.5 m behind the source front. Measured along No. 138\'s source front from its east end, westward, the photographed party walls stand at -14.56 (Nos. 144/142), -7.67 (142/140), -2.78 (140/138) and 4.56 m (138/136); the row runs from No. 146\'s authored west wall (-18.87 m, its photographed wall about -19.6 m) to No. 134\'s authored east wall (12.0 m, photographed about 11.6 m). The source party lines (-19.10, -12.48, -6.94, 0, 9.70 and 16.88 m) are mapped to these by one re-spacing along the front, so neighbours keep their shared walls and rear lines are kept.',
    replaces: ['682928736', '682928738', '682928739', '682928741', '682928744'],
    build(map) {
      const street = 'Sims Avenue';
      // Along No. 138's Sims Avenue front (edge 6), from its east end westward; d is towards Sims Avenue.
      const o = outlineOf(map, '682928738'), O = o[7], west = unit(o[7], o[6]);
      const breaks = [[-19.10, -18.87], [-12.48, -14.56], [-6.94, -7.67], [0, -2.78], [9.70, 4.56], [16.88, 12.0]];
      return warpRow(map, O, west, breaks, [['682928744', '144'], ['682928741', '142'], ['682928739', '140'], ['682928738', '138'], ['682928736', '136']]
        .map(([source, number]) => ({ source, id: `sa-${number}`, street, number, levels: 3, front: -2.5 })));
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
