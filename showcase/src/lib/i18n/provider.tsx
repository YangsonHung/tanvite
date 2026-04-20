import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_SHOWCASE_LOCALE,
  getInitialShowcaseLocale,
  persistShowcaseLocale,
  type ShowcaseLocale,
  supportedShowcaseLocales,
} from './config';
import { type ShowcaseMessageKey, showcaseMessages } from './messages';

type ShowcaseI18nContextValue = {
  locale: ShowcaseLocale;
  locales: readonly ShowcaseLocale[];
  setLocale: (locale: ShowcaseLocale) => void;
  t: (key: ShowcaseMessageKey) => string;
};

const ShowcaseI18nContext = createContext<ShowcaseI18nContextValue | null>(null);

function getShowcaseMessage(locale: ShowcaseLocale, key: ShowcaseMessageKey) {
  const segments = key.split('.');
  let current: unknown = showcaseMessages[locale];

  for (const segment of segments) {
    if (typeof current !== 'object' || current === null || !(segment in current)) {
      current = undefined;
      break;
    }

    current = (current as Record<string, unknown>)[segment];
  }

  if (typeof current === 'string') {
    return current;
  }

  let fallback: unknown = showcaseMessages[DEFAULT_SHOWCASE_LOCALE];
  for (const segment of segments) {
    if (typeof fallback !== 'object' || fallback === null || !(segment in fallback)) {
      return key;
    }

    fallback = (fallback as Record<string, unknown>)[segment];
  }

  return typeof fallback === 'string' ? fallback : key;
}

export function ShowcaseI18nProvider({ children }: PropsWithChildren) {
  const [locale, setLocaleState] = useState<ShowcaseLocale>(getInitialShowcaseLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    persistShowcaseLocale(locale);
  }, [locale]);

  const value = useMemo<ShowcaseI18nContextValue>(
    () => ({
      locale,
      locales: supportedShowcaseLocales,
      setLocale: setLocaleState,
      t: (key) => getShowcaseMessage(locale, key),
    }),
    [locale]
  );

  return <ShowcaseI18nContext.Provider value={value}>{children}</ShowcaseI18nContext.Provider>;
}

export function useShowcaseI18n() {
  const context = useContext(ShowcaseI18nContext);

  if (!context) {
    throw new Error('useShowcaseI18n must be used within ShowcaseI18nProvider');
  }

  return context;
}
