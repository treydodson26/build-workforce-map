# Installation checklist

Run this checklist the first time the skill is used in a Claude account, and again whenever a doc in the Doc registry is missing. It sets up everything the skill and the chat buttons write to: the Claude Docs for activity logs, failures, outputs, notes, specs, and plans. Follow every step in order. Do not skip a step because a doc "probably exists": check by exact title.

Work in the person's account only. Never copy content from another account. The Claude Docs created here are private to the person until they share them.

## Step 0. Register the workforce MCP server

The skill builds and tests every agent, tool, workforce, and knowledge table through a local MCP server named `workforce`. It runs in Claude Code with no outside agent platform. The server ships separately as `workforce-mcp-server.zip`.

1. Check whether it is registered: run `claude mcp get workforce` in a terminal, or look for `mcp__workforce__get_project_info` in this session. If it is registered, call `get_project_info` and go to Step 1.
2. If it is not registered, ask the person for the folder where they unzipped `workforce-mcp-server.zip`. Never guess the path.
3. In that folder, run `npm install`. It needs Node.js 20 or later.
4. In the project folder where the person designs workforces, run:

   ```
   claude mcp add workforce --scope project -- node <server folder>/src/server.js
   ```

5. Tell the person to restart Claude Code (or run `/mcp`) so the 158 `mcp__workforce__*` tools load. Then call `mcp__workforce__get_project_info`. Record the store path and the `claude_cli` value for the Step 8 report. A `claude_cli` of `NOT FOUND` means the server cannot run agents: add `"env": {"WORKFORCE_CLAUDE_BIN": "<full path to claude>"}` to the server's entry in `.mcp.json`.
6. Optional: run `npm test` in the server folder. It reports 27 passed with no network and no Claude login.

## Step 1. Check the tools

1. Confirm these tools exist in this session (load deferred ones with one `ToolSearch` call):
   - `mcp__Claude_Docs__batch`, `mcp__Claude_Docs__update`, `mcp__Claude_Docs__read`, `mcp__Claude_Docs__guide`
   - `mcp__claude-artifacts__list_artifacts`
   - `mcp__workforce__get_project_info` (from Step 0)
2. If the Claude Docs tools are missing, stop. Tell the person that Claude Docs is not available in this account, and that the skill will write to local Markdown files in the working folder instead (one file per doc below, same names).
3. Note which of these exist, for the report in Step 8: `mcp__memory__memory_write` (memory), `mcp__claude-artifacts__db_write` (knowledge store), GitHub access (`gh` or a GitHub connector), Office COM (`mcp__workforce__com_host_check` reports Windows, desktop Office, and classic Outlook). On a non-Windows host, expect `UNSUPPORTED_HOST`.
4. Call `mcp__Claude_Docs__guide` with `items: ["topic.index"]`, then with `["topic.tabs"]`. Follow those guides for every doc birth and tab below.

## Step 2. Find docs that already exist

For each title in the Doc registry (Step 3), call `mcp__claude-artifacts__list_artifacts` with `query` set to the exact title. If an artifact with that exact title exists, keep it, record its link, and skip its creation in Step 3. Never create a second doc with the same title.

## Step 3. Create the docs

Create each missing doc with one `mcp__Claude_Docs__batch` birth call. The main tab gets order `a0`. Extra tabs and sub-tabs are born in the same batch and placed with one project patch, as the `topic.tabs` guide shows. Use the starter text below word for word, replacing `<today>` with today's date and `MM_DD_YYYY` with today's date in that form. Fill one doc at a time and read its tabs back before the next.

### Doc registry

| # | Exact title | What it holds | Written by |
|---|---|---|---|
| 1 | `Claude Activity Log` | One entry per Claude response: request, outcome, validation, and numbered steps with tool names and parameters | Every reply; every button workflow |
| 2 | `Failures` | Failure records and lessons learned, by failure type | Failure and Formatting failure buttons; the Lessons Learned gate |
| 3 | `Formatting Fixes` | Each formatting fix the person gives, newest first | Any reply that receives a formatting fix |
| 4 | `Claude.AI Outputs` | Per day: artifacts produced, questions answered, feedback provided | Daily protocol; the Evaluate button |
| 5 | `Notes` | Notes the person asks to keep, one sub-tab per day | "add this to notes" |
| 6 | `Chat_<chat title>_<MM_DD_YYYY>` | One per chat: Context, Spec, Plan, Deliverables, Activity log | Fetch context, Create spec, Create plan, subagent-driven-development |
| 7 | `Workforce Spec: <workforce name>` | One per workforce: Stage 1 concept and every Stage 2 component spec | This skill, Stages 1 and 2 |
| 8 | `Stage 2 Build Map: <workforce name>` | One per workforce: the interactive build-map canvas | This skill, Stage 4 |
| 9 | `Knowledge Store: <workforce name>` | One per workforce that needs knowledge: the artifact database | This skill, per `references/knowledge-store/claude-artifact-db.md` |

