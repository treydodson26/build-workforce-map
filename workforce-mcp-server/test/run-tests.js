// End-to-end tests over a real MCP stdio connection.
// Uses test/fake-claude.js unless WORKFORCE_CLAUDE_BIN is set, so tests run offline.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "wf-test-"));
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [path.join(here, "..", "src", "server.js")],
  cwd: tmp,
  env: { ...process.env, WORKFORCE_WINDOWS_ROOT: process.env.WORKFORCE_WINDOWS_ROOT || path.join(tmp, "winroot"), WORKFORCE_HOME: path.join(tmp, ".workforce"), WORKFORCE_CLAUDE_BIN: process.env.WORKFORCE_CLAUDE_BIN || path.join(here, "fake-claude.js") },
  stderr: "ignore",
});
const client = new Client({ name: "workforce-tests", version: "1.0.0" });
await client.connect(transport);

let pass = 0, fail = 0;
const results = [];
async function call(name, args = {}) {
  const r = await client.callTool({ name, arguments: args });
  const body = JSON.parse(r.content[0].text);
  return { ok: !r.isError, body };
}
async function test(name, fn) {
  try { await fn(); pass++; results.push(`PASS  ${name}`); }
  catch (e) { fail++; results.push(`FAIL  ${name}: ${e.message}`); }
}
const assert = (c, m) => { if (!c) throw new Error(m); };
const wait = ms => new Promise(r => setTimeout(r, ms));

let agent, tool, kb = "faq", wf, tset, batch;

