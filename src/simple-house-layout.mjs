// A reusable measured elevation for plain shophouses: bands, windows, vents, pilasters, piers,
// a signboard, blade signs, an awning and back-wall fittings, all in the frontage frame
// (u along the front from frame.a, out towards the street, heights above the five-foot-way floor).

export function simpleHouseLayout(width, spec) {
  const boxes = [];
  const add = (name, u, y, out, w, h, depth, colour, glow = 0) => boxes.push({ name, u, y, out, w, h, depth, colour, glow });
  const S = spec, C = S.colours, D = S.fiveFootWay, mid = (a, b) => (a + b) / 2;
  add('upper wall', width / 2, mid(S.ceiling, S.height), -.05, width, S.height - S.ceiling, .04, C.wall);
  for (const [b, t, depth = .2, colour = C.trim] of S.bands ?? []) add('band', width / 2, mid(b, t), depth / 2, width, t - b, depth, colour);
  for (const [l, r, b, t] of S.pilasters ?? []) add('pilaster', mid(l, r), mid(b, t), .06, r - l, t - b, .12, C.trim);
  for (const w of S.windows ?? []) {
    const [l, r] = w.u, [b, t] = w.h, out = w.out ?? 0, panes = w.panes ?? 2;
    add('window reveal', mid(l, r), mid(b, t), out - .02, r - l, t - b, .04, '#2c3234');
    add('window glazing', mid(l, r), mid(b, t), out + .005, r - l - .06, t - b - .06, .01, C.glass ?? '#6f7c81');
    for (let i = 0; i <= panes; i++) add('window frame', l + .03 + (r - l - .06) * i / panes, mid(b, t), out + .015, .045, t - b - .04, .02, C.frame);
    for (const y of [b + .03, t - .03]) add('window rail', mid(l, r), y, out + .015, r - l, .045, .02, C.frame);
    if (w.arched) add('arched head', mid(l, r), t + .1, out + .05, r - l + .16, .2, .1, C.trim);
    if (w.surround) add('window surround', mid(l, r), mid(b, t), out - .01, r - l + .2, t - b + .2, .02, C.trim);
    if (w.shutters) for (const [a, c] of [[l - (r - l) / 4, l], [r, r + (r - l) / 4]]) {
      add('open shutter', mid(a, c), mid(b, t), out + .12, c - a, t - b, .03, C.frame);
      for (let y = b + .1; y < t - .05; y += .09) add('shutter louvre', mid(a, c), y, out + .14, c - a - .06, .025, .02, C.wall);
    }
    add('sill', mid(l, r), b - .04, out + .06, r - l + .1, .06, .12, C.trim);
  }
  for (const { u: [l, r], h: [b, t] } of S.vents ?? []) {
    add('vent frame', mid(l, r), mid(b, t), .01, r - l, t - b, .03, C.trim);
    for (let y = b + .04; y < t - .02; y += .065) add('vent louvre', mid(l, r), y, .03, r - l - .06, .025, .03, '#6f706c');
  }
  for (const [l, r] of S.piers ?? []) add('pier', mid(l, r), S.ceiling / 2, -.2, r - l, S.ceiling, .4, C.pier ?? C.trim);
  add('five-foot way floor', width / 2, .04, -D / 2, width - .04, .08, D, C.floor ?? '#9d978c');
  add('five-foot way ceiling', width / 2, S.ceiling + .03, -D / 2, width - .04, .06, D, '#e4e2dc');
  for (const u of [.02, width - .02]) add('five-foot way return', u, S.ceiling / 2, -D / 2, .03, S.ceiling, D, C.trim);
  const back = -D + .04;
  add('back wall', width / 2, S.ceiling / 2, -D, width - .04, S.ceiling, .06, C.back ?? '#2f2c2a');
  for (const f of S.backFittings ?? []) add(f.name, mid(...f.u), mid(...f.h), back + (f.out ?? 0), f.u[1] - f.u[0], f.h[1] - f.h[0], f.depth ?? .03, f.colour, f.glow ?? 0);
  for (const r of S.rooftop ?? []) add('rooftop shed', mid(...r.u), mid(S.height, r.top), -r.setback - r.depth / 2, r.u[1] - r.u[0], r.top - S.height, r.depth, r.colour ?? C.trim);
  const panel = s => s && ({ left: s.u[0], right: s.u[1], bottom: s.h[0], top: s.h[1], out: s.out ?? .03 });
  return {
    boxes, back,
    board: panel(S.board), boards: (S.boards ?? []).map(panel),
    blades: (S.blades ?? []).map(b => ({ ...b })), awning: S.awning && { ...S.awning },
  };
}

export const facing = (frame, id, distance = 8, pitch = 18, extra = []) => [{ id, p: frame.point(frame.width / 2, distance), target: frame.point(frame.width / 2, 0), pitch }, ...extra.map(e => ({ ...e, p: frame.point(...e.at), target: frame.point(...e.look) }))]
  .map(r => ({ id: r.id, p: r.p, pitch: r.pitch, yaw: Math.atan2(r.p[0] - r.target[0], r.p[1] - r.target[1]) * 180 / Math.PI }));
