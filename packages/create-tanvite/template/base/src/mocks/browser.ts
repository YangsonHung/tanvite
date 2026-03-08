import type { RequestHandler } from 'msw';
import { setupWorker } from 'msw/browser';

type HandlerModule = {
  handlers?: RequestHandler[];
};

const generatedMockModules = import.meta.glob<HandlerModule>(
  '/src/lib/api/generated/mock-handlers.ts'
);

export async function startMockServiceWorker() {
  const loader = generatedMockModules['/src/lib/api/generated/mock-handlers.ts'];
  const module = loader ? await loader() : undefined;
  const handlers = Array.isArray(module?.handlers) ? module.handlers : [];

  const worker = setupWorker(...handlers);

  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  });
}
