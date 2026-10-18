import { Link } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Comp } from '../lib/types';
import { compTraits, tierStyles } from '../lib/data';
import { Portrait } from './Portrait';

export function CompCard({ comp }: { comp: Comp }) {
  const style = tierStyles[comp.tier];
  const activeTraits = compTraits(comp).filter((trait) => trait.active).slice(0, 4);

  return (
    <Link
      to={`/comp/${comp.slug}`}
      className="comp-card"
      style={
        {
          '--tier-color': style.color,
          '--tier-glow': style.glow,
        } as CSSProperties
      }
    >
      <div className="comp-tier">{comp.tier}</div>
      <div className="comp-body">
        <div className="comp-top">
          <div>
            <h3 className="comp-name">{comp.name}</h3>
            <p className="comp-sub">{comp.subtitle}</p>
          </div>
          <span className="difficulty" title={`الصعوبة ${comp.difficulty} من 3`}>
            {[1, 2, 3].map((level) => (
              <i key={level} className={`diff-dot ${level <= comp.difficulty ? 'on' : ''}`} />
            ))}
            صعوبة
          </span>
        </div>

        <div className="comp-traits">
          {activeTraits.map((trait) => (
            <span className="trait-pill" key={trait.name}>
              <strong>{trait.count}</strong>
              {trait.name}
            </span>
          ))}
          <span className="trait-pill">
            <Users size={11} />
            {comp.units.length} وحدات
          </span>
        </div>

        <div className="comp-units">
          {comp.units.map((unit) => (
            <Portrait key={`${unit.champion}-${unit.row}-${unit.col}`} championId={unit.champion} />
          ))}
        </div>

        <div className="comp-foot">
          <span>{comp.playstyle}</span>
          <i className="sep" />
          <span>{comp.level}</span>
          <span className="comp-link">
            تفاصيل الكومب
            <ArrowLeft size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}
