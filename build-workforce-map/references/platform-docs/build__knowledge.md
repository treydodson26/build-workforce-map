# The platform docs: `build/knowledge/`

6 pages, downloaded on 11/16/2026.


---

# Page: Knowledge

Path: `build/knowledge/create-knowledge`.

## Knowledge

> Our Retrieval Augmented Generation (RAG) solution

## Create and Organize Knowledge

This guide walks you through creating knowledge bases, organizing them, and connecting them to your agents. For an overview of what Knowledge is and how it works, see [Knowledge](get-started__core-concepts.md) (page `get-started/core-concepts/knowledge`).

### Creating Knowledge Sources

<Info>
  New to the platform? The platform Academy has structured courses that walk you through building on the platform step by step.
</Info>

The platform offers multiple flexible approaches to create knowledge, accommodating various information types and sources:

#### Manual Input

When you have specific information that isn’t contained in existing documents, you can manually create and structure your knowledge:

1. Navigate to the Knowledge section in your the platform dashboard
2. Click “Create Knowledge”
3. Select “Empty Table” as your source
4. Name your knowledge base
5. Add columns to structure your information (e.g., Question, Answer, Category)
6. Enter your information directly into the table
7. Click “Create” to save your knowledge base

This approach gives you complete control over the structure and content of your knowledge base, allowing you to create precisely tailored information resources.

#### Upload Documents

When your information already exists in document form, you can quickly import it:

1. Navigate to the Knowledge section
2. Click “Create Knowledge”
3. Select “Upload Files” as your source
4. Choose the file(s) you want to upload (supported formats include CSV, PDF, Excel, JSON, and audio files)
5. Configure parsing options if needed
6. Name your knowledge base
7. Click “Create” to process and import your documents

The platform automatically processes these documents, extracting the relevant information and making it searchable for your agents.

#### Extract Website Content

To incorporate information from websites:

1. Navigate to the Knowledge section
2. Click “Create Knowledge”
3. Select “Website” as your source
4. Enter the URL(s) you want to extract content from
5. Configure crawling options (depth, specific pages, etc.)
6. Name your knowledge base
7. Click “Create” to fetch and process the website content

This method is perfect for incorporating information from your company website, documentation sites, or other online resources without manually copying information.

#### Connect Third-Party Integrations

You can use third-party integrations as integrated Knowledge sources to ensure your Agents have access to the most current information across your entire technology stack. You can learn more about each of our supported integrated Knowledge sources below.

  Use workspace folder as a source of Knowledge for your Agents
</Card>

<Card title="Sharepoint" href="build__knowledge__integrated-knowledge-sources.md" icon="microsoft">
  Connect to Sharepoint as a source of Knowledge for your Agents
</Card>

<Card title="Notion" href="build__knowledge__integrated-knowledge-sources.md" icon="notion">
  Use Notion as a source of Knowledge for your Agents
</Card>

### Organizing Your Knowledge

Effective knowledge organization is crucial for ensuring your agents can quickly find and use the right information. Here are strategies for organizing your knowledge in the platform:

#### Structured Tables

For FAQ-style knowledge or structured data:

1. Create clear column headers that describe the information (e.g., “Question,” “Answer,” “Category”)
2. Use consistent formatting within each column
3. Include metadata columns to help with filtering and organization
4. Consider adding tags or categories to group related information

#### Document Chunking

When importing documents:

1. Configure appropriate chunking settings to break down large documents into manageable pieces
2. Balance chunk size - too small may lose context, too large may dilute match quality
3. Consider overlapping chunks to maintain context across sections
4. Use metadata to maintain relationships between chunks from the same source

#### Knowledge Collections

Group related knowledge bases into collections:

1. Create separate knowledge bases for different domains or purposes
2. Use consistent naming conventions for your knowledge bases
3. Consider the scope of each knowledge base - more focused bases often yield more precise results
4. Document the purpose and contents of each knowledge base for team reference

### Enhancing Knowledge Quality

To maximize the effectiveness of your knowledge bases:

#### Metadata Enrichment

Add contextual metadata to your knowledge entries:

1. Include creation and update dates to track freshness
2. Add author information for accountability
3. Tag entries with relevant categories or topics
4. Include confidence scores or verification status where applicable

#### Knowledge Verification

Implement processes to ensure accuracy:

