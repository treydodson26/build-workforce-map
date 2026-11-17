# The platform docs: `build/agents/build-your-agent/agent-settings/`

6 pages, downloaded on 11/16/2026.


---

# Page: Flow Builder

Path: `build/agents/build-your-agent/agent-settings/flow-builder`.

## Flow Builder

> Carefully craft decisions for your Agent

<Warning>
  This feature is a legacy feature and is found in the Advanced Settings for only some users. If you cannot see the Flow Builder in your account, this means that the feature has been depreciated for you and you will need to use the 

  [Prompt](build__agents__build-your-agent.md) (page `build/agents/build-your-agent/prompt`)

   to guide your Agent moving forward. We depreciated this feature at while this format worked well with older models, it was not compatible with newer models that prefer a text Prompt.
</Warning>

### Overview

The Flow Builder empowers you to give your agent more precise guidance about its tasks by creating conditional logic pathways. Rather than relying solely on general instructions, you can design complex, branching decision trees that help your agent navigate different scenarios with tailored responses and actions.

With Flow Builder, you can:

* Create conditional logic using “if-then” statements
* Build branching decision trees for different conversation paths
* Provide specific instructions for various scenarios
* Enhance your agent’s ability to handle complex interactions

### How Flow Builder Works

Flow Builder operates on a simple yet powerful premise: when certain conditions are met, your agent will follow specific instructions. This conditional logic framework allows your agent to adapt its responses based on the context of the conversation, user inputs, or other variables.

#### Creating Decision Trees

The Flow Builder interface allows you to visually construct decision pathways that your agent will follow. Each pathway consists of:

1. A condition that triggers the pathway
2. Specific instructions for the agent to follow when that condition is met
3. Optional branching paths for further conditional responses

By creating these structured decision trees, you can ensure your agent responds appropriately to different scenarios without having to include every possible variation in your core instructions.

### When to Use Flow Builder

Flow Builder is particularly valuable in the following situations:

* **Complex Customer Support Scenarios**: Create different response paths based on the type of issue a customer reports


---

# Page: General

Path: `build/agents/build-your-agent/agent-settings/general`.

## General

#### Suggest Replies

**What it is:** A toggle that enables automatic reply suggestions after each agent response.

**When to use it:** Enable this feature when you want to:

* Keep conversations flowing naturally
* Save time on typing common responses
* Provide users with quick response options

Simply toggle this on, and your agent will offer clickable reply suggestions after each of its messages.

***

#### Agent Timeout Time

**What it is:** The maximum time your agent can work on a task before timing out.

**How to choose:**

* **Shorter timeouts:** More efficient for simple tasks, saves resources
* **Longer timeouts:** Necessary for complex reasoning, research tasks, or when working with multiple tools

Consider the complexity of your agent’s typical tasks when setting this value.

***

#### Instructions for Naming Tasks

**What it is:** Guidelines that help your agent create clear, consistent names for new tasks.

##### How It Works

When your agent creates a task, it uses the LLM to generate a name based on your instructions. The agent considers the full context—trigger data, workflow, and tools—to create meaningful names. These instructions act as a prompt template guiding the LLM’s naming decision.

##### Writing Effective Instructions

* **Think about scanning:** Put the most important information first
* **Consider your workflow:** Align names with how you organize work
* **Be consistent:** Use the same format across similar agents
* **Include key identifiers:** Customer names, dates, action types, or outcomes
* **Test and iterate:** Run a few tasks and refine based on results

##### Examples by Use Case

<AccordionGroup>
  <Accordion title="Customer Support Agents">
    ```
    Name tasks using this format: [Customer Name] - [Request Type] - [Status]
    Example: John Smith - Refund Request - Completed
    ```
  </Accordion>

  <Accordion title="Content Creation Agents">
    ```
    Start with the content type, followed by the topic and date.
    Example: Blog Post: AI Agents Guide - 2024-11-06
    ```
  </Accordion>

  <Accordion title="Data Processing Agents">
    ```
    Include the data source and action performed.
    Example: Processed: LinkedIn Data Export - 150 records
    ```
  </Accordion>

  <Accordion title="Sales/Lead Management">
    ```
    Use format: [Company Name] - [Action] - [Outcome]
    Example: Acme Corp - Outreach Email - Sent
    ```
  </Accordion>
</AccordionGroup>

##### Best Practices

