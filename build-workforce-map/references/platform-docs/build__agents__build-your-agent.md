# The platform docs: `build/agents/build-your-agent/`

7 pages, downloaded on 11/16/2026.


---

# Page: Alerts

Path: `build/agents/build-your-agent/alerts`.

## Alerts

> Set up rules to get notified when your agent encounters an issue, reaches a threshold, or gets updated.

Set up rules to get notified when your agent encounters an issue, reaches a threshold, or gets updated.

<Note>
  Alerts are available on paid plans only.
</Note>

### Alert rules

Stay on top of agent issues by creating alert rules that notify you automatically when specific events occur. Each rule has a **trigger condition** (what happened) and one or more **notification channels** (where to send it).

#### Alert types

<CardGroup cols="3">
  <Card title="Status change" icon="rotate">
    Triggers when an agent task enters one or more specific statuses you select.
  </Card>

  <Card title="Tool error" icon="wrench">
    Triggers when a tool fails during execution, optionally scoped to specific tools.
  </Card>

  <Card title="Agent published" icon="rocket">
    Triggers when the agent is published. No additional configuration needed.
  </Card>
</CardGroup>

##### Status change

Triggers when an agent task enters one or more specific statuses. Select which statuses you want to be alerted on from the multi-select dropdown.

<Accordion title="Available statuses">
  Starting up, Waiting for capacity, Pending approval, Running, Cancelled, Idle, Timed out, Escalated, Unrecoverable error, Paused, Completed, Exhausted retries, Queued for approval, and Queued for rerun.
</Accordion>

<Tip>
  A common configuration is to alert on failure states like **Timed out**, **Unrecoverable error**, and **Exhausted retries** so your team can respond quickly when something goes wrong.
</Tip>

##### Tool error

Triggers when a tool fails during execution. You can optionally scope this to specific tools — leave the selection empty to watch all tools, or pick individual tools to monitor. This is useful for critical integrations where a tool failure could block your agent’s workflow.

##### Agent published

Triggers when the agent is published. No additional configuration is needed — select a notification channel and you’ll be alerted whenever a new version goes live.

#### Notification channels

Each alert rule can send notifications to one or more channels:

<CardGroup cols="3">
  <Card title="Email" icon="envelope">
    Add one or more email addresses. No OAuth connection required.
  </Card>

  <Card title="Slack" icon="slack" iconType="brand">
    Connect your Slack workspace via OAuth, then select a channel.
  </Card>

  <Card title="Microsoft Teams" icon="microsoft" iconType="brand">
    Connect your Microsoft Teams account via OAuth, then select a team and channel.
  </Card>
</CardGroup>

For Slack setup details, see Slack integration (page `integrations/popular-integrations/slack`). For Teams, see Microsoft Teams integration (page `integrations/popular-integrations/microsoft-teams`).

#### Setting up an alert rule

1. Navigate to your agent and open the **Alerts** tab
2. Click **Create alert rule**
3. Select a trigger type from the left panel
4. Configure the trigger conditions (if applicable)
5. Preview how the notification will look
6. Add at least one notification channel
7. Click **Save**

You can create multiple alert rules, each with different triggers and channels. Existing rules appear as cards showing the trigger description, active channels, and controls to edit, delete, or toggle them on/off.

***

### Agent escalations

When your agent encounters a situation it cannot handle, it can escalate the conversation to a human manager using the built-in **Escalate to Manager** tool.

This is different from alert rules — escalation is an in-conversation handoff where the agent actively routes a conversation to a human, rather than a background notification about an event.

#### Enabling the escalation tool

In the **Agent escalations** section at the bottom of the Alerts page, click **Enable escalation tool**. This adds the “Escalate to Manager” tool to your agent’s available tools.