1. Regularly review and update your knowledge bases
2. Set up workflows for subject matter experts to verify information
3. Track usage patterns to identify frequently accessed or potentially problematic entries
4. Implement version control for important knowledge bases

#### Semantic Organization

Enhance retrievability with semantic approaches:

1. Use consistent terminology throughout your knowledge bases
2. Consider adding synonyms or alternative phrasings for important concepts
3. Structure information in a question-answer format where appropriate
4. Include examples and use cases to illustrate concepts

### Connecting Knowledge to Agents

Once your knowledge is created and organized, connect it to your agents:

1. Navigate to your agent’s configuration page
2. Select “Add existing knowledge”
3. Select the knowledge set you would like to add
4. Select how the agent should use this knowledge
   1. Add all to prompt: this option adds the entire knowledge set directly into the prompt every time the agent runs.
      * *Best for small or simple data sets*
      * *Easier to use with no extra configuration needed*
   2. Allow agent to search: this uses Retrieval-Augmented Generation (RAG), where the agent searches the knowledge set using a tool.
      * *Best for large or complex data sets*
      * *More flexible and scalable*
5. Depending on the option you chose, you can now see the name of your knowledge set as a  tool or knowledge set variable in your agent prompt.

### Advanced Knowledge Configuration

Fine-tune how your agents interact with knowledge:

#### Retrieval Settings

Adjust how your agent searches for information:

1. Configure the number of results returned for each query
2. Set match quality thresholds to ensure only highly relevant information is used
3. Adjust search algorithms between keyword-based and semantic approaches
4. Configure whether the agent should use knowledge for all queries or only specific types

#### Knowledge Prioritization

When using multiple knowledge bases:

1. Set priority levels for different knowledge sources
2. Configure fallback behavior when information isn’t found in primary sources
3. Set up rules for resolving conflicts between different knowledge sources
4. Consider creating specialized knowledge bases for specific query types

#### Query Transformation

Enhance retrieval effectiveness:

1. Configure query preprocessing to improve match quality
2. Set up query expansion to include related terms
3. Implement query classification to route different types of questions to appropriate knowledge bases
4. Use feedback loops to improve retrieval quality over time

### Best Practices for Knowledge Management

To maintain effective knowledge bases over time:

1. **Regular Updates**: Schedule periodic reviews to keep information current
2. **Version Control**: Track changes to your knowledge bases, especially for critical information
3. **Usage Analytics**: Monitor how your agents use knowledge to identify gaps or improvement opportunities
4. **Feedback Integration**: Create processes to incorporate user feedback into your knowledge bases
5. **Documentation**: Maintain clear documentation about your knowledge structure and organization
6. **Quality Control**: Implement validation processes for new knowledge entries
7. **Scalable Structure**: Design your knowledge organization to accommodate growth

### Related Features

* Access Knowledge: Learn how to configure how your agents and tools access and use your knowledge bases.
* [Enrich with Tool](build__knowledge.md) (page `build/knowledge/enrich-with-tool`): Discover how to enhance your knowledge bases with additional context using tools.
* Advanced Knowledge Retrieval: Explore advanced techniques for optimizing how your agents retrieve and use knowledge.


---

# Page: Enrich with Tool

Path: `build/knowledge/enrich-with-tool`.

## Enrich with Tool

> Run a Tool across rows in your Knowledge table to add AI-generated columns

Enrich with Tool lets you run any Tool across your Knowledge table and write the results back as new columns. It’s useful any time you want to process, analyze, or generate data at scale — for example, summarizing a column of text, classifying records, or extracting structured fields from unstructured content.

### Enriching your data with a Tool

There are two ways to start an enrichment on a Knowledge table.

#### From the Knowledge table

<div
  style="{
  width: '100%',
  position: 'relative',
  paddingTop: '61.46%',
}"
>
  <iframe
    src="https://fast.wistia.com/embed/medias/j927wur4xw"
    frameBorder="0"
    style="{
    position: 'absolute',
    top: 0,left: 0, width: '100%', height: '100%',
    borderRadius: '10px',
  }"
  />
</div>

{/* TODO: screenshot — Knowledge table with Enrich button highlighted */}

1. Navigate to **Knowledge** and open the table you want to enrich.
2. Click the **Enrich** button in the table toolbar.
3. Select a Tool from the library.

#### From the Tool’s Use tab

