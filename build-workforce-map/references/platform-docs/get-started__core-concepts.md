# The platform docs: `get-started/core-concepts/`

6 pages, downloaded on 11/16/2026.


---

# Page: Agents

Path: `get-started/core-concepts/agents`.

## Agents

> Introduction to AI agents and building your AI Workforce!

### What are Agents?

Agents are powered by LLMs that plan and complete tasks on autopilot. They are given tools, and decide how to use tools to achieve goals prompted by you.

Unlike traditional automation that follows rigid, pre-programmed rules, AI agents can:

* **Think and reason** through complex problems
* **Adapt their approach** based on context and feedback
* **Learn from experience** by storing successful patterns
* **Make decisions** about which tools to use and when
* **Communicate naturally** with humans and other agents

### What are the benefits of an AI Agent?

<CardGroup cols="2">
  <Card title="Scales to meet demand" icon="chart-line">
    Agents can flex with your needs, handling seasonal or regional spikes in activity—especially useful in industries like education, hospitality, and finance.
  </Card>

  <Card title="Increases engagement" icon="rocket">
    Automate repetitive tasks so your team can focus on high-value work. Sales teams, for example, use agents to qualify leads, freeing reps to close deals.
  </Card>

  <Card title="Learns from experience" icon="brain">
    If an agent doesn’t know something, it can escalate to a human, store the answer, and use it next time. Ours posts unknowns to Slack for fast input and learning.
  </Card>

  <Card title="Works solo or with you" icon="user-gear">
    Agents can run fully autonomously or in co-pilot mode. One of ours builds Webflow pages daily—no human touch required.
  </Card>

  <Card title="Responds flexibly" icon="arrows-split-up-and-left">
    Unlike rule-based tools, agents adapt their responses to each task. A support agent might troubleshoot one day and resolve billing the next.
  </Card>

  <Card title="Available 24/7" icon="clock">
    Agents work around the clock without breaks, ensuring consistent service and response times regardless of time zones or business hours.
  </Card>
</CardGroup>

### How AI Agents Work

Agents in the platform can operate in different ways:

* **Autopilot** - They complete tasks independently.
* **Human in the loop** - Asking humans for input or approval when needed.

You can trigger agents to start work with:

* **Pre-built integrations** - Seamlessly connect with existing tools.
* **API access** - Use them in your applications.
* **User interface** - Run agents directly from our platform.

### Where are Agents most useful?

AI agents excel in roles requiring consistent execution of complex but well-defined processes, such as:

* **Customer Support**: Handling routine inquiries, troubleshooting common issues, and escalating complex problems to human agents
* **Sales Qualification**: Engaging with prospects, gathering initial information, and identifying promising leads
* **Content Creation**: Generating drafts of routine documents, reports, and communications
* **Data Analysis**: Processing and summarizing large volumes of information to extract actionable insights
* **Scheduling and Coordination**: Managing calendars, setting up meetings, and sending reminders

### Organizing your Agents

As you build and use more Agents, keeping them organized becomes essential for efficient workflows. The platform provides several ways to manage and access your Agents:

#### Pinning Agents for quick access

Pin your most frequently used Agents to keep them easily accessible in the platform. Pinned Agents appear:

* **At the top of your agents list** in the main app
* **First in the “Browse agents” section** when creating a new chat

This makes it easy to quickly access the Agents you rely on most, without scrolling through your entire collection.

<Tip>
  To pin an Agent, click the pin icon next to the Agent’s name in your agents list. You can pin multiple Agents and unpin them at any time by clicking the pin icon again.
</Tip>

#### Organizing with folders

You can organize your Agents into folders within your project, making it easier to categorize and find Agents based on their purpose, department, or use case. This is particularly useful for teams managing large numbers of Agents across different functions.

#### Organizing with tags

Tags give you a flexible way to categorize agents that cuts across folder boundaries — unlike folders, a single agent can have multiple tags at once, making it easy to group agents by team, status, client, or any other dimension that matters to your workflow. To create a tag, hover over an agent in the agent list and click the **Add Tag** button that appears, then select a color, give the tag a name, and click **Save**. Once a tag exists, you can assign it to other agents the same way. You need Editor role to create or manage tags.

#### Filtering your agent list

The agent list includes Filter options to help you narrow down your view:

* **Pinned agents** — shows only agents you’ve pinned.
* **My agents** — shows only agents where you are the original creator.
* **Edited by me** — shows agents you have contributed any version to, including edits to agents created by others.
* **Cloneable agents** — shows agents that have been made cloneable.
* **Embeddable agents** — shows agents that have been made embeddable.

You can also filter by agent type (**Default**, **Phone**, or **Knowledge**). With no Filter option selected, the list shows every agent you have access to in the project.

<Note>
  If you previously relied on “My agents” to find agents you had edited, those agents now appear under “Edited by me” instead. “My agents” now shows only agents you originally created, so your team can more easily distinguish between creation and contribution.
</Note>

