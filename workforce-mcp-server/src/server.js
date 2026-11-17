#!/usr/bin/env node
// workforce-mcp-server: a local MCP server for Claude Code that builds, runs, and
// tests AI agents, tools, workforces, and knowledge tables. Everything lives in a
// local store (WORKFORCE_HOME, default ./.workforce). Agents run through `claude -p`.

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import vm from "node:vm";
import crypto from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { TOOLS, TRANSFORMATIONS, INTEGRATIONS, TEMPLATES, parseParams } from "./catalog.js";

export const VERSION = "1.0.0";
const SELF = fileURLToPath(import.meta.url);
const HOME = path.resolve(process.env.WORKFORCE_HOME || path.join(process.cwd(), ".workforce"));
const AGENTS_DIR = path.resolve(process.env.WORKFORCE_AGENTS_DIR || path.join(process.cwd(), ".claude", "agents"));
const CLAUDE_BIN = process.env.WORKFORCE_CLAUDE_BIN || "claude";
const TIMEOUT_MS = Number(process.env.WORKFORCE_TIMEOUT_MS || 300000);
const DEFAULT_MODEL = process.env.WORKFORCE_DEFAULT_MODEL || "sonnet";

// ---------------------------------------------------------------- errors
class ToolError extends Error {
  constructor(code, message, hint) { super(message); this.code = code; this.hint = hint; }
}
const notFound = (kind, id) => new ToolError("NOT_FOUND", `${kind} '${id}' does not exist.`, `Call list_${kind}s to see valid IDs.`);
const bad = (msg, hint) => new ToolError("INVALID_INPUT", msg, hint);

// ---------------------------------------------------------------- store
fs.mkdirSync(HOME, { recursive: true });
const file = name => path.join(HOME, `${name}.json`);
function load(name) {
  try { return JSON.parse(fs.readFileSync(file(name), "utf8")); } catch { return {}; }
}
function save(name, data) {
  fs.mkdirSync(path.dirname(file(name)), { recursive: true });
  const tmp = file(name) + "." + process.pid + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, file(name));
}
const now = () => new Date().toISOString();
const newId = prefix => `${prefix}_${crypto.randomBytes(5).toString("hex")}`;
const slug = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "item";

function getOne(coll, id, kind) {
  const all = load(coll);
  if (!all[id]) throw notFound(kind, id);
  return all[id];
}
function putOne(coll, obj) { const all = load(coll); all[obj.id] = obj; save(coll, all); return obj; }
function delOne(coll, id, kind) {
  const all = load(coll); if (!all[id]) throw notFound(kind, id);
  delete all[id]; save(coll, all); return { deleted: id };
}
function listColl(coll, { query, folder_id, limit, filter } = {}) {
  let items = Object.values(load(coll));
  if (folder_id) items = items.filter(i => i.folder_id === folder_id);
  if (query) { const q = query.toLowerCase(); items = items.filter(i => JSON.stringify([i.name, i.description]).toLowerCase().includes(q)); }
  if (filter) items = items.filter(filter);
  items.sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
  return limit ? items.slice(0, limit) : items;
}
function patch(obj, args, keys) {
  for (const k of keys) if (args[k] !== undefined) obj[k] = args[k];
  obj.updated_at = now(); return obj;
}
function snapshot(kind, id, obj, note) {
  const v = load("versions"); const key = `${kind}:${id}`;
  v[key] = v[key] || [];
  const version = v[key].length + 1;
  v[key].push({ version, version_id: `${kind}:${id}:v${version}`, note: note || "", published_at: now(), data: JSON.parse(JSON.stringify(obj)) });
  save("versions", v); return version;
}
function versions(kind, id) { return (load("versions")[`${kind}:${id}`] || []).map(v => ({ version_id: `${kind}:${id}:v${v.version}`, ...v })); }

// ---------------------------------------------------------------- claude runner
function claudeAvailable() {
  const r = spawnSync(CLAUDE_BIN, ["--version"], { encoding: "utf8" });
  return r.status === 0 ? r.stdout.trim() : null;
}
const CHILDREN = new Map(); // task_id -> running claude child process
function runClaude({ prompt, system, model, mcpTools = [], taskId }) {
  return new Promise((resolve, reject) => {
    const args = ["-p", prompt, "--output-format", "json", "--model", model || DEFAULT_MODEL];
    if (system) args.push("--append-system-prompt", system);
    if (mcpTools.length) {
      const cfg = { mcpServers: { workforce: { command: process.execPath, args: [SELF], env: { WORKFORCE_HOME: HOME } } } };
      args.push("--mcp-config", JSON.stringify(cfg), "--allowedTools", mcpTools.join(","));
    }
    const started = Date.now();
    let child;
    try { child = spawn(CLAUDE_BIN, args, { env: process.env, stdio: ["ignore", "pipe", "pipe"] }); }
    catch (e) { return reject(new ToolError("CLAUDE_UNAVAILABLE", e.message, "Install Claude Code and run `claude` once to log in.")); }
    if (taskId) CHILDREN.set(taskId, child);
    let out = "", err = "";
    const timer = setTimeout(() => { child.kill("SIGTERM"); reject(new ToolError("TIMEOUT", `claude -p ran longer than ${TIMEOUT_MS} ms.`, "Raise WORKFORCE_TIMEOUT_MS.")); }, TIMEOUT_MS);
    child.stdout.on("data", d => (out += d));
    child.stderr.on("data", d => (err += d));
    child.on("error", e => { clearTimeout(timer); reject(new ToolError("CLAUDE_UNAVAILABLE", e.message, "Install Claude Code, or set WORKFORCE_CLAUDE_BIN.")); });
    child.on("close", code => {
      clearTimeout(timer); if (taskId) CHILDREN.delete(taskId);
      const duration_ms = Date.now() - started;
      let text = out.trim(), meta = {};
      try { const j = JSON.parse(out); text = j.result ?? j.text ?? text; meta = j; } catch { /* plain text */ }
      if (code !== 0 || meta.is_error) return reject(new ToolError("CLAUDE_FAILED", String((meta.is_error ? text : "") || err || text || `exit ${code}`).slice(0, 2000), "Check `claude -p hello` in a terminal. A 429 means a usage limit."));
      recordUsage({ model: model || DEFAULT_MODEL, input_chars: prompt.length + (system || "").length, output_chars: String(text).length, duration_ms, cost_usd: meta.total_cost_usd });
      resolve({ text: String(text), duration_ms, cost_usd: meta.total_cost_usd });
    });
  });
}
function recordUsage(u) { const all = load("usage"); const id = newId("use"); all[id] = { id, at: now(), ...u }; save("usage", all); }

// ---------------------------------------------------------------- templating
function lookup(ctx, expr) {
  return expr.trim().split(".").reduce((o, k) => (o == null ? undefined : o[k]), ctx);
}
function render(value, ctx) {
  if (typeof value === "string") {
    const whole = value.match(/^\{\{\s*([^}]+?)\s*\}\}$/);
    if (whole) { const v = lookup(ctx, whole[1]); return v === undefined ? value : v; }
    return value.replace(/\{\{\s*([^}]+?)\s*\}\}/g, (m, e) => { const v = lookup(ctx, e); return v === undefined ? m : typeof v === "string" ? v : JSON.stringify(v); });
  }
  if (Array.isArray(value)) return value.map(v => render(v, ctx));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, render(v, ctx)]));
  return value;
}

// ---------------------------------------------------------------- knowledge search (BM25)
const STOP = new Set("a an the and or of to in on for is are was were be by with as at from that this it its into".split(" "));
const stem = w => w.replace(/(ing|ed|es|s)$/, "");
const tokens = t => String(t).toLowerCase().match(/[a-z0-9]+/g)?.filter(w => !STOP.has(w)).map(stem) || [];
function rowText(r) { return Object.entries(r).filter(([k]) => !k.startsWith("_")).map(([, v]) => (typeof v === "string" ? v : JSON.stringify(v))).join(" "); }
function matches(row, filters = {}) { return Object.entries(filters).every(([k, v]) => row[k] === v); }
function bm25(rows, query, k = 5) {
  const docs = rows.map(r => ({ r, t: tokens(rowText(r)) }));
  const N = docs.length || 1, avg = docs.reduce((s, d) => s + d.t.length, 0) / N || 1;
  const df = {}; for (const d of docs) for (const w of new Set(d.t)) df[w] = (df[w] || 0) + 1;
  const q = tokens(query);
  return docs.map(d => {
    const tf = {}; for (const w of d.t) tf[w] = (tf[w] || 0) + 1;
    let s = 0;
    for (const w of q) if (tf[w]) { const idf = Math.log(1 + (N - df[w] + 0.5) / (df[w] + 0.5)); s += idf * (tf[w] * 2.2) / (tf[w] + 1.2 * (0.25 + 0.75 * d.t.length / avg)); }
    return { score: Number(s.toFixed(4)), row: d.r };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score).slice(0, k);
}
function kbRows(name) { const all = load("knowledge_rows"); return all[name] || []; }
function kbSave(name, rows) { const all = load("knowledge_rows"); all[name] = rows; save("knowledge_rows", all); }
function kbMeta(name) { const s = load("knowledge"); if (!s[name]) throw notFound("knowledge_set", name); return s[name]; }
function chunk(text, size = 400, overlap = 50) {
  const w = text.split(/\s+/).filter(Boolean), out = [];
  for (let i = 0; i < w.length; i += size - overlap) { out.push(w.slice(i, i + size).join(" ")); if (i + size >= w.length) break; }
  return out;
}
function parseCsv(text) {
  const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; }
    else if (c === '"') q = true; else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; } else if (c !== "\r") cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head, ...body] = rows; return body.filter(r => r.some(Boolean)).map(r => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ""])));
}