On the **Use** tab of any Tool, select the **Run in bulk** tab.



Click **Run on my data** to go directly to your Knowledge tables and start the enrichment from there.

### Configuring the enrichment

Once you’ve selected a Tool, configure how it should run on your data. The modal shows **Map tool inputs to columns** with a dropdown for each input.



* **Map to table column** — click the dropdown to see your table’s column headers and select the one to use. The value from that column will be used for each row.
* **Manually type data** — click **+ Manually type data** to switch to manual entry and use the same fixed value for every row.

Once your inputs are mapped, click **Confirm** to finish the setup.

### Running the enrichment

After confirming, a new column is added to your Knowledge table showing the Tool name. From there you can choose to run on individual rows or across the entire dataset.



* The **play button in the column header** runs the Tool across the whole table.
* The **play button on each row** runs the Tool on that individual row.

<Tip>
  Always test on a few individual rows before running across the whole table to confirm the output is correct and check the credit cost.
</Tip>

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Can I use a Tool I built myself, or only Tools from the library?">
    You can use any Tool — including ones you’ve built yourself. The library shows all Tools available in your project alongside marketplace Tools.
  </Accordion>

  <Accordion title="How do I know what a bulk run will cost before I commit?">
    The configuration modal shows an estimated credit cost before you click **Confirm**. Use the single-row run to get a more precise sense of cost per row before scaling up.
  </Accordion>

  <Accordion title="Can I have more than one enrichment column on the same table?">
    Yes. Each enrichment is independent — click **Enrich** again to set up another Tool on the same table. Each creates its own column.
  </Accordion>

  <Accordion title="What happens to rows I add to the table after the enrichment is set up?">
    New rows are not automatically enriched. You’ll need to run the Tool on them manually using the play button on each row, or trigger another bulk run.
  </Accordion>

  <Accordion title="Can I run the enrichment on a specific subset of rows?">
    Not as a selection — but you can run the play button on any individual row without affecting others. For targeted bulk runs on a subset, consider filtering your data into a separate table first.
  </Accordion>
</AccordionGroup>


---

# Page: Find and Use Knowledge

Path: `build/knowledge/find-and-use-knowledge`.

## Find and Use Knowledge

> Knowledge is the foundation of intelligent AI agents in the platform.

### Understanding Knowledge in the platform

Knowledge in the platform refers to any information that your agents can access and reference when responding to queries or performing tasks. This information can come in various forms:

* **Factual information** stored in knowledge bases
* **Contextual examples** that demonstrate desired outputs
* **External data sources** connected through integrations
* **Website content** extracted from specific URLs

Think of knowledge as the reference material your agents consult before formulating responses. Just as a human expert might refer to documentation, databases, or examples before answering a question, your AI agents can leverage knowledge to ground their responses in factual information.

### Finding Knowledge

There are several ways to find and access knowledge within the platform:

#### Navigating to the Knowledge Section

1. Log into your the platform dashboard
2. Click on “Knowledge” in the main navigation menu
3. Browse existing knowledge bases or create new ones

#### Searching for Specific Knowledge

Within the Knowledge section, you can:

* Use the search bar to find specific knowledge bases by name or content
* Filter knowledge bases by type, creation date, or other attributes
* Sort knowledge bases to quickly locate what you need

#### Exploring Knowledge Categories

Knowledge bases in the platform are typically organized into categories based on their purpose:

* **Reference Knowledge**: Comprehensive information repositories like FAQs, product details, or company policies

* **Example Knowledge**: Samples of desired outputs that demonstrate “what good looks like”

* **Procedural Knowledge**: Step-by-step instructions for completing specific tasks

* **External Knowledge**: Information retrieved from integrated tools and services

### Using Knowledge with Your Agents

Once you’ve found the knowledge you need, there are several ways to use it with your agents:

#### Connecting Knowledge Bases to Agents

1. Navigate to the agent you want to enhance
2. Select “Knowledge” from the agent configuration options
3. Choose the knowledge base(s) you want to connect
4. Configure retrieval settings to determine how the agent accesses the knowledge

#### Providing Contextual Examples

For tasks where you want to guide your agent’s output style or format:

1. Create a knowledge base with exemplary outputs
2. Connect this knowledge base to your agent
3. Include instructions that direct the agent to follow these examples