<Columns cols="2">
  <Card title="Do" icon="circle-check" color="#10b981">
    Provide a clear format or structure for your task names, and make sure to include the most important identifying information first. Use consistent terminology that matches your workflow, and keep your instructions concise but specific. Don’t forget to test with a few tasks and refine your instructions based on what works best for your needs.
  </Card>

  <Card title="Don't" icon="circle-xmark" color="#ef4444">
    Avoid making your instructions too vague or generic—the agent needs clear guidance to create useful names. Don’t include variables that might not always be available in your workflow, and steer clear of complex conditional logic that could confuse the naming process. Remember to specify the order of information so your task names stay consistent.
  </Card>
</Columns>

##### Common Naming Patterns

<AccordionGroup>
  <Accordion title="Chronological">
    **Format:** `[Date] - [Action] - [Subject]`

    **Example:** “2024-11-06 - Email Sent - Product Demo”

    **Best for:** Time-sensitive workflows, audit trails, sequential processes
  </Accordion>

  <Accordion title="Hierarchical">
    **Format:** `[Project] > [Phase] > [Task]`

    **Example:** “Website Redesign > Development > API Integration”

    **Best for:** Complex projects with multiple levels, nested workflows
  </Accordion>

  <Accordion title="Status-based">
    **Format:** `[Status] [Subject] - [Details]`

    **Example:** “Completed: Customer Onboarding - Acme Corp”

    **Best for:** Task tracking, progress monitoring, filtering by completion
  </Accordion>

  <Accordion title="Actor-focused">
    **Format:** `[Who] - [What] - [When]`

    **Example:** “Sarah Johnson - Contract Review - Nov 6”

    **Best for:** Team collaboration, assignment tracking, accountability
  </Accordion>
</AccordionGroup>

***

#### Guide for Using Agent

**What it is:** Simple instructions shown to users when they start a conversation with your agent.

**Best practices:**

* Keep it brief (1-3 sentences)
* Explain what the agent can help with
* Include any specific information users should provide

**Example:** “I’m your research assistant. Tell me what topic you’re exploring, and I’ll help find relevant information and summarize key points.”

***

#### Welcome Message

**What it is:** The first message your agent automatically sends at the start of every new task.

**Tips for effective welcome messages:**

* Introduce the agent’s purpose
* Set clear expectations
* Include a prompt for the user to get started

**Example:** “Hi there! I’m Maya, your marketing assistant. I can help draft social posts, brainstorm campaign ideas, or analyze content performance. What would you like to work on today?”

***

#### Default Prompt for Parent Agents

**What it is:** Instructions that guide how other agents should interact with this agent when working together.

**When to use it:** Configure this when building multi-agent workflows where agents need to collaborate.

This ensures consistent communication between agents and helps maintain workflow integrity.

***

#### Visible in Chat

**What it is:** A toggle that controls whether the agent appears in Chat App discovery features — the @-mention menu and the “Browse agents” list. This is on by default.

**When to use it:** Turn this off when you want to:

* Hide internal or backend agents from casual discovery
* Keep API-only agents out of the Chat UI
* Maintain a cleaner agent list for end users
* Prevent confusion when an agent is designed for programmatic use only

**How to configure:**

1. Open your agent in Agent Builder
2. Navigate to **Advanced Settings** → **General**
3. Toggle **Visible in Chat** off

<Info>
  Turning off “Visible in Chat” only removes the agent from Chat discovery. Hidden agents remain fully accessible via API and direct links — this is a visibility setting, not an access control.
</Info>

***

#### Visual Data Masking

**What it is:** A front-end privacy feature that automatically masks PII (email addresses, phone numbers, credit card numbers, person names) in conversation histories.

**When to use it:** Enable this when handling sensitive customer information, during screen sharing, or when multiple team members review agent conversations.

<Info>
  Visual Data Masking protects what you see in the UI while agents continue to work with actual, unmasked data. [Learn more about Visual Data Masking →](build__agents__build-your-agent__agent-settings.md) (page `build/agents/build-your-agent/agent-settings/visual-data-masking`)
</Info>

***

#### Export Agent

**What it is:** A button that downloads your agent’s complete configuration as a .rai file (JSON format).

**When to use it:**

* Create backups before making major changes
* Share agent configurations with team members
* Transfer agents between environments
* Create templates for similar agents

Your exported file contains all settings, tools, and configurations.

***

#### Agent Autonomy Limit

**What it is:** The maximum number of consecutive tool executions your agent can perform without human approval.

<Warning>
  The autonomy limit tracks **all consecutive tool executions**, not distinct tool invocations. This means tool retries count as separate executions toward your autonomy limit.
</Warning>

##### How It Works

