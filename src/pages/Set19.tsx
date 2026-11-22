import '../set19.css';
import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Info, Music4, Search, Sparkles, X } from 'lucide-react';
import { costColors, costLabel } from '../lib/data';
import {
  set19ChampionMap,
  set19Champions,
  set19Items,
  set19Meta,
  set19TraitMap,
  set19Traits,
} from '../lib/set19';
import type { Set19Champion, Set19TraitType } from '../lib/set19';
import { useI18n } from '../lib/i18n';
import type { Locale } from '../lib/types';

type TraitFilter = 'all' | Set19TraitType;

const traitTypeLabel: Record<Set19TraitType, { ar: string; en: string; ja: string }> = {
  origin: { ar: 'فرقة', en: 'Band', ja: 'バンド' },
  class: { ar: 'فئة', en: 'Class', ja: 'クラス' },
  unique: { ar: 'فريدة', en: 'Unique', ja: 'ユニーク' },
};

const traitTypeColor: Record<Set19TraitType, string> = {
  origin: '#f0b232',
  class: '#38bdf8',
  unique: '#c084fc',
};

export function Set19() {
  const { t, locale } = useI18n();
  const [query, setQuery] = useState('');
  const [champQuery, setChampQuery] = useState('');
  const [cost, setCost] = useState<number | null>(null);
  const [traitFilter, setTraitFilter] = useState<TraitFilter>('all');
  const [openChampion, setOpenChampion] = useState<Set19Champion | null>(null);

  useEffect(() => {
    document.title = `${t(set19Meta.title)} — ${t({
      ar: 'المجموعة 19',
      en: 'Set 19',
      ja: 'セット19',
    })} | MokaTroy`;
  }, [t]);

  const bands = useMemo(() => set19Traits.filter((trait) => trait.type === 'origin'), []);

  const visibleTraits = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return set19Traits
      .filter((trait) => (traitFilter === 'all' ? true : trait.type === traitFilter))
      .filter((trait) => (normalized ? trait.name[locale].toLowerCase().includes(normalized) : true))
      .sort((a, b) => b.champions.length - a.champions.length);
  }, [query, traitFilter, locale]);

  const visibleChampions = useMemo(() => {
    const normalized = champQuery.trim().toLowerCase();
    return set19Champions.filter((champion) => {
      if (cost !== null && champion.cost !== cost) return false;
      if (!normalized) return true;
      const traitNames = champion.traits.map((id) => set19TraitMap.get(id)?.name[locale] ?? id).join(' ');
      return `${champion.name[locale]} ${champion.name.en} ${traitNames} ${champion.ability.name[locale]}`
        .toLowerCase()
        .includes(normalized);
    });
  }, [champQuery, cost, locale]);

  const traitName = (id: string) => set19TraitMap.get(id)?.name[locale] ?? id;

  return (
    <div className="fade-in">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="hero-badge">
              <Sparkles size={13} />
              {t({ ar: 'المجموعة 19 · سيرفر PBE', en: 'Set 19 · PBE server', ja: 'セット19 · PBEサーバー' })}
            </span>
            <h1 className="hero-title">
              {t({ ar: 'المجموعة 19:', en: 'Set 19:', ja: 'セット19：' })}{' '}
              <span className="gradient-text">{t(set19Meta.title)}</span>
            </h1>
            <p className="hero-sub">
              {t({
                ar: 'جولة عالمية على المسارح الكبرى: 14 فرقة و10 فنانين منفردين وأكثر من 1000 مزج متغيّر. هنا تجد كل فرق السيزون وأبطاله وعناصره قبل أن يصل إلى السيرفر الرسمي.',
                en: 'A global tour with bigger stages: 14 bands and 10 solo artists with 1000+ dynamic remixes. Every Set 19 band, champion and item, collected before it hits live servers.',
                ja: '世界ツアーで大きなステージへ。14のバンドと10人のソロアーティスト、1000以上のダイナミックリミックス。ライブサーバー実装前に、セット19のバンド・チャンピオン・アイテムをまとめました。',
              })}
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#set19-traits">
                <Music4 size={16} />
                {t({ ar: 'الفرق والخواص', en: 'Bands & traits', ja: 'バンドと特性' })}
              </a>
              <a className="btn btn-ghost" href="#set19-champions">
                <Search size={16} />
                {t({ ar: 'تصفّح الأبطال', en: 'Browse champions', ja: 'チャンピオンを見る' })}
              </a>
            </div>
            <div className="hero-stats">
              <div>
                <div className="stat-value">{set19Champions.length}</div>
                <div className="stat-label">{t({ ar: 'بطل', en: 'champions', ja: 'チャンピオン' })}</div>
              </div>
              <div>
                <div className="stat-value">{set19Traits.length}</div>
                <div className="stat-label">{t({ ar: 'خاصية', en: 'traits', ja: '特性' })}</div>
              </div>
              <div>
                <div className="stat-value">{bands.length}</div>
                <div className="stat-label">{t({ ar: 'فرقة موسيقية', en: 'bands', ja: 'バンド' })}</div>
              </div>
              <div>
                <div className="stat-value">{set19Meta.augmentSummary.total}</div>
                <div className="stat-label">{t({ ar: 'أوغمنت', en: 'augments', ja: 'オーグメント' })}</div>
              </div>
            </div>
          </div>

          <div className="hero-showcase">
            <div className="showcase-head">
              <div>
                <div className="showcase-kicker">{t({ ar: 'الفرق', en: 'BANDS', ja: 'バンド' })}</div>
                <div className="showcase-title">{t({ ar: '14 فرقة على المسرح', en: '14 bands on tour', ja: '14バンドが参戦' })}</div>
              </div>
            </div>
            <div className="set19-band-grid">
              {bands.map((band) => (
                <div className="set19-band" key={band.id} title={band.name[locale]}>
                  <img src={band.icon} alt="" loading="lazy" />
                  <span>{band.name[locale]}</span>
                </div>
              ))}
            </div>
            <div className="showcase-foot">
              <span>{set19Meta.patch}</span>
              <a href={set19Meta.source} target="_blank" rel="noreferrer">
                TFT Academy ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <p className="set19-note">
        <Info size={14} />
        <span>
          {t({
            ar: 'بيانات المجموعة 19 مأخوذة من سيرفر PBE وقد تتغير قبل الإطلاق الرسمي. أوصاف القدرات تُعرض بالإنجليزية لأن Riot لم تُصدر ترجمتها العربية واليابانية بعد.',
            en: 'Set 19 data comes from the PBE server and can change before release. Ability descriptions are shown in English because Riot has not shipped their Arabic/Japanese text yet.',
            ja: 'セット19のデータはPBEサーバーのもので、正式リリース前に変更される可能性があります。アビリティ説明はRiotの日本語／アラビア語テキストが未提供のため英語で表示しています。',
          })}
        </span>
      </p>

      <section id="set19-traits" style={{ paddingTop: 26 }}>
        <div className="section-head">
          <div>
            <h2 className="section-title">
              {t({ ar: 'الفرق والخواص', en: 'Bands & traits', ja: 'バンドと特性' })}
            </h2>
            <p className="section-sub">
              {t({
                ar: 'كل خواص المجموعة 19 مع عتبات التفعيل والأبطال الذين يحملونها',
                en: 'Every Set 19 trait with its activation breakpoints and champions',
                ja: 'セット19の全特性、発動しきい値、保有チャンピオン',
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
          <div className="filter-group">
            {(['all', 'origin', 'class', 'unique'] as TraitFilter[]).map((value) => (
              <button
                key={value}
                className={`filter-chip ${traitFilter === value ? 'active' : ''}`}
                onClick={() => setTraitFilter(value)}
              >
                {value === 'all'
                  ? t({ ar: 'الكل', en: 'All', ja: 'すべて' })
                  : t(traitTypeLabel[value])}
              </button>
            ))}
          </div>
        </div>

        <div className="trait-grid">
          {visibleTraits.map((trait) => (
            <article className="trait-card" key={trait.id}>
              <div className="trait-card-head">
                <span
                  className="trait-icon"
                  style={
                    {
                      '--trait-color': traitTypeColor[trait.type],
                      color: traitTypeColor[trait.type],
                      borderColor: `${traitTypeColor[trait.type]}44`,
                      background: `${traitTypeColor[trait.type]}18`,
                    } as CSSProperties
                  }
                >
                  <img src={trait.icon} alt="" width={22} height={22} loading="lazy" />
                </span>
                <div>
                  <div className="trait-name" style={{ fontSize: 15 }}>
                    {trait.name[locale]}
                  </div>
                  <div className="trait-steps">{t(traitTypeLabel[trait.type])}</div>
                </div>
                <span className="trait-pill" style={{ marginInlineStart: 'auto' }}>
                  {trait.champions.length} {t({ ar: 'أبطال', en: 'champs', ja: '体' })}
                </span>
              </div>

              <p className="muted" style={{ fontSize: 11.5, lineHeight: 1.7, margin: '8px 0 4px' }}>
                {trait.desc[locale]}
              </p>

              <div className="breakpoint-row">
                {trait.breakpoints.length > 0 ? (
                  trait.breakpoints.map((step) => (
                    <span className="breakpoint" key={step}>
                      {step}
                    </span>
                  ))
                ) : (
                  <span className="breakpoint">{t({ ar: 'فريدة', en: 'Unique', ja: 'ユニーク' })}</span>
                )}
              </div>

              <div className="comp-units" style={{ marginTop: 10, justifyContent: 'flex-start' }}>
                {trait.champions.slice(0, 7).map((id) => {
                  const champion = set19ChampionMap.get(id);
                  if (!champion) return null;
                  return (
                    <button
                      key={id}
                      className="set19-unit"
                      title={champion.name[locale]}
                      onClick={() => setOpenChampion(champion)}
                    >
                      <img src={champion.icon} alt={champion.name[locale]} loading="lazy" />
                    </button>
                  );
                })}
                {trait.champions.length > 7 && <span className="trait-pill">+{trait.champions.length - 7}</span>}
              </div>
            </article>
          ))}
        </div>

        {visibleTraits.length === 0 && (
          <div className="empty-state">
            {t({ ar: 'لا توجد خواص مطابقة.', en: 'No traits match.', ja: '該当する特性がありません。' })}
          </div>
        )}
      </section>

      <section id="set19-champions" style={{ paddingTop: 40 }}>
        <div className="section-head">
          <div>
            <h2 className="section-title">{t({ ar: 'أبطال المجموعة 19', en: 'Set 19 champions', ja: 'セット19のチャンピオン' })}</h2>
            <p className="section-sub">
              {t({
                ar: 'اضغط على أي بطل لعرض قدرته وإحصاءاته',
                en: 'Tap a champion to see its ability and stats',
                ja: 'チャンピオンをタップするとアビリティとステータスが表示されます',
              })}
            </p>
          </div>
        </div>

        <div className="filter-bar">
          <label className="search-field">
            <Search size={15} />
            <input
              value={champQuery}
              onChange={(event) => setChampQuery(event.target.value)}
              placeholder={t({ ar: 'ابحث باسم البطل أو الخاصية…', en: 'Search by champion or trait…', ja: 'チャンピオン名や特性で検索…' })}
            />
          </label>
          <div className="filter-group">
            <button className={`filter-chip ${cost === null ? 'active' : ''}`} onClick={() => setCost(null)}>
              {t({ ar: 'كل التكاليف', en: 'All costs', ja: '全コスト' })}
            </button>
            {[1, 2, 3, 4, 5, 7].map((value) => (
              <button
                key={value}
                className={`filter-chip ${cost === value ? 'active' : ''}`}
                onClick={() => setCost(cost === value ? null : value)}
                style={cost === value ? { color: costColors[value], borderColor: `${costColors[value]}55` } : undefined}
              >
                {value === 7 ? t({ ar: '7 ذهب', en: '7 gold', ja: '7ゴールド' }) : costLabel(value, locale as Locale)}
              </button>
            ))}
          </div>
        </div>

        <p className="result-count">
          {visibleChampions.length} {t({ ar: 'بطل', en: 'champions', ja: '体' })}
        </p>

        <div className="champ-grid">
          {visibleChampions.map((champion) => (
            <button className="champ-card" key={champion.id} onClick={() => setOpenChampion(champion)}>
              <span className="set19-portrait">
                <img src={champion.icon} alt={champion.name[locale]} loading="lazy" />
              </span>
              <div style={{ minWidth: 0 }}>
                <div className="champ-name">{champion.name[locale]}</div>
                <div className="champ-traits">
                  <span style={{ color: costColors[champion.cost] ?? '#9aa4b2' }}>
                    {champion.cost === 7
                      ? t({ ar: '7 ذهب', en: '7 gold', ja: '7ゴールド' })
                      : costLabel(champion.cost, locale as Locale)}
                  </span>
                  {champion.traits.slice(0, 2).map((id) => (
                    <span key={id}>{traitName(id)}</span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        {visibleChampions.length === 0 && (
          <div className="empty-state">
            {t({ ar: 'لا يوجد أبطال مطابقون لهذا البحث.', en: 'No champions match this search.', ja: '該当するチャンピオンがいません。' })}
          </div>
        )}
      </section>

      <section id="set19-items" style={{ paddingTop: 40 }}>
        <div className="section-head">
          <div>
            <h2 className="section-title">{t({ ar: 'العناصر', en: 'Items', ja: 'アイテム' })}</h2>
            <p className="section-sub">
              {t({
                ar: 'المكوّنات والعناصر الكاملة في المجموعة 19',
                en: 'Components and completed items in Set 19',
                ja: 'セット19のコンポーネントと完成アイテム',
              })}
            </p>
          </div>
        </div>

        <div className="set19-item-grid">
          {set19Items.map((item) => (
            <article className="set19-item" key={item.id}>
              <img src={item.icon} alt="" loading="lazy" />
              <div>
                <div className="set19-item-name">{item.name[locale]}</div>
                <p className="muted">{item.desc[locale] || item.desc.en}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={{ paddingTop: 40 }}>
        <div className="section-head">
          <div>
            <h2 className="section-title">{t({ ar: 'الأوغمنتس', en: 'Augments', ja: 'オーグメント' })}</h2>
            <p className="section-sub">
              {t({
                ar: 'عدد الأوغمنتس في السيزون الجديد حسب الندرة',
                en: 'How many Set 19 augments exist at each tier',
                ja: 'セット19のオーグメント数（レアリティ別）',
              })}
            </p>
          </div>
        </div>

        <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
          {[
            { label: t({ ar: 'الإجمالي', en: 'Total', ja: '合計' }), value: set19Meta.augmentSummary.total },
            { label: t({ ar: 'فضّي', en: 'Silver', ja: 'シルバー' }), value: set19Meta.augmentSummary.silver },
            { label: t({ ar: 'ذهبي', en: 'Gold', ja: 'ゴールド' }), value: set19Meta.augmentSummary.gold },
            { label: t({ ar: 'ألماسي', en: 'Prismatic', ja: 'プリズマティック' }), value: set19Meta.augmentSummary.prismatic },
            { label: t({ ar: 'أوغمنتس الأبطال', en: 'Hero augments', ja: 'ヒーローオーグメント' }), value: set19Meta.augmentSummary.hero },
          ].map((entry) => (
            <div className="stat-box" key={entry.label}>
              <b>{entry.value}</b>
              <span>{entry.label}</span>
            </div>
          ))}
        </div>
      </section>

      {openChampion && <ChampionSheet champion={openChampion} onClose={() => setOpenChampion(null)} />}
    </div>
  );

  function ChampionSheet({ champion, onClose }: { champion: Set19Champion; onClose: () => void }) {
    const traitEntries = champion.traits.map((id) => set19TraitMap.get(id)).filter(Boolean);
    const stats = [
      { label: t({ ar: 'الصحة', en: 'Health', ja: '体力' }), value: champion.stats.hp },
      { label: t({ ar: 'ضرر الهجوم', en: 'Attack damage', ja: 'AD' }), value: champion.stats.damage },
      {
        label: t({ ar: 'سرعة الهجوم', en: 'Attack speed', ja: '攻撃速度' }),
        value: champion.stats.attackSpeed?.toFixed(2),
      },
      { label: t({ ar: 'الدرع', en: 'Armor', ja: 'アーマー' }), value: champion.stats.armor },
      { label: t({ ar: 'مقاومة السحر', en: 'Magic resist', ja: '魔法耐性' }), value: champion.stats.magicResist },
      { label: t({ ar: 'المدى', en: 'Range', ja: '射程' }), value: champion.stats.range },
    ].filter((stat) => stat.value !== null && stat.value !== undefined);

    useEffect(() => {
      const handler = (event: KeyboardEvent) => {
        if (event.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    return (
      <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-label={champion.name[locale]}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <div className="modal-head">
            <button className="modal-close" onClick={onClose} aria-label={t({ ar: 'إغلاق', en: 'Close', ja: '閉じる' })}>
              <X size={16} />
            </button>
            <span className="set19-portrait large">
              <img src={champion.icon} alt={champion.name[locale]} />
            </span>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 900, lineHeight: 1.2 }}>{champion.name[locale]}</h2>
              <div className="tag-row" style={{ marginTop: 6 }}>
                <span className="tag gold">
                  {champion.cost === 7
                    ? t({ ar: '7 ذهب', en: '7 gold', ja: '7ゴールド' })
                    : costLabel(champion.cost, locale as Locale)}
                </span>
                {traitEntries.map((trait) =>
                  trait ? (
                    <span className="tag" key={trait.id} style={{ gap: 6 }}>
                      <img src={trait.icon} alt="" width={18} height={18} />
                      {trait.name[locale]}
                    </span>
                  ) : null,
                )}
              </div>
            </div>
          </div>

          <div className="modal-body">
            <div className="ability-box">
              <div className="ability-name">{champion.ability.name[locale]}</div>
              <p className="ability-desc" dir="ltr" style={{ textAlign: 'start' }}>
                {champion.ability.desc.en}
              </p>
              <p className="ability-note">
                {t({
                  ar: 'الوصف الرسمي بالإنجليزية من سيرفر PBE — الترجمة العربية واليابانية تُضاف مع الإصدار الرسمي.',
                  en: 'Official PBE wording (English); Arabic and Japanese text arrive with the live release.',
                  ja: 'PBEの公式テキスト（英語）。日本語・アラビア語は正式リリース時に追加されます。',
                })}
              </p>
            </div>

            <div>
              <div className="panel-title" style={{ marginBottom: 8 }}>
                <Sparkles size={14} />
                {t({ ar: 'الإحصاءات الأساسية', en: 'Base stats', ja: '基本ステータス' })}
              </div>
              <div className="stat-grid">
                {stats.map((stat) => (
                  <div className="stat-box" key={stat.label}>
                    <b>{stat.value}</b>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {traitEntries.length > 0 && (
              <div>
                <div className="panel-title" style={{ marginBottom: 8 }}>
                  <Music4 size={14} />
                  {t({ ar: 'الخواص', en: 'Traits', ja: '特性' })}
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {traitEntries.map((trait) =>
                    trait ? (
                      <div key={trait.id} className="set19-trait-line">
                        <span className="trait-pill" style={{ padding: '3px 8px' }}>
                          <img src={trait.icon} alt="" width={16} height={16} />
                          {trait.name[locale]}
                        </span>
                        <span className="muted">{trait.desc[locale]}</span>
                      </div>
                    ) : null,
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