For instance, if you want your agent to write case studies in a specific format, provide examples of well-crafted case studies in a knowledge base.

#### Leveraging Knowledge in Agent Prompts

When designing agent prompts, you can explicitly instruct the agent to reference specific knowledge:

> Before responding, please check the knowledge base for information about \[specific topic].

This ensures your agent actively seeks relevant information rather than relying solely on its pre-trained knowledge.

### Knowledge Retrieval Methods

The platform offers several methods for retrieving knowledge:

#### Semantic Search

Semantic search finds information based on meaning rather than exact keyword matches. This allows agents to retrieve relevant information even when queries use different terminology than what’s in the knowledge base.

To optimize for semantic search:

* Structure your knowledge with clear, descriptive content

* Include synonyms and alternative phrasings for important concepts

* Organize related information together for better contextual understanding

#### Hybrid Search

Hybrid search combines semantic search with keyword matching for more precise results. This is particularly useful when your knowledge base contains specific terminology or unique identifiers.

#### Filtered Retrieval

You can set up filters to narrow down knowledge retrieval based on specific attributes:

1. Navigate to the knowledge base settings
2. Configure retrieval filters based on metadata fields
3. Apply these filters to ensure agents only access relevant information

### Knowledge Types and Their Uses

Different types of knowledge serve different purposes:

#### Snippet Knowledge

Small pieces of information that provide specific guidance or examples:

* Use for: Style guides, tone examples, formatting templates
* Best for: Shaping how agents respond rather than what they respond with
* Example: “This is what a professional email response should look like...”

#### Database Knowledge

Comprehensive collections of information organized in a structured format:

* Use for: FAQs, product catalogs, support documentation
* Best for: Providing detailed, factual information on a wide range of topics
* Example: A table of product specifications and features

#### Integration Knowledge

Information retrieved from external tools and services:

* Use for: Real-time data, website content, third-party databases
* Best for: Ensuring agents have access to the most current information
* Example: Documentation pulled from your company website

### Best Practices for Knowledge Management

To get the most out of knowledge in the platform:

#### Organize Knowledge Strategically

* Create separate knowledge bases for different topics or departments
* Use clear, descriptive names for easy identification
* Add metadata to help with filtering and organization

#### Update Knowledge Regularly

* Schedule regular reviews of your knowledge bases

* Update information as products, policies, or procedures change

* Remove outdated information to prevent confusion

#### Monitor Knowledge Usage

* Review which knowledge bases are being accessed most frequently
* Identify gaps where agents might need additional information
* Refine knowledge based on actual usage patterns

#### Balance Comprehensiveness with the platform

* Include enough detail for accurate responses
* Avoid overwhelming knowledge bases with unnecessary information
* Focus on quality over quantity

### Troubleshooting Knowledge Retrieval

If your agents aren’t effectively using knowledge:

#### Check Knowledge Connection

Ensure the knowledge base is properly connected to the agent and that retrieval settings are configured correctly.

#### Review Knowledge Content

Examine whether the knowledge base contains the information the agent needs in a format it can effectively use.

#### Adjust Retrieval Settings

Modify search parameters, result limits, or match quality thresholds to improve retrieval accuracy.

#### Test with Sample Queries

Use the testing interface to see how the agent retrieves and uses knowledge for specific questions.

### Frequently asked questions (FAQs)

**Q: How much knowledge can I add to my agents?**

A: the platform supports extensive knowledge bases, but for optimal performance, focus on providing relevant, well-structured information rather than simply maximizing volume.

**Q: Can I use multiple knowledge bases with a single agent?**

A: Yes, you can connect multiple knowledge bases to one agent. The agent will search across all connected knowledge bases when responding to queries.

**Q: How do I know if my agent is using the knowledge effectively?**

A: Use the agent testing interface to see which knowledge sources are being retrieved for specific queries. You can also review conversation logs to see how knowledge is being incorporated into responses.

**Q: Can I prioritize certain knowledge over others?**

A: Yes, you can configure retrieval settings to prioritize specific knowledge bases or types of information based on match quality scores or metadata attributes.

**Q: What’s the difference between knowledge and tools?**

A: Knowledge provides information for agents to reference, while tools enable agents to perform actions or access external systems. Knowledge informs what agents know, while tools expand what agents can do.


---

# Page: Inactive table deletion

Path: `build/knowledge/inactive-table-deletion`.

