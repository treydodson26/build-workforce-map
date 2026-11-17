# The platform docs: `build/tools/tool-steps/airtop-browser-automation/`

3 pages, downloaded on 11/16/2026.


---

# Page: Airtop - Page Information & Monitoring

Path: `build/tools/tool-steps/airtop-browser-automation/page-information`.

## Airtop - Page Information & Monitoring

> Query page content, capture screenshots, and monitor page conditions with Airtop browser automation

<Note>
  Before using Airtop browser automation tool steps, you need to configure the Airtop integration. See the Airtop integration setup guide (page `integrations/popular-integrations/airtop`) for instructions on connecting your Airtop account.
</Note>

The Airtop Page Information & Monitoring tool steps allow you to extract information from web pages, capture visual representations, and monitor pages for specific conditions.

### Add the ‘Airtop - Query Page’ Tool step

<div style="{ width: '100%', position: 'relative', paddingTop: '56.25%' }">
  <iframe src="https://app.supademo.com/embed/cmheetwsr3onffatido9cv2qf" frameBorder="0" title="Add the Confluence - Create Post Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '3px solid #5E43CE', borderRadius: '10px' }" />
</div>

You can add the ‘Airtop - Query Page’ Tool step to your Tool by:

1. Creating a new Tool, then clicking `+ Add Step`
2. Searching for and adding the ‘Airtop - Query Page’ Tool step
3. Clicking ‘Expand’ to see the full Tool step
4. **Window ID** (Required): Enter the identifier of the browser window containing the page. Type `{{` to select a variable from a previous step.
5. **Session ID** (Required): Enter the identifier of the browser session. Type `{{` to select a variable.
6. **Prompt to query the page** (Required): Enter a natural language prompt describing what information you want to extract from the page (e.g., “extract all product names and prices”). Type `{{` to select a variable.
7. **Use paginated extraction** (Optional): Check this box if the page contains paginated content and you want to extract data from multiple pages automatically.
8. **Output JSON schema** (Optional): Provide a JSON schema (as a string) describing the structure you want returned. When set, Airtop returns structured JSON matching the schema instead of free-form text. Airtop requires draft-07 — include `"$schema": "http://json-schema.org/draft-07/schema#"` at the top of your schema, or the request will fail with HTTP 422.
9. Clicking `Run step` to test out the Tool

The step extracts information from the page based on your prompt. The extracted data is returned and can be used in subsequent steps. When ‘Output JSON schema’ is set, the output is a structured JSON object matching the schema, which is useful when downstream steps expect a consistent shape.

### Add the ‘Airtop - Screenshot Page’ Tool step

<div style="{ width: '100%', position: 'relative', paddingTop: '56.25%' }">
  <iframe src="https://app.supademo.com/embed/cmhef3f553p8pfati4tpvummu" frameBorder="0" title="Add the Confluence - Create Post Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '3px solid #5E43CE', borderRadius: '10px' }" />
</div>

You can add the ‘Airtop - Screenshot Page’ Tool step to your Tool by:

1. Creating a new Tool, then clicking `+ Add Step`
2. Searching for and adding the ‘Airtop - Screenshot Page’ Tool step
3. Clicking ‘Expand’ to see the full Tool step
4. **Window ID** (Required): Enter the identifier of the browser window containing the page. Type `{{` to select a variable from a previous step.
5. **Session ID** (Required): Enter the identifier of the browser session. Type `{{` to select a variable.
6. **Capture scope** (Optional): Choose what to capture. `viewport` captures only what’s currently visible, `page` captures the entire scrollable page in one shot, `scan` performs a scroll-based capture for sites that don’t render correctly with `page`, and `auto` lets Airtop choose. Defaults to `auto`.
7. **Response format from Airtop** (Optional): How Airtop returns the raw screenshot before the platform re-hosts it. `base64` returns inline image data; `url` returns a signed download URL from Airtop’s storage. Either way, the step returns a the platform-hosted URL. Defaults to `base64` for viewport scope and `url` for full-page scopes.
8. **Max scan scrolls** (Optional): Scan scope only. Maximum number of scrolls performed while capturing. Defaults to `50`.
9. **Scan scroll delay (ms)** (Optional): Scan scope only. Delay in milliseconds between scrolls. Defaults to `1000`.
10. **Overlap percentage** (Optional): Percentage of overlap between captured chunks, between `0` and `100`. Defaults to `30`.
11. **Partition direction** (Optional): How the screenshot is split into chunks: `vertical` (default, recommended for most pages), `horizontal` (for very wide pages), or `bidirectional`.
12. Clicking `Run step` to test out the Tool

