// backend/controllers/lawController.js
import indianLaws from "../data/indianLaws.js";
import { generateGeminiResponse } from "../services/geminiService.js";

// GET /api/laws/categories
export const getCategories = (req, res) => {
    const categories = Object.keys(indianLaws);
    res.json({ categories });
};

// GET /api/laws/:category
export const getLawsByCategory = (req, res) => {
    const { category } = req.params;
    const laws = indianLaws[category];
    if (!laws) return res.status(404).json({ error: "Category not found" });
    res.json({ category, laws });
};

// POST /api/laws/explain-category
export const explainCategory = async (req, res) => {
    const { category } = req.body;
    const laws = indianLaws[category];
    if (!laws) return res.status(404).json({ error: "Category not found" });

    const lawsText = laws.map((l) => `- ${l}`).join("\n");

    const prompt = `
You are a friendly legal expert explaining Indian laws.

Explain the following category in a short story-style explanation.

Rules:
- Simple English
- Light, natural humor (do not exaggerate)
- Indian daily-life examples (family, office, market)
- Maximum 7–8 short paragraphs
- Beginner-friendly
- Avoid long dramatic stories or dialogues

Category: ${category}

Important Laws:
${lawsText}

Explain why this category of law exists and how it helps society.
`;

    const aiText = await generateGeminiResponse(prompt);
    res.json({ category, explanation: aiText });
};

// POST /api/laws/explain-law
export const explainLaw = async (req, res) => {
    const { category, law } = req.body;
    const laws = indianLaws[category];

    if (!laws || !laws.includes(law)) {
        return res.status(404).json({ error: "Law not found" });
    }

    const prompt = `
You are a friendly Indian legal expert.

Explain the following law in a short, story-style explanation.

Strict Rules:
- Use simple English
- Light, natural humor only
- Indian daily-life examples
- Maximum 200–220 words
- 6–7 short paragraphs only
- No long historical background
- No dramatic storytelling or dialogues

Ending Rule (VERY IMPORTANT):
- End with a clear 2–3 line summary:
  "Why this law matters" and "When it is used"

Law: ${law}
Category: ${category}
`;


    const aiText = await generateGeminiResponse(prompt);
    res.json({ category, law, explanation: aiText });
};
