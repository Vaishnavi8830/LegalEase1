// backend/controllers/lawController.js
import indianLaws from "../data/indianLaws.js";
import { generateGeminiResponse } from "../services/geminiService.js";
import gTTS from "gtts";

export const getCategories = (req, res) => {
    const categories = Object.keys(indianLaws);
    res.json({ categories });
};

export const getLawsByCategory = (req, res) => {
    const { category } = req.params;
    const laws = indianLaws[category];
    if (!laws) return res.status(404).json({ error: "Category not found" });
    res.json({ category, laws });
};

export const explainCategory = async (req, res) => {
    try {
        const { category } = req.body;
        const laws = indianLaws[category];
        if (!laws) return res.status(404).json({ error: "Category not found" });

        const prompt = `Explain the category "${category}" as a fun, simple story for an Indian audience. 
Use short paragraphs with ONE blank line between them. 
Structure the story with headings like:
- Characters
- Situation
- Problem
- Law Explanation
- What He/She Can Do Next
- Summary
- Moral
Limit the story to 200 words. Use emojis to make headings clear.`;

        const aiText = await generateGeminiResponse(prompt);
        res.json({ category, explanation: aiText });
    } catch (error) {
        res.status(500).json({ error: "AI text generation failed" });
    }
};

export const explainLaw = async (req, res) => {
    try {
        const { category, law } = req.body;
        if (!indianLaws[category]) return res.status(404).json({ error: "Law not found" });

        const prompt = `Explain the Indian law "${law}" as a STORY with headings and multiple short paragraphs.
Use this structure:
- Characters
- Situation
- Problem
- Law Explanation
- What He/She Can Do Next
- Summary
- Moral

Leave ONE blank line between paragraphs. 
Use simple Indian examples and emojis for headings. 
Limit to 200 words. 
Make it suitable for TTS audio narration.`;

        const aiText = await generateGeminiResponse(prompt);
        res.json({ category, law, explanation: aiText });
    } catch (error) {
        res.status(500).json({ error: "AI text generation failed" });
    }
};

// --- AUDIO ROUTE (LAW STORY ONLY) ---
export const explainLawAudio = async (req, res) => {
    try {
        const { category, law } = req.body;
        if (!indianLaws[category]) return res.status(404).json({ error: "Category/Law not found" });

        const prompt = `Explain the law "${law}" as a short, engaging Indian story with headings (Characters, Situation, Problem, Law Explanation, What He/She Can Do Next, Summary, Moral). 
Use short paragraphs with ONE blank line between them. 
keep heading in bold like character,situation, etc.
Use simple language suitable for audio narration.`;

        const aiText = await generateGeminiResponse(prompt);

        const gtts = new gTTS(aiText, "en");
        res.setHeader("Content-Type", "audio/mpeg");

        const stream = gtts.stream();
        stream.on("error", (err) => {
            console.error("gTTS Stream Error:", err);
            if (!res.headersSent) res.status(500).json({ error: "Audio stream failed" });
        });
        stream.pipe(res);
    } catch (error) {
        console.error("Audio Route Error:", error);
        res.status(500).json({ error: "Failed to generate law audio" });
    }
};    