The autonomy limit counts every tool execution, including retries. If a tool is configured to retry on failure, each retry counts as a separate execution toward your limit. For example, if Tool A runs 3 times and Tool B runs 7 times, your agent uses 10 of its autonomy limit. Retries also count toward credit usage.

##### How to Set It

Navigate to **Agent settings** → **General** → **Agent Autonomy Limit** to configure this value.

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cmkc0llyl37xjke4x0a6y9bwr" frameBorder="0" title="How to set Agent Autonomy Limit" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

<Tip>
  If your tools have retry settings enabled, factor those potential retries into your autonomy limit. A tool configured to retry 3 times could consume up to 3 executions of your autonomy limit if it continues to fail.
</Tip>

**Important:** Higher autonomy limits may require longer timeout settings to allow the agent to complete its work.


---

# Page: Language Model

Path: `build/agents/build-your-agent/agent-settings/language-model`.

## Language Model

> Access advanced settings related to the Language Model for your Agent

#### Language Model

**What it is:** The AI engine that powers your agent’s thinking and communication.

**How to choose:**

* **Default model:** Best for most use cases - balanced performance and cost
* **Advanced models:** May offer improved reasoning but at higher cost
* **Specialized models:** Optimized for specific tasks like coding or creative writing

<Tip>
  If you’re just getting started, stick with the default model. You can always upgrade later as your needs evolve.
</Tip>

***

#### Maximum output tokens

**What it is:** Override how much content an agent’s model can generate as part of its reasoning, decision making, and text generation. Explicitly setting a larger limit (8,000 or higher) may be required for agents performing complex tasks with many tools and large inputs.

**How to configure:**

* **Lower limits:** More concise responses, faster performance, lower cost
* **Higher limits:** More detailed responses, but may increase processing time

Adjust based on whether you need brief updates or comprehensive explanations from your agent.

<Warning>
  Higher limits may incur more cost, and setting a value that exceeds the model’s limit may cause the agent to fail.
</Warning>

***

#### Temperature

**What it is:** A slider that controls how creative versus predictable your agent’s responses will be.

**How to set it:**

* **Low (0-0.3):** More focused, consistent responses - ideal for factual tasks, customer support, or data analysis
* **Medium (0.4-0.7):** Balanced creativity and precision - good for general conversation
* **High (0.8-1.0):** More varied, creative responses - better for brainstorming, storytelling, or generating diverse ideas

**Example:** A sales agent might use lower temperature for explaining product specs, but higher temperature when brainstorming marketing ideas.

***

#### Reasoning / Thinking

For supported models, you can configure how much the model reasons before responding. Reasoning uses output tokens to work through complex problems, which improves quality on hard tasks but is slower and costs more.

##### Thinking type and effort level

For supported Claude models, the Thinking setting has two controls: set **Thinking Type** to **Adaptive** to enable reasoning, and use **Effort Level** (Low, Medium, or High — up to Max on some models) to balance quality against speed and cost.

To reach these settings, go to **Agent → Settings → Advanced settings → Language Model**.

These controls appear on:

* Claude Opus 4.6, 4.7, and 4.8
* Claude Sonnet 4.6

<Warning>
  Thinking tokens count as output tokens, not a separate category, so enabling reasoning increases your cost. Monitor usage when you turn it on.
</Warning>

***

#### Parallel Tool Calls <Badge color="orange">Beta</Badge>

**What it is:** Allows an agent to execute multiple tools or hand off multiple tasks to other agents at the same time, rather than one at a time. When enabled, the agent can issue parallel tool calls in a single step, which can significantly reduce overall execution time for workflows with independent operations.

**When to use it:**

* Running multiple independent operations at once (for example, querying several data sources in a single step)
* Gathering information from multiple sources simultaneously
* Reducing overall execution time when individual tool calls don’t depend on each other’s results
* Parallel agent workflows in Workforces where sub-agents can operate independently

**How to configure:**

1. Open your agent and click **Advanced** in the bottom-left of the agent builder
2. In Advanced settings, go to the **Language Model** tab
3. Toggle on **Parallel Tool Calls**
4. For agent-to-agent handovers in the Workforce Builder: select the connection, open **Edge Settings**, and set **Task Behavior** to **Create new task**

<Note>
  If the agent is part of a Workforce, set all of its outbound connections to use **Create new task** as their Task Behavior to get the parallel speedup. The Workforce Builder highlights conflicting connections in yellow as a reminder. See [Edge Settings](build__workforces__build-an-ai-workforce.md) (page `build/workforces/build-an-ai-workforce/edge-settings`) for details on configuring Task Behavior for Workforce connections.
