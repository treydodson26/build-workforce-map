# MCP Server Product Requirements Document (PRD): workforce-mcp-server

Version 1.0.0, 11/17/2026. The tool tables in Section 2 are generated from `src/catalog.js` by `npm run docs`.

## 1. Server overview

**Server name:** workforce-mcp-server. Claude Code registers it as `workforce`, so its tools appear as `mcp__workforce__<tool>`.

**Primary purpose:** Build, run, test, and monitor AI agents, tools, multi-agent workforces, and knowledge tables entirely inside Claude Code, with no external agent platform. The server keeps every object in a local store and runs every agent through the `claude -p` command.

**Target users:** Trey and other consultants who design AI workforces with the build-workforce-map skill. They work in Claude Code on a laptop, including a Windows work laptop with desktop Office and classic Outlook and no cloud office suite. They read JSON but do not write server code.

**Use case examples:**

- Example 1: The build-workforce-map skill finishes Stage 2 for a support desk. In Stage 3, Claude calls `create_knowledge_set`, `import_knowledge_file`, `create_tool`, `create_agent`, `attach_tools_to_agent`, and `create_workforce`, then `trigger_workforce` with a test message.
- Example 2: Before a demo, Claude builds a test set with `create_eval_test_set` and `create_eval_test_case`, adds an `llm_judge` check, sets a publish gate with `upsert_pre_publish_config`, and calls `publish_agent`. Publishing writes `.claude/agents/<name>.md`, so the agent also runs as a Claude Code subagent.
- Example 3: Trey asks for a weekly report agent. Claude calls `create_trigger` with `type: schedule`. The server returns the exact `claude -p` fire command to put in cron or a Claude Code scheduled task.

## 2. Tool specifications

The server exposes 203 tools in 17 families. Every tool name matches the earlier platform connector's tool name with the vendor prefix removed.

**Shared rules for every tool**

- Input format: one JSON object. Types are checked; a wrong type returns `INVALID_INPUT`.
- Output format: one text block that holds pretty-printed JSON.
- Error format: `isError: true` and `{ "error": "<CODE>", "message": "...", "hint": "..." }`.

**Error conditions shared by all tools**

| Code | When it happens | What the caller does |
|---|---|---|
| `INVALID_INPUT` | A required input is missing, or an input has the wrong type or value. | Fix the input named in the message. |
| `NOT_FOUND` | An ID does not exist in the store. | Call the matching `list_*` tool, as the hint says. |
| `CONFLICT` | A knowledge table with that name already exists. | Pick another name, or use the existing table. |
| `UNSUPPORTED` | A step type is not in the catalog, or a feature needs a provider that is not set. | Call `list_transformations`, or set the env var named in the hint. |
| `NOT_CONFIGURED` | An integration token is missing (for example `SLACK_BOT_TOKEN`). | Add the env var to the server's `.mcp.json` entry. |
| `CLAUDE_UNAVAILABLE` | The `claude` binary is missing. | Install Claude Code, or set `WORKFORCE_CLAUDE_BIN`. |
| `CLAUDE_FAILED` | `claude -p` returned an error: login, usage limit (429), or model error. | Run `claude -p hello` in a terminal; wait out a usage limit. |
| `TIMEOUT` | One `claude -p` call ran longer than `WORKFORCE_TIMEOUT_MS`. | Raise the timeout, or shorten the prompt. |
| `NETWORK_ERROR` | An HTTP step failed 3 times. | Check the URL and the network. |
| `PUBLISH_BLOCKED` | The pre-publish gate's latest batch is below its pass rate. | Run `poll_pre_publish_check`, fix failures, publish again. |

**Rate limits:** The server calls no rate-limited API of its own. Usage limits come from the Claude account behind `claude -p`; the server reports them as `CLAUDE_FAILED` and does not retry them. HTTP steps retry 5xx errors and network errors 3 times with backoff of 1 s, 2 s, and 4 s.

### 2.1 Agents (33 tools)

