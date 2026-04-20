import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const DEFAULT_SCHEMA_URL = 'https://petstore3.swagger.io/api/v3/openapi.json';
const DEFAULT_MOCK_PORT = 4010;
const GENERATED_DIR = './src/shared/api/generated';
const SCHEMA_CACHE_FILE = './.openapi/schema.json';

loadOpenApiEnvFiles();

function normalizePort(value) {
  const port = Number.parseInt(value ?? '', 10);

  if (Number.isNaN(port) || port <= 0) {
    return DEFAULT_MOCK_PORT;
  }

  return port;
}

export function resolveOpenApiConfig() {
  const mockServerPort = normalizePort(process.env.OPENAPI_MOCK_PORT);

  return {
    schemaUrl: process.env.OPENAPI_SCHEMA_URL ?? DEFAULT_SCHEMA_URL,
    mockServerPort,
    generatedDir: GENERATED_DIR,
    schemaCacheFile: SCHEMA_CACHE_FILE,
    apiBaseUrl: process.env.VITE_API_BASE_URL ?? `http://127.0.0.1:${mockServerPort}`,
  };
}

export const defaultOpenApiConfig = resolveOpenApiConfig();

function loadOpenApiEnvFiles() {
  const envFiles = ['.env', '.env.local'];

  for (const fileName of envFiles) {
    const absolutePath = path.resolve(process.cwd(), fileName);

    if (!fs.existsSync(absolutePath)) {
      continue;
    }

    const result = dotenv.config({
      path: absolutePath,
      override: false,
    });

    dotenvExpand.expand(result);
  }
}
