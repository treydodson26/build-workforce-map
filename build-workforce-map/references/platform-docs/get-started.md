# The platform docs: `get-started/`

2 pages, downloaded on 11/16/2026.


---

# Page: Introduction

Path: `get-started/introduction`.

## Introduction

> the platform is the home of your AI Workforce.

The platform is a low/no-code platform where you can build AI agents and multi-agent teams that autonomously complete tasks, much like human employees.

Whether you’re looking to automate customer support, scale your sales operations, or streamline internal workflows, the platform provides the tools and infrastructure to build, deploy, and manage your AI workforce.



### Why the platform?

Traditional automation tools require rigid workflows and constant maintenance. AI agents are different—they think, adapt, and learn from experience. With the platform, you can:

* **Deploy agents in minutes** using our no-code builder or pre-built templates
* **Scale on demand** without hiring or training new team members
* **Integrate seamlessly** with your existing tools and workflows
* **Maintain control** with human oversight and approval workflows
* **Customize everything** from agent behavior to escalation protocols

### Quick Links

<CardGroup cols="2">
  <Card title="Create Your First Agent" icon="wand-magic-sparkles" href="get-started.md">
    Follow our step-by-step guide to build and deploy your first AI agent
  </Card>

  <Card title="Try the platform Chat" icon="messages" >
    Start using AI agents instantly — no setup required
  </Card>

  <Card title="Watch Video Tutorials" icon="youtube">
    Learn from our video library covering agents, tools, and best practices
  </Card>

  <Card title="Get Help & Support" icon="life-ring" >
    Access our support team, community, and troubleshooting guides
  </Card>
</CardGroup>

### Core Features

<CardGroup cols="2">
  <Card title="Agents" icon="robot" href="get-started__core-concepts.md">
    AI entities that autonomously complete tasks like human employees
  </Card>

  <Card title="Chat" icon="messages" >
    Built-in chat interface for human-like conversations with your agents
  </Card>

  <Card title="Workforces" icon="users-gear" href="get-started__core-concepts.md">
    Multi-agent teams where specialized AI agents collaborate on complex tasks
  </Card>

  <Card title="Knowledge" icon="brain" href="build__knowledge.md">
    RAG solution giving agents access to specific information beyond pre-trained knowledge
  </Card>

  <Card title="Tools" icon="screwdriver-wrench" href="get-started__core-concepts.md">
    No-code workflow builder for integrations and automations
  </Card>

  <Card title="Marketplace" icon="store" >
    Pre-built agents, tools, and workforces you can clone and customize
  </Card>
</CardGroup>

### Build your first agent

Follow along to see how to create an agent from scratch:

<div style="{ width: '100%', position: 'relative', paddingTop: '56.25%' }">
  <iframe src="https://app.supademo.com/embed/cmhya3v7249oi17y0f24tb4l3" frameBorder="0" title="Build an AI agent from scratch in the platform" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '3px solid #5E43CE', borderRadius: '10px' }" />
</div>

### How It Works

The platform gives you everything you need to build, connect, and scale an AI workforce:

1. **Build agents** — create AI agents that autonomously complete tasks. Use Invent to generate one from a description, clone a pre-built agent from the Marketplace, or build from scratch.
2. **Give them tools** — equip agents with actions like sending emails, updating your CRM, searching the web, or calling any API — all built in a no-code tool builder.
3. **Add knowledge** — connect your data so agents respond with accuracy. Upload files, sync from workspace folder, SharePoint, Notion, or pull from websites.
4. **Connect them into workforces** — link multiple agents together on a visual canvas to handle complex, multi-step workflows. Each agent focuses on what it’s best at, and the workforce handles the handoffs.
5. **Set guardrails and deploy** — configure escalations, approval workflows, and triggers, then put your workforce to work.

### Popular Use Cases

