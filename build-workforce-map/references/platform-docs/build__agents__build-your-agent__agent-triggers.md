# The platform docs: `build/agents/build-your-agent/agent-triggers/`

5 pages, downloaded on 11/16/2026.


---

# Page: API Triggers

Path: `build/agents/build-your-agent/agent-triggers/api-trigger`.

## API Triggers

> Trigger your Agent with direct HTTP requests

API Triggers let you trigger your Agent programmatically with direct HTTP requests to the API. Use them to integrate from custom backends, automation scripts, or any environment that can make HTTP calls.

<Callout icon="code" color="#4F46E5" iconType="regular">
  For a higher-level interface in JavaScript or TypeScript, use the SDK — it wraps this endpoint with type-safe primitives, automatic event handling, and runtime support across Node.js, Deno, Bun, Cloudflare Workers, and the browser.
</Callout>

<Warning>
  The the platform API is officially supported only for triggering Agents and Tools. All other usage is currently unsupported.
</Warning>

### Setting up an API trigger

1. Navigate to the Agents page and select the agent you want to configure
2. In the sidebar on the left, go to **Triggers** and click the **Add trigger** button
3. Under the **Build your own triggers** section, click the **API** trigger

The API trigger configuration popup displays the endpoint, a button to generate your API key, and a pre-filled request body with your `agent_id`. Code examples in cURL, JavaScript, and Python are also provided.

<Warning>
  Save your API key somewhere safe — once generated, you won’t be able to view it again. You can regenerate one at any time.
</Warning>

### API reference

**Endpoint:**

```http
POST <your-server-url>
```

<Info>
  The endpoint URL differs based on your organization’s region. The example above shows the AU region endpoint. When you set up your API trigger in the UI, the correct endpoint for your region will be displayed in the configuration popup.
</Info>

**Request body:**

```json
{
  "message": {
    "role": "user",
    "content": "Hello"
  },
  "agent_id": "[YOUR_AGENT_ID_GOES_HERE]"
}
```

<Note>
  The response isn’t returned directly. The agent’s result must be sent to a destination you configure, such as Excel workbook, a webhook, or another integration.
</Note>

### Code examples

**cURL**

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: [YOUR_API_KEY]" \
  -d '{"message":{"role":"user","content":"Hello"},"agent_id":"[YOUR_AGENT_ID_GOES_HERE]"}' \
  <your-server-url>
```

**JavaScript (Fetch)**

```js
fetch('<your-server-url>', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "[YOUR_API_KEY]"
  },
  body: JSON.stringify({
    message: { role: "user", content: "Hello" },
    agent_id: "[YOUR_AGENT_ID_GOES_HERE]"
  })
});
```

**Python (requests)**

```python
import requests
import json

