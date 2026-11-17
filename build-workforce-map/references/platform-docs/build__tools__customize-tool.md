# The platform docs: `build/tools/customize-tool/`

6 pages, downloaded on 11/16/2026.


---

# Page: Branching

Path: `build/tools/customize-tool/branching`.

## Branching

> Add conditional branches to Tool steps in your Tools

Conditional branching allows users to create different paths in their tool steps based on specific conditions. When you set up a branch, you can define criteria using rules, code, AI prompts, or fallback options. Each branch is assessed independently, meaning multiple branches can run if their conditions are met. This feature enhances the flexibility of your tools, allowing for more complex workflows.

### How to set up Branching in a Tool

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cme9wswjq4keoh3pyasu0s8mm" frameBorder="0" title="How to set up Branching in a Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

1. Add a Branch by clicking the button to create a new Tool step, then navigate to the Flow Controls tab to select a Branch
2. Add new branches by clicking ’+ Add branch’
3. For each branch, choose the Assessment mode for your branch

* **Rules**: allows you to make a logical assessment between inputs, such as contains, greater than, etc.
* **Code expression**: will run based on whether the code returns true or false
* **Let AI decide**: lets you write a plain text prompt, which returns true or false to run the branch based on your instructions. You can include variables using the variable selector menu.

4. Include a branch with the Assessment mode set to ‘Fallback’, this means the step will run if no other steps return true.
5. Add Tool steps to each of your branches, then run the Tool to test

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="What happens if there's an error in one of the branches?">
    If there’s an error in any node within a branch, the system will throw an error just like it does with standard Tool steps. It’s important to ensure that each node is functioning correctly to avoid disruptions in your workflow.
  </Accordion>

  <Accordion title="How many branches can I have at once?">
    You can set a maximum of four branches.
  </Accordion>

  <Accordion title="Can multiple branches run for one input?">
    All branches are assessed individually, so multiple branches can run if the assessment returns true.
  </Accordion>

  <Accordion title="Can branches access nodes from other branches?">
    No, nodes within a branch cannot access nodes from different branches. Each branch operates independently, which helps maintain clarity and organisation in your tool’s logic.
  </Accordion>
</AccordionGroup>


---

# Page: Inputs

Path: `build/tools/customize-tool/inputs`.

## Inputs

> Inputs for tools

### What Are Inputs?

Inputs are the essential data your tool needs to do its job. Think of them as the information your tool asks for before it can perform its magic - whether that information comes from a human user, an AI agent, or another tool.

### Basic Input Types

#### Text input

A simple single-line text field for short answers like names, IDs, or brief responses

#### Long text input

A multi-line text area perfect for detailed descriptions, paragraphs, or longer content

#### Numeric input

Accepts only numbers, ideal for quantities, ages, or any numerical data

#### Checkbox

A simple yes/no toggle for binary choices (true/false, on/off)

***

### Selection Input Types

#### Options dropdown

A menu with predefined choices for users to select from

#### Text list

Allows entering multiple text items, typically one per line

#### Table

Structured data organized in rows and columns, similar to a spreadsheet

***

### Advanced Input Types

#### JSON

