# Modern AI Chatbot (MERN + Google Gemini API)

A production-grade full-stack conversational AI web application built with the MERN stack (MongoDB, Express, React, Node.js), TypeScript, Tailwind CSS, and the official Google Gemini `@google/genai` SDK.

---

## Architecture Overview

```text
gemini-chatbot/
├── frontend/                     # React + TypeScript + Vite + Tailwind CSS
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── components/           # UI components (Sidebar, ChatWindow, MessageBubble, etc.)
│   │   ├── context/              # React Context (ChatContext, ThemeContext)
│   │   ├── hooks/                # Custom React hooks (useChat, useTheme)
│   │   ├── pages/                # Page views
│   │   ├── services/             # Axios API service client
│   │   ├── types/                # TypeScript interfaces & types
│   │   ├── App.tsx               # Main application layout
│   │   ├── main.tsx              # React DOM entrypoint
│   │   └── index.css             # Tailwind base styles
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                      # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/               # Database and Gemini SDK client configuration
│   │   │   ├── database.ts
│   │   │   └── gemini.ts
│   │   ├── controllers/          # Express route controllers (chat, conversation)
│   │   ├── middleware/           # Rate limiter, validation, error handler
│   │   ├── models/               # Mongoose Conversation schema
│   │   ├── routes/               # API route definitions
│   │   ├── services/             # Gemini API integration service
│   │   ├── utils/                # Helper utilities and formatters
│   │   └── server.ts             # Express server entry point
│   ├── .env.example              # Template for environment variables
│   ├── .env                      # Local secret environment variables (git-ignored)
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore                    # Git ignore file protecting keys & build artifacts
└── README.md
```

---

## 10-Step Implementation Roadmap

1. **Step 1:** Folder Structure & Project Scaffolding *(Completed)*
2. **Step 2:** Dependencies & Project Configurations *(Completed)*
3. **Step 3:** Chatbot UI & Responsive Components (Sidebar, ChatWindow, MessageBubble, Input, WelcomeScreen)
4. **Step 4:** Express Server & MongoDB Database Connection
5. **Step 5:** Google Gemini Official `@google/genai` SDK Integration
6. **Step 6:** Connecting Frontend API Client to Backend
7. **Step 7:** Persistent Conversations in MongoDB (CRUD)
8. **Step 8:** Markdown Code Syntax Highlighting, Typing States & Error Handling
9. **Step 9:** End-to-End Application Testing
10. **Step 10:** Running Locally & Deployment Guide

