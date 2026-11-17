# Plan Template — Exact Output Structure

Fill every section below in order. Replace bracketed placeholders with concrete values drawn from the parsed task and the inspected toolset. Drop no section. When a section does not apply, keep its heading and write the stated "none" line for that section.

---

# [Specific Plan Title]

> **For agentic workers:** REQUIRED EXECUTION METHOD: Use subagent-driven development when the task has independent phases, tool-heavy extraction, validation, or artifact generation. Otherwise execute inline with checkpoints.

## Goal

State the task goal in one concrete paragraph.

## Architecture

Explain how information flows from input sources to intermediate artifacts to final outputs. Use this pattern when it fits:

```text
Raw request
-> source inventory
-> tool inventory
-> variables
-> step plan
-> generated artifacts
-> validation evidence
-> handoff
```

## Tech Stack

List the runtime, tools, connectors, local skills, files, APIs, scripts, and validation methods the plan expects to use.

## Required Skill File Paths

Include this table only when skills are relevant.

| Skill Contract     | Path           | Use In This Workflow |
| ------------------ | -------------- | -------------------- |
| [exact skill name] | `[exact path]` | [why it is used]     |

When no skill paths are verified, write:

```text
No required skill file paths were verified in the current runtime.
```

## Description

Write two to three sentences. State what the workflow produces, what it receives, and what standard or method it follows.

## Overview for New Team Members

Explain the workflow in plain language for an agent or human who has no prior context.

## Tool Catalog Used

Inspect available tools before you fill this section.

| Tool Name           | Purpose   | Required Params   | Optional Params   | Output         | Constraints                          |
| ------------------- | --------- | ----------------- | ----------------- | -------------- | ------------------------------------ |
| `[exact tool name]` | [purpose] | [required params] | [optional params] | [return shape] | [limits / approvals / failure modes] |

Rules:

- Every tool you list must exist in the current runtime.
- Every later tool call must reference a tool from this table.
- When a tool takes a FREEFORM input schema, say so here.
- When a tool requires JSON params, show valid JSON examples later in the plan.

## Tool Capability Mapping

| Capability           | Exact Tool Used | Exact Params Used      | Fallback     |
| -------------------- | --------------- | ---------------------- | ------------ |
| Reading files        | `[tool]`        | `[params]`             | `[fallback]` |
| Searching files      | `[tool]`        | `[params]`             | `[fallback]` |
| Creating files       | `[tool]`        | `[params or FREEFORM]` | `[fallback]` |
| Editing files        | `[tool]`        | `[params or FREEFORM]` | `[fallback]` |
| Running validation   | `[tool]`        | `[params]`             | `[fallback]` |
| Publishing / handoff | `[tool]`        | `[params]`             | `[fallback]` |

## Variables

### Primary Input/Output Variables

- `{RAW_TASK_DESCRIPTION}`: The unstructured user request.
- `{WORKSPACE_ROOT}`: Root folder for plan execution.
- `{OUTPUT_ROOT}`: Root folder for generated artifacts.
- `{PLAN_PATH}`: Saved implementation plan path.
- `{FINAL_OUTPUT}`: Final expected deliverable.
- `{VALIDATION_REPORT}`: Final validation evidence.

Add task-specific variables as the task requires.

### Intermediate Variables

Define every intermediate variable before any step uses it. Examples:

- `{SOURCE_INVENTORY}`
- `{TOOL_INVENTORY}`
- `{TOOL_CAPABILITY_MATRIX}`
- `{WORKFLOW_QUEUE}`
- `{EXTRACTION_RESULT}`
- `{MAPPING_TABLE}`
- `{DRAFT_OUTPUT}`
- `{QA_RESULTS}`
- `{HANDOFF_MANIFEST}`

## File Structure

| Path           | Create / Modify / Read | Purpose   |
| -------------- | ---------------------- | --------- |
| `[exact path]` | Create                 | [purpose] |
| `[exact path]` | Modify                 | [purpose] |
| `[exact path]` | Read                   | [purpose] |

Rules:

- Every created output path must appear here.
- Every later file reference must be defined here first.
- Reference no undefined path.

---

# Step 1: [Step Name]

## Description

Explain the purpose of this major step.

## Variables

List the variables this step consumes and the variables it produces.

## Acceptance Criteria

- [ ] Input is available.
- [ ] Required tool is verified.
- [ ] Output artifact is created or updated.
- [ ] Failure path is documented.

## Technical Requirements

