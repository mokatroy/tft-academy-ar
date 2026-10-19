import championsJson from '../data/champions.json';
import traitsJson from '../data/traits.json';
import itemsJson from '../data/items.json';
import augmentsJson from '../data/augments.json';
import metaJson from '../data/meta.json';
import { comps } from '../data/comps';
import type {
  Augment,
  Champion,
  Comp,
  CompUnit,
  Item,
  Localized,
  Tier,
  Trait,
} from './types';
import { breakpoints } from './format';

export const champions = championsJson as Champion[];
export const traits = traitsJson as Trait[];
export const items = itemsJson as unknown as Item[];
export { comps };
export const augments = augmentsJson as Augment[];
export const meta = metaJson as {
  set: number;
  setName: Localized;
  patch: string;
  updated: Localized;
  source: string;
};

export const championMap = new Map(champions.map((champion) => [champion.id, champion]));
/** Traits are keyed by stable id (DA_18_Elderwood). */
export const traitMap = new Map(traits.map((trait) => [trait.id, trait]));
export const itemMap = new Map(items.map((item) => [item.id, item]));
export const augmentMap = new Map(augments.map((augment) => [augment.id, augment]));
export const compMap = new Map(comps.map((comp) => [comp.slug, comp]));

export function getComp(slug: string | undefined): Comp | undefined {
  return slug ? compMap.get(slug) : undefined;
}

export const tierStyles: Record<Tier, { color: string; glow: string; label: Localized }> = {
  S: {
    color: '#f5c451',
    glow: 'rgba(245,196,81,.35)',
    label: { ar: 'أسطوري', en: 'Legendary', ja: 'レジェンダリー' },
  },
  A: {
    color: '#c084fc',
    glow: 'rgba(192,132,252,.3)',
    label: { ar: 'قوي', en: 'Strong', ja: '強力' },
  },
  B: {
    color: '#38bdf8',
    glow: 'rgba(56,189,248,.28)',
    label: { ar: 'متوازن', en: 'Balanced', ja: 'バランス' },
  },
  C: {
    color: '#94a3b8',
    glow: 'rgba(148,163,184,.22)',
    label: { ar: 'ظرفي', en: 'Situational', ja: '状況次第' },
  },
};

export const costColors: Record<number, string> = {
  1: '#9aa4b2',
  2: '#3fbf7f',
  3: '#3b9ae1',
  4: '#b45cf0',
  5: '#f0b232',
};

export function costLabel(cost: number, locale: 'ar' | 'en' | 'ja' = 'en'): string {
  if (locale === 'ar') return `${cost} ${cost === 1 ? 'ذهبة' : 'ذهب'}`;
  if (locale === 'ja') return `${cost} コスト`;
  return `${cost} ${cost === 1 ? 'gold' : 'gold'}`;
}

export interface CompTrait {
  id: string;
  name: Localized;
  count: number;
  breakpoints: number[];
  active: boolean;
  nextBreakpoint: number | null;
  trait?: Trait;
}

export function compTraits(comp: Comp): CompTrait[] {
  const counts = new Map<string, number>();
  for (const unit of comp.units) {
    const champion = championMap.get(unit.champion);
    if (!champion) continue;
    for (const traitId of new Set(champion.traits)) {
      counts.set(traitId, (counts.get(traitId) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([id, count]) => {
      const trait = traitMap.get(id);
      const steps = trait ? breakpoints(trait) : [];
      const next = steps.find((step) => step > count) ?? null;
      return {
        id,
        name: trait?.name ?? { ar: id, en: id, ja: id },
        count,
        breakpoints: steps,
        active: steps.length > 0 && count >= steps[0],
        nextBreakpoint: next,
        trait,
      };
    })
    .sort((a, b) => {
      if (a.active !== b.active) return a.active ? -1 : 1;
      return b.count - a.count;
    });
}

export function championBuild(championId: string): { items: string[]; comps: Comp[] } {
  const itemCounts = new Map<string, number>();
  const related: Comp[] = [];
  for (const comp of comps) {
    const unit = comp.units.find((entry) => entry.champion === championId);
    if (!unit) continue;
    related.push(comp);
    for (const item of unit.items) itemCounts.set(item, (itemCounts.get(item) ?? 0) + 1);
  }
  return {
    items: [...itemCounts.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id).slice(0, 3),
    comps: related,
  };
}

export function unitAt(comp: Comp, row: number, col: number): CompUnit | undefined {
  return comp.units.find((unit) => unit.row === row && unit.col === col);
}

export function compPower(comp: Comp): number {
  const weights: Record<Tier, number> = { S: 4, A: 3, B: 2, C: 1 };
  return weights[comp.tier];
}

export function formatTraitDescription(trait: Trait, locale: 'ar' | 'en' | 'ja' = 'en'): string {
  return (trait.desc[locale] || trait.desc.en || '')
    .replace(/\\n/g, ' ')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/?row>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/@[^@]+@/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
