import { useEffect, useEffectEvent, useState } from 'react';

export type SiteThemePreference = 'system' | 'dark' | 'light';
export type ResolvedSiteTheme = 'dark' | 'light';

export const SITE_THEME_STORAGE_KEY = 'tanvite-site-theme';
export const SITE_THEME_QUERY = '(prefers-color-scheme: dark)';

function isSiteThemePreference(value: string | null): value is SiteThemePreference {
  return value === 'system' || value === 'dark' || value === 'light';
}

function getWindowStorage() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function getWindowMatchMedia() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return null;
  }

  return window.matchMedia.bind(window);
}

export function getStoredThemePreference(storage = getWindowStorage()): SiteThemePreference | null {
  const stored = storage?.getItem(SITE_THEME_STORAGE_KEY) ?? null;
  return isSiteThemePreference(stored) ? stored : null;
}

export function getInitialThemePreference(): SiteThemePreference {
  return getStoredThemePreference() ?? 'system';
}

export function getSystemTheme(matchMedia = getWindowMatchMedia()): ResolvedSiteTheme {
  return matchMedia?.(SITE_THEME_QUERY).matches ? 'dark' : 'light';
}

export function resolveThemePreference(
  preference: SiteThemePreference,
  systemTheme: ResolvedSiteTheme = getSystemTheme()
): ResolvedSiteTheme {
  return preference === 'system' ? systemTheme : preference;
}

export function getToggledThemePreference(
  currentTheme: ResolvedSiteTheme
): Exclude<SiteThemePreference, 'system'> {
  return currentTheme === 'dark' ? 'light' : 'dark';
}

export function persistThemePreference(
  preference: SiteThemePreference,
  storage = getWindowStorage()
) {
  storage?.setItem(SITE_THEME_STORAGE_KEY, preference);
}

export function applyThemePreference(
  preference: SiteThemePreference,
  doc: Document | null = typeof document === 'undefined' ? null : document,
  matchMedia = getWindowMatchMedia()
): ResolvedSiteTheme {
  const resolvedTheme = resolveThemePreference(preference, getSystemTheme(matchMedia));

  if (doc) {
    const { documentElement } = doc;
    documentElement.classList.toggle('dark', resolvedTheme === 'dark');
    documentElement.style.colorScheme = resolvedTheme;
    documentElement.dataset.themePreference = preference;
    documentElement.dataset.themeResolved = resolvedTheme;
  }

  return resolvedTheme;
}

export function useSiteTheme() {
  const [preference, setPreferenceState] = useState<SiteThemePreference>(getInitialThemePreference);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedSiteTheme>(() =>
    resolveThemePreference(getInitialThemePreference())
  );

  const syncSystemTheme = useEffectEvent(() => {
    setResolvedTheme(applyThemePreference('system'));
  });

  function setThemePreference(nextPreference: SiteThemePreference) {
    persistThemePreference(nextPreference);
    setPreferenceState(nextPreference);
    setResolvedTheme(applyThemePreference(nextPreference));
  }

  function toggleThemePreference() {
    setThemePreference(getToggledThemePreference(resolvedTheme));
  }

  useEffect(() => {
    if (preference !== 'system') {
      return;
    }

    const matchMedia = getWindowMatchMedia()?.(SITE_THEME_QUERY);
    if (!matchMedia) {
      return;
    }

    const handleChange = () => {
      syncSystemTheme();
    };

    if (typeof matchMedia.addEventListener === 'function') {
      matchMedia.addEventListener('change', handleChange);
      return () => {
        matchMedia.removeEventListener('change', handleChange);
      };
    }

    matchMedia.addListener(handleChange);
    return () => {
      matchMedia.removeListener(handleChange);
    };
  }, [preference]);

  return {
    preference,
    resolvedTheme,
    setThemePreference,
    toggleThemePreference,
  };
}