// ---------------------------------------------------------------- step runner
async function runStep(type, params, ctx = {}) {
  const t0 = Date.now();
  switch (type) {
    case "prompt_completion": {
      if (!params.prompt) throw bad("prompt_completion needs params.prompt.");
      const r = await runClaude({ prompt: String(params.prompt), system: params.system_prompt, model: params.model });
      return { answer: r.text, duration_ms: r.duration_ms };
    }
    case "js_code_transformation": {
      if (!params.code) throw bad("js_code_transformation needs params.code.");
      const sandbox = { params: ctx.params || {}, steps: ctx.steps || {}, console: { log: () => {} }, JSON, Math, Date, result: undefined };
      const script = new vm.Script(`(async () => { ${params.code} \n})()`);
      const transformed = await script.runInNewContext(sandbox, { timeout: 30000 });
      return { transformed, duration_ms: Date.now() - t0 };
    }
    case "python_code_transformation": {
      if (!params.code) throw bad("python_code_transformation needs params.code.");
      const body = String(params.code).split("\n").map(l => "    " + l).join("\n");
      const src = `import json, sys\nparams = json.loads(sys.stdin.read())\ndef __main(params):\n    result = None\n${body}\n    return result\n__out = __main(params)\nprint("\\n__WF_RESULT__" + json.dumps(__out, default=str))\n`;
      const r = spawnSync("python3", ["-I", "-c", src], { input: JSON.stringify(ctx.params || {}), encoding: "utf8", timeout: 60000 });
      if (r.status !== 0) throw new ToolError("STEP_FAILED", (r.stderr || "python failed").slice(-2000));
      const [stdout, res] = r.stdout.split("\n__WF_RESULT__");
      return { transformed: JSON.parse(res || "null"), stdout, duration_ms: Date.now() - t0 };
    }
    case "api_call": {
      if (!params.url) throw bad("api_call needs params.url.");
      const method = (params.method || "GET").toUpperCase();
      const init = { method, headers: params.headers || {} };
      if (params.body !== undefined && method !== "GET") init.body = typeof params.body === "string" ? params.body : JSON.stringify(params.body);
      let last;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const res = await fetch(params.url, { ...init, signal: AbortSignal.timeout(30000) });
          const text = await res.text(); let body = text; try { body = JSON.parse(text); } catch { }
          if (res.status >= 500 && attempt < 2) { await new Promise(r => setTimeout(r, 1000 * 2 ** attempt)); continue; }
          return { status: res.status, response_body: body, duration_ms: Date.now() - t0 };
        } catch (e) { last = e; await new Promise(r => setTimeout(r, 1000 * 2 ** attempt)); }
      }
      throw new ToolError("NETWORK_ERROR", String(last?.message || last), "Check the URL and network access.");
    }
    case "browserless_scrape": {
      if (!params.website_url) throw bad("browserless_scrape needs params.website_url.");
      const r = await runStep("api_call", { url: params.website_url, headers: { "user-agent": "workforce-mcp-server" } });
      const html = typeof r.response_body === "string" ? r.response_body : JSON.stringify(r.response_body);
      const links = [...html.matchAll(/href="(https?:[^"]+)"/g)].map(m => m[1]).slice(0, 200);
      const page = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
      return { page, links, status: r.status, duration_ms: Date.now() - t0 };
    }
    case "search":
    case "claude_db_search": {
      const store = String(params.store || params.dataset_id || "").replace(/^knowledge:/, "");
      if (!store || !params.query) throw bad(`${type} needs a store (or dataset_id knowledge:<name>) and a query.`);
      kbMeta(store);
      const filters = params.filters || (type === "claude_db_search" ? { status: "active" } : {});
      const rows = kbRows(store).filter(r => (r.status === undefined && filters.status === "active") || matches(r, filters));
      return { results: bm25(rows, params.query, params.top_k || params.page_size || 5), duration_ms: Date.now() - t0 };
    }
    case "claude_db_upsert": {
      const store = String(params.store || "").replace(/^knowledge:/, "");
      if (!store || !Array.isArray(params.rows)) throw bad("claude_db_upsert needs store and rows[].");
      kbMeta(store); const rows = kbRows(store);
      for (const r of params.rows) { const id = r._id || newId("row"); const i = rows.findIndex(x => x._id === id); const v = { status: "active", ...r, _id: id }; i >= 0 ? (rows[i] = v) : rows.push(v); }
      kbSave(store, rows); return { upserted: params.rows.length };
    }
    default:
      throw new ToolError("UNSUPPORTED", `Step type '${type}' is not supported.`, "Call list_transformations to see supported step types.");
  }
}

async function executeTool(tool, inputs = {}) {
  const run = { id: newId("run"), tool_id: tool.id, status: "running", inputs, steps: [], created_at: now() };
  putOne("runs", run);
  const ctx = { ...inputs, params: inputs, steps: {} };
  try {
    for (const step of tool.steps || []) {
      if (load("runs")[run.id]?.status === "cancelled") throw new ToolError("CANCELLED", "The tool run was cancelled.");
      const p = render(step.params || {}, ctx);
      const out = await runStep(step.transformation, p, ctx);
      ctx[step.name] = out; ctx.steps[step.name] = { output: out };
      run.steps.push({ name: step.name, transformation: step.transformation, output: out });
    }
    const last = run.steps.at(-1)?.output;
    run.output = tool.output && Object.keys(tool.output).length ? render(tool.output, ctx) : last;
    run.status = "complete";
  } catch (e) {
    if (e.code === "CANCELLED") run.status = "cancelled"; else { run.status = "failed"; run.error = { code: e.code || "STEP_FAILED", message: e.message, step: run.steps.length }; }
  }
  run.finished_at = now(); putOne("runs", run); return run;
}

// ---------------------------------------------------------------- agents and workforces
function agentSystem(agent) {
  let s = agent.system_prompt || "";
  const tools = (agent.tool_ids || []).map(id => load("tools")[id]).filter(Boolean);
  if (tools.length) s += "\n\n## Tools\nCall mcp__workforce__run_tool with tool_id and params to use a tool.\n" + tools.map(t => `- ${t.id}: ${t.name}. ${t.description || ""} Inputs: ${(t.inputs || []).map(i => i.name).join(", ")}`).join("\n");
  const kb = agent.knowledge_ids || [];
  if (kb.length) s += `\n\n## Knowledge\nSearch with mcp__workforce__run_transformation, transformation_id claude_db_search, params {store, query}. Stores: ${kb.join(", ")}.`;
  return s;
}
function agentMcpTools(agent) {
  const t = [];
  if ((agent.tool_ids || []).length) t.push("mcp__workforce__run_tool");
  if ((agent.knowledge_ids || []).length) t.push("mcp__workforce__run_transformation");
  for (const m of agent.mcp_servers || []) t.push(...((m.tools && m.tools.length) ? m.tools.map(x => `mcp__${m.server_name}__${x}`) : [`mcp__${m.server_name}`]));
  return t;
}
async function runAgentTask(task) {
  const agent = getOne("agents", task.agent_id, "agent");
  const history = task.messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n\n");
  const prompt = task.messages.length > 1 ? `Conversation so far:\n\n${history}\n\nReply to the last USER message.` : task.messages[0].content;
  const t = load("tasks")[task.id]; t.status = "running"; putOne("tasks", t);
  try {
    const r = await runClaude({ prompt, system: agentSystem(agent), model: agent.model, mcpTools: agentMcpTools(agent), taskId: task.id });
    t.messages.push({ role: "agent", content: r.text, at: now() });
    Object.assign(t, { status: "complete", reply: r.text, duration_ms: r.duration_ms, cost_usd: r.cost_usd, finished_at: now() });
  } catch (e) {
    Object.assign(t, { status: "failed", error: { code: e.code, message: e.message, hint: e.hint }, finished_at: now() });
  }
  if (load("tasks")[t.id]?.status === "cancelled") { t.status = "cancelled"; t.error = undefined; }
  putOne("tasks", t); return t;
}
function newAgentTask(agent_id, message, conversation_id) {
  getOne("agents", agent_id, "agent");
  let task = conversation_id ? load("tasks")[conversation_id] : null;
  if (conversation_id && !task) throw notFound("task", conversation_id);
  if (!task) task = { id: newId("task"), kind: "agent", agent_id, messages: [], created_at: now() };
  task.messages.push({ role: "user", content: message, at: now() });
  task.status = "queued"; putOne("tasks", task); return task;
}
async function runWorkforce(task) {
  const wf = getOne("workforces", task.workforce_id, "workforce");
  const nodes = wf.nodes || [], edges = wf.edges || [];
  if (!nodes.length) throw bad("The workforce has no nodes.");
  const incoming = new Set(edges.map(e => e.to));
  let node = nodes.find(n => !incoming.has(n.id)) || nodes[0];
  let message = task.input; const t = load("tasks")[task.id]; t.status = "running"; putOne("tasks", t);
  try {
    for (let hop = 0; node && hop < 20; hop++) {
      if (load("tasks")[t.id]?.status === "cancelled") throw new ToolError("CANCELLED", "The workforce task was cancelled.");
      t.current_task_id = null;
      const at = newAgentTask(node.agent_id, message);
      const cur = load("tasks")[t.id]; cur.current_task_id = at.id; putOne("tasks", cur); t.current_task_id = at.id;
      const done = await runAgentTask(at);
      t.path.push({ node_id: node.id, agent_id: node.agent_id, task_id: at.id, status: done.status });
      t.messages.push({ node_id: node.id, role: "user", content: message }, { node_id: node.id, role: "agent", content: done.reply || done.error?.message });
      if (done.status !== "complete") throw new ToolError(done.error?.code || "NODE_FAILED", `Node ${node.id} failed: ${done.error?.message}`);
      message = done.reply;
      const next = edges.filter(e => e.from === node.id).find(e => !e.condition || message.toLowerCase().includes(String(e.condition).toLowerCase()));
      node = next ? nodes.find(n => n.id === next.to) : null;
    }
    Object.assign(t, { status: "complete", reply: message, finished_at: now() });
  } catch (e) { Object.assign(t, e.code === "CANCELLED" || load("tasks")[t.id]?.status === "cancelled" ? { status: "cancelled", finished_at: now() } : { status: "failed", error: { code: e.code, message: e.message }, finished_at: now() }); }
  putOne("tasks", t); return t;
}
function writeAgentFile(agent, version) {
  fs.mkdirSync(AGENTS_DIR, { recursive: true });
  const name = slug(agent.name);
  const tools = agentMcpTools(agent);
  const fm = [`---`, `name: ${name}`, `description: ${JSON.stringify(agent.description || agent.name)}`, `model: ${agent.model || DEFAULT_MODEL}`];
  if (tools.length) fm.push(`tools: ${tools.join(", ")}`);
  fm.push(`---`, ``, `<!-- Published from workforce agent ${agent.id}, version ${version}. Edit the agent, then publish again. -->`, ``, agentSystem(agent), ``);
  const p = path.join(AGENTS_DIR, `${name}.md`); fs.writeFileSync(p, fm.join("\n")); return p;
}

