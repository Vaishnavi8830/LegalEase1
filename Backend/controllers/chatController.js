import { generateGeminiResponse } from "../services/geminiService.js";

export const chatWithAI = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // We add a context instruction so the AI behaves like a legal assistant
    const contextPrompt = `You are a helpful legal assistant for a platform called LegalEase. 
    Your goal is to simplify Indian laws for users. 
    Answer the following question clearly and concisely: "${message}"`;

    const reply = await generateGeminiResponse(contextPrompt);
    res.json({ reply });
  } catch (err) {
    console.error("Chat Error:", err);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
};