requests.post(
  '<your-server-url>',
  headers={
    "Content-Type": "application/json",
    "Authorization": "[YOUR_API_KEY]"
  },
  data=json.dumps({
    "message": { "role": "user", "content": "Hello" },
    "agent_id": "[YOUR_AGENT_ID_GOES_HERE]"
  })
)
```

### Best practices

* **Error handling**: implement error handling in your integration code
* **Rate limiting**: be mindful of API rate limits and throttle accordingly
* **Security**: store API keys in environment variables rather than hardcoding them
* **Monitoring**: set up monitoring for your trigger usage to detect issues early
* **Testing**: test your implementation in a development environment before deploying to production

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="What programming languages can I use?">
    The API trigger works with any language capable of making HTTP requests. For JavaScript and TypeScript, the SDK provides a higher-level interface with built-in authentication and event handling.
  </Accordion>

  <Accordion title="Are there rate limits?">
    Yes, usage is subject to rate limits based on your subscription plan. Refer to your plan details for specific limitations.
  </Accordion>

  <Accordion title="Can I use this with serverless functions?">
    Yes — the API works with serverless architectures like AWS Lambda, and Azure Functions.
  </Accordion>

  <Accordion title="How secure is the API trigger?">
    All requests must be authenticated with your API key, and all data is transmitted over HTTPS.
  </Accordion>
</AccordionGroup>


---

# Page: Webhook Triggers

Path: `build/agents/build-your-agent/agent-triggers/custom-webhook`.

## Webhook Triggers

> Connect to a custom webhook to trigger your Agent

Webhook Triggers let you trigger your Agent via HTTP requests from any external system — no native integration required. When your webhook receives a request, it sends the payload to your Agent as a message.

#### Setting up a Webhook Trigger

1. Navigate to your Agent’s settings and select the **Triggers** section
2. Choose **Webhook Trigger** from the available options
3. Copy your unique webhook URL
4. Configure your webhook settings:
   * **Message template**: Use template variables with double brackets (e.g., `{{first_name}}`) to format incoming data, or use `{{$}}` to pass the entire payload
   * **Thread ID mapping**: Map a field from your payload to a Thread ID to keep related messages in the same conversation
   * **Unique ID mapping**: Map a field to prevent duplicate processing of the same event

#### Common use cases

* Process form submissions from your website
* Trigger responses when new support tickets are created
* Connect third-party platforms that support outgoing webhooks
* Build automated workflows between different systems

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Can I use webhook triggers with any external system?">
    Yes, any system capable of sending HTTP requests can integrate with the platform’s webhook triggers, making them extremely versatile for various integration scenarios.
  </Accordion>

  <Accordion title="How secure are webhook triggers?">
    Webhook triggers use unique URLs that are difficult to guess. For additional security, you can implement Unique ID mapping to prevent duplicate processing and validate incoming requests.
  </Accordion>

  <Accordion title="What happens if the same webhook is triggered multiple times?">
    By mapping a Unique ID field, you can prevent duplicate processing. If an event with the same Unique ID is received again, it will be ignored, ensuring data integrity.
  </Accordion>
</AccordionGroup>


---

# Page: Integration Triggers

Path: `build/agents/build-your-agent/agent-triggers/integrations`.

## Integration Triggers

> Trigger your Agents from 1,000+ integrations

The platform allows you to trigger your Agents from 1,000+ integrations. Not only can you integrate your favourite products and platforms to your Agents with Tools, you can also trigger your Agents from your favourite integrations.

For each trigger, connect to the integration using your associated credentials. For more information about setting up specific triggers, refer to the integration-specific documentation.

#### Premium Triggers

The Premium triggers below are available on the Pro plan and above.

<Columns cols="2">
  <Card title="LinkedIn" href="integrations__popular-integrations.md" icon="linkedin">
    Initiate your AI agents based on specific LinkedIn events
  </Card>

  <Card title="WhatsApp" href="integrations__popular-integrations.md" icon="whatsapp">
    Use WhatsApp (personal) to trigger your Agent
  </Card>
</Columns>

<Columns cols="2">
  <Card title="WhatsApp for Business" href="integrations__popular-integrations.md" icon="whatsapp">
    Use WhatsApp for Business to trigger your Agent
  </Card>

  <Card title="Telegram" href="integrations__popular-integrations.md" icon="telegram">
    Trigger your Agents from Telegram messages
  </Card>
</Columns>

#### External Triggers

External triggers like **Zapier** are configured and managed outside of the platform. These allow you to connect your Agent to third-party automation platforms without any setup within the platform itself.

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="How do I connect an integration trigger?">
    Navigate to your agent’s Triggers section, select the integration you want to connect, and authenticate with your credentials for that service.
  </Accordion>

  <Accordion title="Are premium triggers included in my plan?">
    Premium triggers (LinkedIn, WhatsApp, WhatsApp for Business, and Telegram) are available on the Pro plan and above.
  </Accordion>
</AccordionGroup>


---

# Page: Scheduled Triggers

Path: `build/agents/build-your-agent/agent-triggers/scheduled-triggers`.

## Scheduled Triggers

> Set your Agent to run on a schedule or send messages at specific times

Scheduled triggers let your Agent act on its own based on time — either by running tasks on a recurring schedule or by sending messages at specific future times. Use them to automate reports, follow-ups, reminders, and any workflow that needs to happen without manual input.

### Recurring schedules

Recurring schedules run your Agent automatically at set intervals — daily, weekly, monthly, or on a custom cadence.

#### Setting up a recurring schedule

1. Go to your agent in the dashboard
2. Click ‘Edit Agent’
3. Navigate to the ‘Triggers’ section
4. Select ‘Recurring Schedule’
5. Choose your schedule type

#### Schedule types

##### Simple schedule options

| Schedule Type | What It Does                        | Perfect For                          |
| ------------- | ----------------------------------- | ------------------------------------ |
| **Daily**     | Runs every day at a time you choose | Morning reports, daily check-ins     |
| **Weekly**    | Runs on specific days each week     | Team updates, weekly newsletters     |
| **Monthly**   | Runs on chosen dates each month     | Monthly reports, regular maintenance |
| **Custom**    | Runs on specific dates you select   | One-off tasks or irregular schedules |

##### Advanced: cron expressions

For more precise control over scheduling, you can use **Cron expressions**. The platform uses **AWS EventBridge cron format**, which requires **six fields**:

```
minute hour day-of-month month day-of-week year
```

**Cron Expression Format:**

| Field            | Values          | Wildcards      |
| ---------------- | --------------- | -------------- |
| **Minute**       | 0-59            | , - \* /       |
| **Hour**         | 0-23            | , - \* /       |
| **Day-of-month** | 1-31            | , - \* ? / L W |
| **Month**        | 1-12 or JAN-DEC | , - \* /       |
| **Day-of-week**  | 1-7 or SUN-SAT  | , - \* ? L #   |
| **Year**         | 1970-2199       | , - \* /       |

**Special Characters:**

* `*` (asterisk) - all values
* `?` (question mark) - no specific value (used in day-of-month or day-of-week)
* `-` (dash) - range of values
* `,` (comma) - additional values
* `/` (forward slash) - increments
* `L` - last day of month or week
* `W` - nearest weekday
* `#` - nth occurrence of a day in a month