| # | Tool name | Purpose | Required inputs | Optional inputs | Expected output |
|---|---|---|---|---|---|
| 1 | `create_agent` | Create an agent with a name, system prompt, model, and tools. | `name` (string) | `system_prompt` (string), `model` (string), `description` (string), `tool_ids` (array), `knowledge_ids` (array), `folder_id` (string), `settings` (object) | The created object with its `id`. |
| 2 | `get_agent` | Get one agent by ID. | `agent_id` (string) | None | The object. |
| 3 | `update_agent` | Update agent fields. Only the fields you pass change. | `agent_id` (string) | `name` (string), `system_prompt` (string), `model` (string), `description` (string), `settings` (object), `knowledge_ids` (array) | The updated object. |
| 4 | `list_agents` | List agents, newest first. | None | `folder_id` (string), `query` (string), `limit` (number), `cursor` (string) | `{ "<items>": [ ... ] }`, newest first. |
| 5 | `publish_agent` | Save a numbered version of the agent and write it to .claude/agents/<slug>.md so Claude Code can run it as a subagent. | `agent_id` (string) | `note` (string) | JSON object; see the server source for fields. |
| 6 | `read_agent_system_prompt` | Read the agent's system prompt with line numbers. | `agent_id` (string) | None | JSON object; see the server source for fields. |
| 7 | `edit_agent_system_prompt` | Replace one exact string in the agent's system prompt. | `agent_id` (string), `old_string` (string), `new_string` (string) | None | JSON object; see the server source for fields. |
| 8 | `search_agent_system_prompt` | Find lines in the agent's system prompt that match a regular expression. | `agent_id` (string), `pattern` (string) | None | JSON object; see the server source for fields. |
| 9 | `get_agent_tools` | List the tools and MCP servers attached to an agent. | `agent_id` (string) | None | The object. |
| 10 | `attach_tools_to_agent` | Attach tools to an agent. | `agent_id` (string), `tool_ids` (array) | None | JSON object; see the server source for fields. |
| 11 | `detach_tools_from_agent` | Detach tools from an agent. | `agent_id` (string), `tool_ids` (array) | None | JSON object; see the server source for fields. |
| 12 | `attach_mcp_server_to_agent` | Attach an MCP server (by name from the project) to an agent. | `agent_id` (string), `server_name` (string) | `tools` (array) | JSON object; see the server source for fields. |
| 13 | `detach_mcp_server_from_agent` | Detach an MCP server from an agent. | `agent_id` (string), `server_name` (string) | None | JSON object; see the server source for fields. |
| 14 | `update_agent_mcp_server_approvals` | Set which MCP tools need approval before the agent runs them. | `agent_id` (string), `server_name` (string), `approvals` (object) | None | The updated object. |
| 15 | `update_agent_action` | Set one attached tool's action settings (approval mode, max calls, prompt description). | `agent_id` (string), `tool_id` (string) | `approval_mode` (string), `max_calls` (number), `description` (string) | The updated object. |
| 16 | `list_agent_versions` | List published versions of an agent. | `agent_id` (string) | None | `{ "<items>": [ ... ] }`, newest first. |
| 17 | `get_agent_version` | Get one published version of an agent. | `agent_id` (string), `version` (number) | None | The object. |
| 18 | `restore_agent_version` | Restore a published version as the current draft. | `agent_id` (string), `version` (number) | None | JSON object; see the server source for fields. |
| 19 | `trigger_agent` | Send a message to an agent and wait for the reply. Runs `claude -p` with the agent's system prompt. | `agent_id` (string), `message` (string) | `conversation_id` (string), `timeout_seconds` (number) | A task ID and status. |
| 20 | `trigger_agent_async` | Send a message to an agent and return a task ID at once. Poll with poll_agent_result. | `agent_id` (string), `message` (string) | `conversation_id` (string) | A task ID and status. |
| 21 | `poll_agent_result` | Get the status and reply of an agent task. | `task_id` (string) | None | Status, reply or output, and error. |
| 22 | `list_agent_tasks` | List an agent's tasks. | `agent_id` (string) | `status` (string), `limit` (number) | `{ "<items>": [ ... ] }`, newest first. |
| 23 | `list_agent_task_messages` | List the messages in one agent task. | `task_id` (string) | None | `{ "<items>": [ ... ] }`, newest first. |
| 24 | `get_agent_task_metadata` | Get task metadata: status, timing, model, cost estimate. | `task_id` (string) | None | The object. |
| 25 | `get_agent_task_summary` | Summarize one agent task: message count, status, last reply. | `task_id` (string) | None | The object. |
| 26 | `submit_agent_task_decisions` | Approve or reject tool calls an agent task is waiting on, then resume it. | `task_id` (string), `decisions` (array) | None | JSON object; see the server source for fields. |
| 27 | `list_agent_triggers` | List the triggers attached to an agent. | `agent_id` (string) | None | `{ "<items>": [ ... ] }`, newest first. |
| 28 | `cancel_agent_task` | Cancel a queued or running agent task. Kills the running claude process and marks the task cancelled. A finished task is reported unchanged. | `agent_id` (string), `task_id` (string) | None | JSON object; see the server source for fields. |
| 29 | `delete_agent` | Permanently delete an agent and its triggers. Irreversible. | `agent_id` (string) | None | `{ "deleted": "<id>" }` |
| 30 | `get_task_view` | Deprecated alias of get_agent_task_summary. | `agent_id` (string), `task_id` (string) | None | The object. |
| 31 | `list_conversations` | Deprecated alias of list_agent_tasks. | `agent_id` (string) | `page_size` (number) | `{ "<items>": [ ... ] }`, newest first. |
| 32 | `update_agent_metadata_fields` | Add, replace, rename, or remove the metadata fields that label each agent run. Fill mode agent (the agent records a value) or rule (set when a named tool finishes or trigger fires). | `agent_id` (string) | `upsert` (array), `remove` (array), `rename` (array), `settings` (object) | The updated object. |
| 33 | `update_agent_version` | Relabel a published agent version by version_id. Changes no config. | `agent_id` (string), `version_id` (string) | `version_name` (string), `version_description` (string) | The updated object. |

### 2.2 Tools (31 tools)

| # | Tool name | Purpose | Required inputs | Optional inputs | Expected output |
|---|---|---|---|---|---|
| 34 | `create_tool` | Create a tool: inputs, ordered steps, and an output mapping. | `name` (string) | `description` (string), `inputs` (array), `steps` (array), `output` (object), `folder_id` (string) | The created object with its `id`. |
| 35 | `get_tool` | Get one tool by ID. | `tool_id` (string) | None | The object. |
| 36 | `update_tool` | Update tool fields. Only the fields you pass change. | `tool_id` (string) | `name` (string), `description` (string), `inputs` (array), `output` (object) | The updated object. |
| 37 | `list_tools` | List tools. | None | `folder_id` (string), `query` (string), `limit` (number) | `{ "<items>": [ ... ] }`, newest first. |
| 38 | `publish_tool` | Save a numbered version of the tool. | `tool_id` (string) | `note` (string) | JSON object; see the server source for fields. |
| 39 | `bulk_delete_tools` | Delete several tools. | `tool_ids` (array) | None | JSON object; see the server source for fields. |
| 40 | `add_tool_step` | Add a step to a tool. Position defaults to the end. | `tool_id` (string), `step` (object) | `position` (number) | JSON object; see the server source for fields. |
| 41 | `remove_tool_step` | Remove a step by name. | `tool_id` (string), `step_name` (string) | None | JSON object; see the server source for fields. |
| 42 | `move_tool_step` | Move a step to a new position. | `tool_id` (string), `step_name` (string), `position` (number) | None | JSON object; see the server source for fields. |
| 43 | `update_tool_step` | Merge new params into one step. | `tool_id` (string), `step_name` (string), `params` (object) | None | The updated object. |
| 44 | `update_tool_steps` | Replace the tool's whole step list. | `tool_id` (string), `steps` (array) | None | The updated object. |
| 45 | `set_tool_output` | Set the tool's output mapping, for example {"answer": "{{llm.output}}"}. | `tool_id` (string), `output` (object) | None | JSON object; see the server source for fields. |
| 46 | `list_tool_versions` | List published versions of a tool. | `tool_id` (string) | None | `{ "<items>": [ ... ] }`, newest first. |
| 47 | `get_tool_version` | Get one published version of a tool. | `tool_id` (string), `version` (number) | None | The object. |
| 48 | `restore_tool_version` | Restore a published version as the current draft. | `tool_id` (string), `version` (number) | None | JSON object; see the server source for fields. |
| 49 | `update_tool_version` | Change the note on a published version. | `tool_id` (string), `version` (number), `note` (string) | None | The updated object. |
| 50 | `run_tool` | Run a tool now with inputs and wait for the result. | `tool_id` (string) | `params` (object) | Status and output. |
| 51 | `trigger_tool` | Start a tool run and return a run ID at once. | `tool_id` (string) | `params` (object) | A task ID and status. |
| 52 | `poll_tool_result` | Get the status and output of a tool run. | `run_id` (string) | None | Status, reply or output, and error. |
| 53 | `get_tool_run` | Get one tool run with every step's output. | `run_id` (string) | None | The object. |
| 54 | `get_latest_tool_run` | Get the newest run of a tool. | `tool_id` (string) | None | The object. |
| 55 | `list_tool_runs` | List runs of a tool. | `tool_id` (string) | `limit` (number) | `{ "<items>": [ ... ] }`, newest first. |
| 56 | `create_tool_from_transformation` | Create a one-step tool from a transformation in the catalog. | `transformation_id` (string) | `name` (string), `params` (object) | The created object with its `id`. |
| 57 | `clone_public_tool` | Copy a template tool from the bundled template library. | `template_id` (string) | `name` (string) | JSON object; see the server source for fields. |
| 58 | `search_public_tools` | Search the bundled template library. | None | `query` (string) | JSON object; see the server source for fields. |
| 59 | `check_tool_integration_requirements` | List the env vars a tool's steps need and whether each is set. | `tool_id` (string) | None | JSON object; see the server source for fields. |
| 60 | `cancel_tool_run` | Cancel a running tool run. The run stops before its next step (best effort). | `task_id` (string) | None | JSON object; see the server source for fields. |
| 61 | `delete_tool` | Permanently delete a tool. Irreversible. | `tool_id` (string) | None | `{ "deleted": "<id>" }` |
| 62 | `search_marketplace_listings` | Search the bundled template library as marketplace listings. | None | `query` (string), `entity_type` (string), `categories` (array), `page` (number), `page_size` (number), `price_type` (string) | JSON object; see the server source for fields. |
| 63 | `get_marketplace_listing` | Get one bundled template listing by listing_id. | `listing_id` (string) | None | The object. |
| 64 | `clone_marketplace_listing` | Clone a bundled template listing into the local store. | `listing_id` (string) | None | JSON object; see the server source for fields. |