</Note>

***

#### Fallback model

**What it is:** A backup language model that automatically retries failed tasks when your primary model encounters errors or fails to respond. If your agent’s primary model fails to complete a task, the fallback model will automatically retry the task **one time**. If the fallback model also fails, the task will fail as usual and follow your configured error handling behavior.

**When to use it:**

* Using models that occasionally have reliability issues (e.g., Gemini)
* Running critical workflows where you need higher reliability
* You want to reduce task failures due to temporary LLM provider issues

**How to configure it:**

1. Open your agent
2. Click **Advanced** in the bottom-left of the agent builder
3. In Advanced settings, go to the **Language Model** tab
4. Under **Fallback model**, select a model to rerun failed tasks on

<Tip>
  Choose a fallback model from a **different provider** than your primary model. For example, if you’re using Gemini as your primary model, select an OpenAI model (like GPT-5) as your fallback. This eliminates the chance of another provider-specific error and maximizes reliability.
</Tip>


---

# Page: Subagents

Path: `build/agents/build-your-agent/agent-settings/subagents`.

## Subagents

> Add Subagents to your Agent

<Warning>
  This feature is a legacy feature and may be deprecated soon. If you still have access to this feature, you can find this in Advanced Settings. Otherwise, if you cannot see this feature in your account, you will not be able to use it moving forward. If you wish to build a multi-agent system, we recommend using the [Workforce](build__workforces.md) (page `build/workforces/create-a-workforce`) feature instead.
</Warning>

### Sub-Agent Settings

#### Approval Mode

Choose how your parent Agent gets permission to use this Sub-agent:

* **Auto Run**: The Sub-agent runs automatically whenever needed, with no interruptions
* **Approval Required**: You’ll be asked for permission each time before the Sub-agent runs

**When to use each option:**

* Choose **Auto Run** for routine, low-risk tasks you’re comfortable automating completely
* Choose **Approval Required** when you need oversight for sensitive operations or actions with significant impact

#### Max Auto-runs Before Approval

Set a limit on consecutive automatic runs before requiring your approval:

* **No limit**: The Sub-agent can run as many times as needed without stopping for approval
* **Custom number**: After reaching this number of runs within one task, the system will pause and ask for your permission

This setting helps you maintain control over resource usage and repetitive actions while still allowing automation where appropriate.

#### Error Handling Behavior

Decide how errors should be managed when they occur:

* **Use Default Settings**: Follow your workspace’s standard error handling rules
* **Use Custom Settings**: Create specific error handling instructions just for this Sub-agent

Custom settings are particularly useful when a Sub-agent needs special treatment for retries, escalations, or alternative workflows when something goes wrong.

### Communication Settings

#### Usage Instructions

Write clear directions for when and how the parent Agent should use this Sub-agent:

```
Example: "Use this Research Sub-agent whenever you need to gather competitive information or market data. Provide specific search terms and the type of information needed."
```

Good instructions ensure the parent Agent knows exactly when to call on this Sub-agent and what information to provide.

#### Message Template

Create a standardized format for requests sent to the Sub-agent:

```
Example: "Please research {{topic}} and focus on {{specific_aspect}}. The information will be used for {{purpose}}."
```

Variables like `{{topic}}` will be filled in by the parent Agent when making requests. This creates consistency and ensures all necessary context is included with each request.

### Task View Settings

#### View Title

Name your custom dashboard view with a clear, descriptive title:

```
Examples: "Customer Support Interactions" or "Document Processing Tasks"
```

A good title helps you quickly identify and switch between different monitoring views.

#### Information to Include

Select which tools or actions you want to track in this view:

* Search for specific tools (like “Send Email” or “Generate Report”)
* Only tasks using these selected tools will appear in this view
* This filtering helps you focus on the specific workflows you need to monitor

**Pro tip:** Create separate views for different workflows to avoid information overload and make monitoring more efficient.

### Why Task Views Matter

Task Views help you organize and monitor complex Agent workflows by:

* Separating different types of work into focused dashboards
* Reducing noise from unrelated activities
* Making it easier to track progress on specific processes
* Allowing different team members to monitor the aspects most relevant to them


---

# Page: Give Your Agent Tasks

Path: `build/agents/build-your-agent/agent-settings/task-view`.

## Give Your Agent Tasks

### Task View Settings

#### View Title

Enter a clear, descriptive name for your custom Task View. This title will appear in the Task View selector, making it easy to find and switch between your different task dashboards.

**Examples:**

* “Customer Support Tasks”
* “Sales Lead Follow-ups”
* “Content Approval Queue”

