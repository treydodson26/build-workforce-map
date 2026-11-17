# The platform docs: `build/tools/tool-steps/`

9 pages, downloaded on 11/16/2026.


---

# Page: API Tool step

Path: `build/tools/tool-steps/api`.

## API Tool step

> Use the API Tool step to run a custom API call to another product / service

The API Tool step allows you to run a custom API call to any another product / service. These are best used to integrate with products / services that the platform doesn’t have dedicated integrations for, but can be used for any product / service.

### What is an API?

Think of an API like a waiter in a restaurant. You (the user) look at the menu (a list of what’s possible), place your order with the waiter (the API), and then the kitchen (the system or server) prepares the food and the waiter brings it back to you.

In the tech world, an API is a set of rules that allows one piece of software (like an app) to talk to another (like a server).

<Warning>
  In order to use this Tool step, we would recommend having a beginner level of understanding of what an API is, and how to use them. You can also use the Invent feature to help you use this Tool step to integrate with different products and services.
</Warning>

### Add the API Tool step to your Tool

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cmbrnltuicghjsn1rf9edki66" frameBorder="0" title="Add the API Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

You can add the API Tool step to your Tool by:

1. Creating a new Tool, then searching for the ‘API’ Tool step
2. Click ‘Expand’ to see the full Tool step
3. Select the method you wish to use for your API call
4. Enter the URL / pathway / endpoint you want to call
5. Add headers, body and URL parameters as needed for your API call
6. Click ‘Run step’ to run the Tool step (see [Configuring the Request Body](#configuring-the-request-body) for details on body formatting)

#### Configuring the Request Body

The Body field accepts JSON data for POST, PUT, PATCH, and other HTTP methods that support request bodies. Both JSON objects and JSON arrays are supported as top-level request bodies.

**JSON Objects** (most common):

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin"
}
```

**JSON Arrays** (for bulk operations or APIs that require array format):

```json
[
  {
    "id": 1,
    "status": "active"
  },
  {
    "id": 2,
    "status": "inactive"
  }
]
```

<Info>
  The request body is automatically serialized to JSON when sent to the API. You don’t need to manually stringify the data.
</Info>

**When to use objects vs. arrays:**

* Use **objects** for single-item operations (creating one user, updating one record)
* Use **arrays** for bulk operations (creating multiple items at once) or when the API specifically requires an array format (e.g., some Confluence endpoints)

### Example API Call Configurations

#### Object Body Example

Most APIs accept JSON objects for single-item operations. Here’s an example of creating a user:

**Method**: POST\
**URL**: `https://api.example.com/users`\
**Headers**:

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_TOKEN"
}
```

**Body**:

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Array Body Example

Some APIs require array bodies for bulk operations or specific endpoints. Here’s an example using the Confluence API to update page properties:

**Method**: PUT\
**URL**: `https://your-domain.atlassian.net/wiki/api/v2/pages/{pageId}/properties`\
**Headers**:

```json
{
  "Content-Type": "application/json",
  "Accept": "application/json"
}
```

**Body**:

```json
[
  {
    "key": "property-key-1",
    "value": "property-value-1"
  },
  {
    "key": "property-key-2",
    "value": "property-value-2"
  }
]
```

<Tip>
  Always check the API documentation for your specific endpoint to determine whether it expects an object or array body format.
</Tip>

### Advanced Settings

#### Response format

Allows you to select the format of the response. You can choose from:

* string
* json
* arrayBuffer
* blob

#### Cookies

Allows you to add cookies to send with the request.

#### Throw error on 4xx/5xx response

When checked, throws an error when the API response contains a 4xx/5xx response code.

### Common errors

<AccordionGroup>
  <Accordion title="Missing scopes">
    The “missing scopes” API error code generally indicates that the access token or credentials used in the API request do not include the necessary permissions (scopes) required to perform the requested action. This usually indicates your API key / token is missing, or you may not have the access to perform the call you’re attempting.
  </Accordion>

  <Accordion title="Invalid values">
    An “invalid values” API error generally occurs when one or more of the parameters or fields in your API request contain data that doesn’t conform to the expected format, type, or allowed range defined by the API. This can also occur when your request hasn’t filled out a mandatory / required field for the API call. To fix this, make sure all required fields have been added to your call, and your parameters match the expected format (e.g. strings, booleans).
  </Accordion>
</AccordionGroup>


---

# Page: 'Convert audio/video to text' Tool steps

Path: `build/tools/tool-steps/convert-audio-video-to-text`.

