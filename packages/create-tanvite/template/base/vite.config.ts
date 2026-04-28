import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isPagesBuild = mode === 'pages';
  const env = loadEnv(mode, process.cwd(), '');
  const apiProxyTarget =
    env.VITE_API_PROXY_TARGET || env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

  return {
    root: __dirname,
    base: isPagesBuild ? '__PAGES_BASE_PATH__' : '/',
    cacheDir: path.resolve(__dirname, 'node_modules/.vite'),
    plugins: [tanstackRouter({ routesDirectory: './src/app/routes' }), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // 开发服务器配置
    server: {
      host: '0.0.0.0',
      port: 4319,
      strictPort: true,
      open: false,
      proxy: {
        '/api': {
          target: apiProxyTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    preview: {
      port: 4419,
      strictPort: true,
    },
    // 构建配置
    build: {
      outDir: path.resolve(__dirname, isPagesBuild ? 'dist-pages' : 'dist'),
      emptyOutDir: true,
      sourcemap: true,
      // 分包策略
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('@tanstack/react-query')) {
              return 'query';
            }

            if (id.includes('@tanstack/react-router')) {
              return 'router';
            }

            if (id.includes('node_modules')) {
              return 'vendor';
            }

            return undefined;
          },
        },
      },
    },
  };
});
