# The platform docs: `build/agents/`

3 pages, downloaded on 11/16/2026.


---

# Page: Create an Agent

Path: `build/agents/create-an-agent`.

## Create an Agent

> How to create your first Agent in the platform.

This guide walks you through creating an Agent. For an overview of what Agents are and how they work, see [Agents](get-started__core-concepts.md) (page `get-started/core-concepts/agents`).

### Three ways to create

<CardGroup cols="3">
  <Card title="Invent an Agent" icon="wand-magic-sparkles" href="#option-1-invent-an-agent">
    Describe what you want and let AI build it for you
  </Card>

  <Card title="Clone from Marketplace" icon="clone" href="#option-2-clone-from-marketplace">
    Grab a pre-built Agent and make it yours
  </Card>

  <Card title="Build from scratch" icon="hammer" href="#option-3-build-from-scratch">
    Full control over every detail
  </Card>
</CardGroup>

### Option 1: Invent an Agent

The fastest way to get started. Describe what you need and we’ll generate a working Agent for you.



1. Click **Agents** in the left sidebar
2. Click **+ Create Agent**
3. Select **Invent**
4. Describe what you want your Agent to do — be specific about the task, the output you expect, and any integrations it should use. For example: *“Create an agent that researches a company before a sales call. It should use web search to find recent news, funding, and key contacts, then output a one-page brief with company overview, decision makers, and talking points.”*
5. Review the generated Agent — Inventor will set up the prompt and suggest Tools
6. Connect any integrations your Tools need (e.g. Outlook, HubSpot, LinkedIn) in the Tools section of the Agent builder, or [add integrations](integrations.md) (page `integrations/add-integrations`) from the sidebar

<Tip>
  Best when you know what you want and can describe it clearly. Great for getting a concept off the ground quickly — Inventor handles the setup, you make the tweaks.
</Tip>

### Option 2: Clone from Marketplace

Start with an Agent that’s already been built and tested by domain experts.



1. Go to Marketplace or click **Marketplace** in the left sidebar
2. Browse or search for an Agent that matches your use case
3. Click on the Agent to view its details
4. Click **Clone** to add it to your workspace
5. A setup popup will walk you through connecting any integrations the Agent needs — follow the prompts to link your accounts
6. Review the prompt, Tools, and settings — adjust anything you need

<Tip>
  Great when you have a common use case — like lead qualification, meeting prep, or customer support — and want a proven starting point. Clone it, tweak it, ship it.
</Tip>

### Option 3: Build from scratch

<Info>
  New to the platform? The platform Academy has structured courses that walk you through building on the platform step by step.
</Info>

Full control from the ground up. Best if you have a specific workflow in mind.



1. Click **Agents** in the left sidebar
2. Click **+ Create Agent**
3. Select **Start from scratch**
4. Write a [prompt](build__agents__build-your-agent.md) (page `build/agents/build-your-agent/prompt`) — tell the Agent who it is, what it does, and how it should behave
5. Add [Tools](build__agents__build-your-agent.md) (page `build/agents/build-your-agent/tools`) — give it the actions it needs (search the web, send emails, update your CRM, etc.)
6. Optionally add [Knowledge](build__knowledge.md) (page `build/knowledge/create-knowledge`) — upload docs or connect data sources for context

### What’s next?

Once you’ve created an Agent, explore the rest of the build guides to refine it:

* [Prompt](build__agents__build-your-agent.md) (page `build/agents/build-your-agent/prompt`) — write instructions that define your Agent’s behavior
* [Tools](build__agents__build-your-agent.md) (page `build/agents/build-your-agent/tools`) — give your Agent the actions it needs
* [Triggers](build__agents__build-your-agent.md) (page `build/agents/build-your-agent/triggers`) — run your Agent automatically on a schedule, from a webhook, or from an integration
* [Alerts](build__agents__build-your-agent.md) (page `build/agents/build-your-agent/alerts`) — get notified when your Agent needs attention, and define when it should loop in a human
* [Memory](build__agents__build-your-agent.md) (page `build/agents/build-your-agent/memory`) — configure how your Agent retains context across conversations
* [Version history](build__agents__build-your-agent.md) (page `build/agents/build-your-agent/version-history`) — every save creates a snapshot you can restore, so you can experiment without losing working versions


---

# Page: Delete Your Agent

Path: `build/agents/delete-agent`.

## Delete Your Agent

> Remove your Agents from the platform

