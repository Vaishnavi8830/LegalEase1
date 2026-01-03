import express from "express";
import { streamAudio } from "../controllers/ttsController.js";

const router = express.Router();

router.post("/stream", streamAudio);

export default router;
