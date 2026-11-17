# The platform docs: `build/workforces/workforce-features/`

8 pages, downloaded on 11/16/2026.


---

# Page: Agent to Agent Configuration

Path: `build/workforces/workforce-features/agent-to-agent-configuration`.

## Agent to Agent Configuration

> Agent to Agent configuration is a powerful capability within Workforce that enables you to create sophisticated multi-agent systems where agents can collaborate, delegate tasks, and work together to solve complex problems.

### How Agent to Agent Configuration Works

When you connect one agent to another in your workforce, you’re establishing a relationship that determines how these agents will interact. This connection creates a pathway for information to flow from one agent to another, allowing for specialized handling of different aspects of a task.

### Setting Up Agent to Agent Connections

To create an Agent to Agent connection in your workforce:

1. Navigate to the “Build” section of your workforce
2. Ensure you have at least two agents added to your workspace
3. Click and drag from the output node of the first agent to the input node of the second agent
4. A connection line will appear, and the edge settings panel will open

### Connection Type Options

When configuring Agent to Agent connections, you have two primary communication style options:

#### AI connection

This option gives the first agent autonomy to determine when it should involve the second agent. The agent uses natural language understanding to follow your instructions about when to delegate.

To configure this option:

1. Select “AI connection” in the edge settings
2. Complete the “When to call this agent” field with clear instructions
3. For example: “Call this agent when you need specialized knowledge about financial regulations” or “Delegate to this agent when the customer asks about technical product specifications”

#### Next step

This option creates a mandatory transition from one agent to another. When the first agent completes its work, it will always pass control to the second agent.

To configure this option:

1. Select “Forced handover” in the edge settings
2. Choose between “Always start a new task” or “Always continue with one task”

### Task Continuity Options

For both communication styles, you can specify how the task should be handled:

* **Create new task**: The second agent begins a fresh task with its own context
* **Continue same task**: The second agent continues within the same task, maintaining context, conversation history, and short-term memory/metadata. Any metadata set by the first agent will be accessible to the second agent and can be read or updated.

### Best Practices for Agent to Agent Configuration

#### When to Use “AI connection”

* For complex workflows where conditional routing is needed
* When you want the first agent to make intelligent decisions about escalation
* In scenarios where not every interaction requires the specialized knowledge of the second agent

#### When to Use “Next step”

* For linear workflows with clear handoff points
* When you want to ensure every interaction passes through a specific sequence of agents
* For quality control processes where a second agent should always review the work

#### Creating Effective Agent Instructions

When using “AI connection”, the quality of your instructions in the “When to call this agent” field is crucial:

* Be specific about the conditions that should trigger delegation
* Include examples of scenarios where the second agent should be involved
* Define clear boundaries of responsibility between agents

### Limitations

* Currently, only one-way communication is supported between agents
* Bidirectional communication (where agents can have back-and-forth conversations) is not yet available

### Example Use Cases

#### Customer Support Triage

Connect a general support agent to specialized agents for technical, billing, or account issues. The first agent handles basic inquiries and delegates complex issues to specialists.

#### Content Creation Pipeline

Connect a content planning agent to a content writing agent, and then to a content editing agent, creating a streamlined production workflow.

#### Research and Analysis

Connect a data collection agent to an analysis agent, where the first agent gathers information and the second performs in-depth analysis of the collected data.

### Troubleshooting

If your Agent to Agent configuration isn’t working as expected:

* Verify that the connection line is properly established between agents
* Check that your “When to call this agent” instructions are clear and specific
* Ensure that both agents have the necessary tools and permissions to complete their tasks
* Review the task history in the Workforce Task View to identify where the workflow might be breaking down

By effectively configuring Agent to Agent connections, you can create sophisticated AI workflows that leverage the specialized capabilities of different agents, resulting in more powerful and flexible automation solutions.


---

# Page: Agent to Tool Configuration

Path: `build/workforces/workforce-features/agent-to-tool-configuration`.

## Agent to Tool Configuration

> Agent to Tool configuration is a powerful feature within Workforce that enables you to establish connections between your AI agents and the tools they need to complete tasks.

### Understanding Agent to Tool Connections

When you connect an agent to a tool in Workforce, you’re creating a pathway for your agent to access specific functionality. This connection allows your agent to:

* Make decisions about when to use particular tools
* Pass relevant information to tools for processing
* Receive and interpret results from tool operations
* Continue workflows based on tool outputs

### Setting Up Agent to Tool Configurations

To configure an Agent to Tool connection in your workforce:

1. Open your workforce in the Workforce interface
2. Locate the agent node you want to connect to a tool
3. Click and drag from the agent’s output connector to the input connector of your desired tool
4. Once connected, click on the connecting line (edge) to access configuration settings

### Configuration Options

#### Connection type

When configuring an Agent to Tool connection, you have two primary communication style options:

##### AI connection

This option gives your agent autonomy to determine when to use the connected tool based on context and need.

* **Communication Settings**: Provide natural language instructions explaining when and how the agent should use this tool. For example: “Use this email tool when you need to send important updates to clients or when follow-up communication is required.”
* **Approval mode**: Configure how the agent makes decisions about tool usage:
  * **Auto run**: The agent will use the tool without requiring approval
  * **Approval required**: The agent will draft the tool request but wait for human approval before execution
  * **Let agent decide**: The agent will determine whether to auto-run or request approval based on confidence level
  * **Max auto runs**: Set limits on how many times the agent can automatically use the tool without intervention

