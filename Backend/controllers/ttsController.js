import gTTS from "gtts";
import stream from "stream";

export const streamAudio = (req, res) => {
    const { text, language = "en" } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    // ✅ Remove emojis (important for clean TTS)
    const cleanText = text.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])/g,
        ""
    );

    // ✅ Language-aware TTS
    const gtts = new gTTS(cleanText, language === "hi" ? "hi" : "en");

    res.set({
        "Content-Type": "audio/mpeg",
        "Transfer-Encoding": "chunked"
    });

    const passThrough = new stream.PassThrough();
    gtts.stream().pipe(passThrough).pipe(res);
};
