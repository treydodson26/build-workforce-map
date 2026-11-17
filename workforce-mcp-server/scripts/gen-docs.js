// Writes docs/PRD.md from the PRD template sections below plus the live tool catalog.
import fs from "node:fs";
import { TOOLS, TRANSFORMATIONS, INTEGRATIONS, parseParams } from "../src/catalog.js";

const FAMILY_TITLES = {
  agents: "Agents", tools: "Tools", transformations: "Step types (transformations)", workforces: "Workforces",
  knowledge: "Knowledge tables", triggers: "Triggers", evals: "Evals", alarms: "Alarms", dashboards: "Performance dashboards",
  prepublish: "Pre-publish gate", bulk: "Bulk runs", folders: "Folders", priorities: "Task priorities",
  analytics: "Analytics", tasks: "Tasks", project: "Project and integrations",
};
const OUTPUT = {
  create: "The created object with its `id`.", get: "The object.", update: "The updated object.", delete: "`{ \"deleted\": \"<id>\" }`",
  list: "`{ \"<items>\": [ ... ] }`, newest first.", run: "Status and output.", trigger: "A task ID and status.", poll: "Status, reply or output, and error.",
};
const outFor = n => OUTPUT[n.split("_")[0]] || "JSON object; see the server source for fields.";

const families = {};
for (const [name, [fam, purpose, params]] of Object.entries(TOOLS)) (families[fam] ||= []).push({ name, purpose, schema: parseParams(params) });

let tools = "";
let n = 0;
for (const [fam, list] of Object.entries(families)) {
  tools += `\n### 2.${Object.keys(families).indexOf(fam) + 1} ${FAMILY_TITLES[fam]} (${list.length} tools)\n\n| # | Tool name | Purpose | Required inputs | Optional inputs | Expected output |\n|---|---|---|---|---|---|\n`;
  for (const t of list) {
    n++;
    const req = t.schema.required.map(k => `\`${k}\` (${t.schema.properties[k].type})`).join(", ") || "None";
    const opt = Object.keys(t.schema.properties).filter(k => !t.schema.required.includes(k)).map(k => `\`${k}\` (${t.schema.properties[k].type})`).join(", ") || "None";
    tools += `| ${n} | \`${t.name}\` | ${t.purpose.replace(/\|/g, "\\|")} | ${req} | ${opt} | ${outFor(t.name)} |\n`;
  }
}

const steps = Object.entries(TRANSFORMATIONS).map(([id, t]) => `| \`${id}\` | ${t.description} | ${Object.entries(t.params).map(([k, v]) => `\`${k}\`: ${v}`).join("; ")} | ${Object.keys(t.output).map(k => `\`${k}\``).join(", ")} |`).join("\n");
const integ = INTEGRATIONS.map(i => `| \`${i.env}\` | env var | ${i.note} | Not set |`).join("\n");

