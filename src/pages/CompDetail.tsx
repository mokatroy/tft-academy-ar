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
import { tierLabels } from '../data/comps';
import { Board } from '../components/Board';
import { Portrait } from '../components/Portrait';

const augmentTierClass: Record<string, string> = {
  فضي: 't-silver',
  ذهبي: 't-gold',
  منشوري: 't-prism',
};

export function CompDetail() {
  const { slug } = useParams();
  const comp = getComp(slug);

  useEffect(() => {
    if (!comp) return undefined;
    const previous = document.title;
    document.title = `${comp.name} — كومبو ${comp.tier} | أكاديمية TFT`;
    return () => {
      document.title = previous;
    };
  }, [comp]);

  if (!comp) {
    return (
      <div className="empty-state">
        <p>لم نجد هذا الكومب.</p>
        <Link className="btn btn-ghost" to="/" style={{ marginTop: 12 }}>
          العودة إلى قائمة المستويات
        </Link>
      </div>
    );
  }

  const style = tierStyles[comp.tier];
  const traits = compTraits(comp);
  const activeTraits = traits.filter((trait) => trait.active);
  const inactiveTraits = traits.filter((trait) => !trait.active);

  const renderTrait = (trait: (typeof traits)[number]) => {
    const traitMeta = getTraitMeta(trait.name);
    return (
      <div
        className={`trait-row ${trait.active ? 'active' : ''}`}
        key={trait.name}
        style={{ '--trait-color': traitMeta.color } as CSSProperties}
      >
        <span className="trait-icon">
          <traitMeta.Icon size={16} />
        </span>
        <div>
          <div className="trait-name">{trait.name}</div>
          <div className="trait-steps">
            {trait.breakpoints.length > 0
              ? trait.breakpoints.map((step) => `${step}`).join(' / ')
              : 'خاصية فريدة'}
            {trait.active && trait.nextBreakpoint ? ` · التالي ${trait.nextBreakpoint}` : ''}
          </div>
        </div>
        <span className="trait-count">{trait.count}</span>
      </div>
    );
  };

  return (
    <div className="fade-in">
      <div className="breadcrumb">
        <Link to="/">الكومبوهات</Link>
        <ChevronLeft size={12} />
        <span>{comp.name}</span>
      </div>

      <header
        className="comp-hero"
        style={{ '--tier-color': style.color, '--tier-glow': style.glow } as CSSProperties}
      >
        <div className="tier-badge-large">{comp.tier}</div>
        <div style={{ minWidth: 0 }}>
          <h1 className="comp-title">{comp.name}</h1>
          <p className="comp-hero-sub">{comp.subtitle}</p>
          <div className="tag-row">
            <span className="tag gold">
              <Swords size={12} />
              مستوى {comp.tier} · {tierLabels[comp.tier]}
            </span>
            <span className="tag">
              <Compass size={12} />
              {comp.playstyle}
            </span>
            <span className="tag">
              <Gauge size={12} />
              {comp.level}
            </span>
            <span className="tag">
              <Shield size={12} />
              صعوبة {comp.difficulty}/3
            </span>
            <span className="tag">{activeTraits.length} خواص مفعّلة</span>
          </div>
        </div>
      </header>

      <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.9, maxWidth: 900, marginBottom: 18 }}>
        {comp.summary}
      </p>

      <div className="comp-layout">
        <div>
          <Board comp={comp} />
        </div>

        <aside style={{ display: 'grid', gap: 16 }}>
          <section className="panel">
            <h2 className="panel-title">
              <Shield size={15} />
              الخواص المفعّلة
              <span className="hint">{traits.length} خاصية</span>
            </h2>
            <div className="trait-list">{activeTraits.map(renderTrait)}</div>
            {inactiveTraits.length > 0 && (
              <details className="trait-more">
                <summary>خواص غير مفعّلة ({inactiveTraits.length})</summary>
                <div className="trait-list">{inactiveTraits.map(renderTrait)}</div>
              </details>
            )}
          </section>

          <section className="panel">
            <h2 className="panel-title">
              <Sparkles size={15} />
              التعزيزات المفضلة
            </h2>
            <div className="augment-list">
              {comp.augments.map((entry) => {
                const augment = augmentMap.get(entry.id);
                if (!augment) return null;
                return (
                  <div className="augment-row" key={entry.id}>
                    <div className="augment-icon">
                      {augment.icon ? <img src={augment.icon} alt="" loading="lazy" /> : <Sparkles size={15} />}
                    </div>
                    <div>
                      <div className="augment-name">
                        {augment.name}
                        <span className={`augment-tier ${augmentTierClass[entry.tier]}`}>{entry.tier}</span>
                      </div>
                      <p className="augment-why">{entry.why}</p>
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
            خطة اللعب والترقيم
          </h2>
          <div className="leveling">
            {comp.leveling.map((step) => (
              <div className="level-step" key={step.stage}>
                <span className="step-stage">{step.stage}</span>
                <p className="step-text">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2 className="panel-title">
            <Lightbulb size={15} />
            نصائح للصعود
          </h2>
          <div className="tips-list">
            {comp.tips.map((tip) => (
              <div className="tip-row" key={tip}>
                <Sparkles size={13} />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="detail-sections">
        <section className="panel">
          <h2 className="panel-title">
            <Swords size={15} />
            الوحدات والعناصر
            <span className="hint">{comp.units.length} وحدة</span>
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
                      {champion.name}
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
                        <span className="empty">بدون عناصر</span>
                      ) : (
                        unit.items.map((itemId) => {
                          const item = itemMap.get(itemId);
                          return item?.icon ? (
                            <img key={itemId} src={item.icon} alt={item.name} title={item.name} loading="lazy" />
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
            بدائل ومرونة
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
                    <strong>{replacement?.name}</strong> بدل {original?.name} — {alternative.note}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="muted" style={{ fontSize: 11, marginTop: 12, lineHeight: 1.8 }}>
            المرونة أهم من القائمة الثابتة: بدّل الوحدات حسب النجوم والعناصر المتوفرة في لوبيك.
          </p>
        </section>
      </div>
    </div>
  );
}

function costColor(cost: number): string {
  return { 1: '#9aa4b2', 2: '#3fbf7f', 3: '#3b9ae1', 4: '#b45cf0', 5: '#f0b232' }[cost] ?? '#9aa4b2';
}
