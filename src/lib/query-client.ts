import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 数据在 1 分钟内视为新鲜，不会重新请求
      staleTime: 1000 * 60,
      // 失败时最多重试 2 次
      retry: 2,
      // 窗口重新聚焦时重新请求
      refetchOnWindowFocus: true,
    },
    mutations: {
      retry: 1,
    },
  },
});