### 2.3 Step types (transformations) (4 tools)

| # | Tool name | Purpose | Required inputs | Optional inputs | Expected output |
|---|---|---|---|---|---|
| 65 | `list_transformations` | List the step types this server can run. | None | `query` (string) | `{ "<items>": [ ... ] }`, newest first. |
| 66 | `get_transformation` | Get one step type's param schema and output. | `transformation_id` (string) | None | The object. |
| 67 | `get_transformation_requirements` | List env vars and binaries a step type needs, and whether each is present. | `transformation_id` (string) | None | The object. |
| 68 | `run_transformation` | Run one step type directly with params. | `transformation_id` (string), `params` (object) | None | Status and output. |

### 2.4 Workforces (16 tools)

| # | Tool name | Purpose | Required inputs | Optional inputs | Expected output |
|---|---|---|---|---|---|
| 69 | `create_workforce` | Create a workforce: agent nodes and the edges between them. | `name` (string) | `description` (string), `nodes` (array), `edges` (array), `folder_id` (string) | The created object with its `id`. |
| 70 | `get_workforce` | Get one workforce by ID. | `workforce_id` (string) | None | The object. |
| 71 | `update_workforce` | Update workforce fields, nodes, or edges. | `workforce_id` (string) | `name` (string), `description` (string), `nodes` (array), `edges` (array) | The updated object. |
| 72 | `delete_workforce` | Delete a workforce. | `workforce_id` (string) | None | `{ "deleted": "<id>" }` |
| 73 | `list_workforces` | List workforces. | None | `folder_id` (string), `query` (string) | `{ "<items>": [ ... ] }`, newest first. |
| 74 | `publish_workforce` | Save a numbered version of the workforce. | `workforce_id` (string) | `note` (string) | JSON object; see the server source for fields. |
| 75 | `list_workforce_versions` | List published versions of a workforce. | `workforce_id` (string) | None | `{ "<items>": [ ... ] }`, newest first. |
| 76 | `trigger_workforce` | Run a workforce: start at the entry node and pass each reply along the edges. Returns a task ID. | `workforce_id` (string), `message` (string) | `wait` (boolean) | A task ID and status. |
| 77 | `poll_workforce_task_result` | Get the status and final reply of a workforce task. | `task_id` (string) | None | Status, reply or output, and error. |
| 78 | `list_workforce_tasks` | List a workforce's tasks. | `workforce_id` (string) | `limit` (number) | `{ "<items>": [ ... ] }`, newest first. |
| 79 | `get_workforce_task_messages` | List every node's messages in a workforce task. | `task_id` (string) | None | The object. |
| 80 | `get_workforce_task_metadata` | Get workforce task metadata: status, timing, node path. | `task_id` (string) | None | The object. |
| 81 | `update_workforce_trigger_status` | Turn a trigger on a workforce on or off. | `workforce_id` (string), `trigger_id` (string), `enabled` (boolean) | None | The updated object. |
| 82 | `cancel_workforce_task` | Cancel a running workforce task. Stops routing and kills the node in flight. | `workforce_id` (string), `task_id` (string) | None | JSON object; see the server source for fields. |
| 83 | `update_workforce_version` | Relabel a published workforce version by version_id. Changes no config. | `workforce_id` (string), `version_id` (string) | `version_name` (string), `version_description` (string) | The updated object. |
| 84 | `restore_workforce_version` | Copy a published workforce version into the draft. | `version_id` (string) | None | JSON object; see the server source for fields. |

### 2.5 Knowledge tables (13 tools)

