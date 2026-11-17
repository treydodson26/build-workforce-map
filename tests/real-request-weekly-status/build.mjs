// Stage 3: build the spec through the local workforce MCP server, over real MCP stdio.
// Usage: node build.mjs <server.js> <project dir>
import fs from "node:fs";
import path from "node:path";
const SDK = "/home/claude/work/server/workforce-mcp-server/node_modules/@modelcontextprotocol/sdk/dist/esm";
const { Client } = await import(`${SDK}/client/index.js`);
const { StdioClientTransport } = await import(`${SDK}/client/stdio.js`);

const [server, proj] = process.argv.slice(2);
fs.mkdirSync(proj, { recursive: true });
const S = JSON.parse(fs.readFileSync(new URL("./spec.json", import.meta.url)));
const t = new StdioClientTransport({ command: "node", args: [server], cwd: proj, env: { ...process.env, WORKFORCE_WINDOWS_ROOT: path.join(proj, "winroot") }, stderr: "ignore" });
const c = new Client({ name: "stage3-build", version: "1" });
await c.connect(t);
const log = [];
async function call(name, args) {
  const r = await c.callTool({ name, arguments: args });
  const body = JSON.parse(r.content[0].text);
  log.push({ tool: `mcp__workforce__${name}`, args, ok: !r.isError, result: body });
  if (r.isError && !name.startsWith("trigger_") && !name.startsWith("outlook_") && !name.startsWith("com_")) throw new Error(`${name}: ${JSON.stringify(body)}`);
  return { ok: !r.isError, body };
}
const ids = {};

// 0. Knowledge
await call("create_knowledge_set", { name: "status_templates", description: "RAG rules and weekly report template (base rag-rules)" });
await call("run_transformation", { transformation_id: "claude_db_upsert", params: { store: "status_templates", rows: [
  { _id: "rag-rules-1", base: "rag-rules", status: "active", text: "RAG rules: Red when any critical task is overdue or more than 20 percent of open tasks are overdue. Amber when any task is overdue. Green when no task is overdue." },
  { _id: "template-1", base: "rag-rules", status: "active", text: "Status report sections, in order: Summary, Workstream status table, Risks and mitigations, Next week, Decisions needed." },
  { _id: "rag-rules-0", base: "rag-rules", status: "stale", text: "Old RAG rules: Red only when the project is late." }] } });
const kb = await call("run_transformation", { transformation_id: "claude_db_search", params: { store: "status_templates", query: "RAG rules overdue critical" } });
const kbNone = await call("run_transformation", { transformation_id: "claude_db_search", params: { store: "status_templates", query: "zebra migration" } });

// 1. Tools (local steps only; COM operations attach as MCP tools in step 2)
const roll = S.t_rollup;
ids.t_rollup = (await call("create_tool", { name: roll.name, description: roll.fn, inputs: roll.inputs.map(([n, ty, rq, d]) => ({ name: n, type: ty, required: rq === "required", description: d })),
  steps: [{ name: "rollup", transformation: "js_code_transformation", params: { code: roll.steps[0][3].replace(/^code:\s*/, "") } }],
  output: { rows: "{{rollup.transformed.rows}}", rollup: "{{rollup.transformed.rollup}}", row_count: "{{rollup.transformed.row_count}}" } })).body.id;
const rollRun = await call("run_tool", { tool_id: ids.t_rollup, params: { as_of: "2026-11-20", values: [["ID", "Workstream", "Status", "Due"], ["T1", "A", "Done", "2026-11-10"], ["T2", "A", "Open", "2026-12-01"], ["T3", "B", "Open", "2026-11-12"]] } });
const tmpl = S.t_template;
ids.t_template = (await call("create_tool", { name: tmpl.name, description: tmpl.fn, inputs: [{ name: "query", type: "string", required: true }],
  steps: [{ name: "kb", transformation: "claude_db_search", params: { store: "status_templates", query: "{{params.query}}", top_k: 3, filters: { status: "active", base: "rag-rules" } } }],
  output: { results: "{{kb.results}}" } })).body.id;
