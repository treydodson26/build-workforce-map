# The platform docs: `build/agents/use-cases/`

3 pages, downloaded on 11/16/2026.


---

# Page: Meeting Auto-Scheduling Agent

Path: `build/agents/use-cases/calendar-scheduling`.

## Meeting Auto-Scheduling Agent

> Automate meeting coordination with AI-powered scheduling

Meeting Auto-Scheduling Agents are digital teammates that actively negotiate optimal meeting times by understanding context, preferences, and priorities. They process thousands of scheduling permutations in seconds while coordinating across teams, time zones, and calendars. No more back-and-forth emails.

### Key features

<CardGroup cols="3">
  <Card title="Natural language" icon="comments">
    Understands scheduling requests in plain English
  </Card>

  <Card title="Multi-timezone coordination" icon="globe">
    Finds times during working hours for all participants across time zones
  </Card>

  <Card title="Conflict resolution" icon="circle-check">
    Handles hard conflicts, soft conflicts, and priority-based scheduling
  </Card>

  <Card title="Automatic rescheduling" icon="arrows-rotate">
    Proposes alternatives when meetings need to move
  </Card>

  <Card title="Learning preferences" icon="brain">
    Adapts to individual and team scheduling patterns over time
  </Card>

  <Card title="Buffer time management" icon="clock">
    Adds breaks between consecutive meetings
  </Card>

  <Card title="Intelligent prioritization" icon="ranking-star">
    Respects organizational hierarchy and meeting importance
  </Card>

  <Card title="Multi-platform integration" icon="plug">
    Works with Outlook and major meeting platforms
  </Card>
</CardGroup>

### How to set up an agent for meeting auto-scheduling

#### Triggers for meeting scheduling agents

<iframe src="https://app.supademo.com/embed/cmkewuh3y0dv9w7p2l515yatk" frameBorder="0" title="Meeting Scheduler Triggers Setup" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"relative",top:0,left:0,width:"100%",height:"400px",border:"3px solid #5E43CE",borderRadius:"10px" }" />

To enable your scheduling agent, you’ll need a Outlook calendar integration with read/write access to check availability and create events, plus a Outlook trigger to monitor your inbox and kick off the agent when scheduling requests arrive.

#### Add tools to your scheduling agent

To build a calendar scheduling agent, you’ll need these basic tools to get started:

<CardGroup cols="2">
  <Card title="Check Outlook calendar availability" icon="calendar-check">
    Find open slots in your sales team’s calendars
  </Card>

  <Card title="Send email (Outlook)" icon="envelope">
    Reply with available time options to prospects
  </Card>

  <Card title="Create a Teams meeting in the Outlook calendar" icon="video">
    Automatically generate video links for each demo
  </Card>

  <Card title="Get events from Outlook calendar" icon="list">
    Avoid double-booking or scheduling too many demos in one day
  </Card>
</CardGroup>

##### How to add these tools to your agent

1. Go to **Tools** in your Agent Builder
2. Click **+ Add Tool**
3. Click **New Tool**
4. Click **Build from Scratch**
5. Click **Add Step**
6. Search for your calendar provider (for example, “outlook”)
7. Select the tools you need from the results

<Tip>
  Search for your specific calendar provider to discover available built-in tools.
</Tip>

<Frame>
  </Frame>

### Use case example: Automating demo requests for sales

<Accordion title="Calendar Bookings Scheduler Agent - clone from marketplace">
  **Scenario**

  Your sales team receives numerous demo requests via email. Instead of manually checking calendars and coordinating schedules, an AI agent can handle the entire process automatically.

  ***

  **How it works:**

  <Steps>
    <Step title="Monitors inbox">
      Automatically detects demo requests from incoming emails
    </Step>

    <Step title="Checks availability">
      Reviews your calendar in real-time to find open slots
    </Step>

    <Step title="Coordinates timezones">
      Handles timezone differences automatically to suggest appropriate meeting times
    </Step>

    <Step title="Proposes time slots">
      Suggests 30-minute meeting slots across two different days (avoiding weekends)
    </Step>

    <Step title="Books & confirms">
      * Books immediately if a specific time is requested and available
      * Proposes 2-3 times per day when flexibility is needed
      * Sends professional confirmation emails
    </Step>
  </Steps>

  ***

  **Ready to use this agent?**

  Clone from the platform Marketplace →