| # | Tool name | Purpose | Required inputs | Optional inputs | Expected output |
|---|---|---|---|---|---|
| 85 | `create_knowledge_set` | Create a knowledge table. | `name` (string) | `description` (string), `columns` (array) | The created object with its `id`. |
| 86 | `get_knowledge_set` | Get a knowledge table's metadata and row count. | `knowledge_set` (string) | None | The object. |
| 87 | `update_knowledge_set` | Update a knowledge table's description or columns. | `knowledge_set` (string) | `description` (string), `columns` (array) | The updated object. |
| 88 | `delete_knowledge_set` | Delete a knowledge table and its rows. | `knowledge_set` (string) | None | `{ "deleted": "<id>" }` |
| 89 | `list_knowledge_sets` | List knowledge tables. | None | `query` (string) | `{ "<items>": [ ... ] }`, newest first. |
| 90 | `add_knowledge_rows` | Add rows. Each row is an object; an _id is created when missing. | `knowledge_set` (string), `rows` (array) | None | JSON object; see the server source for fields. |
| 91 | `list_knowledge_rows` | List rows, with optional exact-match filters. | `knowledge_set` (string) | `filters` (object), `limit` (number), `offset` (number) | `{ "<items>": [ ... ] }`, newest first. |
| 92 | `get_knowledge_row` | Get one row by _id. | `knowledge_set` (string), `row_id` (string) | None | The object. |
| 93 | `update_knowledge_rows` | Merge fields into rows by _id. | `knowledge_set` (string), `rows` (array) | None | The updated object. |
| 94 | `delete_knowledge_rows` | Delete rows by _id. | `knowledge_set` (string), `row_ids` (array) | None | `{ "deleted": "<id>" }` |
| 95 | `delete_knowledge_columns` | Remove columns from every row. | `knowledge_set` (string), `columns` (array) | None | `{ "deleted": "<id>" }` |
| 96 | `import_knowledge_file` | Import a local CSV, JSON, JSONL, Markdown, or text file. Text files are chunked (400 words, 50 overlap). | `knowledge_set` (string), `file_path` (string) | None | JSON object; see the server source for fields. |
| 97 | `export_knowledge` | Export a knowledge table to a local JSONL or CSV file. | `knowledge_set` (string), `file_path` (string) | `format` (string) | JSON object; see the server source for fields. |

### 2.6 Triggers (5 tools)

| # | Tool name | Purpose | Required inputs | Optional inputs | Expected output |
|---|---|---|---|---|---|
| 98 | `create_trigger` | Create a trigger on an agent or workforce: schedule (cron), webhook, or manual. | `target_id` (string), `target_type` (string), `type` (string) | `config` (object), `message` (string) | The created object with its `id`. |
| 99 | `get_trigger` | Get one trigger. | `trigger_id` (string) | None | The object. |
| 100 | `delete_trigger` | Delete a trigger. | `trigger_id` (string) | None | `{ "deleted": "<id>" }` |
| 101 | `update_trigger_status` | Turn a trigger on or off. | `trigger_id` (string), `enabled` (boolean) | None | The updated object. |
| 102 | `list_trigger_statuses` | List every trigger with its status and last fire time. | None | `target_id` (string) | `{ "<items>": [ ... ] }`, newest first. |

### 2.7 Evals (24 tools)

| # | Tool name | Purpose | Required inputs | Optional inputs | Expected output |
|---|---|---|---|---|---|
| 103 | `create_eval_test_set` | Create a test set for an agent or workforce. | `name` (string), `target_id` (string) | `description` (string) | The created object with its `id`. |
| 104 | `get_eval_test_set` | Get one test set with its test cases. | `test_set_id` (string) | None | The object. |
| 105 | `update_eval_test_set` | Update a test set. | `test_set_id` (string) | `name` (string), `description` (string) | The updated object. |
| 106 | `delete_eval_test_set` | Delete a test set and its test cases. | `test_set_id` (string) | None | `{ "deleted": "<id>" }` |
| 107 | `list_eval_test_sets` | List test sets. | None | `target_id` (string) | `{ "<items>": [ ... ] }`, newest first. |
| 108 | `create_eval_test_case` | Create a test case: an input message, or a simulated user scenario. | `test_set_id` (string), `name` (string) | `input` (string), `scenario` (string), `expected` (string) | The created object with its `id`. |
| 109 | `get_eval_test_case` | Get one test case. | `test_case_id` (string) | None | The object. |
| 110 | `update_eval_test_case` | Update a test case. | `test_case_id` (string) | `name` (string), `input` (string), `scenario` (string), `expected` (string) | The updated object. |
| 111 | `delete_eval_test_case` | Delete a test case. | `test_case_id` (string) | None | `{ "deleted": "<id>" }` |
| 112 | `list_eval_test_cases` | List test cases in a test set. | `test_set_id` (string) | None | `{ "<items>": [ ... ] }`, newest first. |
| 113 | `add_eval_test_case_rule` | Add a rule to a test case: contains, not_contains, regex, or llm_judge. | `test_case_id` (string), `rule` (object) | None | JSON object; see the server source for fields. |
| 114 | `remove_eval_test_case_rule` | Remove a rule from a test case by index. | `test_case_id` (string), `index` (number) | None | JSON object; see the server source for fields. |
| 115 | `set_eval_test_case_simulation_config` | Set the simulated user: persona, goal, and max turns. | `test_case_id` (string), `config` (object) | None | JSON object; see the server source for fields. |
| 116 | `create_eval_check` | Create a reusable check: contains, not_contains, regex, or llm_judge with a rubric. | `name` (string), `type` (string) | `value` (string), `rubric` (string), `target_id` (string) | The created object with its `id`. |
| 117 | `update_eval_check` | Update a check. | `check_id` (string) | `name` (string), `type` (string), `value` (string), `rubric` (string) | The updated object. |
| 118 | `delete_eval_check` | Delete a check. | `check_id` (string) | None | `{ "deleted": "<id>" }` |
| 119 | `list_eval_checks` | List checks. | None | `target_id` (string) | `{ "<items>": [ ... ] }`, newest first. |
| 120 | `run_evaluation` | Run every test case in a test set against its target, apply rules and checks, and save a batch. | `test_set_id` (string) | `check_ids` (array) | Status and output. |
| 121 | `list_eval_runs` | List per-test-case results in a batch. | `batch_id` (string) | None | `{ "<items>": [ ... ] }`, newest first. |
| 122 | `list_eval_batches` | List eval batches. | None | `test_set_id` (string) | `{ "<items>": [ ... ] }`, newest first. |
| 123 | `get_eval_batch_summary` | Get pass, fail, and error counts for a batch. | `batch_id` (string) | None | The object. |
| 124 | `poll_eval_batch_result` | Get batch status and results. | `batch_id` (string) | None | Status, reply or output, and error. |
| 125 | `cancel_eval_batch` | Stop a running batch. | `batch_id` (string) | None | JSON object; see the server source for fields. |
| 126 | `delete_eval_batch` | Delete a batch and its results. | `batch_id` (string) | None | `{ "deleted": "<id>" }` |

