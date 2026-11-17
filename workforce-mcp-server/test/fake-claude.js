#!/usr/bin/env node
// Stand-in for the claude CLI in tests. Echoes a deterministic reply as claude -p JSON.
const args = process.argv.slice(2);
if (args[0] === "--version") { console.log("fake-claude 0.0.0"); process.exit(0); }
const prompt = args[args.indexOf("-p") + 1] || "";
const sys = args.includes("--append-system-prompt") ? args[args.indexOf("--append-system-prompt") + 1] : "";
let result;
if (/Reply with PASS or FAIL/.test(prompt)) result = /refund/i.test(prompt) ? "PASS\nMentions the refund." : "FAIL\nNo refund.";
else if (/simulating a user/.test(prompt)) result = "I was charged twice. Can I get a refund?";
else result = `REPLY[${sys.split("\n")[0].slice(0, 40)}]: ${prompt.slice(-80)} refund approved`;
const emit = () => console.log(JSON.stringify({ type: "result", is_error: false, result, total_cost_usd: 0.001 }));
if (/SLOW/.test(prompt)) setTimeout(emit, 8000); else emit();
