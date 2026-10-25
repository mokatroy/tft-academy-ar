import type {
  ChangeDirection,
  Locale,
  PatchEntry,
  PatchInfo,
  PatchNotesData,
} from './types';

/**
 * Direction of a single change line such as "Attack Speed: .7% ⇒ .75%".
 * Splits on Riot's change arrows and compares the numbers on both sides;
 * returns null for prose lines (no arrow or no numbers).
 *
 * The English line is the canonical source: translations re-render the same
 * numbers (the Arabic article mirrors the arrow to ⇐), so callers pass line.en.
 */
export function lineDirection(text: string): Exclude<ChangeDirection, 'change'> | null {
  const parts = text.split(/[⇒→⇐←]/);
  if (parts.length !== 2) return null;
  const nums = (side: string): number[] => (side.match(/\d+(?:\.\d+)?/g) ?? []).map(Number);
  const a = nums(parts[0]);
  const b = nums(parts[1]);
  if (a.length === 0 || b.length === 0) return null;
  if (a.length === b.length) {
    const diffs = b.map((value, i) => value - a[i]);
    if (diffs.every((d) => d === 0)) return 'adjust';
    const up = diffs.some((d) => d > 0);
    const down = diffs.some((d) => d < 0);
    if (up && down) return 'adjust';
    return up ? 'buff' : 'nerf';
  }
  const sum = (values: number[]): number => values.reduce((total, v) => total + v, 0);
  const delta = sum(b) - sum(a);
  if (Math.abs(delta) < 1e-9) return 'adjust';
  return delta > 0 ? 'buff' : 'nerf';
}

/** Aggregate direction of an entry: all lines up => buff, all down => nerf, mixed => adjust. */
export function entryDirection(entry: PatchEntry): ChangeDirection {
  const dirs = entry.lines
    .map((line) => lineDirection(line.en))
    .filter((d): d is Exclude<ChangeDirection, 'change'> => d !== null);
  if (dirs.length === 0) return 'change';
  if (dirs.every((d) => d === 'buff')) return 'buff';
  if (dirs.every((d) => d === 'nerf')) return 'nerf';
  return 'adjust';
}

/** Counters for the patch hero: how many buffs / nerfs / adjustments it ships. */
export function patchTallies(patch: PatchInfo): Record<ChangeDirection, number> {
  const tallies: Record<ChangeDirection, number> = { buff: 0, nerf: 0, adjust: 0, change: 0 };
  for (const section of patch.sections) {
    for (const group of section.groups) {
      for (const entry of group.entries) {
        tallies[entryDirection(entry)] += 1;
      }
    }
  }
  return tallies;
}

/** All change lines of a patch, used for "N entries" style summaries. */
export function patchEntryCount(patch: PatchInfo): number {
  let count = 0;
  for (const section of patch.sections) {
    for (const group of section.groups) {
      count += group.entries.length;
    }
  }
  return count;
}

const MONTHS: Record<Locale, string[]> = {
  ar: [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
  ],
  en: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ],
  ja: [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月',
  ],
};

/** \"2026-10-06\" -> \"6 أكتوبر 2026\" / \"October 6, 2026\" / \"2026年10月6日\". */
export function formatDate(iso: string, locale: Locale): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const [, year, month, day] = match;
  if (locale === 'ja') return `${year}年${Number(month)}月${Number(day)}日`;
  if (locale === 'en') {
    return `${MONTHS.en[Number(month) - 1]} ${Number(day)}, ${year}`;
  }
  return `${Number(day)} ${MONTHS.ar[Number(month) - 1]} ${year}`;
}

/** Older patches can fall back to English text; the fetched date is plain ISO. */
export function fetchedLabel(data: PatchNotesData, locale: Locale): string {
  return formatDate(data.fetched, locale);
}
