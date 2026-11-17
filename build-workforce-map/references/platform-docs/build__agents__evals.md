# The platform docs: `build/agents/evals/`

5 pages, downloaded on 11/16/2026.


---

# Page: Check types

Path: `build/agents/evals/checks`.

## Check types

> What each Check type scores, the fields it takes, and how the Checks tab works

A Check is one pass-or-fail criterion. Every Agent and Workforce has its own library of them in the **Checks** tab, and the same Check can be attached in three places:

* **To a Test** in a Test set — it runs every time that Test is evaluated.
* **To a Monitor dashboard** — it runs on a sampled portion of live tasks.
* **To a one-off evaluation** of already-completed tasks selected from the task list.

This page is the reference for what each type scores. To attach one while building a Test, see [creating Tests](build__agents__evals.md) (page `build/agents/evals/test-sets`).

***

### Check types

When creating a Check, you choose one of the following types:

<AccordionGroup>
  <Accordion title="AI Judge" icon="brain-circuit">
    Uses AI to evaluate the response against criteria you define.

    | Field                           | Description                                                                                                                                                                                                                                                                                                                                                                                                 |
    | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | **Evaluation prompt**           | Describe the criteria for passing                                                                                                                                                                                                                                                                                                                                                                           |
    | **Judge model**                 | Under **Advanced** — select which model evaluates the conversation                                                                                                                                                                                                                                                                                                                                          |
    | **Truncate long conversations** | Under **Advanced** — When enabled, conversations that exceed the judge model’s context window are trimmed from the oldest messages first, and the eval runs on the remaining portion. When disabled, oversized conversations fail with an error instead. Note that trimming removes early context, which can affect score accuracy if your evaluation criteria depend on the beginning of the conversation. |
  </Accordion>

  <Accordion title="Text Includes" icon="text">
    Checks whether the response includes specific text.

    | Field             | Description                               |
    | ----------------- | ----------------------------------------- |
    | **Required text** | The text that must appear in the response |
  </Accordion>

  <Accordion title="Text Equals" icon="equals">
    Checks whether the response exactly matches an expected value.

    | Field              | Description                                  |
    | ------------------ | -------------------------------------------- |
    | **Expected value** | The exact message that should have been sent |
  </Accordion>

  <Accordion title="Tool Usage" icon="screwdriver-wrench">
    Checks whether a specific Tool was used during the conversation.

    | Field                                  | Description                                                                  |
    | -------------------------------------- | ---------------------------------------------------------------------------- |
    | **Tool**                               | Select the tool to check for                                                 |
    | **When the tool is used by the agent** | **At least**, **At most**, **Exactly**, **Used first**, or **Used last**     |
    | **Number of times**                    | The count to compare against, for the At least, At most, and Exactly options |

    You can also assert what the tool was *called with*. Click **Add input condition** to check that an input matched — **Equals**, **Contains**, **Has a value**, or **Matches pattern** for a regular expression.

    When evaluating a Workforce, you can scope a Tool Usage Check to a specific node — a sub-agent or tool in the Workforce — so you can assert that a particular sub-agent used a given tool.
  </Accordion>
</AccordionGroup>

***

### Creating a Check in the Checks tab

Checks can be created from inside a Test as you build it, or on their own here in the library. Either route produces the same reusable Check.

<div style="{ width: '100%', position: 'relative', paddingTop: '56.25%' }">
  <iframe src="https://app.supademo.com/embed/cmpkr397l2hbdqms9w5xddjno" frameBorder="0" title="Creating a Check" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '3px solid #5E43CE', borderRadius: '10px' }" />
</div>

1. Go to the **Evaluate** tab and select **Checks** from the left sidebar.

2. Click **New check**.

3. Enter a **Check name** (e.g., “Professional tone”), then choose a type from the **Select check type...** picker.