When you specify a JSON input, you can optionally provide a [JSON Schema](https://json-schema.org/) in the advanced options to describe the format of the JSON input. This schema describes the expected structure of the JSON input, and is used to help guide the agent to provide data in the correct format. Providing a schema helps to improve the accuracy of calling the tool.

<Tip>
  The structure outlined in 

  `schema.json`

   corresponds the data format used in 

  `example.json`

  .
</Tip>

<CodeGroup>
  ```json title="example.json"
  {
    "timestamp": 1948832903,
    "response": {
      "name": "Pierre Vinken",
      "age": 30,
      "bio": "Pierre Vinken, 61 years old, joined the board as a nonexecutive director Nov. 29th"
    },
    "is_prospect": true,
    "status": "inactive"
  }
  ```

  ```json title="schema.json"
  {
    "properties": {
      "timestamp": {
        "type": "number"
      },
      "response": {
        "type": "object",
        "properties": {
          "name": {
             "type": "string"
          },
          "age": {
             "type": "number"
          },
          "bio": {
             "type": "string"
          }
        }
      },
      "is_prospect": {
        "type": "boolean"
      },
      "status": {
        "type": "string",
        "enum": ["inactive", "active", "archived"]
      }
    }
  }
  ```
</CodeGroup>

The schema describes the overall structure of the data and the types that each item can be. Use the documentation at [json-schema.org](https://json-schema.org/) for more options.

<Warning>
   Note that the only supported keywords are 

  `properties`

   \- all other schema keywords (e.g. 

  `additionalProperties`

  , 

  `examples`

  , etc.) will be ignored.
</Warning>

#### List of JSONs

Handles multiple JSON objects in a list structure

#### Knowledge table

For inputting or selecting from predefined knowledge bases

### File Handling

#### File to text

Uploads a file and converts its contents to text

#### File to URL

Uploads a file and provides a URL to access it

#### Multiple files to URLs

Same as above but for multiple files at once

***

### Authentication Types

#### API key

Securely input API keys for external services

#### OAuth account

Handles secure connection to third-party services with proper authorization. OAuth account inputs allow users to connect their accounts from third-party services (like HubSpot, Slack, Excel workbook, etc.) to your tool.

OAuth account inputs can be used in tools that support OAuth authentication, or in Python code steps. For details on using OAuth accounts in Python code, see the [Python Tool step documentation](build__tools__tool-steps__python-code.md) (page `build/tools/tool-steps/python-code/code-python`).

***

### Creating an Input

To add an input to your tool:

1. Select the appropriate input type from the options
2. Give your input a descriptive name
3. Add a helpful description so users know what to enter
4. Assign a variable name (this is how your tool will reference this input)

<div
  style="{
  width: '100%',
  position: 'relative',
  paddingTop: '56.25%',
}"
>
  <iframe
    src="https://app.supademo.com/embed/cm7odo9p804twhilgfbik61s9"
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

***

### Using Default Values as Constants

Default values are pre-filled inputs that make your tools more efficient and easier to use.

#### Why Use Default Values?

* **Create constants** - Set values that stay the same across multiple runs (API endpoints, base URLs)
* **Provide examples** - Show realistic sample data to demonstrate how the tool works
* **Save time** - Pre-fill common inputs to reduce repetitive typing and potential errors

#### How to Set Default Values

1. Find the input field you want to set a default for
2. Enter your desired default value
3. Click “Set value as default”

Once set, these values will automatically appear whenever the tool runs, unless specifically changed by the user.

<div
  style="{
  width: '100%',
  position: 'relative',
  paddingTop: '56.25%',
}"
>
  <iframe
    src="https://app.supademo.com/embed/cm7odwauv04ythilgyr06b9m2"
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


---

# Page: Looping

Path: `build/tools/customize-tool/looping`.

## Looping

> Loop through Tool steps in your Tools

Looping allows you to Loop through a list of Tool steps in your Tools, based on a list outputted from previous steps, or an input from the Tool.

### How to set up Looping in a Tool

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cme9w2yuj4k2ah3py1j36pvo5" frameBorder="0" title="How to set up Looping in a Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

1. Add a Loop by clicking the button to create a new Tool step, then navigate to the Flow Controls tab to select a Loop
2. Select the list you want to Loop over in **List to loop**
3. Choose how to process list items, either at the same time or one by one
4. Add Tool steps inside the Loop
5. Once you’ve done that, run the Tool to test the Loop

### Accessing Loop items within steps

Inside a Loop, each step runs once per item in the list. You can reference the current item and its position using template variables.

#### `{{foreach.item}}`

Use `{{foreach.item}}` to access the current element being processed. For example, if your list contains movie names, `{{foreach.item}}` resolves to the name of the current movie on each iteration.

#### `{{foreach.index}}`

Use `{{foreach.index}}` to access the zero-based position of the current item in the list. The first item has index `0`, the second has index `1`, and so on. This is useful when you need to track position or produce numbered output.