const tmplRun = await call("run_tool", { tool_id: ids.t_template, params: { query: "RAG rules" } });
for (const k of ["t_rollup", "t_template"]) await call("publish_tool", { tool_id: ids[k], note: "Stage 3 build" });

// 2. Agents
const COM = { reader: ["excel_read_range"], drafter: ["word_create_document"], delivery: ["outlook_create_draft"] };
const LOCAL = { reader: ["t_rollup"], analyst: ["t_template"], drafter: ["t_template"], reviewer: ["t_template"] };
for (const k of S.order) {
  const a = S[k];
  ids[k] = (await call("create_agent", { name: a.name, description: a.fn, system_prompt: a.prompt, model: a.model, knowledge_ids: a.knowledge.startsWith("kb:") ? ["status_templates"] : [] })).body.id;
  if (LOCAL[k]) await call("attach_tools_to_agent", { agent_id: ids[k], tool_ids: LOCAL[k].map(x => ids[x]) });
  if (COM[k]) {
    await call("attach_mcp_server_to_agent", { agent_id: ids[k], server_name: "workforce", tools: COM[k] });
    const writes = COM[k].filter(x => !/read/.test(x));
    if (writes.length) await call("update_agent_mcp_server_approvals", { agent_id: ids[k], server_name: "workforce", approvals: Object.fromEntries(writes.map(x => [x, k === "delivery" ? "always-ask" : "ask-first"])) });
  }
}

// 3. Workforce: linear pipeline with the reviewer loop (REVISE edge first, so it wins when the reply says REVISE)
const nodes = S.order.map(k => ({ id: k, agent_id: ids[k] }));
const edges = [{ from: "reader", to: "analyst" }, { from: "analyst", to: "drafter" }, { from: "drafter", to: "reviewer" },
  { from: "reviewer", to: "drafter", condition: "REVISE" }, { from: "reviewer", to: "delivery" }];
ids.master = (await call("create_workforce", { name: S.master.name, description: S.master.prompt, nodes, edges })).body.id;
const trig = await call("create_trigger", { target_id: ids.master, target_type: "workforce", type: "schedule", config: { cron: "0 15 * * 5", timezone: "America/New_York" }, message: "Run the weekly status report for this week." });

// 4. Evals
const ts = (await call("create_eval_test_set", { name: "Weekly status workforce", target_id: ids.master })).body.id;
for (const [input, pass, kind] of S.master.tests) {
  const tc = (await call("create_eval_test_case", { test_set_id: ts, name: `${kind}: ${input.slice(0, 40)}`, input, expected: pass })).body.id;
  await call("set_eval_test_case_simulation_config", { test_case_id: tc, config: { simulate_tools: ["outlook_create_draft", "word_create_document"] } });
}
for (const k of S.order) await call("publish_agent", { agent_id: ids[k], note: "Stage 3 build" });
await call("publish_workforce", { workforce_id: ids.master, note: "Stage 3 build" });

// 5. Live checks that need the host: claude -p and Office COM
const e2e = await call("trigger_workforce", { workforce_id: ids.master, message: S.master.tests[0][0], wait: true });
const com = await call("com_host_check", {});

fs.writeFileSync(path.join(proj, "ids.json"), JSON.stringify(ids, null, 1));
fs.writeFileSync(path.join(proj, "build-log.json"), JSON.stringify(log, null, 1));
console.log(JSON.stringify({ ids, kb_top: kb.body.results[0]?.row?._id, kb_no_match: kbNone.body.results.length, rollup_test: rollRun.body.output?.rollup, template_test_top: tmplRun.body.output?.results?.[0]?.row?._id,
  trigger: trig.body.type, e2e: { status: e2e.body.status, error: e2e.body.error }, com_host: com.body,
  agent_files: fs.readdirSync(path.join(proj, ".claude", "agents")) }, null, 1));
await c.close();