const OLD_VENDOR = new RegExp(["rele", "vance"].join(""), "i");
await test("lists 203 tools; none carries the old vendor name", async () => {
  const { tools } = await client.listTools();
  assert(tools.length === 203, `got ${tools.length}`);
  assert(!tools.some(t => OLD_VENDOR.test(t.name + t.description)), "a tool mentions the old vendor");
  fs.writeFileSync(process.env.WF_TOOLS_LIST_OUT || path.join(tmp, "tools-list.json"), JSON.stringify(tools, null, 1));
});
await test("get_project_info reports the store and the Claude CLI", async () => {
  const r = await call("get_project_info"); assert(r.ok && r.body.claude_cli.includes("fake"), JSON.stringify(r.body));
});
await test("create_agent + get_agent", async () => {
  const r = await call("create_agent", { name: "Billing Helper", system_prompt: "You resolve billing questions.\nAlways be brief.", model: "haiku" });
  assert(r.ok, JSON.stringify(r.body)); agent = r.body.id;
  assert((await call("get_agent", { agent_id: agent })).body.name === "Billing Helper", "name mismatch");
});
await test("missing required param returns INVALID_INPUT", async () => {
  const r = await call("create_agent", {}); assert(!r.ok && r.body.error === "INVALID_INPUT", JSON.stringify(r.body));
});
await test("unknown ID returns NOT_FOUND with a hint", async () => {
  const r = await call("get_agent", { agent_id: "agent_nope" }); assert(!r.ok && r.body.error === "NOT_FOUND" && r.body.hint, JSON.stringify(r.body));
});
await test("edit_agent_system_prompt + search_agent_system_prompt", async () => {
  assert((await call("edit_agent_system_prompt", { agent_id: agent, old_string: "Always be brief.", new_string: "Always be brief and kind." })).ok, "edit failed");
  const s = await call("search_agent_system_prompt", { agent_id: agent, pattern: "kind" });
  assert(s.body.matches.length === 1 && s.body.matches[0].line === 2, JSON.stringify(s.body));
});
await test("create_tool with a JS step and run_tool", async () => {
  const r = await call("create_tool", { name: "Add numbers", inputs: [{ name: "a" }, { name: "b" }], steps: [{ name: "sum", transformation: "js_code_transformation", params: { code: "return params.a + params.b;" } }], output: { total: "{{sum.transformed}}" } });
  assert(r.ok, JSON.stringify(r.body)); tool = r.body.id;
  const run = await call("run_tool", { tool_id: tool, params: { a: 2, b: 3 } });
  assert(run.body.status === "complete" && run.body.output.total === 5, JSON.stringify(run.body));
});
await test("python step runs and returns a value", async () => {
  const r = await call("run_transformation", { transformation_id: "python_code_transformation", params: { code: "result = {'n': len('hello')}" } });
  assert(r.ok && r.body.transformed.n === 5, JSON.stringify(r.body));
});
await test("unsupported step type is rejected", async () => {
  const r = await call("add_tool_step", { tool_id: tool, step: { name: "x", transformation: "vendor_web_search", params: {} } });
  assert(!r.ok && r.body.error === "UNSUPPORTED", JSON.stringify(r.body));
});
await test("step editing: add, move, update, remove", async () => {
  await call("add_tool_step", { tool_id: tool, step: { name: "double", transformation: "js_code_transformation", params: { code: "return steps.sum.output.transformed * 2;" } } });
  await call("move_tool_step", { tool_id: tool, step_name: "double", position: 1 });
  await call("set_tool_output", { tool_id: tool, output: { total: "{{double.transformed}}" } });
  const run = await call("run_tool", { tool_id: tool, params: { a: 2, b: 3 } });
  assert(run.body.output.total === 10, JSON.stringify(run.body));
  const rm = await call("remove_tool_step", { tool_id: tool, step_name: "double" }); assert(rm.body.steps.length === 1, "remove failed");
});
await test("publish_tool, list_tool_versions, restore_tool_version", async () => {
  const p = await call("publish_tool", { tool_id: tool, note: "v1" }); assert(p.body.version === 1, "version");
  await call("update_tool", { tool_id: tool, name: "Renamed" });
  await call("restore_tool_version", { tool_id: tool, version: 1 });
  assert((await call("get_tool", { tool_id: tool })).body.name === "Add numbers", "restore failed");
});
await test("knowledge: create, add rows, import text file, claude_db_search", async () => {
  assert((await call("create_knowledge_set", { name: kb })).ok, "create");
  await call("add_knowledge_rows", { knowledge_set: kb, rows: [{ text: "Refunds post within 5 business days.", status: "active" }, { text: "Old refund rule: 10 days.", status: "retired" }, { text: "Passwords reset from the login page.", status: "active" }] });
  const f = path.join(tmp, "policy.md"); fs.writeFileSync(f, "Duplicate charges are refunded automatically after review by billing.");
  const imp = await call("import_knowledge_file", { knowledge_set: kb, file_path: f }); assert(imp.body.added === 1, JSON.stringify(imp.body));
  const s = await call("run_transformation", { transformation_id: "claude_db_search", params: { store: kb, query: "refund duplicate charge" } });
  assert(s.ok && s.body.results.length >= 2, JSON.stringify(s.body));
  assert(!s.body.results.some(x => x.row.status === "retired"), "retired row returned");
});
await test("export_knowledge writes CSV", async () => {
  const out = path.join(tmp, "faq.csv"); const r = await call("export_knowledge", { knowledge_set: kb, file_path: out });
  assert(r.ok && fs.readFileSync(out, "utf8").split("\n").length === 5, JSON.stringify(r.body));
});
await test("attach tools and knowledge, then trigger_agent through claude -p", async () => {
  await call("attach_tools_to_agent", { agent_id: agent, tool_ids: [tool] });
  await call("update_agent", { agent_id: agent, knowledge_ids: [kb] });
  const r = await call("trigger_agent", { agent_id: agent, message: "I was charged twice" });
  assert(r.ok && r.body.status === "complete" && /refund/.test(r.body.reply), JSON.stringify(r.body));
});
await test("trigger_agent_async + poll_agent_result", async () => {
  const r = await call("trigger_agent_async", { agent_id: agent, message: "hello" });
  let p; for (let i = 0; i < 20; i++) { await wait(100); p = await call("poll_agent_result", { task_id: r.body.task_id }); if (p.body.status === "complete") break; }
  assert(p.body.status === "complete", JSON.stringify(p.body));
});
await test("workforce of two agents runs end to end", async () => {
  const b = (await call("create_agent", { name: "Reviewer", system_prompt: "You review replies." })).body.id;
  const r = await call("create_workforce", { name: "Support desk", nodes: [{ id: "n1", agent_id: agent }, { id: "n2", agent_id: b }], edges: [{ from: "n1", to: "n2" }] });
  assert(r.ok, JSON.stringify(r.body)); wf = r.body.id;
  const t = await call("trigger_workforce", { workforce_id: wf, message: "charged twice", wait: true });
  assert(t.body.status === "complete" && t.body.path.length === 2, JSON.stringify(t.body));
});
await test("workforce with a bad edge is rejected", async () => {
  const r = await call("create_workforce", { name: "Bad", nodes: [{ id: "n1", agent_id: agent }], edges: [{ from: "n1", to: "n9" }] });
  assert(!r.ok && r.body.error === "INVALID_INPUT", JSON.stringify(r.body));
});
await test("evals: test set, cases, rule, check, run_evaluation", async () => {
  tset = (await call("create_eval_test_set", { name: "Billing", target_id: agent })).body.id;
  const c1 = (await call("create_eval_test_case", { test_set_id: tset, name: "duplicate charge", input: "I was charged twice" })).body.id;
  await call("add_eval_test_case_rule", { test_case_id: c1, rule: { type: "contains", value: "refund" } });
  await call("create_eval_test_case", { test_set_id: tset, name: "simulated", scenario: "Customer charged twice" });
  const chk = (await call("create_eval_check", { name: "mentions refund", type: "llm_judge", rubric: "Passes if the reply offers a refund." })).body.id;
  batch = (await call("run_evaluation", { test_set_id: tset, check_ids: [chk] })).body.batch_id;
  let p; for (let i = 0; i < 40; i++) { await wait(100); p = await call("poll_eval_batch_result", { batch_id: batch }); if (p.body.status === "complete") break; }
  assert(p.body.summary.pass === 2, JSON.stringify(p.body.summary || p.body));
});
await test("pre-publish gate blocks, then allows publish_agent and writes .claude/agents file", async () => {
  await call("upsert_pre_publish_config", { target_id: agent, test_set_id: tset, min_pass_rate: 1 });
  const ok = await call("publish_agent", { agent_id: agent });
  assert(ok.ok && fs.existsSync(ok.body.agent_file), JSON.stringify(ok.body));
  const md = fs.readFileSync(ok.body.agent_file, "utf8"); assert(md.includes("mcp__workforce__run_tool"), "agent file lacks tool access");
  await call("update_eval_test_case", { test_case_id: (await call("list_eval_test_cases", { test_set_id: tset })).body.test_cases[0].id, expected: "zzz-never" });
  const g = await call("poll_pre_publish_check", { target_id: agent }); assert(g.body.publish_allowed === false, JSON.stringify(g.body));
  const blocked = await call("publish_agent", { agent_id: agent }); assert(!blocked.ok && blocked.body.error === "PUBLISH_BLOCKED", JSON.stringify(blocked.body));
  await call("delete_pre_publish_config", { target_id: agent });
});
await test("alarm on failed tasks reports state", async () => {
  const r = await call("create_alarm", { name: "fails", target_id: agent, metric: "failed_tasks", threshold: 0 }); assert(r.ok && r.body.state === "OK", JSON.stringify(r.body));
});
await test("dashboard scores recent tasks", async () => {
  const d = (await call("create_performance_dashboard", { name: "Billing quality", target_id: agent })).body.id;
  await call("add_performance_dashboard_rule", { dashboard_id: d, rule: { type: "contains", value: "refund" } });
  const r = await call("list_performance_dashboard_runs", { dashboard_id: d }); assert(r.body.runs.length > 0, JSON.stringify(r.body));
});
await test("bulk run over items", async () => {
  const r = await call("start_bulk_run", { target_id: tool, target_type: "tool", items: [{ a: 1, b: 1 }, { a: 2, b: 2 }, { a: 3, b: 3 }] });
  let g; for (let i = 0; i < 30; i++) { await wait(100); g = await call("get_bulk_run", { bulk_run_id: r.body.bulk_run_id }); if (g.body.status === "complete") break; }
  assert(g.body.done === 3 && g.body.results.every(x => x.status === "complete"), JSON.stringify(g.body));
});
await test("schedule trigger stores a fire command", async () => {
  const r = await call("create_trigger", { target_id: agent, target_type: "agent", type: "schedule", config: { cron: "0 9 * * 1" }, message: "weekly check" });
  assert(r.ok && r.body.fire_command.includes("trigger_agent") && r.body.setup, JSON.stringify(r.body));
});
await test("analytics report tasks and usage", async () => {
  const s = await call("get_analytics_task_status_counts", { days: 1 }); assert(s.body.counts.complete > 0, JSON.stringify(s.body));
  const u = await call("get_analytics_usage_breakdown", { days: 1 }); assert(u.body.models.length > 0, JSON.stringify(u.body));
});
await test("list_llm_models returns Claude models", async () => {
  const r = await call("list_llm_models"); assert(r.body.models.map(m => m.id).join() === "opus,sonnet,haiku", JSON.stringify(r.body));
});
await test("wrong param type is rejected", async () => {
  const r = await call("attach_tools_to_agent", { agent_id: agent, tool_ids: "tool_x" }); assert(!r.ok && /array/.test(r.body.message), JSON.stringify(r.body));
});

