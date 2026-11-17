# The platform docs: `integrations/mcp/`

5 pages, downloaded on 11/16/2026.


---

# Page: Agent skills

Path: `integrations/mcp/agent-skills`.

## Agent skills

> Give your AI coding assistant built-in knowledge of the platform by cloning the agent skills repository.

The [the platform agent skills](https://github.com/the platform/agent-skills) repository is a local reference that teaches your AI coding assistant how to work with the platform. Clone it once and your assistant gets detailed context on agents, tools, workforces, knowledge, analytics, and evals — without needing to figure things out from scratch.

<Info>
  Agent skills work alongside the 

  [MCP server](integrations__mcp.md) (page `integrations/mcp/mcp-server`)

  . The MCP server gives your assistant the 

  **ability**

   to call the platform tools. Agent skills give it the 

  **knowledge**

   to use them well.
</Info>

***

### Quick start

<Steps>
  <Step title="Clone the agent skills repository">
    Choose the path that matches your AI coding assistant:

    <CodeGroup>
      ```bash title="Claude Code"
      git clone https://github.com/the platform/agent-skills ~/.claude/skills/ai
      ```

      ```bash title="OpenAI Codex"
      git clone https://github.com/the platform/agent-skills ~/.agents/skills/ai
      ```

      ```bash title="Cursor / VS Code / Others"
      git clone https://github.com/the platform/agent-skills .agents/skills/ai
      ```
    </CodeGroup>
  </Step>

  <Step title="Connect the MCP server">
    The agent skills provide context, but your assistant still needs the MCP server to actually interact with your the platform project. Follow the setup for your client on the [MCP Server](integrations__mcp.md) (page `integrations/mcp/mcp-server`) page.
  </Step>

  <Step title="Verify the connection">
    Ask your AI assistant to list your agents or tools:

    ```
    > List all my the platform agents
    ```

    If the assistant returns your agents, you’re all set.
  </Step>
</Steps>

***

### What’s included

The agent skills repository contains structured reference documentation that your AI assistant reads on-demand:

<CardGroup cols="2">
  <Card title="SKILL.md" icon="book">
    The main skill definition — covers all 46 MCP tools, critical usage rules, and workflow patterns your assistant should follow.
  </Card>

  <Card title="Reference docs" icon="folder-open">
    Detailed guides for agents, tools, workforces, knowledge, analytics, and evals that the assistant reads when working on specific tasks.
  </Card>
</CardGroup>

#### Topics covered

<CardGroup cols="3">
  <Card title="Agents" icon="robot">
    Creating agents, system prompts, actions, memory, triggers, and troubleshooting.
  </Card>

  <Card title="Tools" icon="wrench">
    Building tools, transformations, OAuth configuration, versioning, and patterns.
  </Card>

  <Card title="Workforces" icon="users">
    Multi-agent orchestration concepts, setup, and debugging.
  </Card>

  <Card title="Knowledge" icon="database">
    Knowledge table operations — creating tables, adding rows, querying data.
  </Card>

  <Card title="Analytics" icon="chart-line">
    Usage metrics and reporting capabilities.
  </Card>

  <Card title="Evals" icon="check-double">
    Testing agent behavior with evaluation cases.
  </Card>
</CardGroup>

***

### Keeping skills up to date

The agent skills repository is a standard Git repo. Pull the latest changes periodically:

```bash
cd ~/.agents/skills/ai  # or ~/.claude/skills/ai
git pull
```

***

### How it works

When your AI assistant encounters a the platform task, it reads the relevant files from the agent skills repository to understand:

* **Which MCP tools to call** — the skill definition maps tasks to specific tool names
* **What parameters to use** — reference docs include required fields and correct formats
* **What pitfalls to avoid** — critical rules like “always fetch full agent config before updating” prevent common mistakes

This means your assistant can handle complex workflows (like creating an agent with tools, triggers, and a system prompt) correctly on the first try, rather than through trial and error.

<Tip>
  Agent skills follow the 

  [Agent Skills open standard](https://github.com/anthropics/agent-skills)

  . Any AI coding assistant that supports this convention can use them.
</Tip>


---

# Page: Claude Code plugin

Path: `integrations/mcp/claude-code`.

## Claude Code plugin

> Use the Claude Code plugin to build and manage your agents directly from your terminal.

The [the platform Claude Code plugin](https://github.com/the platform/cc-plugin) is the fastest way to build the platform agents from your terminal with [MCP & Plugins](get-started__core-concepts.md) (page `get-started/core-concepts/mcp-plugins`). It bundles the MCP server along with built-in skills that teach Claude Code how to work with agents, tools, workforces, knowledge, analytics, and evals — all from your terminal.

### Quick start

<Steps>
  <Step title="Install the plugin">
    Install from the Claude Code marketplace:

    ```bash
    claude plugin marketplace add the platform/cc-plugin
    claude plugin install workforce-platform@cc-plugin
    ```

    <Info>
      Requires Claude Code version 

      **1.0.33**

       or later.
    </Info>
  </Step>

  <Step title="Authenticate">
    Run `/mcp` from within Claude Code, select the **workforce-platform** server, and click **Authenticate** to log in via your browser.

    Authentication is required only once.
  </Step>

  <Step title="Start building">
    You’re ready to go. Try one of the example prompts below or describe what you want to build.
  </Step>
</Steps>

***

### What the plugin includes

<CardGroup cols="3">
  <Card title="MCP server connection" icon="server">
    Full access to your the platform project’s agents, tools, and knowledge.
  </Card>

  <Card title="Built-in skills" icon="graduation-cap">
    Pre-configured prompts and workflows for agents, tools, workforces, triggers, and evaluations.
  </Card>

  <Card title="Context awareness" icon="brain">
    Claude Code understands the platform’s data model, so you can describe what you want in plain language.
  </Card>
</CardGroup>

***

### Example prompts

Once authenticated, you can start building immediately. Here are some things to try:

<Tabs>
  <Tab title="Agents">
    ```
    > Create a BDR agent that qualifies inbound leads from HubSpot
    ```

    ```
    > Set up a workforce where a triage agent routes support tickets to specialist agents
    ```
  </Tab>

  <Tab title="Tools">
    ```
    > Build a tool that enriches a company URL with a one-paragraph summary
    ```

    ```
    > Create a tool that generates personalized cold emails from LinkedIn profiles
    ```
  </Tab>

  <Tab title="Evaluate & debug">
    ```
    > Pull the last 20 conversations for my Support Agent and identify failures
    ```

    ```
    > My BDR agent is letting unqualified leads through — review its instructions and fix it
    ```
  </Tab>
</Tabs>

<Tip>
  Use 

  `/plan`

   in Claude Code to have Claude plan the work before executing — recommended for complex builds.
</Tip>

***

### Working with multiple projects

If you work across multiple the platform projects, add separate MCP server entries for each:

```bash
claude mcp add project-1 --transport http <your-server-url>
claude mcp add project-2 --transport http <your-server-url>
```

Each entry authenticates independently against its own project. This lets you access tools and agents across all your projects without needing to log out and back in.

***

### Troubleshooting

<AccordionGroup>
  <Accordion title="Plugin not installing">
    * Ensure you are running Claude Code version **1.0.33** or later
    * Try running `claude plugin marketplace add the platform/cc-plugin` again
    * Check your internet connection
  </Accordion>

  <Accordion title="Authentication issues">
    * Run `/mcp` and select the **workforce-platform** server to re-authenticate
    * Make sure you have an active the platform account with access to the project
    * Try removing and re-adding the plugin
  </Accordion>

  <Accordion title="Tools not appearing">
    * Verify you have completed authentication via `/mcp`
    * Check that your the platform project has tools and agents configured
    * Try restarting Claude Code
  </Accordion>
</AccordionGroup>


---

# Page: OpenAI Codex

Path: `integrations/mcp/codex`.

## OpenAI Codex

> Connect OpenAI Codex to the platform using the MCP server and agent skills.

[OpenAI Codex](https://openai.com/index/codex/) is OpenAI’s cloud-based coding agent. You can connect it to the platform by adding the MCP server and cloning the agent skills repository — giving Codex full access to your agents, tools, workforces, and knowledge.

<div style="{position: "relative", paddingBottom: "56.25%", height: 0}">
  <iframe src="https://www.loom.com/embed/ee17f2be46354e0fa193374a6c2af951?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true&autoplay=true&muted=true" frameBorder="0" style="{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", borderRadius: "10px"}" />
</div>

***

### Quick start

<Steps>
  <Step title="Add the MCP server">
    Register the MCP server with Codex:

    ```bash
    codex mcp add workforce-platform --url <your-server-url>
    ```
  </Step>

  <Step title="Authenticate">
    Log in to your the platform account:

    ```bash
    codex mcp login workforce-platform
    ```

    This opens your browser to authenticate. You only need to do this once per project.
  </Step>

  <Step title="Clone the agent skills">
    Give Codex built-in knowledge of the platform by cloning the [agent skills repository](https://github.com/the platform/agent-skills):

    ```bash
    git clone https://github.com/the platform/agent-skills ~/.agents/skills/ai
    ```

    This provides Codex with detailed context on how to work with agents, tools, workforces, knowledge, and more — so it can handle complex tasks correctly on the first try.

    <Tip>
      Learn more about what’s included in the agent skills on the 

      [Agent Skills](integrations__mcp.md) (page `integrations/mcp/agent-skills`)

       page.
    </Tip>
  </Step>

  <Step title="Start building">
    You’re ready to go. Try one of the example prompts below or describe what you want to build.
  </Step>
</Steps>

***

### Example prompts

Once connected, you can start building immediately:

<Tabs>
  <Tab title="Agents">
    ```
    > Create a BDR agent that qualifies inbound leads from HubSpot
    ```

    ```
    > Set up a workforce where a triage agent routes support tickets to specialist agents
    ```
  </Tab>

  <Tab title="Tools">
    ```
    > Build a tool that enriches a company URL with a one-paragraph summary
    ```

    ```
    > Create a tool that generates personalized cold emails from LinkedIn profiles
    ```
  </Tab>

  <Tab title="Evaluate & debug">
    ```
    > Pull the last 20 conversations for my Support Agent and identify failures
    ```

    ```
    > My BDR agent is letting unqualified leads through — review its instructions and fix it
    ```
  </Tab>
</Tabs>

***

### Working with multiple projects

If you work across multiple the platform projects, add a separate MCP server entry for each:

```bash
codex mcp add project-1 --url <your-server-url>
codex mcp login project-1

codex mcp add project-2 --url <your-server-url>
codex mcp login project-2
```

Each entry authenticates independently against its own project.

***

### Troubleshooting

<AccordionGroup>
  <Accordion title="MCP server not connecting">
    * Ensure you have run `codex mcp add workforce-platform --url <your-server-url>
    * Check that authentication completed successfully with `codex mcp login workforce-platform`
    * Verify your internet connection and that `<your-server-url>` is accessible
  </Accordion>

  <Accordion title="Authentication issues">
    * Make sure you have an active the platform account
    * Check that you have access to the project you are trying to connect to
    * Try re-authenticating with `codex mcp login workforce-platform`
  </Accordion>

  <Accordion title="Tools not appearing">
    * Verify you have completed authentication
    * Check that your the platform project has tools and agents configured
    * Try removing and re-adding the MCP server
  </Accordion>

  <Accordion title="Codex not using agent skills">
    * Confirm the agent skills are cloned to the correct path: `~/.agents/skills/ai`
    * Run `ls ~/.agents/skills/ai/SKILL.md` to verify the files exist
    * Pull the latest version: `cd ~/.agents/skills/ai && git pull`
  </Accordion>
</AccordionGroup>


---

# Page: MCP client

Path: `integrations/mcp/mcp-client`.

## MCP client

> Connect external MCP servers to your the platform Agents, giving them access to Tools and resources from other services.

The MCP client integration lets you connect remote MCP servers to your the platform Agents — either through preset connections (Notion, Canva, Atlassian) or by manually connecting any custom server URL. This gives your Agents access to Tools and resources hosted on external platforms without rebuilding them in the platform.

<Warning>
  This page is about connecting external MCP servers **to** the platform Agents. If you want to use the platform **from** an AI client like Claude or Cursor, see [MCP & Plugins](get-started__core-concepts.md) (page `get-started/core-concepts/mcp-plugins`).
</Warning>

### Setting up an MCP connection for Agents

Agents can connect to remote MCP servers to run Tools and read resources exposed by those servers. You can choose from preset connections for popular services or connect your own custom MCP server.

<div style="{ width: '100%', position: 'relative', paddingTop: '56.25%' }">
  <iframe src="https://app.supademo.com/embed/cmg8tiu3h23ii2nomxtqolybm" frameBorder="0" title="How to set up an MCP Server connection for an Agent" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '3px solid #5E43CE', borderRadius: '10px' }" />
</div>

<Steps>
  <Step title="Open the Agent">
    Open the Agent you want to connect.
  </Step>

  <Step title="Go to the Tools tab">
    Navigate to the **Tools** tab in the Agent builder.
  </Step>

  <Step title="Add an MCP connection">
    Click **Add MCP**.
  </Step>

  <Step title="Choose your connection type">
    * **Preset connections**: Select from Notion, Canva, or Atlassian — follow the OAuth flow to authorize access and Tools are configured automatically.
    * **Custom connection**: Click **Connect my own**, add the server URL, label the connection, and enter any required authentication details.
  </Step>
</Steps>

<Note>
  The connection label you provide will appear in Tool descriptions as `(MCP: connection-name)`. This helps Agents distinguish between Tools from different connections, especially when using multiple instances of the same MCP server.
</Note>

Once connected, the Agent automatically fetches and displays the available Tools from the MCP server. Tools appear in the conversation task view and can be referenced in the Agent’s core instructions.

<Warning>
  Local MCP server support (e.g. JSON configuration) is not available.
</Warning>

### Connecting multiple instances of the same MCP server

You can connect the same MCP server URL multiple times within a project. Each connection operates independently with its own authentication credentials, label, and configuration. Tools from each connection display `(MCP: connection-name)` in their descriptions so Agents can distinguish which connection a Tool belongs to.

This is useful when you need different authentication contexts (e.g. separate user credentials for different data access), environment separation (staging vs production), or multi-tenant setups where each connection uses different tenant credentials.

#### Best practices

<AccordionGroup>
  <Accordion title="Use descriptive connection labels">
    Choose labels that clearly indicate the purpose or context of each connection, such as `github-prod`, `github-staging`, or `linear-team-a`, `linear-team-b`.
  </Accordion>

  <Accordion title="Reference connections in Agent instructions">
    When building Agents that use multiple instances of the same server, include guidance in the Agent’s core instructions about when to use Tools from each connection.
  </Accordion>
</AccordionGroup>

### Troubleshooting

<AccordionGroup>
  <Accordion title="Tools not loading from external MCP server">
    * Verify the MCP server URL is correct and the server is online
    * Check that any required authentication credentials are entered correctly
    * Ensure the external MCP server supports the Streamable HTTP transport
  </Accordion>

  <Accordion title="Agent cannot run external Tools">
    * Confirm the Tools are listed in the Agent’s Tools tab after connecting
    * Check that the external MCP server has not revoked access or changed credentials
    * Try disconnecting and reconnecting the MCP server in the Agent builder
  </Accordion>

  <Accordion title="Connection timeout or errors">
    * The external MCP server may be temporarily unavailable — try again later
    * Check that the server URL does not require VPN or network access that the platform cannot reach
    * For preset connections, try disconnecting and reconnecting to refresh the OAuth token
    * Contact the MCP server provider if the issue persists
  </Accordion>
</AccordionGroup>

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="What types of MCP servers can I connect?">
    You can connect any remote MCP server that supports the Streamable HTTP transport. This includes servers from services like Linear, Notion, GitHub, and any custom MCP servers you host.
  </Accordion>

  <Accordion title="Can I connect multiple MCP servers to one Agent?">
    Yes. You can add multiple MCP server connections to a single Agent, giving it access to Tools and resources from several external services at once.

    You can also connect the same MCP server URL multiple times with different labels and credentials. This is useful for environment separation (staging vs production), different authentication contexts, or multi-tenant setups. See [connecting multiple instances](#connecting-multiple-instances-of-the-same-mcp-server) for details.
  </Accordion>

  <Accordion title="Can I use locally hosted MCP servers?">
    No. The platform only supports remote MCP servers accessible via a public URL. Local MCP servers running on your machine (e.g. via JSON configuration) are not supported.
  </Accordion>
</AccordionGroup>


---

# Page: MCP server

Path: `integrations/mcp/mcp-server`.

## MCP server

> Connect to the platform from Claude Desktop, Cursor, VS Code, ChatGPT, and other MCP-compatible AI clients.

The the platform MCP server gives any MCP-compatible AI client direct access to your agents, tools, and knowledge. Connect from the AI tools you already use and start building.

The MCP server is available at:

```
<your-server-url>
```

<Tip>
  For Claude Code, we recommend using the 

  [the platform plugin](integrations__mcp.md) (page `integrations/mcp/claude-code`)

   instead of a manual MCP connection — it includes built-in skills and context that make the experience significantly better.
</Tip>

<Warning>
  This page is about using the platform **from** external AI clients. If you want to connect an external MCP server **to** a the platform agent, see [MCP Client](integrations__mcp.md) (page `integrations/mcp/mcp-client`).
</Warning>

***

### Supported clients

<AccordionGroup>
  <Accordion title="Claude Desktop" icon="message-bot">
    1. Open Claude Desktop
    2. Go to **Settings** → **Connectors**
    3. Click **Add connector**
    4. Enter the server URL: <your-server-url>
    5. Follow the authentication prompts to connect your the platform project
  </Accordion>

  <Accordion title="Claude Web" icon="globe">
    1. Navigate to the [Connectors page](https://claude.ai/settings/connectors) in Claude.ai
    2. Click **Add connector**
    3. Enter the server URL: <your-server-url>
    4. Follow the authentication prompts
  </Accordion>

  <Accordion title="ChatGPT" icon="comment">
    ChatGPT supports MCP servers through Developer Mode, available on Pro, Team, Enterprise, and Edu plans.

    1. Open ChatGPT **Settings**
    2. Go to **Connectors** → **Advanced** → **Developer Mode**
    3. Click **Add connector**
    4. Enter the server URL: <your-server-url>
    5. Set Authentication to **OAuth** and follow the login flow

    Once connected, the tools will be available in both Chat and Deep Research modes.
  </Accordion>

  <Accordion title="Cursor" icon="i-cursor">
    1. Open Cursor Settings
    2. Navigate to the **MCP** tab
    3. Click **Add new MCP server**
    4. Use the following configuration in your `mcp.json`:

    ```json
    {
      "mcpServers": {
        "workforce-platform": {
          "command": "npx",
          "args": ["-y", "mcp-remote", "<your-server-url>"]
        }
      }
    }
    ```
  </Accordion>

  <Accordion title="VS Code / Copilot" icon="code">
    Add the following to your VS Code settings (`.vscode/mcp.json`):

    ```json
    {
      "mcpServers": {
        "workforce-platform": {
          "command": "npx",
          "args": ["-y", "mcp-remote", "<your-server-url>"]
        }
      }
    }
    ```
  </Accordion>

  <Accordion title="Windsurf" icon="wind">
    Add the following to your Windsurf MCP configuration:

    ```json
    {
      "mcpServers": {
        "workforce-platform": {
          "command": "npx",
          "args": ["-y", "mcp-remote", "<your-server-url>"]
        }
      }
    }
    ```
  </Accordion>

  <Accordion title="Codex" icon="robot">
    Register the MCP server, then log in:

    ```bash
    codex mcp add workforce-platform --url <your-server-url>
    codex mcp login workforce-platform
    ```

    See the [OpenAI Codex](integrations__mcp.md) (page `integrations/mcp/codex`) page for the full setup, including cloning the agent skills.
  </Accordion>

  <Accordion title="Zed" icon="pen-nib">
    Add the following to your Zed settings (`settings.json`):

    ```json
    {
      "language_models": {
        "mcp": {
          "servers": {
            "workforce-platform": {
              "command": "npx",
              "args": ["-y", "mcp-remote", "<your-server-url>"]
            }
          }
        }
      }
    }
    ```
  </Accordion>

  <Accordion title="v0 by Vercel" icon="bolt">
    Add the following MCP configuration in your v0 project settings:

    ```json
    {
      "mcpServers": {
        "workforce-platform": {
          "command": "npx",
          "args": ["-y", "mcp-remote", "<your-server-url>"]
        }
      }
    }
    ```
  </Accordion>

  <Accordion title="Claude Code (manual)" icon="terminal">
    If you prefer to add the MCP server directly without the plugin:

    ```bash
    claude mcp add prod --transport http <your-server-url>
    ```

    Once added, run `/mcp` from within Claude Code. You will see the new MCP server in the list. Select it to connect and follow the authentication steps.
  </Accordion>

  <Accordion title="Other clients" icon="plug">
    For any MCP-compatible client, use the server URL:

    ```
    <your-server-url>
    ```

    If your client requires an `npx` command, use:

    ```bash
    npx -y mcp-remote <your-server-url>
    ```
  </Accordion>
</AccordionGroup>

***

### Authentication

When you first connect, you will be prompted to authenticate with your the platform account. Authentication is **per project** — you will be connected to a specific the platform project after logging in.

#### Working with multiple projects

If you work across multiple the platform projects, add a separate MCP server entry for each:

<CodeGroup>
  ```json title="Cursor"
  {
    "mcpServers": {
      "project-1": {
        "command": "npx",
        "args": ["-y", "mcp-remote", "<your-server-url>"]
      },
      "project-2": {
        "command": "npx",
        "args": ["-y", "mcp-remote", "<your-server-url>"]
      }
    }
  }
  ```

  ```json title="VS Code"
  {
    "mcpServers": {
      "project-1": {
        "command": "npx",
        "args": ["-y", "mcp-remote", "<your-server-url>"]
      },
      "project-2": {
        "command": "npx",
        "args": ["-y", "mcp-remote", "<your-server-url>"]
      }
    }
  }
  ```

  ```json title="Windsurf"
  {
    "mcpServers": {
      "project-1": {
        "command": "npx",
        "args": ["-y", "mcp-remote", "<your-server-url>"]
      },
      "project-2": {
        "command": "npx",
        "args": ["-y", "mcp-remote", "<your-server-url>"]
      }
    }
  }
  ```
</CodeGroup>

Each entry authenticates independently against its own project, so you can access tools and agents across all your projects without logging out and back in.

<Note>
  Alternatively, you can use a single connection and log out / log back in to switch projects — but the multi-connection approach above is preferred for convenience.
</Note>

***

### Access control

When you authenticate via OAuth, the level of access your MCP session gets depends on your project role. Some roles have a fixed mode; others can opt in to a restriction.

#### Run-Only mode

Run-Only mode limits the MCP session to viewing and running existing agents. Write and destructive tools are removed from the tool list server-side — they are not present in the session at all, not merely hidden on the client.

The OAuth consent screen shows a **Run-Only mode** toggle for Member, Editor, and Admin users. The toggle defaults to off (full access). Viewer and Chat users do not see the toggle — their access mode is fixed and cannot be changed.

| Project role | MCP access mode | Configurable?                            |
| :----------- | :-------------- | :--------------------------------------- |
| Admin        | Full access     | Yes — opt into run-only at OAuth consent |
| Editor       | Full access     | Yes — opt into run-only at OAuth consent |
| Member       | Full access     | Yes — opt into run-only at OAuth consent |
| Viewer       | Run-only        | No — forced, cannot disable              |
| Chat         | Chat mode       | No — forced, cannot disable              |

<Note>
  To guarantee that a user’s MCP session cannot create, edit, or delete assets: assign them the Viewer or Chat project role. The restriction is enforced server-side regardless of which MCP client they use.
</Note>

<Warning>
  Chat role users cannot set up dynamic (user-level) OAuth connections via MCP. If an agent requires dynamic authentication, assign the user a Member role in a dedicated project instead.
</Warning>

MCP access is bounded by your project role — the API enforces a ceiling so a session never grants more than the role allows.

***

### Add agent skills

The MCP server gives your AI assistant the ability to call the platform tools, but it doesn’t know *how* to use them well. For better results, pair it with the [agent skills](integrations__mcp.md) (page `integrations/mcp/agent-skills`) repository — a local reference that teaches your assistant how to work with agents, tools, workforces, knowledge, and more.

***

### Handling long-running agent executions

When triggering agents via MCP, you have two execution modes available depending on how long your agent takes to complete.

#### Execution modes

<Tabs>
  <Tab title="Synchronous">
    The `trigger_agent` tool waits for the agent to finish and returns the result directly. It has a 120-second timeout, so use it for agents that complete quickly — single-step agents with minimal tool usage and no workforce nodes.
  </Tab>

  <Tab title="Asynchronous">
    The `trigger_agent_async` and `poll_agent_result` tools work together with no timeout limit. The trigger returns immediately with a conversation ID, which you then poll to check status and retrieve results. Use this for agents with workforce nodes, multi-step chains, external API calls, or any execution expected to exceed 2 minutes.
  </Tab>
</Tabs>

<Warning>
  If you encounter timeout errors with `trigger_agent`, switch to the async pattern. Agents with workforce nodes should always use async execution.
</Warning>

#### Async execution workflow

<Steps>
  <Step title="Trigger the agent">
    Call `trigger_agent_async` with your agent parameters. This returns immediately with a `conversation_id`.
  </Step>

  <Step title="Poll for results">
    Use `poll_agent_result` with the `conversation_id` to check the execution status. Poll every 3-5 seconds until the status is `complete` or `failed`.
  </Step>

  <Step title="Retrieve the results">
    The status will be `working` or `in progress` while the agent is executing, `complete` when results are available, or `failed` if an error occurred. Once complete, the poll response contains the agent’s output.
  </Step>
</Steps>

***

### Troubleshooting

<AccordionGroup>
  <Accordion title="Authentication issues">
    * Make sure you have an active the platform account
    * Check that you have access to the project you are trying to connect to
    * Try removing and re-adding the MCP server connection
  </Accordion>

  <Accordion title="Tools not appearing">
    * Verify that you have tools configured in your the platform project
    * Check that you are authenticated to the correct project
    * Try disconnecting and reconnecting the MCP server
  </Accordion>

  <Accordion title="Connection errors">
    * Ensure you have a stable internet connection
    * Check that `<your-server-url>` is accessible from your network
    * Try removing and re-adding the MCP server connection in your client
    * Try clearing the auth cache: `rm -rf ~/.mcp-auth`
  </Accordion>

  <Accordion title="Agent execution timeouts">
    Timeout errors from `trigger_agent` mean your agent exceeded the 120-second synchronous limit. Switch to `trigger_agent_async` and `poll_agent_result` instead. See [handling long-running agent executions](#handling-long-running-agent-executions) for the full workflow. Agents with workforce nodes, multi-step chains, or complex workflows should always use the async pattern.
  </Accordion>
</AccordionGroup>

***

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="What is MCP?">
    The Model Context Protocol (MCP) is an open standard that allows AI clients to connect to external tools and data sources. It provides a standardized way for AI assistants to access your the platform workspace.
  </Accordion>

  <Accordion title="Is the MCP server free to use?">
    The MCP server itself is free. You will be billed for any the platform usage (agent runs, tool executions, etc.) according to your plan.
  </Accordion>

  <Accordion title="Can I use multiple AI clients at the same time?">
    Yes. You can connect to the MCP server from as many clients as you like simultaneously. Each client authenticates independently.
  </Accordion>

  <Accordion title="Does authentication expire?">
    Authentication tokens may expire after a period of inactivity. If you are prompted to re-authenticate, simply follow the login flow again.
  </Accordion>

  <Accordion title="Can I restrict which tools are available via MCP?">
    Run-Only mode is the primary way to restrict MCP access. Assign a user the Viewer or Chat project role to force them into a restricted mode automatically — Viewers get run-only access (no write or destructive operations), and Chat users are limited to an even narrower set of tools. Member, Editor, and Admin users can opt into run-only mode from the toggle on the OAuth consent screen. For finer-grained control — such as exposing only a specific subset of agents — organize your tools across separate projects and authenticate each connection to the appropriate project. See [Access control](#access-control) for the full role matrix.
  </Accordion>
</AccordionGroup>

