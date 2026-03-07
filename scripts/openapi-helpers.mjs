import fs from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";
import { resolveOpenApiConfig } from "../openapi.config.mjs";

const jsonHeaders = {
  Accept: "application/json, application/yaml, application/x-yaml, text/yaml, text/plain;q=0.9",
};

export function getOpenApiConfig() {
  return resolveOpenApiConfig();
}

export async function fetchOpenApiDocument() {
  const config = getOpenApiConfig();
  const response = await fetch(config.schemaUrl, { headers: jsonHeaders });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch OpenAPI document from ${config.schemaUrl}. HTTP ${response.status} ${response.statusText}`,
    );
  }

  const raw = await response.text();
  const contentType = response.headers.get("content-type") ?? "";

  return {
    config,
    contentType,
    raw,
    document: parseOpenApiDocument(raw, contentType),
  };
}

export function parseOpenApiDocument(raw, contentType = "") {
  const normalizedType = contentType.toLowerCase();

  if (normalizedType.includes("json")) {
    return JSON.parse(raw);
  }

  if (
    normalizedType.includes("yaml") ||
    normalizedType.includes("yml") ||
    normalizedType.includes("text/plain")
  ) {
    return YAML.parse(raw);
  }

  try {
    return JSON.parse(raw);
  } catch {
    return YAML.parse(raw);
  }
}

export function getDocumentVersion(document) {
  return document.openapi ?? document.swagger ?? "unknown";
}

export function validateOpenApiDocument(document) {
  if (!document || typeof document !== "object") {
    throw new Error("OpenAPI document must be a JSON/YAML object.");
  }

  const version = getDocumentVersion(document);

  if (version === "unknown") {
    throw new Error("OpenAPI document must include an `openapi` or `swagger` version field.");
  }

  if (!document.paths || typeof document.paths !== "object") {
    throw new Error("OpenAPI document must include a `paths` object.");
  }

  return version;
}

export async function ensureDirectory(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

export async function cacheOpenApiDocument(document) {
  const { schemaCacheFile } = getOpenApiConfig();
  const absolutePath = path.resolve(schemaCacheFile);

  await ensureDirectory(path.dirname(absolutePath));
  await fs.writeFile(absolutePath, JSON.stringify(document, null, 2), "utf8");

  return absolutePath;
}

export async function writeGeneratedMockIndex() {
  const { generatedDir } = getOpenApiConfig();
  const endpointsDir = path.resolve(generatedDir, "endpoints");
  const outputFile = path.resolve(generatedDir, "mock-handlers.ts");

  const files = await collectMockFiles(endpointsDir);

  if (!files.length) {
    const fallback = `import type { RequestHandler } from "msw";\n\nexport const handlers: RequestHandler[] = [];\n`;
    await ensureDirectory(path.dirname(outputFile));
    await fs.writeFile(outputFile, fallback, "utf8");
    return;
  }

  const mockExports = await Promise.all(
    files.map(async (filePath, index) => {
      const source = await fs.readFile(filePath, "utf8");
      const match = source.match(/export const (\w+Mock) = \(\) => \[/m);

      if (!match) {
        throw new Error(`Unable to locate MSW mock factory export in ${filePath}`);
      }

      return {
        filePath,
        factoryName: match[1],
        importAlias: `mockFactory${index}`,
      };
    }),
  );

  const imports = mockExports
    .map(({ filePath, factoryName, importAlias }) => {
      const importPath = toImportPath(path.relative(path.dirname(outputFile), filePath));

      return `import { ${factoryName} as ${importAlias} } from "${importPath}";`;
    })
    .join("\n");

  const body = `${imports}\n\nexport const handlers = [\n${mockExports
    .map(({ importAlias }) => `  ...${importAlias}(),`)
    .join("\n")}\n];\n`;

  await ensureDirectory(path.dirname(outputFile));
  await fs.writeFile(outputFile, body, "utf8");
}

export async function normalizeGeneratedFiles() {
  const { generatedDir } = getOpenApiConfig();
  const targetDir = path.resolve(generatedDir);
  const files = await collectTypeScriptFiles(targetDir);

  await Promise.all(
    files.map(async (filePath) => {
      const source = await fs.readFile(filePath, "utf8");
      const normalized = replacePlainTemplateLiterals(source);

      if (normalized !== source) {
        await fs.writeFile(filePath, normalized, "utf8");
      }
    }),
  );
}

async function collectMockFiles(rootDir) {
  try {
    const entries = await fs.readdir(rootDir, { withFileTypes: true });
    const files = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(rootDir, entry.name);

        if (entry.isDirectory()) {
          return collectMockFiles(fullPath);
        }

        if (entry.isFile() && entry.name.endsWith(".msw.ts")) {
          return [fullPath];
        }

        return [];
      }),
    );

    return files.flat().sort();
  } catch {
    return [];
  }
}

async function collectTypeScriptFiles(rootDir) {
  try {
    const entries = await fs.readdir(rootDir, { withFileTypes: true });
    const files = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(rootDir, entry.name);

        if (entry.isDirectory()) {
          return collectTypeScriptFiles(fullPath);
        }

        if (entry.isFile() && entry.name.endsWith(".ts")) {
          return [fullPath];
        }

        return [];
      }),
    );

    return files.flat().sort();
  } catch {
    return [];
  }
}

function replacePlainTemplateLiterals(source) {
  return source.replace(/`(\/[^`$]*)`/g, (_, content) => {
    const normalized = content.replace(/'/g, "\\'");
    return `'${normalized}'`;
  });
}

function toImportPath(relativePath) {
  const normalizedPath = relativePath.split(path.sep).join("/");
  return normalizedPath.startsWith(".") ? normalizedPath : `./${normalizedPath}`;
}
