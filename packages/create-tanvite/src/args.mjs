export function parseArgs(argv) {
  const parsed = {
    yes: false,
    preset: '',
    title: '',
    packageName: '',
    lang: '',
    maxLines: '',
    with: [],
    toggles: {},
    positionals: [],
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];

    if (value === '-y' || value === '--yes') {
      parsed.yes = true;
      continue;
    }

    if (value === '--preset') {
      parsed.preset = argv[index + 1] ?? '';
      index += 1;
      continue;
    }

    if (value === '--title') {
      parsed.title = argv[index + 1] ?? '';
      index += 1;
      continue;
    }

    if (value === '--package-name') {
      parsed.packageName = argv[index + 1] ?? '';
      index += 1;
      continue;
    }

    if (value === '--lang' || value === '--language' || value === '--locale') {
      parsed.lang = argv[index + 1] ?? '';
      index += 1;
      continue;
    }

    if (value === '--max-lines' || value === '--max-line' || value === '--lint-max-lines-value') {
      parsed.maxLines = argv[index + 1] ?? '';
      index += 1;
      continue;
    }

    if (value === '--with') {
      parsed.with = (argv[index + 1] ?? '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
      index += 1;
      continue;
    }

    if (value.startsWith('--no-')) {
      parsed.toggles[normalizeFlag(value.slice(5))] = false;
      continue;
    }

    if (value.startsWith('--')) {
      parsed.toggles[normalizeFlag(value.slice(2))] = true;
      continue;
    }

    parsed.positionals.push(value);
  }

  return parsed;
}

function normalizeFlag(name) {
  return name.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}
