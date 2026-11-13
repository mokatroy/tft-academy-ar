import championsJson from '../data/champions.json';
import championsExtraJson from '../data/championsExtra.json';
import traitsJson from '../data/traits.json';
import itemsJson from '../data/items.json';
import itemsExtraJson from '../data/itemsExtra.json';
import augmentsJson from '../data/augments.json';
import augmentsExtraJson from '../data/augmentsExtra.json';
import metaJson from '../data/meta.json';
import patchNotesJson from '../data/patchnotes.json';
import { comps as curatedComps, tierOrder } from '../data/comps';
import { academyComps } from '../data/compsAcademy';
import tierOverridesJson from '../data/tierOverrides.json';
import type {
  Augment,
  Champion,
  Comp,
  CompUnit,
  Item,
  Localized,
  PatchNotesData,
  Tier,
  Trait,
} from './types';
import { breakpoints } from './format';

/** Dedupe by id, keeping the base dataset entry when a guide adds the same object again. */
function mergeById<T extends { id: string }>(base: T[], extra: T[]): T[] {
  const merged = new Map<string, T>();
  for (const entry of [...base, ...extra]) if (!merged.has(entry.id)) merged.set(entry.id, entry);
  return [...merged.values()];
}

export const champions = mergeById(championsJson as Champion[], championsExtraJson as Champion[]);
export const traits = traitsJson as Trait[];
export const items = mergeById(itemsJson as unknown as Item[], itemsExtraJson as unknown as Item[]);
/** Curated comps plus Academy comps; tierOverrides.json is the live meta source of truth. */
const tierOverrides = tierOverridesJson as Record<string, Tier>;
export const comps: Comp[] = [...curatedComps, ...academyComps].map((comp) => {
  const tier = tierOverrides[comp.slug];
  return tier && tier !== comp.tier ? { ...comp, tier } : comp;
});
export { tierOrder };
export const augments = mergeById(augmentsJson as Augment[], augmentsExtraJson as Augment[]);
export const meta = metaJson as {
  set: number;
  setName: Localized;
  patch: string;
  updated: Localized;
  source: string;
};
export const patchNotes = patchNotesJson as PatchNotesData;

export const championMap = new Map(champions.map((champion) => [champion.id, champion]));
/** Traits are keyed by stable id (DA_18_Elderwood). */
export const traitMap = new Map(traits.map((trait) => [trait.id, trait]));
export const itemMap = new Map(items.map((item) => [item.id, item]));
export const augmentMap = new Map(augments.map((augment) => [augment.id, augment]));
export const compMap = new Map(comps.map((comp) => [comp.slug, comp]));

export function getChampion(id: string): Champion | undefined {
  return championMap.get(id);
}

export function getTrait(id: string): Trait | undefined {
  return traitMap.get(id);
}

export function getItem(id: string): Item | undefined {
  return itemMap.get(id);
}

export function getAugment(id: string): Augment | undefined {
  return augmentMap.get(id);
}

export function getComp(slug: string): Comp | undefined {
  return compMap.get(slug);
}

/** Active trait counts for a list of champion ids (final board). */
export function traitCountsFor(championIds: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const id of championIds) {
    const champion = championMap.get(id);
    if (!champion) continue;
    for (const traitId of champion.traits) {
      counts.set(traitId, (counts.get(traitId) ?? 0) + 1);
    }
  }
  return counts;
}

export function activeTraitsFor(championIds: string[]) {
  const counts = traitCountsFor(championIds);
  return [...counts.entries()]
    .map(([id, count]) => {
      const trait = traitMap.get(id);
      if (!trait) return null;
      const steps = breakpoints(trait);
      const active = steps.filter((s) => count >= s).pop() ?? null;
      const next = steps.find((s) => s > count) ?? null;
      return { trait, count, active, nextBreakpoint: next, breakpoints: steps };
    })
    .filter(Boolean);
}
