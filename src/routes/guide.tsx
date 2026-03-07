import { createFileRoute, Link } from "@tanstack/react-router";

const guideSections = [
  {
    title: "Getting started",
    points: [
      "Install dependencies with `pnpm install`.",
      "Copy `.env.example` to `.env.local` and replace `OPENAPI_SCHEMA_URL` with your backend Swagger/OpenAPI URL.",
      "Validate the contract with `pnpm openapi:check` and generate clients with `pnpm openapi:generate`.",
      "Start the local development environment with `pnpm dev`.",
      "Use `pnpm build` for the standard production bundle.",
      "Use `pnpm build:pages` when preparing the public showcase site.",
    ],
  },
  {
    title: "Included stack",
    points: [
      "React 19 + TypeScript + Vite 5",
      "TanStack Router file-based routing and generated route tree support",
      "TanStack Query, Orval, MSW, Prism, Biome, Vitest, and Playwright",
    ],
  },
  {
    title: "API workflow",
    points: [
      "Point the starter at a remote Swagger/OpenAPI document and regenerate client code on demand",
      "Use generated React Query hooks for app code, MSW for in-app mocks, and Prism for a standalone mock server",
      "Keep product code on top of the existing routing, styling, testing, and CI baseline instead of hand-writing protocol code",
    ],
  },
];

const commandCards = [
  ["Install", "pnpm install"],
  ["Check schema", "pnpm openapi:check"],
  ["Generate API", "pnpm openapi:generate"],
  ["Mock server", "pnpm openapi:mock"],
  ["Develop", "pnpm dev"],
  ["Mock in app", "pnpm dev:mock"],
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
              Use this page as the fast path into TanVite. It gives new visitors enough
              structure to evaluate the starter, understand what ships in the box, wire a
              backend contract into it, and jump into the repository without turning the
              showcase into a heavy documentation site.
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
                Starter commands
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
              <p className="text-xs uppercase tracking-[0.32em] text-foreground/45">Project links</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground">
                Open the project, the code, or the issue tracker
              </h2>
              <p className="mt-4 text-sm leading-7 text-foreground/62">
                Start with the public site for the polished overview, then move to the repository
                when you want source code, template usage, contribution details, or issue tracking.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  className="rounded-full border border-foreground/15 bg-white/70 px-4 py-2 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:bg-white/90"
                  href="https://yangsonhung.github.io/TanVite"
                  rel="noreferrer"
                  target="_blank"
                >
                  Open site
                </a>
                <a
                  className="rounded-full border border-foreground/15 bg-white/70 px-4 py-2 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:bg-white/90"
                  href="https://github.com/YangsonHung/TanVite"
                  rel="noreferrer"
                  target="_blank"
                >
                  Open repository
                </a>
                <a
                  className="rounded-full border border-foreground/15 bg-white/70 px-4 py-2 text-sm font-medium text-foreground transition hover:-translate-y-0.5 hover:bg-white/90"
                  href="https://github.com/YangsonHung/TanVite/issues"
                  rel="noreferrer"
                  target="_blank"
                >
                  Report an issue
                </a>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
