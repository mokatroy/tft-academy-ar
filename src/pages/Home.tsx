import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Flame, Search, Sparkles } from 'lucide-react';
import { champions, comps, items, meta, tierStyles, traits } from '../lib/data';
import { tierOrder } from '../data/comps';
import type { Tier } from '../lib/types';
import { useI18n } from '../lib/i18n';
import { CompCard } from '../components/CompCard';
import { Portrait } from '../components/Portrait';

type Filter = Tier | 'ALL';

export function Home() {
  const [filter, setFilter] = useState<Filter>('ALL');
  const { t, localizePath } = useI18n();

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
              {t(meta.setName)} · {t({ ar: 'باتش', en: 'Patch', ja: 'パッチ' })} {meta.patch} ·{' '}
              {t(meta.updated)}
            </span>
            <h1 className="hero-title">
              {t({ ar: 'أتقن الميتا.', en: 'Master the meta.', ja: 'メタを制する。' })}
              <br />
              <span className="gradient-text">
                {t({ ar: 'وصعد بثقة.', en: 'Climb with confidence.', ja: '自信を持って上がれ。' })}
              </span>
            </h1>
            <p className="hero-sub">
              {t({
                ar: 'أفضل الكومبوهات والتشكيلات بالعربية، مع مواقع الوحدات والعناصر وخطة اللعب لكل مرحلة. كل ما تحتاجه للصعود في Teamfight Tactics في مكان واحد.',
                en: 'The best comps and boards, with unit positions, items and a stage-by-stage game plan. Everything you need to climb in Teamfight Tactics in one place.',
                ja: 'トップ構成と盤面、ユニット配置、アイテム、ステージ別プラン。Teamfight Tacticsで上位に上がるために必要なことをすべてここに。',
              })}
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#tierlist">
                <Flame size={16} />
                {t({ ar: 'استعرض الكومبوهات', en: 'Browse comps', ja: '構成を見る' })}
              </a>
              <Link className="btn btn-ghost" to={localizePath('/champions')}>
                <Search size={16} />
                {t({ ar: 'ابحث عن بطل', en: 'Find a champion', ja: 'チャンピオンを探す' })}
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <div className="stat-value">{comps.length}</div>
                <div className="stat-label">{t({ ar: 'كومبو محدث', en: 'updated comps', ja: '更新構成' })}</div>
              </div>
              <div>
                <div className="stat-value">{champions.length}</div>
                <div className="stat-label">{t({ ar: 'بطل في المجموعة', en: 'champions', ja: 'チャンピオン' })}</div>
              </div>
              <div>
                <div className="stat-value">{traits.length}</div>
                <div className="stat-label">{t({ ar: 'خاصية', en: 'traits', ja: '特性' })}</div>
              </div>
              <div>
                <div className="stat-value">{items.length}</div>
                <div className="stat-label">{t({ ar: 'عنصر', en: 'items', ja: 'アイテム' })}</div>
              </div>
            </div>
          </div>

          <aside
            className="hero-showcase"
            style={{ '--tier-color': spotlightStyle.color } as CSSProperties}
          >
            <div className="showcase-head">
              <div>
                <div className="showcase-kicker">{t({ ar: 'كومبو الأسبوع', en: 'Comp of the week', ja: '今週の構成' })}</div>
                <div className="showcase-title">{t(spotlight.name)}</div>
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
                {t(spotlight.playstyle)} · {t(spotlight.level)}
              </span>
              <Link className="comp-link" to={localizePath(`/comp/${spotlight.slug}`)}>
                {t({ ar: 'التفاصيل', en: 'Details', ja: '詳細' })}
                <ArrowLeft size={13} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section id="tierlist">
        <div className="section-head">
          <div>
            <h2 className="section-title">{t({ ar: 'قائمة المستويات', en: 'Tier list', ja: 'ティアリスト' })}</h2>
            <p className="section-sub">
              {t({ ar: 'مرتبة حسب القوة في الباتش الحالي', en: 'Ranked by strength in the current patch', ja: '現在のパッチの強さ順' })} · {visibleCount}{' '}
              {t({ ar: 'كومبو معروض', en: 'comps shown', ja: '件の構成' })}
            </p>
          </div>
          <div className="tier-tabs" role="tablist" aria-label={t({ ar: 'تصفية المستويات', en: 'Tier filters', ja: 'ティア絞り込み' })}>
            <button
              className={`tier-tab ${filter === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilter('ALL')}
              role="tab"
              aria-selected={filter === 'ALL'}
            >
              {t({ ar: 'الكل', en: 'All', ja: 'すべて' })}
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
                {tier} · {t(tierStyles[tier].label)}
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
                    <span className="tier-name">{t(style.label)}</span>
                    <span className="tier-count">
                      {group.comps.length} {t({ ar: 'كومبو', en: 'comps', ja: '構成' })}
                    </span>
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
          <div className="empty-state">
            {t({ ar: 'لا توجد كومبوهات في هذا المستوى حاليًا.', en: 'No comps in this tier right now.', ja: 'このティアに構成はありません。' })}
          </div>
        )}

        <div
          className="panel"
          style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}
        >
          <div>
            <div style={{ fontWeight: 800, marginBottom: 2 }}>
              {t({ ar: 'جديد على اللعبة؟', en: 'New to the game?', ja: '初めてプレイ？' })}
            </div>
            <div className="muted" style={{ fontSize: 12.5 }}>
              {t({
                ar: 'ابدأ بكومبو السهل مثل وحش الريفت أو إلدروود، ثم جرّب الكومبوهات التنافسية تدريجيًا.',
                en: 'Start with an easy comp like Riftbeast or Elderwood, then try the competitive comps gradually.',
                ja: 'リフトビーストやエルダーウッドなどの易しい構成から始め、徐々に競技向け構成へ。',
              })}
            </div>
          </div>
          <Link className="btn btn-ghost" to={localizePath('/traits')} style={{ marginInlineStart: 'auto', height: 36 }}>
            {t({ ar: 'تعلّم الخواص', en: 'Learn traits', ja: '特性を学ぶ' })}
            <ArrowLeft size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