The step returns `screenshot_url` (the first chunk, kept for backward compatibility) and `screenshot_urls` (an array of every chunk, all re-hosted on the platform storage). For `scope: viewport` there is one chunk; for `scope: page` and `scope: scan` there may be several depending on page dimensions and partition direction.

### Add the ‘Airtop - Monitor Page for Condition’ Tool step

<div style="{ width: '100%', position: 'relative', paddingTop: '56.25%' }">
  <iframe src="https://app.supademo.com/embed/cmheffjvk3pdufati74xdced0" frameBorder="0" title="Add the Confluence - Create Post Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '3px solid #5E43CE', borderRadius: '10px' }" />
</div>

You can add the ‘Airtop - Monitor Page for Condition’ Tool step to your Tool by:

1. Creating a new Tool, then clicking `+ Add Step`
2. Searching for and adding the ‘Airtop - Monitor Page for Condition’ Tool step
3. Clicking ‘Expand’ to see the full Tool step
4. **Window ID** (Required): Enter the identifier of the browser window containing the page. Type `{{` to select a variable from a previous step.
5. **Session ID** (Required): Enter the identifier of the browser session. Type `{{` to select a variable.
6. **Condition Description** (Required): Enter a description of the condition you want to monitor (e.g., “when the submit button becomes visible” or “when the text ‘Success’ appears on the page”). Type `{{` to select a variable.
7. **Timeout Seconds** (Optional): Enter the maximum time in seconds to wait for the condition to be met. If the condition is not met within this time, the step will fail.
8. **Check Interval Seconds** (Optional): Enter how frequently (in seconds) to check for the condition. Smaller intervals check more frequently but may use more resources.
9. Clicking `Run step` to test out the Tool

The step continuously monitors the page for the specified condition. Once the condition is met (or the timeout is reached), the step completes. This is useful for waiting for dynamic content to load or for specific page states to occur.

### Common use cases

* Extracting data from web pages for processing or storage
* Capturing a full-page screenshot as visual proof of automation actions
* Waiting for dynamic content to load before proceeding with automation
* Monitoring pages for specific states or changes

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Can I use screenshots in subsequent steps?">
    Yes. Every chunk is re-hosted on the platform storage and returned as a URL in `screenshot_urls`. Pass an entry to any step that accepts an image URL.
  </Accordion>

  <Accordion title="When should I use viewport, page, or scan capture scope?">
    Use `viewport` for the visible area only — fastest and always one chunk. Use `page` for the entire scrollable content in one Airtop call. Use `scan` for sites that don’t render correctly with `page` (typically infinite-scroll or lazy-loaded pages); scan performs a scroll-based capture and returns one chunk per scroll position.
  </Accordion>

  <Accordion title="Why do I get multiple URLs in 'screenshot_urls'?">
    `scope: page` and `scope: scan` can return more than one chunk depending on page dimensions and the partition direction. `screenshot_url` always points to the first chunk for backward compatibility; iterate over `screenshot_urls` to access them all.
  </Accordion>

  <Accordion title="What conditions can I monitor for?">
    Common conditions include element visibility, text content, and element count.
  </Accordion>
</AccordionGroup>


---

# Page: Airtop - Page Interaction

Path: `build/tools/tool-steps/airtop-browser-automation/page-interaction`.

