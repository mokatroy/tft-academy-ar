import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { champions, traits } from '../lib/data';
import { formatTraitDescription } from '../lib/data';
import { breakpoints } from '../lib/format';
import { getTraitMeta } from '../lib/traitMeta';
import { useI18n } from '../lib/i18n';
import { Portrait } from '../components/Portrait';

export function Traits() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const { t, locale, localizePath } = useI18n();

  useEffect(() => {
    document.title = `${t({ ar: 'الخواص', en: 'Traits', ja: '特性' })} | MokaTroy`;
  }, [t]);

  // The trait filter param is now a stable trait id.
  const selected = searchParams.get('trait');

  const entries = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return traits
      .map((trait) => ({
        trait,
        steps: breakpoints(trait),
        units: champions.filter((champion) => champion.traits.includes(trait.id)),
      }))
      .filter((entry) => (normalized ? t(entry.trait.name).toLowerCase().includes(normalized) : true))
      .sort(
        (a, b) => b.units.length - a.units.length || t(a.trait.name).localeCompare(t(b.trait.name), locale),
      );
  }, [query, t, locale]);

  return (
    <div className="fade-in">
      <div className="section-head">
        <div>
          <h1 className="section-title">{t({ ar: 'الخواص', en: 'Traits', ja: '特性' })}</h1>
          <p className="section-sub">
            {t({
              ar: 'كل خواص المجموعة 18، عتبات التفعيل والأبطال الذين يحملونها',
              en: 'All Set 18 traits, activation breakpoints and the champions that hold them',
              ja: 'セット18の全特性、発動条件、保有チャンピオン',
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
            placeholder={t({ ar: 'ابحث عن خاصية…', en: 'Search a trait…', ja: '特性を検索…' })}
          />
        </label>
        {selected && (
          <span className="filter-chip active">
            {t({ ar: 'مفلترة:', en: 'Filtered:', ja: '絞り込み:' })}{' '}
            {t(traits.find((x) => x.id === selected)?.name ?? { ar: selected, en: selected, ja: selected })}
          </span>
        )}
        <span className="result-count" style={{ marginInlineStart: 'auto', marginBottom: 0 }}>
          {entries.length} {t({ ar: 'خاصية', en: 'traits', ja: '特性' })}
        </span>
      </div>

      <div className="trait-grid">
        {entries.map(({ trait, steps, units }) => {
          const meta = getTraitMeta(trait.id);
          return (
            <article
              className="trait-card"
              key={trait.id}
              style={
                selected === trait.id
                  ? { borderColor: `${meta.color}66`, boxShadow: `0 0 0 1px ${meta.color}33` }
                  : undefined
              }
            >
              <div className="trait-card-head" data-tip-kind="trait" data-tip-id={trait.id}>
                <span
                  className="trait-icon"
                  style={
                    {
                      '--trait-color': meta.color,
                      color: meta.color,
                      borderColor: `${meta.color}44`,
                      background: `${meta.color}18`,
                    } as CSSProperties
                  }
                >
                  <meta.Icon size={20} />
                </span>
                <div>
                  <div className="trait-name" style={{ fontSize: 15 }}>
                    {t(trait.name)}
                  </div>
                  <div className="trait-steps">
                    {units.length} {t({ ar: 'أبطال', en: 'champions', ja: '体' })}
                  </div>
                </div>
                <Link
                  to={localizePath(`/champions?trait=${encodeURIComponent(trait.id)}`)}
                  className="comp-link"
                  style={{ marginInlineStart: 'auto', fontSize: 11 }}
                >
                  {t({ ar: 'الأبطال', en: 'Champions', ja: 'チャンピオン' })}
                </Link>
              </div>

              {trait.desc && (
                <p className="muted" style={{ fontSize: 11.5, lineHeight: 1.7, margin: '8px 0 4px' }}>
                  {formatTraitDescription(trait, locale)}
                </p>
              )}

              <div className="breakpoint-row">
                {steps.length > 0 ? (
                  steps.map((step) => (
                    <span className="breakpoint" key={step}>
                      {step}
                    </span>
                  ))
                ) : (
                  <span className="breakpoint">{t({ ar: 'فريدة', en: 'Unique', ja: 'ユニーク' })}</span>
                )}
              </div>

              <div className="comp-units" style={{ marginTop: 10, justifyContent: 'flex-start' }}>
                {units.slice(0, 7).map((unit) => (
                  <Portrait key={unit.id} championId={unit.id} />
                ))}
                {units.length > 7 && <span className="trait-pill">+{units.length - 7}</span>}
              </div>
            </article>
          );
        })}
      </div>

      {entries.length === 0 && (
        <div className="empty-state">
          {t({ ar: 'لا توجد خواص مطابقة.', en: 'No traits match.', ja: '該当する特性がありません。' })}
        </div>
      )}
    </div>
  );
}
