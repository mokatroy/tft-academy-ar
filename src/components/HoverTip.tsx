import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import {
  augmentMap,
  champions,
  championMap,
  costColors,
  costLabel,
  formatTraitDescription,
  itemMap,
  traitMap,
} from '../lib/data';
import { breakpoints, formatGameText } from '../lib/format';
import { getTraitMeta } from '../lib/traitMeta';
import { useI18n } from '../lib/i18n';
import { Portrait, TraitIcon } from './Portrait';

type TipKind = 'champion' | 'item' | 'trait' | 'augment';

interface TipTarget {
  kind: TipKind;
  id: string;
  host: HTMLElement;
}

const SHOW_DELAY = 150;
const HIDE_DELAY = 110;

/**
 * Renders one floating info card anywhere on the page. Elements opt in with
 * `data-tip-kind="champion|item|trait|augment"` and `data-tip-id="<stable id>"`.
 * Hovering shows the card above the element (below when there is no room);
 * it never intercepts pointer events.
 */
export function HoverTipProvider() {
  const location = useLocation();
  const [target, setTarget] = useState<TipTarget | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<TipTarget | null>(null);
  const showTimer = useRef<number | undefined>(undefined);
  const hideTimer = useRef<number | undefined>(undefined);

  const place = useCallback(() => {
    const host = targetRef.current?.host;
    const card = cardRef.current;
    if (!host || !card) return;
    const rect = host.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      setTarget(null);
      return;
    }
    const width = card.offsetWidth;
    const height = card.offsetHeight;
    const viewW = document.documentElement.clientWidth;
    const viewH = document.documentElement.clientHeight;
    let x = rect.left + rect.width / 2 - width / 2;
    x = Math.min(Math.max(8, x), Math.max(8, viewW - width - 8));
    let y = rect.top - height - 10;
    if (y < 8) y = rect.bottom + 10;
    y = Math.min(Math.max(8, y), Math.max(8, viewH - height - 8));
    setPos({ x, y });
  }, []);

  // Keep the card anchored while scrolling/resizing, and re-place when content changes.
  useLayoutEffect(() => {
    place();
  }, [target, place]);

  useEffect(() => {
    if (!target) return undefined;
    const onMove = () => place();
    window.addEventListener('scroll', onMove, true);
    window.addEventListener('resize', onMove);
    return () => {
      window.removeEventListener('scroll', onMove, true);
      window.removeEventListener('resize', onMove);
    };
  }, [target, place]);

  // Dismiss when the route changes.
  useEffect(() => {
    targetRef.current = null;
    setTarget(null);
  }, [location.pathname]);

  useEffect(() => {
    const findHost = (node: EventTarget | null): HTMLElement | null => {
      if (!(node instanceof Element)) return null;
      const host = node.closest<HTMLElement>('[data-tip-kind]');
      return host && host.isConnected ? host : null;
    };
    const clearTimers = () => {
      window.clearTimeout(showTimer.current);
      window.clearTimeout(hideTimer.current);
    };
    const hide = () => {
      clearTimers();
      targetRef.current = null;
      setTarget(null);
    };
    const show = (host: HTMLElement) => {
      const kind = host.dataset.tipKind as TipKind | undefined;
      const id = host.dataset.tipId;
      if (!kind || !id) return;
      clearTimers();
      showTimer.current = window.setTimeout(() => {
        const next: TipTarget = { kind, id, host };
        targetRef.current = next;
        setTarget(next);
      }, SHOW_DELAY);
    };

    const onOver = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const host = findHost(event.target);
      if (host) show(host);
    };
    const onOut = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const current = targetRef.current;
      if (!current) return;
      const host = findHost(event.target);
      if (!host || host !== current.host) return;
      const related = event.relatedTarget;
      if (related instanceof Node && current.host.contains(related)) return;
      window.clearTimeout(showTimer.current);
      window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => {
        targetRef.current = null;
        setTarget(null);
      }, HIDE_DELAY);
    };

    const onDown = () => hide();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') hide();
    };

    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    document.addEventListener('pointerdown', onDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      document.removeEventListener('pointerdown', onDown);
      window.removeEventListener('keydown', onKeyDown);
      clearTimers();
    };
  }, []);

  if (!target) return null;

  return createPortal(
    <div
      ref={cardRef}
      className="hover-tip"
      style={{ left: pos?.x ?? -9999, top: pos?.y ?? -9999 }}
      role="tooltip"
    >
      <TipContent kind={target.kind} id={target.id} />
    </div>,
    document.body,
  );
}

