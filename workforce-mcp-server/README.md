# workforce-mcp-server

A local MCP server for Claude Code that builds, runs, and tests AI agents, tools, multi-agent workforces, and knowledge tables. It has 203 tools, keeps everything in a local store, and runs every agent through `claude -p`. No external agent platform is involved.

## Install

1. Install Node.js 20+ and Claude Code, then log in once with `claude`.
2. Unzip this folder somewhere stable, for example `~/mcp/workforce-mcp-server`, and run `npm install` in it.
3. In the project where you design workforces, run:

   ```
   claude mcp add workforce --scope project -- node ~/mcp/workforce-mcp-server/src/server.js
   ```

4. Start Claude Code there and run `/mcp`. The `workforce` server lists 203 tools as `mcp__workforce__<tool>`.

## Files

- `src/server.js`: the server, store, step runner, agent runner, evals.
- `src/catalog.js`: the 203 tool definitions, step types, integrations, and templates.
- `docs/PRD.md`: the product requirements document (regenerate with `npm run docs`).
- `docs/PROMPTS.md`: the prompt library.
- `test/run-tests.js`: 27 end-to-end tests over MCP stdio (`npm test`).

## Store

Objects live in `WORKFORCE_HOME` (default `./.workforce`), one JSON file per collection. `publish_agent` also writes `.claude/agents/<name>.md`, so a published agent runs as a Claude Code subagent. Add `.workforce/` to `.gitignore` when it holds client data.

## Office COM family (Windows)

29 tools (`com_host_check`, `outlook_*`, `word_*`, `excel_*`, `fs_*`) drive classic Outlook, Word, Excel, and `Scripting.FileSystemObject` through `src/com/office-com.ps1`. Set `WORKFORCE_WINDOWS_ROOT` to the one folder they may touch. On any other OS they return `UNSUPPORTED_HOST`.

## Original-catalog compatibility

All 172 original tool names exist. `docs/SCHEMA-COMPARE.md` compares every original argument schema with this server's `tools/list`. Common original argument names (`studio_id`, `eval_batch_id`, `resource_id`, `config_id`, `document_id`, `chain_id(s)`, `page_size`) are accepted as aliases. 32 tools still need a contract change before an original-shaped call passes validation; they are listed there.
