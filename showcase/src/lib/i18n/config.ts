export const supportedShowcaseLocales = ['en', 'zh-CN'] as const;

export type ShowcaseLocale = (typeof supportedShowcaseLocales)[number];

export const DEFAULT_SHOWCASE_LOCALE: ShowcaseLocale = 'en';
export const SHOWCASE_I18N_STORAGE_KEY = 'tanvite-showcase-locale';

export function isShowcaseLocale(value: string | null): value is ShowcaseLocale {
  return supportedShowcaseLocales.includes(value as ShowcaseLocale);
}

export function detectBrowserShowcaseLocale(
  language: string | undefined = typeof navigator === 'undefined' ? undefined : navigator.language
): ShowcaseLocale {
  return language?.toLowerCase().startsWith('zh') ? 'zh-CN' : 'en';
}

export function getInitialShowcaseLocale(
  storage = typeof window === 'undefined' ? null : window.localStorage
) {
  const stored = storage ? storage.getItem(SHOWCASE_I18N_STORAGE_KEY) : null;
  return isShowcaseLocale(stored) ? stored : detectBrowserShowcaseLocale();
}

export function persistShowcaseLocale(
  locale: ShowcaseLocale,
  storage = typeof window === 'undefined' ? null : window.localStorage
) {
  storage?.setItem(SHOWCASE_I18N_STORAGE_KEY, locale);
}
