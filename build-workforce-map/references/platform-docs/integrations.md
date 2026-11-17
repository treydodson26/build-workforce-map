# The platform docs: `integrations/`

3 pages, downloaded on 11/16/2026.


---

# Page: Add Integrations

Path: `integrations/add-integrations`.

## Add Integrations

> Integrations transform your AI agents into powerful workflow automation tools by connecting them with external services and platforms.

### Browsing and filtering integrations

The **Integrations & API Keys** browser displays all available integrations. Use the search bar to find a specific service by name, or filter by category tag — CRM, Communication, AI Models, Automation & Integration, and more. Multiple tags can be selected at once.

### Setting Up Integrations

To begin using integrations with your AI agents:

1. Navigate to the **Integrations & API Keys** page from the left-hand menu of your the platform account.
2. Browse the available integrations and select the service you want to connect.
3. Follow the authentication steps to authorize the connection.
4. Once connected, the integration will appear in your list of available connections.

### Adding Triggers to Agents

Triggers allow your agents to automatically activate when specific events occur in connected platforms:

1. Go to the Agent Settings page for the agent you want to configure.
2. Select Agent Profile from the menu.
3. Locate the Triggers section.
4. Click “Add Trigger” and select from the available trigger options.
5. Configure the trigger settings according to your needs.
6. Save your changes.

### Popular Integrations

#### Slack Integration

Connect your agents to Slack to enable them to:

* Monitor channels for specific messages or keywords.
* Send notifications or updates to designated channels.
* Respond to direct messages or mentions.
* Perform actions based on Slack events.

#### Outlook calendar Integration

Link your agents with Outlook calendar to:

* Schedule meetings and appointments.
* Send calendar invites to participants.
* Check availability before scheduling.
* Provide reminders for upcoming events.

#### HubSpot Integration

Connect to HubSpot to allow your agents to:

* Create and update contact records.
* Track customer interactions.
* Manage deals and opportunities.
* Access customer data for personalized responses.


---

# Page: Integrations

Path: `integrations/introduction`.

## Integrations

> Connect your AI agents with external tools and services to create powerful, automated workflows across your entire tech stack.

### Overview

Integrations serve as bridges between your AI agents and the external services you rely on daily. By establishing these connections, you can create seamless workflows that span across multiple platforms, allowing your agents to access data from and perform actions within your entire digital ecosystem.

For new users, it’s important to understand that integrations enable four key capabilities:

1. **Connecting external services** to your the platform account
2. **Setting up triggers** that automatically activate your agents based on external events
3. **Using pre-built actions** that allow your agents to interact with external platforms
4. **Creating custom API calls** for advanced integration scenarios

Let’s explore each of these capabilities in detail.

### Native vs. Pipedream integrations

Integrations fall into two types:

* **Native integrations** are built directly by the platform. They offer deeper support, including pre-built tool steps and trigger events designed to work with agents out of the box.
* **Pipedream integrations** extend the catalog to 2,000+ services via a Pipedream connection. They support authentication and API access for a wide range of platforms not covered by native integrations.

<Tip>
  Start with native integrations when available — they come with ready-made actions and triggers that require less configuration.
</Tip>

### 1. Connecting Integrations

The first step in leveraging integrations is connecting your external services to the platform:

1. Navigate to the **Integrations & API Keys** page from the left-hand menu of your the platform account
2. Browse the available integrations and select the service you want to connect
3. Click on the integration card to begin the connection process
4. Follow the authentication steps to authorize the connection (typically involves logging into the service or providing API credentials)
5. Once connected, the integration will appear as “Connected” in your list of available integrations

<div
  style="{
  position: 'relative',
  boxSizing: 'content-box',
  maxHeight: '80vh',
  maxHeight: '80svh',
  width: '100%',
  aspectRatio: '2.0041753653444676',
  padding: '40px 0'
}"
>
  <iframe
    src="https://app.supademo.com/embed/cm90wzs6k1ieheyp0a704pbpd?embed_v=2"
    loading="lazy"
    title="Connecting integrations"
    allow="clipboard-write; fullscreen"
    frameBorder="0"
    webkitAllowFullscreen="true"
    mozAllowFullscreen="true"
    style="{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }"
  />
</div>

Each integration may have specific configuration options depending on the service. The platform guides you through the necessary steps to establish a secure and functional connection.

#### Connecting LLM Accounts

<div
  style="{
  position: 'relative',
  boxSizing: 'content-box',
  maxHeight: '80vh',
  maxHeight: '80svh',
  width: '100%',
  aspectRatio: '2.0041753653444676',
  padding: '40px 0'
}"
>
  <iframe
    src="https://app.supademo.com/embed/cm90ybkeb1ir3eyp09mxcynmk?embed_v=2"
    loading="lazy"
    title="Adding API keys"
    allow="clipboard-write; fullscreen"
    frameBorder="0"
    webkitAllowFullscreen="true"
    mozAllowFullscreen="true"
    style="{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }"
  />
