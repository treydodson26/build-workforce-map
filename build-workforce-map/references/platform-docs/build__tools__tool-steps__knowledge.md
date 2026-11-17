# The platform docs: `build/tools/tool-steps/knowledge/`

7 pages, downloaded on 11/16/2026.


---

# Page: Advanced Knowledge Search (2m context)

Path: `build/tools/tool-steps/knowledge/advanced-knowledge-search-2m`.

## Advanced Knowledge Search (2m context)

> The 'Advanced Knowledge Search (2m context)' Tool allows you to search your knowledge table with a prompt using CAG

### Add the ‘Advanced Knowledge Search (2m)’ Tool step to your Tool

<div style="{ width:"100%",position:"relative","padding-top":"56.75%",paddingTop:"75%" }">
  <iframe src="https://app.supademo.com/embed/cmcwogmal1l5n9emp09x9eqv7" frameBorder="0" title="Add the Advanced Knowledge Search (2m) Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px",objectFit:"cover" }" />
</div>

You can add the ‘Advanced Knowledge Search (2m context) Tool’ step to your Tool by:

1. Creating a new Tool, then searching for the Advanced Knowledge Search (2m context) Tool step.
2. Click “Expand” to see the full Tool step.
3. Enter your search query in the **Query** field.
4. Select the knowledge source you would like to use.
5. Select your Gemini model *(currently there are only 2 models available)*

### Advanced settings

#### System prompt

The system prompt is the very first message in a conversation that instructs the model on its role or the personality of the AI. Examples can be expert researcher, analyst or tutor.

#### Temperature

The temperature setting controls how “creative” or “random” the model’s responses will be. Lower temperatures make the model more focused and deterministic, while higher temperatures make it more creative and unpredictable.

#### Enable Grounding

Grounding integrates web search results to inform and support the model’s responses.

#### Page size

Page size controls the number of documents that will be retrieved from the knowledge set.


---

# Page: Delete Knowledge

Path: `build/tools/tool-steps/knowledge/delete-knowledge`.

## Delete Knowledge

> The 'Delete Knowledge' Tool step allows your agent to remove information from your knowledge table — making it easy to manage and keep your data relevant and up to date.

***

### Add the ‘Delete Knowledge’ Tool step to your Tool

<div style="{ width:"100%",position:"relative","padding-top":"56.75%",paddingTop:"75%" }">
  <iframe src="https://app.supademo.com/embed/cmcsl75ju0e0e9st8xzau7o3z?embed_v=2" frameBorder="0" title="Add the Delete Knowledge Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px",objectFit:"cover" }" />
</div>

You can add the ‘Delete Knowledge’ Tool step to your Tool by:

1. Creating a new Tool, then clicking `+ Add Step`
2. Searching for and adding the ‘Delete Knowledge’ Tool step
3. Clicking ‘Expand’ to see the full Tool step
4. Selecting the knowledge table you would like to access
5. Filter condition: “and” vs “or” when matching data to delete:

   * Use `and` when all specified conditions must match for a row to be deleted.
   * Use `or` when any of the conditions can match.

   <Note>
     Filter condition only applies if you include more than one object in the filter
   </Note>
6. Filters: Accepts a JSON selection of objects, where each object corresponds to a row. Add more objects as outlined in the formatting examples below to delete multiple rows at once.
7. Click `Run step` to test out the Tool

### Common errors

<Accordion title="Formatting issues">
  This indicates that there is a formatting issue in the “Filters” input field. Make sure your object is formatted correctly. `Expected property name or '}' in JSON at...`
</Accordion>

<Accordion title="Incorrect data type">
  This means the Filter being used is not a JSON. `Invalid JSON`
</Accordion>

### Formatting Examples

#### Example 1: Delete single condition

```json
// All poodles will be deleted
[
  {
    "breed": "poodle"
  }
]
```

#### Example 2: Delete single condition

```json
// All small poodles will be deleted
[
  {
    "breed": "poodle",
	"size": "small"
  }
]
```

#### Example 3: Delete multiple conditions (*or*)