**Best Practice:** Choose a name that instantly communicates what type of tasks this view will display.

#### Which Information to Include in the View

Use this search box to select specific tools or information sources you want to monitor in this view. Your custom view will only display tasks that involve the tools you’ve selected here.

**How it works:**

1. Type the name of a tool your Agent uses (e.g., “Send Email”, “Extract Data”, “Escalate to Slack”)
2. Select the relevant tools from the dropdown results
3. Your view will automatically filter to show only tasks using these tools

**Why this matters:** By focusing on specific tools, you can create specialized dashboards that show only the task activity relevant to particular workflows or responsibilities.

#### When to use custom Task Views

Task Views are particularly valuable when:

* Your Agent handles multiple types of tasks using different tools
* You need to monitor specific workflows separately
* You want to reduce clutter and focus only on certain types of Agent activity
* Different team members need to track different aspects of your Agent’s work

By creating targeted views, you can efficiently monitor exactly what matters most to you without being overwhelmed by unrelated task activity.


---

# Page: Visual Data Masking

Path: `build/agents/build-your-agent/agent-settings/visual-data-masking`.

## Visual Data Masking

> Protect sensitive information in the UI while agents continue to work with actual data

<Warning>
  Visual Data Masking is an Enterprise-only feature currently in limited beta. It is not available on Free, Pro, or Team plans. To have this feature enabled for your organization, contact your account manager or reach out to support.
</Warning>

<Warning>
  The AI model used for PII detection can occasionally miss sensitive information. Do not rely on Visual Data Masking as your sole privacy control for highly sensitive data. This is a known limitation of the beta.
</Warning>

Visual Data Masking is a front-end privacy feature that automatically masks standard PII (Personally Identifiable Information) fields in conversation histories and task views. This protects confidential information when viewing agent interactions in the UI, during screen sharing, or when reviewing tasks with your team.

### How Visual Data Masking works

Visual Data Masking operates at the UI layer only. When enabled, sensitive information is masked in what you see on screen, but agents continue to access and process the actual, unmasked data.

<Columns cols="2">
  <Card title="What you see" icon="eye-slash">
    Masked values like `***@***.com` or `***-***-1234` in conversation histories
  </Card>

  <Card title="What agents see" icon="robot">
    Full, unmasked data for processing, reasoning, and tool execution
  </Card>
</Columns>

This approach ensures privacy during UI viewing while maintaining full agent functionality. The backend data remains completely unchanged—Visual Data Masking only affects the display layer.

### When to use Visual Data Masking

Enable Visual Data Masking when you need to protect sensitive information from being visible in the UI:

<AccordionGroup>
  <Accordion title="Handling customer data" icon="users">
    When agents process customer information like email addresses, phone numbers, or payment details, Visual Data Masking prevents this data from being visible to team members reviewing conversations.
  </Accordion>

  <Accordion title="Screen sharing and demos" icon="screen-users">
    During product demonstrations, training sessions, or customer calls where you’re sharing your screen, Visual Data Masking ensures sensitive information isn’t accidentally exposed.
  </Accordion>

  <Accordion title="Team reviews and QA" icon="clipboard-check">
    When multiple team members review agent conversations for quality assurance or training purposes, Visual Data Masking protects customer privacy while allowing evaluation of agent performance.
  </Accordion>

  <Accordion title="Compliance requirements" icon="shield-check">
    For organizations with regulatory requirements around data visibility, Visual Data Masking adds an extra layer of protection when viewing agent interactions. However, it should be used alongside other privacy controls, not as the sole protection mechanism.
  </Accordion>
</AccordionGroup>

### Supported PII types

Visual Data Masking automatically detects and masks the following types of sensitive information:

| PII type            | Example input         | Masked output         |
| ------------------- | --------------------- | --------------------- |
| Email addresses     | `user@example.com`    | `***@***.com`         |
| Phone numbers       | `(555) 123-4567`      | `***-***-1234`        |
| Credit card numbers | `4532 1234 5678 9010` | `****-****-****-9010` |
| Person names        | `John Smith`          | `**** *****`          |

Detection happens automatically in real-time as conversations are displayed in the UI using AI-powered pattern recognition.

### Configuration options

Visual Data Masking is a simple toggle feature with **no advanced configuration options**. When enabled:

* **All four PII types are automatically masked** - You cannot select which types to mask
* **Masking format is fixed** - You cannot customize the placeholder text or masking pattern
* **No detection sensitivity controls** - You cannot adjust the AI detection threshold or rules
* **No custom PII types** - You cannot add organization-specific sensitive data patterns
* **Same rules for all data** - All detected PII is masked using the same approach