Deleting Agents is a permanent action and cannot be undone. Once an Agent is deleted, it will no longer be available in your the platform project.

### How to delete an Agent

<div style="{ width:"100%",position:"relative","padding-top":"56.75%"}">
  <iframe src="https://app.supademo.com/embed/cmfw4l4vp2ta610k8eopeuoas" frameBorder="0" title="How to delete an Agent" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

1. Click ‘Agents’ in the sidebar of the platform
2. Click on the three dots button next to the Agent you want to delete, then select ‘Delete’
3. On the pop-up that appears, click ‘Delete’ to confirm the permanent deletion

<Warning>
  Deleting an Agent is a permanent action and cannot be undone. Once an Agent is deleted, it will no longer be available in your the platform project.
</Warning>

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="What happens if my Agent that I've deleted is clonable?">
    If your deleted Agent is clonable, it will no longer be available for cloning, but people who have already cloned it will still be able to use it.
  </Accordion>

  <Accordion title="I accidentally deleted an Agent, can you recover it?">
    Unfortunately, we cannot recover deleted Agents. Once an Agent is deleted, it will no longer be available in your the platform project. Our support team also cannot recover deleted Agents.
  </Accordion>
</AccordionGroup>


---

# Page: Share Your Agent

Path: `build/agents/share-your-agent`.

## Share Your Agent

> Learn how to share your agent with others using different UI options

### Overview

Easily share your AI agent with others by choosing how they can interact with it. Whether you want to send a live chat link, embed a support widget, showcase tasks in an iframe, or allow full template cloning, you have flexible options to fit any use case.

<Warning>
  Enabling any embed option (Chat UI, Chat Widget, or Task UI) or the Clonable Template option makes your Agent publicly accessible. The resulting link is a public URL that search engines can index and that anyone can share, so the Agent may be discovered without you sending the link yourself — anyone with it can run your Agent on your credits or clone it into their own project. Disable the option in the Agent’s share settings to revoke access.
</Warning>

### Clonable Template

Let others clone your Agent - complete with its instructions and setup - into their own workspace. This makes it easy to share best practices, pre-built use cases, or workflows without needing to rebuild from scratch. Cloned agents use the recipient’s credits, not yours, making this perfect for scalable distribution.

<div style="{ width: '100%', position: 'relative', paddingTop: '56.25%' }">
  <iframe src="https://app.supademo.com/embed/cma29kkqd26vk13m0oed5ldml?embed_v=2" frameBorder="0" title="the platform Demo" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '3px solid #5E43CE', borderRadius: '10px' }" />
</div>

### Copy to Project

Want to create a copy of your agent for yourself? Use the “Copy to Project” feature to duplicate agents quickly between different projects. This preserves all agent configurations, settings, and instructions.

<div style="{ width: '100%', position: 'relative', paddingTop: '56.25%' }">
  <iframe src="https://app.supademo.com/embed/cmkgd0qcs06kd1363yj9b3kw6?embed_v=2" frameBorder="0" title="the platform Demo" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '3px solid #5E43CE', borderRadius: '10px' }" />
</div>

### Chat UI

Let others interact with your Agent through a clean, conversation-style interface — just like a chatbot. You can share it via a link or embed it as an iframe. This is perfect for letting people experience your Agent without modifying anything. All usage is billed to your account, and others can use the Agent without needing to set it up themselves.

<div style="{ width: '100%', position: 'relative', paddingTop: '56.25%' }">
  <iframe src="https://app.supademo.com/embed/cma28o7c025yi13m0vky5wvrg?embed_v=2" frameBorder="0" title="the platform Demo" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '3px solid #5E43CE', borderRadius: '10px' }" />
</div>

##### Developer Notes

<Note>
  The `iframe` inherits `100%` of its parent container by default. Configure your container’s dimensions carefully to ensure the iframe displays correctly within your page layout without causing layout issues.
</Note>

### Chat Widget

Turn your Agent into a pop-up chat interface you can embed on any website with a simple script tag. It behaves like a support chat window and is ideal for customer-facing use cases like answering questions, handling requests, or collecting feedback directly on your site.

<div style="{ width: '100%', position: 'relative', paddingTop: '56.25%' }">
  <iframe src="https://app.supademo.com/embed/cma29ej0x26k313m03yp169lg?embed_v=2" frameBorder="0" title="the platform Demo" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '3px solid #5E43CE', borderRadius: '10px' }" />
</div>