#### Referencing step outputs

To Loop over the output of a previous step, enable variable mode on the **List to loop** field and use `{{step_name.output_field}}` syntax. For example, if an earlier step named `python` returns a list in a field called `transformed`, you would enter `{{python.transformed}}` as the list source.

<Accordion title="Example: run an LLM on each item in a list">
  Suppose you have a Python step named `python` that returns a list of movie names in a field called `transformed`. You want to run an LLM step on each movie with the prompt “Write me a summary of ...”.

  1. Add a Loop step and set **List to loop** to `{{python.transformed}}` (enable variable mode first).
  2. Inside the Loop, add an LLM step.
  3. In the LLM prompt, write: `Write me a summary of {{foreach.item}}`.
  4. Run the Tool. The Loop produces one row per item in the list, with each row containing the LLM’s response for that movie.

  You can also reference the item’s position — for example, `Item {{foreach.index}}: {{foreach.item}}` — to include a numbered label in each output.
</Accordion>

### Output format

When a Loop runs, the output is returned in a cell-based format where each row represents one run of the Loop — one per item in the list. If your list has five items, you will see five rows, each containing the output for that iteration. This lets you inspect the result for each individual item in a table structure rather than a single aggregated output.

If an item errors during processing, its row appears under the **Errors** tab of the Loop step results by default (see error handling settings below).

### Advanced settings

#### How should errors be handled?

Specifies how the Loop should handle errors. Defaults to continue (skip item), but you can also choose to throw an error.

#### Index of item to test Loop on

You can also choose a specific index to test with. This is helpful for debugging and also for testing your overall flow with a single item to reduce credit costs.

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Can I run the Loop steps in parallel, and how does that work?">
    Yes, you can choose to process items in your list either in parallel or sequentially. If you select parallel processing, all items will be processed at the same time, which can speed up execution. If you prefer to handle them one at a time, you can opt for sequential processing.
  </Accordion>

  <Accordion title="How do I handle errors when using the Loop step?">
    By default, if an item in the Loop errors, it will be skipped, and you can view the errored items in the errors tab of the Loop step results. If you prefer to be notified of errors instead, you can adjust the error handling settings to throw a tool error. This way, you can address issues as they arise.
  </Accordion>
</AccordionGroup>


---

# Page: Outputs

Path: `build/tools/customize-tool/outputs`.

## Outputs

> Outputs for tools

### Outputs

Outputs are the data that your tool returns. They’re the result of your tool’s actions.

By default, what you see will be the output of the last step in the tool, however you can also configure this.

A common reason to configure tool outputs is to control your agent’s context, as everything your tool outputs will enter the context of your agent - it’s a good idea to manually configure tool to only output what matters.

For example, if your tool returns the results of a web search step, you probably don’t want to dilute your agent’s context with suggested searches and ‘people also ask’, so you should probably configure a manual output to return the results output only.

<div
  style="{
  width: '100%',
  position: 'relative',
  paddingTop: '61.46%',
}"
>
  <iframe
    src="https://fast.wistia.com/embed/medias/scwkykqqzd"
    frameBorder="0"
    style="{
    position: 'absolute',
    top: 0,left: 0, width: '100%', height: '100%',
    borderRadius: '10px',
  }"
  />
</div>


---

# Page: Steps

Path: `build/tools/customize-tool/steps`.

## Steps

> Steps for tools

### Steps

Steps are the individual actions that your tool performs to generate outputs. They’re the building blocks of your tool’s functionality.

#### Adding steps

Click the `Add Step` button to insert a new action in your tool’s workflow.

<div
  style="{
  width: '100%',
  position: 'relative',
  paddingTop: '61.46%',
}"
>
  <iframe
    src="https://fast.wistia.com/embed/medias/ofqf6ipvzu"
    frameBorder="0"
    style="{
    position: 'absolute',
    top: 0,left: 0, width: '100%', height: '100%',
    borderRadius: '10px',
  }"
  />