// ---------------------------------------------------------------- evals
async function judge(rule, output) {
  const v = rule.value ?? "";
  switch (rule.type) {
    case "contains": return { pass: output.toLowerCase().includes(String(v).toLowerCase()) };
    case "not_contains": return { pass: !output.toLowerCase().includes(String(v).toLowerCase()) };
    case "regex": return { pass: new RegExp(v, "i").test(output) };
    case "llm_judge": {
      const r = await runClaude({ prompt: `Rubric:\n${rule.rubric || v}\n\nOutput to grade:\n${output}\n\nReply with PASS or FAIL on the first line, then one sentence of reason.`, model: "haiku" });
      return { pass: /^\s*PASS/i.test(r.text), reason: r.text.split("\n").slice(1).join(" ").trim() };
    }
    default: throw bad(`Unknown rule type '${rule.type}'.`, "Use contains, not_contains, regex, or llm_judge.");
  }
}
async function runTarget(target_id, input) {
  if (load("agents")[target_id]) { const t = await runAgentTask(newAgentTask(target_id, input)); return t; }
  if (load("workforces")[target_id]) {
    const t = { id: newId("wtask"), kind: "workforce", workforce_id: target_id, input, path: [], messages: [], status: "queued", created_at: now() };
    putOne("tasks", t); return runWorkforce(t);
  }
  throw notFound("target", target_id);
}
async function runBatch(batch) {
  const set = getOne("test_sets", batch.test_set_id, "eval_test_set");
  const cases = Object.values(load("test_cases")).filter(c => c.test_set_id === set.id);
  const checks = (batch.check_ids || []).map(id => getOne("checks", id, "eval_check"));
  for (const c of cases) {
    if (load("batches")[batch.id]?.status === "cancelled") break;
    const res = { test_case_id: c.id, name: c.name, rules: [] };
    try {
      let input = c.input;
      if (!input && c.scenario) {
        const sim = c.simulation || {};
        input = (await runClaude({ prompt: `You are simulating a user. Scenario: ${c.scenario}\nPersona: ${sim.persona || "default"}\nGoal: ${sim.goal || ""}\nWrite only the user's first message.`, model: "haiku" })).text;
      }
      if (!input) throw bad(`Test case ${c.id} has no input or scenario.`);
      const t = await runTarget(set.target_id, input);
      res.input = input; res.output = t.reply || ""; res.task_id = t.id;
      if (t.status !== "complete") throw new ToolError("TARGET_FAILED", t.error?.message || "target failed");
      const rules = [...(c.rules || []), ...checks, ...(c.expected ? [{ type: "contains", value: c.expected }] : [])];
      for (const r of rules) res.rules.push({ rule: r.name || r.type, ...(await judge(r, res.output)) });
      res.status = res.rules.every(r => r.pass) ? "pass" : "fail";
    } catch (e) { res.status = "error"; res.error = e.message; }
    const b = load("batches")[batch.id]; b.results.push(res); putOne("batches", b);
  }
  const b = load("batches")[batch.id];
  const count = s => b.results.filter(r => r.status === s).length;
  Object.assign(b, { status: b.status === "cancelled" ? "cancelled" : "complete", summary: { total: b.results.length, pass: count("pass"), fail: count("fail"), error: count("error"), pass_rate: b.results.length ? count("pass") / b.results.length : 0 }, finished_at: now() });
  putOne("batches", b); return b;
}
function startBatch(test_set_id, check_ids) {
  getOne("test_sets", test_set_id, "eval_test_set");
  const b = { id: newId("batch"), test_set_id, check_ids: check_ids || [], status: "running", results: [], created_at: now() };
  putOne("batches", b); return b;
}

// ---------------------------------------------------------------- analytics helpers
const since = days => Date.now() - (days || 7) * 86400000;
const day = iso => String(iso).slice(0, 10);
function tasksIn(days) { return Object.values(load("tasks")).filter(t => Date.parse(t.created_at) >= since(days)); }
function runsIn(days) { return Object.values(load("runs")).filter(r => Date.parse(r.created_at) >= since(days)); }
function alarmValue(a) {
  const tasks = tasksIn(a.window_hours ? a.window_hours / 24 : 1).filter(t => t.agent_id === a.target_id || t.workforce_id === a.target_id);
  if (a.metric === "failed_tasks" || a.metric === "error_count") return tasks.filter(t => t.status === "failed").length;
  if (a.metric === "eval_pass_rate") {
    const b = Object.values(load("batches")).filter(x => load("test_sets")[x.test_set_id]?.target_id === a.target_id && x.summary).sort((x, y) => y.created_at.localeCompare(x.created_at))[0];
    return b ? b.summary.pass_rate : null;
  }
  throw bad(`Unknown metric '${a.metric}'.`, "Use error_count, failed_tasks, or eval_pass_rate.");
}
function alarmState(a) {
  const value = alarmValue(a);
  const cmp = a.comparison || (a.metric === "eval_pass_rate" ? "below" : "above");
  const firing = value != null && a.enabled !== false && (cmp === "above" ? value > a.threshold : value < a.threshold);
  return { ...a, current_value: value, state: firing ? "FIRING" : "OK" };
}
function scoreDashboard(d, limit) {
  return Promise.all(Object.values(load("tasks")).filter(t => (t.agent_id === d.target_id || t.workforce_id === d.target_id) && t.status === "complete").slice(-(limit || 20)).map(async t => {
    const rules = await Promise.all((d.rules || []).map(r => judge(r, t.reply || "")));
    return { task_id: t.id, at: t.created_at, pass: rules.every(r => r.pass), rules };
  }));
}

// ---------------------------------------------------------------- handlers
const H = {};
const need = (a, ...keys) => { for (const k of keys) if (a[k] === undefined || a[k] === "") throw bad(`'${k}' is required.`); };

// Agents
H.create_agent = a => putOne("agents", { id: newId("agent"), name: a.name, description: a.description || "", system_prompt: a.system_prompt || "", model: a.model || DEFAULT_MODEL, tool_ids: a.tool_ids || [], knowledge_ids: a.knowledge_ids || [], mcp_servers: [], actions: {}, folder_id: a.folder_id || null, settings: a.settings || {}, created_at: now(), updated_at: now() });
H.get_agent = a => getOne("agents", a.agent_id, "agent");
H.update_agent = a => putOne("agents", patch(H.get_agent(a), a, ["name", "system_prompt", "model", "description", "settings", "knowledge_ids"]));
H.list_agents = a => ({ agents: listColl("agents", a) });
H.publish_agent = a => {
  const agent = H.get_agent(a); gate(agent.id);
  const version = snapshot("agent", agent.id, agent, a.note);
  return { agent_id: agent.id, version, agent_file: writeAgentFile(agent, version) };
};
H.read_agent_system_prompt = a => ({ agent_id: a.agent_id, lines: (H.get_agent(a).system_prompt || "").split("\n").map((l, i) => `${i + 1}\t${l}`).join("\n") });
H.edit_agent_system_prompt = a => {
  const ag = H.get_agent(a); const n = (ag.system_prompt || "").split(a.old_string).length - 1;
  if (n !== 1) throw bad(`old_string must match exactly once; it matched ${n} times.`, "Add surrounding text to make it unique.");
  ag.system_prompt = ag.system_prompt.replace(a.old_string, a.new_string); patch(ag, {}, []); putOne("agents", ag);
  return { agent_id: ag.id, edited: true };
};
H.search_agent_system_prompt = a => { const re = new RegExp(a.pattern, "i"); return { matches: (H.get_agent(a).system_prompt || "").split("\n").map((l, i) => ({ line: i + 1, text: l })).filter(x => re.test(x.text)) }; };
H.get_agent_tools = a => { const ag = H.get_agent(a); const tools = load("tools"); return { tools: ag.tool_ids.map(id => tools[id] ? { id, name: tools[id].name, action: ag.actions?.[id] || {} } : { id, missing: true }), mcp_servers: ag.mcp_servers || [] }; };
H.attach_tools_to_agent = a => { const ag = H.get_agent(a); for (const id of a.tool_ids) { getOne("tools", id, "tool"); if (!ag.tool_ids.includes(id)) ag.tool_ids.push(id); } putOne("agents", patch(ag, {}, [])); return H.get_agent_tools(a); };
H.detach_tools_from_agent = a => { const ag = H.get_agent(a); ag.tool_ids = ag.tool_ids.filter(id => !a.tool_ids.includes(id)); putOne("agents", patch(ag, {}, [])); return H.get_agent_tools(a); };
H.attach_mcp_server_to_agent = a => { const ag = H.get_agent(a); ag.mcp_servers = (ag.mcp_servers || []).filter(m => m.server_name !== a.server_name); ag.mcp_servers.push({ server_name: a.server_name, tools: a.tools || [], approvals: {} }); putOne("agents", patch(ag, {}, [])); return H.get_agent_tools(a); };
H.detach_mcp_server_from_agent = a => { const ag = H.get_agent(a); ag.mcp_servers = (ag.mcp_servers || []).filter(m => m.server_name !== a.server_name); putOne("agents", patch(ag, {}, [])); return H.get_agent_tools(a); };
H.update_agent_mcp_server_approvals = a => { const ag = H.get_agent(a); const m = (ag.mcp_servers || []).find(x => x.server_name === a.server_name); if (!m) throw notFound("mcp_server", a.server_name); m.approvals = a.approvals; putOne("agents", patch(ag, {}, [])); return m; };
H.update_agent_action = a => { const ag = H.get_agent(a); if (!ag.tool_ids.includes(a.tool_id)) throw bad(`Tool ${a.tool_id} is not attached to this agent.`, "Call attach_tools_to_agent first."); ag.actions = ag.actions || {}; ag.actions[a.tool_id] = { ...(ag.actions[a.tool_id] || {}), ...Object.fromEntries(["approval_mode", "max_calls", "description"].filter(k => a[k] !== undefined).map(k => [k, a[k]])) }; putOne("agents", patch(ag, {}, [])); return { tool_id: a.tool_id, action: ag.actions[a.tool_id] }; };
H.list_agent_versions = a => { H.get_agent(a); return { versions: versions("agent", a.agent_id).map(({ data, ...v }) => v) }; };
H.get_agent_version = a => { const v = versions("agent", a.agent_id).find(x => x.version === a.version); if (!v) throw notFound("agent_version", a.version); return v; };
H.restore_agent_version = a => { const v = H.get_agent_version(a); putOne("agents", { ...v.data, updated_at: now() }); return { restored: a.version }; };
H.trigger_agent = async a => { const t = newAgentTask(a.agent_id, a.message, a.conversation_id); const done = await runAgentTask(t); return { task_id: done.id, conversation_id: done.id, status: done.status, reply: done.reply, error: done.error }; };
H.trigger_agent_async = a => { const t = newAgentTask(a.agent_id, a.message, a.conversation_id); runAgentTask(t).catch(() => { }); return { task_id: t.id, conversation_id: t.id, status: "queued", next: "poll_agent_result" }; };
H.poll_agent_result = a => { const t = getOne("tasks", a.task_id, "task"); return { task_id: t.id, status: t.status, reply: t.reply, error: t.error }; };
H.list_agent_tasks = a => ({ tasks: listColl("tasks", { limit: a.limit, filter: t => t.agent_id === a.agent_id && (!a.status || t.status === a.status) }).map(({ messages, ...t }) => t) });
H.list_agent_task_messages = a => ({ messages: getOne("tasks", a.task_id, "task").messages });
H.get_agent_task_metadata = a => { const { messages, reply, ...m } = getOne("tasks", a.task_id, "task"); return m; };
H.get_agent_task_summary = a => { const t = getOne("tasks", a.task_id, "task"); return { task_id: t.id, status: t.status, message_count: t.messages.length, last_reply: t.reply, error: t.error }; };
H.submit_agent_task_decisions = async a => {
  const t = getOne("tasks", a.task_id, "task");
  const text = a.decisions.map(d => `${d.approved ? "APPROVED" : "REJECTED"}: ${d.action || d.tool_id || "action"}${d.note ? ` (${d.note})` : ""}`).join("\n");
  t.messages.push({ role: "user", content: `Decisions on your pending actions:\n${text}\nContinue.`, at: now() }); putOne("tasks", t);
  const done = await runAgentTask(t); return { task_id: done.id, status: done.status, reply: done.reply };
};
H.list_agent_triggers = a => ({ triggers: Object.values(load("triggers")).filter(t => t.target_id === a.agent_id) });

