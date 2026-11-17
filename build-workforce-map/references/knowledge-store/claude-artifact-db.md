# Knowledge store on a Claude artifact database

Use this design whenever a workforce needs knowledge (reference documents, FAQs, policies, records an agent looks up). It replaces the platform's own knowledge tables and `search` step with a store that Claude owns and queries. Read it in full before Stage 1 lists knowledge, and again before Stage 2 writes a knowledge spec.

Facts checked on 11/17/2026 against the Claude artifacts connector (runtime contract 0.2.96).

## Contents

1. What the database can and cannot do
2. Who can query the store
3. Collections and document shapes
4. Create the store
5. Load or update a source (upsert)
6. Search (retrieve)
7. Agent prompt wording
8. Evals for the store
9. Limits
10. How to express it in spec.json

## 1. What the database can and cannot do

An artifact can declare one database: JSON documents at slash paths such as `kb/policies/chunks/hr-handbook-0003`. Claude reads and writes it from chat with these tools, always with the artifact's slug:

| Tool | Use |
|---|---|
| `db_get` | Read one document by path |
| `db_list` | Read a collection, 1 to 1,000 documents per page, with a cursor |
| `db_query` | Filter with `==`, `!=`, `<`, `<=`, `>`, `>=`, `in`, `not-in` (up to 30 values), `array-contains`; up to 10 filters; one `orderBy`; `limit` 1 to 1,000 |
| `db_write` | `set`, `merge`, `update`, `delete`; 1 to 50 ops per call, all or none; every op on an existing document needs `ifVersion` |
| `db_str_replace` | Replace text inside one string field |
| `db_usage` | Document count and limit |

Limits: 256 KiB and 32 levels per document; 25,000 documents per artifact; queries scan the collection (no indexes), so keep a queried collection to hundreds or low thousands of documents; writes are rate-limited (one `db_write` at a time, wait 2 seconds after a call with many ops).

The database has no full-text search, no vector search, and no ranking. This design adds them: an inverted index gives keyword search with BM25 ranking, and Claude supplies the meaning (query expansion and rerank).

## 2. Who can query the store

Only Claude can query the store: Claude in a chat with the `db_*` tools, or the artifact's own page (its JavaScript, which can also ask Claude through the `sample` capability). Nothing else can call it. Pages cannot fetch outside addresses, and the database has no public API.

So:

- A workforce whose agents run in Claude (a chat, a Claude project, a skill, a scheduled Claude task) uses the store directly.
- A workforce whose agents run on another platform cannot read the store. For that workforce, list the knowledge as **UNVERIFIED** in Stage 1 and name the gap as an open question: either copy the knowledge into that platform, or move the agent that needs it into Claude.
- The store belongs to the claude.ai account that owns the artifact. Create it in the account that will use it; a work account cannot read a personal account's artifacts.

## 3. Collections and document shapes

One artifact holds one or more knowledge bases. `<base>` is a short slug such as `policies` (letters, digits, `-`, `_`).

| Path | One document per | Fields |
|---|---|---|
| `kb/<base>/meta/stats` | Base | `chunk_count`, `avg_length`, `updated_at`, `description` |
| `kb/<base>/meta/always` | Base | `text`: short text every agent reads whole (prompt mode), under about 20,000 words |
| `kb/<base>/sources/<sourceId>` | Source file or record set | `name`, `hash`, `chunk_ids` (array), `imported_at`, `status` (`active` or `retired`) |
| `kb/<base>/chunks/<chunkId>` | Chunk of text | `text`, `source`, `position`, `length`, `summary`, `keywords` (array), `tags` (array), `status`, `updated_at` |
| `kb/<base>/terms/<term>` | Index word | `postings` (map: chunk ID to count), `df` (number of chunks) |

Rules:

- `chunkId` = `<sourceId>-<position as 4 digits>`, for example `hr-handbook-0003`. The same source and position always give the same ID; that is what makes upsert work.
- `term` is a word after `tokenize()` in `scripts/kb-store.js`: lowercased, accents and punctuation removed, stop words dropped, simple suffix stem.
- A term document near 200 KiB splits into `terms/<term>~2`, `~3`; search reads every part.
- Structured records (one row per lead, product, or policy) are chunks too: put the record as `key: value` lines in `text`, and its filter fields (`region`, `owner`, `status`) as top-level fields so `db_query` can filter them.
- `status` is `active`, `draft`, or `retired`. Search keeps only `active` chunks (rubric FA-02).

Example chunk document:

```json
{
  "text": "Refund policy\nCustomers can request a refund within 30 days of purchase...",
  "source": "refund-policy",
  "position": 0,
  "length": 212,
  "summary": "Refunds are allowed within 30 days with a receipt.",
  "keywords": ["refund", "return", "money back", "reimbursement", "30 days"],
  "tags": ["billing", "policy"],
  "status": "active",
  "updated_at": "2026-11-17"
}
```

## 4. Create the store

1. Publish an artifact page for the store, titled `Knowledge Store: <workforce name>`. The page lists bases, shows a search box, and shows each chunk with its source. Build it from the `scripts/kb-store.js` functions.
2. Declare its capabilities:

   ```json
   {"db": {"rules": [{"path": "", "read": "view", "write": "admin"}]}, "user": {}, "sample": {}}
   ```

   Everyone the artifact is shared with reads; only the owner and editors change knowledge.
3. Write `kb/<base>/meta/stats` with `chunk_count: 0` for each base. The store now exists; `db_get` on that path is the existence check for gate G9.
4. Record the artifact slug and every base slug in the spec's `prereqs`.

