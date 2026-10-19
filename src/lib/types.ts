export type Locale = 'ar' | 'en' | 'ja';
export const LOCALES: Locale[] = ['ar', 'en', 'ja'];
export const DEFAULT_LOCALE: Locale = 'ar';

/** Every human-readable string is provided in all three locales. */
export interface Localized {
  ar: string;
  en: string;
  ja: string;
}

export type Cost = 1 | 2 | 3 | 4 | 5;
export type Tier = 'S' | 'A' | 'B' | 'C';
export type Star = 1 | 2 | 3;
export type AugmentTierKey = 'silver' | 'gold' | 'prism';

export interface ChampionAbility {
  name: Localized;
  desc: Localized;
  variables: { name: string; value: number[] }[];
}

export interface ChampionStats {
  hp?: number;
  mana?: number;
  initialMana?: number;
  damage?: number;
  attackSpeed?: number;
  armor?: number;
  magicResist?: number;
  range?: number;
}

export interface Champion {
  id: string;
  name: Localized;
  cost: Cost;
  /** Stable trait apiNames (e.g. DA_18_Elderwood) — never localized names. */
  traits: string[];
  icon: string | null;
  ability: ChampionAbility;
  stats: ChampionStats;
  role: string;
}

export interface TraitEffect {
  minUnits: number | null;
  maxUnits: number | null;
  style: number;
  variables: Record<string, number>;
}

export interface Trait {
  id: string;
  name: Localized;
  desc: Localized;
  effects: TraitEffect[];
}

export interface Item {
  id: string;
  name: Localized;
  desc: Localized;
  icon: string | null;
  components: string[];
  effects: Record<string, number | null | undefined>;
  kind: 'component' | 'completed';
}

export interface Augment {
  id: string;
  name: Localized;
  desc: Localized;
  effects: Record<string, number | null | undefined>;
  icon: string | null;
}

export interface CompUnit {
  champion: string;
  items: string[];
  star: Star;
  /** 0 = back row, 3 = front row */
  row: number;
  /** 0..6 */
  col: number;
}

export interface CompAugment {
  id: string;
  tier: AugmentTierKey;
  why: Localized;
}

export interface LevelingStep {
  stage: Localized;
  text: Localized;
}

export interface CompAlternative {
  champion: string;
  replaces: string;
  note: Localized;
}

export interface Comp {
  slug: string;
  name: Localized;
  subtitle: Localized;
  tier: Tier;
  difficulty: 1 | 2 | 3;
  playstyle: Localized;
  level: Localized;
  summary: Localized;
  units: CompUnit[];
  augments: CompAugment[];
  leveling: LevelingStep[];
  tips: Localized[];
  alternatives: CompAlternative[];
}