##### Next step

This option creates a mandatory connection where the agent must pass information to the tool as part of the workflow.

* **Task Continuity**: Choose between:
  * **Create new task**: Each tool execution begins a fresh task instance
  * **Continue same task**: The tool execution remains part of the original task flow

### Best Practices for Agent to Tool Configuration

#### 1. Clear Instructions

When using “Let agent decide” mode, provide specific, unambiguous instructions about when the tool should be used. For example:

> Use this data analysis tool when:
>
> * The user requests statistical insights
> * Raw data needs to be transformed into visualizations
> * Patterns or trends need to be identified in datasets

#### 2. Appropriate Permission Levels

Match permission settings to the sensitivity and impact of the tool:

* Use “Approval required” for tools that:
  * Make external communications
  * Modify important data
  * Incur costs or use credits
  * Make decisions with business impact
* Use “Auto run” for tools that:
  * Perform internal data retrieval
  * Execute low-risk, repetitive tasks
  * Enhance the agent’s knowledge without external effects

#### 3. Workflow Optimization

Consider how tool connections affect the overall workflow:

* **Sequential Processing**: Connect tools in a logical sequence when tasks need to follow a specific order
* **Conditional Branching**: Use agent decision points before tools when different scenarios require different tool selections
* **Feedback Loops**: Create connections from tools back to agents when results need evaluation before proceeding

### Troubleshooting Agent to Tool Connections

#### Common Issues and Solutions

1. **Agent not using connected tool**
   * Check that the connection line is properly established
   * Review the communication instructions for clarity
   * Ensure the agent has the necessary context to recognize when to use the tool
2. **Tool execution failing**
   * Verify the tool’s configuration and required inputs
   * Check that the agent is passing data in the expected format
   * Review tool logs for specific error messages
3. **Excessive tool usage**
   * Set appropriate “Max auto runs” limits
   * Make instructions more specific about when to use the tool
   * Consider changing to “Approval required” mode temporarily

### Advanced Agent to Tool Configurations

#### Chaining Multiple Tools

You can create sophisticated workflows by connecting an agent to multiple tools in sequence:

1. Connect your agent to the first tool
2. Connect the output of the first tool to a second agent or directly to another tool
3. Configure each connection with appropriate settings

This approach allows for complex multi-step processes where each tool performs a specific function in the overall workflow.

#### Dynamic Tool Selection

When an agent needs to choose between multiple tools based on context:

1. Connect the agent to each potential tool
2. Use “Let agent decide” mode for all connections
3. Provide clear, distinctive instructions for when to use each tool

The agent will evaluate the situation and select the appropriate tool based on your instructions.

### Related Features

* [Trigger to Agent Configuration](build__workforces__workforce-features.md) (page `build/workforces/workforce-features/trigger-to-agent-configuration`): Learn how to configure the initial triggers that activate your agents
* [Tool to Tool Configuration](build__workforces__workforce-features.md) (page `build/workforces/workforce-features/tool-to-tool-configuration`): Discover how to connect tools directly to other tools for automated workflows
* [Condition to Tool Configuration](build__workforces__workforce-features.md) (page `build/workforces/workforce-features/condition-to-tool-configuration`): Explore how to add conditional logic to your tool executions

### Conclusion

Agent to Tool configuration is a fundamental aspect of building effective AI workforces. By thoughtfully designing these connections, you can create intelligent workflows where agents leverage tools appropriately to accomplish complex tasks. Whether you prefer giving your agents autonomy with “Let agent decide” or creating structured processes with “Forced handover,” the configuration options in Workforce Builder provide the flexibility to match your specific business needs.


---

# Page: Approvals and Escalations

Path: `build/workforces/workforce-features/approvals-and-escalations`.

## Approvals and Escalations

> Approvals and escalations are essential components of Workforce that ensure your AI agents operate with appropriate oversight and can effectively handle situations requiring human intervention.

### Overview

The approvals and escalations system in Workforce allows you to:

* Configure when and how agents should seek approval before taking actions
* Establish clear escalation paths when agents encounter situations beyond their scope
* Monitor approval requests through the Workforce Task View
* Set up automated alerts for escalations requiring human attention

By implementing proper approval and escalation processes, you can maintain quality control while allowing your AI workforce to operate with appropriate autonomy.

### Setting Up Approval Modes

When connecting agents to tools or other agents in your workforce, you can configure different approval modes that determine how actions are authorized:

#### Auto Run

In this mode, the agent will execute actions automatically without requiring approval. This is ideal for:

* Low-risk, routine tasks
* Well-defined processes with predictable outcomes
* Situations where speed is prioritized over verification

To configure auto run:

1. Select the edge connecting an agent to a tool or another agent
2. In the Edge Settings panel, select “Auto run” under Behavior Settings
3. Optionally, set “Max auto runs” to limit the number of automatic executions

#### Approval Required

This mode forces the agent to seek explicit approval before executing an action. Use this for:

* High-stakes decisions
* Actions that commit resources or make external communications
* New workflows that need monitoring before being fully automated

To set up approval required:

1. Select the edge connecting an agent to a tool or another agent

2. In the Edge Settings panel, select “Approval required” under Behavior Settings

3. The agent will now draft its intended action and wait for human approval before proceeding

#### Let Agent Decide

