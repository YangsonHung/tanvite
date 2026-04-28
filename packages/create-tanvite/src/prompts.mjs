import process from 'node:process';
import readline from 'node:readline/promises';

export async function promptText(label, defaultValue) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const answer = await rl.question(`${label} (${defaultValue}): `);
  rl.close();
  return answer.trim() || defaultValue;
}

export async function promptYesNo(label, defaultValue, messages) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const hint = defaultValue ? messages.yesHint : messages.noHint;
  const answer = await rl.question(`${label} [${hint}]: `);
  rl.close();

  if (!answer.trim()) {
    return defaultValue;
  }

  return /^(y|yes|是|y是)$/i.test(answer.trim());
}

export async function promptInteger(label, defaultValue, options = {}) {
  const {
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
    invalidMessage,
  } = options;

  for (;;) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const answer = await rl.question(`${label} [${defaultValue}]: `);
    rl.close();

    const trimmed = answer.trim();
    if (!trimmed) {
      return defaultValue;
    }

    const parsed = Number.parseInt(trimmed, 10);
    if (Number.isInteger(parsed) && parsed >= min && parsed <= max) {
      return parsed;
    }

    if (invalidMessage) {
      console.error(invalidMessage);
    }
  }
}

export async function promptMultiSelect(
  label,
  choices,
  defaultSelected,
  displayMap = {},
  messages
) {
  const defaultSet = new Set(defaultSelected);

  console.log(label);
  for (let i = 0; i < choices.length; i += 1) {
    const choice = choices[i];
    const display = displayMap[choice] ?? choice;
    const marker = defaultSet.has(choice) ? '*' : ' ';
    console.log(`  ${marker} ${i + 1}) ${display}`);
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const hint = messages?.multiSelectHint ?? 'comma-separated numbers or names';
  const answer = await rl.question(`> [${hint}]: `);
  rl.close();
  const trimmed = answer.trim();

  if (!trimmed) {
    return [...defaultSelected];
  }

  const tokens = trimmed
    .split(/[,\s]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  const selected = new Set();

  for (const token of tokens) {
    const numeric = Number.parseInt(token, 10);
    if (Number.isInteger(numeric) && numeric >= 1 && numeric <= choices.length) {
      selected.add(choices[numeric - 1]);
      continue;
    }

    if (choices.includes(token)) {
      selected.add(token);
      continue;
    }

    const lower = token.toLowerCase();
    for (const choice of choices) {
      if ((displayMap[choice] ?? '').toLowerCase() === lower) {
        selected.add(choice);
        break;
      }
    }
  }

  return choices.filter((c) => selected.has(c));
}

export async function promptChoice(label, choices, defaultValue, displayMap = {}) {
  const defaultIndex = Math.max(0, choices.indexOf(defaultValue));
  const defaultNumber = defaultIndex + 1;

  console.log(label);
  for (let i = 0; i < choices.length; i += 1) {
    const choice = choices[i];
    const display = displayMap[choice] ?? choice;
    const marker = i === defaultIndex ? '*' : ' ';
    console.log(`  ${marker} ${i + 1}) ${display}`);
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const answer = await rl.question(`> [${defaultNumber}]: `);
  rl.close();
  const trimmed = answer.trim();

  if (!trimmed) {
    return defaultValue;
  }

  const numeric = Number.parseInt(trimmed, 10);
  if (Number.isInteger(numeric) && numeric >= 1 && numeric <= choices.length) {
    return choices[numeric - 1];
  }

  if (choices.includes(trimmed)) {
    return trimmed;
  }

  const lower = trimmed.toLowerCase();
  for (const choice of choices) {
    if ((displayMap[choice] ?? '').toLowerCase() === lower) {
      return choice;
    }
  }

  return defaultValue;
}
