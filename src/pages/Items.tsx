import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { items, itemMap } from '../lib/data';
import { formatGameText } from '../lib/format';
import { useI18n } from '../lib/i18n';

type KindFilter = 'all' | 'component' | 'completed';

export function Items() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [kind, setKind] = useState<KindFilter>('all');
  const { t, locale } = useI18n();

  useEffect(() => {
    document.title = `${t({ ar: 'العناصر', en: 'Items', ja: 'アイテム' })} | MokaTroy`;
    const q = searchParams.get('q');
    if (q) setQuery(q);
  }, [searchParams, t]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return items
      .filter((item) => (kind === 'all' ? true : item.kind === kind))
      .filter((item) =>
        normalized ? `${t(item.name)} ${t(item.desc)}`.toLowerCase().includes(normalized) : true,
      );
  }, [query, kind, t]);

  return (
    <div className="fade-in">
      <div className="section-head">
        <div>
          <h1 className="section-title">{t({ ar: 'العناصر', en: 'Items', ja: 'アイテム' })}</h1>
          <p className="section-sub">
            {t({
              ar: 'المكونات الأساسية والعناصر المكتملة في المجموعة 18',
              en: 'Base components and completed items in Set 18',
              ja: 'セット18の基本コンポーネントと完成アイテム',
            })}
          </p>
        </div>
      </div>

      <div className="filter-bar">
        <label className="search-field">
          <Search size={15} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t({ ar: 'ابحث باسم العنصر…', en: 'Search by item name…', ja: 'アイテム名で検索…' })}
          />
        </label>
        <div className="filter-group">
          {(
            [
              ['all', t({ ar: 'الكل', en: 'All', ja: 'すべて' })],
              ['component', t({ ar: 'مكونات', en: 'Components', ja: 'コンポーネント' })],
              ['completed', t({ ar: 'عناصر مكتملة', en: 'Completed', ja: '完成' })],
            ] as [KindFilter, string][]
          ).map(([value, label]) => (
            <button
              key={value}
              className={`filter-chip ${kind === value ? 'active' : ''}`}
              onClick={() => setKind(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <p className="result-count">
        {filtered.length} {t({ ar: 'عنصر', en: 'items', ja: '件' })}
      </p>

      <div className="item-grid">
        {filtered.map((item) => (
          <article className="item-card" key={item.id}>
            <div className="item-head" data-tip-kind="item" data-tip-id={item.id}>
              {item.icon ? (
                <img className="item-icon" src={item.icon} alt="" loading="lazy" />
              ) : (
                <div className="item-icon" />
              )}
              <div>
                <div className="item-name">{t(item.name)}</div>
                <div className="item-kind">
                  {item.kind === 'component'
                    ? t({ ar: 'مكوّن أساسي', en: 'Base component', ja: '基本コンポーネント' })
                    : t({ ar: 'عنصر مكتمل', en: 'Completed item', ja: '完成アイテム' })}
                </div>
              </div>
            </div>

            {item.desc && <p className="item-desc">{formatGameText(t(item.desc), item.effects, undefined, 1, '', locale) || '—'}</p>}

            {item.components.length > 0 && (
              <div className="item-components">
                {item.components.map((componentId, index) => {
                  const component = itemMap.get(componentId);
                  return (                        <span key={`${componentId}-${index}`} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          {index > 0 && <span className="plus">+</span>}
                          {component?.icon ? (
                            <img
                              src={component.icon}
                              alt={t(component.name)}
                              data-tip-kind="item"
                              data-tip-id={componentId}
                              loading="lazy"
                            />
                          ) : null}
                        </span>
                  );
                })}
              </div>
            )}
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          {t({ ar: 'لا توجد عناصر مطابقة.', en: 'No items match.', ja: '該当するアイテムがありません。' })}
        </div>
      )}
    </div>
  );
}
