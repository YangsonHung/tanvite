import { defineConfig } from 'orval';
import { resolveOpenApiConfig } from './openapi.config.mjs';

const openApiConfig = resolveOpenApiConfig();

export default defineConfig({
  api: {
    input: {
      target: openApiConfig.schemaUrl,
      validation: true,
    },
    output: {
      mode: 'tags-split',
      target: `${openApiConfig.generatedDir}/endpoints`,
      schemas: `${openApiConfig.generatedDir}/models`,
      client: 'react-query',
      clean: true,
      prettier: false,
      biome: false,
      mock: {
        type: 'msw',
        useExamples: true,
        baseUrl: openApiConfig.apiBaseUrl,
      },
      override: {
        query: {
          useQuery: true,
          useMutation: true,
          useInfinite: false,
          usePrefetch: false,
          shouldExportQueryKey: true,
          shouldExportHttpClient: false,
          signal: true,
          version: 5,
        },
      },
    },
  },
});
