# The platform docs: `build/`

1 pages, downloaded on 11/16/2026.


---

# Page: Build with the platform

Path: `build/introduction`.

## Build with the platform

> An overview of building and managing agents with Invent or configuring agents, tools, knowledge, and workforces directly.

The platform has two main experiences — the builder platform for creating, and Chat for using.

The **builder platform** is where you create and configure everything — agents, tools, workforces, and knowledge. You’ll also find the Marketplace here, where you can clone pre-built agents and tools instead of starting from scratch. This section of the docs covers the builder platform and all of its features.

**the platform Chat** is a conversational interface where you and your team interact with your agents directly. You can @ mention agents, use multiple agents in a single conversation, and give your team access to your agents — all through a familiar chat experience.

This section focuses on building. To learn more about Chat, head to the Chat page in Getting Started.



<Tip>
  Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) anywhere in the builder to search across the platform. One search box finds pages, settings, agents, tools, workforces, knowledge tables and your Invent chats. It also switches projects and runs quick actions, like creating a new agent.
</Tip>

### Build with Invent

Invent is one of the main ways to build in the platform. Describe a business process in plain language and work with Invent to define its inputs, systems, decisions, exceptions, and measures of success.

Invent creates and connects the Agents, Tools, Triggers, Knowledge, and Workforces needed to run the process. After launch, it can review Evals and live performance, diagnose quality problems, and propose tested improvements for your approval.

<Card title="Explore Invent" icon="wand-magic-sparkles" href="build__invent.md">
  Learn how Invent helps you understand a process, build the Agent team, and maintain its quality after launch.
</Card>

### How it all fits together

Invent can assemble and coordinate these components for you, or you can configure them directly:

<Steps>
  <Step title="Agents — the workers" icon="robot">
    You create [agents](build__agents.md) (page `build/agents/create-an-agent`) that use your tools and knowledge to autonomously complete tasks, following the instructions and guardrails you set.
  </Step>

  <Step title="Tools — the actions" icon="screwdriver-wrench">
    You build [tools](build__tools.md) (page `build/tools/create-a-tool`) that define what your agents can do — call an API, send an email, search your CRM, run custom code, or chain steps together into a workflow.
  </Step>

  <Step title="Workforces — the team" icon="users-gear">
    You connect multiple agents into a [workforce](build__workforces.md) (page `build/workforces/create-a-workforce`) on a visual canvas — they collaborate and hand off work to each other.
  </Step>

  <Step title="Knowledge — the context" icon="brain">
    You connect [knowledge](build__knowledge.md) (page `build/knowledge/create-knowledge`) so agents have access to your data — documents, spreadsheets, databases, websites — and can respond with accuracy.
  </Step>
</Steps>

### Choose how to build

You can work with Invent or configure each component directly:

<CardGroup cols="2">
  <Card title="Build with Invent" icon="wand-magic-sparkles" href="build__invent.md">
    Describe a business process in plain language. Invent builds and connects the Agents, Tools, Knowledge, Triggers, and Workforces needed to run it, then helps monitor and improve performance after launch.
  </Card>

  <Card title="Build directly" icon="hammer" href="build__agents.md">
    Full step-by-step control over every setting and configuration. Ideal when you need precision, have a specific workflow in mind, or want to fine-tune behavior.
  </Card>
</CardGroup>

### What’s next?

Start with [Invent](build__invent.md) (page `build/invent/invent`) to build and manage a process with natural language. To configure each component directly, begin with [building an agent’s prompt](build__agents__build-your-agent.md) (page `build/agents/build-your-agent/prompt`), then explore how to create [custom tools](build__tools__customize-tool.md) (page `build/tools/customize-tool/tool-style-guide`), connect [knowledge sources](build__knowledge.md) (page `build/knowledge/create-knowledge`), and wire it all together in a [workforce](build__workforces__build-an-ai-workforce.md) (page `build/workforces/build-an-ai-workforce/add-triggers`).

