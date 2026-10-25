import augmentsJson from '../../../src/data/augments.json';
import championsJson from '../../../src/data/champions.json';
import itemsJson from '../../../src/data/items.json';
import traitsJson from '../../../src/data/traits.json';
import metaJson from '../../../src/data/meta.json';
import { comps } from '../../../src/data/comps';
import type { Augment, Champion, Comp, Item, Localized, Trait } from '../../../src/lib/types';

export const champions = championsJson as Champion[];
export const traits = traitsJson as Trait[];
export const items = itemsJson as unknown as Item[];
export const augments = augmentsJson as Augment[];
export { comps };
export const meta = metaJson as {
  set: number;
  setName: Localized;
  patch: string;
  updated: Localized;
  source: string;
};

export const championMap = new Map(champions.map((champion) => [champion.id, champion]));
export const traitMap = new Map(traits.map((trait) => [trait.id, trait]));
export const itemMap = new Map(items.map((item) => [item.id, item]));
export const augmentMap = new Map(augments.map((augment) => [augment.id, augment]));

export type { Augment, Champion, Comp, Item, Trait };