<Warning>
  **User Level Authentication is not supported in embedded chat widgets.** If your agent uses User Level Authentication (an Enterprise feature that allows each user to authenticate with their own credentials), this will not work in embedded chat widgets. For embedded agents, you’ll need to configure your agent to use a shared account for integrations instead.
</Warning>

##### Developer Notes

<Note>
  Target the `.platform-chat-bubble-app` class to style the chat bubble. Adjust its `z-index` property to position the bubble above or below other UI elements such as cookie popups and toast messages.
</Note>

| URL parameter              | Type      | Values                                                                                                                                                                                                   | Description                                         | Examples                                               |
| -------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------- | ------------------------------------------------------ |
| `primary_color`            | `string`  |                                                                                                                                                                                                          | A valid CSS color for your form.                    | `#685fff`                                              |
| `bubble_style`             | `enum`    | `agent, icon`                                                                                                                                                                                            | Use an agents avatar or the `bubble_icon`.          | `agent`                                                |
| `bubble_icon`              | `enum`    | `pd/ai-agent, notebook/deploy, pencil, star, sparkle, sparkles, pd/lightning-filled, pd/chat, pd/send-diagonal, stack, duration, pd/check, pd/play, arrow-r, pd/search, share, plus, pd/question-filled` | The icon to use if `bubble_style` is set to `icon`. |                                                        |
| `input_placeholder_text`   | `string`  |                                                                                                                                                                                                          | Set the message input placeholder text.             | `Type your question here…`                             |
| `hide_file_uploads`        | `boolean` |                                                                                                                                                                                                          | Toggle file uploads.                                | `true`                                                 |
| `hide_conversation_list`   | `boolean` |                                                                                                                                                                                                          | Toggle multiple conversations.                      | `true`                                                 |
| `hide_tool_steps`          | `boolean` |                                                                                                                                                                                                          | Toggle tool steps.                                  | `true`                                                 |
| `starting_message_prompts` | `string`  |                                                                                                                                                                                                          | Add starting prompts.                               | `["I need help with my billing", "Write me an email"]` |
| `hide_logo`                | `boolean` |                                                                                                                                                                                                          | Toggle the platform branding.                       | `false`                                                |
| `hide_description`         | `boolean` |                                                                                                                                                                                                          | Toggle agent description.                           | `true`                                                 |

### Task UI

This gives users access to a task-focused version of your Agent via an iframe. Users can view past task runs, pick from existing tasks, and even interact with outputs — all within a self-contained UI. It’s great for operational dashboards, workflow demos, or giving others visibility into what your Agent is doing.

<div style="{ width: '100%', position: 'relative', paddingTop: '56.25%' }">
  <iframe src="https://app.supademo.com/embed/cma29kkqd26vk13m0oed5ldml?embed_v=2" frameBorder="0" title="the platform Demo" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '3px solid #5E43CE', borderRadius: '10px' }" />
</div>

### SDK

For developers who want full control over the user experience, you can build custom agent integrations directly into your website or application using our JavaScript/TypeScript SDK.

The SDK gives you complete flexibility to:

* Design custom chat interfaces that perfectly match your brand
* Build unique user experiences beyond what the standard embeds offer
* Integrate agent capabilities into existing applications
* Handle real-time messaging and task management programmatically

The SDK works seamlessly with modern frameworks and runtimes including React, Vue, Node.js, Deno, Bun, and Cloudflare Workers. You can use AI-powered coding tools like Cursor to help you build your integration quickly.

Visit our SDK repository to get started: [https://github.com/AI/js-sdk](https://github.com/AI/js-sdk)

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Why can't I clone an agent that I originally cloned from the Marketplace?">
    Some the platform Builders have chosen to restrict cloning of agents that originated from their Marketplace listings. This prevents users from redistributing paid listings to avoid payment and protects the builder’s intellectual property.

    If you need another copy of the agent, you can return to the Marketplace and clone the original listing again or add it to other projects directly from there.
  </Accordion>

  <Accordion title="Why can't I use Copy to Project on an agent I cloned from the Marketplace?">
    Some the platform Builders have chosen to restrict copying of agents that originated from their Marketplace listings. The Copy to Project feature is disabled for these agents to prevent users from redistributing paid listings without proper authorization and to protect the builder’s intellectual property.

    To add the agent to additional projects, visit the Marketplace and clone the original listing directly to each project where you need it.
  </Accordion>
</AccordionGroup>

