import indianLaws from "../data/indianLaws.js";
import { generateGeminiResponse } from "../services/geminiService.js";
import gTTS from "gtts";

// --- GET ALL CATEGORIES WITH DESCRIPTIONS ---
export const getCategories = (req, res) => {
    const categories = Object.keys(indianLaws).map((cat) => ({
        name: cat,
        description: indianLaws[cat].description,
        redirectUrl: indianLaws[cat].redirectUrl,
    }));
    res.json({ categories });
};

// --- GET LAWS BY CATEGORY ---
export const getLawsByCategory = (req, res) => {
    const { category } = req.params;
    const categoryData = indianLaws[category];
    if (!categoryData) return res.status(404).json({ error: "Category not found" });

    res.json({ category, laws: categoryData.laws });
};

// --- EXPLAIN CATEGORY STORY ---
export const explainCategory = async (req, res) => {
    try {
        const { category, language = "en" } = req.body;
        const categoryData = indianLaws[category];
        if (!categoryData) return res.status(404).json({ error: "Category not found" });

        const prompt = `Explain the category "${category}" as a fun, simple story for an Indian audience. 
Use **bold headings** for each section: **Characters, Situation, Problem, Law Explanation, What He/She Can Do Next, Summary, Moral**. 
Use short paragraphs with ONE blank line between them. 
Keep sentences simple and easy to understand. Use everyday Indian examples. 
Limit the story to 200 words. 
Do NOT use complicated legal terms. Use emojis for headings if needed.`;

        let aiText = await generateGeminiResponse(prompt);

        // ✅ TRANSLATE TO HINDI IF SELECTED
        if (language === "hi") {
            aiText = await generateGeminiResponse(
                `Translate the following legal story into simple Hindi:\n\n${aiText}`
            );
        }

        res.json({ category, explanation: aiText });
    } catch (error) {
        res.status(500).json({ error: "AI text generation failed" });
    }
};

// --- EXPLAIN SPECIFIC LAW STORY ---
export const explainLaw = async (req, res) => {
    try {
        const { category, law, language = "en" } = req.body;
        const categoryData = indianLaws[category];

        if (!categoryData || !categoryData.laws.includes(law)) {
            return res.status(404).json({ error: "Law not found" });
        }

        const prompt = `Explain the Indian law "${law}" as a short, engaging story for an Indian audience. 

⚖️ **Use the following Markdown structure exactly**:

**Characters:**  
[Introduce characters in simple terms]

**Situation:**  
[Describe the situation briefly]

**Problem:**  
[Describe the problem briefly]

**Law Explanation:**  
• First key point (leave a blank line after)  
• Second key point (leave a blank line after)  
• Third key point (leave a blank line after)

**What He/She Can Do Next:**  
[Explain simple actions]

**Summary:**  
[Summarize key points]

**Moral:**  
[Explain the moral in simple language]

**Instructions for AI:**  
- Keep all headings bold exactly as shown (**Heading** )  
- Leave ONE blank line between paragraphs and after each bullet point  
- Use simple Indian examples and emojis if relevant  
- Limit to 200 words  
- Make it suitable for TTS audio narration  
- Output strictly in Markdown format, do NOT add any extra formatting`;

        let aiText = await generateGeminiResponse(prompt);

        // ✅ TRANSLATE TO HINDI IF SELECTED
        if (language === "hi") {
            aiText = await generateGeminiResponse(
                `Translate the following legal explanation into simple Hindi:\n\n${aiText}`
            );
        }

        res.json({ category, law, explanation: aiText });

    } catch (error) {
        console.error("Explain Law Error:", error);
        res.status(500).json({ error: "AI text generation failed" });
    }
};

// --- AUDIO ROUTE FOR LAW STORY ---
export const explainLawAudio = async (req, res) => {
    try {
        const { text, language = "en" } = req.body;

        // ✅ Remove emojis for TTS
        const textForAudio = text.replace(
            /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])/g,
            ""
        );

        // ✅ LANGUAGE-AWARE TTS
        const gtts = new gTTS(textForAudio, language === "hi" ? "hi" : "en");

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