This balanced approach allows the agent to determine whether approval is needed based on its confidence and context. The agent will:

* Complete tasks autonomously when it has sufficient context and confidence
* Request approval when facing uncertainty or high-risk situations
* Escalate to humans when it needs clarification or additional information

To implement this mode:

1. Select the edge connecting an agent to a tool or another agent
2. In the Edge Settings panel, select “Let agent decide” under Behavior Settings
3. Complete the “When to call this agent” box with natural language instructions explaining the decision logic

### Monitoring Approvals in Workforce Task View

The Workforce Task View serves as your central dashboard for monitoring and managing approval requests:

1. Navigate to the “Task” view to see your workforce
2. Review pending approval requests from your agents
3. Examine the agent’s proposed action and supporting reasoning
4. Choose to approve, reject, or provide additional guidance
5. Track the history of approvals and their outcomes

This interface provides complete visibility into your approval workflow, allowing you to maintain oversight while empowering your AI workforce.

### Implementing Escalation Strategies

Escalations occur when an agent encounters a situation it cannot handle independently. Effective escalation strategies ensure these situations are properly addressed:

#### Agent-Initiated Escalations

Agents can be configured to recognize their limitations and escalate appropriately:

1. Configure agent settings under Agent Settings > Abilities

2. Define clear criteria for when an agent should escalate issues

3. Specify the escalation path (to specific human roles or other agents)

4. Provide templates for how the agent should format escalation requests

#### Escalation Tools

You can connect agents to specific tools designed for escalation:

1. Create dedicated escalation tools (e.g., Slack notifications, email alerts)
2. Connect these tools to your agents in the Workforce Builder
3. Configure the tools to route escalations to the appropriate team members
4. Include relevant context and information in the escalation

#### Escalation Monitoring

Track and manage escalations through:

1. The Workforce Task View, which displays all active escalations
2. Notification systems that alert relevant team members
3. Escalation logs that maintain a history of issues and resolutions

### Best Practices for Approvals and Escalations

To maximize the effectiveness of your approval and escalation processes:

#### For Approvals:

* Start with more restrictive approval requirements and gradually relax them as confidence in the agent grows
* Use “Max auto runs” settings as guardrails when transitioning to more autonomous operation
* Provide clear criteria for what constitutes an approvable action
* Review approval patterns regularly to identify opportunities for process improvement

#### For Escalations:

* Define clear escalation thresholds based on risk, complexity, and agent capabilities
* Create detailed documentation for human responders to handle escalated issues
* Implement a feedback loop where escalation resolutions inform agent improvements
* Establish service level agreements (SLAs) for responding to different types of escalations

### Related Features

* Edge Settings - Configure the connections between nodes in your workforce, including approval settings

* Workforce Task View - Monitor and manage your workforce’s activities, including approvals and escalations

* Agent Abilities - Configure how agents handle situations requiring escalation

### Frequently asked questions (FAQs)

**Q: Can I set different approval requirements for different tools?**\
A: Yes, approval settings are configured on a per-edge basis, allowing you to require approval for sensitive tools while allowing automatic execution for routine ones.

**Q: What happens if an approval request isn’t addressed?**\
A: The task will remain in a pending state until approved or rejected. You can configure timeout actions or notifications for approval requests that remain unaddressed for a specified period.

**Q: Can escalations be routed to specific team members?**\
A: Yes, you can configure escalation tools to direct issues to specific individuals or teams based on the nature of the escalation, time of day, or other factors.

**Q: How do I balance autonomy with oversight?**\
A: Start with higher oversight (approval required) for new workflows, then gradually transition to “let agent decide” and eventually “auto run” as you build confidence in the agent’s performance for specific tasks.


---

# Page: Communication

Path: `build/workforces/workforce-features/communication`.

## Communication

> Communication is a fundamental aspect of Workforce that defines how agents interact with each other within your AI workforce.

### One-way Communication

Currently, Workforce supports one-way communication between agents. This means that when one agent communicates with another, the information flows in a single direction. Bidirectional communication is not yet available in the current version.

#### How One-way Communication Works

When you connect two agents in your workforce, the communication follows a unidirectional path:

* The source agent sends information, instructions, or requests to the target agent
* The target agent receives this information and acts upon it
* The target agent cannot automatically send information back to the source agent through the same connection

This one-way communication model creates clear workflows and responsibility chains within your workforce, making it easier to track how information and tasks flow through your system.

### Setting Up Communication Between Agents

When connecting agents in your workforce, you have two connection type options that determine how agents interact with each other:

#### AI connection

This option gives the agent autonomy to determine when to communicate with another agent based on natural language instructions.

**Configuration Steps:**

1. Connect two agents in your workforce
2. Select “AI connection” as the connection type
3. Complete the “When to call this agent” field with natural language instructions
4. Configure behavior settings:

**Communication Settings:**
In the “When to call this agent” field, provide clear instructions about when the source agent should delegate to the target agent. For example:

> Call this agent when you need to analyze customer sentiment data or when you need to summarize large volumes of customer feedback. This agent specializes in data analysis and can provide insights that will help with decision-making.

**Behavior Settings:**
Choose one of the following approval modes:

* **Auto run**: The target agent will complete the task without requiring approval
* **Approval required**: The target agent will draft the task but ask for human approval before completing it
* **Let agent decide**: The target agent will complete the task if it has sufficient context and confidence; otherwise, it will ask for human approval or clarification

**Additional Settings:**