## Airtop - Page Interaction

> Interact with web pages using Airtop - click elements, type text, and scroll pages for browser automation

<Note>
  Before using Airtop browser automation tool steps, you need to configure the Airtop integration. See the Airtop integration setup guide (page `integrations/popular-integrations/airtop`) for instructions on connecting your Airtop account.
</Note>

The Airtop Page Interaction tool steps allow you to interact with web page elements, including clicking buttons, typing text, and scrolling through pages.

### Add the ‘Airtop - Click Element’ Tool step

<div style="{ width: '100%', position: 'relative', paddingTop: '56.25%' }">
  <iframe src="https://app.supademo.com/embed/cmhecnx2i3nczfati4w6aqt43" frameBorder="0" title="Add the Confluence - Create Post Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '3px solid #5E43CE', borderRadius: '10px' }" />
</div>

You can add the ‘Airtop - Click Element’ Tool step to your Tool by:

1. Creating a new Tool, then clicking `+ Add Step`
2. Searching for and adding the ‘Airtop - Click Element’ Tool step
3. Clicking ‘Expand’ to see the full Tool step
4. **Window ID** (Required): Enter the identifier of the browser window containing the page. Type `{{` to select a variable from a previous step.
5. **Session ID** (Required): Enter the identifier of the browser session. Type `{{` to select a variable.
6. **Element Description** (Required): Enter a description of the element you want to click. This can be a natural language description (e.g., “the submit button”) or a CSS selector/XPath. Type `{{` to select a variable.
7. **Wait Until Timeout Seconds** (Optional): Enter the maximum time in seconds to wait for the element to become clickable.
8. **Wait For Navigation** (Optional): Check this box if you want the step to wait for page navigation after clicking the element (useful when clicking links or buttons that cause page loads).
9. **Wait For Navigation Condition** (Optional): When ‘Wait For Navigation’ is checked, choose which event to wait for: `load`, `domcontentloaded`, `networkidle0`, or `networkidle2`. `networkidle0` and `networkidle2` are the most reliable for detecting that a post-submit page has fully settled.
10. Clicking `Run step` to test out the Tool

The step clicks the specified element on the page. If the element is not found or not clickable within the timeout period, the step will fail.

### Add the ‘Airtop - Type Text’ Tool step

<div style="{ width: '100%', position: 'relative', paddingTop: '56.25%' }">
  <iframe src="https://app.supademo.com/embed/cmhedzpg43nuffatiatv4l6bx" frameBorder="0" title="Add the Confluence - Create Post Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '3px solid #5E43CE', borderRadius: '10px' }" />
</div>

You can add the ‘Airtop - Type Text’ Tool step to your Tool by:

1. Creating a new Tool, then clicking `+ Add Step`
2. Searching for and adding the ‘Airtop - Type Text’ Tool step
3. Clicking ‘Expand’ to see the full Tool step
4. **Window ID** (Required): Enter the identifier of the browser window containing the page. Type `{{` to select a variable from a previous step.
5. **Session ID** (Required): Enter the identifier of the browser session. Type `{{` to select a variable.
6. **Element Description** (Required): Enter a description of the input field where you want to type. This can be a natural language description (e.g., “the email input field”) or a CSS selector/XPath. Type `{{` to select a variable.
7. **Text to Type** (Required): Enter the text you want to type into the element. Type `{{` to select a variable, or enter the text directly.
8. **Press Enter Key** (Optional): Check this box to press the Enter key after typing the text (useful for submitting forms or triggering search).
9. **Press Tab Key** (Optional): Check this box to press the Tab key after typing the text. If both Enter and Tab are enabled, Enter is pressed first. Useful for advancing focus to the next field in a form.
10. **Clear Input Field** (Optional): Check this box to clear the input field’s existing value before typing. Use this when filling fields that may already contain a value.
11. **Wait Until Timeout Seconds** (Required): Enter the maximum time in seconds to wait for the element to become available.
12. **Wait For Navigation** (Optional): Check this box if you want the step to wait for page navigation after typing (useful when typing triggers a page load).
13. **Wait For Navigation Condition** (Optional): When ‘Wait For Navigation’ is checked, choose which event to wait for: `load`, `domcontentloaded`, `networkidle0`, or `networkidle2`.
14. Clicking `Run step` to test out the Tool

