import {
  cacheOpenApiDocument,
  fetchOpenApiDocument,
  getDocumentVersion,
  validateOpenApiDocument,
} from "./openapi-helpers.mjs";

try {
  const { config, document } = await fetchOpenApiDocument();
  const version = validateOpenApiDocument(document);
  const cachePath = await cacheOpenApiDocument(document);
  const title = document.info?.title ?? "Untitled API";
  const endpointCount = Object.keys(document.paths ?? {}).length;

  console.log(`OpenAPI document is valid.`);
  console.log(`Source: ${config.schemaUrl}`);
  console.log(`Title: ${title}`);
  console.log(`Version: ${getDocumentVersion(document)} (${version})`);
  console.log(`Paths: ${endpointCount}`);
  console.log(`Cached: ${cachePath}`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
