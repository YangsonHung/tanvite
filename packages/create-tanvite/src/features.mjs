import { promptInteger, promptMultiSelect, promptYesNo } from './prompts.mjs';

export const DEFAULT_MAX_LINES = 300;
export const MAX_LINES_MIN = 100;
export const MAX_LINES_MAX = 1000;

export const HOOKS_AGENT_OPTIONS = ['claude', 'codex'];

export const featureKeys = [
  'openspec',
  'openapi',
  'playwright',
  'pages',
  'agents',
  'hooks',
  'lintFileNaming',
  'lintMaxLines',
];

export const presetDefaults = {
  minimal: {
    openspec: false,
    openapi: false,
    playwright: false,
    pages: false,
    agents: false,
    hooks: false,
    lintFileNaming: false,
    lintMaxLines: false,
  },
  full: {
    openspec: true,
    openapi: true,
    playwright: true,
    pages: true,
    agents: true,
    hooks: true,
    lintFileNaming: true,
    lintMaxLines: true,
  },
};

export async function resolveFeatures(parsed, preset, messages) {
  const featureState = { ...(presetDefaults[preset] ?? presetDefaults.minimal) };

  for (const feature of parsed.with) {
    if (feature in featureState) {
      featureState[feature] = true;
    }
  }

  for (const [feature, enabled] of Object.entries(parsed.toggles)) {
    if (feature in featureState) {
      featureState[feature] = enabled;
    }
  }

  if (parsed.yes) {
    return featureState;
  }

  for (const feature of featureKeys) {
    const defaultValue = featureState[feature];
    const label = messages.features[feature] ?? `Include ${feature}?`;
    featureState[feature] = await promptYesNo(label, defaultValue, messages);
  }

  return featureState;
}

export async function resolveMaxLinesLimit(parsed, features, messages) {
  if (!features.lintMaxLines) {
    return null;
  }

  const fromFlag = parseMaxLines(parsed.maxLines);
  if (fromFlag !== null) {
    return fromFlag;
  }

  if (parsed.yes) {
    if (parsed.maxLines) {
      throw new Error(messages.errorMaxLinesRange);
    }
    return DEFAULT_MAX_LINES;
  }

  return promptInteger(messages.promptMaxLines, DEFAULT_MAX_LINES, {
    min: MAX_LINES_MIN,
    max: MAX_LINES_MAX,
    invalidMessage: messages.errorMaxLinesRange,
  });
}

function parseMaxLines(raw) {
  if (!raw) return null;
  const parsed = Number.parseInt(String(raw).trim(), 10);
  if (!Number.isInteger(parsed)) return null;
  if (parsed < MAX_LINES_MIN || parsed > MAX_LINES_MAX) {
    return null;
  }
  return parsed;
}

export async function resolveHooksAgents(parsed, features, messages) {
  if (!features.hooks) {
    return null;
  }

  const fromFlag = parseHooksAgents(parsed.hooksAgents);
  if (fromFlag !== null) {
    return fromFlag;
  }

  if (parsed.yes) {
    return [...HOOKS_AGENT_OPTIONS];
  }

  return promptMultiSelect(
    messages.promptHooksAgents,
    HOOKS_AGENT_OPTIONS,
    HOOKS_AGENT_OPTIONS,
    messages.hooksAgentsLabels
  );
}

function parseHooksAgents(raw) {
  if (!raw) return null;
  const tokens = raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
  const valid = tokens.filter((t) => HOOKS_AGENT_OPTIONS.includes(t));
  if (valid.length === 0) return null;
  return [...new Set(valid)];
}