## 'Convert audio/video to text' Tool steps

> Use three different Tool steps to convert audio/video to text

The platform supports three different models for converting audio to text, and two for converting video to text. You can use one of these Tool steps which use different models:

* Deepgram (audio and video)
* AssemblyAI (audio and video)
* OpenAI (only audio)

By using these steps, you can convert your audio and video into readable text for other Tools to use.

### Add a ‘Convert audio/video to text’ Tool step to your Tool

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cmc2ujaa3kt4ysn1rfs88zyu5" frameBorder="0" title="Add the 'Convert audio/video to text' Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

You can add the ‘Convert audio/video to text’ Tool step to your Tool by:

1. Creating a new Tool, then searching for one of the ‘Convert audio/video to text’ Tool step
2. Click ‘Expand’ to see the full Tool step
3. Upload the file you want to convert
4. Click ‘Run step’ to see the Tool step’s output!

#### Deepgram steps

If you use the Deepgram Tool step, you can select an option to recognise speaker changes.

#### OpenAI steps

<Warning>
  Using this tool step requires an OpenAI API Key.
</Warning>

If you use the OpenAI Tool step, you can select a Response Type. There are two options, `Transcript only` and `Transcript + advanced metadata`.

### Common errors

<AccordionGroup>
  <Accordion title="Unsupported file format">
    An error similar to the one noted below indicates that the provided input file is not of the supported formats.

    ```
    "err_code":"Unsupported Media Type","err_msg":"..
    ```

    Use an audio/video editor to export your file to common audio/video formats and try again.
  </Accordion>

  <Accordion title="File size">
    This error only occurs for too large files (60+ MB). If you are working with large video files, use video editing tools such
    as Quicktime to extract the audio.

    ```
    Request body larger than maxBodyLength limit
    ```
  </Accordion>
</AccordionGroup>


---

# Page: 'Convert PDF to text' Tool step

Path: `build/tools/tool-steps/convert-pdf-to-text`.

## 'Convert PDF to text' Tool step

> Use a Tool step to convert PDFs into text for your Agents and Tools to read

The ‘Convert PDF to text’ Tool step allows you to convert a PDF into text for your tools and Agents to use.

### Add the ‘Convert PDF to text’ Tool step to your Tool

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cmbrl86lmceh2sn1ruioz8hbb" frameBorder="0" title="Add the Convert a Spreadsheet to JSON Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

You can add the ‘Convert PDF to text’ Tool step to your Tool by:

1. Creating a new Tool, then searching for the ‘Convert PDF to text’ Tool step
2. Click ‘Expand’ to see the full Tool step
3. Add the PDF you want to convert to text
4. Click ‘Run step’ to run the Tool step

### Advanced Settings

#### Use OCR

OCR (Optical character recognition or optical character reader) is needed for image PDFs (e.g. scanned data). This option uses more credits and therefore should only be activated for image PDFs.

<Warning>
  This will not return images in the PDFs you upload, but will convert text in images to text for you to use in your Tools.
</Warning>

#### OCR Type

This allows you to choose the model used if ‘Use OCR’ is selected. The options available are:

* Fast model (\~95% accuracy)
* Quality model (\~99% accuracy but slow)

#### Return PDF Text as Documents (List of Texts)

This can only be selected if ‘Use OCR is selected’.

Toggling this will either return the PDF text as an aggregated text or as a list of texts.

### Common errors

<Accordion title="Unsupported file type">
  The error message similar to the one below indicates that a non-PDF file was uploaded to the Tool step. Only PDF files are supported.
  `Unsupported file type: xlsx`
</Accordion>


---

# Page: 'Convert a spreadsheet to JSON' Tool step

Path: `build/tools/tool-steps/convert-spreadsheet-to-json`.

## 'Convert a spreadsheet to JSON' Tool step

> Use a Tool step to convert CSVs and XLSXs into JSON

The ‘Convert a spreadsheet to JSON’ Tool step allows you to convert a CSV or XLSX file into JSON for your Tools to use.

### Add the ‘Convert a spreadsheet to JSON’ Tool step to your Tool

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cmbrf6vyscbn6sn1r1drty9ln" frameBorder="0" title="Add the Convert a Spreadsheet to JSON Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

You can add the ‘Convert a spreadsheet to JSON’ Tool step to your Tool by:

1. Creating a new Tool, then searching for the ‘Convert a spreadsheet to JSON’ Tool step
2. Click ‘Expand’ to see the full Tool step
3. Add the CSV or XLSX file you want to convert to JSON
4. Click ‘Run step’ to run the Tool step
5. Your output will be formatted - click ‘Formatted’ to see the JSON output if needed

### Using the Tool output

The output is a dictionary with a key `rows`.

* `spreadsheet_to_json[rows]` is a list containing as many rows as included in the uploaded file.
* Each row is a dictionary representing one row of data (i.e. keys are column headers in the uploaded spreadsheet).

Below you can see samples where the default name assigned to the step `spreadsheet_to_json` is used.

```
spreadsheet_to_json.rows
spreadsheet_to_json.rows[0]
```

### Common errors

<Accordion title="Unsupported file type">
  The error message similar to the one below indicates that a non-spreadsheet file was uploaded to the Tool step. Only CSV and XLSX files are supported.
  `Unsupported file type: pdf`
</Accordion>


---

# Page: Delay Tool step

Path: `build/tools/tool-steps/delay`.

## Delay Tool step

> Delay your Agents and Tools by using the Delay Tool step

The Delay Tool step will allow you to delay your Agents and Tools by a specified number of seconds.

### Add the Delay Tool step to your Tool

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cmceazpgu586t8qszf2vl7wap" frameBorder="0" title="Add the Delay Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

You can add the Delay Tool step to your Tool by:

1. Creating a new Tool, then searching for the ‘Delay’ Tool step
2. Click ‘Expand’ to see the full Tool step
3. Enter the number of seconds you want the Tool step to ‘delay’ / make your Agent / Tool wait for in the ‘Delay’ field
4. If you click ‘Run step’, the Tool will run for the number of seconds you’ve specified!


---

# Page: Extract Website Content Tool step

Path: `build/tools/tool-steps/extract-website-content`.

## Extract Website Content Tool step

> Use the Extract Website Content Tool step to turn websites into text and HTML for your Agents and Tools

The Extract Website Content Tool step will allow you to scrape and convert a website into text or HTML files for your Agents and Tools.

### Add the Extract Website Content Tool step to your Tool

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cmbq55ecgb7cgsn1rkh2mq039" frameBorder="0" title="Add the Firecrawl Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

You can add the Extract Website Content Tool step to your Tool by:

1. Creating a new Tool, then searching for the ‘Extract Website Content’ Tool step
2. Click ‘Expand’ to see the full Tool step
3. Enter the URL of the website you want to scrape and extract content from in ‘Website URL’
4. Under ‘Method’, select ‘Text’ or ‘HTML’ based on what format you want to have your website content be extracted as
5. Click ‘Run step’ to test out your Tool step with your inputs!

### Advanced Settings

#### Model

You can choose between two models to use for this Tool step:

* Apify
* Browserless

The following Advanced Settings will then vary based on which Model you choose.

#### Apify Advanced Settings

##### Scrape Type

You can select between two scrape types:

* Simple HTML (cheaper)
* Full Web Page (expensive)

##### Use proxies

You can use proxies to scrape the website - this is more expensive.

##### Max depth

The maximum number of links starting from the start URL that the crawler will recursively follow. The start URLs have a depth of 0. Capped at 10.

##### Max pages

The maximum number of pages to crawl. Capped at 100.

#### Browserless Advanced Settings

These Advanced Settings can only be used if you select ‘Text’ as your ‘Method’ in the Tool step.

##### Element selector

You can specify which element from the HTML components to scrape. By default, it is set to `body`. Note that using ’+ New item’, you can specify a list of elements to be scrapped.

##### Extra headers

If you need to provide special information to be able to scrape a website, provide the data as a JSON object. The below object shows an example where an authentication token called `auth-token` and a `user-id` are required.

```
{
    "auth-token":"AUTHENTICATION-TOKEN",
    "user-id":"USER-ID"
}
```

### Common errors

<AccordionGroup>
  <Accordion title="Over max depth">
    The error message below indicates that the ‘Max depth’ value has been set to under 0 or over 10.

    ```
    Studio transformation browserless_scrape input validation error: must be <= 10 {"comparison":"<=","limit":10} /model/max_depth
    ```
  </Accordion>

  <Accordion title="Over max pages">
    The error message below indicates that the ‘Max pages’ value has been set to over 100.

    ```
    Studio transformation browserless_scrape input validation error: must be <= 100 {"comparison":"<=","limit":100} /model/max_pages

    ```
  </Accordion>
</AccordionGroup>

