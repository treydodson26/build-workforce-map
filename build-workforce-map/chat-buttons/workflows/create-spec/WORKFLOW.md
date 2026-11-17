---
name: "create-spec"
description: "Turn Trey's raw transcript or the current chat into a clear spec Claude Doc, review it line by line, apply the review fixes, then run create-plan."
---

# /create-spec

## Purpose

Turn Trey's raw thinking into a clear spec. The input is a raw transcript: Trey speaking out loud, unscripted, with pauses, restarts and imperfect wording. The output explains what Trey is doing, why he is doing it, and what outcome he expects. A person or AI agent with zero prior knowledge must be able to read the spec and fully understand the project and its goals.

This is context engineering. You turn what Trey implies into what the spec states.

## Input

- If Trey pastes a transcript or links one after `/create-spec`, use it.
- If he gives nothing, use this chat. Read it in full with `mcp__claude_ai__read_conversation` (conversation_id `current`), paging until every turn is read.

## Boundary

Do not perform the task the transcript describes. This stage only explains and specifies. When the spec is published, reviewed, and fixed, this skill hands off to `/create-plan` automatically (step 10). Do not wait for Trey to type it.

## Steps

1. **Read the whole input.** Ignore filler, false starts and repeated phrases. When Trey corrects himself, keep only his final version.

2. **Write the narrative as Trey.** Write in the first person ("I am building...") to level-set expectations. Cover:
   - What I am doing: the project, the task and its parts
   - Why I am doing it: the problem, the pain, the trigger
   - What I expect: the intended outcome and what success looks like
   - How it fits: related projects, tools, people and systems
   Use plain words, short sentences and one idea per sentence. Define every term the first time it appears.

3. **Infer the missing answers.** For each question below, give the answer the input supports. Mark each answer as Stated (Trey said it) or Inferred (you concluded it), and quote the evidence.
   - Who is the audience or user of the output?
   - What is the deliverable, and in what format?
   - Where must it be saved or delivered?
   - What inputs, files and sources does the work need?
   - What constraints, rules and limits apply?
   - What does done look like, as yes-or-no checks?
   - What is still undecided?

4. **Write the outcome statement and the deliverable requirements.**

   **Outcome statement.** Fill in this line from the input:
   > Upon completion of this task, Trey should see a [Canonical Output Type] titled "[Document Title]," saved as "[Filename]" at [Verified Destination], styled [style or standard].
   Leave a placeholder in brackets for anything the input does not give, and list it under open questions.

   **Deliverable requirements.** List every requirement the deliverable must meet. Write each one so a reviewer who never saw the transcript can check it with a yes or a no. Follow the `anthropic-skills:requirements-writing` skill for language rules and worked examples.
   - Give each requirement an ID: REQ-01, REQ-02, and so on.
   - Write one requirement per row. Start it with "The deliverable must" or "The deliverable must not". Keep each row to 22 words or fewer, with no em dashes and no colons.
   - State exact values: the title, file name, format, location, audience, sections, length, and style rules. Do not use vague words such as "clear", "good", "appropriate", or "professional" unless the row also says how to test them.
   - Group the rows under these headings: Content, Structure and format, Location and naming, Style and language, Quality checks.
   - Put the requirements in a table with these columns: ID, Requirement, How to check, Source. In the Source column, write Stated or Inferred, and quote the evidence, as in step 3.
   - When the input does not give an exact value, write the requirement with a placeholder in brackets, such as "[word count]", and list it under open questions.

   **Seven-characteristic test.** Test every row against all seven characteristics before publishing. A row can fail more than one. Fix the form of a row freely, but never invent a value. When a fix needs a value the input lacks, keep the bracket and list it under open questions.
   1. **Unique and Atomic:** the row holds one rule, and no other row repeats it. Split a row that joins two obligations with "and," "then," or "so." A list inside one rule may stay in one row.
   2. **Concise:** the row states only the rule. Reasons and backstory stay out.
   3. **Testable:** a tester knows the setup and the expected result. Replace words such as "short," "clear," or "good" with a measure.
   4. **Unambiguous:** only one reading is possible. Name every trigger, actor, and object.
   5. **Correct and Complete:** the row matches the real need, including its conditions, such as "only after Trey approves."
   6. **Consistent:** the row does not contradict another row, and it uses the same term for the same thing.
   7. **Feasible:** the work can be done with the tools, access, and time the project has. Keep an infeasible row, and flag it under open questions.

