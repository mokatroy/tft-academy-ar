import championsJson from '../data/champions.json';
import traitsJson from '../data/traits.json';
import itemsJson from '../data/items.json';
import augmentsJson from '../data/augments.json';
import metaJson from '../data/meta.json';
import { comps } from '../data/comps';
import type { Augment, Champion, Comp, CompUnit, Item, Tier, Trait } from './types';
import { breakpoints } from './format';

export const champions = championsJson as Champion[];
export const traits = traitsJson as Trait[];
export const items = itemsJson as unknown as Item[];
export { comps };
export const augments = augmentsJson as Augment[];
export const meta = metaJson;

export const championMap = new Map(champions.map((champion) => [champion.id, champion]));
export const traitMap = new Map(traits.map((trait) => [trait.name, trait]));
export const itemMap = new Map(items.map((item) => [item.id, item]));
export const augmentMap = new Map(augments.map((augment) => [augment.id, augment]));
export const compMap = new Map(comps.map((comp) => [comp.slug, comp]));

export function getComp(slug: string | undefined): Comp | undefined {
  return slug ? compMap.get(slug) : undefined;
}

export const tierStyles: Record<Tier, { color: string; glow: string; label: string }> = {
  S: { color: '#f5c451', glow: 'rgba(245,196,81,.35)', label: 'أسطوري' },
  A: { color: '#c084fc', glow: 'rgba(192,132,252,.3)', label: 'قوي' },
  B: { color: '#38bdf8', glow: 'rgba(56,189,248,.28)', label: 'متوازن' },
  C: { color: '#94a3b8', glow: 'rgba(148,163,184,.22)', label: 'ظرفي' },
};

export const costColors: Record<number, string> = {
  1: '#9aa4b2',
  2: '#3fbf7f',
  3: '#3b9ae1',
  4: '#b45cf0',
  5: '#f0b232',
};

export function costLabel(cost: number): string {
  return `${cost} ${cost === 1 ? 'ذهبة' : 'ذهب'}`;
}

export interface CompTrait {
  name: string;
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
    for (const traitName of new Set(champion.traits)) {
      counts.set(traitName, (counts.get(traitName) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([name, count]) => {
      const trait = traitMap.get(name);
      const steps = trait ? breakpoints(trait) : [];
      const next = steps.find((step) => step > count) ?? null;
      return {
        name,
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

export function formatTraitDescription(trait: Trait): string {
  return trait.desc
    .replace(/\\n/g, ' ')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/?row>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/@[^@]+@/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
