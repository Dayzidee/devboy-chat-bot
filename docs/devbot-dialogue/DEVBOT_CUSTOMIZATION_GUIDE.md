# DevBot Customization Guide

Welcome to the DevBot customization guide! This document will walk you through how to customize your AI chatbot, add pre-implemented prompts, and connect different AI models.

## Table of Contents

1. [Pre-Implemented Prompts](#pre-implemented-prompts)
2. [AI Model Configuration](#ai-model-configuration)
3. [System Prompts](#system-prompts)
4. [Developer Modes](#developer-modes)
5. [Adding Custom AI Providers](#adding-custom-ai-providers)
6. [Advanced Customization](#advanced-customization)

---

## Pre-Implemented Prompts

Pre-implemented prompts are quick-start suggestions that appear in the chat input. They help users get started with common tasks.

### Location

All pre-built prompts are defined in `src/types/chat.ts` in the `DEVELOPER_MODES` constant.

### Structure

```typescript
export const DEVELOPER_MODES: Record<DevMode, DeveloperModeConfig> = {
  javascript: {
    context: "Your AI context description",
    preBuilt: [
      "Prompt 1",
      "Prompt 2",
      "Prompt 3",
    ],
    contextQuestions: [
      "Question 1?",
      "Question 2?",
    ]
  },
  // ... more modes
}
```

### How to Add/Modify Prompts

1. **Open** `src/types/chat.ts`
2. **Locate** the `DEVELOPER_MODES` object
3. **Find** the mode you want to customize (`javascript`, `python`, or `basic`)
4. **Modify** the `preBuilt` array:

```typescript
javascript: {
  context: "You are a JavaScript/TypeScript expert...",
  preBuilt: [
    "Help me build a React component for...",
    "Debug this JavaScript code...",
    "Your custom prompt here...",  // Add your own!
    "Another custom prompt...",
  ],
  contextQuestions: [
    "Which framework? (React, Vue, Angular)",
    // Add context questions users might need
  ]
}
```

### Best Practices for Prompts

- **Be specific**: "Create a React form with validation" > "Help with React"
- **Include context**: "Build a REST API with Express.js and MongoDB" > "Build an API"
- **Use action verbs**: "Debug", "Optimize", "Create", "Implement"
- **Keep it concise**: Aim for 5-8 words maximum
- **Add variety**: Cover different tasks (building, debugging, optimizing, learning)

### Example: Adding a New Developer Mode

To add a completely new mode (e.g., "rust"):

1. **Update the DevMode type**:
```typescript
export type DevMode = 'javascript' | 'python' | 'basic' | 'rust';
```

2. **Add the mode configuration**:
```typescript
rust: {
  context: "You are a Rust expert specializing in systems programming...",
  preBuilt: [
    "Help me with ownership and borrowing...",
    "Create a safe concurrent program...",
    "Debug this Rust compilation error...",
  ],
  contextQuestions: [
    "Project type? (CLI, Web, Systems)",
    "Using async runtime? (tokio, async-std)",
  ]
}
```

3. **Update the mode icons** in `src/components/chat/ChatSidebar.tsx`:
```typescript
const modeIcons = {
  javascript: Code2,
  python: FileCode2,
  basic: MessageSquare,
  rust: Box, // Add your icon
};
```

---

## AI Model Configuration

DevBot currently uses **Lovable AI Gateway** which provides access to multiple AI models without managing API keys.

### Available Models

The system supports three AI providers (configured but using Lovable AI):
- **OpenAI** (`openai`) - GPT models
- **Claude** (`claude`) - Anthropic's Claude
- **Gemini** (`gemini`) - Google's Gemini

### Default Model

Currently, all models route through **Lovable AI Gateway** using `google/gemini-2.5-flash` as the default.

### Changing the Default Model

The default model is set in the edge function `supabase/functions/chat/index.ts`:

```typescript
const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${LOVABLE_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: "google/gemini-2.5-flash", // Change this!
    messages: systemMessages,
    stream: true,
  }),
});
```

### Available Lovable AI Models

You can use any of these models:
- `google/gemini-2.5-pro` - Most powerful Gemini model
- `google/gemini-2.5-flash` - Fast and balanced (default)
- `google/gemini-2.5-flash-lite` - Fastest and cheapest
- `openai/gpt-5` - Most powerful GPT model
- `openai/gpt-5-mini` - Balanced GPT model
- `openai/gpt-5-nano` - Fast and cheap GPT model

### Dynamic Model Selection

To let users choose models dynamically, update the edge function:

```typescript
const { messages, model } = await req.json(); // Accept model from frontend

const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
  // ...
  body: JSON.stringify({
    model: model || "google/gemini-2.5-flash", // Use provided model or default
    messages: systemMessages,
    stream: true,
  }),
});
```

Then update `src/hooks/useChat.ts`:

```typescript
const { data, error } = await supabase.functions.invoke('chat', {
  body: { 
    messages: chatMessages,
    model: `google/gemini-2.5-flash` // Or get from state: selectedAI
  }
});
```

---

## System Prompts

System prompts define the AI's behavior and expertise. They're located in `supabase/functions/chat/index.ts`.

### Current System Prompts

```typescript
const systemPrompts: Record<string, string> = {
  javascript: "You are an expert JavaScript/TypeScript developer...",
  python: "You are an expert Python developer...",
  basic: "You are a helpful coding assistant...",
};
```

### Customizing System Prompts

1. **Open** `supabase/functions/chat/index.ts`
2. **Locate** the `systemPrompts` object
3. **Modify** the prompts:

```typescript
const systemPrompts: Record<string, string> = {
  javascript: `You are a senior full-stack JavaScript developer with 10+ years of experience.
  
  Your expertise includes:
  - React, Vue, and Angular frameworks
  - Node.js backend development
  - TypeScript best practices
  - Testing with Jest and Cypress
  - Performance optimization
  
  Always provide:
  - Clean, production-ready code
  - Detailed explanations
  - Best practices and patterns
  - Security considerations
  - Testing recommendations
  
  Format code blocks with proper syntax highlighting.`,
  
  // ... other prompts
};
```

### Best Practices for System Prompts

- **Define expertise clearly**: List specific technologies
- **Set expectations**: Explain how the AI should respond
- **Include formatting rules**: Code blocks, explanations, etc.
- **Add constraints**: What to avoid, security considerations
- **Be specific about output**: Examples, structure, detail level

### Example: Advanced System Prompt

```typescript
python: `You are a senior Python engineer specializing in:
- Backend development (Django, Flask, FastAPI)
- Data science (pandas, numpy, scikit-learn)
- DevOps automation
- Clean code and SOLID principles

Response format:
1. Explain the approach briefly
2. Provide clean, documented code
3. Mention edge cases and best practices
4. Suggest testing strategies

Code style:
- Follow PEP 8
- Use type hints
- Include docstrings
- Add inline comments for complex logic

Always consider:
- Performance implications
- Security vulnerabilities
- Error handling
- Code maintainability`,
```

---

## Developer Modes

Developer modes provide context-specific AI behavior. Each mode has its own system prompt, pre-built prompts, and context questions.

### Current Modes

1. **JavaScript** - Web development focus
2. **Python** - Backend and data science
3. **Basic** - General programming help

### Adding a New Mode

#### Step 1: Define the Mode Type

Edit `src/types/chat.ts`:

```typescript
export type DevMode = 'javascript' | 'python' | 'basic' | 'go' | 'java';
```

#### Step 2: Add Mode Configuration

```typescript
export const DEVELOPER_MODES: Record<DevMode, DeveloperModeConfig> = {
  // ... existing modes
  
  go: {
    context: "You are a Go (Golang) expert specializing in concurrent systems, microservices, and cloud-native applications.",
    preBuilt: [
      "Help me build a microservice with Go...",
      "Explain goroutines and channels...",
      "Create a REST API with Gin framework...",
      "Debug this Go concurrency issue...",
      "Optimize Go code performance...",
    ],
    contextQuestions: [
      "Project type? (CLI, Web, Microservices)",
      "Framework? (Gin, Echo, Fiber, Standard library)",
      "Database? (PostgreSQL, MongoDB, Redis)",
    ]
  },
};
```

#### Step 3: Add System Prompt

Edit `supabase/functions/chat/index.ts`:

```typescript
const systemPrompts: Record<string, string> = {
  // ... existing prompts
  
  go: `You are an expert Go (Golang) developer with deep knowledge of:
  - Concurrent programming with goroutines and channels
  - Microservices architecture
  - REST and gRPC APIs
  - Cloud-native development
  - Docker and Kubernetes
  
  Provide idiomatic Go code following:
  - Effective Go guidelines
  - Clear error handling
  - Proper use of interfaces
  - Concurrency best practices
  
  Always include:
  - Package and import statements
  - Error handling
  - Documentation comments
  - Testing examples when relevant`,
};
```

#### Step 4: Update Database Enum

Run a migration to update the database enum:

```sql
-- Add new mode to the enum
ALTER TYPE dev_mode ADD VALUE IF NOT EXISTS 'go';
```

#### Step 5: Update UI Icons

Edit `src/components/chat/ChatSidebar.tsx`:

```typescript
import { Code2, FileCode2, MessageSquare, Box } from 'lucide-react';

const modeIcons = {
  javascript: Code2,
  python: FileCode2,
  basic: MessageSquare,
  go: Box, // Add icon for new mode
};

const modeColors = {
  javascript: 'text-yellow-500',
  python: 'text-blue-500',
  basic: 'text-gray-500',
  go: 'text-cyan-500', // Add color for new mode
};
```

---

## Adding Custom AI Providers

While the system currently uses Lovable AI Gateway, you can add custom AI providers.

### Option 1: Use Different Lovable AI Models

Simply change the model in `supabase/functions/chat/index.ts`:

```typescript
model: "openai/gpt-5", // Use GPT instead of Gemini
```

### Option 2: Add OpenAI Directly

If you want to use your own OpenAI API key:

#### Step 1: Add API Key Secret

In Supabase dashboard:
1. Go to Project Settings → Edge Functions → Secrets
2. Add `OPENAI_API_KEY` with your API key

#### Step 2: Update Edge Function

```typescript
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const { messages, model = 'gpt-4o-mini' } = await req.json();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      stream: true,
    }),
  });

  return new Response(response.body, {
    headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
  });
});
```

### Option 3: Add Anthropic Claude

#### Step 1: Add API Key

Add `ANTHROPIC_API_KEY` to Supabase secrets.

#### Step 2: Create New Edge Function

Create `supabase/functions/chat-claude/index.ts`:

```typescript
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');

serve(async (req) => {
  const { messages, model = 'claude-sonnet-4-20250514' } = await req.json();

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      max_tokens: 4096,
      stream: true,
    }),
  });

  return new Response(response.body, {
    headers: { 'Content-Type': 'text/event-stream' },
  });
});
```

#### Step 3: Update Frontend to Support Multiple Providers

In `src/hooks/useChat.ts`, add provider switching:

```typescript
const sendMessage = async (content: string) => {
  const selectedModel = selectedAI; // from store
  const endpoint = selectedModel === 'claude' ? 'chat-claude' : 'chat';
  
  const { data, error } = await supabase.functions.invoke(endpoint, {
    body: { messages: chatMessages }
  });
  
  // ... rest of the code
};
```

---

## Advanced Customization

### 1. Context-Aware Prompts

Add file upload context to prompts:

```typescript
// In edge function
const contextualPrompt = `${systemPrompts[mode]}

Current context:
- Files uploaded: ${fileCount}
- Previous topics: ${topics.join(', ')}
- User expertise level: ${userLevel}

Adapt your responses accordingly.`;
```

### 2. Streaming Response Customization

Modify how streaming responses are handled in `src/hooks/useChat.ts`:

```typescript
// Add custom parsing for structured responses
if (content.includes('```')) {
  // Extract code blocks
  const codeBlocks = extractCodeBlocks(content);
  // Store separately for syntax highlighting
}
```

### 3. Multi-Turn Conversation Memory

Keep conversation context in edge function:

```typescript
const conversationHistory = await getRecentMessages(chatId, 10);
const contextualMessages = [
  { role: 'system', content: systemPrompt },
  ...conversationHistory,
  ...messages,
];
```

### 4. Custom Metadata

Add metadata to messages for better tracking:

```typescript
const messageMetadata = {
  model: selectedModel,
  mode: developerMode,
  tokenCount: estimateTokens(response),
  processingTime: endTime - startTime,
  codeBlockCount: countCodeBlocks(response),
};

await supabase.from('messages').insert({
  chat_id: chatId,
  role: 'assistant',
  content: response,
  metadata: messageMetadata,
});
```

### 5. Rate Limiting

Add rate limiting to edge function:

```typescript
const checkRateLimit = async (userId: string) => {
  const { count } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', new Date(Date.now() - 3600000).toISOString());
  
  if (count && count > 100) {
    throw new Error('Rate limit exceeded');
  }
};
```

---

## Testing Your Changes

### 1. Test Pre-Built Prompts

```bash
# Start development server
npm run dev

# Navigate to chat
# Click on different developer modes
# Verify pre-built prompts appear correctly
```

### 2. Test System Prompts

```bash
# Send test messages in each mode
# Verify AI responds according to system prompt
# Check response quality and context awareness
```

### 3. Test Edge Function Changes

```bash
# Deploy edge function
supabase functions deploy chat

# Test streaming
# Check error handling
# Verify model switching works
```

### 4. Test Database Changes

```bash
# Run migrations
supabase db push

# Verify enum values
# Check RLS policies still work
```

---

## Troubleshooting

### Issue: Prompts Not Appearing

**Solution**: Clear browser cache and reload. Check `DEVELOPER_MODES` in `chat.ts`.

### Issue: AI Not Responding

**Solution**: Check edge function logs in Supabase dashboard. Verify API keys.

### Issue: Wrong System Prompt

**Solution**: Ensure mode is passed correctly from frontend to edge function.

### Issue: Streaming Not Working

**Solution**: Check CORS headers. Verify SSE parsing in `useChat.ts`.

---

## Resources

- [Lovable AI Documentation](https://docs.lovable.dev/features/ai)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Google Gemini API](https://ai.google.dev/docs)

---

## Need Help?

- Check the [Lovable Discord](https://discord.gg/lovable)
- Review edge function logs in Supabase
- Test with simple prompts first
- Verify API keys and environment variables

Happy coding! 🚀
