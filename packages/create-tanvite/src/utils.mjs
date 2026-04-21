export function sanitizePackageName(input) {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-._/]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'my-tanvite-app'
  );
}

export function toTitleCase(value) {
  return value
    .split(/[-_./]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');
}

export function unsetKeys(record, keys) {
  if (!record) return;
  for (const key of keys) {
    record[key] = undefined;
  }
}