4. Fill in the fields for that type — see [Check types](#check-types) above.

5. Click **Save check**. Reopening an existing Check shows **Update check** instead.

<Note>
  Each Test supports up to 10 Checks of its own. Checks attached to a Test are always included when you run that Test. Additional Checks from the Checks tab are not auto-included — expand **Additional options** in the run modal and select them under **Additional checks** before kicking off the run. Those are counted separately from the per-Test limit.
</Note>

***

### The Checks tab

The Checks tab lists every Check on the Agent or Workforce, grouped by type. Filters across the top show where each one is currently attached:

| Filter           | Shows                                      |
| ---------------- | ------------------------------------------ |
| **All checks**   | Every Check on the Agent or Workforce      |
| **In tests**     | Checks attached to at least one Test       |
| **In dashboard** | Checks attached to a Monitor dashboard     |
| **Unused**       | Checks attached nowhere — safe to clean up |

***

Next: Learn how to [run Evals](build__agents__evals.md) (page `build/agents/evals/running-evaluations`) against your Test sets.

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Does a Check made inside a Test stay inside that Test?">
    No. Creating one with **+ New check** while building a Test saves it to your library like any other, so you can attach it to other Tests and to Monitor dashboards afterwards.
  </Accordion>

  <Accordion title="How many Checks can I add to a Test?">
    Each Test supports up to 10 Checks of its own. Checks added under **Additional checks** at run time are counted separately.
  </Accordion>

  <Accordion title="Can the AI Judge evaluate long conversations?">
    Yes, with configuration. The AI Judge Check includes a **Truncate long conversations** toggle in the **Advanced** section when creating a Check. When enabled, conversations that exceed the judge model’s context window are trimmed and evaluated. When disabled, those conversations fail with an error rather than producing a partial result.
  </Accordion>

  <Accordion title="What happens when a conversation is truncated?">
    The oldest messages are removed from the start of the conversation until it fits within the judge model’s context window. The judge is notified that truncation occurred and evaluates the remaining portion. If your evaluation criteria depend on early context — such as the user’s original request or instructions given at the start of the conversation — the result may be less accurate. In those cases, disabling truncation and selecting a model with a larger context window is preferable.
  </Accordion>
</AccordionGroup>


---

# Page: Introduction to Evals

Path: `build/agents/evals/introduction`.

## Introduction to Evals

> Test and evaluate Agents and Workforces with simulated conversations and reusable scoring criteria

Evals is where you test and measure performance. It works on both Agents and Workforces, and lives in the **Evaluate** tab of the Agent or Workforce builder, next to **Build** and **Run**. Use it to create Test sets, define reusable scoring criteria, run evaluations, and monitor quality on live conversations.

<Info>
  New to the platform? The platform Academy has structured courses that walk you through building on the platform step by step.
</Info>

<div
  className="video-embed"
  style="{
  width: '100%',
  position: 'relative',
  paddingTop: '56.25%',
}"
>
  <iframe
    src="https://fast.wistia.net/embed/iframe/a649oyxnk6"
    frameBorder="0"
    title="Meet Evals — set the bar for your AI Agents"
    allow="autoplay; fullscreen"
    webkitAllowFullscreen="true"
    mozAllowFullscreen="true"
    style="{
    position: 'absolute',
    top: 0, left: 0, width: '100%', height: '100%',
    border: 0,
    borderRadius: '0.5rem',
  }"
  />
</div>

### Why use Evals?

Any time you put an Agent to work, you want to be sure it’s accomplishing your business outcomes. That might be increasing marketing qualified leads, or reducing the time it takes to respond to a lead. Evals gives you the confidence that your Agent is hitting the mark with its target audience — and that it still does after the next change.

You write Tests that simulate the users and situations you care about, and Evals scores each one against success criteria you define. Agents and Workforces are non-deterministic — the same input can produce a different answer, and a change to a prompt, a Tool, or a model can shift behavior somewhere you weren’t looking — so holding the Tests and the criteria steady is what makes one version’s score comparable to the next.

<CardGroup cols="3">
  <Card title="Run Tests" icon="flask-vial">
    Build Test sets holding Tests that simulate real user conversations, then attach criteria to score every one automatically.
  </Card>

  <Card title="Reuse criteria" icon="scale-balanced">
    Define a criterion once in the **Checks** tab and attach it to Tests, Monitor dashboards, or ad-hoc evaluations of completed tasks.
  </Card>

  <Card title="Monitor live tasks" icon="chart-line">
    Create Monitor dashboards that score live tasks against the same criteria, with sample-rate controls and per-criterion trend charts over time.
  </Card>
</CardGroup>

***

### Overview of Evals

Evals has five core features, each with its own section in the left sidebar of the Evaluate tab:

