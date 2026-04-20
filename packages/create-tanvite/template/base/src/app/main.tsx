import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { isMockServiceWorkerEnabled } from '@/shared/api/config';
import './styles/index.css';
import { AppProviders } from './providers/app-providers';
import { router } from './router';

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Root element not found');

if (import.meta.env.DEV && isMockServiceWorkerEnabled) {
  const { startMockServiceWorker } = await import('@/shared/api/mock/browser');
  await startMockServiceWorker();
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>
);
