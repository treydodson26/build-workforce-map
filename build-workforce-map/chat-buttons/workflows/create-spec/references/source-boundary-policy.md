# Source-boundary policy

## Governing rule

The transcript is evidence. The parser may organize, label, count, and link that evidence. It must not silently rewrite, reconcile, correct, or expand what the speakers said.

## Provenance classes

- `user_stated`: The text came from a message explicitly attributed to the user or requester.
- `assistant_proposed`: The text came from an assistant response. Requirements in this class remain proposals unless the user later adopts them.
- `participant_stated`: The text came from a named or numbered transcript participant.
- `system_generated`: The text came from a system or tool event.
- `unattributed`: The parser could not reliably identify the speaker.

## Required evidence fields

Every unit must retain:

- Stable unit ID
- Message ID
- Speaker and normalized role
- Exact unit text
- Source line range
- Source character range
- Quote hash
- Unit type
- Classification labels and scores

## Prohibited behavior

Do not:

- Merge user requirements with assistant recommendations.
- Convert a model suggestion into a user decision.
- Label an unanswered question as resolved.
- Invent dates, owners, requirements, tools, outputs, or acceptance criteria.
- Remove uncertainty from ambiguous speaker attribution.
- Claim complete coverage when non-empty source lines remain unaccounted for.

## Extracted formats

For TXT, Markdown, and logs, source locations refer to the normalized raw text. For JSON, CSV, HTML, DOCX, and PDF, locations may refer to the extracted canonical text. The manifest and source warnings must state that distinction.
