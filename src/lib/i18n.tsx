import { createContext, useContext, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { DEFAULT_LOCALE, LOCALES } from './types';
import type { Locale, Localized } from './types';

export interface I18n {
  locale: Locale;
  dir: 'rtl' | 'ltr';
  /** Translate a Localized value (falls back to English, then Arabic, then key). */
  t: (value: Localized | undefined | null, fallback?: string) => string;
  setLocale: (next: Locale) => void;
  /** Convert a locale-agnostic path (e.g. "/champions") to a locale-prefixed one. */
  localizePath: (path: string, next?: Locale) => string;
  /** The locale prefix for the current locale ("" for default Arabic). */
  prefix: string;
}

const I18nContext = createContext<I18n | null>(null);

export function localeDir(locale: Locale): 'rtl' | 'ltr' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

/** Extract the locale prefix from a pathname like "/en/champions" -> "en". */
export function parseLocaleFromPath(pathname: string): { locale: Locale; rest: string } {
  const segment = pathname.split('/').filter(Boolean)[0];
  if (segment === 'en' || segment === 'ja') {
    const rest = pathname.slice(segment.length + 1) || '/';
    return { locale: segment, rest };
  }
  return { locale: DEFAULT_LOCALE, rest: pathname || '/' };
}

/** Prefix a locale-agnostic path with a locale (default/ar has no prefix). */
export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '' : `/${locale}`;
}

export function buildPath(locale: Locale, rest: string): string {
  const prefix = localePrefix(locale);
  if (rest === '/') return prefix || '/';
  return `${prefix}${rest}`;
}

export function I18nProvider({
  locale,
  setLocale,
  children,
}: {
  locale: Locale;
  setLocale?: (next: Locale) => void;
  children: ReactNode;
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = localeDir(locale);
  }, [locale]);

  const value = useMemo<I18n>(() => {
    const dir = localeDir(locale);
    const prefix = localePrefix(locale);
    const t = (input: Localized | undefined | null, fallback = ''): string => {
      if (!input) return fallback;
      return input[locale] || input.en || input.ar || fallback;
    };
    const localizePath = (path: string, next?: Locale): string =>
      buildPath(next ?? locale, path);
    const set = setLocale ?? (() => undefined);
    return { locale, dir, t, setLocale: set, localizePath, prefix };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18n {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
}

/** Convenience hook: just the translate function. */
export function useT(): I18n['t'] {
  return useI18n().t;
}

export { LOCALES, DEFAULT_LOCALE };
export type { Locale, Localized };