* **Max auto runs**: Set a limit on the number of times the agent can auto-run (no limit or a specific number)
* **Task continuation**: Choose between ‘always start a new task’ or ‘always continue with one task’

#### Next step

This option creates a mandatory connection where the source agent must pass the task to the target agent.

**Configuration Steps:**

1. Connect two agents in your workforce
2. Select “Next step” as the connection type
3. Configure task continuation:
   * Choose between ‘always start a new task’ or ‘always continue with one task’

With forced handover, the source agent will always transfer control to the target agent when the connection is triggered, regardless of the context or the agent’s assessment of the situation.

### Best Practices for Agent Communication

To maximize the effectiveness of agent communication in your workforce:

1. **Define Clear Responsibilities**: Ensure each agent has well-defined roles and responsibilities to avoid confusion about which agent should handle specific tasks.
2. **Use Descriptive Instructions**: When using “AI connection”, provide detailed instructions about when and why the source agent should communicate with the target agent.
3. **Create Logical Workflows**: Design your communication paths to follow natural workflows, where information and tasks flow in a logical sequence from one agent to the next.
4. **Balance Autonomy and Control**: Use “AI connection” for situations requiring judgment and “Forced handover” for mandatory steps in a process.
5. **Monitor Communication Patterns**: Regularly review how agents are communicating to identify any bottlenecks or inefficiencies in your workforce.
6. **Implement Appropriate Approval Mechanisms**: Use approval settings to maintain quality control while allowing agents to work autonomously when appropriate.

### Related Features

Edge Settings - Configure the connections between nodes in your workforce, including communication styles and behavior settings.

Configurations - Learn about the different types of connections you can create between nodes in your workforce.

Workforce Task View - Monitor your workforce’s activities, including communication between agents and approval requests.

### Frequently asked questions (FAQs)

**Q: Can agents communicate bidirectionally?**\
A: Currently, Workforce Builder only supports one-way communication between agents. Bidirectional communication is planned for future updates.

**Q: How do I know if an agent has communicated with another agent?**\
A: You can monitor agent communication in the Workforce Task View, which shows the timeline of activities and interactions between agents.

**Q: Can I set conditions for when an agent should communicate with another agent?**\
A: Yes, when using the “AI connection” communication style, you can provide natural language instructions in the “When to call this agent” field to guide the source agent’s decision-making.

**Q: What happens if an agent tries to communicate with another agent but lacks necessary information?**\
A: Depending on your behavior settings, the agent may ask for human approval or clarification before proceeding with the communication.

**Q: Can I create complex communication chains involving multiple agents?**\
A: Yes, you can connect multiple agents in sequence or in parallel to create sophisticated workflows where information passes through several agents.


---

# Page: Condition to Tool Configuration

Path: `build/workforces/workforce-features/condition-to-tool-configuration`.

## Condition to Tool Configuration

> Condition to Tool connections in Workforce allow you to create intelligent workflows that execute tools only when specific conditions are met.

### How Condition to Tool Works

A Condition to Tool connection acts as an IF statement in your workforce flow. When a condition evaluates to true, the connected tool executes; when false, the tool is skipped. This creates branching logic in your workflows, making your AI workforce more adaptable and responsive to different scenarios.

### Setting Up a Condition to Tool Connection

To create a Condition to Tool connection in your workforce:

1. Navigate to Workforce and “Build” in the main navigation
2. Add a condition node to your workspace by dragging it from the node palette
3. Configure your condition (see below for LLM-based vs Rule-based options)
4. Add a tool node to your workspace
5. Connect the condition node to the tool node by clicking and dragging from the condition’s output connector to the tool’s input connector

### Choosing Between LLM-based and Rule-based Conditions

Workforce offers two types of conditions, each suited for different scenarios:

#### LLM-based Conditions

Use natural language to describe complex logic. The AI interprets your description and evaluates whether the condition is met.

**Best for:**

* Complex logic that’s easier to express in natural language
* Evaluating unstructured data like text content
* Time-based conditions
* Scenarios requiring interpretation

**Example:** “Go down this path if the email contains an urgent request”

#### Rule-based Conditions

Use structured filters to compare specific values with deterministic logic.

**Best for:**

* Precise comparisons of tool outputs
* Numeric threshold checks
* Validating specific field values
* Performance-critical paths

**Example:** Check if `Validate Data / output / status` equals “SUCCESS”

### LLM-based Condition Examples

You can create various types of conditions using simple, natural language instructions:

#### Time-Based Conditions

* “Go down this path if today is Monday or Tuesday”
* “Follow this route if the current time is between 9 AM and 5 PM”
* “Use this tool if it’s a weekday”

#### Data-Based Conditions

* “Go down this path if the customer priority is high”
* “Follow this route if the email contains the word ‘urgent’”
* “Use this tool if the sentiment score is greater than 0.7”

#### Tool Output Conditions

* “Go down this path if the previous tool completed successfully”
* “Follow this route if the data validation passed”
* “Use this tool if we received a response from the API”

### Rule-based Condition Examples

Rule-based conditions use structured filters for precise, deterministic comparisons:

#### Validating Tool Output Status

**Scenario:** Only proceed if a validation tool succeeded

**Configuration:**

* Condition type: Rule-based
* Filter:
  * Target: `Validate Input / output / status`
  * Operator: equals
  * Source: “SUCCESS”

