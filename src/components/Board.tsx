import type { CSSProperties } from 'react';
import type { Comp } from '../lib/types';
import { championMap, itemMap } from '../lib/data';
import { useI18n } from '../lib/i18n';

const ROWS = 4;
const COLS = 7;

export function position(row: number, col: number): CSSProperties {
  const offset = row % 2 === 1 ? 0.5 : 0;
  return {
    left: `${((col + offset) / 7.4) * 100}%`,
    top: `${(3 - row) * 23.2}%`,
  };
}

function isPriority(unit: Comp['units'][number]): boolean {
  if (unit.itemPriority != null) return unit.itemPriority;
  return unit.items.length > 0;
}

export function Board({ comp }: { comp: Comp }) {
  const { t } = useI18n();
  return (
    <div className="board-wrap">
      <div className="board" aria-label={t({ ar: 'لوح اللعب', en: 'Board', ja: '盤面' })}>
        {Array.from({ length: ROWS * COLS }).map((_, index) => {
          const row = Math.floor(index / COLS);
          const col = index % COLS;
          return (
            <div
              key={index}
              className={`hex-cell ${row === 1 || row === 2 ? 'center-hex' : ''}`}
              style={position(row, col)}
            />
          );
        })}

        {comp.units.map((unit) => {
          const champion = championMap.get(unit.champion);
          if (!champion) return null;
          const priority = isPriority(unit);
          return (
            <div
              key={`${unit.champion}-${unit.row}-${unit.col}`}
              className={`hex-unit${priority ? ' hex-unit-priority' : ''}`}
              style={position(unit.row, unit.col)}
              data-tip-kind="champion"
              data-tip-id={unit.champion}
            >
              <div className="hex-portrait" style={{ '--cost-color': costVar(champion.cost) } as CSSProperties}>
                {champion.icon ? <img src={champion.icon} alt={t(champion.name)} loading="lazy" /> : null}
                <span className="hex-stars">{'★'.repeat(unit.star)}</span>
                {priority && (
                  <span className="hex-priority-badge" title={t({ ar: 'أولوية أيتمز', en: 'Item priority', ja: 'アイテム優先' })}>
                    {t({ ar: 'أيتمز', en: 'ITEMS', ja: '装備' })}
                  </span>
                )}
              </div>
              {unit.items.length > 0 && (
                <div className="hex-items">
                  {unit.items.map((itemId) => {
                    const item = itemMap.get(itemId);
                    return item?.icon ? (
                      <img
                        key={itemId}
                        src={item.icon}
                        alt={t(item.name)}
                        data-tip-kind="item"
                        data-tip-id={itemId}
                        loading="lazy"
                      />
                    ) : null;
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="board-note">
        <span />
        {t({
          ar: 'الوحدات المعلّمة «أيتمز» هي اللي تحط عليها العناصر أولًا',
          en: 'Units marked ITEMS should get items first',
          ja: '「装備」マークのユニットに優先してアイテムを付ける',
        })}
        <span />
      </div>
    </div>
  );
}

function costVar(cost: number): string {
  return { 1: '#6b7789', 2: '#3fbf7f', 3: '#3b9ae1', 4: '#b45cf0', 5: '#f0b232' }[cost] ?? '#2c3a52';
}
