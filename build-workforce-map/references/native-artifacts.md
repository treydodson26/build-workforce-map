# Native Claude artifacts: Docs, Slides, and Design

The skill publishes specs, plans, logs, decks, and visual designs as native Claude artifacts. These tools are claude.ai connector tools, not tools of the local `workforce` MCP server. Keep them separate from the Office COM family in `platform-docs/build__tools__tool-steps__microsoft-office-com.md`.

Every schema below was read from the live tool definitions on 11/17/2026. Every path was proven on that date by creating a disposable artifact and reading it back (see Evidence).

## Probe first

Claude Code has these tools only when the same connectors are configured in that session. Before any create, run `ToolSearch` with `select:<tool name>` for each tool the step needs. When a tool is missing, return this result and do not attempt the step:

```json
{"status": "unavailable", "missing": "mcp__Claude_Docs__batch", "operation": "docs.create"}
```

## Catalog

| Operation | Callable tool | Required inputs | Returns |
|---|---|---|---|
| `docs.create` | `mcp__Claude_Docs__batch` | `container` = `{"kind":"project","create":{"name":"<title>","doc":{"markdown":"<md>","blocks":{...}}}}`, `batch` = `[]` | `frame.slug` (UUID), `frame.url` (`https://claude.ai/artifact/<id>`), `lids.f` (tab id), `lids.n` (body node id), `acks[].rev` |
| `docs.read` | `mcp__Claude_Docs__read` | `ref` = `{"object":"project","id":"<slug>"}` to list tabs; then `ref` = `{"object":"node","id":"<body id>"}`, `container` = `{"kind":"project","id":"<slug>"}`, `engine` = `"prose"`, `payload` = `{"projection":"outline"}` | `data.rev`, `data.xml` (outline of blocks), `data.complete` |
| `docs.update` | `mcp__Claude_Docs__update` | `ref` = `{"object":"node","id":"<body id>"}`, `container` = `{"kind":"project","id":"<slug>"}`, `engine` = `"prose"`, `payload` = `{"ops":[{"op":"replace","target":{"kind":"blocks","ids":["<block id>"]},"with":{"from":{"kind":"inline","content":"<md>"},"as":"markdown"}}]}` | new `rev` and an outline of the written blocks |
| `slides.create` | `mcp__claude-artifacts__create_from_type` | `slug` = `3e9dc3d6-8a10-4143-ac0b-5af4f2b03a61` (Slides type), `title` | `slug`, `url`, `version`, the type's instructions; `content.index` = `project/deck.json`, `content.kept_in` = `files` |
| `slides.update` | `mcp__claude-artifacts__publish_files` | `slug`, `base_version`, `mode` = `"patch"`, `files` = `[{"as":"project/deck.json","path":"<abs>"},{"as":"project/deck.css","path":"<abs>"},{"as":"project/slides/<id>.html","path":"<abs>"}]` | new `version`, `own_file_count` |
| `slides.read` | `mcp__claude-artifacts__list_files`, `mcp__claude-artifacts__read_file` | `slug`; then `slug`, `path` | file list with `sha256`; file text |
| `design.create` | `mcp__claude-artifacts__create_from_type` | `slug` = `bcd2878f-a88d-4094-a616-8e39d8a5fd8a` (Design type), `title` | as `slides.create`; `content.index` = `project/canvas.json` |
| `design.update` | `mcp__claude-artifacts__publish_files` | `slug`, `base_version`, `mode` = `"patch"`, `files` = `project/canvas.json` and `project/<name>.dc.html` | new `version` |
| `design.read` | `mcp__claude-artifacts__list_files`, `mcp__claude-artifacts__read_file` | `slug`; then `slug`, `path` | file list with `sha256`; file text |

Errors seen or documented: a stale `base_version` is refused with a conflict that names the live version; a missing `engine: "prose"` on `docs.read` returns `{"verdict":"deny","reason":"intent-shape"}`; a type the server cannot fill is reported in `list_types` under "Cannot be filled here".

Type slugs change only when the account's type catalog changes. Confirm them with `mcp__claude-artifacts__list_types` at install time and store them in the install report.

## Knowledge store on the artifact database

The knowledge path for shared knowledge uses an artifact whose page declares `db`:

1. Publish the store page with `mcp__claude-artifacts__publish_files`, then `mcp__claude-artifacts__declare_capabilities` with `{"db":{"rules":[{"path":"","read":"view","write":"owner"}]},"user":{}}`.
2. Upsert with `mcp__claude-artifacts__db_write`, op `set`, path `<collection>/<_id>`. A first write needs no `ifVersion`. A re-upsert of the same `_id` needs `ifVersion` = the version last read; without it the write is refused with `409 version_mismatch` and nothing changes.
3. Mark superseded rows `status: "stale"`; never delete history unless asked.
4. Retrieve with `mcp__claude-artifacts__db_query`, `where` = `[{"field":"status","op":"==","value":"active"}, ...]`. Cite each fact by its document `id`.
5. No match returns `{"docs":[]}`. Report "no source found" and invent nothing.

## Evidence (11/17/2026, this skill's QA run)

| Path | Artifact | Proof |
|---|---|---|
| Docs create + read | `https://claude.ai/artifact/9WPirbGMvujPZzD1jKD98e` (slug `44e3ae6a-c9a4-4987-a842-a61d084cbb1b`) | `batch` returned `rev 1`; `read` with `engine: "prose"` returned the heading and paragraph blocks, `complete: true` |
| Slides create + fill + read | `https://claude.ai/artifact/JxzdgiY4uyim9TWc1zrbwU` (slug `917cc827-cd89-4cea-81ca-375e0d29c297`) | `publish_files` returned version `1794942658-d59f`, `own_file_count 3`; `read_file project/slides/cover.html` returned the written section |
| Design create + fill + read | `https://claude.ai/artifact/MoVA6ExrcnRYZkmtni9ah2` (slug `a87456bc-ff27-4b09-8681-23f0926ef465`) | `list_files` sha256 of `project/Main.dc.html` (`3aff08d5…`) and `project/canvas.json` (`e2863b17…`) equal the local files |
| Knowledge store | `https://claude.ai/artifact/7V1HmvtBgh1mWoFHCS727K` (slug `347fd5f4-283b-49c2-a754-42ad9b7da6f2`) | upsert v1; re-upsert `fact-1` to v2; write without `ifVersion` refused 409; active query returned only `fact-1` (stale `fact-2` excluded); `tags array-contains "zebra"` returned `[]` |

Not verified: the same tools inside a Claude Code terminal session on the Windows work laptop. Run the probe above there and record the result.
