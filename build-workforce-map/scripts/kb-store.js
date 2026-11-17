// kb-store.js: chunking, tokenizing, index building, and BM25 scoring for a
// knowledge store kept in a Claude artifact database.
// Runs in Node (node scripts/kb-store.js <command> ...) and in a browser page
// (paste the functions or load the file as one of the artifact's own files).
// Read references/knowledge-store/claude-artifact-db.md for the full design.

const STOP_WORDS = new Set(("a an and are as at be but by for from has have he her his i if in into is it its " +
  "me my no not of on or our she so than that the their them then there these they this to too up us was we " +
  "were what when which who will with you your").split(" "));

// Very small suffix stemmer: enough to match plural and tense variants.
function stem(w) {
  for (const s of ["ingly", "edly", "ing", "ed", "ies", "es", "s"]) {
    if (w.length > s.length + 3 && w.endsWith(s)) return s === "ies" ? w.slice(0, -3) + "y" : w.slice(0, -s.length);
  }
  return w;
}

// Text -> array of index terms. Same rules at write time and query time.
function tokenize(text) {
  return String(text).toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .split(/[^a-z0-9]+/).filter(t => t.length > 1 && !STOP_WORDS.has(t)).map(stem);
}

// Split text into chunks of about `size` words with `overlap` words shared.
// A line starting with # starts a new section; a section heading is kept at the
// top of every chunk cut from that section.
function chunkText(text, size = 400, overlap = 50) {
  const sections = []; let cur = { heading: "", words: [] };
  for (const line of String(text).split(/\r?\n/)) {
    if (/^#{1,6}\s/.test(line)) { if (cur.words.length) sections.push(cur); cur = { heading: line.replace(/^#+\s*/, ""), words: [] }; }
    else cur.words.push(...line.split(/\s+/).filter(Boolean));
  }
  if (cur.words.length) sections.push(cur);
  const chunks = [];
  for (const s of sections) {
    for (let i = 0; i < s.words.length; i += size - overlap) {
      const body = s.words.slice(i, i + size).join(" ");
      chunks.push((s.heading ? s.heading + "\n" : "") + body);
      if (i + size >= s.words.length) break;
    }
  }
  return chunks;
}

// Stable chunk id: <sourceId>-<position, 4 digits>.
const chunkId = (sourceId, position) => `${sourceId}-${String(position).padStart(4, "0")}`;

// Term counts for one chunk: text plus Claude-written keywords (weighted x2).
function termCounts(chunk) {
  const counts = {};
  for (const t of tokenize(chunk.text)) counts[t] = (counts[t] || 0) + 1;
  for (const t of tokenize((chunk.keywords || []).join(" "))) counts[t] = (counts[t] || 0) + 2;
  return counts;
}

// Build index documents from chunk documents: { terms: {term: {postings, df}}, stats }.
function buildIndex(chunks) {
  const terms = {}; let total = 0;
  for (const c of chunks) {
    const counts = termCounts(c); const len = Object.values(counts).reduce((a, b) => a + b, 0);
    total += len;
    for (const [t, n] of Object.entries(counts)) { (terms[t] ||= { postings: {}, df: 0 }); terms[t].postings[c.id] = n; terms[t].df++; }
  }
  return { terms, stats: { chunk_count: chunks.length, avg_length: chunks.length ? total / chunks.length : 0 } };
}

// BM25 over term documents read from the store.
// termDocs: {term: {postings, df}}; lengths: {chunkId: length}; stats: {chunk_count, avg_length}.
function bm25(queryTerms, termDocs, lengths, stats, k1 = 1.2, b = 0.75) {
  const N = stats.chunk_count || 1, avg = stats.avg_length || 1, scores = {};
  for (const t of new Set(queryTerms)) {
    const d = termDocs[t]; if (!d) continue;
    const idf = Math.log(1 + (N - d.df + 0.5) / (d.df + 0.5));
    for (const [id, tf] of Object.entries(d.postings)) {
      const len = lengths[id] || avg;
      scores[id] = (scores[id] || 0) + idf * (tf * (k1 + 1)) / (tf + k1 * (1 - b + b * len / avg));
    }
  }
  return Object.entries(scores).sort((a, b) => b[1] - a[1]).map(([id, score]) => ({ id, score: +score.toFixed(4) }));
}

// Simple text hash (FNV-1a) to detect an unchanged source.
function hash(text) { let h = 0x811c9dc5; for (const ch of String(text)) { h ^= ch.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16); }

const api = { STOP_WORDS, stem, tokenize, chunkText, chunkId, termCounts, buildIndex, bm25, hash };
if (typeof module !== "undefined") module.exports = api;

// CLI: node kb-store.js chunk <file> <sourceId>   -> JSON array of chunk documents
//      node kb-store.js index <chunks.json>        -> JSON {terms, stats, lengths}
//      node kb-store.js search <index.json> "<question words>" [k]
if (typeof require !== "undefined" && require.main === module) {
  const fs = require("fs"); const [cmd, a, b, c] = process.argv.slice(2);
  if (cmd === "chunk") {
    const text = fs.readFileSync(a, "utf8");
    console.log(JSON.stringify(chunkText(text).map((t, i) => ({ id: chunkId(b, i), source: b, position: i, text: t, length: tokenize(t).length })), null, 1));
  } else if (cmd === "index") {
    const chunks = JSON.parse(fs.readFileSync(a, "utf8")); const idx = buildIndex(chunks);
    idx.lengths = Object.fromEntries(chunks.map(ch => [ch.id, Object.values(termCounts(ch)).reduce((x, y) => x + y, 0)]));
    console.log(JSON.stringify(idx));
  } else if (cmd === "search") {
    const idx = JSON.parse(fs.readFileSync(a, "utf8"));
    console.log(JSON.stringify(bm25(tokenize(b), idx.terms, idx.lengths, idx.stats).slice(0, +(c || 5)), null, 1));
  } else {
    console.log("usage: node kb-store.js chunk <file> <sourceId> | index <chunks.json> | search <index.json> \"<words>\" [k]");
  }
}