Once enabled, you can reference the tool in your agent’s prompt using the **/** command to give the agent guidance on when to escalate. Click **Edit prompt** to go directly to the prompt editor.

#### When to use escalation

<CardGroup cols="2">
  <Card title="Complex technical support" icon="headset">
    Issues requiring specialized knowledge beyond the agent’s training.
  </Card>

  <Card title="Sensitive situations" icon="hand-holding-heart">
    Customer service scenarios that need human empathy and judgment.
  </Card>

  <Card title="Product feedback" icon="comment">
    Detailed feedback that should reach product managers directly.
  </Card>

  <Card title="High-value sales" icon="handshake">
    Opportunities requiring personalized human attention.
  </Card>
</CardGroup>


---

# Page: Memory

Path: `build/agents/build-your-agent/memory`.

## Memory

> Extract and recall metadata from your Agent's task output



### Overview

Memory in the platform allows your agent to remember and recall information during and across conversations. There are two types of memory that serve different purposes:

<Columns cols="2">
  <Card title="Short-Term Memory" icon="list" href="#short-term-memory">
    Also known as **Metadata**

    What your agent remembers during a **single conversation** or agent run. This information is used to maintain context and consistency throughout that specific interaction.
  </Card>

  <Card title="Long-Term Memory" icon="brain" href="#long-term-memory">
    Persistent across all conversations

    What your agent remembers across **all conversations and agent runs** moving forward. This persistent memory allows your agent to build upon previous interactions and provide personalized experiences over time.
  </Card>
</Columns>

These memory systems help make your conversations:

* **Searchable** - Find exactly what you need
* **Filterable** - Sort conversations by specific criteria
* **Consistent** - Ensure the same data is used throughout conversations
* **Intuitive** - Easily recall and update memorized data when needed

### Short-Term Memory

<Info>
  Short-Term Memory is also known as Metadata.
</Info>

Short-Term Memory allows your agent to remember information throughout one conversation. Setup organized memory metadata that your agent can recognize and update as each conversation progresses. This not only can improve the effectiveness of an agent but also can be used to filter, search and analyze tasks.

<Note>
  When using short-term memory in a Workforce with multiple agents, the metadata persists throughout the entire workforce run as long as agents are configured to “continue same task” (rather than “create new task”). This means all agents in the workflow can read and update the same metadata, making it useful for tracking information across your entire multi-agent process.
</Note>

Adding Short-Term Memory allows you to enrich and recall your data with additional context:

1. Navigate to the Build tab located at the top of your screen, adjacent to Tasks
2. Click on “Memory” in the left sidebar navigation menu
3. Choose your extraction method (Agent-decided or Rule-based)
4. Define the appropriate data format and configure your settings
5. Click the “Save” button to apply your changes

<Tip>
  Consider what information would be most valuable for future analysis when deciding which metadata to add. Focus on data points that will help you segment, filter, or understand patterns in your agent interactions.
</Tip>

#### Delete Memory

To remove memory that’s no longer needed:

1. Find the memory field you want to remove in the Memory page
2. Click the delete (trash) icon next to the field

<Warning>
  Deleting memory is permanent and will remove this information from all associated conversations or tasks. Make sure you no longer need this data before proceeding.
</Warning>

#### Edit Memory Field

To modify an existing memory field:

1. Find the memory field you want to edit in the Memory page
2. Click the edit (pencil) icon next to the field
3. Update the field name, data format, or extraction method as needed
4. Save your changes

#### Memory Extraction Methods

The platform offers two approaches for extracting memory metadata:

##### Let Agent Decide

With this option, you provide instructions to your agent about how and when to extract fields from memory. You define guidelines for the agent to follow when determining memory values, making it ideal for complex scenarios where context-aware judgment is needed.

##### Rule Based

Improve memory accuracy by defining specific conditions based on tools & triggers. This approach is either triggered to update after tool run or after trigger received, making it perfect for consistent, predictable data points that follow clear patterns.

#### Data Formats for Short-Term Memory

You can add the following data formats as metadata:

1. **Text** - Free-form text entries for descriptions, notes, or other unstructured information
2. **Number** - Numerical values for quantitative data, supporting integers and decimal values
3. **True/False** - Binary values for yes/no or true/false conditions
4. **Single Option** - Predefined list where only one value can be selected
5. **Multiple Option** - Predefined list where multiple values can be selected

<Tip>
  Choose the appropriate data format based on how you plan to use the metadata later. For example, if you want to calculate averages or totals, use the number format. If you need to filter by specific categories, single or multiple option formats work best.
</Tip>

#### Built-in Tools

When metadata is added to the Agent, the following built-in tools will be automatically added:

* **Add conversation metadata** - Allows you to add conversation metadata during agent interactions
* **Read conversation metadata** - Enables reading existing conversation metadata

This then allows you to add to the Prompt when you want to add conversation metadata, giving you more control over when and how metadata is captured and used.

#### Filtering by Short-Term Memory

You can filter your Workforces and Agent conversations/runs by Short-Term Memory metadata. For example, if you’ve built an agent that uses metadata like an email or user ID for each person, you can filter agent runs by a person’s email or ID to see all their interactions.



#### Best Practices

* **Be consistent**: Use standardized naming conventions and values for your memory fields
* **Start small**: Begin with a few key memory fields and expand as needed
* **Review regularly**: Periodically assess which memory fields are providing value
* **Document your schema**: Keep track of what each memory field represents and how it should be used

By effectively utilizing memory, you can transform raw conversation data into structured, actionable insights that drive better decision-making and agent performance.

#### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Does short-term memory persist across agents in a Workforce?">
    Yes. When agents in a Workforce are configured to ‘continue same task,’ short-term memory persists across all agents involved in that workforce run. This allows metadata to be shared and updated by multiple agents working on the same task. If agents are configured to ‘create new task,’ each agent will have its own separate short-term memory.
  </Accordion>
</AccordionGroup>

***

### Long-Term Memory

Long-Term Memory allows your agent to remember information across different conversations. This is great for use cases like storing user preferences, frequently asked questions, and other persistent information that should be available in future interactions.

When Long-Term Memory is enabled, your agent will be able to read Long-Term Memory added to the agent as it goes.

#### Built-in Tools

Two built-in tools will be automatically added to the agent:

* **Save to Memory**: Save important information to your Long-Term Memory for future conversations
* **Delete from Memory**: Remove information from your Long-Term Memory

<Info>
  You don’t have to use these tools, but they provide a good way to be more granular and control when to save Long-Term Memory based on certain conditions, after specific tools, or following particular workflows.
</Info>

You can view and manage stored memories from the Memory section of your agent.

#### Advanced Settings

From the Advanced Settings in Long-Term Memory, you can:

* **Override the system prompt for saving to memory**: Customize how the agent decides what information to save
* **Override the system prompt for deleting from memory**: Control how the agent determines what to remove from memory
* **Disable delete memory tool**: When disabled, the agent cannot delete items from Long-Term Memory. This is useful when you want to ensure your agent can’t accidentally lose important context by deleting memories

<Info>
  Long-Term Memory is particularly valuable for maintaining context across multiple conversations, ensuring your agent can build upon previous interactions and provide more personalized experiences.
</Info>


---

# Page: Prompt

Path: `build/agents/build-your-agent/prompt`.

## Prompt

> Crafting a prompt to instruct your Agent



The Prompt is the core set of instructions that your agent follows every time it works on a task. Think of it like the instructions you’d provide to an employee about how they should work. You might tell them about their responsibilities and expectations, rules and guidelines, common processes and ways to communicate (do’s and don’ts).

***

### Agent Profile



#### Agent Name

Your agent’s name serves as its identity throughout the platform. Choose a name that:

* Clearly reflects the agent’s purpose or role
* Is memorable and easy to reference
* Distinguishes it from other agents in your workspace

For example, “Sales Qualification Assistant” immediately communicates the agent’s function, while “ResponseBot” might be too vague.

<Tip>
  Fun fact: We like to give our Agents names — for example, **Samuel, the Sales Qualification Assistant.**
</Tip>

#### Agent Summary

The summary is a descriptive explanation of what your agent does and its area of expertise. This information:

* Guides the agent’s behavior and responses
* Sets expectations for users (you) interacting with the agent
* Helps the underlying AI model understand its purpose

***

### Model Selection

Choosing the right model powers how your Agent thinks, responds, and performs tasks. You can either let the platform automatically optimize the model for you, or manually choose a specific provider and model type.



#### Pick For Me

The platform automatically selects the best model for your Agent based on performance or cost, no action needed. You’re more than welcome to choose the model the suits your Agent’s needs.

<CardGroup cols="2">
  <Card title="Cost-optimized">
    Prioritizes cheaper models if you want to minimize token costs/credit costs. (e.g., GPT 4o mini - or whichever model is cheaper at the time)
  </Card>

  <Card title="Peformance-optimized">
    Prioritizes the best-performing model available for quality responses (e.g., Claude v3.5 Sonnet - or whichever is more performant at the time).
  </Card>
</CardGroup>

#### Choose Your Own Model

You can manually choose from different model families depending on your needs. Each option charges based on your the platform credits per 1,000 tokens — tokens are pieces of text (words/characters) your Agent processes when sending and receiving messages. See each option in the dropdown for current credit/token costs.

1. More credits = more complex, detailed tasks
2. Fewer credits = cheaper, lighter interactions

<AccordionGroup>
  <Accordion title="OpenAI Models">
    Advanced conversational abilities, creative writing, and broad general knowledge.
    Good for: Versatile agents, customer support, brainstorming.
    Cost: Credits charged per 1,000 tokens used for prompts + replies.
  </Accordion>

  <Accordion title="Anthropic's Claude Models">
    Focused on safe, reliable, and ethical AI responses. Often better at reasoning and “thoughtful” tasks.
    Good for: Detailed explanations, structured outputs, sensitive industries.
    Cost: Credits charged per 1,000 tokens processed.
  </Accordion>

  <Accordion title="Azure OpenAI Models">
    Custom deployments hosted on Azure with higher context limits — ideal for large and detailed inputs.
    Good for: Enterprises needing private deployment, security, or very large tasks.
    Cost: Credits charged per 1,000 tokens sent or received.
  </Accordion>

  <Accordion title="Other vendors' models">
    Strong coding ability and task complexity handling (especially other vendors' models).
    Good for: Software development agents, complex task execution.
    Cost: Credits charged per 1,000 tokens processed.
  </Accordion>

  <Accordion title="OpenRouter Models">
    Unified access point to a wide variety of open models like Meta’s LLaMA family, other vendors' models, and others.
    Good for: Exploring experimental or emerging models.
    Cost: Credits charged per 1,000 tokens used, depending on selected model. [Create an OpenRouter account here](https://openrouter.ai/)
  </Accordion>
</AccordionGroup>

<Note>
  **Not all models available in the LLM Tool step can be selected as a model for an Agent.** Agents require models with strong tool-calling capabilities to autonomously use Tools and make decisions. Some models (like DeepSeek) excel at reasoning, coding, and text analysis within LLM Tool steps but may not have the robust function-calling abilities needed for Agent operation. If you need to use these models, consider using them in an LLM Tool step that your Agent calls, rather than as the Agent’s primary model.
</Note>

#### Exploring Available Models

When selecting a model for your Agent, you can use the model selection modal to find the perfect fit for your needs. The interface provides powerful filtering, sorting, and search capabilities to help you compare models at a glance.

<AccordionGroup>
  <Accordion title="Filter Options" icon="filter">
    Narrow down your model choices based on specific criteria:

    * **Credits per 1k tokens** - Filter by cost to stay within budget
    * **Context Window** - Find models that can handle your required input size
    * **Max Output Tokens** - Ensure the model can generate responses of the length you need
    * **Model Provider** - Select from OpenAI, Anthropic, Azure, OpenRouter, and more
    * **Additional Capabilities** - Filter by special features like vision, function calling, or streaming
    * **Supported File Types** - Find models that can process specific file formats
  </Accordion>

  <Accordion title="Sort Options" icon="arrow-down-wide-short">
    Organize models to prioritize what matters most:

    * **Recommended** - Models suggested based on your use case and performance
    * **Context Window** - Sort by maximum input size (largest to smallest)
    * **Credits Cost** - Sort by price per 1,000 tokens (cheapest to most expensive)
    * **Max Output Tokens** - Sort by maximum response length
  </Accordion>

  <Accordion title="View & Search" icon="magnifying-glass">
    Customize how you browse available models:

    * **Grid View** - See model cards with key specs at a glance
    * **List View** - View detailed information in a compact list format
    * **Search** - Quickly find specific models by name or provider
  </Accordion>
</AccordionGroup>

<Tip>
  If you’re choosing a specific model, we recommend doing a quick search up the model to qualify the best fit for your use case. [Search model comparisons here](https://artificialanalysis.ai/models/)
</Tip>

***

### Prompt Instructions



#### Invent a Prompt



Use the **Invent** feature to automatically generate a smart, structured prompt based on a few words you provide. Perfect for getting started quickly if you’re not sure how to write detailed instructions.

#### Write Your Own Prompt

You can also manually type your prompt from scratch if you want full control over how your Agent behaves and what tasks it focuses on. Clear, specific prompts produce the best results.

#### Reference Tools in your prompt

While writing your instructions, you can reference specific Tools (e.g., “Use the **Extract Text from PDF** tool to pull invoice data.”). This tells the Agent exactly *which* Tools to use when completing tasks. You can also swap a referenced Tool directly from the prompt editor without leaving the page.

#### Use the Slash ( / ) Menu



Type **/** to open the Slash menu and quickly insert shortcuts like:

* Referencing available Tools
* Adding Tool placeholders
* Adding Markdown styles for your prompt

This speeds up writing structured and action-driven prompts.

#### Create or Invent new Tools from the Slash menu

If you insert a **Tool Placeholder** using the Slash menu, you can immediately **Invent** a new tool or **create one manually** — no need to leave the prompt!\
(Note: Currently, Invented Tools will still need to be customized in the separate **Tool Builder** section)

***

### Connect Tools Conveniently

#### Add Tools to Your Agent

Tools allow your Agent to perform real-world actions like searching the web, sending emails, extracting data, or connecting with other systems — expanding your Agent’s capabilities far beyond simple conversation.

When writing your Prompt, you can reference specific Tools directly to guide how your Agent should complete tasks. You can also insert Tool Placeholders to invent new tools or connect existing ones as needed.

For a full guide on adding, configuring, and best practices for using Agent Tools, check out the [Tools page](build__agents__build-your-agent.md) (page `build/agents/build-your-agent/tools`).

### View your Prompt in Markdown



You can select if you wish to view your Prompt in Markdown (formatted), or view it in raw formatting, by scrolling down to the bottom of your Prompt and clicking the checkbox named ‘Markdown format’.

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Do I need coding knowledge to use Invent?">
    No, Invent is specifically designed to make agent creation accessible to users without technical expertise. You only need to describe what you want your agent to do in plain English.
  </Accordion>

  <Accordion title="Can I modify the agent after it's been created with Invent?">
    Yes, the agent blueprint generated by Invent is fully customizable. You can adjust any aspect of the configuration, instructions, or tools to better suit your needs.
  </Accordion>

  <Accordion title="What types of agents can I create with Invent?">
    Invent is flexible and can help you create a wide variety of agents, from customer support assistants to research tools, data analysts, and more. The possibilities are limited only by your imagination and the capabilities of the underlying AI models.
  </Accordion>

  <Accordion title="How does Invent compare to using agent templates?">
    While templates provide pre-configured agents for specific use cases, Invent creates custom agent blueprints based on your unique description. Templates are ideal when your needs align with existing patterns, while Invent offers more flexibility for novel or specialized requirements.
  </Accordion>
