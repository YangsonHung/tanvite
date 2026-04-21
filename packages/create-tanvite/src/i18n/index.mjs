import en from './en.mjs';
import zhCN from './zh-CN.mjs';

export const SUPPORTED_LOCALES = ['en', 'zh-CN'];
export const DEFAULT_LOCALE = 'en';

const registry = {
  en,
  'zh-CN': zhCN,
};

export function isSupportedLocale(value) {
  return SUPPORTED_LOCALES.includes(value);
}

export function normalizeLocale(input) {
  if (!input) return DEFAULT_LOCALE;
  const trimmed = String(input).trim();
  if (isSupportedLocale(trimmed)) return trimmed;
  const lower = trimmed.toLowerCase();
  if (lower === 'zh' || lower === 'zh-cn' || lower === 'cn') return 'zh-CN';
  if (lower === 'en' || lower === 'en-us' || lower === 'english') return 'en';
  return DEFAULT_LOCALE;
}

export function getMessages(locale) {
  return registry[normalizeLocale(locale)] ?? registry[DEFAULT_LOCALE];
}