#### Customizing your agent list view

You can resize the **Agent name** and **Description** columns in the agent list table by dragging the divider between column headers. This lets you adjust how much space each column takes up based on your preferences. Other columns remain fixed-width.

### How to get the most from your Agents?

When inventing or creating an agent, you’d want to utilize domain expertise or model an agent after a Domain expert:

1. **Start with clear objectives**: Define specific tasks and goals for your agents
2. **Provide quality knowledge bases**: Equip agents with comprehensive, up-to-date information
3. **Establish escalation protocols**: Create clear paths for agents to involve humans when needed
4. **Monitor and refine**: Regularly review agent performance and make adjustments
5. **Integrate with existing systems**: Connect agents to your current tools and workflows
6. **Organize for efficiency**: Use pinning and folders to keep your most important Agents easily accessible

By thoughtfully implementing AI agents, organizations can enhance productivity, improve customer experiences, and free human employees to focus on work that requires creativity, empathy, and strategic thinking.

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Do I need coding knowledge to Invent an Agent?">
    No, Invent is specifically designed to make agent creation accessible to users without technical expertise. You only need to describe what you want your agent to do in plain English.
  </Accordion>

  <Accordion title="What are tools in the context of AI agents?">
    Tools are capabilities that agents can use to perform specific actions and complete tasks. They extend what an agent can do beyond just conversation. For example, an agent might use tools to:

    * Search the internet for information
    * Access and update customer records in a CRM
    * Send emails or messages
    * Schedule appointments
    * Generate content or analyze data

    the platform provides both pre-built tool templates and the ability to create custom tools for your agents.
  </Accordion>

  <Accordion title="How does Knowledge for Agents work?">
    Knowledge in the platform refers to the information and context provided to agents to help them perform their tasks effectively. This is often implemented through Retrieval Augmented Generation (RAG), which allows agents to access and use specific information sources when responding to queries or completing tasks.

    By giving agents access to knowledge bases, you can ensure they provide accurate, up-to-date information specific to your business, products, or services.
  </Accordion>

  <Accordion title="What is a Multi Agent System (MAS)?">
    Yes, the platform supports creating multi-agent systems where specialized AI agents work together to accomplish complex tasks. This is part of the AI Workforce feature, which provides a visual canvas where you can design, connect, and monitor teams of specialized agents.
  </Accordion>

  <Accordion title="How do agents handle situations they can't resolve?">
    Agents can be configured to escalate issues they can’t handle to human team members. For example, if an agent cannot answer a customer’s question, it can loop in a sales rep or manager via your preferred communication tool (email, chat, etc.). The human can provide an answer, which the agent can then use to respond to the customer and store for future reference.
  </Accordion>

  <Accordion title="What integrations are available for AI agents?">
    the platform offers numerous integrations that allow agents to connect with external tools and services, including:

    * Email platforms (Outlook)
    * CRM systems (Salesforce, HubSpot)
    * Messaging platforms (Slack, WhatsApp, Telegram)
    * Productivity tools (Outlook calendar, Excel workbook)
    * Knowledge management systems (Notion, Confluence)
    * And many more

    These integrations enable agents to access data and perform actions across your entire tech stack.
  </Accordion>

  <Accordion title="Can agents operate autonomously without human oversight?">
    Yes, agents on the platform can complete work end-to-end without human involvement. For example, you could create an agent that checks for new information daily and produces reports or updates websites automatically.

    However, you can also configure agents to work in a co-pilot mode, where they assist humans rather than working completely independently. The best approach depends on your specific use case and comfort level with automation.
  </Accordion>

  <Accordion title="What are the system limits or quotas for AI agents?">
    the platform has system quotas that define the maximum resource allocations for different aspects of the platform. These may include limits on the number of agents, conversations, knowledge bases, or API calls depending on your plan. Specific details about these quotas can be found in the [system quotas documentation](admin.md) (page `admin/system-limits`).
  </Accordion>

  <Accordion title="How do I monitor and improve my agents' performance?">
    the platform provides tools to monitor your agents’ performance, including:

    1. **Task View**: A centralized interface for monitoring, managing, and interacting with your AI workforce
    2. **Conversation History**: Review past interactions to identify areas for improvement
    3. **Analytics**: Track metrics related to agent usage and effectiveness

    Regular monitoring helps you identify patterns, optimize agent behavior, and ensure they’re meeting your business objectives.
  </Accordion>

  <Accordion title="What is concurrency and how does it affect my agents?">
    Concurrency refers to the number of tasks that can be executed simultaneously by your agents. For more details, visit our [System Quotas page](admin.md) (page `admin/system-limits`).
  </Accordion>

  <Accordion title="How can I organize my Agents?">
    You can organize your Agents in several ways:

    * **Pin important Agents**: Keep your most frequently used Agents at the top of your agents list in the main app for quick access
    * **Use folders**: Organize Agents into folders based on purpose, department, or use case
    * **Project organization**: Separate Agents across different projects based on your team structure

    These organizational features help you manage large collections of Agents efficiently.
  </Accordion>
