import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  Compass,
  Gauge,
  Lightbulb,
  RefreshCw,
  Shield,
  Sparkles,
  Swords,
  Wrench,
} from 'lucide-react';
import {
  augmentMap,
  championMap,
  compTraits,
  getComp,
  itemMap,
  tierStyles,
} from '../lib/data';
import { getTraitMeta } from '../lib/traitMeta';
import { useI18n } from '../lib/i18n';
import { Board } from '../components/Board';
import { Portrait } from '../components/Portrait';

const augmentTierClass: Record<string, string> = {
  silver: 't-silver',
  gold: 't-gold',
  prism: 't-prism',
};

export function CompDetail() {
  const { slug } = useParams();
  const comp = getComp(slug);
  const { t, localizePath } = useI18n();

  useEffect(() => {
    if (!comp) return undefined;
    const previous = document.title;
    document.title = `${t(comp.name)} — ${comp.tier} | MokaTroy`;
    return () => {
      document.title = previous;
    };
  }, [comp, t]);

  if (!comp) {
    return (
      <div className="empty-state">
        <p>{t({ ar: 'لم نجد هذا الكومب.', en: 'We could not find that comp.', ja: 'その構成が見つかりませんでした。' })}</p>
        <Link className="btn btn-ghost" to={localizePath('/')} style={{ marginTop: 12 }}>
          {t({ ar: 'العودة إلى قائمة المستويات', en: 'Back to the tier list', ja: 'ティアリストに戻る' })}
        </Link>
      </div>
    );
  }

  const style = tierStyles[comp.tier];
  const traits = compTraits(comp);
  const activeTraits = traits.filter((trait) => trait.active);
  const inactiveTraits = traits.filter((trait) => !trait.active);

  const renderTrait = (trait: (typeof traits)[number]) => {
    const traitMeta = getTraitMeta(trait.id);
    return (
      <div
        className={`trait-row ${trait.active ? 'active' : ''}`}
        key={trait.id}
        style={{ '--trait-color': traitMeta.color } as CSSProperties}
        data-tip-kind="trait"
        data-tip-id={trait.id}
      >
        <span className="trait-icon">
          <traitMeta.Icon size={16} />
        </span>
        <div>
          <div className="trait-name">{t(trait.name)}</div>
          <div className="trait-steps">
            {trait.breakpoints.length > 0
              ? trait.breakpoints.map((step) => `${step}`).join(' / ')
              : t({ ar: 'خاصية فريدة', en: 'Unique trait', ja: 'ユニーク特性' })}
            {trait.active && trait.nextBreakpoint
              ? ` · ${t({ ar: 'التالي', en: 'next', ja: '次' })} ${trait.nextBreakpoint}`
              : ''}
          </div>
        </div>
        <span className="trait-count">{trait.count}</span>
      </div>
    );
  };

  return (
    <div className="fade-in">
      <div className="breadcrumb">
        <Link to={localizePath('/')}>{t({ ar: 'الكومبوهات', en: 'Comps', ja: '構成' })}</Link>
        <ChevronLeft size={12} />
        <span>{t(comp.name)}</span>
      </div>

      <header
        className="comp-hero"
        style={{ '--tier-color': style.color, '--tier-glow': style.glow } as CSSProperties}
      >
        <div className="tier-badge-large">{comp.tier}</div>
        <div style={{ minWidth: 0 }}>
          <h1 className="comp-title">{t(comp.name)}</h1>
          <p className="comp-hero-sub">{t(comp.subtitle)}</p>
          <div className="tag-row">
            <span className="tag gold">
              <Swords size={12} />
              {t({ ar: 'مستوى', en: 'Tier', ja: 'ティア' })} {comp.tier} · {t(style.label)}
            </span>
            <span className="tag">
              <Compass size={12} />
              {t(comp.playstyle)}
            </span>
            <span className="tag">
              <Gauge size={12} />
              {t(comp.level)}
            </span>
            <span className="tag">
              <Shield size={12} />
              {t({ ar: 'صعوبة', en: 'Difficulty', ja: '難易度' })} {comp.difficulty}/3
            </span>
            <span className="tag">
              {activeTraits.length} {t({ ar: 'خواص مفعّلة', en: 'active traits', ja: '発動中の特性' })}
            </span>
          </div>
          <Link
            className="btn btn-ghost"
            to={localizePath(`/builder?load=${comp.slug}`)}
            style={{ marginTop: 12, width: 'fit-content' }}
          >
            <Wrench size={14} />
            {t({
              ar: 'جرّب هذا الكومبو في المنشئ',
              en: 'Try this comp in the builder',
              ja: 'この構成をビルダーで試す',
            })}
          </Link>
        </div>
      </header>

      <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.9, maxWidth: 900, marginBottom: 18 }}>
        {t(comp.summary)}
      </p>

      <div className="comp-layout">
        <div>
          <Board comp={comp} />
          {comp.earlyUnits?.length ? (
            <section className="panel" style={{ marginTop: 16 }}>
              <h2 className="panel-title">
                <Swords size={15} />
                {t({ ar: 'وحدات البداية', en: 'Early units', ja: '序盤ユニット' })}
                <span className="hint">
                  {t({ ar: 'اللي تمسكهم من الستيچ 2–3', en: 'Hold these in stage 2–3', ja: 'ステージ2〜3で確保' })}
                </span>
              </h2>
              <div className="early-row">
                {comp.earlyUnits.map((id) => {
                  const champion = championMap.get(id);
                  if (!champion) return null;
                  return (
                    <div className="early-chip" key={id} data-tip-kind="champion" data-tip-id={id}>
                      <Portrait championId={id} />
                      <span className="early-chip-name">{t(champion.name)}</span>
                      <span
                        className="unit-cost"
                        style={{ '--cost-color': costColor(champion.cost) } as CSSProperties}
                      >
                        {champion.cost}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}
        </div>

        <aside style={{ display: 'grid', gap: 16 }}>
          <section className="panel">
            <h2 className="panel-title">
              <Shield size={15} />
              {t({ ar: 'الخواص المفعّلة', en: 'Active traits', ja: '発動中の特性' })}
              <span className="hint">
                {traits.length} {t({ ar: 'خاصية', en: 'traits', ja: '特性' })}
              </span>
            </h2>
            <div className="trait-list">{activeTraits.map(renderTrait)}</div>
            {inactiveTraits.length > 0 && (
              <details className="trait-more">
                <summary>
                  {t({ ar: 'خواص غير مفعّلة', en: 'Inactive traits', ja: '未発動の特性' })} ({inactiveTraits.length})
                </summary>
                <div className="trait-list">{inactiveTraits.map(renderTrait)}</div>
              </details>
            )}
          </section>

          <section className="panel">
            <h2 className="panel-title">
              <Sparkles size={15} />
              {t({ ar: 'التعزيزات المفضلة', en: 'Preferred augments', ja: 'おすすめ强化符文' })}
            </h2>
            <div className="augment-list">
              {comp.augments.map((entry) => {
                const augment = augmentMap.get(entry.id);
                if (!augment) return null;
                return (
                  <div className="augment-row" key={entry.id} data-tip-kind="augment" data-tip-id={entry.id}>
                    <div className="augment-icon">
                      {augment.icon ? <img src={augment.icon} alt="" loading="lazy" /> : <Sparkles size={15} />}
                    </div>
                    <div>
                      <div className="augment-name">
                        {t(augment.name)}
                        <span className={`augment-tier ${augmentTierClass[entry.tier]}`}>
                          {t(
                            entry.tier === 'silver'
                              ? { ar: 'فضي', en: 'Silver', ja: 'シルバー' }
                              : entry.tier === 'gold'
                                ? { ar: 'ذهبي', en: 'Gold', ja: 'ゴールド' }
                                : { ar: 'منشوري', en: 'Prismatic', ja: 'プリズム' },
                          )}
                        </span>
                      </div>
                      <p className="augment-why">{t(entry.why)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </aside>
      </div>

      <div className="detail-sections">
        <section className="panel">
          <h2 className="panel-title">
            <BookOpen size={15} />
            {t({ ar: 'خطة اللعب والترقيم', en: 'Game plan & leveling', ja: '攻略とレベリング' })}
          </h2>
          <div className="leveling">
            {comp.leveling.map((step) => (
              <div className="level-step" key={step.stage.en}>
                <span className="step-stage">{t(step.stage)}</span>
                <p className="step-text">{t(step.text)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2 className="panel-title">
            <Lightbulb size={15} />
            {t({ ar: 'نصائح للصعود', en: 'Climb tips', ja: '上位へのコツ' })}
          </h2>
          <div className="tips-list">
            {comp.tips.map((tip) => (
              <div className="tip-row" key={tip.en}>
                <Sparkles size={13} />
                <span>{t(tip)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="detail-sections">
        <section className="panel">
          <h2 className="panel-title">
            <Swords size={15} />
            {t({ ar: 'الوحدات والعناصر', en: 'Units & items', ja: 'ユニットとアイテム' })}
            <span className="hint">
              {comp.units.length} {t({ ar: 'وحدة', en: 'units', ja: '体' })}
            </span>
          </h2>
          <div className="unit-grid">
            {comp.units.map((unit) => {
              const champion = championMap.get(unit.champion);
              if (!champion) return null;
              return (
                <div className="unit-card" key={`${unit.champion}-${unit.row}-${unit.col}`}>
                  <Portrait championId={unit.champion} />
                  <div style={{ minWidth: 0 }}>
                    <div className="unit-card-name">
                      {t(champion.name)}
                      <span
                        className="unit-cost"
                        style={{ '--cost-color': costColor(champion.cost) } as CSSProperties}
                      >
                        {champion.cost}
                      </span>
                      <span style={{ color: '#f5c451', fontSize: 10 }}>{'★'.repeat(unit.star)}</span>
                    </div>
                    <div className="unit-card-items">
                      {unit.items.length === 0 ? (
                        <span className="empty">{t({ ar: 'بدون عناصر', en: 'No items', ja: '装備なし' })}</span>
                      ) : (
                        unit.items.map((itemId) => {
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
                        })
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="panel">
          <h2 className="panel-title">
            <RefreshCw size={15} />
            {t({ ar: 'بدائل ومرونة', en: 'Alternatives & flexibility', ja: '代替と柔軟性' })}
          </h2>
          <div className="alt-list">
            {comp.alternatives.map((alternative) => {
              const replacement = championMap.get(alternative.champion);
              const original = championMap.get(alternative.replaces);
              return (
                <div className="alt-row" key={`${alternative.champion}-${alternative.replaces}`}>
                  <div className="alt-icons">
                    {replacement && <Portrait championId={replacement.id} />}
                    <ArrowLeft size={12} className="alt-arrow" />
                    {original && <Portrait championId={original.id} />}
                  </div>
                  <p className="alt-text">
                    <strong>{replacement ? t(replacement.name) : ''}</strong>{' '}
                    {t({ ar: 'بدل', en: 'replaces', ja: 'は' })} {original ? t(original.name) : ''} —{' '}
                    {t(alternative.note)}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="muted" style={{ fontSize: 11, marginTop: 12, lineHeight: 1.8 }}>
            {t({
              ar: 'المرونة أهم من القائمة الثابتة: بدّل الوحدات حسب النجوم والعناصر المتوفرة في لوبيك.',
              en: 'Flexibility beats a fixed list: swap units based on stars and available items in your lobby.',
              ja: '固定リストより柔軟性が重要：ロビーの星とアイテムに合わせてユニットを交換しよう。',
            })}
          </p>
        </section>
      </div>
    </div>
  );
}

function costColor(cost: number): string {
  return { 1: '#9aa4b2', 2: '#3fbf7f', 3: '#3b9ae1', 4: '#b45cf0', 5: '#f0b232' }[cost] ?? '#9aa4b2';
}
