import { ArrowLeft, ArrowRight, BookOpenText, Braces, TerminalSquare } from 'lucide-react';
import { GitHubMark, SiteHeaderControls } from './components/site-controls';
import type { ShowcaseMessageKey } from './lib/i18n';
import { useShowcaseI18n } from './lib/i18n';
import type { SiteLanguage } from './lib/site-language';
import { useSiteLanguage } from './lib/site-language';
import { useSiteTheme } from './lib/site-theme';
import { cn } from './lib/utils';

type ShowcasePage = 'home' | 'guide';
type StatItem = [string, string, string];
type ToolchainItem = [string, string, string];
type WorkflowItem = [string, string];
type CommandItem = [string, string];

type HomeCopy = {
  heroBadge: string;
  heroTitle: string;
  heroBody: string;
  primaryCta: string;
  guideCta: string;
  supportCta: string;
  repoLabel: string;
  starterStats: StatItem[];
  toolchainLabel: string;
  toolchainTitle: string;
  toolchainItems: ToolchainItem[];
  startHere: string;
  workflowLabel: string;
  workflowTitle: string;
  workflowItems: WorkflowItem[];
  commandsLabel: string;
  commandsTitle: string;
  commandItems: CommandItem[];
  snapshotLabel: string;
  snapshotTitle: string;
  snapshotBody: string;
  codePreview: string;
};

type GuideSection = {
  title: string;
  points: string[];
};

type GuideCopy = {
  pageLabel: string;
  title: string;
  titleSecondary?: string;
  backToLanding: string;
  overviewLabel: string;
  overviewBody: string;
  sections: GuideSection[];
  commandsLabel: string;
  commandsTitle: string;
  commandCards: [string, string][];
  linksLabel: string;
  linksTitle: string;
  linksBody: string;
  openSite: string;
  openRepository: string;
  reportIssue: string;
};

function readToolchainItems(
  t: (key: ShowcaseMessageKey) => string,
  baseKey: string,
  count: number
) {
  return Array.from({ length: count }, (_, index) => {
    const itemKey = `${baseKey}.item${index + 1}`;

    return [
      t(`${itemKey}.label` as ShowcaseMessageKey),
      t(`${itemKey}.title` as ShowcaseMessageKey),
      t(`${itemKey}.body` as ShowcaseMessageKey),
    ] as ToolchainItem;
  });
}

function readCommandItems(t: (key: ShowcaseMessageKey) => string, baseKey: string, count: number) {
  return Array.from({ length: count }, (_, index) => {
    const itemKey = `${baseKey}.item${index + 1}`;

    return [
      t(`${itemKey}.label` as ShowcaseMessageKey),
      t(`${itemKey}.command` as ShowcaseMessageKey),
    ] as CommandItem;
  });
}

function getHomeCopy(t: (key: ShowcaseMessageKey) => string): HomeCopy {
  return {
    heroBadge: t('home.heroBadge'),
    heroTitle: t('home.heroTitle'),
    heroBody: t('home.heroBody'),
    primaryCta: t('home.primaryCta'),
    guideCta: t('home.guideCta'),
    supportCta: t('home.supportCta'),
    repoLabel: t('controls.repoLabel'),
    starterStats: [
      [t('home.stats.item1.index'), t('home.stats.item1.title'), t('home.stats.item1.body')],
      [t('home.stats.item2.index'), t('home.stats.item2.title'), t('home.stats.item2.body')],
      [t('home.stats.item3.index'), t('home.stats.item3.title'), t('home.stats.item3.body')],
    ],
    toolchainLabel: t('home.toolchainLabel'),
    toolchainTitle: t('home.toolchainTitle'),
    toolchainItems: readToolchainItems(t, 'home.toolchain', 5),
    startHere: t('home.startHere'),
    workflowLabel: t('home.workflowLabel'),
    workflowTitle: t('home.workflowTitle'),
    workflowItems: [
      [t('home.workflow.item1.title'), t('home.workflow.item1.body')],
      [t('home.workflow.item2.title'), t('home.workflow.item2.body')],
      [t('home.workflow.item3.title'), t('home.workflow.item3.body')],
    ],
    commandsLabel: t('home.commandsLabel'),
    commandsTitle: t('home.commandsTitle'),
    commandItems: readCommandItems(t, 'home.commands', 8),
    snapshotLabel: t('home.snapshotLabel'),
    snapshotTitle: t('home.snapshotTitle'),
    snapshotBody: t('home.snapshotBody'),
    codePreview: t('home.codePreview'),
  };
}