</AccordionGroup>

### Follow along on YouTube

If you want help with writing better prompts, we recommend watching this YouTube video by one of our amazing Solution Engineers, Andrew!

<Frame caption="Learn tips and best practices for writing better prompts for your Agents.">
  <iframe className="w-full aspect-video rounded-xl" src="https://www.youtube.com/embed/NoSTijB4824" title="YouTube video player" />
</Frame>


---

# Page: Give Your Agent Tools

Path: `build/agents/build-your-agent/tools`.

## Give Your Agent Tools

### Overview

Tools enable your agent to go beyond simple conversation by performing actions such as searching the web, accessing databases, sending emails, or interacting with other systems. When properly configured, tools transform your agent from a conversational interface into a powerful digital assistant that can take meaningful actions on behalf of users.



### Adding Tools to Your Agent

In the Agent Builder interface, navigate to the **Tools** section to begin enhancing your agent’s capabilities:

1. Select from pre-built tool templates that cover common use cases
2. Add custom tools you’ve created under the `Add new tool` option
3. Configure each tool’s usage settings based on your requirements

### Tool Input Configuration Options



When adding Tools to your Agents, you can choose from three different usage modes for your Inputs:

#### Let agent decide

This balanced approach gives your agent the flexibility to determine how the Input is entered based on context. The Agent will use its judgement about what Inputs to give your Tools.