// ---------- added 11/17/2026: the 17 original-catalog tools ----------
await test("delete_tool removes the tool and detaches it from agents", async () => {
  const t2 = (await call("create_tool", { name: "Temp", steps: [] })).body.id;
  await call("attach_tools_to_agent", { agent_id: agent, tool_ids: [t2] });
  assert((await call("delete_tool", { tool_id: t2 })).ok, "delete failed");
  assert(!(await call("get_agent", { agent_id: agent })).body.tool_ids.includes(t2), "still attached");
  const again = await call("delete_tool", { tool_id: t2 }); assert(!again.ok && again.body.error === "NOT_FOUND", JSON.stringify(again.body));
});
await test("cancel_agent_task kills a running claude process; finished tasks are unchanged", async () => {
  const a2 = (await call("create_agent", { name: "Slow", system_prompt: "x" })).body.id;
  const st = await call("trigger_agent_async", { agent_id: a2, message: "SLOW please" });
  await wait(600);
  const c = await call("cancel_agent_task", { agent_id: a2, task_id: st.body.task_id });
  assert(c.ok && c.body.cancelled && c.body.status === "cancelled", JSON.stringify(c.body));
  await wait(600);
  assert((await call("poll_agent_result", { task_id: st.body.task_id })).body.status === "cancelled", "status not cancelled");
  const again = await call("cancel_agent_task", { agent_id: a2, task_id: st.body.task_id });
  assert(again.ok && again.body.cancelled === false, JSON.stringify(again.body));
  const wrong = await call("cancel_agent_task", { agent_id: agent, task_id: st.body.task_id });
  assert(!wrong.ok && wrong.body.error === "INVALID_INPUT", JSON.stringify(wrong.body));
});
await test("cancel_workforce_task stops routing", async () => {
  const s1 = (await call("create_agent", { name: "S1", system_prompt: "x" })).body.id;
  const w = (await call("create_workforce", { name: "Slow wf", nodes: [{ id: "n1", agent_id: s1 }, { id: "n2", agent_id: s1 }], edges: [{ from: "n1", to: "n2" }] })).body.id;
  const t = await call("trigger_workforce", { workforce_id: w, message: "SLOW go" });
  await wait(800);
  const c = await call("cancel_workforce_task", { workforce_id: w, task_id: t.body.task_id });
  assert(c.ok && c.body.cancelled, JSON.stringify(c.body));
  await wait(800);
  const p = await call("poll_workforce_task_result", { task_id: t.body.task_id });
  assert(p.body.status === "cancelled" && (p.body.path || []).length <= 1, JSON.stringify(p.body));
});
await test("cancel_tool_run on a finished run changes nothing; unknown id is NOT_FOUND", async () => {
  const runs = (await call("list_tool_runs", { tool_id: tool })).body.runs;
  const c = await call("cancel_tool_run", { task_id: runs[0].id }); assert(c.ok && c.body.cancelled === false, JSON.stringify(c.body));
  const n = await call("cancel_tool_run", { task_id: "run_nope" }); assert(!n.ok && n.body.error === "NOT_FOUND", JSON.stringify(n.body));
});
await test("get_task_view and list_conversations are deprecated aliases", async () => {
  const tasks = (await call("list_conversations", { agent_id: agent, page_size: 5 })).body;
  assert(tasks.deprecated && tasks.tasks.length >= 1, JSON.stringify(tasks));
  const v = await call("get_task_view", { agent_id: agent, task_id: tasks.tasks[0].id });
  assert(v.ok && v.body.deprecated && v.body.task_id, JSON.stringify(v.body));
  const bad = await call("list_conversations", { agent_id: agent, page_size: 500 }); assert(!bad.ok, "page_size 500 accepted");
});
await test("update_agent_metadata_fields: upsert, rename, remove, all-or-nothing validation", async () => {
  const u = await call("update_agent_metadata_fields", { agent_id: agent, upsert: [{ title: "Errors", type: "number", description: "Errors count from the summary.", fill: { mode: "agent" } }, { title: "Tier", type: "single_option", options: ["gold", "silver"], fill: { mode: "agent" } }] });
  assert(u.ok && u.body.custom_metadata.options.length === 2, JSON.stringify(u.body));
  const r = await call("update_agent_metadata_fields", { agent_id: agent, rename: [{ from: "Errors", to: "Error count" }], remove: ["Tier"] });
  assert(r.ok && r.body.custom_metadata.options.map(f => f.title).join() === "Error count", JSON.stringify(r.body));
  const bad = await call("update_agent_metadata_fields", { agent_id: agent, upsert: [{ title: "Ok", type: "string", fill: { mode: "agent" } }, { title: "Bad!", type: "string", fill: { mode: "rule", on: "tool", ids: ["x"] } }] });
  assert(!bad.ok && /Nothing was saved/.test(bad.body.hint), JSON.stringify(bad.body));
  assert((await call("get_agent", { agent_id: agent })).body.custom_metadata.options.length === 1, "partial save happened");
});
await test("update_agent_version relabels a published version by version_id", async () => {
  const v = (await call("list_agent_versions", { agent_id: agent })).body.versions[0];
  assert(v && v.version_id, JSON.stringify(v));
  const r = await call("update_agent_version", { agent_id: agent, version_id: v.version_id, version_name: "First release", version_description: "Initial publish." });
  assert(r.ok && r.body.name === "First release", JSON.stringify(r.body));
  const n = await call("update_agent_version", { agent_id: agent, version_id: "agent:x:v9" }); assert(!n.ok && n.body.error === "NOT_FOUND", JSON.stringify(n.body));
});
await test("update_workforce_version and restore_workforce_version", async () => {
  const p = await call("publish_workforce", { workforce_id: wf, note: "v1" }); assert(p.ok, JSON.stringify(p.body));
  const v = (await call("list_workforce_versions", { workforce_id: wf })).body.versions.at(-1);
  assert((await call("update_workforce_version", { workforce_id: wf, version_id: v.version_id, version_name: "Baseline" })).ok, "relabel failed");
  await call("update_workforce", { workforce_id: wf, name: "Changed" });
  const r = await call("restore_workforce_version", { version_id: v.version_id }); assert(r.ok, JSON.stringify(r.body));
  assert((await call("get_workforce", { workforce_id: wf })).body.name !== "Changed", "restore failed");
  const bad = await call("restore_workforce_version", { version_id: "v1" }); assert(!bad.ok && bad.body.error === "INVALID_INPUT", JSON.stringify(bad.body));
});
await test("eval alarms: create, merge-update, validation, delete", async () => {
  const dash = (await call("list_performance_dashboards", {})).body.dashboards[0].id;
  const base = { resource_type: "agent", resource_id: agent, source_config: { source_type: "observability_eval_aggregated", config_id: dash }, condition_config: { comparison: "lt", threshold: 0.8, period: { value: 1, unit: "days" }, evaluation_periods: 3, datapoints_to_alarm: 2, min_sample_size: 1 }, channels: [{ type: "email", emails: ["qa@example.com"] }], cooldown_minutes: 60, enabled: true };
  const c = await call("create_eval_alarm", base); assert(c.ok && c.body.delivery === "not_sent", JSON.stringify(c.body));
  const u = await call("update_eval_alarm", { resource_type: "agent", resource_id: agent, alarm_id: c.body.id, condition_config: { threshold: 0.9 } });
  assert(u.ok && u.body.condition_config.threshold === 0.9 && u.body.condition_config.evaluation_periods === 3, JSON.stringify(u.body));
  const bad = await call("create_eval_alarm", { ...base, condition_config: { ...base.condition_config, threshold: 80 } });
  assert(!bad.ok && /fraction/.test(bad.body.message), JSON.stringify(bad.body));
  assert((await call("delete_eval_alarm", { resource_type: "agent", resource_id: agent, alarm_id: c.body.id })).ok, "delete failed");
});
await test("marketplace listings map to the bundled templates", async () => {
  const s = await call("search_marketplace_listings", { query: "summarize" }); assert(s.ok && s.body.listings.length >= 1, JSON.stringify(s.body));
  const g = await call("get_marketplace_listing", { listing_id: s.body.listings[0].listing_id }); assert(g.ok && g.body.steps, JSON.stringify(g.body));
  const c = await call("clone_marketplace_listing", { listing_id: s.body.listings[0].listing_id }); assert(c.ok && c.body.cloned[0].id, JSON.stringify(c.body));
  const n = await call("get_marketplace_listing", { listing_id: "nope" }); assert(!n.ok && n.body.error === "NOT_FOUND", JSON.stringify(n.body));
});
await test("delete_agent removes the agent and its triggers", async () => {
  const a3 = (await call("create_agent", { name: "Doomed" })).body.id;
  await call("create_trigger", { target_id: a3, target_type: "agent", type: "schedule", config: { cron: "0 9 * * *" }, message: "hi" });
  const d = await call("delete_agent", { agent_id: a3 }); assert(d.ok && d.body.triggers_deleted === 1, JSON.stringify(d.body));
});

