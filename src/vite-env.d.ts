/// <reference types="vite/client" />

// 在此声明自定义环境变量类型，获得完整的类型提示
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // 在此追加更多变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