// Tools
H.create_tool = a => {
  for (const s of a.steps || []) validateStep(s);
  return putOne("tools", { id: newId("tool"), name: a.name, description: a.description || "", inputs: a.inputs || [], steps: a.steps || [], output: a.output || {}, folder_id: a.folder_id || null, created_at: now(), updated_at: now() });
};
function validateStep(s) {
  if (!s || !s.name || !s.transformation) throw bad("Each step needs name and transformation.", 'Example: {"name":"llm","transformation":"prompt_completion","params":{"prompt":"..."}}');
  if (!TRANSFORMATIONS[s.transformation]) throw new ToolError("UNSUPPORTED", `Step type '${s.transformation}' is not supported.`, "Call list_transformations.");
}
H.get_tool = a => getOne("tools", a.tool_id, "tool");
H.update_tool = a => putOne("tools", patch(H.get_tool(a), a, ["name", "description", "inputs", "output"]));
H.list_tools = a => ({ tools: listColl("tools", a) });
H.publish_tool = a => { const t = H.get_tool(a); return { tool_id: t.id, version: snapshot("tool", t.id, t, a.note) }; };
H.bulk_delete_tools = a => ({ deleted: a.tool_ids.map(id => delOne("tools", id, "tool").deleted) });
H.add_tool_step = a => { const t = H.get_tool(a); validateStep(a.step); if (t.steps.some(s => s.name === a.step.name)) throw bad(`A step named '${a.step.name}' already exists.`); t.steps.splice(a.position ?? t.steps.length, 0, a.step); putOne("tools", patch(t, {}, [])); return { steps: t.steps.map(s => s.name) }; };
const stepIndex = (t, name) => { const i = t.steps.findIndex(s => s.name === name); if (i < 0) throw notFound("step", name); return i; };
H.remove_tool_step = a => { const t = H.get_tool(a); t.steps.splice(stepIndex(t, a.step_name), 1); putOne("tools", patch(t, {}, [])); return { steps: t.steps.map(s => s.name) }; };
H.move_tool_step = a => { const t = H.get_tool(a); const [s] = t.steps.splice(stepIndex(t, a.step_name), 1); t.steps.splice(a.position, 0, s); putOne("tools", patch(t, {}, [])); return { steps: t.steps.map(s => s.name) }; };
H.update_tool_step = a => { const t = H.get_tool(a); const s = t.steps[stepIndex(t, a.step_name)]; s.params = { ...(s.params || {}), ...a.params }; putOne("tools", patch(t, {}, [])); return s; };
H.update_tool_steps = a => { const t = H.get_tool(a); a.steps.forEach(validateStep); t.steps = a.steps; putOne("tools", patch(t, {}, [])); return { steps: t.steps.map(s => s.name) }; };
H.set_tool_output = a => { const t = H.get_tool(a); t.output = a.output; putOne("tools", patch(t, {}, [])); return { output: t.output }; };
H.list_tool_versions = a => { H.get_tool(a); return { versions: versions("tool", a.tool_id).map(({ data, ...v }) => v) }; };
H.get_tool_version = a => { const v = versions("tool", a.tool_id).find(x => x.version === a.version); if (!v) throw notFound("tool_version", a.version); return v; };
H.restore_tool_version = a => { const v = H.get_tool_version(a); putOne("tools", { ...v.data, updated_at: now() }); return { restored: a.version }; };
H.update_tool_version = a => { const all = load("versions"); const v = (all[`tool:${a.tool_id}`] || []).find(x => x.version === a.version); if (!v) throw notFound("tool_version", a.version); v.note = a.note; save("versions", all); return { version: a.version, note: a.note }; };
H.run_tool = async a => { const r = await executeTool(H.get_tool(a), a.params || {}); return { run_id: r.id, status: r.status, output: r.output, error: r.error }; };
H.trigger_tool = a => { const tool = H.get_tool(a); const p = executeTool(tool, a.params || {}); const runs = Object.values(load("runs")).filter(r => r.tool_id === tool.id).sort((x, y) => y.created_at.localeCompare(x.created_at)); p.catch(() => { }); return { run_id: runs[0]?.id, status: "running", next: "poll_tool_result" }; };
H.poll_tool_result = a => { const r = getOne("runs", a.run_id, "tool_run"); return { run_id: r.id, status: r.status, output: r.output, error: r.error }; };
H.get_tool_run = a => getOne("runs", a.run_id, "tool_run");
H.get_latest_tool_run = a => { const r = listColl("runs", { filter: x => x.tool_id === a.tool_id })[0]; if (!r) throw notFound("tool_run", `latest for ${a.tool_id}`); return r; };
H.list_tool_runs = a => ({ runs: listColl("runs", { limit: a.limit, filter: x => x.tool_id === a.tool_id }).map(({ steps, ...r }) => r) });
H.create_tool_from_transformation = a => { const t = TRANSFORMATIONS[a.transformation_id]; if (!t) throw notFound("transformation", a.transformation_id); return H.create_tool({ name: a.name || a.transformation_id, description: t.description, inputs: [], steps: [{ name: "step1", transformation: a.transformation_id, params: a.params || {} }] }); };
H.search_public_tools = a => ({ templates: TEMPLATES.filter(t => !a.query || JSON.stringify(t).toLowerCase().includes(a.query.toLowerCase())).map(({ steps, ...t }) => t) });
H.clone_public_tool = a => { const t = TEMPLATES.find(x => x.template_id === a.template_id); if (!t) throw notFound("template", a.template_id); return H.create_tool({ ...JSON.parse(JSON.stringify(t)), name: a.name || t.name }); };
H.check_tool_integration_requirements = a => ({ requirements: H.get_tool(a).steps.map(s => ({ step: s.name, ...H.get_transformation_requirements({ transformation_id: s.transformation }) })) });

// Transformations
H.list_transformations = a => ({ transformations: Object.entries(TRANSFORMATIONS).filter(([id, t]) => !a.query || (id + t.description).toLowerCase().includes(a.query.toLowerCase())).map(([id, t]) => ({ id, description: t.description })) });
H.get_transformation = a => { const t = TRANSFORMATIONS[a.transformation_id]; if (!t) throw notFound("transformation", a.transformation_id); return { id: a.transformation_id, ...t }; };
H.get_transformation_requirements = a => {
  const t = H.get_transformation(a);
  const bin = b => spawnSync(b === "claude" ? CLAUDE_BIN : b, ["--version"], { encoding: "utf8" }).status === 0;
  return { transformation_id: a.transformation_id, binaries: t.requires.binaries.map(b => ({ name: b, present: bin(b) })), env: t.requires.env.map(e => ({ name: e, set: !!process.env[e] })) };
};
H.run_transformation = a => { H.get_transformation(a); return runStep(a.transformation_id, a.params || {}, { params: a.params || {} }); };

// Workforces
H.create_workforce = a => { checkGraph(a.nodes || [], a.edges || []); return putOne("workforces", { id: newId("wf"), name: a.name, description: a.description || "", nodes: a.nodes || [], edges: a.edges || [], folder_id: a.folder_id || null, created_at: now(), updated_at: now() }); };
function checkGraph(nodes, edges) {
  const ids = new Set(nodes.map(n => n.id));
  for (const n of nodes) { if (!n.id || !n.agent_id) throw bad("Each node needs id and agent_id."); getOne("agents", n.agent_id, "agent"); }
  for (const e of edges) if (!ids.has(e.from) || !ids.has(e.to)) throw bad(`Edge ${e.from} -> ${e.to} names a node that does not exist.`);
}
H.get_workforce = a => getOne("workforces", a.workforce_id, "workforce");
H.update_workforce = a => { const w = H.get_workforce(a); checkGraph(a.nodes || w.nodes, a.edges || w.edges); return putOne("workforces", patch(w, a, ["name", "description", "nodes", "edges"])); };
H.delete_workforce = a => delOne("workforces", a.workforce_id, "workforce");
H.list_workforces = a => ({ workforces: listColl("workforces", a) });
H.publish_workforce = a => { const w = H.get_workforce(a); gate(w.id); return { workforce_id: w.id, version: snapshot("workforce", w.id, w, a.note) }; };
H.list_workforce_versions = a => { H.get_workforce(a); return { versions: versions("workforce", a.workforce_id).map(({ data, ...v }) => v) }; };
H.trigger_workforce = async a => {
  H.get_workforce(a);
  const t = { id: newId("wtask"), kind: "workforce", workforce_id: a.workforce_id, input: a.message, path: [], messages: [], status: "queued", created_at: now() };
  putOne("tasks", t);
  if (a.wait) { const d = await runWorkforce(t); return { task_id: d.id, status: d.status, reply: d.reply, path: d.path, error: d.error }; }
  runWorkforce(t).catch(() => { }); return { task_id: t.id, status: "queued", next: "poll_workforce_task_result" };
};
H.poll_workforce_task_result = a => { const t = getOne("tasks", a.task_id, "task"); return { task_id: t.id, status: t.status, reply: t.reply, path: t.path, error: t.error }; };
H.list_workforce_tasks = a => ({ tasks: listColl("tasks", { limit: a.limit, filter: t => t.workforce_id === a.workforce_id }).map(({ messages, ...t }) => t) });
H.get_workforce_task_messages = a => ({ messages: getOne("tasks", a.task_id, "task").messages });
H.get_workforce_task_metadata = a => { const { messages, reply, ...m } = getOne("tasks", a.task_id, "task"); return m; };
H.update_workforce_trigger_status = a => { const t = getOne("triggers", a.trigger_id, "trigger"); if (t.target_id !== a.workforce_id) throw bad("That trigger belongs to another target."); return H.update_trigger_status(a); };

