# The platform docs: `build/workforces/`

2 pages, downloaded on 11/16/2026.


---

# Page: Create a Workforce

Path: `build/workforces/create-a-workforce`.

## Create a Workforce

> How to create your first Workforce in the platform.

This guide walks you through creating a Workforce. For an overview of what Workforces are and how they work, see [Workforces](get-started__core-concepts.md) (page `get-started/core-concepts/workforces`).

<Frame caption="Get started with Workforce — learn how to create visual Agent workflows.">
  <iframe className="w-full aspect-video rounded-xl" src="https://www.youtube.com/embed/-YucNGjfoWA" title="YouTube video player" />
</Frame>

### Create your first Workforce

<Info>
  New to the platform? The platform Academy has structured courses that walk you through building on the platform step by step.
</Info>

1. Click **Workforce** in the left sidebar
2. Click **+ New Workforce** to open the visual canvas
3. Add your Agents to the canvas by dragging them from the sidebar
4. Connect your Agents by drawing lines between them
5. Configure each connection — choose between an **AI connection** (the Agent decides when to hand off) or a **next step** (mandatory transition)
6. Add Tools to your workflow as needed
7. Set up any conditional logic for routing
8. Save your Workforce



<Tip>
  Map out your process before building — know which Agents handle which steps and how they hand off. Simpler Workforces with clearly defined roles tend to perform better than overly complex ones.
</Tip>

### What’s next?

Once you’ve created a Workforce, explore the rest of the build guides to refine it:

* [Add triggers](build__workforces__build-an-ai-workforce.md) (page `build/workforces/build-an-ai-workforce/add-triggers`) — configure what starts your Workforce (manual, integration, or scheduled)
* [Introduction to nodes](build__workforces__build-an-ai-workforce.md) (page `build/workforces/build-an-ai-workforce/introduction-to-nodes`) — understand the building blocks of your Workforce canvas
* [Add Agents](build__workforces__build-an-ai-workforce.md) (page `build/workforces/build-an-ai-workforce/add-agents`) — add and configure Agents on the canvas
* [Add Tools](build__workforces__build-an-ai-workforce.md) (page `build/workforces/build-an-ai-workforce/add-tools`) — connect Tools directly within your workflow
* [Add conditions](build__workforces__build-an-ai-workforce.md) (page `build/workforces/build-an-ai-workforce/add-conditions`) — create routing rules for smarter workflows
* [Edge settings](build__workforces__build-an-ai-workforce.md) (page `build/workforces/build-an-ai-workforce/edge-settings`) — configure how connections between nodes behave
* [Version history](build__agents__build-your-agent.md) (page `build/agents/build-your-agent/version-history`) — every save creates a snapshot you can restore, so you can experiment without losing working versions


---

# Page: Share your Workforce

Path: `build/workforces/share-your-workforce`.

## Share your Workforce

> Learn how to share your Workforce with others as a cloneable template

### Overview

You can easily share your Workforce with others by creating a cloneable template. Once you create and share your Workforce’s cloneable template, this will allow others to clone your entire Workforce into their own projects.

<Info>
  **Enterprise customers:** When sharing workforces with team members using RBAC, you’ll need to grant permissions to both the workforce and all agents within it. Learn more about Workforce Permissions in RBAC.
</Info>

<Warning>
  Enabling the cloneable template option or any embed option (Chat UI or Chat Widget) makes your Workforce publicly accessible. The resulting link is a public URL that search engines can index and that anyone can share, so the Workforce may be discovered without you sending the link yourself — anyone with it can clone your Workforce or embed it on their site. Disable the option in the Workforce’s share settings to revoke access.
</Warning>

### Cloneable template

You can learn how to share your Workforce as a cloneable template by following these steps:

<div style="{ width: '100%', position: 'relative', paddingTop: '56.25%' }">
  <iframe src="https://app.supademo.com/embed/cmbfspjqz498wsn1r8t02b75k?embed_v=2" frameBorder="0" title="the platform Demo" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '3px solid #5E43CE', borderRadius: '10px' }" />
</div>

1. Open your Workforce and click ‘Run’
2. Then, click ‘Share’
3. Toggle on the button to create a cloneable template of your Workforce
4. Click on ‘Enable public access’ after reading through the message on the screen that pops up
5. Finally, click on ‘Copy’ to copy the link to your Workforce’s cloneable template and share it with others!

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Can I share Workforces with free customers?">
    Unfortunately, the Workforce feature is not available to our free customers, so they will not be able to open the link.
  </Accordion>
</AccordionGroup>

