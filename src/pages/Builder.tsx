import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, Coins, Search, Share2, Sparkles, Swords, Trash2, Users, X } from 'lucide-react';
import { position } from '../components/Board';
import { Portrait } from '../components/Portrait';
import {
  champions,
  championMap,
  compMap,
  comps,
  compTraits,
  costColors,
  itemMap,
  items,
  traits,
  traitMap,
} from '../lib/data';
import { getTraitMeta } from '../lib/traitMeta';
import { useI18n } from '../lib/i18n';
import type { CompUnit, Star } from '../lib/types';

const STORAGE_KEY = 'moka-builder-v1';

const championIndex = new Map(champions.map((champion, index) => [champion.id, index]));
const itemIndex = new Map(items.map((item, index) => [item.id, index]));

/** Compact, URL-safe board encoding: [champ,row,col,star,item…];[...] → base64url. */
function encodeBoard(units: CompUnit[]): string {
  const payload = units
    .map((unit) => {
      const parts = [
        championIndex.get(unit.champion) ?? -1,
        unit.row,
        unit.col,
        unit.star,
        ...unit.items.map((id) => itemIndex.get(id) ?? -1),
      ];
      return parts.join(',');
    })
    .join(';');
  return btoa(payload).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decodeBoard(raw: string): CompUnit[] | null {
  try {
    const payload = atob(raw.replace(/-/g, '+').replace(/_/g, '/'));
    const units: CompUnit[] = [];
    const used = new Set<string>();
    for (const chunk of payload.split(';')) {
      if (!chunk) continue;
      const [ci, row, col, star, ...itemIds] = chunk.split(',').map(Number);
      const champion = champions[ci];
      if (!champion || row < 0 || row > 3 || col < 0 || col > 6) return null;
      if (star !== 1 && star !== 2 && star !== 3) return null;
      const cell = `${row}-${col}`;
      if (used.has(cell)) return null;
      used.add(cell);
      const unitItems = itemIds
        .filter((index) => index >= 0 && index < items.length)
        .map((index) => items[index].id)
        .slice(0, 3);
      units.push({ champion: champion.id, row, col, star: star as Star, items: unitItems });
    }
    return units;
  } catch {
    return null;
  }
}

function sanitizeUnits(raw: unknown): CompUnit[] | null {
  if (!Array.isArray(raw)) return null;
  const units: CompUnit[] = [];
  const used = new Set<string>();
  for (const entry of raw) {
    if (!entry || typeof entry !== 'object') return null;
    const { champion, row, col, star, items: unitItems } = entry as Partial<CompUnit>;
    if (typeof champion !== 'string' || !championMap.has(champion)) return null;
    if (typeof row !== 'number' || row < 0 || row > 3) return null;
    if (typeof col !== 'number' || col < 0 || col > 6) return null;
    if (star !== 1 && star !== 2 && star !== 3) return null;
    const cell = `${row}-${col}`;
    if (used.has(cell)) return null;
    used.add(cell);
    const cleanItems = Array.isArray(unitItems)
      ? unitItems.filter((id): id is string => typeof id === 'string' && itemMap.has(id)).slice(0, 3)
      : [];
    units.push({ champion, row, col, star, items: cleanItems });
  }
  return units;
}

export function Builder() {
  const [searchParams] = useSearchParams();
  const { t, locale, localizePath } = useI18n();

  const [units, setUnits] = useState<CompUnit[]>(() => {
    const shared = searchParams.get('b');
    if (shared) {
      const decoded = decodeBoard(shared);
      if (decoded) return decoded;
    }
    const load = searchParams.get('load');
    if (load) {
      const comp = compMap.get(load);
      if (comp) return comp.units.map((unit) => ({ ...unit, items: [...unit.items] }));
    }
    if (typeof window !== 'undefined') {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const stored = sanitizeUnits(JSON.parse(raw));
          if (stored) return stored;
        }
      } catch {
        /* corrupted storage — start fresh */
      }
    }
    return [];
  });

  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [costFilter, setCostFilter] = useState<number | null>(null);
  const [traitFilter, setTraitFilter] = useState('');
  const [itemPicker, setItemPicker] = useState(false);
  const [pickerKind, setPickerKind] = useState<'all' | 'component' | 'completed'>('all');
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // ?load=<slug> — hydrate when arriving from a comp detail page.
  const loadParam = searchParams.get('load');
  useEffect(() => {
    if (!loadParam) return;
    const comp = compMap.get(loadParam);
    if (comp) {
      setUnits(comp.units.map((unit) => ({ ...unit, items: [...unit.items] })));
      setSelected(null);
      setItemPicker(false);
    }
  }, [loadParam]);

  // Auto-save the working board.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(units));
    } catch {
      /* storage unavailable — ignore */
    }
  }, [units]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(null), 2600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    document.title = `${t({ ar: 'المنشئ', en: 'Builder', ja: 'ビルダー' })} | MokaTroy`;
  }, [t]);

  const selectedUnit = selected ? units.find((unit) => unit.champion === selected) : undefined;

  const traitList = compTraits({ units });
  const activeTraits = traitList.filter((entry) => entry.active);
  const totalCost = units.reduce(
    (sum, unit) => sum + (championMap.get(unit.champion)?.cost ?? 0),
    0,
  );

  const pool = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const traitName = (id: string) => t(traitMap.get(id)?.name).toLowerCase();
    return champions
      .filter((champion) => (costFilter ? champion.cost === costFilter : true))
      .filter((champion) => (traitFilter ? champion.traits.includes(traitFilter) : true))
      .filter((champion) =>
        normalized
          ? `${t(champion.name)} ${champion.traits.map(traitName).join(' ')}`
              .toLowerCase()
              .includes(normalized)
          : true,
      )
      .sort(
        (a, b) => a.cost - b.cost || t(a.name).localeCompare(t(b.name), locale),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, costFilter, traitFilter, t, locale]);

  const pickerItems = useMemo(
    () => items.filter((item) => (pickerKind === 'all' ? true : item.kind === pickerKind)),
    [pickerKind],
  );

  const addChampion = (id: string) => {
    const existing = units.find((unit) => unit.champion === id);
    if (existing) {
      setSelected(existing.champion);
      setItemPicker(false);
      return;
    }
    for (let row = 0; row < 4; row += 1) {
      for (let col = 0; col < 7; col += 1) {
        if (!units.some((unit) => unit.row === row && unit.col === col)) {
          setUnits((prev) => [...prev, { champion: id, row, col, star: 1, items: [] }]);
          setSelected(id);
          setItemPicker(false);
          return;
        }
      }
    }
    setNotice(t({ ar: 'اللوح ممتلئ — احذف وحدة أولًا.', en: 'Board is full — remove a unit first.', ja: '盤面がいっぱいです。先にユニットを外してください。' }));
  };

  const onCellClick = (row: number, col: number) => {
    const unit = units.find((entry) => entry.row === row && entry.col === col);
    if (unit) {
      setSelected((prev) => (prev === unit.champion ? null : unit.champion));
      setItemPicker(false);
      return;
    }
    if (selected) {
      setUnits((prev) => prev.map((unit2) => (unit2.champion === selected ? { ...unit2, row, col } : unit2)));
    }
  };

  const setStar = (star: Star) => {
    if (!selectedUnit) return;
    setUnits((prev) => prev.map((unit) => (unit.champion === selectedUnit.champion ? { ...unit, star } : unit)));
  };

  const toggleItem = (itemId: string) => {
    if (!selectedUnit) return;
    const has = selectedUnit.items.includes(itemId);
    if (!has && selectedUnit.items.length >= 3) {
      setNotice(t({ ar: 'كل وحدة تحمل 3 عناصر كحد أقصى.', en: 'Each unit holds a maximum of 3 items.', ja: 'ユニットは最大3個のアイテムを装備できます。' }));
      return;
    }
    setUnits((prev) =>
      prev.map((unit) =>
        unit.champion === selectedUnit.champion
          ? {
              ...unit,
              items: has
                ? unit.items.filter((id) => id !== itemId)
                : [...unit.items, itemId],
            }
          : unit,
      ),
    );
  };

  const removeSelected = () => {
    if (!selectedUnit) return;
    setUnits((prev) => prev.filter((unit) => unit.champion !== selectedUnit.champion));
    setSelected(null);
    setItemPicker(false);
  };

  const clearBoard = () => {
    setUnits([]);
    setSelected(null);
    setItemPicker(false);
    setShareUrl(null);
  };

  const loadComp = (slug: string) => {
    const comp = compMap.get(slug);
    if (!comp) return;
    setUnits(comp.units.map((unit) => ({ ...unit, items: [...unit.items] })));
    setSelected(null);
    setItemPicker(false);
    setShareUrl(null);
  };

  const share = async () => {
    const url = `${window.location.origin}${localizePath('/builder')}?b=${encodeBoard(units)}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareUrl(null);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
      setShareUrl(url);
    }
  };

  const renderTrait = (entry: (typeof traitList)[number]) => {
    const meta = getTraitMeta(entry.id);
    return (
      <div
        className={`trait-row ${entry.active ? 'active' : ''}`}
        key={entry.id}
        style={{ '--trait-color': meta.color } as CSSProperties}
        data-tip-kind="trait"
        data-tip-id={entry.id}
      >
        <span className="trait-icon">
          <meta.Icon size={16} />
        </span>
        <div>
          <div className="trait-name">{t(entry.name)}</div>
          <div className="trait-steps">
            {entry.breakpoints.length > 0
              ? entry.breakpoints.map((step) => `${step}`).join(' / ')
              : t({ ar: 'خاصية فريدة', en: 'Unique trait', ja: 'ユニーク特性' })}
            {entry.active && entry.nextBreakpoint
              ? ` · ${t({ ar: 'التالي', en: 'next', ja: '次' })} ${entry.nextBreakpoint}`
              : ''}
          </div>
        </div>
        <span className="trait-count">{entry.count}</span>
      </div>
    );
  };

  return (
    <div className="fade-in">
      <div className="section-head">
        <div>
          <h1 className="section-title">
            {t({ ar: 'منشئ الكومبوهات', en: 'Comp builder', ja: '構成ビルダー' })}
          </h1>
          <p className="section-sub">
            {t({
              ar: 'ابنِ كومبك الخاص أو جرّب تشكيلات جديدة: اختر الأبطال، رتّبهم على اللوح، وزّد العناصر والنجوم. كل تعديل يُحفظ تلقائيًا ويمكنك مشاركته برابط.',
              en: 'Build your own comp or try new boards: pick champions, place them on the hex grid, add items and stars. Every change is saved automatically and can be shared as a link.',
              ja: '独自の構成を作り、新しい盤面を試せます：チャンピオンを選び、ヘックスに配置し、アイテムと星を設定。変更は自動保存され、リンクで共有できます。',
            })}
          </p>
        </div>
      </div>

      <div className="builder-layout">
        {/* ===== Champion pool ===== */}
        <section className="panel builder-pool">
          <h2 className="panel-title">
            <Swords size={15} />
            {t({ ar: 'الأبطال', en: 'Champions', ja: 'チャンピオン' })}
            <span className="hint">
              {pool.length}/{champions.length}
            </span>
          </h2>

          <label className="search-field">
            <Search size={15} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t({
                ar: 'ابحث باسم بطل أو خاصية…',
                en: 'Search champion or trait…',
                ja: 'チャンピオン名や特性で検索…',
              })}
            />
          </label>

          <div className="filter-group">
            <button
              className={`filter-chip ${costFilter === null ? 'active' : ''}`}
              onClick={() => setCostFilter(null)}
            >
              {t({ ar: 'الكل', en: 'All', ja: 'すべて' })}
            </button>
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                className={`filter-chip ${costFilter === value ? 'active' : ''}`}
                onClick={() => setCostFilter(costFilter === value ? null : value)}
                style={
                  costFilter === value
                    ? { color: costColors[value], borderColor: `${costColors[value]}55` }
                    : undefined
                }
              >
                {value}
              </button>
            ))}
          </div>

          <select
            className="filter-select"
            value={traitFilter}
            onChange={(event) => setTraitFilter(event.target.value)}
            aria-label={t({ ar: 'تصفية حسب الخاصية', en: 'Filter by trait', ja: '特性で絞り込み' })}
          >
            <option value="">{t({ ar: 'كل الخواص', en: 'All traits', ja: '全特性' })}</option>
            {traits.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {t(entry.name)}
              </option>
            ))}
          </select>

          <p className="result-count">
            {pool.length} {t({ ar: 'بطل', en: 'champions', ja: '体' })}
          </p>

          <div className="pool-grid">
            {pool.map((champion) => {
              const onBoard = units.some((unit) => unit.champion === champion.id);
              return (
                <button
                  type="button"
                  key={champion.id}
                  className={`pool-chip ${onBoard ? 'on-board' : ''}`}
                  onClick={() => addChampion(champion.id)}
                  data-tip-kind="champion"
                  data-tip-id={champion.id}
                >
                  <Portrait championId={champion.id} />
                  <span style={{ color: costColors[champion.cost] }}>{t(champion.name)}</span>
                </button>
              );
            })}
          </div>

          {pool.length === 0 && (
            <div className="empty-state" style={{ padding: '18px 8px', fontSize: 12 }}>
              {t({ ar: 'لا يوجد أبطال مطابقون.', en: 'No champions match.', ja: '該当するチャンピオンがいません。' })}
            </div>
          )}
        </section>

        {/* ===== Board ===== */}
        <div className="builder-board">
          <div className="builder-bar">
            <div className="builder-meta">
              <span className="builder-meta-item">
                <Users size={13} />
                <b>{units.length}</b> {t({ ar: 'وحدة', en: 'units', ja: '体' })}
              </span>
              <span className="builder-meta-item">
                <Coins size={13} />
                <b>{totalCost}</b> {t({ ar: 'ذهب', en: 'gold', ja: 'ゴールド' })}
              </span>
              {notice && <span className="builder-notice">{notice}</span>}
            </div>

            <div className="builder-actions">
              <select
                className="filter-select"
                value=""
                onChange={(event) => {
                  if (event.target.value) loadComp(event.target.value);
                }}
                aria-label={t({ ar: 'حمّل كومبو جاهزًا', en: 'Load a ready comp', ja: '既存構成を読み込む' })}
              >
                <option value="">
                  {t({ ar: 'حمّل كومبو جاهزًا…', en: 'Load a ready comp…', ja: '既存構成を読み込む…' })}
                </option>
                {comps.map((comp) => (
                  <option key={comp.slug} value={comp.slug}>
                    {t(comp.name)} · {comp.tier}
                  </option>
                ))}
              </select>
              <button className="btn btn-ghost" onClick={share} disabled={units.length === 0}>
                {copied ? <Check size={14} /> : <Share2 size={14} />}
                {copied
                  ? t({ ar: 'تم النسخ', en: 'Copied', ja: 'コピー済み' })
                  : t({ ar: 'مشاركة', en: 'Share', ja: '共有' })}
              </button>
              <button className="btn btn-ghost" onClick={clearBoard} disabled={units.length === 0}>
                <Trash2 size={14} />
                {t({ ar: 'مسح الكل', en: 'Clear', ja: 'クリア' })}
              </button>
            </div>
          </div>

          {shareUrl && (
            <input
              className="share-url"
              readOnly
              value={shareUrl}
              onFocus={(event) => event.currentTarget.select()}
              aria-label={t({ ar: 'رابط المشاركة', en: 'Share link', ja: '共有リンク' })}
            />
          )}

          <div className="board-wrap">
            <div
              className="board"
              aria-label={t({ ar: 'لوح اللعب', en: 'Board', ja: '盤面' })}
            >
              {Array.from({ length: 28 }).map((_, index) => {
                const row = Math.floor(index / 7);
                const col = index % 7;
                return (
                  <button
                    type="button"
                    key={`cell-${row}-${col}`}
                    className={`hex-cell ${row === 1 || row === 2 ? 'center-hex' : ''}`}
                    style={position(row, col)}
                    onClick={() => onCellClick(row, col)}
                    aria-label={t({
                      ar: `خانة ${row + 1}-${col + 1}`,
                      en: `Cell ${row + 1}-${col + 1}`,
                      ja: `マス ${row + 1}-${col + 1}`,
                    })}
                  />
                );
              })}

              {units.map((unit) => {
                const champion = championMap.get(unit.champion);
                if (!champion) return null;
                return (
                  <button
                    type="button"
                    key={`${unit.champion}-${unit.row}-${unit.col}`}
                    className={`hex-unit builder-unit ${selected === unit.champion ? 'selected' : ''}`}
                    style={position(unit.row, unit.col)}
                    onClick={() => onCellClick(unit.row, unit.col)}
                    data-tip-kind="champion"
                    data-tip-id={unit.champion}
                  >
                    <span className="hex-portrait" style={{ '--cost-color': { 1: '#6b7789', 2: '#3fbf7f', 3: '#3b9ae1', 4: '#b45cf0', 5: '#f0b232' }[champion.cost] ?? '#2c3a52' } as CSSProperties}>
                      {champion.icon ? <img src={champion.icon} alt="" loading="lazy" /> : null}
                      <span className="hex-stars">{'★'.repeat(unit.star)}</span>
                    </span>
                    {unit.items.length > 0 && (
                      <span className="hex-items">
                        {unit.items.map((itemId) => {
                          const item = itemMap.get(itemId);
                          return item?.icon ? (
                            <img
                              key={itemId}
                              src={item.icon}
                              alt=""
                              data-tip-kind="item"
                              data-tip-id={itemId}
                              loading="lazy"
                            />
                          ) : null;
                        })}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="board-note">
              <span />
              {t({
                ar: 'الصف الأمامي في الأعلى · اضغط وحدة لتحديدها ثم خانة فارغة لنقلها',
                en: 'Front row at the top · click a unit to select it, then an empty cell to move it',
                ja: '最前列は上 · ユニットをクリックで選択し、空きマスで移動',
              })}
              <span />
            </div>
          </div>

          <p className="muted" style={{ fontSize: 11.5, lineHeight: 1.8 }}>
            {t({
              ar: 'اضغط بطلًا من القائمة لإضافته إلى أول خانة حرة. التغييرات تُحفظ في متصفحك تلقائيًا.',
              en: 'Click a champion from the list to drop them into the first free cell. Changes are saved in your browser automatically.',
              ja: 'リストのチャンピオンをクリックすると空きマスに配置されます。変更はブラウザに自動保存されます。',
            })}
          </p>
        </div>

        {/* ===== Traits + selected unit ===== */}
        <aside className="builder-side">
          <section className="panel">
            <h2 className="panel-title">
              <Sparkles size={15} />
              {t({ ar: 'الخواص', en: 'Traits', ja: '特性' })}
              <span className="hint">
                {activeTraits.length}/{traitList.length}
              </span>
            </h2>
            {traitList.length === 0 ? (
              <p className="muted" style={{ fontSize: 12, lineHeight: 1.8 }}>
                {t({
                  ar: 'أضف أبطالًا لعرض الخواص المفعّلة هنا.',
                  en: 'Add champions to see active traits here.',
                  ja: 'チャンピオンを追加すると発動中の特性が表示されます。',
                })}
              </p>
            ) : (
              <div className="trait-list">{traitList.map(renderTrait)}</div>
            )}
          </section>

          <section className="panel">
            <h2 className="panel-title">
              <Users size={15} />
              {t({ ar: 'الوحدة المحددة', en: 'Selected unit', ja: '選択中のユニット' })}
            </h2>

            {!selectedUnit ? (
              <p className="muted" style={{ fontSize: 12, lineHeight: 1.8 }}>
                {t({
                  ar: 'اضغط وحدة على اللوح لتعديل نجومها وعناصرها أو حذفها.',
                  en: 'Click a unit on the board to edit its stars and items or remove it.',
                  ja: '盤上のユニットをクリックすると星とアイテムを編集できます。',
                })}
              </p>
            ) : (
              <div className="builder-sel">
                <div className="sel-head">
                  <Portrait championId={selectedUnit.champion} />
                  <div>
                    <div className="sel-name">
                      {t(championMap.get(selectedUnit.champion)?.name)}
                    </div>
                    <div className="sel-sub">
                      {(championMap.get(selectedUnit.champion)?.traits ?? [])
                        .map((id) => t(traitMap.get(id)?.name))
                        .filter(Boolean)
                        .join(' · ')}
                    </div>
                  </div>
                  <button
                    className="icon-btn"
                    onClick={removeSelected}
                    aria-label={t({ ar: 'حذف الوحدة', en: 'Remove unit', ja: 'ユニットを削除' })}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="sel-row">
                  <span className="sel-label">
                    {t({ ar: 'النجوم', en: 'Stars', ja: 'スター' })}
                  </span>
                  <div className="star-row">
                    {([1, 2, 3] as Star[]).map((star) => (
                      <button
                        type="button"
                        key={star}
                        className={`star-btn ${selectedUnit.star === star ? 'active' : ''}`}
                        onClick={() => setStar(star)}
                      >
                        {'★'.repeat(star)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sel-row">
                  <span className="sel-label">
                    {t({ ar: 'العناصر', en: 'Items', ja: 'アイテム' })}
                  </span>
                  <div className="sel-items">
                    {[0, 1, 2].map((slot) => {
                      const itemId = selectedUnit.items[slot];
                      const item = itemId ? itemMap.get(itemId) : undefined;
                      if (itemId && item) {
                        return (
                          <button
                            type="button"
                            className="sel-item filled"
                            key={slot}
                            onClick={() => toggleItem(itemId)}
                            data-tip-kind="item"
                            data-tip-id={itemId}
                            aria-label={t({ ar: 'إزالة العنصر', en: 'Remove item', ja: 'アイテムを外す' })}
                          >
                            {item.icon ? <img src={item.icon} alt="" /> : null}
                          </button>
                        );
                      }
                      return (
                        <button
                          type="button"
                          className="sel-item empty"
                          key={slot}
                          onClick={() => setItemPicker((open) => !open)}
                          aria-label={t({ ar: 'إضافة عنصر', en: 'Add item', ja: 'アイテムを追加' })}
                        >
                          +
                        </button>
                      );
                    })}
                  </div>
                </div>

                <p className="muted" style={{ fontSize: 11 }}>
                  {t({
                    ar: 'اضغط عنصرًا مركّبًا لإزالته · اضغط + لفتح قائمة العناصر',
                    en: 'Click an equipped item to remove it · click + to open the item list',
                    ja: '装備中のアイテムをクリックで外す · ＋でリストを開く',
                  })}
                </p>

                {itemPicker && (
                  <div className="item-picker">
                    <div className="item-picker-head">
                      <span>
                        {t({ ar: 'اختر عنصرًا', en: 'Pick an item', ja: 'アイテムを選択' })}
                      </span>
                      <button
                        className="icon-btn"
                        onClick={() => setItemPicker(false)}
                        aria-label={t({ ar: 'إغلاق', en: 'Close', ja: '閉じる' })}
                      >
                        <X size={14} />
                      </button>
                    </div>
                    <div className="filter-group">
                      {(
                        [
                          ['all', t({ ar: 'الكل', en: 'All', ja: 'すべて' })],
                          ['component', t({ ar: 'مكونات', en: 'Components', ja: '部品' })],
                          ['completed', t({ ar: 'مكتملة', en: 'Completed', ja: '完成' })],
                        ] as ['all' | 'component' | 'completed', string][]
                      ).map(([value, label]) => (
                        <button
                          key={value}
                          className={`filter-chip ${pickerKind === value ? 'active' : ''}`}
                          onClick={() => setPickerKind(value)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <div className="item-pick-grid">
                      {pickerItems.map((item) => {
                        const equipped = selectedUnit.items.includes(item.id);
                        return (
                          <button
                            type="button"
                            key={item.id}
                            className={`item-pick ${equipped ? 'on' : ''}`}
                            onClick={() => toggleItem(item.id)}
                            data-tip-kind="item"
                            data-tip-id={item.id}
                            aria-label={t(item.name)}
                          >
                            {item.icon ? <img src={item.icon} alt="" loading="lazy" /> : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