## Inactive table deletion

> One-time deletion of Knowledge tables on inactive accounts on May 4, 2026

<Info>
  This is a one-time cleanup event scheduled for May 4, 2026 — not an ongoing or recurring policy. If this becomes a recurring policy in the future, this page will be completely rewritten to reflect that.
</Info>

On May 4, 2026, the platform will perform a one-time deletion of Knowledge tables on accounts that have been inactive for an extended period. This page explains what qualifies as inactive, how you are notified, and how to prevent your Knowledge tables from being deleted.

<Warning>
  Deletion of inactive Knowledge tables is permanent and cannot be undone. All data stored in those tables will be lost.
</Warning>

### What counts as inactive

Your account is considered inactive when **both** of the following conditions have been true for the last 182 days:

* No tool or agent has been run
* No login to the platform

Both conditions must apply simultaneously. If either condition is not met — for example, if you have logged in within the last 182 days — your account is considered active and your Knowledge tables will not be deleted.

### Warning email

You will receive an email warning 4 days before your Knowledge tables are scheduled for deletion on May 4, 2026. This email comes from `the platform's support address` and is a legitimate notification from the platform — not spam or phishing.

### What gets deleted

All data stored in your Knowledge tables will be permanently deleted, including all rows, columns, and any documents or files used to populate those tables. Your account itself will remain active — only the Knowledge stored in those tables is removed.

### How to prevent deletion

Log in to the platform and run any Agent or Tool. Either action marks your account as active, and your Knowledge tables will not be deleted in this one-time cleanup. You do not need to re-upload data or reconfigure anything — simply using the platform is enough.

If you receive a warning email, log in and run an Agent or Tool before the 4-day window closes to prevent deletion.

### Received the email in error?

If you believe you received a deletion warning in error — for example, if you have been actively using the platform — reply directly to the warning email to open a support ticket. You can also contact support directly.

***

### Frequently asked questions

<AccordionGroup>
  <Accordion title="Does this apply to Enterprise customers?">
    No. This one-time cleanup event does not apply to Enterprise accounts. Only non-Enterprise accounts are subject to this deletion.
  </Accordion>

  <Accordion title="Does this apply to all accounts?">
    No, not all accounts. This one-time cleanup applies to non-Enterprise the platform accounts that have been inactive for 182 or more days. Enterprise accounts are not affected.
  </Accordion>

  <Accordion title="Can I recover deleted Knowledge tables?">
    No. Once Knowledge tables are deleted, the data cannot be recovered. If you receive a warning email, log in and run an Agent or Tool before the 4-day window closes.
  </Accordion>

  <Accordion title="What counts as 'running' a tool or agent?">
    Any execution of a Tool or Agent through the platform counts as activity. This includes manual runs as well as automated or scheduled runs.
  </Accordion>

  <Accordion title="How is inactivity measured?">
    Inactivity is measured from two signals: the last tool or agent run, and the last login to the platform. Both must be absent for 182 consecutive days for your Knowledge tables to qualify for deletion in this one-time event. A single login or run within that window is sufficient to prevent it.
  </Accordion>

  <Accordion title="Is this related to the Enterprise Data Retention feature?">
    No. These are two separate things. This one-time cleanup targets Knowledge tables on non-Enterprise accounts with 182 days of inactivity. The Data Retention feature is an Enterprise-only configuration for managing the lifecycle of tool runs, agent conversations, and other activity data — it does not control Knowledge tables.
  </Accordion>

  <Accordion title="Will my account be deleted?">
    No. Your account will remain active. Only the Knowledge data stored in inactive tables is deleted in this one-time event. You can continue using the platform normally after May 4, 2026.
  </Accordion>
</AccordionGroup>


---

# Page: Knowledge Tool steps

Path: `build/knowledge/knowledge-tool-steps`.

## Knowledge Tool steps

> Use Tool steps to interact with your Knowledge tables

You can use Tool steps to interact with your Knowledge tables.

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


---

# Page: Use Snippets for Quick Access

Path: `build/knowledge/use-snippets-for-quick-access`.

## Use Snippets for Quick Access

> Snippets transform how you manage shared text across your the platform workspace.

### Overview

This powerful feature provides a centralized way to store and reference reusable text variables that can be used throughout your tools and agents. By creating a single source of truth for commonly used text elements, Snippets eliminate redundant updates and streamline your workflow.