function TipContent({ kind, id }: { kind: TipKind; id: string }) {
  const { t, locale } = useI18n();

  if (kind === 'champion') {
    const champion = championMap.get(id);
    if (!champion) return null;
    const stats = [
      { label: t({ ar: 'صحة', en: 'HP', ja: 'HP' }), value: champion.stats.hp },
      { label: t({ ar: 'مانا', en: 'Mana', ja: 'マナ' }), value: champion.stats.mana },
      { label: t({ ar: 'ضرر', en: 'AD', ja: 'AD' }), value: champion.stats.damage },
      {
        label: t({ ar: 'سرعة', en: 'AS', ja: 'AS' }),
        value: typeof champion.stats.attackSpeed === 'number' ? champion.stats.attackSpeed.toFixed(2) : undefined,
      },
      { label: t({ ar: 'درع', en: 'Armor', ja: 'AR' }), value: champion.stats.armor },
      { label: t({ ar: 'سحر', en: 'MR', ja: 'MR' }), value: champion.stats.magicResist },
      { label: t({ ar: 'مدى', en: 'Range', ja: '射程' }), value: champion.stats.range },
    ].filter((stat) => stat.value !== undefined && stat.value !== null);

    const abilityDesc =
      formatGameText(t(champion.ability.desc), undefined, champion.ability.variables, 1, '…', locale) ||
      t({ ar: 'وصف القدرة غير متوفر.', en: 'Ability description unavailable.', ja: 'アビリティ説明はありません。' });

    return (
      <div className="tip-body">
        <div className="tip-head">
          <Portrait championId={champion.id} />
          <div className="tip-headtext">
            <div className="tip-title">{t(champion.name)}</div>
            <div className="tip-cost" style={{ color: costColors[champion.cost] }}>
              {costLabel(champion.cost, locale)}
            </div>
          </div>
        </div>
        <div className="tip-traits">
          {champion.traits.map((traitId) => (
            <span className="tip-trait" key={traitId}>
              <TraitIcon id={traitId} name={t(traitMap.get(traitId)?.name)} size={16} />
              {t(traitMap.get(traitId)?.name)}
            </span>
          ))}
        </div>
        <div className="tip-ability">
          <b>{t(champion.ability.name)}</b>
          <p>{abilityDesc}</p>
        </div>
        {stats.length > 0 && (
          <div className="tip-stats">
            {stats.map((stat) => (
              <span key={stat.label}>
                <b>{stat.value}</b>
                {stat.label}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (kind === 'item') {
    const item = itemMap.get(id);
    if (!item) return null;
    const desc = formatGameText(t(item.desc), item.effects, undefined, 1, '', locale);
    return (
      <div className="tip-body">
        <div className="tip-head">
          {item.icon ? (
            <img className="tip-icon" src={item.icon} alt="" />
          ) : (
            <span className="tip-icon tip-icon-empty" />
          )}
          <div className="tip-headtext">
            <div className="tip-title">{t(item.name)}</div>
            <div className="tip-kicker">
              {item.kind === 'component'
                ? t({ ar: 'مكوّن أساسي', en: 'Base component', ja: '基本コンポーネント' })
                : t({ ar: 'عنصر مكتمل', en: 'Completed item', ja: '完成アイテム' })}
            </div>
          </div>
        </div>
        {item.components.length > 0 && (
          <div className="tip-comps">
            {item.components.map((componentId, index) => {
              const component = itemMap.get(componentId);
              return (
                <span className="tip-comp" key={`${componentId}-${index}`}>
                  {index > 0 && <i>+</i>}
                  {component?.icon ? <img src={component.icon} alt={t(component.name)} /> : null}
                </span>
              );
            })}
          </div>
        )}
        {desc && <p className="tip-desc">{desc}</p>}
      </div>
    );
  }

  if (kind === 'trait') {
    const trait = traitMap.get(id);
    if (!trait) return null;
    const meta = getTraitMeta(trait.id);
    const steps = breakpoints(trait);
    const holders = champions.filter((champion) => champion.traits.includes(trait.id)).length;
    const desc = formatTraitDescription(trait, locale);
    return (
      <div className="tip-body">
        <div className="tip-head">
          <span className="trait-icon" style={{ '--trait-color': meta.color } as React.CSSProperties}>
            <meta.Icon size={16} />
          </span>
          <div className="tip-headtext">
            <div className="tip-title">{t(trait.name)}</div>
            <div className="tip-kicker" style={{ color: meta.color }}>
              {steps.length > 0 ? steps.join(' / ') : t({ ar: 'خاصية فريدة', en: 'Unique trait', ja: 'ユニーク特性' })}
            </div>
          </div>
          <span className="tip-count">
            {holders} {t({ ar: 'أبطال', en: 'champs', ja: '体' })}
          </span>
        </div>
        {desc && <p className="tip-desc">{desc}</p>}
      </div>
    );
  }

  const augment = augmentMap.get(id);
  if (!augment) return null;
  const desc = formatGameText(t(augment.desc), augment.effects, undefined, 1, '', locale);
  return (
    <div className="tip-body">
      <div className="tip-head">
        {augment.icon ? (
          <img className="tip-icon" src={augment.icon} alt="" />
        ) : (
          <span className="tip-icon tip-icon-empty" />
        )}
        <div className="tip-headtext">
          <div className="tip-title">{t(augment.name)}</div>
          <div className="tip-kicker">{t({ ar: 'تعزيز', en: 'Augment', ja: '強化符文' })}</div>
        </div>
      </div>
      {desc && <p className="tip-desc">{desc}</p>}
    </div>
  );
}
