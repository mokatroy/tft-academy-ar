import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Lightbulb,
  RefreshCw,
  Search,
  ShoppingCart,
  Sparkles,
  Swords,
  Users,
} from 'lucide-react';
import {
  augmentMap,
  championMap,
  comps,
  compTraits,
  getComp,
  itemMap,
  tierStyles,
} from '../lib/data';
import { useI18n } from '../lib/i18n';
import { Board } from '../components/Board';
import { Portrait } from '../components/Portrait';

const STORAGE_COMP = 'play.comp';
const STORAGE_STAGE = 'play.stage';

const augmentTierClass: Record<string, string> = {
  silver: 't-silver',
  gold: 't-gold',
  prism: 't-prism',
};

/** localStorage is unavailable during server rendering — keep the guards tiny. */
function readStored(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStored(key: string, value: string) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* private mode — the URL still carries the selection */
  }
}

export function Play() {
  const { t, localizePath } = useI18n();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const [slug, setSlug] = useState<string | null>(() => {
    const fromUrl = params.get('comp');
    if (fromUrl) return getComp(fromUrl) ? fromUrl : null;
    const stored = readStored(STORAGE_COMP);
    return stored && getComp(stored) ? stored : null;
  });

  const [stage, setStage] = useState(() => {
    const fromUrl = Number(params.get('stage'));
    if (Number.isFinite(fromUrl) && fromUrl >= 0) return Math.floor(fromUrl);
    const stored = Number(readStored(STORAGE_STAGE));
    return Number.isFinite(stored) && stored >= 0 ? Math.floor(stored) : 0;
  });

  const comp = getComp(slug ?? undefined);
  const steps = comp?.leveling ?? [];
  const current = Math.min(stage, Math.max(steps.length - 1, 0));

  // Persist the session so a refresh mid-game lands on the same comp and stage.
  useEffect(() => {
    writeStored(STORAGE_COMP, slug ?? '');
    writeStored(STORAGE_STAGE, String(current));
    const next = new URLSearchParams();
    if (slug) next.set('comp', slug);
    if (slug && current > 0) next.set('stage', String(current));
    setParams(next, { replace: true });
  }, [slug, current, setParams]);

  useEffect(() => {
    if (!comp) return undefined;
    const previous = document.title;
    document.title = `${t({ ar: 'وضع اللعب', en: 'Play mode', ja: 'プレイモード' })} — ${t(comp.name)}`;
    return () => {
      document.title = previous;
    };
  }, [comp, t]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return comps;
    return comps.filter((entry) =>
      [entry.name.ar, entry.name.en, entry.name.ja, entry.subtitle.en, entry.subtitle.ar]
        .join(' ')
        .toLowerCase()
        .includes(needle),
    );
  }, [query]);

  /* --------------------------------- picker -------------------------------- */
  if (!comp) {
    return (
      <div className="fade-in play-shell">
        <header className="play-head">
          <div>
            <span className="hero-badge">
              <Swords size={13} />
              {t({ ar: 'وضع اللعب', en: 'Play mode', ja: 'プレイモード' })}
            </span>
            <h1 className="comp-title" style={{ marginTop: 10 }}>
              {t({ ar: 'اختر الكومبو اللي هتلعبه', en: 'Pick the comp you are playing', ja: 'プレイする構成を選ぶ' })}
            </h1>
            <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.9, maxWidth: 720 }}>
              {t({
                ar: 'بعد ما تختاره، الصفحة دي هتفضل مفتوحة معاك طول المباراة: المرحلة اللي انت فيها دلوقتي، التعزيزات المناسبة، البورد والعناصر، والأولويات — من غير ما تسيب الموقع.',
                en: 'Once you pick one, this page stays open for the whole match: your current stage, the right augments, the board and items, and priorities — without ever leaving the site.',
                ja: '選ぶと、このページが試合中ずっと開いたままになります：現在のステージ、おすすめ強化符文、盤面と装備、優先事項まで——サイトを離れる必要はありません。',
              })}
            </p>
          </div>
          <label className="play-search">
            <Search size={15} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t({ ar: 'ابحث عن كومبو…', en: 'Search comps…', ja: '構成を検索…' })}
              aria-label={t({ ar: 'ابحث عن كومبو', en: 'Search comps', ja: '構成を検索' })}
            />
          </label>
        </header>

        <div className="play-pick-list">
          {filtered.map((entry) => {
            const style = tierStyles[entry.tier];
            return (
              <button
                type="button"
                className="play-pick"
                key={entry.slug}
                onClick={() => {
                  setStage(0);
                  setSlug(entry.slug);
                }}
                style={{ '--tier-color': style.color } as CSSProperties}
              >
                <span className="play-pick-tier">{entry.tier}</span>
                <span className="play-pick-main">
                  <span className="play-pick-name">{t(entry.name)}</span>
                  <span className="play-pick-sub">
                    {t(entry.playstyle)} · {t(entry.level)} ·{' '}
                    {t({ ar: 'صعوبة', en: 'Difficulty', ja: '難易度' })} {entry.difficulty}/3
                  </span>
                </span>
                <span className="play-pick-units">
                  {entry.units.slice(0, 5).map((unit) => (
                    <Portrait key={`pick-${unit.champion}`} championId={unit.champion} />
                  ))}
                </span>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="empty-state">
              {t({ ar: 'مفيش كومبو بالاسم ده.', en: 'No comp with that name.', ja: 'その名前の構成はありません。' })}
            </div>
          )}
        </div>
      </div>
    );
  }

  /* -------------------------------- live view ------------------------------ */
  const style = tierStyles[comp.tier];
  const traits = compTraits(comp).filter((trait) => trait.active);
  const step = steps[current];
  const nextStep = steps[current + 1];

  return (
    <div className="fade-in play-shell">
      <div className="play-top" style={{ '--tier-color': style.color } as CSSProperties}>
        <div className="play-top-main">
          <span className="play-top-tier">{comp.tier}</span>
          <div style={{ minWidth: 0 }}>
            <div className="play-top-name">{t(comp.name)}</div>
            <div className="play-top-sub">
              {t(comp.playstyle)} · {t(comp.level)} · {traits.slice(0, 3).map((trait) => t(trait.name)).join(' · ')}
            </div>
          </div>
        </div>
        <div className="play-top-actions">
          <Link className="btn btn-ghost" to={localizePath(`/comp/${comp.slug}`)}>
            <BookOpen size={14} />
            {t({ ar: 'تفاصيل الكومبو', en: 'Comp details', ja: '構成詳細' })}
          </Link>
          <button type="button" className="btn btn-ghost" onClick={() => setSlug(null)}>
            {t({ ar: 'غيّر الكومبو', en: 'Change comp', ja: '構成を変更' })}
          </button>
        </div>
      </div>

      <nav className="stage-tabs" aria-label={t({ ar: 'مراحل المباراة', en: 'Game stages', ja: 'ゲームステージ' })}>
        <ChevronLeft
          size={16}
          className={`stage-arrow ${current > 0 ? '' : 'off'}`}
          onClick={() => current > 0 && setStage(current - 1)}
        />
        <div className="stage-scroll">
          {steps.map((entry, index) => (
            <button
              type="button"
              key={`${entry.stage.en}-${index}`}
              className={`stage-chip ${index === current ? 'on' : ''} ${index < current ? 'done' : ''}`}
              onClick={() => setStage(index)}
              style={{ '--tier-color': style.color } as CSSProperties}
            >
              {t(entry.stage)}
            </button>
          ))}
        </div>
        <ChevronRight
          size={16}
          className={`stage-arrow ${current < steps.length - 1 ? '' : 'off'}`}
          onClick={() => current < steps.length - 1 && setStage(current + 1)}
        />
      </nav>

      <section className="play-now" style={{ '--tier-color': style.color } as CSSProperties}>
        <div className="play-now-head">
          <span className="play-now-badge">
            {t({ ar: 'المرحلة الحالية', en: 'Current stage', ja: '現在のステージ' })}
          </span>
          <strong className="play-now-stage">{step ? t(step.stage) : ''}</strong>
          <span className="play-now-count">
            {current + 1} / {steps.length}
          </span>
        </div>
        <p className="play-now-text">{step ? t(step.text) : ''}</p>
        {nextStep && (
          <p className="play-next">
            <strong>{t({ ar: 'الخطوة الجاية', en: 'Next up', ja: '次' })} — {t(nextStep.stage)}:</strong>{' '}
            {t(nextStep.text)}
          </p>
        )}
        <div className="play-now-actions">
          <button
            type="button"
            className="btn btn-ghost"
            disabled={current === 0}
            onClick={() => setStage(current - 1)}
          >
            <ChevronRight size={14} />
            {t({ ar: 'المرحلة السابقة', en: 'Previous stage', ja: '前のステージ' })}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={current >= steps.length - 1}
            onClick={() => setStage(current + 1)}
          >
            {t({ ar: 'المرحلة الجاية', en: 'Next stage', ja: '次のステージ' })}
            <ChevronLeft size={14} />
          </button>
        </div>
      </section>

      <div className="play-grid">
        <section className="panel">
          <h2 className="panel-title">
            <Swords size={15} />
            {t({ ar: 'البورد المستهدف', en: 'Target board', ja: '目標の盤面' })}
            <span className="hint">
              {comp.units.length} {t({ ar: 'وحدة', en: 'units', ja: '体' })}
            </span>
          </h2>
          <Board comp={comp} />
        </section>

        <div className="play-side">
          <section className="panel">
            <h2 className="panel-title">
              <Sparkles size={15} />
              {t({ ar: 'التعزيزات المناسبة للكومبو ده', en: 'Augments for this comp', ja: 'この構成の強化符文' })}
            </h2>
            {comp.augmentTypes && comp.augmentTypes.length > 0 && (
              <div className="tag-row" style={{ marginBottom: 12 }}>
                {comp.augmentTypes.map((type) => (
                  <span className="tag gold" key={type.en}>
                    {t(type)}
                  </span>
                ))}
              </div>
            )}
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
                        {entry.tier && (
                          <span className={`augment-tier ${augmentTierClass[entry.tier]}`}>
                            {t(
                              entry.tier === 'silver'
                                ? { ar: 'فضي', en: 'Silver', ja: 'シルバー' }
                                : entry.tier === 'gold'
                                  ? { ar: 'ذهبي', en: 'Gold', ja: 'ゴールド' }
                                  : { ar: 'منشوري', en: 'Prismatic', ja: 'プリズム' },
                            )}
                          </span>
                        )}
                      </div>
                      {entry.why && <p className="augment-why">{t(entry.why)}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="panel">
            <h2 className="panel-title">
              <Lightbulb size={15} />
              {t({ ar: 'نصائح سريعة', en: 'Quick tips', ja: 'クイックTips' })}
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
      </div>

      <div className="detail-sections">
        <section className="panel">
          <h2 className="panel-title">
            <BookOpen size={15} />
            {t({ ar: 'خطة الترقيم كاملة', en: 'Full leveling plan', ja: 'レベリング計画全体' })}
          </h2>
          <div className="leveling">
            {steps.map((entry, index) => (
              <div className={`level-step ${index === current ? 'current' : ''}`} key={`${entry.stage.en}-${index}`}>
                <span className="step-stage">{t(entry.stage)}</span>
                <p className="step-text">{t(entry.text)}</p>
                {index !== current && (
                  <button type="button" className="stage-jump" onClick={() => setStage(index)}>
                    {t({ ar: 'اعرض دي', en: 'Show', ja: '表示' })}
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <h2 className="panel-title">
            <ShoppingCart size={15} />
            {t({ ar: 'أولويات الكاروسيل', en: 'Carousel priorities', ja: 'カルーセル優先' })}
          </h2>
          <div className="unit-card-items" style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {(comp.carousel ?? []).map((itemId) => {
              const item = itemMap.get(itemId);
              return item?.icon ? (
                <img
                  key={itemId}
                  src={item.icon}
                  alt={t(item.name)}
                  title={t(item.name)}
                  data-tip-kind="item"
                  data-tip-id={itemId}
                  loading="lazy"
                  style={{ width: 30, height: 30, borderRadius: 6 }}
                />
              ) : null;
            })}
            {(comp.carousel ?? []).length === 0 && (
              <span className="muted" style={{ fontSize: 12.5 }}>
                {t({
                  ar: 'خد أي مكوّن يكمّل عناصر أبطالك.',
                  en: 'Grab any component that completes your carries’ items.',
                  ja: 'キャリーの装備が完成するコンポーネントを優先しよう。',
                })}
              </span>
            )}
          </div>
          <p className="muted" style={{ fontSize: 11.5, marginTop: 10, lineHeight: 1.8 }}>
            {t({
              ar: 'الأولوية: عناصر الكاري الأول، بعدها عناصر الجدار الأمامي، ثم أي مكوّن يقربك من عنصر مكتمل.',
              en: 'Order: first carry items, then frontline items, then any component that finishes an item.',
              ja: '優先順：メインキャリー、次に前線、次に完成まで1つ足りないアイテム。',
            })}
          </p>

          <h2 className="panel-title" style={{ marginTop: 18 }}>
            <Users size={15} />
            {t({ ar: 'الأيرلي — الوحدات قبل ما يكتمل الكومبو', en: 'Early units before the comp is online', ja: '構成完成前の序盤ユニット' })}
          </h2>
          <div className="unit-grid">
            {(comp.early ?? []).map((unit) => {
              const champion = championMap.get(unit.champion);
              if (!champion) return null;
              return (
                <div className="unit-card" key={`play-early-${unit.champion}`}>
                  <Portrait championId={unit.champion} />
                  <div style={{ minWidth: 0 }}>
                    <div className="unit-card-name">
                      {t(champion.name)}
                      <span style={{ color: '#f5c451', fontSize: 10 }}>{'★'.repeat(unit.star)}</span>
                    </div>
                    <div className="unit-card-items">
                      {unit.items.map((itemId) => {
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
                      })}
                      {unit.items.length === 0 && (
                        <span className="empty">
                          {t({ ar: 'احفظ العناصر لأبطال الكومبو', en: 'Hold items for the carries', ja: 'キャリー用に温存' })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div className="detail-sections">
        <section className="panel">
          <h2 className="panel-title">
            <RefreshCw size={15} />
            {t({ ar: 'البدائل في نهاية اللعبة', en: 'Late-game swaps', ja: '終盤の交代' })}
          </h2>
          <div className="alt-list">
            {comp.alternatives.map((alternative) => {
              const replacement = championMap.get(alternative.champion);
              const original = alternative.replaces ? championMap.get(alternative.replaces) : undefined;
              return (
                <div className="alt-row" key={`${alternative.champion}-${alternative.replaces ?? t(alternative.note)}`}>
                  <div className="alt-icons">
                    {replacement && <Portrait championId={replacement.id} />}
                    {original && (
                      <>
                        <ArrowLeft size={12} className="alt-arrow" />
                        <Portrait championId={original.id} />
                      </>
                    )}
                  </div>
                  <p className="alt-text">
                    <strong>{replacement ? t(replacement.name) : ''}</strong>
                    {original ? ` ${t({ ar: 'بدل', en: 'replaces', ja: 'は' })} ${t(original.name)} — ` : ' — '}
                    {t(alternative.note)}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="panel">
          <h2 className="panel-title">
            <Swords size={15} />
            {t({ ar: 'الوحدات اللي هتشتريها', en: 'Units to buy', ja: '購入するユニット' })}
            <span className="hint">
              {comp.units.length} {t({ ar: 'وحدة', en: 'units', ja: '体' })}
            </span>
          </h2>
          <div className="unit-grid">
            {comp.units.map((unit) => {
              const champion = championMap.get(unit.champion);
              if (!champion) return null;
              return (
                <div className="unit-card" key={`play-unit-${unit.champion}-${unit.row}-${unit.col}`}>
                  <Portrait championId={unit.champion} />
                  <div style={{ minWidth: 0 }}>
                    <div className="unit-card-name">
                      {t(champion.name)}
                      <span style={{ color: '#f5c451', fontSize: 10 }}>{'★'.repeat(unit.star)}</span>
                    </div>
                    <div className="unit-card-items">
                      {unit.items.map((itemId) => {
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
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {comp.source && (
        <p className="muted" style={{ fontSize: 11.5, marginTop: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
          <ExternalLink size={12} />
          {t({ ar: 'مصدر الكومبو', en: 'Comp source', ja: '構成の出典' })}:{' '}
          <a href={comp.source} target="_blank" rel="noreferrer noopener">
            TFT Academy
          </a>
        </p>
      )}
    </div>
  );
}