```json
// All small poodles will be deleted AND any dog aged 4 will be deleted
[
  {
    "breed": "poodle",
    "size": "small"
  }, 
  {
    "age": 4
  }
]
```

#### Example 3: Delete multiple conditions (*and*)

```json
// Only small poodles that are aged 4 will be deleted
[
  {
    "breed": "poodle",
    "size": "small"
  }, 
  {
    "age": 4
  }
]
```

<Note>
  Ensure to separate each object with a comma if inserting multiple rows.
</Note>

### Using Variables in JSON

You can use variables from Tool inputs and other Tool steps in the **Filters** field. For detailed information on how to use variables in JSON for Knowledge Tool steps, including variable syntax and typing, see [Using Variables in JSON](build__tools__tool-steps__knowledge.md) (page `build/tools/tool-steps/knowledge/using-variables-in-json`).

For Knowledge Tool steps, all variables should be wrapped in quotes in the JSON format: `"{{variable_name}}"`. The filter values will be matched against your knowledge table data based on the column types.

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="What's the difference between using 'AND' and 'OR'?">
    * Use **AND** when *all* filter conditions must be true for a row to be deleted.
    * Use **OR** when *any* one of the conditions can match.

    <Note>
      This only applies when you include more than one object in the filter array.
    </Note>
  </Accordion>

  <Accordion title="Can I delete multiple rows at once?">
    Yes. Any row that matches the filter condition you have specified will be deleted.
  </Accordion>

  <Accordion title="What if my filters don't match any rows?">
    If no rows match the provided conditions, no data will be deleted. Make sure your filter values exactly match the data in the knowledge set (e.g., casing, field names, etc.).
  </Accordion>
</AccordionGroup>


---

# Page: Get Knowledge

Path: `build/tools/tool-steps/knowledge/get-knowledge`.

## Get Knowledge

> The Get Knowledge feature allows you to search and retrieve information directly from your knowledge table without RAG

### Add the ‘Get Knowledge’ Tool step to your Tool

<div style="{ width:"90%",position:"relative",paddingTop:"75%" }">
  <iframe src="https://app.supademo.com/embed/cmd2oyxum341oc4kj3skjizmf" frameBorder="0" title="Add the Get Knowledge Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px",objectFit:"cover" }" />
</div>

You can add the Get Knowledge’ Tool step to your Tool by:

1. Creating a new Tool, then clicking `+ Add Step`
2. Searching for and addingthe ‘Get Knowledge’ Tool step
3. Clicking ‘Expand’ to see the full Tool step
4. Selecting the Knowledge table you would like to access
5. Filter condition: “and” vs “or” when matching data to update:
   * Use **and** when all specified conditions must match for a row to be deleted.
   * Use **or** when any of the conditions can match.
   <Note>
     Filter condition only applies if you include more than one object in the filter
   </Note>
6. Filters: Accepts a JSON selection of objects, where each object corresponds to a row. Add more objects as outlined in the formatting examples below to delete multiple rows at once.
7. Click `Run step` to test out the Tool

### Advanced settings

#### Fields to include

This is the fields (columns) that will be included in the response. By default, all fields are included.

<Tip>
   When targeting a specific field, you will need to prefix each field with 

  `data.`

  . For example, if you have a field name 

  `breed`

  , you will instead use 

  `data.breed`

  . 
</Tip>

#### Number of records to retrieve

This is the number of records to retrieve. By default, **20** records are retrieved.

### Common errors

<AccordionGroup>
  <Accordion title="Formatting issues">
    This indicates that there is a formatting issue in the “New data to insert” input field. Make sure your object is formatted correctly. `Expected property name or '}' in JSON at...`
  </Accordion>

  <Accordion title="Incorrect data type">
    This means the data being inserted into the knowledge table is not a JSON. `Invalid JSON`
  </Accordion>
</AccordionGroup>

### Formatting Examples

#### Example 1: Retrieve all large dogs

```json
[
  {
    "size": "large"
  }
]
```