const prd = `# MCP Server Product Requirements Document (PRD): workforce-mcp-server

Version 1.0.0, 11/17/2026. The tool tables in Section 2 are generated from \`src/catalog.js\` by \`npm run docs\`.

## 1. Server overview

**Server name:** workforce-mcp-server. Claude Code registers it as \`workforce\`, so its tools appear as \`mcp__workforce__<tool>\`.

**Primary purpose:** Build, run, test, and monitor AI agents, tools, multi-agent workforces, and knowledge tables entirely inside Claude Code, with no external agent platform. The server keeps every object in a local store and runs every agent through the \`claude -p\` command.

**Target users:** Trey and other consultants who design AI workforces with the build-workforce-map skill. They work in Claude Code on a laptop, including a Windows work laptop with desktop Office and classic Outlook and no cloud office suite. They read JSON but do not write server code.

**Use case examples:**

- Example 1: The build-workforce-map skill finishes Stage 2 for a support desk. In Stage 3, Claude calls \`create_knowledge_set\`, \`import_knowledge_file\`, \`create_tool\`, \`create_agent\`, \`attach_tools_to_agent\`, and \`create_workforce\`, then \`trigger_workforce\` with a test message.
- Example 2: Before a demo, Claude builds a test set with \`create_eval_test_set\` and \`create_eval_test_case\`, adds an \`llm_judge\` check, sets a publish gate with \`upsert_pre_publish_config\`, and calls \`publish_agent\`. Publishing writes \`.claude/agents/<name>.md\`, so the agent also runs as a Claude Code subagent.
- Example 3: Trey asks for a weekly report agent. Claude calls \`create_trigger\` with \`type: schedule\`. The server returns the exact \`claude -p\` fire command to put in cron or a Claude Code scheduled task.

## 2. Tool specifications

The server exposes ${Object.keys(TOOLS).length} tools in ${Object.keys(families).length} families. Every tool name matches the earlier platform connector's tool name with the vendor prefix removed.

**Shared rules for every tool**

- Input format: one JSON object. Types are checked; a wrong type returns \`INVALID_INPUT\`.
- Output format: one text block that holds pretty-printed JSON.
- Error format: \`isError: true\` and \`{ "error": "<CODE>", "message": "...", "hint": "..." }\`.

**Error conditions shared by all tools**

| Code | When it happens | What the caller does |
|---|---|---|
| \`INVALID_INPUT\` | A required input is missing, or an input has the wrong type or value. | Fix the input named in the message. |
| \`NOT_FOUND\` | An ID does not exist in the store. | Call the matching \`list_*\` tool, as the hint says. |
| \`CONFLICT\` | A knowledge table with that name already exists. | Pick another name, or use the existing table. |
| \`UNSUPPORTED\` | A step type is not in the catalog, or a feature needs a provider that is not set. | Call \`list_transformations\`, or set the env var named in the hint. |
| \`NOT_CONFIGURED\` | An integration token is missing (for example \`SLACK_BOT_TOKEN\`). | Add the env var to the server's \`.mcp.json\` entry. |
| \`CLAUDE_UNAVAILABLE\` | The \`claude\` binary is missing. | Install Claude Code, or set \`WORKFORCE_CLAUDE_BIN\`. |
| \`CLAUDE_FAILED\` | \`claude -p\` returned an error: login, usage limit (429), or model error. | Run \`claude -p hello\` in a terminal; wait out a usage limit. |
| \`TIMEOUT\` | One \`claude -p\` call ran longer than \`WORKFORCE_TIMEOUT_MS\`. | Raise the timeout, or shorten the prompt. |
| \`NETWORK_ERROR\` | An HTTP step failed 3 times. | Check the URL and the network. |
| \`PUBLISH_BLOCKED\` | The pre-publish gate's latest batch is below its pass rate. | Run \`poll_pre_publish_check\`, fix failures, publish again. |

**Rate limits:** The server calls no rate-limited API of its own. Usage limits come from the Claude account behind \`claude -p\`; the server reports them as \`CLAUDE_FAILED\` and does not retry them. HTTP steps retry 5xx errors and network errors 3 times with backoff of 1 s, 2 s, and 4 s.
${tools}
### 2.${Object.keys(families).length + 1} Step types a tool can use

| Step type | What it does | Params | Output fields |
|---|---|---|---|
${steps}

Step params can reference tool inputs as \`{{name}}\` and earlier step outputs as \`{{step_name.field}}\`. A param that is only one reference keeps the value's type (number, object, array).

## 3. External dependencies

**APIs and services required**

- Claude Code CLI (\`claude\`): runs every agent turn, prompt step, \`llm_judge\` check, and simulated user. It uses the Claude Code login on the machine.
- Optional HTTP services reached by \`api_call\` and \`browserless_scrape\` steps, with tokens from env vars.

**Authentication**

- Method: the Claude Code login for \`claude -p\`. Integration tokens come from env vars.
- Where credentials are stored: the \`env\` block of the server's entry in \`.mcp.json\`, or the shell environment. The server never returns token values.
- Scopes: whatever each integration token grants. The server adds none.

**Rate limits:** see Section 2. Claude usage limits stop agent runs until they reset; local tools keep working.

## 4. Data handling

**Input data**

- Source: tool calls from Claude Code, plus local files passed to \`import_knowledge_file\`.
- Format: JSON arguments; CSV, JSON, JSONL, Markdown, or text files.
- Volume: single objects or batches. Knowledge tables hold thousands of rows; search is in-memory BM25.

**Output data**

- Destination: tool results go back to Claude Code. \`publish_agent\` writes \`.claude/agents/<name>.md\`. \`export_knowledge\` writes a local file.
- Format: pretty-printed JSON.
- Storage: one JSON file per collection in \`WORKFORCE_HOME\` (default \`./.workforce\`). Writes are atomic (temp file, then rename).

**Data privacy**

- Sensitive data: agent conversations and knowledge rows can hold client data.
- Logging: stderr logs only the tool name and error code. Arguments, messages, rows, and tokens are never logged.
- Retention: the store keeps data until the user deletes it. Add \`.workforce/\` to \`.gitignore\` when it holds client data.

## 5. Technical requirements

**Runtime environment**

- Language: Node.js 20 or later, ES modules.
- Required libraries: \`@modelcontextprotocol/sdk\` 1.32.2. Nothing else.
- System dependencies: \`claude\` (Claude Code CLI) for agent runs; \`python3\` for Python steps.

**Performance**

- Local tools (create, get, list, search) answer in under 100 ms.
- Agent and prompt steps take as long as \`claude -p\`, usually 5 to 60 seconds.
- Concurrency: \`*_async\`, \`trigger_tool\`, \`run_evaluation\`, \`trigger_workforce\` without \`wait\`, and \`start_bulk_run\` return at once and finish in the background. Bulk runs use 1 to 8 workers.

**Error recovery**

- Retry: HTTP steps retry 5xx and network errors 3 times (1 s, 2 s, 4 s). \`claude -p\` failures are not retried.
- Fallback: a failed step stops the tool run and saves \`status: failed\` with the step number. A failed node stops a workforce task.
- Timeouts: 30 s per HTTP request; \`WORKFORCE_TIMEOUT_MS\` (default 300000) per \`claude -p\` call; 30 s per JavaScript step; 60 s per Python step.

## 6. Configuration

**Required configuration:** none. The server runs with defaults.

**Optional configuration**

| Setting | Type | Purpose | Default |
|---|---|---|---|
| \`WORKFORCE_HOME\` | env var | Store folder | \`./.workforce\` |
| \`WORKFORCE_AGENTS_DIR\` | env var | Where \`publish_agent\` writes subagent files | \`./.claude/agents\` |
| \`WORKFORCE_CLAUDE_BIN\` | env var | Path to the Claude Code CLI | \`claude\` |
| \`WORKFORCE_DEFAULT_MODEL\` | env var | Model for agents with no model | \`sonnet\` |
| \`WORKFORCE_TIMEOUT_MS\` | env var | Limit per \`claude -p\` call | \`300000\` |
${integ}

## 7. Testing requirements

\`npm test\` runs 27 end-to-end tests over a real MCP stdio connection. A stand-in CLI (\`test/fake-claude.js\`) replaces \`claude\` so the suite runs offline. Set \`WORKFORCE_CLAUDE_BIN=claude\` to run it live.

**Test scenarios**

- Happy path: the server lists exactly ${Object.keys(TOOLS).length} tools, and no name or description contains the old vendor name.
- Happy path: a tool with a JavaScript step adds two inputs; step add, move, update, and remove change the result as expected.
- Happy path: a knowledge table takes rows and a Markdown file, and \`claude_db_search\` returns active rows only.
- Happy path: an agent with a tool and a knowledge table answers through \`claude -p\`; a two-agent workforce runs both nodes in order.
- Happy path: an eval batch with a \`contains\` rule, a simulated user, and an \`llm_judge\` check passes 2 of 2.
- Error: a missing required input returns \`INVALID_INPUT\`; an unknown ID returns \`NOT_FOUND\` with a hint; a wrong type is rejected.
- Error: an unsupported step type returns \`UNSUPPORTED\`; a workforce edge to a missing node is rejected.
- Error: any COM tool on a non-Windows host returns \`UNSUPPORTED_HOST\`; a COM path outside \`WORKFORCE_WINDOWS_ROOT\` returns \`PATH_OUTSIDE_ROOT\`.
- Edge case: the publish gate allows \`publish_agent\` at a 100% pass rate, writes the subagent file, and blocks publishing after a test fails.
- Integration: bulk runs, schedule triggers, alarms, dashboards, and analytics all run against the same store.

**Success criteria**

- Every tool returns JSON for valid input and an actionable error for invalid input.
- \`npm test\` reports 27 passed, 0 failed.
- One live run on Trey's machine: \`trigger_agent\` returns \`status: complete\` with a real Claude reply.

## 8. Documentation needs

**Setup steps**

1. Install Node.js 20 or later and Claude Code, and log in once with \`claude\`.
2. Unzip the server to a stable folder, for example \`~/mcp/workforce-mcp-server\`, then run \`npm install\` there.
3. Register it in the project where you design workforces:
   \`claude mcp add workforce --scope project -- node ~/mcp/workforce-mcp-server/src/server.js\`
4. Start Claude Code in that project and run \`/mcp\`. The \`workforce\` server shows 203 tools.
5. Test: ask Claude "Call get_project_info on the workforce server." The reply shows the store path and the Claude CLI version.

**Example usage:** see \`docs/PROMPTS.md\`, the prompt library.

**Troubleshooting**

| Symptom | Cause | Fix |
|---|---|---|
| \`claude_cli: NOT FOUND\` in \`get_project_info\` | The CLI is not on the PATH the server sees. | Set \`WORKFORCE_CLAUDE_BIN\` to the full path in \`.mcp.json\`. |
| \`CLAUDE_FAILED\` with "Authentication error" | Claude Code is not logged in on this machine. | Run \`claude\` once and log in. |
| \`CLAUDE_FAILED\` with 429 | The account hit a usage limit. | Wait for the reset; local tools keep working. |
| A workforce stops after one node | No edge leaves that node, or an edge \`condition\` did not match the reply. | Check \`edges\` with \`get_workforce\`. |
| Search returns nothing | Rows lack \`status: active\` and the search uses the default filter. | Pass \`filters: {}\` or set \`status\` on each row. |
| A schedule trigger never fires | The server does not run in the background. | Put the trigger's \`fire_command\` in cron or a Claude Code scheduled task. |

## Priority items

- [x] Needs robust error recovery (agent runs can fail on login or usage limits)
- [ ] Must handle authentication complexly (one CLI login plus optional env tokens)
- [x] Needs to handle large data volumes (knowledge tables and bulk runs)
- [ ] Requires fast response times (local tools are fast; agent runs depend on Claude)
- [x] Will be used in production workflows (Stage 3 of build-workforce-map)
- [ ] Prototype/experimental use only

**Timeline:** version 1.0.0 is built and passes its offline suite. One live run on Trey's machine is the remaining check.

**Additional context:** This server replaces the vendor connector for the build-workforce-map skill. The skill's \`INSTALL.md\` Step 1 registers it, and the skill's Stage 3 builds through it.
`;
fs.mkdirSync("docs", { recursive: true });
fs.writeFileSync("docs/PRD.md", prd);
console.log(`docs/PRD.md written: ${n} tools`);
