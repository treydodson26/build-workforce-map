# The platform docs: `build/agents/give-your-agent-tasks/`

5 pages, downloaded on 11/16/2026.


---

# Page: Bulk scheduling

Path: `build/agents/give-your-agent-tasks/bulk-schedule`.

## Bulk scheduling

> Learn how to schedule batch tasks to run automatically for your agent

<Warning>
  **Team plan or above required**: Bulk scheduling is only available to users on the Team plan or above.
</Warning>

Bulk Scheduling allows you to automate large-scale task execution for your agent by processing data from Excel files or knowledge tables. Instead of manually creating individual tasks, you can import a spreadsheet or knowledge table where each row becomes a separate task that your agent will process automatically.

This feature is ideal for scenarios where you need to:

* Process many similar tasks automatically
* Personalize agent interactions using data from spreadsheets
* Schedule tasks to run during specific working hours
* Distribute task execution over time to manage workload

With bulk scheduling, you can set up message templates that dynamically pull data from your source files, configure working hours to align with your team’s schedule, and control how tasks are distributed over time.

### How to set up bulk scheduling

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cmgh7yfdl0001wl0iaprn24sv" frameBorder="0" title="How to set up an MCP Server connection for a tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

To create a bulk schedule for your agent:

1. Navigate to the agent builder and click on the `Run` tab.
2. Look for the dropdown menu next to the `+ New Task` button and select `Schedule in bulk`.
3. Select a spreadsheet or knowledge table that contains the data you want your agent to process.
4. Enter a message template for your agent to use. This message will be sent to your agent for every single task run automatically. You can reference variables from your data using double curly braces (e.g., **\{\{variable\_name}}**). Read more about how to create message templates [below](#using-the-agent-message-template).
5. Configure working hours for the batch schedule to ensure that tasks are being run at the appropriate time.
6. Click `Schedule` to create your bulk schedule.

<Note>
  We recommend using descriptive column names in your spreadsheet or knowledge table, and testing with a small dataset first before scheduling large batches of tasks.
</Note>

### Using the agent message template

The message template you create will be sent to your agent automatically for every single task run. This allows you to personalize each task with data from your spreadsheet or knowledge table.

For example, if you want each task to reference a different email address or name, you can use variables in your message template. Variables are referenced using double curly braces with the column name from your data source: **\{\{column\_name}}**.

**How it works:**

* Each row in your spreadsheet or knowledge table becomes a separate task
* The message template is sent to your agent for each task
* Variables in double curly braces (like **\{\{email}}** or **\{\{name}}**) are replaced with the actual values from that row
* You can use any column from your selected data source as a variable

**Example:**

If your spreadsheet has columns for “company” and “email”, you could create a template like:

“Please research **\{\{company}}** and send the findings to **\{\{email}}**.”

When the tasks run, each one will automatically use the specific company and email from that row’s data.

### Using the working hours

A key feature of bulk scheduling is the ability to queue working hours, which allows you to fine-tune how and when tasks are distributed. This ensures that your automated workflows align perfectly with your team’s schedule and work patterns.

**Key components:**

* Timezone: Select your preferred timezone to ensure tasks are scheduled according to your local time, for example: Australia - Sydney.

* Work Days: Specify which days of the week tasks should be scheduled.

* Work Hours: Set the time range during which tasks should be executed. You also have the option to select “All day” for 24/7 task execution.

* Task Distribution: Define the number of tasks to be sent per interval. For example, set a specific number of tasks per day. The actual number of tasks your agent can execute may vary due to factors like conflicting contract conditions and rate limiting.

* Override Mode: This give you the option to run all created tasks in override mode, which can be useful for testing or when you need to maintain specific inputs/outputs across all tasks.

<Note>
  We recommend aligning your work days and hours with your team’s actual working schedule to ensure timely handling of task outputs. Also, start with a conservative number of tasks per interval and gradually increase as you assess your team’s capacity and the agent’s performance.
</Note>

### Monitoring your bulk schedule

To view and manage your bulk schedule, navigate to the agent builder, click on the `Run` tab, and then click on `Agent queue` in the top left on the sidebar. From there, you can click on the CSV or knowledge table that you just chose to see your tasks organized by status:

* **Upcoming**: Tasks that are scheduled but haven’t started yet
* **In progress**: Tasks that are currently being processed
* **Failed**: Tasks that encountered errors during execution
* **Processed**: Tasks that have completed successfully
* **Cancelled**: Tasks that have been cancelled

Note that you can’t cancel specific tasks individually. You can only cancel all tasks within the upcoming view.


---

# Page: Interact with your Agent

Path: `build/agents/give-your-agent-tasks/interact-with-your-agent`.

## Interact with your Agent

> What are tasks and how do they differ from prompt?

### **Agent Chat**

#### What is Agent Chat?

Agent Chat gives your the platform agents a friendly, modern chat interface that your users will love. It’s like giving your AI a professional “storefront” where people can easily interact with it.

Think of it as the difference between talking to someone through a clunky intercom versus having a face-to-face conversation at a well-designed help desk.

#### Why You’ll Love It

* **Looks Professional**: Creates a polished, branded experience that builds trust
* **Works Anywhere**: Easily embeds into your website, app, or other digital spaces
* **Fully Customizable**: Matches your brand colors, style, and messaging
* **User-Friendly**: Provides an intuitive interface people already know how to use

#### Key Features

#### Conversational Interface

Agent Chat provides a clean, familiar messaging experience that feels natural to users. No technical knowledge required - if they’ve ever used a messaging app, they’ll feel right at home.

The interface supports flowing conversations that make even complex interactions feel simple and accessible.

#### Upload Files

Users can easily share documents, images, and other files directly in the chat, making it simple to provide context or get help with specific materials.

#### Talk to Your Agent

Enable voice interactions for situations where typing isn’t convenient or accessible.

#### Embed Anywhere

Place your AI assistant exactly where users need help:

* Add it to your website with a simple embed code
* Deploy as a chat widget that appears on any web page
* Maintain consistent branding across all touchpoints

This flexibility means you can put AI assistance precisely where it delivers the most value.

#### Customization Options

Make the chat experience truly yours:

* Match your brand colors and icons
* Customize the welcome message and input text
* Configure the chat widget’s appearance and behavior
* Create a seamless extension of your brand experience

#### How to Set It Up

1. **Configure**: In your the platform dashboard, set up your Agent Chat preferences
2. **Customize**: Adjust colors, messages, and behavior to match your needs
3. **Test**: Try different scenarios to ensure everything works as expected
4. **Deploy**: Generate and implement the embed code on your site

#### Important Considerations

* Chat interactions use credits from your the platform account
* Think strategically about where the chat will provide the most value
* Decide if your chat should proactively engage users or wait for them to initiate
* Plan when and how to escalate complex issues to human support

#### Perfect For

* **Customer Support**: Provide immediate answers to common questions
* **Product Guidance**: Help users find the right products or features
* **Technical Troubleshooting**: Walk users through solutions step-by-step
* **Information Delivery**: Make knowledge easily accessible through conversation

#### Related Features

**Agent Templates** - Explore pre-built agent configurations that can be customized for your specific needs and deployed through Agent Chat.

**Customize an Agent** - Learn how to tailor your agent’s personality, knowledge, and capabilities to create the perfect conversational partner for your users.

**Share Your Agent** - Discover options for sharing your agents with team members, embedding them in websites, or making them available as templates for others.


---

# Page: Tasks

Path: `build/agents/give-your-agent-tasks/task-overview`.

## Tasks

> Learn what a Task is, where to view your Tasks, and how to read one in the Run tab

A Task is a single run of work carried out by an Agent or a Workforce: a conversation with an Agent, or a workflow a Workforce runs. It’s made up of the messages exchanged and the Tool runs along the way. You can view Tasks in a variety of places, but the two main ones are the Run tab of the Agent and Workforce builders and the Tasks page.

### Where you can view Tasks

<CardGroup cols="2">
  <Card title="Run tab" icon="play">
    The Agent and Workforce builders each have a Run tab showing that Agent or Workforce’s Tasks, where you can also start new ones.
  </Card>

  <Card title="Tasks page" icon="list-check" href="build__agents__give-your-agent-tasks.md">
    Every Task across all your Agents and Workforces in one list, for monitoring and acting in bulk.
  </Card>
</CardGroup>

### What’s inside a Task

A Task is made up of the messages exchanged, the steps the Agent took, and the details of the run. The most common place to see all of it is the Run tab, where you interact with an Agent inside the Agent builder. The same Task can also open through an embed or in the platform Chat.

#### Task list

The left side lists every conversation for the Agent, grouped by recency, with **All** and **To Review** tabs, search and filters, a **Tabular view**, and the **Agent queue**. Start a fresh one with **New task**.

#### Timeline

The center shows the Task thread (the messages exchanged and the Tool runs), with a comment box at the bottom to message the Task directly.

#### Details

The right side has **Pause Task** and **Mark as complete**, plus the Task’s **Created** by, **Status**, **Date created**, **Credits used**, **Run time**, and **Linked tools**.

### Filtering Tasks

The Task list has a filter builder for narrowing down to exactly the Tasks you need. You can filter by:

* **Status** — Task state like Running, Completed, Paused, or Timed out
* **Agent** — Tasks from a specific Agent
* **Tool usage** — which Tools the Task used
* **Errors** — failure type: **Agent has errored** (the Agent itself stopped on an error) or **Has active tool failures** (a Tool failed mid-run, even if the Agent kept going)
* **Metadata, date, and more** — custom fields, time range, who triggered the Task, and other conditions

Combine the two error filters to catch every kind of failure, including Tool failures that never surfaced as an obvious error.

### Viewing Tasks across all your Agents

The views above each focus on a single Agent or Workforce. To monitor and troubleshoot every Task across all your Agents and Workforces from one place, head to the [Tasks page](build__agents__give-your-agent-tasks.md) (page `build/agents/give-your-agent-tasks/tasks-page`). It’s where you triage escalations, errors, and approvals, and act in bulk when a whole group needs the same fix. Selecting any Task there opens the same conversation (its messages and Tool runs) in a side panel.


---

# Page: Task Queue

Path: `build/agents/give-your-agent-tasks/task-queue`.

## Task Queue

> Learn how to access and manage your agent task queue, including how to cancel tasks and view task statuses

### Understanding the Task Queue

When you set up triggers or create bulk schedules for your agent, tasks are organized into queues. The task queue gives you visibility and control over all tasks that are being processed, queued, or have been completed by your agent.

### How to Access the Task Queue

To access your agent’s task queue:

1. Navigate to your agent in the agent builder
2. Click on the **Run** tab
3. Look at the **left sidebar** (the task list area)
4. Click on the **Agent queue** button

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cmkalnjqr1d1fke4xceyoom3d" frameBorder="0" title="How to access the agent queue" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

The agent queue button will open a view showing all your task queues organized by their source (triggers and bulk schedules).

### Task Statuses

When you open agent queue, you’ll see different sections for each operation that creates tasks (per trigger or per bulk schedule). Within each section, tasks are organized by their current status. You can view tasks in the following categories:

* **In Progress**: Tasks that are currently being processed by your agent
* **Upcoming Queue**: Tasks that are scheduled but haven’t started yet
* **Failed**: Tasks that encountered errors during execution
* **Processed**: Tasks that have completed successfully
* **Cancelled**: Tasks that have been cancelled

This organization helps you quickly understand what’s happening with your agent’s workload and identify any issues that need attention.

### Cancelling Tasks

From the agent queue, you can cancel tasks in bulk. You can cancel all tasks within a specific queue section (like all upcoming tasks in a bulk schedule)

To cancel tasks from the agent queue:

1. Navigate to the queue section you want to manage (e.g., a specific bulk schedule)
2. Go to the **Upcoming Queue** view
3. Click the **Cancel All** button to cancel all tasks in that queue

<Note>
  You can cancel, complete, or pause individual tasks (including tasks in progress) when viewing them in the normal task tab. However, from the agent queue view, you can only cancel tasks in bulk, and only tasks in the “Upcoming Queue” status can be cancelled from the queue.
</Note>

### Viewing Queue Insights

The task queue provides valuable insights about what’s being imported and processed:

* **Import status**: See how many tasks have been imported from your CSV or knowledge table
* **Processing progress**: Track how many tasks have been processed versus how many are still queued
* **Trigger activity**: Monitor which triggers are generating tasks and how frequently

These insights help you understand your agent’s workload and make informed decisions about scaling or adjusting your task schedules.

### Best Practices

* **Monitor regularly**: Check your task queue regularly to ensure tasks are processing as expected
* **Review failed tasks**: Pay attention to failed tasks to identify patterns or issues that need addressing
* **Plan cancellations**: If you need to cancel tasks, do so from the “Upcoming Queue” view before they start processing
* **Use insights**: Leverage the queue insights to optimize your bulk schedules and trigger configurations

<Note>
  If you notice a high number of failed tasks, review your agent’s configuration, tool integrations, or the data format in your bulk schedule to identify and fix the root cause.
</Note>


---

# Page: Task Operations

Path: `build/agents/give-your-agent-tasks/tasks-page`.

## Task Operations

> Monitor, troubleshoot, and resolve Agent and Workforce Tasks in bulk from one place

The Tasks page is where you monitor everything your Agents and Workforces are doing: reviewing outputs, approving pending actions, and rerunning failed runs. You can act on a single Task or apply the same action across every matching Task at once.

Tasks from both Agents and Workforces appear here, and the same triage and bulk action flows apply to both.

<Note>
  Each Task is a single run of work (a conversation or workflow) carried out by an Agent or Workforce. For what a Task is and how to read one, see [Tasks](build__agents__give-your-agent-tasks.md) (page `build/agents/give-your-agent-tasks/task-overview`).
</Note>

### Tabs

The page is split into tabs:

* **Approvals** — Tasks waiting on your approval before they can continue.
* **Escalated** — Tasks the Agent paused on to ask you a question.
* **Errors** — Tasks that hit a Tool failure or runtime error.
* **All tasks** — every conversation across your Agents and Workforces.

### Bulk actions

When you open a Task, the page checks for other Tasks from the same Agent in the same state and surfaces a bottom sheet so you can act on the whole group at once.

Available bulk actions:

* **Approve** or **Reject** pending approvals.
* **Rerun** errored Tasks from the failing step.

A confirmation modal shows how many Tasks will be affected before anything is sent.

<Note>
  A Task with more than one pending approval isn’t bulk-actionable and stays one-at-a-time.
</Note>