### 2.8 Alarms (8 tools)

| # | Tool name | Purpose | Required inputs | Optional inputs | Expected output |
|---|---|---|---|---|---|
| 127 | `create_alarm` | Create an alarm on a metric: error_count, failed_tasks, or eval_pass_rate over a window. | `name` (string), `target_id` (string), `metric` (string), `threshold` (number) | `window_hours` (number), `comparison` (string) | The created object with its `id`. |
| 128 | `get_alarm` | Get one alarm with its current value and state. | `alarm_id` (string) | None | The object. |
| 129 | `update_alarm` | Update an alarm. | `alarm_id` (string) | `name` (string), `threshold` (number), `window_hours` (number), `comparison` (string), `enabled` (boolean) | The updated object. |
| 130 | `delete_alarm` | Delete an alarm. | `alarm_id` (string) | None | `{ "deleted": "<id>" }` |
| 131 | `list_alarms` | List alarms with their current state. | None | `target_id` (string) | `{ "<items>": [ ... ] }`, newest first. |
| 132 | `create_eval_alarm` | Create an eval alarm on an agent or workforce that watches a performance dashboard's pass rate. Channels are stored; this server does not send notifications. | `resource_type` (string), `resource_id` (string), `source_config` (object), `condition_config` (object), `channels` (array), `cooldown_minutes` (number), `enabled` (boolean) | `name` (string), `auto_diagnose` (boolean), `skip_recovery_alert` (boolean) | The created object with its `id`. |
| 133 | `update_eval_alarm` | Update an eval alarm. condition_config merges field by field; source_config and channels replace. | `resource_type` (string), `resource_id` (string), `alarm_id` (string) | `source_config` (object), `condition_config` (object), `channels` (array), `cooldown_minutes` (number), `enabled` (boolean), `name` (string), `auto_diagnose` (boolean), `skip_recovery_alert` (boolean) | The updated object. |
| 134 | `delete_eval_alarm` | Delete an eval alarm. | `resource_type` (string), `resource_id` (string), `alarm_id` (string) | None | `{ "deleted": "<id>" }` |

### 2.9 Performance dashboards (8 tools)

| # | Tool name | Purpose | Required inputs | Optional inputs | Expected output |
|---|---|---|---|---|---|
| 135 | `create_performance_dashboard` | Create a dashboard that scores recent tasks of a target with rules. | `name` (string), `target_id` (string) | `description` (string) | The created object with its `id`. |
| 136 | `update_performance_dashboard` | Update a dashboard. | `dashboard_id` (string) | `name` (string), `description` (string) | The updated object. |
| 137 | `delete_performance_dashboard` | Delete a dashboard. | `dashboard_id` (string) | None | `{ "deleted": "<id>" }` |
| 138 | `list_performance_dashboards` | List dashboards. | None | `target_id` (string) | `{ "<items>": [ ... ] }`, newest first. |
| 139 | `add_performance_dashboard_rule` | Add a scoring rule (same shape as an eval check). | `dashboard_id` (string), `rule` (object) | None | JSON object; see the server source for fields. |
| 140 | `remove_performance_dashboard_rule` | Remove a scoring rule by index. | `dashboard_id` (string), `index` (number) | None | JSON object; see the server source for fields. |
| 141 | `list_performance_dashboard_runs` | Score the target's recent tasks now and list the results. | `dashboard_id` (string) | `limit` (number) | `{ "<items>": [ ... ] }`, newest first. |
| 142 | `get_performance_dashboard_timeseries` | Daily pass rate for the dashboard's target. | `dashboard_id` (string) | `days` (number) | The object. |

### 2.10 Pre-publish gate (4 tools)

| # | Tool name | Purpose | Required inputs | Optional inputs | Expected output |
|---|---|---|---|---|---|
| 143 | `upsert_pre_publish_config` | Require a test set to pass before publish_agent or publish_workforce succeeds. | `target_id` (string), `test_set_id` (string) | `min_pass_rate` (number) | JSON object; see the server source for fields. |
| 144 | `delete_pre_publish_config` | Remove the publish gate. | `target_id` (string) | None | `{ "deleted": "<id>" }` |
| 145 | `get_pre_publish_status` | Show the gate and the latest batch result. | `target_id` (string) | None | The object. |
| 146 | `poll_pre_publish_check` | Run the gate's test set now and report pass or fail. | `target_id` (string) | None | Status, reply or output, and error. |

### 2.11 Bulk runs (4 tools)

| # | Tool name | Purpose | Required inputs | Optional inputs | Expected output |
|---|---|---|---|---|---|
| 147 | `start_bulk_run` | Run an agent or tool once per item (rows of a knowledge table or an items list). | `target_id` (string), `target_type` (string) | `items` (array), `knowledge_set` (string), `message_template` (string), `concurrency` (number) | JSON object; see the server source for fields. |
| 148 | `get_bulk_run` | Get a bulk run's progress and results. | `bulk_run_id` (string) | None | The object. |
| 149 | `list_bulk_runs` | List bulk runs. | None | `target_id` (string) | `{ "<items>": [ ... ] }`, newest first. |
| 150 | `update_bulk_run_status` | Pause, resume, or cancel a bulk run. | `bulk_run_id` (string), `status` (string) | None | The updated object. |

### 2.12 Folders (3 tools)

| # | Tool name | Purpose | Required inputs | Optional inputs | Expected output |
|---|---|---|---|---|---|
| 151 | `upsert_folder` | Create or rename a folder. | `name` (string) | `folder_id` (string), `parent_id` (string) | JSON object; see the server source for fields. |
| 152 | `delete_folder` | Delete a folder. Items in it move to the root. | `folder_id` (string) | None | `{ "deleted": "<id>" }` |
| 153 | `list_folders` | List folders. | None | None | `{ "<items>": [ ... ] }`, newest first. |

### 2.13 Task priorities (3 tools)

