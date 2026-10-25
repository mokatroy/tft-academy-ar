import { Power, RotateCcw, X } from 'lucide-react';
import type { Locale, Localized } from '../../../src/lib/types';
import { HOTKEY_HINTS } from '../lib/bridge';
import type { OverlaySettings } from '../lib/bridge';

interface SettingsSheetProps {
  settings: OverlaySettings;
  onChange: (patch: Partial<OverlaySettings>) => void;
  hotkeyErrors: string[];
  gameDetection: boolean;
  isDesktop: boolean;
  version: string;
  compCount: number;
  onResetPosition: () => void;
  onQuit: () => void;
  onClose: () => void;
}

const LOCALES: { id: Locale; label: string }[] = [
  { id: 'ar', label: 'العربية' },
  { id: 'en', label: 'English' },
  { id: 'ja', label: 'JA' },
];

const SCALES: { value: number; label: Localized }[] = [
  { value: 0.85, label: { ar: 'صغير', en: 'Small', ja: '小' } },
  { value: 1, label: { ar: 'عادي', en: 'Normal', ja: '標準' } },
  { value: 1.15, label: { ar: 'كبير', en: 'Large', ja: '大' } },
];

export function SettingsSheet({
  settings,
  onChange,
  hotkeyErrors,
  gameDetection,
  isDesktop,
  version,
  compCount,
  onResetPosition,
  onQuit,
  onClose,
}: SettingsSheetProps) {
  const locale = settings.locale;
  const t = (value: Localized | undefined | null) => value?.[locale] || value?.en || '';

  return (
    <div className="ov-sheet ov-sheet-settings">
      <header className="ov-sheet-head">
        <div>
          <h3>{t({ ar: 'الإعدادات', en: 'Settings', ja: '設定' })}</h3>
          <p>{isDesktop ? 'TFT Academy Overlay' : t({ ar: 'معاينة المتصفح', en: 'Browser preview', ja: 'ブラウザプレビュー' })}</p>
        </div>
        <div className="ov-sheet-actions">
          <button type="button" onClick={onClose} title={t({ ar: 'إغلاق', en: 'Close', ja: '閉じる' })}>
            <X size={15} />
          </button>
        </div>
      </header>

      <div className="ov-settings">
        <div className="ov-setting">
          <span className="ov-setting-label">{t({ ar: 'اللغة', en: 'Language', ja: '言語' })}</span>
          <div className="ov-segmented">
            {LOCALES.map((entry) => (
              <button
                type="button"
                key={entry.id}
                className={settings.locale === entry.id ? 'on' : ''}
                onClick={() => onChange({ locale: entry.id })}
              >
                {entry.label}
              </button>
            ))}
          </div>
        </div>

        <div className="ov-setting">
          <span className="ov-setting-label">
            {t({ ar: 'الشفافية', en: 'Opacity', ja: '不透明度' })}
            <b>{Math.round(settings.opacity * 100)}%</b>
          </span>
          <input
            className="ov-range"
            type="range"
            min={40}
            max={100}
            step={1}
            value={Math.round(settings.opacity * 100)}
            onChange={(event) => onChange({ opacity: Number(event.target.value) / 100 })}
          />
        </div>

        <div className="ov-setting">
          <span className="ov-setting-label">{t({ ar: 'الحجم', en: 'Size', ja: 'サイズ' })}</span>
          <div className="ov-segmented">
            {SCALES.map((entry) => (
              <button
                type="button"
                key={entry.value}
                className={Math.abs(settings.scale - entry.value) < 0.01 ? 'on' : ''}
                onClick={() => onChange({ scale: entry.value })}
              >
                {t(entry.label)}
              </button>
            ))}
          </div>
        </div>

        {isDesktop ? (
          <>
            <button type="button" className="ov-toggle-row" onClick={() => onChange({ clickThrough: !settings.clickThrough })}>
              <span>
                {t({ ar: 'مرور النقر للّعبة', en: 'Click-through to the game', ja: 'ゲームへクリック透過' })}
                <em>
                  {t({
                    ar: 'الماوس يشتغل في اللعبة والاوفرلاي للقراءة فقط',
                    en: 'The mouse stays in the game; the overlay is read-only',
                    ja: 'マウスはゲーム側で動く（表示専用）',
                  })}
                </em>
              </span>
              <b className={`ov-switch ${settings.clickThrough ? 'on' : ''}`} />
            </button>

            <button type="button" className="ov-toggle-row" onClick={() => onChange({ autoShow: !settings.autoShow })}>
              <span>
                {t({ ar: 'يظهر تلقائيًا مع اللعبة', en: 'Show automatically with the game', ja: 'ゲーム起動時に自動表示' })}
                <em>
                  {gameDetection
                    ? t({ ar: 'يظهر لما يشتغل League of Legends.exe', en: 'Appears when League of Legends.exe starts', ja: 'League of Legends.exe の起動で表示' })
                    : t({ ar: 'الكشف التلقائي متاح على ويندوز فقط', en: 'Automatic detection is Windows-only', ja: '自動検出はWindowsのみ' })}
                </em>
              </span>
              <b className={`ov-switch ${settings.autoShow ? 'on' : ''}`} />
            </button>
          </>
        ) : null}

        <div className="ov-setting">
          <span className="ov-setting-label">{t({ ar: 'اختصارات', en: 'Hotkeys', ja: 'ホットキー' })}</span>
          <ul className="ov-keys">
            <li>
              <kbd>{HOTKEY_HINTS.toggle}</kbd>
              {t({ ar: 'إظهار / إخفاء الاوفرلاي', en: 'Show / hide the overlay', ja: '表示 / 非表示' })}
            </li>
            <li>
              <kbd>{HOTKEY_HINTS.interactive}</kbd>
              {t({ ar: 'تبديل وضع التفاعل', en: 'Toggle interactive mode', ja: '操作モード切替' })}
            </li>
            <li>
              <kbd>{HOTKEY_HINTS.pick}</kbd>
              {t({ ar: 'اختيار كومبو من القائمة', en: 'Pick a comp from the rail', ja: '構成を選択' })}
            </li>
          </ul>
          {hotkeyErrors.length > 0 ? (
            <p className="ov-warn">
              {t({ ar: 'اختصارات مش متاحة (مستخدمة من برنامج تاني):', en: 'Hotkeys unavailable (already taken):', ja: '使用できないホットキー:' })}{' '}
              {hotkeyErrors.join(', ')}
            </p>
          ) : null}
        </div>

        {!isDesktop ? (
          <p className="ov-note">
            {t({
              ar: 'وضع المتصفح: مرور النقر والاختصارات وكشف اللعبة بيشتغلوا جوه تطبيق الكمبيوتر بس.',
              en: 'Browser preview: click-through, hotkeys and game detection only work inside the desktop app.',
              ja: 'ブラウザプレビュー：クリックスルー・ホットキー・ゲーム検出はデスクトップアプリのみ。',
            })}
          </p>
        ) : null}

        <div className="ov-setting-row">
          <button type="button" className="ov-ghost-btn" onClick={onResetPosition}>
            <RotateCcw size={13} />
            {t({ ar: 'إعادة ضبط الموضع', en: 'Reset position', ja: '位置をリセット' })}
          </button>
          {isDesktop ? (
            <button type="button" className="ov-ghost-btn danger" onClick={onQuit}>
              <Power size={13} />
              {t({ ar: 'خروج', en: 'Quit', ja: '終了' })}
            </button>
          ) : null}
        </div>

        <p className="ov-sheet-foot">
          <span dir="ltr">TFT Academy Overlay v{version}</span>
          {' · '}
          {compCount} {t({ ar: 'كومبو', en: 'comps', ja: '構成' })}
        </p>
      </div>
    </div>
  );
}
