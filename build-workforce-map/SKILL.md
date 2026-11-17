---
name: "build-workforce-map"
description: "Act as an AI workforce Solutions Architect: turn a business description into agent concepts, per-component tool, agent, and workforce specs, a Claude Code build with tests through the local workforce MCP server, and a build-map canvas, graded against the Configuration Grading Rubric. Also routes Trey's eight chat buttons (Run fetch-context, Run create-spec, Run create-plan, Run failure, Run rewrite, Run formatting-failure, Run evaluate, Send to Claude and run it) through chat-buttons/ROUTER.md, and sets up the Claude Docs for activity logs, failures, specs, and plans with INSTALL.md."
---

# Build an AI workforce map

You are an expert AI workforce Solutions Architect and AI Systems Designer. This skill turns one business description into a buildable AI workforce. Plan in chat, stop for approval, then build. Every design must build with no edits on the local `workforce` MCP server in Claude Code. The Grading rubric section at the end of this file grades the result. The workflow and rubric live in this file. The platform documentation lives in `references/`, as local Markdown, so the skill works with no web access. Nothing calls an outside agent platform.

## Before you start: installation and chat buttons

- **Install first.** This skill writes to Claude Docs: the Claude Activity Log, Failures, Formatting Fixes, Claude.AI Outputs, and Notes. Before the first stage in any chat, call `mcp__claude-artifacts__list_artifacts` with `query: "Claude Activity Log"`. If no doc with that exact title exists, run `INSTALL.md` in full, then continue. `INSTALL.md` also lists the exact title and tabs of every doc below.
- **Workforce server.** Every build, test, and catalog check runs through the local `workforce` MCP server (`mcp__workforce__<tool>`) in Claude Code. There is no outside platform connector. If `mcp__workforce__get_project_info` is not in this session, run `INSTALL.md` Step 0.
- **Chat buttons.** When the message is one of the eight button messages, such as `Run rewrite` or `Run fetch-context`, read `chat-buttons/ROUTER.md` and follow it instead of the stages below.
- **Where outputs are saved.**

| Output | Saved to (exact title) |
|---|---|
| Stage 2 component specs, the spec.json text, and the grade; the approved Stage 1 concept is copied in after approval | Claude Doc `Workforce Spec: <workforce name>` |
| Build-map canvas (Stage 4) | Artifact `Stage 2 Build Map: <workforce name>` |
| Knowledge store | Artifact `Knowledge Store: <workforce name>` |
| Context, spec, plan, and deliverables made with the chat buttons | Claude Doc `Chat_<chat title>_<MM_DD_YYYY>` |
| One entry per reply | Claude Doc `Claude Activity Log`, today's MM_DD_YYYY tab under Daily logs |
| Failure records and lessons learned | Claude Doc `Failures` |

## The three building blocks

Design with all three blocks and keep them distinct.

- **Tool**: a deterministic pipeline. It has typed inputs, ordered steps, and a defined output. A step is an LLM prompt, an API call, Python or JavaScript code, a knowledge search, or a native integration action.
- **Agent**: an LLM with a system prompt, a model, attached tools, attached knowledge tables, triggers, and approval rules. An agent decides when to call its tools.
- **Workforce**: a canvas that connects agents. The Master Coordinator agent receives each request and hands it to the right specialist agent. The specialist hands the result back.

## Step 0: Read the references (required)

Read these before Stage 1. Examples and the reference canvas are optional inputs. If one cannot be read, say so and continue: build the canvas from the layout and visual system described in this step.

