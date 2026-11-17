# The platform docs: `build/workforces/build-an-ai-workforce/`

7 pages, downloaded on 11/16/2026.


---

# Page: Add, create, edit and connect Agents to your Workforce

Path: `build/workforces/build-an-ai-workforce/add-agents`.

## Add, create, edit and connect Agents to your Workforce

> Adding agents to your Workforce allows you to create powerful multi-agent systems where specialized AI agents work together to accomplish complex tasks.

### Adding Agents to Your Workforce

You can add Agents you’ve already created to your Workforce by following these instructions

1. Open your Workforce, and drag or click an Agent onto your Workforce
2. Using the right-hand sidebar, select the Agent you want to add to your Workforce

### Create Agents within your Workforce

You can also create Agents within the Workforce builder by following these instructions:

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cmb4jv9bp2c84ppkp6qe4p412" frameBorder="0" title="How to create Agents from the Workforce builder in the platform" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

1. Open your Workforce, and drag or click an Agent onto your Workforce
2. Then, when the right-hand sidebar opens, click ‘Create new agent’
3. You should then be able to name, describe and change the icon of your Agent
4. Afterwards, you can change your Agent’s Prompt, add Tools, and access all sections of your Agent aside from the ones mentioned below from the Workforce builder!

<Warning>
  You cannot edit your Agent’s triggers from the Workforce builder, as Workforce’s have their own Triggers. You also cannot access your Agent’s Advanced Settings.
</Warning>

### Edit Agents within your Workforce

You can also edit your Agents by clicking on them within the Workforce.

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cmb4kb3vz2ca6ppkpuvhwcpo1" frameBorder="0" title="How to edit Agents in the Workforce builder in the platform" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

1. First, click on the Agent you want to edit
2. Then, the right-hand sidebar should open, allowing you to make any edits you need
3. After you’ve made an edit, you will need to save your Agent before continuing to make edits to other parts of your Workforce

<Warning>
  When you edit an Agent from the Workforce builder, it changes the settings for that Agent everywhere. We do not have Workforce-specific Agent settings.
</Warning>

### Connect Agents in your Workforce together

Once you’ve added two or more Agents to your Workforce, you can connect them together by following these instructions:

1. Click and drag from one Agent to create a connection line to another Agent
2. When connecting Agents, you’ll be prompted to select a connection type:

* **AI connection**: The Agent makes its own decision on whether to talk to another Agent
* **Next step**: An Agent will always hand over what it was doing to the next Agent, regardless of its finished state

3. After creating a connection, click on the connecting line to configure edge settings
   * For ‘**AI connection**’ connections:
     * Complete the “When to call this agent” box with natural language instructions
     * Set approval mode (auto run, approval required, or let agent decide)
     * Configure max auto runs as a guardrail
     * Choose between ‘always start a new task’ or ‘always continue with one task’
   * For ‘**Next step**’ connections:
     * Choose between ‘always start a new task’ or ‘always continue with one task’
4. Click the ‘Save’ button to save your configuration

### Connection type

When connecting Agents, you can configure how they communicate with each other:

#### AI connection

Use natural language to explain how the Agent should behave. The Agent will follow your instructions but will escalate if it needs help or clarification.

* **Communication Settings**: Explain in natural language when this Agent should be called. For example, if a manager Agent is delegating to another Agent, explain the logic for when to delegate to that specific Agent.
* **Approval mode**:
  * **Auto run**: The Agent will complete the task without approval
  * **Approval required**: The Agent will draft the task but ask for approval before completing
  * **Let Agent decide**: The Agent will complete the task if confident, otherwise will ask for approval
  * **Max auto runs**: Set a limit on the number of times the Agent auto runs

#### Next step

This setting forces one Agent to pass the task to another Agent. The handover must happen regardless of the first Agent’s state.

### Best Practices for Adding Agents

1. **Define Clear Roles**
   * Give each Agent a specific role and responsibility within your workforce
   * Avoid overlapping responsibilities that could cause confusion
2. **Create Logical Workflows**
   * Arrange Agents in a way that follows a natural progression of tasks
   * Consider the information flow between Agents when designing your workforce
3. **Use Descriptive Connection Instructions**
   * When using “AI connection”, provide clear, detailed instructions about when to delegate
   * Include specific criteria or conditions that should trigger the handover
4. **Test Incrementally**
   * Add and test Agents one at a time to ensure each connection works as expected
   * Use the Task View to monitor how Agents interact with each other
5. **Set Appropriate Approval Levels**
   * For critical tasks, use “Approval required” to maintain human oversight
   * For routine tasks, consider “Auto run” to maximize efficiency

### Monitoring Your Multi-Agent Workforce

After adding Agents to your Workforce:

1. Go to the ‘Task’ view to see your Workforce in action
2. Here you can trigger your Workforce via manual messages/conversation
3. Monitor when specific Agents need approvals
4. Observe how Agents communicate and hand off tasks to each other

### Troubleshooting

<AccordionGroup>
  <Accordion title="Agents aren't communicating as expected">
    Check the connection settings between Agents and ensure the instructions are clear and specific.
  </Accordion>

  <Accordion title="Workflow stops unexpectedly">
    Check if an Agent is waiting for approval in the Task View.
  </Accordion>

  <Accordion title="Agent makes incorrect decisions about when to delegate">
    Refine the natural language instructions in the “When to call this agent” field.
  </Accordion>
