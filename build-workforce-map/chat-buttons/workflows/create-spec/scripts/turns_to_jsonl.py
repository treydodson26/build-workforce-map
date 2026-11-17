#!/usr/bin/env python3
"""Convert chat turns into the role-labeled JSONL the NLTK parser reads.

Input: turns.json, either a list of turns or {"title": ..., "turns": [...]}.
Each turn has "speaker" (Human or Assistant) and "text".
Output: one line per turn, {"role": "user"|"assistant", "content": <text>}.
Empty turns are kept as empty content so the turn count stays visible.

Usage: python turns_to_jsonl.py turns.json chat.jsonl
"""
import json, sys

src, dst = sys.argv[1], sys.argv[2]
data = json.load(open(src, encoding="utf-8"))
turns = data["turns"] if isinstance(data, dict) else data
with open(dst, "w", encoding="utf-8") as fh:
    for t in turns:
        role = "user" if str(t.get("speaker", "")).lower() in {"human", "user"} else "assistant"
        fh.write(json.dumps({"role": role, "content": t.get("text", "")}, ensure_ascii=False) + "\n")
users = sum(1 for t in turns if str(t.get("speaker", "")).lower() in {"human", "user"})
print(f"Wrote {len(turns)} turns ({users} user, {len(turns) - users} assistant) to {dst}")
