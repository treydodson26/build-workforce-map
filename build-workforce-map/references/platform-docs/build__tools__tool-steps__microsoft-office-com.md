# Microsoft Office COM tool steps (local)

These operations replace the former cloud office-suite tool steps. They run in the local `workforce` MCP server's `com` family. Each call spawns `powershell.exe -NoProfile -NonInteractive -ExecutionPolicy Bypass -File src/com/office-com.ps1`, sends one JSON request on stdin, and reads one JSON result on stdout.

## Host and setup

- Windows with desktop Office (Word, Excel) and **classic Outlook**. New Outlook for Windows has no COM object model.
- `WORKFORCE_WINDOWS_ROOT`: the one folder Word, Excel, and FileSystemObject may touch. Every `path` is relative to it. A path that resolves outside it returns `PATH_OUTSIDE_ROOT` before any COM call.
- `WORKFORCE_POWERSHELL` (optional): `powershell.exe` (default) or `pwsh`.
- Run `com_host_check` first. It reports the OS, PowerShell version, which COM classes are registered, whether classic Outlook answers, the Windows list separator, and whether the root exists.
- On a non-Windows host every COM tool returns `{"error":"UNSUPPORTED_HOST","message":"<os> has no Office COM."}`.

## Errors every COM tool can return

`UNSUPPORTED_HOST`, `NOT_CONFIGURED` (root unset), `PATH_OUTSIDE_ROOT`, `POWERSHELL_UNAVAILABLE`, `OUTLOOK_UNAVAILABLE`, `WORD_UNAVAILABLE`, `EXCEL_UNAVAILABLE`, `NOT_FOUND`, `CONFLICT`, `COM_FAILED` (unparsed PowerShell output), `INVALID_INPUT` (missing or mistyped argument).

## Operation map

| Former operation | Tool | Arguments (`!` = required) | Result | Known gap |
|---|---|---|---|---|
| Add Label to Email | `outlook_add_category` | `entry_id!`, `category!`, `store_id` | `categories_before`, `categories_after` (read back after `Save()`), `added`, `verified`, `in_master_list`, `list_separator` | Labels can nest; Outlook categories are flat. A category missing from the master list is added uncolored. |
| List Labels | `outlook_list_categories` | none | `categories[]` (`name`, `color`, `category_id`), `list_separator` | none for flat labels |
| Send email / create draft | `outlook_create_draft`, then `outlook_send` | `to!`, `subject!`, `body`, `cc`, `bcc`, `html:boolean`; then `entry_id!` | `entry_id`, `saved`; then `sent` | Send can trip the Outlook object-model guard (`SEND_BLOCKED`). |
| Search / read email | `outlook_search`, `outlook_get_message` | `folder` (inbox, sent, drafts, deleted), `query`, `from`, `since`, `until`, `max_results:number`, `filter` (raw DASL or Jet); `entry_id!` | `messages[]` (no body); one message with `body` | Cloud search operators do not exist; use `query`/`from`/dates or a DASL filter. |
| Create calendar event | `outlook_create_event` | `subject!`, `start!`, `end!` (ISO 8601), `location`, `body`, `attendees` (`;`-separated), `send_invites:boolean` | event with `entry_id` | Online-meeting links are not generated. |
| Get events | `outlook_list_events` | `start!`, `end!`, `calendar_entry_id` | `events[]`, recurrences expanded | none |
| Get event details | `outlook_get_event` | `entry_id!` | one event | none |
| Cancel event | `outlook_cancel_event` | `entry_id!`, `message` | `result` = `cancellation_sent` or `deleted` | none |
| Check availability | `outlook_free_busy` | `address!`, `start!`, `minutes_per_slot:number`, `days:number` | `slots[]` (`free`, `tentative`, `busy`, `out_of_office`, `working_elsewhere`) | Other people's free/busy needs Exchange (`FREEBUSY_UNAVAILABLE`). |
| List calendars | `outlook_list_calendars` | none | `calendars[]` per store | Shared cloud calendars have no local equivalent. |
| Create document | `word_create_document` | `path!`, `text`, `overwrite:boolean` | `path`, `created` | No share links or live co-editing. |
| Get document | `word_read_document` | `path!` | `text`, `paragraphs` | Comments and suggestions are not returned. |
| Append text | `word_append_text` | `path!`, `text!` | `appended_chars`, `total_chars` | none |
| Append image | `word_append_image` | `path!`, `image_path!` (under the root) | `inline_shapes` | Image must be a local file, not a URL. |
| Replace text | `word_replace_text` | `path!`, `find!`, `replace!`, `match_case:boolean` | `replacements` | none |
| Create spreadsheet | `excel_create_workbook` | `path!` | `path`, `created` | none |
| Add row(s) | `excel_append_row` | `path!`, `values!:array`, `worksheet`, `table` | `row`, `values` (read back) | No cross-user live sync. |
| Get values in range / get cell | `excel_read_range` | `path!`, `range` (A1; default used range), `worksheet` | `values[][]`, `range` | Cloud-only functions have no Excel equivalent. |
| Update row / cell | `excel_update_range` | `path!`, `range!`, `values!:array` (2-D), `worksheet` | `cells_updated` | none |
| Create worksheet | `excel_add_worksheet` | `path!`, `name!` | `worksheets[]` | none |
| List / read / write / move / delete files, create folder | `fs_list`, `fs_read`, `fs_write`, `fs_move`, `fs_delete`, `fs_create_folder` | `path` (and `recursive:boolean`, `content!`, `overwrite:boolean`, `source!`, `destination!`) | per tool | No sharing, permissions, revision history, or cloud search. A synced OneDrive or SharePoint folder gives sync only. |
| Cloud folder as knowledge source | `fs_list` + `fs_read` + `import_knowledge_file` | as above | knowledge rows | No auto-sync; rerun the import. |
| Web search step | none | none | none | **Gap.** No COM equivalent. Use Claude Code's own web search inside an agent, or `browserless_scrape` on a known URL. |
| Clear rows / delete rows / copy worksheet / create column | none | none | none | **Not yet built.** Write the cells with `excel_update_range` or mark the step UNVERIFIED. |

## Outlook categories and the list separator

`MailItem.Categories` is one string. Microsoft documents it as category names separated by the Windows list separator, which is set in regional settings (often a comma, a semicolon in many European locales). `outlook_add_category` reads the separator from `HKCU:\Control Panel\International\sList` (falls back to the current culture), splits on it, trims, adds the category only if absent (case-insensitive), joins with the separator plus a space, calls `Save()`, re-reads the item by `EntryID`, and sets `verified` only when the new category is present and every earlier category survived.

## Testing

Use disposable data only: a throwaway draft with a test category, a test calendar item, a temp `.docx` and `.xlsx` under the root, and a temp folder for FileSystemObject. Read each result back, then delete the disposable item.

Status on 11/17/2026: not run live. The QA host was Linux with no PowerShell and no Office; every COM tool returned `UNSUPPORTED_HOST`, and the path guard and required-argument checks passed in the offline suite.
