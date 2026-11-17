# References: platform documentation in this skill

This folder holds every platform document the skill needs, as local Markdown files. Read from here first. The next agent may have no web access, so nothing in this skill fetches docs at run time. All building happens in Claude Code through the local `workforce` MCP server.

## What is here

| Folder | What it holds | Source | Snapshot date |
|---|---|---|---|
| `platform-skills/` | The official platform skill guides for agents, tools, workforces, knowledge, evals, models, and more. 53 guide files plus `PLUGIN-CLAUDE.md`. | The vendor's open-source Claude Code plugin, commit `bccac15` (11/10/2026). MIT license. | 11/16/2026 |
| `platform-docs/` | The platform product docs for Get started, Build, Integrations, and system limits: 198 pages, merged into 39 files, one per docs folder. `INDEX.md` lists each page, its file, and its description. | The vendor's public docs site | 11/16/2026 |
| `knowledge-store/` | `claude-artifact-db.md`: the default way to store and search knowledge, on a Claude artifact database (collections, upsert, BM25 search, Claude rerank, evals, spec format). Helper script: `../scripts/kb-store.js`. | Written for this skill; facts checked against the Claude artifacts connector | 11/17/2026 |
| `live-catalog/` | The step schemas `validate.js` knows (`step-schemas.md`). The workforce server runs the same step types. | Vendor catalog snapshot, project Needl | 11/16/2026 |

## Guide overviews

Each guide folder in `platform-skills/` holds its overview, saved as `OVERVIEW.md`, and one file per topic.

Each overview is saved as `OVERVIEW.md`, not `SKILL.md`, because a skill package may hold only one `SKILL.md`. The guides link to `OVERVIEW.md` and to each other with relative paths, so their cross-links work inside this folder. Only the `SKILL.md` at the root of this skill is the skill.

## Which file to read for each stage

| Stage or task | Read first | Then, as needed |
|---|---|---|
| Step 0: learn the three building blocks | `platform-docs/get-started__core-concepts.md` (pages Agents, Tools, Workforces, Knowledge) | `platform-skills/PLUGIN-CLAUDE.md` |
| Stage 1: pick triggers | `platform-skills/managing-agents/triggers.md`, `platform-skills/managing-workforces/workforce-triggers.md` | `platform-skills/managing-agents/many-items.md` for per-item work |
| Stage 1: pick integrations and steps | `live-catalog/step-schemas.md`, `platform-skills/managing-tools/transformations-catalog.md` | `platform-docs/integrations__popular-integrations.md` |
| Stage 2: tool specs | `platform-skills/managing-tools/creating.md`, `transformations.md` | `patterns.md`, `outputs.md`, `oauth.md`, `documentation.md` |
| Stage 2: agent specs | `platform-skills/managing-agents/creating.md`, `system-prompts.md`, `actions.md` | `variables.md`, `phantom-tools.md`, `notification-rules.md` |
| Stage 2: workforce spec | `platform-skills/managing-workforces/OVERVIEW.md`, `concepts.md` | `workforce-nodes.md`, `platform-docs/build__workforces__build-an-ai-workforce.md` |
| Stage 2: eval plan | `platform-skills/evals/OVERVIEW.md`, `checks.md`, `simulation.md`, `workforces.md` | `design.md`, `pre-publish.md`, `platform-docs/build__agents__evals.md` |
| Stage 3: build and run | `platform-skills/managing-tools/running.md`, `platform-skills/managing-agents/running.md` | `platform-skills/managing-workforces/debugging.md` |
| Stage 3: something fails | `platform-skills/managing-agents/troubleshooting.md` | `platform-skills/diagnostics/OVERVIEW.md`, `platform-skills/managing-tools/versions.md` |

## Which file supports each rubric criterion

| Criteria | File |
|---|---|
| G1, G2, T2 (steps exist, exact params, native first) | `live-catalog/step-schemas.md`, `platform-skills/managing-tools/transformations.md`, `transformations-catalog.md` |
| G3 (`{{params.x}}` and `{{steps.x.output.y}}` references) | `platform-skills/managing-tools/creating.md`, `transformations.md` |
| G5, A4, A7 (approval behaviour, action pills, autonomy limit) | `platform-skills/managing-agents/actions.md`, `system-prompts.md`, `creating.md` |
| G6 (no credentials; OAuth inputs) | `platform-skills/managing-tools/oauth.md`, `integration-setup.md`, `api-keys.md` |
| G7, W1 to W7 (handoffs through the workforce) | `platform-skills/managing-workforces/OVERVIEW.md`, `concepts.md`, `workforce-nodes.md`; `platform-docs/build__workforces__workforce-features.md` |
| G8 (tools resolve: project and region) | `platform-skills/managing-agents/troubleshooting.md`, `actions.md` |
| G9, A10, FA-01, FA-02 (knowledge) | `knowledge-store/claude-artifact-db.md` (default); platform tables only when named: `platform-skills/managing-knowledge/OVERVIEW.md`, `tables.md`, `platform-docs/build__knowledge.md` |
| W6 (one task per item) | `platform-skills/managing-agents/many-items.md`, `triggers.md` (Tool Trigger) |
| A2, A3, A9 (prompt structure, no invention, readable output) | `platform-skills/managing-agents/system-prompts.md` |
| A5 (judgement in agents, not tools) | `platform-skills/managing-tools/OVERVIEW.md` (Tools vs Agents) |
| A6 (agent variables) | `platform-skills/managing-agents/variables.md` |
| T4, T5, T6 (fetch filtering, output keys, honest writes) | `platform-skills/managing-tools/outputs.md`, `patterns.md` |
| T8 (tool notes) | `platform-skills/managing-tools/documentation.md` |
| T9 (recorded test run) | `platform-skills/managing-tools/running.md` |
| E1 to E6, FA-03, CA-01 to CA-05, TC, EC (evals) | `platform-skills/evals/` (all files); `platform-docs/build__agents__evals.md` |
| E6 and regression rules (publish gate, monitoring) | `platform-skills/evals/pre-publish.md`, `monitoring.md` |

## Keep the snapshots current

These files are copies, so they age. The workforce server's answers win over any file here:

- Confirm each step with `get_transformation` and each model with `list_llm_models` before Stage 3.
- When a guide and the server disagree, follow the server and note the difference in the spec's open questions.

## Native artifacts and Office COM

- `native-artifacts.md`: Claude Docs, Slides, and Design create, read, and update, with proven evidence and the unavailable result.
- `platform-docs/build__tools__tool-steps__microsoft-office-com.md`: Outlook, Word, Excel, and FileSystemObject operations that replace the former cloud office-suite steps.