| # | Tool name | Purpose | Required inputs | Optional inputs | Expected output |
|---|---|---|---|---|---|
| 154 | `set_resource_task_priority` | Set the queue priority (1 high to 5 low) for an agent's or workforce's tasks. | `target_id` (string), `priority` (number) | None | JSON object; see the server source for fields. |
| 155 | `unset_resource_task_priority` | Remove a priority. | `target_id` (string) | None | JSON object; see the server source for fields. |
| 156 | `list_resource_task_priorities` | List priorities. | None | None | `{ "<items>": [ ... ] }`, newest first. |

### 2.14 Analytics (6 tools)

| # | Tool name | Purpose | Required inputs | Optional inputs | Expected output |
|---|---|---|---|---|---|
| 157 | `get_analytics_agent_activity_timeseries` | Daily task counts per agent. | None | `days` (number), `agent_id` (string) | The object. |
| 158 | `get_analytics_errors` | Recent failed tasks and tool runs with their errors. | None | `days` (number), `limit` (number) | The object. |
| 159 | `get_analytics_resource_breakdown` | Task and run counts per agent, tool, and workforce. | None | `days` (number) | The object. |
| 160 | `get_analytics_task_status_counts` | Counts of tasks by status. | None | `days` (number), `target_id` (string) | The object. |
| 161 | `get_analytics_usage_breakdown` | Usage per model: calls, input and output characters, duration. | None | `days` (number) | The object. |
| 162 | `get_analytics_usage_timeseries` | Daily calls and duration. | None | `days` (number) | The object. |

### 2.15 Tasks (1 tools)

| # | Tool name | Purpose | Required inputs | Optional inputs | Expected output |
|---|---|---|---|---|---|
| 163 | `list_tasks` | List every task across agents and workforces. | None | `status` (string), `limit` (number) | `{ "<items>": [ ... ] }`, newest first. |

### 2.16 Project and integrations (11 tools)

| # | Tool name | Purpose | Required inputs | Optional inputs | Expected output |
|---|---|---|---|---|---|
| 164 | `get_project_info` | Show the store path, counts, Claude CLI status, and server version. | None | None | The object. |
| 165 | `check_api_key_availability` | Check whether env vars are set (values are never returned). | `keys` (array) | None | JSON object; see the server source for fields. |
| 166 | `list_integration_providers` | List integrations the step types can use and the env var each needs. | None | None | `{ "<items>": [ ... ] }`, newest first. |
| 167 | `list_oauth_accounts` | List connected accounts: each integration whose env var is set. | None | `provider` (string) | `{ "<items>": [ ... ] }`, newest first. |
| 168 | `list_slack_channels` | List Slack channels with SLACK_BOT_TOKEN. | None | `limit` (number) | `{ "<items>": [ ... ] }`, newest first. |
| 169 | `list_llm_models` | List the Claude models agents and prompt steps can use. | None | None | `{ "<items>": [ ... ] }`, newest first. |
| 170 | `list_decision_models` | List the models an agent can use for routing decisions. | None | None | `{ "<items>": [ ... ] }`, newest first. |
| 171 | `list_project_mcp_servers` | List MCP servers from the project's .mcp.json and ~/.claude.json. | None | None | `{ "<items>": [ ... ] }`, newest first. |
| 172 | `list_project_mcp_server_tools` | List a project MCP server's tools from its config entry. | `server_name` (string) | None | `{ "<items>": [ ... ] }`, newest first. |
| 173 | `submit_feedback` | Save feedback on a task or run to the store. | `target_id` (string) | `rating` (string), `comment` (string) | JSON object; see the server source for fields. |
| 174 | `api_call` | Make an HTTP request (method, URL, headers, body) and return status and body. | `url` (string) | `method` (string), `headers` (object), `body` (string) | JSON object; see the server source for fields. |

### 2.17 undefined (29 tools)

