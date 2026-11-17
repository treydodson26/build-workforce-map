# Platform product docs: local index

Downloaded on 11/16/2026 from the platform's public docs. Each docs folder is merged into one Markdown file here, named after the folder path with `/` replaced by `__`. For example, every page under `build/agents/evals/` is in `build__agents__evals.md`.

Each page starts with a `# Page:` heading followed by its original path. Links between pages point to the local file that holds the target page, followed by the page path, for example `[Checks](build__agents__evals.md) (page build/agents/evals/checks)`. Open that file and search for the path. Links to pages that were not downloaded are plain text. Screenshots from the original pages are not included.

This folder holds the pages listed below: Get started (introduction, quick start, core concepts), Build (agents, tools, knowledge, workforces, evals), Integrations, and system limits. Enterprise, SDK, marketplace, Chat, and use-case guide pages are not included.


## [`get-started.md`](get-started.md)

- **Introduction** (`get-started/introduction`): the platform is the home of your AI Workforce.
- **Quick Start** (`get-started/quick-start-guide`): Build and test your first AI agent in under 5 minutes.

## [`get-started__core-concepts.md`](get-started__core-concepts.md)

- **Agents** (`get-started/core-concepts/agents`): Introduction to AI agents and building your AI Workforce!
- **API integration** (`get-started/core-concepts/api-integration`): Add custom API keys to connect services the platform doesn't have built-in, or use the API key to access the platform programmatically.
- **Knowledge** (`get-started/core-concepts/knowledge`): Give your agents the context they need with the platform's RAG-powered knowledge system.
- **MCP & Plugins** (`get-started/core-concepts/mcp-plugins`): Build and manage your the platform agents programmatically using Claude Code or any MCP-compatible AI client.
- **Tools** (`get-started/core-concepts/tools`): The actions your agents use to get things done — from API calls to LLM prompts to custom code.
- **Workforces** (`get-started/core-concepts/workforces`): Workforce transforms how your agents collaborate by providing a visual canvas where you can design, connect, and monitor teams of specialised agents.

## [`build.md`](build.md)

- **Build with the platform** (`build/introduction`): An overview of building and managing agents with Invent or configuring agents, tools, knowledge, and workforces directly.

## [`build__agents.md`](build__agents.md)

- **Create an Agent** (`build/agents/create-an-agent`): How to create your first Agent in the platform.
- **Delete Your Agent** (`build/agents/delete-agent`): Remove your Agents from the platform
- **Share Your Agent** (`build/agents/share-your-agent`): Learn how to share your agent with others using different UI options

## [`build__agents__advanced-features.md`](build__agents__advanced-features.md)

- **On-Call AI Commands** (`build/agents/advanced-features/on-call-ai-commands`): Control your meeting agent in real-time with trigger words

## [`build__agents__build-your-agent.md`](build__agents__build-your-agent.md)

- **Alerts** (`build/agents/build-your-agent/alerts`): Set up rules to get notified when your agent encounters an issue, reaches a threshold, or gets updated.
- **Memory** (`build/agents/build-your-agent/memory`): Extract and recall metadata from your Agent's task output
- **Prompt** (`build/agents/build-your-agent/prompt`): Crafting a prompt to instruct your Agent
- **Give Your Agent Tools** (`build/agents/build-your-agent/tools`)
- **Triggers** (`build/agents/build-your-agent/triggers`)
- **Variables** (`build/agents/build-your-agent/variables`)
- **Version history** (`build/agents/build-your-agent/version-history`): Track, restore, and manage versions of your Agents, Tools, and Workforces.

## [`build__agents__build-your-agent__agent-modes.md`](build__agents__build-your-agent__agent-modes.md)

- **Phone Agents** (`build/agents/build-your-agent/agent-modes/phone-calls`): Agents that can speak, listen, and take action during a call

## [`build__agents__build-your-agent__agent-settings.md`](build__agents__build-your-agent__agent-settings.md)

- **Flow Builder** (`build/agents/build-your-agent/agent-settings/flow-builder`): Carefully craft decisions for your Agent
- **General** (`build/agents/build-your-agent/agent-settings/general`)
- **Language Model** (`build/agents/build-your-agent/agent-settings/language-model`): Access advanced settings related to the Language Model for your Agent
- **Subagents** (`build/agents/build-your-agent/agent-settings/subagents`): Add Subagents to your Agent
- **Give Your Agent Tasks** (`build/agents/build-your-agent/agent-settings/task-view`)
- **Visual Data Masking** (`build/agents/build-your-agent/agent-settings/visual-data-masking`): Protect sensitive information in the UI while agents continue to work with actual data

