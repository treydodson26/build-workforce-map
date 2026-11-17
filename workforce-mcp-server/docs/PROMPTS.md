# Workforce MCP Server Prompt Library

These prompts drive the `workforce` MCP server from Claude Code. Each prompt names the outcome, and Claude picks the tools. Replace the values in angle brackets.

## 1. Checking the setup

**Check the server:**

```
Call get_project_info on the workforce server and tell me the store path, the Claude CLI version, and the object counts.
```

**Check which integrations are connected:**

```
List the integration providers and say which env vars are set.
```

**Check the models:**

```
List the LLM models I can give an agent.
```

## 2. Building knowledge tables

**Create a table and load a file:**

```
Create a knowledge table named <tenant-faq> and import <./docs/faq.md> into it. Then show the row count.
```

**Load a spreadsheet export:**

```
Import <./data/units.csv> into a new knowledge table named <units>. Show the first 5 rows.
```

**Test search before an agent uses it:**

```
Run claude_db_search on <tenant-faq> for "<how do I report a leak>" and show the top 5 hits with scores.
```

**Retire an old row:**

```
In <tenant-faq>, set status to retired on the row about <the old parking rule>, then rerun the search to confirm it no longer appears.
```

## 3. Building tools

**Create a tool from a template:**

```
Search the public tool templates for "summarize", clone the best match as <Summarize ticket>, and run it on this text: <text>.
```

**Create a tool with steps:**

```
Create a tool named <Lookup lease> with input unit_id. Step 1 searches the units knowledge table for the unit. Step 2 asks Claude to return the lease end date as JSON. Run it with unit_id <4B>.
```

**Fix a failing tool:**

```
Show the latest run of tool <tool_id>. Tell me which step failed and why, fix the step params, and run it again with the same inputs.
```

**Check what a tool needs:**

```
Check the integration requirements for tool <tool_id> and tell me which binaries or env vars are missing.
```

## 4. Building agents

**Create an agent:**

```
Create an agent named <Maintenance Intake> on the sonnet model. Its system prompt: <prompt>. Attach tool <tool_id> and knowledge table <tenant-faq>.
```

**Talk to an agent:**

```
Trigger agent <agent_id> with "<My kitchen sink is leaking>" and show me the reply.
```

**Continue a conversation:**

```
Send "<It started this morning>" to agent <agent_id> in conversation <task_id>.
```

**Edit one line of a prompt:**

```
In agent <agent_id>'s system prompt, replace "<old sentence>" with "<new sentence>". Show the line numbers that changed.
```

**Publish an agent as a Claude Code subagent:**

```
Publish agent <agent_id> with note "<first release>". Show me the path of the .claude/agents file it wrote.
```

**Roll back:**

```
List agent <agent_id>'s versions and restore version <2>.
```

## 5. Building workforces

**Create a two-step workforce:**

```
Create a workforce named <Maintenance desk>. Node intake runs agent <intake_id>. Node dispatch runs agent <dispatch_id>. Add one edge from intake to dispatch. Then run it with "<Leak under the sink in unit 4B>" and wait for the result.
```

**Branch on the reply:**

```
Update workforce <wf_id>: add node escalate with agent <escalation_id> and an edge from intake to escalate with condition "emergency".
```

**See what each node said:**

```
Show the messages of workforce task <task_id>, one block per node.
```

## 6. Testing and evals

**Build a test set:**

```
Create a test set named <Intake core cases> for agent <agent_id>. Add these cases:
1. "<Water is coming through the ceiling>": reply must contain "emergency".
2. "<The dishwasher is loud>": reply must not contain "emergency".
3. A simulated tenant who is upset about a repeat leak.
```

**Add a judge:**

```
Create an llm_judge check named <Asks for unit number> with the rubric "Passes if the reply asks for the unit number when it is missing."
```

**Run the evals:**

```
Run the evaluation for test set <test_set_id> with check <check_id>. Poll until it finishes, then show pass, fail, and error counts and every failing case with its reason.
```

**Gate publishing on evals:**

```
Require test set <test_set_id> to pass at 100% before agent <agent_id> can publish. Run the gate check now and tell me if publishing is allowed.
```

## 7. Running at scale

**Run a tool over every row:**

```
Start a bulk run of tool <tool_id> over every row in knowledge table <units> with concurrency 4. Report progress until it finishes.
```

**Run an agent over a list:**

```
Start a bulk run of agent <agent_id> on these items with the message template "Classify this request: {{item}}":
- <item 1>
- <item 2>
```

**Pause or cancel:**

```
Pause bulk run <bulk_run_id>. Then show how many items finished.
```

## 8. Triggers and schedules

**Weekly schedule:**

```
Create a schedule trigger on agent <agent_id> with cron "0 9 * * 1" and the message "<Send the weekly summary>". Give me the cron line to install.
```

**Turn a trigger off:**

```
List trigger statuses for agent <agent_id> and turn off trigger <trigger_id>.
```

## 9. Monitoring

**Daily health check:**

```
Give me today's workforce health report:
1. Task status counts for the last day
2. Every error with its task or run ID
3. Usage by model
4. Any alarm that is FIRING
```

**Create an alarm:**

```
Create an alarm on agent <agent_id> that fires when failed tasks exceed 3 in 24 hours.
```

**Quality dashboard:**

```
Create a performance dashboard for agent <agent_id> with a rule that the reply contains "ticket number". Show the daily pass rate for the last 14 days.
```

## 10. End-to-end workflows

**Build from a Stage 2 spec:**

```
Read the Workforce Spec doc for <workforce name>. Build it in dependency order on the workforce server: knowledge tables, then tools, then agents, then the workforce. Run every component's test from the spec, and stop at the first failure.
```

**Rebuild after a spec change:**

```
The spec for <agent name> changed. Compare it with get_agent, apply only the differences, rerun its test set, and publish if the gate passes.
```

## 11. Troubleshooting prompts

```
Call get_project_info. If the Claude CLI shows NOT FOUND, tell me the exact WORKFORCE_CLAUDE_BIN line to add to .mcp.json.
```

```
Agent task <task_id> failed. Show its metadata and error, and tell me whether it was a login problem, a usage limit, or a prompt problem.
```

```
Search returned nothing for "<query>" in <table>. List 5 rows with their status field and tell me whether the active filter removed them.
```

## Tips

- Name the object by ID when you have one; names can repeat.
- Ask Claude to poll async tools (`run_evaluation`, `trigger_agent_async`, `start_bulk_run`) until they finish.
- Ask for a test run after every build step, not only at the end.
- Keep `.workforce/` out of git when it holds client data.