| # | Tool name | Purpose | Required inputs | Optional inputs | Expected output |
|---|---|---|---|---|---|
| 175 | `com_host_check` | Report the host: OS, PowerShell, Outlook/Word/Excel COM registration, classic Outlook availability, list separator, and the workspace root. | None | None | JSON object; see the server source for fields. |
| 176 | `outlook_add_category` | Add a category to an Outlook item, keep its existing categories, save, and read the result back. Splits and joins on the Windows list separator. | `entry_id` (string), `category` (string) | `store_id` (string) | JSON object; see the server source for fields. |
| 177 | `outlook_list_categories` | List the Outlook master category list (name, color). | None | None | JSON object; see the server source for fields. |
| 178 | `outlook_create_draft` | Create and save an Outlook draft. to, cc, bcc are semicolon-separated. | `to` (string), `subject` (string) | `body` (string), `cc` (string), `bcc` (string), `html` (boolean) | JSON object; see the server source for fields. |
| 179 | `outlook_send` | Send a saved Outlook draft by entry_id. | `entry_id` (string) | `store_id` (string) | JSON object; see the server source for fields. |
| 180 | `outlook_search` | Search an Outlook folder (inbox default; sent, drafts, deleted). Use query/from/since/until, or pass a raw DASL or Jet filter. | None | `folder` (string), `query` (string), `from` (string), `since` (string), `until` (string), `max_results` (number), `filter` (string) | JSON object; see the server source for fields. |
| 181 | `outlook_get_message` | Get one Outlook message by entry_id. | `entry_id` (string) | `store_id` (string) | JSON object; see the server source for fields. |
| 182 | `outlook_create_event` | Create an Outlook calendar item. With attendees it becomes a meeting; send_invites sends it. | `subject` (string), `start` (string), `end` (string) | `location` (string), `body` (string), `attendees` (string), `send_invites` (boolean) | JSON object; see the server source for fields. |
| 183 | `outlook_list_events` | List calendar items that overlap a time window, recurrences expanded. | `start` (string), `end` (string) | `calendar_entry_id` (string) | JSON object; see the server source for fields. |
| 184 | `outlook_get_event` | Get one calendar item by entry_id. | `entry_id` (string) | `store_id` (string) | JSON object; see the server source for fields. |
| 185 | `outlook_cancel_event` | Cancel a meeting (sends the cancellation) or delete an appointment. | `entry_id` (string) | `message` (string), `store_id` (string) | JSON object; see the server source for fields. |
| 186 | `outlook_free_busy` | Get free/busy slots for an address. Other people's free/busy needs Exchange. | `address` (string), `start` (string) | `minutes_per_slot` (number), `days` (number) | JSON object; see the server source for fields. |
| 187 | `outlook_list_calendars` | List calendar folders in every Outlook store. | None | None | JSON object; see the server source for fields. |
| 188 | `word_create_document` | Create a .docx under WORKFORCE_WINDOWS_ROOT with optional text. | `path` (string) | `text` (string), `overwrite` (boolean) | JSON object; see the server source for fields. |
| 189 | `word_read_document` | Read a .docx under WORKFORCE_WINDOWS_ROOT as plain text. | `path` (string) | None | JSON object; see the server source for fields. |
| 190 | `word_append_text` | Append a paragraph of text to a .docx. | `path` (string), `text` (string) | None | JSON object; see the server source for fields. |
| 191 | `word_append_image` | Append an inline image (file under the root) to a .docx. | `path` (string), `image_path` (string) | None | JSON object; see the server source for fields. |
| 192 | `word_replace_text` | Replace every match of find with replace in a .docx. | `path` (string), `find` (string), `replace` (string) | `match_case` (boolean) | JSON object; see the server source for fields. |
| 193 | `excel_create_workbook` | Create an .xlsx under WORKFORCE_WINDOWS_ROOT. | `path` (string) | None | JSON object; see the server source for fields. |
| 194 | `excel_append_row` | Append one row of values to a worksheet or named table, then read it back. | `path` (string), `values` (array) | `worksheet` (string), `table` (string) | JSON object; see the server source for fields. |
| 195 | `excel_read_range` | Read an A1 range (default: used range) as rows of values. | `path` (string) | `range` (string), `worksheet` (string) | JSON object; see the server source for fields. |
| 196 | `excel_update_range` | Write a 2-D array of values starting at the top-left cell of an A1 range. | `path` (string), `range` (string), `values` (array) | `worksheet` (string) | JSON object; see the server source for fields. |
| 197 | `excel_add_worksheet` | Add a worksheet to a workbook. | `path` (string), `name` (string) | None | JSON object; see the server source for fields. |
| 198 | `fs_list` | List files and folders under WORKFORCE_WINDOWS_ROOT (Scripting.FileSystemObject). | None | `path` (string), `recursive` (boolean) | JSON object; see the server source for fields. |
| 199 | `fs_read` | Read a text file under the root. | `path` (string) | None | JSON object; see the server source for fields. |
| 200 | `fs_write` | Write a text file (UTF-16) under the root. | `path` (string), `content` (string) | `overwrite` (boolean) | JSON object; see the server source for fields. |
| 201 | `fs_move` | Move a file or folder inside the root. | `source` (string), `destination` (string) | None | JSON object; see the server source for fields. |
| 202 | `fs_delete` | Delete a file or folder inside the root. | `path` (string) | None | JSON object; see the server source for fields. |
| 203 | `fs_create_folder` | Create a folder inside the root. | `path` (string) | None | JSON object; see the server source for fields. |

### 2.18 Step types a tool can use

| Step type | What it does | Params | Output fields |
|---|---|---|---|
| `prompt_completion` | Send a prompt to Claude through `claude -p` and return the text. | `prompt`: string, required; `system_prompt`: string; `model`: string (alias: sonnet, opus, haiku) | `answer` |
| `js_code_transformation` | Run JavaScript in a Node sandbox. `params` holds inputs; the code's return value is the output. | `code`: string, required. Body of an async function. Use `params.<name>` and `steps.<step>.output`. | `transformed`, `duration_ms` |
| `python_code_transformation` | Run Python 3. Inputs are in the dict `params`; set `result` or `return` a value from the body. | `code`: string, required | `transformed`, `stdout` |
| `api_call` | Make an HTTP request. | `url`: string, required; `method`: GET|POST|PUT|PATCH|DELETE; `headers`: object; `body`: string|object | `status`, `response_body` |
| `browserless_scrape` | Fetch a web page and return its visible text and links. | `website_url`: string, required | `page`, `links` |
| `search` | BM25 keyword search over a local knowledge table (`dataset_id: knowledge:<name>`). | `dataset_id`: string, required (knowledge:<name>); `query`: string, required; `page_size`: number; `filters`: object | `results` |
| `claude_db_search` | Same search, named for the skill's knowledge store. `store` is the knowledge table; filters default to status == active. | `store`: string, required; `query`: string, required; `top_k`: number; `filters`: object | `results` |
| `claude_db_upsert` | Add or replace rows in a local knowledge table by _id. | `store`: string, required; `rows`: array, required | `upserted` |

Step params can reference tool inputs as `{{name}}` and earlier step outputs as `{{step_name.field}}`. A param that is only one reference keeps the value's type (number, object, array).

## 3. External dependencies

**APIs and services required**

- Claude Code CLI (`claude`): runs every agent turn, prompt step, `llm_judge` check, and simulated user. It uses the Claude Code login on the machine.
- Optional HTTP services reached by `api_call` and `browserless_scrape` steps, with tokens from env vars.

**Authentication**

- Method: the Claude Code login for `claude -p`. Integration tokens come from env vars.
- Where credentials are stored: the `env` block of the server's entry in `.mcp.json`, or the shell environment. The server never returns token values.
- Scopes: whatever each integration token grants. The server adds none.

**Rate limits:** see Section 2. Claude usage limits stop agent runs until they reset; local tools keep working.

## 4. Data handling

**Input data**

- Source: tool calls from Claude Code, plus local files passed to `import_knowledge_file`.
- Format: JSON arguments; CSV, JSON, JSONL, Markdown, or text files.
- Volume: single objects or batches. Knowledge tables hold thousands of rows; search is in-memory BM25.

**Output data**

- Destination: tool results go back to Claude Code. `publish_agent` writes `.claude/agents/<name>.md`. `export_knowledge` writes a local file.
- Format: pretty-printed JSON.
- Storage: one JSON file per collection in `WORKFORCE_HOME` (default `./.workforce`). Writes are atomic (temp file, then rename).

**Data privacy**

- Sensitive data: agent conversations and knowledge rows can hold client data.
- Logging: stderr logs only the tool name and error code. Arguments, messages, rows, and tokens are never logged.
- Retention: the store keeps data until the user deletes it. Add `.workforce/` to `.gitignore` when it holds client data.

## 5. Technical requirements

**Runtime environment**

