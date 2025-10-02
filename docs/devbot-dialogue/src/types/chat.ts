export type AIModel = 'openai' | 'claude' | 'gemini';
export type DevMode = 'javascript' | 'python' | 'basic';
export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  chat_id: string;
  role: MessageRole;
  content: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface Chat {
  id: string;
  user_id: string;
  title: string;
  mode: DevMode;
  ai_model: AIModel;
  archived: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  preferences: Record<string, any>;
  oauth_providers: string[];
  subscription: {
    plan: string;
    status: string;
  };
  created_at: string;
  updated_at: string;
  last_login_at?: string;
}

export interface FileUpload {
  id: string;
  user_id: string;
  chat_id?: string;
  filename: string;
  original_name: string;
  mime_type: string;
  size: number;
  storage_url: string;
  metadata: Record<string, any>;
  created_at: string;
}

export interface DeveloperModeConfig {
  context: string;
  preBuilt: string[];
  contextQuestions: string[];
}

export const DEVELOPER_MODES: Record<DevMode, DeveloperModeConfig> = {
  javascript: {
    context: "You are a JavaScript/TypeScript expert assistant specializing in modern web development. You help with React, Node.js, and frontend technologies.",
    preBuilt: [
      "Help me build a React component for...",
      "Debug this JavaScript code...",
      "Optimize this Node.js function...",
      "Create a TypeScript interface for...",
      "Set up authentication with...",
      "Implement a REST API with..."
    ],
    contextQuestions: [
      "Which framework? (React, Vue, Angular, Node.js)",
      "UI library preference? (Tailwind, MUI, Chakra)",
      "Database type? (MongoDB, PostgreSQL, Firebase)"
    ]
  },
  python: {
    context: "You are a Python expert assistant specializing in web development, data science, and automation. You help with Django, Flask, FastAPI, and Python libraries.",
    preBuilt: [
      "Help me build a Django view for...",
      "Create a Flask API endpoint...",
      "Debug this Python function...",
      "Write a data analysis script...",
      "Set up machine learning with...",
      "Automate this task with Python..."
    ],
    contextQuestions: [
      "Framework choice? (Django, Flask, FastAPI)",
      "Deployment target? (AWS, Heroku, Docker)",
      "Project type? (Web app, API, Data Science, ML)"
    ]
  },
  basic: {
    context: "You are a helpful coding assistant for all programming languages. You provide clear explanations and help with general programming concepts.",
    preBuilt: [
      "Explain this code in simple terms...",
      "Help me debug this error...",
      "What's the best approach for...",
      "Convert this code to another language...",
      "How do I implement...",
      "Code review for this function..."
    ],
    contextQuestions: [
      "Programming language?",
      "Experience level? (Beginner, Intermediate, Advanced)",
      "Learning goals?"
    ]
  }
};