The step types the specified text into the target element. If the element is not found within the timeout period, the step will fail.

### Add the ‘Airtop - Scroll Page’ Tool step

<div style="{ width: '100%', position: 'relative', paddingTop: '56.25%' }">
  <iframe src="https://app.supademo.com/embed/cmheef3bi3o39fati8hrr5u3y" frameBorder="0" title="Add the Confluence - Create Post Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '3px solid #5E43CE', borderRadius: '10px' }" />
</div>

You can add the ‘Airtop - Scroll Page’ Tool step to your Tool by:

1. Creating a new Tool, then clicking `+ Add Step`
2. Searching for and adding the ‘Airtop - Scroll Page’ Tool step
3. Clicking ‘Expand’ to see the full Tool step
4. **Window ID** (Required): Enter the identifier of the browser window containing the page. Type `{{` to select a variable from a previous step.
5. **Session ID** (Required): Enter the identifier of the browser session. Type `{{` to select a variable.
6. **X Scroll Amount in pixels** (Optional): Number of pixels to scroll horizontally. Positive scrolls right, negative scrolls left. Ignored when ‘Scroll To Element’ is set.
7. **Y Scroll Amount in pixels** (Optional): Number of pixels to scroll vertically. Positive scrolls down, negative scrolls up. Ignored when ‘Scroll To Element’ is set.
8. **Scroll To Element** (Optional): Natural-language description of what to scroll to (e.g., “the first name field”, “the pricing section”). Takes precedence over the pixel-based X/Y values.
9. **Scroll Within** (Optional): Natural-language description of the scrollable container to scroll inside (e.g., “the modal dialog”). If left blank, the entire page is scrolled.
10. Clicking `Run step` to test out the Tool

The step scrolls the page (or a named container) by the specified pixel amounts, or scrolls to a described element. Use pixel-based scrolling for precise control such as paging through an infinite scroll list, and ‘Scroll To Element’ when you want to reach a named section without knowing its exact position.

### Common use cases

* Filling out forms automatically, including advancing fields with Tab and clearing pre-filled values before typing
* Clicking buttons and links to navigate through a website
* Scrolling to load dynamic content, either by pixel amount or by natural-language description of the target
* Automating repetitive user interactions

### Common errors

<AccordionGroup>
  <Accordion title="Element not clickable">
    This error occurs when trying to click an element that is not currently visible or clickable. You may need to wait for the element to load or scroll to make it visible.
  </Accordion>
</AccordionGroup>

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Can I wait for an element to appear before clicking?">
    For dynamic content that loads asynchronously, consider using the ‘Airtop - Monitor Page for Condition’ step to wait for elements before interacting with them.
  </Accordion>

  <Accordion title="How do I advance focus to the next field without identifying it?">
    Enable ‘Press Tab Key’ on the ‘Airtop - Type Text’ step after typing into a field. The next focusable element receives focus, which is useful for filling multi-field forms without separately describing each input.
  </Accordion>

  <Accordion title="How do I overwrite a pre-filled input field?">
    Enable ‘Clear Input Field’ on the ‘Airtop - Type Text’ step. The existing value is cleared before the new text is typed, which is more reliable than simulating Ctrl+A then Delete because it works regardless of the current cursor position or selection state.
  </Accordion>

  <Accordion title="When should I use 'Scroll To Element' vs pixel-based scrolling?">
    Use ‘Scroll To Element’ when you want to reach a named section or element and don’t know its exact pixel position. Use the X/Y pixel inputs when you need precise control over the scroll distance, such as paging through an infinite scroll list a fixed amount at a time.
  </Accordion>

  <Accordion title="What does 'Wait For Navigation Condition' do?">
    When ‘Wait For Navigation’ is enabled on the click or type step, the condition controls which page-load event the step waits for. `load` and `domcontentloaded` complete earlier, while `networkidle0` and `networkidle2` wait for network activity to settle and are more reliable for detecting that a post-submit page has fully rendered.
  </Accordion>
