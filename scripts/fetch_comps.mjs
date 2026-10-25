#!/usr/bin/env node
/**
 * Pull the Set 18 comps tier list from TFT Academy and merge it into the site dataset.
 *
 *   https://tftacademy.com/tierlist/comps
 *
 * Outputs (all regenerated from scratch, so the script is idempotent):
 *   src/data/compsAcademy.ts    the 36 published comps, tri-lingual
 *   src/data/itemsExtra.json    items referenced by those comps but missing locally
 *   src/data/augmentsExtra.json augments referenced by those comps but missing locally
 *   src/data/championsExtra.json champions referenced by those comps but missing locally
 *
 * Text lives in scripts/comps-i18n/*.json (ar/ja authored by hand, en copied from the guide),
 * names/descriptions/icons come from CommunityDragon, and ids are resolved to whatever the
 * site already uses (TFT_Item_* first, then the guide's own DA_* id).
 *
 * Run with: npm run fetch-comps
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = path.join(ROOT, 'scripts', '.cache');
const DATA = path.join(ROOT, 'src', 'data');
const I18N_DIR = path.join(ROOT, 'scripts', 'comps-i18n');
const PUBLIC = path.join(ROOT, 'public');

const GAME = 'https://raw.communitydragon.org/latest/game/';
const TFTA_COMPS = 'https://tftacademy.com/tierlist/comps';
const LOCALES = ['ar_ae', 'en_us', 'ja_jp'];
const LOCALE_KEY = { ar_ae: 'ar', en_us: 'en', ja_jp: 'ja' };

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const writeJson = (file, value) => fs.writeFileSync(file, `${JSON.stringify(value, null, 0)}\n`, 'utf8');

async function cachedText(name, url) {
  fs.mkdirSync(CACHE, { recursive: true });
  const file = path.join(CACHE, name);
  if (fs.existsSync(file) && fs.statSync(file).size > 0) return fs.readFileSync(file, 'utf8');
  const res = await fetch(url, { headers: { 'user-agent': 'mokatroy-tft-site/1.0' } });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  const body = await res.text();
  fs.writeFileSync(file, body, 'utf8');
  return body;
}

/* ------------------------------------------------------------------ devalue */

/** SvelteKit serialises route data with devalue: containers are stored in place,
 *  every member is an index into the same table, and numbers at the top level are
 *  literal values (they can only be reached through a reference). */
function decodeTable(table) {
  const memo = new Map();
  const decode = (index) => {
    if (memo.has(index)) return memo.get(index);
    const value = table[index];
    if (Array.isArray(value)) {
      const out = [];
      memo.set(index, out);
      for (const ref of value) out.push(decode(ref));
      return out;
    }
    if (value && typeof value === 'object') {
      const out = {};
      memo.set(index, out);
      for (const [key, ref] of Object.entries(value)) out[key] = decode(ref);
      return out;
    }
    return value;
  };
  return decode(0);
}

/* ------------------------------------------------------------------ helpers */

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

function stripHtml(text) {
  return String(text ?? '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/?row>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/@[^@]+@/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function iconUrl(iconPath) {
  if (!iconPath || iconPath.startsWith('{')) return null;
  return iconPath.endsWith('.tex') ? GAME + iconPath.slice(0, -4) + '.png' : GAME + iconPath;
}

async function saveImage(url, dest) {
  if (!url || fs.existsSync(dest)) return fs.existsSync(dest);
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'mokatroy-tft-site/1.0' } });
    if (!res.ok) return false;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    return true;
  } catch {
    return false;
  }
}

/** TFT Academy writes "DA_GuinsoosRageblade"/"DA_Component_X"; the site stores "TFT_Item_*"
 *  ids, and several of those are legacy ids under a renamed item (GuardianAngel is now
 *  Edge of Night). Prefer the site's id, then a same-named item, then the guide's own id. */