- Language: Node.js 20 or later, ES modules.
- Required libraries: `@modelcontextprotocol/sdk` 1.32.2. Nothing else.
- System dependencies: `claude` (Claude Code CLI) for agent runs; `python3` for Python steps.

**Performance**

- Local tools (create, get, list, search) answer in under 100 ms.
- Agent and prompt steps take as long as `claude -p`, usually 5 to 60 seconds.
- Concurrency: `*_async`, `trigger_tool`, `run_evaluation`, `trigger_workforce` without `wait`, and `start_bulk_run` return at once and finish in the background. Bulk runs use 1 to 8 workers.

**Error recovery**

- Retry: HTTP steps retry 5xx and network errors 3 times (1 s, 2 s, 4 s). `claude -p` failures are not retried.
- Fallback: a failed step stops the tool run and saves `status: failed` with the step number. A failed node stops a workforce task.
- Timeouts: 30 s per HTTP request; `WORKFORCE_TIMEOUT_MS` (default 300000) per `claude -p` call; 30 s per JavaScript step; 60 s per Python step.

## 6. Configuration

**Required configuration:** none. The server runs with defaults.

**Optional configuration**

| Setting | Type | Purpose | Default |
|---|---|---|---|
| `WORKFORCE_HOME` | env var | Store folder | `./.workforce` |
| `WORKFORCE_AGENTS_DIR` | env var | Where `publish_agent` writes subagent files | `./.claude/agents` |
| `WORKFORCE_CLAUDE_BIN` | env var | Path to the Claude Code CLI | `claude` |
| `WORKFORCE_DEFAULT_MODEL` | env var | Model for agents with no model | `sonnet` |
| `WORKFORCE_TIMEOUT_MS` | env var | Limit per `claude -p` call | `300000` |
| `ANTHROPIC_API_KEY` | env var | Optional. The claude CLI uses your Claude Code login when unset. | Not set |
| `SLACK_BOT_TOKEN` | env var | list_slack_channels and api_call steps to Slack. | Not set |
| `GITHUB_TOKEN` | env var | api_call steps to the GitHub API. | Not set |
| `HUBSPOT_TOKEN` | env var | api_call steps to HubSpot. | Not set |
| `NOTION_TOKEN` | env var | api_call steps to Notion. | Not set |

## 7. Testing requirements

`npm test` runs 27 end-to-end tests over a real MCP stdio connection. A stand-in CLI (`test/fake-claude.js`) replaces `claude` so the suite runs offline. Set `WORKFORCE_CLAUDE_BIN=claude` to run it live.

**Test scenarios**

- Happy path: the server lists exactly 203 tools, and no name or description contains the old vendor name.
- Happy path: a tool with a JavaScript step adds two inputs; step add, move, update, and remove change the result as expected.
- Happy path: a knowledge table takes rows and a Markdown file, and `claude_db_search` returns active rows only.
- Happy path: an agent with a tool and a knowledge table answers through `claude -p`; a two-agent workforce runs both nodes in order.
- Happy path: an eval batch with a `contains` rule, a simulated user, and an `llm_judge` check passes 2 of 2.
- Error: a missing required input returns `INVALID_INPUT`; an unknown ID returns `NOT_FOUND` with a hint; a wrong type is rejected.
- Error: an unsupported step type returns `UNSUPPORTED`; a workforce edge to a missing node is rejected.
- Error: any COM tool on a non-Windows host returns `UNSUPPORTED_HOST`; a COM path outside `WORKFORCE_WINDOWS_ROOT` returns `PATH_OUTSIDE_ROOT`.
- Edge case: the publish gate allows `publish_agent` at a 100% pass rate, writes the subagent file, and blocks publishing after a test fails.
- Integration: bulk runs, schedule triggers, alarms, dashboards, and analytics all run against the same store.

**Success criteria**

- Every tool returns JSON for valid input and an actionable error for invalid input.
- `npm test` reports 27 passed, 0 failed.
- One live run on Trey's machine: `trigger_agent` returns `status: complete` with a real Claude reply.

## 8. Documentation needs

**Setup steps**

1. Install Node.js 20 or later and Claude Code, and log in once with `claude`.
2. Unzip the server to a stable folder, for example `~/mcp/workforce-mcp-server`, then run `npm install` there.
3. Register it in the project where you design workforces:
   `claude mcp add workforce --scope project -- node ~/mcp/workforce-mcp-server/src/server.js`
4. Start Claude Code in that project and run `/mcp`. The `workforce` server shows 203 tools.
5. Test: ask Claude "Call get_project_info on the workforce server." The reply shows the store path and the Claude CLI version.

**Example usage:** see `docs/PROMPTS.md`, the prompt library.

**Troubleshooting**

| Symptom | Cause | Fix |
|---|---|---|
| `claude_cli: NOT FOUND` in `get_project_info` | The CLI is not on the PATH the server sees. | Set `WORKFORCE_CLAUDE_BIN` to the full path in `.mcp.json`. |
| `CLAUDE_FAILED` with "Authentication error" | Claude Code is not logged in on this machine. | Run `claude` once and log in. |
| `CLAUDE_FAILED` with 429 | The account hit a usage limit. | Wait for the reset; local tools keep working. |
| A workforce stops after one node | No edge leaves that node, or an edge `condition` did not match the reply. | Check `edges` with `get_workforce`. |
| Search returns nothing | Rows lack `status: active` and the search uses the default filter. | Pass `filters: {}` or set `status` on each row. |
| A schedule trigger never fires | The server does not run in the background. | Put the trigger's `fire_command` in cron or a Claude Code scheduled task. |

## Priority items

- [x] Needs robust error recovery (agent runs can fail on login or usage limits)
- [ ] Must handle authentication complexly (one CLI login plus optional env tokens)
- [x] Needs to handle large data volumes (knowledge tables and bulk runs)
- [ ] Requires fast response times (local tools are fast; agent runs depend on Claude)
- [x] Will be used in production workflows (Stage 3 of build-workforce-map)
- [ ] Prototype/experimental use only

**Timeline:** version 1.0.0 is built and passes its offline suite. One live run on Trey's machine is the remaining check.

**Additional context:** This server replaces the vendor connector for the build-workforce-map skill. The skill's `INSTALL.md` Step 1 registers it, and the skill's Stage 3 builds through it.