// ---------- knowledge path: re-upsert, stale, no match, sourced retrieval ----------
await test("claude_db_upsert re-upsert replaces by _id; stale rows excluded; no match returns empty", async () => {
  await call("create_knowledge_set", { name: "kp" });
  const u1 = await call("run_transformation", { transformation_id: "claude_db_upsert", params: { store: "kp", rows: [{ _id: "fact-1", text: "Invoices are due in 30 days.", status: "active" }, { _id: "fact-2", text: "Old invoice terms were 45 days.", status: "stale" }] } });
  assert(u1.ok && u1.body.upserted === 2, JSON.stringify(u1.body));
  const u2 = await call("run_transformation", { transformation_id: "claude_db_upsert", params: { store: "kp", rows: [{ _id: "fact-1", text: "Invoices are due in 15 days.", status: "active" }] } });
  assert(u2.ok, JSON.stringify(u2.body));
  const rows = (await call("list_knowledge_rows", { knowledge_set: "kp" })).body;
  assert(rows.total === 2 && rows.rows.find(r => r._id === "fact-1").text.includes("15"), JSON.stringify(rows));
  const s = await call("run_transformation", { transformation_id: "claude_db_search", params: { store: "kp", query: "invoice due days" } });
  assert(s.ok && s.body.results.length === 1 && s.body.results[0].row._id === "fact-1", JSON.stringify(s.body));
  const none = await call("run_transformation", { transformation_id: "claude_db_search", params: { store: "kp", query: "zebra migration" } });
  assert(none.ok && none.body.results.length === 0, JSON.stringify(none.body));
});

