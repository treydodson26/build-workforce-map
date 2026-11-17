"""Stage 4: build the canvas page from the reference canvas and spec.json.

Usage: python3 -I build_canvas.py <reference.html> <spec.json> <ids.json> <out.html>
Every replacement is asserted, so a reference change fails loudly.
"""
import json, re, sys

ref, spec_p, ids_p, out = sys.argv[1:5]
t = open(ref, encoding="utf-8").read()
S = json.load(open(spec_p)); IDS = json.load(open(ids_p))
LBL = {"haiku": "Claude Haiku 5.5 (haiku)", "sonnet": "Claude Sonnet 5.5 (sonnet)", "opus": "Claude Opus 5.5 (opus)"}
ICON = {"reader": "list", "analyst": "search", "drafter": "pen", "reviewer": "eye", "delivery": "msg"}
WF = S["master"]["name"].replace(" Coordinator", "")

def rep(old, new, count=1, regex=False):
    global t
    n = len(re.findall(old, t)) if regex else t.count(old)
    assert n >= 1, f"not found: {old[:80]}"
    t = re.sub(old, new, t, count=0 if count == 0 else count) if regex else t.replace(old, new, -1 if count == 0 else count)

def js(v): return json.dumps(v, ensure_ascii=False)
def tests(rows): return [f"{r[0]}. Pass: {r[1]}." for r in rows]

D = {}
m = S["master"]
D["master"] = {"type": "Workforce", "cls": "wf", "name": m["name"], "id": IDS["master"], "fn": m["fn"], "model": LBL[m["model"]],
               "trigger": m["trigger"], "prompt": m["prompt"], "handoffs": m["handoffs"], "tests": tests(m["tests"])}
for k in S["order"]:
    a = S[k]
    D[k] = {"type": "Agent", "cls": "ag", "name": a["name"], "id": IDS[k], "fn": a["fn"], "model": LBL[a["model"]], "trigger": a["trigger"],
            "knowledge": "status_templates (base rag-rules)" if a["knowledge"].startswith("kb:") else "None", "approval": a["approval"],
            "tools": a["tools"], "prompt": a["prompt"], "tests": tests(a["tests"])}
o = S["output"]
D["output"] = {"type": "Output", "cls": "out", "name": o["name"], "id": o["id"], "fn": o["fn"], "tree": o["tree"],
               "deliverables": [[r[0], r[1], r[3], f"{r[4]} · file name: {r[2]}", r[5]] for r in o["deliverables"]], "tests": tests(o["tests"])}
for k, v in S.items():
    if isinstance(v, dict) and v.get("type") == "Tool":
        D[k] = {"type": "Tool", "cls": "tl", "name": v["name"], "id": IDS.get(k, v["id"] + " (MCP tool on the workforce server)"), "fn": v["fn"],
                "steplabel": v["steplabel"], "inputs": v["inputs"], "steps": v["steps"], "output": v["output"], "tests": tests(v["tests"])}
        if any("ask" in x[2] and x[2] != "never-ask" for a in S["order"] for x in S[a]["tools"] if x[0] == v["name"]):
            D[k]["approval"] = next(x[2] for a in S["order"] for x in S[a]["tools"] if x[0] == v["name"]) + " on the agent"

# 1. Data block
s = t.index("const D = {"); e = t.index("\n};", s) + 3
t = t[:s] + "const D = " + js(D) + ";" + t[e:]
# 2. Agent keys, icons, returns
s = t.index("const D_EXTRA={"); e = t.index("};", s) + 2
extra = ",\n".join(f'  {k}:{{icon:ICO.{ICON[k]},returns:{js(S[k]["returns"])}}}' for k in S["order"]) + ",\n  master:{icon:ICO.compass}"
t = t[:s] + "const D_EXTRA={\n" + extra + "\n};" + t[e:]
rep('let ORDER=["scout","audience","planner","drafter","reviewer","qa"];', f"let ORDER={js(S['order'])};")
# 3. Per-agent CSS selectors
old_keys = ["scout", "audience", "planner", "drafter", "reviewer", "qa"]
for suffix in [" .nh{", " .nh .ty{", " .nh .ic{", " .nh .msel{"]:
    old = ",".join(f"#n_{k}{suffix.split('{')[0]}" for k in old_keys) + "{"
    new = ",".join(f"#n_{k}{suffix.split('{')[0]}" for k in S["order"]) + "{"
    rep(old, new)
