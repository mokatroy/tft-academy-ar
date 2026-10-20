import assert from 'node:assert/strict';
import test from 'node:test';
import type { Champion, Comp, Tier, Trait } from '../../src/lib/types';
import {
  breakpoints,
  clampIndex,
  matchComp,
  nextPicks,
  rankComps,
  TIER_WEIGHT,
  toggleOwned,
  traitCounts,
} from '../src/lib/logic';
import { clampWindow, defaultPosition, isGameTitle } from '../src/lib/geometry';
import { championMap, comps, itemMap, traitMap } from '../src/lib/data';

/* ------------------------------------------------------------- fixtures */

const localized = (value: string) => ({ ar: value, en: value, ja: value });

const champion = (id: string, cost: number, traits: string[]): Champion =>
  ({
    id,
    name: localized(id),
    cost,
    traits,
    icon: null,
    ability: { name: localized(''), desc: localized(''), variables: [] },
    stats: {},
    role: '',
  }) as unknown as Champion;

const trait = (id: string, steps: number[]): Trait => ({
  id,
  name: localized(id),
  desc: localized(''),
  effects: steps.map((count) => ({ minUnits: count, maxUnits: count, style: 1, variables: {} })),
  effectsRaw: undefined,
}) as unknown as Trait;

const champions = [
  champion('A', 1, ['t1', 't2']),
  champion('B', 4, ['t2', 't3']),
  champion('C', 2, ['t4']),
  champion('D', 5, ['t5']),
  champion('E', 3, ['t6']),
];
const championsById = new Map(champions.map((entry) => [entry.id, entry]));
const traitsById = new Map([
  ['t1', trait('t1', [2, 4])],
  ['t2', trait('t2', [2, 3])],
  ['t3', trait('t3', [3])],
  ['t4', trait('t4', [1])],
  ['t5', trait('t5', [2])],
  ['t6', trait('t6', [2])],
]);

function comp(units: { champion: string; items?: string[] }[], tier: Tier = 'S', slug = 'synthetic'): Comp {
  return {
    slug,
    name: localized(slug),
    subtitle: localized(''),
    tier,
    difficulty: 1,
    playstyle: localized(''),
    level: localized(''),
    summary: localized(''),
    units: units.map((unit, index) => ({
      champion: unit.champion,
      items: unit.items ?? [],
      star: 2,
      row: index % 4,
      col: index % 7,
    })),
    augments: [],
    leveling: [],
    tips: [],
    alternatives: [],
  };
}

/* --------------------------------------------------------------- logic */

test('a fully owned comp scores 100', () => {
  const board = comp([
    { champion: 'A', items: ['i1', 'i2'] },
    { champion: 'B' },
    { champion: 'C' },
    { champion: 'D', items: ['i3', 'i4'] },
  ]);
  const result = matchComp(board, ['A', 'B', 'C', 'D'], championsById);
  assert.equal(result.score, 100);
  assert.deepEqual(result.missing, []);
  assert.equal(result.matched.length, 4);
  assert.equal(result.coreOwned, 2);
  assert.equal(result.coreTotal, 2);
});

test('partial ownership is weighted: coverage 55%, core items 25%, traits 20%', () => {
  const board = comp([
    { champion: 'A', items: ['i1', 'i2'] },
    { champion: 'B' },
    { champion: 'C' },
    { champion: 'D', items: ['i3', 'i4'] },
  ]);
  const result = matchComp(board, ['A'], championsById);
  // 0.55 * 1/4 + 0.25 * 1/2 + 0.2 * 2/5 = 0.3425 -> 34
  assert.equal(result.score, 34);
  assert.deepEqual(result.matched, ['A']);
  assert.deepEqual(result.missing, ['B', 'C', 'D']);
  assert.equal(result.sharedTraits, 2);
  assert.equal(result.compTraits, 5);
});

test('nothing owned scores 0 and keeps the tier list order', () => {
  const ranked = rankComps(
    [],
    [
      comp([{ champion: 'A' }], 'B', 'b-comp'),
      comp([{ champion: 'B' }], 'S', 's-comp'),
      comp([{ champion: 'C' }], 'A', 'a-comp'),
    ],
    championsById,
    traitsById,
  );
  assert.deepEqual(
    ranked.map((entry) => entry.comp.slug),
    ['s-comp', 'a-comp', 'b-comp'],
  );
  assert.ok(ranked.every((entry) => entry.score === 0));
  assert.equal(TIER_WEIGHT.S, 4);
});

test('the comp you already own the most of ranks first', () => {
  const ranked = rankComps(
    ['A', 'B', 'C'],
    [
      comp([{ champion: 'D', items: ['i1', 'i2'] }, { champion: 'E', items: ['i3', 'i4'] }], 'S', 'wrong'),
      comp([{ champion: 'A', items: ['i1', 'i2'] }, { champion: 'B', items: ['i3', 'i4'] }], 'B', 'right'),
    ],
    championsById,
    traitsById,
  );
  assert.equal(ranked[0].comp.slug, 'right');
  assert.equal(ranked[0].score, 100);
  assert.equal(ranked[1].score, 0);
});

test('unknown champion ids are ignored, duplicates collapse', () => {
  const ranked = rankComps(
    ['A', 'A', 'nope'],
    [comp([{ champion: 'A' }, { champion: 'B' }])],
    championsById,
    traitsById,
  );
  assert.deepEqual(ranked[0].matched, ['A']);
});