</AccordionGroup>

***

### Ready to get started with AI agents?

<CardGroup cols="3">
  <Card title="Create an Agent" icon="plus" href="build__agents.md">
    Build your first agent step by step
  </Card>

  <Card title="Use Agents in Chat" icon="messages" >
    Start using agents instantly in the platform Chat
  </Card>

  <Card title="Explore the Marketplace" icon="store" >
    Clone and customize pre-built agents
  </Card>
</CardGroup>


---

# Page: API integration

Path: `get-started/core-concepts/api-integration`.

## API integration

> Add custom API keys to connect services the platform doesn't have built-in, or use the API key to access the platform programmatically.

### What is API integration?

The platform has [built-in integrations](integrations.md) (page `integrations/introduction`) for dozens of popular services — but if you need to call a custom endpoint or connect a service that isn’t on the list, you can add your own API keys. And if you want to access the platform programmatically — via the SDK — you can generate a the platform API key.

### What are the benefits of API integration?

<CardGroup cols="2">
  <Card title="Connect anything" icon="plug">
    Add your own API keys to connect any service or endpoint that the platform doesn’t have a built-in integration for.
  </Card>

  <Card title="Programmatic access" icon="code">
    Use the API key to interact with the platform through the SDK.
  </Card>

  <Card title="Secure by default" icon="shield-check">
    All keys are encrypted and scoped to your project. Access them safely in tools using template variables.
  </Card>

  <Card title="Full flexibility" icon="sliders">
    Call any REST endpoint, pass custom headers and parameters, and use the response in your tool steps.
  </Card>
</CardGroup>

### How to add a custom API key

If the integration you need isn’t available as a built-in, you can add a custom API key:

1. Go to the **Integrations & API Keys** page from the left-hand menu
2. Click **Custom API Keys**
3. Give your key a name, paste the value, and save

<div style="{ width: '100%', position: 'relative', paddingTop: '56.25%' }">
  <iframe src="https://app.supademo.com/embed/cmm2smdf23h7tvkq14bz13o8b?embed_v=2" frameBorder="0" title="Add a custom API key" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '3px solid #5E43CE', borderRadius: '10px' }" />
</div>

Once saved, you can access it in any tool step using the template variable:

```
{{secrets.chains_your_api_key}}
```

This lets you call any external endpoint from an API step or code step while keeping your credentials secure.

### The platform API key

The the platform API key is different from custom API keys — it authenticates *you* against the platform itself. Use it when you want to:

* **Use the Python or JavaScript SDK** to trigger agents, run tools, or manage resources programmatically
* **Connect agents to external platforms** by embedding them outside of the platform

<div style="{ width: '100%', position: 'relative', paddingTop: '56.25%' }">
  <iframe src="https://app.supademo.com/embed/cmm2sx0rm3he5vkq12isxu2ej?embed_v=2" frameBorder="0" title="Create a the platform API key" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '3px solid #5E43CE', borderRadius: '10px' }" />
</div>

To generate one, go to **Integrations & API Keys** and click **the platform API Keys**.

<Note>
  Users with the **Editor** role or above can generate the platform API keys. On enterprise plans, users with the **Member** role can also generate their own API key — useful for connecting MCP clients like Claude Desktop or Cursor. Members can only manage their own keys and cannot manage API keys for other users.
</Note>

<Warning>
  API keys are a form of credential — treat them like passwords. Never share them publicly or commit them to source control.
</Warning>

#### Region and URL endpoints

Many API endpoints at the platform follow the below format. Note the `api-<region>` part.

the platform's regional API host

For instance, if the Region id fetched from the [API keys](get-started__core-concepts.md) (page `get-started/core-concepts/api-integration`) page is `f1db6c`:

`<your-server-url>`

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="What's the difference between a custom API key and a the platform API key?">
    Custom API keys connect the platform to an external service you want to call. The the platform API key connects external code to the platform itself — it’s what you use with the SDK.
  </Accordion>

  <Accordion title="How do I use a custom API key in a tool?">
    Reference it with the template variable `{{secrets.chains_your_key_name}}` in any tool step that supports it, such as an API call or Python code step.
  </Accordion>

  <Accordion title="Are my API keys secure?">
    Yes. All keys are encrypted and scoped to your project. They’re never exposed in logs or agent responses.
  </Accordion>

  <Accordion title="What about built-in integrations like HubSpot or Slack?">
    Those are covered on the [Integrations](integrations.md) (page `integrations/introduction`) page. This page is for connecting services that don’t have a built-in integration, or for accessing the platform programmatically.
  </Accordion>
</AccordionGroup>

***

### Next steps

<CardGroup cols="2">
  <Card title="Explore integrations" icon="puzzle-piece" href="integrations.md">
    See the full list of built-in integrations and how to use them
  </Card>

  <Card title="Build a tool" icon="hammer" href="build__tools.md">
    Create a tool that uses your API keys to call external services
  </Card>
