import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { ShowcaseI18nProvider } from "./lib/i18n";
import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Showcase root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <ShowcaseI18nProvider>
      <App />
    </ShowcaseI18nProvider>
  </StrictMode>
);