// Knowledge
H.create_knowledge_set = a => { const s = load("knowledge"); if (s[a.name]) throw new ToolError("CONFLICT", `Knowledge set '${a.name}' already exists.`); s[a.name] = { id: a.name, name: a.name, description: a.description || "", columns: a.columns || [], created_at: now() }; save("knowledge", s); kbSave(a.name, []); return s[a.name]; };
H.get_knowledge_set = a => ({ ...kbMeta(a.knowledge_set), row_count: kbRows(a.knowledge_set).length });
H.update_knowledge_set = a => { const s = load("knowledge"); kbMeta(a.knowledge_set); patch(s[a.knowledge_set], a, ["description", "columns"]); save("knowledge", s); return s[a.knowledge_set]; };
H.delete_knowledge_set = a => { kbMeta(a.knowledge_set); const s = load("knowledge"); delete s[a.knowledge_set]; save("knowledge", s); const r = load("knowledge_rows"); delete r[a.knowledge_set]; save("knowledge_rows", r); return { deleted: a.knowledge_set }; };
H.list_knowledge_sets = a => ({ knowledge_sets: listColl("knowledge", a).map(s => ({ ...s, row_count: kbRows(s.name).length })) });
H.add_knowledge_rows = a => { kbMeta(a.knowledge_set); const rows = kbRows(a.knowledge_set); const added = a.rows.map(r => ({ ...r, _id: r._id || newId("row") })); kbSave(a.knowledge_set, rows.concat(added)); return { added: added.length, ids: added.map(r => r._id) }; };
H.list_knowledge_rows = a => { kbMeta(a.knowledge_set); const rows = kbRows(a.knowledge_set).filter(r => matches(r, a.filters)); const off = a.offset || 0; return { total: rows.length, rows: rows.slice(off, off + (a.limit || 50)) }; };
H.get_knowledge_row = a => { kbMeta(a.knowledge_set); const r = kbRows(a.knowledge_set).find(x => x._id === a.row_id); if (!r) throw notFound("knowledge_row", a.row_id); return r; };
H.update_knowledge_rows = a => { kbMeta(a.knowledge_set); const rows = kbRows(a.knowledge_set); let n = 0; for (const u of a.rows) { const r = rows.find(x => x._id === u._id); if (!r) throw notFound("knowledge_row", u._id); Object.assign(r, u); n++; } kbSave(a.knowledge_set, rows); return { updated: n }; };
H.delete_knowledge_rows = a => { kbMeta(a.knowledge_set); const rows = kbRows(a.knowledge_set); const keep = rows.filter(r => !a.row_ids.includes(r._id)); kbSave(a.knowledge_set, keep); return { deleted: rows.length - keep.length }; };
H.delete_knowledge_columns = a => { kbMeta(a.knowledge_set); const rows = kbRows(a.knowledge_set).map(r => { for (const c of a.columns) if (c !== "_id") delete r[c]; return r; }); kbSave(a.knowledge_set, rows); return { removed: a.columns }; };
H.import_knowledge_file = a => {
  kbMeta(a.knowledge_set);
  if (!fs.existsSync(a.file_path)) throw notFound("file", a.file_path);
  const text = fs.readFileSync(a.file_path, "utf8"); const ext = path.extname(a.file_path).toLowerCase(); const src = path.basename(a.file_path);
  let rows;
  if (ext === ".csv") rows = parseCsv(text);
  else if (ext === ".json") { const j = JSON.parse(text); rows = Array.isArray(j) ? j : [j]; }
  else if (ext === ".jsonl") rows = text.split("\n").filter(Boolean).map(l => JSON.parse(l));
  else rows = chunk(text).map((c, i) => ({ text: c, source: src, chunk: i, status: "active" }));
  return H.add_knowledge_rows({ knowledge_set: a.knowledge_set, rows });
};
H.export_knowledge = a => {
  kbMeta(a.knowledge_set); const rows = kbRows(a.knowledge_set);
  const fmt = a.format || (a.file_path.endsWith(".csv") ? "csv" : "jsonl");
  let out;
  if (fmt === "csv") { const cols = [...new Set(rows.flatMap(Object.keys))]; const esc = v => `"${String(typeof v === "object" ? JSON.stringify(v) : v ?? "").replace(/"/g, '""')}"`; out = [cols.join(","), ...rows.map(r => cols.map(c => esc(r[c])).join(","))].join("\n"); }
  else out = rows.map(r => JSON.stringify(r)).join("\n");
  fs.mkdirSync(path.dirname(path.resolve(a.file_path)), { recursive: true }); fs.writeFileSync(a.file_path, out); return { file_path: path.resolve(a.file_path), rows: rows.length, format: fmt };
};

// Triggers
H.create_trigger = a => {
  if (!["agent", "workforce"].includes(a.target_type)) throw bad("target_type must be agent or workforce.");
  if (!["schedule", "webhook", "manual"].includes(a.type)) throw bad("type must be schedule, webhook, or manual.");
  getOne(a.target_type === "agent" ? "agents" : "workforces", a.target_id, a.target_type);
  const t = { id: newId("trg"), target_id: a.target_id, target_type: a.target_type, type: a.type, config: a.config || {}, message: a.message || "", enabled: true, last_fired_at: null, created_at: now() };
  const call = a.target_type === "agent" ? `trigger_agent with agent_id ${a.target_id}` : `trigger_workforce with workforce_id ${a.target_id} and wait true`;
  t.fire_command = `claude -p ${JSON.stringify(`Use the workforce MCP server: call ${call} and message: ${t.message || "<message>"}`)} --allowedTools mcp__workforce__${a.target_type === "agent" ? "trigger_agent" : "trigger_workforce"}`;
  if (a.type === "schedule") t.setup = `This server does not run in the background. Add a cron line (${t.config.cron || "<cron>"} cd <project> && ${t.fire_command}) or a Claude Code scheduled task that runs fire_command.`;
  if (a.type === "webhook") t.setup = "This server has no HTTP listener. Point your webhook relay (for example an n8n or Zapier step) at a machine that runs fire_command.";
  return putOne("triggers", t);
};
H.get_trigger = a => getOne("triggers", a.trigger_id, "trigger");
H.delete_trigger = a => delOne("triggers", a.trigger_id, "trigger");
H.update_trigger_status = a => { const t = H.get_trigger(a); t.enabled = !!a.enabled; return putOne("triggers", t); };
H.list_trigger_statuses = a => ({ triggers: Object.values(load("triggers")).filter(t => !a.target_id || t.target_id === a.target_id).map(t => ({ id: t.id, target_id: t.target_id, type: t.type, enabled: t.enabled, last_fired_at: t.last_fired_at })) });

// Evals
H.create_eval_test_set = a => { if (!load("agents")[a.target_id] && !load("workforces")[a.target_id]) throw notFound("target", a.target_id); return putOne("test_sets", { id: newId("tset"), name: a.name, target_id: a.target_id, description: a.description || "", created_at: now() }); };
H.get_eval_test_set = a => ({ ...getOne("test_sets", a.test_set_id, "eval_test_set"), test_cases: Object.values(load("test_cases")).filter(c => c.test_set_id === a.test_set_id) });
H.update_eval_test_set = a => putOne("test_sets", patch(getOne("test_sets", a.test_set_id, "eval_test_set"), a, ["name", "description"]));
H.delete_eval_test_set = a => { const r = delOne("test_sets", a.test_set_id, "eval_test_set"); const c = load("test_cases"); for (const k of Object.keys(c)) if (c[k].test_set_id === a.test_set_id) delete c[k]; save("test_cases", c); return r; };
H.list_eval_test_sets = a => ({ test_sets: listColl("test_sets", { filter: s => !a.target_id || s.target_id === a.target_id }) });
H.create_eval_test_case = a => { getOne("test_sets", a.test_set_id, "eval_test_set"); if (!a.input && !a.scenario) throw bad("Give input or scenario."); return putOne("test_cases", { id: newId("tcase"), test_set_id: a.test_set_id, name: a.name, input: a.input || "", scenario: a.scenario || "", expected: a.expected || "", rules: [], simulation: {}, created_at: now() }); };
H.get_eval_test_case = a => getOne("test_cases", a.test_case_id, "eval_test_case");
H.update_eval_test_case = a => putOne("test_cases", patch(H.get_eval_test_case(a), a, ["name", "input", "scenario", "expected"]));
H.delete_eval_test_case = a => delOne("test_cases", a.test_case_id, "eval_test_case");
H.list_eval_test_cases = a => ({ test_cases: Object.values(load("test_cases")).filter(c => c.test_set_id === a.test_set_id) });
const RULE_TYPES = ["contains", "not_contains", "regex", "llm_judge"];
const checkRule = r => { if (!r || !RULE_TYPES.includes(r.type)) throw bad(`Rule type must be one of ${RULE_TYPES.join(", ")}.`); if (r.type === "regex") new RegExp(r.value); };
H.add_eval_test_case_rule = a => { checkRule(a.rule); const c = H.get_eval_test_case(a); c.rules.push(a.rule); putOne("test_cases", c); return { rules: c.rules }; };
H.remove_eval_test_case_rule = a => { const c = H.get_eval_test_case(a); if (!c.rules[a.index]) throw notFound("rule", a.index); c.rules.splice(a.index, 1); putOne("test_cases", c); return { rules: c.rules }; };
H.set_eval_test_case_simulation_config = a => { const c = H.get_eval_test_case(a); c.simulation = a.config; putOne("test_cases", c); return c; };
H.create_eval_check = a => { checkRule(a); return putOne("checks", { id: newId("check"), name: a.name, type: a.type, value: a.value || "", rubric: a.rubric || "", target_id: a.target_id || null, created_at: now() }); };
H.update_eval_check = a => { const c = getOne("checks", a.check_id, "eval_check"); patch(c, a, ["name", "type", "value", "rubric"]); checkRule(c); return putOne("checks", c); };
H.delete_eval_check = a => delOne("checks", a.check_id, "eval_check");
H.list_eval_checks = a => ({ checks: listColl("checks", { filter: c => !a.target_id || c.target_id === a.target_id }) });
H.run_evaluation = a => { const b = startBatch(a.test_set_id, a.check_ids); runBatch(b).catch(() => { }); return { batch_id: b.id, status: "running", next: "poll_eval_batch_result" }; };
H.list_eval_runs = a => ({ results: getOne("batches", a.batch_id, "eval_batch").results });
H.list_eval_batches = a => ({ batches: listColl("batches", { filter: b => !a.test_set_id || b.test_set_id === a.test_set_id }).map(({ results, ...b }) => b) });
H.get_eval_batch_summary = a => { const b = getOne("batches", a.batch_id, "eval_batch"); return { batch_id: b.id, status: b.status, summary: b.summary || { done: b.results.length } }; };
H.poll_eval_batch_result = a => getOne("batches", a.batch_id, "eval_batch");
H.cancel_eval_batch = a => { const b = getOne("batches", a.batch_id, "eval_batch"); if (b.status === "running") b.status = "cancelled"; return putOne("batches", b); };
H.delete_eval_batch = a => delOne("batches", a.batch_id, "eval_batch");

// Alarms
const METRICS = ["error_count", "failed_tasks", "eval_pass_rate"];
H.create_alarm = a => { if (!METRICS.includes(a.metric)) throw bad(`metric must be one of ${METRICS.join(", ")}.`); return alarmState(putOne("alarms", { id: newId("alarm"), name: a.name, target_id: a.target_id, metric: a.metric, threshold: a.threshold, window_hours: a.window_hours || 24, comparison: a.comparison, enabled: true, created_at: now() })); };
H.get_alarm = a => alarmState(getOne("alarms", a.alarm_id, "alarm"));
H.update_alarm = a => alarmState(putOne("alarms", patch(getOne("alarms", a.alarm_id, "alarm"), a, ["name", "threshold", "window_hours", "comparison", "enabled"])));
H.delete_alarm = a => delOne("alarms", a.alarm_id, "alarm");
H.list_alarms = a => ({ alarms: listColl("alarms", { filter: x => !a.target_id || x.target_id === a.target_id }).map(alarmState) });

// Dashboards
H.create_performance_dashboard = a => putOne("dashboards", { id: newId("dash"), name: a.name, target_id: a.target_id, description: a.description || "", rules: [], created_at: now() });
H.update_performance_dashboard = a => putOne("dashboards", patch(getOne("dashboards", a.dashboard_id, "performance_dashboard"), a, ["name", "description"]));
H.delete_performance_dashboard = a => delOne("dashboards", a.dashboard_id, "performance_dashboard");
H.list_performance_dashboards = a => ({ dashboards: listColl("dashboards", { filter: d => !a.target_id || d.target_id === a.target_id }) });
H.add_performance_dashboard_rule = a => { checkRule(a.rule); const d = getOne("dashboards", a.dashboard_id, "performance_dashboard"); d.rules.push(a.rule); return putOne("dashboards", d); };
H.remove_performance_dashboard_rule = a => { const d = getOne("dashboards", a.dashboard_id, "performance_dashboard"); if (!d.rules[a.index]) throw notFound("rule", a.index); d.rules.splice(a.index, 1); return putOne("dashboards", d); };
H.list_performance_dashboard_runs = async a => ({ runs: await scoreDashboard(getOne("dashboards", a.dashboard_id, "performance_dashboard"), a.limit) });
H.get_performance_dashboard_timeseries = async a => {
  const runs = (await H.list_performance_dashboard_runs({ dashboard_id: a.dashboard_id, limit: 500 })).runs.filter(r => Date.parse(r.at) >= since(a.days || 30));
  const by = {}; for (const r of runs) { const d = (by[day(r.at)] ||= { date: day(r.at), total: 0, pass: 0 }); d.total++; if (r.pass) d.pass++; }
  return { series: Object.values(by).sort((x, y) => x.date.localeCompare(y.date)).map(d => ({ ...d, pass_rate: d.pass / d.total })) };
};

