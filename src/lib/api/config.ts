import axios from "axios";

export const apiBaseUrl = import.meta.env.DEV
  ? ""
  : import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:4010";

export const isMockServiceWorkerEnabled = import.meta.env.VITE_API_MOCK === "msw";

axios.defaults.baseURL = apiBaseUrl;
axios.defaults.headers.common.Accept = "application/json";
