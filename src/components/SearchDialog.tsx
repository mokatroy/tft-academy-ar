import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Swords } from 'lucide-react';
import { champions, comps, items, traits } from '../lib/data';
import { useI18n } from '../lib/i18n';
import { Portrait } from './Portrait';

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { t, localizePath } = useI18n();

  useEffect(() => {
    if (open) {
      setQuery('');
      const timer = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const normalized = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalized) {
      return {
        comps: comps.slice(0, 4),
        champions: [] as typeof champions,
        items: [] as typeof items,
        traits: [] as typeof traits,
      };
    }
    const match = (parts: string[]) => parts.some((p) => p.toLowerCase().includes(normalized));
    return {
      comps: comps
        .filter((comp) => match([t(comp.name), t(comp.subtitle), t(comp.playstyle)]))
        .slice(0, 4),
      champions: champions
        .filter((champion) => match([t(champion.name), ...champion.traits.map((id) => t(traits.find((x) => x.id === id)?.name ?? { ar: '', en: '', ja: '' }))]))
        .slice(0, 6),
      items: items.filter((item) => match([t(item.name)])).slice(0, 5),
      traits: traits.filter((trait) => match([t(trait.name)])).slice(0, 5),
    };
  }, [normalized, t]);

  const hasResults =
    results.comps.length + results.champions.length + results.items.length + results.traits.length > 0;

  if (!open) return null;

  const go = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="search-overlay" onMouseDown={onClose} role="presentation">
      <div
        className="search-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={t({ ar: 'بحث في الموقع', en: 'Search the site', ja: 'サイト内検索' })}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="search-dialog-input">
          <Search size={18} />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t({
              ar: 'ابحث عن كومب، بطل، عنصر أو خاصية…',
              en: 'Search a comp, champion, item or trait…',
              ja: '構成、チャンピオン、アイテム、特性を検索…',
            })}
          />
          <kbd>Esc</kbd>
        </div>

        <div className="search-results">
          {!hasResults && (
            <div className="empty-state">
              {t({ ar: 'لا توجد نتائج مطابقة لـ', en: 'No results for', ja: '該当なし：' })} «{query}»
            </div>
          )}

          {results.comps.length > 0 && (
            <>
              <div className="result-group-title">{t({ ar: 'الكومبوهات', en: 'Comps', ja: '構成' })}</div>
              {results.comps.map((comp) => (
                <button
                  className="result-item"
                  key={comp.slug}
                  onClick={() => go(localizePath(`/comp/${comp.slug}`))}
                >
                  <span className="result-icon">
                    <Swords size={15} />
                  </span>
                  <span>
                    <span className="result-title">{t(comp.name)}</span>
                    <span className="result-sub"> — {t(comp.subtitle)}</span>
                  </span>
                </button>
              ))}
            </>
          )}

          {results.champions.length > 0 && (
            <>
              <div className="result-group-title">{t({ ar: 'الأبطال', en: 'Champions', ja: 'チャンピオン' })}</div>
              {results.champions.map((champion) => (
                <button
                  className="result-item"
                  key={champion.id}
                  onClick={() => go(localizePath(`/champions?champ=${encodeURIComponent(champion.id)}`))}
                >
                  <Portrait championId={champion.id} />
                  <span>
                    <span className="result-title">{t(champion.name)}</span>
                    <span className="result-sub">
                      {' '}
                      —{' '}
                      {champion.traits
                        .map((id) => t(traits.find((x) => x.id === id)?.name ?? { ar: '', en: '', ja: '' }))
                        .join(' · ')}
                    </span>
                  </span>
                </button>
              ))}
            </>
          )}

          {results.items.length > 0 && (
            <>
              <div className="result-group-title">{t({ ar: 'العناصر', en: 'Items', ja: 'アイテム' })}</div>
              {results.items.map((item) => (
                <button
                  className="result-item"
                  key={item.id}
                  onClick={() => go(localizePath(`/items?q=${encodeURIComponent(t(item.name))}`))}
                >
                  {item.icon ? (
                    <img
                      className="result-icon"
                      src={item.icon}
                      alt=""
                      style={{ objectFit: 'cover' }}
                      data-tip-kind="item"
                      data-tip-id={item.id}
                    />
                  ) : (
                    <span className="result-icon">
                      <Sparkles size={15} />
                    </span>
                  )}
                  <span>
                    <span className="result-title">{t(item.name)}</span>
                    <span className="result-sub">
                      {' '}
                      —{' '}
                      {item.kind === 'component'
                        ? t({ ar: 'مكوّن', en: 'Component', ja: 'コンポーネント' })
                        : t({ ar: 'عنصر مكتمل', en: 'Completed item', ja: '完成アイテム' })}
                    </span>
                  </span>
                </button>
              ))}
            </>
          )}

          {results.traits.length > 0 && (
            <>
              <div className="result-group-title">{t({ ar: 'الخواص', en: 'Traits', ja: '特性' })}</div>
              {results.traits.map((trait) => (
                <button
                  className="result-item"
                  key={trait.id}
                  onClick={() => go(localizePath(`/traits?trait=${encodeURIComponent(trait.name.en)}`))}
                >
                  <span className="result-icon">
                    <Sparkles size={15} />
                  </span>
                  <span>
                    <span className="result-title">{t(trait.name)}</span>
                    <span className="result-sub">
                      {' '}
                      — {t({ ar: 'خاصية', en: 'Trait', ja: '特性' })}
                    </span>
                  </span>
                </button>
              ))}
            </>
          )}

          {!normalized && (
            <div className="empty-state" style={{ padding: '12px 10px', fontSize: 11 }}>
              {t({
                ar: 'جرّب البحث باسم بطل مثل «زايا» أو عنصر مثل «السيف الأبدي».',
                en: 'Try searching a champion like “Xayah” or an item like “Infinity Edge”.',
                ja: '「ザヤ」や「インフィニティエッジ」などで検索してみてください。',
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
