# Chat Buttons

This folder is the chat-buttons router, bundled with the build-workforce-map skill so it works on a machine where the separate button skills are not installed. It is not a skill of its own: Claude reads this file when Trey taps a chat button or sends one of the button messages.

## Purpose

Run the workflow that matches the chat button Trey tapped. Each button sends one fixed message. Read that message, pick one route from the routing table, and run it. Every route is a workflow file in `workflows/`, the inline Rewrite workflow, or the inline Failure workflow.

## Variables

BUTTON_MESSAGE: the fixed message the button sent
EXTRA_INSTRUCTIONS: any text Trey added after the message; may be empty
WORKFLOWS_DIR: `chat-buttons/workflows/` in this skill's folder. Each workflow is a folder with a `WORKFLOW.md` and its support files.
REPO: the GitHub repository named in the Doc registry of `INSTALL.md`. When no repository is reachable, the routes that need one say what they do instead.
ACTIVITY_LOG_DOC: the **Claude Activity Log** doc. Find it by exact title with `mcp__claude-artifacts__list_artifacts` (`query: "Claude Activity Log"`). `INSTALL.md` creates it.
FAILURES_DOC: the **Failures** doc. Find it by exact title the same way. `INSTALL.md` creates it.
OUTPUTS_DOC: the **Claude.AI Outputs** doc. Find it by exact title the same way. `INSTALL.md` creates it.

If any of these docs is missing, stop and run `INSTALL.md` first.

## Instructions

- Match BUTTON_MESSAGE against the Message column. Ignore letter case and surrounding spaces.
- Run exactly one route, exactly once, per button tap. Read its `WORKFLOW.md` in full before you start, or follow its inline workflow (Rewrite or Failure) in this file.
- When a workflow says to run another skill (for example "Skill `create-spec`"), and that skill has a folder in WORKFLOWS_DIR, read that folder's `WORKFLOW.md` and follow it. Use an installed skill of the same name only when its folder is missing here.
- When a workflow names a tool or connector that this session does not have (for example workspace folder or Outlook on a work laptop), skip that step, record it as a gap in the workflow's output, and continue.
- Before any route, read the Failure / Lessons Learned tab of FAILURES_DOC and apply every Open record's rule. Read it again before reporting completion.
- Apply EXTRA_INSTRUCTIONS on top of the workflow. When they conflict, EXTRA_INSTRUCTIONS win.
- When a route hands off to the next workflow in the Chain table, start the next one only after the handoff check in that table passes. A link, a stage's own claim, or a skipped check never counts as a pass.
- When BUTTON_MESSAGE matches no row, do not guess. Say which messages are valid and stop.
- Every workflow ends by writing its activity log entry to ACTIVITY_LOG_DOC and showing the eight buttons again, first, before the final reply.

## Workflow

### Routing table

| Button | Message | Workflow | Route |
|---|---|---|---|
| Fetch context | `Run fetch-context` | Gather context from every source and write the context table, then hand off to Create spec | `workflows/fetch-context/WORKFLOW.md` |
| Create spec | `Run create-spec` | Turn the chat or a transcript into a reviewed spec, then hand off to Create plan | `workflows/create-spec/WORKFLOW.md` |
| Create plan | `Run create-plan` | Turn a spec or request into a reviewed, execution-ready plan, then start execution | `workflows/create-plan/WORKFLOW.md` |
| Failure | `Run failure` | Log each defect as XML and save the full chat activity log | Inline Failure workflow below |
| Rewrite | `Run rewrite` | Edit the entire preceding Claude answer and return the edited text | Inline Rewrite workflow below, which follows `workflows/write-edit/WORKFLOW.md` |
| Formatting failure | `Run formatting-failure` | Log each layout defect as XML | Inline Failure workflow below |
| Evaluate | `Run evaluate` | Send the work to Codex for a read-only review | `workflows/evaluate/WORKFLOW.md` |
| Send to Claude | `Send to Claude and run it` | Package the chat into REPO and start the Claude Code dispatch routine | `workflows/dispatch-chat-to-code/WORKFLOW.md` |

The eight buttons, in this order, for the widget shown before every reply:

```html
<div style="display:flex;flex-wrap:wrap;gap:8px;padding:4px 0">
<button onclick="sendPrompt('Run fetch-context')">Fetch context</button>
<button onclick="sendPrompt('Run create-spec')">Create spec</button>
<button onclick="sendPrompt('Run create-plan')">Create plan</button>
<button onclick="sendPrompt('Run failure')">Failure</button>
<button onclick="sendPrompt('Run rewrite')">Rewrite</button>
<button onclick="sendPrompt('Run formatting-failure')">Formatting failure</button>
<button onclick="sendPrompt('Run evaluate')">Evaluate</button>
<button onclick="sendPrompt('Send to Claude and run it')">Send to Claude</button>
</div>
```

### Chain

