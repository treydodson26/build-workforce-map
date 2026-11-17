# The platform docs: `build/tools/`

4 pages, downloaded on 11/16/2026.


---

# Page: Create a Tool

Path: `build/tools/create-a-tool`.

## Create a Tool

> How to create your first Tool in the platform.

This guide walks you through creating a Tool. For an overview of what Tools are and how they work, see [Tools](get-started__core-concepts.md) (page `get-started/core-concepts/tools`).

### Two ways to create

<CardGroup cols="2">
  <Card title="Invent" icon="wand-magic-sparkles" href="#option-1-invent-a-tool">
    Describe what you want in plain language and the platform generates a working Tool for you. Great for getting started fast — you make the tweaks.
  </Card>

  <Card title="Build from scratch" icon="hammer" href="#option-2-build-from-scratch">
    Full step-by-step control over inputs, steps, and outputs. Ideal when you have a specific workflow in mind or need precision.
  </Card>
</CardGroup>

### Option 1: Invent a Tool

1. Click **Tools** in the left sidebar
2. Click **+ New Tool**
3. Select **Invent**
4. Describe what the Tool should do — be specific about the input it receives, the action it performs, and the output you expect
5. Review the generated Tool — Inventor will set up the inputs, steps, and outputs for you
6. Test and tweak as needed

### Option 2: Build from scratch

<Info>
  New to the platform? The platform Academy has structured courses that walk you through building on the platform step by step.
</Info>

1. Click **Tools** in the left sidebar
2. Click **+ New Tool**
3. Select **Start from scratch**
4. Give your Tool a name and description, then click **Edit agent prompt** to describe how an Agent should use the Tool
5. Add your **inputs** — what data does the Tool need to receive?
6. Add **steps** — what should the Tool do with that data? Steps include LLM prompts, API calls, integrations, code execution, and more
7. Define your **outputs** — what should the Tool return when it’s done?
8. Run individual steps to test as you build
9. Give the Tool to an Agent or [share it](build__tools.md) (page `build/tools/share-your-tool`) as a standalone form

<div
  style="{
  width: '100%',
  position: 'relative',
  paddingTop: '56.25%',
}"
>
  <iframe
    src="https://app.supademo.com/embed/cm7obxeh703xihilguwnkradd"
    frameBorder="0"
    title="Build an AI agent from scratch in the platform"
    allow="clipboard-write; fullscreen"
    webkitAllowFullscreen="true"
    mozAllowFullscreen="true"
    style="{
    position: 'absolute',
    top: 0,left: 0, width: '100%', height: '100%',
    border: '3px solid #5E43CE',
    borderRadius: '10px',
  }"
  />
</div>

### The Tool Builder



The Tool Builder has three tabs:

* **Use** — run and test your Tool as a shareable form
* **Build** — create your Tool by defining inputs and chaining steps together
* **Logs** — review past executions and debug issues

### Editing shared tools

When you open a tool that is used by two or more agents, a warning banner appears at the top of the editor. The banner shows how many agents use the tool and warns that your changes will affect all of them.

To edit without affecting other agents, click **Clone this tool** in the banner. This creates an independent copy you can modify and assign to specific agents.

Edit the tool directly when the change should apply across all agents using it — for example, fixing a bug or updating a shared integration. Clone the tool when you need a variation for a specific agent, or want to test changes before applying them broadly.

The banner can be minimized. Your preference is saved per tool, so minimized banners stay minimized on future visits.

### Follow along on YouTube

<Frame caption="Learn how to build Tools that can work with multiple data sources.">
  <iframe className="w-full aspect-video rounded-xl" src="https://www.youtube.com/embed/bP7SMGr72ZM" title="Build Tools for Multiple Data Sources" />
</Frame>

### What’s next?

Once you’ve created a Tool, explore the rest of the build guides to refine it:

* [Style guide](build__tools__customize-tool.md) (page `build/tools/customize-tool/tool-style-guide`) — naming conventions and best practices for making Tools work well with Agents
* [Inputs](build__tools__customize-tool.md) (page `build/tools/customize-tool/inputs`) — configure what data your Tool receives
* [Steps](build__tools__customize-tool.md) (page `build/tools/customize-tool/steps`) — chain actions together into a workflow
* [Outputs](build__tools__customize-tool.md) (page `build/tools/customize-tool/outputs`) — define what your Tool returns
* [Version history](build__agents__build-your-agent.md) (page `build/agents/build-your-agent/version-history`) — every save creates a snapshot you can restore, so you can experiment without losing working versions


---

# Page: Delete a tool or tool step

Path: `build/tools/delete-tool`.

## Delete a tool or tool step

> How to delete tools and individual tool steps

### Differences between deleting a tool and deleting a tool step

**Tool deletion vs. tool step deletion:**

* **Delete tool** (Tools section): Permanently removes the tool from your project and all agents
* **Delete a tool step** (Agent Builder → Tools): Removes a single action within an existing tool’s workflow

## Delete a tool

When you no longer need a tool, you can permanently delete it from your project.

<Warning>
  Deleting a tool is permanent and cannot be undone. If an agent or workflow is using this tool, removing it will cause those agents to lose access and may result in errors during task execution. Consider checking which agents use this tool before deleting.
</Warning>

### Before you delete

Before deleting a tool, check if any agents are using it:

1. Navigate to **Agents** in the left sidebar
2. Open each agent that might use this tool
3. Go to the **Tools** section in the Agent Builder
4. Check if your tool appears in the agent’s tool list

If agents are using the tool, you’ll need to remove it from those agents first or assign alternative tools to avoid possible execution errors within the agent.

### Steps to delete a Tool

<div style="{ width:"100%",position:"relative",paddingTop:"56.25%"}">
  <iframe src="https://app.supademo.com/embed/cmha1blw10kko6kif6439pa2n" frameBorder="0" title="Invite a user to a project in the platform" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

1. Navigate to **Tools** in the left sidebar (not the Tools section within an agent)
2. Find the tool you want to delete
3. Click on the three-dot menu (⋮) in the top right corner
4. Select **Delete**
5. Confirm the deletion when prompted

### What happens when you delete a tool

When you delete a tool:

* The tool is permanently removed from your project
* Any agents using this tool will no longer have access to it
* Bulk runs in progress using this tool may fail
* Shared links to the tool will stop working
* The tool cannot be recovered

## Delete individual tool steps

You can remove specific steps from a tool without deleting the entire tool. This is useful when refining your tool’s workflow or removing unnecessary steps.

### Steps to delete a tool step

<div style="{ width:"100%",position:"relative",paddingTop:"56.25%"}">
  <iframe src="https://app.supademo.com/embed/cmha1uf040kvo6kifackvn7eg" frameBorder="0" title="Invite a user to a project in the platform" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

1. Open your tool in the **Build** tab
2. Find the step you want to remove
3. Click on the three-dot menu (⋮) in the top right corner of the step
4. Select **Delete step**
5. The step will be removed immediately

<Tip>
  Before deleting a step, check if other steps reference its output. If they do, you’ll need to update those references to avoid errors.
</Tip>

### What happens when you delete a tool step

When you delete an individual tool step:

* The step is immediately removed from the tool’s workflow
* Any subsequent steps that reference this step’s output will show an error
* You’ll need to update or remove references to the deleted step
* The deletion takes effect immediately upon saving the tool


---

# Page: Share your Tool

Path: `build/tools/share-your-tool`.

## Share your Tool

> Learn how to share your Tool with others using different UI options

When building a tool, as the owner of the tool, you have full control over how you want it to be shared with your colleagues or teammates.

By default, your tool is only accessible by you and your agents. Click on `Share` to:

1. Create a sharable link for your tool
2. Get an embeddable iframe for your tool
3. Allow others to clone a copy of your tool

<Warning>
  Enabling a sharable link, embed, or cloneable template option makes your Tool publicly accessible. The resulting link is a public URL that search engines can index and that anyone can share, so the Tool may be discovered without you sending the link yourself — anyone with it can run your Tool on your credits or clone it into their own project. Disable the option in the Tool’s share settings to revoke access.
</Warning>

