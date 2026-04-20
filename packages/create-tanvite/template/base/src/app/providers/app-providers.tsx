import { QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { queryClient } from '@/shared/api/query-client';
import { I18nProvider } from '@/shared/i18n';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </I18nProvider>
  );
}
