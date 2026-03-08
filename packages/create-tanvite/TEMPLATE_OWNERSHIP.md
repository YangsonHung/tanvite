# Starter Template Ownership

`packages/create-tanvite/template/base/` is the curated source for files emitted into end-user projects.

Ownership rules:

- Files under `template/base/` are starter-owned and safe to ship to generated projects.
- Repository-maintenance assets such as changelog, contributor docs, showcase marketing pages, and release metadata must stay outside the emitted starter template.
- Optional starter features are kept in the template source only when they can be selectively removed by the CLI without breaking the generated project.
- When starter runtime behavior changes, update the template files and the CLI transforms in the same pass.
