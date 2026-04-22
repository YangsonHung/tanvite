import fs from 'node:fs/promises';
import path from 'node:path';

export async function writeAgentHooks(targetDir, features, hooksAgents, messages) {
  if (!hooksAgents) return;

  const writes = [];

  if (hooksAgents.includes('claude')) {
    writes.push(writeClaudeHooks(targetDir, messages));
  }

  if (hooksAgents.includes('codex')) {
    writes.push(writeCodexHooks(targetDir, messages));
  }

  await Promise.all(writes);
}

async function writeClaudeHooks(targetDir, messages) {
  const hooksDir = path.join(targetDir, '.claude', 'hooks');
  await fs.mkdir(hooksDir, { recursive: true });

  const scripts = [
    ['enforce-pnpm.sh', renderEnforcePnpmScript(messages)],
    ['inject-context.sh', renderInjectContextScript(messages)],
    ['stop-boundaries-check.sh', renderStopBoundariesScript(messages)],
    ['protect-files.sh', renderProtectFilesScript(messages)],
  ];

  await Promise.all(scripts.map(([name, source]) => writeScript(hooksDir, name, source)));

  const settings = renderClaudeSettings(messages);
  await fs.writeFile(path.join(targetDir, '.claude', 'settings.json'), settings, 'utf8');
}

async function writeCodexHooks(targetDir, messages) {
  const hooksDir = path.join(targetDir, '.codex', 'hooks');
  await fs.mkdir(hooksDir, { recursive: true });

  const scripts = [
    ['enforce-pnpm.sh', renderEnforcePnpmScript(messages)],
    ['inject-context.sh', renderInjectContextScript(messages)],
    ['stop-boundaries-check.sh', renderStopBoundariesScript(messages)],
  ];

  await Promise.all(scripts.map(([name, source]) => writeScript(hooksDir, name, source)));

  const settings = renderCodexSettings();
  await fs.writeFile(path.join(targetDir, '.codex', 'hooks.json'), settings, 'utf8');
}

async function writeScript(dir, filename, source) {
  const dest = path.join(dir, filename);
  await fs.writeFile(dest, source, 'utf8');
  await fs.chmod(dest, 0o755);
}

function bashEscape(str) {
  return str.replace(/'/g, "'\\''");
}

function renderEnforcePnpmScript(messages) {
  const blocked = bashEscape(messages.hooks.enforcePnpmBlocked);
  return `#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if echo "$COMMAND" | grep -qE '\\b(npm|yarn|bun)\\s+(install|add|remove|run)'; then
  echo '${blocked}' >&2
  exit 2
fi

exit 0
`;
}

function renderInjectContextScript(messages) {
  const header = messages.hooks.contextHeader;
  const rules = messages.hooks.contextRules.map((r) => `- ${r}`);
  const content = [header, ...rules].join('\n');

  return `#!/bin/bash
cat <<'HOOKS_CTX'
${content}
HOOKS_CTX
`;
}

function renderStopBoundariesScript(messages) {
  const failMsgJson = JSON.stringify(messages.hooks.stopBoundaryFail);
  return `#!/bin/bash
INPUT=$(cat)

if [ "$(echo "$INPUT" | jq -r '.stop_hook_active // false')" = "true" ]; then
  exit 0
fi

if ! pnpm check:boundaries > /dev/null 2>&1; then
  echo '{"decision":"block","reason":${failMsgJson}}'
  exit 0
fi

exit 0
`;
}

function renderProtectFilesScript(messages) {
  const marker = '/__PROTECTED_FILE__/';
  const rendered = messages.hooks.protectFilesBlocked(marker);
  const parts = rendered.split(marker);
  const prefix = bashEscape(parts[0]);
  const suffix = bashEscape(parts[1] || '');
  const patterns = messages.hooks.protectFilesPatterns.map((p) => `'${bashEscape(p)}'`);

  return `#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

PROTECTED=(${patterns.join(' ')})

for pattern in "\${PROTECTED[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo '${prefix}'"$FILE_PATH"'${suffix}' >&2
    exit 2
  fi
done

exit 0
`;
}

function renderClaudeSettings(messages) {
  const title = messages.hooks.notificationTitle;
  const body = messages.hooks.notificationBody;
  const notifCmd = `osascript -e 'display notification ${JSON.stringify(body)} with title ${JSON.stringify(title)}'`;

  const settings = {
    hooks: {
      PostToolUse: [
        {
          matcher: 'Edit|Write',
          hooks: [
            {
              type: 'command',
              command:
                "jq -r '.tool_input.file_path' | xargs pnpm exec biome check --write --no-errors-on-unmatched",
            },
          ],
        },
      ],
      PreToolUse: [
        {
          matcher: 'Edit|Write',
          hooks: [
            {
              type: 'command',
              command: '"$CLAUDE_PROJECT_DIR"/.claude/hooks/protect-files.sh',
            },
          ],
        },
        {
          matcher: 'Bash',
          hooks: [
            {
              type: 'command',
              command: '"$CLAUDE_PROJECT_DIR"/.claude/hooks/enforce-pnpm.sh',
            },
          ],
        },
      ],
      SessionStart: [
        {
          matcher: 'startup|resume|compact',
          hooks: [
            {
              type: 'command',
              command: '"$CLAUDE_PROJECT_DIR"/.claude/hooks/inject-context.sh',
            },
          ],
        },
      ],
      Stop: [
        {
          hooks: [
            {
              type: 'command',
              command: '"$CLAUDE_PROJECT_DIR"/.claude/hooks/stop-boundaries-check.sh',
              timeout: 30,
            },
          ],
        },
      ],
      Notification: [
        {
          matcher: '',
          hooks: [
            {
              type: 'command',
              command: notifCmd,
            },
          ],
        },
      ],
    },
  };

  return `${JSON.stringify(settings, null, 2)}\n`;
}

function renderCodexSettings() {
  const settings = {
    hooks: {
      PreToolUse: [
        {
          matcher: 'Bash',
          hooks: [
            {
              type: 'command',
              command: 'bash "$(git rev-parse --show-toplevel)"/.codex/hooks/enforce-pnpm.sh',
            },
          ],
        },
      ],
      SessionStart: [
        {
          matcher: 'startup|resume',
          hooks: [
            {
              type: 'command',
              command: 'bash "$(git rev-parse --show-toplevel)"/.codex/hooks/inject-context.sh',
            },
          ],
        },
      ],
      Stop: [
        {
          hooks: [
            {
              type: 'command',
              command: 'bash "$(git rev-parse --show-toplevel)"/.codex/hooks/stop-boundaries-check.sh',
              timeout: 30,
            },
          ],
        },
      ],
    },
  };

  return `${JSON.stringify(settings, null, 2)}\n`;
}