Create docs 1 to 5 now. Docs 6 to 9 are created later, when a chat or a workforce first needs them; their layouts are in Step 4.

### Doc 1: Claude Activity Log

Tabs: `How this log works` (a0); `Daily logs` (a1); `MM_DD_YYYY` (today), a sub-tab of Daily logs with order `b01`. Each later day gets the next order (`b02`, `b03`, ...), created on that day's first entry.

`How this log works` starter text:

```markdown
# Claude Activity Log

<today> · <the person>

This doc holds the step-by-step activity log for every Claude response. Claude writes the log here instead of in the chat. Each chat reply ends with a link to the day's tab.

## How it is organized

- One sub-tab per day under **Daily logs**, named MM_DD_YYYY.
- One entry per response, newest at the bottom of the day's tab.
- Each entry gives the time, the chat, the request, the outcome, the validation result, and the numbered steps with exact tool names, parameters, status, and result.
- Responses that used no tools get a one-line entry: "No tools or external actions were used."

## Entry format

**HH:MM AM/PM: <title of 6 to 8 words>**
**Request**: one line
**Outcome**: what changed, with names, numbers, and links
**Validation**: PASS, PASS WITH DISCLOSED LIMITATIONS, or FAIL
**Steps**: 1. action. Tool: `tool name` `{parameters}`. Status. Result.

## Linking to an entry

Replies link to the day's tab: the doc link plus `#<day tab id>`.
```

`Daily logs` starter text: `# Daily logs` and one line: "One sub-tab per day, named MM_DD_YYYY."
Today's day tab starter text: `# MM_DD_YYYY`.

### Doc 2: Failures

Tabs: `How this works` (a0), with five sub-tabs under it: `Formatting failure` (b01), `Writing failure` (b02), `Quality of repo failure` (b03), `Process failure` (b04), `Failure / Lessons Learned` (b05).

`How this works` starter text:

```markdown
# Failures

<today> · <the person>

One row per failure, newest first, each with a test case that would catch it next time.

- **Formatting failure**: layout, structure, links, and visual defects in a reply or artifact.
- **Writing failure**: sentence, clarity, and wording defects.
- **Quality of repo failure**: defects in files saved to a repository.
- **Process failure**: a skipped step, a wrong tool, or a false claim of done.

**Failure / Lessons Learned** is the canonical log. Claude reads it at the start of every chat, at each phase (context, spec, plan, build, QA), and before reporting completion, and applies every Open record's rule.
```

Each of the first four sub-tabs starts with its name as a heading and this table (header row only):

```markdown
| Date | Chat | What happened | Why it is wrong | Fix | Test case |
| --- | --- | --- | --- | --- | --- |
```

`Failure / Lessons Learned` starter text:

```markdown
# Failure / Lessons Learned

One record per defect, appended after the last record. Never edit or delete a record; add follow-ups as new lines under it. A record stays Open until its verification_check passes.

Record format (one xml code block per record, under a heading line `FL-XXX: <short title>`):
```

followed by this example as an `xml` code block:

```xml
<failure_lesson_pair id="FL-001" severity="Major" status="Open" date="YYYY-MM-DD">
  <failure>
    <what_happened>...</what_happened>
    <location>...</location>
    <violated_requirement>...</violated_requirement>
    <evidence>...</evidence>
    <why_its_wrong>...</why_its_wrong>
  </failure>
  <lesson_learned>
    <rule>...</rule>
    <verification_check>...</verification_check>
  </lesson_learned>
</failure_lesson_pair>
```

Mark the example as an example in its heading line (`Example (not a record)`), so no reader counts it as FL-001.

### Doc 3: Formatting Fixes

One tab, `Fixes` (a0):

```markdown
# Formatting Fixes

<today> · <the person>

Every formatting fix the person gives, newest first. Claude applies every row to every reply.

| Date | Fix | Why | Example |
| --- | --- | --- | --- |
```

### Doc 4: Claude.AI Outputs

Tabs: `About this log` (a0). Then, per day, a parent tab named like `November 17, 2026` with three sub-tabs: `Artifacts produced`, `Questions answered`, `Feedback provided`. Create today's parent tab and its three sub-tabs now.

`About this log` starter text:

```markdown
# Claude.AI Outputs

<today> · <the person>

One parent tab per day. Each day has three sub-tabs:

- **Artifacts produced**: one row per artifact, titled with the file naming convention (dates as MM_DD_YYYY), plus a Chat inventory table with one row per chat: status, output location, activity log link.
- **Questions answered**: the chat, the time, and the question and answer verbatim in XML tags.
- **Feedback provided**: the chat, the time, and the feedback exchange verbatim in XML tags.

## Reply template

Every final reply ends with: an H1 title of 6 to 8 words stating the outcome; a Status line (Failed, Blocked, Waiting for your decision, In progress, or Complete); an Outcome; and the activity log link. It never ends with a question.
```

