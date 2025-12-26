import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import lawRoutes from "./routes/lawRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/laws", lawRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});

console.log("Gemini Key:", process.env.GEMINI_API_KEY);