#### Example 2: Retrieve all large French Bulldogs

```json
[
  {
    "breed": "French Bulldog",
    "size": "large"
  },
]
```

#### Example 3: Retrieve all large dogs OR small poodles

```json
[
  {
    "size": "large",
    "breed": "French Bulldog"
  },
  {
    "size": "small",
    "breed": "poodle"
  }
]
```

<Note>
  Ensure to separate each object with a comma if inserting multiple rows.
</Note>

### Using Variables in JSON

You can use variables from Tool inputs and other Tool steps in the **Filters** field. For detailed information on how to use variables in JSON for Knowledge Tool steps, including variable syntax and typing, see [Using Variables in JSON](build__tools__tool-steps__knowledge.md) (page `build/tools/tool-steps/knowledge/using-variables-in-json`).

For Knowledge Tool steps, all variables should be wrapped in quotes in the JSON format: `"{{variable_name}}"`. The filter values will be matched against your knowledge table data based on the column types.

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="What is the difference between get knowledge and advanced knowledge search?">
    Get knowledge allows you to search and retrieve information directly from your knowledge table without RAG.
  </Accordion>

  <Accordion title="What format should I use for the filter?">
    The filter should be a JSON array of objects. Each object should have the field name and the value you want to filter by.
  </Accordion>

  <Accordion title="What's the difference between using 'AND' and 'OR'?">
    * Use **AND** when *all* filter conditions must be true for a row to be retrieved.
    * Use **OR** when *any* one of the conditions can match.

    <Note>
      This only applies when you include more than one object in the filter array.
    </Note>
  </Accordion>
</AccordionGroup>


---

# Page: Insert Knowledge

Path: `build/tools/tool-steps/knowledge/insert-knowledge`.

## Insert Knowledge

> The 'Insert Knowledge' Tool step lets your agent save information by adding new rows to your knowledge table—making it easy to capture and store data dynamically.

### Add the ‘Insert Knowledge’ Tool step to your Tool

<div style="{ width:"100%",position:"relative","padding-top":"56.75%",paddingTop:"75%" }">
  <iframe src="https://app.supademo.com/embed/cmcskqz8x0dx09st8u6v0t5ka" frameBorder="0" title="Add the Insert Knowledge Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px",objectFit:"cover" }" />
</div>

You can add the ‘Insert Knowledge’ Tool step to your Tool by:

1. Creating a new Tool, then clicking `+ Add Step`
2. Searching for and adding the ‘Insert Knowledge’ Tool step
3. Clicking ‘Expand’ to see the full Tool step
4. Selecting the Knowledge table you would like to access
5. New data to insert: Accepts a JSON selection of objects, where each object corresponds to a row. Add more objects as outlined in the formatting examples below to insert multiple rows at once.
6. Use the **Sync on upload** field to determine whether the data should be vectorized when added to the knowledge set. In most cases, you’ll want this enabled as it allows your agents to semantically search and retrieve relevant information from your knowledge table.
7. Click `Run step` to test out the Tool

### Common errors

<Accordion title="Formatting issues">
  This indicates that there is a formatting issue in the “New data to insert” input field. Make sure your object is formatted correctly. `Expected property name or '}' in JSON at...`
</Accordion>

<Accordion title="Incorrect data type">
  This means the data being inserted into the knowledge table is not a JSON. `Invalid JSON`
</Accordion>

<Accordion title="Tool input type mismatch">
  When creating a Tool that wraps the Insert Knowledge Tool step for use with AI agents, ensure the Tool input for new data is configured as a **JSON input type** rather than a Text input. The Insert Knowledge Tool step expects a JSON array of objects (as shown in the formatting examples above), so the Tool input should match this format to properly pass data from agents to the step.

  When setting up the Tool input:

  * Use the **JSON** input type (not Text)
  * Optionally provide a JSON Schema that matches the structure of your knowledge table to guide agents on the expected format
  * Reference the Tool input variable in the Insert Knowledge Tool step’s **New data to insert** field using variable mode (`{{input_variable_name}}`)

  This ensures that the data format passed from the Tool input to the Tool step remains consistent and properly structured.