* **Test** — Create and manage Test sets. Each Test set holds Tests that simulate users; running a Test produces a conversation with the Agent or Workforce that gets scored by the criteria you attach.
* **Runs** — Past evaluation run results. Browse average scores, tasks evaluated, progress status, cost (Credits and Actions), and creation date for every run.
* **Checks** — Your library of scoring criteria; each one is called a Check. Create a Check once, then attach it to Tests, to Monitor dashboards, or to one-off evaluations of completed tasks.
* **Publish** — Choose which Test sets must pass before your Agent or Workforce can be published. Set a minimum pass rate and optionally block publishing on failure.
* **Monitor** — Track quality on real tasks. Create one or more Monitor dashboards, attach Checks, set a sample rate, and watch scores trend over time.

***

### Cost and billing

Evaluations are billed in credits and actions. Each Test reports what it consumed in the results view.

#### Cost columns



| Column       | What it shows                                                                                                                                                                                                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Credits**  | Vendor credits consumed by the Test — the user-simulation LLM calls, the Agent or Workforce’s own run, and any LLM-based Checks. Click the value to open the full breakdown.                                                                                                          |
| **Actions**  | Actions consumed by the Test — one for each Check, plus the actions from its own Tool runs during the conversation. The evaluation run itself isn’t charged a separate action. This column only appears on usage-based plans; on legacy plans the action cost is included in Credits. |
| **Run time** | The wall-clock duration of the Test’s conversation, measured from its first message to its last. A timing metric, not a charge, and shown per Test only (the Average Score row doesn’t total it).                                                                                     |

#### Cost breakdown

Clicking a **Credits** or **Actions** value opens a breakdown of where that Test’s cost went. It separates the user simulation, the Agent or Workforce’s own run, and the Checks that scored the conversation, so you can see which part drives the cost — usually its own execution.



| Component           | What it covers                                                                                                                                                                                                                                                                |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Scenario Runner** | The LLM calls used to simulate the user. Uses credits only.                                                                                                                                                                                                                   |
| **Agent Execution** | The Agent or Workforce’s own run during the Test. Uses credits, plus the actions from each Tool it runs. These actions were already billed when it ran — they’re shown here for attribution, not charged again. Workforces have no action-level data, so only credits appear. |
| **Checks**          | Each Check that scores the conversation, broken down by model. Each Check uses credits and counts as one action.                                                                                                                                                              |

<Note>
  If any component uses a BYOK (Bring Your Own Key) model — a model configured with your own API key via project keys — that component shows 0 credits in the breakdown. The platform returns zero credits for BYOK model calls because those calls draw from your own API key, not from the platform-provided credits. This applies to the Scenario Runner model, the Agent or Workforce’s own model, and any LLM judge model used in Checks.
</Note>

***

Next: Learn how to [create Tests](build__agents__evals.md) (page `build/agents/evals/test-sets`) — the simulated conversations your Agent gets evaluated against.

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="I don't see the Evaluate tab. How do I get access?">
    Evals is available on every plan. The **Evaluate** tab sits next to **Build** and **Run** in the Agent or Workforce builder — if it isn’t there, contact support.
  </Accordion>

  <Accordion title="How are evaluations billed?">
    Evaluations consume both Actions and Vendor Credits. Each Check costs 1 Action, while Vendor Credits cover the LLM costs of the task run, the user simulator, and any LLM-based Check. Each Test shows its full breakdown in the results — see [Cost columns](#cost-columns) above for details.
  </Accordion>
</AccordionGroup>


---

# Page: Monitoring Evals

Path: `build/agents/evals/monitor`.

## Monitoring Evals

> Score the real conversations your Agent or Workforce is having against Checks, on dashboards you configure per sample rate

The **Monitor** section continuously scores live tasks against [Checks](build__agents__evals.md) (page `build/agents/evals/checks`). Unlike the **Test** section, which runs simulated conversations, Monitor evaluates the real conversations your Agent or Workforce is having.

Monitor is organized into **dashboards** — you can create more than one (for example, one focused on tone, another on tool-use accuracy) and configure each independently.

<Note>
  Dashboards only score the latest published version of your Agent or Workforce, so a resource with no published version collects no data.
</Note>

***

### Creating a Monitor dashboard

1. Go to the **Evaluate** tab and select **Monitor** from the left sidebar.

2. Click **+ New dashboard** and give it a name.

3. Attach one or more Checks from the Checks tab.

4. Set a **Sample rate** — the percentage of incoming tasks to evaluate.

5. Optionally set **Filter tasks** to control which task statuses trigger evaluations. Leave it blank to evaluate all tasks.

6. Save the dashboard.

Once configured, qualifying tasks are automatically scored at the sample rate you’ve set.

***

### Viewing dashboard insights

Each Monitor dashboard shows:

| Metric            | Description                                                           |
| ----------------- | --------------------------------------------------------------------- |
| **Overall score** | Aggregate score across all evaluated tasks in the selected date range |
| **Total runs**    | Number of tasks evaluated                                             |
| **Checks**        | Which Checks are attached to the dashboard                            |

You also get:

* **Overall score timeseries** to spot regressions or improvements over time.
* **Per-Check charts** so you can see which criteria are slipping.
* **Version markers** that line up score changes with each publish.
* **A list of evaluation runs** with score, name, and a drill-in to the full conversation.

<Tip>
  To adjust dashboard settings after initial setup, click the **Settings** button in the top right corner of the dashboard.
</Tip>


---

# Page: Running Evals

Path: `build/agents/evals/running-evaluations`.

## Running Evals

> Run Test sets and individual Tests, read the scores that come back, and require evals to pass before publishing

Once you’ve created [Tests](build__agents__evals.md) (page `build/agents/evals/test-sets`) and defined [Checks](build__agents__evals.md) (page `build/agents/evals/checks`), you’re ready to run evaluations and see how your Agent or Workforce performs. You can run them by hand, or have a publish run them for you.

***

### Running a Test set or a single Test

<div style="{ width: '100%', position: 'relative', paddingTop: '56.25%' }">
  <iframe src="https://app.supademo.com/embed/cmti7qasj1cldqmctrdurd8yj" frameBorder="0" title="Running an evaluation" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '3px solid #5E43CE', borderRadius: '10px' }" />
