// Which builder module models which buildings. `scripts/build-registry.mjs` reads this list and writes
// `src/builder-registry.ts`, the id lookup the viewer uses. The viewer never imports this file, so the layouts it
// reads are bundled only with their own builders, which load on demand.
//
// Each entry names a module in src/, the builder it exports and the building ids that builder accepts. A building
// claimed by two entries goes to the first, as the old if-chain in world.ts did; the registry test refuses that case.
// After adding a builder module or a building, run `npm run registry` (dev and build run it for you).
import { aiSecurity } from './aisecurity-layout.mjs';
import { barLorong13 } from './bar-lorong-13-layout.mjs';
import { beefKwayTeow } from './beef-kway-teow-layout.mjs';
import { buddhistArtCentre } from './buddhist-art-centre-layout.mjs';
import { chenHing } from './chen-hing-layout.mjs';
import { chongMin } from './chong-min-layout.mjs';
import { cico } from './cico-layout.mjs';
import { eatFirst } from './eat-first-layout.mjs';
import { engLeeHuat } from './eng-lee-huat-layout.mjs';
import { eros } from './eros-layout.mjs';
import { fokWaiKee } from './fok-wai-kee-layout.mjs';
import { fooHui, siawLim } from './foo-hui-layout.mjs';
import { frogPorridge } from './frog-porridge-layout.mjs';
import { fsl } from './fsl-layout.mjs';
import { gemsVille } from './gems-ville-layout.mjs';
import { geylangNorth } from './geylang-north-layout.mjs';
import { geylangRow } from './geylang-row-layout.mjs';
import { geylangSouth } from './geylang-south-layout.mjs';
import { goldenJade, no273 } from './golden-jade-layout.mjs';
import { goodwood } from './goodwood-layout.mjs';
import { guanKeat } from './guan-keat-layout.mjs';
import { hainanLim } from './hainan-lim-layout.mjs';
import { hongYeChen } from './hong-ye-chen-layout.mjs';
import { hotel81Spring } from './hotel-81-spring-layout.mjs';
import { ibisGold } from './ibis-gold-layout.mjs';
import { jiangsu } from './jiangsu-layout.mjs';
import { kGroup } from './k-group-layout.mjs';
import { kHotel } from './k-hotel-layout.mjs';
import { ktv277 } from './ktv-277-layout.mjs';
import { lamClan } from './lam-clan-layout.mjs';
import { lannaThai } from './lanna-thai-layout.mjs';
import { liuDaMa } from './liu-da-ma-layout.mjs';
import { lorong11 } from './lorong-11-layout.mjs';
import { lorong13 } from './lorong-13-layout.mjs';
import { lorong14 } from './lorong-14-layout.mjs';
import { lorong15 } from './lorong-15-layout.mjs';
import { lorong16, geylangRow16, westerhout16, sites16, backLane16 } from './lorong-16-layout.mjs';
import { lorong17 } from './lorong-17-layout.mjs';
import { lorong18 } from './lorong-18-layout.mjs';
import { lorong19, geylangRow19, simsRow19 } from './lorong-19-layout.mjs';
import { lorong21, simsRow21 } from './lorong-21-layout.mjs';
import { lorong9, constructionSites } from './lorong-9-layout.mjs';
import { mingLi } from './ming-li-layout.mjs';
import { misterContracts } from './mister-contracts-layout.mjs';
import { muhammadiyah } from './muhammadiyah-layout.mjs';
import { pfcs } from './pfcs-layout.mjs';
import { plusMobile } from './plus-mobile-layout.mjs';
import { redDot } from './red-dot-layout.mjs';
import { ringA } from './ring-a-layout.mjs';
import { ringB } from './ring-b-layout.mjs';
import { ringC } from './ring-c-layout.mjs';
import { ringEast } from './ring-east-layout.mjs';
import { ringSouth } from './ring-south-layout.mjs';
import { ringWest } from './ring-west-layout.mjs';
import { rrMotor } from './rr-motor-layout.mjs';
import { sikWaiSin } from './sik-wai-sin-layout.mjs';
import { normalStainless, qianjing } from './sims-north-layout.mjs';
import { simsNorthRow, yiXiu } from './sims-north-row-layout.mjs';
import { simsSouth } from './sims-south-layout.mjs';
import { suiYuanJu } from './sui-yuan-ju-layout.mjs';
import { tbss } from './tbss-layout.mjs';
import { watDhammasatis } from './wat-dhammasatis-layout.mjs';
import { zhengLi } from './zheng-li-layout.mjs';

/** Every building id of a list of places, in order. */
const of = (...places) => places.flat().flatMap(p => p.buildingIds);