<AccordionGroup>
  <Accordion title="Customer Support" icon="headset">
    Deploy AI agents that handle routine inquiries, troubleshoot common issues, and escalate complex problems to human agents. Reduce response times and free your support team to focus on high-value interactions.
  </Accordion>

  <Accordion title="Sales & Lead Qualification" icon="chart-line">
    Automate prospect research, lead qualification, and initial outreach. AI agents can engage with prospects, gather information, and identify promising leads for your sales team to close.
  </Accordion>

  <Accordion title="Content Creation" icon="pen-to-square">
    Generate drafts of routine documents, reports, social media posts, and communications. Maintain your brand voice while scaling content production.
  </Accordion>

  <Accordion title="Data Analysis & Reporting" icon="chart-mixed">
    Process and summarize large volumes of information to extract actionable insights. Automate report generation and data visualization.
  </Accordion>

  <Accordion title="Scheduling & Coordination" icon="calendar-days">
    Manage calendars, set up meetings, send reminders, and coordinate across teams. Eliminate scheduling conflicts and reduce administrative overhead.
  </Accordion>
</AccordionGroup>

### Learning Resources

<CardGroup cols="3">
  <Card title="Academy" icon="graduation-cap">
    Structured courses and tutorials to master the platform
  </Card>

  <Card title="Community" icon="users" >
    Join our Community to connect with other users and get help from the team
  </Card>

  <Card title="Blog & Updates" icon="newspaper">
    Stay updated with the latest features, best practices, and customer stories
  </Card>
</CardGroup>

***

Ready to build your AI Workforce? Start building now!


---

# Page: Quick Start

Path: `get-started/quick-start-guide`.

## Quick Start

> Build and test your first AI agent in under 5 minutes.

This guide gets you from zero to a working agent as fast as possible. Pick one of three paths, follow the steps, and see your agent in action.

These steps assume you’re logged in and on the home screen. If you don’t have an account yet, sign up for free.

### Step 1: Create your first Agent

There are three ways to get started. Pick the one that fits you best.

<CardGroup cols="3">
  <Card title="Invent an Agent" icon="wand-magic-sparkles" href="#option-1-invent-an-agent">
    Describe what you want and let AI build it for you
  </Card>

  <Card title="Clone from Marketplace" icon="clone" href="#option-2-clone-from-marketplace">
    Grab a pre-built agent and make it yours
  </Card>

  <Card title="Build from scratch" icon="hammer" href="#option-3-build-from-scratch">
    Full control over every detail
  </Card>
</CardGroup>

#### Option 1: Invent an Agent

The fastest way to get started. Describe what you need and we’ll generate a working agent for you.



1. Click **Agents** in the left sidebar
2. Click **+ Create Agent**
3. Select **Invent**
4. Describe what you want your agent to do — be specific about the task, the output you expect, and any integrations it should use. For example: *“Create an agent that researches a company before a sales call. It should use web search to find recent news, funding, and key contacts, then output a one-page brief with company overview, decision makers, and talking points.”*
5. Review the generated agent — Inventor will set up the prompt and suggest tools
6. Connect any integrations your tools need (e.g. Outlook, HubSpot, LinkedIn) in the Tools section of the Agent builder, or [add integrations](integrations.md) (page `integrations/add-integrations`) from the sidebar

<Tip>
  Best when you know what you want and can describe it clearly. Great for getting a concept off the ground quickly — Inventor handles the setup, you make the tweaks.
</Tip>

#### Option 2: Clone from Marketplace

Start with an agent that’s already been built and tested by domain experts.

1. Go to Marketplace or click **Marketplace** in the left sidebar
2. Browse or search for an agent that matches your use case
3. Click on the agent to view its details
4. Click **Clone** to add it to your workspace
5. A setup popup will walk you through connecting any integrations the agent needs — follow the prompts to link your accounts
6. Review the prompt, tools, and settings — adjust anything you need

<Tip>
  Great when you have a common use case — like lead qualification, meeting prep, or customer support — and want a proven starting point. Clone it, tweak it, ship it.
