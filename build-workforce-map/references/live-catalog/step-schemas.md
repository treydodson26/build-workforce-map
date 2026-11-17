# Step schemas: live catalog snapshot

Snapshot of `get_transformation` for the 6 step types that `validate.js` lists in `KNOWN_STEPS`. Taken on 11/16/2026 from project **Needl** (region `bcbe5a`). All 6 returned a schema, and all 6 have `provider_source: native`. Cloud office-suite steps and vendor web-search steps are left out on purpose; Office work runs through the `com` family.

Use this file to write step params with the exact names before the workforce MCP server is registered. Once it is, call `get_transformation` on it for each step (gate G1, G2); the server's answer wins. A step that is in neither stays **UNVERIFIED**.

Read the columns this way:

- **Required** lists the `input_schema.required` keys. Set every one (G2).
- **Main params** lists the other params a tool usually sets. Advanced and hidden params are left out.
- **Output keys** are the keys you reference as `{{steps.<step>.output.<key>}}` (G3).

## Summary table

| Step ID | Name | Required params | Main optional params | Output keys | Writes data |
|---|---|---|---|---|---|
| `prompt_completion` | LLM | `prompt` | `model` (default `cost-optimized`), `system_prompt`, `temperature` (0 to 1, default 0), `response_format` (`json_object` or `text`), `validators`, `max_tokens`, `fallback_model`, `thinking`, `history` | `answer`, `prompt`, `model_used`, `credits_cost`, `input_tokens`, `output_tokens`, `errors` | No |
| `search` | Knowledge search | `dataset_id`, `query`, `query_type` (`keyword` or `vector`, default `vector`) | `page_size` (default 5), `raw_filters`, `similarity_threshold`, `output_all_fields`, `use_exact_search` | `results`, `documents` | No |
| `api_call` | API | `url`, `method` (`GET`, `POST`, `PUT`, `HEAD`, `PATCH`, `DELETE`, `OPTIONS`) | `headers`, `body`, `url_params`, `response_type`, `raise_error_on_error_response`, `cookies` | `response_body`, `status`, `body`, `url`, `response_headers` | Depends on method |
| `js_code_transformation` | Javascript code | `code` | `backend` (`deno` default, or `modal-node` deprecated) | `transformed`, `duration`, `stdout`, `stderr` | No |
| `python_code_transformation` | Python code | `code` | `packages`, `run_commands`, `long_output_mode`, `timeout`, `raise_error`, `enable_sandbox_fallback` | `transformed`, `duration`, `stdout`, `stderr`, `credits_cost`, `backend_used` | No |
| `browserless_scrape` | Extract website content | `website_url` | `method` (`Text` default, or `HTML`), `model` (`apify` default, or `browserless`) | `output.page`, `output.selectors`, `outputs[]`, `user_key_used`, `credits_cost` | No |

## Notes that affect the rubric

- **OAuth accounts (G6)**: any step that acts in an outside account takes `oauth_account_id`, marked `content_type: oauth_account` in its schema. Pass the account in from a tool input marked `metadata.content_type: oauth_account`, and confirm the provider and permission with `get_transformation`. See `../platform-skills/managing-tools/oauth.md`.
- **Code steps (G3)**: code steps return under `.transformed`, for example `{{steps.parse.output.transformed.items}}`. Code reads tool inputs as `params.<name>` and earlier steps as `steps.<step>.output`.
- **Open output objects (T5)**: some integration steps return an open object with no fixed keys. Run such a step once on the draft (`run_tool`) and read the real keys before you write the output map.
- **Write steps (G5, T6, CA-05)**: the steps marked **Yes** or **Depends on method** in the "Writes data" column can send, create, or update data. Attach a tool that holds one with `ask-first` or `always-ask`, never use `continue_on_error` on it, and simulate it in every eval test.
- **Knowledge search (G9)**: `dataset_id` takes the form `knowledge:<ID>`, and `query_type` is required. See `../platform-skills/managing-knowledge/tables.md` for the `raw_filters` shape.
- **API errors (T6)**: `api_call` returns 4xx and 5xx responses as data unless `raise_error_on_error_response` is `true`. Set it to `true` on write calls, or check `status` in a later step, so a failed write is not reported as a success.
- **LLM step model**: `prompt_completion` defaults to `cost-optimized`. On 11/16/2026 that alias was `deprecated`. Set the model explicitly to an available id.

## Refresh this file

Call `get_transformation` for each step ID above. Update any changed required param, output key, or enum. Change the date at the top. To find a step that is not listed, call `list_transformations` with `search`, `integration`, or `use_case`, and prefer results under `native` (T2).