</AccordionGroup>


---

# Page: Add Conditions

Path: `build/workforces/build-an-ai-workforce/add-conditions`.

## Add Conditions

> Conditions in Workforce act as powerful decision-making components that allow you to create intelligent workflows with conditional logic.

### Overview

Conditions enable you to build dynamic, responsive workflows by creating branching paths based on specific criteria. Rather than having a linear workflow where every step always executes in the same order, conditions let you implement decision points that determine which path your workflow should take.

Workforce offers two types of conditions to suit different use cases:

* **LLM-based conditions**: Use natural language to describe complex logic that requires interpretation
* **Rule-based conditions**: Use structured filters for deterministic, precise comparisons

### When to Use Conditions

Conditions are particularly valuable when you need to:

* Process data differently based on specific values or states
* Create branching workflows with different paths for different scenarios
* Implement quality control checks before proceeding to critical steps
* Filter out certain items from further processing
* Execute tools only on specific days, times, or under certain circumstances

### Adding a Condition to Your Workforce

To add a condition to your workforce:

1. Navigate to the “Build” section of your Workforce
2. Locate the “Conditions” option in the node selection panel
3. Drag a condition node onto your workspace
4. Connect the condition to the appropriate tools or agents

### Choosing a Condition Type

When you configure a condition node, you’ll see a **Condition type** dropdown with two options:

#### LLM-based Conditions

LLM-based conditions use natural language to evaluate complex logic. The AI interprets your description and determines whether the condition is met.

**Best for:**

* Complex logic that’s easier to express in natural language
* Evaluating unstructured data like text content
* Scenarios requiring interpretation or context understanding
* Time-based conditions (e.g., “if it’s a weekday”)

**Example use cases:**

* “Go down this path if the email contains an urgent request”
* “Follow this route if the customer sentiment is negative”
* “Use this path if today is a weekday”

#### Rule-based Conditions

Rule-based conditions use structured filters to compare specific values. These are deterministic and don’t require AI interpretation.

**Best for:**

* Precise comparisons of known values
* Checking tool outputs against expected values
* Numeric comparisons
* Validating that specific fields exist or have certain values
* Performance-critical paths where you need guaranteed behavior

**Example use cases:**

* Checking if a tool’s status output equals “SUCCESS”
* Verifying a numeric value is greater than a threshold
* Confirming a required field is not empty

### Configuring LLM-based Conditions

Setting up LLM-based conditions is simple thanks to natural language configuration:

1. Click on your condition node to open its settings
2. Select **LLM-based** from the Condition type dropdown
3. Enter a natural language description of your condition, such as:
   * “Go down this path if the day is a weekday”
   * “Follow this route if the customer score is above 80”
   * “Use this path if the email contains the word ‘urgent’”

### Configuring Rule-based Conditions

Rule-based conditions let you build precise filters using a structured interface:

#### Basic Setup

1. Click on your condition node to open its settings
2. Select **Rule-based** from the Condition type dropdown
3. Click **Add filter** to create your first rule

#### Filter Components

Each filter has three parts:

##### 1. Target

The **Target** is the value you want to evaluate. Use the variable picker to select from upstream node outputs.

The picker displays available variables in this format:

```
<Node Name> / output / <field name>
```

For example:

* `Check Status / output / result` - the “result” field from a tool called “Check Status”
* `Get User Data / output / email` - the “email” field from a tool called “Get User Data”

<Note>
  The target resolves to whatever value that field contains. If the field contains an object, you’re comparing the entire object, not a nested property within it.
</Note>

##### 2. Operator

Choose how to compare the target value:

| Operator        | Description                      | Example Use Case                   |
| --------------- | -------------------------------- | ---------------------------------- |
| **equals**      | Exact match                      | Check if status equals “SUCCESS”   |
| **contains**    | Target includes the source value | Check if text contains “urgent”    |
| **starts with** | Target begins with source value  | Check if ID starts with “CUST-”    |
| **ends with**   | Target ends with source value    | Check if filename ends with “.pdf” |
| **exists**      | Target field has any value       | Verify a field is present          |
| **empty**       | Target field is empty or null    | Check if optional field is blank   |
| **>**           | Greater than (numeric)           | Check if score > 80                |
| **\<**          | Less than (numeric)              | Check if count \< 10               |
| **>=**          | Greater than or equal to         | Check if age >= 18                 |
| **\<=**         | Less than or equal to            | Check if price \<= 100             |

##### 3. Source

The **Source** is the value you’re comparing against. You can either:

* Enter a constant value (e.g., “SUCCESS”, 100, “urgent”)
* Use the variable picker to select another field from upstream nodes

#### Match Modes

When you have multiple filters, choose how they should be evaluated:

* **Match All** (AND logic): All filters must be true for the condition to pass
* **Match Any** (OR logic): At least one filter must be true for the condition to pass

#### Understanding Target Paths

The target path determines what value gets evaluated. Here’s how it works:

**Example 1: Simple string output**

```
Tool: "Check Status"
Output: "SUCCESS"
Target: Check Status / output
Comparison: equals "SUCCESS" ✓
```

