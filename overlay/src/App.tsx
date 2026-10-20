import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, EyeOff, Plus, Settings2, Sparkles, X } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Localized } from '../../src/lib/types';
import { getTraitMeta } from '../../src/lib/traitMeta';
import { augmentMap, championMap, comps, meta, traitMap } from './lib/data';
import { clampIndex, nextPicks, rankComps, TIER_COLORS, toggleOwned } from './lib/logic';
import { HOTKEY_HINTS, isDesktop, overlayApi } from './lib/bridge';
import type { OverlaySettings } from './lib/bridge';
import { OverlayBoard } from './components/OverlayBoard';
import { ShopPicker } from './components/ShopPicker';
import { SettingsSheet } from './components/SettingsSheet';
import { GameBackdrop } from './components/GameBackdrop';

const DEFAULT_SETTINGS: OverlaySettings = {
  opacity: 0.95,
  scale: 1,
  locale: 'ar',
  clickThrough: false,
  autoShow: true,
  visible: true,
  x: null,
  y: null,
  width: 416,
  height: 640,
};

type Sheet = 'none' | 'shop' | 'settings';

export function App() {
  const [settings, setSettings] = useState<OverlaySettings>(DEFAULT_SETTINGS);
  const [owned, setOwned] = useState<string[]>([]);
  const [selected, setSelected] = useState(0);
  const [sheet, setSheet] = useState<Sheet>('none');
  const [game, setGame] = useState(false);
  const [gameDetection, setGameDetection] = useState(false);
  const [hotkeyErrors, setHotkeyErrors] = useState<string[]>([]);
  const [version, setVersion] = useState('0.1.0');

  const locale = settings.locale;
  const t = useCallback(
    (value: Localized | undefined | null, fallback = '') => value?.[locale] || value?.en || value?.ar || fallback,
    [locale],
  );

  const ranked = useMemo(() => rankComps(owned, comps, championMap, traitMap), [owned]);
  const index = clampIndex(selected, ranked.length);
  const current = ranked[index];
  const picks = useMemo(() => nextPicks(ranked, championMap, 4), [ranked]);
  const rail = ranked.slice(0, 6);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  useEffect(() => {
    if (!overlayApi) return undefined;
    let cancelled = false;
    overlayApi
      .bootstrap()
      .then((info) => {
        if (cancelled) return;
        setSettings(info.settings);
        setGame(info.game);
        setGameDetection(info.gameDetection);
        setHotkeyErrors(info.hotkeyErrors);
        setVersion(info.version);
      })
      .catch(() => undefined);

    const off = overlayApi.onCommand((command) => {
      if (command.type === 'select-comp') setSelected(command.index);
      if (command.type === 'clickthrough') {
        setSettings((prev) => ({ ...prev, clickThrough: command.value }));
      }
      if (command.type === 'game') setGame(command.running);
    });

    return () => {
      cancelled = true;
      off();
    };
  }, []);

  const update = useCallback((patch: Partial<OverlaySettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
    overlayApi?.update(patch);
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (event.key === 'Escape') {
        if (sheet !== 'none') setSheet('none');
        else overlayApi?.hide();
        return;
      }
      if (event.key.toLowerCase() === 's') {
        setSheet((prev) => (prev === 'shop' ? 'none' : 'shop'));
        return;
      }
      const digit = Number(event.key);
      if (Number.isInteger(digit) && digit >= 1 && digit <= rail.length) {
        setSelected(digit - 1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [sheet, rail.length]);

  const removeUnit = (champion: string) => {
    setOwned((prev) => toggleOwned(prev, champion));
    setSelected(0);
  };

  return (
    <div
      className={`ov-root ${isDesktop ? 'is-desktop' : 'is-browser'}`}
      style={{ zoom: settings.scale } as CSSProperties}
    >
      {!isDesktop ? <GameBackdrop /> : null}

      <div className="ov-panel" style={{ opacity: settings.opacity }}>
        <header className="ov-top">
          <div className="ov-brand">
            <span className="ov-logo">TFT</span>
            <div className="ov-brand-text">
              <strong>{t({ ar: 'MokaTroy', en: 'MokaTroy', ja: 'TFTアカデミー' })}</strong>
              <span>
                {meta.setName ? t(meta.setName) : ''} · {meta.patch}
              </span>
            </div>
          </div>
          <div className="ov-top-actions">
            <span
              className={`ov-live ${game ? 'on' : ''}`}
              title={
                gameDetection
                  ? t({ ar: 'اللعبة شغالة', en: 'Game detected', ja: 'ゲーム検出' })
                  : t({ ar: 'كشف اللعبة على ويندوز فقط', en: 'Game detection is Windows-only', ja: 'ゲーム検出はWindowsのみ' })
              }
            />
            <button type="button" onClick={() => setSheet('settings')} title={t({ ar: 'الإعدادات', en: 'Settings', ja: '設定' })}>
              <Settings2 size={14} />
            </button>
            <button type="button" onClick={() => overlayApi?.hide()} title={t({ ar: 'إخفاء', en: 'Hide', ja: '隠す' })}>
              <X size={15} />
            </button>
          </div>
        </header>

        {isDesktop && settings.clickThrough ? (
          <div className="ov-pass">
            <EyeOff size={12} />
            {t({
              ar: `مرور النقر مفعّل — ${HOTKEY_HINTS.interactive} للتفاعل`,
              en: `Click-through on — ${HOTKEY_HINTS.interactive} to interact`,
              ja: `クリックスルー中 — ${HOTKEY_HINTS.interactive} で操作`,
            })}
          </div>
        ) : null}

        <div className="ov-owned">
          <button type="button" className="ov-owned-add" onClick={() => setSheet('shop')}>
            <Plus size={13} />
            {t({ ar: 'أبطالي', en: 'My units', ja: 'ユニット' })}
            {owned.length ? ` (${owned.length})` : ''}
          </button>
          <div className="ov-owned-list">
            {owned.length === 0 ? (
              <button type="button" className="ov-owned-empty" onClick={() => setSheet('shop')}>
                <Sparkles size={12} />
                {t({
                  ar: 'حدّد وحداتك والنصيحة تتغيّر فورًا',
                  en: 'Pick your units and the advice updates instantly',
                  ja: 'ユニットを選ぶと提案が即更新',
                })}
              </button>
            ) : (
              owned.map((id) => {
                const champion = championMap.get(id);
                if (!champion) return null;
                return (
                  <button
                    type="button"
                    key={id}
                    className={`ov-chip cost-${champion.cost}`}
                    title={t(champion.name)}
                    onClick={() => removeUnit(id)}
                  >
                    {champion.icon ? <img src={champion.icon} alt={t(champion.name)} /> : <span>{t(champion.name).slice(0, 1)}</span>}
                    <i className="ov-chip-x">×</i>
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="ov-body">
          <nav className="ov-rail" aria-label={t({ ar: 'الكومبوهات', en: 'Comps', ja: '構成' })}>
            {ranked.map((entry, position) => (
              <button
                type="button"
                key={entry.comp.slug}
                data-comp={entry.comp.slug}
                className={`ov-rail-item ${position === index ? 'on' : ''}`}
                onClick={() => setSelected(position)}
                style={{ '--tier': TIER_COLORS[entry.comp.tier] } as CSSProperties}
              >
                <span className="ov-tier">{entry.comp.tier}</span>
                <span className="ov-rail-name">{t(entry.comp.name)}</span>
                <span className="ov-rail-meta">{owned.length ? `${entry.score}%` : position < rail.length ? position + 1 : ''}</span>
              </button>
            ))}
          </nav>

          <section className="ov-detail">
            {current ? (
              <>
                <div className="ov-detail-head">
                  <div className="ov-detail-title">
                    <h2>{t(current.comp.name)}</h2>
                    <p>{t(current.comp.subtitle)}</p>
                  </div>
                  <span className="ov-fit" style={{ '--tier': TIER_COLORS[current.comp.tier] } as CSSProperties}>
                    {current.score}
                    <em>%</em>
                  </span>
                </div>

                <OverlayBoard comp={current.comp} locale={locale} />

                <div className="ov-traits">
                  {current.traits
                    .filter((trait) => trait.active)
                    .slice(0, 5)
                    .map((trait) => {
                      const info = getTraitMeta(trait.id);
                      const Icon = info.Icon;
                      return (
                        <span
                          key={trait.id}
                          className="ov-trait"
                          style={{ '--trait-color': info.color } as CSSProperties}
                          title={trait.steps.join(' / ')}
                        >
                          <Icon size={11} />
                          <strong>{trait.count}</strong>
                          {t(trait.name)}
                          {trait.next ? <em dir="ltr">→{trait.next}</em> : null}
                        </span>
                      );
                    })}
                </div>

                <div className="ov-augs">
                  <span className="ov-plan-title">{t({ ar: 'التعزيزات', en: 'Augments', ja: 'オーグメント' })}</span>
                  {current.comp.augments.slice(0, 3).map((entry) => {
                    const augment = augmentMap.get(entry.id);
                    return (
                      <span key={entry.id} className={`ov-aug tier-${entry.tier}`} title={t(entry.why)}>
                        {augment?.icon ? <img src={augment.icon} alt="" loading="lazy" /> : null}
                        <b>{augment ? t(augment.name) : entry.id}</b>
                      </span>
                    );
                  })}
                </div>

                <div className="ov-plan">
                  <span className="ov-plan-title">
                    {t({ ar: 'خطة اللعب', en: 'Game plan', ja: '立ち回り' })}
                  </span>
                  {current.comp.leveling.slice(0, 3).map((step) => (
                    <div className="ov-plan-step" key={step.stage.en}>
                      <span className="ov-plan-stage">{t(step.stage)}</span>
                      <p>{t(step.text)}</p>
                    </div>
                  ))}
                </div>

                {current.comp.alternatives.length > 0 ? (
                  <div className="ov-alts">
                    <span className="ov-plan-title">{t({ ar: 'بدائل', en: 'Swaps', ja: '代替' })}</span>
                    {current.comp.alternatives.slice(0, 2).map((alt) => {
                      const inUnit = championMap.get(alt.champion);
                      const outUnit = championMap.get(alt.replaces);
                      return (
                        <span key={`${alt.champion}-${alt.replaces}`} className="ov-alt" title={t(alt.note)}>
                          {inUnit?.icon ? <img className="in" src={inUnit.icon} alt={t(inUnit.name)} /> : null}
                          <em>{t({ ar: 'بدل', en: 'for', ja: '→' })}</em>
                          {outUnit?.icon ? <img className="out" src={outUnit.icon} alt={t(outUnit.name)} /> : null}
                        </span>
                      );
                    })}
                  </div>
                ) : null}

                <div className="ov-tips">
                  {current.comp.tips.slice(0, 2).map((tip) => (
                    <p className="ov-tip" key={tip.en}>
                      <Check size={10} />
                      {t(tip)}
                    </p>
                  ))}
                </div>

                <div className="ov-picks">
                  <span className="ov-picks-label">{t({ ar: 'دور على', en: 'Look for', ja: '狙う' })}</span>
                  {picks.map((pick) => {
                    const champion = championMap.get(pick.champion);
                    if (!champion) return null;
                    return (
                      <span
                        key={pick.champion}
                        className={`ov-pick cost-${champion.cost}`}
                        title={`${t(champion.name)} · ${pick.appearsIn}`}
                      >
                        {champion.icon ? <img src={champion.icon} alt={t(champion.name)} /> : null}
                      </span>
                    );
                  })}
                </div>

                <div className="ov-detail-foot">
                  <span>{t(current.comp.playstyle)}</span>
                  <i />
                  <span>{t(current.comp.level)}</span>
                  <i />
                  <span className="ov-detail-diff">
                    {t({ ar: 'صعوبة', en: 'Difficulty', ja: '難易度' })} {current.comp.difficulty}/3
                  </span>
                </div>
              </>
            ) : (
              <p className="ov-empty">{t({ ar: 'لا يوجد كومبو', en: 'No comp selected', ja: '構成がありません' })}</p>
            )}
          </section>
        </div>

        <footer className="ov-hotkeys">
          <span>
            <kbd>{HOTKEY_HINTS.toggle}</kbd>
            {t({ ar: 'إظهار', en: 'show', ja: '表示' })}
          </span>
          <span>
            <kbd>{HOTKEY_HINTS.interactive}</kbd>
            {t({ ar: 'تفاعل', en: 'interact', ja: '操作' })}
          </span>
          <span>
            <kbd>1–6</kbd>
            {t({ ar: 'كومبو', en: 'comp', ja: '構成' })}
          </span>
        </footer>

        {sheet === 'shop' ? (
        <ShopPicker
          owned={owned}
          locale={locale}
          onToggle={(id) => {
            setOwned((prev) => toggleOwned(prev, id));
            setSelected(0);
          }}
          onClear={() => {
            setOwned([]);
            setSelected(0);
          }}
          onClose={() => setSheet('none')}
        />
      ) : null}

      {sheet === 'settings' ? (
        <SettingsSheet
          settings={settings}
          onChange={update}
          hotkeyErrors={hotkeyErrors}
          gameDetection={gameDetection}
          isDesktop={isDesktop}
          version={version}
          compCount={comps.length}
          onResetPosition={() => overlayApi?.resetPosition()}
          onQuit={() => overlayApi?.quit()}
          onClose={() => setSheet('none')}
        />
        ) : null}
      </div>
    </div>
  );
}