</div>

You can run an entire Test set at once, or select individual Tests inside it. Note that you cannot bulk-select and run multiple Test sets at the same time.

1. Click the **Evaluate** tab, then select **Test** from the left sidebar to see your Test sets.

2. Open the Test set you want to run.

3. Tick the checkbox next to each Test you want to include. The run button in the header counts your selection, so it reads **Run 1 test**, **Run 3 tests**, and so on. To run the whole set instead, click **Run all** on the Test set itself. Either way, the run modal opens.

4. **Evaluation run name** is pre-filled with the Test set name plus a timestamp. Edit it if you want something you’ll recognize later in Runs.

5. **Version** chooses which version of the Agent or Workforce to evaluate. Defaults to the current version.

6. Optionally expand **Additional options** and select extra Checks from the Checks tab under **Additional checks**. Checks already attached to the Tests are always included.

7. Click **Run** to begin. The simulator generates conversations with your Agent or Workforce from each Test’s Scenario, and the selected Checks score each conversation.

8. Click **View task** on any Test to watch its simulated conversation while the run is still going.

***

### Run summary

The top of the results page shows key metrics:

| Metric            | Description                                   |
| ----------------- | --------------------------------------------- |
| **Average Score** | Overall pass rate across all Tests and Checks |
| **Tasks**         | How many tasks were evaluated                 |
| **Agent Version** | The version that was tested                   |

***

### Understanding Test results

Each Test displays:

| Column       | Description                                                        |
| ------------ | ------------------------------------------------------------------ |
| **Status**   | Running, Completed, or Failed                                      |
| **Name**     | The Test name                                                      |
| **Score**    | Percentage of Checks that passed (shown with progress bar)         |
| **Checks**   | Pass/fail count (e.g., “1/1 passed”)                               |
| **Credits**  | Credits consumed for this Test                                     |
| **Actions**  | Actions consumed for this Test — each Check plus its own Tool runs |
| **Run time** | How long the Test took to complete                                 |

***

### Viewing conversation details

Click **View Conversation** on any Test to see:

1. The full conversation between the simulated user and your Agent or Workforce.

2. Verdicts from every Check included in the run, with detailed explanations of why each Check passed or failed.

For example, an “Empathy shown” Check might show:

> **Pass**: The Agent demonstrated strong empathy throughout the conversation. Key examples include: acknowledging the customer’s frustration with being transferred multiple times (“I completely understand how upsetting it must be to feel like you’re not getting the help you need”), validating her experience with the double charge (“I truly understand how frustrating it is to be charged twice”), and directly addressing her skepticism by saying “I completely understand your concerns, especially given your previous experience.”