**Example 2: Object output**

```
Tool: "Validate Data"
Output: {"status": "SUCCESS", "code": 200}
Target: Validate Data / output
Comparison: equals {"status": "SUCCESS", "code": 200} ✓
```

<Warning>
  If a tool returns an object like 

  `{"status":"SUCCESS"}`

  , the target picker shows 

  `Tool Name / output`

  , which refers to the entire object. You cannot drill into nested fields like 

  `status`

   through the picker.
</Warning>

#### Nested Field Limitation and Workaround

Rule-based conditions cannot access nested fields within objects. If your tool returns:

```json
{
  "status": "SUCCESS",
  "data": {
    "user_id": 123
  }
}
```

You **cannot** directly access `status` or `data.user_id` through the target picker.

**Workaround:** Structure your tools to output flat values as separate named outputs:

Instead of returning a single object, configure your tool to return:

* Output 1: `status` = “SUCCESS”
* Output 2: `user_id` = 123

This way, each value is accessible as a separate target in your rule-based condition.

### Practical Examples

#### Example 1: Check Tool Success Status

**Scenario:** Only proceed if a validation tool succeeded

**Setup:**

* Condition type: Rule-based
* Filter 1:
  * Target: `Validate Input / output / status`
  * Operator: equals
  * Source: “SUCCESS”

#### Example 2: Numeric Threshold Check

**Scenario:** Route high-value orders differently

**Setup:**

* Condition type: Rule-based
* Filter 1:
  * Target: `Calculate Total / output / amount`
  * Operator: >
  * Source: 1000

#### Example 3: Multiple Conditions (AND Logic)

**Scenario:** Process only if status is complete AND priority is high

**Setup:**

* Condition type: Rule-based
* Match mode: Match All
* Filter 1:
  * Target: `Get Status / output / status`
  * Operator: equals
  * Source: “complete”
* Filter 2:
  * Target: `Get Priority / output / level`
  * Operator: equals
  * Source: “high”

#### Example 4: Multiple Conditions (OR Logic)

**Scenario:** Flag items that are either urgent or high-value

**Setup:**

* Condition type: Rule-based
* Match mode: Match Any
* Filter 1:
  * Target: `Check Priority / output / priority`
  * Operator: equals
  * Source: “urgent”
* Filter 2:
  * Target: `Calculate Value / output / amount`
  * Operator: >=
  * Source: 5000

#### Example 5: Check Field Exists

**Scenario:** Only proceed if an optional field was provided

**Setup:**

* Condition type: Rule-based
* Filter 1:
  * Target: `Get Input / output / optional_field`
  * Operator: exists

#### Example 6: String Pattern Matching

**Scenario:** Route customer IDs that start with a specific prefix

**Setup:**

* Condition type: Rule-based
* Filter 1:
  * Target: `Get Customer / output / customer_id`
  * Operator: starts with
  * Source: “PREMIUM-”

### Best Practices

#### When to Use Each Condition Type

**Use LLM-based conditions when:**

* You need to evaluate natural language or unstructured text
* The logic is complex and easier to express in plain English
* You’re working with time-based or contextual conditions
* Exact matching isn’t critical

**Use rule-based conditions when:**

* You need precise, deterministic comparisons
* You’re validating tool outputs against known values
* You’re working with numeric thresholds
* Performance and reliability are critical
* You want to avoid AI interpretation overhead

#### General Tips

1. **Keep conditions focused**: Each condition should evaluate a clear, specific criterion
2. **Test thoroughly**: Verify your conditions work with different inputs and edge cases
3. **Use descriptive node names**: Make it easy to identify what each condition checks
4. **Consider the data structure**: For rule-based conditions, ensure your tools output data in a format that’s easy to filter
5. **Combine condition types**: Use LLM-based for complex logic and rule-based for precise checks in the same workflow

### Troubleshooting

#### Rule-based Condition Not Working

**Problem:** Your rule-based condition isn’t evaluating correctly

**Solutions:**

1. Check that the target path points to the correct field
2. Verify the operator matches your comparison type (e.g., use numeric operators for numbers)
3. Ensure the source value matches the expected data type
4. Test with a simpler condition to isolate the issue
5. Check if the upstream tool is actually outputting the expected value

#### Cannot Access Nested Fields

**Problem:** You need to check a value inside an object, but it’s not available in the picker

**Solution:** Restructure your tool to output flat values as separate named outputs instead of nested objects.

#### Condition Always Passes or Fails

**Problem:** Your condition doesn’t seem to evaluate properly

**Solutions:**

1. For rule-based: Verify the target field actually contains data
2. For LLM-based: Make your natural language description more specific
3. Check the match mode (Match All vs Match Any) if using multiple filters
4. Review the execution logs to see what values are being compared

### Related Features

* [Condition to Tool Configuration](build__workforces__workforce-features.md) (page `build/workforces/workforce-features/condition-to-tool-configuration`): Learn how to connect conditions to tools
* [Edge Settings](build__workforces__build-an-ai-workforce.md) (page `build/workforces/build-an-ai-workforce/edge-settings`): Configure how nodes connect in your workforce
* [Add Tools](build__workforces__build-an-ai-workforce.md) (page `build/workforces/build-an-ai-workforce/add-tools`): Learn about adding and configuring tools in your workforce