5. **List open questions.** Give each one a recommended answer.

6. **Check the spec cold.** Reread it as a reader who never saw the transcript. Fix any sentence that depends on outside knowledge.

7. **Publish and file the spec.**
   - Publish the spec as a Claude Doc titled "Spec: <topic> (MM_DD_YYYY)", with these sections: Narrative, Answers (Stated and Inferred), Outcome statement, Requirements, Open questions, Related plan, Source.
   - Save it in the artifacts folder named "Specs and Plans". Call `mcp__claude-artifacts__list_folders` first. If the folder does not exist, create it with `mcp__claude-artifacts__create_folder`. Then move the spec into it with `mcp__claude-artifacts__move_to_folder`.
   - Leave the Related plan section as "Plan pending" for now. Step 8 fills it in.
   - Give Trey the link.

8. **Review the spec line by line.** After the spec is published, call the Skill tool with skill `anthropic-skills:review-doc-line-by-line`. Pass the spec's link as the args. That skill reads every block of the spec and posts one anchored comment per finding. It does not change the spec text. Do not ask Trey for permission first. Keep the count of comments by severity (Blocker, Major, Minor) for the close-out.

9. **Apply the review fixes to the spec.** After the review posts its comments or suggestions, apply every fix before you run /create-plan. Do not ask Trey for permission first.
   - #mcp__Claude_Docs__query the comments under the spec body. Take every open thread from this review.
   - For each thread, apply its "How to Fix" steps with #mcp__Claude_Docs__update. Replace by `find` with `"as":"text"`. When the edit removes the commented words, add `"allowDetach": true` on that op.
   - When the review laid suggestions instead of comments, accept each one (topic.suggestions) rather than retyping it.
   - Skip a fix that needs a value the input lacks. Keep its bracket and add it to Open questions.
   - Reply once in each thread: "Applied." or "Not applied: <reason>." Do not resolve threads unless Trey asks in chat.
   - #mcp__Claude_Docs__read the changed blocks back. Confirm each fix landed.
   - Count applied and skipped fixes for the close-out.

10. **Run /create-plan automatically.** After the review fixes are applied and read back, call the Skill tool with skill `create-plan`. Pass the published spec's title and link as the args, so the plan is built from the spec and not from the raw transcript. Tell `/create-plan` to map every REQ ID to at least one step and one acceptance criterion. Do not ask Trey for permission first. If the spec still has open questions, pass them along with their recommended answers, and let `/create-plan` treat those answers as working assumptions. When the plan is published, edit the spec's Related plan section so it links to the plan.

11. **Hand the counts forward. Do not close out here.** The chain has one close-out, and it belongs to `subagent-driven-development` (final review, then activity log, then the deliverables package). Pass the spec link, the spec's review counts by severity, and the count of fixes applied and skipped to `/create-plan`, so the close-out can report them. Reply to Trey from this skill only when the chain stops before execution (see Rules), and then name the step that stopped it.

## Rules

- Never invent facts, names, files or decisions. Mark every inference.
- Keep Trey's own words for key terms and project names.
- Do not plan steps or do the work inside this skill. Planning belongs to `/create-plan`, which this skill calls at the end.
- If `/create-plan` fails or is not available, say so in one line, keep the spec link, and stop.
- If the line-by-line review fails or is not available, report it in one line with the error, mark the spec "Review not run", and continue to `/create-plan`. `/create-plan` must carry that note into its gate report. Never describe an unrun review as passed.
- If a Blocker fix cannot be applied in step 9, pass a short list of the unapplied Blockers to `/create-plan` along with the spec link, so the plan does not build on those problems.
- Never run `/create-plan` before step 9 finishes. The plan must read the corrected spec.
- Never drop a requirement characteristic. Every REQ row passes all seven checks in step 4 (Unique and Atomic, Concise, Testable, Unambiguous, Correct and Complete, Consistent, Feasible), or it stays in Open questions with the failed check named.