***

### Running Evals before publishing

The **Publish** section of the Evaluate tab lets you choose which Test sets must pass before your Agent or Workforce can be published. If the results don’t meet your minimum pass rate, publishing can be blocked.

#### Test sets to run

Select which Test sets to run before publishing. Click **Add test sets** to choose them — all Tests in the selected Test sets will be evaluated.

#### Publish settings

| Setting                                 | Description                                                                                                                                                                                      |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Minimum pass rate (%)**               | The minimum score percentage required for the evaluation to pass (e.g., 100%)                                                                                                                    |
| **Allow publishing even if eval fails** | When unchecked (the default), publishing only goes ahead if the evaluation score meets or exceeds the minimum pass rate. When checked, it publishes regardless of whether the evaluation passes. |

Once configured, click **Save**. When you next publish your Agent, the selected Test sets will run automatically and the results will be checked against your minimum pass rate.

***

Next: Learn about [monitoring Evals](build__agents__evals.md) (page `build/agents/evals/monitor`) — scoring the real conversations your Agent or Workforce is having.

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Can I rerun a previous evaluation?">
    Yes, you can run the same Tests again at any time. Each run is saved in your Runs history, allowing you to compare results across different Agent versions.
  </Accordion>

  <Accordion title="Why is my publish going through when the evaluation failed?">
    Check whether **Allow publishing even if eval fails** is enabled in the Publish section. With it checked, the Agent publishes regardless of the evaluation result.
  </Accordion>
</AccordionGroup>


---

# Page: Creating Tests

Path: `build/agents/evals/test-sets`.

## Creating Tests

> Create Tests that simulate real user conversations with your Agent or Workforce, and group them into Test sets

A **Test** simulates one conversation with your Agent or Workforce. You describe a user in the **Scenario** field — *“You are a long-time customer who was charged twice for the same order”* — and the platform plays that user, generates their messages, and hands back the transcript. The [Checks](build__agents__evals.md) (page `build/agents/evals/checks`) you attach score it.

Tests live in a **Test set**, which is what a run points at — run the whole set, or a single Test inside it.

***

### How to Create a Test

<div style="{ width: '100%', position: 'relative', paddingTop: '56.25%' }">
  <iframe src="https://app.supademo.com/embed/cmpks4e442iakqms93emtc5jn" frameBorder="0" title="Creating a test set" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '3px solid #5E43CE', borderRadius: '10px' }" />
</div>

1. Open your Agent or Workforce in the builder and click the **Evaluate** tab. Select **Test** from the left sidebar.

2. Click **New test set**, name it in the **Create new test set** modal, and click **Create**.

3. Click the Test set you just created to open it.

4. Click **Add test**. The **Add new test** modal opens.

5. Optionally pick one of the five presets under **Start with a preset or write your own** — **Happy path**, **Vague request**, **Frustrated user**, **Off-topic request**, or **Follow-up**. Each fills in the Scenario and an exact first message for you, which you can then edit.

6. Fill in the Test:

   | Field                         | Description                                                                                                                           | Example                                                                   |
   | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
   | **Test name**                 | A descriptive name for this Test                                                                                                      | “Frustrated Customer Complaint”                                           |
   | **Scenario**                  | Describe a persona and situation — the AI generates realistic messages from this                                                      | “You are an impatient customer who wants quick answers about their bill.” |
   | **Run N times**               | How many times to repeat the Test, 1 to 10. AI responses vary run to run, so repeating shows whether it handles the Test consistently | 3                                                                         |
   | **Up to N messages**          | Maximum conversation length, 1 to 50, where each message is one back-and-forth between the simulated user and the Agent or Workforce  | 10                                                                        |
   | **+ Set exact first message** | Optional — pin the simulated user’s opening message instead of letting the AI generate it                                             | “Hi, I need help with a refund for a defective product.”                  |

7. Under **Checks**, attach the criteria this Test is scored against. Checks pass or fail, and are combined into the Test score.

   <Tabs>
     <Tab title="Use existing Check">
       **+ Add existing check** opens your library of existing Checks. Pick the ones you want, up to 10 per Test.
     </Tab>

     <Tab title="Create new Check">
       **+ New check** opens the editor without leaving the Test. Enter a **Check name**, choose a type, configure it, and click **Save check**.
     </Tab>
   </Tabs>

   See [Check types](build__agents__evals.md) (page `build/agents/evals/checks`) for what each type scores and the fields it takes.