test('next picks favour units needed by several top comps, then higher cost', () => {
  const ranked = rankComps(
    ['A'],
    [
      comp([{ champion: 'A' }, { champion: 'B' }, { champion: 'C' }], 'S', 'one'),
      comp([{ champion: 'A' }, { champion: 'B' }, { champion: 'D' }], 'A', 'two'),
    ],
    championsById,
    traitsById,
  );
  const picks = nextPicks(ranked, championsById, 3);
  assert.deepEqual(
    picks.map((pick) => pick.champion),
    ['B', 'D', 'C'],
  );
  assert.equal(picks[0].appearsIn, 2);
});

test('trait counting reports breakpoints, active state and the next step', () => {
  const board = comp([
    { champion: 'A' },
    { champion: 'B' },
    { champion: 'C' },
  ]);
  const counts = traitCounts(board.units, championsById, traitsById);
  const t2 = counts.find((entry) => entry.id === 't2');
  assert.ok(t2);
  assert.equal(t2.count, 2);
  assert.deepEqual(t2.steps, [2, 3]);
  assert.equal(t2.active, true);
  assert.equal(t2.next, 3);
  // Active traits are listed first.
  assert.equal(counts[0].active, true);
  const t4 = counts.find((entry) => entry.id === 't4');
  assert.equal(t4?.next, null);
});

test('breakpoints ignore empty and sentinel values', () => {
  const odd = {
    effects: [
      { minUnits: null, maxUnits: null },
      { minUnits: 0, maxUnits: 0 },
      { minUnits: 2, maxUnits: 2 },
      { minUnits: 2, maxUnits: 2 },
      { minUnits: 100, maxUnits: null },
      { minUnits: 6, maxUnits: 6 },
    ],
  } as unknown as Trait;
  assert.deepEqual(breakpoints(odd), [2, 6]);
  assert.deepEqual(breakpoints(undefined), []);
});

test('owned toggling and index clamping are stable', () => {
  assert.deepEqual(toggleOwned([], 'A'), ['A']);
  assert.deepEqual(toggleOwned(['A', 'B'], 'A'), ['B']);
  assert.equal(clampIndex(-3, 5), 0);
  assert.equal(clampIndex(9, 5), 4);
  assert.equal(clampIndex(2, 0), 0);
});

/* ------------------------------------------------------------ geometry */

test('game window titles are recognised, unrelated apps are not', () => {
  const yes = [
    'League of Legends (TM) Client',
    'league of legends (tm) client',
    'Teamfight Tactics',
    '  League of Legends  ',
  ];
  const no = ['Visual Studio Code', 'Discord', 'Riot Client', 'League of Legends: Wild Rift', '', 'chrome'];
  for (const title of yes) assert.equal(isGameTitle(title), true, `expected match: ${title}`);
  for (const title of no) assert.equal(isGameTitle(title), false, `expected no match: ${title}`);
});

test('the overlay stays inside the work area', () => {
  const area = { x: 0, y: 0, width: 1920, height: 1080 };
  const size = { width: 416, height: 668 };
  assert.deepEqual(clampWindow({ x: -400, y: -50 }, size, area), { x: 0, y: 0 });
  assert.deepEqual(clampWindow({ x: 5000, y: 5000 }, size, area), { x: 1504, y: 412 });
  const docked = defaultPosition(size, area);
  assert.equal(docked.x, 1480);
  assert.equal(docked.y, 86);
  // Multi-monitor work areas with a non-zero origin.
  const second = { x: 1920, y: -200, width: 1280, height: 1024 };
  assert.deepEqual(clampWindow({ x: 500, y: -900 }, size, second), { x: 1920, y: -200 });
  // A point already inside the work area is left untouched.
  assert.deepEqual(clampWindow({ x: 2000, y: 0 }, size, second), { x: 2000, y: 0 });
});

/* ------------------------------------------------------------- dataset */

test('every comp unit and item resolves to the shipped dataset', () => {
  assert.ok(comps.length >= 20, `expected a full comp list, got ${comps.length}`);
  const slugs = new Set<string>();
  for (const entry of comps) {
    assert.ok(!slugs.has(entry.slug), `duplicate slug: ${entry.slug}`);
    slugs.add(entry.slug);
    assert.ok(['S', 'A', 'B', 'C'].includes(entry.tier), `bad tier in ${entry.slug}`);
    assert.ok(entry.units.length >= 6, `comp ${entry.slug} has too few units`);
    const slots = new Set<string>();
    for (const unit of entry.units) {
      assert.ok(championMap.has(unit.champion), `${entry.slug}: unknown champion ${unit.champion}`);
      assert.ok(unit.row >= 0 && unit.row <= 3, `${entry.slug}: row out of range`);
      assert.ok(unit.col >= 0 && unit.col <= 6, `${entry.slug}: col out of range`);
      assert.ok(unit.star >= 1 && unit.star <= 3, `${entry.slug}: bad star`);
      const slot = `${unit.row}:${unit.col}`;
      assert.ok(!slots.has(slot), `${entry.slug}: two units on ${slot}`);
      slots.add(slot);
      for (const item of unit.items) {
        assert.ok(itemMap.has(item), `${entry.slug}: unknown item ${item}`);
      }
    }
  }
});

test('scoring the shipped comps never throws and stays within 0-100', () => {
  const owned = ['DA_18_Xayah', 'DA_18_Ornn', 'DA_18_Alistar'];
  const ranked = rankComps(owned, comps, championMap, traitMap);
  assert.equal(ranked.length, comps.length);
  for (const entry of ranked) {
    assert.ok(entry.score >= 0 && entry.score <= 100, `score out of range: ${entry.score}`);
    assert.ok(entry.traits.length > 0, `${entry.comp.slug}: no traits counted`);
  }
  // Sorted by score desc.
  for (let index = 1; index < ranked.length; index += 1) {
    assert.ok(ranked[index - 1].score >= ranked[index].score);
  }
  assert.ok(ranked[0].matched.includes('DA_18_Xayah'));
});