---

# Page: Add Tools

Path: `build/workforces/build-an-ai-workforce/add-tools`.

## Add Tools

> Tools are essential components in your AI Workforce that enable agents to perform specific actions and complete tasks.

### What Are Tools in Workforce?

In the Workforce, tools function as independent nodes that can be connected to agents, triggers, and even other tools. Unlike the traditional approach where tools are tightly coupled to specific agents, Workforce allows for a more flexible and modular design:

* Tools exist as standalone components on the workspace
* Multiple agents can access the same tool
* Tools can be connected to other tools to create sequential workflows
* Tools can be easily substituted without having to reconfigure each agent

<Note>
  When you edit a tool that is used by multiple agents, a warning banner appears in the tool editor showing how many agents are affected. You can clone the tool to make changes that only apply to specific agents. See 

  [Editing shared tools](build__tools.md) (page `build/tools/create-a-tool`)

   for details.
</Note>

### How to Add Tools to Your Workforce

Adding tools to your Workforce is a straightforward process:

1. Open your Workforce and navigate to the “Build” section
2. Locate the tools panel in the Workforce interface
3. Drag any tool from your project onto the workspace
4. Position the tool where you want it on the canvas

### Connecting Tools in Your Workforce

Once you’ve added tools to your workspace, you can create powerful connections:

#### Agent to Tool Connections

To connect an agent to a tool:

1. Click on the agent node to reveal connection points
2. Drag a connection line from the agent to your desired tool
3. Configure the connection type:
   * **AI connection**: The agent will determine when to use the tool based on natural language instructions
   * **Next step**: The agent will always use the tool when the connection is triggered

#### Tool to Tool Connections

One of the most powerful features of the Workforce Builder is the ability to connect tools to other tools:

1. Click on the source tool to reveal connection points
2. Drag a connection line to the destination tool
3. This creates a workflow where the output of one tool becomes the input for the next

For example, you might connect a tool that sends an email to another tool that summarizes responses, creating an automated follow-up workflow.

### Edge Settings for Tool Connections

When connecting tools in your Workforce, you can configure the following edge settings:

#### Connection type

* **AI connection**: Use natural language to explain when the tool should be used
* **Next step**: Always execute the tool when the connection is triggered

#### Approval mode

* **Auto run**: The tool will execute without requiring approval
* **Approval required**: The tool will draft the action but ask for human approval before executing
* **Let agent decide**: The agent will determine whether to auto-run or request approval based on context
* **Max auto runs**: Set limits on how many times a tool can auto-run as a safety guardrail

### Tool to Tool Workflows

The ability to connect tools directly to other tools is what makes the Workforce Builder so powerful. This workflow-style approach allows you to:

1. Create sequential processes where each tool performs a specific function
2. Build complex automations without writing code
3. Easily modify or replace individual components without disrupting the entire workflow
4. Maintain a visual representation of your business processes

For example, after sending an email with one tool, you could automatically hand over to another tool that monitors for responses, and then to a third tool that generates appropriate follow-ups.

### Using Conditions with Tools

For more advanced workflows, you can add conditions to your tool connections:

1. Add a condition node to your workspace
2. Connect a tool to the condition
3. Connect the condition to other tools
4. Configure the condition logic (e.g., “only send email if day of week is weekday”)

Conditions act as IF statements in your workflow, allowing for branching logic and more sophisticated automations.

### Best Practices for Tools in Workforce Builder

To get the most out of tools in your Workforce:

1. **Keep tools focused**: Each tool should perform a specific, well-defined function
2. **Use descriptive names**: Name your tools clearly to understand their purpose at a glance
3. **Document connections**: Use the description fields to explain how tools should work together
4. **Test thoroughly**: Before deploying, test your tool connections with various inputs
5. **Monitor performance**: Regularly review how your tools are performing and refine as needed

### Related Features

* Workforce Task View: Monitor and manage your workforce tasks and tool executions
* Edge Settings: Configure how nodes connect and communicate in your workforce
* Add Conditions: Learn how to add conditional logic to your workforce flows

By effectively utilizing tools in the Workforce Builder, you can create sophisticated, autonomous workflows that handle complex business processes with minimal human intervention.


---

# Page: Add Triggers

Path: `build/workforces/build-an-ai-workforce/add-triggers`.

## Add Triggers

> Triggers are the starting points that initiate workflows in your AI Workforce. They determine when and how your agents begin their work, serving as the entry points to your entire workflow system.

### Understanding Triggers

Triggers are specialized nodes in the Workforce that activate your agents based on specific events or conditions. They function as the initial connection point in your workflow, determining when your AI agents should start performing their tasks.

#### Types of Triggers

##### Manual Triggers

When you first create a workforce, a manual trigger is automatically added to your workspace. This allows you to directly initiate your workflow by sending a message to your agent, similar to how you would interact with a standalone agent in the platform.

Manual triggers are ideal for:

* Testing your workflow during development
* On-demand tasks that require human initiation
* Workflows that need to begin with specific human input or context

##### Integration Triggers