# 4. Titles, trigger card, loop label, hard-coded tool link, storage keys
rep("<title>Stage 2 Build Map: Content Army (Claude Code workforce server)</title>", f"<title>Stage 2 Build Map: {WF}</title>")
rep('<div class="t">Content Army</div>', f'<div class="t">{WF}</div>')
rep("1 coordinator, 6 agents, 11 tools", f"1 coordinator, {len(S['order'])} agents, {sum(1 for v in D.values() if v['type']=='Tool')} tools")
tr = S["trigger"]
fields = ", ".join(f"{r[0]}{'' if r[2]=='required' else ' (optional)'}" for r in tr["inputs"])
rep('<div class="nm">Chat message</div><div class="ty">Trigger</div>', f'<div class="nm">{tr["name"]}</div><div class="ty">Trigger · {tr["kind"]}</div>')
rep("User sends a content request: topic, format, audience.", f'{tr["fn"]} Fields: {fields}.')
rep('"REVISE → Drafter (max 2)"', '"REVISE → Report Writer (max 2)"')
rep('const NAMEKEY={"Coordinator":"master","QA and Delivery":"qa"}', 'const NAMEKEY={"Coordinator":"master"}')
rep('${lk("t_gdoc",null,"qa")} <span class="mono">(Bash mkdir → Write ×2, always-ask)</span>',
    '${lk("t_writedoc",null,"drafter")} <span class="mono">(word_create_document, ask-first) · ${lk("t_draftemail",null,"delivery")} (outlook_create_draft, always-ask)</span>')
rep('"ca_models"', '"wsr_models"', 0); rep('"ca_edits"', '"wsr_edits"', 0)
# 5. Model dropdowns start at each component's spec model; no credit pricing
rep('const curModel=k=>SEL[k]&&MLAB[SEL[k]]?SEL[k]:"sonnet";',
    'const curModel=k=>SEL[k]&&MLAB[SEL[k]]?SEL[k]:((D[k]&&/\\((\\w+)\\)$/.exec(D[k].model||""))||[])[1]||"sonnet";')
rep('${full?` · ${c} credits/token`:""}', "")
# 6. Prerequisites at the top of the All specs tab
pre = "".join(f"<tr><td>{r[0]}</td><td>{r[1]}</td><td class=\\\"mono\\\">{r[2]}</td><td>{r[3]}</td></tr>" for r in S["prereqs"])
unv = "".join(f"<li>{u}</li>" for u in S.get("unverified", []))
rep('function renderTable(){tv.innerHTML=`<div class="card"><h3>Field map',
    'function renderTable(){tv.innerHTML=`<div class="card"><h3>Prerequisites</h3><table><tr><th>Kind</th><th>Name</th><th>ID</th><th>What it holds</th></tr>'
    + pre + '</table>' + (f'<h3 style="margin-top:14px">UNVERIFIED</h3><ul>{unv}</ul>' if unv else "") + '</div><div class="card"><h3>Field map')

# 7. Remaining reference labels: logo initials, package badge, gate note
initials = "".join(w[0] for w in WF.split()[:2]).upper()
rep(">CA<", f">{initials}<")
n_files = sum(1 for r in o["deliverables"] if "." in r[2] and r[2] != "n/a (chat)")
others = [r[0].lower() for r in o["deliverables"] if not ("." in r[2] and r[2] != "n/a (chat)") and r[3] != "master"]
badge = f"{n_files} file{'s' if n_files != 1 else ''}" + "".join(f" + {x.split()[-1]}" for x in others) + " + reply"
rep("2 files + reply", badge)
gate = next((S[k]["name"] for k in S["order"] if "Reviewer" in S[k]["name"]), "review")
rep("Saved only after QA PASS + your approval", f"Saved only after {gate} PASS + your approval")

for leftover in ["Content Army", "t_gdoc", "\"qa\"", "scout", "ca_edits"]:
    assert leftover not in t, f"leftover reference: {leftover}"
open(out, "w", encoding="utf-8").write(t)
print("canvas written:", out, len(t), "bytes;", len(S["order"]), "agents;", sum(1 for v in D.values() if v["type"] == "Tool"), "tools")
