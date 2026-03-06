import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "pages" ? "/TanVite/" : "/",
  plugins: [TanStackRouterVite(), react()],
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
}));
