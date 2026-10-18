import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { champions, traits } from '../lib/data';
import { breakpoints } from '../lib/format';
import { getTraitMeta } from '../lib/traitMeta';
import { Portrait } from '../components/Portrait';

export function Traits() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  useEffect(() => {
    document.title = 'الخواص | MokaTroy';
  }, []);

  const selected = searchParams.get('trait');

  const entries = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return traits
      .map((trait) => ({
        trait,
        steps: breakpoints(trait),
        units: champions.filter((champion) => champion.traits.includes(trait.name)),
      }))
      .filter((entry) =>
        normalized ? entry.trait.name.toLowerCase().includes(normalized) : true,
      )
      .sort((a, b) => b.units.length - a.units.length || a.trait.name.localeCompare(b.trait.name, 'ar'));
  }, [query]);

  return (
    <div className="fade-in">
      <div className="section-head">
        <div>
          <h1 className="section-title">الخواص</h1>
          <p className="section-sub">كل خواص المجموعة 18، عتبات التفعيل والأبطال الذين يحملونها</p>
        </div>
      </div>

      <div className="filter-bar">
        <label className="search-field">
          <Search size={15} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ابحث عن خاصية…"
          />
        </label>
        {selected && (
          <span className="filter-chip active">
            مفلترة: {selected}
          </span>
        )}
        <span className="result-count" style={{ marginInlineStart: 'auto', marginBottom: 0 }}>
          {entries.length} خاصية
        </span>
      </div>

      <div className="trait-grid">
        {entries.map(({ trait, steps, units }) => {
          const meta = getTraitMeta(trait.name);
          return (
            <article
              className="trait-card"
              key={trait.id}
              style={
                selected === trait.name
                  ? { borderColor: `${meta.color}66`, boxShadow: `0 0 0 1px ${meta.color}33` }
                  : undefined
              }
            >
              <div className="trait-card-head">
                <span
                  className="trait-icon"
                  style={{
                    '--trait-color': meta.color,
                    color: meta.color,
                    borderColor: `${meta.color}44`,
                    background: `${meta.color}18`,
                  } as CSSProperties}
                >
                  <meta.Icon size={20} />
                </span>
                <div>
                  <div className="trait-name" style={{ fontSize: 15 }}>
                    {trait.name}
                  </div>
                  <div className="trait-steps">{units.length} أبطال</div>
                </div>
                <Link
                  to={`/champions?trait=${encodeURIComponent(trait.name)}`}
                  className="comp-link"
                  style={{ marginInlineStart: 'auto', fontSize: 11 }}
                >
                  الأبطال
                </Link>
              </div>

              <div className="breakpoint-row">
                {steps.length > 0 ? (
                  steps.map((step) => (
                    <span className="breakpoint" key={step}>
                      {step}
                    </span>
                  ))
                ) : (
                  <span className="breakpoint">فريدة</span>
                )}
              </div>

              <div className="comp-units" style={{ marginTop: 10, justifyContent: 'flex-start' }}>
                {units.slice(0, 7).map((unit) => (
                  <Portrait key={unit.id} championId={unit.id} />
                ))}
                {units.length > 7 && (
                  <span className="trait-pill">+{units.length - 7}</span>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {entries.length === 0 && <div className="empty-state">لا توجد خواص مطابقة.</div>}
    </div>
  );
}