export const builderOwners = [
  { module: 'frog-porridge', build: 'buildFrogPorridge', ids: of(frogPorridge) },
  { module: 'buddhist-art-centre', build: 'buildBuddhistArtCentre', ids: of(buddhistArtCentre) },
  { module: 'eat-first', build: 'buildEatFirst', ids: of(eatFirst) },
  { module: 'k-hotel', build: 'buildKHotel', ids: of(kHotel) },
  { module: 'sik-wai-sin', build: 'buildSikWaiSin', ids: of(sikWaiSin) },
  { module: 'rr-motor', build: 'buildRrMotor', ids: of(rrMotor) },
  { module: 'golden-jade', build: 'buildGoldenJade', ids: of(no273, goldenJade) },
  { module: 'ktv-277', build: 'buildKtv277', ids: of(ktv277) },
  { module: 'eros', build: 'buildEros', ids: of(eros) },
  { module: 'plus-mobile', build: 'buildPlusMobile', ids: of(plusMobile) },
  { module: 'lanna-thai', build: 'buildLannaThai', ids: of(lannaThai) },
  { module: 'jiangsu', build: 'buildJiangsu', ids: of(jiangsu) },
  { module: 'liu-da-ma', build: 'buildLiuDaMa', ids: of(liuDaMa) },
  { module: 'muhammadiyah', build: 'buildMuhammadiyah', ids: of(muhammadiyah) },
  { module: 'fsl', build: 'buildFsl', ids: of(fsl) },
  { module: 'bar-lorong-13', build: 'buildBarLorong13', ids: of(barLorong13) },
  { module: 'chen-hing', build: 'buildChenHing', ids: of(chenHing) },
  { module: 'aisecurity', build: 'buildAiSecurity', ids: of(aiSecurity) },
  { module: 'mister-contracts', build: 'buildMisterContracts', ids: of(misterContracts) },
  { module: 'eng-lee-huat', build: 'buildEngLeeHuat', ids: of(engLeeHuat) },
  { module: 'goodwood', build: 'buildGoodwood', ids: of(goodwood) },
  { module: 'tbss', build: 'buildTbss', ids: of(tbss) },
  { module: 'zheng-li', build: 'buildZhengLi', ids: of(zhengLi) },
  { module: 'geylang-row', build: 'buildGeylangRow', ids: of(geylangRow) },
  { module: 'beef-kway-teow', build: 'buildBeefKwayTeow', ids: of(beefKwayTeow) },
  { module: 'wat-dhammasatis', build: 'buildWatDhammasatis', ids: of(watDhammasatis) },
  { module: 'red-dot', build: 'buildRedDot', ids: of(redDot) },
  { module: 'guan-keat', build: 'buildGuanKeat', ids: of(guanKeat) },
  { module: 'ming-li', build: 'buildMingLi', ids: of(mingLi) },
  { module: 'hotel-81-spring', build: 'buildHotel81Spring', ids: of(hotel81Spring) },
  { module: 'pfcs', build: 'buildPfcs', ids: of(pfcs) },
  { module: 'cico', build: 'buildCico', ids: of(cico) },
  { module: 'gems-ville', build: 'buildGemsVille', ids: of(gemsVille) },
  { module: 'lorong-13', build: 'buildLorong13', ids: of(lorong13) },
  { module: 'lorong-11', build: 'buildLorong11', ids: of(lorong11) },
  { module: 'sims-south', build: 'buildSimsSouth', ids: of(simsSouth) },
  { module: 'geylang-north', build: 'buildGeylangNorth', ids: of(geylangNorth) },
  { module: 'geylang-south', build: 'buildGeylangSouth', ids: of(geylangSouth) },
  { module: 'lorong-15', build: 'buildLorong15', ids: of(lorong15) },
  { module: 'ibis-gold', build: 'buildIbisGold', ids: of(ibisGold) },
  { module: 'sims-north-row', build: 'buildSimsNorthRow', ids: of(yiXiu, simsNorthRow) },
  { module: 'lorong-9', build: 'buildLorong9', ids: of(constructionSites, lorong9) },
  { module: 'lorong-17', build: 'buildLorong17', ids: of(lorong17) },
  { module: 'lorong-19', build: 'buildLorong19', ids: of(lorong19, geylangRow19, simsRow19) },
  { module: 'lorong-21', build: 'buildLorong21', ids: of(lorong21, simsRow21) },
  { module: 'lorong-14', build: 'buildLorong14', ids: of(lorong14) },
  { module: 'lorong-16', build: 'buildLorong16', ids: of(sites16, lorong16, geylangRow16, westerhout16, backLane16) },
  { module: 'lorong-18', build: 'buildLorong18', ids: of(lorong18) },
  { module: 'ring-east', build: 'buildRingEast', ids: of(ringEast) },
  { module: 'ring-west', build: 'buildRingWest', ids: of(ringWest, ringSouth) },
  { module: 'ring-c', build: 'buildRingC', ids: of(ringC) },
  { module: 'ring-a', build: 'buildRingA', ids: of(ringA) },
  { module: 'ring-b', build: 'buildRingB', ids: of(ringB) },
  { module: 'lam-clan', build: 'buildLamClan', ids: of(lamClan) },
  { module: 'hainan-lim', build: 'buildHainanLim', ids: of(hainanLim) },
  { module: 'sui-yuan-ju', build: 'buildSuiYuanJu', ids: of(suiYuanJu) },
  { module: 'chong-min', build: 'buildChongMin', ids: of(chongMin) },
  { module: 'foo-hui', build: 'buildFooHuiSiawLim', ids: of(fooHui, siawLim) },
  { module: 'sims-north', build: 'buildSimsNorthPair', ids: of(normalStainless, qianjing) },
  { module: 'fok-wai-kee', build: 'buildFokWaiKee', ids: of(fokWaiKee) },
  { module: 'hong-ye-chen', build: 'buildHongYeChen', ids: of(hongYeChen) },
  { module: 'k-group', build: 'buildKGroup', ids: of(kGroup) },
];

/** Building id to the first entry that claims it, and every id claimed by more than one module. */
export function builderIndex(owners = builderOwners) {
  const byId = new Map(), shared = new Map();
  for (const owner of owners) for (const id of new Set(owner.ids)) {
    if (!byId.has(id)) { byId.set(id, owner.module); continue; }
    if (byId.get(id) !== owner.module) shared.set(id, [...(shared.get(id) ?? [byId.get(id)]), owner.module]);
  }
  return { byId, shared };
}
