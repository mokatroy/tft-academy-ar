import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { items, itemMap } from '../lib/data';
import { formatGameText } from '../lib/format';

type KindFilter = 'all' | 'component' | 'completed';

export function Items() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [kind, setKind] = useState<KindFilter>('all');

  useEffect(() => {
    document.title = 'العناصر | MokaTroy';
    const q = searchParams.get('q');
    if (q) setQuery(q);
  }, [searchParams]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return items
      .filter((item) => (kind === 'all' ? true : item.kind === kind))
      .filter((item) =>
        normalized ? `${item.name} ${item.desc}`.toLowerCase().includes(normalized) : true,
      );
  }, [query, kind]);

  return (
    <div className="fade-in">
      <div className="section-head">
        <div>
          <h1 className="section-title">العناصر</h1>
          <p className="section-sub">المكونات الأساسية والعناصر المكتملة في المجموعة 18</p>
        </div>
      </div>

      <div className="filter-bar">
        <label className="search-field">
          <Search size={15} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ابحث باسم العنصر…"
          />
        </label>
        <div className="filter-group">
          {(
            [
              ['all', 'الكل'],
              ['component', 'مكونات'],
              ['completed', 'عناصر مكتملة'],
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

      <p className="result-count">{filtered.length} عنصر</p>

      <div className="item-grid">
        {filtered.map((item) => (
          <article className="item-card" key={item.id}>
            <div className="item-head">
              {item.icon ? (
                <img className="item-icon" src={item.icon} alt="" loading="lazy" />
              ) : (
                <div className="item-icon" />
              )}
              <div>
                <div className="item-name">{item.name}</div>
                <div className="item-kind">{item.kind === 'component' ? 'مكوّن أساسي' : 'عنصر مكتمل'}</div>
              </div>
            </div>

            {item.desc && (
              <p className="item-desc">{formatGameText(item.desc, item.effects) || '—'}</p>
            )}

            {item.components.length > 0 && (
              <div className="item-components">
                {item.components.map((componentId, index) => {
                  const component = itemMap.get(componentId);
                  return (
                    <span key={`${componentId}-${index}`} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      {index > 0 && <span className="plus">+</span>}
                      {component?.icon ? (
                        <img src={component.icon} alt={component.name} title={component.name} loading="lazy" />
                      ) : null}
                    </span>
                  );
                })}
              </div>
            )}
          </article>
        ))}
      </div>

      {filtered.length === 0 && <div className="empty-state">لا توجد عناصر مطابقة.</div>}
    </div>
  );
}
