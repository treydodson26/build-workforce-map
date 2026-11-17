// The tools this server exposes (count: Object.keys(TOOLS).length). Each entry: name -> [family, purpose, params].
// Param syntax: "name" optional string, "name!" required, "name:type" with type
// object | array | number | boolean | string. Required and typed: "name!:array".

export const TOOLS = {
  // ---------- Agents ----------
  create_agent: ["agents", "Create an agent with a name, system prompt, model, and tools.", "name!, system_prompt, model, description, tool_ids:array, knowledge_ids:array, folder_id, settings:object"],
  get_agent: ["agents", "Get one agent by ID.", "agent_id!"],
  update_agent: ["agents", "Update agent fields. Only the fields you pass change.", "agent_id!, name, system_prompt, model, description, settings:object, knowledge_ids:array"],
  list_agents: ["agents", "List agents, newest first.", "folder_id, query, limit:number, cursor"],
  publish_agent: ["agents", "Save a numbered version of the agent and write it to .claude/agents/<slug>.md so Claude Code can run it as a subagent.", "agent_id!, note"],
  read_agent_system_prompt: ["agents", "Read the agent's system prompt with line numbers.", "agent_id!"],
  edit_agent_system_prompt: ["agents", "Replace one exact string in the agent's system prompt.", "agent_id!, old_string!, new_string!"],
  search_agent_system_prompt: ["agents", "Find lines in the agent's system prompt that match a regular expression.", "agent_id!, pattern!"],
  get_agent_tools: ["agents", "List the tools and MCP servers attached to an agent.", "agent_id!"],
  attach_tools_to_agent: ["agents", "Attach tools to an agent.", "agent_id!, tool_ids!:array"],
  detach_tools_from_agent: ["agents", "Detach tools from an agent.", "agent_id!, tool_ids!:array"],
  attach_mcp_server_to_agent: ["agents", "Attach an MCP server (by name from the project) to an agent.", "agent_id!, server_name!, tools:array"],
  detach_mcp_server_from_agent: ["agents", "Detach an MCP server from an agent.", "agent_id!, server_name!"],
  update_agent_mcp_server_approvals: ["agents", "Set which MCP tools need approval before the agent runs them.", "agent_id!, server_name!, approvals!:object"],
  update_agent_action: ["agents", "Set one attached tool's action settings (approval mode, max calls, prompt description).", "agent_id!, tool_id!, approval_mode, max_calls:number, description"],
  list_agent_versions: ["agents", "List published versions of an agent.", "agent_id!"],
  get_agent_version: ["agents", "Get one published version of an agent.", "agent_id!, version!:number"],
  restore_agent_version: ["agents", "Restore a published version as the current draft.", "agent_id!, version!:number"],
  trigger_agent: ["agents", "Send a message to an agent and wait for the reply. Runs `claude -p` with the agent's system prompt.", "agent_id!, message!, conversation_id, timeout_seconds:number"],
  trigger_agent_async: ["agents", "Send a message to an agent and return a task ID at once. Poll with poll_agent_result.", "agent_id!, message!, conversation_id"],
  poll_agent_result: ["agents", "Get the status and reply of an agent task.", "task_id!"],
  list_agent_tasks: ["agents", "List an agent's tasks.", "agent_id!, status, limit:number"],
  list_agent_task_messages: ["agents", "List the messages in one agent task.", "task_id!"],
  get_agent_task_metadata: ["agents", "Get task metadata: status, timing, model, cost estimate.", "task_id!"],
  get_agent_task_summary: ["agents", "Summarize one agent task: message count, status, last reply.", "task_id!"],
  submit_agent_task_decisions: ["agents", "Approve or reject tool calls an agent task is waiting on, then resume it.", "task_id!, decisions!:array"],
  list_agent_triggers: ["agents", "List the triggers attached to an agent.", "agent_id!"],

  // ---------- Tools ----------
  create_tool: ["tools", "Create a tool: inputs, ordered steps, and an output mapping.", "name!, description, inputs:array, steps:array, output:object, folder_id"],
  get_tool: ["tools", "Get one tool by ID.", "tool_id!"],
  update_tool: ["tools", "Update tool fields. Only the fields you pass change.", "tool_id!, name, description, inputs:array, output:object"],
  list_tools: ["tools", "List tools.", "folder_id, query, limit:number"],
  publish_tool: ["tools", "Save a numbered version of the tool.", "tool_id!, note"],
  bulk_delete_tools: ["tools", "Delete several tools.", "tool_ids!:array"],
  add_tool_step: ["tools", "Add a step to a tool. Position defaults to the end.", "tool_id!, step!:object, position:number"],
  remove_tool_step: ["tools", "Remove a step by name.", "tool_id!, step_name!"],
  move_tool_step: ["tools", "Move a step to a new position.", "tool_id!, step_name!, position!:number"],
  update_tool_step: ["tools", "Merge new params into one step.", "tool_id!, step_name!, params!:object"],
  update_tool_steps: ["tools", "Replace the tool's whole step list.", "tool_id!, steps!:array"],
  set_tool_output: ["tools", "Set the tool's output mapping, for example {\"answer\": \"{{llm.output}}\"}.", "tool_id!, output!:object"],
  list_tool_versions: ["tools", "List published versions of a tool.", "tool_id!"],
  get_tool_version: ["tools", "Get one published version of a tool.", "tool_id!, version!:number"],
  restore_tool_version: ["tools", "Restore a published version as the current draft.", "tool_id!, version!:number"],
  update_tool_version: ["tools", "Change the note on a published version.", "tool_id!, version!:number, note!"],
  run_tool: ["tools", "Run a tool now with inputs and wait for the result.", "tool_id!, params:object"],
  trigger_tool: ["tools", "Start a tool run and return a run ID at once.", "tool_id!, params:object"],
  poll_tool_result: ["tools", "Get the status and output of a tool run.", "run_id!"],
  get_tool_run: ["tools", "Get one tool run with every step's output.", "run_id!"],
  get_latest_tool_run: ["tools", "Get the newest run of a tool.", "tool_id!"],
  list_tool_runs: ["tools", "List runs of a tool.", "tool_id!, limit:number"],
  create_tool_from_transformation: ["tools", "Create a one-step tool from a transformation in the catalog.", "transformation_id!, name, params:object"],
  clone_public_tool: ["tools", "Copy a template tool from the bundled template library.", "template_id!, name"],
  search_public_tools: ["tools", "Search the bundled template library.", "query"],
  check_tool_integration_requirements: ["tools", "List the env vars a tool's steps need and whether each is set.", "tool_id!"],

  // ---------- Transformations (step types) ----------
  list_transformations: ["transformations", "List the step types this server can run.", "query"],
  get_transformation: ["transformations", "Get one step type's param schema and output.", "transformation_id!"],
  get_transformation_requirements: ["transformations", "List env vars and binaries a step type needs, and whether each is present.", "transformation_id!"],
  run_transformation: ["transformations", "Run one step type directly with params.", "transformation_id!, params!:object"],

  // ---------- Workforces ----------
  create_workforce: ["workforces", "Create a workforce: agent nodes and the edges between them.", "name!, description, nodes:array, edges:array, folder_id"],
  get_workforce: ["workforces", "Get one workforce by ID.", "workforce_id!"],
  update_workforce: ["workforces", "Update workforce fields, nodes, or edges.", "workforce_id!, name, description, nodes:array, edges:array"],
  delete_workforce: ["workforces", "Delete a workforce.", "workforce_id!"],
  list_workforces: ["workforces", "List workforces.", "folder_id, query"],
  publish_workforce: ["workforces", "Save a numbered version of the workforce.", "workforce_id!, note"],
  list_workforce_versions: ["workforces", "List published versions of a workforce.", "workforce_id!"],
  trigger_workforce: ["workforces", "Run a workforce: start at the entry node and pass each reply along the edges. Returns a task ID.", "workforce_id!, message!, wait:boolean"],
  poll_workforce_task_result: ["workforces", "Get the status and final reply of a workforce task.", "task_id!"],
  list_workforce_tasks: ["workforces", "List a workforce's tasks.", "workforce_id!, limit:number"],
  get_workforce_task_messages: ["workforces", "List every node's messages in a workforce task.", "task_id!"],
  get_workforce_task_metadata: ["workforces", "Get workforce task metadata: status, timing, node path.", "task_id!"],
  update_workforce_trigger_status: ["workforces", "Turn a trigger on a workforce on or off.", "workforce_id!, trigger_id!, enabled!:boolean"],

  // ---------- Knowledge ----------
  create_knowledge_set: ["knowledge", "Create a knowledge table.", "name!, description, columns:array"],
  get_knowledge_set: ["knowledge", "Get a knowledge table's metadata and row count.", "knowledge_set!"],
  update_knowledge_set: ["knowledge", "Update a knowledge table's description or columns.", "knowledge_set!, description, columns:array"],
  delete_knowledge_set: ["knowledge", "Delete a knowledge table and its rows.", "knowledge_set!"],
  list_knowledge_sets: ["knowledge", "List knowledge tables.", "query"],
  add_knowledge_rows: ["knowledge", "Add rows. Each row is an object; an _id is created when missing.", "knowledge_set!, rows!:array"],
  list_knowledge_rows: ["knowledge", "List rows, with optional exact-match filters.", "knowledge_set!, filters:object, limit:number, offset:number"],
  get_knowledge_row: ["knowledge", "Get one row by _id.", "knowledge_set!, row_id!"],
  update_knowledge_rows: ["knowledge", "Merge fields into rows by _id.", "knowledge_set!, rows!:array"],
  delete_knowledge_rows: ["knowledge", "Delete rows by _id.", "knowledge_set!, row_ids!:array"],
  delete_knowledge_columns: ["knowledge", "Remove columns from every row.", "knowledge_set!, columns!:array"],
  import_knowledge_file: ["knowledge", "Import a local CSV, JSON, JSONL, Markdown, or text file. Text files are chunked (400 words, 50 overlap).", "knowledge_set!, file_path!"],
  export_knowledge: ["knowledge", "Export a knowledge table to a local JSONL or CSV file.", "knowledge_set!, file_path!, format"],

  // ---------- Triggers ----------
  create_trigger: ["triggers", "Create a trigger on an agent or workforce: schedule (cron), webhook, or manual.", "target_id!, target_type!, type!, config:object, message"],
  get_trigger: ["triggers", "Get one trigger.", "trigger_id!"],
  delete_trigger: ["triggers", "Delete a trigger.", "trigger_id!"],
  update_trigger_status: ["triggers", "Turn a trigger on or off.", "trigger_id!, enabled!:boolean"],
  list_trigger_statuses: ["triggers", "List every trigger with its status and last fire time.", "target_id"],

  // ---------- Evals ----------
  create_eval_test_set: ["evals", "Create a test set for an agent or workforce.", "name!, target_id!, description"],
  get_eval_test_set: ["evals", "Get one test set with its test cases.", "test_set_id!"],
  update_eval_test_set: ["evals", "Update a test set.", "test_set_id!, name, description"],
  delete_eval_test_set: ["evals", "Delete a test set and its test cases.", "test_set_id!"],
  list_eval_test_sets: ["evals", "List test sets.", "target_id"],
  create_eval_test_case: ["evals", "Create a test case: an input message, or a simulated user scenario.", "test_set_id!, name!, input, scenario, expected"],
  get_eval_test_case: ["evals", "Get one test case.", "test_case_id!"],
  update_eval_test_case: ["evals", "Update a test case.", "test_case_id!, name, input, scenario, expected"],
  delete_eval_test_case: ["evals", "Delete a test case.", "test_case_id!"],
  list_eval_test_cases: ["evals", "List test cases in a test set.", "test_set_id!"],
  add_eval_test_case_rule: ["evals", "Add a rule to a test case: contains, not_contains, regex, or llm_judge.", "test_case_id!, rule!:object"],
  remove_eval_test_case_rule: ["evals", "Remove a rule from a test case by index.", "test_case_id!, index!:number"],
  set_eval_test_case_simulation_config: ["evals", "Set the simulated user: persona, goal, and max turns.", "test_case_id!, config!:object"],
  create_eval_check: ["evals", "Create a reusable check: contains, not_contains, regex, or llm_judge with a rubric.", "name!, type!, value, rubric, target_id"],
  update_eval_check: ["evals", "Update a check.", "check_id!, name, type, value, rubric"],
  delete_eval_check: ["evals", "Delete a check.", "check_id!"],
  list_eval_checks: ["evals", "List checks.", "target_id"],
  run_evaluation: ["evals", "Run every test case in a test set against its target, apply rules and checks, and save a batch.", "test_set_id!, check_ids:array"],
  list_eval_runs: ["evals", "List per-test-case results in a batch.", "batch_id!"],
  list_eval_batches: ["evals", "List eval batches.", "test_set_id"],
  get_eval_batch_summary: ["evals", "Get pass, fail, and error counts for a batch.", "batch_id!"],
  poll_eval_batch_result: ["evals", "Get batch status and results.", "batch_id!"],
  cancel_eval_batch: ["evals", "Stop a running batch.", "batch_id!"],
  delete_eval_batch: ["evals", "Delete a batch and its results.", "batch_id!"],

  // ---------- Alarms ----------
  create_alarm: ["alarms", "Create an alarm on a metric: error_count, failed_tasks, or eval_pass_rate over a window.", "name!, target_id!, metric!, threshold!:number, window_hours:number, comparison"],
  get_alarm: ["alarms", "Get one alarm with its current value and state.", "alarm_id!"],
  update_alarm: ["alarms", "Update an alarm.", "alarm_id!, name, threshold:number, window_hours:number, comparison, enabled:boolean"],
  delete_alarm: ["alarms", "Delete an alarm.", "alarm_id!"],
  list_alarms: ["alarms", "List alarms with their current state.", "target_id"],

  // ---------- Performance dashboards ----------
  create_performance_dashboard: ["dashboards", "Create a dashboard that scores recent tasks of a target with rules.", "name!, target_id!, description"],
  update_performance_dashboard: ["dashboards", "Update a dashboard.", "dashboard_id!, name, description"],
  delete_performance_dashboard: ["dashboards", "Delete a dashboard.", "dashboard_id!"],
  list_performance_dashboards: ["dashboards", "List dashboards.", "target_id"],
  add_performance_dashboard_rule: ["dashboards", "Add a scoring rule (same shape as an eval check).", "dashboard_id!, rule!:object"],
  remove_performance_dashboard_rule: ["dashboards", "Remove a scoring rule by index.", "dashboard_id!, index!:number"],
  list_performance_dashboard_runs: ["dashboards", "Score the target's recent tasks now and list the results.", "dashboard_id!, limit:number"],
  get_performance_dashboard_timeseries: ["dashboards", "Daily pass rate for the dashboard's target.", "dashboard_id!, days:number"],

  // ---------- Pre-publish gate ----------
  upsert_pre_publish_config: ["prepublish", "Require a test set to pass before publish_agent or publish_workforce succeeds.", "target_id!, test_set_id!, min_pass_rate:number"],
  delete_pre_publish_config: ["prepublish", "Remove the publish gate.", "target_id!"],
  get_pre_publish_status: ["prepublish", "Show the gate and the latest batch result.", "target_id!"],
  poll_pre_publish_check: ["prepublish", "Run the gate's test set now and report pass or fail.", "target_id!"],

  // ---------- Bulk runs ----------
  start_bulk_run: ["bulk", "Run an agent or tool once per item (rows of a knowledge table or an items list).", "target_id!, target_type!, items:array, knowledge_set, message_template, concurrency:number"],
  get_bulk_run: ["bulk", "Get a bulk run's progress and results.", "bulk_run_id!"],
  list_bulk_runs: ["bulk", "List bulk runs.", "target_id"],
  update_bulk_run_status: ["bulk", "Pause, resume, or cancel a bulk run.", "bulk_run_id!, status!"],

  // ---------- Folders ----------
  upsert_folder: ["folders", "Create or rename a folder.", "name!, folder_id, parent_id"],
  delete_folder: ["folders", "Delete a folder. Items in it move to the root.", "folder_id!"],
  list_folders: ["folders", "List folders.", ""],

  // ---------- Task priorities ----------
  set_resource_task_priority: ["priorities", "Set the queue priority (1 high to 5 low) for an agent's or workforce's tasks.", "target_id!, priority!:number"],
  unset_resource_task_priority: ["priorities", "Remove a priority.", "target_id!"],
  list_resource_task_priorities: ["priorities", "List priorities.", ""],

  // ---------- Analytics ----------
  get_analytics_agent_activity_timeseries: ["analytics", "Daily task counts per agent.", "days:number, agent_id"],
  get_analytics_errors: ["analytics", "Recent failed tasks and tool runs with their errors.", "days:number, limit:number"],
  get_analytics_resource_breakdown: ["analytics", "Task and run counts per agent, tool, and workforce.", "days:number"],
  get_analytics_task_status_counts: ["analytics", "Counts of tasks by status.", "days:number, target_id"],
  get_analytics_usage_breakdown: ["analytics", "Usage per model: calls, input and output characters, duration.", "days:number"],
  get_analytics_usage_timeseries: ["analytics", "Daily calls and duration.", "days:number"],

  // ---------- Tasks ----------
  list_tasks: ["tasks", "List every task across agents and workforces.", "status, limit:number"],

  // ---------- Project and integrations ----------
  get_project_info: ["project", "Show the store path, counts, Claude CLI status, and server version.", ""],
  check_api_key_availability: ["project", "Check whether env vars are set (values are never returned).", "keys!:array"],
  list_integration_providers: ["project", "List integrations the step types can use and the env var each needs.", ""],
  list_oauth_accounts: ["project", "List connected accounts: each integration whose env var is set.", "provider"],
  list_slack_channels: ["project", "List Slack channels with SLACK_BOT_TOKEN.", "limit:number"],
  list_llm_models: ["project", "List the Claude models agents and prompt steps can use.", ""],
  list_decision_models: ["project", "List the models an agent can use for routing decisions.", ""],
  list_project_mcp_servers: ["project", "List MCP servers from the project's .mcp.json and ~/.claude.json.", ""],
  list_project_mcp_server_tools: ["project", "List a project MCP server's tools from its config entry.", "server_name!"],
  submit_feedback: ["project", "Save feedback on a task or run to the store.", "target_id!, rating, comment"],
  // meeting_bot removed 11/17/2026: not in the original catalog and no local provider.
  api_call: ["project", "Make an HTTP request (method, URL, headers, body) and return status and body.", "url!, method, headers:object, body"],
  // ---------- Added 11/17/2026: the 17 original-catalog tools the first build lacked ----------
  cancel_agent_task: ["agents", "Cancel a queued or running agent task. Kills the running claude process and marks the task cancelled. A finished task is reported unchanged.", "agent_id!, task_id!"],
  cancel_tool_run: ["tools", "Cancel a running tool run. The run stops before its next step (best effort).", "task_id!"],
  cancel_workforce_task: ["workforces", "Cancel a running workforce task. Stops routing and kills the node in flight.", "workforce_id!, task_id!"],
  delete_agent: ["agents", "Permanently delete an agent and its triggers. Irreversible.", "agent_id!"],
  delete_tool: ["tools", "Permanently delete a tool. Irreversible.", "tool_id!"],
  get_task_view: ["agents", "Deprecated alias of get_agent_task_summary.", "agent_id!, task_id!"],
  list_conversations: ["agents", "Deprecated alias of list_agent_tasks.", "agent_id!, page_size:number"],
  update_agent_metadata_fields: ["agents", "Add, replace, rename, or remove the metadata fields that label each agent run. Fill mode agent (the agent records a value) or rule (set when a named tool finishes or trigger fires).", "agent_id!, upsert:array, remove:array, rename:array, settings:object"],
  update_agent_version: ["agents", "Relabel a published agent version by version_id. Changes no config.", "agent_id!, version_id!, version_name, version_description"],
  update_workforce_version: ["workforces", "Relabel a published workforce version by version_id. Changes no config.", "workforce_id!, version_id!, version_name, version_description"],
  restore_workforce_version: ["workforces", "Copy a published workforce version into the draft.", "version_id!"],
  create_eval_alarm: ["alarms", "Create an eval alarm on an agent or workforce that watches a performance dashboard's pass rate. Channels are stored; this server does not send notifications.", "resource_type!, resource_id!, source_config!:object, condition_config!:object, channels!:array, cooldown_minutes!:number, enabled!:boolean, name, auto_diagnose:boolean, skip_recovery_alert:boolean"],
  update_eval_alarm: ["alarms", "Update an eval alarm. condition_config merges field by field; source_config and channels replace.", "resource_type!, resource_id!, alarm_id!, source_config:object, condition_config:object, channels:array, cooldown_minutes:number, enabled:boolean, name, auto_diagnose:boolean, skip_recovery_alert:boolean"],
  delete_eval_alarm: ["alarms", "Delete an eval alarm.", "resource_type!, resource_id!, alarm_id!"],
  search_marketplace_listings: ["tools", "Search the bundled template library as marketplace listings.", "query, entity_type, categories:array, page:number, page_size:number, price_type"],
  get_marketplace_listing: ["tools", "Get one bundled template listing by listing_id.", "listing_id!"],
  clone_marketplace_listing: ["tools", "Clone a bundled template listing into the local store.", "listing_id!"],

  // ---------- Microsoft Office COM (Windows host, desktop Office, classic Outlook) ----------
  com_host_check: ["com", "Report the host: OS, PowerShell, Outlook/Word/Excel COM registration, classic Outlook availability, list separator, and the workspace root.", ""],
  outlook_add_category: ["com", "Add a category to an Outlook item, keep its existing categories, save, and read the result back. Splits and joins on the Windows list separator.", "entry_id!, category!, store_id"],
  outlook_list_categories: ["com", "List the Outlook master category list (name, color).", ""],
  outlook_create_draft: ["com", "Create and save an Outlook draft. to, cc, bcc are semicolon-separated.", "to!, subject!, body, cc, bcc, html:boolean"],
  outlook_send: ["com", "Send a saved Outlook draft by entry_id.", "entry_id!, store_id"],
  outlook_search: ["com", "Search an Outlook folder (inbox default; sent, drafts, deleted). Use query/from/since/until, or pass a raw DASL or Jet filter.", "folder, query, from, since, until, max_results:number, filter"],
  outlook_get_message: ["com", "Get one Outlook message by entry_id.", "entry_id!, store_id"],
  outlook_create_event: ["com", "Create an Outlook calendar item. With attendees it becomes a meeting; send_invites sends it.", "subject!, start!, end!, location, body, attendees, send_invites:boolean"],
  outlook_list_events: ["com", "List calendar items that overlap a time window, recurrences expanded.", "start!, end!, calendar_entry_id"],
  outlook_get_event: ["com", "Get one calendar item by entry_id.", "entry_id!, store_id"],
  outlook_cancel_event: ["com", "Cancel a meeting (sends the cancellation) or delete an appointment.", "entry_id!, message, store_id"],
  outlook_free_busy: ["com", "Get free/busy slots for an address. Other people's free/busy needs Exchange.", "address!, start!, minutes_per_slot:number, days:number"],
  outlook_list_calendars: ["com", "List calendar folders in every Outlook store.", ""],
  word_create_document: ["com", "Create a .docx under WORKFORCE_WINDOWS_ROOT with optional text.", "path!, text, overwrite:boolean"],
  word_read_document: ["com", "Read a .docx under WORKFORCE_WINDOWS_ROOT as plain text.", "path!"],
  word_append_text: ["com", "Append a paragraph of text to a .docx.", "path!, text!"],
  word_append_image: ["com", "Append an inline image (file under the root) to a .docx.", "path!, image_path!"],
  word_replace_text: ["com", "Replace every match of find with replace in a .docx.", "path!, find!, replace!, match_case:boolean"],
  excel_create_workbook: ["com", "Create an .xlsx under WORKFORCE_WINDOWS_ROOT.", "path!"],
  excel_append_row: ["com", "Append one row of values to a worksheet or named table, then read it back.", "path!, values!:array, worksheet, table"],
  excel_read_range: ["com", "Read an A1 range (default: used range) as rows of values.", "path!, range, worksheet"],
  excel_update_range: ["com", "Write a 2-D array of values starting at the top-left cell of an A1 range.", "path!, range!, values!:array, worksheet"],
  excel_add_worksheet: ["com", "Add a worksheet to a workbook.", "path!, name!"],
  fs_list: ["com", "List files and folders under WORKFORCE_WINDOWS_ROOT (Scripting.FileSystemObject).", "path, recursive:boolean"],
  fs_read: ["com", "Read a text file under the root.", "path!"],
  fs_write: ["com", "Write a text file (UTF-16) under the root.", "path!, content!, overwrite:boolean"],
  fs_move: ["com", "Move a file or folder inside the root.", "source!, destination!"],
  fs_delete: ["com", "Delete a file or folder inside the root.", "path!"],
  fs_create_folder: ["com", "Create a folder inside the root.", "path!"],
};