</CardGroup>


---

# Page: Knowledge

Path: `get-started/core-concepts/knowledge`.

## Knowledge

> Give your agents the context they need with the platform's RAG-powered knowledge system.

### What is Knowledge?

Knowledge is the platform’s retrieval augmented generation (RAG) system. It lets you give your agents and tools access to specific information — your docs, your data, your expertise — so they can respond with accuracy instead of relying only on their training data.

Think of it as your agent’s reference library. When an agent needs to answer a question or complete a task, it searches your knowledge bases for the most relevant information and uses it to ground its response.

### What are the benefits of Knowledge?

<CardGroup cols="2">
  <Card title="More accurate responses" icon="bullseye">
    Agents reference your actual data instead of guessing. Fewer hallucinations, more reliable output.
  </Card>

  <Card title="Domain expertise on demand" icon="graduation-cap">
    Turn any agent into a specialist by giving it access to the right knowledge — product docs, playbooks, policies, whatever it needs.
  </Card>

  <Card title="Always up to date" icon="rotate">
    Update your knowledge bases as things change. Your agents automatically use the latest information.
  </Card>

  <Card title="Works across your stack" icon="plug">
    Pull in data from files, websites, workspace folder, SharePoint, Notion, and more.
  </Card>
</CardGroup>

### How Knowledge Works

Knowledge uses semantic search to find the most relevant information for each query. When an agent receives a task or question:

1. It searches your connected knowledge bases for relevant content
2. The most relevant results are passed to the agent as context
3. The agent uses that context to generate an accurate, grounded response

This is powered by retrieval augmented generation (RAG) — your agents get the right information at the right time without needing it baked into their training data.

#### Connecting Knowledge to an agent

When you add a knowledge base to an agent, you choose how the agent uses it:

* **Add all to prompt** — the entire knowledge set is included in the prompt every time the agent runs. Best for small or simple datasets.
* **Allow agent to search** — the agent searches the knowledge base using RAG and pulls only what’s relevant. Best for large or complex datasets.

### Where is Knowledge most useful?

Knowledge is most effective when your agents need access to specific, proprietary, or frequently changing information:

* **Customer support**: Product documentation, troubleshooting guides, and FAQs so agents resolve issues accurately
* **Sales enablement**: Battlecards, pricing sheets, and case studies to keep sales agents informed
* **Internal operations**: Company policies, SOPs, and handbooks that employees need on demand
* **Onboarding**: Training materials and process documentation for new team members
* **Research and analysis**: Reports, datasets, and reference materials for agents that synthesize information

### How to get the most from Knowledge?

1. **Keep data clean and structured**: Well-organized content with clear headings and sections improves retrieval accuracy.
2. **Be specific with what you upload**: Give agents only the knowledge they need — too much irrelevant data dilutes search results.
3. **Keep it up to date**: Regularly refresh your knowledge bases so agents always reference current information.
4. **Use enrichment**: Run [tools](build__knowledge.md) (page `build/knowledge/enrich-with-tool`) over your knowledge to add summaries, tags, or derived fields that help agents find the right content faster.
5. **Use snippets for quick access**: Set up [snippets](build__knowledge.md) (page `build/knowledge/use-snippets-for-quick-access`) for frequently referenced information your agents use often.

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="What file types can I upload to Knowledge?">
    You can upload CSV, PDF, Excel, JSON, and audio files. You can also pull content from websites or sync from integrations like workspace folder, SharePoint, and Notion.
  </Accordion>

  <Accordion title="How does semantic search differ from keyword search?">
    Keyword search looks for exact word matches. Semantic search understands meaning — so a search for “pricing information” can find content titled “how much does it cost” even though the words don’t match.
  </Accordion>

  <Accordion title="Can multiple agents share the same knowledge base?">
    Yes. You can connect a single knowledge base to as many agents as you like. This is useful when multiple agents need access to the same reference material.
  </Accordion>

  <Accordion title="How do I keep my knowledge base up to date?">
    You can manually update entries, re-upload files, or use integrations like workspace folder and SharePoint that sync automatically when your source documents change.
  </Accordion>

  <Accordion title="What is knowledge enrichment?">
    Enrichment lets you run tools over your knowledge table to add or transform data — for example, generating summaries, extracting key fields, or tagging entries. This makes retrieval more effective and gives agents richer context.
  </Accordion>
</AccordionGroup>

***

### Ready to get started with Knowledge?

<CardGroup cols="2">
  <Card title="Create a Knowledge Base" icon="book" href="build__knowledge.md">
    Upload your data and build your first knowledge base
  </Card>

  <Card title="Connect Integrations" icon="plug" href="build__knowledge__integrated-knowledge-sources.md">
    Sync from workspace folder, SharePoint, Notion, and more
  </Card>
</CardGroup>


---

# Page: MCP & Plugins

Path: `get-started/core-concepts/mcp-plugins`.

