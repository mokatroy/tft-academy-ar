import metaRaw from '../data/set19.meta.json';
import traitsRaw from '../data/set19.traits.json';
import championsRaw from '../data/set19.champions.json';
import itemsRaw from '../data/set19.items.json';
import championNames from '../data/set19Names.json';
import { traitText } from '../data/set19.traits.i18n';
import { itemText } from '../data/set19.items.i18n';
import { abilityNameText } from '../data/set19.champs.i18n';
import type { Localized } from './types';

export type Set19TraitType = 'class' | 'origin' | 'unique';

interface RawTrait {
  id: string;
  name: string;
  type: string;
  breakpoints: number[];
  desc: string;
  effects: string[];
}

interface RawChampion {
  id: string;
  name: string;
  cost: number;
  role: string;
  traits: string[];
  ability: { name: string; desc: string; mana: string | null };
  stats: {
    hp: number | null;
    damage: number | null;
    attackSpeed: number | null;
    armor: number | null;
    magicResist: number | null;
    range: number | null;
  };
  recommendedItems: string[];
}

interface RawItem {
  id: string;
  name: string;
  type: string;
  desc: string;
  stats: Record<string, number> | null;
  trait: string | null;
  composition: string[];
}

interface Set19Data {
  set: number;
  name: string;
  patch: string;
  source: string;
  fetched: string;
  traits: RawTrait[];
  champions: RawChampion[];
  items: RawItem[];
  augmentSummary: { total: number; silver: number; gold: number; prismatic: number; hero: number };
}

const data = {
  ...metaRaw,
  traits: traitsRaw,
  champions: championsRaw,
  items: itemsRaw,
} as Set19Data;
const names = championNames as Record<string, { ar: string; ja: string }>;

export interface Set19Champion {
  id: string;
  name: Localized;
  cost: number;
  role: string;
  traits: string[];
  ability: { name: Localized; desc: Localized; mana: string | null };
  stats: RawChampion['stats'];
  icon: string;
}

export interface Set19Trait {
  id: string;
  name: Localized;
  type: Set19TraitType;
  breakpoints: number[];
  desc: Localized;
  champions: string[];
  icon: string;
}

export interface Set19Item {
  id: string;
  name: Localized;
  type: string;
  desc: Localized;
  stats: Record<string, number> | null;
  icon: string;
}

export const set19Meta = {
  set: data.set,
  name: data.name,
  patch: data.patch,
  source: data.source,
  fetched: data.fetched,
  augmentSummary: data.augmentSummary,
  title: {
    ar: 'جولة الألماس',
    en: 'Prismatic Tour',
    ja: 'プリズマティック・ツアー',
  } as Localized,
};

const traitTypeValues: Set19TraitType[] = ['class', 'origin', 'unique'];

export const set19Traits: Set19Trait[] = data.traits.map((trait) => {
  const text = traitText[trait.id];
  const breakpoints = [...new Set(trait.breakpoints)].sort((a, b) => a - b);
  return {
    id: trait.id,
    name: { ar: text?.name.ar ?? trait.name, en: trait.name, ja: text?.name.ja ?? trait.name },
    type: (traitTypeValues.includes(trait.type as Set19TraitType) ? trait.type : 'unique') as Set19TraitType,
    breakpoints,
    desc: { ar: text?.desc.ar ?? trait.desc, en: trait.desc, ja: text?.desc.ja ?? trait.desc },
    champions: [],
    icon: `https://assets.tftacademy.com/traits/${trait.id}.webp`,
  };
});

export const set19Champions: Set19Champion[] = data.champions.map((champion) => {
  const localeName = names[champion.name];
  const abilityName = abilityNameText[champion.id];
  return {
    id: champion.id,
    name: {
      ar: localeName?.ar ?? champion.name,
      en: champion.name,
      ja: localeName?.ja ?? champion.name,
    },
    cost: champion.cost,
    role: champion.role,
    traits: champion.traits,
    ability: {
      name: {
        ar: abilityName?.ar ?? champion.ability.name,
        en: champion.ability.name,
        ja: abilityName?.ja ?? champion.ability.name,
      },
      desc: { ar: champion.ability.desc, en: champion.ability.desc, ja: champion.ability.desc },
      mana: champion.ability.mana,
    },
    stats: champion.stats,
    icon: `https://assets.tftacademy.com/champions/champion_icons/${champion.id}.webp`,
  };
});

export const set19Items: Set19Item[] = data.items
  .filter((item) => item.type === 'components' || item.type === 'craftables')
  .map((item) => {
    const text = itemText[item.id];
    return {
      id: item.id,
      name: { ar: text?.name.ar ?? item.name, en: item.name, ja: text?.name.ja ?? item.name },
      type: item.type,
      desc: { ar: text?.desc.ar ?? item.desc, en: item.desc, ja: text?.desc.ja ?? item.desc },
      stats: item.stats,
      icon: `https://assets.tftacademy.com/items/${item.id}.webp`,
    };
  });

const byTrait = new Map<string, string[]>();
for (const champion of set19Champions) {
  for (const traitId of champion.traits) {
    const list = byTrait.get(traitId) ?? [];
    list.push(champion.id);
    byTrait.set(traitId, list);
  }
}
for (const trait of set19Traits) trait.champions = byTrait.get(trait.id) ?? [];

export const set19TraitMap = new Map(set19Traits.map((trait) => [trait.id, trait]));
export const set19ChampionMap = new Map(set19Champions.map((champion) => [champion.id, champion]));

export function set19TraitName(id: string, locale: keyof Localized): string {
  const trait = set19TraitMap.get(id);
  return trait ? trait.name[locale] : id;
}