This ensures the next tool only runs when validation explicitly returns “SUCCESS”.

#### Numeric Threshold Checks

**Scenario:** Route high-value transactions to a special processing tool

**Configuration:**

* Condition type: Rule-based
* Filter:
  * Target: `Calculate Amount / output / total`
  * Operator: >
  * Source: 10000

The tool only executes when the transaction amount exceeds $10,000.

#### Multiple Criteria (AND Logic)

**Scenario:** Process orders that are both complete and paid

**Configuration:**

* Condition type: Rule-based
* Match mode: Match All
* Filter 1:
  * Target: `Check Status / output / order_status`
  * Operator: equals
  * Source: “complete”
* Filter 2:
  * Target: `Check Payment / output / payment_status`
  * Operator: equals
  * Source: “paid”

Both conditions must be true for the tool to execute.

#### Multiple Criteria (OR Logic)

**Scenario:** Flag items that need attention (either urgent or high-value)

**Configuration:**

* Condition type: Rule-based
* Match mode: Match Any
* Filter 1:
  * Target: `Get Priority / output / priority`
  * Operator: equals
  * Source: “urgent”
* Filter 2:
  * Target: `Calculate Value / output / amount`
  * Operator: >=
  * Source: 5000

The tool executes if either condition is true.

#### Field Existence Check

**Scenario:** Only process records that have an optional field populated

**Configuration:**

* Condition type: Rule-based
* Filter:
  * Target: `Get Data / output / optional_field`
  * Operator: exists

This checks whether the field has any value before proceeding.

#### String Pattern Matching

**Scenario:** Route customer IDs with a specific prefix to a specialized tool

**Configuration:**

* Condition type: Rule-based
* Filter:
  * Target: `Get Customer / output / customer_id`
  * Operator: starts with
  * Source: “PREMIUM-”

Only customers with IDs starting with “PREMIUM-” trigger this tool.

### When to Use Each Condition Type

#### Use LLM-based Conditions When:

* You need to evaluate natural language or unstructured text
* The logic is complex and easier to express in plain English
* You’re working with time-based or contextual conditions
* Exact matching isn’t critical
* You want the AI to interpret intent

**Example use case:** Routing customer emails based on content sentiment or urgency

#### Use Rule-based Conditions When:

* You need precise, deterministic comparisons
* You’re validating tool outputs against known values
* You’re working with numeric thresholds
* Performance and reliability are critical
* You want to avoid AI interpretation overhead
* You need to check specific field values or existence

**Example use case:** Validating API responses, checking status codes, or enforcing business rules with specific thresholds

### Best Practices for Condition to Tool Connections

1. **Choose the right condition type**: Use LLM-based for complex interpretation, rule-based for precise comparisons
2. **Keep conditions focused**: Each condition should evaluate a single concept for clarity
3. **Be specific**: Provide clear criteria for when the condition should be true
4. **Test thoroughly**: Verify your conditions work as expected with different inputs
5. **Consider edge cases**: Think about unusual scenarios that might affect your condition
6. **Structure tool outputs appropriately**: For rule-based conditions, ensure tools output flat values rather than nested objects

### Advanced Condition to Tool Patterns

#### Chaining Multiple Conditions

You can create sophisticated decision trees by chaining multiple conditions together:

1. Create several condition nodes that evaluate different aspects of your data
2. Connect each condition to the appropriate tool
3. Tools will only execute when their specific conditions are met

#### Parallel Condition Evaluation

For more complex scenarios, you can have multiple conditions evaluating the same data simultaneously:

1. Create several condition nodes that check different aspects of the same data
2. Connect each condition to different tools
3. Multiple tools may execute in parallel depending on which conditions are met

#### Combining Condition Types

You can use both LLM-based and rule-based conditions in the same workflow:

1. Use rule-based conditions for precise validation checks
2. Use LLM-based conditions for complex interpretation
3. Connect them to different tools based on your workflow needs

### Practical Use Cases

#### Email Routing Based on Content

**LLM-based approach:** “Go down this path if the email contains a support request” or “Follow this route if the message mentions billing issues.”

**Rule-based approach:** Check if `Classify Email / output / category` equals “support” or “billing”

#### Time-Sensitive Workflows

**LLM-based approach:** “Use this tool only during business hours” or “Go down this path if it’s the first day of the month.”

**Rule-based approach:** Check if `Get Current Hour / output / hour` is {'>='} 9 and {'<='} 17

#### Data Quality Control

**LLM-based approach:** “Follow this route if all required fields are filled” or “Use this tool if the data passes validation.”

**Rule-based approach:** Check if `Validate Data / output / status` equals “valid” and `Check Required Fields / output / all_present` equals true

#### Approval Workflows

**LLM-based approach:** “Go down this path if the request has been approved” or “Use this tool if the manager has given permission.”

**Rule-based approach:** Check if `Check Approval / output / approved` equals true

### Troubleshooting Condition to Tool Connections

If your condition to tool connections aren’t working as expected:

#### For LLM-based Conditions:

1. **Review your condition language**: Make sure your natural language condition is clear and specific
2. **Test with simpler conditions**: Try a very basic condition to verify the connection works
3. **Refine your language**: If needed, make your condition more explicit or detailed

#### For Rule-based Conditions:

1. **Check the target path**: Verify it points to the correct field from the upstream node
2. **Verify the operator**: Ensure you’re using the right comparison type (e.g., numeric operators for numbers)
3. **Check the source value**: Make sure it matches the expected data type and format
4. **Review match mode**: Confirm whether you need “Match All” (AND) or “Match Any” (OR) logic
5. **Test with simple filters**: Start with a single filter to isolate issues

#### General Troubleshooting:

1. **Check the flow**: Confirm the connections between nodes are correctly established
2. **Monitor execution**: Watch how the workflow behaves when the condition is evaluated
3. **Review upstream outputs**: Verify that the data you’re evaluating actually exists and has the expected format

### Related Features

* [Add Conditions](build__workforces__build-an-ai-workforce.md) (page `build/workforces/build-an-ai-workforce/add-conditions`): Complete guide to configuring both LLM-based and rule-based conditions
* [Agent to Tool connections](build__workforces__workforce-features.md) (page `build/workforces/workforce-features/agent-to-tool-configuration`): Direct connections from agents to tools without conditional logic
* [Tool to Tool connections](build__workforces__workforce-features.md) (page `build/workforces/workforce-features/tool-to-tool-configuration`): Sequential execution of tools in a workflow
* [Edge Settings](build__workforces__build-an-ai-workforce.md) (page `build/workforces/build-an-ai-workforce/edge-settings`): Configure how nodes connect in your workforce

By using Condition to Tool connections with both LLM-based and rule-based conditions in the Workforce Builder, you can create intelligent, adaptive workflows that respond dynamically to changing circumstances, making your AI workforce more efficient and effective.


---

# Page: Tool to Tool Configuration

Path: `build/workforces/workforce-features/tool-to-tool-configuration`.

## Tool to Tool Configuration

> Tool to Tool configuration is a powerful feature in Workforce that allows you to connect tools directly to other tools, creating automated workflows without requiring agent intervention.

### How Tool to Tool Connections Work

When you connect tools directly to each other in Workforce, you’re establishing a direct pathway for data to flow from one tool to the next. This creates a streamlined process where:

1. The first tool completes its operation
2. Its output is automatically passed to the connected tool
3. The second tool processes this data without requiring human or agent approval (unless configured otherwise)

This approach is particularly valuable for creating multi-step automations that handle routine processes efficiently.

### Setting Up Tool to Tool Connections

#### Prerequisites

* At least two tools added to your Workforce Builder canvas
* Understanding of the input/output requirements for each tool

#### Step-by-Step Configuration

1. **Add Tools to Your Workspace**: Drag the tools you want to connect from your project onto the Workforce Builder canvas.

2. **Create the Connection**:
   * Click on the first tool (source)
   * Look for the connection point (usually appears as a dot or node on the edge of the tool)
   * Click and drag to create a line to the second tool (destination)
   * Release to establish the connection

3. **Configure Connection Settings**:
   * After creating the connection, click on the connecting line to access the edge settings
   * Choose between “Auto run” or “Approval required” modes:
     * **Auto run**: The second tool will automatically execute when it receives data from the first tool

     * **Approval required**: The system will wait for human approval before the second tool processes the data

4. **Map Data Fields** (if applicable):
   * Some tools may require you to specify how data from the first tool maps to the input fields of the second tool
   * Use the mapping interface to connect output fields from the first tool to input fields of the second tool

5. **Save Your Configuration**: Click “Save changes” to apply your Tool to Tool configuration

### Use Cases for Tool to Tool Configuration

#### Email Processing Workflow

Connect an “Email Receiver” tool to an “Email Classifier” tool, then to either a “Customer Support” tool or “Sales Lead” tool based on classification results.

#### Data Enrichment Chain

Link a “Data Extraction” tool to a “Data Enrichment” tool, followed by a “Database Update” tool to automatically enhance and store information.

#### Document Processing Pipeline

Connect a “Document Analyzer” tool to a “Summary Generator” tool, then to a “Notification” tool to alert team members about important documents.

#### Conditional Workflows

When combined with condition nodes, Tool to Tool connections can create branching workflows that take different paths based on specific criteria.

### Best Practices

1. **Start Simple**: Begin with straightforward two-tool connections before building more complex chains.

2. **Test Thoroughly**: Always test your Tool to Tool configurations with sample data before deploying them in production.

3. **Consider Approval Points**: For critical operations, insert approval requirements at key points in the workflow.

4. **Document Your Flows**: Create documentation for your Tool to Tool configurations to help team members understand the automated processes.

5. **Monitor Performance**: Regularly check the execution logs to ensure your Tool to Tool connections are functioning as expected.

6. **Error Handling**: Plan for potential failures by considering what should happen if a tool in the chain encounters an error.

### Limitations and Considerations

* **Data Compatibility**: Ensure that the output format of the first tool is compatible with the input requirements of the second tool.

* **Execution Time**: Be aware that complex Tool to Tool chains may take longer to execute, especially if tools perform resource-intensive operations.

* **Debugging Challenges**: Troubleshooting issues in Tool to Tool connections can be more complex than single-tool setups.

* **Versioning Impact**: Updating a tool in a chain may affect downstream tools if the output format changes.

### Related Features

Tool to Tool configuration works seamlessly with other Workforce Builder features:

* **Conditions**: Add conditional logic to determine whether a tool connection should be followed
* **Agent to Tool**: Combine agent decision-making with automated tool chains
* **Triggers**: Initiate Tool to Tool workflows based on external events

### Conclusion