</div>

A particularly valuable integration option is connecting your own Large Language Model (LLM) accounts:

1. Go to the **Integrations & API Keys** page in the left-hand menu
2. Look for the LLM provider you want to connect (such as OpenAI or Anthropic)
3. Click on the provider and enter your API key
4. Once connected, you can use your own LLM account with your agents

This capability allows you to leverage your existing LLM subscriptions and manage usage under your own account, giving you greater control over your AI resources and potentially reducing costs.

### 2. Setting Up Triggers

Triggers are events from integrated platforms that automatically activate your agents. This transforms your agents from reactive tools that wait for instructions into proactive assistants that respond to events in your digital environment.

#### How to Set Up Triggers:

1. Go to the **Agent Settings** page for the agent you want to configure
2. Select **Agent Profile** from the menu
3. Locate the **Triggers** section
4. Click **“Add Trigger”** and select from the available trigger options
5. Configure the trigger settings according to your needs
6. Save your changes

<div
  style="{
  position: 'relative',
  boxSizing: 'content-box',
  maxHeight: '80vh',
  maxHeight: '80svh',
  width: '100%',
  aspectRatio: '1.8057022175290391',
  padding: '40px 0'
}"
>
  <iframe
    src="https://app.supademo.com/embed/cm928e0t62ej5eyp0uej7b0h0?embed_v=2"
    loading="lazy"
    title="Setting up triggers"
    allow="clipboard-write; fullscreen"
    frameBorder="0"
    webkitAllowFullscreen="true"
    mozAllowFullscreen="true"
    style="{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }"
  />
</div>

#### Common Trigger Examples:

* **Email Integrations (Outlook)**: Trigger an agent when you receive an email matching specific criteria
* **CRM Integrations (HubSpot, Salesforce)**: Activate an agent when a new contact is created or a deal stage changes
* **Support Integrations (Freshdesk, Zendesk)**: Start an agent workflow when a new support ticket is created
* **Messaging Integrations (Slack, WhatsApp Business)**: Trigger an agent when a message is received in a specific channel

For example, with the HubSpot integration, you could set up a trigger that activates your sales assistant agent whenever a new lead is created in your CRM. The agent could then automatically research the lead, prepare a personalized outreach message, and schedule a follow-up task.

### 3. Tools & Tool Steps (Actions)

This is where integrations truly shine! Once connected, integrations provide a library of pre-built actions that your agents can use to interact with external platforms. These actions can be incorporated into your agent’s workflows at any point, not just as triggers.

#### How to Add Integration Actions to Your Agent:

1. Go to the **Agent Settings** page for your agent
2. Select **Tools** under “Connected Resources” in the sidebar
3. Click **”+ Add tool”** to open the tool library
4. Search for the integration name (e.g., “HubSpot” or “Slack”)
5. Browse the available actions for that integration
6. Select the action you want to add and click **”+ Add”**
7. Configure any required parameters for the action
8. Save your changes

<div
  style="{
  position: 'relative',
  boxSizing: 'content-box',
  maxHeight: '80vh',
  maxHeight: '80svh',
  width: '100%',
  aspectRatio: '1.8057022175290391',
  padding: '40px 0'
}"
>
  <iframe
    src="https://app.supademo.com/embed/cm928q3zo2ejzeyp0vhb354og?embed_v=2"
    loading="lazy"
    title="Adding integration actions"
    allow="clipboard-write; fullscreen"
    frameBorder="0"
    webkitAllowFullscreen="true"
    mozAllowFullscreen="true"
    style="{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }"
  />
</div>

#### Examples of Powerful Integration Actions:

**Slack Integration Actions:**

* Send a message to a specific channel
* Create a new channel
* Search for messages
* Update a message
* Upload a file
* Create a poll
* And many more!

**Outlook calendar Integration Actions:**

* Create a new event
* Check availability
* Update an existing event
* Send calendar invites
* Get upcoming events
* Delete events
* And many more!

**HubSpot Integration Actions:**

* Create or update contacts
* Add notes to contact records
* Create deals
* Update deal stages
* Create tasks
* Search for contacts
* Get contact properties
* And many more!

**Notion Integration Actions:**

* Create a new page
* Update page content
* Search for pages
* Create databases
* Add items to databases
* Comment on pages
* And many more!

These actions are the building blocks of powerful workflows. For example, your agent could use the HubSpot “Get Contact” action to retrieve customer information, then use the “Create Task” action to set up a follow-up, and finally use the Slack “Send Message” action to notify your sales team.

The beauty of these actions is that they can be used in any combination and at any point in your agent’s workflow. You’re not limited to a predefined sequence - you can create custom workflows that perfectly match your business processes.

### 4. Using the Integration’s API Tool Step (Advanced)

For advanced users who need more flexibility than the pre-built actions provide, the platform offers direct API access to your connected integrations:

1. Create a new tool in the **Tools** section
2. Scroll down to **Tool Steps**
3. Click **”+ Add Step”**
4. Search for and select the integration’s API tool step (e.g., “HubSpot API”)
5. Select your connected account from the dropdown
6. Configure the API endpoint, method, and parameters
7. Save your tool

This advanced capability allows you to access any functionality exposed by the integration’s API, even if there isn’t a pre-built action for it yet. It’s perfect for custom workflows that require specialized interactions with your external services.

### Creating Powerful Cross-Platform Workflows

The true power of integrations comes from combining multiple actions across different platforms into cohesive workflows. Here’s an example of how you might use integrations to automate a lead nurturing process:

1. A new lead is created in HubSpot (trigger)
2. Your agent uses the web search action to research the lead’s company
3. The agent uses the HubSpot action to add research notes to the contact record
4. The agent uses the Outlook action to send a personalized introduction email
5. The agent uses the Outlook calendar action to schedule a follow-up task
6. The agent uses the Slack action to notify the sales team about the new lead

All of this happens automatically, without any manual intervention required. These workflows can dramatically increase efficiency, reduce human error, and ensure consistent execution of your business processes.

### Best Practices for Using Integrations

To get the most out of your integrations:

1. **Start with clear goals**: Define what you want to achieve with each integration before setting it up
2. **Begin with simple workflows**: Start with basic trigger-action combinations before building complex multi-step processes
3. **Test thoroughly**: Always test your integration workflows with sample data before deploying them
4. **Monitor performance**: Regularly check that your integrations are functioning as expected
5. **Secure your credentials**: Follow security best practices when connecting integrations, especially when using API keys
6. **Document your workflows**: Keep track of how data flows between systems for easier troubleshooting and optimization

### Related Features

Agent Triggers - Learn more about setting up events that automatically activate your agents based on specific conditions or actions.

[Tools](get-started__core-concepts.md) (page `get-started/core-concepts/tools`) - Discover how to enhance your agents with specialized tools that extend their capabilities and allow them to perform specific tasks.

Agent Configuration - Explore the complete process of setting up and customizing your AI agents to work with integrations and other features.

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="How many integrations can I connect to my the platform account?">
    There is no hard limit on the number of integrations you can connect. You can connect as many services as you need to support your workflows.
  </Accordion>

  <Accordion title="Can I connect multiple accounts from the same service?">
    Yes, you can connect multiple accounts from the same service. This is useful if you need to work with different accounts for different purposes or clients.
  </Accordion>

  <Accordion title="What happens if an integration temporarily fails?">
    The system will attempt to reconnect and, if unsuccessful, will notify you of the issue. Your agents will continue to function with their other capabilities while the integration is being restored.
  </Accordion>

  <Accordion title="Can I create custom integrations if what I need isn't available?">
    While the platform continually expands its integration library, you can also use webhook integrations or API tool steps to connect with services that don’t have dedicated integrations yet.
  </Accordion>

  <Accordion title="I added an API key on the Integrations page, how does it get used?">
    When you add an API key to a supported integration (e.g. Firecrawl, Lusha, Airtop), it’s automatically used by all tool steps that require it. No extra configuration needed.
  </Accordion>
</AccordionGroup>


---

# Page: Remove Integrations

Path: `integrations/remove-integrations`.

## Remove Integrations

> Manage your connected services by removing integrations that are no longer needed.

### Overview

While integrations enhance your AI agents’ capabilities by connecting them to external services, there may be times when you need to remove these connections. Whether you’re switching service providers, or simply cleaning up unused connections, the platform provides a straightforward process for removing integrations.

### How to Remove Integrations

Follow these steps to remove an integration from your the platform account:

1. Navigate to the **Integrations** page from the left-hand menu of your the platform account.
2. Locate the integration you want to remove in your list of connected services.
3. Click on the integration to expand its details.
4. Click the three dots settings button and click the **Remove** button.

Once disconnected, the integration will no longer appear in your list of available connections, and your AI agents will no longer have access to that service.

### Important Considerations

Before removing an integration, consider the following:

#### Impact on Agents

* **Check Dependencies**: Verify which agents are currently using the integration before removing it.
* **Update Agent Workflows**: Agents that rely on the removed integration may need reconfiguration to prevent workflow disruptions.
* **Tool Availability**: Tools that depend on the removed integration will no longer function properly.

### Reconnecting Integrations

If you need to reconnect an integration after removing it:

1. Navigate to the **Integrations** page.
2. Browse the available integrations and select the service you want to reconnect.
3. Follow the authentication steps to reauthorize the connection.
4. Once reconnected, the integration will appear in your list of available connections.

### Frequently asked questions (FAQs)

**Q: How do I know which agents are using a particular integration?**\
A: Before removing an integration, go to each agent’s settings and check the “Connected Resources” or “Tools” section to see which integrations they’re using.

