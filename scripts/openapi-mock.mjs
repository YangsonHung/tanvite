import { spawn } from "node:child_process";
import {
  cacheOpenApiDocument,
  fetchOpenApiDocument,
  getOpenApiConfig,
} from "./openapi-helpers.mjs";

const config = getOpenApiConfig();

try {
  const { document } = await fetchOpenApiDocument();
  const schemaCacheFile = await cacheOpenApiDocument(document);

  console.log(`Starting Prism mock server for ${config.schemaUrl}`);
  console.log(`Using cached schema at ${schemaCacheFile}`);
  console.log(`Listening on http://127.0.0.1:${config.mockServerPort}`);

  const child = spawn(
    "pnpm",
    [
      "exec",
      "prism",
      "mock",
      schemaCacheFile,
      "--port",
      String(config.mockServerPort),
      "--host",
      "127.0.0.1",
      "--cors",
      "--dynamic",
    ],
    {
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );

  child.on("close", (code) => {
    process.exit(code ?? 0);
  });
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
