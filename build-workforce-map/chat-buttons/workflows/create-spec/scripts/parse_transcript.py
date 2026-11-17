#!/usr/bin/env python3
"""Evidence-first transcript parser.

Parses chat, meeting, interview, support, research, and coding transcripts into
source-addressable messages, sentence/structural units, deterministic findings,
and a chronological Markdown report.

The parser uses NLTK tokenizers that do not require downloaded corpora:
PunktSentenceTokenizer and WordPunctTokenizer.
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import html
import json
import os
import re
import shutil
import sys
import textwrap
import zipfile
from collections import Counter, defaultdict
from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from typing import Any, Iterable, Iterator, Optional

try:
    import nltk
    from nltk.stem import PorterStemmer
    from nltk.tokenize import PunktSentenceTokenizer, WordPunctTokenizer
except ImportError as exc:  # pragma: no cover - explicit runtime error
    raise SystemExit("NLTK is required. Install with: pip install 'nltk>=3.9,<4'") from exc

PARSER_VERSION = "1.0.0"
SUPPORTED_SUFFIXES = {
    ".txt", ".md", ".log", ".text", ".json", ".jsonl", ".csv",
    ".html", ".htm", ".srt", ".vtt", ".docx", ".pdf",
}

# A compact built-in list avoids nltk.download('stopwords').
STOPWORDS = {
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "as",
    "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can",
    "could", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", "further",
    "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him", "himself", "his",
    "how", "i", "if", "in", "into", "is", "it", "its", "itself", "just", "me", "more", "most", "my",
    "myself", "no", "nor", "not", "now", "of", "off", "on", "once", "only", "or", "other", "our",
    "ours", "ourselves", "out", "over", "own", "same", "she", "should", "so", "some", "such", "than",
    "that", "the", "their", "theirs", "them", "themselves", "then", "there", "these", "they", "this",
    "those", "through", "to", "too", "under", "until", "up", "very", "was", "we", "were", "what",
    "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "you", "your",
    "yours", "yourself", "yourselves", "yeah", "okay", "ok", "like", "really", "also", "use", "using",
}

ROLE_ALIASES = {
    "you": "user", "you said": "user", "user": "user", "human": "user", "requester": "user",
    "chatgpt said": "assistant",
    "assistant": "assistant", "chatgpt": "assistant", "claude": "assistant", "perplexity": "assistant",
    "copilot": "assistant", "gemini": "assistant", "ai": "assistant",
    "system": "system", "developer": "system", "tool": "tool", "function": "tool",
}

INTERROGATIVE = re.compile(r"^(?:who|what|when|where|why|how|which|can|could|would|should|is|are|do|does|did|will|may)\b", re.I)
FILE_TOKEN_RE = re.compile(r"\b[\w.-]+\.(?:json|csv|md|docx|pdf|yaml|yml|txt|html|zip|xlsx|pptx|py|js|ts|sh)\b", re.I)
URL_RE = re.compile(r"https?://\S+", re.I)
TIMESTAMP_RE = re.compile(r"^(?P<speaker>[^\t\n]{1,80}?)\s+(?P<time>\d{1,2}:\d{2}(?::\d{2})?)\s*(?P<rest>.*)$")
INLINE_TIMESTAMP_RE = re.compile(r"^\[?(?P<time>\d{1,2}:\d{2}(?::\d{2})?)\]?\s+(?P<speaker>[^:]{1,80}):\s*(?P<rest>.*)$")
ROLE_LINE_RE = re.compile(
    r"^(?:[*_]{1,3})?"
    r"(?P<label>You said|ChatGPT said|User|Human|Requester|Assistant|ChatGPT|Claude|Perplexity|Copilot|Gemini|AI|System|Developer|Tool|Function)"
    r"(?:\s*\([^)]*\))?\s*(?::\s*[*_]{1,3}|[*_]{1,3}\s*:|:)\s*(?P<rest>.*)$", re.I
)
SPEAKER_COLON_RE = re.compile(r"^(?P<speaker>[A-Z][A-Za-z0-9 ._'-]{0,60}|Speaker\s+\d+)\s*:\s*(?P<rest>.+)$")


@dataclass
class SourceLine:
    number: int
    text: str
    char_start: int
    char_end: int


@dataclass
class LoadedSource:
    original_path: str
    suffix: str
    original_sha256: str
    original_bytes: int
    extracted_text: str
    extraction_basis: str
    structured_messages: list[dict[str, Any]] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)


@dataclass
class Message:
    message_id: str
    sequence: int
    role: str
    speaker: str
    text: str
    timestamp: Optional[str]
    source_line_start: int
    source_line_end: int
    source_char_start: int
    source_char_end: int
    source_hash: str
    platform: str
    line_map: list[dict[str, int]] = field(default_factory=list, repr=False)


class PlainTextHTMLParser(HTMLParser):
    BLOCK_TAGS = {
        "p", "div", "section", "article", "header", "footer", "li", "tr", "br",
        "h1", "h2", "h3", "h4", "h5", "h6", "pre", "blockquote",
    }

    def __init__(self) -> None:
        super().__init__()
        self.parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, Optional[str]]]) -> None:
        if tag.lower() in self.BLOCK_TAGS:
            self.parts.append("\n")

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() in self.BLOCK_TAGS:
            self.parts.append("\n")

    def handle_data(self, data: str) -> None:
        self.parts.append(data)

    def text(self) -> str:
        raw = html.unescape("".join(self.parts))
        raw = re.sub(r"[ \t]+\n", "\n", raw)
        raw = re.sub(r"\n{3,}", "\n\n", raw)
        return raw.strip() + "\n"


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_text(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def decode_text(data: bytes) -> tuple[str, Optional[str]]:
    for encoding in ("utf-8-sig", "utf-8", "cp1252", "latin-1"):
        try:
            text = data.decode(encoding)
            warning = None if encoding in {"utf-8-sig", "utf-8"} else f"Decoded source using {encoding}."
            return text, warning
        except UnicodeDecodeError:
            continue
    return data.decode("utf-8", errors="replace"), "Invalid bytes were replaced during UTF-8 decoding."


def flatten_content(value: Any) -> str:
    if value is None:
        return ""
    if isinstance(value, str):
        return value
    if isinstance(value, (int, float, bool)):
        return str(value)
    if isinstance(value, list):
        parts = [flatten_content(item) for item in value]
        return "\n".join(part for part in parts if part)
    if isinstance(value, dict):
        for key in ("text", "content", "body", "message", "value", "output_text"):
            if key in value:
                candidate = flatten_content(value[key])
                if candidate:
                    return candidate
        return json.dumps(value, ensure_ascii=False, sort_keys=True)
    return str(value)


def find_message_objects(value: Any) -> list[dict[str, Any]]:
    """Find common role/content message objects without assuming one export schema."""
    results: list[dict[str, Any]] = []

    def walk(node: Any) -> None:
        if isinstance(node, dict):
            role_key = next((k for k in ("role", "author", "speaker", "sender", "from", "name") if k in node), None)
            content_key = next((k for k in ("content", "text", "message", "body", "value", "output_text") if k in node), None)
            if role_key and content_key:
                role_value = node[role_key]
                if isinstance(role_value, dict):
                    role_value = role_value.get("role") or role_value.get("name") or role_value.get("display_name") or "unknown"
                content = flatten_content(node[content_key]).strip()
                if content:
                    results.append({
                        "role": str(role_value),
                        "speaker": str(role_value),
                        "content": content,
                        "timestamp": node.get("timestamp") or node.get("created_at") or node.get("time"),
                    })
                    return
            for child in node.values():
                walk(child)
        elif isinstance(node, list):
            for child in node:
                walk(child)

    walk(value)
    return results


def load_source(path: Path) -> LoadedSource:
    if not path.exists() or not path.is_file():
        raise FileNotFoundError(f"Input file does not exist: {path}")
    suffix = path.suffix.lower()
    if suffix not in SUPPORTED_SUFFIXES:
        raise ValueError(f"Unsupported transcript format {suffix!r}. Supported: {', '.join(sorted(SUPPORTED_SUFFIXES))}")
    raw = path.read_bytes()
    warnings: list[str] = []
    structured: list[dict[str, Any]] = []

    if suffix in {".txt", ".md", ".log", ".text", ".srt", ".vtt"}:
        text, warning = decode_text(raw)
        if warning:
            warnings.append(warning)
        basis = "raw_text"
    elif suffix in {".html", ".htm"}:
        decoded, warning = decode_text(raw)
        if warning:
            warnings.append(warning)
        parser = PlainTextHTMLParser()
        parser.feed(decoded)
        text = parser.text()
        basis = "html_text_extraction"
        warnings.append("Source locations refer to extracted HTML text, not raw HTML byte offsets.")
    elif suffix in {".json", ".jsonl"}:
        decoded, warning = decode_text(raw)
        if warning:
            warnings.append(warning)
        objects: list[Any] = []
        if suffix == ".jsonl":
            for idx, line in enumerate(decoded.splitlines(), 1):
                if not line.strip():
                    continue
                try:
                    objects.append(json.loads(line))
                except json.JSONDecodeError as exc:
                    warnings.append(f"JSONL line {idx} could not be parsed: {exc}")
        else:
            objects.append(json.loads(decoded))
        for obj in objects:
            structured.extend(find_message_objects(obj))
        if structured:
            text = "\n\n".join(f"{item['role']}: {item['content']}" for item in structured) + "\n"
            basis = "structured_json_messages"
            warnings.append("Source locations refer to a canonical message projection of the JSON export.")
        else:
            text = decoded
            basis = "raw_json_text"
            warnings.append("No common role/content message objects were found; JSON was parsed as plain text.")
    elif suffix == ".csv":
        decoded, warning = decode_text(raw)
        if warning:
            warnings.append(warning)
        reader = csv.DictReader(decoded.splitlines())
        fieldnames = [name or "" for name in (reader.fieldnames or [])]
        lower_map = {name.lower().strip(): name for name in fieldnames}
        role_col = next((lower_map[k] for k in ("role", "speaker", "author", "sender", "from", "name") if k in lower_map), None)
        text_col = next((lower_map[k] for k in ("content", "text", "message", "body", "utterance") if k in lower_map), None)
        time_col = next((lower_map[k] for k in ("timestamp", "time", "start_time") if k in lower_map), None)
        if role_col and text_col:
            for row in reader:
                content = (row.get(text_col) or "").strip()
                if content:
                    structured.append({
                        "role": row.get(role_col) or "unknown",
                        "speaker": row.get(role_col) or "unknown",
                        "content": content,
                        "timestamp": row.get(time_col) if time_col else None,
                    })
            text = "\n\n".join(f"{item['role']}: {item['content']}" for item in structured) + "\n"
            basis = "structured_csv_messages"
            warnings.append("Source locations refer to a canonical message projection of CSV rows.")
        else:
            text = decoded
            basis = "raw_csv_text"
            warnings.append("CSV lacked recognizable speaker and text columns; parsed as plain text.")
    elif suffix == ".docx":
        try:
            from docx import Document
        except ImportError as exc:
            raise RuntimeError("python-docx is required for .docx input") from exc
        doc = Document(str(path))
        chunks: list[str] = []
        for paragraph in doc.paragraphs:
            chunks.append(paragraph.text)
        for table in doc.tables:
            for row in table.rows:
                chunks.append("\t".join(cell.text for cell in row.cells))
        text = "\n".join(chunks).strip() + "\n"
        basis = "docx_text_extraction"
        warnings.append("Source locations refer to extracted DOCX paragraphs and table rows, not OOXML addresses.")
    elif suffix == ".pdf":
        try:
            from pypdf import PdfReader
        except ImportError as exc:
            raise RuntimeError("pypdf is required for .pdf input") from exc
        reader = PdfReader(str(path))
        pages: list[str] = []
        for number, page in enumerate(reader.pages, 1):
            page_text = page.extract_text() or ""
            pages.append(f"[PAGE {number}]\n{page_text}")
        text = "\n\n".join(pages).strip() + "\n"
        basis = "pdf_text_extraction"
        warnings.append("Source locations refer to extracted PDF text. Scanned PDFs require OCR before parsing.")
    else:  # pragma: no cover - suffix set is exhaustive
        raise AssertionError(suffix)

    return LoadedSource(
        original_path=str(path.resolve()),
        suffix=suffix,
        original_sha256=sha256_bytes(raw),
        original_bytes=len(raw),
        extracted_text=text.replace("\r\n", "\n").replace("\r", "\n"),
        extraction_basis=basis,
        structured_messages=structured,
        warnings=warnings,
    )


def build_source_lines(text: str) -> list[SourceLine]:
    lines: list[SourceLine] = []
    cursor = 0
    split = text.splitlines(keepends=True)
    if not split and text == "":
        return []
    for idx, raw_line in enumerate(split, 1):
        content = raw_line[:-1] if raw_line.endswith("\n") else raw_line
        lines.append(SourceLine(idx, content, cursor, cursor + len(content)))
        cursor += len(raw_line)
    if text and not split:
        lines.append(SourceLine(1, text, 0, len(text)))
    return lines


def normalize_role(label: str) -> tuple[str, str]:
    clean = re.sub(r"\s+", " ", label.strip())
    alias = ROLE_ALIASES.get(clean.lower())
    if alias:
        return alias, clean
    if re.fullmatch(r"Speaker\s+\d+", clean, re.I):
        return "participant", clean
    return "participant", clean or "Unknown"


def platform_scores(text: str, suffix: str, structured_messages: list[dict[str, Any]]) -> dict[str, int]:
    scores = defaultdict(int)
    if structured_messages:
        scores["structured_export"] += 6
    if re.search(r"^Profile avatar$", text, re.M):
        scores["perplexity"] += 4
    if re.search(r"^Completed\s+\d+\s+steps?$", text, re.M):
        scores["perplexity"] += 4
    if re.search(r"^Prepared using ", text, re.M):
        scores["perplexity"] += 4
    if "r2cdn.perplexity.ai" in text:
        scores["perplexity_markdown"] += 8
    if re.search(r"\[\^\d+_\d+\]", text) and re.search(r"^# ", text, re.M):
        scores["perplexity_markdown"] += 4
    if re.search(r"^(?:[*_]{1,3})?(?:You said|ChatGPT said)(?:[*_]{1,3})?\s*:|^(?:You said|ChatGPT said):", text, re.M | re.I):
        scores["chatgpt"] += 6
    if re.search(r"^(?:[*_]{1,3})?(?:Human|Assistant|User)(?:\s*[*_]{1,3})?\s*:", text, re.M | re.I):
        scores["claude"] += 5
    if len(re.findall(r"^(?:Speaker\s+\d+|[^\n]{1,50})\s+\d{1,2}:\d{2}(?::\d{2})?", text, re.M)) >= 2:
        scores["meeting_transcript"] += 7
    if suffix in {".srt", ".vtt"}:
        scores["caption_transcript"] += 8
    if re.search(r"^(?:system|tool|function):", text, re.M | re.I):
        scores["coding_or_agent_session"] += 3
    if not scores:
        scores["generic_transcript"] = 1
    return dict(scores)


def detect_platform(text: str, suffix: str, structured_messages: list[dict[str, Any]]) -> tuple[str, dict[str, int]]:
    scores = platform_scores(text, suffix, structured_messages)
    platform = max(scores.items(), key=lambda item: item[1])[0]
    return platform, scores


def build_message(
    records: list[SourceLine],
    role: str,
    speaker: str,
    sequence: int,
    platform: str,
    timestamp: Optional[str] = None,
) -> Optional[Message]:
    # Remove only outer blank lines; preserve internal structure.
    while records and not records[0].text.strip():
        records = records[1:]
    while records and not records[-1].text.strip():
        records = records[:-1]
    if not records:
        return None
    parts: list[str] = []
    line_map: list[dict[str, int]] = []
    local_cursor = 0
    for idx, record in enumerate(records):
        if idx:
            parts.append("\n")
            local_cursor += 1
        line_map.append({
            "local_start": local_cursor,
            "local_end": local_cursor + len(record.text),
            "source_line": record.number,
            "source_char_start": record.char_start,
            "source_char_end": record.char_end,
        })
        parts.append(record.text)
        local_cursor += len(record.text)
    text = "".join(parts).strip("\n")
    if not text.strip():
        return None
    # Rebuild line map if stripping changed only leading/trailing newlines; records were trimmed so normally unchanged.
    return Message(
        message_id=f"MSG-{sequence:04d}",
        sequence=sequence,
        role=role,
        speaker=speaker,
        text=text,
        timestamp=timestamp,
        source_line_start=records[0].number,
        source_line_end=records[-1].number,
        source_char_start=records[0].char_start,
        source_char_end=records[-1].char_end,
        source_hash=sha256_text(text),
        platform=platform,
        line_map=line_map,
    )


def parse_perplexity(lines: list[SourceLine], platform: str) -> tuple[list[Message], dict[str, Any], set[int]]:
    messages: list[Message] = []
    accounted: set[int] = set()
    user_buffer: list[SourceLine] = []
    assistant_buffer: list[SourceLine] = []
    footer_mode: Optional[str] = None
    followups: list[str] = []
    sources: list[str] = []
    state = "user"
    user_paragraph_closed = False

    exact_noise = {"Profile avatar"}
    assistant_openers = re.compile(
        r"^(?:yes\b|no\b|provide\b|here\b|there\b|use\b|treat\b|the\b|this\b|to\b|create\b|start\b|first\b)",
        re.I,
    )
    for line in lines:
        stripped = line.text.strip()
        if footer_mode:
            accounted.add(line.number)
            if stripped == "Sources":
                footer_mode = "sources"
                continue
            if not stripped:
                continue
            if footer_mode == "followups":
                followups.append(stripped)
            else:
                sources.append(stripped)
            continue
        if stripped in exact_noise:
            accounted.add(line.number)
            continue
        if stripped == "Follow-ups" and state == "user" and not user_buffer:
            footer_mode = "followups"
            accounted.add(line.number)
            continue
        if re.fullmatch(r"Completed\s+\d+\s+steps?", stripped):
            accounted.add(line.number)
            msg = build_message(user_buffer, "user", "User", len(messages) + 1, platform)
            if msg:
                messages.append(msg)
                accounted.update(record.number for record in user_buffer)
            user_buffer = []
            user_paragraph_closed = False
            state = "assistant"
            continue
        if re.match(r"Prepared using ", stripped):
            accounted.add(line.number)
            msg = build_message(assistant_buffer, "assistant", "Perplexity", len(messages) + 1, platform)
            if msg:
                messages.append(msg)
                accounted.update(record.number for record in assistant_buffer)
            assistant_buffer = []
            user_paragraph_closed = False
            state = "user"
            continue
        if state == "user":
            # Some Perplexity copies omit the "Completed N steps" boundary. In that
            # case, a one-paragraph user prompt is followed by a blank line and an
            # assistant-style opening. Preserve multi-paragraph prompts unless the
            # first paragraph is clearly question/request shaped.
            if not stripped and any(r.text.strip() for r in user_buffer):
                user_paragraph_closed = True
                user_buffer.append(line)
                continue
            if stripped and user_paragraph_closed and user_buffer:
                prompt_text = "\n".join(r.text for r in user_buffer).strip()
                prompt_shaped = prompt_text.endswith("?") or bool(re.search(r"\b(?:i want|can you|could you|please|so i|what|how|why|where|when)\b", prompt_text, re.I))
                if prompt_shaped and assistant_openers.search(stripped):
                    msg = build_message(user_buffer, "user", "User", len(messages) + 1, platform)
                    if msg:
                        messages.append(msg)
                        accounted.update(record.number for record in user_buffer)
                    user_buffer = []
                    user_paragraph_closed = False
                    state = "assistant"
                    assistant_buffer.append(line)
                    continue
                user_paragraph_closed = False
            user_buffer.append(line)
        else:
            assistant_buffer.append(line)

    # Flush only meaningful content. The final footer often follows the last Prepared marker.
    msg = build_message(assistant_buffer, "assistant", "Perplexity", len(messages) + 1, platform)
    if msg:
        messages.append(msg)
        accounted.update(record.number for record in assistant_buffer)
    msg = build_message(user_buffer, "user", "User", len(messages) + 1, platform)
    if msg:
        messages.append(msg)
        accounted.update(record.number for record in user_buffer)

    metadata = {"suggested_followups": followups, "source_result_labels": sources}
    return messages, metadata, accounted


def parse_srt_vtt(lines: list[SourceLine], platform: str) -> tuple[list[Message], dict[str, Any], set[int]]:
    messages: list[Message] = []
    accounted: set[int] = set()
    block: list[SourceLine] = []

    def flush(records: list[SourceLine]) -> None:
        nonlocal messages
        clean = [r for r in records if r.text.strip() and not re.fullmatch(r"\d+", r.text.strip())]
        if not clean:
            return
        time_record = next((r for r in clean if "-->" in r.text), None)
        timestamp = time_record.text.strip() if time_record else None
        content = [r for r in clean if r is not time_record]
        if not content:
            return
        speaker = "Unknown speaker"
        role = "participant"
        first = content[0]
        m = re.match(r"(?:<v\s+([^>]+)>|([^:]{1,60}):\s*)(.*)", first.text)
        if m:
            name = m.group(1) or m.group(2)
            rest = m.group(3)
            speaker = name.strip()
            content = [SourceLine(first.number, rest, first.char_start + first.text.find(rest), first.char_start + first.text.find(rest) + len(rest))] + content[1:]
        msg = build_message(content, role, speaker, len(messages) + 1, platform, timestamp)
        if msg:
            messages.append(msg)
            accounted.update(r.number for r in records)

    for line in lines:
        if line.text.strip().upper() == "WEBVTT":
            accounted.add(line.number)
            continue
        if not line.text.strip():
            flush(block)
            block = []
            accounted.add(line.number)
        else:
            block.append(line)
    flush(block)
    return messages, {}, accounted


def parse_role_or_speaker_lines(lines: list[SourceLine], platform: str, roles_only: bool = False) -> tuple[list[Message], dict[str, Any], set[int]]:
    messages: list[Message] = []
    accounted: set[int] = set()
    current_records: list[SourceLine] = []
    current_role = "unknown"
    current_speaker = "Unknown"
    current_timestamp: Optional[str] = None
    found_marker = False

    def flush() -> None:
        nonlocal current_records, messages
        msg = build_message(current_records, current_role, current_speaker, len(messages) + 1, platform, current_timestamp)
        if msg:
            messages.append(msg)
            accounted.update(r.number for r in current_records)
        current_records = []

    for line in lines:
        raw = line.text
        stripped = raw.strip()
        role_match = ROLE_LINE_RE.match(stripped)
        if roles_only and role_match and not re.match(r"^(user|assistant|system|tool|developer|function): ", raw):
            role_match = None
        inline_time = INLINE_TIMESTAMP_RE.match(stripped)
        time_match = TIMESTAMP_RE.match(stripped)
        speaker_match = SPEAKER_COLON_RE.match(stripped)

        if role_match:
            found_marker = True
            flush()
            current_role, current_speaker = normalize_role(role_match.group("label"))
            rest = role_match.group("rest")
            current_timestamp = None
            accounted.add(line.number)
            if rest:
                offset = raw.find(rest)
                current_records.append(SourceLine(line.number, rest, line.char_start + offset, line.char_start + offset + len(rest)))
            continue
        if roles_only:
            current_records.append(line)
            continue
        if inline_time:
            found_marker = True
            flush()
            current_role, current_speaker = normalize_role(inline_time.group("speaker"))
            current_timestamp = inline_time.group("time")
            rest = inline_time.group("rest")
            accounted.add(line.number)
            offset = raw.find(rest)
            current_records.append(SourceLine(line.number, rest, line.char_start + offset, line.char_start + offset + len(rest)))
            continue
        if time_match and (re.fullmatch(r"Speaker\s+\d+", time_match.group("speaker"), re.I) or platform == "meeting_transcript"):
            found_marker = True
            flush()
            current_role, current_speaker = normalize_role(time_match.group("speaker"))
            current_timestamp = time_match.group("time")
            rest = time_match.group("rest")
            accounted.add(line.number)
            if rest:
                offset = raw.find(rest)
                current_records.append(SourceLine(line.number, rest, line.char_start + offset, line.char_start + offset + len(rest)))
            continue
        if speaker_match and (found_marker or platform == "meeting_transcript"):
            found_marker = True
            flush()
            current_role, current_speaker = normalize_role(speaker_match.group("speaker"))
            current_timestamp = None
            rest = speaker_match.group("rest")
            accounted.add(line.number)
            offset = raw.find(rest)
            current_records.append(SourceLine(line.number, rest, line.char_start + offset, line.char_start + offset + len(rest)))
            continue
        current_records.append(line)

    flush()
    if found_marker and messages:
        return messages, {}, accounted

    # Fallback: paragraph blocks are retained as unknown-source messages.
    messages = []
    accounted = set()
    block: list[SourceLine] = []
    for line in lines:
        if line.text.strip():
            block.append(line)
        else:
            msg = build_message(block, "unknown", "Unknown", len(messages) + 1, platform)
            if msg:
                messages.append(msg)
                accounted.update(r.number for r in block)
            accounted.add(line.number)
            block = []
    msg = build_message(block, "unknown", "Unknown", len(messages) + 1, platform)
    if msg:
        messages.append(msg)
        accounted.update(r.number for r in block)
    return messages, {}, accounted


def parse_perplexity_markdown(lines: list[SourceLine], platform: str) -> tuple[list[Message], dict[str, Any], set[int]]:
    """Parse Perplexity's "Export as Markdown" format.

    Each user query is an H1 heading outside code fences; the assistant answer is
    everything until the next out-of-fence H1. The logo image header, horizontal
    rules, and centered separator divs are accounted noise. H1 lines inside fenced
    code blocks are quoted content, never turn boundaries. Footnote citation
    definitions stay inside the assistant message so their URLs remain addressable
    evidence.
    """
    messages: list[Message] = []
    accounted: set[int] = set()
    buffer: list[SourceLine] = []
    fence_open = False
    seen_first_heading = False

    def flush_assistant() -> None:
        nonlocal buffer
        msg = build_message(buffer, "assistant", "Perplexity", len(messages) + 1, platform)
        if msg:
            messages.append(msg)
            accounted.update(r.number for r in buffer)
        buffer = []

    for line in lines:
        stripped = line.text.strip()
        if stripped.startswith("```"):
            fence_open = not fence_open
            if seen_first_heading:
                buffer.append(line)
            else:
                accounted.add(line.number)
            continue
        if not fence_open and line.text.startswith("# "):
            flush_assistant()
            seen_first_heading = True
            heading_text = line.text[2:]
            offset = 2
            record = SourceLine(line.number, heading_text, line.char_start + offset, line.char_end)
            msg = build_message([record], "user", "User", len(messages) + 1, platform)
            if msg:
                messages.append(msg)
            accounted.add(line.number)
            continue
        if not seen_first_heading:
            accounted.add(line.number)
            continue
        if not fence_open and (stripped == "---" or (stripped.startswith("<div") and "\u2042" in stripped)):
            accounted.add(line.number)
            continue
        buffer.append(line)
    flush_assistant()
    return messages, {}, accounted


def parse_messages(source: LoadedSource, platform: str) -> tuple[list[Message], dict[str, Any], set[int]]:
    lines = build_source_lines(source.extracted_text)
    if source.structured_messages:
        # Canonical projection already contains role labels. Use the generic role parser for exact projected locations.
        return parse_role_or_speaker_lines(lines, platform, roles_only=True)
    if platform == "perplexity":
        return parse_perplexity(lines, platform)
    if platform == "perplexity_markdown":
        return parse_perplexity_markdown(lines, platform)
    if source.suffix in {".srt", ".vtt"}:
        return parse_srt_vtt(lines, platform)
    return parse_role_or_speaker_lines(lines, platform)


def map_local_position(message: Message, position: int, prefer_end: bool = False) -> tuple[int, int]:
    if not message.line_map:
        return message.source_line_start, message.source_char_start
    for item in message.line_map:
        if item["local_start"] <= position <= item["local_end"]:
            delta = min(max(position - item["local_start"], 0), item["local_end"] - item["local_start"])
            return item["source_line"], item["source_char_start"] + delta
    item = message.line_map[-1] if prefer_end else message.line_map[0]
    return item["source_line"], item["source_char_end"] if prefer_end else item["source_char_start"]


def paragraph_blocks(text: str) -> Iterator[tuple[int, int, str]]:
    # Return non-empty blocks while preserving spans.
    for match in re.finditer(r"(?s)(?:^|(?<=\n\n))\s*(\S.*?\S|\S)(?=\n\n|\Z)", text):
        start, end = match.span(1)
        yield start, end, match.group(1)


def is_heading(block: str) -> bool:
    if "\n" in block:
        return False
    stripped = block.strip()
    words = stripped.split()
    if not stripped or len(words) > 14 or len(stripped) > 120:
        return False
    if stripped.startswith(("-", "*", "•", "1.", "1)")):
        return False
    if stripped.endswith((".", "?", "!", ";")):
        return False
    return bool(re.match(r"^[A-Z0-9]", stripped))


def fenced_regions(text: str) -> list[tuple[int, int]]:
    """Return (start, end) spans of complete fenced code blocks in message text.

    Fences are matched line-wise so blank lines inside a block never fragment it.
    An unclosed trailing fence extends to the end of the text.
    """
    regions: list[tuple[int, int]] = []
    open_start: Optional[int] = None
    cursor = 0
    for line in text.splitlines(keepends=True):
        if line.lstrip().startswith("```"):
            if open_start is None:
                open_start = cursor
            else:
                regions.append((open_start, cursor + len(line.rstrip("\n"))))
                open_start = None
        cursor += len(line)
    if open_start is not None:
        regions.append((open_start, len(text)))
    return regions


def unitize_message(message: Message, sentence_tokenizer: PunktSentenceTokenizer, word_tokenizer: WordPunctTokenizer) -> list[dict[str, Any]]:
    units: list[dict[str, Any]] = []
    sequence = 0

    # Extract complete fenced code blocks first so paragraph splitting on blank
    # lines cannot fragment multi-paragraph code into sentence units.
    code_regions = fenced_regions(message.text)

    def segments() -> Iterator[tuple[int, int, str, Optional[str]]]:
        cursor = 0
        for region_start, region_end in code_regions:
            if region_start > cursor:
                yield cursor, region_start, message.text[cursor:region_start], None
            yield region_start, region_end, message.text[region_start:region_end], "code_block"
            cursor = region_end
        if cursor < len(message.text):
            yield cursor, len(message.text), message.text[cursor:], None

    for seg_start, seg_end, seg_text, forced_type in segments():
        if forced_type == "code_block":
            if seg_text.strip():
                block_iter = [(seg_start, seg_end, seg_text)]
                forced = True
            else:
                continue
        else:
            block_iter = [(seg_start + s, seg_start + e, b) for s, e, b in paragraph_blocks(seg_text)]
            forced = False
        for block_start, block_end, block in block_iter:
            stripped = block.strip()
            lines = block.splitlines()
            spans: list[tuple[int, int, str, str]] = []

            if forced or (stripped.startswith("```") and stripped.endswith("```")):
                spans.append((0, len(block), block, "code_block"))
            elif len(lines) > 1 and all(("\t" in line or (line.count("|") >= 2)) for line in lines if line.strip()):
                cursor = 0
                for line in lines:
                    if line.strip():
                        pos = block.find(line, cursor)
                        spans.append((pos, pos + len(line), line, "table_row"))
                        cursor = pos + len(line)
            elif lines and all(re.match(r"^\s*(?:[-*•]|\d+[.)])\s+", line) for line in lines if line.strip()):
                cursor = 0
                for line in lines:
                    if line.strip():
                        pos = block.find(line, cursor)
                        spans.append((pos, pos + len(line), line, "list_item"))
                        cursor = pos + len(line)
            elif is_heading(block):
                spans.append((0, len(block), block, "heading"))
            else:
                sentence_spans = list(sentence_tokenizer.span_tokenize(block))
                if not sentence_spans:
                    sentence_spans = [(0, len(block))]
                for start, end in sentence_spans:
                    sentence = block[start:end].strip()
                    if not sentence:
                        continue
                    leading = len(block[start:end]) - len(block[start:end].lstrip())
                    trailing = len(block[start:end]) - len(block[start:end].rstrip())
                    spans.append((start + leading, end - trailing, sentence, "sentence"))

            for rel_start, rel_end, text, unit_type in spans:
                sequence += 1
                local_start = block_start + rel_start
                local_end = block_start + rel_end
                line_start, char_start = map_local_position(message, local_start)
                line_end, char_end = map_local_position(message, max(local_end - 1, local_start), prefer_end=True)
                tokens = word_tokenizer.tokenize(text)
                units.append({
                    "unit_id": "",  # assigned globally later
                    "message_unit_sequence": sequence,
                    "message_id": message.message_id,
                    "message_sequence": message.sequence,
                    "role": message.role,
                    "speaker": message.speaker,
                    "timestamp": message.timestamp,
                    "unit_type": unit_type,
                    "text": text,
                    "source": {
                        "line_start": line_start,
                        "line_end": line_end,
                        "char_start": char_start,
                        "char_end": char_end,
                        "message_local_char_start": local_start,
                        "message_local_char_end": local_end,
                        "quote_hash": sha256_text(text),
                    },
                    "metrics": {
                        "token_count": len(tokens),
                        "word_count": sum(1 for tok in tokens if re.search(r"\w", tok)),
                    },
                })
    return units


def load_config(skill_root: Path) -> tuple[dict[str, Any], dict[str, list[str]], dict[str, Any]]:
    noise = json.loads((skill_root / "defaults" / "noise-patterns.json").read_text(encoding="utf-8"))
    patterns = json.loads((skill_root / "defaults" / "classification-patterns.json").read_text(encoding="utf-8"))
    defaults = json.loads((skill_root / "defaults" / "parser-defaults.json").read_text(encoding="utf-8"))
    return noise, patterns, defaults


def classify_unit(unit: dict[str, Any], compiled_patterns: dict[str, list[re.Pattern[str]]]) -> None:
    text = unit["text"].strip()
    lower = text.lower()
    scores: dict[str, float] = {}
    labels: list[str] = []

    for label, patterns in compiled_patterns.items():
        count = sum(1 for pattern in patterns if pattern.search(text))
        if count:
            score = min(1.0 + 0.25 * (count - 1), 2.0)
            scores[label] = score
            labels.append(label)

    is_heading = unit["unit_type"] in ("heading", "code_block")
    imperative_opener = re.match(r"(?i)^do(?:n'?t| not)\b", text)
    if not is_heading and not imperative_opener and (text.endswith("?") or INTERROGATIVE.search(text)):
        scores["question"] = 1.0
        labels.append("question")
    if unit["unit_type"] == "code_block":
        # Code content matches prose-semantic patterns incidentally; a fenced
        # example file is evidence of a tool or artifact, not a decision or risk.
        for semantic in ("requirement", "constraint", "decision", "acceptance_criterion",
                         "action_item", "risk", "assumption", "explicit_open_question", "follow_up"):
            if semantic in labels:
                labels.remove(semantic)
                scores.pop(semantic, None)
        scores["tool_or_command"] = max(scores.get("tool_or_command", 0), 1.2)
        labels.append("tool_or_command")
    if FILE_TOKEN_RE.search(text):
        scores["artifact_or_output"] = max(scores.get("artifact_or_output", 0), 1.2)
        labels.append("artifact_or_output")
    if URL_RE.search(text):
        scores["source_reference"] = max(scores.get("source_reference", 0), 1.0)
        labels.append("source_reference")

    role = unit["role"]
    if role == "user" and any(label in labels for label in ("requirement", "constraint", "action_item", "question", "acceptance_criterion")):
        scores["user_request"] = 1.0
        labels.append("user_request")
    if role == "user" and "requirement" in labels:
        scores["user_requirement"] = scores["requirement"]
        labels.append("user_requirement")
    if role == "assistant":
        proposal_cue = (
            any(label in labels for label in ("requirement", "action_item", "process_step", "decision"))
            or re.search(r"\b(?:suggest|recommend|propose|advise|you should|i would|consider|best practice|how about|we could)\b", lower)
        )
        if proposal_cue:
            scores["assistant_proposal"] = 1.0
            labels.append("assistant_proposal")
    if role == "participant":
        labels.append("participant_statement")
        scores["participant_statement"] = 0.5

    # Deduplicate while preserving deterministic taxonomy order.
    taxonomy_order = [
        "question", "user_request", "user_requirement", "requirement", "constraint", "decision",
        "acceptance_criterion", "action_item", "process_step", "tool_or_command", "artifact_or_output",
        "risk", "assumption", "source_reference", "follow_up", "explicit_open_question", "assistant_proposal", "participant_statement",
    ]
    label_set = set(labels)
    labels = [name for name in taxonomy_order if name in label_set]

    salience_weights = {
        "acceptance_criterion": 4.0, "decision": 3.5, "user_requirement": 3.5, "requirement": 3.0,
        "constraint": 2.8, "action_item": 2.2, "question": 2.0, "assistant_proposal": 1.8,
        "tool_or_command": 1.7, "artifact_or_output": 1.6, "process_step": 1.5, "risk": 1.5,
        "assumption": 1.2, "source_reference": 0.8, "follow_up": 1.5, "explicit_open_question": 2.5,
    }
    salience = sum(salience_weights.get(label, 0.2) * scores.get(label, 1.0) for label in labels)
    salience += 0.2 if unit["message_unit_sequence"] <= 2 else 0
    unit["classification"] = {
        "labels": labels,
        "scores": {key: round(value, 3) for key, value in scores.items()},
        "salience": round(salience, 3),
        "provenance": (
            "user_stated" if role == "user" else
            "assistant_proposed" if role == "assistant" else
            "participant_stated" if role == "participant" else
            "system_generated" if role in {"system", "tool"} else
            "unattributed"
        ),
    }


def compute_terms(units: list[dict[str, Any]], word_tokenizer: WordPunctTokenizer, limit: int) -> list[dict[str, Any]]:
    stemmer = PorterStemmer()
    counts: Counter[str] = Counter()
    forms: dict[str, Counter[str]] = defaultdict(Counter)
    for unit in units:
        if unit["unit_type"] == "code_block":
            continue
        for token in word_tokenizer.tokenize(unit["text"]):
            lower = token.lower()
            if not re.fullmatch(r"[a-z][a-z0-9_-]{2,}", lower) or lower in STOPWORDS:
                continue
            stem = stemmer.stem(lower)
            counts[stem] += 1
            forms[stem][lower] += 1
    result = []
    for stem, count in counts.most_common(limit):
        canonical = forms[stem].most_common(1)[0][0]
        result.append({"term": canonical, "stem": stem, "count": count, "variants": dict(forms[stem].most_common(6))})
    return result


def group_exchanges(messages: list[Message]) -> list[dict[str, Any]]:
    exchanges: list[dict[str, Any]] = []
    current: Optional[dict[str, Any]] = None
    for msg in messages:
        if msg.role == "user":
            if current:
                exchanges.append(current)
            current = {"exchange_id": f"EX-{len(exchanges)+1:03d}", "user_message_id": msg.message_id, "response_message_ids": []}
        elif current:
            current["response_message_ids"].append(msg.message_id)
        else:
            exchanges.append({"exchange_id": f"EX-{len(exchanges)+1:03d}", "user_message_id": None, "response_message_ids": [msg.message_id]})
    if current:
        exchanges.append(current)
    # For meeting transcripts, each message remains chronological but not an artificial Q/A exchange.
    if not any(msg.role == "user" for msg in messages):
        exchanges = [
            {"exchange_id": f"EX-{idx:03d}", "user_message_id": None, "response_message_ids": [msg.message_id]}
            for idx, msg in enumerate(messages, 1)
        ]
    return exchanges


def references_for_label(units: list[dict[str, Any]], label: str, role: Optional[str] = None) -> list[dict[str, Any]]:
    refs = []
    for unit in units:
        if label not in unit["classification"]["labels"]:
            continue
        if role and unit["role"] != role:
            continue
        refs.append({
            "unit_id": unit["unit_id"],
            "message_id": unit["message_id"],
            "role": unit["role"],
            "speaker": unit["speaker"],
            "text": unit["text"],
            "source": unit["source"],
            "salience": unit["classification"]["salience"],
        })
    return refs


def answer_question_map(messages: list[Message], units: list[dict[str, Any]]) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    units_by_message: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for unit in units:
        units_by_message[unit["message_id"]].append(unit)
    answered: list[dict[str, Any]] = []
    open_questions: list[dict[str, Any]] = []
    for idx, msg in enumerate(messages):
        questions = [
            u for u in units_by_message[msg.message_id]
            if u["unit_type"] != "code_block"
            and ("question" in u["classification"]["labels"] or "explicit_open_question" in u["classification"]["labels"])
        ]
        for question in questions:
            resolved_by = None
            forced_open = "explicit_open_question" in question["classification"]["labels"]
            if not forced_open:
                if msg.role == "user":
                    for later in messages[idx + 1:]:
                        if later.role == "user":
                            break
                        if later.role == "assistant" and later.text.strip():
                            resolved_by = later.message_id
                            break
                elif msg.role == "assistant":
                    # A clarifying question from the assistant is answered when the
                    # user sends any later message; a trailing question stays open.
                    for later in messages[idx + 1:]:
                        if later.role == "user" and later.text.strip():
                            resolved_by = later.message_id
                            break
                elif msg.role in ("participant", "unknown"):
                    # In meetings, a question is treated as answered when a different
                    # speaker replies afterward. Provenance stays with the reply message.
                    for later in messages[idx + 1:]:
                        if later.speaker != msg.speaker and later.text.strip():
                            resolved_by = later.message_id
                            break
            item = {"question_unit_id": question["unit_id"], "text": question["text"], "resolved_by_message_id": resolved_by}
            if resolved_by:
                answered.append(item)
            else:
                open_questions.append(item)
    return answered, open_questions


def select_salient(units: list[dict[str, Any]], message_id: str, maximum: int) -> list[dict[str, Any]]:
    candidates = [u for u in units if u["message_id"] == message_id]
    ranked = sorted(candidates, key=lambda u: (-u["classification"]["salience"], u["message_unit_sequence"]))[:maximum]
    selected_ids = {u["unit_id"] for u in ranked}
    return [u for u in candidates if u["unit_id"] in selected_ids]


def attach_adjacent_context(refs: list[dict[str, Any]], units: list[dict[str, Any]], direction: str, max_tokens: int = 5) -> None:
    """Attach the neighboring unit from the same message as context for very short labeled fragments.

    A five-token unit like "One risk though." or "I'm making that call now." carries the label
    but not the substance; the substance sits in the adjacent sentence. The quoted text is never
    altered; the neighbor is attached separately as context with its own unit ID.
    """
    index_by_id = {u["unit_id"]: i for i, u in enumerate(units)}
    for ref in refs:
        if len(ref["text"].split()) > max_tokens or "context" in ref:
            continue
        idx = index_by_id.get(ref["unit_id"])
        if idx is None:
            continue
        neighbor_idx = idx + 1 if direction == "next" else idx - 1
        if 0 <= neighbor_idx < len(units):
            neighbor = units[neighbor_idx]
            if neighbor["message_id"] == ref["message_id"] and neighbor["text"].strip():
                ref["context"] = neighbor["text"]
                ref["context_unit_id"] = neighbor["unit_id"]


def build_summary(
    messages: list[Message], units: list[dict[str, Any]], exchanges: list[dict[str, Any]], metadata: dict[str, Any], defaults: dict[str, Any]
) -> dict[str, Any]:
    message_map = {m.message_id: m for m in messages}
    first_user = next((m for m in messages if m.role == "user"), None)
    last_user = next((m for m in reversed(messages) if m.role == "user"), None)
    answered, open_questions = answer_question_map(messages, units)

    chronology = []
    for exchange in exchanges:
        user_msg = message_map.get(exchange["user_message_id"]) if exchange["user_message_id"] else None
        response_summaries = []
        for response_id in exchange["response_message_ids"]:
            response_msg = message_map[response_id]
            salient = select_salient(units, response_id, defaults["max_salient_units_per_message"])
            response_summaries.append({
                "message_id": response_id,
                "speaker": response_msg.speaker,
                "role": response_msg.role,
                "salient_unit_ids": [u["unit_id"] for u in salient],
                "salient_excerpts": [u["text"] for u in salient],
            })
        chronology.append({
            **exchange,
            "user_request": user_msg.text if user_msg else None,
            "responses": response_summaries,
        })

    user_requirements = references_for_label(units, "user_requirement", "user")
    # Include user constraints/action items not already captured as requirements.
    requirement_ids = {r["unit_id"] for r in user_requirements}
    for label in ("constraint", "action_item", "acceptance_criterion"):
        for ref in references_for_label(units, label, "user"):
            if ref["unit_id"] not in requirement_ids:
                user_requirements.append(ref)
                requirement_ids.add(ref["unit_id"])
    user_requirements.sort(key=lambda r: next(i for i, u in enumerate(units) if u["unit_id"] == r["unit_id"]))

    decisions = references_for_label(units, "decision")
    attach_adjacent_context(decisions, units, direction="prev")
    risks = references_for_label(units, "risk")
    attach_adjacent_context(risks, units, direction="next")

    return {
        "core_intent": {
            "initial_user_request": first_user.text if first_user else None,
            "final_user_request": last_user.text if last_user else None,
            "interpretation_policy": "These are verbatim user messages. The parser does not replace them with an inferred objective.",
        },
        "user_requirements": user_requirements,
        "assistant_proposals": references_for_label(units, "assistant_proposal", "assistant"),
        "decisions": decisions,
        "acceptance_criteria": references_for_label(units, "acceptance_criterion"),
        "tools_and_commands": references_for_label(units, "tool_or_command"),
        "artifacts_and_outputs": references_for_label(units, "artifact_or_output"),
        "action_items": references_for_label(units, "action_item"),
        "process_steps": references_for_label(units, "process_step"),
        "risks": risks,
        "assumptions": references_for_label(units, "assumption"),
        "source_references": references_for_label(units, "source_reference"),
        "answered_questions": answered,
        "open_questions": open_questions,
        "suggested_followups": metadata.get("suggested_followups", []),
        "chronological_evolution": chronology,
    }


def validate_parse(parse: dict[str, Any], source_text: str, accounted_lines: set[int]) -> dict[str, Any]:
    errors: list[str] = []
    warnings: list[str] = []
    message_ids = [m["message_id"] for m in parse["messages"]]
    unit_ids = [u["unit_id"] for u in parse["units"]]
    if len(message_ids) != len(set(message_ids)):
        errors.append("Duplicate message IDs detected.")
    if len(unit_ids) != len(set(unit_ids)):
        errors.append("Duplicate unit IDs detected.")
    known_messages = set(message_ids)
    for unit in parse["units"]:
        if unit["message_id"] not in known_messages:
            errors.append(f"Unit {unit['unit_id']} references missing message {unit['message_id']}.")
        source = unit["source"]
        if not (0 <= source["char_start"] <= source["char_end"] <= len(source_text)):
            errors.append(f"Unit {unit['unit_id']} has an invalid character range.")
        if sha256_text(unit["text"]) != source["quote_hash"]:
            errors.append(f"Unit {unit['unit_id']} quote hash mismatch.")
    all_lines = build_source_lines(source_text)
    nonempty = {line.number for line in all_lines if line.text.strip()}
    missing = sorted(nonempty - accounted_lines)
    if missing:
        warnings.append(f"{len(missing)} non-empty extracted-text lines were not assigned to a message or explicit metadata section.")
    summary_ids: list[str] = []
    for key in (
        "user_requirements", "assistant_proposals", "decisions", "acceptance_criteria", "tools_and_commands",
        "artifacts_and_outputs", "process_steps", "risks", "assumptions", "source_references",
    ):
        summary_ids.extend(item["unit_id"] for item in parse["summary"].get(key, []))
    unknown_summary_ids = sorted(set(summary_ids) - set(unit_ids))
    if unknown_summary_ids:
        errors.append(f"Summary references unknown unit IDs: {unknown_summary_ids[:10]}")
    metrics = parse["metrics"]
    if metrics["message_count"] != len(parse["messages"]):
        errors.append("Message count does not reconcile.")
    if metrics["unit_count"] != len(parse["units"]):
        errors.append("Unit count does not reconcile.")
    status = "fail" if errors else "pass_with_warnings" if warnings else "pass"
    return {
        "status": status,
        "errors": errors,
        "warnings": warnings,
        "checks": {
            "unique_message_ids": len(message_ids) == len(set(message_ids)),
            "unique_unit_ids": len(unit_ids) == len(set(unit_ids)),
            "unit_ranges_within_extracted_text": not any("character range" in e for e in errors),
            "quote_hashes_valid": not any("quote hash" in e for e in errors),
            "summary_references_valid": not unknown_summary_ids,
            "counts_reconcile": not any("count does not reconcile" in e for e in errors),
            "nonempty_line_coverage_ratio": round((len(nonempty & accounted_lines) / len(nonempty)), 4) if nonempty else 1.0,
        },
        "unaccounted_nonempty_lines": missing,
    }


def message_to_public(message: Message) -> dict[str, Any]:
    data = asdict(message)
    data.pop("line_map", None)
    return data


def render_location(source: dict[str, Any]) -> str:
    if source["line_start"] == source["line_end"]:
        return f"L{source['line_start']}"
    return f"L{source['line_start']}-L{source['line_end']}"


def markdown_escape(text: str) -> str:
    return text.replace("|", "\\|").replace("\n", "<br>")


def render_markdown(parse: dict[str, Any]) -> str:
    source = parse["source"]
    metrics = parse["metrics"]
    summary = parse["summary"]
    lines: list[str] = []
    lines.append(f"# Parsed transcript: {Path(source['original_path']).stem}")
    lines.append("")
    lines.append("## Processing summary")
    lines.append("")
    lines.append(f"- **Detected platform:** `{parse['platform']['detected']}`")
    lines.append(f"- **Source format:** `{source['suffix']}` ({source['extraction_basis']})")
    lines.append(f"- **Messages:** {metrics['message_count']}")
    lines.append(f"- **User/assistant exchanges:** {metrics['exchange_count']}")
    lines.append(f"- **Sentence and structural units:** {metrics['unit_count']}")
    lines.append(f"- **NLTK tokens:** {metrics['token_count']:,}")
    lines.append(f"- **User requirement units:** {len(summary['user_requirements'])}")
    lines.append(f"- **Assistant proposal units:** {len(summary['assistant_proposals'])}")
    lines.append(f"- **Source SHA-256:** `{source['original_sha256']}`")
    lines.append(f"- **Validation:** `{parse['validation']['status']}`")
    lines.append("")
    lines.append("The parser preserves speaker provenance. User statements are not merged with assistant proposals, and extracted conclusions remain linked to exact source locations.")
    lines.append("")

    lines.append("## Core intent")
    lines.append("")
    if summary["core_intent"]["initial_user_request"]:
        lines.append("**Initial user request**")
        lines.append("")
        lines.append(f"> {summary['core_intent']['initial_user_request'].replace(chr(10), chr(10) + '> ')}")
        lines.append("")
    if summary["core_intent"]["final_user_request"] and summary["core_intent"]["final_user_request"] != summary["core_intent"]["initial_user_request"]:
        lines.append("**Final user-stated request**")
        lines.append("")
        lines.append(f"> {summary['core_intent']['final_user_request'].replace(chr(10), chr(10) + '> ')}")
        lines.append("")

    lines.append("## User requirements")
    lines.append("")
    if summary["user_requirements"]:
        lines.append("| ID | Message | Location | Verbatim requirement |")
        lines.append("|---|---|---|---|")
        for idx, item in enumerate(summary["user_requirements"], 1):
            lines.append(f"| UR-{idx:03d} | {item['message_id']} | {render_location(item['source'])} | {markdown_escape(item['text'])} |")
    else:
        lines.append("No user requirement units were deterministically identified.")
    lines.append("")

    def add_section(title: str, key: str, limit: int = 40) -> None:
        items = summary[key]
        lines.append(f"## {title}")
        lines.append("")
        if not items:
            lines.append("None identified.")
            lines.append("")
            return
        for item in items[:limit]:
            entry = f"- **{item['unit_id']} · {item['speaker']} · {render_location(item['source'])}:** {item['text']}"
            if item.get("context"):
                entry += f" _(context {item['context_unit_id']}: {item['context']})_"
            lines.append(entry)
        if len(items) > limit:
            lines.append(f"- _{len(items) - limit} additional items are available in the JSON and CSV outputs._")
        lines.append("")

    add_section("Decisions", "decisions")
    add_section("Action items", "action_items")
    add_section("Acceptance criteria", "acceptance_criteria")
    add_section("Tools and commands", "tools_and_commands")
    add_section("Artifacts and outputs", "artifacts_and_outputs")
    add_section("Risks and assumptions", "risks")

    lines.append("## Chronological evolution")
    lines.append("")
    for exchange in summary["chronological_evolution"]:
        lines.append(f"### {exchange['exchange_id']}")
        lines.append("")
        if exchange["user_request"]:
            lines.append("**User request**")
            lines.append("")
            lines.append(f"> {exchange['user_request'].replace(chr(10), chr(10) + '> ')}")
            lines.append("")
        for response in exchange["responses"]:
            lines.append(f"**{response['speaker']} response: salient source excerpts**")
            lines.append("")
            if response["salient_excerpts"]:
                for excerpt in response["salient_excerpts"]:
                    lines.append(f"- {excerpt}")
            else:
                lines.append("- No salient excerpt was selected.")
            lines.append("")

    lines.append("## Open questions and suggested follow-ups")
    lines.append("")
    if summary["open_questions"]:
        lines.append("**Unanswered transcript questions**")
        lines.append("")
        for item in summary["open_questions"]:
            lines.append(f"- {item['text']} (`{item['question_unit_id']}`)")
        lines.append("")
    if summary["suggested_followups"]:
        lines.append("**Platform-suggested follow-ups**")
        lines.append("")
        for item in summary["suggested_followups"]:
            lines.append(f"- {item}")
        lines.append("")
    if not summary["open_questions"] and not summary["suggested_followups"]:
        lines.append("None identified.")
        lines.append("")

    lines.append("## Top terms")
    lines.append("")
    lines.append("| Term | Count |")
    lines.append("|---|---:|")
    for item in parse["top_terms"]:
        lines.append(f"| {item['term']} | {item['count']} |")
    lines.append("")

    if source["warnings"] or parse["validation"]["warnings"]:
        lines.append("## Extraction and validation notes")
        lines.append("")
        for warning in source["warnings"] + parse["validation"]["warnings"]:
            lines.append(f"- {warning}")
        lines.append("")

    return "\n".join(lines).rstrip() + "\n"


def write_csv(path: Path, units: list[dict[str, Any]]) -> None:
    fieldnames = [
        "unit_id", "message_id", "message_sequence", "message_unit_sequence", "role", "speaker", "timestamp",
        "unit_type", "source_line_start", "source_line_end", "source_char_start", "source_char_end",
        "token_count", "word_count", "labels", "provenance", "salience", "text", "quote_hash",
    ]
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for unit in units:
            writer.writerow({
                "unit_id": unit["unit_id"],
                "message_id": unit["message_id"],
                "message_sequence": unit["message_sequence"],
                "message_unit_sequence": unit["message_unit_sequence"],
                "role": unit["role"],
                "speaker": unit["speaker"],
                "timestamp": unit["timestamp"] or "",
                "unit_type": unit["unit_type"],
                "source_line_start": unit["source"]["line_start"],
                "source_line_end": unit["source"]["line_end"],
                "source_char_start": unit["source"]["char_start"],
                "source_char_end": unit["source"]["char_end"],
                "token_count": unit["metrics"]["token_count"],
                "word_count": unit["metrics"]["word_count"],
                "labels": ";".join(unit["classification"]["labels"]),
                "provenance": unit["classification"]["provenance"],
                "salience": unit["classification"]["salience"],
                "text": unit["text"],
                "quote_hash": unit["source"]["quote_hash"],
            })


def create_zip(output_dir: Path) -> Path:
    zip_path = output_dir.with_suffix(".zip")
    if zip_path.exists():
        zip_path.unlink()
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as archive:
        for file_path in sorted(output_dir.rglob("*")):
            if file_path.is_file():
                archive.write(file_path, file_path.relative_to(output_dir.parent))
    return zip_path


def parse_transcript(input_path: Path, output_dir: Path, skill_root: Path, create_archive: bool = True) -> tuple[dict[str, Any], dict[str, Path]]:
    noise, patterns, defaults = load_config(skill_root)
    del noise  # reserved for future custom adapters; platform parsers use equivalent explicit markers.
    source = load_source(input_path)
    platform, scores = detect_platform(source.extracted_text, source.suffix, source.structured_messages)
    messages, adapter_metadata, accounted_lines = parse_messages(source, platform)
    if not messages:
        raise RuntimeError("No messages or transcript blocks could be extracted.")

    sentence_tokenizer = PunktSentenceTokenizer()
    word_tokenizer = WordPunctTokenizer()
    compiled = {label: [re.compile(pattern, re.I | re.M) for pattern in values] for label, values in patterns.items()}

    units: list[dict[str, Any]] = []
    for message in messages:
        for unit in unitize_message(message, sentence_tokenizer, word_tokenizer):
            unit["unit_id"] = f"UNIT-{len(units)+1:05d}"
            classify_unit(unit, compiled)
            units.append(unit)

    exchanges = group_exchanges(messages)
    top_terms = compute_terms(units, word_tokenizer, defaults["max_top_terms"])
    role_counts = Counter(message.role for message in messages)
    classification_counts = Counter(label for unit in units for label in unit["classification"]["labels"])
    summary = build_summary(messages, units, exchanges, adapter_metadata, defaults)

    parse: dict[str, Any] = {
        "schema_version": "1.0.0",
        "parser": {
            "name": "evidence-first-transcript-parser",
            "version": PARSER_VERSION,
            "nltk_version": nltk.__version__,
            "sentence_tokenizer": "nltk.tokenize.PunktSentenceTokenizer",
            "word_tokenizer": "nltk.tokenize.WordPunctTokenizer",
            "external_nltk_downloads_required": False,
            "generated_at": datetime.now(timezone.utc).isoformat(),
        },
        "source": {
            "original_path": source.original_path,
            "suffix": source.suffix,
            "original_sha256": source.original_sha256,
            "original_bytes": source.original_bytes,
            "extracted_text_sha256": sha256_text(source.extracted_text),
            "extracted_character_count": len(source.extracted_text),
            "extraction_basis": source.extraction_basis,
            "warnings": source.warnings,
        },
        "platform": {"detected": platform, "scores": scores, "adapter_metadata": adapter_metadata},
        "messages": [message_to_public(message) for message in messages],
        "exchanges": exchanges,
        "units": units,
        "summary": summary,
        "top_terms": top_terms,
        "metrics": {
            "message_count": len(messages),
            "exchange_count": len(exchanges),
            "unit_count": len(units),
            "sentence_unit_count": sum(1 for u in units if u["unit_type"] == "sentence"),
            "structural_unit_count": sum(1 for u in units if u["unit_type"] != "sentence"),
            "token_count": sum(u["metrics"]["token_count"] for u in units),
            "word_count": sum(u["metrics"]["word_count"] for u in units),
            "role_counts": dict(role_counts),
            "classification_counts": dict(classification_counts),
        },
    }
    parse["validation"] = validate_parse(parse, source.extracted_text, accounted_lines)

    output_dir.mkdir(parents=True, exist_ok=True)
    stem = input_path.stem
    paths = {
        "json": output_dir / f"{stem}.parse.json",
        "markdown": output_dir / f"{stem}.parsed.md",
        "csv": output_dir / f"{stem}.unit-ledger.csv",
        "manifest": output_dir / f"{stem}.manifest.json",
        "validation": output_dir / f"{stem}.validation-report.json",
        "extracted_source": output_dir / "source.extracted.txt",
        "original_source": output_dir / f"source.original{input_path.suffix.lower()}",
    }
    paths["json"].write_text(json.dumps(parse, indent=2, ensure_ascii=False), encoding="utf-8")
    paths["markdown"].write_text(render_markdown(parse), encoding="utf-8")
    write_csv(paths["csv"], units)
    paths["validation"].write_text(json.dumps(parse["validation"], indent=2, ensure_ascii=False), encoding="utf-8")
    paths["extracted_source"].write_text(source.extracted_text, encoding="utf-8")
    shutil.copy2(input_path, paths["original_source"])

    manifest = {
        "run_id": f"transcript-parse-{datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')}",
        "parser_version": PARSER_VERSION,
        "input": {
            "path": str(input_path.resolve()),
            "sha256": source.original_sha256,
            "bytes": source.original_bytes,
        },
        "outputs": {key: str(path.name) for key, path in paths.items() if key != "manifest"},
        "metrics": parse["metrics"],
        "validation_status": parse["validation"]["status"],
    }
    paths["manifest"].write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding="utf-8")

    if create_archive:
        paths["zip"] = create_zip(output_dir)
    return parse, paths


def resolve_output_dir(input_path: Path, output_arg: Optional[str], skill_root: Path) -> Path:
    if output_arg:
        return Path(output_arg).expanduser().resolve()
    defaults = json.loads((skill_root / "defaults" / "parser-defaults.json").read_text(encoding="utf-8"))
    root = Path(defaults["default_output_root"]).expanduser()
    return (root / f"{input_path.stem}-transcript-parse").resolve()


def main(argv: Optional[list[str]] = None) -> int:
    parser = argparse.ArgumentParser(
        description="Parse any text-based transcript into source-addressable JSON, Markdown, and CSV outputs.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=textwrap.dedent(
            """
            Examples:
              python scripts/parse_transcript.py ./input/chat.txt
              python scripts/parse_transcript.py ./input/meeting.vtt --output-dir ./output/meeting
              python scripts/parse_transcript.py ./input/export.json --no-zip
            """
        ),
    )
    parser.add_argument("input", help="Transcript path (.txt, .md, .log, .json, .jsonl, .csv, .html, .srt, .vtt, .docx, or .pdf)")
    parser.add_argument("--output-dir", help="Output directory. Defaults to ./output/<source-stem>-transcript-parse/")
    parser.add_argument("--no-zip", action="store_true", help="Do not create a ZIP bundle")
    args = parser.parse_args(argv)

    input_path = Path(args.input).expanduser().resolve()
    skill_root = Path(__file__).resolve().parents[1]
    try:
        output_dir = resolve_output_dir(input_path, args.output_dir, skill_root)
        parse, paths = parse_transcript(input_path, output_dir, skill_root, create_archive=not args.no_zip)
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2

    result = {
        "status": parse["validation"]["status"],
        "detected_platform": parse["platform"]["detected"],
        "messages": parse["metrics"]["message_count"],
        "exchanges": parse["metrics"]["exchange_count"],
        "units": parse["metrics"]["unit_count"],
        "outputs": {key: str(path) for key, path in paths.items()},
    }
    print(json.dumps(result, indent=2, ensure_ascii=False))
    return 0 if parse["validation"]["status"] != "fail" else 1


if __name__ == "__main__":
    raise SystemExit(main())
