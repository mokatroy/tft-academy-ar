const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
});

/** Clean markup that CommunityDragon leaves inside Arabic descriptions. */
export function stripMarkup(text: string): string {
  return text
    .replace(/\\n/g, ' ')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/?row>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\{\{[^}]+\}\}/g, '')
    .replace(/%i:[^%]+%/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Resolves placeholders such as `@AD*100@%` using the item/augment effects map
 * or the champion ability variables for the requested star level.
 */
export function formatGameText(
  text: string,
  effects?: Record<string, number | null | undefined>,
  variables?: { name: string; value: number[] }[],
  level = 1,
  placeholder = '',
): string {
  const cleaned = stripMarkup(text);
  const resolved = cleaned.replace(
    /@([A-Za-z0-9_]+)(?:\*([\d.]+))?@/g,
    (_match, rawKey: string, multiplier?: string) => {
      let value: number | undefined;
      const direct = effects?.[rawKey];
      if (typeof direct === 'number') {
        value = direct;
      } else if (variables) {
        const variable = variables.find(
          (entry) => entry.name.toLowerCase() === rawKey.toLowerCase(),
        );
        const raw = variable?.value[Math.min(level, variable.value.length - 1)];
        if (typeof raw === 'number') value = raw;
      }
      if (typeof value !== 'number' || Number.isNaN(value)) return placeholder;
      if (multiplier) value *= Number(multiplier);
      return numberFormatter.format(Math.round(value * 100) / 100);
    },
  );
  return resolved
    .replace(/@[^@]+@/g, '')
    .replace(/الـ\s*…/g, '…')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([،.!؟])/g, '$1')
    .trim();
}

export function breakpoints(trait: { effects: { minUnits: number | null; maxUnits: number | null }[] }): number[] {
  const values = trait.effects
    .map((effect) => effect.minUnits)
    .filter((value): value is number => typeof value === 'number' && value > 0 && value < 100);
  return [...new Set(values)].sort((a, b) => a - b);
}
