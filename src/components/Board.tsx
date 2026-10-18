import type { CSSProperties } from 'react';
import type { Comp } from '../lib/types';
import { championMap, itemMap } from '../lib/data';

const ROWS = 4;
const COLS = 7;

function position(row: number, col: number): CSSProperties {
  const offset = row % 2 === 1 ? 0.5 : 0;
  return {
    left: `${((col + offset) / 7.4) * 100}%`,
    top: `${(3 - row) * 23.2}%`,
  };
}

export function Board({ comp }: { comp: Comp }) {
  return (
    <div className="board-wrap">
      <div className="board" aria-label="لوح اللعب">
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
          return (
            <div
              key={`${unit.champion}-${unit.row}-${unit.col}`}
              className="hex-unit"
              style={position(unit.row, unit.col)}
              title={`${champion.name} — ${unit.star} نجوم`}
            >
              <div className="hex-portrait" style={{ '--cost-color': costVar(champion.cost) } as CSSProperties}>
                {champion.icon ? <img src={champion.icon} alt={champion.name} loading="lazy" /> : null}
                <span className="hex-stars">{'★'.repeat(unit.star)}</span>
              </div>
              {(unit.carry ? unit.items.length : 0) > 0 && (
                <div className="hex-items">
                  {(unit.carry ? unit.items : []).map((itemId) => {
                    const item = itemMap.get(itemId);
                    return item?.icon ? (
                      <img key={itemId} src={item.icon} alt={item.name} title={item.name} loading="lazy" />
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
        الصف الأمامي في الأعلى · العناصر تظهر على الوحدات الأساسية فقط
        <span />
      </div>
    </div>
  );
}

function costVar(cost: number): string {
  return { 1: '#6b7789', 2: '#3fbf7f', 3: '#3b9ae1', 4: '#b45cf0', 5: '#f0b232' }[cost] ?? '#2c3a52';
}