</Tip>

#### Option 3: Build from scratch

Full control from the ground up. Best if you have a specific workflow in mind.

1. Click **Agents** in the left sidebar
2. Click **+ Create Agent**
3. Select **Start from scratch**
4. Write a [prompt](build__agents__build-your-agent.md) (page `build/agents/build-your-agent/prompt`) — tell the agent who it is, what it does, and how it should behave
5. Add [tools](build__agents__build-your-agent.md) (page `build/agents/build-your-agent/tools`) — give it the actions it needs (search the web, send emails, update your CRM, etc.)
6. Optionally add [knowledge](build__knowledge.md) (page `build/knowledge/create-knowledge`) — upload docs or connect data sources for context

For a full breakdown of building with the platform, see [Build with the platform](build.md) (page `build/introduction`).

### Step 2: Test your Agent



Head to the **Run** tab to give your agent a task. This is a real run — you can see exactly what tools it calls, what output it produces, and how it handles the task end-to-end.

<Tip>
  You can also use your agent in the platform Chat — a conversational interface where you and your team can @ mention any agent.
</Tip>

### Step 3: Refine

If the output isn’t quite right, iterate:

* **Tighten the prompt** — be more specific about what you want, how it should be formatted, and what tone to use
* **Add or adjust tools** — make sure the agent has access to the right actions for the job
* **Add knowledge** — upload docs, connect data sources, or add context so the agent has what it needs

Test again after each change. A few rounds of this and you’ll have a solid agent.

### Step 4: Share and deploy

Once you’re happy with the output, put your agent to work:

* [Share your agent](build__agents.md) (page `build/agents/share-your-agent`) with your team so others can use it
* Use the platform Chat to give your team instant access to your agents
* Set up [triggers](build__agents__build-your-agent.md) (page `build/agents/build-your-agent/triggers`) to run it automatically — on a schedule, from a webhook, or when something happens in your CRM
* Use [bulk schedule](build__agents__give-your-agent-tasks.md) (page `build/agents/give-your-agent-tasks/bulk-schedule`) to run it across a list of inputs
* Add [alerts](build__agents__build-your-agent.md) (page `build/agents/build-your-agent/alerts`) so you get notified when something needs attention, and the agent knows when to loop in a human

### Beyond building

Now that you’ve got an agent up and running, there’s more to explore across the platform.

#### Use your Agents in Chat



The platform Chat is a conversational interface where you and your team interact with your agents directly. Type a message, @ mention any agent in your project, and it will handle the task using the tools and knowledge you’ve configured. You can switch between LLMs, combine multiple agents in a single conversation, save prompts your team uses often, and @ mention project files to insert their paths directly into your message. Chat also comes with built-in agents for things like building websites, generating images, deep research, and creating presentations.

Visit <your-server-url> to get started — it works on desktop and mobile.

#### Browse the Marketplace

The Marketplace is a curated library of pre-built agents and tools created by the platform and the community. Instead of building from scratch, you can clone an agent that’s already been designed and tested for common use cases — lead qualification, customer support, meeting prep, and more. Once cloned, you have full control to customize the agent’s prompt, tools, and settings to fit your needs.

#### Build from your AI coding environment

Prefer to work from your terminal? Connect your AI coding environment — Claude Code, Cursor, or any MCP-compatible client — to the platform over MCP. Describe what you want in natural language and your AI assistant builds and edits your Agents, Tools, and Workforces directly. See [MCP & Plugins](get-started__core-concepts.md) (page `get-started/core-concepts/mcp-plugins`) to get started.

#### Learn with Academy

The platform Academy offers structured courses and tutorials that take you from your first agent to production-grade workforces — at your own pace.

***

Ready to go deeper? Head to [Build with the platform](build.md) (page `build/introduction`) for a full breakdown of how to configure agents, tools, knowledge, and multi-agent workforces.

