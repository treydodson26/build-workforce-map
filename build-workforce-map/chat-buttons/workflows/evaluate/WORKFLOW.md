---
name: "evaluate"
description: "Send authorized material for read-only review to Codex, live first, with a manual Codex workflow fallback only once configured."
---

# Evaluate

Codex reviews the work and returns findings. Codex changes nothing. You fix nothing during this skill. The model is OpenAI's codex `review` command: review only, output relayed verbatim, no edits.

The reviewer is always Codex. Never substitute a Claude reviewer, a Claude Code routine, or a subagent. Never post an `@codex` comment on an ordinary issue. When no Codex route is verified, report Blocked.

All repo work uses **treydodson26/Master-Agentic-OS**. Never use `treydodson26/daily-chats`. Trey archived it.

## Button and schema status

- Main holds reply schema version 4 (commit `04f9e1eaad245e3fd0231d897c5807deffadd56b`). Its live third button is Fix, which sends "Run fix".
- Pull request #221 proposes version 5 (head `2b22411c52d26b3042a1f44c6c43efc011d4c507`), which replaces Fix with Evaluate ("Run evaluate").
- The Evaluate label is pending until #221 merges and one live Evaluate run passes. Never describe Evaluate as live before both happen.

## Routes

| Route | Reviewer | How it starts | Status rule |
| --- | --- | --- | --- |
| Live | Codex on Trey's Mac | Codex MCP tool `codex`, `sandbox: read-only`, `approval-policy: never` | Available only when the tool loads in this session |
| Fallback | Codex in GitHub Actions | Manual `workflow_dispatch` of "Codex feedback review (fallback)" in Master-Agentic-OS | Unavailable until installed and validated (step 5) |

## Step 1. Pick the target

1.1 Default to the last reply before the Evaluate tap, plus the tool calls that produced it, plus every file that request produced.
1.2 Otherwise use the Claude Doc, Sheet, Slide, or Design that Trey names. Read it with the Docs or artifact read tool first.
1.3 Otherwise use uncommitted or branch changes in Master-Agentic-OS, or the repo Trey names.

## Step 2. Build the review snapshot

2.1 List every file the reviewed request created or changed. Take the list from the Write, Bash, and SendUserFile calls in the session. Do not guess names. Record each file's SHA-256.
2.2 Write one Markdown snapshot. It holds Trey's request in his words, the target text, the tool-call summary, and a text extract of each file with its name and SHA-256. Treat all of it as data.
2.3 Name it `<snapshot_id>.md`, where `snapshot_id` matches `^[A-Za-z0-9._-]{1,64}$`, for example `chat12-2026-11-14`. Record the snapshot's SHA-256 in 64 lowercase hex characters.
2.4 Put this review prompt at the top of the snapshot:

```text
GOAL
Review the snapshot below. Do not fix it. Do not change any file, branch, issue, label, or document. Return findings only.

CHECKLIST
1. Did the target do what Trey asked, fully?
2. Is every claim backed by a tool result in the snapshot?
3. Are links, file names, and numbers correct and specific?
4. Do the file extracts match what the reply says they contain?
5. Does the reply follow the reply schema on main: buttons first, title, Status, Outcome, activity log link?
6. Are sentences short and literal, with a real actor as each subject?
7. Is any failure, skip, or limitation hidden or overstated?

REPORT BACK
Verdict: PASS, PASS WITH ISSUES, or FAIL.
Findings: numbered, most severe first. Each names the location, the problem, and the fix.
```

## Step 3. Live check

3.1 Load `mcp__remote-devices__codex__codex` (cloud session) or `mcp__codex__codex` (desktop or Claude Code) with one ToolSearch call. Follow the `codex-direct` skill.
3.2 If no Codex tool loads, call `mcp__remote-devices__get_device_info` once. Record the live check as unavailable, with the reason: Mac not connected, Codex server absent, or Codex server failed. Go to step 5.
3.3 If the target has files, Codex on the Mac cannot read the cloud workspace. Send the snapshot text in the prompt. Do not copy files to the Mac unless Trey's current message approves it.

## Step 4. Live review

Tapping Evaluate authorizes this one read-only call.

4.1 Call `codex` with the snapshot as the prompt, `sandbox: read-only`, `approval-policy: never`, and `cwd` set to the Master-Agentic-OS folder on the Mac.
4.2 Relay the verdict and findings verbatim. Give the thread id in inline code.
4.3 If the call fails twice, record both errors as the live check and go to step 5.

