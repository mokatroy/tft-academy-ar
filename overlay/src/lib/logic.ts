import type { Champion, Comp, Localized, Tier, Trait } from '../../../src/lib/types';

export const TIER_WEIGHT: Record<Tier, number> = { S: 4, A: 3, B: 2, C: 1 };
export const TIER_COLORS: Record<Tier, string> = {
  S: '#f5c451',
  A: '#c084fc',
  B: '#38bdf8',
  C: '#94a3b8',
};

/** Rolled-up trait breakpoints, e.g. Elderwood 3 / 5 / 7. */
export function breakpoints(trait: Trait | undefined): number[] {
  if (!trait) return [];
  const values = trait.effects
    .map((effect) => effect.minUnits)
    .filter((value): value is number => typeof value === 'number' && value > 0 && value < 100);
  return [...new Set(values)].sort((a, b) => a - b);
}

export interface TraitCount {
  id: string;
  name: Localized;
  count: number;
  steps: number[];
  active: boolean;
  next: number | null;
}

/** Counts traits over a board, using stable trait ids so it is locale-free. */
export function traitCounts(
  units: { champion: string }[],
  championMap: Map<string, Champion>,
  traitMap: Map<string, Trait>,
): TraitCount[] {
  const counts = new Map<string, number>();
  for (const unit of units) {
    const champion = championMap.get(unit.champion);
    if (!champion) continue;
    for (const id of new Set(champion.traits)) {
      counts.set(id, (counts.get(id) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([id, count]) => {
      const trait = traitMap.get(id);
      const steps = breakpoints(trait);
      return {
        id,
        name: trait?.name ?? { ar: id, en: id, ja: id },
        count,
        steps,
        active: steps.length > 0 && count >= steps[0],
        next: steps.find((step) => step > count) ?? null,
      };
    })
    .sort((a, b) => {
      if (a.active !== b.active) return a.active ? -1 : 1;
      if (b.count !== a.count) return b.count - a.count;
      return a.id.localeCompare(b.id);
    });
}

export interface CompMatch {
  score: number;
  matched: string[];
  missing: string[];
  coreOwned: number;
  coreTotal: number;
  sharedTraits: number;
  compTraits: number;
}

/**
 * How well the units a player already owns fit a comp (0-100):
 *   55% unit coverage · 25% itemised core units · 20% shared trait web.
 * Pure function so the ranking can be unit-tested without a browser.
 */
export function matchComp(
  comp: Comp,
  owned: string[],
  championMap: Map<string, Champion>,
): CompMatch {
  const ownedSet = new Set(owned);
  const units = comp.units;

  const matched: string[] = [];
  const missing: string[] = [];
  for (const unit of units) {
    if (ownedSet.has(unit.champion)) matched.push(unit.champion);
    else missing.push(unit.champion);
  }

  const core = units.filter((unit) => unit.items.length >= 2);
  const coreOwned = core.filter((unit) => ownedSet.has(unit.champion)).length;

  const ownedTraits = new Set<string>();
  for (const id of ownedSet) {
    championMap.get(id)?.traits.forEach((trait) => ownedTraits.add(trait));
  }
  const compTraits = new Set<string>();
  for (const unit of units) {
    championMap.get(unit.champion)?.traits.forEach((trait) => compTraits.add(trait));
  }
  const sharedTraits = [...compTraits].filter((trait) => ownedTraits.has(trait)).length;

  const coverage = units.length ? matched.length / units.length : 0;
  const coreRatio = core.length ? coreOwned / core.length : 0;
  const traitRatio = compTraits.size ? sharedTraits / compTraits.size : 0;
  const score = units.length ? Math.round(100 * (0.55 * coverage + 0.25 * coreRatio + 0.2 * traitRatio)) : 0;

  return {
    score,
    matched,
    missing,
    coreOwned,
    coreTotal: core.length,
    sharedTraits,
    compTraits: compTraits.size,
  };
}

export interface RankedComp extends CompMatch {
  comp: Comp;
  traits: TraitCount[];
}

/** Best comps first; with no owned units it degenerates to the tier list. */
export function rankComps(
  owned: string[],
  comps: Comp[],
  championMap: Map<string, Champion>,
  traitMap: Map<string, Trait>,
): RankedComp[] {
  const unique = [...new Set(owned)].filter((id) => championMap.has(id));

  return comps
    .map((comp) => ({
      comp,
      ...matchComp(comp, unique, championMap),
      traits: traitCounts(comp.units, championMap, traitMap),
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        TIER_WEIGHT[b.comp.tier] - TIER_WEIGHT[a.comp.tier] ||
        a.comp.slug.localeCompare(b.comp.slug),
    );
}

export interface PickSuggestion {
  champion: string;
  appearsIn: number;
  cost: number;
}

/**
 * What to look for in the next shop: units missing from the best few comps,
 * ranked by how many of those comps still need them (then by cost).
 */
export function nextPicks(
  ranked: RankedComp[],
  championMap: Map<string, Champion>,
  limit = 4,
): PickSuggestion[] {
  const scoring = ranked.filter((entry) => entry.score > 0);
  const source = (scoring.length ? scoring : ranked).slice(0, 3);
  const counts = new Map<string, number>();
  for (const entry of source) {
    for (const id of new Set(entry.missing)) {
      counts.set(id, (counts.get(id) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([champion, appearsIn]) => ({ champion, appearsIn, cost: championMap.get(champion)?.cost ?? 0 }))
    .sort((a, b) => b.appearsIn - a.appearsIn || b.cost - a.cost || a.champion.localeCompare(b.champion))
    .slice(0, limit);
}

/** Toggles a champion id in the owned list, preserving insertion order. */
export function toggleOwned(owned: string[], champion: string): string[] {
  return owned.includes(champion) ? owned.filter((id) => id !== champion) : [...owned, champion];
}

/** Clamp an index into 0..length-1 (used by number hotkeys and arrow keys). */
export function clampIndex(index: number, length: number): number {
  if (length <= 0) return 0;
  return Math.min(Math.max(index, 0), length - 1);
}
