# The platform docs: `build/tools/tool-steps/linkedin/`

3 pages, downloaded on 11/16/2026.


---

# Page: 'RapidAPI - Get a LinkedIn Profile/Company and Posts' Tool step

Path: `build/tools/tool-steps/linkedin/get-linkedin-profile`.

## 'RapidAPI - Get a LinkedIn Profile/Company and Posts' Tool step

> Fetch a LinkedIn profile / company and its posts

The ‘RapidAPI - Get a LinkedIn Profile/Company and Posts’ Tool step allows you to search through LinkedIn profiles through the platform.

<Note>
  You can learn more about the LinkedIn integration here (page `integrations/popular-integrations/linkedin`).
</Note>

### Add the ‘RapidAPI - Get a LinkedIn Profile/Company and Posts’ Tool step to your Tool

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cmekqejw305ccv9kq04eeoxpi" frameBorder="0" title="Add the RapidAPI - Get a LinkedIn Profile/Company and Posts Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

You can add the ‘RapidAPI - Get a LinkedIn Profile/Company and Posts’ Tool step to your Tool by:

1. Creating a new Tool, then searching for the ‘RapidAPI - Get a LinkedIn Profile/Company and Posts’ Tool step
2. Click ‘Expand’ to see the full Tool step
3. Enter the URL of the company / profile you want to get in the URL field
4. Select the Method you want to use in the Method field. You can choose from:
   * Get User Posts
   * Get User Profile
   * Get Company Posts
   * Get Company Profile