// Step types (transformations) the tool runner executes.
export const TRANSFORMATIONS = {
  prompt_completion: {
    description: "Send a prompt to Claude through `claude -p` and return the text.",
    params: { prompt: "string, required", system_prompt: "string", model: "string (alias: sonnet, opus, haiku)" },
    output: { answer: "string" },
    requires: { binaries: ["claude"], env: [] },
  },
  js_code_transformation: {
    description: "Run JavaScript in a Node sandbox. `params` holds inputs; the code's return value is the output.",
    params: { code: "string, required. Body of an async function. Use `params.<name>` and `steps.<step>.output`." },
    output: { transformed: "any", duration_ms: "number" },
    requires: { binaries: ["node"], env: [] },
  },
  python_code_transformation: {
    description: "Run Python 3. Inputs are in the dict `params`; set `result` or `return` a value from the body.",
    params: { code: "string, required" },
    output: { transformed: "any", stdout: "string" },
    requires: { binaries: ["python3"], env: [] },
  },
  api_call: {
    description: "Make an HTTP request.",
    params: { url: "string, required", method: "GET|POST|PUT|PATCH|DELETE", headers: "object", body: "string|object" },
    output: { status: "number", response_body: "any" },
    requires: { binaries: [], env: [] },
  },
  browserless_scrape: {
    description: "Fetch a web page and return its visible text and links.",
    params: { website_url: "string, required" },
    output: { page: "string", links: "array" },
    requires: { binaries: [], env: [] },
  },
  search: {
    description: "BM25 keyword search over a local knowledge table (`dataset_id: knowledge:<name>`).",
    params: { dataset_id: "string, required (knowledge:<name>)", query: "string, required", page_size: "number", filters: "object" },
    output: { results: "array" },
    requires: { binaries: [], env: [] },
  },
  claude_db_search: {
    description: "Same search, named for the skill's knowledge store. `store` is the knowledge table; filters default to status == active.",
    params: { store: "string, required", query: "string, required", top_k: "number", filters: "object" },
    output: { results: "array" },
    requires: { binaries: [], env: [] },
  },
  claude_db_upsert: {
    description: "Add or replace rows in a local knowledge table by _id.",
    params: { store: "string, required", rows: "array, required" },
    output: { upserted: "number" },
    requires: { binaries: [], env: [] },
  },
};

