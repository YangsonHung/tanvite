import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { isMockServiceWorkerEnabled } from './lib/api/config';
import { I18nProvider } from './lib/i18n';
import { queryClient } from './lib/query-client';
import { routeTree } from './routeTree.gen';
import './index.css';

const routerBasepath = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

// 创建路由实例，注入 QueryClient 供路由 loader 使用
const router = createRouter({
  basepath: routerBasepath,
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

// 为 TypeScript 注册路由类型
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Root element not found');

if (import.meta.env.DEV && isMockServiceWorkerEnabled) {
  const { startMockServiceWorker } = await import('./mocks/browser');
  await startMockServiceWorker();
}

createRoot(rootElement).render(
  <StrictMode>
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </I18nProvider>
  </StrictMode>
);