</Accordion>


---

# Page: Meeting Agents

Path: `build/agents/use-cases/meeting-agents-overview`.

## Meeting Agents

> Stop taking notes and coordinating schedules. Let AI handle your meetings.

Meeting Agents coordinate schedules, take notes, transcribe conversations, and handle follow-ups so you can focus on what matters.

### Key features

<CardGroup cols="3">
  <Card title="Real-time transcription" icon="waveform">
    Automatic transcription of every conversation
  </Card>

  <Card title="Smart scheduling" icon="calendar-check">
    Find optimal times across timezones
  </Card>

  <Card title="Action item extraction" icon="list-check">
    Automatically identify tasks and owners
  </Card>

  <Card title="Multi-platform support" icon="plug">
    Zoom and Microsoft Teams
  </Card>

  <Card title="Custom summaries" icon="file-lines">
    Configure format and distribution
  </Card>

  <Card title="Live control" icon="bolt">
    Use On-Call AI Commands during meetings
  </Card>
</CardGroup>

### What can meeting agents do?

#### Meeting Auto-Scheduling Agent

Coordinate meeting times across participants, handle timezone conflicts, and send calendar invitations. No more back-and-forth emails.

<Accordion title="Example use case: Interview scheduling">
  When scheduling candidate interviews across multiple team members in different timezones, your agent finds times that work for everyone, sends calendar invites, and handles rescheduling if conflicts arise. What would take hours of email chains happens automatically in minutes.
</Accordion>

[Meeting Auto-Scheduling Agent →](build__agents__use-cases.md) (page `build/agents/use-cases/calendar-scheduling`)

#### Meeting Notetaker Agent

Automatically join meetings, record conversations, transcribe audio, and generate summaries with action items. Works with Zoom and Microsoft Teams.

<Accordion title="Example use case: Interview note-taking">
  When interviewing a candidate, let your agent handle the note-taking. You can focus on building rapport, reading body language, and asking thoughtful follow-up questions instead of scrambling to write everything down. After the interview, review a complete transcript with key discussion points and next steps.
</Accordion>

[Meeting Notetaker Agent →](build__agents__use-cases.md) (page `build/agents/use-cases/meeting-notetaker`)


---

# Page: Meeting Notetaker Agent

Path: `build/agents/use-cases/meeting-notetaker`.

## Meeting Notetaker Agent

A Meeting Notetaker Agent joins your meetings, records conversations, and generates summaries with action items.

* **Joins automatically**: The agent attends meetings on your behalf
* **Records everything**: Get video recordings and full transcripts without lifting a finger
* **No device recording needed**: The agent handles it in the background
* **Customizable**: Extract insights tailored to your needs, whether product feedback, sales objections, or technical requirements

### Key features

<CardGroup cols="2">
  <Card title="Automatic meeting attendance" icon="calendar-check">
    Agent joins meetings directly from your calendar with no manual intervention required
  </Card>

  <Card title="Audio & video recording" icon="video">
    Captures comprehensive recordings without using your device
  </Card>

  <Card title="Speaker-identified transcription" icon="microphone">
    Creates accurate transcripts with speaker labels and timestamps
  </Card>

  <Card title="Intelligent summarization" icon="list-check">
    Extracts key moments, decisions, and action items automatically
  </Card>

  <Card title="Cross-platform support" icon="display">
    Works with Zoom and Microsoft Teams
  </Card>

  <Card title="Flexible distribution" icon="share-nodes">
    Send summaries to Slack, email, Word document, Notion, or your CRM
  </Card>

  <Card title="On-call AI commands" icon="message">
    Control the agent during live meetings with chat commands
  </Card>

  <Card title="Customizable insights" icon="sliders">
    Tailor outputs to your domain including product feedback, sales objections, and technical requirements
  </Card>