## MCP & Plugins

> Build and manage your the platform agents programmatically using Claude Code or any MCP-compatible AI client.

Connect your AI coding environment to the platform to build agents, tools, and workforces directly from your terminal — using natural language. Instead of clicking through a UI, you build, test, and iterate through clients like Claude Code, Cursor, or any MCP-compatible AI client.

### Getting started

Pick the setup that matches your AI client.

<CardGroup cols="2">
  <Card title="OpenAI Codex" icon="robot" href="integrations__mcp.md">
    Connect Codex to the platform with the MCP server and agent skills.
  </Card>

  <Card title="Claude Code plugin" icon="terminal" href="integrations__mcp.md">
    The fastest way to get started. Install the plugin for Claude Code and build agents from your terminal.
  </Card>

  <Card title="MCP server" icon="plug" href="integrations__mcp.md">
    Connect from any MCP-compatible client — Claude Desktop, Cursor, VS Code, ChatGPT, and more.
  </Card>

  <Card title="Agent skills" icon="graduation-cap" href="integrations__mcp.md">
    Clone the agent skills repository to give your AI coding assistant built-in knowledge of the platform.
  </Card>
</CardGroup>

***

<Note>
  This page focuses on what builders can create and manage via MCP. MCP connections also work for team members who only need to run existing agents — not build or edit them. Users with Viewer or Chat project roles are automatically placed into a restricted access mode when they authenticate, so they can view and run agents without any write access. See [Access control](integrations__mcp.md) (page `integrations/mcp/mcp-server`) for details.
</Note>

### What you can do

Once connected, your AI client gets full access to your the platform project. This goes far beyond running existing tools — you can build and manage everything in your project from clients like Claude Code.

<CardGroup cols="3">
  <Card title="Create Agents" icon="robot">
    Design and configure new Agents, set their instructions, assign Tools, and configure Triggers.
  </Card>

  <Card title="Build Tools" icon="wrench">
    Create new Tools with custom steps, inputs, and outputs.
  </Card>

  <Card title="Set up Workforces" icon="users">
    Build multi-agent workflows with Triggers, conditions, and agent-to-agent handoffs.
  </Card>

  <Card title="Trigger Agents" icon="play">
    Start conversations with your Agents and get responses.
  </Card>

  <Card title="Execute Tools" icon="bolt">
    Run any of your the platform Tools directly from your AI client.
  </Card>

  <Card title="Troubleshoot Agents" icon="stethoscope">
    Diagnose issues with your Agents by reviewing conversation logs and tool outputs.
  </Card>

  <Card title="Refine Agents" icon="sliders">
    Iterate on Agent instructions, Tool configurations, and behavior based on real results.
  </Card>

  <Card title="Evaluate runs" icon="chart-line">
    Review previous agent runs, identify failures, and improve performance over time.
  </Card>

  <Card title="Update configurations" icon="gear">
    Modify agent instructions, tool settings, and workflow logic.
  </Card>
</CardGroup>

***

### Use cases