<div
  style="{
  width: '100%',
  position: 'relative',
  paddingTop: '56.25%',
}"
>
  <iframe
    src="https://app.supademo.com/embed/cm7ob1zzw0393hilgqrw8b0zy"
    frameBorder="0"
    title="Build an AI agent from scratch in the platform"
    allow="clipboard-write; fullscreen"
    webkitAllowFullscreen="true"
    mozAllowFullscreen="true"
    style="{
    position: 'absolute',
    top: 0,left: 0, width: '100%', height: '100%',
    border: '3px solid #5E43CE',
    borderRadius: '10px',
  }"
  />
</div>

### Sharable link

If you share your Tool as a sharable link, people you share your Tool with will be able to run your Tool from your account.

<Warning>
  You will be charged for any Tool runs that those with access to your Tool perform.
</Warning>

When sharing your Tool as a sharable link, you can select:

* A primary color for your form
* A guidance tip
* A Call to Action (CTA) button
* The platform branding

### Embed your Tool

You can also embed your Tool onto a website so that users can run your Tool from your site / app.

<Warning>
  You will be charged for any Tool runs from those who run your Tool through your embedded iframe.
</Warning>

When sharing your Tool as a sharable link, you can select:

* A primary color for your form
* A guidance tip
* A Call to Action (CTA) button
* The platform branding

### Cloneable template

You can share a link to allow anyone with the link to clone your Tool to their the platform project. This is the best option to use if you want to share your Tool with someone but do not want them using your project / credits.

Once someone clones your tool to their project, their cloned tool will not be updated with any changes you make to it.


---

# Page: Tool steps

Path: `build/tools/tool-steps`.

## Tool steps

> Find info on our most popular Tool steps in the platform

<Info>
  This section of our knowledge base is under construction. We have 2000+ integrations and we’re adding to this page gradually with more info on each of our most popular Tool steps. If you’re running into issues with a certain Tool step, or would like to see a doc on a certain Tool step, please reach out to our support team!
</Info>

### LLM Tool steps

<Columns cols="2">
  <Card title="LLM" href="build__tools__tool-steps__llms.md">
    Use a LLM as a step in your Tools
  </Card>

  <Card title="More to come!">
    More help docs to come!
  </Card>
</Columns>

### Popular Tool steps

<Columns cols="2">
  <Card title="Firecrawl" href="build__tools__tool-steps.md">
    Use Firecrawl to turn websites into LLM-ready data
  </Card>

  <Card title="Extract Website Content" href="build__tools__tool-steps.md">
    Turn websites into text or HTML to use in your Tools and Agents
  </Card>
</Columns>

<Columns cols="2">
  <Card title="API" href="build__tools__tool-steps.md">
    Use a Tool step to call any API
  </Card>

  <Card title="web search" href="build__tools__tool-steps.md">
    Run a web search for any query to analyse in your Tools and Agents
  </Card>
</Columns>

<Columns cols="2">
  <Card title="Python" href="build__tools__tool-steps__python-code.md">
    Use a Tool step to code using Python
  </Card>

  <Card title="Delay" href="build__tools__tool-steps.md">
    Delay your Tools and Agents using a Tool step
  </Card>
</Columns>

### Conversion Tool steps

<Columns cols="2">
  <Card title="Convert spreadsheet to JSON" href="build__tools__tool-steps.md">
    Use a Tool step to convert CSVs and XLSXs into JSON
  </Card>

  <Card title="Convert a file to text" href="build__tools__tool-steps.md">
    Use a Tool step to convert supported files into text
  </Card>
</Columns>

<Columns cols="2">
  <Card title="Convert PDF to text" href="build__tools__tool-steps.md">
    Use a Tool step to convert PDFs into text for LLMs to read
  </Card>

  <Card title="Convert audio/video to text" href="build__tools__tool-steps.md">
    Use a Tool step to convert audio and video files to text using three different models
  </Card>
</Columns>

### Knowledge Tool steps

