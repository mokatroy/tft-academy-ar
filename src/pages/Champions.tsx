import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Sparkles, X } from 'lucide-react';
import {
  championBuild,
  championMap,
  champions,
  costColors,
  itemMap,
  traits,
} from '../lib/data';
import { formatGameText } from '../lib/format';
import type { Champion } from '../lib/types';
import { Portrait, TraitIcon } from '../components/Portrait';

export function Champions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [cost, setCost] = useState<number | null>(null);
  const [trait, setTrait] = useState(searchParams.get('trait') ?? '');
  const selectedId = searchParams.get('champ');
  const selected = selectedId ? championMap.get(selectedId) : undefined;

  useEffect(() => {
    const traitParam = searchParams.get('trait');
    if (traitParam) setTrait(traitParam);
  }, [searchParams]);

  useEffect(() => {
    if (!selected) return undefined;
    const previous = document.title;
    document.title = `${selected.name} — الأبطال | أكاديمية TFT`;
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
    if (!selected) document.title = 'الأبطال | أكاديمية TFT';
  }, [selected]);

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
          ? `${champion.name} ${champion.traits.join(' ')} ${champion.ability.name}`.toLowerCase().includes(normalized)
          : true,
      )
      .sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name, 'ar'));
  }, [query, cost, trait]);

  return (
    <div className="fade-in">
      <div className="section-head">
        <div>
          <h1 className="section-title">الأبطال</h1>
          <p className="section-sub">كل أبطال المجموعة 18 مع الخواص والقدرات والعناصر المقترحة</p>
        </div>
      </div>

      <div className="filter-bar">
        <label className="search-field">
          <Search size={15} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ابحث باسم البطل أو الخاصية…"
          />
        </label>

        <div className="filter-group">
          <button className={`filter-chip ${cost === null ? 'active' : ''}`} onClick={() => setCost(null)}>
            كل التكاليف
          </button>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              className={`filter-chip ${cost === value ? 'active' : ''}`}
              onClick={() => setCost(cost === value ? null : value)}
              style={cost === value ? { color: costColors[value], borderColor: `${costColors[value]}55` } : undefined}
            >
              {value} ذهب
            </button>
          ))}
        </div>

        <select
          className="filter-select"
          value={trait}
          onChange={(event) => setTrait(event.target.value)}
          aria-label="تصفية حسب الخاصية"
        >
          <option value="">كل الخواص</option>
          {traits.map((entry) => (
            <option key={entry.id} value={entry.name}>
              {entry.name}
            </option>
          ))}
        </select>
      </div>

      <p className="result-count">
        {filtered.length} بطل
        {trait ? ` يحمل خاصية «${trait}»` : ''}
      </p>

      <div className="champ-grid">
        {filtered.map((champion) => (
          <button className="champ-card" key={champion.id} onClick={() => openChampion(champion)}>
            <Portrait championId={champion.id} />
            <div style={{ minWidth: 0 }}>
              <div className="champ-name">{champion.name}</div>
              <div className="champ-traits">
                <span style={{ color: costColors[champion.cost] }}>{champion.cost} ذهب</span>
                {champion.traits.slice(0, 2).map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && <div className="empty-state">لا يوجد أبطال مطابقون لهذا البحث.</div>}

      {selected && <ChampionModal champion={selected} onClose={closeChampion} />}
    </div>
  );
}

function ChampionModal({ champion, onClose }: { champion: Champion; onClose: () => void }) {
  const build = championBuild(champion.id);
  const stats = [
    { label: 'الصحة', value: champion.stats.hp },
    { label: 'المانا', value: champion.stats.mana },
    { label: 'ضرر الهجوم', value: champion.stats.damage },
    { label: 'سرعة الهجوم', value: champion.stats.attackSpeed?.toFixed(2) },
    { label: 'الدرع', value: champion.stats.armor },
    { label: 'مقاومة السحر', value: champion.stats.magicResist },
    { label: 'المدى', value: champion.stats.range },
    { label: 'مانا البداية', value: champion.stats.initialMana },
  ].filter((stat) => typeof stat.value === 'number' || typeof stat.value === 'string');

  return (
    <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={champion.name}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-head">
          <button className="modal-close" onClick={onClose} aria-label="إغلاق">
            <X size={16} />
          </button>
          <Portrait championId={champion.id} />
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 900, lineHeight: 1.2 }}>{champion.name}</h2>
            <div className="tag-row" style={{ marginTop: 6 }}>
              <span className="tag gold">{champion.cost} ذهب</span>
              {champion.traits.map((name) => (
                <span className="tag" key={name} style={{ gap: 6 }}>
                  <TraitIcon name={name} size={18} />
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="ability-box">
            <div className="ability-name">{champion.ability.name}</div>
            <p className="ability-desc">
              {formatGameText(champion.ability.desc, undefined, champion.ability.variables, 1, '…') ||
                'وصف القدرة غير متوفر بالعربية.'}
            </p>
            <p className="ability-note">تظهر قيم القدرة داخل اللعبة وتتغير حسب مستوى النجوم.</p>
          </div>

          <div>
            <div className="panel-title" style={{ marginBottom: 8 }}>
              <Sparkles size={14} />
              الإحصاءات الأساسية
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
                عناصر مقترحة
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {build.items.map((itemId) => {
                  const item = itemMap.get(itemId);
                  return item ? (
                    <span className="trait-pill" key={itemId} style={{ padding: '4px 8px' }}>
                      {item.icon ? (
                        <img src={item.icon} alt="" width={18} height={18} style={{ borderRadius: 4 }} />
                      ) : null}
                      {item.name}
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
                يظهر في الكومبوهات
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {build.comps.slice(0, 4).map((comp) => (
                  <Link
                    key={comp.slug}
                    className="filter-chip"
                    to={`/comp/${comp.slug}`}
                    onClick={onClose}
                  >
                    {comp.name}
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
