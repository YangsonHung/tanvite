export { apiBaseUrl, isMockServiceWorkerEnabled } from './config';
export { queryClient } from './query-client';

export async function startMockServiceWorker() {
  const { startMockServiceWorker: start } = await import('./mock/browser');
  await start();
}