</AccordionGroup>


---

# Page: Airtop - Window Management

Path: `build/tools/tool-steps/airtop-browser-automation/window-management`.

## Airtop - Window Management

> Manage browser windows with Airtop - create windows, load URLs, and close windows for browser automation

<Note>
  Before using Airtop browser automation tool steps, you need to configure the Airtop integration. See the Airtop integration setup guide (page `integrations/popular-integrations/airtop`) for instructions on connecting your Airtop account.
</Note>

The Airtop Window Management tool steps allow you to control browser windows for automation workflows. These steps include creating new browser windows, loading URLs, and closing windows.

### Add the ‘Airtop - Create Window’ Tool step

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cmheavygd3mcmfatif4mfcsds" frameBorder="0" title="Add the Confluence - Create Post Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

You can add the ‘Airtop - Create Window’ Tool step to your Tool by:

1. Creating a new Tool, then clicking `+ Add Step`
2. Searching for and adding the ‘Airtop - Create Window’ Tool step
3. Clicking ‘Expand’ to see the full Tool step
4. **Initial URL** (Optional): Enter a URL to load immediately when the window is created. Type `{{` to select a variable, or leave blank to create an empty window.
5. Clicking `Run step` to test out the Tool

The step creates a new browser window that can be referenced using the returned window ID, session ID, and live view URL in subsequent steps.

### Add the ‘Airtop - Load URL’ Tool step

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cmhebd3i43mhjfati9f5lsw25" frameBorder="0" title="Add the Confluence - Create Post Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

You can add the ‘Airtop - Load URL’ Tool step to your Tool by:

1. Creating a new Tool, then clicking `+ Add Step`
2. Searching for and adding the ‘Airtop - Load URL’ Tool step
3. Clicking ‘Expand’ to see the full Tool step
4. **Window ID** (Required): Enter the identifier of the browser window where you want to load the URL. Type `{{` to select a variable from a previous step (e.g., the window ID returned from ‘Create Window’).
5. **Session ID** (Required): Enter the identifier of the browser session. Type `{{` to select a variable.
6. **URL** (Required): Enter the website URL you want to navigate to. Type `{{` to select a variable, or enter the URL directly (e.g., `https://example.com`).
7. Clicking `Run step` to test out the Tool

The step navigates the specified browser window to the provided URL.

### Add the ‘Airtop - Close Window’ Tool step

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cmhebocut3mltfatieuyq6fsz" frameBorder="0" title="Add the Confluence - Create Post Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

You can add the ‘Airtop - Close Window’ Tool step to your Tool by:

1. Creating a new Tool, then clicking `+ Add Step`
2. Searching for and adding the ‘Airtop - Close Window’ Tool step
3. Clicking ‘Expand’ to see the full Tool step
4. **Window ID** (Required): Enter the identifier of the browser window you want to close. Type `{{` to select a variable from a previous step.
5. **Session ID** (Required): Enter the identifier of the browser session. Type `{{` to select a variable.
6. Clicking `Run step` to test out the Tool

The step closes the specified browser window. Make sure the window ID exists before attempting to close it.

### Common use cases

* Opening multiple browser windows for parallel automation tasks
* Navigating to specific pages before performing actions
* Cleaning up browser windows after completing automation workflows

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Can I manage multiple windows simultaneously?">
    Yes, you can create multiple windows by using different Window IDs and managing them independently throughout your automation workflow.
  </Accordion>

  <Accordion title="Do I need to create a window before loading a URL?">
    Yes, you need to create a window first using ‘Airtop - Create Window’ before attempting to load a URL in that window.
  </Accordion>
</AccordionGroup>

