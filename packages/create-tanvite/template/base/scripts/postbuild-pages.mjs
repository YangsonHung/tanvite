import { copyFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve(process.argv[2] ?? "dist-pages");
const indexHtmlPath = path.join(outputDir, "index.html");
const notFoundHtmlPath = path.join(outputDir, "404.html");
const noJekyllPath = path.join(outputDir, ".nojekyll");

await copyFile(indexHtmlPath, notFoundHtmlPath);
await writeFile(noJekyllPath, "");