function resolveItemId(apiName, knownItems, nameIndexes, cdragonNames) {
  const candidate = apiName.startsWith('DA_Component_')
    ? `TFT_Item_${apiName.slice('DA_Component_'.length)}`
    : apiName.startsWith('DA_')
      ? `TFT_Item_${apiName.slice(3)}`
      : apiName;
  if (knownItems.has(candidate)) return candidate;
  const names = cdragonNames.get(apiName) || {};
  for (const locale of ['en_us', 'ar_ae', 'ja_jp']) {
    const name = String(names[LOCALE_KEY[locale]] ?? '').trim().toLowerCase();
    const byName = name ? nameIndexes[locale].get(name) : null;
    if (byName) return byName;
  }
  if (cdragonNames.has(apiName)) return apiName;
  if (cdragonNames.has(candidate)) return candidate;
  return null;
}

/** Many guide ids are aliases of an item that carries the actual text, so fall back to
 *  the first entry with the same display name in that locale. */
function buildTextIndex(localeItems) {
  const index = new Map();
  for (const item of localeItems) {
    const name = String(item.name || '').trim().toLowerCase();
    if (item.desc && name && !index.has(name)) index.set(name, item);
  }
  return index;
}

/** Some guide augment ids are legacy aliases; fall back to a cdragon augment with the
 *  same tail (DA_CursedCrown -> TFT7_Augment_CursedCrown). */
function tailIndex(items) {
  const index = new Map();
  for (const item of items) {
    if (!item.isAugment) continue;
    const tail = item.apiName.split('_').pop().toLowerCase();
    if (!index.has(tail)) index.set(tail, item.apiName);
  }
  return index;
}

/** Augment ids rarely encode their tier; only claim one when it is unambiguous. */
function inferAugmentTier(apiName) {
  if (/TraitAugment/i.test(apiName)) return 'gold';
  if (/III$|Prism/i.test(apiName)) return 'prism';
  if (/II$|Gold/i.test(apiName)) return 'gold';
  if (/I$|Silver/i.test(apiName)) return 'silver';
  return null;
}

const DIFFICULTY = { EASY: 1, MEDIUM: 2, HARD: 3, CONDITIONAL: 2 };

const PLAYSTYLE = {
  'Fast 9': { ar: 'صعود سريع للمستوى 9', en: 'Fast 9', ja: '速やかにレベル9' },
  '4-Cost Fast 8': { ar: 'مستوى 8 سريع بأربعة ذهب', en: '4-cost fast 8', ja: '4コストで速やかにレベル8' },
  '3-Cost Reroll': { ar: 'إعادة رول بثلاث ذهب', en: '3-cost reroll', ja: '3コスト リロール' },
  '2-Cost Reroll': { ar: 'إعادة رول بذهبتين', en: '2-cost reroll', ja: '2コスト リロール' },
  '1-Cost Reroll': { ar: 'إعادة رول بذهبة واحدة', en: '1-cost reroll', ja: '1コスト リロール' },
  'Lose Streak': { ar: 'خسارة متتالية', en: 'Lose streak', ja: '連敗スタート' },
};

const LEVEL_BY_STYLE = { 'Fast 9': 9, '4-Cost Fast 8': 8, '3-Cost Reroll': 8, '2-Cost Reroll': 7, '1-Cost Reroll': 7, 'Lose Streak': 8 };

const AUGMENT_TYPE = {
  ECON: { ar: 'اقتصاد', en: 'Economy', ja: '経済' },
  ITEMS: { ar: 'عناصر', en: 'Items', ja: 'アイテム' },
  COMBAT: { ar: 'قتال', en: 'Combat', ja: '戦闘' },
  EMBLEM: { ar: 'شارات', en: 'Emblems', ja: 'エンブレム' },
};

const UPGRADE_NOTE = {
  flex8: { ar: 'خانة مرنة عند المستوى 8', en: 'Flexible slot at level 8', ja: '8レベルの柔軟なスロット' },
  flex9: { ar: 'خانة مرنة عند المستوى 9', en: 'Flexible slot at level 9', ja: '9レベルの柔軟なスロット' },
  flex: { ar: 'خانة مرنة عند الترقيات المتأخرة', en: 'Flexible slot in the late game', ja: '終盤の柔軟なスロット' },
  late: { ar: 'تطوير نهائي عند نهاية اللعبة', en: 'Late-game upgrade', ja: '終盤のアップグレード' },
};

