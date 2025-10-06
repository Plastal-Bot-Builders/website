import { Router } from 'express';
import Ollama from 'ollama';

const router = Router();

// Create Ollama client with your credentials
const client = new Ollama({
  host: process.env.OLLAMA_HOST || 'https://ollama.com',
  headers: { 
    'Authorization': `Bearer ${process.env.OLLAMA_API_KEY}`
  }
});

const SYSTEM_PROMPT = `You are PlastalBot, an AI assistant for a robotics education organization in Zambia.
Your goal is to help users learn about robotics workshops, STEM education,
and sustainability projects. Be friendly, informative, and concise.`;

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: message }
    ];

    // Get response from Ollama
    const response = await client.chat({
      model: process.env.OLLAMA_MODEL || 'gpt-oss:120b',
      messages
    });

    return res.json({ response: response.message.content });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ 
      error: 'Failed to get response from AI',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;