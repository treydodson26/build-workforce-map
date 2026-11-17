# Real-request test: weekly status report (11/17/2026)

Request (`request.txt`): read the task tracker workbook every Friday at 3 PM, summarize progress and risks by workstream, save a Word status report, and draft an unsent Outlook email to the manager.

| Stage | Command | Result |
|---|---|---|
| 2 Spec | `python3 make_spec.py && node validate.js spec.json` | 5 agents, 5 tools, 0 FAIL, 3 WARN (the 3 Office COM steps are MCP tools, not transformations) |
| 3 Build | `node build.mjs <server.js> <project dir>` | Knowledge table, 2 local tools, 5 agents, workforce, schedule trigger, eval set, 5 `.claude/agents/*.md` files. Tool tests pass. Live run blocked on the build host (`claude -p` authentication error; no Office COM on Linux) |
| 4 Canvas | `python3 build_canvas.py <reference.html> spec.json ids.json canvas.html` | Published at https://claude.ai/artifact/FGdqckLZ51eBqXwkCxFv1Q with the artifact database declared; edits, model dropdowns, side panel, edit mode, and All specs tab checked in Chrome at 1440 px |

On the Windows laptop, rerun Stage 3 with the real `claude` CLI and Office to finish the live checks.