## 5. Load or update a source (upsert)

Use `scripts/kb-store.js` for the mechanical parts (`chunk`, `index`, `hash`).

1. **Skip unchanged sources.** Hash the source text. If `sources/<sourceId>` exists with the same `hash`, stop.
2. **Chunk.** `node scripts/kb-store.js chunk <file> <sourceId>` splits the text into chunks of about 400 words with a 50-word overlap and keeps each section heading on its chunks. A CSV or JSON file becomes one chunk per record instead.
3. **Enrich.** For each chunk, Claude writes a one-line `summary` and 5 to 10 `keywords`, including synonyms the text does not use. Keywords count double in the index, which gives keyword search some reach into meaning.
4. **Write chunks.** For chunks that already exist, read them first (`db_query` on `chunks` with `where source == <sourceId>`) to get each `version`. Then `db_write` `merge` ops, 50 per call, each with `ifVersion` when the chunk exists. One call at a time.
5. **Remove dropped chunks.** Delete chunks of this source whose position is beyond the new chunk count (`delete` with `ifVersion`).
6. **Update the index.** For each term in the old or new chunks, read `terms/<term>`, set or remove this source's chunk IDs in `postings`, recompute `df`, and `merge` it back with `ifVersion`. For a first load, `node scripts/kb-store.js index chunks.json` builds every term document at once.
7. **Update stats and source.** Recompute `chunk_count` and `avg_length` in `meta/stats`; write `sources/<sourceId>` with the new `hash`, `chunk_ids`, `imported_at`, `status: active`.

To retire a source without deleting it, set `status: retired` on the source and its chunks. Search skips them.

## 6. Search (retrieve)

Inputs: the question, the base, optional filters (`tags`, `source`, any record field), and `k` (default 5, like the platform's `page_size`).

1. **Expand the query.** Claude rewrites the question as 5 to 15 search words: the key nouns and verbs plus synonyms and likely wording in the documents. Tokenize them with `tokenize()`.
2. **Read the index.** `db_get` `kb/<base>/terms/<term>` for each word (and its `~2` parts), plus `kb/<base>/meta/stats`.
3. **Score.** Run `bm25()` from `scripts/kb-store.js` over the term documents. Keep the top 30 chunk IDs.
4. **Filter.** If the request has filters, run `db_query` on `kb/<base>/chunks` with those `where` filters plus `status == active`, and keep only chunk IDs in both sets. When the filters alone match fewer than 100 chunks, start from the filter result instead of the index.
5. **Read candidates.** `db_get` each remaining chunk by its path.
6. **Rerank.** Claude orders the candidates by how directly each answers the question, and drops any that do not. Keep the top `k`.
7. **Return** each chunk's `text`, `source`, chunk ID, and BM25 score, so the answer can cite its sources.

Small base shortcut: under about 300 chunks, skip steps 1 to 4. `db_list` the whole `chunks` collection, filter on `status`, and let Claude pick the top `k`.

Prompt-mode shortcut: knowledge an agent must always follow (a style guide, a short policy) goes in `meta/always`; the agent reads it whole at the start of every task.

## 7. Agent prompt wording

Every agent with knowledge gets a Knowledge section in its system prompt (rubric A10, FA-01):

```
Knowledge: <base> in the knowledge store (artifact <slug>).
Search it before you answer any question about <topics>. Search with the
question's key terms plus synonyms. Use only active chunks. Quote or cite
the chunk's source for every fact you take from it. If the search returns
nothing relevant, say the information is not in the knowledge base. Do not
answer from memory.
```

## 8. Evals for the store

- **Retrieval test set**: 10 to 20 real questions, each with the chunk ID that should come back in the top 5. Pass when at least 80 percent do.
- **No-answer test**: a question the base cannot answer. Pass when the agent says it is not in the knowledge base.
- **Stale test**: a fact from a `retired` chunk. Pass when the agent does not use it (FA-02).
- **Grounding check (FA-03)**: the AI Judge check confirms every factual claim traces to a returned chunk or a tool output.
- **Upsert test**: load a source, change one paragraph, load it again. Pass when `chunk_count` is unchanged and search returns the new wording.

## 9. Limits

| Limit | Value | Effect |
|---|---|---|
| Documents per artifact | 25,000 | Chunks plus terms plus meta. About 15,000 to 20,000 chunks. Split large knowledge across artifacts by base. |
| Document size | 256 KiB | Chunks of about 400 words use about 3 KiB; large term documents split. |
| Query scan | No indexes | Keep filtered queries on collections of low thousands; use the index for text search. |
| Write rate | Rate-limited | One `db_write` at a time; a large import takes minutes. |
| Callers | Claude only | Agents outside Claude cannot read the store. |
| Vector search | Not built in | Claude's query expansion and rerank stand in. A browser embedding model is possible only if its files ship as the artifact's own files (pages cannot fetch model files from other sites); untested. |

## 10. How to express it in spec.json

- An agent's `knowledge` field: `kb:<base>` with the store named in `prereqs`, or `None`.
- A tool that searches the store uses steps of type `claude_db_search` with params `store: <slug> · base: <base> · query: {{params.query}} · k: 5 · filters: status == active`. A tool that loads it uses `claude_db_upsert` with `store`, `base`, `source_id`, and `text`. These are Claude-side steps, not platform transformations; the validator accepts them as known.
- `prereqs` rows: `["Knowledge store", "Claude artifact <slug>", "<base>", "Create per section 4; load sources per section 5"]`.
