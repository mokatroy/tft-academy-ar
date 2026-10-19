import { Link } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { Comp } from '../lib/types';
import { compTraits, tierStyles } from '../lib/data';
import { useI18n } from '../lib/i18n';
import { Portrait } from './Portrait';

export function CompCard({ comp }: { comp: Comp }) {
  const style = tierStyles[comp.tier];
  const activeTraits = compTraits(comp).filter((trait) => trait.active).slice(0, 4);
  const { t, localizePath } = useI18n();

  return (
    <Link
      to={localizePath(`/comp/${comp.slug}`)}
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
            <h3 className="comp-name">{t(comp.name)}</h3>
            <p className="comp-sub">{t(comp.subtitle)}</p>
          </div>
          <span
            className="difficulty"
            title={`${t({ ar: 'الصعوبة', en: 'Difficulty', ja: '難易度' })} ${comp.difficulty}/3`}
          >
            {[1, 2, 3].map((level) => (
              <i key={level} className={`diff-dot ${level <= comp.difficulty ? 'on' : ''}`} />
            ))}
            {t({ ar: 'صعوبة', en: 'Difficulty', ja: '難易度' })}
          </span>
        </div>

        <div className="comp-traits">
          {activeTraits.map((trait) => (
            <span className="trait-pill" key={trait.id} data-tip-kind="trait" data-tip-id={trait.id}>
              <strong>{trait.count}</strong>
              {t(trait.name)}
            </span>
          ))}
          <span className="trait-pill">
            <Users size={11} />
            {comp.units.length} {t({ ar: 'وحدات', en: 'units', ja: '体' })}
          </span>
        </div>

        <div className="comp-units">
          {comp.units.map((unit) => (
            <Portrait key={`${unit.champion}-${unit.row}-${unit.col}`} championId={unit.champion} />
          ))}
        </div>

        <div className="comp-foot">
          <span>{t(comp.playstyle)}</span>
          <i className="sep" />
          <span>{t(comp.level)}</span>
          <span className="comp-link">
            {t({ ar: 'تفاصيل الكومب', en: 'Comp details', ja: '構成詳細' })}
            <ArrowLeft size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}
