import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Sparkles, X } from 'lucide-react';
import {
  championBuild,
  championMap,
  champions,
  costColors,
  costLabel,
  itemMap,
  traits,
} from '../lib/data';
import { formatGameText } from '../lib/format';
import type { Champion } from '../lib/types';
import { useI18n } from '../lib/i18n';
import { Portrait, TraitIcon } from '../components/Portrait';

export function Champions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [cost, setCost] = useState<number | null>(null);
  const [trait, setTrait] = useState(searchParams.get('trait') ?? '');
  const selectedId = searchParams.get('champ');
  const selected = selectedId ? championMap.get(selectedId) : undefined;
  const { t, locale, localizePath } = useI18n();

  const traitName = (id: string) => t(traits.find((x) => x.id === id)?.name ?? { ar: '', en: '', ja: '' });

  useEffect(() => {
    const traitParam = searchParams.get('trait');
    if (traitParam) setTrait(traitParam);
  }, [searchParams]);

  useEffect(() => {
    if (!selected) return undefined;
    const previous = document.title;
    document.title = `${t(selected.name)} — ${t({ ar: 'الأبطال', en: 'Champions', ja: 'チャンピオン' })} | MokaTroy`;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeChampion();
    };
    window.addEventListener('keydown', handler);
    return () => {
      document.title = previous;
      window.removeEventListener('keydown', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    if (!selected)
      document.title = `${t({ ar: 'الأبطال', en: 'Champions', ja: 'チャンピオン' })} | MokaTroy`;
  }, [selected, t]);

  const openChampion = (champion: Champion) => {
    const next = new URLSearchParams(searchParams);
    next.set('champ', champion.id);
    setSearchParams(next);
  };

  const closeChampion = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('champ');
    setSearchParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return champions
      .filter((champion) => (cost ? champion.cost === cost : true))
      .filter((champion) => (trait ? champion.traits.includes(trait) : true))
      .filter((champion) =>
        normalized
          ? `${t(champion.name)} ${champion.traits.map(traitName).join(' ')} ${t(champion.ability.name)}`
              .toLowerCase()
              .includes(normalized)
          : true,
      )
      .sort((a, b) => a.cost - b.cost || t(a.name).localeCompare(t(b.name), locale));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, cost, trait, t, locale]);

  return (
    <div className="fade-in">
      <div className="section-head">
        <div>
          <h1 className="section-title">{t({ ar: 'الأبطال', en: 'Champions', ja: 'チャンピオン' })}</h1>
          <p className="section-sub">
            {t({
              ar: 'كل أبطال المجموعة 18 مع الخواص والقدرات والعناصر المقترحة',
              en: 'All Set 18 champions with traits, abilities and suggested items',
              ja: 'セット18の全チャンピオン。特性、アビリティ、おすすめアイテム付き',
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
            placeholder={t({
              ar: 'ابحث باسم البطل أو الخاصية…',
              en: 'Search by champion or trait…',
              ja: 'チャンピオン名や特性で検索…',
            })}
          />
        </label>

        <div className="filter-group">
          <button className={`filter-chip ${cost === null ? 'active' : ''}`} onClick={() => setCost(null)}>
            {t({ ar: 'كل التكاليف', en: 'All costs', ja: '全コスト' })}
          </button>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              className={`filter-chip ${cost === value ? 'active' : ''}`}
              onClick={() => setCost(cost === value ? null : value)}
              style={cost === value ? { color: costColors[value], borderColor: `${costColors[value]}55` } : undefined}
            >
              {costLabel(value, locale)}
            </button>
          ))}
        </div>

        <select
          className="filter-select"
          value={trait}
          onChange={(event) => setTrait(event.target.value)}
          aria-label={t({ ar: 'تصفية حسب الخاصية', en: 'Filter by trait', ja: '特性で絞り込み' })}
        >
          <option value="">{t({ ar: 'كل الخواص', en: 'All traits', ja: '全特性' })}</option>
          {traits.map((entry) => (
            <option key={entry.id} value={entry.id}>
              {t(entry.name)}
            </option>
          ))}
        </select>
      </div>

      <p className="result-count">
        {filtered.length} {t({ ar: 'بطل', en: 'champions', ja: '体' })}
        {trait ? ` · ${traitName(trait)}` : ''}
      </p>

      <div className="champ-grid">
        {filtered.map((champion) => (
          <button className="champ-card" key={champion.id} onClick={() => openChampion(champion)}>
            <Portrait championId={champion.id} />
            <div style={{ minWidth: 0 }}>
              <div className="champ-name">{t(champion.name)}</div>
              <div className="champ-traits">
                <span style={{ color: costColors[champion.cost] }}>{costLabel(champion.cost, locale)}</span>
                {champion.traits.slice(0, 2).map((id) => (
                  <span key={id}>{traitName(id)}</span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          {t({ ar: 'لا يوجد أبطال مطابقون لهذا البحث.', en: 'No champions match this search.', ja: '該当するチャンピオンがいません。' })}
        </div>
      )}

      {selected && <ChampionModal champion={selected} onClose={closeChampion} />}
    </div>
  );

  function ChampionModal({ champion, onClose }: { champion: Champion; onClose: () => void }) {
    const build = championBuild(champion.id);
    const stats = [
      { label: t({ ar: 'الصحة', en: 'Health', ja: '体力' }), value: champion.stats.hp },
      { label: t({ ar: 'المانا', en: 'Mana', ja: 'マナ' }), value: champion.stats.mana },
      { label: t({ ar: 'ضرر الهجوم', en: 'Attack damage', ja: 'AD' }), value: champion.stats.damage },
      { label: t({ ar: 'سرعة الهجوم', en: 'Attack speed', ja: '攻撃速度' }), value: champion.stats.attackSpeed?.toFixed(2) },
      { label: t({ ar: 'الدرع', en: 'Armor', ja: 'アーマー' }), value: champion.stats.armor },
      { label: t({ ar: 'مقاومة السحر', en: 'Magic resist', ja: 'MR' }), value: champion.stats.magicResist },
      { label: t({ ar: 'المدى', en: 'Range', ja: '射程' }), value: champion.stats.range },
      { label: t({ ar: 'مانا البداية', en: 'Initial mana', ja: '初始マナ' }), value: champion.stats.initialMana },
    ].filter((stat) => typeof stat.value === 'number' || typeof stat.value === 'string');

    return (
      <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-label={t(champion.name)}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <div className="modal-head">
            <button className="modal-close" onClick={onClose} aria-label={t({ ar: 'إغلاق', en: 'Close', ja: '閉じる' })}>
              <X size={16} />
            </button>
            <Portrait championId={champion.id} />
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 900, lineHeight: 1.2 }}>{t(champion.name)}</h2>
              <div className="tag-row" style={{ marginTop: 6 }}>
                <span className="tag gold">{costLabel(champion.cost, locale)}</span>
                {champion.traits.map((id) => (
                  <span className="tag" key={id} style={{ gap: 6 }}>
                    <TraitIcon id={id} name={traitName(id)} size={18} />
                    {traitName(id)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-body">
            <div className="ability-box">
              <div className="ability-name">{t(champion.ability.name)}</div>
              <p className="ability-desc">
                {formatGameText(t(champion.ability.desc), undefined, champion.ability.variables, 1, '…', locale) ||
                  t({ ar: 'وصف القدرة غير متوفر.', en: 'Ability description unavailable.', ja: 'アビリティ説明はありません。' })}
              </p>
              <p className="ability-note">
                {t({
                  ar: 'تظهر قيم القدرة داخل اللعبة وتتغير حسب مستوى النجوم.',
                  en: 'Ability values appear in-game and scale with star level.',
                  ja: 'アビリティの数値はゲーム内に表示され、星レベルで変化します。',
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

            {build.items.length > 0 && (
              <div>
                <div className="panel-title" style={{ marginBottom: 8 }}>
                  <Sparkles size={14} />
                  {t({ ar: 'عناصر مقترحة', en: 'Suggested items', ja: 'おすすめアイテム' })}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {build.items.map((itemId) => {
                    const item = itemMap.get(itemId);
                    return item ? (
                      <span className="trait-pill" key={itemId} style={{ padding: '4px 8px' }}>
                        {item.icon ? (
                          <img
                            src={item.icon}
                            alt=""
                            width={18}
                            height={18}
                            style={{ borderRadius: 4 }}
                            data-tip-kind="item"
                            data-tip-id={itemId}
                          />
                        ) : null}
                        {t(item.name)}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            )}

            {build.comps.length > 0 && (
              <div>
                <div className="panel-title" style={{ marginBottom: 8 }}>
                  <Sparkles size={14} />
                  {t({ ar: 'يظهر في الكومبوهات', en: 'Appears in comps', ja: '登場する構成' })}
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {build.comps.slice(0, 4).map((comp) => (
                    <Link
                      key={comp.slug}
                      className="filter-chip"
                      to={localizePath(`/comp/${comp.slug}`)}
                      onClick={onClose}
                    >
                      {t(comp.name)}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
