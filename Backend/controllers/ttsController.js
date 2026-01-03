import gTTS from "gtts";
import stream from "stream";

export const streamAudio = (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    const gtts = new gTTS(text, "en");

    res.set({
        "Content-Type": "audio/mpeg",
        "Transfer-Encoding": "chunked"
    });

    const passThrough = new stream.PassThrough();
    gtts.stream().pipe(passThrough).pipe(res);
};
