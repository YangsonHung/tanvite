# create-tanvite

`create-tanvite` scaffolds a curated TanVite starter without copying the full maintenance repository.

## Usage

```bash
npm create tanvite@latest
pnpm create tanvite
```

The CLI supports:

- `minimal` and `full` presets
- optional OpenSpec, OpenAPI, Playwright, GitHub Pages, and agent assets
- package name and app title replacement

## Local Development

Run the bin script directly from this repository:

```bash
node ./packages/create-tanvite/bin/create-tanvite.mjs
```

## Release (Maintainers)

Publish the package from the workspace directory.

1. Ensure the template tree does not include generated artifacts such as `src/routeTree.gen.ts`.
2. Bump `packages/create-tanvite/package.json` version.
3. Run `pnpm pack` and inspect the tarball before publish.
4. Publish to npmjs registry with 2FA.

```bash
cd packages/create-tanvite
npm version patch --no-git-tag-version
pnpm pack
tar -tzf create-tanvite-*.tgz | grep -E "template/base/(gitignore|\\.gitignore|src/routeTree\\.gen\\.ts)"
pnpm publish --access public --no-git-checks --registry=https://registry.npmjs.org
```

After publish, verify:

```bash
npm view create-tanvite version dist-tags --json --registry=https://registry.npmjs.org
```