</CardGroup>

### How it works

<Steps>
  <Step title="Pre-meeting" icon="calendar">
    Agent triggers from your calendar and sends a meeting bot to join.
  </Step>

  <Step title="During meeting" icon="video">
    While you focus on the conversation, the agent works silently:

    * Capturing comprehensive audio and video recordings
    * Creating accurate speaker-identified transcription
    * Detecting key moments, decisions, and actionables
    * Identifying discussion themes and topic clusters
  </Step>

  <Step title="Post-meeting" icon="file-lines">
    Processes the complete transcript by speaker and timestamp, then extracts domain-specific insights tailored to your needs.
  </Step>
</Steps>

### How to setup a Meeting Notetaker Agent

#### Step 1: Create your agent

Create a new agent or clone Nate, a production-ready notetaker from the Marketplace. If you want to build your own, you can take inspiration from Nate’s configuration.

#### Step 2: Add critical tools

Your Meeting Notetaker Agent requires these essential tools:

| Tool                               | Description                                               |
| ---------------------------------- | --------------------------------------------------------- |
| **Send meeting bot**               | Dispatches the meeting bot to join and record a call      |
| **Send meeting bot message**       | Sends a chat message from the meeting bot to participants |
| **Pause meeting bot recording**    | Pauses the recording while staying in the meeting         |
| **Resume meeting bot recording**   | Resumes recording after it has been paused                |
| **Turn transcript into text file** | Converts the transcript into a downloadable text file     |
| **web search**                  | Searches the web for keywords during live meetings        |

These are pre-built tools available in your agent’s tool library.

<Tip>
  Start with **Send meeting bot** and **Turn transcript into text file** for basic functionality. Add the other tools as you expand your agent’s capabilities.
</Tip>

#### Step 3: Choose how to run your agent

##### Option A: Automatic (add triggers)

<div style="{ position:"relative",paddingBottom:"56.25%",height:0 }">
  <iframe src="https://app.supademo.com/embed/cmkdjwr5c0gx9qm44i9w77ftm" frameBorder="0" title="Setting up Meeting Notetaker triggers" allow="clipboard-write; fullscreen" webkitAllowFullscreen="true" mozAllowFullscreen="true" style="{ position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"3px solid #5E43CE",borderRadius:"10px" }" />
</div>

Set up triggers if you want your agent to automatically join meetings from your calendar. Connect two triggers:

* **Calendar** (Outlook): Monitors your schedule and sends the bot to join meetings
* **platform Meeting Bot**: Receives the transcript after the meeting ends

<Note>
  You’ll need to admit the bot as a guest into the meeting through your video platform.
</Note>

##### Option B: manual

If you prefer to run your agent manually, simply send the meeting link directly to your agent:

```
Join this meeting: https://teams.microsoft.com/l/meetup-join/example
```

### Use cases

Your meeting notes don’t have to stay as notes. Connect your Meeting Notetaker to other tools to turn conversations into real deliverables:

<AccordionGroup>
  <Accordion title="Case studies & testimonials">
    Had a great customer call? Turn it into a case study or testimonial you can share with prospects.
  </Accordion>

  <Accordion title="Product roadmaps">
    Capture feedback from user interviews and automatically organize it into a product roadmap.
  </Accordion>

  <Accordion title="Sales enablement">
    Use insights from sales calls to improve your pitch. Add a pitch deck tool to automatically create slides from meeting content.
  </Accordion>

  <Accordion title="Social content">
    Record an expert interview and let the agent pull out quotes and highlights for social media posts.
  </Accordion>

  <Accordion title="Onboarding docs">
    Turn training sessions into step-by-step guides for new team members.
  </Accordion>
</AccordionGroup>

### Advanced: On-call AI commands

You can control your agent in real-time by typing commands in the meeting chat:

* **Pause recording**: Stop recording during sensitive discussions
* **Search**: Get instant research while you’re still on the call
* **Add notes**: Flag important items to highlight in the summary

[Learn more →](build__agents__advanced-features.md) (page `build/agents/advanced-features/on-call-ai-commands`)

