import { createFileRoute, Link } from "@tanstack/react-router";

const guideSections = [
  {
    title: "Quick start",
    points: [
      "`pnpm install` 安装依赖",
      "`pnpm dev` 启动本地开发环境",
      "`pnpm build` 生成常规生产部署产物到 `dist/`",
      "`pnpm build:pages` 生成 GitHub Pages 可发布产物到 `dist-pages/`",
    ],
  },
  {
    title: "What is included",
    points: [
      "React 19 + TypeScript + Vite 5",
      "TanStack Router 文件路由与生成的 route tree",
      "TanStack Query、Biome、Vitest、Playwright",
    ],
  },
  {
    title: "GitHub Pages",
    points: [
      "Vite 构建时自动使用 `/TanVite/` 作为 base",
      "构建结果输出到 `dist-pages/`，由 GitHub Actions 官方 Pages 工作流自动部署",
      "自动生成 `404.html` 和 `.nojekyll`，为 SPA 路由提供静态托管兜底",
    ],
  },
];

const commandCards = [
  ["Install", "pnpm install"],
  ["Develop", "pnpm dev"],
  ["Build Pages", "pnpm build:pages"],
  ["Preview Pages", "pnpm preview:pages"],
];

export const Route = createFileRoute("/guide")({
  component: GuidePage,
});

function GuidePage() {
  return (
    <main className="grain-overlay relative min-h-screen overflow-hidden px-6 py-8 md:px-10 lg:px-12">
      <div className="hero-ring left-[-8rem] top-16 h-72 w-72" />
      <div className="hero-ring right-[-9rem] top-12 h-80 w-80" />

      <div className="relative mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-foreground/10 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-foreground/45">TanVite Guide</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground md:text-6xl">
              Lightweight docs for the public project page
            </h1>
          </div>
          <Link
            className="rounded-full border border-foreground/15 bg-white/65 px-5 py-3 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:bg-white/85"
            to="/"
          >
            Back to landing
          </Link>
        </header>

        <section className="grid gap-6 py-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-foreground/10 bg-white/70 p-6 backdrop-blur panel-shadow md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-foreground/45">Overview</p>
            <p className="mt-4 text-lg leading-8 text-foreground/68">
              这个页面不是重型文档站，而是和落地页配套的轻文档层。它负责把使用方式、
              构建产物、以及 GitHub Pages 的部署约定解释清楚，避免访客只看到视觉展示页却不知道怎么用这个项目。
            </p>

            <div className="mt-8 grid gap-4">
              {guideSections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-[1.5rem] border border-foreground/10 bg-background/70 p-5"
                >
                  <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-foreground/62">
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <section className="rounded-[2rem] border border-foreground/10 bg-foreground p-6 text-background panel-shadow md:p-8">
              <p className="text-xs uppercase tracking-[0.32em] text-background/55">Commands</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                Local workflow and Pages preview
              </h2>

              <div className="mt-8 grid gap-3">
                {commandCards.map(([label, command]) => (
                  <div
                    key={command}
                    className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <div className="text-xs uppercase tracking-[0.28em] text-background/50">
                      {label}
                    </div>
                    <code className="mt-2 block text-sm text-background/88">{command}</code>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-foreground/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(247,232,214,0.92))] p-6 panel-shadow md:p-8">
              <p className="text-xs uppercase tracking-[0.32em] text-foreground/45">Publish target</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">
                `https://yangsonhung.github.io/TanVite`
              </h2>
              <p className="mt-4 text-sm leading-7 text-foreground/62">
                GitHub Actions 会直接构建并部署 `dist-pages/` artifact，因此仓库不需要再提交
                `docs/` 构建产物。业务部署与展示站部署现在已经彻底拆开。
              </p>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
