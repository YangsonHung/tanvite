import { MoonStar, SunMedium } from 'lucide-react';
import type { ReactNode, SVGProps } from 'react';
import { useShowcaseI18n } from '../lib/i18n';
import type { SiteLanguage } from '../lib/site-language';
import type { ResolvedSiteTheme } from '../lib/site-theme';
import { cn } from '../lib/utils';

function ThemeIcon({
  resolvedTheme,
  className,
}: {
  resolvedTheme: ResolvedSiteTheme;
  className?: string;
}) {
  if (resolvedTheme === 'dark') {
    return <SunMedium className={className} />;
  }

  return <MoonStar className={className} />;
}

export function GitHubMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 0.5C5.37 0.5 0 5.87 0 12.5C0 17.8 3.44 22.29 8.21 23.88C8.81 23.99 9.03 23.62 9.03 23.3C9.03 23.01 9.02 22.05 9.02 20.97C5.67 21.7 4.97 19.35 4.97 19.35C4.42 17.95 3.63 17.58 3.63 17.58C2.55 16.84 3.71 16.86 3.71 16.86C4.9 16.94 5.52 18.08 5.52 18.08C6.58 19.89 8.31 19.37 8.98 19.06C9.09 18.29 9.39 17.76 9.72 17.46C7.05 17.16 4.24 16.12 4.24 11.49C4.24 10.17 4.71 9.09 5.48 8.24C5.36 7.94 4.94 6.72 5.6 5.07C5.6 5.07 6.61 4.75 8.99 6.36C9.95 6.09 10.98 5.95 12 5.95C13.02 5.95 14.05 6.09 15.01 6.36C17.39 4.75 18.4 5.07 18.4 5.07C19.06 6.72 18.64 7.94 18.52 8.24C19.29 9.09 19.76 10.17 19.76 11.49C19.76 16.13 16.95 17.16 14.27 17.46C14.69 17.82 15.08 18.54 15.08 19.64C15.08 21.22 15.06 22.88 15.06 23.3C15.06 23.62 15.28 24 15.89 23.88C20.66 22.29 24.1 17.8 24.1 12.5C24.1 5.87 18.73 0.5 12.1 0.5H12Z" />
    </svg>
  );
}

export function LanguageToggle({
  language,
  setLanguage,
}: {
  language: SiteLanguage;
  setLanguage: (nextLanguage: SiteLanguage) => void;
}) {
  const { t } = useShowcaseI18n();
  const nextLanguage = language === 'en' ? 'zh-CN' : 'en';
  const label = nextLanguage === 'en' ? t('common.english') : t('common.chinese');
  const ariaLabel =
    nextLanguage === 'en' ? t('controls.switchToEnglish') : t('controls.switchToChinese');

  return (
    <button
      aria-label={ariaLabel}
      className="site-control h-9 w-[4.5rem] justify-center px-3 font-semibold tracking-[0.08em]"
      onClick={() => setLanguage(nextLanguage)}
      type="button"
    >
      <span>{label}</span>
    </button>
  );
}

export function ThemeToggleButton({
  language: _language,
  resolvedTheme,
  toggleThemePreference,
}: {
  language: SiteLanguage;
  resolvedTheme: ResolvedSiteTheme;
  toggleThemePreference: () => void;
}) {
  const { t } = useShowcaseI18n();
  const ariaLabel =
    resolvedTheme === 'dark' ? t('controls.switchToLightTheme') : t('controls.switchToDarkTheme');

  return (
    <button
      aria-label={ariaLabel}
      className="site-control h-9 w-9 justify-center px-0"
      onClick={toggleThemePreference}
      title={ariaLabel}
      type="button"
    >
      <ThemeIcon className="h-[0.95rem] w-[0.95rem]" resolvedTheme={resolvedTheme} />
    </button>
  );
}

export function SiteHeaderControls({
  language,
  setLanguage,
  resolvedTheme,
  toggleThemePreference,
  children,
  className,
}: {
  language: SiteLanguage;
  setLanguage: (nextLanguage: SiteLanguage) => void;
  resolvedTheme: ResolvedSiteTheme;
  toggleThemePreference: () => void;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-wrap items-center justify-end gap-2.5', className)}>
      <ThemeToggleButton
        language={language}
        resolvedTheme={resolvedTheme}
        toggleThemePreference={toggleThemePreference}
      />
      <LanguageToggle language={language} setLanguage={setLanguage} />
      {children}
    </div>
  );
}
