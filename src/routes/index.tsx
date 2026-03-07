import type { SVGProps } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const starterStats = [
  ["01", "React 19 + TypeScript", "Current React APIs with a strict TS baseline."],
  ["02", "Router + Query + OpenAPI", "File routes, server-state hooks, and API generation prepared together."],
  ["03", "Testable by default", "Vitest, Playwright, and mock workflows are already part of the flow."],
];

const toolchainItems = [
  ["Routing", "TanStack Router", "File-based routes with generated route tree support."],
  ["Data", "TanStack Query + OpenAPI", "Shared query defaults plus generated API hooks, clients, and mocks."],
  ["Styling", "Tailwind CSS", "Utility-first styling with theme variables and shadcn/ui compatibility."],
  ["Quality", "Biome + commitlint", "Linting, formatting, and commit rules are part of the repo baseline."],
  ["Testing", "Vitest + Playwright + MSW", "Unit, E2E, and contract-driven mock workflows are already scripted."],
];

const workflowItems = [
  [
    "Bootstrap",
    "Install dependencies, generate the route tree, and start the Vite dev server with one predictable path.",
  ],
  [
    "Build features",
    "Add routes under src/routes, regenerate API clients from OpenAPI, and keep feature code on top of typed hooks.",
  ],
  [
    "Verify and ship",
    "Run Biome, unit tests, Playwright, and mock flows before production builds so starter quality stays enforceable.",
  ],
];

const commandItems = [
  ["Install", "pnpm install"],
  ["Develop", "pnpm dev"],
  ["OpenAPI", "pnpm openapi:generate"],
  ["Generate routes", "pnpm routes:generate"],
  ["Test once", "pnpm test:run"],
  ["Build", "pnpm build"],
  ["E2E", "pnpm test:e2e"],
];

const codePreview = `src/
├── routes/
│   ├── __root.tsx
│   └── index.tsx
├── lib/
│   ├── api/
│   ├── query-client.ts
│   └── utils.ts
├── mocks/
│   └── browser.ts
└── routeTree.gen.ts

pnpm openapi:generate
pnpm routes:generate
pnpm dev`;