5. Click ‘Run step’ to test / run the Tool step, then click ‘data’ to see your output

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Why are LinkedIn Tools so expensive?">
    This Tool uses [RapidAPI](https://rapidapi.com/) to perform actions in LinkedIn. The credits charged are to cover the cost of this service through RapidAPI. We recommend upgrading to a subscription in order to use this Tool.
  </Accordion>
</AccordionGroup>


---

# Page: 'Unipile - LinkedIn Action' Tool step

Path: `build/tools/tool-steps/linkedin/linkedin-action`.

## 'Unipile - LinkedIn Action' Tool step

> Perform actions on LinkedIn using this Tool step

The ‘Unipile - LinkedIn Action’ Tool step allows you to search through LinkedIn profiles through the platform.

<Note>
  You can learn more about the LinkedIn integration here (page `integrations/popular-integrations/linkedin`).
</Note>

### Add the ‘Unipile - LinkedIn Action’ Tool step to your Tool

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cmei2eup097hth3pyxr1n3iko" frameBorder="0" title="Add the Unipile - LinkedIn Action Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

You can add the ‘Unipile - LinkedIn Action’ Tool step to your Tool by:

1. Creating a new Tool, then searching for the ‘Unipile - LinkedIn Action’ Tool step
2. Click ‘Expand’ to see the full Tool step
3. Choose the Action you want to perform in the Action field
4. Connect or select your LinkedIn account in the ‘LinkedIn Account’ field
5. Enter the parameters for the action you selected, and then click ‘Run step’ to run the Tool step

### Parameters

Parameters differ for each action in this Tool step, but the LinkedIn account is always required.

<Tabs>
  <Tab title="Get All Chats">
    <ParamField path="Before" type="string">
      A filter to target items created before the datetime (exclusive). Must be an ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).
    </ParamField>

    <ParamField path="After" type="string">
      A filter to target items created after the datetime (exclusive). Must be an ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).
    </ParamField>

    <ParamField path="Cursor" type="string">
      A cursor for pagination purposes. To get the next page of entries, you need to make a new request and fulfill this field with the cursor received in the previous request. This process should be repeated until all entries have been retrieved.
    </ParamField>

    <ParamField path="Limit" type="string">
      The maximum number of results to return. This can be between 1 to 250.
    </ParamField>
  </Tab>

  <Tab title="Get All Messages From Chat">
    <ParamField path="Chat ID" type="string">
      The ID of the chat.
    </ParamField>

    <ParamField path="Before" type="string">
      A filter to target items created before the datetime (exclusive). Must be an ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).
    </ParamField>

    <ParamField path="After" type="string">
      A filter to target items created after the datetime (exclusive). Must be an ISO 8601 UTC datetime (YYYY-MM-DDTHH:MM:SS.sssZ).
    </ParamField>

    <ParamField path="Cursor" type="string">
      A cursor for pagination purposes. To get the next page of entries, you need to make a new request and fulfill this field with the cursor received in the previous request. This process should be repeated until all entries have been retrieved.
    </ParamField>

    <ParamField path="Limit" type="string">
      The maximum number of results to return. This can be between 1 to 250.
    </ParamField>
  </Tab>

  <Tab title="Get User Profile">
    <ParamField path="Username" type="string">
      The username of who you wish to message. This can be found in their profile URL after [https://www.linkedin.com/in/](https://www.linkedin.com/in/)
    </ParamField>

    <ParamField path="Notify" type="checkbox">
      Whether the profile visit should be notified to the viewee or not. Default is false.
    </ParamField>
  </Tab>

  <Tab title="Create A Post">
    <ParamField path="Caption" type="string">
      The caption to your post.
    </ParamField>

    <ParamField path="Attachments" type="string">
      The attachments to your post.
    </ParamField>
  </Tab>

  <Tab title="Send Comment">
    <ParamField path="Post ID" type="string">
      The ID of the post to comment on
    </ParamField>

    <ParamField path="Text" type="string">
      The caption for your comment.
    </ParamField>
  </Tab>

  <Tab title="Get InMail Balance">
    No parameters are available for this action.
  </Tab>

  <Tab title="Send Invitation">
    <ParamField path="Username" type="string">
      The username of who you wish to message. This can be found in their profile URL after [https://www.linkedin.com/in/](https://www.linkedin.com/in/)
    </ParamField>

    <ParamField path="Message" type="string">
      A message to go with the invitation. This is max. 200 characters for free accounts, and max. 300 characters for Premium accounts.
    </ParamField>

    <ParamField path="Conversation ID" type="string">
      The conversation you would like messages sent to.
    </ParamField>
  </Tab>

  <Tab title="Send Message In A Chat">
    <ParamField path="Chat ID" type="string">
      The ID of the chat.
    </ParamField>

    <ParamField path="Text" type="string">
      The message you wish to send.
    </ParamField>
  </Tab>

  <Tab title="Start New Chat">
    <ParamField path="Account Type" type="dropdown">
      Choose from Classic, Recruiter and Sales Navigator.
    </ParamField>

    <ParamField path="Username" type="string">
      The username of who you wish to message. This can be found in their profile URL after [https://www.linkedin.com/in/](https://www.linkedin.com/in/)
    </ParamField>

    <ParamField path="Title" type="string">
      Add a title to the message.
    </ParamField>

    <ParamField path="Text" type="string">
      The message you wish to send.
    </ParamField>
  </Tab>
</Tabs>

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Why are LinkedIn Tools so expensive?">
    This Tool uses [Unipile](https://unipile.com/) to perform actions in LinkedIn. The credits charged are to cover the cost of this service through Unipile. We recommend upgrading to a subscription in order to use this Tool.
  </Accordion>
</AccordionGroup>


---

# Page: 'Crustdata - Search LinkedIn Profiles' Tool step

Path: `build/tools/tool-steps/linkedin/search-linkedin-profiles`.

## 'Crustdata - Search LinkedIn Profiles' Tool step

> Search through LinkedIn profiles using this Tool step

The ‘Crustdata - Search LinkedIn Profiles’ Tool step allows you to search through LinkedIn profiles through the platform.

<Note>
  You can learn more about the LinkedIn integration 

  here (page `integrations/popular-integrations/linkedin`)

  .
</Note>

### Add the ‘Crustdata - Search LinkedIn Profiles’ Tool step to your Tool

<div style="{ width:"100%",position:"relative","padding-top":"56.75%" }">
  <iframe src="https://app.supademo.com/embed/cmei0zqsx96vlh3pymc7fkyvz" frameBorder="0" title="Add the Crustdata - Search LinkedIn Profiles Tool step to your Tool" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

You can add the ‘Crustdata - Search LinkedIn Profiles’ Tool step to your Tool by:

1. Creating a new Tool, then searching for the ‘Crustdata - Search LinkedIn Profiles’ Tool step
2. Click ‘Expand’ to see the full Tool step
3. Enter a keyword(s) in the ‘Keyword’ field
4. Adjust the limit of results you wish to receive in the ‘Limit’ field
5. Open Advanced Settings to search through many more parameters
6. Click ‘Run step’ to run the Tool step and then click ‘data’ to view the output

### Advanced Settings

The majority of parameters to search through can be found in Advanced Settings.

<ParamField path="First Name" type="string">
  The first name field to use for filtering.
</ParamField>

<ParamField path="Last Name" type="string">
  The last name field to use for filtering.
</ParamField>

<ParamField path="Current Company" type="string">
  The current company to use for filtering. Can provide the company name or LinkedIn URL.
</ParamField>

<ParamField path="Exclude Current Company" type="string">
  Companies to exclude from current company field. Can provide the company name or LinkedIn URL.
</ParamField>

<ParamField path="Past Company" type="string">
  The past company to use for filtering. Can provide the company name or LinkedIn URL.
</ParamField>

<ParamField path="Exclude Past Company" type="string">
  Companies to exclude from past company field. Can provide the company name or LinkedIn URL.
</ParamField>

<ParamField path="Company Type" type="dropdown">
  The type of company to use for filtering.
</ParamField>

<ParamField path="Current Title" type="string">
  The current title to use for filtering.
</ParamField>

<ParamField path="Exclude Current Title" type="string">
  Titles to exclude from the current title field.
</ParamField>

<ParamField path="Past Title" type="string">
  The past title to use for filtering.
</ParamField>

<ParamField path="Company Headquarters" type="string">
  The headquarters location of the company.
</ParamField>

<ParamField path="Exclude Company Headquarters" type="string">
  Headquarters locations to exclude.
</ParamField>

<ParamField path="Company Headcount" type="dropdown">
  The headcount size of the company.
</ParamField>

<ParamField path="Region" type="string">
  The region to use for filtering.
</ParamField>

<ParamField path="Exclude Region" type="string">
  Regions to exclude.
</ParamField>

<ParamField path="Industry" type="string">
  The industry to use for filtering.
</ParamField>

<ParamField path="Exclude Industry" type="string">
  Industries to exclude.
</ParamField>

<ParamField path="Profile Language" type="dropdown">
  The profile language of the person.
</ParamField>

<ParamField path="Seniority Level" type="dropdown">
  The seniority level to use for filtering.
</ParamField>

<ParamField path="Exclude Seniority Level" type="dropdown">
  Seniority levels to exclude.
</ParamField>

<ParamField path="Years At Current Company" type="dropdown">
  The number of years at the current company.
</ParamField>

<ParamField path="Years In Current Position" type="dropdown">
  The number of years in the current position.
</ParamField>

<ParamField path="Years Of Experience" type="dropdown">
  The total years of experience.
</ParamField>

<ParamField path="Department" type="dropdown">
  The department to use for filtering.
</ParamField>

<ParamField path="Exclude Department" type="dropdown">
  Departments to exclude.
</ParamField>

<ParamField path="Posted On LinkedIn" type="checkbox">
  Whether the profile has posted on LinkedIn in the last 30 days.
</ParamField>

<ParamField path="Recently Changed Jobs" type="checkbox">
  Whether the profile recently changed jobs in the last 90 days.
</ParamField>

<ParamField path="In The News" type="checkbox">
  Whether the profile has been in the news.
</ParamField>

<ParamField path="School" type="string">
  The school attended.
</ParamField>

### Frequently asked questions (FAQs)

<AccordionGroup>
  <Accordion title="Why are LinkedIn Tools so expensive?">
    This Tool uses [Crustdata](https://crustdata.com/) to search through LinkedIn profiles. The credits charged are to cover the cost of this service through CrustData. We recommend upgrading to a subscription in order to use this Tool.
  </Accordion>

  <Accordion title="Do I need to connect my LinkedIn account to run this Tool?">
    No, connecting your LinkedIn account is not required for this Tool step.
  </Accordion>
</AccordionGroup>