**Best for:** A mix of tool types where you want to get things up and running quickly.

#### Set manually

This option allows you to explicitly specify the Inputs for each Tool or action. You have full control over which settings are used for your tools.

**Best for**: Scenarios where strict oversight or compliance is needed, and you want to minimize any ambiguity in approval processes.

#### Tool output

This option allows you to select the outputs from a previous Tool run by the Agent.

### Guiding Your Agent’s Tool Usage

For optimal results, provide your agent with clear guidance about how and when to use its tools:

**Core Instructions**: Include specific directions about tool usage in your agent’s core instructions. For example:

* When to prioritize certain tools over others
* How to interpret and present tool results
* What circumstances warrant tool use versus simple conversation

### Best Practices for Tool Implementation

* **Start Simple**: Begin with a few essential tools before adding more complex capabilities
* **Test Thoroughly**: Verify that each tool works as expected in various scenarios
* **Monitor Usage**: Review how your agent is using tools in real conversations to identify opportunities for improvement
* **Refine Gradually**: Adjust tool configurations and instructions based on actual usage patterns
* **Combine Tools Strategically**: Create powerful workflows by combining multiple tools in sequence

### Common Tool Categories

While the specific tools available depend on your implementation, common categories include:

* **Information Retrieval**: Search engines, knowledge bases, document repositories