<Tabs>
  <Tab title="Build agents">
    Create and configure agents end-to-end from your AI client. Describe what you want in natural language and let your AI client handle the setup.

    **Example prompts:**

    <AccordionGroup>
      <Accordion title="Customer support agent">
        *“Create a new agent called ‘Customer Support Bot’ that answers questions using our FAQ knowledge base. Give it a friendly tone and make sure it escalates to a human when it can’t answer.”*
      </Accordion>

      <Accordion title="Lead qualification agent">
        *“Build me an agent that qualifies inbound leads from HubSpot. It should check the company size and industry, then send a personalized follow-up email via Outlook.”*
      </Accordion>

      <Accordion title="Slack triage agent">
        *“Set up an agent that monitors our Slack support channel, categorizes messages by urgency, and assigns them to the right team member.”*
      </Accordion>

      <Accordion title="Scheduled reporting agent">
        *“Create an agent with a scheduled trigger that runs every morning, pulls yesterday’s data from Excel workbook, and posts a summary to Slack.”*
      </Accordion>
    </AccordionGroup>
  </Tab>

  <Tab title="Evaluate & improve">
    Review how your agents have been performing by looking at previous conversation runs, identifying where they succeeded or failed, and making targeted improvements.

    **Example prompts:**

    <AccordionGroup>
      <Accordion title="Identify failures">
        *“Pull the last 20 conversations for my Support Agent. Identify any where the agent gave an incorrect answer or failed to resolve the issue.”*
      </Accordion>

      <Accordion title="Measure qualification rates">
        *“Look at my Sales Agent’s recent runs. How often is it successfully qualifying leads vs. letting unqualified ones through?”*
      </Accordion>

      <Accordion title="Find common struggles">
        *“Review the last week of conversations for my Onboarding Agent. Are there any common questions it struggles with? Suggest improvements to its instructions.”*
      </Accordion>

      <Accordion title="Compare before & after">
        *“Compare the performance of my Sales Agent before and after I updated its prompt last Tuesday. Is it doing better at objection handling?”*
      </Accordion>
    </AccordionGroup>
  </Tab>

  <Tab title="Build tools">
    Create custom tools that your agents can use, combining API calls, code steps, LLM processing, and integrations — all from your AI client.

    **Example prompts:**

    <AccordionGroup>
      <Accordion title="Company research tool">
        *“Create a tool that takes a company URL, scrapes the homepage, and returns a one-paragraph summary of what the company does.”*
      </Accordion>

      <Accordion title="Knowledge search tool">
        *“Build a tool that searches our knowledge base for the top 3 most relevant articles given a customer question, and formats them as a numbered list with links.”*
      </Accordion>

      <Accordion title="Data enrichment tool">
        *“Make a tool that takes a CSV of records, enriches each one with LinkedIn data, and outputs a Excel workbook with the results.”*
      </Accordion>

      <Accordion title="Email generator">
        *“Create a tool that generates a personalized email based on a contact’s LinkedIn profile and our product’s value props.”*
      </Accordion>
    </AccordionGroup>
  </Tab>

  <Tab title="Troubleshoot">
    When something isn’t working right, dig into agent behavior, tool failures, and configuration problems.

    **Example prompts:**

    <AccordionGroup>
      <Accordion title="Debug triggers">
        *“My Support Agent stopped responding to Slack messages yesterday. Check its trigger configuration and recent conversation logs to figure out what happened.”*
      </Accordion>

      <Accordion title="Fix tool errors">
        *“The data enrichment tool is returning empty results. Look at the tool steps and check if the API call is configured correctly.”*
      </Accordion>

      <Accordion title="Fix hallucination">
        *“My agent keeps hallucinating answers instead of using the knowledge base. Review its instructions and knowledge configuration and suggest fixes.”*
      </Accordion>

      <Accordion title="Audit configurations">
        *“List all my agents and their triggers. I think one of them has a broken webhook — find it and show me the configuration.”*
      </Accordion>
    </AccordionGroup>
  </Tab>
</Tabs>

***

### Best practices

<Steps>
  <Step title="Plan before you build">
    Before asking your AI client to create or modify anything, start by having it plan the work first. In Claude Code, you can type `/plan` to enter plan mode — this lets you and Claude align on the approach before any changes are made.

    <Tip>
      Instead of jumping straight to 

      *“Build me a support agent”*

      , start with 

      *“Let’s plan a support agent that handles inbound Slack messages. What tools will it need? What should the escalation flow look like?”*

       — then review the plan and tell Claude to execute it.
    </Tip>
  </Step>

  <Step title="Review before you approve">
    When your AI client proposes changes — like updating an agent’s instructions or modifying a tool — read through what it’s about to do before confirming. This is especially important for agents that are already live and handling real conversations.
  </Step>

  <Step title="Use conversation history for context">
    When troubleshooting or refining an agent, ask your AI client to pull recent conversation logs first. This gives it real context to work with rather than guessing.

    <Tip>
      Prompts like 

      *“Look at the last 10 conversations and tell me what’s going wrong”*

       are far more effective than 

      *“My agent isn’t working well, fix it”*

      .
    </Tip>
  </Step>

  <Step title="Test with real scenarios">
    After building or updating an agent, trigger a test conversation to see how it actually behaves. Don’t just review the configuration — run it. Ask your AI client to *“Send a test message to my Support Agent asking about refund policies”* and review the response.
  </Step>

  <Step title="Work across multiple projects deliberately">
    If you have separate projects for development and production, connect to both via separate MCP entries. Build and test in your dev project, then once you’re happy, recreate or promote the agent in production. This keeps your live agents safe while you experiment.
  </Step>
</Steps>

***

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="What is MCP?">
    The Model Context Protocol (MCP) is an open standard that allows AI clients to connect to external tools and data sources. It provides a standardized way for AI assistants to access your the platform workspace, so you can build and manage agents from clients like Claude Code, Cursor, or VS Code instead of the web interface.
  </Accordion>

  <Accordion title="Do I need to use Claude Code?">
    No. Claude Code with the plugin provides the richest experience, but you can use any MCP-compatible client — Claude Desktop, ChatGPT, Cursor, VS Code, Windsurf, and more. See the [MCP server](integrations__mcp.md) (page `integrations/mcp/mcp-server`) page for all supported clients.
  </Accordion>

  <Accordion title="Is it free to use?">
    The MCP server and Claude Code plugin are free. You will be billed for any the platform usage (agent runs, tool executions, etc.) according to your plan.
  </Accordion>

  <Accordion title="Can I use multiple AI clients at the same time?">
    Yes. You can connect to the MCP server from as many clients as you like simultaneously. Each client authenticates independently.
  </Accordion>

  <Accordion title="Does authentication expire?">
    Authentication tokens may expire after a period of inactivity. If you are prompted to re-authenticate, simply follow the login flow again.
  </Accordion>

  <Accordion title="Can I restrict which tools are available?">
    Run-Only mode is the primary way to restrict MCP access. Assign a user the Viewer or Chat project role to force them into a restricted mode automatically — Viewers get run-only access (no write or destructive operations), and Chat users are limited to an even narrower set of tools. Member, Editor, and Admin users can opt into run-only mode from the toggle on the OAuth consent screen. For finer-grained control — such as exposing only a specific subset of agents — organize your tools across separate projects and authenticate each connection to the appropriate project. See [Access control on the MCP server page](integrations__mcp.md) (page `integrations/mcp/mcp-server`) for the full role matrix.
  </Accordion>