This simplicity makes Visual Data Masking easy to enable, but limits flexibility for organizations with specific masking requirements.

### Enabling Visual Data Masking

#### For agents

To enable Visual Data Masking on an agent:

<Steps>
  <Step title="Open agent settings">
    Navigate to your agent in the Agent Builder.
  </Step>

  <Step title="Access Advanced settings">
    Click **Advanced** in the bottom-left navigation panel.
  </Step>

  <Step title="Open the General tab">
    In the Advanced settings panel, click the **General** tab.
  </Step>

  <Step title="Enable Visual Data Masking">
    Toggle on **Visual Data Masking** to enable the feature for this agent.
  </Step>

  <Step title="Save changes">
    Your changes are saved automatically. Visual Data Masking will now apply to all conversation histories for this agent.
  </Step>
</Steps>

#### For workforces

<Warning>
  If any agent in a workforce has Visual Data Masking enabled, the entire workforce will mask PII across all task views and conversation histories — not just that individual agent. Enable this feature at the agent level only when you intend this cascading behavior.
</Warning>

To enable Visual Data Masking on a workforce:

<Steps>
  <Step title="Open workforce settings">
    Navigate to your workforce and click the **Settings** icon in the top right.
  </Step>

  <Step title="Access Advanced settings">
    Click **Advanced** in the settings panel.
  </Step>

  <Step title="Enable Visual Data Masking">
    Toggle on **Visual Data Masking** to enable the feature for this workforce.
  </Step>

  <Step title="Save changes">
    Your changes are saved automatically. Visual Data Masking will now apply to all task views and conversation histories for this workforce.
  </Step>
</Steps>

### What is and isn’t masked

#### What is masked

Visual Data Masking applies to these UI elements:

<CardGroup cols="2">
  <Card title="Agent conversation histories" icon="messages">
    Conversations shown in the Task View
  </Card>

  <Card title="Workforce task displays" icon="list-check">
    Task views showing agent interactions
  </Card>

  <Card title="Message content" icon="comment">
    Messages displayed in conversation logs
  </Card>

  <Card title="Tool inputs and outputs" icon="wrench">
    Tool data visible in the UI conversation flow
  </Card>

  <Card title="Front-end conversation displays" icon="display">
    Anywhere conversation data appears in the platform UI
  </Card>
</CardGroup>

#### What isn’t masked

Visual Data Masking does NOT apply to:

<CardGroup cols="2">
  <Card title="Backend data storage" icon="database">
    Data is stored unmasked in the database
  </Card>

  <Card title="Agent processing" icon="robot">
    Agents always work with unmasked, actual data
  </Card>

  <Card title="Tool execution" icon="gear">
    Tools receive and process unmasked data
  </Card>

  <Card title="LLM requests" icon="brain">
    Language models receive unmasked data for processing
  </Card>

  <Card title="API responses" icon="code">
    Data returned via API is unmasked
  </Card>

  <Card title="Backend logs" icon="file-lines">
    Internal system logs contain unmasked data
  </Card>

  <Card title="Exported message content" icon="file-export">
    Conversation message bodies in data exports are unmasked. The one exception is the CSV conversation export, which masks the agent name (“Run By”) column when Visual Data Masking is enabled
  </Card>

  <Card title="Event streaming" icon="cloud-arrow-up">
    OTEL events exported to S3 are unmasked, except structured fields like email and IP that are always scrubbed. Unstructured content is scrubbed only when PII Redaction is enabled
  </Card>
</CardGroup>

