import { createRouter } from '@tanstack/react-router';
import { queryClient } from '@/shared/api/query-client';
import { routeTree } from '../routeTree.gen';

const routerBasepath = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export const router = createRouter({
  basepath: routerBasepath,
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