Integration triggers connect your workforce to external systems, allowing your agents to automatically respond to events from those systems. These triggers enable your AI Workforce to monitor and react to activities in your connected tools and platforms.

Common integration triggers include:

* Email triggers that activate when new messages arrive
* Calendar triggers that respond to meeting invitations or reminders
* CRM triggers that react to new lead creation or status changes
* Webhook triggers that respond to custom events from any system

##### Recurring Schedule Triggers

Recurring schedule triggers allow your AI Workforce to run automatically at set times without manual intervention. This is perfect for automating repetitive tasks that need to happen on a regular basis.

Use recurring schedules for:

* Daily reports that need to be generated every morning
* Weekly data processing tasks
* Monthly analytics and summaries
* Periodic system checks and maintenance tasks

##### External Triggers (Zapier)

External triggers like Zapier are configured and managed outside of the platform. In Zapier, you can use the “Message Workforce” event to send data to your Workforce whenever a Zap fires — connecting your Workforce to any app or service that Zapier supports without needing a native integration in the platform.

Since Zapier triggers are managed entirely within Zapier’s platform, refer to Zapier’s documentation for setup and configuration of specific Zaps.

### Adding Triggers to Your Workforce

#### Adding Your First Trigger

1. When you open your workforce, you’ll see a manual trigger already available in your workspace.
2. Connect this trigger to an agent by dragging a line from the trigger to your chosen agent.
3. This connection establishes the entry point for your workflow.

#### Adding Additional Triggers

To add more triggers to your workforce:

1. Navigate to the Workforce interface.

2. Locate the “Triggers” section in the node palette.

3. Drag your desired trigger type onto the workspace.

4. Position it appropriately in your workflow diagram.

5. Connect the trigger to the agent that should respond first when the trigger activates.

### Configuring Triggers

Each trigger type has specific configuration options that determine its behavior:

#### Manual Trigger Configuration

To trigger your workforce manually:

1. Switch to the “Task” tab in the interface.
2. Use the message input field to send a manual message to your workforce.
3. Provide natural language instructions that will initiate your workflow.
4. Your connected agent will receive this message and begin processing according to your workflow configuration.

This manual interaction allows you to start your workflow with specific context and instructions whenever needed.

#### Integration Trigger Configuration

Integration triggers require specific setup to connect with external systems:

1. Select the integration trigger in your workspace.
2. Complete the authentication process for the connected service.
3. Configure trigger conditions (e.g., specific email subjects, calendar event types).
4. Set any filters to ensure the trigger only activates for relevant events.
5. Test the connection to verify proper setup.

#### Recurring Schedule Trigger Configuration

Recurring schedules can be configured using either simple schedule options or advanced cron expressions:

##### Simple Schedule Options

| Schedule Type | What It Does                        | Perfect For                          |
| ------------- | ----------------------------------- | ------------------------------------ |
| **Daily**     | Runs every day at a time you choose | Morning reports, daily check-ins     |
| **Weekly**    | Runs on specific days each week     | Team updates, weekly newsletters     |
| **Monthly**   | Runs on chosen dates each month     | Monthly reports, regular maintenance |
| **Custom**    | Runs on specific dates you select   | One-off tasks or irregular schedules |

##### Advanced: Cron Expressions

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

### Pausing triggers

#### Pause all triggers

<div style="{ width:"100%",position:"relative",paddingTop:"56.25%"}">
  <iframe src="https://app.supademo.com/embed/cmlq00tfh1z7gegrdbvz0ok0e?embed_v=2" frameBorder="0" title="How to pause all triggers" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

The “Pause all triggers” feature allows you to temporarily stop integrated triggers in your workforce without disconnecting integrations or deleting trigger configurations. This feature is accessible from the workforce interface and provides a quick way to control automated workflow execution.

##### What gets paused

* Integration triggers (Outlook, Slack, CRM, etc.)
* Webhook triggers
* Recurring schedule triggers
* All other integrated triggers

##### What continues working

* Manual triggers (user message received)
* Direct user interactions

<Note>
  Manual triggers like “user message received” are designed to always remain active and cannot be paused. This ensures users can always interact with the workforce, even when integrated triggers are paused.
</Note>

### Best Practices for Using Triggers

#### Strategic Trigger Placement

* **Start with clarity**: Position triggers at the logical beginning points of your workflows.
* **Minimize redundancy**: Avoid having multiple triggers that serve the same purpose.
* **Consider user experience**: For manual triggers, ensure they’re intuitive and provide clear guidance.

#### Trigger Maintenance

* Regularly test triggers to ensure they’re functioning correctly.
* Monitor trigger activity to identify any performance issues.
* Update trigger configurations when connected systems change.

#### Recurring Schedule Best Practices

* **Start small**: Begin with one simple recurring task before setting up complex schedules.
* **Test thoroughly**: Run your workforce manually first to ensure it works as expected.
* **Monitor initially**: Check the first few automated runs to confirm everything works correctly.
* **Use cron for precision**: When you need exact timing control, use cron expressions instead of simple schedules.
* **Consider dependencies**: Ensure your workforce can complete within the scheduled interval to avoid overlapping runs.

#### Security Considerations

* Review authentication settings for integration triggers regularly.

* Implement appropriate access controls for manual triggers.

