// backend/services/geminiService.js
import axios from "axios";

export const generateGeminiResponse = async (prompt) => {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    try {
        const response = await axios.post(url, {
            contents: [{ parts: [{ text: prompt }] }]
        });

        return response.data.candidates[0].content.parts[0].text;
    } catch (err) {
        console.error("Gemini API error:", err.message);
        return "AI explanation not available. Check your API key or network.";
    }
};
