# The platform docs: `build/tools/tool-steps/python-code/`

2 pages, downloaded on 11/16/2026.


---

# Page: Python Helper Functions

Path: `build/tools/tool-steps/python-code/code-python-helper-functions`.

## Python Helper Functions

> Natively Supported Helper Functions

This client provides an interface to interact with the API. It includes functions to run various steps, insert and retrieve data, and upload temporary files.

### **Functions**

#### Insert data

```python title="Python"
insert_data(dataset_id: str, data: List[Dict[str, Any]])
```

Inserts data into a the platform dataset.

**Arguments**

* `dataset_id`: The ID of the dataset to insert into.
* `data`: A list of dictionaries containing the data to insert.

**Returns**

* The response from the API as a JSON object.

#### Retrieve data

```python title="Python"
retrieve_data(dataset_id: str, page_size: int = None, include_fields: List[str] = None)
```

Retrieves data from a the platform dataset.

**Arguments**

* `dataset_id`: The ID of the dataset to retrieve from.
* `page_size`: The number of results to return per page (optional).
* `include_fields`: A list of fields to include in the response (optional).

**Returns**

* The response from the API as a JSON object.

#### Retrieve All Data

```python title="Python"
retrieve_all(dataset_id: str, page_size: int = 1000, include_fields: List[str] = None) -> List[Dict[str, Any]]:
```

Retrieves all data from a the platform dataset, paginated to handle large datasets.

**Arguments**

* `dataset_id`: The ID of the dataset to retrieve from.
* `page_size`: The number of results to return per page. Defaults to 1000 (optional).
* `include_fields`: A list of fields to include in the response. Defaults to None (optional).

**Returns**

* A list of dictionaries containing the retrieved data. Each dictionary represents a document from the dataset.

Example

#### Upload a temporary file

```python title="Python"
insert_temp_file(file_path_or_bytes: str, ext: str = None)
```

Uploads a temporary file to the platform.

**Arguments**

* `file_path_or_bytes`: The path to the file or the file contents as bytes.
* `ext`: The file extension (optional).

**Returns**

* A dictionary containing the download URL of the uploaded file.

#### Prompt completion

```python title="Python"
prompt_completion(prompt: str, model: int = None)
```

Runs the `prompt_completion` step with the given prompt and model.

**Arguments**

* `prompt`: The prompt to complete.
* `model`: The model to use for completion (optional).

**Returns**

* The response from the API as a JSON object.

#### Run a step

```python title="Python"
run_step(step_name: str, params: Dict[str, Any])
```

Runs a the platform step with the given name and parameters.

**Arguments**

* `step_name`: The name of the step to run.
* `params`: A dictionary of parameters to pass to the step.

**Returns**

* The response from the API as a JSON object.

### **Classes**

#### Integration

```python title="Python"
Integration(provider_name: str, account_id: str)
```

The `Integration` class provides a convenient way to make authenticated API calls to OAuth-connected services in your Python code. It automatically handles OAuth token management and makes authenticated requests to third-party APIs.

**Constructor Arguments**

* `provider_name`: The name of the OAuth provider/integration (e.g., `'dataforseo'`, `'hubspot'`, `'slack'`).
* `account_id`: The account ID from your OAuth account input. This is accessed via `params['your_oauth_input_name']` where `your_oauth_input_name` is the variable name of your OAuth account input.

**Methods**

##### api\_call()

```python title="Python"
integration.api_call(method: str, url: str, body: Dict[str, Any] = None, headers: Dict[str, str] = None, params: Dict[str, Any] = None)
```

Makes an authenticated HTTP request to the specified URL using the OAuth credentials associated with the integration.

**Arguments**

* `method`: The HTTP method to use (e.g., `'GET'`, `'POST'`, `'PUT'`, `'DELETE'`).
* `url`: The full URL endpoint to make the request to.
* `body`: Optional dictionary or list containing the request body (for POST, PUT, etc.). Supports both JSON objects (dictionaries) and JSON arrays (lists). Will be automatically serialized to JSON.
* `headers`: Optional dictionary of additional HTTP headers to include in the request.
* `params`: Optional dictionary of query parameters to append to the URL.

**Returns**

* The API response as a parsed JSON object (dictionary). The response is automatically parsed, so you can directly access the data without additional JSON parsing.

### **Usage Examples**

#### Insert data

```python title="Python"
data = [{"field1": "value1", "field2": "value2"}, {"field1": "value3", "field2": "value4"}]
response = insert_data("my_dataset", data)
```

#### Retrieve data