### What’s the difference between this Tool step and Firecrawl?

[Firecrawl](build__tools__tool-steps.md) (page `build/tools/tool-steps/firecrawl`) is another Tool step you can use to scrape and extract website content. Unlike this Tool step, it requires you to sign up for [Firecrawl](https://firecrawl.dev) and bring your Firecrawl API Key - however, it comes with more options for scraping outputs.

Both Tool steps can be used, and we recommend trying both to see which one suits your needs more for your Agents and Tools.


---

# Page: 'Convert a file to text' Tool step

Path: `build/tools/tool-steps/file-to-text`.

## 'Convert a file to text' Tool step

> Use a Tool step to convert files into text

The ‘Convert a file to text’ Tool step allows you to convert a supported files into text so that

### Add the ‘Convert a file to text’ Tool step to your Tool

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cmc2p8jnfkqwisn1rdpsb1xtm" frameBorder="0" title="Add the Convert a file to text Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

You can add the ‘Convert a file to text’ Tool step to your Tool by:

1. Creating a new Tool, then searching for the ‘Convert a file to text’ Tool step
2. Click ‘Expand’ to see the full Tool step
3. Add the file you want to convert to text
4. Click ‘Run step’ to run the Tool step

### What file types are supported?

### Advanced Settings

Supported formats are:

* PDF (no ocr)
* Word (`.doc`, `.docx`)
* Excel (`.xlsx`, `.xls`)
* CSV
* Audio (`.mp3`, `.mp4`, `.mp2`, `.aac`, `.wav`, `.flac`, `.pcm`, `.m4a`, `.ogg`, `.opu`, `.webm`)
* JSON
* TXT

<Note>
  Audio transcription is completed using the Deepgram model.
</Note>

#### LLM Friendly Format

A checkbox that, when selected, will convert your text into a format that is more friendly for LLMs.

### Common errors

<Accordion title="Unsupported file type">
  The error message similar to the one below indicates that a file that is not supported was added to the Tool step.
  `Unsupported file type: pdf`
</Accordion>


---

# Page: Firecrawl Tool step

Path: `build/tools/tool-steps/firecrawl`.

## Firecrawl Tool step

> Use Firecrawl as a step in your Tools to turn websites into LLM-ready data

The Firecrawl Tool step allows you to turn websites of your choosing into LLM-ready data that you can then feed into an LLM as part of your Tools and Agents.

### Integrating with Firecrawl

In order to use the Firecrawl Tool step, you need to sign up for Firecrawl at [firecrawl.dev](https://www.firecrawl.dev/) and get an API key. You then need to add this API key to the platform.

### Add the Firecrawl Tool step to your Tool

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cmbq23afyb6gtsn1rjlutkcvp" frameBorder="0" title="Add the Firecrawl Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

You can add the Firecrawl Tool step to your Tool by:

1. Creating a new Tool, then searching for the ‘Firecrawl Web Scraper’ Tool step
2. Click ‘Expand’ to see the full Tool step
3. Add the URL you want to scrape in ‘URL’
4. Check or uncheck ‘Scrape Only’ based on whether or not you want to scrape the URL you’ve added only
5. Check or uncheck ‘Extract Main Content Only’ based on whether or not you want to include nav, header, footers, etc.
6. Add paths you want to include here under ‘Include Paths’
7. If ‘Scrape Only’ is unchecked, you can specify how many pages you want to crawl under ‘Number of Pages’
8. Run the Tool step to see if works with your configuration!

### Advanced Settings

#### Output Formats

You can select from the following Output Formats for your scrapes:

* Markdown (default)
* HTML
* Raw HTML
* Links
* Screenshot
* Screenshot of the full page
* JSON
* Change Tracking

### Common errors

<AccordionGroup>
  <Accordion title="Insufficient credits">
    The error message below indicates that you have run out of credits, or do not have enough credits, in your Firecrawl account to perform the Tool step you’re running. You will need to upgrade your plan at Firecrawl to get more credits.

    ```
    {"success":false,"error":"Insufficient credits to perform this request. For more credits, you can upgrade your plan at https://firecrawl.dev/pricing or try changing the request limit to a lower value."}
    ```
  </Accordion>

  <Accordion title="Invalid token">
    The error message below indicates that your Firecrawl API Key is either incorrect or missing. You will need to add / replace this API Key in ‘Integrations & API Keys’.

    ```
    {"error":"Unauthorized: Invalid token"}
    ```
  </Accordion>
</AccordionGroup>


---