## [`build__agents__build-your-agent__agent-triggers.md`](build__agents__build-your-agent__agent-triggers.md)

- **API Triggers** (`build/agents/build-your-agent/agent-triggers/api-trigger`): Trigger your Agent with direct HTTP requests
- **Webhook Triggers** (`build/agents/build-your-agent/agent-triggers/custom-webhook`): Connect to a custom webhook to trigger your Agent
- **Integration Triggers** (`build/agents/build-your-agent/agent-triggers/integrations`): Trigger your Agents from 1,000+ integrations
- **Scheduled Triggers** (`build/agents/build-your-agent/agent-triggers/scheduled-triggers`): Set your Agent to run on a schedule or send messages at specific times
- **Tools as Triggers** (`build/agents/build-your-agent/agent-triggers/tools-as-triggers`): Use a Tool as a trigger for your Agent

## [`build__agents__evals.md`](build__agents__evals.md)

- **Check types** (`build/agents/evals/checks`): What each Check type scores, the fields it takes, and how the Checks tab works
- **Introduction to Evals** (`build/agents/evals/introduction`): Test and evaluate Agents and Workforces with simulated conversations and reusable scoring criteria
- **Monitoring Evals** (`build/agents/evals/monitor`): Score the real conversations your Agent or Workforce is having against Checks, on dashboards you configure per sample rate
- **Running Evals** (`build/agents/evals/running-evaluations`): Run Test sets and individual Tests, read the scores that come back, and require evals to pass before publishing
- **Creating Tests** (`build/agents/evals/test-sets`): Create Tests that simulate real user conversations with your Agent or Workforce, and group them into Test sets

## [`build__agents__give-your-agent-tasks.md`](build__agents__give-your-agent-tasks.md)

- **Bulk scheduling** (`build/agents/give-your-agent-tasks/bulk-schedule`): Learn how to schedule batch tasks to run automatically for your agent
- **Interact with your Agent** (`build/agents/give-your-agent-tasks/interact-with-your-agent`): What are tasks and how do they differ from prompt?
- **Tasks** (`build/agents/give-your-agent-tasks/task-overview`): Learn what a Task is, where to view your Tasks, and how to read one in the Run tab
- **Task Queue** (`build/agents/give-your-agent-tasks/task-queue`): Learn how to access and manage your agent task queue, including how to cancel tasks and view task statuses
- **Task Operations** (`build/agents/give-your-agent-tasks/tasks-page`): Monitor, troubleshoot, and resolve Agent and Workforce Tasks in bulk from one place

## [`build__agents__use-cases.md`](build__agents__use-cases.md)

- **Meeting Auto-Scheduling Agent** (`build/agents/use-cases/calendar-scheduling`): Automate meeting coordination with AI-powered scheduling
- **Meeting Agents** (`build/agents/use-cases/meeting-agents-overview`): Stop taking notes and coordinating schedules. Let AI handle your meetings.
- **Meeting Notetaker Agent** (`build/agents/use-cases/meeting-notetaker`)

## [`build__invent.md`](build__invent.md)

- **Build with Invent** (`build/invent/invent`): Invent is a forward deployed agent that builds, manages, and improves the specialist Agents that run your business processes.

## [`build__knowledge.md`](build__knowledge.md)

- **Knowledge** (`build/knowledge/create-knowledge`): Our Retrieval Augmented Generation (RAG) solution
- **Enrich with Tool** (`build/knowledge/enrich-with-tool`): Run a Tool across rows in your Knowledge table to add AI-generated columns
- **Find and Use Knowledge** (`build/knowledge/find-and-use-knowledge`): Knowledge is the foundation of intelligent AI agents in the platform.
- **Inactive table deletion** (`build/knowledge/inactive-table-deletion`): One-time deletion of Knowledge tables on inactive accounts on May 4, 2026
- **Knowledge Tool steps** (`build/knowledge/knowledge-tool-steps`): Use Tool steps to interact with your Knowledge tables
- **Use Snippets for Quick Access** (`build/knowledge/use-snippets-for-quick-access`): Snippets transform how you manage shared text across your the platform workspace.