Fetch context, Create spec, and Create plan form one chain, ending in subagent-driven-development. Each stage hands off to the next only after its handoff check passes. The check is a real read-back made in this chat: a `mcp__Claude_Docs__read` of the tab, or a file or repository read of the saved copy. If the read-back fails, shows a placeholder, or the stage left a required step not run, stop and name the stage.

All four stages write to the chat's own doc, `Chat_<chat title>_<MM_DD_YYYY>`, with tabs Context, Spec, Plan, Deliverables, and Activity log. `INSTALL.md` (section "Per-chat doc") says how to create it.

| Starts at | Handoff check, read back before the next stage | Runs next |
|---|---|---|
| `workflows/fetch-context/` | The chat doc's Context tab holds the context engineering table, and the parse package's validation report reads status pass | `workflows/create-spec/` |
| `workflows/create-spec/` | The Spec tab holds the spec with requirement IDs, and every review fix is applied and read back | `workflows/create-plan/` |
| `workflows/create-plan/` | The Plan tab maps every requirement ID to a step and an acceptance check, and the review fixes and dry run passed | `workflows/subagent-driven-development/` |
| `workflows/subagent-driven-development/` | The Deliverables tab lists each deliverable with a location that opens and a QA result | Stop and report |

### Rewrite workflow (inline)

Rewrite corrects text. It never creates or edits a failure record. It still reads the Failure / Lessons Learned tab, as every route does.

1. Take the target. The target is the entire Claude answer immediately before the `Run rewrite` message: every piece of answer text Trey could read in that turn, in order. That includes text before a tool call, text after it, and SendUserMessage messages.
2. Keep the original Markdown exactly: headings, lists, tables, code blocks, link text with its URL, and the last sentence. Exclude only UI widgets, cards, and tool events. Never summarize, shorten, or reorder the target.
3. If the `writing-desk:write-edit` skill is installed, invoke it once with the Skill tool and put the verbatim target in `args`. Otherwise read `workflows/write-edit/WORKFLOW.md` and follow it on the target. Add the level and reader Trey names in EXTRA_INSTRUCTIONS; otherwise use medium, and the reader line says "not stated".
4. Apply write-edit's rules as written. Keep every number, name, date, quote, technical term, hedge, and qualifier, including scope qualifiers such as "in this chat". Mark any change you are unsure keeps the meaning with "check: meaning". List anything that looks wrong under "Flagged, not changed" and leave it as written.
5. Return write-edit's output, in its order: the level line, the edited text for the whole target, the Changes table, the Flagged, not changed list, and the **Next:** line.
6. Show the verbatim input, under **Input passed to write-edit**, only when Trey asks for it or when an explicit Rewrite test needs it.
7. If no earlier Claude answer exists, or the target holds no text, say so and stop.

### Failure workflow (inline)

This workflow serves only the Failure and Formatting failure buttons.

1. Take the flagged reply. Default to the last Claude reply. Use any words Trey typed after the message as the reason and target.
2. Read the Failure / Lessons Learned tab of FAILURES_DOC. Parse every XML block, legacy `<failure_record>` and `<failure_lesson_pair>`, and collect every ID from the tab. When REPO is reachable, also collect IDs from `NORMS/Failures/*.xml` in REPO.
3. Skip defects an existing record already covers. Give each remaining defect the next unused `FL-` ID.
4. Write one `<failure_lesson_pair id="FL-XXX" severity="Major" status="Open" date="YYYY-MM-DD">` per defect, with `<failure>` (what_happened, location, violated_requirement, evidence, why_its_wrong) and `<lesson_learned>` (rule, verification_check). Formatting failure names the defect class in `violated_requirement` and also adds a row to the Formatting failure tab.
5. Validate each record: well-formed XML, a unique ID, every required element present and non-empty. When REPO is reachable, run `python3 NORMS/Failures/validate.py <ledger.xml> --previous <prior.xml>` instead. Append only after the check passes, after the last existing record: one heading line and one `xml` code block per record. Never edit or delete an earlier record; add follow-ups as new lines under it.
6. Reopen the tab, parse it again, and confirm each new ID appears once and earlier blocks are unchanged. Report the IDs and the tab revision.
7. Run failure only: save every activity log entry for this chat. With REPO reachable, save them to `NORMS/Failures/FAIL_YYYY-MM-DD_HHMM_short-slug.md`. Otherwise add them to a new sub-tab of FAILURES_DOC named `FAIL_YYYY-MM-DD_HHMM_short-slug`.
8. Keep each record Open until its verification_check passes, with the evidence added as a follow-up line under the record.

## Directory layout

```
chat-buttons/
├── ROUTER.md                      (this file)
└── workflows/
    ├── fetch-context/WORKFLOW.md
    ├── create-spec/WORKFLOW.md    (+ scripts/, defaults/, references/, requirements.txt)
    ├── create-plan/WORKFLOW.md    (+ references/plan-template.md)
    ├── subagent-driven-development/WORKFLOW.md (+ 4 prompt files)
    ├── write-edit/WORKFLOW.md
    ├── evaluate/WORKFLOW.md
    └── dispatch-chat-to-code/WORKFLOW.md
```