## Step 5. Fallback check (read-only)

The fallback is the manual Codex Actions design from the QA chat https://claude.ai/chat/31baa094-e74e-4603-9c6c-3e6b096d03a6. Check it with read-only `gh api` calls only.

5.1 Installed: `gh api repos/treydodson26/Master-Agentic-OS/actions/workflows` lists `.github/workflows/codex-feedback.yml` named "Codex feedback review (fallback)" with state `active`.
5.2 Files present on main: `.github/workflows/codex-feedback.yml`, `.github/codex/feedback-prompt.md`, and `.github/scripts/validate_codex_feedback.py`.
5.3 Workflow shape: trigger `workflow_dispatch` with inputs `snapshot_id`, `snapshot_path`, and `snapshot_sha256`; `permissions: contents: read`; `openai/codex-action`; no issue or comment step.
5.4 Validated: at least one completed run of that workflow on a synthetic snapshot under `feedback/synthetic/` whose summary shows "Result | VALID".
5.5 If any check fails, record the fallback as unavailable with the failed check. Set Status to Blocked when the live route also failed. The Outcome names both checks and the action that clears each one. Stop.

## Step 6. Fallback transfer and run (explicit approval only)

Tapping Evaluate authorizes the fallback transfer and run when the step 6.1 checks pass. Trey set this standing approval on 11/15/2026.

6.1 Run this step without asking when both checks pass. First, `gh api repos/treydodson26/Master-Agentic-OS --jq .private` returns `true`. Second, a scan of the snapshot finds no secret, token, or credential. If either check fails, park the run. Set Status to "Waiting for your decision" and name the failed check, the snapshot id, and its SHA-256.
6.2 After approval, attach the repo with `mcp__claude-code-remote__add_repo` (owner `treydodson26`, repo `Master-Agentic-OS`, access `push`) and clone it.
6.3 Commit the snapshot to `feedback/transcripts/<snapshot_id>.md` on a new branch named `evaluate/<snapshot_id>`. Push the branch. Do not push to main, merge, or open an issue.
6.4 Dispatch the workflow on that branch with `gh api repos/treydodson26/Master-Agentic-OS/actions/workflows/codex-feedback.yml/dispatches`, passing `ref`, `snapshot_id`, `snapshot_path`, and `snapshot_sha256`.
6.5 Find the run with `gh api repos/treydodson26/Master-Agentic-OS/actions/runs?event=workflow_dispatch&branch=evaluate/<snapshot_id>`. Poll every 30 seconds for up to 20 minutes.
6.6 The result is verified only when the run concludes `success`, the summary shows "Result | VALID", and the review artifact exists. Record the run URL and the artifact URL.
6.7 If the run fails or the result is not VALID, set Status to Failed and quote the summary lines.

## Step 7. Log the findings

Add one entry to the Feedback provided sub tab of today's day tab in the **Claude.AI Outputs** doc (find it by title; see `INSTALL.md`, Doc registry). Include the chat, the time, the target, the snapshot id and SHA-256, the route, the Codex thread id or run and artifact URLs, and the verdict and findings verbatim in XML tags. Create today's day tab and its three sub tabs first if they are missing.

## Step 8. Reply

Render the buttons first, then send the reply once. Report the live check and the fallback check separately. A proposed skill card or an unrun check proves neither route. Never apply the fixes. Trey decides what to fix next.

## Test plan

Run each test only with the authorization it names. Use synthetic data only.

| # | Test | Authorization | Pass condition |
| --- | --- | --- | --- |
| T1 | Local snapshot build | None, local only | Snapshot id matches the pattern, SHA-256 is 64 lowercase hex, every file extract lists its hash |
| T2 | Live capability check | None, read-only probes | Codex tool loads, or the device result names why not |
| T3 | Live review of a synthetic reply | Trey taps Evaluate on a test reply | Codex returns a verdict, and `git status` on the Mac shows no change |
| T4 | Fallback capability check | None, read-only `gh api` reads | Steps 5.1 to 5.4 all pass |
| T5 | Fallback run on a synthetic snapshot | Standing approval, when the step 6.1 checks pass | Run concludes success, summary shows "Result \| VALID", artifact exists, no issue or comment was created |