await test("original-catalog argument names are accepted (studio_id, eval_batch_id, resource_id)", async () => {
  const g = await call("get_tool", { studio_id: tool }); assert(g.ok && g.body.id === tool, JSON.stringify(g.body));
  const s = await call("add_tool_step", { studio_id: tool, step: { name: "alias_step", transformation: "js_code_transformation", params: { code: "return 1;" } } });
  assert(s.ok && s.body.steps.includes("alias_step"), JSON.stringify(s.body));
  const b = (await call("list_eval_batches", {})).body.batches[0];
  const sum = await call("get_eval_batch_summary", { resource_type: "agent", resource_id: agent, eval_batch_id: b.id }); assert(sum.ok && sum.body.batch_id === b.id, JSON.stringify(sum.body));
});

// ---------- Microsoft Office COM family ----------
await test("COM tools return UNSUPPORTED_HOST on a non-Windows host", async () => {
  if (process.platform === "win32") return;
  for (const n of ["com_host_check", "outlook_list_categories", "outlook_list_calendars"]) {
    const r = await call(n, {}); assert(!r.ok && r.body.error === "UNSUPPORTED_HOST", n + " " + JSON.stringify(r.body));
  }
  const r = await call("outlook_add_category", { entry_id: "x", category: "Test" }); assert(r.body.error === "UNSUPPORTED_HOST", JSON.stringify(r.body));
});
await test("COM path tools reject paths outside WORKFORCE_WINDOWS_ROOT before touching the host", async () => {
  const r = await call("fs_read", { path: "../../etc/passwd" }); assert(!r.ok && r.body.error === "PATH_OUTSIDE_ROOT", JSON.stringify(r.body));
  const w = await call("word_append_image", { path: "a.docx", image_path: "../x.png" }); assert(!w.ok && w.body.error === "PATH_OUTSIDE_ROOT", JSON.stringify(w.body));
  const m = await call("fs_move", { source: "a.txt", destination: "/tmp/out.txt" }); assert(!m.ok && m.body.error === "PATH_OUTSIDE_ROOT", JSON.stringify(m.body));
});
await test("COM required params are enforced", async () => {
  const r = await call("excel_append_row", { path: "book.xlsx" }); assert(!r.ok && r.body.error === "INVALID_INPUT", JSON.stringify(r.body));
});

await client.close();
console.log(results.join("\n"));
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
