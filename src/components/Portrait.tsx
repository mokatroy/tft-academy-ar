import type { CSSProperties } from 'react';
import { getTraitMeta } from '../lib/traitMeta';
import { championMap, costLabel } from '../lib/data';
import { useI18n } from '../lib/i18n';

interface PortraitProps {
  championId: string;
  className?: string;
}

export function Portrait({ championId, className = '' }: PortraitProps) {
  const champion = championMap.get(championId);
  const { t, locale } = useI18n();
  if (!champion) {
    return <div className={`unit-portrait ${className}`} aria-hidden="true" />;
  }
  return (
    <div
      className={`unit-portrait cost-${champion.cost} ${className}`}
      title={`${t(champion.name)} · ${costLabel(champion.cost, locale)}`}
    >
      {champion.icon ? (
        <img src={champion.icon} alt={t(champion.name)} loading="lazy" />
      ) : (
        <span style={{ fontSize: 11 }}>{t(champion.name).slice(0, 1)}</span>
      )}
    </div>
  );
}

interface TraitIconProps {
  /** Stable trait id (e.g. DA_18_Elderwood). */
  id: string;
  name: string;
  size?: number;
}

export function TraitIcon({ id, name, size = 30 }: TraitIconProps) {
  const { Icon, color } = getTraitMeta(id);
  return (
    <span
      className="trait-icon"
      style={{ '--trait-color': color, width: size, height: size } as CSSProperties}
      title={name}
    >
      <Icon size={Math.round(size * 0.55)} strokeWidth={2} />
    </span>
  );
}
