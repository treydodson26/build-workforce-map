# build-workforce-map

Two folders:

- `build-workforce-map/`: the Claude Code skill. Copy this folder to `~/.claude/skills/` (Windows: `%USERPROFILE%\.claude\skills\`).
- `workforce-mcp-server/`: the local MCP server the skill builds through. Run `npm install` and `npm test` inside it, then register it with `claude mcp add workforce --scope user -e WORKFORCE_HOME=<store folder> -e WORKFORCE_WINDOWS_ROOT=<workspace folder> -- node <path>/workforce-mcp-server/src/server.js`.

Built 11/17/2026. Skill package SHA-256: `611e123568458f865a544025f48f06f5e2a269e34f7c2a76ec8f59334e14be6b`.
