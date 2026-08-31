/**
 * ollama-server.js
 *
 * Local Express server that proxies requests to Ollama (http://localhost:11434)
 * and implements a simple agentic loop for tool calling.
 *
 * Usage:
 *   node --env-file=.env.local ollama-server.js
 *   OR via: npm run dev:local (from repo root)
 */

import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
import { TOOL_DEFINITIONS, executeTool } from './tools/portfolio-tools.js';
import { buildSystemPrompt } from './system-prompt.js';

const app = express();
app.use(express.json({ limit: '4mb' }));

const PORT = process.env.OLLAMA_BACKEND_PORT || 5001;
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2';

// ---------------------------------------------------------------------------
// CORS — allow local frontend dev server
// ---------------------------------------------------------------------------
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// ---------------------------------------------------------------------------
// Health check
// ---------------------------------------------------------------------------
app.get('/health', async (_req, res) => {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
      signal: AbortSignal.timeout(3000),
    });
    const data = await response.json();
    const models = (data.models || []).map((m) => m.name);
    res.json({
      status: 'ok',
      ollama: OLLAMA_BASE_URL,
      model: OLLAMA_MODEL,
      availableModels: models,
      modelReady: models.some((m) => m.startsWith(OLLAMA_MODEL)),
    });
  } catch (err) {
    res.status(503).json({
      status: 'error',
      message: `Ollama not reachable at ${OLLAMA_BASE_URL}: ${err.message}`,
    });
  }
});

// ---------------------------------------------------------------------------
// Main chat endpoint — agentic loop with tool calling
// ---------------------------------------------------------------------------
app.post('/api/ollama', async (req, res) => {
  const {
    messages = [],
    mode = 'assistant',
    model,
    stream = false,
    options = {},
  } = req.body;

  if (!messages || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required.' });
  }

  const targetModel = model || OLLAMA_MODEL;
  const systemPrompt = buildSystemPrompt(mode);

  // Build the initial message array with system prompt
  const fullMessages = [
    { role: 'system', content: systemPrompt },
    ...messages,
  ];

  // ---------------------------------------------------------------------------
  // Agentic loop: up to 5 tool-call rounds before forcing a final response
  // ---------------------------------------------------------------------------
  const MAX_TOOL_ROUNDS = 5;
  let round = 0;
  let currentMessages = fullMessages;

  while (round < MAX_TOOL_ROUNDS) {
    round++;
    let ollamaResponse;

    try {
      ollamaResponse = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: targetModel,
          messages: currentMessages,
          tools: TOOL_DEFINITIONS,
          stream: false,
          options,
        }),
      });
    } catch (fetchErr) {
      return res.status(502).json({
        error: `Could not reach Ollama at ${OLLAMA_BASE_URL}. Is it running?`,
        details: fetchErr.message,
      });
    }

    if (!ollamaResponse.ok) {
      const errBody = await ollamaResponse.text();
      return res.status(ollamaResponse.status).json({
        error: 'Ollama returned an error.',
        details: errBody,
      });
    }

    const data = await ollamaResponse.json();
    const assistantMessage = data.message;

    // No tool calls — return the final response
    if (
      !assistantMessage.tool_calls ||
      assistantMessage.tool_calls.length === 0
    ) {
      if (stream) {
        // Simple SSE for streaming-compatible clients
        res.setHeader('Content-Type', 'text/event-stream');
        res.write(
          `data: ${JSON.stringify({ message: assistantMessage, done: true })}\n\n`
        );
        return res.end();
      }
      return res.json({
        message: assistantMessage,
        model: targetModel,
        toolRounds: round - 1,
        done: true,
      });
    }

    // Execute each tool call and append results to the conversation
    currentMessages = [...currentMessages, assistantMessage];

    for (const toolCall of assistantMessage.tool_calls) {
      const toolName = toolCall.function?.name;
      const toolArgs = toolCall.function?.arguments;

      console.log(`[Ollama Tool] Calling: ${toolName}`, toolArgs);

      let toolResult;
      try {
        toolResult = executeTool(toolName, toolArgs);
      } catch (toolErr) {
        toolResult = { error: toolErr.message };
      }

      currentMessages.push({
        role: 'tool',
        content: JSON.stringify(toolResult),
      });
    }
  }

  // Exceeded max rounds — return last assistant message as-is
  const lastAssistant = currentMessages
    .filter((m) => m.role === 'assistant')
    .at(-1);

  return res.json({
    message: lastAssistant || { role: 'assistant', content: 'Max tool rounds reached.' },
    model: targetModel,
    toolRounds: MAX_TOOL_ROUNDS,
    done: true,
    warning: 'Max tool rounds reached.',
  });
});

// ---------------------------------------------------------------------------
// Direct Ollama proxy — for raw access without tool loop or system prompt
// ---------------------------------------------------------------------------
app.post('/api/ollama/raw', async (req, res) => {
  try {
    const ollamaResponse = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: OLLAMA_MODEL, stream: false, ...req.body }),
    });
    const data = await ollamaResponse.json();
    res.status(ollamaResponse.status).json(data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, '127.0.0.1', () => {
  console.log(`\n🦙 Ollama local server listening at http://localhost:${PORT}`);
  console.log(`   Model:  ${OLLAMA_MODEL}`);
  console.log(`   Ollama: ${OLLAMA_BASE_URL}`);
  console.log(`   Health: http://localhost:${PORT}/health\n`);
});