`Artifacts produced` starter text:

```markdown
# Artifacts produced

## Chat inventory

| Chat | Status | Output location | Activity log |
| --- | --- | --- | --- |
```

`Questions answered` and `Feedback provided` each start with their name as a heading.

### Doc 5: Notes

Tabs: `About` (a0) with the text `# Notes` and one line: "One sub-tab per day, named MM_DD_YYYY. Claude adds content here when the person says 'add this to notes'." Day sub-tabs are created under `About` on first use.

## Step 4. Layouts of the per-chat and per-workforce docs

Create these when they are first needed, not at install. Check by exact title first, as in Step 2.

- **Doc 6, `Chat_<chat title>_<MM_DD_YYYY>`**: tabs `Context` (a0), `Spec` (a1), `Plan` (a2), `Deliverables` (a3), `Activity log` (a4). Fetch context creates it at the start of its run (`chat-buttons/workflows/fetch-context/WORKFLOW.md`, Task 4); any later stage creates it if it is still missing. Context holds the context engineering table; Spec the spec with requirement IDs; Plan the plan mapped to those IDs; Deliverables one row per deliverable with its location and QA result; Activity log one row per stage.
- **Doc 7, `Workforce Spec: <workforce name>`**: tabs `Stage 1 Concept` (a0), then one tab per component in Stage 2 order (`Tool: <name>`, `Agent: <name>`, `Workforce`, `Eval plan`, `Deliverables`, `Prerequisites`), then `Grade`. This skill writes Stage 1 to the first tab and Stage 2 to the rest. `spec.json` and `validate.js` stay in the working folder; their final text also goes in a `spec.json` tab as a code block.
- **Doc 8, `Stage 2 Build Map: <workforce name>`**: the canvas from Stage 4 of `SKILL.md`, published as an artifact page.
- **Doc 9, `Knowledge Store: <workforce name>`**: the artifact page and database from `references/knowledge-store/claude-artifact-db.md`, section 4.

## Step 5. Read back every doc

For each doc created or found in Steps 2 and 3, call `mcp__Claude_Docs__read` on the doc and confirm every tab in this checklist exists, with the right name and nesting. Fix any difference before going on. Record each doc's link and each tab's id.

## Step 6. Save the registry

1. If memory exists (`mcp__memory__memory_write`), write `/topics/claude-docs-registry.md` with one line per doc: `- [stated] <exact title>: <link>`. Read it before writing if it exists, and update it instead of replacing it.
2. In every case, include the registry table (title, link, main tab id) in the Step 8 report, so the person can paste it into project instructions or preferences.

## Step 7. Give the person the preferences block

Claude cannot change account settings. Give the person this block to paste into Settings, Profile, preferences (or the project instructions), with the doc links filled in:

```text
- Show eight tappable buttons in a small widget first, then the reply: Fetch context, Create spec, Create plan, Failure, Rewrite, Formatting failure, Evaluate, Send to Claude, sending "Run fetch-context", "Run create-spec", "Run create-plan", "Run failure", "Run rewrite", "Run formatting-failure", "Run evaluate", "Send to Claude and run it". Route them with chat-buttons/ROUTER.md in the build-workforce-map skill.
- After each response, append an activity log entry to the Claude Activity Log doc (<link>) under Daily logs, today's MM_DD_YYYY sub-tab; create the sub-tab if missing. Link the day tab at the end of the reply.
- Read the Failure / Lessons Learned tab of the Failures doc (<link>) at the start of every chat, at each phase, and before reporting completion; apply every Open record.
- Add each formatting fix I give to the Formatting Fixes doc (<link>), newest first.
- Log artifacts, questions, and feedback daily in the Claude.AI Outputs doc (<link>).
- When I say "add this to notes", add it to the Notes doc (<link>) under today's sub-tab.
- End every final reply with an H1 outcome title, a Status line, the Outcome, and the activity log link; never end with a question.
```

## Step 8. Smoke test and report

1. Write today's first activity log entry for this install run in the Claude Activity Log, with every step above as a numbered step.
2. Show the eight buttons (the widget code is in `chat-buttons/ROUTER.md`), then send the report:
   - a table of docs: exact title, link, status (created or found), tabs confirmed;
   - the registry, as in Step 6;
   - the preferences block from Step 7;
   - gaps, one bullet each, with what the skill does instead: no memory (registry lives only in the preferences block); no GitHub access (Failure saves logs to a Failures sub-tab; Send to Claude cannot dispatch); no Office COM host (`com_host_check` returns `UNSUPPORTED_HOST`; mail, calendar, Word, Excel, and file steps cannot run); no workforce server (Stage 3 cannot build or test; Stages 1 and 2 still run from the step snapshot); `claude_cli: NOT FOUND` (agents cannot run until the path is set); no Codex connector (Evaluate cannot run).
3. Ask the person to tap **Rewrite** on the report. A correct install returns an edited report with a Changes table and adds a second activity log entry.