<Warning>
  Visual Data Masking is a UI-only feature. It does not modify, encrypt, or redact data at the storage or processing level. Backend data remains completely unchanged. For backend data protection, see [PII Redaction](#visual-data-masking-vs-pii-redaction).
</Warning>

### Visual Data Masking vs PII Redaction

Visual Data Masking and PII Redaction are **complementary features** that protect sensitive information at different stages. They serve different purposes and are designed to work together for comprehensive privacy protection.

| Feature               | Visual Data Masking                      | PII Redaction                                |
| --------------------- | ---------------------------------------- | -------------------------------------------- |
| **Availability**      | Enterprise only (limited beta)           | Enterprise only                              |
| **Where it applies**  | Front-end UI display                     | Backend data export to S3                    |
| **What it does**      | Visual masking only                      | Data is scrubbed before export               |
| **Data modification** | No - backend data unchanged              | Yes - PII removed from exports               |
| **Use case**          | UI privacy, screen sharing, team reviews | Compliance, audit logs, observability        |
| **Applies to**        | Task View, conversation UI               | S3 event streaming (OTEL)                    |
| **Configuration**     | Toggle only (no options)                 | Advanced (entity types, actions, thresholds) |
| **Detection method**  | AI detection (can miss PII)              | Presidio-powered ML engine                   |
| **Agent access**      | Agents see unmasked data                 | Agents see unmasked data                     |

#### Complementary use

These features are designed to work together, not replace each other:

<Columns cols="2">
  <Card title="Visual Data Masking" icon="eye-slash">
    Protects privacy when humans view agent conversations in the UI. Use for screen sharing, team collaboration, and internal reviews.
  </Card>

  <Card title="PII Redaction" icon="database">
    Protects data exported to your observability infrastructure. Use for compliance, audit logs, and external data analysis.
  </Card>
</Columns>

**Recommended approach:** Enable both features for comprehensive protection:

* **Visual Data Masking** (Enterprise) protects what your team sees in the platform UI
* **PII Redaction** (Enterprise) protects what gets exported to your S3 bucket for compliance

Together, these features provide defense in depth: UI privacy for internal collaboration and backend data protection for external systems.

<Info>
  Learn more about PII Redaction for Event Streaming.
</Info>

### Best practices

<Tabs>
  <Tab title="When to enable">
    ### Enable Visual Data Masking when

    * Your agents handle customer PII regularly
    * Multiple team members review agent conversations
    * You frequently share your screen during demos or training
    * You need an extra layer of privacy protection in the UI
    * Compliance policies require limiting PII visibility

    ### Consider not enabling when

    * You need to see actual values for debugging or troubleshooting
    * Your agents don’t process sensitive information
    * You’re the only person accessing the agent
    * Masked values would make conversation review difficult

    ### Important limitations to consider

    * **Do not rely solely on Visual Data Masking** for critical privacy requirements
    * **Test with sample data** to understand detection accuracy for your use case
    * **Combine with PII Redaction** (Enterprise) for comprehensive privacy protection
    * **Remember AI detection can miss PII** - this is not a foolproof solution
  </Tab>

  <Tab title="Combining with other features">
    ### Layer your security

    Visual Data Masking works best as part of a comprehensive security strategy:

    * **PII Redaction** (Enterprise) - Protect exported audit logs and telemetry data
    * **User Level Authentication** - Ensure users only access their own data in integrations
    * **RBAC** - Control who can access agents and view conversations
    * **Data Retention** - Automatically delete old sensitive data

    Each feature protects data at a different layer, creating defense in depth.
  </Tab>

  <Tab title="Testing and validation">
    ### Verify masking behavior

    Before rolling out Visual Data Masking to production agents:

    1. **Test with sample data** - Run test conversations with known PII to verify masking works as expected
    2. **Check detection accuracy** - Verify that the AI model detects the PII formats you use
    3. **Test edge cases** - Try international phone numbers, unusual email formats, and context-specific data
    4. **Check all views** - Verify masking appears in task views, conversation histories, and workforce views
    5. **Confirm agent functionality** - Ensure agents can still process data correctly despite UI masking
    6. **Review with your team** - Have team members confirm masked values are sufficiently protected

    ### Monitor for edge cases

    * Some PII formats may not be detected (e.g., international phone numbers)
    * Custom data formats may require additional protection
    * Context-specific sensitive information may not be automatically masked
    * AI detection can occasionally miss PII that matches standard patterns
  </Tab>
</Tabs>

### Beta limitations

As an Enterprise limited beta feature, Visual Data Masking has current limitations that users should understand:

<AccordionGroup>
  <Accordion title="AI detection can occasionally miss PII">
    The AI model used for PII detection can occasionally miss sensitive information. Detection accuracy varies based on data format, context, and PII type. This is a known limitation of the beta. Do not rely on Visual Data Masking as your sole privacy control for highly sensitive data.
  </Accordion>

  <Accordion title="No configuration options">
    Visual Data Masking is a simple toggle with no advanced configuration. You cannot choose which PII types to mask, customize the masking format, adjust detection sensitivity, or add custom PII patterns. All four supported PII types are automatically masked when enabled.
  </Accordion>

  <Accordion title="Fixed masking format">
    The masking format (e.g., `***@***.com`) is fixed and cannot be customized. Future versions may offer configurable masking patterns, but currently all PII is masked using the same placeholder style.
  </Accordion>

  <Accordion title="Limited PII type support">
    Only four standard PII types are supported: email addresses, phone numbers, credit card numbers, and person names. Custom sensitive data types specific to your organization cannot be configured for masking.
  </Accordion>

  <Accordion title="Visual only - no data modification">
    Visual Data Masking only affects the UI display. Backend data storage, agent processing, API responses, and data exports all contain unmasked data. This is by design to ensure agents can function properly, but means the feature provides no backend data protection.
  </Accordion>

  <Accordion title="Performance impact on long conversations">
    On very long conversations with extensive PII, there may be a slight delay in rendering masked content. This is typically imperceptible but may be noticeable in extreme cases with thousands of messages.
  </Accordion>
</AccordionGroup>

<Info>
  We’re actively improving Visual Data Masking based on user feedback. If you encounter issues or have feature requests, contact your sales representative or reach out to support.
</Info>

### Related features

<CardGroup cols="2">
  <Card title="Security overview" icon="shield-halved" >
    Learn about the platform’s comprehensive security features and compliance
  </Card>

  <Card title="PII Redaction" icon="database" >
    Protect sensitive data in exported OTEL logs and audit trails (Enterprise)
  </Card>

  <Card title="User Level Authentication" icon="user-lock" >
    Enable users to authenticate with their own credentials for integrations
  </Card>

  <Card title="Workforce Task View" icon="list-check" href="build__workforces__workforce-features.md">
    Monitor and manage workforce tasks with Visual Data Masking enabled
  </Card>
</CardGroup>

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Does Visual Data Masking affect agent performance?">
    No. Visual Data Masking only affects what you see in the UI. Agents continue to process unmasked data with no performance impact. The masking happens during UI rendering, not during agent execution.
  </Accordion>

  <Accordion title="How reliable is the AI detection?">
    The AI model can occasionally miss PII, especially with non-standard formats, international data, or context-specific sensitive information. Detection accuracy is optimized for standard US formats. Do not rely on Visual Data Masking as your sole privacy control for highly sensitive data. Always test with your specific data formats to understand detection accuracy.
  </Accordion>

  <Accordion title="Can I customize which PII types are masked?">
    No. Visual Data Masking is a simple toggle feature with no configuration options. All four supported PII types (email, phone, credit card, person names) are automatically masked when enabled. You cannot select specific types or add custom patterns.
  </Accordion>

  <Accordion title="Can I customize the masking format?">
    No. The masking format is fixed (e.g., `***@***.com` for emails). You cannot customize the placeholder text or masking pattern. This may be available in future releases.
  </Accordion>

  <Accordion title="Will masked data appear in API responses?">
    No. Visual Data Masking only applies to the UI. Data returned via API calls is unmasked. If you need to protect data in API responses, implement masking in your application layer.
  </Accordion>

  <Accordion title="Can I temporarily disable masking to see actual values?">
    Yes. You can toggle Visual Data Masking off in agent or workforce settings at any time. Changes take effect immediately for new page loads.
  </Accordion>

  <Accordion title="Does Visual Data Masking work with embedded chat?">
    Visual Data Masking applies to the platform UI only. If you’ve embedded agents on external websites, Visual Data Masking does not apply to those embedded interfaces.
  </Accordion>

  <Accordion title="How is this different from PII Redaction?">
    Visual Data Masking protects what you see in the UI (front-end only). PII Redaction protects what gets exported to your S3 bucket for audit logs and observability (backend data scrubbing). Both are Enterprise features: Visual Data Masking is a simple toggle currently in limited beta; PII Redaction has advanced configuration options. Use both together for comprehensive protection.
  </Accordion>

  <Accordion title="What happens to data that's already in conversation history?">
    When you enable Visual Data Masking, it applies to all conversation histories immediately, including past conversations. The masking is applied during rendering, so historical data is protected retroactively in the UI. However, the backend data remains unchanged.
  </Accordion>

  <Accordion title="Can I export unmasked data for analysis?">
    Yes. Visual Data Masking primarily affects the UI display, so API responses and backend storage always contain unmasked data, and conversation message content in exports is unmasked. The one exception is the CSV conversation export, which masks the agent name (“Run By”) column when Visual Data Masking is enabled. If you need broader masking of exported data, implement masking in your export pipeline or use PII Redaction (Enterprise) for S3 event streaming.
  </Accordion>

  <Accordion title="Does this protect data sent to LLMs?">
    No. Visual Data Masking is UI-only. Agents send unmasked data to LLMs for processing. This is necessary for agents to function correctly. If you need to protect data sent to LLMs, you must implement pre-processing to scrub data before it reaches the agent.
  </Accordion>
</AccordionGroup>

