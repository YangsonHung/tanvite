import { generate } from "orval";
import orvalConfig from "../orval.config.mjs";
import {
  cacheOpenApiDocument,
  fetchOpenApiDocument,
  normalizeGeneratedFiles,
  writeGeneratedMockIndex,
} from "./openapi-helpers.mjs";

try {
  const { config, document } = await fetchOpenApiDocument();
  const schemaCacheFile = await cacheOpenApiDocument(document);

  console.log(`Generating OpenAPI client from ${config.schemaUrl}`);
  console.log(`Detected API: ${document.info?.title ?? "Untitled API"}`);
  console.log(`Using cached schema at ${schemaCacheFile}`);

  await generate({
    ...orvalConfig.api,
    input: {
      ...orvalConfig.api.input,
      target: schemaCacheFile,
    },
  });
  await normalizeGeneratedFiles();
  await writeGeneratedMockIndex();

  console.log("OpenAPI client, hooks, and mock handlers generated successfully.");
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