**Common Cron Expression Examples:**

```
0 10 * * ? *        # Every day at 10:00 AM
0 0 * * MON *       # Every Monday at midnight
0 9 1 * ? *         # First day of every month at 9:00 AM
0 0 * * MON-FRI *   # Weekdays at midnight
*/15 * * * ? *      # Every 15 minutes
0 9,17 * * ? *      # Daily at 9:00 AM and 5:00 PM
0 0 1,15 * ? *      # 1st and 15th of every month at midnight
0 8 ? * 2 *         # Every Monday (day 2) at 8:00 AM
0 10 L * ? *        # Last day of every month at 10:00 AM
0 9 ? * 2#1 *       # First Monday of every month at 9:00 AM
```

<Note>
  AWS EventBridge cron expressions use 6 fields, unlike traditional Unix cron which uses 5 fields. Always include the year field, and use `?` for either day-of-month or day-of-week when specifying the other.
</Note>

#### Tips

* **Start small**: Begin with one simple recurring task before setting up complex schedules
* **Test thoroughly**: Run your agent manually first to ensure it works as expected
* **Monitor initially**: Check the first few automated runs to confirm everything works correctly
* **Use cron for precision**: When you need exact timing control, use cron expressions instead of simple schedules

***

### Scheduled messages



Scheduled messages let your Agent send messages at specific future times — follow-ups, reminders, check-ins, or any time-based outreach. You can edit or reschedule these messages directly in Task View.

#### Setting up Scheduled Messages

1. Navigate to the **Build** page
2. Look for the **Triggers** section
3. Scroll to the bottom and turn on the **Enabled Scheduled Messages** toggle
4. Add instructions in your agent’s core instructions about when to schedule messages

Once turned on, your agent will understand time-based requests like “send a follow-up tomorrow at 9 AM” or “remind me about this next Tuesday.”

You can guide your agent’s scheduling behaviour by adding instructions to your agent’s **Prompt** like:

```
When someone asks about upcoming events, schedule a reminder 24 hours before each event.

If someone has a deadline, schedule a check-in halfway to the deadline.

For multi-step processes, schedule messages at each milestone to keep people on track.
```

#### Scheduled messages settings

##### Enabled Scheduled Messages (toggle)

Turn this on to allow your Agent to schedule actions or messages for the future. Without this enabled, your Agent can only respond in real-time and won’t be able to set future reminders, follow-ups, or scheduled notifications.

##### Max daily Scheduled Triggers

Set a limit on how many scheduled actions your Agent can process in a single day. Leaving it at “No limit” means the Agent can schedule and send as many future messages as needed. If you want to control costs, manage system load, or prevent overactivity, you can set a specific maximum number.

##### Prevent Scheduled Messages from interrupting a Task

When this is enabled, your Agent won’t interrupt an active task (like when it’s waiting for approvals or processing another action) just to send a scheduled message. Instead, the scheduled message will wait and be delayed by at least the time you specify (default is 1,440 minutes, or 24 hours).

This prevents your Agent from getting confused, stuck, or behaving unpredictably when juggling multiple actions.

##### Schedule Message Tool

A built-in tool your Agent can use when writing prompts. Use the `/schedule message` shortcut inside your Agent’s instructions to tell it exactly when and what to schedule automatically during conversations.

**Example:**

> “After summarizing today’s emails, schedule a check-in message tomorrow at 10 AM.”

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="What if my agent encounters an error during a scheduled run?">
    The system logs errors and can send notifications based on your settings. You can view error details in your agent’s task history.
  </Accordion>

  <Accordion title="Can I temporarily pause a recurring schedule?">
    Yes, you can disable schedules without deleting them when you need a pause. Simply toggle off the schedule in your agent’s Triggers settings.
  </Accordion>

  <Accordion title="How do I change an existing schedule?">
    Go back to the Recurring Schedule section in your agent’s Triggers settings and update the schedule as needed. Changes take effect immediately.
  </Accordion>

  <Accordion title="What timezone are scheduled runs based on?">
    Scheduled runs use your account’s configured timezone. You can adjust this in your agent’s schedule settings to ensure tasks run at the correct local time.
  </Accordion>
</AccordionGroup>


---

# Page: Tools as Triggers

Path: `build/agents/build-your-agent/agent-triggers/tools-as-triggers`.

## Tools as Triggers

> Use a Tool as a trigger for your Agent

Tools as Triggers let you use the output of a Tool to trigger your Agent. This is useful when you need to combine data from multiple sources — like Salesforce and Airtable — to filter and process only the most relevant records before your Agent acts on them.

<Note>
  The Tool you use as a Trigger must return an 

  **array**

   as its output.
</Note>

#### Setting up a Tool Trigger

1. Navigate to your Agent’s **Triggers** section and select **Tool Trigger**
2. **Name your Trigger** — give it a clear name so you can identify it later
3. **Select the Tool** you want to use as a trigger
4. Click **Continue**
5. **Run a test** of the Tool — this produces a sample output so you can configure what gets sent to your Agent
6. **Select the output field** from the Tool’s results that you want to use as the Agent’s input
7. Optionally, enable **deduping** (see below)
8. **Set a schedule** — choose how often the Tool runs (daily, weekly, etc.) and the time
9. Optionally, configure **queue work hours** if your plan supports it
10. Click **Setup** to finish

#### Deduping

Deduping prevents duplicate messages from being added to your Agent’s queue. When enabled, you specify a field to use for deduplication.

For example, if your Tool output includes a unique field like `_id`, messages with the same value in that field won’t be added to the queue more than once — regardless of whether the rest of the data has changed.

#### Common use cases

* Pull new leads from a CRM and filter by criteria before triggering outreach
* Combine data from multiple platforms into a single, filtered trigger
* Process only records that meet specific conditions using custom Tool logic

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Can I change the Tool's inputs for each run?">
    No. You can only set default values for the Tool’s inputs, which will be used every time the Trigger fires. Dynamic inputs per run are not supported.
  </Accordion>
</AccordionGroup>