Whether you’re managing company names, standard greetings, or complex message templates, Snippets make your text management more efficient and consistent across your entire AI ecosystem.

### Key Benefits

Snippets deliver several important advantages that enhance your workflow:

* **Centralized Text Management** – Store common strings (company names, greetings, standard messages) in one accessible location.
* **Universal Availability** – Use snippets anywhere a variable is accepted, including agents and tool inputs.
* **Single-Source Updates** – Edit once and update everywhere, eliminating the need to manually change the same text across multiple tools.
* **Simplified Architecture** – Eliminate ‘prop-drilling’ by making shared text easily accessible throughout your workspace.

### How It Works

Snippets integrate seamlessly into your existing workflow:

1. **Define a Snippet**: Create a named text variable in the Snippets section.
2. **Reference in Tools and Agents**: Use the `snippets.` prefix followed by your snippet name to reference it anywhere variables are accepted.
3. **Update Centrally**: When you need to change the text, update it once in the Snippets section, and the change propagates everywhere it’s used.

For example, you can reference a snippet using this syntax: `{{ snippets.company_name }}`

### Getting Started

Accessing and using Snippets is straightforward:

1. Navigate to the Snippets section in the left sidebar of your the platform workspace
2. Click “Create New Snippet”
3. Provide a descriptive name and the text content for your snippet
4. Save your snippet
5. Reference your snippet in tools and agents using the `{{ snippets.your_snippet_name }}` syntax

### Best Practices

To get the most out of Snippets, consider these recommended practices:

* **Use Descriptive Names**: Choose clear, intuitive names that indicate the snippet’s purpose (e.g., `company_name`, `support_email`, `legal_disclaimer`).
* **Categorize Related Snippets**: Use naming conventions to group related snippets (e.g., `email_header`, `email_signature`).
* **Document Usage**: Add comments within your tools and agents to indicate where snippets are being used.
* **Audit Regularly**: Periodically review your snippets to ensure they contain up-to-date information.
* **Consider Scope**: Create snippets for text that appears in multiple places or might need updating across tools.

### Use Cases

Snippets are particularly valuable in these scenarios:

* **Brand Consistency**: Maintain consistent company names, taglines, and messaging across all AI interactions.
* **Contact Information**: Store email addresses, phone numbers, and URLs that might change over time.
* **Standard Messages**: Create reusable templates for common responses, greetings, or disclaimers.
* **Compliance Text**: Manage legal disclaimers, privacy statements, or terms of service that must be consistent.
* **Personalization Elements**: Store reusable personalization templates that can be combined with dynamic data.

### Implementation Examples

#### Example 1: Company Information

```
// Define snippets
snippets.company_name = "Acme Corporation"
snippets.support_email = "support@acmecorp.com"
snippets.company_tagline = "Innovating for tomorrow, today."

// Use in agent prompt
"Thank you for contacting {{ snippets.company_name }}.
Our mission is {{ snippets.company_tagline }}
For additional support, please email {{ snippets.support_email }}."

```

#### Example 2: Email Templates

```
// Define snippets
snippets.email_greeting = "Hello and thank you for reaching out,"
snippets.email_signature = "Best regards,\\nThe Customer Success Team\\nAcme Corporation"

// Use in email tool
"{{ snippets.email_greeting }}

[Personalized response goes here]

{{ snippets.email_signature }}"

```

### Related Features

Agent Settings - Centralize your agent configurations for easier management, complementing snippets by providing a single source of truth for agent details.

Tool Version Control - Save and track changes to your tools, working alongside snippets to create more maintainable and professional tool experiences.

### Frequently asked questions (FAQs)

**Q: Can snippets contain formatting like bold or italics?**

A: Yes, snippets can contain Markdown formatting that will be rendered appropriately when used.

**Q: Is there a size limit for snippets?**

A: While there’s no strict character limit, snippets are designed for reusable text elements rather than entire documents.

**Q: Can I use variables within snippets?**

A: Snippets are primarily for static text, but you can combine them with other variables in your tools and agents.

**Q: How many snippets can I create?**

A: There’s no practical limit to the number of snippets you can create in your workspace.

**Q: Can I organize snippets into folders or categories?**

A: Currently, snippets are organized in a flat structure, but you can use naming conventions to create logical groupings.

