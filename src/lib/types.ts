export type Cost = 1 | 2 | 3 | 4 | 5;
export type Tier = 'S' | 'A' | 'B' | 'C';
export type Star = 1 | 2 | 3;
export type AugmentTier = 'فضي' | 'ذهبي' | 'منشوري';

export interface ChampionAbility {
  name: string;
  desc: string;
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
  name: string;
  cost: Cost;
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
  name: string;
  desc: string;
  effects: TraitEffect[];
}

export interface Item {
  id: string;
  name: string;
  desc: string;
  icon: string | null;
  components: string[];
  effects: Record<string, number | null | undefined>;
  kind: 'component' | 'completed';
}

export interface Augment {
  id: string;
  name: string;
  desc: string;
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
  tier: AugmentTier;
  why: string;
}

export interface LevelingStep {
  stage: string;
  text: string;
}

export interface CompAlternative {
  champion: string;
  replaces: string;
  note: string;
}

export interface Comp {
  slug: string;
  name: string;
  subtitle: string;
  tier: Tier;
  difficulty: 1 | 2 | 3;
  playstyle: string;
  level: string;
  summary: string;
  units: CompUnit[];
  augments: CompAugment[];
  leveling: LevelingStep[];
  tips: string[];
  alternatives: CompAlternative[];
}
