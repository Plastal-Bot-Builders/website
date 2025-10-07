import { Router } from "express";
import fetch from "node-fetch";

const router = Router();

// Ollama API configuration
const OLLAMA_HOST = process.env.OLLAMA_HOST || "https://api.ollama.com";
const OLLAMA_API_KEY = process.env.OLLAMA_API_KEY;
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "gpt-oss:120b";

const SYSTEM_PROMPT = `You are PlastalBot, an AI assistant for a robotics education organization in Zambia.
Your goal is to help users learn about robotics workshops, STEM education,
and sustainability projects. Be friendly, informative, and concise.`;

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${OLLAMA_HOST}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OLLAMA_API_KEY}`,
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
      }),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Ollama API error: ${response.status} ${errorText}`);
      throw new Error(`API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return res.json({
      response: data.choices[0].message.content,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Send a fallback response when API is unreachable
    return res.status(200).json({ 
      response: "I'm sorry, I'm having trouble connecting to my knowledge database right now. Please try again later or contact support if this persists.",
      fallback: true
    });
  }
});

// Health check endpoint
router.get("/health", (req, res) => {
  return res.json({
    status: "ok",
    ollama_configured: !!process.env.OLLAMA_API_KEY,
    model: process.env.OLLAMA_MODEL || "gpt-oss:120b",
  });
});

export default router;