```python title="Python"
response = retrieve_data("my_dataset", page_size=10, include_fields=["field1", "field2"])
```

#### Retrieve all

```python title="Python"
response = retrieve_all("my_dataset", page_size=500, include_fields=["field1", "field2"])
```

#### Upload a temporary file

Note: Make sure to replace the `region` variable with your actual region.

```python title="Python"
file_path = "path/to/file.txt"
response = insert_temp_file(file_path)
```

#### Prompt completion

```python title="Python"
response = prompt_completion("My prompt", model="openai-gpt35")
```

#### Run a step

```python title="Python"
response = run_step("my_step", {"param1": "value1", "param2": "value2"})
```

#### Integration

```python title="Python"
## Get OAuth account ID from input parameter
account_id = params['my_oauth_account']

## Create Integration instance

## Make authenticated API call with object body
response = integration.api_call(
    method='GET',
    params={'limit': 10}
)

## Access the parsed JSON response
user_info = response
```

#### Integration with Array Body

```python title="Python"
## Example: Bulk update operation with array body
account_id = params['my_oauth_account']
integration = Integration('confluence', account_id)

## Make API call with array body
response = integration.api_call(
    method='PUT',
    url='https://your-domain.atlassian.net/wiki/api/v2/pages/123/properties',
    body=[
        {"key": "status", "value": "reviewed"},
        {"key": "priority", "value": "high"}
    ],
    headers={'accept': 'application/json'}
)
```


---

# Page: Python Tool step

Path: `build/tools/tool-steps/python-code/code-python`.

## Python Tool step

> Empower your agent with custom code using one of the world's most popular and beginner-friendly languages

The Python Tool step allows you to use Python to take outputs from other Tool steps and manipulate data for other Tool steps and LLMs.

<Warning>
  In order to use this Tool step, we would recommend having a beginner level of understanding of Python programming, or use our Chat to walk you through implementing it at 

  <your-server-url>

  .
</Warning>

### What is Python?

Python is a widely used programming language known for its clarity and simplicity. It’s popular among beginners and experts alike because it’s easy to read, quick to write, and versatile enough for tasks ranging from web development and automation to data analysis and machine learning. With a massive library ecosystem and strong community support, Python is a powerful tool for solving real-world problems efficiently.

### Python Package Ecosystem

