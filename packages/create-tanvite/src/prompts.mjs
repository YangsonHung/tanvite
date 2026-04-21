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
  const { min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY, invalidMessage } = options;

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

export async function promptChoice(label, choices, defaultValue, displayMap = {}) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const display = choices.map((c) => displayMap[c] ?? c).join('/');
  const defaultDisplay = displayMap[defaultValue] ?? defaultValue;
  const answer = await rl.question(`${label} (${display}) [${defaultDisplay}]: `);
  rl.close();
  const trimmed = answer.trim();

  if (!trimmed) {
    return defaultValue;
  }

  if (choices.includes(trimmed)) {
    return trimmed;
  }

  for (const choice of choices) {
    if ((displayMap[choice] ?? '').toLowerCase() === trimmed.toLowerCase()) {
      return choice;
    }
  }

  return defaultValue;
}
