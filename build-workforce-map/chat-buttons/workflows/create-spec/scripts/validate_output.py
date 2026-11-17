#!/usr/bin/env python3
"""Validate an evidence-first transcript parse JSON file."""
from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path


def sha256_text(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("parse_json")
    parser.add_argument("--schema", default=None)
    args = parser.parse_args()

    parse_path = Path(args.parse_json).expanduser().resolve()
    data = json.loads(parse_path.read_text(encoding="utf-8"))
    errors: list[str] = []
    warnings: list[str] = []

    schema_path = Path(args.schema).expanduser().resolve() if args.schema else Path(__file__).resolve().parents[1] / "references" / "transcript-parse.schema.json"
    try:
        import jsonschema
        schema = json.loads(schema_path.read_text(encoding="utf-8"))
        jsonschema.Draft202012Validator(schema).validate(data)
    except ImportError:
        warnings.append("jsonschema is not installed; structural schema validation was skipped.")
    except Exception as exc:
        errors.append(f"JSON Schema validation failed: {exc}")

    message_ids = [item["message_id"] for item in data.get("messages", [])]
    unit_ids = [item["unit_id"] for item in data.get("units", [])]
    if len(message_ids) != len(set(message_ids)):
        errors.append("Duplicate message IDs.")
    if len(unit_ids) != len(set(unit_ids)):
        errors.append("Duplicate unit IDs.")
    known_messages = set(message_ids)
    for unit in data.get("units", []):
        if unit.get("message_id") not in known_messages:
            errors.append(f"{unit.get('unit_id')} references an unknown message.")
        if sha256_text(unit.get("text", "")) != unit.get("source", {}).get("quote_hash"):
            errors.append(f"{unit.get('unit_id')} has an invalid quote hash.")

    metrics = data.get("metrics", {})
    if metrics.get("message_count") != len(message_ids):
        errors.append("message_count does not match messages length.")
    if metrics.get("unit_count") != len(unit_ids):
        errors.append("unit_count does not match units length.")

    status = "fail" if errors else "pass_with_warnings" if warnings else "pass"
    print(json.dumps({"status": status, "errors": errors, "warnings": warnings}, indent=2))
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