// Pre-publish gate
function gate(target_id) {
  const g = load("prepublish")[target_id]; if (!g) return;
  const b = Object.values(load("batches")).filter(x => x.test_set_id === g.test_set_id && x.status === "complete").sort((x, y) => y.created_at.localeCompare(x.created_at))[0];
  const rate = b?.summary?.pass_rate ?? 0;
  if (rate < (g.min_pass_rate ?? 1)) throw new ToolError("PUBLISH_BLOCKED", `The pre-publish gate needs pass rate ${g.min_pass_rate ?? 1}; the latest batch has ${b ? rate : "no result"}.`, "Run poll_pre_publish_check, fix failures, then publish.");
}
H.upsert_pre_publish_config = a => { getOne("test_sets", a.test_set_id, "eval_test_set"); const g = load("prepublish"); g[a.target_id] = { target_id: a.target_id, test_set_id: a.test_set_id, min_pass_rate: a.min_pass_rate ?? 1, updated_at: now() }; save("prepublish", g); return g[a.target_id]; };
H.delete_pre_publish_config = a => { const g = load("prepublish"); if (!g[a.target_id]) throw notFound("pre_publish_config", a.target_id); delete g[a.target_id]; save("prepublish", g); return { deleted: a.target_id }; };
H.get_pre_publish_status = a => { const g = load("prepublish")[a.target_id]; if (!g) throw notFound("pre_publish_config", a.target_id); try { gate(a.target_id); return { ...g, publish_allowed: true }; } catch (e) { return { ...g, publish_allowed: false, reason: e.message }; } };
H.poll_pre_publish_check = async a => { const g = load("prepublish")[a.target_id]; if (!g) throw notFound("pre_publish_config", a.target_id); const b = await runBatch(startBatch(g.test_set_id)); return { batch_id: b.id, summary: b.summary, publish_allowed: b.summary.pass_rate >= g.min_pass_rate }; };

// Bulk runs
async function runBulk(br) {
  const items = br.items;
  const conc = Math.max(1, Math.min(br.concurrency || 2, 8)); let i = 0;
  async function worker() {
    while (i < items.length) {
      const cur = load("bulk_runs")[br.id]; if (cur.status === "cancelled") return; if (cur.status === "paused") { await new Promise(r => setTimeout(r, 1000)); continue; }
      const idx = i++; const item = items[idx]; let res;
      try {
        if (br.target_type === "tool") { const r = await executeTool(getOne("tools", br.target_id, "tool"), item); res = { index: idx, status: r.status, output: r.output, error: r.error }; }
        else { const t = await runAgentTask(newAgentTask(br.target_id, render(br.message_template || "{{item}}", { item: typeof item === "string" ? item : JSON.stringify(item), ...((typeof item === "object" && item) || {}) }))); res = { index: idx, status: t.status, output: t.reply, task_id: t.id, error: t.error }; }
      } catch (e) { res = { index: idx, status: "failed", error: e.message }; }
      const b = load("bulk_runs")[br.id]; b.results.push(res); b.done = b.results.length; putOne("bulk_runs", b);
    }
  }
  await Promise.all(Array.from({ length: conc }, worker));
  const b = load("bulk_runs")[br.id]; if (b.status !== "cancelled") b.status = "complete"; b.finished_at = now(); putOne("bulk_runs", b);
}
H.start_bulk_run = a => {
  if (!["agent", "tool"].includes(a.target_type)) throw bad("target_type must be agent or tool.");
  getOne(a.target_type === "agent" ? "agents" : "tools", a.target_id, a.target_type);
  const items = a.items || (a.knowledge_set ? kbRows(a.knowledge_set) : null);
  if (!items || !items.length) throw bad("Give items[] or a knowledge_set with rows.");
  const br = putOne("bulk_runs", { id: newId("bulk"), target_id: a.target_id, target_type: a.target_type, items, message_template: a.message_template, concurrency: a.concurrency, status: "running", total: items.length, done: 0, results: [], created_at: now() });
  runBulk(br).catch(() => { }); return { bulk_run_id: br.id, total: items.length, status: "running", next: "get_bulk_run" };
};
H.get_bulk_run = a => { const { items, ...b } = getOne("bulk_runs", a.bulk_run_id, "bulk_run"); return b; };
H.list_bulk_runs = a => ({ bulk_runs: listColl("bulk_runs", { filter: b => !a.target_id || b.target_id === a.target_id }).map(({ items, results, ...b }) => b) });
H.update_bulk_run_status = a => { if (!["paused", "running", "cancelled"].includes(a.status)) throw bad("status must be paused, running, or cancelled."); const b = getOne("bulk_runs", a.bulk_run_id, "bulk_run"); if (b.status === "complete") throw bad("The bulk run is already complete."); b.status = a.status; putOne("bulk_runs", b); return { bulk_run_id: b.id, status: b.status }; };

// Folders
H.upsert_folder = a => { const f = a.folder_id ? getOne("folders", a.folder_id, "folder") : { id: newId("folder"), created_at: now() }; f.name = a.name; if (a.parent_id !== undefined) f.parent_id = a.parent_id; return putOne("folders", f); };
H.delete_folder = a => { const r = delOne("folders", a.folder_id, "folder"); for (const c of ["agents", "tools", "workforces"]) { const all = load(c); for (const x of Object.values(all)) if (x.folder_id === a.folder_id) x.folder_id = null; save(c, all); } return r; };
H.list_folders = () => ({ folders: listColl("folders") });

// Priorities
H.set_resource_task_priority = a => { if (!(a.priority >= 1 && a.priority <= 5)) throw bad("priority must be 1 to 5."); const p = load("priorities"); p[a.target_id] = { target_id: a.target_id, priority: a.priority, updated_at: now() }; save("priorities", p); return p[a.target_id]; };
H.unset_resource_task_priority = a => { const p = load("priorities"); if (!p[a.target_id]) throw notFound("priority", a.target_id); delete p[a.target_id]; save("priorities", p); return { unset: a.target_id }; };
H.list_resource_task_priorities = () => ({ priorities: Object.values(load("priorities")) });

// Analytics
H.get_analytics_agent_activity_timeseries = a => { const by = {}; for (const t of tasksIn(a.days).filter(t => t.agent_id && (!a.agent_id || t.agent_id === a.agent_id))) { const k = `${day(t.created_at)}|${t.agent_id}`; (by[k] ||= { date: day(t.created_at), agent_id: t.agent_id, tasks: 0 }).tasks++; } return { series: Object.values(by).sort((x, y) => x.date.localeCompare(y.date)) }; };
H.get_analytics_errors = a => ({ errors: [...tasksIn(a.days).filter(t => t.status === "failed").map(t => ({ kind: "task", id: t.id, at: t.created_at, error: t.error })), ...runsIn(a.days).filter(r => r.status === "failed").map(r => ({ kind: "tool_run", id: r.id, tool_id: r.tool_id, at: r.created_at, error: r.error }))].sort((x, y) => y.at.localeCompare(x.at)).slice(0, a.limit || 50) });
H.get_analytics_resource_breakdown = a => { const out = {}; const add = (k, s) => { const r = (out[k] ||= { resource: k, total: 0, failed: 0 }); r.total++; if (s === "failed") r.failed++; }; for (const t of tasksIn(a.days)) add(t.agent_id || t.workforce_id, t.status); for (const r of runsIn(a.days)) add(r.tool_id, r.status); return { resources: Object.values(out).sort((x, y) => y.total - x.total) }; };
H.get_analytics_task_status_counts = a => { const c = {}; for (const t of tasksIn(a.days).filter(t => !a.target_id || t.agent_id === a.target_id || t.workforce_id === a.target_id)) c[t.status] = (c[t.status] || 0) + 1; return { counts: c }; };
H.get_analytics_usage_breakdown = a => { const by = {}; for (const u of Object.values(load("usage")).filter(u => Date.parse(u.at) >= since(a.days))) { const m = (by[u.model] ||= { model: u.model, calls: 0, input_chars: 0, output_chars: 0, duration_ms: 0, cost_usd: 0 }); m.calls++; m.input_chars += u.input_chars; m.output_chars += u.output_chars; m.duration_ms += u.duration_ms; m.cost_usd += u.cost_usd || 0; } return { models: Object.values(by) }; };
H.get_analytics_usage_timeseries = a => { const by = {}; for (const u of Object.values(load("usage")).filter(u => Date.parse(u.at) >= since(a.days))) { const d = (by[day(u.at)] ||= { date: day(u.at), calls: 0, duration_ms: 0 }); d.calls++; d.duration_ms += u.duration_ms; } return { series: Object.values(by).sort((x, y) => x.date.localeCompare(y.date)) }; };

// Tasks
H.list_tasks = a => ({ tasks: listColl("tasks", { limit: a.limit || 50, filter: t => !a.status || t.status === a.status }).map(({ messages, ...t }) => t) });