One of Python’s greatest strengths is its extensive package ecosystem. You can install and use any package available on the [Python Package Index (PyPI)](https://pypi.org/), which hosts over 693,000 projects with millions of releases. This means you have access to virtually any functionality you need across countless domains.

#### Popular Packages by Use Case

<AccordionGroup>
  <Accordion title="Data Analysis & Manipulation">
    * `pandas` - Data manipulation and analysis
    * `numpy` - Numerical computing and arrays
    * `matplotlib` - Data visualization and plotting
    * `seaborn` - Statistical data visualization
    * `plotly` - Interactive data visualization
  </Accordion>

  <Accordion title="Web Scraping & HTTP Requests">
    * `requests` - HTTP library for making web requests
    * `beautifulsoup4` - Web scraping and HTML parsing
    * `scrapy` - Web crawling framework
    * `selenium` - Browser automation and testing
  </Accordion>

  <Accordion title="Machine Learning & AI">
    * `scikit-learn` - Machine learning library
    * `tensorflow` - Deep learning framework
    * `pytorch` - Deep learning and neural networks
    * `transformers` - Pre-trained language models
    * `openai` - OpenAI API client
  </Accordion>

  <Accordion title="Data Processing & File Handling">
    * `openpyxl` - Excel file manipulation
    * `python-docx` - Word document processing
    * `PyPDF2` - PDF file manipulation
    * `pillow` - Image processing library
    * `csv` - Built-in CSV file handling
  </Accordion>

  <Accordion title="API Integration & Communication">
    * `flask` - Lightweight web framework
    * `fastapi` - Modern web API framework
    * `requests-oauthlib` - OAuth authentication
    * `twilio` - SMS and communication APIs
    * `stripe` - Payment processing
  </Accordion>

  <Accordion title="Database & Storage">
    * `sqlalchemy` - SQL toolkit and ORM
    * `psycopg2` - PostgreSQL adapter
    * `pymongo` - MongoDB driver
    * `redis` - Redis database client
  </Accordion>
</AccordionGroup>

To find and explore available packages, visit [PyPI.org](https://pypi.org/) where you can search through the vast collection of Python packages. Simply add any package you need to your Python Tool step using the ‘PyPI Packages’ section.

### Adding the Python Tool step into your Tool

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cmbyqj44egw7vsn1rldrjxvxh" frameBorder="0" title="Add the Python Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

You can add the Python Tool step to your Tool by:

1. Creating a new Tool, then clicking or searching for the Python Tool step
2. Click ’+ New item’ under ‘PyPI Packages’ if you need to install any packages, and enter the package name you need.
3. Enter your code in the ‘Code’ field, including any imports you need.
4. Click ‘Run step’ to run the Tool step

<Info>
  In order to access the output of this codeblock, you will need to return a value in the 

  `return`

   statement.
</Info>

### Accessing variables

You can access Tool input variables, other Tool step outputs, and API keys you’ve created in the platform in your Python Tool step.

#### Input variables

You can access Input variables by simply using the variable name directly, where ‘name’ is the variable for your input.

```python
name
```

#### Other Tool step outputs

You can access other Tool step outputs by using the variable name directly, where ‘llm’ is the variable for the Tool step you’re trying to access the output of.

```python
llm
```

This returns the full output object. To access a specific field within that output, use dictionary notation:

```python
llm["answer"]
```

For example, if an LLM step returns `{"answer": "Hello!"}`, then:

* `llm` returns `{"answer": "Hello!"}`
* `llm["answer"]` returns `"Hello!"`

#### API keys

You can access one of your saved API keys by using this syntax, where ‘api\_key’ is the title of your API key.

```python
"{{secrets.chains_api_key}}"
```

### OAuth Authentication

Python code steps support OAuth authentication through the `Integration` helper class, allowing you to make authenticated API calls to third-party services without manually managing OAuth tokens.

To use OAuth authentication:

1. Add an OAuth account input to your tool and assign it a variable name
2. Access the account ID in your Python code via `params['your_oauth_input_name']`
3. Create an `Integration` instance with the provider name and account ID
4. Use the `api_call()` method to make authenticated requests

For complete documentation on the `Integration` class, including detailed examples, method parameters, and best practices, see the [Python Helper Functions documentation](build__tools__tool-steps__python-code.md) (page `build/tools/tool-steps/python-code/code-python-helper-functions`).

<Note>
  While Python code steps can use OAuth authentication through the Integration helper class, they do not support User Level Authentication. If you need individual users to authenticate with their own accounts, you should use dedicated OAuth-based tool steps instead of Python code.
</Note>

### Advanced Settings

<Note>
  Several advanced settings (Session ID, Number of GPUs, Number of CPU Cores, Memory Size, and Session Timeout) are only available when the backend is set to ‘Modal Labs’.
</Note>

#### Backend

You can choose between two backend services to run the code, ‘Modal Labs’ or ‘Daytona’.

#### Runtime Commands

You can include a list of Linux terminal commands to be run before running your code.

#### Session ID

Define a custom session that saves all local variables between Python executions.

#### Enable ‘Long Output’ Mode

Allow the output to be longer than 127,000 characters, in exchange for 2-4 seconds of extra latency.

#### Number of GPUs

Allows you to specify a number of GPUs for your code to use.

#### Number of CPU Cores

Allows you to specify a number of CPU cores for your code to use.

#### Memory Size

Allows you to specify an amount of RAM for your code to use.

#### Session Timeout

Allows you to specify (in seconds) how long the code should run before timing out.

#### Raise Error

Allows you to specify how errors are raised:

* **Error with Full Traceback** - Shows the complete error traceback including file names, line numbers, and the full call stack. This is useful for debugging complex issues.
* **Error** - Shows only the error message without the detailed traceback. This provides a cleaner output for production use.
* **Print Error to Stderr** - Prints the error to stderr instead of raising it, allowing your code to continue execution even when errors occur.

#### Enable fallback

If the selected backend fails, when this is selected, your code will attempt to run via the other backend.

### Common errors

<AccordionGroup>
  <Accordion title="Code execution timed out">
    This error indicates that the code took longer than the seconds allowed in the ‘Session timeout’ Advanced Setting, or exceeded our hard limit of four hours.
  </Accordion>

  <Accordion title="No return statement">
    This error indicates that there is no return statement in the code. You will not be able to access the output of this codeblock unless you pass data in a return statement. If the transformed section of the output is showing `null`, it means that there is nothing being returned from your code.

    ```
    WARNING: There is no return statement in this code. To access the output of this codeblock, return a value.
    ```
  </Accordion>
</AccordionGroup>

### Additional resources

<Columns cols="2">
  <Card title="Helper Functions" href="build__tools__tool-steps__python-code.md">
    Access functions that can help you code Python Tool steps
  </Card>

  <Card title="Transformations" >
    Use in-built Tool steps in Python
  </Card>
</Columns>