* Consider data privacy implications when configuring trigger conditions.

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Why is my trigger not activating?">
    Verify connection settings and authentication. For integration triggers, check that the connected service has the proper permissions. For recurring schedules, ensure the cron expression or schedule configuration is correct.
  </Accordion>

  <Accordion title="How do I prevent duplicate activations?">
    Check for overlapping trigger conditions. Review all triggers in your workforce to ensure they don’t respond to the same events. For recurring schedules, verify that you don’t have multiple schedules set for the same time.
  </Accordion>

  <Accordion title="Why are my workflow responses delayed?">
    Examine workflow complexity and agent configuration. Complex workflows with multiple agents may take longer to complete. Check your agent settings and consider optimizing the workflow structure.
  </Accordion>

  <Accordion title="Can I temporarily pause a recurring schedule?">
    Yes, you can disable recurring schedule triggers without deleting them. Simply toggle off the schedule in your workforce’s trigger settings when you need a pause.
  </Accordion>

  <Accordion title="What timezone are scheduled runs based on?">
    Scheduled runs use your account’s configured timezone. You can adjust this in your workforce settings to ensure tasks run at the correct local time.
  </Accordion>

  <Accordion title="What happens when I click 'Pause all triggers'?">
    When you click “Pause all triggers”, all integrated triggers in your workforce are temporarily disabled. This includes integration triggers (Outlook, Slack, CRM monitors), webhook triggers, and recurring schedule triggers. However, manual triggers like “user message received” continue to work normally, allowing you to interact with your workforce through the Task View at any time.
  </Accordion>

  <Accordion title="Why does my workforce still respond to messages after pausing all triggers?">
    Manual triggers, such as “user message received”, are designed to always remain active and cannot be paused. These triggers represent direct user interactions and ensure you can always communicate with your workforce. The “Pause all triggers” feature only affects integrated triggers (integrations, webhooks, and schedules) that run without user initiation.
  </Accordion>

  <Accordion title="How do I test my triggers?">
    Test triggers based on their type:

    **For Manual and Integration Triggers:**

    1. Navigate to the “Task” tab in your Workforce
    2. For manual triggers: Send a test message to initiate the workflow
    3. For integration triggers: Trigger a test event from the connected service
    4. Monitor the execution in the [Workforce Task View](build__workforces__workforce-features.md) (page `build/workforces/workforce-features/workforce-task-view`) to verify proper activation

    **For Recurring Schedule Triggers:**

    * **Note:** Test activations are not currently supported for recurring schedule triggers
    * **Best practice:** Test your workflow manually first using a manual trigger before setting up the recurring schedule
    * Monitor the first few automated runs after activation
    * Check the Task View after scheduled runs to verify execution

    **Checking Logs and Error Messages:**

    1. **Workforce Task View:** Navigate to the “Task” section in your Workforce to view:
       * All current and recent activities
       * Failed tasks with error messages
       * Agent notes and execution details
       * Complete conversation histories
       * [Learn more about Workforce Task View](build__workforces__workforce-features.md) (page `build/workforces/workforce-features/workforce-task-view`)

    2. **Tool Logs:** Within individual tools, access the “Logs” tab to view execution details. [Learn more about Tools](get-started__core-concepts.md) (page `get-started/core-concepts/tools`)

    3. **Agent Task History:** For agents with recurring schedules, view error details in the agent’s task history. [Learn more about Agent Triggers](build__agents__build-your-agent.md) (page `build/agents/build-your-agent/triggers`)

    **Additional Verification Steps:**

    * Verify that connected agents have appropriate permissions
    * Ensure all necessary API keys and credentials are current
    * Check trigger configuration settings (filters, conditions, authentication)
  </Accordion>
</AccordionGroup>


---

# Page: Edge Settings

Path: `build/workforces/build-an-ai-workforce/edge-settings`.

## Edge Settings

> Edge Settings control how nodes are connected to each other in your AI Workforce.

### Connection types

When connecting nodes in your Workforce, you can choose between two primary connection types:

#### AI connection

This option gives your agent autonomy to determine when to use a connection based on natural language instructions.

**Configuration Options:**

* **Communication Settings**: Provide natural language instructions explaining when and how the agent should use this connection. For example, if you’re connecting a manager agent to a specialist agent, you might write: “Delegate to this agent when a customer inquiry requires technical expertise about our enterprise product features.”
* **Approval mode**: Control how the agent executes tasks through this connection:
  * **Auto run**: The agent will automatically execute the task without requiring approval.
  * **Approval required**: The agent will draft the task but wait for your approval before completing it.
  * **Let agent decide**: The agent will complete the task if it has sufficient context and confidence; otherwise, it will ask for human approval or clarification.
* **Max auto runs**: Set a limit on the number of times the agent can automatically execute this connection without human intervention:
  * **No limit**: The agent can use this connection as many times as needed.
  * **Custom limit**: Specify a maximum number of automatic executions as a guardrail.
* **Task behavior**: Choose how tasks flow through this connection:
  * **Create new task**: Each time this connection is used, it creates a separate task instance.
  * **Continue same task**: Maintain continuity by keeping all work within the same task context.

#### Next step

This option creates a mandatory connection where one node always passes control to another node when triggered.