</div>

#### Naming steps

Give each step a descriptive name for easy reference.

<div
  style="{
  width: '100%',
  position: 'relative',
  paddingTop: '61.46%',
}"
>
  <iframe
    src="https://fast.wistia.com/embed/medias/ri9hsssuyz"
    frameBorder="0"
    style="{
    position: 'absolute',
    top: 0,left: 0, width: '100%', height: '100%',
    borderRadius: '10px',
  }"
  />
</div>

#### Referencing steps

Use variables to reference outputs from previous steps in subsequent actions.

<div
  style="{
  width: '100%',
  position: 'relative',
  paddingTop: '61.46%',
}"
>
  <iframe
    src="https://fast.wistia.com/embed/medias/n45j9rz7tm"
    frameBorder="0"
    style="{
    position: 'absolute',
    top: 0,left: 0, width: '100%', height: '100%',
    borderRadius: '10px',
  }"
  />
</div>

#### Running steps

Test individual steps to ensure they’re working correctly.

<div
  style="{
  width: '100%',
  position: 'relative',
  paddingTop: '61.46%',
}"
>
  <iframe
    src="https://fast.wistia.com/embed/medias/ame6eb5rr7"
    frameBorder="0"
    style="{
    position: 'absolute',
    top: 0,left: 0, width: '100%', height: '100%',
    borderRadius: '10px',
  }"
  />
</div>

#### Moving steps up or down

Rearrange the order of steps by moving them within the chain.

<div
  style="{
  width: '100%',
  position: 'relative',
  paddingTop: '61.46%',
}"
>
  <iframe
    src="https://fast.wistia.com/embed/medias/aw2mvv2y8s"
    frameBorder="0"
    style="{
    position: 'absolute',
    top: 0,left: 0, width: '100%', height: '100%',
    borderRadius: '10px',
  }"
  />
</div>

#### Duplicating steps

Copy existing steps to create similar actions quickly.

<div
  style="{
  width: '100%',
  position: 'relative',
  paddingTop: '61.46%',
}"
>
  <iframe
    src="https://fast.wistia.com/embed/medias/xsrenyqjt3"
    frameBorder="0"
    style="{
    position: 'absolute',
    top: 0,left: 0, width: '100%', height: '100%',
    borderRadius: '10px',
  }"
  />
</div>


---

# Page: Style Guide

Path: `build/tools/customize-tool/tool-style-guide`.

## Style Guide

> Make tools perform better with agents

### Workflow considerations

Single responsibility - each tool should perform one task exceptionally well.

### Tool naming conventions

The names you give your tools are crucial, as they are added to the LLM prompt that powers the agent using your tool. Names significantly impact performance, as agents consider these strongly when deciding how and when to use your tools.

#### Best practices

* Use clear, concise and descriptive names.
* Focus on the intent of the tool, not its implementation or how it performs its action.
* Be specific about the tool’s purpose.
* Include an action and object, and system if using an integration.

##### Good examples

* ‘Get LinkedIn company posts’
* ‘Summarize Glassdoor interviews’

##### Bad examples

* ‘Search LinkedIn’ (too vague)
* ‘LinkedIn scraper’ (implementation-focused)

#### Tool description guidelines

Tool descriptions should let users know what a tool will do.

**Purpose statement**: Clearly describe the tool’s objective using active voice. Explain what the tool does, not how it does it. Include the primary use case or purpose of your tool.

##### Good examples

* “Get a set of recent LinkedIn posts by a company or person.”
* “Scrape and summarize company interview reviews from a provided Glassdoor interview review URL.”

#### Using LLMs to optimize tool names and descriptions

If you’re unsure how to create the optimal name and description for your tool, we recommend that you use ChatGPT-4o to help you write.

Enter what you currently have for a tool name and description and provide some information about the agent that will use your tool.

Example prompt: “You are being provided a tool name and description that might be used by an AI agent to perform research on various prospects.

Tool name: web search

Description: Search the internet

When given the tool name and description, provide a better name and description that will allow the agent to use this tool correctly. The tool runs a web search for a given query.