export const INTEGRATIONS = [
  { provider: "anthropic", env: "ANTHROPIC_API_KEY", note: "Optional. The claude CLI uses your Claude Code login when unset." },
  { provider: "slack", env: "SLACK_BOT_TOKEN", note: "list_slack_channels and api_call steps to Slack." },
  { provider: "github", env: "GITHUB_TOKEN", note: "api_call steps to the GitHub API." },
  { provider: "hubspot", env: "HUBSPOT_TOKEN", note: "api_call steps to HubSpot." },
  { provider: "notion", env: "NOTION_TOKEN", note: "api_call steps to Notion." },
];

export const TEMPLATES = [
  { template_id: "summarize-text", name: "Summarize text", description: "One prompt step that summarizes the input text.",
    inputs: [{ name: "text", type: "string" }],
    steps: [{ name: "llm", transformation: "prompt_completion", params: { prompt: "Summarize in 5 bullets:\n\n{{text}}" } }],
    output: { summary: "{{llm.answer}}" } },
  { template_id: "scrape-and-summarize", name: "Scrape and summarize a web page", description: "Fetch a page, then summarize it.",
    inputs: [{ name: "url", type: "string" }],
    steps: [
      { name: "scrape", transformation: "browserless_scrape", params: { website_url: "{{url}}" } },
      { name: "llm", transformation: "prompt_completion", params: { prompt: "Summarize this page in 5 bullets:\n\n{{scrape.page}}" } }],
    output: { summary: "{{llm.answer}}" } },
  { template_id: "knowledge-answer", name: "Answer from a knowledge table", description: "Search a knowledge table, then answer from the top hits only.",
    inputs: [{ name: "question", type: "string" }, { name: "store", type: "string" }],
    steps: [
      { name: "kb", transformation: "claude_db_search", params: { store: "{{store}}", query: "{{question}}", top_k: 5 } },
      { name: "llm", transformation: "prompt_completion", params: { prompt: "Answer only from these passages. Cite _id values.\n\n{{kb.results}}\n\nQuestion: {{question}}" } }],
    output: { answer: "{{llm.answer}}", sources: "{{kb.results}}" } },
  { template_id: "json-transform", name: "Reshape JSON", description: "One JavaScript step that reshapes the input object.",
    inputs: [{ name: "data", type: "object" }],
    steps: [{ name: "js", transformation: "js_code_transformation", params: { code: "return params.data;" } }],
    output: { result: "{{js.transformed}}" } },
];

export function parseParams(spec) {
  const props = {}, required = [];
  for (const raw of spec.split(",").map(s => s.trim()).filter(Boolean)) {
    const [left, type = "string"] = raw.split(":");
    const req = left.endsWith("!");
    const name = req ? left.slice(0, -1) : left;
    props[name] = type === "array" ? { type: "array", items: {} } : type === "object" ? { type: "object" } : { type };
    if (req) required.push(name);
  }
  return { type: "object", properties: props, required, additionalProperties: true };
}
