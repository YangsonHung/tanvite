import { type ShowcaseLocale, useShowcaseI18n } from './i18n';

export type SiteLanguage = ShowcaseLocale;

export function useSiteLanguage() {
  const { locale, setLocale } = useShowcaseI18n();

  return {
    language: locale,
    setLanguage: setLocale,
  };
}