**Configuration Options:**

* **Task behavior**: Choose how tasks flow through this forced connection:
  * **Create new task**: Each handover creates a separate task instance.
  * **Continue same task**: Maintain continuity by keeping all work within the same task context.

### Practical applications

#### Agent-to-Agent communication

When connecting agents, edge settings determine how they collaborate:

* **Manager-Specialist Relationship**: Configure a manager agent to delegate specific types of inquiries to specialist agents using “AI connection” with clear instructions about when to delegate.
* **Sequential Processing**: Use “Next step” to create a workflow where one agent always passes work to another after completing its part, such as having a research agent always pass findings to a content creation agent.

#### Agent-to-Tool communication

Edge settings control how agents interact with tools:

* **Conditional Tool Usage**: With “AI connection”, an agent can determine when a particular tool is appropriate based on the context.
* **Approval Workflows**: For sensitive operations like sending emails or making purchases, configure “Approval required” to ensure human oversight.
* **Automated Sequences**: Use “Next step” to ensure an agent always follows a specific process, such as always logging customer interactions after completing a support conversation.

#### Tool-to-Tool communication

Create sophisticated automation workflows:

* **Data Processing Pipelines**: Connect tools in sequence to transform, analyze, and act on data without requiring agent intervention at each step.
* **Conditional Branching**: Use conditions between tools to create decision trees that process information differently based on specific criteria.

### Best practices

1. **Start Simple**: Begin with basic connections and gradually increase complexity as you understand how your Workforce operates.
2. **Use Clear Instructions**: When using “AI connection”, provide specific, unambiguous instructions about when and how to use connections.
3. **Implement Guardrails**: Use approval requirements and auto-run limits for critical operations to maintain control while allowing automation.
4. **Test Thoroughly**: Verify that your edge settings produce the expected behavior across different scenarios before deploying to production.
5. **Monitor Performance**: Regularly review how your connections are being used and refine edge settings based on actual performance.

### Parallel Tool Calls compatibility <Badge color="orange">Beta</Badge>

When an agent has [Parallel Tool Calls](build__agents__build-your-agent__agent-settings.md) (page `build/agents/build-your-agent/agent-settings/language-model`) enabled, set outbound connections from that agent to use **Create new task** as their Task Behavior to take advantage of parallel execution. Parallel handoffs require independent task instances that can execute simultaneously.

Connections set to “Continue same task” still work — but those handoffs run serially, so you won’t see the speed benefit Parallel Tool Calls is meant to provide. The Workforce Builder highlights these connections in yellow as a reminder.

**How to update a connection for parallel execution:**

1. Select the highlighted (yellow) connection in the Workforce Builder
2. Open **Edge Settings**
3. Set **Task Behavior** to **Create new task**

Repeat for each connection on agents that have Parallel Tool Calls enabled.

<Info>
  Parallel Tool Calls is enabled per agent in [Advanced Settings > Language Model](build__agents__build-your-agent__agent-settings.md) (page `build/agents/build-your-agent/agent-settings/language-model`). It is currently a Beta feature.
</Info>

### Limitations

* **One-way Communication**: Currently, connections in the Workforce Builder are limited to one-way communication. Bidirectional communication between nodes is not supported.
* **Decision Complexity**: While conditions can create branching workflows, complex decision trees may require careful planning and potentially multiple condition nodes.

### Related features

The Edge Settings functionality works closely with other Workforce Builder components:

* **Nodes**: The building blocks (triggers, agents, tools, conditions) that are connected using edges.
* **Configurations**: The specific relationship types between nodes that determine workflow possibilities.
* **Workforce Task View**: Where you can monitor your Workforce’s operations and approve tasks when required.

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Can I change edge settings after creating a connection?">
    Yes, you can modify edge settings at any time by selecting the connection in the Workforce Builder interface.
  </Accordion>

  <Accordion title="How do I know if I should use AI connection or Next step?">
    Use AI connection when you want the agent to decide whether to use the connection based on context and natural language instructions. Use Next step when one node should always pass control to another regardless of context.
  </Accordion>

  <Accordion title="What happens if I set a limit on auto runs and the limit is reached?">
    Once the auto run limit is reached, the agent will request human approval before using that connection again.
  </Accordion>

  <Accordion title="Can I create conditional connections based on specific data values?">
    Yes, you can use condition nodes to create branches in your workflow based on specific criteria or data values.
  </Accordion>
</AccordionGroup>


---

# Page: Introduction to Nodes

Path: `build/workforces/build-an-ai-workforce/introduction-to-nodes`.

## Introduction to Nodes

> Nodes are the fundamental building blocks of a workforce in the platform. They represent all the components you can place on your workspace to create automated workflows.

### What Are Nodes?

Nodes are the technical term for all the elements you can place and connect in the Workforce interface. They come from graph theory, where a graph consists of nodes (points) and edges (connections between points). In Workforce Builder:

* **Nodes** are the individual components you place on the workspace
* **Edges** are the connections between nodes that define how they interact

### Types of Nodes

There are four main types of nodes in Workforce:

#### 1. Triggers

Triggers are the starting points of your workflows. They initiate the execution of your workforce when specific conditions are met.

**Examples of triggers include:**