8. Set **When the test hits an approval** to control how the Test resolves Tool approvals and escalations mid-conversation:

   | Option             | What it does                                                                   |
   | ------------------ | ------------------------------------------------------------------------------ |
   | **Auto** (default) | The AI approves or rejects based on what a real user in this scenario would do |
   | **Approve all**    | Every approval request is approved automatically                               |
   | **Reject all**     | Every approval request is rejected automatically                               |

9. Optionally set **Tool simulation**. Each Tool on your Agent or Workforce has a **Live** / **Simulated** toggle. Live means the Tool actually runs during the Test — real emails sent, real records updated. Simulated replaces the call with a fake-but-realistic response.

   In Simulated mode you can describe what the Tool should return (leave it empty for a generic response), and open **Advanced** to pick the model that generates it. **Simulate all tools** and **Reset all to live** flip every Tool at once, and the section header shows how many are currently simulated.

   When evaluating a Workforce, Tool simulation is configured per node, so each sub-agent uses its own simulated Tool responses.

10. Click **Save test**. Reopening an existing Test shows the same form titled **Edit test**, with **Update test** to save.

<Tip>
  You can add multiple Tests to a single Test set to evaluate different aspects of its behavior. Each Test can have its own Scenario, message cap, run count, attached Checks, and Tool simulations.
</Tip>

***

### Managing Tests

Tests can be reorganized across Test sets as your testing strategy evolves. Each Test has a dropdown menu (the three-dot icon next to the Test name):

| Operation       | What it does                                        | When to use it                                                                                            |
| --------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Move**        | Relocates the Test to another Test set              | Reorganizing Test sets or consolidating related Tests                                                     |
| **Copy**        | Creates a duplicate of the Test in another Test set | Reusing a Test as a baseline in a different Test set                                                      |
| **Duplicate**   | Creates a copy of the Test in the same Test set     | Quickly creating a variation of an existing Test                                                          |
| **Delete test** | Removes the Test from the set                       | Retiring a Test you no longer run. Selecting several Tests first gives you a bulk **Delete tests** action |

***

### Example Tests

<AccordionGroup>
  <Accordion title="Sales - product knowledge">
    **Name**: Product expertise

    **Scenario**: You are a procurement manager at a mid-sized company evaluating solutions for your team. You need specific details about enterprise pricing tiers, integration capabilities with existing tools like Salesforce and HubSpot, and data security certifications. Ask clarifying questions and compare features against competitors you’re also considering.

    **Up to**: 15 messages

    **Check**: Accurate information (AI Judge)

    * *Evaluation Prompt*: Did the Agent provide accurate product information without making claims that cannot be verified? Responses should be factual, reference actual product capabilities, and acknowledge when information needs to be confirmed by a sales representative.
  </Accordion>

  <Accordion title="Support - escalation handling">
    **Name**: Escalation request

    **Scenario**: You are a paying customer who has experienced a service outage affecting your business operations. You’ve already troubleshooted with the knowledge base articles and need to speak with a senior support engineer or account manager. Be firm but professional in your request, and provide context about the business impact.

    **Up to**: 5 messages

    **Check**: Appropriate escalation (AI Judge)

    * *Evaluation Prompt*: Did the Agent acknowledge the severity of the situation, validate the customer’s need for escalation, and initiate a handoff to a human representative while maintaining a professional and empathetic tone throughout?
  </Accordion>
</AccordionGroup>

***

Next: Read the [Check types](build__agents__evals.md) (page `build/agents/evals/checks`) reference — what each type scores and how the Checks tab works.

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="How many Tests can I have in a Test set?">
    You can add as many Tests as needed to a single Test set. Each Test is evaluated independently and can have its own attached Checks.
  </Accordion>

  <Accordion title="How many Checks can I add to a Test?">
    Each Test supports up to 10 Checks. This applies to Checks defined on the Test itself. Checks added under **Additional checks** at run time are counted separately.
  </Accordion>

  <Accordion title="Can I move Tests between Test sets?">
    Yes. Each Test has a dropdown menu (three-dot icon) with three options: **Move** relocates the Test to another Test set, **Copy** creates a duplicate in another Test set, and **Duplicate** creates a copy in the same Test set.
  </Accordion>
</AccordionGroup>