## [`build__knowledge__integrated-knowledge-sources.md`](build__knowledge__integrated-knowledge-sources.md)

- **Notion as a Knowledge Source** (`build/knowledge/integrated-knowledge-sources/notion`): Use Notion as a source of Knowledge for your Agents
- **Sharepoint as a Knowledge Source** (`build/knowledge/integrated-knowledge-sources/sharepoint`): Use Sharepoint as a source of Knowledge for your Agents

## [`build__tools.md`](build__tools.md)

- **Create a Tool** (`build/tools/create-a-tool`): How to create your first Tool in the platform.
- **Delete a tool or tool step** (`build/tools/delete-tool`): How to delete tools and individual tool steps
- **Share your Tool** (`build/tools/share-your-tool`): Learn how to share your Tool with others using different UI options
- **Tool steps** (`build/tools/tool-steps`): Find info on our most popular Tool steps in the platform

## [`build__tools__customize-tool.md`](build__tools__customize-tool.md)

- **Branching** (`build/tools/customize-tool/branching`): Add conditional branches to Tool steps in your Tools
- **Inputs** (`build/tools/customize-tool/inputs`): Inputs for tools
- **Looping** (`build/tools/customize-tool/looping`): Loop through Tool steps in your Tools
- **Outputs** (`build/tools/customize-tool/outputs`): Outputs for tools
- **Steps** (`build/tools/customize-tool/steps`): Steps for tools
- **Style Guide** (`build/tools/customize-tool/tool-style-guide`): Make tools perform better with agents

## [`build__tools__tool-steps.md`](build__tools__tool-steps.md)

- **API Tool step** (`build/tools/tool-steps/api`): Use the API Tool step to run a custom API call to another product / service
- **'Convert audio/video to text' Tool steps** (`build/tools/tool-steps/convert-audio-video-to-text`): Use three different Tool steps to convert audio/video to text
- **'Convert PDF to text' Tool step** (`build/tools/tool-steps/convert-pdf-to-text`): Use a Tool step to convert PDFs into text for your Agents and Tools to read
- **'Convert a spreadsheet to JSON' Tool step** (`build/tools/tool-steps/convert-spreadsheet-to-json`): Use a Tool step to convert CSVs and XLSXs into JSON
- **Delay Tool step** (`build/tools/tool-steps/delay`): Delay your Agents and Tools by using the Delay Tool step
- **Extract Website Content Tool step** (`build/tools/tool-steps/extract-website-content`): Use the Extract Website Content Tool step to turn websites into text and HTML for your Agents and Tools
- **'Convert a file to text' Tool step** (`build/tools/tool-steps/file-to-text`): Use a Tool step to convert files into text
- **Firecrawl Tool step** (`build/tools/tool-steps/firecrawl`): Use Firecrawl as a step in your Tools to turn websites into LLM-ready data

## [`build__tools__tool-steps__airtop-browser-automation.md`](build__tools__tool-steps__airtop-browser-automation.md)

- **Airtop - Page Information & Monitoring** (`build/tools/tool-steps/airtop-browser-automation/page-information`): Query page content, capture screenshots, and monitor page conditions with Airtop browser automation
- **Airtop - Page Interaction** (`build/tools/tool-steps/airtop-browser-automation/page-interaction`): Interact with web pages using Airtop - click elements, type text, and scroll pages for browser automation
- **Airtop - Window Management** (`build/tools/tool-steps/airtop-browser-automation/window-management`): Manage browser windows with Airtop - create windows, load URLs, and close windows for browser automation

## [`build__tools__tool-steps__confluence.md`](build__tools__tool-steps__confluence.md)

- **'Confluence - Create Post' Tool step** (`build/tools/tool-steps/confluence/create-post`): Create a blog post in one of your Confluence spaces
- **'Confluence - Search Content' Tool step** (`build/tools/tool-steps/confluence/search-content`): Search Confluence using CQL in the platform

## [`build__tools__tool-steps__knowledge.md`](build__tools__tool-steps__knowledge.md)

