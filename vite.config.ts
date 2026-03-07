import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiProxyTarget =
    env.VITE_API_PROXY_TARGET || env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  return {
    base: mode === "pages" ? "/TanVite/" : "/",
    plugins: [tanstackRouter(), react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // 开发服务器配置
    server: {
      port: 4319,
      strictPort: true,
      open: true,
      proxy: {
        "/api": {
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
      outDir: mode === "pages" ? "dist-pages" : "dist",
      emptyOutDir: true,
      sourcemap: true,
      // 分包策略
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            router: ["@tanstack/react-router"],
            query: ["@tanstack/react-query"],
          },
        },
      },
    },
  };
});