* **Communication**: Email, messaging, notifications

* **Data Processing**: Analysis, transformation, summarization

* **Integration**: Connecting with external systems and APIs

* **Content Creation**: Generating text, images, or other media

By thoughtfully selecting and configuring the right tools for your agent, you can create a powerful assistant that delivers exceptional value to your users through both conversation and action.

### Tool Approvals

Control whether your agent needs permission before running a tool. You can set the approval mode individually for each tool.

#### Auto Run

The tool runs automatically whenever the agent determines it should be used. The agent incorporates tool functionality without interrupting the conversation flow.

**Best for:** Tools that are low-risk, frequently used, or where immediate action is beneficial.

#### Approval Required

The agent will ask for explicit permission before using the tool. When the agent determines a tool would be helpful, it will first explain what it wants to do and why, then wait for user confirmation before proceeding.

**Best for:** Tools that perform sensitive actions, have potential costs associated with them, or where user oversight is important.

#### Let Agent Decide

This balanced approach gives your agent the flexibility to determine when approval is necessary based on context. The agent will use its judgment about when to ask for permission versus when to proceed automatically.

**Best for:** A mix of tool types where you want to balance convenience with appropriate caution.

### Tool Settings

#### Failure policy

Define what your agent should do when a tool errors. Open the **Tool Settings** on the Tools page to configure the failure policy.

##### Always retry errored tool

When on, forces the agent to retry errored tools until success or max retries (at which point the task will fail). When off, the agent decides on its own whether it’s worth retrying. For most users, enabling retries is a safe way to handle occasional hiccups without manual intervention.

##### Maximum number of tool retries

The number of times the agent will retry a tool that errors before marking the task as failed. A few retries (like 3) usually strikes a good balance — it gives your agent a second chance without risking long loops or extra costs. Increasing this may raise credit usage.

##### Behavior after max tool retries

Decide what should happen when the maximum number of retries is reached: either **Terminate task** immediately or **Escalate** it to a human for help. Terminating is faster and simpler, but escalation gives you a chance to fix things manually when it matters most.


---

# Page: Triggers

Path: `build/agents/build-your-agent/triggers`.

## Triggers



Triggers allow your Agent to start workflows automatically based on specific events. For example, connecting a Outlook trigger will let your Agent process each new email as soon as it arrives in your inbox. Based on your **Prompt** instructions, the Agent can then take action whenever an email “triggers” it.

You can trigger your Agent through three different methods:

* **Scheduled Events**: Set your agent to run at specific times or intervals
* **External Actions**: Configure your agent to respond to specific events or inputs
* **Manual Activation**: Allow users to directly engage with the agent when needed

### Setting up a trigger

<Info>
  New to the platform? The platform Academy has structured courses that walk you through building on the platform step by step.
</Info>

1. Navigate to the **Agents** page and select the agent you want to configure
2. In the sidebar on the left, click **Triggers**
3. Click the **Add trigger** button
4. Choose from the available trigger types — integration triggers, scheduled triggers, or build-your-own options like webhooks, SDK, API, or Tools
5. Follow the configuration steps for your chosen trigger type
6. Once configured, your trigger will appear in the Triggers section of your agent

<Note>
  You can add multiple triggers to a single agent. Each trigger operates independently, so your agent can respond to emails, run on a schedule, and accept API requests all at the same time.
</Note>

### Managing your triggers

Once you’ve set up triggers, you can control them without deleting your configuration.

#### Pausing and resuming triggers

You can pause any trigger type — integration triggers (Outlook, Slack, LinkedIn, WhatsApp, etc.), scheduled triggers, webhooks, and all others. Pausing stops the trigger from firing while preserving all your configuration, so you don’t need to delete and recreate triggers when you want to temporarily disable them.

##### To pause or resume a single trigger

1. Go to your agent’s **Triggers** section in agent settings or the agent builder sidebar
2. Find the trigger you want to pause
3. Click the pause button next to the trigger
4. To resume, click the resume button

##### To pause or resume all triggers at once

Use the **Pause all** or **Resume all** buttons at the top of the Triggers section to quickly control all triggers for your agent.

#### Visual status indicators

Active triggers display with a standard appearance, while paused triggers show a visual indicator so you can quickly see which triggers are currently active and which are paused.

#### Where to manage triggers

You can pause and resume triggers from two locations:

* **Agent settings**: Navigate to your agent and open the Triggers section
* **Agent builder sidebar**: Access trigger controls directly while building your agent

#### Common use cases for pausing triggers

