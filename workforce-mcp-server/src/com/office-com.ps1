# office-com.ps1: Microsoft Office COM operations for workforce-mcp-server.
# Reads one JSON request on stdin: {"op": "<name>", "args": {...}, "root": "<WORKFORCE_WINDOWS_ROOT>"}.
# Writes one JSON result on stdout. Errors are {"error": "<CODE>", "message": "..."}.
# Requires Windows, desktop Office, and classic Outlook. New Outlook has no COM object model.
$ErrorActionPreference = 'Stop'

function Out-Json($o) { [Console]::Out.Write(($o | ConvertTo-Json -Depth 8 -Compress)) }
function Fail($code, $msg) { Out-Json @{ error = $code; message = $msg }; exit 0 }

$req = [Console]::In.ReadToEnd() | ConvertFrom-Json
$op = [string]$req.op
$a = $req.args
$root = [string]$req.root

# ------------------------------------------------------------ path guard
function Resolve-InRoot([string]$p) {
  if (-not $root) { Fail 'NOT_CONFIGURED' 'WORKFORCE_WINDOWS_ROOT is not set.' }
  $rootFull = [System.IO.Path]::GetFullPath($root).TrimEnd('\') + '\'
  $full = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($rootFull, $p))
  if (-not ($full + '\').StartsWith($rootFull, [System.StringComparison]::OrdinalIgnoreCase)) {
    Fail 'PATH_OUTSIDE_ROOT' "Path '$p' is outside WORKFORCE_WINDOWS_ROOT."
  }
  return $full
}

# ------------------------------------------------------------ host facts
function Get-ListSeparator {
  try { $s = (Get-ItemProperty -Path 'HKCU:\Control Panel\International' -Name sList -ErrorAction Stop).sList; if ($s) { return $s } } catch {}
  return (Get-Culture).TextInfo.ListSeparator
}
function Get-Outlook {
  try { return New-Object -ComObject Outlook.Application } catch { Fail 'OUTLOOK_UNAVAILABLE' "Classic Outlook COM is not available: $($_.Exception.Message)" }
}
function Get-Ns { (Get-Outlook).GetNamespace('MAPI') }
function Get-Item($ns, $id, $store) {
  try { if ($store) { return $ns.GetItemFromID($id, $store) } else { return $ns.GetItemFromID($id) } }
  catch { Fail 'NOT_FOUND' "No Outlook item with entry_id '$id'." }
}
function Split-Cats([string]$s, [string]$sep) {
  if (-not $s) { return @() }
  return @($s.Split($sep) | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' })
}
function Msg($m) {
  @{ entry_id = $m.EntryID; subject = $m.Subject; from = $m.SenderEmailAddress; to = $m.To; cc = $m.CC
     received = $(if ($m.ReceivedTime) { $m.ReceivedTime.ToString('o') } else { $null }); categories = $m.Categories
     unread = $m.UnRead; body = $m.Body }
}
function Evt($e) {
  @{ entry_id = $e.EntryID; subject = $e.Subject; start = $e.Start.ToString('o'); end = $e.End.ToString('o')
     location = $e.Location; organizer = $e.Organizer; required_attendees = $e.RequiredAttendees
     meeting_status = $e.MeetingStatus; body = $e.Body }
}
function Office-Word { try { $w = New-Object -ComObject Word.Application; $w.Visible = $false; $w.DisplayAlerts = 0; return $w } catch { Fail 'WORD_UNAVAILABLE' "Word COM is not available: $($_.Exception.Message)" } }
function Office-Excel { try { $x = New-Object -ComObject Excel.Application; $x.Visible = $false; $x.DisplayAlerts = $false; return $x } catch { Fail 'EXCEL_UNAVAILABLE' "Excel COM is not available: $($_.Exception.Message)" } }
function Release($o) { if ($o) { [void][System.Runtime.InteropServices.Marshal]::ReleaseComObject($o) } }

switch ($op) {
  'com_host_check' {
    $r = @{ os = [System.Environment]::OSVersion.VersionString; is_windows = $true; powershell = $PSVersionTable.PSVersion.ToString(); list_separator = (Get-ListSeparator) }
    foreach ($p in @('Outlook.Application', 'Word.Application', 'Excel.Application')) {
      $key = "Registry::HKEY_CLASSES_ROOT\$p\CLSID"; $r[$p] = Test-Path $key
    }
    try { $o = New-Object -ComObject Outlook.Application; $r.outlook_version = $o.Version; $r.classic_outlook_com = $true } catch { $r.classic_outlook_com = $false; $r.outlook_error = $_.Exception.Message }
    $r.root = $root; $r.root_exists = $(if ($root) { Test-Path -LiteralPath $root } else { $false })
    Out-Json $r
  }

  # -------------------------------------------------------- Outlook mail
  'outlook_add_category' {
    $sep = Get-ListSeparator; $ns = Get-Ns; $m = Get-Item $ns $a.entry_id $a.store_id
    $before = Split-Cats $m.Categories $sep
    $added = $false
    if (-not ($before | Where-Object { $_ -ieq $a.category })) { $after = @($before + [string]$a.category); $added = $true } else { $after = $before }
    $m.Categories = ($after -join "$sep "); $m.Save()
    $check = Get-Item $ns $m.EntryID $a.store_id
    $read = Split-Cats $check.Categories $sep
    $inMaster = $false; foreach ($c in $ns.Categories) { if ($c.Name -ieq $a.category) { $inMaster = $true } }
    $kept = $true; foreach ($c in $before) { if (-not ($read | Where-Object { $_ -ieq $c })) { $kept = $false } }
    Out-Json @{ entry_id = $check.EntryID; list_separator = $sep; categories_before = $before; categories_after = $read; added = $added
                verified = [bool](($read | Where-Object { $_ -ieq $a.category }) -and $kept); in_master_list = $inMaster }
  }
  'outlook_list_categories' {
    $ns = Get-Ns; Out-Json @{ list_separator = (Get-ListSeparator); categories = @($ns.Categories | ForEach-Object { @{ name = $_.Name; color = $_.Color; category_id = $_.CategoryID } }) }
  }
  'outlook_create_draft' {
    $o = Get-Outlook; $m = $o.CreateItem(0); $m.To = $a.to; $m.Subject = $a.subject
    if ($a.cc) { $m.CC = $a.cc }; if ($a.bcc) { $m.BCC = $a.bcc }
    if ($a.html) { $m.HTMLBody = [string]$a.body } else { $m.Body = [string]$a.body }
    $m.Save(); Out-Json @{ entry_id = $m.EntryID; subject = $m.Subject; to = $m.To; saved = $m.Saved }
  }
  'outlook_send' {
    $ns = Get-Ns; $m = Get-Item $ns $a.entry_id $a.store_id
    if ($m.Sent) { Fail 'ALREADY_SENT' 'The item was already sent.' }
    try { $m.Send() } catch { Fail 'SEND_BLOCKED' "Outlook refused to send (object model guard or policy): $($_.Exception.Message)" }
    Out-Json @{ entry_id = $a.entry_id; sent = $true }
  }
  'outlook_search' {
    $ns = Get-Ns
    $folder = $ns.GetDefaultFolder($(switch ([string]$a.folder) { 'sent' { 5 } 'drafts' { 16 } 'deleted' { 3 } default { 6 } }))
    $items = $folder.Items; $items.Sort('[ReceivedTime]', $true)
    $f = @()
    if ($a.filter) { $items = $items.Restrict([string]$a.filter) }
    else {
      if ($a.since) { $f += "[ReceivedTime] >= '" + ([datetime]::Parse($a.since)).ToString('g') + "'" }
      if ($a.until) { $f += "[ReceivedTime] < '" + ([datetime]::Parse($a.until)).ToString('g') + "'" }
      if ($f.Count) { $items = $items.Restrict(($f -join ' AND ')) }
      if ($a.query) { $q = ([string]$a.query).Replace("'", "''"); $items = $items.Restrict("@SQL=(""urn:schemas:httpmail:subject"" LIKE '%$q%' OR ""urn:schemas:httpmail:textdescription"" LIKE '%$q%')") }
      if ($a.from) { $fr = ([string]$a.from).Replace("'", "''"); $items = $items.Restrict("@SQL=""urn:schemas:httpmail:fromemail"" LIKE '%$fr%'") }
    }
    $max = $(if ($a.max_results) { [int]$a.max_results } else { 25 }); $out = @(); $i = 0
    foreach ($m in $items) { if ($i -ge $max) { break }; if ($m.Class -eq 43) { $r = Msg $m; $r.Remove('body'); $out += $r; $i++ } }
    Out-Json @{ folder = $folder.Name; count = $out.Count; messages = $out }
  }
  'outlook_get_message' { $ns = Get-Ns; Out-Json (Msg (Get-Item $ns $a.entry_id $a.store_id)) }

  # -------------------------------------------------------- Outlook calendar
  'outlook_create_event' {
    $o = Get-Outlook; $e = $o.CreateItem(1); $e.Subject = $a.subject; $e.Start = [datetime]::Parse($a.start); $e.End = [datetime]::Parse($a.end)
    if ($a.location) { $e.Location = $a.location }; if ($a.body) { $e.Body = $a.body }
    if ($a.attendees) { $e.MeetingStatus = 1; foreach ($x in ([string]$a.attendees).Split(';')) { if ($x.Trim()) { [void]$e.Recipients.Add($x.Trim()) } } ; [void]$e.Recipients.ResolveAll() }
    $e.Save(); if ($a.attendees -and $a.send_invites) { $e.Send() }
    Out-Json (Evt $e)
  }
  'outlook_list_events' {
    $ns = Get-Ns; $cal = $(if ($a.calendar_entry_id) { $ns.GetFolderFromID($a.calendar_entry_id) } else { $ns.GetDefaultFolder(9) })
    $items = $cal.Items; $items.IncludeRecurrences = $true; $items.Sort('[Start]')
    $s = [datetime]::Parse($a.start); $en = [datetime]::Parse($a.end)
    $items = $items.Restrict("[Start] < '" + $en.ToString('g') + "' AND [End] > '" + $s.ToString('g') + "'")
    $out = @(); foreach ($e in $items) { $r = Evt $e; $r.Remove('body'); $out += $r; if ($out.Count -ge 500) { break } }
    Out-Json @{ calendar = $cal.Name; count = $out.Count; events = $out }
  }
  'outlook_get_event' { $ns = Get-Ns; Out-Json (Evt (Get-Item $ns $a.entry_id $a.store_id)) }
  'outlook_cancel_event' {
    $ns = Get-Ns; $e = Get-Item $ns $a.entry_id $a.store_id
    if ($e.MeetingStatus -eq 1) { $e.MeetingStatus = 5; if ($a.message) { $e.Body = [string]$a.message }; $e.Send(); $mode = 'cancellation_sent' } else { $e.Delete(); $mode = 'deleted' }
    Out-Json @{ entry_id = $a.entry_id; result = $mode }
  }
  'outlook_free_busy' {
    $ns = Get-Ns; $r = $ns.CreateRecipient($a.address); if (-not $r.Resolve()) { Fail 'NOT_FOUND' "Outlook cannot resolve '$($a.address)'." }
    $mins = $(if ($a.minutes_per_slot) { [int]$a.minutes_per_slot } else { 30 }); $start = [datetime]::Parse($a.start).Date
    try { $fb = $r.FreeBusy($start, $mins, $true) } catch { Fail 'FREEBUSY_UNAVAILABLE' "Free/busy needs Exchange or a published calendar: $($_.Exception.Message)" }
    $days = $(if ($a.days) { [int]$a.days } else { 1 }); $n = [int](($days * 1440) / $mins); $slots = @()
    for ($i = 0; $i -lt [Math]::Min($n, $fb.Length); $i++) { $slots += @{ start = $start.AddMinutes($i * $mins).ToString('o'); state = @('free', 'tentative', 'busy', 'out_of_office', 'working_elsewhere')[[int][string]$fb[$i]] } }
    Out-Json @{ address = $a.address; minutes_per_slot = $mins; slots = $slots }
  }
  'outlook_list_calendars' {
    $ns = Get-Ns; $out = @()
    foreach ($st in $ns.Stores) { try { $c = $st.GetDefaultFolder(9); $out += @{ name = $c.Name; entry_id = $c.EntryID; store = $st.DisplayName } } catch {} ; try { foreach ($f in $st.GetDefaultFolder(9).Folders) { $out += @{ name = $f.Name; entry_id = $f.EntryID; store = $st.DisplayName } } } catch {} }
    Out-Json @{ calendars = $out }
  }

  # -------------------------------------------------------- Word
  'word_create_document' {
    $p = Resolve-InRoot $a.path; if ((Test-Path -LiteralPath $p) -and -not $a.overwrite) { Fail 'CONFLICT' "File exists: $p. Pass overwrite: true." }
    $w = Office-Word; try { $d = $w.Documents.Add(); if ($a.text) { $d.Content.Text = [string]$a.text }; $d.SaveAs2([ref]$p, [ref]16); $d.Close(); Out-Json @{ path = $p; created = $true } } finally { $w.Quit(); Release $w }
  }
  'word_read_document' {
    $p = Resolve-InRoot $a.path; if (-not (Test-Path -LiteralPath $p)) { Fail 'NOT_FOUND' "No file at $p." }
    $w = Office-Word; try { $d = $w.Documents.Open($p, $false, $true); $t = $d.Content.Text; $pc = $d.Paragraphs.Count; $d.Close([ref]0); Out-Json @{ path = $p; paragraphs = $pc; text = $t } } finally { $w.Quit(); Release $w }
  }
  'word_append_text' {
    $p = Resolve-InRoot $a.path; if (-not (Test-Path -LiteralPath $p)) { Fail 'NOT_FOUND' "No file at $p." }
    $w = Office-Word; try { $d = $w.Documents.Open($p); $d.Content.InsertParagraphAfter(); $d.Content.InsertAfter([string]$a.text); $d.Save(); $len = $d.Content.Text.Length; $d.Close(); Out-Json @{ path = $p; appended_chars = ([string]$a.text).Length; total_chars = $len } } finally { $w.Quit(); Release $w }
  }
  'word_append_image' {
    $p = Resolve-InRoot $a.path; $img = Resolve-InRoot $a.image_path
    foreach ($x in @($p, $img)) { if (-not (Test-Path -LiteralPath $x)) { Fail 'NOT_FOUND' "No file at $x." } }
    $w = Office-Word; try { $d = $w.Documents.Open($p); $d.Content.InsertParagraphAfter(); $r = $d.Paragraphs.Last.Range; [void]$d.InlineShapes.AddPicture($img, $false, $true, $r); $d.Save(); $n = $d.InlineShapes.Count; $d.Close(); Out-Json @{ path = $p; inline_shapes = $n } } finally { $w.Quit(); Release $w }
  }
  'word_replace_text' {
    $p = Resolve-InRoot $a.path; if (-not (Test-Path -LiteralPath $p)) { Fail 'NOT_FOUND' "No file at $p." }
    $w = Office-Word
    try {
      $d = $w.Documents.Open($p); $before = ([regex]::Matches($d.Content.Text, [regex]::Escape([string]$a.find), $(if ($a.match_case) { 'None' } else { 'IgnoreCase' }))).Count
      $f = $d.Content.Find; [void]$f.Execute([string]$a.find, [bool]$a.match_case, $false, $false, $false, $false, $true, 1, $false, [string]$a.replace, 2)
      $d.Save(); $d.Close(); Out-Json @{ path = $p; replacements = $before }
    } finally { $w.Quit(); Release $w }
  }

  # -------------------------------------------------------- Excel
  'excel_create_workbook' {
    $p = Resolve-InRoot $a.path; if (Test-Path -LiteralPath $p) { Fail 'CONFLICT' "File exists: $p." }
    $x = Office-Excel; try { $wb = $x.Workbooks.Add(); $wb.SaveAs($p, 51); $wb.Close($false); Out-Json @{ path = $p; created = $true } } finally { $x.Quit(); Release $x }
  }
  'excel_append_row' {
    $p = Resolve-InRoot $a.path; if (-not (Test-Path -LiteralPath $p)) { Fail 'NOT_FOUND' "No file at $p." }
    $x = Office-Excel
    try {
      $wb = $x.Workbooks.Open($p); $ws = $(if ($a.worksheet) { $wb.Worksheets.Item([string]$a.worksheet) } else { $wb.Worksheets.Item(1) })
      $vals = @($a.values)
      if ($a.table) { $lo = $ws.ListObjects.Item([string]$a.table); $row = $lo.ListRows.Add(); for ($i = 0; $i -lt $vals.Count; $i++) { $row.Range.Cells.Item(1, $i + 1).Value2 = $vals[$i] }; $rn = $row.Range.Row }
      else { $used = $ws.UsedRange; $rn = $(if ($ws.Application.WorksheetFunction.CountA($ws.Cells) -eq 0) { 1 } else { $used.Row + $used.Rows.Count }); for ($i = 0; $i -lt $vals.Count; $i++) { $ws.Cells.Item($rn, $i + 1).Value2 = $vals[$i] } }
      $read = @(); for ($i = 0; $i -lt $vals.Count; $i++) { $read += $ws.Cells.Item($rn, $i + 1).Value2 }
      $wb.Save(); $wb.Close($false); Out-Json @{ path = $p; worksheet = $ws.Name; row = $rn; values = $read }
    } finally { $x.Quit(); Release $x }
  }
  'excel_read_range' {
    $p = Resolve-InRoot $a.path; if (-not (Test-Path -LiteralPath $p)) { Fail 'NOT_FOUND' "No file at $p." }
    $x = Office-Excel
    try {
      $wb = $x.Workbooks.Open($p, 0, $true); $ws = $(if ($a.worksheet) { $wb.Worksheets.Item([string]$a.worksheet) } else { $wb.Worksheets.Item(1) })
      $rg = $(if ($a.range) { $ws.Range([string]$a.range) } else { $ws.UsedRange }); $rows = @()
      for ($r = 1; $r -le $rg.Rows.Count; $r++) { $row = @(); for ($c = 1; $c -le $rg.Columns.Count; $c++) { $row += $rg.Cells.Item($r, $c).Value2 }; $rows += , $row }
      $addr = $rg.Address($false, $false); $wb.Close($false); Out-Json @{ path = $p; worksheet = $ws.Name; range = $addr; values = $rows }
    } finally { $x.Quit(); Release $x }
  }
  'excel_update_range' {
    $p = Resolve-InRoot $a.path; if (-not (Test-Path -LiteralPath $p)) { Fail 'NOT_FOUND' "No file at $p." }
    $x = Office-Excel
    try {
      $wb = $x.Workbooks.Open($p); $ws = $(if ($a.worksheet) { $wb.Worksheets.Item([string]$a.worksheet) } else { $wb.Worksheets.Item(1) })
      $start = $ws.Range([string]$a.range).Cells.Item(1, 1); $vals = @($a.values); $n = 0
      for ($r = 0; $r -lt $vals.Count; $r++) { $row = @($vals[$r]); for ($c = 0; $c -lt $row.Count; $c++) { $start.Offset($r, $c).Value2 = $row[$c]; $n++ } }
      $wb.Save(); $wb.Close($false); Out-Json @{ path = $p; worksheet = $ws.Name; cells_updated = $n }
    } finally { $x.Quit(); Release $x }
  }
  'excel_add_worksheet' {
    $p = Resolve-InRoot $a.path; if (-not (Test-Path -LiteralPath $p)) { Fail 'NOT_FOUND' "No file at $p." }
    $x = Office-Excel
    try {
      $wb = $x.Workbooks.Open($p); foreach ($s in $wb.Worksheets) { if ($s.Name -ieq $a.name) { $wb.Close($false); Fail 'CONFLICT' "Worksheet '$($a.name)' exists." } }
      $ws = $wb.Worksheets.Add([Type]::Missing, $wb.Worksheets.Item($wb.Worksheets.Count)); $ws.Name = [string]$a.name; $wb.Save()
      $names = @($wb.Worksheets | ForEach-Object { $_.Name }); $wb.Close($false); Out-Json @{ path = $p; worksheets = $names }
    } finally { $x.Quit(); Release $x }
  }

  # -------------------------------------------------------- FileSystemObject
  'fs_list' {
    $fso = New-Object -ComObject Scripting.FileSystemObject; $p = Resolve-InRoot $(if ($a.path) { $a.path } else { '.' })
    if (-not $fso.FolderExists($p)) { Fail 'NOT_FOUND' "No folder at $p." }
    $out = @(); $stack = New-Object System.Collections.Stack; $stack.Push($fso.GetFolder($p))
    while ($stack.Count) { $f = $stack.Pop(); foreach ($x in $f.Files) { $out += @{ path = $x.Path; type = 'file'; size = $x.Size; modified = $x.DateLastModified.ToString('o') } }; foreach ($d in $f.SubFolders) { $out += @{ path = $d.Path; type = 'folder' }; if ($a.recursive) { $stack.Push($d) } } }
    Out-Json @{ path = $p; items = $out }
  }
  'fs_read' {
    $fso = New-Object -ComObject Scripting.FileSystemObject; $p = Resolve-InRoot $a.path
    if (-not $fso.FileExists($p)) { Fail 'NOT_FOUND' "No file at $p." }
    $ts = $fso.OpenTextFile($p, 1, $false, -2); $t = $(if ($ts.AtEndOfStream) { '' } else { $ts.ReadAll() }); $ts.Close(); Out-Json @{ path = $p; content = $t }
  }
  'fs_write' {
    $fso = New-Object -ComObject Scripting.FileSystemObject; $p = Resolve-InRoot $a.path
    if ($fso.FileExists($p) -and -not $a.overwrite) { Fail 'CONFLICT' "File exists: $p. Pass overwrite: true." }
    $ts = $fso.CreateTextFile($p, $true, $true); $ts.Write([string]$a.content); $ts.Close(); Out-Json @{ path = $p; bytes = $fso.GetFile($p).Size }
  }
  'fs_move' {
    $fso = New-Object -ComObject Scripting.FileSystemObject; $s = Resolve-InRoot $a.source; $d = Resolve-InRoot $a.destination
    if ($fso.FileExists($s)) { $fso.MoveFile($s, $d) } elseif ($fso.FolderExists($s)) { $fso.MoveFolder($s, $d) } else { Fail 'NOT_FOUND' "Nothing at $s." }
    Out-Json @{ source = $s; destination = $d; moved = $true }
  }
  'fs_delete' {
    $fso = New-Object -ComObject Scripting.FileSystemObject; $p = Resolve-InRoot $a.path
    if ($fso.FileExists($p)) { $fso.DeleteFile($p, $false) } elseif ($fso.FolderExists($p)) { $fso.DeleteFolder($p, $false) } else { Fail 'NOT_FOUND' "Nothing at $p." }
    Out-Json @{ path = $p; deleted = $true }
  }
  'fs_create_folder' {
    $fso = New-Object -ComObject Scripting.FileSystemObject; $p = Resolve-InRoot $a.path
    if ($fso.FolderExists($p)) { Fail 'CONFLICT' "Folder exists: $p." }
    [void]$fso.CreateFolder($p); Out-Json @{ path = $p; created = $true }
  }
  default { Fail 'UNKNOWN_OP' "Unknown COM operation '$op'." }
}
