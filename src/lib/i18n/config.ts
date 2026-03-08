export const supportedLocales = ['en', 'zh-CN'] as const;

export type AppLocale = (typeof supportedLocales)[number];

export const DEFAULT_LOCALE: AppLocale = 'en';
export const I18N_STORAGE_KEY = 'tanvite-locale';

export function isAppLocale(value: string | null): value is AppLocale {
  return supportedLocales.includes(value as AppLocale);
}

export function detectBrowserLocale(
  language: string | undefined = typeof navigator === 'undefined' ? undefined : navigator.language
): AppLocale {
  return language?.toLowerCase().startsWith('zh') ? 'zh-CN' : 'en';
}

export function getInitialLocale(
  storage = typeof window === 'undefined' ? null : window.localStorage
) {
  const stored = storage ? storage.getItem(I18N_STORAGE_KEY) : null;
  return isAppLocale(stored) ? stored : detectBrowserLocale();
}

export function persistLocale(
  locale: AppLocale,
  storage = typeof window === 'undefined' ? null : window.localStorage
) {
  storage?.setItem(I18N_STORAGE_KEY, locale);
}