<Columns cols="2">
  <Card href="build__tools__tool-steps__knowledge.md" title="Insert Knowledge">
    Use a Tool step to insert data to your knowledge table.
  </Card>

  <Card href="build__tools__tool-steps__knowledge.md" title="Delete Knowledge">
    Use a Tool step to delete data from your knowledge table.
  </Card>

  <Card href="build__tools__tool-steps__knowledge.md" title="Update Knowledge">
    Use a Tool step to update data in your knowledge table.
  </Card>

  <Card href="build__tools__tool-steps__knowledge.md" title="Knowledge Search">
    Use a Tool step to search your knowledge table.
  </Card>

  <Card href="build__tools__tool-steps__knowledge.md" title="Advanced Knowledge Search (2m)">
    Use a Tool step to search your knowledge table with a prompt.
  </Card>

  <Card  title="Advanced Knowledge Search">
    Use a Tool step to search your knowledge table with more accuracy.
  </Card>

  <Card href="build__tools__tool-steps__knowledge.md" title="Get Knowledge">
    Use a Tool step to get data from your knowledge table through search filters.
  </Card>
</Columns>

### Integration Tool Steps

#### Confluence

<Warning>
  This section is under construction.
</Warning>

<Columns cols="2">
  <Card href="build__tools__tool-steps__confluence.md" title="Create Post">
    Use a Tool step to add a blog post to your Confluence space.
  </Card>

  <Card href="build__tools__tool-steps__confluence.md" title="Search Content">
    Use CQL to search through Confluence in the platform.
  </Card>
</Columns>

#### LinkedIn

<Card href="build__tools__tool-steps__linkedin.md" title="Search LinkedIn Profiles">
  Search through LinkedIn profiles using this Tool step
</Card>

<Card href="build__tools__tool-steps__linkedin.md" title="LinkedIn Action">
  Perform actions on LinkedIn using this Tool step
</Card>

<Card href="build__tools__tool-steps__linkedin.md" title="Get a LinkedIn Profile/Company and Posts">
  Fetch a LinkedIn profile / company and its posts
</Card>

#### Slack

<Columns cols="2">
  <Card href="build__tools__tool-steps__slack.md" title="Send Message">
    Use a Tool step to send a message to your Slack channel.
  </Card>

  <Card href="build__tools__tool-steps__slack.md" title="Retrieve Messages">
    Use a Tool step to retrieve messages from one of your Slack channels.
  </Card>
</Columns>

#### Trello

<Warning>
  This section is under construction.
</Warning>

<Columns cols="2">
  <Card href="build__tools__tool-steps__trello.md" title="Add Checklist">
    Use a Tool step to add a checklist to your Trello card.
  </Card>

  <Card href="build__tools__tool-steps__trello.md" title="Add Comment">
    Use a Tool step to add a comment to your Trello card.
  </Card>
</Columns>

<Columns cols="2">
  <Card href="build__tools__tool-steps__trello.md" title="Archive Card">
    Use a Tool step to archive a Trello Card from the platform.
  </Card>

  <Card href="build__tools__tool-steps__trello.md" title="Create a Checklist Item">
    Use a Tool step to add a checklist item to a checklist in Trello.
  </Card>
</Columns>

#### Microsoft Office on Windows (COM)

Mail, calendar, documents, spreadsheets, and files run through the local `workforce` MCP server's `com` family on a Windows host with desktop Office and classic Outlook. See [Microsoft Office COM tool steps](build__tools__tool-steps__microsoft-office-com.md) for every operation, its parameters, and its known gaps.

- **Outlook mail**: `outlook_add_category`, `outlook_list_categories`, `outlook_create_draft`, `outlook_send`, `outlook_search`, `outlook_get_message`.
- **Outlook calendar**: `outlook_create_event`, `outlook_list_events`, `outlook_get_event`, `outlook_cancel_event`, `outlook_free_busy`, `outlook_list_calendars`.
- **Word**: `word_create_document`, `word_read_document`, `word_append_text`, `word_append_image`, `word_replace_text`.
- **Excel**: `excel_append_row`, `excel_read_range`, `excel_update_range`, `excel_add_worksheet`.
- **Files (FileSystemObject)**: `fs_list`, `fs_read`, `fs_write`, `fs_move`, `fs_delete`, `fs_create_folder`.