/** Two guide ids that CommunityDragon stores under a different name. */
const AUGMENT_ALIAS = {
  DA_18_RiftbeastTraitAugmentStampede: 'DA_18_RiftbeastTraitAugment',
  DA_NestingDolls: 'DA_NestingAnvils',
};

/** Elderwood plants: listed by TFT Academy on the board but absent from CommunityDragon,
 *  so they are named after Riot's own trait text in the three locales. */
const PLANTED_SUMMONS = {
  DA_Elderwood18_StonebarkTree: { ar: 'شجرة صخرية', en: 'Stonebark Tree', ja: 'ストーンバークの木' },
  DA_Elderwood18_Lifeblossom: { ar: 'برعم حياة', en: 'Lifebloom', ja: 'ライフブロッサム' },
  DA_Elderwood18_Protector: { ar: 'حامي أعماق الغاب', en: 'Deepwood Protector', ja: 'ディープウッド プロテクター' },
};

/* --------------------------------------------------------------------- main */

async function main() {
  const localItems = readJson(path.join(DATA, 'items.json'));
  const knownItems = new Set(localItems.map((item) => item.id));
  /** Legacy ids get renamed (GuardianAngel is now Edge of Night), so match on display name too. */
  const nameIndexes = Object.fromEntries(
    LOCALES.map((locale) => {
      const key = LOCALE_KEY[locale];
      const index = new Map();
      for (const item of localItems) index.set(String(item.name[key] ?? '').trim().toLowerCase(), item.id);
      return [locale, index];
    }),
  );
  const knownAugments = new Set(readJson(path.join(DATA, 'augments.json')).map((augment) => augment.id));
  const knownChampions = new Set(readJson(path.join(DATA, 'champions.json')).map((champion) => champion.id));

  const cdragon = {};
  for (const locale of LOCALES) {
    cdragon[locale] = readJson(path.join(CACHE, `tft_${locale}.json`));
  }
  const cdragonItems = new Map();
  for (const item of cdragon.ar_ae.items) cdragonItems.set(item.apiName, item);
  const cdragonNames = new Map();
  for (const locale of LOCALES) {
    for (const item of cdragon[locale].items) {
      const entry = cdragonNames.get(item.apiName) || {};
      entry[LOCALE_KEY[locale]] = item.name;
      cdragonNames.set(item.apiName, entry);
    }
  }
  const itemByLocale = LOCALES.map((locale) => new Map(cdragon[locale].items.map((item) => [item.apiName, item])));
  const textByLocale = LOCALES.map((locale) => buildTextIndex(cdragon[locale].items));

  /** name + description + effects for an id, falling back to a same-named alias. */
  const localizeItem = (id, fallback, localeIndex) => {
    const own = itemByLocale[localeIndex].get(id) || fallback;
    const alias = textByLocale[localeIndex].get(String(own.name || '').trim().toLowerCase());
    const text = own.desc ? own : alias || own;
    return {
      name: own.name || fallback.name || id,
      desc: stripHtml(text.desc ?? ''),
      effects: own.effects && Object.keys(own.effects).length > 0 ? own.effects : text.effects || {},
    };
  };

  const html = await cachedText('tfta-comps.html', TFTA_COMPS);
  const data = JSON.parse(await cachedText('tfta-comps.json', `${TFTA_COMPS}/__data.json`));
  const guides = decodeTable(data.nodes[2].data).guides;

  const shownSlugs = [...html.matchAll(/href="\/tierlist\/comps\/(set-18[^"]*)"/g)].map((match) => match[1]);
  const bySlug = new Map(guides.filter((guide) => guide.compSlug).map((guide) => [guide.compSlug, guide]));
  const shown = shownSlugs.map((slug) => bySlug.get(slug)).filter(Boolean);
  if (shown.length === 0) throw new Error('no comps found on the TFT Academy tier list');

  const i18n = {};
  if (fs.existsSync(I18N_DIR)) {
    for (const file of fs.readdirSync(I18N_DIR).filter((name) => name.endsWith('.json')).sort()) {
      Object.assign(i18n, readJson(path.join(I18N_DIR, file)));
    }
  }

  // ---- resolve every referenced id -------------------------------------
  const usedItems = new Set();
  const usedAugments = new Set();
  const usedChampions = new Set();
  const collect = (guide) => {
    const units = [...(guide.finalComp || []), ...(guide.earlyComp || []), ...(guide.maxCap || []), ...(guide.altBuilds || [])];
    for (const unit of units) usedChampions.add(unit.apiName);
    for (const unit of units) for (const item of unit.items || []) usedItems.add(item);
    for (const item of guide.carousel || []) usedItems.add(item.apiName);
    for (const augment of guide.augments || []) usedAugments.add(augment.apiName);
  };
  shown.forEach(collect);

  // Resolve each guide id, and walk into item components so emblem/spatula recipes resolve too.
  const itemIdMap = new Map();
  const pendingIds = new Set();
  const queue = [...usedItems];
  while (queue.length > 0) {
    const apiName = queue.pop();
    if (itemIdMap.has(apiName)) continue;
    const id = resolveItemId(apiName, knownItems, nameIndexes, cdragonNames);
    if (id) itemIdMap.set(apiName, id);
    if (!id || knownItems.has(id) || pendingIds.has(id)) continue;
    pendingIds.add(id);
    for (const part of cdragonItems.get(id)?.composition || []) queue.push(part);
  }

  const missingCdragon = [...usedItems].filter((id) => !itemIdMap.get(id));
  const augmentTails = tailIndex(cdragon.ar_ae.items);
  const augmentIdMap = new Map();
  for (const apiName of usedAugments) {
    const target = AUGMENT_ALIAS[apiName] ?? apiName;
    let id = knownAugments.has(target) ? target : null;
    if (!id && cdragonItems.get(target)?.isAugment) id = target;
    if (!id) id = augmentTails.get(target.split('_').pop().toLowerCase()) || null;
    if (id) augmentIdMap.set(apiName, id);
  }
  const missingAugments = [...usedAugments].filter((id) => !augmentIdMap.get(id));
  const missingChampions = [...usedChampions].filter((id) => !knownChampions.has(id) && !PLANTED_SUMMONS[id]);

  // ---- items ------------------------------------------------------------
  const itemsExtra = [];
  for (const id of [...pendingIds].sort()) {
    if (knownItems.has(id)) continue;
    const base = cdragonItems.get(id);
    if (!base) continue;
    const entry = {
      id,
      name: {},
      desc: {},
      icon: null,
      components: (base.composition || []).map((part) => itemIdMap.get(part) ?? resolveItemId(part, knownItems, nameIndexes, cdragonNames) ?? part),
      effects: base.effects || {},
      kind: 'completed',
    };
    LOCALES.forEach((locale, index) => {
      const key = LOCALE_KEY[locale];
      const localized = localizeItem(id, base, index);
      entry.name[key] = localized.name;
      entry.desc[key] = localized.desc;
      if (Object.keys(entry.effects).length === 0) entry.effects = localized.effects;
    });
    const url = iconUrl(base.icon || '');
    const iconPath = `/items/${slugify(id)}.png`;
    entry.icon = (await saveImage(url, path.join(PUBLIC, iconPath.slice(1)))) ? iconPath : null;
    itemsExtra.push(entry);
  }

  // ---- augments ---------------------------------------------------------
  const augmentsExtra = [];
  for (const apiName of [...new Set(augmentIdMap.values())].sort()) {
    if (knownAugments.has(apiName)) continue;
    const base = cdragonItems.get(apiName);
    if (!base?.isAugment) continue;
    const entry = { id: apiName, name: {}, desc: {}, effects: base.effects || {}, icon: null };
    LOCALES.forEach((locale, index) => {
      const key = LOCALE_KEY[locale];
      const localized = localizeItem(apiName, base, index);
      entry.name[key] = localized.name;
      entry.desc[key] = localized.desc;
      if (Object.keys(entry.effects).length === 0) entry.effects = localized.effects;
    });
    const url = iconUrl(base.icon || '');
    const iconPath = `/augments/${slugify(apiName)}.png`;
    entry.icon = (await saveImage(url, path.join(PUBLIC, iconPath.slice(1)))) ? iconPath : null;
    augmentsExtra.push(entry);
  }

  // ---- champions --------------------------------------------------------
  const championsExtra = [];
  for (const id of [...usedChampions].sort()) {
    if (knownChampions.has(id)) continue;
    if (PLANTED_SUMMONS[id]) {
      championsExtra.push({
        id,
        name: PLANTED_SUMMONS[id],
        cost: 1,
        traits: [],
        icon: null,
        ability: { name: { ...PLANTED_SUMMONS[id] }, desc: { ar: '', en: '', ja: '' }, variables: [] },
        stats: {},
        role: '',
      });
      continue;
    }
    for (const locale of LOCALES) {
      const set = cdragon[locale].sets['18'];
      const champ = set.champions.find((entry) => entry.apiName === id);
      if (!champ) continue;
      const entry = {
        id,
        name: {},
        cost: champ.cost,
        traits: [],
        icon: null,
        ability: { name: {}, desc: {}, variables: champ.ability?.variables || [] },
        stats: champ.stats || {},
        role: champ.role || '',
      };
      for (const other of LOCALES) {
        const key = LOCALE_KEY[other];
        const match = cdragon[other].sets['18'].champions.find((entry) => entry.apiName === id) || champ;
        entry.name[key] = match.name;
        entry.ability.name[key] = match.ability?.name || '';
        entry.ability.desc[key] = stripHtml(match.ability?.desc || '');
      }
      const url = iconUrl(champ.squareIcon || champ.icon || '');
      const iconPath = `/champions/${slugify(id)}.png`;
      entry.icon = (await saveImage(url, path.join(PUBLIC, iconPath.slice(1)))) ? iconPath : null;
      championsExtra.push(entry);
      break;
    }
  }

  // ---- comps ------------------------------------------------------------
  const problems = [];
  const comps = shown.map((guide, position) => {
    const text = i18n[guide.compSlug];
    if (!text) problems.push(`${guide.compSlug}: missing scripts/comps-i18n entry`);

    const style = PLAYSTYLE[guide.style] ?? { ar: guide.style, en: guide.style, ja: guide.style };
    const level = LEVEL_BY_STYLE[guide.style] ?? 8;
    const sourceTips = (guide.tips || []).filter((tip) => tip.tip);

    const units = (guide.finalComp || [])
      .map((unit) => ({
        champion: unit.apiName,
        items: (unit.items || []).map((item) => itemIdMap.get(item.apiName ?? item)).filter(Boolean),
        star: Math.min(Math.max(unit.stars || 1, 1), 3),
        row: 3 - Math.floor(unit.boardIndex / 7),
        col: unit.boardIndex % 7,
      }))
      .sort((a, b) => b.row - a.row || a.col - b.col);

    const early = (guide.earlyComp || []).map((unit) => ({
      champion: unit.apiName,
      items: (unit.items || []).map((item) => itemIdMap.get(item)).filter(Boolean),
      star: Math.min(Math.max(unit.stars || 1, 1), 3),
    }));

    const altBuilds = (guide.altBuilds || [])
      .map((unit) => ({
        champion: unit.apiName,
        items: (unit.items || []).map((item) => itemIdMap.get(item)).filter(Boolean),
      }))
      .filter((build) => build.items.length > 0);

    const alternatives = (guide.maxCap || []).map((upgrade) => {
      const predecessor = (upgrade.predecessors || [])[0] || null;
      const known = predecessor && knownChampions.has(predecessor);
      const note = predecessor === 'TFT_Flex_Lv8' ? UPGRADE_NOTE.flex8 : predecessor === 'TFT_Flex_Lv9' ? UPGRADE_NOTE.flex9 : known ? UPGRADE_NOTE.late : UPGRADE_NOTE.flex;
      return { champion: upgrade.apiName, replaces: known ? predecessor : undefined, note };
    });

    const i18nTips = text?.tips || [];
    const leveling = sourceTips.map((tip, index) => {
      const stage = tip.stage.replace(/\D+/g, '');
      const label = {
        ar: `المرحلة ${stage}`,
        en: tip.stage,
        ja: `ステージ${stage}`,
      };
      const translated = i18nTips[index];
      if (!translated?.ar || !translated?.ja) problems.push(`${guide.compSlug}: stage tip ${index + 1} untranslated`);
      return { stage: label, text: { ar: translated?.ar ?? tip.tip, en: tip.tip, ja: translated?.ja ?? tip.tip } };
    });

    const augmentTip = text?.augmentTip;
    if (guide.augmentsTip && (!augmentTip?.ar || !augmentTip?.ja)) problems.push(`${guide.compSlug}: augment tip untranslated`);

    const summary = text?.summary;
    if (!summary?.ar || !summary?.en || !summary?.ja) problems.push(`${guide.compSlug}: missing summary`);
    if (!text?.name?.ar || !text?.name?.ja) problems.push(`${guide.compSlug}: missing name`);
    if (!text?.subtitle?.ar || !text?.subtitle?.ja) problems.push(`${guide.compSlug}: missing subtitle`);

    return {
      slug: guide.compSlug,
      name: { ar: text?.name?.ar ?? guide.title, en: guide.title, ja: text?.name?.ja ?? guide.title },
      subtitle: { ar: text?.subtitle?.ar ?? guide.metaTitle, en: guide.metaTitle, ja: text?.subtitle?.ja ?? guide.metaTitle },
      tier: guide.tier,
      difficulty: DIFFICULTY[guide.difficulty] ?? 2,
      playstyle: style,
      level: { ar: `مستوى ${level}`, en: `Level ${level}`, ja: `レベル${level}` },
      summary: { ar: summary?.ar ?? '', en: summary?.en ?? guide.augmentsTip, ja: summary?.ja ?? '' },
      units,
      augments: (guide.augments || [])
        .filter((augment) => !augment.disabled)
        .map((augment) => {
          const id = augmentIdMap.get(augment.apiName);
          if (!id || augment.disabled) return null;
          const tier = inferAugmentTier(augment.apiName);
          return tier ? { id, tier } : { id };
        })
        .filter(Boolean),
      leveling,
      tips: guide.augmentsTip && augmentTip?.ar && augmentTip?.ja ? [{ ar: augmentTip.ar, en: guide.augmentsTip, ja: augmentTip.ja }] : [],
      alternatives,
      carousel: (guide.carousel || []).map((item) => itemIdMap.get(item.apiName)).filter(Boolean),
      early,
      altBuilds,
      augmentTypes: (guide.augmentTypes || []).map((type) => AUGMENT_TYPE[type]).filter(Boolean),
      source: `${TFTA_COMPS}/${guide.compSlug}`,
      position,
    };
  });

  for (const [apiName, id] of itemIdMap) if (!id) problems.push(`item ${apiName} not found in CommunityDragon`);
  for (const id of missingCdragon) void id;
  for (const id of missingAugments) problems.push(`augment ${id} not found in CommunityDragon`);
  for (const id of missingChampions) problems.push(`champion ${id} not found in CommunityDragon`);

  const ts = `import type { Comp } from '../lib/types';

/**
 * Set 18 comps imported from TFT Academy's tier list (https://tftacademy.com/tierlist/comps).
 * Generated by \`npm run fetch-comps\` — text comes from scripts/comps-i18n/, everything
 * else from the guide and CommunityDragon. Each comp keeps its source link.
 */
export const academyComps: Comp[] = ${JSON.stringify(comps.map(({ position, ...comp }) => comp), null, 2)};
`;
  fs.writeFileSync(path.join(DATA, 'compsAcademy.ts'), ts, 'utf8');
  writeJson(path.join(DATA, 'itemsExtra.json'), itemsExtra);
  writeJson(path.join(DATA, 'augmentsExtra.json'), augmentsExtra);
  writeJson(path.join(DATA, 'championsExtra.json'), championsExtra);

  console.log(`comps: ${comps.length}`);
  console.log(`extra items: ${itemsExtra.length}, augments: ${augmentsExtra.length}, champions: ${championsExtra.length}`);
  if (problems.length) {
    console.log(`\n${problems.length} problem(s):`);
    for (const problem of problems) console.log(`  - ${problem}`);
    process.exitCode = 1;
  } else {
    console.log('all comps fully translated');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
