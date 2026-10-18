import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Flame, Search, Sparkles } from 'lucide-react';
import { champions, comps, items, meta, tierStyles, traits } from '../lib/data';
import { tierLabels, tierOrder } from '../data/comps';
import type { Tier } from '../lib/types';
import { CompCard } from '../components/CompCard';
import { Portrait } from '../components/Portrait';

type Filter = Tier | 'ALL';

export function Home() {
  const [filter, setFilter] = useState<Filter>('ALL');

  const grouped = useMemo(
    () =>
      tierOrder.map((tier) => ({
        tier,
        comps: comps.filter((comp) => comp.tier === tier && (filter === 'ALL' || filter === tier)),
      })),
    [filter],
  );

  const visibleCount = grouped.reduce((sum, group) => sum + group.comps.length, 0);
  const spotlight = comps[0];
  const spotlightStyle = tierStyles[spotlight.tier];

  return (
    <div className="fade-in">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
          <span className="hero-badge">
            <Sparkles size={13} />
            المجموعة 18 · باتش {meta.patch} · {meta.updated}
          </span>
          <h1 className="hero-title">
            أتقن الميتا.
            <br />
            <span className="gradient-text">واصعد بثقة.</span>
          </h1>
          <p className="hero-sub">
            أفضل الكومبوهات والتشكيلات بالعربية، مع مواقع الوحدات والعناصر وخطة اللعب لكل مرحلة.
            كل ما تحتاجه للصعود في Teamfight Tactics في مكان واحد.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#tierlist">
              <Flame size={16} />
              استعرض الكومبوهات
            </a>
            <Link className="btn btn-ghost" to="/champions">
              <Search size={16} />
              ابحث عن بطل
            </Link>
          </div>
          <div className="hero-stats">
            <div>
              <div className="stat-value">{comps.length}</div>
              <div className="stat-label">كومبو محدث</div>
            </div>
            <div>
              <div className="stat-value">{champions.length}</div>
              <div className="stat-label">بطل في المجموعة</div>
            </div>
            <div>
              <div className="stat-value">{traits.length}</div>
              <div className="stat-label">خاصية</div>
            </div>
            <div>
              <div className="stat-value">{items.length}</div>
              <div className="stat-label">عنصر</div>
            </div>
          </div>
          </div>

          <aside
            className="hero-showcase"
            style={{ '--tier-color': spotlightStyle.color } as CSSProperties}
          >
            <div className="showcase-head">
              <div>
                <div className="showcase-kicker">كومبو الأسبوع</div>
                <div className="showcase-title">{spotlight.name}</div>
              </div>
              <div className="showcase-tier">{spotlight.tier}</div>
            </div>
            <div className="showcase-units">
              {spotlight.units.map((unit) => (
                <Portrait key={unit.champion} championId={unit.champion} />
              ))}
            </div>
            <div className="showcase-foot">
              <span>
                {spotlight.playstyle} · {spotlight.level}
              </span>
              <Link className="comp-link" to={`/comp/${spotlight.slug}`}>
                التفاصيل
                <ArrowLeft size={13} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section id="tierlist">
        <div className="section-head">
          <div>
            <h2 className="section-title">قائمة المستويات</h2>
            <p className="section-sub">
              مرتبة حسب القوة في الباتش الحالي · {visibleCount} كومبو معروض
            </p>
          </div>
          <div className="tier-tabs" role="tablist" aria-label="تصفية المستويات">
            <button
              className={`tier-tab ${filter === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilter('ALL')}
              role="tab"
              aria-selected={filter === 'ALL'}
            >
              الكل
            </button>
            {tierOrder.map((tier) => (
              <button
                key={tier}
                className={`tier-tab ${filter === tier ? 'active' : ''}`}
                onClick={() => setFilter(tier)}
                role="tab"
                aria-selected={filter === tier}
                style={filter === tier ? { color: tierStyles[tier].color } : undefined}
              >
                {tier} · {tierLabels[tier]}
              </button>
            ))}
          </div>
        </div>

        <div className="compections">
          {grouped
            .filter((group) => group.comps.length > 0)
            .map((group) => {
              const style = tierStyles[group.tier];
              return (
                <div className="tier-group" key={group.tier}>
                  <div
                    className="tier-rail"
                    style={
                      {
                        '--tier-color': style.color,
                        borderColor: `${style.color}33`,
                      } as CSSProperties
                    }
                  >
                    <span className="tier-letter" style={{ color: style.color }}>
                      {group.tier}
                    </span>
                    <span className="tier-name">{tierLabels[group.tier]}</span>
                    <span className="tier-count">{group.comps.length} كومبو</span>
                  </div>
                  <div className="comp-grid">
                    {group.comps.map((comp) => (
                      <CompCard comp={comp} key={comp.slug} />
                    ))}
                  </div>
                </div>
              );
            })}
        </div>

        {visibleCount === 0 && (
          <div className="empty-state">لا توجد كومبوهات في هذا المستوى حاليًا.</div>
        )}

        <div
          className="panel"
          style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}
        >
          <div>
            <div style={{ fontWeight: 800, marginBottom: 2 }}>جديد على اللعبة؟</div>
            <div className="muted" style={{ fontSize: 12.5 }}>
              ابدأ بكومبو السهل مثل وحش الريفت أو إلدروود، ثم جرّب الكومبوهات التنافسية تدريجيًا.
            </div>
          </div>
          <Link className="btn btn-ghost" to="/traits" style={{ marginInlineStart: 'auto', height: 36 }}>
            تعلّم الخواص
            <ArrowLeft size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
