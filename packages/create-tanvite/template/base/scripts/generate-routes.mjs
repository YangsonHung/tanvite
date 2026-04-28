import { Generator, getConfig } from '@tanstack/router-generator';

const config = getConfig({ routesDirectory: './src/app/routes' }, process.cwd());
const generator = new Generator({
  config,
  root: process.cwd(),
});

await generator.run();