</AccordionGroup>


---

# Page: Tools

Path: `get-started/core-concepts/tools`.

## Tools

> The actions your agents use to get things done — from API calls to LLM prompts to custom code.

### What are Tools?

Tools are the actions your agents can take. They’re step-by-step automations you build in a no-code builder — things like calling an API, running an LLM prompt, sending an email, searching a database, or executing custom code.

You can give tools to your agents so they know how to complete tasks, share them as standalone forms, or run them in bulk across a knowledge table.

### What are the benefits of Tools?

<CardGroup cols="2">
  <Card title="Extend what agents can do" icon="puzzle-piece">
    Without tools, agents can only talk. With tools, they can take real actions — update your CRM, send emails, search the web, and more.
  </Card>

  <Card title="No-code builder" icon="wand-magic-sparkles">
    Build tools visually by chaining steps together. No engineering required.
  </Card>

  <Card title="Reusable across agents" icon="clone">
    Build a tool once and give it to any agent. Share it with your team or publish it to the Marketplace.
  </Card>

  <Card title="Full flexibility" icon="code">
    Use pre-built integrations, call any API, or write custom Python. Whatever your workflow needs.
  </Card>
</CardGroup>

### How Tools Work

Every tool follows the same pattern: **inputs → steps → outputs**.

* **Inputs** — the data the tool receives. Text, numbers, files, or data passed from an agent or another tool.
* **Steps** — the actions the tool performs in sequence. Each step can use the output of previous steps. Steps include LLM prompts, API calls, integrations, code execution, and more.
* **Outputs** — what the tool returns when it’s done. Text, links, structured data, or files that get passed back to the agent or displayed to the user.

### Where are Tools most useful?

Tools shine anywhere your agents need to take action beyond conversation:

* **CRM updates**: Automatically create, update, or enrich records in HubSpot, Salesforce, and other systems
* **Email and messaging**: Send emails, Slack messages, or notifications as part of a workflow
* **Web search and scraping**: Pull live information from the web to inform agent decisions
* **Data processing**: Transform, filter, or analyze data with code steps or LLM prompts
* **Third-party APIs**: Connect to any external service — payment processors, marketing platforms, internal systems, and more

### How to get the most from your Tools?

1. **Keep tools focused**: Each tool should do one thing well. Break complex workflows into smaller, composable tools.
2. **Write clear descriptions**: Your agent uses the tool’s name and description to decide when to use it — make them specific.
3. **Define inputs carefully**: Use descriptive input names and set sensible defaults so agents pass the right data.
4. **Test step by step**: Run individual steps as you build to catch issues early instead of debugging the whole chain.
5. **Reuse and share**: Build tools once, then give them to multiple agents or share with your team via the Marketplace.

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Do I need coding knowledge to build a tool?">
    No. The Tool Builder is a no-code interface where you chain steps together visually. If you need custom logic, you can add a code step with Python, but it’s entirely optional.
  </Accordion>

  <Accordion title="What's the difference between a tool and an agent?">
    An agent thinks, plans, and decides what to do. A tool is a specific action the agent can take — like calling an API or sending an email. Agents use tools to get work done.
  </Accordion>

  <Accordion title="Can I use the same tool across multiple agents?">
    Yes. Tools are reusable. Build a tool once and assign it to as many agents as you like.
  </Accordion>

  <Accordion title="How do I debug a tool that isn't working?">
    Use the **Logs** tab in the Tool Builder to review past executions. You can see exactly what each step received and returned, making it easy to pinpoint where things went wrong.
  </Accordion>

  <Accordion title="Can I call external APIs from a tool?">
    Yes. You can add an API step to call any REST endpoint, pass headers and parameters, and use the response in subsequent steps.
  </Accordion>
</AccordionGroup>

***

### Ready to get started with Tools?

<CardGroup cols="2">
  <Card title="Build a Tool" icon="hammer" href="build__tools.md">
    Follow our guide to create your first tool step by step
  </Card>

  <Card title="Tool Style Guide" icon="palette" href="build__tools__customize-tool.md">
    Learn best practices for building effective tools
  </Card>
</CardGroup>


---

# Page: Workforces

Path: `get-started/core-concepts/workforces`.

## Workforces

> Workforce transforms how your agents collaborate by providing a visual canvas where you can design, connect, and monitor teams of specialised agents.