function getGuideCopy(language: SiteLanguage, t: (key: ShowcaseMessageKey) => string): GuideCopy {
  return {
    pageLabel: t('guide.pageLabel'),
    title: t('guide.title'),
    titleSecondary: language === 'zh-CN' ? t('guide.titleSecondary') : undefined,
    backToLanding: t('guide.backToLanding'),
    overviewLabel: t('guide.overviewLabel'),
    overviewBody: t('guide.overviewBody'),
    sections: [
      {
        title: t('guide.sections.gettingStarted.title'),
        points: [
          t('guide.sections.gettingStarted.point1'),
          t('guide.sections.gettingStarted.point2'),
          t('guide.sections.gettingStarted.point3'),
          t('guide.sections.gettingStarted.point4'),
          t('guide.sections.gettingStarted.point5'),
          t('guide.sections.gettingStarted.point6'),
        ],
      },
      {
        title: t('guide.sections.stack.title'),
        points: [
          t('guide.sections.stack.point1'),
          t('guide.sections.stack.point2'),
          t('guide.sections.stack.point3'),
        ],
      },
      {
        title: t('guide.sections.workflow.title'),
        points: [
          t('guide.sections.workflow.point1'),
          t('guide.sections.workflow.point2'),
          t('guide.sections.workflow.point3'),
        ],
      },
    ],
    commandsLabel: t('guide.commandsLabel'),
    commandsTitle: t('guide.commandsTitle'),
    commandCards: readCommandItems(t, 'guide.commands', 6),
    linksLabel: t('guide.linksLabel'),
    linksTitle: t('guide.linksTitle'),
    linksBody: t('guide.linksBody'),
    openSite: t('guide.openSite'),
    openRepository: t('guide.openRepository'),
    reportIssue: t('guide.reportIssue'),
  };
}

function getBasePath() {
  return import.meta.env.BASE_URL.replace(/\/$/, '');
}

function getShowcaseHref(path: '/' | '/guide') {
  const basePath = getBasePath();
  if (path === '/') {
    return basePath || '/';
  }

  return `${basePath}${path}`;
}

function getCurrentPage(): ShowcasePage {
  if (typeof window === 'undefined') {
    return 'home';
  }

  const basePath = getBasePath();
  const pathname = window.location.pathname;
  const normalizedPath = pathname.startsWith(basePath)
    ? pathname.slice(basePath.length) || '/'
    : pathname;

  return normalizedPath === '/guide' ? 'guide' : 'home';
}

export function App() {
  const page = getCurrentPage();
  const languageState = useSiteLanguage();
  const themeState = useSiteTheme();
  const language = languageState.language;

  if (page === 'guide') {
    return (
      <GuideShell
        language={language}
        setLanguage={languageState.setLanguage}
        resolvedTheme={themeState.resolvedTheme}
        toggleThemePreference={themeState.toggleThemePreference}
      />
    );
  }

  return (
    <HomeShell
      language={language}
      setLanguage={languageState.setLanguage}
      resolvedTheme={themeState.resolvedTheme}
      toggleThemePreference={themeState.toggleThemePreference}
    />
  );
}