</Accordion>

### Formatting Examples

#### Example 1: Insert single row

```json
[
  {
    "breed": "poodle",
    "size": "small"
  }
]
```

#### Example 2: Insert multiple rows

```json
[
  {
    "breed": "poodle",
    "size": "small"
  }, 
  {
    "breed": "great dane",
    "size": "large"
  }
]
```

<Note>
  Ensure to separate each object with a comma if inserting multiple rows.
</Note>

### Using Variables in JSON

You can use variables from Tool inputs and other Tool steps in the **New data to insert** field. For detailed information on how to use variables in JSON for Knowledge Tool steps, including variable syntax and typing, see [Using Variables in JSON](build__tools__tool-steps__knowledge.md) (page `build/tools/tool-steps/knowledge/using-variables-in-json`).

For Knowledge Tool steps, all variables should be wrapped in quotes in the JSON format: `"{{variable_name}}"`. The type of the inserted value is determined by the column type defined in your knowledge table.

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="What happens if I don't enable 'Sync on Upload'?">
    If “Sync on Upload” is disabled, the data will be stored but not vectorized. This means your agents won’t be able to semantically search or reference that data until you manually vectorize it.
  </Accordion>

  <Accordion title="Can I update or delete rows later?">
    Yes. After inserting data, you can manage your knowledge set using the available tools this includes updating or deleting rows as needed.
  </Accordion>

  <Accordion title="What data types can I insert?">
    You can insert text, numbers, booleans, or any JSON-serializable value. Just make sure each object in the array follows the correct formatting.
  </Accordion>
</AccordionGroup>


---

# Page: Knowledge Search

Path: `build/tools/tool-steps/knowledge/knowledge-search`.

## Knowledge Search

> The 'Knowledge Search' Tool allows you to search knowledge tables with RAG

### Add the ‘Knowledge Search’ Tool step to your Tool

<div style="{ width:"90%",position:"relative",paddingTop:"55%" }">
  <iframe src="https://app.supademo.com/embed/cmd7198g26fevc4kjjsus430b?embed_v=2" frameBorder="0" title="Add the Knowledge Search tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px",objectFit:"cover" }" />
</div>

You can add the ‘Knowledge Search’ Tool step to your Tool by:

1. Creating a new Tool, then searching for the Knowledge Search Tool step.
2. Click “Expand” to see the full Tool step.
3. Select the Knowledge set to use.
4. Enter your search query in the **Query** field.
5. Select the search type:
   * **Vector**: Finds results based on meaning (semantic similarity). Great when you want answers even if the exact words don’t match.
   * **Keyword**: Finds results based on exact word match. Useful when looking for specific terms or phrases.

### Advanced Settings

#### Vector field

The vector field is the column used for searching your knowledge set using semantic similarity. By default, all fields are included unless you choose specific ones.

#### Output all fields

* When enabled, all fields from your knowledge set will be shown - including the similarity score.
* When disabled, only the main content field is returned.

#### Page size

The number of results to return.

#### Similarity threshold

All results are given a score between 0 and 1 based on how similar the result is to your query. This threshold is the minimum score for a result to be returned.

<Tip>
  Increase this value to get fewer but more accurate results. Lower it to be
  more inclusive.
</Tip>

#### Raw filters

If you want to filter your search to a specific subset of entries in your knowledge set, you can use raw filters. Filters are defined as JSON objects.

**OR Logic with Arrays:** When using `exact_match` filter type, you can pass an array to the `condition_value` field to create OR semantics. This allows you to match records where the field equals ANY value in the array.

**Examples:**

* Single value: `"condition_value": "x"` → matches records where field equals x
* Array value: `"condition_value": ["a", "b"]` → matches records where field equals a OR b

**Example filter with OR logic:**

```json
{
  "field": "call_id",
  "filter_type": "exact_match",
  "condition": "==",
  "condition_value": ["45eb244f-5008-4b7f-bfab-6f4db2189d2e", "4a678557-700e-407f-ab62-23d0decf1b52"]
}
```