* Manual triggers (allowing you to message an agent directly)
* Integration triggers (such as when an email is received)
* Scheduled triggers (running at specific times)

Triggers are essential because they determine when and how your workforce begins its work.

#### 2. Agents

Agents are AI-powered entities that can reason, make decisions, and complete tasks. In Workforce, agents are the same as those you’ve configured elsewhere in the platform, but now they can be visually connected to other components.

Agents can:

* Process information from triggers
* Make decisions about next steps
* Use tools to accomplish tasks
* Hand over work to other agents

#### 3. Tools

Tools are specific capabilities that perform defined actions. Unlike in the previous system where tools were tightly coupled to specific agents, in Workforce, tools exist independently and can be connected to multiple agents or other tools.

This modular approach offers several advantages:

* One tool can be used by multiple agents
* Tools can be connected to other tools in sequence
* Tools can be easily substituted (e.g., changing from Notion to Confluence) without having to reconfigure each agent

#### 4. Conditions

Conditions act as decision points in your workflow, similar to IF statements in programming. They evaluate specific criteria and direct the flow based on whether those criteria are met.

**For example:**

* A condition might check if the current day is a weekday
* If true, it might trigger an email tool
* If false, the workflow might end or take a different path

Conditions help create more sophisticated, branching workflows that respond dynamically to different situations.

### Working with Nodes in Workforce

#### Placing Nodes

To add nodes to your workspace:

1. Open your workforce and navigating to “Build”
2. Drag the desired node type (trigger, agent, tool, or condition) from the sidebar onto the workspace
3. Position it where you want it to appear in your workflow

#### Connecting Nodes

To establish relationships between nodes:

1. Click on the source node
2. Drag a connection line to the target node
3. Configure the connection settings (such as communication style)

#### Node Configuration

Each node type has specific settings that can be configured:

* **Triggers**: Configure when and how they activate
* **Agents**: Set communication preferences, approval requirements, and behavior settings
* **Tools**: Define inputs, steps, and outputs
* **Conditions**: Specify the criteria to evaluate and the paths to take based on results

### Best Practices for Working with Nodes

1. **Start Simple**: Begin with a manual trigger connected to a single agent to test functionality
2. **Plan Your Workflow**: Before adding many nodes, sketch out the desired workflow to understand the necessary components
3. **Use Meaningful Names**: Give your nodes descriptive names that indicate their purpose
4. **Test Incrementally**: Add and test nodes in small batches rather than building the entire workflow at once
5. **Consider Approval Settings**: For critical actions, configure nodes to require human approval before proceeding

### Common Node Configurations

#### Trigger → Agent

This is the most basic configuration, where a trigger initiates an agent. For example, a manual trigger allows you to message an agent directly.

#### Agent → Agent

This configuration enables one agent to communicate with another. There are two communication styles:

* **Decide when to use**: The agent determines when to involve another agent based on natural language instructions
* **Next step**: The first agent always passes the task to the second agent

#### Agent → Tool

This allows an agent to use a specific tool to complete a task, such as sending a message in a Slack channel.

#### Tool → Tool

This creates a workflow-like sequence where one tool’s output becomes another tool’s input, without requiring agent intervention between steps.

#### Condition → Tool

This setup evaluates a condition before deciding whether to execute a tool, adding logic to your workflows.

### Limitations and Considerations

* Currently, communication between agents is limited to one-way communication. Bidirectional communication is not yet supported.
* When designing complex workflows, consider the approval settings carefully to maintain appropriate human oversight.
* The more nodes in a workflow, the more important it becomes to monitor performance in the Task View.

### Related Features

For more information on how to use nodes effectively in your workforce, refer to these related features:

* Edge Settings - Configure how nodes connect to each other
* Workforce Task View - Monitor and manage your workforce’s activities
* Approvals and Escalations - Set up human oversight for your automated workflows

By understanding and effectively utilizing nodes, you can create powerful, flexible workflows that automate complex tasks while maintaining appropriate control and oversight.


---

# Page: Notes

Path: `build/workforces/build-an-ai-workforce/notes`.

## Notes

> Clarify purpose, instructions, and collaboration using notes for your Workforce.



You can now add detailed notes to your workforce, making it easier to organize, explain, and share your AI teams with others!

Workforce Notes provides a dedicated space to document important context about your workforce’s purpose, structure, and usage instructions. Whether you’re planning your AI team’s organization, explaining how agents work together, or preparing to share your workforce in the marketplace, Notes ensures everyone understands how to get the most value.

* Document workforce purpose – Clarify the overall goals and use cases for your AI team
* Provide usage instructions – Help new users understand how to effectively use your workforce
* Organize your planning – Keep track of ideas and improvements for your AI team structure
* Enhance marketplace listings – Make your shared workforces more accessible with clear documentation
* Improve team collaboration – Ensure everyone understands how your workforce is designed to function

With Workforce Notes, you can create more valuable, user-friendly AI teams that are easier to share, understand, and implement across your organization or with the wider community.

### How to add Notes to your Workforce

To add notes to your Workforce, follow these steps:

1. Open your Workforce
2. Drag a Note onto your Workforce
3. Enter the text that you want to add to your Note
4. Save your Workforce to see your changes!