* **Testing**: Pause production triggers while testing changes to your agent
* **Maintenance**: Temporarily disable triggers during system updates or configuration changes
* **Cost control**: Pause high-volume triggers during periods when you don’t need them active
* **Debugging**: Isolate specific triggers to troubleshoot issues
* **Seasonal workflows**: Pause triggers that are only relevant during certain times of the year

### Trigger types

#### Integration triggers

We have 1,000+ integrations you can connect to and set up to trigger your Agent, including external triggers like Zapier.

<Card title="Integration triggers" href="build__agents__build-your-agent__agent-triggers.md">
  View all available integration triggers and premium options.
</Card>

#### Scheduled triggers

Set your Agent to run on a recurring schedule or send messages at specific times.

<Card title="Scheduled triggers" href="build__agents__build-your-agent__agent-triggers.md">
  Set up recurring schedules and scheduled messages.
</Card>

#### Build your own triggers

Connect to custom webhooks, APIs, and SDKs to trigger your Agent programmatically.

<Columns cols="2">
  <Card title="Webhook" href="build__agents__build-your-agent__agent-triggers.md">
    Trigger your Agent from a custom webhook.
  </Card>

  <Card title="API Trigger" href="build__agents__build-your-agent__agent-triggers.md">
    Trigger your Agent with direct HTTP requests from any language.
  </Card>

  <Card title="JavaScript SDK" >
    Build a JavaScript or TypeScript app that talks to your Agent.
  </Card>

  <Card title="Tools as Triggers" href="build__agents__build-your-agent__agent-triggers.md">
    Use a specific Tool to trigger your Agent.
  </Card>
</Columns>

### Choosing the right trigger

| I want to...                                            | Use this trigger                    |
| ------------------------------------------------------- | ----------------------------------- |
| React to emails, Slack messages, or CRM updates         | **Integration Triggers**            |
| Run a report every morning or weekly                    | **Scheduled Triggers**              |
| Send follow-ups or reminders at a future time           | **Scheduled Messages**              |
| Connect a third-party service like Zapier               | **Integration Triggers** (external) |
| Receive data from my own app or website                 | **Webhook Trigger**                 |
| Trigger my Agent over HTTP from any language            | **API Trigger**                     |
| Build a JavaScript or TypeScript app on top of my Agent | **JavaScript SDK**                  |
| Combine data from multiple sources before triggering    | **Tools as Triggers**               |

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Can I add multiple Triggers to one Agent?">
    Yes. Each Trigger operates independently, so your Agent can respond to integration events, run on a schedule, and accept API requests all at the same time.
  </Accordion>

  <Accordion title="What happens when a Trigger fires?">
    The Trigger sends a message to your Agent, which then processes it based on your Prompt instructions and executes its configured Tools.
  </Accordion>

  <Accordion title="Can I pause or disable a Trigger without deleting it?">
    Yes. You can pause any trigger type from your agent’s Triggers section — this works for integration triggers (Outlook, Slack, LinkedIn, WhatsApp, etc.), scheduled triggers, webhooks, and all other trigger types.

    Pausing preserves all your configuration, so you don’t need to delete and recreate triggers. You can pause individual triggers or use the **Pause all** button to disable all triggers at once. Visual status indicators show which triggers are active and which are paused.

    This is useful for testing, maintenance, cost control, or any time you need to temporarily disable triggers without losing your setup.
  </Accordion>
</AccordionGroup>


---

# Page: Variables

Path: `build/agents/build-your-agent/variables`.

## Variables



### Overview

Variables in the platform allow you to store and reuse data across your agents, eliminating the need to repeatedly type the same information. They provide several key benefits:

* **Efficiency**: Define information once and use it multiple times
* **Consistency**: Ensure the same data is used throughout your workflows
* **Flexibility**: Use variables in both tools and prompts

Variables act as dynamic placeholders that can significantly streamline your agent development process and make your workflows more adaptable to changing requirements.

<Tip>
  Variables are particularly useful for information that might change over time, such as company details, product specifications, or process guidelines.
</Tip>

### Configure Variables

The Configure tab allows you to set up and manage your variables:

1. **Name**: Create a descriptive name for your variable
2. **Description**: Add context about what the variable represents and how it should be used
3. **Input**: Enter the actual value of the variable
4. **Variable Name**: Define the reference name used to call this variable in your tools and prompts
5. **Data Type**: Specify what type of data the variable contains

