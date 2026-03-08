import { describe, expect, it } from "vitest";
import {
  getDocumentVersion,
  parseOpenApiDocument,
  validateOpenApiDocument,
} from "../../scripts/openapi-helpers.mjs";

describe("openapi helpers", () => {
  it("parses JSON OpenAPI documents", () => {
    const document = parseOpenApiDocument(
      JSON.stringify({
        openapi: "3.1.0",
        info: { title: "Demo API", version: "1.0.0" },
        paths: {},
      }),
      "application/json"
    );

    expect(getDocumentVersion(document)).toBe("3.1.0");
    expect(validateOpenApiDocument(document)).toBe("3.1.0");
  });

  it("parses YAML OpenAPI documents", () => {
    const document = parseOpenApiDocument(
      `
openapi: 3.0.3
info:
  title: Demo API
  version: 1.0.0
paths: {}
`,
      "application/yaml"
    );

    expect(getDocumentVersion(document)).toBe("3.0.3");
    expect(validateOpenApiDocument(document)).toBe("3.0.3");
  });

  it("rejects documents without version metadata", () => {
    expect(() => validateOpenApiDocument({ paths: {} })).toThrow(/openapi|swagger/i);
  });
});
