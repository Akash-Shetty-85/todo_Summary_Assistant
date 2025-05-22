# Todo Summary Assistant


---

## 📝 Project Overview

The **Todo Summary Assistant** is a full-stack application that allows users to create and manage personal to-do items. It integrates with a real Large Language Model (LLM) API to summarize pending tasks and sends the summary to a designated Slack channel.

---

## 🎯 Key Features

### Frontend (React)
- Add, edit, and delete to-do items.
- View a list of current to-dos.
- Generate a summary of pending to-dos using a real LLM.
- Send the generated summary to a Slack channel.
- Display success/failure notifications for Slack operations.

### Backend (Node.js with Express)
- RESTful API endpoints:
  - `GET /todos` — Retrieve all to-dos.
  - `POST /todos` — Add a new to-do.
  - `DELETE /todos/:id` — Delete a to-do by ID.
  - `POST /summarize` — Generate summary via LLM and post to Slack.
- Integrates with OpenAI API for task summarization.
- Integrates with Slack Incoming Webhooks to post summaries.
- Uses Supabase PostgreSQL for data persistence.

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Supabase account & project
- OpenAI API key
- Slack workspace with Incoming Webhook URL

### 1. Clone the Repository
```bash
git clone https://github.com/Akash-Shetty-85/todo_Summary_Assistant.git
cd todo_Summary_Assistant
```
### 2. Backend Setup
```bash
cd server
npm install
```
Create .env file in server folder with:

```bash
OPENAI_API_KEY=your_openai_api_key
COHERE_API_KEY=your_chohere_api_key
SLACK_WEBHOOK_URL=your_slack_webhook_url
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
PORT=5000
```

Start backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install

```

Create .env file in client folder with:
```bash
VITE_BACKEND_URL=
CORS_ORIGIN=
PORT=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Start frontend:
```bash
npm run dev
```

 **Integration Details**

  

**LLM Integration (OpenAI)**

 - The backend calls OpenAI's /COHERE  API to summarize the list of pending
   to-dos.
   
  - Ensure your OpenAI and COHERE API key is added to .env.

**Slack Integration**

- Use Slack Incoming Webhooks to post summaries.

- Configure webhook URL in the backend .env file.

**Database (Supabase)**

- Store to-dos in a Supabase PostgreSQL database.

- Connect using Supabase URL and API key.


** Folder structure **


### todo_Summary_Assistant/
	
		

 - client
	 - src/
      - .env
       - package.jscon
 - server
     - src/ 
     - package.json
     - .gitignore 
     - .env



## Design & Architecture

-   Frontend built with React for a seamless, reactive UI.
    
-   Backend uses Express for REST API and integrations.
    
-   Supabase PostgreSQL as a scalable cloud-hosted database.
    
-   OpenAI GPT for intelligent summarization.
    
-   Slack Webhooks for real-time notification delivery.
 
