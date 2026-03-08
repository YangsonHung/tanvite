import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight, Braces, FileCode2, Rocket } from 'lucide-react';
import { useI18n } from '../lib/i18n';

export const Route = createFileRoute('/')({
  component: StarterHomePage,
});

function StarterHomePage() {
  const { locale, setLocale, t } = useI18n();

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16 sm:px-10">
      <div className="rounded-3xl border bg-card p-8 shadow-sm sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary-foreground">
            {t('starter.badge')}
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border bg-background p-1 text-sm">
            <span className="px-2 text-muted-foreground">{t('common.languageLabel')}</span>
            <button
              className={`rounded-full px-3 py-1.5 font-medium transition-colors ${
                locale === 'en'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setLocale('en')}
              type="button"
            >
              {t('common.english')}
            </button>
            <button
              className={`rounded-full px-3 py-1.5 font-medium transition-colors ${
                locale === 'zh-CN'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setLocale('zh-CN')}
              type="button"
            >
              {t('common.chinese')}
            </button>
          </div>
        </div>
        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl">
          {t('starter.title')}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
          {t('starter.body')}
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <section className="rounded-2xl border bg-background p-5">
            <Rocket className="h-5 w-5 text-primary" />
            <h2 className="mt-4 text-lg font-semibold text-foreground">
              {t('starter.runtimeTitle')}
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {t('starter.runtimeBody')}
            </p>
          </section>
          <section className="rounded-2xl border bg-background p-5">
            <Braces className="h-5 w-5 text-primary" />
            <h2 className="mt-4 text-lg font-semibold text-foreground">
              {t('starter.contractTitle')}
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {t('starter.contractBody')}
            </p>
          </section>
          <section className="rounded-2xl border bg-background p-5">
            <FileCode2 className="h-5 w-5 text-primary" />
            <h2 className="mt-4 text-lg font-semibold text-foreground">
              {t('starter.showcaseTitle')}
            </h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {t('starter.showcaseBody')}
            </p>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            href="https://yangsonhung.github.io/tanvite"
            rel="noreferrer"
            target="_blank"
          >
            <span>{t('starter.openShowcase')}</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold text-foreground"
            href="https://github.com/YangsonHung/tanvite"
            rel="noreferrer"
            target="_blank"
          >
            <span>{t('starter.openRepository')}</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <pre className="mt-10 overflow-x-auto rounded-2xl border bg-muted p-5 text-sm leading-7 text-foreground/88">
          <code>{`pnpm install
pnpm dev
pnpm openapi:check
pnpm openapi:generate
pnpm test:run`}</code>
        </pre>
      </div>
    </main>
  );
}