- **Advanced Knowledge Search (2m context)** (`build/tools/tool-steps/knowledge/advanced-knowledge-search-2m`): The 'Advanced Knowledge Search (2m context)' Tool allows you to search your knowledge table with a prompt using CAG
- **Delete Knowledge** (`build/tools/tool-steps/knowledge/delete-knowledge`): The 'Delete Knowledge' Tool step allows your agent to remove information from your knowledge table — making it easy to manage and keep your data relevant and up to date.
- **Get Knowledge** (`build/tools/tool-steps/knowledge/get-knowledge`): The Get Knowledge feature allows you to search and retrieve information directly from your knowledge table without RAG
- **Insert Knowledge** (`build/tools/tool-steps/knowledge/insert-knowledge`): The 'Insert Knowledge' Tool step lets your agent save information by adding new rows to your knowledge table—making it easy to capture and store data dynamically.
- **Knowledge Search** (`build/tools/tool-steps/knowledge/knowledge-search`): The 'Knowledge Search' Tool allows you to search knowledge tables with RAG
- **Update Knowledge** (`build/tools/tool-steps/knowledge/update-knowledge`): The 'Update Knowledge' Tool step lets you update existing rows in your knowledge table—making it easy to keep your data current and accurate.
- **Using Variables in JSON** (`build/tools/tool-steps/knowledge/using-variables-in-json`): Learn how to use variables from Tool inputs and other Tool steps in JSON fields for Knowledge Tool steps

## [`build__tools__tool-steps__linkedin.md`](build__tools__tool-steps__linkedin.md)

- **'RapidAPI - Get a LinkedIn Profile/Company and Posts' Tool step** (`build/tools/tool-steps/linkedin/get-linkedin-profile`): Fetch a LinkedIn profile / company and its posts
- **'Unipile - LinkedIn Action' Tool step** (`build/tools/tool-steps/linkedin/linkedin-action`): Perform actions on LinkedIn using this Tool step
- **'Crustdata - Search LinkedIn Profiles' Tool step** (`build/tools/tool-steps/linkedin/search-linkedin-profiles`): Search through LinkedIn profiles using this Tool step

## [`build__tools__tool-steps__llms.md`](build__tools__tool-steps__llms.md)

- **LLM Tool step** (`build/tools/tool-steps/llms/llm-tool-step`): Use a LLM as a step in your Tools

## [`build__tools__tool-steps__python-code.md`](build__tools__tool-steps__python-code.md)

- **Python Helper Functions** (`build/tools/tool-steps/python-code/code-python-helper-functions`): Natively Supported Helper Functions
- **Python Tool step** (`build/tools/tool-steps/python-code/code-python`): Empower your agent with custom code using one of the world's most popular and beginner-friendly languages

## [`build__tools__tool-steps__slack.md`](build__tools__tool-steps__slack.md)

- **'Slack - Retrieve Messages' Tool step** (`build/tools/tool-steps/slack/retrieve-messages`): Retrieve messages from a Slack channel using the platform
- **'Slack - Send Message' Tool step** (`build/tools/tool-steps/slack/send-message`): Send a message to a Slack channel from the platform

## [`build__tools__tool-steps__trello.md`](build__tools__tool-steps__trello.md)

- **'Trello - Add Checklist' Tool step** (`build/tools/tool-steps/trello/add-checklist`): Add a checklist to a card in Trello
- **'Trello - Add Comment' Tool step** (`build/tools/tool-steps/trello/add-comment`): Add a comment to a card in Trello
- **'Trello - Archive Card' Tool step** (`build/tools/tool-steps/trello/archive-card`): Archive a card in Trello
- **'Trello - Create a Checklist Item' Tool step** (`build/tools/tool-steps/trello/create-checklist-item`): Add a checklist item to a checklist in Trello

## [`build__workforces.md`](build__workforces.md)

- **Create a Workforce** (`build/workforces/create-a-workforce`): How to create your first Workforce in the platform.
- **Share your Workforce** (`build/workforces/share-your-workforce`): Learn how to share your Workforce with others as a cloneable template

## [`build__workforces__build-an-ai-workforce.md`](build__workforces__build-an-ai-workforce.md)

