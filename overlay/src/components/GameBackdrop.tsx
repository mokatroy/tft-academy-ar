import { champions, meta } from '../lib/data';

/**
 * Browser-only mock of the in-game screen. Electron never mounts this: it exists
 * so the overlay can be reviewed (and screenshotted) in a normal browser.
 */
const HUD_UNITS = champions.slice(0, 8);
const SHOP_UNITS = champions.slice(10, 15);

export function GameBackdrop() {
  return (
    <div className="mock-game" aria-hidden="true">
      <div className="mock-hud">
        <div className="mock-hud-left">
          <span className="mock-round">4-2</span>
          <span className="mock-stage">المرحلة 4 · الدور 2</span>
        </div>
        <div className="mock-hud-right">
          <span className="mock-gold">32</span>
          <span className="mock-hp">68</span>
          <span className="mock-level">LVL 8</span>
        </div>
      </div>

      <div className="mock-board">
        {HUD_UNITS.map((champion, index) => (
          <div
            key={champion.id}
            className="mock-unit"
            style={{
              left: `${8 + (index % 4) * 21}%`,
              top: `${10 + Math.floor(index / 4) * 26}%`,
            }}
          >
            {champion.icon ? <img src={champion.icon} alt="" /> : null}
          </div>
        ))}
      </div>

      <div className="mock-shop">
        {SHOP_UNITS.map((champion) => (
          <div key={champion.id} className={`mock-shop-card cost-${champion.cost}`}>
            {champion.icon ? <img src={champion.icon} alt="" /> : null}
          </div>
        ))}
      </div>

      <div className="mock-traits">
        {Array.from({ length: 6 }).map((_, index) => (
          <span key={index} className="mock-trait" />
        ))}
      </div>

      <div className="mock-brand">
        {meta.setName.en} · patch {meta.patch} · معاينة المتصفح
      </div>
    </div>
  );
}
