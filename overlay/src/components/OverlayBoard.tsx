import type { CSSProperties } from 'react';
import type { Comp, Locale, Localized } from '../../../src/lib/types';
import { championMap, itemMap } from '../lib/data';

const ROWS = 4;
const COLS = 7;

/** Same coordinate system as the site board: row 3 is the front row, drawn on top. */
function position(row: number, col: number): CSSProperties {
  const offset = row % 2 === 1 ? 0.5 : 0;
  return {
    left: `${((col + offset) / 7.4) * 100}%`,
    top: `${(3 - row) * 23.2}%`,
  };
}

export function OverlayBoard({ comp, locale }: { comp: Comp; locale: Locale }) {
  const t = (value: Localized | undefined | null) => value?.[locale] || value?.en || '';

  return (
    <div className="ov-board" aria-label={t({ ar: 'لوح اللعب', en: 'Board', ja: '盤面' })}>
      {Array.from({ length: ROWS * COLS }).map((_, index) => (
        <span key={index} className="ov-hex" style={position(Math.floor(index / COLS), index % COLS)} />
      ))}

      {comp.units.map((unit) => {
        const champion = championMap.get(unit.champion);
        if (!champion) return null;
        return (
          <div
            key={`${unit.champion}-${unit.row}-${unit.col}`}
            className={`ov-unit cost-${champion.cost}`}
            style={position(unit.row, unit.col)}
            title={t(champion.name)}
          >
            <div className="ov-unit-img">
              {champion.icon ? (
                <img src={champion.icon} alt={t(champion.name)} loading="lazy" />
              ) : (
                <span>{t(champion.name).slice(0, 1)}</span>
              )}
            </div>
            <i className="ov-unit-star">{'★'.repeat(unit.star)}</i>
            {unit.items.length > 0 ? (
              <div className="ov-unit-items">
                {unit.items.map((itemId) => {
                  const item = itemMap.get(itemId);
                  return item?.icon ? <img key={itemId} src={item.icon} alt={t(item.name)} loading="lazy" /> : null;
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
