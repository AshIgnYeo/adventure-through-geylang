// Deliberate identity-to-footprint matches. Never assign a real name randomly.
// Reference photographs are not guaranteed to depict the present-day tenancy.
import { thyeSengLandmark, amriseHotelLandmark, hajiMohdSallehMosqueLandmark, leongKeeLandmark, hainanGohLandmark, hotel81JoyLandmark, agapeCentreLandmark, hokTekChiLandmark, faithMissionHomeLandmark, hoSanKongHoeyLandmark, shgEngineeringLandmark, smKhekLeowLandmark, cantonWongLandmark } from './core-landmarks.mjs';
import { mongkok, nanyangDentist, shaxianEatery } from './mongkok-layout.mjs';
import { frogPorridge } from './frog-porridge-layout.mjs';
import { buddhistArtCentre } from './buddhist-art-centre-layout.mjs';
import { eatFirst } from './eat-first-layout.mjs';
import { kHotel } from './k-hotel-layout.mjs';
import { sikWaiSin } from './sik-wai-sin-layout.mjs';
import { rrMotor } from './rr-motor-layout.mjs';
import { goldenJade } from './golden-jade-layout.mjs';
import { ktv277 } from './ktv-277-layout.mjs';
import { lamClan } from './lam-clan-layout.mjs';
import { hainanLim } from './hainan-lim-layout.mjs';
import { suiYuanJu } from './sui-yuan-ju-layout.mjs';
import { chongMin } from './chong-min-layout.mjs';
import { fooHui, siawLim } from './foo-hui-layout.mjs';
import { normalStainless, qianjing } from './sims-north-layout.mjs';
import { fokWaiKee } from './fok-wai-kee-layout.mjs';
import { hongYeChen } from './hong-ye-chen-layout.mjs';
import { kGroup } from './k-group-layout.mjs';
import { eros } from './eros-layout.mjs';
import { plusMobile } from './plus-mobile-layout.mjs';
import { lannaThai } from './lanna-thai-layout.mjs';
import { jiangsu } from './jiangsu-layout.mjs';
import { liuDaMa } from './liu-da-ma-layout.mjs';
import { muhammadiyah } from './muhammadiyah-layout.mjs';
import { fsl } from './fsl-layout.mjs';
import { barLorong13 } from './bar-lorong-13-layout.mjs';
import { chenHing } from './chen-hing-layout.mjs';
import { aiSecurity } from './aisecurity-layout.mjs';
import { misterContracts } from './mister-contracts-layout.mjs';
import { engLeeHuat } from './eng-lee-huat-layout.mjs';
import { goodwood } from './goodwood-layout.mjs';
import { tbss } from './tbss-layout.mjs';
import { zhengLi } from './zheng-li-layout.mjs';
import { tingYuXuan, keLaiShun, instyle, mobileTime, shiHao } from './geylang-row-layout.mjs';
import { beefKwayTeow } from './beef-kway-teow-layout.mjs';
import { watDhammasatis } from './wat-dhammasatis-layout.mjs';
import { redDot } from './red-dot-layout.mjs';
import { guanKeat } from './guan-keat-layout.mjs';
import { mingLi } from './ming-li-layout.mjs';
import { hotel81Spring } from './hotel-81-spring-layout.mjs';
import { pfcs } from './pfcs-layout.mjs';
import { cico } from './cico-layout.mjs';
import { gemsVille } from './gems-ville-layout.mjs';
import { thirteenBbq, builderSmart, teckHoe, wunderfolks } from './lorong-13-layout.mjs';
import { yapSun, builderSmartSims } from './sims-south-layout.mjs';
import { lianSeng } from './geylang-north-layout.mjs';
import { monsterInk, shadowTattoo, nanyangLian, tianTian, takeToys, chongQing } from './geylang-south-layout.mjs';
import { sinChewTan, teckKeow, hongShengKoon, shipChandlers, aecc } from './lorong-15-layout.mjs';
import { ibisGold } from './ibis-gold-layout.mjs';
import { redFlagDavco, yiXiu, shiCheng } from './sims-north-row-layout.mjs';
import { ywam, kimCourt, theDiamond } from './lorong-9-layout.mjs';
import { rozel, gongHeGuan } from './ring-west-layout.mjs';
import { ledgeBlock as jhHotel, no11 as nanyangFan, dNovaHotel, jxinHotel } from './ring-c-layout.mjs';
import { no12 as yajuHotel, summerView, westBlock as vintageAndVine, hotel81Cherry, masterTailors, chineseEatingHouse } from './ring-b-layout.mjs';
import { lexHotel, creamSouth as engineeringMerchants, crystalMansions } from './ring-south-layout.mjs';
import { no2 as bengalKitchen, sims128 as bambooLounge, corner301 as shengSiong301 } from './ring-a-layout.mjs';
import { fengShang, trueJesus, yangClan, gyaltsap, brightStar, chinaware, rattanAssociation } from './lorong-17-layout.mjs';
import { eminent, primero, nanyangChee, cheeHoeHong, leiZangSi, starlonTektron, hePing, kangHaPheng, bougainvilla, simsPoint, straitsLaundry, maryHairSalon, scarlett, lefon, guangxiGaozhou, bikeMart, vietsea } from './lorong-19-layout.mjs';
import { chengYi, nyingmaKathok, beiChenGong, tanSerSeng, hcsa } from './lorong-21-layout.mjs';
import { wingFongCourt, wingFongMansions, leYuan, ibisPearl, centralImperial, amazingInn, littleCharcoalStove, seaMuTo, emSalonSpa, valu, greenEssential, fuXingJi, bsHardware } from './lorong-14-layout.mjs';
import { changJiang, bsMiniMart, hotel81Geylang, thenShen, crystalLodge, pohClan, soonClan, lodge41, hotel81Palace, shanYuan } from './lorong-16-layout.mjs';
import { leRegal, budgetone, cygon, club20, gofit, hotel81Star, diamondHotel, dabuHakka, t1Trading, hinSheng } from './lorong-18-layout.mjs';
export { authoredLandmarks } from './authored-sites.mjs';
export { landmarkReviewPoint } from './core-landmarks.mjs';
// Partial-block identities deliberately stay out of whole-footprint lookup.
export const partialBlockLandmarks = [mongkok, nanyangDentist, shaxianEatery];
export const landmarks = [
  { ...rozel },
  { ...gongHeGuan },
  { ...jhHotel },
  { ...nanyangFan },
  { ...dNovaHotel },
  { ...jxinHotel },
  { ...yajuHotel },
  { ...summerView },
  { ...vintageAndVine },
  { ...hotel81Cherry },
  { ...masterTailors },
  { ...chineseEatingHouse },
  { ...lexHotel },
  { ...bengalKitchen },
  { ...bambooLounge },
  { ...shengSiong301 },
  { ...fengShang },
  { ...trueJesus },
  { ...yangClan },
  { ...gyaltsap },
  { ...brightStar },
  { ...chinaware },
  { ...rattanAssociation },
  { ...eminent },
  { ...primero },
  { ...nanyangChee },
  { ...cheeHoeHong },
  { ...leiZangSi },
  { ...starlonTektron },
  { ...hePing },
  { ...kangHaPheng },
  { ...bougainvilla },
  { ...simsPoint },
  { ...straitsLaundry },
  { ...maryHairSalon },
  { ...scarlett },
  { ...lefon },
  { ...guangxiGaozhou },
  { ...bikeMart },
  { ...vietsea },
  { ...chengYi },
  { ...nyingmaKathok },
  { ...beiChenGong },
  { ...tanSerSeng },
  { ...hcsa },
  { ...wingFongCourt },
  { ...wingFongMansions },
  { ...leYuan },
  { ...ibisPearl },
  { ...centralImperial },
  { ...amazingInn },
  { ...littleCharcoalStove },
  { ...seaMuTo },
  { ...emSalonSpa },
  { ...valu },
  { ...greenEssential },
  { ...fuXingJi },
  { ...bsHardware },
  { ...changJiang },
  { ...bsMiniMart },
  { ...hotel81Geylang },
  { ...thenShen },
  { ...crystalLodge },
  { ...pohClan },
  { ...soonClan },
  { ...lodge41 },
  { ...hotel81Palace },
  { ...shanYuan },
  { ...leRegal },
  { ...budgetone },
  { ...cygon },
  { ...club20 },
  { ...gofit },
  { ...hotel81Star },
  { ...diamondHotel },
  { ...dabuHakka },
  { ...t1Trading },
  { ...hinSheng },
  { ...engineeringMerchants },
  { ...crystalMansions },
  { ...thirteenBbq },
  { ...builderSmart },
  { ...teckHoe },
  { ...wunderfolks },
  { ...yapSun },
  { ...builderSmartSims },
  { ...lianSeng },
  { ...monsterInk },
  { ...shadowTattoo },
  { ...nanyangLian },
  { ...tianTian },
  { ...takeToys },
  { ...chongQing },
  { ...sinChewTan },
  { ...teckKeow },
  { ...hongShengKoon },
  { ...shipChandlers },
  { ...aecc },
  { ...ibisGold },
  { ...redFlagDavco },
  { ...yiXiu },
  { ...shiCheng },
  { ...ywam },
  { ...kimCourt },
  { ...theDiamond },
  { ...gemsVille },
  { ...cico },
  { ...pfcs },
  { ...hotel81Spring },
  { ...mingLi },
  { ...guanKeat },
  { ...redDot },
  { ...watDhammasatis },
  { ...beefKwayTeow },
  { ...tingYuXuan },
  { ...keLaiShun },
  { ...instyle },
  { ...mobileTime },
  { ...shiHao },
  { ...zhengLi },
  { ...goodwood },
  { ...tbss },
  { ...engLeeHuat },
  { ...misterContracts },
  { ...aiSecurity },
  { ...chenHing },
  { ...barLorong13 },
  { ...fsl },
  { ...muhammadiyah },
  { ...liuDaMa },
  { ...jiangsu },
  { ...lannaThai },
  { ...plusMobile },
  { ...eros },
  { ...kGroup },
  { ...hongYeChen },
  { ...fokWaiKee },
  { ...normalStainless },
  { ...qianjing },
  { ...fooHui },
  { ...siawLim },
  { ...chongMin },
  { ...suiYuanJu },
  { ...hainanLim },
  { ...lamClan },
  { ...ktv277 },
  { ...goldenJade },
  { ...rrMotor },
  { ...sikWaiSin },
  { ...kHotel },
  { ...eatFirst },
  { ...buddhistArtCentre },
  thyeSengLandmark,
  amriseHotelLandmark,
  { ...frogPorridge, frontEdge: 2, reviewRoad: 'Geylang Road', reviewOffset: 0, reviewBuildingId: '453797927' },
  hajiMohdSallehMosqueLandmark,
  leongKeeLandmark,
  hainanGohLandmark,
  hotel81JoyLandmark,
  agapeCentreLandmark,
  hokTekChiLandmark,
  faithMissionHomeLandmark,
  hoSanKongHoeyLandmark,
  shgEngineeringLandmark,
  smKhekLeowLandmark,
  cantonWongLandmark,
];

export function landmarkFor(buildingId) {
  return landmarks.find(landmark => landmark.buildingIds.includes(buildingId));
}