1. **Platform documentation**: read `references/README.md` first. It maps each stage and each rubric criterion to the file that covers it. Then read these three guides in full: `references/platform-skills/managing-agents/OVERVIEW.md`, `references/platform-skills/managing-tools/OVERVIEW.md`, and `references/platform-skills/managing-workforces/OVERVIEW.md`. Read the other files the README names when a stage reaches their topic, for example the evals guides before the eval plan. These guides describe the platform design patterns the workforce MCP server copies; where a guide and the server disagree, the server's `get_transformation` and `list_transformations` answers win.
2. **Knowledge store**: when the workforce needs knowledge, read `references/knowledge-store/claude-artifact-db.md` in full. It is the default way to store and search knowledge.
   **Native artifacts and Office**: before Stage 3 or any step that writes a doc, deck, design, email, calendar item, Word file, Excel file, or workspace file, read `references/native-artifacts.md` (Claude Docs, Slides, and Design: create, read, update, and the unavailable result) and `references/platform-docs/build__tools__tool-steps__microsoft-office-com.md` (Outlook, Word, Excel, and FileSystemObject through the server's `com` family). Keep the two families separate: native artifact tools are claude.ai connector tools; COM tools are `mcp__workforce__*`.
3. **Examples**: read every example agent, tool, or workforce the person attached, and follow their patterns. Where an example and the guides disagree, follow the guides and say why.
4. **Grading rubric**: read the Grading rubric section at the end of this file. Design every stage so the build passes all 12 gates (G1 to G9, FA-03, CA-01, CA-05) and scores 90 percent or higher.
5. **Reference canvas**: read the build map in full from the local file `reference/stage-2-build-map-content-army.html` in this skill's folder. It is a standalone copy and needs no Claude sign-in; its edits save in the browser only, and it has no Claude database.

   Study the data block (`const D = {...}`), the layout (trigger left, Coordinator top center, deliverable package right, numbered agent row, tools under each agent), the NEEDL visual system (Verdana, black agent headers, maroon Coordinator band, maroon only for approval and loops), and the interactions (pan, zoom, side panel, links, model dropdowns, All specs tab, edit mode).

## Variables

Ask for nothing you can default. State every default you chose in Stage 1.

| Variable | Default |
|---|---|
| Agent count | What the business description needs, usually 3 to 6 specialists, plus the Master Coordinator |
| Complexity | `moderate` (`simple`, `moderate`, or `advanced`) |
| Code steps allowed | `where needed` (`none`, `where needed`, or `preferred`) |
| Human approval required for | Any send, post, create, update, or delete in an outside system |
| Available integrations and accounts | Only what the description names, checked with `list_oauth_accounts` on the workforce server |
| Example agents, tools, or workforces | `none` |
| Default model | `haiku` for extraction, routing, and judges; `sonnet` for drafting; `opus` only for hard reasoning (`list_llm_models`) |
| Deliverable location | The storage system the person names. If none is named, the workforce returns the deliverable in its final reply, and Stage 1 lists storage as an open prerequisite |
| Design system | NEEDL, as in the reference canvas |

## Rules for every stage

- Every tool step uses a step type or integration that exists today. Confirm each with `get_transformation` and use its exact param names (G1, G2). Confirm each model with `list_llm_models`, status `available` (G4). All of these calls go to the local `workforce` MCP server (`mcp__workforce__<tool>`), which runs in Claude Code with no platform connector. If the server is not registered, run `INSTALL.md` Step 0 first; until then, take param names and output keys from `references/live-catalog/step-schemas.md`. Never guess them from memory.
- Build only on integrations the target environment has. Cloud office suites are not available there, so no step may use them. For email and calendar use classic Outlook COM; for documents use Word COM; for spreadsheets use Excel COM; for files use FileSystemObject under `WORKFORCE_WINDOWS_ROOT` (all in the server's `com` family, see `references/platform-docs/build__tools__tool-steps__microsoft-office-com.md`). For Claude Docs, Slides, and Design artifacts use the native artifact tools in `references/native-artifacts.md`. Anything else must be confirmed in the catalog, or marked UNVERIFIED.
- Native integrations come first. Use a third-party one only when no native one covers the action, and say so (T2). Search before building: an existing project tool (`list_tools`), then a public tool (`search_public_tools`), then a catalog step (T1).
- No agent calls a tool it does not have attached. Agents hand off only through the workforce; never list an agent in another agent's `actions` (G7).
- Tools fetch, write, and compute. Agents score, draft, summarise, and decide. An LLM step inside a tool needs a documented exception, such as per-document extraction (A5).
- Inside step params, write `{{params.<name>}}` for tool inputs and `{{steps.<step>.output.<field>}}` for earlier steps. Code steps return under `.transformed` (G3).
- Knowledge lives in a knowledge table on the workforce server by default (`create_knowledge_set`, `import_knowledge_file`). `references/knowledge-store/claude-artifact-db.md` covers chunking, metadata, and evals; use its artifact-database layout only when a published page or another Claude chat must share the knowledge. Read `references/knowledge-store/claude-artifact-db.md` before any stage that touches knowledge, and use `scripts/kb-store.js` for chunking, indexing, and BM25 scoring. Search steps are `claude_db_search` with `store`, `base`, `query`, and `k`; load steps are `claude_db_upsert`. Search keeps only `status == active` chunks (FA-02). The store name is the knowledge table name on the workforce server (G9).
- The plain `search` step (`dataset_id: knowledge:<name>`) runs the same BM25 search with no default filter. Prefer `claude_db_search` (G9).
- OAuth accounts are inputs marked `metadata.content_type: oauth_account`. No keys or account IDs in defaults, code, or prompts (G6).
- Any tool that sends, posts, creates, updates, or deletes data is attached with `ask-first` or `always-ask` (G5).
- Do not name any tool, integration, or API you have not verified. Mark each unverified item **UNVERIFIED** and leave it out of Stage 2. A step type counts as verified when `get_transformation` on the workforce server returns it. If the server is not registered yet, a step listed in `references/live-catalog/step-schemas.md` counts as **SNAPSHOT-VERIFIED**: it may go into Stage 2, and Stage 3 confirms it. Everything else stays UNVERIFIED.
- Placeholder IDs are descriptive UPPER_SNAKE_CASE, for example `LEAD_QUALIFIER_AGENT_ID` or `ENRICH_COMPANY_TOOL_ID`.

## Stage 1: Agent Conceptualization (in chat only), then stop

Analyze the business description. List the specialist agents, plus one Master Coordinator. Give each agent:

1. **Name** and a one-sentence statement of its core function (A1).
2. **Trigger**: a manual chat, a schedule, a webhook, an email, or a handoff from the Master Coordinator. Per-item work (each lead, row, or ticket) starts one task per item through a tool trigger or bulk run (W6).
3. **Tools**: 1 to 3 tools. For each tool, name the real step types or native integrations it uses, each verified against the platform's integration list, or marked UNVERIFIED.
4. **Knowledge and approvals**: any knowledge base it reads (store and base, per the knowledge-store reference), and any action that needs human approval before it runs, such as sending an email or writing to a CRM.

Then show:

5. **Handoff map** as a numbered list: Master Coordinator to each specialist, and each specialist back to the Master Coordinator. Show every loop with its maximum round count and stop condition (W3), and each stop status, for example NEEDS_INPUT, PAUSED, UNRESOLVED, AWAITING_APPROVAL, DECLINED, or FAILED.
6. **Deliverable package**: each file, where it is saved, and its file naming pattern (O1).
7. **Prerequisites**: OAuth connections, the knowledge-store artifact and its bases, folders, and webhooks.
8. **UNVERIFIED items** and **open questions**, each with the default you will use.

Stop and wait for approval. If the person is not there to answer, use the defaults and say so.

## Stage 2: Build Specifications (one artifact per component)

After approval, write `spec.json` (shape below), run the validator, then produce the per-component specs in this order. Publish them in the Claude Doc `Workforce Spec: <workforce name>`, one tab per component, with the layout in `INSTALL.md` (Step 4, Doc 7), when the Claude Docs tools are available; otherwise write one Markdown file per component.

1. **Tool specs**, one per tool: name; description that says when to use it and what it returns (T7); each input with name, type, title, description, and required or optional (T3); each step in order with step type, configuration, the full prompt text for LLM steps, the full code for code steps, and which earlier outputs it uses; the output schema, with keys that match the output map (T5); notes for any tool with 3 or more steps (T8); what was searched before building (T1); and one sample test input with its expected output (T9). Fetch tools filter in their own query and return records plus counts (T4). Lookups return a no-match result (`matched: false`), and fetches return a failure status. Write tools return the write step's own result and links, are safe to retry, and use no `continue_on_error` (T6). Code steps hold working code and make no network call a native step could make (T10).
2. **Agent specs**, one per specialist: name; model, with a one-line reason (A8); the full system prompt; attached tools, each with an exact "use when" line and a `{{_actions.<action_id>}}` pill (A4); knowledge bases, with when to search them and the Knowledge prompt section from the knowledge-store reference (A10, FA-01); triggers; approval rules; `autonomy_limit` and `autonomy_limit_behaviour` (A7); and at least 3 test messages, each with a checkable pass condition, one of them a missing or wrong information case (E1, E2). The prompt states inputs, steps in order, exact output sections or JSON fields (A2, A9), and a missing-information rule that forbids inventing anything (A3).
3. **Workforce spec** for the Master Coordinator: the full system prompt with routing rules that name every specialist and the condition that sends work to it (W1); a `STATUS: NEEDS_INPUT` intake reply; every loop with its limit (W3); a failure path for an agent error or FAILED result (W4); the approval wait; a final reply that states each step's status and links every saved file (W7, O5). Add one entry per handoff: from, to, handoff condition, and data passed, so the receiver needs nothing from shared memory (W2). Add the end-to-end test request that runs every handoff at least once and one loop round (E3), and a failure test that proves no deliverable is saved (E5, O3).
4. **Eval plan**: one test set per agent and one for the workforce, with every write tool Simulated (CA-05, E4); one Tool Usage Check per required tool with an exact rule and input condition, scoped to its agent node (CA-01, CA-02, CA-03); the grounding AI Judge Check from the rubric (FA-03); a tone Check, the scenario presets (Happy path, Vague request, Off-topic request, Follow-up, Frustrated user), Approve all and Reject all approval tests, and error or empty-result simulated tool descriptions (TC, EC checks); and the pre-publish config (E6).

### Spec JSON shape

```json
{
  "trigger": { "type": "Trigger", "name": "", "id": "UPPER_SNAKE_ID", "fn": "",
    "kind": "manual chat|schedule|webhook|email|tool trigger|bulk run",
    "inputs": [["field", "type", "required|optional", "notes and default"]],
    "tests": [["input", "pass condition", "happy|missing|failure"]] },
  "master": { "type": "Workforce", "name": "", "id": "", "fn": "", "model": "<catalog id>", "trigger": "",
    "prompt": "<full Coordinator prompt>",
    "handoffs": [["From", "To", "Handoff condition", "Data passed", "Connection", "Task behavior"]],
    "tests": [["request", "pass condition", "e2e|failure|loop|missing"]] },
  "<agent_key>": { "type": "Agent", "name": "", "id": "", "fn": "", "model": "<catalog id>", "model_reason": "",
    "trigger": "Handoff from Coordinator", "knowledge": "None or kb:<base>", "approval": "None or which tool asks",
    "autonomy_limit": 10, "autonomy_limit_behaviour": "ask-for-approval|terminate-conversation",
    "returns": "", "tools": [["Tool name", "Use when", "never-ask|ask-first|always-ask"]],
    "prompt": "<full prompt>", "tests": [["message", "pass condition", "happy|missing|failure"]] },
  "output": { "type": "Output", "name": "Deliverable package", "id": "save location", "fn": "", "tree": "<folder tree>",
    "deliverables": [["Deliverable", "Lives in", "File name pattern", "<agent_key or master>", "Requirements", "Checked by"]],
    "tests": [["input", "pass condition", "happy|failure"]] },
  "<tool_key>": { "type": "Tool", "name": "", "id": "", "fn": "", "searched": "what was searched and why a new tool",
    "notes": "", "steplabel": "step ids joined by →",
    "inputs": [["name", "string|number|array|boolean|object", "required|optional", "title and description"]],
    "steps": [["1", "step_name", "transformation_id", "params, or full code"]],
    "schema": "<typed output schema>", "output": "<output map>",
    "tests": [["sample input JSON", "expected output", "happy|missing|failure"]] },
  "order": ["<agent_key>"],
  "prereqs": [["Kind", "Name", "ID placeholder", "What it holds"]],
  "unverified": ["item left out of the build, with reason"]
}
```

### Validate the spec (required)

Write this validator to `validate.js` and run `node validate.js spec.json`. Fix every FAIL and rerun until it exits 0. Fix or explain every WARN. Each FAIL names the rubric criterion it protects.

```javascript
const fs = require("fs");
const S = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const KNOWN_STEPS = new Set(["browserless_scrape","search","api_call",
  "js_code_transformation","python_code_transformation","prompt_completion","claude_db_search","claude_db_upsert"]);
const WRITE_STEPS = /create|update|delete|send|save|post|upload|insert|upsert|append|share|move|trash/i;
const TRIGGERS = ["manual chat", "schedule", "webhook", "email", "tool trigger", "bulk run"];
const out = []; let fails = 0;
const fail = (id, msg) => { out.push(`FAIL ${id}: ${msg}`); fails++; };
const warn = (id, msg) => out.push(`WARN ${id}: ${msg}`);
const need = (o, keys, id) => keys.forEach(k => { if (o[k] === undefined || o[k] === "") fail(id, `missing ${k}`); });
const checkTests = (tests, id, min) => { tests = tests || [];
  if (tests.length < min) fail(id, `needs at least ${min} tests (E1)`);
  tests.forEach((t, i) => { if (!Array.isArray(t) || t.length !== 3) return fail(id, `tests[${i}] needs [input, pass condition, kind] (E2)`);
    if (/looks good|works|correct|reasonable/i.test(t[1]) && !/\d|=|contains|exact|equals|matched/i.test(t[1])) fail(id, `tests[${i}] pass condition is not checkable (E2)`); }); };
need(S, ["trigger", "master", "output", "order", "prereqs"], "root");
const order = S.order || [], keys = Object.keys(S);
const tools = keys.filter(k => S[k] && S[k].type === "Tool"), agents = keys.filter(k => S[k] && S[k].type === "Agent");
const nameKey = { Coordinator: "master", "Master Coordinator": "master" }; keys.forEach(k => { if (S[k] && S[k].name) nameKey[S[k].name] = k; });
const unverified = (S.unverified || []).join(" ");
order.forEach(k => { if (!S[k] || S[k].type !== "Agent") fail("order", `${k} is not an agent`); });
agents.forEach(k => { if (!order.includes(k)) fail("order", `agent ${k} missing from order`); });
if (S.trigger) { need(S.trigger, ["name", "id", "fn", "kind", "inputs", "tests"], "trigger");
  if (S.trigger.kind && !TRIGGERS.includes(S.trigger.kind)) fail("trigger", `kind ${S.trigger.kind} is not a supported trigger (W6)`);
  (S.trigger.inputs || []).forEach((r, i) => { if (r.length !== 4) fail("trigger", `inputs[${i}] needs 4 columns`); }); }
const M = S.master || {};
need(M, ["name", "id", "fn", "model", "prompt", "handoffs", "tests"], "master");
if (M.prompt && !/NEEDS_INPUT/.test(M.prompt)) fail("master", "prompt has no NEEDS_INPUT intake reply");
if (M.prompt && !/FAILED|error/i.test(M.prompt)) fail("master", "prompt has no failure path (W4)");
if (M.prompt && /REVISE|loop|retry|round/i.test(M.prompt) && !/(max|maximum|at most|limit)\D{0,20}\d/i.test(M.prompt)) fail("master", "loop has no round limit (W3)");
if (M.prompt && !/link/i.test(M.prompt)) fail("master", "final reply does not link the deliverable (W7, O5)");
agents.forEach(k => { const n = S[k] && S[k].name; if (n && M.prompt && !M.prompt.includes(n)) fail("master", `prompt never names ${n} (W1)`);
  const h = M.handoffs || [];
  if (!h.some(r => nameKey[r[0]] === "master" && r[1] === n)) fail("master", `no delegation handoff to ${n}`);
  if (!h.some(r => r[0] === n && nameKey[r[1]] === "master")) fail("master", `no return handoff from ${n}`); });
(M.handoffs || []).forEach((r, i) => { if (!nameKey[r[0]] || !nameKey[r[1]]) fail("master", `handoffs[${i}] names an unknown agent`);
  if (!r[3]) fail("master", `handoffs[${i}] states no data passed (W2)`); });
checkTests(M.tests, "master", 2);
if (!(M.tests || []).some(t => t[2] === "e2e")) fail("master", "no end-to-end test (E3)");
if (!(M.tests || []).some(t => t[2] === "failure")) fail("master", "no failure test (E5)");
agents.forEach(k => { const a = S[k];
  need(a, ["name", "id", "fn", "model", "model_reason", "trigger", "knowledge", "approval", "autonomy_limit", "autonomy_limit_behaviour", "returns", "tools", "prompt", "tests"], k);
  if (a.autonomy_limit_behaviour && !["ask-for-approval", "terminate-conversation"].includes(a.autonomy_limit_behaviour)) fail(k, "bad autonomy_limit_behaviour (A7)");
  checkTests(a.tests, k, 3);
  if (!(a.tests || []).some(t => t[2] === "missing")) fail(k, "no missing or wrong information test (E1)");
  const tl = (a.tools || []).length; if (tl < 1 || tl > 3) warn(k, `has ${tl} tools; Stage 1 allows 1 to 3`);
  if (a.prompt && !/never|do not invent|only (facts )?from|not found|missing|matched: false/i.test(a.prompt)) fail(k, "prompt has no missing-information or never-invent rule (A3)");
  if (a.prompt && !/output|return/i.test(a.prompt)) fail(k, "prompt states no output sections (A2, A9)");
  (a.tools || []).forEach((t, i) => { const tk = nameKey[t[0]];
    if (!tk || S[tk].type !== "Tool") return fail(k, `tools[${i}] "${t[0]}" has no tool spec`);
    if (!t[1]) fail(k, `tools[${i}] has no use-when line (A4)`);
    if (!["never-ask", "ask-first", "always-ask"].includes(t[2])) fail(k, `tools[${i}] bad action_behaviour ${t[2]}`);
    const writes = (S[tk].steps || []).some(st => WRITE_STEPS.test(st[2]) && st[2] !== "js_code_transformation");
    if (writes && t[2] === "never-ask") fail(k, `"${t[0]}" writes data but is never-ask (G5)`);
    if (a.prompt && !a.prompt.includes(t[0])) warn(k, `prompt never names tool "${t[0]}" (A4)`); }); });
tools.forEach(k => { const t = S[k];
  need(t, ["name", "id", "fn", "searched", "steplabel", "inputs", "steps", "schema", "output", "tests"], k);
  checkTests(t.tests, k, 1);
  if ((t.steps || []).length >= 3 && !t.notes) fail(k, "3 or more steps but no notes (T8)");
  const inputs = new Set((t.inputs || []).map(r => r[0]));
  (t.inputs || []).forEach((r, i) => { if (r.length !== 4) fail(k, `inputs[${i}] needs 4 columns`);
    if (!["string", "number", "array", "boolean", "object"].includes(r[1])) fail(k, `input ${r[0]} has bad type ${r[1]} (T3)`);
    if (!r[3]) fail(k, `input ${r[0]} has no title and description (T3)`); });
  const stepNames = [];
  (t.steps || []).forEach((st, i) => {
    if (st.length !== 4) fail(k, `steps[${i}] needs 4 columns`);
    if (unverified.includes(st[2])) fail(k, `step ${st[1]} uses UNVERIFIED ${st[2]}; leave it out of Stage 2`);
    if (!KNOWN_STEPS.has(st[2])) warn(k, `step ${st[1]} uses ${st[2]}: confirm with get_transformation (G1)`);
    if (st[2] === "prompt_completion") warn(k, `step ${st[1]} is an LLM step inside a tool: document the exception or move judgement to the agent (A5)`);
    if (st[2] === "search" && !/knowledge:/.test(st[3])) fail(k, `search step ${st[1]} has no knowledge:<id> dataset_id (G9)`);
    if (st[2] === "search" && !/query_type/.test(st[3])) fail(k, `search step ${st[1]} has no query_type`);
    if (/^claude_db_/.test(st[2]) && !(/store\s*:/.test(st[3]) && /base\s*:/.test(st[3]))) fail(k, `step ${st[1]} names no knowledge store and base (G9)`);
    if (st[2] === "claude_db_search" && !/status\s*==\s*active/.test(st[3])) fail(k, `search step ${st[1]} does not keep only active chunks (FA-02)`);
    if (WRITE_STEPS.test(st[2]) && /continue_on_error/.test(st[3])) fail(k, `write step ${st[1]} hides failures (T6)`);
    for (const m of String(st[3]).matchAll(/\{\{\s*params\.(\w+)/g)) if (!inputs.has(m[1])) fail(k, `step ${st[1]} references unknown input ${m[1]} (G3)`);
    for (const m of String(st[3]).matchAll(/\{\{\s*steps\.(\w+)/g)) if (!stepNames.includes(m[1])) fail(k, `step ${st[1]} references step ${m[1]} before it exists (G3)`);
    for (const m of String(st[3]).matchAll(/\{\{\s*(\w+)\s*\}\}/g)) if (!["organic"].includes(m[1])) fail(k, `step ${st[1]} uses bare {{${m[1]}}}; use {{params.${m[1]}}} (G3)`);
    if (/api[_-]?key\s*[:=]\s*["'][^"']{8,}/i.test(st[3])) fail(k, `step ${st[1]} contains a credential (G6)`);
    stepNames.push(st[1]); });
  for (const m of String(t.output).matchAll(/\{\{\s*steps\.(\w+)/g)) if (!stepNames.includes(m[1])) fail(k, `output references unknown step ${m[1]} (G3)`);
  if ((t.inputs || []).some(r => /account/i.test(r[0]) && !/oauth_account/.test(r[3]))) fail(k, "account input is not marked metadata.content_type: oauth_account (G6)");
  if (!agents.some(a => (S[a].tools || []).some(x => nameKey[x[0]] === k))) warn(k, "no agent uses this tool"); });
const O = S.output || {};
need(O, ["name", "id", "fn", "tree", "deliverables", "tests"], "output");
(O.deliverables || []).forEach((r, i) => { if (r.length !== 6) fail("output", `deliverables[${i}] needs 6 columns (O1)`);
  if (r[3] !== "master" && !agents.includes(r[3])) fail("output", `deliverables[${i}] producer ${r[3]} is not an agent key (O2)`);
  if (!r[2] || !r[4] || !r[5]) fail("output", `deliverables[${i}] lacks naming pattern, requirements, or check (O1, O2)`); });
const kids = new Set(); tools.forEach(k => (S[k].steps || []).forEach(st => { const m = String(st[3]).match(/knowledge:(\w+)/); if (m) kids.add(m[1]); const b = /^claude_db_/.test(st[2]) && String(st[3]).match(/base\s*:\s*([\w-]+)/); if (b) kids.add(b[1]); }));
agents.forEach(a => { const m = String(S[a].knowledge || "").match(/kb:([\w-]+)/); if (m) kids.add(m[1]); });
kids.forEach(id => { if (!(S.prereqs || []).some(r => r[2] === id)) fail("prereqs", `knowledge id ${id} is not listed`); });
console.log(out.join("\n") || "No findings.");
console.log(`\n${agents.length} agents, ${tools.length} tools, ${fails} FAIL, ${out.length - fails} WARN`);
process.exit(fails ? 1 : 0);
```

### Spec-level grade

After the validator exits 0, grade `spec.json` against the Grading rubric section. Grade every criterion the spec can show. Mark criteria that need a live build (G8, T9 test runs, E6, FA-02, TC-04, V criteria before Stage 4) as N/A with a one-line reason. Fix every failed gate before Stage 3.

## Stage 3: Build and Test in Claude Code

Build each component through the local `workforce` MCP server in dependency order. Every agent run goes through `claude -p` on this machine.

0. **Knowledge**: create each knowledge table (`create_knowledge_set`), load it (`import_knowledge_file` or `add_knowledge_rows`), and run one `claude_db_search` per table to prove the top hit is right. A failed test is a stop, not a pass.

1. **Tools**: create each tool (`create_tool` or `create_tool_from_transformation`, then `add_tool_step` or `update_tool_steps`, then `set_tool_output`). Run its sample test with `run_tool` on the draft, and compare the result with the expected output. Never run a write tool against live data; test it only with a simulated run or a sandbox target the person named.
2. **Agents**: create each agent (`create_agent`), attach only its own tools (`attach_tools_to_agent`) with the spec's action behaviour, and set triggers (`create_trigger`; a schedule trigger returns a `fire_command` to put in cron or a Claude Code scheduled task). Run each test message (`trigger_agent`, then `poll_agent_result`).
3. **Workforce**: create the workforce (`create_workforce`), then run the end-to-end test and the failure test (`trigger_workforce`, then `poll_workforce_task_result`).
4. **Evals**: create the test sets, test cases, and Checks from the eval plan (`create_eval_test_set`, `create_eval_test_case`, `create_eval_check`, `set_eval_test_case_simulation_config`), and the pre-publish config (`upsert_pre_publish_config`). Run them with `run_evaluation`, poll with `poll_eval_batch_result`, then `publish_agent`; publishing writes `.claude/agents/<name>.md` so each agent also runs as a Claude Code subagent.
5. Replace each placeholder ID with the real ID in `spec.json` and in the per-component specs.
6. **Full grade**: run the rubric's grading agent prompt on the draft, read only. Report the verdict, gate results, eval readiness sub-score, and top 3 fixes.

Report every component with its ID, test results, and status. If the workforce server is not registered, run `INSTALL.md` Step 0, then continue. If `claude -p` fails (`CLAUDE_FAILED`), report the error and the components already built, and stop. If a build call fails, read `references/platform-skills/managing-agents/troubleshooting.md` or `references/platform-skills/managing-workforces/debugging.md` before you retry.

## Stage 4: Build the canvas page

Build the page from the reference canvas, not from scratch:

1. Copy the reference page's HTML, CSS, and script.
2. Replace its data block (`const D = {...}`) with the spec: `trigger`, `master`, each agent, `output`, and each tool, keeping the reference field names. Use real IDs where Stage 3 created them.
3. Replace every hard-coded Content Army key: the agent order list (`ORDER`), the icon map (`D_EXTRA`), and the per-agent CSS selectors (`#n_<key> .nh`). Give each agent a fitting line icon (V7).
4. Add a trigger card on the left with the request fields, and a Prerequisites section at the top of the All specs tab from `prereqs`.
5. Keep the layout, colors, fonts, edges, side panel, links, model dropdowns, All specs tab, and edit mode.
6. Render the page at 1440 px and 390 px wide. Grade V1 to V10 from the rubric. Fix overlapping cards, crossed lines, cut-off labels, off-palette colors, and script errors.
7. Publish it as a new artifact titled `Stage 2 Build Map: <Workforce name>`. Never overwrite the reference artifact. If the artifact tools are absent, write a standalone `.html` file and send it.

## Finish

Reply with the build-map link, the per-component spec link, the validator result (FAIL and WARN counts), the rubric verdict with its score and eval readiness sub-score, every component ID and test result from Stage 3, and every UNVERIFIED item or open question the person must settle before the workforce runs.

## Grading rubric: Configuration Grading Rubric

Version: Nov 16, 2026. This rubric grades one build with 77 pass/fail criteria: one workforce, its Master Coordinator, the sub-agents, the tools, the knowledge sets, the deliverable spec, and the visual design of the build map. Twelve gate criteria fail the build on their own: G1 to G9, plus FA-03, CA-01, and CA-05. The other criteria add up to a weighted score. This skill runs the rubric twice: on `spec.json` before Stage 3, and on the live draft after Stage 3.

### Grader rules

- **Evidence**: every result cites the field it checked and the value it found, for example `actions[2].action_behaviour = never-ask`. A result with no evidence counts as FAIL.
- **Read only**: the grader never changes the configuration. It never runs a tool step that sends, posts, creates, updates, or deletes anything. It runs a read step only to look at sample data.
- **Version**: the grader states which version it graded, the unpublished draft or the live version.
- **Sources of truth**: a step is valid when `get_transformation` returns its schema. A model is valid when `list_llm_models` shows `status: available`.
- **Read tools**: `get_workforce`, `get_agent`, `get_agent_tools`, `get_tool` (with `version: draft`), `get_transformation`, `list_llm_models`, `list_knowledge_sets`, `list_agent_triggers`, `list_eval_test_sets`, `list_eval_test_cases`, `list_eval_checks`, `get_pre_publish_status`, `list_performance_dashboards`, `list_tool_runs`.

### Scoring

| Weight | Points | Meaning |
|---|---|---|
| Gate | Pass or FAIL | The build cannot run correctly or safely. One failed gate fails the build, whatever the score. |
| Major | 3 | The build runs, but it gives wrong, unsafe, or unverifiable results. |
| Minor | 1 | The build works, but it is harder to maintain, test, or hand over. |

Score = points earned ÷ points possible, over the Major and Minor criteria only. A criterion that does not apply is marked N/A with a one-line reason and leaves the total.

| Verdict | Rule |
|---|---|
| PASS | All gates pass and the score is 90 percent or higher. |
| PASS WITH DISCLOSED LIMITATIONS | All gates pass and the score is 75 to 89 percent. The report lists every failed criterion with its fix. |
| FAIL | Any gate fails, or the score is under 75 percent. |

The eval readiness sub-score can lower the verdict. A sub-score under 70 makes the build FAIL. A sub-score of 70 to 84, or one dimension under its minimum, caps the verdict at PASS WITH DISCLOSED LIMITATIONS.

### Gate criteria

| ID | Criterion | How to verify |
|---|---|---|
| G1 | Every tool step's transformation exists in the workforce server's step catalog. | `get_transformation` returns a schema for each step ID. |
| G2 | Every step param is named in that transformation's `input_schema`, and every required input is set. | Compare each step's params keys with `input_schema.properties` and `required`. |
| G3 | Tool inputs are referenced as `{{params.<name>}}` and earlier step outputs as `{{steps.<step>.output.<field>}}`. No reference points to a missing or renamed step. | Search each tool's steps and output map for `{{`. Check every name against `params_schema` and the step list. |
| G4 | Every agent and the coordinator use a model whose status is available. | Look up each model in `list_llm_models` (subset AGENT). |
| G5 | Every tool that sends, posts, creates, updates, or deletes data is attached with `ask-first` or `always-ask`, unless the spec states why it may run unattended. | `get_agent_tools`: classify each tool by what its steps do, not by its name. |
| G6 | No credential sits in a tool or agent. OAuth accounts are `params_schema` inputs with `metadata.content_type: oauth_account`. No API key appears in a default value, a code step, or a prompt. | Read `params_schema`, step params, code, and system prompts. |
| G7 | Agents hand off work through a workforce. No agent lists another agent in its actions. | `get_agent`: `actions[]` holds tools only. `get_workforce` shows the handoffs. |
| G8 | Every attached tool resolves: each action carries the right project and region. | `get_agent_tools` returns a non-empty `chains` list and an `actionIdMap` for each agent. |
| G9 | Every knowledge search reads a real knowledge base. | Knowledge store: `db_get` on `kb/<base>/meta/stats` in the named artifact returns `exists: true`, and every agent that reads it runs in Claude. Platform table: `dataset_id = knowledge:<id>`, and that ID appears in `list_knowledge_sets`. |

### Workforce and Master Coordinator

| ID | Weight | Criterion | How to verify |
|---|---|---|---|
| W1 | Major | The coordinator's prompt names every specialist and the condition that sends work to it. | Match each agent in the workforce to a routing rule in the prompt. |
| W2 | Major | Each handoff states the data it passes. The receiver gets everything it needs in the message, not from shared memory. | Compare the data passed with the inputs the receiver's prompt asks for. |
| W3 | Major | Every loop has a maximum round count and a stop condition. | Find each back edge, such as a REVISE path, and its limit in the prompt. |
| W4 | Major | The coordinator has a failure path for an agent error or FAILED result. | The prompt states the action and what the user is told. |
| W5 | Minor | The coordinator does no specialist work and has no tools that duplicate a specialist's tools. | Compare the coordinator's actions with each specialist's actions. |
| W6 | Major | The trigger matches the job. Per-item work starts one task per item through a tool trigger or bulk run, not a loop inside one task. | `list_agent_triggers` and the workforce trigger node. |
| W7 | Minor | The final reply states the status of each step and links the deliverable. | Read the prompt's closing instruction. |

### Sub-agents

Grade every agent separately. A criterion passes only if it passes for every agent.

| ID | Weight | Criterion | How to verify |
|---|---|---|---|
| A1 | Minor | The agent has one job, stated in a one-sentence description. | Read `description`. Two unrelated jobs = FAIL. |
| A2 | Major | The prompt states the expected inputs, the steps in order, and the exact output sections or fields. | Read `system_prompt`. All three must be present. |
| A3 | Major | The prompt says what to do when information is missing or a source is not found, and forbids inventing it. | Find the explicit fallback instruction. |
| A4 | Major | The prompt references each attached tool with a `{{_actions.<action_id>}}` pill and a "use when" condition. | Match the pills to `actionIdMap` from `get_agent_tools`. |
| A5 | Major | Judgement lives in the agent's prompt, not in an LLM step inside a tool. | List every tool with a `prompt_completion` step. Each needs a documented exception, such as per-document extraction. |
| A6 | Minor | Every agent variable used in the prompt exists and has a value. | Compare each `{{name}}` in the prompt with the agent's variables. |
| A7 | Minor | `autonomy_limit` is set, and `autonomy_limit_behaviour` is `ask-for-approval` or `terminate-conversation`. | Read the agent config. |
| A8 | Minor | The model fits the task: low-cost for extraction or routing, stronger for drafting or judgement, with a one-line reason. | Compare the model's credits per token with the task. |
| A9 | Major | The output format is one the next agent or a check can read: named sections or JSON. | Read the prompt's output section. |
| A10 | Minor | Each knowledge set is attached only to agents that use it, and the prompt says when to search it. | Compare knowledge with the prompt. |

### Tools

A criterion passes only if it passes for every tool.

| ID | Weight | Criterion | How to verify |
|---|---|---|---|
| T1 | Minor | The builder searched an existing project tool, then a public tool, then a catalog step before building. | The spec names what was searched and why a new tool was needed. |
| T2 | Major | Each step uses a native transformation when one exists. A third-party step appears only when no native one covers the action, and the spec says so. | `provider_source` from `get_transformation`. |
| T3 | Major | Every input in `params_schema` has a type, a title, and a description. The required list matches what the steps need. | Read `params_schema`. |
| T4 | Major | Filtering happens in the fetch step's own query where a field can do it. The tool returns records plus counts (scanned, kept), not a write-up. | Read the fetch step params and the output map. |
| T5 | Major | The keys in `transformations.output` match the keys in `output_schema`. | Compare the two key lists. |
| T6 | Major | A write tool reports the write step's own result. No write step uses `continue_on_error` or a fallback that hides a failure. | Read the write step and the output map. |
| T7 | Minor | The description says when to use the tool and what it returns. | Read `description` and `prompt_description`. |
| T8 | Minor | A tool with 3 or more steps, or non-obvious logic, has notes that explain it. | Look for markdown notes on the tool. |
| T9 | Major | The tool has a recorded test run on the draft, with its input and output. | `list_tool_runs` or the spec's test log. |
| T10 | Minor | Code steps make no network calls a native step could make, and hold no secrets. | Read each `js_code_transformation` and `python_code_transformation` step. |

### Testing and evals

| ID | Weight | Criterion | How to verify |
|---|---|---|---|
| E1 | Major | Each agent has at least 3 test cases, including one where information is missing or wrong. | `list_eval_test_sets` or the spec's tests. |
| E2 | Major | Every test has a checkable pass condition: a count, a search, or an exact value. "Looks good" does not count. | Read each pass condition. |
| E3 | Major | The workforce has an end-to-end test that runs every handoff at least once, including one loop round. | Trace the end-to-end test's path. |
| E4 | Major | Tools that write to outside systems are simulated in evals. | Read each write tool's simulation config. |
| E5 | Minor | A failure test proves a failed check produces no deliverable and a clear message. | Find the failure test and its expected result. |
| E6 | Minor | Pre-publish checks run the test set before each publish. | `get_pre_publish_status`. |

### Output and deliverable

| ID | Weight | Criterion | How to verify |
|---|---|---|---|
| O1 | Major | The spec names every deliverable, where it is saved, and its file naming pattern. | Read the deliverable package spec. |
| O2 | Major | Every deliverable has written requirements, the agent that produces it, and the check that verifies it. | Each deliverable row has all three. |
| O3 | Major | A run that fails its final check saves no deliverable and tells the user which checks failed. | Trace the QA agent's prompt and the save tool's approval gate. |
| O4 | Minor | Requirement IDs or section names carry through every stage unchanged. | Compare names in the plan, the draft, and the final output spec. |
| O5 | Minor | The final reply links to every saved file. | Read the coordinator's closing instruction. |

### Visual design

Grade the build map against the named design system. For each FAIL, give the element, its current value, and the value to use.

| ID | Weight | Criterion | How to verify |
|---|---|---|---|
| V1 | Major | Every color comes from the design system's tokens. | Sample computed colors of text, fills, borders, and lines. |
| V2 | Major | Type follows the system's face, size order, and minimums. NEEDL: Verdana, body 9pt or larger, tables 7pt or larger. | Read computed `font-family` and `font-size` per text role. |
| V3 | Major | Contrast meets WCAG AA: 4.5:1 body, 3:1 large text. NEEDL: red text on white only at 12pt or larger. | Compute each text and background ratio. |
| V4 | Minor | Spacing uses one scale, such as multiples of 4 or 8 px, with equal sibling gaps and card padding. | Measure the rendered page. |
| V5 | Major | One reading path: input on one side, output on the other, steps numbered. No line crosses a node, no label overlaps another. | Inspect at fit-to-screen. |
| V6 | Minor | The accent color marks only active, approval, or key items, about 5 percent of the area or less. | Count accent elements. |
| V7 | Minor | Icons share one style at one stroke width. No emoji. | Inspect every icon. |
| V8 | Minor | Elements of one type look the same everywhere. | Compare cards and tables side by side. |
| V9 | Minor | Nodes align to a grid, cards of one type share a width, and text alignment is consistent. | Measure node positions and widths. |
| V10 | Major | The page stays legible at 1440 px and 390 px wide, with no truncated labels or clipped controls. | Render both widths and read every label. |

### Eval and behavior audit

These 20 checks grade the Evaluate area: Tests, Checks, Publish settings, and Monitor dashboards. FA-03, CA-01, and CA-05 are gates.

| ID | Weight | Points | Criterion | How to verify |
|---|---|---|---|---|
| FA-01 | Major | 8 | The prompt says when and how to search connected Knowledge before answering. | Find the Knowledge lookup instruction. |
| FA-02 | Major | 6 | Metadata filters on Knowledge exclude stale, draft, or out-of-scope records. | Knowledge store: every search step filters `status == active`. Platform table: confirm active filter rules in Knowledge settings. |
| FA-03 | Gate | 6 | At least one AI Judge Check verifies every factual claim traces to Knowledge or tool output. | Confirm an active grounding prompt in Evaluate > Checks. |
| FA-04 | Minor | 5 | Text Includes or Text Equals Checks verify required figures, IDs, or disclaimers on golden-path Tests. | Confirm the Checks on core Tests. |
| FA-05 | Minor | 5 | Accuracy AI Judge Checks that need turn-one context have Truncate long conversations off and a large-context judge model. | Expand Advanced in the Check editor. |
| CA-01 | Gate | 8 | Tool Usage Checks enforce required or forbidden calls with an exact rule: At least, At most, Exactly, Used first, or Used last. | Inspect each Check's count and order rule. |
| CA-02 | Major | 6 | Tool Usage Checks assert parameters with Add input condition: Equals, Contains, Has a value, or Matches pattern. | Confirm conditions on every state-changing tool's Check. |
| CA-03 | Major | 6 | Each workforce Tool Usage Check is scoped to the agent node allowed to call that tool. | Confirm node-level scoping. |
| CA-04 | Minor | 5 | Every Test has 10 Checks or fewer; cross-cutting rules run as Additional checks. | Count Checks per Test. |
| CA-05 | Gate | 5 | Every tool with side effects is Simulated in automated Test runs. | Confirm write tools are Simulated in each Test. |
| TC-01 | Minor | 5 | The prompt states persona, voice limits, formatting rules, and 2 to 3 ideal input and output examples. | Review the Prompt tab. |
| TC-02 | Minor | 5 | One reusable AI Judge tone Check is attached to every customer-facing Test set. | Filter Checks by In tests. |
| TC-03 | Minor | 4 | The Test suite includes a Frustrated user preset or another adversarial persona. | Check Evaluate > Test. |
| TC-04 | Minor | 3 | The tone Check runs on a live Monitor dashboard. | Filter Checks by In dashboard. |
| TC-05 | Minor | 3 | Core persona Tests set Run N times to 3 or more. | Inspect Test settings. |
| EC-01 | Minor | 5 | Test sets cover Vague request, Off-topic request, Follow-up, and Happy path. | Confirm all four presets. |
| EC-02 | Minor | 4 | Multi-turn edge-case Tests set Up to N messages to 10 or more. | Confirm the setting. |
| EC-03 | Minor | 4 | Approval and escalation paths are tested under both Approve all and Reject all. | Confirm one Test per behavior. |
| EC-04 | Minor | 4 | Negative-path simulated tool descriptions include an error, a timeout, or an empty result. | Inspect simulated descriptions. |
| EC-05 | Minor | 3 | Malformed inputs and boundary values are pinned with + Set exact first message. | Confirm exact opening messages. |

**Eval readiness sub-score**: a Yes earns the check's points; a No earns 0.

| Dimension | Max points | Minimum | Main risk |
|---|---|---|---|
| Factual accuracy | 30 | 25 (83%) | Invented claims or stale Knowledge |
| Constraint adherence | 30 | 26 (87%) | Unauthorized tool calls or live side effects during tests |
| Tone consistency | 20 | 15 (75%) | Voice drift under adversarial prompts |
| Edge-case handling | 20 | 15 (75%) | Unhandled rejections, loops, or empty tool results |
| Total | 100 | 85 (production ready) | |

- **Pass**: 85 to 100, every dimension at or above its minimum. Cleared for Publish.
- **Conditional hold**: 70 to 84, or one dimension below its minimum. Fix the failing Checks or add the missing presets first.
- **Fail**: under 70, or FA-03, CA-01, or CA-05 answered No. Block the release.

### Regression rules

- **Block failing publishes**: in Evaluate > Publish, attach the core regression Test sets. Set Minimum pass rate to 100 percent for critical-path sets, or 90 percent or higher for broader suites. Leave Allow publishing even if eval fails unchecked.
- **Freeze baselines**: keep golden-path scenarios and their Checks unchanged across prompt, tool, and model changes.
- **Monitor live runs**: one Monitor dashboard per dimension. Sample 5 to 10 percent for high-volume work, 100 percent for low-volume, high-risk work.
- **Check scores after every publish**: a drop of 5 percent or more on one Check, or two falling intervals in a row, triggers a rollback or a hotfix Test.
- **Turn live failures into Tests**: add each failing user prompt to a regression Test set with + Set exact first message.
- **Archive unused Checks**: filter Checks by Unused from time to time and archive orphans.

### Sample Check setup

1. **Tool Usage Check (CA-01, CA-02)**: select the lookup tool. Set When the tool is used by the agent to At least 1, or Used first. Add an input condition with the required key set to Has a value.
2. **AI Judge Check (FA-03, FA-05)**: turn off Truncate long conversations, choose a large-context judge model, and paste:

```text
Evaluate ONLY whether the agent's factual claims are strictly supported by retrieved Knowledge or Tool outputs in this transcript.
PASS if every stated figure, policy, or entity appears in a Knowledge snippet or Tool response, or if the agent explicitly states the information is unavailable.
FAIL if the agent invents figures, extrapolates unverified policies, or ignores contradicting Tool output.
Return a single PASS or FAIL verdict with one sentence citing the exact unsupported claim if FAIL.
```

### Grader report

Return one report, verdict first: verdict and score percentage; version graded (draft or live, with version ID); gate results (G1 to G9, FA-03, CA-01, CA-05); eval readiness sub-score with each dimension against its minimum; one row per criterion (ID, PASS, FAIL, or N/A, evidence as field path and value, fix for each FAIL); the top 3 fixes by weight; and, for each failed V criterion, the element, its current value, and the design-system value to use.

### Grading agent prompt

```text
You grade one AI workforce build against the Configuration Grading Rubric.

Inputs: the workforce ID, and the deliverable spec if one exists.

Rules:
1. Read only. Never run, publish, or change anything. Never run a tool step that sends, posts, creates, updates, or deletes data.
2. Read the build with get_workforce, get_agent, get_agent_tools, get_tool (version: draft), list_agent_triggers, and list_eval_test_sets.
3. Check validity against the live catalog: get_transformation for every step, list_llm_models for every model, list_knowledge_sets for every knowledge search.
4. Grade every criterion, G1 to G9, W1 to W7, A1 to A10, T1 to T10, E1 to E6, O1 to O5, V1 to V10, and the 20 eval checks FA-01 to EC-05. Read the eval setup with list_eval_test_sets, list_eval_test_cases, list_eval_checks, get_pre_publish_status, and list_performance_dashboards. Grade A and T criteria for every agent and tool. One failure fails that criterion.
5. Cite evidence for every result: the field path and the value you found. No evidence = FAIL.
6. Score: Major = 3 points, Minor = 1 point. N/A leaves the total and needs a one-line reason.
7. Score the 20 eval checks again on their own 100-point scale, with dimension minimums: accuracy 25, constraints 26, tone 15, edge cases 15. An eval sub-score under 70 = FAIL. A sub-score of 70 to 84, or a missed minimum, caps the verdict at PASS WITH DISCLOSED LIMITATIONS.
8. Verdict: any gate FAIL = FAIL. Gates are G1 to G9, FA-03, CA-01, and CA-05. Otherwise 90 percent or higher = PASS, 75 to 89 percent = PASS WITH DISCLOSED LIMITATIONS, under 75 percent = FAIL.
9. For V criteria, render the build map at 1440 px and 390 px wide. Compare colors, fonts, sizes, contrast, and spacing with the design system the spec names. For each FAIL, give the element, its current value, and the design-system value to use instead.

Return: verdict and score, version graded, gate results, one row per criterion (ID, result, evidence, fix), the eval readiness sub-score, the top 3 fixes, and the visual enhancements.
```