Tool to Tool configuration in the Workforce Builder represents a significant advancement in workflow automation capabilities. By connecting tools directly to each other, you can create sophisticated process chains that handle routine tasks efficiently while maintaining the flexibility to incorporate human oversight where needed. This feature empowers you to build more autonomous, intelligent workflows that save time and reduce the need for manual intervention.


---

# Page: Trigger to Agent Configuration

Path: `build/workforces/workforce-features/trigger-to-agent-configuration`.

## Trigger to Agent Configuration

> Connecting triggers to agents is a fundamental aspect of building effective AI workforces in the platform.

### Overview

Trigger to Agent configurations define the relationship between a trigger event and the agent that responds to it. This connection is the starting point of any workflow in Workforce, allowing you to specify exactly how your agents are activated and what information they receive.

### Types of Triggers

When connecting triggers to agents, you can utilize several trigger types:

* **Manual Triggers**: Allow you to manually initiate an agent through the Task View interface
* **Recurring Schedule Triggers**: Activate agents at predetermined times or intervals using simple schedules (daily, weekly, monthly) or advanced cron expressions for precise timing control
* **Integration Triggers**: Connect external services (like email, Slack, or CRM systems) to automatically activate agents when specific events occur

<Note>
  For detailed information on configuring recurring schedules and cron expressions, see [Add Triggers](build__workforces__build-an-ai-workforce.md) (page `build/workforces/build-an-ai-workforce/add-triggers`).
</Note>

### Setting Up a Trigger to Agent Connection

#### Basic Setup

1. Open your workforce in the Build section
2. Locate the trigger node you want to connect (or add a new one by dragging it from the sidebar)
3. Click and drag from the trigger node’s output point to connect it to your desired agent
4. Configure the connection settings in the panel that appears

#### Configuration Options

When establishing a Trigger to Agent connection, you’ll need to configure these important settings:

##### Communication Settings

In the connection settings panel, you can specify:

* **Message Format**: Define how the trigger information is formatted before being sent to the agent
* **Context Passing**: Choose what contextual information from the trigger should be included
* **Variable Mapping**: Map specific trigger data fields to variables the agent can use

##### Behavior Settings

Control how the agent responds to the trigger:

* **Auto Run**: Enable the agent to automatically process the trigger without human approval
* **Approval Required**: Require human approval before the agent acts on the trigger
* **Let Agent Decide**: Allow the agent to determine whether it needs approval based on confidence level

##### Task Management

Configure how tasks are created and managed:

* **Always Start New Task**: Each trigger creates a new, separate task
* **Continue with One Task**: Multiple triggers can feed into a single ongoing task
* **Max Auto Runs**: Set limits on how many times an agent can auto-run to prevent infinite loops

### Best Practices

#### Effective Trigger to Agent Design

* **Clear Trigger Definition**: Ensure your triggers have well-defined conditions to avoid unintended activations
* **Appropriate Agent Selection**: Match triggers with agents that have the right skills and tools for the triggered task
* **Contextual Information**: Configure triggers to provide sufficient context for the agent to understand the task
* **Error Handling**: Include fallback paths for when triggers fail or agents cannot process the request
* **Schedule Timing**: For recurring schedules, ensure your agent can complete its work before the next scheduled run to avoid overlap

#### Common Patterns

* **Filtering Triggers**: Use conditions before triggers to filter out unnecessary activations
* **Multi-Agent Dispatch**: Connect a trigger to a dispatcher agent that routes tasks to specialized agents
* **Escalation Paths**: Configure triggers to activate different agents based on priority or complexity

### Examples

#### Example 1: Email Response Workflow

Here’s how a typical email response workflow might be configured:

1. Create an email integration trigger that activates when new emails arrive
2. Connect this trigger to a triage agent
3. Configure the connection to:
   * Pass the email subject, body, and sender information
   * Allow auto-run for initial triage
   * Create a new task for each email
4. The triage agent can then analyze the email and route it to the appropriate specialized agent

#### Example 2: Daily Report Generation

Here’s how a recurring schedule workflow might be configured:

1. Create a recurring schedule trigger set to run every weekday at 9:00 AM (using cron: `0 9 * * MON-FRI *`)
2. Connect this trigger to a reporting agent
3. Configure the connection to:
   * Always start a new task for each scheduled run
   * Enable auto-run since this is a routine task
   * Pass the current date as context to the agent
4. The reporting agent can then gather data from the previous day and generate a summary report

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Why is my trigger not activating my agent?">
    Verify the trigger conditions and integration settings. For recurring schedules, check that the cron expression or schedule configuration is correct. Ensure the trigger is properly connected to the agent node.
  </Accordion>

  <Accordion title="Why is my agent not receiving context from the trigger?">
    Check the connection configuration to ensure proper data mapping. Review the Communication Settings in the connection panel and verify that variable mapping is set up correctly.
  </Accordion>

  <Accordion title="Why am I getting multiple unintended activations?">
    Review trigger conditions and consider adding filters. For recurring schedules, verify you don’t have overlapping schedules. Check the Task Management settings to ensure “Always Start New Task” is configured appropriately.
  </Accordion>

  <Accordion title="How do I test my trigger configuration before enabling auto-run?">
    Use the Task View to monitor trigger activations and agent responses. Test triggers manually first, check connection logs to identify any data transmission issues, and verify the configuration with a few test runs before enabling auto-run for production use.
  </Accordion>

  <Accordion title="Can a recurring schedule trigger activate multiple agents at once?">
    Yes, you can connect a single recurring schedule trigger to multiple agents. Each agent will receive the trigger activation and can be configured independently with different connection settings.
  </Accordion>