// Project and integrations
H.get_project_info = () => ({ server: "workforce-mcp-server", version: VERSION, store: HOME, agents_dir: AGENTS_DIR, claude_cli: claudeAvailable() || "NOT FOUND", default_model: DEFAULT_MODEL, counts: Object.fromEntries(["agents", "tools", "workforces", "knowledge", "triggers", "test_sets", "tasks", "runs"].map(c => [c, Object.keys(load(c)).length])) });
H.check_api_key_availability = a => ({ keys: a.keys.map(k => ({ key: k, set: !!process.env[k] })) });
H.list_integration_providers = () => ({ providers: INTEGRATIONS.map(i => ({ ...i, connected: !!process.env[i.env] })) });
H.list_oauth_accounts = a => ({ accounts: INTEGRATIONS.filter(i => process.env[i.env] && (!a.provider || i.provider === a.provider)).map(i => ({ provider: i.provider, auth: `env:${i.env}` })), note: "Accounts are env vars. Values are never returned." });
H.list_slack_channels = async a => {
  if (!process.env.SLACK_BOT_TOKEN) throw new ToolError("NOT_CONFIGURED", "SLACK_BOT_TOKEN is not set.", "Set SLACK_BOT_TOKEN in the server's env in .mcp.json.");
  const r = await runStep("api_call", { url: `https://slack.com/api/conversations.list?limit=${a.limit || 200}`, headers: { authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}` } });
  if (!r.response_body?.ok) throw new ToolError("SLACK_ERROR", JSON.stringify(r.response_body?.error || r.status));
  return { channels: r.response_body.channels.map(c => ({ id: c.id, name: c.name })) };
};
const MODELS = [
  { id: "opus", full_id: "claude-opus-5-5", status: "available", use_for: "Hard reasoning, planning, final QA." },
  { id: "sonnet", full_id: "claude-sonnet-5-5", status: "available", use_for: "Default for agents and prompt steps." },
  { id: "haiku", full_id: "claude-haiku-5-5", status: "available", use_for: "Routing, classification, judges, simulated users." },
];
H.list_llm_models = () => ({ models: MODELS, note: "Pass id or full_id as model. The claude CLI resolves aliases." });
H.list_decision_models = () => ({ models: MODELS.filter(m => m.id !== "opus") });
function mcpConfigs() {
  const out = {};
  for (const p of [path.join(process.cwd(), ".mcp.json"), path.join(os.homedir(), ".claude.json")]) {
    try { const j = JSON.parse(fs.readFileSync(p, "utf8")); Object.assign(out, Object.fromEntries(Object.entries(j.mcpServers || {}).map(([k, v]) => [k, { ...v, source: p }]))); } catch { }
  }
  return out;
}
H.list_project_mcp_servers = () => ({ servers: Object.entries(mcpConfigs()).map(([name, c]) => ({ name, type: c.type || (c.url ? "http" : "stdio"), command: c.command, url: c.url, source: c.source })) });
H.list_project_mcp_server_tools = a => { const c = mcpConfigs()[a.server_name]; if (!c) throw notFound("mcp_server", a.server_name); if (a.server_name === "workforce") return { tools: Object.keys(TOOLS) }; return { server: a.server_name, tools: null, note: "Tool lists come from the server at run time. Run `claude mcp get " + a.server_name + "`, or attach it to an agent with tools: [] to allow all." }; };
H.submit_feedback = a => putOne("feedback", { id: newId("fb"), target_id: a.target_id, rating: a.rating, comment: a.comment, created_at: now() });
H.api_call = a => runStep("api_call", a);


// ---------------------------------------------------------------- added 11/17/2026: 17 original-catalog tools
const ACTIVE = ["queued", "running"];
function cancelTask(t) {
  if (!ACTIVE.includes(t.status)) return { task_id: t.id, status: t.status, cancelled: false, note: "The task is not running; nothing changed." };
  const all = load("tasks"); all[t.id].status = "cancelled"; all[t.id].finished_at = now(); save("tasks", all);
  const child = CHILDREN.get(t.id); if (child) child.kill("SIGTERM");
  return { task_id: t.id, status: "cancelled", cancelled: true };
}
H.cancel_agent_task = a => { const t = getOne("tasks", a.task_id, "task"); if (t.agent_id !== a.agent_id) throw bad("That task belongs to another agent."); return cancelTask(t); };
H.cancel_workforce_task = a => {
  const t = getOne("tasks", a.task_id, "task"); if (t.workforce_id !== a.workforce_id) throw bad("That task belongs to another workforce.");
  const r = cancelTask(t); if (r.cancelled && t.current_task_id) { const sub = load("tasks")[t.current_task_id]; if (sub) cancelTask(sub); }
  return r;
};
H.cancel_tool_run = a => {
  const r = getOne("runs", a.task_id, "tool_run");
  if (r.status !== "running") return { run_id: r.id, status: r.status, cancelled: false, note: "The run is not running; nothing changed." };
  const all = load("runs"); all[r.id].status = "cancelled"; all[r.id].finished_at = now(); save("runs", all);
  return { run_id: r.id, status: "cancelled", cancelled: true };
};
H.delete_agent = a => {
  const r = delOne("agents", a.agent_id, "agent");
  const tr = load("triggers"); let n = 0; for (const k of Object.keys(tr)) if (tr[k].target_id === a.agent_id) { delete tr[k]; n++; } save("triggers", tr);
  return { ...r, triggers_deleted: n };
};
H.delete_tool = a => {
  const r = delOne("tools", a.tool_id, "tool");
  const ags = load("agents"); for (const ag of Object.values(ags)) ag.tool_ids = (ag.tool_ids || []).filter(id => id !== a.tool_id); save("agents", ags);
  return r;
};
H.get_task_view = a => { const t = getOne("tasks", a.task_id, "task"); if (t.agent_id !== a.agent_id) throw bad("That task belongs to another agent."); return { deprecated: "use get_agent_task_summary", ...H.get_agent_task_summary(a) }; };
H.list_conversations = a => { if (a.page_size !== undefined && !(Number.isInteger(a.page_size) && a.page_size >= 1 && a.page_size <= 100)) throw bad("page_size must be an integer from 1 to 100."); H.get_agent(a); return { deprecated: "use list_agent_tasks", ...H.list_agent_tasks({ agent_id: a.agent_id, limit: a.page_size }) }; };

const FIELD_TYPES = ["boolean", "string", "number", "single_option", "multiple_option"];
const TITLE_RE = /^[A-Za-z0-9][A-Za-z0-9 _.-]*$/;
H.update_agent_metadata_fields = a => {
  const ag = H.get_agent(a); const cm = ag.custom_metadata || { options: [], settings: {} };
  const errs = []; const seen = new Set();
  const once = t => { if (seen.has(t)) errs.push(`'${t}' appears more than once across upsert, remove, and rename.`); seen.add(t); };
  const fields = cm.options.map(f => ({ ...f }));
  for (const r of a.rename || []) { once(r.from); if (!TITLE_RE.test(r.to || "") || r.to.length > 64) errs.push(`rename.to '${r.to}' must match ${TITLE_RE} and be at most 64 characters.`); const f = fields.find(x => x.title === r.from); if (!f) errs.push(`No field titled '${r.from}' to rename.`); else f.title = r.to; }
  for (const u of a.upsert || []) {
    once(u.title);
    if (!FIELD_TYPES.includes(u.type)) errs.push(`'${u.title}': type must be one of ${FIELD_TYPES.join(", ")}.`);
    const isNew = !fields.some(x => x.title === u.title);
    if (isNew && !TITLE_RE.test(u.title || "")) errs.push(`'${u.title}': a new title holds only letters, digits, spaces, _ - and .`);
    const fill = u.fill || {};
    if (fill.mode === "rule") { if (!["tool", "trigger"].includes(fill.on) || !Array.isArray(fill.ids) || !fill.ids.length) errs.push(`'${u.title}': a rule fill needs on (tool or trigger) and ids.`); if (!["boolean", "number"].includes(u.type)) errs.push(`'${u.title}': a rule fills only boolean or number fields.`); if (fill.on === "tool") for (const id of fill.ids || []) if (!ag.tool_ids.includes(id)) errs.push(`'${u.title}': tool ${id} is not attached to this agent.`); }
    else if (fill.mode !== "agent") errs.push(`'${u.title}': fill.mode must be agent or rule.`);
    if (u.type.endsWith("_option") && !(u.options || []).length) errs.push(`'${u.title}': a choice field needs options.`);
    const i = fields.findIndex(x => x.title === u.title); const rec = { title: u.title, type: u.type, description: u.description || "", fill, ...(u.options ? { options: u.options } : {}) };
    if (i >= 0) fields[i] = rec; else fields.push(rec);
  }
  for (const t of a.remove || []) { once(t); if (!fields.some(x => x.title === t)) errs.push(`No field titled '${t}' to remove.`); }
  if (errs.length) throw bad(errs.join(" "), "Nothing was saved. Fix every listed problem and call again.");
  cm.options = fields.filter(f => !(a.remove || []).includes(f.title));
  if (a.settings) { if ("instructions" in a.settings) cm.settings.instructions = a.settings.instructions; if ("read_enabled" in a.settings) cm.settings.read_enabled = !!a.settings.read_enabled; }
  ag.custom_metadata = cm; putOne("agents", patch(ag, {}, [])); return { agent_id: ag.id, custom_metadata: cm };
};
function relabel(kind, id, a) {
  const all = load("versions"); const list = all[`${kind}:${id}`] || [];
  const v = list.find(x => `${kind}:${id}:v${x.version}` === a.version_id); if (!v) throw notFound(`${kind}_version`, a.version_id);
  if (a.version_name !== undefined) { if (!a.version_name || a.version_name.length > 200) throw bad("version_name must be 1 to 200 characters."); v.name = a.version_name; }
  if (a.version_description !== undefined) { if (!a.version_description || a.version_description.length > 2000) throw bad("version_description must be 1 to 2000 characters."); v.note = a.version_description; }
  save("versions", all); return { version_id: a.version_id, version: v.version, name: v.name, note: v.note };
}
H.update_agent_version = a => { H.get_agent(a); return relabel("agent", a.agent_id, a); };
H.update_workforce_version = a => { H.get_workforce(a); return relabel("workforce", a.workforce_id, a); };
H.restore_workforce_version = a => {
  const m = String(a.version_id).match(/^workforce:(.+):v(\d+)$/); if (!m) throw bad("version_id must look like workforce:<workforce_id>:v<n>.", "Take version_id from list_workforce_versions.");
  const v = versions("workforce", m[1]).find(x => x.version === Number(m[2])); if (!v) throw notFound("workforce_version", a.version_id);
  putOne("workforces", { ...v.data, updated_at: now() }); return { workforce_id: m[1], restored: v.version, note: "Draft replaced. Publish to make it a new version." };
};

function checkEvalAlarm(x) {
  const errs = [];
  if (!["agent", "workforce"].includes(x.resource_type)) errs.push("resource_type must be agent or workforce.");
  else if (!load(x.resource_type === "agent" ? "agents" : "workforces")[x.resource_id]) errs.push(`${x.resource_type} '${x.resource_id}' does not exist.`);
  const s = x.source_config || {};
  if (!["observability_eval", "observability_eval_aggregated"].includes(s.source_type)) errs.push("source_config.source_type must be observability_eval or observability_eval_aggregated.");
  if (!load("dashboards")[s.config_id]) errs.push(`source_config.config_id '${s.config_id}' is not a performance dashboard.`);
  if (s.source_type === "observability_eval" && !s.rule_id) errs.push("source_config.rule_id is required for observability_eval.");
  const c = x.condition_config || {};
  if (!["lt", "lte", "gt", "gte"].includes(c.comparison)) errs.push("condition_config.comparison must be lt, lte, gt, or gte.");
  if (!(c.threshold > 0 && c.threshold <= 1)) errs.push("condition_config.threshold is a fraction above 0 and at most 1 (0.8 means 80%).");
  for (const k of ["evaluation_periods", "datapoints_to_alarm", "min_sample_size"]) if (!(Number.isInteger(c[k]) && c[k] >= 1)) errs.push(`condition_config.${k} must be an integer of at least 1.`);
  if (c.datapoints_to_alarm > c.evaluation_periods) errs.push("datapoints_to_alarm must be at most evaluation_periods.");
  if (!c.period || !["hours", "days"].includes(c.period.unit) || !(Number.isInteger(c.period.value) && c.period.value >= 1)) errs.push("condition_config.period needs value (integer of at least 1) and unit (hours or days).");
  if (!Array.isArray(x.channels) || !x.channels.length) errs.push("channels needs at least one channel.");
  const types = new Set(); for (const ch of x.channels || []) { if (types.has(ch.type)) errs.push(`Only one ${ch.type} channel is allowed.`); types.add(ch.type);
    if (ch.type === "email" ? !(Array.isArray(ch.emails) && ch.emails.length) : ch.type === "slack" ? !(ch.oauth_account_id && ch.channel_id) : ch.type === "teams" ? !(ch.oauth_account_id && ch.team_id && ch.channel_id) : true) errs.push(`Channel ${JSON.stringify(ch)} is incomplete or of an unknown type.`); }
  if (!(Number.isInteger(x.cooldown_minutes) && x.cooldown_minutes >= 0 && x.cooldown_minutes <= 10080)) errs.push("cooldown_minutes must be an integer from 0 to 10080.");
  if (errs.length) throw bad(errs.join(" "));
}
function evalAlarmState(al) {
  const d = load("dashboards")[al.source_config.config_id]; return { ...al, delivery: "not_sent", note: "This server stores channels but sends no notifications. Read state with get_performance_dashboard_timeseries.", dashboard_exists: !!d };
}
const EA_KEYS = ["name", "enabled", "cooldown_minutes", "auto_diagnose", "skip_recovery_alert", "source_config", "channels"];
H.create_eval_alarm = a => { checkEvalAlarm(a); const al = { id: newId("ealarm"), resource_type: a.resource_type, resource_id: a.resource_id, source_config: a.source_config, condition_config: a.condition_config, channels: a.channels, cooldown_minutes: a.cooldown_minutes, enabled: a.enabled, name: a.name || null, auto_diagnose: !!a.auto_diagnose, skip_recovery_alert: !!a.skip_recovery_alert, created_at: now() }; return evalAlarmState(putOne("eval_alarms", al)); };
function getEvalAlarm(a) { const al = getOne("eval_alarms", a.alarm_id, "eval_alarm"); if (al.resource_type !== a.resource_type || al.resource_id !== a.resource_id) throw bad("That alarm belongs to another resource."); return al; }
H.update_eval_alarm = a => {
  const al = getEvalAlarm(a); if (a.name === "" ) throw bad("An alarm's name cannot be cleared once set.");
  for (const k of EA_KEYS) if (a[k] !== undefined) al[k] = a[k];
  if (a.condition_config) al.condition_config = { ...al.condition_config, ...a.condition_config, period: { ...al.condition_config.period, ...(a.condition_config.period || {}) } };
  checkEvalAlarm(al); al.updated_at = now(); return evalAlarmState(putOne("eval_alarms", al));
};
H.delete_eval_alarm = a => { getEvalAlarm(a); return delOne("eval_alarms", a.alarm_id, "eval_alarm"); };

const listing = t => ({ listing_id: t.template_id, display_id: t.template_id, name: t.name, description: t.description, entity_type: "tool", price_type: "free", categories: [] });
H.search_marketplace_listings = a => {
  let items = TEMPLATES.map(listing);
  if (a.entity_type && a.entity_type !== "tool") items = [];
  if (a.price_type === "paid") items = [];
  if (a.query) items = items.filter(l => (l.name + " " + l.description).toLowerCase().includes(a.query.toLowerCase()));
  const size = a.page_size || 20, page = a.page || 1; return { total: items.length, page, listings: items.slice((page - 1) * size, page * size), note: "Listings come from the bundled template library. Only tools exist there." };
};
H.get_marketplace_listing = a => { const t = TEMPLATES.find(x => x.template_id === a.listing_id); if (!t) throw notFound("marketplace_listing", a.listing_id); return { ...listing(t), inputs: t.inputs, steps: t.steps, output: t.output }; };
H.clone_marketplace_listing = a => { H.get_marketplace_listing(a); const tool = H.clone_public_tool({ template_id: a.listing_id }); return { cloned: [{ entity_type: "tool", id: tool.id, name: tool.name }] }; };

// ---------------------------------------------------------------- Microsoft Office COM family
const PS_BIN = process.env.WORKFORCE_POWERSHELL || "powershell.exe";
const COM_SCRIPT = path.join(path.dirname(SELF), "com", "office-com.ps1");
const WIN_ROOT = process.env.WORKFORCE_WINDOWS_ROOT || "";
const PATH_ARGS = { word_create_document: ["path"], word_read_document: ["path"], word_append_text: ["path"], word_append_image: ["path", "image_path"], word_replace_text: ["path"], excel_create_workbook: ["path"], excel_append_row: ["path"], excel_read_range: ["path"], excel_update_range: ["path"], excel_add_worksheet: ["path"], fs_list: ["path"], fs_read: ["path"], fs_write: ["path"], fs_move: ["source", "destination"], fs_delete: ["path"], fs_create_folder: ["path"] };
function guardPath(p) {
  if (!WIN_ROOT) throw new ToolError("NOT_CONFIGURED", "WORKFORCE_WINDOWS_ROOT is not set.", "Set it in the server env to the one folder Word, Excel, and FileSystemObject may touch.");
  const P = /^[A-Za-z]:[\\/]|^\\\\/.test(WIN_ROOT) ? path.win32 : path;
  const root = P.resolve(WIN_ROOT), full = P.resolve(root, p || ".");
  const rel = P.relative(root, full);
  if (rel.startsWith("..") || P.isAbsolute(rel)) throw new ToolError("PATH_OUTSIDE_ROOT", `Path '${p}' is outside WORKFORCE_WINDOWS_ROOT.`, "Use a path relative to the workspace root.");
  return full;
}
function runCom(op, args) {
  for (const k of PATH_ARGS[op] || []) if (args[k] !== undefined || k === "path") guardPath(args[k]);
  if (process.platform !== "win32" && !process.env.WORKFORCE_POWERSHELL) throw new ToolError("UNSUPPORTED_HOST", `${os.type()} ${os.release()} (${process.platform}) has no Office COM.`, "Run the server on Windows with desktop Office and classic Outlook.");
  const r = spawnSync(PS_BIN, ["-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-File", COM_SCRIPT], { input: JSON.stringify({ op, args, root: WIN_ROOT }), encoding: "utf8", timeout: TIMEOUT_MS, windowsHide: true });
  if (r.error) throw new ToolError("POWERSHELL_UNAVAILABLE", r.error.message, "Set WORKFORCE_POWERSHELL to powershell.exe or pwsh.");
  let out; try { out = JSON.parse(r.stdout); } catch { throw new ToolError("COM_FAILED", (r.stderr || r.stdout || `exit ${r.status}`).slice(0, 2000)); }
  if (out && out.error) throw new ToolError(out.error, out.message);
  return out;
}
for (const [name, spec] of Object.entries(TOOLS)) if (spec[0] === "com") H[name] = a => runCom(name, a);

// ---------------------------------------------------------------- MCP wiring
const missing = Object.keys(TOOLS).filter(n => !H[n]);
if (missing.length) { console.error("Handlers missing for:", missing.join(", ")); process.exit(1); }


// ---------------------------------------------------------------- original-catalog argument aliases (added 11/17/2026)
// Callers written against the original catalog may pass its argument names. Each alias maps an
// original name to this server's name when the server name is absent. Shape changes (for example
// create_tool `transformations` vs `steps`) are not aliased; see docs/SCHEMA-COMPARE.md.
const GLOBAL_ALIASES = { studio_id: "tool_id", eval_batch_id: "batch_id", chain_ids: "tool_ids", chain_id: "tool_id", mcp_server_config_id: "server_name", document_ids: "row_ids", fields: "columns", page_size: "limit" };
const TOOL_ALIASES = {
  get_knowledge_row: { document_id: "row_id" }, delete_trigger: { document_id: "trigger_id" },
  poll_agent_result: { conversation_id: "task_id" }, poll_tool_result: { job_id: "run_id" }, get_tool_run: { task_id: "run_id" },
  add_performance_dashboard_rule: { config_id: "dashboard_id" }, remove_performance_dashboard_rule: { config_id: "dashboard_id" },
  delete_performance_dashboard: { config_id: "dashboard_id" }, update_performance_dashboard: { config_id: "dashboard_id" },
  get_performance_dashboard_timeseries: { config_id: "dashboard_id" }, list_performance_dashboard_runs: { config_id: "dashboard_id" },
  update_trigger_status: { trigger_id: "trigger_id" }, update_workforce_trigger_status: { trigger_group_id: "trigger_id" },
  upsert_folder: { parent_folder_id: "parent_id" }, set_resource_task_priority: { resource_id: "target_id" }, unset_resource_task_priority: { resource_id: "target_id" },
};
const RESOURCE_TO_TARGET = new Set(Object.entries(TOOLS).filter(([, s]) => /\btarget_id\b/.test(s[2])).map(([n]) => n));
function applyAliases(name, args) {
  const a = { ...args }, map = { ...GLOBAL_ALIASES, ...(TOOL_ALIASES[name] || {}) };
  const props = parseParams(TOOLS[name][2]).properties;
  for (const [from, to] of Object.entries(map)) if (a[from] !== undefined && a[to] === undefined && props[to] && !props[from]) { a[to] = a[from]; delete a[from]; }
  if (RESOURCE_TO_TARGET.has(name) && a.resource_id !== undefined && a.target_id === undefined && !props.resource_id) { a.target_id = a.resource_id; delete a.resource_id; delete a.resource_type; }
  if (name === "set_resource_task_priority" && a.priority_tier && a.priority === undefined) a.priority = { high: 1, medium: 3, low: 5 }[a.priority_tier];
  return a;
}

export async function callTool(name, args = {}) {
  const spec = TOOLS[name];
  if (!spec) throw new ToolError("UNKNOWN_TOOL", `Tool '${name}' does not exist.`);
  args = applyAliases(name, args);
  const schema = parseParams(spec[2]);
  need(args, ...schema.required);
  for (const [k, p] of Object.entries(schema.properties)) {
    if (args[k] === undefined) continue;
    const ok = p.type === "array" ? Array.isArray(args[k]) : p.type === "object" ? typeof args[k] === "object" && !Array.isArray(args[k]) : typeof args[k] === p.type;
    if (!ok) throw bad(`'${k}' must be ${p.type}.`);
  }
  return H[name](args);
}

export function createServer() {
  const server = new Server({ name: "workforce", version: VERSION }, { capabilities: { tools: {} } });
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: Object.entries(TOOLS).map(([name, [family, description, params]]) => ({ name, description: `[${family}] ${description}`, inputSchema: parseParams(params) })),
  }));
  server.setRequestHandler(CallToolRequestSchema, async req => {
    const { name, arguments: args } = req.params;
    try {
      const result = await callTool(name, args || {});
      return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
    } catch (e) {
      const err = { error: e.code || "INTERNAL", message: e.message, ...(e.hint ? { hint: e.hint } : {}) };
      console.error(`[workforce] ${name} failed: ${err.error}`); // never log args: they can hold personal data
      return { isError: true, content: [{ type: "text", text: JSON.stringify(err, null, 2) }] };
    }
  });
  return server;
}

if (process.argv[1] && path.resolve(process.argv[1]) === SELF) {
  const server = createServer();
  await server.connect(new StdioServerTransport());
  console.error(`[workforce] ready: ${Object.keys(TOOLS).length} tools, store ${HOME}`);
}