function HomeShell({
  language,
  setLanguage,
  resolvedTheme,
  toggleThemePreference,
}: {
  language: SiteLanguage;
  setLanguage: (nextLanguage: SiteLanguage) => void;
  resolvedTheme: 'dark' | 'light';
  toggleThemePreference: () => void;
}) {
  const { t } = useShowcaseI18n();
  const copy = getHomeCopy(t);
  const workflowPanelClass = resolvedTheme === 'dark' ? 'glass-panel-strong' : 'glass-panel';
  const workflowEyebrowClass = resolvedTheme === 'dark' ? 'text-white/55' : 'text-foreground/48';
  const workflowTitleClass = resolvedTheme === 'dark' ? 'text-white' : 'text-foreground';
  const workflowCardClass =
    resolvedTheme === 'dark'
      ? 'border-white/10 bg-[hsl(223_24%_14%)]'
      : 'border-border/70 bg-[hsl(var(--surface-muted)/0.92)]';
  const workflowStepClass =
    resolvedTheme === 'dark'
      ? 'border-white/15 bg-white/5 text-white'
      : 'border-border/70 bg-[hsl(var(--surface)/0.92)] text-foreground';
  const workflowTextClass = resolvedTheme === 'dark' ? 'text-white' : 'text-foreground';
  const workflowBodyClass = resolvedTheme === 'dark' ? 'text-white/72' : 'text-foreground/68';
  const commandPanelClass =
    resolvedTheme === 'dark' ? 'glass-panel-strong text-white' : 'glass-panel text-foreground';
  const commandEyebrowClass = resolvedTheme === 'dark' ? 'text-white/55' : 'text-foreground/48';
  const commandTitleClass = resolvedTheme === 'dark' ? 'text-white' : 'text-foreground';
  const commandBadgeClass =
    resolvedTheme === 'dark'
      ? 'border-white/12 text-white/70'
      : 'border-border/70 bg-[hsl(var(--surface-muted)/0.92)] text-foreground/70';
  const commandCardClass =
    resolvedTheme === 'dark'
      ? 'border-white/10 bg-[hsl(223_24%_14%)]'
      : 'border-border/70 bg-[hsl(var(--surface-muted)/0.92)]';
  const commandLabelClass = resolvedTheme === 'dark' ? 'text-white/45' : 'text-foreground/45';
  const commandTextClass = resolvedTheme === 'dark' ? 'text-white/88' : 'text-foreground/84';
  const snapshotCodeClass =
    resolvedTheme === 'dark'
      ? 'code-panel text-white/90'
      : 'border border-border/70 bg-[hsl(var(--surface-muted)/0.9)] text-foreground/84 shadow-[0_18px_34px_hsl(var(--shadow-color)/0.08)]';

  return (
    <main className="site-shell grain-overlay relative min-h-screen overflow-hidden px-4 pb-12 pt-[4.75rem] sm:px-6 sm:pt-[5.25rem] lg:px-8">
      <div className="hero-orb left-[-5rem] top-20 h-64 w-64 sm:h-80 sm:w-80" />
      <div className="hero-orb right-[-8rem] top-12 h-80 w-80 sm:h-[24rem] sm:w-[24rem]" />
      <div className="hero-ring bottom-[-8rem] left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 sm:h-[28rem] sm:w-[28rem]" />
      <header className="glass-nav fixed inset-x-0 top-0 z-30 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="eyebrow">React 19 x Vite 5</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
              <span className="text-lg font-semibold tracking-[0.16em] text-foreground sm:text-[1.35rem]">
                TanVite
              </span>
              <span className="status-pill hidden min-h-0 w-[14rem] shrink-0 justify-center text-center sm:inline-flex">
                {copy.supportCta}
              </span>
            </div>
          </div>
          <SiteHeaderControls
            language={language}
            resolvedTheme={resolvedTheme}
            setLanguage={setLanguage}
            toggleThemePreference={toggleThemePreference}
          >
            <a
              aria-label={copy.repoLabel}
              className="site-control"
              href="https://github.com/YangsonHung/tanvite"
              rel="noreferrer"
              target="_blank"
            >
              <span className="site-control-icon">
                <GitHubMark className="h-4 w-4" />
              </span>
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </SiteHeaderControls>
        </div>
      </header>
      <div className="relative mx-auto max-w-7xl">
        <section className="relative flex flex-col items-center pb-16 pt-16 text-center sm:pt-20 lg:pb-20">
          <div className="max-w-5xl">
            <p className="mx-auto inline-flex rounded-full border border-border/70 bg-[hsl(var(--surface-muted)/0.78)] px-4 py-2 text-xs font-medium uppercase tracking-[0.28em] text-foreground/70 panel-shadow">
              {copy.heroBadge}
            </p>
            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.08em] text-foreground sm:text-7xl lg:text-[6rem]">
              TanVite
            </h1>
            <p
              className={cn(
                'mx-auto mt-5 max-w-4xl text-balance text-2xl font-semibold text-foreground sm:text-4xl lg:text-[3.6rem]',
                language === 'zh-CN'
                  ? 'leading-[1.3] tracking-[-0.04em] sm:leading-[1.22] lg:leading-[1.16]'
                  : 'leading-[1.18] tracking-[-0.05em] sm:leading-[1.12] lg:leading-[1.08]'
              )}
            >
              {copy.heroTitle}
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-foreground/72 sm:text-lg">
              {copy.heroBody}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a className="site-button-primary gap-2" href="#foundation">
                <span>{copy.primaryCta}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a className="site-button-secondary gap-2" href={getShowcaseHref('/guide')}>
                <BookOpenText className="h-4 w-4" />
                <span>{copy.guideCta}</span>
              </a>
              <a className="site-button-secondary gap-2" href="#workflow">
                <Braces className="h-4 w-4" />
                <span>{copy.supportCta}</span>
              </a>
            </div>
            <div className="command-bar mx-auto mt-8 inline-flex max-w-full flex-wrap items-center justify-center gap-4 rounded-[1.75rem] px-5 py-4 text-left">
              <div className="inline-flex items-center gap-3">
                <span className="site-control-icon">
                  <TerminalSquare className="h-4 w-4" />
                </span>
                <div>
                  <div className="eyebrow">{copy.startHere}</div>
                  <code className="mt-2 block text-sm font-medium text-foreground/86 sm:text-base">
                    npm create tanvite@latest
                  </code>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-3">
            {copy.toolchainItems.map(([, title]) => (
              <span key={title} className="stack-chip">
                {title}
              </span>
            ))}
          </div>
          <dl className="mt-14 grid w-full max-w-6xl gap-4 text-left md:grid-cols-3">
            {copy.starterStats.map(([index, title, description]) => (
              <div key={title} className="soft-card rounded-[1.8rem] p-6">
                <dt className="eyebrow text-foreground/50">{index}</dt>
                <dd className="mt-4 text-xl font-semibold tracking-[-0.04em] text-foreground">
                  {title}
                </dd>
                <p className="mt-3 text-sm leading-7 text-foreground/68">{description}</p>
              </div>
            ))}
          </dl>
        </section>
        <section
          className="section-divider grid gap-6 py-6 lg:grid-cols-[1.05fr_0.95fr]"
          id="foundation"
        >
          <article className="glass-panel rounded-[2rem] p-6 md:p-8">
            <p className="eyebrow">{copy.toolchainLabel}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-foreground md:text-4xl">
              {copy.toolchainTitle}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {copy.toolchainItems.map(([label, title, body], index) => (
                <div
                  key={title}
                  className={cn(
                    'soft-card rounded-[1.6rem] p-5',
                    index === copy.toolchainItems.length - 1 && 'sm:col-span-2'
                  )}
                >
                  <div className="eyebrow">{label}</div>
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-foreground/68">{body}</p>
                </div>
              ))}
            </div>
          </article>
          <article className={cn('rounded-[2rem] p-6 md:p-8', workflowPanelClass)} id="workflow">
            <p className={cn('eyebrow', workflowEyebrowClass)}>{copy.workflowLabel}</p>
            <h2
              className={cn(
                'mt-4 text-3xl font-semibold tracking-[-0.05em] md:text-4xl',
                workflowTitleClass
              )}
            >
              {copy.workflowTitle}
            </h2>
            <div className="mt-8 space-y-5">
              {copy.workflowItems.map(([title, description], index) => (
                <div key={title} className={cn('rounded-[1.6rem] border p-5', workflowCardClass)}>
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-semibold',
                        workflowStepClass
                      )}
                    >
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className={cn('text-lg font-semibold', workflowTextClass)}>{title}</h3>
                      <p className={cn('mt-2 text-sm leading-7', workflowBodyClass)}>
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
        <section className="section-divider grid gap-6 py-6 lg:grid-cols-[0.96fr_1.04fr]">
          <article className={cn('rounded-[2rem] p-6 md:p-8', commandPanelClass)}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className={cn('eyebrow', commandEyebrowClass)}>{copy.commandsLabel}</p>
                <h2
                  className={cn(
                    'mt-4 text-3xl font-semibold tracking-[-0.05em] md:text-4xl',
                    commandTitleClass
                  )}
                >
                  {copy.commandsTitle}
                </h2>
              </div>
              <div
                className={cn(
                  'rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]',
                  commandBadgeClass
                )}
              >
                pnpm
              </div>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {copy.commandItems.map(([label, command]) => (
                <div key={command} className={cn('rounded-[1.4rem] border p-4', commandCardClass)}>
                  <div className={cn('eyebrow', commandLabelClass)}>{label}</div>
                  <code className={cn('mt-3 block text-sm font-medium', commandTextClass)}>
                    {command}
                  </code>
                </div>
              ))}
            </div>
          </article>
          <article className="glass-panel rounded-[2rem] p-6 md:p-8">
            <p className="eyebrow">{copy.snapshotLabel}</p>
            <div className="mt-4 grid gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.05em] text-foreground md:text-4xl">
                  {copy.snapshotTitle}
                </h2>
                <p className="mt-4 text-sm leading-7 text-foreground/68">{copy.snapshotBody}</p>
              </div>
              <pre
                className={cn(
                  'overflow-x-auto rounded-[1.6rem] p-5 text-sm leading-7',
                  snapshotCodeClass
                )}
              >
                <code>{copy.codePreview}</code>
              </pre>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

function GuideShell({
  language,
  setLanguage,
  resolvedTheme,
  toggleThemePreference,
}: {
  language: SiteLanguage;
  setLanguage: (nextLanguage: SiteLanguage) => void;
  resolvedTheme: 'dark' | 'light';
  toggleThemePreference: () => void;
}) {
  const { t } = useShowcaseI18n();
  const copy = getGuideCopy(language, t);
  const commandPanelClass =
    resolvedTheme === 'dark' ? 'glass-panel-strong text-white' : 'glass-panel text-foreground';
  const commandEyebrowClass = resolvedTheme === 'dark' ? 'text-white/55' : 'text-foreground/48';
  const commandTitleClass = resolvedTheme === 'dark' ? 'text-white' : 'text-foreground';
  const commandCardClass =
    resolvedTheme === 'dark'
      ? 'border-white/10 bg-[hsl(223_24%_14%)]'
      : 'border-border/70 bg-[hsl(var(--surface-muted)/0.92)]';
  const commandLabelClass = resolvedTheme === 'dark' ? 'text-white/45' : 'text-foreground/45';
  const commandTextClass = resolvedTheme === 'dark' ? 'text-white/88' : 'text-foreground/84';

  return (
    <main className="site-shell grain-overlay relative min-h-screen overflow-hidden px-4 pb-12 pt-[4.75rem] sm:px-6 sm:pt-[5.25rem] lg:px-8">
      <div className="hero-orb left-[-4rem] top-16 h-64 w-64 sm:h-80 sm:w-80" />
      <div className="hero-orb right-[-7rem] top-10 h-72 w-72 sm:h-[22rem] sm:w-[22rem]" />
      <div className="hero-ring right-[-6rem] top-32 h-64 w-64 sm:h-80 sm:w-80" />
      <header className="glass-nav fixed inset-x-0 top-0 z-30 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="eyebrow">{copy.pageLabel}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
              <span className="text-lg font-semibold tracking-[0.16em] text-foreground sm:text-[1.35rem]">
                TanVite
              </span>
            </div>
          </div>
          <SiteHeaderControls
            language={language}
            resolvedTheme={resolvedTheme}
            setLanguage={setLanguage}
            toggleThemePreference={toggleThemePreference}
          >
            <a
              className="site-button-secondary min-h-9 min-w-[10rem] justify-center gap-2 px-4 text-[13px]"
              href={getShowcaseHref('/')}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{copy.backToLanding}</span>
            </a>
          </SiteHeaderControls>
        </div>
      </header>
      <div className="relative mx-auto max-w-6xl">
        <section className="mx-auto max-w-4xl pt-14 text-center sm:pt-16">
          <p className="eyebrow">{copy.overviewLabel}</p>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.06em] text-foreground sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
          {copy.titleSecondary ? (
            <p className="mt-3 text-balance text-xl font-medium tracking-[-0.04em] text-foreground/78 sm:text-2xl">
              {copy.titleSecondary}
            </p>
          ) : null}
          <p className="mt-6 text-base leading-8 text-foreground/72 sm:text-lg">
            {copy.overviewBody}
          </p>
        </section>
        <section className="mt-12 grid gap-6 lg:grid-cols-[1.06fr_0.94fr]">
          <div className="glass-panel rounded-[2rem] p-6 md:p-8">
            <div className="space-y-4">
              {copy.sections.map((section) => (
                <article key={section.title} className="soft-card rounded-[1.6rem] p-5 md:p-6">
                  <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-foreground/70">
                    {section.points.map((point, index) => (
                      <li key={`${section.title}-${index}`}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
          <div className="grid gap-6">
            <section className={cn('rounded-[2rem] p-6 md:p-8', commandPanelClass)}>
              <p className={cn('eyebrow', commandEyebrowClass)}>{copy.commandsLabel}</p>
              <h2
                className={cn('mt-4 text-3xl font-semibold tracking-[-0.05em]', commandTitleClass)}
              >
                {copy.commandsTitle}
              </h2>
              <div className="mt-8 grid gap-3">
                {copy.commandCards.map(([label, command]) => (
                  <div
                    key={command}
                    className={cn('rounded-[1.4rem] border p-4', commandCardClass)}
                  >
                    <div className={cn('eyebrow', commandLabelClass)}>{label}</div>
                    <code className={cn('mt-3 block text-sm font-medium', commandTextClass)}>
                      {command}
                    </code>
                  </div>
                ))}
              </div>
            </section>
            <section className="glass-panel rounded-[2rem] p-6 md:p-8">
              <p className="eyebrow">{copy.linksLabel}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-foreground">
                {copy.linksTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-foreground/68">{copy.linksBody}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  className="site-button-secondary px-5"
                  href="https://yangsonhung.github.io/tanvite"
                  rel="noreferrer"
                  target="_blank"
                >
                  {copy.openSite}
                </a>
                <a
                  className="site-button-secondary px-5"
                  href="https://github.com/YangsonHung/tanvite"
                  rel="noreferrer"
                  target="_blank"
                >
                  {copy.openRepository}
                </a>
                <a
                  className="site-button-secondary px-5"
                  href="https://github.com/YangsonHung/tanvite/issues"
                  rel="noreferrer"
                  target="_blank"
                >
                  {copy.reportIssue}
                </a>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
