---
name: "dispatch-chat-to-code"
description: "Use when Trey taps Send to Claude or says \"Send to Claude and run it\": package this chat into Master-Agentic-OS and start the Claude Code dispatch routine."
---

# Dispatch chat to Claude Code

## Purpose

This skill sends the current claude.ai chat to Claude Code. It saves the chat as a dispatch package in the GitHub repo treydodson26/Master-Agentic-OS, opens a tracking issue, and starts the receiving routine at once. The routine does the work and reports on the issue.

The repo's own rules for this queue are in `AGENT/README.md` (sections "Dispatch packages", "Claude Code issue-first queue", and "Receiving routine contract"). This skill follows them.

## Fixed values

- Repo: treydodson26/Master-Agentic-OS, branch main
- Package folder: `AGENT/Claude-Code/YYYY/MM/DD/<slug>-<HHMM>/` (New York date and time)
- Labels: `dispatch:claude-code` plus exactly one of `status:ready` or `status:blocked`
- Receiving routine: "Run Claude Code dispatch (Master-Agentic-OS)", trigger ID `trig_01VyZF9bczMBatRH8mG8r1B9`
- First tested: issue #217 on 11/14/2026 (passed)

## Approval rule

- The message "Send to Claude and run it" is Trey's explicit approval to execute. Set `status:ready` and record the message, its New York time, and the chat link as the evidence.
- Any other wording packages the chat only. Set `status:blocked` and name the missing approval. Do not start the routine.
- The approval covers the task in the chat's latest controlling request, not new actions. Write the authorized scope narrowly.

## Steps

1. **Find the task.** Take the controlling task from words after the command. Otherwise take Trey's latest explicit request in the chat. If the scope is unclear, ask one question before writing anything.
2. **Attach and clone.** Call `mcp__claude-code-remote__add_repo` (owner treydodson26, repo Master-Agentic-OS, access push). Clone with depth 1 as the tool says. Register the repo root.
3. **Write transcript.md.** Write every message Trey sent, word for word, in order, with its New York time. Under each one, summarize Claude's reply in one or two lines with links to anything created. Add a table of artifacts the chat created or changed, and a list of open items. State at the top that Claude's replies are summarized and link the chat. Never invent turns. Mark anything missing.
4. **Write handoff.md** for an agent with no context. Include the request in Trey's words, current state, decisions, constraints, the exact next action, acceptance criteria as pass or fail checks, the output destination, and the final report expected.
5. **Commit and push** both files to main in the package folder. Commit message: "Add send-to-claude package: <chat title>". If the push is refused, push to a `claude/` branch and link files on that branch.
6. **Check for a duplicate.** Search open issues with label `dispatch:claude-code` for the same chat link. If one exists, add a comment instead of a new issue.
7. **Create the issue** with `gh api repos/treydodson26/Master-Agentic-OS/issues` (REST only; GraphQL is blocked). Title: "[Claude Code] <task in under 10 words>". Body sections, in this order: Task, Context package (Transcript and Handoff links at the commit), Acceptance criteria, Output destination, Dependencies, Authorization (Execution authorization, Authorization evidence, Authorized scope). Apply the labels from the approval rule.
8. **Start the routine** only when the issue has `status:ready`. Call `mcp__claude-code-remote__fire_trigger` with trigger ID `trig_01VyZF9bczMBatRH8mG8r1B9` and text "Dispatch issue: treydodson26/Master-Agentic-OS#<NUMBER>".
9. **Confirm pickup.** Poll the issue every 30 seconds for up to 3 minutes. Pickup is confirmed when the label changes to `status:in-progress` or a "Claude Code receipt" comment appears. Do not wait for the work to finish.
10. **Report.** Give Trey the issue link, the transcript and handoff links, the label you saw last, and the routine session link if known. Then follow Trey's response protocol and activity log rules.

## Rules

- Never put secrets, tokens, or credentials in the package or the issue.
- Never start the routine for a `status:blocked` issue.
- Never claim Claude Code finished the work. Report only what the issue shows.
- If any step fails, stop, keep what was written, and report the exact failed step and the retry action.
- treydodson26/daily-chats is archived. Never send there.