- **Add, create, edit and connect Agents to your Workforce** (`build/workforces/build-an-ai-workforce/add-agents`): Adding agents to your Workforce allows you to create powerful multi-agent systems where specialized AI agents work together to accomplish complex tasks.
- **Add Conditions** (`build/workforces/build-an-ai-workforce/add-conditions`): Conditions in Workforce act as powerful decision-making components that allow you to create intelligent workflows with conditional logic.
- **Add Tools** (`build/workforces/build-an-ai-workforce/add-tools`): Tools are essential components in your AI Workforce that enable agents to perform specific actions and complete tasks.
- **Add Triggers** (`build/workforces/build-an-ai-workforce/add-triggers`): Triggers are the starting points that initiate workflows in your AI Workforce. They determine when and how your agents begin their work, serving as the entry points to your entire workflow system.
- **Edge Settings** (`build/workforces/build-an-ai-workforce/edge-settings`): Edge Settings control how nodes are connected to each other in your AI Workforce.
- **Introduction to Nodes** (`build/workforces/build-an-ai-workforce/introduction-to-nodes`): Nodes are the fundamental building blocks of a workforce in the platform. They represent all the components you can place on your workspace to create automated workflows.
- **Notes** (`build/workforces/build-an-ai-workforce/notes`): Clarify purpose, instructions, and collaboration using notes for your Workforce.

## [`build__workforces__workforce-features.md`](build__workforces__workforce-features.md)

- **Agent to Agent Configuration** (`build/workforces/workforce-features/agent-to-agent-configuration`): Agent to Agent configuration is a powerful capability within Workforce that enables you to create sophisticated multi-agent systems where agents can collaborate, delegate tasks, and work together to solve complex problems.
- **Agent to Tool Configuration** (`build/workforces/workforce-features/agent-to-tool-configuration`): Agent to Tool configuration is a powerful feature within Workforce that enables you to establish connections between your AI agents and the tools they need to complete tasks.
- **Approvals and Escalations** (`build/workforces/workforce-features/approvals-and-escalations`): Approvals and escalations are essential components of Workforce that ensure your AI agents operate with appropriate oversight and can effectively handle situations requiring human intervention.
- **Communication** (`build/workforces/workforce-features/communication`): Communication is a fundamental aspect of Workforce that defines how agents interact with each other within your AI workforce.
- **Condition to Tool Configuration** (`build/workforces/workforce-features/condition-to-tool-configuration`): Condition to Tool connections in Workforce allow you to create intelligent workflows that execute tools only when specific conditions are met.
- **Tool to Tool Configuration** (`build/workforces/workforce-features/tool-to-tool-configuration`): Tool to Tool configuration is a powerful feature in Workforce that allows you to connect tools directly to other tools, creating automated workflows without requiring agent intervention.
- **Trigger to Agent Configuration** (`build/workforces/workforce-features/trigger-to-agent-configuration`): Connecting triggers to agents is a fundamental aspect of building effective AI workforces in the platform.
- **Workforce Task View** (`build/workforces/workforce-features/workforce-task-view`): The Workforce Task View provides a centralized interface for monitoring, managing, and interacting with your AI workforce.

## [`integrations.md`](integrations.md)

- **Add Integrations** (`integrations/add-integrations`): Integrations transform your AI agents into powerful workflow automation tools by connecting them with external services and platforms.
- **Integrations** (`integrations/introduction`): Connect your AI agents with external tools and services to create powerful, automated workflows across your entire tech stack.
- **Remove Integrations** (`integrations/remove-integrations`): Manage your connected services by removing integrations that are no longer needed.

## [`integrations__integration-examples.md`](integrations__integration-examples.md)

- **Email warmups** (`integrations/integration-examples/email-warmups`): Use case: Warm up your email before starting your email marketing campaigns.

## [`integrations__mcp.md`](integrations__mcp.md)

- **Agent skills** (`integrations/mcp/agent-skills`): Give your AI coding assistant built-in knowledge of the platform by cloning the agent skills repository.
- **Claude Code plugin** (`integrations/mcp/claude-code`): Use the Claude Code plugin to build and manage your agents directly from your terminal.
- **OpenAI Codex** (`integrations/mcp/codex`): Connect OpenAI Codex to the platform using the MCP server and agent skills.
- **MCP client** (`integrations/mcp/mcp-client`): Connect external MCP servers to your the platform Agents, giving them access to Tools and resources from other services.
- **MCP server** (`integrations/mcp/mcp-server`): Connect to the platform from Claude Desktop, Cursor, VS Code, ChatGPT, and other MCP-compatible AI clients.

## [`admin.md`](admin.md)

- **System quotas** (`admin/system-limits`): Maximum system resource allocations

## [`build__tools__tool-steps__microsoft-office-com.md`](build__tools__tool-steps__microsoft-office-com.md)

- **Microsoft Office COM tool steps** (local): Outlook mail and calendar, Word, Excel, and FileSystemObject operations that replace the former cloud office-suite steps, with parameters, results, errors, and known gaps.
