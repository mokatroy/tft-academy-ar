// Pulls the Set 19 (Prismatic Tour, PBE) dataset from TFT Academy's public asset API
// and writes src/data/set19.json plus icons under public/set19/.
// Usage: node scripts/fetch_set19.mjs   (or: npm run fetch-set19)
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SET = 19;
const ORIGIN = 'https://tftacademy.com';
const ASSETS = 'https://assets.tftacademy.com';
const OUT = path.join(process.cwd(), 'src', 'data', 'set19.json');
const PUBLIC = path.join(process.cwd(), 'public', 'set19');

/** Strip in-game markup (<stat type="ap">12%</stat>, <br>, …) down to readable text. */
function plain(text) {
  return String(text ?? '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/?[a-z]+[^>]*>/gi, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Replace @Var@ placeholders using the ability's variable table when present. */
function withValues(text, variables) {
  if (!text || !Array.isArray(variables)) return text;
  return text.replace(/@([A-Za-z0-9_]+)@/g, (match, name) => {
    const entry = variables.find((v) => v.name === name);
    if (!entry || !Array.isArray(entry.value) || entry.value.length === 0) return match;
    return entry.value.map((n) => (Number.isInteger(n) ? n : Number(n.toFixed(2)))).join('/');
  });
}

async function api(kind) {
  const response = await fetch(`${ORIGIN}/api/assets/${kind}?set=${SET}`);
  if (!response.ok) throw new Error(`asset api ${kind}: HTTP ${response.status}`);
  return response.json();
}

async function download(url, file) {
  const response = await fetch(url);
  if (!response.ok) return false;
  const buffer = Buffer.from(await response.arrayBuffer());
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, buffer);
  return true;
}

const [championData, traitData, itemData, augmentData] = await Promise.all([
  api('champions'),
  api('traits'),
  api('items'),
  api('augments'),
]);

// --- traits -----------------------------------------------------------------
const traits = traitData.traits
  .filter((trait) => trait.set === SET)
  .map((trait) => ({
    id: trait.apiName,
    name: plain(trait.name),
    type: trait.type,
    breakpoints: trait.breakpoints ?? [],
    desc: plain(trait.description),
    effects: (trait.effects ?? []).map(plain),
  }));

// --- champions --------------------------------------------------------------
// The asset API returns trait record ids on each champion; translate them to the
// stable trait apiNames the rest of the data uses.
const traitNameById = new Map(traitData.traits.map((trait) => [trait.id, trait.apiName]));

// System units (cost 0) and non-playable monsters are dropped; duplicate Akali
// skins are kept because both are real board units.
const champions = championData.champions
  .filter((champion) => champion.set === SET && champion.cost > 0)
  .map((champion) => ({
    id: champion.apiName,
    name: plain(champion.name),
    cost: champion.cost,
    role: plain(champion.role),
    traits: (champion.traits ?? []).map((id) => traitNameById.get(id) ?? id),
    ability: {
      name: plain(champion.abilityName),
      desc: plain(withValues(champion.ability, champion.stats?.variables)),
      mana: champion.stats?.mana != null ? `${champion.stats?.initialMana ?? 0} / ${champion.stats.mana}` : null,
    },
    stats: {
      hp: champion.stats?.hp ?? null,
      damage: champion.stats?.damage ?? null,
      attackSpeed: champion.stats?.as ?? null,
      armor: champion.stats?.ar ?? null,
      magicResist: champion.stats?.mr ?? null,
      range: champion.stats?.range ?? null,
    },
    recommendedItems: (champion.recommendedItems ?? []).map((item) =>
      typeof item === 'string' ? item : (item?.apiName ?? item?.name ?? ''),
    ),
  }))
  .sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name));

// --- items ------------------------------------------------------------------
const ITEM_KINDS = ['components', 'craftables', 'radiants', 'ornns', 'emblems', 'supports', 'others'];
const items = itemData.items
  .filter((item) => item.set === SET && ITEM_KINDS.includes(item.type))
  .map((item) => ({
    id: item.apiName,
    name: plain(item.name),
    type: item.type,
    desc: plain(item.description),
    stats: item.stats ?? null,
    trait: item.trait || null,
    composition: item.composition ?? [],
  }))
  .sort((a, b) => ITEM_KINDS.indexOf(a.type) - ITEM_KINDS.indexOf(b.type) || a.name.localeCompare(b.name));

// --- augments (counts only; the full list lands with the live release) ------
const augments = augmentData.augments.filter((augment) => augment.set === SET);
const augmentSummary = {
  total: augments.length,
  silver: augments.filter((a) => a.tier === 1).length,
  gold: augments.filter((a) => a.tier === 2).length,
  prismatic: augments.filter((a) => a.tier === 3).length,
  hero: augments.filter((a) => /HeroAugment/i.test(a.apiName)).length,
};

const data = {
  set: SET,
  name: 'Prismatic Tour',
  patch: 'PBE 18.7',
  source: 'https://tftacademy.com/learn/new-set',
  fetched: new Date().toISOString().slice(0, 10),
  traits,
  champions,
  items,
  augmentSummary,
};

await writeFile(OUT, `${JSON.stringify(data, null, 1)}\n`);

// --- icons ------------------------------------------------------------------
let downloaded = 0;
let missing = [];
for (const champion of champions) {
  const file = path.join(PUBLIC, 'champions', `${champion.id}.webp`);
  if (await download(`${ASSETS}/champions/champion_icons/${champion.id}.webp`, file)) downloaded++;
  else missing.push(champion.id);
}
for (const trait of traits) {
  const file = path.join(PUBLIC, 'traits', `${trait.id}.webp`);
  if (await download(`${ASSETS}/traits/${trait.id}.webp`, file)) downloaded++;
  else missing.push(trait.id);
}
for (const item of items) {
  if (!['components', 'craftables', 'radiants', 'ornns'].includes(item.type)) continue;
  const file = path.join(PUBLIC, 'items', `${item.id}.webp`);
  if (await download(`${ASSETS}/items/${item.id}.webp`, file)) downloaded++;
  else missing.push(item.id);
}

console.log(
  `set19: ${traits.length} traits, ${champions.length} champions, ${items.length} items, ` +
    `${augmentSummary.total} augments; ${downloaded} icons${missing.length ? `, missing: ${missing.slice(0, 8).join(', ')}` : ''}`,
);