This filter will return results where `call_id` matches either of the two provided values.

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="What is the difference between Knowledge Search and Advanced Knowledge Search?">
    * Knowledge Search is easier to use out of the box, with sensible default
      options that work well for most use cases. - Advanced Knowledge
      Search gives you
      greater control and fine-tuning capabilities for more precise retrieval —
      but may be slower in comparison.
  </Accordion>

  <Accordion title="When should I use Advanced Knowledge Search instead of the regular one?">
    * If you’re unsure which to choose, start with Knowledge Search. - Knowledge
      search works better out of the box, whilst advanced knowledge search gives
      you more control and fine-tuning options.
  </Accordion>
</AccordionGroup>


---

# Page: Update Knowledge

Path: `build/tools/tool-steps/knowledge/update-knowledge`.

## Update Knowledge

> The 'Update Knowledge' Tool step lets you update existing rows in your knowledge table—making it easy to keep your data current and accurate.

### Add the ‘Update Knowledge’ Tool step to your Tool

<div style="{ width:"95%",position:"relative",paddingTop:"62.5%" }">
  <iframe src="https://app.supademo.com/embed/cmcu7bc9z1pd69st851b05iwu" frameBorder="0" title="Add the Update Knowledge Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px",objectFit:"cover" }" />
</div>

You can add the ‘Update Knowledge’ Tool step to your Tool by:

1. Creating a new Tool, then clicking `+ Add Step`
2. Searching for and adding the ‘Update Knowledge’ Tool step
3. Clicking ‘Expand’ to see the full Tool step
4. Selecting the knowledge table you would like to access
5. Filter condition: “and” vs “or” when matching data to update:
   * Use `and` when all specified conditions must match for a row to be updated.
   * Use `or` when any of the conditions can match.
   <Note>
     Filter condition only applies if you include more than one object in the filter
   </Note>
6. Filters: Accepts a JSON selection of objects, where each object corresponds to a row. Add more objects as outlined in the formatting examples below to match multiple rows at once.
7. Update value: Provide an object with the new values to update. Each key should match a column name in your knowledge table, and its corresponding value will replace the current value in the matching row.
8. Use the **Sync on upload** field to determine whether the data should be vectorized when added to the knowledge set. In most cases, you’ll want this enabled as it allows your agents to semantically search and retrieve relevant information from your knowledge table.
9. Click `Run step` to test out the Tool

### Common errors

<Accordion title="Formatting issues">
  This indicates that there is a formatting issue in the “New data to insert” input field. Make sure your object is formatted correctly. `Expected property name or '}' in JSON at...`
</Accordion>

<Accordion title="Incorrect data type">
  This means the data being inserted into the knowledge table is not a JSON. `Invalid JSON`
</Accordion>

### Formatting Examples

#### Example 1: Replace all poodles with bulldogs

```json
// Filters
[
  {
    "breed": "poodle"
  }
]
```

```json
// Update value
[
  {
    "breed": "bulldog"
  }
]
```

#### Example 2: Replace all small poodles with large bulldogs

```json
// Filters
[
  {
    "breed": "poodle",
    "size": "small"
  }
]
```

```json
// Update value
[
  {
    "breed": "bulldog",
    "size": "large"
  }
]
```

#### Example 3: Replace all poodles *and* bulldogs with cats

```json
// Filters
[
  {
    "breed": "poodle"
  },
  {
    "breed": "bulldog"
  }
]
```

```json
// Update value
[
  {
    "breed": "cat"
  }
]
```

<Note>
  Ensure to separate each object with a comma if filtering multiple rows.
</Note>

### Using Variables in JSON

You can use variables from Tool inputs and other Tool steps in the **Filters** and **Update value** fields. For detailed information on how to use variables in JSON for Knowledge Tool steps, including variable syntax and typing, see [Using Variables in JSON](build__tools__tool-steps__knowledge.md) (page `build/tools/tool-steps/knowledge/using-variables-in-json`).

