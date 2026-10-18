import type { CSSProperties } from 'react';
import { getTraitMeta } from '../lib/traitMeta';
import { championMap } from '../lib/data';

interface PortraitProps {
  championId: string;
  className?: string;
}

export function Portrait({ championId, className = '' }: PortraitProps) {
  const champion = championMap.get(championId);
  if (!champion) {
    return <div className={`unit-portrait ${className}`} aria-hidden="true" />;
  }
  return (
    <div
      className={`unit-portrait cost-${champion.cost} ${className}`}
      title={`${champion.name} · ${champion.cost} ذهب`}
    >
      {champion.icon ? (
        <img src={champion.icon} alt={champion.name} loading="lazy" />
      ) : (
        <span style={{ fontSize: 11 }}>{champion.name.slice(0, 1)}</span>
      )}
    </div>
  );
}

interface TraitIconProps {
  name: string;
  size?: number;
}

export function TraitIcon({ name, size = 30 }: TraitIconProps) {
  const { Icon, color } = getTraitMeta(name);
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