The tool name needs to be more action based and focused.”

### Agent prompt

The agent prompt for your tool serves as a crucial guide to help AI agents use it effectively, as agents are powered by LLMs.

It is vitally important you include an agent prompt when setting up your tool.

#### Best practices for agent prompts

* **Explain usage**: Clearly outline when and how the agent should use the tool.
* **Provide context**: Include any necessary background information or assumptions the agent might need to make informed decisions.

##### Good example of an agent prompt

* Tool name: Get LinkedIn company posts
* Tool description: Get a set of recent LinkedIn posts by a company or person.
* Prompt for agent to use: “Use this tool when the user requests information about recent LinkedIn activity for a specific company or person. Provide accurate results by ensuring you input a valid LinkedIn profile URL and only return posts from the past three months.”

### Variables

There are three key places you will use variables in Tool Builder:

* Inputs
* Steps
* Referencing outputs

#### Naming conventions

* **Descriptive and concise**: Names should describe the variable’s purpose or content. Avoid vague or overly long names.
* **Use snake\_case**: Use a consistent format across all tools (e.g., recent\_posts).
* **Avoid generic terms**: Replace terms like data, info, or results with more specific identifiers.

##### Good examples

* **company\_name** – Identifies the target company for a query.
* **blog\_post\_titles** – A collection of titles extracted from a blog, indicating the specific content being stored.

##### Bad examples:

* **name** – Too vague.
* **link** – Does not specify the type of link.

#### Input parameters

There are three things to consider when creating inputs:

* Input names
* Input descriptions
* Input variables

##### Input names

Use clear, actionable, and descriptive input names. The input name should be self-explanatory, enabling users or agents to understand what the input is for.

##### Input descriptions

When writing input descriptions, make sure they provide clear, concise and actionable guidance for the user or agent. Good input descriptions should reflect:

* **Context**: Explain how the input is relevant to the tool’s goal.
  * **Example**: “Provide the URL of the blog page to extract content from.”
* **Requirements**: Specify what format or type of input is needed.
  * **Example**: “Enter a full URL, including https\://, to ensure proper parsing.”
* **Scope**: Define the boundaries or constraints for the input.
  * **Example**: “Include only URLs from the company’s official domain.”
* **Purpose**: Indicate why the input is essential and what it will achieve.
  * **Example**: “This helps identify the blog content relevant to your analysis.”

##### Input variables

Input variables should be written in snake\_case, matching the input name closely to ensure consistency. The variable name should be:

* **Descriptive**: A clear, concise representation of the input it corresponds to.
* **Example**: If the input name is Company name , the variable would be company\_name.
* **Readable and Scalable**: It should be easy to read, maintain, and scale, especially when you have multiple inputs.

<Accordion title="Example">
  You want to scrape the latest blog post content, titles and publication dates from a tech company’s blog page to track their content strategy trends.

  #### Tool setup

  * **Tool name**: Scrape website content
  * **Description**: Extract website content as markdown including title and publication date given a specific website url.
  * Input parameters:
    * **Input name**: Blog URL
      * **Description**: The official blog URL of the company you’re analyzing.
      * **Variable**: blog\_url
    * **Input name**: Objective of scraping
      * **Description**: Extract content, titles and publication dates of all blog posts published in the last six months. Ignore promotional or sponsored articles.
      * **Variable**: objective\_of\_scraping
</Accordion>

### Steps

Step names act as function identifiers. You should prioritize clarity and simplicity. Like tool names, include an action and object, and system if using an integration.

#### Good examples

* Send email via Outlook
* Create new Notion page

#### Benefits of standardised step names

* **Clarity and readability**: Immediately understand the workflow purpose.
* **Consistency**: Create a cohesive experience.
* **Easy debugging and documentation**: Troubleshooting and self-documentation become simpler.

#### Step variable naming

Step variables should be descriptive and use snake\_case.

##### Good example:

* **Step name**: Send email via Outlook
* **Variable**: send\_email

