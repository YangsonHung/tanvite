import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import {
  type AppLocale,
  DEFAULT_LOCALE,
  getInitialLocale,
  persistLocale,
  supportedLocales,
} from "./config";
import { type MessageKey, messages } from "./messages";

type I18nContextValue = {
  locale: AppLocale;
  locales: readonly AppLocale[];
  setLocale: (locale: AppLocale) => void;
  t: (key: MessageKey) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getMessage(locale: AppLocale, key: MessageKey) {
  const segments = key.split(".");
  let current: unknown = messages[locale];

  for (const segment of segments) {
    if (typeof current !== "object" || current === null || !(segment in current)) {
      current = undefined;
      break;
    }

    current = (current as Record<string, unknown>)[segment];
  }

  if (typeof current === "string") {
    return current;
  }

  let fallback: unknown = messages[DEFAULT_LOCALE];
  for (const segment of segments) {
    if (typeof fallback !== "object" || fallback === null || !(segment in fallback)) {
      return key;
    }

    fallback = (fallback as Record<string, unknown>)[segment];
  }

  return typeof fallback === "string" ? fallback : key;
}

export function I18nProvider({ children }: PropsWithChildren) {
  const [locale, setLocaleState] = useState<AppLocale>(getInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    persistLocale(locale);
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      locales: supportedLocales,
      setLocale: setLocaleState,
      t: (key) => getMessage(locale, key),
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  return context;
}