</AccordionGroup>

### Related Features

The Trigger to Agent configuration works seamlessly with other Workforce Builder components:

* [Agent to Agent Configuration](build__workforces__workforce-features.md) (page `build/workforces/workforce-features/agent-to-agent-configuration`): Connect agents to create multi-step workflows
* [Agent to Tool Configuration](build__workforces__workforce-features.md) (page `build/workforces/workforce-features/agent-to-tool-configuration`): Enable agents to use tools to complete tasks
* [Workforce Task View](build__workforces__workforce-features.md) (page `build/workforces/workforce-features/workforce-task-view`): Monitor and manage tasks initiated by triggers


---

# Page: Workforce Task View

Path: `build/workforces/workforce-features/workforce-task-view`.

## Workforce Task View

> The Workforce Task View provides a centralized interface for monitoring, managing, and interacting with your AI workforce.

### Accessing the Workforce Task View

To access the Workforce Task View:

1. Navigate to the “Task” section in your selected Workforce
2. The Task View interface will display all current and recent activities for your selected workforce

### Key Features

#### Real-Time Task Monitoring

Track the status and progress of all tasks being handled by your workforce in real time. The Task View provides a comprehensive overview of:

* Active tasks currently being processed
* Completed tasks with timestamps and outcomes
* Tasks awaiting approval or human intervention
* Failed tasks that require attention

#### Manual Trigger Activation

Initiate workflows directly from the Task View interface:

1. Locate the manual trigger you want to activate
2. Enter your message or prompt to start the workflow
3. Submit the trigger to activate the associated agent or process
4. Monitor the task’s progress as it moves through your workforce

This functionality allows you to test workflows, handle one-off requests, or manually start scheduled processes when needed.

#### Approval Management

The Task View serves as your central hub for managing approvals within your workforce:

1. Receive notifications when agents require approval to proceed
2. Review the agent’s proposed actions or responses
3. Approve, reject, or modify the agent’s work
4. Provide additional context or instructions if needed

This approval system ensures quality control while allowing your workforce to operate autonomously when appropriate.

#### Conversation History

Access complete conversation histories and task logs for comprehensive tracking:

* View the full thread of interactions between agents and users
* Examine decision points and tool usage throughout a task
* Reference previous tasks for context or troubleshooting
* Export conversation logs for reporting or analysis

<Note>
  [Visual Data Masking](build__agents__build-your-agent__agent-settings.md) (page `build/agents/build-your-agent/agent-settings/visual-data-masking`) can be enabled to protect sensitive information like email addresses, phone numbers, and credit card numbers in conversation histories when reviewing tasks with your team or during screen sharing.
</Note>

#### Task Timeline

The Task View provides a chronological timeline of all activities, giving you visibility into:

* When tasks were initiated
* How long each step in the process took
* Which agents or tools were involved at each stage
* When human intervention occurred
* Final resolution and completion times

### Working with the Task View

#### Monitoring Multiple Tasks

The Task View allows you to monitor multiple concurrent tasks across your workforce:

1. Tasks are organized chronologically with the most recent at the top
2. Use filters to focus on specific task types, agents, or statuses
3. Expand individual tasks to see detailed information
4. Toggle between different workforces if you have multiple configured

#### Handling Escalations

When agents escalate issues requiring human attention:

1. You’ll receive a notification in the Task View
2. The escalated task will be highlighted for visibility
3. Review the agent’s reason for escalation and the current task state
4. Provide guidance, additional information, or take over the task as needed
5. Once resolved, the agent can continue processing or the task can be marked complete

#### Approval Workflows

For tasks configured to require human approval:

1. The agent will complete its work and submit it for review
2. The task will appear in your approval queue within the Task View
3. Review the agent’s work, including any generated content or proposed actions
4. Approve the work to allow the agent to proceed or continue to the next step
5. Reject or request modifications if changes are needed
6. Provide feedback to help improve future performance

### Best Practices

#### Organizing Your Task View

* Use clear naming conventions for your triggers and agents to easily identify tasks
* Configure appropriate approval thresholds to balance autonomy and oversight
* Set up notification preferences to stay informed of critical tasks
* Archive completed tasks regularly to maintain a clean interface

#### Effective Monitoring

* Check the Task View regularly for items requiring attention
* Use filters to focus on high-priority tasks or specific workflows
* Review completed tasks periodically to identify optimization opportunities
* Monitor task completion times to identify bottlenecks or inefficiencies

#### Troubleshooting

If you encounter issues with tasks in the Task View:

1. Check the task’s history to identify where the process stalled
2. Review any error messages or agent notes
3. Verify that all connected tools and resources are functioning properly
4. Test the workflow with a manual trigger to reproduce the issue
5. Adjust agent settings or tool configurations as needed

### Related Features

* Edge Settings: Configure how agents communicate and interact with each other in your workforce
* Approvals and Escalations: Set up detailed approval workflows and escalation paths for your agents
* Workforce Builder: Design and configure your multi-agent workforce with visual tools
* [Visual Data Masking](build__agents__build-your-agent__agent-settings.md) (page `build/agents/build-your-agent/agent-settings/visual-data-masking`): Protect sensitive information in conversation histories

