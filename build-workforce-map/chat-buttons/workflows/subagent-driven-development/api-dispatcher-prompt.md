# API Dispatcher Prompt Template

Use this template when dispatching tasks via the Anthropic Messages API instead of subagents.

## Setup

```bash
# Load API key
export ANTHROPIC_API_KEY=$(cat /mnt/skills/user/treyagent/claude_desktop_config.json | python3 -c "import sys,json; print(json.load(sys.stdin)['mcpServers']['anthropic']['env']['ANTHROPIC_API_KEY'])")
```

## Generic API Dispatch Function

```bash
# Write prompt to file, call API, extract text response
api_dispatch() {
  local prompt_file="$1"
  local model="${2:-claude-sonnet-4-20250514}"
  local max_tokens="${3:-8192}"

  curl -s https://api.anthropic.com/v1/messages \
    -H "Content-Type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d "$(python3 -c "
import json
prompt = open('$prompt_file').read()
print(json.dumps({
    'model': '$model',
    'max_tokens': $max_tokens,
    'messages': [{'role': 'user', 'content': prompt}]
}))
")" | python3 -c "
import json, sys
resp = json.load(sys.stdin)
for block in resp.get('content', []):
    if block.get('type') == 'text':
        print(block['text'])
"
}
```

## Usage: Spec Review via API

```bash
cat > /tmp/spec_review_prompt.txt << 'EOF'
You are reviewing code for spec compliance.

## Task Spec
[Paste full task spec here]

## Code to Review
[Paste the code diff or file contents here]

## Your Job
1. Compare the implementation against every requirement in the spec
2. Flag anything MISSING (spec requires it, code doesn't have it)
3. Flag anything EXTRA (code has it, spec doesn't require it)
4. Verdict: ✅ Spec compliant OR ❌ Issues found (list each)
EOF

api_dispatch /tmp/spec_review_prompt.txt
```

## Usage: Code Quality Review via API

```bash
cat > /tmp/quality_review_prompt.txt << 'EOF'
You are reviewing code quality.

## Code to Review
[Paste the code diff or file contents here]

## Your Job
Review for: naming clarity, error handling, DRY, edge cases, test coverage.
Rate issues as Critical / Important / Minor.
Verdict: ✅ Approved OR ❌ Issues (list each with severity)
EOF

api_dispatch /tmp/quality_review_prompt.txt
```

## Usage: Implementation Planning via API

Since API mode has no tool access, use it for planning and let the controller execute:

```bash
cat > /tmp/impl_plan_prompt.txt << 'EOF'
You are planning the implementation of a task.

## Task Description
[Full task text]

## Context
[Architecture, dependencies, existing code patterns]

## Your Job
Produce a step-by-step implementation plan with:
1. Files to create/modify (with full paths)
2. Exact code to write (complete, not pseudocode)
3. Test cases to add
4. Commands to run for verification

Be precise — the controller will execute your plan verbatim.
EOF

api_dispatch /tmp/impl_plan_prompt.txt
```

## Model Selection Guide

| Task | Recommended Model | Why |
|------|------------------|-----|
| Spec review | claude-sonnet-4-20250514 | Fast, accurate for comparison |
| Code quality review | claude-sonnet-4-20250514 | Good balance of speed/depth |
| Implementation planning | claude-sonnet-4-20250514 | Detailed code generation |
| Complex architecture | claude-opus-4-20250514 | Deep reasoning needed |

## Workflow: Full Task Cycle via API

```
1. Write implementer prompt → /tmp/task_N_impl.txt
2. api_dispatch /tmp/task_N_impl.txt → get implementation plan
3. Controller executes the plan (creates files, runs tests)
4. Write spec review prompt with code → /tmp/task_N_spec.txt
5. api_dispatch /tmp/task_N_spec.txt → get spec verdict
6. If ❌: fix issues, re-review (loop)
7. Write quality review prompt → /tmp/task_N_quality.txt
8. api_dispatch /tmp/task_N_quality.txt → get quality verdict
9. If ❌: fix issues, re-review (loop)
10. Mark task complete
```
