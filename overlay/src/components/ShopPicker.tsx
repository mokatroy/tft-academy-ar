import { useMemo, useState } from 'react';
import { Search, Trash2, X } from 'lucide-react';
import type { Locale, Localized } from '../../../src/lib/types';
import { champions } from '../lib/data';

interface ShopPickerProps {
  owned: string[];
  locale: Locale;
  onToggle: (championId: string) => void;
  onClear: () => void;
  onClose: () => void;
}

const COSTS = [1, 2, 3, 4, 5];

export function ShopPicker({ owned, locale, onToggle, onClear, onClose }: ShopPickerProps) {
  const [query, setQuery] = useState('');
  const t = (value: Localized | undefined | null) => value?.[locale] || value?.en || '';

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = champions.filter((champion) => {
      if (!needle) return true;
      return [champion.name.ar, champion.name.en, champion.name.ja].some((name) =>
        name.toLowerCase().includes(needle),
      );
    });
    return COSTS.map((cost) => ({
      cost,
      units: filtered.filter((champion) => champion.cost === cost),
    })).filter((group) => group.units.length > 0);
  }, [query]);

  return (
    <div className="ov-sheet ov-sheet-shop">
      <header className="ov-sheet-head">
        <div>
          <h3>{t({ ar: 'وحداتك', en: 'Your units', ja: '自分のユニット' })}</h3>
          <p>
            {t({
              ar: 'اختر اللي معاك في المتجر أو على اللوح',
              en: 'Pick what you have in the shop or on the board',
              ja: 'ショップや盤面のユニットを選択',
            })}
          </p>
        </div>
        <div className="ov-sheet-actions">
          <button type="button" className="ov-sheet-clear" onClick={onClear} disabled={owned.length === 0}>
            <Trash2 size={13} />
          </button>
          <button type="button" onClick={onClose} title={t({ ar: 'إغلاق', en: 'Close', ja: '閉じる' })}>
            <X size={15} />
          </button>
        </div>
      </header>

      <label className="ov-search">
        <Search size={13} />
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t({ ar: 'ابحث عن بطل…', en: 'Search a champion…', ja: 'チャンピオン検索…' })}
        />
      </label>

      <div className="ov-shop-list">
        {groups.length === 0 ? (
          <p className="ov-empty">{t({ ar: 'مفيش نتايج', en: 'No results', ja: '該当なし' })}</p>
        ) : null}
        {groups.map((group) => (
          <section key={group.cost} className="ov-shop-group">
            <span className={`ov-shop-cost cost-${group.cost}`}>{group.cost}</span>
            <div className="ov-shop-grid">
              {group.units.map((champion) => {
                const active = owned.includes(champion.id);
                return (
                  <button
                    type="button"
                    key={champion.id}
                    className={`ov-shop-unit cost-${champion.cost} ${active ? 'on' : ''}`}
                    data-champion={champion.id}
                    onClick={() => onToggle(champion.id)}
                    title={t(champion.name)}
                    aria-pressed={active}
                  >
                    {champion.icon ? <img src={champion.icon} alt={t(champion.name)} loading="lazy" /> : null}
                    <span>{t(champion.name)}</span>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
