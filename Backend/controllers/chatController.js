import { generateGeminiResponse } from "../services/geminiService.js";

export const chatWithAI = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // We add a context instruction so the AI behaves like a legal assistant
    const contextPrompt = `
You are LegalEase, a helpful AI legal assistant for Indian laws. 
Your role is to act like a friendly legal expert who answers questions clearly and concisely.

Rules:
1. Answer in **2–4 sentences** only.
2. Explain legal terms in simple words.
3. Always provide **one or two follow-up questions** to keep the conversation going.
4. Do **not give legal advice**, only general legal information.
5. Use polite, professional, and friendly tone.

User Question:
"${message}"
`;



    const reply = await generateGeminiResponse(contextPrompt);
    res.json({ reply });
  } catch (err) {
    console.error("Chat Error:", err);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
};