### What is a Workforce?

A Workforce is a team of AI agents that work together to complete multi-step tasks. Instead of building one agent that tries to do everything, you connect specialists — each handling a different part of the process — on a visual canvas.

Think of it like a team of employees: a researcher gathers information, a writer drafts the output, and a reviewer checks the quality. Each agent focuses on what it’s best at, and the Workforce handles the handoffs between them.

### What are the benefits of a Workforce?

<CardGroup cols="2">
  <Card title="Break down complex tasks" icon="diagram-project">
    Split multi-step processes across specialized agents instead of overloading a single one.
  </Card>

  <Card title="Visual workflow builder" icon="objects-column">
    Design agent teams with drag-and-drop — no code, easy to understand and modify.
  </Card>

  <Card title="Flexible routing" icon="arrows-split-up-and-left">
    Use AI-driven handoffs, fixed sequences, or conditional logic to control how work flows between agents.
  </Card>

  <Card title="End-to-end monitoring" icon="chart-line">
    Track every step of a workflow to see what’s working and where things get stuck.
  </Card>
</CardGroup>

### How Workforces Work

#### Connection types

When building your agent workflows, you choose how agents hand off to each other:

* **AI connection** — the agent decides when to pass control to another agent based on context. Great when you want the agent to use judgement about whether another specialist is needed.
* **Next step** — a mandatory transition. When one agent finishes, the next one starts automatically. Use this for predictable, sequential processes.

#### Tool integration

You can connect tools directly within your workflow:

* Connect tools to agents to extend what they can do
* Link tools to other tools to create processing chains
* Combine agent intelligence with specialized tool functionality

#### Conditional logic

Make your workflows smarter with routing rules:

* Create “if this, then that” rules to determine workflow paths
* Set up decision points that route tasks based on specific criteria
* Build adaptive workflows that respond differently depending on inputs or outcomes

### Where are Workforces most useful?

Workforces are ideal when a task requires multiple steps, skills, or handoffs that a single agent can’t handle well on its own:

* **Content pipelines**: A researcher gathers information, a writer drafts the content, and a reviewer checks quality before publishing
* **Lead processing**: One agent qualifies inbound leads, another enriches the data, and a third routes them to the right sales rep
* **Customer support escalation**: A frontline agent handles common questions and hands off complex issues to a specialist agent
* **Report generation**: Agents collect data from multiple sources, analyze it, and compile a final report
* **Onboarding workflows**: Coordinate welcome emails, account setup, training material delivery, and check-ins across multiple agents

### How to get the most from your Workforce?

1. **Start with a clear workflow**: Map out your process before building — know which agents handle which steps and how they hand off.
2. **Keep agents focused**: Each agent should have a single responsibility. A researcher shouldn’t also be writing and reviewing.
3. **Choose the right connection type**: Use AI connections when the agent needs judgement about handoffs. Use next step for predictable, sequential flows.
4. **Name connections clearly**: Descriptive names document the purpose of each handoff and make your workflow easier to understand.
5. **Test with varied inputs**: Run different scenarios to make sure routing works as expected and edge cases are handled.
6. **Monitor and optimize**: Review workflow performance regularly to identify bottlenecks or communication gaps between agents.

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="How many agents can I add to a Workforce?">
    There’s no hard limit on the number of agents in a Workforce. However, simpler workflows with clearly defined roles tend to perform better than overly complex ones.
  </Accordion>

  <Accordion title="What's the difference between an AI connection and a next step?">
    An AI connection lets the agent decide when to hand off based on context — it uses judgement. A next step is a mandatory transition that always fires when the previous agent finishes. Use AI connections for flexible routing and next steps for predictable sequences.
  </Accordion>

  <Accordion title="Can I use tools inside a Workforce?">
    Yes. You can connect tools directly to agents within your Workforce, or link tools to other tools to create processing chains.
  </Accordion>

  <Accordion title="Can I reuse agents across multiple Workforces?">
    Yes. The same agent can participate in multiple Workforces. This is useful when a specialist agent — like a data enrichment agent — is needed in several different workflows.
  </Accordion>

  <Accordion title="How do I debug a Workforce that isn't working as expected?">
    Review the workflow execution to see which agent handled each step, what it received, and what it passed on. This helps you identify where the process broke down — whether it’s a routing issue, a tool failure, or a prompt that needs refining.
  </Accordion>
</AccordionGroup>

***

### Ready to get started with Workforces?

<CardGroup cols="3">
  <Card title="Create a Workforce" icon="diagram-project" href="build__workforces.md">
    Create a multi-agent workflow on the visual canvas
  </Card>

  <Card title="Watch a Walkthrough" icon="circle-play" href="https://www.youtube.com/watch?v=0vATbdyGJMs">
    See how to build an AI content creation team in Workforce
  </Card>

  <Card title="Use in Chat" icon="messages" >
    Run your workforce from the platform Chat
  </Card>
</CardGroup>