function GitHubMark(props: SVGProps<SVGSVGElement>) {
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

function HomePage() {
  return (
    <main className="grain-overlay relative overflow-hidden">
      <div className="hero-ring left-[-8rem] top-16 h-72 w-72" />
      <div className="hero-ring right-[-10rem] top-[-3rem] h-96 w-96" />
      <div className="hero-ring bottom-[-10rem] left-1/2 h-[30rem] w-[30rem] -translate-x-1/2" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-between px-6 py-8 md:px-10 lg:px-12">
        <header className="flex items-center justify-between border-b border-foreground/10 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-foreground/45">
              React 19 x Vite 5
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-[0.08em] text-foreground">
              TanVite
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a
              aria-label="Open GitHub repository"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-white/60 text-foreground/75 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/80 hover:text-foreground"
              href="https://github.com/YangsonHung/TanVite"
              rel="noreferrer"
              target="_blank"
            >
              <GitHubMark className="h-5 w-5" />
            </a>
            <div className="rounded-full border border-foreground/15 bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.28em] text-foreground/65 backdrop-blur">
              Ready to Ship
            </div>
          </div>
        </header>

        <div className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
          <section className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-foreground/10 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-foreground/60 panel-shadow">
              Modern Web Scaffold
            </p>
            <h2 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-foreground md:text-7xl">
              Build sharp React apps with routing, data orchestration, and testing already wired.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/68 md:text-lg">
              TanVite is a focused front-end baseline for teams that want React 19,
              TanStack Router, TanStack Query, Tailwind CSS, Biome, Vitest, and
              Playwright working together without carrying the usual starter clutter.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:-translate-y-0.5 hover:bg-foreground/90"
                href="#toolchain"
              >
                Explore the stack
              </a>
              <Link
                className="rounded-full border border-foreground/15 bg-white/60 px-6 py-3 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:bg-white/80"
                to="/guide"
              >
                Read the guide
              </Link>
              <a
                className="rounded-full border border-foreground/15 bg-white/60 px-6 py-3 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:bg-white/80"
                href="https://tanstack.com/router/latest"
                rel="noreferrer"
                target="_blank"
              >
                TanStack Router
              </a>
            </div>

            <dl className="mt-12 grid gap-4 sm:grid-cols-3">
              {starterStats.map(([index, title, description]) => (
                <div
                  key={title}
                  className="panel-shadow rounded-[1.6rem] border border-foreground/10 bg-white/70 p-5 backdrop-blur"
                >
                  <dt className="text-xs uppercase tracking-[0.35em] text-foreground/40">{index}</dt>
                  <dd className="mt-3 text-lg font-semibold text-foreground">{title}</dd>
                  <p className="mt-2 text-sm leading-6 text-foreground/60">{description}</p>
                </div>
              ))}
            </dl>
          </section>

          <aside
            id="toolchain"
            className="panel-shadow rounded-[2rem] border border-foreground/10 bg-white/70 p-6 backdrop-blur md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-foreground/45">
                  Toolchain
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">
                  Production-minded defaults
                </h3>
              </div>
              <div className="rounded-full bg-secondary px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-foreground/75">
                TanVite
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {toolchainItems.map(([label, title, copy]) => (
                <div
                  key={title}
                  className="rounded-[1.4rem] border border-foreground/10 bg-background/70 p-4 transition hover:border-accent/40"
                >
                  <div className="text-xs uppercase tracking-[0.28em] text-foreground/40">{label}</div>
                  <div className="mt-2 text-lg font-semibold text-foreground">{title}</div>
                  <p className="mt-1 text-sm leading-6 text-foreground/60">{copy}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.6rem] bg-foreground px-5 py-5 text-background">
              <p className="text-xs uppercase tracking-[0.32em] text-background/60">Start here</p>
              <code className="mt-3 block text-sm text-background/85">pnpm install && pnpm dev</code>
            </div>
          </aside>
        </div>

        <section className="grid gap-6 border-t border-foreground/10 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-12">
          <div className="rounded-[2rem] border border-foreground/10 bg-white/65 p-6 backdrop-blur panel-shadow md:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-foreground/45">Workflow</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">
              Starter mechanics without starter chaos
            </h3>
            <div className="mt-8 space-y-6">
              {workflowItems.map(([title, description], index) => (
                <div key={title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-foreground/15 bg-secondary text-sm font-semibold text-foreground">
                    0{index + 1}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{title}</h4>
                    <p className="mt-2 text-sm leading-7 text-foreground/62">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-foreground/10 bg-foreground p-6 text-background panel-shadow md:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-background/55">CLI Quickstart</p>
                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                    Commands you actually need on day one
                  </h3>
                </div>
                <div className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.22em] text-background/70">
                  pnpm
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {commandItems.map(([label, command]) => (
                  <div key={command} className="rounded-[1.3rem] border border-white/10 bg-white/5 p-4">
                    <div className="text-xs uppercase tracking-[0.28em] text-background/50">{label}</div>
                    <code className="mt-3 block text-sm text-background/88">{command}</code>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-foreground/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(247,232,214,0.92))] p-6 panel-shadow md:p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/45">Project Snapshot</p>
              <div className="mt-4 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
                <div>
                  <h3 className="text-3xl font-semibold tracking-[-0.04em] text-foreground">
                    File layout that stays legible as the app grows
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-foreground/62">
                    Routes, shared utilities, and generated artifacts are separated clearly, so
                    adding more screens does not immediately collapse into a generic template mess.
                  </p>
                </div>
                <pre className="overflow-x-auto rounded-[1.4rem] bg-[#123843] p-5 text-sm leading-7 text-[#f7ede1]">
                  <code>{codePreview}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
