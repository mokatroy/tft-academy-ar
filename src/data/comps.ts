import type { Comp, Tier } from '../lib/types';

export const tierOrder: Tier[] = ['S', 'A', 'B', 'C'];

/**
 * Comp guides for Set 18, imported from TFT Academy (patch 18.5b).
 * Champion / item / augment ids map to CommunityDragon data under src/data.
 */
export const comps: Comp[] = [
  {
    slug: 'tempo-riftbeast',
    name: { ar: 'تمبو وحش الريفت', en: 'Tempo Riftbeast', ja: 'Tempo Riftbeast' },
    subtitle: { ar: 'وحش الريفت برامبلباك', en: 'Riftbeast Brambleback', ja: 'Riftbeast Brambleback' },
    tier: 'S',
    difficulty: 2,
    playstyle: { ar: 'فاست 9', en: 'Fast 9', ja: 'Fast 9' },
    level: { ar: 'مستوى 9', en: 'Level 9', ja: 'レベル9' },
    summary: { ar: 'Slam items aggressively and play for full win streak with Brambleback items. Murkwolf can hold items. Aim to get 7 Riftbeast online latest by Stage 3-5. Use free Riftbeast shops to upgrade only instea', en: 'Slam items aggressively and play for full win streak with Brambleback items. Murkwolf can hold items. Aim to get 7 Riftbeast online latest by Stage 3-5. Use free Riftbeast shops to upgrade only instea', ja: 'Slam items aggressively and play for full win streak with Brambleback items. Murkwolf can hold items. Aim to get 7 Riftbeast online latest by Stage 3-5. Use free Riftbeast shops to upgrade only instea' },
    units: [
      { champion: 'DA_18_Sentry', items: [], star: 1, row: 3, col: 2 },
      { champion: 'DA_Murkwolf18', items: [], star: 1, row: 3, col: 1 },
      { champion: 'DA_Krug18', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_Redemption', 'TFT_Item_GargoyleStoneplate'], star: 3, row: 0, col: 3 },
      { champion: 'DA_Sentinel18', items: [], star: 1, row: 2, col: 0 },
      { champion: 'DA_Brambleback18', items: ['TFT_Item_GuinsoosRageblade', 'TFT_Item_GuardianAngel', 'TFT_Item_UnstableConcoction'], star: 1, row: 3, col: 0 },
      { champion: 'DA_18_GnarSmall', items: [], star: 1, row: 2, col: 4 },
      { champion: 'DA_Taric18', items: [], star: 1, row: 2, col: 2 },
      { champion: 'DA_18_ElderDragon', items: ['TFT_Item_InfinityEdge', 'TFT_Item_LastWhisper'], star: 1, row: 3, col: 3 }
    ],
    earlyUnits: [
      'DA_18_Sentry',
      'DA_18_Yorick',
      'DA_Scuttlecrab18',
      'DA_Murkwolf18',
    ],
    augments: [
      { id: 'DA_18_RiftbeastTraitAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_Swordsmith', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_SpeedyDoubleKill', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Slam items aggressively and play for full win streak with Brambleback items. Murkwolf can hold items.', en: 'Slam items aggressively and play for full win streak with Brambleback items. Murkwolf can hold items.', ja: 'Slam items aggressively and play for full win streak with Brambleback items. Murkwolf can hold items.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Aim to get 7 Riftbeast online latest by Stage 3-5. Use free Riftbeast shops to upgrade only instead of rerolling. Finish Bramble / tank items.', en: 'Aim to get 7 Riftbeast online latest by Stage 3-5. Use free Riftbeast shops to upgrade only instead of rerolling. Finish Bramble / tank items.', ja: 'Aim to get 7 Riftbeast online latest by Stage 3-5. Use free Riftbeast shops to upgrade only instead of rerolling. Finish Bramble / tank items.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level to 8 and look for Bramble + Brawler or Rakan. Always play Elder Dragon when you hit. Once stable, go 9 for another 5 cost.', en: 'Level to 8 and look for Bramble + Brawler or Rakan. Always play Elder Dragon when you hit. Once stable, go 9 for another 5 cost.', ja: 'Level to 8 and look for Bramble + Brawler or Rakan. Always play Elder Dragon when you hit. Once stable, go 9 for another 5 cost.' } }
    ],
    tips: [
      { ar: 'Slam items aggressively and play for full win streak with Brambleback items. Murkwolf can hold items.', en: 'Slam items aggressively and play for full win streak with Brambleback items. Murkwolf can hold items.', ja: 'Slam items aggressively and play for full win streak with Brambleback items. Murkwolf can hold items.' },
      { ar: 'Aim to get 7 Riftbeast online latest by Stage 3-5. Use free Riftbeast shops to upgrade only instead of rerolling. Finish Bramble / tank items.', en: 'Aim to get 7 Riftbeast online latest by Stage 3-5. Use free Riftbeast shops to upgrade only instead of rerolling. Finish Bramble / tank items.', ja: 'Aim to get 7 Riftbeast online latest by Stage 3-5. Use free Riftbeast shops to upgrade only instead of rerolling. Finish Bramble / tank items.' },
      { ar: 'Level to 8 and look for Bramble + Brawler or Rakan. Always play Elder Dragon when you hit. Once stable, go 9 for another 5 cost.', en: 'Level to 8 and look for Bramble + Brawler or Rakan. Always play Elder Dragon when you hit. Once stable, go 9 for another 5 cost.', ja: 'Level to 8 and look for Bramble + Brawler or Rakan. Always play Elder Dragon when you hit. Once stable, go 9 for another 5 cost.' }
    ],
    alternatives: [],
  },
  {
    slug: 'elderwood-executioners-copy',
    name: { ar: 'دريفن إزريال', en: 'Draven Ezreal 9', ja: 'Draven Ezreal 9' },
    subtitle: { ar: 'إلدروود دريفن', en: 'Elderwood Draven', ja: 'Elderwood Draven' },
    tier: 'S',
    difficulty: 3,
    playstyle: { ar: 'فاست 9', en: 'Fast 9', ja: 'Fast 9' },
    level: { ar: 'مستوى 9', en: 'Level 9', ja: 'レベル9' },
    summary: { ar: 'Slam items aggressively and play for full win streak with Draven items. Ideal opener will be some kind of resource engine like Rengar or Blossom. Continue prioritize win streaking. If you have an econ', en: 'Slam items aggressively and play for full win streak with Draven items. Ideal opener will be some kind of resource engine like Rengar or Blossom. Continue prioritize win streaking. If you have an econ', ja: 'Slam items aggressively and play for full win streak with Draven items. Ideal opener will be some kind of resource engine like Rengar or Blossom. Continue prioritize win streaking. If you have an econ' },
    units: [
      { champion: 'DA_18_Alistar', items: [], star: 1, row: 0, col: 1 },
      { champion: 'DA_Amumu18', items: [], star: 1, row: 0, col: 2 },
      { champion: 'DA_18_Ezreal', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_LastWhisper', 'TFT_Item_Deathblade'], star: 1, row: 3, col: 5 },
      { champion: 'DA_18_Ivern', items: [], star: 1, row: 3, col: 0 },
      { champion: 'DA_Taric18', items: [], star: 1, row: 0, col: 4 },
      { champion: 'DA_18_GnarSmall', items: ['TFT_Item_ThiefsGloves'], star: 1, row: 1, col: 3 },
      { champion: 'DA_18_Kennen', items: ['TFT_Item_ThiefsGloves'], star: 1, row: 0, col: 3 },
      { champion: 'DA_Draven18', items: ['TFT_Item_RunaansHurricane', 'TFT_Item_GuinsoosRageblade', 'TFT_Item_Deathblade'], star: 1, row: 3, col: 6 },
      { champion: 'DA_18_Maokai', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_GargoyleStoneplate', 'TFT_Item_BrambleVest'], star: 1, row: 0, col: 5 }
    ],
    earlyUnits: [
      'DA_18_RekSai',
      'DA_18_Alistar',
      'DA_18_Warwick',
      'DA_18_Rengar',
    ],
    augments: [
      { id: 'DA_LevelUp', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_LateGameScaling', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Slam items aggressively and play for full win streak with Draven items. Ideal opener will be some kind of resource engine like Rengar or Blossom.', en: 'Slam items aggressively and play for full win streak with Draven items. Ideal opener will be some kind of resource engine like Rengar or Blossom.', ja: 'Slam items aggressively and play for full win streak with Draven items. Ideal opener will be some kind of resource engine like Rengar or Blossom.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.', en: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.', ja: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'You can start losing rounds while focusing on econ. Fast 9 end of Stage 4 and look for the scaling 5 costs like Draven, Maokai, and Ivern. ', en: 'You can start losing rounds while focusing on econ. Fast 9 end of Stage 4 and look for the scaling 5 costs like Draven, Maokai, and Ivern. ', ja: 'You can start losing rounds while focusing on econ. Fast 9 end of Stage 4 and look for the scaling 5 costs like Draven, Maokai, and Ivern. ' } }
    ],
    tips: [
      { ar: 'Slam items aggressively and play for full win streak with Draven items. Ideal opener will be some kind of resource engine like Rengar or Blossom.', en: 'Slam items aggressively and play for full win streak with Draven items. Ideal opener will be some kind of resource engine like Rengar or Blossom.', ja: 'Slam items aggressively and play for full win streak with Draven items. Ideal opener will be some kind of resource engine like Rengar or Blossom.' },
      { ar: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.', en: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.', ja: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.' },
      { ar: 'You can start losing rounds while focusing on econ. Fast 9 end of Stage 4 and look for the scaling 5 costs like Draven, Maokai, and Ivern. ', en: 'You can start losing rounds while focusing on econ. Fast 9 end of Stage 4 and look for the scaling 5 costs like Draven, Maokai, and Ivern. ', ja: 'You can start losing rounds while focusing on econ. Fast 9 end of Stage 4 and look for the scaling 5 costs like Draven, Maokai, and Ivern. ' }
    ],
    alternatives: [],
  },
  {
    slug: 'lunarwood-khazix',
    name: { ar: 'Lunarwood كازيكس', en: 'Lunarwood Kha\'zix', ja: 'Lunarwood Kha\'zix' },
    subtitle: { ar: 'قمري كازيكس إعادة لفّ', en: 'Lunar Kha\'Zix Reroll', ja: 'Lunar Kha\'Zix Reroll' },
    tier: 'S',
    difficulty: 2,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Slam items aggressively on Kha\'zix and move them later. It\'s okay to have Spark, Shojin, etc on Khazix early for takedowns. If you have a few crucial pairs on level 6, you can consider rolling slightl', en: 'Slam items aggressively on Kha\'zix and move them later. It\'s okay to have Spark, Shojin, etc on Khazix early for takedowns. If you have a few crucial pairs on level 6, you can consider rolling slightl', ja: 'Slam items aggressively on Kha\'zix and move them later. It\'s okay to have Spark, Shojin, etc on Khazix early for takedowns. If you have a few crucial pairs on level 6, you can consider rolling slightl' },
    units: [
      { champion: 'DA_18_Ornn', items: [], star: 1, row: 2, col: 2 },
      { champion: 'DA_Fiddlesticks18', items: [], star: 1, row: 2, col: 3 },
      { champion: 'DA_18_Diana', items: ['TFT_Item_JeweledGauntlet', 'TFT_Item_UnstableConcoction', 'TFT_Item_IonicSpark'], star: 3, row: 1, col: 1 },
      { champion: 'DA_18_Hecarim', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_GargoyleStoneplate', 'TFT_Item_Redemption'], star: 3, row: 0, col: 2 },
      { champion: 'DA_18_KhaZix', items: ['TFT_Item_UnstableConcoction', 'TFT_Item_RabadonsDeathcap'], star: 3, row: 0, col: 1 },
      { champion: 'DA_18_Soraka', items: [], star: 1, row: 3, col: 2 },
      { champion: 'DA_18_Ezreal', items: ['TFT_Item_RapidFireCannon', 'TFT_Item_SpearOfShojin', 'TFT_Item_Deathblade'], star: 1, row: 3, col: 0 },
      { champion: 'DA_18_Alune', items: [], star: 1, row: 3, col: 1 }
    ],
    earlyUnits: [
      'DA_18_Ornn',
      'DA_18_Alistar',
      'DA_18_LeBlanc',
      'DA_18_KhaZix',
    ],
    augments: [
      { id: 'DA_Swordsmith', tier: 'gold', why: { ar: 'اختيار مرن', en: 'Flexible pick', ja: '柔軟な選択' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Slam items aggressively on Kha\'zix and move them later. It\'s okay to have Spark, Shojin, etc on Khazix early for takedowns.', en: 'Slam items aggressively on Kha\'zix and move them later. It\'s okay to have Spark, Shojin, etc on Khazix early for takedowns.', ja: 'Slam items aggressively on Kha\'zix and move them later. It\'s okay to have Spark, Shojin, etc on Khazix early for takedowns.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.', en: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.', ja: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Slow roll on 7 for 3* upgrades on whatever 3 costs you\'re chasing. In this example, give leftover AP items to Diana.', en: 'Slow roll on 7 for 3* upgrades on whatever 3 costs you\'re chasing. In this example, give leftover AP items to Diana.', ja: 'Slow roll on 7 for 3* upgrades on whatever 3 costs you\'re chasing. In this example, give leftover AP items to Diana.' } }
    ],
    tips: [
      { ar: 'Slam items aggressively on Kha\'zix and move them later. It\'s okay to have Spark, Shojin, etc on Khazix early for takedowns.', en: 'Slam items aggressively on Kha\'zix and move them later. It\'s okay to have Spark, Shojin, etc on Khazix early for takedowns.', ja: 'Slam items aggressively on Kha\'zix and move them later. It\'s okay to have Spark, Shojin, etc on Khazix early for takedowns.' },
      { ar: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.', en: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.', ja: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.' },
      { ar: 'Slow roll on 7 for 3* upgrades on whatever 3 costs you\'re chasing. In this example, give leftover AP items to Diana.', en: 'Slow roll on 7 for 3* upgrades on whatever 3 costs you\'re chasing. In this example, give leftover AP items to Diana.', ja: 'Slow roll on 7 for 3* upgrades on whatever 3 costs you\'re chasing. In this example, give leftover AP items to Diana.' }
    ],
    alternatives: [],
  },
  {
    slug: 'elderwood-executioners',
    name: { ar: 'إلدروود جلّادون', en: 'Elderwood Executioners', ja: 'Elderwood Executioners' },
    subtitle: { ar: 'إلدروود إزريال Soraka', en: 'Elderwood Ezreal Soraka', ja: 'Elderwood Ezreal Soraka' },
    tier: 'A',
    difficulty: 2,
    playstyle: { ar: 'فاست 8', en: 'Fast 8', ja: 'Fast 8' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units. Add more Elderwood as you level with Spellweavers. If ', en: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units. Add more Elderwood as you level with Spellweavers. If ', ja: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units. Add more Elderwood as you level with Spellweavers. If ' },
    units: [
      { champion: 'DA_18_Ornn', items: [], star: 1, row: 0, col: 1 },
      { champion: 'DA_Fiddlesticks18', items: [], star: 1, row: 0, col: 5 },
      { champion: 'DA_18_Hecarim', items: ['TFT_Item_DragonsClaw', 'TFT_Item_BrambleVest', 'TFT_Item_RedBuff'], star: 1, row: 0, col: 3 },
      { champion: 'DA_18_Ezreal', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_LastWhisper', 'TFT_Item_Deathblade'], star: 1, row: 3, col: 6 },
      { champion: 'DA_18_Soraka', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_RabadonsDeathcap'], star: 1, row: 3, col: 4 },
      { champion: 'DA_18_Kennen', items: [], star: 1, row: 0, col: 4 },
      { champion: 'DA_Taric18', items: [], star: 1, row: 0, col: 2 },
      { champion: 'DA_18_GnarSmall', items: ['TFT_Item_ThiefsGloves'], star: 1, row: 1, col: 3 },
      { champion: 'DA_Lux18_Base', items: ['TFT_Item_SpearOfShojin'], star: 1, row: 3, col: 0 }
    ],
    earlyUnits: [
      'DA_18_Ornn',
      'DA_18_Xayah',
      'DA_18_Shen',
      'DA_18_LeBlanc',
    ],
    augments: [
      { id: 'DA_18_ElderwoodTraitAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_Swordsmith', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units.', en: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units.', ja: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Add more Elderwood as you level with Spellweavers. If you start getting AD items, play them on Xayah / Rapidfires.', en: 'Add more Elderwood as you level with Spellweavers. If you start getting AD items, play them on Xayah / Rapidfires.', ja: 'Add more Elderwood as you level with Spellweavers. If you start getting AD items, play them on Xayah / Rapidfires.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level to 8 and look for Ezreal and Soraka with 7 Elderwood. Try not to roll to 0g because we need gold to get to level 9.', en: 'Level to 8 and look for Ezreal and Soraka with 7 Elderwood. Try not to roll to 0g because we need gold to get to level 9.', ja: 'Level to 8 and look for Ezreal and Soraka with 7 Elderwood. Try not to roll to 0g because we need gold to get to level 9.' } }
    ],
    tips: [
      { ar: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units.', en: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units.', ja: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units.' },
      { ar: 'Add more Elderwood as you level with Spellweavers. If you start getting AD items, play them on Xayah / Rapidfires.', en: 'Add more Elderwood as you level with Spellweavers. If you start getting AD items, play them on Xayah / Rapidfires.', ja: 'Add more Elderwood as you level with Spellweavers. If you start getting AD items, play them on Xayah / Rapidfires.' },
      { ar: 'Level to 8 and look for Ezreal and Soraka with 7 Elderwood. Try not to roll to 0g because we need gold to get to level 9.', en: 'Level to 8 and look for Ezreal and Soraka with 7 Elderwood. Try not to roll to 0g because we need gold to get to level 9.', ja: 'Level to 8 and look for Ezreal and Soraka with 7 Elderwood. Try not to roll to 0g because we need gold to get to level 9.' }
    ],
    alternatives: [],
  },
  {
    slug: 'adaptor-reroll',
    name: { ar: 'متكيف إعادة لفّ', en: 'Adaptor Reroll', ja: 'Adaptor Reroll' },
    subtitle: { ar: 'متكيف Kog\'Maw', en: 'Adaptor Kog\'Maw', ja: 'Adaptor Kog\'Maw' },
    tier: 'A',
    difficulty: 2,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Ideally play around a Master Yi opener that can win streak. Blossom is very powerful to get early econ or item wisps. Add more Adaptors and frontline as you go. Finish Yi items by end of stage. You ca', en: 'Ideally play around a Master Yi opener that can win streak. Blossom is very powerful to get early econ or item wisps. Add more Adaptors and frontline as you go. Finish Yi items by end of stage. You ca', ja: 'Ideally play around a Master Yi opener that can win streak. Blossom is very powerful to get early econ or item wisps. Add more Adaptors and frontline as you go. Finish Yi items by end of stage. You ca' },
    units: [
      { champion: 'DA_18_Yorick', items: [], star: 1, row: 3, col: 6 },
      { champion: 'DA_Krug18', items: [], star: 1, row: 1, col: 6 },
      { champion: 'DA_KogMaw18_AD', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_RapidFireCannon', 'TFT_Item_MadredsBloodrazor'], star: 3, row: 3, col: 0 },
      { champion: 'DA_18_MasterYi_AD', items: ['TFT_Item_GuinsoosRageblade', 'TFT_Item_GuardianAngel', 'TFT_Item_TitansResolve'], star: 3, row: 1, col: 0 },
      { champion: 'DA_18_Sett', items: [], star: 1, row: 0, col: 6 },
      { champion: 'DA_Nidalee18_AP', items: ['TFT_Item_GuinsoosRageblade', 'TFT_Item_RabadonsDeathcap'], star: 1, row: 3, col: 1 },
      { champion: 'DA_Vi18', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_GargoyleStoneplate'], star: 3, row: 0, col: 1 }
    ],
    earlyUnits: [
      'DA_Karma18',
      'DA_18_Yorick',
      'DA_Gromp18_AP',
      'DA_18_MasterYi_AD',
    ],
    augments: [
      { id: 'DA_PortableForge', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_LivingForge', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Ideally play around a Master Yi opener that can win streak. Blossom is very powerful to get early econ or item wisps.', en: 'Ideally play around a Master Yi opener that can win streak. Blossom is very powerful to get early econ or item wisps.', ja: 'Ideally play around a Master Yi opener that can win streak. Blossom is very powerful to get early econ or item wisps.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Add more Adaptors and frontline as you go. Finish Yi items by end of stage. You can even play 5 Blossom for maximum Wisp greed if you highroll the 4 costs.', en: 'Add more Adaptors and frontline as you go. Finish Yi items by end of stage. You can even play 5 Blossom for maximum Wisp greed if you highroll the 4 costs.', ja: 'Add more Adaptors and frontline as you go. Finish Yi items by end of stage. You can even play 5 Blossom for maximum Wisp greed if you highroll the 4 costs.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level to 7 and roll for Master Yi 2, Kogmaw 2, and a Juggernaut Tank. Econ up and slow roll for 3*. Add Gromp or a flex unit in at 8.', en: 'Level to 7 and roll for Master Yi 2, Kogmaw 2, and a Juggernaut Tank. Econ up and slow roll for 3*. Add Gromp or a flex unit in at 8.', ja: 'Level to 7 and roll for Master Yi 2, Kogmaw 2, and a Juggernaut Tank. Econ up and slow roll for 3*. Add Gromp or a flex unit in at 8.' } }
    ],
    tips: [
      { ar: 'Ideally play around a Master Yi opener that can win streak. Blossom is very powerful to get early econ or item wisps.', en: 'Ideally play around a Master Yi opener that can win streak. Blossom is very powerful to get early econ or item wisps.', ja: 'Ideally play around a Master Yi opener that can win streak. Blossom is very powerful to get early econ or item wisps.' },
      { ar: 'Add more Adaptors and frontline as you go. Finish Yi items by end of stage. You can even play 5 Blossom for maximum Wisp greed if you highroll the 4 costs.', en: 'Add more Adaptors and frontline as you go. Finish Yi items by end of stage. You can even play 5 Blossom for maximum Wisp greed if you highroll the 4 costs.', ja: 'Add more Adaptors and frontline as you go. Finish Yi items by end of stage. You can even play 5 Blossom for maximum Wisp greed if you highroll the 4 costs.' },
      { ar: 'Level to 7 and roll for Master Yi 2, Kogmaw 2, and a Juggernaut Tank. Econ up and slow roll for 3*. Add Gromp or a flex unit in at 8.', en: 'Level to 7 and roll for Master Yi 2, Kogmaw 2, and a Juggernaut Tank. Econ up and slow roll for 3*. Add Gromp or a flex unit in at 8.', ja: 'Level to 7 and roll for Master Yi 2, Kogmaw 2, and a Juggernaut Tank. Econ up and slow roll for 3*. Add Gromp or a flex unit in at 8.' }
    ],
    alternatives: [],
  },
  {
    slug: 'solara-yunara',
    name: { ar: 'شمسي ازدهار', en: 'Solar Blossom', ja: 'Solar Blossom' },
    subtitle: { ar: 'شمسي كارما إعادة لفّ', en: 'Solar Karma Reroll', ja: 'Solar Karma Reroll' },
    tier: 'A',
    difficulty: 2,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Slam items for Karma and play for win streak with Blossom in. Tank Yorick / Juggernaut until you find Sejuani 2. Try to look for an econ/exp wisp every round when rolling. Prioritize Karma 3 > Sejuani', en: 'Slam items for Karma and play for win streak with Blossom in. Tank Yorick / Juggernaut until you find Sejuani 2. Try to look for an econ/exp wisp every round when rolling. Prioritize Karma 3 > Sejuani', ja: 'Slam items for Karma and play for win streak with Blossom in. Tank Yorick / Juggernaut until you find Sejuani 2. Try to look for an econ/exp wisp every round when rolling. Prioritize Karma 3 > Sejuani' },
    units: [
      { champion: 'DA_18_LeBlanc', items: ['TFT_Item_StatikkShiv'], star: 1, row: 3, col: 5 },
      { champion: 'DA_Karma18', items: ['TFT_Item_BlueBuff', 'TFT_Item_RabadonsDeathcap', 'TFT_Item_JeweledGauntlet'], star: 3, row: 3, col: 6 },
      { champion: 'DA_18_Yunara', items: ['TFT_Item_Deathblade', 'TFT_Item_SpearOfShojin', 'TFT_Item_LastWhisper'], star: 3, row: 2, col: 6 },
      { champion: 'DA_18_Sejuani', items: ['TFT_Item_GargoyleStoneplate', 'TFT_Item_WarmogsArmor'], star: 3, row: 0, col: 4 },
      { champion: 'DA_18_Leona', items: [], star: 3, row: 2, col: 1 },
      { champion: 'DA_18_Azir', items: [], star: 1, row: 3, col: 0 },
      { champion: 'DA_18_Kayle', items: [], star: 1, row: 3, col: 2 },
      { champion: 'DA_18_Yorick', items: [], star: 3, row: 2, col: 2 }
    ],
    earlyUnits: [
      'DA_Karma18',
      'DA_18_Yorick',
      'DA_18_LeBlanc',
      'DA_18_Yunara',
    ],
    augments: [
      { id: 'DA_HeroicGrabBag', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Slam items for Karma and play for win streak with Blossom in. Tank Yorick / Juggernaut until you find Sejuani 2.', en: 'Slam items for Karma and play for win streak with Blossom in. Tank Yorick / Juggernaut until you find Sejuani 2.', ja: 'Slam items for Karma and play for win streak with Blossom in. Tank Yorick / Juggernaut until you find Sejuani 2.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Try to look for an econ/exp wisp every round when rolling. Prioritize Karma 3 > Sejuani 3 > Yorick 3 > Leblanc / Yunara 3. Leona / Kayle not necessary.', en: 'Try to look for an econ/exp wisp every round when rolling. Prioritize Karma 3 > Sejuani 3 > Yorick 3 > Leblanc / Yunara 3. Leona / Kayle not necessary.', ja: 'Try to look for an econ/exp wisp every round when rolling. Prioritize Karma 3 > Sejuani 3 > Yorick 3 > Leblanc / Yunara 3. Leona / Kayle not necessary.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Finish your 3* then level for 3 Solar over time. Leftover AP items on LeBlanc. Karma 3 can also hold items too.', en: 'Finish your 3* then level for 3 Solar over time. Leftover AP items on LeBlanc. Karma 3 can also hold items too.', ja: 'Finish your 3* then level for 3 Solar over time. Leftover AP items on LeBlanc. Karma 3 can also hold items too.' } }
    ],
    tips: [
      { ar: 'Slam items for Karma and play for win streak with Blossom in. Tank Yorick / Juggernaut until you find Sejuani 2.', en: 'Slam items for Karma and play for win streak with Blossom in. Tank Yorick / Juggernaut until you find Sejuani 2.', ja: 'Slam items for Karma and play for win streak with Blossom in. Tank Yorick / Juggernaut until you find Sejuani 2.' },
      { ar: 'Try to look for an econ/exp wisp every round when rolling. Prioritize Karma 3 > Sejuani 3 > Yorick 3 > Leblanc / Yunara 3. Leona / Kayle not necessary.', en: 'Try to look for an econ/exp wisp every round when rolling. Prioritize Karma 3 > Sejuani 3 > Yorick 3 > Leblanc / Yunara 3. Leona / Kayle not necessary.', ja: 'Try to look for an econ/exp wisp every round when rolling. Prioritize Karma 3 > Sejuani 3 > Yorick 3 > Leblanc / Yunara 3. Leona / Kayle not necessary.' },
      { ar: 'Finish your 3* then level for 3 Solar over time. Leftover AP items on LeBlanc. Karma 3 can also hold items too.', en: 'Finish your 3* then level for 3 Solar over time. Leftover AP items on LeBlanc. Karma 3 can also hold items too.', ja: 'Finish your 3* then level for 3 Solar over time. Leftover AP items on LeBlanc. Karma 3 can also hold items too.' }
    ],
    alternatives: [],
  },
  {
    slug: 'defender-cassio',
    name: { ar: 'مدافع كاسيوبيا', en: 'Defender Cassio', ja: 'Defender Cassio' },
    subtitle: { ar: 'مدافع كاسيوبيا إعادة لفّ', en: 'Defender Cassiopeia Reroll', ja: 'Defender Cassiopeia Reroll' },
    tier: 'A',
    difficulty: 1,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Open with a strong AP opener, preferably around Invokers. Karma is an example shown but you can also play Invokers or Coven lose streak. If lose streaking with Coven, try to kill some units each fight', en: 'Open with a strong AP opener, preferably around Invokers. Karma is an example shown but you can also play Invokers or Coven lose streak. If lose streaking with Coven, try to kill some units each fight', ja: 'Open with a strong AP opener, preferably around Invokers. Karma is an example shown but you can also play Invokers or Coven lose streak. If lose streaking with Coven, try to kill some units each fight' },
    units: [
      { champion: 'DA_18_Leona', items: [], star: 1, row: 0, col: 2 },
      { champion: 'DA_18_Ornn', items: [], star: 3, row: 0, col: 1 },
      { champion: 'DA_18_Shen', items: [], star: 1, row: 0, col: 3 },
      { champion: 'DA_18_Cassiopeia', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_HextechGunblade', 'TFT_Item_ArchangelsStaff'], star: 3, row: 3, col: 6 },
      { champion: 'DA_Fiddlesticks18', items: ['TFT_Item_TitansResolve', 'TFT_Item_AdaptiveHelm', 'TFT_Item_Crownguard'], star: 3, row: 0, col: 4 },
      { champion: 'DA_18_Rammus', items: ['TFT_Item_IonicSpark', 'TFT_Item_RedBuff', 'TFT_Item_GargoyleStoneplate'], star: 3, row: 0, col: 5 },
      { champion: 'DA_18_Lillia', items: ['TFT_Item_ThiefsGloves'], star: 1, row: 0, col: 0 }
    ],
    earlyUnits: [
      'DA_Karma18',
      'DA_18_Leona',
      'DA_18_Ornn',
      'DA_18_LeBlanc',
    ],
    augments: [
      { id: 'DA_Ascension', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_WovenMagic', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Open with a strong AP opener, preferably around Invokers. Karma is an example shown but you can also play Invokers or Coven lose streak.', en: 'Open with a strong AP opener, preferably around Invokers. Karma is an example shown but you can also play Invokers or Coven lose streak.', ja: 'Open with a strong AP opener, preferably around Invokers. Karma is an example shown but you can also play Invokers or Coven lose streak.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'If lose streaking with Coven, try to kill some units each fight to preserve HP. If win streaking, push standard winstreak tempo (6 @ 3-2, 7 @ 3-5) and save econ.', en: 'If lose streaking with Coven, try to kill some units each fight to preserve HP. If win streaking, push standard winstreak tempo (6 @ 3-2, 7 @ 3-5) and save econ.', ja: 'If lose streaking with Coven, try to kill some units each fight to preserve HP. If win streaking, push standard winstreak tempo (6 @ 3-2, 7 @ 3-5) and save econ.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Cash out / roll on level 7 for Cassio 2 / Fiddle 2. Then econ up and slow roll above 50g for 3* units. Then level to 8 for a duo carry.', en: 'Cash out / roll on level 7 for Cassio 2 / Fiddle 2. Then econ up and slow roll above 50g for 3* units. Then level to 8 for a duo carry.', ja: 'Cash out / roll on level 7 for Cassio 2 / Fiddle 2. Then econ up and slow roll above 50g for 3* units. Then level to 8 for a duo carry.' } }
    ],
    tips: [
      { ar: 'Open with a strong AP opener, preferably around Invokers. Karma is an example shown but you can also play Invokers or Coven lose streak.', en: 'Open with a strong AP opener, preferably around Invokers. Karma is an example shown but you can also play Invokers or Coven lose streak.', ja: 'Open with a strong AP opener, preferably around Invokers. Karma is an example shown but you can also play Invokers or Coven lose streak.' },
      { ar: 'If lose streaking with Coven, try to kill some units each fight to preserve HP. If win streaking, push standard winstreak tempo (6 @ 3-2, 7 @ 3-5) and save econ.', en: 'If lose streaking with Coven, try to kill some units each fight to preserve HP. If win streaking, push standard winstreak tempo (6 @ 3-2, 7 @ 3-5) and save econ.', ja: 'If lose streaking with Coven, try to kill some units each fight to preserve HP. If win streaking, push standard winstreak tempo (6 @ 3-2, 7 @ 3-5) and save econ.' },
      { ar: 'Cash out / roll on level 7 for Cassio 2 / Fiddle 2. Then econ up and slow roll above 50g for 3* units. Then level to 8 for a duo carry.', en: 'Cash out / roll on level 7 for Cassio 2 / Fiddle 2. Then econ up and slow roll above 50g for 3* units. Then level to 8 for a duo carry.', ja: 'Cash out / roll on level 7 for Cassio 2 / Fiddle 2. Then econ up and slow roll above 50g for 3* units. Then level to 8 for a duo carry.' }
    ],
    alternatives: [],
  },
  {
    slug: 'primal-jungle-copy',
    name: { ar: 'بدائي مرن', en: 'Primal Flex', ja: 'Primal Flex' },
    subtitle: { ar: 'سيفير مرن', en: 'Sivir Flex', ja: 'Sivir Flex' },
    tier: 'A',
    difficulty: 2,
    playstyle: { ar: 'فاست 8', en: 'Fast 8', ja: 'Fast 8' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Play around a strong AD opener prioritizing Sivir items. This comp doesn\'t keep 1 costs in the final comp so you can slam aggressively. Comp is very Sword hungry so keep taking them off augments / car', en: 'Play around a strong AD opener prioritizing Sivir items. This comp doesn\'t keep 1 costs in the final comp so you can slam aggressively. Comp is very Sword hungry so keep taking them off augments / car', ja: 'Play around a strong AD opener prioritizing Sivir items. This comp doesn\'t keep 1 costs in the final comp so you can slam aggressively. Comp is very Sword hungry so keep taking them off augments / car' },
    units: [
      { champion: 'DA_Amumu18', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_GargoyleStoneplate', 'TFT_Item_BrambleVest'], star: 1, row: 0, col: 2 },
      { champion: 'DA_18_Sivir', items: ['TFT_Item_InfinityEdge', 'TFT_Item_SpearOfShojin'], star: 1, row: 3, col: 0 },
      { champion: 'DA_18_Shen', items: [], star: 1, row: 0, col: 3 },
      { champion: 'DA_Vi18', items: [], star: 1, row: 0, col: 4 },
      { champion: 'DA_18_Ashe', items: ['TFT_Item_RapidFireCannon', 'TFT_Item_LastWhisper'], star: 1, row: 3, col: 6 },
      { champion: 'DA_18_Ivern', items: [], star: 1, row: 3, col: 4 },
      { champion: 'DA_18_Tristana', items: [], star: 1, row: 3, col: 2 },
      { champion: 'DA_18_Lillia', items: ['TFT_Item_FrozenHeart'], star: 1, row: 0, col: 6 }
    ],
    earlyUnits: [
      'DA_18_Akali_AD',
      'DA_18_Camille',
      'DA_18_Shen',
      'DA_18_Leona',
    ],
    augments: [
      { id: 'DA_Swordsmith', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Play around a strong AD opener prioritizing Sivir items. This comp doesn\'t keep 1 costs in the final comp so you can slam aggressively.', en: 'Play around a strong AD opener prioritizing Sivir items. This comp doesn\'t keep 1 costs in the final comp so you can slam aggressively.', ja: 'Play around a strong AD opener prioritizing Sivir items. This comp doesn\'t keep 1 costs in the final comp so you can slam aggressively.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Comp is very Sword hungry so keep taking them off augments / carousels when possible. Prioritize finishing your 3 carry / 3 tank items.', en: 'Comp is very Sword hungry so keep taking them off augments / carousels when possible. Prioritize finishing your 3 carry / 3 tank items.', ja: 'Comp is very Sword hungry so keep taking them off augments / carousels when possible. Prioritize finishing your 3 carry / 3 tank items.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level to 8 and roll for Sivir and upgraded frontline. To be stable, you may need to temporarily tank Vi 2 over 1* 4 costs. Once stable, go 9 for 5 costs.', en: 'Level to 8 and roll for Sivir and upgraded frontline. To be stable, you may need to temporarily tank Vi 2 over 1* 4 costs. Once stable, go 9 for 5 costs.', ja: 'Level to 8 and roll for Sivir and upgraded frontline. To be stable, you may need to temporarily tank Vi 2 over 1* 4 costs. Once stable, go 9 for 5 costs.' } }
    ],
    tips: [
      { ar: 'Play around a strong AD opener prioritizing Sivir items. This comp doesn\'t keep 1 costs in the final comp so you can slam aggressively.', en: 'Play around a strong AD opener prioritizing Sivir items. This comp doesn\'t keep 1 costs in the final comp so you can slam aggressively.', ja: 'Play around a strong AD opener prioritizing Sivir items. This comp doesn\'t keep 1 costs in the final comp so you can slam aggressively.' },
      { ar: 'Comp is very Sword hungry so keep taking them off augments / carousels when possible. Prioritize finishing your 3 carry / 3 tank items.', en: 'Comp is very Sword hungry so keep taking them off augments / carousels when possible. Prioritize finishing your 3 carry / 3 tank items.', ja: 'Comp is very Sword hungry so keep taking them off augments / carousels when possible. Prioritize finishing your 3 carry / 3 tank items.' },
      { ar: 'Level to 8 and roll for Sivir and upgraded frontline. To be stable, you may need to temporarily tank Vi 2 over 1* 4 costs. Once stable, go 9 for 5 costs.', en: 'Level to 8 and roll for Sivir and upgraded frontline. To be stable, you may need to temporarily tank Vi 2 over 1* 4 costs. Once stable, go 9 for 5 costs.', ja: 'Level to 8 and roll for Sivir and upgraded frontline. To be stable, you may need to temporarily tank Vi 2 over 1* 4 costs. Once stable, go 9 for 5 costs.' }
    ],
    alternatives: [],
  },
  {
    slug: 'ahri-morgana',
    name: { ar: 'أهري مورغانا', en: 'Ahri Morgana', ja: 'Ahri Morgana' },
    subtitle: { ar: 'عرّاف أهري', en: 'Invoker Ahri', ja: 'Invoker Ahri' },
    tier: 'A',
    difficulty: 2,
    playstyle: { ar: 'فاست 8', en: 'Fast 8', ja: 'Fast 8' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank. Flex in more Blossom or Spellweavers as you get them. You can tank all kinds of fr', en: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank. Flex in more Blossom or Spellweavers as you get them. You can tank all kinds of fr', ja: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank. Flex in more Blossom or Spellweavers as you get them. You can tank all kinds of fr' },
    units: [
      { champion: 'DA_Karma18', items: [], star: 1, row: 3, col: 0 },
      { champion: 'DA_18_Sentry', items: [], star: 1, row: 3, col: 4 },
      { champion: 'DA_Krug18', items: [], star: 1, row: 2, col: 2 },
      { champion: 'DA_18_Sett', items: [], star: 1, row: 1, col: 2 },
      { champion: 'DA_18_Morgana', items: ['TFT_Item_StatikkShiv', 'TFT_Item_Morellonomicon'], star: 1, row: 2, col: 3 },
      { champion: 'DA_18_Ahri', items: ['TFT_Item_JeweledGauntlet', 'TFT_Item_SpearOfShojin'], star: 1, row: 3, col: 2 },
      { champion: 'DA_Sentinel18', items: ['TFT_Item_DragonsClaw', 'TFT_Item_BrambleVest', 'TFT_Item_WarmogsArmor'], star: 1, row: 0, col: 3 },
      { champion: 'DA_Taric18', items: [], star: 1, row: 1, col: 3 }
    ],
    earlyUnits: [
      'DA_18_Rakan',
      'DA_18_Yorick',
      'DA_Karma18',
      'DA_18_Yunara',
    ],
    augments: [
      { id: 'DA_JeweledLotus_I', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_GlassCannon_Gold', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank.', en: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank.', ja: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Flex in more Blossom or Spellweavers as you get them. You can tank all kinds of frontline: Juggernauts, Defenders, or Vanguards.', en: 'Flex in more Blossom or Spellweavers as you get them. You can tank all kinds of frontline: Juggernauts, Defenders, or Vanguards.', ja: 'Flex in more Blossom or Spellweavers as you get them. You can tank all kinds of frontline: Juggernauts, Defenders, or Vanguards.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level and roll for Ahri, Morgana, and the frontline. Once stable, go level 9 for Lux.', en: 'Level and roll for Ahri, Morgana, and the frontline. Once stable, go level 9 for Lux.', ja: 'Level and roll for Ahri, Morgana, and the frontline. Once stable, go level 9 for Lux.' } }
    ],
    tips: [
      { ar: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank.', en: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank.', ja: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank.' },
      { ar: 'Flex in more Blossom or Spellweavers as you get them. You can tank all kinds of frontline: Juggernauts, Defenders, or Vanguards.', en: 'Flex in more Blossom or Spellweavers as you get them. You can tank all kinds of frontline: Juggernauts, Defenders, or Vanguards.', ja: 'Flex in more Blossom or Spellweavers as you get them. You can tank all kinds of frontline: Juggernauts, Defenders, or Vanguards.' },
      { ar: 'Level and roll for Ahri, Morgana, and the frontline. Once stable, go level 9 for Lux.', en: 'Level and roll for Ahri, Morgana, and the frontline. Once stable, go level 9 for Lux.', ja: 'Level and roll for Ahri, Morgana, and the frontline. Once stable, go level 9 for Lux.' }
    ],
    alternatives: [],
  },
  {
    slug: 'ap-95',
    name: { ar: 'AP سريع', en: 'AP Fast 9', ja: 'AP Fast 9' },
    subtitle: { ar: 'Alune AP سريع', en: 'Alune AP Fast 9', ja: 'Alune AP Fast 9' },
    tier: 'A',
    difficulty: 3,
    playstyle: { ar: 'فاست 9', en: 'Fast 9', ja: 'Fast 9' },
    level: { ar: 'مستوى 9', en: 'Level 9', ja: 'レベル9' },
    summary: { ar: 'Slam items aggressively and play for full win streak with AP items. Ideal opener will be Blossom featuring Karma / Spellweavers.  Continue prioritize win streaking. If you have an econ augment, you ca', en: 'Slam items aggressively and play for full win streak with AP items. Ideal opener will be Blossom featuring Karma / Spellweavers.  Continue prioritize win streaking. If you have an econ augment, you ca', ja: 'Slam items aggressively and play for full win streak with AP items. Ideal opener will be Blossom featuring Karma / Spellweavers.  Continue prioritize win streaking. If you have an econ augment, you ca' },
    units: [
      { champion: 'DA_18_Morgana', items: ['TFT_Item_StatikkShiv', 'TFT_Item_Morellonomicon'], star: 1, row: 1, col: 4 },
      { champion: 'DA_18_Diana', items: [], star: 1, row: 1, col: 3 },
      { champion: 'DA_Fiddlesticks18', items: [], star: 1, row: 0, col: 0 },
      { champion: 'DA_18_Lillia', items: [], star: 1, row: 0, col: 6 },
      { champion: 'DA_Sentinel18', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_Crownguard', 'TFT_Item_FrozenHeart'], star: 1, row: 0, col: 3 },
      { champion: 'DA_Taric18', items: [], star: 1, row: 0, col: 4 },
      { champion: 'DA_18_Alune', items: ['TFT_Item_BlueBuff', 'TFT_Item_ArchangelsStaff', 'TFT_Item_JeweledGauntlet'], star: 1, row: 3, col: 6 },
      { champion: 'DA_18_Rakan', items: [], star: 1, row: 1, col: 2 },
      { champion: 'DA_18_Ivern', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_AdaptiveHelm'], star: 1, row: 3, col: 0 }
    ],
    earlyUnits: [
      'DA_Karma18',
      'DA_18_Rakan',
      'DA_18_Yorick',
      'DA_18_Yunara',
    ],
    augments: [
      { id: 'DA_LevelUp', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Slam items aggressively and play for full win streak with AP items. Ideal opener will be Blossom featuring Karma / Spellweavers. ', en: 'Slam items aggressively and play for full win streak with AP items. Ideal opener will be Blossom featuring Karma / Spellweavers. ', ja: 'Slam items aggressively and play for full win streak with AP items. Ideal opener will be Blossom featuring Karma / Spellweavers. ' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.', en: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.', ja: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'You can start losing rounds while focusing on econ. Fast 9 by the beginning of Stage 5 and look for your 5 costs. You want around 70g+ minimum for the rolldown.', en: 'You can start losing rounds while focusing on econ. Fast 9 by the beginning of Stage 5 and look for your 5 costs. You want around 70g+ minimum for the rolldown.', ja: 'You can start losing rounds while focusing on econ. Fast 9 by the beginning of Stage 5 and look for your 5 costs. You want around 70g+ minimum for the rolldown.' } }
    ],
    tips: [
      { ar: 'Slam items aggressively and play for full win streak with AP items. Ideal opener will be Blossom featuring Karma / Spellweavers. ', en: 'Slam items aggressively and play for full win streak with AP items. Ideal opener will be Blossom featuring Karma / Spellweavers. ', ja: 'Slam items aggressively and play for full win streak with AP items. Ideal opener will be Blossom featuring Karma / Spellweavers. ' },
      { ar: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.', en: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.', ja: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.' },
      { ar: 'You can start losing rounds while focusing on econ. Fast 9 by the beginning of Stage 5 and look for your 5 costs. You want around 70g+ minimum for the rolldown.', en: 'You can start losing rounds while focusing on econ. Fast 9 by the beginning of Stage 5 and look for your 5 costs. You want around 70g+ minimum for the rolldown.', ja: 'You can start losing rounds while focusing on econ. Fast 9 by the beginning of Stage 5 and look for your 5 costs. You want around 70g+ minimum for the rolldown.' }
    ],
    alternatives: [],
  },
  {
    slug: 'dragon-princess',
    name: { ar: 'دريفن تنين', en: 'Draven Dragon 9', ja: 'Draven Dragon 9' },
    subtitle: { ar: 'تنين دريفن', en: 'Dragon Draven', ja: 'Dragon Draven' },
    tier: 'A',
    difficulty: 3,
    playstyle: { ar: 'فاست 9', en: 'Fast 9', ja: 'Fast 9' },
    level: { ar: 'مستوى 9', en: 'Level 9', ja: 'レベル9' },
    summary: { ar: 'Slam items aggressively and play for full win streak with Riftbeast items. Ideal opener will be Riftbeasts featuring Cinderling / Gromp / Mama Beak carry. Continue prioritize win streaking. If you hav', en: 'Slam items aggressively and play for full win streak with Riftbeast items. Ideal opener will be Riftbeasts featuring Cinderling / Gromp / Mama Beak carry. Continue prioritize win streaking. If you hav', ja: 'Slam items aggressively and play for full win streak with Riftbeast items. Ideal opener will be Riftbeasts featuring Cinderling / Gromp / Mama Beak carry. Continue prioritize win streaking. If you hav' },
    units: [
      { champion: 'DA_Amumu18', items: [], star: 1, row: 0, col: 4 },
      { champion: 'DA_Sentinel18', items: ['TFT_Item_FrozenHeart'], star: 1, row: 0, col: 3 },
      { champion: 'DA_Taric18', items: [], star: 1, row: 0, col: 1 },
      { champion: 'DA_18_Kennen', items: ['TFT_Item_ThiefsGloves'], star: 1, row: 0, col: 2 },
      { champion: 'DA_Draven18', items: ['TFT_Item_GuinsoosRageblade', 'TFT_Item_LastWhisper', 'TFT_Item_RunaansHurricane'], star: 1, row: 3, col: 6 },
      { champion: 'DA_18_ElderDragon', items: ['TFT_Item_InfinityEdge', 'TFT_Item_Deathblade'], star: 1, row: 2, col: 6 },
      { champion: 'DA_18_Ivern', items: ['TFT_Item_GuinsoosRageblade', 'TFT_Item_SpearOfShojin', 'TFT_Item_AdaptiveHelm'], star: 1, row: 3, col: 0 },
      { champion: 'DA_18_Maokai', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_Crownguard', 'TFT_Item_SpectralGauntlet'], star: 1, row: 0, col: 5 }
    ],
    earlyUnits: [
      'DA_Cinderling18',
      'DA_18_Sentry',
      'DA_18_Yorick',
      'DA_Scuttlecrab18',
    ],
    augments: [
      { id: 'DA_LevelUp', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Slam items aggressively and play for full win streak with Riftbeast items. Ideal opener will be Riftbeasts featuring Cinderling / Gromp / Mama Beak carry.', en: 'Slam items aggressively and play for full win streak with Riftbeast items. Ideal opener will be Riftbeasts featuring Cinderling / Gromp / Mama Beak carry.', ja: 'Slam items aggressively and play for full win streak with Riftbeast items. Ideal opener will be Riftbeasts featuring Cinderling / Gromp / Mama Beak carry.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.', en: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.', ja: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'You can start losing rounds while focusing on econ. Fast 9 by the beginning of Stage 5 and look for your 5 costs. You want around 70g+ minimum for the rolldown.', en: 'You can start losing rounds while focusing on econ. Fast 9 by the beginning of Stage 5 and look for your 5 costs. You want around 70g+ minimum for the rolldown.', ja: 'You can start losing rounds while focusing on econ. Fast 9 by the beginning of Stage 5 and look for your 5 costs. You want around 70g+ minimum for the rolldown.' } }
    ],
    tips: [
      { ar: 'Slam items aggressively and play for full win streak with Riftbeast items. Ideal opener will be Riftbeasts featuring Cinderling / Gromp / Mama Beak carry.', en: 'Slam items aggressively and play for full win streak with Riftbeast items. Ideal opener will be Riftbeasts featuring Cinderling / Gromp / Mama Beak carry.', ja: 'Slam items aggressively and play for full win streak with Riftbeast items. Ideal opener will be Riftbeasts featuring Cinderling / Gromp / Mama Beak carry.' },
      { ar: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.', en: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.', ja: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.' },
      { ar: 'You can start losing rounds while focusing on econ. Fast 9 by the beginning of Stage 5 and look for your 5 costs. You want around 70g+ minimum for the rolldown.', en: 'You can start losing rounds while focusing on econ. Fast 9 by the beginning of Stage 5 and look for your 5 costs. You want around 70g+ minimum for the rolldown.', ja: 'You can start losing rounds while focusing on econ. Fast 9 by the beginning of Stage 5 and look for your 5 costs. You want around 70g+ minimum for the rolldown.' }
    ],
    alternatives: [],
  },
  {
    slug: 'invoker-nidalee-copy',
    name: { ar: 'بدائي Jungle', en: 'Primal Jungle', ja: 'Primal Jungle' },
    subtitle: { ar: 'بدائي نيدالي سيفير', en: 'Primal Nidalee Sivir', ja: 'Primal Nidalee Sivir' },
    tier: 'A',
    difficulty: 2,
    playstyle: { ar: 'فاست 8', en: 'Fast 8', ja: 'Fast 8' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Play around a strong AD opener around Cinderling 2 with Riftbeasts. Slam all your AD and tank items aggressively for win streak. Comp is very Sword hungry so keep taking them off augments / carousels ', en: 'Play around a strong AD opener around Cinderling 2 with Riftbeasts. Slam all your AD and tank items aggressively for win streak. Comp is very Sword hungry so keep taking them off augments / carousels ', ja: 'Play around a strong AD opener around Cinderling 2 with Riftbeasts. Slam all your AD and tank items aggressively for win streak. Comp is very Sword hungry so keep taking them off augments / carousels ' },
    units: [
      { champion: 'DA_Cinderling18', items: [], star: 1, row: 3, col: 6 },
      { champion: 'DA_18_RekSai', items: [], star: 1, row: 2, col: 6 },
      { champion: 'DA_KogMaw18_AD', items: [], star: 1, row: 3, col: 1 },
      { champion: 'DA_Krug18', items: [], star: 1, row: 2, col: 3 },
      { champion: 'DA_Sentinel18', items: [], star: 1, row: 2, col: 5 },
      { champion: 'DA_18_Malphite', items: ['TFT_Item_GargoyleStoneplate', 'TFT_Item_WarmogsArmor', 'TFT_Item_Crownguard'], star: 1, row: 0, col: 3 },
      { champion: 'DA_Nidalee18_AP', items: ['TFT_Item_InfinityEdge', 'TFT_Item_SteraksGage', 'TFT_Item_SpearOfShojin'], star: 1, row: 2, col: 0 },
      { champion: 'DA_18_Sivir', items: ['TFT_Item_InfinityEdge', 'TFT_Item_RapidFireCannon'], star: 1, row: 3, col: 0 }
    ],
    earlyUnits: [
      'DA_18_Yorick',
      'DA_Cinderling18',
      'DA_Gromp18_AP',
      'DA_Scuttlecrab18',
    ],
    augments: [
      { id: 'DA_Swordsmith', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Play around a strong AD opener around Cinderling 2 with Riftbeasts. Slam all your AD and tank items aggressively for win streak.', en: 'Play around a strong AD opener around Cinderling 2 with Riftbeasts. Slam all your AD and tank items aggressively for win streak.', ja: 'Play around a strong AD opener around Cinderling 2 with Riftbeasts. Slam all your AD and tank items aggressively for win streak.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Comp is very Sword hungry so keep taking them off augments / carousels when possible. You can flex in 5 Riftbeast for better shops or more generic frontline.', en: 'Comp is very Sword hungry so keep taking them off augments / carousels when possible. You can flex in 5 Riftbeast for better shops or more generic frontline.', ja: 'Comp is very Sword hungry so keep taking them off augments / carousels when possible. You can flex in 5 Riftbeast for better shops or more generic frontline.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level to 8 and roll for Nidalee, Sivir, and Malphite / tank. If Malphite is too contested, consider Sentinel or Krug tank instead.', en: 'Level to 8 and roll for Nidalee, Sivir, and Malphite / tank. If Malphite is too contested, consider Sentinel or Krug tank instead.', ja: 'Level to 8 and roll for Nidalee, Sivir, and Malphite / tank. If Malphite is too contested, consider Sentinel or Krug tank instead.' } }
    ],
    tips: [
      { ar: 'Play around a strong AD opener around Cinderling 2 with Riftbeasts. Slam all your AD and tank items aggressively for win streak.', en: 'Play around a strong AD opener around Cinderling 2 with Riftbeasts. Slam all your AD and tank items aggressively for win streak.', ja: 'Play around a strong AD opener around Cinderling 2 with Riftbeasts. Slam all your AD and tank items aggressively for win streak.' },
      { ar: 'Comp is very Sword hungry so keep taking them off augments / carousels when possible. You can flex in 5 Riftbeast for better shops or more generic frontline.', en: 'Comp is very Sword hungry so keep taking them off augments / carousels when possible. You can flex in 5 Riftbeast for better shops or more generic frontline.', ja: 'Comp is very Sword hungry so keep taking them off augments / carousels when possible. You can flex in 5 Riftbeast for better shops or more generic frontline.' },
      { ar: 'Level to 8 and roll for Nidalee, Sivir, and Malphite / tank. If Malphite is too contested, consider Sentinel or Krug tank instead.', en: 'Level to 8 and roll for Nidalee, Sivir, and Malphite / tank. If Malphite is too contested, consider Sentinel or Krug tank instead.', ja: 'Level to 8 and roll for Nidalee, Sivir, and Malphite / tank. If Malphite is too contested, consider Sentinel or Krug tank instead.' }
    ],
    alternatives: [],
  },
  {
    slug: 'adaptor-reroll-copy',
    name: { ar: 'ماستر يي رينغار', en: 'Yi Rengar', ja: 'Yi Rengar' },
    subtitle: { ar: 'ماستر ماستر يي رينغار إعادة لفّ', en: 'Master Yi Rengar Reroll', ja: 'Master Yi Rengar Reroll' },
    tier: 'A',
    difficulty: 2,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Ideally play around a Rengar opener that can win streak. Blossom is very powerful to get early econ or item wisps. Add more Adaptors and frontline as you go. Finish Yi/Rengar items by end of stage. Yo', en: 'Ideally play around a Rengar opener that can win streak. Blossom is very powerful to get early econ or item wisps. Add more Adaptors and frontline as you go. Finish Yi/Rengar items by end of stage. Yo', ja: 'Ideally play around a Rengar opener that can win streak. Blossom is very powerful to get early econ or item wisps. Add more Adaptors and frontline as you go. Finish Yi/Rengar items by end of stage. Yo' },
    units: [
      { champion: 'DA_18_Yorick', items: [], star: 1, row: 2, col: 0 },
      { champion: 'DA_Krug18', items: [], star: 3, row: 0, col: 1 },
      { champion: 'DA_18_MasterYi_AD', items: ['TFT_Item_GuardianAngel', 'TFT_Item_TitansResolve', 'TFT_Item_GuinsoosRageblade'], star: 3, row: 2, col: 6 },
      { champion: 'DA_18_Rengar', items: ['TFT_Item_TitansResolve', 'TFT_Item_GuardianAngel', 'TFT_Item_GuinsoosRageblade'], star: 3, row: 2, col: 5 },
      { champion: 'DA_Vi18', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_GargoyleStoneplate', 'TFT_Item_SpectralGauntlet'], star: 3, row: 0, col: 5 },
      { champion: 'DA_18_Sett', items: [], star: 1, row: 0, col: 0 },
      { champion: 'DA_Nidalee18_AP', items: ['TFT_Item_GuinsoosRageblade', 'TFT_Item_SpearOfShojin', 'TFT_Item_RabadonsDeathcap'], star: 1, row: 3, col: 6 }
    ],
    earlyUnits: [
      'DA_Karma18',
      'DA_18_Yorick',
      'DA_Gromp18_AP',
      'DA_18_MasterYi_AD',
    ],
    augments: [
      { id: 'DA_PortableForge', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_LivingForge', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_HeroicGrabBag', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Ideally play around a Rengar opener that can win streak. Blossom is very powerful to get early econ or item wisps.', en: 'Ideally play around a Rengar opener that can win streak. Blossom is very powerful to get early econ or item wisps.', ja: 'Ideally play around a Rengar opener that can win streak. Blossom is very powerful to get early econ or item wisps.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Add more Adaptors and frontline as you go. Finish Yi/Rengar items by end of stage. You can even play 5 Blossom for maximum Wisp greed if you highroll the 4 costs.', en: 'Add more Adaptors and frontline as you go. Finish Yi/Rengar items by end of stage. You can even play 5 Blossom for maximum Wisp greed if you highroll the 4 costs.', ja: 'Add more Adaptors and frontline as you go. Finish Yi/Rengar items by end of stage. You can even play 5 Blossom for maximum Wisp greed if you highroll the 4 costs.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level to 7 and roll for Master Yi 2, Rengar 2, and a Juggernaut Tank. Econ up and slow roll for 3*. Add Kog or a flex unit in at 8.', en: 'Level to 7 and roll for Master Yi 2, Rengar 2, and a Juggernaut Tank. Econ up and slow roll for 3*. Add Kog or a flex unit in at 8.', ja: 'Level to 7 and roll for Master Yi 2, Rengar 2, and a Juggernaut Tank. Econ up and slow roll for 3*. Add Kog or a flex unit in at 8.' } }
    ],
    tips: [
      { ar: 'Ideally play around a Rengar opener that can win streak. Blossom is very powerful to get early econ or item wisps.', en: 'Ideally play around a Rengar opener that can win streak. Blossom is very powerful to get early econ or item wisps.', ja: 'Ideally play around a Rengar opener that can win streak. Blossom is very powerful to get early econ or item wisps.' },
      { ar: 'Add more Adaptors and frontline as you go. Finish Yi/Rengar items by end of stage. You can even play 5 Blossom for maximum Wisp greed if you highroll the 4 costs.', en: 'Add more Adaptors and frontline as you go. Finish Yi/Rengar items by end of stage. You can even play 5 Blossom for maximum Wisp greed if you highroll the 4 costs.', ja: 'Add more Adaptors and frontline as you go. Finish Yi/Rengar items by end of stage. You can even play 5 Blossom for maximum Wisp greed if you highroll the 4 costs.' },
      { ar: 'Level to 7 and roll for Master Yi 2, Rengar 2, and a Juggernaut Tank. Econ up and slow roll for 3*. Add Kog or a flex unit in at 8.', en: 'Level to 7 and roll for Master Yi 2, Rengar 2, and a Juggernaut Tank. Econ up and slow roll for 3*. Add Kog or a flex unit in at 8.', ja: 'Level to 7 and roll for Master Yi 2, Rengar 2, and a Juggernaut Tank. Econ up and slow roll for 3*. Add Kog or a flex unit in at 8.' }
    ],
    alternatives: [],
  },
  {
    slug: 'ahri-morgana-copy',
    name: { ar: 'نسّاج السحر أهري', en: 'Spellweaver Ahri', ja: 'Spellweaver Ahri' },
    subtitle: { ar: 'نسّاج السحر أهري', en: 'Spellweaver Ahri', ja: 'Spellweaver Ahri' },
    tier: 'A',
    difficulty: 2,
    playstyle: { ar: 'فاست 8', en: 'Fast 8', ja: 'Fast 8' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank. Flex in more Blossom or Spellweavers as you get them. You can tank all kinds of fr', en: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank. Flex in more Blossom or Spellweavers as you get them. You can tank all kinds of fr', ja: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank. Flex in more Blossom or Spellweavers as you get them. You can tank all kinds of fr' },
    units: [
      { champion: 'DA_Karma18', items: [], star: 1, row: 3, col: 6 },
      { champion: 'DA_Fiddlesticks18', items: [], star: 1, row: 0, col: 3 },
      { champion: 'DA_18_Cassiopeia', items: ['TFT_Item_StatikkShiv', 'TFT_Item_Morellonomicon'], star: 1, row: 3, col: 0 },
      { champion: 'DA_18_Lillia', items: ['TFT_Item_FrozenHeart'], star: 1, row: 0, col: 6 },
      { champion: 'DA_18_Ahri', items: ['TFT_Item_JeweledGauntlet', 'TFT_Item_SpearOfShojin'], star: 1, row: 3, col: 2 },
      { champion: 'DA_18_Sett', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_Redemption', 'TFT_Item_GargoyleStoneplate'], star: 1, row: 0, col: 2 },
      { champion: 'DA_18_Alune', items: [], star: 1, row: 3, col: 4 },
      { champion: 'DA_18_GnarSmall', items: [], star: 1, row: 3, col: 3 }
    ],
    earlyUnits: [
      'DA_18_Rakan',
      'DA_18_Yorick',
      'DA_Karma18',
      'DA_18_Yunara',
    ],
    augments: [
      { id: 'DA_JeweledLotus_I', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_GlassCannon_Gold', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_CyberneticUplink_Gold', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank.', en: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank.', ja: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Flex in more Blossom or Spellweavers as you get them. You can tank all kinds of frontline: Juggernauts, Defenders, or Vanguards.', en: 'Flex in more Blossom or Spellweavers as you get them. You can tank all kinds of frontline: Juggernauts, Defenders, or Vanguards.', ja: 'Flex in more Blossom or Spellweavers as you get them. You can tank all kinds of frontline: Juggernauts, Defenders, or Vanguards.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level and roll for Ahri, Morgana, and the frontline. Once stable, go level 9 for Lux.', en: 'Level and roll for Ahri, Morgana, and the frontline. Once stable, go level 9 for Lux.', ja: 'Level and roll for Ahri, Morgana, and the frontline. Once stable, go level 9 for Lux.' } }
    ],
    tips: [
      { ar: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank.', en: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank.', ja: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank.' },
      { ar: 'Flex in more Blossom or Spellweavers as you get them. You can tank all kinds of frontline: Juggernauts, Defenders, or Vanguards.', en: 'Flex in more Blossom or Spellweavers as you get them. You can tank all kinds of frontline: Juggernauts, Defenders, or Vanguards.', ja: 'Flex in more Blossom or Spellweavers as you get them. You can tank all kinds of frontline: Juggernauts, Defenders, or Vanguards.' },
      { ar: 'Level and roll for Ahri, Morgana, and the frontline. Once stable, go level 9 for Lux.', en: 'Level and roll for Ahri, Morgana, and the frontline. Once stable, go level 9 for Lux.', ja: 'Level and roll for Ahri, Morgana, and the frontline. Once stable, go level 9 for Lux.' }
    ],
    alternatives: [],
  },
  {
    slug: 'riftbeast-reroll',
    name: { ar: 'وحش الريفت إعادة لفّ', en: 'Riftbeast Reroll', ja: 'Riftbeast Reroll' },
    subtitle: { ar: 'وحش الريفت بيبلز إعادة لفّ', en: 'Riftbeast Pebbles Reroll', ja: 'Riftbeast Pebbles Reroll' },
    tier: 'B',
    difficulty: 1,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Slam items aggressively and play for full win streak with Pebbles items. Alpha Mark Crab or Gromp. Save up econ and try to go level 7  for 7 riftbeast on 3-5, if you\'re poor wait until 4-1. Once you h', en: 'Slam items aggressively and play for full win streak with Pebbles items. Alpha Mark Crab or Gromp. Save up econ and try to go level 7  for 7 riftbeast on 3-5, if you\'re poor wait until 4-1. Once you h', ja: 'Slam items aggressively and play for full win streak with Pebbles items. Alpha Mark Crab or Gromp. Save up econ and try to go level 7  for 7 riftbeast on 3-5, if you\'re poor wait until 4-1. Once you h' },
    units: [
      { champion: 'DA_Cinderling18', items: ['TFT_Item_InfinityEdge', 'TFT_Item_BlueBuff', 'TFT_Item_LastWhisper'], star: 3, row: 3, col: 6 },
      { champion: 'DA_18_Sentry', items: ['TFT_Item_BlueBuff', 'TFT_Item_RabadonsDeathcap', 'TFT_Item_JeweledGauntlet'], star: 3, row: 3, col: 5 },
      { champion: 'DA_Murkwolf18', items: [], star: 1, row: 2, col: 3 },
      { champion: 'DA_Scuttlecrab18', items: [], star: 3, row: 2, col: 4 },
      { champion: 'DA_Krug18', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_GargoyleStoneplate', 'TFT_Item_Redemption'], star: 3, row: 0, col: 4 },
      { champion: 'DA_Sentinel18', items: [], star: 1, row: 2, col: 2 },
      { champion: 'DA_Brambleback18', items: ['TFT_Item_ThiefsGloves'], star: 1, row: 2, col: 6 },
      { champion: 'DA_18_GnarSmall', items: [], star: 1, row: 2, col: 5 }
    ],
    earlyUnits: [
      'DA_Cinderling18',
      'DA_18_Sentry',
      'DA_18_Yorick',
      'DA_Scuttlecrab18',
    ],
    augments: [
      { id: 'DA_18_RiftbeastTraitAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_JeweledLotus_I', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Slam items aggressively and play for full win streak with Pebbles items. Alpha Mark Crab or Gromp.', en: 'Slam items aggressively and play for full win streak with Pebbles items. Alpha Mark Crab or Gromp.', ja: 'Slam items aggressively and play for full win streak with Pebbles items. Alpha Mark Crab or Gromp.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Save up econ and try to go level 7  for 7 riftbeast on 3-5, if you\'re poor wait until 4-1.', en: 'Save up econ and try to go level 7  for 7 riftbeast on 3-5, if you\'re poor wait until 4-1.', ja: 'Save up econ and try to go level 7  for 7 riftbeast on 3-5, if you\'re poor wait until 4-1.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Once you have your 3*, level to 8 and field 7 Riftbeast. If you can get to 9, you can ditch 1* Ravagers for Elder Dragon.', en: 'Once you have your 3*, level to 8 and field 7 Riftbeast. If you can get to 9, you can ditch 1* Ravagers for Elder Dragon.', ja: 'Once you have your 3*, level to 8 and field 7 Riftbeast. If you can get to 9, you can ditch 1* Ravagers for Elder Dragon.' } }
    ],
    tips: [
      { ar: 'Slam items aggressively and play for full win streak with Pebbles items. Alpha Mark Crab or Gromp.', en: 'Slam items aggressively and play for full win streak with Pebbles items. Alpha Mark Crab or Gromp.', ja: 'Slam items aggressively and play for full win streak with Pebbles items. Alpha Mark Crab or Gromp.' },
      { ar: 'Save up econ and try to go level 7  for 7 riftbeast on 3-5, if you\'re poor wait until 4-1.', en: 'Save up econ and try to go level 7  for 7 riftbeast on 3-5, if you\'re poor wait until 4-1.', ja: 'Save up econ and try to go level 7  for 7 riftbeast on 3-5, if you\'re poor wait until 4-1.' },
      { ar: 'Once you have your 3*, level to 8 and field 7 Riftbeast. If you can get to 9, you can ditch 1* Ravagers for Elder Dragon.', en: 'Once you have your 3*, level to 8 and field 7 Riftbeast. If you can get to 9, you can ditch 1* Ravagers for Elder Dragon.', ja: 'Once you have your 3*, level to 8 and field 7 Riftbeast. If you can get to 9, you can ditch 1* Ravagers for Elder Dragon.' }
    ],
    alternatives: [],
  },
  {
    slug: 'azir-rammus',
    name: { ar: 'أزير Rammus', en: 'Azir Rammus', ja: 'Azir Rammus' },
    subtitle: { ar: 'أزير Rammus إعادة لفّ', en: 'Azir Rammus Reroll', ja: 'Azir Rammus Reroll' },
    tier: 'B',
    difficulty: 1,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Try to angle this comp with early Azir ideally with Blossom opener for better charms. Take rods off carousel whenever possible. If you have a few crucial pairs on level 6, you can consider rolling sli', en: 'Try to angle this comp with early Azir ideally with Blossom opener for better charms. Take rods off carousel whenever possible. If you have a few crucial pairs on level 6, you can consider rolling sli', ja: 'Try to angle this comp with early Azir ideally with Blossom opener for better charms. Take rods off carousel whenever possible. If you have a few crucial pairs on level 6, you can consider rolling sli' },
    units: [
      { champion: 'DA_18_Veigar', items: [], star: 1, row: 3, col: 6 },
      { champion: 'DA_18_Teemo', items: [], star: 3, row: 2, col: 3 },
      { champion: 'DA_Fiddlesticks18', items: [], star: 1, row: 2, col: 4 },
      { champion: 'DA_18_Azir', items: ['TFT_Item_GuinsoosRageblade', 'TFT_Item_RabadonsDeathcap', 'TFT_Item_HextechGunblade'], star: 3, row: 3, col: 0 },
      { champion: 'DA_18_Rammus', items: ['TFT_Item_Crownguard', 'TFT_Item_GargoyleStoneplate'], star: 3, row: 0, col: 3 },
      { champion: 'DA_18_Soraka', items: [], star: 1, row: 3, col: 4 },
      { champion: 'DA_18_Zyra', items: ['TFT_Item_StatikkShiv', 'TFT_Item_Morellonomicon'], star: 1, row: 3, col: 2 }
    ],
    earlyUnits: [
      'DA_Karma18',
      'DA_18_Yorick',
      'DA_18_Yunara',
      'DA_18_Azir',
    ],
    augments: [
      { id: 'DA_BlackthornTraitAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Try to angle this comp with early Azir ideally with Blossom opener for better charms. Take rods off carousel whenever possible.', en: 'Try to angle this comp with early Azir ideally with Blossom opener for better charms. Take rods off carousel whenever possible.', ja: 'Try to angle this comp with early Azir ideally with Blossom opener for better charms. Take rods off carousel whenever possible.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.', en: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.', ja: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Make sure you have 2* Azir, Rammus 4-1, then slowroll above 50 for 3 stars. Once you finish, level for more Summoner / Executioner.', en: 'Make sure you have 2* Azir, Rammus 4-1, then slowroll above 50 for 3 stars. Once you finish, level for more Summoner / Executioner.', ja: 'Make sure you have 2* Azir, Rammus 4-1, then slowroll above 50 for 3 stars. Once you finish, level for more Summoner / Executioner.' } }
    ],
    tips: [
      { ar: 'Try to angle this comp with early Azir ideally with Blossom opener for better charms. Take rods off carousel whenever possible.', en: 'Try to angle this comp with early Azir ideally with Blossom opener for better charms. Take rods off carousel whenever possible.', ja: 'Try to angle this comp with early Azir ideally with Blossom opener for better charms. Take rods off carousel whenever possible.' },
      { ar: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.', en: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.', ja: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.' },
      { ar: 'Make sure you have 2* Azir, Rammus 4-1, then slowroll above 50 for 3 stars. Once you finish, level for more Summoner / Executioner.', en: 'Make sure you have 2* Azir, Rammus 4-1, then slowroll above 50 for 3 stars. Once you finish, level for more Summoner / Executioner.', ja: 'Make sure you have 2* Azir, Rammus 4-1, then slowroll above 50 for 3 stars. Once you finish, level for more Summoner / Executioner.' }
    ],
    alternatives: [],
  },
  {
    slug: 'soraka-flex',
    name: { ar: 'مالفأيت AP مرن', en: 'Malphite AP Flex', ja: 'Malphite AP Flex' },
    subtitle: { ar: 'مستدعي مالفأيت مرن', en: 'Summoner Malphite Flex', ja: 'Summoner Malphite Flex' },
    tier: 'B',
    difficulty: 2,
    playstyle: { ar: 'فاست 8', en: 'Fast 8', ja: 'Fast 8' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Malphite items for a win streak. Add in useful 3 costs like Fiddlesticks, Cassio, Azir then flex around their traits.', en: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Malphite items for a win streak. Add in useful 3 costs like Fiddlesticks, Cassio, Azir then flex around their traits.', ja: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Malphite items for a win streak. Add in useful 3 costs like Fiddlesticks, Cassio, Azir then flex around their traits.' },
    units: [
      { champion: 'DA_18_Yorick', items: [], star: 1, row: 2, col: 6 },
      { champion: 'DA_18_Azir', items: [], star: 1, row: 3, col: 6 },
      { champion: 'DA_Fiddlesticks18', items: [], star: 1, row: 2, col: 3 },
      { champion: 'DA_Amumu18', items: [], star: 1, row: 2, col: 2 },
      { champion: 'DA_18_Malphite', items: ['TFT_Item_GargoyleStoneplate', 'TFT_Item_WarmogsArmor', 'TFT_Item_Crownguard'], star: 1, row: 0, col: 3 },
      { champion: 'DA_18_Soraka', items: ['TFT_Item_RabadonsDeathcap', 'TFT_Item_AdaptiveHelm', 'TFT_Item_JeweledGauntlet'], star: 1, row: 3, col: 1 },
      { champion: 'DA_18_Zyra', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_StatikkShiv', 'TFT_Item_ArchangelsStaff'], star: 1, row: 3, col: 0 },
      { champion: 'DA_18_Kennen', items: [], star: 1, row: 3, col: 2 }
    ],
    earlyUnits: [
      'DA_18_Rakan',
      'DA_18_Yorick',
      'DA_Karma18',
      'DA_18_Yunara',
    ],
    augments: [
      { id: 'DA_BlackthornTraitAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_CyberneticUplink_Gold', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Malphite items for a win streak.', en: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Malphite items for a win streak.', ja: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Malphite items for a win streak.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Add in useful 3 costs like Fiddlesticks, Cassio, Azir then flex around their traits. General rule: put items on upgraded units.', en: 'Add in useful 3 costs like Fiddlesticks, Cassio, Azir then flex around their traits. General rule: put items on upgraded units.', ja: 'Add in useful 3 costs like Fiddlesticks, Cassio, Azir then flex around their traits. General rule: put items on upgraded units.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level and roll for Malphite. You will often have to itemize and work with whoever you hit so don\'t overly tunnel on your roll down.', en: 'Level and roll for Malphite. You will often have to itemize and work with whoever you hit so don\'t overly tunnel on your roll down.', ja: 'Level and roll for Malphite. You will often have to itemize and work with whoever you hit so don\'t overly tunnel on your roll down.' } }
    ],
    tips: [
      { ar: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Malphite items for a win streak.', en: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Malphite items for a win streak.', ja: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Malphite items for a win streak.' },
      { ar: 'Add in useful 3 costs like Fiddlesticks, Cassio, Azir then flex around their traits. General rule: put items on upgraded units.', en: 'Add in useful 3 costs like Fiddlesticks, Cassio, Azir then flex around their traits. General rule: put items on upgraded units.', ja: 'Add in useful 3 costs like Fiddlesticks, Cassio, Azir then flex around their traits. General rule: put items on upgraded units.' },
      { ar: 'Level and roll for Malphite. You will often have to itemize and work with whoever you hit so don\'t overly tunnel on your roll down.', en: 'Level and roll for Malphite. You will often have to itemize and work with whoever you hit so don\'t overly tunnel on your roll down.', ja: 'Level and roll for Malphite. You will often have to itemize and work with whoever you hit so don\'t overly tunnel on your roll down.' }
    ],
    alternatives: [],
  },
  {
    slug: '6-juggernaut-ap',
    name: { ar: 'زايرا المقاوم', en: 'Zyra Juggernaut', ja: 'Zyra Juggernaut' },
    subtitle: { ar: 'المقاوم زايرا', en: 'Juggernaut Zyra', ja: 'Juggernaut Zyra' },
    tier: 'B',
    difficulty: 3,
    playstyle: { ar: 'فاست 8', en: 'Fast 8', ja: 'Fast 8' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Tank items for a win streak. Ideally start holding more juggernauts to pair with the Yorick blossom opener, consider ', en: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Tank items for a win streak. Ideally start holding more juggernauts to pair with the Yorick blossom opener, consider ', ja: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Tank items for a win streak. Ideally start holding more juggernauts to pair with the Yorick blossom opener, consider ' },
    units: [
      { champion: 'DA_18_Rakan', items: [], star: 1, row: 0, col: 0 },
      { champion: 'DA_18_Yorick', items: [], star: 1, row: 0, col: 1 },
      { champion: 'DA_Scuttlecrab18', items: [], star: 1, row: 0, col: 2 },
      { champion: 'DA_Vi18', items: [], star: 1, row: 0, col: 3 },
      { champion: 'DA_Amumu18', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_BrambleVest', 'TFT_Item_DragonsClaw'], star: 1, row: 0, col: 5 },
      { champion: 'DA_Nidalee18_AP', items: ['TFT_Item_GuinsoosRageblade', 'TFT_Item_ArchangelsStaff', 'TFT_Item_StatikkShiv'], star: 1, row: 3, col: 5 },
      { champion: 'DA_18_Zyra', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_ArchangelsStaff', 'TFT_Item_HextechGunblade'], star: 1, row: 3, col: 6 },
      { champion: 'DA_18_Maokai', items: [], star: 1, row: 0, col: 4 },
      { champion: 'DA_18_Ivern', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_GuinsoosRageblade'], star: 1, row: 3, col: 0 }
    ],
    earlyUnits: [
      'DA_18_Rakan',
      'DA_18_Yorick',
      'DA_Karma18',
      'DA_18_Yunara',
    ],
    augments: [
      { id: 'DA_BlackthornTraitAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_CyberneticUplink_Gold', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Tank items for a win streak.', en: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Tank items for a win streak.', ja: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Tank items for a win streak.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Ideally start holding more juggernauts to pair with the Yorick blossom opener, consider moving karma items to LB or Cassio 2.', en: 'Ideally start holding more juggernauts to pair with the Yorick blossom opener, consider moving karma items to LB or Cassio 2.', ja: 'Ideally start holding more juggernauts to pair with the Yorick blossom opener, consider moving karma items to LB or Cassio 2.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level and roll for 6 Juggernauts + Zyra and a duo-carry. You can push 9 when you hit Zyra 2. Tank Vi 2 over Amumu 1. End game move items to Maokai.', en: 'Level and roll for 6 Juggernauts + Zyra and a duo-carry. You can push 9 when you hit Zyra 2. Tank Vi 2 over Amumu 1. End game move items to Maokai.', ja: 'Level and roll for 6 Juggernauts + Zyra and a duo-carry. You can push 9 when you hit Zyra 2. Tank Vi 2 over Amumu 1. End game move items to Maokai.' } }
    ],
    tips: [
      { ar: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Tank items for a win streak.', en: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Tank items for a win streak.', ja: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Tank items for a win streak.' },
      { ar: 'Ideally start holding more juggernauts to pair with the Yorick blossom opener, consider moving karma items to LB or Cassio 2.', en: 'Ideally start holding more juggernauts to pair with the Yorick blossom opener, consider moving karma items to LB or Cassio 2.', ja: 'Ideally start holding more juggernauts to pair with the Yorick blossom opener, consider moving karma items to LB or Cassio 2.' },
      { ar: 'Level and roll for 6 Juggernauts + Zyra and a duo-carry. You can push 9 when you hit Zyra 2. Tank Vi 2 over Amumu 1. End game move items to Maokai.', en: 'Level and roll for 6 Juggernauts + Zyra and a duo-carry. You can push 9 when you hit Zyra 2. Tank Vi 2 over Amumu 1. End game move items to Maokai.', ja: 'Level and roll for 6 Juggernauts + Zyra and a duo-carry. You can push 9 when you hit Zyra 2. Tank Vi 2 over Amumu 1. End game move items to Maokai.' }
    ],
    alternatives: [],
  },
  {
    slug: 'aphelios-nidalee',
    name: { ar: 'أفيليوس نيدالي', en: 'Aphelios Nidalee', ja: 'Aphelios Nidalee' },
    subtitle: { ar: 'نيدالي أفيليوس', en: 'Nidalee Aphelios', ja: 'Nidalee Aphelios' },
    tier: 'B',
    difficulty: 2,
    playstyle: { ar: 'فاست 8', en: 'Fast 8', ja: 'Fast 8' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win. Comp can use many items so take item augment if you don\'t have one yet. Mama Be', en: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win. Comp can use many items so take item augment if you don\'t have one yet. Mama Be', ja: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win. Comp can use many items so take item augment if you don\'t have one yet. Mama Be' },
    units: [
      { champion: 'DA_18_Varus', items: [], star: 1, row: 3, col: 6 },
      { champion: 'DA_18_Diana', items: [], star: 1, row: 1, col: 2 },
      { champion: 'DA_KogMaw18_AD', items: [], star: 1, row: 3, col: 1 },
      { champion: 'DA_Vi18', items: [], star: 1, row: 1, col: 3 },
      { champion: 'DA_Amumu18', items: [], star: 1, row: 0, col: 2 },
      { champion: 'DA_18_Aphelios', items: ['TFT_Item_InfinityEdge', 'TFT_Item_GuinsoosRageblade', 'TFT_Item_RunaansHurricane'], star: 1, row: 3, col: 0 },
      { champion: 'DA_Nidalee18_AP', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_SteraksGage', 'TFT_Item_InfinityEdge'], star: 1, row: 2, col: 0 },
      { champion: 'DA_Sentinel18', items: ['TFT_Item_FrozenHeart', 'TFT_Item_WarmogsArmor'], star: 1, row: 0, col: 3 }
    ],
    earlyUnits: [
      'DA_18_Akali_AD',
      'DA_18_Camille',
      'DA_18_Leona',
      'DA_18_Shen',
    ],
    augments: [
      { id: 'DA_Swordsmith', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_BlackthornTraitAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_BuriedTreasuresIII', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.', en: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.', ja: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.', en: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.', ja: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level to 8 and roll heavily for Aphelios and the 4 costs. Only push for 9 once you have almost all your 4 costs upgraded. ', en: 'Level to 8 and roll heavily for Aphelios and the 4 costs. Only push for 9 once you have almost all your 4 costs upgraded. ', ja: 'Level to 8 and roll heavily for Aphelios and the 4 costs. Only push for 9 once you have almost all your 4 costs upgraded. ' } }
    ],
    tips: [
      { ar: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.', en: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.', ja: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.' },
      { ar: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.', en: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.', ja: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.' },
      { ar: 'Level to 8 and roll heavily for Aphelios and the 4 costs. Only push for 9 once you have almost all your 4 costs upgraded. ', en: 'Level to 8 and roll heavily for Aphelios and the 4 costs. Only push for 9 once you have almost all your 4 costs upgraded. ', ja: 'Level to 8 and roll heavily for Aphelios and the 4 costs. Only push for 9 once you have almost all your 4 costs upgraded. ' }
    ],
    alternatives: [],
  },
  {
    slug: 'solar-melee',
    name: { ar: 'شمسي قريب', en: 'Solar Melee', ja: 'Solar Melee' },
    subtitle: { ar: 'كاميل أكالي إعادة لفّ', en: 'Camille Akali Reroll', ja: 'Camille Akali Reroll' },
    tier: 'B',
    difficulty: 1,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Look to play with lots of early copies of 1 cost + good reroll augment. Roll to 30 on 3-1 level 4 for extra 1 cost copies. Then slow roll on 5 until you have 5 3 stars for solar bonus. Make sure you k', en: 'Look to play with lots of early copies of 1 cost + good reroll augment. Roll to 30 on 3-1 level 4 for extra 1 cost copies. Then slow roll on 5 until you have 5 3 stars for solar bonus. Make sure you k', ja: 'Look to play with lots of early copies of 1 cost + good reroll augment. Roll to 30 on 3-1 level 4 for extra 1 cost copies. Then slow roll on 5 until you have 5 3 stars for solar bonus. Make sure you k' },
    units: [
      { champion: 'DA_18_Leona', items: [], star: 3, row: 2, col: 3 },
      { champion: 'DA_18_Akali_AD', items: ['TFT_Item_JeweledGauntlet', 'TFT_Item_UnstableConcoction', 'TFT_Item_GuardianAngel'], star: 3, row: 2, col: 0 },
      { champion: 'DA_18_Camille', items: ['TFT_Item_SteraksGage', 'TFT_Item_Quicksilver', 'TFT_Item_InfinityEdge'], star: 3, row: 2, col: 1 },
      { champion: 'DA_18_Ornn', items: ['TFT_Item_GargoyleStoneplate', 'TFT_Item_Crownguard', 'TFT_Item_WarmogsArmor'], star: 3, row: 0, col: 3 },
      { champion: 'DA_18_Varus', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_LastWhisper', 'TFT_Item_InfinityEdge'], star: 3, row: 3, col: 0 },
      { champion: 'DA_18_Kayle', items: [], star: 1, row: 3, col: 6 },
      { champion: 'DA_18_Sejuani', items: [], star: 1, row: 2, col: 6 }
    ],
    earlyUnits: [
      'DA_18_Akali_AD',
      'DA_18_Camille',
      'DA_18_Leona',
      'DA_18_Ornn',
    ],
    augments: [
      { id: 'DA_EarlyLearnings', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Look to play with lots of early copies of 1 cost + good reroll augment.', en: 'Look to play with lots of early copies of 1 cost + good reroll augment.', ja: 'Look to play with lots of early copies of 1 cost + good reroll augment.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Roll to 30 on 3-1 level 4 for extra 1 cost copies. Then slow roll on 5 until you have 5 3 stars for solar bonus.', en: 'Roll to 30 on 3-1 level 4 for extra 1 cost copies. Then slow roll on 5 until you have 5 3 stars for solar bonus.', ja: 'Roll to 30 on 3-1 level 4 for extra 1 cost copies. Then slow roll on 5 until you have 5 3 stars for solar bonus.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Make sure you keep your econ high because you need to be level 7 to fit solar on this board. Try to be Level to 7 somewhere on stage 4.', en: 'Make sure you keep your econ high because you need to be level 7 to fit solar on this board. Try to be Level to 7 somewhere on stage 4.', ja: 'Make sure you keep your econ high because you need to be level 7 to fit solar on this board. Try to be Level to 7 somewhere on stage 4.' } }
    ],
    tips: [
      { ar: 'Look to play with lots of early copies of 1 cost + good reroll augment.', en: 'Look to play with lots of early copies of 1 cost + good reroll augment.', ja: 'Look to play with lots of early copies of 1 cost + good reroll augment.' },
      { ar: 'Roll to 30 on 3-1 level 4 for extra 1 cost copies. Then slow roll on 5 until you have 5 3 stars for solar bonus.', en: 'Roll to 30 on 3-1 level 4 for extra 1 cost copies. Then slow roll on 5 until you have 5 3 stars for solar bonus.', ja: 'Roll to 30 on 3-1 level 4 for extra 1 cost copies. Then slow roll on 5 until you have 5 3 stars for solar bonus.' },
      { ar: 'Make sure you keep your econ high because you need to be level 7 to fit solar on this board. Try to be Level to 7 somewhere on stage 4.', en: 'Make sure you keep your econ high because you need to be level 7 to fit solar on this board. Try to be Level to 7 somewhere on stage 4.', ja: 'Make sure you keep your econ high because you need to be level 7 to fit solar on this board. Try to be Level to 7 somewhere on stage 4.' }
    ],
    alternatives: [],
  },
  {
    slug: 'veigar-consuming-flora-copy',
    name: { ar: 'إلدروود فيغار', en: 'Elderwood Veigar', ja: 'Elderwood Veigar' },
    subtitle: { ar: 'إلدروود فيغار إعادة لفّ', en: 'Elderwood Veigar Reroll', ja: 'Elderwood Veigar Reroll' },
    tier: 'B',
    difficulty: 1,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Only play around this opener with early upgrades so Veigar can snowball and gain stacks. Prioritize Veigar items. If you are close to Veigar and Ornn 3 (7+ copies), consider rolling until you hit 3*. ', en: 'Only play around this opener with early upgrades so Veigar can snowball and gain stacks. Prioritize Veigar items. If you are close to Veigar and Ornn 3 (7+ copies), consider rolling until you hit 3*. ', ja: 'Only play around this opener with early upgrades so Veigar can snowball and gain stacks. Prioritize Veigar items. If you are close to Veigar and Ornn 3 (7+ copies), consider rolling until you hit 3*. ' },
    units: [
      { champion: 'DA_18_RekSai', items: [], star: 3, row: 2, col: 2 },
      { champion: 'DA_18_Ornn', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_Crownguard', 'TFT_Item_GargoyleStoneplate'], star: 3, row: 0, col: 3 },
      { champion: 'DA_18_Veigar', items: ['TFT_Item_JeweledGauntlet', 'TFT_Item_BlueBuff', 'TFT_Item_HextechGunblade'], star: 3, row: 3, col: 0 },
      { champion: 'DA_18_Alistar', items: [], star: 3, row: 2, col: 5 },
      { champion: 'DA_18_LeBlanc', items: ['TFT_Item_StatikkShiv', 'TFT_Item_Morellonomicon'], star: 3, row: 3, col: 2 },
      { champion: 'DA_18_Cassiopeia', items: [], star: 1, row: 3, col: 4 },
      { champion: 'DA_Fiddlesticks18', items: [], star: 1, row: 2, col: 4 }
    ],
    earlyUnits: [
      'DA_18_Kobuko',
      'DA_18_RekSai',
      'DA_18_Veigar',
      'DA_18_Teemo',
    ],
    augments: [
      { id: 'DA_LivingForge', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_PortableForge', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Only play around this opener with early upgrades so Veigar can snowball and gain stacks. Prioritize Veigar items.', en: 'Only play around this opener with early upgrades so Veigar can snowball and gain stacks. Prioritize Veigar items.', ja: 'Only play around this opener with early upgrades so Veigar can snowball and gain stacks. Prioritize Veigar items.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'If you are close to Veigar and Ornn 3 (7+ copies), consider rolling until you hit 3*. If far (3-4 copies), slow roll above 50g for 3*.', en: 'If you are close to Veigar and Ornn 3 (7+ copies), consider rolling until you hit 3*. If far (3-4 copies), slow roll above 50g for 3*.', ja: 'If you are close to Veigar and Ornn 3 (7+ copies), consider rolling until you hit 3*. If far (3-4 copies), slow roll above 50g for 3*.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Once you finish Ornn 3 and Veigar 3, you can slowroll on 6 for Leblanc + Alistar 3, if you are too far push levels.. ', en: 'Once you finish Ornn 3 and Veigar 3, you can slowroll on 6 for Leblanc + Alistar 3, if you are too far push levels.. ', ja: 'Once you finish Ornn 3 and Veigar 3, you can slowroll on 6 for Leblanc + Alistar 3, if you are too far push levels.. ' } }
    ],
    tips: [
      { ar: 'Only play around this opener with early upgrades so Veigar can snowball and gain stacks. Prioritize Veigar items.', en: 'Only play around this opener with early upgrades so Veigar can snowball and gain stacks. Prioritize Veigar items.', ja: 'Only play around this opener with early upgrades so Veigar can snowball and gain stacks. Prioritize Veigar items.' },
      { ar: 'If you are close to Veigar and Ornn 3 (7+ copies), consider rolling until you hit 3*. If far (3-4 copies), slow roll above 50g for 3*.', en: 'If you are close to Veigar and Ornn 3 (7+ copies), consider rolling until you hit 3*. If far (3-4 copies), slow roll above 50g for 3*.', ja: 'If you are close to Veigar and Ornn 3 (7+ copies), consider rolling until you hit 3*. If far (3-4 copies), slow roll above 50g for 3*.' },
      { ar: 'Once you finish Ornn 3 and Veigar 3, you can slowroll on 6 for Leblanc + Alistar 3, if you are too far push levels.. ', en: 'Once you finish Ornn 3 and Veigar 3, you can slowroll on 6 for Leblanc + Alistar 3, if you are too far push levels.. ', ja: 'Once you finish Ornn 3 and Veigar 3, you can slowroll on 6 for Leblanc + Alistar 3, if you are too far push levels.. ' }
    ],
    alternatives: [],
  },
  {
    slug: 'mamawood',
    name: { ar: 'ماماوود', en: 'Mamawood', ja: 'Mamawood' },
    subtitle: { ar: 'إلدروود ماما بيك إعادة لفّ', en: 'Elderwood Mama Beak Reroll', ja: 'Elderwood Mama Beak Reroll' },
    tier: 'B',
    difficulty: 2,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Play strongest board around upgraded Rapidfire and Elderwood. Can also play Inferno to get upgraded shop slots. Focus on econ and finishing your items. If rich, you can level at 3-5 and roll for upgra', en: 'Play strongest board around upgraded Rapidfire and Elderwood. Can also play Inferno to get upgraded shop slots. Focus on econ and finishing your items. If rich, you can level at 3-5 and roll for upgra', ja: 'Play strongest board around upgraded Rapidfire and Elderwood. Can also play Inferno to get upgraded shop slots. Focus on econ and finishing your items. If rich, you can level at 3-5 and roll for upgra' },
    units: [
      { champion: 'DA_18_Xayah', items: [], star: 1, row: 3, col: 1 },
      { champion: 'DA_18_Alistar', items: [], star: 1, row: 0, col: 5 },
      { champion: 'DA_Krug18', items: ['TFT_Item_RedBuff', 'TFT_Item_SpectralGauntlet'], star: 3, row: 0, col: 3 },
      { champion: 'DA_18_Hecarim', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_GargoyleStoneplate', 'TFT_Item_FrozenHeart'], star: 3, row: 0, col: 2 },
      { champion: 'DA_CrimsonRaptor18', items: ['TFT_Item_GuinsoosRageblade', 'TFT_Item_HextechGunblade', 'TFT_Item_TitansResolve'], star: 3, row: 3, col: 0 },
      { champion: 'DA_Sentinel18', items: [], star: 1, row: 0, col: 4 },
      { champion: 'DA_18_Zyra', items: [], star: 1, row: 3, col: 6 }
    ],
    earlyUnits: [
      'DA_18_Ornn',
      'DA_18_Varus',
      'DA_18_Xayah',
      'DA_18_Shen',
    ],
    augments: [
      { id: 'DA_SpeedyDoubleKill', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Play strongest board around upgraded Rapidfire and Elderwood. Can also play Inferno to get upgraded shop slots.', en: 'Play strongest board around upgraded Rapidfire and Elderwood. Can also play Inferno to get upgraded shop slots.', ja: 'Play strongest board around upgraded Rapidfire and Elderwood. Can also play Inferno to get upgraded shop slots.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Focus on econ and finishing your items. If rich, you can level at 3-5 and roll for upgrades for the rest of the stage. Otherwise, go to 7 at 4-1. ', en: 'Focus on econ and finishing your items. If rich, you can level at 3-5 and roll for upgrades for the rest of the stage. Otherwise, go to 7 at 4-1. ', ja: 'Focus on econ and finishing your items. If rich, you can level at 3-5 and roll for upgrades for the rest of the stage. Otherwise, go to 7 at 4-1. ' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Roll until you upgrade Mama Beak 2 and your main tank. Then econ up and slow roll for 3*. Add 3 summoner or 5 cost on 8.', en: 'Roll until you upgrade Mama Beak 2 and your main tank. Then econ up and slow roll for 3*. Add 3 summoner or 5 cost on 8.', ja: 'Roll until you upgrade Mama Beak 2 and your main tank. Then econ up and slow roll for 3*. Add 3 summoner or 5 cost on 8.' } }
    ],
    tips: [
      { ar: 'Play strongest board around upgraded Rapidfire and Elderwood. Can also play Inferno to get upgraded shop slots.', en: 'Play strongest board around upgraded Rapidfire and Elderwood. Can also play Inferno to get upgraded shop slots.', ja: 'Play strongest board around upgraded Rapidfire and Elderwood. Can also play Inferno to get upgraded shop slots.' },
      { ar: 'Focus on econ and finishing your items. If rich, you can level at 3-5 and roll for upgrades for the rest of the stage. Otherwise, go to 7 at 4-1. ', en: 'Focus on econ and finishing your items. If rich, you can level at 3-5 and roll for upgrades for the rest of the stage. Otherwise, go to 7 at 4-1. ', ja: 'Focus on econ and finishing your items. If rich, you can level at 3-5 and roll for upgrades for the rest of the stage. Otherwise, go to 7 at 4-1. ' },
      { ar: 'Roll until you upgrade Mama Beak 2 and your main tank. Then econ up and slow roll for 3*. Add 3 summoner or 5 cost on 8.', en: 'Roll until you upgrade Mama Beak 2 and your main tank. Then econ up and slow roll for 3*. Add 3 summoner or 5 cost on 8.', ja: 'Roll until you upgrade Mama Beak 2 and your main tank. Then econ up and slow roll for 3*. Add 3 summoner or 5 cost on 8.' }
    ],
    alternatives: [],
  },
  {
    slug: 'sprykin-trist',
    name: { ar: 'عفريت تريستانا', en: 'Fae Tristana', ja: 'Fae Tristana' },
    subtitle: { ar: 'عفريت تريستانا إعادة لفّ', en: 'Fae Tristana Reroll', ja: 'Fae Tristana Reroll' },
    tier: 'B',
    difficulty: 2,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Play for win streak with upgraded Rageblade holder. Start stacking Fae since getting to 7 ASAP is crucial for success. Itemize and play Tristana as soon as you find her. Sprykin is more important than', en: 'Play for win streak with upgraded Rageblade holder. Start stacking Fae since getting to 7 ASAP is crucial for success. Itemize and play Tristana as soon as you find her. Sprykin is more important than', ja: 'Play for win streak with upgraded Rageblade holder. Start stacking Fae since getting to 7 ASAP is crucial for success. Itemize and play Tristana as soon as you find her. Sprykin is more important than' },
    units: [
      { champion: 'DA_18_Kobuko', items: [], star: 1, row: 2, col: 1 },
      { champion: 'DA_18_Rakan', items: [], star: 1, row: 2, col: 3 },
      { champion: 'DA_Vi18', items: [], star: 3, row: 1, col: 3 },
      { champion: 'DA_18_Rammus', items: ['TFT_Item_GargoyleStoneplate', 'TFT_Item_Redemption', 'TFT_Item_WarmogsArmor'], star: 3, row: 0, col: 4 },
      { champion: 'DA_18_Tristana', items: ['TFT_Item_GuinsoosRageblade', 'TFT_Item_HextechGunblade', 'TFT_Item_MadredsBloodrazor'], star: 3, row: 3, col: 6 },
      { champion: 'DA_18_Lillia', items: [], star: 1, row: 2, col: 2 },
      { champion: 'DA_18_Sivir', items: ['TFT_Item_LastWhisper', 'TFT_Item_RapidFireCannon'], star: 1, row: 3, col: 5 }
    ],
    earlyUnits: [
      'DA_18_Rakan',
      'DA_18_Varus',
      'DA_18_Xayah',
      'DA_18_Hecarim',
    ],
    augments: [
      { id: 'DA_SpreadingRootsPlus', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Play for win streak with upgraded Rageblade holder. Start stacking Fae since getting to 7 ASAP is crucial for success.', en: 'Play for win streak with upgraded Rageblade holder. Start stacking Fae since getting to 7 ASAP is crucial for success.', ja: 'Play for win streak with upgraded Rageblade holder. Start stacking Fae since getting to 7 ASAP is crucial for success.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Itemize and play Tristana as soon as you find her. Sprykin is more important than Hunter. If you spike very early Primal from ahead, you can consider items.', en: 'Itemize and play Tristana as soon as you find her. Sprykin is more important than Hunter. If you spike very early Primal from ahead, you can consider items.', ja: 'Itemize and play Tristana as soon as you find her. Sprykin is more important than Hunter. If you spike very early Primal from ahead, you can consider items.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level to 7 and roll above 50g for 3* Tristana and Rammus. Use your 4 Fae cash outs to push levels. Give Sivir leftover AD items.', en: 'Level to 7 and roll above 50g for 3* Tristana and Rammus. Use your 4 Fae cash outs to push levels. Give Sivir leftover AD items.', ja: 'Level to 7 and roll above 50g for 3* Tristana and Rammus. Use your 4 Fae cash outs to push levels. Give Sivir leftover AD items.' } }
    ],
    tips: [
      { ar: 'Play for win streak with upgraded Rageblade holder. Start stacking Fae since getting to 7 ASAP is crucial for success.', en: 'Play for win streak with upgraded Rageblade holder. Start stacking Fae since getting to 7 ASAP is crucial for success.', ja: 'Play for win streak with upgraded Rageblade holder. Start stacking Fae since getting to 7 ASAP is crucial for success.' },
      { ar: 'Itemize and play Tristana as soon as you find her. Sprykin is more important than Hunter. If you spike very early Primal from ahead, you can consider items.', en: 'Itemize and play Tristana as soon as you find her. Sprykin is more important than Hunter. If you spike very early Primal from ahead, you can consider items.', ja: 'Itemize and play Tristana as soon as you find her. Sprykin is more important than Hunter. If you spike very early Primal from ahead, you can consider items.' },
      { ar: 'Level to 7 and roll above 50g for 3* Tristana and Rammus. Use your 4 Fae cash outs to push levels. Give Sivir leftover AD items.', en: 'Level to 7 and roll above 50g for 3* Tristana and Rammus. Use your 4 Fae cash outs to push levels. Give Sivir leftover AD items.', ja: 'Level to 7 and roll above 50g for 3* Tristana and Rammus. Use your 4 Fae cash outs to push levels. Give Sivir leftover AD items.' }
    ],
    alternatives: [],
  },
  {
    slug: 'eclipse-kayle',
    name: { ar: 'كسوف كايل', en: 'Eclipse Kayle', ja: 'Eclipse Kayle' },
    subtitle: { ar: 'كسوف كايل إعادة لفّ', en: 'Eclipse Kayle Reroll', ja: 'Eclipse Kayle Reroll' },
    tier: 'B',
    difficulty: 1,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Ideally open with Kayle and upgraded frontline. After Rageblade, prioritize tank items. Econ up as much as possible. Don\'t spend gold on leveling. Bench priority: Kayle 3 > Sejuani 3 > Leona 3 > Shen ', en: 'Ideally open with Kayle and upgraded frontline. After Rageblade, prioritize tank items. Econ up as much as possible. Don\'t spend gold on leveling. Bench priority: Kayle 3 > Sejuani 3 > Leona 3 > Shen ', ja: 'Ideally open with Kayle and upgraded frontline. After Rageblade, prioritize tank items. Econ up as much as possible. Don\'t spend gold on leveling. Bench priority: Kayle 3 > Sejuani 3 > Leona 3 > Shen ' },
    units: [
      { champion: 'DA_18_Leona', items: [], star: 3, row: 2, col: 4 },
      { champion: 'DA_18_Varus', items: [], star: 3, row: 3, col: 0 },
      { champion: 'DA_18_Shen', items: [], star: 3, row: 2, col: 3 },
      { champion: 'DA_18_Kayle', items: ['TFT_Item_GuinsoosRageblade', 'TFT_Item_RabadonsDeathcap', 'TFT_Item_RapidFireCannon'], star: 3, row: 3, col: 6 },
      { champion: 'DA_18_Sejuani', items: ['TFT_Item_GargoyleStoneplate', 'TFT_Item_Redemption', 'TFT_Item_WarmogsArmor'], star: 3, row: 0, col: 4 },
      { champion: 'DA_18_Diana', items: [], star: 1, row: 1, col: 3 },
      { champion: 'DA_Amumu18', items: [], star: 1, row: 1, col: 2 },
      { champion: 'DA_18_Aphelios', items: ['TFT_Item_LastWhisper'], star: 1, row: 3, col: 5 }
    ],
    earlyUnits: [
      'DA_18_Leona',
      'DA_18_Varus',
      'DA_18_Shen',
      'DA_18_Kayle',
    ],
    augments: [
      { id: 'DA_18_SolarTraitAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Ideally open with Kayle and upgraded frontline. After Rageblade, prioritize tank items. Econ up as much as possible. Don\'t spend gold on leveling.', en: 'Ideally open with Kayle and upgraded frontline. After Rageblade, prioritize tank items. Econ up as much as possible. Don\'t spend gold on leveling.', ja: 'Ideally open with Kayle and upgraded frontline. After Rageblade, prioritize tank items. Econ up as much as possible. Don\'t spend gold on leveling.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Bench priority: Kayle 3 > Sejuani 3 > Leona 3 > Shen 3 / Varus 3. Once you finish Kayle 3, begin pushing levels for Lunar units.', en: 'Bench priority: Kayle 3 > Sejuani 3 > Leona 3 > Shen 3 / Varus 3. Once you finish Kayle 3, begin pushing levels for Lunar units.', ja: 'Bench priority: Kayle 3 > Sejuani 3 > Leona 3 > Shen 3 / Varus 3. Once you finish Kayle 3, begin pushing levels for Lunar units.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Finish your 3* and level for Lunar units to get Eclipse in. Lunar Lux or Solar Lux are both good.', en: 'Finish your 3* and level for Lunar units to get Eclipse in. Lunar Lux or Solar Lux are both good.', ja: 'Finish your 3* and level for Lunar units to get Eclipse in. Lunar Lux or Solar Lux are both good.' } }
    ],
    tips: [
      { ar: 'Ideally open with Kayle and upgraded frontline. After Rageblade, prioritize tank items. Econ up as much as possible. Don\'t spend gold on leveling.', en: 'Ideally open with Kayle and upgraded frontline. After Rageblade, prioritize tank items. Econ up as much as possible. Don\'t spend gold on leveling.', ja: 'Ideally open with Kayle and upgraded frontline. After Rageblade, prioritize tank items. Econ up as much as possible. Don\'t spend gold on leveling.' },
      { ar: 'Bench priority: Kayle 3 > Sejuani 3 > Leona 3 > Shen 3 / Varus 3. Once you finish Kayle 3, begin pushing levels for Lunar units.', en: 'Bench priority: Kayle 3 > Sejuani 3 > Leona 3 > Shen 3 / Varus 3. Once you finish Kayle 3, begin pushing levels for Lunar units.', ja: 'Bench priority: Kayle 3 > Sejuani 3 > Leona 3 > Shen 3 / Varus 3. Once you finish Kayle 3, begin pushing levels for Lunar units.' },
      { ar: 'Finish your 3* and level for Lunar units to get Eclipse in. Lunar Lux or Solar Lux are both good.', en: 'Finish your 3* and level for Lunar units to get Eclipse in. Lunar Lux or Solar Lux are both good.', ja: 'Finish your 3* and level for Lunar units to get Eclipse in. Lunar Lux or Solar Lux are both good.' }
    ],
    alternatives: [],
  },
  {
    slug: '10-riftbeast',
    name: { ar: 'وحش الريفت', en: '10 Riftbeast', ja: '10 Riftbeast' },
    subtitle: { ar: 'وحش الريفت Elder تنين', en: 'Riftbeast Elder Dragon', ja: 'Riftbeast Elder Dragon' },
    tier: 'B',
    difficulty: 2,
    playstyle: { ar: 'فاست 9', en: 'Fast 9', ja: 'Fast 9' },
    level: { ar: 'مستوى 9', en: 'Level 9', ja: 'レベル9' },
    summary: { ar: 'Slam items aggressively and play for full win streak with Riftbeast items. Ideal opener will be Riftbeasts featuring Cinderling / Gromp / Mama Beak carry. Continue prioritize win streaking. If you hav', en: 'Slam items aggressively and play for full win streak with Riftbeast items. Ideal opener will be Riftbeasts featuring Cinderling / Gromp / Mama Beak carry. Continue prioritize win streaking. If you hav', ja: 'Slam items aggressively and play for full win streak with Riftbeast items. Ideal opener will be Riftbeasts featuring Cinderling / Gromp / Mama Beak carry. Continue prioritize win streaking. If you hav' },
    units: [
      { champion: 'DA_18_Sentry', items: [], star: 1, row: 3, col: 2 },
      { champion: 'DA_Gromp18_AP', items: [], star: 1, row: 3, col: 0 },
      { champion: 'DA_Murkwolf18', items: [], star: 1, row: 3, col: 6 },
      { champion: 'DA_Scuttlecrab18', items: [], star: 1, row: 0, col: 1 },
      { champion: 'DA_Krug18', items: [], star: 1, row: 0, col: 0 },
      { champion: 'DA_CrimsonRaptor18', items: [], star: 1, row: 3, col: 4 },
      { champion: 'DA_Brambleback18', items: ['TFT_Item_GuardianAngel', 'TFT_Item_Quicksilver', 'TFT_Item_MadredsBloodrazor'], star: 1, row: 0, col: 2 },
      { champion: 'DA_Sentinel18', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_FrozenHeart', 'TFT_Item_Crownguard'], star: 1, row: 0, col: 3 },
      { champion: 'DA_Taric18', items: [], star: 1, row: 0, col: 4 },
      { champion: 'DA_18_GnarSmall', items: ['TFT_Item_ThiefsGloves'], star: 1, row: 2, col: 2 },
      { champion: 'DA_18_ElderDragon', items: ['TFT_Item_InfinityEdge', 'TFT_Item_Deathblade'], star: 1, row: 2, col: 3 }
    ],
    earlyUnits: [
      'DA_18_Sentry',
      'DA_18_Yorick',
      'DA_Cinderling18',
      'DA_Scuttlecrab18',
    ],
    augments: [
      { id: 'DA_18_RiftbeastTraitAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_LevelUp', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_Swordsmith', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Slam items aggressively and play for full win streak with Riftbeast items. Ideal opener will be Riftbeasts featuring Cinderling / Gromp / Mama Beak carry.', en: 'Slam items aggressively and play for full win streak with Riftbeast items. Ideal opener will be Riftbeasts featuring Cinderling / Gromp / Mama Beak carry.', ja: 'Slam items aggressively and play for full win streak with Riftbeast items. Ideal opener will be Riftbeasts featuring Cinderling / Gromp / Mama Beak carry.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.', en: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.', ja: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'You can start losing rounds while focusing on econ. Fast 9 by the beginning of Stage 5 and look for your 5 costs. You want around 70g+ minimum for the rolldown.', en: 'You can start losing rounds while focusing on econ. Fast 9 by the beginning of Stage 5 and look for your 5 costs. You want around 70g+ minimum for the rolldown.', ja: 'You can start losing rounds while focusing on econ. Fast 9 by the beginning of Stage 5 and look for your 5 costs. You want around 70g+ minimum for the rolldown.' } }
    ],
    tips: [
      { ar: 'Slam items aggressively and play for full win streak with Riftbeast items. Ideal opener will be Riftbeasts featuring Cinderling / Gromp / Mama Beak carry.', en: 'Slam items aggressively and play for full win streak with Riftbeast items. Ideal opener will be Riftbeasts featuring Cinderling / Gromp / Mama Beak carry.', ja: 'Slam items aggressively and play for full win streak with Riftbeast items. Ideal opener will be Riftbeasts featuring Cinderling / Gromp / Mama Beak carry.' },
      { ar: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.', en: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.', ja: 'Continue prioritize win streaking. If you have an econ augment, you can go Fast 7 (before 3-3) to maintain win streak if needed.' },
      { ar: 'You can start losing rounds while focusing on econ. Fast 9 by the beginning of Stage 5 and look for your 5 costs. You want around 70g+ minimum for the rolldown.', en: 'You can start losing rounds while focusing on econ. Fast 9 by the beginning of Stage 5 and look for your 5 costs. You want around 70g+ minimum for the rolldown.', ja: 'You can start losing rounds while focusing on econ. Fast 9 by the beginning of Stage 5 and look for your 5 costs. You want around 70g+ minimum for the rolldown.' }
    ],
    alternatives: [],
  },
  {
    slug: 'aphelios-rapidfire',
    name: { ar: 'أفيليوس نيران سريعة', en: 'Aphelios Rapidfire', ja: 'Aphelios Rapidfire' },
    subtitle: { ar: 'نيران سريعة أفيليوس', en: 'Rapidfire Aphelios', ja: 'Rapidfire Aphelios' },
    tier: 'B',
    difficulty: 2,
    playstyle: { ar: 'فاست 8', en: 'Fast 8', ja: 'Fast 8' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Open with a strong win streak AD tempo around Rapidfires. All ad items are good slams besides rageblade. Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a stro', en: 'Open with a strong win streak AD tempo around Rapidfires. All ad items are good slams besides rageblade. Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a stro', ja: 'Open with a strong win streak AD tempo around Rapidfires. All ad items are good slams besides rageblade. Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a stro' },
    units: [
      { champion: 'DA_18_Rakan', items: [], star: 1, row: 1, col: 3 },
      { champion: 'DA_18_Varus', items: [], star: 1, row: 3, col: 6 },
      { champion: 'DA_18_Xayah', items: [], star: 1, row: 3, col: 2 },
      { champion: 'DA_CrimsonRaptor18', items: ['TFT_Item_LastWhisper'], star: 1, row: 3, col: 1 },
      { champion: 'DA_Sentinel18', items: ['TFT_Item_FrozenHeart'], star: 1, row: 1, col: 2 },
      { champion: 'DA_Amumu18', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_GargoyleStoneplate', 'TFT_Item_BrambleVest'], star: 1, row: 0, col: 3 },
      { champion: 'DA_18_Aphelios', items: ['TFT_Item_InfinityEdge', 'TFT_Item_RunaansHurricane'], star: 1, row: 3, col: 0 },
      { champion: 'DA_Brambleback18', items: ['TFT_Item_GuardianAngel', 'TFT_Item_Quicksilver'], star: 1, row: 2, col: 0 }
    ],
    earlyUnits: [
      'DA_18_Ornn',
      'DA_18_Xayah',
      'DA_18_Varus',
      'DA_18_Shen',
    ],
    augments: [
      { id: 'DA_Swordsmith', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Open with a strong win streak AD tempo around Rapidfires. All ad items are good slams besides rageblade.', en: 'Open with a strong win streak AD tempo around Rapidfires. All ad items are good slams besides rageblade.', ja: 'Open with a strong win streak AD tempo around Rapidfires. All ad items are good slams besides rageblade.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.', en: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.', ja: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level to 8 and roll heavily for Aphelios and the 4 costs. Only push for 9 once you have almost all your 4 costs upgraded. ', en: 'Level to 8 and roll heavily for Aphelios and the 4 costs. Only push for 9 once you have almost all your 4 costs upgraded. ', ja: 'Level to 8 and roll heavily for Aphelios and the 4 costs. Only push for 9 once you have almost all your 4 costs upgraded. ' } }
    ],
    tips: [
      { ar: 'Open with a strong win streak AD tempo around Rapidfires. All ad items are good slams besides rageblade.', en: 'Open with a strong win streak AD tempo around Rapidfires. All ad items are good slams besides rageblade.', ja: 'Open with a strong win streak AD tempo around Rapidfires. All ad items are good slams besides rageblade.' },
      { ar: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.', en: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.', ja: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.' },
      { ar: 'Level to 8 and roll heavily for Aphelios and the 4 costs. Only push for 9 once you have almost all your 4 costs upgraded. ', en: 'Level to 8 and roll heavily for Aphelios and the 4 costs. Only push for 9 once you have almost all your 4 costs upgraded. ', ja: 'Level to 8 and roll heavily for Aphelios and the 4 costs. Only push for 9 once you have almost all your 4 costs upgraded. ' }
    ],
    alternatives: [],
  },
  {
    slug: 'azir-reroll',
    name: { ar: 'أزير إعادة لفّ', en: 'Azir Reroll', ja: 'Azir Reroll' },
    subtitle: { ar: 'أزير إعادة لفّ', en: 'Azir Reroll', ja: 'Azir Reroll' },
    tier: 'B',
    difficulty: 2,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Try to angle this comp with early Azir ideally with blossom opener for better charms. If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. ', en: 'Try to angle this comp with early Azir ideally with blossom opener for better charms. If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. ', ja: 'Try to angle this comp with early Azir ideally with blossom opener for better charms. If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. ' },
    units: [
      { champion: 'DA_18_RekSai', items: [], star: 1, row: 2, col: 5 },
      { champion: 'DA_18_Yorick', items: [], star: 1, row: 2, col: 4 },
      { champion: 'DA_18_Yunara', items: ['TFT_Item_StatikkShiv'], star: 1, row: 3, col: 1 },
      { champion: 'DA_18_KhaZix', items: [], star: 3, row: 2, col: 3 },
      { champion: 'DA_18_Azir', items: ['TFT_Item_HextechGunblade', 'TFT_Item_JeweledGauntlet', 'TFT_Item_RabadonsDeathcap'], star: 3, row: 3, col: 0 },
      { champion: 'DA_Vi18', items: ['TFT_Item_GargoyleStoneplate', 'TFT_Item_WarmogsArmor'], star: 3, row: 0, col: 3 },
      { champion: 'DA_18_Sett', items: [], star: 1, row: 2, col: 2 }
    ],
    earlyUnits: [
      'DA_Karma18',
      'DA_18_Yorick',
      'DA_18_Yunara',
      'DA_18_Azir',
    ],
    augments: [
      { id: 'DA_Swordsmith', tier: 'gold', why: { ar: 'اختيار مرن', en: 'Flexible pick', ja: '柔軟な選択' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Try to angle this comp with early Azir ideally with blossom opener for better charms.', en: 'Try to angle this comp with early Azir ideally with blossom opener for better charms.', ja: 'Try to angle this comp with early Azir ideally with blossom opener for better charms.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.', en: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.', ja: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Make sure you have 2* Azir, Kha and Vi on 4-1, then slowroll above 50 for 3 stars. Make sure Kha has 8 takedowns before feeding to blackthorn, 3 executioner is very important.', en: 'Make sure you have 2* Azir, Kha and Vi on 4-1, then slowroll above 50 for 3 stars. Make sure Kha has 8 takedowns before feeding to blackthorn, 3 executioner is very important.', ja: 'Make sure you have 2* Azir, Kha and Vi on 4-1, then slowroll above 50 for 3 stars. Make sure Kha has 8 takedowns before feeding to blackthorn, 3 executioner is very important.' } }
    ],
    tips: [
      { ar: 'Try to angle this comp with early Azir ideally with blossom opener for better charms.', en: 'Try to angle this comp with early Azir ideally with blossom opener for better charms.', ja: 'Try to angle this comp with early Azir ideally with blossom opener for better charms.' },
      { ar: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.', en: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.', ja: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.' },
      { ar: 'Make sure you have 2* Azir, Kha and Vi on 4-1, then slowroll above 50 for 3 stars. Make sure Kha has 8 takedowns before feeding to blackthorn, 3 executioner is very important.', en: 'Make sure you have 2* Azir, Kha and Vi on 4-1, then slowroll above 50 for 3 stars. Make sure Kha has 8 takedowns before feeding to blackthorn, 3 executioner is very important.', ja: 'Make sure you have 2* Azir, Kha and Vi on 4-1, then slowroll above 50 for 3 stars. Make sure Kha has 8 takedowns before feeding to blackthorn, 3 executioner is very important.' }
    ],
    alternatives: [],
  },
  {
    slug: 'blackthorn-malphite',
    name: { ar: 'الشوكة السوداء مالفأيت', en: 'Blackthorn Malphite', ja: 'Blackthorn Malphite' },
    subtitle: { ar: 'الشوكة السوداء مالفأيت', en: 'Blackthorn Malphite', ja: 'Blackthorn Malphite' },
    tier: 'B',
    difficulty: 2,
    playstyle: { ar: 'فاست 8', en: 'Fast 8', ja: 'Fast 8' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Malphite items for a win streak. Add in useful 3 costs like Fiddlesticks, Cassio, Azir then flex around their traits.', en: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Malphite items for a win streak. Add in useful 3 costs like Fiddlesticks, Cassio, Azir then flex around their traits.', ja: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Malphite items for a win streak. Add in useful 3 costs like Fiddlesticks, Cassio, Azir then flex around their traits.' },
    units: [
      { champion: 'DA_Lux18_Base', items: [], star: 1, row: 3, col: 6 },
      { champion: 'DA_18_Soraka', items: [], star: 1, row: 2, col: 3 },
      { champion: 'DA_Amumu18', items: [], star: 1, row: 2, col: 2 },
      { champion: 'DA_18_Malphite', items: ['TFT_Item_GargoyleStoneplate', 'TFT_Item_WarmogsArmor', 'TFT_Item_Crownguard'], star: 1, row: 0, col: 3 },
      { champion: 'DA_18_Azir', items: ['TFT_Item_GuinsoosRageblade', 'TFT_Item_ArchangelsStaff', 'TFT_Item_HextechGunblade'], star: 1, row: 3, col: 0 },
      { champion: 'DA_18_Veigar', items: [], star: 1, row: 3, col: 4 },
      { champion: 'DA_18_Zyra', items: ['TFT_Item_StatikkShiv', 'TFT_Item_SpearOfShojin'], star: 1, row: 3, col: 2 },
      { champion: 'DA_18_Yorick', items: [], star: 1, row: 2, col: 5 },
      { champion: 'DA_18_Kennen', items: [], star: 1, row: 2, col: 4 }
    ],
    earlyUnits: [
      'DA_18_Rakan',
      'DA_18_Yorick',
      'DA_Karma18',
      'DA_18_Yunara',
    ],
    augments: [
      { id: 'DA_BlackthornTraitAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_CyberneticUplink_Gold', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Malphite items for a win streak.', en: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Malphite items for a win streak.', ja: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Malphite items for a win streak.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Add in useful 3 costs like Fiddlesticks, Cassio, Azir then flex around their traits. General rule: put items on upgraded units.', en: 'Add in useful 3 costs like Fiddlesticks, Cassio, Azir then flex around their traits. General rule: put items on upgraded units.', ja: 'Add in useful 3 costs like Fiddlesticks, Cassio, Azir then flex around their traits. General rule: put items on upgraded units.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level and roll for Malphite. You will often have to itemize and work with whoever you hit so be flexible. Once stable on Azir 2, Zyra, and Malphite, push to 9.', en: 'Level and roll for Malphite. You will often have to itemize and work with whoever you hit so be flexible. Once stable on Azir 2, Zyra, and Malphite, push to 9.', ja: 'Level and roll for Malphite. You will often have to itemize and work with whoever you hit so be flexible. Once stable on Azir 2, Zyra, and Malphite, push to 9.' } }
    ],
    tips: [
      { ar: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Malphite items for a win streak.', en: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Malphite items for a win streak.', ja: 'Open with a strong AP opener, preferably around Blossom. Slam generic AP items and Malphite items for a win streak.' },
      { ar: 'Add in useful 3 costs like Fiddlesticks, Cassio, Azir then flex around their traits. General rule: put items on upgraded units.', en: 'Add in useful 3 costs like Fiddlesticks, Cassio, Azir then flex around their traits. General rule: put items on upgraded units.', ja: 'Add in useful 3 costs like Fiddlesticks, Cassio, Azir then flex around their traits. General rule: put items on upgraded units.' },
      { ar: 'Level and roll for Malphite. You will often have to itemize and work with whoever you hit so be flexible. Once stable on Azir 2, Zyra, and Malphite, push to 9.', en: 'Level and roll for Malphite. You will often have to itemize and work with whoever you hit so be flexible. Once stable on Azir 2, Zyra, and Malphite, push to 9.', ja: 'Level and roll for Malphite. You will often have to itemize and work with whoever you hit so be flexible. Once stable on Azir 2, Zyra, and Malphite, push to 9.' }
    ],
    alternatives: [],
  },
  {
    slug: 'fae-ezreal',
    name: { ar: 'عفريت إزريال', en: 'Fae Ezreal', ja: 'Fae Ezreal' },
    subtitle: { ar: 'عفريت إزريال', en: 'Fae Ezreal', ja: 'Fae Ezreal' },
    tier: 'B',
    difficulty: 2,
    playstyle: { ar: 'فاست 8', en: 'Fast 8', ja: 'Fast 8' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units. Don\'t play 4 fae in the midgame until you have at leas', en: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units. Don\'t play 4 fae in the midgame until you have at leas', ja: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units. Don\'t play 4 fae in the midgame until you have at leas' },
    units: [
      { champion: 'DA_18_Ezreal', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_Deathblade'], star: 1, row: 3, col: 6 },
      { champion: 'DA_18_Xayah', items: [], star: 1, row: 3, col: 0 },
      { champion: 'DA_18_Soraka', items: [], star: 1, row: 3, col: 5 },
      { champion: 'DA_18_Hecarim', items: [], star: 1, row: 0, col: 3 },
      { champion: 'DA_Amumu18', items: ['TFT_Item_SpectralGauntlet'], star: 1, row: 0, col: 4 },
      { champion: 'DA_18_Rakan', items: [], star: 1, row: 0, col: 1 },
      { champion: 'DA_Fiddlesticks18', items: [], star: 1, row: 0, col: 2 },
      { champion: 'DA_18_Lillia', items: ['TFT_Item_FrozenHeart', 'TFT_Item_Crownguard'], star: 1, row: 0, col: 6 },
      { champion: 'DA_18_Kennen', items: [], star: 1, row: 1, col: 3 }
    ],
    earlyUnits: [
      'DA_18_Xayah',
      'DA_18_LeBlanc',
      'DA_18_Hecarim',
      'DA_18_Rakan',
    ],
    augments: [
      { id: 'DA_18_ElderwoodTraitAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_Swordsmith', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units.', en: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units.', ja: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Don\'t play 4 fae in the midgame until you have at least 4 pixie stats. Level for more elderwoods/frontline and save gold.', en: 'Don\'t play 4 fae in the midgame until you have at least 4 pixie stats. Level for more elderwoods/frontline and save gold.', ja: 'Don\'t play 4 fae in the midgame until you have at least 4 pixie stats. Level for more elderwoods/frontline and save gold.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level to 8 and look for Ezreal and Lillia for 4 Fae. Roll aggressively for 2 stars on level 8 because Fae can give us gold later..', en: 'Level to 8 and look for Ezreal and Lillia for 4 Fae. Roll aggressively for 2 stars on level 8 because Fae can give us gold later..', ja: 'Level to 8 and look for Ezreal and Lillia for 4 Fae. Roll aggressively for 2 stars on level 8 because Fae can give us gold later..' } }
    ],
    tips: [
      { ar: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units.', en: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units.', ja: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units.' },
      { ar: 'Don\'t play 4 fae in the midgame until you have at least 4 pixie stats. Level for more elderwoods/frontline and save gold.', en: 'Don\'t play 4 fae in the midgame until you have at least 4 pixie stats. Level for more elderwoods/frontline and save gold.', ja: 'Don\'t play 4 fae in the midgame until you have at least 4 pixie stats. Level for more elderwoods/frontline and save gold.' },
      { ar: 'Level to 8 and look for Ezreal and Lillia for 4 Fae. Roll aggressively for 2 stars on level 8 because Fae can give us gold later..', en: 'Level to 8 and look for Ezreal and Lillia for 4 Fae. Roll aggressively for 2 stars on level 8 because Fae can give us gold later..', ja: 'Level to 8 and look for Ezreal and Lillia for 4 Fae. Roll aggressively for 2 stars on level 8 because Fae can give us gold later..' }
    ],
    alternatives: [],
  },
  {
    slug: 'moon-fire',
    name: { ar: 'أفيليوس طليعيون', en: 'Aphelios Vanguards', ja: 'Aphelios Vanguards' },
    subtitle: { ar: 'طليعي أفيليوس', en: 'Vanguard Aphelios', ja: 'Vanguard Aphelios' },
    tier: 'B',
    difficulty: 2,
    playstyle: { ar: 'فاست 8', en: 'Fast 8', ja: 'Fast 8' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win. Comp can use many items so take item augment if you don\'t have one yet. Mama Be', en: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win. Comp can use many items so take item augment if you don\'t have one yet. Mama Be', ja: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win. Comp can use many items so take item augment if you don\'t have one yet. Mama Be' },
    units: [
      { champion: 'DA_18_Diana', items: [], star: 1, row: 1, col: 2 },
      { champion: 'DA_18_Hecarim', items: [], star: 1, row: 1, col: 3 },
      { champion: 'DA_CrimsonRaptor18', items: ['TFT_Item_LastWhisper'], star: 1, row: 3, col: 1 },
      { champion: 'DA_18_Zyra', items: [], star: 1, row: 3, col: 6 },
      { champion: 'DA_18_Aphelios', items: ['TFT_Item_RapidFireCannon', 'TFT_Item_Deathblade', 'TFT_Item_MadredsBloodrazor'], star: 1, row: 3, col: 0 },
      { champion: 'DA_Brambleback18', items: ['TFT_Item_GuardianAngel', 'TFT_Item_Quicksilver', 'TFT_Item_SteraksGage'], star: 1, row: 1, col: 1 },
      { champion: 'DA_Sentinel18', items: ['TFT_Item_FrozenHeart', 'TFT_Item_WarmogsArmor'], star: 1, row: 0, col: 3 },
      { champion: 'DA_Taric18', items: [], star: 1, row: 0, col: 2 }
    ],
    earlyUnits: [
      'DA_18_Ornn',
      'DA_18_Varus',
      'DA_18_Xayah',
      'DA_18_Shen',
    ],
    augments: [
      { id: 'DA_Swordsmith', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.', en: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.', ja: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.', en: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.', ja: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level to 8 and roll heavily for Aphelios and the 4 costs. Only push for 9 once you have almost all your 4 costs upgraded. ', en: 'Level to 8 and roll heavily for Aphelios and the 4 costs. Only push for 9 once you have almost all your 4 costs upgraded. ', ja: 'Level to 8 and roll heavily for Aphelios and the 4 costs. Only push for 9 once you have almost all your 4 costs upgraded. ' } }
    ],
    tips: [
      { ar: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.', en: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.', ja: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.' },
      { ar: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.', en: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.', ja: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.' },
      { ar: 'Level to 8 and roll heavily for Aphelios and the 4 costs. Only push for 9 once you have almost all your 4 costs upgraded. ', en: 'Level to 8 and roll heavily for Aphelios and the 4 costs. Only push for 9 once you have almost all your 4 costs upgraded. ', ja: 'Level to 8 and roll heavily for Aphelios and the 4 costs. Only push for 9 once you have almost all your 4 costs upgraded. ' }
    ],
    alternatives: [],
  },
  {
    slug: 'woodblossom',
    name: { ar: 'خشب الازدهار', en: 'Woodblossom', ja: 'Woodblossom' },
    subtitle: { ar: 'إلدروود ازدهار', en: 'Elderwood Blossom', ja: 'Elderwood Blossom' },
    tier: 'B',
    difficulty: 2,
    playstyle: { ar: 'فاست 8', en: 'Fast 8', ja: 'Fast 8' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units. Add more Elderwood as you level with Spellweavers. If ', en: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units. Add more Elderwood as you level with Spellweavers. If ', ja: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units. Add more Elderwood as you level with Spellweavers. If ' },
    units: [
      { champion: 'DA_18_Ornn', items: [], star: 1, row: 0, col: 1 },
      { champion: 'DA_18_Alistar', items: [], star: 1, row: 0, col: 2 },
      { champion: 'DA_18_Yunara', items: [], star: 1, row: 3, col: 0 },
      { champion: 'DA_Fiddlesticks18', items: [], star: 1, row: 0, col: 3 },
      { champion: 'DA_18_Soraka', items: [], star: 1, row: 3, col: 2 },
      { champion: 'DA_18_Ahri', items: ['TFT_Item_Morellonomicon', 'TFT_Item_SpearOfShojin'], star: 1, row: 3, col: 4 },
      { champion: 'DA_18_Ezreal', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_LastWhisper', 'TFT_Item_Deathblade'], star: 1, row: 3, col: 6 },
      { champion: 'DA_18_Sett', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_GargoyleStoneplate'], star: 1, row: 0, col: 4 }
    ],
    earlyUnits: [
      'DA_18_Ornn',
      'DA_18_Xayah',
      'DA_18_Shen',
      'DA_18_LeBlanc',
    ],
    augments: [
      { id: 'DA_18_ElderwoodTraitAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_Swordsmith', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units.', en: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units.', ja: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Add more Elderwood as you level with Spellweavers. If you start getting AD items, play them on Xayah / Rapidfires.', en: 'Add more Elderwood as you level with Spellweavers. If you start getting AD items, play them on Xayah / Rapidfires.', ja: 'Add more Elderwood as you level with Spellweavers. If you start getting AD items, play them on Xayah / Rapidfires.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level to 8 and roll heavily for Ezreal and the 4 costs, only go 9 once you have upgraded most things.', en: 'Level to 8 and roll heavily for Ezreal and the 4 costs, only go 9 once you have upgraded most things.', ja: 'Level to 8 and roll heavily for Ezreal and the 4 costs, only go 9 once you have upgraded most things.' } }
    ],
    tips: [
      { ar: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units.', en: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units.', ja: 'Open with upgraded Elderwood and slam items on LeBlanc or Xayah. LeBlanc can farm copies of units on your board so avoid fielding unwanted units.' },
      { ar: 'Add more Elderwood as you level with Spellweavers. If you start getting AD items, play them on Xayah / Rapidfires.', en: 'Add more Elderwood as you level with Spellweavers. If you start getting AD items, play them on Xayah / Rapidfires.', ja: 'Add more Elderwood as you level with Spellweavers. If you start getting AD items, play them on Xayah / Rapidfires.' },
      { ar: 'Level to 8 and roll heavily for Ezreal and the 4 costs, only go 9 once you have upgraded most things.', en: 'Level to 8 and roll heavily for Ezreal and the 4 costs, only go 9 once you have upgraded most things.', ja: 'Level to 8 and roll heavily for Ezreal and the 4 costs, only go 9 once you have upgraded most things.' }
    ],
    alternatives: [],
  },
  {
    slug: 'afaelios',
    name: { ar: 'Afaelios', en: 'Afaelios', ja: 'Afaelios' },
    subtitle: { ar: 'عفريت أفيليوس', en: 'Fae Aphelios', ja: 'Fae Aphelios' },
    tier: 'B',
    difficulty: 2,
    playstyle: { ar: 'فاست 8', en: 'Fast 8', ja: 'Fast 8' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win. Comp can use many items so take item augment if you don\'t have one yet. Can als', en: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win. Comp can use many items so take item augment if you don\'t have one yet. Can als', ja: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win. Comp can use many items so take item augment if you don\'t have one yet. Can als' },
    units: [
      { champion: 'DA_18_Rakan', items: [], star: 1, row: 1, col: 2 },
      { champion: 'DA_18_Varus', items: [], star: 1, row: 3, col: 3 },
      { champion: 'DA_18_Xayah', items: [], star: 1, row: 3, col: 0 },
      { champion: 'DA_18_Shen', items: [], star: 1, row: 2, col: 3 },
      { champion: 'DA_18_Diana', items: [], star: 1, row: 1, col: 3 },
      { champion: 'DA_18_Lillia', items: ['TFT_Item_FrozenHeart'], star: 1, row: 1, col: 4 },
      { champion: 'DA_Amumu18', items: ['TFT_Item_Redemption', 'TFT_Item_WarmogsArmor', 'TFT_Item_GargoyleStoneplate'], star: 1, row: 0, col: 4 },
      { champion: 'DA_18_Aphelios', items: ['TFT_Item_RunaansHurricane', 'TFT_Item_InfinityEdge'], star: 1, row: 3, col: 6 }
    ],
    earlyUnits: [
      'DA_18_Varus',
      'DA_18_Ornn',
      'DA_18_Xayah',
      'DA_18_Shen',
    ],
    augments: [
      { id: 'DA_Swordsmith', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_Replication', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_BlackthornTraitAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.', en: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.', ja: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Comp can use many items so take item augment if you don\'t have one yet. Can also play Elderwood with Ornn + Xayah + Hecarim.', en: 'Comp can use many items so take item augment if you don\'t have one yet. Can also play Elderwood with Ornn + Xayah + Hecarim.', ja: 'Comp can use many items so take item augment if you don\'t have one yet. Can also play Elderwood with Ornn + Xayah + Hecarim.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level to 8 and roll for Aphelios and Lillia. Prioritize upgrades before pushing levels to 9. ', en: 'Level to 8 and roll for Aphelios and Lillia. Prioritize upgrades before pushing levels to 9. ', ja: 'Level to 8 and roll for Aphelios and Lillia. Prioritize upgrades before pushing levels to 9. ' } }
    ],
    tips: [
      { ar: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.', en: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.', ja: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.' },
      { ar: 'Comp can use many items so take item augment if you don\'t have one yet. Can also play Elderwood with Ornn + Xayah + Hecarim.', en: 'Comp can use many items so take item augment if you don\'t have one yet. Can also play Elderwood with Ornn + Xayah + Hecarim.', ja: 'Comp can use many items so take item augment if you don\'t have one yet. Can also play Elderwood with Ornn + Xayah + Hecarim.' },
      { ar: 'Level to 8 and roll for Aphelios and Lillia. Prioritize upgrades before pushing levels to 9. ', en: 'Level to 8 and roll for Aphelios and Lillia. Prioritize upgrades before pushing levels to 9. ', ja: 'Level to 8 and roll for Aphelios and Lillia. Prioritize upgrades before pushing levels to 9. ' }
    ],
    alternatives: [],
  },
  {
    slug: 'caitlyn-hunters',
    name: { ar: 'كايتلين صيادون', en: 'Caitlyn Hunters', ja: 'Caitlyn Hunters' },
    subtitle: { ar: 'المقاوم كايتلين إعادة لفّ', en: 'Juggernaut Caitlyn Reroll', ja: 'Juggernaut Caitlyn Reroll' },
    tier: 'C',
    difficulty: 1,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Slam Rageblade and bow items on Caitlyn for a winstreak. BIS Caitlyn is often hard to get so you can also slam items like Gunblade or Giant Slayer. Level to 6 and roll for 4 Juggernaut + 2 Hunter. Ide', en: 'Slam Rageblade and bow items on Caitlyn for a winstreak. BIS Caitlyn is often hard to get so you can also slam items like Gunblade or Giant Slayer. Level to 6 and roll for 4 Juggernaut + 2 Hunter. Ide', ja: 'Slam Rageblade and bow items on Caitlyn for a winstreak. BIS Caitlyn is often hard to get so you can also slam items like Gunblade or Giant Slayer. Level to 6 and roll for 4 Juggernaut + 2 Hunter. Ide' },
    units: [
      { champion: 'DA_18_Rakan', items: [], star: 1, row: 2, col: 2 },
      { champion: 'DA_18_Sejuani', items: [], star: 3, row: 2, col: 1 },
      { champion: 'DA_18_Caitlyn', items: ['TFT_Item_GuinsoosRageblade', 'TFT_Item_RunaansHurricane', 'TFT_Item_HextechGunblade'], star: 3, row: 3, col: 6 },
      { champion: 'DA_Scuttlecrab18', items: ['TFT_Item_Redemption', 'TFT_Item_GargoyleStoneplate', 'TFT_Item_WarmogsArmor'], star: 3, row: 0, col: 4 },
      { champion: 'DA_18_Tristana', items: [], star: 1, row: 3, col: 4 },
      { champion: 'DA_Vi18', items: [], star: 1, row: 2, col: 3 },
      { champion: 'DA_18_Sivir', items: ['TFT_Item_InfinityEdge', 'TFT_Item_LastWhisper', 'TFT_Item_RapidFireCannon'], star: 1, row: 3, col: 5 }
    ],
    earlyUnits: [
      'DA_18_Rakan',
      'DA_18_Yorick',
      'DA_18_Caitlyn',
      'DA_18_Tristana',
    ],
    augments: [
      { id: 'DA_TradeSector', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_HeroicGrabBag', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Slam Rageblade and bow items on Caitlyn for a winstreak. BIS Caitlyn is often hard to get so you can also slam items like Gunblade or Giant Slayer.', en: 'Slam Rageblade and bow items on Caitlyn for a winstreak. BIS Caitlyn is often hard to get so you can also slam items like Gunblade or Giant Slayer.', ja: 'Slam Rageblade and bow items on Caitlyn for a winstreak. BIS Caitlyn is often hard to get so you can also slam items like Gunblade or Giant Slayer.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Level to 6 and roll for 4 Juggernaut + 2 Hunter. Ideally upgrade Caitlyn 2 and 2 cost Juggernaut then econ up -> slow roll above 50g for 3* units.', en: 'Level to 6 and roll for 4 Juggernaut + 2 Hunter. Ideally upgrade Caitlyn 2 and 2 cost Juggernaut then econ up -> slow roll above 50g for 3* units.', ja: 'Level to 6 and roll for 4 Juggernaut + 2 Hunter. Ideally upgrade Caitlyn 2 and 2 cost Juggernaut then econ up -> slow roll above 50g for 3* units.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Finish your 3* ideally by mid Stage 4. Level for more Hunters. Take Turtle Primal unless you are super high rolling and can take items.', en: 'Finish your 3* ideally by mid Stage 4. Level for more Hunters. Take Turtle Primal unless you are super high rolling and can take items.', ja: 'Finish your 3* ideally by mid Stage 4. Level for more Hunters. Take Turtle Primal unless you are super high rolling and can take items.' } }
    ],
    tips: [
      { ar: 'Slam Rageblade and bow items on Caitlyn for a winstreak. BIS Caitlyn is often hard to get so you can also slam items like Gunblade or Giant Slayer.', en: 'Slam Rageblade and bow items on Caitlyn for a winstreak. BIS Caitlyn is often hard to get so you can also slam items like Gunblade or Giant Slayer.', ja: 'Slam Rageblade and bow items on Caitlyn for a winstreak. BIS Caitlyn is often hard to get so you can also slam items like Gunblade or Giant Slayer.' },
      { ar: 'Level to 6 and roll for 4 Juggernaut + 2 Hunter. Ideally upgrade Caitlyn 2 and 2 cost Juggernaut then econ up -> slow roll above 50g for 3* units.', en: 'Level to 6 and roll for 4 Juggernaut + 2 Hunter. Ideally upgrade Caitlyn 2 and 2 cost Juggernaut then econ up -> slow roll above 50g for 3* units.', ja: 'Level to 6 and roll for 4 Juggernaut + 2 Hunter. Ideally upgrade Caitlyn 2 and 2 cost Juggernaut then econ up -> slow roll above 50g for 3* units.' },
      { ar: 'Finish your 3* ideally by mid Stage 4. Level for more Hunters. Take Turtle Primal unless you are super high rolling and can take items.', en: 'Finish your 3* ideally by mid Stage 4. Level for more Hunters. Take Turtle Primal unless you are super high rolling and can take items.', ja: 'Finish your 3* ideally by mid Stage 4. Level for more Hunters. Take Turtle Primal unless you are super high rolling and can take items.' }
    ],
    alternatives: [],
  },
  {
    slug: 'ashe-juggernauts',
    name: { ar: 'آش مقاومون', en: 'Ashe Juggernauts', ja: 'Ashe Juggernauts' },
    subtitle: { ar: 'المقاوم آش', en: 'Juggernaut Ashe', ja: 'Juggernaut Ashe' },
    tier: 'C',
    difficulty: 3,
    playstyle: { ar: 'فاست 8', en: 'Fast 8', ja: 'Fast 8' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Open with a strong AD opener, preferably around Yunara. Slam generic AD items and Tank items for a win streak. Level up for more juggernauts and executioners to pair with our blossom opener. Level and', en: 'Open with a strong AD opener, preferably around Yunara. Slam generic AD items and Tank items for a win streak. Level up for more juggernauts and executioners to pair with our blossom opener. Level and', ja: 'Open with a strong AD opener, preferably around Yunara. Slam generic AD items and Tank items for a win streak. Level up for more juggernauts and executioners to pair with our blossom opener. Level and' },
    units: [
      { champion: 'DA_18_Rakan', items: [], star: 1, row: 0, col: 2 },
      { champion: 'DA_Vi18', items: [], star: 1, row: 0, col: 3 },
      { champion: 'DA_Amumu18', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_BrambleVest', 'TFT_Item_DragonsClaw'], star: 1, row: 0, col: 5 },
      { champion: 'DA_18_Sivir', items: ['TFT_Item_InfinityEdge', 'TFT_Item_SpearOfShojin'], star: 1, row: 3, col: 4 },
      { champion: 'DA_18_Ivern', items: [], star: 1, row: 3, col: 0 },
      { champion: 'DA_18_Maokai', items: [], star: 1, row: 0, col: 4 },
      { champion: 'DA_Taric18', items: [], star: 1, row: 0, col: 1 },
      { champion: 'DA_18_Ashe', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_LastWhisper', 'TFT_Item_RapidFireCannon'], star: 1, row: 3, col: 6 }
    ],
    earlyUnits: [
      'DA_Karma18',
      'DA_18_Rakan',
      'DA_18_Yorick',
      'DA_18_Yunara',
    ],
    augments: [
      { id: 'DA_BlackthornTraitAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_CyberneticUplink_Gold', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Open with a strong AD opener, preferably around Yunara. Slam generic AD items and Tank items for a win streak.', en: 'Open with a strong AD opener, preferably around Yunara. Slam generic AD items and Tank items for a win streak.', ja: 'Open with a strong AD opener, preferably around Yunara. Slam generic AD items and Tank items for a win streak.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Level up for more juggernauts and executioners to pair with our blossom opener.', en: 'Level up for more juggernauts and executioners to pair with our blossom opener.', ja: 'Level up for more juggernauts and executioners to pair with our blossom opener.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level and roll for 6 juggernauts +Sivir. Once stable, go 9 and look for Ashe and transition your board to 5 costs.', en: 'Level and roll for 6 juggernauts +Sivir. Once stable, go 9 and look for Ashe and transition your board to 5 costs.', ja: 'Level and roll for 6 juggernauts +Sivir. Once stable, go 9 and look for Ashe and transition your board to 5 costs.' } }
    ],
    tips: [
      { ar: 'Open with a strong AD opener, preferably around Yunara. Slam generic AD items and Tank items for a win streak.', en: 'Open with a strong AD opener, preferably around Yunara. Slam generic AD items and Tank items for a win streak.', ja: 'Open with a strong AD opener, preferably around Yunara. Slam generic AD items and Tank items for a win streak.' },
      { ar: 'Level up for more juggernauts and executioners to pair with our blossom opener.', en: 'Level up for more juggernauts and executioners to pair with our blossom opener.', ja: 'Level up for more juggernauts and executioners to pair with our blossom opener.' },
      { ar: 'Level and roll for 6 juggernauts +Sivir. Once stable, go 9 and look for Ashe and transition your board to 5 costs.', en: 'Level and roll for 6 juggernauts +Sivir. Once stable, go 9 and look for Ashe and transition your board to 5 costs.', ja: 'Level and roll for 6 juggernauts +Sivir. Once stable, go 9 and look for Ashe and transition your board to 5 costs.' }
    ],
    alternatives: [],
  },
  {
    slug: 'sprykin-teemo-copy',
    name: { ar: 'Teemowood', en: 'Teemowood', ja: 'Teemowood' },
    subtitle: { ar: 'إلدروود تيمو إعادة لفّ', en: 'Elderwood Teemo Reroll', ja: 'Elderwood Teemo Reroll' },
    tier: 'C',
    difficulty: 1,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Open with a win streak Teemo start and itemize him ASAP. The more Teemo casts, the more likely you can collect value off his mushrooms. Level to 6 and roll for your 2* upgrades to stabilize and win st', en: 'Open with a win streak Teemo start and itemize him ASAP. The more Teemo casts, the more likely you can collect value off his mushrooms. Level to 6 and roll for your 2* upgrades to stabilize and win st', ja: 'Open with a win streak Teemo start and itemize him ASAP. The more Teemo casts, the more likely you can collect value off his mushrooms. Level to 6 and roll for your 2* upgrades to stabilize and win st' },
    units: [
      { champion: 'DA_18_Kobuko', items: [], star: 1, row: 2, col: 1 },
      { champion: 'DA_18_Veigar', items: [], star: 1, row: 3, col: 0 },
      { champion: 'DA_18_Alistar', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_GargoyleStoneplate'], star: 3, row: 0, col: 4 },
      { champion: 'DA_18_LeBlanc', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_RabadonsDeathcap'], star: 3, row: 3, col: 5 },
      { champion: 'DA_18_Teemo', items: ['TFT_Item_JeweledGauntlet', 'TFT_Item_SpearOfShojin'], star: 3, row: 3, col: 6 },
      { champion: 'DA_Sentinel18', items: [], star: 1, row: 1, col: 4 },
      { champion: 'DA_18_Morgana', items: ['TFT_Item_Morellonomicon', 'TFT_Item_StatikkShiv'], star: 1, row: 2, col: 4 },
      { champion: 'DA_18_Hecarim', items: [], star: 1, row: 1, col: 3 }
    ],
    earlyUnits: [
      'DA_18_Kobuko',
      'DA_18_RekSai',
      'DA_18_Veigar',
      'DA_18_Teemo',
    ],
    augments: [
      { id: 'DA_18_SprykinAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_TradeSector', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Open with a win streak Teemo start and itemize him ASAP. The more Teemo casts, the more likely you can collect value off his mushrooms.', en: 'Open with a win streak Teemo start and itemize him ASAP. The more Teemo casts, the more likely you can collect value off his mushrooms.', ja: 'Open with a win streak Teemo start and itemize him ASAP. The more Teemo casts, the more likely you can collect value off his mushrooms.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Level to 6 and roll for your 2* upgrades to stabilize and win streak Stage 3. Econ up and slow roll above 50g for 3*.', en: 'Level to 6 and roll for your 2* upgrades to stabilize and win streak Stage 3. Econ up and slow roll above 50g for 3*.', ja: 'Level to 6 and roll for your 2* upgrades to stabilize and win streak Stage 3. Econ up and slow roll above 50g for 3*.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Finish Teemo 3* and your tank then push levels for more Invokers. If you get more damage items late game Morgana can hold the utility.', en: 'Finish Teemo 3* and your tank then push levels for more Invokers. If you get more damage items late game Morgana can hold the utility.', ja: 'Finish Teemo 3* and your tank then push levels for more Invokers. If you get more damage items late game Morgana can hold the utility.' } }
    ],
    tips: [
      { ar: 'Open with a win streak Teemo start and itemize him ASAP. The more Teemo casts, the more likely you can collect value off his mushrooms.', en: 'Open with a win streak Teemo start and itemize him ASAP. The more Teemo casts, the more likely you can collect value off his mushrooms.', ja: 'Open with a win streak Teemo start and itemize him ASAP. The more Teemo casts, the more likely you can collect value off his mushrooms.' },
      { ar: 'Level to 6 and roll for your 2* upgrades to stabilize and win streak Stage 3. Econ up and slow roll above 50g for 3*.', en: 'Level to 6 and roll for your 2* upgrades to stabilize and win streak Stage 3. Econ up and slow roll above 50g for 3*.', ja: 'Level to 6 and roll for your 2* upgrades to stabilize and win streak Stage 3. Econ up and slow roll above 50g for 3*.' },
      { ar: 'Finish Teemo 3* and your tank then push levels for more Invokers. If you get more damage items late game Morgana can hold the utility.', en: 'Finish Teemo 3* and your tank then push levels for more Invokers. If you get more damage items late game Morgana can hold the utility.', ja: 'Finish Teemo 3* and your tank then push levels for more Invokers. If you get more damage items late game Morgana can hold the utility.' }
    ],
    alternatives: [],
  },
  {
    slug: 'warwick-rr',
    name: { ar: 'وارويك مخرّب', en: 'Warwick Ravager', ja: 'Warwick Ravager' },
    subtitle: { ar: 'الشوكة السوداء مخرّب وارويك إعادة لفّ', en: 'Blackthorn Ravager Warwick Reroll', ja: 'Blackthorn Ravager Warwick Reroll' },
    tier: 'C',
    difficulty: 2,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'If you don\'t have Shojin, consider lose streak to guarantee it on carousel. If you have Shojin + good component, play for win streak instead. Level to 6 and roll for Warwick 2 with 4 Blackthorn + 2 Ra', en: 'If you don\'t have Shojin, consider lose streak to guarantee it on carousel. If you have Shojin + good component, play for win streak instead. Level to 6 and roll for Warwick 2 with 4 Blackthorn + 2 Ra', ja: 'If you don\'t have Shojin, consider lose streak to guarantee it on carousel. If you have Shojin + good component, play for win streak instead. Level to 6 and roll for Warwick 2 with 4 Blackthorn + 2 Ra' },
    units: [
      { champion: 'DA_18_Akali_AD', items: [], star: 1, row: 3, col: 1 },
      { champion: 'DA_18_RekSai', items: [], star: 1, row: 0, col: 6 },
      { champion: 'DA_Murkwolf18', items: ['TFT_Item_GuardianAngel', 'TFT_Item_Quicksilver', 'TFT_Item_UnstableConcoction'], star: 3, row: 0, col: 0 },
      { champion: 'DA_18_Warwick', items: ['TFT_Item_SteraksGage', 'TFT_Item_TitansResolve', 'TFT_Item_SpearOfShojin'], star: 3, row: 1, col: 0 },
      { champion: 'DA_18_Azir', items: [], star: 1, row: 3, col: 0 },
      { champion: 'DA_Krug18', items: [], star: 3, row: 2, col: 3 },
      { champion: 'DA_Brambleback18', items: ['TFT_Item_ThiefsGloves'], star: 1, row: 2, col: 0 },
      { champion: 'DA_18_Malphite', items: ['TFT_Item_Crownguard', 'TFT_Item_GargoyleStoneplate', 'TFT_Item_WarmogsArmor'], star: 1, row: 0, col: 1 }
    ],
    earlyUnits: [
      'DA_18_Kobuko',
      'DA_18_RekSai',
      'DA_Murkwolf18',
      'DA_18_Warwick',
    ],
    augments: [
      { id: 'DA_GroupHugI', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'If you don\'t have Shojin, consider lose streak to guarantee it on carousel. If you have Shojin + good component, play for win streak instead.', en: 'If you don\'t have Shojin, consider lose streak to guarantee it on carousel. If you have Shojin + good component, play for win streak instead.', ja: 'If you don\'t have Shojin, consider lose streak to guarantee it on carousel. If you have Shojin + good component, play for win streak instead.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Level to 6 and roll for Warwick 2 with 4 Blackthorn + 2 Ravager. Econ up and slow roll for 3*. You can also play 4 Ravager temporarily if needed.', en: 'Level to 6 and roll for Warwick 2 with 4 Blackthorn + 2 Ravager. Econ up and slow roll for 3*. You can also play 4 Ravager temporarily if needed.', ja: 'Level to 6 and roll for Warwick 2 with 4 Blackthorn + 2 Ravager. Econ up and slow roll for 3*. You can also play 4 Ravager temporarily if needed.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Finish Warwick 3 and push levels. If you don\'t have Murkwolf 3, look for Brambleback as your duo carry. ', en: 'Finish Warwick 3 and push levels. If you don\'t have Murkwolf 3, look for Brambleback as your duo carry. ', ja: 'Finish Warwick 3 and push levels. If you don\'t have Murkwolf 3, look for Brambleback as your duo carry. ' } }
    ],
    tips: [
      { ar: 'If you don\'t have Shojin, consider lose streak to guarantee it on carousel. If you have Shojin + good component, play for win streak instead.', en: 'If you don\'t have Shojin, consider lose streak to guarantee it on carousel. If you have Shojin + good component, play for win streak instead.', ja: 'If you don\'t have Shojin, consider lose streak to guarantee it on carousel. If you have Shojin + good component, play for win streak instead.' },
      { ar: 'Level to 6 and roll for Warwick 2 with 4 Blackthorn + 2 Ravager. Econ up and slow roll for 3*. You can also play 4 Ravager temporarily if needed.', en: 'Level to 6 and roll for Warwick 2 with 4 Blackthorn + 2 Ravager. Econ up and slow roll for 3*. You can also play 4 Ravager temporarily if needed.', ja: 'Level to 6 and roll for Warwick 2 with 4 Blackthorn + 2 Ravager. Econ up and slow roll for 3*. You can also play 4 Ravager temporarily if needed.' },
      { ar: 'Finish Warwick 3 and push levels. If you don\'t have Murkwolf 3, look for Brambleback as your duo carry. ', en: 'Finish Warwick 3 and push levels. If you don\'t have Murkwolf 3, look for Brambleback as your duo carry. ', ja: 'Finish Warwick 3 and push levels. If you don\'t have Murkwolf 3, look for Brambleback as your duo carry. ' }
    ],
    alternatives: [],
  },
  {
    slug: 'cashout-morgana',
    name: { ar: 'عرّاف مورغانا', en: 'Invoker Morgana', ja: 'Invoker Morgana' },
    subtitle: { ar: 'عرّاف مورغانا', en: 'Invoker Morgana', ja: 'Invoker Morgana' },
    tier: 'C',
    difficulty: 3,
    playstyle: { ar: 'Lose Streak', en: 'Lose Streak', ja: 'Lose Streak' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Open with a strong AP opener, preferably around Invokers. Teemo is an example shown but you can also play Pebbles, Spellweavers, or Coven. If lose streaking with Coven, try to kill some units each fig', en: 'Open with a strong AP opener, preferably around Invokers. Teemo is an example shown but you can also play Pebbles, Spellweavers, or Coven. If lose streaking with Coven, try to kill some units each fig', ja: 'Open with a strong AP opener, preferably around Invokers. Teemo is an example shown but you can also play Pebbles, Spellweavers, or Coven. If lose streaking with Coven, try to kill some units each fig' },
    units: [
      { champion: 'DA_18_Sentry', items: [], star: 1, row: 3, col: 2 },
      { champion: 'DA_18_Diana', items: [], star: 1, row: 0, col: 3 },
      { champion: 'DA_18_Hecarim', items: [], star: 1, row: 0, col: 1 },
      { champion: 'DA_KogMaw18_AD', items: [], star: 1, row: 3, col: 5 },
      { champion: 'DA_Brambleback18', items: ['TFT_Item_GuardianAngel', 'TFT_Item_MadredsBloodrazor', 'TFT_Item_Quicksilver'], star: 1, row: 2, col: 5 },
      { champion: 'DA_18_Morgana', items: ['TFT_Item_Morellonomicon', 'TFT_Item_RabadonsDeathcap', 'TFT_Item_StatikkShiv'], star: 1, row: 2, col: 4 },
      { champion: 'DA_Sentinel18', items: ['TFT_Item_FrozenHeart', 'TFT_Item_WarmogsArmor', 'TFT_Item_AdaptiveHelm'], star: 1, row: 0, col: 4 },
      { champion: 'DA_Taric18', items: [], star: 1, row: 0, col: 2 },
      { champion: 'DA_18_Alune', items: [], star: 1, row: 3, col: 4 }
    ],
    earlyUnits: [
      'DA_18_Kobuko',
      'DA_18_Sentry',
      'DA_18_Teemo',
      'DA_18_Rammus',
    ],
    augments: [
      { id: 'DA_18_CovenTraitAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Open with a strong AP opener, preferably around Invokers. Teemo is an example shown but you can also play Pebbles, Spellweavers, or Coven.', en: 'Open with a strong AP opener, preferably around Invokers. Teemo is an example shown but you can also play Pebbles, Spellweavers, or Coven.', ja: 'Open with a strong AP opener, preferably around Invokers. Teemo is an example shown but you can also play Pebbles, Spellweavers, or Coven.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'If lose streaking with Coven, try to kill some units each fight to preserve HP. If win streaking, push standard winstreak tempo (6 @ 3-2, 7 @ 3-5) and save econ.', en: 'If lose streaking with Coven, try to kill some units each fight to preserve HP. If win streaking, push standard winstreak tempo (6 @ 3-2, 7 @ 3-5) and save econ.', ja: 'If lose streaking with Coven, try to kill some units each fight to preserve HP. If win streaking, push standard winstreak tempo (6 @ 3-2, 7 @ 3-5) and save econ.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Cash out / roll down on level 8 for Morgana 2, Sentinel, and 4 Invoker. If you don\'t have Bramble items, flex in another AP carry like Ahri / Nidalee.', en: 'Cash out / roll down on level 8 for Morgana 2, Sentinel, and 4 Invoker. If you don\'t have Bramble items, flex in another AP carry like Ahri / Nidalee.', ja: 'Cash out / roll down on level 8 for Morgana 2, Sentinel, and 4 Invoker. If you don\'t have Bramble items, flex in another AP carry like Ahri / Nidalee.' } }
    ],
    tips: [
      { ar: 'Open with a strong AP opener, preferably around Invokers. Teemo is an example shown but you can also play Pebbles, Spellweavers, or Coven.', en: 'Open with a strong AP opener, preferably around Invokers. Teemo is an example shown but you can also play Pebbles, Spellweavers, or Coven.', ja: 'Open with a strong AP opener, preferably around Invokers. Teemo is an example shown but you can also play Pebbles, Spellweavers, or Coven.' },
      { ar: 'If lose streaking with Coven, try to kill some units each fight to preserve HP. If win streaking, push standard winstreak tempo (6 @ 3-2, 7 @ 3-5) and save econ.', en: 'If lose streaking with Coven, try to kill some units each fight to preserve HP. If win streaking, push standard winstreak tempo (6 @ 3-2, 7 @ 3-5) and save econ.', ja: 'If lose streaking with Coven, try to kill some units each fight to preserve HP. If win streaking, push standard winstreak tempo (6 @ 3-2, 7 @ 3-5) and save econ.' },
      { ar: 'Cash out / roll down on level 8 for Morgana 2, Sentinel, and 4 Invoker. If you don\'t have Bramble items, flex in another AP carry like Ahri / Nidalee.', en: 'Cash out / roll down on level 8 for Morgana 2, Sentinel, and 4 Invoker. If you don\'t have Bramble items, flex in another AP carry like Ahri / Nidalee.', ja: 'Cash out / roll down on level 8 for Morgana 2, Sentinel, and 4 Invoker. If you don\'t have Bramble items, flex in another AP carry like Ahri / Nidalee.' }
    ],
    alternatives: [],
  },
  {
    slug: 'adaptor-nidalee',
    name: { ar: 'عرّاف نيدالي', en: 'Invoker Nidalee', ja: 'Invoker Nidalee' },
    subtitle: { ar: 'عرّاف نيدالي', en: 'Invoker Nidalee', ja: 'Invoker Nidalee' },
    tier: 'C',
    difficulty: 2,
    playstyle: { ar: 'فاست 8', en: 'Fast 8', ja: 'Fast 8' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Play any strong Rageblade opener on an AP carry such as Kayle, Master Yi, or a Spellweaver. Opener is very flexible. Comp is very Rod hungry so keep taking them off augments / carousels when possible.', en: 'Play any strong Rageblade opener on an AP carry such as Kayle, Master Yi, or a Spellweaver. Opener is very flexible. Comp is very Rod hungry so keep taking them off augments / carousels when possible.', ja: 'Play any strong Rageblade opener on an AP carry such as Kayle, Master Yi, or a Spellweaver. Opener is very flexible. Comp is very Rod hungry so keep taking them off augments / carousels when possible.' },
    units: [
      { champion: 'DA_18_Sentry', items: [], star: 1, row: 3, col: 6 },
      { champion: 'DA_Scuttlecrab18', items: [], star: 1, row: 0, col: 4 },
      { champion: 'DA_KogMaw18_AD', items: [], star: 1, row: 3, col: 1 },
      { champion: 'DA_Vi18', items: [], star: 1, row: 0, col: 5 },
      { champion: 'DA_18_Morgana', items: ['TFT_Item_Morellonomicon', 'TFT_Item_ArchangelsStaff', 'TFT_Item_AdaptiveHelm'], star: 1, row: 1, col: 2 },
      { champion: 'DA_Nidalee18_AP', items: ['TFT_Item_JeweledGauntlet', 'TFT_Item_GuinsoosRageblade'], star: 1, row: 3, col: 0 },
      { champion: 'DA_Sentinel18', items: ['TFT_Item_FrozenHeart', 'TFT_Item_WarmogsArmor', 'TFT_Item_AdaptiveHelm'], star: 1, row: 0, col: 3 },
      { champion: 'DA_Taric18', items: [], star: 1, row: 0, col: 2 }
    ],
    earlyUnits: [
      'DA_18_Rakan',
      'DA_18_Xayah',
      'DA_Scuttlecrab18',
      'DA_18_Kayle',
    ],
    augments: [
      { id: 'DA_SpeedyDoubleKill', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Play any strong Rageblade opener on an AP carry such as Kayle, Master Yi, or a Spellweaver. Opener is very flexible.', en: 'Play any strong Rageblade opener on an AP carry such as Kayle, Master Yi, or a Spellweaver. Opener is very flexible.', ja: 'Play any strong Rageblade opener on an AP carry such as Kayle, Master Yi, or a Spellweaver. Opener is very flexible.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Comp is very Rod hungry so keep taking them off augments / carousels when possible. If you are not playing Invokers, hold onto cheap units like Pebbles for later.', en: 'Comp is very Rod hungry so keep taking them off augments / carousels when possible. If you are not playing Invokers, hold onto cheap units like Pebbles for later.', ja: 'Comp is very Rod hungry so keep taking them off augments / carousels when possible. If you are not playing Invokers, hold onto cheap units like Pebbles for later.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level to 8 and roll for 4 Invoker. Avoid tunneling only on 4 Vanguard frontline. You can also flex Brawlers or Juggernauts as needed.', en: 'Level to 8 and roll for 4 Invoker. Avoid tunneling only on 4 Vanguard frontline. You can also flex Brawlers or Juggernauts as needed.', ja: 'Level to 8 and roll for 4 Invoker. Avoid tunneling only on 4 Vanguard frontline. You can also flex Brawlers or Juggernauts as needed.' } }
    ],
    tips: [
      { ar: 'Play any strong Rageblade opener on an AP carry such as Kayle, Master Yi, or a Spellweaver. Opener is very flexible.', en: 'Play any strong Rageblade opener on an AP carry such as Kayle, Master Yi, or a Spellweaver. Opener is very flexible.', ja: 'Play any strong Rageblade opener on an AP carry such as Kayle, Master Yi, or a Spellweaver. Opener is very flexible.' },
      { ar: 'Comp is very Rod hungry so keep taking them off augments / carousels when possible. If you are not playing Invokers, hold onto cheap units like Pebbles for later.', en: 'Comp is very Rod hungry so keep taking them off augments / carousels when possible. If you are not playing Invokers, hold onto cheap units like Pebbles for later.', ja: 'Comp is very Rod hungry so keep taking them off augments / carousels when possible. If you are not playing Invokers, hold onto cheap units like Pebbles for later.' },
      { ar: 'Level to 8 and roll for 4 Invoker. Avoid tunneling only on 4 Vanguard frontline. You can also flex Brawlers or Juggernauts as needed.', en: 'Level to 8 and roll for 4 Invoker. Avoid tunneling only on 4 Vanguard frontline. You can also flex Brawlers or Juggernauts as needed.', ja: 'Level to 8 and roll for 4 Invoker. Avoid tunneling only on 4 Vanguard frontline. You can also flex Brawlers or Juggernauts as needed.' }
    ],
    alternatives: [],
  },
  {
    slug: 'rengar-rr',
    name: { ar: 'رينغار إعادة لفّ', en: 'Rengar Reroll', ja: 'Rengar Reroll' },
    subtitle: { ar: 'طليعي رينغار إعادة لفّ', en: 'Vanguard Rengar Reroll', ja: 'Vanguard Rengar Reroll' },
    tier: 'C',
    difficulty: 2,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Only play this comp with an early Rengar with items so you can snowball Rival. Play any upgraded frontline tank to stall for Kha\'zix. If you have a few crucial pairs on level 6, you can consider rolli', en: 'Only play this comp with an early Rengar with items so you can snowball Rival. Play any upgraded frontline tank to stall for Kha\'zix. If you have a few crucial pairs on level 6, you can consider rolli', ja: 'Only play this comp with an early Rengar with items so you can snowball Rival. Play any upgraded frontline tank to stall for Kha\'zix. If you have a few crucial pairs on level 6, you can consider rolli' },
    units: [
      { champion: 'DA_18_Diana', items: ['TFT_Item_ThiefsGloves'], star: 3, row: 1, col: 0 },
      { champion: 'DA_18_Hecarim', items: ['TFT_Item_FrozenHeart', 'TFT_Item_RedBuff', 'TFT_Item_WarmogsArmor'], star: 3, row: 0, col: 1 },
      { champion: 'DA_CrimsonRaptor18', items: ['TFT_Item_LastWhisper', 'TFT_Item_RunaansHurricane', 'TFT_Item_GuinsoosRageblade'], star: 3, row: 3, col: 0 },
      { champion: 'DA_18_Rengar', items: ['TFT_Item_GuardianAngel', 'TFT_Item_TitansResolve', 'TFT_Item_GuinsoosRageblade'], star: 3, row: 0, col: 0 },
      { champion: 'DA_18_Aphelios', items: [], star: 1, row: 3, col: 1 },
      { champion: 'DA_Brambleback18', items: [], star: 1, row: 1, col: 1 },
      { champion: 'DA_Sentinel18', items: [], star: 1, row: 0, col: 6 },
      { champion: 'DA_Taric18', items: [], star: 1, row: 1, col: 6 }
    ],
    earlyUnits: [
      'DA_18_Rakan',
      'DA_18_Yorick',
      'DA_18_Elise',
      'DA_18_Rengar',
    ],
    augments: [
      { id: 'DA_SpeedyDoubleKill', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_TradeSector', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Only play this comp with an early Rengar with items so you can snowball Rival. Play any upgraded frontline tank to stall for Kha\'zix.', en: 'Only play this comp with an early Rengar with items so you can snowball Rival. Play any upgraded frontline tank to stall for Kha\'zix.', ja: 'Only play this comp with an early Rengar with items so you can snowball Rival. Play any upgraded frontline tank to stall for Kha\'zix.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.', en: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.', ja: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Slow roll on 7 for 3* upgrades on whatever 3 costs you\'re chasing. In this example, if you can\'t hit Mama Beak 3, look for Aphelios duo instead.', en: 'Slow roll on 7 for 3* upgrades on whatever 3 costs you\'re chasing. In this example, if you can\'t hit Mama Beak 3, look for Aphelios duo instead.', ja: 'Slow roll on 7 for 3* upgrades on whatever 3 costs you\'re chasing. In this example, if you can\'t hit Mama Beak 3, look for Aphelios duo instead.' } }
    ],
    tips: [
      { ar: 'Only play this comp with an early Rengar with items so you can snowball Rival. Play any upgraded frontline tank to stall for Kha\'zix.', en: 'Only play this comp with an early Rengar with items so you can snowball Rival. Play any upgraded frontline tank to stall for Kha\'zix.', ja: 'Only play this comp with an early Rengar with items so you can snowball Rival. Play any upgraded frontline tank to stall for Kha\'zix.' },
      { ar: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.', en: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.', ja: 'If you have a few crucial pairs on level 6, you can consider rolling slightly on 6 to get charms / upgrade units. Econ up to 7 otherwise.' },
      { ar: 'Slow roll on 7 for 3* upgrades on whatever 3 costs you\'re chasing. In this example, if you can\'t hit Mama Beak 3, look for Aphelios duo instead.', en: 'Slow roll on 7 for 3* upgrades on whatever 3 costs you\'re chasing. In this example, if you can\'t hit Mama Beak 3, look for Aphelios duo instead.', ja: 'Slow roll on 7 for 3* upgrades on whatever 3 costs you\'re chasing. In this example, if you can\'t hit Mama Beak 3, look for Aphelios duo instead.' }
    ],
    alternatives: [],
  },
  {
    slug: 'solar-kayle',
    name: { ar: 'شمسي كايل', en: 'Solar Kayle', ja: 'Solar Kayle' },
    subtitle: { ar: 'شمسي كايل إعادة لفّ', en: 'Solar Kayle Reroll', ja: 'Solar Kayle Reroll' },
    tier: 'C',
    difficulty: 1,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Ideally open with Kayle and upgraded Ornn. After Rageblade, prioritize tank items on Ornn so he can begin reliably stacking Artifact scaling. Bench priority: Kayle 3 > Ornn 3 > Xayah / Leona > Sejuani', en: 'Ideally open with Kayle and upgraded Ornn. After Rageblade, prioritize tank items on Ornn so he can begin reliably stacking Artifact scaling. Bench priority: Kayle 3 > Ornn 3 > Xayah / Leona > Sejuani', ja: 'Ideally open with Kayle and upgraded Ornn. After Rageblade, prioritize tank items on Ornn so he can begin reliably stacking Artifact scaling. Bench priority: Kayle 3 > Ornn 3 > Xayah / Leona > Sejuani' },
    units: [
      { champion: 'DA_18_Leona', items: [], star: 3, row: 1, col: 4 },
      { champion: 'DA_18_Rakan', items: [], star: 3, row: 2, col: 3 },
      { champion: 'DA_18_Ornn', items: ['TFT_Item_GargoyleStoneplate', 'TFT_Item_WarmogsArmor', 'TFT_Item_Redemption'], star: 3, row: 0, col: 4 },
      { champion: 'DA_18_Xayah', items: ['TFT_Item_GuinsoosRageblade', 'TFT_Item_RapidFireCannon', 'TFT_Item_Deathblade'], star: 3, row: 3, col: 5 },
      { champion: 'DA_18_Sejuani', items: [], star: 3, row: 1, col: 3 },
      { champion: 'DA_18_Kayle', items: ['TFT_Item_GuinsoosRageblade', 'TFT_Item_RabadonsDeathcap'], star: 3, row: 3, col: 6 },
      { champion: 'DA_18_Hecarim', items: [], star: 1, row: 2, col: 4 }
    ],
    earlyUnits: [
      'DA_18_Leona',
      'DA_18_Ornn',
      'DA_18_Sejuani',
      'DA_18_Kayle',
    ],
    augments: [
      { id: 'DA_18_SolarTraitAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Ideally open with Kayle and upgraded Ornn. After Rageblade, prioritize tank items on Ornn so he can begin reliably stacking Artifact scaling.', en: 'Ideally open with Kayle and upgraded Ornn. After Rageblade, prioritize tank items on Ornn so he can begin reliably stacking Artifact scaling.', ja: 'Ideally open with Kayle and upgraded Ornn. After Rageblade, prioritize tank items on Ornn so he can begin reliably stacking Artifact scaling.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Bench priority: Kayle 3 > Ornn 3 > Xayah / Leona > Sejuani > Rakan. Once you finish 1 costs, move up to level 6 for 2 costs.', en: 'Bench priority: Kayle 3 > Ornn 3 > Xayah / Leona > Sejuani > Rakan. Once you finish 1 costs, move up to level 6 for 2 costs.', ja: 'Bench priority: Kayle 3 > Ornn 3 > Xayah / Leona > Sejuani > Rakan. Once you finish 1 costs, move up to level 6 for 2 costs.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Finish your 3* and level for Elderwood. Cap with any 5 costs like Lux, Ivern, Taric, etc.', en: 'Finish your 3* and level for Elderwood. Cap with any 5 costs like Lux, Ivern, Taric, etc.', ja: 'Finish your 3* and level for Elderwood. Cap with any 5 costs like Lux, Ivern, Taric, etc.' } }
    ],
    tips: [
      { ar: 'Ideally open with Kayle and upgraded Ornn. After Rageblade, prioritize tank items on Ornn so he can begin reliably stacking Artifact scaling.', en: 'Ideally open with Kayle and upgraded Ornn. After Rageblade, prioritize tank items on Ornn so he can begin reliably stacking Artifact scaling.', ja: 'Ideally open with Kayle and upgraded Ornn. After Rageblade, prioritize tank items on Ornn so he can begin reliably stacking Artifact scaling.' },
      { ar: 'Bench priority: Kayle 3 > Ornn 3 > Xayah / Leona > Sejuani > Rakan. Once you finish 1 costs, move up to level 6 for 2 costs.', en: 'Bench priority: Kayle 3 > Ornn 3 > Xayah / Leona > Sejuani > Rakan. Once you finish 1 costs, move up to level 6 for 2 costs.', ja: 'Bench priority: Kayle 3 > Ornn 3 > Xayah / Leona > Sejuani > Rakan. Once you finish 1 costs, move up to level 6 for 2 costs.' },
      { ar: 'Finish your 3* and level for Elderwood. Cap with any 5 costs like Lux, Ivern, Taric, etc.', en: 'Finish your 3* and level for Elderwood. Cap with any 5 costs like Lux, Ivern, Taric, etc.', ja: 'Finish your 3* and level for Elderwood. Cap with any 5 costs like Lux, Ivern, Taric, etc.' }
    ],
    alternatives: [],
  },
  {
    slug: 'dark-mages',
    name: { ar: 'مشاغب فيغار', en: 'Sprykin Veigar', ja: 'Sprykin Veigar' },
    subtitle: { ar: 'مشاغب فيغار إعادة لفّ', en: 'Sprykin Veigar Reroll', ja: 'Sprykin Veigar Reroll' },
    tier: 'C',
    difficulty: 1,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Only play around this opener with early upgrades so Veigar can snowball and gain stacks. Prioritize Veigar items. If you are close to Veigar 3 (7+ copies), consider rolling until you hit 3*. If far (3', en: 'Only play around this opener with early upgrades so Veigar can snowball and gain stacks. Prioritize Veigar items. If you are close to Veigar 3 (7+ copies), consider rolling until you hit 3*. If far (3', ja: 'Only play around this opener with early upgrades so Veigar can snowball and gain stacks. Prioritize Veigar items. If you are close to Veigar 3 (7+ copies), consider rolling until you hit 3*. If far (3' },
    units: [
      { champion: 'DA_18_Kobuko', items: [], star: 3, row: 2, col: 3 },
      { champion: 'DA_18_RekSai', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_GargoyleStoneplate'], star: 3, row: 0, col: 3 },
      { champion: 'DA_18_Veigar', items: ['TFT_Item_JeweledGauntlet', 'TFT_Item_BlueBuff', 'TFT_Item_HextechGunblade'], star: 3, row: 3, col: 0 },
      { champion: 'DA_18_Teemo', items: [], star: 1, row: 3, col: 3 },
      { champion: 'DA_Fiddlesticks18', items: [], star: 1, row: 2, col: 2 },
      { champion: 'DA_18_Rammus', items: [], star: 1, row: 2, col: 4 },
      { champion: 'DA_18_Sett', items: [], star: 1, row: 2, col: 5 },
      { champion: 'DA_18_GnarSmall', items: [], star: 1, row: 2, col: 1 }
    ],
    earlyUnits: [
      'DA_18_Kobuko',
      'DA_18_RekSai',
      'DA_18_Veigar',
      'DA_18_Teemo',
    ],
    augments: [
      { id: 'DA_LivingForge', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_PortableForge', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Only play around this opener with early upgrades so Veigar can snowball and gain stacks. Prioritize Veigar items.', en: 'Only play around this opener with early upgrades so Veigar can snowball and gain stacks. Prioritize Veigar items.', ja: 'Only play around this opener with early upgrades so Veigar can snowball and gain stacks. Prioritize Veigar items.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'If you are close to Veigar 3 (7+ copies), consider rolling until you hit 3*. If far (3-4 copies), slow roll above 50g for 3*.', en: 'If you are close to Veigar 3 (7+ copies), consider rolling until you hit 3*. If far (3-4 copies), slow roll above 50g for 3*.', ja: 'If you are close to Veigar 3 (7+ copies), consider rolling until you hit 3*. If far (3-4 copies), slow roll above 50g for 3*.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Once you finish your 3*, push levels for more Spyrkin, Blackthorn, or Brawlers. ', en: 'Once you finish your 3*, push levels for more Spyrkin, Blackthorn, or Brawlers. ', ja: 'Once you finish your 3*, push levels for more Spyrkin, Blackthorn, or Brawlers. ' } }
    ],
    tips: [
      { ar: 'Only play around this opener with early upgrades so Veigar can snowball and gain stacks. Prioritize Veigar items.', en: 'Only play around this opener with early upgrades so Veigar can snowball and gain stacks. Prioritize Veigar items.', ja: 'Only play around this opener with early upgrades so Veigar can snowball and gain stacks. Prioritize Veigar items.' },
      { ar: 'If you are close to Veigar 3 (7+ copies), consider rolling until you hit 3*. If far (3-4 copies), slow roll above 50g for 3*.', en: 'If you are close to Veigar 3 (7+ copies), consider rolling until you hit 3*. If far (3-4 copies), slow roll above 50g for 3*.', ja: 'If you are close to Veigar 3 (7+ copies), consider rolling until you hit 3*. If far (3-4 copies), slow roll above 50g for 3*.' },
      { ar: 'Once you finish your 3*, push levels for more Spyrkin, Blackthorn, or Brawlers. ', en: 'Once you finish your 3*, push levels for more Spyrkin, Blackthorn, or Brawlers. ', ja: 'Once you finish your 3*, push levels for more Spyrkin, Blackthorn, or Brawlers. ' }
    ],
    alternatives: [],
  },
  {
    slug: 'blossom-fast-9',
    name: { ar: 'آش سريع', en: 'Ashe Fast 9 ', ja: 'Ashe Fast 9 ' },
    subtitle: { ar: 'آش تنين سريع', en: 'Ashe Dragon Fast 9', ja: 'Ashe Dragon Fast 9' },
    tier: 'C',
    difficulty: 3,
    playstyle: { ar: 'فاست 9', en: 'Fast 9', ja: 'Fast 9' },
    level: { ar: 'مستوى 9', en: 'Level 9', ja: 'レベル9' },
    summary: { ar: 'Slam items aggressively and play around 3 Blossom for a win streak. This is a comp you can only play from far ahead with lots of HP and resources. Continue your win streak. Pick an econ augment if you', en: 'Slam items aggressively and play around 3 Blossom for a win streak. This is a comp you can only play from far ahead with lots of HP and resources. Continue your win streak. Pick an econ augment if you', ja: 'Slam items aggressively and play around 3 Blossom for a win streak. This is a comp you can only play from far ahead with lots of HP and resources. Continue your win streak. Pick an econ augment if you' },
    units: [
      { champion: 'DA_Cinderling18', items: [], star: 1, row: 3, col: 0 },
      { champion: 'DA_18_Yorick', items: [], star: 1, row: 2, col: 0 },
      { champion: 'DA_Amumu18', items: [], star: 1, row: 1, col: 3 },
      { champion: 'DA_18_Sett', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_Redemption', 'TFT_Item_GargoyleStoneplate'], star: 1, row: 0, col: 3 },
      { champion: 'DA_18_GnarSmall', items: [], star: 1, row: 2, col: 3 },
      { champion: 'DA_18_Kennen', items: [], star: 1, row: 2, col: 4 },
      { champion: 'DA_18_Ashe', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_RapidFireCannon', 'TFT_Item_LastWhisper'], star: 1, row: 3, col: 6 },
      { champion: 'DA_18_ElderDragon', items: ['TFT_Item_InfinityEdge', 'TFT_Item_SteraksGage'], star: 1, row: 2, col: 5 }
    ],
    earlyUnits: [
      'DA_Karma18',
      'DA_18_Rakan',
      'DA_18_Yorick',
      'DA_18_Yunara',
    ],
    augments: [
      { id: 'DA_LevelUp', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_LateGameScaling', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Slam items aggressively and play around 3 Blossom for a win streak. This is a comp you can only play from far ahead with lots of HP and resources.', en: 'Slam items aggressively and play around 3 Blossom for a win streak. This is a comp you can only play from far ahead with lots of HP and resources.', ja: 'Slam items aggressively and play around 3 Blossom for a win streak. This is a comp you can only play from far ahead with lots of HP and resources.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Continue your win streak. Pick an econ augment if you have not already. Otherwise, take item augments and push levels.', en: 'Continue your win streak. Pick an econ augment if you have not already. Otherwise, take item augments and push levels.', ja: 'Continue your win streak. Pick an econ augment if you have not already. Otherwise, take item augments and push levels.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'If you have 80+ HP, you can consider losing Stage 4 and focus purely on economy. Aim to Fast 9 by end of Stage 4 / 5-1 and transition your board.', en: 'If you have 80+ HP, you can consider losing Stage 4 and focus purely on economy. Aim to Fast 9 by end of Stage 4 / 5-1 and transition your board.', ja: 'If you have 80+ HP, you can consider losing Stage 4 and focus purely on economy. Aim to Fast 9 by end of Stage 4 / 5-1 and transition your board.' } }
    ],
    tips: [
      { ar: 'Slam items aggressively and play around 3 Blossom for a win streak. This is a comp you can only play from far ahead with lots of HP and resources.', en: 'Slam items aggressively and play around 3 Blossom for a win streak. This is a comp you can only play from far ahead with lots of HP and resources.', ja: 'Slam items aggressively and play around 3 Blossom for a win streak. This is a comp you can only play from far ahead with lots of HP and resources.' },
      { ar: 'Continue your win streak. Pick an econ augment if you have not already. Otherwise, take item augments and push levels.', en: 'Continue your win streak. Pick an econ augment if you have not already. Otherwise, take item augments and push levels.', ja: 'Continue your win streak. Pick an econ augment if you have not already. Otherwise, take item augments and push levels.' },
      { ar: 'If you have 80+ HP, you can consider losing Stage 4 and focus purely on economy. Aim to Fast 9 by end of Stage 4 / 5-1 and transition your board.', en: 'If you have 80+ HP, you can consider losing Stage 4 and focus purely on economy. Aim to Fast 9 by end of Stage 4 / 5-1 and transition your board.', ja: 'If you have 80+ HP, you can consider losing Stage 4 and focus purely on economy. Aim to Fast 9 by end of Stage 4 / 5-1 and transition your board.' }
    ],
    alternatives: [],
  },
  {
    slug: 'sprykin-teemo',
    name: { ar: 'مشاغب تيمو', en: 'Sprykin Teemo', ja: 'Sprykin Teemo' },
    subtitle: { ar: 'مشاغب تيمو إعادة لفّ', en: 'Sprykin Teemo Reroll', ja: 'Sprykin Teemo Reroll' },
    tier: 'C',
    difficulty: 1,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Open with a win streak Teemo start and itemize him ASAP. The more Teemo casts, the more likely you can collect value off his mushrooms. Level to 6 and roll for your 2* upgrades to stabilize and win st', en: 'Open with a win streak Teemo start and itemize him ASAP. The more Teemo casts, the more likely you can collect value off his mushrooms. Level to 6 and roll for your 2* upgrades to stabilize and win st', ja: 'Open with a win streak Teemo start and itemize him ASAP. The more Teemo casts, the more likely you can collect value off his mushrooms. Level to 6 and roll for your 2* upgrades to stabilize and win st' },
    units: [
      { champion: 'DA_18_Rammus', items: [], star: 1, row: 2, col: 4 },
      { champion: 'DA_Fiddlesticks18', items: [], star: 1, row: 2, col: 2 },
      { champion: 'DA_18_Veigar', items: [], star: 1, row: 3, col: 4 },
      { champion: 'DA_18_Teemo', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_RabadonsDeathcap', 'TFT_Item_JeweledGauntlet'], star: 3, row: 3, col: 6 },
      { champion: 'DA_KogMaw18_AD', items: ['TFT_Item_Morellonomicon'], star: 1, row: 3, col: 5 },
      { champion: 'DA_18_Kobuko', items: [], star: 3, row: 2, col: 3 },
      { champion: 'DA_18_RekSai', items: ['TFT_Item_GargoyleStoneplate', 'TFT_Item_WarmogsArmor'], star: 3, row: 0, col: 3 }
    ],
    earlyUnits: [
      'DA_18_Kobuko',
      'DA_18_Veigar',
      'DA_18_Teemo',
      'DA_18_RekSai',
    ],
    augments: [
      { id: 'DA_18_SprykinAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_TradeSector', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Open with a win streak Teemo start and itemize him ASAP. The more Teemo casts, the more likely you can collect value off his mushrooms.', en: 'Open with a win streak Teemo start and itemize him ASAP. The more Teemo casts, the more likely you can collect value off his mushrooms.', ja: 'Open with a win streak Teemo start and itemize him ASAP. The more Teemo casts, the more likely you can collect value off his mushrooms.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Level to 6 and roll for your 2* upgrades to stabilize and win streak Stage 3. Econ up and slow roll above 50g for 3*.', en: 'Level to 6 and roll for your 2* upgrades to stabilize and win streak Stage 3. Econ up and slow roll above 50g for 3*.', ja: 'Level to 6 and roll for your 2* upgrades to stabilize and win streak Stage 3. Econ up and slow roll above 50g for 3*.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Finish Teemo 3* and your tank then push levels for more Sprykins. Cap the board with Gnar or another 5 cost.', en: 'Finish Teemo 3* and your tank then push levels for more Sprykins. Cap the board with Gnar or another 5 cost.', ja: 'Finish Teemo 3* and your tank then push levels for more Sprykins. Cap the board with Gnar or another 5 cost.' } }
    ],
    tips: [
      { ar: 'Open with a win streak Teemo start and itemize him ASAP. The more Teemo casts, the more likely you can collect value off his mushrooms.', en: 'Open with a win streak Teemo start and itemize him ASAP. The more Teemo casts, the more likely you can collect value off his mushrooms.', ja: 'Open with a win streak Teemo start and itemize him ASAP. The more Teemo casts, the more likely you can collect value off his mushrooms.' },
      { ar: 'Level to 6 and roll for your 2* upgrades to stabilize and win streak Stage 3. Econ up and slow roll above 50g for 3*.', en: 'Level to 6 and roll for your 2* upgrades to stabilize and win streak Stage 3. Econ up and slow roll above 50g for 3*.', ja: 'Level to 6 and roll for your 2* upgrades to stabilize and win streak Stage 3. Econ up and slow roll above 50g for 3*.' },
      { ar: 'Finish Teemo 3* and your tank then push levels for more Sprykins. Cap the board with Gnar or another 5 cost.', en: 'Finish Teemo 3* and your tank then push levels for more Sprykins. Cap the board with Gnar or another 5 cost.', ja: 'Finish Teemo 3* and your tank then push levels for more Sprykins. Cap the board with Gnar or another 5 cost.' }
    ],
    alternatives: [],
  },
  {
    slug: 'spellweavers',
    name: { ar: 'برونز For حياة أهري', en: 'Bronze For Life Ahri', ja: 'Bronze For Life Ahri' },
    subtitle: { ar: 'برونز For حياة أهري', en: 'Bronze For Life Ahri', ja: 'Bronze For Life Ahri' },
    tier: 'C',
    difficulty: 2,
    playstyle: { ar: 'فاست 8', en: 'Fast 8', ja: 'Fast 8' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank. Flex in more Spellweavers + frontline as you get them. You can tank all kinds of f', en: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank. Flex in more Spellweavers + frontline as you get them. You can tank all kinds of f', ja: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank. Flex in more Spellweavers + frontline as you get them. You can tank all kinds of f' },
    units: [
      { champion: 'DA_18_Rakan', items: [], star: 1, row: 0, col: 4 },
      { champion: 'DA_18_Yorick', items: [], star: 1, row: 0, col: 5 },
      { champion: 'DA_Fiddlesticks18', items: [], star: 1, row: 0, col: 3 },
      { champion: 'DA_18_Lillia', items: ['TFT_Item_FrozenHeart'], star: 1, row: 0, col: 0 },
      { champion: 'DA_18_Ahri', items: ['TFT_Item_JeweledGauntlet', 'TFT_Item_SpearOfShojin'], star: 1, row: 3, col: 2 },
      { champion: 'DA_18_Sett', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_BrambleVest', 'TFT_Item_Redemption'], star: 1, row: 0, col: 2 },
      { champion: 'DA_18_Zyra', items: ['TFT_Item_StatikkShiv', 'TFT_Item_Morellonomicon', 'TFT_Item_SpearOfShojin'], star: 1, row: 3, col: 0 },
      { champion: 'DA_Taric18', items: [], star: 1, row: 0, col: 6 },
      { champion: 'DA_18_GnarSmall', items: ['TFT_Item_ThiefsGloves'], star: 1, row: 2, col: 3 }
    ],
    earlyUnits: [
      'DA_Karma18',
      'DA_18_Rakan',
      'DA_18_Yorick',
      'DA_18_Yunara',
    ],
    augments: [
      { id: 'DA_JeweledLotus_I', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_CyberneticUplink_Gold', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank.', en: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank.', ja: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Flex in more Spellweavers + frontline as you get them. You can tank all kinds of frontline: Juggernauts, Defenders, or Vanguards.', en: 'Flex in more Spellweavers + frontline as you get them. You can tank all kinds of frontline: Juggernauts, Defenders, or Vanguards.', ja: 'Flex in more Spellweavers + frontline as you get them. You can tank all kinds of frontline: Juggernauts, Defenders, or Vanguards.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level and roll for Ahri, Zyra, and the 4 Spellweavers. Play Cassio or LeBlanc until you find Alune.', en: 'Level and roll for Ahri, Zyra, and the 4 Spellweavers. Play Cassio or LeBlanc until you find Alune.', ja: 'Level and roll for Ahri, Zyra, and the 4 Spellweavers. Play Cassio or LeBlanc until you find Alune.' } }
    ],
    tips: [
      { ar: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank.', en: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank.', ja: 'Look for 3 Blossom early and play for win streak. Karma can hold items for Ahri. Itemize Yorick or any other 2* tank.' },
      { ar: 'Flex in more Spellweavers + frontline as you get them. You can tank all kinds of frontline: Juggernauts, Defenders, or Vanguards.', en: 'Flex in more Spellweavers + frontline as you get them. You can tank all kinds of frontline: Juggernauts, Defenders, or Vanguards.', ja: 'Flex in more Spellweavers + frontline as you get them. You can tank all kinds of frontline: Juggernauts, Defenders, or Vanguards.' },
      { ar: 'Level and roll for Ahri, Zyra, and the 4 Spellweavers. Play Cassio or LeBlanc until you find Alune.', en: 'Level and roll for Ahri, Zyra, and the 4 Spellweavers. Play Cassio or LeBlanc until you find Alune.', ja: 'Level and roll for Ahri, Zyra, and the 4 Spellweavers. Play Cassio or LeBlanc until you find Alune.' }
    ],
    alternatives: [],
  },
  {
    slug: 'aphelios-vanguards-copy',
    name: { ar: 'أفيليوس إلدروود', en: 'Aphelios Elderwood', ja: 'Aphelios Elderwood' },
    subtitle: { ar: 'إلدروود أفيليوس', en: 'Elderwood Aphelios', ja: 'Elderwood Aphelios' },
    tier: 'C',
    difficulty: 2,
    playstyle: { ar: 'فاست 8', en: 'Fast 8', ja: 'Fast 8' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win. Comp can use many items so take item augment if you don\'t have one yet. Mama Be', en: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win. Comp can use many items so take item augment if you don\'t have one yet. Mama Be', ja: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win. Comp can use many items so take item augment if you don\'t have one yet. Mama Be' },
    units: [
      { champion: 'DA_18_Diana', items: [], star: 1, row: 0, col: 4 },
      { champion: 'DA_18_Xayah', items: [], star: 1, row: 3, col: 6 },
      { champion: 'DA_18_Alistar', items: [], star: 1, row: 0, col: 5 },
      { champion: 'DA_18_Hecarim', items: ['TFT_Item_Crownguard', 'TFT_Item_WarmogsArmor', 'TFT_Item_SpectralGauntlet'], star: 1, row: 0, col: 2 },
      { champion: 'DA_18_Lillia', items: ['TFT_Item_FrozenHeart'], star: 1, row: 0, col: 0 },
      { champion: 'DA_18_Aphelios', items: ['TFT_Item_GuinsoosRageblade', 'TFT_Item_RunaansHurricane'], star: 1, row: 3, col: 0 },
      { champion: 'DA_18_GnarSmall', items: ['TFT_Item_ThiefsGloves'], star: 1, row: 1, col: 2 },
      { champion: 'DA_18_Ornn', items: [], star: 1, row: 1, col: 6 },
      { champion: 'DA_18_Ezreal', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_RapidFireCannon', 'TFT_Item_LastWhisper'], star: 1, row: 3, col: 1 }
    ],
    earlyUnits: [
      'DA_18_Varus',
      'DA_18_Ornn',
      'DA_18_Xayah',
      'DA_18_Shen',
    ],
    augments: [
      { id: 'DA_Swordsmith', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_Replication', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_BlackthornTraitAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.', en: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.', ja: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.', en: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.', ja: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level to 8 and roll for Aphelios and Ezreal, you should be stable with 7 elderwood and one of these 2 starred. Go 9 when stable for Gnar+Lux.', en: 'Level to 8 and roll for Aphelios and Ezreal, you should be stable with 7 elderwood and one of these 2 starred. Go 9 when stable for Gnar+Lux.', ja: 'Level to 8 and roll for Aphelios and Ezreal, you should be stable with 7 elderwood and one of these 2 starred. Go 9 when stable for Gnar+Lux.' } }
    ],
    tips: [
      { ar: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.', en: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.', ja: 'Open with a strong win streak AD tempo around Rapidfires. BIS is somewhat fake in this comp so slam aggressively to win.' },
      { ar: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.', en: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.', ja: 'Comp can use many items so take item augment if you don\'t have one yet. Mama Beak can be a strong carry here if you have Riftbeasts online.' },
      { ar: 'Level to 8 and roll for Aphelios and Ezreal, you should be stable with 7 elderwood and one of these 2 starred. Go 9 when stable for Gnar+Lux.', en: 'Level to 8 and roll for Aphelios and Ezreal, you should be stable with 7 elderwood and one of these 2 starred. Go 9 when stable for Gnar+Lux.', ja: 'Level to 8 and roll for Aphelios and Ezreal, you should be stable with 7 elderwood and one of these 2 starred. Go 9 when stable for Gnar+Lux.' }
    ],
    alternatives: [],
  },
  {
    slug: 'trait-ladder',
    name: { ar: 'خواص سلّم', en: 'Trait Ladder', ja: 'Trait Ladder' },
    subtitle: { ar: 'خواص سلّم', en: 'Trait Ladder', ja: 'Trait Ladder' },
    tier: 'C',
    difficulty: 3,
    playstyle: { ar: 'فاست 9', en: 'Fast 9', ja: 'Fast 9' },
    level: { ar: 'مستوى 9', en: 'Level 9', ja: 'レベル9' },
    summary: { ar: 'Ideally start with Khazix to get 10 takedowns ASAP. Add in the cheap 1-2 cost units to activate traits. Otherwise, flex around your best upgraded unit. Continue adding and flexing in more traits. +1 t', en: 'Ideally start with Khazix to get 10 takedowns ASAP. Add in the cheap 1-2 cost units to activate traits. Otherwise, flex around your best upgraded unit. Continue adding and flexing in more traits. +1 t', ja: 'Ideally start with Khazix to get 10 takedowns ASAP. Add in the cheap 1-2 cost units to activate traits. Otherwise, flex around your best upgraded unit. Continue adding and flexing in more traits. +1 t' },
    units: [
      { champion: 'DA_18_Ornn', items: [], star: 1, row: 0, col: 4 },
      { champion: 'DA_18_Rakan', items: [], star: 1, row: 0, col: 5 },
      { champion: 'DA_18_Xayah', items: [], star: 1, row: 3, col: 1 },
      { champion: 'DA_18_LeBlanc', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_RabadonsDeathcap'], star: 1, row: 3, col: 2 },
      { champion: 'DA_18_Diana', items: [], star: 1, row: 0, col: 2 },
      { champion: 'DA_18_KhaZix', items: [], star: 1, row: 0, col: 3 },
      { champion: 'DA_Fiddlesticks18', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_RedBuff', 'TFT_Item_Redemption'], star: 1, row: 0, col: 1 },
      { champion: 'DA_18_Aphelios', items: ['TFT_Item_GuinsoosRageblade', 'TFT_Item_RunaansHurricane', 'TFT_Item_LastWhisper'], star: 1, row: 3, col: 0 }
    ],
    earlyUnits: [
      'DA_18_Ornn',
      'DA_18_Varus',
      'DA_18_Shen',
      'DA_18_KhaZix',
    ],
    augments: [
      { id: 'DA_Swordsmith', tier: 'gold', why: { ar: 'اختيار مرن', en: 'Flexible pick', ja: '柔軟な選択' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Ideally start with Khazix to get 10 takedowns ASAP. Add in the cheap 1-2 cost units to activate traits. Otherwise, flex around your best upgraded unit.', en: 'Ideally start with Khazix to get 10 takedowns ASAP. Add in the cheap 1-2 cost units to activate traits. Otherwise, flex around your best upgraded unit.', ja: 'Ideally start with Khazix to get 10 takedowns ASAP. Add in the cheap 1-2 cost units to activate traits. Otherwise, flex around your best upgraded unit.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Continue adding and flexing in more traits. +1 team size augments like Coronation or Cursed Crown are very OP here.', en: 'Continue adding and flexing in more traits. +1 team size augments like Coronation or Cursed Crown are very OP here.', ja: 'Continue adding and flexing in more traits. +1 team size augments like Coronation or Cursed Crown are very OP here.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'After you hit 11 traits, add Amumu with the Tactician\'s Crown you get and then level for Kennen. Then pivot to 5 costs at level 9.', en: 'After you hit 11 traits, add Amumu with the Tactician\'s Crown you get and then level for Kennen. Then pivot to 5 costs at level 9.', ja: 'After you hit 11 traits, add Amumu with the Tactician\'s Crown you get and then level for Kennen. Then pivot to 5 costs at level 9.' } }
    ],
    tips: [
      { ar: 'Ideally start with Khazix to get 10 takedowns ASAP. Add in the cheap 1-2 cost units to activate traits. Otherwise, flex around your best upgraded unit.', en: 'Ideally start with Khazix to get 10 takedowns ASAP. Add in the cheap 1-2 cost units to activate traits. Otherwise, flex around your best upgraded unit.', ja: 'Ideally start with Khazix to get 10 takedowns ASAP. Add in the cheap 1-2 cost units to activate traits. Otherwise, flex around your best upgraded unit.' },
      { ar: 'Continue adding and flexing in more traits. +1 team size augments like Coronation or Cursed Crown are very OP here.', en: 'Continue adding and flexing in more traits. +1 team size augments like Coronation or Cursed Crown are very OP here.', ja: 'Continue adding and flexing in more traits. +1 team size augments like Coronation or Cursed Crown are very OP here.' },
      { ar: 'After you hit 11 traits, add Amumu with the Tactician\'s Crown you get and then level for Kennen. Then pivot to 5 costs at level 9.', en: 'After you hit 11 traits, add Amumu with the Tactician\'s Crown you get and then level for Kennen. Then pivot to 5 costs at level 9.', ja: 'After you hit 11 traits, add Amumu with the Tactician\'s Crown you get and then level for Kennen. Then pivot to 5 costs at level 9.' }
    ],
    alternatives: [],
  },
  {
    slug: 'solar-eclipse',
    name: { ar: 'شمسي كسوف', en: 'Solar Eclipse', ja: 'Solar Eclipse' },
    subtitle: { ar: 'شمسي أفيليوس', en: 'Solar Aphelios', ja: 'Solar Aphelios' },
    tier: 'C',
    difficulty: 3,
    playstyle: { ar: 'فاست 8', en: 'Fast 8', ja: 'Fast 8' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Play any tempo opener that can lead to Aphelios. Standard board is AD + upgraded frontline. Take the spatula off carousel for Lunar if possible. Hold copies of Solar on your bench. If you upgrade them', en: 'Play any tempo opener that can lead to Aphelios. Standard board is AD + upgraded frontline. Take the spatula off carousel for Lunar if possible. Hold copies of Solar on your bench. If you upgrade them', ja: 'Play any tempo opener that can lead to Aphelios. Standard board is AD + upgraded frontline. Take the spatula off carousel for Lunar if possible. Hold copies of Solar on your bench. If you upgrade them' },
    units: [
      { champion: 'DA_18_Leona', items: [], star: 1, row: 2, col: 3 },
      { champion: 'DA_18_Rakan', items: [], star: 1, row: 1, col: 2 },
      { champion: 'DA_18_Kayle', items: [], star: 1, row: 3, col: 5 },
      { champion: 'DA_18_Sejuani', items: [], star: 1, row: 1, col: 4 },
      { champion: 'DA_18_Shen', items: [], star: 1, row: 0, col: 3 },
      { champion: 'DA_18_Diana', items: [], star: 1, row: 1, col: 3 },
      { champion: 'DA_18_Aphelios', items: ['TFT_Item_RunaansHurricane', 'TFT_Item_GuinsoosRageblade', 'TFT_Item_LastWhisper'], star: 1, row: 3, col: 6 },
      { champion: 'DA_18_Lillia', items: ['TFT_Item_FrozenHeart', 'TFT_Item_AdaptiveHelm', 'TFT_Item_WarmogsArmor'], star: 1, row: 0, col: 4 }
    ],
    earlyUnits: [
      'DA_18_Camille',
      'DA_18_Leona',
      'DA_18_Akali_AD',
      'DA_18_Shen',
    ],
    augments: [
      { id: 'DA_18_SolarTraitAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Play any tempo opener that can lead to Aphelios. Standard board is AD + upgraded frontline. Take the spatula off carousel for Lunar if possible.', en: 'Play any tempo opener that can lead to Aphelios. Standard board is AD + upgraded frontline. Take the spatula off carousel for Lunar if possible.', ja: 'Play any tempo opener that can lead to Aphelios. Standard board is AD + upgraded frontline. Take the spatula off carousel for Lunar if possible.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Hold copies of Solar on your bench. If you upgrade them, play the Solar units as frontline. Kayle is quite weak so don\'t carry unless necessary.', en: 'Hold copies of Solar on your bench. If you upgrade them, play the Solar units as frontline. Kayle is quite weak so don\'t carry unless necessary.', ja: 'Hold copies of Solar on your bench. If you upgrade them, play the Solar units as frontline. Kayle is quite weak so don\'t carry unless necessary.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level to 8 and look for any frontline that can stall for Eclipse. Lillia 2 is the easiest to hit, but you can also tank Amumu, Sentinel, etc. ', en: 'Level to 8 and look for any frontline that can stall for Eclipse. Lillia 2 is the easiest to hit, but you can also tank Amumu, Sentinel, etc. ', ja: 'Level to 8 and look for any frontline that can stall for Eclipse. Lillia 2 is the easiest to hit, but you can also tank Amumu, Sentinel, etc. ' } }
    ],
    tips: [
      { ar: 'Play any tempo opener that can lead to Aphelios. Standard board is AD + upgraded frontline. Take the spatula off carousel for Lunar if possible.', en: 'Play any tempo opener that can lead to Aphelios. Standard board is AD + upgraded frontline. Take the spatula off carousel for Lunar if possible.', ja: 'Play any tempo opener that can lead to Aphelios. Standard board is AD + upgraded frontline. Take the spatula off carousel for Lunar if possible.' },
      { ar: 'Hold copies of Solar on your bench. If you upgrade them, play the Solar units as frontline. Kayle is quite weak so don\'t carry unless necessary.', en: 'Hold copies of Solar on your bench. If you upgrade them, play the Solar units as frontline. Kayle is quite weak so don\'t carry unless necessary.', ja: 'Hold copies of Solar on your bench. If you upgrade them, play the Solar units as frontline. Kayle is quite weak so don\'t carry unless necessary.' },
      { ar: 'Level to 8 and look for any frontline that can stall for Eclipse. Lillia 2 is the easiest to hit, but you can also tank Amumu, Sentinel, etc. ', en: 'Level to 8 and look for any frontline that can stall for Eclipse. Lillia 2 is the easiest to hit, but you can also tank Amumu, Sentinel, etc. ', ja: 'Level to 8 and look for any frontline that can stall for Eclipse. Lillia 2 is the easiest to hit, but you can also tank Amumu, Sentinel, etc. ' }
    ],
    alternatives: [],
  },
  {
    slug: 'fae-tristana-copy',
    name: { ar: 'شعار رينغار', en: 'Emblem Rengar', ja: 'Emblem Rengar' },
    subtitle: { ar: 'مشاغب عفريت رينغار', en: 'Sprykin Fae Rengar', ja: 'Sprykin Fae Rengar' },
    tier: 'C',
    difficulty: 2,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Play for win streak with Rengar and the emblem. Position him same side as enemy carries to get backline snipes. Keep snowballing with Rengar. Take an item augment if you aren\'t on track to get 3 items', en: 'Play for win streak with Rengar and the emblem. Position him same side as enemy carries to get backline snipes. Keep snowballing with Rengar. Take an item augment if you aren\'t on track to get 3 items', ja: 'Play for win streak with Rengar and the emblem. Position him same side as enemy carries to get backline snipes. Keep snowballing with Rengar. Take an item augment if you aren\'t on track to get 3 items' },
    units: [
      { champion: 'DA_18_Kobuko', items: [], star: 1, row: 2, col: 2 },
      { champion: 'DA_18_Rammus', items: ['TFT_Item_GargoyleStoneplate', 'TFT_Item_Redemption', 'TFT_Item_WarmogsArmor'], star: 3, row: 0, col: 4 },
      { champion: 'DA_18_Rengar', items: ['TFT_Item_GuardianAngel', 'TFT_Item_GuinsoosRageblade'], star: 3, row: 2, col: 6 },
      { champion: 'DA_18_Tristana', items: ['TFT_Item_GuinsoosRageblade', 'TFT_Item_LastWhisper', 'TFT_Item_Deathblade'], star: 3, row: 3, col: 6 },
      { champion: 'DA_18_Lillia', items: [], star: 1, row: 2, col: 1 },
      { champion: 'DA_18_Sivir', items: [], star: 1, row: 3, col: 4 },
      { champion: 'DA_18_GnarSmall', items: [], star: 1, row: 2, col: 3 }
    ],
    earlyUnits: [
      'DA_18_Rakan',
      'DA_18_Xayah',
      'DA_18_Yorick',
      'DA_18_Rengar',
    ],
    augments: [
      { id: 'DA_SpreadingRootsPlus', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Play for win streak with Rengar and the emblem. Position him same side as enemy carries to get backline snipes.', en: 'Play for win streak with Rengar and the emblem. Position him same side as enemy carries to get backline snipes.', ja: 'Play for win streak with Rengar and the emblem. Position him same side as enemy carries to get backline snipes.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Keep snowballing with Rengar. Take an item augment if you aren\'t on track to get 3 items by end of Stage. Rengar only performs as well as your best tank so prioritize frontline too.', en: 'Keep snowballing with Rengar. Take an item augment if you aren\'t on track to get 3 items by end of Stage. Rengar only performs as well as your best tank so prioritize frontline too.', ja: 'Keep snowballing with Rengar. Take an item augment if you aren\'t on track to get 3 items by end of Stage. Rengar only performs as well as your best tank so prioritize frontline too.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level to 7 and roll above 50g for 3* Rengar and 3* Rammus. Use your 4 Fae cash outs to push levels. Tristana takes leftover items.', en: 'Level to 7 and roll above 50g for 3* Rengar and 3* Rammus. Use your 4 Fae cash outs to push levels. Tristana takes leftover items.', ja: 'Level to 7 and roll above 50g for 3* Rengar and 3* Rammus. Use your 4 Fae cash outs to push levels. Tristana takes leftover items.' } }
    ],
    tips: [
      { ar: 'Play for win streak with Rengar and the emblem. Position him same side as enemy carries to get backline snipes.', en: 'Play for win streak with Rengar and the emblem. Position him same side as enemy carries to get backline snipes.', ja: 'Play for win streak with Rengar and the emblem. Position him same side as enemy carries to get backline snipes.' },
      { ar: 'Keep snowballing with Rengar. Take an item augment if you aren\'t on track to get 3 items by end of Stage. Rengar only performs as well as your best tank so prioritize frontline too.', en: 'Keep snowballing with Rengar. Take an item augment if you aren\'t on track to get 3 items by end of Stage. Rengar only performs as well as your best tank so prioritize frontline too.', ja: 'Keep snowballing with Rengar. Take an item augment if you aren\'t on track to get 3 items by end of Stage. Rengar only performs as well as your best tank so prioritize frontline too.' },
      { ar: 'Level to 7 and roll above 50g for 3* Rengar and 3* Rammus. Use your 4 Fae cash outs to push levels. Tristana takes leftover items.', en: 'Level to 7 and roll above 50g for 3* Rengar and 3* Rammus. Use your 4 Fae cash outs to push levels. Tristana takes leftover items.', ja: 'Level to 7 and roll above 50g for 3* Rengar and 3* Rammus. Use your 4 Fae cash outs to push levels. Tristana takes leftover items.' }
    ],
    alternatives: [],
  },
  {
    slug: 'inferno-fast-9',
    name: { ar: 'جحيم سريع', en: 'Inferno Fast 9', ja: 'Inferno Fast 9' },
    subtitle: { ar: 'جحيم لكس آش', en: 'Inferno Lux Ashe', ja: 'Inferno Lux Ashe' },
    tier: 'C',
    difficulty: 3,
    playstyle: { ar: 'فاست 8', en: 'Fast 8', ja: 'Fast 8' },
    level: { ar: 'مستوى 8', en: 'Level 8', ja: 'レベル8' },
    summary: { ar: 'Open with a strong AD opener, preferably around Yunara. Slam generic AD items and Tank items for a win streak. You can also play around Varus/Akali 2 with AD items. Level and add more Juggernauts and ', en: 'Open with a strong AD opener, preferably around Yunara. Slam generic AD items and Tank items for a win streak. You can also play around Varus/Akali 2 with AD items. Level and add more Juggernauts and ', ja: 'Open with a strong AD opener, preferably around Yunara. Slam generic AD items and Tank items for a win streak. You can also play around Varus/Akali 2 with AD items. Level and add more Juggernauts and ' },
    units: [
      { champion: 'DA_18_Akali_AD', items: [], star: 1, row: 1, col: 0 },
      { champion: 'DA_18_Shen', items: [], star: 1, row: 0, col: 1 },
      { champion: 'DA_Vi18', items: [], star: 1, row: 0, col: 2 },
      { champion: 'DA_18_Lillia', items: ['TFT_Item_FrozenHeart'], star: 1, row: 0, col: 6 },
      { champion: 'DA_18_Sivir', items: ['TFT_Item_LastWhisper', 'TFT_Item_InfinityEdge'], star: 1, row: 3, col: 4 },
      { champion: 'DA_Amumu18', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_BrambleVest', 'TFT_Item_DragonsClaw'], star: 1, row: 0, col: 4 },
      { champion: 'DA_18_Ashe', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_RapidFireCannon'], star: 1, row: 3, col: 6 },
      { champion: 'DA_18_Kennen', items: ['TFT_Item_GuardianAngel', 'TFT_Item_Quicksilver', 'TFT_Item_Bloodthirster'], star: 1, row: 0, col: 3 },
      { champion: 'DA_Lux18_Base', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_RabadonsDeathcap', 'TFT_Item_JeweledGauntlet'], star: 1, row: 3, col: 0 }
    ],
    earlyUnits: [
      'DA_Karma18',
      'DA_18_Rakan',
      'DA_18_Yorick',
      'DA_18_Yunara',
    ],
    augments: [
      { id: 'DA_CyberneticUplink_Gold', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } },
      { id: 'DA_BoxingLessons', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Open with a strong AD opener, preferably around Yunara. Slam generic AD items and Tank items for a win streak. You can also play around Varus/Akali 2 with AD items.', en: 'Open with a strong AD opener, preferably around Yunara. Slam generic AD items and Tank items for a win streak. You can also play around Varus/Akali 2 with AD items.', ja: 'Open with a strong AD opener, preferably around Yunara. Slam generic AD items and Tank items for a win streak. You can also play around Varus/Akali 2 with AD items.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Level and add more Juggernauts and Executioners. Make sure to hold Inferno units along the way. Can also play 3 Inferno for shop high rolls.', en: 'Level and add more Juggernauts and Executioners. Make sure to hold Inferno units along the way. Can also play 3 Inferno for shop high rolls.', ja: 'Level and add more Juggernauts and Executioners. Make sure to hold Inferno units along the way. Can also play 3 Inferno for shop high rolls.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Roll on 8 for 5 inferno Sivir + Vi + Lillia + Hunter (can play Tristana before Ashe). When you find Ashe make sure to give her inferno emblem + shojin.', en: 'Roll on 8 for 5 inferno Sivir + Vi + Lillia + Hunter (can play Tristana before Ashe). When you find Ashe make sure to give her inferno emblem + shojin.', ja: 'Roll on 8 for 5 inferno Sivir + Vi + Lillia + Hunter (can play Tristana before Ashe). When you find Ashe make sure to give her inferno emblem + shojin.' } }
    ],
    tips: [
      { ar: 'Open with a strong AD opener, preferably around Yunara. Slam generic AD items and Tank items for a win streak. You can also play around Varus/Akali 2 with AD items.', en: 'Open with a strong AD opener, preferably around Yunara. Slam generic AD items and Tank items for a win streak. You can also play around Varus/Akali 2 with AD items.', ja: 'Open with a strong AD opener, preferably around Yunara. Slam generic AD items and Tank items for a win streak. You can also play around Varus/Akali 2 with AD items.' },
      { ar: 'Level and add more Juggernauts and Executioners. Make sure to hold Inferno units along the way. Can also play 3 Inferno for shop high rolls.', en: 'Level and add more Juggernauts and Executioners. Make sure to hold Inferno units along the way. Can also play 3 Inferno for shop high rolls.', ja: 'Level and add more Juggernauts and Executioners. Make sure to hold Inferno units along the way. Can also play 3 Inferno for shop high rolls.' },
      { ar: 'Roll on 8 for 5 inferno Sivir + Vi + Lillia + Hunter (can play Tristana before Ashe). When you find Ashe make sure to give her inferno emblem + shojin.', en: 'Roll on 8 for 5 inferno Sivir + Vi + Lillia + Hunter (can play Tristana before Ashe). When you find Ashe make sure to give her inferno emblem + shojin.', ja: 'Roll on 8 for 5 inferno Sivir + Vi + Lillia + Hunter (can play Tristana before Ashe). When you find Ashe make sure to give her inferno emblem + shojin.' }
    ],
    alternatives: [],
  },
  {
    slug: 'moo-nara',
    name: { ar: 'Moo nara', en: 'Moo-nara', ja: 'Moo-nara' },
    subtitle: { ar: 'أليستار يونارا إعادة لفّ', en: 'Alistar Yunara Reroll', ja: 'Alistar Yunara Reroll' },
    tier: 'C',
    difficulty: 2,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Slam items for Yunara and play for win streak with Blossom in. Tank Yorick / Juggernaut until you find Alistar. Level at 3-2 and roll for 2* upgrades then econ up. Skip Azir 2 because he\'s too expensi', en: 'Slam items for Yunara and play for win streak with Blossom in. Tank Yorick / Juggernaut until you find Alistar. Level at 3-2 and roll for 2* upgrades then econ up. Skip Azir 2 because he\'s too expensi', ja: 'Slam items for Yunara and play for win streak with Blossom in. Tank Yorick / Juggernaut until you find Alistar. Level at 3-2 and roll for 2* upgrades then econ up. Skip Azir 2 because he\'s too expensi' },
    units: [
      { champion: 'DA_18_RekSai', items: [], star: 1, row: 2, col: 5 },
      { champion: 'DA_Murkwolf18', items: [], star: 3, row: 2, col: 3 },
      { champion: 'DA_18_Alistar', items: ['TFT_Item_GargoyleStoneplate', 'TFT_Item_Redemption', 'TFT_Item_WarmogsArmor'], star: 3, row: 0, col: 3 },
      { champion: 'DA_18_Warwick', items: ['TFT_Item_SteraksGage', 'TFT_Item_TitansResolve', 'TFT_Item_SpearOfShojin'], star: 3, row: 2, col: 0 },
      { champion: 'DA_18_Yunara', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_LastWhisper'], star: 3, row: 3, col: 0 },
      { champion: 'DA_18_Azir', items: [], star: 1, row: 3, col: 3 },
      { champion: 'DA_18_Ezreal', items: [], star: 1, row: 3, col: 2 }
    ],
    earlyUnits: [
      'DA_Karma18',
      'DA_18_Yorick',
      'DA_18_Yunara',
      'DA_18_Azir',
    ],
    augments: [
      { id: 'DA_Swordsmith', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Slam items for Yunara and play for win streak with Blossom in. Tank Yorick / Juggernaut until you find Alistar.', en: 'Slam items for Yunara and play for win streak with Blossom in. Tank Yorick / Juggernaut until you find Alistar.', ja: 'Slam items for Yunara and play for win streak with Blossom in. Tank Yorick / Juggernaut until you find Alistar.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Level at 3-2 and roll for 2* upgrades then econ up. Skip Azir 2 because he\'s too expensive. Buy a charm every round if possible and win streak.', en: 'Level at 3-2 and roll for 2* upgrades then econ up. Skip Azir 2 because he\'s too expensive. Buy a charm every round if possible and win streak.', ja: 'Level at 3-2 and roll for 2* upgrades then econ up. Skip Azir 2 because he\'s too expensive. Buy a charm every round if possible and win streak.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Finish your 3* units then push levels. Look for 3 Executioner for Yunara. Kennen caps your board. Blackthorn Lux is a high roll top end finisher.', en: 'Finish your 3* units then push levels. Look for 3 Executioner for Yunara. Kennen caps your board. Blackthorn Lux is a high roll top end finisher.', ja: 'Finish your 3* units then push levels. Look for 3 Executioner for Yunara. Kennen caps your board. Blackthorn Lux is a high roll top end finisher.' } }
    ],
    tips: [
      { ar: 'Slam items for Yunara and play for win streak with Blossom in. Tank Yorick / Juggernaut until you find Alistar.', en: 'Slam items for Yunara and play for win streak with Blossom in. Tank Yorick / Juggernaut until you find Alistar.', ja: 'Slam items for Yunara and play for win streak with Blossom in. Tank Yorick / Juggernaut until you find Alistar.' },
      { ar: 'Level at 3-2 and roll for 2* upgrades then econ up. Skip Azir 2 because he\'s too expensive. Buy a charm every round if possible and win streak.', en: 'Level at 3-2 and roll for 2* upgrades then econ up. Skip Azir 2 because he\'s too expensive. Buy a charm every round if possible and win streak.', ja: 'Level at 3-2 and roll for 2* upgrades then econ up. Skip Azir 2 because he\'s too expensive. Buy a charm every round if possible and win streak.' },
      { ar: 'Finish your 3* units then push levels. Look for 3 Executioner for Yunara. Kennen caps your board. Blackthorn Lux is a high roll top end finisher.', en: 'Finish your 3* units then push levels. Look for 3 Executioner for Yunara. Kennen caps your board. Blackthorn Lux is a high roll top end finisher.', ja: 'Finish your 3* units then push levels. Look for 3 Executioner for Yunara. Kennen caps your board. Blackthorn Lux is a high roll top end finisher.' }
    ],
    alternatives: [],
  },
  {
    slug: 'coven-elise',
    name: { ar: 'اجتماع السحرة إليز', en: 'Coven Elise', ja: 'Coven Elise' },
    subtitle: { ar: 'مظلم طقوس إليز إعادة لفّ', en: 'Dark Ritual Elise Reroll', ja: 'Dark Ritual Elise Reroll' },
    tier: 'C',
    difficulty: 2,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Ideally open with Coven and start gathering Essence. It is actually better to win early than lose for stacks so don\'t overly force lose streak. Level to 6 and roll for a Elise 2, Covens, and Vanguards', en: 'Ideally open with Coven and start gathering Essence. It is actually better to win early than lose for stacks so don\'t overly force lose streak. Level to 6 and roll for a Elise 2, Covens, and Vanguards', ja: 'Ideally open with Coven and start gathering Essence. It is actually better to win early than lose for stacks so don\'t overly force lose streak. Level to 6 and roll for a Elise 2, Covens, and Vanguards' },
    units: [
      { champion: 'DA_18_Elise', items: ['TFT_Item_TitansResolve', 'TFT_Item_GuinsoosRageblade', 'TFT_Item_GargoyleStoneplate'], star: 3, row: 0, col: 4 },
      { champion: 'DA_18_Diana', items: [], star: 1, row: 1, col: 3 },
      { champion: 'DA_18_Hecarim', items: [], star: 1, row: 2, col: 3 },
      { champion: 'DA_18_Cassiopeia', items: ['TFT_Item_SpearOfShojin', 'TFT_Item_HextechGunblade', 'TFT_Item_ArchangelsStaff'], star: 3, row: 3, col: 6 },
      { champion: 'DA_Sentinel18', items: [], star: 1, row: 1, col: 4 },
      { champion: 'DA_18_Morgana', items: ['TFT_Item_StatikkShiv', 'TFT_Item_Morellonomicon', 'TFT_Item_JeweledGauntlet'], star: 1, row: 2, col: 4 },
      { champion: 'DA_18_Alune', items: [], star: 1, row: 3, col: 5 }
    ],
    earlyUnits: [
      'DA_18_Camille',
      'DA_18_Caitlyn',
      'DA_18_Elise',
      'DA_18_Diana',
    ],
    augments: [
      { id: 'DA_18_CovenTraitAugment', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Ideally open with Coven and start gathering Essence. It is actually better to win early than lose for stacks so don\'t overly force lose streak.', en: 'Ideally open with Coven and start gathering Essence. It is actually better to win early than lose for stacks so don\'t overly force lose streak.', ja: 'Ideally open with Coven and start gathering Essence. It is actually better to win early than lose for stacks so don\'t overly force lose streak.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Level to 6 and roll for a Elise 2, Covens, and Vanguards. Give Cassio or Diana leftover AP. Cash out Coven and convert to AP with at least 2-3 lives (25-30 hp). ', en: 'Level to 6 and roll for a Elise 2, Covens, and Vanguards. Give Cassio or Diana leftover AP. Cash out Coven and convert to AP with at least 2-3 lives (25-30 hp). ', ja: 'Level to 6 and roll for a Elise 2, Covens, and Vanguards. Give Cassio or Diana leftover AP. Cash out Coven and convert to AP with at least 2-3 lives (25-30 hp). ' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Finish Elise 3 / Cassio 3 then level for more Vanguards or Lunar. Play 2 Morganas with items if you have extra.', en: 'Finish Elise 3 / Cassio 3 then level for more Vanguards or Lunar. Play 2 Morganas with items if you have extra.', ja: 'Finish Elise 3 / Cassio 3 then level for more Vanguards or Lunar. Play 2 Morganas with items if you have extra.' } }
    ],
    tips: [
      { ar: 'Ideally open with Coven and start gathering Essence. It is actually better to win early than lose for stacks so don\'t overly force lose streak.', en: 'Ideally open with Coven and start gathering Essence. It is actually better to win early than lose for stacks so don\'t overly force lose streak.', ja: 'Ideally open with Coven and start gathering Essence. It is actually better to win early than lose for stacks so don\'t overly force lose streak.' },
      { ar: 'Level to 6 and roll for a Elise 2, Covens, and Vanguards. Give Cassio or Diana leftover AP. Cash out Coven and convert to AP with at least 2-3 lives (25-30 hp). ', en: 'Level to 6 and roll for a Elise 2, Covens, and Vanguards. Give Cassio or Diana leftover AP. Cash out Coven and convert to AP with at least 2-3 lives (25-30 hp). ', ja: 'Level to 6 and roll for a Elise 2, Covens, and Vanguards. Give Cassio or Diana leftover AP. Cash out Coven and convert to AP with at least 2-3 lives (25-30 hp). ' },
      { ar: 'Finish Elise 3 / Cassio 3 then level for more Vanguards or Lunar. Play 2 Morganas with items if you have extra.', en: 'Finish Elise 3 / Cassio 3 then level for more Vanguards or Lunar. Play 2 Morganas with items if you have extra.', ja: 'Finish Elise 3 / Cassio 3 then level for more Vanguards or Lunar. Play 2 Morganas with items if you have extra.' }
    ],
    alternatives: [],
  },
  {
    slug: 'unrivaled-reroll',
    name: { ar: 'بلا منافس إعادة لفّ', en: 'Unrivaled Reroll', ja: 'Unrivaled Reroll' },
    subtitle: { ar: 'بلا منافس كازيكس إعادة لفّ', en: 'Unrivaled Kha\'Zix Reroll', ja: 'Unrivaled Kha\'Zix Reroll' },
    tier: 'C',
    difficulty: 3,
    playstyle: { ar: 'إعادة لفّ', en: 'Reroll', ja: 'リロール' },
    level: { ar: 'مستوى 7 إعادة لفّ', en: 'Level 7 reroll', ja: 'レベル7リロール' },
    summary: { ar: 'Items are crucial for this composition so focus on Edge of Night first. Play any upgraded frontline tank to stall for Khazix + Rengar. Keep adding more frontline. Rengar and Khazix will only be effect', en: 'Items are crucial for this composition so focus on Edge of Night first. Play any upgraded frontline tank to stall for Khazix + Rengar. Keep adding more frontline. Rengar and Khazix will only be effect', ja: 'Items are crucial for this composition so focus on Edge of Night first. Play any upgraded frontline tank to stall for Khazix + Rengar. Keep adding more frontline. Rengar and Khazix will only be effect' },
    units: [
      { champion: 'DA_18_LeBlanc', items: [], star: 1, row: 3, col: 6 },
      { champion: 'DA_18_Diana', items: [], star: 1, row: 3, col: 5 },
      { champion: 'DA_18_Hecarim', items: ['TFT_Item_WarmogsArmor', 'TFT_Item_GargoyleStoneplate', 'TFT_Item_Redemption'], star: 3, row: 0, col: 3 },
      { champion: 'DA_18_KhaZix', items: ['TFT_Item_UnstableConcoction', 'TFT_Item_RabadonsDeathcap', 'TFT_Item_GuardianAngel'], star: 3, row: 2, col: 1 },
      { champion: 'DA_18_Rengar', items: ['TFT_Item_GuardianAngel', 'TFT_Item_TitansResolve', 'TFT_Item_GuinsoosRageblade'], star: 3, row: 2, col: 0 },
      { champion: 'DA_18_Ezreal', items: [], star: 1, row: 3, col: 1 },
      { champion: 'DA_18_Aphelios', items: ['TFT_Item_LastWhisper', 'TFT_Item_RapidFireCannon'], star: 1, row: 3, col: 0 }
    ],
    earlyUnits: [
      'DA_18_Kobuko',
      'DA_18_RekSai',
      'DA_18_KhaZix',
      'DA_18_Rengar',
    ],
    augments: [
      { id: 'DA_Swordsmith', tier: 'gold', why: { ar: 'قوي مع هذا الخط', en: 'Strong for this line', ja: 'この構成向き' } }
    ],
    leveling: [
      { stage: { ar: '2-1', en: '2-1', ja: '2-1' }, text: { ar: 'Items are crucial for this composition so focus on Edge of Night first. Play any upgraded frontline tank to stall for Khazix + Rengar.', en: 'Items are crucial for this composition so focus on Edge of Night first. Play any upgraded frontline tank to stall for Khazix + Rengar.', ja: 'Items are crucial for this composition so focus on Edge of Night first. Play any upgraded frontline tank to stall for Khazix + Rengar.' } },
      { stage: { ar: '3-2', en: '3-2', ja: '3-2' }, text: { ar: 'Keep adding more frontline. Rengar and Khazix will only be effective as your best tank. Item augments are huge to keep your momentum.', en: 'Keep adding more frontline. Rengar and Khazix will only be effective as your best tank. Item augments are huge to keep your momentum.', ja: 'Keep adding more frontline. Rengar and Khazix will only be effective as your best tank. Item augments are huge to keep your momentum.' } },
      { stage: { ar: '4-2', en: '4-2', ja: '4-2' }, text: { ar: 'Level to 7 and roll for the 2* upgrades. Then econ up and slow roll above 50g for 3* units. Once you finish 3* tank + Khazix 3 / Rengar 3, add 5 costs.', en: 'Level to 7 and roll for the 2* upgrades. Then econ up and slow roll above 50g for 3* units. Once you finish 3* tank + Khazix 3 / Rengar 3, add 5 costs.', ja: 'Level to 7 and roll for the 2* upgrades. Then econ up and slow roll above 50g for 3* units. Once you finish 3* tank + Khazix 3 / Rengar 3, add 5 costs.' } }
    ],
    tips: [
      { ar: 'Items are crucial for this composition so focus on Edge of Night first. Play any upgraded frontline tank to stall for Khazix + Rengar.', en: 'Items are crucial for this composition so focus on Edge of Night first. Play any upgraded frontline tank to stall for Khazix + Rengar.', ja: 'Items are crucial for this composition so focus on Edge of Night first. Play any upgraded frontline tank to stall for Khazix + Rengar.' },
      { ar: 'Keep adding more frontline. Rengar and Khazix will only be effective as your best tank. Item augments are huge to keep your momentum.', en: 'Keep adding more frontline. Rengar and Khazix will only be effective as your best tank. Item augments are huge to keep your momentum.', ja: 'Keep adding more frontline. Rengar and Khazix will only be effective as your best tank. Item augments are huge to keep your momentum.' },
      { ar: 'Level to 7 and roll for the 2* upgrades. Then econ up and slow roll above 50g for 3* units. Once you finish 3* tank + Khazix 3 / Rengar 3, add 5 costs.', en: 'Level to 7 and roll for the 2* upgrades. Then econ up and slow roll above 50g for 3* units. Once you finish 3* tank + Khazix 3 / Rengar 3, add 5 costs.', ja: 'Level to 7 and roll for the 2* upgrades. Then econ up and slow roll above 50g for 3* units. Once you finish 3* tank + Khazix 3 / Rengar 3, add 5 costs.' }
    ],
    alternatives: [],
  }
];
