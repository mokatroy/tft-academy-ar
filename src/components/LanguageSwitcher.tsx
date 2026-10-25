import { useLocation, useNavigate } from 'react-router-dom';
import { Languages } from 'lucide-react';
import { LOCALES, parseLocaleFromPath, useI18n } from '../lib/i18n';
import type { Locale } from '../lib/types';

const LABELS: Record<Locale, string> = { ar: 'العربية', en: 'English', ja: '日本語' };
const SHORT: Record<Locale, string> = { ar: 'AR', en: 'EN', ja: 'JA' };

export function LanguageSwitcher() {
  const { locale, localizePath } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();

  const change = (next: Locale) => {
    if (next === locale) return;
    // Keep the current page, swap only the locale prefix.
    const { rest } = parseLocaleFromPath(location.pathname);
    navigate(localizePath(rest, next));
  };

  return (
    <div className="lang-switch" role="group" aria-label="Language / اللغة / 言語">
      <Languages size={13} className="lang-icon" aria-hidden="true" />
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          className={`lang-btn ${code === locale ? 'active' : ''}`}
          onClick={() => change(code)}
          aria-pressed={code === locale}
          title={LABELS[code]}
        >
          {SHORT[code]}
        </button>
      ))}
    </div>
  );
}