For Knowledge Tool steps, all variables should be wrapped in quotes in the JSON format: `"{{variable_name}}"`. The type of the updated value is determined by the column type defined in your knowledge table, and values will be automatically converted to match the column type during the update.

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="What happens if I don't enable 'Sync on Upload'?">
    If “Sync on Upload” is disabled, the data will be stored but not vectorized. This means your agents won’t be able to semantically search or reference that data until you manually vectorize it.
  </Accordion>

  <Accordion title="How do I update a field to be empty/blank?">
    You can update a field to be empty/blank by setting the value to empty quote marks `""`.
  </Accordion>

  <Accordion title="What data types can I update with?">
    You can use text, numbers, booleans, or any JSON-serializable value. Just make sure each object in the array follows the correct formatting.
  </Accordion>
</AccordionGroup>


---

# Page: Using Variables in JSON

Path: `build/tools/tool-steps/knowledge/using-variables-in-json`.

## Using Variables in JSON

> Learn how to use variables from Tool inputs and other Tool steps in JSON fields for Knowledge Tool steps

When building Tools with Knowledge Tool steps (Insert, Update, Get, Delete Knowledge), you can reference inputs from Tool inputs or outputs from other Tool steps using variable syntax `{{variable_name}}`. This allows you to dynamically insert data from previous steps or user inputs into your knowledge operations.

### Variable Syntax

You can reference:

* **Tool inputs**: `{{input_variable_name}}`
* **Previous Tool step outputs**: `{{steps.step_name.output.variable_name}}`

Press the **{}** button next to any JSON input field to switch to variable mode and reference these values.

### Variable Typing for Knowledge Tool Steps

For Knowledge Tool steps (Insert, Update, Get, Delete), **all variables should be wrapped in quotes** in the JSON format: `"{{variable_name}}"`.

The type of the inserted value is determined by the column type defined in your knowledge table. The system will automatically convert the value to match the column type during insertion.

Make sure the column types in your knowledge table match the data types you want to store:

* **Number columns**: Values will be converted to numbers on insert, even though they’re quoted in the JSON
* **Text/String columns**: Values will be stored as text
* **Boolean columns**: Values will be stored as booleans

### Examples

#### Example: Using Variables in Filters

```json
[
  {
    "breed": "{{user_breed_input}}",
    "size": "{{user_size_input}}",
    "age": "{{previous_step.output.age}}"
  }
]
```

#### Example: Using Variables in Data Objects

```json
[
  {
    "breed": "{{user_breed_input}}",
    "size": "{{user_size_input}}",
    "age": "{{user_age_input}}",
    "weight": "{{previous_step.output.weight}}",
    "is_active": "{{previous_step.output.is_active}}"
  }
]
```

In these examples, all variables are wrapped in quotes as required for Knowledge Tool steps. The final type depends on your knowledge table column types:

* If the `breed` and `size` columns are text columns, the values will be inserted as strings
* If the `age` and `weight` columns are number columns, the values will be converted to numbers on insert, even though they’re quoted in the JSON
* The `is_active` column type determines whether the value is stored as a boolean

### Variable Typing for Other Tool Steps

**Note**: When passing values to other Tool steps that accept JSON input (not Knowledge Tool steps), the typing works differently:

* `"{{variable}}"` will be passed as a string
* `{{variable}}` (without quotes) will be passed as a number or boolean. The JSON input box may show a syntax error, but it will still run correctly.

### See Also

* [Insert Knowledge](build__tools__tool-steps__knowledge.md) (page `build/tools/tool-steps/knowledge/insert-knowledge`)
* [Update Knowledge](build__tools__tool-steps__knowledge.md) (page `build/tools/tool-steps/knowledge/update-knowledge`)
* [Get Knowledge](build__tools__tool-steps__knowledge.md) (page `build/tools/tool-steps/knowledge/get-knowledge`)
* [Delete Knowledge](build__tools__tool-steps__knowledge.md) (page `build/tools/tool-steps/knowledge/delete-knowledge`)