<Note>
  For more detailed information about data types and how they function, check out our 

  [Inputs page](build__tools__customize-tool.md) (page `build/tools/customize-tool/inputs`)

  .
</Note>

### Set Values

The Set Values tab provides a streamlined interface for quickly updating your variable values:

* View all your variables in one place
* Modify values without changing other variable properties
* See immediate updates reflected across your agent

This tab offers the same functionality as the Configure tab but focuses specifically on changing variable values, making it ideal for quick updates when your underlying data changes.

<Tip>
  Consider using variables for information like:

  * Company contact details
  * Product pricing
  * Service descriptions
  * API endpoints
  * Frequently used instructions
</Tip>


---

# Page: Version history

Path: `build/agents/build-your-agent/version-history`.

## Version history

> Track, restore, and manage versions of your Agents, Tools, and Workforces.

Version history gives you a complete record of every saved state for your Agents, Tools, and Workforces. Every time you save a draft or publish, a new version is created automatically — so you can experiment freely and roll back if something breaks.

### How version history works

A new version is created in two situations:

* **On every draft save** — whenever you make a change and save without publishing
* **On publish** — when you publish a draft to make it the active version

This means every meaningful edit is captured. You don’t need to manually create snapshots or remember to save before experimenting.

When you edit an Agent, Tool, or Workforce, your changes go to a **draft** first — they don’t affect the live, published version until you explicitly publish. This means:

* Your published (active) version keeps running while you iterate
* Draft changes are saved automatically as you work
* Publishing is an intentional step — you decide when changes go live

Each saved draft state and each published state becomes a distinct version in the history list.

#### Version names and descriptions

Each version has a short name and a longer description, and both are optional. A version saved without a name is listed by its timestamp instead — for example, `Aug 18, 2:30 am` — so naming the versions you might want to return to makes them much easier to find later. Invent sets a name and description when it publishes changes, but neither field is enforced by the platform.

<Tip>
  Use descriptions that capture intent, not just the change. “Added web search tool” is more useful than “Updated version 3” when you’re scanning a list of 20 versions.
</Tip>

When you restore a version, the restored state is saved as a new draft with `(restored)` appended to the version name. The description carries over unchanged from the version you restored.

### Accessing and restoring versions

Version history works the same way for Agents, Tools, and Workforces:

1. Open the Agent, Tool, or Workforce in the builder
2. Click the three-dot menu in the top right
3. Select **Versions**

The panel lists every saved version with its name, who saved it, and its description. The active version is marked **Live**, and a version created by Invent or over MCP carries a badge naming the surface that made the change.

<Note>
  The three-dot menu only lists **Versions** in the builder. It’s hidden on an Agent’s Use tab, when you’re not on the Workforce Build tab, and in the Tool builder embedded inside the Agent builder, where you need to open the Tool on its own page instead.
</Note>

To restore a version, click the three-dot menu on that version in the panel, then select **Restore this version**. You can also ask [Invent](build__invent.md) (page `build/invent/invent`) in plain language. Either way the restored state lands in draft, so you review it and publish when ready.

#### With Invent

Ask Invent to restore a version by describing what you want — for example:

> “Restore the previous version of this Tool”

Invent always asks you to confirm before applying the restore. It can also rename an existing version for you if you’d rather not open the panel yourself.

#### Edit a version name or description

You can relabel any version after it’s been saved, including the current draft, the active version, and historical versions. In the version history panel, click the three-dot menu on a version, then select **Edit name / description**. This changes only the label — the configuration stored in that version is untouched, as are its author and timestamp.

<Note>
  Renaming an Agent version requires admin permission on that Agent, while Tools and Workforces also accept project editor permission.
</Note>

### Version retention

Versions are kept indefinitely unless your organization has a data retention policy in place. Where one applies, a version is deleted only if both of these hold:

* It is older than the retention window, measured from when the version was created rather than when it was last edited
* It is not the **active version** (the one currently published) or the **draft version** (your current work in progress). Those two are always protected, at any age

For retention windows and how they’re configured, see Data retention.

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Can I rename a version after it's been saved?">
    Yes. Open the version history panel, click the three-dot menu on the version, then select **Edit name / description**. This works for Agents, Tools, and Workforces, and applies to the current draft, the active version, and historical versions alike. You can also ask Invent to rename a version.
  </Accordion>

  <Accordion title="Does restoring a version publish it automatically?">
    No. A restored version always lands in draft, and you publish it yourself when you’re ready. The live version keeps running until you do, so you get a chance to review the restored state before it goes out.
  </Accordion>
</AccordionGroup>