- [ ] Use exact tool names from `Tool Catalog Used`.
- [ ] Use exact params from the fetched tool schema.
- [ ] Validate outputs before moving forward.

## Constraints

- [ ] Perform no destructive action unless the task explicitly requests it.
- [ ] Invent no missing data.
- [ ] Record blockers instead of skipping them.

## Output

State the exact output this step produces.

## Step 1.1: [Atomic Action Name]

### Tool Call

`[exact tool name]`

### Input Payload

For JSON-schema tools:

```json
{
  "param_name": "value"
}
```

For FREEFORM tools:

```text
[exact freeform input]
```

### Action

Describe the action the agent performs.

### Acceptance Criteria

- [ ] Tool call succeeds.
- [ ] Output is captured.
- [ ] Output matches the expected shape.

### Output Payload

```json
{
  "status": "success | blocked | failed",
  "output_variable": "value",
  "evidence": []
}
```

Repeat this step pattern for every major phase and every atomic action.

---

## End-to-End Dry Run

Trace the plan from beginning to end before you declare it ready.

| Phase  | Inputs  | Tool Used | Output   | Validation |
| ------ | ------- | --------- | -------- | ---------- |
| Step 1 | [input] | [tool]    | [output] | [check]    |

## Dry Run Checks

- [ ] Every variable is defined before use.
- [ ] Every tool in atomic steps appears in `Tool Catalog Used`.
- [ ] Every JSON tool call uses valid JSON params.
- [ ] Every FREEFORM tool call is represented as FREEFORM.
- [ ] Every output path is defined in `File Structure`.
- [ ] Every generated artifact has validation.
- [ ] No invented tool appears.
- [ ] No `TBD`, `TODO`, or vague validation language remains.
- [ ] The final output can be produced from the listed inputs.
- [ ] Automatic dispatch to subagent-driven-development happens only after the dry run result is `PASS` and the plan review finishes with no Blocker.

## Issues Found

List issues found during the dry run.

When none:

```text
No issues found.
```

## Fixes Applied

List fixes applied before finalizing the plan.

When none:

```text
No fixes required.
```

## Dry Run Result

Use exactly one:

```text
PASS
FAIL
PASS_WITH_LIMITATIONS
```

## Self-Review

### Tool Compliance

- [ ] The tool catalog was inspected before plan writing.
- [ ] Every tool name used appears in `Tool Catalog Used`.
- [ ] Every atomic step states a tool call above the action.
- [ ] Every JSON-schema tool call uses valid JSON params.
- [ ] Every param matches the fetched tool schema.
- [ ] No invented tool appears in the plan.

### Structure Compliance

- [ ] Plan includes Goal.
- [ ] Plan includes Architecture.
- [ ] Plan includes Tech Stack.
- [ ] Plan includes Description.
- [ ] Plan includes Variables.
- [ ] Plan includes Tool Catalog Used.
- [ ] Each major step includes Description, Variables, Acceptance Criteria, Technical Requirements, Constraints, and Output.
- [ ] Each atomic step includes Tool Call, Action, Acceptance Criteria, input payload, and output payload.

### Variable Flow

- [ ] Every variable is defined before use.
- [ ] Every major step produces a clear output.
- [ ] Outputs from one step become inputs to later steps.
- [ ] Variable names stay consistent throughout the plan.

### Placeholder Scan

- [ ] No `TBD`.
- [ ] No `TODO`.
- [ ] No vague validation language.
- [ ] No generic tool names.
- [ ] No missing params.
- [ ] No reference to an undefined file, variable, tool, function, or schema.

### Spec Coverage

- [ ] Every requirement in the source request maps to at least one step.
- [ ] Every REQ ID from the source spec maps to at least one step and one acceptance criterion.
- [ ] Every acceptance criterion meets the seven requirement characteristics: Unique and Atomic, Concise, Testable, Unambiguous, Correct and Complete, Consistent, Feasible.
- [ ] Every expected artifact is produced.
- [ ] Every validation requirement is represented.
- [ ] Every tool-dependent action has a tool call.

## Gate Result

The plan ends here. Do not add a handoff block or an execution-mode menu. Record one line:

```text
Gate: dry run <PASS | PASS_WITH_LIMITATIONS | FAIL>; review <finished | failed | not run>; Blockers <count>; automatic dispatch <yes | no: reason>
```

The create-plan skill reads this line. Automatic dispatch happens only for `PASS`, a finished review, and zero Blockers.